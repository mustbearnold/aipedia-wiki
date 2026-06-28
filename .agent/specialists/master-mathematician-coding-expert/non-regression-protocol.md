# Master Mathematician and Coding Expert Non-Regression Protocol

Use this protocol when reviewing or improving code, scripts, workflows, tests, data models, or performance-sensitive paths.

## Before Work

- Identify the exact surface: code module, workflow, script, data pipeline, template, or test suite.
- Read the relevant source, tests, docs, and recent work-log entries.
- Define the invariants the system must preserve.
- List the command gates that currently protect the surface.
- Capture a baseline timing or explain why timing is not relevant.
- Search for generated outputs, ledgers, source registries, parent hubs, or docs that must move with the change.

## During Work

- Keep changes scoped to the stated invariant or measured bottleneck.
- Prefer deletion of accidental complexity over new abstraction.
- Prefer structured parsing, schemas, and typed models over ad hoc string handling.
- Preserve public behavior unless the user asked to change it.
- Do not weaken guards, tests, source checks, mobile checks, or affiliate checks to make the change pass.
- Treat benchmark wins as tentative until the compared inputs, environment, and sample count are clear.
- Stop and replan if an optimization increases correctness risk or makes future review harder.

## Verification

Minimum checks for specialist docs or review-package edits:

```bash
npm run check:smart -- --json
npm run agents:backup:dry-run
node scripts/guard-em-dashes.mjs
git diff --check
```

Add these as needed:

```bash
npm run test:scripts
npm run audit:commands
npm run guard:check
npm run typecheck
npm run build:fast
npm run qa:route -- --route /example/
```

Use route QA and builds for rendered output, runtime routes, metadata, schema, layout, or user-facing behavior. Use source, provenance, affiliate, and ledger checks for content, commercial, or factual surfaces.

## Closeout

Record:

- Invariants preserved.
- Bugs fixed or risks reduced.
- Complexity or timing before and after when relevant.
- Verification commands and pass/fail state.
- Remaining uncertainty.
- Whether follow-up should be code, workflow, test, or measurement work.
