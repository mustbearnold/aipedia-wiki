# Fact Check Page

## Purpose

Validate page claims against current sources and produce a compact list of supported, stale, uncertain, and unsupported facts.

## When to use

Use this skill before refreshing pages, reviewing risky claims, auditing pricing/model/API facts, or resolving source conflicts.

## Required inputs

- Page path or route.
- Current date.
- Claims of concern if known.
- Source URLs or source IDs if known.
- Whether edits are allowed.

## Output format

- Claim table with status, source, confidence, and action.
- Unsupported or stale claims.
- Suggested edits if allowed.
- Validation commands.
- Risks.

## Workflow steps

1. Read the target page and extract factual claims.
2. Classify each claim by volatility.
3. Find existing source IDs and visible source links.
4. Verify official sources first.
5. Label each claim as supported, stale, conflict, gated, or unsupported.
6. Patch the page only if edits are requested or implied.
7. Update source rows, verification dates, and ledger rows when content changes.
8. Run focused checks.

## Safety rules

- Do not turn uncertainty into certainty.
- Do not cite sources that do not support the exact claim.
- Do not remove risky claims silently. Replace, caveat, or report them.
- Do not rely on old page text as evidence.

## Validation steps

- `npm run check:frontmatter`
- `npm run audit:provenance:changed -- --json`
- `npm run audit:date-consistency`
- `npm run check:links`
- `node scripts/guard-em-dashes.mjs`

## Related scripts

- `scripts/audit-provenance-pricing.mjs`
- `scripts/audit-date-consistency.mjs`
- `scripts/audit-source-health.mjs`
- `scripts/guard-stale-facts.mjs`

## Final report requirements

Include claim statuses, source URLs, confidence labels, unsupported claims, edits made, commands run, and risks.
