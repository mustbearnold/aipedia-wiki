---
type: tool
slug: hume-ai
title: Hume AI
tagline: >-
  Empathic voice AI with emotion detection. EVI speech-to-speech, Octave TTS with emotional nuance, Expression Measurement API for audio/video/text/image emotion analysis.
category: ai-voice
company: hume-ai
url: 'https://www.hume.ai'
pricing_model: freemium
price_range: $0-$500/month
status: active
launched: 2021-01
last_updated: 2026-05-02
last_verified: 2026-05-02
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
  application_status: none
  notes: "No public affiliate program as of 2026-04-19. Coverage is editorial-only; placements do not earn commission."
scores:
  utility: 8
  value: 8
  moat: 8
  longevity: 7
tags: [voice-ai, empathic-voice, emotion-ai, tts, text-to-speech, speech-to-speech, evi, octave, expression-measurement]
seo_title: 'Hume AI: Features, Pricing & Review (April 2026)'
meta_description: >-
  Hume AI ships EVI empathic speech-to-speech, Octave TTS with emotional nuance, and Expression Measurement for audio / video / text / image emotion analysis. Free through $500/mo Business, Enterprise custom.
author: "aipedia.wiki Editorial"
best_for:
  - voice agents needing emotional awareness
  - customer support and coaching apps
  - therapy, wellness, companion apps
  - UX research on audio and video
  - character voices and expressive narration
not_best_for:
  - ultra-low-latency transactional agents
  - self-hosted deployments
  - teams needing a single TTS replacement for ElevenLabs (different positioning)
quick_answer: >-
  Hume AI builds empathic voice AI. EVI handles speech-to-speech with emotional awareness (interruptions, back-channeling, prosody-aware responses); Octave is the TTS model with emotional nuance; Expression Measurement scores emotion in audio, video, text, and images. Pick it for voice agents where emotion matters. Skip for pure-performance TTS (ElevenLabs leads on quality) or enterprise self-host.
price_history:
  - date: 2026-04-19
    plan: "Starter"
    price: "$3/mo"
    note: "Entry paid tier: 30K TTS chars (~30 min), 40 min EVI, 5 concurrent connections, 20 projects."
  - date: 2026-04-19
    plan: "Creator"
    price: "$7/mo (first month $3.50)"
    note: "Popular creator tier: 140K TTS chars (~140 min), 200 min EVI, 1,000 projects. 50% off first month on public pricing page."
  - date: 2026-04-19
    plan: "Pro"
    price: "$70/mo"
    note: "1M TTS chars (~1,000 min), 1,200 min EVI, 3,000 projects, 10 concurrent connections."
---

# Hume AI

Hume AI is the empathic voice research lab turned product company. Founded 2021 by former Google AI emotion researcher Alan Cowen, the company ships three closed-source products plus one open-source TTS model:

- **EVI (Empathic Voice Interface)** is the speech-to-speech system. Handles interruptions, back-channeling, external LLM routing, and expressive instruction-following. Current production lineup: EVI 3 and EVI 4 mini.
- **Octave** is the text-to-speech model with voice design, modulation, cloning, and conversion. Emotional nuance is the differentiator, not raw quality.
- **Expression Measurement API** scores emotion in audio, video, text, and images. The only production-grade emotion-measurement API with academic-research heritage.
- **TADA** is the open-source LLM TTS that streams text and audio together to reduce hallucinations and latency.

Supporting services: Human Feedback API (survey templates + participant pools), Data Library (speech datasets covering 50+ languages and 48 emotions), Study Runner (programmatic human evaluations).

## System Verdict

> **Pick Hume AI when emotion is the differentiator.** Voice agents for therapy, wellness, coaching, and customer support benefit from EVI's prosody-aware responses and interruption handling in ways that generic TTS does not deliver. Expression Measurement is the only mature API for scoring emotion across audio, video, text, and images at production scale. Starter at $3/mo and Creator at $7/mo are among the cheapest paid voice-AI entry points in the category.
>
> **Skip it if raw TTS quality or ultra-low latency is the goal.** [ElevenLabs](/tools/elevenlabs/) leads on voice quality ceiling; [Cartesia](/tools/cartesia/) wins on sub-40ms latency. Hume's Octave is good but not best-in-class for pure narration. Also skip if you need self-hosted weights for on-prem deployment; EVI and Octave are both cloud-only.
>
> **Who pays which tier:** Free for evaluation (5 min EVI, 10K TTS chars). Starter $3/mo for hobbyist voice-agent builders. Creator $7/mo for most indie developers (140K chars + 200 min EVI). Pro $70/mo when production usage crosses 1M chars/mo. Scale $200/mo for teams needing 3 seats. Business $500/mo for 5-seat orgs with higher concurrency. Enterprise custom for SOC 2 + GDPR + HIPAA, unlimited usage, and Slack support.

## Key Facts

| | |
|---|---|
| **Core products** | EVI (speech-to-speech) · Octave (TTS) · Expression Measurement · TADA (open-source) |
| **EVI versions** | EVI 3 (full) · EVI 4 mini (smaller, faster) |
| **Languages (datasets / TTS)** | 50+ in the Data Library · multilingual TTS in Octave |
| **Emotions measured** | 48 distinct emotions in Expression Measurement |
| **Voice descriptors** | 600+ in the Data Library |
| **Subscription pricing** | Free · Starter $3 · Creator $7 · Pro $70 · Scale $200 · Business $500 · Enterprise custom |
| **Octave TTS rate** | $0.05 to $0.15 per 1,000 chars (plan-dependent) |
| **EVI speech-to-speech** | $0.04 to $0.07 per minute overage |
| **Expression Measurement** | Video+audio $0.0828/min · audio $0.0639/min · video $0.045/min · images $0.00204 each · text $0.00024/word |
| **Concurrent connections** | 1 Free · 5 Starter/Creator · 10 Pro · 20 Scale · 30 Business · unlimited Enterprise |
| **Team seats** | Solo through Pro · 3 Scale · 5 Business · custom Enterprise |
| **Compliance** | SOC 2 · GDPR · HIPAA (Enterprise) |
| **Voice cloning** | Included on all tiers (create + use) |
| **Self-hosted** | None on EVI / Octave · TADA is open-source |

Every data point above verified against Hume's published sources on 2026-04-19.

## What it actually is

A voice-AI platform with emotion science at the core. The company's research heritage (Cowen's earlier work at Google on facial and vocal emotion) shows up in Expression Measurement's taxonomy of 48 distinct emotions and 600+ voice descriptors, trained on curated datasets covering 50+ languages across multiple domains.

**EVI** is the flagship. It's a speech-to-speech system rather than a TTS pipeline: input audio in, response audio out, with the model handling prosody, interruptions, and back-channeling natively. Developers can route the LLM-level reasoning through external models (Claude, GPT, Gemini, open-source) while EVI owns the audio layer.

**Octave** is where voice quality sits. Less polished than ElevenLabs on pure narration but with more emotional range per prompt. Voice design lets developers spec voices by description ("warm, gentle, 40s female") rather than cloning; voice cloning is included on all tiers.

**Expression Measurement** is the academic-heritage product. Score emotion from audio, video, text, or images. Used in UX research, wellness apps, market research, and accessibility products.

**TADA** is the open-source play. LLM-TTS architecture where text and audio stream together to reduce hallucination and latency. Useful for teams evaluating Hume's approach before committing to EVI.

## When to pick Hume AI

- **Voice agents where emotion matters.** Therapy, coaching, wellness, customer support, companion apps. EVI's interruption handling and back-channeling feel conversationally different from ChatGPT Voice or ElevenLabs Conversational.
- **Emotional nuance in narration.** Octave with emotion tags produces delivery variations that straight TTS misses. Useful for character voices, audiobook dramatization, and expressive brand voices.
- **Emotion analytics.** Expression Measurement API is the only production-grade option for scoring emotion at scale across audio, video, text, and images. UX researchers, wellness apps, and accessibility tools land here.
- **Budget-friendly voice-AI entry.** Starter at $3/mo and Creator at $7/mo are genuinely affordable for hobbyist and indie developers. Free tier includes 5 min EVI + 10K TTS chars for evaluation.
- **External LLM flexibility.** EVI's architecture lets developers bring their own LLM for reasoning while Hume owns the voice layer. Useful for teams already committed to a specific model.
- **Research-adjacent workflows.** Data Library, Human Feedback API, and Study Runner serve academic and commercial research teams that other voice-AI vendors do not target.

## When to pick something else

- **Peak voice quality or multilingual breadth:** [ElevenLabs](/tools/elevenlabs/). Eleven v3 leads on narration quality and language coverage (70+ languages on v3); Octave's positioning is emotion, not peak fidelity.
- **Ultra-low latency for real-time agents:** [Cartesia](/tools/cartesia/) delivers sub-40ms vs EVI's higher round-trip latency.
- **Open-source self-hosting of the full stack:** [Fish Audio](/tools/fish-audio/) for open-weights TTS. TADA is open-source but it's the text-audio streaming architecture, not a drop-in EVI replacement.
- **Single TTS replacement for an ElevenLabs subscription:** Octave works but does not match ElevenLabs on quality ceiling. Consider whether the emotional-range differentiation justifies the switch.

## Pricing

Subscription pricing via [hume.ai/pricing](https://www.hume.ai/pricing):

| Plan | Monthly | TTS Characters | EVI Minutes | Concurrent | Projects | Seats |
|---|---|---|---|---|---|---|
| Free | $0 | 10K | 5 | 1 | 20 | 1 |
| Starter | $3 | 30K | 40 | 5 | 20 | 1 |
| Creator | $7 (first month $3.50) | 140K | 200 | 5 | 1,000 | 1 |
| Pro | $70 | 1M | 1,200 | 10 | 3,000 | 1 |
| Scale | $200 | 3.3M | 5,000 | 20 | 10,000 | 3 |
| Business | $500 | 10M | 12,500 | 30 | 20,000 | 5 |
| Enterprise | Custom | Unlimited | Unlimited | Unlimited | Unlimited | Custom |

Usage-based rates (overages or custom workflows):

| Service | Rate |
|---|---|
| Octave TTS | $0.05 to $0.15 per 1,000 characters (plan-dependent) |
| EVI speech-to-speech overage | $0.04 to $0.07 per minute |
| Expression Measurement: video+audio | $0.0828 / minute |
| Expression Measurement: audio only | $0.0639 / minute |
| Expression Measurement: video only | $0.045 / minute |
| Expression Measurement: images | $0.00204 each |
| Expression Measurement: text | $0.00024 / word |

Prices verified 2026-04-19 via [Hume pricing](https://www.hume.ai/pricing) and the [Hume homepage](https://www.hume.ai/). Voice cloning (create and use) is included on all tiers. Enterprise adds API voice access, SOC 2 / GDPR / HIPAA compliance, Slack support, and custom rate limits.

## Against the alternatives

| | Hume Octave | ElevenLabs v3 | Cartesia |
|---|---|---|---|
| **Voice quality ceiling** | Strong, emotion-focused | **Highest** on v3 | Strong, speed-optimized |
| **Emotional nuance** | **Strongest** (48 emotions, voice descriptors) | Audio tags on v3 | Limited prosody control |
| **Real-time latency** | Higher (EVI roundtrip) | ~75ms on Flash v2.5 | **Sub-40ms** (category leader) |
| **Voice cloning** | Included all tiers | IVC + PVC on Creator+ | Available |
| **Speech-to-speech** | **EVI (native)** | Requires Conversational AI setup | Available |
| **Emotion analytics API** | **Yes (Expression Measurement)** | None | None |
| **Open-source option** | TADA (partial) | None | None |
| **Entry price** | **$3/mo Starter** | $6/mo Starter | Paid tier only |
| **Best viewed as** | Emotion-AI specialist | Quality + coverage leader | Latency specialist |

## Failure modes

- **Raw TTS quality is not the lead.** Octave is good but not category-leading. Teams that prioritize peak narration fidelity over emotional range should pair Hume with or switch to ElevenLabs for narration work.
- **Latency on EVI is higher than Cartesia or Flash v2.5.** Speech-to-speech roundtrip is the tradeoff for prosody-aware processing. Real-time agents needing sub-100ms feel should benchmark before committing.
- **Free tier is tight.** 5 minutes of EVI and 10K TTS chars per month is evaluation-only. Serious usage starts at Starter $3/mo.
- **Multiple quota types can surprise.** TTS characters, EVI minutes, concurrent connections, and projects all scale independently per tier. Heavy usage on one dimension can force a tier upgrade even if others have headroom.
- **Expression Measurement pricing varies by modality.** Video+audio is ~3x audio-only cost; text is essentially free at $0.00024/word. Budget modelling requires thinking in terms of which modality drives volume.
- **Self-hosting is limited.** EVI and Octave are cloud-only. TADA is open-source but it is an LLM-TTS architecture, not a drop-in replacement for EVI or Octave.
- **No affiliate program currently.** Publisher monetization on Hume coverage has to come from editorial-audience value, not commission.
- **Research-voice positioning cuts both ways.** The academic heritage gives Hume credibility on emotion but slows mainstream adoption versus flashier category leaders.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-19 against [Hume pricing](https://www.hume.ai/pricing), the [Hume homepage](https://www.hume.ai/), and the [Hume platform docs](https://dev.hume.ai/).

## FAQ

**What is Hume AI known for?**
Empathic voice AI. The company is the only production-grade vendor focused on emotional intelligence in voice interactions. EVI handles prosody-aware speech-to-speech; Expression Measurement scores 48 distinct emotions across audio, video, text, and images; Octave delivers emotional nuance in TTS.

**What is EVI and how does it differ from ChatGPT Voice or ElevenLabs Conversational?**
EVI (Empathic Voice Interface) is a speech-to-speech system with native support for interruptions, back-channeling, and prosody-aware responses. ChatGPT Voice and ElevenLabs Conversational focus on voice quality; EVI focuses on conversational feel. Developers route LLM-level reasoning through external models (Claude, GPT, Gemini) while Hume owns the audio layer.

**Is Hume AI free?**
Yes, the Free tier includes 5 minutes of EVI and 10,000 TTS characters per month. Sufficient for evaluation. Starter at $3/mo is the lowest paid tier for actual deployments.

**What is Octave?**
Octave is Hume's text-to-speech model with voice design, modulation, cloning, and conversion. Emotional range is the differentiator; it does not compete with ElevenLabs v3 on peak narration quality.

**What is Expression Measurement?**
An API for scoring emotion in audio, video, text, or images. Trained on curated datasets covering 48 distinct emotions. Used in UX research, wellness apps, accessibility tools, and market research. Pricing varies by modality: $0.0828/min for video+audio, down to $0.00024/word for text.

**Does Hume have an affiliate program?**
Not currently. Editorial coverage on aipedia.wiki is independent; there is no commission relationship as of April 2026.

**What is TADA?**
Hume's open-source LLM-TTS system that streams text and audio together, reducing hallucinations and latency. Useful as a research-friendly alternative to proprietary TTS architectures but not a drop-in EVI or Octave replacement.

**Can I clone my voice on Hume?**
Yes, voice cloning (create and use) is included on all tiers, including Free. This is unusual; most competitors gate cloning behind paid plans.

## Sources

- [Hume AI pricing](https://www.hume.ai/pricing): current plan prices, quotas, seats, usage rates
- [Hume AI homepage](https://www.hume.ai/): product descriptions for EVI, Octave, TADA, Expression Measurement
- [Hume developer platform](https://dev.hume.ai/): API reference, SDKs, model versioning

## Related

- **Category:** [AI Voice](/categories/ai-voice/)
- **Alternatives:** [ElevenLabs](/tools/elevenlabs/) · [Cartesia](/tools/cartesia/) · [Fish Audio](/tools/fish-audio/) · [Lovo](/tools/lovo/) · [Murf](/tools/murf/)
- **Use cases:** [Best AI for Voice Agents](/categories/ai-voice/)
