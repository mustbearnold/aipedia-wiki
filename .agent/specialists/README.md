# AiPedia Specialist Agents

This directory stores durable, project-local specialist agent packages. They are tracked because they are part of the project operating system, not local runtime state.

## Folder Boundary

- `.agent/`: committed project memory, active plans, run receipts, timing evidence, and saved specialists.
- `.agent/specialists/`: committed reusable specialist agents.
- `.agents/`: gitignored local Codex skill, plugin, shortcut, and runtime state.
- `.Agents/`: retired capitalized folder. Do not recreate it.

## Current Specialists

- `expert-project-manager/`: coordinates project hygiene, folder structure, documentation maps, verification planning, and non-regression closeout.
- `agentic-workflow-software-engineer/`: creates, benchmarks, improves, and regression-proofs repeatable agentic workflows.
- `master-mathematician-coding-expert/`: reviews and improves code, workflows, algorithms, timing systems, tests, and architecture with rigorous mathematical reasoning.

## Use Rules

1. Read root `INDEX.md` and `.agent/CURRENT_STATUS.md` before invoking a specialist.
2. Read the specialist package files named in its `manifest.json`.
3. Project rules in `.agent/OPERATING_RULES.md` and user instructions always win.
4. Specialists produce durable artifacts, measured checks, and clear handoffs. They do not replace final integrator review.
5. Back up this directory periodically with `npm run agents:backup`.
