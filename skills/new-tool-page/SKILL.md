# New Tool Page

## Purpose

Create a new AiPedia tool page that is current, source-backed, logo-backed, internally linked, and useful for buyer decisions.

## When to use

Use this skill when adding a new file under `src/content/tools/` or expanding the catalog with a tool that does not already have a page.

## Required inputs

- Tool name.
- Slug.
- Category.
- Official URL.
- Current date.
- Target user or use case.
- Pricing, docs, GitHub, affiliate, or logo URLs when known.

## Output format

- New tool markdown path.
- Source registry rows.
- Logo and OG asset notes.
- Parent and top-layer surfaces updated.
- Validation commands and outcomes.
- Known caveats.

## Workflow steps

1. Confirm the slug is absent.
2. Gather current official evidence for product purpose, pricing, docs, repo, and changelog.
3. Classify primary and secondary categories.
4. Write the tool page using the established decision-spine structure.
5. Add sources, last verified date, facts, score reasons, alternatives, and caveats.
6. Add or verify logo assets and regenerate logo manifest.
7. Generate or verify OG assets.
8. Update source registry, tool registry surfaces, parent hubs, top-layer pages, LLM/search surfaces, and ledger rows.
9. Run focused quality, provenance, asset, build, and route checks.

## Safety rules

- Do not create duplicate low-value pages.
- Do not use monogram fallback unless a proper logo cannot be sourced and the final report says so.
- Do not invent pricing or plan names.
- Do not add affiliate CTAs unless the affiliate state supports them.

## Validation steps

- `rg --files src/content/tools | rg '<slug>'`
- `npm run check:frontmatter -- --files src/content/tools/<slug>.md`
- `AIPEDIA_CURRENT_DATE=<date> npm run audit:tool-quality -- --file src/content/tools/<slug>.md`
- `node scripts/generate-logo-manifest.mjs --check`
- `node scripts/generate-og-svgs.mjs --check`
- `npm run ledger:pages && npm run ledger:pages:check`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --site-dir dist-fast/client --route /tools/<slug>/`

## Related scripts

- `scripts/generate-logo-manifest.mjs`
- `scripts/generate-og-svgs.mjs`
- `scripts/check-frontmatter.mjs`
- `scripts/audit-tool-quality.mjs`
- `scripts/audit-provenance-pricing.mjs`

## Final report requirements

List the new page, sources, logo path, generated assets, parent hubs, top-layer surfaces, verification commands, and unresolved source or logo risks.
