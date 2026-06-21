# AiPedia Current Status

Last updated: 2026-06-21

Audience: maintainers, future agents, and Matt.

## Source Of Truth Stack

1. `.agent/CURRENT_STATUS.md`: where we are now.
2. `.agent/PLANS.md`: active or immediately resumable work.
3. `.agent/WORK_LOG.md`: append-only record of major landed work.
4. `.agent/OPERATING_RULES.md`: repo operating rules.
5. `.agent/PROJECT_MAP.md`: paths, commands, and verification surfaces.

Local ignored docs, old specs, and archived plans are not canonical when they conflict with this stack.

## Plain English

AiPedia is back on the normal Decision Content Flywheel. The TanStack rebuild idea is not active.

The comparison policy is now strict: publish direct comparison pages only when tools serve the same buyer job and workflow. Same primary category is necessary, but not enough by itself. Do not create or keep `vs` pages for tools in different categories or for same-category tools that solve different workflows. Use category pages, buyer guides, alternatives sections, and internal-link blocks for those relationships instead.

The latest completed loop cycle is `activepieces-vs-zapier`. It passed the full loop verifier for `/compare/activepieces-vs-zapier/` on 2026-06-21 and was pushed to `master` in `b2fd03c5`. The next selector candidate is `amazon-q-vs-github-copilot`.

Run `git status --short --branch` and `git log --oneline -5` before starting. The completed comparison cleanup, Activepieces/Zapier cycle, loop hardening, and continuity docs are on `master`; verify Git state before starting new edits.

## Done Recently

- Strict comparison cleanup:
  - Deleted false-vs comparison pages that compared different categories or different workflows.
  - Removed public links to deleted comparison routes.
  - Lowered the comparison inventory guard floor to the new valid inventory size through a Guard Challenge record, not by silently weakening the guard.
  - Updated stale tests and fixtures that still expected deleted comparison routes.
- Activepieces vs Zapier loop cycle:
  - Added `src/content/comparisons/activepieces-vs-zapier.md`.
  - Verified current June 2026 Activepieces and Zapier pricing, app coverage, MCP, AI-agent, source, and release facts before writing the page.
  - Refreshed changed Activepieces and Zapier tool data where current sources justified it.
  - Replaced mobile-hostile raw Markdown comparison tables with stacked decision bullets on changed live comparison pages.
  - Recorded `.agent/loop-runs/2026-06-21-activepieces-vs-zapier.md`.
- Selector and policy hardening:
  - `src/data/comparison-policy.json` now has explicit workflow-family lanes for broad categories, including automation, image, coding, music, chatbots, video, voice, design, writing, notes, and search.
  - `coverage:next` and `loop:next` now prefer explicit same-workflow lanes instead of bare same-primary-category fallback.
  - The top 20 `coverage:next` candidates now resolve through workflow-family policy.
- Provenance and mobile fixes:
  - Backfilled missing `price_history[*].verified_at` values on changed tool pages using each page's existing `last_verified` date. This records existing provenance dates; it is not a fresh recheck of those older facts.
  - Added missing source-registry and high-volatility review metadata discovered by the changed-file provenance audit.
  - Fixed 360 px horizontal overflow on `/tools/pika/` by allowing long inline tool links to wrap inside `ToolLayout`.
- Loop reliability:
  - `loop:verify` passed for the Activepieces/Zapier cycle after it ran ledger, changed comparison quality, changed tool provenance, guard challenge check, script tests, guard checks, fact/source/provenance audits, link/news checks, generated-model audit, `build:fast`, and route QA.
  - `npm run coverage:next -- --json --count 20` now shows lane-based candidates at the top of the backlog.

## Active Work

- Decision Content Flywheel:
  - Use `npm run loop:next -- --json` to confirm the next valid same-workflow comparison before editing.
  - Current recommended next cycle: `amazon-q-vs-github-copilot`.
  - Verify June 2026 Amazon Q Developer and GitHub Copilot facts before editing. Do not carry forward stale pricing, model, availability, or plan claims.
  - Use `npm run loop:verify -- --date <YYYY-MM-DD> --route /compare/<slug>/ --path <changed paths>` before closing rendered comparison work.
  - Use `npm run loop:record -- --date <YYYY-MM-DD> --slug <slug> --status complete` after a completed, failed, partial, or blocked major cycle.
- Oldest-First AI Tools Wiki Refresh:
  - Work from `PAGE_REFRESH_LEDGER.md`, oldest first.
  - Verify volatile facts against current June 2026 sources before editing.
  - Update source fields, `last_verified`, affected parent hubs, and the ledger in the same change.
- Phase 3 Parallel Surface Agent Orchestration:
  - Planned but not executed on `master`.
  - If resumed, recompute missed news dates and verify current sources before dispatching subagents.

## Verification Baseline

Latest completed cycle checks:

- `node --test tests/scripts/audit-site-kpis.test.mjs tests/scripts/guard-content.test.mjs tests/scripts/guard-stale-facts.test.mjs tests/scripts/check-smart.test.mjs tests/scripts/loop-hardening.test.mjs`
- `node --test tests/scripts/audit-coverage-gaps.test.mjs tests/scripts/decision-loop.test.mjs`
- `npm run guard:challenge:check`
- `node scripts/guard-content.mjs --json`
- `npm run coverage:backlog`
- `node scripts/guard-stale-facts.mjs --json`
- `node scripts/audit-site-kpis.mjs --json`
- `npm run coverage:next -- --json --count 20`
- `npm run loop:next -- --json`
- `node scripts/audit-provenance-pricing.mjs --json --changed-file <changed tool paths>`
- `node scripts/audit-coverage-quality.mjs --changed-file <changed live comparison paths>`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/pika/ --widths 360 --site-dir dist-fast/client`
- `npm run loop:verify -- --date 2026-06-21 --slug activepieces-vs-zapier --route /compare/activepieces-vs-zapier/ --paths <changed paths> --json`
- `npm run loop:record -- --date 2026-06-21 --slug activepieces-vs-zapier --status complete --route /compare/activepieces-vs-zapier/`

The final `loop:verify` pass exited 0 and took about 8 minutes for this mixed content, guard, build, and route-QA cycle.

## Known Caveats

- Five preexisting live comparison pages remain under the thin-content word threshold and should be refreshed in a future quality pass: `freepik-vs-midjourney`, `neuronwriter-vs-surfer-seo`, `ideogram-vs-stable-diffusion`, `freepik-vs-ideogram`, and `adobe-firefly-vs-freepik`.
- Historical work-log and archive entries mention deleted comparison routes. Treat those as history, not live routing guidance.
- The provenance backfill on older changed tool pages used existing page verification dates. Only Activepieces/Zapier facts were freshly browsed for the latest cycle.
- Full local verifier runs are reliable but slow. Prefer `npm run check:smart`, focused tests, `npm run build:fast`, and exact `qa:route` unless a full pre-ship gate is needed.
- CRLF warnings may appear for a few script/test files when Git normalizes line endings. They were non-blocking in the latest checks.
- Global `vercel@54.14.2` install emits upstream dependency deprecation warnings for `stream-to-promise@2.2.0` and `tar@7.5.7` through Vercel CLI's own dependency graph. This is not an AiPedia repo dependency issue.
- The local untracked `.agents/` folder and `skills-lock.json` were not part of this AiPedia cycle and were left untouched.

## Start The Next Session

1. Run `git status --short --branch`.
2. Read `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/WORK_LOG.md`.
3. Read `.agent/PROJECT_MAP.md` for paths and `.agent/OPERATING_RULES.md` for rules.
4. Use `npm run loop:next -- --json` to confirm the next Decision Content Flywheel target.
5. If editing website content or commercial claims, apply the current-date, ledger, source, top-layer, mobile, SEO, and affiliate rules from `.agent/OPERATING_RULES.md`.

## Finish A Major Session

1. Update `.agent/CURRENT_STATUS.md`.
2. Update `.agent/PLANS.md`.
3. Append `.agent/WORK_LOG.md`.
4. Update any source spec only when that spec directly governed the work.
5. Run the smallest valid verification gate and report what passed, what failed, and what remains.
