---
type: news
slug: 2026-04-22-google-ironwood-tpu-cloud-next-2026
title: "Google unveils Ironwood at Cloud Next 2026: 7th-gen TPU built for inference, 10x v5p, Anthropic commits to 1M chips"
date: 2026-04-22
severity: major
summary: "Google's Cloud Next 2026 keynote announced Ironwood, the seventh-generation Tensor Processing Unit and the first TPU designed specifically for inference. Ironwood delivers 10x the peak performance of TPU v5p, ships 192 GB HBM3E per chip at 7.2 TB/s, and scales to 9,216 liquid-cooled chips per superpod producing 42.5 FP8 exaflops. Now generally available on Google Cloud. Anthropic committed to up to 1 million Ironwood TPUs for Claude serving."
affects: [gemini, claude]
categories: [ai-infrastructure, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-23
last_verified: 2026-04-23
sources:
  - url: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/ironwood-tpu-age-of-inference/"
    title: "Ironwood: The first Google TPU for the age of inference - Google Blog"
  - url: "https://siliconangle.com/2026/04/20/google-cloud-next-2026-preview-real-story-isnt-ai-control-plane/"
    title: "Google Cloud Next 2026 preview - SiliconANGLE"
  - url: "https://newsletter.semianalysis.com/p/tpuv7-google-takes-a-swing-at-the"
    title: "Google TPUv7: The 900lb Gorilla In the Room - SemiAnalysis"
---

**Google** unveiled **Ironwood**, its seventh-generation TPU, at **Cloud Next 2026** on April 22, 2026. It is the first Google TPU architected specifically for inference rather than training.

> **Generational context:** Ironwood (TPU v7) is GA today. One day later on Cloud Next Day 2, Google revealed the **8th-gen TPU 8t (training) and TPU 8i (inference)** as the follow-on. See [TPU 8t/8i coverage](/news/2026-04-23-google-tpu-8t-8i-cloud-next-day2/). Ironwood remains the production inference chip; the 8th-gen ships progressively through 2026-2027.

## The chip

- **10x peak performance** of TPU v5p.
- **192 GB HBM3E** per chip.
- **7.2 TB/s** memory bandwidth per chip.
- **9,216 liquid-cooled chips per superpod**.
- **42.5 FP8 exaflops** per superpod.
- Generally available to Google Cloud customers today.

Google says it plans to produce **millions of Ironwood units** in 2026. The chip is aimed at the "serving economy" that now dominates AI spend: frontier models are trained once but served billions of times.

## Anthropic as anchor customer

**Anthropic committed to up to 1 million Ironwood TPUs** for Claude serving. That sits alongside the separate [5 GW AWS Trainium commitment announced two days earlier](/news/2026-04-20-amazon-anthropic-25b-infrastructure-pact/), giving Anthropic a genuinely multi-cloud serving footprint.

For Claude users this is straight capacity insurance. Rate limits and queue times on Opus 4.7, Sonnet 4.6, and the freshly-launched Claude Design product should ease as Ironwood capacity comes online.

## Why an inference-first TPU

Training-optimized silicon maximizes raw FLOPs. Inference silicon maximizes **tokens per dollar** and **latency per query**. Different design trade-offs:

- **Memory bandwidth** matters more than peak compute (attention layers are bandwidth-bound).
- **Batch-1 latency** matters more than peak batch throughput.
- **Power efficiency** under sustained inference matters more than peak draw under training bursts.

Ironwood's 192 GB of HBM3E per chip and 7.2 TB/s bandwidth directly target the bandwidth bottleneck. The design is a structural response to where 2026 AI compute spend actually sits: inference, not training.

## Gemini impact

Gemini 3.1 Pro and downstream Gemini-powered products (Gemini app, AI Overviews in Search, Gemini in Workspace) are expected to migrate serving onto Ironwood progressively through 2026. Google did not disclose migration timelines at keynote.

The price-performance implication: Google can push Gemini API pricing lower (especially on long-context workloads) without margin damage. Expect downward pricing pressure on Gemini Flash and Pro tiers once Ironwood saturates.

## Ecosystem context

Ironwood ships as the centerpiece of Google's broader [four-partner custom-silicon strategy](/news/2026-04-22-google-four-partner-inference-chip-coalition/) involving Broadcom, MediaTek, Marvell, and TSMC. That coalition extends Google's silicon roadmap to TPU v8 on TSMC 2nm in late 2027, with MediaTek's "Zebrafish" targeting 20-30% lower inference cost than Ironwood.

## Day 2 sidebar: 8th-gen already on the board

One day after the Ironwood GA announcement, Google's Cloud Next 2026 Day 2 keynote unveiled the **8th-generation TPU family**: [TPU 8t for training and TPU 8i for inference](/news/2026-04-23-google-tpu-8t-8i-cloud-next-day2/). TPU 8t delivers 3x Ironwood's processing power per superpod; TPU 8i triples on-chip SRAM for agent-serving workloads. Ironwood stays GA today and remains the production inference TPU. The 8th-gen is a roadmap reveal with staged availability through 2026-2027.

## Related

- [TPU 8t/8i unveiled on Cloud Next Day 2](/news/2026-04-23-google-tpu-8t-8i-cloud-next-day2/)
- [Anthropic commits multi-GW capacity on Alphabet-Broadcom TPUs starting 2027](/news/2026-04-22-anthropic-alphabet-broadcom-tpu-commitment-2027/)
- [Amazon commits up to $25B more to Anthropic](/news/2026-04-20-amazon-anthropic-25b-infrastructure-pact/)
- [Google in talks with Marvell on custom AI chips](/news/2026-04-20-google-marvell-custom-ai-chips-talks/)
- [Anthropic locks in 3.5GW Google TPU capacity](/news/2026-04-07-anthropic-google-broadcom-tpu-deal/)
