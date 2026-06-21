# Guard Challenge: post cleanup comparison inventory fixtures

**Date:** 2026-06-21
**Status:** accepted
**Failing command:** npm run loop:verify -- --date 2026-06-21 --slug activepieces-vs-zapier
**Guard files:** scripts/guard-content.mjs, tests/scripts/audit-site-kpis.test.mjs, tests/scripts/guard-stale-facts.test.mjs, tests/scripts/check-smart.test.mjs, tests/scripts/loop-hardening.test.mjs
**Product files:** src/content/comparisons, src/data/comparison-policy.json
**Decision:** update-fixture
**Implementer:** Codex-main
**Guard defender:** Lagrange
**Arbitrator:** Archimedes

## Implementer brief

`npm run loop:verify -- --date 2026-06-21 --slug activepieces-vs-zapier` failed after the intentional false-vs comparison cleanup because several guard fixtures still assumed the pre-cleanup comparison inventory. `scripts/guard-content.mjs` kept a `comparisons: 96` floor while the live count after cleanup is 65. `tests/scripts/audit-site-kpis.test.mjs` and `tests/scripts/guard-stale-facts.test.mjs` expected at least 90 comparison pages. `tests/scripts/check-smart.test.mjs`, `tests/scripts/loop-hardening.test.mjs`, and `tests/smoke/api-routes.spec.mjs` referenced deleted comparison slugs. The intended change is to preserve the guard behavior, refresh the comparison floor to the baseline dry-run value of 60, and point route fixtures at live policy-aligned comparisons.

## Guard defender brief

The guard invariant is still correct: content guards should catch accidental inventory loss and stale verification planning. They should not force AiPedia to keep invalid broad false-vs pages. These failures do not match the protected invariant. A `96` or `>=90` comparison expectation is stale after the deliberate cleanup, and deleted route examples are stale fixtures. Keep the guards and update the fixtures.

## Arbitrator decision

Decision: `update-fixture`. The comparison deletion was intentional, and the guard still protects a real failure mode. A comparison count of 65 with a floor of 60 keeps the five-page safety margin from `node scripts/guard-content.mjs --baseline --dry-run --json`. Replacing deleted fixture routes with `activepieces-vs-zapier` and `chatgpt-vs-claude` aligns the verification examples with the stricter same-buyer-job comparison policy.

## Fixture or test change

Updated `scripts/guard-content.mjs`, `tests/scripts/audit-site-kpis.test.mjs`, `tests/scripts/guard-stale-facts.test.mjs`, `tests/scripts/check-smart.test.mjs`, `tests/scripts/loop-hardening.test.mjs`, `tests/scripts/decision-loop.test.mjs`, and `tests/smoke/api-routes.spec.mjs`. Fixture evidence: `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/guard-content.test.mjs tests/scripts/guard-stale-facts.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs` passed, and `node --test tests/scripts/decision-loop.test.mjs` passed.

## Verification

Run: `node scripts/guard-content.mjs --json`.
Run: `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/guard-content.test.mjs tests/scripts/guard-stale-facts.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`.
Run: `node --test tests/scripts/decision-loop.test.mjs`.
Run: `npm run guard:challenge:check`.
Run: `npm run loop:verify -- --date 2026-06-21 --slug activepieces-vs-zapier --route /compare/activepieces-vs-zapier/`.

## Follow-up risk

The comparison floor now has a five-page margin below the current count. Future legitimate pruning should repeat the same guard-challenge process and baseline dry run. Remaining synthetic loop fixtures are allowed only when they are explicitly fixture-local and policy-aligned.
