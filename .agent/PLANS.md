# AiPedia Active ExecPlans

Keep this file short. Archive completed detail under `.agent/archive/` or `.agent/loop-runs/` once final reports are written.

For current state, read `.agent/CURRENT_STATUS.md` first. For completed work, read only the newest relevant entries in `.agent/WORK_LOG.md`.

## Current Snapshot

- Last updated: 2026-06-27.
- Branch baseline: `master`; active goal is the June 27 strict 3-day whole-site refresh target. Latest local content batch is the final six tool refresh. Latest workflow improvement is bounded page source-health timing, report-schema hardening, and company-prose overflow containment.
- New active goal: affiliate conversion page buildout for every tool with a configured affiliate link. Use `npm run affiliate:conversion:inventory` as the current source-of-truth inventory and `workflows/affiliate-conversion-pages/README.md` as the operating procedure.
- The loop system is green: 7 ok / 0 attention / 0 skipped after a fresh build.
- The active site-freshness lane uses 60-tool planner batches split across six shard workers, up to 10 tool files per worker, not one full build per tool.
- `workflows/tool-refresh/` now holds the committed six-shard-worker plus integrator process. `$aipedia-tool-refresh-workflow` remains the local skill mirror. Use six active workers in the Codex Windows app, and promote stable behavior into `src/data/aipedia-loops.json` only after the workflow proves stable through repeated use.
- The latest local batch refreshed 60 tools from Consensus through Kling after using `--include-same-day` intentionally because the default planner had no due tools.
- A first runnable non-tool page-refresh workflow now exists under `workflows/page-refresh/`, backed by `npm run runner:page-refresh:plan`, `npm run runner:page-refresh:reports`, and `npm run runner:page-refresh:closeout`. The Rust runner wraps the Node planner, writes worker prompts and report scaffolds, separates standard content route QA from intentional noindex interactive route QA, aggregates worker reports, times closeout gates, and writes receipts.
- The first live non-tool page-refresh batch is complete and pushed. It refreshed 12 routes, recorded worker and closeout timings, and hardened the workflow with prompt-file output, explicit current-date coverage-quality audits, route-QA policy mapping, parseable worker report artifacts, and Rust runner orchestration.
- Non-tool page-refresh batch 02 is pushed. It refreshed 12 comparison and guide routes, updated affected compare/guides/category parent surfaces, parsed 3/3 worker reports, and passed closeout in 51.528s.
- The latest page-refresh workflow optimizations add explicit route QA policy classes, report-level efficiency metrics, and bounded concurrent source health. The planner now marks archived noindex content routes as content/frontmatter verification only, not indexable route-QA targets. The Rust report summary now shows pages/minute, sources/page, caveats/page, confidence labels/page, failed checks, and parent-surface hints. `runner:page-refresh:closeout` now runs `npm run page:source-health` before typecheck unless explicitly skipped for workflow testing.
- Non-tool page-refresh batch 03 is verified. It refreshed 18 guide routes from academic writing through LinkedIn, updated affected guide/category/answer parent surfaces, parsed 6/6 worker reports, and passed closeout in 62.57s wall time.
- A source-health smoke over the next two planned pages checked 21 source URLs in 5.211s with bounded concurrency and flagged one existing 404 on `/guides/best-ai-for-logo-design/`: `https://www.canva.com/logo-maker/`.
- Non-tool page-refresh batch 12 is pushed. It refreshed the final 18 non-tool stale routes, updated affected parent/top-layer pages and category hubs, replaced a slow Adobe source with the current Firefly plans and credits page, passed timed closeout in 76.818s, and reduced the strict 3-day stale count from 24 to 6 tracked pages, all tools.
- Final six tool refresh is verified locally. It refreshed `phind`, `tome`, `semrush-demo`, `dalle`, `dext`, and `grok-code-fast`, updated affected parent/top-layer surfaces and source registry rows, passed runner closeout in 51.520s, and reduced the strict 3-day stale count from 6 to 0.
- The latest completed large batch refreshed 60 tools: Cody, Comet, Continue, Copy.ai, CrewAI, D-ID, Hedra, Lindy, Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, Qodo, Replit Agent, Claude, Decktopus, Gemini, Grok, n8n, Claude Code, GitHub Copilot, Grammarly, Mistral AI, Qwen, Capacities, Cursor, Hailuo, HeyGen, Adobe Firefly, Argil, Augment Code, Base44, Dia, Figma, ChatGPT, DeepSeek, MeetGeek, ElevenLabs, Elicit, Voxtral, Windsurf, Codeium, Descript, Perplexity, Kling, Runway, Seedance, Veo, Suno, Synthesia, Udio, Bolt, Lovable, Mubert, Pika, v0, LangGraph, MiniMax, Pipedream, and Lovart.
- The latest completed news pass is Jun 24-25 focused coverage with four additional individual source-backed stories and no daily desk page.
- Tool detail pages now use the decision-spine default in `src/layouts/ToolLayout.astro`; future tool migrations should preserve the short buyer path and keep proof and long review notes collapsed by default.
- The next freshness batch should be regenerated with `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`; the planner now excludes pages verified since yesterday by default unless `--include-same-day`, `--exclude-recent-days 0`, or an explicit `--exclude-verified-date` is passed.
- The next Decision Content candidate remains `amazon-q-vs-github-copilot`, but freshness batch work is currently in progress.
- Comparison pages must compare the same buyer job and workflow.
- Route QA for rendered work uses 360, 390, 430, 768, 1024, and 1366 px. Add 319 px for homepage, nav, card grids, or narrow-mobile risk. Add 346 px when reproducing in-app browser reports. Tool-refresh closeout now uses route QA concurrency 6 and writes per-route/per-width timing.
- June 24 workflow profiling found `build:fast` was the bottleneck at about 166.9 seconds end to end before optimization. Production-only content collection caching dropped `build:fast` to about 65 seconds end to end and Astro static prerender from about 2m 13s to about 37 seconds. The June 26 same-day revisit closeout shifted the bottleneck to route QA: closeout timing was ledger 0.6s, grouped check 25.4s, typecheck 16.3s, build:fast 16.4s, and route QA 126.3s at concurrency 4 for 75 routes across seven widths. Rerunning the same route matrix at concurrency 6 passed and wrote route timing in about 85.5s internal duration. Future refresh work should use six shard workers with up to 10 tools each, one integrator, generated worker prompts, the fast batch gate, dev-server route QA while editing, then one `build:fast` and concurrency-6 route QA at closeout.

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
- Third six-worker June 25 batch: Zapier, Sudowrite, Writesonic, Pitch, Gamma, Fish Audio, QuillBot, Murf, Resemble AI, Stable Diffusion, WellSaid, Freepik, You.com, Kagi, Scite, Semantic Scholar, Kimi, Langfuse, Leonardo, Letta, Llama, LM Studio, Logseq, Mem, Morphic, Ollama, Open WebUI, Paradox, Reflect, Reka, Replicate, Riverside, SaneBox, Spellbook, Stable Audio, Tactiq, Writer, Rows, Voiceflow, Tripo3D, TypingMind, Uizard, Unbounce, watsonx Orchestrate, Weaviate, Whisper, Workato, Yi, Antigravity, Cohere, GPT Image 2, OpenClaw, Hermes Agent, and Jan.ai.

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

The current verified local batch refreshed `consensus` through `kling` from `.tmp-tool-refresh-batch.json` with six workers and one in-thread Captions fix. Recompute after this batch is pushed before selecting the next shard.

Required closeout:

- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --plan <saved-planner-json>`
- `npm run typecheck`
- `npm run build:fast`
- `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 6 --route <changed-tool-and-parent-routes> --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366`

Latest closeout notes:

- Run `npm run ledger:pages && npm run ledger:pages:check` immediately after integrator-owned hub edits. The combined batch checker is still the canonical gate, but prechecking the ledger avoids a slow failed pass.
- Keep `typecheck` before `build:fast`. It caught a YAML scalar issue in `claude-design.md` that the page-quality and provenance audits did not catch.
- Keep source registry and category hubs integrator-owned. The workers were most effective when limited to 10 tool markdown files each and asked to report source-registry rows instead of editing shared files.
- `tool:refresh:batch:check` now runs `scripts/check-frontmatter.mjs --changed` so malformed markdown frontmatter is caught before the slower Astro typecheck/build phase.
- Generated worker prompts now require source-confidence labels for constrained facts: `primary-confirmed`, `primary-conflict`, `account-gated`, `checkout-gated`, `region-rendered`, `blocked-live-check`, and `secondary-only`.
- Rust runner commands are available for the next batch: use `npm run runner:tool-refresh:plan` to prepare local planner artifacts and worker prompts, then `npm run runner:tool-refresh:closeout` after integration to run the closeout sequence and write a local receipt.
- Prefer generated worker prompts verbatim. A hand-transcribed worker prompt in the June 26 run skipped `captions.md` and briefly assigned two wrong filenames; integration caught and fixed it, but the avoidable miss cost time.
- The third six-worker batch needed a planner-route correction after watsonx Orchestrate moved from invalid `ai-enterprise` back to `ai-automation`; if a worker changes a tool's primary category, update `.tmp-tool-refresh-batch.json` and `.tmp-route-qa-args.txt` before route QA.

## Active: Non-Tool Page Refresh Workflow

### Objective

Refresh the stale non-tool site surface with the same repeatable, timed, shardable discipline now used for tool pages, without mixing tool-page edits into this lane.

### Current Command

```bash
npm run runner:page-refresh:plan
npm run runner:page-refresh:reports
npm run runner:page-refresh:closeout
```

For raw Node planner debugging only:

```bash
npm run --silent page:refresh:batch -- --limit 60 --max-workers 6 --pages-per-worker 10 --write-agent-prompts local/tmp/page-refresh-prompts --report-dir local/tmp/page-refresh-reports --write-report-scaffolds --json > .tmp-page-refresh-batch.json
```

The runner reads `PAGE_REFRESH_LEDGER.md` through the Node planner, excludes tool pages by default, emits worker prompts, emits one integrator prompt, writes worker JSON report scaffolds, splits route QA by route policy, aggregates worker reports, runs bounded source health, and emits receipts with micro-step timing.

### First Queue Sample

Batch 01 refreshed `/terms/`, `/disclosure/`, `/reports/`, `/answers/best-ai-for-students/`, `/answers/best-ai-for-writing-2026/`, `/answers/best-ai-video-generator-2026/`, `/answers/best-ai-voice-generator-2026/`, `/compare/build/`, `/dead/`, `/compare/elevenlabs-vs-murf/`, `/compare/elevenlabs-vs-wellsaid/`, and `/compare/frase-vs-marketmuse/`.

### Latest Completed Batch

Batch 02 refreshed:

- `/compare/frase-vs-neuronwriter/`
- `/compare/frase-vs-surfer-seo/`
- `/compare/gamma-vs-pitch/`
- `/compare/gamma-vs-presentations-ai/`
- `/compare/gemini-vs-grok/`
- `/compare/pitch-vs-presentations-ai/`
- `/guides/ai-content-creator-stack/`
- `/guides/ai-content-pipeline/`
- `/guides/ai-customer-support/`
- `/guides/ai-lead-generation/`
- `/guides/best-ai-calendar-for-google-workspace-power-users/`
- `/guides/best-ai-email-triage-for-heavy-inboxes/`

Closeout passed with 3/3 worker reports parsed, 89 source URLs, 51 confidence labels, 29 caveats, 75 parent notes, and 18 indexable routes checked at seven widths. The archived noindex guide routes were content-refreshed and frontmatter-checked, then excluded from indexable route QA by policy.

### Batch 03 Complete

- Started: 2026-06-26.
- Scope: 18 oldest non-tool guide routes from `/guides/best-ai-for-academic-writing/` through `/guides/best-ai-for-linkedin/`.
- Planner: `npm run runner:page-refresh:plan -- --limit 18 --workers 6 --pages-per-worker 3`.
- Timing baseline: planner wall time 0.73s.
- QA policy mix: 17 `indexable-buyer` guide routes and 1 `archived-noindex` guide route.
- Integration: refreshed the guide pages, updated affected guide/category/answer/top-layer surfaces, regenerated `PAGE_REFRESH_LEDGER.md`, wrote worker reports, ran `runner:page-refresh:reports`, and ran timed `runner:page-refresh:closeout`.
- Timing: worker reports parsed 6/6 with 99.78 reported worker seconds, 175 source URLs, 35 confidence labels, 21 caveats, 41 parent notes, and 0 failed worker checks. Closeout passed in 62.57s wall time: cheap gates 2.375s, typecheck 14.284s, build:fast 16.124s, and route QA 29.443s for 24 indexable routes across seven widths.
- Durable receipt: `.agent/loop-runs/2026-06-26-page-refresh-batch-03.md`.
- Optimization target met: the bounded concurrent source-health helper is implemented and the report scaffold now documents `checks` as `command`, `status`, and `notes`. Before scaling beyond 18 pages, fix the `/guides/best-ai-for-logo-design/` Canva Logo Maker 404 found by the smoke run, then keep source health enabled in closeout.

### Next

The strict 3-day target is complete locally across tracked tool and non-tool pages. Commit, push, then recompute the next queue from a fresh ledger snapshot before starting another content cycle.

## Active: Decision Content Flywheel

### Objective

Run AiPedia as a repeatable buyer-decision loop: cluster, verify, improve decision page, update hubs, check, record, repeat.

## Active: Affiliate Conversion Page Buildout

### Objective

Create source-backed, mobile-first conversion pages around every tool with a configured affiliate link, while preserving AiPedia trust, avoiding thin doorway pages, and maximizing honest clicks/signups from June 2026 buyer intent.

### Current Inventory

- Source-of-truth command: `npm run affiliate:conversion:inventory`.
- Money-guide audit command: `npm run audit:affiliate-conversion`.
- Configured affiliate-link tools: 26.
- Live-approved affiliate tools: 22.
- Configured but not live-approved: 4.
- First-pass scripted page budget: 108 pages, counting existing pages toward coverage when they already match a distinct buyer intent.
- Existing money-guide audit baseline: 35 money guides, 0 hard errors, 245 warnings for missing new structured metadata fields.

### Page System

Use the existing `use-cases` guide route first unless a page clearly needs a new collection. Prioritize five archetypes only when distinct intent exists: specific ICP winner, workflow stack, same-job switcher, plan decision, and adjacent same-job comparison.

### Next Implementation Slice

1. Run the inventory and split tools into page batches by category and existing coverage.
2. Repair approval metadata or defer monetization for configured-but-not-live tools.
3. Implement the first five-page cluster for one approved tool with strong fit and existing source coverage.
4. Add subagent review before finalizing the cluster: SEO/quality, visual/mobile, and accuracy.
5. Update parent hubs, ledger, source registry, sitemap/LLM surfaces, and route QA before publishing.

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
