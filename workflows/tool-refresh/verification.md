# Tool Refresh Verification

Use this verification sequence for a full rendered tool-refresh batch.

## Cheap Gates

Preferred runner:

```bash
npm run runner:tool-refresh:closeout -- --skip-build --skip-route-qa
```

Manual fallback:

```bash
npm run ledger:pages && npm run ledger:pages:check
npm run tool:refresh:batch:check -- --plan local/tmp/tool-refresh-batch.json
```

If the planner is saved as `.tmp-tool-refresh-batch.json`, use that path.

`tool:refresh:batch:check` includes:

- per-tool `audit:tool-quality`
- changed frontmatter parsing
- changed provenance/pricing audit
- changed tool parent-hub freshness audit
- freshness loop check
- ledger check
- em dash guard
- `git diff --check`

## Expensive Gates

Run these once after the cheap gates pass:

Preferred runner:

```bash
npm run runner:tool-refresh:closeout
```

Manual fallback:

```bash
npm run typecheck
npm run build:fast
node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 $(cat local/tmp/route-qa-args.txt) --widths 319,360,390,430,768,1024,1366
```

Do not run `typecheck` and `build:fast` in parallel. Astro content sync can race on local generated state.
Use `--timing-file <path>` on `qa-route` when running manually. Runner closeout writes route timing details automatically.

## Final Sanity

Before commit or final report:

```bash
node scripts/guard-em-dashes.mjs
git diff --check
git status --short
```

## Report

Final report must name:

- tools refreshed
- shared files updated
- timing from the runner receipt or manual closeout notes
- verification commands passed
- commands that failed and were fixed
- unresolved risks
- commit and push status when applicable
