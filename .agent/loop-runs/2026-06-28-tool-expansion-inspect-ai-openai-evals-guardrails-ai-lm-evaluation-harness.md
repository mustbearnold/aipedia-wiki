# 2026-06-28 Tool Expansion: Inspect AI, OpenAI Evals, Guardrails AI, and LM Evaluation Harness

Status: complete locally, verified, pending commit and push.

## Scope

- Added `src/content/tools/inspect-ai.md`.
- Added `src/content/tools/openai-evals.md`.
- Added `src/content/tools/guardrails-ai.md`.
- Added `src/content/tools/lm-evaluation-harness.md`.
- Added logos under `public/logos/tools/` and regenerated `src/data/logo-manifest.json`.
- Regenerated OG cards and `src/data/generated-assets/og-tools-manifest.json`.
- Updated `src/data/source-registry.json` and `src/data/_meta/tools-registry.json`.
- Updated parent hubs: `src/content/categories/ai-infrastructure.md`, `src/content/categories/ai-coding.md`, and `src/content/categories/ai-automation.md`.
- Updated top-layer and LLM surfaces: `/`, `/tools/`, `/categories/`, `/llms.txt`, and `/llms-full.txt`.
- Regenerated `PAGE_REFRESH_LEDGER.md`.

## Source Notes

- Inspect AI was verified from official docs, the official evals listing, GitHub repository metadata, and the MIT license.
- OpenAI Evals was verified from official OpenAI Evals docs, the official OpenAI deprecations page, the OpenAI GitHub repository, and the MIT license.
- Guardrails AI was verified from official docs, validator docs, GitHub repository metadata, and the Apache-2.0 license.
- LM Evaluation Harness was verified from the EleutherAI README, GitHub repository metadata, and the MIT license.

## Buyer Caveats

- OpenAI Evals is a migration bridge, not a new durable eval-platform recommendation. Existing evals become read-only on October 31, 2026, and the hosted dashboard/API shut down on November 30, 2026.
- Guardrails AI hosted or remote-validator pricing was not publicly verified.
- Inspect AI and LM Evaluation Harness are free frameworks, but model calls, compute, sandboxes, GPUs, storage, output review, and release policy remain buyer-owned.

## Verification

- `npm run check:frontmatter -- --files src/content/tools/inspect-ai.md src/content/tools/openai-evals.md src/content/tools/guardrails-ai.md src/content/tools/lm-evaluation-harness.md`
- `rg -n "<U+2014>|game-changing|cutting-edge|seamless|world-class|in today's fast-paced" src/content/tools/inspect-ai.md src/content/tools/openai-evals.md src/content/tools/guardrails-ai.md src/content/tools/lm-evaluation-harness.md src/content/categories/ai-infrastructure.md src/content/categories/ai-coding.md src/content/categories/ai-automation.md src/pages/index.astro src/pages/tools/index.astro src/pages/categories/index.astro src/pages/llms.txt.ts src/pages/llms-full.txt.ts`
- `node scripts/generate-logo-manifest.mjs`
- `node scripts/generate-og-svgs.mjs`
- `AIPEDIA_LEDGER_DATE=2026-06-28 npm run ledger:pages -- --date 2026-06-28`
- Four `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file ...` runs for the new tool pages.
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run check:frontmatter -- --changed`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:provenance:changed -- --json`
- `node scripts/generate-logo-manifest.mjs --check`
- `node scripts/generate-og-svgs.mjs --check`
- `npm run audit:sources -- --live --limit 0 --source-id inspect-ai-official --source-id inspect-ai-evals-list --source-id inspect-ai-license --source-id inspect-ai-repository --source-id openai-evals-docs --source-id openai-evals-deprecations --source-id openai-evals-license --source-id openai-evals-repository --source-id guardrails-ai-official --source-id guardrails-ai-docs --source-id guardrails-ai-validators --source-id guardrails-ai-license --source-id guardrails-ai-repository --source-id lm-evaluation-harness-readme --source-id lm-evaluation-harness-license --source-id lm-evaluation-harness-repository`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run guard:check`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run lint`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run build:fast`
- `npm run qa:route -- --site-dir dist-fast/client --routes /tools/inspect-ai/,/tools/openai-evals/,/tools/guardrails-ai/,/tools/lm-evaluation-harness/,/categories/ai-infrastructure/,/categories/ai-coding/,/categories/ai-automation/,/tools/,/categories/,/ --widths 319,360,390,430,768,1024,1366 --concurrency 6`
- Built-output smoke check for `dist-fast/client/api/tools.json`, `dist-fast/client/api/search-tools.json`, `dist-fast/client/api/home-search.json`, `dist-fast/client/llms.txt`, and `dist-fast/client/llms-full.txt`.
- `node scripts/guard-em-dashes.mjs`
- `npm run check:quick`
- `npm run check:links`
- `npm run check:news`
- `npm run audit:generated-models -- --limit 0`
- `git diff --check`

## Closeout Catches

- Added missing `next_review_at` on a high-volatility OpenAI Evals fact.
- Updated the shared `dalle-best-for` source registry row to `last_checked: 2026-06-28` after reusing and verifying the OpenAI deprecations source in this batch.
- Plain `npm run lint` reported the June 28 ledger stale because it used the actual current date. The verified command pins `AIPEDIA_LEDGER_DATE=2026-06-28`, matching this editorial batch.
