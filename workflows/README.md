# AiPedia Workflows

This folder is the committed home for repeatable AiPedia operating workflows.

Use it for stable procedures that should survive clean clones, new agents, and future sessions. Keep `.agent/` for current status, work logs, and run receipts. Keep `local/` or local-only ignored folders for personal shortcuts, temporary files, logs, and machine-specific helpers.

## Workflow Map

- `tool-refresh/`: six-worker AI tool page refresh workflow, including worker prompts, integrator checklist, and verification sequence.
- `news-refresh/`: placeholder for the daily AI news refresh workflow.
- `page-refresh/`: placeholder for non-tool page refreshes, parent hubs, and ledger-first page maintenance.
- `qa/`: placeholder for route QA, layout checks, and manual inspection routines.
- `templates/`: reusable report/checklist templates for workflow runs.

## Folder Boundaries

- `workflows/`: canonical "how to run it" procedures.
- `.agent/`: current state, active plans, work logs, loop receipts, and operational memory.
- `.agents/`: local gitignored agent/plugin/skill runtime state.
- `local/` or other ignored local folders: personal shortcuts, temp planner files, local logs, and machine-specific helpers.

## Updating Workflows

When a workflow changes because a real run taught us something:

1. Update the relevant workflow file here.
2. Record what happened in `.agent/WORK_LOG.md`.
3. Update `.agent/CURRENT_STATUS.md` only if the change affects the next session.
4. Add tests or script checks when the workflow change is executable.
5. Avoid moving source files just to make the tree look tidy.
