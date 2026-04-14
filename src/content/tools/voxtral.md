---
type: tool
slug: voxtral
title: Voxtral
tagline: Mistral AI's open-weight speech-to-text and voice model — cheapest commercial TTS API in 2026 at 47% less than ElevenLabs.
category: ai-voice
company: Mistral AI
url: https://mistral.ai/voxtral
pricing_model: freemium
price_range: "Free (open-weight) / $0.016/1K chars API"
status: active
launched: 2026-03
last_updated: 2026-04-14
last_verified: 2026-04-14
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 10
  moat: 6
  longevity: 8
tags: [text-to-speech, tts, open-weight, api, voice-generation, mistral, cheap]
seo_title: "Voxtral (Mistral AI) Review (2026): Cheapest TTS API"
meta_description: "Voxtral is Mistral AI's open-weight voice model. $0.016/1K chars — 47% cheaper than ElevenLabs. Review and comparison April 2026."
author: "aipedia.wiki Editorial"
---

# Voxtral

Voxtral is Mistral AI's voice model, launched in March 2026. It is simultaneously an open-weight model (free to self-host) and a commercial API — the same dual-release strategy Mistral has used for its text models. The commercial API prices Voxtral at $0.016 per 1,000 characters, which undercuts every major competitor: ElevenLabs charges $0.030/1K chars on its API, making Voxtral 47% cheaper at equivalent scale.

Voxtral handles both speech-to-text (transcription) and text-to-speech (voice generation). The text-to-speech output is natural-sounding and supports multiple languages consistent with Mistral's multilingual model family. Voice quality is competitive with commercial-tier tools, though benchmarks consistently place [ElevenLabs](../tools/elevenlabs.md) above Voxtral on naturalness and emotional range. Voxtral's advantage is cost and self-hostability, not absolute output quality.

For developers building voice-enabled applications, Voxtral is the default choice unless voice quality is a primary product differentiator. At $0.016/1K chars, it enables use cases that were economically marginal at ElevenLabs pricing.

## What It Does

Voxtral performs two functions:

**Text-to-Speech:** Convert text to natural-sounding audio. Multiple speaker voices included. Multilingual support across the languages covered in Mistral's model family. Output as MP3 or WAV. API-accessible with straightforward REST calls.

**Speech-to-Text:** Transcribe audio to text with high accuracy. Competitive with Whisper (OpenAI's open-source transcription model) on standard benchmarks. Supports long-form audio (interviews, meetings, lectures). Returns timestamps and speaker diarization.

The open-weight model can be self-hosted on hardware that supports Mistral's model format (GGUF-compatible).

## Who It's For

- **Developers** building voice-enabled applications who need cost-efficient TTS at scale
- **High-volume producers** (content platforms, e-learning, accessibility tools) where per-character cost matters
- **Privacy-sensitive deployments** where audio should not leave your infrastructure
- **Teams already using Mistral** for text generation who want a single API vendor
- **Researchers** experimenting with voice synthesis who want a free open-weight baseline

## Pricing

| Access | Cost | Notes |
|--------|------|-------|
| Open-weight model | Free | Self-host; requires capable GPU |
| Mistral API (TTS) | $0.016/1K chars | ~47% cheaper than ElevenLabs API |
| Mistral API (STT) | $0.002/minute | Competitive with Whisper API |

> For comparison: ElevenLabs API = $0.030/1K chars. OpenAI Whisper API = $0.006/min.

## Key Features

- **$0.016/1K chars** — lowest commercial TTS API price among major providers as of April 2026
- **Open-weight** — full model weights released; self-host for zero marginal cost
- **Speech-to-text** — transcription built into the same model, not a separate product
- **Multilingual** — supports French, Spanish, German, Italian, Portuguese, and more (Mistral's language coverage)
- **Single API vendor** — combine with Mistral text models under one account and invoice
- **Long-form audio** — no hard limits on input length for transcription

## Limitations

- **Voice quality below ElevenLabs** — naturalness and emotional range benchmarks consistently favor ElevenLabs, especially for expressive content
- **No voice cloning** — Voxtral does not support custom voice cloning from audio samples; [ElevenLabs](../tools/elevenlabs.io) and [Resemble AI](../tools/resemble-ai.md) lead here
- **Limited voice library** — fewer stock voice options than ElevenLabs or [Murf](../tools/murf.md)
- **No consumer product** — API-only; no browser interface for non-developers
- **March 2026 launch** — newer than competitors; less community tooling and fewer third-party integrations

## Bottom Line

Voxtral scores 10/10 on value — it is the cheapest commercial TTS API and free to self-host. Utility is 8/10 for its primary use case (developer API integration), slightly lower for content creators who need voice cloning or a broad voice library. Longevity is 8/10: Mistral is well-funded and has a track record of maintaining open models. The open-weight release makes this category of risk lower than typical API-only products. If you are building a voice application and quality is not your primary differentiator, Voxtral should be your default.

## Best Alternatives

| Tool | Price | Key Difference |
|------|-------|----------------|
| [ElevenLabs](../tools/elevenlabs.md) | $5-330/mo | Best quality; voice cloning; consumer product |
| [Fish Audio (S2)](../tools/fish-audio.md) | Free / API | Open-source; near-ElevenLabs quality; self-hostable |
| [Cartesia](../tools/cartesia.md) | $0/API (free tier) | Ultra-low latency; real-time voice applications |
| [Murf](../tools/murf.md) | $19-39/mo | Studio-quality narration voices; no API focus |

## FAQ

**Is Voxtral's open-weight model free to use commercially?**
Yes — Mistral releases Voxtral under an open-weight license that permits commercial use. Check the exact license terms on Mistral's HuggingFace repository for any attribution or distribution requirements.

**How does Voxtral compare to ElevenLabs for podcast narration?**
ElevenLabs is better. For narration where listener experience is the product — podcasts, audiobooks, YouTube voiceovers — ElevenLabs produces more natural, emotionally varied output. Voxtral is the right choice when cost at scale matters more than top-tier quality.

**Does Voxtral work with the Mistral API directly?**
Yes. Voxtral is integrated into the standard Mistral API. Developers already using Mistral for text generation can add voice capabilities without a new vendor relationship, new API key, or billing account.

## Sources
- [Mistral AI Voxtral announcement](https://mistral.ai) — verified 2026-04-14
- [Mistral API pricing](https://mistral.ai/api) — verified 2026-04-14
