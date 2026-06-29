# 2026-06-28 Tool Expansion: LangSmith, Tavily, Pydantic AI, Mem0

Status: Complete locally, verified, pending commit and push.

## Scope

- Added `src/content/tools/langsmith.md`.
- Added `src/content/tools/tavily.md`.
- Added `src/content/tools/pydantic-ai.md`.
- Added `src/content/tools/mem0.md`.
- Added proper logo assets under `public/logos/tools/` and regenerated `src/data/logo-manifest.json`.
- Added tool registry rows, source registry rows, OG registry entries, and generated OG PNGs for the four new tools.
- Updated AI Infrastructure, AI Automation, AI Search, and AI Coding buyer guidance, decision context, tool tables, and source lists.
- Updated `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, generated search/home APIs, and `PAGE_REFRESH_LEDGER.md`.

## Source Notes

- LangSmith pricing, retention, usage limits, deployment billing, hosting, and observability claims were checked against LangChain pricing and docs.
- Tavily pricing and credit math were checked against current API credits docs and pricing.
- Pydantic AI framework capabilities, provider support, evals, Logfire/OpenTelemetry integration, MCP support, durable execution, and MIT licensing were checked against official docs and GitHub.
- Mem0 Platform, OSS, pricing, managed-vs-self-hosted tradeoffs, defaults, and Apache 2.0 licensing were checked against current docs, pricing, and GitHub. The visible page caveats the Pro web-vs-mobile price mismatch.

## Verification

- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/langsmith.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/tavily.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/pydantic-ai.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/mem0.md`
- `npm run check:frontmatter -- --changed`
- `npm run audit:provenance:changed -- --json`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 node scripts/audit-date-consistency.mjs --changed`
- `npm run ledger:pages -- --date 2026-06-28`
- `AIPEDIA_LEDGER_DATE=2026-06-28 npm run ledger:pages:check`
- `node scripts/generate-logo-manifest.mjs --check`
- `node scripts/generate-og-svgs.mjs --check --json`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run guard:check`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /tools/firecrawl/ --route /tools/composio/ --route /tools/dify/ --route /tools/flowise/ --route /tools/langsmith/ --route /tools/tavily/ --route /tools/pydantic-ai/ --route /tools/mem0/ --route /categories/ai-infrastructure/ --route /categories/ai-automation/ --route /categories/ai-search/ --route /categories/ai-coding/ --route /tools/ --route /categories/ --route /`
- Generated API and LLM smoke check for all eight June 28 expansion tools.
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run check:quick`
- `git diff --check`

## Caveats

- Mem0 pricing has a current public mismatch between web and mobile Pro plan amounts. The tool page keeps that as a visible checkout caveat.
- The first post-batch `build:fast` caught homepage decision-evidence drift because Mem0 had medium-confidence pricing evidence. The fix was to keep Mem0 visible in hub/listing context while removing it from high-confidence decision-pick surfaces.
