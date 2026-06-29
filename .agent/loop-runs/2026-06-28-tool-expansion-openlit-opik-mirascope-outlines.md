# 2026-06-28 Tool Expansion: OpenLIT, Opik, Mirascope, Outlines

Status: Complete locally, verified, pending commit and push.

## Scope

- Added new active tool pages: `openlit`, `opik`, `mirascope`, and `outlines`.
- Added or verified logos under `public/logos/tools/`.
- Generated OG cards under `public/og/tools/`.
- Updated `src/data/source-registry.json`, `src/data/_meta/tools-registry.json`, `src/data/logo-manifest.json`, and `src/data/generated-assets/og-tools-manifest.json`.
- Updated affected hubs: AI Infrastructure, AI Coding, and AI Automation.
- Updated top-layer and crawl/LLM surfaces: `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, search/home generated APIs, and `PAGE_REFRESH_LEDGER.md`.

## Source Notes

- OpenLIT was verified against the official site, docs, pricing page, docs index, GitHub repository, and Apache-2.0 license. Self-hosted use is free; OpenLIT Cloud is still coming soon without public pricing.
- Opik was verified against Comet product, docs, tracing docs, evaluation docs, pricing, repository, and Apache-2.0 license. OSS, Free Cloud, and Pro Cloud terms are public, while overages and retention can change the real bill.
- Mirascope was verified against official docs, LLM docs, cloud-status page, repository, and MIT license. Mirascope Cloud is discontinued, so the page positions it as an SDK/framework choice.
- Outlines was verified against official docs, repository, Apache-2.0 license, and Dottxt official/API/model surfaces. Public Dottxt API pricing was not verified.

## Verification

- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/openlit.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/opik.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/mirascope.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/outlines.md`
- `AIPEDIA_LEDGER_DATE=2026-06-28 npm run ledger:pages -- --date 2026-06-28`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run check:frontmatter -- --changed`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:provenance:changed -- --json`
- Selected live-source audit for 26 batch-eight source IDs, all HTTP 200.
- `node scripts/generate-logo-manifest.mjs --check`
- `node scripts/generate-og-svgs.mjs --check`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run guard:check`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /tools/openlit/ --route /tools/opik/ --route /tools/mirascope/ --route /tools/outlines/ --route /categories/ai-infrastructure/ --route /categories/ai-coding/ --route /categories/ai-automation/ --route /tools/ --route /categories/ --route /`
- Generated API/LLM smoke checks for all four slugs and names.
- `npm run check:quick`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`

## Caveats

- OpenLIT Cloud pricing is unpublished.
- Opik cloud bills can grow with spans, extra span blocks, and retention.
- Mirascope Cloud is discontinued, so managed observability claims were avoided.
- Dottxt API pricing for Outlines was not verified from a public pricing page.
