# Claude Code, GitHub Copilot, Grammarly, Mistral AI, Qwen Batch

Date: 2026-06-23

Status: complete locally, verified, not pushed.

## Scope

- Refreshed `src/content/tools/claude-code.md`.
- Refreshed `src/content/tools/github-copilot.md`.
- Refreshed `src/content/tools/grammarly.md`.
- Refreshed `src/content/tools/mistral-ai.md`.
- Refreshed `src/content/tools/qwen.md`.
- Updated affected parent hubs:
  - `src/content/categories/ai-coding.md`
  - `src/content/categories/ai-writing.md`
  - `src/content/categories/ai-chatbots.md`
- Updated `src/data/source-registry.json`.
- Regenerated `PAGE_REFRESH_LEDGER.md`.

## Source Notes

- Anthropic and GitHub official sources keep Claude Fable 5 unavailable or suspended in practical buyer routes, while Opus 4.8 remains the stable Anthropic high-end route.
- GitHub Copilot still needs AI Credits modeling, and Opus 4.6 fast has a June 29, 2026 deprecation notice in favor of Opus 4.8 fast.
- Grammarly Pro remains anchored at Free with 100 AI prompts and Pro with 2,000 prompts, while the Superhuman suite and Enterprise paths are separate buyer questions.
- Mistral remains a Vibe, API, Search Toolkit, EU infrastructure, and open-weight strategy lane rather than a generic chatbot subscription.
- Qwen's qwen3.7-max list price remains the safe buyer anchor; the visible 50% promo page says it was effective until June 22, 2026, so current copy warns buyers to confirm checkout-visible discounts.

## Verification

- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --file src\content\tools\claude-code.md --file src\content\tools\github-copilot.md --file src\content\tools\grammarly.md --file src\content\tools\mistral-ai.md --file src\content\tools\qwen.md`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/claude-code/ --route /categories/ai-coding/ --route /tools/github-copilot/ --route /tools/grammarly/ --route /categories/ai-writing/ --route /tools/mistral-ai/ --route /categories/ai-chatbots/ --route /tools/qwen/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`

## Next Queue

From `npm run tool:refresh:batch -- --limit 5 --json` after closeout:

1. `capacities`, `/tools/capacities/`, parent `/categories/ai-notes/`.
2. `consensus`, `/tools/consensus/`, parent `/categories/ai-research/`.
3. `cursor`, `/tools/cursor/`, parent `/categories/ai-coding/`.
4. `hailuo`, `/tools/hailuo/`, parent `/categories/ai-video/`.
5. `heygen`, `/tools/heygen/`, parent `/categories/ai-video/`.

Planner totals: 261 tools, 4 dead tools, 1548 facts, 1401 sources, 0 due-now tools, 470 due-soon facts, 0 stale verification candidates, 0 unknown source IDs.
