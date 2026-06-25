# Page Refresh Workflow

Use this workflow for non-tool page refreshes and top-layer maintenance: homepage, category hubs, comparison pages, guides, answers, trends, workflows, companies, static hubs, archives, sitemap-facing surfaces, and LLM/RSS surfaces when affected.

Tool pages use `workflows/tool-refresh/`. News catch-up uses `workflows/news-refresh/` once expanded.

## Plan

Create a planner JSON from the page refresh ledger:

```bash
npm run --silent page:refresh:batch -- --limit 60 --max-workers 6 --pages-per-worker 10 --json > .tmp-page-refresh-batch.json
```

For subagent fanout, also write exact prompt files so paths are not hand-transcribed:

```bash
npm run --silent page:refresh:batch -- --limit 60 --max-workers 6 --pages-per-worker 10 --write-agent-prompts local/tmp/page-refresh-prompts --json > .tmp-page-refresh-batch.json
```

Inspect the plan:

```bash
node -e "const p=require('./.tmp-page-refresh-batch.json'); console.log(p.batch.map(x => [x.last_updated, x.type, x.route, x.path].join('  ')).join('\n'))"
```

Useful filters:

```bash
npm run page:refresh:batch -- --type Guide --type Comparison --json
npm run page:refresh:batch -- --type Category --json
npm run page:refresh:batch -- --include-tools --json
```

Default behavior excludes tool pages, because the tool-refresh workflow already owns those.

## Worker Model

Use up to six workers, with up to 10 page files each. Use the prompt files from `--write-agent-prompts` or copy `agent_briefs.worker_briefs[*].prompt` exactly from the planner JSON. Do not hand-transcribe route paths or owned file lists.

Each worker owns only the files listed in its shard. Workers should refresh:

- accuracy and current-source support
- metadata, title, description, and heading clarity
- buyer usefulness and decision flow
- internal links and parent/child alignment notes
- source caveats for constrained facts
- mobile and route QA risks

Workers must not edit shared files unless assigned:

- `PAGE_REFRESH_LEDGER.md`
- `src/data/source-registry.json`
- unrelated top-layer pages
- `.agent/**`
- `workflows/**`

## Integrator

The integrator owns shared state:

- source registry rows, if sources changed
- parent and top-layer pages affected by child edits
- sitemap/RSS/LLM surfaces when affected
- `PAGE_REFRESH_LEDGER.md`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/WORK_LOG.md`
- `.agent/loop-runs/`

Regenerate the ledger after edits:

```bash
npm run ledger:pages && npm run ledger:pages:check
```

## Verification

Cheap gates:

```bash
npm run ledger:pages && npm run ledger:pages:check
node scripts/check-frontmatter.mjs --changed
npm run audit:provenance:changed -- --json
npm run audit:coverage-quality:changed
node scripts/guard-em-dashes.mjs
git diff --check
```

Expensive gates:

```bash
npm run typecheck
npm run build:fast
node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 $(node -e "const p=require('./.tmp-page-refresh-batch.json'); console.log(p.commands.route_qa_args)") --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/page-refresh-route-qa.json
```

Add page-type-specific checks when relevant:

- News surfaces: `npm run check:news` and `node scripts/audit-news-rendering.mjs --json`
- Comparison or guide quality: `npm run audit:coverage-quality:changed`
- Commercial pages: `npm run build:fast` includes commercial CTA checks
- Static/index pages: include their parent hub and index routes in route QA
- Intentional noindex interactive pages such as `/compare/build/`: run `qa-route` with `--allow-noindex --skip-comparison-content-checks` so layout, metadata presence, and overflow are checked without applying indexable comparison-page source requirements.

## Closeout Report

Report:

- pages refreshed by route and type
- shared/top-layer surfaces updated
- current sources checked and unresolved caveats
- commands passed
- commands failed and fixed
- timing from route QA and major gates
- what remains in the queue

## Improve This Workflow

Treat this as version one. After each real page-refresh batch:

1. Record what wasted time or caused misses.
2. Patch this workflow and `scripts/page-refresh-batch.mjs` when the improvement is stable.
3. Add tests when the improvement is executable.
4. Update `.agent/WORK_LOG.md` and one loop-run receipt.
