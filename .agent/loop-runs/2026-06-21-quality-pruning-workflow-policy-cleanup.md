# Quality Pruning Workflow Policy Cleanup

Date: 2026-06-21

Status: complete

Loop: `quality-pruning`

## Summary

The Quality Pruning loop reported comparison-quality debt. The cleanup found that part of the debt was structural: 19 live comparison pages compared tools without a shared approved workflow lane. Those pages were deleted and public links were removed. The comparison quality audit now enforces `src/data/comparison-policy.json` workflow lanes so this class of false-vs page cannot quietly return.

The live comparison inventory is now 46 policy-aligned pages. The content inventory floor is 41, matching the current count minus the existing five-page safety margin, and this re-anchor was recorded through Guard Challenge review.

## Main Changes

- Deleted no-shared-workflow comparison pages.
- Removed public links to deleted routes from affected tool pages, category pages, and curated comparison surfaces.
- Regenerated `PAGE_REFRESH_LEDGER.md`.
- Regenerated `src/data/coverage-backlog.json`.
- Strengthened `scripts/audit-coverage-quality.mjs` with workflow-lane enforcement.
- Updated `scripts/audit-coverage-gaps.mjs` so review-only false-vs pairs use `review_id` instead of publishable route-style slugs.
- Added focused tests in `tests/scripts/audit-coverage-quality.test.mjs`.
- Updated stale comparison-count fixtures in `scripts/guard-content.mjs`, `tests/scripts/audit-site-kpis.test.mjs`, and `tests/scripts/guard-stale-facts.test.mjs`.
- Added link wrapping in `src/layouts/ComparisonLayout.astro` after route QA found long source links could overflow at 360 px.

## Verification

- `npm run loop:quality -- --json`
- `npm run coverage:backlog`
- deleted-route `rg` sweep over `src` and `PAGE_REFRESH_LEDGER.md`
- `npm run loop:all -- --json`
- `node scripts/audit-coverage-quality.mjs --all --json`
- `node scripts/guard-content.mjs --baseline --dry-run --json`
- `node scripts/guard-content.mjs --json`
- `node scripts/audit-site-kpis.mjs --json`
- `node scripts/guard-stale-facts.mjs --json`
- `node --test tests/scripts/audit-coverage-quality.test.mjs`
- `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/guard-content.test.mjs tests/scripts/guard-stale-facts.test.mjs tests/scripts/check-smart.test.mjs`
- `npm run guard:challenge:check`
- `npm run ledger:pages:check`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- `npm run build:fast`
- `npm run qa:route -- --route /compare/decktopus-vs-gamma/ --route /compare/decktopus-vs-pitch/`
- `npm run check:smart:run`

## Result

`npm run loop:all -- --json` is 7 ok / 0 attention.

## Next

Resume the Decision Content Flywheel with `amazon-q-vs-github-copilot`, or run the Freshness loop queue if fact recency becomes the higher priority.
