# Changelog

Search format: each entry starts with `DD-MM-YYYY HH:MM TZ` so changes can be found by day, month, year, and time. Example search keys: `05-05-2026`, `05-2026`, `2026`, `11:29`.

## 05-05-2026 21:02 NZST

- Started the page-padding consistency pass for the next PR.
- Added shared site spacing tokens for page gutters, top spacing, section rhythm, and bottom padding.
- Normalized the main layout, T2 canvas, P3 canvas, homepage, search, glossary, and guides outer spacing so pages use one padding system instead of stacked page-specific gutters.
- Added a wide directory canvas for compare, guides, and news indexes so they align with the tools directory while detail pages keep their narrower reading measure.
- Extended the index-page pattern across tools, compare, guides, news, search, and glossary with shared hero spacing, eyebrow chips, headline scale, and full-width directory rails.

## 05-05-2026 19:21 NZST

- Started the shortest-tool-page depth pass from the KPI queue.
- Expanded `Together AI` with buyer-fit, procurement, model-evaluation, and infrastructure-risk guidance.
- Expanded `AG2` with buyer-fit, production-readiness, security, observability, and multi-agent overhead guidance.

## 05-05-2026 19:16 NZST

- Started the comparison-depth sprint from the shortest-comparison KPI queue.
- Expanded twelve thin comparison pages with workflow-fit tables, watchouts, buyer guidance, and more durable decision logic.
- Removed brittle inline citation tokens and volatile hand-written pricing/model details from the affected comparison copy so generated fact tables remain the source of current facts.

## 05-05-2026 19:11 NZST

- Continued the thin-news cleanup in shortest-first order after the initial post-comparison batch.
- Expanded fourteen more AI news articles with stronger procurement context, risk framing, tool impact, and evaluation checklists across privacy filtering, Claude computer use, Copilot PR review, robotics, Gemini visualizations, Opus 4.7 IDE adoption, OpenAI litigation, election safeguards, Meta energy infrastructure, PixVerse funding, Cohere sovereign AI, Gemini embeddings, Reka Edge, and Manus M&A controls.
- Re-verified the added factual details against official OpenAI, Google, GitHub, Anthropic, Capgemini, Reka, Harvey-adjacent, AP, TechCrunch, and other reputable source coverage before editing.

## 05-05-2026 19:05 NZST

- Started the post-comparison news depth sprint from the shortest-news KPI queue.
- Expanded ten thin AI news articles with stronger buyer context, governance caveats, workflow impact, and evaluation checklists.
- Verified the GitHub Copilot, OpenAI clinician, DeepSeek V4, Nvidia market-cap, Sinceerly, and Vatican governance stories against available primary or reputable secondary sources before editing.

## 05-05-2026 18:42 NZST

- Completed the site-wide comparison canonicalization pass across all remaining comparison pages.
- Added generated canonical fact-table rendering to every comparison page that was still missing it, bringing comparison coverage to 263 of 263 pages.
- Renamed body-level manual `At a Glance` sections to `Decision Snapshot` so volatile model, pricing, and capability facts are owned by the generated canonical table.

## 05-05-2026 18:21 NZST

- Continued the comparison quality sprint across `mubert-vs-udio`, `chatgpt-vs-copy-ai`, and `kling-vs-synthesia`.
- Added decision snapshots, buyer matrices, workflow-fit guidance, procurement checks, and test-before-buying sections for the new batch.
- Moved `mubert-vs-udio` and `kling-vs-synthesia` onto generated canonical fact tables so volatile pricing, model, credit, and plan details come from verified tool facts instead of brittle hand-written comparison copy.

## 05-05-2026 16:44 NZST

- Migrated the tracked project runtime pins from Node 22.12.0 to Node 24.
- Updated CI to install Node 24 while keeping the Node 24-compatible GitHub Actions versions.
- Renamed the final production-confidence script from `build:full:node22` to `build:full:node24`.
- Verified script tests, guards, link/news audits, `build:fast`, and `build:full:node24` under Node 24.

## 05-05-2026 16:18 NZST

- Fixed the command-surface audit so CI clean checkouts tolerate explicitly ignored local operator scripts.
- Updated the command-surface test to assert tracked README/package behavior instead of relying on local-only AGENTS.md content.

## 05-05-2026 13:01 NZST

- Expanded `src/content/news/2026-04-26-anthropic-agent-commerce-press.md` with practical controls, auditability, and enterprise-readiness caveats for Anthropic Project Deal.
- Reworked `src/content/news/2026-04-15-zetrix-avatar-blockchain-agents.md` around a primary Zetrix/CAICT press-release source, replacing the earlier broad blockchain-passport framing with a more specific agent identity and credential layer explanation.
- Reworked `src/content/news/2026-04-10-google-gemini-3d-models.md` around Google's official Gemini app post, adding rollout limits and clearer tool impact.
- Reworked `src/content/news/2026-04-14-meta-muse-spark-launch.md` around Meta and Axios sources, adding rollout context, multimodal/sub-agent details, and privacy/control caveats.
- Reworked `src/content/news/2026-04-15-cloudflare-mesh-agent-access.md` around official Cloudflare Mesh sources, focusing on governed private networking for agents instead of broad adoption claims.
- Reworked `src/content/news/2026-04-10-anthropic-mythos-hacking-restriction.md` around Anthropic Project Glasswing and red-team sources, adding safety caveats and narrowing unsupported claims.
- Reworked `src/content/news/2026-04-09-zai-glm-51-release.md` around Z.ai developer documentation, softening benchmark claims and clarifying long-horizon agent relevance.
- Expanded `src/content/news/2026-04-22-openai-responses-api-websockets.md` with transport-level agent-loop context and buyer caveats.
- Expanded `src/content/news/2026-04-26-openai-tumbler-ridge-apology.md` with AP reporting, escalation-threshold context, and stronger governance framing.
- Reworked `src/content/news/2026-02-18-trae-pricing-revamp.md` to remove overconfident cheapest-route claims and focus on usage-aware pricing implications.
- Reworked `src/content/news/2026-03-15-pixverse-300m-series-c.md` around CnTechPost/LatePost reporting, replacing broad unicorn and price claims with funding, market, and buyer caveats.
- Reworked `src/content/news/2026-03-05-reka-edge-7b-launch.md` around the Reka Edge Hugging Face model card and Reka API docs, replacing stale price/benchmark claims with edge-deployment guidance.
- Reworked `src/content/news/2026-03-30-harvey-200m-at-11b-valuation.md` around Harvey's primary funding announcement, removing unsupported ACV math and focusing on legal-AI governance questions.
- Reworked `src/content/news/2026-04-17-mozilla-thunderbolt-self-hosted-ai.md` around Thunderbolt project and secondary source details, adding maturity caveats for self-hosted AI clients.
- Reworked `src/content/use-cases/best-ai-for-translation.md` into stable buyer guidance, removing brittle citation markers, unsupported benchmark claims, and stale pricing details.
- Reworked `src/content/use-cases/best-ai-for-summarization.md` around workflow fit for Claude, ChatGPT, and Gemini, removing fragile model/pricing assertions and adding prompt guidance.
- Reworked `src/content/use-cases/best-ai-for-code-review.md` around IDE, reasoning, and agent-review workflows, replacing unsupported version/benchmark claims with practical review criteria.
- Reworked `src/content/use-cases/best-ai-for-logo-design.md` around Ideogram, Midjourney, and ChatGPT, replacing unsupported Claude image-generation claims with logo production caveats.
- Reworked `src/content/use-cases/best-ai-for-academic-writing.md` into safer academic-writing guidance with citation, disclosure, and source-verification cautions.
- Reworked `src/content/use-cases/best-ai-for-cover-letters.md` into practical job-application guidance, removing brittle pricing/API assertions and adding anti-fabrication prompts.
- Added workflow, prompt, and review sections to the cleaned logo-design, academic-writing, and cover-letter use-case pages so the pages stay useful after removing brittle claims.
- Reworked `src/content/use-cases/synthesia-alternatives.md` into a safer Synthesia-alternative buyer guide, removing stale minute/pricing claims and separating avatar tools from scene generators.
- Reworked `src/content/use-cases/best-ai-for-headshots.md` around honest professional-profile workflows, removing unsupported quality/pricing citations and adding likeness/disclosure checks.
- Reworked `src/content/use-cases/best-ai-for-unit-tests.md` around test-generation workflows for Cursor, GitHub Copilot, and Claude, replacing brittle benchmark claims with practical prompts.
- Reworked `src/content/use-cases/best-ai-for-resume-writing.md` into safer resume guidance, removing fake pricing citations and adding anti-fabrication rules.
- Added workflow, prompt, and red-flag sections to the headshots, resume-writing, unit-tests, and Synthesia-alternatives use-case pages after cleanup shortened them.
- Added summary-format and verification guidance to `src/content/use-cases/best-ai-for-summarization.md`.
- Added code-review workflow, prompt, and team guardrails to `src/content/use-cases/best-ai-for-code-review.md`.
- Added translation workflow and prompt guidance to `src/content/use-cases/best-ai-for-translation.md`.
- Reworked `src/content/use-cases/best-ai-for-podcasters.md` around Descript, ElevenLabs, show-note tools, recording quality, and consent rules, replacing stale pricing/version claims.
- Reworked `src/content/use-cases/best-ai-tools-for-agencies.md` into an agency-stack guide with general assistants, automation/GTM tools, governance guardrails, and agency-type stacks.
- Added podcast-type stacks and publishing QA checks to `src/content/use-cases/best-ai-for-podcasters.md`.
- Added client delivery workflow and automation-risk guidance to `src/content/use-cases/best-ai-tools-for-agencies.md`.
- Reworked `src/content/use-cases/runway-alternatives.md` into a practical AI-video alternative guide, removing stale pricing/version claims and adding production checklist guidance.

## 05-05-2026 11:29 NZST

Comparison quality pass after site-health audit.

Changed comparison pages:

- `src/content/comparisons/connected-papers-vs-nanochat.md`
  - Reframed the comparison around the real workflow split: Connected Papers as literature-discovery graph software, nanochat as an open-source LLM training reference.
  - Removed stale claims that nanochat is a hosted conversational research assistant.
  - Added a practical at-a-glance table, clearer buyer guidance, and stronger FAQ answers.
- `src/content/comparisons/elevenlabs-vs-otter-ai.md`
  - Expanded decision guidance around outbound voice generation vs inbound meeting capture.
  - Added compliance and workflow distinctions for voice cloning, recording consent, meeting archives, and team sharing.
  - Removed a manual at-a-glance table because canonical fact-table comparisons must use generated fact tables.
- `src/content/comparisons/canva-vs-chatgpt.md`
  - Expanded the practical split between Canva as a finished visual production surface and ChatGPT as a general reasoning/generation assistant.
  - Added clearer guidance for marketers, educators, small-business owners, and general-purpose AI users.
- `src/content/comparisons/elevenlabs-vs-voxtral.md`
  - Replaced stale "insufficient public data" framing with current source-of-truth positioning from the Voxtral tool page.
  - Clarified ElevenLabs as a polished voice platform and Voxtral as a Mistral-native audio model/API path.
  - Removed stale third-party source dependency from the page source list.
- `src/content/comparisons/elevenlabs-vs-synthesia.md`
  - Reframed the page around audio-first vs avatar-video-first workflows.
  - Removed the manual comparison table so generated canonical facts can drive volatile pricing/model details.
  - Added guidance for training, onboarding, dubbing, narration, and enterprise governance tradeoffs.
- `src/content/comparisons/chatgpt-vs-lovable.md`
  - Expanded the comparison around ChatGPT as a broad assistant and Lovable as a prompt-to-deployed-app builder.
  - Clarified Supabase/GitHub/deployment strengths and production-review risks.
  - Removed stale external ranking references from the source list.

Verification:

- `npm run guard:check` passed.
- `node scripts/audit-site-kpis.mjs --json` confirmed the edited comparison pages dropped out of the shortest-comparison queue.

Notes:

- No generated assets were intentionally edited.
- Existing large provenance/freshness migration changes remain in the worktree and were not reverted.

## 05-05-2026 11:32 NZST

Second comparison quality batch from the shortest-comparison queue.

Changed comparison pages:

- `src/content/comparisons/chatgpt-vs-surfer-seo.md`
  - Expanded the workflow split between ChatGPT as a broad drafting/research assistant and Surfer SEO as a SERP-driven content optimization platform.
  - Reworked "Where each wins," key differences, buyer guidance, and bottom line around drafting first, SEO scoring second.
- `src/content/comparisons/copy-ai-vs-sudowrite.md`
  - Reframed Copy.ai as a GTM automation platform rather than only a generic copywriting tool.
  - Reframed Sudowrite around Muse, fiction drafting, Story Engine, and manuscript workflows.
  - Removed stale external model-ranking references from the source list.
- `src/content/comparisons/chatgpt-vs-neuronwriter.md`
  - Clarified ChatGPT as the broad content/research assistant and NeuronWriter as the focused budget SEO content editor.
  - Added guidance around using ChatGPT upstream for drafting and NeuronWriter downstream for SERP scoring.
- `src/content/comparisons/pika-vs-synthesia.md`
  - Reworked the comparison around short creative video/effects vs avatar-led business video.
  - Updated the at-a-glance framing to avoid stale price/model specifics and added clearer production-risk guidance.
- `src/content/comparisons/quillbot-vs-sudowrite.md`
  - Reframed QuillBot as an existing-text paraphrasing/grammar/summarization toolkit.
  - Reframed Sudowrite as a fiction-first creative-writing environment.
  - Removed stale model-ranking source from the source list.

Verification:

- `npm run guard:check` passed.
- `node scripts/audit-site-kpis.mjs --json` confirmed these five pages moved out of the shortest-comparison queue.

Notes:

- No generated assets were intentionally edited.
- Canonical-fact comparison pages were kept compatible with the generated fact table guard.

## 05-05-2026 12:07 NZST

Twelfth comparison quality batch from the shortest-comparison queue.

Changed comparison pages:

- `src/content/comparisons/chatgpt-vs-mistral-ai.md`
  - Reframed ChatGPT as the polished assistant and Mistral AI as a European model/platform decision.
  - Added practical evaluation guidance for assistant rollout versus API/model deployment.
  - Removed brittle pricing, benchmark, and third-party ranking claims.
- `src/content/comparisons/marketmuse-vs-semrush.md`
  - Reframed MarketMuse as the content strategy/optimization specialist and Semrush as the broader SEO suite.
  - Removed brittle plan-price and AI-model claims.
- `src/content/comparisons/chatgpt-vs-writesonic.md`
  - Reframed ChatGPT as the broad assistant and Writesonic as the marketing content workflow.
  - Added practical workflow guidance for strategy/research versus repeatable marketing production.
  - Removed stale model, pricing, and ranking claims.
- `src/content/comparisons/nanochat-vs-scite.md`
  - Corrected nanochat from a supposed general research chat tool to an open-source LLM training reference.
  - Reframed Scite as the practical citation-context and evidence-checking tool.
  - Added practical workflow guidance for Scite versus nanochat.

Verification:

- `npm run guard:check` passed.
- `node scripts/audit-site-kpis.mjs --json` confirmed these four pages moved out of the shortest-comparison queue after extra passes on `chatgpt-vs-writesonic.md`, `nanochat-vs-scite.md`, and `chatgpt-vs-mistral-ai.md`.

Notes:

- No generated assets were intentionally edited.
- Canonical-fact comparison pages were kept compatible with the generated fact table guard.

## 05-05-2026 12:04 NZST

Eleventh comparison quality batch from the shortest-comparison queue.

Changed comparison pages:

- `src/content/comparisons/chatgpt-vs-sudowrite.md`
  - Reframed ChatGPT as the broad assistant and Sudowrite as the fiction-first writing workspace.
  - Added practical workflow guidance for manuscript work versus surrounding writing tasks.
  - Removed brittle model, price, and third-party ranking claims.
- `src/content/comparisons/fish-audio-vs-resemble-ai.md`
  - Reframed Fish Audio as the open/control-oriented TTS route and Resemble AI as the governed custom-voice production route.
  - Removed stale benchmark, pricing, and external source claims.
- `src/content/comparisons/pitch-vs-tome.md`
  - Reframed Pitch as the collaborative branded deck platform and Tome as the AI narrative builder.
  - Added practical workflow guidance for standard team decks versus fast shareable stories.
  - Removed brittle model/context/pricing rows and external review links.
- `src/content/comparisons/runway-vs-synthesia.md`
  - Reframed Runway as creative generative video and Synthesia as repeatable avatar-led business video.
  - Added practical workflow guidance after the first audit pass showed the page was still thin.
  - Removed brittle benchmark/pricing claims and stale third-party source references.
- `src/content/comparisons/elicit-vs-scite.md`
  - Reframed Elicit as literature discovery/extraction and Scite as citation context/evidence checking.
  - Added practical workflow guidance after the first audit pass showed the page was still thin.
  - Removed brittle dataset/pricing claims and swapped external pricing links for local source-of-truth pages.

Verification:

- `npm run guard:check` passed.
- `node scripts/audit-site-kpis.mjs --json` confirmed these five pages moved out of the shortest-comparison queue after extra passes on `runway-vs-synthesia.md`, `elicit-vs-scite.md`, `chatgpt-vs-sudowrite.md`, and `pitch-vs-tome.md`.

Notes:

- No generated assets were intentionally edited.
- Canonical-fact comparison pages were kept compatible with the generated fact table guard.

## 05-05-2026 12:02 NZST

Tenth comparison quality batch from the shortest-comparison queue.

Changed comparison pages:

- `src/content/comparisons/cartesia-vs-voxtral.md`
  - Expanded the durable split between Cartesia as real-time TTS infrastructure and Voxtral as a Mistral-native audio model/API evaluation path.
  - Added practical evaluation guidance for live voice-agent tests versus audio-model stack tests.
- `src/content/comparisons/chatgpt-vs-kagi.md`
  - Reframed ChatGPT as the assistant/creation product and Kagi as the search-first, privacy-oriented discovery product.
  - Added a practical workflow for source discovery versus synthesis.
  - Removed stale citation fragments from the FAQ.
- `src/content/comparisons/hyperwrite-vs-wordtune.md`
  - Reframed HyperWrite as a drafting/generation assistant and Wordtune as a rewrite/polish assistant.
  - Added practical drafting-versus-revision workflow guidance.
- `src/content/comparisons/fireflies-vs-obsidian.md`
  - Reframed Fireflies as meeting capture and Obsidian as long-term knowledge management.
  - Added practical handoff guidance from captured calls to curated linked notes.
- `src/content/comparisons/chatgpt-vs-fireflies.md`
  - Reframed ChatGPT as downstream synthesis and Fireflies as meeting capture.
  - Added a concrete handoff workflow after the first audit pass showed the page was still thin.

Verification:

- `npm run guard:check` passed.
- `node scripts/audit-site-kpis.mjs --json` confirmed these five pages moved out of the shortest-comparison queue after an extra pass on `chatgpt-vs-fireflies.md`.

Notes:

- No generated assets were intentionally edited.
- Canonical-fact comparison pages were kept compatible with the generated fact table guard.

## 05-05-2026 11:53 NZST

Ninth comparison quality batch from the shortest-comparison queue.

Changed comparison pages:

- `src/content/comparisons/grammarly-vs-sudowrite.md`
  - Reframed Grammarly as the inline editing layer and Sudowrite as the fiction-writing collaborator.
  - Removed brittle model/pricing/context rows and external ranking references.
- `src/content/comparisons/github-copilot-vs-tabnine.md`
  - Reframed GitHub Copilot as the GitHub-native coding assistant and Tabnine as the privacy/control-oriented coding assistant.
  - Added practical repo-level evaluation guidance after the first audit pass showed the page was still thin.
  - Removed stale model, price, context, and third-party benchmark claims.
- `src/content/comparisons/copy-ai-vs-quillbot.md`
  - Reframed Copy.ai as the GTM/campaign generation tool and QuillBot as the rewrite-and-polish tool.
  - Added practical workflow guidance after the first audit pass showed the page was still thin.
  - Removed brittle model/pricing/context rows and stale external references.
- `src/content/comparisons/chatgpt-vs-glm.md`
  - Reframed ChatGPT as the polished general assistant and GLM as the Chinese/open-weight/deployment-control specialist.
  - Added practical evaluation guidance after the first audit pass showed the page was still thin.
  - Removed stale subscription, token-price, model, and ranking claims.
- `src/content/comparisons/ahrefs-vs-frase.md`
  - Reframed Ahrefs as the SEO intelligence platform and Frase as the content brief/optimization tool.
  - Replaced brittle pricing/data-size claims with durable workflow guidance.

Verification:

- `npm run guard:check` passed.
- `node scripts/audit-site-kpis.mjs --json` confirmed these five pages moved out of the shortest-comparison queue after extra passes on `github-copilot-vs-tabnine.md`, `chatgpt-vs-glm.md`, and `copy-ai-vs-quillbot.md`.

Notes:

- No generated assets were intentionally edited.
- Canonical-fact comparison pages were kept compatible with the generated fact table guard.

## 05-05-2026 11:49 NZST

Eighth comparison quality batch from the shortest-comparison queue.

Changed comparison pages:

- `src/content/comparisons/elevenlabs-vs-wellsaid.md`
  - Reframed ElevenLabs as the broad voice platform and WellSaid Labs as the controlled corporate narration studio.
  - Removed brittle model/pricing rows and stale third-party source references.
- `src/content/comparisons/exa-vs-you-com.md`
  - Reframed Exa as search/retrieval infrastructure and You.com as a user-facing AI research product.
  - Removed stale model/context/pricing claims and third-party ranking sources.
- `src/content/comparisons/chatgpt-vs-figma.md`
  - Reframed ChatGPT as upstream product thinking and Figma AI as downstream design-workspace support.
  - Added a practical workflow section after the first audit pass showed the page was still thin.
  - Removed a broken source stub and brittle pricing/model claims.
- `src/content/comparisons/consensus-vs-nanochat.md`
  - Corrected nanochat from a supposed broad research assistant to an open-source LLM training reference.
  - Reframed Consensus as the actual paper-evidence tool.
  - Added a practical workflow section after the first audit pass showed the page was still thin.
- `src/content/comparisons/descript-vs-resemble-ai.md`
  - Reframed Descript as the transcript-first media editor and Resemble AI as the custom voice/localization/governance platform.
  - Removed brittle model/pricing rows and stale external references.

Verification:

- `npm run guard:check` passed.
- `node scripts/audit-site-kpis.mjs --json` confirmed these five pages moved out of the shortest-comparison queue after extra passes on `chatgpt-vs-figma.md` and `consensus-vs-nanochat.md`.

Notes:

- No generated assets were intentionally edited.
- Canonical-fact comparison pages were kept compatible with the generated fact table guard.

## 05-05-2026 11:47 NZST

Seventh comparison quality batch from the shortest-comparison queue.

Changed comparison pages:

- `src/content/comparisons/cursor-vs-devin.md`
  - Reframed Cursor as the AI-native editor for hands-on coding and Devin as the autonomous task-delegation agent.
  - Removed stale ARR, model, context, price, and third-party benchmark claims.
- `src/content/comparisons/claude-vs-qwen.md`
  - Reframed Claude as the hosted assistant/API choice and Qwen as the open-weight Alibaba model-family choice.
  - Removed stale benchmark/pricing assertions and third-party ranking source.
- `src/content/comparisons/elicit-vs-perplexity.md`
  - Reframed Elicit around paper evidence and Perplexity around current web evidence.
  - Replaced brittle model/context/pricing table rows with durable source-discipline guidance.
- `src/content/comparisons/cartesia-vs-resemble-ai.md`
  - Reframed Cartesia as the low-latency voice-agent API and Resemble AI as the custom voice/localization/governance platform.
  - Removed fabricated or stale benchmark/pricing-style links and external claims.
- `src/content/comparisons/elevenlabs-vs-resemble-ai.md`
  - Reframed ElevenLabs as the broad creator/developer voice platform and Resemble AI as the controlled custom-voice production path.
  - Added practical scenario guidance after an extra audit pass.
  - Removed manual volatile pricing/model rows so generated canonical facts can carry live details.

Verification:

- `npm run guard:check` passed.
- `node scripts/audit-site-kpis.mjs --json` confirmed these five pages moved out of the shortest-comparison queue after an extra pass on `elevenlabs-vs-resemble-ai.md`.

Notes:

- No generated assets were intentionally edited.
- Canonical-fact comparison pages were kept compatible with the generated fact table guard.

## 05-05-2026 11:45 NZST

Sixth comparison quality batch from the shortest-comparison queue.

Changed comparison pages:

- `src/content/comparisons/decktopus-vs-presentations-ai.md`
  - Reframed Decktopus as a presenter-workflow tool and Presentations.AI as a polished AI deck-generation tool.
  - Removed stale model/context/pricing claims and third-party ranking references.
- `src/content/comparisons/chatgpt-vs-copy-ai.md`
  - Reframed ChatGPT as the broad AI assistant and Copy.ai as the GTM workflow/content-production layer.
  - Added flexibility-versus-repeatability guidance for solo users and revenue teams.
  - Removed brittle model, pricing, and third-party ranking claims.
- `src/content/comparisons/elevenlabs-vs-heygen.md`
  - Reworked the comparison around audio-first output versus avatar-video output.
  - Added practical scenarios for when each tool fits and when a combined workflow makes sense.
  - Removed manual volatile pricing/model table rows so generated canonical facts can carry live details.
- `src/content/comparisons/nanochat-vs-semantic-scholar.md`
  - Corrected nanochat from a supposed web research assistant to an open-source LLM training and education reference.
  - Reframed Semantic Scholar as the proper literature discovery tool.
  - Removed stale third-party ranking sources.
- `src/content/comparisons/instantly-vs-zapier.md`
  - Reframed Instantly as a cold-email outreach engine and Zapier as the cross-app automation layer.
  - Added guidance for combined workflows where Zapier routes Instantly campaign events into the broader stack.
  - Removed brittle pricing rows and replaced external pricing links with local source-of-truth pages.

Verification:

- `npm run guard:check` passed.
- `node scripts/audit-site-kpis.mjs --json` confirmed these five pages moved out of the shortest-comparison queue after an extra pass on `elevenlabs-vs-heygen.md`.

Notes:

- No generated assets were intentionally edited.
- Canonical-fact comparison pages were kept compatible with the generated fact table guard.

## 05-05-2026 11:43 NZST

Fifth comparison quality batch from the shortest-comparison queue.

Changed comparison pages:

- `src/content/comparisons/figma-vs-midjourney.md`
  - Reframed Figma as the collaborative product-design workspace and Midjourney as the image/concept generator.
  - Removed brittle model, pricing, and third-party ranking claims.
  - Clarified when to use Midjourney upstream of Figma.
- `src/content/comparisons/mistral-ai-vs-qwen.md`
  - Reworked the decision around Mistral as a European managed model platform and Qwen as an Alibaba-backed open-weight model family.
  - Replaced stale pricing/benchmark claims with deployment, compliance, region, and model-control guidance.
- `src/content/comparisons/seedance-vs-synthesia.md`
  - Reframed Seedance as a creative text-to-video generator and Synthesia as a repeatable avatar-led business video platform.
  - Replaced brittle pricing rows with workflow, risk, and output-type distinctions.
- `src/content/comparisons/figma-vs-google-stitch.md`
  - Clarified Figma as the production design environment and Google Stitch as a prompt-to-UI concept generator.
  - Removed stale Gemini/context/pricing claims and third-party references.
- `src/content/comparisons/claude-vs-grammarly.md`
  - Expanded the practical workflow split between Claude for thinking/drafting and Grammarly for inline editing.
  - Added privacy/review and start-vs-finish writing workflow guidance.
  - Removed brittle pricing/model claims and stale third-party sources.

Verification:

- `npm run guard:check` passed.
- `node scripts/audit-site-kpis.mjs --json` confirmed these five pages moved out of the shortest-comparison queue after an extra pass on `claude-vs-grammarly.md`.

Notes:

- No generated assets were intentionally edited.
- Canonical-fact comparison pages were kept compatible with the generated fact table guard.

## 05-05-2026 11:41 NZST

Fourth comparison quality batch from the shortest-comparison queue.

Changed comparison pages:

- `src/content/comparisons/claude-vs-kimi.md`
  - Reframed the decision around Claude as the polished assistant for writing, coding, enterprise controls, and everyday knowledge work.
  - Reframed Kimi around long-context evaluation, Chinese-English workflows, Moonshot API/model economics, and open-weight optionality.
  - Removed stale third-party ranking/pricing references and brittle model claims.
- `src/content/comparisons/cartesia-vs-elevenlabs.md`
  - Clarified Cartesia as the low-latency real-time voice API choice.
  - Clarified ElevenLabs as the broader creator, narration, dubbing, and voice-cloning platform.
  - Removed a manual volatile table so generated canonical facts can carry live pricing/model details.
- `src/content/comparisons/chatgpt-vs-phind.md`
  - Corrected the page from an active product comparison to a discontinued-tool migration comparison.
  - Marked Phind as historical/offline and directed readers toward current replacement choices.
  - Removed stale active-pricing and active-feature claims.
- `src/content/comparisons/chatgpt-vs-you-com.md`
  - Reworked the comparison around ChatGPT as a broad AI workspace and You.com as AI search/research-agent tooling.
  - Removed stale third-party model-ranking references and brittle subscription comparisons.
- `src/content/comparisons/descript-vs-fish-audio.md`
  - Reframed Descript as the transcript-first audio/video editor.
  - Reframed Fish Audio as the synthetic speech, voice-cloning, API, and open-weight TTS path.
  - Replaced brittle price/model table rows with durable workflow-based distinctions.

Verification:

- `npm run guard:check` passed.
- `node scripts/audit-site-kpis.mjs --json` confirmed these five pages moved out of the shortest-comparison queue.

Notes:

- No generated assets were intentionally edited.
- Canonical-fact comparison pages were kept compatible with the generated fact table guard.

## 05-05-2026 11:35 NZST

Third comparison quality batch from the shortest-comparison queue.

Changed comparison pages:

- `src/content/comparisons/elicit-vs-nanochat.md`
  - Corrected nanochat from a general hosted research assistant to an open-source LLM training reference.
  - Reframed Elicit around literature review, paper triage, and evidence extraction.
  - Swapped stale comparison sources for the current local tool pages.
- `src/content/comparisons/instantly-vs-make.md`
  - Clarified Instantly as the outbound email sender and deliverability layer.
  - Clarified Make as the cross-app workflow orchestration canvas.
  - Reworked the decision guidance around campaigns, lead handoffs, enrichment, and operations automation.
- `src/content/comparisons/chatgpt-vs-quillbot.md`
  - Expanded the comparison around ChatGPT for creation/reasoning and QuillBot for improving existing text.
  - Tightened guidance for students, marketers, editors, and teams that need paraphrasing, grammar, or summarization.
  - Removed stale third-party source references.
- `src/content/comparisons/decktopus-vs-gamma.md`
  - Reframed Gamma as a fast deck/doc/web-page drafting surface.
  - Reframed Decktopus around presenter workflows, forms, Q&A, analytics, and client-facing decks.
  - Removed stale third-party source references.
- `src/content/comparisons/chatgpt-vs-rytr.md`
  - Expanded the practical split between ChatGPT as a broad assistant and Rytr as a budget short-form template copywriter.
  - Added clearer advice for solo marketers, agencies, and teams that need longer strategic or researched writing.
  - Removed stale third-party source references.

Verification:

- `npm run guard:check` passed.
- `node scripts/audit-site-kpis.mjs --json` confirmed these five pages moved out of the shortest-comparison queue.

Notes:

- No generated assets were intentionally edited.
- Canonical-fact comparison pages were kept compatible with the generated fact table guard.
## 05-05-2026 12:10 NZST

- Updated `src/content/tools/fireworks-ai.md` after checking official Fireworks pricing, billing, and inference docs.
- Replaced brittle model-count, exact-price, hardware, speed, and compliance claims with more durable buyer guidance.
- Refocused the page around serverless inference, dedicated deployments, fine-tuning, batch jobs, and production evaluation criteria.
- Updated Fireworks metadata and methodology to the 2026-05-05 verification date.

## 05-05-2026 12:13 NZST

- Updated `src/content/tools/grok-code-fast.md` after checking xAI's official Grok Code Fast 1 announcement.
- Added current xAI API token pricing, prompt-caching context, and clearer buyer guidance for agentic coding loops.
- Expanded the page with practical fit, caution areas, and an evaluation checklist for coding-agent adoption.

## 05-05-2026 12:14 NZST

- Corrected `src/content/tools/dalle.md` after checking official OpenAI image generation, API reference, pricing, and deprecation sources.
- Removed unsupported GPT Image 2 replacement claims and reframed DALL-E as a deprecated OpenAI API model family.
- Added API status, migration guidance, source links, and a checklist for moving away from `dall-e-2` and `dall-e-3`.

## 05-05-2026 12:15 NZST

- Updated `src/content/tools/comet.md` after checking Perplexity's official Comet page.
- Reflected current Comet positioning as a cross-platform assistant browser, not only a research search wrapper.
- Added practical workflows, rollout advice, platform context, and stronger caveats around enterprise browser replacement and delegated actions.

## 05-05-2026 12:16 NZST

- Updated `src/content/tools/browserbase.md` after checking Browserbase's official product and pricing pages.
- Refreshed pricing and verification dates, including current plan tiers and usage considerations.
- Added sharper buy-versus-build guidance, evaluation scenarios, and risk notes for browser-agent infrastructure.

## 05-05-2026 12:17 NZST

- Updated `src/content/tools/lovart.md` after checking Lovart's official product and pricing pages.
- Expanded the page with practical brand, campaign, product-launch, edit, and creative-review workflows.
- Added adoption checks, credit-budgeting caveats, and stronger handoff guidance for production design teams.

## 05-05-2026 12:18 NZST

- Updated `src/content/tools/pinecone.md` after checking Pinecone's official pricing and cost documentation.
- Refreshed pricing metadata for Starter, Builder, Standard, and Enterprise plans.
- Added evaluation guidance for hybrid retrieval, reranking, indexing, tenant isolation, and usage-cost planning.
## 05-05-2026 12:32 NZST

- Updated `src/content/tools/napkin-ai.md` after checking Napkin AI's official pricing page.
- Refreshed verification dates, credit details, and plan descriptions for Free, Plus, Pro, and Enterprise.
- Added practical workflows and buyer-fit guidance for turning written ideas into diagrams, flowcharts, and slide-ready visuals.

## 05-05-2026 12:33 NZST

- Updated `src/content/tools/deepgram.md` after checking Deepgram's official pricing page.
- Added current pricing-shape guidance around free credits, pay-as-you-go, Growth plans, endpoint-specific meters, and concurrency limits.
- Expanded evaluation and buyer-fit sections for real-time STT, TTS, voice agents, audio intelligence, and production voice workloads.

## 05-05-2026 12:34 NZST

- Updated `src/content/tools/dia.md` after checking Dia's official product page.
- Reflected Dia's current positioning around Morning Brief, proactive suggestions, connected work apps, meetings, profiles, splits, and organized tabs.
- Added practical workflows and caveats for connected-app permissions and macOS-only availability.

## 05-05-2026 12:34 NZST

- Updated `src/content/tools/dust.md` after checking Dust's official pricing page.
- Added Pro plan details for fair-use messages, programmatic credits, data-source storage, and private spaces.
- Expanded buyer-fit and rollout guidance for department-level internal AI agent adoption.

## 05-05-2026 12:35 NZST

- Updated `src/content/tools/assemblyai.md` after checking AssemblyAI's official pricing page.
- Refreshed verification dates, free-credit details, base STT rates, streaming-rate context, and Voice Agent API pricing.
- Added evaluation and buyer-fit guidance for speech understanding, diarization, domain audio, and voice-agent cost planning.

## 05-05-2026 12:35 NZST

- Updated `src/content/tools/glean.md` after checking Glean's official product overview.
- Reflected current Work AI platform positioning across Assistant, Agents, Search, Enterprise Graph, Personal Graph, Model Hub, APIs, MCP, connectors, and work surfaces.
- Added buyer-fit and rollout-checklist guidance for enterprise search, agent governance, permissions, and developer-context adoption.

## 05-05-2026 12:36 NZST

- Updated `src/content/tools/read-ai.md` after checking Read AI's official plans and pricing page.
- Refreshed monthly and annual plan pricing for Free, Pro, Enterprise, and Enterprise+.
- Added buyer-fit and rollout guidance covering meeting length, upload minutes, Search Copilot, playback, HIPAA/SSO controls, and coaching-metric governance.

## 05-05-2026 18:12 NZST

- Continued the comparison-quality sprint with `figma-vs-midjourney`, `ahrefs-vs-frase`, and `freepik-vs-ideogram`.
- Added decision snapshots, use-case decision matrices, workflow-fit guidance, pricing/procurement context, and buyer test checklists.
- Added canonical fact-table flags to `ahrefs-vs-frase` and `freepik-vs-ideogram`, and removed stale hardcoded Freepik/Ideogram pricing claims in favor of generated facts.

## 05-05-2026 17:38 NZST

- Started the comparison-quality sprint for high-intent "X vs Y" pages.
- Expanded `seedance-vs-synthesia`, `instantly-vs-zapier`, `marketmuse-vs-semrush`, `claude-vs-cursor`, and `elevenlabs-vs-wellsaid` with decision matrices, pricing/procurement guidance, workflow-fit sections, and buyer test checklists.
- Added missing canonical fact-table flags to three upgraded comparisons and corrected the Seedance comparison from 3.1 to current Seedance 2.0 naming.

## 05-05-2026 17:02 NZST

- Added six post-May-3 AI news articles covering Sierra's funding round, Anthropic's enterprise AI services company, OpenAI's reported deployment venture, PwC/OpenAI finance agents, White House model-vetting talks, and Palantir's Q1 AI-platform demand signal.
- Used official sources where available and reputable reporting for still-reported items.
- Kept the new industry-wide news posts free of `affects` links to avoid false tool-page cross-reference obligations.

## 05-05-2026 12:37 NZST

- Rewrote `src/content/use-cases/ai-agency-stack.md` into a practical AI automation agency stack guide.
- Removed brittle package-pricing claims, revenue-style deliverable templates, and old wiki cross-references.
- Added modular stack architecture, good first projects, discovery checklist, delivery pattern, scope guidance, failure modes, and related site links.

## 05-05-2026 12:37 NZST

- Updated `src/content/tools/modal.md` after checking Modal's official pricing page.
- Refreshed Starter, Team, Enterprise, compute-credit, GPU, CPU, memory, region, and non-preemptible pricing guidance.
- Added evaluation and buyer-fit sections for serverless GPU workloads, cold starts, queue behavior, cost tags, and reserved-capacity comparisons.

## 05-05-2026 12:38 NZST

- Updated `src/content/tools/replicate.md` after checking Replicate's official pricing page.
- Added clearer pricing mechanics for public models, input/output billing, hardware-runtime billing, private model idle time, and fast-booting fine-tunes.
- Added production evaluation guidance for official models, model-page cost checks, cold starts, retries, private deployments, and migration planning.

## 05-05-2026 12:39 NZST

- Updated `src/content/tools/qdrant.md` after checking Qdrant's cloud billing documentation.
- Refreshed verification dates and added resource-shaped cloud pricing guidance for CPU, memory, disk, snapshots, replicas, and cluster planning.
- Added evaluation and buyer-fit sections for metadata filters, hybrid search, reranking, tenant isolation, backups, monitoring, and retrieval evals.

## 05-05-2026 12:39 NZST

- Updated `src/content/tools/hugging-face.md` after checking Hugging Face's official pricing page.
- Refreshed Pro, Team, Enterprise, storage, Spaces hardware, ZeroGPU, Inference Providers, and Inference Endpoints pricing context.
- Added buyer-fit and evaluation guidance for model licenses, model cards, endpoint uptime, storage regions, access controls, and production inference planning.

## 05-05-2026 12:40 NZST

- Updated `src/content/tools/weaviate.md` after checking Weaviate's official pricing page.
- Refreshed cloud pricing for Free Trial, Flex, Premium, vector dimensions, storage, backups, regions, compression, hosted embeddings, and Query Agent.
- Added evaluation guidance for hybrid retrieval, multi-tenancy, compression, HIPAA/SSO/PrivateLink needs, and add-on scope.

## 05-05-2026 12:41 NZST

- Expanded three thin news briefs after checking official Google and OpenAI sources.
- Updated `src/content/news/2026-04-26-gemini-embedding-2-ga.md` with Gemini Embedding 2 multimodal availability, API/Vertex AI context, and evaluation questions.
- Updated `src/content/news/2026-04-26-chatgpt-workspace-agents.md` with OpenAI workspace-agent details, research-preview availability, governance questions, and integration checks.
- Updated `src/content/news/2026-04-26-google-deep-research-max.md` with Deep Research/Deep Research Max scope, Gemini API context, MCP/source coverage, native visualization notes, and evaluation guidance.

## 05-05-2026 12:42 NZST

- Expanded three additional thin developer-tool news briefs after checking GitHub and Google official sources.
- Updated `src/content/news/2026-04-26-github-copilot-web-debugging.md` with github.com debugging workflow context and validation guidance.
- Updated `src/content/news/2026-04-26-github-copilot-cloud-agent-metrics.md` with usage-metrics migration context and admin reporting guidance.
- Updated `src/content/news/2026-04-26-google-ai-studio-vibe-coding-subscription.md` with official Google AI Studio subscription details and prototype-versus-production caveats.

## 05-05-2026 12:43 NZST

- Expanded three GitHub Copilot news briefs with clearer enterprise and review-workflow implications.
- Updated `src/content/news/2026-04-26-github-copilot-byok-vscode.md` with BYOK scope, completion limitations, provider billing, and admin-review caveats.
- Updated `src/content/news/2026-04-26-github-copilot-jira-agent-controls.md` with Jira context-quality risks and rollout guidance.
- Updated `src/content/news/2026-04-26-github-copilot-pr-chat-improvements.md` with PR-review workflow impact and review-throughput evaluation guidance.
## 05-05-2026 12:57 NZST

- Expanded four thin industry and governance news briefs with more practical context.
- Updated `src/content/news/2026-04-26-ai-influencers-faker.md` with synthetic-persona disclosure and brand-safety implications.
- Updated `src/content/news/2026-04-26-sinceerly-un-ai-writing-tool.md` with writing-quality versus detector-evasion framing.
- Updated `src/content/news/2026-04-26-vatican-ai-governance.md` with moral-governance and procurement implications.
- Updated `src/content/news/2026-04-26-forbes-ai-50-2026.md` with Forbes source context and follow-up questions for tool coverage.

## 05-05-2026 12:58 NZST

- Updated three product-relevant AI agent and governance news briefs with stronger official sourcing.
- Reworked `src/content/news/2026-04-14-anthropic-claude-computer-use-agent.md` around Anthropic release notes and safer computer-use caveats.
- Reworked `src/content/news/2026-04-15-hubspot-ai-agents-launch.md` around HubSpot's Spring 2026 Spotlight, AEO, and outcome-based agent pricing sources.
- Expanded `src/content/news/2026-04-26-anthropic-election-safeguards.md` with election-policy evaluation and human-review implications.

## 05-05-2026 13:00 NZST

- Expanded four infrastructure, robotics, and sovereign-AI news briefs with stronger source context.
- Updated `src/content/news/2026-04-26-physical-ai-robotics-capgemini.md` with Capgemini survey figures and safer robotics-pilot framing.
- Updated `src/content/news/2026-04-26-google-tpu-agentic-era-followup.md` with official TPU 8i agentic-serving details and buyer signals.
- Updated `src/content/news/2026-04-26-cohere-aleph-alpha-sovereign-ai-analysis.md` with TechCrunch deal context around Schwarz Group, STACKIT, and regulated buyers.
- Updated `src/content/news/2026-04-26-nvidia-5-trillion-ai-rally.md` with compute-cost implications for AI tool buyers.
