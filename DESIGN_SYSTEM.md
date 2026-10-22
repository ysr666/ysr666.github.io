# Shirui Ye — Portfolio Design System

Updated 2026-10-22. Art direction: Taste Skill v2 Split Stage, modified for a public developer portfolio.

## Positioning and user journey

Audience: open-source collaborators, internship/recruitment reviewers, developer-community organizers and technical peers. Primary action: inspect a real source repository. Secondary actions: understand engineering background, view confirmed competition distinctions / CET qualifications, and make contact.

Reading hierarchy: personal identity → featured verifiable work → actual project screenshots → smaller projects → concise engineering → honors → qualifications → contact.

## Visual concept

Real software screens are the visual material, not generic AI illustrations. The large screenshot field stays beside the three featured case studies only, then releases; the remaining material becomes a full-width editorial archive. On mobile, the name and introduction precede the screenshot. Agent Wrapped uses typographic artwork identified as artwork, not a false application screenshot.

## Design tokens

| Role | Value |
|---|---|
| Background | #ffffff |
| Main text | #171d20 |
| Secondary text | #59666c |
| Quiet field | #edf2f2 |
| Accent / focus | #2450d8 |
| Image stage | #141e22 |
| Small / body / lead | 13px / 16px / fluid 19–23px |
| Heading / display | fluid 30–40px / 52–86px desktop, narrower on phones |
| Typeface | General Sans for Latin, PingFang SC / system fallback for Chinese |
| Space | 4, 8, 12, 16, 24, 32, 48, 64px rhythm |
| Radius | 5px for image fields and CTA, functional pill for language |
| Motion | 230ms screenshot crossfade and small 450ms one-time section reveals |
| Grid | 47/53 desktop split, stacked at 850px, two-row phone nav <=530px |

The measured font sizes between roles result from fluid scaling, Latin/CJK metrics and localized components; the design uses five main semantic tiers.

## Interaction, semantics and responsiveness

Semantic main, nav and sections; one H1 for the person's real name, skip link, descriptive images and project links. Explicit focus rings. All visible mobile controls are at least 44×44 CSS px. No browser zoom restrictions. Full keyboard use, named project preview buttons, correct pressed state, language switching in place and persistence where storage is available. Browser fragment jumps are immediate rather than animated through long pages. Motion respects the reduced-motion preference and never blocks reading.

The screenshot gallery uses four raster images from actual public Vision Router and Computer History repositories. Experimental or pending work is labeled, forked repositories never claimed as original, and private projects/contact details remain excluded.

## Deliberate Taste Skill exceptions

No video: there is no verified footage in the evidence selected for this page; inventing a demo would undermine credibility. The language switch retains a functional 1px border for affordance. Computed responsive type yields more pixel sizes than the five semantic roles. No gradients, at-rest shadows, decorative card grids or invented statistics.

See QA_REPORT.md for tested coverage and remaining limits.
