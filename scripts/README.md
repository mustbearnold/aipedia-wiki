# AiPedia Scripts

Scripts are operator tools for keeping AiPedia current, source-backed, buildable, and commercially safe.

## Verification Entry Points

- `npm run check:smart`: recommends the smallest safe verification set for the current diff.
- `npm run check:smart:run`: runs that recommendation.
- `npm run check:quick`: established no-build loop for script/tooling changes.
- `npm run check`: broad source, content, link, news, asset, and security checks.
- `npm run build:fast`: fast production-output validation for rendered/runtime changes.
- `npm run build`: full production build and post-build audits.

## Script Families

- `guard-*.mjs`: fail-fast editorial and policy guards.
- `audit-*.mjs`: source, SEO, conversion, data, command, freshness, and quality checks.
- `npm run guard:challenge`: creates a proposed guard challenge artifact when a guard, audit, check, or fixture may need to change.
- `npm run guard:challenge:check`: validates accepted guard challenge artifacts have implementer, defender, arbitrator, fixture or test, and verification evidence.
- `generate-*.mjs`: generated ledgers, manifests, favicons, logos, and OG assets.
- `build-*.mjs`: build orchestration helpers.
- `prep-*.mjs`, `optimize-*.mjs`, `fetch-*.mjs`: asset and data maintenance helpers.

Keep package scripts as the public command surface. Add direct script usage here only when a script is meant to be invoked outside `npm run`.
