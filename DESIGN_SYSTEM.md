# Shirui Ye Portfolio · Design System v1.1

## 01. Product rationale / 产品定位

**What:** A long-term, bilingual portfolio for Shirui Ye, an open-source developer building AI agent tools and practical software.

**Audience:** Developer-community reviewers (including Qoder Ambassador), open-source collaborators, prospective hackathon teams, and engineers who want to inspect working code. A visitor should understand who built the projects, why they exist, and where the source is within a short glance.

**Visitor journey:** Identify the person → inspect three substantive projects → filter the smaller project index → learn about the maker → follow a GitHub repository or send an email. The site does not ask visitors to sign up, enter personal information, or interact with decorative widgets.

**Evidence model:** Project descriptions are hand-curated from the public GitHub READMEs. Every portfolio item links directly to its actual repository. Experimental status is labeled explicitly; product previews are conceptual artwork, **not** screenshots or metrics from shipped applications. Private Project18 materials and unverified numbers are excluded.

## 02. Creative direction / 视觉观点

**Editorial technical atlas（技术图谱式编辑设计）**: Agents need visual input, continuity, and reflection. The site turns these three specific themes into three distinct large-scale pieces: an optical reticle for **Vision Router**, a connected sequence for **Computer History**, and an expressive typographic poster for **Agent Wrapped**.

The first screen is intentionally asymmetric, and subsequent sections alternate between highly visual project treatments and a restrained index. It takes the *process* of `design-taste-frontend` as a design standard—subject-specific art direction, meaningful visual proof, browser review—without copying a ready-made portfolio template.

**What is avoided:** default three-column feature cards, random stock photos, fabricated metrics, floating glass UI, ornamental gradients, ungrounded social proof, and infinite scroll motion.

## 03. Tokens / 基础变量

| Role | Token | Value / usage |
| --- | --- | --- |
| Canvas | `--paper` | `#F5F2EC`, calm paper ground |
| Primary text | `--ink` | `#202423`, full-ink readable body |
| Secondary text | `--muted` | `#696C67`, supporting information only |
| Divider | `--hairline` | `#D5D3CB`, structural separation |
| Accent | `--lime` | `#D5FF60`, meaningful agent/vision signal |
| Warm project accent | `--orange` | `#F16C41`, reserved, not general paragraph text |
| Dark surface | `--navy` | `#242B42`, fallback brand-related color |
| Light focus | `--focus-light` | `#225B5B`, conspicuous on paper |
| Dark focus | `--focus-dark` | `#D5FF60`, conspicuous on dark surfaces |
| Fonts | `--font-ui` | Native system UI and CJK fallback: San Francisco, Segoe UI, PingFang SC, etc. |
| Editorial | `--font-editorial` | Georgia / Times, used only for select emphasized words |
| Code labels | `--font-code` | Native monospaced fallback; limited to indexes and tool-style labels |
| Basic spacing | `--space-1…8` | 4, 8, 12, 16, 24, 32, 48, 64 px |
| Touch | `--tap-size` | 44 px minimum for mobile controls |
| Radius | `--radius-sm` / `--radius-pill` | 2px / 999px; rectangles dominate, pills only for true toggles |
| Max content width | `--wide` | 1600px |
| Side padding | `--base-x` | Fluid `clamp(22px, 5.4vw, 100px)`; safe area-aware on phone |

**Contrast, tested with the WCAG ratio calculation** (not a full accessibility certification):

- Ink on canvas: **14.05:1**.
- Supporting muted text on canvas: **4.77:1**.
- Dark-surface supporting text (`#CED6CF` on `#222827`): **10.10:1**.
- Selected project text (`#F6F5EC` on `#151D24`): **15.56:1**.
- Dark focus indicator on canvas: **6.92:1**. Lime focus on dark Vision surface: **14.84:1**.
- Text-opacity annotations in light project areas were raised to 0.84 after review; they now exceed the normal-text contrast threshold against their intended backgrounds.

## 04. Type, grids, rhythm / 字体、栅格和节奏

- **Type hierarchy:** Oversized hero display (`clamp(51px, 12vw, 124px)` across breakpoints), sectional headlines (`38–77px`), descriptive body (`17–21px` primary; `15–19px` project descriptions), metadata (`11–13px`). Small labels are never the only explanation of an action.
- **Large screens (≥1101px):** asymmetric hero with content / concept art, equal project halves for editorial tension; full-width horizontal index rows.
- **Tablet (621–1100px):** hero becomes a stacked composition at 800px and below; project layouts remain paired until 620px. This preserves readable type rather than forcing narrow columns.
- **Phone (≤620px):** project visuals appear before text, index rows collapse to a structured two-line layout, the lesser-priority About nav link is removed, and at ≤360px Work is still available through the prominent hero CTA while the header keeps Contact and language switch.
- **Alignment:** one shared `.shell` frame, straight edges, strong visual grid. Main headings are deliberately more expressive than metadata.
- **Whitespace:** changes pace between dense work sections and quieter About / Contact areas; each open stretch has an informational purpose.

## 05. Component inventory / 组件

1. Header: brand link; Work, About, Contact anchors; bilingual language switch.
2. Hero: strong editorial statement, plain-language introduction, selected-work / GitHub actions, technical capability atlas.
3. Feature project: title, purpose, status, technical context, direct GitHub link, one conceptual artwork each.
4. Project index: native link rows with a progressive-enhancement category filter (`All / Products / Tools / Experiments`) and a live item count. The default without JavaScript remains **all five projects**.
5. About: succinct identity, engineering interests, no unverified claims.
6. Contact: a mailto primary action plus GitHub links. No fake form, loading state or analytics.

## 06. Interaction and motion / 动效和状态

- State changes must be visible *without relying solely on color*: the current filter uses both a filled shape and `aria-pressed="true"`; its live count updates in a polite announcement region.
- Native links/buttons provide keyboard activation; tab focus has a 3px visible outline and optical spacing.
- Animations: restrained one-shot scroll entrance on relevant section groups, subtle Vision ring pulse, and purposeful link-hover feedback. No `transition: all` and no scrolljacking.
- `prefers-reduced-motion: reduce`: motion and smooth scrolling are disabled, content is visible immediately. If the external JS fails or is disabled, core content remains legible; the project filter hides until initialized.
- Language: user choice persisted through `localStorage` when browser storage is available, otherwise the browser locale is used, falling back to English.

## 07. Accessibility / 可访问性

- Native landmarks (`header`, `main`, `section`, `article`, `footer`), one H1 and nested H2/H3, skip-to-content link, properly named project link destinations, SVGs marked decorative where appropriate.
- Minimum 44×44 px click regions at 320px and 375px inspected in Chromium; anchor rows are full-row targets.
- Focus rings are always visible for keyboard navigation; the design has no sticky overlays or focus traps.
- UTF-8, language tagging and per-language document title and toggle labels; programmatic content updates announced by `aria-live`.
- Responsive on 320, 375, 768, 1440 and 1920px, with horizontal scroll and element bounding-box checks.

**Scope limitation:** A browser script plus visual review does **not** by itself certify full WCAG 2.2 AA conformance. Before a formal accessibility statement, perform manual VoiceOver/NVDA and mobile TalkBack testing, text spacing/zoom stress tests, and a complete WCAG audit.

## 08. Sources and assets / 内容真实性

Repository content was grounded in publicly available project documentation for `dsh-vision-router`, `dsh-computer-history`, `agent-wrapped`, `cuoshi`, `travelmap-planner`, `agent-picket`, `a-share-trader`, and `awesome-deepseek-harness`.

Project artwork, the schematic hero, favicon, and social preview are site-specific vector compositions included in the source. They depict **ideas**, not live product UI. No third-party photographs, copyrighted artwork, external font CDN, client analytics, or remote scripts are bundled.

## 09. Inspiration and standards / 参考

- Taste Skill official repository: https://github.com/Leonxlnx/taste-skill
- Vercel Web Interface Guidelines: https://vercel.com/design/guidelines
- WCAG 2.2: https://www.w3.org/TR/WCAG22/

This design applied the publicly documented Taste Skill principles. Its installer and `draw.mjs` / `inspect.mjs` CLI were **not** executed in the restricted build container (external network access was unavailable); local Chromium + Playwright supplied the independent visual QA in `qa.py`. This distinction is intentional and documented.
