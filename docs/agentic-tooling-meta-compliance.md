# AiPedia Agentic Tooling Meta Compliance

Date: 2026-06-30

This is the living compliance audit for the June 30, 2026 AiPedia Agentic Tooling Meta Operating System goal. It exists to prevent a repeat of content-only looping being mistaken for operating-system progress.

## Source Of Truth

- Original large Codex operating-system refactor prompt.
- Six-specialist-reviewed June 30 meta spec.
- Active `/goal` objective.
- Existing repo operating docs: `INDEX.md`, `.agent/CURRENT_STATUS.md`, `.agent/LOOPS.md`, `.agent/OPERATING_RULES.md`, `docs/parallel-tooling-architecture.md`, `docs/agent-memory-system.md`, and `docs/page-quality-scoring.md`.

## Operating Rule

A loop counts as June 30 meta progress only when it improves or validates at least one system artifact:

- script
- runner
- guard
- test
- workflow doc
- skill contract
- scoring model
- memory schema
- receipt schema
- pause/resume behavior
- DAG planner
- evaluation harness
- automation

Content pages, comparison pages, tool refreshes, affiliate pages, and news posts are test workloads. They are not progress by themselves.

## First System Slice

This slice hardens three failure points from the June 29 to June 30 overnight loop.

1. Stale planner input can now be enforced.
   - `npm run loop:next -- --fail-on-stale-backlog --json`
   - Blocks when `src/data/coverage-backlog.json` is stale, invalid, or missing a generated timestamp.

2. System progress can now be checked.
   - `npm run agent:system-progress -- --require-system-artifact --json`
   - Fails content-only diffs when a loop claims operating-system progress.

3. Long-running work can now write a structured pause receipt.
   - `npm run agent:pause-receipt -- --goal-id <id> --safe-resume-step <step> --in-progress-step <step> --json`
   - Records dirty tree state, touched files, safe resume point, validation done, validation pending, must-not-repeat items, and next commands.

## Second System Slice

Loop receipts now carry the system-progress checkpoint directly.

- `npm run loop:all:record -- --require-system-progress --json`
- Writes `system_progress` into the timestamped loop receipt and `latest.json`.
- Fails when no system artifact changed, so content-only diffs cannot be recorded as June 30 operating-system progress.
- Verified by `.agent/loop-runs/system/2026-06-30T03-01-47-100Z-loop-run.json`.

## Third System Slice

Closeout receipts now have a deterministic validator.

- `npm run agent:closeout:check -- --receipt .agent/loop-runs/system/latest.json --require-system-progress --json`
- Validates loop-run receipts and Rust runner `aipedia.closeout-receipt.v1` JSON.
- `--all-system` validated 22 existing system loop receipts with 0 issues.
- Focused tests cover valid enforced loop receipts, missing system-progress failures, valid runner closeouts, and malformed runner commands.

## Fourth System Slice

Rust runner closeouts now join the same system-progress contract.

- Tool-refresh and page-refresh closeout JSON include `system_progress` when `scripts/agent-system-progress-check.mjs` is available.
- The embedded project dir and command string are normalized for portable receipts.
- Rust tests assert the field on both tool and page closeout receipts.
- `agent:closeout:check` validates runner `system_progress` when present.

## Fifth System Slice

Loop and runner closeouts now share explicit closeout identity fields.

- `loop:all:record` accepts `--goal-id`, `--run-id`, repeatable `--risk`, and repeatable `--next-action`.
- Loop receipts and `latest.json` include `goal_id`, `run_id`, `residual_risks`, and `next_actions`.
- Rust runner tool-refresh and page-refresh closeout JSON include the same fields, with environment overrides from `AIPEDIA_GOAL_ID`, `AIPEDIA_RUN_ID`, `AIPEDIA_RESIDUAL_RISKS`, and `AIPEDIA_NEXT_ACTIONS`.
- `agent:closeout:check --require-closeout-identity` enforces the identity field contract for meta-goal closeouts.
- Focused Node and Rust tests cover loop identity persistence, missing identity failures, and runner receipt shape.

## Sixth System Slice

Planner stale-input gates now cover the major refresh planners.

- `tool-refresh-batch.mjs --fail-on-stale-inputs` validates that the live freshness report has a fresh `generated_at` and emits `input_freshness` in the plan.
- `page-refresh-batch.mjs --fail-on-stale-ledger` blocks when the default `PAGE_REFRESH_LEDGER.md` is out of date, with an actionable `ledger:pages` recovery step.
- `affiliate-conversion-plan.mjs --fail-on-stale-inputs` validates that the live affiliate inventory has a fresh `generated_at` and emits `input_freshness` in the plan.
- The Rust runner forwards strict stale-input flags for tool, page, and affiliate planning.
- Focused planner tests cover passing live inputs and a stale default page-ledger blocker.

## Seventh System Slice

Non-stale scoring is now schema-versioned and decay-aware.

- `agent-page-quality-score.mjs` emits `aipedia.page-quality-score.v2`.
- Page-type profiles now control weights for high-volatility tools, tools, comparisons, guides, affiliate buyer pages, news, and default static routes.
- `stale_decay` records page age, source age, stale-signal decay, freshness windows, source windows, labels, and score penalties.
- The final page `score` is the `raw_score` minus the stale-decay score penalty, so old high historical scores cannot pass unchanged.
- `risk_profile` and `confidence_profile` expose deterministic labels, scores, and reasons for loop routing.
- `agent-score-calibration.mjs` carries the new fields into calibration output and summary label counts.
- Focused tests prove high-volatility pages decay when stale and that calibration preserves risk, confidence, and stale-decay fields.

## Eighth System Slice

Closeout receipts now carry trace and artifact references.

- `loop:all:record` receipts include `trace` with trace ID, span ID, optional parent span ID, start/end times, and duration.
- `loop:all:record` receipts include `artifact_refs` for the loop registry, timestamped receipt, latest receipt, declared record targets, embedded commands, and checked built output.
- Rust runner tool-refresh and page-refresh closeout JSON includes matching `trace` and `artifact_refs` blocks.
- Runner artifact refs cover plans, route args, worker report directories, worker report summaries, markdown receipts, JSON receipts, changed routes, source IDs, commands, and command detail outputs.
- `agent:closeout:check --require-trace-artifacts` enforces the trace and artifact reference contract.
- Focused Node and Rust tests prove the emitted fields and required-field failure path.

## Ninth System Slice

Non-stale scoring now has a gold-set calibration gate and threshold review.

- `agent:score:calibrate -- --gold-set .agent/evals/score-calibration-goldset.json --json` evaluates committed expectations against real routes.
- Gold-set checks cover recommended action, calibration label, risk label, confidence label, stale-decay label, score bounds, source count, parent-surface count, stale-signal count, and internal-link bounds.
- Calibration output includes a `gold_set` block with per-case pass or mismatch detail.
- Calibration output includes a `threshold_review` block that flags unsafe threshold combinations such as high-risk monitor actions, low-confidence weak remediation, high stale decay with high score, and gold-set mismatches.
- The first committed receipt is `.agent/evals/score-calibration-receipts/2026-06-30-slice-09-score-goldset.json`, with 3 passing cases, 0 mismatches, and threshold review `pass`.
- Focused tests prove passing gold-set expectations and deliberate mismatch reporting.

## Tenth System Slice

Generated planner inputs now have one shared freshness receipt.

- `agent:input-freshness -- --all --json` checks decision-content backlog, tool-refresh freshness report, page-refresh ledger, and affiliate-conversion inventory in one schema.
- The receipt emits `aipedia.input-freshness-receipt.v1` with workflow IDs, input kinds, refresh commands, enforce commands, status labels, next actions, and summary counts.
- `--require-fresh` exits non-zero when any checked input is stale, missing, invalid, or failed.
- `--workflow <id>` scopes the check to one or more workflows for cheap preflight gates.
- Focused tests prove a fresh decision backlog, a stale decision backlog blocker, and current or stale page-ledger states.
- The first all-workflow receipt is `.agent/evals/input-freshness-receipts/2026-06-30-slice-10-input-freshness.json`. It correctly reports decision-content, tool-refresh, and affiliate-conversion fresh, and page-refresh stale because the separate Synthesia content WIP has not had the ledger regenerated.

## Eleventh System Slice

Runner closeouts now embed workflow-specific input-freshness receipts.

- Tool-refresh closeout JSON includes `input_freshness` from `agent-input-freshness-receipt.mjs --workflow tool-refresh`.
- Page-refresh closeout JSON includes `input_freshness` from `agent-input-freshness-receipt.mjs --workflow page-refresh`.
- The runner normalizes `project_dir`, `command`, and `exit_code` in the embedded receipt so future agents can replay the exact preflight.
- `agent:closeout:check` validates `input_freshness` when present, including schema version, workflow match, summary counts, command metadata, and per-workflow status.
- Focused Rust tests prove both runner closeout paths emit the correct workflow-specific receipt.
- Focused Node tests prove the closeout validator accepts valid runner receipts and fails a runner receipt whose embedded input-freshness workflow does not match the closeout workflow.

## Twelfth System Slice

Generated planner inputs now have an explicit safe auto-refresh policy.

- `agent:input-freshness -- --workflow <id> --refresh-stale --json` produces a non-mutating `refresh_plan` for stale inputs.
- `--apply-refreshes` executes eligible refresh commands and re-checks the selected workflows.
- Tracked generated-file refreshes require both explicit `--workflow <id>` and `--allow-tracked-mutations`.
- Decision-content backlog refreshes write `src/data/coverage-backlog.json` through `audit-coverage-gaps.mjs`.
- Page-refresh ledger refreshes write `PAGE_REFRESH_LEDGER.md` through `generate-page-refresh-ledger.mjs`.
- Focused tests prove blocked tracked refreshes without acknowledgement, successful decision backlog refresh, and successful page ledger refresh in fixture projects.
- A live dry-run against the current stale page ledger produced a planned refresh without changing the separate Synthesia content WIP.

## Compliance Matrix

| Workstream | Status | Evidence | Next System Target |
|---|---:|---|---|
| Spec compliance audit | Partial | `.agent/meta/2026-06-30-agentic-tooling-meta-compliance.json` | Keep updated after each slice. |
| Stale input handling | Partial | `decision-loop --fail-on-stale-backlog`, tool/page/affiliate planner `input_freshness`, page `--fail-on-stale-ledger`, runner strict planner flags, `agent:input-freshness --refresh-stale`, runner `input_freshness` closeout field, `.agent/evals/input-freshness-receipts/2026-06-30-slice-10-input-freshness.json` | Prove the refresh policy through one bounded runner or content pilot and decide which workflows should auto-apply in automation. |
| System-progress checkpoint | Partial | `agent:system-progress`, `loop:all:record --require-system-progress`, Rust runner `system_progress` closeout field | Keep enforcing on every meta closeout and pilot. |
| Pause/resume receipts | Partial | `agent:pause-receipt` | Add schema validation and runner integration. |
| DAG contracts | Partial | `runner:agent-plan` and architecture docs | Standardize node IDs, permissions, validators, artifacts, and traces across workflows. |
| Closeout receipts/traces | Partial | loop and runner `trace`, `artifact_refs`, closeout identity fields, runner `system_progress`, runner `input_freshness`, `agent:closeout:check --require-trace-artifacts` | Expand trace refs into workflow-specific closeout policies and bounded production pilots. |
| Non-stale scoring | Partial | `agent:score` v2, `agent:score:calibrate`, `stale_decay`, `risk_profile`, `confidence_profile`, focused tests, calibration summaries, `.agent/evals/score-calibration-goldset.json`, `.agent/evals/score-calibration-receipts/2026-06-30-slice-09-score-goldset.json` | Expand the gold set during real workload pilots and add governance for deliberate baseline changes. |
| Speed/token efficiency | Partial | six-worker workflows, timing receipts | Add context budget, correction rate, flake rate, and system-progress metrics. |
| Memory/retrieval | Partial | JSONL memory tools | Enforce expiration and promotion rules during retrieval. |
| Rust/CuPy/GPU gating | Partial | roadmap and CPU memory baseline | Require measured hotspots before acceleration work. |

## Review Lenses

Every future slice must pass a self-review against six lenses:

1. Architecture: deterministic planner, DAG, ownership, serial shared-state integration.
2. Evaluation and scoring: non-stale signals, calibrated thresholds, regression coverage.
3. Speed and token efficiency: compact JSON, batched gates, no unnecessary subagents.
4. Editorial and factuality: current sources, confidence labels, affiliate restraint, no false-vs pages.
5. Observability and pause/resume: receipts, trace fields, dirty tree ownership, safe resume.
6. Rollout and governance: branch hygiene, no URL/SEO/affiliate regressions, focused tests, no guard weakening.

## Definition Of Done

This audit can move from partial to complete only when the operating system is system-first, measurable, traceable, replayable, pause-safe, eval-driven, token-efficient, source-accurate, SEO/affiliate-safe, documented, tested on real workloads, committed, pushed, and reviewed against the original and June 30 specs.
