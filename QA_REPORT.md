# Current Portfolio Visual & Accessibility QA
2026-10-22 · Chrome and Playwright on the connected Mac

## Scope
The old image-heavy Split Stage homepage was replaced by an Editorial Index after direct screenshot review of five public sites the owner likes. This is not a clone of any one reference: details, personal identity, and work are sourced from the owner's own projects.

## Automated results
- Tested viewports: 320, 375, 390, 768, 1024, 1440, 1920 CSS px.
- Both Chinese and English content: no document overflow or script errors in responsive runs.
- Final Axe checks at 320, 375, 768 and 1440 px in both languages: 0 confirmed violations using WCAG 2.0 / 2.1 / 2.2 A/AA rule tags.
- Mobile and desktop visible links/buttons: at least 44px along both dimensions after repairing narrow case/source links.
- Taste Skill source lint (index.html, home.css, home.js): 0 FAIL, 0 WARN.
- Taste Skill browser inspector is *not* fully green. It favors a large media hero, many photographs and autoplay movement, contrary to the user's actual reference sites. These heuristic conflicts are deliberately not papered over by adding stock photography. The under-13px metadata and quiet body type were also examined; running text and contrasts were improved. This does not certify visual quality.

## Actual screenshots
- qa/editorial/zh-375-fold.png, zh-375-full.png
- qa/editorial/zh-768-fold.png, zh-768-full.png
- qa/editorial/zh-1440-fold.png, zh-1440-full.png
- English first-fold screenshots for 375 and 1440 px (qa/editorial/en-...).
Previous layout screenshots and source audit are kept in QA_HISTORY.md.

## Navigation & functionality
HTML links from Projects to project-detail pages preserve the existing case study URLs. The case pages still link back to the homepage and original GitHub source, and their styling files were not replaced. Chinese content is accessible without JavaScript. Bilingual state persists when storage permits.

## Limitations
Axe zero violations is not complete WCAG 2.2 AA certification: native Safari/VoiceOver/NVDA, full zoom and forced-color/manual review remain. Individual awards should be compared against original certificates before formal job applications. Taste Skill's inspector is a generic visual heuristic, not a measure of similarity to the five chosen authentic personal sites.
