# Parallel Research

## Purpose

Split evidence gathering into safe parallel tasks while keeping final synthesis, patching, and validation serial.

## When to use

Use this skill for multi-source research, tool refresh batches, comparison evidence gathering, news discovery, source audits, and memory retrieval planning.

## Required inputs

- Workflow name.
- Entity or route scope.
- Parallel tasks.
- Join output.
- Current date.
- Shared-file boundaries.

## Output format

- Task graph.
- Worker boundaries.
- Evidence bundle contract.
- Serial integration steps.
- Validation plan.

## Workflow steps

1. Define the workflow and inputs.
2. Split read-only or isolated-file work into parallel tasks.
3. Name shared files that only the integrator can edit.
4. Define the evidence bundle schema.
5. Run or assign parallel tasks.
6. Join results and deduplicate evidence.
7. Perform final synthesis serially.
8. Patch, validate, and report.

## Safety rules

- Parallelism is for evidence gathering, not final judgment.
- Workers must not edit shared ledgers, source registry, parent hubs, top-layer pages, or `.agent/` docs unless explicitly assigned.
- Do not run expensive builds per worker.
- Do not accept worker claims without source receipts.

## Validation steps

- Validate worker reports or task outputs.
- Run the grouped workflow check.
- Run final typecheck, build, and route QA once after integration when needed.
- Record timing and failed-then-fixed checks.

## Related scripts

- `npm run runner:tool-refresh:plan`
- `npm run runner:tool-refresh:closeout`
- `npm run runner:page-refresh:plan`
- `npm run runner:page-refresh:reports`
- `npm run runner:page-refresh:closeout`
- `docs/parallel-tooling-architecture.md`

## Final report requirements

Include the task graph, parallel tasks completed, serial integration, evidence bundle path if any, commands, timing, and unresolved worker risks.
