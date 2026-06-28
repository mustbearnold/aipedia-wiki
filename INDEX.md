# AiPedia Project Index

Purpose: give coding agents and maintainers a fast, stable map of this repo before they edit anything.

AiPedia is an Astro-based AI tools wiki and buying decision engine. The public site helps readers choose tools, plans, alternatives, and workflows with current sources, mobile-first layouts, affiliate disclosure, and strict non-regression checks.

## Read First

1. `.agent/CURRENT_STATUS.md` for the latest branch state, active work, caveats, and next action.
2. `.agent/PLANS.md` for active or immediately resumable ExecPlans.
3. `.agent/PROJECT_MAP.md` for detailed surface ownership and verification routing.
4. `.agent/OPERATING_RULES.md` for source, page freshness, layout, SEO, affiliate, and done criteria.
5. `workflows/README.md` when running a repeatable workflow.
6. `.agent/specialists/README.md` when using a saved project-local specialist agent.

Root `AGENTS.md` can exist in local sessions, but the committed `.agent/` stack is the reliable project memory for clean clones.

## Main Source Tree

```text
src/content/tools/        Tool pages and monetizable buying decisions.
src/content/categories/   Category hubs.
src/content/comparisons/  Comparison pages.
src/content/use-cases/    Guide pages.
src/content/news/         News articles.
src/content/workflows/    Workflow pages.
src/pages/                Astro routes, indexes, API endpoints, crawl surfaces.
src/layouts/              Shared page templates.
src/components/           Reusable UI, SEO, and decision components.
src/data/                 Source registry, manifests, policies, generated data.
src/lib/                  Content models, search catalog, shared runtime logic.
src/styles/               Design tokens and route styles.
public/logos/tools/       Canonical tool logos.
public/og/                Generated Open Graph images.
scripts/                  Audits, guards, generators, and operator tooling.
tests/                    Node and Playwright regression tests.
workflows/                Durable repeatable operating workflows.
tools/aipedia-runner/     Rust workflow runner.
.agent/                   Tracked agent memory, plans, receipts, specialists.
.agents/                  Ignored local agent/plugin/skill runtime state.
local/                    Ignored temp plans, logs, reports, and machine helpers.
```

## Agent Folder Contract

- `.agent/` is the only tracked agent-memory namespace.
- `.agent/specialists/` stores durable project-local specialist agents.
- `.agents/` is gitignored local runtime state for Codex skills, plugins, shortcuts, and machine-specific helpers.
- `.Agents/` is retired. Do not recreate it.

## Most Important Public Surfaces

- Homepage: `src/pages/index.astro`
- Tool hub: `src/pages/tools/index.astro`
- Category hub: `src/pages/categories/index.astro`
- Guide hub: `src/pages/guides/index.astro`
- Compare hub: `src/pages/compare/index.astro`
- Workflow hub: `src/pages/workflows/index.astro`
- Search: `src/pages/search.astro`, `src/components/SearchModal.astro`, `src/lib/search-catalog.ts`
- LLM surfaces: `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`
- Page freshness ledger: `PAGE_REFRESH_LEDGER.md`
- Source registry: `src/data/source-registry.json`

## Standard Verification Router

Start scoped:

```bash
npm run check:smart
npm run check:smart:run
```

Use these gates by change type:

```bash
npm run check:quick
npm run typecheck
npm run build:fast
npm run qa:route -- --route /example/
npm run ledger:pages && npm run ledger:pages:check
node scripts/guard-em-dashes.mjs
npm run audit:provenance:changed -- --json
npm run audit:affiliate-conversion -- --strict --json
```

Do not run `npm run typecheck` and `npm run build:fast` in parallel. Astro can race on the local content data store.

## Repeatable Workflow Entrypoints

Tool refresh:

```bash
npm run runner:tool-refresh:plan
npm run runner:tool-refresh:closeout
```

Non-tool page refresh:

```bash
npm run runner:page-refresh:plan
npm run runner:page-refresh:reports
npm run runner:page-refresh:closeout
```

Affiliate conversion:

```bash
npm run affiliate:conversion:inventory -- --json
npm run audit:affiliate-conversion -- --strict --json
```

Loop review:

```bash
npm run loop:system
npm run loop:all -- --json
npm run loop:all:record -- --json
```

## Edit Rules That Prevent Regret

- For any page, content, source, pricing, affiliate, ranking, metadata, schema, or crawl-surface edit, update `PAGE_REFRESH_LEDGER.md` in the same change.
- For volatile AI product facts, use current primary sources and current-month search terms before editing claims.
- Keep top-layer pages current when changing child pages.
- Never weaken mobile layout, source provenance, affiliate disclosure, or commercial CTA tracking for speed.
- Use `apply_patch` for manual file edits.
- Ignore generated or local-only folders unless the task is explicitly about them.

## Generated And Local-Only Folders

Do not load these by default:

```text
node_modules/
dist/
dist-fast/
.astro/
.vercel/
.codegraph/
.qa-shots/
test-results/
.worktrees/
.agents/
local/
skills-lock.json
```

## Specialist Agents

Saved project-local specialists live in `.agent/specialists/`.

- `expert-project-manager/`: plans, coordinates, de-risks, and verifies multi-file repo hygiene and workflow changes.
- `agentic-workflow-software-engineer/`: designs, benchmarks, improves, and regression-proofs repeatable agentic workflows.

Back them up with:

```bash
npm run agents:backup
```
