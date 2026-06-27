# Local Agents

This directory stores reusable, project-local agent packages. These agents are portable instruction and workflow assets for Codex, Claude Code, Cursor, and similar coding-agent platforms.

This repo also has an ignored lowercase `.agents/` directory for local Codex skill mirrors. The capital `.Agents/` directory is intentional: it is the durable, saved agent library requested for project-local expert agents.

Rules:

- Project rules still win. Read `.agent/CURRENT_STATUS.md`, `.agent/OPERATING_RULES.md`, and the nearest `AGENTS.md` before using any local agent.
- Agent packages live in `.Agents/<agent-slug>/`.
- Each package should include a manifest, an agent prompt, a workflow contract, and a non-regression protocol.
- Back up this directory periodically with `npm run agents:backup`.
- Treat self-improvement as an evidence loop: measure, change, verify, compare, record. Never call an agent improved without a timing, quality, accuracy, and regression record.

Current agents:

- `agentic-workflow-software-engineer/`: enterprise-grade workflow engineer for designing, testing, benchmarking, improving, and regression-proofing repeatable agentic workflows across coding-agent platforms.
