# Portfolio · QA and visual review

**Date:** 2026-10-22  
**Revision:** v1.1  
**Runner:** Chromium + Python Playwright, reduced-motion visual captures in 2 languages.

## Test matrix

| Width | English | 中文 | Notes |
| ---: | :---: | :---: | --- |
| 320 px | ✅ | ✅ | Tiny-phone fallback; reduced header navigation, no horizontal scroll |
| 375 px | ✅ | ✅ | Standard phone; all displayed controls checked for ≥44×44px targets |
| 768 px | ✅ | ✅ | Tablet stacking and project half-panels |
| 1440 px | ✅ | ✅ | Standard desktop editorial composition |
| 1920 px | ✅ | ✅ | Ultra-wide frame with max-width alignment |

**Automated results:** 10 viewport×language render cases, zero observed JavaScript page errors, zero document horizontal overflows, zero missing in-page anchor targets. Archive filter has functioning All and Product states; language changes in both directions, updates `html[lang]`, title, and control naming. All 5 archive projects are present without JavaScript; reduced-motion mode shows essential content immediately. Keyboard focus advances to a real link or button. See `qa/qa-results.json`.

**Visual review:** The 320px top navigation previously had crowded targets and the hero ordinal wrapped into three lines. The former is now intentionally simplified; the ordinal stays on one line. Project-meta annotation opacity was increased and light project details darkened for body-text contrast. Added a narrow-screen category filter, retained visual identities of the three projects, and preserved left-right shell alignment. Latest captures are `qa/en-375-full.png`, `qa/zh-375-full.png`, `qa/en-768-full.png`, `qa/zh-768-full.png`, `qa/en-1440-full.png`, and `qa/zh-1440-full.png`.

## Interaction and accessibility checklist

| Item | Result |
| --- | --- |
| Native semantic landmarks and heading order | Pass (code inspection) |
| Keyboard Tab navigation / native button activation | Pass (Chromium) |
| 3px `:focus-visible` indicator / no sticky overlays | Pass (code + visual inspection) |
| Touch target minimum at 320 / 375px | Pass (measured visible links and buttons) |
| Filter selected state, `aria-pressed`, live result count | Pass |
| Language switch content, label, title and `lang` | Pass |
| JavaScript-off fallback: all projects visible | Pass |
| Reduced-motion content visibility | Pass |
| Body ink / muted copy / light focus contrast | 14.05:1 / 4.77:1 / 6.92:1 (calculated) |
| Responsiveness and document overflow | Pass at all matrix widths |
| Accessible names for linked projects / visual descriptions | Inspected; formal AT testing remains |
| External repository links | Present and well-formed; no live-network link crawl |

## What this test **does not** prove

1. **Not a formal WCAG 2.2 AA certification.** VoiceOver, NVDA, TalkBack, 200%/400% zoom and full manual success-criterion review remain to be completed on a real deployed host.
2. This sandbox blocks Chromium navigation to both `file://` and localhost URLs. The test therefore renders the **exact source** `index.html` with the unmodified contents of `styles.css` and `app.js` inlined via Playwright `set_content`. It exercises actual Chromium layout and interaction, but **does not** verify the host's static-file serving or social meta crawlers. The `index.html` asset references were checked as valid paths, and all referenced source files exist.
3. `localStorage` persistence across actual page reloads was reviewed in code but not asserted as an end-to-end browser test because navigation to a local origin was blocked. The visible language switch and label logic were exercised.
4. No real-source screenshots are bundled. Site illustrations are conceptual compositions; add project UI imagery only after reviewing appropriate source/reuse rights and current public release states.

## Handoff

The five publishable files are `index.html`, `styles.css`, `app.js`, `favicon.svg`, and `social-preview.svg`. GitHub Pages / static hosting setup and domain activation are **not** completed by this package.
