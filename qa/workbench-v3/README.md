# Assembly Log 018 / Workbench V3 — Bilingual QA Candidate

**Status:** experimental candidate only. `main` remains untouched. Built 2026-10-23 on `design/portfolio-directions`, preserving both V1 and V2.

## What was actually completed

1. **Real bilingual operation, not merely navigation labels.** A new EN/中 switch translates the visible work, projects, engineering, competition, skills, contact, legal/status notes, image alternative texts, instructions, and relevant screen-reader labels. It also translates dynamic work episodes, observation-linked movement instructions, and temporary activity tape entries. HTML `lang`, title and meta description change with the language.
2. **Retains the personal identity.** "叶石瑞" remains a visual signature in both languages, paired with "SHIRUI YE". The language control does not wipe local experiment state, simulated target, or motion position.
3. **More reliable narrow-screen control layout.** The English module names fit the 320/375px mode switch without crushed index badges.
4. **Fixed a real WebKit-specific 375px overflow** caused by adjacent translated title words being joined without whitespace.
5. **A11y contrast fix**: mode tabs now switch colors immediately instead of passing through briefly unreadable in-between color values; low-contrast labels on the motion rail were darkened.
6. Preserved V2's connected Observe → synthetic mapped target → Move action and the on-page-only history. The arm, image crop, and episode data remain clearly marked as demonstrations. The project portfolio and evidence remain fully accessible without interacting with the modules.

## Files

- `prototypes/workbench-v3.html`: editable HTML
- `prototypes/workbench-v3.css`: style layer (on top of V2 base styles)
- `prototypes/workbench-v3-i18n.js`: explicit, auditable translation dictionary
- `prototypes/workbench-v3.js`: interactions and reversible localization
- `qa/workbench-v3/workbench-v3-standalone.html`: self-contained CSS, JS, images; browser-ready without a server
- `qa/workbench-v3/workbench-v3-single-file.zip`: zipped standalone HTML
- `qa/workbench-v3/hero-{zh,en}-{320,375,768,1440,1920}.png`: Chrome screenshots
- `qa/workbench-v3/full-en-{375,1440}.png`: full-page captures
- `qa/workbench-v3/qa-smoke.json` and `qa-axe.json`: structured browser test evidence

## Verification (executed, not inferred)

**Chromium** (macOS Google Chrome 155, Playwright), widths 320 / 375 / 768 / 1440 / 1920 CSS px:
- Complete Chinese→English→Chinese→English switching retains the displayed interactive episode; Observe image selection enables Move to synthetic target; tracing and revisiting the episode work.
- No horizontal overflow before or after the test, and no JavaScript or browser-console errors.
- The standalone package was used for final Chromium browser screenshots and smoke test.

**WebKit** (Playwright WebKit 26.6, macOS), widths 320 / 375 / 768 / 1440 CSS px:
- English Observe→Move→Remember completes; no JS errors or horizontal overflow after the mobile fix.
- WebKit browser-engine emulation is **not** a physical iPhone Safari test.

**Axe-core 4.10.3**: 375 and 1440 CSS px × Chinese and English × See / Memory / Move (12 distinct states), automated WCAG 2/2.1/2.2 A/AA-tag checks: **zero confirmed violations** after contrast fixes. Automated checks are not full WCAG certification; inspect `qa-axe.json` for `incomplete` manual review items.

**Keyboard and reduced motion:** keyboard Enter triggers language switch; arrow keys move between tabs, wrap from first to last, select observations and adjust shoulder angle. With reduced-motion enabled, module transitions are 0 seconds and CSS scrolling is not animated. All four embedded project images decoded successfully in the checked source page.

## Explicit limitations

- No physical iPhone Safari touch session or comprehensive manual VoiceOver/screen reader pass. The Mac WebKit checks are not a substitute.
- No independent online preview URL verified; third-party HTML preview providers have not been presumed to work.
- The Chinese glyphs and actual project name "错事" intentionally remain in an otherwise English interface.
- The trace is ephemeral frontend memory, not a Computer History data collection system.
- The image-to-arm link uses arbitrary normalized coordinates. **It is not calibrated robotics or live visual recognition.**
- English copy is editorial, not an official translation of award certificates. Levels, contributors, roles and unfinished projects remain as stated by `FACT_AUDIT.md`.
- Human review is still needed before this could be considered ready for the formal site.

## Reference-site synthesis (not copying)

- **Anthony Fu:** an evolving personal space rather than a product sales funnel.
- **Paco Coursey:** clear reading hierarchy with substantial projects and a separate smaller-work layer.
- **Emil Kowalski:** predictable purposeful interactions, no animation required for basic usability.
- **Brittany Chiang:** verifiable project case studies, experience and awards stay easy to access.
- **Rauno Freiberg:** a bold typographic signature and a visually coherent machine-workbench metaphor.

## Branch safety

Only `design/portfolio-directions` receives this work. V1 and V2 remain intact. **Do not merge to `main` until the owner has reviewed the visual design.** This experimental stage is not a promise of production-readiness.
