---
type: tool
slug: minimax-speech
title: MiniMax Speech
tagline: Multilingual TTS and voice cloning API with a 40-language model family that undercuts ElevenLabs pricing by up to 85%.
category: ai-voice
secondary_categories: [ai-research]
company: MiniMax
url: https://www.minimax.io/audio
pricing_model: freemium
price_range: "$0 free tier / $0.03-$0.05 per 1K chars"
status: active
launched: 2025-04
last_updated: 2026-05-02
last_verified: 2026-04-17
update_frequency: quarterly
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
tags: [tts, voice-cloning, chinese-ai, multilingual, minimax, speech-02, api]
seo_title: "MiniMax Speech Review: Cheap TTS, Voice Cloning and ElevenLabs Alternative"
meta_description: "MiniMax Speech is a low-cost TTS and voice-cloning API with Speech-02-HD, Speech-02-Turbo, 300+ voices, 40 languages, and pricing far below ElevenLabs."
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
  MiniMax Speech is the budget ElevenLabs alternative for multilingual TTS and voice cloning. Pick Speech-02-Turbo or HD when price-per-character matters, especially for apps, IVR, dubbing, or bulk narration. Choose ElevenLabs when the highest voice quality, marketplace breadth, and integrations matter more.
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

The text-to-speech and voice-cloning product line from [MiniMax](/tools/minimax/), the Shanghai AI lab. Three model tiers are in active use: **Speech-02-Turbo** for low-latency and cost-sensitive workloads, **Speech-02-HD** for high-fidelity production, and **Speech 2.6** as the web-platform flagship.

40-language coverage. 300+ pre-built voices. 5-second zero-shot voice cloning. Speech-02-HD ranked first on the Artificial Analysis Speech Arena at time of measurement.

## System Verdict

> **Pick MiniMax Speech if the brief is multilingual TTS at production volume where price-per-character drives the budget.** At $0.03-$0.05 per 1K chars it runs 80-85% cheaper than [ElevenLabs](/tools/elevenlabs/) pay-per-use, with 40-language output and emotion-aware delivery.
>
> **Skip it for peak-quality audiobook and luxury production work.** ElevenLabs still holds the quality ceiling, the larger curated voice marketplace, and the deeper third-party integration stack. [Cartesia](/tools/cartesia/) owns low-latency conversational use cases with tighter streaming guarantees.
>
> The naming drift matters. "Speech 2.6" on the web platform and "Speech-02-HD/Turbo" on the API are the same product line with slightly different SKUs. Integration requires reading both docs carefully.

## Key Facts

| | |
|---|---|
| **Vendor** | MiniMax (Shanghai, HKEX-listed) |
| **Model tiers** | Speech-02-Turbo, Speech-02-HD, Speech 2.6 |
| **API price (Turbo)** | $0.03 per 1K characters |
| **API price (HD)** | $0.05 per 1K characters |
| **Languages** | 40, with native accents |
| **Pre-built voices** | 300+ |
| **Voice cloning** | Zero-shot from 3-10 second reference audio |
| **Cross-lingual cloning** | Yes (clone English, speak Spanish with same timbre) |
| **Emotions** | 9 (auto, happy, sad, angry, fearful, disgusted, surprised, calm, neutral) |
| **Streaming** | Real-time supported |
| **Output formats** | MP3, WAV, FLAC, PCM at 8000-44100 Hz |
| **Arena ranking** | Speech-02-HD ranked #1 on Artificial Analysis Speech Arena |
| **Free tier** | 10,000 credits/month |

## What it actually is

A hosted TTS API with three modes. Turbo is speed and cost. HD is fidelity. Speech 2.6 is the current-generation platform brand.

Zero-shot cloning works from 3-10 seconds of reference audio. No fine-tuning. The cloned voice carries across all supported languages, which is a material differentiator against older TTS clone pipelines.

The emotion controls ship nine tags plus an auto mode that infers emotional tone from text context. Speed, pitch, volume, and bitrate are exposed as parameters. Sync endpoints handle up to 10,000 characters per request; async batch handles up to 200,000.

## When to pick MiniMax Speech

- **Scaling multilingual IVR, chatbots, or conversational AI.** Turbo at $0.03 per 1K chars supports high-volume voice agents economically.
- **Multilingual content pipelines.** One vendor for 40 languages avoids per-market vendor sprawl.
- **Voice cloning from short reference clips.** The 5-second requirement is practical for talent workflows.
- **Cost-sensitive prototyping.** 10,000 free credits monthly cover prototype-scale volume without a card on file.
- **Cross-lingual cloning.** Clone a speaker in English and output Spanish with the same timbre. This is not easy elsewhere.

## When to pick something else

- **Peak-quality audiobook and luxury narration:** [ElevenLabs](/tools/elevenlabs/). MiniMax trails on the very top of the quality range.
- **Curated community voice library:** ElevenLabs and Cartesia have thousands of community-contributed voices. MiniMax's 300+ is a narrower catalog.
- **Lowest-latency streaming for voice agents:** [Cartesia](/tools/cartesia/) is tuned for this. MiniMax streams well, but Cartesia leads.
- **Offline or self-hosted requirement:** [Kokoro](/tools/kokoro/) at Apache 2.0 runs locally. MiniMax Speech is hosted only.
- **Western vendor compliance posture:** ElevenLabs, Cartesia, or Azure Speech. MiniMax is China-based by default.

## Pricing

| Model / Plan | Price | Notes |
|---|---|---|
| Free tier | $0 | 10,000 credits/month |
| Speech-02-Turbo | $0.03 per 1K chars | ~$30 per 1M characters |
| Speech-02-HD | $0.05 per 1K chars | ~$50 per 1M characters |
| Voice cloning | $3 per voice | One-time, requires real-name verification |
| Starter sub | $5/mo | 100,000 credits |
| Standard sub | $30/mo | 300,000 credits |
| Pro sub | $99/mo | 1,100,000 credits |
| Business sub | $999/mo | 20,000,000 credits |

*Prices verified 2026-04-17 via the [MiniMax Speech platform docs](https://platform.minimax.io/docs/guides/pricing-speech), [Replicate Speech-02 listing](https://replicate.com/minimax/speech-02-hd), and [fal.ai Speech-02-HD](https://fal.ai/models/fal-ai/minimax/speech-02-hd). For reference: ElevenLabs pay-per-use runs roughly $0.30 per 1K chars, placing Speech-02-HD at about 6x cheaper per character.*

## Against the alternatives

| | MiniMax Speech-02-HD | ElevenLabs v3 | Cartesia Sonic | Kokoro |
|---|---|---|---|---|
| **$/1K chars (list)** | $0.05 | ~$0.30 | ~$0.15 | Free (self-host) |
| **Languages** | 40 | 32+ | 15+ | 9 |
| **Voice cloning** | 3-10s zero-shot | Best-in-class | Yes | No |
| **Cross-lingual cloning** | Yes | Yes | Limited | N/A |
| **Real-time streaming** | Yes | Yes | Strongest | No |
| **Quality ceiling** | High | Highest | High | Mid (narration-grade) |
| **Voice library breadth** | 300+ | 3,000+ | Large | 26 (v1.0) |
| **Best viewed as** | Cheapest hosted multilingual | Premium hosted | Streaming specialist | Offline-first |

## Failure modes

- **Quality ceiling below ElevenLabs on critical listening.** Independent reviews flag ElevenLabs winning on luxury audiobook and high-stakes production. MiniMax is close but not ahead.
- **Voice library is narrower.** 300+ voices against ElevenLabs' thousands. Specific demographic or style gaps can force workarounds.
- **Voice cloning requires real-name verification.** Individual or enterprise verification adds friction to quick prototypes.
- **Ecosystem is thinner.** Fewer SDKs, integrations, and community tutorials compared to ElevenLabs or Cartesia as of April 2026.
- **Peak-load latency spikes.** Some reviews note occasional processing delays under heavy load. Base latency is competitive.
- **China-based vendor.** Enterprise compliance teams with US or EU data-residency requirements should use the private deployment option or choose a Western vendor.
- **Model naming inconsistency.** Web platform shows "Speech 2.6" while API docs reference "Speech-02-HD/Turbo." The mapping is not clearly documented.
- **Accent drift on non-native cloned voices.** Cloning an English speaker into Mandarin output preserves timbre but can drift on native accent nuances.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis shown here. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against the [MiniMax Audio product page](https://www.minimax.io/audio), [MiniMax Speech-02 series announcement](https://www.minimax.io/news/speech-02-series), [Replicate pricing](https://replicate.com/minimax/speech-02-hd), [fal.ai listing](https://fal.ai/models/fal-ai/minimax/speech-02-hd), and the [platform.minimax.io pricing docs](https://platform.minimax.io/docs/guides/pricing-speech).

## FAQ

**How does MiniMax Speech pricing compare to ElevenLabs?**
Speech-02-HD costs $0.05 per 1,000 characters. ElevenLabs pay-per-use runs around $0.30 per 1K for equivalent quality, putting MiniMax at roughly 6x cheaper. ElevenLabs retains a broader voice library, richer integrations, and a higher quality ceiling for premium production.

**What is the difference between Speech-02-HD and Speech-02-Turbo?**
HD is optimized for fidelity and costs $0.05 per 1K chars. It suits voiceovers and audiobooks. Turbo is optimized for speed and cost at $0.03 per 1K chars. It suits real-time conversational apps and IVR. Feature sets (emotions, cloning, languages) are equivalent.

**Does MiniMax Speech have a free tier?**
Yes. 10,000 credits per month covers prototype-scale work. Voice cloning on the free tier requires identity verification and is capped more tightly than paid tiers.

**What languages does MiniMax Speech cover?**
40 languages with native pronunciation and dialect support. English (US, UK, Australian, Indian), Mandarin, Cantonese, Japanese, Korean, French, German, Spanish, Arabic, and many more ([MiniMax Audio](https://www.minimax.io/audio)).

**Can I clone a voice across languages?**
Yes. Clone a speaker from a 3-10 second English sample, then output audio in Spanish, Mandarin, or any of the 40 supported languages using the cloned timbre. Accent nuance can drift on non-native outputs.

## Sources

- [MiniMax Audio product page](https://www.minimax.io/audio): official features and voice library
- [Speech-02 series announcement](https://www.minimax.io/news/speech-02-series): launch details and specifications
- [MiniMax Speech 2.6 announcement](https://www.minimax.io/news/minimax-speech-26): current web-platform flagship
- [Replicate Speech-02-HD](https://replicate.com/minimax/speech-02-hd): per-character pricing reference
- [fal.ai Speech-02-HD](https://fal.ai/models/fal-ai/minimax/speech-02-hd): API integration specs
- [MiniMax Speech pricing docs](https://platform.minimax.io/docs/guides/pricing-speech): subscription tier rates
- [Voice Clone docs](https://platform.minimax.io/docs/guides/speech-voice-clone): cloning API reference

## Related

- **Category:** [AI Voice](/categories/ai-voice/)
- **Parent company:** [MiniMax](/tools/minimax/)
- **Compare:** [ElevenLabs](/tools/elevenlabs/) · [Cartesia](/tools/cartesia/) · [Kokoro](/tools/kokoro/)
