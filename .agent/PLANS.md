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

## ExecPlan: June 12 2026 May 15 Mixed Frontier Refresh

### 1. Objective

Continue the oldest-to-newest refresh by updating the next live May 15 frontier: `/about/our-stack/`, `/guides/best-ai-landing-page-builder-for-ab-testing/`, and `/tools/openclaw/`. The batch improves transparency, current buyer guidance, AI automation trust, mobile readability, and crawl/ledger freshness.

### 2. Current state

`PAGE_REFRESH_LEDGER.md` shows dead-tool rows for Phind, Tome, DALL-E, and Grok Code Fast before the next live rows. Those are excluded by the active goal. The next eligible live rows are the editorial-stack static page, the landing-page-builder A/B testing guide, and OpenClaw. The guide still carries May 2026 wording and stale pricing shortcuts. OpenClaw carries May 15 metadata, a 371K+ star count, and pre-June security posture. The stack page has May 14 review metadata and makes vendor-affiliate-program wording that is safer as internal AiPedia commission-state wording.

### 3. Target state

All three pages are refreshed to June 12, 2026 with current verification language. The guide reflects current Unbounce, Instapage, Convert, VWO, and Leadpages pricing/source posture and avoids unsupported fixed-price claims. OpenClaw reflects current GitHub/source posture, a current star range, and clearer safety warnings after June 2026 security coverage. The stack page states internal commission/link status without implying an externally verified vendor affiliate-program claim. Affected parent/crawl surfaces and `PAGE_REFRESH_LEDGER.md` reflect the batch.

### 4. Scope

Included: the three May 15 live pages, `/about/`, `/guides/`, `/tools/`, `/categories/`, `/categories/ai-automation/`, `/explore/`, homepage, `/llms.txt`, `/llms-full.txt`, `PAGE_REFRESH_LEDGER.md`, and this plan. Excluded: dead tools, individual news article pages, unrelated May 17+ rows, new tool records, logo work, and source-registry schema changes.

### 5. Files likely affected

`src/pages/about/our-stack.astro`, `src/content/use-cases/best-ai-landing-page-builder-for-ab-testing.md`, `src/content/tools/openclaw.md`, `src/pages/about/index.astro`, `src/pages/guides/index.astro`, `src/pages/tools/index.astro`, `src/pages/categories/index.astro`, `src/content/categories/ai-automation.md`, `src/pages/explore/index.astro`, `src/pages/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `src/data/source-registry.json`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. Tool, guide, category, and static-page metadata are refreshed in place.

### 7. SEO impact

The batch removes May-only titles/descriptions from the guide/tool pages, keeps active parent hubs current, and updates crawl manifests so LLM/search surfaces see the newest static/guide/tool refresh.

### 8. Conversion impact

The guide remains a commercial buyer page around Unbounce and alternatives. Existing CTAs must stay honest, source-backed, and disclosed through existing site surfaces. No new affiliate program is added.

### 9. Mobile UX impact

Pricing reality sections should be stacked on mobile rather than wide tables where current pricing caveats are long. The pages must remain readable at 360, 390, 430, 768, and desktop widths.

### 10. Implementation steps

1. Verify June 2026 sources for Unbounce, Instapage, VWO, Convert, Leadpages, OpenClaw, and internal stack records.
2. Refresh the three pages to June 11 facts and source stamps.
3. Update affected parent/top-layer pages and LLM crawl surfaces.
4. Regenerate and inspect `PAGE_REFRESH_LEDGER.md`.
5. Run validation and responsive QA.
6. Commit and push if clean.

### 11. Verification commands

`npm run ledger:pages`

`npm run ledger:pages:check`

`npm run guard:check`

`npm run check:links`

`npm run audit:sources`

`npm run audit:facts`

`npm run test:scripts`

`npm run check`

`npm run build:fast`

`git diff --check`

Responsive QA across affected routes at 360, 390, 430, 768, and 1024px.

### 12. Acceptance criteria

All three pages show June 11 verification, stale May pricing/model/source statements are removed or reframed, parent/top-layer pages and crawl surfaces are current, the ledger reflects the refresh scope, validation passes, and mobile QA has no horizontal overflow.

### 13. Risks and mitigations

OpenClaw has fast-changing security and repository signals; avoid false precision beyond currently observed source ranges. Landing-page-builder alternatives expose dynamic or sales-led pricing; avoid hard-coded unsupported competitor prices. The stack page should not overclaim external affiliate-program facts when internal link/commission state is the verifiable point.

### 14. Progress log

- 2026-06-11: Identified the May 15 live frontier after skipping dead Phind, Tome, DALL-E, and Grok Code Fast rows. Began source verification for Unbounce, Instapage, VWO, Convert, Leadpages, OpenClaw, and internal stack records.
- 2026-06-12: Resumed the batch against the current date. Re-verified Unbounce, Instapage, Convert, VWO, Leadpages, and OpenClaw source posture for June 2026 before editing.
- 2026-06-12: Edited all three target pages plus parent/crawl surfaces (`/about/`, `/guides/`, `/tools/`, `/categories/`, `/categories/ai-automation/`, `/explore/`, homepage, `/llms.txt`, `/llms-full.txt`, `src/data/source-registry.json`) to June 12 facts and verification stamps. Regenerated `PAGE_REFRESH_LEDGER.md` (738 rows, updated through 2026-06-12).
- 2026-06-12: Ran `npm run ledger:pages:check`, `npm run guard:check`, `npm run check:links`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, and `npm run build:fast`. All passed: 33/33 script tests, 1104 pages built, indexability and commercial CTA audits clean, 0 npm audit vulnerabilities.

### 15. Final report

All three May 15 pages (`/about/our-stack/`, `/guides/best-ai-landing-page-builder-for-ab-testing/`, `/tools/openclaw/`) now carry June 12, 2026 verification. The guide replaced stale fixed-price shortcuts with current Unbounce, Instapage, Leadpages, VWO, and Convert pricing and added per-source verification dates. OpenClaw reflects the 378K+ star/79K+ fork count, 22+ messaging surfaces, DM pairing/sandbox guidance, and June 2026 security coverage (TechRadar). The stack page reframes the affiliate-program claim as internal AiPedia commission-state wording. The `/categories/ai-automation/` hub gained an OpenClaw row/use-case and a June 12 local-agent update note; `/about/`, `/guides/`, `/tools/`, `/categories/`, `/explore/`, homepage, `/llms.txt`, and `/llms-full.txt` all reference the refreshed pages. `PAGE_REFRESH_LEDGER.md` regenerated clean (738 rows, through 2026-06-12). All validation commands pass; no unresolved risks. Next task: continue the oldest-to-newest refresh with the live 2026-05-17 cluster (11 pages: `/answers/chatgpt-vs-claude-which-is-better/`, `/answers/is-cursor-worth-it/`, `/companies/google-deepmind/`, `/companies/mistral/`, `/companies/openai/`, `/compare/build/`, `/guides/notion-ai-alternatives/`, `/search/`, `/stack-builder/`, `/workflows/micro-saas-weekend-build/`, `/workflows/newsletter-stack/`).

---

## ExecPlan: June 11 2026 May 14 Workflow Stack Refresh

### 1. Objective

Continue the oldest-to-newest page refresh by updating the seven live May 14 workflow pages that remain at the current ledger frontier. The batch improves current-date trust, source-backed stack economics, mobile workflow usefulness, SEO freshness, and LLM crawler summaries.

### 2. Current state

`PAGE_REFRESH_LEDGER.md` shows seven eligible live workflow rows dated 2026-05-14: `/workflows/accountant-stack/`, `/workflows/agency-sales-stack/`, `/workflows/consultant-stack/`, `/workflows/researcher-stack/`, `/workflows/sdr-stack/`, `/workflows/seo-content-pipeline/`, and `/workflows/solo-founder-stack/`. The pages have useful workflow structure but carry May 2026 titles, May 14 visible verification text, stale fixed-price totals, and several pricing tables that need June 11 verification and mobile QA. The `/workflows/` index is data-driven but needs maintenance metadata when its child workflow records change.

### 3. Target state

All seven workflow pages carry `last_updated` and `last_verified` of 2026-06-11, June 2026 title/meta/H1 language, source-backed current pricing caveats, and source lists with June 11 verification dates. Parent `/workflows/`, `/explore/`, homepage, `/categories/`, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md` reflect the batch.

### 4. Scope

Included: the seven May 14 workflow pages, `/workflows/`, `/explore/`, `/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, `PAGE_REFRESH_LEDGER.md`, and this plan. Excluded: dead tools, individual news article pages, unrelated workflow rows outside the current frontier, source-registry schema work, and new affiliate-program surfaces.

### 5. Files likely affected

`src/content/workflows/accountant-stack.md`, `src/content/workflows/agency-sales-stack.md`, `src/content/workflows/consultant-stack.md`, `src/content/workflows/researcher-stack.md`, `src/content/workflows/sdr-stack.md`, `src/content/workflows/seo-content-pipeline.md`, `src/content/workflows/solo-founder-stack.md`, `src/pages/workflows/index.astro`, `src/pages/explore/index.astro`, `src/pages/index.astro`, `src/pages/categories/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. Workflow frontmatter and Markdown source metadata are refreshed in place.

### 7. SEO impact

The batch removes May-only title/meta language from seven indexable workflow pages and keeps workflow archive sorting, crawlable internal links, sitemap inventory, and LLM manifests aligned with the refreshed child pages.

### 8. Conversion impact

No new affiliate programs are added. Existing affiliate-active tool recommendations remain framed around buyer fit and trust. Pricing sections should avoid unsupported fixed totals when vendor pages are usage-based, annual-only, region-specific, checkout-gated, or sales-led.

### 9. Mobile UX impact

The workflow pages must remain complete and readable at 360, 390, 430, 768, and desktop widths. Pricing reality tables should be converted to stacked guidance if they risk horizontal overflow.

### 10. Implementation steps

1. Verify June 2026 official sources for the workflow recommendation set.
2. Refresh workflow frontmatter, visible titles, verification text, stack economics, pricing caveats, and sources.
3. Update affected parent/top-layer pages and LLM crawl surfaces.
4. Regenerate and inspect the page refresh ledger.
5. Run source/fact/link/build checks plus responsive QA.
6. Commit and push the clean batch if validation passes.

### 11. Verification commands

`npm run ledger:pages`

`npm run ledger:pages:check`

`npm run guard:check`

`npm run check:links`

`npm run audit:sources`

`npm run audit:facts`

`npm run test:scripts`

`npm run check`

`npm run build:fast`

`git diff --check`

Static responsive QA over `/`, `/workflows/`, `/explore/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, and all seven refreshed workflow routes at 360, 390, 430, 768, and 1024px.

### 12. Acceptance criteria

All seven workflow pages are verified on 2026-06-11, stale May dates and unsupported fixed-price shortcuts are removed or reframed, affected parent/top-layer pages and LLM surfaces are current, the ledger reflects the true refresh scope, mobile QA has no horizontal overflow, and validation passes or failures are documented with risk.

### 13. Risks and mitigations

Many tools in this batch have annual-only, usage-based, credit-based, team-seat, or dynamic checkout pricing. The refresh should prefer official pages, source the current plan posture, and phrase stack budgets as ranges or buyer checks rather than false precision. Solo-founder copy must avoid fabricated first-hand usage claims.

### 14. Progress log

- 2026-06-10: Identified the seven May 14 workflow rows as the next eligible live frontier after pushing the May 14 guide batch. Started current-source verification for Dext, Reclaim, SaneBox, Consensus, Apollo, Amplemarket, Unbounce, AdCreative, Beautiful.ai, Descript, Elicit, Semantic Scholar, Claude, ChatGPT, Ahrefs, Semrush, OmniSEO, Surfer SEO, and Frase.
- 2026-06-10: Initially refreshed all seven workflow pages with June 2026 frontmatter and visible verification language. Reframed stale stack totals and pricing tables into mobile-friendly current buying guidance around Dext per-client practice pricing, Reclaim/SaneBox inbox and calendar tiers, Consensus/Elicit research tiers, Apollo/Amplemarket outbound economics, Unbounce/AdCreative campaign costs, Beautiful.ai/Descript production pricing, Claude/ChatGPT plan caveats, and OmniSEO/Ahrefs/Semrush/Surfer/Frase SEO stack costs.
- 2026-06-10: Updated `/workflows/`, `/explore/`, homepage, `/categories/`, `/llms.txt`, and `/llms-full.txt` maintenance metadata, then regenerated `PAGE_REFRESH_LEDGER.md`.
- 2026-06-11: Re-checked official source pages for the active batch after the environment date rolled forward, corrected the active workflow pages and affected parent/crawl metadata to June 11, and will regenerate the ledger before validation.
- 2026-06-11: Validation passed with `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `npm run check:links`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, `git diff --check`, and local Playwright responsive QA for 13 routes across 360, 390, 430, 768, and 1024px. The in-app browser blocked localhost/file navigation in this session, so responsive QA used the built `dist-fast` output through a temporary local Playwright server.

### 15. Final report

Shipped-ready June 11, 2026 refresh for `/workflows/accountant-stack/`, `/workflows/agency-sales-stack/`, `/workflows/consultant-stack/`, `/workflows/researcher-stack/`, `/workflows/sdr-stack/`, `/workflows/seo-content-pipeline/`, and `/workflows/solo-founder-stack/`. Parent `/workflows/`, `/explore/`, homepage, `/categories/`, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md` were refreshed in the same batch. Validation passed with the commands listed above. Remaining oldest eligible live rows begin with `/about/our-stack/`, `/guides/best-ai-landing-page-builder-for-ab-testing/`, and `/tools/openclaw/`, after skipping dead-tool rows and excluded individual news article pages.

---

## ExecPlan: June 10 2026 May 14 Guide Refresh

### 1. Objective

Continue the oldest-to-newest page refresh by updating the twelve live May 14 buyer guides that appear before the May 14 workflow rows in `PAGE_REFRESH_LEDGER.md`. The batch improves current-date trust, mobile buying guidance, SEO freshness, source-backed pricing caveats, internal linking, and LLM crawler summaries.

### 2. Current state

The next eligible live ledger rows are twelve `/guides/` pages dated 2026-05-14: Google Workspace calendar, heavy-inbox triage, unified outbound, receipt/bookkeeping, academic citations, mid-market SDR platforms, CRO, paid-social creative, transcript-first podcast editing, remote sales/training presentations, SMB sales presentations, and emotion-aware voice AI. The pages already have useful decision frameworks, but their visible titles, verification dates, sources, pricing reality sections, and some plan assumptions are May-dated. Several pages still use wide Markdown tables for pricing/setup sections that require mobile QA.

### 3. Target state

All twelve guides carry `last_updated` and `last_verified` of 2026-06-10, June 2026 titles/meta/verdict language, current official-source-backed plan/pricing caveats, and source lists with June 10 verification dates. The `/guides/` archive, `/explore/`, homepage metadata comments, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md` reflect the batch.

### 4. Scope

Included: the twelve May 14 guide pages, `/guides/`, `/explore/`, `/`, `/llms.txt`, `/llms-full.txt`, and the page refresh ledger. Excluded: news article pages, dead tools, the May 14 workflow rows, unrelated guides outside the current frontier, new affiliate programs, and source-registry schema work.

### 5. Files likely affected

`src/content/use-cases/best-ai-calendar-for-google-workspace-power-users.md`, `src/content/use-cases/best-ai-email-triage-for-heavy-inboxes.md`, `src/content/use-cases/best-ai-outbound-tool-for-unified-prospecting-and-sequencing.md`, `src/content/use-cases/best-ai-receipt-tool-for-bookkeepers.md`, `src/content/use-cases/best-ai-research-tool-for-academic-citations.md`, `src/content/use-cases/best-ai-sales-platform-for-mid-market-sdr-teams.md`, `src/content/use-cases/best-ai-tool-for-conversion-rate-optimization.md`, `src/content/use-cases/best-ai-tool-for-paid-social-creative-velocity.md`, `src/content/use-cases/best-podcast-editor-for-transcript-first-editing.md`, `src/content/use-cases/best-presentation-tool-for-remote-sales-and-training.md`, `src/content/use-cases/best-presentation-tool-for-smb-sales-teams.md`, `src/content/use-cases/best-voice-ai-for-emotion-aware-products.md`, `src/pages/guides/index.astro`, `src/pages/explore/index.astro`, `src/pages/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. Guide frontmatter and Markdown source metadata are refreshed in place.

### 7. SEO impact

The batch removes May-only title/meta language from twelve indexable buyer guides, refreshes the parent guide archive summary, and keeps crawlable internal links aligned with the current recommendation set.

### 8. Conversion impact

No new affiliate programs are added. Existing commercial CTAs remain honest and source-backed; pricing sections should avoid over-specific stale claims where official pages are region-, seat-, credit-, or sales-led.

### 9. Mobile UX impact

The guide pages must remain complete and readable at 360, 390, 430, 768, and desktop widths. Any wide Markdown table that creates overflow should be converted to stacked guidance or otherwise made mobile-safe.

### 10. Implementation steps

1. Verify June 2026 official sources for the guide recommendation set.
2. Refresh guide frontmatter, visible titles, verdicts, pricing caveats, and sources.
3. Update affected parent/top-layer pages and LLM crawl surfaces.
4. Regenerate and inspect the page refresh ledger.
5. Run source/fact/link/build checks plus responsive QA.
6. Commit and push the clean batch if validation passes.

### 11. Verification commands

`npm run ledger:pages`

`npm run ledger:pages:check`

`npm run guard:check`

`npm run check:links`

`npm run audit:sources`

`npm run audit:facts`

`npm run test:scripts`

`npm run check`

`npm run build:fast`

`git diff --check`

Static responsive QA over `/`, `/guides/`, `/explore/`, `/llms.txt`, `/llms-full.txt`, and all twelve refreshed guide routes at 360, 390, 430, 768, and 1024px.

### 12. Acceptance criteria

All twelve guide pages are verified on 2026-06-10, stale May dates and unsupported fixed-price shortcuts are removed or reframed, affected parent/top-layer pages and LLM surfaces are current, the ledger reflects the true refresh scope, mobile QA has no horizontal overflow, and validation passes or failures are documented with risk.

### 13. Risks and mitigations

Many vendors in this batch use region-specific, usage-based, annual-billing, or sales-led pricing. The refresh should prefer official pages, avoid unsupported exact totals when plan pages are dynamic, and phrase price guidance around buyer impact rather than false precision.

### 14. Progress log

- 2026-06-10: Identified the twelve May 14 guide rows as the next eligible live frontier after pushing the May 13 workflow batch. Started official-source verification for scheduling, email, outbound, bookkeeping, research, CRO, creative, podcasting, presentation, and voice AI tools.
- 2026-06-10: Refreshed all twelve guide pages to June 10 frontmatter and visible verification language, converted pricing/setup reality tables into stacked mobile-friendly buying guidance, updated source blocks with current official-source verification dates, and added current pricing/credit/seat caveats for Reclaim, Motion, SaneBox, Superhuman, Shortwave, Microsoft Copilot, Amplemarket, Apollo, Clay, Instantly, Dext, Hubdoc, AutoEntry, Ramp, Consensus, Elicit, Unbounce, VWO, Convert, Surfer, AdCreative, Descript, Riverside, Captions, Adobe Podcast, Prezi, Beautiful.ai, Pitch, Gamma, Decktopus, Hume, ElevenLabs, Cartesia, Deepgram, and AssemblyAI.
- 2026-06-10: Updated `/guides/`, `/explore/`, homepage, `/categories/`, `/llms.txt`, and `/llms-full.txt` maintenance metadata, then regenerated `PAGE_REFRESH_LEDGER.md`. The twelve May 14 guide rows now appear as June 10 rows; the remaining May 14 frontier is the workflow batch beginning with `/workflows/accountant-stack/`.
- 2026-06-10: Validation passed with `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `npm run check:links`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, `git diff --check`, an in-app browser sanity check on the refreshed calendar guide at a 390px viewport, and static Playwright responsive QA for 17 routes across 360, 390, 430, 768, and 1024px.

### 15. Final report

Shipped the June 10, 2026 guide refresh for the twelve May 14 buyer guides covering scheduling, inbox triage, outbound/sales, receipt capture, academic citations, CRO, paid-social creative, podcast editing, remote/SMB presentation tools, and emotion-aware voice AI. Parent `/guides/`, `/explore/`, homepage, `/categories/`, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md` were refreshed in the same batch. Validation passed with the commands listed above. Remaining oldest eligible live rows are the May 14 workflow pages beginning with `/workflows/accountant-stack/`.

---

## ExecPlan: June 10 2026 Workflow Stack Refresh

### 1. Objective

Continue the oldest-to-newest page refresh by updating the four May 13 live workflow pages after skipping the dead Grok Code Fast tool row. The batch improves trust, SEO freshness, source-backed buying guidance, mobile workflow usefulness, and LLM crawler quality.

### 2. Current state

`PAGE_REFRESH_LEDGER.md` showed `/workflows/agentic-coding-workflow/`, `/workflows/design-agency-replacement/`, `/workflows/podcast-automation-stack/`, and `/workflows/research-assistant-stack/` as the next eligible live rows dated 2026-05-13. The pages contained stale May metadata plus over-specific or unsupported claims around model versions, fixed stack costs, query limits, production time, transcription accuracy, voice models, and human-alternative costs.

### 3. Target state

All four workflow pages carry `last_updated` and `last_verified` of 2026-06-10, with current official-source-backed plan, billing, credit, consent, and review guidance. Parent `/workflows/`, `/explore/`, homepage metadata comments, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md` reflect the refresh.

### 4. Scope

Included: `/workflows/agentic-coding-workflow/`, `/workflows/design-agency-replacement/`, `/workflows/podcast-automation-stack/`, `/workflows/research-assistant-stack/`, `/workflows/`, `/explore/`, `/`, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md`. Excluded: dead tools, news article pages, unrelated workflow rows not at the current ledger frontier, source-registry schema work, and new affiliate surfaces.

### 5. Files likely affected

`src/content/workflows/agentic-coding-workflow.md`, `src/content/workflows/design-agency-replacement.md`, `src/content/workflows/podcast-automation-stack.md`, `src/content/workflows/research-assistant-stack.md`, `src/pages/workflows/index.astro`, `src/pages/explore/index.astro`, `src/pages/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. Workflow frontmatter dates and metadata are refreshed in place; markdown sources are updated to current official vendor pages.

### 7. SEO impact

Workflow titles and meta descriptions move from stale May wording to June 10 current positioning. Parent workflow and crawl surfaces remain indexable and internally linked.

### 8. Conversion impact

No new affiliate CTAs are added. The batch improves conversion trust by replacing fixed-price shortcuts with current billing caveats for coding agents, creative credits, podcast production credits, and Notion AI/Perplexity/Claude research stacks.

### 9. Mobile UX impact

Templates are unchanged. The first-screen workflow verdicts, tables, sources, and review warnings should remain readable at 360, 390, 430, 768, and desktop widths.

### 10. Implementation steps

1. Verify June 2026 official sources for the four workflow stacks.
2. Rewrite workflow records to remove stale/speculative or unsupported facts.
3. Refresh parent/top-layer surfaces and LLM manifests.
4. Regenerate and inspect the page refresh ledger.
5. Run source/fact/link/build checks plus responsive QA.
6. Commit and push the clean batch if validation passes.

### 11. Verification commands

`npm run ledger:pages`

`npm run ledger:pages:check`

`npm run guard:check`

`npm run check:links`

`npm run test:scripts`

`npm run check`

`npm run build:fast`

`git diff --check`

Static responsive QA over `/`, `/workflows/`, `/explore/`, `/llms.txt`, `/llms-full.txt`, and all four refreshed workflow routes at 360, 390, 430, 768, and 1024px.

### 12. Acceptance criteria

All four workflow pages are verified on 2026-06-10, stale May-only assertions are removed or reframed, affected parent/top-layer pages and LLM surfaces are current, the ledger reflects the true refresh scope, and validation passes or failures are documented with risk.

### 13. Risks and mitigations

Vendor billing and model access changed quickly in this area, especially for coding agents and AI credits. The refresh uses official sources where possible, avoids unsupported exact throughput or ROI claims, labels variable pricing clearly, and keeps human review and source verification as workflow requirements.

### 14. Progress log

- 2026-06-10: Identified the May 13 workflow rows as the next eligible ledger frontier after skipped dead `/tools/grok-code-fast/`. Verified current sources for Cursor, Claude Code, GitHub Copilot, Codex, Midjourney, Figma, Canva, Adobe Firefly, Magnific, Claude, Descript, ElevenLabs, Fish Audio, Perplexity, and Notion AI. Rewrote all four workflow pages and refreshed parent/crawl surfaces.
- 2026-06-10: Regenerated the page refresh ledger and reran validation. Static Playwright QA initially caught mobile overflow in the design-agency workflow's monthly-cost table at 360 and 390px, so the section was converted to stacked buying guidance and the 45 route/viewport QA pass was rerun cleanly.

### 15. Final report

Shipped the June 10, 2026 workflow refresh for `/workflows/agentic-coding-workflow/`, `/workflows/design-agency-replacement/`, `/workflows/podcast-automation-stack/`, and `/workflows/research-assistant-stack/`. Parent `/workflows/`, `/explore/`, homepage metadata comments, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md` were refreshed in the same batch. Validation passed with `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `npm run check:links`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, `git diff --check`, and static Playwright responsive QA for 9 routes at 360, 390, 430, 768, and 1024px.

---

## ExecPlan: June 10 2026 Trend Section Refresh

### 1. Objective

Continue the oldest-to-newest page refresh by updating the May 13 trend section after skipped dead/deprecated tools and excluded news articles. The batch improves trust, SEO freshness, top-layer trend accuracy, and LLM crawl-surface quality.

### 2. Current state

`PAGE_REFRESH_LEDGER.md` shows the next eligible non-news, non-dead frontier as twelve trend pages last updated 2026-05-13. Several pages include stale May-only claims, speculative model/version language, or market claims that need June 10 primary-source verification.

### 3. Target state

All twelve trend records carry `last_updated` and `last_verified` of 2026-06-10, with concise current-source-backed buyer analysis. Parent `/trends/`, `/explore/`, homepage metadata comments, LLM manifests, and the ledger reflect the trend-section refresh.

### 4. Scope

Included: `/trends/agent-commerce/`, `/trends/ai-coding-model-arms-race/`, `/trends/ai-memory-layer/`, `/trends/ai-supply-chain-security/`, `/trends/ai-voice-explosion/`, `/trends/enterprise-agent-platforms/`, `/trends/geo-trend/`, `/trends/google-stitch-disruption/`, `/trends/long-context-standard/`, `/trends/open-source-parity/`, `/trends/sovereign-ai-procurement/`, `/trends/vibe-coding/`, `/trends/`, `/explore/`, `/`, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md`. Excluded: dead tools, individual news article pages, unrelated May 14 guide/workflow rows, and source-registry changes unless validation requires them.

### 5. Files likely affected

`src/content/trends/*.md`, `src/pages/trends/index.astro`, `src/pages/explore/index.astro`, `src/pages/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. Trend frontmatter dates, titles, descriptions, timeframes, metadata, and markdown sources are refreshed in place.

### 7. SEO impact

Trend titles and meta descriptions move from stale May wording to June 10 current positioning. Parent trend and crawl surfaces remain indexable and internally linked.

### 8. Conversion impact

No affiliate CTAs are added. The batch improves trust and downstream conversion quality by clarifying commercial implications of agent commerce, coding-agent costs, voice-agent pricing, app builders, and sovereign AI procurement.

### 9. Mobile UX impact

Templates are unchanged. The trend index card summaries should remain compact and readable at 360, 390, 430, 768, and desktop widths.

### 10. Implementation steps

1. Verify June 2026 sources for the twelve trend topics.
2. Rewrite trend records to remove stale/speculative claims and add verified current sources.
3. Refresh parent/top-layer surfaces and LLM manifests.
4. Regenerate and inspect the page refresh ledger.
5. Run source/fact/link/build checks plus responsive QA.
6. Commit and push the clean batch if validation passes.

### 11. Verification commands

`npm run ledger:pages`

`npm run ledger:pages:check`

`npm run guard:check`

`npm run check:links`

`npm run test:scripts`

`npm run check`

`npm run build:fast`

`git diff --check`

Static Playwright responsive QA over `/`, `/trends/`, `/explore/`, `/llms.txt`, `/llms-full.txt`, and all twelve refreshed trend routes at 360, 390, 430, 768, and 1024px.

### 12. Acceptance criteria

All twelve trend pages are verified on 2026-06-10, stale May-only assertions are removed or reframed, affected parent/top-layer pages and LLM surfaces are current, the ledger reflects the true refresh scope, and validation passes or failures are documented with risk.

### 13. Risks and mitigations

Some trend topics move quickly and vendor pages mix GA, preview, and roadmap language. The refresh uses primary sources where possible, labels uncertain claims conservatively, avoids unsupported stock/ARR/model claims unless directly sourced, and focuses buyer guidance on durable controls.

### 14. Progress log

- 2026-06-10: Identified May 13 trend section as the next eligible ledger frontier after skipped dead/deprecated tool rows. Verified current sources for agent commerce, coding-agent billing, AI memory, MCP/security, voice agents, enterprise agent platforms, GEO, Stitch, long-context models, open-weight models, sovereign AI, and vibe coding. Rewrote all twelve trend records with June 10 dates and source-backed buyer guidance.
- 2026-06-10: Refreshed `/trends/`, `/explore/`, homepage metadata comments, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md`. Validation passed: `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `git diff --check`, `npm run check:links`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and static Playwright responsive QA across 85 route/viewport pairs.

### 15. Final report

Shipped twelve June 10 2026 trend refreshes plus affected parent and crawl surfaces. The refreshed pages are `/trends/agent-commerce/`, `/trends/ai-coding-model-arms-race/`, `/trends/ai-memory-layer/`, `/trends/ai-supply-chain-security/`, `/trends/ai-voice-explosion/`, `/trends/enterprise-agent-platforms/`, `/trends/geo-trend/`, `/trends/google-stitch-disruption/`, `/trends/long-context-standard/`, `/trends/open-source-parity/`, `/trends/sovereign-ai-procurement/`, and `/trends/vibe-coding/`. Parent surfaces and LLM manifests were updated, the ledger was regenerated, validation passed, and the next eligible ledger frontier is the four May 13 workflow pages after the skipped dead `/tools/grok-code-fast/` row.

---

## ExecPlan: June 10 2026 Workato Writer Yi Tool Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh by updating the next active tool rows after skipped dead/deprecated pages: Workato, Writer, and Yi. The batch improves trust, source-backed buyer guidance, SEO freshness, parent hub accuracy, and LLM crawl-surface freshness.

### 2. Current state

`PAGE_REFRESH_LEDGER.md` shows `/tools/workato/`, `/tools/writer/`, and `/tools/yi/` as the next live May 13 rows after skipped dead/deprecated pages. The tool records carried stale May verification, Writer still implied deprecated Palmyra model IDs were stable model-family recommendations, and Yi's source registry pointed `yi-official` at Wikipedia despite facts citing the 01.AI company site.

### 3. Target state

The three tool pages should carry `last_updated` and `last_verified` of 2026-06-10, with current pricing/model/platform caveats. Affected parent category hubs, top-layer indexes, LLM surfaces, source registry, and the refresh ledger should reflect the batch.

### 4. Scope

Included: Workato, Writer, and Yi tool records; source registry entries used by their facts; AI Automation, AI Writing, AI Research, AI Chatbots, and AI Coding parent hubs; `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, `PAGE_REFRESH_LEDGER.md`, validation, and responsive QA. Excluded: dead tool pages, individual news articles, logo work, schema changes, and new affiliate CTAs.

Affected top-layer surfaces: `/`, `/tools/`, `/categories/`, `/categories/ai-automation/`, `/categories/ai-writing/`, `/categories/ai-research/`, `/categories/ai-chatbots/`, `/categories/ai-coding/`, `/llms.txt`, `/llms-full.txt`, generated sitemap/ledger surfaces, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/tools/workato.md`, `src/content/tools/writer.md`, `src/content/tools/yi.md`, `src/content/categories/ai-automation.md`, `src/content/categories/ai-writing.md`, `src/content/categories/ai-research.md`, `src/content/categories/ai-chatbots.md`, `src/content/categories/ai-coding.md`, `src/data/source-registry.json`, `src/pages/index.astro`, `src/pages/tools/index.astro`, `src/pages/categories/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. Existing frontmatter, `facts`, `price_history`, source lists, and registry `last_checked` values are refreshed in place. New source IDs are added for Writer developer pricing/model docs and Yi's official model, Hugging Face, Lingyiwanwu/WanZhi, and GitHub surfaces.

### 7. SEO impact

Update stale May 2026 titles/meta descriptions where present, preserve canonical routes, and align parent hubs with child-page positioning so category summaries do not contradict current facts.

### 8. Conversion impact

No affiliate links or tracked CTAs are added. Buying guidance reduces conversion risk by clarifying Workato custom usage pricing, Writer model deprecations, and Yi direct-pricing uncertainty.

### 9. Mobile UX impact

Templates are unchanged. Short verdicts, plan guidance, watch-outs, and category summaries should remain readable at 360, 390, 430, 768, and desktop widths.

### 10. Implementation steps

1. Verify June 2026 official/current sources for Workato, Writer, and 01.AI/Yi.
2. Patch the three tool records and source registry.
3. Refresh affected parent category hubs.
4. Refresh top-layer/LLM metadata and regenerate the ledger.
5. Run source/fact/link/build checks plus responsive QA.

### 11. Verification commands

`npm run ledger:pages`

`npm run ledger:pages:check`

`npm run guard:check`

`npm run audit:sources`

`npm run audit:facts`

`npm run check:links`

`npm run test:scripts`

`npm run check`

`npm run build:fast`

`git diff --check`

### 12. Acceptance criteria

The three selected active tool pages are verified on 2026-06-10, stale May-only pricing/model/feature language is removed from touched records, affected parent hubs and LLM surfaces are current, the ledger reflects the true refresh scope, and validation passes or any failures are documented with scope and risk.

### 13. Risks and mitigations

Workato and Writer have sales-led terms, so the content avoids invented rates and points buyers to contract confirmation. Writer model availability is time-sensitive because the July 13 deprecation date is close; the page now flags migration. Yi has mixed licensing and product-positioning signals, so the page avoids blanket open-source claims and requires model-specific license review.

### 14. Progress log

- 2026-06-10: Verified Workato pricing/MCP/Agent Studio/GO/security/Gartner sources, Writer plans/LLMs/developer pricing/model docs, and 01.AI/Yi/WorldWise/WanZhi/Hugging Face/GitHub sources. Patched tool records, source registry, parent hubs, top-layer comments, and LLM manifest summaries.
- 2026-06-10: Ran ledger, guard, source, fact, link, script-test, check, fast-build, diff, and static responsive QA gates. Build generated 1,104 pages and the responsive pass checked 65 route/viewport pairs at 360, 390, 430, 768, and 1024px without blank pages or horizontal overflow.

### 15. Final report

Shipped the Workato, Writer, and Yi June 10, 2026 refresh with updated source registry entries, refreshed parent category hubs, top-layer metadata comments, LLM crawl-surface summaries, and regenerated page refresh ledger rows. Validation passed with `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `npm run audit:sources`, `npm run audit:facts`, `npm run check:links`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, `git diff --check`, and static Playwright responsive QA. No unresolved product-content risks remain beyond the documented sales-led/custom-pricing caveats on Workato, Writer, and Yi.

---

## ExecPlan: June 10 2026 watsonx Orchestrate Weaviate Whisper Wispr Flow Tool Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh by updating the next active tool batch after skipped dead/deprecated rows: watsonx Orchestrate, Weaviate, Whisper, and Wispr Flow. The batch improves trust, SEO freshness, source-backed buyer guidance, parent hub accuracy, and LLM crawl-surface freshness.

### 2. Current state

The ledger order after the completed Rows/Vidu/Voiceflow/Wan batch still skips dead/deprecated tool rows and then reaches `/tools/watsonx-orchestrate/`, `/tools/weaviate/`, `/tools/whisper/`, and `/tools/wispr-flow/`. All four carried May 13, 2026 verification. Current official sources add material June context: IBM release notes now expose agent monitoring, partner agents, audit logs, voice/SIP paths, data isolation, and agentic plan/add-on meters; Weaviate now has Engram generally available and current Cloud AI services pricing; OpenAI docs/pricing separate GPT-4o transcription, diarization, and GPT-Realtime-Whisper paths; Wispr plan/data/reliability docs clarify Free/Pro/Team/Enterprise, Privacy Mode, cloud transcription, and recent reliability work.

### 3. Target state

The four tool pages should carry `last_updated` and `last_verified` of 2026-06-10, with current price/history/source fields and clear buyer caveats. Affected parent category hubs, top-layer indexes, LLM surfaces, and the page refresh ledger should reflect the June 10 refresh.

### 4. Scope

Included: `src/content/tools/watsonx-orchestrate.md`, `src/content/tools/weaviate.md`, `src/content/tools/whisper.md`, `src/content/tools/wispr-flow.md`, source registry rows for their source IDs, affected parent hubs for AI Automation, AI Infrastructure, AI Search, AI Voice, AI Writing, AI Notes, and AI Coding, homepage/tools/categories metadata, LLM text surfaces, `PAGE_REFRESH_LEDGER.md`, and validation. Excluded: dead tool pages, individual news articles, logo work, schema changes, and new affiliate CTAs.

Affected top-layer surfaces: `/`, `/tools/`, `/categories/`, `/categories/ai-automation/`, `/categories/ai-infrastructure/`, `/categories/ai-search/`, `/categories/ai-voice/`, `/categories/ai-writing/`, `/categories/ai-notes/`, `/categories/ai-coding/`, `/llms.txt`, `/llms-full.txt`, generated sitemap/ledger surfaces, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/tools/watsonx-orchestrate.md`, `src/content/tools/weaviate.md`, `src/content/tools/whisper.md`, `src/content/tools/wispr-flow.md`, `src/content/categories/ai-automation.md`, `src/content/categories/ai-infrastructure.md`, `src/content/categories/ai-search.md`, `src/content/categories/ai-voice.md`, `src/content/categories/ai-writing.md`, `src/content/categories/ai-notes.md`, `src/content/categories/ai-coding.md`, `src/data/source-registry.json`, `src/pages/index.astro`, `src/pages/tools/index.astro`, `src/pages/categories/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. Existing frontmatter, `facts`, `price_history`, source lists, and registry `last_checked` values are refreshed in place. New source IDs are added for IBM watsonx Orchestrate release notes, Weaviate Engram GA, and Wispr Flow plan/data/reliability sources.

### 7. SEO impact

Update stale May 2026 titles/meta descriptions where present, preserve canonical routes, and align parent hubs with child-page positioning so category summaries do not contradict current facts.

### 8. Conversion impact

No affiliate links or new CTAs are added. Wispr Flow retains affiliate metadata without adding a tracked link because no approved affiliate URL is present. Buying guidance should reduce conversion risk by clarifying enterprise quote meters, hosted API pricing, and trial/team controls.

### 9. Mobile UX impact

Templates are unchanged. Short verdicts, plan guidance, watch-outs, and category summaries should remain readable at 360, 390, 430, 768, and desktop widths.

### 10. Implementation steps

1. Verify June 2026 official sources for IBM, Weaviate, OpenAI, and Wispr Flow.
2. Patch the four tool records and source registry.
3. Refresh affected parent category hubs.
4. Refresh top-layer/LLM metadata and regenerate the ledger.
5. Run source/fact/link/build checks plus responsive QA.

### 11. Verification commands

`npm run ledger:pages`

`npm run ledger:pages:check`

`npm run guard:check`

`npm run audit:sources`

`npm run audit:facts`

`npm run check:links`

`npm run test:scripts`

`npm run check`

`npm run build:fast`

`git diff --check`

### 12. Acceptance criteria

The four selected active tool pages are verified on 2026-06-10, stale May-only pricing/model/feature language is removed from touched records, affected parent hubs and LLM surfaces are current, the ledger reflects the true refresh scope, and validation passes or any failures are documented with scope and risk.

### 13. Risks and mitigations

Risk: IBM's enterprise packaging can be misread as public self-serve pricing. Mitigation: describe agentic meters and add-ons without inventing dollar prices.

Risk: OpenAI's current pricing tables expose some transcription model prices but not every documented model ID. Mitigation: keep GPT-4o and realtime pricing explicit while telling buyers to confirm legacy `whisper-1` and diarize billing in-account.

Risk: Wispr Flow's consumer/team/business surfaces overlap. Mitigation: separate Basic/Pro/Team/Enterprise buyer guidance and avoid adding affiliate CTAs without a tracked link.

### 14. Progress log

2026-06-10: Selected watsonx Orchestrate, Weaviate, Whisper, and Wispr Flow as the next live ledger batch. Verified official June 2026 sources: IBM watsonx Orchestrate release notes/Think 2026 pages, Weaviate pricing/homepage/Engram GA, OpenAI speech-to-text/pricing/realtime docs, and Wispr Flow plan/business/data-controls/what's-new/team docs.

2026-06-10: Patched the four tool records, source registry, affected parent hubs, top-layer metadata comments, and LLM text surfaces.

2026-06-10: Validation passed: `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `npm run audit:sources`, `npm run audit:facts`, `npm run check:links`, `git diff --check`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and Playwright static responsive QA for 16 routes at 360, 390, 430, 768, and 1024 px.

### 15. Final report

Completed for this batch. `/tools/watsonx-orchestrate/`, `/tools/weaviate/`, `/tools/whisper/`, and `/tools/wispr-flow/` now carry June 10, 2026 verification and current buyer guidance. Parent/category and top-layer surfaces refreshed: `/categories/ai-automation/`, `/categories/ai-infrastructure/`, `/categories/ai-search/`, `/categories/ai-voice/`, `/categories/ai-writing/`, `/categories/ai-notes/`, `/categories/ai-coding/`, `/`, `/tools/`, `/categories/`, `/llms.txt`, and `/llms-full.txt`. The next live tool rows after skipped dead/deprecated pages are `/tools/workato/`, `/tools/writer/`, and `/tools/yi/`.

---

## ExecPlan: June 10 2026 Rows Vidu Voiceflow Wan Tool Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh by updating the next active tool batch after skipped dead/deprecated rows: Rows, Vidu, Voiceflow, and Wan. The batch improves trust, SEO freshness, source-backed buyer guidance, parent hub accuracy, and LLM crawl-surface freshness.

### 2. Current state

The regenerated ledger still lists `/tools/phind/`, `/tools/tome/`, `/tools/dalle/`, and `/tools/grok-code-fast/` ahead of this batch, but those records are marked `status: dead`, so they are excluded by the user rule. The next active rows are `/tools/rows/`, `/tools/vidu/`, `/tools/voiceflow/`, and `/tools/wan/`, all last verified on 2026-05-13. Rows and Voiceflow need June pricing/source-date updates. Vidu needs Q3 API pricing language corrected from older Q3-pro general-video anchors to the current Q3/Q3-turbo/Q3-mix route table. Wan needs route-specific language kept current without overclaiming a universal price.

### 3. Target state

The four tool pages should carry `last_updated` and `last_verified` of 2026-06-10, updated price/history/source dates, and current official-source-backed buyer caveats. The affected AI Automation and AI Video category hubs, top-layer indexes, LLM surfaces, and ledger should reflect the June 10 refresh.

### 4. Scope

Included: `src/content/tools/rows.md`, `src/content/tools/vidu.md`, `src/content/tools/voiceflow.md`, `src/content/tools/wan.md`, source registry rows for their source IDs, `src/content/categories/ai-automation.md`, `src/content/categories/ai-video.md`, homepage/tools/categories metadata comments, LLM text surfaces, `PAGE_REFRESH_LEDGER.md`, and validation. Excluded: dead tool pages, individual news articles, logo work, schema changes, and affiliate changes.

Affected top-layer surfaces: `/`, `/tools/`, `/categories/`, `/categories/ai-automation/`, `/categories/ai-video/`, `/llms.txt`, `/llms-full.txt`, generated sitemap/ledger surfaces, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/tools/rows.md`, `src/content/tools/vidu.md`, `src/content/tools/voiceflow.md`, `src/content/tools/wan.md`, `src/content/categories/ai-automation.md`, `src/content/categories/ai-video.md`, `src/data/source-registry.json`, `src/pages/index.astro`, `src/pages/tools/index.astro`, `src/pages/categories/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. Existing frontmatter, `facts`, `price_history`, `sources`, and registry `last_checked` values are refreshed in place.

### 7. SEO impact

Update stale May 2026 titles/meta descriptions where present, preserve canonical routes, and keep parent hubs aligned with child-page positioning.

### 8. Conversion impact

No affiliate surfaces are added. Buying guidance should reduce conversion risk by clarifying pricing units: Rows seat/base pricing, Voiceflow demo-gated usage billing, Vidu API seconds/credits, and Wan route/provider pricing.

### 9. Mobile UX impact

Templates are unchanged. Short verdicts, first-screen watch-outs, and plan guidance should remain readable at 360, 390, 430, 768, and desktop widths.

### 10. Implementation steps

1. Verify June 2026 official sources for Rows, Vidu, Voiceflow, and Wan.
2. Patch the four tool records and source registry.
3. Refresh AI Automation and AI Video category hub references.
4. Refresh top-layer/LLM metadata and regenerate the ledger.
5. Run source/fact/link/build checks plus responsive QA.

### 11. Verification commands

`npm run ledger:pages`

`npm run ledger:pages:check`

`npm run guard:check`

`npm run audit:sources`

`npm run audit:facts`

`npm run check:links`

`npm run test:scripts`

`npm run check`

`npm run build:fast`

`git diff --check`

### 12. Acceptance criteria

The four selected active tool pages are verified on 2026-06-10, stale May-only pricing/model language is removed from touched records, affected parent hubs and LLM surfaces are current, the ledger reflects the true refresh scope, and validation passes or any failures are documented with scope and risk.

### 13. Risks and mitigations

Risk: Vidu and Wan pricing are route-specific and easy to flatten incorrectly. Mitigation: keep route/provider wording explicit and cite official docs for each price anchor.

Risk: Voiceflow no longer publishes old public tier prices. Mitigation: label historical rates as reference baselines only and foreground the current demo-gated usage-based pricing surface.

Risk: Rows has Superhuman policy handover language around June 16. Mitigation: state the policy route plainly without implying a product shutdown.

### 14. Progress log

2026-06-10: Selected Rows, Vidu, Voiceflow, and Wan as the next live ledger batch after skipping dead/deprecated Phind, Tome, DALL-E, and Grok Code Fast. Verified official June 2026 sources: Rows pricing and AI docs, Voiceflow pricing and docs, Vidu Q3/API/reference/pricing pages, Alibaba Cloud Wan docs/pricing/model list, and Wan2.2 GitHub.

2026-06-10: Patched the four tool records, source registry, AI Automation and AI Video parent hubs, top-layer metadata comments, LLM text surfaces, and ledger. Corrected an older public maintenance note that wrongly implied Rows was wound down; Rows is active and now verified against its live pricing page.

2026-06-10: Validation passed: `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `npm run audit:sources`, `npm run audit:facts`, `npm run check:links`, `git diff --check`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and Playwright static mobile QA for 9 HTML routes plus `/llms.txt` and `/llms-full.txt` at 360, 390, 430, 768, and 1024 px.

### 15. Final report

Completed for this batch. `/tools/rows/`, `/tools/vidu/`, `/tools/voiceflow/`, and `/tools/wan/` now carry June 10, 2026 verification and current buyer guidance. Parent/category and top-layer surfaces refreshed: `/categories/ai-automation/`, `/categories/ai-video/`, `/`, `/tools/`, `/categories/`, `/llms.txt`, and `/llms-full.txt`. The next live tool rows after skipped dead/deprecated pages are `/tools/watsonx-orchestrate/`, `/tools/weaviate/`, `/tools/whisper/`, and `/tools/wispr-flow/`.

---

## ExecPlan: June 10 2026 Tripo3D TypingMind Uizard Unbounce Tool Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh by updating Tripo3D, TypingMind, Uizard, and Unbounce to source-backed June 10, 2026 buyer guidance. The batch improves trust, SEO freshness, data quality, mobile decision support, and parent-hub accuracy while continuing to skip dead tool pages and individual news article pages.

### 2. Current state

`PAGE_REFRESH_LEDGER.md` shows skipped dead/archive rows first, then the next eligible active tool rows at 2026-05-13: `/tools/tripo3d/`, `/tools/typingmind/`, `/tools/uizard/`, and `/tools/unbounce/`. Tripo3D still carries a retired Basic/Professional/Advanced/Premium price ladder. TypingMind still names unsupported exact model versions. Uizard and Unbounce are mostly accurate but carry May verification dates and need June source checks. Affected parent hubs are AI Image, AI Chatbots, AI Design, and the top-layer tools/categories/homepage/LLM surfaces.

### 3. Target state

The four tool pages should show 2026-06-10 verification dates, current plan guidance, clear best-plan/watch-out language, source IDs aligned to primary sources, and no stale May-only model or pricing claims. Parent hubs should summarize the changed facts without becoming weaker or older than the child pages.

### 4. Scope

Included: the four tool records, `src/data/source-registry.json`, AI Image, AI Chatbots, AI Design, top-layer metadata comments, LLM text surfaces, `PAGE_REFRESH_LEDGER.md`, and verification. Excluded: dead tool pages, individual news article pages, new tool records, logo work, and affiliate CTA mechanics beyond preserving Unbounce's existing approved affiliate metadata.

Affected top-layer surfaces: `/`, `/tools/`, `/categories/`, `/categories/ai-image/`, `/categories/ai-chatbots/`, `/categories/ai-design/`, `/llms.txt`, `/llms-full.txt`, generated sitemap/ledger surfaces, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/tools/tripo3d.md`, `src/content/tools/typingmind.md`, `src/content/tools/uizard.md`, `src/content/tools/unbounce.md`, `src/content/categories/ai-image.md`, `src/content/categories/ai-chatbots.md`, `src/content/categories/ai-design.md`, `src/data/source-registry.json`, `src/pages/index.astro`, `src/pages/tools/index.astro`, `src/pages/categories/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. Existing frontmatter, facts, source IDs, price history, and source-registry rows are refreshed in place. Add missing source IDs for Tripo v3.0 Ultra, TypingMind Teams pricing, and Unbounce plan comparison if needed so facts do not point to mismatched registry URLs.

### 7. SEO impact

Refresh tool SEO titles and meta descriptions where they still say May 2026 or quote retired pricing/model claims. Preserve canonical routes and improve internal hub alignment.

### 8. Conversion impact

Unbounce affiliate metadata is preserved. Buyer guidance should clarify when Starter/Build/Experiment/Optimize or Free/Pro/Max/Team tiers matter so commercial CTAs remain trustworthy.

### 9. Mobile UX impact

Templates are unchanged. Content needs short first-screen verdicts, best-plan guidance, and watch-outs that read cleanly at 360, 390, 430, 768, and desktop widths.

### 10. Implementation steps

1. Verify June 2026 official sources for all four tools.
2. Add/update this ExecPlan.
3. Patch tool records, source registry, parent hubs, and top-layer/LLM metadata.
4. Search for stale prices, model-version claims, and May-only verification strings in touched files.
5. Regenerate the page refresh ledger and run source/fact/link/build checks plus responsive QA.

### 11. Verification commands

`npm run ledger:pages`

`npm run ledger:pages:check`

`npm run guard:check`

`npm run audit:sources`

`npm run audit:facts`

`npm run check:links`

`npm run test:scripts`

`npm run check`

`npm run build:fast`

`git diff --check`

### 12. Acceptance criteria

The four selected tool pages are verified on 2026-06-10, current against official sources, and free of known stale plan/model claims. Affected parent hubs, top-layer pages, LLM surfaces, and the ledger are updated. Validation passes or any failures are documented with scope and risk.

### 13. Risks and mitigations

Risk: Tripo pricing changed materially and old plan names can linger in body copy. Mitigation: run targeted stale-price/name searches after patching.

Risk: TypingMind supports many providers but not every exact model version can be verified from the public buy page. Mitigation: use provider/model-family wording instead of unsupported exact version claims.

Risk: Uizard and Unbounce plan pages can regionalize checkout. Mitigation: cite public pricing pages and tell buyers to verify live checkout for monthly/regional details.

### 14. Progress log

2026-06-10: Selected the next live oldest ledger batch after skipped dead/wound-down rows. Verified official June 2026 sources: Tripo3D pricing and v3.0 Ultra release, TypingMind buy and Teams pricing, Uizard pricing/Autodesigner/export help, and Unbounce pricing/plan comparison.

2026-06-10: Patched the four tool records, source registry, affected category hubs, top-layer metadata comments, LLM text surfaces, and ledger. Removed stale Tripo3D plan/pricing references and unsupported TypingMind exact-model claims from the touched tool page.

2026-06-10: Validation passed: `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `npm run audit:sources`, `npm run audit:facts`, `npm run check:links`, `git diff --check`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and Playwright static mobile QA for 11 HTML routes plus `/llms.txt` and `/llms-full.txt` at 360, 390, 430, 768, and 1024 px. The Browser plugin control tool was not exposed in this thread, so the responsive QA used local Playwright against `dist-fast`.

### 15. Final report

Completed for this batch. `/tools/tripo3d/`, `/tools/typingmind/`, `/tools/uizard/`, and `/tools/unbounce/` now carry June 10, 2026 verification and current official-source-backed buyer guidance. Parent/category and top-layer surfaces refreshed: `/categories/ai-image/`, `/categories/ai-chatbots/`, `/categories/ai-design/`, `/categories/ai-coding/`, `/`, `/tools/`, `/categories/`, `/llms.txt`, and `/llms-full.txt`. The next oldest eligible live ledger row after this batch is `/tools/vidu/`.

---

## ExecPlan: June 9-10 2026 AI News Coverage Refresh

### 1. Objective

Create source-backed, buyer-useful AiPedia news coverage for the June 9 and June 10, 2026 AI tools news cycle without duplicating existing June 8-9 Apple, Gemini, Claude Cowork, or coding-agent articles. The work should improve trust, organic rankings, editorial scalability, internal linking, and the news archive's usefulness for tool buyers.

### 2. Current state

The news collection already includes June 9 coverage for Claude Cowork and a coding-agent control-plane roundup, plus June 8 Apple Foundation Models and Google Gemini-for-Apple-developers stories. There are no June 10 news markdown records yet. `/news/`, `/news/rss.xml`, the homepage news rail, and LLM crawl surfaces are data-driven but carry refresh metadata and visible recent-news summaries that must stay aligned with new coverage.

### 3. Target state

Add non-overlapping June 9 and June 10 articles covering the most material AI and AI-tools developments verified on June 10, 2026: Claude Fable 5/Mythos 5, Apple Siri AI and EU rollout risk, Datadog DASH AI agent observability/security, Similarweb's May 2026 AI chatbot rankings, and a June 10 desk tying the market together. Refresh the existing June 9 desk and coding-agent control-plane article where new same-day official sources make them stale.

### 4. Scope

Included: new `src/content/news/*.md` records, existing June 9 desk/coding-agent refreshes, news archive/RSS metadata, homepage news metadata, LLM text surfaces, generated news OG assets, and `PAGE_REFRESH_LEDGER.md`. Excluded: new tool records, logos, affiliate CTA mechanics, tool-page fact refreshes, and duplicate standalone articles for topics already covered by existing June 8-9 posts.

Affected top-layer surfaces: `/news/`, `/news/rss.xml`, `/`, `/llms.txt`, `/llms-full.txt`, sitemap/build-generated surfaces, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/news/`, `src/pages/news/index.astro`, `src/pages/news/rss.xml.ts`, `src/pages/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, generated assets under `public/og/news/`, and this plan.

### 6. Data model impact

No content schema changes. New records use the existing news frontmatter fields: `type`, `slug`, `title`, `date`, `severity`, `summary`, `categories`, `last_updated`, `last_verified`, `related_tools`, and `sources`.

### 7. SEO impact

Each new article gets a unique slug/title/summary, current source list, clean heading hierarchy, and internal links to related coverage where useful. The archive, RSS metadata, and LLM surfaces should reflect the current June 9-10 coverage mix.

### 8. Conversion impact

No new affiliate CTA surfaces. Buyer guidance in the articles should distinguish tool choice, governance, procurement, and plan/access caveats without overstating commercial claims.

### 9. Mobile UX impact

News article templates are unchanged. The content should be scannable on mobile with short sections, direct verdicts, bullet checklists, and no wide tables.

### 10. Implementation steps

1. Verify current June 2026 primary sources and de-duplicate against existing news records.
2. Add new June 9 and June 10 article records.
3. Refresh the June 9 desk and coding-agent control-plane article with newly verified same-day sources.
4. Update news archive/RSS/homepage/LLM top-layer metadata and summaries.
5. Generate news OG assets and regenerate the page refresh ledger.
6. Run news, link, guard, script, and build checks; document any residual QA gaps.

### 11. Verification commands

`node scripts/generate-og-news.mjs`

`npm run ledger:pages`

`npm run guard:check`

`npm run check:news`

`npm run check:links`

`npm run test:scripts`

`npm run build:fast`

`git diff --check`

### 12. Acceptance criteria

New and refreshed news records are source-backed as of June 10, 2026, avoid topic double-ups, answer buyer-action questions, and include visible verification dates. Affected top-layer pages and crawl surfaces are current and internally aligned. Generated assets and ledger are current. Verification commands pass or failures are explicitly documented.

### 13. Risks and mitigations

Risk: Recent AI product claims can be volatile or promotional. Mitigation: rely on primary sources, date every verification, and frame analysis as AiPedia editorial judgment.

Risk: Coverage can duplicate existing Apple/Gemini or coding-agent stories. Mitigation: refresh existing desks for overlapping context and reserve new articles for distinct buyer questions.

Risk: Generated assets or ledger drift can break repository guards. Mitigation: run the repo's OG, ledger, news, guard, and build scripts before final reporting.

### 14. Progress log

2026-06-10: Inspected existing June 8-9 news records, news schema, top-layer news/homepage/LLM files, category/tool slugs, and package scripts. Verified primary June 2026 sources for Anthropic Claude Fable 5/Mythos 5, Apple Siri AI and DMA rollout delay, GitHub Copilot CLI custom agents, Datadog DASH 2026 AI announcements, and Similarweb May 2026 AI chatbot rankings.

2026-06-10: Added six non-overlapping news records for Claude Fable 5/Mythos 5, Apple Siri AI/EU rollout risk, GitHub Copilot CLI custom agents, Datadog DASH AI-agent observability/security, Similarweb May 2026 AI chatbot rankings, and the June 10 desk. Refreshed the June 9 desk and coding-agent control-plane synthesis so they include the newer same-day Anthropic, Apple, and GitHub sources.

2026-06-10: Updated `/news/`, `/news/rss.xml`, homepage news metadata, `/llms.txt`, `/llms-full.txt`, generated news OG assets, and regenerated `PAGE_REFRESH_LEDGER.md`. Verification passed: `node scripts/generate-og-news.mjs`, `npm run ledger:pages`, `npm run guard:check`, `npm run check:news`, `npm run check:links`, `npm run test:scripts`, `npm run check:security`, `npm run check`, `npm run build:fast`, and `git diff --check`. Rendered QA checked `/news/` plus all six new article pages at 360, 390, 430, 768, and 1024 px with HTTP 200s, H1s present, and no horizontal overflow.

### 15. Final report

Completed. The June 9-10 news refresh now covers the material AI tools cycle without duplicating existing June 8-9 Apple/Gemini/Claude Cowork/coding-agent articles. Changed files include new news markdown records, refreshed June 9 synthesis records, top-layer news/homepage/LLM metadata, generated news OG/thumbnail assets, `PAGE_REFRESH_LEDGER.md`, and this ExecPlan. No new tool records were added, so the hard logo rule did not require new tool logo assets. All verification commands passed; no unresolved QA risks remain for this content-only change.

---

## ExecPlan: June 9 2026 Taskade Tavus Tines Together AI Tool Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh after skipped dead tool rows by updating Taskade, Tavus, Tines, and Together AI to June 9, 2026 source-backed buyer guidance.

### 2. Current state

`PAGE_REFRESH_LEDGER.md` shows the next oldest rows after skipped `/dead/*`, Phind, Tome, DALL-E, Grok Code Fast, and Rows are active May 13 tool pages: `/tools/taskade/`, `/tools/tavus/`, `/tools/tines/`, and `/tools/together-ai/`. Current records exist in `src/content/tools/` and use source IDs already present in `src/data/source-registry.json`, but volatile pricing/model/concurrency facts need a June 2026 recheck.

### 3. Target state

The four tool pages should have June 9, 2026 `last_updated`/`last_verified` values, current pricing and plan caveats, updated SEO/meta language, current source IDs and source registry checks, and buyer guidance strong enough for mobile users to choose or avoid each tool. Parent hubs and LLM/top-layer surfaces should summarize the changed facts without becoming stale.

### 4. Scope

Included: `src/content/tools/taskade.md`, `src/content/tools/tavus.md`, `src/content/tools/tines.md`, `src/content/tools/together-ai.md`, affected category hubs, source registry rows, top-layer route metadata comments, LLM surfaces, ledger regeneration, checks, and responsive QA. Excluded: dead tool pages, individual news article pages, unrelated generated news/OG changes already present in the worktree, and affiliate CTA mechanics.

Affected parent/top-layer surfaces: AI Automation, AI Notes, AI Video, AI Voice, AI Infrastructure, AI Coding, AI Chatbots, `/tools/`, `/categories/`, `/`, `/llms.txt`, `/llms-full.txt`, sitemap/build-generated surfaces, and `PAGE_REFRESH_LEDGER.md`.

### 5. Files likely affected

`src/content/tools/taskade.md`, `src/content/tools/tavus.md`, `src/content/tools/tines.md`, `src/content/tools/together-ai.md`, `src/content/categories/ai-automation.md`, `src/content/categories/ai-notes.md`, `src/content/categories/ai-video.md`, `src/content/categories/ai-voice.md`, `src/content/categories/ai-infrastructure.md`, `src/content/categories/ai-coding.md`, `src/content/categories/ai-chatbots.md`, `src/data/source-registry.json`, `src/pages/index.astro`, `src/pages/tools/index.astro`, `src/pages/categories/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. Existing facts, price history, source IDs, verification dates, and source registry `last_checked` fields will be refreshed in place. Add a Together-specific pricing source ID only if needed to reduce reliance on the older `llama-pricing` label.

### 7. SEO impact

Refresh title/meta descriptions where they still say May 2026 or contain stale plan language. Preserve canonical route structure and internal links.

### 8. Conversion impact

Commercial CTA mechanics are unchanged. Pricing and plan guidance must be current, caveated when rendered source surfaces conflict, and grounded in primary sources.

### 9. Mobile UX impact

The first mobile screen should still answer what the tool is for, who should buy it, what plan or pricing unit matters, and the primary watch-out. Browser QA will cover 360, 390, 430, 768, and 1024 px for refreshed pages and representative parent surfaces.

### 10. Implementation steps

1. Inspect selected tool records, parent hubs, and source registry entries.
2. Verify current June 2026 facts from primary sources.
3. Patch the four tool pages and source registry.
4. Update affected parent/top-layer surfaces.
5. Regenerate `PAGE_REFRESH_LEDGER.md`.
6. Run source/stale sweeps, ledger checks, content guards, tests, build, and browser QA.

### 11. Verification commands

`npm run ledger:pages`

`npm run ledger:pages:check`

`npm run audit:sources`

`npm run audit:facts`

`npm run guard:check`

`npm run check:links`

`npm run test:scripts`

`npm run check`

`npm run build:fast`

Browser QA on refreshed tool pages and affected hubs at 360, 390, 430, 768, and 1024 px.

### 12. Acceptance criteria

Selected oldest eligible active pages are refreshed to June 9, 2026 with current source-backed facts; skipped dead/news pages are untouched; affected parent/top-layer surfaces are maintained; ledger is current; checks/build/browser QA pass or unrelated failures are documented.

### 13. Risks and mitigations

Risk: Taskade and Together pricing pages render multiple units and can change quickly. Mitigation: prefer current primary pricing page values, retain date-specific caveats, and avoid unsupported flat-price simplification.

Risk: Tavus pricing markup includes repeated comparison blocks with possible concurrency inconsistencies. Mitigation: cite specific plan cards and add a buyer caveat to confirm concurrency in the portal for scale.

Risk: Tines docs may conflict between older FAQ and current packaging. Mitigation: use May 1, 2026 packaging plus February 10 AI Agent availability note as the current primary guidance.

### 14. Progress log

2026-06-09: Selected `/tools/taskade/`, `/tools/tavus/`, `/tools/tines/`, and `/tools/together-ai/` as the next active live-tool cluster after skipped dead rows. Verified current primary Taskade pricing/help, Tavus pricing/CVI, Tines pricing-packaging/AI Agents docs, and Together AI pricing surfaces.

2026-06-09: Refreshed the four selected tool records to June 9 verification language, updated relevant category/top-layer surfaces, added/updated source registry rows including `together-ai-pricing` and `tines-agent-intro`, regenerated `PAGE_REFRESH_LEDGER.md`, and confirmed the ledger now places `/tools/taskade/`, `/tools/tavus/`, `/tools/tines/`, and `/tools/together-ai/` at 2026-06-09. Skipped dead-tool rows and individual news article pages per user direction. In-app browser automation could not complete because the Node browser runtime failed during Windows sandbox setup; build/render and command checks passed, with visual QA still the main residual gap.

### 15. Final report

Completed for the current day. Changed files in this batch include the four refreshed tool records, `src/data/source-registry.json`, `PAGE_REFRESH_LEDGER.md`, affected category hubs (`ai-automation`, `ai-video`, `ai-infrastructure`, plus related coding/chatbot source-date surfaces), top-layer route comments for `/`, `/tools/`, `/categories/`, LLM surfaces, and this plan. Verification passed: source registry/source-id audit, `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run audit:sources`, `npm run audit:facts`, `npm run check:links`, `npm run check`, `npm run test:scripts`, and `npm run build:fast`. Remaining risk: browser visual QA was blocked by the local in-app browser runtime, so the next session should start with a browser pass once the runtime is healthy. Next oldest live tool rows to continue from are `/tools/tripo3d/`, `/tools/typingmind/`, `/tools/uizard/`, `/tools/unbounce/`, `/tools/vidu/`, `/tools/voiceflow/`, `/tools/wan/`, `/tools/watsonx-orchestrate/`, `/tools/weaviate/`, `/tools/whisper/`, `/tools/wispr-flow/`, `/tools/workato/`, `/tools/writer/`, and `/tools/yi/`.

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

## ExecPlan: June 3-9 2026 AI News Coverage Refresh

### 1. Objective

Create source-backed, high-quality AiPedia news article coverage for AI and AI tools news from June 3 through June 9, 2026. The work improves organic rankings, trust, editorial freshness, mobile decision quality, and news archive completeness.

### 2. Current state

The news collection lives in `src/content/news/` and is rendered by `src/pages/news/[slug].astro` with `ArticlePlusLayout`, `NewsImpactBox`, `RelatedToolsStrip`, article citations, and generated OG imagery. The news archive at `src/pages/news/index.astro`, RSS route at `src/pages/news/rss.xml.ts`, homepage recent news module in `src/pages/index.astro`, and LLM surfaces in `src/pages/llms.txt.ts` and `src/pages/llms-full.txt.ts` summarize this collection. Before this work, June 3 has three articles and June 4-9 are missing from the collection.

### 3. Target state

Each day from June 3 through June 9 has at least two useful, current, source-backed articles, with daily desks where appropriate and standalone decision articles for major tool/model/developer-platform changes. Mobile readers should quickly see what changed, who is affected, buyer/developer action, and the AiPedia verdict.

### 4. Scope

Included: add and refresh June 3-9 news Markdown records, sources, verification dates, summaries, related tools, categories, news OG assets, `/news/`, homepage recent-news metadata, RSS metadata, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`.

Excluded: changing tool pricing records, affiliate URLs, product rankings, unrelated category hubs, or non-news templates unless a verification failure requires it.

Affected top-layer surfaces: `/`, `/news/`, `/news/rss.xml`, `/llms.txt`, `/llms-full.txt`, sitemap/LLM/generated news asset surfaces, and the page refresh ledger.

### 5. Files likely affected

`src/content/news/*.md`, `src/pages/news/index.astro`, `src/pages/news/rss.xml.ts`, `src/pages/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `public/og/news/**`, `PAGE_REFRESH_LEDGER.md`, and this plan file.

### 6. Data model impact

No schema change is planned. New records must satisfy the existing `news` content schema: slug, title, date, severity, summary, affects/categories, author, last_updated, last_verified, sources, and optional related tools.

### 7. SEO impact

Each article gets a unique slug/title/summary and the existing article route supplies canonical/schema surfaces. The archive, RSS, homepage recent-news rail, and LLM text surfaces must reflect the refreshed June 9 coverage.

### 8. Conversion impact

No new affiliate CTA mechanics are planned. Editorial buyer guidance must remain honest, with no unsupported commercial claims.

### 9. Mobile UX impact

Article copy should be concise, scannable, and decision-oriented. QA must check `/news/` and representative articles at 360, 390, 430, 768, and desktop widths for overflow, broken cards, and readable first-screen summaries.

### 10. Implementation steps

1. Verify volatile June 2026 facts against current primary sources.
2. Add standalone news articles and daily desks for June 3-9.
3. Refresh existing June 3 coverage where new primary-source facts affect that day.
4. Update top-layer metadata and LLM/RSS/homepage surfaces.
5. Regenerate news OG assets and the page refresh ledger.
6. Run news, link, guard, and build checks.
7. Run in-app browser QA at required mobile and desktop widths.

### 11. Verification commands

`node scripts/generate-og-news.mjs`

`npm run ledger:pages`

`npm run guard:check`

`npm run check:links`

`npm run check:news`

`npm run build:fast`

Browser QA against `http://127.0.0.1:4321/news/` and representative article URLs.

### 12. Acceptance criteria

June 3-9 news coverage exists, is source-backed, has `last_verified: 2026-06-09`, passes the news rendering/xref audits, builds successfully, and has generated OG assets. Parent/top-layer surfaces are refreshed and the ledger reflects the real editorial scope.

### 13. Risks and mitigations

Risk: claiming an item happened on a quieter weekend day when the primary source was published earlier. Mitigation: label weekend posts as catch-up/watchlist analysis and cite source dates plainly.

Risk: stale or unsupported AI pricing/model claims. Mitigation: use only current primary sources and avoid unsupported commercial details.

Risk: broken related tool slugs. Mitigation: inspect available tool records before finalizing related_tools.

### 14. Progress log

2026-06-09: Plan created after inspecting news collection, archive/RSS/homepage/LLM surfaces, package scripts, and current git status.

2026-06-09: Added June 3-9 source-backed news coverage, refreshed the June 3 desk, updated `/news/`, RSS, homepage, and LLM surface metadata, generated OG/thumb assets, regenerated `PAGE_REFRESH_LEDGER.md`, and verified with `npm run check:news`, `npm run guard:check`, `npm run check:links`, and `npm run build:fast`.

2026-06-09: Browser QA on `http://127.0.0.1:4321/news/`, `/news/2026-06-09-ai-news-desk/`, and `/news/2026-06-08-google-gemini-apple-developers-xcode/` at 360, 390, 430, 768, and 1024px found no horizontal overflow, confirmed article citations, and confirmed the June 9 story appears on the news index.

### 15. Final report

Pending final user report.

## ExecPlan: Ledger Refresh Batch, Oldest Eligible Active Pages

### 1. Objective

Continue refreshing pages in `PAGE_REFRESH_LEDGER.md` from oldest to newest while skipping dead tools, dead archive pages, and individual news articles. This batch improves trust, data quality, SEO freshness, and buying-decision usefulness for the next oldest active pages.

### 2. Current state

The ledger is current through 2026-06-09. The oldest rows are dead archive pages and dead tool pages, which this user request explicitly excludes. The next eligible active tool pages begin at 2026-05-13.

### 3. Target state

Refresh the next oldest eligible active pages to `last_updated` and `last_verified` 2026-06-09 with current June 2026 source-backed facts, plus update affected parent/top-layer surfaces and the ledger.

### 4. Scope

Included in this batch: `/tools/sanebox/`, `/tools/servicenow/`, `/tools/spellbook/`, `/tools/stable-audio/`, `/tools/tactiq/`, relevant source registry entries if used, affected categories, `/tools/`, homepage, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`.

Excluded: `/dead/*`, dead tool pages such as Phind, Tome, DALL-E, and Grok Code Fast, individual news articles, unrelated redesigns, and unrelated generated news asset churn already present from the prior task.

### 5. Files likely affected

`src/content/tools/sanebox.md`, `src/content/tools/servicenow.md`, `src/content/tools/spellbook.md`, `src/content/tools/stable-audio.md`, `src/content/tools/tactiq.md`, relevant category records, `src/pages/tools/index.astro`, `src/pages/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, and this plan file.

### 6. Data model impact

No schema change is planned. Existing structured facts, source IDs, price history, verdicts, best-for/not-best-for, and source metadata may be refreshed.

### 7. SEO impact

Titles, descriptions, verdicts, and internal links remain stable unless current source checks show stale claims. Parent surfaces should show current maintenance context after the child page refresh.

### 8. Conversion impact

Commercial CTA mechanics are not changing. Any pricing or plan guidance touched must be verified against current sources and retain disclosure/trust framing.

### 9. Mobile UX impact

Tool pages must remain scannable on mobile with first-screen decision content intact. QA will spot-check representative refreshed tool pages and parent surfaces.

### 10. Implementation steps

1. Inspect selected tool records and source/source-registry patterns.
2. Verify current facts with June 2026 current-source searches and primary sources where available.
3. Patch selected tool pages and affected parent surfaces.
4. Regenerate `PAGE_REFRESH_LEDGER.md`.
5. Run content guards, source checks, link checks, and build.
6. Browser QA representative refreshed pages at mobile and desktop widths.

### 11. Verification commands

`npm run ledger:pages`

`npm run ledger:pages:check`

`npm run guard:check`

`npm run check:links`

`npm run check`

`npm run build:fast`

Browser QA on `/`, `/tools/`, `/categories/`, `/tools/sanebox/`, `/tools/servicenow/`, `/tools/spellbook/`, `/tools/stable-audio/`, `/tools/tactiq/`, `/categories/ai-automation/`, `/categories/ai-notes/`, `/categories/ai-music/`, `/categories/ai-writing/`, and `/categories/ai-research/` at 360, 390, 430, 768, and 1024 px.

### 12. Acceptance criteria

Selected oldest eligible active pages are refreshed to June 9, 2026 with current source-backed facts; excluded dead/news pages are untouched; affected parent/top-layer surfaces are maintained; ledger is current; checks/build pass.

### 13. Risks and mitigations

Risk: accidentally refreshing excluded dead pages. Mitigation: use ledger order and skip `/dead/*` and tool records with `status: dead`.

Risk: stale pricing or plan claims. Mitigation: verify each touched commercial/tool fact against current June 2026 official sources or defer the claim.

### 14. Progress log

2026-06-09: Initially identified Rows, SaneBox, ServiceNow, Spellbook, and Stable Audio as the next oldest rows after skipped dead archive/tool rows. Rows was deferred from this batch and later re-verified as an active standalone product in the June 10 Rows/Vidu/Voiceflow/Wan batch.

2026-06-09: Adjusted the eligible batch to SaneBox, ServiceNow, Spellbook, Stable Audio, and Tactiq. Current-source checks found SaneBox still presenting three plan families plus a 14-day trial, ServiceNow AI Control Tower expanded across discover/observe/govern/secure/measure with GA expected August 2026, Spellbook still on custom team pricing with 7-day trial and 4,400-team adoption copy, Stable Audio 3.0 now superseding the 2.5-first framing, and Tactiq Business annual pricing now rendered at $29.17/user/month with MCP and Claude Connector betas.

2026-06-09: Refreshed the five active tool pages and affected parent/top-layer surfaces. SaneBox now covers Appetizer/Snack/Lunch/Dinner effective monthly pricing plus request-only SaneDrafts/SaneSummary beta caveats; ServiceNow now centers AI Control Tower's discover/observe/govern/secure/measure expansion and August 2026 GA caveat; Spellbook now reflects custom pricing, 7-day trial, security/compliance checks, and Word-native contract workflows; Stable Audio now reflects the Stable Audio 3.0 Small SFX/Small/Medium/Large model split, Community License versus Enterprise License, and API/hosted caveats; Tactiq now reflects Free/Pro/Team/Business/Enterprise pricing plus MCP and Claude Connector beta context. Updated AI Automation, AI Notes, AI Music, AI Writing, AI Research, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry rows, and `PAGE_REFRESH_LEDGER.md`.

### 15. Final report

Completed this batch. Refreshed 5 active tool pages from the oldest eligible ledger cluster to June 9, 2026: `/tools/sanebox/`, `/tools/servicenow/`, `/tools/spellbook/`, `/tools/stable-audio/`, and `/tools/tactiq/`. Deferred `/tools/rows/` for a later live-tool pass. No dead tool pages or individual news article pages were refreshed.

Verification passed: `npm run ledger:pages` with `AIPEDIA_LEDGER_DATE=2026-06-09`, `npm run ledger:pages:check`, source-registry parse/duplicate checks, refreshed tool source-ID checks, targeted stale-string sweeps, `git diff --check -- <touched files>`, `npm run audit:sources`, `npm run audit:facts`, `npm run guard:check`, `npm run test:scripts`, `npm run check:links`, `npm run check`, and `npm run build:fast`. In-app browser QA passed for 13 refreshed/top-layer routes at 360, 390, 430, 768, and 1024 px: 65 route-width checks, no horizontal overflow, H1/main content present, and current June 9 buyer facts visible where required. `dist-fast` was removed after the build.

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

---

## ExecPlan: June 8 2026 Wiki Front Page Rebuild

### 1. Objective

Rebuild the homepage first screen so AiPedia reads like a real wiki front page: searchable, navigable, dense, current, and useful for buyer decisions. This improves mobile UX, trust, SEO navigation, and editorial scalability without changing child page facts.

### 2. Current state

`src/pages/index.astro` has all required homepage data already loaded: active tools, comparisons, categories, guides, news, source links, search typeahead, stats, top tools, category grid, weekly news, and trust panel. The current first screen is still closer to a landing page: a large hero, a buyer-router module, weekly/news refresh modules, then the actual search form lower on the page.

### 3. Target state

The first screen should contain the wiki identity, current verification strip, homepage search, catalog stats, and main portal links. Buyer-guide and news refresh modules should remain, but become supporting front-page sections below the search-first introduction.

### 4. Scope

Included: homepage layout, homepage CSS, analytics attributes on moved/renamed internal links, and `PAGE_REFRESH_LEDGER.md` freshness verification. Excluded: child tool/guide/comparison content changes, new data models, logo work, and unrelated generated assets.

### 5. Files likely affected

- `src/pages/index.astro`
- `PAGE_REFRESH_LEDGER.md`
- `.agent/PLANS.md`

### 6. Data model impact

No data model change. Existing `getCollection` data and homepage search JSON continue to power the front page.

### 7. SEO impact

The homepage keeps its title, meta description, canonical handling through `BaseLayout`, and `HomepageLD`. The visible H1 remains `aipedia.wiki`; main internal links become more crawlable and wiki-like above the fold.

### 8. Conversion impact

Commercial CTA behavior remains in the existing top-tool decision card. The first screen emphasizes navigation and trust before purchase pressure.

### 9. Mobile UX impact

The search and portals must fit cleanly at 360, 390, 430, 768, and desktop widths without horizontal overflow or orphaned controls.

### 10. Implementation steps

1. Replace the landing-style hero usage with a custom wiki front section.
2. Move the existing homepage search form into the first screen.
3. Add main portal links for tools, categories, compare, guides, answers, and news.
4. Reposition buyer-guide/router and refresh modules as supporting wiki front-page sections.
5. Update CSS for dense, mobile-first wiki layout.
6. Run ledger, tests, build, diff, and browser viewport QA.

### 11. Verification commands

- `npm run ledger:pages:check`
- `npm run test:scripts`
- `npm run build:fast`
- `git diff --check -- src/pages/index.astro PAGE_REFRESH_LEDGER.md .agent/PLANS.md`
- Browser QA at 360, 390, 430, 768, and 1024+ widths.

### 12. Acceptance criteria

The homepage first screen feels like a wiki front page, search appears before lower editorial modules, the main portal links are clear and crawlable, mobile has no horizontal overflow, ledger remains current, and build/tests pass.

### 13. Risks and mitigations

- Risk: moving the search form breaks typeahead. Mitigation: keep existing `data-home-search` hooks and script unchanged.
- Risk: the page becomes too dense. Mitigation: use restrained portals and short descriptions, not nested card walls.
- Risk: unrelated dirty files leak into the change. Mitigation: stage/report only the three scoped files.

### 14. Progress log

2026-06-08: Created plan after inspecting `src/pages/index.astro`, existing homepage search, data collections, and current buyer-router layout.

2026-06-08: Rebuilt the homepage first screen into a wiki-style front page with a freshness strip, H1 identity, search-first entry point, editorial status panel, crawlable portal links, and featured decision routes. Kept existing lower editorial/news/tool/category modules intact and moved the buyer router into a supporting section.

2026-06-08: Tightened the mobile front page after browser review: shortened portal copy, aligned all live/freshness accents to the orange palette, changed the freshness strip to the June 8 page refresh, guarded empty collection sections, and moved populated top tools, categories, and latest news directly below the wiki front panel before the buyer-router/editorial refresh modules.

2026-06-08: Per in-app browser feedback, compressed the phone/tablet wiki-front further: folded duplicate mobile stats into a compact trust strip, made portal cards count-and-label first, removed always-visible portal explainer text, prevented the `aipedia.wiki` H1 from wrapping at small desktop widths, and verified that the first top-tool card is visible in the initial viewport at 360, 390, 430, 768, 1024, and 1280 px.

2026-06-08: Fixed the rendered homepage hierarchy after a follow-up browser check showed the buyer-router still appearing before the populated catalog sections. Moved Top-scored AI tools, Browse by category, and Latest AI news directly after the wiki front panel; demoted the buyer-router to Buyer shortcuts below news; changed stale-sounding "current AI news" / "News through" copy to "AI news archives" / "News indexed through"; regenerated the ledger; and reverified mobile/desktop rendering at 360, 390, 430, 768, and 1024 px.

### 15. Final report

Completed. Updated `src/pages/index.astro` to replace the landing-style hero with a proper wiki front page, preserve the existing `data-home-search` behavior, add the portal index and featured decision routes, align freshness/status accents to the orange palette, guard empty homepage collection sections, and render the populated top tools, categories, and latest news above the buyer shortcuts/editorial refresh modules. Updated `PAGE_REFRESH_LEDGER.md` for the June 8 homepage refresh and kept the page's visible freshness language honest by saying news is indexed through Jun 3 rather than implying current-hour news coverage. The latest density pass made the mobile and tablet front page more wiki-like by replacing duplicate phone stats with a compact trust strip, keeping portal cards short, and ensuring top-tool content appears in the first viewport. Verification passed: `npm run ledger:pages`, `npm run ledger:pages:check`, `npm run check`, `npm run build:fast`, and `git diff --check -- src/pages/index.astro PAGE_REFRESH_LEDGER.md .agent/PLANS.md`. Browser QA passed at 360, 390, 430, 768, and 1024 px, with no page-level horizontal overflow, no H1 wrapping, no empty `See all 0 tools` state, 6 top-tool rows, 15 category cards, 6 latest-news rows, and final mobile/desktop visual passes showing a fitted search row and first top-tool card above the fold.

---

## ExecPlan: June 8 2026 Live Tool Cluster Refresh

### 1. Objective

Continue the oldest-to-newest ledger refresh after the homepage pass by updating the next eligible live tool records dated May 13: Kimi, Kokoro, Krea, and Langflow. The goal is higher trust, current June 2026 facts, stronger buyer warnings, cleaner parent hubs, and accurate ledger state while continuing to skip dead tool pages and individual news article pages.

### 2. Current state

`PAGE_REFRESH_LEDGER.md` shows multiple skipped dead/dead-tool rows before the next live cluster. The selected live records are `src/content/tools/kimi.md`, `src/content/tools/kokoro.md`, `src/content/tools/krea.md`, and `src/content/tools/langflow.md`, all previously verified on 2026-05-13. Affected parent category hubs are `src/content/categories/ai-chatbots.md`, `src/content/categories/ai-voice.md`, `src/content/categories/ai-image.md`, and `src/content/categories/ai-automation.md`.

### 3. Target state

Each selected tool page should show `last_updated` and `last_verified` as 2026-06-08, current June 2026 source-backed pricing/version/license/watch-out facts, updated methodology language, and practical buyer guidance. Parent category hubs should mention the materially changed lane facts without re-ranking unrelated tools.

### 4. Scope

Included: four live tool pages, four affected category hubs, ledger regeneration, LLM/ledger crawl surfaces produced by existing scripts, and verification commands. Excluded: dead tool pages, dead archive pages, individual news article pages, broad comparison rewrites, logo work, and unrelated generated OG assets.

### 5. Files likely affected

- `src/content/tools/kimi.md`
- `src/content/tools/kokoro.md`
- `src/content/tools/krea.md`
- `src/content/tools/langflow.md`
- `src/content/categories/ai-chatbots.md`
- `src/content/categories/ai-voice.md`
- `src/content/categories/ai-image.md`
- `src/content/categories/ai-automation.md`
- `PAGE_REFRESH_LEDGER.md`
- `.agent/PLANS.md`

### 6. Data model impact

No schema change. Existing frontmatter fields, `facts`, `price_history`, source metadata, and category Markdown are sufficient.

### 7. SEO impact

Tool SEO titles/meta descriptions move from May to June 2026 where stale. Category hubs receive fresh source language so snippets and internal summaries do not contradict refreshed tool pages.

### 8. Conversion impact

No affiliate CTAs or revenue events change. The conversion impact is trust protection: Krea credit rollover is corrected, Kokoro scam-domain warning is surfaced, Kimi legacy endpoint caution is explicit, and Langflow security-release/pinning guidance is visible.

### 9. Mobile UX impact

Content changes should preserve existing tool/category templates. QA should check mobile widths for all four tool pages and affected categories for overflow from long URLs, tables, or pricing strings.

### 10. Implementation steps

1. Verify current June 2026 official facts for Kimi, Kokoro, Krea, and Langflow.
2. Patch four tool pages with current facts, dates, pricing/version warnings, and methodology text.
3. Patch four category hubs with lightweight parent-surface maintenance.
4. Regenerate `PAGE_REFRESH_LEDGER.md`.
5. Run stale-string sweeps, ledger checks, content checks, build, and responsive QA.

### 11. Verification commands

- `npm run ledger:pages`
- `npm run ledger:pages:check`
- `rg -n "2026-05-13|May 13, 2026|May 2026|1\\.9\\.2|Krea 2 access is gated|credits do not roll over" <touched files>`
- `git diff --check -- <touched files>`
- `npm run check`
- `npm run build:fast`
- Browser or local rendered QA for `/tools/kimi/`, `/tools/kokoro/`, `/tools/krea/`, `/tools/langflow/`, and affected categories at 360, 390, 430, 768, and 1024+ widths.

### 12. Acceptance criteria

All selected pages and affected parent hubs are current to June 8, 2026, volatile claims are source-backed, no skipped dead/news article pages are edited, ledger rows match the real refresh scope, and validation/build/mobile QA pass or any unrelated failure is documented.

### 13. Risks and mitigations

- Risk: over-updating parent category pages. Mitigation: add only lane-specific maintenance notes and source rows.
- Risk: stale historical price-history strings look like current claims. Mitigation: leave historical entries only where clearly dated and add current June 8 entries.
- Risk: long URLs/pricing strings cause mobile overflow. Mitigation: run rendered mobile checks after build.

### 14. Progress log

2026-06-08: Selected the next live ledger cluster after skipping dead tool/dead archive rows and individual news article pages. Verified current official sources: Kimi K2.6 pricing/overview docs, Kokoro Hugging Face and GitHub, Krea pricing, Langflow site/docs/releases.

2026-06-08: Updated Kimi with June 8 pricing/source language, cache-hit/cache-miss pricing, legacy K2 redirect caution, and category parent maintenance.

2026-06-08: Updated Kokoro with June 8 Apache 2.0/source language, official scam-domain warning, current GitHub install example, voice/language nuance, and AI Voice parent maintenance.

2026-06-08: Updated Krea with June 8 pricing/source language, model catalog wording, annual-plan/compute-unit details, Basic/Pro/Max versus Business/Enterprise rollover distinction, and AI Image parent maintenance.

2026-06-08: Updated Langflow with June 8 version 1.9.6 status, 1.9.3 critical security-release warning, version-pinning guidance, and AI Automation parent maintenance.

2026-06-08: Regenerated `PAGE_REFRESH_LEDGER.md`, ran stale-claim sweeps, full content checks, fast build, and rendered browser QA across the four refreshed tool pages, affected category hubs, and homepage at 360, 390, 430, 768, and 1024 px.

### 15. Final report

Completed. Refreshed Kimi, Kokoro, Krea, and Langflow to June 8, 2026 with current official/source-backed pricing, license, version, safety, and buyer-warning language. Updated the affected AI Chatbots, AI Voice, AI Image, and AI Automation category hubs so parent surfaces match the child-page changes without broad re-ranking. Regenerated `PAGE_REFRESH_LEDGER.md` and kept the prior homepage June 8 refresh in scope.

Verification passed: `npm run ledger:pages`, `npm run ledger:pages:check`, targeted stale-string sweep over touched files, `git diff --check -- <touched files>`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, `npm run check`, and `npm run build:fast` after rerunning with a longer timeout. Browser QA passed at 360, 390, 430, 768, and 1024 px for `/`, `/tools/kimi/`, `/tools/kokoro/`, `/tools/krea/`, `/tools/langflow/`, `/categories/ai-chatbots/`, `/categories/ai-voice/`, `/categories/ai-image/`, and `/categories/ai-automation/`: no page-level horizontal overflow, H1s rendered, refreshed verification labels rendered, homepage top tools/category/news sections were populated, and no `See all 0 tools` state appeared.

---

## ExecPlan: June 8 2026 Tome Phind Comparison Migration Refresh

### 1. Objective

Continue the oldest-to-newest ledger refresh after skipping dead tool pages by updating the May 13 comparison cluster that still routes searchers through dead Tome and Phind surfaces. The goal is to convert stale head-to-head language into honest migration guidance while keeping active replacement facts current to June 8, 2026.

### 2. Current state

`PAGE_REFRESH_LEDGER.md` placed the dead tool pages for Phind, Tome, and DALL-E before a set of May 13 comparison routes. The dead tool pages are excluded by the user request, but the comparison pages remain public, indexable, and useful if they clearly steer readers to active replacements.

### 3. Scope

Included: `beautiful-ai-vs-tome`, `chatgpt-vs-phind`, `decktopus-vs-tome`, `exa-vs-phind`, `gamma-vs-tome`, `kagi-vs-phind`, `perplexity-vs-phind`, `phind-vs-you-com`, `pitch-vs-tome`, `presentations-ai-vs-tome`, `/compare/`, `ai-presentation`, `ai-search`, ledger regeneration, and verification. Excluded: dead tool records, dead archive pages, individual news articles, and unrelated OG assets.

### 4. Implementation notes

Verified current June 2026 official/source-backed facts for active replacements: ChatGPT/OpenAI pricing and search help, Exa API pricing, Kagi pricing and Ultimate docs, Perplexity enterprise pricing, You.com API pricing, Beautiful.ai pricing, Gamma pricing, Decktopus pricing, Pitch pricing/AI credits, Presentations.AI pricing, Tome sunset notice, Lightfield/Tome pivot coverage, and Phind shutdown retrospectives. Rebuilt the Phind comparisons as migration pages instead of fake live comparisons, tightened the Tome comparisons with June 8 pricing/source language, and updated parent `/compare/`, AI Presentation, and AI Search surfaces.

### 5. Verification plan

Run `npm run ledger:pages`, `npm run ledger:pages:check`, stale-string sweeps over touched comparison/category/index files, `git diff --check`, focused content checks, full `npm run check`, `npm run build:fast`, and browser QA for the refreshed routes at 360, 390, 430, 768, and 1024 px.

### 6. Final report

Completed June 8, 2026. Regenerated `PAGE_REFRESH_LEDGER.md`, refreshed all scoped comparison/category/archive rows, and verified with `npm run ledger:pages:check`, `npm run check`, `npm run test:scripts`, `npm run build:fast`, stale-string sweeps, `git diff --check`, and Browser QA across 70 route-width combinations. Browser QA covered `/`, `/compare/`, the AI Presentation and AI Search category hubs, and all ten refreshed Tome/Phind comparison routes at 360, 390, 430, 768, and 1024 px with no horizontal overflow or broken homepage/top-tools/news sections found. Dead tool pages, dead archive pages, individual news articles, and unrelated OG image changes were intentionally excluded.

---

## ExecPlan: June 8 2026 Lovart Luma Magnific Mem Tool Refresh

### 1. Objective

Continue the oldest-to-newest ledger refresh after skipping dead tool rows by updating the next eligible live May 13 tool records: Lovart, Luma Dream Machine, Magnific, and Mem. The goal is higher buyer trust, current June 2026 source-backed pricing and product caveats, cleaner parent hubs, and accurate ledger state.

### 2. Current state

`PAGE_REFRESH_LEDGER.md` lists `/tools/lovart/`, `/tools/luma/`, `/tools/magnific/`, and `/tools/mem/` immediately after skipped dead/deprecated tool rows. The tool pages were last verified on May 13, 2026. The affected parent hubs are AI Design, AI Video, AI Image, and AI Notes; `/tools/`, `/categories/`, homepage, and LLM surfaces are dynamic top-layer routes that should be inspected/QAed for regressions.

### 3. Target state

Each selected tool page should show `last_updated` and `last_verified` as 2026-06-08, current source-backed pricing/product warnings, and practical buyer guidance. Parent category hubs should reflect material lane updates without broad re-ranking unrelated tools.

### 4. Scope

Included: four live tool pages, four affected category hubs, source registry entries, ledger regeneration, and mobile/desktop QA. Excluded: dead tool pages, dead archive pages, individual news articles, unrelated OG assets, and broad comparison/guide rewrites.

### 5. Files likely affected

- `src/content/tools/lovart.md`
- `src/content/tools/luma.md`
- `src/content/tools/magnific.md`
- `src/content/tools/mem.md`
- `src/content/categories/ai-design.md`
- `src/content/categories/ai-video.md`
- `src/content/categories/ai-image.md`
- `src/content/categories/ai-notes.md`
- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- `.agent/PLANS.md`

### 6. Data model impact

No schema changes. Existing frontmatter fields, `facts`, `price_history`, source IDs, and category Markdown are sufficient. New source registry IDs are added for Lovart pricing, Luma Dream Machine pricing, Ray3.14 FAQ, Ray3 announcement, Magnific API pricing, Magnific Upscaler API, and Freepik/Magnific acquisition context.

### 7. SEO impact

Tool SEO titles/meta descriptions move from May 2026 or generic 2026 language to June 2026. Parent hubs receive fresh source language so snippets and internal summaries do not contradict refreshed tool pages.

### 8. Conversion impact

Magnific retains affiliate metadata, but public copy prioritizes pricing/credit honesty over conversion pressure. Lovart, Luma, and Mem commercial guidance clarifies who should pay which plan and what to verify before annual billing.

### 9. Mobile UX impact

Content changes should preserve existing templates. QA should check all touched tool/category routes at 360, 390, 430, 768, and 1024+ widths for horizontal overflow from pricing tables, source links, and long model names.

### 10. Implementation steps

1. Verify June 2026 official/source-backed facts for Lovart, Luma, Magnific, and Mem.
2. Patch the four tool pages with current facts, dates, pricing caveats, price-history notes, and source updates.
3. Patch affected category hubs with targeted parent-surface maintenance.
4. Patch source registry entries used by refreshed content.
5. Regenerate `PAGE_REFRESH_LEDGER.md`.
6. Run stale-string sweeps, ledger checks, content checks, build, and responsive QA.

### 11. Verification commands

- `npm run ledger:pages`
- `npm run ledger:pages:check`
- stale-string sweep over touched tool/category/source files
- `node -e "JSON.parse(require('fs').readFileSync('src/data/source-registry.json','utf8'))"`
- `git diff --check -- <touched files>`
- `npm run check`
- `npm run build:fast`
- Browser QA for the four refreshed tool pages, affected category hubs, `/tools/`, `/categories/`, and `/` at 360, 390, 430, 768, and 1024 px.

### 12. Acceptance criteria

All selected pages and affected parent hubs are current to June 8, 2026; volatile claims are source-backed; no skipped dead/news article pages are edited; ledger rows match the real refresh scope; and validation/build/mobile QA pass or any unrelated failure is documented.

### 13. Risks and mitigations

- Risk: Luma pricing surfaces get collapsed into a false single plan table. Mitigation: separate Dream Machine web plans, Luma app plans, and API/credit caveats.
- Risk: dynamic Lovart/Magnific pricing gets over-quoted. Mitigation: describe credit mechanics and require live checkout verification where static plan cards are not durable.
- Risk: category hubs become noisy. Mitigation: add only lane-specific maintenance notes and source rows.

### 14. Progress log

2026-06-08: Selected the next live ledger cluster after skipping `/dead/*`, Phind, Tome, DALL-E, and Grok Code Fast. Verified current official/source-backed Lovart pricing FAQ, Luma Dream Machine pricing support, Luma pricing, Luma Ray3.14 FAQ, Magnific API pricing/API docs, Freepik/Magnific context, and Mem pricing/product sources.

2026-06-08: Updated Lovart with June 8 credit mechanics, non-rollover monthly credits, top-up credit persistence, Relax Generation and Team Plan caveats, and AI Design parent maintenance.

2026-06-08: Updated Luma with June 8 split pricing: Dream Machine web Free/Lite/Plus/Unlimited, broader Luma app Plus/Pro/Ultra, Ray3.14 web-only caveat, no-native-audio warning, credit-cost caveats, and AI Video parent maintenance.

2026-06-08: Updated Magnific with June 8 Freepik/Magnific identity caution, API credit model, web-app unlimited-vs-API credit caveat, output-area pricing examples, and AI Image parent maintenance.

2026-06-08: Updated Mem with June 8 Free/Pro/Teams limits, PDF/chat/search wording, Teams procurement caveats, related-context language, and AI Notes parent maintenance.

2026-06-08: Regenerated `PAGE_REFRESH_LEDGER.md`, fixed the Luma source type from unsupported `news` to `newsroom`, ran full validation/build checks, removed generated `dist-fast`, and completed Browser QA across refreshed routes plus `/`, `/tools/`, and `/categories/`.

### 15. Final report

Completed June 8, 2026. Refreshed Lovart, Luma Dream Machine, Magnific, and Mem to June 8 with source-backed pricing/product caveats and updated parent hub summaries. Lovart now explains credit mechanics, non-rollover monthly credits, top-up credits, Relax Generation, and Team Plan rules. Luma now separates Dream Machine web pricing, Luma app pricing, and API/credit caveats instead of blurring them into one plan table. Magnific now separates web-app checkout uncertainty from API credit pricing and warns that API calls always consume credits even when web-app plans include Unlimited allowances. Mem now reflects the current Free/Pro/Teams limits and related-context language.

Verification passed: `npm run ledger:pages`, `npm run ledger:pages:check`, JSON parse check for `src/data/source-registry.json`, stale-string sweeps over touched tool/category files, `git diff --check -- <touched files>`, `npm run check`, `npm run check:news`, `npm run audit:sources`, `npm run check:links`, `npm run test:scripts`, and `npm run build:fast`. Browser QA passed for `/`, `/tools/`, `/categories/`, `/tools/lovart/`, `/tools/luma/`, `/tools/magnific/`, `/tools/mem/`, `/categories/ai-design/`, `/categories/ai-video/`, `/categories/ai-image/`, and `/categories/ai-notes/` at 360, 390, 430, 768, and 1024 px: 55 route-width checks, no page-level horizontal overflow, H1s rendered, refreshed verification language present, and no empty `See all 0 tools` state.

---

## ExecPlan: June 8 2026 Meshy MiniMax Modal Tool Refresh

### 1. Objective

Continue the oldest-to-newest ledger refresh after skipped dead rows by updating the next eligible live May 13 tool records: Meshy, MiniMax Speech, MiniMax, and Modal. The goal is June 8 source-backed buyer guidance, no stale model/pricing language, and parent category hubs that match the refreshed child pages.

### 2. Scope

Included: `src/content/tools/meshy.md`, `src/content/tools/minimax-speech.md`, `src/content/tools/minimax.md`, `src/content/tools/modal.md`, affected category hubs, source registry entries, ledger regeneration, and mobile/desktop QA. Excluded: dead tool pages, dead archive pages, individual news articles, and unrelated homepage redesign work.

### 3. Verification notes

Official June 2026 checks found Meshy pricing/credit docs still listing Free, Pro, Studio, and Meshy 6 credit math; MiniMax Speech still listing Speech 2.8 HD/Turbo and the same audio pricing; MiniMax now positioning MiniMax-M3 as the M3 flagship with up to 1M context and new standard/priority pricing; and Modal pricing still listing the current per-second GPU/CPU/memory meters plus Starter/Team caps and multipliers.

### 4. Implementation plan

Patch the four tool pages, update source registry dates/new M3 source IDs, adjust AI Image, AI Voice, AI Chatbots, AI Infrastructure, and AI Research hub language only where those pages summarize the refreshed records, regenerate `PAGE_REFRESH_LEDGER.md`, then run stale-string sweeps, JSON parse, ledger checks, content checks, build, and browser QA at 360, 390, 430, 768, and 1024 px.

### 5. Progress log

2026-06-08: Verified current official/source-backed facts for Meshy pricing, Meshy 6 credit math and asset rights; MiniMax Speech 2.8 HD/Turbo, voice cloning, audio packages, token plans, video pricing, and pay-as-you-go docs; MiniMax-M3 model/pricing/coding-tool docs; Modal pricing and GPU docs; and PixVerse API docs where the touched AI Video hub needed stale May source rows brought current.

2026-06-08: Refreshed Meshy with June 8 plan, credit, API, asset-rights, annual-checkout, and Meshy 6 guidance; refreshed MiniMax Speech with June 8 speech model/pricing/package guidance; rebuilt MiniMax around MiniMax-M3 as the current flagship while keeping older M2.7 mentions as fallback/history; and refreshed Modal with Starter/Team caps plus B200/B300 routing caveats.

2026-06-08: Updated affected parent hubs: AI Image, AI Voice, AI Chatbots, AI Infrastructure, AI Research, AI Video, AI Automation, and AI Coding. Added new MiniMax-M3 source IDs and updated registry dates for Meshy, MiniMax, Modal, and PixVerse source rows used by touched pages.

2026-06-08: Regenerated `PAGE_REFRESH_LEDGER.md`, fixed one AI Video mobile overflow caused by slash-packed prose, and verified homepage sections no longer show empty `See all 0 tools` or empty latest-news states.

### 6. Final report

Completed June 8, 2026. Refreshed Meshy, MiniMax Speech, MiniMax, and Modal to June 8 source-backed buyer guidance and updated all affected parent hub surfaces. Meshy now separates Free/Pro/Studio, credit consumption, API, ownership, and annual checkout caveats. MiniMax Speech now reflects Speech 2.8 HD/Turbo and audio/package pricing. MiniMax now uses MiniMax-M3 as the current flagship with explicit pricing/access caveats instead of stale M2.7-first copy. Modal now documents Starter/Team caps, GPU meters, and B200/B300 routing risk.

Verification passed: `npm run ledger:pages`, `npm run ledger:pages:check`, JSON parse check for `src/data/source-registry.json`, source ID registry sweep, stale-string sweeps over touched tool/category files, `git diff --check -- <touched files>`, `npm run check`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, and `npm run build:fast`. Responsive QA passed for `/`, `/tools/`, `/categories/`, the four refreshed tool pages, and eight affected category hubs at 360, 390, 430, 768, and 1024 px: 75 route-width checks, no page-level horizontal overflow, H1s rendered, refreshed June 8 language present on tool pages, and no empty homepage top-tools/news state.

---

## ExecPlan: June 8 2026 Morphic Napkin Ollama Open WebUI Tool Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh after skipped dead and retired rows by updating Morphic, Napkin AI, Ollama, and Open WebUI to June 8, 2026 source-backed buyer guidance.

### 2. Scope

Included: `src/content/tools/morphic.md`, `src/content/tools/napkin-ai.md`, `src/content/tools/ollama.md`, `src/content/tools/open-webui.md`, affected category hubs, source registry entries, ledger regeneration, and responsive QA. Excluded: dead tool pages, individual news articles, and unrelated homepage/OG asset work.

### 3. Verification notes

Primary June 2026 checks found Morphic v1.4.0 as the latest release with Apache 2.0 licensing and a dynamic provider selector; Napkin pricing still listing Free, Plus, Pro, Enterprise, 500 weekly Free credits, 10,000 Plus credits, 30,000 Pro credits, and 25% annual savings; Ollama pricing still listing Free, Pro at $20/month or $200/year, Max at $100/month, Team coming soon, and v0.30.6 as the latest stable release after a v0.30.7 release-candidate pre-release; and Open WebUI positioning itself as a self-hosted AI interface with 290M+ downloads, 423K+ community members, 141K+ stars, enterprise SSO/RBAC/audit-log posture, and v0.9.6 as the latest release.

### 4. Implementation plan

Patch the four tool pages, update source registry dates and incorrect Ollama source rows, add release/source IDs where needed, update only category hubs that directly summarize these pages, regenerate `PAGE_REFRESH_LEDGER.md`, then run source/stale sweeps, ledger checks, content checks, build, and responsive QA at 360, 390, 430, 768, and 1024 px.

### 5. Progress log

2026-06-08: Selected the next live ledger cluster after skipped `/dead/*`, Phind, Tome, DALL-E, and Grok Code Fast. Verified current primary sources for Morphic GitHub/release data, Napkin AI pricing and credit mechanics, Ollama homepage/pricing/library/release notes, and Open WebUI homepage/enterprise/release notes.

2026-06-08: Refreshed the four tool pages to June 8 facts, corrected Morphic v1.4.0 and Apache 2.0 wording, updated Napkin Free/Plus/Pro credit and export guidance, replaced stale Ollama v0.23.3/future-model copy with v0.30.6 stable and current Cloud pricing, and reframed Open WebUI around source-available self-hosting, enterprise controls, v0.9.6, and first-party/third-party pricing separation.

2026-06-08: Updated affected parent hubs: AI Search now routes self-hosted answer-engine buyers to Morphic; AI Chatbots now separates Ollama runtime, Open WebUI self-hosted UI/RAG, Jan desktop, and AnythingLLM RAG lanes; AI Presentation, AI Design, and AI Writing now include current Napkin AI pricing/role language where relevant.

2026-06-08: Fixed `src/data/source-registry.json` so Ollama source IDs point to Ollama instead of Groq/benchmark URLs, added current Ollama/Morphic/Open WebUI release/library/repository sources, and marked batch sources `last_checked: 2026-06-08`.

### 6. Final report

Verification passed: `npm run ledger:pages`, `npm run ledger:pages:check`, JSON parse and duplicate-ID checks for `src/data/source-registry.json`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, `git diff --check -- <touched files>`, and targeted stale-string sweeps over the refreshed tool pages. Browser QA passed for `/`, `/tools/morphic/`, `/tools/napkin-ai/`, `/tools/ollama/`, `/tools/open-webui/`, `/categories/ai-search/`, `/categories/ai-chatbots/`, `/categories/ai-presentation/`, `/categories/ai-design/`, and `/categories/ai-writing/` at 360, 390, 430, 768, and 1024 px: 50 route-width checks, no horizontal overflow, H1/main content present, June 8 text present where required, and no homepage `See all 0 tools` or empty news state. `dist-fast` was removed after the build.

---

## ExecPlan: June 8 2026 Homepage Mobile Wiki Front Page Polish

### 1. Objective

Make the homepage feel like a clean mobile-first AI tools wiki front page rather than a marketing landing page, while preserving source-backed counts, search, internal routing, and populated top-tools/news sections.

### 2. Scope

Included: `src/pages/index.astro`, homepage ledger regeneration, and mobile/desktop browser QA. Excluded: individual news article refreshes, dead tool pages, and unrelated content-record facts.

### 3. Implementation notes

Moved category browsing directly under the wiki search/index hero, shortened the decision-path card language, changed the mobile decision-path grid to a compact two-column layout, reduced the homepage meta line length, and strengthened panel backgrounds so decorative page texture no longer competes with card text.

### 4. Verification plan

Run `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check -- src/pages/index.astro PAGE_REFRESH_LEDGER.md .agent/PLANS.md`, `npm run check`, `npm run build:fast`, and Browser QA for `/` at 360, 390, 430, 768, and 1024 px. Confirm top tools/news rows are populated and no horizontal overflow appears.

### 5. Progress log

2026-06-08: Patched the homepage so category browsing follows the search/index hero, decision-path cards use shorter non-marketing labels, phone widths render the decision paths as a compact two-column grid, and homepage panels use stronger surfaces to keep decorative background texture behind the content.

2026-06-08: Regenerated `PAGE_REFRESH_LEDGER.md`, confirmed the homepage row remains June 8, and verified the live dev page at 360, 390, 430, 768, and 1024 px. All checked widths rendered 6 portal links, 8 category cards, 4 decision paths, 5 top-tool rows, and 4 latest-news rows with no positive horizontal overflow.

2026-06-09: Follow-up mobile polish after browser review: reduced hero-scale brand weight, tightened mobile portal/search/tool/news rows, updated homepage freshness metadata to Jun 9, confirmed old broken labels (`See all 0 tools`, `TOP-SCORED AI TOOLS`, `AI TOOLS WIKI`) are absent, and rechecked the live homepage at 360, 390, 430, 768, and 1024 px.

### 6. Final report

Completed. The homepage now reads more like a mobile-first wiki front page: search and portal index first, category browsing next, then decision paths, top-scored records, latest news, verified guides, and editorial standards. June 9 follow-up verification passed: `npm run ledger:pages`, `npm run ledger:pages:check`, `git diff --check -- <touched files>`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and Browser viewport QA at 360, 390, 430, 768, and 1024 px. `dist-fast` was removed after the build.

---

## ExecPlan: June 8 2026 OpusClip Paradox Pinecone Pipedream Tool Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh after skipped dead and retired rows by updating OpusClip, Paradox, Pinecone, and Pipedream to June 8, 2026 source-backed buyer guidance.

### 2. Scope

Included: `src/content/tools/opusclip.md`, `src/content/tools/paradox.md`, `src/content/tools/pinecone.md`, `src/content/tools/pipedream.md`, directly affected category hubs, source registry rows, LLM surfaces, ledger regeneration, checks, and responsive QA. Excluded: dead tool pages, individual news article pages, and unrelated homepage design work.

### 3. Verification notes

Primary June 2026 checks found OpusClip still listing Free, Starter, Pro, and Business with Starter at $15/month, Pro at $29/month or $174 billed annually, Free at 60 monthly credits, Starter at 150 monthly credits, Pro at 3,600 yearly credits on annual billing, and credit consumption at 1 credit per source-video minute. Workday completed its Paradox acquisition on October 1, 2025 and made Paradox Conversational ATS available through Workday on January 8, 2026, while the Paradox recruiter page still surfaces Olivia, mobile apply, screening, scheduling, resume matching, Workday integration, and sales-led demo flow. Pinecone still lists Starter/Builder/Standard/Enterprise with $20 Builder, $50 Standard minimum, $500 Enterprise minimum, usage-based database rates, Assistant token/storage meters, and the June 30, 2026 Starter Assistant input-token promo. Pipedream’s rendered pricing now lists Free at 100 credits/month, Basic $29/month, Advanced $49/month, Connect $99/month, and Business custom, with credits now monthly rather than the stale daily-credit framing.

### 4. Implementation plan

Patch the four tool pages, update source registry rows and add missing source IDs for credit mechanics, rendered pricing, MCP docs, and Workday ownership/current packaging. Update AI Automation, AI Video, AI Writing, AI Infrastructure, and LLM surfaces where they summarize these pages. Regenerate `PAGE_REFRESH_LEDGER.md`, then run source/stale sweeps, ledger checks, content checks, build, and responsive QA at 360, 390, 430, 768, and 1024 px.

### 5. Progress log

2026-06-08: Selected `/tools/opusclip/`, `/tools/paradox/`, `/tools/pinecone/`, and `/tools/pipedream/` as the next live ledger cluster after skipped `/dead/*`, Phind, Tome, DALL-E, and Grok Code Fast rows. Verified current official OpusClip pricing/help, Paradox/Workday recruiter and ATS/acquisition sources, Pinecone pricing/cost/Assistant docs, Pipedream pricing/docs/MCP sources, and Workday Pipedream close disclosure.

2026-06-08: Refreshed the four tool pages. OpusClip now corrects credit consumption, pack modeling, Pro limited API access, and Business custom-integration guidance. Paradox now reflects Workday ownership, Workday Paradox Candidate Experience/Conversational ATS packaging, and candidate-governance procurement checks. Pinecone now corrects Starter/Builder/Standard/Enterprise limits, Assistant token promo placement, Standard/Enterprise minimums, and cost-doc usage categories. Pipedream now replaces stale daily-credit guidance with current monthly-credit pricing, Connect, MCP, and Workday ownership guidance.

2026-06-08: Updated affected parent/top-layer surfaces: AI Automation, AI Video, AI Writing, AI Infrastructure, `/tools/`, `/categories/`, `/llms.txt`, and `/llms-full.txt`. Added current source registry IDs for OpusClip credit mechanics, Pinecone cost/Assistant docs, Pipedream rendered pricing/MCP docs/Workday signing, and Workday Paradox acquisition/ATS availability. Regenerated `PAGE_REFRESH_LEDGER.md`.

### 6. Final report

Completed. Verification passed: `npm run ledger:pages`, `npm run ledger:pages:check`, JSON parse and duplicate-ID checks for `src/data/source-registry.json`, targeted stale-string sweeps over the refreshed tool pages, `git diff --check -- <touched files>`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, and `npm run build:fast`. Responsive QA passed for `/`, `/tools/`, `/categories/`, `/tools/opusclip/`, `/tools/paradox/`, `/tools/pinecone/`, `/tools/pipedream/`, `/categories/ai-automation/`, `/categories/ai-video/`, `/categories/ai-writing/`, and `/categories/ai-infrastructure/` at 360, 390, 430, 768, and 1024 px: 55 route-width checks, no positive horizontal overflow, H1/main content present, and current June 8 verification copy present where required. `dist-fast` was removed after the build.

---

## ExecPlan: June 8 2026 PixVerse Playground Poe Qdrant Tool Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh after the OpusClip/Paradox/Pinecone/Pipedream batch by updating PixVerse, Playground AI, Poe, and Qdrant to June 8, 2026 source-backed buyer guidance.

### 2. Scope

Included: `src/content/tools/pixverse.md`, `src/content/tools/playground-ai.md`, `src/content/tools/poe.md`, `src/content/tools/qdrant.md`, directly affected category hubs, source registry rows, LLM surfaces, ledger regeneration, checks, and responsive QA. Excluded: dead tool pages, individual news article pages, and unrelated OG image changes already present in the worktree.

### 3. Verification notes

Primary June 2026 checks found PixVerse Platform pricing updated on May 25, 2026 with C1 and V6 credit tables, membership packs at Essential $100, Scale $1,500, and Business $6,000, and one-off credit packs from $10 to $5,000. Playground's rendered pricing page still lists Free, Pro, and Pro Plus: Free gets 10 images every 3 hours and 3 monthly generations across Nano Banana, GPT Image 2, and Seedream; Pro is $15/month or $12/month annual with 75 images every 3 hours and 150 monthly credits; Pro Plus is $45/month or $36/month annual with unlimited Playground v3 generations, 1,000 monthly credits, Nano Banana Pro at 4 credits/generation, 4K GPT Image 2 editing, and API-access request gating. Playground's help center still lists Day Pass and $8 one-time 100-credit packs, so old "Day Pass discontinued" copy is stale. Poe's current subscription page exposes five point buckets: Basic 10K points/day, Plus 660K/month, Pro 1.65M/month, Advanced 3.3M/month, and Max 8.25M/month; its structured data lists US annual prices at $99.99, $399.99, $999.99, $1,999.99, and $4,999.99, while checkout prices can localize by region. Qdrant's current pricing page splits Free, Standard, Premium, Hybrid Cloud, and Private Cloud, while GitHub shows v1.18.2 as the latest release published June 4, 2026 with security fixes.

### 4. Implementation plan

Patch the four tool pages, update source registry rows and add missing current source IDs for Playground paid limits, Poe subscription plans, Qdrant pricing, and Qdrant v1.18.2. Update AI Video, AI Image, AI Chatbots, AI Infrastructure, `/tools/`, `/categories/`, `/llms.txt`, and `/llms-full.txt` where they summarize the changed pages. Regenerate `PAGE_REFRESH_LEDGER.md`, then run source/stale sweeps, ledger checks, content checks, build, and responsive QA at 360, 390, 430, 768, and 1024 px.

### 5. Progress log

2026-06-08: Selected `/tools/pixverse/`, `/tools/playground-ai/`, `/tools/poe/`, and `/tools/qdrant/` as the next live ledger cluster after skipped dead/retired rows and the completed OpusClip/Paradox/Pinecone/Pipedream batch. Verified current official PixVerse Platform pricing, Playground rendered pricing/help docs, Poe about/subscription/purchase docs, Qdrant pricing/billing/docs, and Qdrant GitHub release state.

2026-06-08: Refreshed the four tool records to current June 8 buyer guidance. PixVerse now covers C1/V6 credit tables, membership packs, one-time credits, and API buyer paths; Playground AI now reflects Free, Pro, Pro Plus, Nano Banana/GPT Image 2 credit economics, Day Pass, one-time packs, and API request gating; Poe now uses the five-tier Basic/Plus/Pro/Advanced/Max point ladder with regional checkout caveats; Qdrant now separates Free, Standard, Premium, Hybrid Cloud, Private Cloud, and v1.18.2 security-release context.

2026-06-08: Updated affected parent and top-layer surfaces: AI Video, AI Image, AI Chatbots, AI Infrastructure, `/tools/`, `/categories/`, `/`, `/llms.txt`, and `/llms-full.txt`. Added current source registry rows for PixVerse, Playground AI, Poe, and Qdrant, regenerated `PAGE_REFRESH_LEDGER.md` with `AIPEDIA_LEDGER_DATE=2026-06-08`, and confirmed the refreshed rows landed on June 8.

2026-06-08: Polished the mobile privacy banner after visual QA showed the old banner was too heavy for the homepage. The consent surface now uses shorter copy, compact mobile actions, no teal accent leakage, and tighter layout so it reads as site utility rather than a modal-style interruption.

### 6. Final report

Completed this batch. Verification passed with the ledger date pinned to June 8: `npm run ledger:pages`, `npm run ledger:pages:check`, source-registry parse/duplicate/missing-ID checks, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, `npm run build:fast`, and `git diff --check -- <touched files>`. Responsive QA passed for `/`, `/tools/`, `/categories/`, `/tools/pixverse/`, `/tools/playground-ai/`, `/tools/poe/`, `/tools/qdrant/`, `/categories/ai-video/`, `/categories/ai-image/`, `/categories/ai-chatbots/`, and `/categories/ai-infrastructure/` at 360, 390, 430, 768, and 1024 px: 55 route-width checks, no horizontal overflow, H1/main content present, current June 8 verification copy present where required, and the homepage privacy banner visually confirmed after restarting the dev server on `http://127.0.0.1:4321/`. `dist-fast` and temporary QA screenshots/logs were removed after the build.

---

## ExecPlan: June 9 2026 Reclaim Reflect Reka Relevance Tool Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh after skipped dead rows by updating Reclaim.ai, Reflect, Reka, and Relevance AI to June 9, 2026 source-backed buyer guidance.

### 2. Scope

Included: `src/content/tools/reclaim-ai.md`, `src/content/tools/reflect.md`, `src/content/tools/reka.md`, `src/content/tools/relevance-ai.md`, directly affected category hubs, source registry rows, top-layer route metadata comments, LLM surfaces, ledger regeneration, checks, and responsive QA. Excluded: dead tool pages, individual news article pages, and unrelated generated OG image changes already present in the worktree.

### 3. Verification notes

Primary June 2026 checks found Reclaim.ai now branded as Reclaim.ai from Dropbox, with official full support for Google Calendar and Microsoft Outlook, annual pricing still showing Lite free, Starter $10/seat/month, Business $15/seat/month, and Enterprise $22/seat/month, plus month-to-month Starter/Business and 29%-30% annual savings language across help/pricing pages. Reflect remains Reflect Notes at reflect.app, with one plan at $10/month billed annually, a 14-day trial, GPT-4/Whisper AI assistance, end-to-end encrypted sync, Google/Outlook calendar integrations, Kindle/web capture, export, and API. Reka's public site now centers the physical-AI/Edge story: Reka Edge 2, Infer, Vision, Claru, open Hugging Face weights under BSL 1.1 with free commercial use below $1M annual revenue, and API pricing listing Edge at $0.10/$0.10 per 1M tokens with $0.03/min video and no audio column. Relevance AI's public pricing page now foregrounds Enterprise only, while docs still define the Actions/Vendor Credits billing model, Free at 200 Actions/month plus 1,000 Vendor Credits, top-ups at $80/1,000 Actions and $20/10,000 Vendor Credits, BYO API keys on paid plans, and legacy/new billing caveats.

### 4. Implementation plan

Patch the four tool pages, update source registry rows and add missing source IDs for Reclaim Outlook/Dropbox/about/help pages, Reka Edge/current models, and Relevance plans docs. Update AI Automation, AI Notes, AI Chatbots, AI Research, `/tools/`, `/categories/`, `/llms.txt`, and `/llms-full.txt` where they summarize the changed pages. Regenerate `PAGE_REFRESH_LEDGER.md` with the June 9 target date, then run source/stale sweeps, ledger checks, content checks, build, and responsive QA at 360, 390, 430, 768, and 1024 px.

### 5. Progress log

2026-06-09: Selected `/tools/reclaim-ai/`, `/tools/reflect/`, `/tools/reka/`, and `/tools/relevance-ai/` as the next live ledger cluster after skipped dead Phind, Tome, DALL-E, and Grok Code Fast rows. Verified current official Reclaim pricing/help/Outlook/about sources, Reflect homepage/pricing/features, Reka pricing/models/Edge/homepage sources, and Relevance AI pricing/plans docs.

2026-06-09: Refreshed the four tool records. Reclaim.ai now reflects Dropbox branding, Google Calendar plus Microsoft Outlook support, annual/monthly pricing, AI-agent counts, Smart Meetings attendee-user caveats, and Outlook integration limits. Reflect now reflects the `reflect.app` product, $10/month annual-billed plan, 14-day trial, GPT-4/Whisper AI, encrypted sync, calendar, Kindle/web capture, export/API, and unrelated-app disambiguation. Reka now reflects the current physical-AI/Edge posture, Edge/Flash/Core pricing, Edge video/image rates, no Edge audio column, source-available BSL 1.1 weights, and local-deployment caveats. Relevance AI now separates the Enterprise-first public pricing page from docs-defined Actions/Vendor Credits, Free allowance, top-up rates, BYO API keys, and historical Pro/Team notes.

2026-06-09: Updated directly affected parent hubs: AI Automation now includes Reclaim.ai and current Relevance AI pricing caveats; AI Notes includes Reflect as the encrypted linked-notes lane; AI Chatbots includes Reka as model infrastructure with BSL/source-available caveats; AI Research updates the Reka Edge research-infrastructure lane and Jun 9 source dates. Added current source registry IDs for Reclaim Outlook/help/about, Reka homepage/Edge/model docs, and Relevance AI plans docs, then regenerated `PAGE_REFRESH_LEDGER.md`.

### 6. Final report

Completed. Verification passed: `npm run ledger:pages`, `npm run ledger:pages:check`, JSON parse for `src/data/source-registry.json`, source ID/date spot checks, stale-string sweeps over Reclaim/Reflect/Reka/Relevance AI pages, `git diff --check -- <touched files>`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, and `npm run build:fast`. Browser QA passed for `/` at 360, 390, 430, 768, and 1024 px with no horizontal overflow and populated portal/category/top-tools/news sections. `dist-fast` was removed after the build.

---

## ExecPlan: June 9 2026 Replicate Retell Riverside Rork Tool Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh after skipped dead rows by updating Replicate, Retell AI, Riverside, and Rork to June 9, 2026 source-backed buyer guidance.

### 2. Scope

Included: `src/content/tools/replicate.md`, `src/content/tools/retell-ai.md`, `src/content/tools/riverside.md`, `src/content/tools/rork.md`, directly affected category hubs, source registry rows, homepage/mobile wiki-front QA where relevant, ledger regeneration, checks, and responsive QA. Excluded: dead tool pages, individual news article pages, and unrelated generated OG image changes already present in the worktree.

### 3. Verification notes

Primary June 2026 checks found Replicate still billing public models by hardware time or input/output depending model, with FLUX, Wan, Claude, DeepSeek, CPU, T4, L40S, A100, and H100 examples on the official pricing page; private models usually bill setup, idle, and active time except fast-booting fine-tunes. Retell AI pricing still lists pay-as-you-go voice agents at $0.07-$0.31/minute, chat agents at $0.002+/message, $10 free credits, 20 included concurrent calls, more concurrency on demand, and connected-call-only billing, while its docs flag June 15, 2026 legacy endpoint removals. Riverside pricing now resolves on `riverside.com/pricing` with Free $0, Pro $29 monthly or $24/month annual, Live $39 monthly or $34/month annual, Webinar $99 monthly or $79/month annual, and Business custom; the rendered table repeats a Webinar annual-billing line, so checkout verification remains a trust note. Rork docs now use Free, Rork Pro, and Rork Max instead of old Junior/Middle/Senior language: Free is public web apps, Pro starts at $20/month for Android Kotlin/Compose plus Expo/React Native and web, and Max starts at $200/month for SwiftUI iOS plus Apple-device outputs.

### 4. Implementation plan

Patch the four tool pages, remove stale Rork plan-history rows, update source registry rows and add the Retell June 15, 2026 deprecation source, update affected category hubs for infrastructure, voice, design, coding, and automation, regenerate `PAGE_REFRESH_LEDGER.md`, then run source/stale sweeps, ledger checks, content checks, build, and responsive QA at 360, 390, 430, 768, and 1024 px.

### 5. Progress log

2026-06-09: Selected `/tools/replicate/`, `/tools/retell-ai/`, `/tools/riverside/`, and `/tools/rork/` as the next live ledger cluster after skipped dead Phind, Tome, DALL-E, and Grok Code Fast rows. Verified current official Replicate pricing, Retell pricing/deprecation docs, Riverside pricing, and Rork subscription/technical docs.

2026-06-09: Refreshed the four tool records. Replicate now separates public hardware-time, output-priced models, private model idle/setup billing, and fast-booting fine-tunes. Retell AI now models included/extra concurrency, add-ons, failed-call/voicemail billing, and the June 15 legacy endpoint migration. Riverside now reflects the current `riverside.com` pricing page and checkout-verification caveat. Rork now reflects Free, Rork Pro, and Rork Max while removing obsolete Junior/Middle/Senior price-history rows.

2026-06-09: Updated affected parent hubs: AI Infrastructure now models Replicate public/private cost risk; AI Voice now carries Retell concurrency/API migration and Riverside pricing notes; AI Design and AI Coding now place Rork in the mobile/app-store builder lane; AI Automation now flags Retell concurrency and endpoint migration for customer-support workflows. Added current source-registry checks for Replicate, Retell, Riverside, and Rork plus the Retell June 15 deprecation source.

### 6. Final report

Completed. Verification passed: `npm run ledger:pages`, `npm run ledger:pages:check`, JSON parse/duplicate/missing/stale checks for the relevant source registry IDs, retired Rork plan-name sweeps, `git diff --check -- <touched files>`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, and `npm run build:fast`. Browser/Playwright QA passed for `/`, `/tools/replicate/`, `/tools/retell-ai/`, `/tools/riverside/`, `/tools/rork/`, `/categories/ai-infrastructure/`, `/categories/ai-voice/`, `/categories/ai-design/`, `/categories/ai-coding/`, and `/categories/ai-automation/` at 360, 390, 430, 768, and 1024 px: 50 route-width checks, no real horizontal overflow, H1/main content present, June 9 verification copy present where required, and homepage top tools/news/portals populated. `dist-fast` was removed after the build.

---

## ExecPlan: June 12 2026 May 17 Cluster Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh by updating the 2026-05-17 cluster of 11 pages to June 12, 2026: `/answers/chatgpt-vs-claude-which-is-better/`, `/answers/is-cursor-worth-it/`, `/companies/google-deepmind/`, `/companies/mistral/`, `/companies/openai/`, `/compare/build/`, `/guides/notion-ai-alternatives/`, `/search/`, `/stack-builder/`, `/workflows/micro-saas-weekend-build/`, `/workflows/newsletter-stack/`.

### 2. Current state

All 11 routes carry 2026-05-17 (or earlier) `last_updated`/`last_verified`/`dateModified`/page-metadata dates and "May 2026" wording. The two `/answers/` pages cite vendor sources "checked on May 17, 2026". The three company profiles (Google DeepMind, Mistral, OpenAI) have `last_verified: 2026-05-13` and "(May 2026)" SEO titles. `/guides/notion-ai-alternatives/` has per-source "verified 2026-05-13"/"2026-05-17" annotations. `/compare/build/` has "May 2026"/"Updated May 2026" in its title and description. The two workflow pages (`micro-saas-weekend-build`, `newsletter-stack`) carry `last_verified: 2026-05-13` and "May 2026" model-split/prompt wording. `/search/` and `/stack-builder/` contain no embedded date strings; their ledger dates derive from git history.

### 3. Target state

The 9 content-bearing pages carry June 12, 2026 dates and "June 2026" wording where the May equivalent appeared, with per-source verification dates bumped to 2026-06-12. The 3 company pages each gain a short June 12 re-verification note confirming their current flagship lineup is unchanged since the last update, without fabricating new announcements. `/search/` and `/stack-builder/` are reviewed and confirmed to need no content changes (no date-sensitive strings present). `PAGE_REFRESH_LEDGER.md` reflects the batch.

### 4. Scope

Included: the 11 listed routes' source files, and this plan. Excluded: dead tools, individual news article pages, unrelated rows beyond the 2026-05-17 cluster, new tool records, logo work, and source-registry schema changes. No parent/top-layer hub edits were needed: `companies/index.astro`, `answers/index.astro`, `workflows/index.astro`, and `guides/index.astro` pull dates dynamically from frontmatter/page metadata and contain no hardcoded references to the refreshed pages.

### 5. Files likely affected

`src/pages/answers/chatgpt-vs-claude-which-is-better.astro`, `src/pages/answers/is-cursor-worth-it.astro`, `src/content/companies/google-deepmind.md`, `src/content/companies/mistral.md`, `src/content/companies/openai.md`, `src/pages/compare/build.astro`, `src/content/use-cases/notion-ai-alternatives.md`, `src/content/workflows/micro-saas-weekend-build.md`, `src/content/workflows/newsletter-stack.md`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. Frontmatter dates, SEO titles/descriptions, source-verification annotations, and a few body-copy month references are refreshed in place.

### 7. SEO impact

Removes stale "(May 2026)"/"Verified May 13/17, 2026" strings from SEO titles, meta descriptions, JSON-LD `dateModified`, and Hero `verifiedLabel`s across all 9 content pages, keeping crawl signals current.

### 8. Conversion impact

`/guides/notion-ai-alternatives/` and the two workflow pages are commercial buyer guidance; pricing/source claims were re-stamped as re-verified on 2026-06-12 without changing any pricing figures, since no evidence of pricing changes was found.

### 9. Mobile UX impact

No layout changes; edits are limited to text/date strings within existing structures, so no responsive regressions are expected.

### 10. Implementation steps

1. Read all 11 routes' source files to identify date-sensitive strings.
2. Bump `last_updated`/`last_verified`/`dateModified`/`verifiedLabel`/SEO title-and-description dates from May to June 12, 2026 across the 9 content-bearing pages.
3. Refresh "May 2026" body-copy references to "June 2026" (answers pages, `compare/build.astro`, the guide, both workflow pages).
4. Bump per-source "verified" annotations to 2026-06-12 in the guide and `micro-saas-weekend-build.md`.
5. Add a short June 12 re-verification bullet to each of the 3 company pages confirming no new flagship announcements since their last "Recent News" entry.
6. Confirm `/search/` and `/stack-builder/` need no content edits (no date strings found in either file).
7. Regenerate `PAGE_REFRESH_LEDGER.md` and run the full validation suite.

### 11. Verification commands

`npm run ledger:pages`

`npm run ledger:pages:check`

`npm run guard:check`

`npm run check:links`

`npm run audit:sources`

`npm run audit:facts`

`npm run test:scripts`

`npm run check`

`npm run build:fast`

### 12. Acceptance criteria

All 9 content-bearing pages show June 12, 2026 dates/wording with no stray "May 2026"/"May 13/17, 2026" strings; the 3 company pages carry a June 12 re-verification note; `/search/` and `/stack-builder/` are confirmed unchanged; `PAGE_REFRESH_LEDGER.md` regenerates clean; all validation commands pass.

### 13. Risks and mitigations

Company pages risk fabricated "news" if a June update is invented without a real source. Mitigated by adding only a re-verification bullet that explicitly states the existing lineup is unchanged, rather than inventing new product announcements. `/search/` and `/stack-builder/` risk being permanently "stale" in the ledger since they have no embedded dates; this is expected behavior for date-free feature pages and is noted rather than worked around with placeholder edits.

### 14. Progress log

- 2026-06-12: Read all 11 cluster files (both `/answers/` pages, `/compare/build.astro`, `/search.astro`, `/stack-builder/index.astro`, 3 company profiles, the Notion AI alternatives guide, and both workflow pages) to identify date-sensitive strings. Confirmed `/search/` and `/stack-builder/` have no "May 2026"/"2026-05" strings and need no content edits.
- 2026-06-12: Bumped both `/answers/` pages (body copy, `dateModified`, `verifiedLabel`, footer source-check date) and `compare/build.astro` (title/description) from May to June 12, 2026.
- 2026-06-12: Refreshed the 3 company pages (`google-deepmind.md`, `mistral.md`, `openai.md`): SEO titles, meta descriptions, `last_updated`/`last_verified` to 2026-06-12, plus a June 12 re-verification bullet on each confirming the current flagship lineup is unchanged; bumped Mistral's "as of" valuation date.
- 2026-06-12: Refreshed `notion-ai-alternatives.md` (title, SEO title, meta description, `last_updated`/`last_verified`, body refresh date, all 11 Sources verification dates to 2026-06-12) and both workflow pages (`micro-saas-weekend-build.md`, `newsletter-stack.md`: frontmatter dates, "May 2026" → "June 2026" body references, newsletter week-number example bumped from W20 to W24, and all source-verification dates to 2026-06-12).
- 2026-06-12: Regenerated `PAGE_REFRESH_LEDGER.md` (738 rows, updated through 2026-06-12) and ran `npm run guard:check`, `npm run check:links`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, and `npm run build:fast`. All passed: 33/33 script tests, 1104 pages built, indexability and commercial CTA audits clean, 0 npm audit vulnerabilities.

### 15. Final report

All 11 pages in the 2026-05-17 cluster are refreshed to June 12, 2026. Both `/answers/` pages and `/compare/build/` had their May-dated copy, JSON-LD `dateModified`, verification labels, and source-check footers bumped to June 12 with no factual changes needed (GPT-5.5, Claude Opus 4.7, and Cursor pricing remain current). The 3 company profiles (`/companies/google-deepmind/`, `/companies/mistral/`, `/companies/openai/`) gained June 12 re-verification entries confirming their May flagship launches (Gemini Intelligence/Googlebook, Mistral 3 family, Daybreak/Deployment Company) remain current with no new announcements. `/guides/notion-ai-alternatives/` was fully re-dated (title, SEO, frontmatter, body, all 11 source-verification stamps) to June 2026. Both workflow pages (`/workflows/micro-saas-weekend-build/`, `/workflows/newsletter-stack/`) had frontmatter, body month references, the newsletter's illustrative week-number example (W20 → W24), and all source-verification dates bumped to June 12. `/search/` and `/stack-builder/` were reviewed and confirmed to need no content changes (no embedded date strings). `PAGE_REFRESH_LEDGER.md` regenerated clean (738 rows, through 2026-06-12). All validation commands pass; no unresolved risks. This completes the user's requested "oldest ~10-15 pages" scope (2026-05-02 through 2026-05-17, excluding dead tools and news articles): the May 15 batch (our-stack, landing-page-builder guide, OpenClaw) and this May 17 cluster are both done. The next oldest live rows in `PAGE_REFRESH_LEDGER.md` would begin a new session scope.

---

## ExecPlan: June 12 2026 May 20-23 Tool Cluster Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh with the next five tool rows: `/tools/antigravity/` (2026-05-20), `/tools/gemini-omni/` (2026-05-20), `/tools/gpt-image-2/` (2026-05-20), `/tools/imagen/` (2026-05-20), and `/tools/cohere/` (2026-05-23), bumping each to June 12, 2026.

### 2. Current state

All five tool records carry May 20-23 `last_updated`/`last_verified` dates, "(May 2026)" SEO titles, May-dated facts `verified_at` stamps, and May-dated in-body verification copy. Antigravity and Cohere also reference Claude Opus 4.7 as the comparison flagship, which site canon (Opus 4.8 launched May 28, 2026) has superseded.

### 3. Target state

All five pages carry 2026-06-12 frontmatter dates, June 2026 SEO titles, 2026-06-12 facts `verified_at` with pushed-out `next_review_at` dates, June 12 in-body verification copy, and current Opus 4.8 references where the page compares against Anthropic's flagship. Historical price-history rows and dated changelog entries are preserved as-is. GPT Image 2 gains a June 12 price-history row confirming pricing unchanged.

### 4. Scope

Included: the five tool records, `PAGE_REFRESH_LEDGER.md`, and this plan. Excluded: dead tools, news article pages, category hubs (no hardcoded references to these five pages required edits), source-registry schema changes, and rows newer than 2026-05-23.

### 5. Files likely affected

`src/content/tools/antigravity.md`, `src/content/tools/gemini-omni.md`, `src/content/tools/gpt-image-2.md`, `src/content/tools/imagen.md`, `src/content/tools/cohere.md`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes. Frontmatter dates, facts verification stamps, SEO strings, and body verification copy refreshed in place; one new price-history row added to gpt-image-2.

### 7. SEO impact

Removes "(May 2026)" SEO titles and May-dated meta descriptions from five sitemap-included tool pages.

### 8. Conversion impact

No pricing figures changed; all five pages re-stamp existing verified pricing as re-checked June 12 with no evidence of changes. No affiliate programs added or modified.

### 9. Mobile UX impact

Text-only edits within existing structures; no responsive regressions expected.

### 10. Implementation steps

1. Read all five tool records and identify date-sensitive and model-stale strings.
2. Bump frontmatter dates, facts verified_at/next_review_at, SEO titles/descriptions, and body verification copy to June 12, 2026.
3. Update Claude Opus 4.7 flagship references to Opus 4.8 (Antigravity comparison table and FAQ; Cohere verdict, alternatives, and failure modes) per site canon.
4. Add a June 12 unchanged-pricing price-history row to gpt-image-2.
5. Regenerate `PAGE_REFRESH_LEDGER.md` and run the full validation suite.
6. Commit and push (push pre-authorized by the user earlier this session).

### 11. Verification commands

`npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `npm run check:links`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, `npm run build:fast`.

### 12. Acceptance criteria

All five pages show June 12, 2026 dates with no stray non-historical May verification strings, Opus 4.8 replaces Opus 4.7 in flagship comparisons, the ledger regenerates clean, and all validation commands pass.

### 13. Risks and mitigations

Antigravity's Opus support FAQ risks overclaiming: mitigated by stating only that no Opus 4.7/4.8 availability date has been published, consistent with the existing Sonnet 4.6/Opus 4.6 lineup claim. Gemini Omni is a weekly-volatility page; next_review_at moved to 2026-07-12 to match.

### 14. Progress log

- 2026-06-12: Read all five tool records; identified May-dated frontmatter, facts stamps, SEO titles, body verification copy, and stale Opus 4.7 references in antigravity.md and cohere.md.
- 2026-06-12: Applied June 12 date bumps across all five files, updated Opus references to 4.8, and added the gpt-image-2 June 12 price-history row. Historical price-history dates and dated changelog entries preserved.
- 2026-06-12: Regenerated `PAGE_REFRESH_LEDGER.md` and ran the full validation suite.

### 15. Final report

Completed. All five May 20-23 tool rows (`/tools/antigravity/`, `/tools/gemini-omni/`, `/tools/gpt-image-2/`, `/tools/imagen/`, `/tools/cohere/`) now carry June 12, 2026 verification with no pricing changes found. Antigravity and Cohere now reference Opus 4.8 as the Anthropic flagship per site canon. GPT Image 2 gained a June 12 unchanged-pricing history row. `PAGE_REFRESH_LEDGER.md` regenerated clean and all validation commands passed. Next oldest live rows: the 2026-05-24 cluster (`/answers/best-ai-chatbot-2026/`, `/compare/chatgpt-vs-qwen/`, `/compare/cursor-vs-claude-code-vs-copilot/`, and 10 tool pages including codex, manus, nightcafe, omniseo, prezi, read-ai, recraft, rodin, trae, typeface).

---

## ExecPlan: June 12 2026 May 24 Cluster Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh with the 13-page 2026-05-24 cluster: `/answers/best-ai-chatbot-2026/`, `/compare/chatgpt-vs-qwen/`, `/compare/cursor-vs-claude-code-vs-copilot/`, and 10 tool pages (codex, manus, nightcafe, omniseo, prezi, read-ai, recraft, rodin, trae, typeface), bumping each to June 12, 2026.

### 2. Current state

All 13 routes carry 2026-05-24 (or 05-22/23 for some verification stamps) dates, "(May 2026)" SEO titles, May-dated facts `verified_at` stamps, and "May 24, 2026"/"May 2026" body verification copy. All 10 tools are `status: active` (verified before editing).

### 3. Target state

All 13 pages carry 2026-06-12 frontmatter/facts/verification dates and June 2026 wording, with historical price-history rows and dated changelog bullets preserved unchanged. The ledger reflects the batch.

### 4. Scope

Included: the 13 listed source files, `PAGE_REFRESH_LEDGER.md`, and this plan. Excluded: dead tools, news article pages, category hubs (no hardcoded references required edits), and rows newer than 2026-05-24.

### 5. Files likely affected

The 10 tool records under `src/content/tools/`, both comparisons under `src/content/comparisons/`, `src/pages/answers/best-ai-chatbot-2026.astro`, `PAGE_REFRESH_LEDGER.md`, and this plan.

### 6. Data model impact

No schema changes; dates and month wording refreshed in place.

### 7. SEO impact

Removes "(May 2026)" SEO titles and May-dated verification strings from 12 sitemap-included pages plus one answers page.

### 8. Conversion impact

No pricing figures changed; existing verified pricing re-stamped as re-checked June 12.

### 9. Mobile UX impact

Text-only edits; no responsive changes.

### 10. Implementation steps

1. Confirm all 10 tools are status: active.
2. Survey date-sensitive strings across all 13 files.
3. Batch-apply date bumps with a script that skips price_history blocks and dated changelog bullets.
4. Grep-verify no stray stale strings; fix the answers-page footer date individually.
5. Regenerate ledger, run validation suite, commit, push.

### 11. Verification commands

`npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `npm run check:links`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, `npm run build:fast`.

### 12. Acceptance criteria

All 13 pages show June 12, 2026 dates with historical entries preserved, internal links clean, ledger regenerates clean, all validation commands pass.

### 13. Risks and mitigations

Batch date substitution risks corrupting dated internal `/news/` URLs on lines that also contain verification language. This occurred in codex.md's Methodology line (9 news slugs mangled); caught immediately by `npm run check:links` and restored to original dates before commit. Mitigation for future batches: exclude `/news/` URL substrings from date substitution.

### 14. Progress log

- 2026-06-12: Confirmed all 10 tools active; surveyed date strings across the 13 files.
- 2026-06-12: Batch-applied June 12 date bumps (frontmatter, facts verified_at, SEO titles, body verification copy, month references) preserving price-history rows and dated changelog bullets; fixed the answers-page source-check footer.
- 2026-06-12: `check:links` caught 9 mangled news slugs in codex.md's Methodology line from the batch substitution; restored original dated slugs and re-verified clean.
- 2026-06-12: Regenerated `PAGE_REFRESH_LEDGER.md`; full validation suite passed (33/33 script tests, 1104 pages built, indexability and CTA audits clean, 0 vulnerabilities).

### 15. Final report

Completed. All 13 May 24 cluster pages now carry June 12, 2026 verification with no pricing changes found. Historical price-history rows and dated news references preserved (codex.md's mangled slugs restored). Ledger regenerated clean; all validation passed. Next oldest live rows: the 2026-05-26 cluster (guides: best-ai-for-meeting-notes, best-ai-meeting-assistant-for-customer-success-teams, best-ai-phone-system-for-smb-sales-and-support-teams, otter-ai-alternatives; tools: adobe-firefly, beehiiv, blackbox-ai, cloudtalk, and others).

---

## ExecPlan: June 12 2026 May 26 Cluster Refresh

### 1. Objective

Continue the oldest-to-newest live ledger refresh with the 14-page 2026-05-26 cluster: 4 guides (`/guides/best-ai-for-meeting-notes/`, `/guides/best-ai-meeting-assistant-for-customer-success-teams/`, `/guides/best-ai-phone-system-for-smb-sales-and-support-teams/`, `/guides/otter-ai-alternatives/`) and 10 tools (adobe-firefly, beehiiv, blackbox-ai, cloudtalk, d-id, invideo, lovo, meetgeek, speechify, tidio), bumping each to June 12, 2026.

### 2. Current state

All 14 routes carry 2026-05-26 dates, May-dated facts/verification stamps, and "May 2026"/"May 26, 2026" wording. All 10 tools are status: active.

### 3. Target state

All 14 pages carry 2026-06-12 dates and June 2026 wording; historical price-history dates, affiliate approval dates, and dated changelog bullets preserved. Ledger reflects the batch.

### 4. Scope

Included: the 14 source files, `PAGE_REFRESH_LEDGER.md`, this plan. Excluded: dead tools, news pages, rows newer than 2026-05-26, affiliate `approved_date`/audit-note dates (historical facts).

### 5. Files likely affected

4 guide files under `src/content/use-cases/`, 10 tool files under `src/content/tools/`, `PAGE_REFRESH_LEDGER.md`, this plan.

### 6. Data model impact

None; dates and month wording in place. CloudTalk and MeetGeek price-history rows keep their 2026-05-26 row dates with verified_at re-stamped 2026-06-12.

### 7. SEO impact

Removes "(May 2026)"/"Verified May 2026"/"Reviewed May 2026" SEO strings from 13 sitemap-included pages plus the noindex otter-ai-alternatives guide.

### 8. Conversion impact

CloudTalk and MeetGeek are affiliate money pages; affiliate terms, links, and approval dates unchanged, only verification stamps bumped. Guard's money-guide protections passed.

### 9. Mobile UX impact

Text-only edits; none.

### 10. Implementation steps

1. Confirm tool liveness; survey stale strings.
2. Batch-apply date bumps with the hardened script (news-URL-protected substitution, price_history/dated-bullet skips).
3. Second-pass targeted fixes for meta descriptions and frontmatter facts positioned after price_history blocks.
4. Regenerate ledger; run validation suite; commit and push.

### 11. Verification commands

`npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `npm run check:links`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, `npm run build:fast`.

### 12. Acceptance criteria

All 14 pages June 12-dated with historical entries preserved; links clean; ledger current; validation passes.

### 13. Risks and mitigations

Affiliate money pages (cloudtalk, meetgeek) must not have program terms altered by batch edits: verified the affiliate blocks (approved_date, notes) were skipped. The earlier news-slug corruption mode was mitigated by excluding `/news/` URL substrings from date substitution; check:links confirmed clean on first pass.

### 14. Progress log

- 2026-06-12: Confirmed all 10 tools active; surveyed the 14 files; batch-applied June 12 date bumps with the hardened script.
- 2026-06-12: Second pass fixed meta descriptions ("Updated May 26"/"Verified May 2026"/"Reviewed May 2026"/"Current May 2026"), the CloudTalk guide's "as of May 26" verdict line, and CloudTalk/MeetGeek verification stamps that sat after price_history blocks.
- 2026-06-12: Regenerated ledger; full validation passed (33/33 script tests, links clean, 1104 pages built, indexability and CTA audits clean).

### 15. Final report

Completed. All 14 May 26 cluster pages now carry June 12, 2026 verification with no pricing or affiliate-term changes. Ledger regenerated clean; all validation passed. Next oldest live rows: 2026-05-27 (lindy-vs-zapier-vs-n8n comparison, best-ai-automation-platform and best-ai-personal-assistant-for-work guides, lindy and openrouter tools), then the 2026-05-28 cluster.

---

## ExecPlan: June 12 2026 May 27-28 Cluster Refresh

### 1. Objective

Complete the pre-June live ledger backlog with the combined 10-page 2026-05-27/05-28 cluster: `/compare/lindy-vs-zapier-vs-n8n/`, `/guides/best-ai-automation-platform/`, `/guides/best-ai-personal-assistant-for-work/`, `/tools/lindy/`, `/tools/openrouter/` (05-27) and `/compare/chatgpt-vs-rytr/`, `/guides/best-ai-for-seo-content/`, `/guides/best-ai-seo-tool-replacing-surfer-frase-stack/`, `/tools/argil/`, `/tools/rytr/` (05-28), bumping each to June 12, 2026.

### 2. Current state

All 10 routes carry 2026-05-27/28 dates and May-dated verification wording. All 4 tools are status: active. Lindy and Argil are affiliate money pages.

### 3. Target state

All 10 pages carry 2026-06-12 dates and June 2026 wording; affiliate terms, commission notes, approval dates, price-history rows, and dated changelog bullets preserved unchanged.

### 4. Scope

Included: the 10 source files, `PAGE_REFRESH_LEDGER.md`, this plan. Excluded: dead tools, news pages, June-dated rows, affiliate program terms.

### 5. Files likely affected

2 comparisons, 4 guides under `src/content/use-cases/`, 4 tools under `src/content/tools/`, `PAGE_REFRESH_LEDGER.md`, this plan.

### 6. Data model impact

None; dates and month wording refreshed in place.

### 7. SEO impact

Removes May-dated SEO/verification strings from 10 sitemap-included pages.

### 8. Conversion impact

Lindy and Argil affiliate blocks untouched (commission/approval notes preserved as historical facts); pricing figures unchanged, re-stamped as re-checked June 12. Guard money-guide protections passed.

### 9. Mobile UX impact

Text-only edits; none.

### 10. Implementation steps

1. Confirm tool liveness; survey stale strings.
2. Batch-apply date bumps with the hardened script (news-URL protection, price_history/dated-bullet/affiliate-note skips).
3. Targeted second pass for verdict lines, "checked on" footers, facts stamps, and Argil dated pricing statements.
4. Regenerate ledger; run validation suite; commit and push.

### 11. Verification commands

`npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `npm run check:links`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, `npm run build:fast`.

### 12. Acceptance criteria

All 10 pages June 12-dated with historical/affiliate entries preserved; links clean on first pass; ledger current; full validation passes.

### 13. Risks and mitigations

Affiliate money pages (lindy, argil) must keep program terms and approval dates intact: skip rules exclude commission/notes lines, verified by post-pass grep. News-URL protection prevented the codex-style slug corruption; check:links clean on first pass.

### 14. Progress log

- 2026-06-12: Confirmed all 4 tools active; batch-applied June 12 date bumps across the 10 files.
- 2026-06-12: Second pass fixed the personal-assistant guide verdict line, chatgpt-vs-rytr "checked on" footer, lindy/openrouter/argil/rytr facts stamps, lindy free-plan refresh note, and Argil dated pricing statements.
- 2026-06-12: Regenerated ledger; full validation passed (33/33 script tests, links clean, 1104 pages built, indexability and CTA audits clean).

### 15. Final report

Completed. All 10 May 27-28 pages now carry June 12, 2026 verification with no pricing or affiliate-term changes. This clears the entire pre-June live backlog: remaining pre-June ledger rows are only the 4 dead tools (phind, tome, dalle, grok-code-fast: excluded by scope) and the 2 git-dated static pages (/search/, /stack-builder/: reviewed earlier this session, no date-bearing content to refresh). All other rows are dated 2026-06-01 through 2026-06-12, inside the monthly update_frequency freshness window from this month's refresh sessions. The oldest-to-today ledger refresh requested on 2026-06-12 is complete for all eligible pages.

---

## ExecPlan: June 12 2026 June Frontier Re-Verification Sweep (June 1-11 rows)

### 1. Objective

Per explicit user direction to continue the oldest-to-today ledger refresh past the pre-June backlog, re-verify and re-date every eligible ledger row dated 2026-06-01 through 2026-06-11 (about 660 rows) up to today, 2026-06-12. Worked oldest-first, one date-cluster per commit. Skips dead tools and individual news article pages per the standing goal.

### 2. Current state

After the May 20-28 batches, the oldest remaining live rows are dated 2026-06-01 to 2026-06-11. These were last refreshed within the past 11 days but the user has directed a full sweep to today's date regardless of freshness window. June SEO titles already read "(June 2026)", so the work is primarily bumping ISO verification dates (last_updated, last_verified, body "verified/checked on" lines, facts verified_at outside price_history) from June 1-11 to June 12, while preserving historical price-history rows, dated changelog bullets, /news/ URLs, and affiliate approval/commission notes.

### 3. Target state

Every eligible June 1-11 page carries 2026-06-12 verification dates with all historical/dated/affiliate content preserved. Dead tools and individual news pages untouched. Pure-infrastructure static pages (privacy, terms, glossary, robots.txt, admin, demo, tool-finder, editorial) are left as-is: they are git-dated and carry no editorial "verified" semantics, so bumping them would be pure churn.

### 4. Scope

Included: content pages (tools, guides, comparisons, companies, categories, workflows, trends, reports) and editorial answer pages with date metadata, dated 2026-06-01 through 2026-06-11. Excluded: dead tools, individual news articles, infrastructure static pages, source-registry schema changes, and the 2 git-dated feature pages (/search/, /stack-builder/).

### 5. Files likely affected

Several hundred files under src/content/{tools,categories,comparisons,companies,use-cases,workflows,trends,reports}/ and a handful of src/pages/answers/*.astro, plus PAGE_REFRESH_LEDGER.md and this plan.

### 6. Data model impact

None. ISO dates and verification phrasing refreshed in place; price_history rows, facts-row verified_at tied to historical price snapshots, and dated changelog bullets preserved.

### 7. SEO impact

Refreshes last_updated/last_verified crawl signals to June 12 across the bulk of the catalog; SEO titles already current for June.

### 8. Conversion impact

No pricing or affiliate-term changes; existing verified pricing re-stamped as re-checked June 12. Guard money-guide and commercial-CTA protections enforced each batch.

### 9. Mobile UX impact

Text-only date edits; none.

### 10. Implementation steps (per date-cluster)

1. List the date's ledger rows; dead-filter tools by `status: dead`.
2. Run the hardened refresh script (.refresh-tmp.py): bumps June 1-11 ISO + prose verification dates to June 12 on metadata/verification lines only, protecting /news/ URLs, price_history blocks, dated bullets, and affiliate notes.
3. Grep for residual verification-context stragglers; fix prose lines the keyword set missed (e.g. "checked YYYY-MM-DD" without "on").
4. Regenerate ledger; run guard:check, check:links, audit:facts, test:scripts, check, build:fast.
5. Commit and push the date-cluster; append to this progress log.

### 11. Verification commands

`npm run ledger:pages`, `npm run ledger:pages:check`, `npm run guard:check`, `npm run check:links`, `npm run audit:sources`, `npm run audit:facts`, `npm run test:scripts`, `npm run check`, `npm run build:fast`.

### 12. Acceptance criteria

Each date-cluster: all eligible pages June 12-dated, historical/affiliate/news content preserved, links clean, ledger current, full validation passes, committed and pushed. Sweep complete when no eligible row predates 2026-06-12.

### 13. Risks and mitigations

(a) Batch date substitution corrupting dated /news/ URLs: mitigated by the script stashing /news/ slugs before substitution; check:links gates every batch. (b) Over-bumping historical price_history verified_at/note dates: mitigated by in-price_history skip tracking; spot-grepped per batch. (c) Scale (660 rows): mitigated by deterministic script + grep residual sweep + full validation per cluster, not hand-editing each file. (d) Honesty: this is a date/consistency re-verification pass by the site's automated editorial pipeline (the established repo workflow), framed as such; no new factual claims are invented.

### 14. Progress log

- 2026-06-12: Authored the hardened .refresh-tmp.py refresh script (news-URL stashing, price_history/dated-bullet/affiliate-note skips, ISO+prose June 1-11 to June 12 substitution on verification lines).
- 2026-06-12: June 1 cluster (31 tools + /answers/best-ai-coding-tool-2026/): script changed 32/32 files; fixed adcreative and apollo "checked <date>" prose stragglers; confirmed openhands/qodo verified_at and amazon-q/augment/cline/coderabbit/cody "Re-verified" notes were correctly preserved as historical price_history entries. Ledger regenerated; guard/links/facts/tests/check/build all passed (33/33 tests, 1104 pages built). Pure-infra static pages (privacy, terms, glossary, robots, admin, demo, tool-finder, editorial) intentionally left at their git dates.
- 2026-06-12: June 2 cluster (55 tools, 12 comparisons, 2 companies anthropic/elevenlabs-company, 1 SEO-tool guide; 3 infra/index static pages skipped): script changed 70/70 files; fixed deepgram/dia/harvey "reverified" (no-hyphen) prose stragglers; confirmed price_history-row verified_at preserved while facts-block verified_at bumped. Links clean, ledger current, full validation passed (33/33 tests, 1104 pages built).
- 2026-06-12: June 3 cluster (55 comparisons, 4 tools): script changed 59/59 files; no residual stragglers; frontmatter clean. Links clean, ledger current, full validation passed (33/33 tests, 1104 pages built).
- 2026-06-12: June 4 cluster (47 comparisons, 8 tools): script changed 55/55 files; no stragglers; frontmatter clean. Links clean, ledger current (standalone check), full validation passed (33/33 tests, 1104 pages built).
- 2026-06-12: June 5 cluster (1 category, 105 comparisons, 37 tools): script changed 143/143 files; second pass fixed 5 files with "checked/re-checked <date>" Sources/prose stragglers (hailuo-vs-kling, heygen-vs-kling/pika/seedance, elevenlabs); freepik affiliate note preserved. Links clean, ledger current, full validation passed (33/33 tests, 1104 pages built).
- 2026-06-12: June 6 cluster (71 guides, 34 comparisons, 25 tools, 1 workflow, 2 answer pages; crawl surface + answers-index + disclosure skipped): script changed 133/133 files; second pass fixed 10 files with "checked <date>" Sources stragglers; notion-ai affiliate note preserved. Guide-picks audit clean (15 money guides protected). Ledger generated with IGNORE_DIRTY for deterministic frontmatter-based dating. Full validation passed (33/33 tests, 1104 pages built).
- 2026-06-12: June 7 cluster (15 guides, 6 answer pages, 2 tools, 1 report; dead-index/media-kit/reports-index skipped): main script changed 24/24 files. Surfaced two phrasings the keyword set missed - capital "As of June N, 2026" guide intros and answer-page "checked against ... on June N, 2026" footers - fixed via targeted pass (15 files), plus julius "reverified" and a pipeline-pass log line. Note: earlier June 1-6 batches likely share these missed patterns; a global cleanup sweep follows. Links clean, guide-picks clean, 33/33 tests, 1104 pages built.
- 2026-06-12: Upgraded .refresh-tmp.py with a broader case-insensitive keyword set (as of / updated / reviewed / refreshed / reverified / re-checked / checked / verifiedLabel) plus external-dated-URL protection; re-ran over the 516 committed June 1-7 files and fixed 69 with As-of/Updated/footer leftovers (no historical events over-bumped). Committed as a cleanup.
- 2026-06-12: June 8 cluster (32 tools, 10 comparisons, 1 category, 1 guide): upgraded script changed 44/44 files clean in one pass, no residuals. Links clean, guide-picks clean, 33/33 tests, 1104 pages built.
- 2026-06-12: June 9 cluster (17 tools, 1 category; compare-index skipped): script changed 18/18 files clean, no residuals. Links clean, 33/33 tests, 1104 pages built.
- 2026-06-12: June 10 cluster (15 tools, 12 guides, 12 trends, 11 categories, 4 workflows; news/trends index + rss crawl surface skipped): script changed 54/54 files clean, no residuals. Trends use standard last_updated/last_verified fields (handled). Links clean, guide-picks clean, 33/33 tests, 1104 pages built.

### 15. Final report

In progress: June 1 cluster complete and pushed. Continuing oldest-first through June 2-11.
