# 2026-06-20: deepseek-vs-replit-agent

## Summary

- Status: complete
- Route: /compare/deepseek-vs-replit-agent/
- Branch: Not recorded
- Commit: Not recorded

## Changed Files

- src/content/comparisons/deepseek-vs-replit-agent.md
- src/content/tools/deepseek.md
- src/content/tools/replit-agent.md
- src/content/categories/ai-coding.md
- src/pages/compare/index.astro
- src/pages/tools/index.astro
- src/pages/categories/index.astro
- src/pages/llms.txt.ts
- src/pages/llms-full.txt.ts
- src/data/source-registry.json
- src/data/coverage-backlog.json
- PAGE_REFRESH_LEDGER.md

## Verification

- npm run audit:coverage-quality:changed
- npm run audit:provenance:changed
- node scripts/guard-em-dashes.mjs
- git diff --check
- npm run loop:verify -- --date 2026-06-20 --route /compare/deepseek-vs-replit-agent/ --path <changed paths>

## Failures Or Fixes

- None recorded

## Residual Risks

- None recorded

## Notes

- None recorded

## Next

- Next backlog target is descript-vs-grok. Loop performance improved by replacing broad smoke:visual with exact route QA for content-only route cycles; consider moving the allowlist into operator-surfaces.json as a cleaner contract-level representation.
