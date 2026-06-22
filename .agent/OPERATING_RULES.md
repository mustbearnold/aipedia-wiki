# AiPedia Operating Rules

This is the committed operating guide for agents working in this repository. Use it as the primary instruction source. Read `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/WORK_LOG.md`, and `.agent/LOOPS.md` first when resuming a session so you know what is current, active, complete, and repeatable. Do not rely on a root `AGENTS.md`; that file is ignored and may be absent in clean clones or worktrees.

## Mission

AiPedia is a mobile-first, source-backed AI tools wiki and buying decision engine. Every change must improve at least one of organic rankings, trust, mobile UX, affiliate conversion, revenue tracking, data quality, technical performance, maintainability, or editorial scalability.

AiPedia is not a generic directory. It must help users quickly decide what AI tool to use, what plan to buy, what to avoid, and which alternative is better.

## Non-negotiable standards

Never ship placeholder work, fake sources, fake data, thin content, broken mobile layouts, untracked affiliate CTAs, duplicate low-value pages, or unverified claims.

Affiliate conversion must never override trust. Every commercial CTA needs honest context, clear user benefit, and appropriate disclosure.

Mobile-first means the mobile page must be complete, crawlable, fast, and decision-oriented. Do not remove important content from mobile. Use accordions, tabs, summaries, and progressive disclosure instead.

Every rendered page must obey layout precision. Cards, boxes, rails, lists, headings, CTAs, source chips, and text blocks must sit on a clear grid with consistent gutters, padding, border radii, and visual weight. Text density must match the container: compact cards get one-line or tightly clamped copy, detail pages get readable line length, and repeated cards preserve consistent ratios between heading, body, metadata, and CTA. No text may spill out of a card, collide with neighboring content, wrap into broken letter stacks, create horizontal overflow, or leave awkward orphan labels. If a layout looks asymmetric, cramped, stretched, or mathematically sloppy on any checked viewport, fix it before shipping.

## Current facts and source discipline

When any website page, template, content record, source registry entry, pricing fact, model fact, ranking, recommendation, affiliate surface, or commercial claim is updated, verify volatile facts against current sources as of the actual current date before editing or publishing.

For volatile AI, company, product, pricing, and model facts, include the live current month and year in web searches so results bias toward current sources. Update `last_verified`, source fields, pricing or source registries, and visible verification language where relevant.

If a current fact cannot be verified, say so plainly in the content or defer the claim. Do not rely on model memory, old repo content, or stale dates for modern AI products.

## Page refresh ledger

`PAGE_REFRESH_LEDGER.md` is the canonical inventory of every tracked website page and the exact date each page was last edited, refreshed, or materially re-verified.

Every change that edits or refreshes a page must update that page's row in `PAGE_REFRESH_LEDGER.md` in the same change. When a child page change affects a parent hub, archive, internal-link block, sitemap, RSS feed, or LLM surface, update those affected rows too.

Prefer `npm run ledger:pages` to regenerate the ledger after page or content edits, then inspect the diff so dates reflect the real editorial refresh scope.

## Top-layer maintenance

Whenever sub-pages, content records, rankings, recommendations, affiliate surfaces, metadata, or templates inside a section change, inspect and update every affected top-layer page before finishing.

Top-layer pages include the homepage, `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/news/`, `/trends/`, `/workflows/`, `/answers/`, `/explore/`, sitemap and LLM surfaces, and any parent category, guide archive, comparison archive, or hub page that summarizes the changed content.

Parent hubs must not become stale, misleading, or weaker than their child pages.

## News coverage discipline

News catch-up work must check every missed public date in scope. For each date, publish or verify both broad AI news coverage and AI tools or tool-control coverage when current sources support both. If one lane is quiet or not sourceable, record the no-action reason in the loop receipt instead of forcing a weak story.

Every news item must be source-backed, dated, current for the publication date, connected to affected tools or pages when relevant, and supported by required OG or thumbnail assets. News updates must also inspect `/news/`, the homepage latest-news surface, RSS or feed surfaces, sitemap or LLM surfaces, and any affected tool, category, company, or comparison pages.

Before closing news work, run the News and Market Change loop plus mobile, tablet, and desktop route QA for `/news/` and any changed top-layer route. The visible layout must satisfy the same layout precision standard as every other page.

## Logo rule

When a new tool record is added, add or verify a proper logo asset in `public/logos/tools/`, regenerate `src/data/logo-manifest.json`, and verify the logo renders on the tool page and affected parent or listing surfaces.

Do not leave new tools on monogram fallback unless the final report explicitly documents that a proper logo could not be sourced.

## Work process

### Decision content flywheel

Use this loop as the default for monetizable AiPedia content work:

1. Pick one buyer-intent cluster with `npm run loop:next`.
2. Verify current volatile facts from live sources before editing.
3. Create or refresh the decision page.
4. Update affected tool pages, parent hubs, top-layer pages, sitemap or LLM surfaces, internal links, and `PAGE_REFRESH_LEDGER.md`.
5. Run the smallest valid verification set for the changed surfaces. For rendered comparison cycles, prefer `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>` so ledger, guard, build, and route-QA checks share one explicit project date.
6. Record the result in `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/WORK_LOG.md`, and `.agent/loop-runs/` when the cycle is major or future sessions need continuity. Use `npm run loop:record` for the run receipt.

The loop exists to avoid random isolated refreshes. Prefer clusters that improve a real decision path, such as a comparison plus its tool pages and parent category, over single-page maintenance with no buyer outcome.

Comparison pages must compare tools for the same buyer job. Same primary category is necessary but not sufficient. Do not create or keep fake versus pages for tools that only share a secondary capability, broad AI label, or category label while serving different use cases and workflows. The default selector only auto-picks same-primary-category pairs that are not listed in `src/data/comparison-policy.json` blocked pairs; review-only pairs must not be written without human product judgment.

### Multi-loop registry

Use `npm run loop:system` and `.agent/LOOPS.md` when deciding which repeatable loop fits the work. Use `npm run loop:all -- --json` only for loop-system review or broad operational checkups. Use `npm run loop:all:record -- --json` when that broad review should become durable system history under `.agent/loop-runs/system/`. Normal page work should choose one loop, run it, act on the top signal, verify, and record.

The registered loops are Decision Content, Freshness, Trust and Provenance, Revenue and Conversion, Quality Pruning, Performance and UX, and News and Market Change. Loop output is a queue or attention signal, not permission to edit volatile facts without current-source verification.

### Batched tool freshness

Tool-page refreshes should run in batches by default. Use `npm run tool:refresh:batch -- --limit 4` to select the next oldest-first batch, then verify sources, edit tool pages, update affected parent hubs, update source registry rows, and regenerate `PAGE_REFRESH_LEDGER.md` across the batch.

During the batch, run cheap per-file checks such as `npm run audit:tool-quality -- --file <path>` as each tool is edited. Once the batch has tool edits, parent hubs, source registry rows, and the page ledger in place, use `npm run tool:refresh:batch:check` for the fast grouped gate. Save expensive gates for the batch closeout: typecheck, one `npm run build:fast`, and one combined `npm run qa:route` for the edited tool routes, parent category routes, `/tools/`, and `/categories/`.

Run a full build after each individual tool only when the tool change affects templates, layout, runtime behavior, generated assets, high-risk commercial claims, or when isolating a failing build. If one tool blocks on source access, remove it from the batch, document the reason in the receipt, and continue with the rest.

Before editing:

1. Inspect the relevant files, data models, routes, templates, components, and tests.
2. Identify the page type or system being changed.
3. Identify all affected top-layer pages, parent hubs, archive pages, sitemap or LLM surfaces, internal-link blocks, and navigation surfaces that summarize or route to the changed content.
4. Check whether the change affects SEO, schema, affiliate tracking, mobile UX, performance, or data integrity.
5. For complex work, create or update an ExecPlan in `.agent/PLANS.md` unless the task scope forbids touching that file.

During implementation:

1. Prefer small, reversible changes.
2. Reuse components and data models where appropriate.
3. Keep content and presentation separated.
4. Add or update tests for changed behavior.
5. Add analytics events for conversion surfaces.
6. Use semantic HTML, accessible controls, and responsive layouts.

Before finishing:

1. Match verification scope to the changed surface. For tooling, tests, command docs, or other non-rendered repo maintenance, prefer `npm run check:quick`, focused tests, and scoped diff checks. Do not run a full build unless rendered output, runtime behavior, deployment config, or pre-ship confidence is affected.
2. For page, content, template, runtime, SEO, schema, affiliate, or deployment changes, run lint, typecheck, tests, build, and any relevant page or audit scripts.
3. Check mobile and tablet widths of 360, 390, 430, and 768, plus desktop widths of 1024 and 1366, when rendered pages or UI components are affected. Add 319 px for homepage, navigation, card grids, or any narrow-mobile risk. Use `npm run qa:route -- --route <route>` for built route checks when possible.
4. Check for horizontal overflow, layout shift, broken CTAs, broken internal links, and missing metadata when rendered pages or UI components are affected.
5. Check visual layout precision: symmetric grid math, consistent gutters, card containment, balanced text-to-card ratios, no awkward orphan text, no broken wrapping, and no lopsided visual weight at mobile, tablet, or desktop widths.
6. Verify schema, canonical URL, title, description, indexability, and affiliate disclosure where relevant.
7. Verify affected top-layer pages and parent hubs are current, internally linked, and aligned with the edited sub-pages.
8. Report exactly what changed, what passed, what failed, and what remains.

## Continuity protocol

Use this protocol for major work: implementation waves, reviews that produce fixes, content batches, migrations, tooling changes, deployment changes, and any task that changes multiple files or future-agent context.

Before final report:

1. Update `.agent/CURRENT_STATUS.md` with the current state and next action.
2. Update `.agent/PLANS.md` so only active or immediately resumable work remains active.
3. Append `.agent/WORK_LOG.md` with the completed work, commit or branch, verification, risks, and next step.
4. Update the source spec or plan only when that document directly governed the work.
5. Leave `.agent/archive/` as historical detail, not a required startup read.

If the work is small and does not affect future context, it may skip the work log, but the final response must still name changed files, verification, and risks.

## Page quality law

Every monetizable page must answer these questions quickly:

- Is this tool, category, or comparison worth my time?
- Who is it best for?
- Who should avoid it?
- Which plan should I buy?
- What is the best alternative?
- What changed recently?
- Why should I trust AiPedia?
- Where do I click next?

## Page quality bar

Done is the floor. Excellence is the bar. Every page, not only tool pages, must clear all four dimensions:

1. Accurate and current. Every volatile fact is verified against a primary source within the freshness window and cited. No stale carry-forward.
2. Clear and easy to read. Use plain language, short sentences, and scannable structure. Avoid filler or vendor-speak such as "seamless", "game-changing", "cutting-edge", "world-class", or "in today's fast-paced".
3. Decision-useful for the reader's actual goal. Whether the visitor only wants information or is choosing between tools, the page gets them there with a verdict, who it is for, who should avoid it, which plan to buy, and the best alternative.
4. Excellence, not a passing floor. Clearing `npm run audit:tool-quality` is necessary, not sufficient. The page must read like the best page on its topic.

## First-screen mobile requirements

All page layouts must use disciplined alignment and repeatable geometry. Treat the design as a grid system, not approximate stacked boxes. Container widths, column counts, gutters, card padding, chip spacing, heading rhythm, and CTA placement must be intentional and consistent across the page. Repeated card sets should use the same internal proportions unless the content model requires a documented exception.

For tool pages, the first mobile screen must include:

- Trust strip with verified date, editorial or no paid ranking signal, and source-backed signal.
- Tool name, category, score, and price range.
- One-sentence verdict.
- Best plan recommendation.
- Primary CTA.
- Short affiliate disclosure near commercial CTAs when applicable.
- Main warning or watch-out.

For comparison pages, the first mobile screen must include:

- Winner for most people.
- Winner by use case.
- Primary CTA for the recommended winner.
- Secondary CTA to see the full comparison.

For category pages, the first mobile screen must include:

- Best overall.
- Best free or budget option when applicable.
- Best option for the main buyer segment.
- A clear path into the ranked list.

Layout precision failures include horizontal overflow, text clipping, one-letter-per-line wrapping, card labels escaping their box, uneven repeated-card padding, inconsistent radius systems, unbalanced card text density, CTA labels wrapping awkwardly, and any section whose visual weight is clearly lopsided on a checked viewport.

## Verification router

Use `.agent/PROJECT_MAP.md` for the current verification map. Start with `npm run check:smart` when the changed surface is unclear. Use focused tests for changed scripts. Use `npm run build:fast` only when layouts, runtime routes, metadata, schemas, or rendered output changed, or when pre-ship confidence requires it.

## Worktree and dependency ergonomics

Git worktrees may not share `node_modules`. If a command fails because a dependency binary is missing under the current worktree, report the missing path and tell the operator to run `npm install` from that worktree root. Do not add package scripts or bootstrap helpers unless explicitly requested.
