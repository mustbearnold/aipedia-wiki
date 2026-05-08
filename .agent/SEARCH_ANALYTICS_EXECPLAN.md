# Search Analytics ExecPlan

### 1. Objective

Add privacy-light search intent analytics to AiPedia's `/search/` page and global search modal so editorial and revenue work can identify zero-result queries, clicked tools/pages, quick terms, and tab usage. This supports SEO prioritization, missing money-page discovery, internal-link planning, and conversion strategy without changing rankings or content claims.

### 2. Current state

- `src/pages/search.astro` renders a noindexed full-catalog search page with client-side filtering, quick-search chips, and result cards. It updates the URL and visible counters but does not emit analytics events.
- `src/components/SearchModal.astro` powers the global command/search modal across the site. It supports tool search, Pagefind general search, tabs, suggestions, keyboard navigation, and result clicks, but does not emit search-intent analytics.
- `src/components/CommercialAnalytics.astro` and `src/pages/stack-builder/index.astro` already establish an AiPedia pattern: dispatch a custom event, send to `gtag` when available, and queue events until `aipedia:analytics-ready`.
- The repo audit lists search analytics as a top unfinished task because zero-result queries and clicked search results reveal missing money pages and high-intent tool demand.

### 3. Target state

Search surfaces should emit consistent, non-invasive events:

- `search_performed`
- `search_zero_results`
- `search_result_clicked`
- `search_quick_term_clicked`
- `search_modal_opened`
- `search_tab_changed`
- `search_suggestion_clicked`

Payloads should include page/search context such as `page_type`, `page_slug`, `search_surface`, `query`, `result_count`, `active_tab`, `result_type`, `result_url`, `tool_slug` where available, `device_type`, and `viewport_width`. Events should dispatch as `aipedia:search` custom events and send to GA only when `gtag` is available.

### 4. Scope

Included:

- Add test-first static guard for required search analytics events and payload fields.
- Add analytics helper and events to `/search/`.
- Add analytics helper and events to `SearchModal.astro`.
- Verify tests, build, and rendered behavior.

Excluded:

- Server-side analytics collection.
- Search UI redesign.
- Pagefind indexing changes.
- Storing sensitive personal data beyond the visitor-entered search query already visible in the UI and only after analytics consent enables GA.

### 5. Files likely affected

- `.agent/SEARCH_ANALYTICS_EXECPLAN.md`
- `tests/scripts/search-analytics.test.mjs`
- `src/pages/search.astro`
- `src/components/SearchModal.astro`

### 6. Data model impact

No content schema or tool data changes. This is a client-side event payload addition only.

### 7. SEO impact

No indexability changes. Better query/result analytics should reveal missing buyer pages, weak labels, and zero-result terms that can become future SEO work.

### 8. Conversion impact

Search result clicks can show which tools and categories visitors seek before clicking commercial CTAs. This improves future money-page prioritization and internal-link strategy.

### 9. Mobile UX impact

No visual UI changes intended. Verification must ensure the search page and modal still work at mobile widths and do not introduce horizontal overflow or broken search interactions.

### 10. Implementation steps

1. Add failing static test for required events and payload fields.
2. Implement `/search/` analytics helper, debounced search events, quick-term events, zero-result events, and result-click events.
3. Implement global search modal analytics helper, open/tab/suggestion/search/result events, and analytics-ready queue flushing.
4. Run focused test until green.
5. Run `npm run test:scripts`, `npm run check`, and `npm run build:fast`.
6. Browser QA `/search/` and modal search for event dispatch, result clicks, and mobile overflow.

### 11. Verification commands

- `node --test tests/scripts/search-analytics.test.mjs`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- Playwright/in-app browser QA for `/search/?q=apollo`, `/search/?q=zzzz-no-match-aipedia`, and global search modal.

### 12. Acceptance criteria

- Static test fails before implementation and passes after implementation.
- `/search/` emits performed, zero-result, quick-term, and result-click events.
- Global search modal emits opened, tab-changed, suggestion, performed, zero-result, and result-click events.
- Events include device type and viewport width.
- GA calls queue until `aipedia:analytics-ready` and dispatch `aipedia:search` custom events immediately.
- Build and relevant checks pass.
- Mobile QA finds no horizontal overflow or broken search interactions.

### 13. Risks and mitigations

- Risk: Input events could spam analytics. Mitigation: debounce performed/zero-result events and skip empty queries.
- Risk: Modal events could double-bind after Astro transitions. Mitigation: preserve the existing `window.__aipediaSearchInit` guard and use delegated result-click handling.
- Risk: Personal or sensitive queries can be typed into search. Mitigation: no server-side capture in this checkpoint; GA only receives events when analytics consent is enabled.

### 14. Progress log

- 2026-05-08: Created plan after inspecting `/search/`, `SearchModal.astro`, stack-builder analytics conventions, and the repo audit. Added failing `tests/scripts/search-analytics.test.mjs` confirming current search surfaces lack required analytics helpers and events.
- 2026-05-08 22:25 NZST: Implemented catalog and modal search analytics. Fixed two QA-discovered issues: global modal keyboard shortcut now normalizes `Control+K` / `Control+k`, and modal result-click analytics preserve the searched query even when Astro navigation clears the input. Tightened `/search/` result payloads so `category_slug` uses the real category slug, not the display label.
- 2026-05-08 22:25 NZST: Verified `/search/` at 360, 390, 430, 768, and 1024px with Playwright: `search_performed`, `search_result_clicked`, and `search_zero_results` emitted; Apollo click payload included `tool_slug: apollo`, `category_slug: ai-automation`, and `query: apollo`; no horizontal overflow. Verified global modal at 390px: `search_modal_opened`, `search_performed`, `search_result_clicked`, `search_tab_changed`, `search_suggestion_clicked`, and `search_zero_results` emitted; Apollo click preserved query and category slug; no horizontal overflow.
- 2026-05-08 22:25 NZST: Ran `node --test tests/scripts/search-analytics.test.mjs`, `npm run test:scripts`, `npm run check`, and `npm run build:fast`. All passed. `build:fast` generated 908 pages; `audit-indexability` and `audit-commercial-cta` passed.

### 15. Final report

Completed for this checkpoint.

Changed files:

- `src/pages/search.astro`
- `src/components/SearchModal.astro`
- `tests/scripts/search-analytics.test.mjs`
- `.agent/SEARCH_ANALYTICS_EXECPLAN.md`

What improved:

- `/search/` now emits privacy-light intent events for performed searches, zero-result searches, quick-term clicks, and result clicks.
- The global search modal now emits open, tab change, suggestion click, performed search, zero-result search, and result-click events.
- Event payloads include page/search context, query, result counts, device type, viewport width, result metadata, tool slug, and category slug where available.
- Search result click tracking now survives modal navigation timing and preserves the visitor's searched query.

Mobile impact:

- No visual redesign shipped in this checkpoint.
- Browser QA covered 360, 390, 430, 768, and 1024px for `/search/`; no horizontal overflow found.
- Modal QA at 390px verified keyboard open, result click, tab switch, suggestion, zero-result event, and no horizontal overflow.

SEO impact:

- No indexability or ranking-template changes.
- Search analytics creates better evidence for missing money pages, weak labels, and zero-result buyer demand.

Conversion/revenue impact:

- Result-click events connect search intent to tool/category demand before affiliate CTA clicks.
- Query and category slug preservation improves future affiliate funnel analysis and money-page prioritization.

Checks run:

- `node --test tests/scripts/search-analytics.test.mjs` passed.
- `npm run test:scripts` passed: 22/22 tests.
- `npm run check` passed: content guard, stale-fact guard, guide-pick audit, font policy, internal links, news xrefs, and security audit.
- `npm run build:fast` passed: 908 pages built; indexability and commercial CTA audits passed.
- Playwright browser QA passed for catalog search and modal search events/overflow.

Remaining risks:

- Search queries are still analytics payload data. GA dispatch remains gated by `gtag` availability/consent, but future privacy review should decide whether to hash, truncate, or classify sensitive queries.
- This checkpoint instruments search behavior; it does not yet add an analytics dashboard, warehouse export, or editorial workflow for acting on zero-result queries.
