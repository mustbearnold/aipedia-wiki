---
type: news
slug: 2026-04-19-grok-4-3-beta-premium-plus-supergrok
title: "Grok 4.3 Beta: Access, Pricing, Rate Limits and SuperGrok Rollout"
date: 2026-04-19
severity: major
summary: "Current Grok 4.3 beta access guide: xAI expanded access on April 19, 2026 from SuperGrok Heavy ($300/mo) to X Premium+ ($40/mo) and SuperGrok ($30/mo). This page tracks who gets access, how Premium+, SuperGrok, and Heavy differ, what is known about rate limits, and why free users still do not have access."
affects: [grok]
categories: [ai-chatbots, ai-search]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-02
last_verified: 2026-05-02
sources:
  - url: "https://x.ai/news"
    title: "xAI News - Official announcements"
  - url: "https://piunikaweb.com/2026/04/17/xai-grok-4-3-beta-supergrok-heavy/"
    title: "xAI rolls out Grok 4.3 beta for SuperGrok Heavy subscribers - PiunikaWeb"
  - url: "https://www.buildfastwithai.com/blogs/grok-4-3-beta-features-review"
    title: "Grok 4.3 Beta Is Live: Features, Review & Is $300 Worth It? - Build Fast With AI"
  - url: "https://phemex.com/news/article/xai-launches-grok-43-beta-with-enhanced-features-73950"
    title: "xAI Launches Grok 4.3 Beta with Enhanced Features - Phemex"
  - url: "https://shareallai.github.io/familypro/en/blog/grok-plan-guide/"
    title: "Grok Plan Guide 2026: X Premium+, SuperGrok, and Heavy - ShareAllAI"
---

xAI expanded Grok 4.3 beta access on **April 19, 2026** from SuperGrok Heavy ($300/mo) only to include **X Premium+ ($40/mo)** and **SuperGrok ($30/mo)** subscribers. The broader rollout lands **48 hours after** the initial April 17 Heavy-gated launch.

## Fast answer

Grok 4.3 beta is no longer limited to SuperGrok Heavy. As of the April 19 rollout, **X Premium+**, **SuperGrok**, and **SuperGrok Heavy** users can access the beta. Heavy remains the high-limit, priority tier; Premium+ and SuperGrok are the cheaper entry points for trying the 4.3 model.

## Who gets it now

| Tier | Monthly | Grok 4.3 beta access |
|---|---|---|
| Free | $0 | No |
| X Premium | ~$16/mo | No |
| **X Premium+** | **~$40/mo** | **Yes (new April 19)** |
| **SuperGrok** | **$30/mo** | **Yes (new April 19)** |
| **SuperGrok Heavy** | **$300/mo** | **Yes (since April 17)** |

## Rate limits: what is known

Heavy still gets priority access, higher rate limits, and 16-agent architecture. Premium+ and SuperGrok get access to the 1T-parameter model but with standard beta limits.

xAI has not published exact per-tier Grok 4.3 beta message caps in the sources reviewed for this article. Treat any specific cap screenshots as volatile until xAI publishes a stable tier table.

## Rollout pattern matches Grok 4.20 exactly

**xAI's beta playbook:**

1. **Day 0:** launch to the highest-tier Heavy audience. Signals exclusivity. Drives some users to upgrade.
2. **Day 2-3:** expand to mid-tier SuperGrok + X Premium+. Broader feedback loop.
3. **Day 7-14:** typically removes the beta tag once stability holds, model ships to all paid tiers.
4. **Day 30+:** free tier access (possibly rate-limited) if the broader rollout is clean.

This is the exact pattern [Grok 4.20 followed](https://www.basenor.com/blogs/news/grok-4-20-is-live-whats-new-and-why-its-getting-faster) in Q1 2026. Today's expansion is Day 2 of that cycle.

## What Grok 4.3 brings

**Six capabilities beyond Grok 4.20:**

1. **Native PDF generation** - document creation directly in chat
2. **PowerPoint slide output** - deck generation from prompts
3. **Spreadsheet output** - CSV and XLSX structured data
4. **Video input** - multimodal vision with moving images
5. **Sharper reasoning** - benchmark improvements from extended training
6. **Grok Computer integration** - alongside the ongoing Computer Use rollout

Model scale: **1 trillion parameters**, double Grok 4.20's ~500B. On SuperGrok Heavy, a **16-agent Heavy architecture** orchestrates multiple Grok 4.3 instances in parallel for complex tasks.

## What Premium+ / SuperGrok users get vs Heavy

**Premium+ ($40/mo) and SuperGrok ($30/mo) access includes:**

- Grok 4.3 beta model access
- All six new output capabilities (PDF, PPT, XLSX, video input, sharper reasoning, Grok Computer)
- 2M token context window

**SuperGrok Heavy ($300/mo) adds on top:**

- **16-agent Heavy architecture** (parallel multi-agent orchestration)
- Higher rate limits
- Priority queue access during load spikes
- Early access to any post-4.3 previews

If you're evaluating Grok 4.3 specifically for output capabilities (decks, docs, video), Premium+ or SuperGrok is now the right starting point. Heavy only makes sense if you need the multi-agent workload or predictable rate limits at volume.

## Where this sits in the frontier model landscape

**April 2026 frontier comparison:**

| Model | Params (approx) | Context | Entry price |
|---|---|---|---|
| GPT-5.4 | undisclosed | undisclosed | Bundled with ChatGPT Plus $20/mo |
| Claude Opus 4.7 | undisclosed | 1M | Bundled with Claude Pro $20/mo |
| Gemini 3.1 Pro | undisclosed | 1M | Bundled with Google AI Pro $20/mo |
| **Grok 4.3 beta** | **~1T** | **2M** | **SuperGrok $30/mo or Premium+ $40/mo** |
| DeepSeek V4 (pending) | ~1T (37B active) | 1M | Hosted API pay-per-token |

Grok 4.3 is the only frontier model with a disclosed **1T-parameter headline figure**, though comparable effective compute to GPT-5.4 and Opus 4.7 is unverified. The **2M context window** is currently the largest on a major commercial chatbot.

## What to watch

- **Beta tag removal date.** If the pattern holds, Grok 4.3 drops beta and ships to all paid tiers within 7-14 days (late April to early May).
- **Free tier rollout.** Historical pattern: rate-limited free access 4-8 weeks after GA.
- **Grok Imagine + Computer integration.** Grok 4.3 lands with both parallel tracks. Expect tighter integration as the beta matures.
- **Benchmark publications.** xAI has been slower than Anthropic / OpenAI to publish independent benchmarks for Grok 4.3. Independent evals (ARC-AGI, SWE-bench, Artificial Analysis) expected within 2-3 weeks.

## What this means

**For Grok users:** If you were considering upgrading to SuperGrok Heavy just to get 4.3 access, you can now get it on SuperGrok ($30/mo) or Premium+ ($40/mo) at 10% the cost. Heavy is now justified only by multi-agent architecture + priority rate limits.

**For the frontier race:** Grok 4.3 at $30/mo puts pressure on ChatGPT Plus and Claude Pro at the same price point. The 2M context and 1T-param positioning is a commercial differentiator regardless of raw benchmark gap.

**For xAI:** The 2-day rollout cycle (Heavy → Premium+ / SuperGrok) shows confidence in the model. Slower rollouts typically signal stability concerns; xAI is running the opposite playbook.

See the full [Grok tool page](/tools/grok/) for the current tier matrix and feature breakdown.

## Sources

- [xAI Official News](https://x.ai/news)
- [PiunikaWeb: xAI rolls out Grok 4.3 beta for SuperGrok Heavy subscribers](https://piunikaweb.com/2026/04/17/xai-grok-4-3-beta-supergrok-heavy/)
- [Build Fast With AI: Grok 4.3 Beta Features, Review & Is $300 Worth It?](https://www.buildfastwithai.com/blogs/grok-4-3-beta-features-review)
- [Phemex: xAI Launches Grok 4.3 Beta with Enhanced Features](https://phemex.com/news/article/xai-launches-grok-43-beta-with-enhanced-features-73950)
- [ShareAllAI: Grok Plan Guide 2026: X Premium+, SuperGrok, and Heavy](https://shareallai.github.io/familypro/en/blog/grok-plan-guide/)
