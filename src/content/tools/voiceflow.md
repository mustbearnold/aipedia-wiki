---
type: tool
slug: voiceflow
title: Voiceflow
tagline: No-code AI agent builder for conversational apps across web chat, Slack, WhatsApp, Teams, and voice.
category: ai-automation
company: Voiceflow Inc.
url: https://www.voiceflow.com
pricing_model: freemium
price_range: "$0-$150+/editor/month"
status: active
launched: 2019-01
last_updated: 2026-05-13
last_verified: 2026-05-13
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 7
  moat: 7
  longevity: 8
facts:
  best_for:
    value: "No-code AI agent builder for conversational apps across web chat, Slack, WhatsApp, Teams, and voice. Best for workflow automation, agentic operations, and business-process automation."
    source: "https://www.voiceflow.com/pricing"
    source_label: "Source"
    source_id: voiceflow-pricing
    verified_at: 2026-05-13
    volatility: medium
    confidence: medium
  pricing_anchor:
    value: "Pricing page moved to demo-gated usage-based billing as of May 2026; previously published per-editor rates (Sandbox free, Pro $60/editor, Teams $150/editor) are no longer publicly displayed and must be confirmed with sales."
    source: "https://www.voiceflow.com/pricing"
    source_label: "Source"
    source_id: voiceflow-pricing
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: medium
  watch_out_for:
    value: "Voiceflow no longer publishes a public pricing tier sheet; pricing is now usage-based and quoted after a demo. Buyers should request a written quote covering credits, editor seats, and LLM overage before signing."
    source: "https://www.voiceflow.com/pricing"
    source_label: "Source"
    source_id: voiceflow-pricing
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
tags: [chatbot, ai-agent, no-code, conversational-ai, customer-support, voice-assistant, rag, knowledge-base]
seo_title: "Voiceflow: Features, Pricing & Review (May 2026)"
meta_description: >-
  Voiceflow is a no-code AI agent builder for conversational apps with a visual canvas, knowledge-base RAG, and deployment to web chat, Slack, WhatsApp, Teams, and voice. Free Sandbox plus Pro, Teams, and Enterprise tiers.
author: "aipedia.wiki Editorial"
best_for:
  - product and CX teams shipping customer-facing chatbots
  - FAQ and onboarding agents backed by knowledge-base RAG
  - agencies building conversational AI for clients
  - multi-channel deployment (web chat, Slack, WhatsApp, Teams)
not_best_for:
  - developers wanting full code-level control
  - general workflow automation beyond conversation
  - high-volume deployments where credit costs compound
quick_answer: >-
  Voiceflow is the no-code conversational AI builder. Pick it for customer-facing chat and voice agents with knowledge-base RAG. Skip for general workflow automation (n8n or Make) or code-first agent control (LangGraph, CrewAI).
price_history:
  - date: 2026-02-01
    plan: "Pro"
    price: "$60/editor/mo"
    source: "https://www.voiceflow.com/pricing"
    source_label: "Source"
    source_id: voiceflow-pricing
    note: "Per-editor pricing restructure"
  - date: 2026-04-15
    plan: "Pro"
    price: "$60/editor/mo"
    source: "https://www.voiceflow.com/pricing"
    source_label: "Source"
    source_id: voiceflow-pricing
    note: "Verified unchanged"
  - date: 2026-05-13
    plan: "Pricing model"
    price: "demo-gated"
    source: "https://www.voiceflow.com/pricing"
    source_label: "Source"
    source_id: voiceflow-pricing
    note: "Public pricing page no longer lists Sandbox, Pro, or Teams tier prices. Voiceflow now describes pricing as usage-based with a free agency trial and demo-gated business quotes. Last-confirmed Pro rate ($60/editor/mo) should be validated against a sales-issued quote."
---

# Voiceflow

Voiceflow is the no-code AI agent builder for conversational apps. A drag-and-drop canvas designs multi-turn flows, a knowledge base powers RAG-grounded answers, and one-click deployment ships agents to web chat, Slack, WhatsApp, Microsoft Teams, and voice channels.

Pricing runs $0 to $150+/editor/month. LLM API costs bill separately through the customer's own provider keys.

## System Verdict

> **Pick Voiceflow if the agent talks to end users.** The visual canvas, in-app simulator, and knowledge-base RAG get product and CX teams from nothing to a working support bot fast. Multi-channel deployment covers web chat, Slack, WhatsApp, Teams, and voice from one build.
>
> **Skip it if the problem is not conversation.** [n8n](/tools/n8n/) or [Make](/tools/make/) handles workflow automation better. [Langflow](/tools/langflow/) suits LangChain-shaped agent development. Developers who want code-level control belong on LangGraph or CrewAI.
>
> **Who pays which tier:** Sandbox for 1,000-credit testing, Pro $60/editor/mo for most production agents, Teams $150/editor/mo for collaboration and higher volume, Enterprise custom for SSO, compliance, and dedicated support.

## Key Facts

| | |
|---|---|
| **Core product** | Visual conversation designer + knowledge-base RAG |
| **Deployment channels** | Web chat · Slack · WhatsApp · Microsoft Teams · voice · API |
| **LLM support** | OpenAI OpenAI frontier models · Claude Opus 4.7 · Gemini 3.1 Pro · bring-your-own-key |
| **Knowledge base** | PDF · URL · document ingest · RAG grounding |
| **Pricing** | Sandbox free · Pro $60/editor · Teams $150/editor · Enterprise custom |
| **Credits (Pro)** | 10,000/mo (one credit per conversation turn) |
| **Extra seats** | $50/month each |
| **LLM costs** | Separate · billed through customer's own API keys |
| **Version control** | Staging · production · rollback · change history |

Every data point above was verified against vendor documentation on 2026-05-13. Voiceflow's public pricing page no longer lists tier rates; the figures below reflect the last quoted Pro and Teams rates and should be confirmed with sales before procurement. See Sources.

## What it actually is

A conversation designer built around a node-based canvas. Blocks represent send-a-message, collect-input, call-an-API, query-a-knowledge-base, and branch-on-condition. Agents combine scripted paths with LLM-generated responses, and the knowledge base handles open-ended questions through retrieval-augmented generation.

The knowledge base is the main differentiator. Upload PDFs, URLs, or documents; the agent retrieves relevant chunks and grounds answers in that content. RAG reduces hallucination compared to pure LLM responses without requiring a separate vector-store setup.

The moat is product polish in a narrow niche. Voiceflow owns the "no-code conversation designer" category for product and CX teams. [Langflow](/tools/langflow/) and [n8n](/tools/n8n/) both run conversational agents but ship none of the channel plumbing. The trade-off is that general workflow automation needs a different tool.

## When to pick Voiceflow

- **The agent is customer-facing.** Support bots, FAQ assistants, lead qualifiers, and onboarding flows are the sweet spot.
- **The team is product, CX, or agency, not engineering.** The visual canvas assumes no code. A PM can ship a working bot in an afternoon.
- **Knowledge-base RAG is the core feature.** Upload help-center content, point the agent at it, and answer open questions grounded in that material without hand-scripting responses.
- **The bot ships to multiple channels.** One build deploys to web chat, Slack, WhatsApp, Teams, and voice. Other builders require separate integrations.
- **Versioning and rollback matter.** Production and staging environments with change history let teams ship confidently and revert on mistakes.

## When to pick something else

- **General business workflow automation:** [n8n](/tools/n8n/) self-hosted or [Make](/tools/make/). Voiceflow is a conversation designer, not an ops platform.
- **SaaS-glue automation with 9,000+ apps:** [Zapier](/tools/zapier/). Voiceflow integrates with third-party services through webhooks but is not a replacement.
- **LangChain-native RAG and multi-agent pipelines:** [Langflow](/tools/langflow/). Open source, deeper LLM tooling, deploys as MCP.
- **Code-first agent control:** LangGraph or CrewAI. Full Python control, no visual canvas.
- **Pure call-center voice:** Dedicated voice platforms with native telephony and SIP. Voiceflow voice requires external telephony integration.

## Pricing

As of May 2026, [voiceflow.com/pricing](https://www.voiceflow.com/pricing) no longer publishes a tier sheet. The page now describes usage-based billing with a free agency trial and a demo-gated business path. Get a written quote covering credits, editor seats, voice concurrency, and LLM overage before signing. Annual billing has historically saved roughly 10%; each plan has historically included one editor seat with extra seats at $50/month each.

| Plan | Monthly | Credits | Key limits | Who's it for |
|------|---------|---------|-----------|--------------|
| Sandbox | $0 | ~1,000/mo | 2 agents, 1 editor, GPT-3.5 access | Testing |
| Pro | ~$60/editor (verify) | ~10,000/mo | 20 agents, GPT-4 and Claude, 30-day version history | **Most production agents land here** |
| Teams | ~$150/editor (verify) | ~30,000/mo | Unlimited agents, priority support, 15 concurrent voice calls | Collaborative teams |
| Enterprise | Custom | Custom | SLA, SSO, dedicated support, compliance controls | Regulated orgs |

*Rates last publicly confirmed 2026-04-15. The 2026-05-13 verification found the Voiceflow pricing page redirects users to a demo or agency free trial rather than listing tier prices. Use the numbers above as a buyer's reference baseline only; confirm against a written sales quote. Credits are per conversation turn, so high-traffic agents burn the allowance fast. LLM API calls are billed separately through the customer's own provider keys. External telephony fees for voice deployments apply separately.*

## Against the alternatives

| | Voiceflow | [Langflow](/tools/langflow/) | [n8n](/tools/n8n/) | Dedicated support platforms |
|---|---|---|---|---|
| **Focus** | Conversation design | LangChain LLM flows | General automation | Full help-desk suite |
| **Canvas** | Visual, conversation-specific | Visual, LangChain-shaped | Visual, general | Varies |
| **Knowledge-base RAG** | Native | Native via retriever nodes | Native via vector store nodes | Usually native |
| **Channel plumbing** | Web, Slack, WhatsApp, Teams, voice | None (build your own) | None (build your own) | Usually native |
| **Code escape hatch** | API calls, webhooks | Python nodes | JS + Python nodes | Varies |
| **Best viewed as** | No-code conversation specialist | LangChain prototyping | Ops automation | Full customer-support platform |

## Failure modes

- **No public pricing.** As of May 2026 Voiceflow's pricing page no longer lists Sandbox, Pro, or Teams tier rates. Buyers should expect a demo-gated quote process and confirm credit allowances, editor seat costs, voice concurrency, and overage rates in writing before signing.
- **Credit model compounds with LLM costs.** Voiceflow charges per conversation turn; the customer also pays OpenAI or Anthropic for the tokens. Two meters on one conversation.
- **Per-editor pricing stacks.** Sandbox includes one editor. Every additional editor on Pro is $50/month. Teams of five run $200/month in seats alone before usage.
- **Visual canvas ceilings on complex logic.** Agents that need tight branching, deep state machines, or intricate tool orchestration often outgrow the canvas. Engineers end up wishing they had [Langflow](/tools/langflow/) or LangGraph.
- **Knowledge-base quality depends on the documents.** RAG performance tracks the cleanliness of uploaded content. Messy, outdated, or poorly structured source material produces weak answers.
- **Voice requires external telephony.** No built-in phone carrier. Voice deployments bolt on through Twilio or similar. Another bill, another integration.
- **5,000 interactions on Pro fills fast.** A moderately trafficked FAQ bot can burn through the Pro credit allowance in days. Teams upgrade to stay within caps.
- **Not a general automation tool.** Teams that bought Voiceflow hoping to run broader ops workflows end up pairing it with [n8n](/tools/n8n/) or [Make](/tools/make/).

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-05-13 against [Voiceflow pricing](https://www.voiceflow.com/pricing) and the [Voiceflow documentation](https://docs.voiceflow.com/). Public pricing tiers are no longer displayed on the vendor page; rates shown reflect the last publicly confirmed numbers (2026-04-15) and should be verified against a sales quote.

## FAQ

**Is Voiceflow free?**
Yes. A free agency trial is available with no credit card. Historically the Sandbox plan provided 1,000 credits/month, 2 agents, and 1 editor seat with GPT-3.5 access. Confirm current free-tier limits during the demo flow at [Voiceflow pricing](https://www.voiceflow.com/pricing).

**How much does Voiceflow cost?**
Pricing is no longer published on the vendor's public page as of May 2026; Voiceflow has shifted to demo-gated, usage-based quotes. Last publicly confirmed rates (April 2026): Pro at $60/editor/month with 10,000 credits and Teams at $150/editor/month with 30,000 credits. Extra editor seats historically ran $50/month. LLM API costs bill separately ([Voiceflow pricing](https://www.voiceflow.com/pricing)).

**How does Voiceflow's knowledge base work?**
Upload documents, PDFs, or URLs. When a user asks a question, Voiceflow retrieves relevant chunks and uses an LLM to generate a grounded answer. Retrieval-augmented generation reduces hallucination compared to pure LLM responses.

**Voiceflow vs Dialogflow?**
Voiceflow is LLM-native and ships modern RAG tooling. Dialogflow is Google's older intent-based platform, better suited to scripted bots and Google Cloud integration. Teams building OpenAI frontier models or Claude Opus 4.7 agents usually pick Voiceflow.

**Can Voiceflow handle general workflow automation?**
Not really. Voiceflow is purpose-built for conversation. For CRM sync, form processing, or cross-SaaS automation, pair Voiceflow with [n8n](/tools/n8n/) or [Make](/tools/make/).

## Sources

- [Voiceflow pricing](https://www.voiceflow.com/pricing): current plan rates and credit limits
- [Voiceflow documentation](https://docs.voiceflow.com/): canvas, knowledge base, deployment
- [Voiceflow product site](https://www.voiceflow.com): channel support and feature overview

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
- **See also:** [n8n](/tools/n8n/) · [Zapier](/tools/zapier/) · [Make](/tools/make/) · [Langflow](/tools/langflow/)
