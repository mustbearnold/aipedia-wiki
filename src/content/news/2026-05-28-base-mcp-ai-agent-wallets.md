---
type: news
slug: 2026-05-28-base-mcp-ai-agent-wallets
title: "Base MCP lets AI agents prepare swaps, transfers, payments, and DeFi actions from chat, with user approval still in the wallet"
date: 2026-05-28
severity: major
summary: "Base MCP connects Base Account to AI clients including Claude, ChatGPT, Codex, Cursor, and Claude Code, letting agents prepare onchain actions while users approve or reject the transaction in Base Account."
categories: [ai-automation, ai-chatbots]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-28
last_verified: 2026-05-28
related_tools: [chatgpt, claude, codex, claude-code]
sources:
  - url: https://blog.base.org/base-mcp
    title: "Base: Introducing Base MCP"
  - url: https://docs.base.org/get-started/resources-for-ai-agents
    title: "Base Docs: Resources for AI agents"
---

# Base MCP lets AI agents prepare swaps, transfers, payments, and DeFi actions from chat, with user approval still in the wallet

Base launched Base MCP, a Model Context Protocol connection between Base Account and AI clients such as Claude, ChatGPT, Codex, Cursor, and Claude Code.

The result is a real agent-commerce test: a user can ask an AI assistant to prepare onchain actions, but the final transaction still routes through Base Account for review and approval.

## What Base MCP does

Base says the MCP connection lets supported AI clients help users:

- track portfolio balances;
- view transaction history;
- send funds;
- swap tokens;
- use supported Base ecosystem apps;
- interact with launch partners such as Morpho, Moonwell, Aerodrome, Bankr, Avantis, Virtuals, and Uniswap;
- pay for x402-enabled services.

The key design choice is that the agent does not silently spend. When a transaction is requested, Base Account opens a confirmation flow where the user can approve or cancel.

## Why this matters

Most AI agents are still trapped in a read-only or low-risk world. They can summarize, write, plan, and search. The moment they touch money, identity, contracts, cloud resources, or production systems, the trust problem changes.

Base MCP is interesting because it does not pretend the trust problem is solved by a better prompt. It puts a wallet confirmation step between the AI client's intent and the actual onchain action.

That may sound obvious. It is not. The next wave of useful agents will need this pattern everywhere: prepare the action, show the diff, explain the risk, require approval, log the result, and make reversal or recovery paths clear where possible.

## Who should try it

Base MCP is most relevant for:

- onchain power users who already operate in the Base ecosystem;
- developers building AI agents that need payment or wallet context;
- teams testing x402 and agent-paid services;
- DeFi users comfortable reviewing transactions before approval.

It is not ideal for beginners who do not understand gas, approvals, slippage, token risk, wallet permissions, phishing, or the consequences of signing the wrong request.

## Watch-outs

The confirmation step is good, but it is not magic. Users still need readable transaction previews, scoped permissions, safe defaults, rate limits, and warnings when an agent proposes an unusual or high-risk action.

Developers should also test prompt-injection scenarios. A chat agent connected to money should assume hostile content may try to manipulate its next transaction.

## AiPedia verdict

Base MCP is a **major agent-tool milestone** because it brings AI clients closer to real economic action while preserving explicit wallet approval.

For **[ChatGPT](/tools/chatgpt/)**, **[Claude](/tools/claude/)**, **[Codex](/tools/codex/)**, and **[Claude Code](/tools/claude-code/)** users, this is a useful glimpse of where MCP is going: not just fetching docs, but brokering controlled actions across money, apps, and services.
