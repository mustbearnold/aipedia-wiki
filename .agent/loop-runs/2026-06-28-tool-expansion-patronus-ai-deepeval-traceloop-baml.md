# 2026-06-28 Tool Expansion: Patronus AI, DeepEval, Traceloop, BAML

## Status

- Complete locally, verified, pending commit and push.
- Active user goal continues: keep adding net-new AI tool pages for the full day unless Matt pauses or redirects.

## Added Pages

- `/tools/patronus-ai/`
- `/tools/deepeval/`
- `/tools/traceloop/`
- `/tools/baml/`

## Updated Surfaces

- Tool content: `src/content/tools/patronus-ai.md`, `src/content/tools/deepeval.md`, `src/content/tools/traceloop.md`, `src/content/tools/baml.md`
- Parent hubs: AI Infrastructure, AI Automation, AI Coding
- Top-layer surfaces: `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`
- Data surfaces: `src/data/source-registry.json`, `src/data/_meta/tools-registry.json`, `src/data/logo-manifest.json`, `src/data/generated-assets/og-tools-manifest.json`
- Generated assets: logos in `public/logos/tools/`, OG cards in `public/og/tools/`
- Ledger: `PAGE_REFRESH_LEDGER.md`

## Source Notes

- Patronus AI was verified against official docs, pricing, evaluator reference, official homepage, and the June 25 Digital World Model announcement.
- DeepEval was verified against official metrics docs, Confident AI pricing, and the Apache 2.0 license.
- Traceloop was verified against official docs, pricing, OpenLLMetry repository/license, and the ServiceNow announcement.
- BAML was verified against official docs, testing docs, Boundary Studio observability docs, docs index, and the Apache 2.0 license.

## Caveats

- Patronus AI now blends eval-platform functionality with Digital World Model research positioning. Buyers should confirm whether they are buying eval ops, Digital World Model access, services, or a combination.
- DeepEval is free/open-source as a framework, but hosted Confident AI, model judges, repeated eval runs, and team operations are separate costs.
- Traceloop is joining ServiceNow, so roadmap, procurement path, support continuity, and AI Control Tower packaging need live confirmation.
- BAML uses the official docs favicon because no fuller public logo asset was found during this pass.

## Verification

- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/patronus-ai.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/deepeval.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/traceloop.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/baml.md`
- `npm run check:frontmatter -- --changed`
- `npm run audit:provenance:changed -- --json`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 node scripts/audit-date-consistency.mjs --changed`
- `npm run audit:sources -- --live --limit 0 --source-id baml-boundary-studio --source-id baml-docs-index --source-id baml-license --source-id baml-testing-functions --source-id baml-what-is --source-id confident-ai-pricing --source-id deepeval-license --source-id deepeval-metrics --source-id patronus-docs --source-id patronus-dwm-announcement --source-id patronus-evaluator-reference --source-id patronus-official --source-id patronus-pricing --source-id traceloop-docs --source-id traceloop-openllmetry-license --source-id traceloop-openllmetry-readme --source-id traceloop-pricing --source-id traceloop-servicenow`
- `node scripts/generate-logo-manifest.mjs --check`
- `node scripts/generate-og-svgs.mjs --check`
- `AIPEDIA_LEDGER_DATE=2026-06-28 npm run ledger:pages:check`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run guard:check`
- `npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /tools/patronus-ai/ --route /tools/deepeval/ --route /tools/traceloop/ --route /tools/baml/ --route /categories/ai-infrastructure/ --route /categories/ai-coding/ --route /categories/ai-automation/ --route /tools/ --route /categories/ --route /`
- Generated API and LLM smoke check for `patronus-ai`, `deepeval`, `traceloop`, and `baml`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run check:quick`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`

## Next

- Continue selecting net-new AI tools missing from `src/content/tools/`.
- Prefer high-buyer-value agent infrastructure, observability, eval, memory, retrieval, workflow, and commercial creator/business tools.
