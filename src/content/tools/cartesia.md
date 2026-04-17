---
type: tool
slug: cartesia
title: Cartesia
tagline: Real-time voice synthesis API. Sonic 3 hits 90ms time-to-first-audio; Sonic Turbo hits 40ms. Built for voice agents, not voiceovers.
category: ai-voice
company: Cartesia AI
url: https://cartesia.ai
pricing_model: freemium
price_range: "$0-$499/month + credits"
status: active
launched: 2023-09
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
  value: 8
  moat: 9
  longevity: 8
tags: [ai-voice, tts, text-to-speech, real-time, voice-api, low-latency, voice-agents, sonic, cartesia]
seo_title: "Cartesia: Features, Pricing & Review (April 2026)"
meta_description: "Cartesia Sonic 3 delivers 90ms time-to-first-audio for real-time voice agents; Sonic Turbo hits 40ms. Credit-based pricing with Free to Enterprise tiers. Reviewed April 2026."
author: "aipedia.wiki Editorial"
best_for:
  - real-time voice agents and conversational AI
  - phone and IVR systems needing sub-100ms latency
  - game NPC dialogue at scale
  - teams integrating with LiveKit, Daily.co, or Twilio
not_best_for:
  - podcast or audiobook narration
  - high-expressiveness character voiceover
  - workflows needing the broadest voice library
  - creators who want a no-code UI
quick_answer: >-
  Cartesia is the real-time voice synthesis leader in 2026. Sonic 3 hits 90ms time-to-first-audio; Sonic Turbo hits 40ms. Pick it for voice agents, phone systems, and interactive products where latency sets trust. Skip it for podcasts or audiobooks where Fish Audio S2 Pro and ElevenLabs rank higher on expressiveness.
price_history:
  - date: 2026-03-01
    plan: "Credits"
    price: "1 credit/char TTS"
    note: "Sonic 3 launch with updated credit-based pricing"
  - date: 2026-04-15
    plan: "Pricing"
    price: "Verified unchanged"
    note: "Free through Scale tiers stable"
---

# Cartesia

Voice synthesis built for real-time use. **Sonic 3** is the current flagship at 90ms time-to-first-audio; **Sonic Turbo** hits 40ms for latency-critical workloads.

Founded in 2023 by MIT and Carnegie Mellon researchers. Integrates natively with LiveKit, Daily.co, and Twilio Voice for voice agent deployments.

## System Verdict

> **Pick Cartesia if building a voice agent, phone system, or any product where sub-100ms latency sets user trust.** Sonic 3 and Turbo lead the real-time TTS category in 2026 benchmarks, with native WebSocket streaming and purpose-built integrations for voice infrastructure.
>
> **Skip it for long-form narration, podcasts, or audiobooks.** [Fish Audio](/tools/fish-audio/) S2 Pro and [ElevenLabs](/tools/elevenlabs/) both rank higher on expressiveness and emotional range. Cartesia optimizes for speed, not nuance.
>
> **Who pays which tier:** Free tier for prototyping. Starter $49/mo for solo devs shipping production voice agents. Growth $199/mo for teams running multi-agent deployments. Scale $499/mo for sustained high-volume workloads. Enterprise for on-prem and custom models.

## Key Facts

| | |
|---|---|
| **Flagship model** | Sonic 3 (90ms time-to-first-audio) |
| **Fastest model** | Sonic Turbo (40ms time-to-first-audio) |
| **Voice library** | 150+ voices |
| **Languages** | 25+ with native prosody |
| **Voice cloning** | 10-second reference minimum; 30-60s for quality |
| **Streaming** | WebSocket, bidirectional audio |
| **Integrations** | LiveKit, Daily.co, Twilio Voice |
| **SDKs** | Python, Node.js, cURL |
| **Pricing model** | Credit-based, 1 credit per character for TTS |
| **Pro Voice Cloning** | 1.5 credits per character + one-time training fee |

Every data point above was verified against vendor sources on 2026-04-17. See Sources.

## What it actually is

A developer API built specifically for real-time voice applications. Not a creator studio, not a consumer app. Cartesia sells latency and streaming reliability to teams shipping voice agents.

Sonic 3 handles the default case at 90ms time-to-first-audio. Sonic Turbo drops that to 40ms for applications where even 100ms gaps break the conversational illusion. Both stream audio chunks as they generate, keeping perceived latency minimal.

The moat is the combination of architecture and integration depth. Competing TTS APIs ship streaming, but few match Sonic Turbo's 40ms TTFA, and none have the same native hooks into LiveKit and Twilio. Voice cloning from 10-second samples covers most production scenarios.

## When to pick Cartesia

- **Building voice agents or conversational AI.** 100ms latency gaps destroy user trust. Cartesia eliminates them.
- **Phone and IVR systems.** Native Twilio Voice integration plus sub-100ms TTFA makes it the default real-time voice stack.
- **Game NPC dialogue at runtime.** Dynamic voice generation during gameplay works at Sonic Turbo's 40ms TTFA.
- **Already on LiveKit or Daily.co.** First-class integrations shorten deployment time significantly.
- **Scaled production voice workloads.** Growth and Scale tiers are priced for teams shipping, not hobbyists.

## When to pick something else

- **Long-form narration or podcasts:** [Fish Audio](/tools/fish-audio/) S2 Pro tops 2026 blind preference tests. [ElevenLabs](/tools/elevenlabs/) remains the creator default.
- **Open-weight self-hosting:** [Fish Audio](/tools/fish-audio/) ships MIT weights. [Voxtral](/tools/voxtral/) ships CC BY-NC weights for non-commercial use.
- **Cheapest multilingual commercial API:** [Voxtral](/tools/voxtral/) at $0.016 per 1K chars undercuts Cartesia's credit pricing at most volumes.
- **Enterprise dubbing with lip-sync:** [Resemble AI](/tools/resemble-ai/) ships Localize across 149 languages and deepfake detection.
- **Personal document reading:** [Speechify](/tools/speechify/) solves consumption, not production.

## Pricing

| Plan | Price | Included | Notes |
|------|-------|----------|-------|
| Free | $0 | Limited credits | Prototyping, Sonic 3 access |
| Starter | $49/mo | Expanded credits | Voice cloning, priority support |
| Growth | $199/mo | Higher credit volume | Custom voices, higher concurrency |
| Scale | $499/mo | Scale credit volume | Volume discounts, dedicated support |
| Enterprise | Custom | Custom | On-prem deployment, custom models |

TTS is billed at 1 credit per character. Pro Voice Cloning runs 1.5 credits per character plus a one-time training fee.

*Prices verified 2026-04-17 via [cartesia.ai/pricing](https://cartesia.ai/pricing) and [eesel AI pricing breakdown](https://www.eesel.ai/blog/cartesia-sonic-3-pricing).*

## Against the alternatives

| | Cartesia Sonic 3 | ElevenLabs v3 | Fish Audio S2 Pro | Voxtral |
|---|---|---|---|---|
| **Time-to-first-audio** | 90ms Sonic 3, 40ms Turbo | 200-400ms streaming | Low, not sub-100ms | ~70ms |
| **Voice cloning reference** | 10+ sec | 1-5 min for best quality | Short samples | 3 sec |
| **Voice library** | 150+ | 5,000+ | Smaller, growing | 9 language-specific |
| **Languages** | 25+ | 30+ | 80+ | 9 |
| **Open weights** | None | None | MIT | CC BY-NC 4.0 |
| **Voice agent integrations** | LiveKit, Daily, Twilio | Some | None native | None native |
| **Best viewed as** | Real-time agent specialist | Creator platform default | Quality + open-weight leader | Mistral-stack voice |

## Failure modes

- **Not tuned for long-form narration.** Expressiveness and emotional range trail ElevenLabs and Fish Audio at equivalent speeds. Use it for agents, not audiobooks.
- **Voice library is smaller than ElevenLabs.** 150+ voices versus 5,000+. Teams needing specific voice personas may need to clone.
- **Voice cloning needs clean reference audio.** Noisy input produces artifacts. 30-60 seconds of clean, varied speech is the practical minimum for production quality.
- **Credit pricing is opaque at low volumes.** Free tier credit count varies by plan refresh. High-volume teams should model credit consumption against the pay-as-you-go alternative before committing.
- **No consumer UI.** API-only. Creators without engineering resources should pick ElevenLabs or Fish Audio.
- **Enterprise features gate on-prem.** Teams with data-residency requirements need the custom tier. Scale at $499 still uses the hosted API.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity). Last verified 2026-04-17 against [Cartesia pricing](https://cartesia.ai/pricing), [Sonic 3 page](https://cartesia.ai/sonic), [Cartesia docs](https://docs.cartesia.ai/), and [eesel AI pricing analysis](https://www.eesel.ai/blog/cartesia-sonic-3-pricing).

## FAQ

**How does Cartesia latency compare to ElevenLabs?**
Sonic 3 hits 90ms time-to-first-audio and Sonic Turbo hits 40ms. ElevenLabs streaming typically lands at 200-400ms. The gap creates perceptible delays in voice agents where Cartesia feels live and ElevenLabs feels laggy.

**What audio length is needed for voice cloning?**
Minimum 10 seconds of clean audio produces usable clones. 30-60 seconds yields production quality. Clones persist via API voice IDs for reuse across sessions.

**Does Cartesia support long conversations?**
Yes. The model maintains prosody context across multiple turns, which keeps voice consistency stable across long voice-agent sessions.

**Can Cartesia handle non-English languages?**
Yes. 25+ languages with native prosody. Multilingual coverage is narrower than [Fish Audio](/tools/fish-audio/) but sufficient for most voice-agent deployments in Western markets.

**Is there a free tier?**
Yes. The free plan provides limited credits and Sonic 3 access for prototyping. Production workloads run on paid tiers from $49/mo.

## Sources

- [Cartesia pricing](https://cartesia.ai/pricing): current tier structure and credit costs
- [Sonic 3 page](https://cartesia.ai/sonic): latency benchmarks and capabilities
- [Cartesia docs](https://docs.cartesia.ai/): API spec, SDKs, integrations
- [eesel AI: Cartesia Sonic 3 pricing](https://www.eesel.ai/blog/cartesia-sonic-3-pricing): 2026 pricing breakdown
- [Inworld: Best TTS APIs for real-time voice agents 2026](https://inworld.ai/resources/best-voice-ai-tts-apis-for-real-time-voice-agents-2026-benchmarks): latency benchmarks

## Related

- **Category:** [AI Voice / TTS](/categories/ai-voice/)
- **Comparisons:** [Cartesia vs ElevenLabs](/comparisons/cartesia-vs-elevenlabs/), [Cartesia vs Fish Audio](/comparisons/cartesia-vs-fish-audio/), [Cartesia vs Voxtral](/comparisons/cartesia-vs-voxtral/), [Cartesia vs Resemble AI](/comparisons/cartesia-vs-resemble-ai/)
