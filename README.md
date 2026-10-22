# Shirui Ye / 叶石瑞 · Personal Website

Live site: https://ysr666.github.io/

Bilingual editorial personal homepage about open-source software, hands-on mechanical engineering, relevant competition achievements, CET qualifications and contact information.

## Files

- index.html + home.css + home.js: small, accessible, text-first main site.
- projects/vision-router/ and projects/computer-history/: source-backed bilingual detail pages.
- styles.css, project-detail.css, project-detail.js: shared styling/localization for the detail pages.
- FACT_AUDIT.md: claim evidence, source classes and remaining unverified facts.
- DESIGN_SYSTEM.md and DESIGN_REFERENCES.md: design direction and five real-site comparison.
- QA_REPORT.md: current tests. QA_HISTORY.md: prior homepage acceptance history.
- qa/editorial/: tested current screenshots at mobile, tablet and desktop resolutions.

## Running locally

Run a static server from the repository root using python3 -m http.server 8080. Open http://localhost:8080 . GitHub Pages publishes the main branch root; no compilation or package install is needed.

The default Chinese content remains accessible without JavaScript. A bilingual toggle, shown when JS loads, persists the selection when localStorage is available. All repository links use native anchors.

## Content integrity

Project claims are checked against source repos, README text and releases. Awards, CET and education are self-reported from the owner's research CV; no individual awards are fabricated from team evidence. Unreleased or planning-stage work is marked honestly. Private files and credentials are excluded.
