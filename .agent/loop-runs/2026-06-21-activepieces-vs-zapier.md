# 2026-06-21: activepieces-vs-zapier

## Summary

- Status: complete
- Route: /compare/activepieces-vs-zapier/
- Branch: master
- Commit: b2fd03c5

## Changed Files

- src/content/comparisons/activepieces-vs-zapier.md
- src/data/comparison-policy.json
- src/data/coverage-backlog.json
- src/layouts/ToolLayout.astro
- scripts/guard-content.mjs
- tests/scripts/audit-coverage-gaps.test.mjs
- tests/scripts/decision-loop.test.mjs
- .agent/guard-challenges/2026-06-21-post-cleanup-comparison-inventory-fixtures-challenge.md

## Verification

- npm run loop:verify -- --date 2026-06-21 --slug activepieces-vs-zapier --route /compare/activepieces-vs-zapier/ --paths <changed paths> --json
- node --test tests/scripts/audit-coverage-gaps.test.mjs tests/scripts/decision-loop.test.mjs
- npm run coverage:next -- --json --count 20
- npm run guard:challenge:check
- npm run build:fast plus npm run qa:route -- --route /tools/pika/ --widths 360 --site-dir dist-fast/client

## Failures Or Fixes

- Post-cleanup guard and test fixtures still expected the old comparison inventory and deleted routes. Updated them through an accepted guard challenge.
- Changed comparison pages had mobile-hostile raw Markdown tables. Converted the changed live comparison tables to stacked decision bullets.
- Changed tool pages had historical price_history rows missing verified_at. Backfilled them with each page's existing last_verified date.
- Pika tool route had 360 px horizontal overflow from long inline tool links. Added wrapping constraints in ToolLayout.

## Residual Risks

- Five preexisting live comparison pages remain under the thin-content word threshold and should be refreshed in a future content-quality pass.
- The historical price_history verified_at backfill records existing page verification dates. It is not a fresh recheck of those older facts.
- Full verifier passed but remains slow, about 8 minutes for this mixed content, guard, build, and route-QA cycle.

## Notes

- Selector now uses explicit workflow lanes for the broad design, writing, notes, and search categories, in addition to the earlier automation, image, coding, music, chatbots, video, and voice lanes.
- Top 20 coverage candidates now resolve through explicit workflow-family policy instead of bare same-primary-category fallback.

## Next

- Next selected cluster is amazon-q-vs-github-copilot. Verify June 2026 Amazon Q Developer and GitHub Copilot facts before editing.
