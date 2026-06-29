# Affiliate Page Builder

## Purpose

Create or refresh buyer-intent pages that can convert honestly without weakening AiPedia trust.

## When to use

Use this skill for guides, comparisons, workflows, or answer pages where an approved affiliate tool is part of the purchase decision.

## Required inputs

- Buyer intent keyword.
- Specific audience.
- Primary tool.
- Competitors or alternatives.
- Conversion goal.
- Affiliate status.
- Current date.

## Output format

- Page route and content path.
- Distinct-intent decision.
- Source and claim receipts.
- CTA and disclosure notes.
- Parent and top-layer surfaces.
- Validation result.

## Workflow steps

1. Confirm the page has a distinct buyer job and is not a doorway duplicate.
2. Verify affiliate approval state and official fallback link.
3. Verify current pricing, plan, feature, and caveat claims.
4. Write the page around verdict, buyer fit, best plan, watch-out, alternatives, and proof.
5. Add `CommercialCTA` with page type, placement, tool slug, page slug, disclosure, and official fallback.
6. Link to the tool page, category hub, sibling guides, and same-job comparisons.
7. Update affected parent hubs, top-layer pages, LLM/search surfaces, source registry, and ledger rows.
8. Run strict affiliate, provenance, ledger, build, and route QA checks.

## Safety rules

- Trust beats conversion.
- Do not force an affiliate recommendation when a non-affiliate alternative is better.
- Do not claim commission terms unless verified.
- Do not create duplicate thin pages for the same buyer intent.

## Validation steps

- `npm run affiliate:conversion:inventory -- --json`
- `npm run audit:affiliate-conversion -- --strict --json`
- `npm run audit:guide-picks`
- `npm run audit:provenance:changed -- --json`
- `npm run ledger:pages && npm run ledger:pages:check`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --site-dir dist-fast/client --route <route>`

## Related scripts

- `scripts/affiliate-conversion-inventory.mjs`
- `scripts/audit-affiliate-conversion-pages.mjs`
- `scripts/audit-guide-picks.mjs`
- `tools/aipedia-runner/`

## Final report requirements

Include buyer intent, duplicate-intent reasoning, affiliate changes, CTA placements, disclosure location, source caveats, parent surfaces, commands, and follow-ups.
