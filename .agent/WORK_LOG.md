# AiPedia Work Log

### 2026-06-30: Agentic Tooling Meta OS Slice 05

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `agent-os-absolute-meta-2026-06-30`.
- Changed: Standardized closeout identity fields across system loop receipts and Rust runner tool-refresh/page-refresh receipts. `loop:all:record` now accepts explicit `--goal-id`, `--run-id`, repeatable `--risk`, and repeatable `--next-action`; runner closeouts read matching `AIPEDIA_*` environment values; `agent:closeout:check --require-closeout-identity` validates the contract.
- Verification: `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml`; `node --check scripts/aipedia-loops.mjs`; `node --check scripts/agent-closeout-receipt-check.mjs`; `node --test tests/scripts/aipedia-loops.test.mjs tests/scripts/agent-closeout-receipt-check.test.mjs`; `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run check:smart -- --path scripts/aipedia-loops.mjs --path scripts/agent-closeout-receipt-check.mjs --path tools/aipedia-runner/src/main.rs --path tests/scripts/aipedia-loops.test.mjs --path tests/scripts/agent-closeout-receipt-check.test.mjs --path docs/agentic-tooling-meta-compliance.md --json`; `npm run test:scripts`; `npm run audit:commands`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm --silent run loop:system -- --json`; `npm --silent run loop:all:record -- --goal-id 2026-06-30-agentic-tooling-meta-os --run-id 2026-06-30-slice-05-closeout --risk "Built output loops remain attention until build:fast refreshes dist-fast/client." --next-action "Extend stale-input policy to page/tool/affiliate planners." --require-system-progress --json`; `npm --silent run agent:closeout:check -- --receipt .agent/loop-runs/system/latest.json --require-system-progress --require-closeout-identity --json`; `npm run check:quick`; `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`.
- Loop result: Focused Node tests pass 16/16. Rust runner unit tests pass 9/9. Full `test:scripts` and `check:quick` pass 470/470 tests. Enforced receipt `.agent/loop-runs/system/2026-06-30T03-29-21-712Z-loop-run.json` records explicit closeout identity and validates with 0 issues. Broad loop status is 4 ok, 3 attention, 0 skipped because built output is stale and freshness has 49 due-now items.
- Next: Extend stale-input gates to page/tool/affiliate planners.

### 2026-06-30: Agentic Tooling Meta OS Slice 04

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `agent-os-absolute-meta-2026-06-30`.
- Changed: Extended Rust runner tool-refresh and page-refresh closeout JSON with optional `system_progress` from `agent-system-progress-check.mjs`, normalized the embedded project dir and command string, and tightened `agent:closeout:check` so runner receipts validate `system_progress` when present.
- Verification: `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`; `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `node --check scripts/agent-closeout-receipt-check.mjs`; `node --test tests/scripts/agent-closeout-receipt-check.test.mjs`.
- Loop result: Rust runner unit tests pass 9/9. Closeout receipt validator focused tests pass 4/4.
- Next: Add goal_id, run_id, residual-risk, and next-action fields to closeout receipts.

### 2026-06-30: Agentic Tooling Meta OS Slice 03

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `agent-os-absolute-meta-2026-06-30`.
- Changed: Added `agent:closeout:check`, a deterministic closeout receipt validator for system loop receipts and Rust runner `aipedia.closeout-receipt.v1` JSON. The validator can require enforced `system_progress` for June 30 meta-goal closeouts.
- Verification: `node --check scripts/agent-closeout-receipt-check.mjs`; `node --test tests/scripts/agent-closeout-receipt-check.test.mjs`; `npm --silent run agent:closeout:check -- --receipt .agent/loop-runs/system/2026-06-30T03-01-47-100Z-loop-run.json --require-system-progress --json`; `npm --silent run agent:closeout:check -- --all-system --json`.
- Loop result: `--all-system` validated 22 system receipts with 22 ok, 0 failed, and 0 issues.
- Next: Extend system-progress fields into Rust runner closeouts, then add goal_id, run_id, residual-risk, and next-action fields.

### 2026-06-30: Agentic Tooling Meta OS Slice 02

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `agent-os-absolute-meta-2026-06-30`.
- Changed: Wired `agent:system-progress` into `loop:all:record` receipts and added `--require-system-progress` so content-only diffs cannot be recorded as operating-system progress for the June 30 meta goal. Updated loop docs and compliance docs.
- Verification: `node --check scripts/aipedia-loops.mjs`; `node --test tests/scripts/aipedia-loops.test.mjs tests/scripts/agent-system-progress-check.test.mjs`; `npm --silent run loop:all:record -- --require-system-progress --json`.
- Loop result: Enforced loop receipt `.agent/loop-runs/system/2026-06-30T03-01-47-100Z-loop-run.json` reports 4 ok, 3 attention, 0 skipped, and a passing `system_progress` block. The attention items are stale built output for performance and revenue loops plus 49 due-now freshness items.
- Next: Add closeout receipt schema validation and extend system-progress fields to Rust runner closeouts.

### 2026-06-30: Agentic Tooling Meta OS Slice 01

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `agent-os-absolute-meta-2026-06-30`.
- Changed: Started the June 30 meta operating-system goal as system work, not content work. Added stale backlog enforcement to `loop:next`, a system-progress checkpoint that rejects content-only progress claims, durable pause/resume receipt generation, compliance docs, a docs allowlist entry for the compliance spec, and focused tests. Kept the pre-existing Captions/Synthesia content WIP out of scope.
- Verification: `node --check scripts/decision-loop.mjs`; `node --check scripts/agent-system-progress-check.mjs`; `node --check scripts/agent-pause-receipt.mjs`; `node --test tests/scripts/decision-loop.test.mjs tests/scripts/agent-system-progress-check.test.mjs tests/scripts/agent-pause-receipt.test.mjs`; `npm run audit:commands`; `npm run test:scripts`; `npm --silent run loop:next -- --fail-on-stale-backlog --json`; dry-run `npm run agent:pause-receipt`; `npm run check:quick`; `npm run check:smart` scoped to changed system files; `git diff --check`; `node scripts/guard-em-dashes.mjs`; `npm --silent run loop:system -- --json`; `npm --silent run loop:all -- --json`.
- Loop result: `loop:system` is valid JSON and ok. `loop:all` is ok overall with 4 ok and 3 attention; performance and revenue loops need a fresh `build:fast` before their built-output checks can be trusted, and freshness reports 49 due-now items. Those attention items are carried forward as operating inputs, not blockers for this system slice.
- Next: Commit and push slice 01, then continue with closeout receipt schema validation and wiring `agent:system-progress` into loop or runner closeout receipts.

### 2026-06-29: Captions.ai vs HeyGen Decision Loop

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `master`.
- Changed: Continued the all-night agent-system loop with the next decision-content recommendation. Added `/compare/captions-vs-heygen/`, refreshed Captions.ai, HeyGen, AI Video, compare/tools/categories top-layer notes, LLM surfaces, source-registry dates, and `PAGE_REFRESH_LEDGER.md`. The loop verified the buyer split between short-form social editing and business presenter video, kept Captions rollover conflict visible, and avoided a low-context registry patch after inspection showed why source-registry edits need source-ID context.
- Verification: `npm --silent run agent:evidence -- --route /compare/captions-vs-heygen/ --current-date 2026-06-29 --json`; `npm --silent run agent:score -- --route /compare/captions-vs-heygen/ --current-date 2026-06-29 --json`; `npm --silent run agent:impact -- --route /compare/captions-vs-heygen/ --json`; `npm run check:frontmatter -- --changed`; `AIPEDIA_CURRENT_DATE=2026-06-29 npm run audit:coverage-quality:changed -- --changed-file src/content/comparisons/captions-vs-heygen.md --json`; selected live `npm run audit:sources` with 17 selected Captions/HeyGen source IDs, all 17 HTTP 200 and 0 unreachable; `npm --silent run runner:agent-plan -- --route /compare/captions-vs-heygen/ --current-date 2026-06-29 --out local/tmp/agent-system-loop/captions-vs-heygen-agent-plan.json`; `npm run ledger:pages` and `npm run ledger:pages:check` after the known two-pass wobble; `npm run audit:provenance:changed -- --json`; `npm run check:links`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run guard:check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /compare/captions-vs-heygen/ --route /categories/ai-video/ --route /tools/captions/ --route /tools/heygen/ --route /compare/ --route /tools/ --route /categories/ --timing-file local/tmp/agent-system-loop/captions-vs-heygen-route-qa-timing.json`; `npm --silent run agent:memory:record -- --route /compare/captions-vs-heygen/ --route /tools/captions/ --route /tools/heygen/ --current-date 2026-06-29 --out local/tmp/agent-system-loop/captions-vs-heygen-memory.jsonl --json`; `npm --silent run loop:all:record -- --json`.
- Loop result: The new comparison scores 0.88 with thirteen official inline sources and monitor action. Fresh loop receipt `.agent/loop-runs/system/2026-06-29T10-54-53-659Z-loop-run.json` reports 7 ok, 0 attention, and 0 skipped. Fresh next recommendations are `captions-vs-synthesia` for decision content and BLACKBOX AI `best_paid_tier` freshness.
- Next: Commit and push this twelfth loop, then continue the all-night goal with `captions-vs-synthesia` unless the next loop receipt changes the ranking.

### 2026-06-29: BLACKBOX AI vs Replit Agent Decision Loop

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `master`.
- Changed: Continued the all-night agent-system loop with the next decision-content recommendation. Added `/compare/blackbox-ai-vs-replit-agent/`, refreshed BLACKBOX AI, Replit Agent, AI Coding, compare/tools/categories top-layer notes, LLM surfaces, source-registry dates, and `PAGE_REFRESH_LEDGER.md`. The loop also caught a stale Replit Pro annual price in local content: live official Replit pricing shows Pro at $100 monthly or $95/month billed annually, so the Replit tool page and new comparison now use $95 instead of the stale $90 value. A live source audit also kept the new comparison away from older BLACKBOX docs/security rows that were returning 404, while new BLACKBOX pricing, API, CLI, remote-agent, and blog rows returned HTTP 200.
- Verification: `npm --silent run agent:evidence -- --route /compare/blackbox-ai-vs-replit-agent/ --current-date 2026-06-29 --json`; `npm --silent run agent:score -- --route /compare/blackbox-ai-vs-replit-agent/ --current-date 2026-06-29 --json`; `npm --silent run agent:impact -- --route /compare/blackbox-ai-vs-replit-agent/ --json`; `npm run check:frontmatter -- --changed`; `AIPEDIA_CURRENT_DATE=2026-06-29 npm run audit:coverage-quality:changed -- --changed-file src/content/comparisons/blackbox-ai-vs-replit-agent.md --json`; selected live `npm run audit:sources` with 18 selected source IDs, all 18 HTTP 200 and 0 unreachable; `npm --silent run runner:agent-plan -- --route /compare/blackbox-ai-vs-replit-agent/ --current-date 2026-06-29 --out local/tmp/agent-system-loop/blackbox-ai-vs-replit-agent-agent-plan.json`; `npm run ledger:pages`; `npm run ledger:pages:check`; `npm run audit:provenance:changed -- --json`; `npm run check:links`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run guard:check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /compare/blackbox-ai-vs-replit-agent/ --route /categories/ai-coding/ --route /tools/blackbox-ai/ --route /tools/replit-agent/ --route /compare/ --route /tools/ --route /categories/ --timing-file local/tmp/agent-system-loop/blackbox-ai-vs-replit-agent-route-qa-timing.json`; `npm --silent run agent:memory:record -- --route /compare/blackbox-ai-vs-replit-agent/ --route /tools/blackbox-ai/ --route /tools/replit-agent/ --current-date 2026-06-29 --out local/tmp/agent-system-loop/blackbox-ai-vs-replit-agent-memory.jsonl --json`; `npm --silent run loop:all:record -- --json`.
- Loop result: The new comparison scores 0.87 with thirteen official inline sources and monitor action. Fresh loop receipt `.agent/loop-runs/system/2026-06-29T09-56-32-850Z-loop-run.json` reports 7 ok, 0 attention, and 0 skipped. Fresh next recommendations are `boomy-vs-suno` for decision content and BLACKBOX AI `best_paid_tier` freshness.
- Next: Commit and push this eighth loop, then continue the all-night goal with `boomy-vs-suno` unless the next loop receipt changes the ranking.

### 2026-06-29: Argil vs Synthesia Decision Loop

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `master`.
- Changed: Continued the all-night agent-system loop with the next decision-content recommendation. Added `/compare/argil-vs-synthesia/`, refreshed Argil, Synthesia, AI Video, compare/tools/categories top-layer notes, LLM surfaces, source-registry dates, and `PAGE_REFRESH_LEDGER.md`. The loop again exposed the ledger generator's two-pass wobble: the first check after generation reported drift, the second generation and check passed.
- Verification: `npm --silent run agent:evidence -- --route /compare/argil-vs-synthesia/ --current-date 2026-06-29 --json`; `npm --silent run agent:score -- --route /compare/argil-vs-synthesia/ --current-date 2026-06-29 --json`; `npm --silent run agent:impact -- --route /compare/argil-vs-synthesia/ --json`; `npm run check:frontmatter -- --changed`; `AIPEDIA_CURRENT_DATE=2026-06-29 npm run audit:coverage-quality:changed -- --changed-file src/content/comparisons/argil-vs-synthesia.md --json`; selected live `npm run audit:sources`; `npm --silent run runner:agent-plan -- --route /compare/argil-vs-synthesia/ --current-date 2026-06-29 --out local/tmp/agent-system-loop/argil-vs-synthesia-agent-plan.json`; `npm run ledger:pages`; `npm run ledger:pages:check`; `npm run audit:provenance:changed -- --json`; `npm run check:links`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run guard:check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /compare/argil-vs-synthesia/ --route /categories/ai-video/ --route /tools/argil/ --route /tools/synthesia/ --route /compare/ --route /tools/ --route /categories/ --timing-file local/tmp/agent-system-loop/argil-vs-synthesia-route-qa-timing.json`; `npm --silent run agent:memory:record -- --route /compare/argil-vs-synthesia/ --route /tools/argil/ --route /tools/synthesia/ --current-date 2026-06-29 --out local/tmp/agent-system-loop/argil-vs-synthesia-memory.jsonl --json`; `npm --silent run loop:all:record -- --json`.
- Loop result: The new comparison scores 0.90 with ten official inline sources and monitor action. Fresh loop receipt `.agent/loop-runs/system/2026-06-29T09-38-53-760Z-loop-run.json` reports 7 ok, 0 attention, and 0 skipped. Fresh next recommendations are `blackbox-ai-vs-replit-agent` for decision content and Cline `best_for` freshness.
- Next: Commit and push this seventh loop, then continue the all-night goal with `blackbox-ai-vs-replit-agent` unless the next loop receipt changes the ranking.

### 2026-06-29: Argil vs HeyGen Decision Loop

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `master`.
- Changed: Continued the all-night agent-system loop with the next decision-content recommendation. Added `/compare/argil-vs-heygen/`, refreshed Argil, HeyGen, AI Video, compare/tools/categories top-layer notes, LLM surfaces, source-registry dates, and `PAGE_REFRESH_LEDGER.md`. The loop also repaired older visible AI Video source-date registry drift surfaced by `audit:date-consistency`, and the ledger generator needed the known second pass before its check became current.
- Verification: `npm --silent run agent:evidence -- --route /compare/argil-vs-heygen/ --current-date 2026-06-29 --json`; `npm --silent run agent:score -- --route /compare/argil-vs-heygen/ --current-date 2026-06-29 --json`; `npm --silent run agent:impact -- --route /compare/argil-vs-heygen/ --json`; `npm --silent run runner:agent-plan -- --route /compare/argil-vs-heygen/ --current-date 2026-06-29 --out local/tmp/agent-system-loop/argil-vs-heygen-agent-plan.json`; `npm run check:frontmatter -- --changed`; `AIPEDIA_CURRENT_DATE=2026-06-29 npm run audit:coverage-quality:changed -- --changed-file src/content/comparisons/argil-vs-heygen.md --json`; `npm run ledger:pages && npm run ledger:pages:check`; selected live `npm run audit:sources`; `npm run audit:provenance:changed -- --json`; `npm run check:links`; `node scripts/guard-em-dashes.mjs && git diff --check`; `npm run guard:check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /compare/argil-vs-heygen/ --route /categories/ai-video/ --route /tools/argil/ --route /tools/heygen/ --route /compare/ --route /tools/ --route /categories/ --timing-file local/tmp/agent-system-loop/argil-vs-heygen-route-qa-timing.json`; `npm --silent run agent:memory:record -- --route /compare/argil-vs-heygen/ --route /tools/argil/ --route /tools/heygen/ --current-date 2026-06-29 --out local/tmp/agent-system-loop/argil-vs-heygen-memory.jsonl --json`; `npm --silent run loop:all:record -- --json`.
- Loop result: The new comparison scores 0.90 with ten official inline sources and monitor action. Fresh loop receipt `.agent/loop-runs/system/2026-06-29T09-28-49-543Z-loop-run.json` reports 7 ok, 0 attention, and 0 skipped. Fresh next recommendations are `argil-vs-synthesia` for decision content and Cline `best_for` freshness.
- Next: Commit and push this sixth loop, then continue the all-night goal with `argil-vs-synthesia` unless the next loop receipt changes the ranking.

### 2026-06-29: Antigravity vs Cursor Decision Loop

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `master`.
- Changed: Continued the all-night agent-system loop with the next real decision-content recommendation. Added `/compare/antigravity-vs-cursor/`, refreshed Antigravity, Cursor, AI Coding, compare/tools/categories top-layer notes, LLM surfaces, source-registry dates, and `PAGE_REFRESH_LEDGER.md`. The loop also proved the fixed `audit:coverage-quality:changed -- --changed-file ...` wrapper on a second real comparison and repaired the shared `aipedia-news` source-registry date that the changed Antigravity page exposed.
- Verification: `npm --silent run agent:evidence -- --route /compare/antigravity-vs-cursor/ --current-date 2026-06-29 --json`; `npm --silent run agent:score -- --route /compare/antigravity-vs-cursor/ --current-date 2026-06-29 --json`; `npm --silent run agent:impact -- --route /compare/antigravity-vs-cursor/ --json`; `npm --silent run runner:agent-plan -- --route /compare/antigravity-vs-cursor/ --current-date 2026-06-29 --out local/tmp/agent-system-loop/antigravity-vs-cursor-agent-plan.json`; `npm run check:frontmatter -- --changed`; `AIPEDIA_CURRENT_DATE=2026-06-29 npm run audit:coverage-quality:changed -- --changed-file src/content/comparisons/antigravity-vs-cursor.md --json`; `npm run ledger:pages:check`; selected live `npm run audit:sources`; `npm run audit:provenance:changed -- --json`; `npm run check:links`; `node scripts/guard-em-dashes.mjs && git diff --check`; `npm run guard:check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /compare/antigravity-vs-cursor/ --route /categories/ai-coding/ --route /tools/antigravity/ --route /tools/cursor/ --route /compare/ --route /tools/ --route /categories/ --timing-file local/tmp/agent-system-loop/antigravity-vs-cursor-route-qa-timing.json`; `npm --silent run agent:memory:record -- --route /compare/antigravity-vs-cursor/ --route /tools/antigravity/ --route /tools/cursor/ --current-date 2026-06-29 --out local/tmp/agent-system-loop/antigravity-vs-cursor-memory.jsonl --json`; `npm --silent run loop:all:record -- --json`.
- Loop result: The new comparison scores 0.86 with nine official inline sources and monitor action. Fresh loop receipt `.agent/loop-runs/system/2026-06-29T09-18-34-592Z-loop-run.json` reports 7 ok, 0 attention, and 0 skipped. Fresh next recommendations are `argil-vs-heygen` for decision content and Cline `best_for` freshness.
- Next: Commit and push this fifth loop, then continue the all-night goal with `argil-vs-heygen` unless the next loop receipt changes the ranking.

### 2026-06-29: Coverage Quality Wrapper Hardening

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `master`.
- Changed: Fixed the `audit:coverage-quality:changed` npm wrapper so operators can append `--changed-file <comparison.md>` without tripping the script's target-mode guard. The script now treats appended `--changed-file` paths as a narrower changed-mode target, which matches the way npm appends arguments to package scripts.
- Verification: `node --check scripts/audit-coverage-quality.mjs`; `npm exec --yes --package=node@24 -- node --test tests/scripts/audit-coverage-quality.test.mjs`; `AIPEDIA_CURRENT_DATE=2026-06-29 npm run audit:coverage-quality:changed -- --changed-file src/content/comparisons/amazon-q-vs-github-copilot.md --json`; `git diff --check`; `npm run audit:commands`; `npm run check:quick`; `npm --silent run loop:all:record -- --json`.
- Loop result: Fresh receipt `.agent/loop-runs/system/2026-06-29T09-06-39-881Z-loop-run.json` reports 7 ok, 0 attention, and 0 skipped. Next recommendations remain `antigravity-vs-cursor` and Beehiiv `mcp_surface`.
- Next: Commit and push this wrapper hardening, then continue the all-night loop with the next recommendation.

### 2026-06-29: Agent Decision Loop And Comparison Source Scoring

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `master`.
- Changed: Continued the all-night agent-system loop by taking the `loop:next` recommendation into a real production comparison route. Added `/compare/amazon-q-vs-github-copilot/`, refreshed the Amazon Q, GitHub Copilot, and AI Coding surfaces that route buyers into it, updated the source registry and ledger, and hardened `agent:evidence` so comparison pages count visible `## Sources` links instead of incorrectly reporting zero source coverage.
- Verification: `npm --silent run loop:next -- --json`; real evidence and score checks for `/tools/amazon-q/`, `/tools/github-copilot/`, and `/compare/amazon-q-vs-github-copilot/`; `npm run check:frontmatter -- --changed`; `AIPEDIA_CURRENT_DATE=2026-06-29 node scripts/audit-coverage-quality.mjs --changed-file src/content/comparisons/amazon-q-vs-github-copilot.md --json`; `npm run ledger:pages && npm run ledger:pages:check`; `node --check scripts/agent-evidence-bundle.mjs`; `npm exec --yes --package=node@24 -- node --test tests/scripts/agent-workflow-tools.test.mjs tests/scripts/agent-memory-tools.test.mjs`; selected live `npm run audit:sources`; `npm run audit:provenance:changed -- --json`; `npm run check:links`; `npm run guard:check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /compare/amazon-q-vs-github-copilot/ --route /categories/ai-coding/ --route /tools/amazon-q/ --route /tools/github-copilot/ --route /compare/ --route /tools/ --route /categories/`; `npm --silent run agent:memory:record -- --route /compare/amazon-q-vs-github-copilot/ --route /tools/amazon-q/ --route /tools/github-copilot/ --current-date 2026-06-29 --out local/tmp/agent-system-loop/amazon-q-vs-copilot-memory.jsonl --json`; `git diff --check`; `npm run check:quick`; `npm --silent run loop:all:record -- --json`.
- Loop result: The new comparison now scores 0.85 with six inline official sources and monitor action. Fresh loop receipt `.agent/loop-runs/system/2026-06-29T09-03-31-885Z-loop-run.json` reports 7 ok, 0 attention, and 0 skipped. The loop exposed one remaining workflow-paper-cut: `audit:coverage-quality:changed -- --changed-file ...` expands to conflicting target-mode flags, so the direct `node scripts/audit-coverage-quality.mjs --changed-file ...` invocation was used.
- Next: Commit and push this third loop, then continue with either the next decision-content recommendation, `antigravity-vs-cursor`, or Beehiiv's due `mcp_surface` freshness fact.

### 2026-06-29: Agent Loop Calibration And JSON Command Cleanup

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `master`.
- Changed: Continued the all-night agent-system loop after the news pilot commit. Fixed `agent:score:calibrate` so inline news sources count as source coverage, while registered source IDs and inline URLs remain separate fields. Added regression coverage for inline-sourced news calibration, updated canonical loop-review docs to use `npm --silent run ... -- --json` for machine-readable output, and recorded a fresh broad loop-run receipt at `.agent/loop-runs/system/2026-06-29T08-46-45-787Z-loop-run.json`.
- Verification: `node --check scripts/agent-score-calibration.mjs`; `npm exec --yes --package=node@24 -- node --test tests/scripts/agent-memory-tools.test.mjs tests/scripts/agent-workflow-tools.test.mjs`; real news calibration for the three June 29 articles now reports 3 to 4 inline sources and no false `source_coverage_gap`; `npm --silent run loop:all -- --json`; `npm --silent run loop:all:record -- --json`; `git diff --check`; `npm run check:quick`.
- Loop result: broad loop review is green with 7 ok, 0 attention, 0 skipped, and 16 commands. Current recommendations remain `amazon-q-vs-github-copilot` for decision content and Beehiiv `mcp_surface` freshness.
- Next: Commit and push this second loop, then continue the overnight system loop by either exercising the recommendation path on a real decision-content route or hardening the next agent-tool friction point found during that run.

### 2026-06-29: Agent System Loop Pilot And June 29 News Refresh

- Status: Verified locally, pending commit and push.
- Commit: this commit.
- Branch: `master`.
- Changed: Ran the new Codex workflow tools on `/news/`, `/`, and three June 29 news routes as a live operating-system pilot. Published source-backed coverage for the Google AI Studio Gemini API-key incident, OpenAI and HP Frontier enterprise rollout, and Grok 4.5 private beta benchmark caution. Regenerated cumulative news OG assets, refreshed `/news/`, homepage news rail, RSS, LLM surfaces, and ledger rows. Hardened the agent tools so static hub impact detection stays focused, content routes missing from `PAGE_REFRESH_LEDGER.md` resolve from collection files, inline news sources count in evidence, scoring, and memory, and news buyer-intent scoring matches the daily news workflow.
- Verification: `npm --silent run agent:evidence -- --route /news/ --current-date 2026-06-29 --json`; `npm --silent run agent:impact -- --route /news/ --json`; `npm --silent run agent:score -- --route /news/ --current-date 2026-06-29 --json`; `npm --silent run runner:agent-plan -- --route /news/ --current-date 2026-06-29 --out local/tmp/agent-system-loop/news-agent-plan-before.json`; `npm run ledger:pages && npm run ledger:pages:check`; `node scripts/generate-og-news.mjs 2026-06-26-openai-gpt-56-sol-preview-access-risk 2026-06-26-newegg-ai-shopping-mode 2026-06-26-gemini-sheets-formula-fixes 2026-06-27-claude-mythos-fable-access-risk 2026-06-27-sail-research-agent-inference-costs 2026-06-28-gpt-56-sol-cheating-benchmark-risk 2026-06-28-claude-opus-47-fast-mode-deadline 2026-06-28-veo-vertex-ai-endpoint-deadline 2026-06-29-google-ai-studio-gemini-api-key-incident 2026-06-29-openai-hp-frontier-enterprise-rollout 2026-06-29-grok-45-private-beta-benchmark-caution --check --json`; `npm exec --yes --package=node@24 -- node --test tests/scripts/agent-workflow-tools.test.mjs tests/scripts/agent-memory-tools.test.mjs`; `node scripts/audit-news-rendering.mjs --json`; `npm run check:news`; `npm run check:links`; `git diff --check`; `npm run guard:check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /news/ --route / --route /news/2026-06-29-google-ai-studio-gemini-api-key-incident/ --route /news/2026-06-29-openai-hp-frontier-enterprise-rollout/ --route /news/2026-06-29-grok-45-private-beta-benchmark-caution/ --timing-file local/tmp/agent-system-loop/june-29-news-route-qa-timing-final.json`.
- Source caveats: The Google AI Studio status surface is dynamic, so the raw HTML did not expose the incident text even though the live status result did; official Gemini API docs verified the affected OpenAI-compatible and API-key context. OpenAI and xAI official pages returned raw HTTP 403 from the runner but were treated as official access-sensitive sources, with HP, X, and secondary reporting used where needed.
- Next: Commit and push this first loop, then continue the all-night goal by running another system pass against the agent loop outputs and improving the next friction point.

### 2026-06-29: Codex Workflow Refactor Merged To Master

- Status: Complete, verified, and merged to `master`.
- Commit: `0ff8fb6a`.
- Branch: `master`.
- Changed: Fast-forward merged `agent-workflow-refactor-codex` into `master`, bringing in the central `AGENTS.md`, operating docs, skill packs, evidence/impact/score CLIs, JSONL memory baseline, CPU lexical vector query, score calibration, and Rust `runner:agent-plan` task-DAG contract. Updated `.agent` continuity docs so daily news is the next priority and CuPy remains deferred until measured CPU retrieval, rerank, or dedupe hotspots justify it.
- Verification: previous branch closeout passed `npm run check:quick`, focused agent tests, Rust fmt/check/test, command audit, em-dash guard, and diff checks. Merge follow-up requires no rendered build because public routes, content facts, templates, metadata, schemas, and affiliate surfaces were unchanged.
- Residual risks: Generic Rust DAG execution, SQLite/vector storage, browser QA integration, live source verification, CuPy, CUDA, Triton, Faiss, and cuVS remain future work.

### 2026-06-29: Agent Memory, Calibration, And Rust DAG Contract

- Status: Complete, verified, and pushed on `agent-workflow-refactor-codex`; merged to `master`.
- Commit: `e46839f9` and `0ff8fb6a`.
- Branch: `agent-workflow-refactor-codex`.
- Changed: Added `agent:memory:record`, `agent:memory:query`, and `agent:score:calibrate`, plus `scripts/lib/agent-cpu-vector.mjs` for CPU-only lexical vectors. Added `.agent/memory/` schema docs, a committed Cursor/Gemini-vs-Grok JSONL baseline, real-route calibration behavior, static Astro route scoring support, and `runner:agent-plan` in the Rust runner to write a task-DAG contract around evidence, impact, score, and memory recording. Updated docs to use `npm --silent run` for machine-readable JSON. CuPy remains deferred until CPU retrieval, rerank, or dedupe metrics justify a warm GPU service.
- Verification so far: `node --check scripts/lib/agent-workflow-utils.mjs`; `node --check scripts/lib/agent-cpu-vector.mjs`; `node --check scripts/agent-memory-record.mjs`; `node --check scripts/agent-memory-query.mjs`; `node --check scripts/agent-score-calibration.mjs`; `node --check scripts/agent-page-quality-score.mjs`; `npm exec --yes --package=node@24 -- node --test tests/scripts/agent-workflow-tools.test.mjs tests/scripts/agent-memory-tools.test.mjs`; `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`; real-route smoke checks for static answer scoring, memory record/query, score calibration, and `runner:agent-plan`.
- Residual risks: The memory layer is JSONL plus CPU lexical vectors only. No SQLite/vector database, generic Rust DAG execution, live source verification, browser QA, CuPy, CUDA, Triton, Faiss, or cuVS implementation exists yet.

### 2026-06-29: Evidence, Impact, And Scoring Agent CLIs

- Status: Complete, verified, pushed on `agent-workflow-refactor-codex`, and merged to `master`.
- Commit: `e5c7be24`.
- Branch: `agent-workflow-refactor-codex`.
- Changed: Added `agent:evidence`, `agent:impact`, and `agent:score` read-only CLIs plus shared `scripts/lib/agent-workflow-utils.mjs`. Added fixture tests for evidence bundles, parent-surface detection, quality scoring, and CLI JSON output. Updated operating docs to make the new CLIs the deterministic handoff layer before Codex synthesis.
- Verification: `node --check scripts/lib/agent-workflow-utils.mjs`; `node --check scripts/agent-evidence-bundle.mjs`; `node --check scripts/agent-parent-impact.mjs`; `node --check scripts/agent-page-quality-score.mjs`; `npm exec --yes --package=node@24 -- node --test tests/scripts/agent-workflow-tools.test.mjs`; `npm run agent:evidence -- --route /tools/cursor/ --current-date 2026-06-29 --json`; `npm run agent:impact -- --route /tools/cursor/ --json`; `npm run agent:score -- --route /tools/cursor/ --current-date 2026-06-29 --json`; `npm run audit:commands`; `npm run check:quick`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: The score is a v1 read-only prioritization signal. It does not perform live web verification, rendered layout QA, or subjective editorial review.

### 2026-06-29: Codex Operating System Refactor

- Status: Complete, verified, committed, and pushed on `agent-workflow-refactor-codex`.
- Commit: `cd24fe19`.
- Branch: `agent-workflow-refactor-codex`.
- Changed: Promoted root `AGENTS.md` into the committed Codex entrypoint, added architecture audit and operating docs, added canonical workflow, task-template, report-format, memory, scoring, parallel-tooling, and future Rust/CuPy roadmap docs, added twelve reusable skills with schemas and examples, and added `agent:workflow:map` plus `agent:skills:check` helper scripts. Narrowed `.gitignore` so only the requested canonical docs and root `AGENTS.md` are unignored.
- Verification: `node --check scripts/agent-workflow-map.mjs`; `node --check scripts/check-agent-skills.mjs`; `npm run agent:skills:check`; `npm run agent:workflow:map -- --json`; `npm run audit:commands`; `node scripts/guard-em-dashes.mjs`; `npm run check:quick`.
- Residual risks: Root `AGENTS.md` was previously local-only, so maintainers should confirm the branch-level decision to commit it. Skills validate structure, not editorial quality. Memory and GPU docs are architecture plans, not implementations.

### 2026-06-28: Workflow Closeout Guard Hardening

- Status: Verified locally.
- Commit: this commit.
- Branch: `master`.
- Changed: Strengthened Rust runner JSON receipts so superseded failed closeout receipts now record the passing receipt path, failed command, failed status, and failed elapsed time. Strengthened `audit:date-consistency` so visible markdown source links with verification dates are checked against matching source-registry `last_checked` rows, catching the body-source drift that frontmatter-only checks miss. Updated workflow docs and added a durable run receipt.
- Verification: `npm exec --yes --package=node@24 -- node --test tests/scripts/audit-date-consistency.test.mjs tests/scripts/page-source-health.test.mjs`; `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`.
- Residual risks: This hardens receipt metadata and visible-source date checking. It does not add a separate repository-wide closeout-receipt audit command yet.

### 2026-06-28: PageAgent Buyer-Journey QA Harness

- Status: Verified locally.
- Commit: pending.
- Branch: `master`.
- Changed: Added `npm run qa:agent`, a local-only Playwright QA harness for buyer-decision, commercial CTA, and layout-consistency journeys. Deterministic mode records route, viewport, timing, resource, overflow, CTA tracking, affiliate disclosure, and journey pass/fail metrics. Optional PageAgent mode injects the browser bundle through the local static server and proxies OpenAI-compatible LLM calls so API keys stay out of browser reports.
- Verification: `node --check scripts/qa-agent.mjs`; `npm exec --yes --package=node@24 -- node --test tests/scripts/qa-agent.test.mjs`; `git diff --check`; `npm run test:scripts`; `npm run audit:commands`; `npm run ledger:pages:check`; `npm run guard:check`; `npm run audit:facts`; `npm run audit:sources`; `npm run audit:provenance`; `npm run check:links`; `npm run check:news`; `npm run check:security`; `npm run build:fast`; `npm run qa:agent -- --site-dir dist-fast/client --concurrency 2 --widths 390,1024 --route /tools/cloudtalk/ --route /guides/cloudtalk-pricing-for-smb-sales-and-support-teams/ --route /guides/best-ai-receptionist-for-smb-phone-teams/ --out local/tmp/qa-agent-cloudtalk-baseline.json`.
- Residual risks: Live PageAgent LLM mode still needs a compatible endpoint and model configuration before token and action metrics can be captured in a real run. Deterministic mode is ready for routine local route checks.

### 2026-06-28: Site-Wide Design Consistency Radius Pass

- Status: Verified locally.
- Commit: pending.
- Branch: `master`.
- Changed: Aligned the shared god-tier radius bridge with the root `DESIGN.md` contract by mapping `--gt-radius` to canonical panel radius, `--gt-radius-sm` to canonical card radius, and `--gt-radius-pill` to canonical pill radius. Added design-token test coverage so scoped token files cannot drift back to literal radius values.
- Verification: `npm run design:lint`; `npm exec --yes --package=node@24 -- node --test tests/scripts/design-tokens.test.mjs tests/scripts/check-smart.test.mjs`; `git diff --check`; changed-file dash scan; `npm run --silent check:smart -- --json`; `npm run test:scripts`; `npm run audit:commands`; `npm run ledger:pages:check`; `npm run guard:check`; `npm run audit:facts`; `npm run audit:sources`; `npm run audit:provenance`; `npm run check:links`; `npm run check:news`; `npm run smoke:api`; `npm run audit:generated-models`; `npm run build:fast`; `npm run smoke:visual`; `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /categories/ai-automation/ --route /categories/ai-voice/ --route /tools/cloudtalk/ --route /tools/minimax/ --route / --route /tools/ --route /categories/`; `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --allow-noindex --widths 319,360,390,430,768,1024,1366 --route /search/`.
- Residual risks: This was a token-level consistency repair, not a full page-by-page visual redesign. The initial route QA command intentionally failed on `/search/` because that route is noindex; it passed when rerun with `--allow-noindex`.

### 2026-06-28: CloudTalk Affiliate Cluster and Schema Accuracy Pass

- Status: Verified locally, pending push.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `/guides/cloudtalk-pricing-for-smb-sales-and-support-teams/` and `/guides/best-ai-receptionist-for-smb-phone-teams/`. Refreshed the CloudTalk tool page, SMB phone-system guide, AI Automation, AI Voice, homepage, LLM surfaces, source registry, and `PAGE_REFRESH_LEDGER.md`. Fixed the stale MiniMax T2A docs URL caught by page source health. Improved `SoftwareApplicationLD` so mixed-currency or ambiguous pricing emits descriptive offer schema instead of false USD numeric ranges, and so tool JSON-LD `dateModified` cannot trail the page edit date.
- Timing: Final source health checked 270 URLs in 19.15s with 0 broken and 0 unreachable. Final route QA checked 11 routes across 319, 360, 390, 430, 768, 1024, and 1366 px in 15.10s. Final build passed in 19.69s, typecheck in 14.11s, visual smoke in 38.05s, selected live-source audit in 4.65s, strict affiliate audit in 0.65s, guard in 2.10s, and changed provenance in 0.55s.
- Review: Accuracy/SEO and workflow/non-regression subagents found MiniMax date/source-registry drift and CloudTalk mixed-currency schema risk. Both were fixed. Initial page source health failed on the retired MiniMax T2A URL and then passed after repair. An incorrect `audit:tool-quality` invocation without `--file` was superseded by passing per-file checks.
- Verification: `npm run test:scripts`; `npm run guard:check`; `npm run audit:facts`; `npm run --silent audit:sources -- --json`; `npm run --silent audit:provenance -- --json`; `npm run check:links`; `npm run check:news`; `npm run smoke:api`; `npm run check:frontmatter`; `AIPEDIA_CURRENT_DATE=2026-06-28 npm run --silent audit:affiliate-conversion -- --strict --json`; `npm run ledger:pages && npm run ledger:pages:check`; `npm run page:source-health -- --plan local/tmp/cloudtalk-affiliate-cluster/source-health-plan.json --out local/tmp/cloudtalk-affiliate-cluster/page-source-health-after-minimax.json --concurrency 8 --timeout-ms 10000 --domain-delay-ms 150`; `npm run typecheck`; `npm run build:fast`; generated JSON-LD spot checks for CloudTalk and MiniMax; `npm run smoke:visual`; `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/cloudtalk-affiliate-cluster/route-qa-post-review-timing.json ...`; selected live `npm run audit:sources`; `git diff --check`.
- Residual risks: Full provenance still has one inherited non-failing `semrush-demo` high-volatility next-review advisory outside this diff. The CloudTalk cluster advances the affiliate buildout, not the full every-affiliate-tool objective.
- Next: Add a closeout receipt schema that records status, elapsed time, superseded failures, changed routes, source IDs, and widths; add a date-consistency guard for visible source dates, registry `last_checked`, ledger rows, and tool freshness fields; add source-health URL dedupe/cache.

### 2026-06-28: Root DESIGN.md Visual Contract

- Status: Verified locally.
- Commit: this commit.
- Branch: `master`.
- Changed: Added root `DESIGN.md` as the agent-readable AiPedia visual identity and consistency contract. Added pinned `npm run design:lint` using `@google/design.md@0.3.0`, routed `DESIGN.md` through the Phase 3 design-token surface in `check:smart`, and updated the design-token/check-smart tests plus root and agent orientation docs.
- Verification: `npm run design:lint`; `npm exec --yes --package=node@24 -- node --test tests/scripts/design-tokens.test.mjs tests/scripts/check-smart.test.mjs`; `npm run audit:commands`; `npm run --silent check:smart -- --json --path DESIGN.md`; `npm run check:quick`; `npm run build:fast`; `npm run smoke:visual`; `git diff --check`; changed-file em dash scan.
- Residual risks: The Google Labs design.md CLI is still alpha. The repo pins v0.3.0 for linting and keeps local tests around the most important AiPedia contract fields so future CLI drift is not the only guard.

### 2026-06-28: Master Mathematician and Coding Expert Specialist

- Status: Verified locally.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `.agent/specialists/master-mathematician-coding-expert/` as the durable specialist for rigorous code review, workflow review, algorithmic analysis, benchmark hygiene, invariants, and non-regression improvement. Registered it in `INDEX.md`, `.agent/specialists/README.md`, `.agent/CURRENT_STATUS.md`, and `.agent/PROJECT_MAP.md`.
- Verification: `npm run --silent check:smart -- --json`; `npm run test:scripts`; `npm run audit:commands`; `npm run agents:backup:dry-run`; `npm run agents:backup`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: First live review has not happened yet, so the specialist's self-improvement ledger should gain concrete examples after its first code or workflow audit.

### 2026-06-28: Root Project Index and Specialist Agent Folder Cleanup

- Status: Complete locally.
- Commit: this commit.
- Branch: `master`.
- Changed: Added root `INDEX.md` as the LLM-readable project map. Consolidated tracked specialist agents under `.agent/specialists/`, moved the existing workflow-engineer specialist out of the retired `.Agents/` folder, added the new `expert-project-manager` specialist, updated active orientation docs, and repointed `npm run agents:backup` to back up `.agent/specialists/`.
- Folder contract: `.agent/` is tracked project memory and specialists, `.agent/specialists/` is the durable specialist-agent library, `.agents/` is ignored local runtime state, and `.Agents/` is retired.
- Verification: `npm run test:scripts`; `npm run audit:commands`; `npm run --silent check:smart -- --json`; `npm run --silent check:smart -- --json --path INDEX.md`; `npm run --silent check:smart -- --json --path .agent/specialists/agentic-workflow-software-engineer/plans/aipedia-workflow-success-roadmap-2026-06-27.md`; `npm run agents:backup:dry-run`; `npm run agents:backup`; `npm run guard:challenge:check`; `npm run ledger:pages:check`; `npm run guard:check`; `npm run audit:facts`; `npm run --silent audit:sources -- --json`; `npm run --silent audit:provenance -- --json`; `npm run check:links`; `npm run check:news`; `node --check scripts/backup-agents.mjs`; `node --check scripts/audit-command-surface.mjs`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: Historical dated run logs may still mention old paths as history; active instructions were updated to current paths. The local `.agents/` folder remains intentionally gitignored runtime state.

### 2026-06-27: Dext Client Document Collection Workflow Slice

- Status: Verified locally and accepted by accuracy/SEO, affiliate trust, and visual/mobile subagents at 9.9/10, pending final push.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `/guides/best-client-document-collection-tool-for-bookkeeping-firms/` as the fifth distinct first-pass Dext affiliate cluster page. The page targets multi-client bookkeeping firms that need one workflow for client submissions, document extraction, review, approvals, statement handling, and accounting handoff. Updated AI Automation, the Dext tool page, the accountant stack workflow, Dext pricing, Dext vs Hubdoc, Dext vs AutoEntry, the broad receipt-tool guide, and `PAGE_REFRESH_LEDGER.md`.
- Accuracy notes: Dext remains the affiliate best-overall pick only for practice-grade client document collection. Hubdoc is the lighter non-affiliate capture alternative backed by official Hubdoc pricing and QuickBooks pages. AutoEntry is retained as the narrow Sage-heavy credit-style alternative. The page avoids exact AutoEntry pricing and keeps Dext pricing detail in the sibling plan guide.
- Timing: Source health checked 233 source URLs in 21.583s, with 227 ok, 6 access-sensitive, 0 broken, and 0 unreachable. Clean `build:fast` completed in 13.3s after generated `dist-fast` and `.vercel/output` directories were cleaned. Route QA checked 9 routes across 319, 360, 390, 430, 768, 1024, and 1366 px in 15.586s; the new guide took 7.063s cumulative across widths with a 1.017s max single-width check.
- Review: Accuracy/SEO accepted at 9.9/10 after the Hubdoc source fix. Affiliate trust initially rejected at 9.8/10 only because rendered output was missing during a stale partial build state, then accepted at 9.9/10 after clean build and route QA evidence. Visual/mobile accepted at 9.9/10 after additional geometry and screenshot inspection against `dist-fast/client`.
- Verification: `npm run check:frontmatter`; `node scripts/audit-guide-picks.mjs --json`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run --silent audit:affiliate-conversion -- --strict --json`; `npm run ledger:pages && npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run page:source-health -- --plan local/tmp/dext-client-document-source-health-plan.json --out local/tmp/dext-client-document-source-health.json --concurrency 6 --timeout-ms 10000 --domain-delay-ms 150`; `npm run typecheck`; `rm -rf dist-fast .vercel/output && npm run build:fast`; `npm run qa:route -- --route /guides/best-client-document-collection-tool-for-bookkeeping-firms/ --route /guides/dext-pricing-for-bookkeeping-firms/ --route /guides/dext-vs-hubdoc-for-bookkeepers/ --route /guides/dext-vs-autoentry-for-sage-bookkeepers/ --route /guides/best-ai-receipt-tool-for-bookkeepers/ --route /categories/ai-automation/ --route /guides/ --route /tools/dext/ --route /workflows/accountant-stack/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client --concurrency 4 --timing-file local/tmp/dext-client-document-route-qa-timing.json`.
- Residual risks: This completes the first-pass Dext cluster, not the full every-affiliate-tool objective.
- Next: Commit and push after final subagent closeout, then move to the next approved affiliate tool cluster from `npm run affiliate:conversion:inventory`.

### 2026-06-27: Dext vs AutoEntry Sage Bookkeeper Slice

- Status: Verified locally and accepted by visual/mobile and accuracy subagents at 9.9/10.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `/guides/dext-vs-autoentry-for-sage-bookkeepers/` as the third Dext affiliate conversion page. The page targets Sage-heavy bookkeepers choosing between Dext's practice workflow and AutoEntry's Sage-native credit model. Updated the Dext pricing guide, Dext vs Hubdoc guide, receipt-tool guide, AI Automation category hub, Dext tool page, accountant stack workflow, and `PAGE_REFRESH_LEDGER.md`.
- Accuracy notes: Dext remains the affiliate best-overall pick for multi-client review, approvals, client submission, and broader accounting-platform handoff. AutoEntry is presented as an official non-affiliate alternative for Sage-first buyers, credit-style document pricing, and Sage bundle considerations. Exact AutoEntry prices were avoided because public pricing is region-sensitive, while the source-backed credit rules and Sage integration facts were retained.
- Layout repair: Visual/mobile review rejected the first pass because the shared mobile `StickyCTA.astro` styles for the child `CommercialCTA` wrapper, button, and disclosure were scoped away, causing the Dext price line to stack vertically on 319 to 390 px screens. The fix made those selectors global, clamped the sticky info text, hid the price line below 381 px, and reran focused mobile checks.
- Timing: Focused source health checked 225 source URLs in 23.312s, with 219 ok, 6 access-sensitive, 0 broken, and 0 unreachable. Route QA checked 8 routes across 319, 360, 390, 430, 768, 1024, and 1366 px. Targeted Playwright inspection confirmed the sticky CTA stays contained at 319, 360, and 390 px.
- Review: Accuracy/SEO accepted at 9.9/10 after stale Dext terminology, over-broad comparative claims, and brittle pricing/ROI wording were fixed. Visual/mobile accepted at 9.9/10 after the sticky CTA containment fix and Playwright probe.
- Verification: `npm run check:frontmatter`; `node scripts/audit-guide-picks.mjs --json`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run --silent audit:affiliate-conversion -- --strict --json`; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run page:source-health -- --plan local/tmp/dext-vs-autoentry-source-health-plan.json --out local/tmp/dext-vs-autoentry-source-health.json --concurrency 6 --timeout-ms 10000 --domain-delay-ms 150`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/dext-vs-autoentry-route-qa-timing.json --route /guides/dext-vs-autoentry-for-sage-bookkeepers/ --route /guides/dext-pricing-for-bookkeeping-firms/ --route /guides/dext-vs-hubdoc-for-bookkeepers/ --route /guides/best-ai-receipt-tool-for-bookkeepers/ --route /categories/ai-automation/ --route /guides/ --route /tools/dext/ --route /workflows/accountant-stack/`.
- Residual risks: This advances the Dext affiliate cluster but does not complete the full every-affiliate-tool objective.
- Next: Commit and push, then continue either one more distinct Dext intent or the next highest-fit approved affiliate tool from `npm run affiliate:conversion:inventory`.

### 2026-06-27: Dext vs Hubdoc Affiliate Switcher Slice

- Status: Complete and pushed.
- Commit: `38b3a73d7`.
- Branch: `master`.
- Changed: Added `/guides/dext-vs-hubdoc-for-bookkeepers/` as the second Dext affiliate conversion page. The page targets the same-job Dext vs Hubdoc decision for bookkeepers, solo finance operators, and small accounting firms. Updated the Dext pricing guide, receipt-tool guide, AI Automation category hub, and `PAGE_REFRESH_LEDGER.md`.
- Accuracy notes: The new guide recommends Dext only for multi-client, review-heavy, practice-grade workflows. Hubdoc is presented as a non-affiliate light-capture alternative when the buyer can confirm Xero availability, only needs QuickBooks Online sync, or wants the standalone $12/month Hubdoc route first. The page avoids claiming Hubdoc is included with QuickBooks. Accuracy review rejected the first rendered guide-pick version because Dext was still shown as the "Budget pick"; fixed by adding external non-affiliate guide picks to the schema, renderer, and audit, then making Hubdoc the rendered budget/light-capture pick with an official Hubdoc pricing CTA.
- Timing: Focused source health checked 194 source URLs across the Dext switcher, Dext pricing guide, receipt-tool guide, and AI Automation hub in 20.018s, with 188 ok, 6 access-sensitive, 0 broken, and 0 unreachable. Route QA checked 7 routes across 319, 360, 390, 430, 768, 1024, and 1366 px.
- Review: Visual/mobile accepted at 9.9/10 with clean layout and route QA across 319 to 1366 px. Accuracy/SEO rejected the first rendered version because the budget guide-pick card still monetized Dext despite the body recommending Hubdoc for budget/light-capture cases; after the external-pick fix, accuracy rereview accepted at 9.9/10 and verified the built Hubdoc budget CTA is official, non-affiliate, and not tied to Dext.
- Verification: `npm exec --yes --package=node@24 -- node --test tests/scripts/audit-guide-picks.test.mjs`; `npm run check:frontmatter`; `node scripts/audit-guide-picks.mjs --json`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run --silent audit:affiliate-conversion -- --strict --json`; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run typecheck`; `npm run page:source-health -- --plan local/tmp/dext-vs-hubdoc-source-health-plan.json --out local/tmp/dext-vs-hubdoc-source-health.json --concurrency 6 --timeout-ms 10000 --domain-delay-ms 150`; `npm run build:fast`; `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /guides/dext-vs-hubdoc-for-bookkeepers/ --route /guides/dext-pricing-for-bookkeeping-firms/ --route /guides/best-ai-receipt-tool-for-bookkeepers/ --route /categories/ai-automation/ --route /guides/ --route /tools/dext/ --route /workflows/accountant-stack/ --timing-file local/tmp/dext-vs-hubdoc-route-qa-timing.json`.
- Residual risks: This is still only the Dext cluster's second new page, not the full affiliate-page objective.
- Next: Continue the affiliate buildout.

### 2026-06-27: Dext Affiliate Plan Guide Slice

- Status: Complete and pushed.
- Commit: `a720ded8f`.
- Branch: `master`.
- Changed: Added `/guides/dext-pricing-for-bookkeeping-firms/` as the first new affiliate conversion page after the 35-guide metadata foundation. The page targets the Dext Practice vs Dext Business pricing decision for bookkeeping firms, solo bookkeepers, and one-company finance workflows. Updated the AI Automation category hub to route Dext buyers into the new plan guide, corrected the sibling receipt guide's Hubdoc positioning, and regenerated `PAGE_REFRESH_LEDGER.md`.
- Accuracy notes: Dext business-plan claims are based on the Dext help article and current public business pricing route. Practice-plan claims are based on the current Dext partner pricing route and partner overview. Hubdoc is now described as Xero-included for eligible Xero business-edition subscriptions or standalone at $12/month, with no QuickBooks-bundled claim. AutoEntry exact credit claims use AutoEntry help and pricing pages; the blocked Sage U.S. page was not used after it returned 403 from this runner.
- Timing: Focused source health checked 188 source URLs across the new Dext guide, receipt sibling, and AI Automation hub in 18.459s, with 184 ok, 4 access-sensitive, 0 broken, and 0 unreachable. Final route QA checked 6 routes across 319, 360, 390, 430, 768, 1024, and 1366 px in 7.305s. Slowest route totals were `/categories/ai-automation/` at 7.369s and `/guides/dext-pricing-for-bookkeeping-firms/` at 7.237s.
- Review: Visual/mobile subagent accepted at 9.9/10 after noting the new guide should use `related` instead of `related_links`; that polish is fixed. Accuracy/SEO subagent rejected the first pass over unsupported Hubdoc QuickBooks-bundling claims, then accepted at 9.9/10 after Hubdoc was narrowed to Xero-included or standalone positioning and current supporting sources were added.
- Verification: `AIPEDIA_CURRENT_DATE=2026-06-27 npm run --silent audit:affiliate-conversion -- --strict --json`; `npm run check:frontmatter`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run ledger:pages && npm run ledger:pages:check`; `npm run typecheck`; `npm run page:source-health -- --plan local/tmp/dext-affiliate-source-health-plan.json --out local/tmp/dext-affiliate-source-health.json --concurrency 6 --timeout-ms 10000 --domain-delay-ms 150`; `npm run build:fast`; `node scripts/qa-route.mjs --site-dir .vercel/output/static --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route /guides/dext-pricing-for-bookkeeping-firms/ --route /guides/best-ai-receipt-tool-for-bookkeepers/ --route /categories/ai-automation/ --route /guides/ --route /tools/dext/ --route /workflows/accountant-stack/ --timing-file local/tmp/dext-affiliate-route-qa-timing.json`.
- Residual risks: This is the first page in the Dext cluster, not the full affiliate-page objective.
- Next: Commit and push, then continue Dext or another high-fit approved affiliate cluster from the current inventory.

### 2026-06-27: Non-Tool Page Refresh Batch 04

- Status: Complete and verified locally.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed 24 guide routes from `/guides/best-ai-for-logo-design/` through `/guides/best-ai-tool-for-paid-social-creative-velocity/` to June 27 verification. Repaired source-health failures for Canva logo creation, Instapage AdMap, Leadpages A/B testing, Dext business/partner pricing, Consensus subscription plans, AdCreative official product/pricing surface, Lindy docs, and Adobe Firefly plan sourcing. Updated affected parent surfaces `/guides/`, `/categories/`, AI Design, AI Image, AI Presentation, AI Writing, AI SEO, AI Coding, AI Notes, AI Video, AI Voice, AI Automation, AI Research, and `PAGE_REFRESH_LEDGER.md`.
- Timing: Source health after repairs checked 224 URLs with 0 broken and 0 unreachable in 11.725s. Timed runner closeout passed with source health 12.887s, typecheck 17.468s, build:fast 18.397s, and content route QA 37.220s. Supplemental category route QA passed in 14.190s.
- Verification: `node scripts/check-frontmatter.mjs --changed`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed -- --json`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/batch-04-source-health-after-labels.json --concurrency 8 --timeout-ms 8000`; `npm run ledger:pages && npm run ledger:pages:check`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run runner:page-refresh:closeout`; supplemental `node scripts/qa-route.mjs` for 11 affected category hubs across 319, 360, 390, 430, 768, 1024, and 1366 px.
- Residual risks: Several official sources are access-sensitive from CLI checks, but none are broken or unreachable. Strict 3-day target remains active with 193 tracked pages older than 2026-06-24.
- Next: Regenerate the next page-refresh plan and continue the remaining guide/comparison/company/static/workflow/trend/tool/crawl/report refresh waves.

### 2026-06-26: Page Refresh Source Health Optimization

- Status: Complete and verified.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `scripts/page-source-health.mjs` and `npm run page:source-health` for bounded concurrent source URL checks with per-source and per-page timing, timeout controls, per-host pacing, and access-sensitive handling for 401, 403, and 429. Wired source health into Rust `runner:page-refresh:closeout` before typecheck, added `--skip-source-health` for scoped workflow tests, fixed worker report scaffolds so checks use `command`, `status`, and `notes`, updated workflow docs, and normalized `PAGE_REFRESH_LEDGER.md` after the closeout regen.
- Timing: Focused source-health unit tests run in 299.7ms. A live two-page planner smoke checked 21 source URLs in 5.211s with concurrency 4, replacing the prior serial per-page source-health bottleneck shape from batch 03.
- Verification: `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs tests/scripts/page-source-health.test.mjs`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run runner:page-refresh:plan -- --limit 2 --workers 1 --pages-per-worker 2`; `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/source-health-smoke.json --concurrency 4 --timeout-ms 8000`; `npm run runner:page-refresh:closeout -- --skip-build --skip-route-qa --skip-source-health`; `npm run audit:commands`; `node scripts/guard-em-dashes.mjs && git diff --check`.
- Failed then fixed: The new source-health tests first timed out because the synchronous child process blocked the local HTTP server owned by the same test process. Switched the helper to async `execFile` and reran cleanly.
- Residual risks: The live source-health smoke intentionally failed on an existing content issue: `https://www.canva.com/logo-maker/` returns 404 on `/guides/best-ai-for-logo-design/`. Treat that as the first repair in the next content refresh pass.
- Next: Fix the Canva source on `/guides/best-ai-for-logo-design/`, then run the next oldest-first non-tool batch with source health enabled.

### 2026-06-26: Non-Tool Page Refresh Batch 03

- Status: Complete and verified.
- Commit: this commit.
- Branch: `master`.
- Changed: Ran the optimized Rust page-refresh workflow over 18 guide routes from academic writing through LinkedIn, including one archived noindex legal-research guide. Refreshed June 26 verification language, source dates, and targeted buyer notes; updated affected parent surfaces `/guides/`, `/answers/best-ai-for-writing-2026/`, AI Writing, AI Research, AI Coding, AI Design, AI Automation, AI Search, and `PAGE_REFRESH_LEDGER.md`.
- Timing: Planner 0.73s; bulk source URL check 66.07s for 106 unique URLs; per-page source timing 99.87s across 18 pages; worker reports parsed 6/6 with 175 report source URLs, 35 confidence labels, 21 caveats, and 41 parent notes. Final closeout passed in 62.57s wall time: cheap gates 2.375s, typecheck 14.284s, build:fast 16.124s, and route QA 29.443s for 24 indexable routes across seven widths.
- Verification: `npm run runner:page-refresh:plan -- --limit 18 --workers 6 --pages-per-worker 3`; grouped current-source searches with `June 2026`; bulk and per-page source URL health checks; `npm run ledger:pages`; `npm run ledger:pages:check`; `npm run runner:page-refresh:reports`; `npm run runner:page-refresh:closeout`.
- Failed then fixed: Main-thread generated worker reports used `name` instead of the Rust schema's `command` field for checks, so the first report aggregation parsed 0/6. Rewrote the report checks to the schema and reran aggregation cleanly at 6/6.
- Optimization notes: Source health checks are now the slowest micro-step. Add a bounded concurrent page-source checker with per-domain rate limits and access-sensitive handling for 401, 403, and 429. Also update planner scaffolds so `checks` uses `command`.
- Residual risks: Some official sources are access-gated or rate-limited from CLI checks. The archived legal-research guide remains noindex and intentionally skipped indexable route QA.
- Next: Patch the worker-report scaffold schema and source-health helper before scaling above 18 pages.

### 2026-06-26: Page Refresh Workflow Policy And Report Optimization

- Status: Complete and verified.
- Commit: this commit.
- Branch: `master`.
- Changed: Improved the non-tool page-refresh planner and Rust report aggregator after batch 02. Planner routes now carry explicit QA policy classes: `indexable-buyer`, `parent-category`, `top-layer`, `interactive-noindex`, `archived-noindex`, and `content`. Archived noindex content stays in worker refresh and frontmatter checks while skipping indexable route QA. Worker report summaries now include pages/minute, sources/page, caveats/page, confidence labels/page, failed worker checks, and parent-surface hints grouped by the child routes that referenced them. Updated `workflows/page-refresh/README.md` and focused tests.
- Verification: `node --check scripts/page-refresh-batch.mjs`; `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs`; `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run runner:page-refresh:plan -- --limit 4 --workers 2 --pages-per-worker 2`; `npm run runner:page-refresh:reports`.
- Residual risks: This is workflow instrumentation and QA targeting only. The next real batch should confirm the efficiency metrics remain useful with completed worker reports, not just scaffolds.
- Next: Run one more 12 to 18 page non-tool batch, then compare pages/minute, sources/page, route QA time, and rework count before scaling further.

### 2026-06-26: Non-Tool Page Refresh Batch 02

- Status: Complete locally and verified.
- Commit: this commit.
- Branch: `master`.
- Changed: Ran the Rust page-refresh workflow over 12 comparison and guide routes from Frase/NeuronWriter through heavy-inbox triage. Refreshed affected AI SEO, AI Presentation, AI Chatbots, and AI Automation category hubs plus `/compare/`, `/guides/`, and `PAGE_REFRESH_LEDGER.md`. Hardened the page-refresh planner so archived noindex content routes stay in content/frontmatter verification but skip indexable route QA, and updated the Rust aggregator to parse structured worker check reports.
- Timing: Worker reports parsed 3/3 with 3935 reported worker seconds, 89 source URLs, 51 confidence labels, 29 caveats, and 75 parent surface notes. Final closeout passed in 51.528s: cheap gates 2.311s, typecheck 12.352s, build:fast 15.761s, and route QA 21.099s for 18 indexable routes across seven widths.
- Verification: `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run runner:page-refresh:reports`; `npm run ledger:pages && npm run ledger:pages:check`; `npm run runner:page-refresh:closeout`.
- Failed then fixed: The Rust report parser initially rejected structured worker `checks` objects, and the first closeout route QA failed on intentionally archived noindex guide routes. Fixed both workflow issues, regenerated the saved plan route args, and reran closeout cleanly.
- Residual risks: Source registry rows were not changed because this batch used page-local source lists and parent summaries. Archived noindex pages were refreshed but intentionally excluded from indexable route QA after content/frontmatter checks.
- Next: Commit and push, then run one more 12 to 18 page non-tool batch before scaling the page workflow further.

### 2026-06-26: Rust Page Refresh Runner

- Status: Complete, verified, and pushed.
- Commit: this commit.
- Branch: `master`.
- Changed: Added Rust runner support for non-tool page refreshes with `page-plan`, `page-reports`, `page-closeout`, and `page-run` subcommands. Added npm scripts for the new runner path, page worker report aggregation, split content and interactive route QA closeout, current-date environment propagation, per-command timing, and page-refresh receipts. Updated workflow docs and agent status docs so the Rust runner is the default page-refresh orchestration path.
- Verification: `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`; `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs`; `npm run runner:page-refresh:plan -- --limit 3 --workers 2 --pages-per-worker 2`; `npm run runner:page-refresh:reports`; `npm run runner:page-refresh:closeout -- --dry-run --skip-build --skip-route-qa`; `npm run audit:commands`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: This is orchestration only. The Node planner, content audits, Astro checks, and Playwright route QA remain the accuracy layer.
- Next: Commit and push, then use `npm run runner:page-refresh:plan` for the next 12 to 24 page non-tool batch.

### 2026-06-26: Non-Tool Page Refresh Workflow Optimization

- Status: Complete and pushed.
- Commit: 5657acf64.
- Branch: `master`.
- Changed: Optimized `scripts/page-refresh-batch.mjs` for repeatable speed, efficiency, quality, and accuracy review. The planner now emits worker report paths, can write worker JSON report scaffolds, includes per-worker report schemas in prompts, gives the integrator report paths, separates standard content route QA from intentional noindex interactive route QA, and emits `commands.timed_closeout` for closeout micro-step timing. Updated `workflows/page-refresh/README.md`, planner tests, and agent status docs.
- Verification: `node --check scripts/page-refresh-batch.mjs`; `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs`; real planner smoke with `--write-agent-prompts`, `--report-dir`, and `--write-report-scaffolds` to `local/tmp/page-refresh-optimization-smoke.json`.
- Residual risks: This improves workflow instrumentation and routing policy only. The next real batch should validate that worker JSON reports are filled consistently enough for automated aggregation.
- Next: Run the next 12 to 24 page non-tool batch using generated prompts and report scaffolds, then tune shard sizing from measured worker reports.

### 2026-06-26: Non-Tool Page Refresh Batch 01

- Status: Complete and pushed.
- Commit: 7fd14b7aa.
- Branch: `master`.
- Changed: Ran the first live non-tool page-refresh workflow over 12 routes: terms, disclosure, reports, dead archive, four answer pages, compare-builder, and three comparison pages. Updated affected parent surfaces `/answers/`, `/compare/`, `/categories/ai-voice/`, `/categories/ai-seo/`, and `PAGE_REFRESH_LEDGER.md`. Added planner prompt-file output, fixed coverage-quality current-date handling, added explicit noindex/interactive route-QA flags, and updated the page-refresh workflow docs.
- Timing: Planner 0.39s; prompt-file generation 0.42s; workers 4m00s, 6m17s, and 2m22s; typecheck 13.00s; build:fast 16.79s; content route QA 20.39s; interactive builder route QA 2.67s. Full receipt: `.agent/loop-runs/2026-06-26-page-refresh-batch-01.md`.
- Verification: `node --check scripts/page-refresh-batch.mjs`; `node --check scripts/audit-coverage-quality.mjs`; `node --check scripts/qa-route.mjs`; `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs`; `node scripts/check-frontmatter.mjs --changed`; `node scripts/guard-em-dashes.mjs`; `npm run ledger:pages && npm run ledger:pages:check`; `npm run audit:provenance:changed -- --json`; `AIPEDIA_CURRENT_DATE=2026-06-26 npm run audit:coverage-quality:changed`; `AIPEDIA_CURRENT_DATE=2026-06-26 npm run audit:facts`; `npm run check:links`; `npm run typecheck`; `AIPEDIA_CURRENT_DATE=2026-06-26 npm run build:fast`; route QA for 17 content routes x 7 widths; route QA for `/compare/build/` x 7 widths with intentional noindex/interactive flags.
- Failed then fixed: Manual worker-prompt transcription caused missed `/reports/` and `/dead/` edits even though the planner JSON had correct `index.astro` paths; fixed with `--write-agent-prompts`. `audit:coverage-quality:changed` treated current-day dates as future because it ignored explicit current date; fixed. `qa-route` applied indexable comparison-page assertions to `/compare/build/`; fixed with explicit opt-in flags for noindex interactive routes.
- Residual risks: Source registry rows were not changed because these are mostly static/answer/comparison pages with inline source lists. Next page-refresh run should add a parseable worker report artifact and keep batch size at 12 to 24 pages until worker report integration stabilizes.
- Next: Commit and push, then run the next non-tool page batch using generated prompt files.

### 2026-06-26: Non-Tool Page Refresh Workflow V1

- Status: Complete and pushed.
- Commit: d918f852c.
- Branch: `master`.
- Changed: Added `scripts/page-refresh-batch.mjs`, `npm run page:refresh:batch`, focused planner tests, and the first runnable `workflows/page-refresh/` procedure for non-tool page refreshes. The planner reads `PAGE_REFRESH_LEDGER.md`, excludes tool pages by default, sorts oldest-first, supports type filters, emits six-worker shard prompts, emits one integrator prompt, and includes timing-aware route QA at concurrency 6.
- Verification: `node --check scripts/page-refresh-batch.mjs`; `npm run --silent page:refresh:batch -- --limit 12 --max-workers 3 --pages-per-worker 4 --json > .tmp-page-refresh-batch.json`; `npm exec --yes --package=node@24 -- node --test tests/scripts/page-refresh-batch.test.mjs`; `npm run audit:commands`; `node scripts/guard-em-dashes.mjs`; `npm run ledger:pages && npm run ledger:pages:check`; `git diff --check`.
- Residual risks: This creates the repeatable lane but does not refresh page content yet. The first real page batch should capture actual worker, integration, and route QA timings, then feed stable improvements back into the workflow and planner.
- Next: Use generated prompt files for live page-refresh batches.

### 2026-06-26: Same-Day Tool Refresh Timing Run and Route QA Optimization

- Status: Complete and pushed.
- Branch: `master`.
- Changed: Ran `$aipedia-tool-refresh-workflow` with six shard workers across a 60-tool intentional same-day revisit plan from Consensus through Kling. Integrated worker edits, manually refreshed the missed `captions.md` page, updated affected category hubs, refreshed `src/data/source-registry.json`, regenerated `PAGE_REFRESH_LEDGER.md`, and checked all affected rendered routes.
- Buyer-impact notes: Replit Agent now uses the current Pro annual effective price of $90/month; Capacities now includes Release 66 AI Chat Connectors 2.0; Figma now carries Config 2026 Code Layers, Motion, shaders, generative plugins, Weave tools, agent skills, web search, connectors, and file attachments; Synthesia now primary-confirms Studio Express-1 custom avatar add-on pricing at $1,000/year for annual Studio users; Captions recheck keeps the public self-serve ladder stable and separates Mirage API procurement from app-plan credits.
- Workflow changes: Fixed `audit:tool-quality` so current-date checks use local/explicit current dates instead of UTC-only slicing. Added `--timing-file` support to `qa-route` with per-route and per-viewport timing. Updated the Rust runner to persist route QA timing and increased runner route QA concurrency from 4 to 6 while preserving the same route and viewport coverage. Updated workflow docs and the local skill mirror to use generated worker prompts verbatim and route QA concurrency 6.
- Timing: Six worker shard reports ranged from about 6.5 to 45 minutes; worker collection was bounded by the slowest 45-minute shard. Runner closeout passed in 185.4s: ledger generate 0.56s, ledger check 0.56s, grouped check 25.4s, typecheck 16.3s, build:fast 16.4s, route QA 126.3s at concurrency 4. The optimized rerun of the same 75 routes x 7 widths at concurrency 6 passed with 85.5s internal route QA timing; slowest route totals were category/index routes such as `/categories/ai-automation/`, `/categories/ai-coding/`, `/categories/`, and `/tools/`.
- Verification: `node --check scripts/audit-tool-quality.mjs`; `node --check scripts/qa-route.mjs`; `node scripts/check-frontmatter.mjs --changed`; `git diff --check`; `npm run ledger:pages && npm run ledger:pages:check`; `AIPEDIA_CURRENT_DATE=2026-06-26 npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json --timing-file local/tmp/aipedia-runner/manual-timings/2026-06-26-grouped-check.json`; `AIPEDIA_CURRENT_DATE=2026-06-26 npm run runner:tool-refresh:closeout -- --plan .tmp-tool-refresh-batch.json --route-args .tmp-route-qa-args.txt --receipt-dir local/tmp/aipedia-runner/receipts`; `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/aipedia-runner/manual-timings/2026-06-26-route-qa-concurrency-6.json`; `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`; `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`.
- Failed then fixed: Default planner returned 0 due tools, so this run used `--include-same-day` intentionally. Hand-transcribed worker prompts skipped `captions.md` and briefly assigned `perplexity.md`/`langgraph.md` instead of `comet.md`/`kling.md`; workers corrected the two wrong assignments, and the integrator refreshed Captions manually. Multiple workers hit false `last_verified is in the future` failures because `audit:tool-quality` used UTC date slicing; the audit now accepts explicit/local current dates, and grouped checks pass unshimmed with `AIPEDIA_CURRENT_DATE=2026-06-26`.
- Residual risks: Dynamic, checkout-gated, region-rendered, account-gated, and primary-conflict claims remain caveated in the affected pages, especially Base44 credits, D-ID live plan cards, Canva regional checkout, Captions credit rollover, Udio/Lovable/Kling account-gated pricing, ChatGPT Go regional pricing, and Google/Decktopus localized plan availability.
- Next: Regenerate the default planner without `--include-same-day` before deciding whether another tool freshness batch is actually due.

Purpose: append-only record of major work that has actually landed.

Use this file to answer "what got done?" Use `.agent/CURRENT_STATUS.md` to answer "where are we now?" Use `.agent/PLANS.md` to answer "what is still active?" For context economy, read the newest entries first and stop once you have the relevant proof trail.

## Recording Contract

- Newest entries go first.
- Add an entry after any major implementation, remediation, migration, launch, or multi-file documentation pass.
- Keep entries short enough to scan.
- Include commit, branch, verification, status, and residual risks when known.
- If the current commit introduces the work-log entry, write `this commit` rather than trying to embed its own hash.
- Do not move active work into this file until it is complete, pushed, or explicitly deferred.
- Do not treat local-only ignored docs as canonical unless the entry says so.

## Entry Template

```md
### YYYY-MM-DD: Short Work Name

- Status:
- Commit:
- Branch:
- Changed:
- Verification:
- Residual risks:
- Next:
```

## Entries

### 2026-06-25: Tool Refresh Planner Source-Health Bridge

- Status: Complete locally, partially verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Updated `scripts/tool-refresh-batch.mjs` so batch JSON includes registered source metadata for each planned tool, deduped `commands.source_ids`, scoped offline/live/snapshot `audit:sources` commands, and shard-level `source_ids` in worker briefs. Updated `scripts/README.md`, `tests/scripts/tool-refresh-batch.test.mjs`, and `.agent/CURRENT_STATUS.md`.
- Verification: `node --check scripts/tool-refresh-batch.mjs`; `npm run tool:refresh:batch -- --limit 2 --max-workers 2 --tools-per-worker 1 --json`; `node --test tests/scripts/tool-refresh-batch.test.mjs`; `npm run audit:commands`; `npm run audit:sources -- --json --limit 0 --source-id consensus-pricing`.
- Failed then documented: `npm run check:quick` stopped in the broad script suite because the local shell is using Node 22 and missing installed packages such as `sharp` and `esbuild`; existing dirty-baseline `qa-route` and temporary TypeScript import fixture failures also remain in that broad run. The focused planner test passed.
- Residual risks: Live source-health fetching was not run because this was a planner wiring change and live checks can be slow or network-sensitive. Future batches should use the emitted live command when deciding whether registered source hashes changed.
- Next: Use the emitted `commands.source_health` section before the next large refresh batch to prioritize changed sources and avoid unnecessary page edits.

### 2026-06-22: Capacities, Beehiiv, Browserbase, Castmagic, CloudTalk Batch

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed Capacities, Beehiiv, Browserbase, Castmagic, and CloudTalk against current June 22 primary sources; updated AI Notes, AI Writing, and AI Automation parent hubs; advanced source registry checks; regenerated `PAGE_REFRESH_LEDGER.md`; and recorded `.agent/loop-runs/2026-06-22-capacities-beehiiv-browserbase-castmagic-cloudtalk-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\capacities.md --file src\content\tools\beehiiv.md --file src\content\tools\browserbase.md --file src\content\tools\castmagic.md --file src\content\tools\cloudtalk.md --json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/capacities/ --route /categories/ai-notes/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/castmagic/ --route /tools/cloudtalk/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: This batch is complete, but the global goal remains active. `npm run tool:refresh:batch -- --limit 5 --json` now queues Grok, Cursor, Lindy, n8n, and Mistral AI.
- Next: Continue the active freshness goal with Grok, Cursor, Lindy, n8n, and Mistral AI.

### 2026-06-22: Qwen, Hailuo, HeyGen, And Adobe Firefly Batch Refresh

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed Qwen, Hailuo, HeyGen, and Adobe Firefly against current June 22 official sources; updated AI Chatbots, AI Video, and AI Image parent hubs; added the Hailuo payment policy source row; refreshed source registry dates; regenerated `PAGE_REFRESH_LEDGER.md`; added `scripts/tool-refresh-batch-check.mjs`; and added `npm run tool:refresh:batch:check` so future tool refreshes can pass a fast grouped gate before one expensive build/route-QA closeout.
- Verification: `npm run tool:refresh:batch:check -- --file src\content\tools\qwen.md --file src\content\tools\hailuo.md --file src\content\tools\heygen.md --file src\content\tools\adobe-firefly.md --json`; `npm run ledger:pages`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/qwen/ --route /categories/ai-chatbots/ --route /tools/hailuo/ --route /categories/ai-video/ --route /tools/heygen/ --route /tools/adobe-firefly/ --route /categories/ai-image/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: The full build is still expensive because the static site has hundreds of routes plus guard, indexability, commercial CTA, sitemap, and budget checks. The new rule is to pay that cost once per batch unless a template, runtime, layout, generated asset, or high-risk commercial claim requires isolation.
- Next: Push this batch, then run a fresh loop recommendation and choose between the Amazon Q vs GitHub Copilot decision cycle and the next batched freshness queue.

### 2026-06-22: Grammarly Tool Freshness Refresh

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed `src/content/tools/grammarly.md`, the AI Writing category hub, Grammarly source registry rows, `PAGE_REFRESH_LEDGER.md`, and `.agent/loop-runs/2026-06-22-grammarly-tool-refresh.md`; confirmed Free prompt allowance, Pro prompt allowance and 149-seat cap, Pro pricing, Superhuman suite pricing, Enterprise controls, affiliate cookie status, privacy/trust claims, and Superhuman suite consolidation caveats.
- Verification: `npm run audit:tool-quality -- --file src/content/tools/grammarly.md`; `npm run audit:provenance:changed -- --json`; `npm run loop:freshness -- --json`; `npm run ledger:pages:check`; `node scripts\guard-em-dashes.mjs`; `git diff --check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/grammarly/ --route /categories/ai-writing/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: This completed Grammarly only at the time. Qwen, Hailuo, HeyGen, and Adobe Firefly were completed in the following batch.
- Next: See the newer batch entry above for the current queue.

### 2026-06-22: Batched Tool Refresh Planner

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `scripts/tool-refresh-batch.mjs`, `npm run tool:refresh:batch`, and operating-loop documentation that makes batched oldest-first tool refreshes the default. The planner groups due tools by slug, lists due facts and source IDs, infers parent category routes, and prints one combined closeout gate.
- Verification: `npm run tool:refresh:batch -- --limit 4 --json`; `npm run check:fast`; `npm run audit:commands`.
- Residual risks: The planner accelerates queue handling and verification grouping, but it does not replace current-source verification or editorial judgment.
- Next: Use `npm run tool:refresh:batch -- --limit 4` plus `npm run tool:refresh:batch:check` for the next queued batch instead of closing each tool with a full build.

### 2026-06-22: GitHub Copilot Tool Freshness Refresh

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed `src/content/tools/github-copilot.md`, the AI Coding category hub, `github-copilot-vs-supermaven`, `github-copilot-alternatives`, `best-ai-tools-for-developers`, Copilot source registry rows, `PAGE_REFRESH_LEDGER.md`, and `.agent/loop-runs/2026-06-22-github-copilot-tool-refresh.md`; confirmed unchanged plan pricing, Free caps, AI Credits, individual sign-up reopening, Fable 5 unavailability, MAI-Code-1-Flash expansion, Opus 4.6 fast's June 29 deprecation, AGENTS.md code review support, Copilot app GA, and usage metrics.
- Verification: `npm run audit:tool-quality -- --file src/content/tools/github-copilot.md`; `npm run audit:provenance:changed -- --json`; `npm run loop:freshness -- --json`; `npm run ledger:pages:check`; `node scripts\guard-em-dashes.mjs`; `git diff --check`; `npm run audit:coverage-quality:changed`; `npm run typecheck`; `npm run test:scripts`; `npm run build:fast`; `npm run qa:route -- --route /tools/github-copilot/ --route /categories/ai-coding/ --route /compare/github-copilot-vs-supermaven/ --route /guides/github-copilot-alternatives/ --route /guides/best-ai-tools-for-developers/ --route /tools/ --route /categories/ --route /compare/ --route /guides/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: This completes GitHub Copilot only. The remaining freshness queue starts with Grammarly, Qwen, Hailuo, and HeyGen unless the broad loop runner promotes a decision-content cycle first.
- Next: Continue oldest-first freshness with Grammarly or run `amazon-q-vs-github-copilot` if the fresh loop recommendation ranks that higher.

### 2026-06-22: Gemini Tool Freshness Refresh

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed `src/content/tools/gemini.md`, affected AI Chatbots, AI Search, AI Coding, and AI Infrastructure category hubs, Gemini source registry rows, `PAGE_REFRESH_LEDGER.md`, and `.agent/loop-runs/2026-06-22-gemini-tool-refresh.md`; clarified Gemini 3.5 Flash standard, batch/flex, and priority API pricing; separated Google AI plan guidance from API billing; updated Gemini Code Assist and Antigravity guidance for June 22.
- Verification: `npm run audit:tool-quality -- --file src/content/tools/gemini.md`; `npm run audit:provenance:changed -- --json`; `npm run loop:freshness -- --json`; `npm run ledger:pages:check`; `node scripts\guard-em-dashes.mjs`; `git diff --check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/gemini/ --route /categories/ai-chatbots/ --route /categories/ai-search/ --route /categories/ai-coding/ --route /categories/ai-infrastructure/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run test:scripts`; `npm run audit:coverage-quality:changed`.
- Residual risks: This completes Gemini only. The remaining freshness queue starts with GitHub Copilot, Grammarly, Qwen, Hailuo, and HeyGen unless the broad loop runner promotes a decision-content cycle first.
- Next: Continue oldest-first freshness with GitHub Copilot or run `amazon-q-vs-github-copilot` if the fresh loop recommendation ranks that higher.

### 2026-06-22: Detail Page Width Parity Hotfix

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Added a shared `gt-canvas-wide` utility in `src/styles/godtier-tokens.css`, added a global narrow-mobile `gt-canvas` rule for non-home detail pages, opted category, company, comparison, guide, and workflow layouts into the 1040 px structured desktop shell, kept pure prose article layouts on the 680 px desktop reading measure, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-22-detail-page-width-parity-hotfix.md`.
- Verification: live geometry baseline showed the old 346 px detail route squeeze on `/tools/chatgpt/`, `/compare/chatgpt-vs-claude/`, and `/answers/chatgpt-vs-claude-which-is-better/`; post-fix live geometry confirmed representative tool, comparison, answer, guide, workflow, trend, category, company, and news detail routes share the wider narrow-mobile rail with no positive horizontal overflow; `npm run ledger:pages`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/chatgpt/ --route /compare/chatgpt-vs-claude/ --route /answers/chatgpt-vs-claude-which-is-better/ --route /guides/best-ai-coding-assistant/ --route /workflows/agentic-coding-workflow/ --route /trends/ai-coding-model-arms-race/ --route /categories/ai-chatbots/ --route /companies/anthropic/ --route /news/2026-06-22-ai-news-desk/ --widths 319,346,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: Pure prose answer, trend, and news article pages intentionally stay on the 680 px desktop reading measure, so do not widen those on desktop unless the content model changes. This pass fixes shell width, not every page-specific hierarchy or copy-density issue.
- Next: Continue either Gemini freshness or `amazon-q-vs-github-copilot` based on the next loop recommendation.

### 2026-06-22: Top-Layer Visual Uplift Slice 1

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Added a shared top-layer index polish layer for `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/`; imported it from `BaseLayout`; aligned cards, search controls, trackers, chips, borders, and text containment with the current homepage surface language; widened non-home top-layer index canvases from the inherited 680 px measure to 1040 px on desktop; matched the homepage narrow-mobile frame; converted `/guides/` and `/news/` mobile filters into contained grids; hardened those filters with route-owned mobile rules after live 346 px reports; corrected the page-scoped selectors to avoid the layout-owned `#main-content`; restored the shared active-chip Signal Orange state; fixed shared mobile breadcrumb geometry after `/explore/` showed the current crumb stretching away from `aipedia`; fixed the remaining homepage compact-evidence tint; shortened the visible `/categories/` maintenance paragraph; and expanded the focused Playwright homepage card regression to reject tinted compact evidence metrics.
- Verification: live in-app browser DOM check for `/`, `/tools/`, `/categories/`, `/compare/`, `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/` at 319, 430, 768, and 1366 px; `npm run ledger:pages`; `npm run typecheck`; `node scripts\guard-em-dashes.mjs`; `git diff --check`; `npm run build:fast`; first route QA caught `/guides/` and `/news/` mobile filter overflow; after the filter fix, `npm run build:fast` and `npm run qa:route -- --route / --route /tools/ --route /categories/ --route /compare/ --route /guides/ --route /news/ --route /answers/ --route /trends/ --route /workflows/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client` passed; later live browser and route QA checked `/guides/` and `/news/` at 319, 346, 360, 390, 430, 768, 1024, and 1366 px; follow-up live browser checks confirmed `/explore/`, `/tools/`, `/news/`, `/guides/`, and `/compare/` breadcrumbs stay compact with no overflow at 319, 346, and 430 px; final follow-up `npm run qa:route -- --route /explore/ --route /tools/ --route /categories/ --route /compare/ --route /guides/ --route /news/ --route /answers/ --route /trends/ --route /workflows/ --widths 319,346,360,390,430,768,1024,1366 --site-dir dist-fast/client` passed; earlier slice regression `npx playwright test tests/smoke/visual-routes.spec.mjs --config=playwright.config.mjs -g "homepage decision cards"` passed.
- Residual risks: This is a shared-surface and width-math slice, not a full route-by-route content rewrite. The next slice should manually inspect and tune `/guides/`, `/news/`, `/answers/`, `/trends/`, and `/workflows/` for copy density and page-specific hierarchy.
- Next: Run top-layer visual uplift slice 2 before starting unrelated visual redesign work.

### 2026-06-22: Homepage Decision Card Density And Spacing Hotfix

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Fixed the reported overcrowded and cramped homepage decision-path cards at 319 px by compressing the homepage-only evidence rail into one source row plus tiny freshness and confidence signals, then opening up the homepage rhythm around the hero, portals, route section, and decision cards. Kept the strict registered-source, current, high-confidence evidence guard in place. Added a focused Playwright visual smoke regression so the cards cannot quietly return to bulky trust-chip layouts or underspaced rows.
- Verification: `npm run ledger:pages`; `node scripts\generate-page-refresh-ledger.mjs --check --json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npx playwright test tests/smoke/visual-routes.spec.mjs --config=playwright.config.mjs --grep "homepage decision cards keep evidence compact and spaced"`; `npm run smoke:visual`; `npm run smoke:api`; `npm run ledger:pages:check`; `node scripts\guard-em-dashes.mjs`; `node scripts\generate-og-svgs.mjs --check --limit 20 --json`; `git diff --check`.
- Residual risks: The visible in-app browser tab was not exposed through browser automation, so static local output is served at `http://127.0.0.1:4321/` for manual reload. No blocking layout risk remains after route QA and visual smoke.
- Next: Continue the freshness goal from Gemini or the Amazon Q vs GitHub Copilot recommendation.

### 2026-06-22: Claude And Claude Code Freshness Completion

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Completed the paused Claude and Claude Code freshness batch; refreshed Claude/Claude Code, Anthropic, affected category hubs, comparisons, guides, answer pages, source registry, top-layer surfaces, and ledger rows around Fable/Mythos suspension, Opus 4.8, paused Agent SDK credit changes, Claude Code usage/cost guidance, data retention, and web search. Fixed the selected lantern logo palette so brand and favicon rasters stay inside Signal Orange.
- Verification: stale bad-phrase scan; `npm run audit:provenance:changed -- --json`; `npm run ledger:pages:check`; `npm run loop:freshness -- --json`; affected route QA across Claude, Claude Code, category, comparison, guide, answer, `/tools/`, and `/categories/` routes at 360, 390, 430, 768, 1024, and 1366 px; `node scripts\prep-favicons.mjs --check --json`; `npm run smoke:visual`; `npm run check:smart:run`.
- Residual risks: None blocking. The site still has due-soon freshness work, with Gemini currently first in the queue.
- Next: Rerun the loop suite after any new dirty worktree change, then choose between Gemini freshness and `amazon-q-vs-github-copilot`.

### 2026-06-22: News Loop Rules Standard

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Added explicit missed-date news rules to `.agent/OPERATING_RULES.md`, `.agent/LOOPS.md`, and `src/data/aipedia-loops.json`; the News and Market Change loop now requires broad AI news plus AI tools or tool-control coverage when sourceable, `/news/` and homepage latest-news alignment, OG assets, affected-tool links, source lists, crawl surfaces, ledger updates, and mobile/tablet/desktop layout QA. Added a regression test so the rule remains visible in loop-registry output.
- Verification: `node --test tests\scripts\aipedia-loops.test.mjs`; `npm run loop:system -- --json`; `npm run loop:news -- --json`; `npm run build:fast`; `npm run loop:all:record -- --json`; `npm run qa:route -- --route /news/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `node scripts\guard-em-dashes.mjs`.
- Residual risks: The loop standard is now explicit and green, but article selection still needs editorial judgment and current-source verification. The broader June 21 to June 22 freshness goal remains active and dirty.
- Next: Finish the paused Claude and Claude Code freshness batch, rerun and record all loops, then choose Gemini freshness or the Amazon Q vs GitHub Copilot cycle from the fresh recommendations.

### 2026-06-22: Visual Layout Precision Standard

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Added a strict layout precision rule to the canonical agent docs, expanded the Performance and UX loop and Decision Content brief so rendered work must check grid symmetry, gutters, card containment, text-to-card ratios, CTA placement, orphan text, broken wrapping, and horizontal overflow across mobile, tablet, and desktop.
- Verification: `npm run qa:route -- --route /news/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `node --test tests\scripts\decision-loop.test.mjs tests\scripts\aipedia-loops.test.mjs`; `npm run loop:system -- --json`; `npm run loop:next -- --json`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: This codifies the standard and strengthens operator prompts, but true visual balance still needs human/browser judgment alongside route QA.
- Next: Apply this standard to every rendered page change, starting with the remaining June 22 hotfix and freshness work.

### 2026-06-22: Homepage Copy Density Pass

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Tightened homepage visible copy into smart one-line decision guidance; removed portal blurbs, news summaries, top-tool taglines, and long catalog blurbs; shortened homepage news labels, verified-guide copy, and trust copy so the first mobile pass is scannable without generic AI tells.
- Verification: `npm run ledger:pages`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; stale-copy `rg` sweep against `dist-fast\client\index.html` and `src\pages\index.astro`; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; live app-browser DOM inspection at `http://127.0.0.1:4321/?brand-check=lantern&copy-check=compact2` on the 319 px viewport.
- Residual risks: None known for homepage copy density. The broader June 21 to June 22 freshness goal remains active and dirty.
- Next: Keep this with the June 22 hotfix batch when committing, then finish the paused Claude and Claude Code freshness work.

### 2026-06-22: Homepage Verified Panel Restyle

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Fixed the reported homepage `Recently verified` panel style issue by replacing the broad orange-brown wash with a neutral charcoal panel, subtle cool highlight, and thin amber accent while keeping the guide cards readable and contained.
- Verification: `npm run ledger:pages`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run ledger:pages:check`; `git diff --check`; live browser DOM style and geometry inspection at `http://127.0.0.1:4321/` on the 319 px viewport.
- Residual risks: None known for this panel. The broader June 21 to June 22 freshness goal remains active and dirty.
- Next: Keep this with the June 22 hotfix batch when committing, then finish the paused Claude and Claude Code freshness work.

### 2026-06-22: Homepage Mobile Portal Containment

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Fixed the reported 319 px homepage portal overflow by switching the portal grid to two columns on very narrow screens and adding defensive text containment to portal meta/title labels.
- Verification: `npm run ledger:pages`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run ledger:pages:check`; `git diff --check`; live browser DOM geometry inspection at `http://127.0.0.1:4321/` on the 319 px viewport.
- Residual risks: None known for the portal card overflow. The broader June 21 to June 22 freshness goal remains active and dirty.
- Next: Keep this with the June 22 hotfix batch when committing, then finish the paused Claude and Claude Code freshness work.

### 2026-06-22: Homepage Decision Evidence Hardening

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Added registered, current, high-confidence evidence to the homepage decision paths that previously fell back to `No source attached` or `Unknown source`; added source-backed evidence for the featured general-assistant answer; added a homepage build assertion for featured decision cards; separated tool-page evidence confidence from editorial score confidence; and kept older price-history rows out of the live recommendation evidence freshness calculation.
- Verification: `node --test tests\scripts\search-catalog.test.mjs tests\scripts\generated-models.test.mjs`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; built-output text scan for bad evidence fallback labels; live browser DOM inspection at `http://127.0.0.1:4321/` on the 319 px viewport.
- Residual risks: The broader June 21 to June 22 freshness goal is still active. The paused Claude and Claude Code batch remains dirty and unfinished.
- Next: Keep this with the June 22 hotfix batch when committing, then finish the paused Claude and Claude Code freshness work before starting another content batch.

### 2026-06-21: Presentations.AI And MiniMax Freshness Pass

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed Presentations.AI integration, API, enterprise, pricing, and verification metadata; refreshed MiniMax M3, long-context, multimodal, coding, API, and pay-go pricing metadata; updated AI Presentation, AI Coding, AI Chatbots, and AI Research category surfaces; updated `src/data/source-registry.json`, `PAGE_REFRESH_LEDGER.md`, and `.agent/loop-runs/2026-06-21-presentations-ai-minimax-freshness.md`.
- Verification: `npm run check:smart:run`; `npm run loop:all -- --json`; `npm run loop:freshness -- --json`; `npm run audit:freshness -- --json`; `npm run audit:provenance:changed -- --json`; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: This is not whole-site completion. The active freshness goal continues through the June 21 to June 22 window, with Claude, Gemini, and Claude Code next in the due-soon queue.
- Next: Continue the active freshness goal, or run the top Decision Content recommendation `amazon-q-vs-github-copilot` if buyer-decision growth is prioritized.

### 2026-06-21: Gitignored Local Agent Artifacts

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `.agents/` and `skills-lock.json` to `.gitignore`, preserving `.agent/` as the canonical project memory folder; updated active continuity docs so future sessions understand the local-tooling distinction.
- Verification: `git status --short --branch`; `node scripts/check-smart.mjs --json`; `git diff --check`; `node scripts/guard-em-dashes.mjs`; `npm run check:smart:run`.
- Residual risks: None known. Local agent/plugin files stay available on this machine but no longer clutter raw git status.
- Next: Continue loop-system review only if a new noisy or ambiguous signal appears; otherwise move to the top real work queue.

### 2026-06-21: Explicit Loop Review Summary Counts

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Updated `scripts/aipedia-loops.mjs` so `review.summary` always states ok, attention, and skipped loop counts, including all-green runs; added regression coverage for attention and clean summaries; and updated loop continuity docs.
- Verification: `node --test tests/scripts/aipedia-loops.test.mjs`; `node scripts/aipedia-loops.mjs --all --run --json`; `npm run check:smart:run`; `npm run loop:all:record -- --json`.
- Residual risks: None known. This is a reporting-only loop-system improvement.
- Next: Continue reviewing for any remaining practical loop-system improvements.

### 2026-06-21: Check-Smart Local Artifact Noise Filter

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Updated `scripts/check-smart.mjs` so default dirty-path discovery filters local-only untracked `.agents/` and `skills-lock.json` artifacts, while preserving explicit paths, staged files, tracked diffs, and canonical `.agent/` project docs; added focused regression coverage; and updated the `.agent` continuity docs.
- Verification: `node --test tests/scripts/check-smart.test.mjs`; `node scripts/check-smart.mjs --json`; `npm run check:smart:run`; `npm run loop:all:record -- --json`.
- Residual risks: The filter is intentionally narrow. If local agent/plugin state ever becomes part of the actual repo, pass paths explicitly or stage the intended file so `check-smart` includes it.
- Next: Continue the goal by reviewing the latest system loop receipt for any remaining noisy, weak, or under-tested signals.

### 2026-06-21: Built-Output Freshness Attention Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Tightened `scripts/aipedia-loops.mjs` so built-output loop commands become `attention` when freshness is stale or unknown; added regression coverage for unknown freshness and compact `latest.json` receipts; updated loop docs to make the behavior explicit; and recorded a fresh system loop receipt.
- Verification: `node --test tests/scripts/aipedia-loops.test.mjs`; `npm run loop:all -- --json`; `npm run loop:all:record -- --json`; `npm run check:smart:run`.
- Residual risks: Build freshness is based on filesystem mtimes, so a clean `npm run build:fast` remains the right response whenever rendered-output confidence is uncertain.
- Next: Keep iterating the loop-system goal by reviewing the latest system receipt and improving noisy, weak, or under-tested loop signals.

### 2026-06-21: Loop Runner Recommendation And Ledger Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added ranked loop recommendations, built-output freshness checks, and opt-in system loop-run JSON receipts to `scripts/aipedia-loops.mjs`; added `npm run loop:all:record`; updated the loop registry with build freshness watch paths and ignored non-rendering loop data; added focused runner tests for stale builds and ledger writes; recorded the first `.agent/loop-runs/system/latest.json`; and updated README, script docs, and `.agent` operating docs.
- Verification: `node --test tests/scripts/aipedia-loops.test.mjs`; `npm run loop:all -- --json`; `npm run loop:all:record -- --json`.
- Residual risks: The system receipt is intentionally opt-in so casual loop checks remain read-only. Build freshness compares filesystem mtimes, so a clean rebuild is still the best answer when rendered-output confidence matters.
- Next: Use the ranked recommendation from the latest system receipt: begin `amazon-q-vs-github-copilot`, or refresh the top due freshness item if fact freshness is higher priority.

### 2026-06-21: Quality Pruning Workflow Policy Cleanup

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Deleted 19 invalid live comparison pages whose tools did not share an approved workflow lane; removed public links from affected tool pages, category pages, and curated comparison surfaces; regenerated `PAGE_REFRESH_LEDGER.md` and `src/data/coverage-backlog.json`; strengthened `scripts/audit-coverage-quality.mjs` to enforce `src/data/comparison-policy.json` workflow lanes; changed review-only coverage backlog entries to use `review_id` instead of route-style slugs; added focused comparison-quality and coverage-gap tests; re-anchored comparison inventory guards from 60 to 41 through accepted Guard Challenge records; and added link wrapping in `src/layouts/ComparisonLayout.astro` to prevent long source links from causing 360 px overflow.
- Verification: `npm run coverage:backlog`; deleted-route `rg` sweep over `src` and `PAGE_REFRESH_LEDGER.md`; `npm run loop:quality -- --json`; `npm run loop:all -- --json`; `node scripts/audit-coverage-quality.mjs --all --json`; `node scripts/guard-content.mjs --baseline --dry-run --json`; `node scripts/guard-content.mjs --json`; `node scripts/audit-site-kpis.mjs --json`; `node scripts/guard-stale-facts.mjs --json`; `node --test tests/scripts/audit-coverage-quality.test.mjs`; `node --test tests/scripts/audit-coverage-gaps.test.mjs`; `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/guard-content.test.mjs tests/scripts/guard-stale-facts.test.mjs tests/scripts/check-smart.test.mjs`; `npm run guard:challenge:check`; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run build:fast`; `npm run qa:route -- --route /compare/decktopus-vs-gamma/ --route /compare/decktopus-vs-pitch/`; `npm run check:smart:run`.
- Residual risks: `audit-site-kpis` still flags `neuronwriter-vs-surfer-seo` below the 700-word comparison KPI threshold, but the quality loop is green because the page clears required comparison-quality rules. Historical archives still mention deleted routes as past work.
- Next: Run the next Decision Content cycle, currently `amazon-q-vs-github-copilot`, with current June 2026 source verification before editing.

### 2026-06-21: Freshness Metadata Scheduling

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added missing `next_review_at` values to 17 high-volatility fact records across nine touched tool pages, backfilled missing `price_history[*].verified_at` metadata on those same touched pages from each page's existing `last_verified`, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-21-freshness-metadata-scheduling.md`.
- Verification: `npm run loop:freshness -- --json`; `npm run loop:all -- --json`; `npm run ledger:pages:check -- --date 2026-06-21`; `node scripts/audit-provenance-pricing.mjs --json --changed-file <nine changed tool pages>`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run check:smart:run -- --path <nine changed tool pages> --path PAGE_REFRESH_LEDGER.md`.
- Residual risks: This was scheduling/provenance metadata only, not a fresh source re-verification pass. The broad loop review now has one remaining attention loop: Quality Pruning, with 62 existing all-comparison quality failures.
- Next: Start the Quality Pruning cleanup batch, especially raw Markdown tables and missing required comparison sections.

### 2026-06-21: AiPedia Multi-Loop System

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `.agent/LOOPS.md`, `src/data/aipedia-loops.json`, `scripts/aipedia-loops.mjs`, focused tests, npm aliases for all seven loops, and orientation docs in README, script docs, project map, operating rules, status, and plans. The loop runner supports registry output, read-only execution, loop selection, built-output skips, attention totals, JSON summaries, sample failures, and top queue excerpts.
- Verification: `node --test tests/scripts/aipedia-loops.test.mjs`; `npm run loop:system -- --json`; `npm run loop:all -- --json`; `npm run audit:commands`; `npm run loop:quality -- --json`; `npm run check:quick`.
- Residual risks: The loop system is working, but it exposes real site debt: Freshness reports 17 high-volatility facts missing `next_review_at`, and Quality Pruning reports 62 comparison-quality failures.
- Next: Run a Quality Pruning cleanup batch or schedule the missing high-volatility review dates, then rerun `npm run loop:all -- --json`.

### 2026-06-21: Activepieces Vs Zapier Loop Cycle And Selector Hardening

- Status: Complete and pushed.
- Commit: `b2fd03c5`.
- Branch: `master`.
- Changed: Added `src/content/comparisons/activepieces-vs-zapier.md`; refreshed Activepieces and Zapier current June 2026 facts where verified; expanded `src/data/comparison-policy.json` with explicit workflow-family lanes for broad categories; regenerated `src/data/coverage-backlog.json`; repaired post-cleanup guard and test fixtures through an accepted Guard Challenge; converted changed live comparison tables to mobile-safe stacked bullets; backfilled missing historical `price_history[*].verified_at` values on changed tool pages from each page's existing `last_verified`; added missing provenance metadata discovered by changed-file audits; fixed 360 px overflow on `/tools/pika/`; and recorded `.agent/loop-runs/2026-06-21-activepieces-vs-zapier.md`.
- Verification: `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/guard-content.test.mjs tests/scripts/guard-stale-facts.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`; `node --test tests/scripts/audit-coverage-gaps.test.mjs tests/scripts/decision-loop.test.mjs`; `npm run guard:challenge:check`; `npm run coverage:backlog`; `npm run coverage:next -- --json --count 20`; `npm run loop:next -- --json`; `node scripts/audit-provenance-pricing.mjs --json --changed-file <changed tool paths>`; `node scripts/audit-coverage-quality.mjs --changed-file <changed live comparison paths>`; `npm run build:fast`; `npm run qa:route -- --route /tools/pika/ --widths 360 --site-dir dist-fast/client`; `npm run loop:verify -- --date 2026-06-21 --slug activepieces-vs-zapier --route /compare/activepieces-vs-zapier/ --paths <changed paths> --json`.
- Residual risks: Five preexisting live comparison pages remain under the thin-content word threshold. Historical price-history provenance backfills record existing page verification dates and are not fresh fact refreshes. The full verifier passed but took about 8 minutes for the mixed content, guard, build, and route-QA cycle.
- Next: `npm run loop:next -- --json` selects `amazon-q-vs-github-copilot`; verify June 2026 Amazon Q Developer and GitHub Copilot facts before editing.

### 2026-06-21: Activepieces Vs n8n Loop Cycle

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/activepieces-vs-n8n.md`; refreshed Activepieces, n8n, AI Automation, Lindy buyer-path links, the automation buyer guide link surface, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; removed remaining public references to deleted cross-workflow comparison routes; removed `lovable-vs-bolt-vs-v0` from the legacy compare priority list; and updated KPI, stale-fact, and smart-check tests that still assumed the old false-vs comparison inventory and deleted comparison routes.
- Verification: `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/guard-stale-facts.test.mjs`; `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run loop:verify -- --date 2026-06-21 --route /compare/activepieces-vs-n8n/ --path <changed paths>`.
- Residual risks: The full loop is reliable but still slow when script-test and runtime page paths are touched. This pass took about 267 seconds, with `check-smart --run` at 263.4 seconds, broad `smoke:visual` at 42.7 seconds, and exact combined route QA at 49.4 seconds.
- Next: `npm run loop:next -- --json` selects `activepieces-vs-zapier`, another same-category AI Automation comparison. Verify Zapier current facts before editing.

### 2026-06-21: Strict Same-Category Comparison Cleanup

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Deleted 179 comparison files, removed public links to those deleted routes, removed the adjacent-workflow allowlist from `src/data/comparison-policy.json`, added 127 blocked pairs for known same-category false-vs traps, hardened `coverage:backlog`, `coverage:next`, and `loop:next` so they select only same-primary-category pairs that are not blocked, regenerated `src/data/coverage-backlog.json` and `PAGE_REFRESH_LEDGER.md`, and rewrote the active `.agent` docs around the stricter policy. The Mistral AI and Poe tool/source refreshes remain, but `mistral-ai-vs-poe` is now blocked and deleted as a direct comparison page. Removed multi-tool pages such as `lindy-vs-zapier-vs-n8n` and `lovable-vs-bolt-vs-v0` should be rebuilt later only as focused two-tool direct-substitute pages.
- Verification: `npm run coverage:backlog`; `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run ledger:pages`; `npm run loop:next -- --json`; one-off inventory audit proving no cross-primary comparison files remain; `rg` over `src` and `PAGE_REFRESH_LEDGER.md` proving no public links to deleted routes remain; `node --test tests/scripts/audit-coverage-gaps.test.mjs tests/scripts/decision-loop.test.mjs tests/scripts/loop-hardening.test.mjs`; `node scripts/guard-em-dashes.mjs`.
- Residual risks: Historical archive docs still mention deleted routes as past work. Treat those as history only. A future content pass can remove or rewrite plain-text historical references in public category prose where they no longer add value.
- Next: Superseded by the Activepieces vs n8n loop cycle. Current next target is `activepieces-vs-zapier`.

### 2026-06-21: False-Vs Comparison Policy Cleanup

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Deleted five definite false-vs comparison pages, removed their visible internal links, added the first `src/data/comparison-policy.json`, changed coverage and loop tooling so false-vs candidates were not auto-selected, regenerated `src/data/coverage-backlog.json`, updated active loop docs, and moved Astro markdown plugins to `processor: unified(...)` so the build no longer emits the old markdown plugin deprecation warning. This entry is superseded by the stricter same-primary-category cleanup above.
- Verification: `node --test tests/scripts/loop-hardening.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/audit-coverage-gaps.test.mjs tests/scripts/decision-loop.test.mjs`; `npm run coverage:backlog`; `node scripts/decision-loop.mjs --json`; `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run build:fast`; `$env:AIPEDIA_LEDGER_DATE='2026-06-21'; npm run check:smart:run`.
- Residual risks: Superseded. Borderline historical cross-category comparison pages were later removed instead of allowed.
- Next: Superseded by the Activepieces vs n8n loop cycle. Current next target is `activepieces-vs-zapier`.

### 2026-06-21: Operator Surface Route QA Contract

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Moved exact parent-hub route QA targets and the content-only broad visual smoke replacement rule into `src/data/operator-surfaces.json`; updated `scripts/check-smart.mjs` to consume the contract instead of hardcoded route and path allowlists; added focused tests proving the contract exists and still preserves broad visual smoke when tooling or runtime paths are part of the change.
- Verification: `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs tests/scripts/playwright-config.test.mjs`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `node scripts/check-smart.mjs --json --path src/content/comparisons/descript-vs-grok.md --path src/pages/compare/index.astro --path src/data/operator-surfaces.json`.
- Residual risks: The next performance bottleneck appears to be `build:fast`, which took 126.2 seconds in the latest full cycle. `descript-vs-grok` was later blocked by comparison policy as a false-vs secondary-overlap pair.
- Next: Superseded by the Activepieces vs n8n loop cycle. Current next target is `activepieces-vs-zapier`.

### 2026-06-20: DeepSeek Vs Replit Agent Loop Cycle

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/deepseek-vs-replit-agent.md`; refreshed DeepSeek, Replit Agent, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; added the `deepseek-v4-release-note` source registry row; added `.agent/loop-runs/2026-06-20-deepseek-vs-replit-agent.md`; confirmed the cycle used exact route QA instead of broad visual smoke for this content-only route set.
- Verification: `npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/deepseek-vs-replit-agent/ --path <changed paths>`.
- Residual risks: Known Astro markdown plugin deprecation warning remains. The content-only broad-smoke replacement is reliable in tests, but the rule should move into `src/data/operator-surfaces.json` or another contract-level surface model so future agents do not have to infer it from script internals.
- Next: Superseded by comparison-policy cleanup; `descript-vs-grok` is blocked unless policy is deliberately changed.

### 2026-06-20: Content Route Smoke Replacement

- Status: Complete.
- Commit: `3803ddad fix: replace broad smoke for content route loops`.
- Branch: `master`.
- Changed: Updated `scripts/check-smart.mjs` so content-only rendered route cycles can replace broad `smoke:visual` with exact route QA; added parent hub route QA mapping for `/categories/`, `/compare/`, and `/tools/`; sorted route QA commands; exposed `broad_smoke_replaced_by_route_qa` in the smart-check plan; added focused tests.
- Verification: `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs tests/scripts/playwright-config.test.mjs`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: The next cleanup should move the replacement rule out of hardcoded script allowlists and into an explicit operator-surface contract.
- Next: Validate the change in the next full loop cycle, which completed with `deepseek-vs-replit-agent`.

### 2026-06-20: DeepSeek Vs GitHub Copilot Loop Cycle And Route QA Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/deepseek-vs-github-copilot.md`; refreshed DeepSeek, GitHub Copilot, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; updated GitHub Copilot guidance for gradual signup reopening, Copilot app GA, AI Credits usage reporting, `AGENTS.md` code-review support, MAI-Code-1-Flash expansion, and Fable 5 suspension caveats; hardened Playwright reuse so browser checks use fresh `dist-fast/client`; made `check-smart --run` execute one combined route QA command for changed tool, category, and comparison routes; allowed local static QA to ignore the hosted reviews API miss; made `loop:verify` recognize combined smart route QA so it does not run a duplicate fallback route.
- Verification: `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs tests/scripts/playwright-config.test.mjs`; `npm run audit:provenance:changed`; `npm run audit:coverage-quality:changed`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/deepseek-vs-github-copilot/ --path <changed paths>`.
- Residual risks: The full verifier is safer but still slow. Final pass was about 251 seconds, with `check-smart --run` at 247.4 seconds, global `smoke:visual` at 47.0 seconds, and exact combined route QA for four routes at 26.1 seconds. Known Astro markdown plugin deprecation warning remains.
- Next: Run `deepseek-vs-replit-agent` as the next Decision Content Flywheel cluster. The next loop-performance opportunity is to split content-route QA from broad `smoke:visual` when no runtime template, layout, component, style, or config changed.

### 2026-06-20: Cursor Vs Grok Loop Cycle And Verifier Ordering Fix

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/cursor-vs-grok.md`; refreshed Cursor, Grok, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; corrected over-specific xAI Responses API retention wording after current docs proved the storage opt-out but not the old exact 30-day wording; added `.agent/loop-runs/2026-06-20-cursor-vs-grok.md`; updated `check-smart --run` so `build:fast` runs before `smoke:visual` and route QA, and each command prints a duration.
- Verification: `npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/cursor-vs-grok/ --path <changed paths>`; `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`.
- Residual risks: Full loop verification still takes about 232 seconds, with `check-smart --run` taking 228.9 seconds and `build:fast` reporting about 2 minutes 24 seconds. Build still emits the known Astro markdown plugin deprecation warning.
- Next: Run `deepseek-vs-github-copilot` as the next Decision Content Flywheel cluster. Use the new `check-smart --run` per-command timings to decide whether content-only loops can split from broad script/build verification.

### 2026-06-20: Cursor Vs DeepSeek Loop Cycle And Verifier Env Fix

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/cursor-vs-deepseek.md`; refreshed Cursor, DeepSeek, AI Coding, compare/tools/categories top-layer metadata, LLM surfaces, source registry, coverage backlog, and page refresh ledger rows; corrected stale DeepSeek V4 open-weight wording; added `.agent/loop-runs/2026-06-20-cursor-vs-deepseek.md`; scoped `AIPEDIA_FAST_BUILD=1` in `loop:verify` and `check-smart --run` so unit-test fixtures do not inherit fast-build mode while build and route QA still use fast output.
- Verification: `node --test tests/scripts/check-dist-budget.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`; `npm run audit:provenance:changed`; `npm run audit:coverage-quality:changed`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run loop:verify -- --date 2026-06-20 --route /compare/cursor-vs-deepseek/ --path <changed paths>`.
- Residual risks: Build still emits the known Astro markdown plugin deprecation warning. The verified loop took about 234 seconds, with the smart-verification block at 230.7 seconds and build-fast reporting about 2 minutes 23 seconds.
- Next: Run `cursor-vs-grok` as the next Decision Content Flywheel cluster, and consider reducing loop wall time by splitting content verification from broad script/build verification when only content paths changed.

### 2026-06-21: Decision Loop Review Fixes

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Fixed loop review findings by preserving comma-containing check text in `loop:record`, making changed comparison route QA executable through `check:smart:run`, preventing fallback `build:fast` for non-rendered loop verification, reducing duplicated loop checks, and adding per-command timing to `loop:verify`.
- Verification: `node --test tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`.
- Residual risks: `check:smart:run` now runs built route QA for changed comparison pages, so comparison content verification is more complete but still intentionally heavier than docs-only checks.
- Next: Run the next Decision Content Flywheel cycle for `cursor-vs-deepseek`, then review loop timings and reliability again.

### 2026-06-21: Decision Loop Verification Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `npm run loop:verify`, `npm run qa:route`, `npm run loop:record`, `.agent/loop-runs/` receipts, changed-route smart-check guidance, and raw Markdown table rejection for changed comparison pages. Updated the active loop spec, script docs, README, and `.agent` source-of-truth files.
- Verification: `node --test tests/scripts/decision-loop.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/audit-coverage-quality.test.mjs tests/scripts/loop-hardening.test.mjs`; `node scripts/qa-route.mjs --route /compare/claude-vs-replit-agent/ --widths 360 --site-dir dist-fast/client`; `npm run guard:challenge:check`; `npm run check:quick`; `git diff --check`.
- Residual risks: `qa:route` requires a built static output, normally from `npm run build:fast` or `npm run build`. It does not replace source verification or editorial judgment.
- Next: Run the next Decision Content Flywheel cycle, `cursor-vs-deepseek`, with `loop:verify` and `loop:record`.

### 2026-06-20: Claude Vs Replit Agent Loop Cycle

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added `src/content/comparisons/claude-vs-replit-agent.md`, refreshed Replit Agent, Claude related links, AI Coding, compare/tools/categories top-layer metadata, source registry, LLM surfaces, coverage backlog, and page refresh ledger rows. Corrected Replit App Testing wording to the current web-app-only scope and replaced mobile-hostile comparison tables with stacked decision bullets.
- Verification: `npm run test:scripts`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run ledger:pages`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run ledger:pages:check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run guard:check`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run check:smart:run -- --path <changed paths>`; `$env:AIPEDIA_LEDGER_DATE='2026-06-20'; npm run build:fast`; `npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed`; `npm run audit:facts`; `npm run audit:tool-quality -- --file src/content/tools/replit-agent.md`; `npm run audit:tool-quality -- --file src/content/tools/claude.md`; `npm run check:links`; Playwright route QA for `/compare/claude-vs-replit-agent/` at 360, 390, 430, 768, 1024, and 1366 px.
- Residual risks: Plain local ledger/build/guard commands still need `AIPEDIA_LEDGER_DATE=2026-06-20` during this date-bound run because the local shell clock is 2026-06-21. Build output still emits the known Astro markdown plugin deprecation warning. Local static route QA sees benign 404s for Vercel analytics scripts that are supplied by Vercel in hosted contexts.
- Next: Run the next Decision Content Flywheel cycle for `cursor-vs-deepseek`.

### 2026-06-20: Decision Loop QA Hardening

- Status: Complete and pushed.
- Commit: this commit.
- Branch: `master`.
- Changed: Hardened `npm run loop:next` so each brief includes stale-backlog warnings, source-registry inspection, related-surface discovery sweeps, and rendered route QA at 360, 390, 430, 768, 1024, and 1366 px. Updated the loop spec and `.agent` docs so desktop QA is recorded alongside mobile and tablet QA.
- Verification: `node --test tests/scripts/decision-loop.test.mjs`, `git diff --check`, em-dash sweep over touched docs/scripts, `npm run check:quick`.
- Residual risks: The route QA requirement is now in the brief and docs, but the command still does not automate browser screenshots by itself.
- Next: Run `claude-vs-replit-agent` with current sources and record route QA at every listed width.

### 2026-06-20: First Decision Content Loop Cycle, Canva Vs Claude

- Status: Complete and pushed.
- Commit: this commit.
- Branch: `master`.
- Changed: Added the `canva-vs-claude` comparison, refreshed Canva, Claude, Claude Code, Anthropic, AI design, AI coding, developer guide, Copilot alternatives, May Agent SDK news correction, source registry, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`. Corrected the stale Claude Agent SDK credit claim to match current Anthropic help guidance that the June 15 Agent SDK usage changes are paused.
- Verification: `npm run check:quick`, `npm run loop:next -- --json`, `npm run ledger:pages:check`, `npm run audit:coverage-quality:changed`, `npm run audit:provenance:changed`, `npm run audit:facts`, `npm run check:links`, `npm run check:smart:run -- --path <changed paths>` with `build:fast` completing in 2 minutes 13 seconds.
- Residual risks: Existing Astro markdown plugin deprecation warning remains. Public content dates use `2026-06-20` because repo guards use the US/UTC project date while the local New Zealand shell clock showed `2026-06-21`. Individual news articles remain excluded from `PAGE_REFRESH_LEDGER.md` by the ledger generator's current design.
- Next: Run the next loop target, `claude-vs-replit-agent`, with current June 2026 Claude and Replit Agent sources.

### 2026-06-21: Decision Content Loop

- Status: Complete and begun.
- Commit: this commit.
- Branch: `master`.
- Changed: Added the AiPedia decision content loop spec, `npm run loop:next`, tests, script docs, and agent operating guidance. The first loop cycle is selected as `canva-vs-claude` unless the coverage backlog changes or that page already exists.
- Verification: `npm run loop:next -- --json`, `node --test tests/scripts/decision-loop.test.mjs`, `git diff --check`, em-dash sweep over touched docs/scripts, `npm run check:quick`.
- Residual risks: The loop chooses and briefs clusters, but it intentionally does not automate live web research or editorial judgment. Content cycles still require current-source verification before facts are edited.
- Next: Run the first `canva-vs-claude` cycle with current June 2026 Canva and Claude sources, then update parent hubs and ledger rows.

### 2026-06-22: News Gap And Lantern Logo Hotfix

- Status: Complete in this batch.
- Commit: this commit.
- Branch: `master`.
- Changed: Replaced the visible blue/cyan brand regression with the selected lantern logo, removed the old nav hue filter that recolored the logo blue, regenerated favicon and brand assets, deleted cyan brand PNGs, added June 18 through June 22 news coverage, regenerated news OG assets and the page refresh ledger, and recorded `.agent/loop-runs/2026-06-22-news-logo-hotfix.md`.
- Verification: `node scripts/guard-em-dashes.mjs`; `node scripts/audit-news-rendering.mjs`; `node scripts/audit-news-xrefs.mjs`; `node scripts/prep-favicons.mjs --check --json`; `node scripts/generate-og-news.mjs --check <June 18-22 slugs>`; `node scripts/generate-og-svgs.mjs --check --limit 20 --json`; `node scripts/generate-logo-manifest.mjs --check`; `node --test tests\scripts\prep-favicons.test.mjs tests\scripts\generate-og-news.test.mjs`; `node scripts\optimize-og-images.mjs --check --limit 20 --json`; `npm run ledger:pages:check`; `git diff --check`; `npm run build:fast`; `npm run qa:route -- --route / --widths 360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run qa:route -- --route /news/ --widths 360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run typecheck`; `npm run check:links`.
- Residual risks: None blocking. The lantern logo palette was later normalized by the Claude completion pass so visual smoke accepts both nav and favicon rasters.
- Next: Continue from the newest work-log entries for the final June 22 batch status.

### 2026-06-21: Build-Time Diagnosis And Next-Step Recommendation

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Measured local `build:fast` and full `build`, normalized the stale page refresh ledger, recorded the build bottlenecks, and added the recommended next product sprint to active project docs.
- Verification: `npm run ledger:pages:check`, `npm run build:fast` passed in 191.31 seconds, `npm run build` passed in 214.37 seconds, `git diff --check`, `npm run check:quick`.
- Residual risks: Full local build time is still about 3.5 minutes. Astro markdown plugin deprecation warnings remain. Pagefind output is near the 10 MB budget, and large search/archive payloads are likely worth future trimming.
- Next: Start the focused `canva-vs-claude` comparison sprint, or do a small build-performance pass that adds phase timing and trims Pagefind/search payload growth.

### 2026-06-22: CodeRabbit, Cody, Comet, D-ID, Hedra Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Refreshed CodeRabbit, Cody, Comet, D-ID, and Hedra against current June 22 primary sources, updated affected AI Coding, AI Search, AI Video, AI Voice, code review, and avatar video surfaces, refreshed relevant source registry checks, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-22-coderabbit-cody-comet-d-id-hedra-batch.md`.
- Verification: `npm run tool:refresh:batch:check -- --file src\content\tools\coderabbit.md --file src\content\tools\cody.md --file src\content\tools\comet.md --file src\content\tools\d-id.md --file src\content\tools\hedra.md --json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/coderabbit/ --route /categories/ai-coding/ --route /tools/cody/ --route /tools/comet/ --route /categories/ai-search/ --route /tools/d-id/ --route /categories/ai-video/ --route /tools/hedra/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `node scripts\guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: Full freshness is still incomplete across the whole tool inventory. Continue the active `/goal` with Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, and Qodo.
- Next: Push this batch, then start the next oldest-first five-tool batch.

### 2026-06-22: Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, Qodo Batch

- Status: Complete and verified.
- Commit: this commit.
- Branch: `master`.
- Changed: Refreshed Mastra, Microsoft Agent Framework, Midjourney, NotebookLM, and Qodo against current June 22 primary sources; updated AI Coding, AI Automation, AI Image, AI Notes, the code-review guide, source registry rows, and `PAGE_REFRESH_LEDGER.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\mastra.md --file src\content\tools\microsoft-agent-framework.md --file src\content\tools\midjourney.md --file src\content\tools\notebooklm.md --file src\content\tools\qodo.md --json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/mastra/ --route /categories/ai-coding/ --route /tools/microsoft-agent-framework/ --route /categories/ai-automation/ --route /tools/midjourney/ --route /categories/ai-image/ --route /tools/notebooklm/ --route /categories/ai-notes/ --route /tools/qodo/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: Full freshness is still incomplete across the whole tool inventory.
- Next: Rerun `npm run tool:refresh:batch -- --limit 5 --json` for the next oldest-first batch.

### 2026-06-21: Vercel CLI Install And Warning Classification

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Recorded that global `vercel@54.14.2` is installed and classified the npm deprecation warnings as upstream Vercel CLI transitive dependency warnings, not AiPedia repo dependency drift.
- Verification: `vercel --version`, `npm ls -g vercel stream-to-promise tar --depth=6`, `npm view vercel@latest version dependencies.@vercel/fun dependencies.@vercel/backends --json`, `git diff --check`, `npm run check:quick`.
- Residual risks: Vercel CLI currently pins `@vercel/fun@1.3.0`, which pulls `stream-to-promise@2.2.0` and `tar@7.5.7`; `tar@7.5.7` also appears through `@vercel/backends -> @vercel/nft -> @mapbox/node-pre-gyp`. Wait for a Vercel CLI release that bumps those transitive dependencies rather than hand-editing global `node_modules`.
- Next: Use `vercel` for local Vercel workflows after login/linking. Periodically rerun `npm i -g vercel@latest` and verify whether the warnings disappear.

### 2026-06-20: Continuity System Hardening

- Status: Complete.
- Commit: this commit.
- Branch: `master`.
- Changed: Added the work log, clarified the source-of-truth stack, and made status recording a required closeout step for future agents.
- Verification: `git diff --check`, `npm run check:quick`.
- Residual risks: Work-log entries are human-maintained and should be checked against Git history when exact file-level proof matters.
- Next: Future major work should update `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and this file before final report.

### 2026-06-20: Project Status Handoff

- Status: Complete and pushed.
- Commit: `ab0502cb docs: update project status handoff`.
- Branch: `master`.
- Changed: Added `.agent/CURRENT_STATUS.md`, trimmed `.agent/PLANS.md`, updated orientation docs, archived completed-plan summaries, and marked the June standards remediation spec complete.
- Verification: `git diff --check`, `npm run check:quick`.
- Residual risks: Local ignored Superpowers docs may still contain historical checklist wording. The committed `.agent/` docs are canonical.
- Next: Use `.agent/CURRENT_STATUS.md` as the first file in future sessions.

### 2026-06-20: June Standards Remediation

- Status: Complete and pushed.
- Commit: `3355ce1d fix: remediate June standards review`.
- Branch: `master`.
- Changed: Closed June standards findings across Semrush duplication, affiliate gating, disclosure proximity, mobile first-screen law, link coverage, source/provenance row freshness, changed-page quality gating, Node/build/CI alignment, Pagefind/dist checks, lint/typecheck gates, top-layer/LLM coverage, nav semantics, and commercial CTA audit coverage.
- Verification: `npm run check:ci` passed twice, plus focused provenance, coverage, ledger, commercial CTA, command, and diff checks.
- Residual risks: GitHub stats used stale cached fallback data during `npm run check:ci` because the GitHub API returned a 403 rate-limit response. Existing Astro markdown plugin deprecation warnings remain.
- Next: Continue current active lanes rather than restarting the remediation spec.

### 2026-06-20: Ops Efficiency Tooling

- Status: Complete and pushed.
- Commit: `af00cf70 feat: add ops efficiency tooling`.
- Branch: `master`.
- Changed: Added `npm run ops:dashboard`, expanded `check-smart`, improved operator docs, and added tests for the new dashboard and verification-routing behavior.
- Verification: Covered by script tests and later `npm run check:ci` during standards remediation.
- Residual risks: Vercel CLI was not installed at the time of this commit. It is now installed globally as recorded in the 2026-06-21 work-log entry.
- Next: Use `npm run ops:dashboard` for read-only branch, worktree, PR, issue, and audit summaries.

### 2026-06-20: Guard Challenge Workflow

- Status: Complete and pushed.
- Commit: `cd6ff483 Merge pull request #43 from mustbearnold/codex/guard-challenge-workflow`.
- Branch: `master`.
- Changed: Added `.agent/guard-challenges/README.md`, `scripts/guard-challenge.mjs`, tests, command-surface invariants, and `check-smart` routing for guard/audit/check edits.
- Verification: Guard challenge tests, command-surface tests, `npm run guard:challenge:check`, `npm run test:scripts`, `npm run audit:commands`, and later CI gates.
- Residual risks: The workflow is intentionally procedural. It does not automate subagent debate.
- Next: Use it only when a guard, audit, check, or fixture may need to change.

### 2026-06-17: Folder Tidy And June 17 News Catch-Up

- Status: Complete and pushed.
- Commit: `1c109370 chore: tidy repo and refresh June 17 coverage`.
- Branch: `master`.
- Changed: Archived old agent plans, cleaned active `.agent/` surfaces, added June 17 news desk and focused stories, and updated news/ledger/crawl surfaces.
- Verification: Covered by the associated branch checks and later remediation CI.
- Residual risks: Historical archived entries are intentionally long. Do not load the archive by default.
- Next: Keep `.agent/PLANS.md` short and current.

### 2026-06-22: Augment, Base44, BLACKBOX, Captions, Cline Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Cleaned active `.agent` handoff docs, refreshed Augment Code, Base44, BLACKBOX AI, Captions.ai, and Cline against current June 22 sources, updated AI Coding, AI Design, and AI Video hubs, added Base44 cost-guide provenance, normalized historical price-history `verified_at` fields, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-22-augment-base44-blackbox-captions-cline-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\augment-code.md --file src\content\tools\base44.md --file src\content\tools\blackbox-ai.md --file src\content\tools\captions.md --file src\content\tools\cline.md --json`; `npm run build:fast`; `npm run typecheck`; `npm run qa:route -- --route /tools/augment-code/ --route /categories/ai-coding/ --route /tools/base44/ --route /categories/ai-design/ --route /tools/blackbox-ai/ --route /tools/captions/ --route /categories/ai-video/ --route /tools/cline/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `node scripts\guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: `typecheck` and `build:fast` passed only when run sequentially. Running them in parallel caused an Astro `node_modules/.astro/data-store.json` rename race, so the loop docs now warn against parallelizing those two commands.
- Next: Continue the oldest-first batch with CodeRabbit, Cody, Comet, D-ID, and Hedra.

### 2026-06-22: Grok, Cursor, Lindy, n8n, Mistral AI Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Refreshed Grok, Cursor, Lindy, n8n, and Mistral AI against current June 22 sources, updated AI Chatbots, AI Coding, and AI Automation parent hubs, refreshed source-registry rows, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-22-grok-cursor-lindy-n8n-mistral-ai-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\grok.md --file src\content\tools\cursor.md --file src\content\tools\lindy.md --file src\content\tools\n8n.md --file src\content\tools\mistral-ai.md --json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/grok/ --route /categories/ai-chatbots/ --route /tools/cursor/ --route /categories/ai-coding/ --route /tools/lindy/ --route /categories/ai-automation/ --route /tools/n8n/ --route /tools/mistral-ai/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `npm run ledger:pages:check`; `git diff --check`.
- Residual risks: The goal remains active because the next freshness batch is already queued. Continue current-source checks before editing Argil, Canva, Replit Agent, Claude, and Gemini.
- Next: Continue the oldest-first batch with Argil, Canva, Replit Agent, Claude, and Gemini.

### 2026-06-22: Argil, Canva, Replit Agent, Claude, Gemini Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Refreshed Argil, Canva, Replit Agent, Claude, and Gemini against current June 22 sources, updated AI Video, AI Design, AI Coding, and AI Chatbots parent hubs, refreshed source-registry rows, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-22-argil-canva-replit-agent-claude-gemini-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\argil.md --file src\content\tools\canva.md --file src\content\tools\replit-agent.md --file src\content\tools\claude.md --file src\content\tools\gemini.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/argil/ --route /categories/ai-video/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/replit-agent/ --route /categories/ai-coding/ --route /tools/claude/ --route /categories/ai-chatbots/ --route /tools/gemini/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: The goal remains active. The next planner queue is due-soon rather than due-now, and starts with Claude, Gemini, Grok, n8n, and Claude Code because short review windows and comparison mentions keep them high priority.
- Next: Continue the batched freshness loop until every tracked tool page has been refreshed.

### 2026-06-23: Daily Model, Homepage, And News Cadence

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Rebuilt `/trends/model-availability-churn/` as a simple daily availability ledger for frontier and widely used models, set the trend record to `update_frequency: daily`, marked homepage and `/news/` route metadata as daily-refresh surfaces, added hidden `UpdateFrequency` metadata to homepage and news, updated `/trends/`, LLM surfaces, and `PAGE_REFRESH_LEDGER.md`, and created Codex app automation `daily-aipedia-news-and-model-availability-refresh`.
- Verification: `npm run ledger:pages`; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `node scripts/audit-news-rendering.mjs`; `git diff --check`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /trends/model-availability-churn/ --route /trends/ --route / --route /news/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: This pass did not add three June 23 news stories immediately; the new daily automation is what enforces that recurring news-production requirement.
- Next: Resume the active tool-page freshness goal after the user-facing page-policy interruption.

### 2026-06-23: Claude, Decktopus, Gemini, Grok, n8n Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Refreshed Claude, Decktopus, Gemini, Grok, and n8n against current June 2026 sources, updated AI Chatbots, AI Presentation, and AI Automation parent hubs, refreshed source-registry rows, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-23-claude-decktopus-gemini-grok-n8n-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\claude.md --file src\content\tools\decktopus.md --file src\content\tools\gemini.md --file src\content\tools\grok.md --file src\content\tools\n8n.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/claude/ --route /categories/ai-chatbots/ --route /tools/decktopus/ --route /categories/ai-presentation/ --route /tools/gemini/ --route /tools/grok/ --route /tools/n8n/ --route /categories/ai-automation/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: The goal remains active. The next planner queue is due-soon rather than due-now, and starts with Claude Code, GitHub Copilot, Grammarly, Mistral AI, and Qwen.
- Next: Continue the batched freshness loop until every tracked tool page has been refreshed.

### 2026-06-23: Claude Code, GitHub Copilot, Grammarly, Mistral AI, Qwen Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Refreshed Claude Code, GitHub Copilot, Grammarly, Mistral AI, and Qwen against current June 2026 sources, updated AI Coding, AI Writing, and AI Chatbots parent hubs, refreshed source-registry rows, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-23-claude-code-github-copilot-grammarly-mistral-ai-qwen-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\claude-code.md --file src\content\tools\github-copilot.md --file src\content\tools\grammarly.md --file src\content\tools\mistral-ai.md --file src\content\tools\qwen.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/claude-code/ --route /categories/ai-coding/ --route /tools/github-copilot/ --route /tools/grammarly/ --route /categories/ai-writing/ --route /tools/mistral-ai/ --route /categories/ai-chatbots/ --route /tools/qwen/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: The goal remains active. The next planner queue is due-soon rather than due-now, and starts with Capacities, Consensus, Cursor, Hailuo, and HeyGen.
- Next: Continue the batched freshness loop until every tracked tool page has been refreshed.

### 2026-06-23: MiniMax Speech, Modal, Morphic, Mubert, Murf Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `master`.
- Changed: Refreshed MiniMax Speech, Modal, Morphic, Mubert, and Murf against current June 23 sources; updated AI Voice, AI Infrastructure, AI Coding, AI Automation, AI Search, AI Chatbots, AI Music, Best AI Voice Generator for YouTube, Best AI Music Generator, and Suno Alternatives surfaces; refreshed source-registry rows; regenerated `PAGE_REFRESH_LEDGER.md`; and recorded `.agent/loop-runs/2026-06-23-minimax-speech-modal-morphic-mubert-murf-batch.md`.
- Verification: `npm run tool:refresh:batch:check -- --file src\content\tools\minimax-speech.md --file src\content\tools\modal.md --file src\content\tools\morphic.md --file src\content\tools\mubert.md --file src\content\tools\murf.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/minimax-speech/ --route /tools/modal/ --route /tools/morphic/ --route /tools/mubert/ --route /tools/murf/ --route /categories/ai-voice/ --route /categories/ai-infrastructure/ --route /categories/ai-coding/ --route /categories/ai-automation/ --route /categories/ai-search/ --route /categories/ai-chatbots/ --route /categories/ai-music/ --route /guides/best-ai-voice-youtube/ --route /guides/best-ai-music-generator/ --route /guides/suno-alternatives/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: 127 tracked tool pages remain below the June 23 refresh date. Mubert exact self-serve prices still need live flow confirmation before procurement, as documented in content.
- Next: Continue with NanoChat, Napkin AI, NeuronWriter, NightCafe, and Notion AI.

### 2026-06-24: Jun 23-24 Focused AI News Coverage

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Added five individual source-backed news articles for Jun 23-24 coverage without adding a daily desk page: OpenAI Daybreak/Codex Security, Samsung ChatGPT Enterprise and Codex, Claude reliability incidents, GLM-5.2 open-model pressure, and Google AI talent movement. Updated `/news/`, homepage, RSS, LLM surfaces, generated news OG assets, and regenerated `PAGE_REFRESH_LEDGER.md`.
- Verification: `node scripts\guard-em-dashes.mjs`; `npm run ledger:pages:check`; `npm run check:news`; `node scripts\audit-news-rendering.mjs --json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /news/ --route / --route /news/2026-06-23-openai-daybreak-codex-security/ --route /news/2026-06-23-samsung-chatgpt-codex-enterprise/ --route /news/2026-06-23-claude-error-rate-fallback-planning/ --route /news/2026-06-24-zai-glm-52-open-model-pressure/ --route /news/2026-06-24-google-ai-talent-openai-anthropic/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Residual risks: GLM-5.2 coverage relies on named reporting rather than a directly opened Z.ai primary release page because current search did not surface a stable official announcement page. The article avoids unsupported benchmark claims and frames it as market pressure.
- Next: Resume NanoChat, Napkin AI, NeuronWriter, NightCafe, and Notion AI freshness unless a newer user request supersedes it.

### 2026-06-24: Shared Tool Page Decision Spine

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Migrated the shared tool detail template to the new default flow: hero, decision card, plan guidance, fit, recent changes, alternatives, related comparisons, collapsed proof/score math, and collapsed full review notes. Hid reader reviews unless approved reviews exist, normalized older source-registry rows required by script tests, contained `/search/` quick chips on mobile, updated homepage smoke expectations for value labels, and made top-layer card outlines neutral by default.
- Verification: `npm run ledger:pages`; `npm run typecheck`; `npm run test:scripts`; `npm run build:fast`; `npm run smoke:visual`; `npm run qa:route -- --route /tools/chatgpt/ --route /tools/claude/ --route /tools/cursor/ --route /tools/midjourney/ --route /tools/notion-ai/ --route /tools/watsonx-orchestrate/ --route /tools/ --route /compare/ --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`; `node scripts\guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: `/search/` is intentionally noindex, so it should not be included in `qa:route`; broad smoke covers its mobile overflow instead. The in-app browser screenshot capture timed out, but DOM, overflow, desktop, and drawer-state checks passed against `http://127.0.0.1:4325/tools/chatgpt/`.
- Next: Keep refreshing tool content through the new layout, starting with NanoChat, Napkin AI, NeuronWriter, NightCafe, and Notion AI unless superseded.

### 2026-06-24: NanoChat, Napkin AI, NeuronWriter, NightCafe, Notion AI Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Refreshed NanoChat, Napkin AI, NeuronWriter, NightCafe, and Notion AI against current June 2026 sources, updated AI Research, AI Presentation, AI Design, AI SEO, AI Image, and AI Notes parent hubs, refreshed source-registry rows, regenerated `PAGE_REFRESH_LEDGER.md`, updated `.agent/CURRENT_STATUS.md` and `.agent/PLANS.md`, and recorded `.agent/loop-runs/2026-06-24-nanochat-napkin-neuronwriter-nightcafe-notion-batch.md`.
- Verification: `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --file src\content\tools\nanochat.md --file src\content\tools\napkin-ai.md --file src\content\tools\neuronwriter.md --file src\content\tools\nightcafe.md --file src\content\tools\notion-ai.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/nanochat/ --route /tools/napkin-ai/ --route /tools/neuronwriter/ --route /tools/nightcafe/ --route /tools/notion-ai/ --route /categories/ai-research/ --route /categories/ai-presentation/ --route /categories/ai-design/ --route /categories/ai-seo/ --route /categories/ai-image/ --route /categories/ai-notes/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`.
- Failed then fixed: First `tool:refresh:batch:check` failed because Napkin AI, NightCafe, and Notion AI price-history rows were missing `verified_at`; added them and reran successfully.
- Residual risks: NightCafe official pricing and model pages were blocked by Cloudflare during non-interactive verification, so the page avoids exact live plan-gate claims and points buyers to confirm in checkout.
- Next: Continue with Consensus, Beehiiv, BLACKBOX AI, Browserbase, and Canva.

### 2026-06-24: Tool Refresh Workflow Timing Pass

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Profiled the current tool-refresh closeout workflow from the live batch, added per-stage timing output to `scripts/build-fast.mjs`, added local-server and concurrency modes to `scripts/qa-route.mjs`, added focused tests, and updated `.agent/LOOPS.md`, `.agent/OPERATING_RULES.md`, `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `scripts/README.md` so future refresh work pays for one whole-site build per batch instead of one build per tool.
- Measured bottlenecks: `build:fast` was the slowest gate at about 166.9 seconds end to end, with about 2m 38s inside Astro and about 2m 13s in static route prerender. The built-output audits after Astro were small: indexability under 1 second, CTA audit about 2 seconds, and budget check under 1 second. `typecheck` took about 31.2 seconds when run alone, and `tool:refresh:batch:check` took about 11.8 seconds.
- Route QA optimization: the 12-route by 5-width matrix took about 65 seconds serially against the local dev server, then about 18.9 seconds with `--concurrency 4`. The same matrix against `dist-fast/client` also passed in about 18.9 seconds with `--concurrency 4`.
- Failed then explained: Running `typecheck` and `build:fast` in parallel produced an Astro content-store `ENOENT rename` race under `node_modules/.astro/data-store.json`. Rerunning `typecheck` alone passed, so the workflow rule is sequential Astro commands.
- Verification: `npm run build:fast`; `node --test tests\scripts\build-fast.test.mjs tests\scripts\qa-route.test.mjs`; `node scripts\guard-em-dashes.mjs`; `node scripts\qa-route.mjs --base-url http://127.0.0.1:4325 --route /tools/consensus/ --route /categories/ai-research/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/blackbox-ai/ --route /categories/ai-coding/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/ --route /categories/ --widths 319,390,430,768,1024`; `node scripts\qa-route.mjs --base-url http://127.0.0.1:4325 --concurrency 4 --route /tools/consensus/ --route /categories/ai-research/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/blackbox-ai/ --route /categories/ai-coding/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/ --route /categories/ --widths 319,390,430,768,1024`; `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --route /tools/consensus/ --route /categories/ai-research/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/blackbox-ai/ --route /categories/ai-coding/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/ --route /categories/ --widths 319,390,430,768,1024`; `npm run audit:commands`; `git diff --check`.
- Residual risks: `build:fast` is still a whole-site Astro prerender and remains the main fixed closeout cost. The next deeper win would require route-scoped build output or reducing the number of generated routes checked in local loops, both of which need more design care.
- Next: Continue the batched freshness loop with fast content gates, optional dev-server route QA using `--base-url --concurrency 4`, then one final sequential `typecheck`, `build:fast`, and built-output route QA using `--concurrency 4`.

### 2026-06-24: Tool Refresh Workflow Optimization Pass

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Made grouped refreshes the planner default, added guarded worker and integrator briefs, taught the batch checker to consume saved planner JSON, added production-only content collection caching for hot global and page paths, and documented the modern refresh loop in README, script docs, `.agent/LOOPS.md`, `.agent/OPERATING_RULES.md`, `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/loop-runs/2026-06-24-tool-refresh-workflow-timing.md`. This was later expanded from the original 10-tool fanout to six 10-tool shards.
- Measured result: `build:fast` dropped from about 166.9 seconds before optimization to about 65 seconds end to end. Astro static prerender dropped from about 2m 13s to about 37 seconds. `typecheck` is about 25 seconds, and representative route QA is about 11-19 seconds with `--concurrency 4` depending on route count.
- Parallel rule: Ten subagents are useful only when each worker edits exactly one `src/content/tools/<slug>.md` file and returns source, parent-hub, route, and risk notes. The main integrator owns `src/data/source-registry.json`, parent hubs, ledgers, top-layer pages, `.agent` docs, and the expensive closeout gates.
- Verification: `node --test tests\scripts\build-performance.test.mjs tests\scripts\loop-hardening.test.mjs tests\scripts\qa-route.test.mjs tests\scripts\tool-refresh-batch.test.mjs`; `node --check scripts\tool-refresh-batch-check.mjs`; `node --check scripts\tool-refresh-batch.mjs`; `node --check scripts\loop-verify.mjs`; `npm run typecheck`; `npm run build:fast`; `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --route / --route /tools/chatgpt/ --route /news/2026-06-23-openai-daybreak-codex-security/ --route /categories/ai-research/ --route /compare/chatgpt-vs-claude/ --route /dead/bing-chat/ --route /tools/ --route /categories/ --widths 319,390,768,1024`.
- Residual risks: The optimized closeout is much faster, but it is still whole-site validation and should be paid once per integrated batch.
- Next: Use the six-shard-worker plan shape unless the user asks for a smaller batch.

### 2026-06-24: AiPedia Tool Refresh Workflow Skill

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Packaged the optimized refresh process as local skill `$aipedia-tool-refresh-workflow` under `.agents/skills/aipedia-tool-refresh-workflow/`, with a lean `SKILL.md`, UI metadata, and `references/tool-refresh-batch.md` for the detailed worker/integrator checklist. Updated `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/LOOPS.md` to treat the skill as the incubating playbook before loop-registry promotion.
- Verification: `python C:\Users\mustb\.codex\skills\.system\skill-creator\scripts\quick_validate.py .agents\skills\aipedia-tool-refresh-workflow`; placeholder and em-dash sweeps on the new skill and updated workflow docs; `git diff --check`.
- Residual risks: `.agents/` is intentionally gitignored local skill state, so this is available in this workspace but not committed unless the repo policy changes or the skill moves to a committed location.
- Next: Use the skill on the next six-shard-worker batch, patch the skill after any friction, and promote only the stable final shape into `src/data/aipedia-loops.json`.

### 2026-06-24: Consensus, Beehiiv, BLACKBOX AI, Browserbase, Canva, Captions, Castmagic, Cline, CloudTalk, CodeRabbit Batch

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Refreshed Consensus, Beehiiv, BLACKBOX AI, Browserbase, Canva, Captions, Castmagic, Cline, CloudTalk, and CodeRabbit against current June 2026 sources. Updated AI Research, AI Writing, AI Coding, AI Automation, AI Design, AI Image, AI Presentation, and AI Video parent hubs, refreshed source-registry rows, regenerated `PAGE_REFRESH_LEDGER.md`, and recorded `.agent/loop-runs/2026-06-24-consensus-beehiiv-blackbox-browserbase-canva-captions-castmagic-cline-cloudtalk-coderabbit-batch.md`.
- Workflow adaptation: The Codex Windows app hit an active-agent ceiling after six workers. Six tools were completed by workers and four were completed in the main thread. The planner, local skill, loop docs, and operating docs were first adapted to six-worker waves, then expanded to six shard workers with up to 10 tools each.
- Verification: `node --check scripts\tool-refresh-batch.mjs`; `node --test tests\scripts\build-performance.test.mjs`; `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/consensus/ --route /categories/ai-research/ --route /tools/beehiiv/ --route /categories/ai-writing/ --route /tools/blackbox-ai/ --route /categories/ai-coding/ --route /tools/browserbase/ --route /categories/ai-automation/ --route /tools/canva/ --route /categories/ai-design/ --route /tools/captions/ --route /categories/ai-video/ --route /tools/castmagic/ --route /tools/cline/ --route /tools/cloudtalk/ --route /tools/coderabbit/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client --concurrency 4`.
- Failed then adapted: Initial spawns for Castmagic, Cline, CloudTalk, and CodeRabbit failed with `agent thread limit reached`; the batch continued in-thread and the workflow was adapted to wave-limited fanout.
- Residual risks: The planner can still surface same-day refreshed high-volatility pages because their short review windows keep them near due. Skip same-day repeats or tune the planner before the next large run.
- Next: Regenerate the next batch with `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`; the next not-refreshed page observed behind this batch was Cody.

### 2026-06-24: Six Shard Worker Tool Refresh Workflow

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Expanded the tool-refresh planner and local workflow from one worker per tool to six parallel shard workers with up to 10 tool files each. Updated `scripts/tool-refresh-batch.mjs`, focused tests, README, script docs, `.agent` operating docs, the local `$aipedia-tool-refresh-workflow` skill, and normalized `nightcafe-softwareadvice-pricing` to source type `third_party`.
- Verification: `node --check scripts\tool-refresh-batch.mjs`; `node --test tests\scripts\build-performance.test.mjs tests\scripts\tool-refresh-batch.test.mjs`; planner smoke showed `batch=60`, `workers=6`, `tools_per_worker=10`; `npm run check:quick`.
- Failed then fixed: First `npm run check:quick` failed because `nightcafe-softwareadvice-pricing` used invalid source type `directory`; changed it to `third_party` and reran successfully.
- Residual risks: A 60-tool batch will increase integration review and route-QA scope. Keep shared files integrator-owned and use the saved planner JSON for the grouped batch check.
- Next: Generate the next plan with `npm run tool:refresh:batch -- --limit 60 --max-workers 6 --tools-per-worker 10 --json`.

### 2026-06-24: Six-Shard 60-Tool Baseline Run

- Status: Complete locally, verified, not yet pushed.
- Commit: pending.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Ran the new six-shard `$aipedia-tool-refresh-workflow` on 60 tools from Cody through Lovart; integrated source-registry updates, same-day planner exclusion, affected category hubs, `PAGE_REFRESH_LEDGER.md`, the Claude Agent SDK billing correction article, workflow timing docs, and `.agent/loop-runs/2026-06-24-60-tool-refresh-baseline.md`.
- Timing: 36m 55s from `.tmp-tool-refresh-run-start.txt` through the main route QA, and 41m 31s including documentation, supplemental route QA, and final sanity checks. Core timing was 25m 07s worker collection and 11m 48s integration plus verification. Closeout gates: ledger 2s, batch check 37s, typecheck 32s, check:quick 22s, build:fast 64s, main route QA 107s for 80 routes across five widths, supplemental route QA 4s for two edited routes missed by the main matrix.
- Verification: `node --check scripts\tool-refresh-batch.mjs`; `node --test tests\scripts\build-performance.test.mjs`; `npm run ledger:pages`; `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`; `npm run typecheck`; `npm run check:quick`; `npm run build:fast`; `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --widths 319,390,430,768,1024` across 80 routes; supplemental `node scripts\qa-route.mjs --site-dir dist-fast/client --concurrency 4 --route /categories/ai-infrastructure/ --route /news/2026-05-14-anthropic-claude-agent-sdk-credit-split/ --widths 319,390,430,768,1024`.
- Residual risks: Dynamic account or checkout-dependent facts remain caveated in content, especially Claude Fable/Mythos account routes, Udio exports/API/commercial terms, Pika pricing, Lovable checkout prices, Mubert custom/API/one-track license pricing, Seedance route economics, and Synthesia add-ons.
- Next: Stop for tonight as requested. Future runs should regenerate the plan and use the same six 10-tool shard shape unless the measured app concurrency limit changes.

### 2026-06-25: News Push, Planner Recent-Refresh Exclusion, and Source Health Cleanup

- Status: Complete locally, verified, pushed through the news commit; workflow/source cleanup pending commit.
- Commit: news push `67a2815b` on `master`.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Added and pushed four source-backed Jun 24-25 news stories, updated Gemini and GitHub Copilot tool breadcrumbs, generated news OG assets, and refreshed `/news/` plus the ledger. After the push, updated `scripts/tool-refresh-batch.mjs` so the default planner skips pages verified since yesterday, added focused tests, added the missing `next_review_at` for Consensus `deep_search_update`, replaced dead source URLs for MiniMax Speech T2A docs and Instantly Lead Finder, refreshed affected source-registry rows, and regenerated `PAGE_REFRESH_LEDGER.md`.
- Planner result: `.tmp-tool-refresh-batch.json` now starts with Luma, Magnific, Meshy, MiniMax Speech, OpusClip, Pinecone, PixVerse, Playground AI, Qdrant, Reclaim AI, Relevance AI, and Retell AI instead of immediately reselecting yesterday's June 24 batch.
- Source-health result: scoped live audit selected 170 sources for the next batch; 158 returned HTTP OK, 12 were unreachable, and 0 had content-hash changes. Clear 404s for `minimax-speech-t2a` and `instantly-leads` were fixed and live-checked. Remaining unreachable sources are access-sensitive 403 or timeout cases to handle inside the next editorial batch.
- Verification: `node scripts/guard-em-dashes.mjs`; `npm run check:news`; `node scripts/audit-news-rendering.mjs --json`; `npm run audit:provenance:changed -- --json`; `npm run typecheck`; `npm run build:fast`; news route QA across `/`, `/news/`, four new news articles, Gemini, and GitHub Copilot; `npm exec --yes --package=node@24 -- node --test tests/scripts/tool-refresh-batch.test.mjs`; `node --check scripts/tool-refresh-batch.mjs`; `npm run ledger:pages:check`; `npm run --silent loop:freshness -- --json`; `npm run --silent audit:sources -- --json --live --limit 0 --source-id minimax-speech-t2a --source-id instantly-leads`; final route QA across Consensus, MiniMax Speech, Instantly, affected parent categories, `/tools/`, and `/categories/`.
- Failed then fixed: Default `npm run check:quick` still fails under Node 22 for the existing TypeScript import behavior in `tests/scripts/tool-page-model-behavior.test.mjs`; targeted Node 24 test invocation passed. The first non-live source-health JSON parse failed because npm's banner was redirected into the file; reran with `npm run --silent`.
- Residual risks: Full 60-tool editorial refresh has not been run in this post-news pass because the planner showed 0 due-now tools and subagent fanout was not explicitly authorized in this session. Continue the regenerated Luma-first batch with `$aipedia-tool-refresh-workflow`.

### 2026-06-25: Luma, Magnific, Meshy, and OpusClip Serial Tool Shard

- Status: Complete, verified, and pushed on `codex/refresh-tool-pages-june-23`.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Refreshed Luma, Magnific, Meshy, and OpusClip against current June 2026 primary sources. Updated AI Video, AI Image, AI Design, and AI Writing parent hubs, refreshed source-registry `last_checked` rows, regenerated `PAGE_REFRESH_LEDGER.md`, and regenerated `.tmp-tool-refresh-batch.json`.
- Buyer-impact notes: Meshy now shows the current individual ladder with Pro $20/month, Premium $40/month, Ultra $100/month, and Studio $60/seat/month with a 2-seat minimum. Magnific now warns API buyers that pay-per-usage is marked for June 30, 2026 discontinuation and should not be treated as durable procurement math.
- Verification: `npm run audit:tool-quality -- --file` for all four tool files; `npm run audit:provenance:changed -- --json`; `npm run --silent audit:sources -- --json --live --limit 0` across 22 refreshed sources; `npm run ledger:pages:check`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `npm run tool:refresh:batch:check -- --file src/content/tools/luma.md --file src/content/tools/magnific.md --file src/content/tools/meshy.md --file src/content/tools/opusclip.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/luma/ --route /tools/magnific/ --route /tools/meshy/ --route /tools/opusclip/ --route /categories/ai-video/ --route /categories/ai-image/ --route /categories/ai-design/ --route /categories/ai-writing/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client --concurrency 4`.
- Failed then fixed: The first Magnific API pay-per-use source-health pass returned a 404 for `docs.magnific.com/pricing-payg`; updated the registry and visible sources to `https://www.magnific.com/api/pricing`, added the June 30 discontinuation caveat, and reran source health successfully.
- Next: Completed by the Pinecone, PixVerse, Playground AI, and Qdrant shard below.

### 2026-06-27: Non-Tool Page Refresh Batch 06

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Refreshed 24 routes, including 19 guides from `/guides/best-open-source-ai-tools/` through `/guides/synthesia-alternatives/` and 5 trends from `/trends/ai-coding-model-arms-race/` through `/trends/enterprise-agent-platforms/`. Updated `/`, `/guides/`, `/trends/`, `/categories/`, 9 affected category hubs, and `PAGE_REFRESH_LEDGER.md`. Strict 3-day stale count moved from 169 to 145 tracked pages.
- Buyer-impact notes: Alternatives and infrastructure guides now show June 27 verification. The trend pages keep historical June 1 and June 4 event dates where those are release facts, while page verification moved to June 27. Homepage guide lanes were inspected for Runway and Synthesia alternatives.
- Source repairs: Replaced broken Hume, Ideogram, NotebookLM, QuillBot, and Microsoft source routes with live official URLs. Removed duplicate Adobe HelpX credit FAQ source lines that remained unstable under bounded source health while keeping stable Adobe Firefly plans citations.
- Verification: `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/batch-06-source-health-after-pass2.json --concurrency 8 --timeout-ms 8000`; `npm run ledger:pages && npm run ledger:pages:check`; `node scripts/check-frontmatter.mjs --changed`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed -- --json`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run runner:page-refresh:closeout`; supplemental `node scripts/qa-route.mjs` for 9 category hubs at 319, 360, 390, 430, 768, 1024, and 1366 px.
- Timing: closeout 83.493s total, cheap gates 2.333s, source health 16.711s, typecheck 14.476s, build:fast 15.739s, content route QA 34.227s, supplemental category route QA 11.496s.
- Failed then fixed: Initial source-health pass found 3 broken and 4 unreachable URLs. Replacements and source-line cleanup reduced the final pass to 230 URLs, 200 ok, 30 access-sensitive, 0 broken, and 0 unreachable. The first ledger write/check needed the same second write cycle observed in batch 05.
- Residual risks: Worker report scaffolds parsed 6/6 but were not filled by live subagents because this batch was executed in-thread. Use closeout/source-health/route-QA timings for optimization rather than scaffold worker metrics.
- Next: Continue the oldest-first strict 3-day queue with 145 stale pages left: 37 comparisons, 30 companies, 21 static pages, 19 guides, 14 workflows, 7 trends, 8 dead archive pages, 6 tools, 2 crawl surfaces, and 1 report.

### 2026-06-27: Non-Tool Page Refresh Batch 05

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Refreshed 24 guide routes from `/guides/best-ai-tools-for-accountants/` through `/guides/best-free-ai-tools/`, updated `/guides/`, `/categories/`, 13 affected category hubs, and regenerated `PAGE_REFRESH_LEDGER.md`. Strict 3-day stale count moved from 193 to 169 tracked pages.
- Buyer-impact notes: Role guides now show June 27 verification language; archived budget pages keep noindex routing but have current recheck framing; the marketer guide no longer relabels old June 6 exact pricing as current and instead uses source-backed billing-cadence caution. Video generator guidance now uses a live Kling 3.0 launch source.
- Source repairs: Replaced the broken Jasper Brand Voice help URL with `https://www.jasper.ai/brand-voice`. Replaced the unreachable Kuaishou investor Kling 3.0 URL with the live GlobeNewswire copy of the launch release.
- Verification: `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/batch-05-source-health-after-pass2.json --concurrency 8 --timeout-ms 8000`; `npm run ledger:pages && npm run ledger:pages:check`; `node scripts/check-frontmatter.mjs --changed`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run audit:coverage-quality:changed`; `npm run audit:provenance:changed -- --json`; `node scripts/guard-em-dashes.mjs`; `git diff --check`; `AIPEDIA_CURRENT_DATE=2026-06-27 npm run runner:page-refresh:closeout`; supplemental `node scripts/qa-route.mjs` for 13 category hubs at 319, 360, 390, 430, 768, 1024, and 1366 px.
- Timing: closeout 81.234s total, cheap gates 2.366s, source health 12.261s, typecheck 14.856s, build:fast 16.824s, content route QA 34.922s, supplemental category route QA 16.319s.
- Failed then fixed: Initial source-health pass found an unreachable Kuaishou URL, then a broken Jasper help URL after replacement; both were fixed and rerun successfully. The first combined ledger generate/check needed a second ledger write before `ledger:pages:check` stabilized.
- Residual risks: Worker report scaffolds parsed 6/6 but were not filled by live subagents because this batch was executed in-thread. Use closeout/source-health/route-QA timings for optimization rather than scaffold worker metrics.
- Next: Continue the oldest-first strict 3-day queue with 169 stale pages left: 38 guides, 37 comparisons, 30 companies, 21 static pages, 14 workflows, 12 trends, 8 dead archive pages, 6 tools, 2 crawl surfaces, and 1 report.

### 2026-06-25: Pinecone, PixVerse, Playground AI, and Qdrant Serial Tool Shard

- Status: Complete, verified, and pushed on `codex/refresh-tool-pages-june-23`.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Refreshed Pinecone, PixVerse, Playground AI, and Qdrant against current June 2026 primary sources. Updated AI Infrastructure, AI Search, AI Image, and AI Video parent hubs, refreshed source-registry `last_checked` rows, added `pixverse-changelog`, and regenerated `PAGE_REFRESH_LEDGER.md`.
- Buyer-impact notes: PixVerse now surfaces the June 16, 2026 Upscale feature release from the official Platform changelog. Qdrant v1.18.2 remains the latest checked GitHub release, but the page now correctly says the release was published June 4, 2026. Pinecone and Playground pricing checks remained stable on June 25.
- Verification: `npm run audit:tool-quality -- --file src/content/tools/pinecone.md --file src/content/tools/pixverse.md --file src/content/tools/playground-ai.md --file src/content/tools/qdrant.md`; `npm run audit:provenance:changed -- --json`; `npm run --silent audit:sources -- --json --live --limit 0` across 13 refreshed sources; `npm run ledger:pages && npm run ledger:pages:check`; `npm run tool:refresh:batch:check -- --file src/content/tools/pinecone.md --file src/content/tools/pixverse.md --file src/content/tools/playground-ai.md --file src/content/tools/qdrant.md`; `npm run typecheck`; `npm run build:fast`; `npm run qa:route -- --route /tools/pinecone/ --route /tools/pixverse/ --route /tools/playground-ai/ --route /tools/qdrant/ --route /categories/ai-infrastructure/ --route /categories/ai-search/ --route /categories/ai-image/ --route /categories/ai-video/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client --concurrency 4`.
- Failed then fixed: The first provenance pass caught missing confidence on Qdrant `best_for` and missing `verified_at` fields on two older PixVerse price-history rows; added the missing metadata and reran successfully. The first ledger check was stale after parent-page edits; regenerated and reran successfully.
- Next: Completed by the subsequent six-worker 60-tool refresh batch.

### 2026-06-25: Six-Worker 60-Tool Refresh Batch

- Status: Complete, verified, and pushed on `codex/refresh-tool-pages-june-23`.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Ran the six-worker `$aipedia-tool-refresh-workflow` across 60 due-soon tools from Reclaim AI through Supermaven. Integrated worker edits, updated affected category hubs, refreshed `src/data/source-registry.json`, added the Hunyuan HY-Embodied-0.5 paper source, regenerated `PAGE_REFRESH_LEDGER.md`, and checked all affected rendered routes.
- Buyer-impact notes: Tavus pricing now carries the newer Developer surface plus a caveat for duplicated old pricing blocks. Kiro now includes Pro Max. Hume, Vapi, InVideo, Framer, Flux, Codex, Devin, Obsidian, Poe, Groq, Imagen, Genspark, Ahrefs, AssemblyAI, and Supermaven got current buyer-facing corrections or tightened caveats. Other shard tools were reverified against current June 2026 sources with dates and provenance aligned.
- Verification: `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`; `npm run typecheck`; `npm run build:fast`; `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 4 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366`.
- Failed then fixed: The first batch check caught long sentences in `hume.md` and `tana.md`, the banned phrase `best-in-class` in `supermaven.md`, and a ledger check race caused by running ledger generation/check concurrently. Split the sentences, replaced the phrase, regenerated the ledger, and reran the grouped batch check successfully.
- Residual risks: Checkout-gated and account-gated claims remain caveated in content, especially Boomy, Apollo, Jimeng/Dreamina, Gemini Omni API pricing, Ada contact-sales pricing, Tavus overages/concurrency, and Genspark task-level credit burn.
- Next: Move `master` to the verified branch tip, push `master`, regenerate the next planner, and continue the next not-recently-refreshed batch.

### 2026-06-25: Second Six-Worker 60-Tool Refresh Batch

- Status: Complete locally, verified, pending commit and push.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Ran the six-worker `$aipedia-tool-refresh-workflow` across the next 60 planned tools, from Tabnine through Wordtune. Integrated worker edits, updated affected category hubs, refreshed `src/data/source-registry.json`, regenerated `PAGE_REFRESH_LEDGER.md`, and checked all affected rendered routes.
- Buyer-impact notes: Claude Design now carries the Anthropic metering-doc conflict caveat. DeepL and Deepgram have corrected usage and Gemini timing details. Dust moved off stale EUR shorthand to current Business Pro and Max annual-seat pricing. Exa, GLM, Krea, OmniSEO, Recraft, ServiceNow, Surfer SEO, Val Town, ClickUp, Goose, Readwise, Speechify, Tidio, OpenRouter, Rodin, and Make received current buyer-facing corrections or tightened caveats.
- Verification: `npm run ledger:pages && npm run ledger:pages:check`; `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`; `npm run audit:provenance:changed -- --json`; `npm run typecheck`; `npm run build:fast`; `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 4 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366`.
- Failed then fixed: The first grouped batch check failed only on `ledger:pages:check`; rerunning `ledger:pages && ledger:pages:check` fixed it. The first `typecheck` caught a YAML parse error in `src/content/tools/claude-design.md` caused by a colon in an unquoted inline value; changed it to a folded scalar and reran typecheck successfully.
- Residual risks: Make live source checks included access-sensitive 403s, with at least one primary Make source reachable. Account-gated, checkout-gated, and plan-doc-conflict claims are caveated in the affected pages.
- Next: Commit, move `master` to the verified batch, push `master`, then regenerate the next planner before launching another six-worker wave.

### 2026-06-25: Tool Refresh Workflow Speed and Accuracy Upgrade

- Status: Complete locally, verified, pending commit.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Added `scripts/check-frontmatter.mjs` and `npm run check:frontmatter` to catch malformed markdown YAML before Astro typecheck/build. Wired the frontmatter parser into `tool:refresh:batch:check`. Updated `scripts/tool-refresh-batch.mjs` so planner closeout commands run `ledger:pages && ledger:pages:check` before the grouped checker, and so generated worker prompts require source-confidence labels: `primary-confirmed`, `primary-conflict`, `account-gated`, `checkout-gated`, `region-rendered`, `blocked-live-check`, and `secondary-only`. Updated `scripts/README.md`, `.agent/LOOPS.md`, and the local `$aipedia-tool-refresh-workflow` skill docs to match.
- Verification: `node --check scripts/check-frontmatter.mjs`; `node --check scripts/tool-refresh-batch.mjs`; `node --check scripts/tool-refresh-batch-check.mjs`; `node --test tests/scripts/tool-refresh-batch.test.mjs`; `npm run check:frontmatter`; planner smoke with `npm run --silent tool:refresh:batch -- --limit 3 --max-workers 2 --tools-per-worker 2 --json`; `npm run audit:commands`; `npm run ledger:pages && npm run ledger:pages:check`; `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-workflow-smoke.json`.
- Failed then fixed: The first smoke `tool:refresh:batch:check` failed only on `ledger:pages:check`, reproducing the prior wasted-pass pattern. Regenerated the ledger first, reran the grouped checker, and it passed.
- Residual risks: `.agents/skills/aipedia-tool-refresh-workflow/` remains local gitignored skill state, so the committed durable rule lives in `.agent/LOOPS.md`, planner output, tests, and script docs.
- Next: In the next real 60-tool batch, use generated worker prompts directly from `--agents` or JSON `agent_briefs`, run `npm run ledger:pages && npm run ledger:pages:check` before the grouped checker, and keep `typecheck` after the grouped checker.

### 2026-06-25: Committed Workflow Folder

- Status: Complete locally, pending verification and commit.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Added committed `workflows/` as the canonical home for repeatable operating procedures, separate from current-state `.agent/` memory and local-only `.agents/` runtime state. Added the full `workflows/tool-refresh/` procedure, worker prompt, integrator checklist, verification sequence, placeholders for news/page/QA workflows, and reusable run/worker report templates. Updated `.agent` orientation docs to point future agents at `workflows/`.
- Verification: pending.
- Residual risks: The new news/page/QA workflow folders are intentionally placeholders; expand them only from real repeated runs.

### 2026-06-25: Rust Tool Refresh Runner

- Status: Complete locally, verified, pending commit.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Added `tools/aipedia-runner/`, a Rust CLI that wraps the existing proven Node/Astro workflow instead of replacing it. The runner can plan tool-refresh batches, write worker prompt files, generate route QA args, run the ordered closeout gates, and write local receipts under `local/tmp/aipedia-runner/`. Added npm entry points: `runner`, `runner:tool-refresh:plan`, `runner:tool-refresh:route-args`, `runner:tool-refresh:closeout`, and `runner:tool-refresh:run`. Updated workflow docs and script docs to prefer the runner while keeping manual fallback commands.
- Verification: `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run runner:tool-refresh:plan -- --limit 2 --workers 2 --tools-per-worker 1`; `npm run runner:tool-refresh:closeout -- --skip-build --skip-route-qa`; `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run audit:commands`; `node scripts/guard-em-dashes.mjs`; `git diff --check`.
- Residual risks: First version intentionally does not launch Codex subagents by itself. It prepares worker prompts and enforces closeout sequencing around the existing scripts. Full `build:fast` and route QA were not run for this tooling-only change, but the real workflow should run them without skip flags after an actual content batch.
- Next: Use the runner on the next 60-tool refresh, then add file-ownership diff checks and source-health caching after one real runner-backed batch.

### 2026-06-25: Third Six-Worker Tool Refresh Batch

- Status: Complete locally, verified, pending commit and push.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Ran `$aipedia-tool-refresh-workflow` with six shard workers across 54 due-soon tools from Zapier through Jan.ai. Integrated worker edits, refreshed `src/data/source-registry.json`, regenerated `PAGE_REFRESH_LEDGER.md`, corrected the saved planner and route-QA args after moving watsonx Orchestrate back to the valid AI Automation category, and wrote `.agent/loop-runs/2026-06-25-third-six-worker-tool-refresh-batch.md`.
- Buyer-impact notes: WellSaid pricing now uses the current Trial/Starter/Pro/Business/Enterprise ladder; Freepik/Magnific and QuillBot carry region-rendered pricing caveats; Kimi keeps K2.6 as the primary-source flagship and leaves K2.7-Code secondary-only; Mem flags a live pricing-label conflict; Ollama treats `v0.30.11-rc0` as pre-release; GPT Image 2 uses current OpenAI API token pricing; Jan.ai is refreshed to v0.8.3 and Apache-2.0 licensing.
- Verification: `npm run ledger:pages && npm run ledger:pages:check`; `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`; `npm run typecheck`; `npm run build:fast`; `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 4 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366`.
- Failed then fixed: The first grouped batch check caught Kimi filler phrases, watsonx category/sentence issues, missing `last_checked` on `stable-audio-launch`, and missing price-history `verified_at` fields. Fixed and reran successfully. Route QA initially failed only on nonexistent `/categories/ai-enterprise/`, a planner artifact after correcting watsonx; updated planner/route args and reran successfully.
- Residual risks: Region-rendered, checkout-gated, account-gated, and primary-conflict claims remain caveated in affected pages, especially Freepik/Magnific, QuillBot, Mem, Riverside, Stable Audio, Tripo3D, Cohere, Workato, IBM watsonx Orchestrate, Semantic Scholar live count, and OpenClaw secondary-source security testing.
- Next: Commit/push the verified batch, regenerate the next planner, and continue the next due-soon shard.

### 2026-06-26: Tool Refresh Workflow No-Regression Hardening

- Status: Complete locally, verified, pending commit and push with the active batch.
- Branch: `codex/refresh-tool-pages-june-23`.
- Changed: Added `scripts/audit-hub-staleness.mjs` and `npm run audit:hub-staleness:changed`, then wired it into `tool:refresh:batch:check` so refreshed tool pages cannot point at missing or older parent category hubs. Updated planner-generated worker prompts, workflow docs, and local skill notes to require `price_history[].verified_at` on checked commercial rows and explicit primary-category-change reporting. Updated the Rust runner so route QA args are generated from current tool frontmatter instead of stale planner category routes, and runner receipts now include total, cheap-gate, and expensive-gate timing buckets. Fixed the planner metadata test so it uses `--include-same-day` and does not fail when the freshness queue was just refreshed.
- Verification: `node --check scripts/audit-hub-staleness.mjs`; `npm run audit:hub-staleness:changed -- --json`; `node --check scripts/tool-refresh-batch.mjs`; `node --check scripts/tool-refresh-batch-check.mjs`; `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`; `npm exec --yes --package=node@24 -- node --test tests/scripts/tool-refresh-batch.test.mjs`; `npm run audit:commands`; `cargo fmt --manifest-path tools/aipedia-runner/Cargo.toml --check`; `cargo check --manifest-path tools/aipedia-runner/Cargo.toml`; `cargo test --manifest-path tools/aipedia-runner/Cargo.toml`; `npm run runner:tool-refresh:route-args -- --plan .tmp-tool-refresh-batch.json --out local/tmp/aipedia-runner/review-route-args.txt`; `npm run runner:tool-refresh:closeout -- --plan .tmp-tool-refresh-review-smoke.json --route-args local/tmp/aipedia-runner/review-smoke-route-args.txt --receipt-dir local/tmp/aipedia-runner/review-receipts --skip-build --skip-route-qa`; `npm run ledger:pages && npm run ledger:pages:check`; `git diff --check`; `node scripts/guard-em-dashes.mjs`.
- Failed then fixed: `cargo fmt --check` initially flagged formatting in the runner timing block; ran `cargo fmt` and reran Rust checks successfully.
### 2026-06-27: Page Refresh Batch 07

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Refreshed 24 routes across trends, workflows, company profiles, and dead-tool archives. Updated `/`, `/trends/`, `/workflows/`, `/companies/`, `/dead/`, AI Coding, `/llms.txt`, `/llms-full.txt`, and `PAGE_REFRESH_LEDGER.md`.
- Source repairs: Replaced broken Google Stitch, Dext, AdCreative, and Meta Emu source URLs with live current routes.
- Layout repair: Fixed company-profile prose containment so long Markdown-generated source anchors and tables do not overflow at 319 px. This was found by route QA on `/companies/google-deepmind/` and fixed in `src/layouts/CompanyLayout.astro`.
- Verification: source health passed with 185 URLs, 170 ok, 15 access-sensitive, 0 broken, and 0 unreachable; `runner:page-refresh:closeout` passed in 85.882s; supplemental parent route QA passed for `/companies/`, `/dead/`, and `/categories/ai-coding/`; post-LLM update `typecheck` and `build:fast` passed.
- Durable receipt: `.agent/loop-runs/2026-06-27-page-refresh-batch-07.md`.
- Next: Continue oldest-first with 120 tracked pages still older than 2026-06-24.

### 2026-06-27: Page Refresh Batch 08

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Refreshed 24 mixed routes across dead archives, the April report, static trust pages, one workflow, one avatar-video guide, three trend routes, five answer routes, OpenAI/Adobe/Amazon company profiles, robots, and archived noindex surfaces.
- Parent and top-layer updates: `/`, `/answers/`, `/reports/`, `/trends/`, `/workflows/`, `/companies/`, `/dead/`, `/guides/`, plus AI Video, AI Image, AI Chatbots, AI Coding, and AI Search category hubs. Supplemental route QA also checked `/about/`.
- Verification: `runner:page-refresh:closeout` passed in 82.427s with 176 source URLs, 157 ok, 19 access-sensitive, 0 broken, and 0 unreachable; supplemental parent/category route QA passed for nine routes at 319, 360, 390, 430, 768, 1024, and 1366 px.
- Durable receipt: `.agent/loop-runs/2026-06-27-page-refresh-batch-08.md`.
- Next: Continue oldest-first with 96 tracked pages still older than 2026-06-24.

### 2026-06-27: Page Refresh Batch 09

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Refreshed 24 routes: 22 company profiles from Anysphere through xAI plus the meeting-notes and newsletter-writers guide pages.
- Accuracy repair: Updated Anysphere from stale reported-fundraising context to the June 2026 reported SpaceX/Cursor $60B all-stock acquisition agreement, with live CBS/AP, Ars Technica, and Cursor sources. This also removed the timeout-prone Wikipedia source from the source-health set.
- Parent and top-layer updates: `/`, `/companies/`, `/guides/`, AI Writing, AI Notes, and AI Voice.
- Verification: `runner:page-refresh:closeout` passed in 73.564s with 45 source URLs, 41 ok, 4 access-sensitive, 0 broken, and 0 unreachable; supplemental parent/category route QA passed for `/companies/`, `/categories/ai-writing/`, `/categories/ai-notes/`, and `/categories/ai-voice/` at 319, 360, 390, 430, 768, 1024, and 1366 px.
- Durable receipt: `.agent/loop-runs/2026-06-27-page-refresh-batch-09.md`.
- Next: Continue oldest-first with 72 tracked pages still older than 2026-06-24.

### 2026-06-27: Page Refresh Batch 10

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Refreshed 24 oldest routes across three guides, Cohere company profile, Stability AI Clipdrop dead-tool archive, four static trust/tooling pages, three answer pages, the demo page, and twelve comparison pages.
- Source repair: Replaced a broken `https://pitch.com/ai-presentation-maker` source in `beautiful-ai-vs-pitch` with the live Pitch home URL after checking candidate Pitch AI routes.
- Parent and top-layer updates: `/`, `/compare/`, `/answers/`, `/guides/`, `/companies/`, `/dead/`, AI Automation, AI Chatbots, AI SEO, and AI Voice. Supplemental route QA also covered AI Presentation, AI Coding, and AI Notes.
- Verification: `runner:page-refresh:closeout` passed in 87.189s with 161 source URLs, 147 ok, 14 access-sensitive, 0 broken, and 0 unreachable; supplemental parent/category route QA passed in 11.395s for nine routes at 319, 360, 390, 430, 768, 1024, and 1366 px.
- Durable receipt: `.agent/loop-runs/2026-06-27-page-refresh-batch-10.md`.
- Next: Continue oldest-first with 48 tracked pages still older than 2026-06-24.

### 2026-06-27: Page Refresh Batch 11

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Refreshed 24 comparison routes across chatbot/model-provider, research, coding, presentation, notes, writing, SEO, image, voice, video, and music lanes.
- Source repairs: Replaced broken Pitch, BFL, and MiniMax documentation URLs, and replaced the slow Kuaishou investor press-release URL in refreshed comparison citations with the faster GlobeNewswire copy of the same Kling AI 3.0 announcement.
- Parent and top-layer updates: `/`, `/compare/`, AI Chatbots, AI Research, AI Coding, AI Presentation, AI Music, AI Video, AI Writing, AI Image, AI Notes, AI SEO, and AI Voice.
- Verification: `runner:page-refresh:closeout` passed in 80.779s with 141 source URLs, 137 ok, 4 access-sensitive, 0 broken, and 0 unreachable; supplemental parent/category route QA passed in 13.580s for eleven routes at 319, 360, 390, 430, 768, 1024, and 1366 px.
- Durable receipt: `.agent/loop-runs/2026-06-27-page-refresh-batch-11.md`.
- Next: Continue oldest-first with 24 tracked pages still older than 2026-06-24.

### 2026-06-27: Page Refresh Batch 12

- Status: Complete and pushed.
- Branch: `master`.
- Changed: Refreshed the final 18 non-tool stale routes for the strict 3-day target: 13 guides, Anthropic company profile, GitHub Copilot vs Supermaven, `/media-kit/`, `/workflows/design-agency-replacement/`, and `/sitemap-index.xml`.
- Source repair: Replaced the slow Adobe generative credits FAQ citation with the current Adobe Firefly plans and credits page on affected guide pages, then reran source health successfully.
- Parent and top-layer updates: `/`, `/guides/`, `/companies/`, `/compare/`, `/workflows/`, AI Coding, AI Automation, AI Music, AI Voice, AI Design, and AI Chatbots.
- Verification: `runner:page-refresh:closeout` passed in 76.818s with 218 source URLs, 193 ok, 25 access-sensitive, 0 broken, and 0 unreachable; supplemental parent/category route QA passed in 9.384s for seven routes at 319, 360, 390, 430, 768, 1024, and 1366 px.
- Durable receipt: `.agent/loop-runs/2026-06-27-page-refresh-batch-12.md`.
- Next: Finish the final six stale tool rows with `$aipedia-tool-refresh-workflow` and the Rust runner.

### 2026-06-27: Final Six Tool Refresh

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Refreshed the final six stale tracked tool rows for the strict 3-day target: Phind, Tome, Semrush Demo, DALL-E, Dext, and Grok Code Fast. Updated affected category hubs, `/`, `/tools/`, `/categories/`, `src/data/source-registry.json`, and `PAGE_REFRESH_LEDGER.md`.
- Accuracy notes: Semrush Demo remains an archived noindex page and was checked separately with `--allow-noindex`. Grok Code Fast now carries a current xAI-docs conflict caveat instead of asserting a specific redirect target. DALL-E now points at the current OpenAI API deprecations docs URL.
- Verification: final stale count script passed with 548 tracked rows and 0 stale rows; tool source audit passed for nine source IDs; Semrush archive source audit passed for three source IDs; `runner:tool-refresh:closeout` passed in 51.520s; supplemental route QA passed for `/tools/semrush-demo/` and `/categories/ai-chatbots/`.
- Durable receipt: `.agent/loop-runs/2026-06-27-final-six-tool-refresh.md`.
- Next: Commit, push `master`, mark the strict 3-day goal complete, then start the next optimization loop from the now-fresh baseline.

### 2026-06-27: Affiliate Money Guide Metadata Backfill

- Status: Complete locally, verified, accepted by subagents at 9.9/10, pending commit and push.
- Branch: `master`.
- Changed: Backfilled structured affiliate conversion metadata onto the 35 existing money guides detected by `audit:affiliate-conversion`, including intent type, editorial `primary_tool`, `commercial_tools`, configured-not-live affiliate tools, competitors, buyer job, audience, not-for, decision criteria, search intent, conversion angle, unique angle, sibling cluster, overlap guard, CTA plan, cluster ID, freshness window, volatile claims, disclosure requirement, and indexability reason. Existing factual copy and `last_verified` dates were preserved.
- Guardrails: hardened `audit:affiliate-conversion` so `primary_tool` must match `guide_picks.best_overall.tool`, commercial tools must be approved-live affiliates, configured affiliate tools must be configured-not-live, raw affiliate typos fail, and near-duplicate money guides need distinct anti-overlap metadata. Hardened `audit-commercial-cta` so rendered affiliate CTAs fail unless the tool is approved-live.
- Verification: strict `audit:affiliate-conversion` reports 35 money guides, 22 live affiliate tools, 4 configured-not-live tools, 0 errors, and 0 warnings, down from 245 warnings; focused tests passed 12/12 across `tests/scripts/audit-affiliate-conversion-pages.test.mjs` and `tests/scripts/audit-commercial-cta.test.mjs`; `check:frontmatter`, `ledger:pages && ledger:pages:check`, `guard-em-dashes`, `typecheck`, `build:fast`, and route QA for all 35 guide routes at 319, 360, 390, 430, 768, 1024, and 1366 px passed.
- Review: trust/schema reviewer and conversion/doorway/CTA reviewer both accepted the final diff at 9.9/10 after earlier rejections were fixed.
- Durable receipt: `.agent/loop-runs/2026-06-27-affiliate-money-guide-metadata-backfill.md`.
- Next: Commit and push before creating the first new affiliate page cluster.

### 2026-06-28: Argil Affiliate Conversion Slice

- Status: Complete locally, verified, pending push.
- Branch: `master`.
- Changed: Added `/guides/argil-pricing-for-ugc-avatar-video-teams/` as a plan-decision page for Argil Classic, Pro, Scale, Enterprise, credit burn, API usage, Product Showcase, and consent risk. Refreshed `/tools/argil/`, the avatar-video and Synthesia alternatives guides, AI Video, homepage, `/guides/`, `/tools/`, `/categories/`, `/explore/`, `/search/`, LLM surfaces, source registry rows, and `PAGE_REFRESH_LEDGER.md`.
- Guardrails: added `audit:date-consistency` and guard-chain wiring, structured runner closeout JSON receipts, superseded-failure tracking, and global URL dedupe/cache metrics in `page:source-health`. Page and tool refresh planners now include the date-consistency cheap gate in generated closeout commands.
- Source repairs: replaced the stale MiniMax video API docs URL with the current video generation guide. Removed fragile Adobe HelpX citations from AI Video after narrowing the Adobe Firefly claim to sources that pass automated source health.
- Verification: page source health passed with 144 source URL occurrences, 95 unique URLs, 49 cache hits, 139 ok, 5 access-sensitive, 0 broken, and 0 unreachable. Strict affiliate audit passed with 46 money guides, 0 errors, and 0 warnings. Selected live-source audit passed for 15 source IDs. `guard:check`, `check:frontmatter`, `audit:provenance:changed`, `audit:facts`, `audit:commands`, `check:links`, `check:news`, `check:security`, `test:scripts` with 444 passing tests, Rust runner tests with 9 passing tests, `typecheck`, `build:fast`, two route-QA matrices, QA agent, generated surface checks, metadata/disclosure checks, date consistency, and `git diff --check` passed.
- Durable receipt: `.agent/loop-runs/2026-06-28-argil-affiliate-conversion.md`.
- Next: Commit and push the verified Argil slice, then continue the highest-fit affiliate conversion inventory.

### 2026-06-28: Daily News Priority Raised

- Status: Complete locally, verified, pending push.
- Branch: `master`.
- Changed: Promoted daily AI and AI-tools news freshness to the highest ongoing editorial priority in `.agent/CURRENT_STATUS.md` and `.agent/PLANS.md`, ahead of affiliate expansion, broad page refresh, tool refresh, visual polish, and comparison work.
- Workflow: Expanded `workflows/news-refresh/README.md` from a placeholder into the canonical daily news procedure, covering source discovery, story bar, required surfaces, final verification, and closeout notes.
- Verification: `node scripts/guard-em-dashes.mjs`, `npm run ledger:pages:check`, and `git diff --check` passed.
- Next: Run the daily news pass first in the next editorial session, then resume affiliate conversion work after `/news/` and `/` are current.

### 2026-06-28: Consensus Affiliate Conversion Slice

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/guides/consensus-pricing-for-students-and-researchers/` as a plan-decision page for students, labs, clinicians, and research teams choosing Consensus Free, Pro, Deep, Teams, or Enterprise. Refreshed `/tools/consensus/`, academic citation and citation sibling guides, the researcher-tools guide, AI Research, homepage, `/guides/`, `/search/`, LLM surfaces, source registry rows, and `PAGE_REFRESH_LEDGER.md`.
- Freshness repair: Resolved the freshness-loop attention item by adding `next_review_at` to the archived noindex Semrush Demo high-volatility pricing anchor. The freshness queue now reports `high_volatility_missing_next_review=0`.
- Source notes: Consensus subscription, product, changelog, affiliate redirect, and related research-tool sources were checked against current June 2026 sources. Perplexity Enterprise pricing returned raw HTTP 403 in source audit but loaded in browser, so the related citations guide records it as browser-verified.
- Verification: `npm run check:news`; `npm run check:frontmatter -- --changed`; `AIPEDIA_CURRENT_DATE=2026-06-28 npm run --silent audit:affiliate-conversion -- --strict --json`; `npm run audit:provenance:changed -- --json`; `npm run audit:guide-picks`; `node scripts/audit-freshness-queue.mjs --json`; selected live-source audit for 15 source IDs; `npm run ledger:pages && npm run ledger:pages:check`; `AIPEDIA_CURRENT_DATE=2026-06-28 npm run guard:check`; `git diff --check`; `npm run typecheck`; `AIPEDIA_CURRENT_DATE=2026-06-28 npm run build:fast`; route QA across affected routes at 319, 360, 390, 430, 768, 1024, and 1366 px with `--allow-noindex`.
- Next: Rerun the affiliate planner and continue the next approved affiliate cluster.

### 2026-06-28: Tool Expansion Batch 01

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/tools/firecrawl/`, `/tools/composio/`, `/tools/dify/`, and `/tools/flowise/` with source-backed verdicts, plan guidance, watch-outs, alternatives, pricing caveats, source IDs, price history, and logos. Updated AI Infrastructure and AI Automation parent hubs, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry, tool registry, logo manifest, OG cards, and `PAGE_REFRESH_LEDGER.md`.
- Source notes: Firecrawl and Composio pricing were primary-source confirmed from public pricing/docs. Dify paid plan amounts were treated as live-check caveats because the public pricing extraction exposed plan names and Sandbox trial language more reliably than stable paid-dollar amounts. Flowise Cloud Starter dollar pricing was not published in docs, so the page keeps Starter pricing as a checkout verification item.
- Verification: four `audit:tool-quality` runs passed; `npm run check:frontmatter -- --changed`; `npm run audit:provenance:changed -- --json`; `npm run ledger:pages -- --date 2026-06-28`; `npm run ledger:pages:check`; `node scripts/generate-logo-manifest.mjs --check`; `node scripts/generate-og-svgs.mjs --check --json`; `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run guard:check`; `npm run typecheck`; `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28 npm run build:fast`; rendered route QA across the four new tools, AI Infrastructure, AI Automation, `/tools/`, `/categories/`, and `/` at 319, 360, 390, 430, 768, 1024, and 1366 px; search/home generated API slug check; `npm run check:quick`; `git diff --check`.
- Caveat: An initial route-QA command included `/search/`, `/llms.txt`, and `/llms-full.txt`; it failed by policy because `/search/` is noindex and the LLM routes are plain text, not HTML pages. Rerun route QA on indexable HTML routes passed, and LLM/search content was checked separately.
- Durable receipt: `.agent/loop-runs/2026-06-28-tool-expansion-firecrawl-composio-dify-flowise.md`.
- Next: Continue the all-day tool expansion queue with the next net-new AI tools, then update the same top-layer, source, logo, OG, and ledger surfaces.

### 2026-06-28: Tool Expansion Batch 02

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/tools/langsmith/`, `/tools/tavily/`, `/tools/pydantic-ai/`, and `/tools/mem0/` with source-backed verdicts, plan guidance, watch-outs, alternatives, pricing caveats, source IDs, price history, and logos. Updated AI Infrastructure, AI Automation, AI Search, and AI Coding parent hubs, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry, tool registry, logo manifest, OG cards, and `PAGE_REFRESH_LEDGER.md`.
- Source notes: LangSmith pricing, retention, usage limits, deployment billing, observability, and hosting were checked against LangChain pricing and docs. Tavily pricing and credit math were checked against current API credits docs and pricing. Pydantic AI framework capabilities and MIT licensing were checked against official docs and GitHub. Mem0 Platform, OSS, pricing, managed-vs-self-hosted tradeoffs, and Apache 2.0 licensing were checked against current docs, pricing, and GitHub; the Pro web-vs-mobile price mismatch is called out visibly.
- Verification: four batch-two `audit:tool-quality` runs passed; combined `check:frontmatter -- --changed`, `audit:provenance:changed -- --json`, date consistency, ledger checks, logo/OG checks, `guard:check`, `typecheck`, `build:fast`, route QA across all eight new tools and affected hubs, generated API and LLM smoke checks, `check:quick`, and `git diff --check` passed.
- Caveat: The first post-batch `build:fast` caught homepage decision-evidence drift because Mem0 had medium-confidence pricing evidence. The fix was to keep Mem0 visible in hub/listing context while removing it from high-confidence decision-pick surfaces.
- Durable receipt: `.agent/loop-runs/2026-06-28-tool-expansion-langsmith-tavily-pydantic-ai-mem0.md`.
- Next: Continue the all-day tool expansion queue with the next net-new AI tools, then update the same top-layer, source, logo, OG, and ledger surfaces.

### 2026-06-28: Tool Expansion Batch 03

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/tools/braintrust/`, `/tools/portkey/`, `/tools/zep/`, and `/tools/promptfoo/` with source-backed verdicts, plan guidance, watch-outs, alternatives, pricing caveats, source IDs, price history, and logos. Updated AI Infrastructure, AI Automation, and AI Coding parent hubs, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry, tool registry, logo manifest, OG cards, and `PAGE_REFRESH_LEDGER.md`.
- Source notes: Braintrust pricing, retention, topic credits, docs, and Apache 2.0 SDK licensing were checked against current official sources. Portkey pricing, gateway docs, and MIT gateway licensing were checked against current official sources. Zep pricing, credit mechanics, memory docs, and Graphiti Apache 2.0 licensing were checked against current official sources. promptfoo pricing, docs, MIT licensing, and acquisition context were checked against promptfoo and OpenAI sources.
- Verification: four batch-three `audit:tool-quality` runs passed; combined `check:frontmatter -- --changed`, `audit:provenance:changed -- --json`, date consistency, selected live-source audit, ledger checks, logo/OG checks, `guard:check`, `typecheck`, `build:fast`, route QA across all twelve new tools and affected hubs, and generated API and LLM smoke checks passed.
- Caveat: The OpenAI promptfoo acquisition announcement loaded in browser during source verification but returned raw HTTP 403 in the automated source audit; promptfoo's own acquisition update returned HTTP 200 and remains the primary machine-checkable source for that note.
- Durable receipt: `.agent/loop-runs/2026-06-28-tool-expansion-braintrust-portkey-zep-promptfoo.md`.
- Next: Continue the all-day tool expansion queue with the next net-new AI tools, then update the same top-layer, source, logo, OG, and ledger surfaces.

### 2026-06-28: Tool Expansion Batch 04

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/tools/arize-phoenix/`, `/tools/ragas/`, `/tools/openpipe/`, and `/tools/langwatch/` with source-backed verdicts, plan guidance, watch-outs, alternatives, pricing caveats, source IDs, price history, and logos. Updated AI Infrastructure, AI Automation, and AI Coding parent hubs, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry, tool registry, logo manifest, OG cards, and `PAGE_REFRESH_LEDGER.md`.
- Source notes: Phoenix docs, pricing, official product page, and Elastic License 2.0 were checked against current official sources. Ragas docs, metrics, synthetic test data, cost analysis, and Apache 2.0 license were checked against current official sources. OpenPipe docs, pricing, and Apache 2.0 license were checked against current official sources. LangWatch docs, pricing, official site, and Apache 2.0 license were checked against current official sources.
- Verification: four batch-four `audit:tool-quality` runs passed; combined `check:frontmatter -- --changed`, `audit:provenance:changed -- --json`, date consistency, selected live-source audit for 17 source IDs, ledger checks, logo/OG checks, `guard:check`, `typecheck`, `build:fast`, route QA across the four batch-four tools and affected hubs, and generated API and LLM smoke checks passed.
- Caveats: Phoenix is marketed as open-source but the repository license is Elastic License 2.0, so hosted-service restrictions are called out. LangWatch pricing is euro-denominated and event/retention-metered. Ragas is free as a framework, but evaluator model calls, embeddings, synthetic test data, and human review remain real costs. OpenPipe hosted inference is usage-priced, and fine-tuning should wait until the team has clean examples and baseline evals.
- Durable receipt: `.agent/loop-runs/2026-06-28-tool-expansion-arize-phoenix-ragas-openpipe-langwatch.md`.
- Next: Continue the all-day tool expansion queue with the next net-new AI tools, then update the same top-layer, source, logo, OG, and ledger surfaces.

### 2026-06-28: Tool Expansion Batch 05

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/tools/patronus-ai/`, `/tools/deepeval/`, `/tools/traceloop/`, and `/tools/baml/` with source-backed verdicts, plan guidance, watch-outs, alternatives, pricing caveats, source IDs, price history, and logos. Updated AI Infrastructure, AI Automation, and AI Coding parent hubs, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry, tool registry, logo manifest, OG cards, and `PAGE_REFRESH_LEDGER.md`.
- Source notes: Patronus docs, pricing, evaluator reference, official site, and June 25 Digital World Model announcement were checked against current official sources. DeepEval metrics, Apache 2.0 license, and Confident AI pricing were checked against current official sources. Traceloop docs, pricing, OpenLLMetry repository/license, and ServiceNow announcement were checked against current official sources. BAML docs, testing docs, Boundary Studio observability docs, docs index, and Apache 2.0 license were checked against current official sources.
- Verification: four batch-five `audit:tool-quality` runs passed; `check:frontmatter -- --changed`, `audit:provenance:changed -- --json`, date consistency, selected live-source audit for 18 source IDs, ledger checks, logo/OG checks, `guard:check`, `typecheck`, `build:fast`, route QA across the four batch-five tools and affected hubs at 319, 360, 390, 430, 768, 1024, and 1366 px, generated API and LLM smoke checks, `check:quick`, `guard-em-dashes`, and `git diff --check` passed.
- Caveats: Patronus AI now spans classic eval-platform features and Digital World Model research, so buyers should confirm the product lane. DeepEval is free/open-source as a framework, but Confident AI cloud, model judges, and team operations are separate costs. Traceloop is joining ServiceNow, so roadmap, procurement, and support continuity need confirmation. BAML uses the official docs favicon because no fuller public logo asset was found during this pass.
- Durable receipt: `.agent/loop-runs/2026-06-28-tool-expansion-patronus-ai-deepeval-traceloop-baml.md`.
- Next: Continue the all-day tool expansion queue with the next net-new AI tools, then update the same top-layer, source, logo, OG, and ledger surfaces.

### 2026-06-28: Tool Expansion Batch 06

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/tools/litellm/`, `/tools/llamaindex/`, `/tools/haystack/`, and `/tools/dspy/` with source-backed verdicts, plan guidance, watch-outs, alternatives, pricing caveats, source IDs, price history, and logos. Updated AI Infrastructure, AI Coding, AI Automation, and AI Search parent hubs, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry, tool registry, logo manifest, OG cards, and `PAGE_REFRESH_LEDGER.md`.
- Source notes: LiteLLM docs, Enterprise docs, docs index, and GitHub license were checked against current official sources. LlamaIndex framework docs, pricing, and MIT license were checked against current official sources. Haystack docs, deepset pricing, and Apache-2.0 license were checked against current official sources. DSPy official site, getting-started docs, and MIT license were checked against current official sources.
- Verification: four batch-six `audit:tool-quality` runs passed; `check:frontmatter -- --changed`, `audit:provenance:changed -- --json`, selected live-source audit for 13 source IDs, logo/OG checks, `guard:check`, `typecheck`, `build:fast`, route QA across the four batch-six tools and affected hubs at 319, 360, 390, 430, 768, 1024, and 1366 px, generated API and LLM smoke checks, `check:quick`, `guard-em-dashes`, and `git diff --check` passed.
- Retry note: the first `build:fast` run failed because `AIPEDIA_LEDGER_DATE=2026-06-28` was omitted; rerunning with both date environment variables passed.
- Caveats: LiteLLM Enterprise pricing is not public on checked official surfaces. LlamaIndex framework use is separate from LlamaParse/LlamaCloud credits and model/retrieval infrastructure. Haystack framework use is separate from deepset AI Platform procurement. DSPy needs metrics and examples before optimization is meaningful.
- Durable receipt: `.agent/loop-runs/2026-06-28-tool-expansion-litellm-llamaindex-haystack-dspy.md`.
- Next: Continue the all-day tool expansion queue with the next net-new AI tools, then update the same top-layer, source, logo, OG, and ledger surfaces.

### 2026-06-28: Tool Expansion Batch 07

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/tools/respan/`, `/tools/agno/`, `/tools/instructor/`, and `/tools/chainlit/` with source-backed verdicts, plan guidance, watch-outs, alternatives, pricing caveats, source IDs, price history, and logos. Updated AI Infrastructure, AI Coding, AI Automation, and AI Chatbots parent hubs, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry, tool registry, logo manifest, OG cards, and `PAGE_REFRESH_LEDGER.md`.
- Source notes: Respan official, pricing, observability, gateway, and eval docs were checked against current official sources. Agno official, docs, pricing, repository, and Apache-2.0 license were checked against current official sources. Instructor docs, repository, and MIT license were checked against current official sources. Chainlit official site, docs, repository, and Apache-2.0 license were checked against current official sources.
- Verification: four batch-seven `audit:tool-quality` runs passed; `check:frontmatter -- --changed`, `audit:provenance:changed -- --json`, selected live-source audit for 17 source IDs, logo/OG checks, `guard:check`, `typecheck`, `build:fast`, route QA across the four batch-seven tools and affected hubs at 319, 360, 390, 430, 768, 1024, and 1366 px, generated API and LLM smoke checks, `check:quick`, `guard-em-dashes`, and `git diff --check` passed.
- Retry notes: the first `build:fast` run caught homepage evidence downgrade from the Respan category pick, fixed by keeping the unsupported Team base price out of copy and making the sourced product-scope pick high confidence. The first `check:quick` run caught `type: license` source rows, fixed by using the existing `legal` type, and also showed why current-date fixture tests should not be run with the June 28 content date override.
- Caveats: Respan's public pricing page does not expose a clean Team base price in rendered HTML, so checkout or sales confirmation remains required. Agno Pro is currently $150/month on the checked pricing page. Instructor is a structured-output library, not a governance platform. Chainlit is a developer Python chat UI framework, not a hosted chatbot subscription.
- Durable receipt: `.agent/loop-runs/2026-06-28-tool-expansion-respan-agno-instructor-chainlit.md`.
- Next: Continue the all-day tool expansion queue with the next net-new AI tools, then update the same top-layer, source, logo, OG, and ledger surfaces.

### 2026-06-28: Tool Expansion Batch 08

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/tools/openlit/`, `/tools/opik/`, `/tools/mirascope/`, and `/tools/outlines/` with source-backed verdicts, plan guidance, watch-outs, alternatives, pricing caveats, source IDs, price history, and logos. Updated AI Infrastructure, AI Coding, and AI Automation parent hubs, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry, tool registry, logo manifest, OG cards, and `PAGE_REFRESH_LEDGER.md`.
- Source notes: OpenLIT docs, pricing, repository, and Apache-2.0 license were checked against current official sources; OpenLIT Cloud remains a coming-soon item without public pricing. Opik docs, tracing, evaluation, pricing, repository, and Apache-2.0 license were checked against current official sources; cloud costs depend on span and retention meters. Mirascope docs, cloud-status page, repository, and MIT license were checked against current official sources; Mirascope Cloud has been discontinued while the SDKs remain active. Outlines docs, repository, Apache-2.0 license, and Dottxt API entry points were checked against current official sources; public Dottxt API pricing was not verified.
- Verification: four batch-eight `audit:tool-quality` runs passed; `check:frontmatter -- --changed`, `audit:provenance:changed -- --json`, selected live-source audit for 26 source IDs, logo/OG checks, `guard:check`, `typecheck`, `build:fast`, route QA across the four batch-eight tools and affected hubs at 319, 360, 390, 430, 768, 1024, and 1366 px, generated API and LLM smoke checks, `check:quick`, `guard-em-dashes`, and `git diff --check` passed.
- Caveats: OpenLIT Cloud pricing is not public, so the page recommends the self-hosted $0 path until the managed service publishes terms. Opik Free and Pro cloud tiers are confirmed, but buyers need to model spans, extra span blocks, and retention. Mirascope is best treated as a framework and SDK stack, not a hosted observability product. Outlines can route API users toward Dottxt, but Dottxt pricing needs account or vendor confirmation.
- Durable receipt: `.agent/loop-runs/2026-06-28-tool-expansion-openlit-opik-mirascope-outlines.md`.
- Next: Continue the all-day tool expansion queue with the next net-new AI tools, then update the same top-layer, source, logo, OG, and ledger surfaces.

### 2026-06-28: Tool Expansion Batch 09

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/tools/inspect-ai/`, `/tools/openai-evals/`, `/tools/guardrails-ai/`, and `/tools/lm-evaluation-harness/` with source-backed verdicts, plan guidance, watch-outs, alternatives, pricing caveats, source IDs, price history, and logos. Updated AI Infrastructure, AI Coding, and AI Automation parent hubs, `/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry, tool registry, logo manifest, OG cards, and `PAGE_REFRESH_LEDGER.md`.
- Source notes: Inspect AI docs, eval list, repository, and MIT license were checked against current official sources. OpenAI Evals docs, deprecations, repository, and MIT license were checked against current official OpenAI sources and the official OpenAI repository. Guardrails AI docs, validator docs, repository, and Apache-2.0 license were checked against current official sources; no public hosted or remote-validator pricing table was verified. LM Evaluation Harness README, repository, and MIT license were checked against current official EleutherAI sources.
- Verification: four batch-nine `audit:tool-quality` runs passed; `check:frontmatter -- --changed`, `audit:provenance:changed -- --json`, selected live-source audit for 16 source IDs, logo/OG checks, `guard:check`, pinned `lint`, `typecheck`, `build:fast`, route QA across the four batch-nine tools and affected hubs at 319, 360, 390, 430, 768, 1024, and 1366 px, generated API and LLM smoke checks, `audit:generated-models`, `check:links`, `check:news`, `check:quick`, `guard-em-dashes`, and `git diff --check` passed.
- Retry notes: provenance first flagged an OpenAI Evals high-volatility fact without `next_review_at`; the page now has the shutdown-window review date. Guard then caught an older shared `dalle-best-for` source-registry row whose `last_checked` lagged the visible category source date; the OpenAI deprecations source was reverified and aligned to 2026-06-28. Plain `npm run lint` uses the actual current date for the ledger and reports the intentionally June 28 editorial ledger as stale, so the verified lint command was run with `AIPEDIA_CURRENT_DATE=2026-06-28 AIPEDIA_LEDGER_DATE=2026-06-28`.
- Caveats: OpenAI Evals is a migration bridge because hosted evals become read-only on October 31, 2026 and shut down on November 30, 2026. Guardrails AI hosted or remote-validator pricing was not publicly verified. Inspect AI and LM Evaluation Harness are free frameworks, but buyers still need budgets for model calls, compute, sandboxes, GPUs, storage, output review, and release policy.
- Durable receipt: `.agent/loop-runs/2026-06-28-tool-expansion-inspect-ai-openai-evals-guardrails-ai-lm-evaluation-harness.md`.
- Next: Continue the all-day tool expansion queue with the next net-new AI tools, then update the same top-layer, source, logo, OG, and ledger surfaces.

### 2026-06-29: Agent System Loop 09, Boomy vs Suno

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/compare/boomy-vs-suno/` as a same-workflow full-song-generation comparison. Refreshed Boomy, Suno, AI Music, `/compare/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry rows, and `PAGE_REFRESH_LEDGER.md`.
- Source notes: Suno pricing, plan rights, ownership, stem separation, Studio, v5.5, and Series D context were checked against current official sources. Boomy official, pricing, and terms were reachable on June 29, while Boomy support URLs for commercial rights, downloads, revenue share, and Dolby Remastering returned raw HTTP 403 during the wider audit, so the comparison treats those as access-sensitive and keeps the support source rows on their prior June 25 verification date.
- System lesson: `agent:score` first rated the comparison at 0.82 because internal-link coverage was weak. Adding relevant music alternatives lifted the score to 0.88 and changed the recommendation to monitor, proving the scoring loop can catch useful editorial improvements before closeout.
- Verification: `agent:evidence`, `agent:score`, `agent:impact`, changed frontmatter, changed coverage quality, selected live-source audit for 12 reachable source IDs, runner agent plan, ledger generation and check, changed provenance, `check:links`, em-dash guard, `git diff --check`, `guard:check`, `typecheck`, `build:fast`, route QA across affected routes at 319, 360, 390, 430, 768, 1024, and 1366 px, memory recording, and broad loop recording passed. Wider source audit found the expected 10 Boomy support raw-HTTP 403 rows and 12 reachable HTTP 200 rows.
- Loop receipt: `.agent/loop-runs/system/2026-06-29T10-12-00-921Z-loop-run.json` with 7 ok, 0 attention, and 0 skipped.
- Next: Commit and push, then continue with `boomy-vs-udio` unless a fresh `loop:next` result changes the ranking.

### 2026-06-29: Agent System Loop 10, Boomy vs Udio

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/compare/boomy-vs-udio/` as a same-workflow full-song-generation comparison. Refreshed Boomy, Udio, AI Music, `/compare/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry rows, and `PAGE_REFRESH_LEDGER.md`.
- Source notes: Udio product, pricing, credit limits, UMG transition, and Warner partnership sources were live-checked on June 29. The Udio Warner registry row was repaired from the blog URL/type to the help-center URL/type used by the page fact record. Boomy official, pricing, terms, rights-after-cancel, rights-ownership, and Dolby Remastering rows returned HTTP 200. Boomy commercial-use, download-limit, and other-distributor support rows returned raw HTTP 403, so those remain access-sensitive and conservatively caveated.
- System lesson: The loop refined source metadata, not just page copy. The same comparison workflow exposed a source-registry URL mismatch and a more granular Boomy support status split than the prior run.
- Verification: `agent:evidence`, `agent:score` at 0.87 monitor, `agent:impact`, changed frontmatter, changed coverage quality, selected live-source audits, runner agent plan, ledger generation and check, changed provenance, `check:links`, em-dash guard, `git diff --check`, `guard:check`, `typecheck`, `build:fast`, route QA across affected routes at 319, 360, 390, 430, 768, 1024, and 1366 px, memory recording, and broad loop recording passed.
- Loop receipt: `.agent/loop-runs/system/2026-06-29T10-23-41-775Z-loop-run.json` with 7 ok, 0 attention, and 0 skipped.
- Next: Commit and push, then continue with `capacities-vs-notion-ai` unless a fresh `loop:next` result changes the ranking.

### 2026-06-29: Agent System Loop 11, Capacities vs Notion AI

- Status: Complete locally, verified, pending commit and push.
- Branch: `master`.
- Changed: Added `/compare/capacities-vs-notion-ai/` as a same-workflow notes/workspace comparison. Refreshed Capacities, Notion AI, AI Notes, `/compare/`, `/tools/`, `/categories/`, `/llms.txt`, `/llms-full.txt`, source registry rows, and `PAGE_REFRESH_LEDGER.md`.
- Source notes: Capacities pricing, product, docs, AI assistant, AI Chat Connectors, and Release 66 sources returned HTTP 200. Notion AI, pricing, AI Meeting Notes, Custom Agent credit docs, and help sources returned HTTP 200. The comparison keeps the buyer split explicit: Capacities for solo object-based PKM, Notion AI for team docs, databases, meeting notes, Enterprise Search, and agents.
- System lesson: `agent:score` first rated the comparison at 0.80 because internal-link coverage was weak. Adding adjacent notes decisions lifted the score to 0.89. The guard also exposed AI Notes registry-date drift for sibling visible source dates; ten official rows were live-checked at HTTP 200 and updated instead of lowering accurate visible dates.
- Verification: `agent:evidence`, `agent:score` at 0.89 monitor, `agent:impact`, changed frontmatter, changed coverage quality, selected live-source audits for 21 source IDs, runner agent plan, ledger generation and check, changed provenance, `check:links`, em-dash guard, `git diff --check`, `guard:check`, `typecheck`, `build:fast`, route QA across affected routes at 319, 360, 390, 430, 768, 1024, and 1366 px, memory recording, and broad loop recording passed.
- Loop receipt: `.agent/loop-runs/system/2026-06-29T10-36-48-548Z-loop-run.json` with 7 ok, 0 attention, and 0 skipped.
- Next: Commit and push, then continue with `captions-vs-heygen` unless a fresh `loop:next` result changes the ranking.
