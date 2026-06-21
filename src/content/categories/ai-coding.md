---
type: category
slug: ai-coding
title: AI Coding Assistants
description: Current AI coding assistants, AI-native IDEs, terminal coding agents, PR agents, and app builders for developers, founders, teams, and non-developers.
tool_count: 31
seo_title: "Best AI Coding Tools & Copilot Alternatives (June 2026)"
meta_description: "Updated June 20, 2026: compare Cursor, Claude Code, GitHub Copilot after app GA and gradual signup reopening, DeepSeek V4, Grok Build, Amazon Q Developer's Kiro transition, Mastra, Codex, Devin, v0, Replit Agent, Aider, Cline, CodeRabbit, Cody, and Augment by workflow, pricing, autonomy, model-route risk, and team fit."
author: "aipedia.wiki Editorial"
last_updated: 2026-06-20
last_verified: 2026-06-20
update_frequency: weekly
top_picks:
  best_overall:
    tool: cursor
    label: "Best AI-native IDE"
  budget:
    tool: github-copilot
    label: "Best GitHub-native value"
  pro_team:
    tool: claude-code
    label: "Best terminal coding agent"
decision_picks:
  - tool: cursor
    label: Best IDE-native coding agent
    reason: Cursor remains the strongest fit when the buyer wants editor-native coding, agent tasks, and codebase-aware workflows in one product.
    plan: Pro or Ultra depending on usage volume
    source_refs:
      - cursor-pricing
      - cursor-changelog
      - cursor-teams-pricing-june-2026
    verified_at: 2026-06-20
    confidence: high
  - tool: github-copilot
    label: Best GitHub-native enterprise default
    reason: GitHub Copilot is the safer default when procurement wants GitHub-native governance, IDE coverage, code review, and agent tasks inside existing GitHub controls.
    plan: Business or Enterprise
    source_refs:
      - github-copilot-plans
      - github-copilot-plan-docs
      - github-copilot-ai-credits
      - github-copilot-app-ga
    verified_at: 2026-06-20
    confidence: high
---

## Quick Decision

AI coding tools now split into five buyer jobs: inline help inside an existing IDE, full AI-native IDEs, terminal agents, pull-request agents, and app builders for non-developers. Pick the workflow first, then compare price.

**June 15 token-budget governance update:** [Disney's reported AI coding push](/news/2026-06-15-disney-ai-coding-tokenmaxxing/) adds a practical enterprise warning for Cursor, Claude Code, Copilot, Codex, Replit Agent, Devin, and similar tools. Do not measure rollout success by raw tokens, prompts, or agent sessions. Measure reviewed diffs, test-passing changes, defect rate, cycle time, rollback safety, and whether AI-coded work survives release.

**June 15 Codex/Ona update:** [OpenAI's June 11 Ona acquisition agreement](/news/2026-06-11-openai-acquires-ona-codex-persistent-agents/) makes persistent execution a first-class coding-agent buying criterion. For Codex, Claude Code, Cursor, Copilot, Devin, Replit Agent, and model-router stacks, ask where the agent runs, how credentials are scoped, how activity is logged, which actions require review, and what budget controls exist before letting background agents run for hours or days.

**June 15 Grok Build update:** [Grok](/tools/grok/) now belongs in the coding-agent comparison set, not only Chatbots/Search. xAI's current docs describe Grok Build as an interactive TUI and headless coding agent with custom models, skills/plugins, ACP integration, and a Grok Build 0.1 API model at 256K context. Treat it as an xAI-native coding lane to benchmark, while still checking command approvals, sandbox behavior, team/ZDR retention settings, account limits, and repo-quality output before rollout.

**June 18 Amazon Q Developer update:** [Amazon Q Developer](/tools/amazon-q/) is no longer a clean greenfield IDE/plugin purchase. AWS announced that Q Developer IDE plugins and paid subscriptions reach end of support on April 30, 2027, new Q Developer account and subscription creation was blocked starting May 15, 2026, and Kiro is the migration path for IDE/CLI work. Existing AWS-heavy teams can use the runway, but new buyers should evaluate Kiro, Cursor, Copilot, Claude Code, Codex, and other current agent surfaces before committing.

**Use [Cursor](/tools/cursor/) when a developer wants a full AI-native IDE.** The June 15 recheck keeps it the best default for daily coding when the buyer wants Composer 2.5, repo-aware chat, multi-file edits, the Agents Window, Cloud Agents, CLI/SDK automation, Design Mode, Bugbot review, and a VS Code-like surface built around AI rather than an extension. Cursor's May 22 Gartner enterprise-coding-agent recognition is a procurement signal, but teams should still test it on their own repositories against Codex, Claude Code, and GitHub Copilot.

**June 15 Cursor update:** Cursor now needs a sharper buyer note around usage-sensitive agent economics and enterprise controls. The live pricing page proves Hobby free, Individual from $20/month, Teams at $40/user/month, Enterprise custom, recommends Pro+ for daily agent users plus Ultra for agent power users, and says on-demand usage can continue after included usage is consumed and be billed in arrears. The June 3-10 official updates added Enterprise organizations, SDK custom tools and auto-review, Design Mode/context usage reporting, and a faster Composer 2.5-powered Bugbot with `/review` before push. Treat Cursor as an editor-native agent platform, not just a Copilot replacement.

**June 20 Cursor vs DeepSeek update:** Cursor vs DeepSeek now separates the IDE/workbench purchase from the model/API purchase. Cursor remains the better daily AI coding workspace after current pricing, Teams Premium, Automations, cloud subagents, and Bugbot checks. DeepSeek belongs in the coding-model backend lane: V4-Flash and V4-Pro have 1M context, low API rates, OpenAI/Anthropic-compatible endpoints, and V4 open-weight releases, but do not replace an IDE, PR-review workflow, team admin, or compliance review.

**June 20 Cursor vs Grok update:** Cursor vs Grok now separates the daily AI IDE purchase from the xAI coding-agent/API evaluation lane. Cursor remains the better default for developers who need an editor, diffs, review, Cloud Agents, Automations, Bugbot, Teams controls, and usage dashboards. Grok belongs in the benchmark lane when teams want to test Grok Build, `grok-build-0.1`, Grok 4.3, X-aware workflows, or broader xAI platform tooling with explicit sandbox, permission, ZDR/team, and repo-quality checks.

**June 20 DeepSeek vs GitHub Copilot update:** DeepSeek vs GitHub Copilot now separates the low-cost model/backend purchase from the GitHub-native coding-platform purchase. DeepSeek belongs behind a model router, eval harness, internal coding agent, or self-hosted/open-weight experiment when token economics and model control matter. Copilot remains the better daily product for developers and teams because it owns IDE coverage, GitHub pull requests, code review, Copilot CLI, the generally available Copilot app, cloud Coding Agent, AI Credits budgeting, and organization policy.

**June 20 DeepSeek vs Replit Agent update:** DeepSeek vs Replit Agent now separates the low-cost coding-model backend from the browser app-builder purchase. Replit Agent is the better path when the buyer needs prompt, plan, build, preview, database/auth, App Testing, Skills, and publishing in one workspace. DeepSeek belongs behind an engineering-owned router, eval harness, internal agent, or self-hosted/open-weight experiment when token economics, 1M context, and model control matter more than no-code app-building speed.

**June 5 Cursor-cluster update:** the oldest live Cursor comparison rows now separate Cursor vs Gemini, [Cursor vs GitHub Copilot](/compare/cursor-vs-github-copilot/), Cursor vs Lovable, [Cursor vs Tabnine](/compare/cursor-vs-tabnine/), Cursor vs v0, and [Cursor vs Windsurf](/compare/cursor-vs-windsurf/) against current primary sources. The buyer split is now clearer: Cursor is the hands-on AI-native IDE; Devin is asynchronous task delegation; Gemini is the broader Google AI ecosystem; Copilot is GitHub-native AI Credits/governance; Lovable and v0 are app-builder lanes; Tabnine is privacy-first enterprise code assistance; Val Town is an instant TypeScript runtime; and Windsurf is now best understood as Devin Desktop inside Cognition's stack.

**Use [GitHub Copilot](/tools/github-copilot/) when the team already lives in GitHub and wants a safe default.** GitHub's official billing docs and June 1 changelog now make usage-based billing with GitHub AI Credits the active model, and the June 2 [Copilot SDK GA](/news/2026-06-02-github-copilot-ai-credits-sdk-ga/) turns Copilot into an embeddable agent runtime. It remains a strong value for GitHub-native teams that value IDE coverage, policy, pull requests, and enterprise governance, but heavy agentic, SDK, code-review, Spaces, Spark, and cloud-agent use needs modeling. The June 20 DeepSeek vs GitHub Copilot refresh now separates Copilot as the GitHub-native developer workflow from DeepSeek as the low-cost model/backend lane.

**June 20 GitHub Copilot update:** the Copilot page now supersedes the earlier signup-pause caveat with GitHub's June 17 note that Student, Pro, Pro+, and Max sign-ups are reopening gradually. The same refresh adds the generally available GitHub Copilot app, MAI-Code-1-Flash expansion, `AGENTS.md` support in Copilot code review, and the `ai_credits_used` user metric for admins. Keep the Fable 5 suspension warning, AI Credits budgeting, GitHub Enterprise Server caveat, one-million-token context, configurable reasoning, Agent tasks REST API, Chat/agent-session handoff, Agentic Workflows, CLI `/settings`, and code-review controls in the buyer model.

**June 5 Copilot comparison follow-up:** the refreshed [GitHub Copilot vs Supermaven](/compare/github-copilot-vs-supermaven/), [GitHub Copilot vs Tabnine](/compare/github-copilot-vs-tabnine/), and GitHub Copilot vs Val Town pages now separate Copilot's real buyer lane from three adjacent intents: Supermaven for fast long-context autocomplete, Tabnine for privacy-first deploy-anywhere code assistance, and Val Town for hosted TypeScript vals, cron jobs, and tiny APIs.

**June 5 Gemini vs Copilot update:** Gemini vs GitHub Copilot now treats Gemini as the broad Google AI workspace and Copilot as the dedicated GitHub-native coding platform. Gemini can help with code explanation, architecture, Google AI Studio, Gemini CLI, and Code Assist, but Copilot remains the cleaner first purchase when the buyer needs IDE help, PR review, Coding Agent, Spaces, Spark, SDK usage, and AI Credits governance.

**June 18 Antigravity migration update:** [Antigravity](/tools/antigravity/) now carries the current Google developer-agent caveat: Gemini CLI, Gemini Code Assist IDE extensions, Gemini Code Assist for individuals, and Gemini Code Assist for GitHub stop serving consumer/free/Pro/Ultra requests on June 18, 2026 and move toward Antigravity CLI and Antigravity 2.0. Keep that separate from Gemini Code Assist Standard/Enterprise, Google Cloud organization access, and Gemini Enterprise Agent Platform.

**Use [Claude Code](/tools/claude-code/) when the buyer wants a Claude-backed coding agent for serious repo work.** The June 4 comparison pass refreshes [Claude Code vs Continue](/compare/claude-code-vs-continue/), [Claude Code vs Devin](/compare/claude-code-vs-devin/), [Claude Code vs GitHub Copilot](/compare/claude-code-vs-github-copilot/), and around the real buyer split: specialist Claude agent, open-source BYOK IDE layer, async ticket delegation, GitHub-native AI platform, or hosted TypeScript runtime. Claude Code is better for repo investigation, multi-file work, command execution, debugging loops, and senior-engineer-style delegation than for passive autocomplete.

**June 20 Claude Code billing correction:** [Claude Fable 5 and Mythos 5 access is suspended](/news/2026-06-13-us-blocks-anthropic-fable-mythos-openai-probe/), and the [June 14 desk](/news/2026-06-14-ai-news-desk/) makes the route-risk lesson explicit. Claude Code buyers should treat Opus 4.8 as the stable high-end Anthropic route until Anthropic restores Fable/Mythos access. Do not use Fable- or Mythos-specific pilot notes as production-default evidence until the account route is actually available again. Anthropic's Agent SDK help now says the separate Agent SDK credit changes are paused, so do not budget around a separate Agent SDK, `claude -p`, or GitHub Actions credit pool until Anthropic updates the guidance. For coding-agent route stability across Claude Code, Codex, GitHub Copilot, and model routers, use the [AI Model Availability & Churn Tracker](/trends/model-availability-churn/).

**Use [Windsurf / Devin Desktop](/tools/windsurf/) when the buyer wants Cognition's IDE surface beside Devin.** The June 18 recheck keeps `windsurf.com/pricing` routed through Devin pricing, but the page now needs to be evaluated as a current Devin Desktop stack, not a simple rename. Devin pricing still lists Free, Pro $20/month, Max $200/month, Teams $80/month plus $40/month per full dev seat, and Enterprise custom, while docs now make daily/weekly quotas, extra usage at API pricing, SWE-1.6, Devin Local, ACP, and migration/admin details central to the buyer decision.

**June 18 Codeium lineage update:** the old [Codeium vs GitHub Copilot](/compare/codeium-vs-github-copilot/) buyer page now treats Codeium as historical search intent, not a live checkout. Current buyers should compare Devin Desktop against Copilot: Cognition-stack IDE, SWE-1.6, Devin Local, local/cloud agent management, quota/extra-usage modeling, and migration-policy work versus GitHub-native IDE coverage, PRs, policy, SDK access, and AI Credits governance.

**June 5 Devin comparison follow-up:** the refreshed [Devin vs GitHub Copilot](/compare/devin-vs-github-copilot/) and Devin vs Val Town pages now separate three buyer lanes cleanly: Devin for async ticket delegation, GitHub Copilot for GitHub-native IDE/PR/SDK/governance workflows, and Val Town for instant hosted TypeScript endpoints, cron jobs, and small automations.

**June 14 Val Town update:** [Val Town](/tools/val-town/) remains the tiny TypeScript runtime lane: Free for public vals, Pro at the $21/month yearly-billed headline with $10/month in Townie credit, and Business from $167/month yearly-billed with $100/month in Townie credit. Use Vercel or Vercel Functions when the buyer is building a full-stack app, needs multiple runtimes, or wants app-platform controls; use Val Town for vals, cron jobs, webhooks, and small internal utilities.

**June 14 Factory update:** [Factory](/tools/factory/) pricing remains unchanged in current docs: Pro is still $20/month, Plus is $100/month, Max is $200/month, and Teams/Enterprise remain custom. The buyer guidance stays conservative: Pro for serious individual evaluation, Plus only when Droid Computers or roughly 5x Pro usage are already useful, and Max only for heavy individual users who need roughly 10x Pro usage plus early access.

**June 15 Mastra update:** [Mastra](/tools/mastra/) remains the TypeScript-first agent-framework lane, not a no-code app builder. The current pricing page keeps Starter at $0/month, Teams at $250/month, and Enterprise/self-hosted custom, but the June 15 check sharpens the real cost model around observability events, CPU time, data egress, persistent servers, Memory Gateway input/output at market rate plus 5.5%, memory tokens, retrieval storage, platform storage, and outside model-provider spend. Current docs also make Mastra a broader production-agent surface: the model router claims 4,243 models across 124 providers, while June posts added Code Mode, Agent Signals, and ACP delegation to Claude Agent, Codex CLI, Cursor, Gemini CLI, or compatible harnesses. Treat sandbox policy, workspace isolation, tool approvals, and provider-key handling as part of the buying decision.

**June 15 CodeRabbit update:** [CodeRabbit](/tools/coderabbit/) remains the dedicated PR-review lane for teams that want AI summaries, comments, IDE/CLI review, Knowledge Base, linters, SAST hooks, and human approval before merge. The current check keeps Pro at $24/developer/month annual or $30 monthly, Pro+ at $48 annual or $60 monthly, Slack Agent at $0.50 per active agent minute, and adds sharper capacity guidance: Pro, Pro+, and Enterprise review limits are refillable per-developer allowances, while usage add-on credits are $1 each and cover four reviewed files for eligible over-limit PR/CLI reviews. June changelog updates also matter for coding-agent teams: CodeRabbit Plan in VS Code, CLI v0.6.0, automatic repository linking, and newer GitLab/GHES review support.

**June 15 Qodo update:** [Qodo](/tools/qodo/) remains the enterprise code-review governance lane, not an autocomplete replacement. Current pricing still lists Developer free, Teams at $38/user/month monthly or $30 annual, and Enterprise custom, but current subscription docs add the operational catch: Teams PR reviews require an assigned paid seat plus a linked Git account, otherwise the developer falls back to Free-tier behavior. Also treat Qodo CLI as sales-verified only: pricing lists CLI workflows on Enterprise, while current CLI docs call the CLI legacy and no longer maintained.

**June 15 BLACKBOX AI update:** [BLACKBOX AI](/tools/blackbox-ai/) remains a low-cost multi-model coding bundle rather than a procurement-safe enterprise default. Current pricing still lists Pro at $10/month, Pro Plus at $20/month, Pro Max at $40/month, and Enterprise custom, but the official pricing page conflicts on included model credits: pricing cards say $10/$20/$40 of latest-model value while comparison and mobile rows say $20/$40/$80. Keep Pro Plus as the practical App Builder, multi-agent, coding-agent tier; use Pro Max for team/admin controls; and do not treat the paused Cuelinks CPC listing as an active affiliate CTA.

**June 20 Replit Agent update:** [Replit Agent](/tools/replit-agent/) should now be evaluated as the current Agent / Agent 4-era browser app-builder surface, not the older Agent 3 session-length story. Current Replit sources keep Lite, Economy, Power, High effort, Pro/Enterprise-only Turbo, Plan Mode, Design Canvas, Web Search, Agent Skills, app self-testing, and task workflows as the buyer frame, while the newer June checks add Custom Instructions, Skills-as-`SKILL.md`, Package Firewall, Starter feature gates, App Testing's web-app-only scope, and Pro credit rollover. Core remains the solo-builder upgrade and Pro is the serious Agent tier, but buyers need usage budgets because Plan Mode/text guidance, third-party API calls, App Testing, High effort, and Turbo can all raise credit burn.

**June 20 Replit vs model-backend update:** the new DeepSeek vs Replit Agent page makes Replit's category lane more explicit. Replit is not the cheapest model API, and DeepSeek is not a no-code app builder. Use Replit for low-risk browser prototypes and internal apps; use DeepSeek when engineers own the backend, evaluation, privacy review, and model routing.

**June 20 Claude vs Replit Agent update:** Claude vs Replit Agent now captures the current buyer split. Claude is the better reasoning, repo investigation, code review, and Claude Code lane for developers working around existing codebases. Replit Agent is the better browser-native app-builder lane for non-developers, prototypes, internal tools, and small projects that need prompt, build, preview, database/auth, publish, and iteration in one workspace.

**Use [Codex](/tools/codex/) when the team wants OpenAI-native agent coding.** It fits local repo work, PR preparation, checks, and tasks where an agent can edit and verify code rather than only suggest completions. After OpenAI's June 11 Ona acquisition agreement, watch how Codex exposes persistent customer-controlled cloud workspaces, scoped credentials, audit logs, and review gates once the deal closes.

**Use [v0 by Vercel](/tools/v0/) when the coding deliverable is a Vercel-native web artifact.** The June 4 ChatGPT vs v0 refresh keeps the boundary clear: ChatGPT is broader for requirements, architecture, debugging, and code review, while v0 is better for generating previewable React/Next/Tailwind interfaces, deploys, GitHub sync, and PR workflows.

**Use [Rork](/tools/rork/) when the coding deliverable is a mobile/app-store prototype instead of a web dashboard.** The June 9 docs check keeps Free as a public web-app test lane, Rork Pro from $20/month for Android Kotlin/Compose plus Expo/React Native and web apps, and Rork Max from $200/month for SwiftUI iOS, Apple Watch, Vision Pro, native games, and widgets. It is an app-builder handoff lane, not a replacement for code review, mobile architecture, or production QA.

**Use [Goose](/tools/goose/) when the buyer wants an open-source local/BYOK agent that crosses coding and general automation.** The active repository now resolves to `aaif-goose/goose`, Goose itself is Apache-2.0/free, and the real cost is the configured LLM plus local permission/security controls.

**June 15 Cline update:** [Cline](/tools/cline/) is no longer just a "free VS Code extension" buyer lane. Current Cline pages position it as an open-source agent runtime across IDE, CLI, Kanban, SDK, and a separate licensed Spec Driven enterprise platform with LG CNS. Open Source remains free for individual developers, but inference is usage-based or BYOK. Enterprise and Spec Driven are custom/licensed governance and delivery-platform lanes for SSO/RBAC/billing/audit/deployment controls, enterprise context, fixed spec pipelines, and model/deployment boundaries. Teams should review Auto Approve/YOLO plus SDK tool policies before broad automation because unlisted SDK tools default to enabled and auto-approved. Vercel AI Gateway is one supported provider route, not the whole product.

**June 15 Cody update:** [Cody](/tools/cody/) remains a Sourcegraph Enterprise-only code-intelligence lane, not a self-serve Copilot alternative. Current Sourcegraph sources keep Enterprise starting at $16K with AI-feature credits, org-wide credit pooling, no monthly credit expiry, and renewal rollover; the VS Code Marketplace now warns Cody is no longer available for non-enterprise users even while the listing still carries stale Cody Pro/model-option copy. Evaluate it only when Sourcegraph code graph, Deep Search, MCP/API/CLI access, Cody Gateway/model controls, and enterprise procurement are part of the platform decision.

**Use [GLM](/tools/glm/) when the coding question is model backend evaluation.** Z.AI's GLM-5.1 docs list 200K context, 128K maximum output, OpenAI-compatible API examples, MCP/tool support, and MIT Hugging Face weights, with public API pricing at $1.40/M input and $4.40/M output.

**Use [MiniMax](/tools/minimax/) when the coding question is MiniMax-M3 backend evaluation.** The June 8 check moves MiniMax from M2.7-first to M3-first: standard M3 pay-as-you-go is listed at $0.30/M input and $1.20/M output for <=512K input, while >512K input and Priority tiers still need account-level access confirmation.

**Use [Yi](/tools/yi/) only for legacy Yi-Coder or frozen-model coding experiments.** The June 10 check keeps 01.AI's public Yi pages alive, but the company headline is WorldWise/WanZhi 2.5 enterprise agents rather than a new Yi coding-model roadmap. Teams with Yi-Coder integrated can keep it as a reproducible baseline after license review; new coding-model evaluations should start with GLM, Qwen, Kimi, MiniMax, DeepSeek, or current hosted coding assistants. The June 15 Qwen recheck matters for coding-agent buyers because Qwen Cloud still lists a June 8 Max snapshot, while qwen3.7-plus remains the clearer multimodal/GUI-agent lane and the live qwen3.7-max marketplace page still describes text input/output.

**Use [Llama](/tools/llama/) when the coding question is open-weight model control rather than an IDE.** The June 8 check keeps Maverick as the flagship open-weight model to evaluate, Scout as the long-context/Groq fast-inference lane, and Together/Groq pricing as provider-specific. It belongs here for self-hosted coding backends, local agent experiments, and model-diversification strategy, not as a direct substitute for Cursor, Copilot, Claude Code, or Codex.

**Use [Modal](/tools/modal/) when the coding deliverable is Python-backed infrastructure, not code suggestions.** Modal fits serverless Python functions, GPU inference jobs, web endpoints, sandboxes, queues, and scheduled jobs. It is a runtime/deployment lane beside Val Town and Replit-style builders, not an IDE assistant.

**Use [Whisper](/tools/whisper/) when the coding task is adding speech-to-text, not writing code.** The June 10 check keeps Whisper as the MIT self-hosted batch transcription baseline, while hosted OpenAI builds should compare GPT-4o Transcribe, GPT-4o Mini Transcribe, GPT-4o Transcribe Diarize, and GPT-Realtime-Whisper by price, diarization, and latency before choosing a model ID.

**Use [Glean](/tools/glean/) when coding agents need permission-aware company knowledge.** Glean's developer platform now exposes MCP and setup paths for Claude Code, Codex, Goose, Cursor, Gemini CLI, VS Code, Windsurf, JetBrains, and other developer surfaces, so it belongs in the enterprise-codebase-context lane rather than the autocomplete lane.

**June 15 Augment Code update:** [Augment Code](/tools/augment-code/) is no longer a clean $20 solo / $60 team / $200 Max comparison in the public pricing surface. The current Augment page centers Business at $100/month flat for up to 50 seats with $100 included usage, Cosmos, Auggie CLI, MCP/native tools, pay-as-you-go after included usage, and Enterprise custom. Treat Augment as a team usage-balance product, not a simple per-developer Copilot replacement. Its model docs list Claude Fable 5, but Anthropic's Fable/Mythos suspension still makes route verification mandatory before using Fable-specific pilot results.

**June 4 maintenance note:** the previous live coding-ledger rows refreshed [Continue vs Cursor](/compare/continue-vs-cursor/), [Continue vs Devin](/compare/continue-vs-devin/), Continue vs GitHub Copilot, and Continue vs Val Town around the current split: Continue is source-controlled AI PR checks and agent governance, Cursor is the managed AI-native IDE, Devin is async ticket delegation, GitHub Copilot is the GitHub-native AI Credits platform, and Val Town is a hosted TypeScript runtime. The earlier June 4 live coding rows refreshed [Cline vs Cursor](/compare/cline-vs-cursor/) and Cody vs Cursor around Cline as the open-source BYOK agent runtime, Cody as the Sourcegraph Enterprise code-context lane after Free/Pro sunset, and Cursor as the managed AI-native IDE for daily implementation. The Claude Code comparison layer has also been refreshed against current Anthropic, GitHub, Continue, Cognition, and Val Town sources. The same June 4 pass refreshed Claude vs Cline, Claude vs Cody, Claude vs Cursor, and Claude vs GitHub Copilot so this hub now separates Claude as the broad assistant/Claude Code lane, Cline as the open-source BYOK repo agent, Cody as the Sourcegraph Enterprise code-context lane, Cursor as the GUI-first AI-native IDE, and Copilot as the GitHub-native AI Credits/model-picker lane. Earlier June 2 maintenance remains in force for Aider, Cline, CodeRabbit, Amazon Q Developer, Augment Code, Sourcegraph Cody, Factory, JetBrains AI, Kiro, Mastra, OpenHands, Pieces, Qodo, Replit Agent, Same.dev, Supermaven, Tabnine, Windsurf/Devin Desktop, Zed, Goose, GLM-5.1, and Glean.

## Buyer Paths

| Buyer job | Start with | Why | Watch out |
|---|---|---|---|
| Daily AI-native IDE coding | [Cursor](/tools/cursor/) | Strongest full-editor Copilot replacement, now with Composer 2.5, Cloud Agents, CLI/SDK automation, Design Mode, and Bugbot | Editor migration plus agent/review usage costs can disrupt teams |
| GitHub-native IDE assistance and policy | [GitHub Copilot](/tools/github-copilot/) | Best fit for GitHub, VS Code, JetBrains, PRs, cloud agents, and enterprise controls | AI Credits, Fable 5 suspension, paid-plan eligibility, GitHub Enterprise Server unavailability, long-context/reasoning costs, and Actions-backed review/agent controls need modeling before heavy use |
| Claude-backed repo agent | [Claude Code](/tools/claude-code/) | Strong for inspecting, editing, running commands, iterating across codebases, and using dynamic workflows for broad tasks | Interactive subscription limits, paused Agent SDK credit changes, API billing, effort settings, permissions, workflow controls, and model fallback after Fable/Mythos suspension matter |
| Cognition-stack IDE alternative | [Windsurf / Devin Desktop](/tools/windsurf/) | Worth testing against Cursor when Devin handoff, SWE-1.6, Devin Local, ACP, and Cognition's stack matter | Old Windsurf-only plan claims are stale; verify current Devin pricing, daily/weekly quotas, extra usage, endpoint policy, command names, and account entitlements |
| Lowest-cost multi-model IDE experiment | [Trae](/tools/trae/) | Lite at $3 and Pro at $10 undercut most AI IDE plans while preserving a VS Code-like workflow | ByteDance-adjacent telemetry/procurement risk and token allowances need review before serious repo work |
| OpenAI-native coding agent | [Codex](/tools/codex/) | Good for local repo tasks, PR-style work, and OpenAI-aligned teams | Not a pure inline autocomplete replacement |
| Vercel-native app builder | [v0](/tools/v0/) | Turns prompts, screenshots, Figma context, and code context into previewable web apps and PR-ready changes | Credit/token usage, accessibility, security, and generated code quality need review |
| Mobile/app-store app builder | [Rork](/tools/rork/) | Pro covers Android, Expo/React Native, and web; Max covers SwiftUI iOS and Apple-device outputs | Free projects are public, Max starts high, and real apps still need developer handoff |
| UI mockup handoff reference | [Uizard](/tools/uizard/) | Fast editable mockups and per-component React/CSS handoff for non-designers | Not a full-project code export or production app builder |
| Open-source IDE/CLI/SDK agent runtime | [Cline](/tools/cline/) | Free Open Source plan, broad provider/local/Vercel AI Gateway routing, Plan/Act approvals, MCP, CLI, Kanban, and SDK embedding | Usage-based inference, Auto Approve/SDK permission policy, and Enterprise governance need review |
| Open-source local/BYOK agent | [Goose](/tools/goose/) | Desktop, CLI, and API agent with model choice, MCP extensions, and Apache-2.0 code | Needs provider-cost controls, secrets hygiene, and local-permission review |
| Source-controlled AI PR checks | [Continue](/tools/continue/) | Best fit when teams want repo-owned checks, private agents, and explicit standards-as-code review | Weak prompts create noisy checks; humans still own merge decisions |
| Coding model backend evaluation | [GLM](/tools/glm/) | GLM-5.1 open weights, OpenAI-compatible API examples, MCP/tool support, and long context | Verify endpoint behavior, region, compliance, and output-heavy costs |
| MiniMax M3 backend evaluation | [MiniMax](/tools/minimax/) | M3 coding/agentic positioning, native multimodality, low standard token price, and MiniMax Code path | Verify 512K vs 1M context access, Priority tier access, data residency, and independent benchmark fit |
| xAI coding-agent and API evaluation | [Grok](/tools/grok/) | Grok Build CLI/TUI, headless scripting, custom models, skills/plugins, ACP integration, and Grok Build 0.1 API | Newer coding lane; benchmark permissions, sandboxing, ZDR/team settings, account limits, and repo-quality output before rollout |
| Low-cost coding-model backend | [DeepSeek](/tools/deepseek/) | V4-Flash and V4-Pro provide low-cost API pricing, 1M context, OpenAI/Anthropic-compatible endpoints, and open-weight evaluation paths | Not an IDE or PR-review product; verify endpoint deprecation, hosted-data posture, license/hardware fit, and regulatory risk before production |
| Legacy Yi-Coder or frozen-model baseline | [Yi](/tools/yi/) | Yi-Coder/Yi-1.5 remain available through public 01.AI-linked model paths | Not a current coding-agent default; confirm license, support, and whether WorldWise/WanZhi is the actual 01.AI product path |
| Enterprise code/context search | [Glean](/tools/glean/) | Permission-aware work search and MCP/IDE integrations for developer tools | Sales-led pricing and connector/security review are required |
| Browser app building for non-devs | [Replit Agent](/tools/replit-agent/) | Useful when the buyer wants prompt, plan, build, test, database/auth, publish, skills/custom instructions, and iterate in one browser workspace. Use DeepSeek vs Replit Agent when the alternative is a model/API backend rather than another app builder. | Effort-based credits, Plan Mode billing, provider pass-through costs, App Testing scope, Turbo cost, lock-in, security, and maintenance need review |
| Async ticket delegation | [Devin](/tools/devin/) | Sandbox sessions, playback, and PR output fit well-scoped backlog work | Quotas, on-demand credits, and full-seat costs need modeling before team rollout |
| Tiny serverless TypeScript jobs | [Val Town](/tools/val-town/) | Fastest path for vals, cron jobs, webhooks, and small internal utilities | Not a full coding assistant or general app platform |
| Serverless Python/GPU jobs | [Modal](/tools/modal/) | Python functions, queues, endpoints, sandboxes, scheduled jobs, and per-second GPU billing | Not a coding assistant; production cost depends on utilization, regions, and non-preemptible needs |
| Speech-to-text integration | [Whisper](/tools/whisper/) | MIT self-hosted STT baseline plus OpenAI-hosted successor models for transcription, diarization, and realtime audio | Confirm current hosted model billing, latency, diarization, file limits, and data-handling before production |
| Open-source CLI/BYOK coding | [Aider](/tools/aider/) | Strong for developers who want local control, git commits as review history, and model choice | Requires comfort with terminal workflows and provider/API cost management |

## Our Picks

**Best overall AI coding tool: Cursor.** Choose it when the developer wants to live inside an AI-native IDE and is willing to switch editor workflow for Composer 2.5, Cloud Agents, CLI/SDK automation, Design Mode, Bugbot, and usage-managed agent workflows.

**Best GitHub-native value: GitHub Copilot.** Choose it when governance, IDE coverage, and GitHub integration matter more than a specialized agent/IDE experience.

**Best terminal agent: Claude Code.** Choose it when a senior developer wants to delegate real repo work from the command line, especially after Opus 4.8 and dynamic workflows widened its lane for codebase-scale work.

**Best browser app-builder for non-developers: Replit Agent.** Choose it when the buyer values prompt-to-preview speed, browser-native building, and integrated database/auth/publishing more than local repo ownership. Use the Claude vs Replit Agent comparison when the decision is Claude-style repo reasoning versus Replit-style app creation, and DeepSeek vs Replit Agent when the decision is app-builder workflow versus low-cost model backend.

**Best Copilot alternative guide:** [GitHub Copilot alternatives](/guides/github-copilot-alternatives/) was refreshed June 15, 2026 around Cursor, Claude Code, Codex, Windsurf/Devin Desktop, Gemini Code Assist, Copilot AI Credits, Fable 5 route risk, one-million-token context, signup/upgrade eligibility, and Copilot agent workflow controls so teams can compare AI-native IDEs, terminal agents, OpenAI-native agents, Google-native workflows, and Copilot's usage-based billing risk before switching.

**Best Cursor alternative guide:** [Cursor alternatives](/guides/cursor-alternatives/) was refreshed June 15, 2026 around Cursor's current pricing surface, on-demand usage caveat, Bugbot, SDK/CLI automation, Data Use posture, GitHub Copilot AI Credits, Claude Code Pro/Max usage, Windsurf/Devin Desktop, Aider, Replit Agent, Devin, Codex, and Cursor cost/review discipline.

**Best full buyer guide:** [Best AI coding assistant](/guides/best-ai-coding-assistant/) is now the June 6 verified category money page for Cursor pricing, Claude Code and Agent SDK billing caveats, GitHub Copilot AI Credits, Codex agent workflows, Windsurf/Devin Desktop lineage, and Devin delegation risk.

**Best developer buyer guide:** [Best AI tools for developers](/guides/best-ai-tools-for-developers/) is the June 15 verified developer workflow guide for Cursor, GitHub Copilot, Claude Code, Codex, Replit Agent, and Aider, with Cursor agent economics, on-demand usage, AI Credits, interactive Claude Code limits, paused Agent SDK credit changes, Codex token credits, and API-cost control separated from generic IDE hype.

**Best debugging guide:** [Best AI for debugging](/guides/best-ai-for-debugging/) is the June 6 verified debugging money page for reproducible bug loops, Cursor IDE fixes, GitHub Copilot inside existing IDEs, Claude Code terminal investigation, Codex checkpoints, Aider BYOK control, and now-live Copilot AI Credits plus Actions-minutes review billing.

**Best code review guide:** [Best AI for code review](/guides/best-ai-for-code-review/) is the June 15 verified review-buyer guide for CodeRabbit, Qodo, GitHub Copilot, Cursor Bugbot, Claude Code, and Codex, with CodeRabbit's refillable review allowances, Qodo Review v2 and Teams seat/linking caveats, Copilot's now-live AI Credits plus Actions-minutes review billing, and agent-review boundaries called out before teams enable broad private-repo review.

**Best unit-test guide:** [Best AI for unit tests](/guides/best-ai-for-unit-tests/) is the June 6 verified testing workflow guide for Cursor, GitHub Copilot, Claude, Claude Code, Codex, and Aider, with current Cursor usage billing, Copilot AI Credits, Claude Code cost controls, and assertion-quality guardrails separated from generic coverage chasing.

## Money Pages To Build Next

- [Cursor vs GitHub Copilot](/compare/cursor-vs-github-copilot/) should be kept current around Cursor's AI-native IDE fit versus Copilot's GitHub-native governance.
- [Best AI stack for solo founders](/guides/ai-solo-founder-stack/) is now the June 6 verified founder build path: Cursor for technical founders, Lovable/Bolt for non-technical MVPs, ChatGPT as the low-friction generalist, and explicit budgeting for GitHub Copilot AI Credits plus the now-paused Claude Agent SDK credit split.
- [Daily agentic coding workflow](/workflows/agentic-coding-workflow/) now separates Cursor, Claude Code, GitHub Copilot, and Codex by job while warning teams to model Claude usage and Copilot AI Credits before broad rollout.
- [Micro-SaaS weekend MVP workflow](/workflows/micro-saas-weekend-build/) now shows how to use Cursor with Supabase, Vercel, Vercel Functions, Stripe, and Lemon Squeezy without pretending a weekend prototype is a production SaaS.
- [Best AI tools for developers](/guides/best-ai-tools-for-developers/) is the June 6 verified AI developer buyer guide for AI-native IDE, GitHub-native assistant, terminal-agent, OpenAI-native agent, browser app-builder, and open-source CLI decisions.
- [Best AI Tools for Freelancers](/guides/best-ai-tools-for-freelancers/) is the June 6 verified freelance stack guide for ChatGPT, Perplexity, Cursor, Claude, and Midjourney, with billable-margin, client-data, source-discipline, and AI-agent usage cautions.
- [Best AI for debugging](/guides/best-ai-for-debugging/) is now synchronized with Cursor model-usage billing, GitHub Copilot's active AI Credits model, Claude Code interactive limits and paused Agent SDK credit changes, Codex plan/API costs, and test-driven bug-fix workflow guidance.
- [Best AI for code review](/guides/best-ai-for-code-review/) is the June 15 verified adjacent guide for dedicated PR review, CodeRabbit refillable review allowances and credits, enterprise code-quality governance, GitHub-native review billing, Cursor Bugbot usage-based review, Claude Code checkpoints, and Codex patch review.
- [Best AI for unit tests](/guides/best-ai-for-unit-tests/) is the June 6 verified test-generation guide for IDE loops, GitHub-native assistants, Claude-backed edge-case planning, terminal agents, local test commands, and AI-credit-aware usage controls.
- [Best AI for API documentation](/guides/best-ai-for-api-documentation/) is the June 6 verified docs/agent buyer guide: Mintlify for hosted docs, Stainless for SDK/docs/MCP generation, Speakeasy for SDK/Terraform/MCP automation, ReadMe for developer portals, and Cursor/ChatGPT/Claude/Gemini only as support tools.
- [Best open source AI tools](/guides/best-open-source-ai-tools/) was refreshed June 12, 2026 around Ollama, LM Studio, Open WebUI, Llama, Mistral, DeepSeek, FLUX, Whisper, and Hugging Face so developer buyers can compare local/self-hosted control, model licensing, hardware fit, and hosted-agent costs before committing.
- [DeepSeek alternatives](/guides/deepseek-alternatives/) is the June 7 verified switching guide for ChatGPT, Claude, Cursor, Gemini, Mistral, Perplexity, Grok, and the open-source AI guide because DeepSeek switching intent often overlaps with coding, model cost, V4-Flash/V4-Pro API pricing, trust review, and local/open-model control.
- [Best AI for SQL queries](/guides/best-ai-for-sql-queries/) is the June 6 verified SQL workflow guide for ChatGPT, Cursor, Claude, Hex, and Julius, with the buyer split tightened around learning/drafting, codebase-aware database work, schema reasoning, governed Hex notebooks/Threads/Semantic Models, Julius credits/connectors, and mandatory query verification before shipping business decisions.
- [Best AI Tools Under $20/month](/guides/best-ai-tools-under-20-month/) is the June 6 verified first-paid-plan guide that keeps GitHub Copilot Pro as the cheaper coding-specialist pick while warning that AI Credits, Actions-minutes review billing, Cursor heavy-agent use, and multi-tool subscription stacking can erase the apparent budget advantage.
- [GitHub Copilot alternatives](/guides/github-copilot-alternatives/) is the June 15 verified switching guide for Cursor, Claude Code, Codex, Windsurf/Devin Desktop, Gemini Code Assist, Copilot AI Credits, Fable 5 suspension, one-million-token context, signup/upgrade eligibility, and GitHub-native agent workflow controls.
- [Cursor alternatives](/guides/cursor-alternatives/) should stay synchronized with Cursor pricing, Copilot AI Credits, Claude Code Pro/Max usage and Agent SDK billing caveats, Windsurf/Devin Desktop packaging, Devin pricing, Replit Agent credits, Codex token costs, and Aider BYOK setup because coding-agent cost and packaging can move faster than generic IDE rankings.
- A new `Claude Code vs Codex` comparison would capture terminal-agent and OpenAI/Anthropic agent-intent searches.
- [Cursor vs Windsurf](/compare/cursor-vs-windsurf/) should stay monitored because Windsurf now routes through Devin Desktop, not a clean standalone pricing page.
- A new `best AI coding agent` guide should separate terminal agents, PR agents, browser builders, and autonomous software-engineering products.

## What Hurts Trust

Do not rank coding tools by monthly price alone. Copilot AI Credits, Cursor and Windsurf usage systems, Claude Code subscription/API paths, and agent task duration can change real cost quickly.

Do not call every coding model an IDE. Cursor, Copilot, Claude Code, Codex, Gemini, Replit Agent, Lovable, Bolt, and v0 answer different workflow questions.

Do not classify Uizard as a coding agent. Its June 10 export check still limits React/CSS handoff to individual components and says full-project HTML/JavaScript export is not available.

Do not carry forward retired Rork plan names. Current coding-app-builder copy should separate Free, Rork Pro, and Rork Max by platform output and credit budget.

Do not publish stale model-version claims. Coding tools route models and change access frequently; cite current vendor pages and avoid fake precision.

## Sources

- [GitHub Copilot plans](https://github.com/features/copilot/plans) (verified 2026-06-15)
- [GitHub Copilot billing docs](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals) (verified 2026-06-15)
- [GitHub Copilot organization billing docs](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises) (verified 2026-06-15)
- [GitHub Copilot billing and plans changelog](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans) (verified 2026-06-15)
- [GitHub Copilot SDK GA](https://github.blog/changelog/2026-06-02-copilot-sdk-is-now-generally-available/) (verified 2026-06-15)
- [GitHub Copilot larger context and reasoning](https://github.blog/changelog/2026-06-04-larger-context-windows-and-configurable-reasoning-levels-for-github-copilot/) (verified 2026-06-15)
- [GitHub Copilot Agent tasks REST API](https://github.blog/changelog/2026-06-04-agent-tasks-rest-api-now-available-for-copilot-pro-pro-and-max/) (verified 2026-06-15)
- [GitHub Copilot Claude Fable 5 suspension note](https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/) (verified 2026-06-15)
- [GitHub Copilot code review controls](https://github.blog/changelog/2026-06-12-copilot-code-review-new-configurations-and-controls/) (verified 2026-06-15)
- [OpenAI to acquire Ona](https://openai.com/index/openai-to-acquire-ona/) (verified 2026-06-15)
- [Ona is joining OpenAI](https://ona.com/stories/ona-joins-openai) (verified 2026-06-15)
- [AiPedia Disney AI coding token-budget update](/news/2026-06-15-disney-ai-coding-tokenmaxxing/) (verified 2026-06-15)
- [Business Insider Disney AI tokenmaxxing report](https://www.businessinsider.com/disney-ai-push-increase-velocity-tech-employees-tokenmaxxing-josh-damaro-2026-6) (verified 2026-06-15)
- [Times of India Disney AI coding report](https://timesofindia.indiatimes.com/technology/tech-news/almost-a-year-after-giving-engineers-access-to-claude-and-cursor-disney-tells-engineers-minimise-ai-coded-products-that-/articleshow/131728705.cms) (verified 2026-06-15)
- [xAI Grok Build docs](https://docs.x.ai/build/overview) (verified 2026-06-20)
- [xAI Grok Build enterprise docs](https://docs.x.ai/build/enterprise) (verified 2026-06-20)
- [xAI model docs](https://docs.x.ai/developers/models) (verified 2026-06-20)
- [xAI pricing](https://x.ai/pricing) (verified 2026-06-20)
- [Cursor pricing](https://cursor.com/pricing) (verified 2026-06-20)
- [Cursor Teams pricing update](https://cursor.com/blog/teams-pricing-june-2026) (verified 2026-06-20)
- [Cursor Data Use and Privacy Overview](https://cursor.com/data-use) (verified 2026-06-20)
- [Cursor Enterprise](https://cursor.com/enterprise) (verified 2026-06-20)
- [Cursor CLI](https://cursor.com/cli) (verified 2026-06-20)
- [Cursor Composer 2.5 changelog](https://cursor.com/changelog/composer-2-5) (verified 2026-06-20)
- [Cursor Gartner enterprise-coding-agent recognition](https://cursor.com/blog/cursor-leads-gartner-mq-2026) (verified 2026-05-26)
- [Cursor changelog](https://cursor.com/changelog) (verified 2026-06-20)
- [DeepSeek API pricing docs](https://api-docs.deepseek.com/quick_start/pricing) (verified 2026-06-20)
- [DeepSeek V4 release note](https://api-docs.deepseek.com/news/news260424) (verified 2026-06-20)
- [DeepSeek Hugging Face organization](https://huggingface.co/deepseek-ai) (verified 2026-06-20)
- [Claude Code docs](https://code.claude.com/docs) (verified 2026-06-15)
- [Claude Code cost management](https://code.claude.com/docs/en/costs) (verified 2026-06-15)
- [Claude Agent SDK credit help](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan) (verified 2026-06-20)
- [AiPedia late June 13 AI news update](/news/2026-06-13-us-blocks-anthropic-fable-mythos-openai-probe/) (verified 2026-06-13)
- [AiPedia June 14 AI news desk](/news/2026-06-14-ai-news-desk/) (verified 2026-06-14)
- [Anthropic Fable/Mythos access statement](https://www.anthropic.com/news/fable-mythos-access) (verified 2026-06-15)
- [Claude Opus 4.8 and dynamic workflows](https://www.anthropic.com/news/claude-opus-4-8) (verified 2026-06-15)
- [Claude dynamic workflows in Claude Code](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code) (verified 2026-06-14)
- [Claude Max plan](https://support.claude.com/en/articles/11049741-what-is-the-max-plan) (verified 2026-06-14)
- [Windsurf pricing redirect to Devin pricing](https://windsurf.com/pricing) (verified 2026-06-18)
- [Devin pricing](https://devin.ai/pricing/) (verified 2026-06-18)
- [Devin Desktop FAQ](https://docs.devin.ai/desktop/devin-desktop-faq) (verified 2026-06-18)
- [Devin Desktop quota docs](https://docs.devin.ai/desktop/accounts/quota) (verified 2026-06-18)
- [Devin Desktop model docs](https://docs.devin.ai/desktop/models) (verified 2026-06-18)
- [Devin Desktop changelog](https://docs.devin.ai/desktop/changelog) (verified 2026-06-18)
- [Aider docs](https://aider.chat/docs/) (verified 2026-06-14)
- [Aider GitHub repository](https://github.com/Aider-AI/aider) (verified 2026-06-14)
- [Amazon Q Developer pricing](https://aws.amazon.com/q/developer/pricing/) (verified 2026-06-18)
- [Amazon Q Developer end-of-support announcement](https://aws.amazon.com/blogs/devops/amazon-q-developer-end-of-support-announcement/) (verified 2026-06-18)
- [Amazon Q Developer quotas](https://docs.aws.amazon.com/general/latest/gr/amazonqdev.html) (verified 2026-06-18)
- [Augment Code pricing](https://www.augmentcode.com/pricing) (verified 2026-06-15)
- [Augment token-based pricing](https://docs.augmentcode.com/models/token-based-pricing) (verified 2026-06-15)
- [Augment feature availability](https://docs.augmentcode.com/feature-availability) (verified 2026-06-15)
- [Cline homepage](https://cline.bot/) (verified 2026-06-15)
- [Cline pricing](https://cline.bot/pricing) (verified 2026-06-15)
- [Cline docs overview](https://docs.cline.bot/cline-overview) (verified 2026-06-15)
- [Cline CLI](https://cline.bot/cli) (verified 2026-06-15)
- [Cline SDK](https://cline.bot/sdk) (verified 2026-06-15)
- [Cline Spec Driven](https://cline.bot/spec-driven) (verified 2026-06-15)
- [Cline provider configuration docs](https://docs.cline.bot/provider-config/other-30-plus-providers) (verified 2026-06-15)
- [Cline SDK permission handling](https://docs.cline.bot/sdk/guides/permission-handling) (verified 2026-06-15)
- [CodeRabbit pricing](https://www.coderabbit.ai/pricing) (verified 2026-06-15)
- [CodeRabbit plans documentation](https://docs.coderabbit.ai/management/plans) (verified 2026-06-15)
- [CodeRabbit usage-based add-on docs](https://docs.coderabbit.ai/management/usage-based-addon) (verified 2026-06-15)
- [CodeRabbit changelog](https://docs.coderabbit.ai/changelog) (verified 2026-06-15)
- [Continue pricing](https://www.continue.dev/pricing) (verified 2026-06-12)
- [Continue docs](https://docs.continue.dev/) (verified 2026-06-12)
- [Continue GitHub repository](https://github.com/continuedev/continue) (verified 2026-06-12)
- [Cognition Windsurf acquisition announcement](https://cognition.ai/blog/windsurf) (verified 2026-06-12)
- [Factory pricing](https://docs.factory.ai/pricing) (verified 2026-06-14)
- [JetBrains AI pricing](https://www.jetbrains.com/help/ai-assistant/licensing-and-subscriptions.html) (verified 2026-06-12)
- [Kiro pricing](https://kiro.dev/pricing) (verified 2026-06-12)
- [Mastra pricing](https://mastra.ai/pricing) (verified 2026-06-15)
- [Mastra model router docs](https://mastra.ai/models) (verified 2026-06-15)
- [Mastra blog](https://mastra.ai/blog) (verified 2026-06-15)
- [OpenHands pricing](https://openhands.dev/pricing) (verified 2026-06-12)
- [Pieces pricing](https://pieces.app/pricing) (verified 2026-06-12)
- [Qodo pricing](https://www.qodo.ai/pricing/) (verified 2026-06-15)
- [Qodo subscription plans](https://docs.qodo.ai/subscription-plans) (verified 2026-06-15)
- [Qodo Review v2 docs](https://docs.qodo.ai/qodo-documentation/code-review) (verified 2026-06-15)
- [BLACKBOX AI pricing](https://www.blackbox.ai/pricing) (verified 2026-06-15)
- [BLACKBOX AI security](https://www.blackbox.ai/security) (verified 2026-06-15)
- [Cuelinks BLACKBOX AI affiliate listing](https://www.cuelinks.com/campaigns/blackbox-ai-affiliate-program) (verified 2026-06-15)
- [Replit pricing](https://replit.com/pricing) (verified 2026-06-15)
- [Replit Agent docs](https://docs.replit.com/references/agent/overview) (verified 2026-06-15)
- [Replit Agent Modes](https://docs.replit.com/references/agent/agent-modes) (verified 2026-06-15)
- [Replit AI billing](https://docs.replit.com/billing/ai-billing) (verified 2026-06-15)
- [Replit Custom Skills](https://replit.com/blog/custom-skills) (verified 2026-06-15)
- [Replit Package Firewall](https://replit.com/blog/package-firewall) (verified 2026-06-15)
- [Same pricing docs](https://docs.same.new/usage/pricing) (verified 2026-06-12)
- [Base44 pricing](https://base44.com/pricing) (verified 2026-06-15)
- [Base44 billing and plans](https://docs.base44.com/Account-and-billing/Billing-and-plans) (verified 2026-06-15)
- [Bolt.new pricing](https://bolt.new/pricing) (verified 2026-06-12)
- [Browserbase pricing](https://www.browserbase.com/pricing) (verified 2026-06-18)
- [Modal pricing](https://modal.com/pricing) (verified 2026-06-12)
- [OpenAI Whisper GitHub](https://github.com/openai/whisper) (verified 2026-06-12)
- [OpenAI speech-to-text docs](https://developers.openai.com/api/docs/guides/speech-to-text) (verified 2026-06-12)
- [OpenAI API pricing](https://developers.openai.com/api/docs/pricing) (verified 2026-06-12)
- [OpenAI public API pricing](https://openai.com/api/pricing/) (verified 2026-06-12)
- [Supermaven pricing](https://supermaven.com/pricing) (verified 2026-06-12)
- [Tabnine pricing](https://www.tabnine.com/pricing) (verified 2026-06-12)
- [Sourcegraph pricing](https://sourcegraph.com/pricing) (verified 2026-06-15)
- [Sourcegraph Cody docs](https://sourcegraph.com/docs/cody) (verified 2026-06-15)
- [Sourcegraph Cody plan changes](https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans) (verified 2026-06-15)
- [Sourcegraph Model Provider docs](https://sourcegraph.com/docs/model-provider) (verified 2026-06-15)
- [Sourcegraph AI Terms](https://sourcegraph.com/terms/ai-terms) (verified 2026-06-15)
- [Cody VS Code Marketplace listing](https://marketplace.visualstudio.com/items?itemName=sourcegraph.cody-ai) (verified 2026-06-15)
- [Val Town pricing](https://www.val.town/pricing) (verified 2026-06-14)
- [Vercel Functions docs](https://vercel.com/docs/functions) (verified 2026-06-14)
- [Vercel Functions runtimes](https://vercel.com/docs/functions/runtimes) (verified 2026-06-14)
- [Vercel pricing](https://vercel.com/pricing) (verified 2026-06-14)
- [Zed pricing](https://zed.dev/pricing) (verified 2026-06-12)
- [Trae plans and billing](https://docs.trae.ai/ide/new-plans-and-billing) (verified 2026-06-12)
- [Gemini Code Assist](https://cloud.google.com/products/gemini/code-assist) (verified 2026-06-15)
- [Google AI subscriptions](https://gemini.google/subscriptions/) (verified 2026-06-15)
- [Gemini API model docs](https://ai.google.dev/gemini-api/docs/models) (verified 2026-06-15)
- [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) (verified 2026-06-15)
- [Hex pricing](https://hex.tech/pricing/) (verified 2026-06-12)
- [Hex AI docs](https://learn.hex.tech/docs/getting-started/ai-overview) (verified 2026-06-12)
- [Hex agent credits usage blog](https://hex.tech/blog/agent-credits-usage/) (verified 2026-06-12)
- [Julius AI pricing](https://julius.ai/pricing) (verified 2026-06-12)
- [Julius credit billing update](https://julius.ai/content/billing-update-messages-to-usage-credits) (verified 2026-06-12)
- [Julius data connector overview](https://julius.ai/docs/data-connectors/overview) (verified 2026-06-12)
- [Goose GitHub repository](https://github.com/aaif-goose/goose) (verified 2026-06-12)
- [Goose documentation](https://block.github.io/goose/) (verified 2026-06-12)
- [Z.AI GLM-5.1 docs](https://docs.z.ai/guides/llm/glm-5.1) (verified 2026-06-12)
- [Z.AI pricing](https://docs.z.ai/guides/overview/pricing) (verified 2026-06-12)
- [GLM-5.1 on Hugging Face](https://huggingface.co/zai-org/GLM-5.1) (verified 2026-06-12)
- [MiniMax M3 model page](https://www.minimax.io/models/text/m3) (verified 2026-06-12)
- [MiniMax pay-as-you-go pricing](https://platform.minimax.io/docs/guides/pricing-paygo) (verified 2026-06-12)
- [Qwen Cloud model releases](https://docs.qwencloud.com/changelog/models) (verified 2026-06-15)
- [Qwen3.7-Max model page](https://www.qwencloud.com/models/qwen3.7-max) (verified 2026-06-15)
- [01.AI Yi models](https://www.01.ai/yi-models) (verified 2026-06-12)
- [Yi GitHub repository](https://github.com/01-ai/Yi) (verified 2026-06-12)
- [Llama official site](https://ai.meta.com/llama/) (verified 2026-06-12)
- [Llama 4 Community License](https://www.llama.com/llama4/license/) (verified 2026-06-12)
- [Together AI pricing](https://www.together.ai/pricing) (verified 2026-06-12)
- [Groq Llama 4 Scout model card](https://console.groq.com/docs/model/llama-4-scout-17b-16e-instruct) (verified 2026-06-12)
- [Glean developer platform](https://developers.glean.com/) (verified 2026-06-12)
- [v0 pricing](https://v0.app/pricing) (verified 2026-06-12)
- [v0 documentation](https://v0.app/docs) (verified 2026-06-12)
- [Uizard exporting projects and Handoff Mode](https://support.uizard.io/en/articles/6380330-exporting-projects) (verified 2026-06-12)
- [Rork subscription docs](https://docs.rork.com/introduction/subscriptions) (verified 2026-06-12)
- [Rork technical FAQ](https://docs.rork.com/faq/technical) (verified 2026-06-12)
