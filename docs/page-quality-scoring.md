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

- `refresh_current_facts`
- `improve_source_coverage`
- `fix_missing_sources`
- `risk_confidence_review`
- `improve_cta_context`
- `improve_internal_links`
- `strengthen_buyer_decision_path`
- `monitor`

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
npm --silent run agent:score:calibrate -- --gold-set .agent/evals/score-calibration-goldset.json --current-date 2026-06-30 --out .agent/evals/score-calibration-receipts/2026-06-30-slice-09-score-goldset.json --json
npm --silent run agent:score:calibrate -- --gold-set .agent/evals/score-calibration-goldset.json --require-gold-set-review --gold-set-review .agent/evals/score-goldset-change-reviews/<review>.json --json
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

## Gold-Set Calibration

Gold-set calibration turns scoring expectations into a regression gate. The committed baseline lives at `.agent/evals/score-calibration-goldset.json` and covers six real routes:

- `/tools/cursor/`: current high-volatility tool with broad parent impact should stay `monitor`, high confidence, low risk, and low stale decay.
- `/compare/gemini-vs-grok/`: current inline-source comparison should stay high confidence, avoid a source-gap false positive, and keep the internal-link remediation.
- `/answers/best-ai-for-writing-2026/`: stale static answer should stay a low-confidence `refresh_current_facts` candidate.
- `/compare/argil-vs-synthesia/`: fresh same-workflow comparison should stay a high-confidence monitor baseline with strong inline-source and internal-link coverage.
- `/guides/argil-pricing-for-ugc-avatar-video-teams/`: fresh affiliate buyer guide should stay a high-confidence monitor baseline with source coverage, CTA context, and a distinct buyer job.
- `/news/2026-06-29-google-ai-studio-gemini-api-key-incident/`: current source-backed news should stay a high-confidence monitor baseline under the news profile.

`agent:score:calibrate -- --gold-set <path>` emits:

- `gold_set`: case count, mismatch count, per-case checks, actual labels, and threshold expectations.
- `gold_set_governance`: normalized gold-set hash, required review schema, required review lenses, case-structure checks, and optional matching review record.
- `threshold_review`: pass or review status for unsafe threshold combinations, including high-risk monitor actions, low-confidence weak remediation, high stale decay with high score, and gold-set mismatches.

A scoring change is not ready if the gold-set receipt has `ok: false`, `gold_set.ok: false`, `gold_set_governance.ok: false`, or `threshold_review.status: "review"` unless the change deliberately updates the baseline and the matching review record explains why.

Deliberate baseline changes should run with `--require-gold-set-review` and a JSON review file that uses `schema_version: "aipedia.score-goldset-review.v1"`, matches the normalized `gold_set_hash`, lists `changed_cases`, and covers the architecture, evaluation, editorial, risk-confidence, regression, and rollout review lenses. Slice 18 expanded the baseline with review record `.agent/evals/score-goldset-change-reviews/2026-06-30-slice-18-goldset-expansion.json` and governed receipt `.agent/evals/score-calibration-receipts/2026-06-30-slice-18-score-goldset-expansion.json`.

News scoring uses the news-specific bar from the daily workflow: currentness, source quality, buyer impact, affected-page linking, and readability. Inline article sources count as source coverage, but registered source IDs remain distinct for tool, guide, and pricing fact provenance.
