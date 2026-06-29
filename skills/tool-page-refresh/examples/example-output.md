# Tool Page Refresh Report

Task: Refreshed `/tools/cursor/`.

Files changed:
- `src/content/tools/cursor.md`
- `src/data/source-registry.json`
- `PAGE_REFRESH_LEDGER.md`

Commands run:
- `npm run check:frontmatter`
- `AIPEDIA_CURRENT_DATE=2026-06-29 npm run audit:tool-quality -- --file src/content/tools/cursor.md`

Risks:
- One pricing claim was checkout-gated and is caveated in the page.
