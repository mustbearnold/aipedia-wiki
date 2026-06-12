---
type: tool
slug: stable-diffusion
title: Stable Diffusion
tagline: Stability AI's open-weight image model family. SD 3.5 Large remains the flagship as of June 2026. Free to self-host with a compatible GPU, or access via Stability API at 3-8 credits per image.
category: ai-image
secondary_categories: [ai-design]
company: 'Stability AI (model); ecosystem includes Automatic1111, ComfyUI, InvokeAI'
url: 'https://stability.ai'
github_url: https://github.com/Stability-AI/generative-models
pricing_model: free
price_range: Free (self-host) or ~$0.03-$0.08 per API image
status: active
launched: 2022-08
last_updated: 2026-06-12
last_verified: 2026-06-12
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
  model_family:
    value: "Open-weight Stable Image/Stable Diffusion family from Stability AI, with self-hosting options plus hosted platform access."
    source: "https://stability.ai/stable-image"
    source_label: "Stability AI Stable Image"
    source_id: stability-stable-image
    verified_at: 2026-06-12
    next_review_at: 2026-09-05
    volatility: high
    confidence: high
  api_available:
    value: "Yes. Stability platform docs expose hosted image generation APIs for teams that do not want to run local inference."
    source: "https://platform.stability.ai/docs"
    source_label: "Stability AI platform docs"
    source_id: stability-docs
    verified_at: 2026-06-12
    next_review_at: 2026-09-05
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Self-hosting is free apart from infrastructure and license constraints; hosted Stability API pricing is credit-based and should be reviewed before volume use."
    source: "https://platform.stability.ai/pricing"
    source_label: "Stability AI pricing"
    source_id: stable-diffusion-pricing
    verified_at: 2026-06-12
    next_review_at: 2026-09-05
    volatility: high
    confidence: high
  best_for:
    value: "Teams that need controllable image generation, local/open-weight workflows, custom pipelines, or ecosystem flexibility beyond a closed web app."
    source: "https://stability.ai/stable-image"
    source_label: "Stability AI Stable Image"
    source_id: stability-stable-image
    verified_at: 2026-06-12
    next_review_at: 2026-09-05
    volatility: high
    confidence: high
  watch_out_for:
    value: "The open model ecosystem shifts quickly; verify the exact checkpoint, license, safety filters, and hardware requirements instead of treating Stable Diffusion as one product."
    source: "https://stability.ai/news-updates"
    source_label: "Stability AI news"
    source_id: stable-diffusion-official
    verified_at: 2026-06-12
    next_review_at: 2026-09-05
    volatility: high
    confidence: high
tags: [ai-image, open-source, stable-diffusion, local-ai, fine-tuning, comfyui, civitai, lora, controlnet]
seo_title: "Stable Diffusion Review: SD 3.5, Local Setup, Pricing and Alternatives"
meta_description: "Stable Diffusion is the open-weight image model family for local generation, LoRA fine-tuning, ControlNet, and ComfyUI workflows. Compare SD 3.5, API pricing, Flux, and Midjourney."
author: "aipedia.wiki Editorial"
best_for:
  - open-weight self-hosting
  - LoRA and checkpoint fine-tuning
  - ControlNet conditioning workflows
  - unlimited uncensored local generation
  - ComfyUI node-based pipelines
not_best_for:
  - out-of-the-box photoreal quality (Flux 2 Pro / Midjourney v7 win)
  - non-technical users
  - hand and text rendering
  - Adobe-style IP indemnification
quick_answer: >-
  Stable Diffusion is the best AI image option when you need local control, open weights, LoRA fine-tuning, ControlNet, or ComfyUI pipelines. Pick it for customization and high-volume self-hosting. Choose Flux or Midjourney if you want stronger default photoreal output with less setup.
decision_brief:
  items:
    - label: Start here
      value: "SD 3.5 + ComfyUI"
      detail: "Best route for serious local workflows and repeatable pipelines."
    - label: Choose it for
      value: "Control and volume"
      detail: "Self-hosting removes per-image caps once hardware is in place."
    - label: Skip if
      value: "You want instant polish"
      detail: "Flux and Midjourney need less setup for strong default images."
price_history:
  - date: 2026-01-29
    plan: "SD 3.5 Large ControlNet"
    price: "Free (open weights)"
    source: "https://platform.stability.ai/pricing"
    source_label: "Source"
    source_id: stable-diffusion-pricing
    note: "Blur, Canny, and Depth ControlNets released for SD 3.5 Large"
  - date: 2026-04-15
    plan: "Stability API"
    price: "3-8 credits per image"
    source: "https://platform.stability.ai/pricing"
    source_label: "Source"
    source_id: stable-diffusion-pricing
    note: "Verified: Core 3, SD 3.5 Large 6.5, Turbo 4, Ultra 8; 1 credit = $0.01"
  - date: 2026-05-13
    plan: "Stability API"
    price: "3-8 credits per image"
    source: "https://platform.stability.ai/pricing"
    source_label: "Source"
    source_id: stable-diffusion-pricing
    note: "Re-verified unchanged. SD 3.5 Large remains flagship; no SD 4 release date announced."
  - date: 2026-06-05
    plan: "Stability API"
    price: "3-8 credits per image"
    source: "https://platform.stability.ai/pricing"
    source_label: "Source"
    source_id: stable-diffusion-pricing
    note: "Re-verified: 1 credit = $0.01; Stable Image Core 3 credits, SD 3.5 Medium 3.5, Large Turbo 4, Large 6.5, Ultra 8. License page keeps Community free under $1M annual revenue and Enterprise above that threshold."
---

# Stable Diffusion

Stability AI's open-weight image model family. The flagship as of June 2026 is **SD 3.5 Large** (8.1B parameters, MMDiT architecture), alongside SD 3.5 Large Turbo (4-step distilled), SD 3.5 Medium (2.5B, consumer-hardware optimized), and Stable Image services on the hosted API.

Model weights are publicly downloadable under the Stability AI Community License: free for anyone earning under $1M/year, including commercial use. Paid access runs through the Stability API (3-8 credits per image) or third-party hosts like Replicate and Fal. No official SD 4 launch is reflected in current public Stability sources.

## System Verdict

> **Pick Stable Diffusion if you need open weights, deep customization, or unlimited volume.** Nothing else lets you self-host the model, fine-tune with LoRA or DreamBooth, condition with ControlNet, and generate without caps or content filters. The Civitai checkpoint ecosystem and ComfyUI node graph together form a moat no closed tool has matched. SD 3.5 Large with NVIDIA NIM and TensorRT optimizations is roughly 2x faster than SDXL with ~40% less VRAM.
>
> **Skip it if you need best-in-class default photoreal or minimal setup.** Flux 2 Pro and Midjourney v7 beat SD 3.5 Large on out-of-the-box aesthetic quality. ChatGPT's GPT Image 2 is faster to reach for casual use. Hand and text rendering remain weak across the SD family. Self-hosting demands an 8GB+ NVIDIA GPU and comfort with Python environments.
>
> **Who pays which tier:** Self-host free on any 8GB+ VRAM GPU (sub-$1M revenue). Stability API for occasional cloud calls at $0.03-$0.08 per image. Third-party hosts (Replicate, Fal) for managed infrastructure without the Stability credit system. Enterprise license only above $1M annual revenue.

## Key Facts

| | |
|---|---|
| **Flagship model** | Stable Diffusion 3.5 Large (8.1B parameters, MMDiT, 1MP) |
| **Family members** | SD 3.5 Large · SD 3.5 Large Turbo (4-step) · SD 3.5 Medium (2.5B, 0.25-2MP) |
| **Prior generations** | SDXL (still widely used in community) · SD 1.5 (legacy, low-VRAM workflows) |
| **SD 4 status** | Not launched as of June 12, 2026 |
| **License** | Stability AI Community License · free under $1M annual revenue (commercial OK) |
| **Enterprise license** | Required above $1M annual revenue · contact Stability AI |
| **Weights host** | Hugging Face (stabilityai/stable-diffusion-3.5-large) · Civitai |
| **Stability API pricing** | Core: 3 credits ($0.03) · SD 3.5 Large: 6.5 ($0.065) · Turbo: 4 ($0.04) · Ultra: 8 ($0.08) |
| **Free API credit** | 25 credits on signup |
| **Local minimum VRAM** | 8GB NVIDIA (SD 3.5 Large) · 4-6GB SDXL/1.5 with optimizations |
| **AMD / Apple support** | ONNX for Radeon and Ryzen AI · CoreML for Apple Silicon |
| **ControlNet (SD 3.5)** | Blur, Canny, Depth (released Jan 29, 2026) |
| **Companion models** | Stable Video 4D 2.0 (video) · Stable Audio · Stable 3D |

Every data point above was verified against vendor sources on 2026-06-12. See Sources.

## What it actually is

An open-weight text-to-image model family published by Stability AI, paired with a paid cloud API and a deep community stack. The locally-runnable weights are the product; the API is a convenience layer for teams that do not want to manage GPUs.

Three moats compound over time:

- **Open weights.** Every other frontier image tool (Midjourney, Flux Pro, GPT Image 2, Firefly) gates access behind an API. SD weights are downloadable, forkable, and fine-tunable by anyone. This is the reason SD survived Stability AI's 2024 leadership upheaval: the community kept shipping regardless.
- **Civitai checkpoint ecosystem.** Tens of thousands of community-trained checkpoints and LoRAs cover photorealism, anime, architecture, product photography, and niches no vendor would build. Downloadable free. This library is the real competitive advantage vs. Flux or closed tools. No one has replicated it.
- **ComfyUI workflow flexibility.** The node-based graph UI lets users chain ControlNet, IP-Adapter, regional prompting, upscaling, and inpainting into reproducible pipelines. Production studios use ComfyUI workflows as serializable assets. Automatic1111 and InvokeAI cover less technical users but lose pipeline-as-code depth.

## When to pick Stable Diffusion

- **Self-hosting is a hard requirement.** Air-gapped environments, privacy-sensitive workloads, regulatory constraints, or teams unwilling to send prompts to a third-party API.
- **Fine-tuning on a custom subject or style.** LoRA training on 10-20 images produces a consistent face, product, or aesthetic that no closed tool exposes. DreamBooth for heavier personalization.
- **ControlNet-style spatial conditioning.** Depth maps, Canny edges, OpenPose skeletons, and lineart conditioning for precise composition control, unmatched by Midjourney or GPT Image 2.
- **High-volume generation without per-image cost.** Studios producing thousands of variants a day: self-host amortizes faster than API billing past a few hundred images.
- **Unrestricted content (within legal limits).** No built-in content filter when self-hosted. Users retain responsibility under the Acceptable Use Policy.
- **Production pipelines in ComfyUI.** Reproducible node graphs beat prompt-only workflows for clients and teams that need deterministic output.

## When to pick something else

- **Default photoreal quality:** [Flux](/tools/flux/). FLUX.2 Pro beats SD 3.5 Large on out-of-the-box realism and hand/text rendering.
- **Fastest path to polished output:** [Midjourney](/tools/midjourney/). v7's aesthetic baseline is higher with zero setup.
- **Text rendering and typography in images:** [Ideogram](/tools/ideogram/). Still the leader for poster, logo, and UI text generation.
- **Balanced web UI with training built in:** [Leonardo](/tools/leonardo/). Hosted UI with LoRA training and style consistency for creators who want SD-adjacent control without local setup.
- **Bundled with chat and broad ecosystem:** [ChatGPT](/tools/chatgpt/). GPT Image 2 is adequate for most casual generation and integrated with text workflows.
- **Commercial indemnification:** Adobe Firefly. Trained on licensed content, comes with IP safe-harbor terms Stability does not offer.

## Pricing

### Self-host (open weights)

| Resource | Cost | Notes |
|---|---|---|
| SD 3.5 Large / Turbo / Medium weights | Free | Download from Hugging Face or Civitai under Community License |
| SDXL and prior weights | Free | Still supported by Automatic1111, ComfyUI, InvokeAI |
| Automatic1111 / ComfyUI / InvokeAI | Free | Open-source interfaces |
| Civitai checkpoints and LoRAs | Free | Community-trained add-ons; terms per model page |
| Hardware (NVIDIA) | One-time | 8GB+ VRAM recommended for SD 3.5 Large (RTX 3070/4070+) |
| Hardware (AMD / Apple) | One-time | ONNX runtime for Radeon/Ryzen AI; CoreML for Apple Silicon |
| Commercial use under $1M revenue | Free | Community License covers this tier |
| Commercial use above $1M revenue | Enterprise license | Contact Stability AI for terms |

### Stability API (managed cloud)

| Model | Credits / image | USD / image | Best for |
|---|---|---|---|
| Stable Image Core | 3 | $0.03 | Fast iteration, social graphics, bulk |
| Stable Image Ultra | 8 | $0.08 | Flagship-quality cloud generation |
| SD 3.5 Large (API) | 6.5 | $0.065 | Hosted SD 3.5 Large without self-hosting |
| SD 3.5 Large Turbo | 4 | $0.04 | 4-step distilled for speed |
| Signup free credits | 25 | $0.25 | Trial use |

### Third-party managed hosts

| Provider | Typical range | Notes |
|---|---|---|
| Replicate | ~$0.003-$0.01 per image | Pay-as-you-go per-second GPU billing; SD 3.5 Large Turbo available |
| Fal.ai | Similar range | Low-latency inference endpoints |

Prices verified 2026-06-12 via [Stability platform pricing](https://platform.stability.ai/pricing), [Stability news](https://stability.ai/news), and the [Stability Community License](https://stability.ai/license). 1 credit = $0.01. Self-hosting remains free under the Community License for qualifying users.

**Who's it for:** Self-host for high-volume, customization, privacy, or sub-$1M commercial use. Stability API for occasional cloud calls without managing GPUs. Third-party hosts (Replicate, Fal) for managed infrastructure billed by GPU-second.

## Against the alternatives

| | Stable Diffusion (SD 3.5 Large) | Flux (FLUX.2 Pro) | Midjourney v7 |
|---|---|---|---|
| **Photoreal quality (default)** | Good, below Flux/MJ | Strongest open-weight photoreal | Strongest aesthetic baseline |
| **Customizability** | Highest (LoRA, DreamBooth, ControlNet, ComfyUI) | High (LoRA available) | Low (sref, style tuner only) |
| **Open weights** | Yes (Community License) | Yes (Dev weights open; Pro is API-only) | No (closed) |
| **API cost** | 3-8 credits ($0.03-$0.08) | Higher per image | Included in subscription |
| **Ecosystem (checkpoints, workflows)** | Largest (Civitai + ComfyUI) | Growing, smaller than SD | None (closed platform) |
| **Hand / text rendering** | Weak (SD family limitation) | Improved over SD | Stronger |
| **Best viewed as** | Open-weight workhorse with the deepest customization stack | Open-weight photoreal leader | Closed aesthetic leader |

## Failure modes

- **Default photoreal quality trails Flux 2 Pro and Midjourney v7.** SD 3.5 Large is competitive with the right checkpoint and LoRA stack, but the base model alone loses to Flux and MJ on realism, skin, and lighting. Budget time for checkpoint shopping if photoreal is the goal.
- **Hand, finger, and text rendering remain weak.** Structural issue across the SD family, only partially fixed in 3.5. Workarounds: ControlNet pose conditioning for hands, post-hoc inpainting for text, or switch models for typography (Ideogram).
- **Self-host requires real technical setup.** Python environment management, CUDA drivers, model downloads, interface choice (A1111 / ComfyUI / InvokeAI), checkpoint selection. Not a 5-minute onboarding. Docker images help but do not eliminate the learning curve.
- **GPU requirements gate access.** 8GB+ VRAM NVIDIA is the practical minimum for SD 3.5 Large; AMD and Apple Silicon work via ONNX/CoreML but with reduced tooling maturity. Users without a GPU must rent cloud instances (Vast.ai, RunPod) or use the API.
- **Built-in safety checker is trivial to disable.** Self-hosters can turn off the content filter by editing a single line. Responsibility for outputs shifts entirely to the user under the Acceptable Use Policy. Commercial deployments need their own moderation.
- **Release cadence and roadmap are uneven.** Stability's public platform still centers SD 3.5 and Stable Image services. The community ecosystem keeps shipping nodes, LoRAs, checkpoints, and workflows, but buyers should not budget around an unannounced SD 4 date.
- **License tier jump at $1M revenue.** The Community License's free commercial tier ends at $1M annual revenue. Growing teams must budget for the Enterprise license conversion or migrate to fully permissive alternatives.
- **Copyright ambiguity.** Like all web-scraped-trained models, outputs carry unresolved IP exposure. Adobe Firefly's indemnification offer is a meaningful differentiator for enterprise legal teams; Stability does not match it.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-12 against [Stability AI news](https://stability.ai/news), [Stability AI license](https://stability.ai/license), [Stability platform pricing](https://platform.stability.ai/pricing), and the [SD 3.5 Large Hugging Face model card](https://huggingface.co/stabilityai/stable-diffusion-3.5-large).

## FAQ

**Is Stable Diffusion free?**
Yes, under the Stability AI Community License. SD 1.5, SDXL, SD 3.5 Large, Turbo, and Medium weights are all downloadable at no cost, and commercial use is free for individuals and organizations earning under $1M annual revenue. The only costs for self-hosting are hardware (8GB+ VRAM GPU recommended for SD 3.5 Large) and electricity. Above $1M annual revenue, an Enterprise license is required: contact Stability AI.

**Has SD 4 launched?**
No. As of June 12, 2026, SD 3.5 Large remains Stability AI's flagship public Stable Diffusion model. The SD 3.5 family (Large, Large Turbo, Medium) was released October 2024 and remains available through current platform pricing. No SD 4 release date has been announced.

**What GPU do I need to run SD 3.5 Large locally?**
NVIDIA GPU with 8GB+ VRAM is the practical minimum (RTX 3070 / 4070 and above). TensorRT optimizations reduce VRAM usage by roughly 40% on RTX GPUs. AMD Radeon and Ryzen AI are supported via ONNX runtime. Apple Silicon Macs run via CoreML backends. SD 3.5 Medium (2.5B parameters) targets consumer hardware and runs on lower-VRAM setups. SDXL and SD 1.5 remain viable for 4-6GB VRAM GPUs with optimizations.

**What is the Stability API pricing?**
Credits on the Stability API are $0.01 each. Stable Image Core costs 3 credits ($0.03) per image, SD 3.5 Large Turbo 4 credits ($0.04), SD 3.5 Large 6.5 credits ($0.065), and Stable Image Ultra 8 credits ($0.08). New users get 25 free credits on signup. Third-party hosts like Replicate and Fal offer per-second GPU billing that can be cheaper for specific workloads.

**Can I use Stable Diffusion commercially?**
Yes. Commercial use is free under the Community License for individuals and organizations earning under $1M annual revenue. Above $1M, an Enterprise license is required. Outputs can be sold, used in products, or licensed further, subject to the Acceptable Use Policy. Note: Stability does not offer Adobe Firefly-style IP indemnification; teams requiring legal safe harbor should evaluate Firefly as an alternative.

**How does SD 3.5 Large compare to Flux and Midjourney?**
Out of the box, Flux 2 Pro and Midjourney v7 produce more polished photoreal and aesthetic outputs. SD 3.5 Large's advantage is customization: LoRA fine-tuning, ControlNet conditioning, and the Civitai checkpoint library close or exceed the gap for specific niches (consistent characters, product photography, architectural rendering). Midjourney is closed-weight with no self-hosting option. Flux is partially open (Dev weights) but with a smaller ecosystem than SD. Pick SD for depth of control; pick Flux for default photoreal; pick Midjourney for aesthetic baseline.

**Is SDXL still useful in 2026?**
Yes. SDXL remains widely used in the community. Stability AI no longer positions it as flagship, but the library of SDXL checkpoints, LoRAs, and ControlNets on Civitai is larger and more mature than the SD 3.5 ecosystem. Automatic1111 and ComfyUI fully support both. If a community checkpoint fits your use case, SDXL is still a valid production choice.

## Related

- [Flux](/tools/flux/) · open-weight photoreal leader; weaker ecosystem, stronger defaults
- [Midjourney](/tools/midjourney/) · closed aesthetic leader, no self-host
- [Ideogram](/tools/ideogram/) · text-in-image specialist
- [Leonardo](/tools/leonardo/) · hosted SD-adjacent UI with LoRA training
- [Adobe Firefly](/tools/adobe-firefly/) · commercial indemnification alternative
- [ChatGPT](/tools/chatgpt/) · GPT Image 2 for bundled text+image workflows
- **Category:** [AI Image](/categories/ai-image/) · [AI Design](/categories/ai-design/)

## Sources

- [Stability AI news and updates](https://stability.ai/news) (verified 2026-06-12)
- [Stability AI Community License](https://stability.ai/license) (verified 2026-06-12)
- [Stability AI developer platform pricing](https://platform.stability.ai/pricing) (verified 2026-06-12)
- [Introducing Stable Diffusion 3.5](https://stability.ai/news/introducing-stable-diffusion-3-5) (verified 2026-06-12)
- [Stability AI Stable Image product page](https://stability.ai/stable-image) (verified 2026-06-12)
- [SD 3.5 Large Hugging Face model card](https://huggingface.co/stabilityai/stable-diffusion-3.5-large) (verified 2026-06-12)
- [SD 3.5 Large ControlNets release, Jan 29, 2026](https://comfyui-wiki.com/en/news/2024-11-26-sd3-5-large-controlnets) (verified 2026-06-12)
- [Civitai community checkpoint repository](https://civitai.com) (verified 2026-06-12)
