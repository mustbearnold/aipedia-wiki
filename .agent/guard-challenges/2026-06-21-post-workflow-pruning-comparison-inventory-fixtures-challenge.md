# Guard Challenge: post workflow pruning comparison inventory fixtures

**Date:** 2026-06-21
**Status:** accepted
**Failing command:** npm run check:smart:run
**Guard files:** scripts/guard-content.mjs
**Product files:** src/content/comparisons, tests/scripts/audit-site-kpis.test.mjs, tests/scripts/guard-stale-facts.test.mjs
**Decision:** update-fixture
**Implementer:** Codex
**Guard defender:** Curie
**Arbitrator:** Averroes

## Implementer brief

After the workflow-lane cleanup deleted 19 invalid live comparison pages, `npm run check:smart:run` failed in `npm run test:scripts` because inventory fixtures still assumed at least 60 comparison pages. The live comparison count is now 46, and `node scripts/audit-coverage-quality.mjs --all --json` passes with zero failures after enforcing `src/data/comparison-policy.json` workflow lanes.

The failing assertions were:

```text
tests/scripts/audit-site-kpis.test.mjs: assert.ok(data.collections.comparisons >= 60)
tests/scripts/guard-content.test.mjs: guard-content reported comparisons count 46 below floor 60
tests/scripts/guard-stale-facts.test.mjs: assert.ok(data.totals.comparisons_scanned >= 60)
```

The intended change is to preserve the content-loss guard while re-anchoring it to the legitimate post-pruning inventory: set `scripts/guard-content.mjs` comparison floor to 41, matching the current 46 live comparison pages minus the existing five-page safety margin, and update KPI/stale-fact smoke tests to require a policy-aligned minimum around 40 instead of forcing a stale 60-page inventory.

## Guard defender brief

Invariant: `guard-content` should catch accidental comparison inventory loss, not force AiPedia to keep invalid false-vs pages. The comparison policy invariant is stricter: live `vs` pages must compare direct substitutes for the same buyer job and workflow.

Decision: this is a fixture refresh and baseline re-anchor, not guard weakening. Current live count is 46 comparisons, and the baseline calculation computes a 41 floor with the existing five-page safety margin. Updating `>=60` test assertions to a policy-aligned minimum around 40 is appropriate for KPI and stale-fact smoke tests.

Caveat: keep 41 as the actual content guard floor and treat 40 only as a loose test minimum. Future legitimate pruning should repeat the Guard Challenge process and baseline dry run.

## Arbitrator decision

Decision: `update-fixture`.

This is a stale baseline/test expectation after intentional policy-aligned pruning, not a code defect. With 46 valid live comparison pages, a guard floor of 41 preserves the safety margin without forcing deleted invalid pages back into the site. Tests should assert the policy-aligned floor, around `>=40`, rather than encode the old inflated inventory.

## Fixture or test change

Updated `scripts/guard-content.mjs`, `tests/scripts/audit-site-kpis.test.mjs`, and `tests/scripts/guard-stale-facts.test.mjs`. Fixture evidence is the current comparison count of 46, the passing comparison quality audit, and focused tests that no longer require stale inventory inflation.

## Verification

Run: `node scripts/audit-coverage-quality.mjs --all --json`
Run: `node scripts/guard-content.mjs --json`
Run: `node scripts/audit-site-kpis.mjs --json`
Run: `node scripts/guard-stale-facts.mjs --json`
Run: `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/guard-content.test.mjs tests/scripts/guard-stale-facts.test.mjs tests/scripts/check-smart.test.mjs`
Run: `npm run guard:challenge:check`
Run: `npm run check:smart:run`

## Follow-up risk

Future legitimate comparison pruning should repeat this challenge process and baseline check. The content floor catches sudden loss below 41, while `scripts/audit-coverage-quality.mjs --all --json` now carries the stricter quality invariant that every live comparison must share an approved workflow lane when policy defines lanes for that category.
