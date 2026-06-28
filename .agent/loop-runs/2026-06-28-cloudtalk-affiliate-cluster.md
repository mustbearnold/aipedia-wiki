# 2026-06-28 CloudTalk Affiliate Cluster

Status: verified locally, pending push.

## Scope

- Added `/guides/cloudtalk-pricing-for-smb-sales-and-support-teams/`.
- Added `/guides/best-ai-receptionist-for-smb-phone-teams/`.
- Refreshed `/tools/cloudtalk/`, `/guides/best-ai-phone-system-for-smb-sales-and-support-teams/`, `/categories/ai-automation/`, `/categories/ai-voice/`, `/`, `/llms.txt`, `/llms-full.txt`, source registry rows, and `PAGE_REFRESH_LEDGER.md`.
- Fixed the retired MiniMax T2A docs URL from `speech-t2a-intro` to `speech-t2a-http` after page source health caught the 404.
- Improved `SoftwareApplicationLD` so mixed-currency or ambiguous pricing emits descriptive offer schema instead of inaccurate USD aggregate ranges.

## Verification Timings

| Step | Status | Time |
|---|---:|---:|
| Official CloudTalk live source probe | pass | 1.17s |
| `npm run test:scripts` | pass | about 15.0s runner duration |
| `npm run guard:check` final | pass | 2.10s |
| `npm run audit:facts` | pass | 0.55s |
| `npm run --silent audit:sources -- --json` snapshot | pass | 0.51s |
| `npm run --silent audit:provenance -- --json` full | pass with inherited advisory | 0.52s |
| `npm run check:links` | pass | 0.49s |
| `npm run check:news` | pass | 0.49s |
| `npm run smoke:api` | pass | 4.74s |
| `npm run check:frontmatter` final | pass | 0.51s |
| `audit:affiliate-conversion --strict --json` | pass | 0.65s |
| `npm run ledger:pages` after MiniMax repair | pass | 0.67s |
| `npm run ledger:pages:check` final | pass | 0.64s |
| `npm run page:source-health` first run | failed, superseded | 23.71s |
| `npm run page:source-health` after MiniMax repair | pass | 19.15s |
| `npm run audit:provenance:changed -- --json` final | pass | 0.55s |
| CloudTalk tool-quality per-file audit | pass | 0.43s |
| MiniMax tool-quality per-file audit | pass | 0.43s |
| `npm run typecheck` final | pass | 14.11s |
| `npm run build:fast` final | pass | 19.69s |
| Generated CloudTalk and MiniMax JSON-LD spot check | pass | instant |
| `npm run smoke:visual` | pass | 38.05s |
| `npm run qa:route` final, 11 routes x 7 widths | pass | 15.10s |
| Selected live `npm run audit:sources` final | pass | 4.65s |
| `git diff --check` final | pass | 0.02s |

## Superseded Failures

- `page_source_health.time` failed because `/categories/ai-voice/` still linked to `https://platform.minimax.io/docs/api-reference/speech-t2a-intro`. The URL was updated, `minimax-speech-t2a` registry `last_checked` was moved to `2026-06-28`, the ledger regenerated, and `page_source_health_after_minimax` passed with 270 URLs, 263 ok, 7 access-sensitive, 0 broken, and 0 unreachable.
- `audit_tool_quality_changed.time` failed because the command was invoked without the required `--file` argument. It was superseded by passing CloudTalk and MiniMax per-file tool-quality audits.

## Reviewer Findings

- Accuracy/SEO reviewer found MiniMax `last_updated` and `last_verified` could create backwards tool JSON-LD dates, and that `minimax-speech-t2a` source registry date lagged the visible AI Voice source date. Fixed by making tool JSON-LD `dateModified` use the latest page edit or verification date, and by updating the source registry row.
- Accuracy/SEO reviewer found CloudTalk offer schema was too lossy for mixed EUR seat pricing plus USD AI-agent bundles. Fixed by only emitting numeric aggregate offers when a single clear currency is present, otherwise using a descriptive offer.
- Workflow reviewer asked for superseded failures to be recorded and for new guide files to be staged explicitly before commit.

## Optimization Notes

- The slowest verified closeout steps were visual smoke at 38.05s, source health at 19.15s, build at 19.69s, typecheck at 14.11s, and route QA at 15.10s.
- Next workflow upgrade: write a closeout receipt JSON with command, status, exit code, elapsed time, log path, superseded-by pointer, routes, widths, and source IDs. Fail closeout if a non-zero artifact is not explicitly superseded.
- Next accuracy guard: compare visible source verification dates, source registry `last_checked`, ledger dates, and tool freshness fields for changed source IDs and routes.
- Next speed upgrade: add source-health URL dedupe/cache while preserving per-page reporting, then run post-build route QA and broad visual smoke concurrently when both are required.
