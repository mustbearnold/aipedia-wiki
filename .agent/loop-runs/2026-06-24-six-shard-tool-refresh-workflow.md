# 2026-06-24 Six Shard Tool Refresh Workflow

## Result

Expanded the AiPedia tool-refresh workflow from one worker per tool to six parallel shard workers, each handling up to 10 tool markdown files.

Default planner command:

```powershell
npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json
```

Printable worker briefs:

```powershell
npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --agents
```

## Reason

The Codex Windows app accepted six active worker agents in the previous run, then returned `agent thread limit reached` for additional workers. The better scaling move is not more concurrent agents. It is six agents with larger, non-overlapping tool-file shards.

## Worker Boundary

Each shard worker may edit only the tool markdown files listed in its shard. Workers must not edit:

- `PAGE_REFRESH_LEDGER.md`
- `src/data/source-registry.json`
- `src/content/categories/*.md`
- `src/pages/**`
- `.agent/**`

The integrator owns source registry rows, parent hubs, top-layer surfaces, ledger regeneration, final docs, typecheck, build, and route QA.

## Changed

- `scripts/tool-refresh-batch.mjs`
- `tests/scripts/build-performance.test.mjs`
- `src/data/source-registry.json`
- `README.md`
- `scripts/README.md`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/LOOPS.md`
- `.agent/OPERATING_RULES.md`
- `.agent/WORK_LOG.md`
- `.agents/skills/aipedia-tool-refresh-workflow/SKILL.md`
- `.agents/skills/aipedia-tool-refresh-workflow/references/tool-refresh-batch.md`
- `.agents/skills/aipedia-tool-refresh-workflow/agents/openai.yaml`

## Verification

Passed:

- `node --check scripts\tool-refresh-batch.mjs`
- `node --test tests\scripts\build-performance.test.mjs tests\scripts\tool-refresh-batch.test.mjs`
- `npm run check:quick`

Fixed during verification:

- `npm run check:quick` first failed because `nightcafe-softwareadvice-pricing` used source type `directory`, which is not a valid source-registry type. Normalized it to `third_party`, then reran successfully.

## Residual Risk

A 60-tool batch is efficient but larger. The integrator must still manually review every worker diff, deduplicate source rows, update parent hubs, and decide whether full route QA for every changed route is needed or whether the plan should be split before closeout.
