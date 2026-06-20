# AiPedia Agent Workspace

Start here for committed agent instructions. Do not rely on a root `AGENTS.md`; that file is ignored and may be absent in clean clones or worktrees.

- `CURRENT_STATUS.md` is the plain-English dashboard for the current branch state and next action.
- `WORK_LOG.md` is the append-only record of major completed work.
- `OPERATING_RULES.md` is the primary committed operating guide for agent work.
- `PROJECT_MAP.md` is the fast orientation map for future agent work.
- `PLANS.md` is only for active or immediately resumable ExecPlans.
- `archive/` holds completed historical plans and handoffs that should not be loaded by default.

## Canonical Reading Order

1. `CURRENT_STATUS.md`
2. `PLANS.md`
3. `WORK_LOG.md`
4. `PROJECT_MAP.md`
5. `OPERATING_RULES.md`

Keep this directory light. If a plan is complete, summarize the result in `CURRENT_STATUS.md`, append `WORK_LOG.md`, archive the detail, and keep `PLANS.md` focused on active or immediately resumable work.

Do not keep one-off completed ExecPlan files in this root directory. Once work is merged, rely on Git history or the consolidated archive rather than leaving dozens of old plan files in the active agent surface.
