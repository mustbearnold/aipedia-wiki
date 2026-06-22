# 2026-06-22 Homepage Decision Card Density And Spacing Hotfix

## Trigger

Matt reported that the homepage decision-path cards looked overcrowded on the 319 px mobile browser viewport at `/?brand-check=lantern&copy-check=compact2`, then noted that the homepage still felt a bit too cramped and needed more spacing.

## Scope

- Route: `/`
- Primary file: `src/pages/index.astro`
- Regression test: `tests/smoke/visual-routes.spec.mjs`
- Canonical ledger: `PAGE_REFRESH_LEDGER.md`
- Continuity docs: `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/WORK_LOG.md`

## Changes

- Kept the homepage evidence requirement intact: featured decision cards still must have registered source evidence, current freshness, at least high confidence, and one or more source rows.
- Compressed the homepage-only compact evidence rail so each card shows one source row plus tiny freshness and confidence signals instead of three bulky trust chips.
- Hid the redundant visual `Source` status chip on homepage decision cards while retaining the source label and evidence data.
- Added defensive mobile sizing for evidence text, metrics, and card rhythm at very narrow widths.
- Opened up homepage rhythm by increasing mobile canvas padding, hero-to-portal spacing, portal tile spacing, decision-section spacing, card gaps, and decision-card padding.
- Added a Playwright visual smoke regression for the 319 px homepage card geometry and row gap so the cards cannot quietly grow back into the overcrowded version.

## Verification

- `npm run ledger:pages`
- `node scripts\generate-page-refresh-ledger.mjs --check --json`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npx playwright test tests/smoke/visual-routes.spec.mjs --config=playwright.config.mjs --grep "homepage decision cards keep evidence compact and spaced"`
- `npm run smoke:visual`
- `npm run smoke:api`
- `npm run ledger:pages:check`
- `node scripts\guard-em-dashes.mjs`
- `node scripts\generate-og-svgs.mjs --check --limit 20 --json`
- `git diff --check`

## Browser And Server Notes

- Static verified output is being served at `http://127.0.0.1:4321/` from `dist-fast/client`.
- The in-app browser API did not expose the visible open tab to automation, so verification used route QA, focused Playwright smoke coverage, and the static local server.
- The user can reload the visible browser tab to see the compact card rail.

## Residual Risk

None known for the homepage decision-card density and spacing fix. Future homepage card copy must stay short enough for 319 px mobile, and the visual smoke test now guards compact evidence geometry plus minimum card row spacing.
