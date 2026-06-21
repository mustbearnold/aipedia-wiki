# Guard Challenge: live comparison workflow-lane guard

**Date:** 2026-06-21
**Status:** accepted
**Failing command:** node scripts/audit-coverage-quality.mjs --all --json
**Guard files:** scripts/audit-coverage-quality.mjs
**Product files:** src/content/comparisons, src/data/comparison-policy.json, tests/scripts/audit-coverage-quality.test.mjs
**Decision:** fix-code
**Implementer:** Codex
**Guard defender:** Gauss
**Arbitrator:** Beauvoir

## Implementer brief

`npm run loop:quality -- --json` originally reported 62 comparison-quality failures. A structural cleanup reduced that to two ordinary quality failures, but an explicit inventory check against `src/data/comparison-policy.json` found 19 live comparison pages whose tool pairs do not share an approved workflow lane. Example output from the policy check:

```text
src/content/comparisons/adobe-firefly-vs-ideogram.md: no shared lane (adobe-firefly: adobe_native_commercial_production; ideogram: text_or_vector_graphic_generation)
src/content/comparisons/cartesia-vs-elevenlabs.md: no shared lane (cartesia: real_time_voice_agents; elevenlabs: creator_tts_and_voiceover)
src/content/comparisons/chatgpt-vs-kimi.md: no shared lane (chatgpt: finished_general_assistants; kimi: model_provider_platforms)
```

The intended productive work is to make `scripts/audit-coverage-quality.mjs --all` enforce the same strict workflow-lane policy for live comparison pages that `coverage:next` and `loop:next` already enforce for future page selection. This is not a guard weakening. It is a guard strengthening so Quality Pruning actually protects the stated invariant: published `vs` pages must compare direct substitutes for the same buyer job and workflow.

The matching product fix is to delete live no-shared-lane comparison pages, remove public links to them, regenerate `PAGE_REFRESH_LEDGER.md`, and record the cleanup. This aligns with the user rule that comparison pages for different categories, different use cases, or different workflows should be deleted and removed.

## Guard defender brief

The invariant is that a live comparison page must compare direct substitutes for the same buyer job. In `src/data/comparison-policy.json`, that means same primary category and, where workflow lanes exist, at least one shared approved workflow lane. Review-only, broad-category, or no-shared-lane pairs should not be published comparison pages.

Adding workflow-lane enforcement to `scripts/audit-coverage-quality.mjs` is appropriate. The audit is already the read-only quality gate for comparison pages, but it currently checks page quality without enforcing the selection policy. Making `--all` fail live no-shared-lane pages is a guard strengthening, not a weakening.

Deleting live no-shared-lane comparison pages matches the invariant, as long as public links, parent/listing surfaces, and `PAGE_REFRESH_LEDGER.md` are cleaned in the product fix. If a pair deserves an exception, it should be made explicit in policy rather than slipping through the guard.

## Arbitrator decision

Decision: `fix-code`.

Approve the proposal. `src/data/comparison-policy.json` is explicit that published comparison pages must share the same primary category and, where workflow lanes exist, an approved shared lane. `scripts/audit-coverage-quality.mjs --all` currently audits page quality but misses that canonical eligibility rule, so the guard is incomplete. The live no-shared-lane pages are product defects, not fixture debt.

Proceed by adding workflow-lane enforcement to the all-comparison audit, deleting live no-shared-lane comparison pages and public links, and adding focused tests for shared-lane pass and no-shared-lane fail.

## Fixture or test change

Add focused tests in `tests/scripts/audit-coverage-quality.test.mjs` proving a same-workflow comparison passes and a no-shared-lane live comparison fails when `src/data/comparison-policy.json` defines workflow lanes.

## Verification

Run: `node --test tests/scripts/audit-coverage-quality.test.mjs`
Run: `node scripts/audit-coverage-quality.mjs --all --json`
Run: `npm run guard:challenge:check`
Run: `npm run loop:quality -- --json`

## Follow-up risk

This guard depends on `src/data/comparison-policy.json` staying current. If a pair is intentionally allowed despite different workflow lanes, add an explicit policy lane or documented exception before publishing the page.
