# AiPedia Scripts

Scripts are operator tools for keeping AiPedia current, source-backed, buildable, and commercially safe.

## Verification Entry Points

- `npm run check:smart`: recommends the smallest safe verification set for the current diff.
- `npm run check:smart:run`: runs that recommendation.
- `npm run check:quick`: established no-build loop for script/tooling changes.
- `npm run lint`: source/content guard bundle used as the repo lint gate.
- `npm run typecheck`: Astro typecheck gate for active Astro/server surfaces; `tsconfig.typecheck.json` keeps the legacy global search client scripts and archived `.legacy.astro` files as documented baseline debt until the search rewrite is typed.
- `npm run ops:dashboard`: read-only branch, worktree, PR/issue, and optional audit summary for daily operations.
- `npm run loop:next`: read-only decision-content flywheel brief for the next buyer-intent cluster.
- `npm run check`: broad source, content, link, news, asset, and security checks.
- `npm run audit:provenance:changed`: scoped provenance and pricing gate for changed tool pages; `npm run audit:provenance` still reports all catalog debt.
- `npm run audit:coverage-quality:changed`: scoped comparison quality gate for changed files; `npm run audit:coverage-quality` still reports all comparison debt.
- `npm run build:fast`: fast production-output validation for rendered/runtime changes.
- `npm run build`: full production build and post-build audits.

## Script Families

- `guard-*.mjs`: fail-fast editorial and policy guards.
- `audit-*.mjs`: source, SEO, conversion, data, command, freshness, and quality checks.
- `decision-loop.mjs`: chooses the next cluster and prints the source, working-set, related-surface discovery, mobile and desktop route QA, verification, and recording brief.
- `npm run guard:challenge`: creates a proposed guard challenge artifact when a guard, audit, check, or fixture may need to change.
- `npm run guard:challenge:check`: validates accepted guard challenge artifacts have implementer, defender, arbitrator, fixture or test, and verification evidence.
- `generate-*.mjs`: generated ledgers, manifests, favicons, logos, and OG assets.
- `build-*.mjs`: build orchestration helpers.
- `prep-*.mjs`, `optimize-*.mjs`, `fetch-*.mjs`: asset and data maintenance helpers.

Keep package scripts as the public command surface. Add direct script usage here only when a script is meant to be invoked outside `npm run`.
