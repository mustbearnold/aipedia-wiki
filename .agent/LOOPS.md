# AiPedia Loop Registry

Last updated: 2026-06-24

This file explains the repeatable AiPedia loops in plain English. The executable registry lives in `src/data/aipedia-loops.json`, and the runner is `npm run loop:system`.

## Rule Of Thumb

Use one loop at a time. Do not run every loop as a reflex unless you are doing a review pass of the loop system itself.

Loops produce queues and attention signals. They do not replace current-source verification, editorial judgment, page refresh ledger updates, mobile QA, layout precision review, or final reporting.

## Commands

- `npm run loop:system`: list every loop and its commands.
- `npm run loop:system -- --json`: structured registry output.
- `npm run loop:all -- --json`: run every loop read-only and return a status report.
- `npm run loop:all:record -- --json`: run every loop and write a JSON receipt under `.agent/loop-runs/system/`.
- `npm run loop:decision -- --json`: run the Decision Content loop checks.
- `npm run loop:freshness -- --json`: run the Freshness loop checks.
- `npm run loop:trust -- --json`: run the Trust and Provenance loop checks.
- `npm run loop:conversion -- --json`: run the Revenue and Conversion loop checks.
- `npm run loop:quality -- --json`: run the Quality Pruning loop checks.
- `npm run loop:performance -- --json`: run the Performance and UX loop checks.
- `npm run loop:news -- --json`: run the News and Market Change loop checks.
- `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10`: plan the next batched oldest-first tool refresh.
- `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`: emit the same batch plan in structured form, including `agent_briefs` for six shard workers, up to 10 tools per worker, and a single integrator.
- `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --agents`: print shard-worker prompts and the integrator prompt for manual subagent fanout.
- `npm run tool:refresh:batch:check -- --plan <planner-json>`: run the fast grouped gate from a saved planner output, including per-tool quality, changed provenance, freshness, ledger check, em-dash guard, and `git diff --check`, without build/typecheck/route QA.
- `npm run page:refresh:batch -- --limit 60 --max-workers 6 --pages-per-worker 10 --json`: plan the next oldest-first non-tool page refresh batch from `PAGE_REFRESH_LEDGER.md`, excluding tool pages by default.
- `npm run page:refresh:batch -- --limit 60 --max-workers 6 --pages-per-worker 10 --agents`: print non-tool page shard-worker prompts and the integrator prompt for manual subagent fanout.

Built-output loops depend on fresh `dist-fast/client` output. If the runner skips conversion or performance, run `npm run build:fast`, then rerun the specific loop. If the runner marks built output as stale or unknown, do the same before trusting rendered-output audits.

## What The Runner Reports

`npm run loop:all -- --json` now includes:

- `review.summary`: explicit ok, attention, and skipped counts.
- `review.recommendations`: ranked next actions with score, severity, confidence, effort, action, and reason.
- `build_freshness`: per-command freshness status for built-output loops.
- `review.next_actions`: the shortest human-readable action list derived from the ranked recommendations.

Stale or unknown built-output freshness is an `attention` signal. A rendered-output loop is only green when the command succeeds and the runner can prove the checked build is fresh.

Use `npm run loop:all:record -- --json` after meaningful broad reviews. It writes a timestamped JSON receipt and `.agent/loop-runs/system/latest.json`, including deltas from the previous recorded run. Do not use it for every casual check.

Loop verification should stay focused on AiPedia work. `.agents/` and `skills-lock.json` are gitignored local tooling artifacts. `check-smart` also ignores them during default dirty-path discovery, but it still counts `.agent/` continuity docs and any explicitly passed paths.

## Loops

### Decision Content Flywheel

Use when choosing the next monetizable buyer-decision cluster. This is the default growth loop.

Primary output: the next same-workflow comparison or buyer-decision cluster, with working set, source requirements, route QA, and verification commands.

### Freshness Loop

Use when the question is "what is stale next?" It turns due review dates, stale verification candidates, and baseline pages into a queue.

Primary output: tool/fact refresh candidates ordered by due date and comparison impact.

Default tool-refresh mode is a 60-tool planner batch with six shard workers, up to 10 tools per worker. Use `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json` to group the next tools, source IDs, parent category routes, closeout commands, and shard prompts. Each worker may edit only the tool markdown files listed in its shard, and the Codex Windows app should launch no more than six active workers at once. Workers must not edit `PAGE_REFRESH_LEDGER.md`, `src/data/source-registry.json`, parent category hubs, top-layer pages, or `.agent` continuity docs. Workers should classify constrained facts as `primary-confirmed`, `primary-conflict`, `account-gated`, `checkout-gated`, `region-rendered`, `blocked-live-check`, or `secondary-only` in their final reports. The integrator reviews all worker diffs, deduplicates source-registry rows, updates shared surfaces once, runs `npm run ledger:pages && npm run ledger:pages:check`, then uses `npm run tool:refresh:batch:check -- --plan <planner-json>` as the fast pre-build gate. Only after that should the batch pay for typecheck, one `npm run build:fast`, and one combined route-QA command. Do not run a full build after every individual tool unless the tool introduces template/layout/runtime changes, a high-risk commercial claim, or a blocker that must be isolated.

The committed procedure for this flow lives in `workflows/tool-refresh/`. The incubating local skill for this flow is `$aipedia-tool-refresh-workflow` at `.agents/skills/aipedia-tool-refresh-workflow/`; keep it aligned with `workflows/tool-refresh/` while the process is still being tuned. Promote stable behavior into `src/data/aipedia-loops.json` only after repeated successful runs.

Current timing guidance from the June 24, 2026 tool-refresh run: `tool:refresh:batch:check` is about 12 seconds for a dirty five-tool batch, `typecheck` is about 25-31 seconds, and `build:fast` is now about 65 seconds end to end after production-only content collection caching. Astro static prerender dropped from about 2m 13s to about 37 seconds. Built-output audits after Astro are small: indexability was under 1 second, commercial CTA audit was about 2 seconds, and budget check was under 1 second. Run `build:fast` once per batch, not once per tool. Run `typecheck` and `build:fast` sequentially because both commands sync Astro content and can race on `node_modules/.astro/data-store.json` when parallelized.

Route QA now supports faster local loops. Use `node scripts\qa-route.mjs --base-url http://127.0.0.1:4325 --concurrency 4 ...` while editing against the running dev server, then after the one final build use `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 ...`. On the June 24 12-route by 5-width matrix, serial QA took about 65 seconds and concurrency 4 took about 19 seconds against both dev-server and static built output.

Non-tool page refreshes now have their own first runnable workflow in `workflows/page-refresh/`. Use `npm run page:refresh:batch -- --limit 60 --max-workers 6 --pages-per-worker 10 --json > .tmp-page-refresh-batch.json` to plan the next ledger-oldest page batch across static pages, category hubs, comparisons, guides, answers, trends, workflows, and company pages while excluding tool pages by default. The planner emits worker prompts, one integrator prompt, route QA args, cheap gates, expensive gates, and a route QA `--timing-file` command at concurrency 6. Use `--type Guide --type Comparison`, `--type Category`, `--exclude-static`, or `--include-tools` only when intentionally narrowing or overriding the default queue.

### Trust And Provenance Loop

Use when facts, prices, source registry rows, or provenance metadata may be weak. This loop protects trust before and after source-heavy edits.

Primary output: missing verification dates, unknown source IDs, source-registry issues, stale facts, and high-volatility review gaps.

### Revenue And Conversion Loop

Use after rendered commercial surfaces change. This loop checks affiliate CTA tracking, disclosure, placement, labels, and analytics metadata.

Primary output: commercial CTA issues on built pages. Requires built output.

### Quality Pruning Loop

Use when the site may have thin, duplicate, low-value, or invalid pages. This is the loop for deleting, merging, refreshing, or keeping pages.

Primary output: thin comparison risk, workflow-lane policy violations, comparison-quality failures, and internal-link issues.

### Performance And UX Loop

Use after layout, component, style, runtime, search, asset, or route-output changes. This loop checks output budgets and indexability, and points to route QA plus layout precision review when needed.

Primary output: dist budget, indexability, overflow, and layout precision issues on built output. Requires built output.

### News And Market Change Loop

Use after AI market news, news page edits, missed-date catch-up work, or affected-tool changes. This loop decides whether a market change needs a daily desk story, AI tools or tool-control story, tool refresh, category update, comparison update, or no action.

Primary output: news rendering issues, active-month date coverage gaps, recent news cross-reference gaps, homepage and `/news/` alignment, and editorial queue signals.

Rules for June 2026 onward:

- Check each missed date in scope, not just the newest day.
- For each date, verify whether both broad AI news and AI tools or tool-control news deserve coverage. Publish both only when current sources support both.
- Keep `/news/`, the homepage latest-news surface, OG or thumbnail assets, affected-tool links, source lists, RSS or feed surfaces, sitemap or LLM surfaces, and the page ledger aligned with the news batch.
- Run mobile, tablet, and desktop route QA for `/news/` after catch-up work, including layout precision review for card rhythm, date labels, gutters, and overflow.
- If a date has no sourceable AI tools story, record the no-action reason in the loop receipt rather than forcing a low-value article.

## Loop Review Protocol

After running one or more loops:

1. Check which loops are `attention`, `ok`, or `skipped`.
2. Read `review.recommendations` before deciding what to do next. A green run can still have a best next action.
3. For every `attention` loop, decide whether the signal is real work, known debt, noisy configuration, stale built output, or a missing prerequisite.
4. Revise the loop only when the signal is noisy, unclear, or hard for future agents to act on.
5. Fix site content only when the loop points at a real user-facing issue and current-source verification has been done.
6. Record major outcomes in `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/WORK_LOG.md`, and `.agent/loop-runs/` when a content cycle or major maintenance batch completes.

## Closeout Standard

A loop-system change is done only when:

- `npm run loop:system -- --json` lists the expected loops.
- `npm run loop:all -- --json` runs without runner errors.
- Attention signals are understandable and actionable.
- Skipped loops explain the missing prerequisite.
- Built-output loops report whether `dist-fast/client` is fresh, stale, or unknown, and stale or unknown states become actionable attention.
- Broad review passes can be recorded with `npm run loop:all:record -- --json`.
- Focused tests for `scripts/aipedia-loops.mjs` pass.
- `.agent` status docs say which loop to run next.

Latest baseline: 2026-06-22 broad review is 7 ok / 0 attention / 0 skipped after a fresh `npm run build:fast` and the News loop rules update. The News loop checks 410 news files with 0 issues and a minimum of 2 stories per active day. Due-now freshness is 0. The latest batched freshness refresh completed Qwen, Hailuo, HeyGen, and Adobe Firefly with `npm run tool:refresh:batch:check`, one typecheck, one `npm run build:fast`, and one combined route QA. Current runner recommendations are `amazon-q-vs-github-copilot` and the next batched freshness queue, which currently starts with Augment Code, Base44, BLACKBOX AI, Captions.ai, and Cline.
