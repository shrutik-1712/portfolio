# Shrutik's Internet Home

A personal website built with React, Vite, JavaScript, Tailwind CSS, React Router, Motion, and Lucide. Structured content lives in local JSON; native articles use Markdown. No backend, database, authentication, or CMS is required.

## Run locally

Use Node 22.12+ or another version supported by the installed Vite version.

```sh
npm install
npm run dev
```

Available commands: `npm test` checks content and URL safety; `npm run build` produces `dist/`; `npm run preview` serves that output. Builds are a manual deployment step.

## Pages

- `/`: introduction, portrait, now notes, featured project, AI facts, YouTube playlist, and links to Off-screen and contact. A writing teaser appears only when there is a public native blog entry.
- `/learning`: DSA, LLD, System design, and HLD, with expandable notes when supplied.
- `/projects` and `/projects/:slug`: project archive, filters, details, images, and available external links.
- `/blog` and `/blog/:slug`: native writing. The archive currently contains only the link to X articles because no native posts have been added. `/writing` links redirect to `/blog`.
- `/about`: the Off-screen scrapbook. Add any number of interests through JSON.
- `/contact`: social links and the contact form. The OnlyFans joke opens a dialog linking to the public X profile.

There is no footer, command palette, or Playground route.

## Edit content

Edit files in `src/data/`. Keep IDs and slugs unique. Use `null` for unknown dates and URLs. Dates use `YYYY-MM-DD` and display in English (UK) format.

| File | Content |
| --- | --- |
| `site.json` | Site title, description, navigation, resume URL, optional form endpoint, and email/LinkedIn/GitHub/X links. `canonicalUrl` is reserved configuration; it is not currently rendered as a canonical tag. |
| `profile.json` | Name, homepage tagline, about text, portrait, `offscreen.title`, `offscreen.intro`, and YouTube `{playlistId,label}`. The unused `latestX` settings are retained for compatibility; there is no homepage X card. |
| `projects.json` | `{id,slug,title,year,kind,status,summary,story,context,process,result,cover,images,tags,stack,lessons,demoUrl,repoUrl,featured,relatedLearningIds}`. Optional `role` and `completedLabel` describe contributions and dates. |
| `learning.json` | Subjects `{id,slug,title,summary,notes,relatedProjectIds}`. Notes use `{id,title,date,body,feeling,links}`; links use `{label,url}`. Empty note arrays show no example posts or empty-state messages. |
| `posts.json` | Native post metadata; initially an empty array. See the article example below. |
| `interests.json` | `{id,title,category,summary,images,story,featured}`. Each image uses `{src,alt,caption,date}`. Additional records appear automatically on Off-screen. |
| `facts.json` | `{id,text,sourceTitle,sourceUrl}`. Provide a reliable HTTPS source. The card reserves space for the longest fact and source title to prevent layout shifts when cycling. |
| `now.json` | `{updatedAt,building,learning,reading,listening,note}`. Home displays the configured now information; empty optional values are omitted. |

Real projects, the portrait, and the keyboard photograph are user supplied. Wine uses an abstract illustration. Demo projects, learning notes, and blog articles have been removed. Historical source material remains in `archive/`, outside the deployed site.

## Images and resume

Place images in `public/images/` and reference them as `/images/filename.ext`, without `/public`. Paths and extensions must match exactly.

Projects can set `coverFit: "contain"` for logos, plus `coverAlt` and `coverCaption`. Screenshots use the normal crop. Flinkoo and Search Slash use their supplied logos; the library uses its screenshot. The keyboard photograph is configured in `interests.json`.

Replace `public/resume.pdf` to update the resume. The link appears when the local file responds as a PDF, or when a valid external resume URL is configured.

## Add a native blog post

1. Create a Markdown file in `src/content/blogs/`, for example `my-post.md`.
2. Add its metadata to `src/data/posts.json`:

```json
{
  "id": "my-post",
  "slug": "my-post",
  "type": "blog",
  "title": "My post",
  "excerpt": "A short introduction to the post.",
  "cover": "/images/my-post.webp",
  "author": "Shrutik",
  "createdAt": null,
  "publishedAt": null,
  "updatedAt": null,
  "tags": [],
  "markdownFile": "my-post.md",
  "featured": false,
  "sample": false,
  "draft": true
}
```

Add the referenced cover file. Use real dates when known. Set `draft: false` when ready to publish. Records with `sample: true`, `draft: true`, or `status: "draft"` are hidden from Home, Blog, direct article routes, and Surprise me. A null `publishedAt` alone does not hide a post.

Markdown is loaded through Vite's file glob. Raw HTML is disabled. Code blocks, safe links, and images are supported. Local optimized covers are preferred; bounded base64 PNG/JPEG/WebP/GIF covers are also accepted.

X articles remain on X. Edit the simple articles link in `src/pages/Writing.jsx` if the profile URL changes; there are no X article cards or filters.

## YouTube

Set `profile.json` -> `youtube.playlistId` to a public or unlisted playlist ID. The configured player loads automatically on Home without autoplay. An external YouTube link remains available. Private Watch Later lists are not supported; the current playlist is a separately shared playlist titled Watch Later.

## Contact delivery

Without a hosted provider, the form validates input and opens a `mailto:` draft. The visitor sends it from their email application; the website does not claim delivery.

For a provider, copy `.env.example` to `.env.local` and set `VITE_FORM_ENDPOINT` to an HTTPS endpoint accepting JSON `{name,email,subject,message}`, with CORS enabled for the site. Alternatively set `site.json` -> `formEndpoint`. Configure spam protection with the provider. A successful response indicates that the provider accepted the submission.

Vite environment values are public client configuration. Never put secrets in them.

## Deploy

Deploy only `dist/` to a static host. Configure an SPA fallback to `index.html` for direct project/article links. `public/_redirects` provides a fallback rule for compatible hosts; other hosts need their equivalent configuration.

Before launch, configure production sharing metadata in `index.html` and add canonical tags/sitemap if needed. Metadata currently updates in the browser, so some social crawlers will only see the HTML defaults. Server rendering is outside this frontend-only project.

Local design reviews, screenshots, test reports, environment files, dependencies, and generated output are excluded by `.gitignore`. Keep `package-lock.json`, `.env.example`, source files, and public assets in version control.
