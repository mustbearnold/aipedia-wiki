# aipedia-wiki — Architecture Guide for Claude

## Source of Truth

**Edit content directly in `src/content/`.** That's the single source of truth. It's git-tracked, deployed from GitHub, and what Astro reads at build time.

The old dual-tree setup (`wikis/ai-tools/pages/` → `src/content/` via `copy-content.sh`) was retired 2026-04-17 after it caused a silent content-wipe bug on news/benchmarks. The legacy tree is archived at `../wikis/ai-tools.legacy-backup-2026-04-17/` for one-way reference only — do not edit.

## Directory Map

```
aipedia-wiki/                     ← Astro site (this is a standalone git repo)
├── CLAUDE.md                     ← You are here
├── scripts/
│   ├── copy-content.sh           ← Pre-build asset gen (OG svgs, logo manifest). No longer copies content.
│   ├── generate-og-svgs.mjs
│   └── generate-logo-manifest.mjs
├── src/
│   ├── content/                  ← ✅ SOURCE OF TRUTH. Edit directly.
│   │   ├── tools/                ← One .md file per tool
│   │   ├── categories/           ← One .md file per category
│   │   ├── comparisons/          ← Head-to-head comparison pages
│   │   ├── trends/               ← Trend analysis pages
│   │   ├── companies/            ← Company profile pages
│   │   ├── use-cases/            ← Best-of guides + stacks
│   │   ├── dead/                 ← Discontinued tools
│   │   ├── glossary/             ← Glossary index
│   │   ├── news/                 ← Daily AI news items
│   │   ├── benchmarks/           ← Head-to-head benchmark reports
│   │   ├── workflows/            ← Production workflow pages
│   │   └── reports/              ← Monthly digest reports
│   ├── pages/                    ← Astro page routes
│   ├── components/               ← Astro/React components
│   └── layouts/                  ← Layout templates
└── package.json
```

## Workflow

### Adding or editing content
1. Edit the relevant `.md` file in `src/content/<type>/`
2. Dev server picks up changes automatically (no copy step needed)
3. Commit in this repo (`cd aipedia-wiki && git commit`) and push to GitHub → Cloudflare Pages auto-deploys

### Starting the dev server
```bash
cd aipedia-wiki
npm run dev
# Opens at http://localhost:4321
```

### Site config and UI
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
1. Create `src/content/categories/[slug].md`
2. Add the slug to `categoryEmojiMap` and `categoryLabelMap` in `src/pages/index.astro`

## Editorial Rules

- **No individual-author bylines.** Author field must always be `"aipedia.wiki Editorial"` (Organization). No fabricated Person personas — Google E-E-A-T risk and directly contradicts the `/about/editorial/` trust artifact.
- **No affiliate promotional language in page body.** The `affiliate` frontmatter block is for internal use only. Never write sentences like "X has a great 20% commission" in page content.
- **Scores must be honest.** Low moat or longevity scores should be stated plainly.
- **Every claim needs a source.** Inline links to official pricing pages where possible.
- **"Prices verified" date** must appear below every pricing table.

- **Present-tense facts only.** Surface what's relevant to a TODAY reader. Historical detail (retirements, product launches, price changes) stays out unless a current user would still be searching for or expecting the retired thing.
  - Recency test against today's date:
    - Within ~6 months → keep
    - 6-12 months → keep only if it explains a current gap ("no video gen — Sora shut down last year")
    - 12+ months → drop from main page
  - `price_history` frontmatter: keep only the latest 2-3 entries
  - Review History section: max 4 recent entries
  - Key Facts "recent shutdowns" row: only list items retired within 12 months
  - Body prose: no "back in 2023" / "in early 2024" unless directly relevant to a today choice

- **NO em-dashes or en-dashes in content.** Both `—` and `–` are statistical markers of unedited AI output post-2024 and Google's Helpful Content system trains against them. Pre-commit hook (`scripts/block-ai-tells.mjs`) blocks new commits that introduce them. Replace: `—` → `. ` (sentence break) or `:` (definition) or `,` (comma pause). `–` → `-` (ASCII hyphen). Applies to everything in `src/content/*.md`.

- **Agent-voice template** (use for all editorial analysis blocks):
  - `## System Verdict` — top-of-page callout in blockquote form. Declarative, names alternatives. "Pick X if Y. Skip if Z." No "I tested", no first-person, no hedging.
  - `## Key Facts` — 2-col table (label / value). Machine-readable, no prose.
  - `## When to pick X` / `## When to pick something else` — concrete scenarios as bullets.
  - `## Failure modes` — what goes wrong in real use. Specific, cite when possible.
  - `## Methodology` footer — short disclosure: automated pipeline, verified date, scoring rubric.
