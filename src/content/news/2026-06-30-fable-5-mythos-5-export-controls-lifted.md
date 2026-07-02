---
type: news
slug: 2026-06-30-fable-5-mythos-5-export-controls-lifted
title: "Commerce Department lifts export controls on Claude Fable 5 and Mythos 5"
date: 2026-06-30
severity: major
summary: "Anthropic says the U.S. Commerce Department has lifted the export control directive that forced it to disable Fable 5 and Mythos 5 for 18 days. Fable 5 returns globally July 1, with new safety commitments and a phased usage-credit rollout that buyers should plan around."
categories: [ai-infrastructure, ai-chatbots, ai-research]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-30
last_verified: 2026-06-30
related_tools: [claude, claude-code]
sources:
  - url: https://www.anthropic.com/news/redeploying-fable-5
    title: "Anthropic: Redeploying Claude Fable 5"
  - url: https://www.anthropic.com/news/fable-mythos-access
    title: "Anthropic: Statement on the US government directive to suspend access to Fable 5 and Mythos 5"
  - url: https://www.cnbc.com/2026/06/30/anthropic-says-trump-admin-has-lifted-export-controls-on-claude-fable-5-and-mythos-5.html
    title: "CNBC: Anthropic says Trump admin has lifted export controls on Claude Fable 5 and Mythos 5"
---

# Commerce Department lifts export controls on Claude Fable 5 and Mythos 5

Anthropic says the U.S. Department of Commerce has lifted the export control directive that forced it to disable Fable 5 and Mythos 5 worldwide on June 12. The company's redeployment notice says Fable 5 returns globally on July 1 across the Claude platform, Claude.ai, Claude Code, and Claude Cowork, ending an 18 day shutdown that started when the government cited national security concerns over a jailbreak technique. [Fable 5 did go back online on schedule](/news/2026-07-01-fable-5-redeployed-glasswing-framework/), paired with a new safety classifier and a proposed industry jailbreak-severity framework.

For buyers who watched AiPedia's earlier coverage of the shutdown and Opus 4.8's role as a stand-in, this is the resolution: access is coming back, but not all at once, and not without new conditions attached.

## What changed

- Anthropic's June 12 statement said the government ordered it to suspend all Fable 5 and Mythos 5 access for foreign nationals, including Anthropic's own foreign employees, with no reliable way to verify nationality in real time, so the company disabled both models for everyone.
- The trigger was a jailbreak technique that Amazon researchers demonstrated, which let the model be prompted to identify software vulnerabilities in a way the government flagged as a national security risk.
- Anthropic's June 30 update says Commerce lifted the directive after the company trained an improved safety classifier targeting that specific behavior.
- Mythos 5 was restored earlier, for select U.S. organizations, following government approval on June 26.
- Fable 5 returns globally on July 1.
- Anthropic agreed to expanded government pre-release access, faster jailbreak information sharing, a dedicated research team, and a proposed industry-wide jailbreak severity scoring framework developed with Amazon, Microsoft, Google, and other partners.

## Buyer signal: the access is phased, not a full reset

Anthropic's notice says Fable 5 will count against up to 50% of weekly usage limits for Pro, Max, Team, and select Enterprise plans through July 7. After that date, further Fable 5 usage draws on usage credits instead. Standard Enterprise seats need credits enabled to get access at all; premium Enterprise seats include Fable 5 through July 7 by default.

That is a meaningful detail for procurement and finance teams. If your organization built workflows on [Claude](/tools/claude/) or [Claude Code](/tools/claude-code/) around Fable 5 before the shutdown, budget owners should confirm which plan tier and seat type they are on now, because the free-inclusion window is short and credit consumption starts quickly after July 7.

## What to do

- Check whether your Claude seats are Pro, Max, Team, or Enterprise, and whether Enterprise seats have usage credits enabled.
- If you rely on Fable 5 for coding or agentic workflows in Claude Code, confirm current usage against the 50%-of-weekly-limit window before July 7.
- Revisit any fallback plans built around Opus 4.8 or other models during the shutdown; decide whether to keep them as a hedge against future export-control actions.
- Track Anthropic's proposed jailbreak severity framework, since it may become a reference point other model providers adopt for similar directives.

## AiPedia take

The fastest-moving part of this story is not the model, it is the regulatory process. An 18-day shutdown of a flagship model over a demonstrated jailbreak is a new kind of operational risk for enterprise AI buyers, on top of the usual pricing and rate-limit risk. Anthropic's commitments here, especially the industry-wide severity framework, look like an attempt to make future incidents faster to resolve. Buyers should treat that as a reason to ask every frontier-model vendor how they would handle a comparable order, not just Anthropic.
