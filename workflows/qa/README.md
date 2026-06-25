# QA Workflow

Placeholder for manual and automated QA routines.

Current defaults:

- Use `npm run check:smart` for a scoped recommendation.
- Use `npm run typecheck` before `npm run build:fast`.
- Use `node scripts/qa-route.mjs` against `dist-fast/client` for final built-route checks.
- Use `--base-url http://127.0.0.1:<port>` for local dev-server checks during editing.
- Include `319,360,390,430,768,1024,1366` widths for rendered page batches unless the surface is non-rendered tooling.
