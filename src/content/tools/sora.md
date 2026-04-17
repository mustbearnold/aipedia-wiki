---
type: tool
slug: sora
title: Sora
tagline: OpenAI's flagship AI video generator. Sora 2 produces up to 15-second 720p clips with synchronized audio; Sora 2 Pro extends to 25 seconds at 1080p.
category: ai-video
company: OpenAI
url: https://sora.com
pricing_model: paid
price_range: "$20-$200/month"
status: active
launched: 2024-12
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 7
  moat: 9
  longevity: 9
tags: [video-generation, openai, text-to-video, ai-video, sora]
seo_title: "Sora: Features, Pricing & Review (2026)"
meta_description: "Sora 2 is OpenAI's video model with synchronized audio. Access requires ChatGPT Plus ($20/mo, 720p) or Pro ($200/mo, 1080p via Sora 2 Pro). Free tier ended January 10, 2026. Max 25 seconds on Pro."
author: "aipedia.wiki Editorial"
quick_answer: >-
  Sora is OpenAI's video generator, and Sora 2 is the current flagship with Sora 2 Pro available on the $200/mo tier. Pick it for the best cinematic motion with synchronized dialogue in one model. Skip it if you need clips longer than 25 seconds, 4K output, or a free tier.
---

# Sora

OpenAI's AI video generator, accessed via the standalone [sora.com](https://sora.com) site and iOS app. **Sora 2** is the standard model at 720p and up to 15 seconds; **Sora 2 Pro** extends to 1080p and 25 seconds with higher per-frame compute.

Access is gated behind ChatGPT Plus or Pro subscriptions. The free tier was retired on January 10, 2026. Synchronized audio, including lip-synced dialogue, generates inside the same model, which is Sora's clearest technical lead.

## System Verdict

> **Pick Sora if you need the best single-shot cinematic motion with synced audio.** Sora 2 generates video and dialogue in lockstep, with no second voice-clone or audio pipeline. The 25-second Pro cap beats Runway, Pika, and Vidu on single-take length. Motion physics trail only Veo 3 on photoreal sequences, and the gap is narrow.
>
> **Skip it if you want a free tier, 4K output, or clips over 25 seconds.** The January 2026 free-tier shutdown makes Sora the most expensive on-ramp in the category. [Runway](/tools/runway/) still ships 4K and a cheaper starter plan. [Kling](/tools/kling/) and [Vidu](/tools/vidu/) both beat Sora on entry price. For long-form narrative work past 25 seconds, no single model covers it yet; creators stitch multiple generations.
>
> **Who pays which tier:** ChatGPT Plus $20/mo covers casual and short-form creators at 720p. ChatGPT Pro $200/mo is required for Sora 2 Pro at 1080p and the unlimited overnight Relaxed mode. API users on Tier 2 pay $0.10 to $0.50 per second depending on model and resolution.

## Key Facts

| | |
|---|---|
| **Flagship model** | Sora 2 Pro (current as of April 2026) |
| **Standard model** | Sora 2 (720p, up to 15 seconds) |
| **Current pricing** | ChatGPT Plus $20/mo · ChatGPT Pro $200/mo · API pay-as-you-go |
| **Max duration** | 15s (Sora 2) · 25s (Sora 2 Pro) |
| **Max resolution** | 720p (Sora 2) · 1080p (Sora 2 Pro) |
| **Free tier** | None (retired January 10, 2026) |
| **Native audio** | Yes, synchronized dialogue and foley |
| **API access** | Yes, sora-2 and sora-2-pro endpoints |
| **Parent company** | OpenAI |

## What it actually is

A standalone video generator living at [sora.com](https://sora.com) and inside the iOS Sora app, separate from the main ChatGPT product but billed through ChatGPT Plus or Pro. The text-to-video model produces clips with synchronized audio in a single pass, which no other major vendor ships at the same quality.

Sora 2 is the default model for Plus users, producing 720p output up to 15 seconds. Sora 2 Pro, available on the Pro tier and via the API, pushes per-frame compute higher for better texture detail, smoother motion, and 1080p output up to 25 seconds.

The invite-code system from the December 2024 launch has mostly been retired in the US, Canada, Japan, and South Korea. Pro subscribers bypass any remaining waitlist.

## When to pick Sora

- **Clips with synchronized dialogue or speech.** Sora 2 generates video and lip-synced audio in the same pass. No second voice-clone step.
- **Single-take shots longer than 10 seconds.** Sora 2 Pro's 25-second cap beats every major alternative on single-clip length.
- **Workflows already on ChatGPT Plus or Pro.** No extra subscription required, just model access inside the existing plan.
- **Cinematic motion physics.** Sora 2 Pro's motion model trails only Veo 3 on published comparisons, and leads on character action scenes.
- **iOS-native short-form production.** The Sora iOS app is a first-class creation surface, not a secondary web wrapper.

## When to pick something else

- **For a free tier:** [Vidu](/tools/vidu/), [Hailuo](/tools/hailuo/), or [Kling](/tools/kling/). Sora has no free access since January 2026.
- **For 4K output:** [Runway](/tools/runway/). Sora caps at 1080p on Pro.
- **For budget short-form work:** [Vidu](/tools/vidu/) at $10/mo or [Kling](/tools/kling/) at $10/mo. Sora's $20 floor is the highest in the category.
- **For photoreal outdoor and nature scenes:** [Veo](/tools/veo/). Google's motion physics still lead on landscape and nature sequences.
- **For multi-reference character consistency:** [Vidu](/tools/vidu/) (up to 7 references). Sora accepts one image reference per generation.

## Pricing

| Plan | Price | Models | Who's it for |
|---|---|---|---|
| Free | $0 | None (access retired January 10, 2026) | No longer available |
| ChatGPT Plus | $20/mo | Sora 2 (720p), 1,000 credits, 5 RPM | Short-form creators |
| ChatGPT Pro | $200/mo | Sora 2 + Sora 2 Pro (1080p), 10,000 credits, unlimited Relaxed mode, 50 RPM | Agencies, heavy users |
| API Tier 2+ | Pay-per-second | sora-2 and sora-2-pro endpoints | Developers |

API pricing, verified 2026-04-18 via [OpenAI's API pricing page](https://openai.com/api/pricing/) and the [Sora 2 API quota guide](https://www.aifreeapi.com/en/posts/sora-2-api-pricing-quotas):

| Model | Resolution | Price | 10-sec cost |
|---|---|---|---|
| sora-2 | 720p | $0.10/sec | $1.00 |
| sora-2-pro | 720p | $0.30/sec | $3.00 |
| sora-2-pro | 1080p | $0.50/sec | $5.00 |

Credit consumption on the consumer product scales with resolution: 480p costs 4 credits/sec, 720p costs 16 credits/sec, 1080p costs 40 credits/sec. Subscription pricing verified 2026-04-18 via [OpenAI's Sora help center](https://help.openai.com/en/articles/12456897-getting-started-with-the-sora-app).

## Against the alternatives

| | Sora 2 Pro | Veo 3 | Runway Gen-4 | Kling 2.0 |
|---|---|---|---|---|
| **Entry price** | $20/mo (via ChatGPT Plus) | Bundled with Gemini Pro | $15/mo | $10/mo |
| **Max duration** | 25s | 8s | 10s | 10s |
| **Max resolution** | 1080p | 1080p | 4K | 1080p |
| **Native audio** | Yes (with dialogue) | Yes | No | No |
| **Free tier** | None | Limited via Gemini | Yes (trial) | Yes |
| **Best for** | Cinematic clips with speech | Nature and landscape realism | 4K polish | Budget long-form |

## Failure modes

- **No free tier.** Access costs at least $20/mo. This is the biggest barrier to casual experimentation in the category.
- **25-second hard cap on Pro.** Single-clip work past 25 seconds requires stitching, which introduces continuity breaks.
- **No 4K output.** Sora 2 Pro tops out at 1080p. [Runway](/tools/runway/) still wins for 4K deliverables.
- **Single reference image per generation.** Multi-character scenes with locked-in appearances need Vidu's 7-reference pipeline or heavy prompt engineering.
- **Rate limits are tight on Plus.** 5 requests per minute caps batch workflows. Pro's 50 RPM fixes this but at a 10x price jump.
- **Regional access gaps.** Full access outside the US, Canada, Japan, South Korea, Taiwan, and parts of Latin America still requires invite codes or VPN workarounds.
- **Safety filter refusals.** Sora declines a higher share of edgy creative prompts than Chinese-hosted alternatives like Vidu or Kling.
- **Credit burn on 1080p.** At 40 credits/sec, a single 25-second Pro clip consumes 1,000 credits, which is 10% of the monthly Pro allocation.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-18 against [OpenAI's Sora 2 announcement](https://openai.com/index/sora-2/), the [Sora app help center](https://help.openai.com/en/articles/12456897-getting-started-with-the-sora-app), [OpenAI API pricing](https://openai.com/api/pricing/), and the [Sora 2 API pricing and quotas guide](https://www.aifreeapi.com/en/posts/sora-2-api-pricing-quotas).

## FAQ

**Is Sora free to use?**
No. OpenAI retired the Sora free tier on January 10, 2026. Access now requires ChatGPT Plus at $20/month (Sora 2 at 720p) or ChatGPT Pro at $200/month (Sora 2 Pro at 1080p with unlimited overnight Relaxed mode).

**What is the difference between Sora 2 and Sora 2 Pro?**
Sora 2 generates 720p clips up to 15 seconds on the Plus tier. Sora 2 Pro pushes resolution to 1080p, extends duration to 25 seconds, and invests more compute per frame for better textures and smoother motion. Pro requires the $200/mo ChatGPT Pro plan or API access.

**Can Sora generate sound and dialogue?**
Yes. Synchronized audio generates inside the same model, including lip-synced character dialogue. That is Sora's clearest lead over Runway, Pika, and Vidu, which either lack audio or require a second voice-clone pipeline.

**Do I still need an invite code?**
Usually no. OpenAI opened access in the US, Canada, Japan, and South Korea without codes, and ChatGPT Pro users bypass any remaining waitlist. Some regions still require codes or a Pro subscription for instant access.

**How does Sora compare to Veo 3?**
Sora 2 Pro leads on single-clip length (25s vs 8s), synchronized dialogue, and character action. Veo 3 leads on photoreal landscape and nature scenes, and bundles with Gemini Pro instead of requiring a standalone subscription. Both cap at 1080p.

## Related

- **Category:** [AI Video](/categories/ai-video/)
