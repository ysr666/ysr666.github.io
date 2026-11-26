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
