# AiPedia Decision Content Loop Spec

Date: 2026-06-21
Status: Active
Owner: AiPedia editorial and agent operators

## Problem

AiPedia has strong standards, but the work can feel scattered when agents choose isolated page refreshes, broad audits, or full builds by habit. The site needs a repeatable loop that turns freshness, coverage, SEO, trust, and revenue work into one focused buyer-decision cluster at a time.

The loop must be simple enough for future sessions to follow without reopening old plans, and strict enough to prevent stale facts, weak parent hubs, forgotten ledger rows, and over-broad verification.

## Goal

Create a default operating loop for AiPedia content work:

1. Pick one buyer-intent cluster.
2. Verify current facts.
3. Improve the decision page.
4. Update parent and top-layer surfaces.
5. Run the smallest safe checks.
6. Record what changed.
7. Repeat.

The loop should make the next useful task obvious, starting with the highest-value missing comparison cluster.

## Non-Goals

- Do not automate web research or source judgment.
- Do not auto-write product facts from old repo data.
- Do not require full builds for routine content or docs changes.
- Do not create a separate planning system outside `.agent/`.
- Do not replace current ledger, source, audit, and guard rules.
- Do not treat loop-run records as plans. They are receipts for completed or attempted cycles.

## Operating Loop

### 1. Pick Cluster

Use `npm run loop:next` to produce the next decision-content brief. The first version uses the comparison coverage backlog and live comparison files to select missing buyer-intent comparison clusters.

The brief must name:

- Target comparison slug and file.
- Tool pages that may need fact refresh.
- Category pages and top-layer surfaces to inspect.
- Source registry and related surface discovery checks.
- Rendered route QA at mobile, tablet, and desktop widths.
- Source discipline.
- Verification commands.
- Done definition.

### 2. Verify Facts

Before editing any website page or commercial claim, verify volatile facts against current sources using the live current month and year in search queries. Prefer primary sources for pricing, plan names, product availability, model access, API access, company claims, affiliate terms, and commercial claims.

Update `last_verified`, source fields, pricing or source registries, and visible verification language where relevant. If a fact cannot be verified, qualify it or defer it.

### 3. Improve Decision Page

Build or refresh the page so it answers:

- Who should choose each tool?
- Who should avoid each tool?
- Which plan should a buyer start with?
- What is the best alternative?
- What changed recently?
- Why should the reader trust the page?
- Where should the reader click next?

Comparison pages must include a decision-first mobile experience, clear verdicts, source-backed tradeoffs, honest watch-outs, plan guidance, and sources.

### 4. Update Parent Surfaces

Inspect and update affected top-layer pages, parent hubs, internal links, sitemap or LLM surfaces, and the page refresh ledger. A child page must not leave `/tools/`, `/compare/`, `/categories/`, category hubs, or LLM surfaces stale or misleading.

Search related surfaces before closing the cycle. At minimum, sweep `src/content` and `src/pages` for the two tool slugs and comparison slug, then inspect `src/data/source-registry.json` for source ids, `last_checked` dates, pricing rows, and source records touched by the verified facts.

### 5. Check

Use the smallest verification set that matches the change. For a comparison decision cluster, the preferred command is:

- `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>`

The wrapper sets `AIPEDIA_LEDGER_DATE` for every child command, regenerates and checks the page refresh ledger with the same date, runs the changed comparison quality gate, delegates overlapping checks to `check:smart:run`, records per-command timing, runs `build:fast` when route QA or `--force-build` requires it and the smart plan did not already select it, and calls route QA when a route is supplied but smart verification did not already run that route. Fast-build mode is scoped to build and browser-output commands only, so unit tests and fixture audits do not inherit `AIPEDIA_FAST_BUILD=1`. `check-smart --run` now orders `build:fast` before `smoke:visual` and route QA when both are selected, and prints per-command durations for performance review.

The underlying commands remain valid when a focused retry is needed:

- `npm run ledger:pages -- --date <YYYY-MM-DD>`
- `npm run ledger:pages:check -- --date <YYYY-MM-DD>`
- `npm run audit:coverage-quality:changed`
- `npm run audit:provenance:changed`
- `npm run audit:facts`
- `npm run check:links`
- `npm run check:smart`
- `npm run check:smart:run -- --path <changed paths>`

Use `npm run build:fast` when rendered output, runtime surfaces, metadata, schema, or pre-ship confidence require it and the loop verifier did not already run it. Reserve full `npm run build` for final production confidence, broad template changes, runtime changes, deployment changes, or explicit pre-ship checks.

For any new or refreshed rendered comparison page, run `npm run qa:route -- --route /compare/<slug>/ --widths 360,390,430,768,1024,1366` or let `loop:verify`/`check:smart:run` run it. Record the result. The pass must cover mobile/tablet first-screen decision content plus desktop layout quality, including no horizontal overflow, overlap, stretched cards, broken CTAs, or missing primary content.

### 6. Record

Before final report on a major loop cycle:

- Update `.agent/CURRENT_STATUS.md`.
- Update `.agent/PLANS.md`.
- Append `.agent/WORK_LOG.md`.
- Run `npm run loop:record -- --date <YYYY-MM-DD> --slug <slug> --status complete --route /compare/<slug>/` with changed files, checks, risks, and next action when the cycle is major.
- Update the governing spec only when the loop itself changes.

The record should say what landed, what passed, what failed, what remains, which route QA widths passed, and the next recommended cluster.

## Tooling

Add `scripts/decision-loop.mjs` and expose it as `npm run loop:next`.

The command is read-only. It selects missing comparison clusters from `src/data/coverage-backlog.json`, skips pairs that already exist in `src/content/comparisons/`, and prints a working brief.

Expected modes:

- Human output for day-to-day operation.
- `--json` output for future automation.
- `--count <n>` for batch planning.
- `--slug <slug>` for a specific comparison cluster.

Additional loop commands:

- `npm run loop:verify`: executable, date-stable verification for a cycle.
- `npm run qa:route`: reusable route QA across mobile, tablet, and desktop widths.
- `npm run loop:record`: durable run receipt under `.agent/loop-runs/`.

Current implementation status: `canva-vs-claude`, `claude-vs-replit-agent`, `cursor-vs-deepseek`, and `cursor-vs-grok` are complete. `npm run loop:next -- --json` currently selects `deepseek-vs-github-copilot`.

## First Cycle

The first selected cluster is expected to be `canva-vs-claude` unless the backlog changes or that page already exists.

Initial working set:

- `src/content/comparisons/canva-vs-claude.md`
- `src/content/tools/canva.md`
- `src/content/tools/claude.md`
- `src/content/categories/ai-design.md`
- `/compare/`, `/tools/`, `/categories/`, sitemap and LLM surfaces
- `src/data/source-registry.json`
- Related content and page search for `canva`, `claude`, and `canva-vs-claude`
- `PAGE_REFRESH_LEDGER.md`

Do not write the comparison until current-month Canva and Claude facts are verified from live sources.

## Acceptance Criteria

- `npm run loop:next` prints the next cluster and its working brief.
- `npm run loop:next -- --json` emits structured data suitable for future agents.
- `npm run loop:verify -- --dry-run --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>` shows the exact verification plan.
- `npm run qa:route -- --route /compare/<slug>/` verifies built output across the default mobile, tablet, and desktop widths.
- `npm run loop:record` writes a durable `.agent/loop-runs/` receipt.
- Existing comparison pairs are skipped.
- Invalid arguments fail before reading repo state.
- Missing backlog files fail with a recovery action.
- The command is documented in README and script docs.
- The loop is reflected in `.agent/OPERATING_RULES.md`, `.agent/PLANS.md`, and `.agent/CURRENT_STATUS.md`.
- Script tests and command-surface checks pass.
