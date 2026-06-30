# 2026-06-30 Agentic Tooling Meta Slice 23

## Task

Enforce memory expiration and promotion rules during JSONL memory retrieval so future agents do not rank stale memory as current evidence.

## Files Changed

- `scripts/agent-memory-query.mjs`
- `scripts/agent-memory-record.mjs`
- `tests/scripts/agent-memory-tools.test.mjs`
- `.agent/memory/schema.json`
- `docs/agent-memory-system.md`
- `scripts/README.md`
- `docs/agentic-tooling-meta-compliance.md`
- `.agent/meta/2026-06-30-agentic-tooling-meta-compliance.json`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/WORK_LOG.md`
- `.agent/loop-runs/2026-06-30-agentic-tooling-meta-slice-23.md`

## System Change

`agent:memory:query` now applies retrieval policy before returning matches.

- Expired records are hidden by default.
- `--include-expired` keeps expired records visible for historical investigation with a strong freshness penalty.
- `--current-date YYYY-MM-DD` makes expiration deterministic.
- `--route /path/` promotes same-route memory.
- Query output keeps `score` as the raw lexical score and adds `rank_score` for promotion and freshness ordering.
- Each match includes `retrieval` metadata: priority, promotion weight, freshness weight, age, expiration window, expiration date, expired status, and include-expired mode.

`agent:memory:record` now writes explicit `expires_after_days` and `retrieval_priority` fields for page snapshots, quality notes, impact summaries, and source records.

## Verification

- `node --check scripts/agent-memory-query.mjs`
- `node --check scripts/agent-memory-record.mjs`
- `node --test tests/scripts/agent-memory-tools.test.mjs`
- JSON parse check for `.agent/memory/schema.json`
- `npm --silent run agent:memory:record -- --route /tools/cursor/ --current-date 2026-06-30 --out local/tmp/slice23-memory-policy.jsonl --json`
- `npm --silent run agent:memory:query -- --memory local/tmp/slice23-memory-policy.jsonl --query "cursor pricing source" --current-date 2026-06-30 --route /tools/cursor/ --json`
- `npm run check:smart -- --path scripts/agent-memory-query.mjs --path scripts/agent-memory-record.mjs --path tests/scripts/agent-memory-tools.test.mjs --path .agent/memory/schema.json --path docs/agent-memory-system.md --path scripts/README.md --path docs/agentic-tooling-meta-compliance.md --path .agent/meta/2026-06-30-agentic-tooling-meta-compliance.json --path .agent/CURRENT_STATUS.md --path .agent/PLANS.md --path .agent/WORK_LOG.md --path .agent/loop-runs/2026-06-30-agentic-tooling-meta-slice-23.md`
- `git diff --check -- scripts/agent-memory-query.mjs scripts/agent-memory-record.mjs tests/scripts/agent-memory-tools.test.mjs .agent/memory/schema.json docs/agent-memory-system.md scripts/README.md docs/agentic-tooling-meta-compliance.md .agent/meta/2026-06-30-agentic-tooling-meta-compliance.json .agent/CURRENT_STATUS.md .agent/PLANS.md .agent/WORK_LOG.md .agent/loop-runs/2026-06-30-agentic-tooling-meta-slice-23.md`
- `npm run check:quick`
- `npm --silent run loop:system -- --json`
- `npm --silent run loop:all:record -- --goal-id 2026-06-30-agentic-tooling-meta-os --run-id 2026-06-30-slice-23-memory-policy --risk "Memory retrieval policy is still CPU lexical and deterministic; no semantic reranker or exact model-token usage is available." --next-action "Add correction-rate metrics once reliable inputs exist." --next-action "Run a positive bounded page-refresh policy proof after the separate Synthesia content WIP is resolved." --require-system-progress --json`
- `npm --silent run agent:efficiency:trends -- --max-runs 2 --fail-on-missing-metrics --json`
- `npm --silent run agent:closeout:check -- --receipt .agent/loop-runs/system/latest.json --require-system-progress --require-closeout-identity --require-trace-artifacts --require-efficiency-metrics --json`

## Live Smoke

The live query returned `source_record:cursor-pricing:tools:cursor:2026-06-30` as the top match with raw score `0.666666`, `rank_score` `1.033332`, priority `primary_source:same_route`, promotion weight `1.55`, age `0`, expiry window `30` days, and `expires_at` `2026-07-30`.

## Enforced Closeout

- Enforced loop receipt: `.agent/loop-runs/system/2026-06-30T06-36-23-004Z-loop-run.json`.
- Closeout guard passed with required system progress, closeout identity, trace artifacts, and efficiency metrics.
- Efficiency trend check analyzed 2 metric-aware receipts, 0 missing metrics, median wall duration `5101` ms, latest wall duration `5221` ms, latest full receipt bytes `42868`, latest estimated full receipt tokens `10717`, and latest system artifact count `12`.
- Stability trend check found 7 loop status comparisons, 0 loop status changes, 16 command status comparisons, 0 command status changes, and persistent attention in `freshness`, `performance-ux`, and `revenue-conversion`.

## Risks

- This is still CPU lexical retrieval, not semantic reranking.
- Expiration policy is deterministic and conservative, but it depends on `observed_at` and `expires_after_days` being present or inferable.
- Exact model-token usage is still not available from the runtime.
- The loop receipt honestly records the pre-existing Synthesia content WIP in the dirty tree. That WIP remains intentionally unstaged and outside this system commit.

## Next Actions

1. Add correction-rate metrics once reliable inputs exist.
2. Add memory compaction or promotion receipts if durable `.agent/memory/agent-memory.jsonl` grows large.
3. Run a positive bounded page-refresh policy proof after the separate Synthesia content WIP is resolved.
