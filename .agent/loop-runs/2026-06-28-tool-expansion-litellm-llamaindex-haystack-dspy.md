# 2026-06-28 Tool Expansion: LiteLLM, LlamaIndex, Haystack, DSPy

## Status

- Complete locally, verified, pending commit and push.
- Active user goal continues: keep adding net-new AI tool pages for the full day unless Matt pauses or redirects.

## Added Pages

- `/tools/litellm/`
- `/tools/llamaindex/`
- `/tools/haystack/`
- `/tools/dspy/`

## Updated Surfaces

- Tool content: `src/content/tools/litellm.md`, `src/content/tools/llamaindex.md`, `src/content/tools/haystack.md`, `src/content/tools/dspy.md`
- Parent hubs: AI Infrastructure, AI Coding, AI Automation, AI Search
- Top-layer surfaces: `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`
- Data surfaces: `src/data/source-registry.json`, `src/data/_meta/tools-registry.json`, `src/data/logo-manifest.json`, `src/data/generated-assets/og-tools-manifest.json`
- Generated assets: logos in `public/logos/tools/`, OG cards in `public/og/tools/`
- Ledger: `PAGE_REFRESH_LEDGER.md`

## Source Notes

- LiteLLM was verified against official docs, Enterprise docs, docs index, and the GitHub license.
- LlamaIndex was verified against framework docs, pricing, and the GitHub license.
- Haystack was verified against official docs, deepset AI Platform pricing, and the GitHub license.
- DSPy was verified against the official site, getting-started docs, and the GitHub license.

## Caveats

- LiteLLM Enterprise pricing was not publicly listed on checked official surfaces, so the page treats Enterprise as a custom sales or trial route.
- LlamaIndex framework use is separate from LlamaParse/LlamaCloud credits, model calls, embeddings, storage, hosting, and evaluation work.
- Haystack framework use is separate from deepset AI Platform procurement, support, deployment, governance, and dedicated-resource terms.
- DSPy is useful only when teams have repeatable tasks, representative examples, and meaningful metrics; otherwise optimizer runs can burn model calls without improving production behavior.

## Verification

- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/litellm.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/llamaindex.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/haystack.md`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run audit:tool-quality -- --file src/content/tools/dspy.md`
- `npm run check:frontmatter -- --changed`
- `npm run audit:provenance:changed -- --json`
- `npm run audit:sources -- --live --limit 0 --source-id litellm-docs --source-id litellm-enterprise --source-id litellm-license --source-id litellm-llms --source-id llamaindex-framework-docs --source-id llamaindex-pricing --source-id llamaindex-license --source-id haystack-docs --source-id haystack-license --source-id deepset-pricing --source-id dspy-official --source-id dspy-program-dont-prompt --source-id dspy-license`
- `node scripts/generate-logo-manifest.mjs --check`
- `node scripts/generate-og-svgs.mjs --check`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run guard:check`
- `AIPEDIA_CURRENT_DATE=2026-06-28 npm run typecheck`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /tools/litellm/ --route /tools/llamaindex/ --route /tools/haystack/ --route /tools/dspy/ --route /categories/ai-infrastructure/ --route /categories/ai-coding/ --route /categories/ai-automation/ --route /categories/ai-search/ --route /tools/ --route /categories/ --route /`
- Generated API and LLM smoke check for `litellm`, `llamaindex`, `haystack`, and `dspy`
- `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run check:quick`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`

## Retry Note

- An initial `npm run build:fast` attempt failed because it was run without `AIPEDIA_LEDGER_DATE=2026-06-28`, causing the embedded ledger check to use the default date. The command was rerun with both date environment variables and passed.

## Next

- Continue selecting net-new AI tools missing from `src/content/tools/`.
- Prefer high-buyer-value agent infrastructure, observability, eval, memory, retrieval, workflow, and commercial creator/business tools.
