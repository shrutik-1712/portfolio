# Shrutik's Internet Home — Codex Build Instructions

> This is the implementation contract for the project. Build the actual application, not just a mockup. Preserve every user requirement below. Do not substitute a generic resume/portfolio template.

## 0. Mission and boundaries

Build a polished, expressive, playful, sophisticated **personal-brand website** for **Shrutik**: a digital home combining a bento homepage, ongoing learning, projects from across the years (including silly/unpolished ones), original blog posts and X articles, an off-screen personal scrapbook, and contact. The feeling is *independent digital magazine × experimental creative lab × personal dashboard*. It must remain understandable, fast, accessible, and mobile friendly.

**Non-negotiable stack**:
- React + Vite + JavaScript (JSX). Use TypeScript only if the existing project is already TypeScript; otherwise stay with JS.
- Tailwind CSS (current version compatible with Vite) for styling.
- React Router for navigation; Motion for React for restrained motion; Lucide React for icons.
- **Local JSON for structured content**, Markdown files for full native blog posts. Public images in `public/images/`. **No Next.js, no custom backend, no database, no auth, no Redux, no CMS**.
- A contact form may use an optional hosted form endpoint configured by env var; without it, a graceful `mailto:` fallback. Never fake message delivery.
- Only introduce a library for a clear purpose; avoid a large component kit with generic templates.

**No invented identity data**. Shrutik is the author. Do not assume a real surname, bio, job title, credentials, social handles, email address, actual projects, photos, learning expertise, or hobbies beyond the user's explicit notes. Create clearly labeled demo content and easy-to-find placeholder assets where details are missing. The user explicitly mentioned learning keyboard and enjoying wine. OF is a harmless joke link/interaction directing to a public SFW X profile, not an adult-content destination.

## 1. What to build (routes and exact required content)

Navigation can use expressive labels, but provide clear conventional labels in tooltips/ARIA and mobile navigation. These five routes **must** exist:

### `/` — Home / personal bento dashboard
- A bold, original hero introducing Shrutik, with space for real portrait, personal info, a recognizable point of view, and immediate paths to projects, writing, learning and contact.
- Interesting **responsive asymmetric bento grid**, not an endless collection of identical rounded cards.
- Portrait card using a local user-replaceable image (do not imply a stock photo is actually Shrutik).
- **Latest X post** card: support a configurable pinned X-post URL, a sanitized custom excerpt/date fallback, and optional embed where feasible. Do not claim a live/latest post without a real authorized integration.
- **YouTube playlist/watch-later-ish** card: public playlist/embed configurable in JSON. YouTube's personal private Watch Later list is generally not publicly embeddable; offer a public curated playlist instead. If playlist ID isn't configured, show a thoughtfully designed empty state, not a broken iframe.
- **Fun AI fact** card: sourced/curated fact records stored in JSON with source URL. Provide a "Another fact" interaction that cycles facts and persists nothing sensitive.
- Current status / now snippet and featured project or recent writing teaser.
- Resume link optionally visible globally or on learning/projects page; `/resume.pdf` is a configurable file and should not lead to a broken link if absent.

### `/learning` — things I'm learning + projects built over time
- **Multiple simultaneous learning subjects** with distinct cards, statuses, notes, and related projects. Include keyboard as a *sample/real user-mentioned interest*; other sample topics must be clearly editable placeholders.
- Each subject offers brief **tiny learning-log posts**: what I learned, what I felt, what was confusing, date, related link(s). These are informal and can be candid; not just skill percentages.
- Project archive covering work across years, with **serious projects, small experiments, dumb stuff, abandoned ideas and shipped work**. All are equally welcome. Add filters by year, tag and/or type; no fake achievement metrics.
- Rich individual project detail pages at `/projects/:slug`: image(s), context, why it exists, process, tech, result, what went wrong/learned, demo/repository links if present. Allow shorter entries for silly projects.
- **Resume PDF** link 'The boring official document' (only interactive if the file exists or URL is configured).

### `/writing` — all original writing and X articles
- One combined archive with filters: **All / Original blogs / X articles** (optional topics/date/search).
- Every article card shows title, image, excerpt, author **Shrutik**, created date and published date when applicable, and origin/type.
- Original blog articles have local route `/writing/:slug` with proper title, cover image, author, created date, published date, updated date (optional), Markdown content, reading time, responsive typography, code blocks and SEO-friendly title/meta if practical for client routing.
- **Base64 cover image input is allowed** in JSON (e.g. `data:image/...;base64,...`) but prefer optimized `public/images/` paths for shipped pages. Sanitize/validate formats and avoid mega-sized JSON bundles. Never require base64 for all images.
- X articles are represented by metadata and a **real original X URL** when provided. Give an obvious 'Read on X' action. Do not republish full copyrighted content automatically or present sample content as published fact.
- Full-text native blog content lives in Markdown in `src/content/blogs/`; JSON tracks metadata. Implement build-time file loading through `import.meta.glob` or equivalent Vite approach. If no actual writing is supplied, display well-labeled sample drafts or good empty states.

### `/about` — Off-screen, the human side
- Personal photo scrapbook with modular expandable interests and captions. Explicitly include **learning keyboard** (photo slot for Shrutik at keyboard) and **wine appreciation**. More interests must be addable later by editing JSON only.
- Personality, fun bits, images, short personal stories; an 'About me' description may be edited separately from the short homepage bio.
- Interest detail/modal/gallery where it genuinely helps, with accessible keyboard interactions; no obligatory carousel gimmicks.
- All photography that purports to show Shrutik must be local user-provided imagery or obvious placeholder artwork labeled as such.

### `/contact` — social links + working contact intent
- Configurable **email, LinkedIn, X**, and **OF joke** entry.
- Clicking OF triggers an accessible playful dialog / inline reveal with wording like: "You're interested in seeing more of me? Follow me on X :)" and a button to Shrutik's public SFW X profile. Never point to adult material. If X URL missing, show a safe no-link state.
- Contact form: name, email, subject/topic (optional), message; accessible required-field validation, success and error states. Implement actual submissions **only if** a hosted provider endpoint is configured, or fall back to `mailto:` while explicitly communicating the action. No false 'Message sent' toast when it wasn't sent.
- Socials, availability/response expectation optional and editable; spam defense via hosted provider if configured.

### `/playground` — recommended optional-but-desired addition
- An area for interactive sketches, mini tools, funny builds, odd experiments. Make one small **real** interaction such as a draggable idea card / shuffle machine / playful stateful widget. No static fake buttons.
- Connect playground entries back to related projects.

**Optional `/now` page**: either implement a focused now page or make the now block on Home sufficiently expressive. It should read from JSON and need no backend.

## 2. Distinctive interaction model

- Site feels discoverable **without forcing a rigid scroll order**. Main destinations are always obvious and accessible.
- Provide a global command palette activated with `Ctrl+K` / `⌘K` and a visible trigger. It searches/navigates local page, projects, blog posts, and learning topics. Trap focus correctly and support Esc to close.
- Provide a genuine "Surprise me" affordance that randomly opens a valid project, post, experiment or fact.
- Small delightful details: alive-looking status pill, precise card hover reveals, tasteful section transitions, a micro-changelog or recently-updated signal, helpful empty states.
- Motion should aid hierarchy and context. Respect `prefers-reduced-motion`; never block reading or scrolling for elaborate entry animations. Avoid custom cursor, scroll hijacking, constant marquee or pointless progress bars.
- No inert UI controls, fake counters, fake live-feed badges, or placeholder URLs that silently take users elsewhere.

## 3. Visual design direction

Aim for **editorial quality and joyful restraint**. The personality comes from irregular composition, type, microcopy, photography, content and unexpected details, not gratuitous glass blur.

Starting palette (tune as needed):
- Ink `#15171C`; warm paper `#F4F1E9`; acid-lime `#C7F568`; soft iris `#9D8CFF`; coral `#FE8C72`.
- Provide intentional light/dark themes only if implemented thoroughly; a great single-theme execution beats an inconsistent toggle.
- Typography: distinctive expressive display type paired with a legible neutral body sans (load web fonts responsibly or use reliable fallbacks).
- Use asymmetry and rhythmic spacing. Hero and selected feature stories should escape the bento grid; avoid a site made entirely of uniform tiles.
- Writing should look like a well-designed online publication with superior line length, headings, metadata and image treatments. Learning should feel like a living field notebook. About should feel like a tactile scrapbook. Work should foreground actual screenshots.
- Mobile must be a deliberate experience, not compressed desktop. Ensure 320px-ish narrow screens, tablet, desktop; avoid horizontal overflow.

Sample brand voice: curious, mildly self-deprecating, witty, friendly, not performatively corporate. Working line: "A collection of things I've built, things I'm learning, and things that probably didn't need to exist." Treat as editable copy, not a hard fact.

## 4. Source layout and data contracts

Recommended structure (adapt to existing source rather than destroy good work):

```text
public/
  images/                     # replaceable portrait, interests, project covers
  resume.pdf                  # optional user-provided document
src/
  app/                        # router, site shell
  components/
    layout/                   # nav, footer, container, mobile menu
    bento/                    # distinct home units
    common/                   # buttons, badge, dialog, media, empty states
    writing/                  # article cards and Markdown renderer
    projects/                 # archive filters, cards, detail
  pages/
    Home.jsx
    Learning.jsx
    Writing.jsx
    Article.jsx
    Project.jsx
    About.jsx
    Contact.jsx
    Playground.jsx
    NotFound.jsx
  data/
    site.json
    profile.json
    projects.json
    learning.json
    interests.json
    posts.json
    facts.json
    now.json
  content/blogs/              # *.md
  hooks/
  styles/
  main.jsx
  App.jsx
AGENTS.md
README.md
.env.example
```

Suggested JSON shapes (document schemas in README; keep IDs/slugs unique):

- `site.json`: site title, description, canonical URL (placeholder), nav labels, resume URL (nullable), form endpoint (or use env), social URLs.
- `profile.json`: name = `Shrutik`, tagline, short intro, expanded about, portrait path (nullable), latest X `{url, excerpt, postedAt}` (nullable), public YouTube `{playlistId, label}` (nullable).
- `projects.json`: list of `{id,slug,title,year,kind,status,summary,story,cover,images,tags,stack,lessons,demoUrl,repoUrl,featured,relatedLearningIds}`.
- `learning.json`: list of `{id,slug,title,status,summary,startedAt,cover,notes:[{id,date,feeling,body,links}],relatedProjectIds}`.
- `posts.json`: list of `{id,slug,type:'blog'|'x',title,excerpt,cover,author:'Shrutik',createdAt,publishedAt,updatedAt,tags,markdownFile,xUrl,featured}`; `createdAt` and `publishedAt` may differ and should not be fabricated for real posts.
- `interests.json`: list of `{id,title,summary,images:[{src,alt,caption,date}],story,featured}`. Preseed keyboard and wine categories with editable placeholder image paths if necessary.
- `facts.json`: array of `{id,text,sourceTitle,sourceUrl}` with reliable fact/source pairs. Do not display unsupported scientific claims.
- `now.json`: `{updatedAt,building,learning,reading,listening,note}`; if no actual data, default to a transparent sample state.

Implement robust nullable-field handling and use local sample data only when clearly marked in UI. No broken images: provide real self-made placeholder graphics via CSS/SVG (do not assume a portrait exists).

## 5. Navigation and content requirements

Routes:
`/`, `/learning`, `/projects/:slug`, `/writing`, `/writing/:slug`, `/about`, `/contact`, `/playground`, `*`.

- Desktop header: brand, direct navigation, command search, contact CTA (if it suits the design). Mobile: usable collapsed nav with keyboard and screen-reader support.
- Every entry has a shareable URL; use real links for navigation. React Router handles client-side transitions.
- All external links safely use `target="_blank" rel="noopener noreferrer"` where appropriate.
- Date formatting consistent and locale clear (e.g. `19 Oct 2026` for real dates; samples clearly identified).
- Search/filter states should be reflected visibly and have meaningful empty results.
- Direct navigation to nested routes should work in production with SPA fallback hosting configuration.

## 6. Engineering quality floor

- Semantic HTML landmarks (`main`, `nav`, `article`, `footer`) and one H1 per page.
- Keyboard usable navigation, visible focus rings, logical tab order, aria labels for icon-only controls, descriptive image alt text, accessible dialogs, contrast compliant text.
- Responsive images, lazy-load below-the-fold assets, defer embeds (especially X/YouTube) until user intent or viewport where sensible.
- Avoid huge base64 blobs and shipping X embed scripts on every route.
- Validate third-party URLs/IDs before embedding and defend against unsafe `javascript:` URLs. Render Markdown safely; no untrusted raw HTML execution.
- Friendly 404, loading, missing-content, and failed-embed states.
- No noisy console warnings; stable keys, valid routes, graceful missing assets.
- Use data-driven reusable components where helpful, but do not abstract away distinct personalities of pages.
- SEO basics: unique page titles/descriptions, Open Graph defaults, sitemap/robots where practical for static SPA, clean URLs. Be honest that full server rendering is not in scope.
- `npm run dev`, `npm run build`, and `npm run preview` must work. Add lint/test scripts if feasible.

## 7. Implementation workflow for Codex

1. **Inspect existing files first**. If the repo is empty, scaffold Vite React and configure Tailwind. Do not overwrite existing user assets or content. Use this document as the source of truth.
2. Establish visual foundations: tokens, typography, responsive shell, header/nav/footer, command palette, motion approach.
3. Define JSON datasets with clearly marked demo entries; create placeholder illustration components/assets rather than impersonating the user.
4. Build actual routes and all required interactions, starting with Home, Learning/Projects, Writing/Article, About, Contact, then Playground.
5. Implement markdown loading, archive filtering, fact cycling, X/YT cards, social links, OF joke reveal, contact form integration/fallback.
6. Add refinement: empty/error states, reduced-motion, small-screen layouts, accessibility, page metadata, external-link checks.
7. Run build and available checks; inspect desktop and mobile layouts. Fix discovered errors before declaring completion.
8. Write a concise `README.md`: how to run, how to replace profile and photos, how to create blog posts, how to update projects/learning/playlist/X, how to add an optional form provider, what is intentionally frontend-only, and what remains demo content.

**Do not stop at a planning document. Implement the application.** If a user-supplied asset, X handle, playlist ID, form service or resume is missing, render a clear tasteful placeholder and document exactly where to provide it. Do not ask for missing details before building workable pages.

## 8. Definition of done (acceptance checklist)

- [ ] Vite React application runs and builds without errors.
- [ ] All five required main pages function; Project and Article detail pages and Playground function.
- [ ] Homepage has portrait/info, latest-X fallback/embed, YouTube public playlist fallback/embed, AI-fact interaction and bento composition.
- [ ] Learning supports 2+ simultaneous topics, short feeling/learning logs, projects across years including dumb/abandoned projects, and a conditional resume link.
- [ ] Writing has original-vs-X article filtering, working native Markdown article pages, dates and Shrutik author attribution, cover images, and X outbound links.
- [ ] About has expandable JSON-driven keyboard, wine and future interests, with appropriate photo placeholders.
- [ ] Contact shows email, LinkedIn, X, OF joke redirect-to-X UI and validated form with real provider configuration or honest mailto fallback.
- [ ] Command palette, Surprise Me, meaningful hover/tap behavior, and at least one working Playground interaction.
- [ ] Easy data-only edits, no required backend or database, no fake social/live data.
- [ ] Looks intentional and distinct on mobile and desktop, accessible with reduced motion.
- [ ] README explains setup and all content updates, limitations and optional integrations.

## 9. Do not do these things

- Do not replace the requested pages with a standard Hero → About → Skills → Projects → Contact one-pager.
- Do not delete wine, keyboard, dumb-project categories, X posts/articles, playlist, AI facts, OF joke, or contact form.
- Do not make misleading promises of live X access, private Watch Later access, or functioning form submission without configuration.
- Do not create a server, database, auth flow or CMS as a prerequisite.
- Do not invent Shrutik's professional history, images, social URLs or published article dates.
- Do not deliver only pretty non-working mockups; **working UI and honest fallbacks** are essential.
