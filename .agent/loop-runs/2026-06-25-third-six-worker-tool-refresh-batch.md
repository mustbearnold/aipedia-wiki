# 2026-06-25 Third Six-Worker Tool Refresh Batch

Status: Complete locally, verified, pending commit/push.

## Scope

Ran `$aipedia-tool-refresh-workflow` with six shard workers from `.tmp-tool-refresh-batch.json`.

Refreshed 54 tool pages:

Zapier, Sudowrite, Writesonic, Pitch, Gamma, Fish Audio, QuillBot, Murf, Resemble AI, Stable Diffusion, WellSaid, Freepik, You.com, Kagi, Scite, Semantic Scholar, Kimi, Langfuse, Leonardo, Letta, Llama, LM Studio, Logseq, Mem, Morphic, Ollama, Open WebUI, Paradox, Reflect, Reka, Replicate, Riverside, SaneBox, Spellbook, Stable Audio, Tactiq, Writer, Rows, Voiceflow, Tripo3D, TypingMind, Uizard, Unbounce, watsonx Orchestrate, Weaviate, Whisper, Workato, Yi, Antigravity, Cohere, GPT Image 2, OpenClaw, Hermes Agent, and Jan.ai.

Shared updates:

- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- `.tmp-tool-refresh-batch.json`
- `.tmp-route-qa-args.txt`

## Buyer-Impact Notes

- Zapier now includes June 2026 AI by Zapier model-based pricing context.
- WellSaid moved off stale Creative-era pricing to current Trial, Starter, Pro, Business, and Enterprise paths.
- Freepik/Magnific pricing now carries a region-rendered caveat.
- Kimi keeps K2.6 as the primary-source flagship and leaves K2.7-Code as secondary-only.
- Mem explicitly flags the live pricing-label conflict.
- Ollama marks `v0.30.11-rc0` as pre-release, with `v0.30.10` as the stable checked release.
- watsonx Orchestrate was corrected back to the valid `ai-automation` category and keeps enterprise governance context in the page copy.
- GPT Image 2 moved to current OpenAI API token pricing rather than stale fixed per-image launch language.
- Jan.ai was refreshed to v0.8.3 and Apache-2.0 licensing.

## Verification

Passed:

- `npm run ledger:pages && npm run ledger:pages:check`
- `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`
- `npm run typecheck`
- `npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 4 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366`

Worker scoped checks also passed for each shard before integration.

## Failed Then Fixed

- First grouped batch check caught filler phrases in Kimi, a nonexistent `ai-enterprise` category and long sentences in watsonx Orchestrate, missing `last_checked` on `stable-audio-launch`, and missing `verified_at` fields on older price-history rows. Fixed all and reran successfully.
- Route QA initially failed only on `/categories/ai-enterprise/`, a planner artifact from the pre-fix watsonx category. Updated the saved planner and route args to use `/categories/ai-automation/`; the corrected 69-route, seven-width QA passed.
- The ledger check race recurred once after generation; rerunning `ledger:pages && ledger:pages:check` stabilized it.

## Residual Risks

- Some pricing surfaces remain region-rendered, checkout-gated, or account-gated and are caveated in page copy: Freepik/Magnific, QuillBot, Mem, Riverside, Stable Audio, Tripo3D, Cohere, Workato, IBM watsonx Orchestrate, and enterprise/custom plans.
- Semantic Scholar's exact live homepage paper counter was not promoted as newly verified; API/free-access facts were confirmed.
- OpenClaw security testing includes a secondary-source risk signal and should stay framed as a caution, not a primary vendor claim.
