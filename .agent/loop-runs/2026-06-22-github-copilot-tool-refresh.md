# GitHub Copilot Tool Refresh

Date: 2026-06-22

Status: complete

## Scope

- Refreshed `src/content/tools/github-copilot.md` for the June 22 freshness queue.
- Updated affected parent and buyer surfaces:
  - `src/content/categories/ai-coding.md`
  - `src/content/comparisons/github-copilot-vs-supermaven.md`
  - `src/content/use-cases/github-copilot-alternatives.md`
  - `src/content/use-cases/best-ai-tools-for-developers.md`
- Updated Copilot source registry rows and added the missing Copilot product, MAI-Code-1-Flash, Opus 4.6 fast, and AGENTS.md code-review source IDs.
- Regenerated `PAGE_REFRESH_LEDGER.md`.
- Updated `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/WORK_LOG.md`.

## Source Checks

Verified current GitHub sources for:

- Plan pricing and plan availability.
- Copilot Free caps: 2,000 completions and 50 chat requests.
- Individual Student, Pro, Pro+, and Max sign-up reopening.
- Pro, Pro+, Max, Business, and Enterprise AI Credits.
- Business and Enterprise June 1 to September 1, 2026 temporary credit allowances.
- Supported model and model-pricing docs.
- Fable 5 suspension and unavailable state.
- MAI-Code-1-Flash surface expansion.
- Opus 4.6 fast deprecation on June 29, 2026.
- Copilot app GA.
- Agent tasks REST API, larger context windows, configurable reasoning, chat-agent handoff, Agentic Workflows, CLI settings, AGENTS.md code-review support, and `ai_credits_used` usage metrics.

## Verification

- `npm run audit:tool-quality -- --file src/content/tools/github-copilot.md`
- `npm run audit:provenance:changed -- --json`
- `npm run loop:freshness -- --json`
- `npm run ledger:pages:check`
- `node scripts\guard-em-dashes.mjs`
- `git diff --check`
- `npm run audit:coverage-quality:changed`
- `npm run typecheck`
- `npm run test:scripts`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/github-copilot/ --route /categories/ai-coding/ --route /compare/github-copilot-vs-supermaven/ --route /guides/github-copilot-alternatives/ --route /guides/best-ai-tools-for-developers/ --route /tools/ --route /categories/ --route /compare/ --route /guides/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`

All checks passed.

## Queue After Run

`npm run loop:freshness -- --json` reports 0 due-now items and 465 due-soon facts.

Next freshness tools:

- Grammarly
- Qwen
- Hailuo AI
- HeyGen

Decision Content may still choose `amazon-q-vs-github-copilot` if a fresh broad loop run ranks it above the freshness queue.
