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
  moat: 5
  longevity: 7
tags: [ai-voice, tts, text-to-speech, open-source, local, free, kokoro]
seo_title: "Kokoro TTS Review 2026: Free Open-Source Text-to-Speech That Sounds Human"
meta_description: "Kokoro is a free, open-source TTS model with 82M parameters that runs locally on consumer hardware. Quality rivals ElevenLabs. Full review with setup guide."
author: "aipedia.wiki Editorial"
quick_answer: >-
  Kokoro is a free, open-source text-to-speech model released by hexgrad with 82 million parameters, small enough to run on consumer CPU or GPU hardware after a roughly 300MB download, requiring no API key, no network connection, and no per-character fees. At 82M parameters it is significantly smaller than competing open-source models (Tortoise TTS uses 300M-plus, XTTS v2 uses 400M-plus) while benchmarking favorably against them and approaching commercial service quality for fixed-voice English narration. The model is free under an Apache 2.0 license permitting commercial use, with running costs limited to hardware electricity. Best for developers building high-volume TTS pipelines, privacy-sensitive users who cannot send text to external APIs, and self-hosters building fully offline AI stacks; ElevenLabs wins when you need voice cloning, fine-grained emotional control, or real-time streaming, none of which Kokoro supports.
---


# Kokoro TTS

Kokoro is an open-source text-to-speech model released by hexgrad in late 2024. At 82 million parameters, it runs on consumer CPU or GPU hardware while producing voice quality that benchmarks against commercial services. It requires no API key, has no usage limits, and keeps audio generation on local hardware. For developers and researchers needing TTS without API costs or data privacy issues, Kokoro remains a capable open-source option.[https://huggingface.co/hexgrad/Kokoro-82M][https://github.com/hexgrad/kokoro]

## What It Does

Kokoro generates speech from text on local hardware, with no network requests after the initial ~300MB model download. It supports multiple built-in voices for American and British English, variable speaking rate, and pitch control.[https://huggingface.co/hexgrad/Kokoro-82M]

Core capabilities include local inference on CPU or CUDA GPU; 10+ built-in voices across gender and accent variants; style control for rate and pitch; long-form generation for full documents; Python API for application integration; and Gradio demo for browser-based testing.[https://github.com/hexgrad/kokoro]

The model uses a modified StyleTTS 2 architecture trained on high-quality voice data. Its 82M parameter size is smaller than alternatives like Tortoise TTS (300M+) or XTTS v2 (400M+) while matching their quality in English narration.[https://huggingface.co/hexgrad/Kokoro-82M]

## Who It's For

- Developers building applications with TTS at scale without per-character charges
- Privacy-sensitive users avoiding external APIs for sensitive text (medical, legal data)
- Researchers needing reproducible TTS without rate limits or API changes
- Self-hosters creating offline AI pipelines (local LLM + Kokoro TTS)
- Content creators generating unlimited audio for narration or subtitles without subscriptions

## Pricing

| Tier | Price | Details |
|------|-------|---------|
| Open-source | Free | Apache 2.0 license; commercial use allowed; self-hosted only |

Prices verified 2026-04-15. Running costs limited to hardware electricity. CPU generation near real-time; GPU 10-20x faster.[https://huggingface.co/hexgrad/Kokoro-82M]

## Key Features

- Apache 2.0 license permits commercial use without royalties
- 82M parameters / ~300MB download fits on laptops; no specialized hardware
- CPU and GPU inference; automatic CUDA acceleration
- 10+ voices with timbre, age, accent variation
- Python library via `pip install kokoro`; simple integration
- Active community updates with improved checkpoints
- ONNX export for non-Python deployment (mobile, browser, C++)
- Gradio UI for local testing without coding[https://github.com/hexgrad/kokoro]

## Limitations

- No voice cloning; fixed pre-trained voices only
- English primary; multilingual lower quality
- Limited prosody; no fine-grained emotion control
- No hosted API; requires self-hosting
- CPU slower than GPU for long texts
- No streaming; full audio generated before playback[https://huggingface.co/hexgrad/Kokoro-82M]

## Bottom Line

Kokoro provides TTS quality near commercial levels at electricity cost only. It suits high-volume, privacy-focused, or offline use where fixed English voices suffice. Limitations exclude it from voice cloning or real-time agent needs.

## Best Alternatives

| Tool | Best For | Price |
|------|----------|-------|
| [ElevenLabs](../tools/elevenlabs.md) | Voice cloning, emotion control | Free tier / $5+/mo |
| [Cartesia](../tools/cartesia.md) | Streaming TTS for agents | Free tier / $49+/mo |
| [Murf](../tools/murf.md) | Studio UI for voiceover | Free tier / $29+/mo |

## FAQ

**How does Kokoro compare to ElevenLabs?**  
Kokoro matches ElevenLabs for fixed-voice English narration but lacks cloning, emotion control, and larger voice libraries. Kokoro is free and local; ElevenLabs charges per character and needs internet.[https://huggingface.co/hexgrad/Kokoro-82M]

**Can I use Kokoro commercially?**  
Yes, Apache 2.0 allows commercial use in products or services.[https://huggingface.co/hexgrad/Kokoro-82M]

**How do I run Kokoro?**  
`pip install kokoro soundfile`. Example:
```python
from kokoro import KPipeline
pipeline = KPipeline(lang_code='a')
audio, _ = pipeline("Your text here.", voice='af_heart')
```
See [Hugging Face page](https://huggingface.co/hexgrad/Kokoro-82M).[https://github.com/hexgrad/kokoro]

## Sources

- [Kokoro-82M on Hugging Face](https://huggingface.co/hexgrad/Kokoro-82M)
- [hexgrad GitHub](https://github.com/hexgrad/kokoro)
---