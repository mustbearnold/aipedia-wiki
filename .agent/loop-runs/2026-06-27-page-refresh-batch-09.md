# 2026-06-27 Page Refresh Batch 09

Status: verified locally.

## Scope

- Refreshed 24 routes: `/companies/anysphere/`, `/companies/assemblyai/`, `/companies/bytedance/`, `/companies/character-ai-company/`, `/companies/cognition/`, `/companies/descript-company/`, `/companies/groq-company/`, `/companies/heygen-company/`, `/companies/hugging-face/`, `/companies/luma-company/`, `/companies/meta/`, `/companies/microsoft/`, `/companies/midjourney/`, `/companies/minimax/`, `/companies/notion/`, `/companies/perplexity/`, `/companies/replit/`, `/companies/runway/`, `/companies/stability-ai/`, `/companies/suno/`, `/companies/synthesia-company/`, `/companies/xai/`, `/guides/best-ai-for-meeting-notes/`, and `/guides/best-ai-for-newsletter-writers/`.
- Updated affected top-layer and parent surfaces: `/`, `/companies/`, `/guides/`, AI Writing, AI Notes, and AI Voice.
- Regenerated `PAGE_REFRESH_LEDGER.md`.
- Strict 3-day stale count after this batch: 72 tracked pages older than 2026-06-24.

## Source And Content Notes

- Batch source health initially failed on the Anysphere Wikipedia source timing out.
- Instead of only retrying, the page was materially corrected for current June 2026 Anysphere/Cursor reporting: SpaceX's reported $60B all-stock acquisition agreement, expected Q3 close, and Cursor/SpaceX technical collaboration context.
- Added live CBS/AP, Ars Technica, and Cursor sources to Anysphere and removed the timeout-prone Wikipedia source.
- The fixed source-health set checked 45 URLs: 41 ok, 4 access-sensitive, 0 broken, and 0 unreachable.

## Timing

- Planner timing baseline for this batch: 0.628s.
- Failed closeout receipt before Anysphere source repair: `local/tmp/aipedia-runner/page-refresh/receipts/2026-06-27T01-18-54Z-page-refresh-closeout.md`.
- Passing closeout receipt: `local/tmp/aipedia-runner/page-refresh/receipts/2026-06-27T01-23-45Z-page-refresh-closeout.md`.
- Total passing closeout: 73.564s.
- Cheap gates: 2.320s.
- Source health: 5.120s.
- Typecheck: 13.258s.
- Build fast: 16.597s.
- Content route QA: 36.263s.
- Supplemental parent/category route QA: 5.635s.

Worker report scaffolds parsed 6/6, but this batch was executed in-thread rather than with live worker agents. Treat scaffold worker elapsed/source/caveat metrics as empty, and use the closeout/source-health/route-QA timings above for optimization.

## Verification

- `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/batch-09-source-health-before.json --concurrency 8 --timeout-ms 8000`
- `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/batch-09-source-health-after-anysphere.json --concurrency 8 --timeout-ms 8000`
- `node scripts/check-frontmatter.mjs --changed`
- `AIPEDIA_CURRENT_DATE=2026-06-27 npm run audit:coverage-quality:changed`
- `npm run audit:provenance:changed -- --json`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- `AIPEDIA_CURRENT_DATE=2026-06-27 npm run runner:page-refresh:closeout`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --route /companies/ --route /categories/ai-writing/ --route /categories/ai-notes/ --route /categories/ai-voice/ --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/aipedia-runner/page-refresh/batch-09-parent-route-qa.json`

## Next

- Continue oldest-first from the regenerated strict 3-day queue.
- Remaining stale mix: 37 comparisons, 16 guides, 8 static pages, 6 tools, 2 companies, 1 workflow, 1 dead archive page, and 1 crawl surface.
