# limchayseng.com

Personal blog of Ethan Limchayseng — endurance sports, software, and product notes.
Built with [Astro](https://astro.build/), hosted on [Cloudflare Pages](https://pages.cloudflare.com/),
deployed automatically from this repo's `main` branch.

Live site: <https://www.limchayseng.com>

## Project structure

```
├── public/
│   ├── _redirects           # legacy Hexo /:year/:month/:day/:title/ → /blog/:slug/ (301)
│   └── favicon.*
├── src/
│   ├── assets/              # site-wide images and fonts
│   ├── components/          # Header, Footer, BaseHead, etc.
│   ├── content/blog/        # post markdown + co-located images
│   ├── content.config.ts    # zod schema for post frontmatter
│   ├── layouts/             # BlogPost.astro
│   ├── pages/               # routes: /, /blog, /blog/[...slug], /about, /rss.xml
│   ├── styles/global.css
│   └── consts.ts            # SITE_TITLE, SITE_DESCRIPTION
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Posts live in `src/content/blog/`. Add a new one by dropping in `my-post.md` with this frontmatter:

```yaml
---
title: My Post
pubDate: 2026-05-21
tags: [running, training]
---
```

Optional fields: `description`, `updatedDate`, `heroImage`, `categories`, `draft`. Images
referenced by a post should sit next to its markdown and be linked with `![alt](./image.png)`.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Local dev server at `localhost:4321`         |
| `npm run build`   | Build static site to `./dist/`               |
| `npm run preview` | Preview the production build locally         |

## Deployment

Cloudflare Pages is wired to the GitHub repo with Git integration. Pushing to `main`
triggers a build (`npm run build`) and publishes `dist/` to <https://www.limchayseng.com>.
PRs get preview deployments on a generated `*.pages.dev` URL.

## History

Originally a Hexo blog hosted on Heroku (2022–2025). Migrated to Astro on
Cloudflare Pages in May 2026; see commit `migrate hexo blog to astro on cloudflare pages`
for the full refactor. The `_redirects` file preserves every old Hexo permalink.
