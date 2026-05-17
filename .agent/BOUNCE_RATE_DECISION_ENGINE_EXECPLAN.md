# Bounce Rate Decision Engine ExecPlan

## 1. Objective

Reduce real bounce rate and raise pages per visit by turning aipedia.wiki from a passive directory into a buyer-decision engine. The first implementation pass establishes a trustworthy analytics layer so follow-on UX work can measure real decision progress: internal clicks, comparison usage, Stack Builder usage, search usage, and commercial/tool CTA clicks.

## 2. Current state

- Framework: Astro 6 with file routes under `src/pages`, content collections defined in `src/content.config.ts`, and Cloudflare/Vercel-oriented build scripts.
- Global shell: `src/layouts/BaseLayout.astro` renders `Nav`, `SearchModal`, `CompareTray`, `CookieConsent`, `CommercialAnalytics`, Vercel Analytics, and Speed Insights.
- Consent: `src/components/CookieConsent.astro` loads GA4 only after `localStorage['aipedia-cookie-consent'] === 'accepted'` and dispatches `aipedia:analytics-ready`.
- Commercial CTAs: `src/components/CommercialCTA.astro` emits data attributes; `src/components/CommercialAnalytics.astro` scans those anchors, queues until GA is available, and currently uses older event names such as `affiliate_cta_click` and `official_cta_click`.
- Search: `src/pages/search.astro` tracks catalog search locally with older names (`search_performed`, `search_result_clicked`). `src/components/SearchModal.astro` currently has no active tracking despite old tests expecting it.
- Compare: `src/components/CompareTray.astro` persists selected slugs in localStorage and has `data-compare-add` integration. `src/pages/compare/build.astro` provides a picker/builder but lacks typed event calls.
- Stack Builder: `src/pages/stack-builder/index.astro` has custom funnel tracking with older names (`stack_builder_started`, `stack_builder_tool_swapped`, `internal_compare_click`) and direct GA calls.
- Page templates: tool, category, comparison, guide, news, workflow, company, answers, and index routes exist. Current god-tier layouts already surface decision cards and commercial CTAs, but many internal next-step clicks are not consistently tracked.
- Tests/checks: `npm run test:scripts`, `npm run guard:check`, `npm run build:fast`, Playwright smoke tests, link/news audits, commercial CTA audit, and KPI audit.

## 3. Target state

Every meaningful decision action is tracked through one typed, privacy-respecting analytics layer. Components can call a single client function or use data attributes; events include page context, destination context, module/source, position, device context, variant, and timestamp. Missing analytics should never block navigation. Development logging should make payload inspection easy without sending fake engagement.

## 4. Scope

Included in this pass:
- Phase 0 repository/product audit.
- Phase 1 analytics truth layer.
- Wire the most important existing surfaces: commercial CTAs, search, compare tray, Stack Builder, TOC clicks, pricing jumps, and related link cards where practical.
- Update tests to assert the new typed layer and required event names.

Deferred to later passes:
- Full NextBestAction component.
- Major tool/category/comparison/news/guide template rebuilds.
- Full route health Playwright audit.
- Internal link graph report, A/B testing, reporting export, and content cluster routing.

Top-layer surfaces affected by Phase 1 are global scripts/components plus existing static interaction routes (`/compare/`, `/compare/build/`, `/search/`, `/stack-builder/`). No content records, rankings, pricing facts, or visible editorial claims are updated in this pass, so no volatile fact verification was required. The page refresh ledger was regenerated because the repo guard detected touched static routes.

## 5. Files likely affected

- `.agent/BOUNCE_RATE_DECISION_ENGINE_EXECPLAN.md`
- `src/lib/analytics/events.ts`
- `src/lib/analytics/client.ts`
- `src/components/AnalyticsLayer.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/CommercialAnalytics.astro`
- `src/components/CommercialCTA.astro`
- `src/components/PostBodyEnhancements.astro`
- `src/components/StickyMobileCTA.astro`
- `src/components/CompareTray.astro`
- `src/components/SearchModal.astro`
- `src/components/TableOfContents.astro`
- `src/pages/search.astro`
- `src/pages/stack-builder/index.astro`
- `src/pages/compare/build.astro`
- `src/pages/compare/index.astro`
- `PAGE_REFRESH_LEDGER.md`
- `tests/scripts/search-analytics.test.mjs`
- New analytics tests under `tests/scripts/`

## 6. Data model impact

No content data model changes in Phase 1. Analytics introduces a typed payload contract with optional fields for page, destination, tool, category, comparison, guide, module, position, device, variant, and timestamp.

## 7. SEO impact

Phase 1 should not change titles, canonical URLs, schema, indexability, or visible content. The event layer must be progressive enhancement only.

## 8. Conversion impact

Commercial CTA clicks become distinguishable as `affiliate_click`, `tool_cta_click`, and `mobile_sticky_cta_click` where appropriate. Stack Builder and comparison actions become measurable as real buyer-intent events.

## 9. Mobile UX impact

No layout change in Phase 1. Mobile-specific context is added through `device_context`, `viewport_width`, and sticky CTA event names.

## 10. Implementation steps

1. Create the ExecPlan and record the audit map.
2. Add typed analytics event names and payload types.
3. Add a client analytics runtime that respects consent, queues only in memory, flushes on `aipedia:analytics-ready`, dispatches debug/custom events, and never blocks navigation.
4. Mount the analytics runtime globally before CTA/search/tray scripts need it.
5. Refactor commercial CTA tracking to call the shared layer and emit required click events.
6. Update search, Stack Builder, Compare Tray, TOC, and comparison builder events to required names.
7. Add/update tests for required event definitions and source wiring.
8. Run focused tests, guard checks, and a build check where time allows.

## 11. Verification commands

- `npm run test:scripts`
- `npm run guard:check`
- `npm run build:fast`
- `npm run check:links`
- `npm run smoke:api`
- `npm run smoke:visual` when UI-routing changes begin in later phases

## 12. Acceptance criteria

- Required Phase 1 events are defined in one typed source.
- Commercial, internal, search, compare tray, Stack Builder, TOC, pricing, and sticky CTA clicks can use the shared layer.
- Events include page/module/destination/device context where available.
- Event calls fail gracefully when GA4 is unavailable or consent is rejected.
- Development logging is available without firing fake events.
- Navigation is not blocked by analytics.
- Tests/build/checks either pass or any unrelated failures are documented.

## 13. Risks and mitigations

- Risk: double-counting legacy and new events. Mitigation: standardize primary event names and keep legacy names only where they are passive impressions or tests require compatibility.
- Risk: consent leakage. Mitigation: do not persist analytics queues; drop events after explicit rejection; flush only when GA exists after consent.
- Risk: adding heavy JS. Mitigation: one small bundled module plus existing lightweight delegated listeners.
- Risk: old source tests becoming stale. Mitigation: update tests to assert behavior-critical required events instead of old function names.

## 14. Progress log

- 2026-05-15: Inspected repo structure, layouts, analytics, consent, commercial CTAs, search, compare tray, Stack Builder, comparison builder, content collections, scripts, and tests. Created this ExecPlan before code changes.
- 2026-05-15: Implemented typed analytics event catalog/client, mounted it globally, rewired commercial CTAs, search, compare tray, comparison hub/build, Stack Builder, TOC/pricing jumps, related links, and key category/guide/comparison page clicks.
- 2026-05-15: Added analytics tests and updated commercial/search source tests. Focused analytics/search tests pass. `npm run build:fast` passes after regenerating `PAGE_REFRESH_LEDGER.md`.
- 2026-05-15: `npm run test:scripts` still reports four non-Phase-1 audit failures: KPI tool-count baseline expects 253 but catalog has 258; category layout audit expects old top-pick reason/test marker strings; comparison layout audit expects old `t2-*` mobile hero/fact-card markers. Phase 1 analytics tests pass.
- 2026-05-15: `npm run check:links` reports existing broken content slugs for Phase 2: tools `coda`, `anytype`, `sora`; news slugs `2026-05-11-openai-deployment-company-formation`, `2026-04-28-openai-models-aws-bedrock`, `2026-05-06-claude-managed-agents-dreaming-outcomes`, `2026-04-16-anthropic-claude-opus-4-7`, `2026-04-23-openai-gpt-5-5`, `2026-05-11-openai-daybreak-codex-security`, `2026-05-04-mistral-3-open-model-release`, `2026-04-28-alibaba-vidu-shengshu-funding`.

## 15. Final report

Pending.
