# AiPedia Active ExecPlans

Keep this file short. Archive completed detail under `.agent/archive/` or `.agent/loop-runs/` once final reports are written.

For current state, read `.agent/CURRENT_STATUS.md` first. For completed work, read only the newest relevant entries in `.agent/WORK_LOG.md`.

## Current Snapshot

- Last updated: 2026-06-29.
- Branch baseline: `master`; the Codex operating-system refactor was fast-forward merged from `agent-workflow-refactor-codex` at `0ff8fb6a`. An all-night agent-system improvement goal is active: use the new tools on real production routes, evaluate the outputs, patch scripts/docs/tests/workflows, verify, record memory, commit, push, and repeat. The first loop completed the June 29 news refresh pilot and uncovered fixes for static hub impact detection, non-ledger content-route resolution, inline news source accounting, and news-specific buyer-intent scoring. The second loop fixed score calibration for inline news sources, cleaned canonical machine-readable loop commands, and recorded a green 7 ok / 0 attention / 0 skipped broad loop receipt. The third loop created `/compare/amazon-q-vs-github-copilot/` from the `loop:next` recommendation and fixed comparison evidence extraction so `## Sources` section links count toward source coverage. The fourth loop fixed the coverage-quality npm-wrapper conflict when `--changed-file` is appended to `audit:coverage-quality:changed`. The fifth loop created `/compare/antigravity-vs-cursor/`, refreshed Antigravity, Cursor, AI Coding, top-layer, LLM, source-registry, and ledger surfaces, and repaired the `aipedia-news` registry date exposed by the changed Antigravity page. The sixth loop created `/compare/argil-vs-heygen/`, refreshed Argil, HeyGen, AI Video, top-layer, LLM, source-registry, and ledger surfaces, and repaired older AI Video visible-source registry dates exposed by the stricter guard. The seventh loop created `/compare/argil-vs-synthesia/`, refreshed Argil, Synthesia, AI Video, top-layer, LLM, source-registry, and ledger surfaces, and verified current official Argil/Synthesia source rows.
- Root project orientation cleanup is complete and pushed: `INDEX.md` is the canonical LLM-readable repo map, tracked specialists are under `.agent/specialists/`, `.agents/` remains local ignored runtime state, and `.Agents/` is retired.
- Daily news is the first editorial task each day. Use `workflows/news-refresh/README.md`, current-month source searches, and strict source-backed story selection before returning to affiliate or freshness batches. June 29 coverage is now complete with three source-backed stories, refreshed `/news/`, `/`, RSS, LLM surfaces, cumulative news OG assets, and ledger rows.
- June 28 tool expansion push is paused by user request after nine verified net-new batches. Resume net-new tool pages only after the daily news surface is current or the user explicitly resumes tool expansion.
- Latest affiliate slice is complete, verified, and pushed: `/guides/consensus-pricing-for-students-and-researchers/`, plus Consensus, academic citation and citation sibling guides, the researcher-tools guide, AI Research, top-layer, search, LLM, source registry, and ledger updates. This pass verifies the current Consensus Free, Pro, Deep, Teams, and Enterprise plan math, June 2026 Deep Search Library/Collections updates, and keeps the Perplexity Enterprise pricing raw-HTTP 403 as a browser-verified caveat in the related citations guide.
- The loop system is green: 7 ok / 0 attention / 0 skipped after a fresh build, and the Argil vs Synthesia comparison pilot passed memory recording, focused checks, guard, `typecheck`, `build:fast`, and route QA. Fresh recommendations are `blackbox-ai-vs-replit-agent` for decision content and Cline `best_for` freshness.
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
- The latest completed news pass is Jun 26-28 focused coverage with nine individual source-backed stories, three per date, and no daily desk page. It refreshed `/news/`, homepage news rail, RSS, LLM manifests, OG assets, ledger, and route QA for affected category hubs. Daily news should still be checked before continuing affiliate, page-refresh, tool-refresh, or visual work.
- Tool detail pages now use the decision-spine default in `src/layouts/ToolLayout.astro`; future tool migrations should preserve the short buyer path and keep proof and long review notes collapsed by default.
- The next freshness batch should be regenerated with `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`; the planner now excludes pages verified since yesterday by default unless `--include-same-day`, `--exclude-recent-days 0`, or an explicit `--exclude-verified-date` is passed.
- The `argil-vs-synthesia` Decision Content candidate has been built and locally verified as the seventh agent-system loop. After commit and push, continue with the fresh `blackbox-ai-vs-replit-agent` recommendation or the Cline freshness item unless a new loop run changes the ranking.
- Comparison pages must compare the same buyer job and workflow.
- Route QA for rendered work uses 360, 390, 430, 768, 1024, and 1366 px. Add 319 px for homepage, nav, card grids, or narrow-mobile risk. Add 346 px when reproducing in-app browser reports. Tool-refresh closeout now uses route QA concurrency 6 and writes per-route/per-width timing.
- June 24 workflow profiling found `build:fast` was the bottleneck at about 166.9 seconds end to end before optimization. Production-only content collection caching dropped `build:fast` to about 65 seconds end to end and Astro static prerender from about 2m 13s to about 37 seconds. The June 26 same-day revisit closeout shifted the bottleneck to route QA: closeout timing was ledger 0.6s, grouped check 25.4s, typecheck 16.3s, build:fast 16.4s, and route QA 126.3s at concurrency 4 for 75 routes across seven widths. Rerunning the same route matrix at concurrency 6 passed and wrote route timing in about 85.5s internal duration. Future refresh work should use six shard workers with up to 10 tools each, one integrator, generated worker prompts, the fast batch gate, dev-server route QA while editing, then one `build:fast` and concurrency-6 route QA at closeout.

## Completed: Agent Workflow Refactor Codex

### Objective

Create a practical, committed Codex operating system for AiPedia so future agents can choose workflows, gather evidence, use skills, validate work, and report results with less duplicated prompting and fewer factual risks.

### Scope

- Promote root `AGENTS.md` as the central instruction file.
- Add architecture audit, operating manual, task templates, report format, workflow docs, parallel tooling architecture, future Rust/CuPy roadmap, memory-system design, page-quality scoring design, and refactor report.
- Add twelve skills under `skills/` with schemas and examples.
- Add deterministic helper scripts for workflow mapping, skill validation, evidence bundles, parent-surface impact detection, read-only page quality scoring, score calibration, JSONL memory records, CPU lexical vector query, and Rust task-DAG planning.
- Keep public routes, content collections, affiliate links, generated assets, SEO metadata, and rendered site behavior unchanged.

### Status

Merged into `master` at `0ff8fb6a`. Initial operating-system layer was committed as `cd24fe19`; evidence, impact, scoring, calibration, memory JSONL, CPU vector query, and Rust task-DAG planning followed in `e5c7be24`, `e46839f9`, and `0ff8fb6a`. No rendered pages were changed.

### Closeout

- `npm run agent:skills:check`
- `npm --silent run agent:workflow:map -- --json`
- `node --check scripts/agent-workflow-map.mjs`
- `node --check scripts/check-agent-skills.mjs`
- `node --check scripts/agent-evidence-bundle.mjs`
- `node --check scripts/agent-parent-impact.mjs`
- `node --check scripts/agent-page-quality-score.mjs`
- `node --check scripts/agent-score-calibration.mjs`
- `node --check scripts/agent-memory-record.mjs`
- `node --check scripts/agent-memory-query.mjs`
- `node --check scripts/lib/agent-cpu-vector.mjs`
- `npm exec --yes --package=node@24 -- node --test tests/scripts/agent-workflow-tools.test.mjs`
- `npm exec --yes --package=node@24 -- node --test tests/scripts/agent-workflow-tools.test.mjs tests/scripts/agent-memory-tools.test.mjs`
- `npm --silent run agent:evidence -- --route /tools/cursor/ --current-date 2026-06-29 --json`
- `npm --silent run agent:impact -- --route /tools/cursor/ --json`
- `npm --silent run agent:score -- --route /tools/cursor/ --current-date 2026-06-29 --json`
- `npm --silent run agent:memory:record -- --route /tools/cursor/ --route /compare/gemini-vs-grok/ --current-date 2026-06-29 --out local/tmp/agent-memory-real-routes.jsonl --json`
- `npm --silent run agent:memory:query -- --memory local/tmp/agent-memory-real-routes.jsonl --query "pricing source coverage comparison" --json`
- `npm --silent run agent:score:calibrate -- --current-date 2026-06-29 --json`
- `npm --silent run runner:agent-plan -- --route /tools/cursor/ --current-date 2026-06-29 --out local/tmp/aipedia-runner/agent-dag/cursor-task-graph.json`
- `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`
- `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`
- `npm run audit:commands`
- `npm run check:quick`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`

## Active: June 28 Tool Expansion Day

### Objective

Continuously expand AiPedia with new, current, source-backed AI tool pages, starting with developer infrastructure and agent automation tools before moving to the next highest-value queue.

### Completed Batches

- Batch 01: Firecrawl, Composio, Dify, and Flowise are added and locally verified.
- Batch 02: LangSmith, Tavily, Pydantic AI, and Mem0 are added and locally verified.
- Batch 03: Braintrust, Portkey, Zep, and promptfoo are added and locally verified.
- Batch 04: Arize Phoenix, Ragas, OpenPipe, and LangWatch are added and locally verified.
- Batch 05: Patronus AI, DeepEval, Traceloop, and BAML are added and locally verified.
- Batch 06: LiteLLM, LlamaIndex, Haystack, and DSPy are added and locally verified.
- Batch 07: Respan, Agno, Instructor, and Chainlit are added and locally verified.
- Batch 08: OpenLIT, Opik, Mirascope, and Outlines are added and locally verified.
- Batch 09: Inspect AI, OpenAI Evals, Guardrails AI, and LM Evaluation Harness are added and locally verified.
- Shared scope: tool markdown, primary source rows, tool registry metadata, logos, OG cards, category context, top-layer refresh metadata, LLM/search surfaces, and ledger rows.
- Source handling: official pricing, docs, repository, and product pages were checked with June 2026 source searches. Checkout-gated, region-rendered, mismatched, or unpublished plan claims are visible caveats instead of hard assertions.

### Next Batch

- Continue selecting net-new tools with buyer or builder value that are missing from `src/content/tools/`.
- Prioritize agent infrastructure, evals/observability, retrieval, memory, workflow automation, and high-intent creator/business tools.
- Before editing, verify candidate absence with `rg --files src/content/tools | rg '<slug>'`, then verify current facts from official June 2026 sources.

### Required Closeout

- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file <new-tool-file>` for each new tool page.
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run guard:check`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run build:fast`
- Route QA at 319, 360, 390, 430, 768, 1024, and 1366 px for the new tools plus affected category, catalog, homepage, and LLM/search surfaces.

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
- Configured affiliate-link tools: 25.
- Live-approved affiliate tools: 21.
- Configured but not live-approved: 4.
- First-pass scripted page budget: 103 pages, counting existing pages toward coverage when they already match a distinct buyer intent.
- Existing money-guide metadata backfill is complete and subagent-accepted at 9.9/10: 35 money guides, 0 hard errors, 0 warnings under strict audit after adding the structured conversion, anti-doorway, and CTA-plan contract.
- First new page slice is complete and pushed: `/guides/dext-pricing-for-bookkeeping-firms/` adds a Dext Practice vs Dext Business plan-decision page, updates AI Automation routing, and brought strict affiliate audit to 36 money guides with 0 errors and 0 warnings.
- Second Dext page slice is complete and pushed: `/guides/dext-vs-hubdoc-for-bookkeepers/` adds the same-job switcher for Dext vs Hubdoc, updates sibling Dext/receipt guides, updates AI Automation routing, and brings strict affiliate audit to 37 money guides with 0 errors and 0 warnings. The rendered budget pick is external non-affiliate Hubdoc, not Dext.
- Third Dext page slice is complete and pushed: `/guides/dext-vs-autoentry-for-sage-bookkeepers/` adds the Sage-heavy same-job switcher for Dext vs AutoEntry, updates sibling Dext/receipt guides, AI Automation, the Dext tool page, accountant stack, and the shared mobile sticky CTA containment.
- Fourth distinct Dext cluster slice is locally verified and subagent-accepted at 9.9/10: `/guides/best-client-document-collection-tool-for-bookkeeping-firms/` adds the client document collection workflow page for multi-client bookkeeping firms, updates sibling Dext guides, AI Automation, the Dext tool page, accountant stack, and the ledger. Strict affiliate audit reports 39 money guides with 0 errors and 0 warnings.
- Latest Consensus page slice is complete, verified, and pushed: `/guides/consensus-pricing-for-students-and-researchers/` adds the Free, Pro, Deep, Teams, and Enterprise plan-decision page, updates Consensus, academic citation and citation sibling guides, the researcher-tools guide, AI Research, top-layer surfaces, source registry, and ledger. Strict affiliate audit reports 50 money guides with 0 errors and 0 warnings.
- Previous Gamma page slice is verified: `/guides/gamma-pricing-for-founders-and-consultants/` adds the Free, Plus, Pro, and Ultra plan-decision page, updates Gamma, presentation and consultant sibling guides, AI Presentation, top-layer surfaces, source registry, and ledger. Strict affiliate audit reported 48 money guides with 0 errors and 0 warnings.

### Page System

Use the existing `use-cases` guide route first unless a page clearly needs a new collection. Prioritize five archetypes only when distinct intent exists: specific ICP winner, workflow stack, same-job switcher, plan decision, and adjacent same-job comparison.

### Next Implementation Slice

1. Rerun `npm run affiliate:conversion:plan -- --limit 12 --json` and move to the next highest-fit approved affiliate tool, likely QuillBot, Beautiful.ai, Lindy, OmniSEO, Hume AI, or a distinct Argil follow-up unless the planner changes.
2. Repair approval metadata or defer monetization for configured-but-not-live tools.
3. Repeat the pattern across the highest-fit approved affiliate tools from `npm run affiliate:conversion:inventory`, using existing guides as coverage where they already satisfy a distinct buyer intent.
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
- `npm --silent run loop:all -- --json`
- `npm --silent run loop:all:record -- --json`
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
