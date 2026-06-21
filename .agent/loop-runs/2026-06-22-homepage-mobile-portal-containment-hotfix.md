# 2026-06-22: homepage-mobile-portal-containment-hotfix

## Summary

- Status: complete in the verified June 22 batch
- Route: `/`
- Branch: `master`
- Commit: this commit

## Trigger

The homepage `Comparisons` portal card overflowed its tile at the 319 px in-app browser width.

## Root Cause

The mobile homepage portal grid forced three columns under 460 px. At 319 px, the third tile was too narrow for `Comparisons` plus the arrow padding.

## Changed Files

- `src/pages/index.astro`
- `PAGE_REFRESH_LEDGER.md`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/WORK_LOG.md`

## Fix

- Switched homepage portal cards to two columns at widths up to 374 px.
- Added defensive `min-width`, `max-width`, and `overflow-wrap` rules to portal meta and title labels.

## Verification

- `npm run ledger:pages`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run ledger:pages:check`
- `git diff --check`

## Browser QA

Live browser DOM geometry inspection at `http://127.0.0.1:4321/` on the 319 px viewport confirmed:

- portal grid columns: `127.833px 127.833px`
- every portal title and meta label stayed within its card
- no horizontal overflow

## Residual Risks

- This hotfix is included in the verified June 22 batch.
- The broader June 21 to June 22 freshness goal remains active and dirty.

## Next

- Keep this with the June 22 hotfix batch when committing.
- Finish the paused Claude and Claude Code freshness batch before starting another content batch.
