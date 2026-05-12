---
type: news
slug: 2026-05-11-openai-gpt-55-cyber-eu-preview
title: "OpenAI extends GPT-5.5-Cyber preview to EU defenders while Anthropic's Mythos holds back"
date: 2026-05-11
severity: major
summary: "OpenAI is granting limited preview access to GPT-5.5-Cyber across European cyber authorities, the EU AI Office, and vetted partner organizations — pushing the Trusted Access for Cyber program announced May 7 across the Atlantic. Anthropic has not granted equivalent EU preview to Mythos, drawing public attention to the policy gap on the same day Google disclosed the first AI-generated zero-day."
categories: [ai-security, ai-enterprise, ai-models]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-12
last_verified: 2026-05-12
affects: [chatgpt, codex]
related_tools: [chatgpt, codex, claude]
sources:
  - url: https://www.cnbc.com/2026/05/11/openai-eu-cyber-model-anthropic-mythos-gpt.html
    title: "OpenAI to give EU access to new cyber model but Anthropic still holding out on Mythos"
  - url: https://openai.com/index/gpt-5-5-with-trusted-access-for-cyber/
    title: "Scaling Trusted Access for Cyber with GPT-5.5 and GPT-5.5-Cyber"
---

# OpenAI extends GPT-5.5-Cyber preview to EU defenders while Anthropic's Mythos holds back

OpenAI confirmed on May 11, 2026 that GPT-5.5-Cyber — the most permissive variant of its latest model, designed for verified defensive cybersecurity work — is rolling out in limited preview to European partners. The expansion covers EU institutions including the **EU AI Office**, member-state cyber authorities, and vetted private-sector defenders responsible for critical infrastructure.

The move extends the Trusted Access for Cyber program OpenAI [announced on May 7](/news/2026-05-07-openai-gpt-55-cyber-trusted-access/) across the Atlantic. Anthropic, whose competing cyber-specialized model Mythos shipped about a month earlier, has not granted EU partners equivalent preview access. CNBC framed Anthropic as "still holding out" on Mythos, drawing public attention to the policy gap.

## Why this matters

The day's coverage juxtaposes two stories that do not usually appear in the same news cycle:
- OpenAI is broadening defender-side access to its most-permissive cyber model.
- Google is disclosing the first AI-generated zero-day exploit caught in the wild.

That pairing matters politically. EU regulators have been pushing for early-access agreements with frontier labs as part of the AI Act's general-purpose model code of practice. OpenAI now has a clean answer: "We are already giving EU institutions and authorities preview access to our most cyber-capable model." Anthropic's silence on Mythos creates a sharper contrast than it did a week ago.

For European buyers, the new posture means GPT-5.5-Cyber is approaching usable status for procurement inside member-state critical-infrastructure operators, public-sector SOCs, and EU-regulated enterprises. The model still sits behind OpenAI's identity-verification controls (Advanced Account Security mandatory from June 1, attested phishing-resistant SSO at the organization level), so this is not "open access" — it is a controlled defensive program with EU-resident participants now invited in.

For the wider AI policy track, this is the first concrete example of differential regional rollout of a frontier model along defensive-security lines. Expect this pattern to repeat for biology, finance, and trust-and-safety-specialized variants over the next 12 months.

## Buyer take

European security teams should treat the EU preview as a qualified opportunity, not a procurement event:

- **It is still limited preview.** OpenAI has not published broad eligibility criteria or pricing. Most teams will need to start with normal GPT-5.5 plus Trusted Access for Cyber, not assume GPT-5.5-Cyber is the right entry point.
- **Identity controls are real.** Plan for hardware-key or passkey readiness across users authorized to touch the model. Scoped authorization, logging, and a clear policy on what systems the model may probe are required.
- **The Anthropic gap is temporary.** Mythos exists and is technically competitive. Treating the May 11 framing as a permanent Anthropic disadvantage in Europe is premature; expect movement once Anthropic clarifies its EU access posture publicly.

## What is still unclear

OpenAI has not published the list of EU participants, per-organization pricing, or whether GPT-5.5-Cyber will reach general availability in the EU on the same schedule as in the US. Anthropic has not commented publicly on whether Mythos will follow a similar EU-preview pattern. Whether either model gets used by EU member-state authorities on actively monitored production systems — versus inside sandboxes — remains the open empirical question.
