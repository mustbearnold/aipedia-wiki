# aipedia-wiki — Architecture Guide for Claude

## CRITICAL: Source of Truth

**NEVER edit files inside `aipedia-wiki/src/content/`.**

`src/content/` is a **generated directory**. Every time `npm run dev` or `npm run build` runs, the script `scripts/copy-content.sh` **deletes everything in `src/content/` and replaces it** by copying from the real source.

**The real source is:**
```
wikis/ai-tools/pages/
```

All edits — new tool pages, category updates, glossary fixes, use-case guides — go there.

## Directory Map

```
MOAW - Mother of All Wiki's/
├── aipedia-wiki/               ← Astro site (the rendered website)
│   ├── CLAUDE.md               ← You are here
│   ├── scripts/
│   │   └── copy-content.sh     ← Copies wikis/ai-tools/pages/ → src/content/ on every dev/build
│   ├── src/
│   │   ├── content/            ← ⚠️ GENERATED. Do not edit. Gets deleted on every run.
│   │   ├── pages/              ← Astro page routes (index.astro, etc.) — safe to edit
│   │   ├── components/         ← Astro/React components — safe to edit
│   │   └── layouts/            ← Layout templates — safe to edit
│   └── package.json
│
└── wikis/
    └── ai-tools/
        └── pages/              ← ✅ SOURCE OF TRUTH. Edit everything here.
            ├── tools/          ← One .md file per tool
            ├── categories/     ← One .md file per category
            ├── comparisons/    ← Comparison pages
            ├── trends/         ← Trend analysis pages
            ├── companies/      ← Company profile pages
            ├── use-cases/      ← Best-of guides and use case pages
            ├── dead/           ← Dead/discontinued tools
            └── glossary/       ← Glossary index
```

## Workflow

### Adding or editing content
1. Edit files in `wikis/ai-tools/pages/`
2. Run `bash scripts/copy-content.sh` from the `aipedia-wiki/` directory to sync to `src/content/`
3. The running dev server picks up changes automatically (no restart needed)
4. After edits that change rankings, pricing, or tool status: `npm run wiki:refresh` regenerates the truth-maintenance layer at `wikis/_meta/`. Full system docs: `wikis/_meta/README.md`. Live dashboard: `/admin/wiki-health/`.

### Starting the dev server
```bash
cd aipedia-wiki
npm run dev
# Opens at http://localhost:4321
```
The dev script runs copy-content.sh automatically on startup.

### Site config and UI
Edit these files directly in `aipedia-wiki/src/` — they are NOT copied from wikis/:
- `src/pages/index.astro` — homepage (category emoji/label maps live here)
- `src/components/` — UI components
- `src/layouts/` — page layouts

## Content Schema

### Tool frontmatter (required fields)
```yaml
type: tool
slug: [slug]           # matches filename without .md
title: [Title]
tagline: [one sentence]
category: [ai-coding|ai-writing|ai-video|ai-voice|ai-image|ai-notes|ai-search|ai-seo|ai-automation|ai-design|ai-music]
company: [company name]
url: https://...
pricing_model: freemium|subscription|free|enterprise
price_range: "$X-$Y/month"
status: active|dead
launched: YYYY-MM
last_updated: YYYY-MM-DD
last_verified: YYYY-MM-DD
update_frequency: monthly|quarterly
affiliate:
  has_program: true|false    # internal tracking only — never surface to readers
  commission: "X%"|null
  cookie_days: N|null
  network: "name"|null
  link: null
scores:
  utility: N    # 1-10
  value: N
  moat: N
  longevity: N
tags: [tag1, tag2]
seo_title: "..."
meta_description: "..."
author: "aipedia.wiki Editorial"
```

### Adding a new category
1. Create `wikis/ai-tools/pages/categories/[slug].md`
2. Add the slug to `categoryEmojiMap` and `categoryLabelMap` in `aipedia-wiki/src/pages/index.astro`

## Editorial Rules

- **No affiliate promotional language in page body.** The `affiliate` frontmatter block is for internal use only. Never write sentences like "X has a great 20% commission" in page content.
- **Scores must be honest.** Low moat or longevity scores should be stated plainly.
- **Every claim needs a source.** Inline links to official pricing pages where possible.
- **Prices verified date** must appear below every pricing table.
