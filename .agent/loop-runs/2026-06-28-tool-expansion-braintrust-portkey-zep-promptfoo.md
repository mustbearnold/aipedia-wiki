# 2026-06-28 Tool Expansion Batch 03

## Status

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Scope: Added four net-new AI infrastructure and eval tool pages: Braintrust, Portkey, Zep, and promptfoo.

## Changed

- Added tool pages:
  - `src/content/tools/braintrust.md`
  - `src/content/tools/portkey.md`
  - `src/content/tools/zep.md`
  - `src/content/tools/promptfoo.md`
- Added or verified logos:
  - `public/logos/tools/braintrust.svg`
  - `public/logos/tools/portkey.png`
  - `public/logos/tools/zep.svg`
  - `public/logos/tools/promptfoo.svg`
- Generated OG cards:
  - `public/og/tools/braintrust.png`
  - `public/og/tools/portkey.png`
  - `public/og/tools/zep.png`
  - `public/og/tools/promptfoo.png`
- Updated shared registries and generated assets:
  - `src/data/source-registry.json`
  - `src/data/_meta/tools-registry.json`
  - `src/data/logo-manifest.json`
  - `src/data/generated-assets/og-tools-manifest.json`
- Updated affected parent and top-layer surfaces:
  - `src/content/categories/ai-infrastructure.md`
  - `src/content/categories/ai-automation.md`
  - `src/content/categories/ai-coding.md`
  - `src/pages/index.astro`
  - `src/pages/tools/index.astro`
  - `src/pages/categories/index.astro`
  - `src/pages/llms.txt.ts`
  - `src/pages/llms-full.txt.ts`
  - `PAGE_REFRESH_LEDGER.md`

## Source Notes

- Braintrust: pricing, included topic credits, retention, data/score allowances, docs, and Apache 2.0 SDK licensing were checked against current official sources.
- Portkey: Developer, Production, and Enterprise plan terms, gateway docs, and MIT gateway licensing were checked against current official sources.
- Zep: Free, Flex, Flex Plus, Enterprise pricing, credit mechanics, memory docs, and Graphiti Apache 2.0 licensing were checked against current official sources.
- promptfoo: Community, Enterprise, and On-Premise positioning, docs, MIT licensing, and acquisition context were checked against current promptfoo and OpenAI sources.
- Caveat: OpenAI's promptfoo acquisition announcement loaded in browser during source verification but returned raw HTTP 403 in the automated source audit. promptfoo's own acquisition update returned HTTP 200 and remains the primary machine-checkable source for that note.

## Verification

- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/braintrust.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/portkey.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/zep.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/promptfoo.md`
- `npm run check:frontmatter -- --changed`
- `npm run audit:provenance:changed -- --json`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 node scripts/audit-date-consistency.mjs --changed`
- `npm run --silent audit:sources -- --json --live --limit 0 --source-id braintrust-docs --source-id braintrust-pricing --source-id braintrust-sdk-license --source-id openai-promptfoo-acquisition --source-id portkey-docs --source-id portkey-gateway-github --source-id portkey-gateway-license --source-id portkey-pricing --source-id promptfoo-docs --source-id promptfoo-joining-openai --source-id promptfoo-license --source-id promptfoo-pricing --source-id zep-docs-concepts --source-id zep-graphiti-github --source-id zep-graphiti-license --source-id zep-official --source-id zep-pricing`
- `AIPEDIA_LEDGER_DATE=2026-06-28 npm run ledger:pages -- --date 2026-06-28`
- `AIPEDIA_LEDGER_DATE=2026-06-28 npm run ledger:pages:check`
- `node scripts/generate-logo-manifest.mjs --check`
- `node scripts/generate-og-svgs.mjs --check --json`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run guard:check`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /tools/firecrawl/ --route /tools/composio/ --route /tools/dify/ --route /tools/flowise/ --route /tools/langsmith/ --route /tools/tavily/ --route /tools/pydantic-ai/ --route /tools/mem0/ --route /tools/braintrust/ --route /tools/portkey/ --route /tools/zep/ --route /tools/promptfoo/ --route /categories/ai-infrastructure/ --route /categories/ai-automation/ --route /categories/ai-search/ --route /categories/ai-coding/ --route /tools/ --route /categories/ --route /`
- Generated API and LLM smoke check over `api/tools.json`, `api/search-tools.json`, `api/home-search.json`, `llms-full.txt`, and `llms.txt`.

## Next

- Continue the all-day tool expansion queue with the next net-new AI tools.
- Keep the same closeout shape: current-source verification, tool pages, logos, OG cards, source registry, tool registry, affected hubs, top-layer surfaces, ledger, focused audits, build, route QA, and generated surface smoke checks.
