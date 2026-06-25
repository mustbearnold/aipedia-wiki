# 2026-06-24 Tool Refresh Workflow Timing

## Result

The tool-refresh bottleneck was `build:fast`, not the content audits. After production-only content collection caching, it is much smaller and should still be paid once per integrated batch.

Measured from the current June 24 refresh workflow:

- Full six-shard 60-tool run: 36m 55s through the main route QA, and 41m 31s including documentation, supplemental route QA, and final sanity checks.
- Worker collection phase: 25m 07s.
- Integration and verification phase: 11m 48s.
- `npm run ledger:pages`: 2 seconds.
- `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`: 37 seconds for the 60-tool plan.
- `npm run typecheck`: 32 seconds.
- `npm run check:quick`: 22 seconds.
- `npm run build:fast`: 64 seconds wall-clock, with build-fast internal total 57.9 seconds.
- `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4`: 107 seconds for 80 routes across five widths, 400 rendered checks.
- Supplemental `qa-route` for `/categories/ai-infrastructure/` and `/news/2026-05-14-anthropic-claude-agent-sdk-credit-split/`: 4 seconds.
- `npm run tool:refresh:batch:check`: about 11.8 seconds.
- `npm run typecheck`: about 31.2 seconds when run alone.
- `npm run build:fast`: previously about 166.9 seconds end to end, now about 65 seconds end to end.
- `node scripts\qa-route.mjs`: about 65 seconds for 12 routes across 5 widths in serial mode, and about 18.9 seconds with `--concurrency 4`.

## Finding

`build:fast` is expensive because it is whole-site validation: guard checks, Astro prerender, indexability audit, commercial CTA audit, sitemap output, and dist budget checks. It should be paid once per grouped tool batch, not once per tool. The rerun with stage timings showed Astro build at about 2m 38s, including about 2m 13s prerendering static routes. Indexability, commercial CTA, and budget checks together were under 3 seconds.

The failed parallel typecheck was not a type failure. It was an Astro content-store race on `node_modules/.astro/data-store.json` caused by running `typecheck` and `build:fast` at the same time.

Route QA was the next practical win. `qa-route` now supports `--base-url` for no-build checks against a running local server and `--concurrency` for bounded parallel browser checks. The 12-route by 5-width matrix passed in about 18.9 seconds with `--concurrency 4` against both `http://127.0.0.1:4325` and `dist-fast/client`.

Further optimization removed repeated `getCollection` work from hot prerender paths. The global shell and tool/news/category/comparison/dead paths now use production-only cached content helpers. Astro static prerender dropped from about 2m 13s to about 37 seconds, and `build:fast` dropped from about 166.9 seconds to about 65 seconds end to end.

The refresh workflow initially supported 10-tool parallel fanout. It now supports six shard workers with up to 10 tools each. `tool-refresh-batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json` emits `agent_briefs` with shard worker prompts and a single integrator prompt. `tool-refresh-batch-check -- --plan <planner-json>` consumes the saved plan so the final batch gate does not require hand-maintained file lists.

## Changes

- Added per-stage timing output to `scripts/build-fast.mjs`.
- Added `--base-url` and `--concurrency` to `scripts/qa-route.mjs`.
- Added production-only content caching in `src/lib/content-cache.ts` and moved hot global/tool/news/category/comparison/dead routes to use it.
- Added worker and integrator briefs to `scripts/tool-refresh-batch.mjs`, later expanded to six 10-tool shards.
- Added `--plan` and `--files-from` planner JSON support to `scripts/tool-refresh-batch-check.mjs`.
- Added focused tests in `tests/scripts/build-fast.test.mjs` and `tests/scripts/qa-route.test.mjs`.
- Updated `.agent/LOOPS.md`, `.agent/OPERATING_RULES.md`, `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `scripts/README.md` with the timing guidance.

## Verification

- `npm run build:fast`
- `node --test tests\scripts\build-fast.test.mjs`
- `node --test tests\scripts\build-fast.test.mjs tests\scripts\qa-route.test.mjs`
- `node --test tests\scripts\build-performance.test.mjs tests\scripts\loop-hardening.test.mjs tests\scripts\qa-route.test.mjs tests\scripts\tool-refresh-batch.test.mjs`
- `npm run typecheck`
- `npm run build:fast`
- `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --route / --route /tools/chatgpt/ --route /news/2026-06-23-openai-daybreak-codex-security/ --route /categories/ai-research/ --route /compare/chatgpt-vs-claude/ --route /dead/bing-chat/ --route /tools/ --route /categories/ --widths 319,390,768,1024`
- `node scripts\guard-em-dashes.mjs`
- `node scripts\qa-route.mjs --base-url http://127.0.0.1:4325 --concurrency 4 --route /tools/consensus/ --route /categories/ai-research/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/blackbox-ai/ --route /categories/ai-coding/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/ --route /categories/ --widths 319,390,430,768,1024`
- `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --route /tools/consensus/ --route /categories/ai-research/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/blackbox-ai/ --route /categories/ai-coding/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/ --route /categories/ --widths 319,390,430,768,1024`
- `npm run audit:commands`
- `git diff --check`

## Next Rule

While refreshing tools, plan 60 tools with `tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`. Use six shard workers with up to 10 tool files each, then let the integrator update shared registries, hubs, ledgers, and top-layer surfaces once. Use `tool:refresh:batch:check -- --plan <planner-json>` as the editing loop. Use `qa-route --base-url http://127.0.0.1:4325 --concurrency 4` for layout checks before rebuilding. At closeout, run `typecheck`, then `build:fast`, then one combined `qa-route --site-dir dist-fast/client --concurrency 4`. Do not parallelize Astro build/check commands.
