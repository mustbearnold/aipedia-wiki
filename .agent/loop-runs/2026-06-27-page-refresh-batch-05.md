# 2026-06-27 Page Refresh Batch 05

Status: verified locally.

## Scope

- Refreshed 24 guide routes from `/guides/best-ai-tools-for-accountants/` through `/guides/best-free-ai-tools/`.
- Updated top-layer surfaces: `/guides/` and `/categories/`.
- Updated affected category hubs: AI Writing, AI Automation, AI Research, AI Chatbots, AI Notes, AI Search, AI Presentation, AI Design, AI Coding, AI Image, AI Music, AI Voice, and AI Video.
- Regenerated `PAGE_REFRESH_LEDGER.md`.
- Strict 3-day stale count after this batch: 169 tracked pages older than 2026-06-24.

## Source Repairs

- Replaced the broken Jasper Brand Voice help URL on the real estate agents guide with the live official Jasper Brand Voice page.
- Replaced the unreachable Kuaishou investor Kling 3.0 launch URL on the video generator guide with the live GlobeNewswire copy of the launch release.
- Rechecked 193 batch source URLs with `page:source-health`: 139 ok, 54 access-sensitive, 0 broken, and 0 unreachable during closeout.

## Timing

- Closeout receipt: `local/tmp/aipedia-runner/page-refresh/receipts/2026-06-27T00-29-49Z-page-refresh-closeout.md`.
- Total closeout: 81.234s.
- Cheap gates: 2.366s.
- Source health: 12.261s.
- Typecheck: 14.856s.
- Build fast: 16.824s.
- Content route QA: 34.922s.
- Supplemental category route QA: 16.319s.

Worker report scaffolds parsed 6/6, but this batch was executed in-thread rather than with live worker agents. Treat scaffold worker elapsed/source/caveat metrics as empty, and use the closeout/source-health/route-QA timings above for optimization.

## Verification

- `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/batch-05-source-health-after-pass2.json --concurrency 8 --timeout-ms 8000`
- `npm run ledger:pages && npm run ledger:pages:check`
- `node scripts/check-frontmatter.mjs --changed`
- `AIPEDIA_CURRENT_DATE=2026-06-27 npm run audit:coverage-quality:changed`
- `npm run audit:provenance:changed -- --json`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- `AIPEDIA_CURRENT_DATE=2026-06-27 npm run runner:page-refresh:closeout`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --route /categories/ai-automation/ --route /categories/ai-chatbots/ --route /categories/ai-coding/ --route /categories/ai-design/ --route /categories/ai-image/ --route /categories/ai-music/ --route /categories/ai-notes/ --route /categories/ai-presentation/ --route /categories/ai-research/ --route /categories/ai-search/ --route /categories/ai-video/ --route /categories/ai-voice/ --route /categories/ai-writing/ --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/aipedia-runner/page-refresh/batch-05-category-route-qa.json`

## Next

- Continue oldest-first from the regenerated strict 3-day queue.
- Remaining stale mix: 38 guides, 37 comparisons, 30 companies, 21 static pages, 14 workflows, 12 trends, 8 dead archive pages, 6 tools, 2 crawl surfaces, and 1 report.
