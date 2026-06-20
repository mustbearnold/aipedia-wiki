# Guard Challenges

Use this folder only when a guard, audit, check, or fixture may need to change.

Do not open a challenge for ordinary product-code failures. Fix the code instead.

## Required roles

1. Implementer: documents the failing command, output, changed files, and intended productive work.
2. Guard defender: states the invariant the guard protects and whether the failure matches that invariant.
3. Arbitrator: chooses `fix-code`, `narrow-guard`, `update-fixture`, `retire-guard`, or `human-escalate`.

The implementer cannot self-approve guard weakening. Proposed records may set `**Implementer:**`, `**Guard defender:**`, and `**Arbitrator:** to `pending`. Accepted records must name non-pending values for all three role fields, and the three values must be distinct.

## Required artifact

Create records with:

```bash
npm run guard:challenge -- --command "npm run guard:check" --guard scripts/guard-content.mjs --files src/content/tools/example.md --title "content guard"
```

Validate records with:

```bash
npm run guard:challenge:check
```

Accepted records must include final content in every section, real fixture or test evidence, and at least one runnable verification command. Fixture evidence must name a test path, fixture path, `.test.mjs` file, or runnable command. Verification commands must use explicit command prefixes such as `npm run`, `node`, `npx`, or `playwright`, either after `Run:` or `Command:` or inside backticks.

## Decision meanings

- `fix-code`: the guard is correct, change implementation.
- `narrow-guard`: the guard protects a real invariant but catches valid work.
- `update-fixture`: guard logic is correct but examples, routes, or expected data are stale.
- `retire-guard`: the guard no longer protects a current invariant and a replacement invariant is recorded.
- `human-escalate`: evidence is ambiguous, high-risk, or commercially sensitive.
