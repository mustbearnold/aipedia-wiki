# AiPedia Repo Audit - 2026-05-08

## Audit Summary

AiPedia is structurally strong for a static, source-backed AI tools wiki: centralized Astro content collections, canonical tool facts, source registry, sitemap generation, internal-link audits, freshness audits, smoke tests, and page templates for tools, comparisons, categories, guides, companies, search, and Stack Builder.

The biggest strategic risks are not missing pages. They are content depth at scale, comparison-page originality, use-case buying guidance, conversion attribution, and crawl-budget discipline around utility or low-value pages.

Work completed during this audit pass:

- Added a shared commercial CTA and analytics layer.
- Added a built-HTML commercial CTA audit.
- Added `noindex, follow` controls for utility routes and guarded them in indexability audit.
- Expanded mobile smoke coverage to 360, 390, 430, and 768px across money templates.
- Added report-only thin-risk counters to the KPI audit.
- Cleared active/beta tool pages under the 800-word risk floor.
- Upgraded first high-intent use-case and comparison batches.

## Measured State After This Pass

- Tools: 249 total; 245 active; 0 active/beta pages under 800 words.
- Comparisons: 263 total; 263 with canonical fact tables; 202 still under 700 words.
- Use cases: 92 total; 44 still under 850 words.
- News: 213 total; 46 still under 300 words.
- Internal links: clean.
- News-to-tool cross-refs: clean.
- Provenance/pricing audit: no missing fact source IDs, no unknown price-history source IDs.
- Commercial CTA audit: representative built money routes pass.
- Mobile smoke: money routes now checked at 360, 390, 430, and 768px.

## Issue Register

| # | Path / Route | Issue | Why It Hurts | Severity | Difficulty | Recommended Action |
|---|---|---|---|---|---|---|
| 1 | `src/content/comparisons/*.md`, `/compare/[slug]/` | 202 comparison markdown pages remain under 700 words. | Thin/originality risk for high-intent SEO pages; weak trust if prose adds little beyond generated facts. | High | Hard | Fix high-value comparisons first; merge/noindex weak cross-category pairs. |
| 2 | `src/content/use-cases/*.md`, `/guides/[slug]/` | 44 use-case pages remain under the 850-word risk floor. | Use-case pages are buyer-intent pages; thin guidance weakens rankings and conversion. | High | Medium | Fix by affiliate/search intent, not raw shortest order. |
| 3 | `src/content/news/*.md`, `/news/[slug]/` | 46 news posts remain under 300 words. | Short news can dilute topical authority if it lacks durable analysis or internal linking. | Medium | Medium | Merge into tool updates, trend pages, or noindex low-value posts. |
| 4 | `src/layouts/GuideLayout.astro` | Guide top section ranks tools but does not explicitly label best overall, budget/free, and pro/team picks. | Mobile users need instant decision paths; current ranking can feel generic. | Medium | Medium | Rebuild guide hero as decision cards plus full ranking. |
| 5 | `src/layouts/ComparisonLayout.astro` | Comparison hero has verdict and buyer-fit sections but lacks a compact "winner by use case" matrix above the fold. | Comparison pages should answer "which should I choose for my situation?" immediately. | Medium | Medium | Add mobile-first use-case winner strip sourced from tool facts and page metadata. |
| 6 | `src/content/comparisons/chatgpt-vs-otter-ai.md` and similar cross-category pairs | Some comparison pairs may not match real search/buyer intent. | Low-intent pages can dilute crawl budget and brand trust. | High | Medium | Review for merge/noindex/delete; keep only if query intent exists. |
| 7 | `src/content/comparisons/*` source sections | Several comparisons cite broad third-party ranking posts rather than primary vendor/source-backed facts. | Weakens editorial trust and source-backed authority. | High | Hard | Replace high-value comparison sources with tool facts and primary source references. |
| 8 | `src/pages/admin/reviews.astro`, `/admin/reviews/` | Static admin page is publicly routable, though API calls are auth-gated and page is noindexed. | Public admin UI can confuse crawlers/users and creates unnecessary attack surface perception. | Medium | Medium | Keep noindex now; consider Cloudflare Access or deployment-level protection. |
| 9 | `src/pages/search.astro`, `/search/` | Search is correctly noindexed, but search interactions need richer analytics. | Search queries reveal user intent and missing money pages. | Medium | Medium | Track search query, result count, filter use, zero-result queries, and clicked result. |
| 10 | `src/pages/compare/build.astro`, `/compare/build/` | Builder is now noindexed, but comparison-builder usage needs funnel tracking parity with Stack Builder. | Comparison-builder actions can reveal high-value comparison demand. | Medium | Medium | Track tool additions, pair completions, compare-page clicks, and abandoned builds. |
| 11 | `src/pages/stack-builder/index.astro` | Stack Builder has funnel events now but no downstream revenue attribution beyond click payloads. | Affiliate conversion cannot be tied to stack composition or role/budget with full confidence. | High | Hard | Add server-side/event warehouse path and affiliate postback mapping where possible. |
| 12 | `src/components/CommercialAnalytics.astro` | Client-side click/view tracking depends on GA consent and browser delivery. | Click attribution can be lost to blockers, navigation, or missing consent. | Medium | Medium | Add server-side redirect or lightweight event endpoint for opted-in commercial events. |
| 13 | `src/data/source-registry.json`, `scripts/audit-source-health.mjs` | Source health audit is report-only and live checks are not part of routine verification. | Sources can drift or disappear without alerting. | Medium | Medium | Run scheduled live source checks and persist snapshots/diffs. |
| 14 | `src/layouts/BaseLayout.astro`, global client scripts | Multiple global scripts add interaction features across static pages. | Core Web Vitals/INP risk if scripts grow without budget enforcement. | Medium | Medium | Add JS budget audit by built route and defer noncritical scripts. |
| 15 | `src/components/SearchModal.astro` | Large search modal/client code may ship broadly. | Page speed risk if global search code grows beyond need. | Medium | Medium | Audit bundle size and lazy-load search behavior where possible. |
| 16 | `src/content/tools/*.md` | Tool facts are strong, but plan recommendations are sometimes in `facts.best_paid_tier`, sometimes prose. | Harder to consistently render "best plan" across templates. | Medium | Medium | Normalize best plan fields in schema and migrate Tier 1 tools first. |
| 17 | `src/components/PostBodyEnhancements.astro` | Pricing table CTA enhancement is transitional and parses rendered prose tables. | Long-term maintainability risk; pricing CTAs should be data-driven. | Medium | Hard | Move pricing tables to structured data/components. |
| 18 | `public/og/**` | Worktree has many generated OG image modifications. | Diff noise makes review and deployment riskier. | Low | Medium | Decide whether regenerated OG assets are intentional; isolate in separate commit if needed. |
| 19 | `src/pages/tool-finder.astro`, `/tool-finder/` | Retired route redirects to search. | Good transitional UX, but should not linger forever if it has no external value. | Low | Easy | Keep until redirects settle; then consider route removal after traffic review. |
| 20 | `src/pages/dead/index.astro`, `src/content/dead/*` | Dead-tool section can be authority-positive but may be low conversion. | Could distract from buyer journeys if overemphasized. | Low | Medium | Keep for trust; noindex individual dead pages only if they are thin/duplicative. |
| 21 | `src/pages/answers/*.astro` | Static answer pages may overlap guides/categories/comparisons. | Duplicate intent can split rankings. | Medium | Medium | Consolidate answers into strongest canonical guide/comparison where overlap is high. |
| 22 | `src/pages/companies/*.astro`, `src/content/companies/*` | Company pages are few and potentially authority-building, but need consistent product-to-company funnels. | Missed internal-link and commercial routing opportunities. | Low | Medium | Add company-to-tool decision cards and related comparisons. |
| 23 | `src/layouts/CategoryLayout.astro` | Fixed during audit: top picks now map to best overall, budget, pro/team. Needs future guard. | Prevents regression on category first-screen law. | Low | Easy | Add Playwright text assertions for top-pick labels. |
| 24 | `scripts/audit-commercial-cta.mjs` | Representative route coverage is good but not exhaustive. | A non-representative template path could lose CTA payloads unnoticed. | Medium | Medium | Expand to sample more generated categories/guides/tools and all CTA variants. |
| 25 | `scripts/audit-indexability.mjs` | Required noindex guard now covers known utility routes only. | New utility routes could accidentally enter sitemap. | Medium | Easy | Require each utility route to be declared in an indexability policy list. |

## Prioritized Top 25 Fix List

1. Upgrade top 25 comparison pages by commercial/search value.
2. Add "winner by use case" strip to comparison template.
3. Rebuild guide hero with best overall, budget/free, and pro/team decision cards.
4. Add search analytics: query, result count, filters, clicked result, zero-result terms.
5. Add comparison-builder funnel analytics and demand capture.
6. Add server-side or durable commercial event capture for outbound CTA clicks.
7. Replace weak comparison sources with primary/tool-fact sources on top money pages.
8. Review cross-category comparison pages for noindex/merge/delete.
9. Upgrade next 25 use-case pages under 850 words.
10. Review 46 short news posts for merge/noindex/expand decisions.
11. Add JS/CSS built budget checks by page type.
12. Normalize `best_paid_tier` / best-plan fields into content schema.
13. Move pricing table CTAs to structured data components.
14. Expand commercial CTA audit sample coverage.
15. Expand indexability policy to all utility routes.
16. Add category top-pick label regression tests.
17. Add source-health live checks to scheduled maintenance.
18. Add pagefind/search click analytics to identify missing pages.
19. Build company-page funnels into product pages and comparisons.
20. Consolidate overlapping answer pages into canonical guides.
21. Review `/dead/` pages for thin/noindex candidates.
22. Add Stack Builder revenue reports by role, budget, and tool mix.
23. Isolate generated OG image churn into intentional asset commits.
24. Add mobile screenshots for top templates to CI artifacts.
25. Add editorial QA checklist for every new money page.

## First 10 Codex Tasks After This Audit

1. Rebuild `GuideLayout.astro` first screen into decision cards.
2. Add comparison "winner by use case" strip in `ComparisonLayout.astro`.
3. Upgrade 25 highest-intent comparison markdown files.
4. Add search analytics events to `/search/`.
5. Add comparison builder analytics events to `/compare/build/`.
6. Add CTA server/durable event capture design and first implementation.
7. Add noindex/merge review list for low-value comparison pairs.
8. Upgrade next 25 under-floor use-case pages.
9. Add JS budget audit for built pages.
10. Normalize best-plan schema for Tier 1 tools.

## Recommended Rebuild Order

1. Commercial CTA/tracking layer. Completed in this pass.
2. Indexability and sitemap controls. Completed for known utility routes.
3. Mobile smoke guardrails for money templates. Completed in this pass.
4. Category first-screen decision logic. Completed in this pass.
5. Tool first-screen best-plan logic. Completed in this pass.
6. Guide/use-case first-screen rebuild.
7. Comparison first-screen/use-case winner rebuild.
8. High-intent comparison content upgrade.
9. High-intent use-case content upgrade.
10. Search and comparison-builder demand analytics.
11. Source health automation.
12. Performance budget enforcement.

## Consider Merge, Noindex, Or Delete

- Noindex/merge likely: odd cross-category comparisons where real buyer intent is weak, especially broad assistant vs unrelated specialist pages.
- Merge likely: short news that only repeats a vendor announcement and is already summarized on a tool page.
- Noindex likely: internal utility/admin pages, already started with `/admin/reviews/`, `/search/`, and `/compare/build/`.
- Keep but improve: dead-tool pages that explain shutdowns and alternatives, because they can build trust and intercept churn queries.
- Consolidate: overlapping `/answers/*` pages when a guide or comparison already owns the same query better.

## Missing Money Pages To Create First

1. Best AI coding tools for teams.
2. Best AI video generator for ads.
3. Best AI image generator for ecommerce.
4. Best AI meeting assistant for sales teams.
5. Best AI writing tool for SEO content.
6. Best AI browser for research.
7. Best AI agent platform for enterprise.
8. Best AI automation tool for small business.
9. ChatGPT Plus vs Pro.
10. Claude Pro vs Max.
11. Cursor Pro vs Business.
12. Midjourney Basic vs Standard vs Pro.
13. Perplexity Pro vs Max.
14. Best AI tool stack for solo founders.
15. Best AI tool stack for agencies.

## Permanent Mobile-First Template Changes

- Every tool page should show verified status, no-paid-placement trust, tool name, category, score, price, one-line verdict, best plan, primary CTA, nearby disclosure, and watch-out in the first mobile screen.
- Every category page should show best overall, best free/budget, and best pro/team.
- Every comparison page should show winner for most people and winner by use case.
- Every guide page should show best overall, budget/free, and pro/team picks before long prose.
- Wide tables should be secondary on mobile and wrapped with clear alternatives above them.
- Sticky CTAs should never hide content or lack nearby disclosure.
- No mobile route should create body-level horizontal scroll at 360, 390, 430, or 768px.

## Tracking Events Needed

- `commercial_cta_view`
- `commercial_cta_click`
- `affiliate_cta_view`
- `affiliate_cta_click`
- `official_cta_view`
- `official_cta_click`
- `sticky_cta_view`
- `sticky_cta_click`
- `pricing_table_cta_click`
- `stack_builder_started`
- `stack_builder_role_selected`
- `stack_builder_budget_selected`
- `stack_builder_completed`
- `stack_builder_tool_swapped`
- `stack_builder_try_tool`
- `stack_builder_try_stack`
- `save_stack`
- `internal_compare_click`
- `search_performed`
- `search_result_clicked`
- `search_zero_results`
- `category_filter_used`
- `comparison_builder_started`
- `comparison_builder_tool_added`
- `comparison_builder_completed`
- `comparison_builder_result_clicked`
- `affiliate_disclosure_viewed`
