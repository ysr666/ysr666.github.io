# Shirui Ye — Developer Portfolio

An editorial, responsive, bilingual portfolio for [Shirui Ye](https://github.com/ysr666). It is designed for developer-community applications (including Qoder Ambassador), open-source collaboration, and long-term reuse. Content was curated from public GitHub repositories on 2026-10-22.

## Preview and run

This is intentionally a **static HTML/CSS/JavaScript site**; there is no framework migration, server dependency, API key or build step.

- **Quick preview:** Open `index.html` in a normal browser. Keep `styles.css`, `app.js`, `favicon.svg` and `social-preview.svg` alongside it.
- **Local server (recommended):** Run `python3 -m http.server 8000` in this directory, then open `http://localhost:8000/`.
- **Automated QA:** Run `python3 qa.py` with Playwright and Chromium installed. Detailed viewport snapshots are in `qa/`.

## Publish

Upload these root files to a GitHub Pages repository or another static host:

```
index.html
styles.css
app.js
favicon.svg
social-preview.svg
```

For the canonical `https://ysr666.github.io/` URL, a public repository named `ysr666.github.io` must be created, these files committed at its root, and GitHub Pages enabled for its publishing branch. **This package has not been deployed to the user's GitHub; do not treat the example address as a live page.**

Once the canonical URL exists, change the `<meta property="og:image">` URL from the relative `./social-preview.svg` to an absolute image URL supported by the host; SVG support varies among social-card crawlers, so consider exporting the same design to PNG for broader previews.

## Content and behavior

- English / Simplified Chinese with automatic browser-locale default and local preference when allowed.
- Three editorial flagship project stories: Vision Router, Computer History and Agent Wrapped.
- Five additional direct GitHub links, with a real category filter that degrades cleanly without JavaScript.
- Responsive semantic HTML, keyboard-operable controls, skip navigation, visible focus, reduced-motion support and no third-party trackers.
- No sample testimonials, stars, fake contributor claims, placeholders or invented numbers.
- All thematic visuals are original **conceptual illustrations**, **not screenshots of released software**.

For design tokens, interaction rules and accessibility scope, read [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). For the latest screenshots and exact testing limits, read [QA_REPORT.md](QA_REPORT.md).

## Project sources

- https://github.com/ysr666/dsh-vision-router
- https://github.com/ysr666/dsh-computer-history
- https://github.com/ysr666/agent-wrapped
- https://github.com/ysr666/cuoshi
- https://github.com/ysr666/travelmap-planner
- https://github.com/ysr666/agent-picket
- https://github.com/ysr666/a-share-trader
- https://github.com/ysr666/awesome-deepseek-harness

The portfolio is hand-curated and doesn't claim to reflect the live release state of every repo. Review project descriptions as the public repos change.
