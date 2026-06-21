# 2026-06-22 Claude And Claude Code Freshness Completion

## Status

Complete in the verified June 22 batch.

## Scope

Completed the paused Claude and Claude Code freshness batch from June 21. The batch refreshed Claude and Claude Code guidance around Fable/Mythos availability, Opus 4.8, paused Agent SDK credit changes, Claude Code usage and cost guidance, web search, data retention, and source registry coverage.

Affected surfaces include Claude, Claude Code, Anthropic, AI Chatbots, AI Coding, AI Automation, AI Writing, related Claude comparisons, Claude and Cursor alternative guides, Best AI Coding Assistant, Solo Founder Stack, relevant answer pages, `/tools/`, `/categories/`, homepage, news, media-kit, source registry, and the page refresh ledger.

## Completion Checks

- `rg -n "Agent SDK credits are now active|Agent SDK credits became active|monthly per-user Agent SDK credits|active per-user credits|Mythos is limited availability|Mythos is limited to approved" ...`
- `npm run audit:provenance:changed -- --json`
- `npm run ledger:pages:check`
- `npm run loop:freshness -- --json`
- `npm run qa:route -- --routes /tools/claude/,/tools/claude-code/,/categories/ai-chatbots/,/categories/ai-coding/,/categories/ai-automation/,/categories/ai-writing/,/companies/anthropic/,/compare/chatgpt-vs-claude/,/compare/claude-vs-gemini/,/compare/claude-vs-grok/,/compare/aider-vs-claude-code/,/guides/claude-alternatives/,/guides/cursor-alternatives/,/guides/best-ai-coding-assistant/,/guides/ai-solo-founder-stack/,/answers/best-ai-chatbot-2026/,/answers/best-ai-coding-tool-2026/,/answers/chatgpt-vs-claude-which-is-better/,/tools/,/categories/ --widths 360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run check:smart:run`

## Results

- No exact stale bad phrases remained for active Agent SDK credits or Mythos limited-availability framing.
- Changed-tool provenance passed for Claude and Claude Code with no unknown source IDs, missing fact source IDs, missing confidence, missing `next_review_at`, or pricing verification gaps.
- `PAGE_REFRESH_LEDGER.md` is current.
- Freshness loop passed with 0 due-now items, 0 stale candidates, 0 unknown source IDs, and 0 high-volatility missing review windows.
- Affected route QA passed across mobile, tablet, and desktop widths.
- `npm run check:smart:run` passed after the brand logo palette fix.

## Note

The first smart-check attempt failed because an old static preview server occupied port 4321. After stopping that server, visual smoke exposed a real lantern-logo palette issue. The logo source was normalized to Signal Orange, favicons were regenerated, `npm run smoke:visual` passed 158/158, and the final smart-check rerun passed end to end.

## Next

Run and record the full loop suite one more time, then commit and push the verified June 22 batch. After that, continue with Gemini due-soon freshness or `amazon-q-vs-github-copilot`, depending on the fresh loop recommendation.
