# AiPedia Current Status

Last updated: 2026-06-21

Audience: maintainers, future agents, and Matt.

## Source-Of-Truth Stack

1. `.agent/CURRENT_STATUS.md`: where we are now.
2. `.agent/PLANS.md`: active or immediately resumable work.
3. `.agent/WORK_LOG.md`: append-only record of major landed work.
4. `.agent/OPERATING_RULES.md`: repo operating rules.
5. `.agent/PROJECT_MAP.md`: paths, commands, and verification surfaces.

Local ignored docs, old specs, and archived plans are not canonical when they conflict with this stack.

## Plain English

AiPedia now has a strict same-buyer-job comparison policy. Same primary category is necessary but not sufficient. Do not create or keep comparison pages for tools in different primary categories, and do not create a direct `vs` page when same-category tools solve different buyer jobs or workflows. Use category pages, guides, alternatives pages, or buyer-path sections for those relationships instead.

The cleanup deleted 179 comparison files in total. That includes false-vs pages, the newly drafted `mistral-ai-vs-poe` page, and the multi-tool pages `lindy-vs-zapier-vs-n8n` and `lovable-vs-bolt-vs-v0`. Rebuild any useful multi-tool coverage later as focused two-tool direct-substitute pages only. Deleted routes include earlier loop pages such as `canva-vs-claude`, `claude-vs-replit-agent`, `cursor-vs-deepseek`, `cursor-vs-grok`, `deepseek-vs-github-copilot`, and `deepseek-vs-replit-agent`. Their tool/source refresh work remains useful where it touched live tool and category pages, but those comparison routes are no longer live.

At last check, there were no remaining published comparison files whose tools have different primary categories. The `activepieces-vs-n8n` cycle is complete and `npm run loop:next -- --json` now selects `activepieces-vs-zapier`, which is also a valid same-category `ai-automation` comparison.

Run `git status --short --branch` and `git log --oneline -5` before starting. The final state for this entry should be pushed to `master`; verify before editing.

## Done Recently

- Strict comparison cleanup:
  - Deleted 179 comparison files from `src/content/comparisons/`.
  - Removed public links to those deleted routes from `src/content`, `src/pages`, components, and layouts.
  - Regenerated `PAGE_REFRESH_LEDGER.md`; it now tracks 604 rows after the valid `activepieces-vs-n8n` route was added.
  - Regenerated `src/data/coverage-backlog.json`.
  - Verified no cross-primary comparison files remain.
  - Verified no public links to the deleted comparison routes remain.
- Activepieces vs n8n loop cycle:
  - Added `src/content/comparisons/activepieces-vs-n8n.md` as a valid same-category automation comparison.
  - Refreshed Activepieces, n8n, AI Automation, related Lindy guide routing, compare/tools/categories top-layer pages, LLM surfaces, source registry, coverage backlog, and page ledger rows.
  - Verified Activepieces against current pricing, pieces, MCP, install docs, MCP tools docs, and GitHub release sources.
  - Verified n8n against current pricing, AI Agent docs, hosting docs, GitHub release, and affiliate sources.
  - Updated stale guard-test fixtures that still expected the old false-vs comparison inventory and deleted routes.
  - Recorded `.agent/loop-runs/2026-06-21-activepieces-vs-n8n.md`.
- Comparison selector hardening:
  - `src/data/comparison-policy.json` no longer has an `allowed_adjacent_pairs` loophole.
  - `scripts/audit-coverage-gaps.mjs`, `scripts/coverage-next.mjs`, and `scripts/decision-loop.mjs` now only select same-primary-category pairs.
  - `src/data/comparison-policy.json` now stores 127 blocked pairs for known same-category false-vs traps.
  - `mistral-ai-vs-poe` is explicitly blocked because it is native model-provider/platform-control versus multi-model aggregator.
  - Focused tests now prove adjacent workflow pairs remain review-only even if a future policy file tries to list them as allowed.
- Mistral AI, Poe, and AI Chatbots remain refreshed:
  - Mistral keeps the June 21 pricing, Vibe, Studio/API, Search Toolkit, EU data-posture, and Voxtral license clarifications.
  - Poe keeps the June 21 point tier, Windows desktop, Creator Platform API, and structured-data annual anchor corrections.
  - AI Chatbots now explains Mistral and Poe as separate lanes without publishing a direct comparison route.
- Decision loop verifier hardening remains:
  - `loop:verify` includes scoped provenance checks for changed tool pages.
  - `qa:route` still checks 360, 390, 430, 768, 1024, and 1366 px when rendered routes are affected.
  - Exact route QA can replace broad visual smoke for content-only route cycles when `src/data/operator-surfaces.json` allows it.
- Astro markdown warning cleanup remains:
  - `astro.config.mjs` uses `processor: unified(...)` from `@astrojs/markdown-remark`.
  - The old markdown plugin deprecation warning was cleared in the previous build checks.

## Active Work

- Decision Content Flywheel:
  - Use `npm run loop:next -- --json` to pick the next valid same-category comparison.
  - Current recommended next cycle: `activepieces-vs-zapier`.
  - Do not restart the deleted cross-category loop pages. Their routes were intentionally removed.
  - Use `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>` before closing a rendered comparison cycle.
  - Use `npm run loop:record -- --date <YYYY-MM-DD> --slug <slug> --status complete` after a completed, failed, partial, or blocked major cycle.
- Oldest-First AI Tools Wiki Refresh:
  - Work from `PAGE_REFRESH_LEDGER.md`, oldest first.
  - Verify volatile facts against current June 2026 sources before editing.
  - Update source fields, `last_verified`, affected parent hubs, and the ledger in the same change.
- Phase 3 Parallel Surface Agent Orchestration:
  - Planned but not executed on `master`.
  - If resumed, recompute missed news dates and verify current sources before dispatching subagents.

## Verification Baseline

Latest completed cycle checks:

- `npm run coverage:backlog`
- `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run ledger:pages`
- `npm run loop:next -- --json`
- No cross-primary comparison pages remain, checked with a one-off Node inventory audit.
- No public links to deleted comparison routes remain, checked with `rg` over `src` and `PAGE_REFRESH_LEDGER.md`.
- `node --test tests/scripts/audit-coverage-gaps.test.mjs tests/scripts/decision-loop.test.mjs tests/scripts/loop-hardening.test.mjs`
- `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/guard-stale-facts.test.mjs`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run loop:verify -- --date 2026-06-21 --route /compare/activepieces-vs-n8n/ --path <changed paths>`

The final `loop:verify` pass included ledger check, changed comparison quality, changed tool provenance, guard challenge check, all script tests, commands audit, guard checks, fact/source/provenance audits, link/news checks, generated-model audit, `build:fast`, broad visual smoke, and exact route QA for `/categories/`, `/categories/ai-automation/`, `/compare/`, `/compare/activepieces-vs-n8n/`, `/tools/`, `/tools/activepieces/`, `/tools/lindy/`, and `/tools/n8n/` at 360, 390, 430, 768, 1024, and 1366 px.

## Known Caveats

- Historical work-log and archive entries mention deleted comparison routes. Treat them as history, not live routing guidance.
- Public content touched during the first six loop attempts used `2026-06-20` as the verification date. Current and future loop work should pass the intended date explicitly.
- The first `activepieces-vs-n8n` verifier run failed because tests still assumed 266+ comparison pages and deleted comparison routes. Those fixtures now use the post-cleanup direct-substitute inventory and live AI Automation routes.
- Full local builds currently take about 3.5 minutes. Prefer `npm run check:smart`, `npm run check:quick`, focused tests, and `npm run build:fast` unless a full pre-ship build is needed.
- Large generated surfaces deserve future optimization: `/search/`, archive pages, `api/home-search.json`, public OG assets, and Pagefind output near the 10 MB budget.
- `npm run check:ci` previously passed, but GitHub stats used stale cached fallback data because the GitHub API returned a 403 rate-limit response.
- Global `vercel@54.14.2` install emits upstream dependency deprecation warnings for `stream-to-promise@2.2.0` and `tar@7.5.7` through Vercel CLI's own dependency graph. This is not an AiPedia repo dependency issue.

## Start The Next Session

1. Run `git status --short --branch`.
2. Read `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/WORK_LOG.md`.
3. Read `.agent/PROJECT_MAP.md` for paths and `.agent/OPERATING_RULES.md` for rules.
4. Use `npm run check:smart` to choose verification for changed files.
5. If editing website content or commercial claims, apply the current-date, ledger, source, top-layer, mobile, SEO, and affiliate rules from `.agent/OPERATING_RULES.md`.

## Finish A Major Session

1. Update `.agent/CURRENT_STATUS.md`.
2. Update `.agent/PLANS.md`.
3. Append `.agent/WORK_LOG.md`.
4. Update any source spec only when that spec directly governed the work.
5. Run the smallest valid verification gate and report what passed, failed, and remains.
