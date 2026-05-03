---
type: tool
slug: relevance-ai
title: Relevance AI
tagline: No-code AI workforce platform for building agents that reason and act, billed on Actions plus separate Vendor Credits.
category: ai-automation
company: relevance-ai
url: https://relevanceai.com
pricing_model: freemium
price_range: "$0 · Pro from $19/mo (annual) · Team from $234/mo · Enterprise custom"
status: active
launched: 2023-06
last_updated: 2026-05-03
last_verified: 2026-05-03
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 7
  value: 6
  moat: 5
  longevity: 6
tags: [ai-agents, no-code, agent-builder, llm, workflow, drag-and-drop, automation, rag, ai-workforce]
seo_title: "Relevance AI: Features, Pricing & Review (April 2026)"
meta_description: "Relevance AI is a no-code AI workforce platform. Free tier with 200 actions/mo; Pro $19/mo annual; Team $234/mo; Enterprise custom. Split pricing: Actions plus Vendor Credits since September 2025."
author: "aipedia.wiki Editorial"
best_for:
  - non-technical teams building sales or support agents
  - agencies deploying AI workforce tools for clients
  - business teams prototyping assistants without engineers
  - ops managers automating judgment work, not just data routing
not_best_for:
  - engineering teams needing maximum control
  - teams relying on extensive pre-built SaaS integrations
  - mission-critical workflows with zero tolerance for drift
  - cost-predictable budgets (credit system is opaque)
quick_answer: >-
  Relevance AI is a no-code platform for building AI workforce agents that reason and decide. Free tier has 200 actions per month. Pro is $19/mo annual, Team $234/mo, Enterprise custom. Pricing splits Actions from Vendor Credits. Pick it for non-technical teams shipping sales or support bots; skip for engineering depth or predictable unit economics.
---

# Relevance AI

Relevance AI is a no-code AI workforce platform built by Relevance AI Pty Ltd. Drag-and-drop tools and agents run on Claude, OpenAI frontier models, or Gemini 3.1 Pro within the same workflow.

Since September 2025, pricing splits into Actions (what the agent does) and Vendor Credits (LLM model costs). That split changes the cost calculus versus flat-token platforms.

## System Verdict

> **Pick Relevance AI if a non-technical team needs AI agents that make judgment calls, not just shuffle data between apps.** The sweet spot is sales qualification, support triage, and lead research. Built-in OCR, classify, and extract tools cover most business agent patterns without code.
>
> **Skip it if you need engineering-grade control or predictable unit costs.** The Actions plus Vendor Credits split is transparent on paper and opaque in practice. Complex agents with multiple decision branches burn credits faster than flat-rate alternatives.
>
> **Who pays which tier:** Free for proof-of-concept. Pro at $19/mo for solo operators or tight prototypes. Team at $234/mo for small sales or support pods. Enterprise for custom models, SSO, and contractual SLAs.

## Key Facts

| | |
|---|---|
| **Category** | No-code AI workforce builder |
| **Launch** | 2023-06 |
| **Pricing model** | Actions (agent steps) + Vendor Credits (LLM tokens), split since Sept 2025 |
| **Free tier** | 200 actions/mo · $2 bonus Vendor Credits |
| **Pro tier** | $19/mo billed annually · 30,000 actions/yr · $240 Vendor Credits/yr |
| **Team tier** | $234/mo annually · 84,000 actions/yr · $840 Vendor Credits/yr · 5 build + 45 end users |
| **Enterprise** | Custom · custom models, SSO, dedicated support |
| **Model support** | Claude Opus 4.7 · OpenAI frontier models · Gemini 3.1 Pro · multi-model routing |
| **Built-in tools** | OCR · Classify · Extract · web scrape · PDF parse · email |
| **Annual discount** | ~33% off monthly rates |

Every data point above was verified against vendor sources on 2026-04-17. See Sources.

## What it actually is

A visual builder for composable AI tools and agents. A "tool" is an atomic action like Extract, Classify, or OCR. An "agent" wires tools into a goal-seeking loop with branching, memory, and RAG.

Agents deploy as chatbot widgets, REST endpoints, or scheduled background jobs. Multi-model routing lets one agent call Claude for reasoning, GPT for generation, and Gemini for multimodal in the same run.

The moat is the no-code UX and the opinionated agent primitives, not the underlying LLMs. Anyone with an API key can replicate the tools. Relevance AI bets non-technical teams pay for the integration cut.

## When to pick Relevance AI

- **Sales ops without engineers.** Lead scoring, qualification, and outbound research agents ship in hours.
- **Support triage with judgment.** Classify incoming tickets, draft responses, escalate when confidence is low.
- **Agency client work.** Ship AI tools for a client without standing up infrastructure.
- **Workforce agents that handle documents.** OCR plus Extract plus Classify is the backbone of invoice, contract, and resume workflows.
- **Mixed model routing.** Single agent that calls Claude for analysis and OpenAI frontier models for drafting without custom plumbing.

## When to pick something else

- **Developer-grade agent framework:** [CrewAI](/tools/crewai/) or [Letta](/tools/letta/) for Python-native control.
- **General app-to-app automation with huge SaaS catalog:** [Zapier](/tools/zapier/) or [n8n](/tools/n8n/).
- **Voice-first conversational agents:** [Voiceflow](/tools/voiceflow/).
- **Visual LangChain-style agent flows:** [Langflow](/tools/langflow/).
- **Predictable per-seat pricing:** [Zapier](/tools/zapier/) tiers are easier to model than split credits.

## Pricing

| Plan | Price (annual) | Actions | Vendor Credits | Users |
|------|----------------|---------|----------------|-------|
| Free | $0/mo | 200/mo | $2 bonus | 1 user, 1 project |
| Pro | $19/mo | 30,000/yr | $240/yr | 1 user |
| Team | $234/mo | 84,000/yr | $840/yr | 5 build + 45 end users |
| Enterprise | Custom | Custom | Custom | Unlimited seats |

*Prices verified 2026-04-17 via [Relevance AI pricing](https://relevanceai.com/pricing) and [Lindy pricing analysis](https://www.lindy.ai/blog/relevance-ai-pricing). Annual billing saves about 33% versus monthly. All plans include unlimited agents and tools.*

Actions are agent steps. Vendor Credits are consumed by the LLM call itself. Complex branching agents burn both faster than simple linear chains.

## Against the alternatives

| | Relevance AI | [CrewAI](/tools/crewai/) | [Zapier](/tools/zapier/) |
|---|---|---|---|
| **Audience** | Non-technical ops/sales | Python developers | Mixed, app-automation-first |
| **Abstraction** | Visual tools + agents | Role-based crews | Triggers + Zaps |
| **Agents that reason** | Yes, native | Yes, code-defined | Limited via AI Actions |
| **SaaS integrations** | Narrow | None (you build) | Broadest in the category |
| **Cost predictability** | Low (split credits) | Medium (LLM tokens only) | High (per-task) |
| **Enterprise controls** | Yes at Enterprise tier | Yes at Ultra tier | Yes at Enterprise |
| **Best viewed as** | AI workforce builder | Developer agent framework | App automation platform |

## Failure modes

- **Credit system is opaque.** Predicting per-run cost needs manual calibration. Multi-branch agents with retries can spike usage by 5x versus happy-path tests.
- **Narrow SaaS integration library.** API calls work, but there is no Zapier-scale app catalog. Integrating with a niche CRM means writing the REST call yourself.
- **Agent quality depends on prompt craft.** The visual builder lowers the floor, not the ceiling. Bad prompts still ship bad agents.
- **Production reliability is a DIY concern.** Agents drift, loop, or fail silently without human-in-the-loop. Enterprise tier adds audit, not guaranteed determinism.
- **Smaller ecosystem.** Fewer templates, fewer tutorials, thinner community than CrewAI, LangChain, or Zapier.
- **Free tier is demo-sized.** 200 actions a month is enough to test, not enough to run a real workflow.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [Relevance AI pricing](https://relevanceai.com/pricing), [Relevance AI documentation](https://relevanceai.com/docs/get-started/subscriptions/plans), and [Lindy's Relevance AI pricing breakdown](https://www.lindy.ai/blog/relevance-ai-pricing).

## FAQ

**Is Relevance AI free?**
Yes. The Free tier gives 200 actions per month plus $2 in Vendor Credits. It fits demos and early prototypes. Sustained use requires Pro at $19/mo annual or higher.

**How does Relevance AI pricing work?**
Since September 2025, pricing splits into Actions (agent steps) and Vendor Credits (LLM token costs). Every plan grants a pool of each per year. Annual billing saves roughly 33% over monthly. All plans include unlimited agents and tools.

**Relevance AI vs CrewAI?**
Relevance AI targets non-technical teams through a drag-and-drop builder. [CrewAI](/tools/crewai/) targets Python developers through a role-based framework. Pick Relevance AI when business users own the agent; pick CrewAI when engineers own it.

**Does Relevance AI handle OCR and document extraction?**
Yes. OCR, Classify, and Extract are built-in primitives. Combining them with a knowledge base RAG store covers most document-intelligence workflows without code.

**Can Relevance AI use multiple LLMs in one agent?**
Yes. Multi-model routing lets a single agent call Claude Opus 4.7 for reasoning, OpenAI frontier models for generation, and Gemini 3.1 Pro for multimodal tasks within the same workflow.

## Sources

- [Relevance AI pricing page](https://relevanceai.com/pricing): Current tiers, Actions, Vendor Credits
- [Relevance AI docs: plans and credits](https://relevanceai.com/docs/get-started/subscriptions/plans): Action and credit definitions
- [Lindy: Relevance AI pricing 2026](https://www.lindy.ai/blog/relevance-ai-pricing): Independent pricing breakdown
- [G2: Relevance AI pricing](https://www.g2.com/products/relevance-ai/pricing): Third-party verification

## Related

- **Category:** [AI Automation](/categories/ai-automation/)
