# AiPedia Current Status

Last updated: 2026-06-20

Audience: maintainers, future agents, and Matt.

## Plain English

The June 2026 standards remediation is done and pushed to `origin/master`. Do not restart that work from the original spec. Use this file to see what was completed, what remains active, and which docs to trust first.

At the time this status was written, `master` was clean and synced with `origin/master` at `3355ce1d`.

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
  - The active agent surface is now `.agent/README.md`, `.agent/OPERATING_RULES.md`, `.agent/PROJECT_MAP.md`, `.agent/PLANS.md`, and this file.
  - Use `npm run check:smart` before choosing broad checks.
- June 17, 2026 AI News Coverage Catch-Up is complete.
  - Added a June 17 daily desk plus focused Google Pixel/Gemini, Microsoft Copilot Cowork, G7 AI sovereignty, and NVIDIA AI factory stories.
  - Updated `/news/`, RSS, ledger, and related crawl surfaces.

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
2. Read `.agent/CURRENT_STATUS.md`, `.agent/PROJECT_MAP.md`, and `.agent/PLANS.md`.
3. Use `npm run check:smart` to pick verification for the changed files.
4. If editing website content or commercial claims, apply the current-date, ledger, source, top-layer, mobile, SEO, and affiliate rules from `.agent/OPERATING_RULES.md`.
