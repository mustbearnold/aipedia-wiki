# Wan Page Refresh ExecPlan

## 1. Objective

Refresh `/tools/wan/` so it fits the May 8, 2026 AI video strategy: Wan is a credible open-weights and Alibaba Cloud/API option, but it should not be over-positioned above Seedance 2.0, Kling 3.0, Veo 3.1, or Runway for most buyers without a current prompt test.

## 2. Current state

`src/content/tools/wan.md` is April-framed, uses one generic `wan-pricing` source ID for too many claims, leans heavily on third-party/press-release wording, and gives Wan near-frontier scores. It also says every key fact was verified on 2026-04-17 even though the AI video cluster now needs May 8, 2026 source recency.

## 3. Target state

The page should tell mobile readers quickly:

- Use Wan when open weights, Alibaba Cloud Model Studio, low-cost API experimentation, or Wan-specific reference/editing routes matter.
- Test Seedance, Kling, and Veo first for raw model quality.
- Use Runway when a finished production workflow matters more than provider/model tinkering.
- Verify the exact model route, region, data handling, audio support, duration, and cost before paying or building.

## 4. Scope

Included: `src/content/tools/wan.md`, Wan source registry entries, and verification. Excluded: controlled AI video benchmark work, new Wan comparisons, and logo/image work.

## 5. Files expected to change

- `src/content/tools/wan.md`
- `src/data/source-registry.json`
- `.agent/WAN_PAGE_REFRESH_EXECPLAN.md`

## 6. Source basis

Use current official/primary sources checked May 8, 2026: Alibaba Cloud Model Studio video generation/editing docs, Alibaba Cloud Model Studio pricing/docs, Wan-Video GitHub Wan2.2, Wan-AI Hugging Face organization, wan.video, and fal.ai Wan 2.7 provider pricing for provider-specific 2.7 access.

## 7. Implementation steps

1. Add precise source IDs for Wan official/docs/open-weights/provider-pricing references.
2. Rewrite Wan frontmatter facts, scores, pricing, and buyer positioning.
3. Replace wide tables with compact notes where possible.
4. Run provenance/build/visual smoke and direct route checks for `/tools/wan/`.

## 8. Verification plan

- `node -e "JSON.parse(require('fs').readFileSync('src/data/source-registry.json','utf8')); console.log('source registry ok')"`
- `npm run audit:provenance`
- `npm run build:fast`
- `npm run smoke:visual`
- Direct `/tools/wan/` mobile overflow check at 360, 390, 430, 768, and 1024 px.

## 9. Risks

Wan model naming and availability can differ across Alibaba Cloud regions, wan.video, and third-party providers. The page must avoid implying that every route exposes the same model, pricing, rights, or data handling.

## 10. Progress log

- 2026-05-08: Started Wan refresh after the AI video category rebuild exposed stale long-tail video pages as the next trust risk.
- 2026-05-08: Added precise source registry entries for Wan official site, Alibaba Cloud video docs, Model Studio pricing/models, Wan2.2 GitHub, Wan-AI Hugging Face, and fal.ai Wan 2.7.
- 2026-05-08: Rewrote `src/content/tools/wan.md` around route-specific buyer guidance: open weights/API control as the reason to test Wan, Seedance/Kling/Veo for raw model testing, and Runway for finished production workflow.
- 2026-05-08: Reduced Wan's score profile from near-frontier 9/9/8/9 to 8/8/8/8 because route complexity, provider variance, and procurement uncertainty make it weaker as a default buyer recommendation.
- 2026-05-08: Replaced wide pricing/comparison tables with compact mobile-safe notes and explicit pre-purchase verification checks.
- 2026-05-08: Fixed a YAML frontmatter quote issue caught by `npm run build:fast`.
- 2026-05-08: Opened `/tools/wan/` in the Codex in-app browser and confirmed the refreshed page title and first-screen decision copy.
- 2026-05-08: Verified `/tools/wan/` at 360, 390, 430, 768, and 1024 px with no horizontal overflow; canonical resolves to `https://aipedia.wiki/tools/wan/`; 15 official/source-provider links detected on the page.

## 11. Final report

Completed. Verification passed with source-registry JSON parsing, `npm run audit:provenance`, `npm run build:fast`, `npm run smoke:visual`, direct focused overflow checks, and an in-app browser review of `http://127.0.0.1:4321/tools/wan/`.
