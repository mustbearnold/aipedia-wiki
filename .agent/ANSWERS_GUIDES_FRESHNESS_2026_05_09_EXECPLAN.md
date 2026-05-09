# ExecPlan: Answers and Long-Tail Guide Freshness Checkpoint

## 1. Objective
Refresh or triage stale high-intent `/answers/` and long-tail `/guides/` pages so AiPedia's answer surfaces are current, source-backed, mobile-first, internally linked, and useful for buyer decisions as of 2026-05-09.

## 2. Current state
- `/answers/` is implemented as hardcoded Astro routes in `src/pages/answers/*.astro`.
- `/guides/` is a dynamic route over the `use-cases` content collection in `src/pages/guides/[slug].astro`, with parent hub `src/pages/guides/index.astro`.
- Priority answer pages already show `Verified May 9, 2026`, but the template is text-heavy and lacks a reusable first-screen buyer-decision module.
- `/answers/index.astro` is manually curated and must remain aligned with answer route changes.
- Many guide pages live in `src/content/use-cases/*.md`; several have April 2026 verification dates and need triage.

## 3. Target state
- Priority answer pages quickly state winner, best use case, avoid-if, next click, and source basis on mobile.
- Pages with current claims are checked against current sources before edits.
- Weak/stale long-tail guides are classified as refresh, merge, noindex, delete, or leave unchanged.
- Affected parent hubs (`/answers/`, `/guides/`) remain current and stronger than child pages.

## 4. Scope
Included:
- Audit priority `/answers/` pages listed in the goal.
- Inspect stale high-intent `/guides/` records with April 2026 claims.
- Implement the first safe refresh batch for the highest SEO/revenue pages.
- Update `/answers/` and `/guides/` parent surfaces if child pages change.

Excluded for this checkpoint:
- Full site-wide guide cleanup across every long-tail page.
- Deleting/noindexing pages without a route/indexing impact pass.

## 5. Files likely affected
- `src/pages/answers/best-ai-video-generator-2026.astro`
- `src/pages/answers/best-ai-chatbot-2026.astro`
- `src/pages/answers/chatgpt-alternatives-2026.astro`
- `src/pages/answers/best-free-ai-tools-2026.astro`
- `src/pages/answers/best-ai-coding-tool-2026.astro`
- `src/pages/answers/index.astro`
- Potential guide files under `src/content/use-cases/`
- `src/pages/guides/index.astro` if guide grouping/copy changes

## 6. Data model impact
No schema migration planned. Any refreshed content must use existing route/content structures and source fields.

## 7. SEO impact
Improve answer pages' search intent match, freshness language, source-backed claims, internal links, and uniqueness. Long-tail guides will be triaged to avoid crawl quality drag.

## 8. Conversion impact
Improve next-click paths to tool pages, comparisons, and money guides. Keep disclosures near commercial guidance where relevant.

## 9. Mobile UX impact
Priority pages must avoid horizontal overflow at 360/390/430/768/1024 and present useful decisions above the fold.

## 10. Implementation steps
1. Inventory answers and stale guides with dates, source blocks, and claim patterns.
2. Verify current volatile facts for the first priority answer batch using current sources.
3. Refresh the highest-impact answer pages or mark leave unchanged with reason.
4. Audit top stale guide candidates and create a triage table/artifact.
5. Update top-layer `/answers/` and `/guides/` surfaces where affected.
6. Run checks and browser/mobile smoke tests.

## 11. Verification commands
- `npm run check:content`
- `npm run ship:check`
- Playwright smoke/overflow check for affected routes at 390px, plus representative desktop.

## 12. Acceptance criteria
- Priority pages have explicit decisions and current verification evidence.
- Weak/stale guide candidates have documented action recommendations.
- Parent hubs remain aligned.
- Checks pass or failures are documented.

## 13. Risks and mitigations
- Risk: updating claims without current sources. Mitigation: browse and cite current primary/vendor sources before edits.
- Risk: parent hub drift. Mitigation: update/check `/answers/` and `/guides/` after child changes.
- Risk: over-editing low-value pages. Mitigation: triage before changing long-tail pages.

## 14. Progress log
- 2026-05-09: Created plan after confirming clean `master` and inspecting answer/guide route structure.
- 2026-05-09: Added reusable `AnswerDecisionPanel` and applied it to the five priority answer routes: video generator, chatbot, ChatGPT alternatives, free AI tools, and coding tool.
- 2026-05-09: Updated `/answers/` parent hub with current May 9 refresh signal and short answer summaries for the refreshed priority pages.
- 2026-05-09: Added `.agent/STALE_ANSWERS_GUIDES_TRIAGE_2026_05_09.md` with refresh/merge/noindex/leave decisions for priority answer and guide pages.
- 2026-05-09: Refreshed `midjourney-alternatives` and `elevenlabs-alternatives` against current official/vendor sources, added guide picks, removed stale pricing/model claims, and promoted both refreshed alternatives pages on `/guides/`.
- 2026-05-09: Added content-level guide `noindex` support and noindexed the weak overlapping under-$10 and under-$50 budget guide routes, replacing stale unsupported claims with merge guidance toward stronger budget/category pages.
- 2026-05-09: Refreshed `best-ai-tools-under-20-month` against official pricing/help sources, added guide picks, removed unsupported April model claims, and reframed the page around buyer jobs rather than a brittle 40-tool price table.
- 2026-05-09: Rebuilt `best-ai-tools-for-recruiters` with official current sources, removed unsupported April claims and broken markdown links, added LinkedIn Recruiter, hireEZ, Paradox, and Eightfold AI tool records, and promoted the guide on `/guides/`.
- 2026-05-09: Noindexed and merged weak `best-ai-tools-for-real-estate-agents` and `best-ai-tools-for-nonprofits` guide routes, excluded them from sitemap and `/guides/`, and replaced stale generic chatbot claims with rebuild criteria and stronger internal paths.
- 2026-05-09: Noindexed and merged weak `otter-ai-alternatives` and `notion-ai-alternatives` routes, excluding them from sitemap and `/guides/` and routing users to stronger meeting-note, Notion comparison, and tool pages.
- 2026-05-09: Refreshed `runway-alternatives` with current official Runway, Google Veo 3.1, ByteDance Seedance 2.0, Kuaishou Kling 3.0, and Luma sources; added Seedance/Kling/Veo guide picks; removed the table-led mobile section; and promoted the guide on `/guides/`.
- 2026-05-09: Refreshed the AI music guide cluster: `suno-alternatives`, `best-ai-music-generator`, and parent category `ai-music` now use current official Suno, Udio, ElevenLabs Music, AIVA, Mubert, and Stable Audio sources; removed stale April pricing/model claims and bad markdown links; added guide picks; and promoted the refreshed music guides on `/guides/`.
- 2026-05-09: Refreshed `jasper-alternatives` and the parent `ai-writing` category with current official Jasper, ChatGPT, Claude, Copy.ai, Writer, and Typeface sources; removed stale generic-model rankings and bad markdown links; added guide picks; and promoted the refreshed Jasper guide on `/guides/`.
- 2026-05-09: Refreshed `best-ai-for-blog-writing` with current official ChatGPT, Claude, Jasper, and Surfer SEO sources; removed stale April model/pricing claims and table-led mobile flow; added Surfer SEO as the SEO/AI-visibility layer; kept the parent `ai-writing` category aligned; and promoted the refreshed blog-writing guide on `/guides/`.
- 2026-05-09: Refreshed `best-ai-for-meeting-notes` and parent `ai-notes` category with current official Fathom, Fireflies, Otter, Read AI, NotebookLM, Notion, and Obsidian sources; removed unsupported accuracy/version claims and bad markdown links; added Read AI to the buyer set; and promoted the guide on `/guides/`.

## 15. Final report
Pending.
