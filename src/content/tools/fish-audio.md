---
type: tool
slug: fish-audio
title: Fish Audio / OpenAudio S1 + S2
tagline: Open-source TTS that beats ElevenLabs on naturalness at a fraction of the price. S2 Pro is the expressive flagship; S1 remains the fast default.
category: ai-voice
company: fish-audio
url: https://fish.audio
github_url: https://github.com/fishaudio/fish-speech
pricing_model: freemium
price_range: "$0-$75/month"
status: active
launched: 2024-03
last_updated: 2026-05-13
last_verified: 2026-05-13
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
  moat: 7
  longevity: 8
facts:
  best_for:
    value: "Voice teams that want expressive text-to-speech, voice cloning, or speech generation without starting from a purely enterprise voice stack."
    source: "https://fish.audio"
    source_label: "Fish Audio official site"
    source_id: fish-audio-official
    verified_at: 2026-05-13
    volatility: medium
    confidence: high
  model_surface:
    value: "Fish Audio is useful when the evaluation is voice quality and expressive generation, not only transcript accuracy or call-center automation."
    source: "https://fish.audio"
    source_label: "Fish Audio official site"
    source_id: fish-audio-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: medium
  pricing_anchor:
    value: "Plus $11/mo for ~200 minutes, Pro $75/mo for ~27 hours, and Max $749/mo for ~104 hours. The Pro tier now bundles 1,620 minutes per month and the Max tier is the sustained-volume option."
    source: "https://fish.audio/plan/"
    source_label: "Fish Audio plan page"
    source_id: fish-audio-pricing
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: high
    confidence: high
  workflow_surface:
    value: "Best evaluated with your own scripts, languages, and target delivery channel because voice quality varies by speaker, emotion, and post-processing needs."
    source: "https://fish.audio"
    source_label: "Fish Audio official site"
    source_id: fish-audio-official
    verified_at: 2026-05-13
    volatility: medium
    confidence: medium
  watch_out_for:
    value: "Voice cloning and synthetic speech create consent, rights, and disclosure risk. Confirm licensing and speaker authorization before publishing generated voices."
    source: "https://fish.audio"
    source_label: "Fish Audio official site"
    source_id: fish-audio-official
    verified_at: 2026-05-13
    volatility: medium
    confidence: high
tags: [tts, text-to-speech, voice-ai, open-source, self-hosted, voice-cloning, openaudio, fish-speech, low-latency, multilingual]
seo_title: "Fish Audio (OpenAudio S1 + S2): Features, Pricing & Review (May 2026)"
meta_description: "Fish Audio ships OpenAudio S1 and the S2 Pro flagship, the top-ranked TTS in 2026 blind tests. Free self-hosting, Plus $11/mo, Pro $75/mo, Max $749/mo, API at $15 per 1M chars."
author: "aipedia.wiki Editorial"
best_for:
  - open-source TTS with self-hosting
  - expressive narration and character voices
  - multilingual output across 80+ languages
  - high-volume API workloads at low cost
not_best_for:
  - teams wanting a polished consumer UI
  - enterprise dubbing pipelines with lip-sync
  - workflows that need built-in deepfake detection
quick_answer: >-
  Fish Audio is the open-source TTS leader heading into Q2 2026. OpenAudio S2 Pro ranked first in blind preference testing against every major commercial provider, and S1 remains the fast default. Pick it for self-hosted voice agents or high-volume API workloads; skip for enterprise dubbing (use Resemble) or real-time voice agents where Cartesia's sub-100ms latency matters more than voice quality.
price_history:
  - date: 2026-03-01
    plan: "Plus"
    price: "$11/mo"
    source: "https://fish.audio"
    source_label: "Source"
    source_id: fish-audio-pricing
    note: "S2 cloud tiers restructured around minutes of generation"
  - date: 2026-04-15
    plan: "API"
    price: "$15/1M chars"
    source: "https://fish.audio"
    source_label: "Source"
    source_id: fish-audio-pricing
    note: "Verified unchanged"
  - date: 2026-05-13
    plan: "Pro"
    price: "$75/mo"
    source: "https://fish.audio/plan/"
    source_label: "Source"
    source_id: fish-audio-pricing
    note: "Verified Pro at $75/mo, 1,620 minutes (~27 hours). Max tier $749/mo confirmed at 6,250 minutes for sustained agency workloads."
---

# Fish Audio

Fish Audio ships two current models. **OpenAudio S1** is the fast default; **S2 Pro** is the expressive flagship trained on 10M+ hours across 80+ languages. Both are MIT-licensed for self-hosting and available via the Fish Audio cloud.

S2 Pro ranked first in Fish Audio's own 2026 blind-provider comparison. Artificial Analysis benchmarks agree: Fish Audio's family currently leads on aggregate TTS quality ELO.

## System Verdict

> **Pick Fish Audio if you need top-tier TTS quality without ElevenLabs pricing.** S2 Pro is the strongest open-weight model in 2026, and self-hosting on a consumer GPU eliminates recurring cost entirely. S1 covers the fast, low-latency default; S2 Pro covers expressive narration and character work.
>
> **Skip it if the workflow is enterprise dubbing with lip-sync (use [Resemble AI](/tools/resemble-ai/)), if sub-100ms streaming latency is the hard constraint (use [Cartesia](/tools/cartesia/)), or if a no-code consumer UI matters more than raw quality ([Speechify](/tools/speechify/) for reading, [ElevenLabs](/tools/elevenlabs/) for creator workflows).**
>
> **Who pays which tier:** Free for testing (7 minutes S2). Plus $11/mo for creators running ~200 minutes. Pro $75/mo for sustained 27-hour workloads. Max $749/mo for agency-scale 104-hour workloads. API at $15 per 1M characters for developers. Self-hosters pay only GPU cost.

## Key Facts

| | |
|---|---|
| **Flagship model** | OpenAudio S2 Pro (dual-autoregressive, RL-aligned) |
| **Fast model** | OpenAudio S1 |
| **Language coverage** | 80+ languages including English, Chinese, Japanese, Korean, Spanish, French, German, Arabic, Hindi |
| **License** | MIT for open weights; weights on GitHub and Hugging Face |
| **Self-hosting** | Consumer GPUs with 8GB+ VRAM |
| **Cloud free tier** | 7 minutes S2 generation, 8K credits/mo |
| **Cloud Plus** | $11/mo, ~200 minutes S2, 250K credits |
| **Cloud Pro** | $75/mo, ~1,620 minutes (27 hours) S2, 2M credits, 3 team seats |
| **Cloud Max** | $749/mo, ~6,250 minutes (104 hours) S2, 25M credits, 10 team seats |
| **API pricing** | ~$15 per 1M characters · ~600-625 credits per minute |
| **Blind-test rank (2026)** | S2 Pro #1, S1 above every third-party provider |

Every data point above was verified against vendor sources on 2026-05-13. See Sources.

## What it actually is

A single TTS stack served three ways. Weights on Hugging Face for self-hosters, a cloud platform at fish.audio for creators, and a REST API for developers.

S1 handles the default case: fast, low-latency, acceptable quality for most production voice work. S2 Pro handles expressive narration, multilingual output, and character voices where naturalness matters.

The moat is model quality plus license freedom. S2 Pro beats every commercial third-party provider in Fish Audio's 2026 blind tests, and MIT weights mean no vendor lock-in. Artificial Analysis tracks Fish Audio's family at the top of the current TTS ELO leaderboard.

## When to pick Fish Audio

- **You want the strongest open-weight TTS available in 2026.** S2 Pro tops Fish Audio's published blind-test rankings and Artificial Analysis' ELO board.
- **Self-hosting saves real money.** High-volume inference runs at zero marginal cost after GPU setup.
- **Multilingual coverage matters.** 80+ languages on S2 Pro beats Voxtral's 9 and matches ElevenLabs' breadth.
- **You need MIT-licensed weights.** Forkable, fine-tunable, no training-data restrictions on commercial use.
- **Expressive or character voices are the target.** S2 Pro handles emotion and accent better than Cartesia or Voxtral in preference tests.

## When to pick something else

- **Enterprise dubbing with lip-sync:** [Resemble AI](/tools/resemble-ai/) ships a full Localize pipeline and deepfake detection layer Fish Audio does not match.
- **Sub-100ms streaming voice agents:** [Cartesia](/tools/cartesia/) Sonic 3 hits 40-90ms time-to-first-audio; Fish Audio's cloud latency lands higher.
- **Cheapest commercial API:** [Voxtral](/tools/voxtral/) at $0.016 per 1K chars (~$16/1M) is slightly cheaper and bundles STT.
- **Polished consumer creator UI:** [ElevenLabs](/tools/elevenlabs/) still wins on voice library breadth and creator workflow polish.
- **Document-reading for personal use:** [Speechify](/tools/speechify/) solves the consumption case, not the production case.

## Pricing

| Plan | Price | Included | Notes |
|------|-------|----------|-------|
| Self-hosted | $0 | Unlimited | GPU with 8GB+ VRAM required |
| Free (cloud) | $0 | 7 min S2 / 8K credits | Testing only, non-commercial |
| Plus | $11/mo | ~200 min S2 / 250K credits | Best fit for most creators, 1 seat |
| Pro | $75/mo | ~27 hours S2 / 2M credits | Sustained production, 3 team seats |
| Max | $749/mo | ~104 hours S2 / 25M credits | Agency-scale, 10 team seats |
| API | $15 / 1M chars | Pay-as-you-go | ~600-625 credits per minute |

*Prices verified 2026-05-13 via [Fish Audio plan page](https://fish.audio/plan/) and the [Fish Audio 2026 blind-provider comparison](https://fish.audio/blog/blind-tts-provider-comparison-2026/).*

## Against the alternatives

| | Fish Audio S2 Pro | ElevenLabs v3 | Voxtral | Cartesia Sonic 3 |
|---|---|---|---|---|
| **Blind-test quality** | #1 in 2026 | Strong, second on aggregate | Wins vs ElevenLabs Flash v2.5 | Strong, tuned for real-time |
| **Time-to-first-audio** | Low, not sub-100ms | 200-400ms streaming | ~70ms multilingual | 40-90ms |
| **Open weights** | MIT | No | CC BY-NC 4.0 | No |
| **Languages** | 80+ | 30+ | 9 | 25+ |
| **Commercial API** | $15/1M chars | $30/1M chars | $16/1M chars | Credit-based |
| **Best viewed as** | Open-source quality leader | Creator platform default | Cheap multilingual API | Real-time agent specialist |

## Failure modes

- **Self-hosting requires ops.** GPU management, model updates, and inference tuning fall on the deployer. Teams without GPU operations experience should stick to the cloud or API.
- **Consumer UI trails ElevenLabs.** The fish.audio dashboard covers the basics. It is not a full creator studio.
- **Smaller voice library than ElevenLabs.** Stock voices are limited; voice cloning fills the gap but needs clean input audio.
- **Enterprise dubbing is not the product.** No lip-sync, no automatic translation pipeline, no deepfake detection layer. Resemble ships that stack instead.
- **Community tooling still catching up.** Third-party plugins and wrappers exist but are thinner than ElevenLabs' ecosystem.
- **Credit math on the cloud plans.** S1 and S2 consume credits at different rates. Heavy S2 users should price against the API or self-hosting before choosing Pro.

## Recent changes

- **2026-05-13:** Pricing reconfirmed live. Plus $11, Pro $75, Max $749. The Pro tier covers ~1,620 generation minutes (27 hours) per month with three team seats; the Max tier unlocks ~6,250 minutes (104 hours) and ten team seats for sustained agency or platform workloads. Credit math holds at roughly 600-625 credits per minute. Free tier remains 7 minutes plus 8K credits/mo, non-commercial.
- **2026-04-17:** S2 Pro confirmed as flagship in Artificial Analysis' aggregate TTS ELO leaderboard. API pricing unchanged at $15 per 1M characters.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity). Last verified 2026-05-13 against [Fish Audio plan page](https://fish.audio/plan/), [OpenAudio S2 page](https://fish.audio/s2/), [Fish Audio 2026 provider comparison](https://fish.audio/blog/blind-tts-provider-comparison-2026/), and [Artificial Analysis TTS leaderboard](https://artificialanalysis.ai/text-to-speech/model-families/fishaudio).

## FAQ

**Is Fish Audio free?**
Yes for self-hosting. OpenAudio S1 and S2 weights are MIT-licensed and run on consumer GPUs with 8GB+ VRAM. The cloud free tier gives 7 minutes of S2 generation for testing ([Fish Audio blog](https://fish.audio/blog/best-text-to-speech-tool-2026-ranking/)).

**What is the difference between S1 and S2?**
S1 is the fast default at low latency. S2 Pro is the expressive flagship trained on 10M+ hours across 80+ languages, and it ranked first in Fish Audio's 2026 blind-provider comparison ([S2 page](https://fish.audio/s2/)).

**How does Fish Audio compare to ElevenLabs?**
Fish Audio beats ElevenLabs on aggregate blind preference in 2026 Artificial Analysis benchmarks and the Fish Audio provider comparison. ElevenLabs still wins on creator-tool polish and voice library breadth.

**Can I self-host for commercial use?**
Yes. MIT licensing permits commercial use of open weights with no royalty or training-data restrictions ([GitHub](https://github.com/fishaudio/fish-speech)).

**Does Fish Audio support voice cloning?**
Yes. Both S1 and S2 support cloning from short reference samples. Quality improves with longer, cleaner reference audio.

## Sources

- [Fish Audio homepage](https://fish.audio): product positioning, current models
- [Fish Audio plan page](https://fish.audio/plan/): Free, Plus, Pro, Max tiers; credits and minutes per tier
- [OpenAudio S2 page](https://fish.audio/s2/): S2 Pro architecture and training data
- [Fish Audio 2026 blind-provider comparison](https://fish.audio/blog/blind-tts-provider-comparison-2026/): S2 Pro #1 ranking
- [Artificial Analysis: Fish Audio family](https://artificialanalysis.ai/text-to-speech/model-families/fishaudio): aggregate TTS ELO
- [Fish Speech GitHub](https://github.com/fishaudio/fish-speech): MIT weights, self-hosting instructions

## Related

- **Category:** [AI Voice / TTS](/categories/ai-voice/)
- **Comparisons:** [ElevenLabs vs Fish Audio](/compare/elevenlabs-vs-fish-audio/), [Cartesia vs Fish Audio](/compare/cartesia-vs-fish-audio/), [Fish Audio vs Voxtral](/compare/fish-audio-vs-voxtral/), [Fish Audio vs Resemble AI](/compare/fish-audio-vs-resemble-ai/)
