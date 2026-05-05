---
type: news
slug: 2026-03-05-reka-edge-7b-launch
title: "Reka ships Edge 7B multimodal model for edge deployment"
date: 2026-03-05
severity: minor
summary: "Reka released Reka Edge 2603, a 7B multimodal vision-language model for image, video, object-detection, and tool-use tasks on edge-capable hardware."
affects: [reka]
categories: [ai-chatbots]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-05
last_verified: 2026-05-05
sources:
  - url: "https://huggingface.co/RekaAI/reka-edge-2603"
    title: "RekaAI/reka-edge-2603 - Hugging Face"
  - url: "https://docs.reka.ai/chat/models"
    title: "Models - Reka API"
  - url: "https://reka.ai"
    title: "Reka"
---

Reka released **Reka Edge 2603**, a 7B multimodal vision-language model that accepts image, video, and text inputs. The model card positions it for image understanding, video analysis, object detection, and agentic tool-use tasks.

The important detail is deployment shape. Reka describes Edge as suitable for Apple Silicon Macs, Linux or WSL systems with substantial GPU and system memory, and Nvidia Robotics and Edge AI hardware. With quantization, the model card also lists smaller device classes such as Jetson Orin Nano, Samsung S25, Snapdragon XR2 Gen 3 devices, and Apple mobile/vision hardware as custom deployment targets.

## Why it matters

Edge models matter because many physical-AI and inspection workflows cannot depend on a cloud round trip. A camera, robot, headset, or factory device may need local visual understanding for latency, privacy, or resilience reasons.

The benchmark story should be read carefully. Reka publishes strong scores across VQA, MLVU, MMVU, RefCOCO, hallucination, and mobile-action tasks, but those numbers still need to be tested against the buyer's own videos, hardware, latency targets, and failure cases.

## Tool impact

For [Reka](/tools/reka/), Edge makes the product line more relevant to teams that want multimodal AI outside the browser-chat pattern. The practical buyer question is whether Reka's deployment support, license terms, and hardware requirements fit the environment where the model will actually run.
