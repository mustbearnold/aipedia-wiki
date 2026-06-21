# AiPedia Loop Registry

Last updated: 2026-06-21

This file explains the repeatable AiPedia loops in plain English. The executable registry lives in `src/data/aipedia-loops.json`, and the runner is `npm run loop:system`.

## Rule Of Thumb

Use one loop at a time. Do not run every loop as a reflex unless you are doing a review pass of the loop system itself.

Loops produce queues and attention signals. They do not replace current-source verification, editorial judgment, page refresh ledger updates, mobile QA, or final reporting.

## Commands

- `npm run loop:system`: list every loop and its commands.
- `npm run loop:system -- --json`: structured registry output.
- `npm run loop:all -- --json`: run every loop read-only and return a status report.
- `npm run loop:all:record -- --json`: run every loop and write a JSON receipt under `.agent/loop-runs/system/`.
- `npm run loop:decision -- --json`: run the Decision Content loop checks.
- `npm run loop:freshness -- --json`: run the Freshness loop checks.
- `npm run loop:trust -- --json`: run the Trust and Provenance loop checks.
- `npm run loop:conversion -- --json`: run the Revenue and Conversion loop checks.
- `npm run loop:quality -- --json`: run the Quality Pruning loop checks.
- `npm run loop:performance -- --json`: run the Performance and UX loop checks.
- `npm run loop:news -- --json`: run the News and Market Change loop checks.

Built-output loops depend on fresh `dist-fast/client` output. If the runner skips conversion or performance, run `npm run build:fast`, then rerun the specific loop. If the runner marks built output as stale or unknown, do the same before trusting rendered-output audits.

## What The Runner Reports

`npm run loop:all -- --json` now includes:

- `review.summary`: explicit ok, attention, and skipped counts.
- `review.recommendations`: ranked next actions with score, severity, confidence, effort, action, and reason.
- `build_freshness`: per-command freshness status for built-output loops.
- `review.next_actions`: the shortest human-readable action list derived from the ranked recommendations.

Stale or unknown built-output freshness is an `attention` signal. A rendered-output loop is only green when the command succeeds and the runner can prove the checked build is fresh.

Use `npm run loop:all:record -- --json` after meaningful broad reviews. It writes a timestamped JSON receipt and `.agent/loop-runs/system/latest.json`, including deltas from the previous recorded run. Do not use it for every casual check.

Loop verification should stay focused on AiPedia work. `.agents/` and `skills-lock.json` are gitignored local tooling artifacts. `check-smart` also ignores them during default dirty-path discovery, but it still counts `.agent/` continuity docs and any explicitly passed paths.

## Loops

### Decision Content Flywheel

Use when choosing the next monetizable buyer-decision cluster. This is the default growth loop.

Primary output: the next same-workflow comparison or buyer-decision cluster, with working set, source requirements, route QA, and verification commands.

### Freshness Loop

Use when the question is "what is stale next?" It turns due review dates, stale verification candidates, and baseline pages into a queue.

Primary output: tool/fact refresh candidates ordered by due date and comparison impact.

### Trust And Provenance Loop

Use when facts, prices, source registry rows, or provenance metadata may be weak. This loop protects trust before and after source-heavy edits.

Primary output: missing verification dates, unknown source IDs, source-registry issues, stale facts, and high-volatility review gaps.

### Revenue And Conversion Loop

Use after rendered commercial surfaces change. This loop checks affiliate CTA tracking, disclosure, placement, labels, and analytics metadata.

Primary output: commercial CTA issues on built pages. Requires built output.

### Quality Pruning Loop

Use when the site may have thin, duplicate, low-value, or invalid pages. This is the loop for deleting, merging, refreshing, or keeping pages.

Primary output: thin comparison risk, workflow-lane policy violations, comparison-quality failures, and internal-link issues.

### Performance And UX Loop

Use after layout, component, style, runtime, search, asset, or route-output changes. This loop checks output budgets and indexability, and points to route QA when needed.

Primary output: dist budget and indexability issues on built output. Requires built output.

### News And Market Change Loop

Use after AI market news, news page edits, or affected-tool changes. This loop decides whether a market change needs a news item, tool refresh, category update, comparison update, or no action.

Primary output: news rendering issues, recent news cross-reference gaps, and editorial queue signals.

## Loop Review Protocol

After running one or more loops:

1. Check which loops are `attention`, `ok`, or `skipped`.
2. Read `review.recommendations` before deciding what to do next. A green run can still have a best next action.
3. For every `attention` loop, decide whether the signal is real work, known debt, noisy configuration, stale built output, or a missing prerequisite.
4. Revise the loop only when the signal is noisy, unclear, or hard for future agents to act on.
5. Fix site content only when the loop points at a real user-facing issue and current-source verification has been done.
6. Record major outcomes in `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/WORK_LOG.md`, and `.agent/loop-runs/` when a content cycle or major maintenance batch completes.

## Closeout Standard

A loop-system change is done only when:

- `npm run loop:system -- --json` lists the expected loops.
- `npm run loop:all -- --json` runs without runner errors.
- Attention signals are understandable and actionable.
- Skipped loops explain the missing prerequisite.
- Built-output loops report whether `dist-fast/client` is fresh, stale, or unknown, and stale or unknown states become actionable attention.
- Broad review passes can be recorded with `npm run loop:all:record -- --json`.
- Focused tests for `scripts/aipedia-loops.mjs` pass.
- `.agent` status docs say which loop to run next.

Latest baseline: 2026-06-21 recorded broad review is 7 ok / 0 attention after recommendation, build-freshness, and local-artifact noise hardening.
