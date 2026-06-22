# 2026-06-22 Gemini Tool Refresh

## Trigger

The Oldest-First AI Tools Wiki Refresh loop selected Gemini as the next due high-volatility tool page. The user asked to continue refreshing every tool page.

## Scope

- Tool page: `src/content/tools/gemini.md`.
- Parent category hubs: `ai-chatbots`, `ai-search`, `ai-coding`, and `ai-infrastructure`.
- Source registry rows for Gemini model docs, API pricing, app limits, Code Assist, Workspace privacy, image/video docs, and Gemini Intelligence.
- Canonical page ledger: `PAGE_REFRESH_LEDGER.md`.
- Continuity docs: `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/WORK_LOG.md`.

## Changes

- Refreshed Gemini high-volatility facts to `verified_at: 2026-06-22` and moved due windows to `2026-06-29`.
- Added a June 22 price-history row clarifying that Gemini 3.5 Flash standard, batch/flex, and priority API pricing are separate rows.
- Kept the standard Gemini 3.5 Flash API price at `$1.50/M` input and `$9/M` output, with batch/flex at `$0.75/M` input and `$4.50/M` output, and priority at `$2.70/M` input and `$16.20/M` output.
- Replaced the stale Android Show source URL with the current official Googlebook Gemini Intelligence article.
- Tightened visible buyer guidance so subscription plans, API mode pricing, grounding/tools/media costs, Code Assist, and Antigravity are not conflated.
- Updated affected parent category copy and source dates where they summarize Gemini facts.
- Updated `src/data/source-registry.json` only for the verified Gemini source rows.
- Regenerated `PAGE_REFRESH_LEDGER.md`.

## Routes Checked

- `/tools/gemini/`
- `/categories/ai-chatbots/`
- `/categories/ai-search/`
- `/categories/ai-coding/`
- `/categories/ai-infrastructure/`

## Verification

- Official source checks:
  - Gemini API model docs.
  - Gemini API pricing docs, last updated June 18, 2026.
  - Gemini Apps limits and upgrades.
  - Google AI plans and Gemini subscriptions.
  - Gemini Code Assist business page.
  - Gemini image-generation and video-generation docs.
  - Grounding with Google Search docs.
  - Google Workspace generative AI privacy hub.
  - Googlebook Gemini Intelligence article.
- `npm run ledger:pages`
- `npm run audit:tool-quality -- --file src/content/tools/gemini.md`
- `npm run audit:provenance:changed -- --json`
- `npm run loop:freshness -- --json`
- `node scripts\guard-em-dashes.mjs`
- `npm run ledger:pages:check`
- `git diff --check`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/gemini/ --route /categories/ai-chatbots/ --route /categories/ai-search/ --route /categories/ai-coding/ --route /categories/ai-infrastructure/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run test:scripts`
- `npm run audit:coverage-quality:changed`

## Result

- Gemini dropped out of the due-now freshness queue.
- The freshness loop is green with 0 due-now facts and 0 attention loops.
- The next freshness targets are GitHub Copilot, Grammarly, Qwen, Hailuo, and HeyGen.

## Next

- Continue the Oldest-First AI Tools Wiki Refresh with GitHub Copilot unless a fresh loop recommendation makes another same-day tool or decision cycle higher leverage.
