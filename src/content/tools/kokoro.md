---
type: tool
slug: kokoro
title: Kokoro TTS
tagline: Open-source text-to-speech model with 82M parameters that runs locally and produces near-human voice quality.
category: ai-voice
company: hexgrad (open-source)
url: https://huggingface.co/hexgrad/Kokoro-82M
github_url: https://github.com/hexgrad/kokoro
pricing_model: open-source
price_range: "Free (open-source)"
status: active
launched: 2024-11
last_updated: 2026-05-04
last_verified: 2026-05-04
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
  moat: 5
  longevity: 7
facts:
  best_for:
    value: Best for developers experimenting with lightweight open TTS models and local/offline voice synthesis workflows.
    source: https://huggingface.co/hexgrad/Kokoro-82M
    source_label: Kokoro model card
    source_id: kokoro-model
    verified_at: '2026-05-04'
    volatility: high
    confidence: high
    next_review_at: '2026-08-04'
  pricing_anchor:
    value: Kokoro is distributed as an open model; costs come from inference hardware/hosting and any downstream service wrapper
      rather than a vendor SaaS plan.
    source: https://github.com/hexgrad/kokoro
    source_label: Kokoro GitHub repository
    source_id: kokoro-repository
    verified_at: '2026-05-04'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
  open_source_or_local:
    value: The Hugging Face model card and repository are the authoritative sources for model files, license notes, examples,
      and project activity.
    source: https://huggingface.co/hexgrad/Kokoro-82M/blob/main/README.md
    source_label: Kokoro README
    source_id: kokoro-readme
    verified_at: '2026-05-04'
    volatility: high
    confidence: high
    next_review_at: '2026-08-04'
  workflow_surface:
    value: The Hugging Face Space is useful for quick evaluation, but production usage should verify local inference, license,
      voices, and latency separately.
    source: https://huggingface.co/spaces/hexgrad/Kokoro-TTS
    source_label: Kokoro TTS Hugging Face Space
    source_id: kokoro-space
    verified_at: '2026-05-04'
    volatility: high
    confidence: high
    next_review_at: '2026-08-04'
  watch_out_for:
    value: Before commercial use, review license, voice rights, quality across languages, hallucinated pronunciations, model
      provenance, and abuse/safety controls.
    source: https://huggingface.co/hexgrad/Kokoro-82M
    source_label: Kokoro model card
    source_id: kokoro-model
    verified_at: '2026-05-04'
    volatility: high
    confidence: high
    next_review_at: '2026-08-04'
tags: [ai-voice, tts, text-to-speech, open-source, local, free, kokoro]
best_for:
  - offline and local text-to-speech workflows
  - high-volume narration where API costs would dominate
  - privacy-constrained English speech generation
  - developers embedding a small Apache 2.0 model in apps or devices
not_best_for:
  - voice cloning, emotional direction, or real-time voice agents
  - managed enterprise APIs with uptime guarantees and support
  - large multilingual voice libraries
  - nontechnical teams that do not want local model setup
seo_title: "Kokoro TTS Review 2026: Free Open-Source Text-to-Speech That Sounds Human"
meta_description: "Kokoro is a free, open-source TTS model with 82M parameters that runs locally on consumer hardware. Quality rivals ElevenLabs. Full review with setup guide."
author: "aipedia.wiki Editorial"
quick_answer: >-
  Kokoro is a free, Apache 2.0 text-to-speech model at 82M parameters. It runs locally on CPU or GPU with a ~300MB download, no API key, no per-character fees. V1.0 covers 26 voices across 9 languages. Best for offline or high-volume work; skip for voice cloning.
---

# Kokoro TTS

An open-weight text-to-speech model released by hexgrad in late 2024. At 82M parameters, Kokoro runs on consumer CPU or GPU hardware and produces voice quality that topped the TTS Arena leaderboard in January 2026 above much larger models like XTTS v2 (467M) and MetaVoice (1.2B).

Apache 2.0 licensed. No API key. No usage caps. No network calls after the initial model download.

## System Verdict

> **Pick Kokoro if the use case is offline, high-volume, or privacy-constrained English TTS with a fixed voice.** The download is ~300MB, runs on a laptop, and costs nothing past electricity. Community ONNX builds ship in 88MB-310MB size variants for mobile and browser deployment.
>
> **Skip it if the job needs voice cloning, fine-grained emotion control, or real-time streaming.** [ElevenLabs](/tools/elevenlabs/) keeps the quality ceiling and the voice-library breadth. [Cartesia](/tools/cartesia/) owns low-latency conversational use cases. [MiniMax Speech](/tools/minimax-speech/) undercuts ElevenLabs on price for multilingual workloads that still want a hosted API.
>
> Kokoro's moat is size-efficiency, not features. The 82M parameter count means laptop-local inference at commercial-grade quality for a narrow slice of jobs.

## Key Facts

| | |
|---|---|
| **Model size** | 82M parameters (~300MB download) |
| **License** | Apache 2.0 (commercial use permitted) |
| **Architecture** | Modified StyleTTS 2 |
| **Voices (v1.0)** | 26 voices across 9 languages |
| **Languages (v1.0)** | English (US + UK), Spanish, French, Hindi, Italian, Japanese, Brazilian Portuguese, Mandarin Chinese |
| **Inference** | CPU and CUDA GPU; Apple Silicon via ONNX |
| **Deployment formats** | PyTorch, ONNX (fp32 310MB, fp16 169MB, int8 88MB) |
| **Hosted API cost** | Under $1 per 1M input characters via third-party providers |
| **Released** | November 2024; v1.0 early 2026 |

## What it actually is

A small neural TTS model that turns text into audio locally. The architecture is a modified StyleTTS 2 trained on permissive, non-copyrighted audio with IPA phoneme labels.

The Python package (`pip install kokoro`) wraps inference with a minimal API. ONNX builds target mobile, browser, and non-Python runtimes. A Gradio demo ships for no-code local testing.

The moat is size. At 82M parameters Kokoro takes under 300MB on disk and runs in real-time on CPU. Competing open models at comparable quality (XTTS v2, Tortoise) are 4-5x larger and need a GPU for acceptable latency.

## When to pick Kokoro

- **Self-hosted AI stacks that must stay offline.** Pair with a local LLM for end-to-end air-gapped audio pipelines.
- **High-volume narration where per-character fees hurt.** Audiobooks, podcasts, subtitles, game VO at scale.
- **Privacy-sensitive text (medical, legal, financial).** No outbound API call means no data egress.
- **Edge and mobile deployments.** The int8 ONNX build is 88MB. Fits on a phone.
- **Research and reproducibility.** Fixed weights and deterministic inference avoid the drift introduced by hosted-model upgrades.

## When to pick something else

- **Voice cloning from a reference clip:** [ElevenLabs](/tools/elevenlabs/), [Fish Audio](/tools/fish-audio/), or [MiniMax Speech](/tools/minimax-speech/). Kokoro ships fixed voices only.
- **Fine-grained emotional control:** ElevenLabs v3 or MiniMax Speech-02. Kokoro's prosody controls stay basic.
- **Real-time streaming for conversational agents:** [Cartesia](/tools/cartesia/) is built for this. Kokoro generates full audio before playback.
- **Languages beyond the v1.0 set of 9:** ElevenLabs and MiniMax cover 30+ languages with native prosody.
- **Studio production UI with takes and timeline editing:** [Murf](/tools/murf/) or ElevenLabs Studio. Kokoro is code-first.

## Pricing

| Path | Cost |
|---|---|
| Self-hosted model | Free (Apache 2.0) |
| Own hardware | Electricity only |
| Hosted API (third-party) | Under $1 per 1M input characters ([Together AI](https://www.together.ai/models/kokoro-82m), others) |
| Commercial use | Permitted under Apache 2.0 without royalty |

*Prices verified 2026-04-17 via the [Kokoro-82M Hugging Face repo](https://huggingface.co/hexgrad/Kokoro-82M) and [ONNX community builds](https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX). Self-hosted inference is free; hosted APIs price per million characters.*

## Against the alternatives

| | Kokoro (82M) | XTTS v2 (~467M) | ElevenLabs (hosted) |
|---|---|---|---|
| **License** | Apache 2.0 | CPML (non-commercial by default) | Proprietary |
| **Parameter count** | 82M | 467M | Not disclosed |
| **Voice cloning** | No | Yes (instant) | Yes (best-in-class) |
| **Languages** | 9 (v1.0) | 17 | 32+ |
| **Real-time streaming** | No | Limited | Yes |
| **Emotion control** | Basic | Basic | Fine-grained |
| **Cost at 10M chars** | Electricity | Electricity | ~$300+ on paid tier |
| **Best viewed as** | Small, offline-first | Mid-size clone-capable | Hosted quality ceiling |

## Failure modes

- **No voice cloning.** Fixed pre-trained voices only. Custom-voice work requires a different model.
- **Prosody is basic.** No fine-grained emotion sliders. Tone is controlled mainly by text wording and punctuation.
- **No streaming.** Full audio generates before playback. Latency is not viable for real-time agent loops.
- **English quality leads; other languages lag.** The 9-language v1.0 list is functional but native-speaker critique can show gaps against specialist models.
- **No hosted first-party API.** Third-party providers (Together, Replicate) exist, but there is no vendor SLA.
- **CPU runs are real-time, GPU is 10-20x faster.** Long-document batches on CPU get slow.
- **Community-driven release cadence.** Version bumps depend on hexgrad's time. Update frequency is irregular.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies claims against primary sources, and generates the editorial analysis shown here. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against the [Kokoro-82M Hugging Face repo](https://huggingface.co/hexgrad/Kokoro-82M), [hexgrad GitHub](https://github.com/hexgrad/kokoro), and [onnx-community Kokoro-82M-v1.0-ONNX builds](https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX).

## FAQ

**Is Kokoro free for commercial use?**
Yes. The model is Apache 2.0 licensed, which allows commercial use without royalties ([Hugging Face](https://huggingface.co/hexgrad/Kokoro-82M)).

**How does Kokoro compare to ElevenLabs?**
Kokoro matches ElevenLabs on fixed-voice English narration quality in blind TTS Arena tests. ElevenLabs still wins on voice cloning, emotion sliders, real-time streaming, and language breadth. Kokoro wins on cost (free vs per-character) and privacy (local vs hosted).

**How do I run Kokoro?**
`pip install kokoro soundfile`. Basic inference:
```python
from kokoro import KPipeline
pipeline = KPipeline(lang_code='a')
audio, _ = pipeline("Your text here.", voice='af_heart')
```
ONNX builds exist for deployment outside Python ([onnx-community](https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX)).

**How many voices and languages does Kokoro support?**
V1.0 ships 26 voices across 9 languages: English (US, UK), Spanish, French, Hindi, Italian, Japanese, Brazilian Portuguese, and Mandarin Chinese. Voices come in US female, US male, UK female, UK male, and regional variants.

**Can Kokoro clone my voice?**
No. Kokoro supports fixed voices only. For zero-shot voice cloning from a short reference clip, use [ElevenLabs](/tools/elevenlabs/), Fish Audio, or [MiniMax Speech](/tools/minimax-speech/).

## Sources

- [Kokoro-82M on Hugging Face](https://huggingface.co/hexgrad/Kokoro-82M): official model, voicepacks, documentation
- [hexgrad GitHub](https://github.com/hexgrad/kokoro): source code and Python library
- [Kokoro-82M-v1.0-ONNX](https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX): community ONNX builds for mobile and browser
- [Together AI hosted Kokoro-82M](https://www.together.ai/models/kokoro-82m): hosted API pricing reference

## Related

- **Category:** [AI Voice](/categories/ai-voice/)
- **Compare:** [ElevenLabs](/tools/elevenlabs/) · [Cartesia](/tools/cartesia/) · [MiniMax Speech](/tools/minimax-speech/)
