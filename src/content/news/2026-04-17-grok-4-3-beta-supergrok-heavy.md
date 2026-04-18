---
type: news
slug: 2026-04-17-grok-4-3-beta-supergrok-heavy
title: "Grok 4.3 Beta Drops for SuperGrok Heavy ($300/mo): Full Rundown"
date: 2026-04-17
severity: major
summary: "xAI shipped Grok 4.3 beta on April 17, 2026 exclusively to SuperGrok Heavy subscribers ($300/month). Adds native PDF, PowerPoint, spreadsheet output, video input, and Grok Computer desktop-agent integration on top of the existing 2M context window and 16-agent Heavy architecture. Community reaction is split: shipping pace praised, $300 paywall for beta + still-missing persistent memory criticised. Broader rollout to $30 SuperGrok estimated mid-to-late May 2026."
affects: [grok]
categories: [ai-chatbots]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-18
last_verified: 2026-04-18
sources:
  - url: "https://piunikaweb.com/2026/04/17/xai-grok-4-3-beta-supergrok-heavy/"
    title: "xAI rolls out Grok 4.3 beta for SuperGrok Heavy - PiunikaWeb"
  - url: "https://www.buildfastwithai.com/blogs/grok-4-3-beta-features-review"
    title: "Grok 4.3 Beta Is Live: Features, Review & Is $300 Worth It?"
  - url: "https://phemex.com/news/article/xai-launches-grok-43-beta-with-enhanced-features-73950"
    title: "xAI Launches Grok 4.3 Beta with Enhanced Features - Phemex"
  - url: "https://news.ycombinator.com/item?id=47808588"
    title: "xAI has Released Grok 4.3 (beta) - Hacker News"
---

xAI shipped **Grok 4.3 beta** on April 17, 2026. Access is gated to the **SuperGrok Heavy** tier at **$300/month**. The model appears in the Grok web client and mobile apps with an "Early Access" label. Regular SuperGrok subscribers on the $30/month plan can see the entry but cannot activate it.

This is a full rundown pulled from multiple sources plus early community reactions. Benchmarks are not yet published by xAI; all performance claims are verified against independent coverage or explicitly flagged as unverified.

## What's new in 4.3

The core shift versus Grok 4.20 is an **output layer**. Grok 4.20 was an analysis and research model. Grok 4.3 produces finished deliverables in standard formats.

**Six material additions:**

1. **Native PDF generation.** Creates formatted, downloadable PDF documents directly from conversations. No external renderer in the loop.
2. **PowerPoint slide creation.** Builds structured decks from topics, documents, or data. First-party PPTX output.
3. **Spreadsheet creation.** Generates populated tables and datasets in spreadsheet format.
4. **Video input.** Processes video content and supports conversational interaction with footage. The claim: upload a video, ask questions about what happens in it.
5. **Enhanced reasoning.** Longer training runs vs Grok 4.20. Some testers speculate the base model is roughly 2× the parameter count, though xAI has not confirmed.
6. **Grok Computer integration.** Works alongside xAI's autonomous desktop agent for workflow automation. The full desktop-agent rollout is still limited, but 4.3 is the model version it routes to.

## Architecture

- **Context window:** 2,000,000 tokens (unchanged from Grok 4 Heavy, still the largest among Western closed-model offerings)
- **Heavy architecture:** 16-agent parallel test-time compute system
- **Training:** Longer than Grok 4.20's run, exact compute unit count not disclosed

The 2M context puts Grok in the same tier as Gemini 3.1 Pro and ahead of Claude Opus 4.7 (1M) and GPT-5.4 (undisclosed). Whether it holds attention quality across the full window is an open question. Grok 4 earlier tested well on needle-in-a-haystack style evaluations but degraded on cross-document reasoning at extreme lengths.

## SuperGrok plan ladder

| Plan | Price | What it unlocks |
|---|---|---|
| Free Grok | $0 | Daily message cap, Grok 4.1 |
| SuperGrok Lite | $10/mo | Basic tier |
| **SuperGrok** | **$30/mo** | Grok 4 Heavy, ~1,000 messages/day, 120 min Deep Search |
| **SuperGrok Heavy** | **$300/mo** | Everything above + Grok 4.3 beta + ~4,000 messages/day + 360 min Deep Search + max compute priority + multi-agent |
| API | Usage-based | Developer-facing rates |

The 10× jump from $30 to $300 is xAI's "professional tier." Rate-limit numbers are from independent reporting; xAI does not publish exact caps.

## What the community is saying

Reaction is predictably split.

**On the praise side:**

> "xAI is actually shipping. Every three weeks there's something new instead of a quarterly refresh and a press tour."

> "Grok 4 derives things carefully and step by step on math and logic. Less sloppy than Gemini or Claude on derivations."

> "Real-time X integration is still the moat. No other major chatbot has native access to the firehose."

The r/grok subreddit (45,000+ members) continues to rate Grok as the leader for current-events research and social-media trend analysis. That's Grok's actual sustainable edge: every other frontier lab sees public-web data delayed or filtered.

**On the critical side:**

> "$300/month for a model that still doesn't have persistent memory. ChatGPT has had memory since 2023." (Multiple X users)

> "Response times 10-15 seconds. For $300 I expected better."

> "The output formats are nice but I can't use Grok for creative writing. The prose is literal and robotic."

> "Content moderation got stricter in January 2026. I switched to Grok because ChatGPT was too filtered and now Grok is banning narrative elements I used to run."

**The missing-memory complaint is the sharpest.** Every major consumer chatbot except Grok has persistent cross-session memory in 2026: ChatGPT Memory (2023), Gemini Saved Info (2024), Claude Projects (2024). Grok users asking for cross-session persistence have been waiting 18+ months.

## Benchmark context

xAI has not published Grok 4.3 specific benchmarks yet. For reference, Grok 4 generally sits in this competitive landscape (April 2026):

| Benchmark | Grok 4 | GPT-5.4 | Claude Opus 4.6/4.7 |
|---|---|---|---|
| SWE-bench Verified (coding) | **75%** | 74.9% | 74% |
| GPQA Diamond (science reasoning) | Mid | Strong | **Leads** |
| Creative / marketing writing | Weaker | Strong | **Strongest** |
| Real-time X + social data | **Unique** | None | None |

No single model dominates every category in April 2026. Grok's edge is coding + real-time X data. Claude's edge is scientific reasoning + writing. GPT-5.4's edge is breadth + plugin ecosystem.

## Who should pay $300 for Heavy

**Pay the $300 if:**
- You run high-volume output workflows (50+ PDFs, slide decks, or spreadsheets per week)
- Video-heavy analysis is a real workflow (compliance review, creator-economy, sports analytics)
- You're already maxing out SuperGrok's 1,000 msg/day cap
- Early access to new features is a competitive advantage for your work
- You need the 2M context with the multi-agent Heavy mode

**Skip the $300 if:**
- You use Grok mostly for chat or research (regular SuperGrok at $30 covers this)
- Writing quality matters more than coding or research (Claude Opus 4.7 still wins)
- Persistent memory is a deal-breaker (it's not there yet)
- You can wait 4-6 weeks for the broader rollout to the $30 tier

## Timeline

Based on the Grok 4.20 rollout pattern (beta on Heavy in January 2026, broader SuperGrok release in February), **Grok 4.3 is expected on regular SuperGrok in mid-to-late May 2026**. That's the realistic wait for the $30 tier. xAI has not confirmed this timeline publicly.

## Cross-links and alternatives

- **Tool page:** [Grok](/tools/grok/) (updated scores pending full 4.3 availability)
- **Compare with:** [ChatGPT](/tools/chatgpt/) · [Claude](/tools/claude/) · [Gemini](/tools/gemini/)
- **For power users at similar prices:** Claude Max 20x ($200/mo), ChatGPT Pro Max ($200/mo), Gemini AI Ultra ($50/mo)

## Sources

- [PiunikaWeb: xAI rolls out Grok 4.3 beta for SuperGrok Heavy](https://piunikaweb.com/2026/04/17/xai-grok-4-3-beta-supergrok-heavy/)
- [BuildFastWithAI: Grok 4.3 Beta Is Live, Is $300 Worth It?](https://www.buildfastwithai.com/blogs/grok-4-3-beta-features-review)
- [Phemex News: xAI Launches Grok 4.3 Beta with Enhanced Features](https://phemex.com/news/article/xai-launches-grok-43-beta-with-enhanced-features-73950)
- [Hacker News thread on Grok 4.3 release](https://news.ycombinator.com/item?id=47808588)
- [Grokipedia: SuperGrok Heavy plan details](https://grokipedia.com/page/SuperGrok_Heavy)
- [Medium: Free Grok vs $30 SuperGrok vs $300 Heavy Plan 2026](https://medium.com/write-a-catalyst/free-grok-vs-300-heavy-plan-pick-the-right-fit-for-daily-use-265f6fc0c010)
