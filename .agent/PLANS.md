# AiPedia Active ExecPlans

Keep this file short. Archive completed detail under `.agent/archive/` or `.agent/loop-runs/` once final reports are written.

For current state, read `.agent/CURRENT_STATUS.md` first. For completed work, read only the newest relevant entries in `.agent/WORK_LOG.md`.

## Current Snapshot

- Last updated: 2026-06-25.
- Branch baseline: `codex/refresh-tool-pages-june-23`; latest completed local tool batch is the June 25 four-tool serial shard for Pinecone, PixVerse, Playground AI, and Qdrant.
- The loop system is green: 7 ok / 0 attention / 0 skipped after a fresh build.
- The active site-freshness lane uses 60-tool planner batches split across six shard workers, up to 10 tool files per worker, not one full build per tool.
- `workflows/tool-refresh/` now holds the committed six-shard-worker plus integrator process. `$aipedia-tool-refresh-workflow` remains the local skill mirror. Use six active workers in the Codex Windows app, and promote stable behavior into `src/data/aipedia-loops.json` only after the workflow proves stable through repeated use.
- The latest completed local batch refreshed Pinecone, PixVerse, Playground AI, and Qdrant after the Luma/Magnific/Meshy/OpusClip shard.
- The latest completed large batch refreshed 60 tools: Cody, Comet, Continue, Copy.ai, CrewAI, D-ID, Hedra, Lindy, Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, Qodo, Replit Agent, Claude, Decktopus, Gemini, Grok, n8n, Claude Code, GitHub Copilot, Grammarly, Mistral AI, Qwen, Capacities, Cursor, Hailuo, HeyGen, Adobe Firefly, Argil, Augment Code, Base44, Dia, Figma, ChatGPT, DeepSeek, MeetGeek, ElevenLabs, Elicit, Voxtral, Windsurf, Codeium, Descript, Perplexity, Kling, Runway, Seedance, Veo, Suno, Synthesia, Udio, Bolt, Lovable, Mubert, Pika, v0, LangGraph, MiniMax, Pipedream, and Lovart.
- The latest completed news pass is Jun 24-25 focused coverage with four additional individual source-backed stories and no daily desk page.
- Tool detail pages now use the decision-spine default in `src/layouts/ToolLayout.astro`; future tool migrations should preserve the short buyer path and keep proof and long review notes collapsed by default.
- The next freshness batch should be regenerated with `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`; the planner now excludes pages verified since yesterday by default unless `--include-same-day`, `--exclude-recent-days 0`, or an explicit `--exclude-verified-date` is passed.
- The next Decision Content candidate remains `amazon-q-vs-github-copilot`, but freshness batch work is currently in progress.
- Comparison pages must compare the same buyer job and workflow.
- Route QA for rendered work uses 360, 390, 430, 768, 1024, and 1366 px. Add 319 px for homepage, nav, card grids, or narrow-mobile risk. Add 346 px when reproducing in-app browser reports.
- June 24 workflow profiling found `build:fast` was the bottleneck at about 166.9 seconds end to end before optimization. Production-only content collection caching dropped `build:fast` to about 65 seconds end to end and Astro static prerender from about 2m 13s to about 37 seconds. The first full 60-tool run took 36m 55s through the main route QA, and 41m 31s including documentation, supplemental route QA, and final sanity checks. Core timing was 25m 07s worker collection and 11m 48s integration plus verification. Closeout timings were ledger 2s, `tool:refresh:batch:check` 37s, `typecheck` 32s, `check:quick` 22s, `build:fast` 64s, main route QA 107s for 80 routes across five widths, and supplemental route QA 4s. Future refresh work should use six shard workers with up to 10 tools each, one integrator, the fast batch gate, dev-server route QA while editing, then one `build:fast` at closeout.

## Active: June 24 Site Freshness Baseline Goal

### Objective

Keep every volatile tool fact, source-backed claim, commercial surface, affected parent hub, and crawl surface fresh for the June 24, 2026 refresh window, or document any remaining item as future queue work.

### Completed

- Presentations.AI and MiniMax.
- Claude and Claude Code.
- June 18-22 news and lantern logo hotfix.
- Homepage evidence, portal, verified-panel, copy-density, and decision-card spacing fixes.
- Top-layer visual width and detail-page width parity.
- Gemini, GitHub Copilot, Grammarly.
- Qwen, Hailuo, HeyGen, Adobe Firefly.
- Augment Code, Base44, BLACKBOX AI, Captions.ai, Cline.
- Batched refresh planner and fast batch check command.
- CodeRabbit, Cody, Comet, D-ID, and Hedra.
- Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, and Qodo.
- Capacities, Beehiiv, Browserbase, Castmagic, and CloudTalk.
- Grok, Cursor, Lindy, n8n, and Mistral AI.
- Argil, Canva, Replit Agent, Claude, and Gemini.
- Claude, Decktopus, Gemini, Grok, and n8n.
- Claude Code, GitHub Copilot, Grammarly, Mistral AI, and Qwen.
- MiniMax Speech, Modal, Morphic, Mubert, and Murf.
- NanoChat, Napkin AI, NeuronWriter, NightCafe, and Notion AI.
- Consensus, Beehiiv, BLACKBOX AI, Browserbase, Canva, Captions, Castmagic, Cline, CloudTalk, and CodeRabbit.
- Jun 23-24 focused news coverage: OpenAI Daybreak/Codex Security, Samsung ChatGPT Enterprise and Codex, Claude reliability incidents, GLM-5.2 open-model pressure, and Google AI talent movement.
- Shared tool-page decision-spine migration across all tool detail routes.
- Six-shard 60-tool baseline run: Cody, Comet, Continue, Copy.ai, CrewAI, D-ID, Hedra, Lindy, Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, Qodo, Replit Agent, Claude, Decktopus, Gemini, Grok, n8n, Claude Code, GitHub Copilot, Grammarly, Mistral AI, Qwen, Capacities, Cursor, Hailuo, HeyGen, Adobe Firefly, Argil, Augment Code, Base44, Dia, Figma, ChatGPT, DeepSeek, MeetGeek, ElevenLabs, Elicit, Voxtral, Windsurf, Codeium, Descript, Perplexity, Kling, Runway, Seedance, Veo, Suno, Synthesia, Udio, Bolt, Lovable, Mubert, Pika, v0, LangGraph, MiniMax, Pipedream, and Lovart.
- Jun 24-25 news catch-up, planner recent-refresh exclusion, Consensus schedule metadata, and replacement source URLs for MiniMax Speech and Instantly Lead Finder.
- Luma, Magnific, Meshy, and OpusClip June 25 serial shard, including Meshy's updated Pro/Premium/Ultra/Studio ladder and Magnific API pay-per-usage discontinuation caveat.

- Pinecone, PixVerse, Playground AI, and Qdrant June 25 serial shard, including PixVerse Upscale changelog coverage and the Qdrant v1.18.2 release-date correction.

### Latest Completed Batch

Completed batch:

- 60 tool markdown files from `.tmp-tool-refresh-batch.json`, covering the six shard groups from Cody through Lovart.

Affected parent hubs:

- `src/content/categories/ai-research.md`
- `src/content/categories/ai-writing.md`
- `src/content/categories/ai-coding.md`
- `src/content/categories/ai-automation.md`
- `src/content/categories/ai-design.md`
- `src/content/categories/ai-image.md`
- `src/content/categories/ai-presentation.md`
- `src/content/categories/ai-video.md`
- `src/content/categories/ai-chatbots.md`
- `src/content/categories/ai-infrastructure.md`
- `src/content/categories/ai-music.md`
- `src/content/categories/ai-notes.md`
- `src/content/categories/ai-search.md`
- `src/content/categories/ai-voice.md`

Required closeout:

- `npm run ledger:pages` done locally.
- `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json` passed.
- `npm run typecheck` passed.
- `npm run check:quick` passed.
- `npm run build:fast` passed.
- `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --widths 319,390,430,768,1024` passed across 80 routes and 400 rendered width checks.
- `npm run ledger:pages:check`, `node scripts\guard-em-dashes.mjs`, `npm run audit:provenance:changed -- --json`, `npm run loop:freshness -- --json`, and `git diff --check` passed inside batch gate.

Run `typecheck` and `build:fast` sequentially. They both sync Astro content, and running them in parallel can race on `node_modules/.astro/data-store.json`.

### Next Batch

Regenerate the next due-soon batch from `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`. The planner excludes pages verified since yesterday by default; pass `--include-same-day`, `--exclude-recent-days 0`, or an explicit `--exclude-verified-date` only for intentional recent-page revisits.

The current verified batch refreshed `tabnine` through `wordtune` from `.tmp-tool-refresh-batch.json` with six workers. Recompute after this batch is pushed before selecting the next shard.

Required closeout:

- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --plan <saved-planner-json>`
- `npm run typecheck`
- `npm run build:fast`
- `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --route <changed-tool-and-parent-routes> --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366`

Latest closeout notes:

- Run `npm run ledger:pages && npm run ledger:pages:check` immediately after integrator-owned hub edits. The combined batch checker is still the canonical gate, but prechecking the ledger avoids a slow failed pass.
- Keep `typecheck` before `build:fast`. It caught a YAML scalar issue in `claude-design.md` that the page-quality and provenance audits did not catch.
- Keep source registry and category hubs integrator-owned. The workers were most effective when limited to 10 tool markdown files each and asked to report source-registry rows instead of editing shared files.
- `tool:refresh:batch:check` now runs `scripts/check-frontmatter.mjs --changed` so malformed markdown frontmatter is caught before the slower Astro typecheck/build phase.
- Generated worker prompts now require source-confidence labels for constrained facts: `primary-confirmed`, `primary-conflict`, `account-gated`, `checkout-gated`, `region-rendered`, `blocked-live-check`, and `secondary-only`.

## Active: Decision Content Flywheel

### Objective

Run AiPedia as a repeatable buyer-decision loop: cluster, verify, improve decision page, update hubs, check, record, repeat.

### Next Candidate

`amazon-q-vs-github-copilot`

Start only after the active freshness batch is complete or paused safely.

### Commands

- `npm run loop:next -- --json`
- `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>`
- `npm run loop:record -- --date <YYYY-MM-DD> --slug <slug> --status complete`

## Active: Multi-Loop System

### Objective

Use the loop system as a queue and attention signal, not as bureaucracy.

### Commands

- `npm run loop:system`
- `npm run loop:all -- --json`
- `npm run loop:all:record -- --json`
- `npm run loop:freshness -- --json`
- `npm run loop:decision -- --json`
- `npm run loop:trust -- --json`
- `npm run loop:conversion -- --json`
- `npm run loop:quality -- --json`
- `npm run loop:performance -- --json`
- `npm run loop:news -- --json`

Run `loop:all:record` only after meaningful broad reviews, not after every small check.

## Active: Top-Layer Visual Uplift

### Status

Shared width, card polish, filter containment, breadcrumb geometry, detail-page width parity, and the tool-page decision-spine migration are complete.

### Remaining

Inspect and tune page-specific hierarchy and copy density for:

- `/guides/`
- `/news/`
- `/answers/`
- `/trends/`
- `/workflows/`
- High-traffic detail templates

Do this after the active freshness batch unless the user asks for visual work first.

## Planned: Phase 3 Parallel Surface Agent Orchestration

Planned but not active. Recompute missed news dates and verify current sources before assigning public content updates.
