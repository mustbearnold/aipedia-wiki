# AiPedia Workflow Success Roadmap

Date: 2026-06-27
Source analysis: `.agent/specialists/agentic-workflow-software-engineer/analyses/aipedia-project-analysis-2026-06-27.md`
Owner lens: Agentic Workflow Software Engineer

## Executive Strategy

AiPedia already has a strong workflow spine. The right move is not a broad rewrite. It is to promote the less mature high-risk lanes to the same standard as the proven tool-refresh and page-refresh systems.

Priority order:

1. Protect accuracy and trust in commercial work.
2. Make high-risk workflows repeatable with structured artifacts.
3. Keep non-regression gates explicit and hard to weaken.
4. Use useful parallelism only where ownership boundaries are clear.
5. Reduce wall time and token load after the quality gates are durable.

North-star outcome: every major AiPedia workflow produces the same durable evidence package: planner output, bounded worker prompts, structured worker reports, source or claim receipts, route and parent-surface plans, timed closeout receipts, and self-improvement notes.

## Problem-To-Plan Matrix

| Analysis gap | Plan module | Success state |
|---|---|---|
| Affiliate conversion is active but under-orchestrated | Affiliate Conversion Runner | Affiliate batches have planner JSON, worker prompts, report scaffolds, claim receipts, route args, strict closeout, and timed receipts. |
| News refresh workflow is still a placeholder | Daily News Refresh Workflow | Daily runs cover date gaps, sources, no-action receipts, OG assets, affected pages, `/news/`, homepage, feeds, ledger, and route QA. |
| QA workflow docs are still a placeholder | Canonical QA Workflow | Route QA, screenshot evidence, manual layout rubric, viewport rules, and acceptance criteria are documented and enforceable. |
| `check:smart` does not classify `workflows/` or `.agent/specialists/` | Operator-Surface Routing | Workflow and agent-package edits route to appropriate cheap gates and focused tests. |
| Current-state docs can drift from script output | Status-Doc Consistency Checks | Scripted inventory counts and status docs cannot silently disagree. |
| Tool refresh worker reports are less structured than page refresh reports | Parseable Tool Refresh Reports | Tool refresh reports aggregate source counts, caveats, confidence labels, parent notes, and failed checks. |
| Source verification is not claim-level enough | Claim-Level Source Receipts | Volatile claims record source, date, query, confidence label, caveat, and affected content path. |
| Route QA dominates large-batch closeout time | Route QA Adaptive Sharding | Route matrices are split by risk and type while preserving final public-output confidence. |
| Workflow timing data is scattered across receipts | Timing Benchmark Ledger | Each workflow has medians and trend signals for planning, workers, gates, source health, build, route QA, and review. |
| Repeated context loading burns tokens | Workflow Context-Pack Generator | Each workflow emits the exact required docs, scripts, recent receipts, and worker context bundle. |

## Sequenced Implementation Plan

### Phase 0: Guard The Planning Surface

Goal: make workflow and agent-package changes visible to the verification router before larger work begins.

Work:

- Add `workflows/`, `.agent/specialists/`, and selected `.agent/` docs to the operator-surface contract.
- Add tests proving the routing.
- Make docs-only workflow changes trigger at least `git diff --check`, em dash guard, `audit:commands`, and relevant focused script tests where applicable.

Exit criteria:

- `check:smart --path workflows/affiliate-conversion-pages/README.md` recommends more than `git diff --check`.
- `check:smart --path .agent/specialists/.../plans/<file>.md` recommends docs or workflow-safe checks.

### Phase 1: Commercial Accuracy First

Goal: make affiliate conversion as repeatable and evidence-backed as page refresh.

Work:

- Implement affiliate planner and runner path.
- Add claim-level source receipts to affiliate reports first.
- Add status-doc consistency checks for affiliate inventory counts.
- Add reviewer report templates for accuracy, SEO/quality, and visual/mobile.

Exit criteria:

- A one-tool or one-cluster affiliate batch can be planned, worked, reviewed, closed out, timed, and recorded without hand-built route lists.

### Phase 2: Freshness And QA Completeness

Goal: fill the two placeholder workflow docs that govern public trust and visual quality.

Work:

- Expand news refresh into a date-by-date runbook with no-action receipts.
- Expand QA into a canonical route QA plus manual visual evidence workflow.
- Add parseable tool-refresh worker reports.

Exit criteria:

- News and QA workflows have exact inputs, outputs, gates, failure handling, timing points, and closeout reports.
- Tool refresh workers submit JSON that the runner can aggregate.

### Phase 3: Speed After Safety

Goal: reduce wall time and token cost without weakening coverage.

Work:

- Add route QA adaptive sharding.
- Add timing benchmark ledger.
- Add workflow context-pack generator.

Exit criteria:

- Large-batch closeouts use route risk classes, timing medians, and context packs by default.
- The workflow can explain why a gate ran, why it was skipped, or why it was deferred.

## Major Initiative Plans

### 1. Affiliate Conversion Runner

Objective:

Make affiliate conversion batches accurate, source-backed, reviewable, non-duplicative, timed, and scalable.

Success definition:

- Planner identifies candidate affiliate tools, current monetization state, existing coverage, buyer-intent gap, parent surfaces, route QA set, and required source checks.
- Workers receive exact owned paths and report JSON.
- Integrator receives structured source rows, claim receipts, duplicate-intent warnings, parent-surface tasks, and route args.
- Closeout runs strict affiliate audit, provenance, ledger, typecheck, build, route QA, and commercial CTA validation once per batch.

Implementation steps:

1. Define planner schema for affiliate clusters: tool slug, monetization state, approved status, buyer intent, archetype, existing guide overlap, affected routes, parent hubs, sources needed, and risk class.
2. Extend or wrap `affiliate-conversion-inventory.mjs` to emit planner-ready JSON.
3. Add runner commands for `affiliate-plan`, `affiliate-reports`, `affiliate-closeout`, and optionally `affiliate-run`.
4. Generate worker prompt files and JSON report scaffolds under `local/tmp/aipedia-runner/affiliate-conversion/`.
5. Add duplicate-intent checks against existing money guides and `cluster_id`.
6. Add strict closeout sequence: inventory, strict affiliate audit, claim receipt check, provenance changed, ledger, typecheck, build, route QA, commercial CTA audit, diff check.
7. Write timed closeout receipts with changed routes, source counts, claim counts, CTA counts, reviewer outcomes, and unresolved risks.

Files likely touched:

- `scripts/affiliate-conversion-inventory.mjs`
- `scripts/audit-affiliate-conversion-pages.mjs`
- `tools/aipedia-runner/src/main.rs`
- `workflows/affiliate-conversion-pages/README.md`
- `workflows/templates/worker-report.md`
- `tests/scripts/audit-affiliate-conversion-pages.test.mjs`
- `tests/scripts/check-smart.test.mjs`

Verification gates:

- `npm run affiliate:conversion:inventory -- --json`
- `npm run audit:affiliate-conversion -- --strict --json`
- focused Node tests for inventory and audit changes
- runner dry run or plan command
- `npm run audit:commands -- --json`
- `npm run check:quick`
- rendered batches additionally require `typecheck`, `build:fast`, commercial CTA audit, and route QA.

Regression risks:

- Doorway-page overproduction.
- Affiliate CTA tracking drift.
- Pricing or approval status becoming stale.
- Workers editing shared files.
- False confidence on checkout-gated or region-rendered claims.

Rollout strategy:

- Start with one existing approved affiliate cluster and no source/content edits.
- Then run a one-new-page slice.
- Scale to one tool cluster.
- Only then allow multi-tool batches.

Measurable KPIs:

- 0 strict affiliate audit warnings.
- 100 percent of changed commercial claims have claim receipts.
- 100 percent of live affiliate CTAs have disclosure and tracking payload.
- No duplicate-intent page creation.
- One final build and route QA per batch, not per page.
- Reviewer rejection rate declines after two batches.

### 2. Daily News Refresh Workflow

Objective:

Make daily news and model availability refreshes date-complete, source-backed, and connected to affected buyer pages.

Success definition:

- Each run proves date coverage for broad AI news and AI tools or tool-control news.
- No-news days create no-action receipts instead of weak articles.
- Changed news updates propagate to `/news/`, homepage latest-news surfaces, affected tools, categories, feeds, sitemap or LLM surfaces, OG assets, and ledger rows.

Implementation steps:

1. Replace placeholder news workflow with a full contract.
2. Define input schema: date range, required lanes, source list, affected tools, assets required, and no-action reason.
3. Add planner script or loop extension that finds missing dates and candidate source-backed events.
4. Add worker prompt format for independent source discovery by date.
5. Add report schema: date, lane, source URLs, affected pages, publish decision, no-action reason, and confidence.
6. Add closeout gates: news rendering, news xrefs, OG generation check, ledger, build when rendered routes change, route QA for `/news/` and changed article routes.

Files likely touched:

- `workflows/news-refresh/README.md`
- `scripts/aipedia-loops.mjs`
- `scripts/editorial-weekly-queue.mjs`
- `scripts/audit-news-rendering.mjs`
- `scripts/audit-news-xrefs.mjs`
- `tools/aipedia-runner/src/main.rs` if runner-backed
- tests under `tests/scripts/`

Verification gates:

- `npm run loop:news -- --json`
- `npm run check:news`
- `node scripts/audit-news-rendering.mjs --json`
- `node scripts/generate-og-news.mjs --check`
- `npm run ledger:pages:check`
- rendered route QA for `/news/`, article routes, and affected top-layer pages.

Regression risks:

- Publishing low-value articles to satisfy date coverage.
- Missing affected tool or category propagation.
- Broken OG or thumbnail assets.
- Stale homepage latest-news surface.

Rollout strategy:

- Convert docs first.
- Add no-action receipt support.
- Add planner and runner only after two manual runs expose stable fields.

Measurable KPIs:

- 100 percent of active dates have publish or no-action evidence.
- 0 news rendering guard issues.
- 0 orphan news articles without source-backed affected-page notes.
- `/news/` route QA passes at all required widths.

### 3. Canonical QA Workflow

Objective:

Turn route QA and visual precision review into a repeatable evidence workflow.

Success definition:

- QA docs specify viewport matrix, route selection, route QA flags, screenshot policy, manual visual rubric, acceptance thresholds, and residual-risk reporting.
- Visual/mobile reviewers can reject with structured findings that map to route, viewport, selector or section, and fix status.

Implementation steps:

1. Expand QA workflow doc with page-type route matrices.
2. Define visual evidence requirements for homepage, hubs, tool pages, comparison pages, guides, news, and interactive noindex routes.
3. Add optional screenshot output policy and storage location.
4. Define when `qa:route` replaces broad visual smoke and when both are needed.
5. Add visual reviewer report template.
6. Add route QA timing interpretation guidance.

Files likely touched:

- `workflows/qa/README.md`
- `scripts/qa-route.mjs`
- `tests/scripts/qa-route.test.mjs`
- Playwright smoke tests if new evidence modes are added.

Verification gates:

- `npm run qa:route -- --route <changed-route> --site-dir dist-fast/client`
- focused `qa-route` tests for any script change
- `npm run smoke:visual` when broad visual smoke remains required
- `git diff --check`

Regression risks:

- Adding screenshot work that slows every small change.
- Treating automated route QA as a substitute for layout judgment.
- Inconsistent viewport coverage.

Rollout strategy:

- Document first.
- Add screenshot evidence only for high-risk UI changes.
- Use timing data before making screenshots default.

Measurable KPIs:

- 0 horizontal overflow failures on checked routes.
- Visual rejection reports include route and viewport.
- Route QA timing stays predictable.
- Manual visual issues found after closeout decline over time.

### 4. Check-Smart And Operator-Surface Routing

Objective:

Make workflow and agent-package edits visible to scoped verification.

Success definition:

- `check:smart` recommends meaningful checks for `workflows/**`, `.agent/specialists/**`, and relevant `.agent/**` docs.
- Workflow changes no longer route only to `git diff --check`.

Implementation steps:

1. Add operator surfaces for workflow docs, agent package docs, runner docs, and continuity docs.
2. Map docs-only changes to `git diff --check`, em dash guard, `audit:commands`, and targeted tests when scripts or command names are referenced.
3. Add tests for common workflow paths.
4. Update command-surface audit if new required docs are introduced.

Files likely touched:

- `src/data/operator-surfaces.json`
- `scripts/check-smart.mjs`
- `tests/scripts/check-smart.test.mjs`
- `scripts/audit-command-surface.mjs` if command-doc invariants expand

Verification gates:

- `npm run check:smart -- --json --path workflows/affiliate-conversion-pages/README.md`
- `npm run check:smart -- --json --path .agent/specialists/agentic-workflow-software-engineer/plans/example.md`
- `npm run test:scripts -- tests/scripts/check-smart.test.mjs` or equivalent Node test invocation
- `npm run audit:commands -- --json`

Regression risks:

- Over-routing docs changes into expensive builds.
- Under-routing workflow changes that affect future operators.

Rollout strategy:

- Start docs-only and no-build.
- Add script-aware routing only after path classification is green.

Measurable KPIs:

- 100 percent of workflow and agent package paths receive at least docs-safe checks.
- No unnecessary build recommendation for docs-only workflow changes.

### 5. Claim-Level Source Receipts

Objective:

Prove that each volatile claim changed was verified against an appropriate current source.

Success definition:

- Reports capture claim text or claim id, content path, source URL, source type, verification date, query used, confidence label, caveat, and reviewer status.

Implementation steps:

1. Define receipt schema shared by affiliate, tool, page, and news workflows.
2. Add claim receipt arrays to worker report scaffolds.
3. Add an audit that verifies every changed volatile claim has a receipt or explicit deferral.
4. Add receipt summaries to runner closeout.
5. Teach source health to link URL status to claim receipts where possible.

Files likely touched:

- `workflows/templates/worker-report.md`
- `workflows/tool-refresh/worker-prompt.md`
- `workflows/page-refresh/README.md`
- `workflows/affiliate-conversion-pages/README.md`
- `scripts/audit-provenance-pricing.mjs`
- new or extended claim receipt audit script
- runner report aggregation code

Verification gates:

- focused claim receipt audit tests
- `npm run audit:provenance:changed -- --json`
- source health for touched sources
- workflow runner report summary

Regression risks:

- Creating busywork receipts for nonvolatile copy.
- Overfitting claim detection and missing nuanced editorial claims.
- Exposing secrets or account-gated details in receipts.

Rollout strategy:

- Start with affiliate pricing and CTA claims.
- Add tool pricing and model claims.
- Add news claims last, after source-date semantics are clear.

Measurable KPIs:

- 100 percent of changed high-volatility facts have receipts.
- Fewer reviewer rejections for stale or unsupported pricing.
- Source-health failures show affected claims, not only affected URLs.

### 6. Parseable Tool Refresh Reports

Objective:

Bring tool refresh worker reporting up to page refresh quality.

Success definition:

- Tool workers write JSON reports that aggregate cleanly by worker, tool, source, caveat, confidence label, parent surface, failed check, and optimization note.

Implementation steps:

1. Define tool worker report schema.
2. Update planner to write report scaffolds and report paths.
3. Update worker prompt to require file writes when possible.
4. Add runner command to summarize tool reports before integration.
5. Add strict mode for missing or malformed reports.

Files likely touched:

- `scripts/tool-refresh-batch.mjs`
- `tools/aipedia-runner/src/main.rs`
- `workflows/tool-refresh/worker-prompt.md`
- `workflows/tool-refresh/README.md`
- `tests/scripts/tool-refresh-batch.test.mjs`

Verification gates:

- tool planner test
- runner report summary dry run
- `npm run tool:refresh:batch -- --json`
- `npm run audit:commands -- --json`

Regression risks:

- Breaking existing planner output consumed by current workflows.
- Workers skipping report files and relying on chat summaries.

Rollout strategy:

- Add optional report paths first.
- Make strict reports default only after two successful batches.

Measurable KPIs:

- 100 percent of shard reports parsed.
- Integrator source-registry misses decline.
- Parent-surface notes aggregate without manual copy work.

### 7. Status-Doc Consistency Checks

Objective:

Prevent `.agent` status and plan docs from drifting away from live command output.

Success definition:

- Scripted inventory values either match docs or docs cite generated inventory paths instead of manual counts.

Implementation steps:

1. Identify volatile status claims: affiliate inventory counts, due-now freshness count, loop status summary, active branch, batch size defaults.
2. Add a lightweight audit that compares known patterns against script output.
3. Prefer replacing manual counts with command references in future doc updates.
4. Add warnings before closeout when docs disagree.

Files likely touched:

- new script such as `scripts/audit-status-doc-consistency.mjs`
- package script alias
- `tests/scripts/`
- `.agent/CURRENT_STATUS.md` and `.agent/PLANS.md` during later cleanup

Verification gates:

- focused script tests
- `npm run affiliate:conversion:inventory -- --json`
- `npm run loop:system -- --json`
- status consistency audit

Regression risks:

- Brittle text matching.
- Blocking legitimate in-progress status transitions.

Rollout strategy:

- Start warning-only.
- Check only a small list of high-impact counts.
- Promote to hard gate after false positives are fixed.

Measurable KPIs:

- 0 stale affiliate inventory counts in startup docs.
- 0 future-agent misroutes caused by stale status numbers.

### 8. Timing Benchmark Ledger

Objective:

Make workflow timing baselines easy to compare and improve.

Success definition:

- Each major workflow records medians and recent timings for planner, workers, integration, cheap gates, source health, typecheck, build, route QA, review, and total closeout.

Implementation steps:

1. Define local timing ledger schema.
2. Aggregate runner receipts into benchmark summaries.
3. Add workflow-level medians and outlier notes.
4. Add "next optimization target" suggestions based on timing and failure counts.

Files likely touched:

- `tools/aipedia-runner/src/main.rs`
- new timing aggregation script
- `workflows/templates/run-receipt.md`
- `.agent/loop-runs/` only when recording real runs

Verification gates:

- runner receipt tests or snapshot tests
- dry-run aggregation over existing local receipts
- `npm run audit:commands -- --json`

Regression risks:

- Committing machine-local noisy timing logs.
- Optimizing speed before quality.

Rollout strategy:

- Keep raw timing local by default.
- Commit only schema and summarizer.
- Record durable summaries for major workflow milestones.

Measurable KPIs:

- Median closeout time visible by workflow.
- Top bottleneck is named after every major run.
- Route QA time per route and viewport is tracked.

### 9. Route QA Adaptive Sharding

Objective:

Reduce route QA wall time while preserving confidence.

Success definition:

- Route QA can split route sets by route type, policy, viewport risk, and noindex/indexable state.
- Final closeout still proves required routes and widths were checked.

Implementation steps:

1. Use existing page refresh route QA policy classes as the model.
2. Add risk classes for affiliate, news, tool, category, homepage, interactive, and archive routes.
3. Generate separate route args for high-risk and low-risk routes.
4. Preserve full width matrix for high-risk routes.
5. Allow reduced or sampled matrix only where policy explicitly allows it.
6. Record per-shard timing and merge summary.

Files likely touched:

- `scripts/qa-route.mjs`
- planner scripts
- `tools/aipedia-runner/src/main.rs`
- `workflows/qa/README.md`
- tests for route arg generation

Verification gates:

- route QA tests
- dry-run route arg generation
- final full-matrix pass for a representative high-risk batch

Regression risks:

- Accidentally reducing coverage on commercial or mobile-risk pages.
- Making route QA harder to understand.

Rollout strategy:

- Add timing-only sharding first with identical coverage.
- Add risk-based width reductions only after measured evidence and explicit policy.

Measurable KPIs:

- 25 percent route QA wall-time reduction on large batches with no coverage loss.
- 0 missing high-risk mobile widths.
- Route QA summary lists every route and width checked.

### 10. Workflow Context-Pack Generator

Objective:

Reduce token waste and worker drift by giving each workflow an exact context bundle.

Success definition:

- A worker can load one generated context pack that lists required docs, owned files, commands, report path, source requirements, and recent relevant receipts.

Implementation steps:

1. Define context pack schema.
2. Add pack generation to planner output for tool, page, affiliate, news, and QA workflows.
3. Include exact read list, no-edit list, report schema, current date rule, and closeout boundaries.
4. Add token budget hints and "do not read unless blocked" sections.
5. Add platform adapter notes for Codex, Claude Code, Cursor, GitHub Copilot agents, and local CLI runners.

Files likely touched:

- planner scripts
- `tools/aipedia-runner/src/main.rs`
- workflow README files
- `.agent/specialists/agentic-workflow-software-engineer/platform-adapters.md` if agent package updates are desired later

Verification gates:

- planner output tests
- sample pack generation
- `git diff --check`
- `audit:commands` if command docs change

Regression risks:

- Context packs becoming stale duplicates of workflow docs.
- Packs omitting critical current-status context.

Rollout strategy:

- Start with affiliate runner.
- Reuse for tool and page refresh once schema proves useful.
- Keep workflow docs canonical and packs generated.

Measurable KPIs:

- Worker prompts shrink without losing required context.
- Fewer hand-transcription errors.
- Fewer worker edits outside allowed paths.

## 30/60/90 Day Plan

### 30 Days

- Implement operator-surface routing for workflow and agent-package docs.
- Build affiliate conversion planner and runner MVP.
- Add affiliate claim receipt schema for commercial pricing and CTA claims.
- Expand news and QA workflow placeholders into runnable docs.
- Add optional parseable reports to tool refresh.
- Add warning-only status-doc consistency audit for affiliate counts.

### 60 Days

- Make affiliate runner default for commercial page buildout.
- Add claim receipts to tool refresh and page refresh.
- Add strict parseable tool report aggregation.
- Add news refresh planner or runner support after the doc workflow is proven.
- Add route QA timing aggregation and same-coverage sharding.
- Add workflow context packs for affiliate and tool refresh.

### 90 Days

- Add adaptive route QA by risk class after enough timing data exists.
- Add visual evidence artifacts for high-risk UI changes.
- Add timing benchmark ledger summaries for all major workflows.
- Add workflow regression dashboard from receipts.
- Promote stable runner behavior into loop registry where appropriate.
- Add cross-platform worker adapters around the shared workflow contracts.

## Recommended First Implementation Slice

First slice: operator-surface routing plus affiliate runner design skeleton.

Why this first:

- It directly fixes the under-routing gap found by `check:smart`.
- It creates the guardrail needed before editing workflows and runner code.
- It moves the active affiliate lane toward the proven page-refresh standard without touching content.

Suggested task:

1. Add `workflows/**` and `.agent/specialists/**` surfaces to `src/data/operator-surfaces.json`.
2. Add `check-smart` tests for workflow docs and agent-package docs.
3. Run `npm run check:smart -- --json --path workflows/affiliate-conversion-pages/README.md`.
4. Run `npm run check:smart -- --json --path .agent/specialists/agentic-workflow-software-engineer/plans/aipedia-workflow-success-roadmap-2026-06-27.md`.
5. Draft affiliate runner schema in `workflows/affiliate-conversion-pages/README.md` or a dedicated workflow design file.
6. Run `npm run test:scripts`, `npm run audit:commands -- --json`, and `npm run check:quick`.

Do not implement content changes in the first slice. The first success is better routing and a safe runner contract.

## Closeout Standard For These Plans

Each initiative is complete only when:

- The workflow has explicit inputs and outputs.
- Worker ownership boundaries are bounded.
- Timing points are present.
- Accuracy, quality, and regression gates are named.
- The route and parent-surface impact path is explicit.
- The smallest focused tests pass.
- Any rendered or commercial surface change receives typecheck, build, route QA, and commercial audits.
- A receipt records timings, failures, fixes, and residual risks.
