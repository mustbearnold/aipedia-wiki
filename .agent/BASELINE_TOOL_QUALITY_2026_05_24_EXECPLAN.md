# ExecPlan: May 24 Baseline Tool Quality Pass

## 1. Objective

Clear the remaining `baseline_generic_pages` audit queue by replacing boilerplate tool risk language with current, source-backed buyer warnings. This improves trust, editorial quality, and data maintainability without changing rankings for unrelated tools.

## 2. Current State

`node scripts/audit-freshness-queue.mjs --json` still reports nine baseline generic tool pages because their `watch_out_for` facts contain the shared `Non-Tier-1 canonical profile` marker: `manus`, `nightcafe`, `omniseo`, `prezi`, `read-ai`, `recraft`, `rodin`, `trae`, and `typeface`. These pages were last verified on 2026-05-13 and their parent category hubs still show May 13 source dates for the affected tools.

## 3. Target State

Each flagged tool page has a specific, buyer-useful watch-out fact, May 24 verification dates, updated method/source language, and no baseline marker. Affected parent categories and the page refresh ledger reflect the current refresh scope.

## 4. Scope

Included: the nine tool pages, affected category hubs (`ai-automation`, `ai-image`, `ai-design`, `ai-seo`, `ai-presentation`, `ai-notes`, `ai-coding`, `ai-writing`), source registry `last_checked` metadata, and `PAGE_REFRESH_LEDGER.md`.

Excluded: new tool records, logo changes, new comparison pages, and unrelated due-soon freshness items.

## 5. Files Likely Affected

`src/content/tools/{manus,nightcafe,omniseo,prezi,read-ai,recraft,rodin,trae,typeface}.md`, affected category markdown files, `src/data/source-registry.json`, and `PAGE_REFRESH_LEDGER.md`.

## 6. Data Model Impact

Only existing frontmatter fact values, verification dates, source registry checks, and editorial copy are updated. No schema fields or CTA tracking contracts change.

## 7. SEO Impact

Tool and category pages keep their current routes and canonicals. Metadata may be refreshed only where the source-backed page claim changed materially.

## 8. Conversion Impact

Affiliate surfaces remain unchanged. The pass improves buyer warnings around plan selection, credit limits, licensing, telemetry, procurement, and enterprise sales cycles.

## 9. Mobile UX Impact

No layout/template change. Content remains server-rendered and crawlable on mobile.

## 10. Implementation Steps

1. Verify volatile claims against current May 2026 sources.
2. Patch each tool page with specific watch-out facts and May 24 verification language.
3. Patch affected category source dates and any summaries made stale by the tool-page refresh.
4. Update source registry `last_checked`, regenerate the ledger, and run audit/build gates.

## 11. Verification Commands

`node scripts/audit-freshness-queue.mjs --json`, `npm run ledger:pages`, `npm run guard:check`, `npm run test:scripts`, `npm run check:links`, `npm run check:news`, `npm run check:security`, and `npm run build:fast`.

## 12. Acceptance Criteria

`baseline_generic_pages` is zero, source registry issues remain zero, affected pages show May 24 verification where changed, parent category hubs are not staler than their child pages, and validation commands pass or unrelated failures are documented.

## 13. Risks and Mitigations

Some vendor pricing pages are dynamic and expose limited crawlable text. Use official pages first, official support/docs where available, and avoid unsupported price changes when the current source cannot expose exact checkout text.

## 14. Progress Log

2026-05-24 12:13 NZ: Plan created after inspecting the audit marker, flagged pages, source registry, and affected category pages.
2026-05-24 13:42 NZ: Replaced the nine generic tool warnings with current buyer-risk language, refreshed affected parent category hubs, added source-registry `last_checked` dates, regenerated `PAGE_REFRESH_LEDGER.md`, and reran the freshness audit.
2026-05-24 14:06 NZ: Validation completed with guard, script tests, security, links, news cross-reference, fast build, and whitespace checks passing.

## 15. Final Report

Completed. `baseline_generic_pages` is now zero, the source registry has no duplicate/invalid/unknown-source issues, and the affected tool/category pages and ledger rows reflect the 2026-05-24 refresh scope. No template, schema, CTA-tracking, or logo changes were required.
