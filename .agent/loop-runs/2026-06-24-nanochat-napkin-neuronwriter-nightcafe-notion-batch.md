# 2026-06-24 Tool Freshness Batch: NanoChat, Napkin AI, NeuronWriter, NightCafe, Notion AI

Status: complete locally, verified, not pushed.

Branch: `codex/refresh-tool-pages-june-23`

## Scope

Refreshed five tool pages against current June 2026 sources:

- `src/content/tools/nanochat.md`
- `src/content/tools/napkin-ai.md`
- `src/content/tools/neuronwriter.md`
- `src/content/tools/nightcafe.md`
- `src/content/tools/notion-ai.md`

Updated affected parent hubs:

- `src/content/categories/ai-research.md`
- `src/content/categories/ai-presentation.md`
- `src/content/categories/ai-design.md`
- `src/content/categories/ai-seo.md`
- `src/content/categories/ai-image.md`
- `src/content/categories/ai-notes.md`

Updated shared freshness surfaces:

- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`
- `/tools/` and `/categories/` through generated build output and route QA

## Source Notes

- NanoChat: verified official GitHub README plus live GitHub API counts on June 24, 2026.
- Napkin AI: verified official pricing, credit, annual discount, and data-use language from Napkin pricing on June 24, 2026.
- NeuronWriter: verified official pricing, feature, and affiliate pages on June 24, 2026.
- Notion AI: verified official pricing, Notion AI, Notion Credits, and affiliate pages on June 24, 2026.
- NightCafe: official pricing and model pages were blocked by Cloudflare in non-interactive verification on June 24, 2026. The page now avoids overclaiming exact plan or model gates and cites accessible official commercial-use/help and blog pages, plus a current secondary pricing profile.

## Verification

Passed:

- `npm run ledger:pages`
- `npm run tool:refresh:batch:check -- --file src\content\tools\nanochat.md --file src\content\tools\napkin-ai.md --file src\content\tools\neuronwriter.md --file src\content\tools\nightcafe.md --file src\content\tools\notion-ai.md`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /tools/nanochat/ --route /tools/napkin-ai/ --route /tools/neuronwriter/ --route /tools/nightcafe/ --route /tools/notion-ai/ --route /categories/ai-research/ --route /categories/ai-presentation/ --route /categories/ai-design/ --route /categories/ai-seo/ --route /categories/ai-image/ --route /categories/ai-notes/ --route /tools/ --route /categories/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`

Failed then fixed:

- First `tool:refresh:batch:check` failed because price-history rows on Napkin AI, NightCafe, and Notion AI were missing `verified_at`. Added those fields, then reran successfully.

Remaining:

- Continue the due-soon batch: Consensus, Beehiiv, BLACKBOX AI, Browserbase, and Canva.
- NightCafe exact live checkout plan gates should be rechecked manually or through an interactive browser if procurement precision is required.
