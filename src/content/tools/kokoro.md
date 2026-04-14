---
type: tool
slug: kokoro
title: Kokoro TTS
tagline: Open-source text-to-speech model with 82M parameters that runs locally and produces near-human voice quality.
category: ai-voice
company: hexgrad (open-source)
url: https://huggingface.co/hexgrad/Kokoro-82M
pricing_model: open-source
price_range: "Free (open-source)"
status: active
launched: 2024-11
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
  moat: 5
  longevity: 7
tags: [ai-voice, tts, text-to-speech, open-source, local, free, kokoro]
seo_title: "Kokoro TTS Review 2026: Free Open-Source Text-to-Speech That Sounds Human"
meta_description: "Kokoro is a free, open-source TTS model with 82M parameters that runs locally on consumer hardware. Quality rivals ElevenLabs. Full review with setup guide."
author: "aipedia.wiki Editorial"
---

# Kokoro TTS

Kokoro is an open-source text-to-speech model released by hexgrad in late 2024. At 82 million parameters, it is small enough to run on consumer CPU or GPU hardware while producing voice quality that benchmarks favorably against commercial services. It is free, requires no API key, has no usage limits, and keeps audio generation entirely on your own machine. For developers and researchers who want high-quality TTS without ongoing API costs or data privacy concerns, Kokoro is the most capable open-source option available.

## What It Does

Kokoro generates natural-sounding speech from text, locally on your hardware, with no network requests required after the initial model download (~300MB). It supports multiple built-in voices (American and British English, plus experimental multilingual support in later versions), variable speaking rate, and pitch control.

Core capabilities:

- **Local inference:** runs on CPU (slower) or CUDA GPU (fast); no internet connection after download
- **Multiple voices:** 10+ built-in voices across gender and accent variants (American English, British English)
- **Style control:** adjust speaking rate and pitch; style embeddings in the model allow for further customization
- **Long-form generation:** handles full document synthesis without the chunking issues that affect some models
- **Python API:** clean Python library for integration into applications, scripts, and pipelines
- **Gradio demo:** a browser-based UI is available for non-code users to test the model locally

The model is based on a modified StyleTTS 2 architecture with additional training on high-quality voice data. The 82M parameter count is notable because it is far smaller than competing models (Tortoise TTS uses 300M+, XTTS v2 uses 400M+) while matching or exceeding their output quality.

## Who It's For

- **Developers** building applications that need TTS without API cost at scale — Kokoro eliminates per-character charges for high-volume use
- **Privacy-sensitive users** who cannot send text content to external APIs (medical, legal, personal data)
- **Researchers** needing reproducible TTS results without API rate limits or versioning changes
- **Self-hosters** building local AI pipelines (Ollama + local LLM + Kokoro TTS creates a fully offline AI assistant)
- **Content creators** who need unlimited generation for subtitles, narration, or prototyping without subscription costs

Not designed for: voice cloning from custom samples (Kokoro uses fixed pre-trained voices), commercial production requiring unique branded voices, or non-technical users wanting a polished GUI.

## Pricing

Kokoro is completely free. The model weights are released under the Apache 2.0 license, which permits commercial use.

Running costs are limited to your own hardware electricity. On a modern CPU, generation is roughly real-time (1 second of audio per second of compute). On a GPU (NVIDIA RTX 3060 or better), generation runs 10-20x faster than real-time.

There is no hosted API, no subscription, no usage limits, no data sent to external servers.

## Key Features

- **Apache 2.0 license:** permissive open-source; commercial use allowed without royalties
- **82M parameters / ~300MB download:** small enough to run on any modern laptop; no specialized hardware required
- **CPU and GPU inference:** runs on CPU without configuration; automatic GPU acceleration with CUDA
- **Multi-voice support:** 10+ distinct voices with natural variation in timbre, age, and accent
- **Python library:** `pip install kokoro` installs everything needed; integration into existing Python projects is straightforward
- **Active development:** the hexgrad team and open-source community have released multiple improved checkpoints since the initial release
- **ONNX export:** convert to ONNX format for deployment in non-Python environments (mobile, browser, C++ applications)

## Limitations

- **No voice cloning** — Kokoro uses fixed pre-trained voice styles; you cannot clone an arbitrary voice from a sample the way ElevenLabs or Cartesia allow
- **English-primary** — highest quality in American and British English; multilingual support in newer versions but noticeably lower quality in non-English languages
- **No emotion control** — limited prosody customization; does not match ElevenLabs' fine-grained emotional expression controls
- **No hosted version** — must self-host; not a drop-in API replacement for ElevenLabs or OpenAI TTS without wrapping in your own server
- **CPU speed is slow** — real-time generation on CPU is functional but 10-20x slower than GPU; long documents take minutes
- **No streaming** — Kokoro generates the full audio file before playback, unlike Cartesia's streaming architecture; not suitable for real-time voice agents without additional engineering

## Bottom Line

Kokoro's value proposition is straightforward: the quality-to-cost ratio is unmatched. You get near-commercial TTS quality for the price of electricity. If you are building a high-volume pipeline, care about data privacy, or simply refuse to pay per-character for audio generation, Kokoro is the correct choice. Its limitations (no voice cloning, no streaming, English-primary) are real, but they rule it out only for specific use cases. For the vast majority of TTS tasks — narration, accessibility, content production, and local AI pipelines — Kokoro is a viable free replacement for services that charge $50-500/month.

## Best Alternatives

| Tool | Best For | Price |
|------|----------|-------|
| [ElevenLabs](../tools/elevenlabs.md) | Voice cloning, emotional range, commercial quality | Free tier / $5+/mo |
| [Cartesia](../tools/cartesia.md) | Real-time streaming TTS for voice agents | Free tier / $49+/mo |
| [Murf](../tools/murf.md) | Non-technical users, studio voiceover UI | Free tier / $29+/mo |
| Coqui TTS | Alternative open-source TTS with voice cloning (archived) | Free |
| StyleTTS 2 | The architecture Kokoro is based on; more configurable but harder to use | Free |

## FAQ

**How does Kokoro compare to ElevenLabs?**
For fixed-voice narration in English, Kokoro quality is competitive with ElevenLabs at lower tier plans. ElevenLabs produces higher-quality output with fine-grained emotional control, a much larger voice library, and voice cloning from samples — none of which Kokoro offers. ElevenLabs requires an internet connection and charges per character; Kokoro is free and local. The choice is quality and features vs. cost and privacy.

**Can I use Kokoro commercially?**
Yes. The Apache 2.0 license explicitly permits commercial use, including in closed-source products and services. You can integrate Kokoro into a paid product, wrap it in an API you sell, or use it to generate audio for commercial content.

**How do I run Kokoro?**
Install via pip: `pip install kokoro soundfile`. The model downloads automatically on first use. Basic usage:
```python
from kokoro import KPipeline
pipeline = KPipeline(lang_code='a')  # 'a' = American English
audio, _ = pipeline("Your text here.", voice='af_heart')
```
Full documentation and voice samples are on the [Hugging Face model page](https://huggingface.co/hexgrad/Kokoro-82M).

**What GPU do I need?**
Kokoro runs on CPU without any GPU. A GPU accelerates generation 10-20x. Any NVIDIA GPU with CUDA support (GTX 1060 or newer) works. 4GB VRAM is sufficient; the model fits comfortably in 2GB VRAM.

## Sources

- [Kokoro-82M on Hugging Face](https://huggingface.co/hexgrad/Kokoro-82M)
- [hexgrad GitHub](https://github.com/hexgrad/kokoro)
- [StyleTTS 2 paper (base architecture)](https://arxiv.org/abs/2306.07691)
