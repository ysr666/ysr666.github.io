# Personal archive maintenance / 生活档案维护

No build, server-side code, account credentials, or recurring update requirement. The public site reads two JSON files. Add records only when there is something worth keeping.

## Add a record

Find the relevant `sections[].id` in `music.json` or `travel.json`, then append an object to its `records` array:

```json
{
  "title": {"zh": "中文标题", "en": "English title"},
  "subtitle": {"zh": "版本、地点或日期", "en": "Version, place or date"},
  "detail": {"zh": "可选的简短说明", "en": "Optional short note"}
}
```

`detail` may be null or omitted. Never invent missing dates, versions, ratings, flights, visits or venues. A musical encountered in a recording or film belongs in musicals, not in stage unless a live performance is confirmed. Optional local photos use `image: {"src":"../media/filename.jpg","alt":{"zh":"描述","en":"Description"}}`; place approved images in `life/media/` and strip private metadata first. No external album art is automatically fetched.

## Travel data

The flight statistics are the owner's approximate 2026-11 snapshot, not counts generated from the few public records. Update the summary only from a reconciled flight log. Flight highlights can optionally carry route, airline and aircraft fields. Museum records can be appended to the museums section without writing a full article. Public city and flight records represent completed journeys only.

The seed entries are based on owner-reported prior conversations and library selections, not live APIs. They are deliberately incomplete. No upcoming bookings, ticket numbers, exact seat numbers, home addresses, booking identifiers, crew contact details or unredacted scans should be uploaded. Keep raw travel exports and listening histories private; review and select public records before committing. This repository is public.

## Future integration

Apple Music library exports and TripMap may be transformed into reviewed JSON entries, after inspecting real export formats and permissions. Do not claim live sync or a complete archive until implemented and tested. Digital Garden is deferred; no Now page.

## Quick check

`python3 -m http.server 8080` from the repository root. Open both archive pages, switch Chinese/English, and confirm links, mobile layout and the new records. Directly opening file:// pages may block fetch. JSON files can be validated with `python3 -m json.tool life/music.json` and the same for travel.

## Source import (local, review first)

The musical collection comes from the owner's Apple Music playlist **听个音乐剧！**, 78 track entries in a prior XML export. Only song and album titles are published; the source library and play history remain private. Use `python3 life/tools/import_candidates.py music /path/to/Library.xml --playlist '听个音乐剧！' --out /tmp/music-candidates.json` to produce a candidate list. Review before replacing the corresponding records in music.json.

TripMap exports its trip backups as ZIP archives. Use `python3 life/tools/import_candidates.py tripmap /path/to/backup.zip --out /tmp/travel-candidates.json`. This reads only the manifest, trip/day dates and itinerary items, accepts only past items marked completed, and emits titles for review. It does not publish, extract tickets or read financial records. Trip plans and reservations are not proof of visits. Use an output outside the repo, and manually decide which titles belong in the city or museum sections.

For flight logs, `python3 life/tools/import_candidates.py flights /path/to/flights.csv --out /tmp/flight-candidates.json` accepts an explicitly normalized CSV with columns date,from,to,airline,aircraft,distance_km,status. Date is ISO YYYY-MM-DD; status must be completed; distance_km optional. Only completed past flights with distinct valid airport codes are emitted. Estimates and unknown distances remain separate. No import ever modifies the live JSON files. Run `python3 -m unittest discover -s life/tools -p 'test_*.py'` for regression tests.

## Personal atlas and featured works

`travel.json` contains an illustrative Eurasia/Oceania journey overview using a symbolic China origin, not exact airport segments; dashed multi-country links indicate visits, not direct flights. Japan is approximate. Natural Earth public-domain coastline is simplified in `world.svg`. UK public places were selected from the owner's confirmed 12-day itinerary. Lodging, station-only points, ambiguous alternatives, booking data and private notes are excluded. City point diagrams use relative coordinates and link to OpenStreetMap for street detail. `music.json` has featured works with original typographic treatments, not actual album artwork. Stage records and listening records remain separate.

## Editorial UI

The home page links to two archives using the original portfolio's text-led design. Hadestown and Les Misérables are the two primary works; other titles use compact rows. Each title opens a native dialog with the work's existing recording and theatre context, selected tracks, a close button and Escape support. No new dependencies or artwork claims. The travel and music records remain independent JSON files.

## Unified site navigation (2026-11-26)

Music and travel mount within the homepage at `/#music` and `/#travel`; the old archive paths redirect for backwards compatibility. Both share the main language preference, navigation, scrolling and layout. Archive JSON remains independently maintained. `archive.js` mounts each data-archive root, scopes translations and uses site-relative assets. Main navigation uses native anchor history, smooth scrolling with reduced-motion support, and scroll-position highlighting. Project case-study URLs are unchanged.

Top navigation uses disclosure buttons for Work, Background and Life, with hover on fine-pointer devices and tap/keyboard operation. `navigation.js` owns smooth, interruptible anchor navigation, active destinations, and history; `app.js` owns project preview and language switching. The Life disclosure has exactly two destinations. No page reload on in-site navigation.

The quality pass consolidates West End attendance into one featured memory (The Phantom of the Opera and Les Misérables) and keeps Hadestown as recordings, not attendance. Other titles and extra listening records are disclosure sections; their data is retained.
