---
type: news
slug: 2026-04-21-morgan-stanley-agentic-ai-cpu-memory-forecast
title: "Morgan Stanley: agentic AI to add $32.5-60B to data-center CPU and memory TAM by 2030"
date: 2026-04-21
severity: minor
summary: "Morgan Stanley research published April 21, 2026 forecasts agentic AI workloads will add $32.5-60B to data-center CPU and memory total addressable market by 2030. Signals a structural shift of hyperscaler spend from GPU-heavy training to CPU-and-memory-heavy inference and agent orchestration. Named beneficiaries: AMD, Intel, Arm, Micron, TSMC. Reinforces the inference-first hardware story also driving Google's Ironwood TPU launch."
affects: []
categories: [ai-infrastructure, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-22
last_verified: 2026-04-22
sources:
  - url: "https://techstartups.com/2026/04/21/top-tech-news-today-april-21-2026/"
    title: "Top Tech News Today, April 21, 2026 - Tech Startups"
---

**Morgan Stanley** research published April 21, 2026 projects that **agentic AI workloads** will add **$32.5 to $60 billion** to the **data-center CPU and memory TAM** by 2030. The report reframes the AI infrastructure spend story from "GPU supercycle" to "balanced silicon stack."

## The thesis

Three workload categories the report argues will drive CPU and memory demand:

1. **Agent orchestration.** Tool-calling agents run CPU-heavy control flow between LLM calls. Each LLM call takes milliseconds; the plan-and-dispatch loop takes seconds of CPU work.
2. **Inference serving at scale.** Memory bandwidth bottlenecks attention layers more than compute does. Memory capacity and HBM pricing become the gating factor, not raw TFLOPs.
3. **Long-context inference.** 1M-token context windows shift the KV-cache problem into a memory-capacity problem. More memory per serving node directly translates into tokens-per-second.

## Named beneficiaries

- **AMD:** EPYC CPUs in AI-serving racks. EPYC Turin and next-gen Genoa-X positioned for orchestration workloads.
- **Intel:** Xeon recovery narrative contingent on capturing inference-adjacent CPU share.
- **Arm:** data-center CPU design wins (NVIDIA Grace, AWS Graviton, Ampere) keep expanding.
- **Micron and SK hynix:** HBM3E and HBM4 volume. See [SK hynix SOCAMM2 192GB mass production](/news/2026-04-20-skhynix-socamm2-192gb-mass-production/).
- **TSMC:** 2nm and below for both the CPU and memory-controller sides.

## Why now

The report crystallizes a shift that's been building since Q4 2025. Hyperscaler capex has stayed flat or grown, but the **composition** inside the capex envelope has shifted:

- **2023-2024:** GPU-heavy (training runs dominate).
- **2025:** GPU-plus-inference-silicon mix (Ironwood-class chips, Trainium, MTIA).
- **2026 onward:** inference silicon plus CPU plus HBM-heavy memory for agent serving.

Google's [Ironwood TPU announcement](/news/2026-04-22-google-ironwood-tpu-cloud-next-2026/) two days later is the same structural story on the accelerator side.

## Caveats

- Morgan Stanley's **$32.5-60B spread** is wide. The low end reflects modest agent-adoption curves; the high end assumes enterprise agent roll-outs compound through 2028.
- The forecast is TAM expansion, not total data-center spend; CPU share of a growing pie rises only if GPU share plateaus.
- Published equity-research call is not an Apollo-style systematic prediction; treat the figures as a framing, not a ground truth.

## Editorial read

The infrastructure story for AI tool pricing through 2027 is that inference-serving unit economics get cheaper, which lets frontier-model API pricing fall further (per-MTok prices for Gemini Flash and Haiku 4.5 already reflect some of this). Tool buyers benefit in two ways: cheaper base pricing and more generous free tiers funded by lower serving cost.

## Related

- [Google unveils Ironwood TPU at Cloud Next 2026](/news/2026-04-22-google-ironwood-tpu-cloud-next-2026/)
- [SK hynix SOCAMM2 192GB mass production](/news/2026-04-20-skhynix-socamm2-192gb-mass-production/)
- [Anthropic locks in 3.5GW Google TPU capacity](/news/2026-04-07-anthropic-google-broadcom-tpu-deal/)
