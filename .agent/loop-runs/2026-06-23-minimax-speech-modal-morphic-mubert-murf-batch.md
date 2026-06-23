# 2026-06-23 MiniMax Speech, Modal, Morphic, Mubert, Murf Batch

Status: Complete locally, verified, not yet pushed.

Changed:
- Refreshed `src/content/tools/minimax-speech.md`, `src/content/tools/modal.md`, `src/content/tools/morphic.md`, `src/content/tools/mubert.md`, and `src/content/tools/murf.md` against current June 23, 2026 primary sources.
- Updated affected parent and guide surfaces: AI Voice, AI Infrastructure, AI Coding, AI Automation, AI Music, Best AI Voice Generator for YouTube, Best AI Music Generator, and Suno alternatives.
- Refreshed source registry rows for MiniMax Speech, Modal, Morphic, Mubert, and Murf.
- Regenerated `PAGE_REFRESH_LEDGER.md`.

Verification:
- `npm run tool:refresh:batch:check -- --file src\content\tools\minimax-speech.md --file src\content\tools\modal.md --file src\content\tools\morphic.md --file src\content\tools\mubert.md --file src\content\tools\murf.md`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/minimax-speech/ --route /tools/modal/ --route /tools/morphic/ --route /tools/mubert/ --route /tools/murf/ --route /categories/ai-voice/ --route /categories/ai-infrastructure/ --route /categories/ai-coding/ --route /categories/ai-automation/ --route /categories/ai-search/ --route /categories/ai-chatbots/ --route /categories/ai-music/ --route /guides/best-ai-voice-youtube/ --route /guides/best-ai-music-generator/ --route /guides/suno-alternatives/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`

Residual risks:
- Full tracked-tool freshness is not complete. `PAGE_REFRESH_LEDGER.md` shows 127 tracked tool pages still below the June 23 refresh date after this batch.
- Mubert exact self-serve prices can still require live checkout/app verification. The content says so plainly.

Next:
- Continue oldest-first with NanoChat, Napkin AI, NeuronWriter, NightCafe, and Notion AI.
