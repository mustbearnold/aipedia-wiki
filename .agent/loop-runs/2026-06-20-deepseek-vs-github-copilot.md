# 2026-06-20: deepseek-vs-github-copilot

## Summary

- Status: complete
- Route: /compare/deepseek-vs-github-copilot/
- Branch: master
- Commit: this commit

## Changed Files

- PAGE_REFRESH_LEDGER.md
- playwright.config.mjs
- scripts/check-smart.mjs
- scripts/loop-verify.mjs
- scripts/qa-route.mjs
- src/content/categories/ai-coding.md
- src/content/comparisons/deepseek-vs-github-copilot.md
- src/content/tools/deepseek.md
- src/content/tools/github-copilot.md
- src/data/coverage-backlog.json
- src/data/source-registry.json
- src/pages/categories/index.astro
- src/pages/compare/index.astro
- src/pages/llms-full.txt.ts
- src/pages/llms.txt.ts
- src/pages/tools/index.astro
- tests/scripts/check-smart.test.mjs
- tests/scripts/loop-hardening.test.mjs
- tests/scripts/playwright-config.test.mjs

## Verification

- focused loop hardening tests passed
- provenance and coverage quality changed gates passed
- guard-em-dash sweep and git diff check passed
- loop verifier passed for /compare/deepseek-vs-github-copilot/ in about 251 seconds

## Failures Or Fixes

- None recorded

## Residual Risks

- Full loop verification is safer but still slow: check-smart took 247.4 seconds, smoke visual took 47.0 seconds, and exact four-route QA took 26.1 seconds.
- Known Astro markdown plugin deprecation warning remains.

## Notes

- Added DeepSeek vs GitHub Copilot and refreshed DeepSeek, GitHub Copilot, AI Coding, source registry, coverage backlog, ledger, top-layer pages, and LLM surfaces.
- Loop hardening now forces fresh fast-build Playwright output, runs one combined route QA command for all changed rendered content routes, allows local static misses for the hosted reviews API, and avoids duplicate fallback comparison QA.

## Next

- Next cluster from loop:next is deepseek-vs-replit-agent.
