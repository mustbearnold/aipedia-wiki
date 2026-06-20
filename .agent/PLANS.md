# AiPedia Active ExecPlans

Keep this file short. Archive completed plans under `.agent/archive/` once their final report is written.

For the plain-English project state, read `.agent/CURRENT_STATUS.md` first. For completed work, read `.agent/WORK_LOG.md`.

## Current Snapshot

- Last updated: 2026-06-20.
- `master` should be checked with `git status --short --branch` before starting work.
- The June 2026 standards remediation, Guard Challenge Workflow, Project Folder Tidy, Verification Router, and June 17 news catch-up are complete.
- Continuity recording is now centralized in `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/WORK_LOG.md`.
- The main active ongoing lane is the oldest-first AI tools wiki refresh.
- The Phase 3 parallel surface and June 18-20 news backfill plan is written but not executed on `master`.

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
