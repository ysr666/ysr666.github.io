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