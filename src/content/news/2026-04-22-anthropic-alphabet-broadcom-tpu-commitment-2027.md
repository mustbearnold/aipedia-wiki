---
type: news
slug: 2026-04-22-anthropic-alphabet-broadcom-tpu-commitment-2027
title: "Anthropic commits multi-gigawatt capacity on next-gen Alphabet-Broadcom TPUs starting 2027"
date: 2026-04-22
severity: major
summary: "Anthropic confirmed it will deploy multiple gigawatts of next-generation TPU capacity from 2027 onward, built through the Alphabet-Broadcom TPU joint venture. Extends the April 22 Ironwood 1M-TPU commitment into the 8th-generation silicon roadmap. Broadcom guides to $100B+ annual custom-AI-silicon revenue by 2027; Alphabet's Google Cloud +48% YoY. Cements Anthropic as the anchor external customer for Google's TPU program and the principal non-AWS destination for Claude training and serving."
affects: [claude]
categories: [ai-infrastructure, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-22
last_verified: 2026-04-22
sources:
  - url: "https://www.fool.com/investing/2026/04/22/anthropic-just-announced-huge-news-for-alphabet-an/"
    title: "Anthropic Just Announced Huge News for Alphabet and Broadcom - Motley Fool (April 22, 2026)"
  - url: "https://cloud.google.com/blog/topics/google-cloud-next/welcome-to-google-cloud-next26"
    title: "Google Cloud Next '26 announcements"
---

**Anthropic** confirmed at Google Cloud Next 2026 that it will deploy **multiple gigawatts of next-generation TPU capacity** starting in **2027**, built through the **Alphabet-Broadcom TPU joint venture**. The commitment extends the April 22 Ironwood 1M-TPU deal into the 8th-generation silicon roadmap.

## What was committed

- **Scale:** multiple gigawatts (exact capacity undisclosed).
- **Timeline:** deployment begins 2027, ramping through 2028-2029.
- **Silicon substrate:** Alphabet-Broadcom co-designed next-gen TPUs, including [TPU 8t/8i unveiled Day 2](/news/2026-04-23-google-tpu-8t-8i-cloud-next-day2/).
- **Carryover:** stacks on top of the earlier 1M Ironwood (TPU v7) commitment.

Combined with the [$25B Amazon-Anthropic pact](/news/2026-04-20-amazon-anthropic-25b-infrastructure-pact/) (up to 5 GW on Trainium2/3) and the April 7 [3.5 GW Google TPU capacity deal](/news/2026-04-07-anthropic-google-broadcom-tpu-deal/), Anthropic now has **well over 10 GW** of multi-cloud AI compute committed for Claude through 2030.

## Who benefits financially

| Party | Upside |
|---|---|
| **Alphabet (Google Cloud)** | Multi-gigawatt external TPU demand, Q4 2025 Cloud revenue +48% YoY before this deal |
| **Broadcom** | Custom-AI-silicon division at $8.4B quarterly revenue (+106% YoY); company guides to $100B+ annual AI-silicon revenue by 2027 |
| **Anthropic** | Long-cycle compute floor priced competitively vs cash purchases of Nvidia Blackwell |

## Strategic read

Anthropic has publicly anchored itself on **three compute substrates**:

1. **AWS Trainium2/3** (via the Amazon pact): up to 5 GW.
2. **Google Ironwood + 8th-gen TPUs** (via this commitment): multi-GW from 2027.
3. **Nvidia GPUs** (legacy and hybrid workloads): undisclosed, declining share.

The multi-cloud hedging is structural. If any one silicon program slips, the others pick up the load. The downside for Anthropic is complexity: three distinct inference stacks, three sets of tooling, three partner relationships to manage.

For **Claude users**, the near-term impact is capacity. Rate limits and queue times on Opus 4.7 and Sonnet 4.6 should continue to ease as 2027-2028 capacity lands.

For **Nvidia**, the competitive impact is incremental. Anthropic never was a majority-Nvidia customer at the scale of OpenAI's Azure deployment. The message here is more about **what happens if OpenAI ever diversifies** similarly.

## Open questions

- **Exact gigawatt figure** was not disclosed.
- **Pricing terms** vs the 2023-2026 Anthropic-Google TPU deal remain confidential.
- **Which 8th-gen generation** (TPU 8i, TPU 8t, or both) anchors the commitment.
- **Interaction with the Anthropic IPO narrative** (recent reports of $800B valuation offers) if and when Anthropic goes public.

## Related

- [Google unveils Ironwood TPU at Cloud Next 2026](/news/2026-04-22-google-ironwood-tpu-cloud-next-2026/)
- [TPU 8t/8i unveiled on Cloud Next Day 2](/news/2026-04-23-google-tpu-8t-8i-cloud-next-day2/)
- [Amazon commits up to $25B more to Anthropic](/news/2026-04-20-amazon-anthropic-25b-infrastructure-pact/)
- [Anthropic locks in 3.5GW Google TPU capacity](/news/2026-04-07-anthropic-google-broadcom-tpu-deal/)
