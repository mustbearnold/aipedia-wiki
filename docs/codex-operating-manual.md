# Codex Operating Manual

This manual explains how Codex should work inside `aipedia.wiki`. It is practical by design: inspect, choose a workflow, gather evidence, patch carefully, validate, and report.

## Default Work Loop

1. Read `INDEX.md`, `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/PROJECT_MAP.md`, and `.agent/OPERATING_RULES.md`.
2. Read the files that own the requested surface.
3. Pick the matching workflow or skill.
4. Identify volatile facts and affected top-layer pages before editing.
5. Gather current evidence with official sources where possible.
6. Build a compact evidence bundle with `npm --silent run agent:evidence -- --route <route> --json` when working on one page.
7. Patch only the needed files.
8. Run the smallest valid checks first.
9. Run rendered checks only when rendered output, runtime behavior, schema, SEO, or deployment confidence is affected.
10. Update `.agent/` continuity docs for major work.
11. Report changed files, commands, outcomes, risks, and follow-ups.

## Inspect Before Edit

Do not guess repo shape. Inspect:

- `package.json` for commands.
- `src/content.config.ts` for collection schema.
- The source markdown or route file being changed.
- Layouts and components that render the page.
- Parent hubs, top-layer routes, LLM surfaces, feeds, search APIs, and ledgers affected by the change.
- Existing workflow docs and relevant skill files.

## Evidence First

For volatile AI facts, always verify before editing:

- Pricing and plan names.
- Model names and availability.
- API access, context windows, and feature limits.
- Affiliate programs and commercial terms.
- Company status, acquisitions, outages, shutdowns, and funding.
- Benchmarks and performance claims.

Use official sources first. If current facts are blocked, record the access state and caveat the claim. Do not invent facts to make a page feel complete.

## Prefer Small Patches

Make the smallest reversible change that achieves the task. Avoid broad formatting churn, unrelated rewrites, route migrations, schema churn, or generated-output edits.

If a repeated manual step appears, prefer a script, schema, checklist, skill, or workflow update over another long prompt.

## Preserve User Work

Run `git status -sb` before work. If there are unrelated changes, leave them alone. If user changes affect the same files, read carefully and work with them. Never reset, checkout, or delete user work unless explicitly instructed.

## Validation Ladder

For docs, scripts, skills, and workflow-only edits:

```bash
node --check <changed-script>
npm run agent:skills:check
npm --silent run agent:workflow:map -- --json
npm --silent run agent:evidence -- --route /tools/cursor/ --json
npm --silent run agent:impact -- --route /tools/cursor/ --json
npm --silent run agent:score -- --route /tools/cursor/ --json
npm --silent run agent:memory:record -- --route /tools/cursor/ --json
npm --silent run agent:score:calibrate -- --json
npm --silent run agent:input-freshness -- --all --json
npm run check:quick
git diff --check
```

For content or page edits:

```bash
npm run ledger:pages && npm run ledger:pages:check
npm run check:frontmatter
npm run audit:provenance:changed -- --json
npm run guard:check
npm run typecheck
npm run build:fast
npm run qa:route -- --site-dir dist-fast/client --route /changed-route/
```

For affiliate pages:

```bash
npm run affiliate:conversion:inventory -- --json
npm run audit:affiliate-conversion -- --strict --json
npm run audit:guide-picks
```

For news:

```bash
npm run check:news
node scripts/audit-news-rendering.mjs --json
```

## Current Date Discipline

Use the actual current date for verification. If commands require a date shim because the content date is intentionally pinned, set `AIPEDIA_CURRENT_DATE` and `AIPEDIA_LEDGER_DATE` explicitly and document why.

## Reporting

Use `docs/codex-report-format.md`. A good final report is short, factual, and complete enough for the next agent to continue without redoing the work.

## When To Escalate

Ask the user only when:

- A public URL or slug migration is required.
- A destructive command would be needed.
- A volatile fact cannot be verified and the page cannot safely caveat it.
- User changes conflict with the requested task in a way that cannot be merged safely.
- A guard appears wrong and the guard challenge workflow requires human judgment.
