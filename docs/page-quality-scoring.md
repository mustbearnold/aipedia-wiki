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
  "schema_version": "aipedia.page-quality-score.v2",
  "slug": "example-tool",
  "score": 0.78,
  "raw_score": 0.86,
  "freshness": 0.76,
  "source_quality": 0.81,
  "seo": 0.82,
  "buyer_intent": 0.74,
  "affiliate": 0.69,
  "cta_quality": 0.72,
  "conversion": 0.71,
  "internal_links": 0.58,
  "update_urgency": 0.88,
  "recommended_action": "refresh_pricing_and_cta",
  "stale_decay": {
    "label": "medium",
    "decay": 0.52,
    "score_penalty": 0.08,
    "freshness_window_days": 21
  },
  "risk_profile": {
    "label": "medium",
    "score": 0.43
  },
  "confidence_profile": {
    "label": "medium",
    "score": 0.69
  }
}
```

## Non-Stale Scoring Principle

Scores must be computed from current signals or marked stale. `agent:score` now emits `aipedia.page-quality-score.v2`, where the final `score` is the `raw_score` minus a deterministic stale-decay penalty. A high historical score should decay when:

- `last_verified` is outside the freshness window.
- Source registry checks are old.
- Pricing or model facts are volatile.
- Parent hubs have been updated more recently than the child page.
- News has affected the tool or category since the last verification.

The v2 scorer also emits:

- `scoring_model`: page profile, freshness window, source window, weights, and applied score penalty.
- `stale_decay`: page age, source age, stale-signal decay, and `fresh`, `low`, `medium`, or `high` label.
- `risk_profile`: deterministic risk score and factors such as missing source IDs, high-severity stale signals, weak source quality, and weak live-affiliate CTA context.
- `confidence_profile`: deterministic confidence score and reasons based on source quality, freshness, completeness, risk, and source coverage.
- `evidence_summary` labels for quick loop dashboards.

## Implemented Weighting

For tool pages:

- Freshness: 16 to 18 percent.
- Source quality: 17 to 18 percent.
- Buyer decision usefulness: 16 to 17 percent.
- Page completeness: 13 to 14 percent.
- Trustworthiness: 10 percent.
- Internal links: 8 to 9 percent.
- CTA, affiliate trust, SEO, readability, and unique angle: remaining weight.

For affiliate buyer pages:

- Buyer intent: 20 percent.
- Source quality and trustworthiness: 29 percent.
- CTA quality and affiliate state: 21 percent.
- Unique angle: 8 percent.
- Freshness: 12 percent.
- Internal links and SEO: 10 percent.

For news:

- Currentness: 26 percent.
- Source quality: 24 percent.
- Buyer impact: 18 percent.
- Affected-page linking: 10 percent.
- Completeness, readability, and SEO: 22 percent.

For comparisons:

- Source quality: 18 percent.
- Comparison usefulness: 18 percent.
- Freshness: 14 percent.
- Buyer intent: 14 percent.
- Internal links: 12 percent.
- Completeness, trustworthiness, SEO, readability, and unique angle: remaining weight.

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

The first read-only scorer is available:

```bash
npm --silent run agent:score -- --route /tools/cursor/ --json
npm --silent run agent:score -- --path src/content/tools/cursor.md --current-date 2026-06-29 --json
npm --silent run agent:score:calibrate -- --json
```

It consumes:

- `PAGE_REFRESH_LEDGER.md`
- frontmatter dates and source refs
- inline news `sources` URLs
- `src/data/source-registry.json`
- affiliate inventory
- internal link audit output
- provenance audit output

Output JSON only. Do not make the score write pages directly. The scorer is a prioritization and guard signal. It does not perform live source verification.

`agent:score:calibrate` compares score output with real repo signals: ledger age, source coverage, stale signals, parent-impact breadth, stale-decay labels, risk labels, and confidence labels. Use it after changing score weights or recommendation thresholds.

News scoring uses the news-specific bar from the daily workflow: currentness, source quality, buyer impact, affected-page linking, and readability. Inline article sources count as source coverage, but registered source IDs remain distinct for tool, guide, and pricing fact provenance.
