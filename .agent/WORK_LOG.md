# AiPedia Work Log

Purpose: append-only record of major work that has actually landed.

Use this file to answer "what got done?" Use `.agent/CURRENT_STATUS.md` to answer "where are we now?" Use `.agent/PLANS.md` to answer "what is still active?"

## Recording Contract

- Newest entries go first.
- Add an entry after any major implementation, remediation, migration, launch, or multi-file documentation pass.
- Keep entries short enough to scan.
- Include commit, branch, verification, status, and residual risks when known.
- If the current commit introduces the work-log entry, write `this commit` rather than trying to embed its own hash.
- Do not move active work into this file until it is complete, pushed, or explicitly deferred.
- Do not treat local-only ignored docs as canonical unless the entry says so.

## Entry Template

```md
### YYYY-MM-DD: Short Work Name

- Status:
- Commit:
- Branch:
- Changed:
- Verification:
- Residual risks:
- Next:
```

## Entries

### 2026-06-20: Claude Vs Replit Agent Loop Cycle

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/claude-vs-replit-agent.md`, refreshed Replit Agent, Claude related links, AI Coding, compare/tools/categories top-layer metadata, source registry, LLM surfaces, coverage backlog, and page refresh ledger rows. Corrected Replit App Testing wording to the current web-app-only scope and replaced mobile-hostile comparison tables with stacked decision bullets.
- Verification: `npm run test:scripts`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run ledger:pages`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run ledger:pages:check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run guard:check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run check:smart:run -- --path <changed paths>`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run build:fast`; `npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed`; `npm run audit:facts`; `npm run audit:tool-quality -- --file src/content/tools/replit-agent.md`; `npm run audit:tool-quality -- --file src/content/tools/claude.md`; `npm run check:links`; Playwright route QA for `/compare/claude-vs-replit-agent/` at 360, 390, 430, 768, 1024, and 1366 px.
- Residual risks: Plain local ledger/build/guard commands still need `AIPEDIA_LEDGER_DATE=2026-06-20` during this date-bound run because the local shell clock is 2026-06-21. Build output still emits the known Astro markdown plugin deprecation warning. Local static route QA sees benign 404s for Vercel analytics scripts that are supplied by Vercel in hosted contexts.
- Next: Run the next Decision Content Flywheel cycle for `cursor-vs-deepseek`.

### 2026-06-20: Decision Loop QA Hardening

- Status: Complete and pushed.
- Commit: this commit.
- Branch: `master`.
- Changed: Hardened `npm run loop:next` so each brief includes stale-backlog warnings, source-registry inspection, related-surface discovery sweeps, and rendered route QA at 360, 390, 430, 768, 1024, and 1366 px. Updated the loop spec and `.agent` docs so desktop QA is recorded alongside mobile and tablet QA.
- Verification: `node --test tests/scripts/decision-loop.test.mjs`, `git diff --check`, em-dash sweep over touched docs/scripts, `npm run check:quick`.
- Residual risks: The route QA requirement is now in the brief and docs, but the command still does not automate browser screenshots by itself.
- Next: Run `claude-vs-replit-agent` with current sources and record route QA at every listed width.

### 2026-06-20: First Decision Content Loop Cycle, Canva Vs Claude

- Status: Complete and pushed.
- Commit: this commit.
- Branch: `master`.
- Changed: Added the `canva-vs-claude` comparison, refreshed Canva, Claude, Claude Code, Anthropic, AI design, AI coding, developer guide, Copilot alternatives, May Agent SDK news correction, source registry, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Corrected the stale Claude Agent SDK credit claim to match current Anthropic help guidance that the June 15 Agent SDK usage changes are paused.
- Verification: `npm run check:quick`, `npm run loop:next -- --json`, `npm run ledger:pages:check`, `npm run audit:coverage-quality:changed`, `npm run audit:provenance:changed`, `npm run audit:facts`, `npm run check:links`, `npm run check:smart:run -- --path <changed paths>` with `build:fast` completing in 2 minutes 13 seconds.
- Residual risks: Existing Astro markdown plugin deprecation warning remains. Public content dates use `2026-06-20` because repo guards use the US/UTC project date while the local New Zealand shell clock showed `2026-06-21`. Individual news articles remain excluded from `PAGE_REFRESH_LEDGER.md` by the ledger generator's current design.
- Next: Run the next loop target, `claude-vs-replit-agent`, with current June 2026 Claude and Replit Agent sources.

### 2026-06-21: Decision Content Loop

- Status: Complete and begun.
- Commit: this commit.
- Branch: `master`.
- Changed: Added the AiPedia decision content loop spec, `npm run loop:next`, tests, script docs, and agent operating guidance. The first loop cycle is selected as `canva-vs-claude` unless the coverage backlog changes or that page already exists.
- Verification: `npm run loop:next -- --json`, `node --test tests/scripts/decision-loop.test.mjs`, `git diff --check`, em-dash sweep over touched docs/scripts, `npm run check:quick`.
- Residual risks: The loop chooses and briefs clusters, but it intentionally does not automate live web research or editorial judgment. Content cycles still require current-source verification before facts are edited.
- Next: Run the first `canva-vs-claude` cycle with current June 2026 Canva and Claude sources, then update parent hubs and ledger rows.

### 2026-06-21: Build-Time Diagnosis And Next-Step Recommendation

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Measured local `build:fast` and full `build`, normalized the stale page refresh ledger, recorded the build bottlenecks, and added the recommended next product sprint to active project docs.
- Verification: `npm run ledger:pages:check`, `npm run build:fast` passed in 191.31 seconds, `npm run build` passed in 214.37 seconds, `git diff --check`, `npm run check:quick`.
- Residual risks: Full local build time is still about 3.5 minutes. Astro markdown plugin deprecation warnings remain. Pagefind output is near the 10 MB budget, and large search/archive payloads are likely worth future trimming.
- Next: Start the focused `canva-vs-claude` comparison sprint, or do a small build-performance pass that adds phase timing and trims Pagefind/search payload growth.

### 2026-06-21: Vercel CLI Install And Warning Classification

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Recorded that global `vercel@54.14.2` is installed and classified the npm deprecation warnings as upstream Vercel CLI transitive dependency warnings, not AiPedia repo dependency drift.
- Verification: `vercel --version`, `npm ls -g vercel stream-to-promise tar --depth=6`, `npm view vercel@latest version dependencies.@vercel/fun dependencies.@vercel/backends --json`, `git diff --check`, `npm run check:quick`.
- Residual risks: Vercel CLI currently pins `@vercel/fun@1.3.0`, which pulls `stream-to-promise@2.2.0` and `tar@7.5.7`; `tar@7.5.7` also appears through `@vercel/backends -> @vercel/nft -> @mapbox/node-pre-gyp`. Wait for a Vercel CLI release that bumps those transitive dependencies rather than hand-editing global `node_modules`.
- Next: Use `vercel` for local Vercel workflows after login/linking. Periodically rerun `npm i -g vercel@latest` and verify whether the warnings disappear.

### 2026-06-20: Continuity System Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added the work log, clarified the source-of-truth stack, and made status recording a required closeout step for future agents.
- Verification: `git diff --check`, `npm run check:quick`.
- Residual risks: Work-log entries are human-maintained and should be checked against Git history when exact file-level proof matters.
- Next: Future major work should update `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and this file before final report.

### 2026-06-20: Project Status Handoff

- Status: Complete and pushed.
- Commit: `ab0502cb docs: update project status handoff`.
- Branch: `master`.
- Changed: Added `.agent/CURRENT_STATUS.md`, trimmed `.agent/PLANS.md`, updated orientation docs, archived completed-plan summaries, and marked the June standards remediation spec complete.
- Verification: `git diff --check`, `npm run check:quick`.
- Residual risks: Local ignored Superpowers docs may still contain historical checklist wording. The committed `.agent/` docs are canonical.
- Next: Use `.agent/CURRENT_STATUS.md` as the first file in future sessions.

### 2026-06-20: June Standards Remediation

- Status: Complete and pushed.
- Commit: `3355ce1d fix: remediate June standards review`.
- Branch: `master`.
- Changed: Closed June standards findings across Semrush duplication, affiliate gating, disclosure proximity, mobile first-screen law, link coverage, source/provenance row freshness, changed-page quality gating, Node/build/CI alignment, Pagefind/dist checks, lint/typecheck gates, top-layer/LLM coverage, nav semantics, and commercial CTA audit coverage.
- Verification: `npm run check:ci` passed twice, plus focused provenance, coverage, ledger, commercial CTA, command, and diff checks.
- Residual risks: GitHub stats used stale cached fallback data during `npm run check:ci` because the GitHub API returned a 403 rate-limit response. Existing Astro markdown plugin deprecation warnings remain.
- Next: Continue current active lanes rather than restarting the remediation spec.

### 2026-06-20: Ops Efficiency Tooling

- Status: Complete and pushed.
- Commit: `af00cf70 feat: add ops efficiency tooling`.
- Branch: `master`.
- Changed: Added `npm run ops:dashboard`, expanded `check-smart`, improved operator docs, and added tests for the new dashboard and verification-routing behavior.
- Verification: Covered by script tests and later `npm run check:ci` during standards remediation.
- Residual risks: Vercel CLI was not installed at the time of this commit. It is now installed globally as recorded in the 2026-06-21 work-log entry.
- Next: Use `npm run ops:dashboard` for read-only branch, worktree, PR, issue, and audit summaries.

### 2026-06-20: Guard Challenge Workflow

- Status: Complete and pushed.
- Commit: `cd6ff483 Merge pull request #43 from mustbearnold/codex/guard-challenge-workflow`.
- Branch: `master`.
- Changed: Added `.agent/guard-challenges/README.md`, `scripts/guard-challenge.mjs`, tests, command-surface invariants, and `check-smart` routing for guard/audit/check edits.
- Verification: Guard challenge tests, command-surface tests, `npm run guard:challenge:check`, `npm run test:scripts`, `npm run audit:commands`, and later CI gates.
- Residual risks: The workflow is intentionally procedural. It does not automate subagent debate.
- Next: Use it only when a guard, audit, check, or fixture may need to change.

### 2026-06-17: Folder Tidy And June 17 News Catch-Up

- Status: Complete and pushed.
- Commit: `1c109370 chore: tidy repo and refresh June 17 coverage`.
- Branch: `master`.
- Changed: Archived old agent plans, cleaned active `.agent/` surfaces, added June 17 news desk and focused stories, and updated news/ledger/crawl surfaces.
- Verification: Covered by the associated branch checks and later remediation CI.
- Residual risks: Historical archived entries are intentionally long. Do not load the archive by default.
- Next: Keep `.agent/PLANS.md` short and current.
