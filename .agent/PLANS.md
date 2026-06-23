# AiPedia Active ExecPlans

Keep this file short. Archive completed detail under `.agent/archive/` or `.agent/loop-runs/` once final reports are written.

For current state, read `.agent/CURRENT_STATUS.md` first. For completed work, read only the newest relevant entries in `.agent/WORK_LOG.md`.

## Current Snapshot

- Last updated: 2026-06-23.
- Branch baseline: `master`; latest completed batch is MiniMax Speech, Modal, Morphic, Mubert, and Murf.
- The loop system is green: 7 ok / 0 attention / 0 skipped after a fresh build.
- The active site-freshness lane uses batched tool refreshes, not one full build per tool.
- The latest completed local batch is `minimax-speech`, `modal`, `morphic`, `mubert`, and `murf`.
- The latest completed freshness batch is `minimax-speech`, `modal`, `morphic`, `mubert`, and `murf`.
- The next freshness batch is `nanochat`, `napkin-ai`, `neuronwriter`, `nightcafe`, and `notion-ai`.
- The next Decision Content candidate remains `amazon-q-vs-github-copilot`, but freshness batch work is currently in progress.
- Comparison pages must compare the same buyer job and workflow.
- Route QA for rendered work uses 360, 390, 430, 768, 1024, and 1366 px. Add 319 px for homepage, nav, card grids, or narrow-mobile risk. Add 346 px when reproducing in-app browser reports.

## Active: June 21 To June 22 Site Freshness Goal

### Objective

Keep every volatile tool fact, source-backed claim, commercial surface, affected parent hub, and crawl surface fresh for the June 21-22, 2026 refresh window, or document any remaining item as future queue work.

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

### Latest Completed Batch

Completed batch:

- `src/content/tools/minimax-speech.md`
- `src/content/tools/modal.md`
- `src/content/tools/morphic.md`
- `src/content/tools/mubert.md`
- `src/content/tools/murf.md`

Affected parent hubs:

- `src/content/categories/ai-voice.md`
- `src/content/categories/ai-infrastructure.md`
- `src/content/categories/ai-coding.md`
- `src/content/categories/ai-automation.md`
- `src/content/categories/ai-search.md`
- `src/content/categories/ai-chatbots.md`
- `src/content/categories/ai-music.md`
- `src/content/use-cases/best-ai-voice-youtube.md`
- `src/content/use-cases/best-ai-music-generator.md`
- `src/content/use-cases/suno-alternatives.md`

Required closeout:

- `npm run ledger:pages` done locally.
- `npm run tool:refresh:batch:check -- --file src\content\tools\minimax-speech.md --file src\content\tools\modal.md --file src\content\tools\morphic.md --file src\content\tools\mubert.md --file src\content\tools\murf.md` passed.
- `npm run typecheck` passed.
- `npm run build:fast` passed.
- `npm run qa:route -- --route /tools/minimax-speech/ --route /tools/modal/ --route /tools/morphic/ --route /tools/mubert/ --route /tools/murf/ --route /categories/ai-voice/ --route /categories/ai-infrastructure/ --route /categories/ai-coding/ --route /categories/ai-automation/ --route /categories/ai-search/ --route /categories/ai-chatbots/ --route /categories/ai-music/ --route /guides/best-ai-voice-youtube/ --route /guides/best-ai-music-generator/ --route /guides/suno-alternatives/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client` passed.
- `npm run ledger:pages:check`, `node scripts\guard-em-dashes.mjs`, and `git diff --check` passed inside batch gate.

Run `typecheck` and `build:fast` sequentially. They both sync Astro content, and running them in parallel can race on `node_modules/.astro/data-store.json`.

### Next Batch

Next oldest-first batch from `PAGE_REFRESH_LEDGER.md`:

- `src/content/tools/nanochat.md`
- `src/content/tools/napkin-ai.md`
- `src/content/tools/neuronwriter.md`
- `src/content/tools/nightcafe.md`
- `src/content/tools/notion-ai.md`

Affected parent hubs:

- `src/content/categories/ai-chatbots.md`
- `src/content/categories/ai-design.md`
- `src/content/categories/ai-seo.md`
- `src/content/categories/ai-image.md`
- `src/content/categories/ai-notes.md`

Required closeout:

- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --file src\content\tools\nanochat.md --file src\content\tools\napkin-ai.md --file src\content\tools\neuronwriter.md --file src\content\tools\nightcafe.md --file src\content\tools\notion-ai.md`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/nanochat/ --route /tools/napkin-ai/ --route /tools/neuronwriter/ --route /tools/nightcafe/ --route /tools/notion-ai/ --route /categories/ai-chatbots/ --route /categories/ai-design/ --route /categories/ai-seo/ --route /categories/ai-image/ --route /categories/ai-notes/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`

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

Shared width, card polish, filter containment, breadcrumb geometry, and detail-page width parity are complete.

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
