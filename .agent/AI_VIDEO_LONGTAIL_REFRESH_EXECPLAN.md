# AI Video Long-Tail Refresh ExecPlan

## 1. Objective

Refresh the highest-risk AI video long-tail pages that the rebuilt `/categories/ai-video/` page now links to. The immediate target is Hailuo AI and Vidu because both are monetizable/searchable video pages with stale April-era body copy, old model framing, and current-date mismatches.

## 2. Current state

`src/content/tools/hailuo.md` has May 4 frontmatter but April 17 body claims, older Veo 3/Runway Gen-3 wording, wide pricing/comparison tables, and exact consumer subscription prices that are hard to verify from the static Hailuo pricing page. `src/content/tools/vidu.md` is worse: it still frames Vidu Q1 as the flagship even though current official Vidu pages and API docs surface Vidu Q3, Vidu Q2, and newer Q3/Q2 pricing routes.

## 3. Target state

Both pages should be current as of May 8, 2026, source-backed, mobile-safe, and honest about buyer fit:

- Hailuo: MiniMax/Hailuo 2.3 and 2.3 Fast are useful for low-cost short-video testing, API/video packages, and social clips, but users should compare frontier output against Seedance, Kling, Veo, and Runway.
- Vidu: Vidu Q3/Q2/Q1 must be separated clearly. Q3 is the current story/native-audio route, Q2 is the flexible pricing/API route, and Q1 remains a 5-second 1080P reference route.

## 4. Scope

Included: `src/content/tools/hailuo.md`, `src/content/tools/vidu.md`, source registry updates, and verification. Excluded: new comparison pages, controlled benchmark infrastructure, and affiliate-program applications.

## 5. Files expected to change

- `src/content/tools/hailuo.md`
- `src/content/tools/vidu.md`
- `src/data/source-registry.json`
- `.agent/AI_VIDEO_LONGTAIL_REFRESH_EXECPLAN.md`

## 6. Source basis

Use current primary sources checked May 8, 2026: MiniMax Hailuo 2.3 launch page, MiniMax video generation API docs, MiniMax video package pricing, MiniMax token-plan pricing, Hailuo pricing page where crawlable, Vidu Q3 official page, Vidu reference-to-video page, Vidu API quickstart, Vidu API pricing, and Vidu reference-to-video API docs.

## 7. Implementation steps

1. Add precise source registry IDs for Hailuo and Vidu current docs/pricing/model pages.
2. Rewrite Hailuo page around current MiniMax/Hailuo 2.3 buyer fit and remove stale exact consumer-plan overclaims where current static verification is weak.
3. Rewrite Vidu page around Q3/Q2/Q1 separation and current API pricing.
4. Run provenance/build/visual smoke and focused mobile QA for `/tools/hailuo/` and `/tools/vidu/`.

## 8. Verification plan

- `node -e "JSON.parse(require('fs').readFileSync('src/data/source-registry.json','utf8')); console.log('source registry ok')"`
- `npm run audit:provenance`
- `npm run build:fast`
- `npm run smoke:visual`
- Direct route overflow checks for `/tools/hailuo/` and `/tools/vidu/` at 360, 390, 430, 768, and 1024 px.

## 9. Risks

Hailuo consumer pricing is dynamic and difficult to statically audit; avoid exact consumer-plan promises unless the official page can be verified. Vidu pricing differs across consumer and API surfaces, and Q3/Q2/Q1 model routes have different capabilities and costs.

## 10. Progress log

- 2026-05-08: Started after Wan refresh. Local audit found Vidu Q1 flagship framing and Hailuo April body copy as the next trust/revenue risks in the AI video cluster.
- 2026-05-08: Added current official source registry entries for MiniMax/Hailuo 2.3, MiniMax video API/package pricing, Vidu Q3, Vidu reference-to-video, Vidu API quickstart, Vidu API pricing, and Vidu API reference-to-video docs.
- 2026-05-08: Rewrote `src/content/tools/hailuo.md` around Hailuo 2.3/2.3 Fast buyer fit, removed stale exact consumer-plan tables, and kept exact pricing only where official MiniMax API/package docs expose it.
- 2026-05-08: Rewrote `src/content/tools/vidu.md` around Vidu Q3/Q2/Q1 separation, current Q3 native-audio story positioning, reference-to-video strengths, and official API pricing.
- 2026-05-08: Verified source registry JSON, stale-claim sweep, provenance audit, fast build, visual smoke suite, focused mobile overflow checks, and in-app browser routes for `/tools/hailuo/` and `/tools/vidu/`.

## 11. Final report

Completed this pass. `npm run build:fast`, `npm run smoke:visual`, and `npm run audit:provenance` all passed. Focused Playwright QA returned 200s and no horizontal overflow for `/tools/hailuo/` and `/tools/vidu/` at 360, 390, 430, 768, and 1024 px. The in-app browser was opened on the refreshed Vidu page after also verifying the Hailuo title and H1.
