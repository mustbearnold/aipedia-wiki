# 2026-06-20: cursor-vs-grok

## Summary

- Status: complete
- Route: /compare/cursor-vs-grok/
- Branch: master
- Commit: this commit

## Changed Files

- src/content/comparisons/cursor-vs-grok.md
- src/content/tools/cursor.md
- src/content/tools/grok.md
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
- tests/scripts/check-smart.test.mjs

## Verification

- npm run audit:coverage-quality:changed
- npm run audit:provenance:changed
- node scripts/guard-em-dashes.mjs
- git diff --check
- $env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/cursor-vs-grok/ --path <changed paths>
- node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs

## Failures Or Fixes

- Fixed loop performance review issue: check-smart now runs build:fast before smoke:visual and route QA, and prints per-command durations for the next review.

## Residual Risks

- Full loop verification still takes about 232 seconds because build:fast prerenders the large static site and builds the Vercel server bundle; known Astro markdown plugin deprecation warning remains.

## Notes

- None recorded

## Next

- Run deepseek-vs-github-copilot next, then use the new check-smart per-command timings to decide whether to split content-only verification from broad script/build verification.
