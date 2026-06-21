# 2026-06-22: homepage-decision-evidence-hotfix

## Summary

- Status: complete in the verified June 22 batch
- Route: `/`
- Branch: `master`
- Commit: this commit

## Trigger

The homepage decision cards showed weak trust labels in the live browser:

- `No source attached`
- `Unknown source`
- `Low confidence`

This was visible on the local/open-model and marketing/automation decision cards at the 319 px mobile browser width.

## Root Cause

- The homepage could feature category or answer catalog items whose evidence model fell back to metadata-only freshness with no registered source.
- Tool evidence merged every historical `price_history` row into the live recommendation evidence pool, so old history could make current evidence stale.
- Tool evidence confidence inherited the editorial score band. That made a current, source-backed tool card show medium confidence when the underlying score was below the top score threshold.

## Changed Files

- `src/pages/index.astro`
- `src/content/categories/ai-infrastructure.md`
- `src/content/categories/ai-automation.md`
- `src/data/answers.ts`
- `src/data/source-registry.json`
- `src/lib/search-catalog.ts`
- `src/lib/content-models/tool-page-model.ts`
- `tests/scripts/search-catalog.test.mjs`
- `tests/scripts/generated-models.test.mjs`
- `PAGE_REFRESH_LEDGER.md`

## Current Sources Checked

- LM Studio OpenAI-compatible endpoint docs.
- n8n pricing and AI Agent node docs.
- Zapier MCP and pricing surfaces.
- OpenAI GPT-5.5 announcement and ChatGPT release notes.
- Anthropic Fable/Mythos access update.
- Google AI plan pages.
- Perplexity Pro pricing.
- Cursor pricing, changelog, product, CLI, Enterprise, and data-use surfaces.

## Fix

- Added registered current source refs to the local/open-model and marketing/automation homepage category paths.
- Added registered source-backed evidence to the featured `best-ai-chatbot-2026` answer.
- Added a homepage build assertion: featured decision paths must be registered, current, and high confidence.
- Updated `ToolPageModel` so only the latest pricing snapshot joins live recommendation evidence. Older `price_history` rows remain as history.
- Updated `ToolPageModel` so evidence confidence is driven by provenance, fact confidence, and freshness, not the editorial score band.
- Added regression tests for answer evidence and historical price rows.

## Verification

- `node --test tests\scripts\search-catalog.test.mjs tests\scripts\generated-models.test.mjs`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `rg -n "No source attached|Unknown source|Low confidence|Medium confidence|Evidence-only source|Inline source" dist-fast\client\index.html`

## Browser QA

Live browser DOM inspection at `http://127.0.0.1:4321/` on the 319 px viewport found five homepage decision cards. Every card had:

- `data-state="registered"`
- `data-freshness="current"`
- `data-confidence="high"`
- no bad fallback evidence text
- no horizontal overflow

## Residual Risks

- This hotfix is included in the verified June 22 batch.
- The paused Claude and Claude Code freshness batch remains dirty and unfinished. Do not treat this as completion of the whole June 21 to June 22 freshness goal.

## Next

- Commit this with the June 22 hotfix batch if the user asks to push.
- Finish the paused Claude and Claude Code freshness batch before starting Gemini or another content batch.
