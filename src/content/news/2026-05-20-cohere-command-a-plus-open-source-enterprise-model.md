---
type: news
slug: 2026-05-20-cohere-command-a-plus-open-source-enterprise-model
title: "Cohere releases Command A+ as an Apache 2.0 enterprise agent model"
date: 2026-05-20
severity: major
summary: "Cohere released Command A+ as a 218B-parameter sparse mixture-of-experts model under Apache 2.0, with 25B active parameters, 128K input context, 64K max generation, vision input, tool use, reasoning, and support for 48 languages. The buyer signal: Cohere is moving its sovereignty pitch from private deployment alone toward a permissive open-model lane for enterprise agents."
categories: [ai-model-release, enterprise-ai, open-source-ai, ai-infrastructure]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-23
last_verified: 2026-05-23
affects: [cohere]
related_tools: [cohere, together-ai, openrouter]
sources:
  - url: https://cohere.com/blog/command-a-plus
    title: "Cohere: Introducing Command A+"
  - url: https://docs.cohere.com/changelog
    title: "Cohere release notes: Command A+"
  - url: https://www.morningstar.com/news/business-wire/20260520121796/cohere-releases-command-a-an-open-source-enterprise-ai-model-built-for-sovereign-critical-infrastructure
    title: "Business Wire: Cohere releases Command A+"
---

# Cohere releases Command A+ as an Apache 2.0 enterprise agent model

Cohere's **May 20, 2026** Command A+ release is the clearest sign yet that the company wants to compete for enterprise AI buyers on sovereignty, deployment control, and agent capability at the same time.

**[Cohere](/tools/cohere/)** describes Command A+ as an open-source sparse mixture-of-experts model with **218B total parameters**, **25B active parameters**, **128K input context**, **64K maximum generation**, text and image input, reasoning, tool use, and support for **48 languages**. The model ID is `command-a-plus-05-2026`, and Cohere's changelog says it is available through standard API endpoints with private deployment options for enterprise customers.

The headline is not just "another open model." It is an enterprise model with a permissive Apache 2.0 license, explicit agentic-task positioning, and hardware guidance that starts at 2 H100s under low-bit quantization.

## What changed

Command A+ consolidates capabilities Cohere previously split across the Command A family: reasoning, multimodal document understanding, translation, multilingual support, RAG, and tool use.

Cohere says the model improves on prior Command models across enterprise workloads, with stronger tool use and agentic-task performance. The release notes frame it as the strongest agentic model in the Command family, while the launch post positions it as an "enterprise workhorse" for privately deployable agentic workflows.

The model also changes Cohere's open-model posture. Cohere has long sold private deployment through North and Model Vault, but Command A+ makes the sovereignty story more concrete for teams that need to inspect, host, adapt, or route a model without depending entirely on a hosted black-box API.

## Why this matters

Enterprise AI buyers are splitting into two camps.

One camp wants the strongest hosted assistant or coding agent and will accept vendor-controlled infrastructure to get it. That keeps OpenAI, Anthropic, Google, and xAI in the lead for peak frontier capability.

The other camp wants more control: data residency, private inference, language coverage, deterministic procurement, and the option to self-host or run inside a controlled cloud. That is where Cohere is trying to win.

Command A+ gives that second camp a more credible flagship. It will not automatically beat Claude Opus, GPT-5.5, or Gemini 3.5 on every reasoning or coding task. But for regulated teams that need multilingual agents, RAG, document workflows, and deployability under a permissive license, the release meaningfully raises the floor.

## Buyer take

Shortlist Command A+ if your evaluation includes:

- private or sovereign deployment requirements;
- multilingual workflows across Europe, the Middle East, or Asia;
- RAG systems where citation, retrieval, and tool use matter more than consumer-chat polish;
- agent workloads that need a permissive license and predictable infrastructure control.

Do not switch purely on the model-release headline. Benchmark it against your own retrieval corpus, latency target, language mix, and tool-call failure modes. The right test is not a generic leaderboard. It is whether Command A+ can complete your high-value workflow at a cost and governance level your compliance team will sign.

## What to watch next

The open questions are pricing, managed inference economics, and ecosystem depth. Cohere says Command A+ is available through standard API endpoints, but buyers still need exact rates, private deployment terms, support commitments, and fine-tuning or adaptation pathways.

Also watch whether platforms such as OpenRouter, Together AI, Replicate, and enterprise inference providers add high-quality hosted routes. A permissive model becomes more useful when teams can test it quickly before committing to private infrastructure.
