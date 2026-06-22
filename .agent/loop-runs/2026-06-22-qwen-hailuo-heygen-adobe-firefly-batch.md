# 2026-06-22 Qwen, Hailuo, HeyGen, And Adobe Firefly Batch

## Status

Complete in the June 22 freshness queue.

## Scope

- Refreshed `src/content/tools/qwen.md`.
- Refreshed `src/content/tools/hailuo.md`.
- Refreshed `src/content/tools/heygen.md`.
- Refreshed `src/content/tools/adobe-firefly.md`.
- Updated affected parent hubs: `src/content/categories/ai-chatbots.md`, `src/content/categories/ai-video.md`, and `src/content/categories/ai-image.md`.
- Updated `src/data/source-registry.json`, including a new `hailuo-payment-policy` source row.
- Regenerated `PAGE_REFRESH_LEDGER.md`.
- Added `scripts/tool-refresh-batch-check.mjs` and `npm run tool:refresh:batch:check`.
- Updated `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/LOOPS.md`, and `.agent/WORK_LOG.md`.

## Current Source Checks

- Qwen: `https://qwen.ai/`, `https://docs.qwencloud.com/changelog/models`, `https://docs.qwencloud.com/developer-guides/getting-started/pricing`, `https://www.qwencloud.com/models/qwen3.7-max`, `https://www.qwencloud.com/promo/discount-qwen`, `https://qwenlm.github.io/blog/qwen3/`, `https://huggingface.co/Qwen`.
- Hailuo and MiniMax: `https://hailuoai.video/tools/hailuo-2-3-model`, `https://www.minimax.io/news/minimax-hailuo-23`, `https://platform.minimax.io/docs/api-reference/video-generation-intro`, `https://platform.minimax.io/docs/guides/pricing-paygo`, `https://platform.minimax.io/docs/guides/pricing-video`, `https://hailuoai.video/doc/payment-policy.html`.
- HeyGen: `https://www.heygen.com/pricing`, `https://developers.heygen.com/docs/pricing`, `https://help.heygen.com/en/articles/10035615-how-to-get-started-with-liveavatar`, `https://www.heygen.com/security`, `https://www.heygen.com/trust-and-safety`, `https://www.heygen.com/blog/announcing-avatar-v`, `https://www.heygen.com/geniverse/social-creator-program`.
- Adobe Firefly: `https://www.adobe.com/products/firefly.html`, `https://www.adobe.com/products/firefly/plans.html`, `https://developer.adobe.com/firefly-services/docs/firefly-api/`, `https://helpx.adobe.com/creative-cloud/apps/generative-ai/generative-credits-faq.html`, `https://helpx.adobe.com/creative-cloud/apps/generative-ai/non-adobe-models-in-adobe-products.html`, `https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html`.

## Confirmed Facts

- Qwen is now described as Qwen Studio on the public surface; Qwen Cloud's latest Max changelog remains `qwen3.7-max-2026-06-08`; Qwen3.7-Max list pricing remains $2.50/M input and $7.50/M output; qwen3.7-plus retains current list and display-discount caveats.
- Hailuo 2.3 and 2.3-Fast remain the current MiniMax video routes; first/last-frame and subject-reference support remains route-specific; MiniMax video package language uses video points, not units; Hailuo app plan terms are documented separately from MiniMax API pay-go pricing.
- HeyGen app, API, LiveAvatar, security, and affiliate surfaces were rechecked. The page now separates app plans, prepaid API wallet usage, OAuth/web-plan billing, LiveAvatar credits, and Avatar IV/V route pricing.
- Adobe Firefly plans, Firefly API route, partner-model handling, credits, beta/commercial-safety caveats, and promo dates were rechecked. Pro Plus and Premium first-year promo language now uses Aug. 26, 2026, not June 17.

## Process Fix

The old pattern was too slow because it encouraged one full build and route-QA pass per tool. The new batch pattern is:

1. Plan a group with `npm run tool:refresh:batch -- --limit 4`.
2. Verify current sources in parallel.
3. Edit tools, parent hubs, source registry rows, and ledger together.
4. Run `npm run tool:refresh:batch:check -- --file <tool>...` as the fast grouped gate.
5. Run one typecheck, one `npm run build:fast`, and one combined route QA command.

## Verification

- `npm run tool:refresh:batch:check -- --file src\content\tools\qwen.md --file src\content\tools\hailuo.md --file src\content\tools\heygen.md --file src\content\tools\adobe-firefly.md --json`: passed in about 8 seconds.
- `npm run ledger:pages`: passed and wrote 548 rows.
- `npm run typecheck`: passed with 0 errors.
- `npm run build:fast`: passed in about 2 minutes 25 seconds.
- `npm run qa:route -- --route /tools/qwen/ --route /categories/ai-chatbots/ --route /tools/hailuo/ --route /categories/ai-video/ --route /tools/heygen/ --route /tools/adobe-firefly/ --route /categories/ai-image/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`: passed.

## Next Queue

Freshness loop reports 0 due-now items and 465 due-soon facts. The top review queue now starts with Augment Code, Base44, BLACKBOX AI, Captions.ai, and Cline unless the broad loop runner promotes the Amazon Q vs GitHub Copilot decision-content cycle.
