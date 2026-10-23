# Original Portfolio — Polish D / Conservative Comparison

## Why this experiment exists

This is a **small, measured iteration** directly from the published `main` commit `01456c812c46956491208c62c96436e0a57c6928`. Seven prior stylistic rewrites and A/B/C conceptual studies were rejected as forced or less attractive than the original. The owner approved the new method: preserve the original, justify each change, inspect actual desktop/mobile screenshots, and reject visual changes that do not help.

There is **no new creative concept, simulated 3D machinery, additional fake screenshots, or altered résumé content**. Unlike previous prototypes, the original full public contents remain in place: projects, project evidence, engineering activities, awards, language qualifications, personal description and contact.

## What changed

1. **Real interaction fix** — Previously, selecting Vision/History/Sessions immediately scrolled to the related project, taking the user away from the preview. Now those controls change the preview **in place** and a separate contextual `查看这个项目 ↗` link goes to the corresponding original case only if the visitor chooses. This has a real usability benefit on mobile and desktop.
2. **Conservative typographic adjustments** — Slightly refined letter spacing, display sizing and text leading without changing the original neutral palette, scale hierarchy or two-column identity.
3. **Reading and evidence hierarchy** — Thin navigation border, gentle article separator rules, modestly improved evidence image space and a contextual case link on the actual image preview.
4. **Actual project image layout** — Trial initial 61/34 screen ratio looked worse: the secondary screenshot shrank too much. It was rejected based on comparative screenshots. The retained setting is the closer-to-original 56/44 ratio.
5. **Responsive attention** — Slightly shortened mobile hero padding so the real screenshot appears earlier. Context link enters normal layout on tablet and phone after correcting an actual button collision; keyboard and touch controls remain accessible.

## Deliverables

- Full editable source tree: `preview/original-polish-d/`, sourced from the original `main`.
- A small, auditable CSS patch: `preview/original-polish-d/polish-d.css`; small DOM/JS changes in `index.html`, `app.js`.
- Single-file independent preview (all original image assets, styles and scripts embedded): `qa/original-polish-d/original-polish-d-standalone.html`.
- Offline fallback: `qa/original-polish-d/original-polish-d-single-file.zip`.
- Actual desktop and mobile visual screenshots: `d-1440-hero.png`, `d-375-hero.png`, `d-1440-full.png`, `d-375-full.png`, compared against baseline screenshots in `qa/screenshots/`.
- Browser evidence: `qa-interaction.json`, `qa-axe.json`, `qa-bundle.json`.

**Deployment:** independent Render preview retains its configured build, which copies `qa/workbench-v4/workbench-v4-standalone.html` to `public/index.html`. We update only that experimental entry with D's fully self-contained compiled page, never production `main`. Earlier versions remain available in their own directories and Git history.

## Checks and boundaries

- Chrome 155: 320, 375, 768, 1440, 1920 CSS px. WebKit engine: 375 and 1440 CSS px. Project selector stays at the same scroll position in all seven tested cases; contextual link goes to correct original case; English label and switching are correct; no script errors, no horizontal overflow.
- Inline HTML after image embedding: Chrome 375 and 1440; all six original media images decoded, English mode and contextual project links work.
- axe-core 4.10.3: 375 and 1440 × Chinese/English × Vision/History/Wrapped: 12 checks, **zero confirmed automated WCAG A/AA-tag violations**. Not a replacement for manual screen-reader testing, not real-device Safari certification.
- The original claims are preserved, including experimental statuses and qualifications from owner-provided CV. No independent award or performance validation implied.
- This patch is meant as a visual comparison, **not a claim that D is dramatically better than the original**. It makes a specific real usability improvement while preserving the original's visual qualities.

**Do not merge this experimental branch into production without the user's explicit permission.**
