# Tool Refresh Workflow

Use this workflow for batch-refreshing AiPedia tool pages with current sources, source-backed pricing/fact checks, parent-hub alignment, and one efficient verification closeout.

## Default Shape

Run one planner batch of up to 60 tools:

```bash
npm run runner:tool-refresh:plan
```

The Rust runner writes planner JSON, worker prompts, and route QA args under `local/tmp/aipedia-runner/`.

Fallback without the Rust runner:

```bash
npm run --silent tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json > local/tmp/tool-refresh-batch.json
```

Do not commit local planner JSON.

The normal execution shape is:

1. Six shard workers.
2. Up to 10 tool markdown files per worker.
3. Workers edit only assigned `src/content/tools/*.md` files.
4. One integrator updates shared files once.
5. One grouped verification closeout.

## Worker Boundary

Workers may edit only their assigned tool markdown files.

Workers must not edit:

- `PAGE_REFRESH_LEDGER.md`
- `src/data/source-registry.json`
- `src/content/categories/*.md`
- `src/pages/**`
- `src/components/**`
- `.agent/**`
- `workflows/**`

Workers must verify volatile AI, company, pricing, model, product, API, affiliate, and news facts against current sources. Every web search for volatile facts must include the current month and year.

Workers must report constrained facts with one of these labels:

- `primary-confirmed`
- `primary-conflict`
- `account-gated`
- `checkout-gated`
- `region-rendered`
- `blocked-live-check`
- `secondary-only`

## Integrator Boundary

The integrator owns shared state:

- `src/data/source-registry.json`
- `src/content/categories/*.md`
- `PAGE_REFRESH_LEDGER.md`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/WORK_LOG.md`
- `.agent/loop-runs/`
- relevant workflow docs when the process changes

The integrator reviews worker diffs, deduplicates source rows, applies caveats from worker confidence labels, updates affected category hubs/top-layer surfaces, regenerates the ledger, and runs final checks.

## Closeout Order

Run cheap deterministic gates before expensive rendered gates:

```bash
npm run runner:tool-refresh:closeout
```

The runner executes the ledger precheck, grouped batch check, date consistency, typecheck, build, route-arg generation, route QA, and local Markdown plus JSON receipts in order. The JSON receipt records command statuses, elapsed time, route QA widths, changed routes, source IDs, timing artifact paths, and any earlier failed receipt that the passing run superseded.

Then generate route QA args from the saved planner and run:

```bash
node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 4 $(cat local/tmp/route-qa-args.txt) --widths 319,360,390,430,768,1024,1366
```

If using the fallback planner instead of the Rust runner, adjust the paths accordingly.

## Why This Order Exists

- `ledger:pages && ledger:pages:check` before the grouped checker avoids a slow failed validation pass.
- `tool:refresh:batch:check` includes per-tool quality, changed frontmatter parsing, provenance, freshness, ledger check, em dash guard, and `git diff --check`.
- `typecheck` catches Astro/content schema and YAML issues that editorial audits can miss.
- `build:fast` and route QA are paid once per batch, not once per tool.

## Related Files

- `worker-prompt.md`
- `integrator-checklist.md`
- `verification.md`
- `tools/aipedia-runner/`
- `scripts/tool-refresh-batch.mjs`
- `scripts/tool-refresh-batch-check.mjs`
- `.agent/LOOPS.md`
