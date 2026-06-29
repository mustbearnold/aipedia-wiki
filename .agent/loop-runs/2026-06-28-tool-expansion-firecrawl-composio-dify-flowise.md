# 2026-06-28 Tool Expansion: Firecrawl, Composio, Dify, Flowise

Status: Complete locally, verified, pending commit and push.

## Scope

- Added `src/content/tools/firecrawl.md`.
- Added `src/content/tools/composio.md`.
- Added `src/content/tools/dify.md`.
- Added `src/content/tools/flowise.md`.
- Added proper logo assets under `public/logos/tools/` and regenerated `src/data/logo-manifest.json`.
- Added tool OG registry entries and generated OG PNGs for the four new tools. The deterministic OG generator also refreshed 16 existing tool OG cards and updated `src/data/generated-assets/og-tools-manifest.json`.
- Added current source registry rows for Firecrawl, Composio, Dify, and Flowise. Also corrected existing source registry `last_checked` dates that the touched category pages visibly cited as June 12, 24, 25, or 26 checks.
- Updated AI Infrastructure and AI Automation buyer guidance, decision picks, buyer paths, and source lists.
- Updated `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md`.

## Source Notes

- Firecrawl pricing and docs were primary-source checked for Free, Hobby, Standard, Growth, Enterprise, credit-based usage, search, scrape, crawl, Interact, screenshots, structured output, and LLM-ready markdown.
- Composio pricing was primary-source checked for Free 20K tool calls/month, $29 plan with 200K calls/month and $0.299 per extra 1K calls, $229 plan with 2M calls/month and $0.249 per extra 1K calls, and Enterprise custom.
- Dify public pricing exposed Sandbox, Professional, Team, Enterprise, and 200-call or 200-message-credit trial language, but exact paid-dollar amounts were not treated as stable enough to publish.
- Flowise docs confirmed open-source self-hosting, Cloud Free with 2 flows and 2 assistants, and Starter with unlimited flows and assistants, but did not publish a current Starter dollar price.

## Verification

- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/firecrawl.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/composio.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/dify.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/flowise.md`
- `npm run check:frontmatter -- --changed`
- `npm run audit:provenance:changed -- --json`
- `npm run ledger:pages -- --date 2026-06-28`
- `npm run ledger:pages:check`
- `node scripts/generate-logo-manifest.mjs --check`
- `node scripts/generate-og-svgs.mjs --check --json`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run guard:check`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /tools/firecrawl/ --route /tools/composio/ --route /tools/dify/ --route /tools/flowise/ --route /categories/ai-infrastructure/ --route /categories/ai-automation/ --route /tools/ --route /categories/ --route /`
- Search/home generated API slug check for `firecrawl`, `composio`, `dify`, and `flowise`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run check:quick`
- `git diff --check`

## Caveats

- Initial route QA failed when `/search/`, `/llms.txt`, and `/llms-full.txt` were included in the HTML route matrix. `/search/` is intentionally noindex, and the LLM files are plain text. The corrected indexable HTML route QA passed, and LLM/search generated content was checked separately.
- Dify paid cloud prices and Flowise Cloud Starter price remain live-check caveats in visible copy.
