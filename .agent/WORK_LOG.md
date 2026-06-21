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

### 2026-06-21: Check-Smart Local Artifact Noise Filter

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Updated `scripts/check-smart.mjs` so default dirty-path discovery filters local-only untracked `.agents/` and `skills-lock.json` artifacts, while preserving explicit paths, staged files, tracked diffs, and canonical `.agent/` project docs; added focused regression coverage; and updated the `.agent` continuity docs.
- Verification: `node --test tests/scripts/check-smart.test.mjs`; `node scripts/check-smart.mjs --json`; `npm run check:smart:run`; `npm run loop:all:record -- --json`.
- Residual risks: The filter is intentionally narrow. If local agent/plugin state ever becomes part of the actual repo, pass paths explicitly or stage the intended file so `check-smart` includes it.
- Next: Continue the goal by reviewing the latest system loop receipt for any remaining noisy, weak, or under-tested signals.

### 2026-06-21: Built-Output Freshness Attention Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Tightened `scripts/aipedia-loops.mjs` so built-output loop commands become `attention` when freshness is stale or unknown; added regression coverage for unknown freshness and compact `latest.json` receipts; updated loop docs to make the behavior explicit; and recorded a fresh system loop receipt.
- Verification: `node --test tests/scripts/aipedia-loops.test.mjs`; `npm run loop:all -- --json`; `npm run loop:all:record -- --json`; `npm run check:smart:run`.
- Residual risks: Build freshness is based on filesystem mtimes, so a clean `npm run build:fast` remains the right response whenever rendered-output confidence is uncertain.
- Next: Keep iterating the loop-system goal by reviewing the latest system receipt and improving noisy, weak, or under-tested loop signals.

### 2026-06-21: Loop Runner Recommendation And Ledger Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added ranked loop recommendations, built-output freshness checks, and opt-in system loop-run JSON receipts to `scripts/aipedia-loops.mjs`; added `npm run loop:all:record`; updated the loop registry with build freshness watch paths and ignored non-rendering loop data; added focused runner tests for stale builds and ledger writes; recorded the first `.agent/loop-runs/system/latest.json`; and updated README, script docs, and `.agent` operating docs.
- Verification: `node --test tests/scripts/aipedia-loops.test.mjs`; `npm run loop:all -- --json`; `npm run loop:all:record -- --json`.
- Residual risks: The system receipt is intentionally opt-in so casual loop checks remain read-only. Build freshness compares filesystem mtimes, so a clean rebuild is still the best answer when rendered-output confidence matters.
- Next: Use the ranked recommendation from the latest system receipt: begin `amazon-q-vs-github-copilot`, or refresh the top due freshness item if fact freshness is higher priority.

### 2026-06-21: Quality Pruning Workflow Policy Cleanup

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Deleted 19 invalid live comparison pages whose tools did not share an approved workflow lane; removed public links from affected tool pages, category pages, and curated comparison surfaces; regenerated `PAGE_REFRESH_LEDGER.md` and `src/data/coverage-backlog.json`; strengthened `scripts/audit-coverage-quality.mjs` to enforce `src/data/comparison-policy.json` workflow lanes; changed review-only coverage backlog entries to use `review_id` instead of route-style slugs; added focused comparison-quality and coverage-gap tests; re-anchored comparison inventory guards from 60 to 41 through accepted Guard Challenge records; and added link wrapping in `src/layouts/ComparisonLayout.astro` to prevent long source links from causing 360 px overflow.
- Verification: `npm run coverage:backlog`; deleted-route `rg` sweep over `src` and `PAGE_REFRESH_LEDGER.md`; `npm run loop:quality -- --json`; `npm run loop:all -- --json`; `node scripts/audit-coverage-quality.mjs --all --json`; `node scripts/guard-content.mjs --baseline --dry-run --json`; `node scripts/guard-content.mjs --json`; `node scripts/audit-site-kpis.mjs --json`; `node scripts/guard-stale-facts.mjs --json`; `node --test tests/scripts/audit-coverage-quality.test.mjs`; `node --test tests/scripts/audit-coverage-gaps.test.mjs`; `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/guard-content.test.mjs tests/scripts/guard-stale-facts.test.mjs tests/scripts/check-smart.test.mjs`; `npm run guard:challenge:check`; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run build:fast`; `npm run qa:route -- --route /compare/decktopus-vs-gamma/ --route /compare/decktopus-vs-pitch/`; `npm run check:smart:run`.
- Residual risks: `audit-site-kpis` still flags `neuronwriter-vs-surfer-seo` below the 700-word comparison KPI threshold, but the quality loop is green because the page clears required comparison-quality rules. Historical archives still mention deleted routes as past work.
- Next: Run the next Decision Content cycle, currently `amazon-q-vs-github-copilot`, with current June 2026 source verification before editing.

### 2026-06-21: Freshness Metadata Scheduling

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added missing `next_review_at` values to 17 high-volatility fact records across nine touched tool pages, backfilled missing `price_history[*].verified_at` metadata on those same touched pages from each page's existing `last_verified`, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-21-freshness-metadata-scheduling.md`.
- Verification: `npm run loop:freshness -- --json`; `npm run loop:all -- --json`; `npm run ledger:pages:check -- --date 2026-06-21`; `node scripts/audit-provenance-pricing.mjs --json --changed-file <nine changed tool pages>`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run check:smart:run -- --path <nine changed tool pages> --path PAGE_REFRESH_LEDGER.md`.
- Residual risks: This was scheduling/provenance metadata only, not a fresh source re-verification pass. The broad loop review now has one remaining attention loop: Quality Pruning, with 62 existing all-comparison quality failures.
- Next: Start the Quality Pruning cleanup batch, especially raw Markdown tables and missing required comparison sections.

### 2026-06-21: AiPedia Multi-Loop System

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `.agent/LOOPS.md`, `src/data/aipedia-loops.json`, `scripts/aipedia-loops.mjs`, focused tests, npm aliases for all seven loops, and orientation docs in README, script docs, project map, operating rules, status, and plans. The loop runner supports registry output, read-only execution, loop selection, built-output skips, attention totals, JSON summaries, sample failures, and top queue excerpts.
- Verification: `node --test tests/scripts/aipedia-loops.test.mjs`; `npm run loop:system -- --json`; `npm run loop:all -- --json`; `npm run audit:commands`; `npm run loop:quality -- --json`; `npm run check:quick`.
- Residual risks: The loop system is working, but it exposes real site debt: Freshness reports 17 high-volatility facts missing `next_review_at`, and Quality Pruning reports 62 comparison-quality failures.
- Next: Run a Quality Pruning cleanup batch or schedule the missing high-volatility review dates, then rerun `npm run loop:all -- --json`.

### 2026-06-21: Activepieces Vs Zapier Loop Cycle And Selector Hardening

- Status: Complete and pushed.
- Commit: `b2fd03c5`.
- Branch: `master`.
- Changed: Added `src/content/comparisons/activepieces-vs-zapier.md`; refreshed Activepieces and Zapier current June 2026 facts where verified; expanded `src/data/comparison-policy.json` with explicit workflow-family lanes for broad categories; regenerated `src/data/coverage-backlog.json`; repaired post-cleanup guard and test fixtures through an accepted Guard Challenge; converted changed live comparison tables to mobile-safe stacked bullets; backfilled missing historical `price_history[*].verified_at` values on changed tool pages from each page's existing `last_verified`; added missing provenance metadata discovered by changed-file audits; fixed 360 px overflow on `/tools/pika/`; and recorded `.agent/loop-runs/2026-06-21-activepieces-vs-zapier.md`.
- Verification: `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/guard-content.test.mjs tests/scripts/guard-stale-facts.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`; `node --test tests/scripts/audit-coverage-gaps.test.mjs tests/scripts/decision-loop.test.mjs`; `npm run guard:challenge:check`; `npm run coverage:backlog`; `npm run coverage:next -- --json --count 20`; `npm run loop:next -- --json`; `node scripts/audit-provenance-pricing.mjs --json --changed-file <changed tool paths>`; `node scripts/audit-coverage-quality.mjs --changed-file <changed live comparison paths>`; `npm run build:fast`; `npm run qa:route -- --route /tools/pika/ --widths 360 --site-dir dist-fast/client`; `npm run loop:verify -- --date 2026-06-21 --slug activepieces-vs-zapier --route /compare/activepieces-vs-zapier/ --paths <changed paths> --json`.
- Residual risks: Five preexisting live comparison pages remain under the thin-content word threshold. Historical price-history provenance backfills record existing page verification dates and are not fresh fact refreshes. The full verifier passed but took about 8 minutes for the mixed content, guard, build, and route-QA cycle.
- Next: `npm run loop:next -- --json` selects `amazon-q-vs-github-copilot`; verify June 2026 Amazon Q Developer and GitHub Copilot facts before editing.

### 2026-06-21: Activepieces Vs n8n Loop Cycle

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/activepieces-vs-n8n.md`; refreshed Activepieces, n8n, AI Automation, Lindy buyer-path links, the automation buyer guide link surface, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; removed remaining public references to deleted cross-workflow comparison routes; removed `lovable-vs-bolt-vs-v0` from the legacy compare priority list; and updated KPI, stale-fact, and smart-check tests that still assumed the old false-vs comparison inventory and deleted comparison routes.
- Verification: `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/guard-stale-facts.test.mjs`; `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run loop:verify -- --date 2026-06-21 --route /compare/activepieces-vs-n8n/ --path <changed paths>`.
- Residual risks: The full loop is reliable but still slow when script-test and runtime page paths are touched. This pass took about 267 seconds, with `check-smart --run` at 263.4 seconds, broad `smoke:visual` at 42.7 seconds, and exact combined route QA at 49.4 seconds.
- Next: `npm run loop:next -- --json` selects `activepieces-vs-zapier`, another same-category AI Automation comparison. Verify Zapier current facts before editing.

### 2026-06-21: Strict Same-Category Comparison Cleanup

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Deleted 179 comparison files, removed public links to those deleted routes, removed the adjacent-workflow allowlist from `src/data/comparison-policy.json`, added 127 blocked pairs for known same-category false-vs traps, hardened `coverage:backlog`, `coverage:next`, and `loop:next` so they select only same-primary-category pairs that are not blocked, regenerated `src/data/coverage-backlog.json` and `PAGE_REFRESH_LEDGER.md`, and rewrote the active `.agent` docs around the stricter policy. The Mistral AI and Poe tool/source refreshes remain, but `mistral-ai-vs-poe` is now blocked and deleted as a direct comparison page. Removed multi-tool pages such as `lindy-vs-zapier-vs-n8n` and `lovable-vs-bolt-vs-v0` should be rebuilt later only as focused two-tool direct-substitute pages.
- Verification: `npm run coverage:backlog`; `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run ledger:pages`; `npm run loop:next -- --json`; one-off inventory audit proving no cross-primary comparison files remain; `rg` over `src` and `PAGE_REFRESH_LEDGER.md` proving no public links to deleted routes remain; `node --test tests/scripts/audit-coverage-gaps.test.mjs tests/scripts/decision-loop.test.mjs tests/scripts/loop-hardening.test.mjs`; `node scripts/guard-em-dashes.mjs`.
- Residual risks: Historical archive docs still mention deleted routes as past work. Treat those as history only. A future content pass can remove or rewrite plain-text historical references in public category prose where they no longer add value.
- Next: Superseded by the Activepieces vs n8n loop cycle. Current next target is `activepieces-vs-zapier`.

### 2026-06-21: False-Vs Comparison Policy Cleanup

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Deleted five definite false-vs comparison pages, removed their visible internal links, added the first `src/data/comparison-policy.json`, changed coverage and loop tooling so false-vs candidates were not auto-selected, regenerated `src/data/coverage-backlog.json`, updated active loop docs, and moved Astro markdown plugins to `processor: unified(...)` so the build no longer emits the old markdown plugin deprecation warning. This entry is superseded by the stricter same-primary-category cleanup above.
- Verification: `node --test tests/scripts/loop-hardening.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/audit-coverage-gaps.test.mjs tests/scripts/decision-loop.test.mjs`; `npm run coverage:backlog`; `node scripts/decision-loop.mjs --json`; `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run build:fast`; `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run check:smart:run`.
- Residual risks: Superseded. Borderline historical cross-category comparison pages were later removed instead of allowed.
- Next: Superseded by the Activepieces vs n8n loop cycle. Current next target is `activepieces-vs-zapier`.

### 2026-06-21: Operator Surface Route QA Contract

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Moved exact parent-hub route QA targets and the content-only broad visual smoke replacement rule into `src/data/operator-surfaces.json`; updated `scripts/check-smart.mjs` to consume the contract instead of hardcoded route and path allowlists; added focused tests proving the contract exists and still preserves broad visual smoke when tooling or runtime paths are part of the change.
- Verification: `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs tests/scripts/playwright-config.test.mjs`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `node scripts/check-smart.mjs --json --path src/content/comparisons/descript-vs-grok.md --path src/pages/compare/index.astro --path src/data/operator-surfaces.json`.
- Residual risks: The next performance bottleneck appears to be `build:fast`, which took 126.2 seconds in the latest full cycle. `descript-vs-grok` was later blocked by comparison policy as a false-vs secondary-overlap pair.
- Next: Superseded by the Activepieces vs n8n loop cycle. Current next target is `activepieces-vs-zapier`.

### 2026-06-20: DeepSeek Vs Replit Agent Loop Cycle

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/deepseek-vs-replit-agent.md`; refreshed DeepSeek, Replit Agent, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; added the `deepseek-v4-release-note` source registry row; added `.agent/loop-runs/2026-06-20-deepseek-vs-replit-agent.md`; confirmed the cycle used exact route QA instead of broad visual smoke for this content-only route set.
- Verification: `npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/deepseek-vs-replit-agent/ --path <changed paths>`.
- Residual risks: Known Astro markdown plugin deprecation warning remains. The content-only broad-smoke replacement is reliable in tests, but the rule should move into `src/data/operator-surfaces.json` or another contract-level surface model so future agents do not have to infer it from script internals.
- Next: Superseded by comparison-policy cleanup; `descript-vs-grok` is blocked unless policy is deliberately changed.

### 2026-06-20: Content Route Smoke Replacement

- Status: Complete.
- Commit: `3803ddad fix: replace broad smoke for content route loops`.
- Branch: `master`.
- Changed: Updated `scripts/check-smart.mjs` so content-only rendered route cycles can replace broad `smoke:visual` with exact route QA; added parent hub route QA mapping for `/categories/`, `/compare/`, and `/tools/`; sorted route QA commands; exposed `broad_smoke_replaced_by_route_qa` in the smart-check plan; added focused tests.
- Verification: `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs tests/scripts/playwright-config.test.mjs`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: The next cleanup should move the replacement rule out of hardcoded script allowlists and into an explicit operator-surface contract.
- Next: Validate the change in the next full loop cycle, which completed with `deepseek-vs-replit-agent`.

### 2026-06-20: DeepSeek Vs GitHub Copilot Loop Cycle And Route QA Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/deepseek-vs-github-copilot.md`; refreshed DeepSeek, GitHub Copilot, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; updated GitHub Copilot guidance for gradual signup reopening, Copilot app GA, AI Credits usage reporting, `AGENTS.md` code-review support, MAI-Code-1-Flash expansion, and Fable 5 suspension caveats; hardened Playwright reuse so browser checks use fresh `dist-fast/client`; made `check-smart --run` execute one combined route QA command for changed tool, category, and comparison routes; allowed local static QA to ignore the hosted reviews API miss; made `loop:verify` recognize combined smart route QA so it does not run a duplicate fallback route.
- Verification: `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs tests/scripts/playwright-config.test.mjs`; `npm run audit:provenance:changed`; `npm run audit:coverage-quality:changed`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/deepseek-vs-github-copilot/ --path <changed paths>`.
- Residual risks: The full verifier is safer but still slow. Final pass was about 251 seconds, with `check-smart --run` at 247.4 seconds, global `smoke:visual` at 47.0 seconds, and exact combined route QA for four routes at 26.1 seconds. Known Astro markdown plugin deprecation warning remains.
- Next: Run `deepseek-vs-replit-agent` as the next Decision Content Flywheel cluster. The next loop-performance opportunity is to split content-route QA from broad `smoke:visual` when no runtime template, layout, component, style, or config changed.

### 2026-06-20: Cursor Vs Grok Loop Cycle And Verifier Ordering Fix

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/cursor-vs-grok.md`; refreshed Cursor, Grok, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; corrected over-specific xAI Responses API retention wording after current docs proved the storage opt-out but not the old exact 30-day wording; added `.agent/loop-runs/2026-06-20-cursor-vs-grok.md`; updated `check-smart --run` so `build:fast` runs before `smoke:visual` and route QA, and each command prints a duration.
- Verification: `npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/cursor-vs-grok/ --path <changed paths>`; `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`.
- Residual risks: Full loop verification still takes about 232 seconds, with `check-smart --run` taking 228.9 seconds and `build:fast` reporting about 2 minutes 24 seconds. Build still emits the known Astro markdown plugin deprecation warning.
- Next: Run `deepseek-vs-github-copilot` as the next Decision Content Flywheel cluster. Use the new `check-smart --run` per-command timings to decide whether content-only loops can split from broad script/build verification.

### 2026-06-20: Cursor Vs DeepSeek Loop Cycle And Verifier Env Fix

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/cursor-vs-deepseek.md`; refreshed Cursor, DeepSeek, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; corrected stale DeepSeek V4 open-weight wording; added `.agent/loop-runs/2026-06-20-cursor-vs-deepseek.md`; scoped `AIPEDIA_FAST_BUILD=1` in `loop:verify` and `check-smart --run` so unit-test fixtures do not inherit fast-build mode while build and route QA still use fast output.
- Verification: `node --test tests/scripts/check-dist-budget.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`; `npm run audit:provenance:changed`; `npm run audit:coverage-quality:changed`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/cursor-vs-deepseek/ --path <changed paths>`.
- Residual risks: Build still emits the known Astro markdown plugin deprecation warning. The verified loop took about 234 seconds, with the smart-verification block at 230.7 seconds and build-fast reporting about 2 minutes 23 seconds.
- Next: Run `cursor-vs-grok` as the next Decision Content Flywheel cluster, and consider reducing loop wall time by splitting content verification from broad script/build verification when only content paths changed.

### 2026-06-21: Decision Loop Review Fixes

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Fixed loop review findings by preserving comma-containing check text in `loop:record`, making changed comparison route QA executable through `check:smart:run`, preventing fallback `build:fast` for non-rendered loop verification, reducing duplicated loop checks, and adding per-command timing to `loop:verify`.
- Verification: `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`.
- Residual risks: `check:smart:run` now runs built route QA for changed comparison pages, so comparison content verification is more complete but still intentionally heavier than docs-only checks.
- Next: Run the next Decision Content Flywheel cycle for `cursor-vs-deepseek`, then review loop timings and reliability again.

### 2026-06-21: Decision Loop Verification Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `npm run loop:verify`, `npm run qa:route`, `npm run loop:record`, `.agent/loop-runs/` receipts, changed-route smart-check guidance, and raw Markdown table rejection for changed comparison pages. Updated the active loop spec, script docs, README, and `.agent` source-of-truth files.
- Verification: `node --test tests/scripts/decision-loop.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/audit-coverage-quality.test.mjs tests/scripts/loop-hardening.test.mjs`; `node scripts/qa-route.mjs --route /compare/claude-vs-replit-agent/ --widths 360 --site-dir dist-fast/client`; `npm run guard:challenge:check`; `npm run check:quick`; `git diff --check`.
- Residual risks: `qa:route` requires a built static output, normally from `npm run build:fast` or `npm run build`. It does not replace source verification or editorial judgment.
- Next: Run the next Decision Content Flywheel cycle, `cursor-vs-deepseek`, with `loop:verify` and `loop:record`.

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
