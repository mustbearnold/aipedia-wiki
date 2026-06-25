# 2026-06-24 Tool Freshness Batch

## Scope

Refreshed the next 10-tool AiPedia batch against current June 2026 sources:

- `src/content/tools/consensus.md`
- `src/content/tools/beehiiv.md`
- `src/content/tools/blackbox-ai.md`
- `src/content/tools/browserbase.md`
- `src/content/tools/canva.md`
- `src/content/tools/captions.md`
- `src/content/tools/castmagic.md`
- `src/content/tools/cline.md`
- `src/content/tools/cloudtalk.md`
- `src/content/tools/coderabbit.md`

Affected parent hubs:

- `src/content/categories/ai-research.md`
- `src/content/categories/ai-writing.md`
- `src/content/categories/ai-coding.md`
- `src/content/categories/ai-automation.md`
- `src/content/categories/ai-design.md`
- `src/content/categories/ai-image.md`
- `src/content/categories/ai-presentation.md`
- `src/content/categories/ai-video.md`

Shared surfaces:

- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/WORK_LOG.md`
- `.agent/LOOPS.md`
- `.agent/OPERATING_RULES.md`
- `scripts/README.md`
- `scripts/tool-refresh-batch.mjs`
- `tests/scripts/build-performance.test.mjs`
- `.agents/skills/aipedia-tool-refresh-workflow/SKILL.md`
- `.agents/skills/aipedia-tool-refresh-workflow/references/tool-refresh-batch.md`
- `.agents/skills/aipedia-tool-refresh-workflow/agents/openai.yaml`

## Content Notes

- Consensus: refreshed public usage, subscription-plan, and evidence-source posture to June 24, 2026.
- Beehiiv: refreshed AI credits, MCP, API, and affiliate-program posture.
- BLACKBOX AI: recorded current affiliate constraint that Cuelinks is paused and Sovrn was unapproved in this workspace context.
- Browserbase: refreshed Search, Fetch, Browser, Functions, Stagehand, and pricing-overage context.
- Canva: refreshed ChatGPT, Claude, Gemini, and Perplexity assistant integrations plus Canvassador source posture.
- Captions: refreshed Mirage API beta, Actors, and credit guidance.
- Castmagic: refreshed pricing and source-backed buyer guidance for creator repurposing.
- Cline: refreshed current open-source traction and extension-positioning context.
- CloudTalk: refreshed AI call-center and commercial-source context.
- CodeRabbit: refreshed review-agent and pricing-source context.

## Workflow Notes

The Codex Windows app allowed six active worker agents in this run. Attempts to launch four more workers returned `agent thread limit reached`, so those tools were completed in the main thread. This first adapted the workflow to respect six active agents. The follow-up workflow shape is six shard workers with up to 10 tools each:

1. Generate a 60-tool plan.
2. Launch at most six shard workers.
3. Give each worker up to 10 tool markdown files.
4. Finish all shared files in the integrator thread.
5. Keep source registry, parent hubs, ledger, and top-layer surfaces integrator-owned.

## Verification

Passed:

- `node --check scripts\tool-refresh-batch.mjs`
- `node --test tests\scripts\build-performance.test.mjs`
- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/consensus/ --route /categories/ai-research/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/blackbox-ai/ --route /categories/ai-coding/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/captions/ --route /categories/ai-video/ --route /tools/castmagic/ --route /tools/cline/ --route /tools/cloudtalk/ --route /tools/coderabbit/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client --concurrency 4`

The batch check included tool-quality audits for all 10 tools, provenance audit for changed files, freshness loop JSON, ledger check, em-dash guard, and `git diff --check`.

## Failed Or Adapted

- Four worker launches failed with `agent thread limit reached`.
- Adaptation: treat six concurrent workers as the current Codex Windows app limit and scale throughput by assigning up to 10 tool files per worker.

## Residual Risk

The planner can repeat same-day refreshed pages because short review windows keep high-volatility facts near due. Before the next large run, either skip pages already refreshed on the current date or tune the planner to exclude same-day refreshed tools unless explicitly requested.

## Next

Regenerate with:

```powershell
npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json
```

The next not-refreshed item observed behind this batch was `cody`.
