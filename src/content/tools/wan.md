---
type: tool
slug: wan
title: Wan
tagline: Alibaba Tongyi Lab's video generation family. Wan 2.7 is the proprietary flagship; Wan 2.2 remains Apache 2.0 open-weights.
category: ai-video
company: alibaba
url: https://wan.video
pricing_model: freemium
price_range: "$0-$0.15/second"
status: active
launched: 2025-02
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 9
  moat: 8
  longevity: 9
tags: [ai-video, video-generation, text-to-video, image-to-video, alibaba, wan, tongyi, open-weights]
seo_title: "Wan: Features, Pricing & Review (April 2026)"
meta_description: "Wan 2.7 (April 6, 2026) is Alibaba Tongyi Lab's proprietary flagship video model with Thinking Mode. Wan 2.2 stays open-weights Apache 2.0. Clips 2-15s at 1080p, $0.10/second on fal.ai."
author: "aipedia.wiki Editorial"
best_for:
  - open-weights self-hosting with Wan 2.2
  - audio-visual synchronized video on Wan 2.5 and up
  - long-prompt rendering with Thinking Mode on Wan 2.7
  - Chinese and multi-language output
not_best_for:
  - clips longer than 15 seconds in one pass
  - Western-only data residency requirements
  - guaranteed public API SLAs
quick_answer: >-
  Wan is the rare video family that ships both an open-weights track (Wan 2.2, Apache 2.0) and a proprietary frontier track (Wan 2.7, April 6, 2026). Pricing on fal.ai runs $0.10 per second. Pick it for self-hosting or audio-visual sync. Skip it for clips over 15 seconds or strict Western-data-only workloads.
price_history:
  - date: 2025-07-28
    plan: "Wan 2.2 open-weights"
    price: "$0/self-host"
    note: "Apache 2.0 weights on HuggingFace and ModelScope"
  - date: 2026-04-06
    plan: "Wan 2.7 API"
    price: "$0.10/second"
    note: "fal.ai launch pricing, unified across 720p and 1080p"
---

# Wan

Alibaba Tongyi Lab's video generation family. **Wan 2.7** (released April 6, 2026) is the proprietary flagship with Thinking Mode prompt reasoning, hyper-realistic character consistency, and long-text rendering across 12 languages.

**Wan 2.2** (July 28, 2025) remains the last Apache 2.0 open-weights generation, with T2V-A14B, I2V-A14B, TI2V-5B, S2V-14B, and Animate-14B checkpoints on HuggingFace and ModelScope. Wan 2.5, 2.6, and 2.7 ship API-only.

## System Verdict

> **Pick Wan if you want the only serious video family that still ships open weights, or if Thinking Mode on Wan 2.7 matches your prompt style.** Wan 2.2 lets you self-host T2V, I2V, and speech-to-video on consumer GPUs with the 5B TI2V checkpoint. Wan 2.7 on fal.ai is $0.10 per second at 720p or 1080p, cheaper than [Kling](/tools/kling/) credits at equivalent quality.
>
> **Skip it if you need clips longer than 15 seconds in one pass, Western-only data residency, or published SLAs.** Single-pass output caps at 15 seconds. Hosted Wan 2.7 runs through Alibaba Cloud Model Studio or third-party inference providers (fal.ai, Replicate, Together AI, WaveSpeed). Enterprises bound by US-only data rules need legal review.
>
> **Who uses which version:** self-hosted Wan 2.2 for researchers and teams with GPU budget, Wan 2.5 Preview for audio-visual sync pilots, Wan 2.6 for budget production work at $0.10/second 720p, Wan 2.7 for frontier Thinking-Mode prompts and long-text rendering.

## Key Facts

| | |
|---|---|
| **Proprietary flagship** | Wan 2.7 (released April 6, 2026, Alibaba Tongyi Lab) |
| **Open-weights release** | Wan 2.2 (Apache 2.0, July 28, 2025) · T2V-A14B, I2V-A14B, TI2V-5B, S2V-14B, Animate-14B |
| **Thinking Mode** | Wan 2.7 only · plans composition before generation |
| **Audio-visual sync** | Introduced in Wan 2.5 Preview · HD 1080P, 24fps, matched voice / SFX / music |
| **Clip length** | 2 to 15 seconds per generation |
| **Output resolutions** | 480P · 720P · 1080P (model-dependent) |
| **Access** | wan.video · Qwen Chat · Alibaba Cloud Model Studio · HuggingFace · ModelScope · fal.ai · Replicate · Together AI · WaveSpeed |
| **fal.ai pricing** | Wan 2.7: $0.10/s · Wan 2.6: $0.10/s 720p, $0.15/s 1080p · Flash variants from $0.05/s |
| **Company** | Alibaba Tongyi Lab (Hangzhou, part of Alibaba Group) |

Every data point above was verified against vendor documentation on 2026-04-17. See Sources.

## What it actually is

A two-track video model family. The open-weights track ships under Apache 2.0 through HuggingFace and ModelScope, capped at Wan 2.2. The proprietary track runs Wan 2.5 Preview, Wan 2.6, and Wan 2.7 through Alibaba Cloud Model Studio and third-party inference providers.

Wan 2.5 Preview introduced the first audio-visual synchronized video generation in the family. Output ships at 1080P, 24fps with matched voice, sound effects, and music in a single generation.

Wan 2.7 adds Thinking Mode. The model parses the prompt, plans composition, and then renders. It handles 3,000+ tokens, renders long text and formulas cleanly, supports 12 languages, and accepts HEX color codes for brand-accurate output.

The moats: a live open-weights lineage under Apache 2.0 that no other major commercial video family currently matches, Qwen Chat integration inside Alibaba's consumer app, and multi-provider hosted access that keeps per-second pricing competitive.

## When to pick Wan

- **You need open weights.** Wan 2.2 ships T2V, I2V, and speech-to-video checkpoints on HuggingFace under Apache 2.0. The TI2V-5B variant runs on single consumer GPUs at 720P, 24fps.
- **Your prompts are long or multi-language.** Wan 2.7 handles 3,000+ token prompts and renders 12 languages, including Chinese and Japanese, with clean typography.
- **Audio-visual sync matters.** Wan 2.5 and up generate matched voice, sound effects, and music in a single generation at 1080P.
- **You want the cheapest hosted frontier video.** fal.ai lists Wan 2.7 at $0.10 per second with no resolution surcharge.
- **Character consistency across a shot is critical.** Wan 2.7 advertises facial bone structure and feature control to suppress the "AI same-face" drift.

## When to pick something else

- **Longest single clip:** [Hailuo](/tools/hailuo/) or [Luma](/tools/luma/) generate further in one pass; Wan caps at 15 seconds.
- **Camera-path precision:** [Luma](/tools/luma/) Dream Machine exposes explicit pan, tilt, dolly, and orbit controls.
- **Multi-subject reference-to-video with storyboards:** [Vidu](/tools/vidu/) Q3 Reference-to-Video is purpose-built for story-driven combinations.
- **Western-only data handling:** [Runway](/tools/runway/) or [Veo](/tools/veo/) via Vertex AI keep generation on US / EU infrastructure.
- **Public production API with SLAs:** [Runway](/tools/runway/) remains the pipeline default in Western enterprise work.
- **Creative-effects workflow:** [Pika](/tools/pika/) leads on Pikaffects and Pikadditions.
- **Community ELO leader on raw output:** [Kling](/tools/kling/) holds the top slot on Artificial Analysis.
- **Multimodal native audio challenger:** [Seedance](/tools/seedance/) 2.0 ships stereo audio, SFX, and dialogue in one generation.

## Pricing

Hosted pricing via [fal.ai/wan-2.7](https://fal.ai/wan-2.7) and [fal.ai/wan-2.6](https://fal.ai/wan-2.6). Alibaba Cloud Model Studio publishes its own per-token pricing under [Model Studio pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing).

| Model | Provider | Price | Notes |
|------|----------|-------|-------|
| Wan 2.2 (open-weights) | Self-host | $0 + GPU cost | Apache 2.0 on HuggingFace and ModelScope |
| Wan 2.6 Flash | fal.ai | $0.05/s | 720P, fastest variant |
| Wan 2.6 | fal.ai | $0.10/s (720P), $0.15/s (1080P) | Standard variant |
| Wan 2.7 | fal.ai | $0.10/s | Unified pricing across 720P and 1080P |
| Wan family | Alibaba Cloud | Per-token | Model Studio billing, varies by region |

*Prices verified 2026-04-17 via [fal.ai/wan-2.7](https://fal.ai/wan-2.7), [fal.ai/wan-2.6](https://fal.ai/wan-2.6), and [Atlas Cloud Wan 2.6 guide](https://www.atlascloud.ai/blog/guides/wan-2-6-api-guide). Regional pricing applies on Alibaba Cloud Model Studio.*

## Against the alternatives

| | Wan 2.7 | Kling 3.0 | Vidu Q3 |
|---|---|---|---|
| **Open-weights lineage** | Wan 2.2 Apache 2.0 | None | None |
| **Max clip length** | 15 seconds | 15 seconds | 16 seconds |
| **Max resolution** | 1080P | 4K at 60fps | 1080P Q3-pro |
| **Native audio in output** | Yes, from Wan 2.5 | Yes, Kling 3.0 | Yes, multi-track foley |
| **Public API** | Yes (Alibaba Cloud, fal.ai, Replicate, Together) | None | Yes (platform.vidu.com) |
| **Starting hosted price** | $0.05/s Flash | $10/mo Standard | $0.005/credit |
| **Best viewed as** | Dual open / proprietary play | Quality-per-dollar leader | Reference-to-video specialist |

## Failure modes

- **Open weights cap at Wan 2.2.** Wan 2.5 Preview, Wan 2.6, and Wan 2.7 are proprietary. Self-hosting the frontier version is not an option.
- **15-second ceiling per generation.** Longer videos require stitching, which compounds character drift across cuts.
- **Alibaba Cloud data handling.** Hosted inference runs through Alibaba infrastructure. Enterprises under US or EU data rules need a compliance review.
- **Third-party provider variance.** fal.ai, Replicate, Together AI, and WaveSpeed each publish slightly different pricing, model variants, and rate limits. Benchmark the target provider, not just "Wan 2.7."
- **Thinking Mode adds latency.** The compose-then-render step on Wan 2.7 is slower than Wan 2.6 Flash at equivalent length.
- **Documentation coverage is uneven.** The open-weights GitHub is thorough. Hosted-API docs on Model Studio and third-party hubs are still catching up for Wan 2.7.
- **Speech-to-video lives in Wan 2.2 S2V.** The hosted frontier does not ship a direct S2V equivalent at Wan 2.7; teams mixing dialogue-driven pipelines still need the 14B S2V checkpoint.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis above. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [wan.video](https://wan.video), [GitHub Wan2.2](https://github.com/Wan-Video/Wan2.2), [HuggingFace Wan-AI](https://huggingface.co/Wan-AI), [fal.ai/wan-2.7](https://fal.ai/wan-2.7), and the [Wan 2.7 launch release](https://markets.financialcontent.com/stocks/article/abnewswire-2026-4-6-alibaba-launches-wan-27-breakthrough-ai-image-and-video-generation-model-with-thinking-mode).

## FAQ

**Is Wan free to use?**
Partially. Wan 2.2 ships under Apache 2.0 on [HuggingFace](https://huggingface.co/Wan-AI) and ModelScope, so self-hosting costs only the GPU time. Wan 2.5 Preview, Wan 2.6, and Wan 2.7 are paid through Alibaba Cloud Model Studio or third-party providers.

**Which Wan version is current?**
Wan 2.7, released April 6, 2026, is the proprietary flagship. Wan 2.6 is the recommended production variant in most deployment modes on Alibaba Cloud. Wan 2.5 Preview remains available for audio-visual sync pilots. Wan 2.2 is the last open-weights release.

**Does Wan have a public API?**
Yes. Alibaba Cloud Model Studio, fal.ai, Replicate, Together AI, and WaveSpeed all expose Wan models through APIs. Pricing varies per provider.

**What is Thinking Mode?**
A Wan 2.7 feature where the model parses the prompt, plans composition, and then renders. It targets complex prompts with long text, multiple subjects, or specific color palettes. HEX codes and 12-language text are supported.

**Can I self-host Wan on a consumer GPU?**
Yes, for Wan 2.2 TI2V-5B, which supports text-to-video and image-to-video at 720P, 24fps on a single consumer-grade GPU. The 14B variants (T2V-A14B, I2V-A14B, S2V-14B, Animate-14B) need more VRAM. See [GitHub Wan2.2](https://github.com/Wan-Video/Wan2.2).

**Wan vs Kling vs Vidu?**
Wan wins on open-weights availability and hosted per-second pricing. Kling leads on community ELO and 4K output. Vidu Q3 wins on reference-to-video story workflows and native multi-track audio. Benchmark against your prompt library before committing.

## Sources

- [wan.video](https://wan.video) (verified 2026-04-17)
- [GitHub Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) (verified 2026-04-17)
- [HuggingFace Wan-AI](https://huggingface.co/Wan-AI) (verified 2026-04-17)
- [fal.ai/wan-2.7](https://fal.ai/wan-2.7) (verified 2026-04-17)
- [fal.ai/wan-2.6](https://fal.ai/wan-2.6) (verified 2026-04-17)
- [Alibaba Cloud Model Studio video generation](https://www.alibabacloud.com/help/en/model-studio/use-video-generation) (verified 2026-04-17)
- [Wan 2.7 launch release](https://markets.financialcontent.com/stocks/article/abnewswire-2026-4-6-alibaba-launches-wan-27-breakthrough-ai-image-and-video-generation-model-with-thinking-mode) (verified 2026-04-17)
- [Atlas Cloud Wan 2.6 API guide](https://www.atlascloud.ai/blog/guides/wan-2-6-api-guide) (verified 2026-04-17)

## Related

- **Category:** [AI Video Generation](/categories/ai-video/)
- **Comparisons:** [Kling](/tools/kling/) · [Vidu](/tools/vidu/) · [Seedance](/tools/seedance/) · [Runway](/tools/runway/) · [Veo](/tools/veo/) · [Pika](/tools/pika/) · [Hailuo](/tools/hailuo/) · [Luma](/tools/luma/)
