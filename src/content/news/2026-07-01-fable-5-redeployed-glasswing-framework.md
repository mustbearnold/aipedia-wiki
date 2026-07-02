---
type: news
slug: 2026-07-01-fable-5-redeployed-glasswing-framework
title: "Fable 5 returns globally as Anthropic proposes an industry jailbreak-severity scale"
date: 2026-07-01
severity: major
summary: "Anthropic redeployed Claude Fable 5 worldwide on July 1 after US export controls lifted, paired with a new safety classifier and a proposed cross-industry framework for scoring jailbreak severity with Amazon, Microsoft, and Google. Teams that built fallbacks during the 19-day outage should reassess dependency risk."
categories: [ai-chatbots, ai-infrastructure, ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-07-01
last_verified: 2026-07-01
related_tools: [claude, claude-code]
sources:
  - url: https://www.anthropic.com/news/redeploying-fable-5
    title: "Anthropic: Redeploying Claude Fable 5"
  - url: https://www.marktechpost.com/2026/07/01/anthropic-redeploys-claude-fable-5-on-july-1-after-us-export-controls-lift-adds-new-cybersecurity-classifier/
    title: "MarkTechPost: Anthropic Redeploys Claude Fable 5 on July 1 After US Export Controls Lift"
  - url: https://9to5google.com/2026/07/01/anthropic-fable-5-returns-to-claude/
    title: "9to5Google: Claude Fable 5 is making a dramatic return with 'extraordinarily strong' safeguards"
---

# Fable 5 returns globally as Anthropic proposes an industry jailbreak-severity scale

Claude Fable 5 is back. Anthropic's newsroom post says the model, suspended on June 12 after US export controls restricted access to non-foreign-nationals, resumed global availability on July 1 following [the lifting of those controls on June 30](/news/2026-06-30-fable-5-mythos-5-export-controls-lifted/). The redeployment is not a simple flip back on: Anthropic added a new safety classifier aimed at the specific jailbreak technique that triggered the suspension, and it is proposing an industry-wide framework, developed with Amazon, Microsoft, Google, and other partners in Project Glasswing, for scoring how severe a given safeguard bypass actually is.

For teams that depend on [Claude](/tools/claude/) Fable 5, the 19-day gap was a real-world test of model-availability risk at the frontier tier. The return is good news, but the episode is a data point worth keeping.

## What changed

- Fable 5 access resumed globally on July 1, 2026 across the Claude Platform, claude.ai, [Claude Code](/tools/claude-code/), and Claude Cowork, per Anthropic and reproduced by MarkTechPost.
- The new safety classifier blocks the reported bypass technique in over 99% of cases, according to Anthropic, and routes flagged requests to Claude Opus 4.8 instead of Fable 5.
- Anthropic says testing showed every frontier model it evaluated could produce the same demonstration that triggered Fable 5's suspension, meaning the underlying issue was not unique to Anthropic's model.
- Anthropic is proposing the "Glasswing" jailbreak-severity framework with Amazon, Microsoft, and Google, scoring bypasses on capability gain, breadth of unlocked tasks, ease of weaponization, and discoverability.
- Fable 5 remains priced at $10 per million input tokens and $50 per million output tokens, well above Sonnet 5 and Opus 4.8.
- Fable 5 is included in Pro, Max, Team, and select Enterprise plans through July 7, after which it draws from usage credits.

## Buyer signal

This episode is a reminder that the most capable models are increasingly subject to export-control and national-security constraints that behave nothing like ordinary SaaS outages. A 19-day suspension with no announced return date, followed by a same-week restoration, is exactly the kind of availability risk that belongs in a vendor risk assessment for [AI Infrastructure](/categories/ai-infrastructure/) buyers, not just a security footnote.

The proposed Glasswing severity framework is also worth watching. If Amazon, Microsoft, and Google actually adopt a shared jailbreak-scoring standard, it would be one of the first cross-lab efforts to standardize how safeguard failures get classified and disclosed, which affects how quickly future incidents like this one get resolved.

## What to do

- If you built a fallback to Opus 4.8, Sonnet 5, or another model during the outage, do not tear it down immediately. Keep it live and tested as a standing contingency.
- Review any workflow gated on Fable 5 specifically for cost. At $10/$50 per million tokens, it is materially more expensive than Sonnet 5's introductory $2/$10, so confirm the premium is buying something your workflow actually needs.
- Ask your Anthropic account team whether your usage tier is subject to the same classifier-driven routing to Opus 4.8, since flagged requests may silently execute on a different model than requested.
- Track whether Microsoft, Google, and Amazon publish their own Glasswing-aligned severity disclosures; that would signal the framework has real teeth beyond a press release.

## AiPedia take

Anthropic turned a supply disruption into a safety-process story, and the math checks out: a bypass that worked across "every model tested" is an industry problem, and proposing a shared severity scale is a more useful response than a quiet patch. Buyers should still treat frontier-model access as a dependency with real failure modes, not a utility.
