# 2026-06-27 Page Refresh Batch 06

Status: verified locally.

## Scope

- Refreshed 24 routes: 19 guide routes from `/guides/best-open-source-ai-tools/` through `/guides/synthesia-alternatives/`, plus 5 trend routes from `/trends/ai-coding-model-arms-race/` through `/trends/enterprise-agent-platforms/`.
- Updated top-layer surfaces: `/`, `/guides/`, `/trends/`, and `/categories/`.
- Updated affected category hubs: AI Chatbots, AI Infrastructure, AI Coding, AI Design, AI Image, AI Voice, AI Writing, AI Search, and AI Video.
- Regenerated `PAGE_REFRESH_LEDGER.md`.
- Strict 3-day stale count after this batch: 145 tracked pages older than 2026-06-24.

## Source Repairs

- Replaced the broken Hume EVI source with `https://www.hume.ai/empathic-voice-interface`.
- Replaced the broken Ideogram 3.0 source with `https://ideogram.ai/models/4.0/`.
- Replaced the broken NotebookLM support source with `https://support.google.com/notebooklm/answer/16206563`.
- Replaced the unreachable Microsoft Agent 365 source with `https://www.microsoft.com/en-us/microsoft-agent-365`.
- Replaced QuillBot Premium with the live `https://quillbot.com/upgrade` route.
- Removed duplicate Adobe HelpX credit FAQ source lines that remained unstable under bounded source health; the guides still cite the stable official Adobe Firefly plans page for plan and credit checks.

## Timing

- Closeout receipt: `local/tmp/aipedia-runner/page-refresh/receipts/2026-06-27T00-41-04Z-page-refresh-closeout.md`.
- Total closeout: 83.493s.
- Cheap gates: 2.333s.
- Source health: 16.711s.
- Typecheck: 14.476s.
- Build fast: 15.739s.
- Content route QA: 34.227s.
- Supplemental category route QA: 11.496s.

Worker report scaffolds parsed 6/6, but this batch was executed in-thread rather than with live worker agents. Treat scaffold worker elapsed/source/caveat metrics as empty, and use the closeout/source-health/route-QA timings above for optimization.

## Verification

- `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/batch-06-source-health-after-pass2.json --concurrency 8 --timeout-ms 8000`
- `npm run ledger:pages && npm run ledger:pages:check`
- `node scripts/check-frontmatter.mjs --changed`
- `AIPEDIA_CURRENT_DATE=2026-06-27 npm run audit:coverage-quality:changed`
- `npm run audit:provenance:changed -- --json`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- `AIPEDIA_CURRENT_DATE=2026-06-27 npm run runner:page-refresh:closeout`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --route /categories/ai-chatbots/ --route /categories/ai-infrastructure/ --route /categories/ai-coding/ --route /categories/ai-design/ --route /categories/ai-image/ --route /categories/ai-voice/ --route /categories/ai-writing/ --route /categories/ai-search/ --route /categories/ai-video/ --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/aipedia-runner/page-refresh/batch-06-category-route-qa.json`

## Next

- Continue oldest-first from the regenerated strict 3-day queue.
- Remaining stale mix: 37 comparisons, 30 companies, 21 static pages, 19 guides, 14 workflows, 7 trends, 8 dead archive pages, 6 tools, 2 crawl surfaces, and 1 report.
