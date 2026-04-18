---
type: news
slug: 2026-03-16-xai-grok-tts-api-launch
title: "xAI Launches Grok Text-to-Speech API with 5 Voices and 20+ Languages"
date: 2026-03-16
severity: major
summary: "xAI opened its Grok Text-to-Speech API to developers on March 16, 2026. Five voice personalities (Ara, Eve, Leo, Rex, Sal), 20+ languages with automatic detection, inline speech tags for pauses, laughter, whispers, and emphasis. Pricing is $4.20 per 1M characters. Audio formats include MP3, WAV, PCM, and G.711 variants. Positions Grok against ElevenLabs + OpenAI's voice stack."
affects: [grok, elevenlabs]
categories: [ai-voice]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-18
last_verified: 2026-04-18
sources:
  - url: "https://x.ai/news/grok-voice-agent-api"
    title: "Grok Voice Agent API - xAI"
  - url: "https://docs.x.ai/developers/model-capabilities/audio/voice"
    title: "Voice APIs - xAI Docs"
---

xAI officially opened the **Grok Text-to-Speech API** to developers on March 16, 2026. It's the first time Grok has shipped audio capability outside the chat UI, and it lands as a direct competitor to ElevenLabs and OpenAI's voice stack.

**Voice roster + languages:**
- Five distinct voice personalities: Ara, Eve, Leo, Rex, Sal
- Each engineered to sound "natural and expressive rather than flat or robotic"
- 20+ languages with automatic language detection

**Developer controls that matter:**
- Inline speech tags for **pauses, laughter, whispers, emphasis**
- Audio output in MP3, WAV, PCM (Linear16), G.711 μ-law, G.711 A-law
- No format conversion needed; the API slots into existing audio pipelines

**Pricing:**
- $4.20 per 1 million characters (Beta pricing)
- 100 concurrent requests per team

**Why it matters:**

Voice is the third-layer frontier that frontier labs are racing to own. [ElevenLabs](/tools/elevenlabs/) has dominated the developer-facing TTS market since 2023 with voice cloning + multilingual at premium prices. OpenAI has shipped Advanced Voice Mode inside ChatGPT but kept TTS API access limited. Grok's entry with 20+ languages at $4.20 per 1M characters undercuts ElevenLabs' Creator pricing significantly and opens the door for applications that need personality-driven voices without the ElevenLabs premium.

**Pair with:** Grok Voice Mode went live on X (Android + web) three days later on March 19, 2026. It's the consumer-facing complement to the API. See the separate news item.

## Sources

- [Grok Voice Agent API (xAI)](https://x.ai/news/grok-voice-agent-api)
- [xAI Voice API docs](https://docs.x.ai/developers/model-capabilities/audio/voice)
- [Basenor: xAI Grok TTS API launch coverage](https://www.basenor.com/blogs/news/xai-launches-grok-text-to-speech-api-5-voices-20-languages)
