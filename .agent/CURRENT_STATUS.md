# AiPedia Current Status

Last updated: 2026-06-25

Audience: maintainers, future agents, and Matt.

## Read First

1. `.agent/CURRENT_STATUS.md`: current state and next action.
2. `.agent/PLANS.md`: active or immediately resumable plans.
3. `.agent/LOOPS.md`: repeatable loop commands and rules.
4. `.agent/OPERATING_RULES.md` and `.agent/PROJECT_MAP.md`: repo rules, paths, and verification map.
5. `.agent/WORK_LOG.md`: append-only proof trail. Read newest entries only unless investigating history.

Old specs, archived plans, local ignored docs, and stale chat history are not canonical when they conflict with this stack.

## Current State

- Branch: `codex/refresh-tool-pages-june-23`. Latest completed tool batch is the June 24 six-shard 60-tool baseline run: Cody through Lovart from `.tmp-tool-refresh-batch.json`.
- The TanStack rebuild is not active.
- The loop system is healthy: latest broad recorded review is 7 ok / 0 attention / 0 skipped after a fresh `npm run build:fast`.
- Comparison policy is strict: publish `vs` pages only for tools that solve the same buyer job and workflow. Cross-category or different-workflow pages must be deleted or avoided.
- Visual layout policy is strict: every rendered page must preserve grid math, spacing, containment, readable text ratios, and no horizontal overflow across mobile, tablet, and desktop.
- Top-layer and detail width parity work is complete and pushed. The homepage, top-layer indexes, and representative detail pages now share the narrow-mobile width discipline requested in browser feedback.
- News catch-up for June 18-22 is complete, and the selected lantern logo is active. The old blue/cyan brand regression was closed.
- Homepage reported issues are closed: decision-card overcrowding, source/freshness/confidence fallback labels, 319 px portal overflow, orange-brown verified panel styling, and copy density.
- The model availability tracker interruption is handled: `/trends/model-availability-churn/` is now a simple daily frontier-model availability ledger, `/` and `/news/` are marked for daily refresh, and the Codex app automation `daily-aipedia-news-and-model-availability-refresh` is active. The `/news/` daily automation explicitly requires at least three source-backed AI or AI-tool stories per run.
- Jun 23-24 focused news coverage is complete with five source-backed individual stories and no daily desk page: OpenAI Daybreak/Codex Security, Samsung ChatGPT Enterprise and Codex, Claude reliability incidents, GLM-5.2 open-model pressure, and Google AI talent movement.
- Tool pages now use the shared decision-spine default: hero, decision card, plan guidance, fit, recent changes, alternatives, related comparisons, then collapsed proof/score math and full review notes. Keep future tool-page work in this format unless there is a deliberate template migration.
- The optimized tool-refresh workflow is now packaged as local skill `$aipedia-tool-refresh-workflow` under `.agents/skills/aipedia-tool-refresh-workflow/`. Treat it as the incubating playbook before promoting stable behavior into `src/data/aipedia-loops.json`. In the Codex Windows app, use six parallel shard workers with up to 10 tools per worker because six active agents was the observed ceiling on June 24.
- The tool-refresh planner now includes registered source metadata, scoped `audit:sources` commands, and shard-level `source_ids` so integrators can check source reachability, content-hash changes, and snapshots before spending manual review time.
- The first full 60-tool workflow baseline completed on June 24, 2026 in 36m 55s through the main route QA, and 41m 31s including documentation, supplemental route QA, and final sanity checks. Core workflow timing: 25m 07s worker collection, then 11m 48s integration and verification. Closeout timings were ledger 2s, batch check 37s, typecheck 32s, check:quick 22s, build:fast 64s, main route QA 107s for 80 routes across five widths, and supplemental route QA 4s for two edited routes missed by the main matrix.

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
- Capacities.
- Beehiiv.
- Browserbase.
- Castmagic.
- CloudTalk.
- Grok.
- Cursor.
- Lindy.
- n8n.
- Mistral AI.
- Argil.
- Canva.
- Replit Agent.
- Claude.
- Gemini.
- Decktopus.
- Grok.
- n8n.

Latest completed batch:

- 60-tool six-shard baseline run from `.tmp-tool-refresh-batch.json`: `cody`, `comet`, `continue`, `copy-ai`, `crewai`, `d-id`, `hedra`, `lindy`, `mastra`, `microsoft-agent-framework`, `midjourney`, `notebooklm`, `qodo`, `replit-agent`, `claude`, `decktopus`, `gemini`, `grok`, `n8n`, `claude-code`, `github-copilot`, `grammarly`, `mistral-ai`, `qwen`, `capacities`, `cursor`, `hailuo`, `heygen`, `adobe-firefly`, `argil`, `augment-code`, `base44`, `dia`, `figma`, `chatgpt`, `deepseek`, `meetgeek`, `elevenlabs`, `elicit`, `voxtral`, `windsurf`, `codeium`, `descript`, `perplexity`, `kling`, `runway`, `seedance`, `veo`, `suno`, `synthesia`, `udio`, `bolt`, `lovable`, `mubert`, `pika`, `v0`, `langgraph`, `minimax`, `pipedream`, and `lovart`.
- Affected parent hubs: AI Automation, AI Chatbots, AI Coding, AI Design, AI Image, AI Infrastructure, AI Music, AI Notes, AI Presentation, AI Research, AI Search, AI Video, AI Voice, and AI Writing.
- Shared updates: `src/data/source-registry.json`, `PAGE_REFRESH_LEDGER.md`, tool-refresh planner same-day exclusion, affected category hubs, and the historical Claude Agent SDK billing news correction.

Latest completed news pass:

1. `/news/2026-06-23-openai-daybreak-codex-security/`
2. `/news/2026-06-23-samsung-chatgpt-codex-enterprise/`
3. `/news/2026-06-23-claude-error-rate-fallback-planning/`
4. `/news/2026-06-24-zai-glm-52-open-model-pressure/`
5. `/news/2026-06-24-google-ai-talent-openai-anthropic/`

Next due-soon tracked-tool queue:

- Regenerate before the next batch with `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`.
- The planner now excludes tools already verified on the current date by default. Use `--include-same-day` only when the user explicitly wants to revisit same-day refreshed tools.
- Recompute the next queue after this run; do not rely on the old `cody` pointer.

Use `$aipedia-tool-refresh-workflow` for the parallel batched tool refresh flow:

1. Save a 60-tool plan with `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`.
2. If using subagents, assign one worker per shard from `agent_briefs.worker_briefs`; each worker may edit only the tool markdown files listed in its shard, and launch at most six active workers at once.
3. The integrator reviews worker diffs, updates source registry rows, affected parent hubs, top-layer surfaces, and `PAGE_REFRESH_LEDGER.md` once.
4. Run `npm run tool:refresh:batch:check -- --plan <planner-json>` as the fast grouped gate.
5. Run one `npm run typecheck`, one `npm run build:fast`, and one combined `npm run qa:route`.

Do not return to one full build per tool unless a template, runtime, layout, generated asset, high-risk commercial claim, or isolated failure requires it.

## Active Work

### Oldest-First Tool Freshness

The Consensus, Beehiiv, BLACKBOX AI, Browserbase, Canva, Captions, Castmagic, Cline, CloudTalk, and CodeRabbit batch is verified locally. It updates:

- `src/content/categories/ai-research.md`
- `src/content/categories/ai-writing.md`
- `src/content/categories/ai-coding.md`
- `src/content/categories/ai-automation.md`
- `src/content/categories/ai-design.md`
- `src/content/categories/ai-image.md`
- `src/content/categories/ai-presentation.md`
- `src/content/categories/ai-video.md`
- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- `/tools/` and `/categories/` via ledger/build output

Next active batch:

- Regenerate the planner and skip same-day refreshed pages unless a newer request explicitly revisits them.
- Use six shard workers in the Codex Windows app, with up to 10 tool markdown files per worker. The previous one-tool-per-worker run hit the app's active-agent ceiling after six workers, so the workflow now scales by increasing each worker's shard size instead of increasing concurrent agents.

### Decision Content Flywheel

Recommended next comparison remains `amazon-q-vs-github-copilot`, but do not start it until the active freshness batch is closed or intentionally paused.

### Top-Layer Visual Uplift

Shared width and card-surface work is complete. Future visual work should inspect page-specific hierarchy and copy density for `/guides/`, `/news/`, `/answers/`, `/trends/`, `/workflows/`, and high-traffic detail templates.

## Current Verification Baseline

Latest completed 60-tool baseline refresh passed:

- `node --check scripts\tool-refresh-batch.mjs`
- `node --test tests\scripts\build-performance.test.mjs`
- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`
- `npm run typecheck`
- `npm run check:quick`
- `npm run build:fast`
- `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --widths 319,390,430,768,1024` across 80 routes: `/`, `/tools/`, `/categories/`, `/news/`, `/trends/`, `/trends/model-availability-churn/`, `/compare/`, all 60 refreshed tool routes, and affected category routes.
- `npm run ledger:pages:check`, `node scripts\guard-em-dashes.mjs`, `npm run audit:provenance:changed -- --json`, `npm run loop:freshness -- --json`, and `git diff --check` passed inside `tool:refresh:batch:check`.

The current planner still shows 0 due-now tool pages but many due-soon facts or sources. Because high-volatility pages can remain due-soon immediately after a refresh, use the current date and the ledger to avoid same-day duplicate refreshes. `build:fast` now takes roughly 65-70 seconds on the optimized path because it still prerenders hundreds of routes and runs guard, indexability, commercial CTA, sitemap, and budget checks. Pay that cost once per batch.

June 24 workflow profiling found the refresh closeout costs are now roughly: `tool:refresh:batch:check` 37 seconds for the 60-tool plan, `typecheck` 32 seconds, `check:quick` 22 seconds, `build:fast` 64 seconds end to end after content-cache optimization, and `qa:route` 107 seconds for 80 routes across 5 widths when using `--concurrency 4`. `scripts/build-fast.mjs` prints stage timings, `scripts/qa-route.mjs` supports `--base-url` plus `--concurrency`, `scripts/tool-refresh-batch.mjs` emits six shard-worker briefs with up to 10 tools per worker, and `scripts/tool-refresh-batch-check.mjs` can consume saved planner JSON with `--plan`.

Latest completed news refresh passed:

- `node scripts\guard-em-dashes.mjs`
- `npm run ledger:pages:check`
- `npm run check:news`
- `node scripts\audit-news-rendering.mjs --json`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /news/ --route / --route /news/2026-06-23-openai-daybreak-codex-security/ --route /news/2026-06-23-samsung-chatgpt-codex-enterprise/ --route /news/2026-06-23-claude-error-rate-fallback-planning/ --route /news/2026-06-24-zai-glm-52-open-model-pressure/ --route /news/2026-06-24-google-ai-talent-openai-anthropic/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`

Latest completed tool-page template migration passed:

- `npm run ledger:pages`
- `npm run typecheck`
- `npm run test:scripts`
- `npm run build:fast`
- `npm run smoke:visual`
- `npm run qa:route -- --route /tools/chatgpt/ --route /tools/claude/ --route /tools/cursor/ --route /tools/midjourney/ --route /tools/notion-ai/ --route /tools/watsonx-orchestrate/ --route /tools/ --route /compare/ --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `node scripts\guard-em-dashes.mjs`
- `git diff --check`

## Known Caveats

- Freshness is green for due-now items, but June 24 due-soon facts still need continued current-source review. The planner can repeat same-day refreshed tools because short review windows keep high-volatility facts near due, so skip same-day repeats or tune the planner before the next large run.
- Do not run `npm run typecheck` and `npm run build:fast` in parallel. Astro uses a shared local content data store under `node_modules/.astro`, and concurrent content sync can race. Run them sequentially.
- `node scripts/audit-site-kpis.mjs --json` still reports `neuronwriter-vs-surfer-seo` below the 700-word comparison KPI threshold. This is known improvement debt, not a failing loop signal.
- Full local verification remains reliable but should be centralized. Prefer 60-tool planner batches split across six shard workers, integrator-owned shared files, focused worker checks, `tool:refresh:batch:check -- --plan`, `check:smart`, one final `build:fast`, and exact `qa:route` with `--concurrency 4`. For editing loops, use `qa-route --base-url` against the running local server instead of rebuilding.
- `.agents/skills/aipedia-tool-refresh-workflow/` is local skill state and currently gitignored with `.agents/`. Keep improving it in this workspace; move the stable form into the loop registry only after repeated successful runs.
- Vercel CLI state has been inconsistent across sessions. If Vercel operations are needed, confirm with `vercel --version`; if missing, install with `npm i -g vercel`.
- `.agents/` and `skills-lock.json` are local agent/plugin state. They are gitignored and ignored by `check-smart` default untracked discovery.

## Start Next Session

1. Run `git status --short --branch`.
2. Read this file and `.agent/PLANS.md`.
3. Use `$aipedia-tool-refresh-workflow`, then run `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`.
4. Continue the next not-refreshed batch unless a newer user request supersedes it.

## Finish Major Work

1. Update `.agent/CURRENT_STATUS.md`.
2. Update `.agent/PLANS.md`.
3. Append `.agent/WORK_LOG.md`.
4. Add or update a receipt under `.agent/loop-runs/`.
5. Run the smallest valid verification gate and report what passed, what failed, and what remains.
