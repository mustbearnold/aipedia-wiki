---
type: tool
slug: wan
title: Wan
tagline: "Alibaba's Wan video model family: Wan 2.7/2.6 in Model Studio and provider APIs, plus Wan 2.2 Apache 2.0 open weights."
category: ai-video
company: Alibaba Cloud / Tongyi Lab
url: https://wan.video
pricing_model: freemium
price_range: "$0 self-host; API roughly $0.02-$0.15/sec by route"
status: active
launched: 2025-02
last_updated: 2026-05-08
last_verified: 2026-05-08
update_frequency: weekly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 8
  moat: 8
  longevity: 8
facts:
  best_for:
    value: "Developers, researchers, and video teams that specifically want Wan open weights, Alibaba Cloud Model Studio deployment, or low-cost provider/API experimentation."
    source: "https://www.alibabacloud.com/help/en/model-studio/video-generate-edit-model/"
    source_label: "Alibaba Cloud Wan video docs"
    source_id: wan-model-studio-video-docs
    verified_at: 2026-05-08
    next_review_at: 2026-06-08
    volatility: high
    confidence: high
  current_model_route:
    value: "Alibaba Cloud's video generation guide points buyers to wan2.7-t2v, wan2.7-i2v, wan2.7-r2v, and wan2.7-videoedit for synchronized audio, 1080P output, references, and editing, while Wan 2.6 has broader pricing/deployment tables."
    source: "https://www.alibabacloud.com/help/en/model-studio/video-generate-edit-model/"
    source_label: "Alibaba Cloud Wan video docs"
    source_id: wan-model-studio-video-docs
    verified_at: 2026-05-08
    next_review_at: 2026-06-08
    volatility: high
    confidence: high
  open_weights:
    value: "Wan2.2 remains the key open-weights route, with T2V, I2V, TI2V, S2V, and Animate checkpoints in the official GitHub and Hugging Face organization under Apache 2.0 terms."
    source: "https://github.com/Wan-Video/Wan2.2"
    source_label: "Wan2.2 GitHub"
    source_id: wan2-2-github
    verified_at: 2026-05-08
    next_review_at: 2026-08-08
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Alibaba Cloud Model Studio publishes Wan route pricing by deployment region, resolution, audio mode, and model. Wan 2.6 is commonly listed around $0.10/s at 720P and $0.15/s at 1080P in international/US routes; cheaper flash/no-audio routes exist."
    source: "https://www.alibabacloud.com/help/en/model-studio/model-pricing"
    source_label: "Alibaba Cloud Model Studio pricing"
    source_id: wan-model-studio-pricing
    verified_at: 2026-05-08
    next_review_at: 2026-06-08
    volatility: high
    confidence: high
  provider_wan_27:
    value: "fal.ai lists Wan 2.7 text-to-video, image-to-video, reference-to-video, and edit-video endpoints at $0.10 per second; treat this as provider-specific pricing, not universal Wan pricing."
    source: "https://fal.ai/wan-2.7"
    source_label: "fal.ai Wan 2.7"
    source_id: fal-wan-27
    verified_at: 2026-05-08
    next_review_at: 2026-06-08
    volatility: high
    confidence: medium
  watch_out_for:
    value: "Wan access, pricing, data residency, audio support, duration, and rights vary by route: wan.video, Alibaba Cloud Model Studio region, fal.ai, Replicate, Together, WaveSpeed, Hugging Face, and local self-hosting are not interchangeable."
    source: "https://www.alibabacloud.com/help/en/model-studio/models"
    source_label: "Alibaba Cloud Model Studio models"
    source_id: wan-model-studio-models
    verified_at: 2026-05-08
    next_review_at: 2026-06-08
    volatility: high
    confidence: high
tags: [ai-video, video-generation, text-to-video, image-to-video, alibaba, wan, tongyi, qwen, open-weights, model-studio]
seo_title: "Wan Review: Pricing, Models, Open Weights & Best Uses (May 2026)"
meta_description: "Wan is Alibaba's AI video model family: Wan 2.7/2.6 through Model Studio and providers, plus Wan 2.2 Apache 2.0 open weights. Updated May 8, 2026."
author: "aipedia.wiki Editorial"
best_for:
  - open-weights video research and self-hosting with Wan2.2
  - Alibaba Cloud Model Studio video generation
  - low-cost API experiments where per-second pricing matters
  - teams testing reference-to-video, image-to-video, and video editing routes
not_best_for:
  - buyers who want the easiest finished production workspace
  - teams that need one consistent consumer subscription and simple plan math
  - US-only or EU-only data handling without region-by-region review
  - claims that require a current controlled benchmark against Seedance, Kling, Veo, and Runway
quick_answer: >-
  Wan is worth testing when you need Alibaba's video model family, Wan2.2 open weights, or a cheaper API route. It is not AiPedia's default pick for most creators: test Seedance 2.0, Kling 3.0, and Veo 3.1 for raw model quality, and use Runway when the job is shipping finished video. Verify the exact Wan route before paying because model version, pricing, audio, region, rights, and duration vary by provider.
price_history:
  - date: 2025-07-28
    plan: "Wan2.2 open weights"
    price: "$0 + GPU/self-hosting cost"
    source: "https://github.com/Wan-Video/Wan2.2"
    source_label: "Wan2.2 GitHub"
    source_id: wan2-2-github
    note: "Official repo lists model weights and Apache 2.0 license terms for Wan2.2"
  - date: 2026-04-23
    plan: "Alibaba Cloud Model Studio Wan 2.6 routes"
    price: "$0.10/s 720P and $0.15/s 1080P on common international/US routes; flash/no-audio and regional routes vary"
    source: "https://www.alibabacloud.com/help/en/model-studio/model-pricing"
    source_label: "Alibaba Cloud Model Studio pricing"
    source_id: wan-model-studio-pricing
    note: "Pricing depends on deployment mode, resolution, audio mode, and exact model"
  - date: 2026-05-08
    plan: "fal.ai Wan 2.7"
    price: "$0.10/second"
    source: "https://fal.ai/wan-2.7"
    source_label: "fal.ai Wan 2.7"
    source_id: fal-wan-27
    note: "Provider-specific price for Wan 2.7 endpoints, not universal Alibaba Cloud pricing"
---

# Wan

Wan is Alibaba's AI video model family. It matters for two reasons: **Wan2.2 is one of the strongest open-weights video routes**, and Alibaba Cloud Model Studio now exposes multiple Wan video generation/editing routes for teams that can work with Alibaba Cloud or API providers.

It should not be treated as a simple "best AI video generator" for normal creators. Wan is a route to test, not a one-click buyer default.

## System Verdict

> **Pick Wan if open weights, Alibaba Cloud, provider API cost, or Wan-specific reference/editing routes are the point.** Wan2.2 gives technical teams a real Apache 2.0 self-hosting path. Alibaba Cloud's current docs point to Wan 2.7 routes for synchronized audio, 1080P, 15-second clips, reference video, and video editing.
>
> **Skip Wan as your first purchase if you want the easiest product for finished videos.** Start with [Runway](/tools/runway/) for production workflow. Test [Seedance 2.0](/tools/seedance/), [Kling 3.0](/tools/kling/), and [Veo 3.1](/tools/veo/) first when raw model quality is the only question.
>
> **The buyer risk is route confusion.** Wan on wan.video, Alibaba Cloud Model Studio, fal.ai, Replicate, Together, WaveSpeed, Hugging Face, and local self-hosting can mean different model versions, prices, data handling, rights, audio support, duration caps, and reliability.

## Key Facts

- **Current high-end route:** Alibaba Cloud's video model guide names `wan2.7-t2v`, `wan2.7-i2v`, `wan2.7-r2v`, and `wan2.7-videoedit`.
- **Open-weights route:** Wan2.2 on GitHub and Hugging Face, including T2V, I2V, TI2V-5B, S2V, and Animate checkpoints.
- **Best use:** technical video teams, researchers, self-hosters, and API builders who can test route-by-route.
- **Not the best use:** nontechnical creators who want one polished editor, simple plan tiers, and predictable export workflow.
- **Pricing anchor:** Wan2.2 can be self-hosted; Alibaba Cloud pricing varies by region/resolution/model; fal.ai lists Wan 2.7 at $0.10/second.
- **Main watch-out:** "Wan 2.7" on a provider page does not automatically mean the same availability, support, rights, or pricing as Alibaba Cloud Model Studio.

## What It Actually Is

Wan is not one product. It is a family with several buyer routes:

- **Open model route:** Wan2.2 via GitHub, Hugging Face, ModelScope, and local/hosted inference workflows.
- **Alibaba Cloud route:** Model Studio video generation, image-to-video, reference-to-video, and editing models with region-specific pricing and deployment modes.
- **Provider route:** third-party inference vendors such as fal.ai and other model API marketplaces that expose specific Wan variants.
- **Consumer/demo route:** wan.video and Qwen-adjacent surfaces where availability and limits can differ from API routes.

That split is useful, but it also makes procurement messy. A serious buyer should write down the exact route they are evaluating, then test that exact route with the same prompt set used against Seedance, Kling, Veo, and Runway.

## When To Pick Wan

- **You need open weights.** Wan2.2 remains the reason Wan belongs in the shortlist. The official repo lists Apache 2.0 model terms and the Wan-AI Hugging Face organization hosts the checkpoint family.
- **You are already evaluating Alibaba Cloud.** Model Studio has official Wan documentation, pricing tables, and deployment-region language that procurement teams can inspect.
- **You need lower-cost API iteration.** Wan routes can be materially cheaper than premium video subscriptions when your workflow is automated, but only after you calculate seconds, retries, failed generations, audio, resolution, and provider margin.
- **You want reference-to-video or editing experiments.** Alibaba's current video guide points buyers to Wan 2.7 routes for references and video editing.
- **You can benchmark yourself.** Wan is strongest in the hands of teams that compare exact model routes, settings, and output costs.

## When To Pick Something Else

- **Most creators:** start with [Runway](/tools/runway/) if you need a product that helps you generate, edit, store, export, and ship.
- **Raw model testing:** compare [Seedance 2.0](/tools/seedance/), [Kling 3.0](/tools/kling/), and [Veo 3.1](/tools/veo/) before assuming Wan is the winner.
- **Google/API governance:** use [Veo](/tools/veo/) if Gemini API, Vertex AI, SynthID/provenance expectations, or Google procurement matter.
- **Budget social effects:** use [Pika](/tools/pika/) if playful creator effects and short social clips matter more than model/provider control.
- **Avatar video:** use [HeyGen](/tools/heygen/) or [Synthesia](/tools/synthesia/) for presenters, training, localization, and business video.

## Pricing And Access

Wan pricing cannot be summarized as one plan table without misleading people.

**Wan2.2 open weights:** self-hosting starts at $0 license cost, but GPU, storage, engineering time, orchestration, and moderation are real costs. The open route is best for teams that already know how to run video models.

**Alibaba Cloud Model Studio:** official pricing is route-specific. As of May 8, 2026, Alibaba Cloud pricing pages list Wan 2.6 text-to-video and image-to-video routes around $0.10/second at 720P and $0.15/second at 1080P in common international/US routes, with cheaper flash/no-audio routes and different regional prices.

**fal.ai Wan 2.7:** fal.ai lists Wan 2.7 text-to-video, image-to-video, reference-to-video, and editing endpoints at $0.10/second. Treat that as fal.ai pricing and terms, not a universal Wan price.

Before buying or building, verify:

- exact model id
- provider and deployment region
- output duration and frame rate
- audio support
- 720P/1080P cost
- failed-generation billing
- commercial rights
- data retention and training policy
- rate limits and SLA

## Against The Alternatives

**Wan vs Seedance:** Seedance 2.0 is the cleaner raw model test for most buyers right now. Wan is more attractive when open weights, Alibaba Cloud, or provider API economics matter.

**Wan vs Kling:** Kling 3.0 is easier to recommend to creators testing cinematic output and value. Wan is more technical and more route-dependent.

**Wan vs Veo:** Veo 3.1 is the cleaner Google/API/provenance route. Wan may be cheaper or more flexible in some provider setups, but procurement and data handling need closer review.

**Wan vs Runway:** Runway is a production workspace. Wan is a model/API family. Use Runway to ship; use Wan when you have a technical reason to control the model route.

## Failure Modes

- **Version confusion.** Wan2.2, Wan2.5, Wan2.6, and Wan2.7 are not interchangeable.
- **Provider drift.** fal.ai, Alibaba Cloud, Replicate, Together, WaveSpeed, and other routes can expose different endpoints, limits, prices, and rights.
- **Benchmark overclaiming.** A good Wan output from one provider does not prove Wan is the best model across all prompts.
- **Region and data-policy risk.** Alibaba Cloud deployment modes have region-specific behavior; US/EU procurement needs legal review.
- **Credit math mistakes.** Per-second pricing looks simple until retries, failed generations, 1080P, audio, and long prompt iteration are included.
- **Open weights are not free operations.** Self-hosting replaces subscription spend with GPU, engineering, moderation, and maintenance costs.

## Methodology

AiPedia refreshed this page on May 8, 2026 using current primary sources: Alibaba Cloud Model Studio video docs, Alibaba Cloud pricing/model docs, the official Wan2.2 GitHub repo, Wan-AI Hugging Face, wan.video, and fal.ai's provider page for Wan 2.7. Scores reflect buyer usefulness, not just model excitement. Wan's score was reduced from the old near-frontier profile because route complexity, provider variance, and procurement uncertainty make it less suitable as a default recommendation than Seedance, Kling, Veo, or Runway for many readers.

## FAQ

**Is Wan free?**
Wan2.2 can be self-hosted under Apache 2.0 terms, so there is no model subscription fee for that route. Running it still costs GPU time, storage, engineering, and maintenance. Hosted Wan routes are paid.

**Is Wan 2.7 official?**
Alibaba Cloud's current video generation guide refers to `wan2.7` routes for text-to-video, image-to-video, reference-to-video, and editing. Pricing and exact access still need route-by-route verification because Alibaba Cloud pricing tables and provider pages do not always expose the same model set in the same way.

**Should creators use Wan before Runway?**
Usually no. Runway is better when the goal is a finished video workflow. Wan is better when the user specifically wants model/API control, open weights, Alibaba Cloud, or low-cost experimentation.

**What should I compare Wan against?**
For raw model quality, test Wan against Seedance 2.0, Kling 3.0, and Veo 3.1. For workflow, compare Wan-backed generation against Runway. For avatar video, compare against HeyGen and Synthesia instead.

## Sources

- [Wan official site](https://wan.video) (verified 2026-05-08)
- [Alibaba Cloud Wan video generation and editing docs](https://www.alibabacloud.com/help/en/model-studio/video-generate-edit-model/) (verified 2026-05-08)
- [Alibaba Cloud Model Studio pricing](https://www.alibabacloud.com/help/en/model-studio/model-pricing) (verified 2026-05-08)
- [Alibaba Cloud Model Studio models](https://www.alibabacloud.com/help/en/model-studio/models) (verified 2026-05-08)
- [Wan2.2 GitHub repository](https://github.com/Wan-Video/Wan2.2) (verified 2026-05-08)
- [Wan-AI on Hugging Face](https://huggingface.co/Wan-AI) (verified 2026-05-08)
- [fal.ai Wan 2.7](https://fal.ai/wan-2.7) (verified 2026-05-08)

## Related

- **Category:** [AI Video Generation](/categories/ai-video/)
- **Guide:** [Best AI Video Generator](/guides/best-ai-video-generator/)
- **Comparison:** [Runway vs Kling vs Seedance vs Veo](/compare/kling-vs-seedance-vs-runway/)
- **Alternatives:** [Seedance 2.0](/tools/seedance/) · [Kling 3.0](/tools/kling/) · [Google Veo 3.1](/tools/veo/) · [Runway](/tools/runway/) · [Pika](/tools/pika/)
