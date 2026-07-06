# Portfolio Developer Mode Redesign

Date: 2026-07-06

## Goal

Redesign Shrutik Dawane's portfolio as a static, Claude Code-inspired developer-mode experience with a simple recruiter fallback page.

The default site should feel like an interactive developer tool, not a legal-tech resume. It should present Shrutik as a Backend Python + AI Systems Engineer and let visitors ask for information through slash commands or simple natural-language queries.

## Context

The current repository is a static portfolio with a large `index.html`, a small `README.md`, and resume files:

- `Resume-ShrutikDawane-2026.txt`
- `Resume-ShrutikDawane-2026.pdf`

The current page already includes resume content, but the new direction should separate two audiences:

- Developers, founders, and curious visitors get the interactive developer-mode page.
- Recruiters get a normal full portfolio page with all details visible in a familiar format.

## Positioning

Primary positioning:

> Shrutik Dawane - Backend Python + AI Systems Engineer

Experience wording:

> Working in backend engineering since Aug 2024, starting with a 6-month internship and growing into production backend ownership.

The design must avoid making legal tech the identity of the portfolio. Legal-domain details belong inside the ALL MR ONLINE experience content only.

## Content Principles

The portfolio should include more than resume facts. It should also communicate how Shrutik works.

Tone:

- Clear, direct, and credible.
- Early-career but production-exposed.
- No inflated seniority claims.
- No "AI magic" framing; the query feature is local JavaScript.

Work-style themes:

- Owns backend features end to end.
- Comfortable figuring things out with limited hand-holding.
- Strong fit for messy data, APIs, automation, search, LLM workflows, and RAG systems.
- Interested in useful AI tooling, not hype demos.
- Works well in startup-style environments.

Target roles:

- Backend Python Engineer
- AI Backend / RAG Engineer
- Data Pipeline / Search Engineer
- General Backend Developer

The site should lead with Backend Python + AI Systems while still attracting all of the above.

## Default Page: Developer Mode

`index.html` becomes the default developer-mode portfolio.

The first screen should include:

- Basic identity: name, role, Mumbai location, concise summary.
- A command/query input as the primary interaction.
- Suggested command chips for discoverability.
- A streaming-style output panel.
- CTA buttons:
  - `Recruiter view` linking to `recruiter.html`
  - `Download resume` linking to `Resume-ShrutikDawane-2026.pdf`
  - Email, LinkedIn, and GitHub links.

Public contact on the site should show:

- Email
- LinkedIn
- GitHub

Phone number should stay only in the resume PDF.

## Commands

Developer mode supports these visible slash commands:

- `/about`
- `/experience`
- `/skills`
- `/projects`
- `/education`
- `/location`
- `/contact`
- `/resume`

Exact slash commands should be matched before natural-language matching.

## Natural-Language Matching

If the input does not begin with `/`, the page should use simple client-side keyword matching.

Examples:

- "show me his backend experience" maps to `/experience`
- "does he know FastAPI" maps to `/skills`
- "where is he located" maps to `/location`
- "show projects" maps to `/projects`
- "download resume" maps to `/resume`
- "how can I contact him" maps to `/contact`

The matching should be predictable and transparent, not clever. It should use a small set of keywords and synonyms mapped to the same sections as the slash commands.

Fallback response:

> Contact me if you have any questions about me :)

## Streaming Behavior

The output panel should mimic an AI-style streaming response without using AI.

Behavior:

1. User submits a command or query.
2. Existing output clears.
3. A small status label indicates that the local portfolio is responding.
4. The matched response streams into the output area.
5. During streaming, a new query should cancel or replace the current response cleanly.
6. Respect `prefers-reduced-motion`; if reduced motion is enabled, render the full response immediately.

The interaction should stay within the first viewport as much as practical on desktop and mobile. Users should not need to scroll to understand the answer.

## Developer-Mode Content

### `/about`

Summarize Shrutik as a Backend Python + AI Systems Engineer working with APIs, data pipelines, search systems, RAG workflows, and LLM-backed backend features.

Include the Aug 2024 internship-to-production ownership context.

### `/experience`

Summarize ALL MR ONLINE without making legal tech the site identity.

Key facts:

- Python Backend Engineer, Mumbai, Aug 2024 to present.
- First 6 months were internship.
- Built scraping pipelines for all 25 Indian High Court portals.
- Helped collect 1.5M+ legal documents.
- Processed 18M legal PDFs over 2 months with checkpointing and error logging.
- Built FastAPI semantic search and RAG pipeline using vector retrieval and search metadata.
- Deployed self-hosted vLLM coding assistant on Vast.ai GPUs for 5 developers.
- Maintained Elasticsearch indexes across 4 production applications.
- Built Flask + Nebius AI workflow generating structured legal headnotes and headlines for 180-210 judgments per month.

### `/skills`

Group skills into:

- Backend: Python, Go, FastAPI, Flask, REST APIs, GraphQL
- AI/LLM: Claude, Gemini, LLaMA, Qwen, RAG pipelines, vLLM
- Data/search: Pandas, Selenium, Qdrant, ChromaDB, OpenSearch, Elasticsearch, MongoDB, MySQL
- Infra/tools: Vast.ai, Linux/Ubuntu SSH, Git, cURL, Claude Code, OpenCode CLI, Codex

### `/projects`

Show two projects.

DBPL Org:

- Freelance project for a local library.
- Built backend with FastAPI and MongoDB.
- Supported admin and user dashboards for updating and reading library data through the backend.
- Configured GoDaddy domain, Cloudflare DNS, and HTTPS certificate setup.
- Live link: `https://www.dbplorg.com/`

SearchSlash:

- Chrome extension using plain JavaScript and Manifest V3.
- Lets users type slash shortcuts in Google Search and expands them into advanced search operators.
- Examples:
  - `/site github.com` becomes `site:github.com`
  - `/pdf` becomes `filetype:pdf`
  - `/title algorithm` becomes `intitle:algorithm`
- Works inside Google's search box.
- Keyboard-first workflow.
- No backend, no build system, and no storage dependency for the main feature.
- GitHub link: `https://github.com/shrutik-1712/searchSlash`

### `/education`

Show:

- Master of Computer Applications
- University of Mumbai
- Completed May 2024

### `/location`

Show:

- Bhandup, Mumbai
- Open to backend Python, AI backend/RAG, data pipeline/search, and general backend opportunities.

### `/contact`

Show:

- Email: `shrutikdawane1712@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/shrutik-dawane/`
- GitHub: `https://github.com/shrutik-1712`

Do not show phone number on the web page.

### `/resume`

Show a short response with a resume download link to `Resume-ShrutikDawane-2026.pdf`.

## Recruiter Page

Create `recruiter.html` as a normal static portfolio page.

It should include:

- Hero with name, role, and concise summary.
- Experience wording that mentions backend engineering since Aug 2024 and the first 6 months as internship.
- Professional summary.
- Work experience at ALL MR ONLINE.
- Skills grouped by category.
- Projects: DBPL Org and SearchSlash.
- Education.
- Contact links: email, LinkedIn, GitHub.
- Resume download link.

This page should be familiar, scannable, and not interaction-heavy.

## Visual Direction

Use a Claude Code-inspired developer-tool aesthetic without copying Claude branding.

Allowed inspiration:

- App-like command panel.
- Prompt-first interaction.
- Clean dark or neutral interface.
- Subtle terminal/editor cues.
- High readability.

Avoid:

- Legal-tech theme.
- Resume-template look on the default page.
- Heavy decorative gradients.
- Purple/orange/brown one-note palettes.
- Making the page feel like an AI product with real AI behind it.

## Technical Design

Use a static implementation:

- HTML
- CSS
- JavaScript

No React setup is required.

Recommended files:

- `index.html` for developer mode.
- `recruiter.html` for full recruiter view.
- `styles.css` for shared visual system if splitting CSS improves maintainability.
- `script.js` for command routing, keyword matching, chips, form handling, and streaming if splitting JavaScript improves maintainability.

The existing `index.html` contains multiple old style blocks and a large embedded image. Implementation should clean this up instead of stacking more CSS on top.

## Accessibility And Responsiveness

Requirements:

- Input must have an accessible label.
- Buttons and links must have visible focus states.
- The command UI must work with keyboard submit.
- Suggested command chips must be buttons or accessible controls.
- Streaming effect must respect `prefers-reduced-motion`.
- Mobile layout must keep the input and output usable without horizontal scrolling.
- Recruiter page must use semantic sections and headings.

## Testing

Manual verification should cover:

- Loading `index.html`.
- Loading `recruiter.html`.
- Slash commands:
  - `/about`
  - `/experience`
  - `/skills`
  - `/projects`
  - `/education`
  - `/location`
  - `/contact`
  - `/resume`
- Plain English matching for common queries.
- Unknown query fallback.
- Command chips.
- Streaming cancellation when submitting a new query.
- Resume link.
- External links.
- Mobile layout.
- Reduced-motion behavior by either simulating the media preference in a browser or confirming the JavaScript branch renders immediately when reduced motion is active.

## Non-Goals

- No AI API calls.
- No backend service.
- No contact form.
- No phone number on the web page.
- No full rewrite into React unless separately requested.
- No legal-tech visual identity.

## Open Implementation Choices

These can be decided during implementation while preserving the design:

- Whether CSS and JS stay inline or move to `styles.css` and `script.js`.
- Exact color palette, as long as it follows the visual direction and remains readable.
- Exact streaming speed.
- Exact keyword weights for natural-language matching.
