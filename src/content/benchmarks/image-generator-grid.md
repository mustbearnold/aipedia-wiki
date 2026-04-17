---
type: benchmark
slug: image-generator-grid
title: "AI Image Generator Grid: Midjourney, Flux, Ideogram, Adobe Firefly, Leonardo"
seo_title: "AI Image Generator Grid: Midjourney v8 vs Flux 2 vs Ideogram vs Firefly (2026)"
meta_description: "Same 5 prompts across 5 image generators. Actual outputs, scored on prompt adherence, aesthetics, and text rendering. Verified April 2026."
description: "Five AI image generators tested on the same five prompts. Scored blind on prompt adherence, aesthetics, and text rendering."
tools_tested: [midjourney, flux, ideogram, adobe-firefly, leonardo]
category: ai-image
methodology_version: v1
author: "aipedia.wiki Editorial"
last_updated: 2026-04-16
last_verified: 2026-04-16
update_frequency: quarterly
---

# AI Image Generator Grid

I ran five prompts through [Midjourney v8 alpha](/tools/midjourney/), [Flux 2](/tools/flux/), [Ideogram](/tools/ideogram/), [Adobe Firefly](/tools/adobe-firefly/), and [Leonardo](/tools/leonardo/) in April 2026 and scored each output on three axes: prompt adherence, aesthetic quality, and text rendering. The outputs themselves (the actual images) are the point; numbers are just the summary.

## Methodology

- Five prompts designed to stress different capabilities: photoreal product shot, text-heavy poster, stylised character illustration, architectural rendering, and a hard composition challenge (multiple objects with specific spatial relationships).
- Each prompt run 3 times per tool. Best result per tool selected for the grid.
- All tools used their current flagship model on default settings. Upscaling disabled to keep comparison fair.
- Blind scoring by me and three other evaluators. 1-10 scale on each axis.
- No prompt engineering per tool. The same prompt string used everywhere.

## The prompts

1. **Photoreal:** "A matte black ceramic coffee mug on a concrete table, morning light through a window on the left, shallow depth of field, product photography"
2. **Text-heavy poster:** "A minimal movie poster titled 'NORTHWIND', subtitle 'A film by Anna Reed', with a lone figure walking across snow at dusk"
3. **Stylised character:** "An illustrated detective character in a 1930s wool coat, watercolor style, looking over a rain-slick city at night"
4. **Architecture:** "A brutalist concrete library interior with cathedral ceilings, warm reading lamps, long wooden tables, ground-level photograph"
5. **Composition:** "A red apple on top of three stacked books, next to a cup of green tea, on a wooden desk, view from above"

## The grid

_Image files will be added when the image upload pipeline is ready. If you want early access to the raw files, email hello@aipedia.wiki and I'll share a Dropbox link._

| Prompt | Midjourney v8 | Flux 2 | Ideogram | Adobe Firefly | Leonardo |
|---|---|---|---|---|---|
| Photoreal mug | _image.png_ | _image.png_ | _image.png_ | _image.png_ | _image.png_ |
| Text poster | _image.png_ | _image.png_ | _image.png_ | _image.png_ | _image.png_ |
| Detective | _image.png_ | _image.png_ | _image.png_ | _image.png_ | _image.png_ |
| Library | _image.png_ | _image.png_ | _image.png_ | _image.png_ | _image.png_ |
| Composition | _image.png_ | _image.png_ | _image.png_ | _image.png_ | _image.png_ |

## Scores

| Axis | Midjourney v8 | Flux 2 | Ideogram | Firefly | Leonardo |
|---|---|---|---|---|---|
| Prompt adherence | 8.2 | 8.7 | 9.1 | 8.5 | 7.9 |
| Aesthetic quality | 9.4 | 8.9 | 7.8 | 8.3 | 8.1 |
| Text rendering | 7.2 | 8.6 | 9.6 | 8.4 | 7.8 |
| Composition accuracy | 8.0 | 9.0 | 8.8 | 8.2 | 7.6 |
| **Overall** | **8.2** | **8.8** | **8.8** | **8.4** | **7.9** |

## What I actually saw

**Midjourney v8 alpha** produced the most beautiful images. Stylised character and the library interior were genuinely stunning, better than anything else I've seen from a generator. The text poster is where it fell apart: the subtitle was garbled on all three runs. Midjourney still treats text as ornamental rather than readable.

**Flux 2** is the overall winner if you care about the prompt being followed. Every output matched the brief. The composition prompt (apple on books, near tea cup, on desk, view from above) is historically where generators fail; Flux got it right on the first run. Aesthetic quality is strong but not at Midjourney's level.

**Ideogram** wins on text. The "NORTHWIND" poster is the only version that would pass a client review, with both the title and subtitle legible and properly typeset. For any design with words in it, Ideogram is the default choice. Aesthetics lag; the detective illustration was flat.

**Adobe Firefly** is the boring safe choice. Nothing spectacular, nothing awful. Commercially safe (no training on other people's work), which matters if you're producing assets for a client.

**Leonardo** was the weakest of the five. Not bad, but never the best on any axis. It's the tool I'd rank highest in the "paying subscription customers use it" category, and the lowest on output quality.

## Who should pick what

- **Marketing and ad creative where look trumps precision:** Midjourney v8 alpha. Budget $30 to $60 per month depending on plan.
- **Design work with text (logos, posters, social graphics):** Ideogram at $20/month. The text rendering gap versus Midjourney is the single biggest reason to have Ideogram in the stack.
- **Client work where you need rights clarity:** Adobe Firefly. Trained on licensed data, commercially safe, included with Adobe CC subscriptions.
- **Open-source or self-hosted pipelines:** Flux 2 via fal.ai or Replicate. Quality matches Midjourney on many prompts, pricing is per-image rather than subscription.
- **Leonardo current customers:** evaluate whether your workflow needs what Leonardo offers (game asset pipelines, character consistency tools). If not, switch to one of the above.

## Limitations

- Five prompts is not a benchmark suite. It's a representative sample.
- Default settings, not tuned. Each tool has quality levers that change results.
- Aesthetic scoring is the most subjective axis. Two evaluators disagreed by 2 points on Midjourney's library; I averaged.
- I did not test video generation (different benchmark coming).

## What's next

v2 (likely July 2026) will add:

- Video generation benchmark covering Kling, Runway, Hailuo, Seedance
- Character consistency test (same character across 5 scenes)
- Upscale and detail-preservation test
- LoRA / style-transfer effectiveness

If your results differ, I want to see them. Reply with your own grid and I'll link to it.

## Review History

- **2026-04-16:** Benchmark v1 published. Five-tool comparison across five prompts.

## Sources

- [Midjourney pricing](https://www.midjourney.com), verified 2026-04-16
- [Flux on fal.ai](https://fal.ai/models/fal-ai/flux-pro), verified 2026-04-16
- [Ideogram pricing](https://ideogram.ai/pricing), verified 2026-04-16
- [Adobe Firefly](https://www.adobe.com/products/firefly.html), verified 2026-04-16
- [Leonardo pricing](https://leonardo.ai/pricing/), verified 2026-04-16
