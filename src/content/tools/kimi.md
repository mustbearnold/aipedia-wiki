---
type: tool
slug: kimi
title: Kimi
tagline: Moonshot AI's chatbot and model family, known for a 256K context window and a 1T-parameter MoE model.
category: ai-chatbots
secondary_categories: [ai-coding, ai-research]
company: Moonshot AI
url: https://www.kimi.com/
pricing_model: freemium
price_range: "Free (chat) / API from $0.60/M input tokens"
status: active
launched: 2023-10
last_updated: 2026-04-15
last_verified: 2026-04-15
update_frequency: quarterly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 8
  moat: 5
  longevity: 7
tags: [long-context, chinese-llm, moe, reasoning, coding, multilingual, open-source, api]
seo_title: "Kimi: Features, Pricing & Review (2026)"
meta_description: "Kimi by Moonshot AI offers a free 256K-context chatbot and Kimi K2.5 API at $0.60/M input tokens. 1T-parameter MoE, agent swarm mode, bilingual Chinese-English."
author: "aipedia.wiki Editorial"
quick_answer: >-
  Kimi is a chatbot and AI model family developed by Moonshot AI, a Beijing-based startup founded in 2023 and backed by Alibaba, Tencent, and IDG Capital at a $10B valuation. The flagship Kimi K2.5 is a 1-trillion-parameter Mixture-of-Experts model activating 32B parameters per request, with a 256K-token context window available to free users. API pricing starts at $0.60/M input and $3.00/M output tokens; best for long-document analysis and bilingual Chinese-English workloads, not for teams needing enterprise SLAs or lower cost than DeepSeek's API.
best_for:
  - long-document and codebase analysis (256K context free)
  - bilingual Chinese-English workflows
  - agentic multi-step tasks with tool use
  - researchers processing large files without chunking
not_best_for:
  - budget-first API usage (DeepSeek is 2x cheaper on input)
  - enterprise buyers needing Western data residency
  - users who want a fully English-native product experience
---

# Kimi

Kimi is an AI chatbot and series of large language models developed by Moonshot AI, a Beijing-based startup founded in March 2023 by Yang Zhilin, Zhou Xinyu, and Wu Yuxin, all Tsinghua University alumni. The chatbot launched in October 2023 and became notable for handling long text inputs well before most competitors. As of April 2026, Moonshot AI has raised over $2.6 billion at a reported $10 billion valuation, backed by Alibaba Group (which acquired a 36% stake during a $1 billion round in February 2024), Tencent, and IDG Capital ([Wikipedia](https://en.wikipedia.org/wiki/Moonshot_AI)). The current flagship model, Kimi K2.5, is a 1-trillion-parameter Mixture-of-Experts model that activates only 32 billion parameters per request, with multimodal input support and multiple operating modes including an agent swarm system.

## What It Does

Kimi operates as both a consumer chat product (at kimi.com and kimi.moonshot.cn) and an API platform for developers. The chat product offers a free tier with unlimited basic conversations and a 256K-token context window, enabling users to upload and analyze very long documents, PDFs, and code files without chunking. The "DeepResearch" mode performs multi-step web research; the agent mode ("OK Computer") can use external tools and browse the web autonomously.

The Kimi K2.5 model underlying the API supports four distinct operating modes: Instant (fast non-thinking responses), Thinking (chain-of-thought reasoning), Agent (single-agent tool use with up to 300 tool-calling steps), and Agent Swarm, a beta feature that coordinates up to 100 specialized sub-agents working in parallel. The Agent Swarm mode cuts execution time by 4.5x on complex multi-step tasks compared to a single-agent approach, according to Moonshot's published benchmarks ([Moonshot AI Platform](https://platform.moonshot.ai/)). Kimi K2.5 also supports vision inputs, trained on a mix of visual and textual data, meaning image understanding is integrated rather than bolted on.

## Who It's For

- **Analysts and researchers** who need to process very long documents (contracts, research papers, code repositories) in a single 256K-token context without chunking
- **Bilingual Chinese-English teams** where cultural nuance and terminology accuracy in both languages matters
- **Developers building agentic applications** who want a model with native multi-step tool-calling support (up to 300 steps per task)
- **Coding teams** looking for strong code generation and debugging at a lower price point than Claude or GPT-4o
- **Users who want free long-context chat** without paying for a premium plan

## Pricing

| Plan | Price | Key Limits |
|------|-------|-----------|
| Free (Adagio) | $0/month | Unlimited basic chat, 256K context; limited DeepResearch and agent tasks |
| Paid Membership | Custom tiers | Higher quotas for DeepResearch and agent use; see kimi.com for current plans |
| API - Kimi K2.5 | $0.60/M input, $3.00/M output | Cache: $0.10/M; multimodal, all modes |
| API - Kimi K2 0905 | $0.60/M input, $2.50/M output | Cache: $0.15/M; base MoE, strong coding |
| API - Kimi K2 Thinking | $0.60/M input, $2.50/M output | Cache: $0.15/M; deep reasoning, 300-step tool calling |

*Prices verified 2026-04-15 from [Moonshot AI API Platform](https://platform.moonshot.ai/). API is pay-as-you-go with no minimum commitment.*

## Key Features

- **256K-token context window (free):** the free tier includes a 256K context window, enough for large codebases or hundred-page documents without any paid plan ([Kimi platform](https://platform.moonshot.ai/))
- **Kimi K2.5: 1T-parameter MoE:** 1 trillion total parameters, 32B activated per token, balancing capability and inference efficiency; open-source weights available
- **Agent Swarm (beta):** coordinates up to 100 specialized sub-agents in parallel; achieved 50.2% on Humanity's Last Exam vs GPT-5.2's 45.5% at 76% lower cost, per Moonshot benchmarks
- **Native multimodal:** vision and language trained together, not as separate components; supports image and document inputs
- **300-step tool calling:** Kimi K2 Thinking mode supports up to 300 sequential tool calls in a single agent task, enabling long-horizon automation
- **OpenAI-compatible API:** drop-in replacement for OpenAI's SDK by changing the endpoint to api.moonshot, simplifying migration
- **Bilingual Chinese-English excellence:** trained with deep understanding of both languages' cultural context, idioms, and technical terminology

## Limitations

- **Higher API cost than DeepSeek:** at $0.60/M input, Kimi is approximately 2x the cost of DeepSeek's $0.28/M for comparable chat-level tasks
- **Chinese startup risk:** Moonshot AI is well-funded but still a startup; enterprise buyers need to weigh vendor stability against established alternatives
- **Agent Swarm still in beta:** the multi-agent coordination feature is not yet generally available for production workloads
- **Free tier limited on advanced features:** DeepResearch and agent tasks are capped on the free plan; only basic chat is truly unlimited
- **Western user experience less polished:** the product is built primarily for a Chinese market; English-language UX lags behind ChatGPT or Claude's consumer interfaces

## Bottom Line

Kimi is a strong choice for researchers, analysts, and developers who need a long-context chat product for free (256K tokens, unlimited basic use) or a capable agentic API. The K2.5 model's multi-agent swarm capability and native multimodal training set it apart from pure text models. For pure API cost, DeepSeek is cheaper; for product polish and enterprise trust, ChatGPT and Claude win. Kimi occupies a real niche for bilingual Chinese-English workloads and long-document tasks where the free tier's 256K context removes a major friction point.

## Best Alternatives

- [DeepSeek](../tools/deepseek.md): cheaper API ($0.28/M input), strong reasoning; less agentic infrastructure
- [ChatGPT](../tools/chatgpt.md): more polished product, broad integrations; 4x higher API cost
- [Qwen](../tools/qwen.md): another Chinese-backed open-weight family with strong multilingual and coding coverage

## FAQ

**Is Kimi free to use?**
Yes. The free tier at kimi.com provides unlimited basic conversations with a 256K-token context window and no credit card required. Advanced features like DeepResearch and agent tasks have a limited quota on the free plan. The API is pay-as-you-go with no free tier beyond testing credits.

**What is Kimi K2.5?**
Kimi K2.5 is Moonshot AI's flagship model as of April 2026. It is a 1-trillion-parameter Mixture-of-Experts architecture that activates 32 billion parameters per request. It supports vision inputs, a 256K context window, and four operating modes: Instant, Thinking, Agent, and Agent Swarm (beta). Weights are open-source under a permissive license.

**How does Kimi compare to Claude for long-document work?**
For free users, Kimi's 256K context is available at no cost, while Claude Pro's 200K requires a $20/month subscription. At equal context lengths, Claude typically produces more nuanced English writing and analysis. For bilingual Chinese-English documents, Kimi has a meaningful advantage in linguistic precision.

## Sources

- [Moonshot AI API Platform](https://platform.moonshot.ai/)
- [Moonshot AI Wikipedia](https://en.wikipedia.org/wiki/Moonshot_AI)
- [Kimi (chatbot) Wikipedia](https://en.wikipedia.org/wiki/Kimi_(chatbot))
- [HuggingFace Kimi K2 explainer](https://huggingface.co/blog/fdaudens/moonshot-ai-kimi-k2-explained)
- [OpenRouter Kimi K2.5 pricing](https://openrouter.ai/moonshotai/kimi-k2.5)

## Related

- **Category:** [AI Chatbots](../categories/ai-chatbots.md)
- **Category:** [AI Research](../categories/ai-research.md)
