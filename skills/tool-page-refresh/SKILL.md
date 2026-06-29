# Tool Page Refresh

## Purpose

Refresh existing AiPedia tool pages with current, source-backed facts and decision-useful buyer guidance.

## When to use

Use this skill when updating one or more files under `src/content/tools/`, especially pricing, models, API access, best plan, watch-outs, alternatives, source IDs, affiliate CTAs, or last verified dates.

## Required inputs

- Tool slug.
- Current date.
- Update reason.
- Known official URL, pricing URL, docs URL, or affiliate URL when available.
- Scope: one tool, focused cluster, or planner batch.

## Output format

- Changed tool page paths.
- Evidence bundle with source URLs, source IDs, verified dates, and caveats.
- Parent and top-layer surfaces inspected.
- Validation commands and outcomes.
- Residual risks.

## Workflow steps

1. Read the current tool markdown.
2. Extract volatile claims and current source refs.
3. Verify official pricing, docs, model/API access, changelog, and affiliate facts.
4. Update only supported facts and caveat blocked or conflicting evidence.
5. Refresh verdict, best plan, watch-out, alternatives, and recent changes when evidence supports it.
6. Update parent category hubs, source registry rows, generated surfaces, and `PAGE_REFRESH_LEDGER.md` when affected.
7. Run focused page checks and rendered checks when required.

## Safety rules

- Never invent pricing, model access, plan limits, affiliate terms, or source dates.
- Workers in a batch may edit only assigned tool markdown files.
- The integrator owns shared files such as source registry, ledgers, category hubs, and LLM surfaces.
- Do not remove affiliate links or commercial disclosures without evidence and approval.

## Validation steps

- `npm run check:frontmatter`
- `AIPEDIA_CURRENT_DATE=<date> npm run audit:tool-quality -- --file src/content/tools/<slug>.md`
- `npm run audit:provenance:changed -- --json`
- `npm run ledger:pages && npm run ledger:pages:check`
- `npm run typecheck` and `npm run build:fast` when rendered output or schema confidence is affected.
- `npm run qa:route -- --site-dir dist-fast/client --route /tools/<slug>/` when rendered output changed.

## Related scripts

- `npm run tool:refresh:batch`
- `npm run tool:refresh:batch:check`
- `npm run runner:tool-refresh:plan`
- `npm run runner:tool-refresh:closeout`
- `npm run audit:sources`

## Final report requirements

Use `docs/codex-report-format.md`. Include changed facts, current-source caveats, source IDs, parent surfaces, commands, failed-then-fixed checks, and follow-ups.
