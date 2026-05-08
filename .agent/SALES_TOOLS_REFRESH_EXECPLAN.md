# Sales Tools Refresh ExecPlan

### 1. Objective

Refresh the canonical sales-tool pages that now receive traffic from the rebuilt sales-team guide: Apollo, Clay, and Instantly. The goal is to remove stale April-era buyer claims, avoid over-specific pricing tables where vendors can change packaging, and align each tool page with the current May 8, 2026 sales-stack guidance.

### 2. Current state

The structured facts for Apollo, Clay, and Instantly were partially updated in early May, but the visible body copy still contains April 2026 SEO titles, old verification notes, exact price tables, third-party source references, and stale "automated editorial pipeline" methodology copy.

High-risk files:

- `src/content/tools/apollo.md`
- `src/content/tools/clay.md`
- `src/content/tools/instantly.md`

`src/content/tools/amplemarket.md` is more current and has a May title/date, so it is excluded unless the refreshed sales guide or checks expose a direct issue.

### 3. Target state

Each refreshed tool page should:

- use `last_updated: 2026-05-08` and `last_verified: 2026-05-08`
- have May/current SEO title and meta copy
- keep affiliate/config fields intact
- preserve structured facts but update their verification dates where directly touched
- explain best fit, watch-outs, pricing/access model, alternatives, and buyer workflow
- avoid brittle exact pricing tables unless the current official source can be audited cleanly
- cite official vendor sources rather than third-party pricing posts

### 4. Scope

Included:

- Refresh Apollo, Clay, and Instantly tool records/content.
- Keep their routes, slugs, categories, affiliate fields, and related links stable.
- Run focused stale-content audit, provenance/guide checks, build, and mobile route QA.

Excluded:

- Full Amplemarket rewrite.
- New comparison pages.
- Source registry schema changes.
- Affiliate program changes.

### 5. Source basis

Official/current source checks on 2026-05-08:

- Apollo pricing, sales engagement, data enrichment, and product pages.
- Clay pricing, integrations, and University/product pages.
- Instantly pricing, email outreach, Lead Finder, deliverability, and plans overview pages.

### 6. Implementation steps

1. Rewrite Apollo visible page copy around all-in-one prospecting, engagement, enrichment, dialer, CRM sync, and AI workflow buyer fit.
2. Rewrite Clay visible page copy around GTM enrichment, waterfalling, AI research, integrations, credits/actions, and workflow-ops buyer fit.
3. Rewrite Instantly visible page copy around outbound sending, inbox rotation, deliverability, Lead Finder separation, and sender-vs-database buyer fit.
4. Run focused content checks for `last_verified`, stale April language, brittle exact pricing tables, and source quality.
5. Run `npm run audit:provenance`, `npm run check`, `npm run build:fast`, and route/mobile QA for `/tools/apollo/`, `/tools/clay/`, and `/tools/instantly/`.

### 7. Acceptance criteria

- No refreshed tool page contains `April 2026`, `2026-04-17`, or stale "Every data point above..." verification language.
- Each page has official source links and buyer-fit guidance.
- Each page remains above the active tool content floor.
- Build and checks pass.
- Mobile QA finds no horizontal overflow and confirms one hero CTA on each refreshed tool route.

### 8. Progress log

- 2026-05-08: Created plan after the sales-team guide rewrite exposed Apollo, Clay, and Instantly as stale canonical destination pages.
- 2026-05-08: Rewrote Apollo, Clay, and Instantly visible tool-page copy around current buyer fit, official-source pricing/access framing, alternatives, and May 8 verification language.
- 2026-05-08: Wired the newly supplied Apollo affiliate URL into `src/content/tools/apollo.md` as approved affiliate metadata.
- 2026-05-08: Ran focused content checks, provenance audit, repo checks, `build:fast`, rendered affiliate propagation QA, and mobile route QA across Apollo, Clay, and Instantly.

### 9. Final report

Checkpoint complete. `npm run audit:provenance`, `npm run check`, and `npm run build:fast` passed. Rendered QA confirmed Apollo affiliate CTAs on the tool page, sales-team guide, and Apollo-vs-Clay comparison use the supplied affiliate URL with sponsored rel, affiliate tracking attributes, and no mobile overflow at 360/390/430/768/1024 widths. Sales-tool mobile QA also passed for Apollo, Clay, and Instantly with hero and sticky commercial CTAs present, no stale visible April-era copy, and no missing commercial tracking attributes.
