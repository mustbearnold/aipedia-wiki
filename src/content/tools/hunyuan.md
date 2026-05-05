---
type: tool
slug: hunyuan
title: Hunyuan
tagline: Tencent's AI model family covering LLMs, 3D world generation, video, and image. HY-World 2.0 (April 16, 2026) is the flagship open-source 3D world model with editable mesh + Gaussian Splatting output importable into Unity and Unreal.
category: ai-chatbots
secondary_categories: [ai-video, ai-image]
company: Tencent
url: https://hunyuan.tencent.com
pricing_model: freemium
price_range: "Free (open weights) / Tencent Cloud API variable"
status: active
launched: 2023-09
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
  value: 9
  moat: 6
  longevity: 7
facts:
  best_for:
    value: Best for China/Tencent-cloud teams evaluating Tencent Hunyuan models for text, image, video, and enterprise AI application
      workloads.
    source: https://cloud.tencent.com/product/hunyuan
    source_label: Tencent Cloud Hunyuan product
    source_id: hunyuan-cloud
    verified_at: '2026-05-04'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
  pricing_anchor:
    value: Hunyuan pricing is cloud/API-model dependent; verify the current Tencent Cloud billing docs for each model family
      and context/output mode.
    source: https://cloud.tencent.com/document/product/1729/97731
    source_label: Tencent Cloud Hunyuan pricing docs
    source_id: hunyuan-pricing
    verified_at: '2026-05-04'
    volatility: high
    confidence: high
    next_review_at: '2026-08-04'
  api_available:
    value: Tencent Cloud docs are the implementation source for authentication, endpoints, model lists, quotas, and regional/service
      constraints.
    source: https://cloud.tencent.com/document/product/1729
    source_label: Tencent Cloud Hunyuan docs
    source_id: hunyuan-docs
    verified_at: '2026-05-04'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
  model_catalog:
    value: The Hunyuan public surface spans multiple model modalities, so recommendations should be specific to the target text/image/video
      model.
    source: https://hunyuan.tencent.com/
    source_label: Tencent Hunyuan official site
    source_id: hunyuan-official
    verified_at: '2026-05-04'
    volatility: high
    confidence: high
    next_review_at: '2026-08-04'
  watch_out_for:
    value: For international buyers, check availability, language fit, data residency, compliance, API access path, and pricing
      currency before choosing Hunyuan.
    source: https://cloud.tencent.com/product/hunyuan
    source_label: Tencent Cloud Hunyuan product
    source_id: hunyuan-cloud
    verified_at: '2026-05-04'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
tags: [tencent, open-weights, hunyuan, 3d-world-model, world-model, chinese-llm, video-gen, image-gen, gaussian-splatting]
seo_title: "Hunyuan: Features, Pricing & Review (April 2026)"
meta_description: "Hunyuan is Tencent's AI model family. HY-World 2.0 (April 16, 2026) open-sources 3D world generation with editable Unity/Unreal output. Also covers Hunyuan-Large LLM, HunyuanVideo, and 3D asset models. Apache-style open-source releases alongside hosted Tencent Cloud API."
author: "aipedia.wiki Editorial"
best_for:
  - game developers generating 3D scenes and assets from text
  - robotics and simulation researchers needing open-source environment generation
  - Chinese-market or bilingual workloads (Hunyuan LLMs)
  - teams experimenting with multi-modal world modeling
not_best_for:
  - English-first consumer chat (Qwen or GLM are more polished)
  - production-grade video generation (Kling or Veo 3 lead here)
  - teams requiring strict Western data residency on hosted API
quick_answer: >-
  Hunyuan is Tencent's multi-surface AI family. The 2026 standout is HY-World 2.0 (April 16), an open-source 3D world model that generates editable Gaussian Splattings + meshes from text, images, or video, importable directly into Unity, Unreal, and Isaac. Also covers Hunyuan-Large LLM, HunyuanVideo, and 3D asset models. Pick it for 3D world generation or Chinese-market workloads; skip for English consumer chat.
---

# Hunyuan

Tencent's open-weight AI model family. Covers LLM (Hunyuan-Large, Hunyuan-Turbo), video generation (HunyuanVideo), 3D asset generation (Hunyuan3D), and as of April 2026, open-source 3D world modeling (HY-World 2.0). Most weights ship on [Hugging Face](https://huggingface.co/tencent) under permissive licenses; hosted API access runs through Tencent Cloud.

## System Verdict

> **Pick Hunyuan if you need open-source 3D world generation or robotics environment synthesis.** HY-World 2.0 is genuinely category-leading among open-source options as of April 2026, with editable output that imports cleanly into Unity, Unreal Engine, and Isaac. Closed-source Marble performs similarly; Hunyuan wins on openness.
>
> **Skip it if you want English-first consumer chat or production video generation.** Hunyuan-Large is capable but less polished than Qwen or GLM for bilingual chat workflows. HunyuanVideo has shipped but trails [Kling](/tools/kling/), [Veo 3](/tools/veo/), and Runway on commercial video quality.
>
> **Where Hunyuan wins uniquely:** Open-source 3D world generation with editable asset output. No other major lab ships a comparable open alternative. For game developers, AR/VR teams, robotics researchers, and simulation engineers, Hunyuan is now the default starting point.

## Key Facts

| | |
|---|---|
| **Parent company** | Tencent (00700.HK) |
| **Flagship in 2026 (3D world)** | **HY-World 2.0** · released April 16, 2026 · open-source |
| **HY-World 2.0 output** | 3D Gaussian Splattings, editable meshes, point clouds |
| **HY-World 2.0 imports to** | Unity, Unreal Engine, Nvidia Isaac |
| **HY-World 2.0 architecture** | 4-stage pipeline: HY-Pano 2.0 → WorldNav → WorldStereo 2.0 → WorldMirror 2.0 |
| **WorldMirror 2.0 size** | ~1.2B parameters |
| **HY-World 2.0 resolution** | 50K to 500K pixels, flexible-resolution inference |
| **Previous version** | HY-World 1.0 (WorldPlay + WorldCompass) generated video, not 3D |
| **LLM family** | Hunyuan-Large (389B MoE), Hunyuan-Turbo, Hunyuan-Standard |
| **Video model** | HunyuanVideo (open-source, 13B params) |
| **3D asset model** | Hunyuan3D (text-to-3D asset generation) |
| **Hosted API** | [Tencent Cloud Hunyuan API](https://cloud.tencent.com/product/hunyuan) |
| **Open-weight hub** | [Hugging Face tencent org](https://huggingface.co/tencent) |

## When to pick Hunyuan

- **Game developers generating 3D scenes.** HY-World 2.0 outputs are engine-importable. Text or image input becomes a playable level in Unity or Unreal.
- **Robotics and simulation teams.** Isaac import path + open source license makes this the default for training embodied agents in procedurally generated environments.
- **AR / VR content pipelines.** Gaussian Splatting output is first-class in modern XR workflows; meshes work for mobile AR and WebXR.
- **Chinese-market LLM deployment.** Hunyuan-Large is tuned for Chinese language quality and integrates natively with Tencent Cloud services popular in China.
- **Researchers working on world models.** Open code + partial weights + technical report makes HY-World 2.0 a credible research baseline.

## When to pick something else

- **Production video generation:** [Kling](/tools/kling/), [Veo 3](/tools/veo/), [Runway](/tools/runway/), [Hailuo](/tools/hailuo/) for commercial video output.
- **English-first chat:** [ChatGPT](/tools/chatgpt/), [Claude](/tools/claude/), [Gemini](/tools/gemini/), or [Qwen](/tools/qwen/) for multilingual.
- **3D character generation specifically:** [Rodin](/tools/rodin/), [Meshy](/tools/meshy/), [Tripo3D](/tools/tripo3d/) focus on single-asset 3D generation.
- **Closed-source world modeling at commercial grade:** Marble (closed, similar capability to HY-World 2.0 but licensed).

## Pricing

Hunyuan models are distributed primarily as open weights under permissive licenses on Hugging Face. Hosted inference through Tencent Cloud is pay-as-you-go and varies by model.

| Surface | Price |
|---|---|
| Hunyuan-Large (open weights) | Free · [Hugging Face](https://huggingface.co/tencent/Hunyuan-Large) |
| HY-World 2.0 (open weights) | Free · [Hugging Face](https://huggingface.co/tencent/HY-World-2.0) |
| HunyuanVideo (open weights) | Free · [Hugging Face](https://huggingface.co/tencent/HunyuanVideo) |
| Hunyuan3D (open weights) | Free · [Hugging Face](https://huggingface.co/tencent/Hunyuan3D-1) |
| Tencent Cloud hosted API | Pay-as-you-go (see Tencent Cloud pricing) |

Self-hosted runs under the respective license terms. Commercial use allowed on most releases; verify the specific license in each repo.

## Failure modes

- **Documentation lag in English.** Primary docs are in Chinese first. English translations trail the original by days to weeks.
- **Partial open-source on HY-World 2.0 at launch.** Technical report and partial code are public as of April 16, 2026; full code is listed as "coming soon."
- **Video generation trails frontier.** HunyuanVideo is capable but not competitive with Kling, Veo 3, or Runway Gen-4 on commercial quality.
- **Hosted API is Chinese-cloud.** Enterprise buyers in regulated Western markets need to evaluate Tencent Cloud data residency posture. Self-hosting open weights is the workaround.
- **LLM family is less polished than Qwen.** Qwen3.6 Plus and DeepSeek V3 edge Hunyuan-Large on most independent benchmarks.
- **No equivalent to ChatGPT plugin marketplace.** Hunyuan is model-first, not a product ecosystem.

## Against the alternatives (3D world modeling)

| | HY-World 2.0 | Marble (closed) | HunyuanWorld 1.0 |
|---|---|---|---|
| **License** | Open source | Closed | Open source |
| **Output** | 3DGS + meshes (editable) | Similar | Video only |
| **Engine import** | Unity, Unreal, Isaac | Proprietary | No direct import |
| **Resolution** | 50K-500K pixels | Similar | N/A |
| **Best for** | Open-source game dev + robotics | Enterprise 3D workflows | Walkthrough video |

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-04-18 against [Tencent-Hunyuan/HY-World-2.0 GitHub](https://github.com/Tencent-Hunyuan/HY-World-2.0), [Hugging Face tencent org](https://huggingface.co/tencent), and [BigGo Finance coverage of the April 16 release](https://finance.biggo.com/news/0jPDlZ0BvthpMgHBvLv3).

## FAQ

**What is HY-World 2.0?**
Tencent's open-source 3D world model, released April 16, 2026. Generates editable 3D worlds (Gaussian Splattings + meshes) from text, images, or video inputs. Outputs import directly into Unity, Unreal Engine, and Nvidia Isaac. Architecture is a 4-stage pipeline: HY-Pano 2.0 → WorldNav → WorldStereo 2.0 → WorldMirror 2.0.

**How is HY-World 2.0 different from 1.0?**
HY-World 1.0 (called WorldPlay + WorldCompass) generated pixel-level walkthrough videos of scenes. You got video frames, not reusable assets. HY-World 2.0 generates persistent, editable 3D assets you can open in a game engine and modify.

**Is Hunyuan really free?**
Most model weights are open-source on Hugging Face under permissive licenses (check each repo for specific terms). Self-hosting is free. Tencent Cloud hosted API is pay-as-you-go.

**Does Hunyuan have a consumer chat product?**
Tencent runs a Hunyuan chat surface at [hunyuan.tencent.com](https://hunyuan.tencent.com), primarily for Chinese-market users. English coverage is limited compared to Qwen or DeepSeek.

**How does Hunyuan-Large compare to Qwen3 or DeepSeek V3?**
Hunyuan-Large is a 389B MoE and is capable but trails Qwen3.6 Plus and DeepSeek V3 on most independent benchmarks. For pure LLM work, Qwen and DeepSeek are usually better picks. Hunyuan's advantage is the broader model family, especially the 3D and video models.

## Sources

- [Tencent-Hunyuan/HY-World-2.0 GitHub](https://github.com/Tencent-Hunyuan/HY-World-2.0)
- [Hugging Face tencent organization](https://huggingface.co/tencent)
- [HY World project page](https://hyworld.dev/)
- [BigGo Finance: Tencent open-sources Hunyuan 3D World Model 2.0](https://finance.biggo.com/news/0jPDlZ0BvthpMgHBvLv3)
- [Tencent Cloud Hunyuan](https://cloud.tencent.com/product/hunyuan)

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Video](/categories/ai-video/) · [AI Image](/categories/ai-image/)
- **See also:** [Qwen](/tools/qwen/) · [DeepSeek](/tools/deepseek/) · [GLM](/tools/glm/) · [Kling](/tools/kling/) · [Rodin](/tools/rodin/)
- **News:** [Tencent Open-Sources Hunyuan 3D World Model 2.0](/news/2026-04-16-tencent-hunyuan-world-2-open-source/)
