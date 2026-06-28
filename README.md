# aipedia.wiki

Astro source for aipedia.wiki, an AI tools encyclopedia and comparison system.

## Current project state

Start with `INDEX.md` for the LLM-readable project map, then `.agent/CURRENT_STATUS.md` for the plain-English current state. Use `.agent/PLANS.md` for active work, `.agent/WORK_LOG.md` for completed major work, `.agent/PROJECT_MAP.md` for deeper orientation, and `.agent/OPERATING_RULES.md` for the repo rules.

Read `DESIGN.md` before editing rendered pages, shared components, route CSS, visual hierarchy, or design tokens.

## Commands

Use the smallest verification command that matches the change.

```bash
npm ci
npm run check:smart
npm run design:lint
npm run check:quick
npm run ops:dashboard
npm run loop:system
npm run loop:all -- --json
npm run loop:all:record -- --json
npm run loop:next
npm run loop:verify -- --date 2026-06-20 --route /compare/example/ --path src/content/comparisons/example.md
npm run loop:record -- --date 2026-06-20 --slug example --status complete
npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json
npm run tool:refresh:batch:check -- --plan .agent/tool-refresh-batch.json
npm run qa:route -- --route /compare/example/
npm run check:ci
npm run check
npm run editorial:weekly
npm run ledger:pages
npm run build
npm run deploy
npm run agents:backup
```

- `npm run check:smart`: recommends the smallest safe verification set for the current diff; use `npm run check:smart:run` to execute it.
- `npm run design:lint`: validates the root `DESIGN.md` visual contract with the pinned Google Labs design.md CLI.
- `npm run check:quick`: no-build loop for script/tooling changes; runs script tests, command-surface audit, and bounded asset checks.
- `npm run ops:dashboard`: read-only operational dashboard for branch state, dirty worktrees, open PRs/issues, and optional saved audit output.
- `npm run loop:system`: lists the registered AiPedia operating loops; use `npm run loop:all -- --json` for a read-only loop review.
- `npm run loop:all:record`: runs the broad loop review and writes a machine-readable receipt under `.agent/loop-runs/system/`.
- `npm run loop:next`: decision-content flywheel brief for the next buyer-intent cluster, including files, parent surfaces, source requirements, and checks.
- `npm run loop:verify`: date-stable verification wrapper for a decision-content cycle.
- `npm run loop:record`: writes a durable `.agent/loop-runs/` receipt for a completed or attempted cycle.
- `npm run tool:refresh:batch`: plans batched tool freshness work. Use `--limit 60 --max-workers 6 --tools-per-worker 10 --json` for shard-worker and integrator briefs, and `--agents` for printable subagent prompts.
- `npm run tool:refresh:batch:check`: fast grouped tool refresh gate. Use `--plan <planner-json>` after saving the batch planner output.
- `npm run qa:route`: reusable Playwright route QA for mobile, tablet, and desktop widths.
- `npm run check:ci`: full CI confidence gate for pre-ship and remediation work.
- `npm run check`: broader source, content, link, news, asset, and security checks.
- `npm run editorial:weekly`: editorial freshness queue for deciding what to refresh next.
- `npm run ledger:pages`: regenerates `PAGE_REFRESH_LEDGER.md` after page or content edits.
- `npm run build`: full production build for output, runtime, UI, route, or pre-ship validation. Do not use it as routine verification for content/script-only changes.
- `npm run deploy`: Vercel production deploy after validation.
- `npm run agents:backup`: backs up tracked specialist agents from `.agent/specialists/` and, by default, local `.agents/` runtime state.

## Source of truth

Editorial content lives in `src/content/`. Runtime pages, components, layouts, styles, data, and public assets live under `src/` and `public/`.
