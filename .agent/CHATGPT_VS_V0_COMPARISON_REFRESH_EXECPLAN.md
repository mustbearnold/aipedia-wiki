# ChatGPT vs v0 Comparison Refresh ExecPlan

## 1. Objective

Refresh `src/content/comparisons/chatgpt-vs-v0.md` into a current, source-backed buyer decision page comparing ChatGPT as a broad AI assistant / Codex workspace against v0 as Vercel's AI app and UI builder.

## 2. Current state

- Route: `/compare/chatgpt-vs-v0/`
- Content file: `src/content/comparisons/chatgpt-vs-v0.md`
- Current body word count: about 512 words, below the 700-word comparison quality floor.
- The page says the comparison is based on April 15, 2026 and links non-primary third-party "best AI tools/models" pages instead of current primary sources.
- It says v0 has "unlimited at $20/mo," but the current public v0 pricing page shows Free, Team, Business, and Enterprise plus token-priced model usage; it does not expose that old unlimited claim.
- It describes v0 mostly as React + Tailwind + shadcn UI component generation, while current v0 docs position it as an AI agent for real code, full-stack apps, backend connections, deployments, PRs, and Vercel workflows.
- It overstates ChatGPT API context in a buyer comparison without clearly distinguishing ChatGPT plan context from OpenAI API model context.

## 3. Current sources checked on 2026-05-08

- ChatGPT pricing: `https://openai.com/chatgpt/pricing/` redirected to `https://chatgpt.com/pricing/`
- OpenAI model docs: `https://platform.openai.com/docs/models`
- ChatGPT Pro help: `https://help.openai.com/en/articles/9793128-what-is-chatgpt-pro`
- v0 pricing: `https://v0.app/pricing`
- v0 docs: `https://v0.app/docs`
- Vercel updated v0 pricing announcement: `https://vercel.com/blog/updated-v0-pricing`
- v0 changelog: `https://v0.app/changelog`

## 4. Target state

- Current May 8, 2026 frontmatter and visible verification language.
- Clear buyer split:
  - ChatGPT for broad daily assistant work, reasoning, research, images, voice, files, Codex, and general coding help.
  - v0 for teams turning product ideas, screenshots, Figma, prompts, and code changes into web apps, prototypes, Vercel deploys, and PRs.
- Remove stale v0 `$20 unlimited` and third-party source claims.
- Explain pricing without pretending v0 is a simple unlimited subscription.
- Explain that OpenAI API model context and ChatGPT plan context are separate buyer facts.
- Clear comparison floor without filler.
- Maintain tracked commercial CTAs from the comparison layout.

## 5. Scope

Included:

- Rewrite `src/content/comparisons/chatgpt-vs-v0.md`.
- Update title, metadata, dates, body, FAQ, and source list.
- Run focused stale-string/word-count checks, KPI/fact/provenance checks, check/build, app-browser QA, viewport QA, and CTA payload checks.

Excluded:

- Updating `src/content/tools/v0.md` even though it likely needs a separate refresh because the public pricing page no longer matches the old Premium framing.
- Updating OpenAI or v0 source registry entries unless a missing source ID blocks provenance checks.
- Template/component changes.

## 6. Verification commands

- Focused word-count and stale-string check for `src/content/comparisons/chatgpt-vs-v0.md`
- `node scripts/audit-site-kpis.mjs --json`
- `node scripts/audit-tool-facts.mjs --json`
- `npm run audit:provenance`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- Browser QA for `/compare/chatgpt-vs-v0/`
- Local viewport QA at 360, 390, 430, 768, and 1024 px
- CTA payload QA for comparison commercial CTAs

## 7. Acceptance criteria

- No stale `April 15, 2026`, third-party "best AI tools/models" source list, or `v0 unlimited $20/mo` claim remains.
- The body is above 700 words.
- The page names May 8, 2026 verification and cites current primary OpenAI, ChatGPT, v0, and Vercel sources.
- The route returns 200 with no horizontal overflow at required widths.
- Commercial CTAs include page type, placement, tool slug, comparison pair, destination type, and page slug where applicable.
- Build/check commands pass or failures are documented with exact output.

## 8. Progress log

- 2026-05-08: Selected `chatgpt-vs-v0` because it is a high-intent thin comparison with stale pricing/scope claims. Verified current ChatGPT/OpenAI and v0/Vercel primary sources before editing.
- 2026-05-08: Rewrote the comparison as a 1,703-word buyer decision page with current May 8, 2026 verification language, primary OpenAI/ChatGPT/v0/Vercel sources, clearer ChatGPT vs v0 buyer segmentation, pricing caveats, use-case winners, FAQ, and source list.
- 2026-05-08: Verification passed: focused content gate, KPI/fact/provenance audits, script tests, `npm run check`, `npm run build:fast`, app-browser QA, mobile viewport overflow QA at 360/390/430/768/1024 px, and commercial CTA payload QA.

## 9. Final report

Completed on 2026-05-08.

- Files changed: `src/content/comparisons/chatgpt-vs-v0.md`, `.agent/CHATGPT_VS_V0_COMPARISON_REFRESH_EXECPLAN.md`.
- SEO impact: comparison thin-risk count decreased by one; stale third-party source list and outdated pricing/date claims were removed; title, meta description, canonical route, source-backed language, FAQ, and buyer-intent sections now align with the current comparison query.
- Mobile impact: route returned 200 with zero horizontal overflow at 360, 390, 430, 768, and 1024 px.
- Conversion impact: the comparison renders three commercial CTAs with `data-commercial-cta`, page slug, page type, placement, tool slug, comparison pair, and destination type.
- Trust impact: visible May 8, 2026 verification and current primary sources now support volatile pricing/product claims.
- Remaining risk: `src/content/tools/v0.md` should get a separate current-source refresh because the standalone tool record may still describe older v0 pricing/package framing.
