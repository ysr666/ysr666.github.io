# Design system v2 — learning and implementation plan

Status: P0 completed for the foundation sources listed below; P1 shared layout and token implementation, P2 initial semantic type scale, P3 initial common shell and heading fixes are in this branch. P4 full visual review and P5 browser acceptance are open. Do not describe the whole site as verified until screenshots and test results are reviewed.

## Study notes: primary sources, 2026-11-27
- Fluent 2 Layout (https://fluent2.microsoft.design/layout): global 4px base, columns/gutters/margins, vertical and horizontal keylines. Apply one page rail, 4px spacing family and deliberately aligned image modules.
- Fluent 2 Design tokens (https://fluent2.microsoft.design/design-tokens): distinguish raw values from semantic role aliases. Use spacing primitives and role aliases for page gutter, grid gap, and section spacing.
- Carbon 2x Grid (https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview): 8px mini unit, fixed margins per breakpoint, consistent keylines, proportions. Adapt the method rather than copy IBM's 16-column grid.
- Primer Layout (https://primer.style/product/getting-started/foundations/layout/): focused, uncluttered pages, responsive functionality and familiar web conventions. Use real routes and stable navigation.
- Primer Typography (https://primer.style/product/getting-started/foundations/typography/): rem tokens, unitless line height, semantic heading order, reasonable line lengths. Add actual Work H1; role-based styles independent of heading tag.
- Apple HIG typography (https://developer.apple.com/design/human-interface-guidelines/typography.md): use restrained typography and adapt to text sizing. Apple guidance is platform-oriented, not a web specification.
- WCAG 2.2 contrast/reflow/target size (https://www.w3.org/TR/WCAG22/): normal text 4.5:1; qualifying large text 3:1; reflow at 320 CSS px with permitted exceptions; AA minimum target size 24 CSS px or applicable exceptions. Our chosen main-control minimum is 44px, not a claim that WCAG AA mandates 44.

## Chosen site system (our adaptation)
- 1280px max page shell; fixed gutters 48 / 32 / 20 / 16px at viewport ranges. Header, landing pages and case studies share the same edges.
- 5:7 two-column homepage/work layout, single-column at <=850px. Explicit gaps 32/24/16px. Music uses three equal square image modules, travel impressions three equal columns; these are layout patterns, not a claim of a universal implemented 12-column CSS grid.
- Spacing primitives 4,8,12,16,20,24,32,40,48,64,80,96px. Preserve exceptional legacy microspacing until component-level review; no indiscriminate rounding.
- Semantic type scale with rem-based body/caption and fluid H1/H2/H3; preserve actual name as a deliberate display role.
- Content: preserve public selection only, no imported personal playlists or precise itinerary points. Do not add new personal claims.
- QA: 320/375/768/1024/1440, both languages, test shared content rails, unique H1 on main landing pages, equal feature cover dimensions on desktop, hero alignment, existing navigation and privacy checks. Screenshots across routes; inspect optical alignment separately from box geometry.

## Execution queue
P0 study: foundations done; remaining research for components (Apple layout Markdown, Fluent component guidance, Primer navigation, WCAG keyboard/focus) before deeper component migration.
P1 implementation: shared page width, gutters, gaps, selected spacing token migration, repair case-grid percentage-plus-gap overflow.
P2 implementation: initial common type roles, Work H1. Remaining: audit all component font sizes, line lengths and actual contrast.
P3 next: eliminate duplicated headers using maintainable generation/checking; verify active states, keyboard and focus, minimum target dimensions.
P4 next: review actual screenshots of home, work, background, music, travel and both project cases at desktop and mobile. Revise composition against keylines, preserve content and real imagery.
P5 acceptance: test zoom/text resize, reduced motion, offline asset fallback, screenshot review and CI. Publish only checked changes.

## P2/P3 study and implementation round
- Fluent typography (https://fluent2.microsoft.design/typography): role-based type ramp; use consistent body, caption and heading roles rather than individual sizes. Current editorial display headings remain exceptions by design.
- Primer links and buttons (https://primer.style/accessibility/design-guidance/links-and-buttons/): navigation uses native links, actions use native buttons. Shared disclosure header retains normal links instead of ARIA menu widgets.
- WAI APG disclosure navigation (https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/): native disclosure buttons, aria-expanded, Tab through links, Escape dismissal and restored focus. Example is guidance, not a claim of tested AT compatibility. Keyboard regression tests added.
- Shared header source: templates/site-header.html; regenerate using python tools/sync_header.py. CI checks generated static markup on nine real pages. No runtime dependency. Route-specific state and legacy links preserved.
- CI trigger corrected to include design-system branches. Browser acceptance pending; screenshot review and further contrast checks are open.

## P4/P5 acceptance round
First browser run 45856785468: shared static header check passed; immediate keyboard Tab after opening Life disclosure failed. Fix visibility transitions and make Tab enter the opened disclosure explicitly. Preserve Escape and focus restoration checks. Independent first-screen capture of eight routes at 375/1440 px in both languages now precedes interaction tests, so visual review can proceed even if later tests fail. No full visual acceptance claimed yet.

Baseline screenshot review (published build 8ebca619; artifact 15135922026): name and dark panel top edges improved, but the desktop image panel's intrinsic image heights stretch the hero beyond the first viewport, leaving the project caption/controls below the fold and excessive empty space on the right. Music feature cover sizes differ; this is addressed by P1's equal square grid but still requires new screenshots. Mobile structure is understandable but dense; preserve readable hierarchy. Implement bounded desktop stage with absolutely positioned frame inside the shared grid row, so the intrinsic screenshots cannot inflate row height. Correct cross-page CTA arrows. Add 1440px first-viewport regression check. Current branch screenshot acceptance pending.
