# Focused AI News, Jun 26-28

Date: 2026-06-28

## Scope

- Added three source-backed AiPedia news articles for each of June 26, June 27, and June 28, 2026.
- Refreshed `/news/`, homepage news rail metadata, RSS metadata, LLM manifest metadata, generated OG/news assets, and `PAGE_REFRESH_LEDGER.md`.
- Inspected affected category hubs through rendered route QA because category graphs surface related news dynamically.

## Articles

- `/news/2026-06-26-openai-gpt-56-sol-preview-access-risk/`
- `/news/2026-06-26-newegg-ai-shopping-mode/`
- `/news/2026-06-26-gemini-sheets-formula-fixes/`
- `/news/2026-06-27-claude-mythos-critical-infrastructure-return/`
- `/news/2026-06-27-fable-5-stays-offline/`
- `/news/2026-06-27-sail-research-agent-inference-costs/`
- `/news/2026-06-28-gpt-56-sol-cheating-benchmark-risk/`
- `/news/2026-06-28-claude-opus-47-fast-mode-deadline/`
- `/news/2026-06-28-veo-vertex-ai-endpoint-deadline/`

## Source Checks

- Current June 2026 source checks used official OpenAI, Anthropic, Google Workspace, Google Cloud, METR, Business Wire, Sail Research, and named reporting sources.
- Scripted URL spot-check returned 200 for most cited URLs. OpenAI public/help pages returned 403 to scripted fetch but were retained as primary-source citations and backed by reachable reporting or deployment-safety sources where needed.

## Verification

- `node scripts/guard-em-dashes.mjs`
- `npm run check:news`
- `node scripts/audit-news-rendering.mjs --json`
- `node scripts/generate-og-news.mjs --check 2026-06-26-openai-gpt-56-sol-preview-access-risk 2026-06-26-newegg-ai-shopping-mode 2026-06-26-gemini-sheets-formula-fixes 2026-06-27-claude-mythos-critical-infrastructure-return 2026-06-27-fable-5-stays-offline 2026-06-27-sail-research-agent-inference-costs 2026-06-28-gpt-56-sol-cheating-benchmark-risk 2026-06-28-claude-opus-47-fast-mode-deadline 2026-06-28-veo-vertex-ai-endpoint-deadline`
- `npm run ledger:pages`
- `npm run ledger:pages:check`
- `npm run guard:check`
- `npm run check:links`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run build:fast`
- `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route / --route /news/ --route /categories/ai-chatbots/ --route /categories/ai-coding/ --route /categories/ai-automation/ --route /categories/ai-infrastructure/ --route /categories/ai-search/ --route /categories/ai-video/ --route /news/2026-06-26-openai-gpt-56-sol-preview-access-risk/ --route /news/2026-06-26-newegg-ai-shopping-mode/ --route /news/2026-06-26-gemini-sheets-formula-fixes/ --route /news/2026-06-27-claude-mythos-critical-infrastructure-return/ --route /news/2026-06-27-fable-5-stays-offline/ --route /news/2026-06-27-sail-research-agent-inference-costs/ --route /news/2026-06-28-gpt-56-sol-cheating-benchmark-risk/ --route /news/2026-06-28-claude-opus-47-fast-mode-deadline/ --route /news/2026-06-28-veo-vertex-ai-endpoint-deadline/`
- `git diff --check`

## Follow-Up

- Continue daily AI and AI-tools news before returning to affiliate conversion work.
- If GPT-5.6, Fable 5, Mythos 5, or Veo deprecation guidance changes, update the exact affected news/tool/category routes before the next affiliate pass.
