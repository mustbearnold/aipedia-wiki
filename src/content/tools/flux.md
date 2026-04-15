---
type: tool
slug: flux
title: Flux
tagline: The leading open-source AI image generation model with a massive LoRA fine-tuning ecosystem.
category: ai-image
company: black-forest-labs
url: https://blackforestlabs.ai
pricing_model: open-source
price_range: "$0 (self-hosted) or pay-per-use via third-party APIs"
status: active
launched: 2024-08
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
  moat: 7
  longevity: 9
tags: [ai-image, image-generation, text-to-image, open-source, self-hosted, flux, lora, fine-tuning, comfyui, stable-diffusion]
seo_title: "Flux: Features, Pricing & Review (2026)"
meta_description: "Flux is the leading open-source AI image model by Black Forest Labs. Free to self-host with massive LoRA ecosystem. Best for customization and developer workflows."
author: "aipedia.wiki Editorial"
best_for:
  - developers and technical users
  - lora fine-tuners
  - comfyui power users
not_best_for:
  - non-technical users
  - users needing immediate polish
quick_answer: >-
  Flux is an open-source text-to-image model developed by Black Forest Labs, founded by the original Stable Diffusion team. Its defining advantage is the largest LoRA fine-tuning ecosystem in AI image generation, thousands of community LoRAs on CivitAI and Hugging Face let you train custom styles, characters, or products in under an hour. Flux schnell is free under Apache 2.0 for self-hosting; Flux Pro runs roughly $0.05 per image via API. Best for developers and ComfyUI power users who want full pipeline control, not for anyone who wants polished results without technical setup, Midjourney produces more aesthetically refined output by default. Full-quality inference requires 24GB VRAM.
---

# Flux

Flux is an open-source AI image generation model developed by Black Forest Labs, founded by the original Stable Diffusion team. It generates images from text prompts and is primarily used for custom image generation workflows, LoRA fine-tuning, and integration into production pipelines via ComfyUI. Its key differentiator is the largest LoRA ecosystem in AI image generation combined with full self-hosting capability. As of April 2026, Flux schnell (Apache 2.0) and dev (research license) are free to self-host on consumer GPUs, with Flux Pro available via API at approximately $0.05/image. Compared to Midjourney, Flux offers more control and customization but requires technical setup and produces less aesthetically polished default output.

## What It Does

Flux is the leading open-source image generation model from Black Forest Labs (founded by the original Stable Diffusion team), offering free self-hosting on consumer GPUs with the largest LoRA fine-tuning ecosystem and deep ComfyUI integration for full pipeline control ([Black Forest Labs](https://blackforestlabs.ai)). It comes in three variants: Flux.1 [schnell] (Apache 2.0, fast), Flux.1 [dev] (research license, higher quality), and Flux.1 [pro] (API-only, ~$0.05/image) ([Flux on Hugging Face](https://huggingface.co/black-forest-labs)). Thousands of community-built LoRAs enable custom styles, characters, and products.

## Who It's For

- **Developers and technical users:** anyone who wants full control over the image generation pipeline, custom models, and no API costs.
- **LoRA fine-tuners:** train custom models on specific styles, characters, products, or concepts. The Flux LoRA ecosystem is the largest in AI image generation.
- **ComfyUI power users:** Flux is the most popular model in the ComfyUI workflow system. Complex multi-step pipelines, controlnets, IP-adapters all work.
- **Cost-sensitive high-volume users:** self-hosting eliminates per-image costs. Once hardware is amortized, generation is effectively free.
- **Privacy-conscious organizations:** fully local inference. No data leaves your machine.
- **AI artists and creators:** who want maximum creative control and reproducibility.

## Pricing

Flux is free to self-host (Apache 2.0 for schnell, research license for dev) on a GPU with 12GB+ VRAM, with Flux Pro available via API at ~$0.05/image through Black Forest Labs or third-party providers ([Black Forest Labs](https://blackforestlabs.ai)).

| Option | Price | Key Details |
|--------|-------|-------------|
| Self-hosted (schnell/dev) | $0 | Requires GPU (12GB+ VRAM recommended). Model weights on Hugging Face. |
| Flux Pro API | ~$0.05/image | Via Black Forest Labs API or third-party providers. |
| Third-party platforms | Varies | Replicate, fal.ai, RunPod. Per-image pricing, no hardware management. |
| ComfyUI + Flux | $0 | Local ComfyUI install with Flux models. Full pipeline control. |

*Self-hosting cost is your own compute. API prices verified 2026-04-13.*

## Key Features

- **Open-source model weights:** Flux schnell (Apache 2.0) and dev (research license) are freely downloadable with no vendor lock-in ([Flux GitHub](https://github.com/black-forest-labs/flux)).
- **LoRA ecosystem:** thousands of community LoRAs on CivitAI and Hugging Face; train a custom LoRA on your specific style, character, or product in under an hour ([Flux on Hugging Face](https://huggingface.co/black-forest-labs)). This is Flux's killer feature.
- **ComfyUI integration:** first-class support in ComfyUI for building complex pipelines with controlnets, IP-adapters, inpainting, and multi-model compositions ([Black Forest Labs](https://blackforestlabs.ai)).
- **Image quality:** Flux dev and pro produce images competitive with Midjourney in photorealism and prompt adherence. Less "aesthetic bias" than Midjourney, more neutral and controllable.
- **Self-hostable:** runs on a single consumer GPU (RTX 3090/4090 recommended). Quantized versions run on 12GB VRAM.
- **Prompt adherence:** Flux follows complex prompts more accurately than most closed models. Better at specific compositions, counts, and spatial relationships.

## Limitations

Flux requires GPU hardware (24GB VRAM recommended) and Python setup for self-hosting, produces less aesthetically polished default output than Midjourney, and has complex licensing across its three model tiers ([Black Forest Labs](https://blackforestlabs.ai)).

- **Technical barrier.** Self-hosting requires GPU hardware, Python environment setup, and comfort with model management. Not for non-technical users.
- **Aesthetic gap.** Out-of-the-box, Flux images are less "immediately beautiful" than Midjourney. Midjourney has stronger default composition and color sense. Flux requires more prompt engineering or LoRAs to match.
- **VRAM requirements.** Full-quality Flux dev needs 24GB VRAM (RTX 4090). Quantized versions work on 12GB but with quality trade-offs.
- **No integrated UI.** Black Forest Labs does not offer a consumer-facing web application. You use ComfyUI, third-party UIs, or API.
- **Licensing complexity.** Flux schnell is Apache 2.0 (fully open). Flux dev has a research license, not for commercial use without agreement. Flux pro is API-only. The tiering can confuse users.
- **Model updates depend on BFL.** Unlike Stable Diffusion's large community of independent model trainers, Flux base model updates come from Black Forest Labs.

## Bottom Line

Flux is the best choice for technical users who want maximum control, LoRA customization, and zero per-image costs through self-hosting, but Midjourney wins if you want the best aesthetic quality with no setup required. The ComfyUI ecosystem makes Flux infinitely extensible. It requires meaningful technical setup -- if you want to type a prompt and get a beautiful image with no configuration, Midjourney is a better fit.

## Best Alternatives

- **[Midjourney](midjourney.md):** best aesthetic quality out-of-the-box. No setup required. Cloud-only, no customization.
- **[Leonardo AI](leonardo.md):** best free tier, beginner-friendly web UI. Less customizable than Flux but much easier to start.
- **[Ideogram 2.0](ideogram.md):** best text-in-image rendering. Web-based, easy to use.
- **[Stable Diffusion XL](../categories/ai-image.md):** the predecessor open-source model. Smaller but still large ecosystem. Less capable than Flux.

## FAQ

**Is Flux free?**
Yes, Flux schnell (Apache 2.0 license) is completely free and open-source for both personal and commercial use. Flux dev is free for research but requires a license for commercial use. Self-hosting requires a GPU with 12GB+ VRAM (24GB recommended for full quality). There is no cloud-hosted free tier from Black Forest Labs directly.

**How much does Flux cost?**
Self-hosted Flux costs $0 (you provide GPU hardware). Flux Pro via the Black Forest Labs API costs approximately $0.05 per image. Third-party hosting platforms like Replicate and fal.ai charge varying per-image rates. Self-hosting eliminates all per-image costs after hardware investment.

**What are the best alternatives to Flux?**
Midjourney is the best alternative for users who want the highest aesthetic quality with no technical setup ($10-$60/month). Leonardo AI offers a beginner-friendly web UI with a generous free tier. Ideogram 2.0 is better specifically for text rendering in images.

## Related

- **Category:** [AI Image Generation](../categories/ai-image.md)

## Sources

- [Official website](https://blackforestlabs.ai)
- [Flux on Hugging Face](https://huggingface.co/black-forest-labs)
- [GitHub Repository](https://github.com/black-forest-labs/flux)
