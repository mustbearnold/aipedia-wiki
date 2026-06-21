# AiPedia Current Status

Last updated: 2026-06-21

Audience: maintainers, future agents, and Matt.

## Source Of Truth Stack

1. `.agent/CURRENT_STATUS.md`: where we are now.
2. `.agent/PLANS.md`: active or immediately resumable work.
3. `.agent/WORK_LOG.md`: append-only record of major landed work.
4. `.agent/LOOPS.md`: human guide to the repeatable loop system.
5. `.agent/OPERATING_RULES.md` and `.agent/PROJECT_MAP.md`: repo rules, paths, and verification surfaces.

Local ignored docs, old specs, and archived plans are not canonical when they conflict with this stack.

## Plain English

AiPedia is back on the normal Decision Content Flywheel. The TanStack rebuild idea is not active.

The loop system is now healthy and more useful than a simple pass/fail dashboard. `npm run loop:all -- --json` reports 7 ok loops and 0 attention loops across Decision Content, Freshness, Trust and Provenance, Revenue and Conversion, Quality Pruning, Performance and UX, and News and Market Change. The runner now also emits ranked recommendations and checks whether built-output loops are using fresh `dist-fast/client` output.

The comparison policy is strict: publish direct comparison pages only when tools serve the same buyer job and workflow. Same primary category is necessary, but not enough by itself. Do not create or keep `vs` pages for tools in different categories or for same-category tools that solve different workflows. Use category pages, buyer guides, alternatives sections, and internal-link blocks for those relationships instead.

The latest completed maintenance batch fixed the Quality Pruning loop: invalid no-shared-workflow comparison pages were deleted, public links were removed, the comparison-quality audit now enforces workflow lanes, and content inventory guard fixtures were re-anchored through Guard Challenge records. The live comparison inventory is now 46 policy-aligned comparison pages, with a content guard floor of 41.

The next selected Decision Content candidate is `amazon-q-vs-github-copilot`.

## Done Recently

- Quality Pruning workflow-policy cleanup:
  - Deleted 19 live comparison pages whose tools did not share an approved workflow lane.
  - Removed public links to those deleted routes from affected tool pages, category pages, and curated comparison surfaces.
  - Regenerated `PAGE_REFRESH_LEDGER.md` and `src/data/coverage-backlog.json`.
  - Strengthened `scripts/audit-coverage-quality.mjs` so live comparison pages fail when they violate `src/data/comparison-policy.json` workflow lanes.
  - Updated `scripts/audit-coverage-gaps.mjs` so review-only false-vs pairs use `review_id` instead of a publishable route-style `slug`.
  - Added focused tests for shared-lane pass and no-shared-lane fail.
  - Re-anchored the content inventory guard from 60 to 41 comparisons through an accepted Guard Challenge, matching 46 live comparisons minus the existing five-page safety margin.
  - Added wrapping for long comparison-body links in `src/layouts/ComparisonLayout.astro`, fixing 360 px route QA overflow on Decktopus comparison pages.
- Loop system hardening:
  - Added ranked `review.recommendations` and short `review.next_actions` to `scripts/aipedia-loops.mjs`, so green runs still explain the best next move.
  - Added built-output freshness checks for Conversion and Performance/UX loop commands that depend on `dist-fast/client`.
  - Hardened built-output freshness so stale or unknown freshness becomes an attention signal instead of a false green.
  - Added `npm run loop:all:record`, which writes timestamped JSON receipts and `.agent/loop-runs/system/latest.json`.
  - Recorded fresh system-level loop receipts under `.agent/loop-runs/system/`, with the latest pointer in `.agent/loop-runs/system/latest.json`.
  - Tightened `check-smart` default dirty-path discovery so local-only untracked `.agents/` and `skills-lock.json` artifacts do not create verification noise, while canonical `.agent/` project docs still count.
  - Made the loop review summary always state ok, attention, and skipped counts explicitly.
- Multi-loop system:
  - Added `src/data/aipedia-loops.json`, `scripts/aipedia-loops.mjs`, `.agent/LOOPS.md`, and npm aliases for all seven loops.
  - Tuned loop summaries so attention signals show actionable samples and due-soon freshness work is queue context, not a false alarm.
  - Added high-volatility `next_review_at` metadata where missing, so Freshness is green.
- Activepieces/Zapier decision cycle:
  - Added `src/content/comparisons/activepieces-vs-zapier.md`.
  - Verified current June 2026 Activepieces and Zapier facts before writing.
  - Recorded `.agent/loop-runs/2026-06-21-activepieces-vs-zapier.md`.

## Active Work

- Decision Content Flywheel:
  - Use `npm run loop:next -- --json` to confirm the next valid same-workflow comparison before editing.
  - Current recommended next cycle: `amazon-q-vs-github-copilot`.
  - Verify June 2026 Amazon Q Developer and GitHub Copilot facts before editing. Do not carry forward stale pricing, model, availability, or plan claims.
  - Use `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>` before closing rendered comparison work.
  - Use `npm run loop:record -- --date <YYYY-MM-DD> --slug <slug> --status complete` after a completed, failed, partial, or blocked major cycle.
- Oldest-First AI Tools Wiki Refresh:
  - Work from `PAGE_REFRESH_LEDGER.md`, oldest first.
  - Verify volatile facts against current June 2026 sources before editing.
  - Update source fields, `last_verified`, affected parent hubs, and the ledger in the same change.
- Multi-Loop Review:
  - Use `npm run loop:all -- --json` for broad loop review.
  - Use `npm run loop:all:record -- --json` when a broad review should become durable run history.
  - Current attention signals: none.
  - Current top ranked recommendation: begin `amazon-q-vs-github-copilot`.
  - Current second ranked recommendation: refresh the `integration_surface` fact on `presentations-ai`.
  - Current freshness queue starts with due-soon facts for `presentations-ai`, `minimax`, `claude`, and `gemini`; treat due-soon as queue context, not failure.
- Phase 3 Parallel Surface Agent Orchestration:
  - Planned but not executed on `master`.
  - If resumed, recompute missed news dates and verify current sources before dispatching subagents.

## Verification Baseline

Latest completed maintenance batch checks:

- `npm run loop:quality -- --json`
- `npm run loop:all -- --json`
- `npm run loop:all:record -- --json`
- `node scripts/audit-coverage-quality.mjs --all --json`
- `node scripts/guard-content.mjs --baseline --dry-run --json`
- `node scripts/guard-content.mjs --json`
- `node scripts/audit-site-kpis.mjs --json`
- `node scripts/guard-stale-facts.mjs --json`
- `node --test tests/scripts/audit-coverage-quality.test.mjs`
- `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/guard-content.test.mjs tests/scripts/guard-stale-facts.test.mjs tests/scripts/check-smart.test.mjs`
- `npm run guard:challenge:check`
- `npm run ledger:pages:check`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- `npm run build:fast`
- `npm run qa:route -- --route /compare/decktopus-vs-gamma/ --route /compare/decktopus-vs-pitch/`
- `npm run check:smart:run`

The final `check:smart:run` pass exited 0. It ran script tests, guard checks, generated-model audits, link/news/provenance checks, `build:fast`, broad visual smoke, and route QA across changed category, comparison, and tool routes at 360, 390, 430, 768, 1024, and 1366 px.

## Known Caveats

- `node scripts/audit-site-kpis.mjs --json` still reports `neuronwriter-vs-surfer-seo` under the 700-word comparison KPI threshold. This is an improvement opportunity, not a failing loop signal.
- Freshness is green, but due-soon review items remain a normal queue. Verify current sources before editing any volatile fact.
- Historical work-log and archive entries mention deleted comparison routes. Treat those as history, not live routing guidance.
- Full local verifier runs are reliable but slow. Prefer `npm run check:smart`, focused tests, `npm run build:fast`, and exact `qa:route` unless a full pre-ship gate is needed.
- CRLF warnings may appear for a few script/test files when Git normalizes line endings. They were non-blocking in the latest checks.
- Global `vercel@54.14.2` install emits upstream dependency deprecation warnings for `stream-to-promise@2.2.0` and `tar@7.5.7` through Vercel CLI's own dependency graph. This is not an AiPedia repo dependency issue.
- The local untracked `.agents/` folder and `skills-lock.json` are local agent/plugin state. They are ignored by `check-smart` default untracked discovery, remain uncommitted, and should be left untouched unless the task explicitly concerns local agent tooling.

## Start The Next Session

1. Run `git status --short --branch`.
2. Read `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/WORK_LOG.md`.
3. Read `.agent/LOOPS.md`, `.agent/PROJECT_MAP.md`, and `.agent/OPERATING_RULES.md`.
4. Use `npm run loop:system` to pick the right loop, or `npm run loop:next -- --json` to continue Decision Content.
5. If editing website content or commercial claims, apply the current-date, ledger, source, top-layer, mobile, SEO, and affiliate rules from `.agent/OPERATING_RULES.md`.

## Finish A Major Session

1. Update `.agent/CURRENT_STATUS.md`.
2. Update `.agent/PLANS.md`.
3. Append `.agent/WORK_LOG.md`.
4. Update any source spec only when that spec directly governed the work.
5. Run the smallest valid verification gate and report what passed, what failed, and what remains.
