---
type: tool
slug: voxtral
title: Voxtral
tagline: Mistral AI's open-weight speech-to-text and voice model, cheapest commercial TTS API in 2026 at 47% less than ElevenLabs.
category: ai-voice
company: Mistral AI
url: https://mistral.ai/voxtral
pricing_model: freemium
price_range: "Free (open-weight) / $0.016/1K chars API"
status: active
launched: 2026-03
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
  utility: 8
  value: 10
  moat: 6
  longevity: 8
tags: [text-to-speech, tts, open-weight, api, voice-generation, mistral, cheap]
seo_title: "Voxtral (Mistral AI) Review (2026): Cheapest TTS API"
meta_description: "Voxtral is Mistral AI's open-weight voice model. $0.016/1K chars, 47% cheaper than ElevenLabs. Review and comparison April 2026."
author: "aipedia.wiki Editorial"
quick_answer: >-
  Voxtral is Mistral AI's open-weight voice model, launched March 2026, that handles both text-to-speech and speech-to-text in a single API, and is simultaneously free to self-host and available via the Mistral commercial API. The commercial TTS API is priced at $0.016 per 1,000 characters, which is 47% cheaper than ElevenLabs ($0.030/1K chars), making it the lowest-cost major TTS API as of April 2026. Best for developers building voice-enabled applications at scale where cost matters more than top-tier expressiveness; not for content creators who need voice cloning or a wide voice library, where ElevenLabs is the stronger choice. Voxtral does not support custom voice cloning, has a narrower stock voice library than competitors, and launched only weeks ago with limited community tooling.
best_for:
  - Developers building voice-enabled applications at scale
  - High-volume content producers (e-learning, accessibility, platforms)
  - Teams already using Mistral for text generation
  - Privacy-sensitive deployments requiring on-premise audio processing
  - Researchers experimenting with voice synthesis
not_best_for:
  - Content creators needing voice cloning or emotional expressiveness
  - Podcast and audiobook producers prioritizing naturalness
  - Users requiring a consumer-facing UI or no-code interface
  - Applications demanding the broadest multilingual voice library
---

# Voxtral

Voxtral is Mistral AI's voice model, launched in March 2026. It is simultaneously an open-weight model (free to self-host) and a commercial API, following Mistral's dual-release strategy used for its text models. The commercial API prices Voxtral at $0.016 per 1,000 characters, undercutting every major competitor: ElevenLabs charges $0.030/1K chars on its API, making Voxtral 47% cheaper at equivalent scale. Voxtral handles both speech-to-text (transcription) and text-to-speech (voice generation) in a unified model, reducing vendor fragmentation for developers.

## What It Does

Voxtral performs two core functions within a single model architecture:

**Text-to-Speech:** Converts text to natural-sounding audio across multiple speaker voices. Supports multilingual output consistent with Mistral's model family (French, Spanish, German, Italian, Portuguese, Dutch, and others). Output formats include MP3 and WAV. The API accepts straightforward REST calls with configurable voice selection, speaking rate, and pitch parameters. Voice quality is competitive with commercial-tier tools, though independent benchmarks consistently place [ElevenLabs](../tools/elevenlabs.md) above Voxtral on naturalness and emotional range metrics.

**Speech-to-Text:** Transcribes audio to text with accuracy competitive with OpenAI's Whisper on standard benchmarks. Supports long-form audio (interviews, meetings, lectures, podcasts) without hard length limits. Returns word-level timestamps and speaker diarization for multi-speaker content. Handles background noise and accented speech reasonably well for a March 2026 release.

The open-weight model can be self-hosted on hardware supporting Mistral's model format (GGUF-compatible inference engines). This enables zero-marginal-cost deployments for organizations with existing GPU infrastructure.

## Who It's For

- Developers building voice-enabled applications where per-character cost directly impacts unit economics
- High-volume content producers (e-learning platforms, accessibility services, automated narration systems) operating at scale
- Teams already using Mistral for text generation who want to consolidate vendor relationships and billing
- Organizations with privacy requirements where audio must not leave on-premise infrastructure
- Researchers and hobbyists experimenting with voice synthesis who want a free, open-weight baseline
- Startups in early-stage voice product development where cost efficiency enables faster iteration

## Pricing

| Access | Cost | Notes |
|--------|------|-------|
| Open-weight model | Free | Self-host; requires GPU with 8GB+ VRAM |
| Mistral API (TTS) | $0.016/1K chars | Approximately 47% cheaper than ElevenLabs API |
| Mistral API (STT) | $0.002/minute | Competitive with OpenAI Whisper API pricing |

Prices verified 2026-04-15. For comparison: [ElevenLabs](../tools/elevenlabs.md) API charges $0.030/1K chars for TTS; OpenAI Whisper API charges $0.006/minute for STT.

## Key Features

- $0.016/1K chars pricing, lowest commercial TTS API cost among major providers as of April 2026
- Open-weight model release, full model weights available; self-host for zero marginal cost after infrastructure investment
- Unified speech-to-text and text-to-speech, transcription and generation in one model, reducing API fragmentation
- Multilingual support, covers French, Spanish, German, Italian, Portuguese, Dutch, and additional languages within Mistral's language coverage
- Single API vendor integration, combine with Mistral text models (Mistral Large 2, Mistral Small) under one account and invoice
- Long-form audio handling, no artificial limits on transcription input length
- Timestamp and diarization output, word-level timing and speaker identification for multi-speaker content

## Limitations

- Voice quality below ElevenLabs, naturalness and emotional range benchmarks consistently favor ElevenLabs, particularly for expressive narration and character voices
- No voice cloning, Voxtral does not support custom voice cloning from audio samples; [ElevenLabs](../tools/elevenlabs.md) and [Resemble AI](../tools/resemble-ai.md) remain the category leaders
- Limited voice library, fewer stock voice options than ElevenLabs or [Murf](../tools/murf.md); approximately 12-15 voices versus ElevenLabs' 30+
- API-only product, no browser interface, no consumer-facing UI, no no-code studio for non-developers
- March 2026 launch, newer than competitors; limited community tooling, fewer third-party integrations, and smaller ecosystem of plugins and wrappers

## Bottom Line

Voxtral scores 10/10 on value: it is the cheapest commercial TTS API and free to self-host. Utility is 8/10 for its primary use case (developer API integration), lower for content creators needing voice cloning or broad voice libraries. Longevity is 8/10: Mistral is well-funded with a track record of maintaining open models long-term. The open-weight release mitigates typical API-only product risk. If you are building a voice application and quality is not your primary differentiator, Voxtral should be your default choice.

## Best Alternatives

| Tool | Price | Key Difference |
|------|-------|----------------|
| [ElevenLabs](../tools/elevenlabs.md) | $5-330/mo | Best voice quality; voice cloning; consumer product |
| [Fish Audio S2](../tools/fish-audio.md) | Free / API | Open-source; near-ElevenLabs quality; self-hostable |
| [Cartesia](../tools/cartesia.md) | Free tier / API | Ultra-low latency; real-time voice applications |

## FAQ

**Is Voxtral's open-weight model free to use commercially?**
Yes. Mistral releases Voxtral under an open-weight license permitting commercial use. Check the exact license terms on Mistral's HuggingFace repository for any attribution or distribution requirements specific to your deployment model.

**How does Voxtral compare to ElevenLabs for podcast narration?**
ElevenLabs is the better choice. For narration where listener experience is the primary product (podcasts, audiobooks, YouTube voiceovers), ElevenLabs produces more natural and emotionally varied output. Voxtral is the right choice when cost at scale matters more than top-tier voice quality.

**Can I use Voxtral with the Mistral API directly?**
Yes. Voxtral is integrated into the standard Mistral API. Developers already using Mistral for text generation can add voice capabilities without a new vendor relationship, separate API key, or additional billing account.

## Sources

- [Mistral AI Voxtral announcement](https://mistral.ai/voxtral) - verified 2026-04-15
- [Mistral API pricing documentation](https://mistral.ai/api) - verified 2026-04-15