# AiPedia Active ExecPlans

Keep this file short. Archive completed detail under `.agent/archive/` once final reports are written.

For plain-English project state, read `.agent/CURRENT_STATUS.md` first. For completed work, read `.agent/WORK_LOG.md`.

## Current Snapshot

- Last updated: 2026-06-21.
- Check `master` with `git status --short --branch` before starting work.
- The June 2026 standards remediation, Guard Challenge Workflow, Project Folder Tidy, Verification Router, June 17 news catch-up, Vercel CLI install, decision loop tooling, and strict comparison cleanup are complete or in the current unpushed cleanup change.
- The decision content flywheel is the default repeatable loop. Use `npm run loop:next -- --json`.
- Comparison pages must compare the same buyer job. Same primary category is necessary but not sufficient. Cross-category and different-workflow pairs are review-only and must not become published `vs` pages.
- The previous cross-category loop comparison files were deleted under the stricter policy. Their associated tool and category refreshes can remain where they improve live pages.
- `npm run loop:next -- --json` now selects `activepieces-vs-n8n`.
- Current build timing baseline from 2026-06-21: `npm run build:fast` passed in 191.31 seconds and `npm run build` passed in 214.37 seconds. Main drivers are static route fan-out, Pagefind, and large generated/search surfaces.
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

- 2026-06-21: Strict comparison cleanup deleted 179 comparison files in total, including false-vs pages and multi-tool pages that should only be rebuilt as focused two-tool direct-substitute pages.
- 2026-06-21: `src/data/comparison-policy.json` no longer has an adjacent-workflow allowlist.
- 2026-06-21: `src/data/comparison-policy.json` now stores 127 blocked pairs for known same-category false-vs traps.
- 2026-06-21: `coverage:backlog`, `coverage:next`, and `loop:next` now select only same-primary-category pairs that are not blocked as false-vs.
- 2026-06-21: Focused tests prove adjacent workflow pairs remain review-only even if a future policy file tries to list them.
- 2026-06-21: Current next selected cluster is `activepieces-vs-n8n`.
- 2026-06-21: Loop hardening includes `loop:verify`, `qa:route`, `loop:record`, changed-route smart guidance, raw Markdown table rejection for changed comparison pages, executable route QA, conditional fallback builds, receipt-safe command recording, per-command timing, scoped fast-build environment handling, build-before-browser-check ordering, and exact route QA replacement for safe content-only route cycles.

## Recommended Next: Activepieces Vs n8n Comparison Sprint

### Objective

Create a high-intent, source-backed comparison page for `activepieces-vs-n8n` while refreshing affected Activepieces, n8n, AI Automation, parent hubs, source registry, LLM surfaces, and ledger rows.

### Why This Is Next

- `npm run loop:next -- --json` selects `activepieces-vs-n8n`.
- Both tools are primary `ai-automation`, so this is a real same-category buyer decision.
- The expected buyer question is open-source/no-code automation versus self-hostable workflow automation depth: use Activepieces when simplicity, open-source blocks, and lower-friction team automations matter; use n8n when mature workflow depth, self-hosting, enterprise controls, and ecosystem breadth matter.

### First Slice

- Verify current June 2026 Activepieces and n8n pricing, hosting, open-source licensing, AI-agent, MCP, self-hosting, privacy, source, and product facts.
- Refresh `src/content/tools/activepieces.md` and `src/content/tools/n8n.md` only where current sources justify changes.
- Create or refresh `src/content/comparisons/activepieces-vs-n8n.md`.
- Inspect and update affected parent surfaces, especially `/compare/`, `/tools/`, AI Automation category pages, sitemap/LLM surfaces, and `PAGE_REFRESH_LEDGER.md`.

### Verification

- `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/activepieces-vs-n8n/ --path <changed paths>`
- `npm run loop:record -- --date <YYYY-MM-DD> --slug activepieces-vs-n8n --status complete`
- Retry commands if needed:
- `npm run ledger:pages -- --date <YYYY-MM-DD>`
- `npm run ledger:pages:check -- --date <YYYY-MM-DD>`
- `npm run audit:coverage-quality:changed`
- `npm run audit:tool-quality`
- `npm run audit:facts`
- `npm run audit:provenance:changed`
- `npm run check:smart:run -- --path <changed paths>`
- `npm run build:fast` if rendered output or pre-ship confidence requires it and `loop:verify` did not already run it.
- `npm run qa:route -- --route /compare/activepieces-vs-n8n/ --widths 360,390,430,768,1024,1366`

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
