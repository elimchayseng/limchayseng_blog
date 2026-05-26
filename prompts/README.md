# prompts/

Reusable Claude prompt templates for drafting new blog posts in Ethan's voice.

## What's here

- **`race-recap.md`** — for race recaps and endurance essays (marathons, ultras, triathlons, track miles). Includes the Boston Marathon 2023 post as a few-shot exemplar.
- **`project-post.md`** — for technical writeups of GitHub projects (CLIs, services, libraries, side projects). Includes the NGINX Deep Dive post as a few-shot exemplar.

Each template is self-contained: a voice guide, a structure blueprint, a frontmatter spec matching `src/content.config.ts`, an inlined exemplar post, and a brief form to fill in.

## How to use

1. Open the template you want (e.g. `race-recap.md`).
2. Scroll to the `## YOUR BRIEF` block at the bottom. Fill in the fields with notes about the race or project. The "Key moments" / "People" (race) and "What it does" / "Why I built it" (project) sections are load-bearing — don't skip them.
3. Open a fresh Claude conversation. Paste the entire template — voice guide, exemplar, and your filled-in brief — into the first message.
4. Claude returns a complete markdown file with YAML frontmatter.
5. Save the output to `src/content/blog/<slug>.md`. Drop any inline images alongside it in the same directory and reference them as `![alt](./filename.png)`.
6. Preview locally with `npm run dev` and visit `http://localhost:4321/blog/<slug>/`. Edit the draft until it sounds like you, not like Claude's impression of you.

## When to update

The exemplars and voice fingerprints will drift as the writing evolves. Re-evaluate every 3–5 new posts:

- Is the inlined exemplar still the most representative version of the voice? If a newer recap is better, swap it.
- Are any of the "Things NOT to do" rules no longer firing on Claude's drafts? Tighten or drop them.
- Are there new vocabulary signatures (people, race nicknames, in-group terms) worth adding to the "vocabulary he uses" section?

Templates are living docs. Keep them honest.
