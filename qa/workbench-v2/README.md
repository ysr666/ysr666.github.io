# Assembly Log 018 / Workbench V2

**Status:** experimental candidate only. **Not** a replacement for `main`. Built October 23, 2026 on `design/portfolio-directions`.

## What changed

- Replaced the conventional left-introduction/right-product-panel hero with an oversized typographic identity ("叶石瑞") and an editorial assembly sheet.
- Converted three horizontal software-like tabs into a contrasting instrument rail on desktop; mobile mode switching is placed immediately above the first interactive module.
- Added a **local, temporary assembly trace**. Clicking a genuine Vision Router screenshot marks a normalized observation coordinate; a *deliberately synthetic* mapping places a target in the 2D arm panel; inverse kinematics can move the arm toward that target. Actions may be replayed by clicking the trace. No activity logs, private data, network AI calls, or real robot commands are involved.
- Kept the full work / side projects / engineering / awards / skills / contact sections from Workbench V1. Existing project screenshots and project-case links remain in use.
- All original Workbench V1 files remain unchanged.

## Open

- `prototypes/workbench-v2.html` — editable multi-file source; open while inside this repository.
- `qa/workbench-v2/workbench-v2-standalone.html` — single HTML with its CSS, JS, and four project images embedded. Project-case links in this file point to the existing public website; no build server required.
- `qa/workbench-v2/workbench-v2-single-file.zip` — packaged standalone.

## References, deliberately **not** copied

- **Anthony Fu:** projects and personal interests presented as parts of an individual's ongoing practice, not a SaaS funnel.
- **Paco Coursey:** readable hierarchy from identity, to selected work, to smaller experiments.
- **Emil Kowalski:** deliberate focus and keyboard controls; interactions need to convey function rather than gratuitous motion.
- **Brittany Chiang:** evidence-backed work and experience remain plainly accessible, not hidden inside the experiment.
- **Rauno Freiberg:** stronger visual authorship through oversized type, a deliberately unusual assembly-rail composition, and distinct mode surfaces.

## Verified locally

Test platform: macOS / Google Chrome 155.0.8059.85 / Playwright. Screen widths: 320, 375, 768, 1440 and 1920 CSS px.

- Source and standalone load in local Chrome; images in standalone explicitly decoded successfully (4/4).
- All sizes exercised Observe → Move to the synthetic target → Remember episode; results updated and the temporary trace populated.
- At every tested width, no horizontal page overflow before or after the mode changes; browser console/page errors absent in these runs.
- 375, 768 and 1440 screenshots taken at `hero-*.png` and `full-*.png`; 375 and 1440 state screenshots: `memory-*.png`, `motion-*.png`.
- A mobile overflow bug found during actual interaction (the memory-grid widened the layout and prevented tapping the third episode) was corrected, then retested successfully.
- `node --check prototypes/workbench-v2.js` passed.

## Known gaps / release blockers

- Chinese-first only; the formal site's English-language parity has **not** been implemented in this V2 experiment.
- Mobile touch testing here used Chrome emulation, **not** a physical iPhone Safari session.
- This is neither live computer-activity capture, nor actual vision-model inference, nor calibrated image-to-robot control, nor a six-servo robot simulation.
- Automated browser flows are not full WCAG 2.2 AA audits; manual focus, contrast, screen-reader, and reduced-motion QA remain required.
- Not publicly preview-deployed or approved for production; do **not** merge without owner's design approval.
- 1920 mode screenshots and real-device mobile screenshot review remain worthwhile.

## Production safety

The published `main` branch and its project-case content have not been modified by this experiment. Verify all stronger factual claims against `FACT_AUDIT.md` before publication.
