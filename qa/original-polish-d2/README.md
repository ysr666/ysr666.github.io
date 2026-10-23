# Original Portfolio — D.2 / Evidence Access and Mobile Layout Fix

**Scope:** A small tested delta from experimental **D** (`1301d5c`), itself based on the untouched formal `main` (`01456c8`). Not a visual rebrand and not a production merge.

## Changes retained

- **A meaningful original-image action:** after selecting Vision Router or Computer History, `原图 ↗` opens the exact corresponding original screenshot from the public GitHub Pages source tree (main/assets). It updates in English; it disappears for the experimental Agent Wrapped typographic artwork, which is not a product screenshot. Image links are ordinary links rather than a custom invented viewer.
- **No content obscured:** the first trial overlaid the original-image link on top of screenshot titles and data; that treatment was **rejected**. Final links live unobtrusively alongside `查看这个项目` in the dark project caption, where they don't block screenshot details.
- **Corrected actual mobile collision:** a separate screenshot inspection revealed the Vision/History/Sessions selector overlapped the title “Vision Router” when the project preview was scrolled into view. The mobile selector is now anchored to the upper-right of the image region, leaving the caption clear. The two caption links have 44 px touch-height.
- **Preserve existing composition:** an alternative with a single oversized screenshot made a large dark empty area and reduced information value; it was rejected and not included. The original two-image stage remains intact.
- **D's previous actual UX fix remains:** selecting a project preview doesn't force-scroll the page; a separate link opens the case details. No résumé text, awards, code/repo claims or source screenshot bytes have been changed.

## Artifact and verification

- `preview/original-polish-d2/`: complete editable experiment source, copied from D. Alterations are in `d2.css`, `index.html` and `app.js`.
- `qa/original-polish-d2/original-polish-d2-standalone.html`: 2.7 MB self-contained HTML with six existing screenshots embedded; public independent preview entry.
- `qa/original-polish-d2/original-polish-d2.zip`: self-contained offline test copy.
- `qa/original-polish-d2/qa-browser.json`: Chrome at 320/375/768/1440/1920 and WebKit at 375/1440, with correct per-project source URLs, hide-on-experiment, language updates, no scroll jumps, no selection/link overlap, no horizontal overflow, no runtime errors.
- `qa/original-polish-d2/qa-axe.json`: 12 Chromium WCAG A/AA automatic check combinations (375/1440 × zh/en × three displayed projects) with no confirmed violations. Not accessibility certification.
- `qa/original-polish-d2/d2-375-hero.png`, `d2-1440-hero.png`: real browser screenshots. The baseline screenshots and previous D source remain available in `qa/original-polish-d/`.

### Content and evidence limits

The Vision Router image is a real recorded *pixel comparison demonstration*, not an aggregate performance metric or a third-party production dashboard. The Computer History screenshot displays sample data, not private real personal activity. Agent Wrapped remains experimental and receives no “original screenshot” source link. Formal `main` and `ysr666.github.io` are left unchanged. This is a visual and interaction polish experiment; not a declaration that D.2 visually surpasses every earlier version.
