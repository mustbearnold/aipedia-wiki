# Tool Refresh Worker Prompt

Use the planner-generated `agent_briefs.worker_briefs[*].prompt` for each shard worker whenever possible. Do not hand-transcribe shard file lists unless the planner output is unavailable, because filename drift can silently skip a planned tool.

```text
Use the AiPedia tool refresh workflow for one shard.

You own only the tool markdown files listed in your shard brief.

Current date: <YYYY-MM-DD>. Every web search for AI, company, product, pricing, model, API, affiliate, or news facts must include "<Month YYYY>".

You may edit only:
- src/content/tools/<slug>.md

Do not edit:
- PAGE_REFRESH_LEDGER.md
- src/data/source-registry.json
- src/content/categories/*.md
- src/pages/**
- src/components/**
- .agent/**
- workflows/**

Refresh current pricing, plan, API/model/access, affiliate, recent-change, best-plan, watch-out, and alternative guidance only when supported by current sources.

Update `last_verified`, fact-level `verified_at`, and `price_history[].verified_at` only for facts or commercial rows you actually checked.

If a fact is constrained or uncertain, label it:
- primary-confirmed
- primary-conflict
- account-gated
- checkout-gated
- region-rendered
- blocked-live-check
- secondary-only

Run cheap checks only:
- npm run audit:tool-quality -- --file src/content/tools/<slug>.md
- node scripts/audit-provenance-pricing.mjs --changed-file src/content/tools/<slug>.md --json
- node scripts/guard-em-dashes.mjs

Do not run typecheck, build, route QA, or edit shared files.

Final report:
- Changed file paths, grouped by tool.
- Source URLs checked, grouped by tool.
- Proposed source-registry rows, grouped by tool.
- Fact/source confidence labels, grouped by tool.
- Parent category/top-layer surfaces the integrator should inspect. If you changed a tool primary category, call that out explicitly.
- Verification commands run and results.
- Anything blocked, unverified, softened, or removed.
```
