# aipedia.wiki

Astro source for aipedia.wiki, an AI tools encyclopedia and comparison system.

## Commands

Use the smallest verification command that matches the change.

```bash
npm ci
npm run check:quick
npm run check
npm run editorial:weekly
npm run ledger:pages
npm run build
npm run deploy
```

- `npm run check:quick`: no-build loop for script/tooling changes; runs script tests, command-surface audit, and bounded asset checks.
- `npm run check`: broader source, content, link, news, asset, and security checks.
- `npm run editorial:weekly`: editorial freshness queue for deciding what to refresh next.
- `npm run ledger:pages`: regenerates `PAGE_REFRESH_LEDGER.md` after page or content edits.
- `npm run build`: full production build for output, runtime, UI, route, or pre-ship validation. Do not use it as routine verification for content/script-only changes.
- `npm run deploy`: Vercel production deploy after validation.

## Source of truth

Editorial content lives in `src/content/`. Runtime pages, components, layouts, styles, data, and public assets live under `src/` and `public/`.
