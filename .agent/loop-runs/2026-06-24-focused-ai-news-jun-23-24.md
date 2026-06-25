# 2026-06-24 Focused AI News Jun 23-24

Status: complete locally, verified, not yet pushed.

## Scope

- Added five individual news stories for Jun 23-24 AI and AI-tool coverage.
- Avoided adding any daily AI News Desk page.
- Refreshed `/news/`, homepage, RSS, LLM surfaces, generated news OG assets, and `PAGE_REFRESH_LEDGER.md`.

## Stories

- `/news/2026-06-23-openai-daybreak-codex-security/`
- `/news/2026-06-23-samsung-chatgpt-codex-enterprise/`
- `/news/2026-06-23-claude-error-rate-fallback-planning/`
- `/news/2026-06-24-zai-glm-52-open-model-pressure/`
- `/news/2026-06-24-google-ai-talent-openai-anthropic/`

## Verification

- `node scripts\guard-em-dashes.mjs`
- `npm run ledger:pages:check`
- `npm run check:news`
- `node scripts\audit-news-rendering.mjs --json`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route /news/ --route / --route /news/2026-06-23-openai-daybreak-codex-security/ --route /news/2026-06-23-samsung-chatgpt-codex-enterprise/ --route /news/2026-06-23-claude-error-rate-fallback-planning/ --route /news/2026-06-24-zai-glm-52-open-model-pressure/ --route /news/2026-06-24-google-ai-talent-openai-anthropic/ --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`

## Notes

- The new stories use `related_tools`, not `affects`, because they are news and buying-risk signals rather than direct tool-page fact changes.
- GLM-5.2 coverage uses named reporting and avoids unsupported first-party benchmark claims.
