# aipedia-wiki - Codex Operating Guide

This Astro site is the live `aipedia.wiki` codebase. Codex should treat this file as the primary agent guide. `CLAUDE.md` remains useful historical context, but new agent work should follow `AGENTS.md`.

## Agent Environment

This repo is usually edited through the native Codex Windows app.

- Assume the agent is running in Windows PowerShell unless the user explicitly says WSL.
- Prefer PowerShell-safe commands.
- Do not assume Bash-only syntax, Unix paths, or Linux-only tools.
- Run commands from the repo root unless a task clearly requires another directory.
- Use the Codex in-app browser for UI verification when a local route is involved.
- Keep sandbox permissions project-scoped unless the user explicitly approves broader access.
- If a command fails because a tool is missing, report the missing tool once and use a safe fallback. Do not repeatedly retry the same failing command.
- If a command starts a long-running process, make sure it is intentionally needed for the task.

Before complex repo work, check available tools:

```powershell
Get-Command rg, fd, jq, yq, git, gh, node, npm, pnpm, python, py, uv, pwsh -ErrorAction SilentlyContinue
```

Preferred tools when available:

- Use `rg` for text search.
- Use `rg --files`, `fd`, or `git ls-files` for file discovery.
- Use `jq` for JSON inspection.
- Use `yq` for YAML inspection.
- Use `gh` for GitHub issue, PR, and repo tasks after auth is confirmed.
- Use `node` for quick project-aware scripts.
- Use `python`, `py`, or `uv` only for small helper scripts.
- Use `apply_patch` for targeted manual edits when available.
- If `apply_patch` is unavailable, use a small PowerShell or Node script that edits only the intended file.

Fallback rules:

- If `rg` is missing, use `git grep` or PowerShell `Select-String`.
- If `fd` is missing, use `rg --files` or `git ls-files`.
- If `jq` is missing, use `node -e` for JSON inspection.
- If `yq` is missing, read the YAML file directly and make minimal edits.
- If `gh` is missing or unauthenticated, use local Git state only and tell the user what GitHub action could not be performed.

## Source Of Truth

- Edit AI tool content directly in `src/content/`.
- Do not edit `../wikis/ai-tools.legacy-backup-2026-04-17/`.
- The old dual-tree sync was retired after content-wipe risk. `src/content/` is now the single source of truth.
- Generated assets in `public/og/`, `public/pagefind/`, `src/data/logo-manifest.json`, and `src/data/_meta/` may change during builds.
- Do not treat generated-file churn as intentional source edits unless the user explicitly asked for build output updates.

## Search And File Discovery Rules

Search source files first:

```powershell
rg --files src
rg "search term" src
```

Avoid scanning generated, dependency, cache, or build folders unless the task specifically requires it:

- `node_modules/`
- `.astro/`
- `.next/`
- `dist/`
- `dist-fast/`
- `build/`
- `coverage/`
- `.cache/`
- `.turbo/`
- `.vercel/`
- `public/pagefind/`
- `public/og/`
- `src/data/_meta/`
- `src/data/logo-manifest.json`

Prefer clean repo maps:

```powershell
git ls-files
rg --files src
rg --files src/content
```

Do not crawl the whole repository blindly when a narrower path is obvious.

## Codex Workflow

1. Read this file first.
2. Inspect the local files related to the task before editing.
3. Inspect `package.json` before inventing commands.
4. Make a short plan before non-trivial edits.
5. Prefer small, scoped edits that match the existing Astro and content patterns.
6. Do not revert unrelated dirty work. This repo often has generated-file churn.
7. Do not rewrite unrelated pages.
8. Use existing components, data structures, and page patterns before adding new abstractions.
9. Verify before claiming success.
10. For UI work, use the in-app browser when a local route is involved.
11. For factual AI tool pages, pricing, news, model pages, API changes, or affiliate-sensitive content, verify current information before writing if web access is available.
12. Never invent pricing, release dates, benchmark numbers, changelog details, affiliate terms, logos, citations, or company claims.

## Commands

Run from the repo root in PowerShell:

```powershell
npm run dev
npm run dev:codex
npm run guard:check
npm run build:fast
npm run build:full:node22
npm run build
```

Notes:

- `npm run dev` starts a long-running dev server. Use it only when local UI verification is required.
- `npm run dev:codex` starts the dev server through Node 22.12.0. Prefer this in the Windows Codex app unless the shell itself is already on Node 22.12.0.
- For UI work, start or reuse the dev server, then verify the relevant route in the Codex in-app browser. Do not restart the dev server unless the previous server is dead or config changes require restart.
- `npm run build:fast` runs content guards plus an Astro build under Node 22.12.0 into `dist-fast/` while skipping GitHub stats refresh, OG generation, and Pagefind. Prefer it for local Codex verification of Astro route, template, and data changes.
- `npm run build:full:node22` runs the full production build chain through Node 22.12.0. Prefer it for final local production confidence on Windows.
- `npm run build` is heavier because it runs content guards, GitHub stats fetch, OG generation, Astro build, and Pagefind.
- Prefer `npm run guard:check`, `npm run dev`, or `npm run build:fast` before a full build when they prove the change.
- GitHub stats can hit API 403 rate limits. The script falls back to stale stats and the build can still pass.
- Pagefind may warn about existing pages without outer `<html>` elements. Treat that as pre-existing unless the task touches those routes.
- CI uses Node 22.12.0. If a local Windows Node 24 build exits with a native crash code, reproduce with Node 22.12.0 before treating it as a site failure.

If commands fail, capture the exact error and reason about the failure. Do not claim success unless the relevant command or verification step actually passed.

## Build Speed Policy

Use the lightest verification command that proves the change.

Verification ladder:

1. Content-only edits:
   - Run `npm run guard:check`.
   - Do not run the full production build unless schema, routing, or generated output may be affected.

2. UI/component/layout edits:
   - Start or reuse `npm run dev:codex` in the Windows Codex app, or `npm run dev` when the shell is already on Node 22.12.0.
   - Verify the relevant local route in the Codex in-app browser.
   - Do not run full `npm run build` for every small visual edit.

3. Astro route/template/data edits:
   - Run `npm run build:fast` if available.
   - If `build:fast` is unavailable, run the narrowest existing check.
   - `build:fast` is not a replacement for production deploy confidence because it intentionally skips generated-output steps.

4. Final production confidence:
   - Run `npm run build:full:node22` locally on Windows.
   - Run `npm run build` in CI or in a shell already pinned to Node 22.12.0.
   - This is heavier because it may run content guards, GitHub stats fetch, OG generation, Astro build, and Pagefind.

Avoid running expensive generated-output steps during normal Codex iteration:

- GitHub stats refresh
- Full OG image generation
- Pagefind indexing
- Full production build

Only run those when the task specifically touches those systems or when doing a final production check.

For UI work, prefer a running dev server plus browser verification over repeated production builds. Do not restart the dev server unless the previous server is dead or config changes require restart.

Do not delete `.astro`, `node_modules/.vite`, `.vite`, `.cache`, or other build caches unless the task is specifically about stale cache behavior.

## Demo Page Policy

- Do not add public demo routes unless the user explicitly asks for a temporary experiment.
- Temporary demo pages must live in `src/pages/demo-*.astro` and use `noindex={true}`.
- Remove demo pages when the experiment is finished or promoted.
- Do not replace `src/pages/index.astro` unless the user explicitly asks to promote a demo.

## Editorial Rules

- Keep copy factual, direct, useful, and trustworthy.
- Avoid hype, agency-style positioning, vague proof claims, and paid-placement language.
- Do not imply rankings, recommendations, or scores are paid placements.
- Do not surface internal affiliate deal terms or private monetization details to readers.
- Preserve required public disclosure components if they already exist in the page/template.
- Every important claim in content pages needs a source.
- Tool and comparison content should use short sentences, tight paragraphs, and practical verdicts.
- Prefer concrete details over broad claims.
- Separate stable facts from time-sensitive facts.
- Flag uncertainty instead of inventing missing information.
- Do not create fake citations, fake source titles, fake quotes, fake benchmarks, or fake changelog entries.
- Keep `author` as `aipedia.wiki Editorial`.

## Factual Accuracy Rules

For tool pages, comparison pages, pricing sections, news pages, model pages, and API-related pages:

- Prefer official sources for pricing, model names, plan limits, API docs, release notes, terms, and product claims.
- Use reputable secondary sources only when official sources are unavailable or when comparing external reception.
- Do not treat old notes, stale metadata, or generated cache files as current truth.
- Check dates carefully. If a fact is time-sensitive, include or preserve the relevant date.
- Do not update `last_verified` unless the relevant facts were actually checked.
- Do not update `last_updated` unless meaningful content changed.
- If information cannot be verified, say so in the edit notes or leave the claim out.

## Frontend Standards

- Build reference-product UI, not landing-page theater.
- Prefer clear information hierarchy over decorative card grids.
- A premium AI tools wiki should answer:
  - What should I use?
  - What changed?
  - What changed the score?
  - What can be trusted?
  - What are the tradeoffs?
- Check desktop and mobile views for:
  - Overlap
  - Cropped text
  - Weak contrast
  - Repeated card monotony
  - Excessive vertical spacing
  - Copy that sounds promotional
  - Components that look impressive but do not help users decide
- Use existing components and local data before adding new abstractions.
- Do not add heavy dependencies for simple UI improvements.
- Do not break dark mode.
- Do not remove accessibility labels or semantic structure.
- Preserve existing brand direction unless the user explicitly asks for a redesign.

## Content Schema Reminder

Tool pages live in `src/content/tools/` and generally include:

- `slug`
- `title`
- `tagline`
- `category`
- `company`
- `url`
- `pricing_model`
- `price_range`
- `status`
- `last_updated`
- `last_verified`
- `scores.utility`
- `scores.value`
- `scores.moat`
- `scores.longevity`
- `tags`
- `seo_title`
- `meta_description`
- `author`

Keep `author` as:

```yaml
author: aipedia.wiki Editorial
```

Do not remove required schema fields. If a schema error appears, inspect the schema before patching around it.

## Tool Page Quality Bar

A strong tool page should clearly explain:

- What the tool does.
- Who it is best for.
- Who should avoid it.
- Current pricing or pricing caveats.
- Main strengths.
- Main weaknesses.
- Best alternatives.
- Practical use cases.
- Important limitations.
- What changed recently, if relevant.
- Why the score is justified.

Avoid generic claims like:

- “Powerful AI tool”
- “Game changer”
- “Revolutionary”
- “Best-in-class” without proof
- “Seamless workflow” without explaining the workflow
- “Boosts productivity” without a specific use case

Prefer useful verdicts like:

- “Best for solo creators who need fast draft generation, but weak for teams that need approval workflows.”
- “Strong value if you already use the ecosystem, less compelling as a standalone subscription.”
- “Useful for quick prototypes, but not a replacement for production QA.”

## Comparison Page Rules

Comparison pages should be decision-focused.

Include:

- Clear winner by use case.
- Pricing caveats.
- Strengths and weaknesses.
- Differences that matter in real workflows.
- A practical recommendation.
- Alternatives if neither tool is ideal.

Do not make every tool sound equally good. Be fair, but decisive.

## News Page Rules

News content should be dated, factual, and restrained.

- Do not exaggerate announcements.
- Do not call something “launched” if it was only teased, previewed, waitlisted, or rumored.
- Separate official announcements from third-party analysis.
- Include why the update matters for users.
- Avoid turning news pages into press releases.
- Do not publish thin news pages that add no context beyond the source.

## SEO Rules

- Write for humans first.
- Keep titles clear and mobile-readable.
- Avoid keyword stuffing.
- Use `seo_title` and `meta_description` to summarize the real page value.
- Do not create near-duplicate pages for tiny keyword variations.
- Prefer helpful comparison intent over generic “best AI tools” phrasing.
- Preserve canonical or indexing rules if they already exist.

## Performance And Build Hygiene

- Do not add unnecessary client-side JavaScript.
- Prefer static Astro patterns where possible.
- Avoid loading large generated data on pages that do not need it.
- Be careful with images, OG assets, and logo manifests.
- Do not commit massive generated output unless the task requires it.
- If a build modifies generated assets, mention that in the final summary.

## Git And Dirty Work Rules

Before broad edits, inspect status:

```powershell
git status --short
```

Rules:

- Do not revert unrelated dirty work.
- Do not clean generated churn unless the task specifically requires it.
- Do not run destructive Git commands unless explicitly asked.
- Do not reset, checkout, stash, or delete user work without explicit permission.
- Keep diffs focused on the requested task.
- If existing dirty files may affect the task, mention them clearly.

## Done Criteria

A task is done only when:

- The requested files were inspected.
- The edit is scoped and intentional.
- The relevant content is factually grounded.
- No fake claims, fake sources, or placeholder links were added.
- The implementation matches the current site style.
- The most relevant available check was run, or a clear reason is given for not running it.
- UI changes were viewed in the browser when practical.
- Any generated-file changes are called out.

## Final Response Expectations

When reporting back to the user:

- Be concise.
- Say what changed.
- Mention what was verified.
- Mention any command that failed and why.
- Mention any files with meaningful edits.
- Do not overclaim.
- Do not say a build passed unless it actually passed.
- Do not hide uncertainty.
