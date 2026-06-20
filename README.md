# aipedia.wiki

Astro source for aipedia.wiki, an AI tools encyclopedia and comparison system.

## Current project state

Start with `.agent/CURRENT_STATUS.md` for the plain-English status of recent completed work, active lanes, verification baselines, and known caveats. Then use `.agent/PROJECT_MAP.md` for orientation and `.agent/PLANS.md` for active ExecPlans.

## Commands

Use the smallest verification command that matches the change.

```bash
npm ci
npm run check:smart
npm run check:quick
npm run ops:dashboard
npm run check:ci
npm run check
npm run editorial:weekly
npm run ledger:pages
npm run build
npm run deploy
```

- `npm run check:smart`: recommends the smallest safe verification set for the current diff; use `npm run check:smart:run` to execute it.
- `npm run check:quick`: no-build loop for script/tooling changes; runs script tests, command-surface audit, and bounded asset checks.
- `npm run ops:dashboard`: read-only operational dashboard for branch state, dirty worktrees, open PRs/issues, and optional saved audit output.
- `npm run check:ci`: full CI confidence gate for pre-ship and remediation work.
- `npm run check`: broader source, content, link, news, asset, and security checks.
- `npm run editorial:weekly`: editorial freshness queue for deciding what to refresh next.
- `npm run ledger:pages`: regenerates `PAGE_REFRESH_LEDGER.md` after page or content edits.
- `npm run build`: full production build for output, runtime, UI, route, or pre-ship validation. Do not use it as routine verification for content/script-only changes.
- `npm run deploy`: Vercel production deploy after validation.

## Source of truth

Editorial content lives in `src/content/`. Runtime pages, components, layouts, styles, data, and public assets live under `src/` and `public/`.
