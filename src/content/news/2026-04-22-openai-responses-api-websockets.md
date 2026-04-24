---
type: news
slug: 2026-04-22-openai-responses-api-websockets
title: "OpenAI adds WebSockets to the Responses API to speed up agent loops"
date: 2026-04-22
severity: major
summary: "OpenAI announced WebSockets support for the Responses API on April 22, 2026, aimed at reducing latency in agentic workflows where models repeatedly call tools, receive outputs, and continue. OpenAI says the persistent connection made OpenAI models in Cursor up to 30% faster."
affects: [chatgpt, codex]
categories: [ai-coding, ai-business, ai-infrastructure]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-24
last_verified: 2026-04-24
sources:
  - url: "https://openai.com/index/speeding-up-agentic-workflows-with-websockets/"
    title: "Speeding up agentic workflows with WebSockets in the Responses API - OpenAI"
---

OpenAI added **WebSockets support to the Responses API** for agentic workflows.

## Why it matters

Agent loops are chatty. A coding agent or desktop agent may:

1. ask the model what to do next
2. run a tool
3. send tool output back to the model
4. repeat dozens of times

Traditional request/response calls add overhead at every step. A persistent WebSocket connection reduces that back-and-forth cost.

## Reported impact

OpenAI says OpenAI models in Cursor became up to **30% faster** with the new WebSockets approach.

That matters because speed is now a user-facing quality dimension for coding agents. A model that is slightly smarter but noticeably slower can still lose daily-driver status.

## Who should care

- Agent framework builders.
- Coding tools like Cursor, Codex-style IDE agents, and autonomous QA systems.
- Teams with high-frequency tool-calling workflows.

## Related

- [OpenAI releases GPT-5.5 for ChatGPT and Codex](/news/2026-04-23-openai-gpt-55-release/)
- [Google launches Gemini Enterprise Agent Platform](/news/2026-04-23-gemini-enterprise-agent-platform/)
