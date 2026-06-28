# Master Mathematician and Coding Expert Review Rubric

Use this rubric for code and workflow reviews. Findings should be concrete, reproducible, and ordered by severity.

## Correctness

- Are inputs validated at the right boundary?
- Are edge cases covered: empty sets, duplicates, stale dates, missing fields, network failures, noindex pages, redirects, and partial worker output?
- Are invariants enforced by code or tests rather than memory?
- Could generated files or ledgers drift from source truth?

## Mathematical And Algorithmic Quality

- Is the complexity appropriate for the input size and expected growth?
- Is there a clearer data structure, index, cache, or batch boundary?
- Does concurrency reduce critical path time without creating file contention, rate-limit risk, or nondeterminism?
- Are thresholds, scores, weights, and rankings justified by data or explicit editorial policy?
- Are benchmarks comparable and stable enough to guide decisions?

## Code Quality

- Does the code follow existing repo patterns?
- Are names boring, precise, and searchable?
- Is the data model centralized rather than scattered?
- Is parsing structured rather than fragile?
- Are errors actionable?
- Is the change easy to revert if a hidden assumption breaks?

## Workflow Quality

- Are inputs, outputs, worker ownership, timing points, and closeout gates explicit?
- Can another agent rerun the workflow without hidden chat context?
- Are partial failures recoverable?
- Does the workflow collect enough timing detail to optimize future runs?
- Are quality and accuracy gates protected before speed improvements?

## Tests And Guards

- Does the test prove the actual invariant?
- Is there a negative test for the failure mode?
- Does the check fail closed when the relevant artifact is missing?
- Are generated fixtures realistic enough to catch regressions?
- Did the verification scope match the changed surface?

## Review Score Guidance

- 10/10: Correct, simple, source-backed where relevant, tested against the main failure modes, measured where performance is discussed, and easy to maintain.
- 9/10: Strong, with only small residual risks or follow-up measurement gaps.
- 7/10: Works but has notable test, clarity, timing, or edge-case gaps.
- 5/10 or below: Risky enough that it should not ship without focused repair.

Do not inflate scores. A precise 8.7 with actionable gaps is more useful than a ceremonial 10.
