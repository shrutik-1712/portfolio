# Session handoff: Shrutik's Internet Home

Updated 20 October 2026. Read this file, `README.md`, and the current source before making changes. This handoff records the latest decisions; older descriptions and screenshots can be stale.

## Standing user instructions

- **Never run a build. The user explicitly said: "never build jsut code".** Several later build attempts were interrupted. Do not run `npm run build`, `vite build`, or an equivalent compilation command unless the user explicitly changes this instruction.
- Make code changes directly. Static source parsing, JSON validation, and asset-reference checks were used for the last cleanup.
- The user asked to stop the development server. It was stopped. Do not leave a server running or start a development/preview server without a new request.
- No deployment, commit, staging, or publishing has been requested or performed.
- Preserve user-provided photos, logos, resume files, real project content, and unrelated working-tree changes.
- Later user decisions override conflicting requirements in the original `AGENTS.md`. Do not restore removed features just to satisfy the original checklist.
- Do not invent identity details, credentials, project results, dates, social links, or personal stories. Existing identity details came from the supplied resume/profile and subsequent user notes.

## What this project is

A personal digital home for Shrutik: projects, learning, writing, a personal scrapbook, and contact. The user wants personality and bold typography, but dislikes a website full of boxes and redundant headings.

Workspace: `C:/Users/Shrutik/Desktop/react/portfolio`.

Stack: React 19, Vite 7, JavaScript/JSX, Tailwind CSS 4 with its Vite plugin, React Router 7, Motion for React, Lucide React, and react-markdown. Fonts are locally installed DM Sans Variable and Space Grotesk Variable. No TypeScript, backend, database, auth, Redux, or CMS.

An installed project skill is `.agents/skills/design-taste-frontend/SKILL.md` from `Leonxlnx/taste-skill`. It was used for the design work. Keep its existing installation. Skill metadata is in `skills-lock.json`.

## Latest design decisions

- Dark background, off-white text, lime accent. Editorial typography and generous spacing.
- Home retains an asymmetric responsive grid, but most content sits directly on the page.
- The portrait, featured project, and AI fact are the main boxed visual anchors. Do not turn everything back into cards.
- No global footer.
- No large redundant title/introduction blocks on Learning, Projects, Blog, Off-screen, and Contact. The shared `PageTitle` supports `quiet` to preserve a screen-reader H1. Keep article/project titles, real section headings, and the navigation.
- No homepage X post box.
- No X article cards or X archive filters. Blog has only a simple outbound "I write on X too" link plus native posts when present.
- No empty native-writing teaser, empty blog message, fake blog entry, or zero-entry count. Home must close the gap when no native post exists.
- Off-screen introductions must be open-ended, not a list restricted to keyboard and wine. The user will add interests themselves using JSON.
- OnlyFans is a playful, bold joke leading only to the configured public SFW X profile. Never an adult-content destination.
- The existing app has no command palette or Playground route. These were already removed and should not be silently restored.
- Respect reduced motion, keyboard access, focus handling, accessible dialogs, and safe external links.

## Routes and application structure

`src/App.jsx` contains the shell, navigation, routes, route metadata/focus/scroll behavior, and Surprise me.

- `/`: `src/pages/Home.jsx`
- `/learning`: `src/pages/Learning.jsx`
- `/projects`: `src/pages/Projects.jsx`
- `/projects/:slug`: `src/pages/Project.jsx`
- `/blog`: default export in `src/pages/Writing.jsx`
- `/blog/:slug`: named `Article` export in that same file
- `/writing`: redirects to `/blog`
- `/writing/:slug`: redirects to the equivalent `/blog/:slug`
- `/about`: `src/pages/About.jsx`
- `/contact`: `src/pages/Contact.jsx`
- `*`: friendly 404

`src/main.jsx` imports styles in this order: `index.css`, `home.css`, `learning.css`, `refinements.css`. Order matters because refinements override older shared styles. MotionConfig uses `reducedMotion="user"`.

`src/components/Common.jsx` contains `Media`, safe `OutLink`, `Dialog`, `PageTitle`, `Resume`, `ProjectCard`, `PostCard`, and metadata helpers. Dialog uses native `showModal()`, restores focus and body scrolling, supports Escape and outside clicks, and accounts for React StrictMode's effect replay. Do not reintroduce a native `close` listener that dismisses a second StrictMode mount.

`src/lib.js` validates URLs/images, X hosts, playlist IDs, email, dates, and public native blog records. External URLs must be HTTPS; unsafe schemes, protocol-relative paths, credentials, and backslashes are rejected.

## Current content

### Profile and links

Content is in `src/data/profile.json` and `src/data/site.json`.

- Name: Shrutik. Existing expanded profile: Shrutik Dawane, backend engineer in Mumbai.
- Portrait: `/images/shrutik.png`.
- X: `https://x.com/DawaneShrutik`.
- X articles: `https://x.com/DawaneShrutik/articles` (currently a direct link in `Writing.jsx`).
- GitHub: `https://github.com/shrutik-1712`.
- LinkedIn and public contact email are configured in `site.json`; preserve them.
- Resume: `/resume.pdf`, corresponding to `public/resume.pdf`. The link checks availability before becoming interactive.
- Home Off-screen copy comes from `profile.offscreen.title` and `profile.offscreen.intro`. Current title: "Life, off-screen." The expanded description comes from `profile.about`.
- `profile.latestX` is unused legacy configuration. There is no homepage X card.

### Three real projects

`src/data/projects.json` currently contains exactly three records:

1. Library: ID `library`, slug `a-home-for-a-library`, title `DINA BAMA PATIL LIBRARY & STUDY ROOM`. Featured client project; screenshot `/images/dbpl.png`; React, FastAPI, MongoDB; demo `https://www.dbplorg.com/`. Year is unknown/null.
2. Flinkoo: ID/slug `flinkoo`. Three-person team project from **February 2025**, subsequently **abandoned**. An AI/LLM finance data platform exploring Indian mutual-fund suggestions based on past performance. Shrutik handled backend development and integrations/connections; teammates handled mathematical work and frontend. Stack: Python, Flask, cron jobs, MongoDB, REST APIs, LLM tool calls, React. Logo `/images/flinkoo.png`. No supplied demo or repository. Do not restore the older YC/pandas/prototype copy that was replaced with the user's description.
3. Search Slash: ID/slug `search-slash`. A Chrome extension: type slash commands into Google Search and expand them into advanced search operators. Repository `https://github.com/shrutik-1712/searchSlash`. Logo `/images/searchslash-variant3-source.png`. Year unknown/null. Only Chrome Extensions is recorded as its stack; do not invent a React/backend implementation.

Project `coverFit: "contain"` selects uncropped logo presentation in archive and detail views. `coverAlt`, `coverCaption`, `role`, and `completedLabel` are supported. The Flinkoo bug was a path mismatch: the old data referenced nonexistent `flinkoo.svg`, while the real file was `flinkoo.png`. Public URLs must omit the `public/` prefix.

### Learning

`src/data/learning.json`: DSA, LLD, System design, HLD. Each currently has `notes: []`.

The four demo notes were physically removed at the user's request. Keep the subjects. Learning renders only real notes and no repeated empty-state messages. `.learning-notebook--empty` lets subject descriptions occupy an open layout without a vacant notes column.

Future notes can include `id`, `title`, `date`, `body`, `feeling`, and `links: [{label,url}]`. Separate paragraphs with `\n\n`. Notes marked sample/draft are not displayed.

### Native writing

- `src/data/posts.json` is **an empty array**.
- Sample Markdown files were physically deleted. `src/content/blogs/.gitkeep` preserves the folder.
- Keep native Markdown support for future writing. It loads through `import.meta.glob('../content/blogs/*.md', {query:'?raw', import:'default', eager:true})`.
- `isPublicBlog` excludes non-blog records and entries with `sample: true`, `draft: true`, or `status: "draft"`.
- Null `publishedAt` alone does not hide a post. README documents explicitly setting `draft: true` while drafting.
- The same public filter is used for Home, Blog, direct article lookup, Surprise me, and route metadata.
- Home adds `bento--without-writing` when there is no real blog; CSS has dedicated desktop/tablet/mobile maps without the writing grid area.
- Blog currently shows just "I write on X too" linking to the X articles profile. No empty box, counter, or sample text.
- User previously supplied X status `2083902922769752444`, but then explicitly asked to remove the entry and use only the articles-profile hyperlink. Do not add the status back.

### Off-screen

`src/data/interests.json` has two existing categories but supports any number of additional records:

- Keyboard: real user photo `/images/Snapchat-2140262531.jpg`. Alt text identifies Shrutik practising at the keyboard. Both scrapbook and dialog use it.
- Wine: `/images/wine.svg`, an abstract illustration. Keep the wine interest; the user did not request its removal. Editing instructions and the SVG's "PHOTO PLACEHOLDER" label were removed. Caption now identifies it as an illustration, not a real photograph.

About maps JSON records automatically and opens an accessible interest dialog. Do not invent extra interests or describe this as a fixed list of two hobbies.

### YouTube: important details

- Playlist ID: **`PLHMQJgI6fQ7c`**.
- User's shared URL: `https://youtube.com/playlist?list=PLHMQJgI6fQ7c&si=9VLqYdf3HqqmOiRZ`.
- Earlier watch URL included video `hABM20X0iZg`.
- The short ID is **valid**. An earlier suspicion that it was truncated was disproved. Do not ask for a longer ID again.
- A direct read-only request to YouTube returned a playlist titled "Watch Later" with three videos. This is a separately shared playlist, not the account's private system Watch Later list.
- The `youtube-nocookie.com` embed failed/was incomplete in the diagnostic browser; `youtube.com` loaded the real preview. The implementation uses `https://www.youtube.com/embed/videoseries?list=PLHMQJgI6fQ7c`.
- "Open on YouTube" is always available while configured, including if embedding fails.
- **Latest user preference: load the iframe automatically on Home.** `video` state initializes to `true`. Do not restore click-to-load. There is no autoplay parameter; videos should not start automatically.
- An iframe error can show the retry/outbound fallback. Cross-origin YouTube player-level errors do not always trigger native iframe `onError`; do not promise exhaustive error detection.

### AI facts and interrupted shuffle fix

- `src/data/facts.json` currently contains **100** sourced records. The user expanded the list during the session; preserve it.
- Shuffle currently cycles through records rather than randomly selecting. User's complaint was changing box size/alignment when clicking, not the selection algorithm.
- Fix implemented in **`src/components/FactCard.jsx`**, used from Home. State is local to the card.
- `.fact-text-stack`, `.fact-source-stack`, and invisible `.fact-size-reserve` grid overlays reserve the maximum wrapped height across all fact texts and source titles at the current viewport width. This avoids a hardcoded height or clipping long facts.
- Reserved copies are `aria-hidden`, `inert`, invisible, and noninteractive; only the active source is a real link. The active fact uses a polite atomic live region and a brief opacity transition.
- **The size-stability fix has passed static parsing only. It has not been browser-verified across all 100 facts.** A proposed stability-check script was not completed/run because of interrupted tool calls and the user's no-build instruction.
- Known source issue: fact `dartmouth-proposal` has an `http://raysolomonoff.com/...` URL. `safeUrl` accepts HTTPS only, so its source link is omitted. Verify a valid HTTPS source before changing it; do not weaken URL safety globally.
- The scientific accuracy of all 100 expanded facts was not audited. Do not claim all facts have been verified.

### OnlyFans joke: latest version

`src/components/OnlyFans.jsx`:

- Home: large bold "OnlyFans.", "For the people who clicked before reading.", and "Go on. Be curious." with an arrow.
- Contact: smaller social row with "For the extremely curious."
- Dialog title: "Plot twist."
- Punchline: "Only posts."
- Body: "You wanted more of me? Best I can do is my X feed."
- Button: "Follow me on X", pointing to the validated profile URL in `site.json`.

User requested a funnier, bolder section. It remains open typography rather than another colored box. JSX and CSS were statically parsed. The newest design has not had a browser review; build attempts were interrupted and builds are now forbidden.

### Contact

Working client validation for required name, email, and message. Subject optional. Hosted endpoint is optional through `VITE_FORM_ENDPOINT` or `site.formEndpoint`, both currently unconfigured.

Without a provider, it prepares a `mailto:` draft and explicitly says the user must send it from their email app. Do not fake a successful send. With a provider it uses JSON POST, a timeout, error feedback, and a honeypot. Never put secrets into Vite environment variables.

## Completed production cleanup

The user explicitly requested deletion after a cleanup review. Completed in the last work turn:

- Removed fictional "One more tab" project from `projects.json`.
- Removed four demo learning notes; kept the four subjects.
- Removed both sample blog metadata records; `posts.json` is empty.
- Deleted `src/content/blogs/small-things.md` and `beginner.md`; added `.gitkeep`.
- Deleted obsolete generated images: `flinkoo_1.svg`, `library.svg`, `portrait.svg`, `shuffle.svg`, `keyboard.svg`, `tabs.svg`.
- Deleted `scripts/create-art.mjs`, which would recreate obsolete example artwork.
- Removed wine editing prompts and its SVG's placeholder label; kept the interest and illustration.
- Removed obsolete footer, command palette/search, playground/idea-machine, mini-keyboard, and old joke-monogram selectors. PostCSS removed 85 rules/selector branches from `index.css`, 3 from `home.css`, and 8 from `refinements.css`, preserving surviving selectors in mixed-selector rules.
- Removed unreachable X article rendering from the native `Article` component and cleaned its sample branches/imports.
- Rewrote README around the real current routes, data schemas, empty writing/notes, automatic YouTube loading, real assets, contact fallback, and manual deployment.

`public/images/writing.svg` remains because `index.html` still references it for the default social preview. Do not classify it as unused without updating that reference.

Historical files in `archive/` were preserved; they are not part of runtime source imports or the public deployment. Do not delete historical/user files merely because they are outside the app.

## Git and local tooling

`.gitignore` already excludes node_modules, dist, local env files except `.env.example`, logs/caches, `.taste-skill/`, `artifacts/`, browser test reports, `.vercel/`, `.netlify/`, and common editor/OS files.

Do not ignore `src/`, `public/`, `.env.example`, or `package-lock.json`.

The working tree has substantial existing changes. Most application files are still untracked, including `src/`, `public/`, package files, scripts, Vite config, README-related additions, and project skills. Existing tracked resume files are modified, and a previous spec file under `docs/superpowers/specs/` is deleted. Those changes predate the final cleanup; do not reset, overwrite, stage, commit, or restore them without an applicable user request.

`.taste-skill/` contains local direction notes, screenshots, and ad hoc diagnostic scripts. These are ignored, optional, and **not authoritative tests of the current state**. Examples:

- `verify-design.mjs` expects older writing filters/sample content.
- `check-content.mjs` was written before the demo project/sample articles were deleted.
- `check-visibility.mjs` predates cleanup changes and some layout tweaks.
- `check-youtube-fixed.mjs` expects a Load playlist button, but auto-loading superseded that behavior.
- `review.md` reports an older design round.

Do not run those unchanged or mistake an old failure for a new regression. `scripts/verify-pages.mjs` and `verify-home-source.mjs` expect a development server on 5173. The user asked for code only; do not launch a server to satisfy them automatically.

## Verification: exact status

Before the no-build instruction and later changes:

- Production builds succeeded multiple times, with a large single-JS-chunk warning (roughly 585 kB uncompressed / 188 kB gzip on the then-current app).
- The three existing Node content/URL tests passed.
- `npm audit --omit=dev --json` reported zero known vulnerabilities at the time of the audit; dependencies have not since been intentionally changed.
- Earlier browser checks covered routes at 1440/768/390/320px, no overflow, dialogs, filters, validation, reduced motion, image loading, and native-writing omission.
- The regular YouTube embed showed a real video preview in a temporary browser diagnostic. Its server/browser were closed after verification.

After the **latest deletion/cleanup**, without a build/server:

- Parsed every source JS/JSX file with Babel's parser.
- Parsed every stylesheet with PostCSS.
- Parsed all JSON data.
- Checked every image path referenced by runtime source/data and `index.html` exists.
- Checked exactly 3 real projects, 4 learning subjects with empty notes, empty post metadata, and no sample Markdown files.
- Checked removed demo slugs/Markdown references no longer occur in source.
- Checked the wine SVG has no placeholder label.
- Checked named removed feature selectors are gone.

All those static checks passed. **Do not claim the final cleanup, newest OnlyFans design, or shuffle stability have been built or browser-tested.**

No server was started for the latest cleanup or for writing this handoff.

## Remaining production considerations (not an authorization to change them all)

1. Final visual/interaction verification of FactCard sizing and the newest OnlyFans section remains outstanding, subject to the user's tooling restrictions.
2. Verify/replace the HTTP-only Dartmouth fact source with an appropriate HTTPS source. Vet factual claims if preparing the fact library for publication.
3. Optimize large existing images if requested: library screenshot about 1.49 MB, Search Slash source logo about 745 kB, portrait about 608 kB. Do not delete or overwrite original user assets casually.
4. `site.canonicalUrl` is null and currently not rendered into a canonical tag. Domain/hosting provider have not been supplied.
5. `index.html` still has a relative SVG social-preview image referencing the writing illustration. A real production sharing image and domain-aware metadata would be useful. Do not invent a domain.
6. `public/_redirects` contains `/* /index.html 200`. Confirm the chosen static host's equivalent SPA fallback when hosting is known. Deploy only a user-produced `dist/`, not the entire workspace.
7. Existing `dist/` output is stale after recent code changes. Do not deploy it or regenerate it against the user's standing no-build instruction.
8. There is no configured hosted contact provider. This is not a blocker because the honest email-draft fallback is intentional.
9. No commits or deployment have been done. If the user later requests Git-based deployment, the application files must actually be committed first, while preserving unrelated changes.

## How to resume

The latest requested deletion work is complete. This handoff is the current task's deliverable. Wait for the user's next requested change rather than starting production work or rebuilding on your own. Recheck files before edits because the user edits content during the conversation.
