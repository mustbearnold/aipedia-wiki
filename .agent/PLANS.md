# AiPedia Active ExecPlans

Keep this file short. Archive completed plans under `.agent/archive/` once their final report is written.

## Active: Guard Challenge Workflow

### Goal

Add an operator-level workflow for challenging stale or over-broad guards without weakening AiPedia safety checks.

### Scope

- Add `.agent/guard-challenges/` artifact contract.
- Add `scripts/guard-challenge.mjs` create and check modes.
- Add tests for accepted, proposed, and incomplete challenge records.
- Register `guard:challenge` and `guard:challenge:check` command-surface invariants.
- Route guard/audit script edits through `check-smart` guidance.

### Verification

- `node --test tests/scripts/guard-challenge.test.mjs`
- `node --test tests/scripts/check-smart.test.mjs`
- `node --test tests/scripts/audit-command-surface.test.mjs`
- `npm run guard:challenge:check`
- `npm run test:scripts`
- `npm run audit:commands`
- `node scripts/check-smart.mjs --json --path scripts/guard-content.mjs --path scripts/audit-news-rendering.mjs`
- `git diff --check`

### Status

- 2026-06-20: Spec approved. Implementation plan written.

## Active: Project Folder Tidy And Verification Router

### Objective

Tidy the AiPedia working tree so future agents can orient faster, avoid generated clutter, and run scoped verification instead of defaulting to broad checks and builds.

### Scope

- Add agent and script orientation maps.
- Add `check-smart` verification routing.
- Keep private/local operator artifacts clearly ignored.
- Archive completed historical ExecPlans.
- Remove safe ignored generated artifacts after verification boundaries are clear.

### Verification

- `npm run check:smart -- --path scripts/check-smart.mjs --path tests/scripts/check-smart.test.mjs --path package.json --path README.md`
- `npm run test:scripts`
- `npm run audit:commands`
- `git diff --check`

### Status

- 2026-06-17: Started cleanup branch and goal.
- 2026-06-17: Added project maps, script docs, smart check router, and archived the old plan history.
- 2026-06-17: Removed 63 completed one-off `.agent/*.md` plan/audit files and 23 empty unregistered `.worktrees/` directories.

## Active: June 17, 2026 AI News Coverage Catch-Up

### Objective

Backfill the uncovered June 17, 2026 AiPedia news date with source-backed coverage of the main AI and AI tools stories that affect buyer decisions.

### Scope

- Track the lane in GitHub issue #41.
- Add a June 17 daily AI News Desk.
- Add focused supporting news pages for Google Pixel/Gemini tools, Microsoft Copilot Cowork billing, G7 AI sovereignty, and NVIDIA AI infrastructure.
- Refresh affected `/news/`, RSS, LLM, and ledger surfaces.

### Verification

- `node scripts/generate-og-news.mjs <new-slugs>`
- `npm run check:news`
- `node scripts/audit-news-rendering.mjs`
- `npm run ledger:pages`
- `npm run ledger:pages:check`
- `npm run guard:check`
- `npm run build:fast`

### Status

- 2026-06-17: GitHub issue #41 opened and June date gap confirmed. Research completed against current June 2026 Google, Microsoft, AP, Consilium, and Coherent sources.

## Active: Oldest-First AI Tools Wiki Refresh

### Objective

Refresh tracked AiPedia pages from oldest to newest, prioritizing AI tool and buyer-decision pages where volatile product, pricing, model, affiliate, and recommendation facts can go stale.

### Scope

- Work from `PAGE_REFRESH_LEDGER.md`, oldest first.
- For each batch, verify volatile facts with current June 2026 sources before editing.
- Update tool/content frontmatter, source fields, `last_verified`, `last_updated`, and buyer-decision copy where needed.
- Inspect and update affected top-layer and parent surfaces, including `/tools/`, `/categories/`, `/compare/`, `/answers/`, sitemap/LLM surfaces, and relevant parent category hubs.
- Regenerate or update `PAGE_REFRESH_LEDGER.md` in the same change.

### Verification

- `npm run ledger:pages`
- `npm run ledger:pages:check`
- `npm run audit:facts`
- `npm run audit:provenance`
- `npm run audit:tool-quality`
- `npm run check:smart:run -- --path <changed paths>`
- `npm run build:fast`
- Rendered-page build or browser QA when templates, layout, CTAs, or visible UI behavior change.

### Status

- 2026-06-18: Started from the oldest tool rows dated 2026-06-12. First batch begins with `/tools/activepieces/`.
- 2026-06-18: Refreshed Activepieces beyond pricing: checked June releases, MCP docs, catalog count, pricing, install docs, parent AI Automation hub, source registry, ledger, and build gate. Fixed noindex prototype pages leaking into sitemap during build verification.
- 2026-06-18: Refreshed Ada beyond pricing: checked June release notes, MCP docs, Web Chat SDK updates, handoff behavior, current platform scale claims, pricing model language, parent AI Automation hub, source registry, and ledger.
- 2026-06-18: Refreshed AdCreative.ai beyond pricing: checked current pricing and sale display, product/fashion videoshoot pages, product surface expansion, affiliate program details, SEO/design/image parent hubs, source registry, and ledger.
- 2026-06-18: Refreshed AG2 beyond pricing: checked GitHub releases through v0.13.4, AgentOS positioning, MCP-server support, SkillPlugin, Bedrock Beta client, cross-process Network, sandboxing, parent AI Automation hub, source registry, and ledger.
- 2026-06-18: Refreshed Ahrefs beyond pricing: checked pricing, Brand Radar, Brand Radar help, pricing guide, changelog, and Google Search Central generative-AI reporting context. Corrected stale Brand Radar prompt counts, Grok caveat, Starter limits, Content Kit status, June product changes, AI SEO parent hub, source registry, and ledger.
- 2026-06-18: Refreshed AIVA beyond pricing: checked pricing, EULA, Helpdesk licensing/export FAQs, and Lyra blog direction. Tightened self-serve Pro licensing scope, private API/high-volume/custom licensing warnings, Lyra private-beta context, AI Music parent hub, source registry, and ledger.
- 2026-06-18: Refreshed Amazon Q Developer beyond pricing: checked AWS pricing, tiers, quotas, service-improvement docs, product pages, and April 30 end-of-support announcement. Reframed the page around existing-customer runway, Kiro migration, May 15 new-signup/subscription cutoff, April 30, 2027 IDE/plugin EOL, Free-tier data-use caveat, AI Coding parent hub, source registry, and ledger.
- 2026-06-18: Refreshed Amplemarket beyond pricing: checked current pricing, pricing explainer, homepage, Duo, Searcher/prospecting, Unibox, Competitive Intelligence, MCP, Workflows, June 16 product update, and partner page. Reframed the page around post-refresh product drift: MCP sequence creation, Claude/ChatGPT access, Workflows webhooks/HTTP actions/CRM-owner routing, Google Calendar pre-meeting intelligence, dialer/contact-page updates, live-matrix credit changes versus older pricing-explainer credit math, AI Automation parent hub, source registry, and ledger.
- 2026-06-18: Refreshed Antigravity beyond pricing: checked live Antigravity pricing, docs, changelog bundle, Google Developers Gemini CLI transition, Google AI subscriptions, and I/O subscription update. Reframed the page from a VS Code-fork IDE story to the current Antigravity 2.0, CLI, SDK, IDE, Organization/Google Cloud, June 18 consumer migration, 2.1.4 changelog, model-list, quota-governance story; updated AI Coding parent hub, source registry, and ledger.
- 2026-06-18: Refreshed AnythingLLM beyond pricing: checked cloud pricing, docs, v1.14.1/v1.14.0 changelogs, MCP compatibility docs, Agent Flows, and GitHub releases. Kept Basic/Pro pricing stable but reframed the page around Meeting Assistant overhaul, Android mobile availability, MCP tools, Agent Flows, default tool-calling changes, chat export/deep links/audio-video uploads, AI Chatbots parent hub, source registry, and ledger.
- 2026-06-18: Refreshed Apollo beyond pricing: checked pricing, release notes, sales engagement, data enrichment, API docs, and AI platform information. Reframed the page from prospect database plus sequencer to AI-native GTM operating layer with Perplexity/ChatGPT/Codex workflows, MCP guided actions, CLI, AI Assistant admin/view updates, contact-level website visitors, Gong import, removal-request compliance, pricing anchors, credit/fair-use risk, AI Automation parent hub, source registry, and ledger.
- 2026-06-18: Refreshed Argil beyond pricing: checked pricing, Plans docs, docs index, API/pay-as-you-go credit docs, Product Showcase, intro, and affiliate docs. Kept headline pricing stable but tightened the Classic credit mismatch, API credit math, Product Showcase V1/V2 caveat, Veo3/Hailuo/Nano Banana avatar-action routes, Make/webhook/API surface, AI Video parent hub, source registry, and ledger.
- 2026-06-18: Refreshed AssemblyAI beyond pricing: checked pricing, changelog, docs index, model docs, Universal 3.5 Pro preview docs, billing docs, LLM Gateway docs, data-retention docs, Universal-Streaming page, and Voice Agent API pages. Reframed the page around Universal 3.5 Pro preview, Voice Agent API as the single-WebSocket speech-to-speech lane, US/EU LLM Gateway routing, streaming session-duration billing risk, AI coding-agent docs, AI Voice parent hub, source registry, and ledger.
- 2026-06-18: Refreshed Beautiful.ai beyond pricing: checked pricing, homepage/Create with AI, product updates, enterprise, security, and Create with AI workflow announcement. Kept Pro/Team headline pricing stable but tightened one-off presentation pricing, trial auto-charge risk, guided outline-first AI workflow, slide-level AI controls, five new Smart Slides, enterprise governance/security, AI Presentation parent hub, source registry, and ledger.
- 2026-06-18: Refreshed Beehiiv beyond pricing: checked pricing, plan-tier support docs, MCP help, product updates, MCP write access, MCP v2, developer docs, official site, and affiliate page. Reframed the page around MCP read access for all users, paid-plan write actions, MCP versus API reliability, podcasts, webinars, digital products, On-Demand Ads, Automations v4, monthly versus annual starting prices, AI Writing parent hub, newsletter writers guide, source registry, and ledger.
- 2026-06-18: Refreshed Boomy beyond pricing: checked JavaScript-only pricing and terms routes, official snippets, support rights, revenue, distribution, download, pricing, billing, and Dolby articles, plus the AI Music parent hub. Reframed the page around paid-download commercial rights, external distributor choice, rights continuing after cancellation for downloaded songs, Boomy copyright ownership by default, live-checkout pricing and download caveats, source registry, and ledger.
- 2026-06-18: Refreshed Browserbase beyond pricing: checked current pricing, changelog, Browserbase Browser explainer, Model Gateway docs, and Stagehand evals. Kept headline Free/Developer/Startup/Scale pricing stable but reframed the page around real cloud Chromium browsers, Fetch markdown/JSON and Extract economics, session replay streaming, Stagehand 3.4 context and model changes, Model Gateway market-price billing, automation/infrastructure/coding parent hubs, source registry, and ledger.
- 2026-06-18: Refreshed Capacities beyond pricing: checked pricing, docs, AI assistant docs, AI Chat Connectors, Release 64, and recent changelog context. Reframed the page around Pro AI connector/provider value, MCP external-tool access, recurring tasks, Search/Related Content/media-analysis changes, region-rendered pricing caveats, AI Notes parent hub, five Capacities comparison pages, source registry, and ledger.
- 2026-06-18: Refreshed Cartesia beyond pricing: checked current pricing, Sonic page, Sonic 3.5 docs, docs index, and 2026 changelog. Kept headline plan pricing stable but reframed the page around Sonic-3.5 plus Ink-2 as the current eligible Line default stack, bring-your-own Twilio account support, 42-language Sonic 3.5 docs, Line/TTS/phone-minute cost modeling, AI Voice parent hub, source registry, and ledger.
- 2026-06-18: Refreshed Castmagic beyond pricing: checked current pricing, product site, features page, public API docs, transcript endpoint docs, affiliate program, and affiliate terms. Kept the $21/$79/$790 annual plan anchors stable but reframed the page around Content Pipeline, brand voice/templates, Studio clipping/audiograms, iOS recording, semantic media-library search, Castmagic MCP for Claude, API-scope caveats, affiliate terms, AI Writing/Voice/Video parent hubs, podcaster and meeting-notes guides, source registry, and ledger.
- 2026-06-18: Refreshed Character.AI beyond pricing: checked current c.ai+ subscribe page, Summer Flash Sale terms, under-18 chat policy, teen help article, creator bundle update, Memory update, PipSqueak 2/DeepSqueak update, and AvatarFX page. Kept headline $9.99/month and $94.99/year c.ai+ anchors stable but reframed the page around Memory/Facts/Memory Usage, model-style access, creator discovery and insights, AvatarFX, checkout-dependent promos, under-18 open-ended chat removal, AI Chatbots parent hub, source registry, and ledger.
- 2026-06-18: Refreshed ChatPDF beyond pricing: checked official homepage, PDF AI page, backend API docs, AI Research, YouTube Chat, AI Flashcards, AI Slides, Google Play listing, and App Store listing. Kept the free 2-documents/day and API 2,000-page/32MB anchors stable but reframed the page around multi-file folders, non-PDF files, study tools, YouTube transcript chat, abstract-based AI Research caveats, mobile/desktop apps, mobile-store Plus pricing caveats, AI Research parent hub, source registry, and ledger.
- 2026-06-18: Refreshed Claude Design beyond pricing: checked Anthropic launch page, Claude Design usage/pricing support doc, get-started guide, Claude release notes, Claude pricing, and the May 6 capacity update. Kept the Pro/Max/Team/Enterprise access and Opus 4.7 launch-model caveat stable but reframed the page around separately metered Design weekly allowances, purchasable usage credits, Enterprise usage-based billing, no Design audit logs yet, /design-sync and /design Claude Code handoff, AI Design/Presentation hubs, Claude parent page, source registry, and ledger.
- 2026-06-18: Refreshed Clay beyond pricing: checked pricing, homepage, Claygent, Sculptor, MCP, Sequencer, changelog, integrations, and University surfaces. Kept Free/Launch/Growth/Enterprise anchors but reframed the page around post-refresh product drift: GTM workflow layer positioning, Actions versus Data Credits, fixed versus variable AI token pricing, BYO API key tradeoffs, no-result behavior, Sculptor onboarding, Clay MCP in ChatGPT/Codex/Claude, native Sequencer, Functions, Ads/Audiences, AI Automation parent hub, source registry, and ledger.
- 2026-06-18: Refreshed Clearscope beyond pricing: checked current pricing, Optimize, Expand, Discover, Write, Protect, Localize, Linking, Tracked Topics support, and Clearscope's 2026 AI-search guidance. Kept Essentials/Business/Enterprise anchors stable but reframed the page around current product drift: content visibility suite positioning, AI mentions/citations, AI web searches, Search Console-connected visibility, Protect monitoring, Localize, internal-linking recommendations, AI SEO parent hub, stack-consolidation use case, source registry, and ledger.
- 2026-06-18: Refreshed ClickUp beyond pricing: checked pricing, Brain, Brain pricing, Brain AI help, feature availability/limits, AI Super Credits, first-party MCP docs/setup/tools, Super Agents launch, and ClickUp 4.0 context. Kept core Free/Unlimited/Business/Enterprise and Brain AI/Everything AI anchors stable but reframed the page around Brain 2, Brain MAX apps, Super Agents, AI Super Credit burn, public-beta MCP, whole-workspace upgrade risk, AI Automation parent hub, source registry, and ledger.
- 2026-06-18: Refreshed Clipdrop beyond pricing: checked current Clipdrop site, pricing, APIs, API contact page, Jasper API/image docs, Stability divestment notice, and Jasper acquisition announcement. Kept consumer Free/Pro quota story but reframed the page around active Jasper ownership, region-rendered Pro price, Jasper Business/API requirements, utility-tool positioning, removal of stale Reimagine/Stability-era framing, AI Image parent hub, source registry, and corrected the stale Stability-owned Clipdrop dead archive.
- 2026-06-18: Refreshed CloudTalk beyond pricing: checked pricing, official site, AI Voice Agents, AI Receptionist, AI Voice Agents research report, Conversation Intelligence help, and affiliate program. Kept core seat prices stable but reframed the page around AI Dialer/Outreach, Power/Parallel Dialer add-ons, AI Receptionist versus AI Specialist, CeTe, Branded Caller ID, Spam Remediation, regional minute modeling, AI Automation/Voice parent hubs, CloudTalk phone-system buyer guide, source registry, and ledger.
- 2026-06-18: Refreshed Codeium beyond pricing: checked Devin pricing, Devin Desktop FAQ, quota docs, model docs, changelog, releases, and Cognition Devin Desktop context. Kept Codeium as historical search intent but reframed the page around post-June-12 product drift: Devin Desktop v3.2, Devin Local replacing Cascade, SWE-1.6 availability, daily/weekly quotas, paid-plan extra usage at API pricing, grandfathered subscriber caveats, rules/AGENTS.md compatibility, endpoint/allowlist/device-policy migration, AI Coding parent hub, Codeium vs Copilot comparison, source registry, and ledger.
- 2026-06-18: Refreshed Cohere beyond pricing: checked pricing, model docs, release notes, Command A+, North Mini Code, Rerank docs, Transcribe, and Cohere/Aleph Alpha announcement. Reframed the page from Command A+ plus RAG to enterprise model infrastructure, retrieval, sovereign deployment, open Apache 2.0 model control, North Mini Code coding-model evaluation, Rerank chunk-pricing caveats, AI Chatbots/Search parent hubs, Cohere company profile, source registry, and ledger.
- 2026-06-18: Refreshed Connected Papers beyond pricing: checked current pricing, JavaScript pricing bundle strings, about page, Semantic Scholar homepage corpus count, and multi-origin feature history. Corrected paid pricing from $36/$120 yearly to USD 72/USD 240 yearly, added Free sign-up caveat, updated Semantic Scholar 234M+ corpus language, brought multi-origin graphs into buyer guidance, refreshed AI Research parent hub, source registry, and ledger.

## Archive

Historical completed plans live in `.agent/archive/PLANS-2026-05-to-2026-06.md`.
