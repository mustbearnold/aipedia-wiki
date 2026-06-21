# AiPedia Active ExecPlans

Keep this file short. Archive completed detail under `.agent/archive/` once final reports are written.

For plain-English project state, read `.agent/CURRENT_STATUS.md` first. For completed work, read `.agent/WORK_LOG.md`.

## Current Snapshot

- Last updated: 2026-06-21.
- Check `master` with `git status --short --branch` before starting work.
- The June 2026 standards remediation, Guard Challenge Workflow, Project Folder Tidy, Verification Router, June 17 news catch-up, Vercel CLI install, decision loop tooling, strict comparison cleanup, `activepieces-vs-n8n`, and `activepieces-vs-zapier` cycles are complete and pushed to `master`.
- The decision content flywheel is the default repeatable loop. Use `npm run loop:next -- --json`.
- Comparison pages must compare the same buyer job and workflow. Same primary category is necessary but not sufficient. Cross-category and different-workflow pairs are review-only and must not become published `vs` pages.
- The selector now uses explicit workflow lanes for broad categories, including automation, image, coding, music, chatbots, video, voice, design, writing, notes, and search.
- The multi-loop system is implemented in the current working batch. Use `npm run loop:system` to list loops and `npm run loop:all -- --json` to review all loop signals.
- Current next selected cluster is `amazon-q-vs-github-copilot`.
- Current build timing baseline from 2026-06-21: `npm run build:fast` has recently passed in roughly 2 to 3 minutes for normal content runs. The full loop verifier can take about 8 minutes when content, guards, script tests, build, and route QA are all touched.
- Route QA uses 360, 390, 430, 768, 1024, and 1366 px for rendered route work.

## Active: Decision Content Flywheel

### Objective

Run AiPedia as a repeatable buyer-decision loop: cluster, verify, improve decision page, update hubs, check, record, repeat.

### Source Spec

`docs/superpowers/specs/2026-06-21-aipedia-decision-content-loop.md`

### Commands

- `npm run loop:next`: read-only brief for the next buyer-intent cluster.
- `npm run loop:next -- --json`: structured brief for automation or agent handoff.
- `npm run coverage:backlog`: regenerate the coverage backlog when the selected cluster looks stale.
- `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>`: date-stable rendered-cycle verification.
- `npm run loop:record -- --date <YYYY-MM-DD> --slug <slug> --status complete`: durable run receipt.

### Status

- 2026-06-21: Strict comparison cleanup deleted false-vs comparison files and removed public links to deleted routes.
- 2026-06-21: `src/data/comparison-policy.json` no longer has an adjacent-workflow allowlist.
- 2026-06-21: `coverage:backlog`, `coverage:next`, and `loop:next` now select only same-primary-category pairs that are not blocked as false-vs.
- 2026-06-21: The selector now uses explicit workflow-family lanes for broad categories so same-category but different-workflow pages do not slip in as automatic `vs` pages.
- 2026-06-21: Guard and test fixtures were updated through an accepted Guard Challenge after the comparison inventory changed.
- 2026-06-21: Completed `activepieces-vs-n8n`.
- 2026-06-21: Completed `activepieces-vs-zapier`; recorded `.agent/loop-runs/2026-06-21-activepieces-vs-zapier.md`.
- 2026-06-21: Current next selected cluster is `amazon-q-vs-github-copilot`.
- 2026-06-21: Loop hardening includes `loop:verify`, `qa:route`, `loop:record`, changed-route smart guidance, raw Markdown table rejection for changed comparison pages, executable route QA, conditional fallback builds, receipt-safe command recording, per-command timing, scoped fast-build environment handling, build-before-browser-check ordering, exact route QA replacement for safe content-only route cycles, and explicit workflow-family selection for broad categories.
- 2026-06-21: Multi-loop registry added Decision Content, Freshness, Trust and Provenance, Revenue and Conversion, Quality Pruning, Performance and UX, and News and Market Change loops.

## Active: Multi-Loop System

### Objective

Keep AiPedia maintenance repeatable without turning it into bureaucracy. The loop system should tell an agent which queue to run, what signal matters, what can be skipped, and what must be verified before editing.

### Commands

- `npm run loop:system`: list every registered loop.
- `npm run loop:all -- --json`: run every loop read-only.
- `npm run loop:decision -- --json`: review the Decision Content loop.
- `npm run loop:freshness -- --json`: review stale and due fact queues.
- `npm run loop:trust -- --json`: review provenance and source health.
- `npm run loop:conversion -- --json`: review rendered commercial CTA tracking.
- `npm run loop:quality -- --json`: review thin, invalid, or low-quality content.
- `npm run loop:performance -- --json`: review built-output budgets and indexability.
- `npm run loop:news -- --json`: review news rendering and market-change xrefs.

### Status

- 2026-06-21: Initial buildout complete in the current working batch.
- 2026-06-21: First run found two attention loops: Freshness and Quality Pruning.
- 2026-06-21: Revised runner after review so due-soon freshness volume is queue context, not an alarm.
- 2026-06-21: Revised runner summaries to expose sample failures, issues, gaps, top review queue items, and top tools.
- 2026-06-21: Freshness metadata scheduling fixed 17 missing high-volatility `next_review_at` values and changed the broad review to 6 ok / 1 attention.

### Next Improvement Pass

- Quality Pruning: run `npm run loop:quality -- --json`, then fix or triage the 62 comparison-quality failures.
- After each cleanup batch, rerun `npm run loop:all -- --json` and record whether attention dropped.

## Recommended Next: Amazon Q Vs GitHub Copilot Comparison Sprint

### Objective

Create a high-intent, source-backed comparison page for `amazon-q-vs-github-copilot` while refreshing affected Amazon Q Developer, GitHub Copilot, AI Coding, parent hubs, source registry, LLM surfaces, and ledger rows.

### Why This Is Next

- `npm run loop:next -- --json` selects `amazon-q-vs-github-copilot`.
- Both tools are in the `ide_copilot_extensions` workflow lane, so this is a real same-job coding-assistant comparison.
- The expected buyer question is AWS-centered development and cloud operations versus broad IDE and GitHub-native coding assistance.

### First Slice

- Verify current June 2026 Amazon Q Developer and GitHub Copilot pricing, IDE support, enterprise controls, model access, limits, agent features, source, privacy, and affiliate facts.
- Refresh `src/content/tools/amazon-q.md` and `src/content/tools/github-copilot.md` only where current sources justify changes.
- Create or refresh `src/content/comparisons/amazon-q-vs-github-copilot.md`.
- Inspect and update affected parent surfaces, especially `/compare/`, `/tools/`, AI Coding category pages, sitemap/LLM surfaces, and `PAGE_REFRESH_LEDGER.md`.

### Verification

- `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/amazon-q-vs-github-copilot/ --path <changed paths>`
- `npm run loop:record -- --date <YYYY-MM-DD> --slug amazon-q-vs-github-copilot --status complete`
- Retry commands if needed:
- `npm run ledger:pages -- --date <YYYY-MM-DD>`
- `npm run ledger:pages:check -- --date <YYYY-MM-DD>`
- `npm run audit:coverage-quality:changed`
- `npm run audit:tool-quality`
- `npm run audit:facts`
- `npm run audit:provenance:changed`
- `npm run check:smart:run -- --path <changed paths>`
- `npm run build:fast` if rendered output or pre-ship confidence requires it and `loop:verify` did not already run it.
- `npm run qa:route -- --route /compare/amazon-q-vs-github-copilot/ --widths 360,390,430,768,1024,1366`

## Active: Oldest-First AI Tools Wiki Refresh

### Objective

Refresh tracked AiPedia pages from oldest to newest, prioritizing tool and buyer-decision pages where product, pricing, model, affiliate, and recommendation facts can go stale.

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
- `npm run check:links`
- `npm run check:smart`

## Planned: Phase 3 Parallel Surface Agent Orchestration

### Objective

Use parallel agents for independent surface maintenance without confusing ownership or verification.

### Status

- Planned but not executed on `master`.
- Recompute missed news dates before starting.
- Verify current sources before assigning any public content updates.
