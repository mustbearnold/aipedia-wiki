---
type: tool
slug: claude-code
title: Claude Code
tagline: Anthropic's agentic coding product for terminal, IDE, desktop, browser, and remote codebase work. Included with paid Claude plans; Max tiers scale sustained usage.
category: ai-coding
company: anthropic
url: https://code.claude.com
pricing_model: paid
price_range: "$20-$200/month"
status: active
launched: 2025-02
last_updated: 2026-06-24
last_verified: 2026-06-24
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 10
  value: 8
  moat: 9
  longevity: 9
facts:
  best_for:
    value: "Developers who want Anthropic's coding agent across terminal, IDE, desktop, browser, and remote codebase workflows with permissioned edits, shell commands, and repository-aware context."
    source: "https://code.claude.com/docs/en/overview"
    source_label: "Claude Code docs"
    source_id: claude-code-official
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Claude Code access is tied to Claude subscriptions and usage limits; Pro and Max tiers should be checked against expected coding-agent hours."
    source: "https://claude.com/pricing"
    source_label: "Anthropic pricing"
    source_id: claude-pricing
    verified_at: 2026-06-24
    volatility: high
    confidence: high
    next_review_at: 2026-06-30
  coding_agent:
    value: "Claude Code is an agentic coding surface: it can inspect files, propose and apply edits, run commands, and work across larger codebase tasks with user approval."
    source: "https://code.claude.com/docs/en/overview"
    source_label: "Claude Code docs"
    source_id: claude-code-official
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  flagship_model:
    value: "Claude Code follows account-specific Anthropic model availability. Opus 4.8 remains the stable available high-end route; Anthropic's June 12 statement says Fable 5 and Mythos 5 access was suspended, while June 24 named reporting says Fable access has partly returned with nationality-based controls. Claude Code's /model command is the source of truth for what a given account can select."
    source: "https://www.anthropic.com/news/fable-mythos-access"
    source_label: "Anthropic Fable/Mythos access statement"
    source_id: anthropic-fable-mythos-access
    verified_at: 2026-06-24
    next_review_at: 2026-06-30
    volatility: high
    confidence: high
  agent_manifest:
    value: "The published llms.txt is useful for agent-readable documentation of Claude Code commands, capabilities, and integration surface."
    source: "https://code.claude.com/llms.txt"
    source_label: "Claude Code llms.txt"
    source_id: claude-code-llms
    verified_at: 2026-06-24
    volatility: medium
    confidence: high
  watch_out_for:
    value: "The power comes with real side effects. Teams should enforce repository permissions, review diffs, protect secrets, avoid unattended destructive commands, confirm model fallback behavior with /model after the Fable/Mythos suspension, and separate interactive Claude Code subscription limits from the active Agent SDK credit pool for Agent SDK, claude -p, GitHub Actions, and third-party Agent SDK app usage."
    source: "https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan"
    source_label: "Claude Agent SDK credit help"
    source_id: claude-agent-sdk-credit
    verified_at: 2026-06-24
    volatility: high
    confidence: high
    next_review_at: 2026-06-30
tags: [cli, ide, agentic-coding, terminal, codebase-wide, autonomous, anthropic, claude-opus, ultraplan, monitor, mcp, skills]
seo_title: "Claude Code: Features, Pricing & Review (June 2026)"
meta_description: "Updated June 24, 2026: Claude Code is Anthropic's coding agent for terminal, IDE, desktop, browser, remote repo, GitHub Actions, and SDK work. Opus 4.8 remains the stable route while Agent SDK credits are active for eligible paid users."
author: "aipedia.wiki Editorial"
best_for:
  - professional backend developers
  - teams needing autonomous multi-file refactoring
  - Claude-first workflows with MCP tool integration
  - long-running agentic sessions with checkpointing
not_best_for:
  - users who only want passive autocomplete
  - free-tier developers
  - beginners uncomfortable supervising agentic code changes
quick_answer: >-
  Claude Code is Anthropic's agentic coding product for repo-wide work across terminal, IDE, desktop, browser, remote, GitHub Actions, and SDK flows. Pick Max 5x at $100/mo for sustained interactive coding; Pro at $20/mo covers lighter use. Fable 5 and Mythos 5 remain account-specific after the June 12 suspension, so treat Opus 4.8 as the stable high-end route and check /model for account-specific availability. As of June 24, 2026, Anthropic's Agent SDK help says eligible paid users can claim a separate monthly credit pool for Agent SDK, `claude -p`, Claude Code GitHub Actions, and third-party Agent SDK app usage. Normal interactive Claude Code still uses subscription limits.
price_history:
  - date: 2026-06-24
    plan: "Agent SDK / claude -p monthly credits active"
    price: "Eligible paid users can claim separate monthly Agent SDK credits: Pro $20, Max 5x $100, Max 20x $200, Team Standard $20, Team Premium $100, and seat-based Enterprise Premium $200"
    source: "https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan"
    source_label: "Claude Agent SDK credit help"
    source_id: claude-agent-sdk-credit
    verified_at: 2026-06-24
    note: "Anthropic's current help page says Agent SDK, claude -p, Claude Code GitHub Actions, and third-party Agent SDK app usage no longer count toward Claude plan limits after the user claims the monthly credit. Normal interactive Claude Code still uses subscription limits; credits are per-user, refresh monthly, and do not roll over."
  - date: 2026-06-14
    plan: "Claude Code route-risk and setup recheck"
    price: "No price change; Opus 4.8 remains the stable high-end route"
    source: "/news/2026-06-14-ai-news-desk/"
    source_label: "AiPedia June 14 AI news desk"
    source_id: aipedia-june-14-ai-news-desk
    verified_at: 2026-06-14
    note: "Rechecked Claude Code against current Claude Code docs, Agent SDK credit help, usage-limit docs, Anthropic Fable/Mythos access statement, and June 14 route-risk coverage. The later June 24 check says the separate Agent SDK credit pool is active; buyer guidance should separate interactive Claude Code subscription limits from non-interactive Agent SDK, claude -p, GitHub Actions, and third-party Agent SDK usage."
  - date: 2026-06-13
    plan: "Fable 5 / Mythos 5 access suspension"
    price: "No Claude Code price change; confirm model route before using Fable-specific pilot results"
    source: "/news/2026-06-13-us-blocks-anthropic-fable-mythos-openai-probe/"
    source_label: "AiPedia late June 13 news update"
    source_id: aipedia-fable-mythos-access-update
    verified_at: 2026-06-13
    note: "Anthropic says Fable 5 and Mythos 5 access is suspended for all customers after a US government directive. Claude Code buyers should use Opus 4.8 or their existing route until access is restored."
  - date: 2026-06-04
    plan: "June surface recheck"
    price: "Claude Code remains tied to Claude subscriptions/API usage; no separate self-serve Claude Code price found"
    source: "https://code.claude.com/docs/en/overview"
    source_label: "Claude Code docs"
    source_id: claude-code-official
    verified_at: 2026-06-04
    note: "Official docs now frame Claude Code across terminal, IDE, desktop, browser, remote, GitHub Actions, and SDK workflows. Buying guidance should not call it terminal-only."
  - date: 2026-05-28
    plan: "Opus 4.8 and dynamic workflows"
    price: "Included with eligible Claude Code access; API Opus 4.8 is $5/$25 standard or $10/$50 fast mode per MTok"
    source: "https://www.anthropic.com/news/claude-opus-4-8"
    source_label: "Anthropic Claude Opus 4.8 release"
    source_id: anthropic-opus-48
    verified_at: 2026-05-28
    note: "Opus 4.8 became the current Claude flagship and Claude Code dynamic workflows entered research preview for Max, Team, Enterprise, API, Bedrock, Vertex AI, and Microsoft Foundry paths."
  - date: 2026-05-14
    plan: "Agent SDK / claude -p credit split announced"
    price: "Separate monthly credits now active for eligible paid users under current help guidance"
    source: "https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan"
    source_label: "Claude Agent SDK credit help"
    source_id: claude-agent-sdk-credit
    verified_at: 2026-06-24
    note: "Anthropic's current Agent SDK help now lists the separate paid-plan credit pool as active, but it does not cover normal interactive Claude Code sessions."
  - date: 2026-05-14
    plan: "Microsoft internal tooling report"
    price: "No public Claude Code price change"
    source: "/news/2026-05-14-microsoft-claude-code-github-copilot-cli-shift/"
    source_label: "AIpedia coverage"
    source_id: aipedia-news
    verified_at: 2026-05-14
    note: "The Verge reported Microsoft is winding down most internal Claude Code licenses in Experiences and Devices by the end of June and steering engineers toward GitHub Copilot CLI; this does not change public Claude Code availability."
  - date: 2026-05-13
    plan: "Plan pricing reverified"
    price: "Pro $20/mo · Max 5x $100/mo · Max 20x $200/mo (unchanged)"
    source: "https://claude.com/pricing"
    source_label: "Claude pricing"
    source_id: claude-pricing
    verified_at: 2026-05-13
    note: "Reverified on 2026-05-13; tiers and Claude Code inclusion are unchanged. Pro shown at $17/mo with annual billing, Team Premium at $100/seat/mo annual."
  - date: 2026-05-10
    plan: "Claude Code limits"
    price: "Included with paid Claude plans; limits vary"
    source: "https://www.anthropic.com/news/higher-limits-spacex"
    source_label: "Anthropic usage-limit update"
    source_id: anthropic-higher-limits-spacex
    verified_at: 2026-05-10
    note: "Anthropic said Claude Code five-hour rate limits doubled for Pro, Max, Team, and seat-based Enterprise plans on May 6, 2026."
  - date: 2026-05-10
    plan: "Pro"
    price: "$20/mo"
    source: "https://claude.com/pricing"
    source_label: "Claude pricing"
    source_id: claude-pricing
    verified_at: 2026-05-10
    note: "Claude pricing says Pro is $20 monthly or $17/month with annual billing, and includes Claude Code."
  - date: 2026-05-10
    plan: "Max 5x / Max 20x"
    price: "$100/mo / $200/mo"
    source: "https://support.claude.com/en/articles/11049741-what-is-the-max-plan"
    source_label: "Claude Max plan help"
    source_id: claude-max-plan
    verified_at: 2026-05-10
    note: "Max plan help lists Max 5x at $100/month and Max 20x at $200/month for web subscriptions."
  - date: 2026-04-16
    plan: "Default model"
    price: "Claude Opus 4.7"
    source: "https://claude.com/pricing"
    source_label: "Claude pricing"
    source_id: claude-pricing
    verified_at: 2026-04-16
    note: "Opus 4.7 released April 16, 2026; new tokenizer produces 1.0-1.35x more tokens vs 4.6."
  - date: 2026-04-15
    plan: "Pro"
    price: "$20/mo"
    source: "https://claude.com/pricing"
    source_label: "Claude pricing"
    source_id: claude-pricing
    verified_at: 2026-04-15
    note: "Claude Code available on Pro tier as of 2026; previously Max-only."
  - date: 2026-04-17
    plan: "Claude Design handoff"
    price: "Bundled"
    source: "https://claude.com/pricing"
    source_label: "Claude pricing"
    source_id: claude-pricing
    verified_at: 2026-04-17
    note: "Claude Code now receives production-build bundles from Claude Design (new Pro+ product). Closed loop: prompt -> design -> Claude Code -> working app."
---

# Claude Code

Claude Code is Anthropic's agentic coding product for repository-aware work across terminal, IDE, desktop, browser, remote, GitHub Actions, and SDK workflows. It reads files across a codebase, writes code, executes tests, runs commands, and self-corrects through errors with user approval and review.

Claude Opus 4.8 (released May 28, 2026) is the stable available high-end Anthropic model to evaluate for hard Claude Code work. Anthropic launched Fable 5 above Opus on June 9, then said Fable 5 and Mythos 5 access was suspended as of June 12 after a US government directive. Business Insider reported on June 24 that Fable 5 access has partly returned with nationality-based controls and compliance screening, so do not base production defaults on Fable- or Mythos-specific pilot results until your account confirms the route. Access is included with Claude Pro at $20/mo and scales through Max 5x at $100/mo and Max 20x at $200/mo. Team Premium and Enterprise add managed seats, admin controls, and spend controls, while API-key use remains pay-per-token. Anthropic's May 6 compute update doubled Claude Code five-hour limits for Pro, Max, Team, and seat-based Enterprise plans. The free Claude plan still does not include Claude Code.

## Recent developments (April-June 2026)

- **June 15:** [Disney's AI coding push turned token budgets and release quality into buyer checks](/news/2026-06-15-disney-ai-coding-tokenmaxxing/). The buyer lesson for Claude Code teams is to treat AI usage dashboards as cost and efficiency controls, not productivity scoreboards, and to require tests, review ownership, permission boundaries, and rollback plans before agent-written code reaches production.
- **June 24:** Anthropic's Agent SDK help now says eligible paid users can claim separate monthly credits for Agent SDK, `claude -p`, Claude Code GitHub Actions, and third-party Agent SDK app usage. Normal interactive Claude Code still uses subscription limits, credits do not roll over, and production automation at scale should still use Claude Platform API keys.
- **June 24:** Business Insider reported that Anthropic partly restored Claude Fable 5 access with nationality-based access controls and compliance screening after the June 12 suspension. Claude Code buyers should still treat /model as the account-level source of truth and keep Opus 4.8 as the stable high-end route.
- **June 14:** [The June 14 AI news desk](/news/2026-06-14-ai-news-desk/) turns Claude Code route risk into a buyer checklist. Treat Opus 4.8 as the stable high-end route, keep Fable/Mythos pilot notes out of production-default evidence unless your account confirms access, and document fallback routes, staff/client access exposure, retention rules, and review controls before standardizing Claude Code for large teams.
- **June 14:** Current Claude Code docs now show Windows PowerShell/CMD and WinGet install paths alongside macOS, Linux, WSL, VS Code, JetBrains, desktop, web, and remote surfaces. That removes the old WSL-only caveat, but Windows teams should still verify shell behavior, Git for Windows/Bash availability, local permissions, and MCP/tool execution in their own dev images.
- **June 13:** [Claude Fable 5 and Mythos 5 access was suspended](/news/2026-06-13-us-blocks-anthropic-fable-mythos-openai-probe/). For Claude Code buyers, this turns model fallback and availability into a real procurement question, not just a benchmark footnote. Use the [AI Model Availability & Churn Tracker](/trends/model-availability-churn/) before basing a rollout on a specific Claude route.
- **June 4:** Claude Code was rechecked for the comparison slice against Continue, Devin, GitHub Copilot, and Val Town. The important buyer correction: do not describe Claude Code as terminal-only. Official docs now cover terminal, IDE, desktop, browser, remote, GitHub Actions, and SDK workflows.
- **May 28:** [Claude Opus 4.8 launched with dynamic workflows, effort controls, Messages API instruction updates, and cheaper fast mode](/news/2026-05-28-claude-opus-48-dynamic-workflows/). Dynamic workflows are the important Claude Code change: Claude can plan a large task, run tens or hundreds of parallel subagents, verify results, and report one coordinated answer.
- **May 28:** [Anthropic raised $65B at a $965B post-money valuation](/news/2026-05-28-anthropic-series-h-65b-965b-valuation/). For Claude Code buyers, the practical question is whether the new capital improves rate-limit stability, regional availability, latency, and support for long-running agent work.
- **May 20:** [OpenAI IPO reporting, Anthropic profit forecasts, and SpaceX compute costs made frontier AI economics more visible](/news/2026-05-20-openai-anthropic-spacex-frontier-ai-capital-pressure/). For Claude Code buyers, the operational question is whether Anthropic can keep high-capacity coding-agent limits stable while compute commitments scale.
- **May 19:** [Claude Managed Agents added self-hosted sandboxes and MCP tunnels](/news/2026-05-19-claude-managed-agents-self-hosted-sandboxes-mcp-tunnels/). This matters for Claude Code teams because tool execution can now run inside customer-controlled infrastructure or supported providers while private MCP servers stay off the public internet.
- **May 14:** [Anthropic announced the Claude Agent SDK, `claude -p`, and Claude Code GitHub Actions credit split](/news/2026-05-14-anthropic-claude-agent-sdk-credit-split/). The current help page now lists the separate paid-plan credit pool as active, but it only covers non-interactive Agent SDK, `claude -p`, GitHub Actions, and third-party Agent SDK usage after the user claims the credit.
- **May 14:** [Anthropic expanded Claude through PwC's enterprise rollout and a $200M Gates Foundation partnership](/news/2026-05-14-anthropic-pwc-gates-claude-expansion/). The PwC deal matters for Claude Code because PwC will roll out Claude Code and Cowork starting with U.S. teams and train 30,000 professionals, giving Anthropic a larger services bench for governed client deployments.
- **May 14:** [Microsoft reportedly started canceling most internal Claude Code licenses in its Experiences and Devices division and pushing engineers toward GitHub Copilot CLI](/news/2026-05-14-microsoft-claude-code-github-copilot-cli-shift/) by the end of June. Treat it as a reported Microsoft tooling-convergence decision, not a public Claude Code deprecation; it still matters because large enterprises are deciding whether to standardize on developer-loved agents or platform-governed agents.
- **May 13:** [Anthropic passed OpenAI in US business adoption per Ramp's May 2026 AI Index](/news/2026-05-13-anthropic-surpasses-openai-business-adoption-ramp/), with Claude Code named explicitly as the wedge. Ramp's analyst said engineering coding workloads are the segment where Claude has been winning enterprise procurement for months; the broader business adoption flip (34.4% vs. 32.3% for OpenAI) is the first month it shows up at the macro level. Claude Code seat budgets that have been bottom-up shadow-purchases are likely up for procurement consolidation this quarter.
- **May 12:** [Anthropic launched Claude for Legal](/news/2026-05-12-anthropic-claude-for-legal-plugins-microsoft-365/). Claude Code sits next to 12 practice-area plugins and 20+ MCP connectors (Harvey, Relativity, Everlaw, Thomson Reuters CoCounsel, DocuSign, Box), so legal-engineering teams can wire repo automation into the same agent surface lawyers use in Word and Outlook.
- **May 10:** [Reports tied Anthropic to Akamai's $1.8B frontier-model cloud commitment](/news/2026-05-10-anthropic-akamai-cloud-deal/). More serving capacity behind Claude Code lowers the odds of rate-limit pain on sustained agent runs.
- **May 9:** [FIS and Anthropic are building a Claude-powered financial-crimes agent for banks](/news/2026-05-09-anthropic-fis-financial-crimes-agent/). Confirms Claude Code's MCP and agent stack is the surface Anthropic is shipping into regulated, audit-heavy enterprise workflows.
- **May 6:** [Claude Managed Agents added dreaming, outcomes, and multiagent orchestration](/news/2026-05-06-claude-managed-agents-dreaming-outcomes-orchestration/). Production teams running Claude Code agents in pipelines now get hosted memory refinement, rubric-based outcomes, and parallel subagent execution as first-party primitives.
- **May 6:** [Anthropic used SpaceX Colossus capacity to raise Claude Code and API limits](/news/2026-05-06-anthropic-spacex-colossus-claude-limits/). Claude Code five-hour limits doubled for Pro, Max, Team, and seat-based Enterprise plans, and peak-hour reductions were removed for Pro and Max.
- **May 6:** [ServiceNow Build Agent reached Claude Code, Cursor, Windsurf, and GitHub Copilot](/news/2026-05-06-servicenow-build-agent-coding-tools/). ServiceNow developers can bring platform context into Claude Code, but should treat the connector as privileged enterprise workflow access.
- **May 5:** [Anthropic ships ten financial-services agent templates](/news/2026-05-05-anthropic-financial-services-agent-templates/) with Claude Code and Cowork plugins plus Managed Agent cookbooks. Finance teams get packaged pitch, KYC, and close workflows, but engineering still owns permissions, audit logs, and connector scopes.
- **May 1:** [The MCP STDIO command-execution flaw reframed MCP server configs as privileged shell-access surfaces](/news/2026-05-03-mcp-stdio-command-execution-flaw/). Claude Code teams should inventory MCP configs, sandbox STDIO tools, and treat config approval as a security event, not a routine plugin install.
- **April 30:** [Claude Security entered public beta for Enterprise codebase scans](/news/2026-04-30-claude-security-public-beta/). It gives Anthropic a first-party vulnerability-review and patch-proposal surface next to Claude Code's terminal agent loop.
- **April 30:** [A coding-agent security roundup warned that attackers keep targeting credentials, not model weights](/news/2026-04-30-ai-coding-agent-credential-security-roundup/). Claude Code teams should treat permissions, command approvals, secrets, and environment separation as first-order security controls.
- **April 30:** [Sources: Anthropic could raise $50B at $900B valuation](/news/2026-04-30-anthropic-50b-900b-valuation-round/). The round would dramatically expand resources for Claude Code's development, compute capacity, and enterprise roadmap, backed by a $30B+ revenue run rate.
- **April 29:** [Agent skill libraries are becoming a coding-agent workflow layer](/news/2026-04-29-agent-skills-ecosystem-github-trending/). Claude Code is one of the clearest beneficiaries because its users already treat local instructions, skills, hooks, and MCP integrations as versioned engineering assets.
- **April 29:** [Anthropic updated its Responsible Scaling Policy around external review](/news/2026-04-29-anthropic-rsp-external-review-update/). Claude Code buyers should track these governance changes because coding agents increasingly operate with filesystem, terminal, and tool permissions.
- **April 27:** [Cursor and Claude were named in a reported PocketOS database-deletion incident](/news/2026-04-27-cursor-claude-database-deletion-incident/). Claude Code users should treat it as a reminder that prompt rules are not a security boundary for production infrastructure.
- **April 25:** [AI News Desk, April 25](/news/2026-04-25-ai-news-catchup/) tied Claude Code's backdrop to GPT-5.5 API access, Copilot distribution, Project Deal, and Google-Anthropic financing.
- **April 24:** [Anthropic and NEC announce a 30,000-employee Claude rollout](/news/2026-04-24-anthropic-nec-ai-engineering-workforce/). Claude Code is part of the partnership surface for software-engineering productivity, alongside Claude and Claude Cowork.
- **April 24:** [Google reportedly plans up to $40B in Anthropic cash and compute investment](/news/2026-04-24-google-anthropic-40b-investment/), expanding the multi-cloud capacity story behind Claude Code if completed.
- **April 21:** [Kimi K2.6 Agent Swarm ships](/news/2026-04-21-moonshot-kimi-k2-6-agent-swarm/) with strong open-weight SWE-bench and HLE-with-tools results, raising the self-hosted baseline Claude Code competes against.
- **April 20:** [Amazon commits up to $25B more to Anthropic](/news/2026-04-20-amazon-anthropic-25b-infrastructure-pact/), adding compute capacity behind Claude and Claude Code workloads.
- **April 17:** [Dario Amodei meets White House Chief of Staff over Mythos](/news/2026-04-17-amodei-white-house-mythos/). Sign of a thaw in Anthropic's federal relationship. Outcome shapes long-term enterprise trajectory for Claude Code + Claude at scale.
- **April 16:** [Systemic MCP vulnerability exposes 200k servers](/news/2026-04-16-mcp-vulnerability-200k-servers/) to arbitrary command execution. Affects every MCP server Claude Code invokes. Treat third-party MCP servers as shell-access risk; prefer first-party or sandbox via container.
- **April 16:** [OpenAI ships Codex Desktop as "super app"](/news/2026-04-16-openai-codex-desktop-super-app/): computer use, memory, gpt-image-2, 90+ plugins, multi-agent. Desktop-agent surface competes directly with Claude Code's CLI-native workflow.
- **April 14:** [Anthropic receiving $800B valuation offers](/news/2026-04-14-anthropic-800b-valuation-offers/), more than double February's $350B round. Supports continued Claude Code investment and enterprise roadmap.
- **April 17:** [Claude Design ships](/news/2026-04-17-anthropic-launches-claude-design/) with a direct handoff path to Claude Code. Design a prototype in Claude Design, then one-click package it into a production-build bundle for Claude Code. Closed loop: prompt → design → working app.
- **April 17:** [Cursor, Windsurf, Zed, Continue, GitHub Copilot all shipped Opus 4.7 support within 24 hours](/news/2026-04-17-opus-4-7-day-two-ide-adoption/) of the Anthropic release. Claude Code itself picked up 4.7 on day zero through the Anthropic SDK.
- **April 16:** [Opus 4.7 ships as default backing model](/news/2026-04-16-anthropic-claude-opus-47/). Takes measurable leads on agentic coding, scaled tool use, and long-context reasoning. New tokenizer = 1.0-1.35x more tokens per input, same $5/$25 per MTok.
- **April 14:** [Claude computer-use agent](/news/2026-04-14-anthropic-claude-computer-use-agent/) expands availability. Available inside Claude Code as research preview.

## System Verdict

> **Pick Claude Code if you run serious multi-file engineering with a Claude-backed agent.** The agentic loop (plan, execute, validate, self-correct) remains one of the deepest coding-agent workflows as of June 2026. Opus 4.8 and dynamic workflows make it more credible for broad bug hunts, migrations, audits, and modernization tasks that need parallel subagents and independent checks. Anthropic's May 6 compute update doubled Claude Code five-hour rate limits for Pro, Max, Team, and seat-based Enterprise plans, which makes sustained agent work easier to justify. MCP server support, Skills, and Agent SDK hosting turn it into a production agent platform, not just a coding assistant.
>
> **Skip it if you only want passive autocomplete or a free coding assistant.** [Cursor](/tools/cursor/) remains stronger for a full AI-native editor with visual diffs. [GitHub Copilot](/tools/github-copilot/) is the cheapest GitHub-centric paid entry for many teams. [Cline](/tools/cline/) is free open-source VS Code with BYOK. Claude Code is strongest when a developer is willing to supervise an agent that can change files and run tools.
>
> **Who pays which tier:** Pro $20/mo for light agentic sessions and individual contributors, Max 5x $100/mo for sustained daily coding, Max 20x $200/mo when Claude Code is your primary development tool. API key (BYOK) pay-per-token suits teams building commercial products on top of Claude Code; third-party services routing Claude Code through Max subscriptions are restricted per Anthropic's April 2026 policy.

## Key Facts

| | |
|---|---|
| **Backing model** | Claude Opus 4.8 (released May 28, 2026) · Sonnet 4.6 · Haiku 4.5 selectable |
| **Context window** | 1M tokens (Opus and Sonnet) · 200K (Haiku) |
| **Interface** | Terminal · IDE integrations · desktop · browser · remote worktrees · GitHub Actions and SDK workflows |
| **Install paths** | macOS · Linux · WSL · Windows PowerShell/CMD · WinGet · Homebrew |
| **Agent loop** | Plan → execute → validate → self-correct · extended thinking on Opus |
| **Ultraplan** | Research preview · cloud-based planning session with web UI revision |
| **Monitor tool** | Background event watcher · streams CI and server events into session |
| **MCP support** | First-class Model Context Protocol server integration |
| **Skills** | Named, configurable workflow shortcuts |
| **Dynamic workflows** | Research preview for large tasks with parallel subagents, independent verification, and resumable progress |
| **Checkpointing** | Save and restore session state during long runs |
| **Pricing** | Pro $20 · Max 5x $100 · Max 20x $200 · API pay-per-token |

Core pricing and model-access data above was verified against vendor sources and current reporting on 2026-06-24. See Sources.
The enterprise partnership surface was refreshed on 2026-04-24 after Anthropic's NEC announcement.

## What it actually is

An agentic coding tool that can run in developer-controlled surfaces and treat an entire codebase as context. You describe a task; Claude Code plans the sequence, reads relevant files, makes coordinated edits across multiple files, runs tests or builds, reads errors, and iterates until the task completes.

Opus 4.8 is the current top model for hard Claude Code work. Sonnet 4.6 and Haiku 4.5 are selectable for cost or speed trade-offs. The 1M token context on Opus and Sonnet means real-world codebases load in one session.

Feature surface expanded through 2026. Ultraplan (research preview) launches a cloud-based planning session with a web UI for plan revision, then executes the approved plan from your terminal. Dynamic workflows (research preview) let Claude plan a broad task, fan work out across parallel subagents, verify results, save progress, and return one coordinated answer. The Monitor tool watches CI logs, server output, and running processes and streams events into the active session; paired with `/loop` self-pacing, the agent reacts to live events without manual polling. Current install docs now include Windows PowerShell/CMD and WinGet paths, so teams no longer need to treat WSL as the only Windows route.

MCP (Model Context Protocol) server support makes external tools first-class: configure transport, auth, error handling, and tool search across any MCP-compatible service. Skills package repeatable workflows as named commands. Agent SDK hosting documentation covers deploying Claude Code agents into production pipelines. Checkpointing saves session state for rollback on long runs.

The moats: the agent loop depth no IDE-based competitor matches, Opus 4.8's long-horizon agentic coding focus, dynamic workflows for broad parallel tasks, and the MCP + Skills + Agent SDK combination that turns Claude Code into a platform for building production AI pipelines.

## When to pick Claude Code

- **You run multi-file refactors, migrations, or large test-driven work.** Agent loop self-corrects through failed tests until the task completes, often without human intervention.
- **You already pay for Claude Pro or Max.** Claude Code is included; there is no separate Claude Code subscription.
- **You need MCP tool integration.** First-class MCP server support beats every IDE-integrated competitor on external tool plumbing.
- **You build production AI agents.** Agent SDK hosting and Skills support ship the work beyond personal use.
- **You work backend or infrastructure.** Terminal-native workflows fit naturally, while IDE/desktop/browser paths cover teams that want a less shell-only workflow.
- **Your codebase is large.** The 1M context on Opus 4.8 loads real-world repos in one session, no chunking required; dynamic workflows help when the job should be decomposed across independent subagents.

## When to pick something else

- **IDE-integrated AI coding:** [Cursor](/tools/cursor/) at $20/mo. Visual diffs, inline autocomplete, and a VS Code-familiar interface.
- **Cheapest GitHub-centric entry:** [GitHub Copilot](/tools/github-copilot/) at $10/mo with Claude Opus agent mode.
- **Free open-source option:** [Cline](/tools/cline/). VS Code agent, BYOK for models. No fixed subscription.
- **Autonomous cloud coding:** [Devin](/tools/devin/) or similar cloud-only agents if you want runs without a local terminal.
- **GUI-only users:** Cursor, [Windsurf](/tools/windsurf/), or Zed AI. Claude Code has no visual mode.

## Pricing

Subscription pricing via [claude.com/pricing](https://claude.com/pricing). Claude Code is not sold separately; access comes with a Claude subscription tier or an API key.

| Plan | Price | Claude Code access | Who's it for |
|------|-------|--------------------|--------------|
| Free | $0 | **Not included** | N/A for Claude Code |
| Pro | $20/mo ($17 annual) | Included · light usage | Individual contributors, lighter sessions |
| Max 5x | $100/mo | 5x Pro usage limits | **Most daily coders should land here** |
| Max 20x | $200/mo | 20x Pro usage limits | Primary dev tool, sustained agentic workloads |
| Team (Premium) | $100/seat/mo | Premium seats only, 5-seat minimum | Teams standardizing on Claude Code |
| API (BYOK) | Pay-per-token | Unrestricted | Commercial products built on Claude Code |
| Agent SDK / `claude -p` usage | Eligible paid users can claim separate monthly credits | Does not cover normal interactive Claude Code; credits are per-user, monthly, and non-rollover | Personal automation and CI jobs still need account-level billing checks before relying on them |

*Prices and usage-routing guidance verified 2026-06-24 via [Anthropic pricing](https://claude.com/pricing), [Claude Code docs](https://code.claude.com/docs/en/overview), Agent SDK credit help, Claude Code usage-limit guidance, Anthropic's May 6 usage-limit update, and the May 28 Opus 4.8 release. Pro users still see lower rate ceilings than Max tiers; heavy interactive Claude Code workloads should price against Max, Team Premium, Enterprise, or API usage paths. Anthropic's current Agent SDK help says eligible paid users can claim separate monthly credits for non-interactive Agent SDK, `claude -p`, Claude Code GitHub Actions, and third-party Agent SDK usage. Third-party services routing Claude Code through Max subscriptions are restricted per Anthropic's April 2026 policy; use API key path for commercial redistribution.*

## Against the alternatives

| | Claude Code | Cursor | GitHub Copilot |
|---|---|---|---|
| **Interface** | Terminal, IDE, desktop, browser, remote | VS Code fork | VS Code / JetBrains / Neovim |
| **Backing model** | Opus 4.8 / Sonnet 4.6 / Haiku 4.5 | Claude access varies by Cursor model availability / OpenAI frontier models / Gemini availability | Claude access varies by Copilot model availability / OpenAI frontier models |
| **Context depth** | 1M tokens (Opus) | Depends on model | Depends on model |
| **Agent autonomy** | **Deepest** · full agentic loop | Strong · IDE-bounded | Growing · agent mode added |
| **MCP support** | **First-class** | Emerging | Limited |
| **Entry price** | $20/mo (Pro) | $20/mo (Pro) | $10/mo |
| **Free tier** | None | Limited | None for full features |
| **Best viewed as** | CLI agentic platform | IDE AI assistant | GitHub-centric copilot |

## Failure modes

- **Not a passive autocomplete product.** Claude Code has IDE-adjacent surfaces, but Cursor, Copilot, or Cline remain better if inline suggestions and visual editor flow are the main job.
- **No free tier.** Requires Pro at minimum. API key access still costs money from the first token.
- **Rate limits not fully published.** Pro caps hit faster than Max; Max 20x is the only tier with published "primary tool all day" framing. Heavy users discover limits by hitting them.
- **Agent SDK billing guidance has a separate pool.** Anthropic's current Agent SDK help says eligible paid users can claim monthly credits for `claude -p`, Claude Code GitHub Actions, Agent SDK, and third-party Agent SDK app usage. Credits do not cover normal interactive Claude Code, do not roll over, and are not a replacement for Claude Platform API keys when production automation needs predictable billing.
- **Dynamic workflows can burn usage fast.** They are built for broad, parallel, long-running work and can consume meaningfully more usage than a typical Claude Code session. Start with scoped tasks, require confirmation, and use managed settings for team rollout.
- **Opus 4.8 effort controls need budget discipline.** Same standard Opus sticker price as 4.7, cheaper fast mode, but real cost depends on effort level, retries, and workflow breadth. API workloads need re-benchmarking before migrating.
- **MCP STDIO is privileged execution.** The May 1 [MCP STDIO disclosure](/news/2026-05-03-mcp-stdio-command-execution-flaw/) means third-party MCP server configs should be reviewed like shell scripts and sandboxed before use.
- **Ultraplan is research preview.** Cloud planning is not production-ready and may change or be removed.
- **Windows setup still needs dev-image testing.** Current docs include native Windows PowerShell/CMD and WinGet install paths, but teams should verify shell behavior, Git for Windows/Bash, local permissions, and MCP tools before broad rollout.
- **Session context limits on long runs.** Even 1M tokens fills on sustained sessions. Checkpointing helps but does not eliminate the ceiling.
- **Third-party subscription restrictions.** Commercial products cannot route Claude Code through a Max subscription. API key (BYOK) path is required for redistribution.
- **Computer Use inside Claude Code is research preview.** Not production-ready and not available in claude.ai chat.
- **No IDE refactoring visualization.** Agent explains what it did after the fact. Users who prefer reviewing proposed changes before they commit should use Cursor.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and feature details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-24 against [Claude Code docs](https://code.claude.com/docs/en/overview), [Claude Code cost management](https://code.claude.com/docs/en/costs), [Anthropic pricing](https://claude.com/pricing), [Claude Code usage limits](https://support.claude.com/en/articles/14552983-models-usage-and-limits-in-claude-code), [Agent SDK credit help](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan), and the [Fable/Mythos access statement](https://www.anthropic.com/news/fable-mythos-access). The check also used [Business Insider reporting on Fable access](https://www.businessinsider.com/legion-ai-startup-suing-us-government-new-anthropic-model-fable5-2026-6), the [June 14 AI news desk](/news/2026-06-14-ai-news-desk/), [Opus 4.8 and dynamic workflows launch](/news/2026-05-28-claude-opus-48-dynamic-workflows/), and [Anthropic Series H update](/news/2026-05-28-anthropic-series-h-65b-965b-valuation/). It also used the [May 14 Microsoft internal tooling report](/news/2026-05-14-microsoft-claude-code-github-copilot-cli-shift/), [May 14 Agent SDK credit split](/news/2026-05-14-anthropic-claude-agent-sdk-credit-split/), [May 12 Claude for Legal launch](/news/2026-05-12-anthropic-claude-for-legal-plugins-microsoft-365/), [May 6 Managed Agents update](/news/2026-05-06-claude-managed-agents-dreaming-outcomes-orchestration/), and the [May 6 usage-limit update](https://www.anthropic.com/news/higher-limits-spacex).

## FAQ

**Is Claude Code free?**
No. Claude Code is not included in the free Claude tier. Access requires a Claude Pro subscription ($20/mo), Max 5x ($100/mo), Max 20x ($200/mo), or an Anthropic API key with pay-per-token billing ([Claude Code pricing](https://claude.com/pricing)).

**What model does Claude Code run on?**
Claude Opus 4.8 is the current stable high-end Anthropic model for hard Claude Code work as of June 24, 2026. Fable 5 and Mythos 5 access remains account-specific after the June 12 suspension, so check /model and your account terms before relying on either route. Sonnet 4.6 and Haiku 4.5 are selectable for cost or speed trade-offs. The 1M token context window applies to Opus and Sonnet.

**Do Agent SDK credits cover normal Claude Code sessions?**
No. Anthropic's current help page says the Agent SDK credits cover Agent SDK, `claude -p`, Claude Code GitHub Actions, and third-party Agent SDK app usage after eligible paid users claim the monthly credit. Interactive Claude Code in the terminal or IDE still uses normal subscription limits.

**What is Ultraplan?**
A research preview feature that launches a cloud-based planning session with a web UI. Claude auto-creates a default environment, presents a plan for revision, and then executes the approved plan from your terminal. Not production-ready.

**What is the Monitor tool?**
A background event watcher that streams CI logs, server events, and process output into an active Claude Code session. Combined with `/loop` self-pacing, the agent reacts to live events in real time rather than requiring manual copy-paste.

**What operating systems does Claude Code support?**
macOS, Linux, WSL, Windows PowerShell/CMD, and WinGet install paths are documented. Windows teams should still test Git for Windows/Bash behavior and MCP/tool execution inside their standard developer image before broad rollout.

**Claude Code vs Cursor?**
Claude Code is a deeper agentic coding workflow with terminal, IDE, desktop, browser, and remote surfaces; dynamic workflows help with large parallel jobs. Cursor is a VS Code fork with stronger visual editing and inline autocomplete at $20/mo. For pure autonomous multi-file engineering, Claude Code is stronger. For day-to-day coding inside a full AI-native editor, Cursor wins.

## Sources

- [Anthropic Fable/Mythos access statement](https://www.anthropic.com/news/fable-mythos-access): June 2026 model-availability update and unaffected-model note
- [AiPedia June 14 AI news desk](/news/2026-06-14-ai-news-desk/): Claude route-risk, fallback-model, and G7 governance context
- [Claude Code docs](https://code.claude.com/docs/en/overview): Feature reference, setup, and agent documentation
- [Claude Code cost management](https://code.claude.com/docs/en/costs): token cost, `/usage`, model-selection, and team spend guidance
- [Claude Agent SDK credit help](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan): current Agent SDK, `claude -p`, and GitHub Actions monthly credit guidance
- [Claude Code llms.txt](https://code.claude.com/llms.txt): Full capability manifest
- [Anthropic pricing](https://claude.com/pricing): Max plan prices and tier access
- [Opus 4.8 release](https://www.anthropic.com/news/claude-opus-4-8): Backing model, effort controls, and pricing details
- [Dynamic workflows in Claude Code](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code): Parallel subagent workflow details

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Aider vs Claude Code](/compare/aider-vs-claude-code/)
