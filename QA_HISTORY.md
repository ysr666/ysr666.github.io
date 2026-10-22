# Portfolio verification report — 2026-10-22

Target: Shirui Ye portfolio, static HTML/CSS/JS; Chrome and Playwright on the connected Mac.

## Results

| Review | Outcome |
|---|---|
| Taste Skill source lint | 0 FAIL / 2 WARN |
| Taste Skill browser inspector | 0 FAIL / 2 WARN |
| Axe automated WCAG A/AA (including 2.1 / 2.2 tags) | 0 confirmed violations in tested Chinese/English states |
| Responsive browser widths | 320, 375, 390, 768, 1440, 1920px; no document horizontal overflow or page JS errors |
| Visual screenshots reviewed | 375, 768, 1440px and additional first-view breakpoints |
| Keyboard and controls | Tab/Enter/Space, focus ring, language toggle, preview selection, immediate anchor links tested |
| Mobile hit targets | 320, 375, 768px: links and buttons 44px minimum in both axes |
| Assets / internal links | No broken local images; all internal link fragments found |

Taste Skill moved from an initial **7 FAIL / 5 WARN** to **0 FAIL / 2 WARN** after visual and code repairs. Two inspector warnings remain: actual responsive font sizes exceed a five-step ideal, and no authentic video is present. Lint has different warnings: a functional language-control border and several em-dash punctuation marks.

## Verified repairs

- Made the person's actual name the hero, not a generic slogan.
- Corrected images overflowing the screenshot stage, and gave the stage scope only over featured case studies.
- Put introductory content before visual work on phones, with explicit two-row primary navigation.
- Removed obsolete styles and reorganized the site under documented tokens and layouts.
- Added four real project screenshots with source captions.
- Corrected aria names, descriptive media, focus and mobile click targets.
- Fixed a race between manual preview selection and automatic scroll-based stage changes.
- Added subtle optional section reveals, disabled when reduced motion is requested.
- Retained factual source boundaries and the career-focused content hierarchy.

## Screenshot records

- Mobile 375px: qa/screenshots/mobile-375.png
- Tablet 768px: qa/screenshots/tablet-768.png
- Desktop 1440px: qa/screenshots/desktop-1440.png
- Mobile full page: qa/screenshots/mobile-375-full.png
- Desktop full page: qa/screenshots/desktop-1440-full.png

## Limits

Axe with no detected violations is NOT full WCAG 2.2 AA certification. Native VoiceOver/NVDA, Safari/iOS behavior, forced colors, and all zoom combinations require separate manual testing. Taste Skill passing also does not certify subjective visual taste. A human should review the site and each résumé claim before using it as a formal application.


## Personal-site comparison refinement (2026-10-22)

- Compared original sites of Anthony Fu, Paco Coursey, Brittany Chiang, Emil Kowalski and Rauno Freiberg. Adapted information curation and personal voice without copying page code or branding.
- Removed the duplicate four-image gallery; original repository/source links were kept.
- Added a short, evidence-conscious Now note; edited About and intro and changed navigation to Projects / Background / Contact.
- Desktop split is now 42/58 and the intro is shorter to surface project content sooner.
- Browser check at 320, 375, 390, 768, 1024, 1440 and 1920 CSS px in both languages: no document horizontal overflow, broken image, invalid internal fragment or JS page error; 375, 768 and 1440 screenshots reviewed.
- Repeated Axe at 375, 768 and 1440: zero confirmed WCAG violations, not a certification. Taste Skill source lint: zero FAIL, two existing WARN.


## Source-backed evidence check (2026-10-22)

Taste Skill flagged too few meaningful pictures after the redundant full gallery was removed. We selected two different, actual repository screenshots instead of restoring duplicates: a Vision Router tool-response example and Computer History timeline/retention controls. The images were inspected, downloaded directly from the author's public repositories, and attached to their relevant case studies with descriptive alt text, bilingual captions and external links to the original images.

Final Taste Skill inspector: **0 FAIL / 2 WARN** (font-size count and no video). The images are actual evidence, not styled mockups. The source lint remains **0 FAIL / 2 WARN**. No video is added without authentic footage.

## Source-backed case studies & factual review (2026-10-22)

Two bilingual project case studies have been added:
- Vision Router: routing architecture, pixel-diff evidence, cloud-vision privacy caveat and v3.0.5 release.
- Computer History: Work Episodes, local SQLite, opt-in privacy boundaries, v1.1.0 release and platform compatibility caveats.

Both cases link to actual public repository screenshots and keep clear limits on what the examples establish. The main page now has a readable project-detail link for each, without removing source and release links.

The separate public FACT_AUDIT.md records which assertions were reviewed against repository releases/README, which came from the owner's research CV (self-reported), and which remain in progress. No private certificate file or contact record is published.

### Browser acceptance

Tested with Chrome and Playwright on connected Mac: 2 case pages x 320 / 375 / 768 / 1440px x 2 languages (16 final passes), plus a 1024px responsive smoke check. All final checks reported:
- Zero horizontal overflow, broken eagerly decoded image, browser page error.
- Zero visible links/buttons below a 44px width or height.
- Zero Axe WCAG 2.0/2.1/2.2 A/AA tag violations.
- Correct Chinese/English body text, headings, page titles and image descriptions.

An initial Axe pass found mismatches between visible link text and aria labels; a subsequent pass confirmed the repairs. Automated checks do not constitute complete WCAG 2.2 AA certification or manual VoiceOver/NVDA/Safari testing.

Screenshot records are stored in qa/case-studies/ for 375, 768, 1440px (plus full-page captures at 375 and 1440px).

### Navigation as served by a real HTTP server

A local HTTP server was used for navigation acceptance (plain file:// directory links are not a faithful GitHub Pages simulation). At 375 and 1440px, tests followed homepage links to both cases and then returned via the breadcrumb. All four round trips succeeded without browser script errors.
