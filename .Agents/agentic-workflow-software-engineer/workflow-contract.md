# Workflow Contract

Use this contract for any repeatable agentic workflow.

## 1. Identity

- Workflow name:
- Workflow owner:
- Version:
- Last verified:
- Target project or niche:
- Target platforms:

## 2. Goal

State the concrete outcome in one paragraph. Include who benefits and what "better" means.

## 3. Non-Goals

List what this workflow must not do. Include prohibited shortcuts, risky scope expansions, and known anti-patterns.

## 4. Inputs

Define every input:

- Source files or directories.
- External sources or APIs.
- User-provided constraints.
- Current-date or freshness requirements.
- Secrets or credentials, if any.
- Required tool availability.

## 5. Outputs

Define every output:

- Changed files.
- Generated reports.
- Receipts.
- Benchmark logs.
- Human summary.
- Push or deployment artifact, if requested.

## 6. Context Loading Plan

Load only the context needed for the task:

1. Project rules and current status.
2. Relevant workflow docs.
3. Relevant source files.
4. Relevant tests and scripts.
5. Recent receipts or ledgers.

Record what was loaded when optimizing for token efficiency.

## 7. Execution Plan

Break the workflow into bounded stages:

- Plan.
- Gather.
- Implement.
- Integrate.
- Verify.
- Review.
- Optimize.
- Record.
- Backup.

Each stage must have entry criteria, exit criteria, and failure handling.

## 8. Parallelism Plan

Define:

- Maximum worker count.
- Worker ownership boundaries.
- Allowed edit paths.
- Disallowed edit paths.
- Required worker report format.
- Integration order.
- Conflict handling.

Parallelism is useful only when it reduces wall time without degrading accuracy, quality, or reviewability.

## 9. Timing Schema

Time at least:

- Context load.
- Planning.
- Worker launch.
- Each worker shard.
- Integration.
- Each verification command.
- Route or browser QA, if applicable.
- Review.
- Backup.
- Total wall time.

For high-value workflows, also time per item, per file, per route, per source URL, and per viewport.

## 10. Quality Gates

Define the gates that prove output quality:

- Static checks.
- Type checks.
- Unit tests.
- Integration tests.
- Browser or visual checks.
- Source checks.
- Human or subagent review.
- Rubric scoring.

## 11. Accuracy Gates

Define how claims are verified:

- Primary sources.
- Current-date verification.
- Source health.
- Fact registry updates.
- Confidence labels.
- Caveats for uncertain claims.

## 12. Non-Regression Gates

Define what must not regress:

- Existing tests.
- Public routes.
- UX behavior.
- Mobile layout.
- SEO/schema.
- Analytics contracts.
- Data schemas.
- Command compatibility.
- Workflow outputs.

## 13. Closeout Report

The closeout report must include:

- What changed.
- Why it changed.
- Files changed.
- Commands run.
- Timing data.
- Quality findings.
- Accuracy findings.
- Regression findings.
- Residual risks.
- Next optimization target.

## 14. Self-Improvement Review

After every meaningful run, answer:

- What was slow?
- What was wasteful?
- What was error-prone?
- What produced the most quality per token?
- What produced the most quality per second?
- What can be automated safely?
- What should remain human-reviewed?
- What guard prevented a regression?
- What guard was missing?
