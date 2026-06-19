# AiPedia Project Map

## Fast Orientation

AiPedia is an Astro site. Editorial source lives under `src/content/`; route templates, layouts, components, styles, data, and public assets live under `src/` and `public/`.

Use the smallest verification command that matches the changed surface. Start with `npm run check:smart` to get a scoped recommendation.

## Primary Surfaces

- `src/content/tools/`: tool pages and monetizable buying decisions.
- `src/content/categories/`: category hubs.
- `src/content/comparisons/`: comparison pages.
- `src/content/use-cases/`: guide pages.
- `src/content/news/`: news articles.
- `src/pages/`: Astro routes, API endpoints, index pages, crawl surfaces, and top-layer hubs.
- `src/layouts/`: shared page templates.
- `src/components/`: reusable UI and SEO components.
- `src/data/`: registries, manifests, source data, and generated metadata.
- `public/logos/tools/`: canonical tool logo assets.
- `public/og/`: generated Open Graph images.
- `scripts/`: audits, guards, generators, build helpers, and operator tooling.
- `src/lib/content-models/` and `src/lib/search-catalog.ts`: generated model/search seams audited by `npm run audit:generated-models`.
- `tests/`: Node script tests and Playwright smoke tests.

## Generated Or Local-Only Folders

Ignore these during code search unless the task is explicitly about generated output or local runtime state:

- `node_modules/`
- `dist/`
- `dist-fast/`
- `.astro/`
- `.vercel/`
- `.codegraph/`
- `.qa-shots/`
- `test-results/`
- `.worktrees/`

If `.worktrees/` contains empty or unregistered directories after generated coverage work has merged, remove them. Active Git worktrees must appear in `git worktree list`.

## Verification Router

- Run `npm run check:smart` to see the recommended checks for the current diff.
- Run `npm run check:smart:run` to execute that recommendation.
- Run `npm run check:quick` when tooling or repo-maintenance work needs the established no-build gate.
- Run `npm run audit:generated-models` with `npm run test:scripts` when generated model/search seams or their audit script change.
- Run `npm run build:fast` when layouts, runtime routes, metadata, schemas, or rendered output changed.
- Run `npm run build` only for full production confidence or deploy prep.

## Content Change Reminder

For any page/content/fact/pricing/source update, apply the hard date, ledger, top-layer, source, mobile, SEO, and affiliate rules from `AGENTS.md`. `PAGE_REFRESH_LEDGER.md` must move with page edits.
