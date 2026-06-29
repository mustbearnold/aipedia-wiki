# Page Quality Audit

## Purpose

Score or audit pages for freshness, source quality, buyer usefulness, internal links, affiliate trust, and update urgency.

## When to use

Use this skill for stale-page audits, refresh queue planning, affiliate prioritization, quality reviews, and non-stale scoring proposals.

## Required inputs

- Scope: page, section, route type, or ledger window.
- Current date.
- Scoring dimensions or audit goal.
- Whether edits are allowed.

## Output format

- Ranked page list or per-page score.
- Evidence for each recommendation.
- Recommended workflow per page.
- Risks and limitations.
- Commands run.

## Workflow steps

1. Read `PAGE_REFRESH_LEDGER.md`, page frontmatter, source refs, and relevant audits.
2. Score freshness, source quality, buyer intent, SEO match, internal links, CTA quality, conversion, trust, and completeness.
3. Separate stale data from durable editorial quality.
4. Recommend action per page.
5. Avoid edits unless the user requested implementation.
6. Run read-only checks or focused audits.

## Safety rules

- Scores are prioritization signals, not permission to invent facts.
- High conversion potential cannot override trust or source gaps.
- Do not mark a page current unless volatile claims are verified.
- Do not hide score limitations.

## Validation steps

- `npm run audit:freshness`
- `npm run audit:provenance:changed -- --json` when changed files exist.
- `npm run audit:affiliate-conversion -- --strict --json` for affiliate pages.
- `npm run check:links`
- `npm run agent:workflow:map -- --json`

## Related scripts

- `scripts/audit-freshness-queue.mjs`
- `scripts/audit-provenance-pricing.mjs`
- `scripts/audit-affiliate-conversion-pages.mjs`
- `scripts/audit-internal-links.mjs`
- `docs/page-quality-scoring.md`

## Final report requirements

Include score dimensions, top recommendations, stale inputs, known blind spots, commands, and next workflow choices.
