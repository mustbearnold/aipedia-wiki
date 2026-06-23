---
type: tool
slug: imagen
title: Imagen 4
tagline: Google DeepMind text-to-image model now marked deprecated on Gemini API surfaces. Migrate new API work toward Gemini image models before shutdown windows.
category: ai-image
company: Google DeepMind
url: https://gemini.google.com
pricing_model: paid
price_range: "Deprecated API model; Gemini/Vertex image pricing varies"
status: active
launched: 2025-05
last_updated: 2026-06-23
last_verified: 2026-06-23
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
    value: Best for teams maintaining existing Imagen 4 integrations long enough to migrate toward Google's newer Gemini image models.
    source: https://ai.google.dev/gemini-api/docs/changelog
    source_label: Gemini API release notes
    source_id: gemini-api-changelog
    verified_at: '2026-06-23'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-23'
  pricing_anchor:
    value: Legacy Imagen per-image prices are no longer the main buyer question. Gemini image output is token-priced, and shutdown dates vary by Google surface.
    source: https://ai.google.dev/gemini-api/docs/pricing
    source_label: Gemini Developer API pricing
    source_id: gemini-api-pricing
    verified_at: '2026-06-23'
    volatility: high
    confidence: high
    next_review_at: '2026-07-23'
  api_available:
    value: Google migration docs route Imagen users toward newer Gemini image models, so API availability must be checked by exact surface and model ID.
    source: https://firebase.google.com/docs/ai-logic/imagen-models-migration
    source_label: Firebase Imagen migration guide
    source_id: firebase-imagen-migration
    verified_at: '2026-06-23'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-23'
  model_control:
    value: Gemini API model docs now list Imagen 4 as deprecated, and the release notes name the affected Imagen 4 model IDs.
    source: https://ai.google.dev/gemini-api/docs/models/imagen
    source_label: Gemini API Imagen docs
    source_id: imagen-gemini-docs
    verified_at: '2026-06-23'
    volatility: high
    confidence: high
    next_review_at: '2026-07-23'
  watch_out_for:
    value: Do not start net-new Imagen 4 API work without checking the active deprecation notice, shutdown date, replacement model, pricing, and migration path.
    source: https://ai.google.dev/gemini-api/docs/changelog
    source_label: Gemini API release notes
    source_id: gemini-api-changelog
    verified_at: '2026-06-23'
    volatility: medium
    confidence: high
    next_review_at: '2026-09-23'
tags: [ai-image, image-generation, google, gemini, deepmind, vertex-ai, ai-studio]
seo_title: "Imagen 4 Deprecated: Pricing, Migration & Alternatives (June 2026)"
meta_description: "Imagen 4 is now a migration-risk Google image model. Gemini API docs mark it deprecated, and Google surfaces point buyers toward newer Gemini image models. Review updated June 2026."
author: "aipedia.wiki Editorial"
best_for:
  - teams maintaining existing Imagen 4 integrations during migration
  - developers auditing Gemini API model IDs before shutdown
  - Google-stack buyers comparing legacy Imagen against newer Gemini image models
  - product teams that need a current migration note for image-generation roadmaps
not_best_for:
  - net-new API builds that can start on newer Gemini image models
  - aesthetic-quality leadership (Midjourney still wins)
  - open weights or self-hosting
  - uncensored or edgy content
quick_answer: >-
  Imagen 4 is now a migration-risk Google image model, not a clean net-new recommendation. Gemini API docs mark Imagen 4 deprecated, and Google migration guidance points developers toward newer Gemini image models. Existing integrations should audit model IDs, pricing, and shutdown dates by surface. New Google-stack work should start with Gemini image models such as Nano Banana unless Google confirms a current Imagen path for your account.
price_history:
  - date: 2026-06-23
    plan: "Imagen 4 Gemini API models"
    price: "Deprecated; migrate to current Gemini image models"
    source: "https://ai.google.dev/gemini-api/docs/changelog"
    source_label: "Gemini API release notes"
    source_id: gemini-api-changelog
    verified_at: 2026-06-23
    note: "Gemini API release notes say Imagen 4 and Gemini 3 Image models are being deprecated, while Firebase migration guidance lists a separate Imagen shutdown timeline. Verify the exact surface before launch."
  - date: 2026-04-17
    plan: "Gemini API"
    price: "$0.02-$0.06 per image"
    source: "https://cloud.google.com/vertex-ai/generative-ai/pricing"
    source_label: "Source"
    source_id: imagen-pricing
    verified_at: 2026-06-23
    note: "Fast / Standard / Ultra tiers verified on ai.google.dev"
  - date: 2026-04-17
    plan: "Google AI Pro"
    price: "$19.99/mo"
    source: "https://cloud.google.com/vertex-ai/generative-ai/pricing"
    source_label: "Source"
    source_id: imagen-pricing
    verified_at: 2026-06-23
    note: "Consumer bundle with Gemini 3.1 Pro, 2TB storage, verified"
  - date: 2026-05-13
    plan: "Gemini API"
    price: "$0.02-$0.06 per image"
    source: "https://ai.google.dev/gemini-api/docs/models/imagen"
    source_label: "Source"
    source_id: imagen-pricing
    verified_at: 2026-06-23
    note: "Model IDs confirmed on ai.google.dev: imagen-4.0-fast-generate-001, imagen-4.0-generate-001, imagen-4.0-ultra-generate-001. Up to 4 images per request, 480 token prompt limit. Pricing unchanged from April 2026."
  - date: 2026-05-13
    plan: "Google AI Ultra"
    price: "Historical: $249.99/mo (intro $124.99 first 3 months)"
    source: "https://gemini.google/subscriptions/"
    source_label: "Source"
    source_id: imagen-subscriptions
    verified_at: 2026-06-23
    note: "Max Gemini 3.1 Pro, Veo 3.1 video, 30TB storage, Project Mariner. Intro pricing of $124.99/mo for the first three months remains active."
  - date: 2026-05-19
    plan: "Google AI Ultra refresh"
    price: "AI Ultra starts at $100/mo; top tier $200/mo"
    source: "/news/2026-05-19-google-io-gemini-35-search-ai-ultra/"
    source_label: "AIpedia coverage"
    source_id: aipedia-news
    verified_at: 2026-06-23
    note: "Google I/O 2026 reset AI Ultra pricing from the old $249.99-style tier to $100 and $200 premium tiers. Exact Imagen/Google media limits should be checked in-account."
---

# Imagen 4

Google DeepMind's Imagen 4 was Google's flagship text-to-image model across Gemini, AI Studio, the Gemini API, and Vertex AI. As of the June 23, 2026 refresh, the buyer story has changed: Gemini API docs mark Imagen 4 as deprecated, and Google migration guidance points developers toward newer Gemini image models.

The old API surface shipped **Fast**, **Standard**, and **Ultra** model IDs. That historical pricing is useful for invoice review, but it should not drive net-new architecture. Audit your model IDs, confirm the active shutdown date for your Google surface, and move new work to the current Gemini image path.

## System Verdict

> **Pick Imagen 4 only for legacy maintenance and migration planning.** If your app already calls `imagen-4.0-generate-001`, `imagen-4.0-ultra-generate-001`, or `imagen-4.0-fast-generate-001`, this is the moment to inventory prompts, safety settings, rate limits, billing assumptions, and replacement models.
>
> **Skip it for net-new builds unless Google confirms an active Imagen path for your account.** Start with Gemini image models for Google-native work, [Midjourney](/tools/midjourney/) for aesthetic ceiling, [Flux](/tools/flux/) for open weights and LoRA tuning, or [Ideogram](/tools/ideogram/) for text-heavy graphics.
>
> **What to verify before any spend:** exact Google surface, model ID, shutdown date, replacement model, SynthID behavior, pricing unit, and whether the migration changes prompts, safety filters, aspect ratios, or output resolution.

## Key Facts

| | |
|---|---|
| **Current status** | Deprecated on Gemini API model docs |
| **Legacy model IDs** | `imagen-4.0-fast-generate-001` · `imagen-4.0-generate-001` · `imagen-4.0-ultra-generate-001` |
| **Legacy API pricing** | Historical Fast $0.02 · Standard $0.04 · Ultra $0.06 per image |
| **Replacement direction** | Newer Gemini image models, checked by exact Google surface |
| **Pricing to model now** | Gemini image output token pricing plus any Google Cloud or subscription context |
| **Enterprise** | Verify Vertex AI support, migration dates, and Cloud billing before launch |
| **Watermark** | SynthID embedded in every output |
| **Best fit now** | Migration planning, model-ID audit, legacy invoice review |
| **Open weights** | None |

Every status and pricing data point was last verified against Google documentation on 2026-06-23. Google surfaces currently disagree in wording and timeline, so treat the exact shutdown date as surface-specific until confirmed in your console or support channel.

## What it actually is

One image model family served through several Google entry points. That used to be the reason to pick Imagen: consumer users generated inside Gemini, developers used the Gemini API or AI Studio, and enterprises routed production through Vertex AI.

The June 2026 refresh changes the decision. Gemini API docs mark Imagen 4 as deprecated, Gemini API release notes name Imagen 4 model IDs in a deprecation notice, and Firebase migration docs tell image-generation users to move to newer Gemini image models.

For existing users, the job is not to debate whether Imagen 4 was good. It was strong on Google integration, SynthID provenance, and text rendering. The job now is to keep production stable while moving prompts, safety settings, and billing expectations onto a supported model.

## When to pick Imagen 4

- **You already run an Imagen 4 integration.** Inventory model IDs, prompts, output sizes, safety settings, and fallbacks before the shutdown window.
- **You need to explain an old invoice.** The historical Fast, Standard, and Ultra prices still help finance teams reconcile Google image-generation spend.
- **You are comparing migration options.** Use this page to frame the handoff from Imagen 4 to Gemini image models, then confirm current terms in Google docs.
- **You need SynthID continuity.** Check whether the replacement model preserves the watermark and provenance behavior your workflow expects.
- **You use Vertex AI.** Ask Google Cloud which model IDs remain supported for your region, project, and compliance tier.

## When to pick something else

- **Net-new Google image builds:** Current Gemini image models, including Nano Banana surfaces, unless Google gives your account a supported Imagen path.
- **Maximum aesthetic quality for cinematic, stylized, or illustrative work:** [Midjourney](/tools/midjourney/). Still the reference point for visual polish.
- **Open weights, LoRA fine-tuning, or self-hosting:** [Flux](/tools/flux/). Imagen 4 offers none of those.
- **Dense text rendering for logos and posters:** [Ideogram](/tools/ideogram/) remains the safer pick for text-critical production.
- **Image generation bundled with a chat assistant you already pay for:** GPT Image 2 inside [ChatGPT](/tools/chatgpt/).
- **Video generation alongside images:** [Gemini Omni](/tools/gemini-omni/) for Google-native conversational video edits, [Runway](/tools/runway/) for production control, or [Veo 3.1](/tools/veo/) when published Google API pricing matters.

## Pricing

Treat the old Imagen 4 prices as historical and migration context, not a buy-now quote. Google now points developers toward Gemini image models, where image output uses token pricing and surface-specific terms.

Consumer subscription context via [gemini.google/subscriptions](https://gemini.google/subscriptions/):

| Plan | Price | What you get |
|------|-------|---------------|
| Gemini (free) | $0 | Check current image model and daily limits in account |
| Google AI Pro | $19.99/mo | Gemini subscription benefits with current Google image model access subject to limits |
| Google AI Ultra | From $100/mo; top tier $200/mo | Higher Gemini, media, agent, and Antigravity limits; exact image limits should be checked in account |

Legacy Imagen 4 API pricing and current migration reference:

| Tier | Per-image | Typical use |
|------|-----------|-------------|
| Imagen 4 Fast | Historical $0.02 | Legacy invoice review and migration audit |
| Imagen 4 Standard | Historical $0.04 | Legacy invoice review and migration audit |
| Imagen 4 Ultra | Historical $0.06 | Legacy invoice review and migration audit |
| Gemini image models | Token-priced image output | Net-new Google image builds after migration |
| Vertex AI | Surface-specific Cloud billing | Confirm model availability and shutdown windows |

*Status verified 2026-06-23 via [Gemini API model docs](https://ai.google.dev/gemini-api/docs/models/imagen), [Gemini API release notes](https://ai.google.dev/gemini-api/docs/changelog), [Firebase Imagen migration guidance](https://firebase.google.com/docs/ai-logic/imagen-models-migration), and [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing). The exact shutdown date must be confirmed by surface because Google docs now show different timelines.*

## Against the alternatives

| | Imagen 4 | Midjourney V7 | GPT Image 2 |
|---|---|---|---|
| **Aesthetic ceiling** | Strong photoreal, mid on stylized | **Strongest** stylized/cinematic | Strong, softer look |
| **Text rendering** | Materially improved, not Ideogram-grade | Improved on V7 | Good |
| **API access** | Deprecated on Gemini API docs | None public | OpenAI API |
| **Workspace integration** | Legacy Google-stack path | None | Via ChatGPT |
| **Open weights** | No | No | No |
| **Watermark / provenance** | SynthID on every output | None | C2PA metadata |
| **Best viewed as** | Migration-risk legacy model | Visual-quality specialist | Bundled generalist |

## Failure modes

- **Imagen 4 is deprecated on Gemini API docs.** Do not build a new production dependency on model IDs that Google has named in deprecation notices.
- **Aesthetic ceiling trails Midjourney.** Photoreal is strong, but cinematic composition and stylized illustration still look safer and more corporate out of the box.
- **Safety filters reject more than competitors.** Nudity, public figures, violent imagery, and some medical or historical reference get blocked where Flux or Stable Diffusion self-hosted would pass.
- **Rate limits on consumer tiers.** Even Google AI Pro can cap daily image generations; hitting the wall during a deadline is a known failure mode.
- **Vertex AI billing is opaque.** Charges land inside the broader Google Cloud invoice alongside inference, storage, and logging. Cost attribution for a single campaign takes real bookkeeping.
- **No open weights.** Every workflow that needs offline, air-gapped, or fine-tuned generation has to use Flux or Stable Diffusion instead.
- **Free AI Studio testing has undocumented daily caps.** The playground is free but not guaranteed. Production apps should move to metered API.
- **Consumer and API outputs both carry SynthID.** Fine for most uses, but workflows that require clean pixel output without embedded watermarks need a different model.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-23 against the [Gemini API release notes](https://ai.google.dev/gemini-api/docs/changelog), [Gemini API Imagen docs](https://ai.google.dev/gemini-api/docs/models/imagen), [Firebase Imagen migration guidance](https://firebase.google.com/docs/ai-logic/imagen-models-migration), [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing), [Google AI subscriptions](https://gemini.google/subscriptions/), and the [SynthID overview](https://deepmind.google/technologies/synthid).

## FAQ

**Is Imagen 4 free to use?**
Treat legacy free access as unstable. Google AI Studio and Gemini app availability should be checked in account because Google is moving image users toward newer Gemini image models.

**How much does Imagen 4 cost on the API?**
Historically, Fast was $0.02 per image, Standard $0.04, and Ultra $0.06. As of June 23, 2026, the larger issue is deprecation. Verify the replacement Gemini image model and its token-priced output before launch.

**Can Imagen 4 images be used commercially?**
Google generally permits commercial use of outputs from consumer and Vertex AI surfaces, subject to the standard acceptable-use policy. For Imagen 4 specifically, first confirm the active surface and migration status because deprecated model access can change.

**Imagen 4 vs Midjourney V7 for quality?**
Midjourney still wins on stylized, cinematic, and illustrative work. Imagen 4 was competitive on photoreal and text rendering, but deprecation makes it a poor net-new production choice.

**What is SynthID?**
Google's provenance watermarking system. Imagen outputs carried an invisible watermark detectable by Google's verification tools. Confirm the same behavior on the replacement Gemini image model before relying on it.

**Is Imagen 4 available outside Google?**
No. Imagen is a Google-served model family with no open weights and no third-party licensing. Current availability now needs a deprecation and migration check by Google surface.

## Sources

- [Gemini API release notes](https://ai.google.dev/gemini-api/docs/changelog): Imagen 4 deprecation notice
- [Gemini API Imagen docs](https://ai.google.dev/gemini-api/docs/models/imagen): current Imagen model status
- [Firebase Imagen migration guide](https://firebase.google.com/docs/ai-logic/imagen-models-migration): migration guidance toward Gemini image models
- [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing): current Gemini image pricing units
- [Imagen 4 Gemini API launch](https://developers.googleblog.com/en/imagen-4-now-available-in-the-gemini-api-and-google-ai-studio/): historical availability across Gemini API and AI Studio
- [Google AI subscriptions](https://gemini.google/subscriptions/): Google AI Pro and Ultra consumer plans
- [SynthID overview](https://deepmind.google/technologies/synthid): provenance watermarking

## Related

- **Category:** [AI Image Generation](/categories/ai-image/)
- **Google media tools:** [Gemini Omni](/tools/gemini-omni/) · [Google Veo 3.1](/tools/veo/) · [Gemini](/tools/gemini/)
