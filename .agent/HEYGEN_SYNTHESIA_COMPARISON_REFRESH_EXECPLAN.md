# HeyGen vs Synthesia Comparison Refresh ExecPlan

## 1. Objective

Refresh `src/content/comparisons/heygen-vs-synthesia.md` into a current, source-backed, mobile-first buyer decision page for avatar-video shoppers. The page is a high-intent commercial comparison and currently carries stale April source notes plus only about 524 body words, below the comparison thin-risk threshold.

## 2. Current state

- Route: `/compare/heygen-vs-synthesia/`
- Content file: `src/content/comparisons/heygen-vs-synthesia.md`
- Current body word count: about 524 words.
- Current metadata: `last_verified: 2026-05-05`, source bullets still say verified 2026-04-15.
- Current visible buyer issue: pricing and plan copy does not reflect the May 8 tool-fact refresh. HeyGen Creator is now verified at $29/mo; Synthesia Starter is $29/mo monthly and Creator is $89/mo monthly.

## 3. Current sources checked on 2026-05-08

- HeyGen pricing: `https://www.heygen.com/pricing`
- HeyGen security: `https://www.heygen.com/security`
- HeyGen LiveAvatar help: `https://help.heygen.com/en/articles/10035615-how-to-get-started-with-liveavatars`
- Synthesia pricing: `https://www.synthesia.io/pricing`
- Synthesia security practices: `https://www.synthesia.io/legal/security-practices`
- Synthesia personal avatar docs: `https://docs.synthesia.io/docs/personal-avatars`

## 4. Target state

The comparison page should:

- Preserve a decisive first-screen answer through the existing comparison layout.
- Update metadata and visible verification dates to 2026-05-08.
- Explain the editorial winner honestly: HeyGen for most self-serve marketing/sales/avatar-video buyers; Synthesia for enterprise L&D, SCORM, governance, and training systems.
- Replace stale pricing and unsupported "benchmark" phrasing with current official source-backed claims.
- Include clear plan guidance, watch-outs, and source links.
- Raise the page above the 700-word comparison floor without adding filler.

## 5. Scope

Included:

- Rewrite `src/content/comparisons/heygen-vs-synthesia.md`.
- Re-run focused KPI/fact/provenance checks and build/check commands.
- Run local mobile viewport QA for `/compare/heygen-vs-synthesia/`.

Excluded:

- Template changes.
- New affiliate applications.
- Bulk comparison noindexing.
- New source-registry IDs, unless the existing registry is insufficient.

## 6. Verification commands

- Body word-count check for `src/content/comparisons/heygen-vs-synthesia.md`
- `node scripts/audit-site-kpis.mjs --json`
- `node scripts/audit-tool-facts.mjs --json`
- `npm run audit:provenance`
- `npm run check`
- `npm run build:fast`
- Local viewport QA at 360, 390, 430, 768, and 1024 px

## 7. Acceptance criteria

- The comparison body is above 700 words.
- No stale visible April verification remains on the page.
- Current pricing/plan claims match official sources checked on 2026-05-08.
- Build/check commands pass.
- The route returns 200 and has no horizontal overflow at required mobile widths.

## 8. Progress log

- 2026-05-08 05:23 UTC: Identified `heygen-vs-synthesia` as the next checkpoint after tier-1 fact coverage; verified current official pricing/security/avatar sources before editing.
- 2026-05-08 05:35 UTC: Rewrote the comparison from about 524 body words to about 1,891 words. Removed stale April verification notes, updated frontmatter to 2026-05-08, and reframed the page around buyer intent, plan guidance, security/governance, watch-outs, and official May 8 sources.
- 2026-05-08 05:38 UTC: Verification passed. `audit-site-kpis` now reports comparison thin-risk count at 200, down from 201, with `heygen-vs-synthesia` no longer in the thin set. `npm run test:scripts`, `npm run check`, and `npm run build:fast` passed. Local viewport QA for `/compare/heygen-vs-synthesia/` passed at 360, 390, 430, 768, and 1024 px with no horizontal overflow and 3 tracked commercial CTAs.

## 9. Final report

Checkpoint complete. `HeyGen vs Synthesia` is now a current, source-backed buyer decision page instead of a short feature comparison. It gives a clear default winner for self-serve avatar video, a clear enterprise/training exception for Synthesia, current May 8 pricing and security notes, stronger plan guidance, visible sources, and enough original editorial substance to clear the comparison word floor.

Verification completed:

- Word-count check: about 1,891 body words; no stale April verification strings.
- `node scripts/audit-site-kpis.mjs --json`: comparison thin-risk count dropped from 201 to 200.
- `node scripts/audit-tool-facts.mjs --json`: tier-1 completeness remains 100%.
- `npm run audit:provenance`: 731 registered sources; 1397 fact records; 0 missing source IDs.
- `npm run test:scripts`: 15/15 script tests passed.
- `npm run check`: passed.
- `npm run build:fast`: passed; 905 pages built; indexability and representative commercial CTA audits passed.
- Browser/mobile QA: `/compare/heygen-vs-synthesia/` returned 200 and had no horizontal overflow at 360, 390, 430, 768, or 1024 px.

Remaining risks:

- 200 comparison pages still remain below the current comparison word floor.
- This checkpoint did not change comparison templates; it strengthened one high-value money page using the existing mobile-first comparison layout.
