# 2026-06-27 Page Refresh Batch 11

## Scope

- Refreshed 24 comparison routes from the strict 3-day queue:
  - `/compare/claude-vs-grok/`
  - `/compare/consensus-vs-elicit/`
  - `/compare/cursor-vs-windsurf/`
  - `/compare/decktopus-vs-gamma/`
  - `/compare/decktopus-vs-pitch/`
  - `/compare/decktopus-vs-presentations-ai/`
  - `/compare/deepseek-vs-mistral-ai/`
  - `/compare/deepseek-vs-qwen/`
  - `/compare/fireflies-vs-otter-ai/`
  - `/compare/fish-audio-vs-resemble-ai/`
  - `/compare/fish-audio-vs-voxtral/`
  - `/compare/flux-vs-stable-diffusion/`
  - `/compare/github-copilot-vs-tabnine/`
  - `/compare/grammarly-vs-quillbot/`
  - `/compare/grammarly-vs-wordtune/`
  - `/compare/hailuo-vs-kling/`
  - `/compare/heygen-vs-synthesia/`
  - `/compare/mistral-ai-vs-qwen/`
  - `/compare/neuronwriter-vs-surfer-seo/`
  - `/compare/notion-ai-vs-obsidian/`
  - `/compare/quillbot-vs-wordtune/`
  - `/compare/suno-vs-udio/`
  - `/compare/veo-vs-kling/`
  - `/compare/veo-vs-seedance/`

## Parent And Top-Layer Updates

- Updated `/` and `/compare/` refresh metadata.
- Updated affected category hubs: AI Chatbots, AI Research, AI Coding, AI Presentation, AI Music, AI Video, AI Writing, AI Image, AI Notes, AI SEO, and AI Voice.

## Accuracy And Source Notes

- Replaced the broken Pitch AI presentation URL with `https://pitch.com/use-cases/ai-presentation-maker`.
- Replaced the broken BFL help URL with `https://docs.bfl.ml/flux_2/flux2_overview`.
- Replaced the broken MiniMax video API intro URL with `https://platform.minimax.io/docs/guides/video-generation`.
- Replaced the slow Kuaishou investor press-release URL in refreshed comparison citations and the touched AI Video parent source list with the faster GlobeNewswire copy of the Kuaishou Kling AI 3.0 announcement.
- Final source health passed with 141 source URLs, 137 OK, 4 access-sensitive, 0 broken, and 0 unreachable.

## Timing

- Planner: `npm run runner:page-refresh:plan -- --limit 24 --workers 6 --pages-per-worker 4`
- Closeout receipt: `local/tmp/aipedia-runner/page-refresh/receipts/2026-06-27T01-50-09Z-page-refresh-closeout.md`
- Total closeout: 80.779s
- Cheap gates: 2.319s
- Source health: 10.760s
- Typecheck: 14.258s
- Build fast: 16.278s
- Content route QA: 37.157s for 32 routes across 7 widths
- Supplemental parent route QA: 13.580s for 11 routes across 7 widths

## Verification

- `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/batch-11-source-health-after-kuaishou.json --concurrency 8 --timeout-ms 8000`
- `npm run ledger:pages && npm run ledger:pages:check`
- `AIPEDIA_CURRENT_DATE=2026-06-27 npm run runner:page-refresh:closeout`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --route /categories/ai-chatbots/ --route /categories/ai-research/ --route /categories/ai-coding/ --route /categories/ai-presentation/ --route /categories/ai-music/ --route /categories/ai-video/ --route /categories/ai-writing/ --route /categories/ai-image/ --route /categories/ai-notes/ --route /categories/ai-seo/ --route /categories/ai-voice/ --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/aipedia-runner/page-refresh/batch-11-parent-route-qa.json`

## Result

- Strict 3-day stale count moved from 48 to 24 tracked pages.
- Remaining queue: 6 tools, 13 guides, 1 company profile, 1 comparison, 1 static page, 1 workflow, and 1 crawl surface.
