# AiPedia Agentic Workflow Analysis

Date: 2026-06-27
Analyst: `.Agents/agentic-workflow-software-engineer`
Scope: workflow architecture, repeatability, accuracy, quality, non-regression, speed, efficiency, token efficiency, and useful parallelism. No project source, content, package, workflow, script, or existing agent files were edited.

## 1. Executive Summary

AiPedia is already operating above normal agentic-repo maturity. It has explicit rules, canonical current-state docs, strong command gates, a page refresh ledger, smart check routing, source health checks, route QA, loop receipts, and Rust-runner-backed workflows for tool and non-tool refresh batches. The strongest pattern is clear ownership: shard workers handle bounded content files, while an integrator owns shared state, parent hubs, ledgers, and final verification.

The main risk is uneven maturity across lanes. Tool refresh and page refresh are runner-backed and timed. Affiliate conversion, daily news refresh, and QA workflow documentation are less automated even though they carry high trust, revenue, and freshness risk. The current active affiliate lane has strong policy and audit scripts, but it lacks the same planner, worker report scaffolds, timing receipts, and duplicate-intent controls that made refresh work reliable.

Top priority: promote the affiliate conversion workflow to the same runner-backed standard as page refresh, then fill the news and QA workflow placeholders. Secondary priority: convert source verification and worker reports into more structured receipts so accuracy can be audited per claim, not only per page or URL.

## 2. Current Workflow Architecture And Maturity

Maturity rating: advanced, with a few important gaps.

Current architecture:

- `.agent/` is the operational memory layer: current status, active plans, loop docs, work logs, and receipts.
- `workflows/` is the committed procedure layer: tool refresh, page refresh, affiliate conversion pages, templates, plus placeholder news and QA lanes.
- `scripts/` is the enforcement layer: guards, audits, planners, source health, route QA, ledger generation, loop runners, command-surface checks, and affiliate inventory.
- `tools/aipedia-runner/` is the orchestration layer for repeatable Rust-backed planner and closeout workflows.
- `src/data/aipedia-loops.json` and `src/data/operator-surfaces.json` define loop and verification routing contracts.
- CI is conservative and ordered: lint, typecheck, quick checks, broader checks, provenance, coverage quality, production build, and dist validation.

Maturity by lane:

- Tool refresh: high. It has planner batches, six bounded workers, integrator ownership, confidence labels, grouped gates, route QA, and runner closeout.
- Non-tool page refresh: high. It has route QA policy classes, worker report scaffolds, worker summary metrics, source health, timed receipts, and scaling rules.
- Affiliate conversion pages: medium. Strong policy, inventory, strict audit, and reviewer roles exist, but runner orchestration and report artifacts are not yet equivalent to refresh lanes.
- Loop system: high. Seven loops are registered and command-surface audit is green.
- News refresh: low to medium. Strong operating rules exist, but `workflows/news-refresh/README.md` is still a placeholder.
- QA workflow: medium. Route QA tooling is real, but canonical QA workflow docs are still a placeholder and visual precision remains partly manual.

## 3. Strongest Existing Systems

1. Page refresh ledger as canonical inventory.
   `PAGE_REFRESH_LEDGER.md` plus `ledger:pages` and `ledger:pages:check` gives every content batch a durable freshness accounting surface.

2. Runner-backed page refresh.
   `runner:page-refresh:*` already writes planner artifacts, worker prompts, report scaffolds, route args, source-health outputs, timing files, summaries, and receipts.

3. Batched tool refresh.
   The six-worker plus integrator model is well scoped. Workers edit only assigned tool markdown, while the integrator handles shared files and final gates.

4. Verification command surface.
   `audit:commands` passed and confirms the required operator scripts, CI invariants, package chains, and documented commands are present.

5. Smart verification router.
   `check:smart` gives a scoped entry point that helps avoid reflexive full builds.

6. Loop registry.
   `loop:system` exposes seven registered operating loops with purposes, commands, review questions, and freshness prerequisites.

7. Guard Challenge Workflow.
   This prevents casual weakening of guards and requires defender or arbitrator style review before changing enforcement.

## 4. Highest-Risk Workflow Gaps

1. Affiliate conversion is active but under-orchestrated.
   The lane has strict policy and audits, but no runner plan, shard prompts, JSON report scaffolds, closeout receipt, or cluster-level timing schema. This matters because commercial pages combine volatile pricing, trust, SEO, mobile layout, and revenue tracking risk.

2. News refresh workflow is still a placeholder.
   Daily AI news and model availability work is freshness-sensitive. The durable workflow should specify date coverage, source discovery, no-action receipts, OG asset checks, affected-tool propagation, route QA, and homepage or `/news/` alignment.

3. QA workflow docs are still a placeholder.
   Route QA is strong, but manual layout precision, visual review evidence, viewport strategy, and screenshot acceptance criteria need a canonical workflow.

4. `check:smart` does not classify `workflows/`.
   A probe on `workflows/affiliate-conversion-pages/README.md` returned only `git diff --check`. Workflow docs can change future behavior and should map to `check:quick`, `audit:commands`, and focused workflow tests where applicable.

5. Current-state doc drift exists.
   `.agent/CURRENT_STATUS.md` and the live inventory agree on 25 configured affiliate-link tools and 21 live affiliate tools after SaneBox demotion. `.agent/PLANS.md` still contains an older 26 and 22 inventory in one section. Future agents may choose the wrong next slice if they trust the stale number.

6. Tool refresh worker reports are less structured than page refresh reports.
   Page refresh has parseable report aggregation. Tool refresh has strong prompt requirements, but report data is still more dependent on final-answer discipline.

7. Source verification is not yet claim-level enough.
   Source health can prove URL availability and access class. It does not prove that a specific pricing, model, or affiliate claim was checked against a specific source on a specific date.

## 5. Speed And Efficiency Bottlenecks

- Route QA is now the dominant closeout cost for large batches. Recent status docs record 75 routes across seven widths at 126.3s with concurrency 4 and about 85.5s with concurrency 6.
- Typecheck and `build:fast` must remain sequential because Astro content sync can race on `node_modules/.astro/data-store.json`.
- Current-source verification is inherently slow, especially when workers must navigate pricing, account-gated, checkout-gated, region-rendered, or rate-limited sources.
- Repeated broad status reading can burn tokens. The repo has good startup docs, but a machine-readable "required context pack" per workflow would reduce repeated scanning.
- Rust runner commands are useful, but `cargo run` can add avoidable startup overhead unless the binary is already built. This is minor next to route QA and source verification, but worth tracking.
- Affiliate conversion has no planner-generated route set or worker artifacts, so each batch currently needs more human assembly.

## 6. Accuracy And Quality Bottlenecks

- Active commercial pages depend on live pricing, affiliate approval status, and disclosure placement. These need stricter claim receipts than generic source lists.
- Status docs can drift from script output, as shown by affiliate inventory counts.
- Parent and top-layer updates are well specified, but still partially reliant on integrator judgment. Misses are high impact because parent hubs can become stale after child updates.
- Visual precision has a strong law and route QA floor, but aesthetic quality, card balance, and text density are still partly manual.
- Worker source searches can vary. The current-month query rule is excellent, but the workflow should capture exact queries and source result choices when volatile facts change.
- Affiliate page count strategy risks overproduction if the "budget" is treated as target volume instead of a ceiling. The workflow says it is a ceiling, but automation should enforce distinct buyer intent before page creation.

## 7. Non-Regression Guard Assessment

Strong guards:

- `guard:check` covers content, stale facts, em dashes, guide picks, logos, news rendering, hosting runtime, page ledger, and font source policy.
- `tool:refresh:batch:check` adds per-tool quality, changed frontmatter, provenance, hub staleness, freshness, ledger check, em dash guard, and diff check.
- `page-refresh` closeout adds source health, typecheck, build, route QA, report summary, and receipts.
- CI ordering is strict and avoids suppressed failures.
- Guard Challenge Workflow protects against weakening enforcement.

Gaps:

- Workflow docs themselves are under-routed by `check:smart`.
- News and QA workflows lack fully enforceable closeout contracts.
- Claim-level source receipts are not first-class artifacts.
- Tool-refresh worker output does not have the same parseable aggregation contract as page refresh.
- Visual precision is not yet backed by screenshot diffing or route-level layout metrics in the same way source and ledger checks are backed by scripts.

## 8. Parallelism And Subagent Orchestration Assessment

The safest pattern is already proven: six bounded shard workers, up to 10 items each, plus one integrator. This matches observed Codex app limits and keeps shared-file writes centralized.

Useful parallelism today:

- Tool refresh workers can run independently on assigned tool markdown files.
- Page refresh workers can run independently on assigned page files and submit JSON reports.
- Independent review agents can evaluate SEO, visual/mobile quality, and accuracy before finalization.
- Read-only analysis commands and file inspection can be parallelized safely.

Parallelism to avoid:

- `typecheck` and `build:fast` in parallel.
- Worker edits to shared files such as `PAGE_REFRESH_LEDGER.md`, `src/data/source-registry.json`, parent hubs, workflow docs, and `.agent` state.
- One worker per tiny page beyond the observed active-agent ceiling.
- Parallel route QA beyond measured stable concurrency without watching rate, CPU, and flake risk.

Best next orchestration improvement: make affiliate conversion use the page-refresh style report contract, with one shard per buyer cluster and one integrator for source registry, parent hubs, ledger, CTA tracking, and route QA.

## 9. Best Next Improvements

Ranked by quality and accuracy first, then speed and efficiency:

1. Build an affiliate conversion runner.
   Add planner, worker prompt files, JSON report scaffolds, source claim receipts, route args, strict audit closeout, and timed receipt generation.

2. Expand `workflows/news-refresh/README.md`.
   Convert current rules into a date-by-date daily workflow with source discovery, no-action receipts, OG asset handling, affected page propagation, and route QA requirements.

3. Expand `workflows/qa/README.md`.
   Define visual evidence requirements, viewport matrix, screenshot retention policy, layout precision rubric, and when route QA can replace broad smoke tests.

4. Add `workflows/` and `.Agents/` to `operator-surfaces.json`.
   Map workflow changes to `git diff --check`, `guard-em-dashes`, `audit:commands`, relevant script tests, and `check:quick` when appropriate.

5. Add claim-level source receipts.
   Each volatile claim changed should record claim, source URL, source type, verification date, confidence label, query used when applicable, and caveat.

6. Give tool refresh parseable worker reports.
   Mirror page refresh JSON aggregation so source count, caveats, confidence labels, failed checks, and parent notes are machine summarized.

7. Add status-doc consistency checks.
   Compare scripted inventory values against `.agent/CURRENT_STATUS.md` and `.agent/PLANS.md` snippets, or require status docs to cite generated inventory output instead of manual counts.

8. Add a timing baseline ledger for workflow classes.
   Keep per-command medians for planner, worker collection, source health, typecheck, build, route QA, and final review.

9. Add route QA adaptive sharding.
   Split large route matrices by route type and risk, but keep one final combined closeout when public output changed.

10. Build a context pack generator.
   For each workflow, emit the exact docs, scripts, and recent receipts a worker needs, reducing token waste and stale context loading.

## 10. Recommended Timing Schema For Future Runs

Use this timing schema for every non-trivial run:

- Context load: docs read, receipts read, source files read.
- Planning: planner command, queue selection, route set generation.
- Worker launch: prompt generation, worker count, assigned files.
- Worker execution: per worker wall time, per item time, sources checked, failed checks.
- Integration: diff review, shared-file edits, source registry, parent hubs, ledger.
- Cheap gates: each command duration and pass or fail.
- Source verification: per source URL time, access class, broken or unreachable counts.
- Expensive gates: typecheck, build, route QA, smoke tests if used.
- Route QA: per route, per viewport, concurrency, failures, retries.
- Review: SEO/quality, accuracy, visual/mobile, and fixes after review.
- Closeout: report writing, status docs, receipts.
- Total wall time.

For source-heavy content, also time:

- Search time per tool or page.
- Primary-source verification time.
- Account-gated or checkout-gated investigation time.
- Claim receipt creation time.

## 11. Recommended Self-Improvement Loop

After each meaningful batch:

1. Save the runner receipt or a structured manual receipt.
2. Compare actual timings against the latest median for that workflow type.
3. Identify one quality or accuracy miss caught by a guard, reviewer, or route QA.
4. Identify one miss not caught until manual review.
5. Convert the uncaught miss into a guard, scaffold field, checklist item, or route QA option only if it is repeatable.
6. Record the result in the workflow receipt and update the workflow doc only when the change is stable.
7. Reject speed gains that reduce source confidence, visual quality, or non-regression coverage.
8. Re-run the smallest gate that proves the workflow improvement.

For this project, the self-improvement loop should focus first on affiliate conversion, news refresh, and visual QA because those are the least automated high-impact lanes.

## 12. 30/60/90 Day Workflow Evolution Plan

30 days:

- Build the affiliate conversion runner and report schema.
- Add `workflows/` and `.Agents/` routing to `check:smart`.
- Fix status-doc inventory drift by making docs cite generated inventory outputs.
- Expand news refresh and QA workflow placeholders into runnable procedures.
- Add parseable tool-refresh worker reports.

60 days:

- Add claim-level source receipt support to tool, page, affiliate, and news workflows.
- Add route QA timing aggregation by route type, viewport, and failure class.
- Add parent-surface impact planning to affiliate conversion and news refresh.
- Add workflow benchmark summaries under local receipts or `.agent/loop-runs/` for major batches.
- Create reusable reviewer prompts for SEO/quality, accuracy, and visual/mobile with required scores and rejection fields.

90 days:

- Build an adaptive workflow orchestrator that chooses batch size, route QA matrix, and gate depth from changed-surface risk.
- Add screenshot evidence handling for visual precision review.
- Add a workflow regression dashboard from receipts: timings, guard catches, flake rate, source failures, and reopen rate.
- Promote stable runner behavior into `src/data/aipedia-loops.json` where it belongs.
- Add cross-platform adapters for Codex, Claude Code, Cursor, GitHub Copilot agents, and local CLI runners using the same core workflow contracts.

## 13. Verification Commands Used Or Recommended

Used in this analysis:

- `git status --short`: passed before report creation, no output.
- `npm run --silent loop:system -- --json`: passed in 0.44s, seven loops registered.
- `npm run --silent audit:commands -- --json`: passed in 0.43s, command surface and CI invariants green.
- `npm run --silent affiliate:conversion:inventory -- --json`: passed in 0.54s, found 25 configured affiliate-link tools, 21 live affiliate tools, 4 configured-not-live tools, and a 103 page planning ceiling.
- `npm run --silent check:smart -- --json --path workflows/affiliate-conversion-pages/README.md`: passed in 0.43s, but returned only `git diff --check`, which supports the workflow-file routing gap.

Recommended after this report-only change:

- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- `npm run --silent check:smart -- --json --path .Agents/agentic-workflow-software-engineer/analyses/aipedia-project-analysis-2026-06-27.md`

Recommended for future workflow changes:

- `npm run audit:commands -- --json`
- `npm run check:quick`
- Focused tests for any changed planner, guard, runner, or audit script.
- `npm run runner:tool-refresh:closeout -- --skip-build --skip-route-qa` for tool-refresh workflow-only closeout tests.
- `npm run runner:page-refresh:closeout -- --skip-build --skip-route-qa --skip-source-health` for page-refresh workflow-only closeout tests.
- Full `typecheck`, `build:fast`, and route QA only when rendered output, runtime behavior, content, SEO, schema, affiliate surfaces, or deployment confidence is affected.
