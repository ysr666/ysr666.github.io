# Visual & Functional QA — Shirui Portfolio v2

## What changed

- Removed **Awesome DSH**. Verified that it and other unrelated forked repositories cannot be presented as original work.
- Replaced the previous abstract and oversized hero with real project evidence and readable case studies.
- Added concrete technical background, implementation, privacy tradeoffs, limits and source links for three featured projects; four supporting product descriptions.
- Changed layout to Taste Skill v2's Split Stage: sticky evidence field on desktop, compact responsive field on mobile.
- Preserved bilingual switching and added accessible project preview controls.

## Checks performed

The connected Mac's Google Chrome was controlled by Playwright. Tested 320, 375, 768, 1440 and 1920 CSS px in both languages. Collected browser screenshots of first viewports and full pages, checked document widths, runtime errors, project links and project-stage switching. Fixed an earlier image-density issue by adding a second real screenshot to the desktop stage.

## Current limitations

- External services, font availability and native screen readers are not fully covered by browser automation.
- Some offscreen images use `loading=lazy`; screenshot automation should scroll and wait for decode before a full-page capture.
- This is a design and smoke-test report, **not** an independent WCAG 2.2 AA certificate.
## v2.1 personal profile expansion · 2026-10-22
- Added 4 sections: Engineering, Honors, Campus, Skills; 11 award / honor records and 4 student-role entries.
- Evidence: the owner's prior research CV, application portfolio and recorded campus experience; see PROFILE_CONTENT.md for precision and exclusions.
- Ran Chromium/Chrome visual screenshots of each new section in Chinese and English at 375, 768, 1440 px.
- Ran scripted layout/translation regression checks at 320, 375, 768, 1440, 1920 px in both languages. No horizontal overflow or JavaScript page errors after repair.
- Fixed English 320 px navigation overflow and mobile Experience link being hidden by the previous second-item rule.
- Taste Skill's automated photo/motion editorial heuristic may not fully apply to a software-engineering portfolio, so those warnings are not presented as independent WCAG conformance.
- WCAG 2.2 AA manual screen-reader testing remains out of scope; this is a responsive and browser interaction QA pass, not formal certification.
