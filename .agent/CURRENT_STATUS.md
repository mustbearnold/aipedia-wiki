# AiPedia Current Status

Last updated: 2026-06-20

Audience: maintainers, future agents, and Matt.

## Source-Of-Truth Stack

1. `.agent/CURRENT_STATUS.md`: where we are now.
2. `.agent/PLANS.md`: only active or immediately resumable work.
3. `.agent/WORK_LOG.md`: append-only record of major completed work.
4. `.agent/OPERATING_RULES.md`: how to work safely in this repo.
5. `.agent/PROJECT_MAP.md`: where important code and verification surfaces live.
6. `.agent/archive/`: historical detail. Read only when a current file points there.

Local ignored docs, old specs, and archived plans are not canonical when they conflict with this stack.

## Plain English

The June 2026 standards remediation is done and pushed to `origin/master`. Do not restart that work from the original spec. Use this file to see what was completed, what remains active, and which docs to trust first.

At the time this status was last checked, `master` was clean and synced with `origin/master`. Run `git status --short --branch` and `git log --oneline -5` for the exact current head.

## Done Recently

- June 2026 standards remediation is complete.
  - Final commit: `3355ce1d fix: remediate June standards review`
  - Spec: `docs/superpowers/specs/2026-06-20-june-standards-remediation-and-rereview.md`
  - Result: Semrush duplication, commercial CTA approval gating, mobile first-screen data, internal-link coverage, source/provenance checks, Node/build/CI alignment, typecheck/lint gates, Pagefind/dist checks, top-layer crawl coverage, nav semantics, and broader commercial CTA auditing were remediated or converted into documented baseline debt.
- Guard Challenge Workflow is implemented and merged.
  - Merge commit: `cd6ff483 Merge pull request #43 from mustbearnold/codex/guard-challenge-workflow`
  - Use `npm run guard:challenge` only when a guard, audit, check, or fixture may need to change.
  - Use `npm run guard:challenge:check` to validate accepted guard challenge records.
- Project Folder Tidy and Verification Router work is complete.
  - Relevant commits include `1c109370 chore: tidy repo and refresh June 17 coverage` and `af00cf70 feat: add ops efficiency tooling`.
  - The active agent surface is now `.agent/README.md`, `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/WORK_LOG.md`, `.agent/OPERATING_RULES.md`, and `.agent/PROJECT_MAP.md`.
  - Use `npm run check:smart` before choosing broad checks.
- June 17, 2026 AI News Coverage Catch-Up is complete.
  - Added a June 17 daily desk plus focused Google Pixel/Gemini, Microsoft Copilot Cowork, G7 AI sovereignty, and NVIDIA AI factory stories.
  - Updated `/news/`, RSS, ledger, and related crawl surfaces.
- Continuity recording has been hardened.
  - Committed source-of-truth stack: `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/WORK_LOG.md`, `.agent/OPERATING_RULES.md`, and `.agent/PROJECT_MAP.md`.
  - Future major work should update status, active plans, and work log before final report.

## Active Work

- Oldest-First AI Tools Wiki Refresh remains active.
  - Work from `PAGE_REFRESH_LEDGER.md`, oldest first.
  - Latest logged refresh in `.agent/PLANS.md` is `Connected Papers`, completed on 2026-06-18.
  - Before editing any page, verify volatile facts against current June 2026 sources, update source fields, update `PAGE_REFRESH_LEDGER.md`, and inspect affected top-layer pages.
- Phase 3 Parallel Surface Agent Orchestration is planned but not executed on `master`.
  - Local detailed plan, if present: `docs/superpowers/plans/2026-06-20-parallel-surface-agent-orchestration.md`
  - Committed summary: `.agent/PLANS.md`
  - Local scan at this update found no news files dated 2026-06-18, 2026-06-19, or 2026-06-20.
  - If resuming it, recompute missed news dates and verify current sources before dispatching subagents.

## Verification Baseline

- The June remediation final gate passed `npm run check:ci` twice on 2026-06-20.
- Focused closeout checks also passed:
  - `npm run ledger:pages:check`
  - `node scripts/audit-commercial-cta.mjs`
  - `node --test tests/scripts/audit-commercial-cta.test.mjs tests/scripts/tool-page-model-behavior.test.mjs`
  - `npm run audit:provenance:changed`
  - `npm run audit:coverage-quality:changed`
  - `npm run audit:commands`
  - `git diff --check`
- For docs-only or tooling-only updates, prefer `npm run check:quick` plus `git diff --check`.
- For page, content, template, runtime, SEO, schema, affiliate, or deployment changes, follow `.agent/OPERATING_RULES.md` and run the broader gates required for that surface.

## Known Caveats

- `npm run check:ci` passed, but GitHub stats used stale cached fallback data because the GitHub API returned a 403 rate-limit response.
- Existing Astro markdown plugin deprecation warnings remain.
- `npm run typecheck` covers active Astro/server surfaces. Legacy global search client scripts and archived `.legacy.astro` files are documented baseline exclusions in `tsconfig.typecheck.json` and `scripts/README.md`.
- Some local-only historical plans and specs preserve their original task checklists. When they disagree with this file, this file and `.agent/PLANS.md` are the current committed orientation sources.

## Start The Next Session

1. Run `git status --short --branch`.
2. Read `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/WORK_LOG.md`.
3. Read `.agent/PROJECT_MAP.md` for paths and `.agent/OPERATING_RULES.md` for rules.
4. Use `npm run check:smart` to pick verification for the changed files.
5. If editing website content or commercial claims, apply the current-date, ledger, source, top-layer, mobile, SEO, and affiliate rules from `.agent/OPERATING_RULES.md`.

## Finish A Major Session

1. Update `.agent/CURRENT_STATUS.md` so it reflects the new current state.
2. Update `.agent/PLANS.md` so completed work is no longer listed as active.
3. Append `.agent/WORK_LOG.md` with what landed, commit or branch, checks, risks, and next step.
4. Update any source spec only when that spec directly governed the work.
5. Run the smallest valid verification gate and report what passed, failed, and remains.
