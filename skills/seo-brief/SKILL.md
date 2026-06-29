# SEO Brief

## Purpose

Generate practical SEO briefs for AiPedia pages without inventing keyword data or creating thin search pages.

## When to use

Use this skill before creating a new tool page, guide, comparison, affiliate page, answer page, or refreshed category angle.

## Required inputs

- Target query or topic.
- Audience.
- Page type.
- Existing pages to avoid duplicating.
- Commercial intent.
- Current date when volatile facts are part of the brief.

## Output format

- Search intent.
- Recommended page type.
- First-screen answer.
- Title and meta direction.
- Required facts and sources.
- Internal links.
- CTA and conversion notes.
- Risks.

## Workflow steps

1. Identify the user job behind the query.
2. Check existing AiPedia pages for overlap.
3. Select page type: tool, guide, comparison, answer, news, workflow, or category.
4. Define first-screen promise, trust proof, and decision path.
5. List required current-source facts.
6. Suggest title, meta, H1, section outline, internal links, and schema.
7. Identify affiliate or CTA opportunities only when trust-safe.
8. Define validation commands.

## Safety rules

- Do not invent keyword volume, difficulty, or SERP features.
- Do not create a page when an existing page can be improved.
- Do not recommend same-job comparisons unless the tools truly overlap.
- Do not use generic AI filler.

## Validation steps

- `npm run check:links` after implementation.
- `npm run audit:coverage-quality:changed` for comparison or guide pages.
- `npm run audit:affiliate-conversion -- --strict --json` for affiliate pages.
- `npm run build:fast` when rendered pages are implemented.

## Related scripts

- `scripts/decision-loop.mjs`
- `scripts/audit-coverage-quality.mjs`
- `scripts/audit-affiliate-conversion-pages.mjs`
- `scripts/check-smart.mjs`

## Final report requirements

Include intent, page type, duplicate-risk decision, source requirements, internal links, CTA posture, and implementation checks.
