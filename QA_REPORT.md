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
