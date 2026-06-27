# 2026-06-27 Page Refresh Batch 07

Status: verified locally.

## Scope

- Refreshed 24 routes: 4 trend routes, 12 workflow routes, 3 company profiles, and 5 dead-tool archive pages.
- Trend routes: `/trends/google-stitch-disruption/`, `/trends/long-context-standard/`, `/trends/open-source-parity/`, and `/trends/sovereign-ai-procurement/`.
- Workflow routes: `/workflows/accountant-stack/`, `/workflows/agency-sales-stack/`, `/workflows/agentic-coding-workflow/`, `/workflows/consultant-stack/`, `/workflows/newsletter-stack/`, `/workflows/podcast-automation-stack/`, `/workflows/research-assistant-stack/`, `/workflows/researcher-stack/`, `/workflows/sdr-stack/`, `/workflows/seo-content-pipeline/`, `/workflows/solo-founder-stack/`, and `/workflows/youtube-content-stack/`.
- Company and dead-tool routes: ElevenLabs, Google DeepMind, Mistral, Bing Chat, Google Bard, GPT-3 API, Meta Imagine, and OpenAI Codex.
- Updated top-layer and parent surfaces: `/`, `/trends/`, `/workflows/`, `/companies/`, `/dead/`, AI Coding, `/llms.txt`, and `/llms-full.txt`.
- Regenerated `PAGE_REFRESH_LEDGER.md`.
- Strict 3-day stale count after this batch: 120 tracked pages older than 2026-06-24.

## Source Repairs

- Replaced broken Google Stitch launch links with `https://stitch.withgoogle.com/`.
- Replaced the broken Dext practice URL with `https://dext.com/us/partner`.
- Replaced the broken AdCreative pricing URL with the live official AdCreative homepage.
- Replaced the broken Meta Emu publication URL with the live Meta Emu publication page.
- Rechecked 185 batch source URLs with `page:source-health`: 170 ok, 15 access-sensitive, 0 broken, and 0 unreachable during closeout.

## Layout Repair

- Fixed a narrow-mobile company-page containment defect found by closeout route QA on `/companies/google-deepmind/` at 319 px.
- Added company-prose containment so long Markdown-generated source links wrap and generated tables scroll inside the prose lane instead of extending outside the viewport.
- Targeted rerun passed `/companies/google-deepmind/` at 319, 360, 390, 430, 768, 1024, and 1366 px before the full closeout rerun.

## Timing

- Failed closeout receipt before layout fix: `local/tmp/aipedia-runner/page-refresh/receipts/2026-06-27T00-49-47Z-page-refresh-closeout.md`.
- Passing closeout receipt: `local/tmp/aipedia-runner/page-refresh/receipts/2026-06-27T00-54-09Z-page-refresh-closeout.md`.
- Total passing closeout: 85.882s.
- Cheap gates: 2.439s.
- Source health: 16.858s.
- Typecheck: 12.901s.
- Build fast: 16.831s.
- Content route QA: 36.845s.
- Supplemental parent route QA: 7.348s.

Worker report scaffolds parsed 6/6, but this batch was executed in-thread rather than with live worker agents. Treat scaffold worker elapsed/source/caveat metrics as empty, and use the closeout/source-health/route-QA timings above for optimization.

## Verification

- `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/batch-07-source-health-after-pass1.json --concurrency 8 --timeout-ms 8000`
- `npm run ledger:pages && npm run ledger:pages:check`
- `node scripts/check-frontmatter.mjs --changed`
- `AIPEDIA_CURRENT_DATE=2026-06-27 npm run audit:coverage-quality:changed`
- `npm run audit:provenance:changed -- --json`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- `npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --route /companies/google-deepmind/ --widths 319,360,390,430,768,1024,1366 --concurrency 1 --timing-file local/tmp/aipedia-runner/page-refresh/batch-07-google-deepmind-route-qa-after-fix.json`
- `AIPEDIA_CURRENT_DATE=2026-06-27 npm run runner:page-refresh:closeout`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 3 --route /companies/ --route /dead/ --route /categories/ai-coding/ --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/aipedia-runner/page-refresh/batch-07-parent-route-qa.json`
- `npm run typecheck && npm run build:fast`
- `grep -n "Recent page refresh: June 27" dist-fast/client/llms.txt dist-fast/client/llms-full.txt`

## Next

- Continue oldest-first from the regenerated strict 3-day queue.
- Remaining stale mix: 37 comparisons, 27 companies, 20 static pages, 19 guides, 3 trends, 2 workflows, 3 dead archive pages, 6 tools, 2 crawl surfaces, and 1 report.
