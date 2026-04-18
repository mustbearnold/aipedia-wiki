---
type: news
slug: 2026-04-16-tencent-hunyuan-world-2-open-source
title: "Tencent Open-Sources Hunyuan 3D World Model 2.0"
date: 2026-04-16
severity: major
summary: "Tencent released and open-sourced Hunyuan 3D World Model 2.0 (HY-World 2.0) on April 16, 2026. Generates and reconstructs editable 3D worlds (meshes + Gaussian Splattings) from text, single images, multi-view images, or video. Outputs import directly into Unity, Unreal Engine, and Isaac. Replaces the video-based HY-World 1.0 approach with persistent editable 3D assets. Achieves SOTA among open-source 3D world models; comparable to closed-source Marble."
affects: [hunyuan]
categories: [ai-video, ai-image]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-18
last_verified: 2026-04-18
sources:
  - url: "https://github.com/Tencent-Hunyuan/HY-World-2.0"
    title: "HY-World 2.0 GitHub repository"
  - url: "https://huggingface.co/tencent/HY-World-2.0"
    title: "HY-World 2.0 on Hugging Face"
  - url: "https://hyworld.dev/"
    title: "HY World 2.0 project page"
---

Tencent open-sourced **Hunyuan 3D World Model 2.0** (HY-World 2.0) on April 16, 2026. It's a multi-modal world model that generates and reconstructs **editable 3D worlds** from text, single images, multi-view images, or video inputs. The code and technical report landed on GitHub and Hugging Face.

## What it actually does

**Two core modes:**

1. **World Generation.** Text or single-image input becomes a navigable 3D scene.
2. **World Reconstruction.** Multi-view images or video become 3D models with inferred depth, normals, camera parameters, and point clouds.

**Output format:**
- 3D Gaussian Splattings (3DGS)
- Editable meshes
- Point clouds

Outputs import directly into **Unity, Unreal Engine, and Isaac**. That's the key distinction versus Hunyuan's previous generation.

## What changed from HY-World 1.0

Hunyuan World 1.0 (also called WorldPlay + WorldCompass) generated **pixel-level videos**. You got a walkthrough video of a scene but no reusable 3D assets.

HY-World 2.0 generates **persistent, editable 3D assets** you can open in a game engine and modify. That's the ceiling shift: from "video of a world" to "the world itself."

## Architecture

Four-stage pipeline:

1. **Panorama Generation** via HY-Pano 2.0
2. **Trajectory Planning** via WorldNav
3. **World Expansion** via WorldStereo 2.0
4. **World Composition** via WorldMirror 2.0

Key model size: **WorldMirror 2.0 at ~1.2B parameters**. Feed-forward reconstruction supports flexible-resolution inference from 50K to 500K pixels.

## Why it matters

**For game developers and 3D artists:** Tencent just open-sourced a production-adjacent alternative to Marble (closed-source) and other commercial 3D world generators. Asset ownership and licensing stop being vendor-dependent. You can generate a level, drop it into Unreal, and ship.

**For robotics and simulation:** Isaac support makes this usable for training embodied agents. Robotics teams that previously needed bespoke pipelines for environment generation now have an open-source starting point.

**For the broader open-source story:** After Qwen3.6-35B-A3B (same day, April 16) in the LLM space, Hunyuan World 2.0 is the second major open-source flagship release in 24 hours. The open-source parity trend we flagged in [our trends coverage](/trends/open-source-parity/) extends beyond text into 3D and world models.

## Performance claims

Tencent reports SOTA performance among open-source 3D world modeling approaches on key benchmarks, with results **comparable to closed-source Marble**. Specific benchmark numbers are in the technical report linked from the GitHub repo.

Independent verification will follow in the weeks ahead as teams ingest the repo. The initial release includes partial code; full code is listed as "coming soon."

## Availability

- **Code + partial weights:** [GitHub Tencent-Hunyuan/HY-World-2.0](https://github.com/Tencent-Hunyuan/HY-World-2.0)
- **Model files:** [Hugging Face tencent/HY-World-2.0](https://huggingface.co/tencent/HY-World-2.0)
- **Project page:** [hyworld.dev](https://hyworld.dev/)

## Sources

- [HY-World 2.0 GitHub](https://github.com/Tencent-Hunyuan/HY-World-2.0)
- [HY-World 2.0 Hugging Face](https://huggingface.co/tencent/HY-World-2.0)
- [HY World project page](https://hyworld.dev/)
- [BigGo Finance: Tencent Open-Sources Hunyuan 3D World Model 2.0](https://finance.biggo.com/news/0jPDlZ0BvthpMgHBvLv3)
- [Futunn: Tencent releases and open-sources HunYuan 3D World Model 2.0](https://news.futunn.com/en/post/71577446/tencent-releases-and-open-sources-hunyuan-3d-world-model-2)
