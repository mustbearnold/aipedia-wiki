# Cold Email Guide Refresh ExecPlan

## 1. Objective

Rebuild `/guides/best-ai-for-cold-email/` from a thin chatbot roundup into a current, mobile-first buyer decision page for cold email software. The page should improve SEO quality, trust, affiliate conversion, and editorial usefulness by recommending real outbound systems instead of generic assistants.

## 2. Current state

- Source file: `src/content/use-cases/best-ai-for-cold-email.md`.
- Route: `src/pages/guides/[slug].astro` renders use-case entries at `/guides/[slug]/`.
- Layout: `src/layouts/GuideLayout.astro` renders guide decision cards when frontmatter includes `guide_picks`.
- Current page claims general assistants like ChatGPT, Claude, Gemini, Jasper, and Perplexity are the best AI tools for cold email.
- Current page uses weak third-party roundup sources, stale "April 2026" copy, unsupported reply-rate claims, and no structured `guide_picks`.
- Existing strong adjacent pattern: `src/content/use-cases/best-ai-tools-for-sales-teams.md` uses Apollo, Instantly, Clay, and Amplemarket with source-backed buyer logic.
- Current audit guard: `scripts/audit-guide-picks.mjs` protects required money guides with `guide_picks`.
- Current commercial CTA audit: `scripts/audit-commercial-cta.mjs` protects representative routes and known affiliate links.

## 3. Target state

- The guide explains that cold email buying is about lead data, enrichment, sender infrastructure, deliverability, compliance, sequence operations, and reply handling, not just text generation.
- Mobile first screen shows structured buyer picks through `guide_picks`:
  - Best overall: Apollo.io.
  - Budget/outbound execution: Instantly.
  - Pro/team GTM workflow: Clay.
- Amplemarket is included as an AI SDR suite candidate, with a tracked affiliate CTA in the ranked guide list.
- ChatGPT is reframed as a drafting/research helper, not ranked as a cold-email platform.
- Official sources are current as of 2026-05-08.
- The audit suite protects this guide from losing structured picks or required affiliate CTA propagation.

## 4. Scope

Included:
- Rewrite `src/content/use-cases/best-ai-for-cold-email.md`.
- Add `best-ai-for-cold-email` to required guide-pick audit coverage.
- Add `/guides/best-ai-for-cold-email/` to commercial CTA audit coverage for Apollo and Amplemarket affiliate propagation.
- Run guide-pick, commercial CTA, script, check, build, and mobile overflow verification.

Excluded:
- Full Amplemarket tool-page rewrite.
- New affiliate programs for Instantly or Clay.
- New template redesign work; this checkpoint reuses the current guide layout.

## 5. Files likely affected

- `src/content/use-cases/best-ai-for-cold-email.md`
- `scripts/audit-guide-picks.mjs`
- `scripts/audit-commercial-cta.mjs`
- `tests/scripts/audit-commercial-cta.test.mjs`
- `.agent/COLD_EMAIL_GUIDE_REFRESH_EXECPLAN.md`

## 6. Data model impact

- Adds structured `guide_picks` to the cold-email guide.
- Keeps tool facts centralized in existing tool records.
- Uses `tools_mentioned` to render the ranked guide CTA list for Apollo, Instantly, Clay, and Amplemarket.

## 7. SEO impact

- Replaces generic/stale AI roundup content with a buyer-intent page targeting cold-email software decisions.
- Updates title, meta description, description, dates, sources, and content depth.
- Adds original decision logic, alternatives, buying rules, compliance watch-outs, and source-backed recommendations.

## 8. Conversion impact

- Adds structured decision-card CTAs for Apollo, Instantly, and Clay.
- Keeps Apollo affiliate CTA visible in the best-overall position.
- Adds Amplemarket to the ranked CTA list for the AI SDR suite buyer path.
- Commercial CTA audit will require Apollo and Amplemarket affiliate links on the built guide.

## 9. Mobile UX impact

- The current `GuideLayout` renders buyer decision cards before the long article body.
- The rewritten intro is short and verdict-led for mobile scanning.
- The page avoids wide tables as the only decision mechanism; prose and bullets carry the decision for narrow screens.
- Mobile QA must check 360, 390, 430, 768, and 1024+ widths for horizontal overflow and CTA/disclosure visibility.

## 10. Implementation steps

1. Verify current official sources for Apollo, Instantly, Clay, and Amplemarket.
2. Rewrite the cold-email guide with `guide_picks`, current dates, official sources, and buyer-first content.
3. Add the guide to `audit-guide-picks` required coverage.
4. Add the guide to `audit-commercial-cta` representative money-route coverage.
5. Update commercial CTA audit tests for the new protected route.
6. Run targeted audits, full script tests, Astro check, fast build, and mobile overflow QA.

## 11. Verification commands

- `node scripts/audit-guide-picks.mjs`
- `node --test tests/scripts/audit-commercial-cta.test.mjs`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- Playwright/mobile QA for `/guides/best-ai-for-cold-email/` at 360, 390, 430, 768, and 1024.

## 12. Acceptance criteria

- `/guides/best-ai-for-cold-email/` has current 2026-05-08 source-backed recommendations.
- The guide has `guide_picks.best_overall`, `guide_picks.budget`, and `guide_picks.pro_team`.
- Apollo affiliate CTA appears on the page with tracking and disclosure.
- Amplemarket affiliate CTA appears on the page with tracking and disclosure.
- No fake reply-rate, model, or pricing claims are introduced.
- Relevant checks pass or failures are documented with exact causes.

## 13. Risks and mitigations

- Risk: Official pricing pages are partially dynamic. Mitigation: avoid unsupported exact Apollo price claims and source plan/feature guidance from official pricing/help/product pages.
- Risk: Amplemarket tool record still contains older detailed claims outside this checkpoint. Mitigation: keep this guide's Amplemarket claims limited to official pricing/product surfaces verified on 2026-05-08 and log full Amplemarket refresh as follow-up if needed.
- Risk: Adding audit coverage can fail builds if the guide does not render expected CTAs. Mitigation: run `build:fast` and the commercial CTA audit before completion.

## 14. Progress log

- 2026-05-08: Created plan after inspecting doctrine, current guide content, guide layout, content schema, and audit scripts. Verified official Apollo, Instantly, Clay, and Amplemarket sources before editing.
- 2026-05-08: Rewrote `src/content/use-cases/best-ai-for-cold-email.md` into a 1,568-word buyer guide with structured `guide_picks`, updated metadata, official sources, and current verification dates.
- 2026-05-08: Added `best-ai-for-cold-email` to required guide-pick audit coverage.
- 2026-05-08: Added `/guides/best-ai-for-cold-email/` to commercial CTA audit coverage, requiring tracked Apollo and Amplemarket affiliate links plus nearby disclosure.
- 2026-05-08: Verification passed:
  - `node scripts/audit-guide-picks.mjs`
  - `node --test tests/scripts/audit-commercial-cta.test.mjs`
  - `npm run test:scripts`
  - `npm run check`
  - `npm run build:fast`
  - Playwright mobile QA at 360, 390, 430, 768, and 1024 widths.
  - In-app browser opened to `http://127.0.0.1:4321/guides/best-ai-for-cold-email/`.

## 15. Final report

The cold-email guide now behaves like a money page instead of a generic AI roundup. It recommends Apollo, Instantly, and Clay by buyer type, preserves Amplemarket as a higher-commitment AI SDR option, removes unsupported chatbot/model claims, and protects affiliate propagation with build-time audits.

Remaining follow-up: the Amplemarket standalone tool page still has older detailed copy from 2026-05-04; the cold-email guide's Amplemarket claims were rechecked on 2026-05-08, but a full Amplemarket tool-page refresh should be a later checkpoint.
