---
type: tool
slug: lm-studio
title: LM Studio
tagline: Free desktop app for running open-weight LLMs locally. Visual model browser, one-click download, v1 REST API, OpenAI- and Anthropic-compatible endpoints, MCP support, CLI/headless daemon, and LM Link for remote instances.
category: ai-chatbots
company: lm-studio
url: https://lmstudio.ai
github_url: https://github.com/lmstudio-ai/lms
pricing_model: free
price_range: "$0 home and work use"
status: active
launched: 2023-05
last_updated: 2026-06-23
last_verified: 2026-06-23
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
    value: "Best for desktop users and developers who want a GUI for downloading, chatting with, and serving local open-weight models without a cloud account."
    source: https://lmstudio.ai/
    source_label: LM Studio official site
    source_id: lm-studio-official
    verified_at: '2026-06-23'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-08'
  pricing_anchor:
    value: "LM Studio is free for both home and work use, so commercial-license friction is gone for ordinary desktops; Enterprise is the route for SSO, model/MCP gating, and private collaboration."
    source: https://lmstudio.ai/
    source_label: LM Studio official site
    source_id: lm-studio-official
    verified_at: '2026-06-23'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-08'
  local_runtime:
    value: "The product's main buying criterion is local runtime fit: hardware support, quantized model availability, context length, and privacy posture."
    source: https://lmstudio.ai/docs
    source_label: LM Studio documentation
    source_id: lm-studio-docs
    verified_at: '2026-06-23'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-08'
  api_available:
    value: "LM Studio exposes a v1 local REST API, OpenAI-compatible Responses/Chat/Embeddings endpoints, Anthropic Messages-compatible endpoints, MCP support, SDKs, CLI server control, and headless `llmster` daemon path."
    source: https://lmstudio.ai/docs/api
    source_label: LM Studio developer docs
    source_id: lm-studio-api-docs
    verified_at: '2026-06-23'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-08'
  watch_out_for:
    value: "Local inference quality and speed depend on the selected model and the user's CPU/GPU/RAM; LM Studio does not make every frontier-model workload cheap or private by default."
    source: https://lmstudio.ai/docs
    source_label: LM Studio documentation
    source_id: lm-studio-docs
    verified_at: '2026-06-23'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-08'
tags: [local-llm, desktop-app, gui, open-source-models, inference, privacy, developer]
seo_title: "LM Studio: Features, Pricing & Review (June 2026)"
meta_description: "LM Studio is the free desktop GUI for running open-weight LLMs locally, with a v1 REST API, OpenAI- and Anthropic-compatible endpoints, MCP support, SDKs, CLI server control, and LM Link."
author: "aipedia.wiki Editorial"
best_for:
  - desktop users who want local LLMs without CLI
  - trying many models and quantizations quickly
  - Mac and Windows users new to local AI
  - privacy-first AI workflows
not_best_for:
  - server deployments (use Ollama)
  - users without capable hardware
  - enterprise production inference
quick_answer: >-
  LM Studio is the free desktop app that makes running open-weight LLMs on your laptop a fast setup. The June 23 check keeps it in the GUI-first local LLM lane, but the developer story is stronger now: v1 REST API, OpenAI-compatible Responses/Chat/Embeddings endpoints, Anthropic-compatible Messages, MCP support, SDKs, CLI server control, and a headless daemon path. Pick it for a GUI alternative to Ollama; skip it when you need fully open-source app code or production fleet governance.
---

# LM Studio

A desktop application that wraps local open-weight model running in a visual interface. Download from [lmstudio.ai](https://lmstudio.ai), install, search for a model, click to download, start chatting, then expose the model through local APIs if you need developer access. For users who want local LLMs without starting in a terminal, this is still the category default.

## Recent developments

- **April 28, 2026:** [Mistral 3 shipped as an open-weight release](/news/2026-04-28-mistral-3-open-model-release/). The new weights appear in the LM Studio model browser alongside Llama 4, Qwen 3, Gemma 4, and GPT-OSS, broadening the GGUF options worth benchmarking on consumer hardware.
- **April 30, 2026:** [Apple said AI and agentic tools helped drive unexpected Mac demand](/news/2026-04-30-apple-mac-ai-agent-demand/). If more users buy Macs for local AI, GUI-first model runners like LM Studio become the easier on-ramp than terminal-only stacks.
- **June 23, 2026:** Official site and docs still list free home/work use, v1 REST API, OpenAI-compatible Responses and Chat Completions, Anthropic-compatible Messages, MCP support, TypeScript/Python SDKs, `lms` CLI server control, and headless `llmster` daemon installs. The free-for-work announcement also points enterprises with SSO, model/MCP gating, or private collaboration needs to contact sales.

## System Verdict

> **Pick LM Studio if you want the easiest path to local LLMs on a desktop.** The visual model browser is genuinely helpful when you're choosing between quantizations. Chat interface, model downloads, v1 REST endpoints, OpenAI-compatible and Anthropic-compatible local APIs, MCP support, and LM Link all ship in one application. Mac, Windows, Linux builds. LM Link lets you connect a thin client to a beefier machine across the network.
>
> **Skip it if your workflow is CLI-native, fully open-source, or production-server-first.** [Ollama](/tools/ollama/) remains cleaner for many headless/server scripts. LM Studio's `lms` and `llmster` options reduce the gap, but the desktop app itself is still closed-source freeware.
>
> **Free for home and work use, period.** LM Studio dropped the separate commercial-license requirement in July 2025, and the June 8, 2026 check found no paid tier replacing it. No tier system, no features behind a paywall, no sales contact needed for ordinary business desktops.

## Key Facts

| | |
|---|---|
| **Current API generation** | Native v1 REST API at `/api/v1/*`; v0 docs are now legacy |
| **Platforms** | macOS (Apple Silicon + Intel), Windows, Linux, headless server mode |
| **Cost** | $0 for home and work use. No separate commercial license required for ordinary use; Enterprise is sales-led. |
| **Model library** | Hugging Face GGUF catalog. Llama 4, Qwen 3, Gemma 4, Mistral 3, Phi-4, DeepSeek-R1, GPT-OSS, and hundreds more. |
| **Local server** | Native REST API, OpenAI-compatible endpoints, Anthropic Messages compatibility, MCP support |
| **LM Link** | Connect to remote LM Studio instances and load their models as if local |
| **SDKs** | `lmstudio-js` (TypeScript), `lmstudio-python`, REST API, and `lms` CLI |
| **Quantizations** | Q2 through Q8 selectable per model; Q4_K_M default |
| **UI features** | Chat interface, model browser with GGUF search, system resource monitor, per-model config |

## When to pick LM Studio

- **Desktop-first users.** You want a proper GUI, not a terminal. The model browser alone is worth the install.
- **Learning curve for local AI.** Better onboarding than Ollama for users who are new to local inference.
- **Model shopping.** Trying five quantizations of the same model to find the speed-vs-quality sweet spot on your hardware is a 2-click operation in LM Studio.
- **Non-technical users.** Friends and family who want ChatGPT-like chat without sending data to anyone.

## When to pick something else

- **Servers and scripting:** [Ollama](/tools/ollama/) is the better fit for headless deployments, Docker containers, and CI/CD.
- **Frontier-model quality:** Open-weight models (even Llama 4 Scout for long-context work) still trail [ChatGPT](/tools/chatgpt/) and [Claude](/tools/claude/) on the hardest assistant, writing, and coding-judgment tasks.
- **Multi-user deployments:** LM Studio is single-user desktop. For teams, use [AnythingLLM](/tools/anythingllm/) or a hosted open-weight provider like Together AI.

## Pricing

| Plan | Price | Notes |
|---|---|---|
| Home and work use | $0 | Ordinary home and work use, no separate commercial license required |
| Enterprise | Contact sales | SSO, model/MCP gating, and private collaboration for governed deployments |

Verified 2026-06-23 via [lmstudio.ai](https://lmstudio.ai) and the official free-for-work announcement. The terms shifted in July 2025 to drop the prior "contact us for commercial" gating for ordinary work use; review the [LM Studio Terms of Use](https://lmstudio.ai/app-terms) before redistribution, embedding, or fleet-scale deployment.

## Failure modes

- **Low-RAM machines struggle with big models.** 70B-parameter models need ~40GB at Q4. 16GB laptops max out around 13B models. Check the LM Studio resource monitor before downloading.
- **Slower than cloud providers.** A local 70B model at Q4 on an M3 Max runs at roughly 15 tokens/second. OpenAI frontier models via API run at 60+. The privacy/cost tradeoff costs speed.
- **Read the terms before mass deployment.** LM Studio dropped its commercial-license gate in July 2025, but redistribution, embedding LM Studio inside a sold product, or large fleet rollouts can still hit specific clauses worth confirming.
- **Not open source itself.** The LM Studio application is closed-source freeware, even though the models it runs are open-weight. Compare to Ollama, which is fully open source.

## Against the alternatives

| | LM Studio | Ollama | Jan.ai |
|---|---|---|---|
| **UI style** | Full desktop GUI | CLI + optional 3rd-party GUIs | Full desktop GUI |
| **Install effort** | GUI installer | 1-line CLI | GUI installer |
| **Open source** | No (free home + work use) | Yes | Yes |
| **Best for** | GUI-first users new to local AI | CLI / server deployments | Privacy-first desktop |
| **Model catalog** | Hugging Face GGUF | Ollama library + import | Hugging Face + local |

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-06-23 against [lmstudio.ai](https://lmstudio.ai), the [LM Studio developer docs](https://lmstudio.ai/docs/api), the [LM Studio REST API docs](https://lmstudio.ai/docs/developer/rest), the [local server docs](https://lmstudio.ai/docs/developer/core/server), the [desktop app terms](https://lmstudio.ai/app-terms), and the [free-for-work announcement](https://lmstudio.ai/blog/free-for-work).

## FAQ

**Is LM Studio really free?**
Yes. The official July 2025 change removed the separate commercial-license requirement for ordinary work use, so normal business desktops no longer need a sales conversation. Redistribution and embedding LM Studio inside a sold product are still worth checking against the [Terms of Use](https://lmstudio.ai/terms).

**What hardware do I need?**
16GB RAM minimum for 7B models at Q4. 32GB for 13B-30B. Apple Silicon Macs punch above their weight due to unified memory. A discrete Nvidia GPU dramatically accelerates large models.

**How is LM Studio different from Ollama?**
Same broad local-model job, different buyer shape. LM Studio is GUI-first and desktop-focused, and its current docs expose a native v1 REST API, Anthropic-compatible endpoints, OpenAI-compatible Responses/Chat/Embeddings endpoints, MCP support, and LM Link. [Ollama](/tools/ollama/) stays CLI-first with a lightweight HTTP server, which is still better for many scripting and server deployments.

**Does LM Studio support Llama 4 Scout's 10M context window?**
Yes, provided you have the RAM. 10M tokens at Q4 needs ~80GB. Most users stick to shorter contexts on consumer hardware.

**What is LM Link?**
A 2026 feature that lets one LM Studio install act as a thin client against another LM Studio install across the network: load the remote machine's models and use them as if they were local. Useful when the heavy GPU sits in a desk tower and you want to drive it from a laptop.

## Sources

- [LM Studio official site](https://lmstudio.ai): product positioning and free home/work use
- [LM Studio developer docs](https://lmstudio.ai/docs/api): SDKs, REST API, OpenAI-compatible and Anthropic-compatible endpoints
- [LM Studio REST API docs](https://lmstudio.ai/docs/developer/rest): v1 REST API and endpoint comparison
- [LM Studio local server docs](https://lmstudio.ai/docs/developer/core/server): local server and `lms` CLI setup
- [LM Studio free-for-work announcement](https://lmstudio.ai/blog/free-for-work): commercial-use policy change and Enterprise route
- [LM Studio desktop app terms](https://lmstudio.ai/app-terms): desktop app terms for redistribution and governed deployment review

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/)
- **Compare:** LM Studio vs [Ollama](/tools/ollama/)
- **See also:** [Llama 4](/tools/llama/) · [AnythingLLM](/tools/anythingllm/)
