---
type: news
slug: 2026-05-14-anthropic-claude-agent-sdk-credit-split
title: "Anthropic splits Claude Agent SDK and claude -p into separate monthly credits, ending the shared-limit era for programmatic agents"
date: 2026-05-14
severity: major
summary: "June 20 correction: Anthropic's current help page says the June 15 Agent SDK usage changes are paused. The original May 14 story described announced separate credits for Claude Agent SDK, claude -p, GitHub Actions, and third-party Agent SDK apps."
categories: [ai-coding, ai-agents, ai-pricing]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-20
last_verified: 2026-06-20
affects: [claude, claude-code, openclaw]
related_tools: [claude, claude-code, openclaw]
sources:
  - url: https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan
    title: "Claude Help Center: Use the Claude Agent SDK with your Claude plan"
  - url: https://www.theregister.com/ai-ml/2026/05/14/anthropic-tosses-agents-into-the-api-billing-pool/5240748
    title: "The Register: Anthropic tosses agents into the API billing pool"
  - url: https://venturebeat.com/technology/anthropic-reinstates-openclaw-and-third-party-agent-usage-on-claude-subscriptions-with-a-catch
    title: "VentureBeat: Anthropic reinstates OpenClaw and third-party agent usage on Claude subscriptions"
  - url: https://www.infoworld.com/article/4171274/anthropic-puts-claude-agents-on-a-meter-across-its-subscriptions.html
    title: "InfoWorld: Anthropic puts Claude agents on a meter across its subscriptions"
  - url: https://www.techmeme.com/260513/p51
    title: "Techmeme: Anthropic unveils Claude Agent SDK credits for paid plans"
---

# Anthropic splits Claude Agent SDK and claude -p into separate monthly credits, ending the shared-limit era for programmatic agents

> **June 20, 2026 correction:** Anthropic's current Agent SDK help page says the June 15 usage changes are paused. Do not treat the separate monthly Agent SDK credit pool described below as active until Anthropic updates the guidance again. The original May 14 story is preserved as historical context for the announced billing change.

Anthropic had announced a hard line between **interactive Claude use** and **programmatic agent use**.

The announced June 15 change said usage through the **Claude Agent SDK**, the **`claude -p`** non-interactive command, **Claude Code GitHub Actions**, and third-party apps built on the Agent SDK would no longer draw from normal Claude subscription limits. Eligible paid users would instead receive a separate monthly **Agent SDK credit** consumed first, then standard API-rate extra usage if the user enabled it. Anthropic's current help guidance now says that change is paused.

The original official support article listed the monthly credits:

| Plan | Agent SDK monthly credit |
|---|---:|
| Pro | $20 |
| Max 5x | $100 |
| Max 20x | $200 |
| Team Standard seats | $20 |
| Team Premium seats | $100 |
| Enterprise usage-based | $20 |
| Enterprise seat-based Premium seats | $200 |

Seat-based Enterprise Standard users were not listed as eligible for the credit, according to the original Anthropic guidance. API-key users also did not receive the credit; pay-as-you-go billing continued as before. Under the current help-page update, the separate credit change is paused.

## What the paused credit plan covered

The announced bucket would have applied to:

- Claude Agent SDK usage in a user's own Python or TypeScript projects.
- `claude -p` in Claude Code non-interactive mode.
- Claude Code GitHub Actions.
- Third-party apps that authenticate with a Claude subscription through the Agent SDK.

It does not apply to normal Claude conversations, Claude Cowork, or interactive Claude Code in a terminal or IDE.

The announced credits were per-user, could not be pooled across a team, did not roll over, and required a one-time claim. If extra usage was disabled and the monthly credit ran out, Agent SDK requests would stop until the credit refreshed. Anthropic's current help guidance says that usage change is paused.

## Why this matters

This is one of the clearest signs yet that flat-rate AI subscriptions are colliding with agent economics.

Human chat sessions are bursty. Programmatic agents are not. They can run in CI, execute repeatedly, call tools, miss cache paths, reprocess context, and burn far more inference than a human typing into a chat window. Anthropic's old model let some users route heavy external automation through subscription credentials that were priced for human-in-the-loop use.

Anthropic was not removing third-party agent support in the announced plan. The change would have restored a more official path for tools such as OpenClaw, Conductor-style harnesses, and custom Agent SDK scripts. But the subsidy was capped. If Anthropic resumes the plan as described, serious automation moves toward API economics after the included credit.

The user reaction is understandably split. Light users get a clearer legal path to experiment. Heavy users lose the ability to treat a $20-$200 subscription as a broad compute pool for unattended workflows.

## Buyer take

For Claude buyers, the practical read is:

- **Interactive Claude Code is still the subscription story.** If a human is in the terminal or IDE working with Claude Code, Anthropic says those normal subscription limits continue.
- **Automation still needs a budget.** CI runs, `claude -p`, custom scripts, and third-party agent apps should be treated like cloud spend, especially because the separate credit split is paused under current guidance.
- **Production agents should use API keys.** The announced monthly Agent SDK credit was positioned as individual experimentation and automation, not pooled production infrastructure. With the change paused, API metering remains the cleaner path for predictable production billing.

For OpenClaw users, the announcement was a mixed win. The route looked less gray than the April restriction period, but the economics were much less magical. OpenClaw remains free and self-hosted; the model bill is still hard to hide inside a subscription.

For teams, this should still trigger a small governance cleanup: identify where `claude -p`, Claude Code GitHub Actions, Agent SDK scripts, and third-party agent tools are being used; assign cost owners; and decide whether those jobs belong on subscription limits, a future credit pool if Anthropic resumes it, or normal API billing.

## What is still unclear

Anthropic has not published a granular calculator that maps typical `claude -p` jobs to how fast each monthly credit would burn if the credit plan resumes. That makes the announced June 15 change hard to price for teams running real agent workflows.

The other open question is competitive response. OpenAI just put Codex into the ChatGPT mobile app and continues to bundle substantial Codex access into ChatGPT tiers. If OpenAI keeps more agentic work inside flat-rate subscriptions while Anthropic meters programmatic use more aggressively, buyer behavior may shift. If OpenAI follows the same economic path later, this Anthropic move will look less like a one-company backlash and more like the beginning of agent pricing normalizing across the market.
