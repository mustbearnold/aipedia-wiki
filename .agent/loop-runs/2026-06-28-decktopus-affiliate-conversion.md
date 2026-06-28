# 2026-06-28 Decktopus Affiliate Conversion Slice

Status: Complete locally, verified by subagents and route QA, pending commit and push.

Objective: add one high-intent, source-backed affiliate buyer page for Decktopus without regressing freshness, top-layer surfaces, search/discovery, commercial CTA tracking, mobile layout quality, or source accuracy.

## Slice

Added:

- `/guides/best-ai-proposal-deck-tool-for-consultants/`

Refreshed:

- `/tools/decktopus/`
- `/categories/ai-presentation/`
- `/guides/best-ai-for-presentations/`
- `/guides/best-presentation-tool-for-smb-sales-teams/`
- `/workflows/consultant-stack/`
- `/workflows/agency-sales-stack/`
- `/guides/`
- `/tools/`
- `/categories/`
- `/workflows/`
- `/`
- `/explore/`
- `/search/`
- `/llms.txt`
- `/llms-full.txt`
- `PAGE_REFRESH_LEDGER.md`

## Current Sources

Primary source checks used June 2026 queries and live source health:

- Decktopus official site.
- Decktopus pricing.
- Decktopus business proposal maker.
- Decktopus affiliate page.

The content keeps stronger claims to verified fields: forms, submissions, calendar embedding, analytics, custom links, custom domains, Business plan team/workflow features, webhook, public prices, affiliate commission, and cookie window.

## Subagent Review

Parallel review covered:

- Source accuracy and fact risk.
- Affiliate, SEO, doorway risk, and top-layer coverage.
- Rendered route QA and layout containment.

Fixes made after review:

- Removed unsupported recurring-commission language.
- Added Decktopus proposal and pricing sources to affected workflow pages.
- Kept broad parent and sibling pages as updated on 2026-06-28, while preserving older `last_verified` values where only the Decktopus lane was rechecked.
- Added Decktopus to consultant and agency workflow `stack` arrays so cards render the updated recommendation.
- Added LLM and top-layer refresh notes.
- Shortened CTA labels after narrow and tablet route QA found overflow risk.

## Timing

Raw route and viewport timing:

```text
.agent/timings/decktopus-affiliate-route-qa-2026-06-28.json
```

Final affected-route QA:

- Routes: 14.
- Widths: 319, 360, 390, 430, 768, 1024, 1366.
- Concurrency: 6.
- Duration: 18,458 ms.
- Slowest route total: `/search/`, 13,609 ms, intentionally noindex and allowed.
- New guide route total: 7,531 ms.
- New guide max viewport check: 1,125 ms.

Build timing:

- `npm run build:fast`: about 14.5 seconds on the final pre-route-QA pass.

## Verification

Passed:

```bash
npm run runner:affiliate-conversion:reports -- --strict
npm run affiliate:conversion:inventory -- --json
npm run audit:affiliate-conversion -- --strict --json
npm run ledger:pages
npm run ledger:pages:check
node scripts/guard-em-dashes.mjs
git diff --check
npm run --silent audit:sources -- --json --live --limit 0 --source-id decktopus-official --source-id decktopus-pricing --source-id decktopus-proposal-maker --source-id decktopus-affiliate
npm run audit:provenance:changed -- --json
npm run typecheck
npm run build:fast
npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --allow-noindex --timing-file .agent/timings/decktopus-affiliate-route-qa-2026-06-28.json --route /guides/best-ai-proposal-deck-tool-for-consultants/ --route /tools/decktopus/ --route /categories/ai-presentation/ --route /guides/best-ai-for-presentations/ --route /guides/best-presentation-tool-for-smb-sales-teams/ --route /workflows/agency-sales-stack/ --route /workflows/consultant-stack/ --route /guides/ --route /tools/ --route /categories/ --route /workflows/ --route / --route /explore/ --route /search/
```

Generated surfaces checked:

- `dist-fast/client/api/home-search.json` contains the new guide route.
- `dist-fast/client/llms.txt` contains the Decktopus affiliate refresh.
- `dist-fast/client/llms-full.txt` contains the new guide route.
- `dist-fast/client/sitemap-0.xml` contains the new guide route.

## Workflow Improvement Notes

- Keep `--timing-file` on every route QA pass. Per-route and per-width timings make slow surfaces obvious without guessing.
- Use `--allow-noindex` when route QA includes intentional utility pages such as `/search/`.
- Let subagents review before final CTA and top-layer edits, then rerun route QA after copy changes because button labels can regress containment.
- The next speed win is to add a scripted "affiliate slice finalizer" that runs source health, affiliate audit, ledger check, provenance, build, surface presence checks, and route QA with a single timestamped timing bundle.
