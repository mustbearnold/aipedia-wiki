---
type: news
slug: 2026-04-20-google-marvell-custom-ai-chips-talks
title: "Google in Talks with Marvell to Build Two Custom AI Chips for Inference, per The Information"
date: 2026-04-20
severity: notable
summary: "Google is in talks with Marvell Technology to co-develop two custom AI chips, per The Information's April 19 report picked up by Reuters and broader industry trackers. One is a memory processing unit designed to pair with Google's TPU; the second is a new dedicated TPU optimized for inference efficiency. The talks signal Google's continued diversification away from sole reliance on Broadcom for TPU co-design and extend Google's in-house silicon strategy deeper into the inference layer where AI economics are shifting."
affects: []
categories: [ai-infrastructure, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-20
last_verified: 2026-04-20
sources:
  - url: "https://www.theinformation.com/articles/google-in-talks-with-marvell-to-build-new-ai-chips"
    title: "Google in Talks with Marvell to Build New AI Chips - The Information (original reporting April 19, 2026)"
  - url: "https://www.reuters.com/technology/artificial-intelligence/"
    title: "Reuters Technology / AI coverage (republication of The Information's reporting)"
---

**Google** is in talks with **Marvell Technology** to co-develop two custom AI chips, according to reporting by **The Information** on April 19, 2026 and subsequently picked up by Reuters and broader industry trackers.

## The two chips

According to the reporting, Google is exploring two distinct custom silicon projects with Marvell:

1. **Memory processing unit** designed to pair with Google's TPU. Purpose: offload memory-heavy compute (attention-layer KV cache, long-context management, model-weight staging) from the TPU core to a dedicated memory-near processor. This is a bandwidth-and-capacity play.

2. **New dedicated TPU optimized for inference.** Separate from Google's training-oriented TPU generations. Inference is where AI serving economics compound or collapse, and a dedicated silicon design for inference workloads can materially lower per-token serving cost.

The combination: a memory co-processor plus a dedicated inference TPU would extend Google's in-house silicon strategy into the parts of the AI stack where workload characteristics diverge most sharply from training.

## Why Marvell, not just Broadcom

Google's historical TPU co-development partner has been **Broadcom**. The Broadcom relationship has produced TPU v3, v4, v5, v6, and v7 generations. Adding **Marvell** as a second silicon partner does three things:

1. **Diversifies supplier risk** in a tight AI-silicon supply environment
2. **Brings Marvell's strength in memory-interface and networking silicon** directly into Google's TPU roadmap
3. **Pressures Broadcom** on pricing and design responsiveness for future TPU generations

The Information's reporting does not indicate Google is replacing Broadcom. The framing is dual-sourcing and workload-specialization, not supplier swap.

## Why this matters

The AI infrastructure story in 2026 is shifting from "who trains the biggest model" to "who serves the biggest model at the lowest per-token cost". Inference-optimized silicon is central to that shift.

For aipedia.wiki readers picking AI tools, the relevance is economic: Google's consumer AI products (Gemini app, AI Overviews, Workspace AI) and enterprise API offerings (Vertex AI, Gemini API) ship faster feature parity and lower per-token pricing when Google's underlying silicon is cheaper to serve on. A successful Google-Marvell inference-chip program could materially widen the price gap between Gemini-family pricing and competing API offerings over the next 18-24 months.

## Context: Marvell's AI trajectory

Marvell has been building custom-silicon revenue aggressively:

- **AWS custom chips** (Trainium, Inferentia co-development)
- **Microsoft custom silicon** (reported partnership, undisclosed volumes)
- **Meta custom silicon** (MTIA series co-development)

Adding Google would make Marvell a silicon partner to all four major hyperscalers (AWS, Microsoft, Meta, Google). That's a meaningfully different competitive position than Marvell had three years ago as primarily a networking-silicon vendor.

## Open questions (unconfirmed by Google or Marvell)

- What's the timeline? Early concept talks vs signed program?
- Which Google workloads are targeted first (Gemini inference? YouTube recommendations? Google Search AI Overviews?)
- How does this affect Broadcom's TPU co-development relationship?
- Is there a memory vendor partner already selected (SK hynix given the [SOCAMM2 mass production](/news/2026-04-20-skhynix-socamm2-192gb-mass-production/)? Micron? Samsung?)

Neither Google nor Marvell has officially confirmed the talks. The Information's reporting cites unnamed sources familiar with the discussions.

## Editorial read

The underlying pattern is clear: the era of hyperscalers relying on one silicon partner for AI compute is ending. Google, Meta, Microsoft, AWS all now run multi-vendor silicon strategies with different workload specializations. That's good for silicon vendors (Marvell wins incremental share), mixed for Nvidia (loses some hyperscaler volume but gains ISV revenue), and good for AI tool buyers (more efficient cloud economics mean more features per dollar).

## Sources

- **Primary:** The Information, April 19, 2026 (paywalled; summary available via Reuters and multiple industry-tracker republications)
- Secondary: Reuters Technology / AI section, coverage same day
- Market-tracker sources referenced: Techmeme aggregation of Information report
