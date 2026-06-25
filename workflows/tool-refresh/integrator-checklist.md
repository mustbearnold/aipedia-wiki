# Tool Refresh Integrator Checklist

Use this after all shard workers have reported back.

## Merge Worker Output

1. Review every worker diff.
2. Confirm workers edited only assigned `src/content/tools/*.md` files.
3. Remove unsupported, stale, or buyer-useless claims.
4. Preserve explicit caveats for constrained facts.
5. Deduplicate proposed source-registry rows by ID and URL.
6. Update `src/data/source-registry.json` once.
7. Update affected category hubs and top-layer surfaces only where summaries, picks, metadata, or internal links would otherwise become stale.
8. If any worker changed a tool primary category, regenerate or patch the saved planner and route-QA args from current frontmatter before route QA.
9. Regenerate `PAGE_REFRESH_LEDGER.md`.

## Source Confidence Labels

Use worker labels to decide content language:

- `primary-confirmed`: fact can be stated plainly with source and date.
- `primary-conflict`: state the conflict and avoid false certainty.
- `account-gated`: say the account screen or authenticated flow should be checked before purchase.
- `checkout-gated`: avoid durable price claims unless the checkout value is confirmed and dated.
- `region-rendered`: state region-sensitive pricing or availability caveat.
- `blocked-live-check`: keep the claim conservative or defer it.
- `secondary-only`: cite as reporting, not primary product truth.

## Shared Files Owned By Integrator

- `src/data/source-registry.json`
- `src/content/categories/*.md`
- `PAGE_REFRESH_LEDGER.md`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/WORK_LOG.md`
- `.agent/loop-runs/`
- `workflows/**` when the process itself changes

## Route QA Args

Generate route args from the saved planner:

```bash
node - <<'NODE' > local/tmp/route-qa-args.txt
const fs = require('fs');
const planPath = 'local/tmp/tool-refresh-batch.json';
const b = JSON.parse(fs.readFileSync(planPath, 'utf8'));
const routes = [...new Set([...b.batch.map(x => x.route), ...b.batch.map(x => x.category_route), '/tools/', '/categories/'])];
process.stdout.write(routes.filter(Boolean).map(r => `--route ${r}`).join(' '));
NODE
```

If using `.tmp-tool-refresh-batch.json`, change `planPath` and output file accordingly.

If a tool primary category changed during integration, do not reuse stale planner routes. Either regenerate `.tmp-tool-refresh-batch.json` or patch that tool's `category` and `category_route` in the saved planner before generating route args.
