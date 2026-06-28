# AiPedia Workflow Plan Index

Date: 2026-06-27
Roadmap: `.agent/specialists/agentic-workflow-software-engineer/plans/aipedia-workflow-success-roadmap-2026-06-27.md`

Use this index to choose the next implementation slice. Quality and accuracy outrank speed.

| Priority | Plan module | Depends on | Likely owner role | Difficulty | First step |
|---:|---|---|---|---|---|
| 1 | Check-smart and operator-surface routing | None | Tooling engineer | Medium | Inspect `src/data/operator-surfaces.json` and run `npm run check:smart -- --json --path workflows/affiliate-conversion-pages/README.md`. |
| 2 | Affiliate conversion runner | Routing improvement preferred | Workflow runner engineer plus affiliate editor | High | Run `npm run affiliate:conversion:inventory -- --json` and inspect `workflows/affiliate-conversion-pages/README.md`. |
| 3 | Claim-level source receipts | Affiliate runner schema | Trust and provenance engineer | High | Inspect `scripts/audit-provenance-pricing.mjs` and current worker report templates. |
| 4 | Status-doc consistency checks | None, but pair with affiliate runner | Tooling engineer | Medium | Compare `npm run affiliate:conversion:inventory -- --json` against `.agent/CURRENT_STATUS.md` and `.agent/PLANS.md`. |
| 5 | News refresh workflow | Operator routing helpful | Editorial workflow engineer | Medium | Inspect `workflows/news-refresh/README.md`, `.agent/LOOPS.md`, and recent news loop receipts. |
| 6 | Canonical QA workflow | Operator routing helpful | QA and frontend workflow engineer | Medium | Inspect `workflows/qa/README.md`, `scripts/qa-route.mjs`, and route QA receipts. |
| 7 | Parseable tool refresh reports | Claim receipt schema helpful | Runner engineer | Medium high | Inspect `workflows/tool-refresh/worker-prompt.md`, `scripts/tool-refresh-batch.mjs`, and page-refresh report aggregation. |
| 8 | Timing benchmark ledger | Runner receipt stability | Runner engineer | Medium | Inspect `tools/aipedia-runner/src/main.rs` receipt writers and recent `local/tmp` or `.agent/loop-runs` timing notes. |
| 9 | Route QA adaptive sharding | QA workflow and timing ledger | QA tooling engineer | High | Inspect page-refresh route QA policy classes and `scripts/qa-route.mjs` timing output. |
| 10 | Workflow context-pack generator | Stable planner schemas | Workflow platform engineer | Medium high | Inspect planner outputs for tool refresh and page refresh, then define a shared context-pack schema. |

## Recommended First Slice

Start with priority 1, then design priority 2 without content edits.

1. Add routing for `workflows/**` and `.agent/specialists/**`.
2. Add focused `check-smart` tests.
3. Verify workflow docs no longer route only to `git diff --check`.
4. Draft affiliate runner schema and report scaffold.
5. Stop before editing content or public pages.

## Dependency Notes

- Affiliate runner should own the first version of claim-level receipts because affiliate pages carry the highest commercial and trust risk.
- News and QA docs can be expanded before runner support, but runner support should wait until their manual workflow fields stabilize.
- Adaptive route QA should not reduce coverage until timing data proves it can do so without missing high-risk mobile or commercial routes.
- Context packs should be generated from canonical workflow docs and planner output, not maintained as separate hand-written duplicates.

## Owner Role Definitions

- Tooling engineer: updates scripts, routing contracts, tests, command surfaces, and non-rendered checks.
- Workflow runner engineer: updates Rust runner commands, planner artifacts, receipts, report aggregation, and timing outputs.
- Affiliate editor: validates buyer intent, affiliate approval state, CTA trust, and commercial claim language.
- Trust and provenance engineer: designs source receipts, confidence labels, claim checks, and source-health integration.
- Editorial workflow engineer: owns news date coverage, source discovery, no-action receipts, affected page propagation, and news closeout.
- QA and frontend workflow engineer: owns route QA, visual evidence, viewport matrices, layout precision rubric, and screenshot policy.
- Workflow platform engineer: owns context packs and platform adapters for Codex, Claude Code, Cursor, GitHub Copilot agents, and local CLI runners.

## First Commands By Plan

- Routing: `npm run check:smart -- --json --path workflows/affiliate-conversion-pages/README.md`
- Affiliate runner: `npm run affiliate:conversion:inventory -- --json`
- Claim receipts: `npm run audit:provenance:changed -- --json`
- Status consistency: `npm run affiliate:conversion:inventory -- --json`
- News workflow: `npm run loop:news -- --json`
- QA workflow: `npm run qa:route -- --help`
- Tool reports: `npm run tool:refresh:batch -- --limit 1 --max-workers 1 --tools-per-worker 1 --json`
- Timing ledger: `npm run runner:page-refresh:reports`
- Route sharding: inspect `local/tmp/aipedia-runner/page-refresh/*route-qa-args.txt` after a page-refresh plan.
- Context packs: `npm run runner:tool-refresh:plan -- --limit 1 --workers 1 --tools-per-worker 1`

## Stop Conditions

- Stop and ask for direction if a plan requires content edits before the workflow contract is accepted.
- Stop if a proposed speed improvement removes a current accuracy, source, mobile, SEO, affiliate, or non-regression gate.
- Stop if worker ownership requires shared-file edits by shard workers.
- Stop if `typecheck` and `build:fast` would be run in parallel.
