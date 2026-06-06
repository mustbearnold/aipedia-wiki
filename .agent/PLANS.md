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

## ExecPlan: June 1 2026 God-Tier Full-Site Refresh Ultraplan

### 1. Objective

Refresh every eligible AiPedia public page from oldest to newest as of **June 1, 2026**, raising each page to a god-tier 10/10 standard for trust, source quality, buyer usefulness, mobile UX, SEO, conversion clarity, and maintainability. The refresh must preserve AiPedia's mission: help users decide what AI tool to use, what plan to buy, what to avoid, and what alternative is better.

### 2. Current state

`PAGE_REFRESH_LEDGER.md` is current after `npm run ledger:pages:check` on 2026-06-01. The ledger tracks **738** public pages and crawl surfaces. Individual news article URLs are intentionally excluded from the ledger. The eligible refresh queue excludes dead tool archive pages, active tool records with `status: dead`, and individual news article pages, leaving **725** eligible rows.

Excluded from this refresh program:

- 9 dead/dead-archive rows, including `/dead/` surfaces and `/dead/*` pages.
- 4 active tool-collection records marked `status: dead`: `/tools/phind/`, `/tools/tome/`, `/tools/dalle/`, and `/tools/grok-code-fast/`.
- Individual `/news/YYYY-MM-DD.../` article pages. `/news/`, `/news/rss.xml`, `/llms.txt`, `/llms-full.txt`, and sitemap surfaces remain dependent top-layer/crawl surfaces and must be updated when affected.

Eligible page inventory by type:

- 256 Tool pages
- 267 Comparison pages
- 110 Guide pages
- 40 Static pages
- 15 Category pages
- 14 Workflow pages
- 12 Trend pages
- 5 Company pages
- 5 Crawl surfaces
- 1 Report

Eligible backlog by ledger date:

- 2026-05-08: 3 pages
- 2026-05-09: 6 pages
- 2026-05-10: 3 pages
- 2026-05-12: 4 pages
- 2026-05-13: 577 pages
- 2026-05-14: 19 pages
- 2026-05-15: 4 pages
- 2026-05-17: 19 pages
- 2026-05-20: 5 pages
- 2026-05-22: 2 pages
- 2026-05-23: 1 page
- 2026-05-24: 19 pages
- 2026-05-26: 29 pages
- 2026-05-27: 6 pages
- 2026-05-28: 16 pages
- 2026-05-29: 3 pages
- 2026-05-31: 9 pages

The oldest eligible pages are `/about/editorial/`, `/admin/reviews/`, and `/tool-finder/` (2026-05-08), followed by the six `/answers/*-2026/` pages dated 2026-05-09.

There are unrelated untracked local files (`.tmp-*`, `.refresh-queue.json`, and `affiliate-applications.xlsx`) that must remain untouched unless the user separately asks for them.

### 3. Target state

Every eligible page is refreshed and verified as of June 1, 2026 or later. Each refreshed page has:

- current source-backed facts, pricing, model, availability, and plan guidance where applicable;
- updated `last_updated`, `last_verified`, visible verification language, sources, and change history when meaningful;
- a strong mobile-first opening screen that answers the page-quality questions quickly;
- decision-first structure: verdict, best for, not ideal for, best plan, watch-outs, alternatives, and next click;
- honest affiliate/commercial context and tracked CTAs where the page has commercial intent;
- refreshed parent hubs, archive pages, navigation surfaces, sitemap/LLM surfaces, and internal-link blocks when the child refresh changes what they summarize;
- passing ledger, link, content, guard, build, and mobile QA gates.

### 4. Scope

Included:

- Active, non-dead tool pages in `src/content/tools/`
- Category hubs in `src/content/categories/`
- Comparisons in `src/content/comparisons/`
- Guides in `src/content/use-cases/`
- Workflows in `src/content/workflows/`
- Trends in `src/content/trends/`
- Company pages in `src/content/companies/`
- Static public pages in `src/pages/`
- Crawl surfaces: `/robots.txt`, `/sitemap-index.xml` generated by build, `/llms.txt`, `/llms-full.txt`, `/news/rss.xml`, and dependent route surfaces where represented in the ledger
- Parent hubs and top-layer pages affected by refreshed children: `/`, `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/workflows/`, `/trends/`, `/answers/`, `/explore/`, `/news/`, `/companies/`, LLM files, RSS, sitemap, internal-link blocks, and relevant category/guide/comparison archives

Excluded:

- Dead tool pages, active tool records marked `status: dead`, and dead archive pages under `/dead/`
- Individual news article pages under `/news/YYYY-MM-DD.../`
- Placeholder net-new tool records unless the refresh discovers a required catalog gap and the user approves widening scope
- Unrelated repo cleanup, temp files, spreadsheets, or generated logs

### 5. Files likely affected

Primary content:

- `src/content/tools/*.md`
- `src/content/categories/*.md`
- `src/content/comparisons/*.md`
- `src/content/use-cases/*.md`
- `src/content/workflows/*.md`
- `src/content/trends/*.md`
- `src/content/companies/*.md`
- `src/content/reports/*.md`

Top-layer/static/crawl surfaces:

- `src/pages/index.astro`
- `src/pages/tools/index.astro`
- `src/pages/categories/index.astro`
- `src/pages/compare/index.astro`
- `src/pages/guides/index.astro`
- `src/pages/workflows/index.astro`
- `src/pages/trends/index.astro`
- `src/pages/answers/*.astro`
- `src/pages/explore.astro`
- `src/pages/news/index.astro`
- `src/pages/news/rss.xml.ts`
- `src/pages/llms.txt.ts`
- `src/pages/llms-full.txt.ts`
- `public/robots.txt` when required
- `PAGE_REFRESH_LEDGER.md`

Generated/manifest assets when touched:

- `src/data/logo-manifest.json`
- `public/logos/tools/*`
- `public/og/*` if page-specific social assets are generated by existing scripts

Planning and queue artifacts:

- `.agent/PLANS.md`
- Optional refresh batch notes under `.agent/` if a later pass needs a durable queue snapshot

### 6. Data model impact

No schema migration is planned up front. Refreshes should stay within existing content frontmatter and structured data fields unless a repeated gap proves a model change is needed.

For tool pages, verify and update existing fields such as `pricing_model`, `price_range`, `free_tier`, `best_plan`, `score`, sub-scores, verdict, best-for, not-ideal-for, watch-out, alternatives, sources, affiliate metadata, CTA config, `last_updated`, `last_verified`, and change history.

For comparisons and guides, verify that recommendation logic uses current tool facts rather than stale embedded claims. If a comparison relies on two stale tool pages, refresh both tools first within the same date bucket before refreshing the comparison.

For category hubs, refresh only after relevant child tools/comparisons/guides in that bucket are current enough to support the hub's rankings and buyer paths.

### 7. SEO impact

Every refreshed indexable page must preserve or improve:

- unique title and meta description;
- canonical URL;
- clean heading hierarchy;
- source-backed primary content;
- useful internal links to relevant tools, categories, comparisons, guides, workflows, and news hubs;
- relevant schema emitted by existing templates;
- crawlable mobile content;
- no hidden critical content that requires JavaScript-only interaction.

The refresh should reduce stale SERP snippets by updating visible June 2026 language where appropriate. Do not create thin pages or refresh dates without material verification.

### 8. Conversion impact

Commercial pages must keep trust above conversion. Every refreshed affiliate/commercial CTA must have:

- user-benefit label;
- correct tool slug and page type in tracking payload;
- placement identifier;
- disclosure near the decision point;
- fallback official URL when affiliate data is unavailable;
- honest plan guidance, including who should not buy.

High-value commercial surfaces get priority inside same-date/page-type batches: active tools, "best AI for..." guides, comparison pages with purchase intent, and category hubs.

### 9. Mobile UX impact

All refreshed page types must be checked at 360, 390, 430, 768, and desktop 1024+ widths. Mobile must not hide important buyer content. Use existing accordions, stacked cards, summaries, and progressive disclosure instead of wide tables.

Tool page first mobile screen must include the trust strip, tool name/category/score/price range, one-sentence verdict, best plan, CTA, disclosure near CTA when commercial, and the main watch-out.

Comparison page first mobile screen must include winner for most people, winner by use case, primary CTA for the recommended winner, and path to the full comparison.

Category page first mobile screen must include best overall, best free/budget, best pro/team, and clear quick paths.

### 10. Implementation steps

#### Phase 0: Refresh System Setup

1. Confirm `PAGE_REFRESH_LEDGER.md` is current with `npm run ledger:pages:check`.
2. Generate a working queue from the ledger sorted by `last_updated` ascending.
3. Filter out rows where `type === "Dead tool archive"` or `page` starts with `/dead/`.
4. Filter out active tool rows whose source frontmatter has `status: dead`.
5. Filter out individual news article URLs matching `/news/YYYY-MM-DD.../`.
6. Preserve top-layer `/news/`, RSS, LLM, sitemap, homepage, and archive surfaces as dependent update targets.
7. For every volatile source lookup, include `June 2026` in the query.
8. Before editing each batch, inspect relevant templates, data models, related pages, and parent hubs.

#### Phase 1: Oldest Static/Answer Batch, May 8-May 12

Refresh the first 16 eligible rows before the May 13 plateau:

1. `/about/editorial/`
2. `/admin/reviews/`
3. `/tool-finder/`
4. `/answers/best-ai-coding-tool-2026/`
5. `/answers/best-ai-for-writing-2026/`
6. `/answers/best-ai-image-generator-2026/`
7. `/answers/best-ai-voice-generator-2026/`
8. `/answers/best-free-ai-tools-2026/`
9. `/answers/chatgpt-alternatives-2026/`
10. `/privacy/`
11. `/robots.txt`
12. `/terms/`
13. `/companies/`
14. `/demo-godtier/`
15. `/glossary/`
16. `/reports/`

Batch rule: static/noindex/redirect pages can receive a lightweight but real June 1 maintenance review; answer pages need fresh June 2026 source checks before updating recommendations. Update directly affected top-layer pages such as `/answers/`, `/companies/`, and crawl/LLM surfaces before moving to Phase 2.

#### Phase 2: May 13 Mega-Batch, Dependency-Aware

May 13 has 577 eligible rows. Keep the date bucket intact, but process internally by dependency:

1. Active non-dead tool pages from May 13: 201 pages.
2. Company pages from May 13: 2 pages.
3. Category page from May 13: 1 page, after its child tools.
4. Comparisons from May 13: 263 pages, only after both compared tools are fresh or explicitly reverified.
5. Guides from May 13: 87 pages, after their recommended tools/comparisons are fresh.
6. Workflows from May 13: 5 pages, after their stack tools are fresh.
7. Trends from May 13: 12 pages, after related tools/guides are fresh.
8. Report/static pages from May 13: 6 pages.

Sub-batch size: 10-20 pages for tool/comparison work, 5-10 pages for guide/category/top-layer work. Each sub-batch must update all directly affected parent surfaces before being considered done.

#### Phase 3: May 14-May 24 Middle Backlog

Process dates in order:

- 2026-05-14: 19 pages
- 2026-05-15: 4 pages
- 2026-05-17: 19 pages
- 2026-05-20: 5 pages
- 2026-05-22: 2 pages
- 2026-05-23: 1 page
- 2026-05-24: 19 pages

Within each date, use the same dependency order: tools and companies first, comparisons/guides/workflows/trends next, parent/static/crawl surfaces last.

#### Phase 4: May 26-May 31 Recent Backlog

Process dates in order:

- 2026-05-26: 29 pages
- 2026-05-27: 6 pages
- 2026-05-28: 16 pages
- 2026-05-29: 3 pages
- 2026-05-31: 9 pages

These are fresher, so avoid pointless date churn. Only update pages when there is material verification, improved buyer guidance, or a dependency from refreshed children.

#### Phase 5: Top-Layer Reconciliation

After all eligible pages are refreshed:

1. Reconcile homepage modules, `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/workflows/`, `/trends/`, `/answers/`, `/explore/`, `/companies/`, and `/news/`.
2. Rebuild or refresh any stale "best overall", "best free", "best pro/team", "alternatives", "latest news", and internal-link modules.
3. Regenerate `PAGE_REFRESH_LEDGER.md`.
4. Verify LLM and sitemap surfaces reflect the refreshed state.
5. Run full QA and document remaining risks.

### 11. Verification commands

Run at the end of every sub-batch:

- `npm run ledger:pages`
- `npm run ledger:pages:check`
- `npm run check:links`
- `npm run check:news`
- `git diff --check`

Run after every material batch:

- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- targeted Playwright/mobile QA for every touched page type at 360, 390, 430, 768, and 1024px

Run before any commit/push:

- `git status --short`
- `git diff --stat`
- `npm run ledger:pages:check`
- `npm run check`
- `npm run build:fast`

If a batch touches logos or new tool records:

- regenerate `src/data/logo-manifest.json` using the repo's existing logo workflow;
- run `npm run guard:check`;
- verify logo render on tool and parent/listing surfaces.

### 12. Acceptance criteria

The full refresh is complete only when:

- all 725 eligible ledger rows have been materially refreshed or explicitly reverified on or after 2026-06-01;
- dead tool pages and individual news article pages remain excluded;
- every refreshed page has current source-backed facts and visible verification metadata where relevant;
- no parent hub, archive, internal-link block, sitemap, RSS, or LLM surface is stale relative to refreshed child pages;
- mobile QA passes for affected page types at 360, 390, 430, 768, and desktop widths;
- `PAGE_REFRESH_LEDGER.md` is current and no row has a misleading `working tree` date source after commit;
- `npm run check`, `npm run build:fast`, `npm run test:scripts`, `npm run check:links`, `npm run check:news`, `npm run ledger:pages:check`, and `git diff --check` pass or any unrelated failures are documented with evidence.

### 13. Risks and mitigations

- **Risk: refreshing parent hubs before child facts are current.** Mitigation: within the same ledger date, refresh tools/companies first, then comparisons/guides/workflows/trends, then hubs/static/crawl surfaces.
- **Risk: fake freshness.** Mitigation: update dates only after real verification or material improvement. Every volatile search includes `June 2026`.
- **Risk: source drift and SEO regressions.** Mitigation: use primary/vendor sources where possible, keep source fields visible, and run link/schema/build checks.
- **Risk: broad batch fatigue.** Mitigation: keep sub-batches small enough to verify, commit cleanly, and update this plan's progress log after each batch.
- **Risk: unrelated local files leaking into commits.** Mitigation: stage explicit paths only; leave `.tmp-*`, `.refresh-queue.json`, and `affiliate-applications.xlsx` untouched.
- **Risk: old comparisons contradict newly refreshed tools.** Mitigation: after each tool cluster, identify and refresh comparisons and guides that depend on those tools.

### 14. Progress log

2026-06-01: Created the full-site refresh ultraplan after confirming `PAGE_REFRESH_LEDGER.md` is current. Initial queue was 729 rows after excluding dead archive pages and individual news article pages.

2026-06-01: Corrected the queue to also exclude active tool records marked `status: dead` (`phind`, `tome`, `dalle`, `grok-code-fast`) per the user's no-dead-tool-pages rule. Current eligible queue is 725 rows; oldest eligible rows now begin with `/about/editorial/`, `/admin/reviews/`, and `/tool-finder/` from 2026-05-08. The largest backlog is 577 rows dated 2026-05-13.

2026-06-01: Completed the first oldest-to-newest refresh batch plus directly affected parent/crawl surfaces. Refreshed 20 ledger rows to June 1: `/about/`, `/about/editorial/`, `/admin/reviews/`, `/answers/`, six oldest answer pages, `/companies/`, `/demo-godtier/`, `/glossary/`, `/llms.txt`, `/llms-full.txt`, `/privacy/`, `/reports/`, `/robots.txt`, `/terms/`, and `/tool-finder/`. Verified current June 2026 volatile facts against vendor/current sources for Claude Opus 4.8, Claude Code dynamic workflows, Cursor pricing, GitHub Copilot AI Credits, ChatGPT GPT-5.5, ChatGPT Images 2.0 / GPT Image 2, Midjourney, Ideogram, Adobe Firefly, ElevenLabs, Cartesia, Fish Audio, Speechify, Gemini, NotebookLM, Perplexity, and Grammarly. Ran `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:links`, `npm run check:news`, `npm run test:scripts`, `npm run build:fast`, `npm run check`, and Playwright static/mobile QA at 360, 390, 430, 768, and 1024 px over the refreshed route set; all passed.

2026-06-01: Began Phase 2 of the May 13 mega-batch with a dependency-aware AI coding tool slice. Refreshed Aider, Amazon Q Developer, Augment Code, Cline, Codeium/Windsurf migration, CodeRabbit, Sourcegraph Cody, Continue, and Devin against June 2026 vendor/current sources; updated the AI Coding category hub, `/tools/`, `/categories/`, and LLM manifests so parent/crawl surfaces do not lag behind the refreshed child pages. Removed unsupported exact backing-model claims from Devin, corrected Codeium/Windsurf ownership timing to the July 2025 Cognition announcement, and added June 1 price-history entries instead of overwriting May snapshots.

2026-06-01: Continued the Phase 2 AI coding slice from oldest to newest. Refreshed Factory, JetBrains AI, Kiro, Mastra, OpenHands, Pieces, Qodo, Replit Agent, Same.dev, Supermaven, Tabnine, Val Town, Windsurf, and Zed against June 2026 primary/vendor sources. Corrected Val Town's current Pro/Business pricing, Same.dev token tiers, Supermaven's Pro-only 1M-context positioning, Tabnine's two annual paid platforms, Windsurf's usage/model-selector caveats, Zed's pricing and hosted-model billing, JetBrains AI credit packaging, Kiro's expired May promo, Mastra's Starter observability allowance, OpenHands' SaaS/BYOK framing, Pieces' conflicting public/docs pricing surfaces, Qodo pricing, and Replit Agent Core/Pro credit packaging. Updated the AI Coding category hub, `/tools/`, `/categories/`, and both LLM manifests before regenerating the ledger.

2026-06-01: Verification for the second AI coding slice passed: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:links`, `npm run check:news`, `npm run test:scripts`, `npm run build:fast`, `npm run check`, and static/mobile Playwright QA over 17 refreshed/parent routes at 360, 390, 430, 768, and 1024 px plus `/llms.txt` and `/llms-full.txt`.

2026-06-02: Continued the oldest-to-newest active-tool refresh after excluding dead tool records from the queue. Refreshed Eightfold AI, ElevenLabs, Elicit, Exa, fal.ai, Fathom, Figma, Fireflies, Fireworks AI, and Fish Audio against current June 2026 vendor/current sources. Corrected ElevenLabs' May PAYG API/Agents update, Fathom bot-free Mac beta and Account-Wide Ask Fathom limits, Fireflies shared AI-credit pool, Figma Make model-selector language including GPT-5.5, Exa's API pricing surface and add-on costs, fal successful-output/prepaid-credit billing, Fireworks B200/B300 and cached/batch discount pricing, Fish Audio UTF-8-byte API units, and Eightfold's TalentForge/360 Interview/Workforce Readiness positioning. Updated affected AI Voice, AI Notes, AI Research, AI Search, AI Infrastructure, AI Design, AI Automation, AI Chatbots, AI Image, `/tools/`, `/categories/`, homepage, and LLM manifest surfaces before regenerating the ledger.

2026-06-02: Verification for the Eightfold through Fish Audio slice passed: `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run audit:sources`, `npm run audit:provenance -- --json`, `git diff --check`, `npm run check:links`, `npm run check:news`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA over 22 HTML routes at 360, 390, 430, 768, and 1024 px plus `/llms.txt` and `/llms-full.txt`. The provenance audit remains report-only and still lists pre-existing CloudTalk, MeetGeek, Claude, Lindy, Ada, AssemblyAI, Gemini Omni, and Pieces migration debt outside this slice.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Fish Audio voice slice, skipping dead tool rows, dead-tool comparisons, and individual news articles, and selecting the next live Flux image comparison cluster: `/compare/flux-vs-freepik/`, `/compare/flux-vs-ideogram/`, and `/compare/flux-vs-stable-diffusion/`. Verified June 5 facts from official Black Forest Labs FLUX.2 pricing/model docs, Freepik plans/pricing docs, Ideogram pricing and available-plan docs, Midjourney plan/version docs, and Stability API/license sources. Rebuilt the Flux comparisons and the related Freepik/Stable Diffusion/Midjourney image comparisons surfaced by QA: `/compare/adobe-firefly-vs-freepik/`, `/compare/freepik-vs-ideogram/`, `/compare/freepik-vs-midjourney/`, `/compare/freepik-vs-stable-diffusion/`, `/compare/ideogram-vs-stable-diffusion/`, and `/compare/midjourney-vs-stable-diffusion/`. Refreshed Flux, Freepik, Ideogram, Stable Diffusion, AI Image, AI Design, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 21 refreshed/top-layer routes at 360, 390, 430, 768, 1024, and 1366 px. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed HyperWrite comparison slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live AI Image comparison rows: `/compare/ideogram-vs-midjourney/` and `/compare/midjourney-vs-flux/`. Verified June 5 facts from official Ideogram 3.0/pricing/API docs, Midjourney plan/version/commercial-use docs, and BFL FLUX.2 pricing/model sources. Rebuilt the comparisons around Ideogram's text-in-image production lane, Midjourney's aesthetic hosted creative workflow, and Flux's API/open-weight model stack. Refreshed AI Image, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, stale-marker `rg` for the refreshed comparisons, `npm run check:news`, `npm run audit:sources`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 12 refreshed/top-layer/context routes at 360, 390, 430, 768, 1024, and 1366 px plus rendered `/llms.txt` and `/llms-full.txt` checks. The in-app browser handle did not expose the expected documentation method, so local Playwright was used against the built static site; local Vercel Speed Insights script 404s were observed without page/layout failures. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the automation slice, skipping dead Phind/dead-tool rows, dead-tool comparison surfaces, and individual news articles. Selected the next live AI Search comparison cluster: `/compare/kagi-vs-perplexity/`, `/compare/kagi-vs-you-com/`, and `/compare/perplexity-vs-you-com/`. Verified June 6 facts from official Kagi pricing/Assistant/Research docs, Perplexity Pro/Enterprise/Max/API docs, and You.com pricing/API docs. Rebuilt the comparisons around private paid search, cited answer/research workflows, and API-first grounding/research stacks. Refreshed Kagi, Perplexity, You.com, AI Search, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Passing commands: explicit `AIPEDIA_LEDGER_DATE=2026-06-06 npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, stale-marker `rg`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, in-app browser smoke for `/compare/kagi-vs-perplexity/`, and local-HTTP Playwright QA for 11 refreshed/top-layer HTML routes at 360, 390, 430, 768, 1024, and 1366 px plus `/llms.txt` and `/llms-full.txt`. No dead tool pages or individual news article pages were edited.

### 15. Final report

Pending. Future final report must include refreshed page count, date range completed, changed files, top-layer surfaces updated, verification commands/results, unresolved risks, and next recommended batch if the refresh is not fully complete in one session.

---

## ExecPlan: May 30-31 2026 AI News Catch-Up

### 1. Objective

Cover the missed May 30 and May 31, 2026 AI tools and AI industry news with source-backed, decision-oriented `/news/` articles. This supports AiPedia freshness, trust, organic rankings, editorial scalability, and buyer decision quality without publishing thin or speculative weekend filler.

### 2. Current state

`src/content/news/` has May 2026 coverage through May 29. There are no May 30 or May 31 records, so the news audit would fail if today's date is added without at least two stories for each missed day. `/news/`, `/news/rss.xml`, `/llms.txt`, `/llms-full.txt`, the homepage news module metadata, and `PAGE_REFRESH_LEDGER.md` are refreshed through 2026-05-29. Relevant parent category hubs for the new stories are `src/content/categories/ai-automation.md`, `src/content/categories/ai-chatbots.md`, `src/content/categories/ai-infrastructure.md`, and `src/content/categories/ai-research.md`.

### 3. Target state

Add high-quality May 30 and May 31 news coverage that clearly distinguishes original announcement dates from AiPedia weekend catch-up dates. The new articles should explain what happened, why buyers should care, what risks to test, and which procurement questions matter. Parent surfaces and crawl surfaces should reflect a May 31 refresh.

### 4. Scope

Included: new news markdown records for Asana/StackAI, Robinhood agentic trading/card, MUFG ChatGPT Enterprise rollout, CoreWeave agent improvement, OpenAI Rosalind Biodefense, Geordie agent governance, Microsoft 365 Copilot redesign, Sysdig LLM-agent intrusion, and May 30/May 31 desk roundups; affected category hub freshness; `/news/` archive metadata; RSS and LLM metadata; generated OG/thumb assets; `PAGE_REFRESH_LEDGER.md`.

Excluded: new tool records/logos, affiliate CTA changes, speculative rumors, and unrelated tool-pricing rewrites.

Affected top-layer surfaces: homepage latest-news module, `/news/`, `/news/rss.xml`, `/categories/ai-automation/`, `/categories/ai-chatbots/`, `/categories/ai-infrastructure/`, `/categories/ai-research/`, `/llms.txt`, `/llms-full.txt`, sitemap/build-generated surfaces, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/news/2026-05-30-*.md`, `src/content/news/2026-05-31-*.md`, `src/content/categories/ai-automation.md`, `src/content/categories/ai-chatbots.md`, `src/content/categories/ai-infrastructure.md`, `src/content/categories/ai-research.md`, `src/pages/news/index.astro`, `src/pages/news/rss.xml.ts`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `src/pages/index.astro`, `public/og/news/*`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. New news records use the existing `news` frontmatter shape: `slug`, `title`, `date`, `severity`, `summary`, `categories`, `author`, `last_updated`, `last_verified`, optional `related_tools`, and `sources`.

### 7. SEO impact

New indexable news URLs get unique titles, summaries, source blocks, internal links, and generated OG/thumb assets. Archive, RSS, LLM surfaces, and ledger rows receive May 31 refresh dates.

### 8. Conversion impact

No new affiliate CTA surfaces. The articles improve buyer trust by separating product reality from funding/security hype and pointing readers toward workflow, governance, and cost questions.

### 9. Mobile UX impact

The articles reuse the existing mobile-first news layout. Verification must cover `/news/`, homepage news modules, affected category hubs, and new article pages at 360, 390, 430, 768, and desktop widths.

### 10. Implementation steps

1. Verify current May 2026 primary sources and de-duplicate against existing news.
2. Add May 30 and May 31 news records with source-backed analysis.
3. Refresh affected automation, infrastructure, and research category hubs where the new news changes the current market summary.
4. Update `/news/`, RSS, LLM metadata, homepage schema metadata, and targeted OG/thumb assets.
5. Regenerate `PAGE_REFRESH_LEDGER.md`.
6. Run news, link, ledger, script, typecheck, build, diff, and mobile QA gates.

### 11. Verification commands

`node scripts/generate-og-news.mjs <changed-news-slugs>`, `npm run ledger:pages`, `npm run check:news`, `npm run check:links`, `npm run ledger:pages:check`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, targeted mobile/browser sanity against `dist-fast`, and `git diff --check`.

### 12. Acceptance criteria

May 30 and May 31 each have at least two current, source-backed news records; no article falsely claims an older announcement happened on the catch-up date; affected category hubs and top-layer surfaces are refreshed; news rendering, links, ledger, tests, and build pass or unrelated failures are documented.

### 13. Risks and mitigations

Weekend search results include aggregators, reposts, and low-quality commentary. Mitigate by relying on official/company sources and named primary reporting, using aggregators only for lead discovery. Avoid adding new tool records because the logo/data requirements would widen scope beyond a news catch-up pass.

### 14. Progress log

2026-05-31: Plan created after auditing local news files and confirming May 30 and May 31 were missing. Primary sources selected include Asana, CoreWeave, OpenAI, Geordie, and Sysdig.
2026-05-31: Expanded coverage after additional current-source search surfaced Robinhood, MUFG/OpenAI, and Microsoft 365 Copilot primary-source items. Added 10 news records across May 30 and May 31, refreshed automation/chatbot/infrastructure/research hubs, regenerated OG assets and PAGE_REFRESH_LEDGER.md, and verified with content, link, ledger, script, check, build, and mobile viewport gates.

### 15. Final report

Completed. Shipped May 30 and May 31 catch-up coverage for Asana/StackAI, Robinhood agentic finance, MUFG/ChatGPT Enterprise, CoreWeave agent improvement, OpenAI Rosalind Biodefense, Geordie agent governance, Microsoft 365 Copilot redesign, Sysdig's LLM-agent intrusion analysis, plus daily desk roundups. Updated affected category hubs, top-layer news/home/RSS/LLM metadata, generated OG/thumb assets, and PAGE_REFRESH_LEDGER.md. Verification passed: `npm run check:news`, `npm run check:links`, `npm run ledger:pages:check`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, `git diff --check`, and Playwright mobile QA for 16 routes at 360, 390, 430, 768, and 1024px.

---

## ExecPlan: May 29 2026 AI News Catch-Up

### 1. Objective

Cover the AI and AI-tool news that AiPedia has not yet covered through May 29, 2026, including today, while correcting stale Claude buyer guidance after Anthropic's Opus 4.8 launch. This supports trust, organic freshness, data quality, editorial scalability, and mobile-first decision support.

### 2. Current state

`src/content/news/` has daily May 2026 coverage through May 28, 2026. The May 28 desk predates Anthropic's late May 28 Opus 4.8 and Series H announcements. There are no May 29 news pages yet. `src/content/tools/claude.md`, `src/content/tools/claude-code.md`, and `src/content/categories/ai-chatbots.md` still name Opus 4.7 as the current Claude flagship.

### 3. Target state

Add source-backed, non-duplicate news coverage for Anthropic Opus 4.8/dynamic workflows, Anthropic's official Series H funding, Tencent Cloud's May 29 enterprise AI stack launch, and the May 29 desk summary. Update Claude and Claude Code buyer pages so current model, pricing, context, and workflow claims are verified as of May 29, 2026.

### 4. Scope

Included: new news markdown records, May 28 desk correction, Claude/Claude Code tool facts, AI Chatbots and AI Coding category freshness, `/news/` archive metadata, `/news/rss.xml`, LLM crawl-surface metadata, generated news OG/thumb assets, and `PAGE_REFRESH_LEDGER.md`.

Excluded: new tool records/logos, affiliate changes, unrelated pricing rewrites, and speculative/unverified rumors.

Affected top-layer surfaces: homepage latest-news module (dynamic collection), `/news/`, `/news/rss.xml`, `/categories/ai-chatbots/`, `/categories/ai-coding/`, `/tools/claude/`, `/tools/claude-code/`, `/llms.txt`, `/llms-full.txt`, sitemap/build-generated surfaces, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/news/*.md`, `src/content/tools/claude.md`, `src/content/tools/claude-code.md`, `src/content/categories/ai-chatbots.md`, `src/content/categories/ai-coding.md`, `src/pages/news/index.astro`, `src/pages/news/rss.xml.ts`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, generated `public/og/news/*`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. New news records use the existing `news` frontmatter shape with `sources`, `related_tools`, `last_verified`, categories, summaries, and dates. Tool/category records update existing frontmatter fields only.

### 7. SEO impact

New indexable news URLs get unique titles, summaries, canonical URLs via the existing route, source blocks, related tools, and internal links. News archive and crawl surfaces get May 29 refresh metadata.

### 8. Conversion impact

No new affiliate CTAs. Tool pages keep commercial guidance honest by reflecting current Claude model and usage-risk facts before sending buyers toward subscription decisions.

### 9. Mobile UX impact

Articles reuse the existing mobile-first ArticlePlus layout and generated OG thumbs. Archive cards remain stacked on mobile and grid on wider screens.

### 10. Implementation steps

1. Verify current May 2026 sources and de-duplicate against existing news.
2. Add new news records and correct the May 28 desk.
3. Refresh Claude, Claude Code, AI Chatbots, and AI Coding facts affected by Opus 4.8/dynamic workflows.
4. Update `/news/`, RSS, LLM metadata, and regenerate OG/thumb assets.
5. Regenerate `PAGE_REFRESH_LEDGER.md`.
6. Run news, link, guard, script, and build checks.

### 11. Verification commands

`node scripts/generate-og-news.mjs <changed-news-slugs>`, `npm run ledger:pages`, `npm run check:news`, `npm run check:links`, `npm run guard:check`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, targeted mobile/browser sanity against `dist-fast`, and `git diff --check`.

### 12. Acceptance criteria

May 29 has at least two current, source-backed news records; late May 28 Anthropic launches are covered without duplicating older rumor coverage; Claude/Claude Code pages no longer present Opus 4.7 as flagship; affected category hubs are current; news rendering, links, ledger, tests, and build pass or unrelated failures are documented.

### 13. Risks and mitigations

Current-day search results can include syndicated, thin, or unverified stories. Prefer official Anthropic, Claude, Tencent, and GlobeNewswire/PRNewswire sources; do not elevate rumors or outage chatter without an official or strong named source. Avoid editing unrelated dirty files.

### 14. Progress log

2026-05-29: Plan created after auditing local news counts, finding no May 29 coverage, and verifying late May 28 Anthropic launches plus May 29 Tencent/Myriad sources.
2026-05-29: Added five news records, refreshed the May 28 desk, updated the April 30 Anthropic rumor page with the official Series H follow-up, refreshed Claude/Claude Code and AI Chatbots/AI Coding pages for Opus 4.8/dynamic workflows, regenerated targeted OG assets and PAGE_REFRESH_LEDGER.md, and verified with focused audits plus full check/build/mobile sanity.

### 15. Final report

Completed. Shipped source-backed May 29 coverage for Anthropic/Claude, Tencent Cloud, and Myriad; added late May 28 Anthropic standalone coverage; corrected the May 28 desk; and synchronized affected buyer pages and category hubs so Opus 4.7 is no longer presented as Claude's current flagship. Verification passed: `npm run check:news`, `npm run check:links`, `npm run ledger:pages:check`, `npm run test:scripts`, `git diff --check`, `npm run check`, `npm run build:fast`, and targeted browser/mobile overflow checks for 12 affected routes at 360, 390, 430, 768, and 1024px. Remaining risk: this pass intentionally avoided speculative/social-only May 29 chatter without official or strong named sourcing.

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

---

## ExecPlan: May 21-23 2026 News Catch-up

### 1. Objective

Publish source-backed, decision-oriented AiPedia news coverage for AI and AI-tool developments found after the latest local May 21 news pass, plus one high-impact missed May 20 model release. This supports editorial freshness, trust, organic rankings, data quality, and buyer decision support.

### 2. Current state

`src/content/news/` contains news through May 21, 2026. The latest local news item is `2026-05-21-openai-codex-appshots-goal-mode-locked-computer-use.md`. The `/news/` archive at `src/pages/news/index.astro` sorts content collection entries by date, and `src/pages/news/[slug].astro` renders article pages with source blocks, impact boxes, related tool strips, and OG images. `scripts/audit-news-xrefs.mjs` requires every recent news item with `affects: [...]` to be referenced from each affected tool page.

### 3. Target state

AiPedia has fresh standalone articles for the verified high-signal stories: Anthropic Project Glasswing's initial Mythos results, OpenAI Codex's Gartner enterprise-coding-agent recognition, Runway Aleph 2.0 and Edit Studio, Cohere Command A+, Starbucks retiring its AI inventory-counting tool, and the pulled White House frontier-model review order. A May 23 desk roundup summarizes the pass and routes readers to the new coverage. Affected tool pages include current cross-links and concise buyer context.

### 4. Scope

Included: new files under `src/content/news/`, updates to affected tool pages, `/news/` archive freshness through generated content, OG news asset generation, `PAGE_REFRESH_LEDGER.md`, and verification checks.

Excluded: new tool records, logo work, affiliate changes, pricing-table rewrites beyond touched tool-page context, and unverified social-only rumors.

Affected top-layer pages and crawl surfaces: `/news/`, affected tool pages for Claude, Codex, Runway, and Cohere, generated sitemap/RSS/llms surfaces, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/news/2026-05-20-cohere-command-a-plus-open-source-enterprise-model.md`, `src/content/news/2026-05-21-runway-aleph-20-edit-studio.md`, `src/content/news/2026-05-21-starbucks-ai-inventory-tool-retired.md`, `src/content/news/2026-05-22-anthropic-glasswing-mythos-vulnerability-results.md`, `src/content/news/2026-05-22-openai-codex-gartner-enterprise-coding-agent-leader.md`, `src/content/news/2026-05-22-trump-ai-executive-order-frontier-model-review-pulled.md`, `src/content/news/2026-05-23-ai-news-desk.md`, `src/content/tools/claude.md`, `src/content/tools/codex.md`, `src/content/tools/cohere.md`, `src/content/tools/runway.md`, generated `public/og/news/*`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. New news records must conform to the existing `news` collection frontmatter, use exact source URLs, include `last_verified: 2026-05-23`, and set `affects` only where tool-page cascade work is completed.

### 7. SEO impact

New indexable news article pages receive unique titles, summaries, canonical URLs from the existing route, dates, source citations, and internal links to relevant tool/category pages. The roundup improves internal linking and recency signals for `/news/`.

### 8. Conversion impact

No affiliate CTA changes. Articles should guide buyers toward relevant tool pages and procurement questions without overstating vendor claims.

### 9. Mobile UX impact

News articles reuse the existing ArticlePlusLayout and mobile-first cards. Verify representative pages through build output; browser QA is optional unless layout or template code changes occur.

### 10. Implementation steps

1. Confirm local baseline and duplicate coverage.
2. Verify candidate stories with current May 2026 source searches.
3. Add standalone news articles with source-backed buyer analysis.
4. Add a May 23 desk roundup linking the new coverage.
5. Update affected tool pages so `audit-news-xrefs` passes.
6. Regenerate page ledger and OG news assets.
7. Run news/link/content/build checks and document any failures.

### 11. Verification commands

`node scripts/generate-og-news.mjs`, `npm run ledger:pages`, `npm run check:news`, `npm run check:links`, `npm run guard:check`, `npm test`, `npm run build:fast`, and `npm run check:security`.

### 12. Acceptance criteria

Each new article has current source URLs, accurate dates, unique titles/summaries, buyer-oriented analysis, and no unsupported claims. Affected tool pages reference each news slug declared in `affects`. `/news/` sorts the new May 23 desk roundup first. Generated ledger and OG assets reflect the refresh. Verification commands pass or failures are documented as unrelated.

### 13. Risks and mitigations

Search results may include stale, syndicated, speculative, or social-only claims; prefer official vendor posts, primary docs/changelogs, and named reporting. Vendor posts can be promotional; frame claims as vendor claims unless independently corroborated. Avoid broad price rewrites unless current pricing is reverified.

### 14. Progress log

2026-05-23: Plan created. Local baseline shows news through May 21, 2026. Verified source candidates include Anthropic Project Glasswing initial update, Runway Aleph 2.0/Edit Studio, Cohere Command A+, OpenAI Codex Gartner recognition, Reuters/Starbucks/NomadGo Automated Counting context, and the pulled White House frontier-model review order.
2026-05-23: Added seven source-backed news records, refreshed Claude/Codex/Cohere/Runway tool-page cross-links and verification dates, generated only the new article OG asset sets, regenerated `PAGE_REFRESH_LEDGER.md`, and completed content/build/mobile validation. Restored unrelated tracked OG churn after the generator rewrote older assets.

### 15. Final report

Completed on 2026-05-23.

Published seven source-backed AiPedia news articles covering Cohere Command A+, Runway Aleph 2.0 and Edit Studio, Starbucks retiring its Automated Counting AI inventory tool, Anthropic Project Glasswing/Mythos vulnerability results, OpenAI Codex Gartner enterprise-coding-agent recognition, the delayed White House frontier-model review order, and a May 23 AI News Desk roundup. Refreshed affected surfaces: `/tools/claude/`, `/tools/codex/`, `/tools/cohere/`, `/tools/runway/`, generated OG news assets, and `PAGE_REFRESH_LEDGER.md`.

Verification passed: `npm run check:news`, `npm run check:links`, `npm run guard:check`, `npm test`, `npm run build:fast`, `git diff --check`, and browser mobile overflow/OG-thumbnail QA across `/news/`, all seven new articles, and four affected tool pages at 360, 390, 430, 768, and 1024 px. `npm run check:security` failed on an existing moderate `ws` advisory inherited through Cloudflare/Vite/Wrangler dependencies; no infrastructure dependency update was made during this editorial refresh.
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

---

## ExecPlan: May 27 2026 News Refresh

### 1. Objective

Publish a current, source-backed May 27, 2026 AiPedia news refresh covering the highest-signal AI and AI-tool developments missing from the existing news archive. The goal is to turn today's volatile AI news into buyer-useful coverage that improves trust, organic freshness, recirculation into tool pages, and editorial scalability.

### 2. Current state

`src/content/news/` is current through the May 26 desk article and includes standalone coverage for several May 22-26 items. OpenRouter and Qwen have active tool pages with recent-development sections. There is no dedicated Microsoft 365 Copilot or Samsung enterprise-AI tool page, so those stories should use related-tool routing rather than false `affects` links.

### 3. Target state

The news section contains a May 27 desk article and standalone articles for verified, non-duplicate stories: OpenRouter's $113M CapitalG-led Series B and token-volume signal, Alibaba Cloud's international Qwen Conference agent stack, Microsoft's mid-2026 Ask Copilot/Click to Do Windows roadmap, and Samsung DX's planned June rollout of ChatGPT/Gemini/Claude access with security training. Affected OpenRouter and Qwen tool pages, parent category surfaces, `/news/`, RSS, LLM surfaces, OG assets, and the page refresh ledger are current.

### 4. Scope

Included: new news Markdown records, affected tool-page updates, affected category/top-layer freshness checks, `/news/` archive metadata, RSS metadata, LLM surface metadata, generated news artwork, page refresh ledger regeneration, content checks, build, and representative mobile QA. Excluded: new tool records, logo changes, affiliate CTA changes, and unverified speculation about rumored OpenAI, Anthropic, or Google releases that did not have current primary or named-source support.

Affected top-layer pages and surfaces: `/news/`, `/tools/openrouter/`, `/tools/qwen/`, `/categories/ai-infrastructure/`, `/categories/ai-chatbots/`, RSS, sitemap/build-generated pages, `/llms.txt`, `/llms-full.txt`, generated OG images, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/news/*.md`, `src/content/tools/openrouter.md`, `src/content/tools/qwen.md`, `src/content/categories/ai-infrastructure.md`, `src/content/categories/ai-chatbots.md`, `src/pages/news/index.astro`, `src/pages/news/rss.xml.ts`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, `public/og/news/*`, and this plan.

### 6. Data model impact

No schema changes. New news records must follow the existing collection schema, include source URLs, use `last_verified: 2026-05-27`, and use `affects` only where the affected tool page is updated with a reciprocal recent-development link.

### 7. SEO impact

Each new article gets a unique title, summary, canonical route from the existing news template, source list, and internal links to relevant tools or categories. `/news/`, RSS, LLM surfaces, and ledger rows should reflect the May 27 refresh.

### 8. Conversion impact

No new affiliate CTAs are planned. Articles should route readers to relevant tool pages and decision guidance while preserving trust language and avoiding promotional overclaiming.

### 9. Mobile UX impact

Articles reuse the existing responsive news layout. Verify `/news/`, new article pages, and affected tool pages at mobile and desktop widths for horizontal overflow, broken images, and missing primary content.

### 10. Implementation steps

1. Verify May 27 story set using current May 2026 searches and primary/current reporting.
2. Add standalone articles and the daily desk with concise buyer guidance, watch-outs, and source-backed claims.
3. Update OpenRouter and Qwen recent-development sections and relevant parent category surfaces.
4. Refresh `/news/`, RSS, and LLM metadata comments.
5. Generate article artwork and regenerate the page ledger.
6. Run news/link/ledger/script checks, build, diff hygiene, and representative mobile QA.

### 11. Verification commands

`npm run check:news`, `npm run check:links`, `node scripts/generate-og-news.mjs`, `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run test:scripts`, `npm run build:fast`, `npm run check`, `git diff --check`, image metadata QA, and Playwright/static mobile QA at 360, 390, 430, 768, and 1024 px.

### 12. Acceptance criteria

New articles are non-duplicate, source-backed, dated accurately, and have `last_verified: 2026-05-27`. Every article with `affects` is linked from its affected tool page. Parent/news surfaces and LLM/RSS metadata are current. Ledger checks pass. Build and mobile QA pass or failures are clearly documented.

### 13. Risks and mitigations

Some May 27 search results recycle May 19-26 announcements; avoid duplicate standalone pages unless the source/date and buyer angle are materially new. Samsung and Microsoft claims include rollout timing, so use cautious wording and note where timing can change. OpenRouter valuation is reported by named outlets rather than company-disclosed, so separate confirmed funding/usage from reported valuation.

### 14. Progress log

2026-05-27: Plan created after source verification. Baseline news stops at May 26, 2026. Starting content edits for the May 27 refresh.

2026-05-27: Added five source-backed May 27 news records, refreshed affected OpenRouter/Qwen tool pages and parent category surfaces, refreshed `/news/`, RSS, and LLM metadata, generated 20 OG/thumbnail assets, regenerated `PAGE_REFRESH_LEDGER.md`, and completed checks/build/mobile QA.

### 15. Final report

Completed on 2026-05-27.

Published the May 27 AiPedia news refresh with four standalone articles and a daily news desk covering OpenRouter's $113M Series B, Alibaba Cloud's Qwen Conference agent stack, Microsoft's mid-2026 Windows Copilot roadmap, and Samsung DX's reported June enterprise rollout of ChatGPT/Gemini/Claude access. Refreshed affected surfaces: `/news/`, `/tools/openrouter/`, `/tools/qwen/`, `/categories/ai-infrastructure/`, `/categories/ai-chatbots/`, `/news/rss.xml`, `/llms.txt`, `/llms-full.txt`, generated OG news assets, and `PAGE_REFRESH_LEDGER.md`.

Verification passed: `npm run check:news`, `npm run check:links`, `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run test:scripts`, `npm run guard:check`, `npm run build:fast`, `npm run check`, `git diff --check`, image metadata QA for all 20 generated assets, Browser QA on a built article, and static Playwright QA for `/news/`, all five new article pages, two affected tool pages, and two affected category pages at 360, 390, 430, 768, and 1024 px.

---

## ExecPlan: Lindy Affiliate Conversion Refresh

### 1. Objective

Turn Lindy into a current, high-trust, high-conversion AiPedia affiliate surface using the approved PartnerStack link supplied by the site owner. The work should increase qualified affiliate clicks, free-trial starts, and paid conversions without compromising editorial trust, source accuracy, or mobile UX.

### 2. Current state

`/tools/lindy/` already exists with a logo and a baseline review, but it is verified only through 2026-05-13, has no live affiliate URL, and still includes stale free-tier/credit phrasing. Lindy is mentioned in `/categories/ai-automation/` and the automation-platform guide, but there is no Lindy-specific comparison or high-intent assistant buyer guide that can surface a Lindy CTA above the fold.

### 3. Target state

`/tools/lindy/` becomes a current source-backed buying page with the live affiliate link, honest free-trial and plan guidance, clear “buy/avoid/alternative” decisions, updated facts, updated affiliate registry metadata, and verified logo/OG rendering. New money pages capture likely buyer intent: a Lindy-centered comparison against Zapier and n8n, plus a buyer guide for work AI assistants where Lindy is the editorial best pick. Affected category, guide, compare, tools, LLM, and ledger surfaces are current.

### 4. Scope

Included: Lindy tool-page refresh, affiliate metadata update, ToolLayout CTA label support if needed, one Lindy comparison page, one Lindy buyer guide, affected AI automation category and existing guide links, top-layer metadata comments, commercial CTA audit coverage, generated OG/tool assets if required, page ledger regeneration, content checks, build, and mobile QA.

Excluded: changing Lindy’s score solely for commission, fabricating hands-on tests, claiming unverified cookie duration, adding unrelated affiliate pages, or creating duplicate low-value pages.

Affected top-layer pages and surfaces: `/tools/`, `/tools/lindy/`, `/categories/`, `/categories/ai-automation/`, `/compare/`, `/guides/`, `/llms.txt`, `/llms-full.txt`, sitemap/build outputs, commercial CTA audit, source/affiliate registry metadata, logo manifest, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/tools/lindy.md`, `src/content/comparisons/lindy-vs-zapier-vs-n8n.md`, `src/content/use-cases/best-ai-personal-assistant-for-work.md`, `src/content/categories/ai-automation.md`, `src/content/use-cases/best-ai-automation-platform.md`, `src/data/_meta/tools-registry.json`, `src/layouts/ToolLayout.astro`, `scripts/audit-commercial-cta.mjs`, `tests/scripts/audit-commercial-cta.test.mjs`, `src/pages/tools/index.astro`, `src/pages/categories/index.astro`, `src/pages/compare/index.astro`, `src/pages/guides/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, generated OG assets, and this plan.

### 6. Data model impact

No schema change planned. Existing tool, comparison, guide, affiliate, and fact fields can represent the changes. Lindy’s affiliate object should move from applied/no-link to approved/live-link with source-backed PartnerStack terms and no unsupported cookie claim.

### 7. SEO impact

New pages should target decision-intent queries rather than thin affiliate landing intent: “Lindy vs Zapier vs n8n,” “best AI personal assistant for work,” “Lindy pricing,” and “AI assistant for inbox meetings calendar.” Titles, descriptions, canonical routes, internal links, schema, and source lists must remain unique and crawlable.

### 8. Conversion impact

Every monetized Lindy CTA must use the supplied affiliate URL, include placement/tool/page metadata, carry `rel="sponsored noopener"`, and show nearby disclosure. CTA labels should be user-benefit focused: “Start Lindy free trial,” “Try Lindy for inbox and meetings,” or similar. Pages should pre-qualify buyers before the click to improve conversion quality.

### 9. Mobile UX impact

The first mobile screen for the tool and new guide/comparison pages must answer who should try Lindy, which plan to start with, why trust the claim, and what to avoid. Verify 360, 390, 430, 768, and 1024 px for no overflow, visible CTAs, no broken logo/OG images, and readable tables.

### 10. Implementation steps

1. Verify Lindy pricing, feature, security, integrations, usage, and PartnerStack facts using current May 2026 sources.
2. Rewrite `/tools/lindy/` with current plan guidance, affiliate CTA metadata, sources, FAQ, alternatives, and conversion-safe framing.
3. Add a Lindy-centered comparison page and work-assistant buyer guide with honest use-case winners.
4. Update affected category/guide/top-layer/LLM/commercial-audit surfaces and affiliate registry metadata.
5. Generate/regenerate assets and the page ledger.
6. Run link/news/ledger/content/commercial/logo/script/build checks and representative mobile QA.

### 11. Verification commands

`node scripts/generate-logo-manifest.mjs`, `node scripts/audit-tool-logos.mjs`, `node scripts/generate-og-svgs.mjs`, `node scripts/optimize-og-images.mjs`, `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run check:links`, `npm run check:news`, `npm run test:scripts`, `npm run guard:check`, `npm run build:fast`, `npm run check`, `git diff --check`, commercial CTA route checks, and mobile/static QA at 360, 390, 430, 768, and 1024 px.

### 12. Acceptance criteria

Lindy pages use the supplied affiliate URL and show tracked/disclosed CTAs. All volatile facts are verified as of 2026-05-27 with May 2026 source searches. No unsupported free-tier, credit, cookie, model, or security claims remain. New pages are unique, useful, internally linked, ledgered, and build cleanly. Mobile QA and commercial CTA checks pass or any unrelated issues are documented.

### 13. Risks and mitigations

The old Lindy page contained stale credit/free-tier claims; replace them with current official pricing and docs language. Affiliate terms differ between Lindy’s partner page, AffiliateOtter, and PartnerStack directory; use PartnerStack for the live program terms and leave cookie duration unknown. Avoid making Lindy the universal automation winner when n8n or Zapier is better for technical or broad SaaS automation.

### 14. Progress log

2026-05-27: Plan created after confirming an existing Lindy page, live logo, stale affiliate/no-link metadata, and current May 2026 Lindy pricing, usage, security, integrations, and PartnerStack program facts.
2026-05-27: Rewrote `/tools/lindy/` around the live affiliate link, current 7-day trial/Plus/Pro/Max pricing, usage limits, security, integrations, alternatives, FAQ, and source list. Added `/compare/lindy-vs-zapier-vs-n8n/` and `/guides/best-ai-personal-assistant-for-work/`, updated the AI automation category and automation-platform guide to route buyers into those pages, patched `ToolLayout.astro` so `primary_cta_label` reaches hero/footer/sticky CTAs, updated the Lindy registry affiliate metadata, and added Lindy routes to the commercial CTA audit.
2026-05-27: Verification completed. Passed logo manifest/audit, OG generation/optimization, page ledger regeneration and check, link/news checks, script tests, guard checks, `build:fast`, full `check`, `git diff --check`, standalone commercial CTA audit against `dist-fast`, in-app browser smoke on `/tools/lindy/`, and 40 static/mobile QA checks across 8 affected routes at 360, 390, 430, 768, and 1024 px.

---

## ExecPlan: Oldest Active Tool Page Refresh Slice, June 1

### 1. Objective

Refresh the next oldest active tool-page slice to god-tier 10/10 buyer quality for June 1, 2026, while excluding dead tool pages and individual news article pages.

### 2. Scope

Included: the current oldest active tool queue slice, most recently `/tools/granola/`, `/tools/grok/`, `/tools/groq/`, `/tools/gumloop/`, `/tools/hailuo/`, `/tools/harvey/`, `/tools/hedra/`, `/tools/helicone/`, `/tools/hermes-agent/`, and `/tools/hex/`; affected category hubs, `/tools/`, `/categories/`, homepage metadata, LLM crawl surfaces, source registry dates, and `PAGE_REFRESH_LEDGER.md`.

Excluded: dead tool pages, individual news article pages, unrelated comparison rebuilds, broad template redesign, and unsupported model-version or pricing claims.

### 3. Implementation Steps

1. Verify June 2026 volatile facts from current official/vendor sources and release pages.
2. Refresh each active tool page with current pricing, model/release, buyer-fit, watch-out, source, and verification language.
3. Update affected parent category hubs and top-layer crawl/catalog surfaces without creating thin new pages.
4. Update source-registry `last_checked` fields for the source IDs used in this slice.
5. Regenerate the page ledger, run content/link/build checks, perform mobile static QA, then commit and push `master`.

### 4. Progress Log

2026-06-01: Verified current June 2026 facts for the 15-page active-tool slice from official pricing, product, docs, and release surfaces. Refreshed the tool pages and affected automation, SEO, music, chatbots, voice, design, image, presentation, coding, and infrastructure category hubs. Source registry and top-layer catalog/LLM metadata updates are in progress before ledger regeneration and QA.

2026-06-01: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run check:links`, `npm run test:scripts`, `npm run build:fast`, `npm run check`, and static Playwright QA for 30 refreshed routes at 360, 390, 430, 768, and 1024 px. No dead tool pages or individual news article pages were edited.

2026-06-02: Continued the oldest active tool queue after the pushed Canva-through-Consensus slice. Selected `/tools/copy-ai/`, `/tools/crewai/`, `/tools/deepgram/`, `/tools/deepl/`, `/tools/deepseek/`, `/tools/descript/`, `/tools/dext/`, `/tools/dia/`, `/tools/doubao/`, and `/tools/dust/`. Current-source checks found material updates for CrewAI 1.14.6 and Basic/Enterprise pricing, DeepL API Developer/Growth/Enterprise plan structure, DeepSeek V4-Pro June 1 quarter-price adjustment, Descript AI avatars/media generation, and Dia's Atlassian ownership/security posture. Updated affected AI Writing, AI Automation, AI Voice, AI Search, and AI Chatbots category hubs plus homepage, tools, categories, and LLM metadata comments. Ledger regeneration and QA are next.

2026-06-02: Continued the oldest active tool queue from Flux through Grammarly, skipping dead tool pages and individual news articles. Selected `/tools/flux/`, `/tools/framer-ai/`, `/tools/galileo-ai/`, `/tools/genspark/`, `/tools/getresponse/`, `/tools/glean/`, `/tools/glm/`, `/tools/google-stitch/`, `/tools/goose/`, and `/tools/grammarly/`. Verified current June 2026 facts from official/vendor sources: BFL FLUX.2 pricing, Framer Free/Basic/Pro/Scale limits, Google Stitch official Labs surfaces, Genspark Plus/Pro membership credits, GetResponse pricing/trial status, Glean Work AI/developer MCP docs, Z.AI GLM-5.1 docs/pricing/Hugging Face, AAIF Goose repository, and Grammarly Pro support pricing. Refreshed affected AI Image, AI Design, AI Search, AI Automation, AI Chatbots, AI Coding, AI Research, and AI Writing hubs plus homepage, tools, categories, and LLM metadata comments. Ledger regeneration and QA are next.

2026-06-02: Continued the oldest active tool queue from Granola through Hex, skipping dead `/tools/grok-code-fast/` and individual news articles. Selected `/tools/granola/`, `/tools/grok/`, `/tools/groq/`, `/tools/gumloop/`, `/tools/hailuo/`, `/tools/harvey/`, `/tools/hedra/`, `/tools/helicone/`, `/tools/hermes-agent/`, and `/tools/hex/`. Verified current June 2026 facts from official/vendor sources: Granola pricing/security, xAI pricing and model docs, Groq pricing/model docs, Gumloop pricing/docs and BYOK credit caveats, MiniMax/Hailuo 2.3 API package/token pricing, Harvey June product/blog updates including Opus 4.8, Contract Intelligence, Command Center, and Singapore/APAC expansion, Hedra pooled-credit model rates, Helicone AI Gateway/pricing/docs, Hermes Agent v0.15.2 release/docs, and Hex AI/pricing/credit docs. Refreshed affected AI Notes, AI Chatbots, AI Automation, AI Video, AI Research, AI Search, AI Voice, AI Coding, and AI Writing hubs plus homepage, tools, categories, and LLM metadata comments. Source registry updates are complete; ledger regeneration and QA are next.

2026-06-02: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Granola-through-Hex slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run audit:provenance -- --json` (report-only with unrelated pre-existing CloudTalk/MeetGeek/Lindy/Claude source-ID debt), `npm run check`, `npm run build:fast`, and custom Playwright static/mobile QA for 22 HTML routes plus `/llms.txt` and `/llms-full.txt` at 360, 390, 430, 768, and 1024 px. No dead tool pages or individual news article pages were edited.

2026-06-02: Continued the oldest active tool queue from Higgsfield through Jan.ai, skipping dead tool pages and individual news articles. Selected `/tools/higgsfield/`, `/tools/hireez/`, `/tools/hugging-face/`, `/tools/humata/`, `/tools/hume-ai/`, `/tools/hunyuan/`, `/tools/hyperwrite/`, `/tools/ideogram/`, `/tools/intercom/`, and `/tools/jan-ai/`. Verified current June 2026 facts from official/vendor sources: Higgsfield individual/team pricing and about-page scale claims, hireEZ demo-led recruiting platform scope, Hugging Face account/storage/Spaces/Inference Endpoint pricing, Humata Free/Expert/Team pricing and GPT-5 matrix language, Hume pricing plus Expression Measurement deprecation/inaccessibility dates, Hunyuan HY-World 2.0 code release and open-weight model surfaces, HyperWrite Premium/Ultra pricing, Ideogram annual Plus/Pro/Team pricing, Intercom seat/Fin/Copilot/Pro add-on pricing, and Jan.ai v0.8.2/GitHub repository status. Refreshed affected AI Video, AI Automation, AI Infrastructure, AI Research, AI Voice, AI Chatbots, AI Writing, and AI Image hubs plus homepage, tools, categories, LLM metadata comments, source registry, and secondary tool registry. Ledger regeneration and QA are next.

2026-06-02: Continued oldest-to-newest ledger pass after skipped dead tool/dead archive rows. Selected the next compact non-news, non-dead slice: `/404/`, `/about/scoring/`, `/companies/anthropic/`, and `/companies/elevenlabs-company/`, with parent `/about/`, `/companies/`, `/llms.txt`, and `/llms-full.txt` surfaces updated. Verified current June 2026 company facts from official sources: Anthropic confidential S-1 submission, $65B Series H at $965B post-money, $47B run-rate revenue, Claude Opus 4.8 and current model/pricing docs; ElevenLabs $500M+ ARR update, $500M Series D/$11B valuation, current $0-$990 self-serve pricing, Eleven v3 model help, and ElevenAgents/PAYG billing caveats. Source registry updates are complete; ledger regeneration and QA are next.

2026-06-02: Continued oldest-to-newest ledger pass after skipping dead `/tools/phind/`, `/tools/tome/`, `/tools/dalle/`, and `/dead/`. Selected the Adobe Firefly comparison cluster: `/compare/adobe-firefly-vs-canva/`, `/compare/adobe-firefly-vs-flux/`, `/compare/adobe-firefly-vs-freepik/`, `/compare/adobe-firefly-vs-ideogram/`, `/compare/adobe-firefly-vs-midjourney/`, and `/compare/adobe-firefly-vs-stable-diffusion/`. Verified current June 2026 facts from official Adobe Firefly, Canva, Freepik/Magnific, BFL FLUX.2, Ideogram, Midjourney, and Stability AI sources. Rebuilt each comparison around buyer-fit winners, plan/credit caveats, commercial-safety posture, model/version context, and workflow watch-outs. Updated `/compare/`, LLM metadata comments, and source registry checks; ledger regeneration and QA are next.

2026-06-02: Continued oldest-to-newest ledger pass after the pushed Firefly comparison slice. Selected the next live non-news comparison cluster: `/compare/ahrefs-vs-frase/`, `/compare/ahrefs-vs-marketmuse/`, `/compare/ahrefs-vs-neuronwriter/`, and `/compare/ahrefs-vs-surfer-seo/`. Verified current June 2026 facts from official Ahrefs pricing/Brand Radar, Frase pricing, MarketMuse pricing/content strategy pages, NeuronWriter pricing/features, and Surfer pricing/homepage sources. Rebuilt the comparisons around SEO data vs content workflow buyer jobs, pricing/plan caveats, AI visibility positioning, and when to pair tools. Updated the AI SEO hub, best AI SEO tool guide, `/compare/`, LLM metadata comments, and source registry checks; ledger regeneration and QA are next.

2026-06-02: Continued oldest-to-newest ledger pass after the pushed Ahrefs comparison slice. Selected the next live non-news comparison cluster: `/compare/aider-vs-claude-code/`, `/compare/aider-vs-cursor/`, and `/compare/aider-vs-github-copilot/`. Verified current June 2026 facts from official Aider docs/repository, Claude Code docs/costs/usage limits, Claude pricing and Max help, Anthropic Opus 4.8 and dynamic-workflows sources, Cursor pricing/changelog/Composer 2.5 sources, and GitHub Copilot plans, AI Credits, organization billing, supported models, and usage-based billing announcement. Rebuilt the comparisons around terminal/BYOK control vs managed Claude agent, AI-native IDE, and GitHub-native Copilot workflows. Updated the AI Coding hub, `/compare/`, LLM metadata comments, and source registry checks; ledger regeneration and QA are next.

2026-06-03: Continued oldest-to-newest ledger pass after the in-progress Apollo, Beautiful.ai, and Bolt comparison clusters, skipping dead tool pages, the Tome dead-tool comparison, and individual news articles. Selected the next active comparison cluster: `/compare/canva-vs-chatgpt/`, `/compare/canva-vs-figma/`, `/compare/canva-vs-google-stitch/`, `/compare/canva-vs-lovable/`, `/compare/canva-vs-midjourney/`, and `/compare/canva-vs-v0/`. Verified current June 2026 facts from official Canva, ChatGPT/OpenAI, Figma, Google Stitch/Labs, Lovable, Midjourney, v0, and Vercel sources. Rebuilt the comparisons around finished-design production vs general AI assistant, product-design system, Labs UI prototyping, prompt-to-app builder, raw image/video generation, and Vercel-native app-building buyer jobs. Updated `/compare/` and LLM metadata comments; ledger regeneration and QA are next.

2026-06-03: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Canva comparison cluster. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run check:news`, `npm run guard:check`, `git diff --check`, `npm run check:links`, `npm run test:scripts`, `npm run build:fast`, `npm run check`, and targeted Playwright static/mobile QA for the six Canva comparison routes at 360, 390, 430, 768, and 1024 px. No dead tool pages or individual news article pages were edited.

2026-06-03: Continued oldest-to-newest ledger pass after the Canva comparison cluster, skipping dead tool pages and individual news articles. Selected the next active Capacities comparison cluster: `/compare/capacities-vs-fireflies/`, `/compare/capacities-vs-notebooklm/`, `/compare/capacities-vs-obsidian/`, `/compare/capacities-vs-otter-ai/`, and `/compare/capacities-vs-readwise/`. Verified current June 2026 facts from official Capacities pricing/docs, Fireflies pricing/help and AI Credits docs, NotebookLM Help limits, Obsidian pricing/community pages, Otter.ai pricing, and Readwise pricing/Ghostreader docs. Rebuilt the comparisons around object-based PKM versus meeting intelligence, source-grounded research, local-first Markdown, live transcription, and reading-retention buyer jobs. Updated the AI Notes hub, `/compare/`, LLM metadata comments, and source registry checks; ledger regeneration and QA are next.

2026-06-03: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Capacities comparison cluster. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run build:fast`, `npm run check`, and targeted Playwright static/mobile QA for the five Capacities comparison routes at 360, 390, 430, 768, and 1024 px. No dead tool pages or individual news article pages were edited.

2026-06-03: Continued oldest-to-newest ledger pass after Capacities, skipping the dead Tome comparison and individual news articles. Selected the next live Cartesia comparison cluster: `/compare/cartesia-vs-descript/`, `/compare/cartesia-vs-elevenlabs/`, `/compare/cartesia-vs-fish-audio/`, `/compare/cartesia-vs-resemble-ai/`, and `/compare/cartesia-vs-voxtral/`. Verified current June 2026 facts from official Cartesia, Descript, ElevenLabs, Fish Audio, Resemble AI, and Mistral/Voxtral sources; corrected Voxtral from an STT-only framing to Mistral's current TTS, transcription, and realtime audio family. Updated the Voxtral tool page, AI Voice hub, compare/top-layer/LLM metadata surfaces, source registry, canonical comparison fact-table wrapping, and `PAGE_REFRESH_LEDGER.md`. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check`, `npm run test:scripts`, `npm run build:fast`, and targeted Playwright static/mobile QA for the five Cartesia comparison routes plus `/tools/voxtral/` and `/categories/ai-voice/` at 360, 390, 430, 768, and 1024 px. No dead tool pages or individual news article pages were edited.

2026-06-03: Continued oldest-to-newest ledger pass after Cartesia, skipping dead tool pages and individual news articles. Selected the next live ChatGPT comparison cluster: `/compare/chatgpt-vs-claude/`, `/compare/chatgpt-vs-copy-ai/`, `/compare/chatgpt-vs-cursor/`, `/compare/chatgpt-vs-deepseek/`, and `/compare/chatgpt-vs-elicit/`. Verified current June 2026 facts from official OpenAI/ChatGPT, Anthropic/Claude, Copy.ai, Cursor, DeepSeek, and Elicit sources. Rebuilt the comparisons around broad assistant vs writing/code/research/GTM/API-specialist buyer jobs, refreshed the ChatGPT tool page and AI Chatbots/AI Writing/AI Coding/AI Research hubs, updated `/compare/`, homepage, tools/categories indexes, LLM metadata comments, and source registry checks. Ledger regeneration and QA are next.

2026-06-03: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the ChatGPT comparison cluster. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run check`, `npm run test:scripts`, `npm run build:fast`, static viewport QA for 15 refreshed/top-layer routes across 360, 390, 430, 768, and 1024 px, and an in-app browser smoke check for `/compare/chatgpt-vs-claude/`. No dead tool pages or individual news article pages were edited.

2026-06-03: Continued oldest-to-newest ledger pass after the first ChatGPT comparison cluster, skipping dead tool pages, dead Tome comparison intent, and individual news articles. Selected the next live ChatGPT comparison cluster: `/compare/chatgpt-vs-figma/`, `/compare/chatgpt-vs-fireflies/`, `/compare/chatgpt-vs-gamma/`, `/compare/chatgpt-vs-gemini/`, and `/compare/chatgpt-vs-github-copilot/`. Verified current June 2026 facts from official OpenAI/ChatGPT, Figma, Fireflies.ai, Gamma, Google/Gemini, and GitHub Copilot sources. Rebuilt the comparisons around broad assistant vs design workspace, meeting capture, deck generation, Google-native assistant, and GitHub-native coding buyer jobs. Updated AI Design, AI Presentation, AI Chatbots, and AI Coding hubs plus `/compare/`, `/categories/`, LLM metadata comments, and source registry checks. Ledger regeneration and QA are next.

2026-06-03: Continued oldest-to-newest ledger pass after the second ChatGPT comparison cluster, skipping dead tool pages, dead tool comparisons, and individual news articles. Selected the next live ChatGPT comparison cluster: `/compare/chatgpt-vs-glm/`, `/compare/chatgpt-vs-grammarly/`, `/compare/chatgpt-vs-grok/`, `/compare/chatgpt-vs-hermes-agent/`, and `/compare/chatgpt-vs-jasper/`. Verified current June 2026 facts from official OpenAI/ChatGPT, Z.AI GLM-5.1, Grammarly, xAI/Grok, Hermes Agent, and Jasper sources. Rebuilt the comparisons around broad assistant vs open-weight/API model, inline writing assistant, xAI-native research/media assistant, self-hosted operator agent, and marketing-workflow platform buyer jobs. Refreshed the Jasper tool record, AI Chatbots, AI Writing, and AI Automation hubs, `/compare/`, `/categories/`, LLM metadata comments, and source registry checks; ledger regeneration and QA are next.

2026-06-03: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the GLM/Grammarly/Grok/Hermes Agent/Jasper ChatGPT comparison slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, static/mobile QA for 11 refreshed/top-layer HTML routes plus `/llms.txt` and `/llms-full.txt` at 360, 390, 430, 768, and 1024 px, and an in-app browser smoke check for `/compare/chatgpt-vs-jasper/`. No dead tool pages or individual news article pages were edited.

2026-06-03: Continued oldest-to-newest ledger pass after the GLM/Grammarly/Grok/Hermes Agent/Jasper slice, skipping dead tool pages, the dead Tome comparison, and individual news articles. Selected the next live ChatGPT comparison cluster: `/compare/chatgpt-vs-kagi/`, `/compare/chatgpt-vs-kimi/`, `/compare/chatgpt-vs-lovable/`, `/compare/chatgpt-vs-marketmuse/`, and `/compare/chatgpt-vs-mem/`. Verified current June 2026 facts from official OpenAI/ChatGPT, Kagi, Moonshot/Kimi, Lovable, MarketMuse, and Mem sources. Rebuilt the comparisons around broad assistant vs private paid search, K2.6 API/model evaluation, prompt-to-app building, SEO content strategy, and AI note memory buyer jobs. Updated AI Search, AI Chatbots, AI Design, AI SEO, AI Notes, `/compare/`, `/categories/`, LLM metadata comments, source registry checks, and `PAGE_REFRESH_LEDGER.md`. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, static/mobile QA for 12 refreshed/top-layer HTML routes plus `/llms.txt` and `/llms-full.txt` at 360, 390, 430, 768, and 1024 px, and an in-app browser smoke check for `/compare/chatgpt-vs-kimi/`. No dead tool pages or individual news article pages were edited.

2026-06-03: Continued oldest-to-newest ledger pass after the Kagi/Kimi/Lovable/MarketMuse/Mem ChatGPT slice, skipping dead `/compare/chatgpt-vs-phind/` and individual news articles. Selected the next live ChatGPT comparison cluster: `/compare/chatgpt-vs-mistral-ai/`, `/compare/chatgpt-vs-neuronwriter/`, `/compare/chatgpt-vs-notion-ai/`, `/compare/chatgpt-vs-otter-ai/`, and `/compare/chatgpt-vs-quillbot/`. Verified current June 2026 facts from official OpenAI/ChatGPT, Mistral pricing/model/Search Toolkit sources, NeuronWriter pricing/features, Notion pricing/product/custom-agent/meeting-note docs, Otter pricing/product sources, and QuillBot Premium/help sources. Rebuilt the comparisons around broad assistant vs model platform, SEO content optimizer, Notion workspace AI, meeting capture/archive, and paraphrasing utility buyer jobs. Refreshed Mistral AI and Otter.ai tool records, AI Chatbots, AI SEO, AI Notes, AI Writing, `/compare/`, `/categories/`, homepage/tools index comments, LLM metadata comments, and source registry checks; ledger regeneration and QA are next.

2026-06-03: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Mistral/NeuronWriter/Notion/Otter/QuillBot ChatGPT comparison slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, static/mobile QA for 14 refreshed/top-layer HTML routes plus `/llms.txt` and `/llms-full.txt` at 360, 390, 430, 768, and 1024 px, and an in-app browser smoke check for `/compare/chatgpt-vs-mistral-ai/`. No dead tool pages or individual news article pages were edited.

---

## ExecPlan: June 3 2026 AI News Catch-Up

### 1. Objective

Cover the material AI tool and AI industry news published from June 1, 2026 through the current June 3 catch-up window, using current primary or high-trust sources. The goal is to improve trust, organic freshness, buyer usefulness, and editorial scalability without adding thin or unsupported news.

### 2. Current state

The newest existing news articles are dated May 31, 2026. `/news/` still carries May 2026 metadata. The relevant tool pages already refreshed recently include ChatGPT, GitHub Copilot, Claude, Gemini, and Microsoft Agent Framework, but new June 1-3 sources affect their recent-change guidance.

### 3. Target state

Publish a June 3 news desk and focused June 3 news articles covering Microsoft Build/Work IQ, GitHub Copilot AI Credits and SDK GA, Anthropic Project Glasswing expansion, ChatGPT model retirements, Google Workspace Gemini Drive sharing, NVIDIA agent/physical-AI announcements, and enterprise-agent/security/policy launches from Postman, RelationalAI, 7AI, and the White House AI cybersecurity order.

### 4. Scope

Included: `src/content/news/`, affected tool records (`github-copilot`, `microsoft-agent-framework`, `chatgpt`, `claude`, `gemini`), affected category hubs (`ai-coding`, `ai-automation`, `ai-chatbots`, `ai-infrastructure`), `/news/`, homepage/news modules, `/tools/`, `/categories/`, LLM manifests, source registry, and `PAGE_REFRESH_LEDGER.md`.

Excluded: dead tool pages, individual stale article rewrites outside this catch-up window, unverified rumors, net-new tool records for vendors without enough catalog-ready data, and unrelated design/template rebuilds.

### 5. Files likely affected

- `src/content/news/2026-06-03-*.md`
- `src/content/tools/github-copilot.md`
- `src/content/tools/microsoft-agent-framework.md`
- `src/content/tools/chatgpt.md`
- `src/content/tools/claude.md`
- `src/content/tools/gemini.md`
- `src/content/categories/ai-coding.md`
- `src/content/categories/ai-automation.md`
- `src/content/categories/ai-chatbots.md`
- `src/content/categories/ai-infrastructure.md`
- `src/pages/news/index.astro`
- `src/pages/index.astro`
- `src/pages/tools/index.astro`
- `src/pages/categories/index.astro`
- `src/pages/llms.txt.ts`
- `src/pages/llms-full.txt.ts`
- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`

### 6. Data model impact

No schema migration. Existing news frontmatter, tool `last_updated` / `last_verified`, `price_history`, `facts`, and source registry IDs are sufficient.

### 7. SEO impact

New indexable news pages must have unique titles, summaries, source lists, related tools where applicable, and crawlable decision-oriented body copy. `/news/` title/meta freshness moves from May 2026 to June 2026.

### 8. Conversion impact

No new affiliate CTAs are planned. Tool updates should preserve existing CTA tracking and avoid overstating commercial recommendations from news alone.

### 9. Mobile UX impact

News pages use the existing mobile-first news article template. QA must cover 360, 390, 430, 768, and desktop widths for the new news routes and affected hubs.

### 10. Implementation steps

1. Verify current June 2026 facts from official/vendor/government sources.
2. Add June 3 catch-up news files with clear buyer implications and source lists.
3. Refresh affected tool and category pages with concise recent-change entries.
4. Update top-layer surfaces, source registry, and page ledger.
5. Run news, source, link, type/build, and mobile QA checks.

### 11. Verification commands

`npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, targeted static Playwright mobile QA, and in-app browser smoke for `/news/2026-06-03-ai-news-desk/`.

### 12. Acceptance criteria

Every new news page is source-backed, current to June 3, 2026, and useful to buyers. Affected parent hubs and top-layer crawl surfaces are current and internally linked. Ledger and validation commands pass or unrelated failures are documented.

### 13. Risks and mitigations

Risk: over-covering low-quality press releases. Mitigation: use the news desk and roundup format for lower-catalog-impact items, and reserve standalone articles for high-impact product/platform updates.

Risk: volatile pricing/model facts drifting. Mitigation: use primary sources, update `last_verified`, and avoid unverified plan claims.

### 14. Progress log

2026-06-03: Plan created after verifying the May 31 last-news cutoff and source sweep for June 1-3 material AI tool/news updates. Published nine source-backed June 1-3 news items, generated required news OG/thumb assets, refreshed affected ChatGPT, Claude, Gemini, GitHub Copilot, and Microsoft Agent Framework tool pages, updated AI Coding, AI Automation, AI Chatbots, and AI Infrastructure hubs, refreshed `/news/`, RSS, Explore, homepage, tools/categories indexes, LLM surfaces, source registry, and `PAGE_REFRESH_LEDGER.md`.

2026-06-04: Resumed after interruption. Ran a focused June 4 official-source sweep and found no additional clear official product release requiring a new article before finalizing this catch-up. Validation passed: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run audit:sources`, `npm run check:news`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, targeted Playwright mobile QA across 23 routes at 360/390/430/768/1024, and in-app browser DOM smoke for `/news/2026-06-03-ai-news-desk/`.

2026-06-04: Continued oldest-to-newest ledger pass after the pushed June news catch-up, skipping dead Tome/Phind comparison surfaces and individual news articles. Selected the next live ChatGPT comparison continuation: `/compare/chatgpt-vs-scite/`, `/compare/chatgpt-vs-sudowrite/`, `/compare/chatgpt-vs-surfer-seo/`, `/compare/chatgpt-vs-v0/`, `/compare/chatgpt-vs-wordtune/`, `/compare/chatgpt-vs-writesonic/`, `/compare/chatgpt-vs-you-com/`, and `/compare/chatgpt-vs-zapier/`. Verified June 4 facts from official ChatGPT/OpenAI, Scite, Sudowrite, Surfer SEO, v0/Vercel, Wordtune, Writesonic, You.com, and Zapier sources. Rebuilt the comparisons around broad assistant vs citation-context, fiction-writing, SEO/GEO optimization, Vercel app-building, rewrite polish, AI-search visibility, search/research APIs, and SaaS workflow automation buyer jobs. Refreshed companion tool records, source registry dates, AI Research, AI Writing, AI SEO, AI Coding, AI Design, AI Search, and AI Automation hubs, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-04: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Scite/Sudowrite/Surfer/v0/Wordtune/Writesonic/You.com/Zapier ChatGPT comparison slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and custom static Playwright QA for 29 refreshed/top-layer routes at 360, 390, 430, 768, and 1024 px. No dead tool pages or individual news article pages were edited.

2026-06-04: Continued oldest-to-newest ledger pass after the pushed ChatGPT comparison continuation, skipping dead tool/archive rows and selecting the next live Claude Code coding slice: `/compare/claude-code-vs-continue/`, `/compare/claude-code-vs-devin/`, `/compare/claude-code-vs-github-copilot/`, and `/compare/claude-code-vs-val-town/`. Verified June 4 facts from official Anthropic/Claude Code, Continue, Cognition/Devin, GitHub Copilot, and Val Town sources. Rebuilt the comparisons around specialist Claude agent, open-source BYOK IDE layer, autonomous ticket delegation, GitHub-native AI platform, and hosted TypeScript runtime buyer jobs. Refreshed companion Claude Code, Continue, Devin, GitHub Copilot, and Val Town tool records, AI Coding hub, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-04: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Claude Code vs Continue/Devin/GitHub Copilot/Val Town slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run guard:check`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 14 refreshed/top-layer routes at 360, 390, 430, 768, and 1024 px. No dead tool pages or individual news article pages were edited.

2026-06-04: Continued oldest-to-newest ledger pass after the Claude Code slice, skipping dead tool/archive rows and selecting the next live Claude comparison slice: `/compare/claude-vs-cline/`, `/compare/claude-vs-cody/`, `/compare/claude-vs-cursor/`, `/compare/claude-vs-deepseek/`, `/compare/claude-vs-elicit/`, and `/compare/claude-vs-gemini/`. Verified June 4 facts from official Anthropic, Cline, Sourcegraph, Cursor, DeepSeek, Elicit, and Google sources. Rebuilt the comparisons around broad Claude assistant/Claude Code use versus open-source BYOK coding, Sourcegraph Enterprise code context, AI-native IDE work, low-cost DeepSeek API/model evaluation, literature-review workflow, and Google-native Gemini subscription/API/media workflows. Refreshed AI Coding, AI Chatbots, and AI Research parent hubs, the source registry, `/compare/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-04: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Claude vs Cline/Cody/Cursor/DeepSeek/Elicit/Gemini slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 12 refreshed/top-layer HTML routes at 360, 390, 430, 768, and 1024 px plus `/llms.txt` and `/llms-full.txt`. No dead tool pages or individual news article pages were edited.

2026-06-04: Continued oldest-to-newest ledger pass after the pushed Claude comparison slice, skipping dead tool/archive rows and selecting the next live Claude specialist comparison slice: `/compare/claude-vs-github-copilot/`, `/compare/claude-vs-grammarly/`, `/compare/claude-vs-grok/`, `/compare/claude-vs-jasper/`, `/compare/claude-vs-kimi/`, `/compare/claude-vs-mistral-ai/`, `/compare/claude-vs-notion-ai/`, `/compare/claude-vs-perplexity/`, `/compare/claude-vs-qwen/`, and `/compare/claude-vs-sudowrite/`. Verified June 4 facts from official Anthropic, GitHub Copilot, Grammarly, xAI, Jasper, Kimi, Mistral, Notion, Perplexity, Qwen, and Sudowrite sources. Rebuilt the comparisons around broad Claude assistant/Claude Code use versus GitHub-native coding, inline writing, Grok/X search, brand marketing, low-cost long-context Kimi, Mistral EU/open-weight deployment, Notion workspace AI, Perplexity answer/research workflows, Qwen Cloud/API evaluation, and fiction drafting. Refreshed AI Coding, AI Writing, AI Chatbots, AI Notes, and AI Search parent hubs, the source registry, `/compare/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-04: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Claude vs GitHub Copilot/Grammarly/Grok/Jasper/Kimi/Mistral AI/Notion AI/Perplexity/Qwen/Sudowrite slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 18 refreshed/top-layer HTML routes at 360, 390, 430, 768, and 1024 px plus `/llms.txt` and `/llms-full.txt`. No dead tool pages or individual news article pages were edited.

2026-06-04: Continued oldest-to-newest ledger pass after the pushed Claude specialist slice, skipping dead tool/archive rows and selecting the next live Clay automation comparison slice: `/compare/clay-vs-instantly/`, `/compare/clay-vs-intercom/`, `/compare/clay-vs-make/`, and `/compare/clay-vs-zapier/`. Verified June 4 facts from official Clay, Instantly, Intercom, Make, and Zapier sources. Rebuilt the comparisons around GTM enrichment versus cold-email execution, AI support, visual automation, and broad SaaS orchestration. Refreshed the stale Make tool page around current 3,000+ apps, MCP, AI Toolkit, AI Web Search, and Make AI Agents positioning; refreshed AI Automation, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration is complete and QA is next.

2026-06-04: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Clay vs Instantly/Intercom/Make/Zapier slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 10 refreshed/top-layer HTML routes at 360, 390, 430, 768, and 1024 px plus `/llms.txt` and `/llms-full.txt`. No dead tool pages or individual news article pages were edited.

2026-06-04: Continued oldest-to-newest ledger pass after the pushed Clay automation slice, skipping dead DALL-E/Tome/Phind/Codeium surfaces and selecting the next live Cursor coding comparison rows: `/compare/cline-vs-cursor/` and `/compare/cody-vs-cursor/`. Verified June 4 facts from official Cline, Sourcegraph/Cody, and Cursor sources. Rebuilt the comparisons around open-source BYOK agent runtime versus managed AI-native IDE, and Sourcegraph Enterprise code context versus Cursor daily implementation work. Refreshed AI Coding, source registry, `/compare/`, `/categories/`, homepage, and LLM metadata comments.

2026-06-04: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Cline/Cody vs Cursor slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 10 refreshed/top-layer/context HTML routes at 360, 390, 430, 768, and 1024 px plus `/llms.txt` and `/llms-full.txt`. No dead tool pages or individual news article pages were edited.

2026-06-04: Continued oldest-to-newest ledger pass after the pushed Cline/Cody vs Cursor slice, skipping dead DALL-E/Tome/Phind/Codeium archive rows and selecting the next live research-discovery cluster: `/compare/connected-papers-vs-consensus/`, `/compare/connected-papers-vs-elicit/`, `/compare/connected-papers-vs-nanochat/`, `/compare/connected-papers-vs-scite/`, `/compare/connected-papers-vs-semantic-scholar/`, `/compare/consensus-vs-elicit/`, `/compare/consensus-vs-nanochat/`, `/compare/consensus-vs-scite/`, and `/compare/consensus-vs-semantic-scholar/`. Verified June 4 facts from official Connected Papers, Consensus, Elicit, Scite, Semantic Scholar, nanochat/GitHub, NotebookLM, Perplexity Enterprise, and Reka sources, using conservative wording where pricing pages were client-rendered or protected. Rebuilt the comparisons around field mapping, academic Q&A, systematic-review workflow, citation-context checking, academic-search/API baselines, and educational LLM training. Refreshed nanochat and Semantic Scholar tool records, AI Research, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments. Regenerated `PAGE_REFRESH_LEDGER.md`; QA is next.

2026-06-04: Completed validation for the research-discovery comparison slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 16 refreshed/top-layer HTML routes at 360, 390, 430, 768, and 1024 px plus `/llms.txt` and `/llms-full.txt`. No dead tool pages or individual news article pages were edited.

2026-06-04: Continued oldest-to-newest ledger pass after the pushed research-discovery slice, skipping dead DALL-E/Tome/Phind/Codeium archive rows and selecting the next live Continue coding comparison cluster: `/compare/continue-vs-cursor/`, `/compare/continue-vs-devin/`, `/compare/continue-vs-github-copilot/`, and `/compare/continue-vs-val-town/`. Verified June 4 facts from official Continue, Cursor, Cognition/Devin, GitHub Copilot, Val Town, Trae, and Google Gemini Code Assist sources. Rebuilt the Continue tool page around source-controlled AI PR checks, corrected Continue licensing to Apache-2.0, refreshed the four comparisons around PR-check governance versus AI IDE, autonomous ticket worker, GitHub-native AI Credits platform, and hosted TypeScript runtime buyer jobs, and refreshed AI Coding, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments. Regenerated `PAGE_REFRESH_LEDGER.md`; QA is next.

2026-06-04: Completed validation for the Continue vs Cursor/Devin/GitHub Copilot/Val Town slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 10 refreshed/top-layer HTML routes at 360, 390, 430, 768, and 1024 px plus `/llms.txt` and `/llms-full.txt`. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Continue slice, skipping dead DALL-E/Tome/Phind/Codeium archive rows and selecting the next live Copy.ai writing comparison cluster: `/compare/copy-ai-vs-grammarly/`, `/compare/copy-ai-vs-hyperwrite/`, `/compare/copy-ai-vs-quillbot/`, `/compare/copy-ai-vs-sudowrite/`, and `/compare/copy-ai-vs-wordtune/`. Verified June 5 facts from official Copy.ai pricing/workflow pages, Superhuman/Grammarly plan and support pages, HyperWrite pricing/Personal Assistant pages, QuillBot Premium/pricing-help/affiliate pages, Sudowrite pricing/model documentation, and Wordtune pricing/plan documentation. Rebuilt the comparisons around GTM workflow automation versus inline editing, personal writing assistance, paraphrasing, fiction drafting, and sentence-level polish. Refreshed the stale QuillBot tool page, AI Writing hub, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-05: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Copy.ai vs Grammarly/HyperWrite/QuillBot/Sudowrite/Wordtune slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 11 refreshed/top-layer HTML routes at 360, 390, 430, 768, and 1024 px plus `/llms.txt` and `/llms-full.txt`. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Copy.ai writing slice, skipping dead tool/archive rows and selecting the next live Cursor comparison cluster: `/compare/cursor-vs-devin/`, `/compare/cursor-vs-gemini/`, `/compare/cursor-vs-github-copilot/`, `/compare/cursor-vs-lovable/`, `/compare/cursor-vs-tabnine/`, `/compare/cursor-vs-v0/`, `/compare/cursor-vs-val-town/`, and `/compare/cursor-vs-windsurf/`. Verified June 5 facts from official Cursor, Cognition/Devin, GitHub Copilot, Google Gemini, Lovable, Tabnine, v0/Vercel, Val Town, and Windsurf redirect sources. Rebuilt the comparisons around AI-native IDE versus asynchronous task delegation, Google AI ecosystem, GitHub-native AI Credits platform, prompt-to-app builder, privacy-first enterprise code assistant, Vercel-native app builder, instant TypeScript runtime, and Windsurf/Devin Desktop buyer risk. Refreshed stale Devin, Lovable, and Windsurf tool records, AI Coding, AI Design, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-05: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Cursor vs Devin/Gemini/GitHub Copilot/Lovable/Tabnine/v0/Val Town/Windsurf slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 17 refreshed/top-layer HTML routes at 360, 390, 430, 768, and 1024 px plus `/llms.txt` and `/llms-full.txt`. Fixed a `/tools/windsurf/` 768px fact-metadata overflow before the passing Playwright sweep. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Cursor slice, skipping dead tool/archive rows and selecting the next live Decktopus presentation cluster: `/compare/decktopus-vs-gamma/`, `/compare/decktopus-vs-pitch/`, and `/compare/decktopus-vs-presentations-ai/`. Verified June 5 facts from official Decktopus pricing/FAQ, Gamma pricing/API/presentation pages, Pitch pricing/AI-credit help, and Presentations.AI pricing/product/enterprise pages. Rebuilt the comparisons around multi-format Gamma output, Pitch team deck operations, Presentations.AI's corrected Starter/Pro/Gold pricing ladder, and Decktopus interactive presenter workflows. Refreshed Decktopus, Gamma, Pitch, and Presentations.AI tool records, AI Presentation, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-05: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Decktopus vs Gamma/Pitch/Presentations.AI slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 12 refreshed/top-layer HTML routes at 360, 390, 430, 768, and 1024 px plus `/llms.txt` and `/llms-full.txt`. Fixed a narrow-mobile tool jump-chip overflow in `ToolLayout.astro`. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Decktopus slice, skipping dead Tome/Phind/DALL-E/Codeium rows and selecting the next live DeepSeek model-family cluster: `/compare/deepseek-vs-gemini/`, `/compare/deepseek-vs-mistral-ai/`, and `/compare/deepseek-vs-qwen/`. Verified June 5 facts from official DeepSeek API pricing, Google Gemini 3.5/API/subscription pages, Mistral pricing/model/Search Toolkit docs, Qwen/Qwen Cloud pricing/model-release pages, and relevant open-weight organization pages. Rebuilt the comparisons around low-cost DeepSeek API routing versus Gemini's Google ecosystem, Mistral's EU/open-weight platform, and Qwen's Alibaba/Qwen Cloud model-family lane. Refreshed DeepSeek, Gemini, Mistral AI, and Qwen tool records, AI Chatbots, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-05: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the DeepSeek vs Gemini/Mistral AI/Qwen slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 14 refreshed/top-layer routes at 360, 390, 430, 768, and 1024 px. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed DeepSeek slice, skipping dead tool/archive rows and selecting the next live Descript voice comparison cluster: `/compare/descript-vs-elevenlabs/`, `/compare/descript-vs-fish-audio/`, `/compare/descript-vs-resemble-ai/`, and `/compare/descript-vs-voxtral/`. Verified June 5 facts from official Descript pricing/help/changelog, ElevenLabs pricing/API/model docs, Fish Audio plan/API/docs/homepage, Resemble AI pricing/products/docs/homepage, and Mistral/Voxtral pricing/model/audio docs. Rebuilt the comparisons around creator editing versus standalone voice generation, open-weight TTS, governed enterprise voice, and Mistral-native audio APIs. Refreshed Descript, ElevenLabs, Fish Audio, Resemble AI, Voxtral, AI Voice, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-05: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Descript vs ElevenLabs/Fish Audio/Resemble AI/Voxtral slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 16 refreshed/top-layer routes at 360, 390, 430, 768, and 1024 px. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Descript slice, skipping dead Phind/Tome/DALL-E tool rows and dead-tool comparison surfaces, and selecting the next live Codeium lineage row: `/compare/codeium-vs-github-copilot/`. Verified June 5 facts from official Cognition/Devin Desktop/Windsurf pricing and GitHub Copilot plan, AI Credits, and SDK sources. Rebuilt the Codeium page around Codeium -> Windsurf -> Devin Desktop lineage, rebuilt the comparison around Devin Desktop versus GitHub Copilot buyer jobs, and refreshed AI Coding, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-05: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Codeium lineage vs GitHub Copilot slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 9 refreshed/top-layer routes at 360, 390, 430, 768, and 1024 px. The initial build exposed a YAML quoting issue in Codeium frontmatter and the first QA harness exposed a local-server root-path bug; both were fixed before passing validation. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Codeium lineage slice, skipping dead tool rows and dead-tool comparison surfaces, and selecting the next live Devin coding comparison rows: `/compare/devin-vs-github-copilot/` and `/compare/devin-vs-val-town/`. Verified June 5 facts from official Cognition/Devin pricing and Desktop sources, GitHub Copilot plan/AI Credits/SDK sources, and Val Town pricing/docs. Rebuilt the comparisons around autonomous ticket delegation versus GitHub-native AI Credits/governance/SDK workflows and hosted TypeScript runtime jobs. Refreshed Val Town, AI Coding, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-05: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the Devin vs GitHub Copilot/Val Town slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 10 refreshed/top-layer routes at 360, 390, 430, 768, and 1024 px. The first QA sweep exposed mobile overflow from raw markdown comparison tables; both refreshed comparison pages now use mobile-friendly decision/pricing bullets. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Devin slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live ElevenLabs voice comparison cluster: `/compare/elevenlabs-vs-fish-audio/`, `/compare/elevenlabs-vs-heygen/`, `/compare/elevenlabs-vs-murf/`, `/compare/elevenlabs-vs-otter-ai/`, `/compare/elevenlabs-vs-resemble-ai/`, `/compare/elevenlabs-vs-synthesia/`, `/compare/elevenlabs-vs-voxtral/`, and `/compare/elevenlabs-vs-wellsaid/`. Verified June 5 facts from official ElevenLabs, Fish Audio, HeyGen, Murf, Otter.ai, Resemble AI, Synthesia, Mistral/Voxtral, and WellSaid sources. Rebuilt the comparisons around creator voice versus API value, avatar video, business narration, meeting capture, governed custom voice, Mistral-native TTS/STT, and L&D narration buyer jobs. Refreshed Murf and WellSaid tool pages, AI Voice hub, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-05: Regenerated `PAGE_REFRESH_LEDGER.md` and completed validation for the ElevenLabs vs Fish Audio/HeyGen/Murf/Otter.ai/Resemble AI/Synthesia/Voxtral/WellSaid voice slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 22 refreshed/top-layer/context HTML routes at 360, 390, 430, 768, and 1024 px plus rendered `/llms.txt` and `/llms-full.txt` checks. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed ElevenLabs voice slice, skipping dead tool rows, dead-tool comparisons, and individual news articles, and selecting the next live Elicit research comparison cluster: `/compare/elicit-vs-nanochat/`, `/compare/elicit-vs-perplexity/`, `/compare/elicit-vs-scite/`, and `/compare/elicit-vs-semantic-scholar/`. Verified June 5 facts from official Elicit pricing/product/API terms, Perplexity Pro/Max/Enterprise/API/media/agent docs, Scite pricing/product/MCP sources, Semantic Scholar product/API pages, and nanochat repository sources. Rebuilt the comparisons around paper screening/extraction, current cited web and API research, citation-context checks, free scholarly discovery/API baselines, and open-source LLM training education. Refreshed Elicit and Perplexity tool pages, AI Research and AI Search hubs, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 15 refreshed/top-layer/context HTML routes at 360, 390, 430, 768, and 1024 px plus rendered `/llms.txt` and `/llms-full.txt` checks. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Elicit research slice, skipping dead Phind comparison rows and individual news articles, and selecting the next live Exa AI search/API comparison cluster: `/compare/exa-vs-kagi/`, `/compare/exa-vs-perplexity/`, and `/compare/exa-vs-you-com/`. Verified June 5 facts from official Exa pricing/API docs, Kagi pricing/plan/Assistant/Research docs, You.com pricing/API docs, and already-current Perplexity pricing/API/Max sources. Rebuilt the comparisons around semantic retrieval infrastructure versus paid private search, cited answer engines, and broader grounding/research APIs; refreshed Exa, Kagi, You.com, AI Search, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright QA for 12 refreshed/top-layer/context HTML routes at 360, 390, 430, 768, and 1024 px plus rendered `/llms.txt` and `/llms-full.txt` checks. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Exa search/API slice, skipping dead tool rows, dead-tool comparisons, and individual news articles, and selecting the next live Figma design comparison cluster: `/compare/figma-vs-google-stitch/`, `/compare/figma-vs-lovable/`, `/compare/figma-vs-midjourney/`, and `/compare/figma-vs-v0/`. Verified June 5 facts from official Figma pricing/AI credit/Make docs, Google Stitch official Labs/March/May update sources, Lovable pricing/docs, Midjourney plan/version docs, and v0/Vercel pricing docs. Rebuilt the comparisons around production design systems versus Labs UI exploration, app-builder MVPs, visual ideation, and Vercel-native app implementation. Refreshed Figma, Google Stitch, Midjourney, AI Design, AI Image, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 13 refreshed/top-layer routes at 360, 390, 430, 768, 1024, and 1366 px plus scoped rendered-content and `/llms.txt`/`/llms-full.txt` checks. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Figma design slice, skipping dead tool rows, dead-tool comparisons, and individual news articles, and selecting the next live Fireflies notes comparison cluster: `/compare/fireflies-vs-notebooklm/`, `/compare/fireflies-vs-obsidian/`, `/compare/fireflies-vs-otter-ai/`, and `/compare/fireflies-vs-readwise/`. Verified June 5 facts from official Fireflies pricing/pricing-guide/AI-credit sources, NotebookLM upgrade and Google AI Plans sources, Obsidian pricing/community plugin sources, Otter pricing/OtterPilot sources, and Readwise pricing/Reader/Ghostreader sources. Rebuilt the comparisons around meeting capture versus source-grounded research notebooks, local-first Markdown PKM, live transcription/Otter MCP, and reading-retention workflows; removed unsupported hidden-model claims. Refreshed Fireflies, NotebookLM, Obsidian, Otter.ai, Readwise, AI Notes, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run guard:check`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 14 refreshed/top-layer routes at 360, 390, 430, 768, 1024, and 1366 px plus scoped rendered-content and `/llms.txt`/`/llms-full.txt` checks. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Fireflies notes slice, skipping dead tool rows, dead-tool comparisons, and individual news articles, and selecting the next live Fish Audio voice comparison rows: `/compare/fish-audio-vs-resemble-ai/` and `/compare/fish-audio-vs-voxtral/`. Verified June 5 facts from official Fish Audio plan/API docs, Resemble AI pricing/product pages, and Mistral pricing/Voxtral TTS/audio docs. Rebuilt the comparisons around OpenAudio S1/S2 open-weight TTS control versus Resemble AI voice governance and versus Mistral-native Voxtral TTS/STT; corrected the former Voxtral STT-only framing. Refreshed AI Voice, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 10 refreshed/top-layer routes at 360, 390, 430, 768, 1024, and 1366 px plus rendered-content and `/llms.txt`/`/llms-full.txt` checks. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Flux image slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live Frase SEO comparison cluster: `/compare/frase-vs-marketmuse/`, `/compare/frase-vs-neuronwriter/`, `/compare/frase-vs-semrush/`, and `/compare/frase-vs-surfer-seo/`. Verified June 5 facts from official Frase pricing/AI Visibility docs, MarketMuse pricing/inventory/briefs pages, NeuronWriter pricing/features/affiliate pages, Semrush One/pricing/subscription/AI Visibility docs, Surfer pricing/help/Topical Map docs, and Ahrefs pricing/Brand Radar sources. Rebuilt the Frase comparisons around SEO/GEO workflow consolidation versus MarketMuse strategy, NeuronWriter budget scoring, Semrush suite/AI Visibility Toolkit packaging, and Surfer content optimization. Playwright QA exposed stale related comparison cards on the involved tool pages, so the slice expanded to refresh adjacent MarketMuse/NeuronWriter/Semrush/Surfer/Ahrefs SEO comparison cards and the Surfer SEO tool page. Refreshed Frase, MarketMuse, NeuronWriter, Semrush, Surfer SEO, AI SEO, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 23 refreshed/top-layer routes at 360, 390, 430, 768, 1024, and 1366 px. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Frase SEO slice, skipping dead Tome/Phind/DALL-E tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live AI Presentation comparison cluster: `/compare/gamma-vs-pitch/`, `/compare/gamma-vs-presentations-ai/`, and `/compare/pitch-vs-presentations-ai/`. Verified June 5 facts from official Gamma pricing/AI presentation sources, Pitch pricing/use-case/AI credit sources, and Presentations.AI product/pricing sources. Rebuilt the comparisons around Gamma prompt-to-deck/multi-format output, Pitch team deck workflow, and Presentations.AI business PowerPoint-ready generation with the current Starter/Pro/Gold pricing ladder. Refreshed the Pitch AI source URL, Presentations.AI old-price structured data, AI Presentation hub, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 13 refreshed/top-layer routes at 360, 390, 430, 768, 1024, and 1366 px plus scoped rendered-content checks. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed small-business/student/teacher/writer guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, `/dead/` routes, and individual news articles. Refreshed the next live May 13 guide rows: `/guides/best-ai-tools-under-10-month/` (kept noindex archive), `/guides/best-ai-tools-under-20-month/`, `/guides/best-ai-tools-under-50-month/` (kept noindex archive), and `/guides/best-ai-video-generator/`. Verified June 2026 facts from official/source-backed OpenAI ChatGPT pricing, Anthropic Claude plan, GitHub Copilot plan/AI Credits, Cursor pricing, Google AI subscription, Suno pricing/v5.5, Freepik pricing, ElevenLabs pricing, ByteDance/BytePlus Seedance, Kuaishou/Kling, Google Veo/Gemini API pricing, Runway, Pika, and HeyGen sources. Rebuilt the pages around first-paid-plan sequencing, noindex merge routes for broad budget archives, and a mobile-first AI video buyer map that separates Seedance, Kling, Veo, Runway, Pika, HeyGen, Synthesia, and avatar video. Updated AI Video, AI Chatbots, AI Coding, AI Music, AI Image, AI Voice, AI Writing, `/guides/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Passing commands: focused stale-marker sweep, `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `$env:AIPEDIA_LEDGER_DATE='2026-06-06'; npm run check`, `npm run build:fast`, in-app Browser responsive QA for 14 refreshed/top-layer HTML routes at 360, 390, 430, 768, 1024, and 1366 px, and local HTTP checks for `/llms.txt`, `/llms-full.txt`, and `/sitemap-0.xml`. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Gamma presentation slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live Gemini comparison cluster: `/compare/gemini-vs-github-copilot/`, `/compare/gemini-vs-grok/`, `/compare/gemini-vs-mistral-ai/`, `/compare/gemini-vs-perplexity/`, and `/compare/gemini-vs-qwen/`. Verified June 5 facts from official Google Gemini subscription/API sources, GitHub Copilot plan/AI Credits docs, xAI Grok model/billing sources, Mistral pricing/model/search docs, Perplexity pricing/API docs, and Qwen/Qwen Cloud pricing/model sources. Rebuilt the comparisons around Google-native assistant work versus GitHub-native coding, X-native social context, EU/open-model platform control, cited open-web research, and Alibaba/Qwen Cloud model-family control. Refreshed AI Chatbots, AI Coding, AI Search, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 20 refreshed/top-layer/context routes at 360, 390, 430, 768, 1024, and 1366 px plus scoped stale-marker checks. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Gemini comparison slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live GitHub Copilot coding comparison cluster: `/compare/github-copilot-vs-supermaven/`, `/compare/github-copilot-vs-tabnine/`, and `/compare/github-copilot-vs-val-town/`. Verified June 5 facts from official GitHub Copilot plans/AI Credits/model-pricing docs, Supermaven pricing/homepage, Tabnine pricing/code-privacy pages, and Val Town pricing/docs. Rebuilt the comparisons around Copilot's GitHub-native AI Credits/governance platform versus Supermaven's latency-first autocomplete, Tabnine's privacy-first deploy-anywhere code assistant, and Val Town's hosted TypeScript vals/runtime lane. Refreshed AI Coding, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, stale-marker `rg` for the refreshed comparisons, `npm run check:news`, `npm run audit:sources`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 14 refreshed/top-layer/context routes at 360, 390, 430, 768, 1024, and 1366 px plus rendered `/llms.txt` and `/llms-full.txt` checks. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed GitHub Copilot comparison slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live Google Stitch design comparison rows: `/compare/google-stitch-vs-lovable/` and `/compare/google-stitch-vs-v0/`. Verified June 5 facts from official Google Stitch/Labs, Lovable pricing/plans/Cloud/GitHub, and v0/Vercel pricing/docs sources. Rebuilt the comparisons around Google Labs UI exploration versus Lovable full-stack app building and v0 Vercel-native app generation. Refreshed AI Design, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, stale-marker `rg` for the refreshed comparisons, `npm run check:news`, `npm run audit:sources`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 12 refreshed/top-layer/context routes at 360, 390, 430, 768, 1024, and 1366 px plus rendered `/llms.txt` and `/llms-full.txt` checks. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Google Stitch design slice, skipping dead Tome/Phind/DALL-E rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live Grammarly writing comparison cluster: `/compare/grammarly-vs-hyperwrite/`, `/compare/grammarly-vs-quillbot/`, `/compare/grammarly-vs-sudowrite/`, and `/compare/grammarly-vs-wordtune/`. Verified June 5 facts from official Grammarly/Superhuman support, plans, AI, and Business sources; HyperWrite pricing and Personal Assistant sources; QuillBot Premium/pricing-help sources; Sudowrite pricing/Muse/model docs; and Wordtune plans, help-center, and Business billing sources. Rebuilt the comparisons around Grammarly's inline editing layer versus HyperWrite's Chrome writing agent, QuillBot's paraphrasing/citation utility, Sudowrite's Muse fiction workspace, and Wordtune's low-cost voice-preserving rewrite layer. Refreshed AI Writing, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, stale-marker `rg` for the refreshed comparisons, `npm run check:news`, `npm run audit:sources`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 16 refreshed/top-layer/context routes at 360, 390, 430, 768, 1024, and 1366 px plus rendered `/llms.txt` and `/llms-full.txt` checks. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed Grammarly writing slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live AI video comparison cluster: `/compare/hailuo-vs-kling/`, `/compare/heygen-vs-kling/`, `/compare/heygen-vs-pika/`, `/compare/heygen-vs-runway/`, `/compare/heygen-vs-seedance/`, and `/compare/heygen-vs-synthesia/`. Verified June 5 facts from official HeyGen pricing/API docs, Kling/Kuaishou surfaces, Pika pricing, Runway pricing/API docs, Seedance/BytePlus docs, Synthesia pricing/security docs, and MiniMax/Hailuo docs. Rebuilt the comparisons around avatar/localization work versus generative video model control, corrected stale HeyGen Pro and Runway heavy-plan pricing, refreshed HeyGen, Runway, AI Video, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands so far: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, stale-marker `rg` for the refreshed comparisons, `npm run check:news`, `npm run audit:sources`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 15 refreshed/top-layer/context routes at 360, 390, 430, 768, 1024, and 1366 px plus rendered `/llms.txt` and `/llms-full.txt` checks. No dead tool pages or individual news article pages were edited.

2026-06-05: Continued oldest-to-newest ledger pass after the pushed AI video slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live HyperWrite writing comparison rows: `/compare/hyperwrite-vs-quillbot/`, `/compare/hyperwrite-vs-sudowrite/`, and `/compare/hyperwrite-vs-wordtune/`. Verified June 5 facts from official HyperWrite pricing/Personal Assistant pages, QuillBot Premium/pricing-help sources, Sudowrite pricing/prose-mode sources, and Wordtune plan/pricing sources. Rebuilt the comparisons around Chrome-native drafting and Personal Assistant workflows versus paraphrasing utilities, fiction workflow, and low-cost voice-preserving rewrites; removed unsupported model/context-window claims. Refreshed HyperWrite, AI Writing, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, stale-marker `rg` for the refreshed comparisons, direct primary-source liveness checks for vendor pricing/product URLs, `npm run check:news`, `npm run audit:sources`, `npm run guard:check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 11 refreshed/top-layer/context routes at 360, 390, 430, 768, 1024, and 1366 px plus rendered `/llms.txt` and `/llms-full.txt` checks. The in-app browser handle was present but disconnected, so local Playwright was used against the built static site; local Vercel analytics script 404s and the pre-existing static `/api/reviews/for/hyperwrite` 404 were observed without page/layout failures. No dead tool pages or individual news article pages were edited.

2026-06-05: Finished today's automation comparison slice after the pushed image-comparison work, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles. Refreshed `/compare/instantly-vs-intercom/`, `/compare/instantly-vs-make/`, `/compare/instantly-vs-zapier/`, `/compare/intercom-vs-make/`, `/compare/intercom-vs-zapier/`, and `/compare/n8n-vs-make-vs-zapier/` around outbound email, customer-support automation, visual scenario building, broad no-code SaaS automation, and self-hosted workflow ownership. Re-verified Instantly, Intercom, Make, n8n, and Zapier June 5 source context; refreshed the Instantly and n8n tool pages, AI Automation hub, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Removed stale future-model language from n8n and avoided individual news article edits. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale-marker `rg`, `npm run check:news`, `npm run audit:sources`, `npm run guard:check` via `npm run check`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 18 refreshed/top-layer routes at 360, 390, 430, 768, 1024, and 1366 px. The in-app browser connection still failed on `browser.documentation()`, so the static Playwright fallback was used against the built site.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed AI Search slice, skipping dead Tome/Phind/DALL-E tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live AI Video model/workflow cluster: `/compare/kling-vs-pika/`, `/compare/kling-vs-seedance-vs-runway/`, `/compare/kling-vs-synthesia/`, `/compare/pika-vs-runway/`, `/compare/pika-vs-seedance/`, `/compare/pika-vs-synthesia/`, `/compare/runway-vs-synthesia/`, `/compare/runway-vs-veo/`, `/compare/seedance-vs-synthesia/`, `/compare/veo-vs-kling/`, and `/compare/veo-vs-seedance/`. Verified June 6 facts from official Kling/Kuaishou, Pika, Runway, ByteDance Seed/BytePlus, Synthesia, and Google Veo sources. Refreshed the comparisons around cinematic model testing, social effects, production workflow, ByteDance/Google API routes, and avatar-led business video; refreshed Kling, Pika, Runway, Seedance, Synthesia, Veo, AI Video, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`; validation and QA are next.

2026-06-06: Completed validation for the AI Video model/workflow slice. Passing commands: `npm run ledger:pages:check`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, in-app browser smoke QA for `/compare/kling-vs-pika/`, and local-HTTP Playwright QA for 22 refreshed/top-layer/context HTML routes at 360, 390, 430, 768, 1024, and 1366 px plus rendered `/llms.txt` and `/llms-full.txt` checks. The first QA harness run had an over-broad freshness assertion on archive pages only; the corrected sweep passed with no horizontal overflow, missing main content, or missing refreshed-page date markers. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed AI Video model/workflow slice, skipping dead Tome/Phind/DALL-E tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live AI Design app-builder row: `/compare/lovable-vs-bolt-vs-v0/`. Verified June 6 facts from official Lovable pricing/plans/Cloud docs, Bolt pricing/build/database/token/supported-technology docs, and v0 pricing/docs plus Vercel's token-metering announcement. Refreshed the comparison around founder MVP, browser-native build/run/debug, and Vercel-native web-artifact buyer paths; corrected stale v0 Max Fast token pricing to $10 input and $50 output per 1M tokens; refreshed Lovable, Bolt.new, v0, AI Design, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`; validation and QA are next.

2026-06-06: Completed validation for the Lovable vs Bolt.new vs v0 app-builder slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale-marker `rg` checks, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, in-app browser mobile smoke QA for `/compare/lovable-vs-bolt-vs-v0/`, and local-HTTP Playwright QA for refreshed child pages, top-layer pages, `/llms.txt`, and `/llms-full.txt` at 360, 390, 430, 768, 1024, and 1366 px. The first LLM text QA assertion was too strict for source-only LLM maintenance comments; the corrected route-specific check passed. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed app-builder slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live AI Chatbots model-platform row: `/compare/mistral-ai-vs-qwen/`. Verified June 6 facts from official Mistral pricing/model/Mistral 3/Search Toolkit sources and Qwen Cloud pricing/model-release/qwen3.7-max promotion/Qwen3 sources. Rebuilt the comparison around EU vendor/platform control versus Alibaba/Qwen Cloud/model-family evaluation; refreshed Mistral AI, Qwen, AI Chatbots, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`; regenerated the ledger and completed validation. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale-marker `rg` checks, source-registry JSON parse, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, in-app browser mobile smoke QA for `/compare/mistral-ai-vs-qwen/`, and local-HTTP Playwright QA for 8 refreshed/top-layer HTML routes at 360, 390, 430, 768, 1024, and 1366 px plus `/llms.txt` and `/llms-full.txt`. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed Mistral AI vs Qwen slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live AI Music rows: `/compare/mubert-vs-suno/` and `/compare/mubert-vs-udio/`. Verified June 6 facts from official Mubert pricing/FAQ surfaces, Suno pricing/v5.5 sources, Udio credit/download-transition help center sources, Udio Warner licensing post, ElevenLabs Music v2 source context, and Stable Audio pricing/source context. Rebuilt the two comparisons around background-music licensing versus full-song generation, corrected stale Suno pricing/model language, promoted Udio's disabled-download warning, softened unverifiable Mubert/Udio exact-price claims into live-pricing cautions, refreshed Mubert, Suno, Udio, AI Music, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-06: Completed validation for the Mubert/Suno/Udio AI Music slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale-marker `rg` checks, source-registry JSON parse, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for refreshed child pages, affected top-layer pages, `/llms.txt`, and `/llms-full.txt` at 360, 390, 430, 768, 1024, and 1366 px. The first QA overflow heuristic flagged hidden/off-screen elements, but the corrected actual-scroll sweep passed with no horizontal overflow. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed AI Music slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live AI Research rows: `/compare/nanochat-vs-scite/` and `/compare/nanochat-vs-semantic-scholar/`. Verified June 6 facts from the nanochat GitHub repository/README/API metadata, Scite official/pricing surfaces, and Semantic Scholar homepage/API overview. Rebuilt the comparisons around LLM training education versus citation-context evidence checking and free academic search/API discovery; refreshed nanochat, Scite, Semantic Scholar, AI Research, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`; validation and QA are next.

2026-06-06: Completed validation for the nanochat/Scite/Semantic Scholar AI Research slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale-marker `rg` checks, source-registry JSON parse, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for refreshed child pages, affected top-layer pages, `/llms.txt`, and `/llms-full.txt` at 360, 390, 430, 768, 1024, and 1366 px. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed AI Research slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live AI Notes cluster: `/compare/notebooklm-vs-obsidian/`, `/compare/notebooklm-vs-otter-ai/`, `/compare/notebooklm-vs-readwise/`, `/compare/notion-ai-vs-obsidian/`, `/compare/obsidian-vs-otter-ai/`, `/compare/obsidian-vs-readwise/`, and `/compare/otter-ai-vs-readwise/`. Verified June 6 facts from official Google NotebookLM help/plans, Notion pricing/AI/custom-agent/meeting-notes docs, Obsidian pricing/help/plugin docs, Otter.ai pricing/OtterPilot sources, and Readwise Reader/Ghostreader/pricing sources. Rebuilt the comparisons around source-grounded notebook analysis, cloud workspace AI, local-first Markdown PKM, live meeting transcription, and reading-retention workflows; corrected stale unsupported model/version/context-window claims; refreshed NotebookLM, Notion AI, Obsidian, Otter.ai, Readwise, AI Notes, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, source-registry JSON parse, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, local-HTTP responsive QA for refreshed child pages and affected top-layer pages at 360, 390, 430, 768, 1024, and 1366 px, plus corrected rendered `/llms.txt` and `/llms-full.txt` checks. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed AI Notes cluster, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and selecting the next live leftover May 13 comparison rows: `/compare/perplexity-vs-chatgpt/`, `/compare/quillbot-vs-sudowrite/`, `/compare/quillbot-vs-wordtune/`, `/compare/resemble-ai-vs-voxtral/`, `/compare/scite-vs-semantic-scholar/`, `/compare/sudowrite-vs-wordtune/`, and `/compare/suno-vs-udio/`. Verified June 6 facts from official OpenAI/ChatGPT, Perplexity, QuillBot, Sudowrite, Wordtune, Resemble AI, Mistral/Voxtral, Scite, Semantic Scholar, Suno, and Udio/Warner sources. Rebuilt the comparisons around cited answer work, writing utilities versus fiction/polish workflows, enterprise voice governance versus Mistral audio APIs, citation-context evidence checking versus free academic discovery, and Suno production suitability versus Udio's disabled-download transition. Refreshed AI Writing, AI Voice, AI Music, AI Search, and AI Research hubs, source registry, `/compare/`, `/tools/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Added category Markdown table containment and contained the `/tools/` category chip rail after responsive QA found phone-width overflow. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, source-registry JSON parse, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 16 refreshed/top-layer routes at 360, 390, 430, 768, 1024, and 1366 px. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed cross-category comparison slice, skipping dead tool rows, dead-tool comparison surfaces, and individual news articles, and refreshing the next live static trust surface: `/disclosure/`. Rechecked current FTC Endorsement Guides staff guidance, FTC advertisement endorsement topic guidance, and ASA/CAP affiliate-marketing guidance. Rewrote the page around clearer buyer-facing affiliate disclosure, editorial independence, commercial CTA disclosure behavior, `rel="sponsored"` affiliate CTA alignment, no sponsored reviews/paid ranking claim, and current regulatory source links. Refreshed the homepage trust-link verification date, added affiliate disclosure to the full LLM manifest canonical entries, updated LLM maintenance comments, and regenerated `PAGE_REFRESH_LEDGER.md`. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:links`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for `/disclosure/`, `/`, `/llms.txt`, and `/llms-full.txt` at 360, 390, 430, 768, 1024, and 1366 px where applicable. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed disclosure slice, skipping dead Phind/Tome/DALL-E tool rows, `/dead/` archive surfaces, dead-tool comparison rows, and individual news articles, and selecting the first May 13 guide rows: `/guides/ai-agency-stack/`, `/guides/ai-content-creator-stack/`, `/guides/ai-content-pipeline/`, and `/guides/ai-customer-support/`. Rechecked June 2026 official/source surfaces for n8n, Zapier, Make, OpenAI/ChatGPT, Claude/Anthropic, ElevenLabs, Retell AI, Browserbase, Lovable, v0, Perplexity, HeyGen, Runway, Descript, Canva, Suno, Intercom, and support/automation guide consolidation context. Refreshed the two live stack guides around current buying order, credit/usage caution, and the June 15 Claude Agent SDK / `claude -p` billing split; kept the two noindex merge pages archived with June 6 source hygiene instead of reactivating duplicate pages. Updated `/guides/`, AI Automation parent guidance, homepage metadata comments, and LLM metadata comments; ledger regeneration and QA are next.

2026-06-06: Completed validation for the first May 13 guide stack slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale-date/link sweeps, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for `/guides/ai-agency-stack/`, `/guides/ai-content-creator-stack/`, `/guides/ai-content-pipeline/`, `/guides/ai-customer-support/`, `/guides/`, `/categories/ai-automation/`, homepage, `/llms.txt`, and `/llms-full.txt` at 360, 390, 430, 768, 1024, and 1366 px where applicable. The first rendered QA pass caught that `/guides/` had June freshness only in metadata; added visible "Updated June 2026" text to the hero rank label, rebuilt, and the corrected sweep passed. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed first guide-stack slice, skipping dead tool pages, dead-tool comparison surfaces, `/dead/` archive surfaces, and individual news articles, and selecting the next live May 13 guide rows: `/guides/ai-lead-generation/` and `/guides/ai-solo-founder-stack/`. Verified June 6 facts from official Apollo credit docs, Clay pricing/action-credit docs, Amplemarket 2026 pricing explainer, Instantly pricing, n8n pricing, Cursor pricing, ChatGPT Plus help, Anthropic Claude Agent SDK billing docs, GitHub Copilot June 1 billing changelog/docs, Lovable pricing/credits docs, Bolt pricing/token docs, Intercom pricing/outcomes docs, Notion AI/custom-agent credit copy, and Gamma credit docs. Refreshed both guides around current credit, execution, outcome, and agent-billing economics; updated AI Automation and AI Coding parent hubs plus `/guides/`, homepage, and LLM maintenance comments; ledger regeneration and QA are next. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed lead-generation/solo-founder guide slice, skipping dead tool pages, dead-tool comparison surfaces, `/dead/` archive surfaces, and individual news articles, and selecting the next live May 13 guide rows: `/guides/best-ai-avatar-video-generator/` and `/guides/best-ai-coding-assistant/`. Verified June 2026 facts from official HeyGen pricing/API docs, Synthesia pricing/credits docs, Tavus pricing/CVI sources, D-ID Studio/API pricing, Hedra pricing, Argil pricing, Captions pricing, Cursor pricing/features, Anthropic Claude Code/Max/Agent SDK docs, GitHub Copilot plans/billing/changelog docs, Windsurf/Devin Desktop sources, and OpenAI Codex sources. Refreshed both guides around credit/minute/API/concurrency economics, Copilot AI Credits, Claude Agent SDK credit split, Codex agent-workflow positioning, Windsurf/Devin Desktop lineage, and mobile-friendly buyer guidance; updated AI Video and AI Coding parent hubs plus `/guides/`, homepage, and LLM maintenance comments; ledger regeneration and QA are next. No dead tool pages or individual news article pages were edited.

2026-06-06: Completed validation for the avatar-video and coding-assistant guide slice. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale-date sweeps, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for `/guides/best-ai-avatar-video-generator/`, `/guides/best-ai-coding-assistant/`, `/guides/`, `/categories/ai-video/`, `/categories/ai-coding/`, homepage, `/llms.txt`, and `/llms-full.txt` at 360, 390, 430, 768, 1024, and 1366 px where applicable. The first QA pass exposed that homepage June freshness was only in metadata/comments, so a visible June 2026 homepage refresh strip was added and the corrected responsive sweep passed. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed avatar-video/coding guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, and individual news articles, and selecting the next live May 13 guide rows: `/guides/best-ai-for-academic-writing/`, `/guides/best-ai-for-ad-copy/`, `/guides/best-ai-for-api-documentation/`, and `/guides/best-ai-for-blog-writing/`. Verified June 2026 facts from official ChatGPT/OpenAI business, Claude/Agent SDK, Jasper, AdCreative.ai, Copy.ai, Unbounce, Mintlify, Stainless, Speakeasy, ReadMe, Surfer SEO, Elicit, Semantic Scholar, Scite, Grammarly, QuillBot, and NotebookLM sources. Refreshed the four guides around current plan/credit/API/source-discipline buying decisions, replaced wide guide tables with mobile-friendly bullets where needed, removed stale unsupported GPT-5.5 language, updated AI Writing, AI Research, and AI Coding parent hubs plus `/guides/`, `/categories/`, homepage, writing answer surfaces, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale-marker `rg`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 14 refreshed/top-layer/LLM routes at 360, 390, 430, 768, 1024, and 1366 px. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed academic/ad/API/blog guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, and individual news articles, and selecting the next live May 13 guide rows: `/guides/best-ai-for-book-writing/`, `/guides/best-ai-for-brainstorming/`, `/guides/best-ai-for-citations/`, and `/guides/best-ai-for-code-review/`. Verified June 2026 facts from official ChatGPT/OpenAI business, Claude/Agent SDK/model docs, Google AI/Workspace/NotebookLM, Sudowrite, Grammarly, Scite, Semantic Scholar, Elicit, Perplexity, Consensus, CodeRabbit, Qodo, GitHub Copilot, and Cursor Bugbot sources. Refreshed the four guides around manuscript workflow limits, source-grounded brainstorming, citation integrity, and now-live Copilot AI Credits plus Actions-minute review billing; removed stale GPT-5.5 brainstorming language; converted citations/code-review decision tables and prompt code blocks into mobile-friendly stacked guidance; updated AI Writing, AI Research, AI Coding, `/guides/`, `/categories/`, homepage, writing answer surfaces, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale-marker and table sweeps, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 14 refreshed/top-layer/LLM routes at 360, 390, 430, 768, 1024, and 1366 px. The first QA sweep exposed long prompt code-block overflow on the code-review guide; prompts were converted to wrapped quote blocks, rebuilt, and the corrected sweep passed. No dead tool pages or individual news article pages were edited.

### 15. Final report

The June AI news catch-up is complete for the verified June 1-3 window, with June 4 checked before final QA. The work adds daily coverage, current source citations, related-tool links, buyer implications, parent-surface maintenance, generated news imagery, and ledger/source-registry updates. Individual news article rows remain intentionally excluded from `PAGE_REFRESH_LEDGER.md`; the news hub and RSS rows are tracked and current.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed book/brainstorming/citations/code-review guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, and individual news articles. Refreshed the next live May 13 guide rows: `/guides/best-ai-for-cold-email/`, `/guides/best-ai-for-cover-letters/`, `/guides/best-ai-for-data-analysis/`, and `/guides/best-ai-for-debugging/`. Verified June 2026 facts from official Apollo, Instantly, Clay, Amplemarket, ChatGPT/OpenAI, Claude/Anthropic, Google AI/Workspace, Grammarly, Hex, Julius, Rows, Perplexity, Cursor, GitHub Copilot, Claude Code, and OpenAI Codex sources. Rebuilt the guides around outbound credit/action economics, job-application privacy and unsupported-claim checks, data-workflow reproducibility, and now-live Copilot AI Credits plus Actions-minutes review billing. Updated AI Automation, AI Writing, AI Research, AI Coding, `/guides/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale-marker sweeps, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 13 refreshed/top-layer/LLM routes at 360, 390, 430, 768, 1024, and 1366 px. The first QA harness flagged intentional horizontal scrollers on `/guides/` and homepage plus an over-strict `/categories/` visible marker; the corrected page-level overflow and marker sweep passed. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed cold-email/cover-letter/data-analysis/debugging slice, skipping dead tool pages, dead-tool comparison/archive surfaces, and individual news articles. Refreshed the next live May 13 guide rows: `/guides/best-ai-for-email-writing/`, `/guides/best-ai-for-excel/`, `/guides/best-ai-for-headshots/`, and `/guides/best-ai-for-instagram/`. Verified June 2026 facts from official ChatGPT/OpenAI business/image-generation, Claude/Anthropic plan, Google AI/Workspace/Gmail, Grammarly, Microsoft 365 Copilot/Excel, Rows, Julius, Midjourney, Canva, AdCreative.ai, Runway, and Meta Edits sources. Rebuilt the guides around inbox drafting, spreadsheet verification, likeness trust, and Instagram production/paid-social/Reels workflows; removed stale GPT-5.5 and ChatGPT Images 2.0 source claims; converted wide guide tables and prompt code blocks into mobile-friendly stacked guidance. Updated AI Writing, AI Design, `/guides/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale-marker sweeps, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 11 refreshed/top-layer/LLM routes at 360, 390, 430, 768, 1024, and 1366 px. The first QA pass exposed over-strict markers and the `/llms-full.txt` recent-maintenance runtime sentence lagging behind the source comments; corrected the runtime sentence, rebuilt, and the corrected responsive sweep passed. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed email/excel/headshots/Instagram guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, and individual news articles. Refreshed the next live May 13 guide rows: `/guides/best-ai-for-interview-prep/`, `/guides/best-ai-for-legal-research/` (kept noindex archive), `/guides/best-ai-for-linkedin/`, and `/guides/best-ai-for-logo-design/`. Verified June 2026 facts from official Yoodli, Interviewing.io, ChatGPT/OpenAI, Claude/Anthropic, NotebookLM/Google, Cursor, Perplexity, Gemini, LinkedIn, Canva, Apollo, Grammarly, Ideogram, Recraft, Midjourney, Adobe Firefly, Thomson Reuters CoCounsel, Spellbook, Harvey, and Claude for Legal sources. Rebuilt the pages around ethical interview prep, legal AI noindex/rebuild criteria, LinkedIn authenticity and profile-assist limits, and logo concepting/vector/trademark risk. Updated AI Writing, AI Research, AI Design, `/guides/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale-marker/table/code-block sweeps, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 12 refreshed/top-layer/LLM routes at 360, 390, 430, 768, 1024, and 1366 px. The first standalone QA attempt hit a stopped server and the first embedded sweep used an over-strict `/categories/` marker; the corrected embedded static-server sweep passed. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed career/brand guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, `/dead/` routes, and individual news articles. Refreshed the next live May 13 guide rows: `/guides/best-ai-for-medical-research/` (kept noindex archive), `/guides/best-ai-for-newsletter-writers/`, `/guides/best-ai-for-photo-editing/`, and `/guides/best-ai-for-podcasters/`. Verified June 2026 facts from official FDA, NIH, OpenAI GPT-Rosalind/Rosalind Biodefense, Elicit, Scite, Semantic Scholar, ChatGPT/OpenAI, Claude/Anthropic, beehiiv, NotebookLM/Google, Fathom, Perplexity, Grammarly, Adobe Firefly/Photoshop, Canva, Midjourney, Descript, Castmagic, ElevenLabs, Riverside, and YouTube disclosure sources. Rebuilt the pages around medical noindex/rebuild criteria, newsletter writing/publishing/source-pack/interview workflows, photo-editing production and rights checks, and podcast editing/repurposing/synthetic-voice disclosure. Updated AI Research, AI Writing, AI Image, AI Voice, `/guides/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`; widened the god-tier hero mobile breadcrumb wrap breakpoint after responsive QA found a long guide title overflow at 430 px. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale/table/code sweeps, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 13 refreshed/top-layer/LLM routes at 360, 390, 430, 768, 1024, and 1366 px. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed medical/newsletter/photo/podcast guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, `/dead/` routes, and individual news articles. Refreshed the next live May 13 guide rows: `/guides/best-ai-for-presentations/`, `/guides/best-ai-for-resume-writing/`, `/guides/best-ai-for-social-media-posts/`, and `/guides/best-ai-for-sql-queries/`. Verified June 2026 facts from official Gamma, Canva, Pitch, Beautiful.ai, Prezi, Decktopus, Presentations.AI, Napkin AI, ChatGPT/OpenAI, Claude/Anthropic, Google/Gemini, Grammarly, AdCreative.ai, Jasper, Copy.ai, OpusClip, Cursor, Hex, and Julius sources. Rebuilt the guides around deck export/AI credits, resume privacy and fake-metric risk, social creative production and paid-social tracking, and SQL verification/credit/connectors discipline. Updated AI Presentation, AI Writing, AI Design, AI Coding, `/guides/`, `/categories/`, homepage, LLM surfaces, `PAGE_REFRESH_LEDGER.md`, and `CategoryLayout.astro` source-link wrapping after mobile QA exposed long category source URL overflow. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale/table/code sweeps, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 13 refreshed/top-layer/LLM routes at 360, 390, 430, 768, 1024, and 1366 px. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed presentation/resume/social/SQL guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, `/dead/` routes, and individual news articles. Refreshed the next live May 13 guide rows: `/guides/best-ai-for-summarization/`, `/guides/best-ai-for-tiktok/`, `/guides/best-ai-for-transcription/`, and `/guides/best-ai-for-translation/`. Verified June 2026 facts from official ChatGPT/OpenAI, Claude/Anthropic, Google AI/Gemini, NotebookLM, DeepL, Google Cloud Translation, Fathom, Fireflies, Otter.ai, Readwise, Runway, OpusClip, Captions, HeyGen, InVideo, CapCut, Descript, Deepgram, AssemblyAI, and ElevenLabs sources. Rebuilt the guides around source-grounded summarization, TikTok production/disclosure, meeting-vs-creator-vs-API transcription, and professional/API translation workflows. Updated AI Writing, AI Notes, AI Video, AI Voice, `/guides/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Passing commands: focused stale/table/code sweeps, `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 13 refreshed/top-layer/LLM routes at 360, 390, 430, 768, 1024, and 1366 px. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed summarization/TikTok/transcription/translation slice, skipping dead tool pages, dead-tool comparison/archive surfaces, `/dead/` routes, and individual news articles. Refreshed the next live May 13 guide rows: `/guides/best-ai-for-unit-tests/`, `/guides/best-ai-for-youtube-creators/`, `/guides/best-ai-music-generator/`, and `/guides/best-ai-tools-for-accountants/`. Verified June 2026 facts from official Cursor, GitHub Copilot, Claude/Claude Code, Descript, ChatGPT/OpenAI, Canva, ElevenLabs, OpusClip, Runway, Midjourney, Gemini, YouTube disclosure, Suno, Udio, AIVA, Mubert, Stable Audio, Boomy, Microsoft 365 Copilot/Excel, Google Workspace AI, Xero JAX, Intuit Assist, and Perplexity sources. Rebuilt the guides around test-assertion quality and AI-credit-aware coding usage, YouTube creator media-hour/credit/rights/disclosure buying decisions, AI-music licensing/export risk with Udio's disabled-download transition, and accounting client-data/audit-trail governance. Updated AI Coding, AI Video, AI Voice, AI Image, AI Music, AI Automation, AI Writing, `/guides/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Passing commands: focused stale/table/code sweeps, `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, in-app Browser responsive QA for 14 refreshed/top-layer HTML routes at 360, 390, 430, 768, 1024, and 1366 px, and local HTTP checks for `/llms.txt` plus `/llms-full.txt`. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed unit-tests/YouTube/music/accountants guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, `/dead/` routes, and individual news articles. Refreshed the next live May 13 guide rows: `/guides/best-ai-tools-for-agencies/`, `/guides/best-ai-tools-for-consultants/`, `/guides/best-ai-tools-for-customer-support/`, and `/guides/best-ai-tools-for-designers/`. Verified June 2026 facts from official/source-backed ChatGPT, Claude, Zapier, n8n, Make, Copy.ai, Google AI, Perplexity, Gamma, Fathom, Napkin, Beautiful.ai, Intercom, Fin, Voiceflow, Ada, Retell AI, Figma, Canva, Midjourney, Adobe Firefly, Google Stitch, and v0 surfaces. Rebuilt the guides around agency workflow margin, consultant research/deck/meeting economics, customer-support outcome billing and escalation risk, and designer brand-system/prototype/image-rights decisions. Updated AI Automation, AI Writing, AI Design, AI Chatbots, AI Search, AI Research, AI Notes, AI Presentation, `/guides/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`; added visible `/categories/` June 2026 freshness text after QA found the update only in metadata/comments. Passing commands: focused stale/table/code sweeps, `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and local-HTTP Playwright QA for 15 refreshed/top-layer HTML routes at 360, 390, 430, 768, 1024, and 1366 px plus `/llms.txt` and `/llms-full.txt`. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed agencies/consultants/customer-support/designers guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, `/dead/` routes, and individual news articles. Refreshed the next live May 13 guide rows: `/guides/best-ai-tools-for-developers/`, `/guides/best-ai-tools-for-ecommerce/`, `/guides/best-ai-tools-for-freelancers/`, and `/guides/best-ai-tools-for-journalists/`. Verified June 2026 facts from official/source-backed Cursor, GitHub Copilot AI Credits, Claude Code, OpenAI Codex, Replit, Aider, ChatGPT, Canva, Jasper, Perplexity, Zapier, Claude, Midjourney, NotebookLM, Fathom, X/Grok, Elicit, Scite, and Semantic Scholar surfaces. Rebuilt the guides around developer agent-credit economics, ecommerce creative and store-operations buying paths, freelancer subscription/client-data discipline, and newsroom source-safety plus consented interview workflows. Updated AI Coding, AI Infrastructure, AI Automation, AI Writing, AI Design, AI Chatbots, AI Search, AI Research, AI Notes, `/guides/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Passing commands: focused stale/table/code sweeps, `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, in-app Browser mobile smoke QA for `/guides/best-ai-tools-for-developers/`, in-app Browser responsive QA for 16 refreshed/top-layer HTML routes at 360, 390, 430, 768, 1024, and 1366 px, and rendered `/llms.txt` plus `/llms-full.txt` checks. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed developers/ecommerce/freelancers/journalists guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, `/dead/` routes, and individual news articles. Refreshed the next live May 13 guide rows: `/guides/best-ai-tools-for-lawyers/`, `/guides/best-ai-tools-for-marketers/`, `/guides/best-ai-tools-for-nonprofits/`, and `/guides/best-ai-tools-for-product-managers/`. Verified June 2026 facts from official/source-backed Harvey, Claude/Claude nonprofits, Spellbook, CoCounsel Legal, Lexis+ Protege, ChatGPT/OpenAI nonprofits, AdCreative.ai, Unbounce, Jasper, Google Workspace nonprofits/Gemini, Canva nonprofits, Perplexity, Figma, Notion, and Fathom sources. Rebuilt the guides around legal authority/citation/privilege controls, ad-credit and landing-page economics, nonprofit discount and donor/beneficiary-data guardrails, and product evidence trails/design-handoff/meeting-consent workflows. Revived the lawyers and nonprofits guides from archived/noindex status to live sitemap pages after current-source rebuilds and removed their sitemap exclusion entries. Updated AI Writing, AI Research, AI Search, AI Design, AI Chatbots, AI Notes, AI Presentation, `/guides/`, `/categories/`, homepage, LLM surfaces, `astro.config.mjs`, `scripts/generate-page-refresh-ledger.mjs`, and `PAGE_REFRESH_LEDGER.md`. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, in-app Browser responsive QA for 14 refreshed/top-layer HTML routes at 360, 390, 430, 768, 1024, and 1366 px, rendered `/llms.txt` plus `/llms-full.txt` checks, and built sitemap inclusion checks for the revived lawyer/nonprofit guide URLs. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed lawyers/marketers/nonprofits/product-managers guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, `/dead/` routes, and individual news articles. Refreshed the next guide rows: `/guides/best-ai-tools-for-real-estate-agents/`, `/guides/best-ai-tools-for-recruiters/`, `/guides/best-ai-tools-for-researchers/`, and `/guides/best-ai-tools-for-sales-teams/`. Verified June 2026 facts from official/source-backed Zillow AI Mode, Zillow Premier Agent, Follow Up Boss, ChatGPT/OpenAI, Canva, Jasper, LinkedIn Recruiter/Hiring Assistant, hireEZ, Paradox, Eightfold, Elicit, Semantic Scholar, Perplexity, Claude, NotebookLM, Scite, Consensus, Apollo, Instantly, Clay, and Amplemarket sources. Rebuilt the guides around listing/lead safeguards, fair-housing and CRM discipline, human-in-the-loop hiring checks, candidate-data controls, source-integrity workflows, literature-review provenance, outbound credit economics, deliverability, and CRM hygiene. Revived the real-estate agents guide from archived/noindex status to a live sitemap page after the source-backed rebuild and removed its sitemap exclusion entries. Updated AI Automation, AI Writing, AI Research, AI Search, AI Chatbots, AI Design, `/guides/`, `/categories/`, homepage, LLM surfaces, `astro.config.mjs`, `scripts/generate-page-refresh-ledger.mjs`, and `PAGE_REFRESH_LEDGER.md`. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, in-app Browser responsive QA for 13 refreshed/top-layer HTML routes at 360, 390, 430, 768, 1024, and 1366 px, rendered `/llms.txt` plus `/llms-full.txt` checks, and built sitemap inclusion checks for the refreshed guide URLs. No dead tool pages or individual news article pages were edited.

2026-06-06: Continued oldest-to-newest ledger pass after the pushed real-estate/recruiting/research/sales guide slice, skipping dead tool pages, dead-tool comparison/archive surfaces, `/dead/` routes, and individual news articles. Refreshed the next live May 13 guide rows: `/guides/best-ai-tools-for-small-business/`, `/guides/best-ai-tools-for-students/`, `/guides/best-ai-tools-for-teachers/`, and `/guides/best-ai-tools-for-writers/`. Verified June 2026 facts from official/source-backed ChatGPT/OpenAI, ChatGPT for Teachers, Google AI/Gemini/NotebookLM/Google AI Pro for Education, Zapier plans/MCP/task docs, Claude, Perplexity, Cursor student, Semantic Scholar, Sudowrite, Jasper, and Grammarly sources. Rebuilt the guides around first-purchase sequencing for small businesses, source-grounded study and academic integrity, classroom privacy/teacher workflow guardrails, and writing lanes for drafting, long-form editing, fiction, brand governance, inline polish, and source-pack work. Updated AI Automation, AI Writing, AI Research, AI Notes, AI Chatbots, the student answer surface, `/guides/`, `/categories/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Passing commands: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check`, focused stale/table/code-block sweeps, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `$env:AIPEDIA_LEDGER_DATE='2026-06-06'; npm run check`, `npm run build:fast`, in-app Browser responsive QA for 13 refreshed/top-layer HTML routes at 360, 390, 430, 768, 1024, and 1366 px, and local HTTP checks for `/llms.txt`, `/llms-full.txt`, `/sitemap-index.xml`, and `/sitemap-0.xml`. The in-app browser blocked direct `.txt` and `.xml` navigation, so those crawl surfaces were verified by local HTTP against the same built static server. No dead tool pages or individual news article pages were edited.
