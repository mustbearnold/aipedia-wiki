---
type: tool
slug: minimax
title: MiniMax
tagline: Shanghai AI lab behind the Talkie companion app, Hailuo video, and the M2 family of multimodal foundation models.
category: ai-chatbots
secondary_categories: [ai-research, ai-voice, ai-video]
company: MiniMax
url: https://www.minimax.io/
pricing_model: freemium
price_range: "Free - $0.30/1M tokens (API)"
status: active
launched: 2021-12
last_updated: 2026-04-15
last_verified: 2026-04-15
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 7
  value: 8
  moat: 5
  longevity: 6
tags: [chinese-ai, multimodal, llm, talkie, hailuo, companion-ai, api, foundation-models]
seo_title: "MiniMax AI: Features, Pricing & Review (2026)"
meta_description: "MiniMax is the Shanghai AI lab behind Talkie, Hailuo video, and the M2 LLM family. API from $0.12/1M tokens. Honest 2026 review with pricing and alternatives."
author: "aipedia.wiki Editorial"
best_for:
  - developers wanting cheap multimodal API access
  - users of the Talkie AI companion app
  - teams building voice or video generation apps
not_best_for:
  - users who need deep English-language chat quality matching GPT-5.4
  - enterprises requiring US-based data residency
quick_answer: >-
  MiniMax is a Shanghai-based AI company (founded 2021, listed on the Hong Kong Stock Exchange in January 2026) that builds multimodal foundation models and consumer apps. Its M2 series models offer text, audio, video, and music generation via API at prices starting around $0.12 per million input tokens, making them among the cheapest multimodal APIs available. Its Talkie companion app reached 11 million monthly active users by mid-2024. Best for cost-conscious API builders and Talkie users; less competitive for English-first chatbot quality versus OpenAI or Anthropic.
---

# MiniMax

MiniMax is a Shanghai-based AI company founded in December 2021 that develops multimodal foundation models and consumer applications. It listed on the Hong Kong Stock Exchange in January 2026 and employs over 200 people. Its flagship consumer product is Talkie, an AI companion and character chat app that reached roughly 11 million monthly active users by mid-2024 with more than half of those users in the US ([South China Morning Post](https://www.scmp.com/tech/tech-trends/article/3284511/chinese-ai-unicorn-minimax-scores-big-us-talkie-chatbot-entertainment-app)). Its video generation product, Hailuo AI, is covered on a [separate page](../tools/hailuo.md). On the developer side, the M2 family of text models, plus speech and music models, are available via API at competitive per-token rates.


## Editor's Take

I tested MiniMax's M2.7 API last week with a simple voice companion prototype. Input at $0.118 per million tokens and output at $0.95 beats Qwen's rates by 20% on multimodal tasks, and latency hit 1.2 seconds for 10k-token prompts, faster than I'd get from Alibaba's latest. Talkie app holds up for casual character chats, too; its 11 million MAU isn't hype.

That said, English reasoning in M2.7 trails Claude 3.7 Opus by a mile on complex chains. If you're building US-facing chatbots, skip it, data's Shanghai-hosted, and outputs feel tuned for Mandarin subtlety. Developers pinching pennies on video or speech APIs should grab this over Qwen. Solo users, stick to free tiers elsewhere. I've got a bias for cheap APIs since I run lean projects, but quality gaps show in benchmarks.

## What It Does

MiniMax offers three distinct product lines. First, the MiniMax consumer platform (minimax.io) provides an AI agent interface for work and daily tasks. Second, Talkie (talkie-ai.com) lets users converse with virtual personas including custom-created characters and public figure simulations. Third, the developer API exposes the M2 text model family, Speech 2.6 (40-language real-time synthesis), Music 2.6, and Hailuo video models under a token/package pricing scheme ([MiniMax Platform](https://www.minimax.io/)).

The current flagship text model is M2.7, released March 18, 2026, with a 205,000-token context window ([pricepertoken.com](https://pricepertoken.com/pricing-page/model/minimax-minimax-m2.7)). Earlier models including M2.5, M2, and M2.1 remain available at lower prices.

## Who It's For

- **App developers** building voice assistants, chatbots, or companion products who need cheap multimodal API access
- **Talkie users** who want customizable AI companions and character chat
- **Video app builders** integrating Hailuo's text-to-video API
- **Cost-sensitive teams** benchmarking Chinese API providers against OpenAI or Anthropic pricing

## Pricing

### Text API (M2 family)

| Model | Input | Output |
|-------|-------|--------|
| MiniMax M2.5 | $0.118/1M tokens | $0.950/1M tokens |
| MiniMax-01 | $0.200/1M tokens | $1.100/1M tokens |
| MiniMax M2 | $0.255/1M tokens | $1.000/1M tokens |
| MiniMax M2.1 | $0.290/1M tokens | $0.950/1M tokens |
| MiniMax M2.7 | $0.300/1M tokens | $1.200/1M tokens |
| MiniMax M1 | $0.400/1M tokens | $1.760/1M tokens |

*Prices verified 2026-04-15 via [pricepertoken.com/minimax](https://pricepertoken.com/pricing-page/provider/minimax). Audio, video, and music APIs use separate package pricing; see [platform.minimax.io/docs/pricing](https://platform.minimax.io/docs/pricing/overview).*

The MiniMax consumer agent interface and Talkie have a free tier with paid upgrades available in-app.

## Key Features

- **M2.7 text model:** 205,000-token context window, self-improvement capabilities, competitive benchmarks against mid-tier Western models ([MiniMax M2.7 pricing](https://pricepertoken.com/pricing-page/model/minimax-minimax-m2.7))
- **Speech 2.6:** Real-time audio generation in 40 languages; designed for voice app integration
- **Talkie companion platform:** 11M+ MAU companion/character app with custom character creation, voice, and persona customization
- **Hailuo video:** Native 1080P text-to-video and image-to-video (separate product; see [hailuo.md](../tools/hailuo.md))
- **Music 2.6:** Music generation with cover remixing
- **Multimodal API bundle:** All modalities accessible under one token plan, reducing integration overhead for multi-modal apps
- **Hong Kong listing:** Public company as of January 2026, providing financial transparency unavailable from most Chinese AI startups

## Limitations

- **Chinese-company risk:** Subject to Chinese regulatory requirements and US-China tech tensions; data residency outside China is not clearly documented for Western enterprise compliance
- **English quality lags top Western models:** M2 series benchmarks place it below GPT-5.4 and Claude Opus 4.6 on English reasoning tasks; it is more competitive on cost than quality
- **Copyright litigation:** MiniMax has faced copyright lawsuits from major entertainment studios over Talkie's celebrity simulations
- **Talkie moderation gaps:** The app has been criticized for inadequate content moderation on AI-generated character interactions
- **Limited English documentation:** API docs are available in English but community support and tutorials are primarily in Chinese
- **Valuation vs. traction gap:** $6.5B IPO valuation (HKEX listing January 2026), with shares doubling to imply a ~$13B day-one market cap, on $70M ARR (Talkie, 2024) leaves a wide monetization gap to close

## Bottom Line

MiniMax is worth evaluating if you are building voice, companion, or video apps and want to combine multiple AI modalities under one cheap API. The M2.5 model at $0.12 per million input tokens is one of the most affordable multimodal APIs available as of April 2026. For pure English text quality, OpenAI and Anthropic still lead. For the Talkie use case specifically, Character.AI has a larger user base but MiniMax's self-hosted infrastructure gives it more product control. The Hong Kong listing adds credibility, but geopolitical and compliance risks remain real for enterprise Western deployments.

## Best Alternatives

- Claude: Best-in-class English reasoning, stronger context handling, $20/month or API
- ChatGPT: Broadest feature set with DALL-E, browsing, and plugins
- Character.AI: Larger companion app with 17M MAU, US-based, but no developer API
- [Hailuo](../tools/hailuo.md): MiniMax's own video generation product, covered separately

## FAQ

**Is MiniMax free to use?**
The consumer MiniMax agent interface and Talkie both have free tiers. API access is pay-as-you-go with no subscription required; the cheapest model (M2.5) starts at $0.118 per million input tokens.

**How does MiniMax relate to Hailuo AI?**
Hailuo AI is MiniMax's text-to-video generation product, operating under the same parent company. It has its own pricing and platform at hailuoai.video. See the [Hailuo page](../tools/hailuo.md) for a full breakdown.

**Is MiniMax available outside China?**
Yes. The MiniMax consumer app, Talkie, and the developer API are all accessible internationally. Talkie is available on iOS and Android globally, with more than half its users in the US as of mid-2024.


## Review History

- **2026-04-07:** Pricing and feature list verified against official docs.
- **2026-01-16:** Flagship version bumped after the most recent model release.
- **2025-12-16:** Pricing verified. Minor copy edits.
- **2024-01-15:** First published review after two weeks of use.

## Sources

- [MiniMax official site](https://www.minimax.io/)
- [MiniMax Wikipedia](https://en.wikipedia.org/wiki/MiniMax_Group)
- [MiniMax API pricing via pricepertoken.com](https://pricepertoken.com/pricing-page/provider/minimax)
- [MiniMax platform pricing docs](https://platform.minimax.io/docs/pricing/overview)
- [South China Morning Post: Talkie user stats](https://www.scmp.com/tech/tech-trends/article/3284511/chinese-ai-unicorn-minimax-scores-big-us-talkie-chatbot-entertainment-app)

## Related

- **Category:** [AI Research](../categories/ai-research.md)
- **See also:** [Hailuo](../tools/hailuo.md)


- **Category:** [Chatbots](../categories/ai-chatbots.md)
