---
type: tool
slug: flux
title: Flux
tagline: "Black Forest Labs' image model family: FLUX.2 Max/Pro/Flex/Klein for API generation and editing, FLUX.2 Dev/Klein open weights, and FLUX.1 Kontext for instruction edits."
category: ai-image
company: black-forest-labs
url: https://bfl.ai
github_url: https://github.com/black-forest-labs/flux2
pricing_model: freemium
price_range: "$0 local / hosted from ~$0.012-$0.12 per MP"
status: active
launched: 2024-08
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
  longevity: 9
facts:
  best_for:
    value: "Teams comparing modern image-generation models where photorealism, prompt adherence, image editing, local/open-weight experimentation, or API deployment matter more than a consumer app UI."
    source: "https://bfl.ai"
    source_label: "Black Forest Labs official site"
    source_id: flux-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-10
    volatility: high
    confidence: high
  model_surface:
    value: "Black Forest Labs lists FLUX.2 as its latest generation, with Max, Pro, Flex, Klein, and Dev variants, plus previous-generation FLUX.1 Kontext and FLUX1.1 models."
    source: "https://help.bfl.ai/articles/9364115800-flux-models-overview"
    source_label: "Black Forest Labs FLUX models overview"
    source_id: flux-2-models
    verified_at: 2026-05-13
    next_review_at: 2026-08-10
    volatility: high
    confidence: high
  pricing_anchor:
    value: "BFL's own pricing is credit-based and model/resolution dependent; FLUX.2 Klein starts at $0.014/image, Pro starts at $0.03/MP, Max at $0.07/MP, Flex at $0.06/MP for text-to-image and $0.12/MP for editing."
    source: "https://docs.bfl.ai/quick_start/pricing"
    source_label: "Black Forest Labs API pricing"
    source_id: flux-2-pricing
    verified_at: 2026-05-13
    next_review_at: 2026-08-10
    volatility: high
    confidence: high
  integration_surface:
    value: "Evaluate Flux through the exact runtime you plan to use, such as BFL, fal.ai, Replicate, Cloudflare Workers AI, or a local workflow, because pricing units, latency, input-image limits, and controls differ."
    source: "https://fal.ai/flux-2"
    source_label: "fal.ai FLUX.2 pricing"
    source_id: flux-pricing
    verified_at: 2026-05-13
    next_review_at: 2026-08-10
    volatility: high
    confidence: high
  watch_out_for:
    value: "Do not compare only model names. Check the exact variant, license, provider terms, image rights, safety filters, and whether the selected endpoint supports the reference-image and control features you need."
    source: "https://help.bfl.ai/articles/9272590838-self-serve-dev-license-overview-pricing"
    source_label: "Black Forest Labs licensing overview"
    source_id: flux-licensing
    verified_at: 2026-05-13
    next_review_at: 2026-08-10
    volatility: high
    confidence: high
tags: [ai-image, image-generation, text-to-image, open-weights, self-hosted, flux, lora, fine-tuning, comfyui, kontext]
seo_title: "Flux Review 2026: FLUX.2, Kontext, Pricing & API Guide"
meta_description: "Flux by Black Forest Labs in May 2026: FLUX.2 Max/Pro/Flex/Klein/Dev, FLUX.1 Kontext, open-weight licensing, and BFL, fal.ai, Replicate, Cloudflare API routes."
author: "aipedia.wiki Editorial"
best_for:
  - developers building API-first image pipelines
  - lora fine-tuners on open weights
  - comfyui power users
  - instruction-based image editing (Kontext)
not_best_for:
  - non-technical users wanting a consumer app
  - teams that need one simple subscription app instead of API/provider choices
  - users who need a hosted web UI from the vendor
quick_answer: >-
  Flux is Black Forest Labs' image model family, strongest when you want API-first image generation, multi-reference editing, open-weight experimentation, or local/ComfyUI workflows. Pick it for production pipelines, FLUX.2 [klein] 4B's permissive local route, or FLUX.1/2 fine-tuning experiments. Skip it if you want one polished consumer subscription app with no API or licensing decisions.
price_history:
  - date: 2026-05-13
    plan: "BFL API"
    price: "FLUX.2 [klein] from $0.014/image; FLUX.2 [pro] from $0.03/MP; FLUX.2 [max] from $0.07/MP; FLUX.2 [flex] from $0.06/MP TTI and $0.12/MP editing"
    source: "https://docs.bfl.ai/quick_start/pricing"
    source_label: "Black Forest Labs API pricing"
    source_id: flux-2-pricing
    note: "Credit pricing uses 1 credit = $0.01 and varies by model, resolution, and generation/editing mode."
  - date: 2026-01-15
    plan: "FLUX.2 [klein]"
    price: "4B and 4B Base Apache 2.0; 9B variants under FLUX Non-Commercial License"
    source: "https://github.com/black-forest-labs/flux2"
    source_label: "Black Forest Labs FLUX.2 GitHub"
    source_id: flux-2-github
    note: "Compact FLUX.2 family released for sub-second and consumer-GPU workflows."
  - date: 2025-11-25
    plan: "FLUX.2 family"
    price: "API variants plus FLUX.2 [dev] open weights under a non-commercial license"
    source: "https://github.com/black-forest-labs/flux2"
    source_label: "Black Forest Labs FLUX.2 GitHub"
    source_id: flux-2-github
    note: "FLUX.2 [dev] launched as a 32B generation and editing model."
---

# Flux

Black Forest Labs' image model family. FLUX.2 is the current generation, with Max, Pro, Flex, Klein, and Dev variants for image generation, image editing, multi-reference workflows, and local/open-weight experimentation. FLUX.1 Kontext remains the important previous-generation route for instruction-based image editing, and FLUX1.1 [pro] Ultra remains available as a legacy high-resolution option.

The buyer experience is API-first. BFL offers its dashboard, API, and Playground, but Flux is not a Midjourney-style consumer app with one obvious subscription path. Access also runs through provider routes such as fal.ai, Replicate, Cloudflare Workers AI, and local workflows.

## System Verdict

> **Pick Flux if you are building image generation into a product, need open-weight/local options, or want editing workflows that can preserve a subject, product, style, or reference set.** FLUX.2 gives developers a real model ladder: Max for highest-quality editing, Pro for production balance, Flex for typography/control, Klein for speed and local deployment, and Dev for non-commercial open-weight development. FLUX.1 Kontext remains worth knowing when text-instruction editing is the job.
>
> **Skip it if you want a simple consumer web app.** You need API skills, the BFL Playground, ComfyUI, or a third-party front-end. [Midjourney](/tools/midjourney/) is still easier for pure creative prompting, [Ideogram](/tools/ideogram/) remains the cleaner first test for web-first typography workflows, and [ChatGPT](/tools/chatgpt/) is easier when image generation is just one part of a broader assistant subscription.
>
> **Who pays which tier:** BFL direct for first-party FLUX.2 API and Playground access; FLUX.2 [klein] 4B for permissive local/commercial experiments; FLUX.2 [dev], FLUX.2 [klein] 9B, and FLUX.1 Kontext [dev] only for non-commercial or licensed commercial use; fal.ai or Replicate when you prefer hosted provider ergonomics and their pricing units fit your workload.

## Key Facts

| | |
|---|---|
| **Current generation** | FLUX.2 [max] · FLUX.2 [pro] · FLUX.2 [flex] · FLUX.2 [klein] · FLUX.2 [dev] |
| **Open-weight models** | FLUX.2 [klein] 4B / 4B Base (Apache 2.0) · FLUX.2 [klein] 9B variants (non-commercial) · FLUX.2 [dev] 32B (non-commercial) · FLUX.1 dev variants (non-commercial) · FLUX.1 [schnell] (Apache 2.0) |
| **Editing model family** | FLUX.2 supports generation and editing; FLUX.1 Kontext remains the previous-generation context-aware editor |
| **Legacy API** | FLUX1.1 [pro] · FLUX1.1 [pro] Ultra / Raw · FLUX.1 Fill [pro] |
| **Multi-reference** | FLUX.2 supports multi-reference workflows; BFL docs list up to 8-10 references depending on model/API vs Playground, and Klein/Workers AI routes have lower limits |
| **Native resolution** | Up to 4 megapixels for FLUX.2 generation and editing |
| **Text rendering** | Improved in FLUX.2; Flex is BFL's typography/control-oriented variant |
| **API access points** | BFL API/Playground · fal.ai · Replicate · Cloudflare Workers AI · other partner platforms |
| **Consumer app** | BFL Playground exists for testing, but no simple consumer subscription app like Midjourney |
| **Release dates** | FLUX.2 family Nov. 25, 2025 · FLUX.2 [klein] Jan. 15, 2026 |

Every data point above was verified against vendor sources on 2026-05-13. See Sources.

## What it actually is

A set of diffusion / flow-matching image models sold through APIs and, for selected variants, distributed as open weights. BFL's about page says its founding team includes pioneers of Latent Diffusion and Stable Diffusion; the Flux product strategy still reflects that heritage: closed/API models for production, open-weight models for development and research, and smaller permissive variants where BFL is comfortable with commercial local deployment.

The architecture described for FLUX.2 combines a 32B rectified-flow transformer with a Mistral-3 24B vision-language model. That matters because FLUX.2 is no longer just a text-to-image line: the current generation supports image editing, reference images, color prompting, and higher-resolution production workflows.

The moats:

- **Open-weight ladder.** FLUX.2 [klein] 4B gives a permissive Apache 2.0 local route, while FLUX.2 [dev] and the 9B Klein variants remain available for non-commercial or licensed work.
- **Editing and reference workflows.** FLUX.2's multi-reference editing and FLUX.1 Kontext's instruction-editing path make Flux more than a prompt-to-image model.
- **Provider choice.** BFL direct, fal.ai, Replicate, Cloudflare Workers AI, and local tooling let teams pick based on latency, price, licensing, controls, and deployment preference.
- **LoRA and ComfyUI ecosystem.** Hugging Face, Civitai, Diffusers, and ComfyUI keep Flux useful for custom characters, products, and styles.

## When to pick Flux

- **You are an engineer building image gen into a product.** FLUX.2 Pro, Max, Flex, or Klein via API gives predictable pay-as-you-go access, reference-image workflows, and up to 4MP output.
- **You need local or self-hosted experimentation.** FLUX.2 [klein] 4B is the cleanest permissive local route. FLUX.2 [dev], FLUX.2 [klein] 9B, and FLUX.1 Kontext [dev] need non-commercial use or commercial licensing.
- **You need instruction-based edits with identity or product preservation.** Compare FLUX.2 reference editing and FLUX.1 Kontext. "Change the background but keep the same person/product" is the canonical use case.
- **You fine-tune characters, products, or styles.** The Flux LoRA ecosystem on Civitai and Hugging Face beats everything outside legacy SD.
- **You want literal production output without Midjourney's stylistic prior.** Flux reads more like an API production engine; useful for product photography, e-commerce lifestyle shots, and any work where "a red door" must be the red door you described.

## When to pick something else

- **Default aesthetic polish with zero setup:** [Midjourney](/tools/midjourney/). Wins on out-of-the-box composition and color.
- **Browser-first typography and posters:** [Ideogram](/tools/ideogram/). Easier first test when the whole job is text-heavy graphics in a consumer UI.
- **You already pay for a chat subscription and don't want a separate image bill:** [ChatGPT](/tools/chatgpt/)'s image tools. Bundled, no API integration work.
- **The legacy open-source ecosystem (SDXL checkpoints, ControlNet zoo):** [Stable Diffusion](/tools/stable-diffusion/). Larger historical checkpoint library and broader older workflow support.
- **Free-tier-friendly web app for beginners:** [Leonardo](/tools/leonardo/). Better onboarding than raw Flux; less power.

## Pricing

Flux is priced per image, per megapixel, or per provider-specific billing unit. The same model name can have different rates and controls on BFL, fal.ai, Replicate, Cloudflare, or a local stack. Best viewed as API-first: pick the host that matches your workload, then confirm the endpoint's current model card before committing budget.

**Black Forest Labs direct API** (credits-based, 1 credit = $0.01):

| Model | Approx price | Notes |
|---|---|---|
| FLUX.2 [klein] 4B | from $0.014 / image | Base first-MP price, then small per-MP add-on |
| FLUX.2 [klein] 9B | from $0.015 / image | Higher-quality Klein route, non-commercial open-weight license |
| FLUX.2 [pro] | from $0.03/MP text-to-image; from $0.045/MP editing | Production balance |
| FLUX.2 [max] | from $0.07/MP | Highest-quality/grounding-oriented FLUX.2 route |
| FLUX.2 [flex] | from $0.06/MP text-to-image; from $0.12/MP editing | Typography and fine-grained control |
| FLUX.2 [dev] | Free for local non-commercial development | Commercial local use requires a license |
| FLUX.1 Kontext [pro] / [max] | $0.04 / $0.08 per image | Previous-generation context-aware editing |
| FLUX1.1 [pro] Ultra / Raw | $0.06 per image | Legacy high-resolution/candid-photo options |

**fal.ai** (`fal.ai/flux-2`):

| Model | Price |
|---|---|
| FLUX.2 [dev] | $0.012/MP |
| FLUX.2 [pro] | $0.030/MP |
| FLUX.2 [flex] | $0.050/MP |
| FLUX.2 [max] Edit | $0.070/MP |
| FLUX.2 LoRA training | $0.008 per training step |

**Replicate** (`replicate.com/black-forest-labs`):

| Model | Price |
|---|---|
| FLUX.2 [pro] | $0.015 + $0.015 per input/output megapixel, per Replicate's launch post |
| FLUX.2 [flex] | $0.06 per input/output megapixel, per Replicate's launch post |
| FLUX.2 [dev] | $0.012 per input/output megapixel, per Replicate's launch post |
| FLUX1.1 [pro] | $0.04 / output image on Replicate pricing page |
| FLUX.1 [dev] | $0.025 / output image on Replicate pricing page |
| FLUX.1 [schnell] | $3 / 1,000 output images on Replicate pricing page |

**Cloudflare Workers AI:** Cloudflare has hosted FLUX.2 [dev] and FLUX.2 [klein] 4B routes; the Workers AI changelog notes lower platform-specific input limits and fixed-step behavior on Klein. Use Cloudflare's model/pricing page for production budgets.

**Self-hosted** (open weights): $0 API runtime, hardware and licensing cost only. FLUX.2 [klein] 4B and 4B Base are Apache 2.0. FLUX.2 [dev], FLUX.2 [klein] 9B variants, FLUX.1 [dev], and FLUX.1 Kontext [dev] are non-commercial unless you have a commercial license from BFL.

Prices verified 2026-05-13 via [BFL pricing](https://docs.bfl.ai/quick_start/pricing), [BFL model overview](https://help.bfl.ai/articles/9364115800-flux-models-overview), [fal.ai FLUX.2](https://fal.ai/flux-2), and [Replicate](https://replicate.com/blog/run-flux-2-on-replicate/). Provider rates move; check the source before committing a production budget.

## Against the alternatives

| | Flux | Midjourney | Stable Diffusion ecosystem |
|---|---|---|---|
| **Photoreal quality** | Strong API/local production route | Strong, stylized prior | Depends heavily on checkpoint/workflow |
| **Stylized output** | Literal; needs LoRAs for style | Strongest default aesthetic | Deep community style checkpoints |
| **Open weights** | Yes, but licenses differ by variant | None | Yes (long lineage) |
| **API cost** | Hosted rates vary by BFL/fal/Replicate/provider | Subscription/app workflow | Varies by host |
| **Text rendering** | FLUX.2 Flex/Pro improve typography | Improving, still workflow-dependent | Usually needs model/workflow tuning |
| **Instruction editing** | FLUX.2 references and FLUX.1 Kontext | App-level tools | Inpainting/control workflows |
| **Consumer UI** | Playground plus third-party UIs | Polished web + community workflow | Many third-party |
| **Best viewed as** | API-first engine + open-weight base | Consumer aesthetic tool | Legacy open ecosystem |

## Failure modes

- **No simple consumer subscription app from BFL.** The Playground is useful for testing, but production buyers still need the API, ComfyUI, or a third-party front-end. Not a friction Midjourney users face.
- **Self-hosting still requires real technical skill.** FLUX.2 [dev] is a 32B model, and even Klein workflows require model files, GPU planning, ComfyUI/Diffusers setup, VRAM management, and CUDA troubleshooting.
- **Editing and reference workflows still need retries.** Character/product consistency is the point of Flux, but it can still break on occlusion, extreme poses, crowded references, or prompts that ask for too much at once.
- **Prompt syntax differs per provider.** BFL, Replicate, fal, and Cloudflare each have slightly different parameter names and default settings. Prompts that work identically across all hosts are rare; expect provider-specific tuning.
- **Typography is model-specific.** FLUX.2 Flex is the BFL variant to test for text-heavy output, but web-first typography buyers should still compare [Ideogram](/tools/ideogram/) before committing.
- **Licensing tree is a thicket.** FLUX.2 [klein] 4B and 4B Base are Apache 2.0. FLUX.2 [dev], FLUX.2 [klein] 9B variants, FLUX.1 Dev, and FLUX.1 Kontext Dev are non-commercial unless you have a BFL commercial license. Pro/Flex/Max/Ultra/Kontext API use commercial terms through the provider. Read the license before shipping.
- **Base model cadence depends on BFL.** Unlike SD's large independent trainer community, Flux base-model updates come from Black Forest Labs only. No community 2.x lineage forking.
- **Provider pricing moves.** BFL, fal.ai, Replicate, and Cloudflare publish different pricing units and limits. Quoted figures here are current to the verification date.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-05-13 against Black Forest Labs, BFL documentation/help pages, Hugging Face model cards, GitHub repositories, fal.ai, Replicate, and Cloudflare Workers AI documentation.

## FAQ

**Is Flux free?**
Some Flux routes are free to run locally, but the answer depends on the exact model. FLUX.2 [klein] 4B and 4B Base are Apache 2.0 and can be used commercially without a BFL self-hosting license. FLUX.2 [dev], FLUX.2 [klein] 9B variants, FLUX.1 Dev, and FLUX.1 Kontext Dev are non-commercial unless you have a commercial license. Hosted FLUX.2 Pro/Max/Flex/Klein and FLUX.1 Kontext Pro/Max are paid API/Playground routes.

**What is Flux Kontext?**
FLUX.1 Kontext is BFL's context-aware image-generation and editing family. Give it an input image and a text instruction ("put the man in a red jacket," "change the background to a beach") and it tries to edit while preserving the subject or product. BFL lists Kontext [dev] as open-weight/non-commercial, Kontext [pro] at $0.04/image, and Kontext [max] at $0.08/image.

**What is the difference between Flux.2 variants?**
Max is BFL's highest-quality FLUX.2 route. Pro is the production balance. Flex is the control/typography-focused route with adjustable steps and guidance. Klein is the fast compact family; its 4B variants are Apache 2.0, while the 9B variants are non-commercial. Dev is the 32B open-weight model for local/non-commercial development unless licensed.

**Where should I run Flux?**
BFL direct for first-party API, Playground, and support. fal.ai for developer-friendly hosted FLUX.2 pricing and LoRA training endpoints. Replicate for mixed-model workflows and official model ergonomics. Cloudflare Workers AI when you already build on Cloudflare and can accept its model-specific limits. Self-host only when the license and hardware fit the exact variant.

**Does Flux render text in images?**
FLUX.2 improves text rendering, and BFL positions Flex as the strongest control/typography variant. Still, if the entire job is posters, logos, and text-first web creative, compare [Ideogram](/tools/ideogram/) before standardizing on Flux.

**How does Flux compare to Midjourney?**
Midjourney wins default aesthetic polish and ease of use. Flux wins when the buyer needs API control, open-weight/local routes, reference editing, and provider choice. Many teams use both: Midjourney for exploration, Flux for production workflows.

## Related

- **Category:** [AI Image](/categories/ai-image/)
- **Compare:** [Midjourney](/tools/midjourney/) · [Ideogram](/tools/ideogram/) · [Stable Diffusion](/tools/stable-diffusion/) · [Leonardo](/tools/leonardo/) · [ChatGPT](/tools/chatgpt/)

## Sources

- [Black Forest Labs official site](https://bfl.ai) (verified 2026-05-13)
- [Black Forest Labs about page](https://bfl.ai/about) (verified 2026-05-13)
- [BFL FLUX models overview](https://help.bfl.ai/articles/9364115800-flux-models-overview) (verified 2026-05-13)
- [BFL FLUX.2 pricing](https://docs.bfl.ai/quick_start/pricing) (verified 2026-05-13)
- [BFL licensing overview](https://help.bfl.ai/articles/9272590838-self-serve-dev-license-overview-pricing) (verified 2026-05-13)
- [FLUX.2 model page](https://bfl.ai/models/flux-2) (verified 2026-05-13)
- [FLUX.2 Klein model page](https://bfl.ai/models/flux-2-klein) (verified 2026-05-13)
- [FLUX.2 GitHub repo](https://github.com/black-forest-labs/flux2) (verified 2026-05-13)
- [FLUX.2 Klein 4B on Hugging Face](https://huggingface.co/black-forest-labs/FLUX.2-klein-4B) (verified 2026-05-13)
- [fal.ai FLUX.2](https://fal.ai/flux-2) (verified 2026-05-13)
- [Replicate: Run FLUX.2](https://replicate.com/blog/run-flux-2-on-replicate/) (verified 2026-05-13)
- [Replicate pricing](https://replicate.com/pricing) (verified 2026-05-13)
- [Cloudflare Workers AI changelog](https://developers.cloudflare.com/changelog/product-group/ai/3/) (verified 2026-05-13)
