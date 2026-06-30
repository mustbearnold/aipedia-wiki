# 2026-06-30 Agentic Tooling Meta Slice 37

## Task

Add a fail-closed closeout mode that requires checked DAG proof artifacts.

## Files Changed

- `scripts/agent-closeout-receipt-check.mjs`
- `tests/scripts/agent-closeout-receipt-check.test.mjs`
- `.agent/meta/2026-06-30-agentic-tooling-meta-compliance.json`
- `docs/agentic-tooling-meta-compliance.md`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/WORK_LOG.md`
- `.agent/loop-runs/system/2026-06-30T09-17-30-980Z-loop-run.json`
- `.agent/loop-runs/system/latest.json`

## System Change

`agent:closeout:check` now accepts `--require-dag-proof`. When enabled for loop or runner closeout receipts, the checker requires both an output `agent-task-dag` artifact ref and an output `agent-task-dag-validation-report` artifact ref. It validates both referenced files and confirms the validation report references at least one attached DAG graph path.

## Verification

- `node --check scripts/agent-closeout-receipt-check.mjs`
- `node --test tests/scripts/agent-closeout-receipt-check.test.mjs`
- `npm --silent run agent:closeout:check -- --receipt .agent/loop-runs/system/latest.json --require-system-progress --require-closeout-identity --require-trace-artifacts --require-efficiency-metrics --require-dag-proof --json`
- `npm --silent run agent:closeout:check -- --receipt .agent/evals/runner-dag-closeouts/2026-06-30-slice-36-receipts/2026-06-30T09-05-41Z-tool-refresh-closeout.json --require-closeout-identity --require-trace-artifacts --require-workflow-policy --require-dag-proof --json`
- `npm --silent run agent:closeout:check -- --receipt .agent/loop-runs/system/2026-06-30T08-48-03-374Z-loop-run.json --require-closeout-identity --require-trace-artifacts --require-dag-proof --json`
- `git diff --check`
- `node scripts/guard-em-dashes.mjs`
- `npm run check:smart -- --path scripts/agent-closeout-receipt-check.mjs --path tests/scripts/agent-closeout-receipt-check.test.mjs --path .agent/CURRENT_STATUS.md --path .agent/PLANS.md --path .agent/WORK_LOG.md --path .agent/meta/2026-06-30-agentic-tooling-meta-compliance.json --path .agent/loop-runs/2026-06-30-agentic-tooling-meta-slice-37.md --path docs/agentic-tooling-meta-compliance.md --run --json`
- `npm run check:quick`
- `npm --silent run loop:system -- --json`
- `npm --silent run loop:all:record -- --goal-id 2026-06-30-agentic-tooling-meta-os --run-id 2026-06-30-slice-37-required-dag-proof-closeout-mode --risk "The required DAG proof mode exists, but standard meta closeout commands still need to invoke it when DAG planning is expected." --risk "Generic DAG execution remains intentionally deferred until checked planning and closeout proof contracts are stable." --next-action "Wire --require-dag-proof into the standard meta closeout command surface where DAG planning is expected." --next-action "Run a positive bounded page-refresh policy proof after the separate Synthesia WIP and stale ledger blocker are resolved." --dag-graph .agent/evals/agent-dag-contracts/2026-06-30-slice-34-cursor-agent-task-graph.json --dag-validation-report .agent/evals/agent-dag-contracts/2026-06-30-slice-34-cursor-agent-task-graph.validation.json --require-system-progress --json`
- `npm --silent run agent:closeout:check -- --receipt .agent/loop-runs/system/latest.json --require-system-progress --require-closeout-identity --require-trace-artifacts --require-efficiency-metrics --require-dag-proof --json`
- `npm --silent run agent:efficiency:trends -- --max-runs 2 --fail-on-missing-metrics --json`

The older Slice 34 required-proof check is expected to fail because that loop receipt does not attach DAG proof refs.

Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T09-17-30-980Z-loop-run.json`.

Trend proof: 2 metric-aware receipts, 0 missing metrics, 0 loop status changes, 0 command status changes, latest wall duration 5097 ms, latest estimated full receipt tokens 10845, and latest system artifact count 8.

## Risks

- The required mode exists, but standard meta closeout commands still need to invoke it when DAG planning is expected.
- Generic DAG execution remains intentionally deferred until checked planning and closeout proof contracts are stable.
- Separate Synthesia content WIP remains outside this system slice and is not part of the commit.

## Next Action

Wire `--require-dag-proof` into the standard meta closeout command surface where DAG planning is expected.
