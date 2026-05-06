---
type: news
slug: 2026-05-05-gemma-4-mtp-drafters-inference
title: "Google releases MTP drafters to make Gemma 4 inference up to 3x faster"
date: 2026-05-05
severity: major
summary: "Google released Multi-Token Prediction drafters for the Gemma 4 family, using speculative decoding to improve inference speed by up to 3x without changing the target model outputs."
categories: [ai-models, ai-open-source, ai-infrastructure]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-07
last_verified: 2026-05-07
affects: [gemini, llama]
related_tools: [gemini, llama]
sources:
  - url: https://blog.google/innovation-and-ai/technology/developers-tools/multi-token-prediction-gemma-4/
    title: "Accelerating Gemma 4: faster inference with multi-token prediction drafters"
---

# Google releases MTP drafters to make Gemma 4 inference up to 3x faster

Google announced on May 5, 2026, that it is releasing Multi-Token Prediction drafters for the Gemma 4 family. The drafters use speculative decoding: a lighter drafter proposes several future tokens, and the larger target Gemma 4 model verifies them in parallel.

Google says the result can be up to a 3x speedup without output-quality or reasoning degradation because the target model still performs final verification. The release applies to Gemma 4 variants across workstation, mobile, and cloud use cases, with weights available under the same Apache 2.0 licensing posture as Gemma 4.

The update targets a familiar inference bottleneck. Standard autoregressive generation often spends substantial time moving model parameters from memory to compute units for one token at a time. Speculative decoding tries to use idle compute to produce multiple candidate tokens per step.

## Why this matters

Open-weight competition is no longer only about benchmark quality. Inference speed, local-device responsiveness, and cost per generated token are becoming decisive for real deployments.

Gemma 4 already pressured Llama by pairing strong open-model performance with Apache licensing. Official drafters make that pressure more practical for developers who care about latency and hardware efficiency.

## Buyer take

If you run local or self-hosted models, test Gemma 4 with MTP drafters against Llama and other open models on your actual hardware. The claimed gains depend on model size, runtime, batch size, and device.

For teams comparing Gemini and open-weight Google models, this release strengthens Gemma as the local or VPC path beside the hosted Gemini stack.

## What is still unclear

Real-world speedups will vary by framework and workload. Benchmarks on a workstation, mobile device, and production batch-serving cluster can look very different.
