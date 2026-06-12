---
type: tool
slug: whisper
title: Whisper
tagline: OpenAI's open-weights speech-to-text baseline. MIT-licensed code and weights remain useful for self-hosted batch transcription, while OpenAI's newer hosted transcription models now handle the higher-accuracy and diarization paths.
category: ai-voice
secondary_categories: [ai-coding]
company: openai
url: https://openai.com/research/whisper
github_url: https://github.com/openai/whisper
pricing_model: freemium
price_range: "Free self-host / OpenAI transcription API $0.003-$0.006 per minute; GPT-Realtime-Whisper $0.017 per minute"
status: active
launched: 2022-09
last_updated: 2026-06-12
last_verified: 2026-06-12
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
    value: "OpenAI's MIT-licensed Whisper code and model weights remain the default self-hosted speech-to-text baseline for batch transcription, multilingual speech recognition, translation to English, and local/offline pipelines."
    source: "https://github.com/openai/whisper"
    source_label: "OpenAI Whisper GitHub"
    source_id: whisper-official
    verified_at: 2026-06-12
    volatility: medium
    confidence: medium
  pricing_anchor:
    value: "OpenAI public pricing lists gpt-4o-mini-transcribe at $0.003/min and gpt-4o-transcribe at $0.006/min. OpenAI's API pricing page also lists GPT-Realtime-Whisper streaming STT at $0.017/min ($0.00028/sec)."
    source: "https://developers.openai.com/api/docs/pricing"
    source_label: "OpenAI API pricing"
    source_id: whisper-pricing
    verified_at: 2026-06-12
    next_review_at: 2026-09-10
    volatility: high
    confidence: medium
  watch_out_for:
    value: "Whisper is still excellent for self-hosted batch work, but new hosted builds should compare gpt-4o-transcribe, gpt-4o-mini-transcribe, gpt-4o-transcribe-diarize, and GPT-Realtime-Whisper before defaulting to whisper-1."
    source: "https://developers.openai.com/api/docs/guides/speech-to-text"
    source_label: "OpenAI speech-to-text docs"
    source_id: openai-speech-to-text-docs
    verified_at: 2026-06-12
    next_review_at: 2026-09-10
    volatility: high
    confidence: medium
tags: [speech-to-text, transcription, open-weights, multilingual, self-hosted, openai, whisper, subtitles, dictation]
seo_title: "Whisper: Features, Pricing & Review (June 2026)"
meta_description: "OpenAI Whisper remains the MIT self-hosted speech-to-text baseline. Compare free local weights with GPT-4o Transcribe, Mini Transcribe, Diarize, GPT-Realtime-Whisper pricing, API limits, and alternatives."
author: "aipedia.wiki Editorial"
best_for:
  - self-hosted multilingual transcription
  - batch processing long recordings locally
  - building transcription into products via API
  - accents and noisy audio where local control and review matter
  - subtitle generation across 99 languages
not_best_for:
  - real-time streaming transcription (batch-first architecture)
  - speaker diarization out of the box (use GPT-4o Transcribe or third-party wrappers)
  - live consumer apps that need word-level latency under 1 second
quick_answer: >-
  Whisper is OpenAI's open-weights speech-to-text baseline, free under the MIT license for self-hosting and still listed as `whisper-1` in the Audio API docs. For new hosted builds, compare GPT-4o Transcribe at $0.006/minute, GPT-4o Mini Transcribe at $0.003/minute, GPT-4o Transcribe Diarize for speaker labels, and GPT-Realtime-Whisper at $0.017/minute for streaming STT. Pick Whisper for local/offline batch transcription; use newer hosted models or specialist APIs when accuracy, streaming, diarization, or latency matter more.
price_history:
  - date: 2026-06-10
    plan: "OpenAI transcription and realtime STT APIs"
    price: "$0.003-$0.006/min for GPT-4o transcription models; $0.017/min for GPT-Realtime-Whisper streaming STT"
    source: "https://developers.openai.com/api/docs/pricing"
    source_label: "OpenAI API pricing"
    source_id: whisper-pricing
    note: "Reverified. Public transcription pricing lists gpt-4o-transcribe at $0.006/min and gpt-4o-mini-transcribe at $0.003/min; OpenAI's API pricing page lists GPT-Realtime-Whisper streaming STT at $0.017/min. Speech-to-text docs continue to list whisper-1 and gpt-4o-transcribe-diarize on the transcription endpoint."
  - date: 2026-05-13
    plan: "OpenAI transcription API"
    price: "$0.003-$0.006/min"
    source: "https://developers.openai.com/api/docs/pricing"
    source_label: "OpenAI API pricing"
    source_id: whisper-pricing
    note: "Reverified. gpt-4o-transcribe $0.006/min and gpt-4o-mini-transcribe $0.003/min remain on the public pricing page; whisper-1 and gpt-4o-transcribe-diarize still callable via the transcription endpoint per OpenAI's speech-to-text docs."
  - date: 2026-05-10
    plan: "OpenAI transcription API"
    price: "$0.003-$0.006/min"
    source: "https://developers.openai.com/api/docs/pricing"
    source_label: "OpenAI API pricing"
    source_id: whisper-pricing
    note: "Verified: whisper-1 $0.006/min, gpt-4o-transcribe $0.006/min, gpt-4o-transcribe-diarize $0.006/min, gpt-4o-mini-transcribe $0.003/min"
  - date: 2026-04-17
    plan: "API"
    price: "$0.006/min"
    source: "https://developers.openai.com/api/docs/pricing"
    source_label: "OpenAI API pricing"
    source_id: whisper-pricing
    note: "Whisper-1 API, verified unchanged"
  - date: 2025-03-20
    plan: "GPT-4o Transcribe"
    price: "$0.006/min"
    source: "https://developers.openai.com/api/docs/pricing"
    source_label: "OpenAI API pricing"
    source_id: whisper-pricing
    note: "OpenAI shipped GPT-4o Transcribe + Mini Transcribe as modern successors; Whisper-1 remains available and MIT weights unchanged"
---

# Whisper

OpenAI's open-weights speech-to-text baseline. Whisper shipped in September 2022 as a transformer model trained on 680,000 hours of multilingual and multitask supervised audio. Its code and model weights remain under the MIT license, and OpenAI's hosted docs still list `whisper-1` in the Audio API.

As of June 12, 2026, Whisper is no longer the default hosted recommendation for every OpenAI transcription build. OpenAI's current transcription docs list **GPT-4o Transcribe**, **GPT-4o Mini Transcribe**, and **GPT-4o Transcribe Diarize** alongside `whisper-1`, while the API pricing page also lists **GPT-Realtime-Whisper** for streaming STT. Whisper stays important because it is the MIT self-host option and compatibility baseline; GPT-4o Transcribe is the hosted accuracy path, Mini is the budget path, Diarize is the speaker-label path, and Realtime Whisper is the live-audio path.

## Recent developments

- **June 10, 2026:** Reverified OpenAI speech-to-text docs and pricing. The docs still list `whisper-1`, `gpt-4o-mini-transcribe`, `gpt-4o-transcribe`, and `gpt-4o-transcribe-diarize` on the transcription endpoint with a 25MB file limit. Public pricing lists GPT-4o Transcribe at $0.006/min, GPT-4o Mini Transcribe at $0.003/min, and GPT-Realtime-Whisper streaming STT at $0.017/min.
- **May 13, 2026:** Reverified OpenAI API pricing. gpt-4o-transcribe at $0.006/min and gpt-4o-mini-transcribe at $0.003/min remain on the public pricing page; whisper-1 and gpt-4o-transcribe-diarize remain callable via the `/v1/audio/transcriptions` endpoint per OpenAI's speech-to-text docs even though they are no longer listed on the public pricing table.
- **May 2026:** OpenAI's current speech-to-text docs list GPT-4o Transcribe, GPT-4o Mini Transcribe, GPT-4o Transcribe Diarize, and whisper-1 on the transcription path. Diarize supports speaker-aware `diarized_json` on `/v1/audio/transcriptions`; it is not yet supported in the Realtime API.
- **April 2026:** Self-hosted Whisper remains the open-weights baseline. The OpenAI repository now documents six model sizes including `turbo`, an optimized `large-v3` variant for faster transcription with some accuracy tradeoff.
- **March 2025:** OpenAI shipped GPT-4o Transcribe and Mini Transcribe as hosted successors on the same `/v1/audio/transcriptions` endpoint. Whisper-1 stays callable by model ID; MIT weights are unchanged.

## System Verdict

> **Pick Whisper if you need multilingual transcription with the option to self-host, or a $0.006/minute API compatibility baseline.** Self-hosted under the MIT license gives offline volume, local control, and a widely understood baseline for batch transcription.
>
> **Skip it for new hosted builds that need the best OpenAI transcription model, diarization, or low-latency realtime sessions.** GPT-4o Transcribe is the higher-accuracy hosted route, GPT-4o Transcribe Diarize adds speaker labels for non-realtime HTTP transcription, and GPT-Realtime-Whisper or specialist providers fit live transcription better.
>
> **Who pays which tier:** Self-host free for researchers, privacy-first teams, and batch jobs. Use `whisper-1` for compatibility when your stack depends on it, but confirm current account billing. Use GPT-4o Mini Transcribe at $0.003/minute for cost-sensitive hosted production, GPT-4o Transcribe at $0.006/minute for better hosted accuracy, GPT-4o Transcribe Diarize when speaker labels matter, and GPT-Realtime-Whisper at $0.017/minute when live audio is the job.

## Key Facts

| | |
|---|---|
| **Model** | Whisper open-weights family; largest classic model is 1.55B parameters, with `turbo` as an optimized large-v3 variant |
| **License** | MIT (weights and reference code) |
| **Hosted successors on same API** | GPT-4o Transcribe, GPT-4o Mini Transcribe, GPT-4o Transcribe Diarize |
| **Realtime STT route** | GPT-Realtime-Whisper at $0.017/min ($0.00028/sec) on the API pricing page |
| **Languages** | 99 |
| **API pricing** | GPT-4o Transcribe $0.006/min · GPT-4o Mini Transcribe $0.003/min · GPT-Realtime-Whisper $0.017/min |
| **Self-host cost** | Free (MIT) plus GPU compute |
| **Max file size (API)** | 25MB per request; split long files client-side |
| **Formats accepted** | mp3, mp4, mpeg, mpga, m4a, wav, webm |
| **Output formats** | whisper-1 supports json, text, srt, verbose_json, and vtt |
| **Timestamps** | OpenAI transcription API supports structured timestamp output; self-hosted Whisper workflows often use wrappers for word-level alignment |
| **Speaker diarization** | No native self-host Whisper diarization; GPT-4o Transcribe Diarize or third-party wrappers fill the gap |
| **Real-time streaming** | Use Realtime transcription models for live audio; self-hosted Whisper remains batch-first |

Every data point above verified on 2026-06-12 via OpenAI's Whisper repository, Whisper research post, OpenAI API pricing, speech-to-text docs, and realtime transcription docs.

## What it actually is

A family of transformer speech-recognition models that take audio in and emit text. The open repository now documents tiny, base, small, medium, large, and turbo variants. `large-v3` remains the classic quality reference; `turbo` is an optimized large-v3-derived model that trades a little accuracy for much faster transcription.

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
- **Accents and noise matter, and you can review outputs.** Field recordings, mobile audio, and conference rooms with poor acoustics still need human QA, but Whisper gives you a local baseline you can tune with preprocessing.

## When to pick something else

- **Real-time streaming transcription:** OpenAI Realtime transcription, [AssemblyAI](https://www.assemblyai.com), or Deepgram. Self-hosted Whisper's batch-first design fights against sub-second latency.
- **Speaker diarization bundled:** GPT-4o Transcribe Diarize on the OpenAI HTTP transcription endpoint, or whisperx as a self-host wrapper.
- **Word-level timestamps:** OpenAI's transcription API supports structured timestamp output; self-hosted Whisper users often reach for Whisper-Timestamped or whisperx.
- **Podcast recording + editing:** [Descript](/tools/descript/) wraps transcription with a transcript-first editor.
- **Translation alongside transcription:** Whisper's `translate` task covers English targets only. For other targets, pair transcription with a separate translation model.

## Pricing

OpenAI API (via `/v1/audio/transcriptions`):

| Model | Price | Notes |
|---|---|---|
| whisper-1 | Confirm current account billing | Legacy Whisper-1 remains in OpenAI speech-to-text docs; MIT self-host equivalent is free |
| gpt-4o-transcribe | $0.006/min | Modern successor, improved low-resource language accuracy |
| gpt-4o-transcribe-diarize | Confirm current account billing | Speaker-aware `diarized_json`; HTTP transcription endpoint only |
| gpt-4o-mini-transcribe | $0.003/min | Cost-sensitive tier |
| GPT-Realtime-Whisper | $0.017/min | Streaming speech-to-text route on OpenAI's API pricing page |

Self-host weights at [github.com/openai/whisper](https://github.com/openai/whisper) and on Hugging Face. Managed Whisper hosting via Replicate or Hugging Face Inference Endpoints runs $0.003-$0.01/minute depending on model size and batching.

Prices verified 2026-06-12 via [OpenAI API pricing](https://developers.openai.com/api/docs/pricing) and [OpenAI API pricing](https://openai.com/api/pricing/). The public pricing table currently lists gpt-4o-transcribe, gpt-4o-mini-transcribe, and GPT-Realtime-Whisper; whisper-1 and gpt-4o-transcribe-diarize remain documented on the transcription endpoint, so confirm current account billing before building procurement around those model IDs.

## Against the alternatives

| | Whisper (self-host) | OpenAI API whisper-1 | AssemblyAI | Deepgram |
|---|---|---|---|---|
| **Price** | Free + GPU | $0.006/min | $0.37/hour (~$0.0062/min) | $0.0043/min |
| **Open weights** | MIT | No | No | No |
| **Languages** | 99 | 99 | 99 | 50+ |
| **Real-time** | No | No | Yes | Yes (lowest latency) |
| **Diarization** | Via wrappers | GPT-4o Transcribe Diarize | Native | Native |
| **Best viewed as** | Open-source baseline | Managed Whisper | Real-time specialist | Low-latency streaming |

## Failure modes

- **Hallucinated text on silence.** Whisper is prone to generating plausible-sounding text when the audio contains long silence or non-speech. Mitigations: VAD preprocessing (Silero VAD), chunk with overlap, or move to GPT-4o Transcribe which handles this better.
- **No word-level timestamps in base model.** Use whisperx or Whisper-Timestamped forks for word-accurate alignment.
- **No speaker diarization natively.** Add pyannote, whisperx, or switch to GPT-4o Transcribe Diarize.
- **25MB API file cap.** Long recordings need client-side chunking.
- **Large-v3 is compute-heavy.** Real-time on CPU needs small or tiny variants with quality tradeoffs; use faster-whisper + quantization for 5-10x speedup.
- **English bias.** Accuracy is strongest on English, weakest on low-resource languages. Vendor-reported multilingual numbers mix across tiers.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/). Last verified 2026-06-12 against [github.com/openai/whisper](https://github.com/openai/whisper), [OpenAI Whisper research post](https://openai.com/research/whisper), [OpenAI API pricing](https://developers.openai.com/api/docs/pricing), [OpenAI public API pricing](https://openai.com/api/pricing/), OpenAI speech-to-text docs, and OpenAI realtime transcription docs.

## FAQ

<details>
<summary>Is Whisper free?</summary>

Yes, when self-hosted. The model weights and reference code are under the MIT license. Downloadable from OpenAI's GitHub or Hugging Face. You pay only for compute. The OpenAI-hosted API costs $0.006 per minute of audio.

</details>

<details>
<summary>How accurate is Whisper?</summary>

Whisper accuracy depends heavily on language, audio quality, speaker overlap, domain vocabulary, and runtime settings. OpenAI positions GPT-4o Transcribe as the higher-accuracy hosted successor, while self-hosted Whisper remains strong when local control, preprocessing, and manual review are part of the workflow.

</details>

<details>
<summary>What's the difference between Whisper-1 and GPT-4o Transcribe?</summary>

Whisper-1 is the hosted API model tied to the 2022 open-weights Whisper family. GPT-4o Transcribe is OpenAI's higher-accuracy hosted successor on the same transcription endpoint at $0.006/minute. GPT-4o Transcribe Diarize is the current speaker-label route, GPT-4o Mini Transcribe is the $0.003/minute budget route, and GPT-Realtime-Whisper is the $0.017/minute streaming STT route.

</details>

<details>
<summary>Can Whisper do real-time streaming transcription?</summary>

Not in the self-hosted open-weights workflow. The base model is batch-first: it expects complete audio chunks. For real-time, use OpenAI Realtime transcription, AssemblyAI, or Deepgram.

</details>

<details>
<summary>Does Whisper do speaker diarization?</summary>

Not natively. Options: (1) wrap it with pyannote.audio or whisperx for open-source diarization, (2) switch to GPT-4o Transcribe Diarize on the OpenAI API, or (3) use a commercial tool that wraps transcription with built-in speaker labels.

</details>

<details>
<summary>What languages does Whisper support?</summary>

99 languages in a single multilingual model. English and major European languages hit the highest accuracy tiers. Low-resource languages (Swahili, Bengali, Tamil, Khmer) trail commercial specialists but remain usable. GPT-4o Transcribe closes some of the low-resource gap.

</details>

## Related

- **Category:** [AI Voice](/categories/ai-voice/)
- **Also see:** [ChatGPT](/tools/chatgpt/) (the hosted Whisper entry point) · [Descript](/tools/descript/) (transcript-first editor wrapping Whisper) · [ElevenLabs](/tools/elevenlabs/) (voice synthesis pair)

## Sources

- [OpenAI Whisper GitHub](https://github.com/openai/whisper): MIT license, open model family, turbo variant, setup, model sizes, local usage
- [OpenAI Whisper research post](https://openai.com/research/whisper): original training scale, multilingual/multitask positioning, open-source release
- [OpenAI API pricing](https://developers.openai.com/api/docs/pricing): GPT-4o Transcribe and GPT-4o Mini Transcribe pricing
- [OpenAI public API pricing](https://openai.com/api/pricing/): GPT-Realtime-Whisper streaming STT pricing
- [OpenAI speech-to-text docs](https://developers.openai.com/api/docs/guides/speech-to-text): supported models, output formats, diarization behavior, 25MB upload limit, translation endpoint support
- [OpenAI realtime transcription docs](https://developers.openai.com/api/docs/guides/realtime-transcription): realtime model guidance and whisper-1 compatibility role

## Review History

- **2026-04-17:** New page. Pricing and features verified against OpenAI Whisper and OpenAI API pricing.
- **2026-05-10:** Refreshed around OpenAI's current hosted transcription lineup, corrected the source registry from AssemblyAI to OpenAI, added GPT-4o Transcribe Diarize and realtime transcription caveats, and reverified API pricing, file limits, output formats, and self-host model guidance.
- **2026-05-13:** Reverified MIT license, six-model repository status, and API per-minute prices. Noted that whisper-1 and gpt-4o-transcribe-diarize no longer appear on the public pricing table but remain callable via the transcription endpoint.
- **2026-06-10:** Reverified OpenAI speech-to-text docs and pricing; added GPT-Realtime-Whisper $0.017/min streaming STT and softened legacy `whisper-1`/diarize billing language where the current public pricing table does not expose a per-minute row.
