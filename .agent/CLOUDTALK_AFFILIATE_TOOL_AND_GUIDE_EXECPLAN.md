# ExecPlan: CloudTalk Affiliate Tool And Guide

## 1. Objective

Add a source-backed CloudTalk tool page with the supplied affiliate link and a high-converting guide that treats CloudTalk as the best fit for a specific buyer: phone-heavy SMB sales and support teams that need CRM-connected calling, AI conversation intelligence, AI voice agents, dialers, routing, and coaching without buying an enterprise contact-center suite. This improves AiPedia affiliate conversion, organic rankings, trust, data quality, and editorial scalability.

## 2. Current State

CloudTalk does not exist in `src/content/tools/`, there is no `public/logos/tools/cloudtalk.*` asset, and CloudTalk is not in `src/data/logo-manifest.json`. The relevant layouts already support affiliate tracking and disclosure through tool and guide frontmatter (`affiliate.link`, `affiliate.network`) and shared `CommercialCTA` components. Guides are stored in `src/content/use-cases/` and rendered at `/guides/<slug>/`. Affected hubs include `/tools/`, `/guides/`, `/categories/ai-automation/`, `/categories/ai-voice/`, `/`, and `PAGE_REFRESH_LEDGER.md`.

## 3. Target State

`/tools/cloudtalk/` is a complete, mobile-first, source-backed CloudTalk review with verified May 26, 2026 pricing, AI features, watch-outs, best plan guidance, affiliate disclosure, and tracked CTAs using `https://get.cloudtalk.io/f6bzdfjhsfnk`. A new `/guides/` page positions CloudTalk as the best default for the specific SMB phone-sales/support buyer. CloudTalk has a real logo asset and appears correctly in the logo manifest. Affected parent hubs and the ledger are refreshed.

## 4. Scope

Included: CloudTalk tool record, CloudTalk logo asset, logo manifest regeneration, one CloudTalk-specific guide, affected category/hub refreshes, page ledger regeneration, and an affiliate inventory report for tools that already have affiliate links plus remaining verified affiliate-program opportunities.

Excluded: new route/layout changes, new comparison pages, touching unrelated untracked temp files/spreadsheets, and unverified claims about CloudTalk performance beyond clearly attributed vendor/customer-case material.

Affected top-layer pages and surfaces: `/`, `/tools/`, `/guides/`, `/categories/`, `/categories/ai-automation/`, `/categories/ai-voice/`, sitemap/LLM/build surfaces generated from content, commercial CTA audit surfaces, and `PAGE_REFRESH_LEDGER.md`.

## 5. Files Likely Affected

`src/content/tools/cloudtalk.md`, `src/content/use-cases/best-ai-phone-system-for-smb-sales-and-support-teams.md`, `public/logos/tools/cloudtalk.*`, `src/data/logo-manifest.json`, `src/content/categories/ai-automation.md`, `src/content/categories/ai-voice.md`, `src/pages/index.astro`, `src/pages/tools/index.astro` if static metadata requires refresh, `src/pages/guides/index.astro` if metadata requires refresh, `PAGE_REFRESH_LEDGER.md`, and this plan.

## 6. Data Model Impact

No schema changes. Add a new tool record with structured affiliate metadata, facts, scores, price history, sources, verification dates, best-for/not-best-for arrays, and commercial CTA link. The guide uses existing `guide_picks` and `tools_mentioned` fields.

## 7. SEO Impact

Add two indexable pages with unique titles, meta descriptions, canonical URLs via existing routes, breadcrumb/schema support, source-backed body content, and internal links to relevant category/tool/guide pages.

## 8. Conversion Impact

CloudTalk CTAs will use the supplied affiliate URL, PartnerStack network metadata, clear “Try CloudTalk”/“Start with CloudTalk” labels, and existing affiliate disclosure/tracking payloads. The guide targets a narrower buyer with stronger intent than the generic tool page.

## 9. Mobile UX Impact

Existing ToolLayout and GuideLayout provide first-screen verdicts, score, price, primary CTA, disclosure, and watch-outs. Content must avoid wide tables as the primary mobile experience and keep pricing/decision tables concise enough for 360, 390, 430, 768, and desktop.

## 10. Implementation Steps

1. Verify CloudTalk pricing, AI features, affiliate program, and logo from current May 2026 sources.
2. Add the official CloudTalk logo asset and regenerate `src/data/logo-manifest.json`.
3. Create `src/content/tools/cloudtalk.md` with affiliate metadata, current facts, scoring, pricing, decision sections, FAQ, sources, and related links.
4. Create a CloudTalk-specific guide in `src/content/use-cases/` with CloudTalk as the best overall pick and honest alternatives.
5. Refresh affected category/hub metadata and internal-link blocks.
6. Regenerate `PAGE_REFRESH_LEDGER.md`.
7. Audit affiliate inventory and current program opportunities.
8. Run content, link, logo, ledger, security, and build checks.

## 11. Verification Commands

`node scripts/generate-logo-manifest.mjs`, `npm run ledger:pages`, `npm run guard:check`, `npm run check:links`, `npm run check:news`, `npm run check:security`, `npm run test:scripts`, `npm run build:fast`, and `git diff --check`.

## 12. Acceptance Criteria

CloudTalk tool and guide pages build, use the affiliate URL, include current source-backed pricing/AI claims, show a proper logo, and route to/from affected category and guide hubs. Parent hubs and ledger rows are current. Commercial CTA audit passes. Affiliate inventory is reported clearly with current May 2026 program evidence where feasible.

## 13. Risks And Mitigations

CloudTalk pricing and AI packaging is volatile; use current official pricing/help/product pages and mark add-ons clearly. Affiliate terms may differ between official and third-party directories; trust the official affiliate page over directories. Avoid overstating vendor case-study outcomes as universal results. Do not stage unrelated untracked files.

## 14. Progress Log

2026-05-26 NZ: Plan created after inspecting tool/guide schemas, existing affiliate CTA handling, logo manifest workflow, and current CloudTalk official sources.
2026-05-26 NZ: Added the CloudTalk tool page, official logo asset, logo manifest entry, CloudTalk-specific SMB phone-system guide, category refreshes, top-layer refresh notes, and regenerated `PAGE_REFRESH_LEDGER.md`.
2026-05-26 NZ: Validation passed for content guards, stale facts, guide picks, tool logos, page ledger, font policy, link/news audits, script tests, security audit, fast build, commercial CTA audit, indexability audit, diff whitespace check, and a custom Playwright smoke check at 360, 390, 430, 768, and 1024 widths for the new CloudTalk routes.

## 15. Final Report

Completed. `/tools/cloudtalk/` now uses the supplied PartnerStack affiliate link and current May 26, 2026 source-backed pricing, AI feature, plan, source, disclosure, and alternative guidance. `/guides/best-ai-phone-system-for-smb-sales-and-support-teams/` positions CloudTalk as the best default for a narrow, high-intent SMB sales/support buyer while naming honest alternatives. Affected `ai-automation`, `ai-voice`, `/tools/`, `/guides/`, `/categories/`, logo manifest, and page-refresh ledger surfaces were refreshed.
