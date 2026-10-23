# Personal Portfolio · Visual Study 08 (A/B)

**Purpose:** Compare **two only** polished visual approaches against the original `ysr666.github.io`, without building full V8 or replacing formal `main`.

**Compare:** `?v=a` or `?v=b`. In the independent preview the top dark review toolbar is separate from both actual designs; click A or B to switch. "正式原版" opens the untouched published original.

## A — Refine the original

White + quiet blue, similar to the successful 2026 original; better spacing, typography, cropping and a restrained split composition. The real Vision Router screenshot and real settings image make up the identity. The sole sample case study is Computer History, using an authentic screenshot (example activity content), a status note and a direct link to its actual published case study.

## B — Editorial, but without decorative feature creep

Muted ivory paper, charcoal text, warm terracotta emphasis, asymmetrical typographic page composition and two carefully arranged **real** Vision Router images; narrative case study for Computer History uses a different visual rhythm. The actual product, not a synthetic 3D robot or invented metrics, creates the visual energy.

This is deliberate: A is a conservative upgrade path. B tests whether higher visual individuality and unconventional composition can coexist with credible project evidence.

Both pages are limited to **a real opening screen plus one representative case study**, to enable objective critique before full-scale frontend engineering. Full project lists, engineering qualifications and life content are not replicated inside these two sketches. The final portfolio still requires a separate content and experience design pass once a visual route survives comparison.

### Files

- Editable sources: `studies/visual-directions-2026-10-23/index.html`, `styles.css`, `app.js`, actual screenshots in `assets/`.
- Self-contained public preview: `qa/visual-directions-2026-10-23/visual-directions-ab-standalone.html`.
- Local ZIP: `qa/visual-directions-2026-10-23/visual-directions-ab.zip`.
- Real screenshot comparisons: `a-375-full.png`, `a-1440-full.png`, `b-375-full.png`, `b-1440-full.png` and matching design-only crops.
- Source baseline: the repository `main` screenshots under `qa/screenshots/desktop-1440.png` and `qa/screenshots/mobile-375.png`; a link to formal site is present.
- QA: `qa-browser.json` and `qa-axe.json`.

### Verification

Playwright Chromium (320/375/768/1440/1920) and WebKit (375/1440) completed **14 route/viewport states**. Route selector, deep links, real image decode, no horizontal overflow, no JavaScript runtime errors. axe-core WCAG A/AA-tagged automatic checks passed all **8 Chromium route/viewport states** after small-text contrast corrections. This is not full accessibility certification and not real-device Safari testing.

### Strict boundaries

No robot simulator, synthetic Agent data presented as real history, fabricated metrics, fabricated CAD assets, unverified engineering project images or fake product UI. No attempt to match the owners' five inspiration sites element-for-element. Each copied image is an existing public portfolio asset.

**Never merge to `main` without explicit owner approval.** The independent Render preview reuses its original configured entrypoint `qa/workbench-v4/workbench-v4-standalone.html` so the user can test both routes without a new paid service. Previous V4/V5/V6/V7 studies are preserved in their own `qa/` and `preview/` paths plus Git history. This directory is not a new production site.
