# aipedia-wiki - Codex Operating Guide

This Astro site is the live aipedia.wiki codebase. Codex should treat this file as the primary agent guide. `CLAUDE.md` remains useful historical context, but new agent work should follow `AGENTS.md`.

## Source Of Truth

- Edit AI tool content directly in `src/content/`.
- Do not edit `../wikis/ai-tools.legacy-backup-2026-04-17/`.
- The old dual-tree sync was retired after content-wipe risk. `src/content/` is now the single source of truth.
- Generated assets in `public/og/`, `public/pagefind/`, `src/data/logo-manifest.json`, and `src/data/_meta/` may change during builds.

## Codex Workflow

1. Read this file, then inspect the local files related to the task.
2. Prefer small, scoped edits that match the existing Astro and content patterns.
3. Do not revert unrelated dirty work. This repo often has generated-file churn.
4. Use `apply_patch` for manual edits.
5. Verify before claiming success. For UI work, use the in-app browser when a local route is involved.

## Commands

```bash
npm run dev
npm run build
npm run guard:check
```

Notes:

- `npm run build` runs content guards, GitHub stats fetch, OG generation, Astro build, and Pagefind.
- GitHub stats can hit API 403 rate limits. The script falls back to stale stats and the build can still pass.
- Pagefind may warn about existing pages without outer `<html>` elements. Treat that as pre-existing unless your task touches those routes.

## Demo Page Policy

- Do not add public demo routes unless the user explicitly asks for a temporary experiment.
- Temporary demo pages must live in `src/pages/demo-*.astro` and use `noindex={true}`.
- Remove demo pages when the experiment is finished or promoted.
- Do not replace `src/pages/index.astro` unless the user explicitly asks to promote a demo.

## Editorial Rules

- No paid-placement language in user-facing copy.
- Keep copy factual and direct. Avoid hype, agency-style positioning, and vague proof claims.
- Every important claim in content pages needs a source.
- Tool and comparison content should use short sentences, tight paragraphs, and practical verdicts.
- Do not surface affiliate details to readers.

## Frontend Standards

- Build reference-product UI, not landing-page theater.
- Prefer clear information hierarchy over decorative cards.
- A premium AI tools wiki should answer: what to use, what changed, what changed the score, and what can be trusted.
- Check desktop and mobile views for overlap, cropped text, repeated card monotony, and copy that sounds promotional.
- Use existing components and local data before adding new abstractions.

## Content Schema Reminder

Tool pages live in `src/content/tools/` and generally include:

- `slug`, `title`, `tagline`, `category`, `company`, `url`
- `pricing_model`, `price_range`, `status`
- `last_updated`, `last_verified`
- `scores.utility`, `scores.value`, `scores.moat`, `scores.longevity`
- `tags`, `seo_title`, `meta_description`, `author`

Keep `author` as `aipedia.wiki Editorial`.
