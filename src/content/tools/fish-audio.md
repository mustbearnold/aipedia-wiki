---
type: tool
slug: fish-audio
title: Fish Audio / Fish Speech S2
tagline: Open-source text-to-speech model delivering near-ElevenLabs quality with self-hosting and ultra-low latency.
category: ai-voice
company: fish-audio
url: https://fish.audio
pricing_model: open-source
price_range: "$0 (self-hosted) or freemium cloud"
status: active
launched: 2024-03
last_updated: 2026-04-13
last_verified: 2026-04-13
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
  moat: 6
  longevity: 8
tags: [tts, text-to-speech, voice-ai, open-source, self-hosted, voice-cloning, fish-speech, low-latency, multilingual]
seo_title: "Fish Audio: Features, Pricing & Review (2026)"
meta_description: "Fish Audio / Fish Speech S2 is the leading open-source TTS model. Free to self-host; cloud API at $0.015/1K chars. Near-ElevenLabs quality, half the cost."
author: "aipedia.wiki Editorial"
---

# Fish Audio / Fish Speech S2

Fish Audio / Fish Speech S2 is an open-source text-to-speech model developed by the Fish Audio team. It generates high-quality speech from text with voice cloning and multilingual support, and is primarily used for self-hosted TTS, real-time voice agents, and high-volume speech synthesis. Its key differentiator is the combination of near-ElevenLabs quality with full self-hosting capability and ultra-low latency (under 150ms first-token). As of April 2026, Fish Speech S2 is free to self-host (MIT license, runs on consumer GPUs) with a cloud API at approximately $0.015 per 1,000 characters. Compared to ElevenLabs, Fish Audio delivers 85-90% of the quality at roughly half the API cost, with the added option of unlimited free self-hosted inference.

## What It Does

Fish Speech S2 is an open-source TTS model (MIT license) that generates near-ElevenLabs quality speech with voice cloning, multilingual synthesis, and ultra-low latency under 150ms, free to self-host on consumer GPUs or available via cloud API at $0.015/1K characters ([Fish Audio](https://fish.audio)). The model runs locally on 8GB+ VRAM hardware with full weights available on GitHub and Hugging Face ([Fish Audio GitHub](https://github.com/fishaudio/fish-speech)). Quality approaches ElevenLabs at roughly half the API cost, and is free with self-hosting.

## Who It's For

- **Developers needing on-premise TTS:** the primary reason to choose Fish Audio over ElevenLabs. Full control, no data leaves your servers.
- **High-volume API users:** if you need millions of characters per month, self-hosting eliminates per-character costs entirely.
- **Latency-sensitive applications:** voice agents, real-time conversational AI, gaming dialogue where milliseconds matter.
- **Privacy-conscious projects:** healthcare, legal, government contexts where audio data cannot go to third-party clouds.
- **Open-source builders:** developers who want to fine-tune, modify, or integrate TTS deeply into custom products.

## Pricing

Fish Audio is free to self-host (MIT license, consumer GPU) with a cloud API at ~$0.015/1K characters, roughly half the cost of ElevenLabs' $0.030/1K characters ([Fish Audio](https://fish.audio)).

| Option | Price | Key Details |
|--------|-------|-------------|
| Self-hosted | $0 | Requires GPU (8GB+ VRAM). Full model weights on GitHub/Hugging Face. |
| Cloud Free | $0 | Limited daily characters. Watermarked. fish.audio hosted. |
| Cloud Pay-as-you-go | ~$0.015/1K chars | No watermark. API access. Cheaper than ElevenLabs ($0.030). |

*Self-hosting cost is your own compute. Cloud prices verified 2026-04-13. Check [fish.audio](https://fish.audio) for current rates.*

## Key Features

- **Open-source model:** full model weights available under MIT license; fork, fine-tune, embed, or sell products built on it with no vendor lock-in ([Fish Audio GitHub](https://github.com/fishaudio/fish-speech)).
- **Self-hostable:** runs on consumer GPUs (RTX 3080 and up) with full local inference, no API calls, and no per-character costs ([Fish Audio Docs](https://docs.fish.audio)).
- **Ultra-low latency:** streaming inference with first-token latency under 150ms on modern GPUs, critical for real-time voice agents and conversational AI ([Fish Audio](https://fish.audio)).
- **Near-ElevenLabs quality:** in blind A/B tests, Fish Speech S2 is within 10-15% of ElevenLabs quality. For most applications, the difference is not noticeable.
- **Multilingual:** supports English, Chinese, Japanese, Korean, and other languages with natural-sounding output.
- **Voice cloning:** clone a voice from a short audio sample. Quality is good, though ElevenLabs Professional Voice Cloning is still slightly better.

## Limitations

Fish Audio's cloud platform is less polished than ElevenLabs, self-hosting requires GPU infrastructure management, and voice cloning quality is slightly below ElevenLabs Professional Voice Cloning in side-by-side comparisons ([Fish Audio](https://fish.audio)).

- **Not as polished as ElevenLabs.** The cloud platform (fish.audio) has a simpler UI, less documentation, and fewer pre-built integrations. ElevenLabs has a more mature developer experience.
- **Self-hosting requires technical skill.** You need to manage GPU infrastructure, model updates, and inference optimization. Not plug-and-play for non-technical users.
- **Voice cloning quality gap.** Voice cloning works well but is not quite at ElevenLabs Professional Voice Cloning level. The gap is small but audible in side-by-side comparisons.
- **Smaller community.** Fewer tutorials, plugins, and third-party tools compared to ElevenLabs. Growing, but still niche.
- **Model updates depend on maintainers.** Open-source sustainability risk, though the project has strong momentum and backing as of April 2026.
- **No voice agents platform.** ElevenLabs has a full voice agents product. Fish Audio is a TTS model; you build the agent layer yourself.

## Bottom Line

Fish Audio / Fish Speech S2 is the best choice for developers who need self-hosted TTS with near-premium quality and zero per-character costs, but ElevenLabs wins if you want a polished cloud platform with the best voice quality and zero infrastructure management. If you are a developer comfortable managing GPU infrastructure, you can get near-ElevenLabs quality for free.

## Best Alternatives

- **[ElevenLabs](elevenlabs.md):** the market leader. Better quality, better ecosystem, higher price. Best if you want turnkey cloud TTS.
- **[Voxtral (Mistral)](../categories/ai-voice.md):** cloud API, cheaper than ElevenLabs. Not open-source, not self-hostable.
- **[Coqui TTS](../categories/ai-voice.md):** another open-source TTS option. Lower quality than Fish Speech S2 but simpler to deploy.
- **[OpenAI TTS](../categories/ai-voice.md):** good quality, easy API. Cloud-only, no self-hosting.

## FAQ

**Is Fish Audio free?**
Yes, Fish Speech S2 is fully free and open-source (MIT license) for self-hosting. You need a GPU with 8GB+ VRAM to run it locally. The cloud API at fish.audio also has a free tier with limited daily characters and watermarking. Self-hosting eliminates all per-character costs.

**How much does Fish Audio cost?**
Self-hosted Fish Speech S2 costs $0 (you provide the GPU hardware). The cloud API costs approximately $0.015 per 1,000 characters, which is roughly half the cost of ElevenLabs ($0.030/1K chars). Self-hosting is the most economical option for high-volume use.

**What are the best alternatives to Fish Audio?**
ElevenLabs is the best alternative if you want the highest quality TTS with a polished cloud platform ($5-$330/month). Voxtral by Mistral offers cloud API at $0.016/1K characters. Coqui TTS is another open-source option but with lower quality than Fish Speech S2.

## Related

- **Category:** [AI Voice / TTS](../categories/ai-voice.md)

## Sources

- [Official website](https://fish.audio)
- [GitHub Repository](https://github.com/fishaudio/fish-speech)
- [Documentation](https://docs.fish.audio)
