---
type: tool
slug: poe
title: Poe
tagline: Quora's AI chatbot aggregator. One subscription, dozens of models (GPT-5.5, Claude Opus 4.7, Gemini 3.1 Pro, plus open-weight). Plans from $4.99 to $249.99/month on a shared points system.
category: ai-chatbots
company: quora
url: https://poe.com
pricing_model: freemium
price_range: "$0 free / $4.99-$249.99/mo"
status: active
launched: 2023-02
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
  utility: 9
  value: 8
  moat: 7
  longevity: 8
tags: [ai-chat, aggregator, multi-model, quora, points-based, developer-api]
seo_title: "Poe: Features, Pricing & Review (April 2026)"
meta_description: "Poe is Quora's multi-model AI chatbot aggregator. Access GPT-5.5, Claude Opus 4.7, Gemini 3.1 Pro, and dozens more through one subscription. Plans $4.99-$249.99/month on a points system."
author: "aipedia.wiki Editorial"
best_for:
  - testing multiple AI models in one interface
  - users who want GPT + Claude + Gemini access without three subscriptions
  - developers prototyping against Poe's bot API
  - creating custom bots without infrastructure
not_best_for:
  - workloads that maximize a single model (go direct to that provider)
  - API-heavy production use
  - users who want every model at its full-feature fidelity
quick_answer: >-
  Poe aggregates 20+ AI models (GPT-5.5, Claude Opus 4.7, Gemini 3.1 Pro, Llama, Grok, plus open-weight) into one chat app with a unified points-based subscription. Plans start at $4.99/mo for light use, scale to $249.99/mo for heavy usage on expensive models. Pick it if you want to compare models side by side. Skip it if you just need one model at full fidelity.
---

# Poe

Quora's multi-model AI chatbot platform. One account, one subscription, dozens of AI models. Introduced February 2023 as a GPT-wrapper; evolved into the standard way to compare LLM outputs without maintaining three separate accounts.

## System Verdict

> **Pick Poe if you regularly switch between models or want to test which one wins on your specific prompts.** The interface is clean, the model selection is the widest on the market (GPT-5.5, Claude Opus 4.7, Gemini 3.1 Pro, Llama 4, Grok 4.20, DeepSeek V3.2, and niche open-weight options), and the unified points system is simpler than juggling credits across OpenAI + Anthropic + Google.
>
> **Skip it if you're a heavy single-model user.** Going direct to [ChatGPT Plus](/tools/chatgpt/) ($20) or [Claude Pro](/tools/claude/) ($20) gives you priority access, full feature fidelity, and no points accounting. Poe's points-per-message model penalizes heavy use of the most expensive models unless you're on the $100+ tier.
>
> **Who picks which tier:** $4.99/mo for light comparison work (10k points/day, ~100 messages on mid-tier models). $19.99/mo (1M points/month) for most power users. $49.99-$249.99/mo for heavy usage of the most expensive models like GPT-5.5 Pro or Claude Opus 4.7 at max settings.

## Key Facts

| | |
|---|---|
| **Parent company** | Quora Inc. |
| **Available models** | 20+ including GPT-5.5, Claude Opus 4.7, Claude Sonnet 4.6, Gemini 3.1 Pro, Llama 4 Maverick, Grok 4.20, DeepSeek V3.2, Mistral Large 3, Stable Diffusion, Imagen, DALL-E, FLUX |
| **Pricing model** | Points-based subscription. Each bot charges a per-message point cost; total points per day or month depends on tier |
| **Custom bots** | Anyone can create and share bots with custom prompts or API connections |
| **Developer API** | Public API launched July 2025; revenue share with bot creators |
| **Platforms** | Web (poe.com), iOS, Android, macOS desktop |
| **Free tier** | Limited daily questions, basic model access |

## When to pick Poe

- **Model comparison workflows.** Run the same prompt against GPT-5.5 and Claude Opus 4.7 without leaving the chat window. Fastest way to gut-check which model wins on your use case.
- **Breadth over depth.** You use 5+ models occasionally rather than one model heavily. Poe is cheaper than 5 separate subscriptions.
- **Bot creators.** Monetize custom bots via the revenue share program introduced in 2025. Lower infrastructure lift than self-hosting.
- **Curious experimenters.** Niche models (Japanese-tuned LLMs, specialist fine-tunes, open-weight flagships) all aggregate in one place.

## When to pick something else

- **Power users of one model:** Go direct. [ChatGPT Plus](/tools/chatgpt/) or [Claude Pro](/tools/claude/) both at $20/mo beat Poe's equivalent tier on that model specifically.
- **Production API workloads:** Use provider APIs directly ([OpenAI](https://platform.openai.com), [Anthropic](https://platform.claude.com), Google AI Studio). Poe's API is best for bot creators, not high-volume production.
- **Offline or private use:** [Ollama](/tools/ollama/) or [LM Studio](/tools/lm-studio/) for local models.
- **Free daily heavy use:** [ChatGPT Free](/tools/chatgpt/) gives more free messages per day on GPT-5.3 Instant than Poe's free tier does.

## Pricing

| Plan | Price | Daily or monthly points | Best for |
|---|---|---|---|
| Free | $0 | Limited daily messages | Casual comparison |
| Basic | $4.99/mo | 10,000 points/day | Light power use |
| Standard | $19.99/mo | 1,000,000 points/month | Most power users |
| Pro | $49.99/mo | 2,500,000 points/month | Heavy use on mid models |
| Premium | $99.99/mo | 5,000,000 points/month | Frontier-model heavy use |
| Unlimited | $249.99/mo | 12,500,000 points/month | Very heavy or expensive models (GPT-5.5 Pro, o1-pro equivalents) |

Developer point packs: $30 for 1M additional tokens. Prices verified 2026-04-18 via [Poe help center](https://help.poe.com).

## Failure modes

- **Points accounting can surprise.** Running Claude Opus 4.7 with a 1M-token context eats points fast. Heavy users on the $4.99 plan can exhaust daily allowance in 10-15 messages. Check point costs before committing.
- **Feature parity is not 100%.** Some model features (like Claude Artifacts, ChatGPT's Canvas, Gemini's Deep Research) are not fully replicated in Poe. Go direct to the provider if those features matter.
- **No enterprise features.** No SSO, no audit logs, no data residency controls. Small teams only.
- **Rate-limit behavior differs from direct providers.** Poe imposes its own queue + throughput limits on top of provider limits.

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-04-18 against the [Poe purchases FAQ](https://help.poe.com/hc/en-us/articles/19945140063636-Poe-Purchases-FAQs) and [TechCrunch coverage of the $5/mo tier](https://techcrunch.com/2025/03/25/quoras-poe-now-offers-an-affordable-subscription-plan-for-5-month/).

## FAQ

**Does Poe include GPT-5.5 and Claude Opus 4.7?**
Yes. Both are available on paid tiers, subject to point costs. Free tier has limited access to lower-cost models.

**Is Poe cheaper than ChatGPT Plus + Claude Pro combined?**
If you use both equally, Poe Standard ($19.99) beats the $40 combined cost of direct subscriptions. If you use one model heavily, direct subscription to that provider is better.

**Can I use Poe for coding?**
Yes, but for heavy coding work [Claude Code](/tools/claude-code/) or [Cursor](/tools/cursor/) are better fits. Poe is general-purpose chat, not IDE-integrated.

**What does "points" actually buy me?**
One message to GPT-5.5 costs roughly 300-500 points. Claude Opus 4.7 costs roughly 200-400. Cheaper models (GPT-5.3 Instant, Claude Haiku) cost 10-50 points. Exact pricing rotates with provider API rates.

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/)
- **See also:** [ChatGPT](/tools/chatgpt/) · [Claude](/tools/claude/) · [Gemini](/tools/gemini/) · [TypingMind](/tools/typingmind/)
