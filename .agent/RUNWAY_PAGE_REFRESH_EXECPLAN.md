# Runway Page Refresh ExecPlan

## 1. Objective

Refresh the Runway tool page so it supports AiPedia's updated AI video strategy: Runway is the production workspace and API route, while Seedance 2.0, Kling 3.0, and Veo 3.1 are the raw model-quality contenders to test beside it. This improves trust, conversion accuracy, SEO relevance, and internal-link consistency.

## 2. Current state

`src/content/tools/runway.md` had older April-era positioning, stale verified dates, older comparison wording, and claims that were too strong about Runway's raw model leadership. `src/content/comparisons/kling-vs-seedance-vs-runway.md` and `src/content/use-cases/best-ai-video-generator.md` were already updated to distinguish raw model testing from production workflow, so the Runway page needed to match that strategy.

## 3. Target state

The Runway page should tell mobile and desktop readers quickly: pick Runway for production, editing, model switching, teams, and API pipelines; test Seedance, Kling, and Veo when raw output quality is the only question. All pricing/model/API claims should be sourced to official Runway pages verified on 2026-05-08.

## 4. Scope

Included: `src/content/tools/runway.md`, precise Runway source registry entries, and verification. Excluded: broad category-page rewrite, comparison-template changes, affiliate-system changes, and controlled AI video benchmarks.

## 5. Files likely affected

- `src/content/tools/runway.md`
- `src/data/source-registry.json`
- `.agent/RUNWAY_PAGE_REFRESH_EXECPLAN.md`

## 6. Data model impact

Runway's tool facts now use current source IDs for API docs, API model list, API pricing, usage rights, enterprise, and model availability. No schema migration is required.

## 7. SEO impact

The page title/meta now target "Runway review", pricing, models, API, and best use cases in May 2026. Internal links point into the best AI video guide and four-way video comparison.

## 8. Conversion impact

The page routes users to Standard, Pro, Unlimited, or Enterprise based on job-to-be-done and prevents over-converting users who should first test Seedance, Kling, or Veo for raw model quality.

## 9. Mobile UX impact

The page keeps the first answer short, uses compact bullets and stacked pricing notes, and avoids making a wide pricing or comparison table part of the mobile experience.

## 10. Implementation steps

1. Research current official Runway pricing, Gen-4, Aleph, Act-Two, API models/pricing, usage rights, data security, and enterprise pages.
2. Rewrite Runway frontmatter facts and editorial body.
3. Register new source IDs for Runway API/model/pricing/usage-rights references.
4. Run provenance, build, visual smoke, and direct mobile route checks.

## 11. Verification commands

- `node -e "JSON.parse(require('fs').readFileSync('src/data/source-registry.json','utf8')); console.log('source registry ok')"`
- `npm run audit:provenance`
- `npm run build:fast`
- `npm run smoke:visual`

## 12. Acceptance criteria

The Runway page builds, has no missing source IDs, no stale Veo 3-only framing, no unsupported raw-model-winner claim, current pricing/API facts, clear buyer guidance, and no mobile horizontal overflow on `/tools/runway/`.

## 13. Risks and mitigations

Runway pricing and model availability are volatile. Mitigation: mark facts verified 2026-05-08, use official source URLs, describe availability caveats, and set next reviews for high-volatility facts.

## 14. Progress log

- 2026-05-08: Rechecked official Runway pricing, Gen-4, Aleph, Act-Two, API models/pricing, usage rights, data security, and enterprise pages. Rewrote the Runway page and added precise source registry IDs.
- 2026-05-08: Replaced the pricing markdown table with stacked plan notes after route QA showed contained table overflow on 360-430px screens.
- 2026-05-08: Verified `/tools/runway/` at 360, 390, 430, 768, and 1024px with no overflowing elements; confirmed title, canonical, CTAs, and official source links.
- 2026-05-08: Passed provenance audit, fast build, indexability/commercial CTA audits inside build, and the full visual smoke suite.

## 15. Final report

Completed. The Runway page now matches the current AI video strategy, cites official Runway sources for volatile facts, avoids overclaiming raw model leadership, and passes the relevant repo and route checks.
