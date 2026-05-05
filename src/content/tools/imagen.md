---
type: tool
slug: imagen
title: Imagen 4
tagline: Google DeepMind's flagship text-to-image model. Served through the Gemini app, Google AI Studio, the Gemini API, and Vertex AI.
category: ai-image
company: Google DeepMind
url: https://gemini.google.com
pricing_model: freemium
price_range: "$0-$249.99/month"
status: active
launched: 2025-05
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
  value: 8
  moat: 7
  longevity: 8
facts:
  best_for:
    value: Best for teams that want Google’s high-end image generation/editing models through Gemini or Vertex AI production
      surfaces.
    source: https://deepmind.google/models/imagen/
    source_label: Google DeepMind Imagen
    source_id: imagen-official
    verified_at: '2026-05-04'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
  pricing_anchor:
    value: Imagen costs are tied to Google generative AI/Vertex AI image-generation pricing; verify current per-image/model
      pricing before launch.
    source: https://cloud.google.com/vertex-ai/generative-ai/pricing
    source_label: Vertex AI generative AI pricing
    source_id: imagen-vertex-pricing
    verified_at: '2026-05-04'
    volatility: high
    confidence: high
    next_review_at: '2026-08-04'
  api_available:
    value: Vertex AI image docs define production image generation and editing behavior, model parameters, safety filters, and
      API setup.
    source: https://cloud.google.com/vertex-ai/generative-ai/docs/image/overview
    source_label: Vertex AI image generation docs
    source_id: imagen-vertex-docs
    verified_at: '2026-05-04'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
  model_control:
    value: Gemini API image-generation docs are a separate developer surface and should be checked for current model names and
      multimodal workflow support.
    source: https://ai.google.dev/gemini-api/docs/image-generation
    source_label: Gemini API image generation docs
    source_id: imagen-gemini-docs
    verified_at: '2026-05-04'
    volatility: high
    confidence: high
    next_review_at: '2026-08-04'
  watch_out_for:
    value: Compare Imagen by exact model/version, safety policy, editing controls, watermark/provenance behavior, regional availability,
      and Cloud account requirements.
    source: https://cloud.google.com/vertex-ai/generative-ai/docs/image/overview
    source_label: Vertex AI image generation docs
    source_id: imagen-vertex-docs
    verified_at: '2026-05-04'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
tags: [ai-image, image-generation, google, gemini, deepmind, vertex-ai, ai-studio]
seo_title: "Imagen 4: Features, Pricing & Review (April 2026)"
meta_description: "Imagen 4 is Google's text-to-image model. Ships in Fast / Standard / Ultra tiers through the Gemini app, Google AI Studio (free testing), the Gemini API ($0.02-$0.06 per image), and Vertex AI. Review for April 2026."
author: "aipedia.wiki Editorial"
best_for:
  - Google Workspace users generating visuals inside Docs and Slides
  - developers wanting pay-per-image API access
  - enterprise production via Vertex AI
  - in-image text rendering for signage and typography
not_best_for:
  - aesthetic-quality leadership (Midjourney still wins)
  - open weights or self-hosting
  - uncensored or edgy content
quick_answer: >-
  Imagen 4 is Google's flagship image model, served through the Gemini app, Google AI Studio, the Gemini API, and Vertex AI. It ships in Fast, Standard, and Ultra tiers at $0.02, $0.04, and $0.06 per image on the API. Pick it for Google-stack workflows; skip it if aesthetic ceiling or open weights matter more.
price_history:
  - date: 2026-04-17
    plan: "Gemini API"
    price: "$0.02-$0.06 per image"
    source: "https://cloud.google.com/vertex-ai/generative-ai/pricing"
    source_label: "Source"
    source_id: imagen-pricing
    note: "Fast / Standard / Ultra tiers verified on ai.google.dev"
  - date: 2026-04-17
    plan: "Google AI Pro"
    price: "$19.99/mo"
    source: "https://cloud.google.com/vertex-ai/generative-ai/pricing"
    source_label: "Source"
    source_id: imagen-pricing
    note: "Consumer bundle with Gemini 3.1 Pro, 2TB storage, verified"
---

# Imagen 4

Google DeepMind's current flagship text-to-image model. Served through four surfaces: the consumer [Gemini](/tools/gemini/) app, Google AI Studio for free testing, the Gemini API for developers, and Vertex AI for enterprise production.

The model ships in three tiers: **Fast**, **Standard**, and **Ultra**. API pricing runs $0.02, $0.04, and $0.06 per image. Every output carries a SynthID watermark for provenance.

## System Verdict

> **Pick Imagen 4 if your workflow lives inside Google's stack.** Native generation inside Docs, Slides, and Gmail removes the copy-paste step that breaks momentum in Workspace-heavy teams. Developers get predictable per-image pricing through the Gemini API with no subscription required. Vertex AI covers enterprise with SLAs, SSO, and adjustable safety filters.
>
> **Skip it if you need aesthetic ceiling.** [Midjourney](/tools/midjourney/) still beats Imagen 4 on cinematic and stylized output. [Flux](/tools/flux/) beats it on open weights and LoRA fine-tuning. [Ideogram](/tools/ideogram/) beats it on dense text-in-image reliability for logos and posters.
>
> **Who pays which tier:** Google AI Studio free for experimentation, Gemini API pay-per-image for low-volume apps, Google AI Pro $19.99/mo for individuals using Gemini 3.1 Pro + Imagen 4 in Workspace, Google AI Ultra $249.99/mo for teams running Veo 3.1 video alongside image generation, Vertex AI for production with compliance needs.

## Key Facts

| | |
|---|---|
| **Model family** | Imagen 4 Fast · Imagen 4 Standard · Imagen 4 Ultra |
| **API pricing** | Fast $0.02 · Standard $0.04 · Ultra $0.06 per image |
| **Resolutions** | Up to 2K standard · 4K on Ultra via token-metered output |
| **Free testing** | Google AI Studio playground (capped daily) |
| **Consumer bundle** | Google AI Pro $19.99/mo · Google AI Ultra $249.99/mo |
| **Enterprise** | Vertex AI with Google Cloud billing, SSO, audit |
| **Watermark** | SynthID embedded in every output |
| **Text rendering** | Materially improved over Imagen 3 for signage and typography |
| **Open weights** | None |
| **Best-in-class for** | Workspace-embedded generation, per-image API billing |

Every data point was verified against vendor documentation on 2026-04-17. See Sources.

## What it actually is

One image model served through four entry points. Consumer users hit it through the Gemini app and get Imagen 4 generations bundled with Gemini 3.1 Pro on [Google AI Pro](https://gemini.google/subscriptions/) ($19.99/mo) or Ultra ($249.99/mo).

Developers access the same model through `ai.google.dev` (Gemini API) at per-image rates, or through AI Studio's browser playground for free testing. Enterprise runs through Vertex AI, where Imagen 4 usage appears as line items on the Google Cloud bill alongside inference, storage, and logging.

The moat is integration depth. No other image model ships native inside Docs, Slides, Gmail, and Sheets. The Ultra tier also leans into 4K output, which matters for print and large-format signage that Midjourney and Flux still require an upscale pass to reach.

## When to pick Imagen 4

- **You work in Google Workspace every day.** Generating inside Slides without export-reimport is the killer feature.
- **You need predictable per-image API billing.** Fast at $0.02 is the cheapest tier among major closed models for prototype apps.
- **You need in-image text for signage, packaging, or vintage-style ads.** Imagen 4 materially improved over Imagen 3 on legibility.
- **You need SynthID provenance.** Every output carries an embedded watermark, which matters for news and regulated publishing.
- **You need Vertex AI for production.** Google Cloud compliance, SLAs, and adjustable safety filters beat consumer endpoints for enterprise workloads.

## When to pick something else

- **Maximum aesthetic quality for cinematic, stylized, or illustrative work:** [Midjourney](/tools/midjourney/). Still the reference point for visual polish.
- **Open weights, LoRA fine-tuning, or self-hosting:** [Flux](/tools/flux/). Imagen 4 offers none of those.
- **Dense text rendering for logos and posters:** [Ideogram](/tools/ideogram/) remains the safer pick for text-critical production.
- **Image generation bundled with a chat assistant you already pay for:** GPT Image 2 inside [ChatGPT](/tools/chatgpt/).
- **Video generation alongside images:** [Runway](/tools/runway/) for production control, or Veo 3.1 inside [Gemini](/tools/gemini/) Ultra.

## Pricing

Consumer subscription pricing via [gemini.google/subscriptions](https://gemini.google/subscriptions/):

| Plan | Price | What you get |
|------|-------|---------------|
| Gemini (free) | $0 | Limited daily Imagen 4 generations in the Gemini app |
| Google AI Pro | $19.99/mo | Gemini 3.1 Pro, Imagen 4 at consumer limits, 2TB storage |
| Google AI Ultra | $249.99/mo | Max Gemini 3.1 Pro, Veo 3.1 video, 30TB storage, Project Mariner |

API and enterprise pricing via [ai.google.dev/gemini-api/docs/models/imagen](https://ai.google.dev/gemini-api/docs/models/imagen) and [cloud.google.com/vertex-ai/generative-ai/pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing):

| Tier | Per-image | Typical use |
|------|-----------|-------------|
| Imagen 4 Fast | $0.02 | Prototype apps, high volume at lower fidelity |
| Imagen 4 Standard | $0.04 | Production default |
| Imagen 4 Ultra | $0.06 | 4K output, campaign hero images |
| Google AI Studio | $0 | Browser playground for free testing (capped) |
| Vertex AI | Per-image + Cloud billing | Enterprise production with SLAs |

*Prices verified 2026-04-17 via [Gemini API docs](https://ai.google.dev/gemini-api/docs/models/imagen), [Vertex AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing), and [Google AI subscriptions](https://gemini.google/subscriptions/). Ultra has a $124.99/mo introductory offer for the first three months.*

## Against the alternatives

| | Imagen 4 | Midjourney V7 | GPT Image 2 |
|---|---|---|---|
| **Aesthetic ceiling** | Strong photoreal, mid on stylized | **Strongest** stylized/cinematic | Strong, softer look |
| **Text rendering** | Materially improved, not Ideogram-grade | Improved on V7 | Good |
| **API access** | Full public API, per-image | None public | OpenAI API |
| **Workspace integration** | **Native in Docs, Slides, Gmail** | None | Via ChatGPT |
| **Open weights** | No | No | No |
| **Watermark / provenance** | SynthID on every output | None | C2PA metadata |
| **Best viewed as** | Google-stack integrator | Visual-quality specialist | Bundled generalist |

## Failure modes

- **Aesthetic ceiling trails Midjourney.** Photoreal is strong, but cinematic composition and stylized illustration still look safer and more corporate out of the box.
- **Safety filters reject more than competitors.** Nudity, public figures, violent imagery, and some medical or historical reference get blocked where Flux or Stable Diffusion self-hosted would pass.
- **Rate limits on consumer tiers.** Even Google AI Pro caps daily Imagen 4 generations; hitting the wall during a deadline is a known failure mode.
- **Vertex AI billing is opaque.** Charges land inside the broader Google Cloud invoice alongside inference, storage, and logging. Cost attribution for a single campaign takes real bookkeeping.
- **No open weights.** Every workflow that needs offline, air-gapped, or fine-tuned generation has to use Flux or Stable Diffusion instead.
- **Free AI Studio testing has undocumented daily caps.** The playground is free but not guaranteed. Production apps should move to metered API.
- **Consumer and API outputs both carry SynthID.** Fine for most uses, but workflows that require clean pixel output without embedded watermarks need a different model.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against the [Imagen 4 Gemini API launch post](https://developers.googleblog.com/en/imagen-4-now-available-in-the-gemini-api-and-google-ai-studio/), [Gemini API Imagen docs](https://ai.google.dev/gemini-api/docs/models/imagen), [Vertex AI generative pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing), [Google AI subscriptions](https://gemini.google/subscriptions/), and the [SynthID overview](https://deepmind.google/technologies/synthid).

## FAQ

**Is Imagen 4 free to use?**
Partly. Google AI Studio allows free testing in the browser playground at capped daily volumes. The Gemini app on the free tier also includes limited Imagen 4 generations. Unlimited consumer access requires [Google AI Pro](https://gemini.google/subscriptions/) at $19.99/mo.

**How much does Imagen 4 cost on the API?**
Fast is $0.02 per image, Standard $0.04, Ultra $0.06, verified on [ai.google.dev](https://ai.google.dev/gemini-api/docs/models/imagen). Vertex AI uses the same per-image rates integrated into the Google Cloud bill.

**Can Imagen 4 images be used commercially?**
Yes. Google permits commercial use of outputs from both consumer tiers and Vertex AI, subject to the standard acceptable-use policy. SynthID watermarking remains embedded in the output.

**Imagen 4 vs Midjourney V7 for quality?**
Midjourney still wins on stylized, cinematic, and illustrative work. Imagen 4 is competitive on photoreal, closer than Imagen 3 was, and wins outright on in-image text legibility for signage-style prompts. For portfolio-grade art, Midjourney remains the default.

**What is SynthID?**
Google's provenance watermarking system. Every Imagen 4 output carries an invisible watermark detectable by Google's verification tools. Details on [deepmind.google/technologies/synthid](https://deepmind.google/technologies/synthid).

**Is Imagen 4 available outside Google?**
No. The model is served only through Google surfaces: Gemini app, AI Studio, Gemini API, and Vertex AI. No open weights and no third-party licensing.

## Sources

- [Imagen 4 Gemini API launch](https://developers.googleblog.com/en/imagen-4-now-available-in-the-gemini-api-and-google-ai-studio/): availability across Gemini API and AI Studio
- [Gemini API Imagen docs](https://ai.google.dev/gemini-api/docs/models/imagen): model tiers, per-image pricing
- [Vertex AI generative pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing): enterprise per-image rates
- [Google AI subscriptions](https://gemini.google/subscriptions/): Google AI Pro and Ultra consumer plans
- [SynthID overview](https://deepmind.google/technologies/synthid): provenance watermarking

## Related

- **Category:** [AI Image Generation](/categories/ai-image/)
