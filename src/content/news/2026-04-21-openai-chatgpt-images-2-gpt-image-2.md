---
type: news
slug: 2026-04-21-openai-chatgpt-images-2-gpt-image-2
title: "OpenAI launches ChatGPT Images 2.0 and gpt-image-2 API: native reasoning, 4K output, multilingual text rendering"
date: 2026-04-21
severity: major
summary: "OpenAI released ChatGPT Images 2.0 (consumer product) and the gpt-image-2 API on April 21, 2026. The model introduces native reasoning for image generation, 4K resolution, multi-image consistency, and state-of-the-art text rendering across 12+ languages including Japanese, Korean, Chinese, Hindi, and Bengali. Free tier gets standard gpt-image-2; Plus, Pro, and Business get thinking mode and web search inside generation. API pricing starts at $0.01/image (low, 1024x768) up to $0.41/image (high, 4K). Direct pressure on Midjourney, Adobe Firefly, and Ideogram."
affects: [chatgpt, dalle, midjourney, adobe-firefly, ideogram]
categories: [ai-model-release, ai-image]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-22
last_verified: 2026-04-22
sources:
  - url: "https://openai.com/index/introducing-chatgpt-images-2-0/"
    title: "Introducing ChatGPT Images 2.0 - OpenAI"
  - url: "https://techcrunch.com/2026/04/21/chatgpts-new-images-2-0-model-is-surprisingly-good-at-generating-text/"
    title: "ChatGPT's new Images 2.0 model is surprisingly good at generating text - TechCrunch (April 21, 2026)"
  - url: "https://venturebeat.com/technology/openais-chatgpt-images-2-0-is-here-and-it-does-multilingual-text-full-infographics-slides-maps-even-manga-seemingly-flawlessly"
    title: "OpenAI's ChatGPT Images 2.0 is here - VentureBeat"
  - url: "https://9to5mac.com/2026/04/21/openai-unveiling-chatgpt-images-2-image-generation-model-watch-live-demo-here/"
    title: "OpenAI unveils ChatGPT Images 2 - 9to5Mac"
  - url: "https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/introducing-openais-gpt-image-2-in-microsoft-foundry/4500571"
    title: "Introducing OpenAI's gpt-image-2 in Microsoft Foundry"
  - url: "https://developers.openai.com/api/docs/models/gpt-image-2"
    title: "GPT Image 2 Model - OpenAI API docs"
---

**OpenAI** shipped **ChatGPT Images 2.0** and the underlying **gpt-image-2 API** on April 21, 2026. It is a step-function image-generation upgrade and the biggest consumer image-gen release since GPT Image 1.5 in December 2025.

## What's new

- **Native reasoning in the image model.** The model thinks before it draws, handling multi-step compositional prompts (infographics, slides, annotated diagrams) that ripped GPT Image 1.5 and DALL-E 3.
- **4K resolution output** at custom aspect ratios. Previous ceiling was 2K.
- **Multi-image consistency** across generations (character, product, brand).
- **Multilingual text rendering** across 12+ languages: English, Japanese, Korean, Chinese (Simplified and Traditional), Hindi, Bengali, and more. Previously the weak point for every major image model.
- **Up to 8 distinct variants from a single prompt.**
- **Web search inside generation** for Plus, Pro, and Business users (reference real-world branding, logos, product photography).

## Availability

- **ChatGPT Free:** standard gpt-image-2 model, standard resolution, limited daily runs.
- **ChatGPT Plus ($20/mo):** thinking mode, longer reasoning runs, web search in generation.
- **ChatGPT Pro ($200/mo):** everything on Plus plus higher daily caps, priority generation.
- **ChatGPT Business:** thinking mode, commercial-use terms, team admin.
- **gpt-image-2 API:** available via OpenAI API and in Microsoft Foundry.

## API pricing

| Quality tier | Resolution | Price per image |
|---|---|---|
| Low | 1024x768 | **$0.01** |
| Medium | 2K | **$0.08** |
| High | 4K | **$0.41** |

Token-based pricing for long prompts: **$8 per MTok input, $2 cached, $30 per MTok output** (vs $32 output on gpt-image-1.5).

## Competitive read

- **Midjourney V7** remains the quality leader for artistic rendering. gpt-image-2 is closest yet, and its multilingual text rendering is genuinely better.
- **Adobe Firefly** loses its main commercial differentiator (brand-safe training data) as a pure feature play. Firefly's IP indemnification and Adobe-stack integration still matter.
- **Ideogram** had owned text-in-image for a year. That moat is gone.
- **Google Imagen 4** (built into Gemini) still leads on photoreal but trails on infographic and text-heavy generation.

The direct affordance shift: OpenAI bundles image gen into a $20/mo ChatGPT Plus subscription that already covers text, code, and voice. Midjourney's $10/mo standalone plan is still cheaper, but for any user running both a chatbot and an image generator, Plus is now the default consolidation.

## Open questions

- **Video model timing.** OpenAI's Sora line remains Sora 2 (retired April 1) without public replacement. A Sora 3 release would parallel this image launch.
- **Enterprise rollout.** Business-tier indemnification terms on gpt-image-2 outputs have not been fully disclosed.
- **Rate limits.** OpenAI has not published hard caps for Plus/Pro tiers.

## Related

- [OpenAI retires Sora 2 model](/news/2026-04-01-openai-retires-sora-2-model/)
- [ChatGPT Pro $100 tier launch](/news/2026-04-09-chatgpt-pro-100-tier-launch/)
- [Adobe Firefly AI Assistant launch](/news/2026-04-15-adobe-firefly-ai-assistant/)
