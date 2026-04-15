---
type: tool
slug: flux
title: Flux
tagline: Open-source AI image generation model with a FLUX.2 flagship lineup and the largest LoRA fine-tuning ecosystem.
category: ai-image
company: black-forest-labs
url: https://blackforestlabs.ai
pricing_model: open-source
price_range: "$0 (self-hosted) or pay-per-use via API"
status: active
launched: 2024-08
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
  utility: 9
  value: 10
  moat: 7
  longevity: 9
tags: [ai-image, image-generation, text-to-image, open-source, self-hosted, flux, lora, fine-tuning, comfyui, stable-diffusion]
seo_title: "Flux Review 2026: FLUX.2, Pricing & Features Guide"
meta_description: "Flux by Black Forest Labs has upgraded to the FLUX.2 family in 2026. FLUX 2 Pro and FLUX 2 Max are the current flagships. Free to self-host; API from ~$0.03/image."
author: "aipedia.wiki Editorial"
best_for:
  - - developers and technical users
  - lora fine-tuners
  - comfyui power users
  - high-volume production pipelines
not_best_for:
  - - non-technical users
  - users needing immediate aesthetic polish without setup
quick_answer: >-
  Flux is an open-source text-to-image model developed by Black Forest Labs, founded by the original Stable Diffusion team. The model family has upgraded to FLUX.2 as of 2026: FLUX 2 Pro (Arena AI rank 10, ELO 1157) and FLUX 2 Max (rank 8, ELO 1167) are the current flagships, with FLUX 2 Flex rounding out the lineup. FLUX 1.1 Pro Ultra remains available as a legacy option. API pricing starts around $0.03-$0.06 per image for FLUX 2 Pro. Flux Schnell (Apache 2.0) and Flux Dev remain free for self-hosting. The defining advantage remains the largest LoRA fine-tuning ecosystem in AI image generation. Best for developers and ComfyUI power users who want full pipeline control. Midjourney v7 produces more aesthetically refined output by default; FLUX.2 competes on photorealism and prompt adherence.
---

# Flux

Flux is an open-source AI image generation model developed by Black Forest Labs, founded by the original Stable Diffusion team. As of April 2026, the model family has upgraded to the FLUX.2 lineup: FLUX 2 Pro is the current flagship for photorealism (Arena AI rank 10, ELO 1157), FLUX 2 Max targets the highest quality ceiling (rank 8, ELO 1167), and FLUX 2 Flex offers a versatile balance. FLUX 1.1 Pro Ultra remains available as a legacy high-resolution option. The original FLUX.1 Schnell (Apache 2.0) and FLUX.1 Dev (research license) continue as free self-hosted options. Compared to Midjourney v7, FLUX.2 competes strongly on photorealism and precise prompt adherence, with less of an opinionated "aesthetic bias." ([Black Forest Labs](https://blackforestlabs.ai))

## What It Does

Flux generates images from text prompts via open-weight models you can self-host or access through Black Forest Labs' API and third-party platforms. The FLUX.2 family (FLUX 2 Pro, Max, Flex) are the current production models, succeeding FLUX 1.1 Pro and FLUX 1.1 Pro Ultra. FLUX 2 Pro supports prompts up to 200 words and delivers improved skin textures, lighting, and prompt adherence over prior versions. FLUX 2 Max supports up to 10 reference images and ranks #8 on the Arena AI text-to-image leaderboard. Thousands of community LoRAs on Civitai and Hugging Face enable custom styles, characters, and products. Full pipeline control is available via ComfyUI integration ([Black Forest Labs](https://blackforestlabs.ai)).

## Who It's For

- **Developers and technical users:** anyone who wants full control over the image generation pipeline, custom models, and no API costs via self-hosting
- **LoRA fine-tuners:** train custom models on specific styles, characters, products, or concepts; the Flux LoRA ecosystem is the largest in AI image generation
- **ComfyUI power users:** Flux remains the most popular model in ComfyUI; complex multi-step pipelines, ControlNets, IP-adapters, and inpainting all work
- **Cost-sensitive high-volume users:** self-hosting eliminates per-image costs; once hardware is amortized, generation is effectively free
- **Privacy-conscious organizations:** fully local inference means no data leaves your machine
- **AI artists and creators:** who want maximum creative control, reproducibility, and reference-image workflows

## Pricing

FLUX.2 Pro, Max, and Flex are API-only. FLUX.1 Dev and FLUX.1 Schnell remain free to self-host. All API pricing should be verified at [blackforestlabs.ai](https://blackforestlabs.ai) as it may change.

| Option | Price | Key Details |
|--------|-------|-------------|
| Self-hosted (FLUX.1 Schnell, Apache 2.0) | $0 | Fully open for personal and commercial use. Requires GPU (12GB+ VRAM). |
| Self-hosted (FLUX.1 Dev / FLUX.2 Dev) | $0 (research license) | Not for commercial use without agreement. |
| FLUX 2 Pro API | ~$0.03-$0.06/image | Via Black Forest Labs or third-party providers such as Replicate, fal.ai. |
| FLUX 2 Max API | ~$0.07/image | Highest quality tier; supports up to 10 reference images. |
| FLUX 2 Flex API | ~$0.06/image | Versatile middle-tier option. |
| FLUX 1.1 Pro Ultra (legacy) | ~$0.04/image | High-resolution legacy option; still available. |
| Third-party platforms | Varies | Replicate, fal.ai, RunPod; per-image pricing, no hardware management. |

*API prices are approximate, sourced from third-party API comparisons. Verified 2026-04-15 via available sources; check [blackforestlabs.ai](https://blackforestlabs.ai) for authoritative current rates.*

## Key Features

- **FLUX.2 flagship lineup:** FLUX 2 Pro (Arena AI rank 10), FLUX 2 Max (rank 8, up to 10 reference images), and FLUX 2 Flex provide a full production tier that succeeds FLUX 1.1 Pro and FLUX 1.1 Pro Ultra ([Black Forest Labs](https://blackforestlabs.ai))
- **Open-source model weights:** FLUX.1 Schnell (Apache 2.0) and FLUX.1 Dev (research license) are freely downloadable with no vendor lock-in ([Flux on Hugging Face](https://huggingface.co/black-forest-labs))
- **LoRA ecosystem:** thousands of community LoRAs on Civitai and Hugging Face; train a custom LoRA on your specific style, character, or product in under an hour — this remains Flux's defining advantage
- **ComfyUI integration:** first-class support for building complex pipelines with ControlNets, IP-adapters, inpainting, and multi-model compositions
- **Prompt adherence:** FLUX.2 models follow long, complex prompts (up to 200 words on Pro) more accurately than most closed models; better at specific counts, spatial relationships, and compositional instructions
- **Multi-reference images (FLUX 2 Max):** accepts up to 10 reference images for style and subject consistency in a single generation
- **Self-hostable:** runs on a single consumer GPU; quantized versions of FLUX.1 Dev operate on 12GB VRAM

## Limitations

- **Technical barrier:** self-hosting requires GPU hardware, Python environment setup, and comfort with model management; not for non-technical users
- **Aesthetic gap vs. Midjourney:** out-of-the-box, Flux images are less immediately polished than Midjourney v7; Midjourney has stronger default composition and color rendering; Flux requires more prompt engineering or LoRAs to close the gap
- **VRAM requirements:** full-quality FLUX.1 Dev needs 24GB VRAM (RTX 4090); quantized versions work on 12GB with quality trade-offs; FLUX.2 models are API-only and do not require local VRAM
- **No integrated consumer UI from Black Forest Labs:** you use ComfyUI, third-party UIs, or the API; no web app from BFL directly
- **Licensing complexity:** FLUX.1 Schnell is Apache 2.0 (fully open); FLUX.1 Dev has a research license, not for commercial use without agreement; FLUX.2 models are API-only; the tiering requires careful reading before commercial deployment
- **Base model updates depend on Black Forest Labs:** unlike Stable Diffusion's large independent trainer community, FLUX.2 base model updates come from BFL

## Bottom Line

Flux is the best choice for technical users who want maximum photorealism, LoRA customization, and zero per-image costs through self-hosting. The FLUX.2 upgrade in 2026 closed the quality gap with proprietary leaders: FLUX 2 Max ranks #8 on the Arena AI leaderboard, placing it above many commercial tools. Midjourney v7 still wins for users who want the best aesthetic polish with no setup required. The ComfyUI ecosystem makes Flux infinitely extensible for developers. If you want to type a prompt and get a beautiful image with no configuration, Midjourney remains a better fit.

## Best Alternatives

- **[Midjourney](/tools/midjourney):** best aesthetic quality out-of-the-box; no setup required; cloud-only, no customization
- **[Stable Diffusion](/tools/stable-diffusion):** the prior open-source standard; still large community ecosystem; less capable base model than FLUX.2 but SDXL checkpoints remain widely used
- **[Leonardo AI](/tools/leonardo):** best free tier, beginner-friendly web UI; less customizable than Flux but much easier to start
- **[Ideogram](/tools/ideogram):** best text-in-image rendering; web-based, easy to use

## FAQ

**Is Flux free?**
FLUX.1 Schnell (Apache 2.0 license) is completely free and open-source for both personal and commercial use. FLUX.1 Dev is free for research but requires a license for commercial use. Self-hosting requires a GPU with 12GB+ VRAM (24GB recommended for full quality). The FLUX.2 production models (Pro, Max, Flex) are API-only and are not available for free self-hosting. There is no cloud-hosted free tier from Black Forest Labs directly.

**What is the FLUX.2 lineup?**
FLUX.2 is the 2026 generation of Flux models released by Black Forest Labs. It includes FLUX 2 Pro (current flagship, ~$0.03-$0.06/image via API, Arena AI rank 10), FLUX 2 Max (highest quality, up to 10 reference images, ~$0.07/image, rank 8), and FLUX 2 Flex (versatile balance, ~$0.06/image). These succeed FLUX 1.1 Pro and FLUX 1.1 Pro Ultra, which remain available as legacy options. FLUX.2 models are API-only; the free self-hosted models remain FLUX.1 Schnell and FLUX.1 Dev.

**What happened to Flux 1.1 Pro Ultra?**
FLUX 1.1 Pro Ultra is still available as a legacy option. It has been largely superseded by FLUX 2 Pro and FLUX 2 Max in the current lineup. On the Arena AI leaderboard, FLUX 1.1 Pro ranks around ELO 1016 (rank 45) while FLUX 2 Pro reaches ELO 1157 (rank 10) and FLUX 2 Max reaches ELO 1167 (rank 8), representing a significant quality improvement.

**What are the best alternatives to Flux?**
Midjourney v7 is the best alternative for users who want the highest aesthetic quality with no technical setup ($10-$60/month). Stable Diffusion (SD 3.5 Large) is the other major open-source option with a large community checkpoint ecosystem. Leonardo AI offers a beginner-friendly web UI with a generous free tier. Ideogram is better specifically for text rendering in images.

## Related

- **Category:** [AI Image Generation](/tools/categories/ai-image)
- **Compare:** [Stable Diffusion](/tools/stable-diffusion), [Midjourney](/tools/midjourney), [Ideogram](/tools/ideogram)

## Sources

- [Black Forest Labs official website](https://blackforestlabs.ai) (verified 2026-04-15)
- [Flux on Hugging Face](https://huggingface.co/black-forest-labs) (verified 2026-04-15)
- [Flux GitHub Repository](https://github.com/black-forest-labs/flux) (verified 2026-04-15)
- [Arena AI Text-to-Image Leaderboard](https://arena.ai/leaderboard/text-to-image) (verified 2026-04-15)
- Third-party API pricing comparison: atlascloud.ai/blog/guides/best-ai-image-generation-apis-in-2026-complete-developer-guide (verified 2026-04-15)
