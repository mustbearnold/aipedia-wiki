# 2026-06-20: cursor-vs-deepseek

## Summary

- Status: complete
- Route: /compare/cursor-vs-deepseek/
- Branch: master
- Commit: this commit

## Changed Files

- src/content/comparisons/cursor-vs-deepseek.md
- src/content/tools/cursor.md
- src/content/tools/deepseek.md
- src/content/categories/ai-coding.md
- src/pages/compare/index.astro
- src/pages/tools/index.astro
- src/pages/categories/index.astro
- src/pages/llms.txt.ts
- src/pages/llms-full.txt.ts
- src/data/source-registry.json
- src/data/coverage-backlog.json
- PAGE_REFRESH_LEDGER.md
- scripts/check-smart.mjs
- scripts/loop-verify.mjs

## Verification

- node --test tests/scripts/check-dist-budget.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs
- npm run audit:provenance:changed
- npm run audit:coverage-quality:changed
- node scripts/guard-em-dashes.mjs
- git diff --check
- AIPEDIA_LEDGER_DATE=2026-06-20 npm run loop:verify -- --date 2026-06-20 --route /compare/cursor-vs-deepseek/ --path <changed paths>

## Failures Or Fixes

- None recorded

## Residual Risks

- Known Astro markdown plugin deprecation warning still appears after build.

## Notes

- Loop verifier passed after fixing AIPEDIA_FAST_BUILD env leakage into unit tests. Verified route QA at 360, 390, 430, 768, 1024, and 1366 px.

## Next

- Review performance: smart-verification block took 230.7s, with build-fast about 2m23s; next loop improvement should reduce or stage broad script tests/build work.
