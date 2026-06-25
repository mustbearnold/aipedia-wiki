# AiPedia Scripts

Scripts are operator tools for keeping AiPedia current, source-backed, buildable, and commercially safe.

## Verification Entry Points

- `npm run check:smart`: recommends the smallest safe verification set for the current diff. Default dirty-path discovery ignores untracked local-only `.agents/` and `skills-lock.json` artifacts, while preserving `.agent/` continuity docs and explicitly passed paths.
- `npm run check:smart:run`: runs that recommendation.
- `npm run check:quick`: established no-build loop for script/tooling changes.
- `npm run lint`: source/content guard bundle used as the repo lint gate.
- `npm run typecheck`: Astro typecheck gate for active Astro/server surfaces; `tsconfig.typecheck.json` keeps the legacy global search client scripts and archived `.legacy.astro` files as documented baseline debt until the search rewrite is typed.
- `npm run ops:dashboard`: read-only branch, worktree, PR/issue, and optional audit summary for daily operations.
- `npm run loop:system`: lists every registered AiPedia operating loop and its read-only commands.
- `npm run loop:all`: runs every registered loop read-only and reports `ok`, `attention`, `skipped`, ranked recommendations, and built-output freshness for rendered-output loops. Stale or unknown build freshness is reported as attention.
- `npm run loop:all:record`: runs every registered loop and writes a JSON receipt plus `latest.json` under `.agent/loop-runs/system/`.
- `npm run loop:next`: read-only decision-content flywheel brief for the next buyer-intent cluster.
- `npm run loop:verify`: date-stable verifier for a decision-content cycle; sets `AIPEDIA_LEDGER_DATE`, runs focused checks, records per-command timing, builds when a route or `--force-build` needs it, and can call route QA.
- `npm run loop:record`: writes a durable `.agent/loop-runs/` receipt after a cycle.
- `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`: plans the next 60-tool freshness batch, including registered source metadata, scoped `audit:sources` commands, routes, parent hubs, closeout commands, and `agent_briefs` for six shard workers.
- `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --agents`: prints one guarded shard-worker brief per 10-tool shard plus the single integrator brief.
- `npm run check:frontmatter`: parses changed content frontmatter with `js-yaml` so malformed markdown metadata is caught before Astro typecheck/build.
- `npm run tool:refresh:batch:check -- --plan <planner-json>`: runs the fast grouped tool gate from a saved planner JSON file, including changed-frontmatter parsing. Workers should not run this; the integrator runs it after collecting tool edits.
- `npm run runner:tool-refresh:plan`: uses the Rust workflow runner to create planner JSON, worker prompt files, and route QA args under `local/tmp/aipedia-runner/`.
- `npm run runner:tool-refresh:closeout`: uses the Rust workflow runner to execute the ledger precheck, grouped batch check, typecheck, build, route QA, and a local receipt in order.
- `npm run qa:route`: route-specific Playwright QA for mobile, tablet, and desktop widths. Use `--base-url http://127.0.0.1:<port>` for no-build checks against a running local server, and `--concurrency 4` for faster route matrices when the server is stable.
- `npm run check`: broad source, content, link, news, asset, and security checks.
- `npm run audit:provenance:changed`: scoped provenance and pricing gate for changed tool pages; `npm run audit:provenance` still reports all catalog debt.
- `npm run audit:coverage-quality:changed`: scoped comparison quality gate for changed files; `npm run audit:coverage-quality` still reports all comparison debt.
- `npm run build:fast`: fast production-output validation for rendered/runtime changes.
- `npm run build`: full production build and post-build audits.

## Script Families

- `guard-*.mjs`: fail-fast editorial and policy guards.
- `audit-*.mjs`: source, SEO, conversion, data, command, freshness, and quality checks.
- `aipedia-loops.mjs`: shared loop registry runner for Decision Content, Freshness, Trust, Conversion, Quality Pruning, Performance/UX, and News/Market loops. Loop definitions live in `src/data/aipedia-loops.json`. Use `--write-ledger` only for deliberate broad-review receipts.
- `decision-loop.mjs`: chooses the next same-buyer-job cluster and prints the source, working-set, related-surface discovery, mobile and desktop route QA, verification, and recording brief. It skips blocked or review-only false-vs candidates from `src/data/comparison-policy.json`.
- `loop-verify.mjs`: executes the loop verification plan with one explicit ledger date so timezone differences do not break ledger, guard, or build checks. It delegates overlapping checks to `check-smart:run`, records per-command durations, and only adds fallback `build:fast` for route QA or `--force-build`.
- `loop-record.mjs`: creates `.agent/loop-runs/YYYY-MM-DD-slug.md` receipts for completed or attempted cycles.
- `tool-refresh-batch.mjs`: plans grouped tool freshness work. Use `--limit 60 --max-workers 6 --tools-per-worker 10 --json` for machine-readable batch plans and `--agents` for six shard-worker prompts. Planner output includes scoped `audit:sources` commands so integrators can check registered source reachability, content-hash changes, and snapshot updates before manual review.
- `check-frontmatter.mjs`: parses changed or explicit markdown frontmatter with `js-yaml` and reports file, line, and column for YAML syntax failures.
- `tool-refresh-batch-check.mjs`: runs the cheap grouped tool gate. It accepts explicit `--file` values or a saved planner JSON through `--plan` or `--files-from`.
- `tools/aipedia-runner/`: Rust orchestration wrapper around the planner, closeout gates, route-arg generation, worker prompt files, and local receipts.
- `qa-route.mjs`: serves the built output and verifies a local route across 360, 390, 430, 768, 1024, and 1366 px unless custom widths are supplied.
- `npm run guard:challenge`: creates a proposed guard challenge artifact when a guard, audit, check, or fixture may need to change.
- `npm run guard:challenge:check`: validates accepted guard challenge artifacts have implementer, defender, arbitrator, fixture or test, and verification evidence.
- `generate-*.mjs`: generated ledgers, manifests, favicons, logos, and OG assets.
- `build-*.mjs`: build orchestration helpers.
- `prep-*.mjs`, `optimize-*.mjs`, `fetch-*.mjs`: asset and data maintenance helpers.

Keep package scripts as the public command surface. Add direct script usage here only when a script is meant to be invoked outside `npm run`.
