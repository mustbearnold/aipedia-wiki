# 2026-06-22 Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, Qodo Batch

Status: complete and verified.

## Scope

- Refreshed `src/content/tools/mastra.md`.
- Refreshed `src/content/tools/microsoft-agent-framework.md`.
- Refreshed `src/content/tools/midjourney.md`.
- Refreshed `src/content/tools/notebooklm.md`.
- Refreshed `src/content/tools/qodo.md`.
- Updated affected parent hubs:
  - `src/content/categories/ai-coding.md`
  - `src/content/categories/ai-automation.md`
  - `src/content/categories/ai-image.md`
  - `src/content/categories/ai-notes.md`
- Updated affected guide:
  - `src/content/use-cases/best-ai-for-code-review.md`
- Updated shared freshness surfaces:
  - `src/data/source-registry.json`
  - `PAGE_REFRESH_LEDGER.md`
  - `.agent/CURRENT_STATUS.md`
  - `.agent/PLANS.md`
  - `.agent/WORK_LOG.md`

## Current Source Notes

- Mastra pricing, model router, platform docs, blog, and GitHub rows were checked on 2026-06-22.
- Microsoft Agent Framework overview, GitHub releases, providers, and Work IQ licensing rows were checked on 2026-06-22.
- Midjourney plan comparison, version, video, terms, and update rows were checked on 2026-06-22.
- NotebookLM help, app, upgrade, and privacy rows were checked on 2026-06-22.
- Qodo pricing, pricing-and-usage, Review v2, docs index, IDE, governance, deployment, and enterprise rows were checked on 2026-06-22.

## Verification

- `npm run ledger:pages`: passed.
- `npm run tool:refresh:batch:check -- --file src\content\tools\mastra.md --file src\content\tools\microsoft-agent-framework.md --file src\content\tools\midjourney.md --file src\content\tools\notebooklm.md --file src\content\tools\qodo.md --json`: passed.
- `npm run typecheck`: passed.
- `npm run build:fast`: passed.
- `npm run qa:route -- --route /tools/mastra/ --route /categories/ai-coding/ --route /tools/microsoft-agent-framework/ --route /categories/ai-automation/ --route /tools/midjourney/ --route /categories/ai-image/ --route /tools/notebooklm/ --route /categories/ai-notes/ --route /tools/qodo/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`: passed.
- `node scripts\guard-em-dashes.mjs`: passed inside batch gate.
- `git diff --check`: passed inside batch gate.

## Next

After push, rerun `npm run tool:refresh:batch -- --limit 5 --json` and continue the active `/goal` with the next oldest active tools.
