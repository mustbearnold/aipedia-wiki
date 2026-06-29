# Internal Linking

## Purpose

Improve useful internal links without creating link spam or stale parent surfaces.

## When to use

Use this skill when adding, pruning, or auditing links between tools, categories, comparisons, guides, news, answers, workflows, search surfaces, and LLM surfaces.

## Required inputs

- Source page or cluster.
- Target topic or route family.
- Link goal.
- Current date when public content changes.

## Output format

- Added, changed, or rejected link opportunities.
- Parent and top-layer surfaces inspected.
- Link check results.
- Risks and follow-ups.

## Workflow steps

1. Read the source page and nearby cluster.
2. Identify same-buyer-job tools, guides, categories, comparisons, and news.
3. Reject unrelated or weak reciprocal links.
4. Add links where they improve user decisions.
5. Update parent hubs when child pages changed materially.
6. Check LLM/search/feed surfaces when the link affects crawl or discovery surfaces.
7. Run link checks.

## Safety rules

- Do not add links solely for SEO.
- Do not link to false-vs comparisons or stale pages as recommendations.
- Do not remove existing useful links without a reason.
- Preserve mobile readability and avoid dense link blocks.

## Validation steps

- `npm run check:links`
- `npm run audit:hub-staleness:changed`
- `npm run ledger:pages && npm run ledger:pages:check` when page content changes.
- `npm run build:fast` and route QA when rendered link surfaces or layouts changed.

## Related scripts

- `scripts/audit-internal-links.mjs`
- `scripts/audit-hub-staleness.mjs`
- `scripts/generate-page-refresh-ledger.mjs`

## Final report requirements

List links added, links rejected, pages touched, parent surfaces, commands, and residual stale-link risks.
