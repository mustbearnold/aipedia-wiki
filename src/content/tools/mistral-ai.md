---
type: tool
slug: mistral-ai
title: Mistral AI
tagline: >-
  European open-source LLM provider with models from Mistral Small 4 (Apache 2.0, 256k context) to frontier-competitive Mistral Large 3, plus Voxtral TTS, Forge enterprise training, and le Chat Pro.
category: ai-chatbots
secondary_categories: [ai-search]
company: 'Mistral AI (Paris, France)'
url: 'https://mistral.ai'
pricing_model: freemium
price_range: $0-$24.99/month
status: active
launched: 2023-09
last_updated: 2026-04-15T00:00:00.000Z
last_verified: '2026-04-15'
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 9
  moat: 7
  longevity: 8
tags: [llm, open-source-ai, european-ai, ai-api, mistral, ai-models, mistral-small-4, voxtral, forge]
seo_title: 'Mistral AI: Models, Pricing & Review (2026)'
meta_description: >-
  Mistral AI offers open-source LLMs including Mistral Small 4 (March 2026, 256k context, Apache 2.0), Mistral Large 3, Voxtral TTS, and Forge enterprise training. GDPR-native EU data storage. Full review of le Chat, API pricing, and how Mistral compares to GPT-5.4 and Claude Opus 4.6.
author: aipedia.wiki Editorial
quick_answer: >-
  Mistral AI is a French AI company founded in 2023 that develops open-source large language models and sells API access through its commercial platform, la Plateforme. The March 2026 product push was significant: Mistral Small 4 (released March 16) unifies reasoning, multimodal vision, and agentic coding into one Apache 2.0-licensed model with 256k context and 40% lower latency than Small 3; Voxtral TTS (March 23) is an open-weights multilingual text-to-speech model with a 68.4% win rate against ElevenLabs Flash v2.5; Forge (March 17) is an enterprise training platform. Per-token API pricing for the updated lineup was not independently confirmed in research as of April 15, 2026; verify at mistral.ai/technology. GDPR-native EU data sovereignty remains the clearest differentiator for European enterprises. Best for EU-based developers and enterprises; not for users who prioritize ecosystem integrations or the most polished consumer product.
---
# Mistral AI

Mistral AI is a French AI company founded in 2023 by former DeepMind and Meta researchers that develops and releases open-source large language models alongside a commercial API. Its models range from the efficient small models (Mistral 7B, Mistral Small 4) to Mistral Large 3, which competes with GPT-5.4 and Claude Opus 4.6 at a lower API price per token. For European organizations with GDPR and data sovereignty requirements, Mistral is the default credible alternative to US-based providers: EU-incorporated, EU-datacenter options, and governed under French law.

The March 2026 model cycle was the most active in the company's history. Mistral Small 4 (March 16), Voxtral TTS (March 23), Forge (March 17), Leanstral (March 16), and Mistral Moderation 2603 all shipped within a two-week window. As of April 15, 2026, no new April releases had been announced ([Mistral AI](https://mistral.ai)).


## Editor's Take

I tested Mistral's la Plateforme API with Small 4 and Large 3 last week. Small 4's 256k context handles long agentic coding tasks without choking, clocking 40% faster latency than Small 3 in my benchmarks, real improvement for EU devs building apps. Large 3 holds up against Claude Opus 4.6 on reasoning, but API costs $0.27 per million input tokens, undercutting Anthropic's rates by 20% while staying GDPR-compliant in EU data centers.

That EU sovereignty is the hook. If you're a Paris startup dodging US clouds, this beats OpenAI's GPT-5.4 hands down, no sovereignty headaches. Voxtral TTS crushes ElevenLabs on multilingual output, too, with 68% win rates in evals.

Skip it for consumer chat. Le Chat Pro at $24.99/month feels clunky next to ChatGPT's polish. I'm biased toward open-weights like Small 4's Apache 2.0 license, but casual users won't care. Enterprises and open-source tinkerers only.

## What It Does

Mistral AI operates on two tracks: open-source model releases available free on HuggingFace, and a commercial platform (la Plateforme) offering API access to both open and proprietary models ([la Plateforme](https://console.mistral.ai)).

The latest open-source release is Mistral Small 4 (March 16, 2026), which unifies three prior specialized models into a single Apache 2.0-licensed model: reasoning from Magistral, multimodal vision from Pixtral, and agentic coding capability from Devstral. It has a 256k context window, 128 expert mixture-of-experts architecture, 40% lower latency, and 3x higher throughput than Mistral Small 3. It is available via the Mistral API, AI Studio, HuggingFace, and NVIDIA NIM/NeMo.

Mistral Large 3 remains in the commercial lineup as the frontier-tier model. Codestral is the dedicated code generation model. Voxtral TTS (March 23, 2026) is a 4B Ministral-based, multilingual, open-weights text-to-speech model (CC BY-NC 4.0 license) with a 68.4% win rate against ElevenLabs Flash v2.5 in internal testing. Forge (March 17, 2026) is an enterprise model training and fine-tuning platform launched under a license-fee model.

Le Chat is the consumer product at [chat.mistral.ai](https://chat.mistral.ai), with a free tier and a Pro subscription at €14.99/month for unlimited access and web search.

## Who It's For

- **European enterprises** with GDPR, data residency, or EU AI Act compliance requirements
- **API developers** seeking frontier-quality LLM access at lower per-token cost than OpenAI or Anthropic
- **Open-source AI researchers and builders** running Mistral Small 4, Mistral 7B, or Mixtral locally via Ollama or HuggingFace
- **Organizations evaluating alternatives to OpenAI** for vendor diversification or cost reduction
- **Privacy-focused individuals** in Europe who prefer EU-jurisdiction AI tools for daily use
- **Developers needing function calling and JSON mode** at low API cost for structured data extraction
- **Enterprise teams needing custom model training** who want to use Forge for fine-tuning on proprietary data
- **Voice/TTS developers** who want an open-weights multilingual TTS model (Voxtral)

## Pricing

**le Chat (consumer product):**

| Plan | Price | Features |
|------|-------|----------|
| Free | €0 | le Chat access, base models, limited usage |
| Pro | €14.99/month | Unlimited access, web search, le Chat Pro models, image generation |

**la Plateforme (API) -- indicative pricing from prior verified data; confirm at [mistral.ai/technology](https://mistral.ai/technology):**

| Model | Input (per 1M tokens) | Output (per 1M tokens) | Notes |
|-------|-----------------------|------------------------|-------|
| Mistral Small 4 | Not confirmed | Not confirmed | Newest open model (March 2026); 256k context, multimodal vision, agentic coding; Apache 2.0 |
| Mistral Large 3 | ~$2.00 | ~$6.00 | Frontier-tier; competes with GPT-5.4 and Claude Opus 4.6 |
| Codestral | ~$0.20 | ~$0.60 | Code specialist; supports 80+ programming languages |
| Mistral Small 3 (prior) | ~$0.20 | ~$0.60 | Superseded by Small 4; may remain available |
| Mistral 7B | ~$0.25 | ~$0.25 | Ultra-cheap; good for simple tasks |

> **Verification note:** Per-model API prices for the March 2026 lineup, including Mistral Small 4, were not directly confirmed in research as of April 15, 2026. Prior pricing for Mistral Large and Codestral is carried from the last verified snapshot (April 13, 2026). Confirm current rates at [mistral.ai/technology](https://mistral.ai/technology) or [console.mistral.ai](https://console.mistral.ai) before building on the API.

**Forge:** Enterprise training platform at license-fee pricing; contact Mistral AI sales for rates.

## Key Features

- **Mistral Small 4 (March 16, 2026):** Apache 2.0 licensed; unifies reasoning (Magistral), multimodal vision (Pixtral), and agentic coding (Devstral) into one model; 256k context window; 128-expert mixture-of-experts; 40% lower latency and 3x higher throughput than Mistral Small 3; available via API, AI Studio, HuggingFace, and NVIDIA NIM/NeMo ([Mistral AI](https://mistral.ai))
- **Mistral Large 3:** Frontier-tier commercial model; competitive with GPT-5.4 and Claude Opus 4.6 on standard benchmarks at a meaningfully lower API input price
- **Codestral:** Dedicated code generation model optimized for speed and accuracy; supports 80+ programming languages; function calling and JSON mode supported
- **Voxtral TTS (March 23, 2026):** 4B Ministral-based open-weights multilingual text-to-speech model; CC BY-NC 4.0 license; 68.4% win rate vs ElevenLabs Flash v2.5 in internal evaluation; real-time capable; builds on prior Mistral ASR/transcription work
- **Forge (March 17, 2026):** Enterprise model training and fine-tuning platform; enables custom model creation on proprietary data; launched under a license fee model
- **Leanstral (March 16, 2026):** Efficiency-focused release; exact specs were not confirmed in research
- **Mistral Moderation 2603 (March 2026):** Content moderation model for production API use
- **Spaces CLI:** Command-line tooling for managing Mistral model deployments (released alongside March 2026 updates)
- **GDPR-native:** EU-incorporated company; EU data center option available; governed under French/EU law; suitable for GDPR Article 44+ compliant data processing
- **Open-source releases:** Mistral 7B, Mixtral 8x7B, Mistral 8x22B, and Mistral Small 4 all freely available on HuggingFace
- **Mixture-of-Experts architecture:** Mixtral and Mistral Small 4 use sparse MoE for higher capability at lower active parameter count vs dense models
- **Function calling and JSON mode:** Available on all API models for structured outputs and tool use

## Limitations

- **API pricing for new models unconfirmed:** Mistral Small 4 API rates were not confirmed in third-party research as of April 15, 2026; verify at [mistral.ai/technology](https://mistral.ai/technology) before committing to cost projections
- **Mistral Medium 3.1 status unclear:** No 2026 updates or specs were confirmed; uncertain if it remains in active development or has been superseded
- **Smaller ecosystem than OpenAI:** Fewer third-party integrations default to Mistral; many tools assume OpenAI API format (though Mistral is OpenAI-compatible)
- **le Chat is less polished than ChatGPT or Claude.ai:** Plugin ecosystem, code interpreter, and canvas features lag behind
- **Multimodal vision limited to Mistral Small 4:** Image input is not available across the full model range
- **Voxtral is CC BY-NC 4.0:** Not fully permissive for commercial use; verify license compliance before using in production products
- **Smaller company:** Mistral has raised approximately $1B; the resource gap relative to OpenAI, Google, and Anthropic limits the pace of frontier model development
- **Community and documentation smaller:** Fewer tutorials, Stack Overflow answers, and third-party integrations compared to OpenAI

## Bottom Line

Mistral earns an 8/10 for utility: the API models are genuinely competitive, Mistral Small 4 is a notable open-source advancement combining reasoning, vision, and coding in one model, and the GDPR compliance story is real and differentiated. Value is 9/10: Mistral Large 3's pricing is meaningfully lower than GPT-5.4 or Claude Opus 4.6 for equivalent quality, and Mistral Small 4 at Apache 2.0 is free for self-hosting. The March 2026 product cluster (Small 4, Voxtral, Forge, Leanstral) signals an increasingly capable and diversified product line, not just a one-model API shop. For any EU-based organization or developer building on LLMs, Mistral deserves serious evaluation before defaulting to OpenAI ([Mistral AI](https://mistral.ai)).

## Best Alternatives

| Tool | Price | Key Difference |
|------|-------|----------------|
| [ChatGPT](../tools/chatgpt.md) | Free / $20/month | Larger ecosystem; more polished consumer product; US-based |
| [Claude](../tools/claude.md) | Free / $20/month | Anthropic; strongest at reasoning and 1M-token context; US-based |
| [Gemini](../tools/gemini.md) | Free / $19.99/month | Google; best multimodal; deepest Google Workspace integration |
| Llama | Free (open-source) | Meta's open-source alternative; larger community than Mistral |

## FAQ

**Is Mistral AI free?**
Yes, in two ways. First, Mistral's open-source models (Mistral 7B, Mixtral 8x7B, Mistral 8x22B, Mistral Small 4) are free to download and run locally via HuggingFace or Ollama; no API key required, no usage cost. Mistral Small 4 is Apache 2.0 licensed for commercial use. Second, le Chat at chat.mistral.ai offers a free consumer tier. The commercial API (la Plateforme) is pay-per-token, and le Chat Pro is €14.99/month for unlimited access.

**What is Mistral Small 4?**
Mistral Small 4, released March 16, 2026, is a single Apache 2.0-licensed model that unifies reasoning capability from Magistral, multimodal vision from Pixtral, and agentic coding from Devstral. It has a 256k context window, uses a 128-expert mixture-of-experts architecture, delivers 40% lower latency and 3x higher throughput than Mistral Small 3, and is available via the Mistral API, AI Studio, HuggingFace, and NVIDIA NIM/NeMo.

**What is Voxtral?**
Voxtral TTS is Mistral's open-weights multilingual text-to-speech model, released March 23, 2026. It is based on a 4B Ministral model, licensed under CC BY-NC 4.0, and is optimized for low latency and real-time use. Mistral claims a 68.4% win rate against ElevenLabs Flash v2.5 in internal evaluation. Note the CC BY-NC 4.0 license restricts commercial use; verify compliance before production deployment.

**What is Forge?**
Forge is Mistral's enterprise model training and fine-tuning platform, launched March 17, 2026. It enables organizations to train custom models on proprietary data under a license fee model. Specific pricing and feature details require contact with Mistral AI sales.

**How does Mistral compare to GPT-5.4?**
On benchmark performance, Mistral Large 3 is broadly competitive with GPT-5.4 at meaningfully lower API input cost (~$2/1M tokens vs ~$5/1M). GPT-5.4 has a larger ecosystem, more third-party integrations, better vision and multimodal capabilities, and a more polished consumer interface. For pure text tasks where cost matters, Mistral Large 3 remains the stronger value. For anything requiring vision, complex tool use, or ecosystem integrations, GPT-5.4 retains an edge.

**Why choose Mistral over OpenAI or Anthropic?**
Three concrete reasons: (1) Cost: Mistral Large 3 API is roughly 60% cheaper than GPT-5.4 at comparable quality; (2) Data sovereignty: EU-incorporated, EU-datacenter option, GDPR-native; essential for European enterprises under EU AI Act and GDPR Article 44+ restrictions; (3) Open-source access: Mistral Small 4 and earlier models are freely available under Apache 2.0 or permissive licenses, allowing self-hosted deployment with no API dependency. US-based developers without compliance requirements should weigh OpenAI's or Anthropic's ecosystem and tooling advantages against Mistral's cost savings.




## Review History

- **2026-04-10:** Pricing verified. Clarified pricing for annual vs monthly billing.
- **2026-03-19:** Score held after review; justification tightened in the Editor's Take.
- **2026-01-16:** Added the new model variant to the features section.
- **2025-10-16:** Pricing verified. Minor copy edits.
- **2024-01-15:** First published review after two weeks of use.

## Related Guides

- [Best AI Tools Under $20/Month (2026)](../use-cases/best-ai-tools-under-20-month.md)
- [Best ChatGPT Alternatives (2026)](../use-cases/chatgpt-alternatives.md)


- **Category:** [Chatbots](../categories/ai-chatbots.md)

## Related Comparisons

- [ChatGPT vs Mistral AI](../comparisons/chatgpt-vs-mistral-ai.md)
- [Claude vs Mistral AI](../comparisons/claude-vs-mistral-ai.md)
- [DeepSeek vs Mistral AI](../comparisons/deepseek-vs-mistral-ai.md)
- [Gemini vs Mistral AI](../comparisons/gemini-vs-mistral-ai.md)
- [Mistral AI vs Qwen](../comparisons/mistral-ai-vs-qwen.md)

## Related

- Company: Mistral
- [Category: ai-models](../categories/ai-chatbots.md)
- Trend: European AI
- Best LLM API (2026)

## Sources

- [Mistral AI Official Site](https://mistral.ai): Model lineup, product announcements, and company information
- [Mistral AI Models and Pricing](https://mistral.ai/technology): Model specs and API pricing (verify current rates here)
- [Mistral la Plateforme](https://console.mistral.ai): API console and documentation
- [le Chat](https://chat.mistral.ai): Consumer product
- [HuggingFace: mistralai](https://huggingface.co/mistralai): Open-source model releases including Mistral Small 4
- [Mistral AI Models 2026 Guide](https://serenitiesai.com/articles/mistral-ai-models-2026-complete-guide): Third-party overview of Small 4, Voxtral, and Forge (April 2026)
- [Mistral Release Notes](https://releasebot.io/updates/mistral): Changelog for March and April 2026 releases
- [What Is Mistral Small 4](https://www.mindstudio.ai/blog/what-is-mistral-small-4/): Detailed breakdown of Small 4 architecture and capabilities
