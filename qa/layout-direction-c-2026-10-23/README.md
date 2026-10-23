# Visual Study 09 — Route C: Content-first Personal Site

**Status:** independent design exploration, not a full homepage redesign and not a production release.

## Why C exists

The owner liked the *layout and natural reading flow* of Anthony Fu, Paco Coursey, Emil Kowalski, Brittany Chiang, and Rauno Freiberg, but found our A/B design studies forced, crowded and overly "designed" in the wrong places.

After capturing the actual settled home pages in Chromium, the main findings were:

- Anthony and Emil use natural paragraphs and links in calm, narrow reading columns.
- Paco puts Building / Projects / Writing into a balanced, low-friction three-column section beneath a short personal intro.
- Brittany uses two columns because the left identity remains stable while the right content scrolls; it is not two competing hero panels.
- Rauno's oversized visual gesture is **one** single clear visual focus, not a collection of competing decorative devices.

Route C applies the **principles**, not the sites' visual assets or code.

## Layout C

- Simple top navigation, moderate headline, human introduction, generous whitespace. No forced full-height split or huge screenshots on the first screen.
- Building / Trying / Learning groups present real software and engineering activity with honest status, without requiring giant equal-sized cards.
- Two featured work passages illustrate *Vision Router* and *Computer History* with **existing original repository images** in context. The first has a useful, accessible switch between the real pixel comparison image and settings capture; source-image links point to the exact files in the protected `main` Git tree.
- Computer History is clearly labeled "actual UI, example data".
- A short, time-scoped Now and legitimate GitHub, project-case and contact links complete this **visual specimen**. It is deliberately not a full project/award inventory, which remains in the untouched production site.
- C has subtle but definite blue accents, a small coral underline, and italic English type; visual color supports the text hierarchy rather than acting as a decorative feature.

A/B remain available as comparisons, but C is the **default** at `?v=c`.

## Files

- Source: `studies/layout-direction-c-2026-10-23/index.html`, `styles.css` (copied baseline A/B), `direction-c.css`, `app.js` and original image assets.
- Single-file preview: `qa/layout-direction-c-2026-10-23/layout-c-ab-standalone.html` (styles, JavaScript and three original screenshots embedded). Offline archive: `layout-c-ab-standalone.zip`.
- Verified screenshots: `c-1440-hero.png`, `c-375-hero.png`, `c-1440-full.png`, `c-375-full.png`; browser test results: `qa-browser.json`, `qa-axe.json`.
- The independent Render preview has a fixed publish command that copies `qa/workbench-v4/workbench-v4-standalone.html` to its static-site root. Only that **experimental entry** is updated with the C study. Formal site `main` is untouched.

## Quality checks

- Chromium 320, 375, 768, 1440, 1920 px + WebKit 375, 1440 px: zero horizontal overflow, no JavaScript page errors, original images decoded, all three A/B/C selectors work.
- Switching C's original project images works: button states, alt text, original-image source URL and descriptive captions.
- Four C Chromium viewports passed axe-core WCAG A/AA-tagged automated checks **without confirmed violations** after contrast adjustments. This is not full accessibility certification, and WebKit simulation is not a real iPhone Safari test.
- The external source images and GitHub case links are source-backed; no fabricated AI demo, CAD, hardware integration or performance metric appears.

**Comparison rule:** the new route needs visual approval against the original `https://ysr666.github.io/` before adding more content or touching production `main`.
