---
type: news
slug: 2026-04-30-poolside-laguna-xs2-open-model-local-agentic-coding
title: "Poolside drops Laguna XS.2, a free Apache 2.0 open model for local agentic coding"
date: 2026-04-30
severity: major
summary: "US startup Poolside released Laguna XS.2 (33B MoE, Apache 2.0) for local agentic coding and Laguna M.1 (225B MoE) as a free-tier API. The models were trained from scratch (not Qwen fine-tunes) using a Muon optimizer, making them a rare US open-source contender in the agentic coding space."
affects: [poolside, ollama, openrouter]
categories: [ai-coding, ai-model-release, ai-business, ai-tools]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-30
last_verified: 2026-04-30
related_tools: [ollama, openrouter, baseten, claude-code, codex]
sources:
  - url: "https://venturebeat.com/ai/american-ai-startup-poolside-launches-free-high-performing-open-model-laguna-xs-2-for-local-agentic-coding/"
    title: "American AI startup Poolside launches free open model Laguna XS.2 - VentureBeat"
  - url: "https://huggingface.co/poolside"
    title: "Poolside on Hugging Face"
---

A US-based AI startup you may not have heard of just released open-weight models that compete with the best in the agentic coding category.

On April 28, 2026, Poolside, a San Francisco AI lab founded in 2023, launched two new Laguna models and an ecosystem of tools around them. The release is notable not just for the model quality but for the strategic positioning: an American company releasing open-source agentic coding models trained from scratch, not fine-tuned from Chinese base models.

## The models

**Laguna M.1**: A proprietary 225-billion parameter Mixture of Experts model with 23 billion active parameters. Designed for complex, long-horizon software engineering tasks requiring strong reasoning and planning. Available for free temporarily through Poolside's API, OpenRouter, Ollama, and Baseten.

**Laguna XS.2**: An Apache 2.0 licensed 33-billion parameter MoE with 3 billion active parameters. Small enough to run on a single GPU or even a laptop. Designed for local, offline, private agentic coding. Available now on Hugging Face.

Both models were trained from scratch using Poolside's "Model Factory" infrastructure and a Muon optimizer that improves training efficiency by approximately 15%. They were trained on 30 trillion tokens curated through Poolside's AutoMixer system.

## Why it matters

The open-source AI coding model landscape has been dominated by Chinese labs. Qwen, DeepSeek, and Yi have released the most capable open-weight coding models. US labs have largely focused on proprietary, API-only offerings.

Poolside breaks that pattern. An American company releasing a capable Apache 2.0 coding model that runs locally is strategically important for enterprises with data sovereignty requirements, government contracts, and defense applications.

The 3B active parameter count of XS.2 means it can run on consumer hardware. Developers can run agentic coding assistance fully offline with no data leaving the machine. For security-conscious enterprises, that is a significant selling point.

## Tool impact

Poolside's Laguna series competes most directly with DeepSeek Coder models, Qwen Coder models (similar MoE architecture), and Code Llama / Llama variants.

It does not directly compete with Claude Code or Codex on capability. The 33B model is not going to match a 1.7T frontier model on complex reasoning. But for local development, offline use, and privacy-sensitive workflows, XS.2 fills a gap that the API-only frontier models cannot address.

For Ollama and OpenRouter, the addition of Poolside models increases their model diversity and gives users another US-origin open option alongside Llama.

## Buyer takeaway

If your team operates in security-constrained environments, like defense, critical infrastructure, finance, or government, and you have been looking for a locally-run capable coding model, Laguna XS.2 is worth testing. The Apache 2.0 license removes the restrictions that come with Llama's community license or Qwen's custom terms.

## What to watch

The M.1 model's performance on standard coding benchmarks will determine whether Poolside gains enterprise traction. A 225B MoE model trained from scratch is expensive. If M.1 proves competitive with Claude Opus 4.7 or GPT-5.5 on agentic coding tasks, Poolside becomes a serious contender.

Also watch for defense and government contract announcements. Poolside's blog specifically mentions public sector clients as a focus area, and an open-weight US coding model is strategically valuable for that market.
