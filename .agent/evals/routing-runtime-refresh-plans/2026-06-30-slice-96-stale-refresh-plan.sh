#!/usr/bin/env bash
set -euo pipefail

# AiPedia routing runtime refresh command plan
# Receipt: .agent/evals/routing-runtime-refresh-plans/2026-06-30-slice-96-stale-refresh-plan.json
# Run id: 2026-06-30-slice-96-runbook-drift
# Status: refresh-required
# Generated at: 2026-07-01T09:20:37.771Z
# Change id: 2026-06-30-slice-96-runbook-drift

# Step 1: Capture fresh correction telemetry
npm --silent run agent:correction:adapt -- --events-jsonl .agent/evals/correction-telemetry-adapters/2026-06-30-slice-96-runtime-refresh-events.jsonl --normalized-out .agent/evals/routing-runtime-refresh-plans/2026-06-30-slice-96-runbook-drift-correction-normalized.json --out .agent/evals/routing-runtime-refresh-plans/2026-06-30-slice-96-runbook-drift-correction-telemetry.json --json

# Step 2: Build a fresh routing evaluation suite
npm --silent run agent:routing:suite -- --input .agent/evals/routing-suites/2026-06-30-slice-96-runtime-refresh-suite-input.json --out .agent/evals/routing-runtime-refresh-plans/2026-06-30-slice-96-runbook-drift-routing-suite.json --json

# Step 3: Build a fresh post-default routing monitor
npm --silent run agent:routing:monitor -- --default-rollout .agent/evals/routing-rollouts/2026-06-30-slice-86-default-enabled-rollout-receipt.json --suite .agent/evals/routing-runtime-refresh-plans/2026-06-30-slice-96-runbook-drift-routing-suite.json --rollback-command "npm --silent run agent:routing:policy -- --rollback 2026-06-30-slice-96-runbook-drift --json" --rollback-verify "npm --silent run agent:meta:closeout:auto -- --receipt .agent/evals/routing-monitors/2026-06-30-slice-96-runtime-refresh-monitor.json --json" --out .agent/evals/routing-runtime-refresh-plans/2026-06-30-slice-96-runbook-drift-routing-monitor.json --json

# Step 4: Regenerate repeated monitor trend evidence
npm --silent run agent:routing:monitor:trends -- --monitor .agent/evals/routing-monitors/2026-06-30-slice-87-post-default-monitor-receipt.json --monitor .agent/evals/routing-runtime-refresh-plans/2026-06-30-slice-96-runbook-drift-routing-monitor.json --out .agent/evals/routing-runtime-refresh-plans/2026-06-30-slice-96-runbook-drift-monitor-trends.json --json

# Step 5: Regenerate longer-window monitor trend rollup
npm --silent run agent:routing:monitor:trend-rollup -- --trend .agent/evals/routing-monitor-trends/2026-06-30-slice-89-post-default-monitor-trends.json --trend .agent/evals/routing-runtime-refresh-plans/2026-06-30-slice-96-runbook-drift-monitor-trends.json --out .agent/evals/routing-runtime-refresh-plans/2026-06-30-slice-96-runbook-drift-monitor-trend-rollup.json --json

# Step 6: Rerun strict runtime completion
npm --silent run agent:routing:runtime:complete -- --handoff .agent/evals/routing-handoffs/2026-06-30-slice-90-runtime-default-change-handoff-receipt.json --monitor-trends .agent/evals/routing-monitor-trends/2026-06-30-slice-89-post-default-monitor-trends.json --monitor-trend-rollup .agent/evals/routing-runtime-refresh-plans/2026-06-30-slice-96-runbook-drift-monitor-trend-rollup.json --require-monitor-trend-rollup --model-token-usage .agent/evals/model-token-usage/2026-06-30-slice-91-runtime-completion-token-usage.json --require-model-token-usage --runtime-system aipedia-agent-router --applied-at 2026-07-02T00:05:00.000Z --verification-status passed --out .agent/evals/routing-runtime-refresh-plans/2026-06-30-slice-96-runbook-drift-runtime-completion.json --json

