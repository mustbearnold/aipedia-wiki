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

---

## ExecPlan: May 16-18 2026 News Refresh

### 1. Objective

Publish non-duplicate AiPedia news articles for verified AI and AI-tool developments since the last local news pass on May 15, 2026. The work supports trust, organic rankings, editorial freshness, and decision-oriented recirculation.

### 2. Current state

`src/content/news/` is the source of truth for news articles. The latest existing article is `2026-05-15-chatgpt-finances-file-library-rollout.md`. `src/pages/news/index.astro` and `src/pages/news/[slug].astro` generate the archive and article pages from the content collection. `scripts/audit-news-xrefs.mjs` requires affected tool pages to link to recent news items when `affects` is set.

### 3. Target state

Only verified May 16, May 17, and May 18, 2026 stories that are not already covered get new article files. Each article has source-backed frontmatter, date fields, summary, category tags, related tools where useful, and concise decision guidance. Affected tool pages link back to the new stories so the news xref audit passes.

### 4. Scope

Included: `src/content/news/`, affected `src/content/tools/*.md` cross-links, generated ledger updates, news index/top-layer verification, and relevant checks. Excluded: speculative future Google I/O claims, duplicate coverage of May 14-15 OpenAI/Anthropic/GitHub stories, new tool records, logos, affiliate changes, and external analytics.

Affected top-layer pages: `/news/`, relevant individual tool pages, sitemap/RSS/llms surfaces generated from content, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/news/*.md`, selected `src/content/tools/*.md`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. New news records must conform to the existing `news` collection frontmatter and use current source URLs with `last_verified: 2026-05-18`.

### 7. SEO impact

New indexable news article pages should have unique titles, summaries, canonical URLs generated by the existing route, article dates, source links, and internal links to affected tools/categories.

### 8. Conversion impact

No new affiliate CTAs are planned. Articles should route readers to relevant tool pages and comparisons without overstating commercial recommendations.

### 9. Mobile UX impact

News pages reuse the existing article layout. Verify at least representative new article rendering and no obvious horizontal overflow at mobile/tablet widths if time permits.

### 10. Implementation steps

1. Confirm latest local news baseline and scan for duplicate topics.
2. Search current May 2026 sources for May 16-18 AI/tool news.
3. Add only high-confidence, non-duplicate news articles.
4. Add affected tool-page cross-links for any article with `affects`.
5. Regenerate the page refresh ledger.
6. Run news, link, ledger, and build checks.

### 11. Verification commands

`npm run ledger:pages`, `npm run check:news`, `npm run check:links`, `npm run ledger:pages:check`, `npm run build:fast`.

### 12. Acceptance criteria

Each new article is dated May 16-18, 2026, has at least one current source URL, is not a duplicate of existing news, and links to/receives links from affected tool pages when applicable. `/news/` remains generated and current. Ledger checks and news xref checks pass or failures are documented.

### 13. Risks and mitigations

Search results may include stale, syndicated, or future-dated content; prefer official/vendor pages and named reporting with exact dates. Avoid speculative I/O preview coverage unless a concrete source confirms a launch. Do not edit unrelated untracked files.

### 14. Progress log

2026-05-18: Plan created. Local baseline shows latest news article on May 15, 2026. Starting current-source verification for May 16-18 stories.
2026-05-18: Added four non-duplicate news articles covering OpenAI product strategy, arXiv AI-generated submission enforcement, Apple's reported Siri revamp direction, and Nectar Social's Series A. Updated ChatGPT and Codex recent-change cross-links, refreshed news/RSS/llms surfaces, regenerated `PAGE_REFRESH_LEDGER.md`, and completed content/build/mobile checks.
2026-05-18: Added generated news artwork for all four new articles: canonical dark OG PNG, light-mode OG PNG, dark on-page WebP thumbnail, and light-mode on-page WebP thumbnail. Used the existing `scripts/generate-og-news.mjs` visual system and restored older tracked OG files so only the new article assets remain in scope.

### 15. Final report

Completed on 2026-05-18.

Published articles:

- `src/content/news/2026-05-16-openai-brockman-chatgpt-codex-product-strategy.md`
- `src/content/news/2026-05-16-arxiv-ai-slop-one-year-ban.md`
- `src/content/news/2026-05-17-apple-siri-revamp-auto-delete-chats.md`
- `src/content/news/2026-05-16-nectar-social-30m-agentic-marketing-os.md`

Published artwork:

- `public/og/news/2026-05-16-openai-brockman-chatgpt-codex-product-strategy.png`
- `public/og/news/2026-05-16-arxiv-ai-slop-one-year-ban.png`
- `public/og/news/2026-05-17-apple-siri-revamp-auto-delete-chats.png`
- `public/og/news/2026-05-16-nectar-social-30m-agentic-marketing-os.png`
- Matching light-mode PNGs under `public/og/news/light/`
- Matching dark and light WebP thumbnails under `public/og/news/thumbs/` and `public/og/news/thumbs/light/`

Skipped duplicates already covered by existing AiPedia news: ChatGPT finance/File Library rollout, OpenAI Codex mobile, Google May 12 Gemini/Android Show, and May 12-14 Anthropic/OpenAI items.

Affected top-layer and generated surfaces were refreshed through `/news/`, `/news/rss.xml`, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md`. Individual article URLs remain intentionally excluded from the page ledger, while affected tool rows for `/tools/chatgpt/` and `/tools/codex/` were refreshed.

Verification passed: `npm run check:news`, `npm run check:links`, `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run test:scripts`, `npm run check`, and `npm run build:fast`. Image metadata QA confirmed all four new article image sets are present at `1200x630` for OG PNGs and `960x504` for WebP thumbnails. Static browser QA against `dist-fast` passed at 360, 390, 430, 768, and 1024 px for `/news/` and all four new article pages, with no document-level horizontal overflow and no broken visible images.
