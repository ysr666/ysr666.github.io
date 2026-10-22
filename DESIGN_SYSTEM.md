# Shirui Ye / 叶石瑞 — Personal Site Design System
2026-10-22 · Editorial Index direction

## Positioning
This is a young mechanical engineering undergraduate's personal homepage, not a SaaS product landing page or a fabricated senior engineer résumé. Visitors should immediately see who is here, what open-source code exists, which work is experimental, and where to contact the owner.

## Five visual references actually examined in Chrome
- Anthony Fu (antfu.me): human prose and repository links in a relatively narrow text column.
- Paco Coursey (paco.me): concise building, projects, now and contact; a compact editorial layout.
- Emil Kowalski (emilkowal.ski): plain project links and confident typography without decorative screenshots.
- Brittany Chiang (brittanychiang.com): career evidence and projects organized distinctly with clear identity.
- Rauno Freiberg (rauno.me): precision and artistic personality; we avoid copying his yellow disk or theatrical motion.

The original old site was a large sticky project visual and resembled product promotion. The selected user references are mainly about the *person and useful links*. We prioritize the Anthony/Paco/Emil approach while retaining reliable résumé facts and deliberate interactions.

## Tokens
- Canvas: #fbfbfa, slightly warm white.
- Main ink: #1e2528, body copy #35444a, muted #48575d, fine metadata #626f74.
- Link: #274c65, focus ring #2c50c7.
- Font: General Sans plus local PingFang SC / system fallback.
- Centered main column: 720px. Desktop 17px personal intro and 16px project prose; ~52px hero identity, 16px section heading, 19–20px project title.
- Spacing: editorial rhythm with 24/32px within sections and 60–90px chapter gaps. Mostly no borders, shadows, gradients or container cards.
- Responsiveness: at 530px a two-row accessible header; one-column project index, actual 44px links.
- Motion: restrained hover/focus state. No autoplay animation or media.

## Information architecture
Identity & introduction → What I am doing now → three main open-source works → four small projects → education and short engineering practice → awards, CET qualifications → About, tools, and contact.

Every main project title links directly to a real case study or source. The two case studies retain full source-backed screenshots, deeper engineering details and limitation notes. All previous detailed case-study files are preserved under projects/ and continue using the existing styles.css and project-detail.css.

## Accessibility and content boundaries
Native headings, links and landmarks; keyboard focus visible; no forced browser zoom restrictions; all visible interactive controls measured at least 44px at tested widths. Chinese remains accessible without JS; the English toggle appears only when JS is available and updates the selected language, title and document language. Fact claims use FACT_AUDIT.md and published GitHub release records. No unrelated forks, invented measurements or inflated awards.

## Deliberate check-tool exception
Taste Skill source lint passes 0 FAIL / 0 WARN. Its browser inspector still requests multiple photographs, autoplay motion and a dramatic image-led hero. These are deliberate exceptions because most of the actual sites chosen by this user have a text-led homepage and little to no imagery. Adding arbitrary media to satisfy an award-site heuristic would betray the reference preference. See QA_REPORT.md for transparent coverage and limitations.
