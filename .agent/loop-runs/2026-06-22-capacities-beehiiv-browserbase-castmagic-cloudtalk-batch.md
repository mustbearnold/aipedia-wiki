# 2026-06-22 Capacities, Beehiiv, Browserbase, Castmagic, CloudTalk Batch

Status: complete and verified.

## Scope

- Refreshed `src/content/tools/capacities.md`.
- Refreshed `src/content/tools/beehiiv.md`.
- Refreshed `src/content/tools/browserbase.md`.
- Refreshed `src/content/tools/castmagic.md`.
- Refreshed `src/content/tools/cloudtalk.md`.
- Updated affected parent hubs:
  - `src/content/categories/ai-notes.md`
  - `src/content/categories/ai-writing.md`
  - `src/content/categories/ai-automation.md`
- Updated shared freshness surfaces:
  - `src/data/source-registry.json`
  - `PAGE_REFRESH_LEDGER.md`
  - `.agent/CURRENT_STATUS.md`
  - `.agent/PLANS.md`
  - `.agent/WORK_LOG.md`

## Current Source Notes

- Capacities pricing, product/docs, AI assistant docs, AI Chat Connectors docs, and Release 64 rows were checked on 2026-06-22.
- Beehiiv pricing, official site, MCP help, product updates, and developer docs rows were checked on 2026-06-22. The page now calls out the June 16 MCP write-access update and paid-plan write-access guardrail.
- Browserbase pricing, official site, changelog, and Browserbase Browser explainer rows were checked on 2026-06-22.
- Castmagic pricing, product overview, API docs, and affiliate program rows were checked on 2026-06-22.
- CloudTalk pricing, official site, and AI Voice Agents rows were checked on 2026-06-22.

## Verification

- `npm run ledger:pages`: passed.
- `npm run tool:refresh:batch:check -- --file src\content\tools\capacities.md --file src\content\tools\beehiiv.md --file src\content\tools\browserbase.md --file src\content\tools\castmagic.md --file src\content\tools\cloudtalk.md --json`: passed.
- `npm run typecheck`: passed.
- `npm run build:fast`: passed.
- `npm run qa:route -- --route /tools/capacities/ --route /categories/ai-notes/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/castmagic/ --route /tools/cloudtalk/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`: passed.
- `node scripts\guard-em-dashes.mjs`: passed inside batch gate.
- `git diff --check`: passed inside batch gate.

## Next

Continue the active `/goal` with the next batch from `npm run tool:refresh:batch -- --limit 5 --json`: Grok, Cursor, Lindy, n8n, and Mistral AI.
