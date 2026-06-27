# 2026-06-27 Affiliate Money Guide Metadata Backfill

Status: Complete locally, verified, accepted by subagents at 9.9/10, pending commit and push.

Objective: backfill the structured affiliate conversion metadata contract onto the existing affiliate money guides before generating new page clusters.

## Scope

Backfilled 35 existing guide pages detected by:

```bash
AIPEDIA_CURRENT_DATE=2026-06-27 npm run --silent audit:affiliate-conversion -- --strict --json
```

Each edited guide now declares:

- `intent_type`
- `primary_tool`
- `affiliate_tools`
- `commercial_tools`
- `configured_affiliate_tools`
- `competitor_tools`
- `external_competitors`
- `buyer_job`
- `audience`
- `not_for`
- `decision_criteria`
- `search_intent`
- `conversion_angle`
- `unique_angle`
- `sibling_cluster`
- `overlap_guard`
- `cta_plan`
- `canonical_parent`
- `cluster_id`
- `freshness_window_days`
- `volatile_claims`
- `monetization_disclosure_required`
- `indexability_reason`

This was a metadata-contract backfill, not a fresh volatile-fact refresh. Existing `last_verified` values were preserved.

## Result

Before:

- Money guides: 35.
- Errors: 0.
- Warnings: 245.

After:

- Money guides: 35.
- Live affiliate tools: 22.
- Configured-not-live affiliate tools: 4.
- Errors: 0.
- Warnings: 0.

Guardrail hardening:

- `primary_tool` must match `guide_picks.best_overall.tool`.
- `commercial_tools` can only contain approved-live affiliate tools.
- `configured_affiliate_tools` can only contain configured-but-not-live tools.
- Raw `affiliate_tools` typos, non-catalog slugs, and non-affiliate slugs fail the audit.
- Near-duplicate money pages sharing the same intent, primary tool, and commercial-tool set must carry distinct anti-overlap metadata.
- Rendered commercial CTA audit now fails if an affiliate CTA points at a non-approved tool.
- Workflow docs now require `audit:affiliate-conversion -- --strict --json`.

## Verification

Passed:

```bash
AIPEDIA_CURRENT_DATE=2026-06-27 npm run --silent audit:affiliate-conversion -- --strict --json
npm exec --yes --package=node@24 -- node --test tests/scripts/audit-affiliate-conversion-pages.test.mjs tests/scripts/audit-commercial-cta.test.mjs
npm run check:frontmatter
npm run ledger:pages && npm run ledger:pages:check
node scripts/guard-em-dashes.mjs
npm run typecheck
npm run build:fast
node scripts/qa-route.mjs --site-dir .vercel/output/static --concurrency 4 $(cat local/tmp/affiliate-money-guide-routes.args) --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/affiliate-money-guide-route-qa-final.json
```

Subagent review:

- Trust/schema reviewer accepted at 9.9/10 after raw `affiliate_tools` ordering was fixed.
- Conversion/doorway/CTA reviewer accepted at 9.9/10 after `cta_plan`, strict workflow docs, and committed negative tests were added.

## Next

Build the first new affiliate page cluster only after this backfill is committed and pushed. The strongest first cluster candidates remain:

- `apollo` or `amplemarket` for sales/outbound.
- `descript` for creator/media.
- `dext` for accountants/bookkeepers.
- `reclaim-ai` or `sanebox` for operations/productivity.
