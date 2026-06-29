# Page Quality And Affiliate Scoring

Scoring should help Codex pick the next useful action. It must never pressure the system to invent facts, over-monetize pages, or hide uncertainty.

## Dimensions

- Factual freshness.
- Source quality.
- SEO intent match.
- Buyer intent match.
- Affiliate intent.
- CTA quality.
- Comparison usefulness.
- Internal links.
- Readability.
- Unique angle.
- Conversion potential.
- Update urgency.
- Trustworthiness.
- Page completeness.

## Proposed Score Format

```json
{
  "slug": "example-tool",
  "freshness": 0.76,
  "source_quality": 0.81,
  "seo": 0.82,
  "buyer_intent": 0.74,
  "affiliate": 0.69,
  "cta_quality": 0.72,
  "conversion": 0.71,
  "internal_links": 0.58,
  "update_urgency": 0.88,
  "recommended_action": "refresh_pricing_and_cta"
}
```

## Non-Stale Scoring Principle

Scores must be computed from current signals or marked stale. A high historical score should decay when:

- `last_verified` is outside the freshness window.
- Source registry checks are old.
- Pricing or model facts are volatile.
- Parent hubs have been updated more recently than the child page.
- News has affected the tool or category since the last verification.

## Suggested Weighting

For tool pages:

- Freshness: 20 percent.
- Source quality: 20 percent.
- Buyer decision usefulness: 20 percent.
- Page completeness: 15 percent.
- Internal links: 10 percent.
- CTA and affiliate trust: 10 percent.
- Readability: 5 percent.

For affiliate buyer pages:

- Buyer intent: 25 percent.
- Trust and source quality: 20 percent.
- CTA quality and disclosure: 15 percent.
- Distinct intent and unique angle: 15 percent.
- Pricing freshness: 15 percent.
- Internal links: 10 percent.

For news:

- Currentness: 30 percent.
- Source quality: 25 percent.
- Buyer impact: 20 percent.
- Affected-page linking: 15 percent.
- Readability: 10 percent.

## Recommended Actions

- `refresh_pricing`
- `refresh_model_access`
- `add_sources`
- `improve_cta_context`
- `improve_internal_links`
- `rewrite_verdict`
- `update_parent_hub`
- `merge_or_noindex_duplicate`
- `create_comparison`
- `create_plan_guide`
- `defer_no_current_source`

## How Codex Should Use Scores

- Refresh high-urgency stale pages first.
- Prioritize affiliate pages with high buyer intent and live approved links.
- Improve internal links on pages with weak link scores.
- Update pricing sections before broad editorial rewrites.
- Avoid inventing facts to improve a score.
- Preserve trustworthiness over conversion potential.

## First Script Path

Start with a read-only scorer that consumes:

- `PAGE_REFRESH_LEDGER.md`
- frontmatter dates and source refs
- `src/data/source-registry.json`
- affiliate inventory
- internal link audit output
- provenance audit output

Output JSON only. Do not make the score write pages directly.
