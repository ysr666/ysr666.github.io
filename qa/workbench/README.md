# Workbench 018 — interactive personal-site concept

Prototype, not production. Built on a separate branch without modifying main.

## Try it

1. **看见 / Observe:** hover/tap a real Vision Router screenshot. The view box, coordinate readout and zoom panel update locally. It does not make live AI inference.
2. **记住 / Remember:** choose CODE / READ / TEST in the explicitly synthetic Work Episode. No real personal logs are accessed.
3. **运动 / Move:** drag the coral joint on a planar two-link SVG, use two angle sliders, or use keyboard arrows. This is genuine simple kinematics, not a tested physical robot or six-servo CAD simulation.

The remainder of the page retains released/experimental projects, engineering, awards, CET-4/CET-6 and contact.

## Files and usage

- prototypes/workbench.html, .css and .js: editable source.
- qa/workbench/workbench-standalone.html: one complete self-contained HTML file with embedded CSS, JavaScript, and genuine GitHub project screenshots. It opens locally without a server. Web fonts fall back gracefully when offline.
- qa/workbench/workbench-single-file.zip: zipped version for quick transfer.
- qa/workbench/hero-375.png and hero-1440.png: Chrome viewport screenshots.
- qa/workbench/full-375.png, full-768.png, full-1440.png: full-page screenshots.

## QA

Chrome/Playwright viewport checks at 320, 375, 768, 1024, 1440 and 1920 CSS pixels: no page errors or horizontal overflow. All three modules switch and perform their advertised interactions.
Axe automated WCAG rule-tag checks at 375 and 1440 CSS px, each of the three states: zero confirmed violations after fixing contrast and nested-interactive markup. This is not WCAG certification.

This is a Chinese-first interaction test, NOT a completed replacement for the earlier bilingual portfolio. Full translation, native iOS touch testing and user review come before any production release.
