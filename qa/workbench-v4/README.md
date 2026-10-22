# Assembly Atlas 018 · V4 independent personal-site preview

**Experimental only; never part of the production GitHub Pages root.** Assembled on `design/portfolio-directions`, keeping V1, V2, V3 and the published `main` untouched.

## Visual polish

V3's static corner ornament became an illustrated, connected, three-piece apparatus. The Observe reticle follows the selected image location; Remember highlights the current mock episode; the drawing's Move linkage updates from the same real 2D math used in the workbench. This is a graphic metaphor, not a calibrated robotics system or live computer-vision product. The hero's typography remains the identity anchor; it does not devolve into a generic SaaS splash page.

A small *Now* note was added from already-stated work (open-source agent tools, SolidWorks practice, sample-transfer concept), linking directly to the full engineering section. Genuine project images carry a clear *actual project evidence* label. No projects or qualifications were deleted. Chinese and English rendering remains complete.

## Source and delivery

- `prototypes/workbench-v4.html/.css/.js`, plus `prototypes/workbench-v4-i18n.js` — editable source;
- `qa/workbench-v4/workbench-v4-standalone.html` — one HTML with all image assets, CSS and JS embedded, links to the real detailed case studies on production;
- `qa/workbench-v4/workbench-v4-single-file.zip` — packaged offline fallback;
- `qa/workbench-v4/hero-zh-{320,375,768,1440,1920}.png` and matching `hero-en-...` — actual screenshots; `full-en-375.png` and `full-en-1440.png` — complete page;
- `qa-smoke.json`, `qa-axe.json` — preserved browser observations.

## Verification

- Chrome 155 + Playwright, 320/375/768/1440/1920px: Chinese→English→Chinese→English, Observe→Move→Remember, temporary trace preserved across locale change, no console/page errors and no horizontal overflow.
- Playwright WebKit 26.6 engine, 320/375/768/1440px: English Observe→Move→Remember, no horizontal overflow, no JS errors. *This does not count as a physical iPhone Safari test.*
- axe-core 4.10.3, 375/1440px × two languages × three modes: zero **confirmed automated WCAG A/AA-tag violations**; automated testing is not WCAG certification.
- V3 keyboard, reduced-motion and four-image decoding checks remain applicable; V4 retains those controls.
- Actual original project images, team credit, published/unpublished status and award claims should continue to be evaluated against `FACT_AUDIT.md`.

## Release limitations

- The drawing is non-calibrated artistic feedback, not real control hardware.
- No privacy-sensitive device activity is collected; synthetic episodes and transient session tape only.
- Full manual screen-reader and physical-device Safari testing are still recommended before production.
- No merge into `main` without owner approval. The public preview is explicitly a design experiment.
