#!/usr/bin/env python3
"""Local-only candidates for the personal archive. Never publish raw exports."""
import argparse
import csv
import datetime as dt
import json
import math
import pathlib
import plistlib
import re
import zipfile

def bilingual(s):
    return {"zh": s, "en": s}

def music_candidates(path, playlist):
    with open(path, "rb") as src:
        data = plistlib.load(src)
    matches = [p for p in data.get("Playlists", []) if p.get("Name") == playlist]
    if len(matches) != 1:
        raise ValueError("Playlist must match exactly once")
    tracks = data.get("Tracks", {})
    records = []
    for item in matches[0].get("Playlist Items", []):
        track = tracks.get(str(item.get("Track ID")))
        if not track or not track.get("Name"):
            continue
        records.append({"title": bilingual(track["Name"]),
                        "subtitle": bilingual(track.get("Album", "")), "detail": None})
    return {"kind":"music-playlist-candidates", "playlist": playlist,
            "count":len(records), "records":records}

def past(date, today):
    try:
        return dt.date.fromisoformat(date) < today
    except (ValueError, TypeError):
        return False

def trip_candidates(path, today):
    with zipfile.ZipFile(path) as z:
        def read(name):
            info = z.getinfo(name)
            if info.file_size > 16 * 1024 * 1024:
                raise ValueError("Backup entry too large")
            return json.loads(z.read(info))
        manifest = read("manifest.json")
        if manifest.get("appName") != "旅图 TripMap" or manifest.get("schemaVersion") not in (1,2,3):
            raise ValueError("Unsupported TripMap backup")
        trip = read("data/trip.json")
        days = {d["id"]:d.get("date") for d in read("data/days.json") if d.get("tripId")==trip.get("id")}
        items = read("data/itineraryItems.json")
        records = []
        seen = set()
        for item in items:
            if item.get("tripId")!=trip.get("id") or (item.get("executionState") or {}).get("status")!="completed":
                continue
            date = days.get(item.get("dayId"))
            title = item.get("title")
            if not past(date,today) or not isinstance(title,str) or not title.strip():
                continue
            key=(title,date)
            if key in seen:
                continue
            seen.add(key)
            records.append({"title":title, "month":date[:7]})
    return {"kind":"tripmap-private-review-candidates","count":len(records),"records":records}

def flight_candidates(path,today):
    records=[]
    seen=set()
    with open(path,encoding="utf-8-sig",newline="") as src:
        reader=csv.DictReader(src)
        required={"date","from","to","airline","aircraft","status"}
        if not required.issubset(reader.fieldnames or []):
            raise ValueError("Missing required normalized flight CSV columns")
        for row in reader:
            date=(row.get("date") or "").strip()
            if (row.get("status") or "").strip().lower()!="completed" or not past(date,today):
                continue
            a,b=[(row.get(k) or "").strip().upper() for k in ("from","to")]
            if a==b or not all(re.fullmatch("[A-Z]{3}", x) for x in (a,b)):
                continue
            airline=(row.get("airline") or "").strip()
            aircraft=(row.get("aircraft") or "").strip()
            # No assumed flight-number identity: flag possible duplicates for review, rather than silently counting twice.
            key=(date,a,b,airline.casefold(),aircraft.casefold())
            if key in seen:
                raise ValueError("Potential duplicate flight; reconcile source rows before importing")
            seen.add(key)
            raw=(row.get("distance_km") or "").strip()
            dist=None
            if raw:
                dist=float(raw)
                if not math.isfinite(dist) or dist<=0:
                    raise ValueError("Invalid flight distance")
            records.append({"month":date[:7],"from":a,"to":b,"airline":airline,"aircraft":aircraft,"distance_km":dist})
    known=[r["distance_km"] for r in records if r["distance_km"] is not None]
    return {"kind":"flight-review-candidates","records":records,"summary":{"flights":len(records),
        "airlines":len({r["airline"].casefold() for r in records if r["airline"]}),
        "aircraft_types":len({r["aircraft"].casefold() for r in records if r["aircraft"]}),
        "distance_records":len(known),"known_distance_km":round(sum(known),1)}}

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("kind",choices=["music","tripmap","flights"])
    parser.add_argument("source",type=pathlib.Path)
    parser.add_argument("--playlist",default="听个音乐剧！")
    parser.add_argument("--out",required=True,type=pathlib.Path)
    args=parser.parse_args()
    repo=pathlib.Path(__file__).resolve().parents[2]
    out=args.out.resolve()
    if out==repo or repo in out.parents:
        parser.error("Candidate output must be outside the public website repository")
    if out==args.source.resolve():
        parser.error("Output must differ from input")
    today=dt.date.today()
    if args.kind=="music":
        data=music_candidates(args.source,args.playlist)
    elif args.kind=="tripmap":
        data=trip_candidates(args.source,today)
    else:
        data=flight_candidates(args.source,today)
    # Refuse to overwrite a previous candidate file.
    with open(out,"x",encoding="utf-8") as dest:
        json.dump(data,dest,ensure_ascii=False,indent=2)
        dest.write("\n")
    print("Wrote local review candidates. No website files changed.")

if __name__=="__main__":
    main()
