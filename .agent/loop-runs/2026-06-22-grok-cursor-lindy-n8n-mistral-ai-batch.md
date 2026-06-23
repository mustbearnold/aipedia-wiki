# 2026-06-22 Grok, Cursor, Lindy, n8n, Mistral AI Batch

Status: complete locally, verified, not yet pushed.

## Scope

Refreshed:

- `src/content/tools/grok.md` at `/tools/grok/`
- `src/content/tools/cursor.md` at `/tools/cursor/`
- `src/content/tools/lindy.md` at `/tools/lindy/`
- `src/content/tools/n8n.md` at `/tools/n8n/`
- `src/content/tools/mistral-ai.md` at `/tools/mistral-ai/`

Affected parent hubs:

- `src/content/categories/ai-chatbots.md` at `/categories/ai-chatbots/`
- `src/content/categories/ai-coding.md` at `/categories/ai-coding/`
- `src/content/categories/ai-automation.md` at `/categories/ai-automation/`

Shared surfaces:

- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- `/tools/`
- `/categories/`

## Source Checks

Current-source checks were performed on 2026-06-22:

- xAI model and pricing pages confirmed Grok 4.3, Grok Build 0.1, 1M context, SuperGrok pricing, API pricing, Voice API, and Imagine pricing.
- Cursor pricing, June 2026 Teams pricing, and Composer 2.5 changelog confirmed the current individual, team, enterprise, and premium-tier positioning.
- Lindy pricing, credit docs, and partner program listing confirmed 7-day trial, Plus, Pro, Max, Enterprise, credits, non-rollover behavior, and current affiliate terms.
- n8n pricing and release listings confirmed hosted, self-hosted, enterprise positioning, Community edition, and stable 2.26.8 versus newer 2.27.x pre-release builds.
- Mistral pricing and model docs confirmed Vibe plan rows, API price rows, Medium 3.5, Small 4, Large 3, and model lifecycle details.

## Changed

- Advanced all five tool pages to `last_verified: 2026-06-22`.
- Updated high-volatility facts and visible verification notes where needed.
- Updated parent hub source rows and summary language for the changed tools.
- Updated relevant `source-registry.json` entries to `last_checked: 2026-06-22`.
- Regenerated `PAGE_REFRESH_LEDGER.md`.
- Fixed readability findings caught by the batch gate in Grok and Lindy.

## Verification

Passed:

- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --file src\content\tools\grok.md --file src\content\tools\cursor.md --file src\content\tools\lindy.md --file src\content\tools\n8n.md --file src\content\tools\mistral-ai.md --json`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/grok/ --route /categories/ai-chatbots/ --route /tools/cursor/ --route /categories/ai-coding/ --route /tools/lindy/ --route /categories/ai-automation/ --route /tools/n8n/ --route /tools/mistral-ai/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run ledger:pages:check`
- `git diff --check`

## Next Queue

Next batch from `npm run tool:refresh:batch -- --limit 5 --json`:

1. `argil`: `/tools/argil/`, parent `/categories/ai-video/`.
2. `canva`: `/tools/canva/`, parent `/categories/ai-design/`.
3. `replit-agent`: `/tools/replit-agent/`, parent `/categories/ai-coding/`.
4. `claude`: `/tools/claude/`, parent `/categories/ai-chatbots/`.
5. `gemini`: `/tools/gemini/`, parent `/categories/ai-chatbots/`.

Required closeout for that batch:

- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --file src\content\tools\argil.md --file src\content\tools\canva.md --file src\content\tools\replit-agent.md --file src\content\tools\claude.md --file src\content\tools\gemini.md --json`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/argil/ --route /categories/ai-video/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/replit-agent/ --route /categories/ai-coding/ --route /tools/claude/ --route /categories/ai-chatbots/ --route /tools/gemini/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
