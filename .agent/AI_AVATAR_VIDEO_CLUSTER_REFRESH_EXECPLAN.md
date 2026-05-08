# AI Avatar Video Cluster Refresh ExecPlan

## 1. Objective

Refresh the highest-value avatar-video pages so AiPedia cleanly separates presenter/avatar business video from frontier cinematic AI video. This protects search intent matching, trust, and conversion quality after the AI video guide/category rebuild.

## 2. Current state

`src/content/tools/heygen.md` and `src/content/tools/synthesia.md` have May frontmatter but April body copy, wide tables, old verification language, and exact pricing/model claims that need current official-source checks. `src/content/tools/tavus.md` is older and still uses a generic non-Tier-1 profile tone despite being an important real-time conversational avatar platform.

## 3. Target state

- HeyGen: present it as the avatar/localization/business-video pick, not a general scene-generation model. Keep claims anchored to current HeyGen pricing, Avatar IV, API, and policy docs.
- Synthesia: present it as the enterprise L&D/training/compliance pick, with current pricing and workflow claims sourced from official pricing/product/help pages.
- Tavus: present it as the developer-first real-time conversational avatar/API pick, with current pricing, CVI docs, Phoenix model docs/announcement, and privacy/usage risks.

## 4. Scope

Included: source registry updates, the three tool pages, focused route QA, build/smoke/provenance checks, and browser verification. Excluded: new guide page creation, new comparison routes, and affiliate application work.

## 5. Files expected to change

- `src/content/tools/heygen.md`
- `src/content/tools/synthesia.md`
- `src/content/tools/tavus.md`
- `src/data/source-registry.json`
- `.agent/AI_AVATAR_VIDEO_CLUSTER_REFRESH_EXECPLAN.md`

## 6. Source basis

Use current official sources checked on May 8, 2026: HeyGen pricing/help/API/Avatar V and Avatar IV API pages; Synthesia pricing/product/help/API/avatar pages; Tavus pricing/CVI/docs/Phoenix pages. Prefer official sources and avoid unsupported exact claims when a pricing page is dynamic, internally inconsistent, or account-gated.

## 7. Implementation steps

1. Verify current official sources for HeyGen, Synthesia, and Tavus.
2. Update source registry IDs and `last_checked` fields.
3. Rewrite pages into mobile-safe buyer guides with bullets instead of wide tables.
4. Run source/provenance/build/smoke and focused mobile overflow checks.
5. Open one refreshed route in the in-app browser and record status.

## 8. Verification plan

- `node -e "JSON.parse(require('fs').readFileSync('src/data/source-registry.json','utf8')); console.log('source registry ok')"`
- stale-claim sweep for old dates, unsupported "Veo 3", and April verification text
- `npm run audit:provenance`
- `npm run build:fast`
- `npm run smoke:visual`
- focused route overflow checks for `/tools/heygen/`, `/tools/synthesia/`, and `/tools/tavus/` at 360, 390, 430, 768, and 1024 px

## 9. Risks

Pricing pages may be dynamic and may vary by account, region, or annual/monthly toggle. Do not overpromise commercial rights, credit math, or avatar limits where a source is not stable. These tools overlap but are not substitutes for frontier model/video-generator pages, so language must preserve category boundaries.

## 10. Progress log

- 2026-05-08: Started after AI video Hailuo/Vidu refresh. Local audit found stale April body copy and broad comparison tables on HeyGen/Synthesia/Tavus.
- 2026-05-08: Refreshed HeyGen around Avatar V, Avatar IV API, separate app/API buying surfaces, and current Creator/Pro/Business pricing.
- 2026-05-08: Refreshed Synthesia around Express-2, enterprise L&D positioning, current Basic/Starter/Creator/Enterprise pricing, and the public Creator API access correction.
- 2026-05-08: Refreshed Tavus around CVI, Phoenix-4, Raven-1, Sparrow-1, current developer pricing, overage anchors, and a procurement warning for the public Growth concurrency inconsistency.
- 2026-05-08: Ran source-registry JSON validation, stale-claim sweep, provenance audit, visual smoke tests, focused mobile QA, full check suite, and final fast build. The first full check found one Vidu news cross-reference gap, then passed after adding the Vidu funding link.

## 11. Final report

Completed on 2026-05-08. HeyGen, Synthesia, and Tavus are now current, source-backed avatar-video tool pages instead of stale April-era video-generator carryovers. The Vidu page now links the April 10, 2026 Shengshu/Alibaba funding news item so the news cross-reference audit passes. The in-app browser was opened to `/tools/tavus/` after verification.
