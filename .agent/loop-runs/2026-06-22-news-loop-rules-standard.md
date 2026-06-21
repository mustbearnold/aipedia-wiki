# 2026-06-22 News Loop Rules Standard

## Status

Complete in the verified June 22 batch.

## Why

The June 18 through June 22 news catch-up exposed a rule that needs to live in the loop system, not just in conversation: news catch-up must check every missed date and decide separately whether broad AI news and AI tools or tool-control news both deserve source-backed coverage.

## Changed

- Added a dedicated news coverage discipline to `.agent/OPERATING_RULES.md`.
- Updated `.agent/LOOPS.md` so future agents check missed dates, broad AI news, AI tools or tool-control news, `/news/`, homepage latest-news, OG assets, affected-tool links, crawl surfaces, ledger rows, and route QA.
- Updated `src/data/aipedia-loops.json` so the executable News and Market Change loop exposes those same requirements.
- Added `tests/scripts/aipedia-loops.test.mjs` coverage so the rule remains visible in structured loop-registry output.
- Recorded a fresh system loop receipt under `.agent/loop-runs/system/` after rebuilding stale rendered output.

## Verification

- `node --test tests\scripts\aipedia-loops.test.mjs`
- `npm run loop:system -- --json`
- `npm run loop:news -- --json`
- `npm run loop:all:record -- --json`
- `npm run build:fast`
- `npm run loop:all:record -- --json`
- `npm run qa:route -- --route /news/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `node scripts\guard-em-dashes.mjs`

## Result

- The first broad recorded loop correctly flagged stale built output for Revenue/Conversion and Performance/UX because `dist-fast/client` was older than homepage source edits.
- `npm run build:fast` refreshed the build and passed guard checks, active-month news coverage, ledger check, indexability, commercial CTA audit, and dist budgets.
- The second broad recorded loop passed with 7 ok / 0 attention / 0 skipped.
- The News loop checked 410 news files, 0 issues, 0 cross-reference gaps, and `min_stories_per_day: 2`.
- Homepage and `/news/` route QA passed at 319, 360, 390, 430, 768, 1024, and 1366 px.

## Next

The existing June 21 to June 22 `/goal` is still the correct umbrella. Do not create a duplicate goal while it exists. Finish the paused Claude and Claude Code freshness batch first, then rerun and record all loops. After that, choose between Gemini freshness and the Amazon Q vs GitHub Copilot decision cycle based on the fresh loop recommendations.
