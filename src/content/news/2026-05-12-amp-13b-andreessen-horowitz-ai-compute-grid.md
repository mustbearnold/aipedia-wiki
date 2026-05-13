---
type: news
slug: 2026-05-12-amp-13b-andreessen-horowitz-ai-compute-grid
title: "Amp raises $1.3B from Andreessen Horowitz and Y Combinator to build a shared AI compute 'grid' targeting 1.9 GW over five years"
date: 2026-05-12
severity: major
summary: "Anjney Midha's new startup Amp closed a $1.3 billion round led by Andreessen Horowitz with Y Combinator and other backers, aiming to aggregate spare data-center capacity into a shared compute pool. Amp is targeting 200 megawatts online by end of 2026 and a 1.9 gigawatt pool over five years."
categories: [ai-infrastructure, ai-business, ai-models]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-13
last_verified: 2026-05-13
sources:
  - url: https://dnyuz.com/2026/05/12/start-up-raises-1-3-billion-for-an-a-i-grid/
    title: "Start-Up Raises $1.3 Billion for an A.I. 'Grid'"
  - url: https://aibusiness.com/data-centers/startup-that-aims-widen-access-compute-draws-1-3b
    title: "Startup That Aims to Widen Access to Compute Draws $1.3B"
  - url: https://startupfortune.com/amp-is-turning-ai-compute-into-a-new-venture-capital-battleground/
    title: "AMP is turning AI compute into a new venture capital battleground"
  - url: https://www.theinformation.com/briefings/vc-partner-midha-talks-establish-1-gigawatt-data-center-venture
    title: "VC Partner Midha in Talks to Establish 1 Gigawatt Data Center Venture"
---

# Amp raises $1.3B from Andreessen Horowitz and Y Combinator to build a shared AI compute 'grid' targeting 1.9 GW over five years

**Amp**, a new compute-infrastructure startup founded by ex-Andreessen Horowitz partner **Anjney Midha**, announced on May 12, 2026 that it has raised more than **$1.3 billion** to build what the company calls an AI compute "grid", a pool of GPU capacity acquired from data-center operators and resold to startups, universities, and research labs that cannot otherwise compete with the hyperscalers for chip access.

Lead investor **Andreessen Horowitz** is joined by **Y Combinator** and a syndicate of other backers. Amp's stated targets:

- **200 megawatts online by end of 2026**.
- **1.9 gigawatts pooled over the next five years**.

The pitch is that demand for AI training capacity is no longer constrained only by chip supply; it is constrained by the small number of buyers that can negotiate multi-gigawatt offtake commitments directly with operators. Amp's model is to be that buyer at scale, then break the capacity down into smaller increments that long-tail users can actually consume.

## Why this matters

The structural problem Amp is targeting is real. As of mid-2026 the AI compute market is bifurcated:

- **Hyperscalers and frontier labs** (Microsoft + OpenAI, Google + Anthropic, AWS, Meta, xAI) have multi-year, multi-gigawatt offtake commitments that lock up the vast majority of new builds.
- **Everyone else**, including most academic researchers, mid-tier startups, and non-frontier labs, competes for the residual capacity at meaningfully worse prices and longer queue times.

A $1.3B aggregator like Amp can theoretically smooth that out by acting as the matchmaker between operators with spare nights/weekends/regions and buyers who need bursty access. The model is closer to a power-grid balancing authority than to a traditional cloud reseller.

The $1.3B raise also re-prices the "compute middleman" category. CoreWeave, Lambda, Crusoe, and others have been building variants of the same idea, aggregate GPU capacity, resell to startups, but Amp's structural pitch (spare capacity, not greenfield data centers) and the Andreessen Horowitz lead position with Midha at the helm sets it up as a serious challenger.

The political subtext matters too. Sovereign and academic AI policy in the US, UK, and EU has spent the past 18 months trying to figure out how to give domestic researchers access to compute that the hyperscalers have already absorbed. An Amp-shaped layer is a market answer to a policy problem, if it works, governments will subsidize buyer access; if it doesn't, the case for sovereign-cloud build-outs will get louder.

## Buyer take

If you are a startup or research lab buying GPU time, three things to evaluate when Amp opens its doors:

- **Reliability vs. price.** Spare capacity tends to be cheaper but also more interruptible. For training runs that can checkpoint cleanly, that is fine; for inference workloads with latency SLAs, it is not. Match the workload to the tier before committing.
- **Region and chip mix.** "1.9 GW pooled" hides huge variance in what hardware is actually available. Ask Amp for chip-level capacity disclosures (H100, H200, B100, B200, MI300X, TPU v5e) before procurement, not after.
- **Lock-in posture.** Aggregators only deliver value if customers can move freely. Watch the contract terms around minimum commitments, data egress, and orchestration tooling. If Amp tries to recreate hyperscaler-style lock-in inside a "grid" wrapper, the proposition is meaningfully weaker.

For data-center operators, this is mostly a positive. A buyer that aggregates demand reduces the operator's marketing and credit-risk surface for the long-tail. Expect Amp to negotiate hardest on multi-year capacity commitments where the operator otherwise faces idle headroom.

## What is still unclear

Amp has not disclosed its target pricing relative to hyperscalers, the first set of partner operators, the geographic split of the 1.9 GW target, or whether the company will run its own scheduler and orchestration stack or rely on operator-native tooling. The relationship between Amp and Andreessen Horowitz's existing AI portfolio, many of which are themselves compute buyers, is not described publicly. Customer disclosures beyond the "startups, universities, research labs" descriptor are also still ahead.
