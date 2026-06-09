---
type: tool
slug: minimax-speech
title: MiniMax Speech
tagline: Multilingual TTS, long-form speech generation, and voice cloning API with Speech 2.8 HD/Turbo as the current model family and subscription or pay-as-you-go pricing.
category: ai-voice
secondary_categories: [ai-research]
company: MiniMax
url: https://www.minimax.io/audio
pricing_model: paid
price_range: "$5-$999/mo subscriptions / $60-$100 per 1M chars PAYG"
status: active
launched: 2025-04
last_updated: 2026-06-08
last_verified: 2026-06-08
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
  moat: 4
  longevity: 6
facts:
  best_for:
    value: "Multilingual TTS, long-form speech generation, streaming, and voice cloning API with Speech 2.8 HD/Turbo as the current model family, 300+ system voices, custom cloned voices, and multiple pricing modes."
    source: "https://platform.minimax.io/docs/api-reference/speech-t2a-intro"
    source_label: "MiniMax T2A docs"
    source_id: minimax-speech-t2a
    verified_at: 2026-06-08
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Audio Subscription starts at $5/month for 100,000 credits; pay-as-you-go lists T2A Turbo at $60/M characters and T2A HD at $100/M characters."
    source: "https://platform.minimax.io/docs/guides/pricing-paygo"
    source_label: "MiniMax pay-as-you-go pricing"
    source_id: minimax-speech-pricing
    verified_at: 2026-06-08
    next_review_at: 2026-07-08
    volatility: high
    confidence: high
  watch_out_for:
    value: "Model names and billing surfaces changed: Speech 2.8 is latest, Speech 2.6/Speech-02 remain supported, and subscription, token-plan, and pay-as-you-go routes can expose different limits."
    source: "https://platform.minimax.io/docs/api-reference/speech-t2a-intro"
    source_label: "MiniMax T2A docs"
    source_id: minimax-speech-t2a
    verified_at: 2026-06-08
    next_review_at: 2026-07-08
    volatility: high
    confidence: high
tags: [tts, voice-cloning, chinese-ai, multilingual, minimax, speech-2-8, api]
seo_title: "MiniMax Speech Review: Cheap TTS, Voice Cloning and ElevenLabs Alternative"
meta_description: "MiniMax Speech is a low-cost TTS and voice-cloning API with current Speech 2.8 HD/Turbo models, 300+ system voices, streaming, long-form async generation, and subscription or pay-as-you-go pricing. Verified June 8, 2026."
author: "aipedia.wiki Editorial"
best_for:
  - cost-sensitive production tts workloads
  - multilingual apps (40 languages)
  - voice cloning with short reference audio
  - conversational ai and ivr systems
not_best_for:
  - users needing the highest quality ceiling for audiobooks or luxury production
  - teams reliant on a large curated third-party voice marketplace
  - developers requiring a mature plugin ecosystem
quick_answer: >-
  MiniMax Speech is the budget ElevenLabs alternative for multilingual TTS and voice cloning. Pick Speech 2.8 Turbo or HD when hosted API economics, voice slots, RPM, and multilingual output matter, especially for apps, IVR, dubbing, agents, or bulk narration. Choose ElevenLabs when the highest creator polish, marketplace breadth, and integrations matter more.
price_history:
  - date: 2026-06-08
    plan: "Audio Subscription / pay-as-you-go"
    price: "$5-$999/mo subscriptions; $60-$100/M chars PAYG"
    source: "https://platform.minimax.io/docs/guides/pricing-paygo"
    source_label: "MiniMax pay-as-you-go pricing"
    source_id: minimax-speech-pricing
    verified_at: 2026-06-08
    note: "June 8 verification pass. Speech 2.8 Turbo and HD remain the current model names in the T2A and voice-cloning docs; PAYG T2A remains $60/M characters for Turbo and $100/M characters for HD; Audio Subscription still runs Starter $5/mo through Business $999/mo."
decision_brief:
  items:
    - label: Best use
      value: "High-volume TTS"
      detail: "The pricing makes sense when character volume is the budget driver."
    - label: Choose HD for
      value: "Voiceovers"
      detail: "Use Turbo for latency and HD for fidelity-sensitive output."
    - label: Compare against
      value: "ElevenLabs"
      detail: "MiniMax is cheaper; ElevenLabs is more mature and polished."
---

# MiniMax Speech

The text-to-speech and voice-cloning product line from [MiniMax](/tools/minimax/), the Shanghai AI lab. The current API docs now put **speech-2.8-hd** and **speech-2.8-turbo** at the front of the model list, while Speech 2.6 and Speech-02 remain supported legacy/current-compatibility routes.

The current docs list 300+ system voices plus custom cloned voices, streaming output, MP3/WAV/FLAC/PCM-style audio support across endpoints, synchronous requests up to 10,000 characters, and async long-form generation up to 1 million characters per task.

## System Verdict

> **Pick MiniMax Speech if the brief is multilingual TTS at production volume where API economics drive the budget.** As of June 8, 2026 the pay-as-you-go page lists T2A Turbo at $60 per million characters and T2A HD at $100 per million characters, while Audio Subscription plans start at $5/month for 100,000 credits and scale to $999/month for 20,000,000 credits.
>
> **Skip it for peak-quality audiobook and luxury production work.** ElevenLabs still holds the quality ceiling, the larger curated voice marketplace, and the deeper third-party integration stack. [Cartesia](/tools/cartesia/) owns low-latency conversational use cases with tighter streaming guarantees.
>
> The naming drift matters. Current docs list Speech 2.8 as latest, while Speech 2.6 and Speech-02 remain visible in API references, pay-as-you-go pricing, token plans, and third-party mirrors. Integration requires checking the exact endpoint and plan, not just the model family name.

## Key Facts

| | |
|---|---|
| **Vendor** | MiniMax (Shanghai, HKEX-listed) |
| **Current API models** | speech-2.8-hd · speech-2.8-turbo |
| **Supported older speech models** | speech-2.6-hd · speech-2.6-turbo · speech-02-hd · speech-02-turbo · speech-01-hd · speech-01-turbo |
| **Pay-as-you-go T2A price** | Turbo $60/M characters · HD $100/M characters |
| **Audio Subscription entry** | Starter $5/mo · 100,000 credits/mo |
| **System voices** | 300+ plus custom cloned voices |
| **Voice cloning** | Rapid cloning from uploaded mono/stereo reference audio; clone is temporary unless used in T2A within 168 hours |
| **Long-form async** | Up to 1 million characters per async task |
| **Streaming** | Supported through HTTP/WebSocket T2A endpoints |
| **Output formats** | MP3, WAV, FLAC, PCM depending on endpoint and streaming mode |
| **Official MCP** | Python and JavaScript MCP server implementations with voice cloning support |

## What it actually is

A hosted TTS API with synchronous T2A, WebSocket T2A, async long-form T2A, voice cloning, voice design, and voice management. Turbo is the cost/speed lane. HD is the fidelity lane. Speech 2.8 is the latest named model family in the current API docs.

Voice cloning now matters as a workflow and governance question, not just a feature bullet. The current API intro says rapid clones are temporary unless used in speech synthesis within 168 hours, and the fee is charged the first time the cloned voice is used in T2A synthesis.

Speed, pitch, volume, bitrate, sample rate, language boost, subtitle output, voice effects, and streaming settings are exposed through the API. Sync endpoints handle up to 10,000 characters per request; async long-form generation handles up to 1 million characters.

## When to pick MiniMax Speech

- **Scaling multilingual IVR, chatbots, or conversational AI.** Turbo at $60 per million characters supports high-volume voice agents economically when the team can integrate directly.
- **Multilingual content pipelines.** One vendor for 40 languages avoids per-market vendor sprawl.
- **Voice cloning from reference clips.** The current voice-cloning endpoint can rapidly reproduce a target timbre from uploaded mono or stereo audio.
- **Cost-sensitive prototyping.** Subscription, token-plan, and pay-as-you-go routes let teams choose predictable monthly credits or usage billing.
- **Agent/MCP voice workflows.** MiniMax provides official MCP server implementations for Python and JavaScript with speech/voice-cloning support.

## When to pick something else

- **Peak-quality audiobook and luxury narration:** [ElevenLabs](/tools/elevenlabs/). MiniMax may be cheaper, but ElevenLabs still has the creator polish, marketplace, and workflow maturity advantage.
- **Curated community voice library:** ElevenLabs and Cartesia have thousands of community-contributed voices. MiniMax's 300+ is a narrower catalog.
- **Lowest-latency streaming for voice agents:** [Cartesia](/tools/cartesia/) is tuned for this. MiniMax streams well, but Cartesia leads.
- **Offline or self-hosted requirement:** [Kokoro](/tools/kokoro/) at Apache 2.0 runs locally. MiniMax Speech is hosted only.
- **Western vendor compliance posture:** ElevenLabs, Cartesia, or Azure Speech. MiniMax is China-based by default.

## Pricing

| Model / Plan | Price | Notes |
|---|---|---|
| Pay-as-you-go T2A Turbo | $60/M characters | Applies to speech-2.8-turbo, speech-2.6-turbo, and speech-02-turbo |
| Pay-as-you-go T2A HD | $100/M characters | Applies to speech-2.8-hd, speech-2.6-hd, and speech-02-hd |
| Rapid voice cloning | $1.50 per voice | Fee is charged on first T2A use of the cloned voice, not preview |
| Voice design | $3 per voice | Prompt-generated voice design |
| Starter sub | $5/mo | 100,000 credits |
| Standard sub | $30/mo | 300,000 credits |
| Pro sub | $99/mo | 1,100,000 credits |
| Scale sub | $249/mo | 3,300,000 credits |
| Business sub | $999/mo | 20,000,000 credits |

*Prices verified 2026-06-08 via the [MiniMax Audio Subscription docs](https://platform.minimax.io/docs/guides/pricing-speech) and [MiniMax pay-as-you-go pricing](https://platform.minimax.io/docs/guides/pricing-paygo). Do not mix up Audio Subscription, Token Plan, and pay-as-you-go: they are different purchase routes with different limits.*

## Against the alternatives

| | MiniMax Speech 2.8 HD | ElevenLabs v3 | Cartesia Sonic | Kokoro |
|---|---|---|---|---|
| **List usage price** | $100/M chars for HD; $60/M chars for Turbo | Higher, plan/credit dependent | Usage-based | Free (self-host) |
| **Languages** | 40 | 32+ | 15+ | 9 |
| **Voice cloning** | 3-10s zero-shot | Best-in-class | Yes | No |
| **Cross-lingual cloning** | Yes | Yes | Limited | N/A |
| **Real-time streaming** | Yes | Yes | Strongest | No |
| **Quality ceiling** | High | Highest | High | Mid (narration-grade) |
| **Voice library breadth** | 300+ | 3,000+ | Large | 26 (v1.0) |
| **Best viewed as** | Cheapest hosted multilingual | Premium hosted | Streaming specialist | Offline-first |

## Failure modes

- **Quality ceiling and workflow maturity below ElevenLabs on critical creator work.** MiniMax is strong on API economics, but ElevenLabs remains the safer default for polished creator narration, voice marketplace breadth, and non-developer production workflows.
- **Voice library is narrower.** 300+ voices against ElevenLabs' thousands. Specific demographic or style gaps can force workarounds.
- **Voice-clone lifecycle can surprise teams.** Rapid clones are temporary unless used in T2A within 168 hours, and fees are charged when the clone is first synthesized through T2A.
- **Ecosystem is thinner.** Fewer SDKs, integrations, and community tutorials compared to ElevenLabs or Cartesia as of June 8, 2026.
- **Peak-load latency spikes.** Some reviews note occasional processing delays under heavy load. Base latency is competitive.
- **China-based vendor.** Enterprise compliance teams with US or EU data-residency requirements should use the private deployment option or choose a Western vendor.
- **Model naming and plan surfaces are easy to confuse.** Speech 2.8, Speech 2.6, and Speech-02 appear across different docs; Audio Subscription, Token Plan, and pay-as-you-go are separate purchase routes.
- **Accent drift on non-native cloned voices.** Cloning an English speaker into Mandarin output preserves timbre but can drift on native accent nuances.

## Methodology

This page was rechecked by the aipedia.wiki editorial workflow on June 8, 2026 against the [MiniMax T2A API overview](https://platform.minimax.io/docs/api-reference/speech-t2a-intro), [MiniMax T2A HTTP docs](https://platform.minimax.io/docs/api-reference/speech-t2a-http), [MiniMax Voice Cloning docs](https://platform.minimax.io/docs/api-reference/voice-cloning-intro), [MiniMax Audio Subscription pricing](https://platform.minimax.io/docs/guides/pricing-speech), [MiniMax pay-as-you-go pricing](https://platform.minimax.io/docs/guides/pricing-paygo), and MiniMax's March 2026 financial-results release. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average).

## FAQ

**How does MiniMax Speech pricing compare to ElevenLabs?**
MiniMax is positioned as the cheaper developer API lane. As of June 8, 2026, MiniMax pay-as-you-go lists T2A Turbo at $60 per million characters and HD at $100 per million characters, plus monthly Audio Subscription plans from $5 to $999. ElevenLabs retains a broader voice library, richer integrations, and a higher quality ceiling for premium production.

**What is the difference between Speech 2.8 HD and Speech 2.8 Turbo?**
HD is the fidelity lane for voiceovers, audiobook-style narration, and polished output. Turbo is the speed/value lane for live apps, chatbots, gaming, IVR, and high-volume generation.

**Does MiniMax Speech have a free tier?**
MiniMax has several purchase paths rather than one simple free tier. Token Plan pages include Speech 2.8 daily character allowances on Plus/Max plans, while Audio Subscription and pay-as-you-go are separate. Check the exact purchase route before assuming credits carry across products.

**What languages does MiniMax Speech cover?**
The current API docs expose language boost options across Chinese, Cantonese, English, Arabic, Russian, Spanish, French, Portuguese, German, Turkish, Dutch, Ukrainian, Vietnamese, Indonesian, Japanese, Italian, Korean, Thai, Polish, Romanian, Greek, Czech, Finnish, Hindi, Bulgarian, Danish, Hebrew, Malay, Persian, Slovak, Swedish, Croatian, Filipino, Hungarian, Norwegian, Slovenian, Catalan, Nynorsk, Tamil, Afrikaans, and auto-detection.

**Can I clone a voice across languages?**
Yes, but treat it as a consent-sensitive production feature. The current voice-cloning API can rapidly reproduce a target timbre from uploaded reference audio, but clones are temporary unless used in T2A within 168 hours and should only be used with proper rights and consent.

## Sources

- [MiniMax T2A API overview](https://platform.minimax.io/docs/api-reference/speech-t2a-intro): current models, T2A features, async generation, and voice cloning overview
- [MiniMax T2A HTTP docs](https://platform.minimax.io/docs/api-reference/speech-t2a-http): supported model IDs, formats, streaming, and language boost options
- [MiniMax Voice Cloning docs](https://platform.minimax.io/docs/api-reference/voice-cloning-intro): rapid cloning lifecycle and supported models
- [MiniMax Audio Subscription pricing](https://platform.minimax.io/docs/guides/pricing-speech): subscription tier rates, credits, voice slots, and RPM
- [MiniMax pay-as-you-go pricing](https://platform.minimax.io/docs/guides/pricing-paygo): per-character T2A pricing, voice cloning, and voice design fees
- [MiniMax FY2025 results](https://www.prnewswire.com/news-releases/minimax-announces-full-year-2025-financial-results-302700868.html): corporate/source context for Speech 2.6 and voice usage scale

## Related

- **Category:** [AI Voice](/categories/ai-voice/)
- **Parent company:** [MiniMax](/tools/minimax/)
- **Compare:** [ElevenLabs](/tools/elevenlabs/) · [Cartesia](/tools/cartesia/) · [Kokoro](/tools/kokoro/)
