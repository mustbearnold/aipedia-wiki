# AiPedia Codex Operating Contract

This is the central instruction file for Codex work in `aipedia.wiki`. It points to the committed operating docs, current-state memory, workflow procedures, skills, and validation commands that future agents should use before they edit.

## Project Overview

AiPedia is an Astro-based, mobile-first AI tools wiki and buying decision engine. The site helps readers decide what AI tool to use, which plan to buy, what to avoid, and which alternative is better. Every change must improve at least one of organic rankings, trust, mobile UX, affiliate conversion, revenue tracking, data quality, technical performance, maintainability, or editorial scalability.

The site is not a generic directory. It should answer buyer and builder questions quickly, with current sources, clear caveats, honest commercial context, and strong internal links.

## Read First

1. `INDEX.md` for the stable repo map.
2. `.agent/CURRENT_STATUS.md` for the latest state, caveats, and next action.
3. `.agent/PLANS.md` for active or immediately resumable ExecPlans.
4. `.agent/PROJECT_MAP.md` for surface ownership and verification routing.
5. `.agent/OPERATING_RULES.md` for source, ledger, layout, SEO, affiliate, and done criteria.
6. `workflows/README.md` when running a repeatable workflow.
7. `skills/<skill-name>/SKILL.md` when the task matches a reusable skill.
8. `docs/codex-operating-manual.md` for the full agent work loop.

## Repo Structure

- `src/content/tools/`: source-backed tool pages.
- `src/content/categories/`: category hubs and top picks.
- `src/content/comparisons/`: same-buyer-job comparison pages.
- `src/content/use-cases/`: guides, buyer-intent pages, and workflow pages.
- `src/content/news/`: dated AI and AI-tools news.
- `src/pages/`: Astro routes, hubs, APIs, search, feeds, and LLM surfaces.
- `src/layouts/`, `src/components/`, `src/lib/`, `src/styles/`: rendered site system.
- `src/data/`: source registry, tool registry, manifests, policies, and generated metadata.
- `public/logos/tools/` and `public/og/`: logo and Open Graph assets.
- `scripts/`: deterministic checks, planners, audits, guards, and generators.
- `tools/aipedia-runner/`: Rust workflow runner.
- `workflows/`: durable workflow procedures.
- `skills/`: Codex skill packs for repeatable task types.
- `.agent/`: tracked project memory, plans, receipts, and specialist agents.
- `local/`, `.agents/`, `dist/`, `dist-fast/`, `.astro/`, `node_modules/`: local or generated state.

## Package Manager And Commands

Use npm. The repo targets Node `24.x`.

Start scoped:

```bash
npm run check:smart
npm run check:smart:run
npm run agent:evidence -- --route /tools/cursor/ --json
npm run agent:impact -- --route /tools/cursor/ --json
npm run agent:score -- --route /tools/cursor/ --json
```

Common gates:

```bash
npm run check:quick
npm run lint
npm run typecheck
npm run build:fast
npm run qa:route -- --route /example/
npm run ledger:pages && npm run ledger:pages:check
npm run audit:provenance:changed -- --json
npm run audit:affiliate-conversion -- --strict --json
```

Do not run `npm run typecheck` and `npm run build:fast` in parallel because Astro can race on its local data store.

## Workflow Order

1. Inspect current files, schemas, route templates, data, tests, and workflow docs.
2. Identify the page type or system, affected parent hubs, top-layer routes, crawl surfaces, and generated assets.
3. Select the smallest matching workflow or skill.
4. Gather current evidence before editing volatile facts.
5. Patch only the files needed for the task.
6. Regenerate ledgers or manifests when the changed surface requires it.
7. Run focused validation first, then wider gates only when rendered output, runtime, schemas, or deployment confidence require them.
8. Update `.agent/` continuity docs for major work.
9. Report changed files, commands, failures, risks, and next actions.

## Content Rules

- Never publish placeholder content, fake sources, fake data, thin pages, or unsupported claims.
- Every monetizable page must quickly answer: who should use it, who should avoid it, which plan to buy, the best alternative, what changed recently, why to trust AiPedia, and where to click next.
- Tool pages need a verdict, best for, not ideal for, best plan, watch-out, alternatives, pricing summary, sources, last verified date, and change history when meaningful.
- Use plain editorial-analysis voice. Avoid vendor hype and generic AI filler.
- Never introduce an em dash character. Use commas, periods, colons, parentheses, hyphens, or words instead.

## Factuality Rules

- Verify volatile AI, company, product, pricing, model, API, affiliate, benchmark, and availability facts against current sources before editing or publishing.
- Every web search for volatile modern AI facts must include the current month and year.
- Prefer official sources: pricing pages, docs, release notes, changelogs, status pages, company blogs, SEC or regulator filings.
- If a claim cannot be verified, defer it or say the uncertainty plainly.
- Do not invent pricing, model names, plan limits, affiliate terms, source dates, benchmark results, or company status.
- Update `last_verified`, source fields, `src/data/source-registry.json`, and visible verification language where relevant.

## SEO Rules

- Do not create pages solely to manipulate rankings.
- Every indexable page must have a unique title, meta description, canonical URL, clean heading hierarchy, crawlable primary content, useful internal links, and relevant structured data.
- Preserve existing slugs and URLs unless the user explicitly approves a migration.
- Comparison pages must serve the same buyer job and workflow. Shared category is not enough.

## Affiliate Rules

- Affiliate conversion must never override trust.
- Commercial CTAs need a clear user-benefit label, placement identifier, tool slug, page type, tracking payload, nearby disclosure, and official-link fallback.
- Never silently remove affiliate links or change approval state.
- If affiliate terms are not current-source verified, document the uncertainty and avoid unsupported payout claims.

## Generated File Rules

- Page or content edits must update `PAGE_REFRESH_LEDGER.md`.
- New tool records need a proper logo under `public/logos/tools/`, regenerated `src/data/logo-manifest.json`, and rendered logo verification.
- Tool additions or refreshed public surfaces may require OG assets, source registry rows, search or LLM surface checks, and affected parent hub updates.
- Do not edit generated output under `dist/`, `dist-fast/`, `.astro/`, or `public/pagefind/` as source.

## Do-Not-Touch Zones

- Do not rewrite unrelated content, remove URLs, weaken guards, or reset user work.
- Do not edit local-only generated folders unless the task explicitly targets them.
- Do not use destructive git commands without explicit instruction.
- Do not weaken a guard or audit without the guard challenge workflow in `.agent/OPERATING_RULES.md`.

## Handling Uncertainty

When evidence is incomplete, say so in the page, workflow report, or final response. Use confidence labels such as `primary-confirmed`, `primary-conflict`, `account-gated`, `checkout-gated`, `region-rendered`, `blocked-live-check`, and `secondary-only`. Do not let the LLM fill gaps with memory.

## Report Format

Use `docs/codex-report-format.md` for final reports. At minimum include:

- Task.
- Files changed.
- Commands run.
- Build or test result.
- Facts updated.
- Affiliate changes.
- SEO changes.
- Risks.
- Follow-up tasks.

## More Detail

- Full operating manual: `docs/codex-operating-manual.md`.
- Task prompts: `docs/codex-task-templates.md`.
- Canonical workflows: `docs/aipedia-agent-workflows.md`.
- Parallel architecture: `docs/parallel-tooling-architecture.md`.
- Memory design: `docs/agent-memory-system.md`.
- Scoring design: `docs/page-quality-scoring.md`.
