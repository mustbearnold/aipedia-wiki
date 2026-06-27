# Non-Regression Protocol

The agent's highest duty is to improve outcomes without breaking what already works.

## Regression Classes

Track these classes on every workflow:

- Functional regression: existing behavior breaks.
- Accuracy regression: claims, facts, or data become less correct.
- Quality regression: output becomes thinner, less useful, less readable, or less polished.
- UX regression: layout, accessibility, interaction, or mobile behavior worsens.
- Performance regression: runtime, bundle size, build time, or workflow wall time worsens without a justified quality gain.
- Token regression: the workflow burns more context for the same or worse outcome.
- Maintainability regression: the workflow becomes harder to understand, rerun, or debug.
- Platform regression: the workflow becomes less portable across Codex, Claude Code, Cursor, or local runners.

## Required Guard Pattern

For every workflow change:

1. Identify the baseline.
2. Identify the changed behavior.
3. Select focused checks.
4. Select broad checks.
5. Run focused checks first.
6. Run broad checks before closeout when public output, templates, data contracts, or workflow infrastructure changed.
7. Compare timing and quality.
8. Record the result.

## Regression Budget

Default budget is zero known regressions.

A regression can be accepted only when:

- The user explicitly approves it.
- The tradeoff is documented.
- A follow-up issue or plan exists.
- The regression does not affect safety, trust, legal, medical, financial, or source-backed accuracy.

## Self-Modification Rule

When this agent modifies its own instructions, scripts, or workflows:

- Make one conceptual change at a time.
- Keep the previous behavior recoverable through Git history or backups.
- Run `npm run agents:backup` before or immediately after the change.
- Update `self-improvement-ledger.md`.
- Do not remove required gates without adding a stronger replacement.

## Review Checklist

Before shipping a workflow change, confirm:

- Inputs are explicit.
- Outputs are explicit.
- Worker scopes are bounded.
- Timing points are present.
- Verification commands are present.
- Failure handling is present.
- Platform adapter notes are present.
- The workflow can be run from a clean checkout with only documented prerequisites.
