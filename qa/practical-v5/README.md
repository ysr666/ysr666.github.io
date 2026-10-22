# Practical Portfolio V5 — usefulness before novelty

This is a new independent design experiment based directly on the **published 01456c8 main portfolio**, not a continuation of the decorative Assembly Atlas page. Formal `main` and its published project detail pages were never changed.

## Design decisions

- Retain the actual site's restrained white editorial canvas, dark project-image stage, typography, proof images, real project descriptions, case studies, qualifications, awards, and bilingual switch.
- Remove the fake robot, abstract machine UI, symbolic session timeline and all unhelpful demo interactions from the proposed homepage.
- Add an actual 11-entry searchable directory covering 3 AI agent tools, 4 personal software projects, and 4 mechanical/engineering experiences, each with a direct anchor, accurate status, and source/case link when public.
- Add a keyboard shortcut `/` to focus project search, `Escape` to clear; add category filters and an empty-state reset. The list adapts to English/Chinese without reloading.
- Add a contextual case link to the existing authentic project screenshot preview, plus a copy-email action with live feedback.
- Remove a generic, low-value subtitle on the Agent Wrapped stage and eliminate an unnecessary delay in project switching. Both were causing transient contrast issues during automated checks.

## Files and deployment

`preview/practical/index.html`, `styles.css`, `app.js`, `practical.js`, `assets/`, and `projects/` are editable source based on main. The original site has **not** been overwritten.

`qa/practical-v5/practical-v5-standalone.html` embeds all six project images and both JS/CSS sources, and rewrites external case-study links to the existing production URL. It is suitable for a separate Render static preview. `qa/practical-v5/practical-v5-single-file.zip` is a local/offline fallback.

**Render deployment compatibility:** The existing independent site is configured to publish `qa/workbench-v4/workbench-v4-standalone.html` as `index.html`. To reuse that existing preview URL without changing `main` or creating another billable service, V5's compiled HTML has been copied to that configured entry point. The original V4 standalone was preserved as `qa/workbench-v4/workbench-v4-standalone-archived.html`; all V4 editable sources and its Git commit remain available.

## What was actually tested

- Chrome / Playwright at widths 320, 375, 768, 1440 and 1920 CSS px.
- 11 project entries populated; engineering filter shows 4; searching SolidWorks in that category shows 1; empty-state reset restores all 11; English search for “memory” finds Computer History.
- Project preview switching updates the case link; keyboard / focuses the search input and Escape clears it.
- All six embedded real project assets decoded, no horizontal overflow, no page JavaScript errors in the tested widths.
- Chrome and WebKit at 375 and 1440, Chinese and English, with accessibility results recorded at `qa-engines.json`. 8 scenarios had zero confirmed axe WCAG A/AA violations or script errors after removing the meaningless low-contrast stage subtitle.
- The site remains a static, lightweight portfolio: no fake live AI, simulation disguised as engineering, or invasive analytics.

## Limits

Browser emulation is not a physical iPhone Safari session. This does not constitute a full manual WCAG 2.2 AA audit; there may be other accessibility issues. Project claims still derive from the fact-audited original main and should be reviewed before any production merge.

**This preview is not authorization to replace production main.**
