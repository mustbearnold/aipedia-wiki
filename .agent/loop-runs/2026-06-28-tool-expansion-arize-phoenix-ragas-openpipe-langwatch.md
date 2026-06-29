# 2026-06-28 Tool Expansion: Arize Phoenix, Ragas, OpenPipe, LangWatch

Status: Complete locally, verified, pending commit and push.

## Scope

- Added `src/content/tools/arize-phoenix.md`.
- Added `src/content/tools/ragas.md`.
- Added `src/content/tools/openpipe.md`.
- Added `src/content/tools/langwatch.md`.
- Added or verified logos in `public/logos/tools/`.
- Generated OG cards in `public/og/tools/`.
- Updated source registry, tool registry metadata, logo manifest, OG manifest, affected category hubs, top-layer refresh metadata, LLM surfaces, generated API/search surfaces, and `PAGE_REFRESH_LEDGER.md`.

## Source Notes

- Arize Phoenix is positioned by Arize as open-source AI observability, but the current repository license is Elastic License 2.0. The page calls out the managed-service restriction risk instead of treating it like permissive OSS.
- Ragas is treated as a free Apache-2.0 framework. The page does not assert a public hosted subscription ladder; it tells buyers to budget for evaluator model calls, embeddings, generated test data, and human review.
- OpenPipe pricing is usage-based hosted inference, with third-party fine-tuned model billing treated as provider pass-through and Enterprise as custom. The local schema maps this to `pricing_model: paid` while keeping token pricing in `price_range` and pricing history.
- LangWatch pricing is euro-denominated and event/retention-metered. The page keeps checkout/currency validation as a visible planning item.

## Verification

- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/arize-phoenix.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/ragas.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/openpipe.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/langwatch.md`
- `npm run check:frontmatter -- --changed`
- `npm run audit:provenance:changed -- --json`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 node scripts/audit-date-consistency.mjs --changed`
- `npm run --silent audit:sources -- --json --live --limit 0 --source-id arize-phoenix-docs --source-id arize-phoenix-license --source-id arize-phoenix-official --source-id arize-pricing --source-id langwatch-docs --source-id langwatch-license --source-id langwatch-official --source-id langwatch-pricing --source-id openpipe-docs --source-id openpipe-license --source-id openpipe-pricing --source-id ragas-cost-analysis --source-id ragas-docs --source-id ragas-license --source-id ragas-metrics --source-id ragas-official --source-id ragas-test-data`
- `node scripts/generate-logo-manifest.mjs --check`
- `node scripts/generate-og-svgs.mjs --check`
- `AIPEDIA_LEDGER_DATE=2026-06-28 npm run ledger:pages:check`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run guard:check`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /tools/arize-phoenix/ --route /tools/ragas/ --route /tools/openpipe/ --route /tools/langwatch/ --route /categories/ai-infrastructure/ --route /categories/ai-automation/ --route /categories/ai-coding/ --route /tools/ --route /categories/ --route /`
- Generated API and LLM smoke checks passed for `arize-phoenix`, `ragas`, `openpipe`, and `langwatch`.

## Next

Continue the all-day tool expansion queue with the next missing high-value AI infrastructure, eval, observability, retrieval, memory, automation, or creator/business tools.
