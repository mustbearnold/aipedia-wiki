---
type: tool
slug: whisper
title: Whisper
tagline: OpenAI's open-weights speech-to-text model. 99 languages, MIT license for self-host, and a $0.006/minute API. Underpins most third-party transcription products.
category: ai-voice
secondary_categories: [ai-coding]
company: openai
url: https://openai.com/research/whisper
github_url: https://github.com/openai/whisper
pricing_model: freemium
price_range: "Free self-host / API $0.006 per minute"
status: active
launched: 2022-09
last_updated: 2026-04-23
last_verified: 2026-04-23
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 10
  moat: 8
  longevity: 9
facts:
  best_for:
    value: "OpenAI's open-weights speech-to-text model. 99 languages, MIT license for self-host, and a $0.006/minute API. Underpins most third-party transcription products. Best for speech, voice, transcription, or audio-agent workflows."
    source: "https://www.assemblyai.com"
    source_label: "AssemblyAI"
    source_id: whisper-official
    verified_at: 2026-05-03
    volatility: medium
    confidence: medium
  pricing_anchor:
    value: "API; $0.006/min; Whisper-1 API, verified unchanged"
    source: "https://developers.openai.com/api/docs/pricing"
    source_label: "Source"
    source_id: whisper-pricing
    verified_at: 2026-05-03
    next_review_at: 2026-08-03
    volatility: high
    confidence: medium
  watch_out_for:
    value: "Non-Tier-1 canonical profile: verify current pricing, usage limits, data policy, and integration details before procurement"
    source: "https://developers.openai.com/api/docs/pricing"
    source_label: "Source"
    source_id: whisper-pricing
    verified_at: 2026-05-03
    next_review_at: 2026-08-03
    volatility: high
    confidence: medium
tags: [speech-to-text, transcription, open-weights, multilingual, self-hosted, openai, whisper, subtitles, dictation]
seo_title: "Whisper: Features, Pricing & Review (April 2026)"
meta_description: "OpenAI's Whisper is the reference open-weights speech-to-text model. MIT license for self-hosting, $0.006/minute via API, and 99 languages. Powers the transcription layer of most third-party products."
author: "aipedia.wiki Editorial"
best_for:
  - self-hosted multilingual transcription
  - batch processing long recordings locally
  - building transcription into products via API
  - accents and noisy audio beating most commercial APIs
  - subtitle generation across 99 languages
not_best_for:
  - real-time streaming transcription (batch-first architecture)
  - speaker diarization out of the box (use GPT-4o Transcribe or third-party wrappers)
  - live consumer apps that need word-level latency under 1 second
quick_answer: >-
  Whisper is OpenAI's open-weights speech-to-text model, free under the MIT license for self-hosting, $0.006/minute via OpenAI's API. It transcribes 99 languages with accuracy that beats most commercial APIs on accents and noisy audio. Pick it for batch multilingual work; skip it for real-time streaming where GPT-4o Transcribe or AssemblyAI fit better.
price_history:
  - date: 2026-04-17
    plan: "API"
    price: "$0.006/min"
    source: "https://developers.openai.com/api/docs/pricing"
    source_label: "Source"
    source_id: whisper-pricing
    note: "Whisper-1 API, verified unchanged"
  - date: 2025-03-20
    plan: "GPT-4o Transcribe"
    price: "$0.006/min"
    source: "https://developers.openai.com/api/docs/pricing"
    source_label: "Source"
    source_id: whisper-pricing
    note: "OpenAI shipped GPT-4o Transcribe + Mini Transcribe as modern successors; Whisper-1 remains available and MIT weights unchanged"
---

# Whisper

OpenAI's open-weights speech-to-text model. Shipped September 2022 as a 1.5B-parameter transformer trained on 680,000 hours of multilingual audio. Weights remain under the MIT license. OpenAI's hosted `whisper-1` API runs at $0.006 per minute.

As of March 2025, OpenAI added two newer hosted transcription models on the same endpoint: **GPT-4o Transcribe** (same $0.006/min, improved accuracy on low-resource languages, optional speaker diarization) and **GPT-4o Mini Transcribe** ($0.003/min, budget tier). Whisper-1 is now the legacy model but stays available and stays the reference for self-hosted deployments.

## Recent developments

- **April 2026:** Self-hosted Whisper remains the dominant open-weights baseline. Projects like faster-whisper (CTranslate2 runtime) and whisper.cpp (C++ port) deliver 5-10x speedups on consumer hardware; Apple Silicon inference is routinely faster-than-realtime.
- **March 2025:** OpenAI shipped GPT-4o Transcribe and Mini Transcribe as hosted successors on the same `/v1/audio/transcriptions` endpoint. Whisper-1 stays callable by model ID; MIT weights are unchanged.

## System Verdict

> **Pick Whisper if you need multilingual transcription with the option to self-host, or a $0.006/minute API baseline.** Self-hosted under the MIT license gives unlimited offline volume; the hosted API covers teams that do not want to operate GPUs. Accent and noise robustness beat most commercial APIs on published evaluations.
>
> **Skip it for real-time streaming, word-accurate timestamps, or built-in speaker diarization.** Whisper is batch-first: segment-level timestamps only, and no native diarization. GPT-4o Transcribe with Diarization fits there. For sub-second live transcription, [AssemblyAI](https://www.assemblyai.com) and Deepgram lead.
>
> **Who pays which tier:** Self-host free for researchers, privacy-first teams, and batch jobs. OpenAI API at $0.006/min for teams that do not want to run GPUs. GPT-4o Mini Transcribe at $0.003/min for cost-sensitive production. Third-party wrappers (Replicate, Hugging Face Inference Endpoints) offer managed Whisper hosting at comparable rates.

## Key Facts

| | |
|---|---|
| **Model** | Whisper-1 (1.5B parameters, transformer encoder-decoder) |
| **License** | MIT (weights and reference code) |
| **Successor models on same API** | GPT-4o Transcribe, GPT-4o Mini Transcribe |
| **Languages** | 99 |
| **API pricing** | $0.006/min (Whisper-1, GPT-4o Transcribe) · $0.003/min (Mini) |
| **Self-host cost** | Free (MIT) plus GPU compute |
| **Max file size (API)** | 25MB per request; split long files client-side |
| **Formats accepted** | mp3, mp4, mpeg, mpga, m4a, wav, webm, flac, ogg |
| **Timestamps** | Segment-level (word-level via Whisper-Timestamped fork) |
| **Speaker diarization** | No native; available via GPT-4o Transcribe or third-party (pyannote, whisperx) |
| **Real-time streaming** | No native; batch-first architecture |

Every data point above verified on 2026-04-17 via [openai.com](https://openai.com/research/whisper) and [OpenAI API pricing](https://developers.openai.com/api/docs/pricing).

## What it actually is

A single transformer model that takes audio in and emits text plus segment-level timestamps. Shipped with five size variants (tiny through large-v3). Large-v3 is the production default; smaller variants run on CPU or mobile hardware with tradeoffs on accuracy.

The moats compound:

- **Open weights.** MIT license. Downloadable from OpenAI's GitHub or Hugging Face. Runnable anywhere.
- **Multilingual depth.** 99 languages trained together, not a patchwork of per-language models.
- **Community runtimes.** faster-whisper, whisper.cpp, whisperx, mlx-whisper, and others deliver the speed gains the reference implementation lacks.
- **Baseline status.** Every transcription tool in the last three years benchmarks against Whisper. Most wrap it.

## When to pick Whisper

- **Self-hosting is a hard requirement.** Air-gapped environments, healthcare audio, legal transcription where PHI cannot leave the perimeter.
- **Batch processing beats real-time.** Podcast archives, meeting recordings, video subtitling pipelines.
- **Multilingual audio.** 99 languages in one model. No per-language routing logic.
- **Building a transcription product.** MIT license lets you ship commercial products without royalty.
- **Accents and noise matter.** Field recordings, mobile audio, conference rooms with poor acoustics.

## When to pick something else

- **Real-time streaming transcription:** [AssemblyAI](https://www.assemblyai.com) or Deepgram. Whisper's batch-first design fights against sub-second latency.
- **Speaker diarization bundled:** GPT-4o Transcribe with Diarization on the same OpenAI endpoint, or whisperx as a self-host wrapper.
- **Word-level timestamps:** Whisper-Timestamped or whisperx forks. Base Whisper emits segment-level only.
- **Podcast recording + editing:** [Descript](/tools/descript/) wraps transcription with a transcript-first editor.
- **Translation alongside transcription:** Whisper's `translate` task covers English targets only. For other targets, pair transcription with a separate translation model.

## Pricing

OpenAI API (via `/v1/audio/transcriptions`):

| Model | Price | Notes |
|---|---|---|
| whisper-1 | $0.006/min | Legacy Whisper-1; MIT self-host equivalent is free |
| gpt-4o-transcribe | $0.006/min | Modern successor, improved low-resource language accuracy |
| gpt-4o-transcribe with diarization | $0.006/min | Speaker labels in output |
| gpt-4o-mini-transcribe | $0.003/min | Cost-sensitive tier |

Self-host weights at [github.com/openai/whisper](https://github.com/openai/whisper) and on Hugging Face. Managed Whisper hosting via Replicate or Hugging Face Inference Endpoints runs $0.003-$0.01/minute depending on model size and batching.

Prices verified 2026-04-17 via [OpenAI API pricing](https://developers.openai.com/api/docs/pricing).

## Against the alternatives

| | Whisper (self-host) | OpenAI API whisper-1 | AssemblyAI | Deepgram |
|---|---|---|---|---|
| **Price** | Free + GPU | $0.006/min | $0.37/hour (~$0.0062/min) | $0.0043/min |
| **Open weights** | MIT | No | No | No |
| **Languages** | 99 | 99 | 99 | 50+ |
| **Real-time** | No | No | Yes | Yes (lowest latency) |
| **Diarization** | Via wrappers | GPT-4o Transcribe tier | Native | Native |
| **Best viewed as** | Open-source baseline | Managed Whisper | Real-time specialist | Low-latency streaming |

## Failure modes

- **Hallucinated text on silence.** Whisper is prone to generating plausible-sounding text when the audio contains long silence or non-speech. Mitigations: VAD preprocessing (Silero VAD), chunk with overlap, or move to GPT-4o Transcribe which handles this better.
- **No word-level timestamps in base model.** Use whisperx or Whisper-Timestamped forks for word-accurate alignment.
- **No speaker diarization natively.** Add pyannote, whisperx, or switch to GPT-4o Transcribe.
- **25MB API file cap.** Long recordings need client-side chunking.
- **Large-v3 is compute-heavy.** Real-time on CPU needs small or tiny variants with quality tradeoffs; use faster-whisper + quantization for 5-10x speedup.
- **English bias.** Accuracy is strongest on English, weakest on low-resource languages. Vendor-reported multilingual numbers mix across tiers.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/). Last verified 2026-04-23 against [github.com/openai/whisper](https://github.com/openai/whisper), [OpenAI Whisper research post](https://openai.com/research/whisper), and [OpenAI API pricing](https://developers.openai.com/api/docs/pricing).

## FAQ

<details>
<summary>Is Whisper free?</summary>

Yes, when self-hosted. The model weights and reference code are under the MIT license. Downloadable from OpenAI's GitHub or Hugging Face. You pay only for compute. The OpenAI-hosted API costs $0.006 per minute of audio.

</details>

<details>
<summary>How accurate is Whisper?</summary>

On English, Whisper-1 Large-v3 sits near the top of published leaderboards, within 1-2 WER points of the best commercial APIs. On multilingual audio, accents, and noisy recordings, independent evaluations often rank it first. GPT-4o Transcribe improves on low-resource languages specifically.

</details>

<details>
<summary>What's the difference between Whisper-1 and GPT-4o Transcribe?</summary>

Whisper-1 is the 2022 open-weights model, MIT license, widely self-hosted. GPT-4o Transcribe (March 2025) is OpenAI's hosted successor on the same API endpoint with improved accuracy and optional speaker diarization. Same $0.006/min pricing. Whisper-1 stays callable by model ID; GPT-4o Transcribe is the default recommendation for new builds on the hosted API.

</details>

<details>
<summary>Can Whisper do real-time streaming transcription?</summary>

Not natively. The base model is batch-first: it expects complete audio chunks. For real-time, use AssemblyAI or Deepgram, which are architected for low-latency streaming.

</details>

<details>
<summary>Does Whisper do speaker diarization?</summary>

Not natively. Options: (1) wrap it with pyannote.audio or whisperx for open-source diarization, (2) switch to GPT-4o Transcribe with Diarization on the OpenAI API, or (3) use a commercial tool that wraps Whisper (Descript, AssemblyAI) for built-in speaker labels.

</details>

<details>
<summary>What languages does Whisper support?</summary>

99 languages in a single multilingual model. English and major European languages hit the highest accuracy tiers. Low-resource languages (Swahili, Bengali, Tamil, Khmer) trail commercial specialists but remain usable. GPT-4o Transcribe closes some of the low-resource gap.

</details>

## Related

- **Category:** [AI Voice](/categories/ai-voice/)
- **Also see:** [ChatGPT](/tools/chatgpt/) (the hosted Whisper entry point) · [Descript](/tools/descript/) (transcript-first editor wrapping Whisper) · [ElevenLabs](/tools/elevenlabs/) (voice synthesis pair)
