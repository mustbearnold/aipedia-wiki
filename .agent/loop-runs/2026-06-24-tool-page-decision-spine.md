# 2026-06-24 Tool Page Decision Spine

Status: complete locally, verified, not yet pushed.

## Scope

- Migrated the shared tool detail layout so every tool page uses the new buyer-first decision spine.
- Moved proof, score math, source detail, GitHub stats, trust panel, and long review notes behind native collapsed details drawers.
- Added plan guidance, fit, recent changes, alternatives, and related comparisons as the default visible path.
- Hid reader reviews until approved reviews exist.
- Cleaned adjacent visual debt found by smoke checks: `/search/` mobile quick-chip overflow and top-layer card decoration.
- Regenerated `PAGE_REFRESH_LEDGER.md`.

## Primary Files

- `src/layouts/ToolLayout.astro`
- `src/components/ReviewsBlock.astro`
- `src/pages/search.astro`
- `src/styles/top-layer-index-polish.css`
- `tests/smoke/visual-routes.spec.mjs`
- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`

## Verification

- `npm run ledger:pages`
- `npm run typecheck`
- `npm run test:scripts`
- `npm run build:fast`
- `npm run smoke:visual`
- `npm run qa:route -- --route /tools/chatgpt/ --route /tools/claude/ --route /tools/cursor/ --route /tools/midjourney/ --route /tools/notion-ai/ --route /tools/watsonx-orchestrate/ --route /tools/ --route /compare/ --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `node scripts\guard-em-dashes.mjs`
- `git diff --check`

## Notes

- `qa:route` intentionally excludes `/search/` because that route is `noindex`; broad visual smoke covers its mobile overflow.
- In-app browser opened `http://127.0.0.1:4325/tools/chatgpt/` from `dist-fast/client`. Narrow and desktop DOM checks showed no horizontal overflow, closed proof/review drawers, and the expected decision-spine order.
- The temporary viewport override was reset before finishing.
