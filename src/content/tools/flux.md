---
type: tool
slug: flux
title: Flux
tagline: Black Forest Labs' image model family. Flux.2 Pro/Flex for API photoreal, Flux.2 Dev and Klein open-weights, Flux.1 Kontext for instruction-based edits.
category: ai-image
company: black-forest-labs
url: https://bfl.ai
github_url: https://github.com/black-forest-labs/flux
pricing_model: freemium
price_range: "$0 self-hosted / ~$0.003-$0.10 per image via API"
status: active
launched: 2024-08
last_updated: 2026-04-22
last_verified: 2026-04-22
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
facts:
  best_for:
    value: "Teams comparing modern image-generation models where photorealism, prompt adherence, edit workflows, or API deployment matter more than a consumer app UI."
    source: "https://bfl.ai"
    source_label: "Black Forest Labs official site"
    source_id: flux-official
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: high
    confidence: high
  model_surface:
    value: "Flux is a model family from Black Forest Labs, with API and deployment options that vary by model version and provider."
    source: "https://docs.bfl.ai/quick_start/introduction"
    source_label: "Black Forest Labs docs"
    source_id: flux-docs
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: high
    confidence: high
  pricing_anchor:
    value: "API pricing depends on the serving provider and selected Flux model; fal.ai publishes model-level pricing for hosted inference."
    source: "https://fal.ai/docs/platform-apis/v1/models/pricing"
    source_label: "fal.ai model pricing"
    source_id: flux-pricing
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: high
    confidence: high
  integration_surface:
    value: "Evaluate Flux through the exact runtime you plan to use, such as BFL docs, fal.ai, Replicate, or a self-hosted workflow, because latency, price, and controls differ."
    source: "https://docs.bfl.ai/quick_start/introduction"
    source_label: "Black Forest Labs docs"
    source_id: flux-docs
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: high
    confidence: medium
  watch_out_for:
    value: "Do not compare only model names. Check license, available endpoints, image rights, safety filters, and whether the exact Flux variant is supported in your production stack."
    source: "https://docs.bfl.ai/quick_start/introduction"
    source_label: "Black Forest Labs docs"
    source_id: flux-docs
    verified_at: 2026-05-04
    next_review_at: 2026-08-04
    volatility: high
    confidence: high
tags: [ai-image, image-generation, text-to-image, open-source, self-hosted, flux, lora, fine-tuning, comfyui, kontext]
seo_title: "Flux Review 2026: Flux.2, Kontext, Pricing & API Guide"
meta_description: "Flux by Black Forest Labs in April 2026: Flux.2 Pro/Flex/Dev/Klein plus Flux.1 Kontext for instruction edits. Self-host free; API from ~$0.003-$0.10/image via BFL, Replicate, fal."
author: "aipedia.wiki Editorial"
best_for:
  - developers building API-first image pipelines
  - lora fine-tuners on open weights
  - comfyui power users
  - instruction-based image editing (Kontext)
not_best_for:
  - non-technical users wanting a consumer app
  - text-in-image work where Ideogram still wins
  - users who need a hosted web UI from the vendor
quick_answer: >-
  Flux is Black Forest Labs' image model family, strongest for open-weight photoreal and instruction-based edits via Kontext. Pick it for API-first production pipelines, on-prem deployment, or LoRA fine-tuning. Skip if you want a consumer web app (Midjourney) or text-in-image accuracy (Ideogram).
price_history:
  - date: 2026-01-15
    plan: "Flux.2 Klein"
    price: "open-weight (Apache 2.0)"
    source: "https://fal.ai/docs/platform-apis/v1/models/pricing"
    source_label: "Source"
    source_id: flux-pricing
    note: "Fastest Flux variant released; sub-second on consumer GPUs"
  - date: 2025-11-25
    plan: "Flux.2 family"
    price: "API + open-weight Dev"
    source: "https://fal.ai/docs/platform-apis/v1/models/pricing"
    source_label: "Source"
    source_id: flux-pricing
    note: "Flux.2 Pro/Flex API launch; Flux.2 Dev open-weight (32B parameters)"
---

# Flux

Black Forest Labs' image model family. Flux.2 Pro and Flex are the current API flagships for photoreal generation; Flux.2 Dev and Klein are open-weight. Flux.1 Kontext handles instruction-based image editing with character consistency. Flux.1.1 Pro Ultra remains available as a legacy high-resolution option.

The entire line is API-first. BFL does not ship a consumer web app. Access runs through bfl.ai, Replicate, fal.ai, Together, and Cloudflare Workers AI.

## System Verdict

> **Pick Flux if you are building image generation into a product, need open weights for on-prem deployment, or want instruction-based edits that preserve subject identity.** Flux.2 Pro delivers the strongest open-ecosystem photoreal quality available. Flux.1 Kontext is the best widely-available instruction editor: ask for "put sunglasses on the same person" and the person stays the same. Open-weight Flux.2 Dev and Klein ship under developer-friendly licenses, and the LoRA ecosystem on Civitai and Hugging Face is the largest outside legacy Stable Diffusion.
>
> **Skip it if you want to type prompts into a nice web app.** BFL ships no consumer UI. You need API skills, ComfyUI, or a third-party front-end. [Midjourney](/tools/midjourney/) still wins on default aesthetic polish with zero setup; [Ideogram](/tools/ideogram/) still wins decisively on text-in-image; [ChatGPT](/tools/chatgpt/)'s GPT Image 2 wins for users who already pay for a chat subscription and don't want a separate image bill.
>
> **Who pays which tier:** open-weight Dev/Klein for researchers and self-hosters with a 24GB+ GPU; Replicate pay-per-image for ad-hoc use (Schnell $0.003, Dev $0.025, Pro $0.05); BFL API for production pipelines and Kontext editing (credits from ~$0.014/megapixel); fal.ai for the cheapest sustained production on hosted infra.

## Key Facts

| | |
|---|---|
| **API flagships** | Flux.2 Pro · Flux.2 Flex |
| **Open-weight models** | Flux.2 Dev (32B parameters, community license) · Flux.2 Klein (Apache 2.0, sub-second on consumer GPUs) · Flux.1 Dev · Flux.1 Schnell (Apache 2.0) |
| **Editing model** | Flux.1 Kontext · Dev / Pro / Max tiers, instruction-based edits with character consistency |
| **Legacy API** | Flux.1.1 Pro Ultra (4MP, still available) |
| **Multi-reference** | Up to 10 reference images (Flux.2 Max / Pro) |
| **Native resolution** | Up to 4 megapixels (generation + editing) |
| **Text rendering** | Competent on short phrases; Ideogram v3 (~90-95%) still wins for longer text |
| **API access points** | bfl.ai · Replicate · fal.ai · Together · Cloudflare Workers AI · Atlas Cloud |
| **Consumer app** | None from BFL · ComfyUI or third-party front-ends only |
| **Release dates** | Flux.2 family Nov 25, 2025 · Flux.2 Klein Jan 15, 2026 |

Every data point above was verified against vendor sources on 2026-04-15. See Sources.

## What it actually is

A set of diffusion / flow-matching image models sold through APIs and, for the Dev and Klein tiers, distributed as open weights. BFL is the team formed by the original Stable Diffusion authors and they have stayed on the same pattern: ship a closed flagship (Pro / Flex / Max), ship a heavy-but-open Dev, ship a lightweight Apache 2.0 (Schnell, now Klein). The architecture under Flux.2 is a 32B rectified-flow transformer with a Mistral-3 24B vision-language model on the text encoder side.

The moats:

- **Open weights for Dev and Klein.** Nobody else at frontier photoreal quality ships downloadable weights. Midjourney and GPT Image 2 are fully closed.
- **Kontext edit capability.** Instruction-based editing that preserves subject identity across multiple edits is rare. It is the single feature competitors have not matched at parity.
- **Photoreal ceiling.** Flux.2 Pro is the strongest photoreal open-ecosystem model at 4MP. Skin, lighting, and product shots consistently read as real.
- **LoRA ecosystem.** Civitai and Hugging Face host thousands of community Flux LoRAs; training a new one takes hours on consumer hardware.

## When to pick Flux

- **You are an engineer building image gen into a product.** Flux.2 Pro or Flex via API gives predictable cost, 10 reference images, and 4MP output. No web UI dependency.
- **You need on-prem or offline image generation.** Flux.2 Dev (32B) or Flux.2 Klein (Apache 2.0) run locally. Klein is sub-second on a consumer GPU.
- **You need instruction-based edits with identity preservation.** Flux.1 Kontext. "Change the background but keep the same person" is the canonical use case.
- **You fine-tune characters, products, or styles.** The Flux LoRA ecosystem on Civitai and Hugging Face beats everything outside legacy SD.
- **You want the strongest photoreal output without Midjourney's stylistic prior.** Flux reads more literal; useful for product photography, e-commerce lifestyle shots, and any work where "a red door" must be the red door you described.

## When to pick something else

- **Default aesthetic polish with zero setup:** [Midjourney](/tools/midjourney/). Wins on out-of-the-box composition and color.
- **Text-in-image (posters, thumbnails, UI mocks):** [Ideogram](/tools/ideogram/) v3. ~90-95% text rendering accuracy vs Flux's "decent on short phrases."
- **You already pay for a chat subscription and don't want a separate image bill:** [ChatGPT](/tools/chatgpt/) with GPT Image 2. Bundled, no API integration work.
- **The legacy open-source ecosystem (SDXL checkpoints, ControlNet zoo):** [Stable Diffusion](/tools/stable-diffusion/). Larger historical checkpoint library; quality ceiling is below Flux.2.
- **Free-tier-friendly web app for beginners:** [Leonardo](/tools/leonardo/). Better onboarding than raw Flux; less power.

## Pricing

Flux is priced per-image, per provider. The same model often has different rates on different infrastructure. Best viewed as API-first: pick the host that matches your workload.

**Black Forest Labs direct API** (credits-based, 1 credit = $0.01):

| Model | Approx price | Notes |
|---|---|---|
| Flux.2 Pro | ~$0.014-$0.056 / image | ~$0.014 per megapixel; 4MP image ~$0.056 |
| Flux.2 Flex | ~$0.03-$0.06 / image | Versatile middle tier |
| Flux.1 Kontext Pro | ~$0.04 / image | Instruction-based editing |
| Flux.1 Kontext Max | ~$0.08 / image | Highest-fidelity edits |
| Flux.1 Kontext Dev | ~$0.023 / image | Open-weight variant via API |
| Flux.1.1 Pro Ultra (legacy) | ~$0.06 / image | 4MP legacy option |

**Replicate** (`replicate.com/black-forest-labs`):

| Model | Price |
|---|---|
| Flux Schnell | $0.003 / image |
| Flux Dev | $0.025 / image |
| Flux Pro 1.1 | $0.05 / image |
| Flux.1.1 Pro Ultra | $0.06 / image |

**fal.ai** (`fal.ai/models/fal-ai/flux`):

| Model | Price |
|---|---|
| Flux Dev | ~$0.025 / image |
| Flux Schnell | compute-metered (cheapest at scale) |
| Flux.1 Kontext Pro | ~$0.04 / image |

**Self-hosted** (open weights): $0 runtime, hardware cost only. Flux.2 Dev needs ~24GB VRAM at full quality; Flux.2 Klein runs sub-second on consumer GPUs; Flux.1 Schnell operates on 12GB with quantization.

Prices verified 2026-04-15 via [BFL pricing](https://bfl.ai/pricing), [Replicate](https://replicate.com/black-forest-labs), [fal.ai docs](https://fal.ai/docs/platform-apis/v1/models/pricing), and [Price Per Token](https://pricepertoken.com/image). Provider rates move; check the source before committing a production budget.

## Against the alternatives

| | Flux | Midjourney v7 | Stable Diffusion (SD 3.5) |
|---|---|---|---|
| **Photoreal quality** | Strongest open-ecosystem | Strong, stylized prior | Behind Flux.2 at base |
| **Stylized output** | Literal; needs LoRAs for style | Strongest default aesthetic | Deep community style checkpoints |
| **Open weights** | Flux.2 Dev / Klein (yes) | None | Yes (long lineage) |
| **API cost** | $0.003-$0.08 / image | Subscription only ($10-$60/mo) | Varies by host |
| **Text rendering** | Competent on short text | Weak | Weak |
| **Instruction editing** | Kontext (strong identity preservation) | None | Limited via inpainting |
| **Consumer UI** | None from vendor | Polished web + Discord | Many third-party |
| **Best viewed as** | API-first engine + open-weight base | Consumer aesthetic tool | Legacy open ecosystem |

## Failure modes

- **No consumer app from BFL.** If you want to type a prompt in a browser, you need a third party (Mystic, Krea, Fal playground, flux1.ai) or ComfyUI. Not a friction Midjourney users face.
- **Self-hosting still requires real technical skill.** Flux.2 Dev is a 32B model; even with Klein's speed gains, ComfyUI setup, VRAM management, and CUDA troubleshooting are non-trivial.
- **Kontext edits sometimes miss.** Character consistency holds most of the time but breaks on extreme poses, occlusion, or subjects with distinctive features the model wants to "improve." Budget for retries.
- **Prompt syntax differs per provider.** BFL, Replicate, fal, and Cloudflare each have slightly different parameter names and default settings. Prompts that work identically across all hosts are rare; expect provider-specific tuning.
- **Text-in-image is mid.** Flux.2 Pro handles short phrases credibly but fails on longer strings and complex typography. [Ideogram](/tools/ideogram/) wins this category.
- **Licensing tree is a thicket.** Schnell and Klein are Apache 2.0 (commercial OK). Flux.1 Dev and Flux.2 Dev ship under BFL's community / non-commercial licenses, so commercial use needs an agreement. Pro/Flex/Max/Ultra are API-only. Read the license before shipping.
- **Base model cadence depends on BFL.** Unlike SD's large independent trainer community, Flux base-model updates come from Black Forest Labs only. No community 2.x lineage forking.
- **Provider pricing moves.** Replicate, fal, Together, and BFL have all adjusted rates multiple times since Flux.2 launched. Quoted figures here are current-to-verification-date.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-15 against [Black Forest Labs](https://bfl.ai), the [Flux.2 model page](https://bfl.ai/models/flux-2), [Flux.2 Dev on Hugging Face](https://huggingface.co/black-forest-labs/FLUX.2-dev), [Replicate's Black Forest Labs collection](https://replicate.com/black-forest-labs), [fal.ai pricing](https://fal.ai/docs/platform-apis/v1/models/pricing), and the [VentureBeat Flux.2 launch coverage](https://venturebeat.com/ai/black-forest-labs-launches-flux-2-ai-image-models-to-challenge-nano-banana).

## FAQ

**Is Flux free?**
Flux.1 Schnell and Flux.2 Klein are Apache 2.0 and free for commercial self-hosting. Flux.1 Dev and Flux.2 Dev are open-weight under BFL's community license: free for research, requires a license for commercial use. Flux.2 Pro, Flex, and the Kontext Pro/Max tiers are API-only and paid. BFL does not operate a hosted free tier.

**What is Flux Kontext?**
Flux.1 Kontext is BFL's instruction-based image editor. Give it an input image and a text instruction ("put the man in a red jacket," "change the background to a beach") and it edits while preserving subject identity across successive edits. Three tiers: Dev (open-weight, ~$0.023/image via API), Pro (~$0.04/image on fal and BFL), Max (~$0.08/image, highest fidelity). Edits typically complete in 6-12 seconds.

**What is the difference between Flux.2 variants?**
Pro is the closed API flagship for photoreal production. Flex is the versatile middle tier. Dev is the 32B open-weight research model, same architecture, downloadable. Klein is the Apache 2.0 speed variant released January 15, 2026: sub-second on consumer GPUs, lower quality ceiling than Pro but permissively licensed.

**Where should I run Flux?**
BFL direct for Kontext and production pipelines that want first-party support. Replicate for simple per-image pay-as-you-go and mixed-model workflows. fal.ai for the cheapest sustained hosted inference. Self-hosted for open weights on your own hardware (RTX 4090 recommended for Flux.2 Dev at full quality). Cloudflare Workers AI is a new option for edge deployment of Flux.2 Dev.

**Does Flux render text in images?**
Adequately, not best-in-class. Short phrases work; longer text and complex typography still fail. [Ideogram](/tools/ideogram/) v3 renders text at ~90-95% accuracy and is the clear pick if text is the point of the image.

**How does Flux compare to Midjourney?**
Midjourney wins default aesthetic polish and ease of use (paid web app, no API integration). Flux wins photoreal fidelity, open weights, instruction-based editing (Kontext), and cost at scale. Most teams end up using both: Midjourney for exploration, Flux for production.

## Related

- **Category:** [AI Image](/categories/ai-image/)
- **Compare:** [Midjourney](/tools/midjourney/) · [Ideogram](/tools/ideogram/) · [Stable Diffusion](/tools/stable-diffusion/) · [Leonardo](/tools/leonardo/) · [ChatGPT](/tools/chatgpt/)

## Sources

- [Black Forest Labs official site](https://bfl.ai) (verified 2026-04-15)
- [Flux.2 model page](https://bfl.ai/models/flux-2) (verified 2026-04-15)
- [Flux.2 Dev on Hugging Face](https://huggingface.co/black-forest-labs/FLUX.2-dev) (verified 2026-04-15)
- [Flux.2 GitHub repo](https://github.com/black-forest-labs/flux2) (verified 2026-04-15)
- [Replicate · Black Forest Labs collection](https://replicate.com/black-forest-labs) (verified 2026-04-15)
- [fal.ai pricing](https://fal.ai/docs/platform-apis/v1/models/pricing) (verified 2026-04-15)
- [VentureBeat: Black Forest Labs launches Flux.2](https://venturebeat.com/ai/black-forest-labs-launches-flux-2-ai-image-models-to-challenge-nano-banana) (verified 2026-04-15)
- [Cloudflare Workers AI × Flux.2 Dev partnership](https://blog.cloudflare.com/flux-2-workers-ai/) (verified 2026-04-15)
- [Price Per Token · image API comparison](https://pricepertoken.com/image) (verified 2026-04-15)
