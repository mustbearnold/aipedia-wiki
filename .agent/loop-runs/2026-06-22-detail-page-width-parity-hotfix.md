# 2026-06-22 Detail Page Width Parity Hotfix

## Trigger

Matt noted that the homepage now had the right width and feel, but tool pages and other pages still needed to match the top-layer page width rules.

## Scope

- Structured detail layouts: tool, comparison, guide, workflow, category, and company pages.
- Prose detail layouts: answer, trend, and news article pages.
- Shared style file: `src/styles/godtier-tokens.css`.
- Canonical ledger: `PAGE_REFRESH_LEDGER.md`.
- Continuity docs: `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/WORK_LOG.md`.

## Changes

- Added a global `gt-canvas-wide` utility so structured detail layouts can share the 1040 px desktop shell used by the improved top-layer pages.
- Added a shared narrow-mobile `gt-canvas` rule for non-home pages so detail routes use the same usable mobile rail as the homepage at 319 to 430 px.
- Opted category, company, comparison, guide, and workflow layouts into `gt-canvas-wide`; tool pages already used that class.
- Left answer, trend, and news article detail layouts on the 680 px desktop reading measure for prose readability, while still giving them the wider narrow-mobile rail.
- Regenerated the page refresh ledger.

## Routes Checked

- `/tools/chatgpt/`
- `/compare/chatgpt-vs-claude/`
- `/answers/chatgpt-vs-claude-which-is-better/`
- `/guides/best-ai-coding-assistant/`
- `/workflows/agentic-coding-workflow/`
- `/trends/ai-coding-model-arms-race/`
- `/categories/ai-chatbots/`
- `/companies/anthropic/`
- `/news/2026-06-22-ai-news-desk/`

## Verification

- Live geometry baseline at 346 px before the fix confirmed `/tools/chatgpt/`, `/compare/chatgpt-vs-claude/`, and `/answers/chatgpt-vs-claude-which-is-better/` were using the old squeezed detail canvas.
- Live geometry verification after the fix confirmed all checked routes use a 315 px canvas and about 287 px body/card width at 346 px, with no positive horizontal overflow.
- Live geometry verification at 1366 px confirmed structured detail layouts use a 1040 px canvas while pure prose answer, trend, and news article pages keep the 680 px reading shell.
- `npm run ledger:pages`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/chatgpt/ --route /compare/chatgpt-vs-claude/ --route /answers/chatgpt-vs-claude-which-is-better/ --route /guides/best-ai-coding-assistant/ --route /workflows/agentic-coding-workflow/ --route /trends/ai-coding-model-arms-race/ --route /categories/ai-chatbots/ --route /companies/anthropic/ --route /news/2026-06-22-ai-news-desk/ --widths 319,346,360,390,430,768,1024,1366 --site-dir dist-fast/client`

## Result

- Detail routes no longer feel horizontally squashed compared with the homepage and top-layer pages on narrow mobile.
- Structured detail templates now share the same desktop width rule as the improved top-layer pages.
- Prose detail pages retain readable desktop line length while gaining the improved mobile shell.

## Next

- Continue Gemini freshness or the Amazon Q vs GitHub Copilot decision cycle after a fresh loop recommendation.
