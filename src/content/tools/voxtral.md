---
type: tool
slug: voxtral
title: Voxtral
tagline: Mistral AI's open-weight TTS and STT model. 4B parameters, 9 languages, 70ms latency, $0.016 per 1K chars via API.
category: ai-voice
company: Mistral AI
url: https://mistral.ai/news/voxtral
pricing_model: freemium
price_range: "Free (open-weight, non-commercial) / $0.016/1K chars API"
status: active
launched: 2026-03
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
  moat: 6
  longevity: 8
facts:
  model_family:
    value: "Mistral Voxtral is an open audio model family for speech understanding and transcription workflows, positioned through Mistral docs and launch material."
    source: "https://mistral.ai/news/voxtral"
    source_label: "Mistral Voxtral launch"
    source_id: voxtral-pricing
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: high
    confidence: high
  api_available:
    value: "Yes — Mistral docs document speech-to-text/audio APIs for the hosted developer workflow."
    source: "https://docs.mistral.ai/studio-api/audio/speech_to_text"
    source_label: "Mistral audio docs"
    source_id: voxtral-docs
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: high
    confidence: high
  pricing_anchor:
    value: "Hosted audio pricing should be checked against current Mistral/La Plateforme model pricing before production rollout."
    source: "https://docs.mistral.ai/models/overview"
    source_label: "Mistral model overview"
    source_id: mistral-models-docs
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: high
    confidence: medium
  best_for:
    value: "Teams evaluating open-weight or Mistral-native speech transcription and audio-understanding pipelines rather than polished creator voiceover tools."
    source: "https://docs.mistral.ai/studio-api/audio/speech_to_text"
    source_label: "Mistral audio docs"
    source_id: voxtral-docs
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: high
    confidence: high
  watch_out_for:
    value: "Separate Voxtral from full voice platforms: it is a speech/audio model surface, not an end-to-end dubbing, voice cloning, or call-center suite."
    source: "https://mistral.ai/news/voxtral"
    source_label: "Mistral Voxtral launch"
    source_id: voxtral-pricing
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: high
    confidence: high
tags: [text-to-speech, tts, stt, speech-to-text, open-weight, api, voice-generation, mistral, multilingual]
seo_title: "Voxtral (Mistral AI): Features, Pricing & Review (April 2026)"
meta_description: "Voxtral is Mistral AI's 4B open-weight TTS + STT model launched March 26, 2026. 9 languages, 70ms latency, $0.016/1K chars via API. Weights CC BY-NC 4.0 on Hugging Face."
author: "aipedia.wiki Editorial"
best_for:
  - developers building voice agents at scale
  - teams already using Mistral text models
  - multilingual voice cloning from 3-second references
  - non-commercial research and self-hosting
not_best_for:
  - commercial deployments relying on open weights (CC BY-NC blocks this)
  - languages outside the supported nine
  - creator workflows needing a polished UI
  - expressive long-form narration where Fish Audio or ElevenLabs rank higher on quality
quick_answer: >-
  Voxtral is Mistral AI's first TTS model, released March 26, 2026. It wins 68.4% of head-to-head preference tests against ElevenLabs Flash v2.5 across 9 languages at 70ms latency. Pick it for scale API voice agents and Mistral-stack integration; skip for commercial self-hosting (CC BY-NC blocks that) or any language outside the supported nine.
price_history:
  - date: 2026-03-26
    plan: "API launch"
    price: "$0.016/1K chars"
    source: "https://mistral.ai/news/voxtral"
    source_label: "Source"
    source_id: voxtral-pricing
    note: "Voxtral TTS shipped alongside open weights on Hugging Face"
  - date: 2026-04-15
    plan: "API"
    price: "$0.016/1K chars"
    source: "https://mistral.ai/news/voxtral"
    source_label: "Source"
    source_id: voxtral-pricing
    note: "Verified unchanged"
---

# Voxtral

Mistral AI's first voice model. Voxtral launched March 26, 2026 as a 4.1-billion-parameter open-weight system covering both text-to-speech and speech-to-text in a unified architecture.

The commercial API prices at $0.016 per 1,000 characters. Open weights ship on Hugging Face under CC BY-NC 4.0, which permits research and non-commercial use only.

## System Verdict

> **Pick Voxtral if you are already on the Mistral stack and need cheap, fast multilingual TTS via API.** The 68.4% win rate against ElevenLabs Flash v2.5 in Mistral's own benchmarks puts quality above the "cheap TTS" tier. Voice cloning works from 3-second references, and 70ms latency keeps it viable for voice agents.
>
> **Skip it if commercial self-hosting is the goal (CC BY-NC license blocks that), if you need languages outside the supported nine, or if top-tier quality matters more than cost ([Fish Audio](/tools/fish-audio/) S2 Pro ranks higher on blind tests with MIT weights).**
>
> **Who pays which tier:** Free tier on La Plateforme for testing. API at $0.016/1K chars for developers at scale. Hugging Face weights for research teams and non-commercial deployments only. Commercial self-hosters should pick [Fish Audio](/tools/fish-audio/) or negotiate a Mistral enterprise license.

## Key Facts

| | |
|---|---|
| **Model** | Voxtral TTS (4.1B parameters, released March 26, 2026) |
| **Capabilities** | Text-to-speech and speech-to-text in one model |
| **Languages** | 9: English, French, German, Spanish, Dutch, Portuguese, Italian, Hindi, Arabic |
| **Latency** | ~70ms multilingual |
| **Voice cloning** | 3-second reference audio |
| **Max output** | 2 minutes per generation call |
| **Output formats** | MP3, WAV, PCM, FLAC, Opus |
| **Open-weight license** | CC BY-NC 4.0 (non-commercial) on Hugging Face |
| **API pricing** | $0.016 per 1,000 characters ($16 per 1M) |
| **Win rate vs ElevenLabs Flash v2.5** | 68.4% in Mistral's human preference tests |

Every data point above was verified against vendor sources on 2026-04-17. See Sources.

## What it actually is

A single voice model from Mistral AI covering both TTS and STT, released as part of the broader La Plateforme stack that already carries Mistral's text models. Developers use one account, one API key, and one invoice.

Voice cloning takes a 3-second reference and reproduces voice timbre, accent, and inflection. The 9-language list covers Western European markets plus Hindi and Arabic, which is narrower than ElevenLabs or Fish Audio but deeper than most STT-only competitors.

The real differentiator is pricing and Mistral-stack consolidation. At $0.016 per 1K chars, Voxtral is among the cheapest major-provider commercial APIs in 2026. The CC BY-NC license on open weights limits commercial self-hosting, so Voxtral's commercial play runs through the Mistral API.

## When to pick Voxtral

- **You already use Mistral for text generation.** One vendor, one billing line, one SDK covers text plus voice.
- **Cost at scale drives unit economics.** $0.016 per 1K chars undercuts most commercial alternatives.
- **You need multilingual voice cloning from short references.** 3-second samples are enough to clone across all 9 supported languages.
- **70ms latency supports conversational AI.** Fast enough for voice agents and real-time applications.
- **Research or non-commercial self-hosting.** CC BY-NC weights on Hugging Face enable local inference for academic or personal projects.

## When to pick something else

- **Commercial self-hosting:** [Fish Audio](/tools/fish-audio/) ships MIT weights with no commercial restriction. Voxtral's CC BY-NC license blocks commercial use of open weights.
- **Top-tier TTS quality:** [Fish Audio](/tools/fish-audio/) S2 Pro ranks first in 2026 blind preference tests. [ElevenLabs](/tools/elevenlabs/) retains the strongest creator workflow.
- **Sub-100ms streaming for voice agents:** [Cartesia](/tools/cartesia/) Sonic 3 lands at 40-90ms time-to-first-audio, faster than Voxtral's 70ms.
- **Enterprise voice cloning with compliance:** [Resemble AI](/tools/resemble-ai/) bundles watermarking, deepfake detection, and on-premise deployment.
- **Languages outside the supported nine:** Fish Audio covers 80+. [ElevenLabs](/tools/elevenlabs/) covers 30+.

## Pricing

| Access | Cost | Notes |
|--------|------|-------|
| Open-weight (Hugging Face) | Free | CC BY-NC 4.0, non-commercial only |
| La Plateforme free tier | Free | Testing and evaluation |
| Mistral API (TTS) | $0.016/1K chars ($16/1M) | Commercial production use |
| Mistral API (STT) | ~$0.002/minute | Competitive with Whisper API |

*Prices verified 2026-04-17 via [Mistral Voxtral announcement](https://mistral.ai/news/voxtral-tts) and [VentureBeat coverage](https://venturebeat.com/orchestration/mistral-ai-just-released-a-text-to-speech-model-it-says-beats-elevenlabs-and). ElevenLabs API pricing cited at $0.030/1K chars for comparison.*

## Against the alternatives

| | Voxtral | ElevenLabs v3 | Fish Audio S2 Pro | Cartesia Sonic 3 |
|---|---|---|---|---|
| **API price per 1M chars** | $16 | ~$30 | $15 | Credit-based |
| **Latency** | ~70ms | 200-400ms streaming | Low, not sub-100ms | 40-90ms |
| **Languages** | 9 | 30+ | 80+ | 25+ |
| **Voice cloning reference** | 3 sec | Varies, best at 1-5 min | Short samples work | 10+ sec |
| **Open weights** | CC BY-NC 4.0 | None | MIT | None |
| **Blind-test quality** | Beats ElevenLabs Flash v2.5 | Strong | #1 in 2026 | Tuned for real-time |
| **Best viewed as** | Mistral-stack voice default | Creator platform | Quality + open-weight leader | Real-time agent specialist |

## Failure modes

- **CC BY-NC 4.0 license blocks commercial self-hosting.** The open weights are for research and non-commercial use only. Commercial deployments must use the Mistral API or negotiate a custom license.
- **9 languages is narrow.** Japanese, Korean, Chinese, and most African and Southeast Asian languages are not supported as of April 2026.
- **Benchmarks are vendor-published.** The 68.4% win rate against ElevenLabs Flash v2.5 comes from Mistral's own evaluation. Independent third-party blind tests are still limited.
- **Recent launch, thin ecosystem.** Released March 26, 2026. Community tooling, wrappers, and integrations lag ElevenLabs and Fish Audio.
- **No consumer UI.** API-only product. Creators needing a polished studio should pick ElevenLabs or Speechify Studio.
- **2-minute generation cap per call.** Longer outputs require chunking and stitching.
- **Tested against Flash v2.5, not ElevenLabs v3.** Quality comparison is against ElevenLabs' faster model tier, not the flagship.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity). Last verified 2026-04-17 against [Mistral Voxtral announcement](https://mistral.ai/news/voxtral), [Voxtral TTS announcement](https://mistral.ai/news/voxtral-tts), [Mistral docs](https://docs.mistral.ai/models/voxtral-tts-26-03), and [VentureBeat launch coverage](https://venturebeat.com/orchestration/mistral-ai-just-released-a-text-to-speech-model-it-says-beats-elevenlabs-and).

## FAQ

**Is Voxtral free?**
Partially. Open weights on Hugging Face are free for non-commercial use under CC BY-NC 4.0. The Mistral API has a free tier for testing, then charges $0.016 per 1,000 characters for production use ([Mistral announcement](https://mistral.ai/news/voxtral-tts)).

**Can I use Voxtral commercially by self-hosting the open weights?**
No. The CC BY-NC 4.0 license blocks commercial use of the open weights. Commercial production must run through the Mistral API at $0.016 per 1,000 characters, or via a negotiated enterprise license.

**What languages does Voxtral support?**
Nine: English, French, German, Spanish, Dutch, Portuguese, Italian, Hindi, and Arabic. Coverage is narrower than [Fish Audio](/tools/fish-audio/) (80+) or [ElevenLabs](/tools/elevenlabs/) (30+).

**How does Voxtral compare to ElevenLabs?**
Mistral's published human preference tests show Voxtral winning 68.4% of head-to-head comparisons against ElevenLabs Flash v2.5. Independent blind tests from Fish Audio and Artificial Analysis rank [Fish Audio](/tools/fish-audio/) S2 Pro higher on aggregate quality. Voxtral wins on price at scale.

**Does Voxtral handle speech-to-text?**
Yes. Voxtral is a unified TTS + STT model. STT pricing runs around $0.002 per minute via the Mistral API.

## Sources

- [Mistral Voxtral announcement](https://mistral.ai/news/voxtral): model overview and capabilities
- [Voxtral TTS launch post](https://mistral.ai/news/voxtral-tts): March 26, 2026 release and benchmarks
- [Mistral docs: Voxtral TTS](https://docs.mistral.ai/models/voxtral-tts-26-03): API spec, output formats, pricing
- [VentureBeat: Mistral released TTS that beats ElevenLabs](https://venturebeat.com/orchestration/mistral-ai-just-released-a-text-to-speech-model-it-says-beats-elevenlabs-and): launch analysis
- [DataCamp Voxtral TTS guide](https://www.datacamp.com/blog/voxtral-tts): practical implementation examples

## Related

- **Category:** [AI Voice / TTS](/categories/ai-voice/)
- **Comparisons:** [ElevenLabs vs Voxtral](/compare/elevenlabs-vs-voxtral/), [Cartesia vs Voxtral](/compare/cartesia-vs-voxtral/), [Fish Audio vs Voxtral](/compare/fish-audio-vs-voxtral/), [Resemble AI vs Voxtral](/compare/resemble-ai-vs-voxtral/)
