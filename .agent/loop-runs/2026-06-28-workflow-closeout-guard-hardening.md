# 2026-06-28 Workflow Closeout Guard Hardening

Status: verified locally.

## Scope

- Extended runner closeout JSON receipts so each superseded failed receipt includes:
  - `superseded_by`
  - `failed_command`
  - `failed_status`
  - `elapsed_ms`
- Extended `audit:date-consistency` so markdown body source links with visible verification dates are checked against source-registry `last_checked` rows.
- Updated tool-refresh and page-refresh workflow docs to describe the JSON receipt fields.

## Why

The CloudTalk review caught two workflow issues that deserved automation:

- Failed-then-fixed artifacts need machine-readable supersession details, not just human notes.
- Visible source-list dates can drift ahead of registry dates even when frontmatter source IDs are clean.

## Verification

- `npm exec --yes --package=node@24 -- node --test tests/scripts/audit-date-consistency.test.mjs tests/scripts/page-source-health.test.mjs`
- `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`
- `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`

## Timed Verification

| Step | Result | Time |
| --- | --- | ---: |
| `node --check scripts/audit-date-consistency.mjs` | pass | 0.08s |
| focused date/source tests | pass | 1.49s |
| `cargo test --manifest-path tools/aipedia-runner/Cargo.toml` | pass | 0.11s |
| `audit:date-consistency --changed --json` | pass | 0.50s |
| `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check` | pass | 0.09s |
| `npm run test:scripts` | pass, 445 tests | 15.57s |
| `npm run ledger:pages:check` | pass | 0.69s |
| `git diff --check` | pass | 0.01s |
| `npm run guard:check` | pass | 3.35s |
| `npm run guard:challenge:check` | pass | 0.47s |
| `npm run audit:commands` | pass | 0.46s |
| `npm run check:smart -- --json` | pass | 0.47s |
| `npm run audit:facts` | pass | 0.56s |
| `npm run audit:sources` | pass | 0.54s |
| `npm run audit:provenance` | pass | 0.58s |
| `npm run check:links` | pass | 0.56s |
| `npm run check:news` | pass | 0.51s |
| changed-file em dash scan | pass, no matches | 0.00s |

## Next Optimization

- Add a standalone closeout-receipt audit that scans a receipt directory and fails if a failed receipt is not covered by a later passing receipt.
- Consider exposing `audit:date-consistency --all` after measuring noise on full repo content.
