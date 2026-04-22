---
type: news
slug: 2026-04-22-google-four-partner-inference-chip-coalition
title: "Google assembles four-partner silicon coalition (Broadcom, MediaTek, Marvell, TSMC) to challenge Nvidia on inference"
date: 2026-04-22
severity: major
summary: "Alongside the Ironwood TPU launch at Cloud Next 2026, Google disclosed a four-partner custom-silicon coalition covering Broadcom (TPU co-design), MediaTek (inference-optimized Zebrafish at 20-30% lower cost), Marvell (memory processing units and dedicated inference TPU), and TSMC (2nm fabrication for TPU v8 in late 2027). Ends the single-vendor TPU co-design era. Structurally re-rates Google's inference cost curve through 2028 and puts sustained pricing pressure on Nvidia's data-center revenue."
affects: [gemini]
categories: [ai-infrastructure, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-22
last_verified: 2026-04-22
sources:
  - url: "https://thenextweb.com/news/google-inference-chips-nvidia-challenge-supply-chain"
    title: "Google assembles four-partner chip supply chain with Broadcom, MediaTek, Marvell - The Next Web"
  - url: "https://newsletter.semianalysis.com/p/tpuv7-google-takes-a-swing-at-the"
    title: "Google TPUv7: The 900lb Gorilla In the Room - SemiAnalysis"
  - url: "https://www.siliconsnark.com/google-is-ready-to-challenge-nvidia-the-chips-are-ready-to-be-designed/"
    title: "Google Is Ready to Challenge Nvidia - SiliconSnark"
---

**Google** formalized a **four-partner custom-silicon coalition** at **Cloud Next 2026** alongside the [Ironwood TPU launch](/news/2026-04-22-google-ironwood-tpu-cloud-next-2026/). The coalition ends Google's historical single-vendor TPU co-design model and extends Google's silicon roadmap to TPU v8 on TSMC 2nm by late 2027.

## The four partners

| Partner | Role |
|---|---|
| **Broadcom** | Continuing TPU co-design partner. Produced TPU v3 through v7 (Ironwood). |
| **MediaTek** | New. "Zebrafish" inference-optimized chip targeting 20-30% lower per-token inference cost than Ironwood. |
| **Marvell** | New. Memory processing unit pairing with TPU, plus dedicated inference-TPU track. Reported April 19, [formalized at Cloud Next](/news/2026-04-20-google-marvell-custom-ai-chips-talks/). |
| **TSMC** | Fabrication partner. 2nm node reserved for TPU v8 late 2027. |

This is the first time a hyperscaler has publicly disclosed a four-partner custom-silicon stack with distinct role allocation across design and manufacturing.

## Why it matters

Training silicon is a winner-take-a-lot market because model-training runs have long tails and limited parallelism. Inference silicon is a volume market where small per-unit cost advantages compound across billions of daily queries.

Google's play: keep Broadcom on the premium-tier inference-plus-training TPU line, add MediaTek for commodity-tier inference at a lower cost point, add Marvell for memory-side acceleration, and commit TSMC 2nm capacity for the 2027 next-gen. That gives Google three distinct cost points on the TPU menu and a clear forward node roadmap.

Result for Gemini customers: **lower Gemini API pricing** becomes sustainable rather than promotional. Flash tier already sits near commodity pricing; Pro and Advanced tiers get room to fall as MediaTek capacity comes online.

## Nvidia exposure

Nvidia's data-center revenue in 2025 was roughly evenly split between hyperscaler training (HGX and NVL72 systems) and enterprise inference (H100/H200/GB200 into specialized AI-serving providers).

Google's four-partner coalition does two things against Nvidia:

1. **Hyperscaler training volume:** Google moves more of its internal training onto Ironwood and TPU v8, shrinking Nvidia's internal-Google share. The 2025 baseline of Nvidia revenue from Google was already small; 2026 onward trends toward zero for Gemini-training use cases.
2. **External-customer inference share:** Anthropic's 1M-Ironwood commitment signals that even frontier labs with Nvidia legacy stacks will split inference off onto TPU-class silicon where it's cheaper. That's a direct substitution.

Nvidia's counter is speed. NVL72, Blackwell Ultra, and the Vera Rubin roadmap still lead raw peak performance and shipping volume. The question is whether peak-perf leadership offsets per-token cost disadvantage on sustained inference serving.

## Timing

- **Ironwood (TPU v7):** GA today, April 22, 2026.
- **MediaTek Zebrafish:** 2026 production ramp, undisclosed customer GA.
- **Marvell memory processing unit + inference TPU:** design phase, 2027 likely silicon.
- **TSMC 2nm TPU v8:** late 2027 tape-out.

## Open questions

- **Does AWS respond** by accelerating Trainium3 or publicly formalizing its own multi-partner coalition? AWS already has Marvell and Annapurna internal; a public-coalition framing would be the counter.
- **Does OpenAI's rumored custom-silicon program** with Broadcom and TSMC become real? If so, Broadcom is balancing two frontier-lab co-design programs, which re-rates Broadcom's AI revenue line significantly.
- **Does the cost curve actually materialize?** Zebrafish 20-30% cost reduction is MediaTek's claim, not independent analyst confirmation.

## Related

- [Google unveils Ironwood TPU at Cloud Next 2026](/news/2026-04-22-google-ironwood-tpu-cloud-next-2026/)
- [Google in talks with Marvell on custom AI chips](/news/2026-04-20-google-marvell-custom-ai-chips-talks/)
- [Morgan Stanley agentic-AI CPU and memory forecast](/news/2026-04-21-morgan-stanley-agentic-ai-cpu-memory-forecast/)
