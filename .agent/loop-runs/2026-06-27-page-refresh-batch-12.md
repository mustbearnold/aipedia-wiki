# 2026-06-27 Page Refresh Batch 12

Status: complete locally, verified, pending commit and push.

## Scope

- Planned routes: 18.
- Page-refresh planner: `npm run runner:page-refresh:plan -- --limit 18 --workers 6 --pages-per-worker 3`.
- Refreshed the final non-tool tail for the strict 3-day target: 13 guide routes, Anthropic company profile, GitHub Copilot vs Supermaven, `/media-kit/`, `/workflows/design-agency-replacement/`, and `/sitemap-index.xml`.
- Parent and top-layer updates: `/`, `/guides/`, `/companies/`, `/compare/`, `/workflows/`, AI Coding, AI Automation, AI Music, AI Voice, AI Design, and AI Chatbots route-checked for inherited freshness.

## Source Repairs

- Replaced the slow Adobe generative credits FAQ citation with the current Adobe Firefly plans and credits page on affected guide pages.
- Follow-up source health passed with 218 URLs, 195 OK, 23 access-sensitive, and 0 broken or unreachable in 15.108s.

## Verification

- `npm run runner:page-refresh:closeout` passed.
- Closeout receipt: `local/tmp/aipedia-runner/page-refresh/receipts/2026-06-27T01-59-29Z-page-refresh-closeout.md`.
- Total closeout: 76.818s.
- Cheap gates: 2.329s.
- Expensive gates: 60.002s.
- Source health: 14.481s, 218 URLs, 193 OK, 25 access-sensitive, 0 broken, 0 unreachable.
- Typecheck: 13.879s.
- Build fast: 16.824s.
- Content route QA: 29.299s across 25 routes at 319, 360, 390, 430, 768, 1024, and 1366 px.
- Supplemental parent route QA passed for `/companies/`, AI Coding, AI Automation, AI Music, AI Voice, AI Design, and AI Chatbots in 9.384s across the same viewport matrix.

## Result

- Strict 3-day stale count after this batch: 6 tracked pages.
- Remaining rows are all tools: `/tools/phind/`, `/tools/tome/`, `/tools/semrush-demo/`, `/tools/dalle/`, `/tools/dext/`, and `/tools/grok-code-fast/`.

## Optimization Notes

- Route QA remains the largest single closeout gate at 29.299s for this smaller batch.
- Source health is now stable enough to keep enabled by default. It caught the Adobe timeout candidate before closeout, and the replacement reduced broken or unreachable sources to zero.
- The final phase should switch to `$aipedia-tool-refresh-workflow` and the Rust tool runner so source registry, tool quality, hub staleness, and route-QA timing stay aligned with the proven tool lane.
