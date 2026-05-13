---
type: tool
slug: voxtral
title: Voxtral
tagline: Mistral AI's open-weight speech understanding family. Voxtral Mini Transcribe V2 for batch and Voxtral Realtime for sub-200ms live transcription with native semantic understanding.
category: ai-voice
company: Mistral AI
url: https://mistral.ai/news/voxtral
pricing_model: freemium
price_range: "Free open weights (Apache 2.0 / Realtime) / API from $0.001 per minute"
status: active
launched: 2025-07
last_updated: 2026-05-13
last_verified: 2026-05-13
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
facts:
  model_family:
    value: "Voxtral is Mistral's open-weight speech understanding (STT) family. As of May 2026 the API exposes Voxtral Mini Transcribe V2 for batch transcription and Voxtral Realtime for sub-200ms live transcription. Voxtral Realtime is published under Apache 2.0 and is deployable on edge devices."
    source: "https://mistral.ai/news/voxtral"
    source_label: "Mistral Voxtral launch"
    source_id: voxtral-pricing
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
  api_available:
    value: "Yes. Mistral exposes hosted speech-to-text APIs through La Plateforme covering both batch transcription (Voxtral Mini Transcribe V2) and live transcription (Voxtral Realtime). The full Realtime weights also ship under Apache 2.0 for self-hosting."
    source: "https://docs.mistral.ai/studio-api/audio/speech_to_text"
    source_label: "Mistral audio docs"
    source_id: voxtral-docs
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
  pricing_anchor:
    value: "Voxtral API pricing starts at about $0.001 per minute via La Plateforme, which Mistral positions as less than half the price of Whisper and ElevenLabs Scribe. Confirm current rates on the Mistral pricing page before production rollout."
    source: "https://docs.mistral.ai/models/overview"
    source_label: "Mistral model overview"
    source_id: mistral-models-docs
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: medium
  best_for:
    value: "Teams running transcription, voice-agent, or audio-understanding pipelines at scale that need cheap per-minute STT, edge deployment via Apache 2.0 weights, or native semantic understanding alongside raw transcripts. Not a TTS tool."
    source: "https://docs.mistral.ai/studio-api/audio/speech_to_text"
    source_label: "Mistral audio docs"
    source_id: voxtral-docs
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
  watch_out_for:
    value: "Voxtral is a speech-to-text and audio-understanding family, not a text-to-speech engine. Do not pick it for voice generation, voice cloning, narration, or dubbing workflows. Pair it with a dedicated TTS provider (ElevenLabs, Fish Audio, Cartesia) if you need voice output."
    source: "https://mistral.ai/news/voxtral"
    source_label: "Mistral Voxtral launch"
    source_id: voxtral-pricing
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
tags: [speech-to-text, stt, transcription, audio-understanding, open-weight, api, mistral, multilingual, voice-agent, edge]
seo_title: "Voxtral (Mistral AI): Features, Pricing & Review (May 2026)"
meta_description: "Voxtral is Mistral AI's open-weight speech understanding family. Voxtral Mini Transcribe V2 for batch and Voxtral Realtime (Apache 2.0, sub-200ms) for live transcription. From $0.001 per minute via API."
author: "aipedia.wiki Editorial"
best_for:
  - developers running transcription at scale and on a budget
  - real-time voice agents needing sub-200ms STT
  - teams already using Mistral text models
  - self-hosting on edge devices under Apache 2.0 (Voxtral Realtime)
  - multilingual speech understanding across 13 languages with auto language detection
not_best_for:
  - text-to-speech, narration, dubbing, or voice cloning workloads
  - creator workflows needing a polished voiceover studio
  - languages outside the documented set
  - heavy expressive synthesis where Fish Audio or ElevenLabs lead
quick_answer: >-
  Voxtral is Mistral AI's open-weight speech understanding family (STT, not TTS). Voxtral Mini Transcribe V2 handles batch transcription with speaker ID, custom vocab, and word-level timing across 13 languages; Voxtral Realtime ships under Apache 2.0 with sub-200ms latency for live voice agents and edge deployment. API pricing starts around $0.001/min, well under half of Whisper and ElevenLabs Scribe. Skip it for TTS, voice cloning, or narration.
price_history:
  - date: 2025-07-15
    plan: "API launch"
    price: "From $0.001/min"
    source: "https://mistral.ai/news/voxtral"
    source_label: "Source"
    source_id: voxtral-pricing
    note: "Voxtral speech understanding launched July 15, 2025 with Voxtral (24B) and Voxtral Mini (3B) open weights and a per-minute API priced at less than half of Whisper and ElevenLabs Scribe."
  - date: 2026-05-13
    plan: "API (current model lineup)"
    price: "From $0.001/min"
    source: "https://docs.mistral.ai/capabilities/audio/"
    source_label: "Source"
    source_id: voxtral-docs
    note: "Voxtral Mini Transcribe V2 (batch, up to 3-hour recordings, speaker ID, custom vocabulary, word-level timestamps, 13 languages) and Voxtral Realtime (sub-200ms latency, Apache 2.0 weights, edge-deployable) are the documented production models. API pricing remains at around $0.001/min on La Plateforme."
---

# Voxtral

Mistral AI's open-weight speech understanding family. Voxtral launched July 15, 2025 with two open-weight models (Voxtral 24B for scale and Voxtral Mini 3B for edge), positioned as frontier STT plus native semantic understanding rather than raw transcription.

As of May 2026 the production API lineup is Voxtral Mini Transcribe V2 for batch and Voxtral Realtime for live transcription. Voxtral Realtime ships under Apache 2.0 and can be deployed on edge devices. API pricing starts around $0.001 per minute on La Plateforme. Voxtral is a speech-to-text family. It does not generate speech.

## System Verdict

> **Pick Voxtral if you need cheap, fast multilingual STT and Mistral-stack consolidation.** Voxtral Realtime delivers sub-200ms latency for live voice agents and is one of the few production-grade STT systems shipped under Apache 2.0. Voxtral Mini Transcribe V2 handles up to 3-hour recordings with speaker identification, custom vocabulary, and word-level timestamps across 13 languages.
>
> **Skip it if you need text-to-speech, voice cloning, or narration.** Voxtral is an understanding and transcription family. For voice output pick [ElevenLabs](/tools/elevenlabs/), [Fish Audio](/tools/fish-audio/), or [Cartesia](/tools/cartesia/). Also skip it if your language coverage falls outside the documented set or you want a polished consumer creator UI.
>
> **Who pays which tier:** Free tier on La Plateforme for testing. API at about $0.001 per minute for developers at scale. Voxtral Realtime weights ship under Apache 2.0 for production self-hosting and edge deployment. Enterprise self-hosting for the Mini Transcribe stack runs through Mistral commercial agreements.

## Key Facts

| | |
|---|---|
| **Family** | Voxtral (Mistral AI, launched July 15, 2025) |
| **Capabilities** | Speech-to-text and speech understanding (no TTS) |
| **Production API models (May 2026)** | Voxtral Mini Transcribe V2 (batch) and Voxtral Realtime (live) |
| **Open-weight launch models** | Voxtral 24B and Voxtral Mini 3B |
| **License** | Apache 2.0 on Voxtral Realtime; commercial-friendly |
| **Languages** | 13 with automatic language detection (English, Spanish, French, Portuguese, Hindi, German, Dutch, Italian, plus additional V2 languages) |
| **Latency** | Sub-200ms on Voxtral Realtime |
| **Batch capacity** | Up to 3-hour recordings on Mini Transcribe V2 |
| **Context window** | 32k tokens; up to 30 minutes transcription / 40 minutes understanding per call |
| **Features** | Speaker identification, custom vocabulary, word-level timestamps, semantic understanding |
| **Roadmap** | Speaker segmentation, emotion detection, non-speech audio recognition (per Mistral docs) |
| **API pricing** | From about $0.001 per minute on La Plateforme; Mistral positions it as less than half the price of Whisper and ElevenLabs Scribe |

Every data point above was verified against vendor sources on 2026-05-13. See Sources.

## Recent changes

- **2026-05-13:** Mistral docs now list Voxtral Mini Transcribe V2 (batch, up to 3-hour recordings, speaker ID, custom vocabulary, word-level timestamps, 13 languages) and Voxtral Realtime (sub-200ms latency, Apache 2.0 weights, edge-deployable) as the production audio surface.
- **2026-05-13:** Voxtral Realtime confirmed Apache 2.0, which removes the prior CC BY-NC commercial-use concern for the live transcription path.
- **2026-05-13:** Original July 15, 2025 launch corrected on this page; earlier copy describing a "March 2026 TTS launch beating ElevenLabs Flash v2.5" was inaccurate. Voxtral has always been STT-first, not TTS.

## What it actually is

A Mistral-native speech understanding family that ships through the same La Plateforme stack as Mistral's text models. One account, one API key, one invoice for text plus audio.

Voxtral handles both raw transcription and semantic understanding of the underlying audio. Voxtral Mini Transcribe V2 is the batch path, with up to 3-hour recordings, speaker identification, custom vocabulary biasing, and word-level timestamps. Voxtral Realtime is the live path, with sub-200ms latency and an Apache 2.0 license that lets teams self-host the model on edge devices.

The differentiator is the pricing-plus-license combination. At roughly $0.001 per minute the API is materially cheaper than Whisper API and ElevenLabs Scribe at the same workload, and the Apache 2.0 weights on Voxtral Realtime remove most of the licensing friction that previously sent commercial self-hosters elsewhere.

## When to pick Voxtral

- **You already use Mistral for text generation.** One vendor, one billing line, one SDK covers text plus speech-to-text.
- **Cost at scale drives unit economics.** ~$0.001 per minute undercuts most commercial transcription alternatives.
- **You need a real-time STT path for voice agents.** Sub-200ms latency on Voxtral Realtime is competitive with the tightest speech-understanding APIs on the market.
- **Edge deployment matters.** Voxtral Realtime weights ship under Apache 2.0 and can run on edge hardware.
- **Audio understanding alongside transcripts.** Voxtral pairs raw transcripts with native semantic understanding, which simplifies downstream RAG and agent workflows.

## When to pick something else

- **Text-to-speech, narration, or voice cloning:** Voxtral does not generate speech. Pick [ElevenLabs](/tools/elevenlabs/), [Fish Audio](/tools/fish-audio/), or [Cartesia](/tools/cartesia/).
- **Top-tier transcription accuracy for clean enterprise audio:** Deepgram Nova-3 and AssemblyAI Universal-2 still post strong benchmark numbers on US-English broadcast and call-center audio.
- **Polished consumer creator UI:** Whisper-based tools like Otter and Descript are built around end-user workflows.
- **Languages outside the documented set:** Whisper and Deepgram cover wider language menus on the commercial API.
- **Enterprise voice cloning with compliance:** [Resemble AI](/tools/resemble-ai/) bundles watermarking, deepfake detection, and on-premise deployment for voice generation, which Voxtral does not do.

## Pricing

| Access | Cost | Notes |
|--------|------|-------|
| Open weights (Voxtral Realtime) | Free under Apache 2.0 | Edge-deployable; commercial self-hosting permitted |
| Open weights (Voxtral 24B / Mini 3B, July 2025 launch models) | Free download | Hugging Face; check current license terms before commercial use |
| La Plateforme free tier | Free | Testing and evaluation |
| Mistral API (transcription / understanding) | From about $0.001/min | Mistral positions it as less than half the price of Whisper and ElevenLabs Scribe |

*Prices verified 2026-05-13 via [Mistral Voxtral announcement](https://mistral.ai/news/voxtral) and [Mistral audio docs](https://docs.mistral.ai/capabilities/audio/). Whisper API list price ($0.006/min) and ElevenLabs Scribe pricing cited for comparison.*

## Against the alternatives

Voxtral is an STT family, so the natural peers are speech-to-text APIs, not TTS engines.

| | Voxtral (Realtime + Mini Transcribe V2) | OpenAI Whisper API | Deepgram Nova-3 | AssemblyAI Universal-2 |
|---|---|---|---|---|
| **API price per minute** | From ~$0.001 | $0.006 | $0.0043 streaming | $0.0085 streaming |
| **Real-time latency** | Sub-200ms (Realtime) | Batch-only API | Sub-300ms streaming | Sub-300ms streaming |
| **Languages** | 13 with auto-detect | 50+ | 36 | 12 |
| **Open weights for self-hosting** | Yes, Apache 2.0 on Realtime | No | No | No |
| **Semantic understanding alongside transcripts** | Native | No | No | Add-on LeMUR |
| **Speaker ID, custom vocab, word timing** | Yes (Mini Transcribe V2) | Word-level timing only | Yes | Yes |
| **Best viewed as** | Mistral-stack STT plus understanding | General-purpose batch transcription | Streaming-first STT | Workflow-first STT |

## Failure modes

- **No text-to-speech.** Voxtral does not synthesize voices. Workflows that need narration, dubbing, or voice cloning must pair Voxtral with a TTS engine.
- **Language coverage trails Whisper.** Mistral docs cite 13 languages with auto-detect on Voxtral Mini Transcribe V2. Whisper covers 50+. Languages outside the documented set should be tested before commitment.
- **Real-time depends on Voxtral Realtime.** Voxtral Mini Transcribe V2 is batch-oriented and not suitable for live voice agents.
- **Per-call duration caps.** Up to 30 minutes for transcription and 40 minutes for understanding per call; longer recordings need chunking.
- **Younger production lineup than peers.** Voxtral Mini Transcribe V2 and Voxtral Realtime are the second-generation lineup after the July 2025 open-weight launch. Community tooling around Whisper and Deepgram is still broader.
- **Vendor-published benchmarks.** Mistral positions Voxtral as less than half the price of Whisper and Scribe and ahead on aggregate quality in its own evaluations. Independent blind tests should be checked before standardizing on it for accuracy-sensitive domains (medical, legal, finance).
- **No native consumer UI.** API-only product. Creators wanting a polished transcription studio should consider Otter, Descript, or third-party UIs built on Voxtral.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-05-13 against the [Mistral Voxtral announcement](https://mistral.ai/news/voxtral), [Mistral audio docs](https://docs.mistral.ai/capabilities/audio/), and [Mistral model overview](https://docs.mistral.ai/models/overview).

## FAQ

**Is Voxtral free?**
Partially. Voxtral Realtime weights are free under Apache 2.0 and can be self-hosted commercially. The La Plateforme free tier covers testing. Production API workloads pay from about $0.001 per minute.

**Does Voxtral do text-to-speech?**
No. Voxtral is a speech-to-text and audio-understanding family. For TTS, pair it with [ElevenLabs](/tools/elevenlabs/), [Fish Audio](/tools/fish-audio/), or [Cartesia](/tools/cartesia/).

**Can I self-host Voxtral commercially?**
Yes for Voxtral Realtime, which ships under Apache 2.0 and is designed for edge deployment. Check current license terms on the July 2025 launch models (Voxtral 24B and Mini 3B) on Hugging Face before commercial use.

**What languages does Voxtral support?**
Voxtral Mini Transcribe V2 lists 13 languages with automatic language detection, including English, Spanish, French, Portuguese, Hindi, German, Dutch, and Italian.

**How fast is Voxtral Realtime?**
Sub-200ms latency, fast enough for live voice agents.

**How does Voxtral compare to Whisper API?**
Mistral positions Voxtral at less than half the price of Whisper API at the same workload, with native semantic understanding alongside transcripts. Whisper still wins on raw language breadth.

## Sources

- [Mistral Voxtral announcement](https://mistral.ai/news/voxtral): model family overview and July 15, 2025 launch
- [Mistral audio docs](https://docs.mistral.ai/capabilities/audio/): Voxtral Mini Transcribe V2 and Voxtral Realtime production specifications
- [Mistral model overview](https://docs.mistral.ai/models/overview): current Voxtral lineup and identifiers
- [Mistral Studio API: speech-to-text](https://docs.mistral.ai/studio-api/audio/speech_to_text): API endpoints and parameters

## Related

- **Category:** [AI Voice / Speech](/categories/ai-voice/)
- **Comparisons:** [ElevenLabs vs Voxtral](/compare/elevenlabs-vs-voxtral/), [Cartesia vs Voxtral](/compare/cartesia-vs-voxtral/), [Fish Audio vs Voxtral](/compare/fish-audio-vs-voxtral/), [Resemble AI vs Voxtral](/compare/resemble-ai-vs-voxtral/)
