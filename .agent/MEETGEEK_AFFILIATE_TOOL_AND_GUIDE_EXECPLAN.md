# ExecPlan: MeetGeek Affiliate Tool And Guide

## 1. Objective

Upgrade the existing MeetGeek tool page into a source-backed affiliate money page using the supplied link and add a high-intent guide that treats MeetGeek as the best tool for a specific buyer: customer success and implementation teams that run onboarding, renewal, QBR, and stakeholder calls and need those calls to become CRM/product/task follow-up instead of forgotten recordings.

## 2. Current State

`src/content/tools/meetgeek.md` exists and was last verified on 2026-05-13, but affiliate metadata is empty and the page is less conversion-focused than the newer CloudTalk treatment. MeetGeek has a logo in `public/logos/tools/meetgeek.png` and a logo manifest entry. Relevant parent surfaces include `/tools/`, `/guides/`, `/categories/`, `/categories/ai-notes/`, `/categories/ai-automation/`, `/categories/ai-voice/`, the meeting-notes guide, Otter alternatives guide, sitemap/LLM surfaces, and `PAGE_REFRESH_LEDGER.md`.

## 3. Target State

`/tools/meetgeek/` has current 2026-05-26 pricing, feature, integration, security/compliance, watch-out, best-plan, affiliate disclosure, and source-backed decision guidance. A new guide at `/guides/best-ai-meeting-assistant-for-customer-success-teams/` positions MeetGeek as the best default for CS teams that need multilingual meeting capture, AI summaries, action items, AI Chat, CRM/task automation, and workflow triggers. Affected hubs and ledger rows are refreshed.

## 4. Scope

Included: MeetGeek tool page upgrade, affiliate metadata, one customer-success-focused guide, affected category and guide refreshes, top-layer refresh notes, ledger regeneration, and validation.

Excluded: replacing layouts, adding new comparison templates, replacing the existing MeetGeek logo unless QA finds it broken, and staging unrelated untracked files.

## 5. Files Likely Affected

`src/content/tools/meetgeek.md`, `src/content/use-cases/best-ai-meeting-assistant-for-customer-success-teams.md`, `src/content/categories/ai-notes.md`, `src/content/categories/ai-automation.md`, `src/content/categories/ai-voice.md`, `src/content/use-cases/best-ai-for-meeting-notes.md`, `src/content/use-cases/otter-ai-alternatives.md`, `src/pages/tools/index.astro`, `src/pages/guides/index.astro`, `src/pages/categories/index.astro`, `PAGE_REFRESH_LEDGER.md`, and this plan.

## 6. Verification Commands

`npm run ledger:pages`, `npm run guard:check`, `npm run test:scripts`, `npm run check:security`, `npm run check:links`, `npm run check:news`, `npm run build:fast`, `git diff --check`, and a rendered smoke check for the MeetGeek tool and new guide at mobile and desktop widths.

## 7. Acceptance Criteria

MeetGeek uses the supplied affiliate URL, current PartnerStack terms, verified pricing and plan guidance, honest alternatives, and no unsupported claims. The new guide has structured guide picks and a clear buyer. Affected parent pages are current. Logo audit, ledger check, build, link audit, and commercial CTA audit pass.

## 8. Progress Log

2026-05-26 NZ: Plan created after inspecting the existing MeetGeek tool page, ai-notes category, meeting-notes guide, Otter alternatives guide, existing logo manifest entry, and current official MeetGeek pricing/product/PartnerStack sources.

2026-05-26 NZ: Upgraded the MeetGeek tool page with supplied affiliate link, PartnerStack terms, current pricing, CS-team positioning, trust/watch-out sections, and source-backed FAQ. Added the customer-success meeting-assistant guide and refreshed affected category, guide, archive, and ledger surfaces.

2026-05-26 NZ: Verified with `npm run ledger:pages`, `npm run guard:check`, `npm run test:scripts`, `npm run check:security`, `npm run check:links`, `npm run check:news`, `npm run build:fast`, `git diff --check`, and a Playwright smoke test at 360, 390, 430, 768, and 1024 px for `/tools/meetgeek/` and `/guides/best-ai-meeting-assistant-for-customer-success-teams/`.

## 9. Final Report

Complete. MeetGeek now has an affiliate-ready tool page and a high-intent customer-success guide. QA passed; no push or commit was performed in this pass.
