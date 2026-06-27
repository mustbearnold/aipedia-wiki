# 2026-06-27 Page Refresh Batch 10

## Scope

- Refreshed 24 oldest tracked routes from the strict 3-day queue.
- Routes covered:
  - `/guides/best-ai-for-podcasters/`
  - `/guides/best-ai-phone-system-for-smb-sales-and-support-teams/`
  - `/guides/best-ai-seo-tool-replacing-surfer-frase-stack/`
  - `/companies/cohere/`
  - `/dead/stability-ai-clipdrop/`
  - `/about/`
  - `/glossary/`
  - `/stack-builder/`
  - `/answers/best-ai-chatbot-2026/`
  - `/answers/best-ai-coding-tool-2026/`
  - `/answers/chatgpt-vs-claude-which-is-better/`
  - `/demo-godtier/`
  - `/compare/activepieces-vs-n8n/`
  - `/compare/activepieces-vs-zapier/`
  - `/compare/aider-vs-claude-code/`
  - `/compare/beautiful-ai-vs-decktopus/`
  - `/compare/beautiful-ai-vs-gamma/`
  - `/compare/beautiful-ai-vs-pitch/`
  - `/compare/beautiful-ai-vs-presentations-ai/`
  - `/compare/capacities-vs-obsidian/`
  - `/compare/chatgpt-vs-claude/`
  - `/compare/chatgpt-vs-gemini/`
  - `/compare/chatgpt-vs-grok/`
  - `/compare/claude-vs-gemini/`

## Parent And Top-Layer Updates

- Updated or checked `/`, `/compare/`, `/answers/`, `/guides/`, `/companies/`, `/dead/`, `/categories/`, `/tools/`, `/trends/`, and `/workflows/`.
- Updated affected category hubs: AI Automation, AI Chatbots, AI SEO, and AI Voice.
- Supplemental parent route QA covered `/companies/`, `/dead/`, AI Voice, AI Automation, AI Chatbots, AI SEO, AI Presentation, AI Coding, and AI Notes.

## Accuracy And Source Notes

- Replaced a broken Pitch AI presentation source URL in `beautiful-ai-vs-pitch` with the live Pitch home URL after checking candidate Pitch AI routes.
- Source health passed after the repair with 161 source URLs, 147 OK, 14 access-sensitive, 0 broken, and 0 unreachable.
- Access-sensitive URLs were classified as expected gated, rate-limited, or bot-sensitive checks rather than broken source failures.

## Timing

- Planner: `npm run runner:page-refresh:plan -- --limit 24 --workers 6 --pages-per-worker 4`
- Closeout receipt: `local/tmp/aipedia-runner/page-refresh/receipts/2026-06-27T01-35-00Z-page-refresh-closeout.md`
- Total closeout: 87.189s
- Cheap gates: 2.291s
- Source health: 16.678s
- Typecheck: 14.014s
- Build fast: 17.094s
- Content route QA: 37.107s for 32 routes across 7 widths
- Supplemental parent route QA: 11.395s for 9 routes across 7 widths

## Verification

- `npm run page:source-health -- --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/aipedia-runner/page-refresh/batch-10-source-health-after-pitch.json --concurrency 8 --timeout-ms 8000`
- `AIPEDIA_CURRENT_DATE=2026-06-27 npm run runner:page-refresh:closeout`
- `node scripts/qa-route.mjs --site-dir dist-fast/client --concurrency 6 --route /companies/ --route /dead/ --route /categories/ai-voice/ --route /categories/ai-automation/ --route /categories/ai-chatbots/ --route /categories/ai-seo/ --route /categories/ai-presentation/ --route /categories/ai-coding/ --route /categories/ai-notes/ --widths 319,360,390,430,768,1024,1366 --timing-file local/tmp/aipedia-runner/page-refresh/batch-10-parent-route-qa.json`

## Result

- Strict 3-day stale count moved from 72 to 48 tracked pages.
- Remaining queue is mostly comparisons and guides, plus six tools, one company profile, one static page, one workflow, and one crawl surface.
