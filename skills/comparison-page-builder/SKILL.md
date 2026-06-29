# Comparison Page Builder

## Purpose

Create or refresh comparison pages that help readers choose between two tools for the same buyer job.

## When to use

Use this skill for files under `src/content/comparisons/` or comparison-like guide pages.

## Required inputs

- Tool A.
- Tool B.
- Audience.
- Buyer job.
- Decision angle.
- Current date.

## Output format

- Comparison path or false-vs rejection.
- Evidence for each tool.
- Winner by use case.
- CTA and disclosure notes.
- Parent surface updates.
- Verification result.

## Workflow steps

1. Confirm both tools solve the same buyer job and workflow.
2. Check `src/data/comparison-policy.json` for blocked or review-only pairs.
3. Gather current facts for both tools.
4. Identify meaningful differences, not generic feature lists.
5. Write winner, choose-X-if, choose-Y-if, plan guidance, watch-outs, and alternatives.
6. Add affiliate CTAs only when honest and approved.
7. Add useful internal links to tools, categories, guides, and sibling comparisons.
8. Update compare hub, parent categories, LLM/search surfaces, and ledger rows when affected.
9. Run comparison and rendered checks.

## Safety rules

- Do not create fake versus pages for different workflows.
- Do not hide uncertainty in pricing or feature access.
- Do not make both tools sound equally best.
- Preserve existing comparison URLs unless the user approves a migration.

## Validation steps

- `npm run audit:coverage-quality:changed`
- `npm run check:frontmatter`
- `npm run audit:provenance:changed -- --json`
- `npm run check:links`
- `npm run ledger:pages && npm run ledger:pages:check`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --site-dir dist-fast/client --route /compare/<slug>/`

## Related scripts

- `scripts/audit-coverage-quality.mjs`
- `scripts/decision-loop.mjs`
- `scripts/loop-verify.mjs`
- `src/data/comparison-policy.json`

## Final report requirements

Include same-job validation, winner logic, facts changed, affiliate changes, SEO changes, parent surfaces, commands, and residual risks.
