# Repo Maintenance

## Purpose

Make safe engineering, tooling, workflow, or documentation changes without breaking content, URLs, SEO, affiliate links, or build behavior.

## When to use

Use this skill for scripts, tests, docs, workflow procedures, runner changes, repo cleanup, command-surface changes, and non-rendered maintenance.

## Required inputs

- Objective.
- Affected area or files.
- Current branch.
- Known constraints.
- Desired validation scope.

## Output format

- Files changed.
- Behavior changed.
- Validation commands.
- Risks and follow-ups.
- Notes for future agents.

## Workflow steps

1. Run `git status -sb`.
2. Inspect affected files and tests.
3. Prefer small patches and existing patterns.
4. Update docs when operator behavior changes.
5. Add or update tests for changed behavior.
6. Run focused script checks and `check:quick` when appropriate.
7. Update `.agent/` continuity docs for major work.
8. Report exactly what changed.

## Safety rules

- Do not delete, move, or rewrite large areas blindly.
- Do not break public URLs, generated manifests, affiliate links, or content collections.
- Do not weaken guards without the guard challenge workflow.
- Do not commit unless the user asks or the task clearly requires it.

## Validation steps

- `node --check <changed-script>`
- `npm exec --yes --package=node@24 -- node --test <focused-test>`
- `npm run check:quick`
- `npm run audit:commands`
- `git diff --check`

## Related scripts

- `scripts/check-smart.mjs`
- `scripts/audit-command-surface.mjs`
- `scripts/guard-challenge.mjs`
- `scripts/agent-workflow-map.mjs`
- `scripts/check-agent-skills.mjs`

## Final report requirements

List changed behavior, files, checks, skipped rendered validation if not needed, risks, and follow-ups.
