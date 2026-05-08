# AI Video Category Hub ExecPlan

## 1. Objective

Refresh `/categories/ai-video/` so it is a current, mobile-first buyer hub for May 8, 2026. The page should align with the updated best AI video guide and four-way comparison: Seedance 2.0, Kling 3.0, Veo 3.1, and Runway solve different buyer jobs, while HeyGen and Synthesia belong in avatar/business video.

## 2. Current state

`src/content/categories/ai-video.md` still carries stale April framing, older Runway pricing, Veo 3 wording, unsupported benchmark language, an overprominent Sora shutdown angle, and a wide markdown table. The rendered category hero also auto-selects top picks from score sorting, which currently surfaces Wan as the budget pick even though the strategic category route should highlight Seedance, Kling, and Runway.

## 3. Target state

The mobile first screen should show explicit category picks:

- Best overall: Seedance 2.0
- Best free or budget: Kling 3.0
- Best pro or team: Runway

The body should explain where Veo 3.1, Pika, HeyGen, Synthesia, Wan, Luma, Hailuo, Vidu, and other tools fit without pretending every video product is the same kind of buyer decision.

## 4. Scope

Included: category content, category top-pick data support, schema typing, and verification. Excluded: individual stale long-tail video tool pages, controlled video benchmark infrastructure, and affiliate-program applications.

## 5. Files expected to change

- `src/content/categories/ai-video.md`
- `src/content.config.ts`
- `src/pages/categories/[slug].astro`
- `src/layouts/CategoryLayout.astro`
- `src/styles/t2-canvas.css`
- `.agent/AI_VIDEO_CATEGORY_HUB_EXECPLAN.md`

## 6. Source basis

Use current official sources verified May 8, 2026: ByteDance Seedance 2.0 pages, Kuaishou Kling 3.0 launch, Google Veo 3.1 API docs/pricing, Runway pricing/API pages, Pika pricing, HeyGen pricing, and Synthesia pricing.

## 7. Implementation steps

1. Add optional category `top_picks` frontmatter support.
2. Make `CategoryLayout` use configured picks when present, falling back to score-derived picks elsewhere.
3. Rewrite the AI video category body into stacked, mobile-safe decision sections with current sources.
4. Run provenance/build/visual smoke and direct `/categories/ai-video/` mobile QA.

## 8. Verification plan

- `npm run audit:provenance`
- `npm run build:fast`
- `npm run smoke:visual`
- Direct route QA for `/categories/ai-video/` at 360, 390, 430, 768, and 1024 px.

## 9. Risks

AI video model access and pricing are volatile. The page must avoid unverified benchmark certainty and route users to verify exact model access, rights, watermark rules, API pricing, and regional availability before paying.

## 10. Progress log

- 2026-05-08: Started AI video category hub rebuild after Runway page verification exposed the category page as the stale node in the video cluster.
- 2026-05-08: Added optional category `top_picks` frontmatter support and wired `CategoryLayout` to honor explicit picks while preserving score-derived fallback picks for other categories.
- 2026-05-08: Rewrote `src/content/categories/ai-video.md` around the current May 8, 2026 buyer split: Seedance 2.0 for raw model testing, Kling 3.0 for value/cinematic testing, Veo 3.1 for Google/API/provenance, Runway for production workflow, and HeyGen/Synthesia for avatar video.
- 2026-05-08: Fixed mobile category filter wrapping so controls no longer depend on horizontal scrolling at 360-430 px.
- 2026-05-08: Verified `/categories/ai-video/` at 360, 390, 430, 768, and 1024 px with no horizontal overflow; confirmed title, canonical, and configured top-pick cards.
- 2026-05-08: Opened `/categories/ai-video/` in the Codex in-app browser and confirmed the mobile-first decision surface renders with Seedance 2.0, Kling 3.0, and Runway top picks.

## 11. Final report

Completed. Verification passed with `npm run audit:provenance`, `npm run build:fast`, `npm run smoke:visual`, direct Playwright overflow checks at 360/390/430/768/1024 px, and an in-app browser check on `http://127.0.0.1:4321/categories/ai-video/`.
