---
type: tool
slug: anythingllm
title: AnythingLLM
tagline: Open-source all-in-one AI desktop app with document chat, agents, and multi-user support. Free self-hosted; cloud from $25/mo. Best enterprise-grade local-first RAG option.
category: ai-chatbots
company: mintplex-labs
url: https://anythingllm.com
github_url: https://github.com/Mintplex-Labs/anything-llm
pricing_model: freemium
price_range: "$0 self-hosted / $25-$99/mo cloud"
status: active
launched: 2023-06
last_updated: 2026-04-18
last_verified: 2026-04-18
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
tags: [rag, self-hosted, open-source, document-chat, agents, privacy, enterprise, mit-licensed]
seo_title: "AnythingLLM: Features, Pricing & Review (April 2026)"
meta_description: "AnythingLLM is an MIT-licensed open-source AI desktop + server app with document chat, agents, and multi-user support. Free self-hosted; cloud $25-$99/mo. Best for privacy-first enterprise RAG."
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
  AnythingLLM is an open-source MIT-licensed desktop and server app for chat-with-your-documents workflows. Free self-hosted, or cloud tiers at $25/mo (small teams) and $99/mo (large teams). Handles document chat, AI agents, and multi-user workspaces. Pick it for privacy-first or enterprise self-hosted deployments. Skip it for casual single-user PDF chat where ChatPDF is simpler.
---

# AnythingLLM

Built by Mintplex Labs (YC). An MIT-licensed open-source application that combines document chat, AI agents, and multi-user workspace management in one deployable unit. Runs as a desktop app (macOS, Windows, Linux) or a Docker container on your own server.

## System Verdict

> **Pick AnythingLLM if you need self-hosted document chat or a multi-user RAG platform.** The MIT license gives you full flexibility to modify and deploy. Bring your own LLM (OpenAI, Claude, Ollama local, any provider), bring your own vector DB, and you have a production-grade document-chat stack with no vendor lock-in.
>
> **Skip it if you're a solo user with a single PDF.** [ChatPDF](/tools/chatpdf/) is one click. If you just need "talk to this one document," AnythingLLM is over-engineered for the task.
>
> **Who pays for cloud:** Small teams who want AnythingLLM's workspace model without running Docker. Large teams buying $99/mo with SSO and compliance needs. Most cost-conscious teams should self-host the free open-source version.

## Key Facts

| | |
|---|---|
| **License** | MIT (fully open source) |
| **Platforms** | Desktop (macOS, Windows, Linux), Docker, cloud |
| **Self-hosted cost** | $0 |
| **Cloud tiers** | Small team $25/mo (4GB storage), Large team $99/mo, Enterprise custom |
| **LLM support** | OpenAI, Anthropic, Google, Ollama (local), Groq, Together, and any OpenAI-compatible endpoint |
| **Vector DB support** | LanceDB (default), Pinecone, Weaviate, Chroma, Qdrant, and more |
| **Document formats** | PDF, DOCX, TXT, MD, HTML, CSV, JSON, many more |
| **Agent capabilities** | Web search, code execution, custom skills via extensible agent framework |

## When to pick AnythingLLM

- **Regulated industries.** Legal, medical, financial, government workflows where documents cannot leave your infrastructure. Self-host + Ollama locally = fully air-gapped.
- **Small-to-mid team RAG.** Per-seat SaaS pricing gets expensive fast. $25/mo AnythingLLM Cloud covers a small team cheaper than ChatGPT Team ($30/user).
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
| Cloud Small | $25/mo | 4GB storage, small team, hosted by Mintplex |
| Cloud Large | $99/mo | Larger storage, more users, priority support |
| Enterprise | Custom | SSO, SAML, compliance, dedicated infra |

Prices verified 2026-04-18 via [anythingllm.com/cloud](https://anythingllm.com/cloud).

## Failure modes

- **Self-hosting has real ops overhead.** You manage Docker, updates, vector DB, LLM API keys, backups. If you don't have ops capacity, pay for cloud or pick a SaaS competitor.
- **Setup is not one-click for server deployments.** Desktop app is easy; Docker server requires reading docs and configuring environment variables.
- **Default LLM is whatever you configure.** Quality depends entirely on the backing model. Pair with a strong LLM (GPT-5.4, Claude Opus 4.7, or Llama 4) for good results.
- **Community support model.** Fewer paid support options than enterprise SaaS competitors. Discord + GitHub issues for most users.
- **Vector DB choice affects performance.** Default LanceDB is fine for small corpora. For 100k+ documents, switch to Pinecone or Qdrant.

## Against the alternatives

| | AnythingLLM | ChatPDF | NotebookLM | Glean |
|---|---|---|---|---|
| **Open source** | Yes (MIT) | No | No | No |
| **Self-hosted** | Yes | No | No | Enterprise only |
| **Multi-document** | Yes | Plus only | Yes | Yes |
| **Agent framework** | Yes | No | No | Limited |
| **Pricing model** | Free or $25-99/mo | $19.99/mo | Free (gated by Google account) | Enterprise sales |
| **Best for** | Self-hosted RAG | Quick PDF chat | Google-aligned research | Enterprise search |

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-04-18 against [anythingllm.com/cloud](https://anythingllm.com/cloud) and [GitHub repo](https://github.com/Mintplex-Labs/anything-llm).

## FAQ

**Is AnythingLLM really free?**
Yes, under MIT license. Full source on GitHub. You can use, modify, and deploy commercially without restriction. Cloud tiers are optional for teams that don't want to self-host.

**Do I need Docker to run it?**
Desktop app does not need Docker. Server deployments (for team workspaces) are Docker-based. Docker Compose file is published in the repo.

**Which LLM should I use with it?**
Depends on your workload. [Claude Opus 4.7](/tools/claude/) or [GPT-5.4](/tools/chatgpt/) for highest quality. [Ollama](/tools/ollama/) with Llama 4 for privacy or cost. [Groq](https://groq.com) for speed. AnythingLLM lets you switch per workspace.

**How does it compare to RAG frameworks like LlamaIndex or LangChain?**
Those are libraries; AnythingLLM is an app. If you're building a custom RAG pipeline from scratch, use LlamaIndex or LangChain. If you want a working RAG product to configure and use, pick AnythingLLM.

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Research](/categories/ai-research/)
- **See also:** [ChatPDF](/tools/chatpdf/) · [NotebookLM](/tools/notebooklm/) · [Ollama](/tools/ollama/)
