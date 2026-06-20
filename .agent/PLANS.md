# AiPedia Active ExecPlans

Keep this file short. Archive completed plans under `.agent/archive/` once their final report is written.

For the plain-English project state, read `.agent/CURRENT_STATUS.md` first. For completed work, read `.agent/WORK_LOG.md`.

## Current Snapshot

- Last updated: 2026-06-21.
- `master` should be checked with `git status --short --branch` before starting work.
- The June 2026 standards remediation, Guard Challenge Workflow, Project Folder Tidy, Verification Router, and June 17 news catch-up are complete.
- Continuity recording is now centralized in `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/WORK_LOG.md`.
- Vercel CLI is installed globally as `vercel@54.14.2`; upstream dependency warnings are tracked in `.agent/WORK_LOG.md`.
- Current build timing baseline from 2026-06-21: `npm run build:fast` passed in 191.31 seconds and `npm run build` passed in 214.37 seconds. Main drivers are static route fan-out, Pagefind, and large generated/search surfaces.
- The decision content flywheel is now the default repeatable loop. Use `npm run loop:next` to pick the next buyer-intent cluster.
- The loop verifier is now executable. Use `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>` for rendered comparison cycles.
- Route QA is now reusable through `npm run qa:route -- --route /compare/<slug>/`.
- Major loop cycles should write `.agent/loop-runs/` receipts with `npm run loop:record`.
- The first two decision content loop cycles, `canva-vs-claude` and `claude-vs-replit-agent`, are complete. `npm run loop:next -- --json` now selects `cursor-vs-deepseek`.
- Loop briefs now require related-surface discovery, source registry inspection, stale-backlog warnings, and rendered route QA at 360, 390, 430, 768, 1024, and 1366 px.
- The main active ongoing lane is the oldest-first AI tools wiki refresh.
- The Phase 3 parallel surface and June 18-20 news backfill plan is written but not executed on `master`.

## Active: Decision Content Flywheel

### Objective

Run AiPedia as a repeatable buyer-decision loop: cluster, verify, improve decision page, update hubs, check, record, repeat.

### Source Spec

`docs/superpowers/specs/2026-06-21-aipedia-decision-content-loop.md`

### Command

- `npm run loop:next`: read-only brief for the next buyer-intent cluster.
- `npm run loop:next -- --json`: structured brief for automation or agent handoff.
- `npm run coverage:backlog`: regenerate the coverage backlog when the selected cluster looks stale.

### Status

- 2026-06-21: Loop spec and `loop:next` command are implemented.
- 2026-06-20: First selected cluster, `canva-vs-claude`, is complete.
- 2026-06-20: Second selected cluster, `claude-vs-replit-agent`, is complete.
- 2026-06-20: Next selected cluster is `cursor-vs-deepseek` unless a newer backlog changes the order or the comparison already exists.
- 2026-06-21: Loop hardening added `loop:verify`, `qa:route`, `loop:record`, changed-route smart guidance, and raw Markdown table rejection for changed comparison pages.

## Recommended Next: Cursor Vs DeepSeek Comparison Sprint

### Objective

Create a high-intent, source-backed comparison page for `cursor-vs-deepseek` while refreshing the affected Cursor, DeepSeek, AI coding, parent hub, source registry, LLM surface, and ledger rows.

### Why This Is Next

- `npm run loop:next -- --json` selects `cursor-vs-deepseek` after the completed Claude vs Replit Agent cycle.
- Cursor and DeepSeek are high-interest AI coding and model-cost buyer-decision tools.
- The work improves SEO, trust, mobile decision usefulness, and the comparison template baseline in one focused slice.

### First Slice

- Verify current June 2026 Cursor and DeepSeek pricing, plan, feature, model, API, privacy, and source facts.
- Refresh `src/content/tools/cursor.md` and `src/content/tools/deepseek.md` only where current sources justify changes.
- Create or refresh `src/content/comparisons/cursor-vs-deepseek.md`.
- Inspect and update affected parent surfaces, especially `/compare/`, `/tools/`, AI coding category pages, sitemap/LLM surfaces, and `PAGE_REFRESH_LEDGER.md`.

### Verification

- `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/cursor-vs-deepseek/ --path <changed paths>`
- `npm run loop:record -- --date <YYYY-MM-DD> --slug cursor-vs-deepseek --status complete`
- Focused retry commands, if needed:
- `npm run ledger:pages -- --date <YYYY-MM-DD>`
- `npm run ledger:pages:check -- --date <YYYY-MM-DD>`
- `npm run audit:coverage-quality:changed`
- `npm run audit:tool-quality`
- `npm run audit:facts`
- `npm run audit:provenance:changed`
- `npm run check:smart:run -- --path <changed paths>`
- `npm run build:fast` if rendered output or pre-ship confidence requires it and `loop:verify` did not already run it.
- `npm run qa:route -- --route /compare/cursor-vs-deepseek/ --widths 360,390,430,768,1024,1366` for route-QA retry.

## Active: Oldest-First AI Tools Wiki Refresh

### Objective

Refresh tracked AiPedia pages from oldest to newest, prioritizing AI tool and buyer-decision pages where volatile product, pricing, model, affiliate, and recommendation facts can go stale.

### Scope

- Work from `PAGE_REFRESH_LEDGER.md`, oldest first.
- Verify volatile facts with current June 2026 sources before editing.
- Update tool/content frontmatter, source fields, `last_verified`, `last_updated`, and buyer-decision copy where needed.
- Inspect affected top-layer and parent surfaces, including `/tools/`, `/categories/`, `/compare/`, `/answers/`, sitemap/LLM surfaces, and relevant parent category hubs.
- Regenerate or update `PAGE_REFRESH_LEDGER.md` in the same change.

### Verification

- `npm run ledger:pages`
- `npm run ledger:pages:check`
- `npm run audit:facts`
- `npm run audit:provenance`
- `npm run audit:tool-quality`
- `npm run check:smart:run -- --path <changed paths>`
- `npm run build:fast` when rendered output, templates, runtime routes, metadata, schemas, or pre-ship confidence require it.
- Browser or mobile QA when templates, layouts, CTAs, or visible UI behavior change.

### Status

- 2026-06-18: Started from the oldest tool rows dated 2026-06-12.
- 2026-06-18: Refreshed a large run of tool pages through `Connected Papers`, including affected parent hubs, source registry entries, and ledger updates.
- Resume by checking `PAGE_REFRESH_LEDGER.md` for the next oldest eligible page after `Connected Papers`, then verify current facts before editing.

## Active: Phase 3 Parallel Surface Agent Orchestration

### Objective

Use parallel agents by product surface to advance Phase 3 decision-efficiency work and current AI news backfill without file collisions.

### Source Plan

Local detailed plan, if present: `docs/superpowers/plans/2026-06-20-parallel-surface-agent-orchestration.md`.

That `docs/` path is local-only by default, so this section is the committed summary future agents should rely on.

### Status

- 2026-06-20: Plan exists, but execution has not started on `master`.
- 2026-06-20: Local scan found no news files dated 2026-06-18, 2026-06-19, or 2026-06-20.
- Before starting, recompute missed news dates, verify current sources, and confirm any referenced `.worktrees/` paths still exist and are clean.

## Recently Completed

### June 2026 Standards Remediation

- Completed and pushed in `3355ce1d fix: remediate June standards review`.
- Spec: `docs/superpowers/specs/2026-06-20-june-standards-remediation-and-rereview.md`
- Final gate: `npm run check:ci` passed twice on 2026-06-20.
- Residual caveat: GitHub stats used stale cached fallback data because the GitHub API rate limit returned 403.

### Guard Challenge Workflow

- Completed and merged in `cd6ff483 Merge pull request #43 from mustbearnold/codex/guard-challenge-workflow`.
- User-facing commands are `npm run guard:challenge` and `npm run guard:challenge:check`.
- See `.agent/guard-challenges/README.md` for the artifact contract.

### Project Folder Tidy And Verification Router

- Completed through `1c109370 chore: tidy repo and refresh June 17 coverage` and `af00cf70 feat: add ops efficiency tooling`.
- Active orientation docs are now `.agent/CURRENT_STATUS.md`, `.agent/OPERATING_RULES.md`, `.agent/PROJECT_MAP.md`, and this file.
- `npm run check:smart`, `npm run check:quick`, and `npm run ops:dashboard` are the first-line operator commands.

### June 17, 2026 AI News Coverage Catch-Up

- Completed in `1c109370 chore: tidy repo and refresh June 17 coverage`.
- Added the June 17 AI News Desk plus focused Google Pixel/Gemini, Microsoft Copilot Cowork, G7 AI sovereignty, and NVIDIA AI factory stories.
- Updated `/news/`, RSS, ledger, and related crawl surfaces.

## Archive

Historical completed plans live in `.agent/archive/PLANS-2026-05-to-2026-06.md`.
