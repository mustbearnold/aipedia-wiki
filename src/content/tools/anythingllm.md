---
type: tool
slug: anythingllm
title: AnythingLLM
tagline: Open-source all-in-one AI desktop app with document chat, agents, and multi-user support. Free self-hosted; cloud from $50/mo. Best enterprise-grade local-first RAG option.
category: ai-chatbots
company: mintplex-labs
url: https://anythingllm.com
github_url: https://github.com/Mintplex-Labs/anything-llm
pricing_model: freemium
price_range: "$0 self-hosted / $50-$99/mo cloud"
status: active
launched: 2023-06
last_updated: 2026-06-01
last_verified: 2026-06-01
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 10
  moat: 7
  longevity: 8
facts:
  best_for:
    value: Best for teams that want a local-first or self-hostable document-chat, RAG, and agent workspace with broad model-provider
      choice.
    source: https://anythingllm.com/
    source_label: AnythingLLM official site
    source_id: anythingllm-official
    verified_at: '2026-06-01'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  pricing_anchor:
    value: AnythingLLM has hosted cloud pricing, but self-hosting changes the real cost model to infrastructure, model/API spend,
      and admin time.
    source: https://anythingllm.com/pricing
    source_label: AnythingLLM hosted cloud pricing
    source_id: anythingllm-pricing
    verified_at: '2026-06-01'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  open_source_or_local:
    value: The GitHub repository is the key proof point for open-source/self-managed evaluation.
    source: https://github.com/Mintplex-Labs/anything-llm
    source_label: AnythingLLM GitHub repository
    source_id: anythingllm-repository
    verified_at: '2026-06-01'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  runtime_architecture:
    value: Docs should be checked for connector, workspace, vector database, agent, and deployment assumptions before enterprise
      rollout.
    source: https://docs.anythingllm.com/
    source_label: AnythingLLM docs
    source_id: anythingllm-docs
    verified_at: '2026-06-01'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  watch_out_for:
    value: AnythingLLM is attractive when data locality matters, but buyers must own model selection, retrieval quality, permissions,
      backups, and security hardening if self-hosting.
    source: https://docs.anythingllm.com/
    source_label: AnythingLLM docs
    source_id: anythingllm-docs
    verified_at: '2026-06-01'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
tags: [rag, self-hosted, open-source, document-chat, agents, privacy, enterprise, mit-licensed]
seo_title: "AnythingLLM: Features, Pricing & Review (June 2026)"
meta_description: "AnythingLLM is an MIT-licensed open-source AI desktop + server app with document chat, agents, and multi-user support. Free self-hosted; cloud $50-$99/mo. Best for privacy-first enterprise RAG."
author: "aipedia.wiki Editorial"
best_for:
  - teams that need self-hosted document chat
  - privacy-first or regulated industries
  - developers building RAG applications
  - small to mid-size companies avoiding per-seat SaaS pricing
not_best_for:
  - individuals who just want one-off PDF chat (use ChatPDF)
  - teams that don't want to manage infrastructure
  - users without Docker or self-hosting experience
quick_answer: >-
  AnythingLLM is an open-source MIT-licensed desktop and server app for chat-with-your-documents workflows. Free self-hosted, or cloud tiers at $50/mo (Basic, under 5 users / under 100 docs) and $99/mo (Pro, with 72-hour support SLA). Handles document chat, AI agents, and multi-user workspaces. Pick it for privacy-first or enterprise self-hosted deployments. Skip it for casual single-user PDF chat where ChatPDF is simpler.
price_history:
  - date: 2026-05-13
    plan: "Cloud Basic / Pro"
    price: "$50 / $99 per mo"
    source: "https://anythingllm.com/pricing"
    source_label: "Source"
    source_id: anythingllm-pricing
    note: "Cloud tiers verified. Basic ($50/mo) is for individuals or teams under 5 users with under 100 documents. Pro ($99/mo) adds a 72-hour support SLA. Enterprise is custom (on-prem option)."
  - date: 2026-06-01
    plan: "Cloud Basic / Pro"
    price: "$50 / $99 per mo"
    source: "https://anythingllm.com/cloud"
    source_label: "AnythingLLM cloud pricing"
    source_id: anythingllm-pricing
    note: "Cloud page still exposes Basic at $50/month, Pro at $99/month, and Enterprise custom. GitHub releases page shows v1.13.0 as the current release."
---

# AnythingLLM

Built by Mintplex Labs (YC). An MIT-licensed open-source application that combines document chat, AI agents, and multi-user workspace management in one deployable unit. Runs as a desktop app (macOS, Windows, Linux) or a Docker container on your own server.

## System Verdict

> **Pick AnythingLLM if you need self-hosted document chat or a multi-user RAG platform.** The MIT license gives you full flexibility to modify and deploy. Bring your own LLM (OpenAI, Claude, Ollama local, any provider), bring your own vector DB, and you have a production-grade document-chat stack with no vendor lock-in.
>
> **Skip it if you're a solo user with a single PDF.** [ChatPDF](/tools/chatpdf/) is one click. If you just need "talk to this one document," AnythingLLM is over-engineered for the task.
>
> **Who pays for cloud:** Individuals or small teams (under 5 users, under 100 documents) take Basic at $50/mo for a private hosted instance. Startups and larger teams buy Pro at $99/mo with a 72-hour support SLA. Enterprise (on-premise install, custom SLA, custom domain, custom integration) is by contract. Most cost-conscious teams should still self-host the free open-source version.

## Key Facts

| | |
|---|---|
| **License** | MIT (fully open source) |
| **Platforms** | Desktop (macOS, Windows, Linux), Docker, cloud |
| **Self-hosted cost** | $0 |
| **Cloud tiers** | Basic $50/mo (under 5 users, under 100 docs), Pro $99/mo (72-hour support SLA), Enterprise custom (on-prem) |
| **LLM support** | OpenAI, Anthropic, Google, Ollama (local), Groq, Together, and any OpenAI-compatible endpoint |
| **Vector DB support** | LanceDB (default), Pinecone, Weaviate, Chroma, Qdrant, and more |
| **Document formats** | PDF, DOCX, TXT, MD, HTML, CSV, JSON, many more |
| **Agent capabilities** | Web search, code execution, custom skills via extensible agent framework |

## When to pick AnythingLLM

- **Regulated industries.** Legal, medical, financial, government workflows where documents cannot leave your infrastructure. Self-host + Ollama locally = fully air-gapped.
- **Small-to-mid team RAG.** Per-seat SaaS pricing gets expensive fast. $50/mo AnythingLLM Cloud Basic covers a team of under 5 cheaper than ChatGPT Team ($30/user) once seat count crosses two.
- **Developer RAG prototypes.** Open source + extensible = fast iteration. Build your production RAG on top of AnythingLLM's workspace model.
- **Multi-model workflows.** Point the same app at OpenAI for deep analysis, Ollama for cheap bulk, and Claude for reasoning tasks. No subscription juggling.

## When to pick something else

- **Solo casual users:** [ChatPDF](/tools/chatpdf/) or [NotebookLM](/tools/notebooklm/) for occasional document chat. AnythingLLM is a platform; those are focused tools.
- **Hands-off SaaS:** [Humata](https://humata.ai) or ChatPDF if running Docker is not something you want to do.
- **Enterprise SaaS with built-in compliance:** [Glean](https://www.glean.com) or similar if you want a vendor-managed enterprise knowledge platform, not self-hosted.

## Pricing

| Plan | Price | What's included |
|---|---|---|
| Self-hosted | $0 | Everything. MIT license. Bring your own LLM + vector DB. |
| Cloud Basic | $50/mo | Private instance, custom subdomain, RAG and agents. Individuals or teams under 5 users with under 100 documents. |
| Cloud Pro | $99/mo | Private instance, RAG and agents, 72-hour support SLA. Startups and larger teams. |
| Enterprise | Custom | On-premise install, custom SLA, custom domain, custom integration. Large companies. |

Prices verified 2026-06-01 via [anythingllm.com/cloud](https://anythingllm.com/cloud).

## Failure modes

- **Self-hosting has real ops overhead.** You manage Docker, updates, vector DB, LLM API keys, backups. If you don't have ops capacity, pay for cloud or pick a SaaS competitor.
- **Setup is not one-click for server deployments.** Desktop app is easy; Docker server requires reading docs and configuring environment variables.
- **Default LLM is whatever you configure.** Quality depends entirely on the backing model. Pair with a strong hosted model from OpenAI, Anthropic Claude, Google Gemini, or a strong local model for good results.
- **Community support model.** Fewer paid support options than enterprise SaaS competitors. Discord + GitHub issues for most users.
- **Vector DB choice affects performance.** Default LanceDB is fine for small corpora. For 100k+ documents, switch to Pinecone or Qdrant.

## Against the alternatives

| | AnythingLLM | ChatPDF | NotebookLM | Glean |
|---|---|---|---|---|
| **Open source** | Yes (MIT) | No | No | No |
| **Self-hosted** | Yes | No | No | Enterprise only |
| **Multi-document** | Yes | Plus only | Yes | Yes |
| **Agent framework** | Yes | No | No | Limited |
| **Pricing model** | Free or $50-99/mo | $19.99/mo | Free (gated by Google account) | Enterprise sales |
| **Best for** | Self-hosted RAG | Quick PDF chat | Google-aligned research | Enterprise search |

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-06-01 against [anythingllm.com/cloud](https://anythingllm.com/cloud) and the [GitHub repo](https://github.com/Mintplex-Labs/anything-llm).

## FAQ

**Is AnythingLLM really free?**
Yes, under MIT license. Full source on GitHub. You can use, modify, and deploy commercially without restriction. Cloud tiers are optional for teams that don't want to self-host.

**Do I need Docker to run it?**
Desktop app does not need Docker. Server deployments (for team workspaces) are Docker-based. Docker Compose file is published in the repo.

**Which LLM should I use with it?**
Depends on your workload. [Claude](/tools/claude/) or [ChatGPT](/tools/chatgpt/) for highest hosted-model quality. [Ollama](/tools/ollama/) with a capable local model for privacy or cost. [Groq](https://groq.com) for speed. AnythingLLM lets you switch per workspace.

**How does it compare to RAG frameworks like LlamaIndex or LangChain?**
Those are libraries; AnythingLLM is an app. If you're building a custom RAG pipeline from scratch, use LlamaIndex or LangChain. If you want a working RAG product to configure and use, pick AnythingLLM.

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Research](/categories/ai-research/)
- **See also:** [ChatPDF](/tools/chatpdf/) · [NotebookLM](/tools/notebooklm/) · [Ollama](/tools/ollama/)
