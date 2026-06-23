---
type: use-case
slug: ai-agency-stack
title: "AI Automation Agency Tech Stack (June 2026)"
seo_title: "AI Automation Agency Tech Stack: n8n, Zapier, Make, Claude, ChatGPT, Voice Agents and Client Dashboards"
meta_description: "Updated June 23, 2026: a practical AI automation agency stack for discovery, workflow orchestration, LLM calls, voice agents, browser automation, client dashboards, QA, monitoring, and handoff."
description: "A source-backed AI automation agency stack for selling reliable client workflows without overbuying agent platforms or hiding failure modes."
tools_mentioned: [n8n, zapier, make, claude, chatgpt, elevenlabs, retell-ai, browserbase, lovable, v0]
guide_picks:
  best_overall:
    tool: n8n
    label: "Best technical agency automation backbone"
    plan: "Starter or Pro for early client work; Enterprise or self-hosted only after ownership, security, and support are real"
    reason: "Best default for technical agencies because n8n combines workflow control, AI nodes, code steps, webhooks, self-hosting paths, and workflow-execution billing instead of charging every step."
    sources:
      - label: "n8n pricing"
        url: "https://n8n.io/pricing/"
      - label: "n8n AI docs"
        url: "https://docs.n8n.io/advanced-ai/"
  budget:
    tool: make
    label: "Best visual agency automation starter"
    plan: "Free or Core for prototypes; Pro/Teams when execution logs, roles, and scenario sharing matter"
    reason: "Best lower-friction visual builder for agencies that need client-readable scenarios, routers, filters, and AI automations without jumping straight into custom code."
    sources:
      - label: "Make pricing"
        url: "https://www.make.com/en/pricing"
      - label: "Make AI Agents"
        url: "https://www.make.com/en/ai-agents"
  pro_team:
    tool: zapier
    label: "Best non-technical agency operations layer"
    plan: "Model task volume before Pro or Team"
    reason: "Best fit when the agency needs broad SaaS coverage, fast handoff, Tables, Forms, MCP, and client-ops automations a non-technical team can maintain."
    sources:
      - label: "Zapier pricing"
        url: "https://zapier.com/pricing"
      - label: "Zapier plan help"
        url: "https://help.zapier.com/hc/en-us/articles/16051471305357-How-to-select-your-plan"
author: "aipedia.wiki Editorial"
last_updated: 2026-06-23
last_verified: 2026-06-23
update_frequency: monthly
---

# AI Automation Agency Tech Stack (June 2026)

An AI automation agency does not win by selling the flashiest "agent" demo. It wins by shipping client workflows that survive real inputs, API failures, messy CRM data, permissions, human review, and handoff.

This stack was refreshed on **June 23, 2026** for Lovable's current credit and Cloud/AI usage wording, while the remaining stack sources keep their prior June checks. The June check also folds in Anthropic's official June 15 Agent SDK and `claude -p` billing change so agencies do not sell Claude subscription limits as a background-automation pool.

## Quick Verdict

**Best technical backbone:** [n8n](/tools/n8n/). Use it when the agency can own credentials, workflow design, AI nodes, webhooks, code steps, logs, retries, and security. n8n's current pricing page says all plans include unlimited users, unlimited workflows, every integration, and pricing based on monthly workflow executions rather than step count.

**Best non-technical backbone:** [Zapier](/tools/zapier/). Use it when the buyer wants the fastest path across common SaaS apps, Tables, Forms, MCP, and team-maintainable workflows. Model task volume before selling a retainer around it.

**Best visual agency starter:** [Make](/tools/make/). Use it when a client or junior operator needs to understand scenarios visually. Make's June 23 pricing surface frames plans around credits, AI apps, MCP Server, Make Code App, scenario execution, teams, and enterprise security.

**Best model layer:** [Claude](/tools/claude/) plus [ChatGPT](/tools/chatgpt/). Claude is the stronger review and reasoning layer for strategy, extraction rules, policies, and QA. ChatGPT is the broader general workbench and API option when the workflow also needs drafting, files, images, or internal operations docs. Do not price headless Claude agent work from a normal subscription: Anthropic says Agent SDK and `claude -p` usage stop counting toward standard Claude plan limits on June 15, 2026.

**Best voice-agent lane:** [Retell AI](/tools/retell-ai/) or [ElevenLabs](/tools/elevenlabs/) only when phone, voice, or interactive audio is part of the actual client problem. Retell's current pricing surface shows pay-as-you-go voice AI with per-minute cost components; ElevenLabs says ElevenAgents costs depend on voice, multimodal, or text-only calls, with LLM costs passed through separately.

## What To Buy First

Do not start with ten tools. Start with one automation backbone, one model workspace, one documentation system, and one monitoring habit.

| Agency stage | Buy first | Add next | Delay |
|---|---|---|---|
| Solo operator selling first pilots | [Make](/tools/make/) or [Zapier](/tools/zapier/) | [ChatGPT](/tools/chatgpt/) and [Claude](/tools/claude/) for build/review | Voice agents, browser automation, custom dashboards |
| Technical agency | [n8n](/tools/n8n/) | OpenAI/Claude API keys, logging, Browserbase for no-API web tasks | Client-facing autonomy before QA |
| Marketing or sales automation agency | [Zapier](/tools/zapier/) or [n8n](/tools/n8n/) | Apollo/Clay-style lead data, CRM routing, approval queues | Sending client emails without human approval |
| Voice AI agency | [Retell AI](/tools/retell-ai/) or [ElevenLabs](/tools/elevenlabs/) | Call transcripts, QA scorecards, escalation rules | High-volume calling before compliance and opt-out review |
| Productized workflow agency | [n8n](/tools/n8n/) plus [Lovable](/tools/lovable/) or [v0](/tools/v0/) | Client dashboard, audit log, status page | Custom app work that replaces the core automation sale |

## Core Stack

### 1. Discovery And Process Mapping

Use Loom, Notion, Google Docs, screenshots, exported examples, and client interviews before choosing tools. The sale should identify the workflow owner, source-of-truth systems, data sensitivity, approval points, failure paths, and value metric.

If the client cannot name the owner or success metric, sell a process-mapping sprint before selling an automation build.

### 2. Workflow Orchestration

Use [n8n](/tools/n8n/) when workflow control, AI nodes, custom API calls, self-hosting, and technical ownership matter. It is the strongest default for agencies that can support what they build.

Use [Zapier](/tools/zapier/) when the client team needs to maintain the workflow after handoff. Its current pricing page positions the platform around Zaps, Tables, Forms, Zapier MCP, and task-tiered AI orchestration.

Use [Make](/tools/make/) when the visual scenario map is part of the deliverable. It is useful for client education, operational handoff, and explaining branching logic.

### 3. Model And Reasoning Layer

Use [Claude](/tools/claude/) for structured extraction, long-form strategy, policy review, prompt QA, and second-pass checks. Use [ChatGPT](/tools/chatgpt/) when the workflow needs broader drafting, files, data analysis, images, or OpenAI API routing.

For client work, the model prompt is not enough. Store examples, rules, approval thresholds, fallback instructions, and test cases beside the workflow. If the workflow runs without a human at the keyboard, model the cost as API, credit, or extra-usage spend rather than assuming the agency's chat subscription will cover it.

### 4. Voice, Calls, And Audio

Use voice only when it is core to the client value. [ElevenLabs](/tools/elevenlabs/) is strong for voice quality and ElevenAgents-style conversational work. [Retell AI](/tools/retell-ai/) is more directly framed around AI phone agents, call minutes, telephony, LLM, speech, add-ons, knowledge base, safety guardrails, PII removal, and QA options.

Do not quote voice-agent projects without usage math. Call duration, LLM choice, speech provider, telephony, SMS, retries, and QA all affect cost. Current ElevenAgents pricing separates voice-only, multimodal, and text-only behavior and passes through LLM costs separately, so a "per minute" quote can still miss material spend.

### 5. Browser Automation

Use [Browserbase](/tools/browserbase/) or Playwright only when there is no stable API. Browser work is powerful, but it is more brittle than API-based automation. Browserbase's current pricing surface includes sessions/runtime capabilities, data retention, captcha solving on paid tiers, model-gateway usage, and stealth-mode differences.

Browser automation should be the exception, not the default agency architecture.

### 6. Client Dashboard And Review Queue

Use [Lovable](/tools/lovable/) or [v0](/tools/v0/) for lightweight internal tools, dashboards, and review queues when a spreadsheet is not enough. Lovable's current pricing docs say Free includes daily build credits capped monthly plus monthly Cloud and in-app AI credits, and paid Pro starts at $25/month; v0's current pricing update explains credit consumption based on input and output tokens, including context.

Keep dashboards small: status, queue, approval, error log, cost estimate, and owner. A dashboard is not the product unless the client explicitly bought software.

## Good First Projects

- **Lead intake routing:** form capture, enrichment, fit classification, draft reply, CRM update, and human approval.
- **Support triage:** classify tickets, draft replies from approved docs, route edge cases, and log decisions.
- **Appointment follow-up:** summarize calls, generate next-step emails, update CRM fields, and trigger reminders.
- **Content approval pipeline:** draft from a brief, require human review, schedule or publish, and log who approved it.
- **Weekly client reporting:** collect approved metrics, summarize changes, draft narrative, and flag anomalies.
- **Invoice or document prep:** extract fields, validate against rules, queue exceptions, and prepare a draft for review.

These projects work because the input, output, owner, and rollback path are visible. They are safer than automating payments, legal claims, medical guidance, account changes, or public client communications on day one.

## Client Discovery Checklist

Before building, confirm:

- Who owns the workflow after handoff.
- Which systems are the source of truth.
- Which data can be sent to OpenAI, Anthropic, Google, ElevenLabs, Retell AI, or other vendors.
- Which steps require human approval.
- What happens when the model is uncertain.
- What counts as a failed run.
- How errors are logged and who receives alerts.
- Who pays for API calls, workflow executions, tasks, credits, browser sessions, voice minutes, and hosting.
- What the client contract says about AI use, confidentiality, disclosure, and support response times.

If any answer is missing, reduce the project scope.

## Delivery Pattern

1. Map the current workflow with screenshots, real examples, and owner sign-off.
2. Build the smallest useful version with human review.
3. Add logs for every model decision and external action.
4. Test on messy real examples, not only clean demos.
5. Define fallback paths for missing data, API failures, low confidence, and tool outages.
6. Add cost monitoring before production volume.
7. Hand over documentation, runbooks, credentials ownership, and escalation paths.
8. Review failures, costs, and client value after the first few weeks.

The first deliverable should prove reliability, not full autonomy. Autonomy can increase only after the workflow is observable.

## Pricing And Scope

Avoid universal agency packages like "$997 setup + $497/month" unless the actual scope is defined. Client automation pricing depends on system count, risk, data quality, compliance needs, usage volume, QA burden, support expectations, and whether the agency remains accountable after handoff.

| Scope | Good fit | Quote around | Watch out |
|---|---|---|---|
| Discovery sprint | Messy process, unclear owner, unclear ROI | Process map, automation candidates, risk notes, first pilot spec | Client expects a production build from a workshop |
| Pilot workflow | One workflow, one owner, one success metric | Build, test set, manual review, handoff docs | Clean demo works but messy inputs fail |
| Department workflow | Several integrations, approvals, reporting | Permissions, monitoring, owner training, error handling | Adoption, exception handling, support load |
| Production automation | Client-facing actions or high volume | QA, logging, rollback, security, ongoing support | Hidden API/voice/browser costs and liability |

## Failure Modes

- **No owner:** automations decay when nobody checks failed runs.
- **Bad source data:** AI can summarize bad CRM fields, but it cannot make them true.
- **Too much autonomy too soon:** keep human review until real-world accuracy is proven.
- **Hidden costs:** model calls, workflow executions, tasks, credits, browser sessions, voice minutes, SMS, retries, Agent SDK credits, and QA can compound.
- **No rollback plan:** workflows that update customer records need audit logs and manual correction paths.
- **Client-data leakage:** agencies must separate client workspaces, prompts, credentials, files, and logs.

## Related

- [Best AI automation platform](/guides/best-ai-automation-platform/)
- [Best AI tools for agencies](/guides/best-ai-tools-for-agencies/)
- [AI lead generation](/guides/ai-lead-generation/)
- [Best AI tools for sales teams](/guides/best-ai-tools-for-sales-teams/)
- [Best AI tools for small business](/guides/best-ai-tools-for-small-business/)
- [n8n](/tools/n8n/)
- [Zapier](/tools/zapier/)
- [Make](/tools/make/)
- [Claude](/tools/claude/)
- [ElevenLabs](/tools/elevenlabs/)

## FAQ

**What is the best stack for a new AI automation agency?**
Start with Make or Zapier if you are non-technical, n8n if you can own technical delivery, and ChatGPT plus Claude for build-and-review work. Add voice, browser automation, and dashboards only when a client workflow needs them.

**Should an agency use n8n or Zapier?**
Use n8n when control, AI nodes, code, self-hosting, and complex workflow design matter. Use Zapier when the client team needs broad SaaS coverage and maintainability with less technical overhead.

**Are voice agents a good first agency offer?**
Only if the agency understands call compliance, opt-out handling, transcripts, QA, escalation, and usage-based cost. Voice can convert well, but it is riskier than internal prep workflows.

**How often should this stack be refreshed?**
Monthly at minimum, and faster when n8n, Zapier, Make, OpenAI, Anthropic, ElevenLabs, Retell AI, Browserbase, Lovable, or v0 pricing, credits, plan mechanics, or agent-billing rules change.

## Sources

- [n8n pricing](https://n8n.io/pricing/) (verified 2026-06-12)
- [n8n AI documentation](https://docs.n8n.io/advanced-ai/) (verified 2026-06-12)
- [Zapier pricing](https://zapier.com/pricing) (verified 2026-06-12)
- [Zapier plan updates: Tables, Interfaces, and MCP](https://help.zapier.com/hc/en-us/articles/39645433045773-Zapier-plan-updates-Tables-Interfaces-and-MCP-now-included) (verified 2026-06-12)
- [Make pricing](https://www.make.com/en/pricing) (verified 2026-06-23)
- [Make AI Agents](https://www.make.com/en/ai-agents) (verified 2026-06-23)
- [OpenAI API pricing](https://openai.com/api/pricing/) (verified 2026-06-12)
- [ChatGPT Business help](https://help.openai.com/en/articles/8792828-what-is-chatgpt-business) (verified 2026-06-12)
- [Claude pricing](https://claude.com/pricing) (verified 2026-06-12)
- [Claude plan help](https://support.claude.com/en/articles/11049762-choosing-a-claude-ai-plan) (verified 2026-06-12)
- [Claude Agent SDK with a Claude plan](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan) (verified 2026-06-12)
- [ElevenLabs ElevenAgents cost](https://help.elevenlabs.io/hc/en-us/articles/29298065878929-How-much-does-ElevenAgents-cost) (verified 2026-06-12)
- [Retell AI pricing](https://www.retellai.com/pricing) (verified 2026-06-12)
- [Browserbase pricing](https://www.browserbase.com/pricing) (verified 2026-06-12)
- [Lovable pricing](https://lovable.dev/pricing) (verified 2026-06-23)
- [Lovable credits and usage](https://docs.lovable.dev/introduction/credits-and-usage) (verified 2026-06-23)
- [Vercel v0 pricing update](https://vercel.com/blog/updated-v0-pricing) (verified 2026-06-12)
