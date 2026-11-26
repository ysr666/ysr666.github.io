import datetime as dt
import json
import pathlib
import plistlib
import tempfile
import unittest
import zipfile
from import_candidates import music_candidates, trip_candidates, flight_candidates

class TestImport(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.root=pathlib.Path(self.tmp.name)
        self.today=dt.date(2026,11,26)
    def tearDown(self):
        self.tmp.cleanup()
    def test_music_only_public_metadata(self):
        p=self.root/"music.xml"
        with open(p,"wb") as f:
            plistlib.dump({"Tracks":{"1":{"Name":"Song","Album":"Album","Location":"PRIVATE","Play Count":10}},
                "Playlists":[{"Name":"My playlist","Playlist Items":[{"Track ID":1}]}]},f)
        result=music_candidates(p,"My playlist")
        self.assertEqual(result["count"],1)
        self.assertNotIn("PRIVATE",json.dumps(result))
        self.assertNotIn("Play Count",json.dumps(result))
    def test_tripmap_only_past_completed(self):
        p=self.root/"trip.zip"
        with zipfile.ZipFile(p,"w") as z:
            for name,data in {
                "manifest.json":{"appName":"旅图 TripMap","schemaVersion":3},
                "data/trip.json":{"id":"t"},
                "data/days.json":[{"id":"d","tripId":"t","date":"2026-07-10"},{"id":"f","tripId":"t","date":"2026-12-10"}],
                "data/itineraryItems.json":[
                    {"tripId":"t","dayId":"d","title":"Museum","executionState":{"status":"completed"},"notes":"SECRET"},
                    {"tripId":"t","dayId":"d","title":"Planned"},
                    {"tripId":"t","dayId":"d","title":"Skipped","executionState":{"status":"skipped"}},
                    {"tripId":"t","dayId":"f","title":"Future","executionState":{"status":"completed"}}],
                "data/ticketMetas.json":[{"secret":"PRIVATE"}]
            }.items(): z.writestr(name,json.dumps(data))
        r=trip_candidates(p,self.today)
        self.assertEqual(r["records"],[{"title":"Museum","month":"2026-07"}])
    def test_flight_partial_distances(self):
        p=self.root/"flights.csv"
        p.write_text("date,from,to,airline,aircraft,distance_km,status,booking\n2026-07-10,AAA,BBB,A,X,100,completed,SECRET\n2026-07-11,BBB,CCC,A,Y,,completed,SECRET\n2026-12-01,BBB,DDD,B,Y,500,completed,SECRET\n2026-07-12,AAA,DDD,B,Y,500,planned,SECRET\n")
        r=flight_candidates(p,self.today)
        self.assertEqual(r["summary"],{"flights":2,"airlines":1,"aircraft_types":2,"distance_records":1,"known_distance_km":100.0})
        self.assertNotIn("SECRET",json.dumps(r))
    def test_flight_duplicate_rejected(self):
        p=self.root/"flights.csv"
        p.write_text("date,from,to,airline,aircraft,distance_km,status\n2026-07-10,AAA,BBB,A,X,100,completed\n2026-07-10,AAA,BBB,A,X,100,completed\n")
        with self.assertRaises(ValueError):
            flight_candidates(p,self.today)

if __name__=="__main__":
    unittest.main()
