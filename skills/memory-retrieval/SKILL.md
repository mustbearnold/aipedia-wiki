# Memory Retrieval

## Purpose

Design, query, or update durable AiPedia memory objects so Codex receives compact evidence bundles instead of giant context dumps.

## When to use

Use this skill for memory-system design, evidence-bundle formats, retrieval scoring, source-history storage, claim receipts, and future vector or GPU retrieval planning.

## Required inputs

- Memory goal.
- Entity or route scope.
- Current date.
- Data sources.
- Output shape.

## Output format

- Memory objects or proposed schema.
- Retrieval priority.
- Evidence bundle.
- Expiration and confidence notes.
- Risks.

## Workflow steps

1. Identify the entity: tool, page, source, claim, affiliate note, quality note, or workflow report.
2. Read relevant source files and receipts.
3. Extract compact memory objects with source, observed date, confidence, expiration, and affected pages.
4. Rank retrieval by current official facts, page specificity, affiliate relevance, freshness, and prior reports.
5. Return an evidence bundle for synthesis.
6. Do not write public content unless a separate content workflow is invoked.

## Safety rules

- Memory is not truth by itself.
- Expired volatile facts must trigger source verification.
- Do not store secret affiliate credentials or private account data in committed memory.
- Do not feed unbounded raw dumps to the LLM.

## Validation steps

- Validate JSON syntax for generated memory objects.
- Cross-check source IDs against `src/data/source-registry.json`.
- Cross-check page routes against `PAGE_REFRESH_LEDGER.md`.
- Use `npm run audit:provenance:changed -- --json` when page facts changed.

## Related scripts

- `scripts/agent-workflow-map.mjs`
- `scripts/audit-provenance-pricing.mjs`
- `scripts/generate-page-refresh-ledger.mjs`
- `docs/agent-memory-system.md`
- `docs/rust-cupy-gpu-roadmap.md`

## Final report requirements

Include memory object types, sources read, retrieval priorities, evidence bundle, expiration rules, and limitations.
