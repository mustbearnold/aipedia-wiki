# 2026-06-27 Page Refresh Batch 08

Status: verified locally.

## Scope

- Refreshed 24 routes: `/dead/play-ht/`, `/dead/sora/`, `/reports/2026-04/`, `/404/`, `/about/editorial/`, `/about/scoring/`, `/tool-finder/`, `/robots.txt`, `/workflows/micro-saas-weekend-build/`, `/about/our-stack/`, `/privacy/`, `/guides/best-ai-avatar-video-generator/`, `/trends/agent-commerce/`, `/trends/vibe-coding/`, `/companies/openai/`, `/admin/reviews/`, `/answers/best-ai-image-generator-2026/`, `/answers/best-free-ai-tools-2026/`, `/answers/chatgpt-alternatives-2026/`, `/answers/is-cursor-worth-it/`, `/answers/is-midjourney-worth-it/`, `/trends/geo-trend/`, `/companies/adobe/`, and `/companies/amazon/`.
- Updated affected top-layer and parent surfaces: `/`, `/answers/`, `/reports/`, `/trends/`, `/workflows/`, `/companies/`, `/dead/`, `/guides/`, plus AI Video, AI Image, AI Chatbots, AI Coding, and AI Search category hubs.
- Supplemental route QA covered `/about/` because about child pages were refreshed.
- Regenerated `PAGE_REFRESH_LEDGER.md`.
- Strict 3-day stale count after this batch: 96 tracked pages older than 2026-06-24.

## Source And Content Notes

- Batch source health checked 176 URLs during closeout: 157 ok, 19 access-sensitive, 0 broken, and 0 unreachable.
- OpenAI company profile received a June 27 recent-news note while preserving historical June 12, June 13, and June 15 event dates.
- The stale-date scan showed only historical event dates and news-route slugs after refresh labels were moved to June 27.
- Archived noindex routes remained excluded from normal indexable route QA by planner policy.

## Timing

- Planner timing baseline for this batch: 0.636s.
- Passing closeout receipt: `local/tmp/aipedia-runner/page-refresh/receipts/2026-06-27T01-10-17Z-page-refresh-closeout.md`.
- Total passing closeout: 82.427s.
- Cheap gates: 2.227s.
- Source health: 17.835s.
- Typecheck: 13.945s.
- Build fast: 16.112s.
- Content route QA: 32.301s.
- Supplemental parent/category route QA: 11.214s.

Worker report scaffolds parsed 6/6, but this batch was executed in-thread rather than with live worker agents. Treat scaffold worker elapsed/source/caveat metrics as empty, and use the closeout/source-health/route-QA timings above for optimization.

## Verification

- `node scripts/check-frontmatter.mjs --changed`
- `AIPEDIA_CURRENT_DATE=2026-06-27 npm run audit:coverage-quality:changed`
- `npm run audit:provenance:changed -- --json`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- `npm run ledger:pages:check`
- `AIPEDIA_CURRENT_DATE=2026-06-27 npm run runner:page-refresh:closeout`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --route /reports/ --route /dead/ --route /companies/ --route /about/ --route /categories/ai-video/ --route /categories/ai-image/ --route /categories/ai-chatbots/ --route /categories/ai-coding/ --route /categories/ai-search/ --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/aipedia-runner/page-refresh/batch-08-parent-route-qa.json`

## Next

- Continue oldest-first from the regenerated strict 3-day queue.
- Remaining stale mix: 37 comparisons, 24 companies, 18 guides, 8 static pages, 6 tools, 1 workflow, 1 dead archive page, and 1 crawl surface.
