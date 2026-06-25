---
type: tool
slug: voxtral
title: Voxtral
tagline: Mistral AI's open audio family for TTS, transcription, and realtime speech understanding. Voxtral TTS v26.03 lists at $0.016 per 1k characters, while Voxtral Mini Transcribe 2 and Realtime cover STT.
category: ai-voice
company: Mistral AI
url: https://mistral.ai/news/voxtral-tts
pricing_model: freemium
price_range: "Open weights for eligible use; hosted TTS $0.016/1k chars; Transcribe 2 from $0.002/min"
status: active
launched: 2025-07
last_updated: 2026-06-24
last_verified: 2026-06-24
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 9
  moat: 7
  longevity: 8
facts:
  model_family:
    value: "Voxtral is now Mistral AI's broader audio family: Voxtral TTS v26.03 for speech generation, Voxtral Mini Transcribe 2 for batch transcription, and Voxtral Realtime for live speech-to-text/audio understanding."
    source: "https://docs.mistral.ai/models/voxtral-tts-26-03"
    source_label: "Voxtral TTS model card"
    source_id: voxtral-tts-docs
    verified_at: 2026-06-24
    next_review_at: 2026-07-05
    volatility: high
    confidence: high
  api_available:
    value: "Yes. Mistral exposes hosted Voxtral TTS and transcription APIs through La Plateforme; Voxtral Mini Transcribe 2 and Voxtral Realtime are documented in the speech-to-text API docs."
    source: "https://docs.mistral.ai/studio-api/audio/speech_to_text"
    source_label: "Mistral speech-to-text docs"
    source_id: voxtral-docs
    verified_at: 2026-06-24
    next_review_at: 2026-07-05
    volatility: high
    confidence: high
  pricing_anchor:
    value: "Mistral pricing lists Voxtral TTS v26.03 at $0.016 per 1k characters and Voxtral Mini Transcribe 2 from $0.002 per minute; check Mistral pricing before production rollout because audio model pricing is volatile."
    source: "https://mistral.ai/pricing"
    source_label: "Mistral pricing"
    source_id: mistral-pricing
    verified_at: 2026-06-24
    next_review_at: 2026-07-05
    volatility: high
    confidence: high
  best_for:
    value: "Teams already using Mistral that want speech generation, transcription, realtime audio understanding, lower hosted TTS unit pricing, or open-model experimentation in the same ecosystem."
    source: "https://mistral.ai/news/voxtral-tts"
    source_label: "Mistral Voxtral TTS announcement"
    source_id: voxtral-tts-launch
    verified_at: 2026-06-24
    next_review_at: 2026-07-05
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Voxtral TTS open weights are published under CC BY-NC 4.0, so commercial teams should use the hosted API or confirm license terms. It is not a polished creator studio, and production voice-agent buyers should benchmark latency against Cartesia, ElevenLabs, and Deepgram on real traffic."
    source: "https://mistral.ai/news/voxtral-tts"
    source_label: "Mistral Voxtral TTS announcement"
    source_id: voxtral-tts-launch
    verified_at: 2026-06-24
    next_review_at: 2026-07-05
    volatility: high
    confidence: high
tags: [text-to-speech, speech-to-text, stt, tts, audio-understanding, open-weight, api, mistral, multilingual, voice-agent, realtime]
seo_title: "Voxtral (Mistral AI): Features, Pricing & Review (June 2026)"
meta_description: "Voxtral is Mistral AI's audio family for TTS and transcription. June 2026 check: Voxtral TTS v26.03 at $0.016/1k chars, Mini Transcribe 2 from $0.002/min, Realtime for live STT."
author: "aipedia.wiki Editorial"
best_for:
  - teams already building on Mistral AI and La Plateforme
  - developers who need both TTS and speech-to-text in one model ecosystem
  - hosted TTS experiments where $0.016 per 1k characters is attractive
  - transcription and realtime speech understanding workloads
  - researchers testing open audio models before commercial deployment
not_best_for:
  - creators who want a polished voiceover studio
  - teams that need commercial use of non-commercial open weights without using the hosted API
  - enterprise dubbing pipelines with lip-sync, review, watermarking, and approval workflows
  - voice-agent teams that have not benchmarked realtime latency end to end
quick_answer: >-
  Voxtral is no longer an STT-only buyer note. Mistral's current audio lineup includes Voxtral TTS v26.03 for speech generation, Voxtral Mini Transcribe 2 for batch STT, and Voxtral Realtime for live transcription/audio understanding. Pick it when you want a Mistral-native audio stack, low published hosted TTS pricing, or open-model experimentation. Skip it for a creator-first studio like ElevenLabs, a managed low-latency agent stack like Cartesia, or governed enterprise dubbing like Resemble AI.
price_history:
  - date: 2026-06-24
    plan: "Voxtral TTS / Mini Transcribe 2"
    price: "$0.016/1k chars; from $0.002/min"
    source: "https://mistral.ai/news/voxtral-tts"
    source_label: "Mistral Voxtral TTS announcement"
    source_id: voxtral-tts-launch
    verified_at: 2026-06-24
    note: "Official Mistral TTS announcement still lists Voxtral TTS at $0.016 per 1k characters and open weights under CC BY-NC 4.0; speech-to-text docs still list Voxtral Mini Transcribe 2 and Voxtral Realtime as the STT paths."
  - date: 2025-07-15
    plan: "Voxtral STT launch"
    price: "From about $0.001/min"
    source: "https://mistral.ai/news/voxtral"
    source_label: "Mistral Voxtral launch"
    source_id: voxtral-pricing
    verified_at: 2026-06-12
    note: "Original Voxtral launch positioned the family as open-weight speech understanding with hosted transcription pricing materially below Whisper and ElevenLabs Scribe."
  - date: 2026-05-13
    plan: "Mini Transcribe V2 / Realtime"
    price: "From about $0.001/min"
    source: "https://docs.mistral.ai/studio-api/audio/speech_to_text"
    source_label: "Mistral speech-to-text docs"
    source_id: voxtral-docs
    verified_at: 2026-06-12
    note: "Production STT lineup documented as Voxtral Mini Transcribe V2 for batch and Voxtral Realtime for live transcription."
  - date: 2026-06-03
    plan: "Voxtral TTS v26.03"
    price: "$0.016 per 1k characters"
    source: "https://mistral.ai/pricing"
    source_label: "Mistral pricing"
    source_id: mistral-pricing
    verified_at: 2026-06-12
    note: "Mistral pricing now lists Voxtral TTS v26.03 as an audio generation model with $0 input and $16/M output characters, equivalent to $0.016 per 1k characters."
  - date: 2026-06-03
    plan: "Voxtral Mini Transcribe 2"
    price: "From $0.002/min"
    source: "https://mistral.ai/pricing"
    source_label: "Mistral pricing"
    source_id: mistral-pricing
    verified_at: 2026-06-12
    note: "Mistral pricing lists Mini Transcribe 2 as the current transcription price anchor; verify before production because audio prices can move quickly."
  - date: 2026-06-05
    plan: "Voxtral TTS / Mini Transcribe 2"
    price: "$0.016/1k chars; from $0.002/min"
    source: "https://mistral.ai/pricing"
    source_label: "Mistral pricing"
    source_id: mistral-pricing
    verified_at: 2026-06-12
    note: "Comparison refresh rechecked Voxtral against Descript and removed stale/fake creator-app claims. Voxtral remains a Mistral audio model family, not a Descript-style editor."
---

# Voxtral

Voxtral is Mistral AI's audio family. It now spans **text-to-speech**, **speech-to-text**, and **audio understanding** inside the Mistral ecosystem.

The June 2026 correction is important: older AiPedia copy treated Voxtral as STT-only. That was accurate for the original July 2025 launch and the May 2026 Transcribe/Realtime docs, but it is no longer enough. Mistral now publishes **Voxtral TTS v26.03** as a text-to-speech model, alongside **Voxtral Mini Transcribe 2** and **Voxtral Realtime** for transcription and live audio understanding.

## System Verdict

> **Pick Voxtral if you already build on Mistral and want audio in the same stack.** The hosted API now covers speech generation and transcription, while the open-model posture makes Voxtral more interesting for experimentation than closed voice platforms.
>
> **Skip it if you want the easiest creator workflow.** [ElevenLabs](/tools/elevenlabs/) is still the safer default for polished narration, cloning, dubbing, and non-developer voice work. [Cartesia](/tools/cartesia/) remains cleaner for managed, low-latency voice agents. [Resemble AI](/tools/resemble-ai/) is stronger when localization, watermarking, approval workflow, and deepfake detection are procurement requirements.
>
> **Who pays which path:** Use La Plateforme/API for commercial hosted production. Use open weights for research and eligible experimentation after reviewing the license. Mistral pricing lists Voxtral TTS v26.03 at $0.016 per 1k characters and Mini Transcribe 2 from $0.002/min, but production buyers should re-check the pricing page before rollout.

## Key Facts

| | |
|---|---|
| **Family** | Voxtral by Mistral AI |
| **TTS model** | Voxtral TTS v26.03 |
| **STT models** | Voxtral Mini Transcribe 2 and Voxtral Realtime |
| **TTS pricing anchor** | $0.016 per 1k characters on Mistral pricing |
| **Transcription pricing anchor** | Mini Transcribe 2 from $0.002/min on Mistral pricing |
| **Open TTS weights** | Announced under CC BY-NC 4.0 |
| **Realtime STT** | Voxtral Realtime for live transcription/audio understanding |
| **Hosted path** | La Plateforme API |
| **Best fit** | Mistral-native speech generation, transcription, and audio understanding |
| **Not a full creator studio** | No ElevenLabs-style voice library, Studio workflow, or dubbing UI |

Every data point above was verified against vendor sources on 2026-06-24. See Sources.

## What It Actually Is

Voxtral is an audio model family, not a consumer voiceover app. The hosted API is the practical commercial path for most teams. The open-weight angle is the strategic draw for researchers, local testers, and teams that need to evaluate model behavior more deeply before committing.

Voxtral TTS v26.03 turns text into speech. Mistral's model card positions it as a text-to-speech model and the pricing page lists the hosted rate at $16 per million output characters. Voxtral Mini Transcribe 2 and Voxtral Realtime turn audio into text and structured understanding, covering the input side of a voice-agent loop.

The stronger buyer case is ecosystem consolidation: one Mistral account, one model provider, one API surface for text models plus audio generation and transcription.

## When To Pick Voxtral

- **You already use Mistral.** It keeps text, TTS, STT, and audio understanding closer to the same provider and billing system.
- **Hosted TTS unit price matters.** $0.016 per 1k characters is a strong published rate for API-based TTS experiments.
- **You need STT and TTS together.** Voxtral covers both sides of the voice loop, though production teams should still benchmark a dedicated TTS or STT vendor.
- **You want open-model experimentation.** Voxtral's open weights are useful for research, evaluation, and architecture exploration.
- **You are building audio understanding.** Transcribe 2 and Realtime are a better fit than creator TTS tools when the primary job is understanding incoming speech.

## When To Pick Something Else

- **Creator narration and voice cloning:** [ElevenLabs](/tools/elevenlabs/) is still the cleaner default for voice library, cloning, dubbing, Studio, and commercial creator workflow.
- **Managed low-latency agents:** [Cartesia](/tools/cartesia/) has the stronger voice-agent product surface with Sonic, Ink-Whisper, and Line.
- **Open-weight expressive TTS:** [Fish Audio](/tools/fish-audio/) remains a better first test when the question is self-hosted expressive speech quality.
- **Enterprise voice governance:** [Resemble AI](/tools/resemble-ai/) adds watermarking, deepfake detection, localization, deployment options, and approval workflow.
- **Meeting transcription app:** Otter, Fireflies, Fathom, and MeetGeek are user-facing meeting products; Voxtral is an API/model family.

## Pricing

| Access | Cost | Notes |
|---|---|---|
| Voxtral TTS v26.03 API | $0.016 per 1k characters | Mistral pricing lists $0 input and $16/M output characters |
| Voxtral Mini Transcribe 2 API | From $0.002/min | Current transcription anchor on Mistral pricing |
| Voxtral Realtime | Check current Mistral pricing/docs | Live transcription/audio understanding path |
| Open TTS weights | Free for eligible use | Mistral announcement says CC BY-NC 4.0; commercial teams need hosted API or license review |
| Enterprise | Custom | Use Mistral procurement for volume, private deployment, or commercial-license questions |

*Prices verified 2026-06-24 via [Mistral pricing](https://mistral.ai/pricing), [Voxtral TTS model card](https://docs.mistral.ai/models/voxtral-tts-26-03), [Mistral Voxtral TTS announcement](https://mistral.ai/news/voxtral-tts), and [Mistral speech-to-text docs](https://docs.mistral.ai/studio-api/audio/speech_to_text).*

## Against The Alternatives

| | Voxtral | Cartesia | ElevenLabs | Fish Audio |
|---|---|---|---|---|
| **Best viewed as** | Mistral audio model family | Managed voice-agent stack | Creator and platform voice suite | Open-weight expressive TTS |
| **TTS** | Yes, Voxtral TTS v26.03 | Yes, Sonic | Yes, Eleven v3/Flash | Yes, OpenAudio S1/S2 Pro |
| **STT** | Yes, Transcribe 2/Realtime | Yes, Ink-Whisper | Yes, Scribe | Yes, transcribe-1 |
| **Open weights** | Yes, with license caveats | No | No | Yes, MIT |
| **Creator UI** | Limited | Limited | Strong | Basic |
| **Voice-agent posture** | Useful input/output model stack | Strongest managed agent path | Broad platform with agents | Model/deployment path |
| **Best buyer** | Mistral-stack developers | Agent builders | Creators and audio teams | Open/self-host teams |

## Failure Modes

- **License mismatch risk.** Voxtral TTS open weights are CC BY-NC 4.0. Commercial buyers should use the hosted API or secure the right license instead of assuming open equals production-safe.
- **Not a creator studio.** There is no ElevenLabs-style creator workflow, large voice library, Studio surface, or polished dubbing pipeline.
- **Realtime still needs testing.** Do not assume a model card or vendor claim means the full phone path is fast enough. Test mic input, STT, LLM, TTS, telephony, and fallback latency together.
- **Language and voice quality vary.** Evaluate your own scripts, languages, accents, reference voices, and target device speakers.
- **Young product surface.** Community wrappers, benchmarks, and production playbooks are thinner than Whisper, Deepgram, ElevenLabs, or Cartesia.
- **Pricing can move.** Audio pricing is volatile. Re-check Mistral pricing before committing budget or publishing public claims.

## Recent Changes

- **2026-06-05:** Descript comparison refresh removed stale/fake claims from the comparison context and reconfirmed Voxtral as Mistral's audio model family for TTS, Mini Transcribe 2, and Realtime rather than a creator editing app.
- **2026-06-03:** Page corrected from the older STT-only framing. Voxtral now covers TTS via Voxtral TTS v26.03 as well as STT via Voxtral Mini Transcribe 2 and Realtime.
- **2026-06-03:** Mistral pricing check added hosted TTS at $0.016 per 1k characters and Mini Transcribe 2 from $0.002/min.
- **2026-05-13:** AiPedia previously corrected Voxtral away from a fake TTS-vs-TTS framing and toward STT-only. That correction is now superseded by Mistral's newer Voxtral TTS release.
- **2025-07-15:** Original Voxtral launch positioned the family around speech understanding, transcription, and open weights.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-06-24 against [Mistral pricing](https://mistral.ai/pricing), [Voxtral TTS model card](https://docs.mistral.ai/models/voxtral-tts-26-03), [Mistral Voxtral TTS announcement](https://mistral.ai/news/voxtral-tts), [Mistral speech-to-text docs](https://docs.mistral.ai/studio-api/audio/speech_to_text), and [Mistral changelog](https://docs.mistral.ai/resources/changelogs).

## FAQ

**Does Voxtral do text-to-speech now?**
Yes. Mistral now publishes Voxtral TTS v26.03 as a text-to-speech model. Older pages that described Voxtral as STT-only are stale.

**Is Voxtral free?**
There are open weights for eligible use, but license terms matter. Voxtral TTS open weights are announced under CC BY-NC 4.0, so commercial teams should use the hosted API or confirm licensing. Hosted API use is paid.

**How much does Voxtral TTS cost?**
Mistral pricing lists Voxtral TTS v26.03 at $16 per million output characters, equivalent to $0.016 per 1k characters, verified 2026-06-24.

**Does Voxtral handle transcription?**
Yes. Voxtral Mini Transcribe 2 handles batch transcription and Voxtral Realtime handles live transcription/audio understanding.

**How does Voxtral compare to Cartesia?**
Cartesia is stronger for managed, low-latency production voice agents. Voxtral is stronger when the team wants Mistral-native TTS/STT, lower hosted TTS unit pricing, and open-model experimentation.

## Sources

- [Mistral pricing](https://mistral.ai/pricing): Voxtral TTS and Mini Transcribe 2 pricing anchors
- [Voxtral TTS model card](https://docs.mistral.ai/models/voxtral-tts-26-03): model identifier, TTS positioning, hosted model details
- [Mistral Voxtral TTS announcement](https://mistral.ai/news/voxtral-tts): open weights and release context
- [Mistral speech-to-text docs](https://docs.mistral.ai/studio-api/audio/speech_to_text): Voxtral Mini Transcribe 2 and Realtime STT API docs
- [Mistral model overview](https://docs.mistral.ai/models/overview): current model lineup
- [Original Voxtral launch](https://mistral.ai/news/voxtral): original speech-understanding launch context

## Related

- **Category:** [AI Voice / Speech](/categories/ai-voice/)
- **Comparisons:** [Fish Audio vs Voxtral](/compare/fish-audio-vs-voxtral/)
