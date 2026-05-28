# Rytr Affiliate Activation ExecPlan

## 1. Objective

Activate the user's Rytr affiliate link while keeping AiPedia's Rytr buying advice current, source-backed, mobile-safe, and properly disclosed. This supports affiliate conversion, trust, revenue tracking, and editorial maintainability.

## 2. Current State

`src/content/tools/rytr.md` has an older Rytr referral URL, 30-day cookie metadata, and 2026-05-13 verification. The live Rytr pricing page now lists Free, Unlimited, and Premium with annual paid prices of $7.50/month and $24.16/month. The Rytr affiliate page lists 30% recurring commission for 12 months, 60-day cookies, paid-search brand restrictions, PayPal payout rules, and a $100 payout threshold. `src/content/comparisons/chatgpt-vs-rytr.md` contains stale pricing language. `/tools/`, `/categories/`, `/compare/`, and LLM surfaces summarize the changed records.

## 3. Target State

Rytr CTAs use `https://rytr.me/?via=wikiaipedia`, are marked as affiliate destinations, and include disclosure near commercial clicks. Rytr pricing, feature, and affiliate facts are reverified as of 2026-05-28. The AI Writing category and ChatGPT vs Rytr comparison are refreshed enough that parent and comparison surfaces do not contradict the tool page.

## 4. Scope

Included: Rytr tool record, source registry, tools registry, AI Writing category, ChatGPT vs Rytr comparison, affected top-layer metadata, desktop affiliate todo list, page refresh ledger, checks/build/mobile QA, commit, and push to `master`.

Excluded: broad AI writing category rerank, new Rytr logo work, unrelated writing-tool guide refreshes, and unrelated scratch files.

## 5. Files Likely Affected

`src/content/tools/rytr.md`, `src/content/categories/ai-writing.md`, `src/content/comparisons/chatgpt-vs-rytr.md`, `src/data/source-registry.json`, `src/data/_meta/tools-registry.json`, `src/pages/tools/index.astro`, `src/pages/categories/index.astro`, `src/pages/compare/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `PAGE_REFRESH_LEDGER.md`, and `C:\Users\mustb\OneDrive\Desktop\aipedia-affiliate-applications-to-do.txt`.

## 6. Data Model Impact

Update Rytr affiliate fields, verification dates, pricing history, source IDs, and registry metadata. Add `rytr-affiliate` to the source registry.

## 7. SEO Impact

Update titles/meta only where freshness language is stale. Preserve canonical routes and indexability. Refresh affected parent hubs and LLM manifests so crawlers see the latest commercial state.

## 8. Conversion Impact

Commercial CTAs should emit existing `CommercialCTA` affiliate tracking with `toolSlug=rytr`, `pageType`, placement, affiliate destination, sponsored rel, and visible disclosure. The affiliate link must not override editorial caveats.

## 9. Mobile UX Impact

Rendered Rytr, AI Writing, and ChatGPT vs Rytr pages must fit at 360, 390, 430, 768, and 1024px without horizontal overflow; primary affiliate CTA/disclosure must be visible and usable.

## 10. Implementation Steps

1. Verify Rytr and ChatGPT volatile facts from current official May 2026 sources.
2. Patch Rytr tool, comparison, category, registries, top-layer metadata, and desktop affiliate todo list.
3. Regenerate `PAGE_REFRESH_LEDGER.md`.
4. Run `npm run check`, `npm run build:fast`, rendered CTA/mobile QA, and git whitespace checks.
5. Stage intended files only, commit, and push to `origin/master`.

## 11. Verification Commands

`npm run ledger:pages`, `npm run check`, `npm run build:fast`, rendered Playwright/Chromium QA at 360/390/430/768/1024, `git diff --check`, `git diff --cached --check`.

## 12. Acceptance Criteria

Rytr affiliate URL renders on the tool page and affected comparison/category surfaces where commercial CTAs appear. Every changed page has ledger coverage. Checks/build pass. Parent hubs and LLM surfaces are updated. Unrelated untracked scratch files remain untouched.

## 13. Risks and Mitigations

Risk: Rytr's pricing page hides monthly prices behind client-side toggles. Mitigation: foreground official annual prices and say monthly billing is higher unless the rendered source exposes exact monthly values. Risk: comparison facts drift through ChatGPT changes. Mitigation: verify only the narrow ChatGPT Plus/current plan facts needed for the comparison from official OpenAI surfaces.

## 14. Progress Log

- 2026-05-28: Plan opened after verifying Rytr pricing, homepage/features, affiliate terms, and ChatGPT Plus/pricing surfaces from official current sources.
- 2026-05-28: Patched Rytr tool affiliate/pricing data, ChatGPT vs Rytr comparison, AI Writing category, source registry, top-layer metadata comments, desktop affiliate todo list, and regenerated `PAGE_REFRESH_LEDGER.md`.
- 2026-05-28: `npm run check`, `npm run build:fast`, `git diff --check`, and rendered mobile QA at 360/390/430/768/1024 passed.

## 15. Final Report

Rytr affiliate activation is ready to commit and push: the tool page, comparison, AI Writing category, registries, top-layer metadata, LLM surfaces, desktop affiliate todo file, and ledger were refreshed. No unrelated scratch files were edited or staged.
