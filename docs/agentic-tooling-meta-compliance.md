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

## Compliance Matrix

| Workstream | Status | Evidence | Next System Target |
|---|---:|---|---|
| Spec compliance audit | Partial | `.agent/meta/2026-06-30-agentic-tooling-meta-compliance.json` | Keep updated after each slice. |
| Stale input handling | Partial | `decision-loop --fail-on-stale-backlog` | Extend to page/tool/affiliate planners. |
| System-progress checkpoint | Partial | `agent:system-progress` | Wire into loop record and runner closeouts. |
| Pause/resume receipts | Partial | `agent:pause-receipt` | Add schema validation and runner integration. |
| DAG contracts | Partial | `runner:agent-plan` and architecture docs | Standardize node IDs, permissions, validators, artifacts, and traces across workflows. |
| Closeout receipts/traces | Partial | existing runner and loop receipts | Normalize `goal_id`, `run_id`, spans, source IDs, route widths, and supersession. |
| Non-stale scoring | Partial | `agent:score`, calibration docs | Add risk/confidence fields, score decay tests, and gold-set calibration. |
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
