# Agent Memory System

AiPedia needs durable memory that helps future Codex runs retrieve current facts, page context, source history, and workflow results without dumping the whole repo into the prompt.

## Memory Should Store

- Tool metadata.
- Page facts.
- Affiliate data.
- Pricing history.
- Model and version history.
- Source URLs and source IDs.
- Page update history.
- Known claims.
- Quality notes.
- Conversion notes.
- Internal-link graph.
- Stale-page queue.
- Previous Codex reports.
- Recurring workflow outputs.

## Memory Object Example

```json
{
  "id": "tool:cursor:pricing:2026-06",
  "type": "pricing_fact",
  "tool": "Cursor",
  "claim": "Cursor Pro pricing was verified from the official pricing page on the observed date.",
  "source_url": "https://example.com/pricing",
  "observed_at": "2026-06-29",
  "confidence": 0.92,
  "page_slugs": ["cursor", "cursor-vs-codex"],
  "expires_after_days": 30
}
```

## Memory Types

- `tool_fact`
- `pricing_fact`
- `model_fact`
- `affiliate_fact`
- `source_record`
- `page_refresh`
- `claim_receipt`
- `quality_note`
- `conversion_note`
- `internal_link_edge`
- `workflow_report`
- `risk_note`

## Retrieval Priority

1. Current official facts.
2. Recent pricing, model, and version changes.
3. Affiliate conversion relevance.
4. Page-specific context.
5. Related comparison pages.
6. Known stale sections.
7. Previous Codex reports.
8. Internal link opportunities.

## Evidence Bundle Example

```json
{
  "tool": "example",
  "current_page_claims": [],
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

## Current CLI

Use the read-only evidence bundle command before a manual page edit:

```bash
npm --silent run agent:evidence -- --route /tools/cursor/ --json
npm --silent run agent:evidence -- --path src/content/tools/cursor.md --current-date 2026-06-29 --json
npm --silent run agent:memory:record -- --route /tools/cursor/ --json
npm --silent run agent:memory:query -- --memory local/tmp/agent-memory.jsonl --query "pricing source gaps" --json
```

The command gathers page frontmatter facts, source IDs, registered source metadata, affiliate state, ledger row, internal links, parent-impact signals, stale-review signals, and recommended update prompts. It does not perform live web verification.

`agent:memory:record` turns evidence, impact, score, and source rows into JSONL-ready memory records with CPU lexical vectors. It writes to `local/tmp/agent-memory.jsonl` by default. Use `--out .agent/memory/agent-memory.jsonl --append` only for intentional durable project memory.

For content routes that are intentionally absent from `PAGE_REFRESH_LEDGER.md`, such as individual news articles, the agent route resolver falls back to the content collection. News articles also carry inline `sources` URLs rather than source-registry IDs; evidence and memory records count those inline sources separately from registered source IDs.

## Ingestion Sources

- `src/content/**/*.md`
- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- worker reports under `local/tmp/aipedia-runner/`
- durable receipts under `.agent/loop-runs/`
- `docs/refactor-report.md` and future workflow reports
- route QA timing files
- affiliate inventory JSON
- provenance and source-health audit JSON

## Expiration Rules

Use shorter lifetimes for volatile claims:

- Pricing: 14 to 30 days.
- Model access and API features: 7 to 30 days.
- Affiliate terms: 30 days or until approval status changes.
- Logos and official URLs: 90 days.
- Editorial quality notes: 90 to 180 days.
- Historical receipts: no expiration, but low retrieval priority.

## Retrieval Output Rule

The LLM should receive compact evidence bundles, not giant memory dumps. Each retrieved item should include the claim, source, observed date, confidence, expiration, page impact, and caveat.

## Future Storage Path

Start with JSONL exports from deterministic scripts. Move to SQLite or a vector-backed service only after the object schema stabilizes. GPU reranking belongs later, after CPU retrieval proves useful and measurable.
