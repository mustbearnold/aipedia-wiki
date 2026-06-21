# AiPedia Current Status

Last updated: 2026-06-21

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

The June 2026 standards remediation is done and pushed to `origin/master`. The first three Decision Content Flywheel content cycles, `canva-vs-claude`, `claude-vs-replit-agent`, and `cursor-vs-deepseek`, are complete. The loop has now been hardened with executable verification, route QA, changed-route smart guidance, durable run receipts, per-command timing, and scoped fast-build environment handling. Do not restart completed cycles from the original specs. Use this file to see what was completed, what remains active, and which docs to trust first.

At the time this status was last checked, `master` had local unpushed cycle work in progress. Run `git status --short --branch` and `git log --oneline -5` for the exact current head.

## Done Recently

- Decision Content Flywheel hardening is implemented.
  - Added `npm run loop:verify` to run the cycle checks with one explicit `AIPEDIA_LEDGER_DATE`, preventing local timezone drift from breaking ledger, guard, or build checks.
  - Added `npm run qa:route` for reusable Playwright route QA at mobile, tablet, and desktop widths.
  - Added `npm run loop:record` and `.agent/loop-runs/` receipts so completed or attempted cycles leave one durable artifact.
  - `npm run check:smart` now surfaces route-specific QA targets for changed tool, category, and comparison content.
  - `npm run audit:coverage-quality:changed` now rejects raw Markdown tables in changed comparison pages so mobile-hostile tables are caught before browser QA.
  - Follow-up review fixes preserve comma-containing verification command text in loop receipts, make comparison route QA executable through `check:smart:run`, avoid fallback builds for non-rendered paths, reduce duplicated loop checks, and record per-command timings.
  - Latest loop review fix scopes `AIPEDIA_FAST_BUILD=1` to build and route-QA commands, preventing fast-build mode from leaking into `test:scripts` fixture tests while keeping route QA pointed at fast-build output.
- Third Decision Content Flywheel cycle is complete.
  - Completed cycle: `cursor-vs-deepseek`.
  - Added `src/content/comparisons/cursor-vs-deepseek.md`.
  - Refreshed Cursor, DeepSeek, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and ledger rows.
  - Corrected stale DeepSeek V4 open-weight wording: current DeepSeek and Hugging Face sources now show V4 open-weight releases, while the page still warns that self-hosting requires hardware, license, hosting, and governance review.
  - Route QA passed for `/compare/cursor-vs-deepseek/` at 360, 390, 430, 768, 1024, and 1366 px after build-fast.
  - `npm run loop:next -- --json` now selects `cursor-vs-grok`.
- Second Decision Content Flywheel cycle is complete.
  - Completed cycle: `claude-vs-replit-agent`.
  - Added `src/content/comparisons/claude-vs-replit-agent.md`.
  - Refreshed Replit Agent, Claude related links, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and ledger rows.
  - Corrected Replit App Testing wording to the current web-app-only scope and replaced mobile-hostile comparison tables with stacked decision bullets.
  - Route QA passed for `/compare/claude-vs-replit-agent/` at 360, 390, 430, 768, 1024, and 1366 px after build-fast.
  - `npm run loop:next -- --json` now selects `cursor-vs-grok`.
- First Decision Content Flywheel cycle is complete.
  - Completed cycle: `canva-vs-claude`.
  - Added `src/content/comparisons/canva-vs-claude.md`.
  - Refreshed affected Canva, Claude, Claude Code, Anthropic, AI design, AI coding, developer guide, Copilot alternatives, May Agent SDK news correction, source registry, LLM surfaces, and ledger rows.
  - Corrected the stale Claude Agent SDK credit claim: Anthropic's current help guidance says the June 15 Agent SDK usage changes are paused and the separate monthly credit is not currently available.
  - The next cycle after this completed work was `claude-vs-replit-agent`, which is now also complete.
- Decision content loop is implemented.
  - Spec: `docs/superpowers/specs/2026-06-21-aipedia-decision-content-loop.md`
  - Command: `npm run loop:next`
  - Verification command: `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>`
  - Route QA command: `npm run qa:route -- --route /compare/<slug>/`
  - Recording command: `npm run loop:record -- --date <YYYY-MM-DD> --slug <slug> --status complete`
  - Purpose: choose one buyer-intent cluster, verify current facts, improve the decision page, update parent surfaces, run the right checks, record, repeat.
  - Next cycle: `cursor-vs-grok` unless the coverage backlog changes or the page already exists.
  - The loop brief now requires related-surface discovery, source registry inspection, stale-backlog warnings, and rendered route QA at 360, 390, 430, 768, 1024, and 1366 px.
- Build-time diagnosis is complete.
  - `npm run build:fast` passed in 191.31 seconds after regenerating the page refresh ledger.
  - `npm run build` passed in 214.37 seconds.
  - Main cost is site scale: 1,135 content files, about 1,180 built HTML pages, Astro/Vercel static prerender around 2 minutes, and Pagefind around 44 seconds.
  - `PAGE_REFRESH_LEDGER.md` was normalized with `npm run ledger:pages` because the ledger check was stale.
  - Best next product move from that review has now completed three cycles through `cursor-vs-deepseek`; the current next sprint is `cursor-vs-grok`.
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
- Vercel CLI is installed globally for local operator workflows.
  - Installed version: `vercel@54.14.2`.
  - Local executable: `C:\Users\mustb\AppData\Local\npm\vercel.ps1`.
  - Use it for Vercel login, env pull, deploy, inspect, and logs workflows once the project is linked and authenticated.

## Active Work

- Decision Content Flywheel is active.
  - Use `npm run loop:next` at the start of monetizable content work.
  - Use `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>` before closing a rendered comparison cycle.
  - Use `npm run loop:record` to write `.agent/loop-runs/YYYY-MM-DD-slug.md` after a completed, failed, partial, or blocked major cycle.
  - Do not write comparison, pricing, model, plan, affiliate, or commercial claims until current sources have been verified.
  - For rendered comparison cycles, record route QA at 360, 390, 430, 768, 1024, and 1366 px, covering mobile/tablet and desktop.
  - Current recommended next cycle is `cursor-vs-grok`.
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

- Decision loop hardening passed:
  - `node --test tests/scripts/decision-loop.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/audit-coverage-quality.test.mjs tests/scripts/loop-hardening.test.mjs`
  - `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`
  - `node scripts/qa-route.mjs --route /compare/claude-vs-replit-agent/ --widths 360 --site-dir dist-fast/client`
  - `npm run guard:challenge:check`
  - `npm run check:quick`
- The second Decision Content Flywheel cycle passed:
  - `npm run test:scripts`
  - `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run ledger:pages`
  - `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run ledger:pages:check`
  - `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run guard:check`
  - `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run check:smart:run -- --path <changed paths>`
  - `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run build:fast`
  - `npm run audit:coverage-quality:changed`
  - `npm run audit:provenance:changed`
  - `npm run audit:facts`
  - `npm run audit:tool-quality -- --file src/content/tools/replit-agent.md`
  - `npm run audit:tool-quality -- --file src/content/tools/claude.md`
  - `npm run check:links`
  - Playwright route QA for `/compare/claude-vs-replit-agent/` at 360, 390, 430, 768, 1024, and 1366 px.
- The third Decision Content Flywheel cycle passed:
  - `node --test tests/scripts/check-dist-budget.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`
  - `npm run audit:provenance:changed`
  - `npm run audit:coverage-quality:changed`
  - `node scripts/guard-em-dashes.mjs`
  - `git diff --check`
  - `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/cursor-vs-deepseek/ --path <changed paths>`
  - Loop verifier passed in about 234 seconds; the smart-verification block took 230.7 seconds, and build-fast reported about 2 minutes 23 seconds.
  - Playwright route QA passed for `/compare/cursor-vs-deepseek/` at 360, 390, 430, 768, 1024, and 1366 px.
- The first Decision Content Flywheel cycle passed:
  - `npm run check:quick`
  - `npm run ledger:pages:check`
  - `npm run audit:coverage-quality:changed`
  - `npm run audit:provenance:changed`
  - `npm run audit:facts`
  - `npm run check:links`
  - `npm run check:smart:run -- --path <changed paths>` with `build:fast` completing in 2 minutes 13 seconds.
- The 2026-06-21 build-time diagnosis passed:
  - `npm run ledger:pages:check`
  - `npm run build:fast`
  - `npm run build`
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

- Public content touched during the first three loop cycles uses `2026-06-20` as the verification date because the repo audit guards use the US/UTC project date. The local New Zealand shell clock showed `2026-06-21` during part of the work. New loop cycles should pass the intended project date explicitly to `npm run loop:verify -- --date <YYYY-MM-DD>`.
- Full local builds currently take about 3.5 minutes on this machine. That is understandable for the current static site size, but too slow for normal edit loops. Prefer `npm run check:smart`, `npm run check:quick`, focused tests, and `npm run build:fast` unless a full pre-ship build is needed.
- Large generated surfaces deserve future optimization: `/search/`, archive pages, `api/home-search.json`, public OG assets, and Pagefind output near the 10 MB budget.
- `npm run check:ci` passed, but GitHub stats used stale cached fallback data because the GitHub API returned a 403 rate-limit response.
- Existing Astro markdown plugin deprecation warnings remain for `markdown.remarkPlugins`, `markdown.rehypePlugins`, and `markdown.remarkRehype`.
- `npm run typecheck` covers active Astro/server surfaces. Legacy global search client scripts and archived `.legacy.astro` files are documented baseline exclusions in `tsconfig.typecheck.json` and `scripts/README.md`.
- Some local-only historical plans and specs preserve their original task checklists. When they disagree with this file, this file and `.agent/PLANS.md` are the current committed orientation sources.
- Global `vercel@54.14.2` install emits upstream dependency deprecation warnings for `stream-to-promise@2.2.0` and `tar@7.5.7` through Vercel CLI's own dependency graph. This is not an AiPedia repo dependency issue; update Vercel CLI when upstream bumps those transitive packages.

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
