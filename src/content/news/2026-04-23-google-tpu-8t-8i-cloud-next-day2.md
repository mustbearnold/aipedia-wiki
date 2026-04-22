---
type: news
slug: 2026-04-23-google-tpu-8t-8i-cloud-next-day2
title: "Google unveils 8th-gen TPU 8t and TPU 8i on Cloud Next Day 2: 3x Ironwood, purpose-built for training and agent serving"
date: 2026-04-23
severity: major
summary: "Google's Cloud Next 2026 Day 2 keynote unveiled the eighth-generation TPU family. TPU 8t (training) scales to 9,600 chips per superpod with 2 PB shared HBM, delivering 3x the processing power of Ironwood and 2x perf/watt. TPU 8i (inference) connects 1,152 chips per pod with 3x on-chip SRAM, designed to serve millions of concurrent agents at low latency. Arrives one day after Day 1's Ironwood (7th-gen) GA announcement. Signals Google's silicon roadmap is shipping a new generation every 12-18 months."
affects: [gemini]
categories: [ai-infrastructure, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-22
last_verified: 2026-04-22
sources:
  - url: "https://cloud.google.com/blog/topics/google-cloud-next/welcome-to-google-cloud-next26"
    title: "Welcome to Google Cloud Next '26 - Google Cloud Blog"
  - url: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/next-2026/"
    title: "Google Cloud Next 2026: news and updates - Google Blog"
  - url: "https://www.techradar.com/pro/live/google-cloud-next-2026"
    title: "Google Cloud Next 2026 live coverage - TechRadar"
---

**Google** unveiled the **eighth generation** of Tensor Processing Units at **Cloud Next 2026** on April 23, 2026, one day after the Day 1 Ironwood (7th-gen) GA announcement. The 8th-gen ships as two purpose-built variants: **TPU 8t** for training, **TPU 8i** for inference.

## TPU 8t: the training chip

- **9,600 TPUs per superpod** (up from Ironwood's 9,216).
- **2 PB shared high-bandwidth memory** per superpod.
- **3x the processing power of Ironwood** at equivalent chip count.
- **2x performance per watt** vs 7th-gen.
- Built for frontier-model pretraining and long post-training runs.

## TPU 8i: the inference chip

- **1,152 TPUs per pod**, tighter fabric for latency.
- **3x on-chip SRAM** vs Ironwood for attention-layer acceleration.
- Designed to **serve millions of concurrent agents cost-effectively**.
- Targets the 2026 agent-serving bottleneck: many small fast queries with shared-context state.

## Why two chips

Training and inference stress silicon differently. Ironwood had already split inference out as the design target for 7th-gen. The 8th-gen doubles down: **TPU 8t is a scale-up training monster** (bigger superpod, wider HBM), and **TPU 8i is a scale-out inference chip** (more tightly-clustered pod, SRAM-heavy). Hyperscaler customers can now pick the silicon that matches their workload rather than running inference on training-sized boxes.

## Ironwood vs. 8t/8i positioning

Ironwood (TPU v7) remains GA today. The 8th-gen is a **roadmap reveal** with staged availability through 2026-2027. Expect:

- **TPU 8i preview:** late 2026 via select Google Cloud regions.
- **TPU 8t GA:** 2027.
- **Anthropic's 1M-TPU commitment** (announced Day 1) scales across Ironwood and into 8th-gen as capacity comes online.

## Competitive read

- **vs Nvidia Blackwell / Vera Rubin:** Google takes the perf/watt claim seriously with TPU 8t's 2x improvement. Raw peak perf vs Nvidia's latest remains Nvidia's lead; Google's bet is total-cost-of-ownership on sustained workloads.
- **vs AWS Trainium2/3:** AWS's custom-silicon story is vertically integrated with its Anthropic anchor customer. Google has done the same through the Anthropic TPU commitment.
- **vs Azure's Maia and Cobalt:** Microsoft's custom-silicon program is further behind; Azure still runs most inference on Nvidia.

For **Gemini** users, the TPU 8t/8i roadmap points to continued downward pressure on Gemini API pricing through 2027 as capacity compounds. Gemini Flash-tier pricing is already near commodity; Pro tiers have runway to fall further.

## Related

- [Google unveils Ironwood TPU at Cloud Next 2026](/news/2026-04-22-google-ironwood-tpu-cloud-next-2026/)
- [Google assembles four-partner silicon coalition](/news/2026-04-22-google-four-partner-inference-chip-coalition/)
- [Amazon commits up to $25B more to Anthropic](/news/2026-04-20-amazon-anthropic-25b-infrastructure-pact/)
