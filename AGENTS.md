# AiPedia Codex Instructions

## Mission

AiPedia is a mobile-first, source-backed AI tools wiki and buying decision engine. Every change must improve at least one of: organic rankings, trust, mobile UX, affiliate conversion, revenue tracking, data quality, technical performance, maintainability, or editorial scalability.

AiPedia is not a generic directory. It must help users quickly decide what AI tool to use, what plan to buy, what to avoid, and what alternative is better.

## Hermes Agent workspace note

This copy lives at `C:\Users\mustb\Projects\aipedia-wiki-hermes` so Hermes Agent can operate on the same AiPedia website without disturbing the main working copy. Keep the public site identity, canonical domain, routes, content model, build scripts, and editorial rules the same as AiPedia unless explicitly asked otherwise.

Hermes Agent should use DeepSeek V4 Flash as the default low-cost model for routine repository work when configured through DeepSeek API, OpenRouter, Nous Portal, or a compatible custom endpoint. Escalate to a stronger model only for high-risk editorial, codebase-wide refactors, security-sensitive changes, or tasks where V4 Flash fails verification. Never let model cost optimization override source verification, page quality, mobile QA, or the page refresh ledger rule.

## Non-negotiable standards

Never ship placeholder work, fake sources, fake data, thin content, broken mobile layouts, untracked affiliate CTAs, duplicate low-value pages, or unverified claims.

Hard current-date rule: whenever any website page, template, content record, source registry entry, pricing fact, model fact, ranking, recommendation, affiliate surface, or commercial claim is updated, verify volatile facts against current sources as of the actual current date before editing or publishing. Every web search for volatile AI/company/product/pricing/model facts must include the current month and year in the query, for example `May 2026`, so results bias toward current sources. Update `last_verified`, source fields, pricing/source registries, and visible verification language where relevant. If a current fact cannot be verified, say so plainly in the content or defer the claim; do not rely on model memory, old repo content, or stale dates for modern AI products.

Hard page refresh ledger rule: `PAGE_REFRESH_LEDGER.md` is the canonical inventory of every tracked website page and the exact date each page was last edited, refreshed, or materially re-verified. Every change that edits or refreshes a page must update that page's row in `PAGE_REFRESH_LEDGER.md` in the same change. When a child page change affects a parent hub, archive, internal-link block, sitemap, RSS feed, or LLM surface, update those affected rows too. Prefer `npm run ledger:pages` to regenerate the ledger after page/content edits, then inspect the diff so dates reflect the real editorial refresh scope.

Hard top-layer maintenance rule: whenever sub-pages, content records, rankings, recommendations, affiliate surfaces, metadata, or templates inside a section are changed, inspect and update every affected top-layer page before finishing. Top-layer pages include the homepage, `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/news/`, `/trends/`, `/workflows/`, `/answers/`, `/explore/`, sitemap/llms surfaces, and any parent category, guide archive, comparison archive, or hub page that summarizes the changed content. Parent hubs must not become stale, misleading, or weaker than their child pages.

Hard logo rule: whenever a new tool record is added, add or verify a proper logo asset in `public/logos/tools/`, regenerate `src/data/logo-manifest.json`, and verify the logo renders on the tool page and affected parent/listing surfaces. Do not leave new tools on monogram fallback unless the final report explicitly documents that a proper logo could not be sourced.

Mobile-first means the mobile page must be complete, crawlable, fast, and decision-oriented. Do not remove important content from mobile. Use accordions, tabs, summaries, and progressive disclosure instead.

Affiliate conversion must never override trust. Every commercial CTA needs honest context, clear user benefit, and appropriate disclosure.

## Work process

Before editing:
1. Inspect the relevant files, data models, routes, templates, components, and tests.
2. Identify the page type or system being changed.
3. Identify all affected top-layer pages, parent hubs, archive pages, sitemap/llms surfaces, internal-link blocks, and navigation surfaces that summarize or route to the changed content.
4. Check whether the change affects SEO, schema, affiliate tracking, mobile UX, performance, or data integrity.
5. For complex work, create or update an ExecPlan using `.agent/PLANS.md`.

During implementation:
1. Prefer small, reversible changes.
2. Reuse components and data models where appropriate.
3. Keep content and presentation separated.
4. Add or update tests for changed behavior.
5. Add analytics events for conversion surfaces.
6. Use semantic HTML, accessible controls, and responsive layouts.

Before finishing:
1. Run lint, typecheck, tests, build, and any relevant page/audit scripts.
2. Check mobile widths: 360, 390, 430, 768, and desktop 1024+.
3. Check for horizontal overflow, layout shift, broken CTAs, broken internal links, and missing metadata.
4. Verify schema, canonical, title, description, indexability, and affiliate disclosure where relevant.
5. Verify affected top-layer pages and parent hubs are current, internally linked, and aligned with the edited sub-pages.
6. Report exactly what changed, what passed, what failed, and what remains.

## Page quality law

Every monetizable page must answer these questions quickly:
- Is this tool/category/comparison worth my time?
- Who is it best for?
- Who should avoid it?
- Which plan should I buy?
- What is the best alternative?
- What changed recently?
- Why should I trust AiPedia?
- Where do I click next?

## Mobile-first layout law

For tool pages, the first mobile screen must include:
- Trust strip: verified date, editorial/no paid ranking signal, source-backed signal.
- Tool name, category, score, and price range.
- One-sentence verdict.
- Best plan recommendation.
- Primary CTA.
- Short affiliate disclosure near commercial CTA when applicable.
- Main warning or watch-out.

For comparison pages, the first mobile screen must include:
- Winner for most people.
- Winner by use case.
- Primary CTA for the recommended winner.
- Secondary CTA to see the full comparison.

For category pages, the first mobile screen must include:
- Best overall.
- Best free or budget option.
- Best pro/team option.
- Clear filters or quick paths.

No wide pricing or comparison table may be the primary mobile experience. Use stacked cards on mobile and richer tables on desktop.

## SEO law

Do not create pages solely to manipulate rankings. Pages must provide original, useful, people-first value: verdicts, tradeoffs, plan guidance, current data, sources, alternatives, and decision support.

Every indexable page must have:
- Unique title.
- Unique meta description.
- Canonical URL.
- Clean heading hierarchy.
- Useful internal links.
- Breadcrumbs where appropriate.
- Relevant structured data where appropriate.
- Crawlable primary content.
- No hidden critical content that requires user action to load.

## Conversion law

Every affiliate CTA must have:
- Clear label based on user benefit.
- Placement identifier for analytics.
- Tool slug and page type in tracking payload.
- Disclosure nearby where the user is making a commercial decision.
- A fallback official link if affiliate data is unavailable.

CTA labels should be specific: “Try ChatGPT free,” “Compare with Claude,” “See best plan,” “Start free trial.” Avoid vague labels like “Open” when a stronger user-benefit label exists.

## Editorial law

Facts require source fields and verification dates. Opinions must be framed as AiPedia editorial analysis. Scores require reasons. Do not publish unsupported pricing, model access, API access, context window, or feature claims.

Current-date verification is mandatory for every website update. Treat the current date as the verification target for volatile AI product data, including pricing, plan names, model versions, availability, API access, benchmarks, company status, affiliate terms, logos, and commercial claims. Do not carry forward stale facts just because they already exist in the repo.

Every tool page needs:
- Verdict.
- Best for.
- Not ideal for.
- Best plan.
- Watch-out.
- Alternatives.
- Pricing summary.
- Sources.
- Last verified date.
- Change history when meaningful.

## Performance law

Do not add heavy client JavaScript for static content. Prefer server-rendered or statically generated content. Lazy-load non-critical media. Prevent CLS from ads, logos, cards, filters, sticky CTAs, and accordions.

Target at minimum:
- LCP under 2.5s.
- INP under 200ms.
- CLS under 0.1.

Aim better than minimum whenever practical.

## Data law

Tool data must be centralized and structured. Do not scatter pricing, score, affiliate, or source facts across hardcoded templates unless the repo already uses that pattern and the change is transitional.

Every tool record should support:
- slug, name, company, category, subcategory, status, official URL, affiliate URL, affiliate program, pricing model, price range, free tier, best plan, score, sub-scores, verdict, best_for, not_ideal_for, watch_out, alternatives, sources, last_verified, change_history, schema fields, CTA config.

## When to use ExecPlans

Use an ExecPlan for:
- Major template rebuilds.
- Routing or data model changes.
- SEO/schema migrations.
- Analytics/tracking systems.
- Tool Set Builder work.
- Homepage/category/comparison redesigns.
- Any work that changes multiple child pages under one top-layer section or changes facts/rankings that parent hubs summarize.
- Any task touching many files.
- Any task expected to take more than one focused implementation pass.

## Done means done

A task is not done until:
- The code builds.
- Tests/lint/typecheck pass or failures are clearly unrelated and documented.
- Mobile QA is checked.
- SEO basics are checked.
- Conversion tracking is checked for commercial surfaces.
- Affected top-layer pages, parent hubs, archive pages, navigation links, sitemap/llms surfaces, and internal-link blocks are checked and updated when needed.
- The final response names changed files, verification commands, and unresolved risks.
