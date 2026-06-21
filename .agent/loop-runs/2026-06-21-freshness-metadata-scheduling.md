# 2026-06-21: freshness-metadata-scheduling

## Summary

- Status: complete
- Route: `/tools/adobe-firefly/`, `/tools/beehiiv/`, `/tools/browserbase/`, `/tools/capacities/`, `/tools/castmagic/`, `/tools/cloudtalk/`, `/tools/minimax/`, `/tools/presentations-ai/`, `/tools/replit-agent/`
- Branch: master
- Commit: this commit

## Changed Files

- PAGE_REFRESH_LEDGER.md
- src/content/tools/adobe-firefly.md
- src/content/tools/beehiiv.md
- src/content/tools/browserbase.md
- src/content/tools/capacities.md
- src/content/tools/castmagic.md
- src/content/tools/cloudtalk.md
- src/content/tools/minimax.md
- src/content/tools/presentations-ai.md
- src/content/tools/replit-agent.md

## Verification

- npm run loop:freshness -- --json
- npm run loop:all -- --json
- npm run ledger:pages:check -- --date 2026-06-21
- node scripts/audit-provenance-pricing.mjs --json --changed-file <nine changed tool pages>
- node scripts/guard-em-dashes.mjs
- git diff --check
- npm run check:smart:run -- --path <nine changed tool pages> --path PAGE_REFRESH_LEDGER.md

## Result

- Freshness loop moved from attention to ok.
- `high_volatility_missing_next_review` dropped from 17 to 0.
- Broad loop review moved from 5 ok / 2 attention to 6 ok / 1 attention.
- Remaining attention loop: Quality Pruning, with 62 existing all-comparison quality failures.

## Notes

- This pass scheduled missing `next_review_at` metadata and backfilled missing price-history `verified_at` values on touched pages from each page's existing `last_verified`.
- This was not a fresh source re-verification pass. `last_verified` and fact text were intentionally left unchanged except where existing provenance metadata was incomplete.
- `check:smart:run` passed build and exact route QA for all nine changed tool routes at 360, 390, 430, 768, 1024, and 1366 px.

## Next

- Run the Quality Pruning loop and reduce the 62 comparison-quality failures, starting with raw Markdown table pages.
