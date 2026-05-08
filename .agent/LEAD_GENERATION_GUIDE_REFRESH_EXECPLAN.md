# Lead Generation Guide Refresh ExecPlan

## 1. Objective

Rebuild `/guides/ai-lead-generation/` from a stale automation tutorial into a mobile-first, source-backed buyer guide that helps sales teams decide whether to buy Apollo, Clay, Amplemarket, n8n, or Instantly for AI lead generation. The goal is better search quality, stronger trust, and tracked affiliate revenue from Apollo and Amplemarket without overstating volatile lead-volume or pricing claims.

## 2. Current state

- `src/content/use-cases/ai-lead-generation.md` is a stale April/May 2026 page with unsupported claims about Claude Opus 4.7, Gemini 3.1 Pro, fixed monthly lead volume, and fixed stack cost.
- The page only lists `n8n` and `claude` in `tools_mentioned`, so Apollo and Amplemarket affiliate CTAs do not propagate through the guide layout.
- Current tool records exist for `apollo`, `clay`, `amplemarket`, `n8n`, and `instantly`.
- `scripts/audit-commercial-cta.mjs` checks representative money routes, but it does not protect `/guides/ai-lead-generation/`.
- `scripts/audit-guide-picks.mjs` protects major buyer guides with structured `guide_picks`, but lead generation is not yet protected.

## 3. Target state

The lead-generation guide should open with current May 8, 2026 buyer guidance. Mobile users should immediately see structured picks for best all-in-one, budget/DIY, and pro/team options. Apollo and Amplemarket affiliate CTAs should be visible, disclosed, and tracked. The body should explain the lead-gen stack by jobs-to-be-done: data source, enrichment, scoring/research, engagement handoff, compliance, and CRM hygiene.

## 4. Scope

Included:
- Rewrite `src/content/use-cases/ai-lead-generation.md`.
- Add `guide_picks` and current official sources.
- Add commercial CTA audit coverage for Apollo and Amplemarket on the route.
- Add the route to required guide-pick coverage.
- Run script checks, full check, fast build, and mobile viewport QA.

Excluded:
- Full standalone Amplemarket tool-page rewrite.
- New page templates or layout component changes.
- New affiliate programs beyond the links already configured.

## 5. Files likely affected

- `src/content/use-cases/ai-lead-generation.md`
- `scripts/audit-commercial-cta.mjs`
- `scripts/audit-guide-picks.mjs`
- `tests/scripts/audit-commercial-cta.test.mjs`
- `.agent/LEAD_GENERATION_GUIDE_REFRESH_EXECPLAN.md`

## 6. Data model impact

No schema migration. The guide will use the existing `tools_mentioned` and `guide_picks` frontmatter so `GuideLayout.astro` can render structured buyer CTAs from centralized tool records and affiliate metadata.

## 7. SEO impact

The route keeps the existing slug but receives a unique May 2026 title, meta description, verified sources, clearer search intent, and stronger internal links to related sales tools and comparisons. Unsupported fixed-volume claims are removed.

## 8. Conversion impact

Apollo becomes the best overall purchase path. Amplemarket is positioned as the premium AI SDR suite for teams ready for higher commitment. Commercial CTAs remain tracked through the existing `CommercialCTA` system with route-level audit coverage.

## 9. Mobile UX impact

The first mobile screen will rely on the shared guide decision surface instead of a wide table. The markdown body will use short sections, scannable comparison tables, and decision bullets that stay readable at 360, 390, 430, 768, and desktop widths.

## 10. Implementation steps

1. Inspect current content, data records, guide layout behavior, and audit scripts.
2. Verify current official sources for Apollo, Clay, Amplemarket, n8n, and Instantly as of 2026-05-08.
3. Rewrite the guide with current buyer picks, source-backed claims, and no unsupported lead-volume promises.
4. Add route protection to commercial CTA and guide-pick audits.
5. Run targeted script tests, full script suite, site checks, build, and viewport QA.
6. Record results and remaining risks.

## 11. Verification commands

- `node scripts/audit-guide-picks.mjs`
- `node --test tests/scripts/audit-commercial-cta.test.mjs`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- Playwright/browser QA at 360, 390, 430, 768, and 1024+.

## 12. Acceptance criteria

- `/guides/ai-lead-generation/` has `guide_picks` for Apollo, n8n, and Amplemarket.
- Apollo and Amplemarket affiliate CTAs appear on the built route and include tracking/disclosure attributes.
- The guide contains no fake model versions, no fake pricing claims, and no unsupported lead-volume promises.
- Checks/build pass or failures are documented with exact commands.
- Mobile QA shows no horizontal overflow.

## 13. Risks and mitigations

- Risk: Amplemarket pricing remains volatile. Mitigation: state the verified Startup price and explain that Growth/Elite are custom.
- Risk: Apollo plan packaging changes. Mitigation: avoid hardcoding full plan tables and point buyers to credits/seats/export modeling.
- Risk: n8n is not a lead database. Mitigation: position it as workflow automation only.
- Risk: CTAs fail to propagate. Mitigation: route-level audit requires Apollo and Amplemarket affiliate links.

## 14. Progress log

- 2026-05-08: Created plan after inspecting current guide, tool records, and audit scripts. Official source verification completed before content edits.
- 2026-05-08: Rewrote `src/content/use-cases/ai-lead-generation.md` around Apollo, n8n, Amplemarket, Clay, and Instantly. Added route protection to commercial CTA audit and required guide-pick audit.
- 2026-05-08: Verification passed: guide-picks audit, commercial CTA test, script test suite, full check, fast build, and Playwright viewport QA at 360, 390, 430, 768, and 1024.

## 15. Final report

The lead-generation guide is now a current buyer page with structured picks, source-backed claims, Apollo and Amplemarket affiliate propagation, and route-level CTA audit coverage. Remaining follow-up: refresh the standalone Amplemarket page to May 8 verification language when that tool record next receives a dedicated pass.
