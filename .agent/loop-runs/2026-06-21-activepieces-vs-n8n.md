# 2026-06-21: activepieces-vs-n8n

## Summary

- Status: complete
- Route: /compare/activepieces-vs-n8n/
- Branch: master
- Commit: this commit

## Changed Files

- src/content/comparisons/activepieces-vs-n8n.md
- src/content/tools/activepieces.md
- src/content/tools/n8n.md
- src/content/tools/lindy.md
- src/content/use-cases/best-ai-automation-platform.md
- src/content/categories/ai-automation.md
- src/pages/compare/index.astro
- src/pages/tools/index.astro
- src/pages/categories/index.astro
- src/pages/llms.txt.ts
- src/pages/llms-full.txt.ts
- src/data/source-registry.json
- src/data/coverage-backlog.json
- src/legacy-pages/compare-index.legacy.astro
- tests/scripts/audit-site-kpis.test.mjs
- tests/scripts/check-smart.test.mjs
- tests/scripts/guard-stale-facts.test.mjs
- PAGE_REFRESH_LEDGER.md

## Verification

- node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/guard-stale-facts.test.mjs
- $env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run loop:verify -- --date 2026-06-21 --route /compare/activepieces-vs-n8n/ --path <changed paths>

## Failures Or Fixes

- Initial loop:verify failed because KPI/stale-fact guard tests and check-smart fixtures still assumed the deleted false-vs comparison inventory and deleted routes. Fixed by lowering the comparison floor to the new valid direct-substitute inventory and replacing deleted comparison fixtures with live AI Automation routes.

## Residual Risks

- The loop still spends most wall time in build:fast, smoke:visual, and combined route QA when runtime page or script-test paths are touched.

## Notes

- Verified Activepieces and n8n against current June 2026 primary sources; removed remaining public references to deleted cross-workflow Lindy/Zapier/n8n and Lovable/Bolt/v0 pages.

## Next

- Run the next selected same-category cycle: activepieces-vs-zapier.
