---
type: news
slug: 2026-05-07-openai-realtime-2-voice-models
title: "OpenAI launches GPT-Realtime-2, Realtime-Translate, and Realtime-Whisper"
date: 2026-05-07
severity: major
summary: "OpenAI released three new Realtime API voice models: GPT-Realtime-2 for reasoning-heavy spoken apps, Realtime-Translate for live speech translation, and Realtime-Whisper for streaming transcription."
categories: [ai-voice, ai-chatbots, ai-infrastructure]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-11
last_verified: 2026-05-11
affects: []
related_tools: [chatgpt, whisper]
sources:
  - url: https://openai.com/index/advancing-voice-intelligence-with-new-models-in-the-api/
    title: "Advancing voice intelligence with new models in the API"
  - url: https://www.techradar.com/ai-platforms-assistants/openai-has-3-new-ai-voice-models-that-the-chatgpt-maker-says-will-unlock-a-new-class-of-voice-apps-for-developers
    title: "OpenAI has 3 new AI voice models"
---

# OpenAI launches GPT-Realtime-2, Realtime-Translate, and Realtime-Whisper

OpenAI released three new voice models for its Realtime API on May 7, 2026: GPT-Realtime-2, GPT-Realtime-Translate, and GPT-Realtime-Whisper.

GPT-Realtime-2 is the most important of the three for product builders because OpenAI positions it as a voice model with GPT-5-class reasoning for harder, multi-turn spoken tasks. Realtime-Translate targets live speech translation, while Realtime-Whisper targets streaming transcription for captions, notes, and real-time conversation interfaces.

## Why this matters

Voice AI is moving from "talk to a chatbot" into live application infrastructure. The useful surface is not just a nice speaking voice; it is latency, reasoning, transcription quality, interruption handling, translation coverage, and tool use inside real products.

That puts pressure on voice-agent vendors, meeting-note tools, customer-support voice bots, language-learning apps, accessibility products, and any workflow where typing is a bottleneck. If OpenAI can make realtime voice cheaper and more capable through the API, many standalone voice layers will need sharper specialization.

## Buyer take

For developers, this is a build-versus-buy checkpoint. If your product needs live translation, streaming transcription, or spoken task execution, test the Realtime API before committing to a wrapper vendor.

For buyers, do not evaluate voice tools only by demo smoothness. Ask which underlying model is used, whether the vendor supports interruption and tool calls, how transcripts are stored, what latency looks like in your region, and whether pricing is per-token, per-minute, or bundled.

The watch-out is cost predictability. Realtime voice feels natural when it stays open, but always-on audio can turn into a meter that runs faster than a text chatbot.

## What is still unclear

OpenAI has published model-level pricing and API positioning, but real-world cost depends heavily on session length, audio quality, translation direction, tool calls, and whether applications keep connections open between turns.

