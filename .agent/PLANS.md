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

---

## ExecPlan: May 18-19 2026 News Refresh

### 1. Objective

Publish source-backed AiPedia news coverage for the missing May 18 and May 19, 2026 AI and AI-tool news since the previous news pass. The goal is editorial freshness, trust, organic coverage, and buyer-useful context for affected tool pages.

### 2. Current state

`src/content/news/` contains news articles through `2026-05-17-apple-siri-revamp-auto-delete-chats.md`. The existing May 16-18 plan says the previous pass completed on 2026-05-18, but no May 18 or May 19 article files are present. The news route is generated from the `news` collection, `/news/` groups by month, `/news/rss.xml`, `/llms.txt`, and `/llms-full.txt` are content-driven crawl surfaces with refresh comments dated 2026-05-18. `scripts/audit-news-xrefs.mjs` requires affected tool pages to reference recent news items listed in `affects`.

### 3. Target state

Add non-duplicate May 18 and May 19 news articles for the high-impact verified stories: OpenAI/Dell Codex enterprise environments, Anthropic acquiring Stainless, GitHub Copilot agent and model updates, Musk v. OpenAI trial outcome, Google I/O Gemini/Antigravity/subscription changes, OpenAI/Google provenance and SynthID moves, and Anthropic/KPMG enterprise rollout. Each article must include current sources, buyer takeaways, and cautious language around rollouts and pricing.

### 4. Scope

Included: new news markdown, affected tool-page cross-links/fact snippets, `/news/` refresh metadata, RSS/LLM crawl-surface refresh metadata, generated OG news artwork, ledger regeneration, and content/build checks. Excluded: adding new tool records, logo sourcing for new tools, broad template redesign, affiliate changes, and speculative or single-source rumors not needed for buyer decisions.

Affected top-layer pages and surfaces: `/news/`, `/tools/chatgpt/`, `/tools/codex/`, `/tools/claude/`, `/tools/github-copilot/`, `/tools/gemini/`, `/tools/antigravity/`, `/tools/gpt-image-2/`, `/tools/imagen/`, `/tools/veo/`, `/news/rss.xml`, `/llms.txt`, `/llms-full.txt`, sitemap/build-generated surfaces, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/news/*.md`, selected `src/content/tools/*.md`, `src/pages/news/index.astro`, `src/pages/news/rss.xml.ts`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, generated files under `public/og/news/`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. New news records must conform to existing frontmatter. Tool pages updated with `last_updated` and `last_verified` set to 2026-05-20 where facts or cross-links change. Gemini/Antigravity/Google media tool pricing language must reflect Google's May 19 subscription changes.

### 7. SEO impact

New indexable news pages get unique titles, summaries, canonical route generation, NewsArticle structured data, source lists, OG images, and internal links to affected tool/category pages. `/news/` latest label and crawl surfaces should reflect the May 19 article set.

### 8. Conversion impact

No new affiliate CTAs. Tool pages keep buyer guidance honest and commercial-neutral; pricing guidance is updated where Google AI Ultra changed from one $249.99 tier to $100/$200 tiers.

### 9. Mobile UX impact

News pages reuse `ArticlePlusLayout`. Verify representative new pages and `/news/` at 360, 390, 430, 768, and 1024 widths for overflow and image rendering after the build.

### 10. Implementation steps

1. Add May 18 and May 19 news records with verified sources and buyer-focused body copy.
2. Update affected tool pages with recent-change links and necessary volatile fact corrections.
3. Refresh top-layer/crawl-surface metadata comments.
4. Generate news OG artwork.
5. Regenerate `PAGE_REFRESH_LEDGER.md`.
6. Run xref/link/ledger/tests/build checks and representative mobile QA.

### 11. Verification commands

`npm run check:news`, `npm run check:links`, `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and focused Playwright/browser QA for `/news/` plus representative new article pages at 360, 390, 430, 768, and 1024 px.

### 12. Acceptance criteria

Every new article has dated source-backed frontmatter, at least one current source, no duplicate existing coverage, and practical buyer guidance. Every article with `affects` has a corresponding affected tool-page link. Google pricing/model facts updated in touched tool pages match May 19 sources. `/news/`, RSS, and LLM surfaces are marked refreshed. Ledger and news xref checks pass, with any unrelated failures documented.

### 13. Risks and mitigations

Google I/O generated many announcements; group related product-platform changes instead of creating thin near-duplicate articles. Avoid overclaiming rollout availability; distinguish "available today," "rolling out," "preview," and "trusted testers." Do not touch unrelated untracked logs or spreadsheet files.

### 14. Progress log

2026-05-20: Plan created after repo inspection and current-source verification. Local news files stop at May 17; target coverage is missing May 18 and May 19, while the user's "today 19-05-2026" is being treated as the requested news cutoff and facts are verified on the actual current date, 2026-05-20.
2026-05-20: Added nine May 18-19 news records covering OpenAI/Dell Codex enterprise data, Anthropic/Stainless, GitHub Copilot control-plane updates, Musk v. OpenAI verdict, Google I/O Gemini/Search/AI Ultra, Google Antigravity/Managed Agents, OpenAI/Google provenance, Anthropic/KPMG, and Gemini 3.5 Flash in GitHub Copilot. Updated affected tool pages and top-layer news/RSS/LLM refresh markers.
2026-05-20: Generated matching news artwork, regenerated `PAGE_REFRESH_LEDGER.md`, and validated the refresh. Passing commands: `npm run check:news`, `npm run check:links`, `npm run ledger:pages:check`, `npm run test:scripts`, `npm run build:fast`, image metadata QA, and static browser QA across 360, 390, 430, 768, and 1024 px. `npm run check` passed all content/link/news gates and failed only at the existing moderate `ws` advisory surfaced by `npm audit` through Cloudflare/Wrangler.

### 15. Final report

Completed on 2026-05-20.

Published articles:

- `src/content/news/2026-05-18-openai-dell-codex-hybrid-enterprise-data.md`
- `src/content/news/2026-05-18-anthropic-acquires-stainless-developer-platform.md`
- `src/content/news/2026-05-18-github-copilot-agent-control-plane-updates.md`
- `src/content/news/2026-05-18-musk-openai-lawsuit-verdict-governance-overhang.md`
- `src/content/news/2026-05-19-google-io-gemini-35-search-ai-ultra.md`
- `src/content/news/2026-05-19-google-antigravity-managed-agents-ai-studio.md`
- `src/content/news/2026-05-19-openai-google-synthid-c2pa-image-provenance.md`
- `src/content/news/2026-05-19-anthropic-kpmg-claude-276000-workers.md`
- `src/content/news/2026-05-19-github-copilot-gemini-35-flash-ga.md`

Updated affected tool pages: `chatgpt`, `codex`, `claude`, `github-copilot`, `gemini`, `antigravity`, `gpt-image-2`, `imagen`, and `veo`. Refreshed `/news/`, `/news/rss.xml`, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md`. Generated 36 matching image assets for the nine new articles across dark OG PNG, light OG PNG, dark WebP thumbnail, and light WebP thumbnail.

Verification passed: `npm run check:news`, `npm run check:links`, `npm run ledger:pages:check`, `npm run test:scripts`, `npm run build:fast`, image metadata QA for all 36 generated assets, and static browser QA for `/news/`, all nine new articles, and the nine affected tool pages at 360, 390, 430, 768, and 1024 px. `npm run check` failed only at `npm run check:security` because of an existing moderate `ws` advisory inherited through Cloudflare/Wrangler; no forced dependency change was made as part of this editorial refresh.

---

## ExecPlan: Gemini Omni Tool Page

### 1. Objective

Create a source-backed, decision-oriented `/tools/gemini-omni/` page that helps buyers understand whether Google's new Gemini Omni / Gemini Omni Flash video model is worth testing, which Google plan or surface to use, and which alternative to test first. This supports organic rankings, trust, mobile UX, data quality, and editorial scalability.

### 2. Current state

`src/content/tools/` has Google media pages for `gemini`, `veo`, and `imagen`, but no dedicated `gemini-omni` record. `src/content/categories/ai-video.md` mentions Veo 3.1 as the Google/API video pick and is last verified 2026-05-17. `src/data/logo-manifest.json` maps `gemini` to `public/logos/tools/gemini.png`, but no Gemini Omni logo entry exists. Tool pages render through `src/layouts/ToolLayout.astro`, which uses frontmatter for hero facts, scores, CTAs, schema, compare actions, sources, and trust labels.

### 3. Target state

`/tools/gemini-omni/` should be a complete mobile-first buying page: trust date, score, price route, verdict, best plan, watch-outs, feature facts, pricing guidance, comparison guidance, failure modes, FAQ, sources, and related links. The page should clearly distinguish Gemini Omni from Gemini 3.5 Flash, Veo 3.1, Imagen 4, and Runway. Parent and related Google/video pages should link to the new page.

### 4. Scope

Included: new Gemini Omni tool content record, reused/verified Gemini logo asset for the new slug, regenerated logo manifest, generated OG image, AI video category refresh, related Gemini/Veo/Imagen cross-links where relevant, `PAGE_REFRESH_LEDGER.md`, content checks, build, and mobile/browser QA.

Excluded: creating a new comparison page, adding affiliate links, changing the tool layout template, broad Google pricing refactors, and making unsupported API pricing claims for Gemini Omni.

Affected top-layer pages and surfaces: `/tools/`, `/tools/gemini-omni/`, `/tools/gemini/`, `/tools/veo/`, `/tools/imagen/`, `/categories/ai-video/`, sitemap/build-generated routes, `/llms.txt`, `/llms-full.txt`, search/API generated tool inventories, logo manifest, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/tools/gemini-omni.md`, `src/content/categories/ai-video.md`, `src/content/tools/gemini.md`, `src/content/tools/veo.md`, `src/content/tools/imagen.md`, `public/logos/tools/gemini-omni.png`, `src/data/logo-manifest.json`, `public/og/tools/gemini-omni.png`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

Add one `tools` collection record with centralized facts, source fields, scoring, price history, last verified dates, and CTA metadata. No schema changes. Because Gemini Omni pricing and API rollout are volatile, the page should state the official Gemini/Flow/YouTube distribution and Google AI plan access while avoiding unsupported standalone per-video API rates.

### 7. SEO impact

The new page gets a unique title, meta description, canonical route via existing Astro page generation, SoftwareApplication structured data, source-backed visible content, internal links from related Google/video pages, and inclusion in generated search/sitemap/LLM inventories.

### 8. Conversion impact

No affiliate program is used. The primary CTA routes to Google's official Gemini Omni / Gemini surface. Buyer guidance should recommend starting in Gemini or Flow, upgrading only when account limits justify it, and using Veo/Vertex/Runway alternatives when a different buying route is safer.

### 9. Mobile UX impact

The existing tool layout should surface the trust strip, score, pricing, verdict, best plan, primary CTA, and watch-out on the first mobile screen. QA should cover 360, 390, 430, 768, and desktop 1024+ widths for the new page and affected parent surfaces.

### 10. Implementation steps

1. Verify Gemini Omni facts against current May 2026 official sources.
2. Add `src/content/tools/gemini-omni.md` with complete frontmatter and buyer-focused body copy.
3. Add/verify `public/logos/tools/gemini-omni.png` and regenerate `src/data/logo-manifest.json`.
4. Refresh AI video category and related Gemini/Veo/Imagen pages with internal links and current watch-outs.
5. Generate the Gemini Omni OG asset and restore unrelated generated churn.
6. Regenerate `PAGE_REFRESH_LEDGER.md`.
7. Run logo/content/link/ledger/build checks and browser/mobile QA.

### 11. Verification commands

`node scripts/generate-logo-manifest.mjs`, `node scripts/audit-tool-logos.mjs`, `node scripts/generate-og-svgs.mjs`, `node scripts/optimize-og-images.mjs`, `npm run ledger:pages`, `npm run check:links`, `npm run ledger:pages:check`, `npm run check:news`, `npm run test:scripts`, `npm run build:fast`, and browser QA for `/tools/gemini-omni/`, `/categories/ai-video/`, and related Google tool pages at 360, 390, 430, 768, and 1024 px.

### 12. Acceptance criteria

`/tools/gemini-omni/` exists, builds, renders with a proper logo, has current official sources, avoids unsupported pricing/API claims, and gives a clear buy/skip/alternative decision. Affected parent and related pages are current, internally linked, and ledgered. Logo audit, link checks, ledger check, script tests, build, and mobile QA pass or any unrelated failures are documented.

### 13. Risks and mitigations

Gemini Omni facts are new and volatile; use official Google/DeepMind pages and visible caveats for rollout, plan, geography, and API availability. Google plan pages can hide regional prices; avoid quoting unverified AI Plus amounts and rely on the May 19 subscription blog for the $100/$200 Ultra facts. Generated OG scripts may touch many existing files; restore unrelated churn before finishing.

### 14. Progress log

2026-05-20: Plan created after source verification and repo inspection. Official sources confirm Gemini Omni / Gemini Omni Flash launched May 19, 2026 as a video-first multimodal creation/editing model for Gemini, Flow, Flow Music, and YouTube, with Google AI Plus/Pro/Ultra consumer access and API/developer evaluations promised later.
2026-05-20: Added `src/content/tools/gemini-omni.md`, reused the Gemini logo under the new slug, added the new tool to the legacy OG registry, generated `public/og/tools/gemini-omni.png`, refreshed the AI video category and Gemini/Veo/Imagen cross-links, updated tool/category/LLM top-layer refresh markers, regenerated `PAGE_REFRESH_LEDGER.md`, and verified local rendering.

### 15. Final report

Completed on 2026-05-20.

Published `/tools/gemini-omni/` as a source-backed Google DeepMind AI video tool page with decision-first verdict, best plan guidance, pricing caveats, API caveats, provenance notes, comparison guidance, failure modes, FAQ, and official sources. Refreshed affected parent and related surfaces: `/tools/`, `/categories/`, `/categories/ai-video/`, `/tools/gemini/`, `/tools/veo/`, `/tools/imagen/`, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md`.

Verification passed: `node scripts/generate-logo-manifest.mjs`, `node scripts/audit-tool-logos.mjs`, `node scripts/generate-og-svgs.mjs`, `node scripts/optimize-og-images.mjs` with unrelated tracked OG churn restored, `npm run ledger:pages`, `node scripts/guard-content.mjs`, `node scripts/guard-stale-facts.mjs`, `npm run check:links`, `npm run ledger:pages:check`, `npm run check:news`, `npm run test:scripts`, `npm run build:fast`, in-app browser QA for `http://127.0.0.1:8091/tools/gemini-omni/`, and Playwright viewport QA at 360, 390, 430, 768, and 1024 px for Gemini Omni plus the affected parent/Google tool pages. `npm run check` passed all content/link/news gates and failed only at the existing moderate `ws` advisory inherited through Cloudflare/Wrangler.

---

## ExecPlan: May 20-21 2026 News Refresh

### 1. Objective

Publish source-backed AiPedia news coverage for AI and AI-tool developments discovered after the May 18-19 refresh, through the actual current date of 2026-05-21. The goal is editorial freshness, trust, organic reach, and useful buyer context for affected tool pages.

### 2. Current state

`src/content/news/` currently has verified news through May 19, 2026, with latest pages covering Google I/O, Anthropic/KPMG, GitHub Copilot Gemini 3.5 Flash, Google Antigravity, and OpenAI/Google provenance. `/news/`, RSS, and LLM manifest comments are refreshed to 2026-05-20. `scripts/audit-news-xrefs.mjs` enforces links from affected tool pages to recent news records that declare `affects`.

### 3. Target state

Add non-duplicate May 19-20 news records for the high-impact stories not already covered: Claude Managed Agents self-hosted sandboxes and MCP tunnels, Andrej Karpathy joining Anthropic, OpenAI's AI-discovered discrete geometry proof, OpenAI's Singapore and Education for Countries expansion, Google Marketing Live 2026's Gemini-powered ad/commerce tools, and Apple Intelligence accessibility updates. Each article should have current sources, cautious rollout language, and practical buyer/operator context.

### 4. Scope

Included: new news markdown, affected tool-page recent-change cross-links, `/news/` refresh metadata, RSS/LLM crawl-surface refresh metadata, generated OG news artwork, ledger regeneration, and validation/build/mobile checks. Excluded: new tool records, logo sourcing, affiliate changes, broad template redesign, and thin re-coverage of Google I/O announcements already published on May 19.

Affected top-layer pages and surfaces: `/news/`, `/tools/claude/`, `/tools/claude-code/`, `/tools/chatgpt/`, `/tools/gemini/`, `/news/rss.xml`, `/llms.txt`, `/llms-full.txt`, sitemap/build-generated surfaces, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/news/*.md`, `src/content/tools/claude.md`, `src/content/tools/claude-code.md`, `src/content/tools/chatgpt.md`, `src/content/tools/gemini.md`, `src/pages/news/index.astro`, `src/pages/news/rss.xml.ts`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, generated files under `public/og/news/`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. New news records must conform to the existing frontmatter. Tool pages updated with `last_updated` and `last_verified` set to 2026-05-21 where current facts or cross-links change.

### 7. SEO impact

New indexable news pages get unique titles, summaries, canonical route generation, article metadata, source lists, OG images, and internal links to affected tool/category pages. `/news/`, RSS, and LLM surfaces should reflect the May 21 refresh.

### 8. Conversion impact

No new affiliate CTAs. Articles route users to relevant tool pages while keeping buyer guidance commercial-neutral and source-backed.

### 9. Mobile UX impact

News pages reuse the existing article layout. QA should cover `/news/`, all new article pages, and affected tool pages at 360, 390, 430, 768, and 1024 widths for overflow and image rendering.

### 10. Implementation steps

1. Verify May 19-21 AI/tool stories against current May 2026 sources.
2. Add only high-confidence, non-duplicate news records.
3. Update affected tool pages with recent-change links and verification dates.
4. Refresh top-layer/crawl-surface metadata comments.
5. Generate news OG artwork and restore unrelated generated churn.
6. Regenerate `PAGE_REFRESH_LEDGER.md`.
7. Run xref/link/ledger/tests/build checks and mobile QA.

### 11. Verification commands

`npm run check:news`, `npm run check:links`, `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, image metadata QA, and focused Playwright/browser QA for `/news/`, new article pages, and affected tool pages at 360, 390, 430, 768, and 1024 px.

### 12. Acceptance criteria

Every new article has dated source-backed frontmatter, at least one current source, no duplicate existing coverage, and practical decision guidance. Every article with `affects` has a corresponding affected tool-page link. `/news/`, RSS, and LLM surfaces are marked refreshed. Ledger and news xref checks pass, with any unrelated failures documented.

### 13. Risks and mitigations

Google I/O and Google Marketing Live can produce overlapping product claims; separate the advertising/commerce buyer signal from the already-published Gemini/Search/Antigravity articles. Talent-move coverage can become gossip; keep Karpathy coverage focused on Anthropic pretraining strategy and source it to named reporting. Avoid overclaiming OpenAI's research proof as a shipped ChatGPT capability.

### 14. Progress log

2026-05-21: Plan created after repo inspection. Local news files stop at May 19; current-source verification identified six non-duplicate stories for publication or tool-page cross-linking.
2026-05-21: Added six source-backed news records, refreshed affected Claude/Claude Code/ChatGPT/Gemini tool recent-change sections, updated news/RSS/LLM top-layer metadata, generated the six new article OG image sets, regenerated the page ledger, and completed static mobile QA.

### 15. Final report

Completed on 2026-05-21.

Published six source-backed AiPedia news articles covering Claude Managed Agents self-hosted sandboxes and MCP tunnels, Andrej Karpathy joining Anthropic, OpenAI's AI-discovered discrete geometry proof, OpenAI Singapore and Education for Countries, Google Marketing Live 2026 Gemini ads/commerce agents, and Apple Intelligence accessibility updates. Refreshed affected surfaces: `/news/`, `/tools/claude/`, `/tools/claude-code/`, `/tools/chatgpt/`, `/tools/gemini/`, `/news/rss.xml`, `/llms.txt`, `/llms-full.txt`, generated OG news assets, and `PAGE_REFRESH_LEDGER.md`.

Verification passed: `npm run check:news`, `npm run check:links`, `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run test:scripts`, `npm run build:fast`, image metadata QA for all 24 generated assets, and static Playwright QA for `/news/`, all six new article pages, and four affected tool pages at 360, 390, 430, 768, and 1024 px. `npm run check` failed only at the existing moderate `ws` advisory inherited through Cloudflare/Wrangler; no forced dependency downgrade or breaking `wrangler` change was made as part of this editorial refresh.

---

## ExecPlan: May 22 2026 News Refresh

### 1. Objective

Publish source-backed AiPedia news articles for verified AI and AI-tool developments since the last May 21 refresh, carrying coverage through May 22, 2026. The goal is fresher organic coverage, stronger trust signals, and better tool-page recirculation for buyers tracking AI model, agent, compliance, enterprise, and compute-market changes.

### 2. Current state

`src/content/news/` is current through May 20, 2026 articles covering Google Marketing Live, OpenAI discrete geometry research, and OpenAI education/country expansion. The `/news/` archive, RSS feed, `llms.txt`, and `llms-full.txt` are generated from site content but include explicit refresh metadata comments. Tool pages for Codex, ChatGPT, Claude, Claude Code, Gemini, and GitHub Copilot contain recent-development sections that must link back to any new article listed in `affects`.

### 3. Target state

The news section includes non-duplicate, current-source May 20-21 articles for OpenAI/Codex, ChatGPT healthcare, Claude compliance and security, Gemini/ADK/Home, GitHub Copilot, Microsoft/EY enterprise AI execution, and frontier AI capital/compute market pressure. Affected tool pages carry visible May 22 verification dates and top recent-development links. Parent/top-layer surfaces remain current and the ledger records the refresh.

### 4. Scope

Included: new news Markdown records, affected tool-page recent-development updates, `/news/` archive metadata, RSS metadata, LLM surface metadata, generated news artwork, page refresh ledger regeneration, content checks, build, and mobile QA. Excluded: new tool records, logo work, pricing model changes unless directly verified, affiliate CTA changes, and speculative/unverified claims.

Affected top-layer pages and surfaces: `/news/`, `/tools/codex/`, `/tools/chatgpt/`, `/tools/claude/`, `/tools/claude-code/`, `/tools/gemini/`, `/tools/github-copilot/`, RSS, sitemap/build-generated pages, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/news/*.md`, `src/content/tools/codex.md`, `src/content/tools/chatgpt.md`, `src/content/tools/claude.md`, `src/content/tools/claude-code.md`, `src/content/tools/gemini.md`, `src/content/tools/github-copilot.md`, `src/pages/news/index.astro`, `src/pages/news/rss.xml.ts`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, `public/og/news/*`, and this plan.

### 6. Data model impact

No schema changes. New news records must follow the existing collection frontmatter, use current source URLs, and set `last_verified: 2026-05-22`.

### 7. SEO impact

Each new article gets a unique title, date, summary, canonical route from the existing news template, source list, and internal links to affected tools. `/news/`, RSS, and LLM surfaces should reflect the refresh.

### 8. Conversion impact

No new affiliate CTAs are planned. Articles route users to relevant tool pages and comparisons without overstating commercial recommendations.

### 9. Mobile UX impact

Articles reuse the existing responsive news layout. Verify `/news/`, each new article, and affected tool pages at 360, 390, 430, 768, and desktop widths for no horizontal overflow, broken images, or missing primary content.

### 10. Implementation steps

1. Verify source set using May 2026 searches and primary/current reporting.
2. Add article files with source-backed buyer analysis and cautious language for reported financial stories.
3. Refresh affected tool-page frontmatter and recent-development sections.
4. Refresh `/news/`, RSS, and LLM metadata comments.
5. Generate article artwork and regenerate the page ledger.
6. Run news/link/ledger/script checks, fast build, and mobile QA.

### 11. Verification commands

`npm run check:news`, `npm run check:links`, `node scripts/generate-og-news.mjs`, `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run test:scripts`, `npm run build:fast`, `npm run check`, and Playwright/static mobile QA at 360, 390, 430, 768, and 1024px.

### 12. Acceptance criteria

New articles are non-duplicate, source-backed, dated accurately, and have `last_verified: 2026-05-22`. Every article with `affects` is linked from its affected tool page. Parent/news surfaces and LLM/RSS metadata are current. Ledger checks pass. Build and mobile QA pass or failures are clearly documented.

### 13. Risks and mitigations

Reported IPO, profitability, and compute claims can be volatile; label them as reported and cite named outlets rather than presenting them as vendor-confirmed facts. Avoid touching unrelated untracked local files. Keep tool-page claims surface-specific where vendor updates apply only to web, IDE, or enterprise products.

### 14. Progress log

2026-05-22: Plan created after source verification. Baseline news stops at May 20, 2026. Starting content edits for the May 22 refresh.
2026-05-22: Added seven source-backed news records, refreshed affected Codex/ChatGPT/Claude/Claude Code/Gemini/GitHub Copilot pages, refreshed `/news/`, RSS, and LLM metadata, generated 28 new article image assets, regenerated the page ledger, and completed validation/build/mobile QA.

### 15. Final report

Completed on 2026-05-22.

Published seven source-backed AiPedia news articles covering frontier AI capital pressure, Codex AppShots/Goal Mode/locked computer use, AdventHealth ChatGPT healthcare rollout, Claude Compliance API and Opus cybersecurity partners, Gemini ADK/Android/Home infrastructure, GitHub Copilot semantic search/auto routing/Eclipse/web model cleanup, and Microsoft/EY's $1B+ enterprise AI accelerator. Refreshed affected surfaces: `/news/`, `/tools/codex/`, `/tools/chatgpt/`, `/tools/claude/`, `/tools/claude-code/`, `/tools/gemini/`, `/tools/github-copilot/`, `/news/rss.xml`, `/llms.txt`, `/llms-full.txt`, generated OG news assets, and `PAGE_REFRESH_LEDGER.md`.

Verification passed: `npm run check:news`, `npm run check:links`, `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run test:scripts`, `npm run build:fast`, `git diff --check`, image metadata QA for all 28 generated assets, and static Playwright QA for `/news/`, all seven new article pages, and six affected tool pages at 360, 390, 430, 768, and 1024 px. `npm run check` passed guard/link/news gates and failed only at the existing moderate `ws` advisory inherited through Cloudflare/Wrangler.
