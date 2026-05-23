# Handoff: limchayseng.com blog redesign

## Overview
A dark, minimal redesign of `limchayseng.com` — a personal blog of long‑form posts on endurance sport and software. Replaces the existing terminal/skull dark theme with a more refined "ink stone" aesthetic: warm off‑white type on warm black, with restrained chrome (cool silver) measurement marks as the structural accent and a single hanko‑red (`#D34637`) used like punctuation.

Two screens covered: **Home / writing index** and **Post detail**.

## About the design files
The HTML/React/CSS files in `preview/` are **design references** showing intended look and behavior — not production code to copy verbatim. The task is to recreate them in the existing **Astro** codebase (`src/pages/index.astro`, `src/layouts/BlogPost.astro`, `src/components/*.astro`) using Astro's component patterns, NOT to ship the React prototype.

To preview: open `preview/index.html` in a browser. It renders the home + post views stacked.

## Fidelity
**High‑fidelity.** Final colors, typography, spacing, and layout are locked in. The dev should recreate pixel‑perfectly. The only thing left intentionally open is the responsive (≤720px) treatment — see notes below.

---

## Design tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| `--paper` | `#0C0B0A` | Page background (warm black) |
| `--paper-deep` | `#131210` | Elevated panel / image backdrop |
| `--paper-edge` | `#221F1B` | Hairline borders |
| `--ink` | `#EFE9DD` | Primary text |
| `--ink-soft` | `#CDC6B6` | Secondary text, body prose |
| `--ink-mute` | `#8A8474` | Tertiary text, dates, mono meta |
| `--ink-faint` | `#5C5749` | De-emphasized text, separators |
| `--hanko` | `#D34637` | Single red accent (vermillion) |
| `--hanko-deep` | `#A8362A` | Reserved (currently unused) |
| `--chrome` | `#D8DCE0` | Chrome accent (silver) — hairlines, ticks, corner marks |
| `--chrome-dim` | `#8A9099` | Dimmer chrome, ruler ticks |
| `--chrome-edge` | `#4B5159` | Chrome panel borders (currently unused in final) |

The page background also gets a **very subtle warm vignette + film grain** (SVG noise data‑URI) blended over the base color — see `.paper` in `styles.css`. Keep this; it stops the background from feeling like a pure-black template.

### Type
- **Display / titles / years / post titles / nav: Geist** (Google Fonts) — weights 400, 500, 700
- **Body prose / italics / pull quotes / annotations: Newsreader** (Google Fonts) — weights 300, 400; italic 300, 400, 500
- **Mono / dates / meta labels / margin notes / Strava stats: Geist Mono** (Google Fonts) — weights 400, 500

Google Fonts import URL (already in preview HTML):
```
https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400;1,6..72,500&display=swap
```

#### Type scale (used)
| Use | Family | Size | Weight | Letter‑spacing | Line‑height |
|---|---|---|---|---|---|
| Page H1 (`Writing`) | Geist | 52px | 500 | −0.035em | 1.0 |
| Post H1 | Geist | 46px | 500 | −0.035em | 1.08 |
| Section H2 | Geist | 26px | 500 | −0.02em | 1.2 |
| Post title in list | Geist | 20px | 400 | −0.014em | 1.3 |
| Lede paragraph | Newsreader | 22px | 300 | normal | 1.55 |
| Body paragraph | Newsreader | 17px | 300 | normal | 1.7 |
| Italic accent / quote inline | Newsreader italic | inherit | 400 | normal | inherit |
| Pull quote | Newsreader italic | 30px | 400 | −0.005em | 1.25 |
| Annotation (✱ note) | Newsreader italic | 14px | 400 | normal | 1.4 |
| Running thoughts quote | Newsreader italic | 16px | 400 | normal | 1.5 |
| Year label `[ 2023 ]` | Geist Mono | 11px | 400 | 0.18em UPPER | — |
| Date column | Geist Mono | 11.5px | 400 | 0.02em (tabular-nums) | — |
| Tag (right column) | Geist Mono | 10.5px | 400 | 0.14em UPPER | — |
| Meta mono label (`Filed`, `Date`, etc.) | Geist Mono | 12px | 400 | 0.08em UPPER | — |
| Margin note (§01 etc.) | Geist Mono | 11.5px | 400 | 0.01em | 1.55 |
| Site name in header | Geist | 14px | 500 | −0.005em | — |
| Header nav links | Geist Mono | 11.5px | 400 | 0.04em | — |
| Footer text | Geist Mono | 11px | 400 | 0.04–0.06em | — |

### Spacing & layout
- **Page padding**: `56px 96px` on the home view; left padding bumped to `130px` on home to accommodate the vertical chrome spine (the spine sits at `left: 56px`).
- **Post page padding**: `56px 96px`.
- **Section gap (vertical)**: ~64px between hero and list, 80px above footer.
- **Two-column home grid**: `1fr 280px` with `gap: 80px` (main list + running-thoughts rail).
- **Post page grid**: `160px 700px 1fr` with `gap: 48px` (left meta gutter | body | right margin notes).
- **Post row padding**: `14px 0`.
- **Annotation indent**: `64px` under post row (lines up with title start after date column).

### Borders & rules
- Soft hairline between list rows: `1px solid rgba(239,233,221,0.06)`
- Section divider (hero → list): chrome gradient rule (`.chrome-rule` — see CSS)
- Title → body in post view: `.chrome-rule` with `margin: 36px 0`
- Pull-quote left bar: `2px solid var(--hanko)`
- Running-thoughts rail divider: `1px` chrome gradient + a `3px × 28px` hanko-red bar at the top

### Iconography
There are **no icons in the final design** except the skull logo. Use plain text labels with the `↗` glyph for external links. **Do not add Lucide / Heroicon / SVG icons.**

---

## Chrome accent system

Chrome is intentionally minimal and used only as **register/measurement marks**, never as panels or buttons. Five places only:

1. **Corner register marks** — 14×14 chrome L-brackets at all four page corners (24px inset). Class `.corner-mark.{tl|tr|bl|br}` in `styles.css`.
2. **Vertical chrome spine** (left margin) — a 1px gradient line running from ~90px from top to ~90px from bottom at `left: 56px`. Plus 4 horizontal tick marks (12px × 1px chrome) at vertical positions ~18%, 36%, 55%, 78%.
3. **Year markers** — `[ 2023 ]` in chrome-dim Geist Mono, all caps, 0.18em letter-spacing.
4. **Gradient hairlines** — `.chrome-rule` — single 1px line with a linear gradient `transparent → chrome → transparent` (12%/88% stops), opacity 0.45. Used above footer + between title and body.
5. **Running-thoughts rail divider** — 1px chrome gradient on the left edge of the rail, topped with a 3×28 hanko-red bar.

See `styles.css` `.chrome-rule`, `.chrome-tick`, `.chrome-square`, `.corner-mark` utility classes.

---

## Screens

### 1. Home — `/`

#### Layout
```
+-------------------------------------------------------------+
| ⌐ (corner mark TL)                       ⌐ (corner mark TR) |
|                                                             |
|  [skull] limchayseng.com         writing  about  rss        |  ← header row
|                                                             |
|  ───────────── vertical chrome spine on left ───            |
|  | (with 4 tick marks)                                      |
|  |                                                          |
|  |  Writing                    24 entries · 2022 – 2026     |  ← hero
|  |  Long‑form notes from inside the pain cave, plus the     |
|  |  side of me that ships software.                         |
|  |                                                          |
|  |  [ 2023 ]                                                |  ← year marker
|  |  04.19   Boston Marathon — Race Recap        MARATHON    |
|  |          ✱ ran it on a torn tendon. ...                  |
|  |  03.29   The Speed Project 2023            ULTRA·RELAY   |
|  |          ✱ 49 mi from LA to Vegas. ...                   |
|  |                                                          |
|  |  [ 2022 ]                                                |
|  |  11.18   Norcal Festive — The Plan             NOTES     |
|  |  ...                                                     |
|  |                                            | Running     |  ← right rail
|  |                                            | thoughts    |    (sticky-ish
|  |                                            | (4 italic   |    in design,
|  |                                            |  quotes)    |    no JS needed)
|  |                                                          |
|  ──── chrome gradient hairline ────                         |
|  github↗ · strava↗ · linkedin↗ · email↗   © EL · est. 2022  |  ← footer
|                                                             |
| ⌐ (corner mark BL)                       ⌐ (corner mark BR) |
+-------------------------------------------------------------+
```

#### Header
- Skull image, 24px square, with CSS filter `invert(1) hue-rotate(180deg) saturate(0.4) brightness(1.05) contrast(1.05)` so the brown PNG reads as bone on black.
- "limchayseng" in Geist 500 14px, ".com" appended in `--ink-mute` 400.
- Nav on the right: just `writing · about · rss`, lowercase, Geist Mono 11.5px, 22px gap. Active item is `--ink` color with a 1.5px chrome underline 4px below the baseline.

#### Hero
- H1 "Writing" — Geist 52px 500, color `--ink`.
- Inline right of H1: `24 entries · 2022 – 2026` in `.meta-mono` (Geist Mono 12px 0.08em uppercase).
- Subhead paragraph: Geist 18px 400, color `--ink-soft`. Max width 680px. Optional italic Newsreader phrase appended (e.g. "Mostly true.")

#### Post list
- **Flat chronological**, newest first. Year change inserts a `[ 2023 ]` Geist Mono label as a row break (24px top padding, 8px bottom).
- Each row:
  - Date column (`MM.DD`): Geist Mono 11.5px `--ink-mute`, width 50px, tabular‑nums.
  - Title: Geist 20px 400 `--ink`, `letter-spacing: -0.014em`, flex 1.
  - Tag (right): Geist Mono 10.5px `--ink-faint`, 0.14em uppercase.
  - Row padding `14px 0`, border-top `1px solid rgba(239,233,221,0.06)` (except first row after a year break).
- **Annotation row** (when `note` is present): indented 64px under the title, Newsreader italic 14px `--ink-mute`. Prefixed with `✱` in `--hanko` red.

Post data structure used in preview (in real Astro, this comes from `getCollection('blog')`):
```ts
{
  date: '04.19',      // MM.DD
  year: '2023',
  title: 'Boston Marathon — Race Recap',
  tag: 'Marathon',
  note: 'ran it on a torn tendon. somehow the best one.',
}
```

> **Note**: `tag` and `note` are new fields. The existing Astro `content.config.ts` schema only has `title`, `description`, `pubDate`, `updatedDate`, `heroImage`. Add `tag: z.string().optional()` and `note: z.string().optional()` to the blog content schema, then backfill the existing posts. Or derive `tag` from the first item in `tags` (which already exists in some frontmatter — see `boston-marathon-2023.md`).

#### Right rail — Running thoughts
- 280px column, divider on its left edge.
- H3 "Running thoughts" — Geist 15px 500.
- Subtitle "excerpts" — Geist Mono 10.5px `--ink-faint` 0.06em uppercase.
- 4 quote blocks, each:
  - Newsreader italic 16px `--ink-soft`, in straight quotes
  - Attribution below: `— Boston, 2023` in `.meta-mono` 10.5px `--ink-faint`
- 22px gap between quotes.

Quotes are pulled from blog posts (any `> blockquote` lines from running-thoughts-* and recap posts). Suggested implementation: a separate collection or a manually-curated `src/data/running-thoughts.json`.

#### Footer
- Above: `<hr className="chrome-rule">`.
- Left: socials inline — `github ↗ · strava ↗ · linkedin ↗ · email ↗`. Geist Mono 11px `--ink-soft`. Separator `·` in `--ink-faint`.
- Right: `© EL · est. 2022 · chicago & sf` in `--ink-faint`.

---

### 2. Post detail — `/blog/[slug]`

#### Layout
```
+-------------------------------------------------------------+
| ⌐ TL                                                  TR ⌐  |
|                                                             |
|  [skull] limchayseng.com         writing  about  rss        |
|                                                             |
|  +--- LEFT GUTTER ---+--- BODY (700px) ----+--- RIGHT ---+ |
|  | [skull big]       | Boston Marathon —   | §01 hanko   | |
|  |                   | the year I gave up  |   Got the   | |
|  | FILED             | on time and *won*   |   BQ at...  | |
|  | Marathon          | *everything else.*  |             | |
|  | Boston            |                     | §02         | |
|  | Heartbreak        | ── chrome-rule ──   |   Diagnosed | |
|  |                   |                     |   mid-...   | |
|  | DATE              | Both qualifying for |             | |
|  | 2023.04.19        | and running Boston…  | §03         | |
|  |                   |                     |   Forgot my | |
|  | READ              | (body paragraphs)   |   watch...  | |
|  | ~9 min            |                     |             | |
|  |                   | [hero image]        | ── chrome   | |
|  | RESULT            | Mile 24 · @kgunaa   |    rule ──  | |
|  | ● 3:24:11         |                     |             | |
|  |                   | | I smiled with     | STRAVA      | |
|  | ── chrome rule    | | every single step.| 26.2 mi     | |
|  +-------------------+ |                     | 3:24:11     | |
|                      | (Figuring it out)   | 7:48/mi     | |
|                      | …                   | ...         | |
|                      +---------------------+-------------+ |
|                                                             |
|  ── chrome rule ──                                          |
|  Footer (same as home)                                      |
+-------------------------------------------------------------+
```

#### Components
- **Left gutter (160px)**:
  - Skull image 32px
  - 4 meta blocks: `Filed` (tags), `Date`, `Read`, `Result` — each block is mono label uppercase + value below in mono ink. `Result` value is in hanko red prefixed with `●`.
  - Below: 60px-wide `.chrome-rule` (truncated short rule, an editorial flourish).
- **Body (700px)**:
  - H1 — Geist 46px 500. Final phrase italic Newsreader 400 `--ink-mute` (e.g. "won everything else.")
  - `.chrome-rule` 36px above and below.
  - Lede: Newsreader 22px 300 `--ink`.
  - Body paragraphs: Newsreader 17px 300 `--ink-soft`, 1.7 line-height.
  - Inline image: `width: 100%; height: 380px; object-fit: cover` over `--paper-deep` background. Photo filter: `saturate(0.78) contrast(1.05) brightness(0.92)` to sit on the dark ground (see `.paper-img`).
  - Caption: `.meta-mono` 10px below image.
  - **Pull quote**: Newsreader italic 30px 400, 24px left padding, 2px solid `--hanko` left border.
  - Section H2: Geist 26px 500.
- **Right gutter**:
  - 3 numbered margin notes: `§01`, `§02`, `§03` — the `§NN` label is in `--hanko`, the body text is Geist Mono 11.5px `--ink-mute`.
  - Below `.chrome-rule`: Strava stats block with mono `--ink` numbers (tabular nums).

---

## Astro implementation notes

### Files to update in the existing repo (`src/`)

| File | What to do |
|---|---|
| `src/styles/global.css` | Replace with the dark token system from `preview/styles.css`. Keep the existing reset rules. |
| `src/components/BaseHead.astro` | Add the Google Fonts `<link>` for Geist + Geist Mono + Newsreader. Drop the old font import. |
| `src/components/Header.astro` | Rewrite as the slim header (skull img 24px + name + 3-item nav). Drop the old big skull / big logo treatment. |
| `src/components/Footer.astro` | Rewrite with the chrome-rule + inline socials + © line. |
| `src/components/FormattedDate.astro` | Output format `YYYY.MM.DD` for full dates (post page) and `MM.DD` for list view. Pass a `format` prop. |
| `src/pages/index.astro` | Rewrite as the Writing index. Use the layout described above. Loop `getCollection('blog')` sorted desc, insert year-break rows when year changes. |
| `src/layouts/BlogPost.astro` | Rewrite as the 3-column post detail layout. Hero image goes in the body, not full-bleed. Add the left-gutter meta block and right-gutter margin notes. |
| `src/content.config.ts` | Extend blog schema: add `tag: z.string().optional()`, `note: z.string().optional()`, `marginNotes: z.array(z.object({ id: z.string(), text: z.string() })).optional()`, `resultLabel: z.string().optional()` (e.g. `"3:24:11"`). |
| `src/content/blog/*.md` | Backfill new frontmatter fields where applicable (recap posts get `tag` and `note`). |
| `src/pages/about.astro` | Light update to match the new typographic system; keep content. |
| `src/assets/skull.svg` (new) or `public/skull.png` | Replace the favicon skull with the user's logo PNG (`assets/skull.png` in this bundle). Ideally convert to SVG for sharp rendering. Apply the CSS filter at use-sites for the dark-mode invert. |

### Running thoughts collection
Create either:
- A new content collection `src/content/thoughts/*.md` with frontmatter `{ source, sourceUrl }` and body = the quote, **or**
- A static `src/data/running-thoughts.json` array `[{ q, src, sourceUrl }]`.

The home page imports it, picks 4 (most recent, or featured), renders in the right rail.

### Margin notes on posts
Two options:
1. **Frontmatter** (`marginNotes: [{ id: "01", text: "…" }]`) — simplest.
2. **Inline MDX/markdown directive** — only worth it if you want the notes co-located with the body text. Custom remark plugin needed. Skip unless you really want this.

### Responsive (≤720px)
Not designed in the prototype. Recommended behavior:
- Collapse the 3-column post layout → single column. Move left-gutter meta into a horizontal strip above the title. Move right-gutter margin notes to inline `<aside>` blocks within the body or to a section at the end.
- Collapse home 2-column → single column. Running thoughts moves below the post list.
- Reduce padding to `40px 24px`.
- H1 Writing → 36px.
- Vertical chrome spine: hide (`display: none` ≤720px) — it's a desktop flourish.
- Corner marks: shrink to 10×10 and inset to 16px, or hide entirely.

### Wrangler / Cloudflare Workers
The blog is deployed via Cloudflare Workers (per `wrangler.toml` / `.wrangler/`). Nothing in this redesign changes the deploy target — it's purely a content/styling refactor.

---

## Interactions & behavior

- **All hover states**: links transition `color` from `--ink-soft` to `--ink` over 200ms ease.
- **Active nav link**: gets a 1.5px chrome underline 4px below baseline (`.nav-link.active::after`).
- **Post row hover** (recommended, not in prototype): subtly lift `--ink-soft` to `--ink` for the title, and brighten the chrome tick (no tick on the Alt variant — skip).
- **No JS state needed for the design itself.** All layout is static. Anything dynamic (search, filter chips, etc.) is out of scope for this handoff.

---

## Assets

- `preview/assets/skull.png` — the user's existing skull logo. Used at 24px in the header and 32px in the post-detail left gutter. Apply CSS filter for dark-mode bone color.
- `preview/assets/rain-smile.png` — used in the post-detail preview as the body image. In production, this is just stand-in content; real posts ship their own `heroImage` per the existing content schema.

The skull should ideally be converted to SVG so it can be tinted with `currentColor` and scale crisply. Until then, the CSS filter approach works fine.

---

## Files in this handoff

```
design_handoff_blog_redesign/
├── README.md                          ← you are here
└── preview/
    ├── index.html                     ← standalone preview (home + post stacked)
    ├── styles.css                     ← full token + utility CSS (copy into src/styles/global.css)
    ├── variants-v2.jsx                ← React reference for the two views (VariantAlt + PostPageV2)
    └── assets/
        ├── skull.png
        └── rain-smile.png
```

To preview locally: open `preview/index.html` in any modern browser — it loads React + Babel + the fonts from CDN. No build needed.

The `VariantAlt` and `PostPageV2` React components in `variants-v2.jsx` are the spec. The other components in that file (`VariantMain`, etc.) are earlier explorations — **ignore them**. Only `VariantAlt` (renamed to "Alt — vertical chrome spine") and `PostPageV2` are the locked design.
