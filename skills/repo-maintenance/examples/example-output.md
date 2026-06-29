# Repo Maintenance Report

Task: Added a no-build skill validation command.

Verification:
- `node --check scripts/check-agent-skills.mjs`
- `npm run agent:skills:check`

Risks:
- Does not validate semantic quality of skill instructions.
