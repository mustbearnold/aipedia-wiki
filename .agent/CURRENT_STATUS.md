# AiPedia Current Status

Last updated: 2026-06-22

Audience: maintainers, future agents, and Matt.

## Read First

1. `.agent/CURRENT_STATUS.md`: current state and next action.
2. `.agent/PLANS.md`: active or immediately resumable plans.
3. `.agent/LOOPS.md`: repeatable loop commands and rules.
4. `.agent/OPERATING_RULES.md` and `.agent/PROJECT_MAP.md`: repo rules, paths, and verification map.
5. `.agent/WORK_LOG.md`: append-only proof trail. Read newest entries only unless investigating history.

Old specs, archived plans, local ignored docs, and stale chat history are not canonical when they conflict with this stack.

## Current State

- Branch: `master`. Latest completed batch is Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, and Qodo.
- The TanStack rebuild is not active.
- The loop system is healthy: latest broad recorded review is 7 ok / 0 attention / 0 skipped after a fresh `npm run build:fast`.
- Comparison policy is strict: publish `vs` pages only for tools that solve the same buyer job and workflow. Cross-category or different-workflow pages must be deleted or avoided.
- Visual layout policy is strict: every rendered page must preserve grid math, spacing, containment, readable text ratios, and no horizontal overflow across mobile, tablet, and desktop.
- Top-layer and detail width parity work is complete and pushed. The homepage, top-layer indexes, and representative detail pages now share the narrow-mobile width discipline requested in browser feedback.
- News catch-up for June 18-22 is complete, and the selected lantern logo is active. The old blue/cyan brand regression was closed.
- Homepage reported issues are closed: decision-card overcrowding, source/freshness/confidence fallback labels, 319 px portal overflow, orange-brown verified panel styling, and copy density.

## Freshness Queue

Completed for June 21-22:

- Presentations.AI and MiniMax.
- Claude and Claude Code.
- Gemini.
- GitHub Copilot.
- Grammarly.
- Qwen.
- Hailuo.
- HeyGen.
- Adobe Firefly.
- Augment Code.
- Base44.
- BLACKBOX AI.
- Captions.ai.
- Cline.
- CodeRabbit.
- Cody.
- Comet.
- D-ID.
- Hedra.
- Mastra.
- Microsoft Agent Framework.
- Midjourney.
- NotebookLM.
- Qodo.

Current local batch from `npm run tool:refresh:batch -- --limit 5 --json`:

1. `mastra`: `/tools/mastra/`, parent `/categories/ai-coding/`.
2. `microsoft-agent-framework`: `/tools/microsoft-agent-framework/`, parent `/categories/ai-automation/`.
3. `midjourney`: `/tools/midjourney/`, parent `/categories/ai-image/`.
4. `notebooklm`: `/tools/notebooklm/`, parent `/categories/ai-notes/`.
5. `qodo`: `/tools/qodo/`, parent `/categories/ai-coding/`.

This batch has content, parent hubs, source registry rows, `PAGE_REFRESH_LEDGER.md`, and the affected code-review guide updated and verified. Rerun `npm run tool:refresh:batch -- --limit 5 --json` to identify the next oldest-first batch.

Use the batched tool refresh flow:

1. Verify current June 2026 sources for every tool in the batch.
2. Edit tool pages, affected parent hubs, source registry rows, and `PAGE_REFRESH_LEDGER.md` together.
3. Run `npm run tool:refresh:batch:check -- --file <tool>...` as the fast grouped gate.
4. Run one `npm run typecheck`, one `npm run build:fast`, and one combined `npm run qa:route`.

Do not return to one full build per tool unless a template, runtime, layout, generated asset, high-risk commercial claim, or isolated failure requires it.

## Active Work

### Oldest-First Tool Freshness

The Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, and Qodo batch is verified. It updates:

- `src/content/categories/ai-coding.md`
- `src/content/categories/ai-automation.md`
- `src/content/categories/ai-image.md`
- `src/content/categories/ai-notes.md`
- `src/content/use-cases/best-ai-for-code-review.md`
- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- `/tools/` and `/categories/` via ledger/build output

### Decision Content Flywheel

Recommended next comparison remains `amazon-q-vs-github-copilot`, but do not start it until the active freshness batch is closed or intentionally paused.

### Top-Layer Visual Uplift

Shared width and card-surface work is complete. Future visual work should inspect page-specific hierarchy and copy density for `/guides/`, `/news/`, `/answers/`, `/trends/`, `/workflows/`, and high-traffic detail templates.

## Current Verification Baseline

Latest completed batched tool refresh passed:

- `npm run tool:refresh:batch:check -- --file src\content\tools\mastra.md --file src\content\tools\microsoft-agent-framework.md --file src\content\tools\midjourney.md --file src\content\tools\notebooklm.md --file src\content\tools\qodo.md --json`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/mastra/ --route /categories/ai-coding/ --route /tools/microsoft-agent-framework/ --route /categories/ai-automation/ --route /tools/midjourney/ --route /categories/ai-image/ --route /tools/notebooklm/ --route /categories/ai-notes/ --route /tools/qodo/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `node scripts\guard-em-dashes.mjs`
- `git diff --check`

The fast batch gate took about 7 seconds. `build:fast` still takes roughly 2-3 minutes because it prerenders hundreds of routes and runs guard, indexability, commercial CTA, sitemap, and budget checks. Pay that cost once per batch.

## Known Caveats

- Freshness is green for due-now items, but June 22 due-soon facts still need continued current-source review.
- Do not run `npm run typecheck` and `npm run build:fast` in parallel. Astro uses a shared local content data store under `node_modules/.astro`, and concurrent content sync can race. Run them sequentially.
- `node scripts/audit-site-kpis.mjs --json` still reports `neuronwriter-vs-surfer-seo` below the 700-word comparison KPI threshold. This is known improvement debt, not a failing loop signal.
- Full local verification remains reliable but slow. Prefer focused checks, `tool:refresh:batch:check`, `check:smart`, `build:fast`, and exact `qa:route`.
- Vercel CLI state has been inconsistent across sessions. If Vercel operations are needed, confirm with `vercel --version`; if missing, install with `npm i -g vercel`.
- `.agents/` and `skills-lock.json` are local agent/plugin state. They are gitignored and ignored by `check-smart` default untracked discovery.

## Start Next Session

1. Run `git status --short --branch`.
2. Read this file and `.agent/PLANS.md`.
3. Run `npm run tool:refresh:batch -- --limit 5 --json`.
4. Continue the active batch unless a newer user request supersedes it.

## Finish Major Work

1. Update `.agent/CURRENT_STATUS.md`.
2. Update `.agent/PLANS.md`.
3. Append `.agent/WORK_LOG.md`.
4. Add or update a receipt under `.agent/loop-runs/`.
5. Run the smallest valid verification gate and report what passed, what failed, and what remains.
