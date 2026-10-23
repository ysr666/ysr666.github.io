# Atelier 018 — Portfolio V7 Visual Exploration

**Status:** real responsive experimental website, not the public homepage. Source branch `design/portfolio-directions`; formal `main` is untouched.

## Design brief and decisions

The owner wants a visually distinctive personal website that also serves the résumé; not a visual toy, a generic enterprise site, or the old monochrome homepage with small feature cards attached.

**Design concept:** authored editorial spreads using the **real project's original screenshots**, bold Chinese–English type, warm paper background, cobalt blue, warm coral, and distinct treatments for different categories of work.

### What changed

- **Personal identity comes first:** large Chinese and English typography, a truthful one-paragraph introduction to mechanical engineering, software and personal making, plus real project interfaces in a selectable adjacent display.
- **Three featured works are not all the same component:** Vision Router uses a cobalt image spread, Computer History uses a flipped coral spread, and experimental Agent Wrapped gets clearly marked typographic artwork, **not a fake product screenshot**. Links go to existing real case studies/source.
- **Engineering has its own editorial treatment:** prominent chapter, actual participation, modeling and planned work clearly labeled. The 'M.' image is explicitly decorative typography: **it is not a CAD model, actual mechanism or engineering evidence**. No reliable approved CAD image was available in the reviewed portfolio asset set. Replace it with real owner-approved engineering imagery when available.
- **Archive remains complete but moves to a useful place:** an 11-entry search/filter index sits after narrative content and other biographical sections instead of dominating the homepage. Project names, status, accessible links, engineering experience, awards, CET-4/CET-6 and contact are preserved.
- **Purposeful interactions only:** stage buttons select **real** project previews, which link to corresponding cases; image evidence can be expanded; search filters archive; English/Chinese switch works. There is no simulated robot, invented AI demo or fictitious activity feed.
- **Project-specific evidence:** the source page maintains project link provenance and reveals original screenshot examples on demand. This design does not invent performance measurements.

## Deliverables

`preview/atelier-v7/index.html`, `styles.css`, `atelier.css`, `app.js`, `practical.js`, and accompanying `assets/` and `projects/` contain editable source.

`qa/atelier-v7/atelier-v7-standalone.html` embeds styles, scripts, images and favicon in a single HTML file for the independent public preview; external case-study links target existing production case-study URLs, not nonexistent Render routes.

`qa/atelier-v7/atelier-v7-single-file.zip` provides an offline fallback. `hero-zh-*.png`, `case-zh-*.png`, `engineering-zh-*.png`, `final-en-*.png` and `qa-final.json` record browser screenshots and actual verification.

The independent Render preview builds `qa/workbench-v4/workbench-v4-standalone.html` as `index.html`. That **experimental preview entry** is deliberately updated with V7; V4, V5 and V6 separate files and commits remain available. Formal GitHub Pages `main` is not modified.

## Tests executed

Chrome/Chromium at 320, 375, 768, 1440, 1920 CSS pixels; Playwright WebKit at 375 and 1440. Actual browser actions validated Chinese/English switch, all three project previews and deep links, real screenshot disclosure, engineering filter (4 of 11), searching SolidWorks (one matching entry), no-matches reset (returns 11), and 6/6 embedded project images. No horizontal overflow or script errors across these test states.

Axe-core WCAG A/AA-tag automatic checks: **zero confirmed violations** in all five tested Chromium sizes after restoring legible typography and phone source-link touch targets. Automated checks do not establish WCAG certification. WebKit engine simulation is not a physical iPhone Safari test. No site can claim accessibility certification from these tests alone.

## Fact provenance

Refer to the existing `FACT_AUDIT.md`. The awards and some personal qualifications are from owner-authored CV and are not independently authenticated. Owner involvement in team engineering, release stages, unfinished hardware integration and cloud/privacy tradeoffs remains stated. No undocumented awards, test performance, production features or CAD results were added.

**Review gate:** do not merge experimental design into formal `main` until owner explicitly approves.
