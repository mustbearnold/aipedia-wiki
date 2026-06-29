# Daily News Update

## Purpose

Keep AiPedia news current with source-backed AI and AI-tools stories that matter to buyers, builders, and evaluators.

## When to use

Use this skill for daily or catch-up updates under `src/content/news/`, `/news/`, homepage news surfaces, RSS, LLM surfaces, and affected tool or category pages.

## Required inputs

- Target date.
- Current date.
- Candidate sources or search topics.
- Tool names or categories affected.
- Importance notes.

## Output format

- Stories published or refreshed.
- Skipped lanes with reasons.
- Sources checked.
- Affected pages and parent surfaces.
- Verification commands and outcomes.
- Follow-up refresh queue.

## Workflow steps

1. Gather current source-backed story candidates.
2. De-duplicate and reject rumor-only or weak roundup items.
3. Score buyer and builder impact.
4. Map each story to affected tools, categories, comparisons, trends, and guides.
5. Write or refresh news articles with source-backed claims and plain analysis.
6. Update `/news/`, homepage, RSS, OG assets, LLM surfaces, and ledger rows.
7. Queue affected tool or guide refreshes when buyer guidance changed.
8. Run news checks, link checks, typecheck, build, and route QA when rendered output changed.

## Safety rules

- Do not publish stale filler.
- Do not use social posts as the only source unless the official account is the primary announcement and the claim is narrow.
- Do not force both broad AI and AI-tools lanes when current sources do not support both.
- Record skipped lanes instead of inventing stories.

## Validation steps

- `npm run check:news`
- `node scripts/audit-news-rendering.mjs --json`
- `npm run check:links`
- `npm run ledger:pages && npm run ledger:pages:check`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --site-dir dist-fast/client --route /news/ --route /`

## Related scripts

- `scripts/audit-news-xrefs.mjs`
- `scripts/audit-news-rendering.mjs`
- `scripts/generate-og-news.mjs`
- `workflows/news-refresh/README.md`

## Final report requirements

List stories, skipped lanes, sources, affected pages, OG/feed/LLM updates, commands, failures fixed, and remaining queues.
