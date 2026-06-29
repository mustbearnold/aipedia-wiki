# Codex Report Format

Use this format for final responses, run receipts, and handoff notes. Keep it concise but specific.

## Standard Report

```md
Task:

Files changed:

Commands run:

Build/test result:

Facts updated:

Affiliate changes:

SEO changes:

Risks:

Follow-up tasks:
```

## Field Guidance

Task: one sentence describing the user request and final outcome.

Files changed: group by purpose. Include paths, not every tiny generated output unless relevant.

Commands run: list exact commands that produced confidence. Note commands that failed, what was fixed, and the passing rerun.

Build/test result: say passed, failed, skipped, or not applicable. Explain skipped checks.

Facts updated: list volatile facts, source dates, source IDs, and caveats.

Affiliate changes: mention CTA labels, tracking payloads, disclosures, official fallback links, and approval-state assumptions.

SEO changes: mention title/meta, canonical/indexability, schema, internal links, parent hubs, and LLM/search/feed surfaces.

Risks: unresolved source access, current-date caveats, generated-output limitations, user decisions needed, and known unrelated failures.

Follow-up tasks: only list actionable work that remains.

## Minimal Repo-Maintenance Report

```md
Task:
Files changed:
Verification:
Risks:
```

Use the minimal form for docs, scripts, tests, workflow-only changes, and small maintenance work.
