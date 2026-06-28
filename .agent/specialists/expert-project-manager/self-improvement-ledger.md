# Self-Improvement Ledger

Record measured improvements to the Expert Project Manager Agent and the coordination workflows it owns.

## Entry Template

```markdown
## YYYY-MM-DD - Short Change Name

- Baseline:
- Change:
- Timing before:
- Timing after:
- Accuracy impact:
- Quality impact:
- Efficiency impact:
- Regression checks:
- Result:
- Next optimization:
```

## 2026-06-28 - Initial Project Hygiene Agent

- Baseline: Repo had project-memory docs and a workflow-engineer specialist, but no dedicated specialist for project structure, documentation maps, folder boundaries, and closeout coordination.
- Change: Added the Expert Project Manager Agent as a durable specialist under `.agent/specialists/expert-project-manager/`.
- Timing before: Manual coordination relied on general agent behavior.
- Timing after: Initial creation verified by docs and backup checks for this cleanup slice.
- Accuracy impact: Makes canonical context loading and affected-reference searches explicit.
- Quality impact: Gives future cleanup and workflow work a stricter closeout contract.
- Efficiency impact: Reduces repeated rediscovery of folder-boundary and verification rules.
- Regression checks: `npm run agents:backup:dry-run`, `node scripts/guard-em-dashes.mjs`, and `git diff --check`.
- Result: Ready for project-hygiene and workflow-coordination use.
- Next optimization: Add a small reference-audit script if repeated folder-boundary changes become common.
