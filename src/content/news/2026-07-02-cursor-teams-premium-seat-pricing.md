---
type: news
slug: 2026-07-02-cursor-teams-premium-seat-pricing
title: "Cursor splits Teams usage into two pools and adds a $120 Premium seat"
date: 2026-07-02
severity: minor
summary: "Cursor's Teams pricing overhaul takes effect for renewing customers on billing cycles starting July 1, splitting included usage into a Composer/Auto pool and a Third-Party API pool, and adding a Premium seat at $120/month (or $96 annual) alongside a $40 Standard seat. Engineering leads should re-check per-seat usage before their next renewal."
categories: [ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-07-02
last_verified: 2026-07-02
related_tools: [cursor, github-copilot, claude-code]
sources:
  - url: https://cursor.com/blog/teams-pricing-june-2026
    title: "Cursor: Improvements to Teams Pricing"
  - url: https://www.startuphub.ai/ai-news/technology/2026/cursor-teams-upgrades-pricing-for-predictability
    title: "StartupHub.ai: Cursor Teams Upgrades Pricing for Predictability"
---

# Cursor splits Teams usage into two pools and adds a $120 Premium seat

Cursor's updated Teams pricing took effect immediately for new customers and now applies to renewing customers on billing cycles starting July 1, 2026. The change splits every seat's included usage into two separate pools: one for Cursor's own Composer and Auto features, and a second for third-party API model usage (Claude, GPT, and other externally routed models). Cursor's blog post says the split gives admins clearer visibility into which spend is going to its own Composer 2.5 model versus outside providers.

The Standard seat holds at $32/month annual ($40/month billed monthly), now with more included usage at the same price. A new Premium seat launches at $96/month annual ($120/month billed monthly), aimed at developers running agents continuously through the day. Cursor says Premium includes 5x the usage of Standard for 3x the cost, and expects it to cover a full month of heavy agent usage for 99% of users. Teams can mix Standard and Premium seats freely.

## What changed

- Included usage now splits into a Composer/Auto pool and a Third-Party API pool instead of one combined allowance.
- A new Premium seat tier ($120/month monthly, $96/month annual) sits above the existing Standard seat ($40/month monthly, $32/month annual).
- Cursor credits Composer 2.5's lower cost-per-task for letting it expand included usage without raising the Standard seat price.
- Admin dashboards now show real-time usage against each pool separately, plus configurable dollar-threshold alerts via Slack or email.
- The changes apply to new customers immediately and to renewing Teams customers on billing cycles starting July 1, 2026.

## Buyer value

For teams comparing [AI Coding](/categories/ai-coding/) assistants, the pool split is the detail worth reading closely. A team that mostly uses Cursor's own Composer model gets more headroom under the new Standard seat. A team that routes most work to Claude or GPT models through Cursor's third-party pool needs to check whether that pool's allowance actually covers its usage pattern, since Composer's efficiency gains do not carry over to third-party model spend.

The Premium seat is a bet that heavy agentic users (people running Composer continuously rather than interactively) are common enough to justify a dedicated tier. Engineering managers should pull actual per-seat usage data before assuming Standard is still the right default for every developer.

## What to do

Before your next Teams renewal, export usage-per-seat data and separate it into Composer/Auto spend versus third-party API spend. If a subset of developers consistently exceeds the Standard pool while running agents most of the day, moving just those seats to Premium is likely cheaper than upgrading the whole team. Set the new dollar-threshold alerts immediately so finance is not surprised by a usage spike mid-cycle.

If your team is evaluating Cursor against [GitHub Copilot](/tools/github-copilot/) or [Claude Code](/tools/claude-code/), rerun the cost comparison using this new two-pool structure rather than older per-seat numbers, since the effective cost per developer now depends heavily on which pool they draw from.

## AiPedia take

Splitting usage into first-party and third-party pools is a pricing move that rewards staying inside Cursor's own model stack. That is a reasonable business decision for Cursor, but it means teams that value model choice should watch their third-party pool consumption closely rather than assuming the new "more generous" Standard seat covers their actual workload.
