# AiPedia Agent Architecture Audit

Last audited: 2026-06-29

## Current Architecture Summary

AiPedia is an Astro 6 site using npm and Node 24. Content is stored in Astro content collections, rendered through shared layouts and components, and protected by a broad set of deterministic scripts. The workflow system is already strong: there are dedicated refresh planners, source and provenance audits, a Rust runner for tool and page refresh closeout, route QA, source-health checks, design contracts, and `.agent/` continuity docs.

The main opportunity is not a full rewrite. The repo needs a cleaner Codex-facing operating layer: one central agent contract, a concise manual, task templates, skills for repeatable work, and small deterministic helpers that reduce repeated inspection and prompt drift.

## Repo Layout

- `src/content/tools/`: tool markdown and volatile buyer facts.
- `src/content/categories/`: category hubs, top picks, and decision picks.
- `src/content/comparisons/`: same-job comparison pages.
- `src/content/use-cases/`: guides, buyer-intent pages, and plan pages.
- `src/content/news/`: dated AI and AI-tools news.
- `src/content/companies/`, `dead/`, `glossary/`, `reports/`, `workflows/`: supporting content collections.
- `src/pages/`: Astro route entries, public hubs, APIs, RSS, LLM text surfaces, and noindex tools.
- `src/layouts/`: shared page templates, including tool, category, comparison, guide, article, company, and workflow layouts.
- `src/components/`: CTA, SEO, trust, evidence, search, related-link, and decision UI.
- `src/lib/`: content models, search catalog, analytics, provenance, runtime helpers, and motion controller.
- `src/data/`: source registry, tool registry, generated manifests, loop definitions, comparison policy, and stats.
- `scripts/`: deterministic audits, guards, generators, planners, route QA, source health, and build helpers.
- `tools/aipedia-runner/`: Rust orchestration wrapper for refresh workflows.
- `workflows/`: durable procedures for tool refresh, page refresh, news refresh, affiliate conversion, QA, and templates.
- `.agent/`: tracked project memory, current status, plans, work log, loop receipts, and specialist agents.
- `skills/`: new Codex skill packs added by this refactor.

## Build System And Commands

Package manager: npm.

Runtime target: Node `24.x`.

Core commands:

- `npm run dev`: copy content and start Astro dev.
- `npm run build:fast`: run guards and fast production-output build.
- `npm run build`: full production build plus post-build audits.
- `npm run lint`: `guard:check`.
- `npm run typecheck`: Astro check with `tsconfig.typecheck.json`.
- `npm run check:quick`: script tests, command-surface audit, and bounded asset checks.
- `npm run check`: guards, links, news, and security audit.
- `npm run check:smart`: recommend the scoped verification set.
- `npm run qa:route`: built-route Playwright QA.
- `npm run qa:agent`: buyer-journey QA harness.
- `npm run ledger:pages`: regenerate `PAGE_REFRESH_LEDGER.md`.
- `npm run audit:provenance:changed`: scoped source and pricing provenance audit.
- `npm run audit:affiliate-conversion`: affiliate money-page contract audit.
- `npm run runner:tool-refresh:*`: Rust runner commands for tool refresh.
- `npm run runner:page-refresh:*`: Rust runner commands for non-tool page refresh.
- `npm run runner:affiliate-conversion:*`: no-content planning and handoff commands.

CI runs npm install, lint, typecheck, quick checks, broad checks, changed provenance, changed comparison quality, full build, and dist validation.

## Content Workflows

Tool refresh uses `workflows/tool-refresh/` and the Rust runner. Workers edit tool markdown only; the integrator updates shared files, source registry rows, parent hubs, ledger rows, and verification.

Non-tool refresh uses `workflows/page-refresh/` and the Rust runner. It classifies route QA policy, emits worker prompts and report scaffolds, aggregates reports, checks source health, and writes receipts.

Daily news uses `workflows/news-refresh/`. It is the highest editorial freshness priority and requires current source checks, affected-surface updates, news audits, route QA, and ledger updates.

Affiliate conversion uses `workflows/affiliate-conversion-pages/`. The current runner path is planning and handoff only. Public content still needs careful integrator execution.

Decision content uses `npm run loop:next`, `npm run loop:verify`, and `npm run loop:record`.

## Page Types

- Tool pages: `src/content/tools/*.md` rendered by `src/pages/tools/[slug].astro` and `src/layouts/ToolLayout.astro`.
- Category hubs: `src/content/categories/*.md` rendered by `CategoryLayout`.
- Comparison pages: `src/content/comparisons/*.md` rendered by `ComparisonLayout`.
- Guides and buyer pages: `src/content/use-cases/*.md` rendered through guide routes and layouts.
- News articles: `src/content/news/*.md` plus `/news/` and RSS.
- Companies, dead tools, glossary, reports, workflows, answers, and static pages.
- LLM and search surfaces: `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `/api/tools.json`, `/api/search-tools.json`, `/api/home-search.json`, and `src/lib/search-catalog.ts`.

## Content Collections And Schemas

The schema source is `src/content.config.ts`. It defines collections for tools, categories, comparisons, trends, companies, use cases, dead tools, glossary, reports, workflows, and news.

Important schema concepts:

- Tool facts use structured `toolFact` entries with source IDs, verified dates, confidence, volatility, and next review metadata.
- Use-case pages carry affiliate conversion metadata such as buyer job, audience, CTA plan, source refs, freshness windows, and guide picks.
- Category decision picks require source refs, verification dates, and confidence.
- News articles include dates, affected tools, categories, hero data, related tools, and source lists.

## Affiliate Handling

Affiliate data starts in tool frontmatter under `affiliate`. `CommercialCTA` and related components should only use affiliate links when application status is approved. Affiliate money pages must pass strict audit fields and preserve disclosure near commercial decisions.

Useful scripts:

- `npm run affiliate:conversion:inventory`
- `npm run audit:affiliate-conversion -- --strict --json`
- `npm run runner:affiliate-conversion:plan`
- `npm run runner:affiliate-conversion:reports`
- `npm run runner:affiliate-conversion:handoff`

## Image And OG Generation

Tool logos live under `public/logos/tools/`; the manifest is `src/data/logo-manifest.json`. Tool and news OG outputs are generated by scripts and tracked through manifests under `src/data/generated-assets/`.

Relevant commands:

- `node scripts/generate-logo-manifest.mjs`
- `node scripts/generate-og-svgs.mjs`
- `node scripts/generate-og-news.mjs`
- `npm run check:assets:quick`

## Internal Linking Structure

Internal links are enforced through route templates, related reading components, category hubs, guide clusters, comparison hubs, LLM surfaces, search APIs, and `PAGE_REFRESH_LEDGER.md`. The main link audit is `npm run check:links`. Parent hubs and top-layer pages must be inspected whenever child content changes.

## Existing Automation And Tooling

Strong existing tooling includes:

- Current-date and stale-fact guards.
- Frontmatter parsing.
- Source health and provenance audits.
- Page freshness ledger generation.
- Tool and page refresh planners.
- Rust runner closeout orchestration.
- Route QA and buyer-journey QA.
- OG, logo, favicon, and asset checks.
- Loop registry and decision-content workflow.
- Affiliate conversion inventory and audit.
- Guard challenge workflow for audit changes.

## Bottlenecks

- Rendered route QA can dominate closeout time for wide route matrices.
- Current-source checking is expensive when many pages share source-heavy sections.
- Shared files such as source registry, ledgers, category hubs, and top-layer routes require serial integration.
- Prompt drift can happen when worker prompts are copied by hand instead of using generated artifacts.
- Root docs and most `tools/*` folders were ignored by default, which made new operating docs easy to create locally but hard to commit intentionally.

## Brittle Areas

- Volatile pricing, model, API, and affiliate facts can stale quickly.
- Source registry dates can drift from visible source-link dates.
- Parent hubs can become weaker than refreshed child pages.
- Route QA needs noindex-aware flags for intentionally noindex interactive pages.
- Tool category changes require planner route updates and parent hub checks.
- Astro typecheck and build should not run in parallel.
- Generated manifests must be regenerated rather than hand-edited.

## Manual Tasks To Turn Into Tools

- Evidence bundle construction for a single tool or page.
- Page-claim extraction and volatility labeling.
- Parent hub impact detection for a changed route.
- Internal-link opportunity scoring.
- Affiliate CTA contract extraction by route.
- Skill directory validation.
- Memory object export from sources, ledgers, and worker reports.
- Page quality scoring that separates freshness, trust, buyer intent, and conversion.

## High-Risk Files And Directories

- `src/content/tools/`
- `src/content/categories/`
- `src/content/use-cases/`
- `src/content/comparisons/`
- `src/data/source-registry.json`
- `src/data/_meta/tools-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- `src/pages/index.astro`
- `src/pages/tools/index.astro`
- `src/pages/categories/index.astro`
- `src/pages/llms.txt.ts`
- `src/pages/llms-full.txt.ts`
- `src/layouts/ToolLayout.astro`
- `src/components/CommercialCTA.astro`
- `scripts/guard-*.mjs`
- `scripts/audit-*.mjs`
- `tools/aipedia-runner/src/main.rs`

## Safe Refactor Plan

1. Keep Astro, content collections, npm scripts, and current runner intact.
2. Make `AGENTS.md` a committed central entrypoint while preserving `.agent/` as current-state memory.
3. Add focused docs for workflows, reporting, memory, scoring, and future parallel architecture.
4. Add concise skills that route Codex to existing workflows and scripts.
5. Add small deterministic checks only where they reduce future prompt repetition.
6. Avoid moving content, routes, generated manifests, or public URLs.
7. Validate with no-build repo-maintenance gates unless rendered output changes.

## Quick Wins

- Add a committed skill pack for the most common AiPedia tasks.
- Add a skill checker so future skills do not drift.
- Add a workflow map command to summarize content, workflows, scripts, and skills.
- Standardize final reports.
- Standardize task prompts for common Codex requests.
- Document the evidence-bundle and memory object shape before building a heavier retrieval system.

## Deeper Future Improvements

- Build a deterministic evidence-bundle CLI for tool and guide refresh.
- Add a parent-surface impact detector based on route, collection, tags, and source IDs.
- Store structured claim receipts from worker reports in durable memory.
- Add a page quality score command that combines freshness, source quality, buyer intent, internal links, and conversion potential.
- Extend the Rust runner into a general task-DAG orchestrator.
- Add a long-running Python plus CuPy service only after local memory and scoring workloads justify GPU acceleration.
