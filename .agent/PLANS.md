# AiPedia Active ExecPlans

Keep this file short. Archive completed detail under `.agent/archive/` or `.agent/loop-runs/` once final reports are written.

For current state, read `.agent/CURRENT_STATUS.md` first. For completed work, read only the newest relevant entries in `.agent/WORK_LOG.md`.

## Current Snapshot

- Last updated: 2026-06-22.
- Branch baseline: `master` pushed to `origin/master` at `610b3800`; current local batch is verified but not yet pushed.
- The loop system is green: 7 ok / 0 attention / 0 skipped after a fresh build.
- The active site-freshness lane uses batched tool refreshes, not one full build per tool.
- The next freshness batch is `coderabbit`, `cody`, `comet`, `d-id`, and `hedra`.
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

### Active Batch

Current batch from `npm run tool:refresh:batch -- --limit 5 --json`:

- `src/content/tools/coderabbit.md`
- `src/content/tools/cody.md`
- `src/content/tools/comet.md`
- `src/content/tools/d-id.md`
- `src/content/tools/hedra.md`

Affected parent hubs:

- `src/content/categories/ai-coding.md`
- `src/content/categories/ai-search.md`
- `src/content/categories/ai-video.md`

Required closeout:

- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --file src\content\tools\coderabbit.md --file src\content\tools\cody.md --file src\content\tools\comet.md --file src\content\tools\d-id.md --file src\content\tools\hedra.md`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/coderabbit/ --route /categories/ai-coding/ --route /tools/cody/ --route /tools/comet/ --route /categories/ai-search/ --route /tools/d-id/ --route /categories/ai-video/ --route /tools/hedra/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`

Run `typecheck` and `build:fast` sequentially. They both sync Astro content, and running them in parallel can race on `node_modules/.astro/data-store.json`.

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
