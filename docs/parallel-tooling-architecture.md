# Parallel Tooling Architecture

## Target Shape

```text
Codex goal
  -> workflow planner
  -> task graph
  -> parallel deterministic tools
  -> evidence bundle
  -> LLM synthesis
  -> validator
  -> patch or report
```

The goal is not random multi-agent chaos. The goal is parallel evidence gathering, deterministic tooling, batched expensive work, serial final judgment, and validation before publishing.

## Parallel Tasks

These can run in parallel because they gather evidence or produce read-only signals:

- Read current page.
- Scan related pages.
- Check internal links.
- Gather official docs.
- Gather pricing information.
- Gather recent news.
- Check affiliate data.
- Check competitor pages.
- Retrieve project memory.
- Run SEO checks.
- Run validation checks.
- Scan stale pages.
- Inspect source registry rows.
- Inspect route QA policies.

## Serial Tasks

These should stay serial because they require judgment or shared-state ownership:

- Final factual synthesis.
- Final content patch.
- Source registry integration.
- Parent hub and top-layer edits.
- Ledger regeneration.
- Final validation.
- Build and route QA closeout.
- Final report.

## Task Graph Format

```json
{
  "workflow": "tool-page-refresh",
  "inputs": {
    "tool": "example",
    "slug": "example"
  },
  "parallel": [
    "read_current_page",
    "fetch_official_docs",
    "fetch_pricing",
    "retrieve_related_pages",
    "scan_affiliate_data",
    "collect_recent_news",
    "check_internal_links"
  ],
  "join": "build_evidence_bundle",
  "then": [
    "propose_patch",
    "validate_claims",
    "run_build",
    "write_report"
  ]
}
```

## Worker Boundaries

Parallel workers should own isolated read-only tasks or isolated content files. Shared files need one integrator:

- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- category hubs
- top-layer routes
- LLM and search surfaces
- workflow receipts
- `.agent/` continuity docs

## Evidence Bundle Contract

The join step should produce compact JSON, not a giant paste:

```json
{
  "page": "/tools/example/",
  "current_claims": [],
  "official_facts": [],
  "pricing_facts": [],
  "recent_changes": [],
  "affiliate_notes": [],
  "internal_link_suggestions": [],
  "stale_sections": [],
  "recommended_updates": [],
  "risk_notes": []
}
```

## Validation Strategy

Validators should run after synthesis and before publishing:

- Claim support and source IDs.
- Source registry date consistency.
- Frontmatter parsing.
- Internal links.
- Affiliate CTA and disclosure contract.
- Ledger freshness.
- Route QA where rendered output changed.
- Em dash and editorial guard checks.

## Current Implementation Fit

The existing Rust runner already proves this model for tool refresh and page refresh. The next step is a generic task-DAG planner that can invoke existing scripts, save compact evidence bundles, and hand a small synthesis payload to Codex.

## Current Helper Commands

```bash
npm run agent:evidence -- --route /tools/cursor/ --json
npm run agent:impact -- --route /tools/cursor/ --json
```

Use `agent:evidence` as the join payload for a single route. Use `agent:impact` before integration so Codex knows which parent hubs, top-layer routes, shared files, and LLM/search surfaces might need inspection.
