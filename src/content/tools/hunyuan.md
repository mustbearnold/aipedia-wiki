---
type: tool
slug: hunyuan
title: Hunyuan
tagline: >-
  Tencent's AI model family covering LLMs, 3D world generation, video, image, and embodied AI. HY-World 2.0, Hy3-preview, and HY-OmniWeaving are the 2026 open-weight anchors.
category: ai-chatbots
secondary_categories: [ai-video, ai-image]
company: Tencent
url: https://hunyuan.tencent.com
pricing_model: freemium
price_range: "Free (open weights) / Tencent Cloud API variable"
status: active
launched: 2023-09
last_updated: 2026-06-02
last_verified: 2026-06-02
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
    verified_at: '2026-06-02'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  pricing_anchor:
    value: Hunyuan pricing is cloud/API-model dependent; verify the current Tencent Cloud billing docs for each model family
      and context/output mode.
    source: https://cloud.tencent.com/document/product/1729/97731
    source_label: Tencent Cloud Hunyuan pricing docs
    source_id: hunyuan-pricing
    verified_at: '2026-06-02'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  api_available:
    value: Tencent Cloud docs are the implementation source for authentication, endpoints, model lists, quotas, and regional/service
      constraints.
    source: https://cloud.tencent.com/document/product/1729
    source_label: Tencent Cloud Hunyuan docs
    source_id: hunyuan-docs
    verified_at: '2026-06-02'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  model_catalog:
    value: The Hunyuan public surface spans multiple model modalities, so recommendations should be specific to the target text/image/video
      model.
    source: https://hunyuan.tencent.com/
    source_label: Tencent Hunyuan official site
    source_id: hunyuan-official
    verified_at: '2026-06-02'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  watch_out_for:
    value: For international buyers, check availability, language fit, data residency, compliance, license terms, API access path,
      and pricing currency before choosing Hunyuan.
    source: https://cloud.tencent.com/product/hunyuan
    source_label: Tencent Cloud Hunyuan product
    source_id: hunyuan-cloud
    verified_at: '2026-06-02'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
tags: [tencent, open-weights, hunyuan, hy3-preview, hy-world, omniweaving, 3d-world-model, world-model, chinese-llm, video-gen, image-gen, gaussian-splatting, embodied-ai]
price_history:
  - date: 2026-05-13
    plan: "Hy3-preview (open weights)"
    price: "Free"
    source: "https://huggingface.co/tencent/Hy3-preview"
    source_label: "Source"
    source_id: hunyuan-hy3
    note: "295B MoE / 21B activated, 192 experts top-8, 256K context, BF16. Released April 23, 2026 on Hugging Face, ModelScope, GitCode. Benchmarks: SWE-bench Verified 74.4%, Terminal-Bench 2.0 54.4%, GPQA Diamond 87.2%."
  - date: 2026-05-13
    plan: "HY-OmniWeaving (open weights)"
    price: "Free"
    source: "https://huggingface.co/tencent/HY-OmniWeaving"
    source_label: "Source"
    source_id: hunyuan-omniweaving
    note: "Unified video generation built on HunyuanVideo-1.5 backbone. Code and weights released April 3, 2026. Supports 8 tasks: T2V, I2V, key-frames-to-video, reference-to-video, video editing, text-image-video-to-video, compositional multi-image-to-video, reasoning-augmented generation."
  - date: 2026-05-13
    plan: "HY-World 2.0 (open weights)"
    price: "Free"
    source: "https://huggingface.co/tencent/HY-World-2.0"
    source_label: "Source"
    source_id: hunyuan-hyworld
    note: "Open-source 3D world model released April 16, 2026. Outputs editable 3DGS, meshes, point clouds; imports into Unity, Unreal, Nvidia Isaac. WorldMirror 2.0 ~1.2B params, 50K-500K pixel flexible-resolution inference."
  - date: 2026-06-02
    plan: "HY-World 2.0 / Hy3-preview / HY-OmniWeaving"
    price: "Free open weights"
    source: "https://huggingface.co/tencent/HY-World-2.0"
    source_label: "Source"
    source_id: hunyuan-hyworld
    note: "HY-World 2.0 image-to-3DWorld generation code is now released after the initial April open-source drop. Hy3-preview and HY-OmniWeaving remain free open-weight evaluation surfaces; hosted Tencent Cloud API pricing remains model-specific."
seo_title: "Hunyuan: Features, Pricing & Review (June 2026)"
meta_description: "Hunyuan is Tencent's open-weight AI family. Key 2026 releases: HY-World 2.0 (3D worlds, image-to-3DWorld code released), Hy3-preview 295B MoE LLM, and HY-OmniWeaving unified video. Free open weights plus Tencent Cloud hosted API."
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
  Hunyuan is Tencent's multi-surface open-weight AI family. The current 2026 anchors are HY-World 2.0 for editable 3D worlds, Hy3-preview for a 295B / 21B-active MoE LLM, and HY-OmniWeaving for unified video generation. The June 2 refresh confirms HY-World 2.0 image-to-3DWorld generation code is now released after the first April drop. Pick Hunyuan for open-source 3D, embodied AI, or strong-reasoning Chinese-stack workloads; skip for English consumer chat.
---

# Hunyuan

Tencent's open-weight AI model family. April 2026 was the family's strongest month on record: HY-World 2.0 open-sourced 3D world generation (April 16), Hy3-preview (April 23) shipped a 295B MoE LLM that rivals Qwen3.6 and DeepSeek V3 on reasoning and coding, HY-OmniWeaving (April 3) consolidated eight video tasks behind a single HunyuanVideo-1.5 backbone, and HY-Embodied-0.5 extended the family into image-text-to-text embodied AI. By the June 2 refresh, HY-World 2.0's image-to-3DWorld generation code was also released. Most weights ship on [Hugging Face](https://huggingface.co/tencent) under permissive licenses; hosted API access runs through Tencent Cloud.

## System Verdict

> **Pick Hunyuan if you need open-source 3D world generation, embodied AI, or a frontier-grade open MoE LLM.** HY-World 2.0 remains category-leading among open-source options, with editable output that imports cleanly into Unity, Unreal Engine, and Isaac. Hy3-preview (April 23, 2026) is now genuinely competitive with Qwen3.6 Plus and DeepSeek V3 on agentic coding and STEM reasoning, with a 256K context and only 21B activated parameters per token. HY-OmniWeaving unifies eight video-generation tasks behind one model, narrowing the gap with closed-source video frontiers for self-hosted use.
>
> **Skip it if you want English-first consumer chat or production-grade commercial video output.** Hy3-preview is a research-friendly weights drop; product polish still trails Qwen Chat and GLM for bilingual chat workflows. HY-OmniWeaving improves on HunyuanVideo but still trails [Kling](/tools/kling/), [Veo 3.1](/tools/veo/), and Runway Gen-4 on commercial output quality.
>
> **Where Hunyuan wins uniquely:** Open-source 3D world generation plus open-weight frontier reasoning plus unified open video, all under one organization. For game developers, AR/VR teams, robotics researchers, simulation engineers, and open-source-first R&D labs, Hunyuan is now the default starting point.

## Key Facts

| | |
|---|---|
| **Parent company** | Tencent (00700.HK) |
| **Flagship LLM (June 2026)** | **Hy3-preview** · 295B MoE / 21B activated · 256K context · released April 23, 2026 |
| **Hy3-preview benchmarks** | SWE-bench Verified 74.4% · Terminal-Bench 2.0 54.4% · GPQA Diamond 87.2% |
| **Hy3-preview architecture** | 192 experts, top-8 activated, BF16, open-weights on Hugging Face / ModelScope / GitCode |
| **Flagship 3D world model** | **HY-World 2.0** · released April 16, 2026 · open-source |
| **HY-World 2.0 output** | 3D Gaussian Splattings, editable meshes, point clouds; image-to-3DWorld generation code released |
| **HY-World 2.0 imports to** | Unity, Unreal Engine, Nvidia Isaac |
| **HY-World 2.0 architecture** | 4-stage pipeline: HY-Pano 2.0, WorldNav, WorldStereo 2.0, WorldMirror 2.0 |
| **WorldMirror 2.0 size** | ~1.2B parameters |
| **HY-World 2.0 resolution** | 50K to 500K pixels, flexible-resolution inference |
| **Unified video model** | **HY-OmniWeaving** · April 3, 2026 · 8 unified video tasks, built on HunyuanVideo-1.5 |
| **OmniWeaving features** | Thinking Mode, Hidden States DeepStacking, MLLM + MMDiT + VAE architecture |
| **Embodied AI** | HY-Embodied-0.5 · 4B params, image-text-to-text |
| **Previous LLM family** | Hunyuan-Large (389B MoE), Hunyuan-Turbo, Hunyuan-Standard |
| **3D asset model** | Hunyuan3D (text-to-3D asset generation) |
| **Hosted API** | [Tencent Cloud Hunyuan API](https://cloud.tencent.com/product/hunyuan) |
| **Open-weight hub** | [Hugging Face tencent org](https://huggingface.co/tencent) (119 models, 400+ team members) |

## When to pick Hunyuan

- **Game developers generating 3D scenes.** HY-World 2.0 outputs are engine-importable. Text or image input becomes a playable level in Unity or Unreal.
- **Robotics and simulation teams.** Isaac import path plus open-source license makes this the default for training embodied agents in procedurally generated environments. HY-Embodied-0.5 adds a dedicated image-text-to-text model for the same audience.
- **AR and VR content pipelines.** Gaussian Splatting output is first-class in modern XR workflows; meshes work for mobile AR and WebXR.
- **Open-weight agentic coding.** Hy3-preview's 74.4% SWE-bench Verified score puts it within reach of closed-source frontier LLMs while running fully open under permissive license terms.
- **Chinese-market LLM deployment.** Hy3-preview and Hunyuan-Large are tuned for Chinese language quality and integrate natively with Tencent Cloud services popular in China.
- **Unified open-weight video pipelines.** HY-OmniWeaving handles eight generation tasks in one model, useful for teams that want to self-host instead of paying per-clip on Kling or Veo 3.1.
- **Researchers working on world models or large MoE LLMs.** Open code plus weights plus technical reports make HY-World 2.0 and Hy3-preview credible research baselines.

## When to pick something else

- **Production video generation:** [Kling](/tools/kling/), [Veo 3](/tools/veo/), [Runway](/tools/runway/), [Hailuo](/tools/hailuo/) for commercial video output.
- **English-first chat:** [ChatGPT](/tools/chatgpt/), [Claude](/tools/claude/), [Gemini](/tools/gemini/), or [Qwen](/tools/qwen/) for multilingual.
- **3D character generation specifically:** [Rodin](/tools/rodin/), [Meshy](/tools/meshy/), [Tripo3D](/tools/tripo3d/) focus on single-asset 3D generation.
- **Closed-source world modeling at commercial grade:** Marble (closed, similar capability to HY-World 2.0 but licensed).

## Pricing

Hunyuan models are distributed primarily as open weights under permissive licenses on Hugging Face. Hosted inference through Tencent Cloud is pay-as-you-go and varies by model.

| Surface | Price |
|---|---|
| Hy3-preview (open weights) | Free · [Hugging Face](https://huggingface.co/tencent/Hy3-preview) |
| HY-World 2.0 (open weights) | Free · [Hugging Face](https://huggingface.co/tencent/HY-World-2.0) |
| HY-OmniWeaving (open weights) | Free · [Hugging Face](https://huggingface.co/tencent/HY-OmniWeaving) |
| HY-Embodied-0.5 (open weights) | Free · [Hugging Face](https://huggingface.co/tencent/HY-Embodied-0.5) |
| Hunyuan-Large (open weights) | Free · [Hugging Face](https://huggingface.co/tencent/Hunyuan-Large) |
| HunyuanVideo (open weights) | Free · [Hugging Face](https://huggingface.co/tencent/HunyuanVideo) |
| Hunyuan3D (open weights) | Free · [Hugging Face](https://huggingface.co/tencent/Hunyuan3D-1) |
| Tencent Cloud hosted API | Pay-as-you-go (see Tencent Cloud pricing) |

Self-hosted runs under the respective license terms. Commercial use allowed on most releases; verify the specific license in each repo.

## Recent developments

- **April 23, 2026:** Hy3-preview released. 295B MoE / 21B activated with a 256K context and 192-expert top-8 routing. Benchmarks land at 74.4% on SWE-bench Verified, 54.4% on Terminal-Bench 2.0, and 87.2% on GPQA Diamond, putting it in the same conversation as Qwen3.6 Plus and DeepSeek V3 for open-weight agentic coding and STEM reasoning. Available on Hugging Face, ModelScope, and GitCode.
- **April 16, 2026:** [Tencent open-sources Hunyuan World 2.0](/news/2026-04-16-tencent-hunyuan-world-2-open-source/) with editable 3DGS plus mesh output and Unity, Unreal, and Isaac import. Cross-reference Google's [Gemini 3D Models preview from April 10](/news/2026-04-10-google-gemini-3d-models/), which is closed-source and narrower in scope.
- **May 18, 2026:** HY-World 2.0 image-to-3DWorld generation code was released, reducing the launch-time gap between paper/model-card claims and usable open-source implementation.
- **April 3, 2026:** HY-OmniWeaving code and weights ship. Unified video model on the HunyuanVideo-1.5 backbone covering T2V, I2V, key-frames-to-video, reference-to-video, video editing, text-image-video-to-video, compositional multi-image-to-video, and reasoning-augmented generation.
- **Late March / April 2026:** HY-Embodied-0.5 extends the family into embodied AI with a 4B image-text-to-text model targeting robotics and on-device perception.

## Failure modes

- **Documentation lag in English.** Primary docs are in Chinese first. English translations trail the original by days to weeks.
- **Hy3-preview is a research preview.** Branded "preview" rather than a stable release; expect tokenizer, prompt-template, and serving-stack updates before a 1.0 cut.
- **Open-source release still needs repo-by-repo verification.** HY-World 2.0 image-to-3DWorld code is now released, but teams should still check task-specific scripts, licenses, checkpoints, and dependency health before building a production pipeline.
- **Video generation still trails commercial frontier.** HY-OmniWeaving is a meaningful jump over HunyuanVideo for open-weight users but does not match Kling, Veo 3.1, or Runway Gen-4 on commercial output quality.
- **Hosted API is Chinese-cloud.** Enterprise buyers in regulated Western markets need to evaluate Tencent Cloud data residency posture. Self-hosting open weights is the workaround.
- **LLM product polish trails Qwen and DeepSeek.** Hy3-preview narrows the gap on benchmarks but Qwen Chat and DeepSeek consumer apps remain easier first stops for non-developer users.
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

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-06-02 against [Tencent-Hunyuan/HY-World-2.0 GitHub](https://github.com/Tencent-Hunyuan/HY-World-2.0), the [Hugging Face tencent org](https://huggingface.co/tencent), the [Hy3-preview model card](https://huggingface.co/tencent/Hy3-preview), the [HY-OmniWeaving model card](https://huggingface.co/tencent/HY-OmniWeaving), and [Tencent Cloud Hunyuan](https://cloud.tencent.com/product/hunyuan).

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
Hunyuan-Large is a 389B MoE and is capable but trails Qwen3.6 Plus and DeepSeek V3 on most independent benchmarks. Hy3-preview (April 23, 2026) materially closes that gap with 74.4% on SWE-bench Verified and 87.2% on GPQA Diamond, putting it back in the open-weight frontier conversation. Hunyuan's broader advantage is still the multi-modality family spanning LLMs, 3D world models, video, and embodied AI.

**What is Hy3-preview?**
Tencent's April 23, 2026 open-weight MoE LLM. 295B total parameters with 21B activated per token, 192 experts top-8 routing, 256K context, BF16 precision. Strong on STEM, agentic coding (74.4% SWE-bench Verified, 54.4% Terminal-Bench 2.0), and instruction following. Released on Hugging Face, ModelScope, and GitCode. Branded "preview" rather than a stable 1.0.

**What is HY-OmniWeaving?**
A unified video generation model released April 3, 2026 on the HunyuanVideo-1.5 backbone. Handles eight tasks in a single model: text-to-video, image-to-video, key-frames-to-video, reference-to-video, video editing, text-image-video-to-video, compositional multi-image-to-video, and reasoning-augmented generation. Adds a "Thinking Mode" where an MLLM reasons over user intent before generation.

## Sources

- [Tencent-Hunyuan/HY-World-2.0 GitHub](https://github.com/Tencent-Hunyuan/HY-World-2.0)
- [Hugging Face tencent organization](https://huggingface.co/tencent)
- [Hy3-preview model card](https://huggingface.co/tencent/Hy3-preview)
- [HY-OmniWeaving model card](https://huggingface.co/tencent/HY-OmniWeaving)
- [HY World project page](https://hyworld.dev/)
- [BigGo Finance: Tencent open-sources Hunyuan 3D World Model 2.0](https://finance.biggo.com/news/0jPDlZ0BvthpMgHBvLv3)
- [Tencent Cloud Hunyuan](https://cloud.tencent.com/product/hunyuan)

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Video](/categories/ai-video/) · [AI Image](/categories/ai-image/)
- **See also:** [Qwen](/tools/qwen/) · [DeepSeek](/tools/deepseek/) · [GLM](/tools/glm/) · [Kling](/tools/kling/) · [Rodin](/tools/rodin/)
- **News:** [Tencent Open-Sources Hunyuan 3D World Model 2.0](/news/2026-04-16-tencent-hunyuan-world-2-open-source/) · [Google Gemini 3D Models preview (April 10, 2026)](/news/2026-04-10-google-gemini-3d-models/)
