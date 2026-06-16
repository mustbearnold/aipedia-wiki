---
type: tool
slug: vapi
title: Vapi
tagline: Developer platform for building, testing, and deploying real-time voice AI agents that make and take phone calls, with bring-your-own model, voice, and transcriber.
category: ai-voice
secondary_categories: [ai-automation]
company: Vapi
url: https://vapi.ai
pricing_model: paid
price_range: "$0.05/min platform fee + at-cost providers (~$0.14-0.30/min all-in)"
status: active
launched: 2023
last_updated: 2026-06-16
last_verified: 2026-06-16
update_frequency: monthly
seo_title: "Vapi: Features, Pricing & Review (2026)"
meta_description: "Vapi is a developer platform for real-time voice AI agents, charging about $0.05/min plus at-cost model, voice, and transcription providers. Bring-your-own stack, Squads, and function calling. Reviewed June 2026."
author: "aipedia.wiki Editorial"
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 7
  moat: 6
  longevity: 7
facts:
  best_for:
    value: "Developers building production voice AI agents for inbound and outbound phone calls, with control over the language model, voice, transcriber, and telephony providers rather than a fixed bundle."
    source: "https://vapi.ai"
    source_label: "Vapi product site"
    source_id: vapi-product
    verified_at: 2026-06-16
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Usage-based with no seat fee: Vapi charges about $0.05/min for its platform and passes through model, text-to-speech, transcription, and telephony at cost, so a real call commonly lands around $0.14 to $0.30+ per minute depending on the stack. New accounts get about $10 in free credits."
    source: "https://vapi.ai"
    source_label: "Vapi pricing"
    source_id: vapi-pricing
    verified_at: 2026-06-16
    volatility: high
    confidence: medium
    next_review_at: 2026-07-16
  watch_out_for:
    value: "The headline $0.05/min is only the platform fee; total cost stacks the model, voice, transcription, and telephony providers on top, so model real all-in per-minute cost before scaling. It is a developer platform that needs engineering to build and maintain agents."
    source: "https://vapi.ai"
    source_label: "Vapi"
    source_id: vapi-product
    verified_at: 2026-06-16
    volatility: medium
    confidence: medium
tags: [voice-agents, voice-ai, phone-calls, developer-platform, telephony, vapi]
best_for:
  - developers building voice agents for phone calls
  - inbound and outbound call automation
  - teams that want to choose their own model and voice
  - low-latency real-time voice applications
not_best_for:
  - non-developers who want a no-code voice bot
  - simple text chatbots (no voice needed)
  - buyers who want one flat all-inclusive per-minute price
  - voice cloning or music generation as the main job
quick_answer: >-
  Vapi is a developer platform for building real-time voice AI agents that make and answer phone calls, letting you bring your own model, voice, and transcriber while it handles orchestration and low latency. It charges about $0.05/min plus at-cost providers, so real calls run roughly $0.14 to $0.30+ per minute. Pick it for flexible, production voice agents; skip it if you want a no-code bot or a single flat price.
---

# Vapi

Vapi is a developer platform for building voice AI agents: software that can place and answer phone calls, hold a real-time spoken conversation, and take actions during the call. Instead of bundling one fixed voice stack, Vapi acts as an orchestration layer that lets you choose the language model, the text-to-speech voice, the speech-to-text transcriber, and the telephony provider, then handles the hard real-time plumbing between them.

The pitch is control plus low latency. Vapi manages turn-taking, interruptions, and streaming so a developer can ship a production phone agent without building the real-time audio pipeline from scratch.

## System Verdict

> **Pick Vapi if you are a developer building production voice agents and you want control over the model, voice, transcriber, and telephony rather than a closed bundle.** Its orchestration, Squads for multi-agent handoffs, function calling, and knowledge-base support make it a strong base for inbound and outbound call automation.
>
> **Skip it if you are not a developer or you want one flat per-minute price.** Vapi is a building platform, not a no-code bot, and its cost stacks several providers. Non-technical buyers may prefer a packaged voice product, and teams wanting fixed pricing should model the all-in rate first.
>
> **Who uses it:** Engineering teams building customer support, scheduling, qualification, or outbound calling agents, who value provider choice and are comfortable wiring and maintaining the stack.

## Key Facts

| | |
|---|---|
| **What it is** | Developer platform for real-time voice AI phone agents |
| **Bring your own** | Language model, voice (TTS), transcriber (STT), telephony |
| **Platform fee** | About $0.05 per minute |
| **Provider costs** | Model, TTS, STT, and telephony passed through at cost |
| **Real all-in cost** | Commonly about $0.14 to $0.30+ per minute depending on stack |
| **Free credits** | About $10 to test |
| **Multi-agent** | Squads chain specialized agents with handoffs |
| **In-call actions** | Function calling to external APIs; knowledge base (RAG) |
| **Company** | Vapi |
| **Best alternative** | [Retell AI](/tools/retell-ai/) |

## What it actually is

Vapi is an orchestration and infrastructure layer for voice, not a single model. The value is in the real-time loop: capturing audio, transcribing it, sending it to a language model, synthesizing a spoken reply, and doing all of that fast enough to feel like a natural phone conversation, while handling interruptions and tool calls mid-call.

Because you choose the providers, you can tune for cost, latency, or quality: a cheaper transcriber and voice for high-volume calls, or premium providers for a flagship experience. The Assistants API configures agent behavior, Squads chains multiple specialized agents with handoffs, and function calling lets an agent trigger external systems during a call.

The flip side is that Vapi is a platform for builders. You assemble and maintain the agent, and the total cost depends on the providers you pick, so it rewards teams with engineering capacity more than non-technical buyers.

## When to pick Vapi

- **You are building production phone agents.** Inbound support, outbound qualification, scheduling, and reminders are core use cases.
- **You want provider choice.** Swap models, voices, and transcribers to balance cost, latency, and quality.
- **You need in-call actions.** Function calling and knowledge bases let agents look things up and act mid-call.
- **You need multi-step agents.** Squads route a call across specialized agents with handoffs.
- **Latency matters.** Vapi is built for the real-time turn-taking that makes voice feel natural.

## When to pick something else

- **No-code voice bot:** packaged voice products are easier for non-developers than a build platform.
- **A single flat per-minute price:** Vapi's stacked provider costs make budgeting less predictable; model the all-in rate first.
- **Closest competitor:** [Retell AI](/tools/retell-ai/) targets the same voice-agent builder space; compare latency, pricing, and integrations.
- **Voice cloning or narration:** [ElevenLabs](/tools/elevenlabs/) leads on voice quality and cloning rather than call orchestration.

## Pricing

Vapi is usage-based with no seat fee. As of June 2026 it charges roughly $0.05 per minute for its own platform and passes through the language model, text-to-speech, speech-to-text, and telephony providers at cost. In practice a real call commonly lands around $0.14 to $0.30 or more per minute once those providers are stacked, and budget setups can be lower. New accounts get about $10 in free credits to test.

There are usage-based self-serve terms plus committed-volume options for higher scale. Because the all-in cost depends entirely on the providers you choose, model a representative call against your real stack before scaling.

Pricing and features verified 2026-06-16 against the [Vapi site](https://vapi.ai).

## Failure modes

- **Headline price is not all-in.** The $0.05/min platform fee excludes model, voice, transcription, and telephony, which dominate real cost.
- **Requires engineering.** Vapi is a developer platform; building and maintaining a reliable agent takes technical work.
- **Cost varies with the stack.** Provider choices swing per-minute cost widely, so budgeting needs a real-world test.
- **Telephony billed separately.** Numbers and minutes through Twilio, Telnyx, or Vonage are additional.
- **Competitive space.** Voice-agent platforms move fast, so compare current latency, reliability, and pricing against alternatives.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that verifies product and pricing details against primary sources and generates the analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-16 against the [Vapi site](https://vapi.ai).

## FAQ

**What is Vapi?**

A developer platform for building real-time voice AI agents that make and answer phone calls, orchestrating your chosen model, voice, transcriber, and telephony provider.

**How much does Vapi cost?**

About $0.05 per minute for the platform, plus the model, voice, transcription, and telephony at cost. Real calls commonly run around $0.14 to $0.30+ per minute depending on the providers, with roughly $10 in free credits to start.

**Is Vapi no-code?**

No. It is built for developers. Non-technical buyers who want a ready-made voice bot should look at a packaged product instead.

**How is Vapi different from Retell AI?**

Both are voice-agent builder platforms. Vapi emphasizes provider choice and orchestration; compare current latency, pricing, and integrations against [Retell AI](/tools/retell-ai/) for your use case.

## Related

- **Category:** [AI Voice](/categories/ai-voice/)
- **Alternatives:** [Retell AI](/tools/retell-ai/) · [ElevenLabs](/tools/elevenlabs/)
