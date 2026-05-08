# Commercial CTA Tracking ExecPlan

## 1. Objective

Build a reusable, mobile-safe commercial CTA system for AiPedia so affiliate and official outbound clicks are honest, disclosed near the decision point, and measurable by page type, tool slug, placement, and destination type. This directly supports affiliate conversion, trust, revenue tracking, mobile UX, and maintainability.

## 2. Current state

The repo is an Astro 6 static site. Commercial links are currently rendered in several places with local helper functions:

- `src/layouts/ToolLayout.astro` renders the hero CTA inline and imports `ToolCTA.astro`, but does not use it.
- `src/components/StickyMobileCTA.astro` renders a mobile sticky CTA and reveals only after it finds `a[data-tool-cta]`.
- `src/layouts/ComparisonLayout.astro`, `src/layouts/CategoryLayout.astro`, `src/layouts/GuideLayout.astro`, and `src/layouts/CompanyLayout.astro` each compute CTA href, rel, and label locally.
- `src/pages/stack-builder/index.astro` renders high-intent "Try" links in client-side template strings.
- `src/components/CookieConsent.astro` loads GA4 only after analytics consent and sends page views.
- `src/components/AffiliateCTA.astro` still describes footer-only disclosure, which conflicts with project doctrine.

Known issues from the audit:

- CTA click events are not standardized.
- Affiliate disclosures are not consistently near commercial CTAs.
- CTA payloads do not include page type, placement, tool slug, destination type, or affiliate status.
- The sticky mobile CTA can fail to reveal because the hero CTA lacks the expected `data-tool-cta` marker.

## 3. Target state

Commercial CTAs render through a shared component when server-rendered, with:

- clear user-benefit labels;
- `rel="sponsored noopener"` for affiliate links and `rel="noopener"` for official links;
- `data-commercial-cta` payload fields for analytics;
- nearby disclosure text when the CTA uses an affiliate URL;
- stable styling that preserves existing mobile layouts.

A small global client script observes CTA views and clicks, then sends GA4 events only when `window.gtag` is available after consent.

## 4. Scope

Included:

- Shared commercial CTA component.
- Shared commercial analytics script.
- Tool hero CTA and sticky CTA.
- Comparison, category, guide, and company CTA placements.
- Stack Builder client-rendered CTA payloads.
- Existing smoke/build verification.

Excluded from this pass:

- Full template redesigns.
- Data model migration for affiliate registry.
- Content rewrites.
- Third-party affiliate network postback integration.

## 5. Files likely affected

- `.agent/COMMERCIAL_CTA_TRACKING_EXECPLAN.md`
- `src/components/CommercialCTA.astro`
- `src/components/CommercialAnalytics.astro`
- `src/components/StickyMobileCTA.astro`
- `src/layouts/BaseLayout.astro`
- `src/layouts/ToolLayout.astro`
- `src/layouts/ComparisonLayout.astro`
- `src/layouts/CategoryLayout.astro`
- `src/layouts/GuideLayout.astro`
- `src/layouts/CompanyLayout.astro`
- `src/pages/stack-builder/index.astro`
- `scripts/audit-commercial-cta.mjs`
- `tests/scripts/audit-commercial-cta.test.mjs`
- `scripts/build-fast.mjs`
- `package.json`
- `src/data/source-registry.json`
- `scripts/audit-provenance-pricing.mjs`

## 6. Data model impact

No content schema migration in this pass. The component consumes existing tool fields: `slug`, `title`, `url`, `pricing_model`, `price_range`, `category`, `affiliate.link`, and `affiliate.network`.

## 7. SEO impact

Commercial links keep honest sponsored rel metadata. Nearby disclosures improve trust compliance without hiding crawlable content. Search and dynamic comparison-builder utility routes are marked `noindex, follow` and removed from the sitemap so crawl budget is concentrated on decision pages.

## 8. Conversion impact

The system adds placement-specific CTA payloads and view/click events:

- `affiliate_cta_view`
- `affiliate_cta_click`
- `official_cta_view`
- `official_cta_click`
- `sticky_cta_view`
- `sticky_cta_click`
- `stack_builder_try_tool`
- `stack_builder_try_stack`
- `stack_builder_started`
- `stack_builder_completed`
- `save_stack`
- `internal_compare_click`

## 9. Mobile UX impact

The tool hero and sticky CTA must remain usable at 360, 390, 430, 768, and desktop widths. Disclosure text must stay near CTAs without causing horizontal overflow or pushing the primary decision content below the first screen unnecessarily.

## 10. Implementation steps

1. Add shared `CommercialCTA.astro`.
2. Add shared `CommercialAnalytics.astro` and include it from `BaseLayout.astro`.
3. Wire `ToolLayout.astro` hero CTA through `CommercialCTA`.
4. Add analytics payload and disclosure to `StickyMobileCTA.astro`.
5. Wire comparison, category, guide, and company CTA links through `CommercialCTA`.
6. Add data payloads to Stack Builder client-rendered outbound CTAs.
7. Expand payloads with page slug, category slug, comparison pair, price range, affiliate program, sticky flag, device type, viewport width, and destination domain where available.
8. Add a built-HTML commercial CTA audit and wire it into fast/full build verification.
9. Mark search and comparison-builder utility routes `noindex, follow` and remove them from the sitemap.
10. Run targeted checks and update this plan.

## 11. Verification commands

- `npm run test:scripts`
- `npm run guard:check`
- `npm run check:links`
- `npm run smoke:api`
- `npm run smoke:visual`
- `npm run build:fast`
- `node scripts/audit-commercial-cta.mjs --dist dist-fast/client`

## 12. Acceptance criteria

- Tool hero CTA has `data-commercial-cta`, `data-tool-cta`, page type, placement, slug, label, destination type, and affiliate status.
- Sticky CTA can reveal after the hero CTA leaves view and has tracking payload.
- Affiliate CTA placements show nearby disclosure.
- No horizontal overflow is introduced in existing smoke-covered routes.
- Build and relevant smoke checks pass.
- `npm run build:fast` fails if representative tool, comparison, category, guide, or company pages lose commercial CTA payloads.

## 13. Risks and mitigations

- Risk: wrappers break flex/grid CTA layouts. Mitigation: component supports fragment rendering and separate disclosure class hooks.
- Risk: tracking fires before GA consent. Mitigation: analytics script only calls `gtag` when present.
- Risk: stack builder string templates drift from shared component. Mitigation: add matching data attributes in this pass and migrate to a data-driven builder later.

## 14. Progress log

- 2026-05-08: Started implementation after repo audit. Inspected CTA, analytics, disclosure, and layout files. Found pre-existing dirty worktree and kept scope focused.
- 2026-05-08: Added `CommercialCTA.astro` and `CommercialAnalytics.astro`. Wired BaseLayout, CookieConsent, ToolLayout, StickyMobileCTA, ComparisonLayout, CategoryLayout, GuideLayout, CompanyLayout, PostBodyEnhancements, and Stack Builder commercial links.
- 2026-05-08: Fixed pricing-table enhancement selector to include `article.t2-prose table` and added commercial CTA payloads to generated pricing links.
- 2026-05-08: Updated disclosure copy to match nearby affiliate CTA disclosure behavior.
- 2026-05-08: Verification passed: `npm run test:scripts`, `npm run guard:check`, `npm run check:links`, `npm run build:fast`, `npm run smoke:api`, `npm run smoke:visual`, and a targeted Playwright route check for category, guide, company, tool, and comparison pages at 390px and desktop.
- 2026-05-08: Continued autonomously. Added richer revenue payload fields, a built-HTML CTA audit, a Node test for the audit, build-script integration, and `noindex, follow` sitemap cleanup for `/search/` and `/compare/build/`.
- 2026-05-08: Added Stack Builder funnel analytics for start, role/budget selection, completion, swaps, compare-add clicks, share-link saves, and markdown exports.
- 2026-05-08: Fixed provenance data drift by registering the OpenAI GPT-5.5 Instant source ID used by ChatGPT price history. Tightened the provenance audit so explicit low-volatility facts are not mislabeled as high-volatility missing-review work.

## 15. Final report

Implemented a shared commercial CTA and analytics layer without changing content data. Server-rendered money templates now emit consistent `data-commercial-cta` payloads with page type, placement, tool slug/name, CTA label, destination type, and affiliate status. Affiliate CTAs render nearby disclosure text. The sticky mobile CTA now has tracking payloads and can find the tool hero trigger. Stack Builder client-rendered CTA strings now emit matching commercial event attributes. Remaining work: migrate noindex rules for personalized/search pages, add dedicated Playwright assertions for conversion payloads, and rebuild mobile-first category/comparison/use-case decision templates.
