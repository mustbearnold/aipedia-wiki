# 2026-06-28 Tool Expansion: Respan, Agno, Instructor, Chainlit

## Scope

- Added active tool pages: `src/content/tools/respan.md`, `src/content/tools/agno.md`, `src/content/tools/instructor.md`, and `src/content/tools/chainlit.md`.
- Added logo assets: `public/logos/tools/respan.png`, `public/logos/tools/agno.svg`, `public/logos/tools/instructor.png`, and `public/logos/tools/chainlit.svg`.
- Generated OG assets for all four new tools.
- Updated source registry, tool registry, logo manifest, OG tools manifest, `PAGE_REFRESH_LEDGER.md`, affected category hubs, homepage, `/tools/`, `/categories/`, and LLM surfaces.

## Affected Parent Surfaces

- `src/content/categories/ai-infrastructure.md`
- `src/content/categories/ai-coding.md`
- `src/content/categories/ai-automation.md`
- `src/content/categories/ai-chatbots.md`
- `src/pages/index.astro`
- `src/pages/tools/index.astro`
- `src/pages/categories/index.astro`
- `src/pages/llms.txt.ts`
- `src/pages/llms-full.txt.ts`

## Source Notes

- Respan replaced the older Keywords AI search path as the active checked product surface. The page uses official Respan product, pricing, observability, gateway, and eval docs.
- Agno official pricing currently shows Free open source, Pro at $150/month, and Enterprise custom. Older lower Pro/Team prices were not used.
- Instructor is treated as a structured-output library for Python, TypeScript, Ruby, Elixir, Go, and CLI workflows, not as a hosted governance platform.
- Chainlit is treated as a developer Python chat UI framework for prototypes and internal tools, not as a managed chatbot subscription.

## Caveats

- Respan's public pricing page did not expose a clean Team base price in rendered HTML, so checkout or sales confirmation remains required before quoting a Team dollar amount.
- Chainlit raw `main` license fetch was unreliable during source checks, so the source registry uses the GitHub blob license URL.
- License sources use the existing source-registry `legal` type, not a new `license` type.
- Compact `/llms.txt` remains selective by design; the full generated inventory in `/llms-full.txt` includes all four new tools.

## Verification

- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/respan.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/agno.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/instructor.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/chainlit.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run check:frontmatter -- --changed`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:provenance:changed -- --json`
- `npm run audit:sources -- --live --limit 0` for the 17 batch-seven source IDs
- `node scripts/generate-logo-manifest.mjs --check`
- `node scripts/generate-og-svgs.mjs --check`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run guard:check`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /tools/respan/ --route /tools/agno/ --route /tools/instructor/ --route /tools/chainlit/ --route /categories/ai-infrastructure/ --route /categories/ai-coding/ --route /categories/ai-automation/ --route /categories/ai-chatbots/ --route /tools/ --route /categories/ --route /`
- Generated API and LLM smoke checks for the new slugs
- `npm run check:quick`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`

## Retry Notes

- The first `build:fast` run caught homepage evidence drift because the AI Infrastructure category included a medium-confidence Respan decision pick. The fix kept the unsupported Team price out of copy and made the product-scope pick high confidence based on registered current sources.
- The first `check:quick` run caught invalid `type: license` source rows. The source rows now use the existing `legal` source type.
- Running `check:quick` with `AIPEDIA_CURRENT_DATE=2026-06-28` caused current-date comparison fixtures to appear future-dated on June 29. Rerunning `npm run check:quick` without the content-date override passed.
