# 2026-06-30 Agentic Tooling Meta Slice 14

## Task

Add workflow-specific closeout policy validation for runner receipts so tool-refresh and page-refresh closeouts cannot pass as generic JSON while missing required workflow evidence.

## Files Changed

- `scripts/agent-closeout-receipt-check.mjs`
- `tests/scripts/agent-closeout-receipt-check.test.mjs`
- `scripts/README.md`
- `docs/agentic-tooling-meta-compliance.md`
- `workflows/tool-refresh/README.md`
- `workflows/page-refresh/README.md`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/meta/2026-06-30-agentic-tooling-meta-compliance.json`
- `.agent/loop-runs/system/2026-06-30T05-08-32-418Z-loop-run.json`
- `.agent/loop-runs/system/latest.json`

The separate Captions/Synthesia content WIP remains unstaged and outside this system slice.

## System Changes

- Added `agent:closeout:check --require-workflow-policy`.
- Tool-refresh policies require core command labels, plan and route-args artifacts, markdown and JSON receipt artifacts, closeout-command artifacts, changed-route artifacts, and source-id artifacts.
- Page-refresh policies require core command labels, plan, worker-report-dir, worker-report-summary, markdown and JSON receipt artifacts, closeout-command artifacts, changed-route artifacts, and source-id artifacts.
- Passed runner receipts must include the standard route QA widths, changed routes, zero-status commands, embedded `system_progress`, matching trace name, and fresh matching `input_freshness`.
- Workflow docs now instruct operators to validate runner JSON receipts with `--require-workflow-policy` before recording production closeouts.

## Verification

- `node --check scripts/agent-closeout-receipt-check.mjs`
- `node --test tests/scripts/agent-closeout-receipt-check.test.mjs`
- `npm run check:smart -- --path scripts/agent-closeout-receipt-check.mjs --path tests/scripts/agent-closeout-receipt-check.test.mjs --path scripts/README.md --path docs/agentic-tooling-meta-compliance.md --path workflows/tool-refresh/README.md --path workflows/page-refresh/README.md --path .agent/CURRENT_STATUS.md --path .agent/PLANS.md --path .agent/meta/2026-06-30-agentic-tooling-meta-compliance.json --run --json`
- `npm run check:quick`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- `npm --silent run loop:system -- --json`
- `npm --silent run loop:all:record -- --goal-id 2026-06-30-agentic-tooling-meta-os --run-id 2026-06-30-slice-14-workflow-closeout-policy --require-system-progress --json`
- `npm --silent run agent:closeout:check -- --receipt .agent/loop-runs/system/latest.json --require-system-progress --require-closeout-identity --require-trace-artifacts --json`

## Risks

- The new policy is proven with fixtures and full script tests, but still needs to be run against bounded production runner receipts.
- Affiliate handoff receipts are not yet covered by workflow policy validation.
- The latest broad loop receipt still reflects unrelated local content WIP in the dirty tree; those content files were not part of this slice.

## Next Actions

1. Prove the input refresh policy through one bounded runner or content pilot.
2. Prove workflow policy validation on bounded production runner receipts.
3. Extend closeout policy validation to affiliate handoff receipts.
