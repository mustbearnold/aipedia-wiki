# Decision Loop Run Records

This directory stores durable loop receipts.

Decision-content receipts live directly in this folder. System-level broad-review JSON receipts live under `system/`.

Use `npm run loop:record` after a major cycle to record:

- Target slug and route.
- Changed files.
- Verification commands and route QA result.
- Failures found and fixed.
- Residual risks.
- Next recommended cluster or action.

These records are supporting evidence. `.agent/CURRENT_STATUS.md` remains the first source for current state, and `.agent/PLANS.md` remains the active-work source.

Use `npm run loop:all:record -- --json` only when a broad loop review should become durable history. Casual checks should use `npm run loop:all -- --json`.
