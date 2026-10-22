# Shirui Ye — Portfolio Design System (v2)

## Product positioning

An independent developer's verifiable body of work, not a landing-page template. Primary readers: Qoder ambassador reviewers, open-source collaborators, technical recruiters and other makers. Primary action: inspect a real repository or start a collaboration.

## Art direction

Inspired by Taste Skill v2's **Split Stage** direction. The central material is **actual project UI and evidence**, not decorative AI graphics. On desktop, a stable visual field holds real repository screenshots while the adjacent reading column tells the full technical story. On mobile, the composition changes to a readable picture-then-story sequence. The stage controls jump to individual case studies and provide a functional preview switch.

- Color: white `#fff` as ground; ink `#171d20`; deep stage `#172025`; muted text `#60696f`; subtle surface `#f5f6f4`; one blue accent `#2450d8`.
- Typography: General Sans for Latin, local PingFang SC / system Chinese for CJK; no decorative fallback serif for Chinese. H1 ~36–70px; project titles ~27–41px; long-form copy 15–18px, 1.75–1.9 line height.
- Grid: desktop 47% image + 53% reading; max layout width 1600px. Tablet (<=850px) stacks a horizontal project image section above reading; phone (<=530px) uses a compact image and 24px reading gutters.
- Spacing: fixed header 78px desktop, 72px tablet, 70px mobile. Layout gutters 24–88px, case section padding 66–105px.
- Components: readable long-form case study, source/evidence links, field note, status label, compact index row. Only one primary CTA, no redundant card grid. Corners 5–8px only where an image field or interactive control needs framing.
- Motion: reduced-motion-aware ~210ms crossfade when changing visual stage. Keyboard-accessible selection buttons with `aria-pressed` and focus ring. No uncontrolled scroll effects or autoplay.

## Content / authorship policy

Feature only non-fork, demonstrably owned repositories. Forks (`awesome-deepseek-harness`, `deepseek-harness`, `DSH-Store`, `QzonePhoto`) are **not** presented as authored projects. Claims are grounded in project READMEs; previews use image assets from the repositories. Experimental and pending items are explicitly identified. No claimed production results, metrics, awards or agent autonomy without evidence.

## Accessibility baseline

Semantic `header / main / nav / section / article / footer`; skip link; explicit link purpose; button labels; bilingual document language updates; visible `:focus-visible`; target sizes near or above 44px for key controls; readable CJK typography; touch-safe margins; `prefers-reduced-motion` supported. This is a technical baseline, not a claim of complete WCAG certification.
## v2.1 — Personal narrative modules (2026-10-22)
- New editorial sections: Engineering / Awards / Campus / Skills, complementing rather than displacing case studies.
- Research uses one dark emphasis field with factual project details and a limited three-column fact line; it collapses to rows on narrow screens.
- Awards use a vertically ordered two-column typographic ledger, not badges or trophy icon cards. At <=620px, each award's title and result stack.
- Leadership uses timeline rows; tool experience uses aligned label/value rows and explicitly labels beginner / learning status.
- The mobile top bar shows Work + Experience links, deliberately omitting About to protect 320px width. About and Contact remain in the document and are reachable by scrolling.
- Identity, privacy boundaries and source transparency are documented in PROFILE_CONTENT.md.
