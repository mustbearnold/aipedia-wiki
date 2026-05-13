---
type: tool
slug: deepgram
title: Deepgram
tagline: Speech AI API platform for speech-to-text, text-to-speech, audio intelligence, and real-time voice agents with usage-based pricing.
category: ai-voice
secondary_categories: [ai-automation]
company: Deepgram
url: https://deepgram.com
pricing_model: freemium
price_range: $200 free credit, then pay-as-you-go; Growth saves up to 20%; Enterprise custom
status: active
launched: 2015
last_updated: 2026-05-13
last_verified: 2026-05-13
price_history:
  - date: 2026-05-13
    price: "see note"
    note: "Public pricing page now lists explicit per-minute rates: Flux English STT $0.0065/min streaming PAYG ($0.0057/min Growth); Nova-3 Monolingual STT $0.0048/min streaming PAYG; Aura-2 TTS $0.030/1k characters PAYG; Voice Agent API tiered $0.050 to $0.163/min depending on bring-your-own LLM/TTS configuration."
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 8
  moat: 8
  longevity: 8
facts:
  best_for:
    value: Best for developers building voice AI products that need speech-to-text, text-to-speech, audio intelligence, and
      real-time agent APIs.
    source: https://deepgram.com/
    source_label: Deepgram official site
    source_id: deepgram-official
    verified_at: '2026-05-13'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  pricing_anchor:
    value: 'Free $200 credit; Pay As You Go (no minimums); Growth (annual prepaid, save up to 20%); Enterprise custom. STT
      Flux English $0.0065/min streaming PAYG, Nova-3 Monolingual $0.0048/min streaming PAYG. TTS Aura-2 $0.030/1k characters
      PAYG. Voice Agent API $0.050 to $0.163/min depending on configuration.'
    source: https://deepgram.com/pricing
    source_label: Deepgram pricing
    source_id: deepgram-pricing
    verified_at: '2026-05-13'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  api_available:
    value: Deepgram is API-first, with developer docs as the source of truth for endpoint behavior, authentication, streaming,
      and SDK assumptions.
    source: https://developers.deepgram.com/docs
    source_label: Deepgram docs
    source_id: deepgram-docs
    verified_at: '2026-05-13'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  real_time_voice:
    value: The Voice Agent API is Deepgram's dedicated surface for low-latency conversational voice agents, with tiered per-minute
      pricing that varies based on whether the customer brings their own LLM or TTS.
    source: https://deepgram.com/product/voice-agent-api
    source_label: Deepgram Voice Agent API
    source_id: deepgram-voice-agent
    verified_at: '2026-05-13'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  watch_out_for:
    value: 'Evaluate Deepgram by latency, accuracy, diarization, language coverage, streaming reliability, TTS quality, and
      total audio hours, not only per-hour headline rates. Voice Agent API stacks STT, TTS, LLM, and telephony charges separately.'
    source: https://deepgram.com/pricing
    source_label: Deepgram pricing
    source_id: deepgram-pricing
    verified_at: '2026-05-13'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
tags: [speech-to-text, text-to-speech, voice-agent, transcription, realtime, api, audio-intelligence]
seo_title: "Deepgram Review: Speech-to-Text, Voice Agents & Pricing (2026)"
meta_description: "Deepgram is a speech AI API platform for speech-to-text, text-to-speech, audio intelligence, and real-time voice agents."
author: aipedia.wiki Editorial
best_for:
  - developers building voice agents and call analytics
  - real-time transcription and streaming voice apps
  - teams needing STT, TTS, and voice-agent APIs from one vendor
  - products with high-volume audio workloads
not_best_for:
  - manual podcast editing
  - consumer meeting notes
  - teams that only need occasional file transcription
quick_answer: >-
  Deepgram is a developer-first speech AI platform. Pick it for real-time transcription, voice agents, text-to-speech, and audio intelligence in production apps. Skip it if you need an end-user meeting assistant or editing suite.
---

# Deepgram

Deepgram is a speech AI API platform. Its product set covers speech-to-text, text-to-speech, audio intelligence, and real-time voice-agent APIs for developers building voice products. The platform is built for embedded speech workflows: streaming transcription, call analytics, conversational agents, dictation, captions, and product features where voice quality affects the user experience.

It competes with [AssemblyAI](/tools/assemblyai/), OpenAI Whisper, Google Speech-to-Text, Azure AI Speech, Amazon Transcribe, Speechmatics, and voice-agent stacks.

## System Verdict

> **Pick Deepgram for real-time voice infrastructure.** It is strongest when transcription, TTS, and live voice-agent performance are product dependencies.
>
> **Skip it for human-facing meeting notes.** [Fathom](/tools/fathom/), [Fireflies](/tools/fireflies/), [Otter.ai](/tools/otter-ai/), and [Read AI](/tools/read-ai/) package the user workflow.
>
> The product is API-first. That is exactly right for developers and exactly wrong for someone who just wants a transcript from a Zoom call.

## Key Facts

| | |
|---|---|
| **Core product** | Speech AI APIs |
| **Speech-to-text models** | Flux English/Multilingual (real-time agents) · Nova-3 Monolingual/Multilingual (general transcription) |
| **Text-to-speech models** | Aura-1 · Aura-2 |
| **Voice Agent API** | Real-time conversational voice agents · tiered pricing |
| **Audio intelligence** | Summarization, topic, sentiment, intent features |
| **Free credit** | $200 credit for new projects |
| **STT pricing (verified 2026-05-13)** | Flux English $0.0065/min streaming PAYG ($0.0057/min Growth); Nova-3 Monolingual $0.0048/min streaming PAYG |
| **TTS pricing (verified 2026-05-13)** | Aura-2 $0.030/1k characters PAYG; Aura-1 $0.0150/1k characters PAYG |
| **Voice Agent pricing (verified 2026-05-13)** | $0.050 to $0.163/min depending on tier and bring-your-own LLM/TTS |
| **Growth plan** | Annual prepaid credits, save up to 20% |
| **Best fit** | Voice products, call centers, agents, audio analytics |

## When to pick Deepgram

- **You need streaming transcription.** Real-time voice apps need low latency and stable WebSocket behavior.
- **You are building voice agents.** Deepgram bundles STT, TTS, and voice-agent pieces.
- **You need developer controls.** API-first configuration is better than a meeting-note UI for embedded products.
- **You handle high audio volume.** Usage-based pricing and Growth plans are built for scale.
- **You care about data residency.** Deepgram lists a dedicated EU endpoint for EU processing.
- **You need model choice for voice.** Deepgram separates real-time conversational STT, prerecorded transcription, TTS, and audio intelligence so teams can tune cost and quality by workflow.

## When to pick something else

- **Meeting note workflow:** [Fathom](/tools/fathom/), [Fireflies](/tools/fireflies/), [Otter.ai](/tools/otter-ai/), or [Read AI](/tools/read-ai/).
- **Audio/video editing:** [Descript](/tools/descript/).
- **Open-source local transcription:** Whisper via local GPU or [Whisper](/tools/whisper/).
- **Speech understanding benchmarks:** compare closely with [AssemblyAI](/tools/assemblyai/).

## Pricing

Deepgram offers a free $200 credit, then pay-as-you-go pricing. Growth plans use annual prepaid credit commitments and save up to 20% versus PAYG rates, and Enterprise is custom. Pricing varies by endpoint: speech-to-text, text-to-speech, Voice Agent API, and audio intelligence all have separate meters.

As verified on 2026-05-13, the pricing page lists explicit per-minute and per-character rates by model family.

| Surface | Model | Streaming (PAYG) | Streaming (Growth) | Pre-recorded (PAYG) | Pre-recorded (Growth) |
|---------|-------|------------------|--------------------|---------------------|------------------------|
| STT | Flux English | $0.0065/min | $0.0057/min | $0.0077/min | $0.0065/min |
| STT | Flux Multilingual | $0.0078/min | $0.0068/min | n/a | n/a |
| STT | Nova-3 Monolingual | $0.0048/min | $0.0042/min | $0.0077/min | $0.0065/min |
| STT | Nova-3 Multilingual | $0.0058/min | $0.0050/min | $0.0092/min | $0.0078/min |

| Surface | Model | PAYG | Growth |
|---------|-------|------|--------|
| TTS | Aura-2 | $0.030 / 1k characters | $0.027 / 1k characters |
| TTS | Aura-1 | $0.0150 / 1k characters | $0.0135 / 1k characters |

Voice Agent API ranges from $0.050 to $0.163 per minute depending on configuration tier and whether the customer brings their own LLM and TTS.

Teams should price by audio hours, concurrency, latency target, and whether TTS and LLM components are bundled or brought separately. The pricing page also lists separate concurrency limits for REST, WebSocket, TTS, Voice Agent API, and Audio Intelligence. Those limits can matter more than the per-minute headline rate in production.

## Evaluation checklist

Test Deepgram with your real audio before choosing it:

- Noisy calls, accents, crosstalk, far-field audio, and domain jargon.
- Streaming latency, partial transcripts, endpointing, and interruption behavior.
- Diarization quality when multiple speakers overlap.
- Language detection and multilingual behavior if calls switch languages.
- TTS voice quality, pronunciation, and interruption handling for agents.
- Concurrency limits under your peak traffic pattern.
- Add-on cost for summarization, topics, sentiment, intent, or custom models.

## Buyer fit

Deepgram is strongest for product teams that need speech as infrastructure. A call-center platform, voice agent, transcription API, language-learning app, or compliance review workflow can justify integration effort because speech quality becomes product quality.

It is less attractive for occasional transcription. If a team only uploads a few recordings per month, a finished app or a simple Whisper wrapper can be cheaper and easier. Deepgram becomes compelling when the team needs low-latency streaming, high volume, voice-agent primitives, or support for production reliability.

## Failure Modes

- **API integration required.** There is no polished consumer workflow.
- **Voice agent cost stacks.** STT, TTS, LLM, and telephony can all bill separately.
- **Accuracy varies by domain.** Jargon, accents, noise, and overlapping speech need testing.
- **Concurrency matters.** Real-time systems fail on limits before they fail on average price.
- **Feature pricing is modular.** Audio intelligence and voice-agent features are not the same bill as transcription.
- **Voice quality is workload-specific.** Model choice should be driven by your audio, not by a generic speech benchmark.

## Recent changes

- **Pricing transparency (verified 2026-05-13).** Deepgram's pricing page now publishes explicit per-minute and per-character rates for Flux, Nova-3, and Aura model families across both PAYG and Growth plans, with Growth saving up to 20%. Earlier pages described pricing as usage-based without surfacing the per-model rates.
- **Voice Agent API pricing surfaced.** The Voice Agent API now lists a $0.050 to $0.163 per-minute range, with the upper end reserved for bundled STT, TTS, and LLM and the lower end for bring-your-own-LLM/TTS configurations.
- **Model lineup confirmed.** Flux remains the real-time voice-agent STT model; Nova-3 covers general transcription; Aura-2 is the current premium TTS family.

## Methodology

Last verified 2026-05-13 against Deepgram pricing and product documentation. Scoring emphasizes API utility, real-time performance fit, voice-agent breadth, and implementation complexity.

## FAQ

**Does Deepgram only do speech-to-text?**
No. It also offers text-to-speech, audio intelligence, and voice-agent APIs.

**Is Deepgram good for meeting notes?**
It can power a meeting-note product, but it is not itself the finished meeting-note app.

**Does Deepgram have a free tier?**
Deepgram lists free credits for new users, then pay-as-you-go pricing.

## Sources

- [Deepgram pricing](https://deepgram.com/pricing)
- [Deepgram docs](https://developers.deepgram.com/docs)
- [Deepgram voice agents](https://deepgram.com/product/voice-agent)

## Related

- **Category:** [AI Voice](/categories/ai-voice/)
- **See also:** [AssemblyAI](/tools/assemblyai/) · [Whisper](/tools/whisper/) · [ElevenLabs](/tools/elevenlabs/) · [Fathom](/tools/fathom/) · [Read AI](/tools/read-ai/)
