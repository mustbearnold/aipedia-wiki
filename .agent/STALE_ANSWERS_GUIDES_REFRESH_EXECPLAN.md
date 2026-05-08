# Stale Answers and Guides Refresh ExecPlan

## 1. Objective

Refresh or triage stale `/answers/` pages and stale long-tail `/guides/` pages so AiPedia stays current, source-backed, mobile-first, and buyer-focused. The business goal is to protect trust and SEO quality while improving affiliate/revenue paths from high-intent answer pages into tool pages, comparison pages, and buyer guides.

## 2. Current State

The repo is an Astro static site.

- `/answers/` pages are hand-authored Astro files in `src/pages/answers/`.
- `/answers/index.astro` is a hand-curated hub that links to individual answer pages.
- `/guides/[slug].astro` renders the `use-cases` content collection from `src/content/use-cases/*.md` through `src/layouts/GuideLayout.astro`.
- The `use-cases` schema in `src/content.config.ts` supports `tools_mentioned`, `guide_picks`, `last_updated`, and `last_verified`.
- The top-layer refresh checkpoint was committed and pushed as `d4e34894`.

Known stale risks found by inspection:

- `src/pages/answers/*.astro` pages still show `Updated April 2026`, `dateModified: '2026-04-27'`, and “reflects flagship models and pricing as of April 2026.”
- The highest-priority stale answer pages are:
  - `src/pages/answers/best-ai-video-generator-2026.astro`
  - `src/pages/answers/best-ai-chatbot-2026.astro`
  - `src/pages/answers/chatgpt-alternatives-2026.astro`
  - `src/pages/answers/best-free-ai-tools-2026.astro`
  - `src/pages/answers/best-ai-coding-tool-2026.astro`
- Many long-tail guides in `src/content/use-cases/*.md` include April 2026 pricing/model/source claims, including pages such as `best-ai-automation-platform.md`, `ai-customer-support.md`, `github-copilot-alternatives.md`, `grammarly-alternatives.md`, `notion-ai-alternatives.md`, `otter-ai-alternatives.md`, `perplexity-alternatives.md`, and `suno-alternatives.md`.
- Some guides have May frontmatter but still cite April source/pricing facts in body copy, which creates visible freshness inconsistency.

## 3. Target State

For this checkpoint:

- High-priority `/answers/` pages are either refreshed with current-source verification as of 2026-05-09 or explicitly marked for merge/noindex/delete in this plan.
- Refreshed answer pages should answer quickly on mobile, link to deeper money guides and tool pages, avoid unsupported model/pricing claims, and show honest verification language.
- Stale long-tail guides are inventoried and prioritized for the next content-refresh queue instead of being blindly date-bumped.
- `/answers/`, `/guides/`, homepage modules, and `llms` surfaces are checked after child-page edits.

## 4. Scope

Included in this checkpoint:

- Audit and refresh the top 5 stale answer pages listed above.
- Update `/answers/index.astro` if answer positioning or labels change.
- Add internal links from refreshed answers to relevant buyer guides/comparisons.
- Audit stale guide inventory and record recommended page actions: refresh, merge, noindex, delete, or leave unchanged.
- Run `npm run ship:check` and route/mobile smoke checks after edits.

Excluded from this checkpoint:

- Full rewrite of all `src/content/use-cases/*.md` long-tail pages.
- Tool page template rebuilds.
- Comparison template rebuilds.
- New analytics system work beyond preserving existing tracked CTA patterns.

## 5. Files Likely Affected

- Create/modify: `.agent/STALE_ANSWERS_GUIDES_REFRESH_EXECPLAN.md`
- Modify: `src/pages/answers/best-ai-video-generator-2026.astro`
- Modify: `src/pages/answers/best-ai-chatbot-2026.astro`
- Modify: `src/pages/answers/chatgpt-alternatives-2026.astro`
- Modify: `src/pages/answers/best-free-ai-tools-2026.astro`
- Modify: `src/pages/answers/best-ai-coding-tool-2026.astro`
- Modify if labels/order change: `src/pages/answers/index.astro`
- Check after edits: `src/pages/guides/index.astro`, `src/pages/index.astro`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`
- Inventory only: `src/content/use-cases/*.md`

## 6. Data Model Impact

No schema changes are planned in this checkpoint. Content edits must not scatter pricing or model claims that should live in structured tool records. Any new volatile fact added to an answer page must have a current source trail in the page copy or be phrased as editorial analysis without unsupported specifics.

## 7. SEO Impact

Expected improvements:

- Remove stale April 2026 meta descriptions and visible verification language from high-intent answer pages.
- Improve topical paths from answer pages to money guides, comparisons, and tool reviews.
- Reduce trust risk from pages that appear out of date.
- Preserve canonical route stability for existing answer URLs.

Indexability decisions:

- Keep the top 5 answer pages indexable if refreshed.
- Recommend merge/noindex/delete candidates for weaker long-tail guides, but do not delete or noindex them in this checkpoint unless a critical low-risk issue is found.

## 8. Conversion Impact

Expected improvements:

- Answer pages should route users to buyer pages where affiliate CTAs, disclosures, and tracking already exist.
- Avoid adding raw untracked affiliate links directly to answer pages unless the existing CTA component/tracking system is used.
- Strengthen “which page next” paths: tool review, comparison, guide, or Tool Set Builder.

## 9. Mobile UX Impact

Answer pages are narrow prose pages. The refresh must keep the first mobile screen direct:

- Clear answer in the first paragraph.
- Updated verification line near the top.
- Short decision split by use case.
- No wide tables.
- Links remain readable and tappable.

Smoke checks should include 390px width for affected answer routes and `/answers/`.

## 10. Implementation Steps

1. Verify current repo state and commit/push the top-layer checkpoint if still uncommitted.
2. Inventory stale answer and guide pages with `rg` searches for April 2026 language and stale verification phrases.
3. For `best-ai-video-generator-2026`, verify current facts from official/vendor/current sources before editing. Do not assume rankings from old repo copy.
4. Refresh the video answer page with current wording, honest verification language, and links to video/avatar guides and tool pages.
5. Repeat source-backed refresh for chatbot, ChatGPT alternatives, free tools, and coding answers.
6. Update `/answers/index.astro` if the order or labels should change based on refreshed buyer intent.
7. Re-scan stale guides and record recommended page actions in this plan.
8. Check affected top-layer pages and `llms` surfaces for stale summary language.
9. Run verification commands.
10. Commit and push the checkpoint only after `npm run ship:check` passes or failures are documented.

## 11. Verification Commands

- `git status --short`
- `rg -n "April 2026|Updated April 2026|as of April 2026|reflects flagship models and pricing as of April 2026" src/pages/answers src/content/use-cases`
- `npm run ship:check`
- Local route smoke checks:
  - `/answers/`
  - `/answers/best-ai-video-generator-2026/`
  - `/answers/best-ai-chatbot-2026/`
  - `/answers/chatgpt-alternatives-2026/`
  - `/answers/best-free-ai-tools-2026/`
  - `/answers/best-ai-coding-tool-2026/`
- 390px mobile overflow smoke checks on the same routes if layout changes are made.

## 12. Acceptance Criteria

- Top 5 priority answer pages no longer contain stale April 2026 verification language.
- Any volatile claim edited in those pages is verified against current web sources as of 2026-05-09 or removed/softened.
- Refreshed pages link to relevant tool pages and deeper money guides/comparisons.
- `/answers/index.astro` remains aligned with refreshed child pages.
- Long-tail guide stale inventory and recommended actions are recorded in this plan.
- `npm run ship:check` passes or failures are documented with exact cause.
- Affected top-layer pages are checked and are not stale relative to edited child pages.

## 13. Risks and Mitigations

- Risk: unsupported current model/pricing claims. Mitigation: browse current sources before editing and avoid specifics when not verified.
- Risk: answer pages duplicate guide pages. Mitigation: keep answers short and route users to richer guide/comparison pages.
- Risk: raw affiliate links without tracking. Mitigation: link to internal tool/guide pages unless using the established CTA/tracking component.
- Risk: massive long-tail cleanup exceeds one checkpoint. Mitigation: inventory and prioritize instead of bulk-editing dozens of pages without source verification.

## 14. Progress Log

- 2026-05-09: Re-read doctrine files, verified staged top-layer checkpoint, committed and pushed `d4e34894` to `master`.
- 2026-05-09: Initial stale scan found all hand-authored answer pages still using April 2026 freshness language and many long-tail `use-cases` pages containing April 2026 body claims.
- 2026-05-09: Refreshed the top 5 priority answer pages with current-source checks and May 9, 2026 verification language:
  - `src/pages/answers/best-ai-video-generator-2026.astro` — refreshed. Added Veo 3.1, Seedance 2.0, Kling 3.0, Runway Gen-4.5, and HeyGen avatar positioning.
  - `src/pages/answers/best-ai-chatbot-2026.astro` — refreshed. Softened exact model claims and added current OpenAI, Anthropic, Google, and Perplexity source trail.
  - `src/pages/answers/chatgpt-alternatives-2026.astro` — refreshed. Updated date language and stronger internal links to comparison and guide pages.
  - `src/pages/answers/best-free-ai-tools-2026.astro` — refreshed. Updated date language and budget-guide internal links.
  - `src/pages/answers/best-ai-coding-tool-2026.astro` — refreshed. Added current-source trail for Claude Code, Cursor, and GitHub Copilot.
- 2026-05-09: Fixed Vercel Node warning by pinning `package.json` engines from `>=24.0.0` to `24.x` and updating `package-lock.json`.

### Stale Page Triage Inventory

Remaining stale `/answers/` pages found by `rg`:

| Page | Recommended action | Reason |
| --- | --- | --- |
| `src/pages/answers/best-ai-for-students.astro` | Refreshed | Good query intent; updated with May 9 source trail and link to student guide. |
| `src/pages/answers/best-ai-for-writing-2026.astro` | Refreshed | Good buyer/search intent; updated Claude/ChatGPT/Grammarly positioning and writing-guide links. |
| `src/pages/answers/best-ai-image-generator-2026.astro` | Refreshed | High commercial intent; updated with ChatGPT Images 2.0 / GPT Image 2, Midjourney, and Ideogram sources. |
| `src/pages/answers/best-ai-voice-generator-2026.astro` | Refreshed | High commercial intent; updated with ElevenLabs v3/pricing and Cartesia source trail. |
| `src/pages/answers/chatgpt-vs-claude-which-is-better.astro` | Refreshed, keep as concise router | Strong query; now routes to `/compare/chatgpt-vs-claude/` for the full comparison. |
| `src/pages/answers/is-cursor-worth-it.astro` | Refreshed | Good purchase intent; updated with Cursor, Copilot, and Claude Code source trail. |
| `src/pages/answers/is-midjourney-worth-it.astro` | Refreshed | Good purchase intent; updated with Midjourney, ChatGPT Images 2.0, and Ideogram source trail. |

High-priority stale long-tail guide candidates found by `rg`:

| Page | Recommended action | Reason |
| --- | --- | --- |
| `src/content/use-cases/best-ai-coding-assistant.md` | Refreshed | Money page; linked from refreshed coding answer; current as of 2026-05-09 for Claude Code, Cursor, Copilot, Codex, Windsurf, and Devin. |
| `src/content/use-cases/chatgpt-alternatives.md` | Refresh | Money page; linked from refreshed ChatGPT answers; current alternatives source trail must match answer pages. |
| `src/content/use-cases/best-free-ai-tools.md` | Refresh | Money/topical hub; linked from refreshed free tools answer. |
| `src/content/use-cases/best-ai-automation-platform.md` | Refresh | High buyer intent but contains specific stale version/pricing claims. |
| `src/content/use-cases/ai-customer-support.md` | Refresh or merge | Commercially valuable, but old model/version/pricing specifics make it risky until verified. |
| `src/content/use-cases/github-copilot-alternatives.md` | Merge or refresh | Potential duplicate of coding assistant and Cursor/Copilot comparison content; keep only if it has unique buyer value. |
| `src/content/use-cases/grammarly-alternatives.md` | Refresh or merge | Good long-tail intent, but stale model/pricing claims need current verification; may belong inside writing hub. |
| `src/content/use-cases/notion-ai-alternatives.md` | Refresh or noindex | Likely long-tail, lower revenue; needs unique decision value or should be noindexed/merged. |
| `src/content/use-cases/otter-ai-alternatives.md` | Refresh or merge | Could fit meeting-notes/transcription cluster; avoid duplicate thin alternative page. |
| `src/content/use-cases/perplexity-alternatives.md` | Refresh | Useful research/search query intent; update current model/pricing/source claims. |
| `src/content/use-cases/suno-alternatives.md` | Refresh or noindex | Stale audio/model claims; keep only if refreshed with current music-generator sources. |

Bulk long-tail candidate rule for the next checkpoint: pages with April 2026 claims but low commercial intent should be merged into stronger category/use-case hubs or noindexed rather than lightly date-bumped.

## 15. Final Report

Checkpoint result on 2026-05-09:

- Changed `src/pages/answers/best-ai-video-generator-2026.astro` to correct the video-model shortlist: Runway for production workflow, Veo 3.1 / Seedance 2.0 / Kling 3.0 for frontier generated-video testing, and HeyGen for avatar videos.
- Changed `src/pages/answers/best-ai-chatbot-2026.astro`, `src/pages/answers/chatgpt-alternatives-2026.astro`, `src/pages/answers/best-free-ai-tools-2026.astro`, and `src/pages/answers/best-ai-coding-tool-2026.astro` to remove April 2026 freshness language, add May 9, 2026 verification language, and strengthen internal links into buyer guides/comparisons.
- Changed `package.json` and `package-lock.json` to pin Node to `24.x`, avoiding Vercel's future-major Node auto-upgrade warning.
- Created this ExecPlan and stale-page triage inventory for remaining answer/use-case cleanup.

Commands run:

- `npm install --package-lock-only` — passed; updated lockfile engine metadata; 0 vulnerabilities.
- `npm run ship:check` — passed.
- Built route smoke + 390px overflow check against `dist-fast` for `/answers/` and the five refreshed answer pages — all returned HTTP 200 and `overflow=false`.
- `git diff --check` — passed, with only expected LF-to-CRLF warnings.

Remaining risks:

- Many `src/content/use-cases/*.md` pages still contain April 2026 body claims; high-intent pages should be refreshed first, low-value duplicates should be merged or noindexed rather than date-bumped.
- This checkpoint did not add direct affiliate CTAs to answer pages; it routes users into existing money pages where tracked CTAs/disclosures already exist.

Continuation progress:

- 2026-05-09: Added and pushed Vercel Speed Insights plus orange favicon/browser-tab assets in commit `1663f847`; `npm run ship:check` passed before push.
- 2026-05-09: Refreshed `src/content/use-cases/best-ai-coding-assistant.md` as the first high-intent stale guide. Current facts were checked against official Cursor pricing, Anthropic Max/Claude Code access, GitHub Copilot plans, Windsurf usage docs, and OpenAI Codex pages on May 9, 2026. The page now avoids stale April/model-version claims, adds Codex to the buyer set, updates `last_verified` to 2026-05-09, and keeps `/guides/` automatically aligned through guide frontmatter.
