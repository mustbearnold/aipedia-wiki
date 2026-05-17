# AiPedia ExecPlans

An ExecPlan is required for significant work. It is a living implementation plan that Codex must keep updated while working.

## When required

Use an ExecPlan for major features, refactors, migrations, page-template rebuilds, SEO/schema changes, analytics systems, Tool Set Builder work, homepage/category/comparison redesigns, any task touching many files, or any work that changes multiple child pages under one top-layer section.

## Rules

The ExecPlan must be self-contained. A future Codex session with only the repo and this plan must understand what is being built, why it matters, what files are affected, how to verify it, and what “done” means.

Do not write vague plans. Every plan must include concrete files, components, data models, commands, QA gates, and acceptance criteria.

Every ExecPlan that touches child pages must include a top-layer maintenance pass. Identify the affected homepage modules, section indexes, parent category pages, archive pages, comparison/category/guide hubs, sitemap/llms surfaces, navigation, and internal-link blocks before coding. Before the plan is complete, verify those parent surfaces are updated, accurate, and not weaker or staler than the sub-pages they summarize.

## Required structure

### 1. Objective

Describe the user/business goal in plain English. Tie it to AiPedia’s mission: rankings, trust, mobile UX, affiliate conversion, maintainability, or editorial scalability.

### 2. Current state

Document what exists now after inspecting the repo. Include relevant files, routes, components, data structures, tests, and known issues.

### 3. Target state

Describe the desired behavior and user experience. Include mobile and desktop expectations.

### 4. Scope

List what is included and excluded.

Include affected top-layer pages, parent hubs, archive pages, navigation surfaces, sitemap/llms surfaces, and internal-link blocks when the work changes sub-pages or records they summarize.

### 5. Files likely affected

List exact files or directories. Update this during implementation.

### 6. Data model impact

Explain changes to tool data, category data, comparison data, affiliate data, source data, scoring data, or analytics payloads.

### 7. SEO impact

Explain title/meta/canonical/schema/internal-link/indexing effects.

### 8. Conversion impact

Explain CTA placements, affiliate tracking, disclosure, and revenue events.

### 9. Mobile UX impact

Explain how the change behaves at 360, 390, 430, 768, and desktop widths.

### 10. Implementation steps

Use ordered, verifiable steps. Each step should produce a working intermediate state where possible.

### 11. Verification commands

List exact commands to run, such as lint, typecheck, tests, build, page audit, link checker, schema test, or Playwright screenshots.

### 12. Acceptance criteria

Define what must be true before the work can be considered done.

Include a top-layer maintenance criterion whenever child pages were changed: affected parent hubs and archives must be current, internally linked, SEO-aligned, and verified against the changed child pages.

### 13. Risks and mitigations

List possible regressions and how to avoid them.

### 14. Progress log

Update after each major step with date/time, change summary, commands run, and results.

### 15. Final report

Summarize changed files, behavior shipped, tests passed, unresolved risks, and recommended next task.

---

## ExecPlan: Engagement-Rate Fix Pass

### 1. Objective

Improve AiPedia engagement rate using the local audit findings: make search cover more of the site, expose clearer next clicks above the fold, reconnect comparison-building paths, instrument internal engagement actions, strengthen recirculation, and remove mobile tap-target friction. This supports mobile UX, affiliate conversion, trust, data quality, and editorial scalability.

### 2. Current state

Local audit found `/api/home-search.json` only indexes tools, comparisons, news, and categories; `SearchModal.astro` only renders those groups. Answer pages show decision links below the 360/390/430px fold. `CompareTray.astro` exists but current tool/category/guide pages do not emit active `data-compare-add` buttons. Most hub pages render card links without analytics attributes. Article/trend routes lack automatic related rails. Mobile filter chips and cookie buttons are under the preferred 44px target.

### 3. Target state

Search should discover tools, comparisons, news, categories, guides, workflows, trends, answers, and companies. Hubs should track card/filter clicks. Tool/category/guide pages should let users add tools to the compare tray and open contextual compare-builder paths. Answer-page action links should be visible earlier on mobile. Article/trend/workflow pages should provide related next clicks. Mobile controls should meet 44px tap-target expectations.

### 4. Scope

Included: search API, search modal grouping, answer registry, answer decision panel, current tool/category/guide layouts, hub indexes, comparison index, ArticlePlusLayout recirculation, tap target CSS, analytics attributes, tests/build/QA, and ledger regeneration if page inventory changes. Excluded: external data, volatile fact updates, large content rewrites, affiliate-program changes, and redesigning the whole visual system.

Affected top-layer pages: homepage search, `/search/`, `/tools/`, tool pages, `/categories/`, category pages, `/compare/`, comparison pages, `/guides/`, guide pages, `/news/`, news articles, `/trends/`, trend articles, `/workflows/`, workflow pages, `/answers/`, answer pages, `/explore/`, compare tray, sitemap/llms generated surfaces through build.

### 5. Files likely affected

`src/pages/api/home-search.json.ts`, `src/components/SearchModal.astro`, `src/pages/search.astro`, `src/pages/index.astro`, `src/components/AnswerDecisionPanel.astro`, `src/pages/answers/index.astro`, `src/data/answers.ts`, `src/layouts/ToolLayout.astro`, `src/layouts/CategoryLayout.astro`, `src/layouts/GuideLayout.astro`, `src/layouts/ArticlePlusLayout.astro`, `src/pages/compare/index.astro`, `src/pages/tools/index.astro`, `src/pages/categories/index.astro`, `src/pages/guides/index.astro`, `src/pages/news/index.astro`, `src/pages/trends/index.astro`, `src/pages/workflows/index.astro`, `src/pages/explore/index.astro`, `src/components/CookieConsent.astro`, tests as needed, and `PAGE_REFRESH_LEDGER.md`.

### 6. Data model impact

Add a lightweight answer registry for answer index/search reuse. Search index gains new item kinds and payload fields but keeps compact JSON shape. Analytics payloads gain consistent page type, slug, destination, label, position, and source module on more internal links.

### 7. SEO impact

No new indexable pages are planned. Internal links and discovery paths improve. Existing title/meta/canonical/schema should remain stable.

### 8. Conversion impact

Commercial CTA behavior remains editorial and disclosure-backed. Compare/add actions and contextual compare-builder links should increase internal engagement without replacing primary paid CTAs.

### 9. Mobile UX impact

Answer actions move upward on mobile. Filter chips and cookie controls increase to 44px. Compare buttons must stay compact and non-overlapping at 360, 390, 430, 768, and 1024px.

### 10. Implementation steps

1. Add shared answer registry and expand home search inventory/modal grouping.
2. Instrument homepage/search/hub card and filter interactions.
3. Add compare-tray/add-to-compare controls and contextual compare-builder CTAs.
4. Reorder answer panel links for above-fold action visibility.
5. Add automatic related rails for article/trend/workflow pages.
6. Increase mobile tap targets and run build/tests/browser QA.

### 11. Verification commands

`npm run test:scripts`, `npm run check`, `npm run build:fast`, `npm run audit:kpis`, `npm run check:dist`, `npm run check:links`, `npm run check:news`, `npm run check:security`, and browser QA at 360, 390, 430, 768, and 1024px.

### 12. Acceptance criteria

Search returns guides/workflows/answers/trends for matching queries. Answer action links are visible within the first 900px at 360px. Current layouts expose compare-add controls. Major hub card/filter interactions emit analytics attributes. Article/trend/workflow pages have usable related next clicks. No horizontal overflow appears at tested widths. Build/checks pass or unrelated failures are documented.

### 13. Risks and mitigations

Search payload could grow too large; keep fields compact and cap modal display. Compare controls could crowd mobile cards; use small secondary controls below existing rows. Related rails could become noisy; limit item counts and source them from local metadata. Existing dirty/untracked files must be ignored.

### 14. Progress log

2026-05-17: Plan created after engagement audit. Starting implementation.
2026-05-17: Implemented first-pass engagement fixes across search/discovery, answer decision actions, compare paths, related rails, hub analytics attributes, and mobile tap targets. Regenerated the page refresh ledger and verified with script tests, guard checks, fast build, and browser QA at 360, 390, 430, 768, and 1024px.

### 15. Final report

Completed the first engagement-rate fix pass. Search now covers broader site-local inventory, hub/search/filter links carry richer engagement metadata, individual answer pages expose decision actions earlier, compare-add paths are available on major decision surfaces, article/trend/workflow pages gain related next clicks, and header/filter/cookie tap targets were tightened for mobile and tablet. Verification passed: `npm run test:scripts`, `npm run check`, `npm run build:fast`, `npm run ledger:pages`, focused browser QA, plus targeted search rendering checks. Remaining risk: this pass improves local UX/instrumentation paths, but true engagement lift still needs production analytics later.
