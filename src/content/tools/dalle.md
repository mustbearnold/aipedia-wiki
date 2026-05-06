---
type: tool
slug: dalle
title: DALL-E
tagline: OpenAI's older image generation model family. DALL-E 2 and DALL-E 3 are deprecated and scheduled for API removal on May 12, 2026.
category: ai-image
company: OpenAI
url: https://platform.openai.com/docs/guides/image-generation
pricing_model: paid
price_range: "Deprecated API models; use current GPT Image pricing"
status: dead
launched: 2022-04
last_updated: 2026-05-05
last_verified: 2026-05-05
update_frequency: quarterly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 0
  value: 0
  moat: 0
  longevity: 0
facts:
  status:
    value: "DALL-E 2 and DALL-E 3 are deprecated OpenAI image API models scheduled for removal on May 12, 2026. Treat DALL-E as discontinued for new work; use current GPT Image models."
    source: "https://platform.openai.com/docs/guides/image-generation"
    source_label: "OpenAI image generation guide"
    source_id: dalle-image-generation
    verified_at: 2026-05-05
    volatility: low
    confidence: high
  flagship_model:
    value: "DALL-E 3, deprecated in favor of GPT Image models for new builds"
    source: "https://platform.openai.com/docs/guides/image-generation"
    source_id: dalle-best-for
    verified_at: 2026-05-05
    volatility: low
    confidence: high
    status: deprecated
  image_generation:
    value: "DALL-E 2 and DALL-E 3 remain documented image API models, but OpenAI recommends GPT Image for current image generation"
    source: "https://platform.openai.com/docs/guides/image-generation"
    source_label: "OpenAI image generation guide"
    source_id: dalle-image-generation
    verified_at: 2026-05-05
    volatility: low
    confidence: high
    status: deprecated
  pricing_anchor:
    value: "Discontinued for new builds. Use current GPT Image API pricing rather than starting new work on DALL-E."
    source: "https://platform.openai.com/docs/pricing/"
    source_label: "OpenAI pricing"
    source_id: dalle-best-paid-tier
    verified_at: 2026-05-05
    volatility: low
    confidence: high
  best_paid_tier:
    value: "Use current OpenAI GPT Image API pricing rather than starting new work on DALL-E"
    source: "https://platform.openai.com/docs/pricing/"
    source_id: dalle-best-paid-tier
    verified_at: 2026-05-05
    volatility: low
    confidence: high
    status: deprecated
  best_for:
    value: "Historical context and migration planning away from DALL-E API models"
    source: "https://platform.openai.com/docs/deprecations/2023-03-20-codex-models%23.doc"
    source_id: dalle-best-for
    verified_at: 2026-05-05
    volatility: low
    confidence: high
    status: deprecated
tags: [ai-image, image-generation, openai, retired, chatgpt, historical]
best_for:
  - historical context on OpenAI image generation
  - readers tracking DALL-E API deprecation and GPT Image migration
  - users who need to understand old DALL-E references in comparisons
  - teams planning migration away from DALL-E 2 or DALL-E 3 before removal
not_best_for:
  - anyone choosing a current image generation product
  - new production API planning
  - buyers comparing active image generators
  - users who want the current ChatGPT image workflow
seo_title: "DALL-E: Deprecated OpenAI Image Model Family (2026)"
meta_description: "DALL-E 2 and DALL-E 3 are older OpenAI image models scheduled for API removal on May 12, 2026. New builds should use current GPT Image models."
author: "aipedia.wiki Editorial"
quick_answer: >-
  DALL-E is OpenAI's older image model family. DALL-E 2 and DALL-E 3 are deprecated and scheduled for API removal on May 12, 2026. Treat DALL-E as discontinued for new work and use current GPT Image models instead.
---

# DALL-E

DALL-E is OpenAI's older image generation model family. DALL-E 2 and DALL-E 3 are still useful as historical labels, but they are not the path for new OpenAI image builds. OpenAI's current image-generation docs center GPT Image models, while the deprecation page lists DALL-E 2 and DALL-E 3 for removal from the API on May 12, 2026.

## System Verdict

> **Treat DALL-E as deprecated infrastructure.** If you arrived looking for current OpenAI image generation, evaluate GPT Image models through the OpenAI Image API or Responses API instead.
>
> **Do not start new API work on `dall-e-2` or `dall-e-3`.** They are scheduled for API removal on May 12, 2026, so any remaining use should be migration or compatibility work.
>
> **Keep the page for provenance.** DALL-E still appears in old docs, prompt libraries, vendor comparisons, and product copy. That does not make it the right model family for a new image workflow.

## What it was

DALL-E launched in 2021 as OpenAI's first text-to-image model family. DALL-E 2 followed in 2022, and DALL-E 3 later became the better-known ChatGPT-era image model.

Through 2023 and 2024 it served as the default OpenAI image surface, pitched against Midjourney and Stable Diffusion. Its strengths were prompt adherence and text rendering for a consumer chat product. Its weakness was aesthetic ceiling: Midjourney routinely beat it on stylized and cinematic output.

## What replaced it

OpenAI's current developer path is GPT Image. The image-generation guide describes GPT Image as the latest and most advanced OpenAI image-generation model family, with better instruction following, text rendering, editing, and world-knowledge use than the DALL-E series.

For API work, that means choosing current GPT Image model IDs and endpoint behavior rather than preserving a DALL-E abstraction. The Image API supports GPT Image models as well as DALL-E 2 and DALL-E 3 during the transition period; the Responses API image-generation tool is designed around GPT Image.

For broader site context on OpenAI's image-generation transition, see the local coverage of [ChatGPT Images 2.0 and gpt-image-2](/news/2026-04-21-openai-chatgpt-images-2-gpt-image-2/), but use the official OpenAI docs linked below as the source of truth for current API model IDs.

## API status

As verified on 2026-05-05:

- The OpenAI image guide still documents DALL-E 2 and DALL-E 3 in the Image API.
- OpenAI's deprecation page lists `dall-e-2` and `dall-e-3` for API removal on May 12, 2026.
- OpenAI recommends GPT Image models as the current path for new image-generation work.
- DALL-E 3 only supports image generation in the Image API, while GPT Image models support newer editing and output controls.
- Current pricing should be read from OpenAI's pricing page because GPT Image costs depend on image tokens, quality, size, and input images.

## Migration notes

Treat DALL-E as a historical label when auditing old prompts, docs, and comparisons. If a vendor, workflow, or internal playbook still says "DALL-E," check whether it means the retired ChatGPT image surface, the DALL-E 3 API, or OpenAI image generation in general. Those are no longer the same operational choice.

For buyers, the decision path is straightforward. If you want OpenAI's current image workflow inside a consumer or team assistant, evaluate [ChatGPT](/tools/chatgpt/) and the current GPT Image path. If you want a pure image model with a different aesthetic ceiling, compare [Midjourney](/tools/midjourney/), [Flux](/tools/flux/), Adobe Firefly, and other active image tools instead of ranking DALL-E as if it were a current buying option.

For developers, the key risk is migration timing. New integrations should not be planned around the DALL-E brand. Update product copy, prompt libraries, tests, and API abstractions so they refer to current model IDs and a current source of truth. Keep this page for provenance, not as a buying recommendation.

## Migration checklist

- Inventory any `dall-e-2` or `dall-e-3` model strings in code, prompt tests, docs, examples, and customer-facing copy.
- Replace product copy that says "DALL-E" when the real feature now means OpenAI image generation generally.
- Re-test prompt libraries because GPT Image behavior, output controls, editing support, and moderation settings are not identical to DALL-E behavior.
- Update pricing assumptions from fixed DALL-E-era per-image thinking to current GPT Image token, size, quality, and editing costs.
- Keep compatibility notes for historical comparisons, but route new product decisions to the current OpenAI image docs.

## Sources

- [OpenAI image generation guide](https://platform.openai.com/docs/guides/image-generation)
- [OpenAI image API reference](https://platform.openai.com/docs/api-reference/images/generate)
- [OpenAI deprecations](https://platform.openai.com/docs/deprecations/2023-03-20-codex-models%23.doc)
- [OpenAI GPT Image API announcement](https://openai.com/index/image-generation-api/)

## Related

- [ChatGPT](/tools/chatgpt/): current OpenAI image surface
- [Midjourney](/tools/midjourney/): aesthetic-quality leader
- [Flux](/tools/flux/): open-weight alternative with a public API
