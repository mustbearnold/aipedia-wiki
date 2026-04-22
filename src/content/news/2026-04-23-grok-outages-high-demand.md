---
type: news
slug: 2026-04-23-grok-outages-high-demand
title: "Grok hit by intermittent outages across web, mobile, and X integration on April 23"
date: 2026-04-23
severity: minor
summary: "xAI's Grok experienced scattered connectivity issues and response delays on April 23, 2026, affecting users across web, iOS, Android, and the X platform integration. Downdetector logged elevated reports Wednesday evening through early Thursday. xAI's official status dashboard showed Service fully operational throughout, suggesting demand-driven congestion rather than infrastructure failure. SuperGrok and X Premium+ subscribers reported fewer interruptions, pointing to tier-based rate prioritization."
affects: [grok]
categories: [ai-industry]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-22
last_verified: 2026-04-22
sources:
  - url: "https://www.ibtimes.com.au/grok-down-now-grok-ai-experiences-intermittent-outages-amid-high-demand-april-23-2026-1867290"
    title: "Grok AI experiences intermittent outages amid high demand on April 23 - IBTimes Australia"
---

**xAI's Grok** experienced intermittent connectivity issues across web, iOS, Android, and the X platform integration on **April 23, 2026**. The issues ran from Wednesday evening through early Thursday morning.

## What was reported

- **Downdetector and status trackers** logged elevated reports concentrated on the mobile app and grok.com.
- **Most reports:** "high demand" errors and response delays rather than hard downtime.
- **SuperGrok and X Premium+ subscribers:** fewer interruptions, consistent with tier-based rate prioritization that xAI has not fully documented publicly.
- **Free-tier and light-subscription users:** most affected.

## Official response

None public as of April 23. xAI's [status.x.ai](https://status.x.ai) dashboard showed "Service fully operational" throughout, suggesting demand-driven congestion rather than infrastructure failure.

Historical pattern: xAI encourages users to wait a few minutes and retry during demand spikes. Backend scales automatically but with visible friction at peaks.

## Why it matters for Grok users

This is the second sustained congestion episode in April 2026 after the Grok 4.3 beta expansion to SuperGrok and X Premium+ on April 19. The capacity math works out:

- **Grok 4.3 beta availability expanded** from SuperGrok Heavy ($300/mo, ~10k subscribers) to SuperGrok ($30/mo) and X Premium+ ($40/mo, ~500k+ subscribers). Traffic pool grew **~50x**.
- **Colossus 2 compute capacity** is still ramping to 1.5 GW; the supercluster was sized before the April 19 expansion.
- **Result:** peak-hours queuing on free and lower-tier users while xAI waits for capacity to catch up.

## Read for prospective Grok users

Near term: free-tier Grok service quality will stay **variable through May 2026**. If you need predictable availability, the $30/mo SuperGrok or $40/mo X Premium+ tiers get better prioritization. The $300/mo Heavy tier remains the most reliable.

Medium term: the capacity gap closes once Colossus 2 finishes its 1.5 GW ramp (ongoing). Expect free-tier reliability to improve by Q3 2026.

## Grok's failure-modes pattern

Known Grok pain points from the April 2026 catalog:

- **No persistent memory.** Sessions do not carry context cross-conversation.
- **Unpublished rate limits.** Users discover caps by hitting them.
- **Demand-driven congestion** (this outage).
- **Geoblocked image generation** following 2026 deepfake regulatory actions.
- **Governance risk.** Post-SpaceX acquisition, platform continuity sits inside a single Musk-controlled conglomerate.

## Related

- [Grok 4.3 beta expands to SuperGrok and X Premium+](/news/2026-04-19-grok-4-3-beta-premium-plus-supergrok/)
- [Grok 4.3 beta Heavy-only launch](/news/2026-04-17-grok-4-3-beta-supergrok-heavy/)
