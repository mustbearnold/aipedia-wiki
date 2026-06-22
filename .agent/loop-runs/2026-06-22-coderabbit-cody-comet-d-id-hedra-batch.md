# 2026-06-22 CodeRabbit, Cody, Comet, D-ID, Hedra Batch

Status: complete locally, verified, not yet pushed.

## Scope

- Refreshed `src/content/tools/coderabbit.md`, `src/content/tools/cody.md`, `src/content/tools/comet.md`, `src/content/tools/d-id.md`, and `src/content/tools/hedra.md`.
- Updated affected parent and buyer surfaces: AI Coding, AI Search, AI Video, AI Voice, Best AI for Code Review, and Best AI Avatar Video Generator.
- Updated related rows in `src/data/source-registry.json`.
- Regenerated `PAGE_REFRESH_LEDGER.md`.

## Source Notes

- CodeRabbit: plan pricing, usage add-on, platform docs, CLI, knowledge base, Slack Agent, and changelog surfaces were checked against current official pages.
- Cody: Sourcegraph pricing, Cody docs, model-provider docs, AI terms, and VS Code Marketplace listing were checked.
- Comet: Perplexity Comet, Enterprise Comet, Enterprise pricing, Max help, and privacy/security docs were checked.
- D-ID: AI Agents, Agentic Videos, Studio pricing, API docs, and official surface were checked.
- Hedra: pricing, models, enterprise, agent workflows, and skills surfaces were checked.

## Verification

- `npm run tool:refresh:batch:check -- --file src\content\tools\coderabbit.md --file src\content\tools\cody.md --file src\content\tools\comet.md --file src\content\tools\d-id.md --file src\content\tools\hedra.md --json`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/coderabbit/ --route /categories/ai-coding/ --route /tools/cody/ --route /tools/comet/ --route /categories/ai-search/ --route /tools/d-id/ --route /categories/ai-video/ --route /tools/hedra/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `node scripts\guard-em-dashes.mjs`
- `git diff --check`

## Next Queue

`npm run tool:refresh:batch -- --limit 5 --json` now returns:

1. Mastra.
2. Microsoft Agent Framework.
3. Midjourney.
4. Google NotebookLM.
5. Qodo.

## Caveats

- The sitewide tool refresh goal remains active. This batch only clears five tools.
- Keep `typecheck` and `build:fast` sequential because concurrent Astro content sync can race.
