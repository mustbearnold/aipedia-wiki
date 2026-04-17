---
type: news
slug: 2026-03-05-reka-edge-7b-launch
title: "Reka Ships Edge 7B for On-Device Multimodal Physical AI"
date: 2026-03-05
severity: minor
summary: "Reka released Edge, a 7B-parameter multimodal model optimized for on-device deployment in robotics, cameras, and embedded systems. Edge outperforms other 7B vision-language models on MLVU and MMVU benchmarks. The release extends Reka's lineup to four tiers: Core (flagship), Flash, Edge, and Spark. API pricing unchanged."
affects: [reka]
categories: [ai-chatbots]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-17
last_verified: 2026-04-17
sources:
  - url: "https://reka.ai"
    title: "Reka"
---

Reka shipped Edge, a 7-billion-parameter multimodal model, on March 5. Edge targets on-device inference for physical AI, robotics, cameras, and embedded systems where cloud round-trips are unacceptable.

On published benchmarks Edge leads other 7B vision-language models on MLVU (long-video understanding) and MMVU (multimodal reasoning). The release extends Reka's production lineup to four models: Core (67B flagship, $2 input / $6 output per MTok), Flash (21B balanced, $0.80 / $2), Edge (7B on-device, partner licensing), and Spark (1B ultra-low-latency, $0.05 / $0.05).

Reka's differentiator is native long-context video understanding. Where most LLMs rely on chunked frame extraction, Reka models process hours of video directly in a single forward pass. Core leads Gemini Ultra 59.3% to 54.7% on the Perception-Test video-QA benchmark. Edge brings that capability down to a size that runs on a single consumer GPU.

The company remains enterprise-focused. Dedicated and on-prem deployment options set it apart from API-only frontier labs like Anthropic and OpenAI. The $110 million 2025 round led by NVIDIA and Snowflake valued Reka at unicorn status.

## Sources

- [Reka](https://reka.ai)
