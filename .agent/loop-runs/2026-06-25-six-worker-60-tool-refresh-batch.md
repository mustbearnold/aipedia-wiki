# 2026-06-25 Six-Worker 60-Tool Refresh Batch

## Status

Complete locally, verified, pending push.

## Scope

Ran the six-worker `$aipedia-tool-refresh-workflow` on the 60-tool planner batch from Reclaim AI through Supermaven.

Worker-owned tool edits covered:

- Reclaim AI, Relevance AI, Retell AI, Rork, Taskade, Tavus, Tines, Together AI, Vidu, Wan
- Wispr Flow, Gemini Omni, Aider, Factory, Kiro, Hume, Napkin, Tana, Vapi, Ada
- Ahrefs, Amazon Q Developer, Apollo, AssemblyAI, Boomy, Presentations.AI, Activepieces, Poe, Groq, Gumloop
- Harvey, Helicone, Hex, Higgsfield, hireEZ, Hugging Face, Humata, Hume AI, Hunyuan, HyperWrite
- Imagen, Intercom, InVideo, Jasper, JetBrains AI, Framer AI, Galileo AI, Genspark, Jimeng, Julius
- Modal, Flux, Otter.ai, OpenAI Codex, Frase.io, Pieces, Obsidian, Devin, MarketMuse, Supermaven

Integrator-owned shared edits covered:

- `src/data/source-registry.json`
- affected category hubs
- `PAGE_REFRESH_LEDGER.md`
- `.agent/WORK_LOG.md`
- this receipt

## Verification

- `npm run tool:refresh:batch:check -- --plan .tmp-tool-refresh-batch.json`
- `npm run typecheck`
- `npm run build:fast`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 4 $(cat .tmp-route-qa-args.txt) --widths 319,360,390,430,768,1024,1366`

## Fixed During Closeout

- Split long sentences in `src/content/tools/hume.md` and `src/content/tools/tana.md`.
- Replaced `best-in-class` in `src/content/tools/supermaven.md`.
- Updated five missing source-registry `last_checked` fields and added `hunyuan-hy-embodied-05-paper`.
- Regenerated the page refresh ledger after the initial parallel ledger/check race.

## Residual Risks

- Checkout-gated or account-gated facts remain caveated in content.
- Tavus current pricing page exposes old and new plan blocks, so procurement should confirm overages, replica terms, and concurrency in writing.
- Gemini Omni API pricing remains unpublished.
- Ada, Boomy, Apollo, Jimeng/Dreamina, and some Genspark credit mechanics still require live account, checkout, or sales confirmation for exact purchase terms.
