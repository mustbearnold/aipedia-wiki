---
type: tool
slug: together-ai
title: Together AI
tagline: AI infrastructure platform for serverless inference, dedicated GPU deployments, fine-tuning, code sandboxes, and open-model training workflows.
category: ai-infrastructure
secondary_categories: [ai-coding, ai-automation, ai-chatbots]
company: Together AI
url: https://www.together.ai
pricing_model: paid
price_range: Serverless tokens; dedicated H100 $6.49/hr, H200 contact sales, B200 $11.95/hr; GPU clusters H100 $5.49/hr, H200 $6.79/hr, B200 $9.95/hr; sandbox $0.03/session
status: active
launched: 2022
last_updated: 2026-06-25
last_verified: 2026-06-25
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 8
  moat: 8
  longevity: 8
facts:
  best_for:
    value: "AI infrastructure platform for serverless inference, dedicated GPU deployments, fine-tuning, code sandboxes, and open-model training workflows. Best for AI infrastructure, retrieval, vector search, hosting, or developer platforms."
    source: "https://www.together.ai/pricing"
    source_label: "Together AI pricing"
    source_id: together-ai-pricing
    verified_at: 2026-06-25
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Serverless tokens vary by model (for example Kimi K2.6 $1.20/$4.50, Qwen3.6-Plus $0.50/$3.00, Qwen3 235B throughput $0.20/$0.60, Llama 3.3 70B $1.04/$1.04 per MTok); dedicated inference is H100 $6.49/hr, H200 contact sales, B200 $11.95/hr; GPU clusters are H100 $5.49/hr, H200 $6.79/hr, B200 $9.95/hr."
    source: "https://www.together.ai/pricing"
    source_label: "Together AI pricing"
    source_id: together-ai-pricing
    verified_at: 2026-06-25
    next_review_at: 2026-07-09
    volatility: high
    confidence: high
  watch_out_for:
    value: "Pricing is multi-dimensional: inference per MTok, dedicated GPU per hour, fine-tuning per MTok, sandbox per session, plus storage at $0.16/GiB/month. Model your full bill before migrating production traffic."
    source: "https://www.together.ai/pricing"
    source_label: "Together AI pricing"
    source_id: together-ai-pricing
    verified_at: 2026-06-25
    next_review_at: 2026-07-09
    volatility: high
    confidence: high
tags: [llm-inference, fine-tuning, gpu-cloud, open-models, api, serverless, developers]
seo_title: "Together AI Review: Inference, Fine-Tuning & GPU Pricing (June 2026)"
meta_description: "Together AI is an AI infrastructure platform for serverless inference, dedicated GPU deployments, GPU clusters, fine-tuning, code sandboxes, and open-model workloads. Pricing rechecked June 2026."
author: aipedia.wiki Editorial
best_for:
  - teams running open-weight LLMs in production
  - developers needing fine-tuning plus hosted inference
  - workloads that need dedicated H100, H200, or B200 capacity
  - AI apps that want one vendor for inference, training, and sandbox execution
not_best_for:
  - casual chatbot users
  - teams that only need one proprietary frontier model
  - buyers who want a simple flat monthly SaaS price
quick_answer: >-
  Together AI is best viewed as production infrastructure for open-model AI apps. It combines serverless inference, dedicated GPU deployments, GPU clusters, fine-tuning, and code sandboxes. Pick it when you want control over model choice and deployment economics. Skip it for simple chatbot use.
---

# Together AI

Together AI provides infrastructure for building on open and frontier-adjacent models: serverless inference APIs, dedicated GPU deployments, on-demand clusters, fine-tuning, and sandboxed code execution.

It overlaps with [Fireworks AI](/tools/fireworks-ai/), [Groq](/tools/groq/), [Fal.ai](/tools/fal-ai/), [OpenRouter](/tools/openrouter/), and cloud GPU providers. The difference is breadth. Together is not only an inference endpoint. It is closer to an AI compute platform for teams that train, tune, evaluate, and serve models.

## Recent developments

- **June 25, 2026:** Pricing reverified at [together.ai/pricing](https://www.together.ai/pricing). Serverless examples now include Kimi K2.6 at $1.20/$4.50 per MTok, Qwen3.6-Plus at $0.50/$3.00, Qwen3 235B throughput at $0.20/$0.60, and Llama 3.3 70B at $1.04/$1.04. Dedicated inference is now H100 $6.49/hr, H200 contact-sales, and B200 $11.95/hr; GPU clusters are separate at H100 $5.49/hr, H200 $6.79/hr, and B200 $9.95/hr.
- **April 28, 2026:** [Mistral 3 shipped with Large 3 and new Ministral models](/news/2026-04-28-mistral-3-open-model-release/). Mistral listed Together AI among the available platforms, adding another open-model family for teams to benchmark on production inference.

## System Verdict

> **Pick Together AI when open-model control matters.** It is a strong fit for teams that want to run Llama, Qwen, DeepSeek, Kimi, GLM, or custom models with production-grade inference and tuning.
>
> **Skip it for consumer AI usage.** The product is developer infrastructure. If the job is "use a chatbot," use [ChatGPT](/tools/chatgpt/), [Claude](/tools/claude/), or [Gemini](/tools/gemini/).
>
> The moat is operational. Fast inference, large model menu, fine-tuning support, GPU inventory, and enterprise controls are hard to replicate in a weekend.

## Key Facts

| | |
|---|---|
| **Core product** | AI infrastructure for inference, tuning, training, and compute |
| **Serverless inference** | Per-MTok pricing; Kimi K2.6 $1.20/$4.50, Qwen3.6-Plus $0.50/$3.00, Qwen3 235B throughput $0.20/$0.60, Llama 3.3 70B $1.04/$1.04; budget tier from $0.05/MTok |
| **Dedicated inference** | Single-tenant: H100 80GB $6.49/hr · H200 140GB contact sales · HGX B200 180GB $11.95/hr |
| **GPU clusters (on-demand)** | HGX H100 $5.49/hr · HGX H200 $6.79/hr · HGX B200 $9.95/hr; reserved 7-30 days starts at H100 $4.99, H200 $5.95, B200 $9.65 |
| **Fine-tuning** | $0.48 to $0.54/MTok up to 16B · $1.50 to $1.65/MTok at 17B to 69B · $2.90 to $3.20/MTok at 70 to 100B; specialized models (DeepSeek-R1, GLM-5) $10 to $100+ with minimums |
| **Code sandbox** | VM compute $0.0446/vCPU/hr + $0.0149/GiB RAM/hr; Code Interpreter $0.03 per 60-minute session |
| **Storage** | Shared filesystem $0.16/GiB/month |
| **Best fit** | Developer teams shipping model-backed products |

## When to pick Together AI

- **You need open-model economics.** Frontier APIs are convenient, but open models can be cheaper and more controllable at volume.
- **You want fine-tuning and serving in one place.** Fine-tune, deploy, and monitor without moving artifacts across vendors.
- **You need dedicated throughput.** Dedicated inference gives stronger predictability than shared serverless routes.
- **You want GPU flexibility.** On-demand and reserved GPU clusters cover training, eval, and batch workloads.
- **You are building code-execution workflows.** The code interpreter and sandbox pricing can simplify agent tooling.

## When to pick something else

- **Model-router convenience:** [OpenRouter](/tools/openrouter/) is easier when you mostly want one API key for many providers.
- **Ultra-low-latency LPU inference:** [Groq](/tools/groq/) is sharper for supported open models when latency is the deciding metric.
- **Image/video model breadth:** [Fal.ai](/tools/fal-ai/) and [Replicate](/tools/replicate/) are stronger media-model catalogs.
- **No-code AI workflows:** [Gumloop](/tools/gumloop/), [n8n](/tools/n8n/), or [Dust](/tools/dust/) will be more accessible.

## Pricing

Together AI pricing is usage-based across five dimensions. Verified 2026-06-25 against [together.ai/pricing](https://www.together.ai/pricing):

- **Serverless inference (per 1M tokens):** Kimi K2.6 $1.20 in / $4.50 out · Qwen3.6-Plus $0.50 / $3.00 · Qwen3 235B throughput $0.20 / $0.60 · Llama 3.3 70B $1.04 / $1.04 · gpt-oss-20B $0.05 / $0.20 · Gemma 3n E4B $0.06 / $0.12. Image: FLUX.2 [pro] $0.03/image, Nano Banana Pro $0.134/image, Imagen 4.0 Ultra $0.06/image. Audio: Whisper Large v3 $0.0015/audio minute. Embeddings: Multilingual e5 large at $0.02/MTok.
- **Dedicated inference (single-tenant, hourly):** H100 80GB $6.49 · H200 140GB contact sales · HGX B200 180GB $11.95.
- **GPU clusters:** On-demand HGX H100 $5.49/hr, HGX H200 $6.79/hr, HGX B200 $9.95/hr. Reserved 7 to 30 days starts at H100 $4.99, H200 $5.95, and B200 $9.65; 91 to 180 day reserved pricing drops to H100 $3.99, H200 $4.55, and B200 $9.09.
- **Fine-tuning (per 1M tokens):** Standard models scale by size: up to 16B at $0.48 SFT / $0.54 DPO; 17B to 69B at $1.50 / $1.65; 70 to 100B at $2.90 / $3.20. Specialized models like DeepSeek-R1 and GLM-5 run $10 to $100+ with minimum charges of $6 to $60.
- **Code sandbox:** VM compute $0.0446/vCPU/hour + $0.0149/GiB RAM/hour. Code Interpreter sessions $0.03 per 60 minutes.
- **Storage:** Shared filesystem $0.16/GiB/month.

Budgeting needs workload detail. A small product can stay inexpensive on serverless inference. A team reserving large GPU capacity or tuning bigger models should model the full bill across all five dimensions before migration.

## Buyer fit

Together AI makes the most sense when the team is past experimentation and is trying to control model-serving economics. If the workload is a small internal chatbot, a frontier API or model router may be simpler. If the workload is a production product with meaningful traffic, model choice, latency, and fine-tuning needs, Together becomes more relevant.

The strongest fit is a developer team that wants to:

- benchmark multiple open models on the same product task
- move successful prototypes into dedicated inference
- fine-tune smaller models for domain-specific behavior
- run batch or eval jobs on reserved GPU capacity
- add code-execution sandboxes to agent workflows
- avoid tying the whole stack to one proprietary model provider

The weaker fit is a non-technical team that just wants an assistant UI. Together is infrastructure. It needs an app layer, evals, monitoring, secrets handling, and a clear owner for model operations.

## Procurement questions

Ask these before migrating production traffic:

- Which models are actually needed, and which can be served cheaper elsewhere?
- What latency and throughput target must dedicated endpoints meet?
- How will fine-tuned models be evaluated before release?
- What happens if GPU inventory, region support, or model availability changes?
- Who owns prompt/version rollback when model behavior changes?
- How are logs, customer data, and sandboxed code-execution outputs retained?

The best Together AI deployment usually starts with a benchmark matrix. Compare the current provider, a cheaper open model, a fine-tuned model, and a dedicated endpoint on the same prompts, traffic shape, and failure cases.

## Failure Modes

- **Pricing is multi-dimensional.** Inference, fine-tuning, GPU clusters, sandboxes, and storage all bill differently.
- **Open models need eval discipline.** Cheaper models can fail silently on tasks a frontier model handles.
- **GPU availability is strategic.** Dedicated workloads depend on inventory and region support.
- **Vendor lock-in shifts layers.** You avoid proprietary model lock-in but may adopt Together-specific deployment plumbing.
- **Not a product UI.** Non-technical teams will need an app layer on top.
- **Eval debt can hide savings.** A cheaper model is not cheaper if it creates support tickets, bad answers, or silent task failures.

## Methodology

Last verified 2026-06-25 against [together.ai/pricing](https://www.together.ai/pricing) and product documentation. Scoring emphasizes breadth of infrastructure, production value, open-model leverage, and complexity of adoption.

## FAQ

**Is Together AI only for open-source models?**
No, but open and customizable models are the center of gravity.

**Can Together AI fine-tune models?**
Yes. Fine-tuning is priced by processed tokens, model size, and tuning method.

**How is Together AI different from OpenRouter?**
OpenRouter is a model gateway. Together AI is infrastructure: inference, tuning, GPU capacity, and sandboxes.

## Sources

- [Together AI pricing](https://www.together.ai/pricing)
- [Together AI APIs](https://www.together.ai/apis)
- [Together AI fine-tuning docs](https://docs.together.ai/docs/fine-tuning-pricing)

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Coding](/categories/ai-coding/) · [AI Automation](/categories/ai-automation/)
- **See also:** [OpenRouter](/tools/openrouter/) · [Fireworks AI](/tools/fireworks-ai/) · [Groq](/tools/groq/) · [Fal.ai](/tools/fal-ai/) · [Replicate](/tools/replicate/)
