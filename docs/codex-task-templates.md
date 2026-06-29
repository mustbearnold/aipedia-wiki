# Codex Task Templates

Use these prompts when starting repeatable AiPedia tasks. Replace bracketed values and keep the current month and year in source searches for volatile facts.

## Refresh One AI Tool Page

```text
Refresh `/tools/[slug]/` for [tool name].

Inputs:
- Tool slug:
- Current reason:
- Official URL:
- Pricing URL:
- Docs URL:
- Affiliate URL if any:

Use `skills/tool-page-refresh/SKILL.md`. Verify current pricing, model/API access, best plan, watch-out, alternatives, source IDs, parent hubs, LLM/search surfaces, and `PAGE_REFRESH_LEDGER.md`. Run focused tool-quality, provenance, frontmatter, ledger, typecheck/build/route QA as required. Report facts changed, caveats, commands, and risks.
```

## Create One New AI Tool Page

```text
Create a new source-backed AiPedia tool page for [tool name].

Inputs:
- Category:
- Official URL:
- Docs URL:
- Pricing URL:
- GitHub URL if any:
- Affiliate URL if any:
- Target user:

Use `skills/new-tool-page/SKILL.md`. Confirm the tool is not already present, gather official current sources, create the tool markdown with full decision sections, add source registry rows, add or verify the logo, regenerate logo and OG manifests, update parent hubs and top-layer surfaces, update `PAGE_REFRESH_LEDGER.md`, and run required checks.
```

## Create One Comparison Page

```text
Create a comparison page for [tool A] vs [tool B] for [audience].

Inputs:
- Decision angle:
- Buyer job:
- Existing tool pages:
- Affiliate priority:

Use `skills/comparison-page-builder/SKILL.md`. First verify both tools solve the same buyer job. If not, stop and report why this is a false-vs pair. If valid, gather current facts, create choose-X-if / choose-Y-if guidance, update parent hubs and links, validate sources, and run comparison quality checks.
```

## Create One Affiliate Buyer-Intent Page

```text
Create an affiliate buyer-intent page for [tool] targeting [specific buyer].

Inputs:
- Buyer intent keyword:
- Primary tool:
- Competitors:
- Conversion goal:
- Affiliate status:

Use `skills/affiliate-page-builder/SKILL.md`. Confirm distinct intent, verify current pricing and CTA facts, write the page as a buyer decision, add honest alternatives and disclosures, update parent hubs and tool/support pages, update ledger, and run strict affiliate plus rendered checks.
```

## Update One Daily News Page

```text
Run the daily AI tools news update for [date].

Inputs:
- Candidate sources:
- Tool names:
- Importance notes:

Use `skills/daily-news-update/SKILL.md` and `workflows/news-refresh/README.md`. Gather current source-backed stories, skip weak lanes with a note, publish only buyer-relevant stories, update `/news/`, homepage, RSS/LLM surfaces, affected tool/category/trend pages, OG assets, and ledger. Run news checks and route QA.
```

## Audit Stale Pages

```text
Audit stale AiPedia pages for [section or type].

Inputs:
- Section:
- Date window:
- Limit:

Use `skills/page-quality-audit/SKILL.md`. Read `PAGE_REFRESH_LEDGER.md`, freshness queues, source registry, provenance audits, and page quality signals. Return a ranked queue with reasons, affected parent surfaces, required sources, and recommended workflow.
```

## Improve Homepage Section

```text
Improve the homepage [section name] without changing unrelated sections.

Inputs:
- Problem:
- Target outcome:

Read `DESIGN.md`, `src/pages/index.astro`, relevant components, search or data sources, and affected child pages. Preserve mobile-first content, avoid layout regressions, update parent/source/ledger surfaces only if facts or public content change, and run visual route QA.
```

## Improve Internal Links

```text
Improve internal links for [page or cluster].

Inputs:
- Source route:
- Target cluster:
- Goal:

Use `skills/internal-linking/SKILL.md`. Find current related pages, same-buyer-job comparisons, category hubs, guide siblings, and LLM/search implications. Add only useful links, avoid thin reciprocal link spam, and validate with link checks.
```

## Improve Affiliate CTAs

```text
Improve affiliate CTAs for [tool or page].

Inputs:
- Page route:
- Tool slug:
- CTA problem:

Verify current affiliate approval state and official fallback. Improve CTA labels, placement IDs, disclosure proximity, and buyer context without overstating benefits. Run strict affiliate audit and rendered checks when UI changes.
```

## Clean One Repo Area

```text
Clean the repo area [path or system].

Inputs:
- Problem:
- Expected behavior:
- Files likely affected:

Use `skills/repo-maintenance/SKILL.md`. Inspect first, preserve URLs and build behavior, keep the change narrow, update docs only when the workflow changes, and run script tests or check:quick.
```

## Validate One Page For Factuality

```text
Validate factuality for [route or file].

Inputs:
- Page path:
- Claims of concern:
- Source URLs:

Use `skills/fact-check-page/SKILL.md`. Extract claims, classify volatility, verify against current official sources, update caveats or source IDs if editing is requested, and report unsupported or stale claims plainly.
```

## Generate One SEO Brief

```text
Generate an SEO brief for [topic].

Inputs:
- Target query:
- Audience:
- Existing pages to avoid duplicating:
- Commercial intent:

Use `skills/seo-brief/SKILL.md`. Map intent, same-job competitors, internal links, source needs, page type, title/meta direction, first-screen answer, trust elements, and validation commands. Do not invent keyword volumes unless supplied or sourced.
```
