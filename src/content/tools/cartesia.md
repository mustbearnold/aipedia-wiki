---
type: tool
slug: cartesia
title: Cartesia
tagline: >-
  Ultra-low latency voice synthesis API built for real-time applications —
  streaming, voice agents, and interactive products.
category: ai-voice
company: Cartesia AI
url: 'https://cartesia.ai'
pricing_model: freemium
price_range: $0-$239/month
status: active
launched: 2023-09
last_updated: 2026-04-14T00:00:00.000Z
last_verified: '2026-04-14'
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 7
  moat: 8
  longevity: 8
tags:
  - ai-voice
  - tts
  - text-to-speech
  - real-time
  - voice-api
  - low-latency
  - voice-agents
seo_title: 'Cartesia Review 2026: Low-Latency Voice Synthesis API'
meta_description: >-
  Cartesia is an AI voice synthesis API with sub-100ms latency, built for
  real-time voice agents and interactive apps. Pricing, features, and
  alternatives reviewed.
author: aipedia.wiki Editorial
quick_answer: >-
  Cartesia is an AI voice synthesis API by Cartesia AI, founded by MIT and Carnegie Mellon researchers, designed specifically for real-time applications with a sub-100ms time-to-first-audio on its Sonic model, compared to 200-500ms for ElevenLabs streaming. The free tier includes 500K characters/month; Starter is $49/month for 3M characters with voice cloning. Best for developers building voice agents, conversational AI, and interactive call systems where latency directly impacts user experience; not optimized for content creation, podcast production, or long-form voiceover work, where ElevenLabs or Murf produce more natural output.
---

# Cartesia

Cartesia is an AI voice synthesis API designed specifically for real-time applications. Where most TTS APIs optimize for quality at any latency, Cartesia optimizes for both — delivering near-human voice quality at under 100ms time-to-first-audio. It is built for voice agents, conversational AI, live call systems, and interactive products where waiting 300-500ms for audio to start is a deal-breaker. Founded in 2023 by researchers from MIT and Carnegie Mellon, Cartesia has rapidly become the default TTS choice for production voice AI applications.

## What It Does

Cartesia's Sonic model generates streaming audio that begins playing in under 100ms from the time of request. This is the defining technical differentiation: other high-quality TTS services (ElevenLabs, OpenAI TTS) have latencies of 200-500ms+ before first audio byte, which creates perceptible pauses in real-time conversations. Cartesia's streaming architecture eliminates this gap.

Core API capabilities:

- **Streaming TTS:** audio begins streaming immediately; no buffering entire clip before playback
- **Voice cloning:** clone a voice from a short sample (3-30 seconds) via API
- **Voice library:** 100+ pre-built voices across styles, ages, and accents
- **Emotion and style control:** adjust prosody, speaking rate, pitch, and emotional tone via API parameters
- **WebSocket and HTTP APIs:** both real-time WebSocket streaming and standard REST endpoints
- **Multi-language support:** 20+ languages with accent-aware synthesis
- **Contextual awareness:** model maintains prosody consistency across multi-turn conversations

Primary use cases are voice agents (AI phone systems, customer service bots), conversational AI interfaces, accessibility tools, and interactive media.

## Who It's For

- **Voice AI developers** building real-time conversational agents, IVR systems, or AI phone apps where latency directly impacts user experience
- **Product teams** adding voice output to AI assistants where the 200-500ms latency of standard TTS breaks the conversational feel
- **Accessibility tool builders** needing high-quality, responsive TTS
- **Game developers** and interactive media creators needing responsive character voice

Not designed for: content creators producing voiceovers for pre-recorded video (ElevenLabs or Murf are better), podcast production, or audiobook generation where latency is irrelevant.

## Pricing

| Plan | Price | Included Characters | Notes |
|------|-------|---------------------|-------|
| Free | $0 | 500K chars/month | API access, Sonic model, standard voices |
| Starter | $49/month | 3M chars/month | Custom voice cloning, priority support |
| Growth | $149/month | 10M chars/month | Faster cloning, commercial license |
| Scale | $499/month | 35M chars/month | Volume SLA, dedicated support |
| Enterprise | Custom | Unlimited | On-prem option, custom SLA |
| Pay-as-you-go | $0.0015/char | N/A | Available on Free and Growth plans |

*Prices verified 2026-04-14. Pricing subject to change; verify at cartesia.ai/pricing.*

The free tier (500K characters/month) is substantial enough for development and light production use. At $0.0015/character pay-as-you-go, a 200-word speech (roughly 1,000 characters) costs $0.0015 — competitive with ElevenLabs and significantly cheaper than OpenAI TTS for high-volume applications.

## Key Features

- **Sub-100ms time-to-first-audio:** the core differentiator; streaming begins before full text is processed
- **Sonic model:** Cartesia's proprietary voice model; quality benchmarks favorably against ElevenLabs v2 and OpenAI TTS
- **Real-time voice cloning:** clone a voice from 3+ seconds of audio; proprietary voices persist via API
- **Contextual prosody:** model tracks conversation context to maintain natural speaking rhythm across turns
- **WebSocket streaming:** designed for bidirectional real-time applications; audio streams chunk by chunk as text arrives
- **Sonic Turbo:** faster, lighter model variant for applications where speed matters more than absolute quality
- **SDKs:** Python, TypeScript/Node.js, and REST; integrates with LiveKit, Daily.co, and other voice infrastructure

## Limitations

- **Not optimized for long-form content:** Cartesia's latency advantage matters most for short conversational utterances; for 5+ minute audio generation, ElevenLabs or Murf produce more natural long-form output
- **Voice cloning quality varies with sample quality** — background noise in the source audio significantly degrades clone results
- **Smaller voice library than ElevenLabs** — 100+ voices vs. ElevenLabs' 3,000+
- **Less consumer-facing tooling** — no web UI for content creators; it is an API-first product requiring code integration
- **Limited emotion range** compared to ElevenLabs' fine-grained emotional controls

## Bottom Line

If you are building a real-time voice application — a voice agent, conversational AI, or interactive product — Cartesia's latency advantage is decisive. For everything else (voiceovers, content creation, podcast production), ElevenLabs or Murf are better choices. Cartesia is a developer-first infrastructure product; it is not trying to be ElevenLabs. Its moat is technical: matching sub-100ms streaming TTS with human-quality output is genuinely hard, and Cartesia has built a head start.

## Best Alternatives

| Tool | Best For | Price |
|------|----------|-------|
| [ElevenLabs](../tools/elevenlabs.md) | Long-form content, largest voice library, consumer UI | Free tier / $5+/mo |
| [Murf](../tools/murf.md) | Studio voiceover production, non-technical users | Free tier / $29+/mo |
| [Descript](../tools/descript.md) | Podcast/video editing with voice synthesis | Free tier / $24+/mo |
| OpenAI TTS | Simple integration if already using OpenAI API | $0.015/1K chars |

## FAQ

**How fast is Cartesia compared to ElevenLabs?**
Cartesia's Sonic model typically achieves under 100ms time-to-first-audio in streaming mode. ElevenLabs' streaming mode typically achieves 200-400ms time-to-first-audio depending on server load and text length. For a live voice agent, the difference is perceptible — Cartesia feels immediate, ElevenLabs streaming has a noticeable half-second gap.

**Can Cartesia clone voices from short samples?**
Yes. Voice cloning requires a minimum of 3 seconds of clean audio, with quality improving significantly up to 30 seconds. The clone is created via API and returns a voice ID you can use for subsequent synthesis calls. Cloning quality is competitive with ElevenLabs for short, clean samples.

**Is Cartesia open source?**
No. Cartesia is a proprietary API. However, the Sonic model has published research papers, and Cartesia has committed to an open-weights research release. For open-source TTS alternatives with competitive quality, see [Kokoro](../tools/kokoro.md).

## Sources

- [Cartesia pricing](https://cartesia.ai/pricing) (verified 2026-04-14)
- [Cartesia Sonic model paper](https://cartesia.ai/research)
- [Cartesia documentation](https://docs.cartesia.ai)
