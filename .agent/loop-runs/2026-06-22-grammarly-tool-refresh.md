# 2026-06-22 Grammarly Tool Refresh

## Status

Complete in the current June 22 freshness batch.

## Scope

- Refreshed `src/content/tools/grammarly.md`.
- Updated the affected parent hub `src/content/categories/ai-writing.md`.
- Updated Grammarly source rows in `src/data/source-registry.json`.
- Regenerated `PAGE_REFRESH_LEDGER.md`.
- Updated `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, and `.agent/WORK_LOG.md`.

## Current Source Checks

- `https://superhuman.com/products/grammarly`
- `https://superhuman.com/plans`
- `https://support.grammarly.com/hc/en-us/articles/40709437438733-Introducing-the-Superhuman-suite`
- `https://support.grammarly.com/hc/en-us/articles/115000090011-How-much-does-Grammarly-Pro-cost`
- `https://www.grammarly.com/pro`
- `https://support.grammarly.com/hc/en-us/articles/25043801131149-About-Grammarly-Pro`
- `https://www.grammarly.com/business`
- `https://www.grammarly.com/trust`
- `https://www.grammarly.com/affiliates`
- `https://www.wired.com/story/grammarly-is-facing-a-class-action-lawsuit-over-its-ai-expert-review-feature/`

## Confirmed Facts

- Grammarly Free still exposes 100 AI prompts.
- Grammarly Pro still exposes 2,000 monthly AI prompts and supports up to 149 seats.
- Grammarly Pro support pricing remains $30/member/month monthly, $60/member/quarter, or $144/member/year.
- Superhuman suite pricing remains Free, Pro at $12/member/month annual or $30 monthly, Business at $33/member/month annual or $40 monthly, and Enterprise custom.
- Superhuman suite support says standalone Grammarly remains available and existing separate subscriptions do not automatically consolidate into suite pricing.
- Enterprise remains the right path for advanced controls such as SSO, DLP, BYOK, analytics, dedicated support, SCIM, and organization controls.
- The affiliate page still links to Impact and publicly claims cross-device tracking plus a 90-day cookie window, but no exact public payout should be published.
- The Expert Review issue remains a trust/governance watch-out, not a live feature recommendation.

## Verification

- `npm run audit:tool-quality -- --file src/content/tools/grammarly.md`: passed.
- `npm run audit:provenance:changed -- --json`: passed.
- `npm run loop:freshness -- --json`: passed, 0 due-now, next queue Qwen.
- `npm run ledger:pages:check`: passed.
- `node scripts/guard-em-dashes.mjs`: passed.
- `git diff --check`: passed.
- `npm run typecheck`: passed.
- `npm run build:fast`: passed.
- `npm run qa:route -- --route /tools/grammarly/ --route /categories/ai-writing/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`: passed.

## Process Fix

Refreshing one tool and then running a full build/route-QA gate is too slow for the remaining site-wide refresh. The loop docs now prefer batched tool refreshes with `npm run tool:refresh:batch -- --limit 4`, cheap per-tool checks during editing, and one expensive closeout gate per batch.

## Next Queue

Freshness loop now starts with Qwen, then Hailuo, HeyGen, and Adobe Firefly unless the broad loop runner promotes the Amazon Q vs GitHub Copilot decision-content cycle.
