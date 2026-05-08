# Avatar Video Money Guide ExecPlan

## 1. Objective

Create a dedicated, mobile-first `/guides/best-ai-avatar-video-generator/` buyer guide for avatar, presenter, talking-head, localization, training, UGC, and interactive video-agent intent. The page should absorb the avatar-video traffic that the general AI video guide correctly excludes from cinematic/model ranking.

## 2. Current state

AiPedia has refreshed tool pages for HeyGen, Synthesia, and Tavus, plus existing pages for D-ID, Hedra, Argil, and Captions.ai. The general `/guides/best-ai-video-generator/` page now tells users that HeyGen belongs in avatar video, but there is no dedicated avatar-video money page. The existing `/guides/synthesia-alternatives/` page is thinner and uses stale April-era pricing language plus tools that are not all represented in the current data set.

## 3. Target state

- New use-case guide: `src/content/use-cases/best-ai-avatar-video-generator.md`.
- Mobile first screen should use GuideLayout decision cards: best overall, budget/creator, and pro/team picks.
- The page should distinguish business avatar video, enterprise L&D, live conversational avatars, creator character video, UGC clones, and short-form social editing.
- Update the AI video category and Synthesia-alternatives page to link into the new guide.
- Use only current facts verified on May 8, 2026 from official vendor/pricing/docs pages and recently refreshed tool data.

## 4. Scope

Included: new guide, source-backed copy, internal links from category and alternatives page, focused route QA, build/check. Excluded: new comparison routes, affiliate application work, and full D-ID/Hedra/Argil/Captions tool-page rewrites.

## 5. Files expected to change

- `src/content/use-cases/best-ai-avatar-video-generator.md`
- `src/content/use-cases/synthesia-alternatives.md`
- `src/content/categories/ai-video.md`
- `.agent/AVATAR_VIDEO_MONEY_GUIDE_EXECPLAN.md`

## 6. Source basis

Checked on May 8, 2026: HeyGen pricing/API/Avatar V pages, Synthesia pricing/avatar/Express-2 pages, Tavus pricing/CVI/Phoenix docs, D-ID Studio pricing/Visual Agents/docs, Hedra pricing/home pages, Argil pricing/home pages, and Captions pricing/overview pages.

## 7. Implementation steps

1. Add the new guide with structured `guide_picks`, current dates, and tool references.
2. Keep tables compact and back them up with mobile-safe bullets and decision sections.
3. Rewrite Synthesia-alternatives so it is a support page, not the only avatar-video page.
4. Add internal links from the AI video category to the new guide.
5. Run provenance/build/check and focused mobile overflow checks for the new and touched guide routes.

## 8. Verification plan

- `npm run audit:provenance`
- `npm run build:fast`
- `npm run check`
- Focused Playwright mobile QA for `/guides/best-ai-avatar-video-generator/`, `/guides/synthesia-alternatives/`, and `/categories/ai-video/` at 360, 390, 430, 768, and 1024 px.
- Open the new guide in the in-app browser.

## 9. Risks

Pricing and plan packaging are volatile. The guide should prefer buyer-route guidance and source-backed price anchors over overconfident per-credit math. D-ID/Hedra/Argil/Captions tool pages are current to May 4, 2026 but still deserve future full refresh passes.

## 10. Progress log

- 2026-05-08: Started after refreshing HeyGen, Synthesia, and Tavus. Confirmed no dedicated avatar-video guide exists and checked official D-ID, Hedra, Argil, and Captions pages live.
- 2026-05-08: Added `/guides/best-ai-avatar-video-generator/` with structured guide picks, current source-backed buyer sections, and mobile-safe decision content.
- 2026-05-08: Rebuilt `/guides/synthesia-alternatives/` as a support page that now points to the broader avatar-video guide and removes stale April-era alternative framing.
- 2026-05-08: Added AI video category links into the new avatar-video guide so avatar-intent readers have a clear next click from `/categories/ai-video/`.
- 2026-05-08: Ran provenance, fast build, full check, visual smoke tests, in-app browser verification, and focused mobile QA at 360, 390, 430, 768, and 1024 px. All passed after rerunning the QA script as a proper Node module.

## 11. Final report

Completed on 2026-05-08. The avatar-video cluster now has a dedicated indexable money guide, a stronger Synthesia-alternatives support page, current official source coverage, and category-level internal links. The in-app browser is open to `/guides/best-ai-avatar-video-generator/`; visual smoke and focused mobile QA found zero horizontal overflow on the new guide, Synthesia alternatives page, and AI video category.
