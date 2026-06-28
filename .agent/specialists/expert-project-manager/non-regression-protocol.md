# Expert Project Manager Non-Regression Protocol

Use this protocol when coordinating repo-structure, workflow, or documentation-system changes.

## Before Work

- Confirm the canonical source of truth for the surface being changed.
- List affected docs, scripts, package commands, ignored folders, and workflow references.
- Search for old paths or duplicated instructions with `rg`.
- Decide which historical references should remain untouched.

## During Work

- Keep naming boring and stable.
- Prefer moves over duplicated copies.
- Update active instructions in the same change as folder moves.
- Do not weaken checks to make a cleanup easier.
- Keep generated, local, and tracked artifacts clearly separated.

## Verification

Minimum checks for documentation and repo-hygiene changes:

```bash
npm run check:smart -- --json
npm run agents:backup:dry-run
node scripts/guard-em-dashes.mjs
git diff --check
```

Add focused script tests when scripts change. Add build or route QA only if rendered output, runtime behavior, routes, metadata, or page content changed.

## Closeout

Record:

- The folder contract after the change.
- Old paths retired.
- New entrypoints.
- Commands that passed.
- Any historical references intentionally left unchanged.
