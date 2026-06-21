# 2026-06-22: news-logo-hotfix

## Summary

- Status: complete
- Routes: `/`, `/news/`
- Branch: `master`
- Commit: this commit

## Changed Files

- `src/components/Nav.astro`
- `src/components/Footer.astro`
- `src/components/GlobalToolPreview.astro`
- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/news/index.astro`
- `src/pages/media-kit.astro`
- `src/content/news/2026-06-18-ai-news-desk.md`
- `src/content/news/2026-06-18-openai-chatgpt-health-spend-controls.md`
- `src/content/news/2026-06-18-shopify-agentic-commerce-ai-channels.md`
- `src/content/news/2026-06-19-ai-news-desk.md`
- `src/content/news/2026-06-19-john-jumper-anthropic-ai-talent.md`
- `src/content/news/2026-06-20-ai-news-desk.md`
- `src/content/news/2026-06-20-g7-ai-ceos-model-access-standards.md`
- `src/content/news/2026-06-21-ai-news-desk.md`
- `src/content/news/2026-06-21-ai-tools-control-plane-checklist.md`
- `src/content/news/2026-06-22-ai-news-desk.md`
- `src/content/news/2026-06-22-openai-bio-bounty-codex-community.md`
- `scripts/prep-favicons.mjs`
- `scripts/generate-og-news.mjs`
- `scripts/copy-content.mjs`
- `tests/scripts/prep-favicons.test.mjs`
- `tests/scripts/generate-og-news.test.mjs`
- `tests/smoke/visual-routes.spec.mjs`
- `src/data/generated-assets/og-news-manifest.json`
- `src/data/generated-assets/og-tools-manifest.json`
- `PAGE_REFRESH_LEDGER.md`
- `public/brand/*lantern*.png`
- `public/favicon*`, `public/apple-touch-icon.png`
- New June 18 through June 22 story assets under `public/og/news/`
- Refreshed generated tool OG assets for `amazon-q` and `lovo`

## Verification

- `node scripts/guard-em-dashes.mjs`
- `node scripts/audit-news-rendering.mjs`
- `node scripts/audit-news-xrefs.mjs`
- `node scripts/prep-favicons.mjs --check --json`
- `node scripts/generate-og-news.mjs --check <June 18-22 slugs>`
- `node scripts/generate-og-svgs.mjs --check --limit 20 --json`
- `node scripts/generate-logo-manifest.mjs --check`
- `node --test tests\scripts\prep-favicons.test.mjs tests\scripts\generate-og-news.test.mjs`
- `node scripts\optimize-og-images.mjs --check --limit 20 --json`
- `npm run ledger:pages:check`
- `git diff --check`
- `npm run build:fast`
- `npm run qa:route -- --route / --widths 360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run qa:route -- --route /news/ --widths 360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `npm run typecheck`
- `npm run check:links`

## Browser QA

- Homepage mobile confirmed nav logo source is `/brand/aipedia-logo-lantern-48.png`, computed filter is `none`, and the visible logo is amber rather than blue.
- Homepage mobile decision cards no longer overflow vertically letter by letter at the reported 319 px browser width.
- News mobile and desktop confirmed June 18, 19, 20, 21, and 22 coverage is visible without horizontal overflow.

## Failures Or Fixes

- Root cause of the blue logo was a legacy CSS filter on `.nav-logo-frame img`, which recolored the new lantern asset. The filter was removed.
- `npm run build:fast` initially failed because the paused Claude/Claude Code batch had unescaped inline backticks in `src/pages/answers/best-ai-coding-tool-2026.astro`. The inline code span was escaped so the already-dirty page can compile.

## Residual Risks

- This hotfix is included in the verified June 22 batch.
- The paused Claude and Claude Code freshness batch remains dirty and unfinished. Do not treat this hotfix as completion of the whole June 21 to June 22 freshness goal.

## Next

- Commit and push the hotfix only with the generated assets, ledger, and `.agent` receipt included.
- Then finish the paused Claude and Claude Code freshness batch before starting Gemini or another queue item.
