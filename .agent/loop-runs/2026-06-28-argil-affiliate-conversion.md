# 2026-06-28 Argil Affiliate Conversion Slice

Status: complete locally, verified, pending push.

Objective: add one focused, source-backed Argil affiliate buyer page for UGC avatar video teams, refresh affected sibling and parent surfaces, and close the CloudTalk-era workflow guardrail improvements requested in the active goal.

## Slice

Added:

- `/guides/argil-pricing-for-ugc-avatar-video-teams/`

Refreshed:

- `/tools/argil/`
- `/guides/best-ai-avatar-video-generator/`
- `/guides/synthesia-alternatives/`
- `/categories/ai-video/`
- `/guides/`
- `/tools/`
- `/categories/`
- `/`
- `/explore/`
- `/search/`
- `/llms.txt`
- `/llms-full.txt`
- `PAGE_REFRESH_LEDGER.md`

## Buyer And Source Notes

- Argil page intent: plan decision for creators, ecommerce marketers, agencies, and founders choosing Classic, Pro, Scale, or Enterprise without misreading credits.
- Current source checks used official Argil pricing, docs, API pricing, pay-as-you-go credits, Product Showcase docs, affiliate docs, and competitor pricing for HeyGen, Synthesia, Captions, and Hedra.
- The AI Video parent page now links the Argil pricing guide and narrows Adobe Firefly claims to sources that pass automated source health.
- The obsolete MiniMax video API docs URL was replaced with `https://platform.minimax.io/docs/guides/video-generation`.
- The fragile Adobe HelpX source citations were removed from AI Video after Node source health timed them out and the visible claim was narrowed.

## Workflow Guardrails

Added:

- `scripts/audit-date-consistency.mjs`, `npm run audit:date-consistency`, and guard-chain wiring.
- Structured JSON closeout receipts in `tools/aipedia-runner/src/main.rs` for tool and page closeouts.
- Superseded-failure tracking for prior failed runner receipts.
- Page source-health global URL dedupe/cache with `unique_sources`, `cache_hits`, `source_occurrences`, and per-source cached reporting.
- Date-consistency cheap gates in generated page and tool refresh closeout commands.

## Verification

Passed:

```bash
npm run page:source-health -- --plan local/tmp/argil-page-source-health-plan.json --out local/tmp/argil-page-source-health.json --concurrency 6 --timeout-ms 8000
npm run ledger:pages
npm run ledger:pages:check
AIPEDIA_CURRENT_DATE=2026-06-28 npm run guard:check
npm run check:frontmatter
AIPEDIA_CURRENT_DATE=2026-06-28 npm run --silent audit:affiliate-conversion -- --strict --json
npm run audit:provenance:changed -- --json
npm run audit:facts
npm run audit:commands
npm run check:links
npm run check:news
npm run check:security
npm run --silent audit:sources -- --json --live --limit 0 --source-id argil-affiliate-docs --source-id argil-api-pricing --source-id argil-docs --source-id argil-docs-index --source-id argil-official --source-id argil-payg-credits --source-id argil-pricing --source-id argil-product-showcase --source-id captions-official --source-id hedra-pricing --source-id heygen-pricing --source-id synthesia-pricing --source-id minimax-video-api --source-id adobe-firefly-pricing --source-id adobe-firefly-product
npm run test:scripts
cargo test --manifest-path tools/aipedia-runner/Cargo.toml
npm run typecheck
AIPEDIA_CURRENT_DATE=2026-06-28 npm run build:fast
npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /guides/argil-pricing-for-ugc-avatar-video-teams/ --route /tools/argil/ --route /guides/best-ai-avatar-video-generator/ --route /guides/synthesia-alternatives/ --route /categories/ai-video/ --route /guides/ --route /tools/ --route /categories/ --route /
npm run qa:route -- --site-dir dist-fast/client --concurrency 4 --widths 319,390,768,1024 --allow-noindex --route /search/ --route /explore/
npm run qa:agent -- --site-dir dist-fast/client --concurrency 2 --widths 390,1024 --route /guides/argil-pricing-for-ugc-avatar-video-teams/ --route /tools/argil/ --out local/tmp/qa-agent-argil-cluster.json
AIPEDIA_CURRENT_DATE=2026-06-28 npm run --silent audit:date-consistency -- --changed --json
git diff --check
```

## Metrics

- `page:source-health`: 144 source URL occurrences, 95 unique URLs, 49 cache hits, 139 ok, 5 access-sensitive, 0 broken, 0 unreachable in 13.843s.
- Strict affiliate audit: 46 money guides, 21 live affiliate tools, 4 configured-not-live tools, 0 errors, 0 warnings.
- Live selected source audit: 15 selected sources, 15 HTTP ok, 0 unreachable.
- Script tests: 444 passed.
- Rust runner tests: 9 passed.
- Typecheck: 245 Astro files checked, 0 errors.
- Build: 17.0s total, 959 sitemap URLs checked, 2,263 commercial CTAs checked, dist budgets passed.
- Route QA: 9 affected content/top-layer routes passed at 319, 360, 390, 430, 768, 1024, and 1366 px.
- Search and explore QA: passed at 319, 390, 768, and 1024 px with `--allow-noindex`.
- QA agent: 4 jobs, p95 job 1052 ms, p95 nav 176 ms.
- Generated surface checks: new guide present in home search, `/guides/`, `/llms.txt`, and `/llms-full.txt`.
- Rendered metadata checks: canonical, meta description, affiliate disclosure, and Argil guide links present on the new guide, Argil tool page, and AI Video category.

## Superseded Issues

- First page source-health run failed because AI Video still cited the obsolete MiniMax video API URL and two Adobe HelpX pages that timed out under Node fetch. MiniMax was updated to the current video generation guide, and the Adobe HelpX citations were removed after the page claim was narrowed to passing Adobe Firefly sources.
- Early registry patches temporarily bumped Adobe HelpX `last_checked` rows during investigation. Those date bumps were reverted because those URLs were not retained as passing current automated sources for the affected AI Video page.

## Next

- Commit and push the verified slice.
- Continue the affiliate conversion page buildout from the current inventory.
- Keep `audit:date-consistency`, source-health dedupe metrics, and structured closeout receipts in the standard closeout path.
