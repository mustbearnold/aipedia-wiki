# Decision Loop Run Records

This directory stores one durable receipt per completed or attempted Decision Content Flywheel cycle.

Use `npm run loop:record` after a major cycle to record:

- Target slug and route.
- Changed files.
- Verification commands and route QA result.
- Failures found and fixed.
- Residual risks.
- Next recommended cluster or action.

These records are supporting evidence. `.agent/CURRENT_STATUS.md` remains the first source for current state, and `.agent/PLANS.md` remains the active-work source.
