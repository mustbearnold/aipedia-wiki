# 2026-06-24 AiPedia Tool Refresh Workflow Skill

## Result

Packaged the optimized tool-refresh process as the local Codex skill `$aipedia-tool-refresh-workflow`. The workflow was later expanded to six shard workers with up to 10 tools each.

The skill lives at:

```text
.agents/skills/aipedia-tool-refresh-workflow/
```

It is intentionally an incubating workflow skill, not a committed loop-registry entry yet. Use it for real refresh batches, improve it when the workflow wastes time, and promote stable behavior into `src/data/aipedia-loops.json` after repeated successful runs.

## Files

- `.agents/skills/aipedia-tool-refresh-workflow/SKILL.md`
- `.agents/skills/aipedia-tool-refresh-workflow/agents/openai.yaml`
- `.agents/skills/aipedia-tool-refresh-workflow/references/tool-refresh-batch.md`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/LOOPS.md`
- `.agent/WORK_LOG.md`

## Workflow Captured

- Plan 60 tools with `tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`.
- Assign six shard workers, each editing only the tool markdown files listed in its shard.
- Keep source registry, parent hubs, ledgers, top-layer pages, and `.agent` docs integrator-owned.
- Use `tool:refresh:batch:check -- --plan <planner-json>` as the fast grouped gate.
- Run `typecheck`, `build:fast`, and one combined built-output route QA once per integrated batch.
- Use `qa-route --base-url http://127.0.0.1:4325 --concurrency 4` for fast visual checks while the dev server is already running.
- Do not run `typecheck` and `build:fast` in parallel because Astro can race on the local content data store.

## Verification

- `python C:\Users\mustb\.codex\skills\.system\skill-creator\scripts\quick_validate.py .agents\skills\aipedia-tool-refresh-workflow`
- Placeholder and em-dash sweeps on the new skill and updated workflow docs
- `git diff --check`

## Residual Risk

`.agents/` is gitignored local skill state. The skill is available in this workspace, but it will not be committed unless the project decides to move skills into a committed path or force-add this folder.
