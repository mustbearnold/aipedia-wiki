# Guide Decision Picks ExecPlan

## 1. Objective

Turn guide/use-case first-screen decision cards into explicit, source-backed editorial data instead of heuristic template guesses. This improves mobile buyer decisions, trust, affiliate conversion tracking, and editorial scalability for AiPedia money-intent guide pages.

## 2. Current State

- `src/content/use-cases/*.md` pages define `tools_mentioned` but do not define structured best-overall, budget/free, or pro/team picks.
- `src/pages/guides/[slug].astro` loads the mentioned tools and passes tool facts to `src/layouts/GuideLayout.astro`.
- `src/layouts/GuideLayout.astro` renders a mobile-first decision card panel, but currently derives those cards from `tools_mentioned`, pricing strings, and tool facts.
- `CommercialCTA.astro` provides tracked CTA payloads and nearby affiliate disclosure when needed.
- `tests/smoke/visual-routes.spec.mjs` checks that `/guides/best-ai-coding-assistant/` exposes buyer-type decision cards and keeps Cursor as the first editorial pick.
- `scripts/audit-commercial-cta.mjs` checks representative guide CTA placements.

## 3. Target State

Guide pages can define `guide_picks` in frontmatter with explicit cards for:

- `best_overall`
- `budget`
- `pro_team`

Each pick has a tool slug, optional label, recommended plan, concise reason, and source URLs. On mobile, these picks render before the full ranking as stacked buyer cards. On desktop, they render as a compact three-column decision panel. Guides without `guide_picks` continue to use the current fallback.

## 4. Scope

Included:

- Add schema support for `guide_picks` in `src/content.config.ts`.
- Pilot `guide_picks` on `src/content/use-cases/best-ai-coding-assistant.md`.
- Migrate the first high-intent guide batch after the pilot: SEO tools, AI video generators, presentations, meeting notes, blog writing, and marketer tools.
- Pass structured picks through `src/pages/guides/[slug].astro`.
- Update `GuideLayout.astro` to prefer structured picks and preserve fallback behavior.
- Add smoke assertions for structured source-backed picks and CTA placements.

Excluded:

- Migrating every guide in this pass.
- Creating new factual claims beyond information already present in guide/tool data and linked official sources.
- Changing canonical URLs, route generation, or global scoring.

## 5. Files Likely Affected

- `src/content.config.ts`
- `src/content/use-cases/best-ai-coding-assistant.md`
- `src/content/use-cases/best-ai-seo-tool.md`
- `src/content/use-cases/best-ai-video-generator.md`
- `src/content/use-cases/best-ai-for-presentations.md`
- `src/content/use-cases/best-ai-for-meeting-notes.md`
- `src/content/use-cases/best-ai-for-blog-writing.md`
- `src/content/use-cases/best-ai-tools-for-marketers.md`
- `src/content/tools/pika.md`
- `src/pages/guides/[slug].astro`
- `src/layouts/GuideLayout.astro`
- `src/styles/t2-canvas.css`
- `tests/smoke/visual-routes.spec.mjs`
- `scripts/audit-guide-picks.mjs`
- `scripts/audit-commercial-cta.mjs`
- `tests/scripts/audit-guide-picks.test.mjs`
- `tests/scripts/audit-commercial-cta.test.mjs`

## 6. Data Model Impact

Adds optional `guide_picks` to use-case frontmatter:

- `best_overall`, `budget`, `pro_team`
- Each pick supports `tool`, `label`, `plan`, `reason`, and `sources`
- `sources` contain `label` and `url`

This keeps guide-specific editorial choices separate from global tool scores.

## 7. SEO Impact

The primary guide content remains crawlable HTML. The first screen gains clearer decision language and plan guidance for buyer-intent queries. No canonical, title, meta, or indexability changes are planned.

## 8. Conversion Impact

Existing tracked CTA placements stay stable:

- `guide_decision_best_overall`
- `guide_decision_budget`
- `guide_decision_pro_team`
- `guide_top_pick`

The rendered cards can show recommended plan context near the CTA, improving click quality without making unsupported claims.

## 9. Mobile UX Impact

At 360, 390, and 430px, cards stack vertically with no horizontal overflow. At 768px and desktop, the decision cards use responsive grid behavior. The cards remain above the full ranking and long article body.

## 10. Implementation Steps

1. Add the `guide_picks` schema to `src/content.config.ts`.
2. Add structured picks to `best-ai-coding-assistant.md` using existing official source links.
3. Pass `guide_picks` through the guide route.
4. Update `GuideLayout.astro` to map structured picks to decision cards, with fallback heuristics for unmigrated guides.
5. Render recommended plan and source count when available.
6. Update smoke tests to assert structured guide picks and stable CTA placements.
7. Run build, script tests, and visual smoke.

## 11. Verification Commands

- `npm run test:scripts`
- `npm run build:fast`
- `npm run smoke:visual`

## 12. Acceptance Criteria

- `best-ai-coding-assistant` renders Cursor, GitHub Copilot, and Claude Code from explicit guide data.
- Decision cards show plan context from frontmatter where present.
- CTA placement tracking remains present.
- Unmigrated guides still build using fallback picks.
- Build, script tests, and visual smoke pass.

## 13. Risks And Mitigations

- Risk: structured picks reference missing tool slugs. Mitigation: layout filters out unresolved picks and falls back to heuristics.
- Risk: source URLs become stale. Mitigation: source fields make future audits possible; no fake source IDs are introduced.
- Risk: card copy becomes too long on mobile. Mitigation: layout continues to compact decision reasons.

## 14. Progress Log

- 2026-05-08: ExecPlan created after the guide decision panel shipped and passed checks. Next step is schema and pilot migration.
- 2026-05-08: Added optional `guide_picks` schema, piloted structured picks on `best-ai-coding-assistant`, passed guide picks into `GuideLayout`, rendered plan/source context, and expanded smoke coverage for the structured cards.
- 2026-05-08: Verification passed: `npm run test:scripts`, `npm run build:fast`, and `npm run smoke:visual`.
- 2026-05-08: Migrated structured `guide_picks` onto five more money-intent guides: SEO tools, presentations, meeting notes, blog writing, and marketer tools. Deferred AI video generator because the current Seedance source/domain story needs editorial cleanup before adding a protected recommendation block.
- 2026-05-08: Added `scripts/audit-guide-picks.mjs`, wired it into `guard:check` and `prebuild`, added script tests, and expanded visual smoke coverage to all six protected guide-pick routes.
- 2026-05-08: Verification passed after batch migration: `npm run audit:guide-picks`, `npm run test:scripts`, `npm run build:fast`, `npm run smoke:visual`, and in-app browser QA on `/guides/best-ai-seo-tool/`.
- 2026-05-08: Source-cleaned `/guides/best-ai-video-generator/`, initially demoted Seedance from protected buyer picks because the public `seedance.ai` page identifies itself as an independent community rather than an official provider, refreshed the Pika pricing record from official pricing, and added video generator to the protected guide-picks batch.
- 2026-05-08: Removed or softened unsupported Seedance benchmark/API assertions from the touched Pika record so video-category guidance stays source-backed and does not contradict the Seedance caution in the guide.
- 2026-05-08: Verification passed after the video migration: `npm run audit:guide-picks`, `npm run test:scripts`, `npm run build:fast`, `npm run smoke:visual`, and in-app browser QA on `/guides/best-ai-video-generator/`.
- 2026-05-08: Rebuilt the AI video guide again after user review to separate frontier video models from workflow/avatar products. Seedance 2.0, Kling 3.0, and Veo 3.1 are now the protected decision picks; Runway is repositioned as the best production workspace and HeyGen as avatar video only.
- 2026-05-08: Repaired `src/content/tools/seedance.md`, `src/content/tools/kling.md`, and `src/content/tools/veo.md` from current official May 8, 2026 sources. Seedance now uses ByteDance Seed/BytePlus as canonical, Kling avoids unverifiable static pricing claims, and Veo uses Gemini API pricing/docs as the auditable pricing anchor.
- 2026-05-08: Verification passed after the model-first video correction: source registry JSON parse, `npm run audit:guide-picks`, `npm run audit:provenance`, `npm run test:scripts`, `npm run build:fast`, `npm run smoke:visual`, and in-app browser QA on `/guides/best-ai-video-generator/`.

## 15. Final Report

Implemented the structured guide-picks pilot for `/guides/best-ai-coding-assistant/` and expanded it to the first protected money-guide batch, including the source-cleaned AI video generator guide.

Outcomes:

- Seven high-intent guide routes now render explicit best-overall, budget/free, and pro/team picks from frontmatter instead of relying on template heuristics.
- Each migrated pick includes plan guidance, concise editorial reasoning, and official source URLs.
- The guide layout still falls back to heuristic picks for unmigrated guides, so the rollout can be incremental.
- Commercial CTAs remain tracked with stable guide decision placements.
- `audit-guide-picks` now protects the migrated money-guide batch from losing required slots, source URLs, or valid tool references.
- Mobile smoke coverage confirms no horizontal overflow at 360, 390, 430, and 768px across the protected guide routes.
- The AI video guide now recommends Seedance 2.0, Kling 3.0, and Google Veo 3.1 as the frontier model short list, while explaining that Runway is the best production workspace and HeyGen is an avatar-video product rather than a general video model.
- Pika pricing copy and structured pricing signals now reflect the current official Basic, Standard, Pro, and Fancy plan structure.
- Seedance, Kling, and Veo tool records now have May 8, 2026 verification dates and source-backed access/pricing cautions.

Next rollout:

1. Add a dedicated `Runway vs Kling vs Seedance vs Veo` comparison page with side-by-side model tests, prompt methodology, and buyer routes.
2. Migrate the next guide cluster: small business, freelancers, agencies, ecommerce, sales teams, and customer support.
3. Consider rendering compact source links or a source drawer for guide decision cards after the data is consistently populated.
