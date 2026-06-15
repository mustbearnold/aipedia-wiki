---
type: news
slug: 2026-06-13-us-blocks-anthropic-fable-mythos-openai-probe
title: "June 13 AI news update: Claude Fable/Mythos suspended, GPT-5.2 retired, OpenAI probed"
date: 2026-06-13
severity: breaking
summary: "Late June 13 coverage: Anthropic says Claude Fable 5 and Claude Mythos 5 access is suspended after a US government directive, OpenAI says GPT-5.2 models are no longer available in ChatGPT, and Reuters/WSJ reporting says a coalition of US state attorneys general has opened a broad OpenAI investigation. Buyers should treat model availability, model churn, and legal scrutiny as procurement risks."
affects: [claude, claude-code, chatgpt]
categories: [ai-chatbots, ai-coding, ai-infrastructure]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-13
last_verified: 2026-06-13
related_tools: [claude, claude-code, chatgpt, codex]
sources:
  - url: https://www.anthropic.com/news/fable-mythos-access
    title: "Anthropic: Statement on the US government directive to suspend access to Fable 5 and Mythos 5"
  - url: https://www.anthropic.com/news/claude-fable-5-mythos-5
    title: "Anthropic: Claude Fable 5 and Claude Mythos 5"
  - url: https://help.openai.com/en/articles/6825453-chatgpt-release-notes
    title: "OpenAI: ChatGPT release notes"
  - url: https://www.channelnewsasia.com/business/openai-under-investigation-group-state-attorneys-general-source-says-6180526
    title: "Reuters via CNA: OpenAI under investigation by group of state attorneys general"
  - url: https://www.aa.com.tr/en/americas/openai-being-investigated-by-coalition-of-42-us-state-attorneys-general-wall-street-journal/3965711
    title: "Anadolu: OpenAI being investigated by coalition of 42 US state attorneys general, citing WSJ"
---

# June 13 AI news update: Claude Fable/Mythos suspended, GPT-5.2 retired, OpenAI probed

This is the late **June 13, 2026 AiPedia news catch-up**, written after the morning/weekend desk. The day turned from quiet to material: the most important AI news is no longer another benchmark claim, but whether frontier-model access can be interrupted by government action and whether major consumer AI products can withstand legal scrutiny.

AiPedia verified the Anthropic item against Anthropic's own June 12 statement and launch post, verified the ChatGPT model-retirement item against OpenAI's June 12 ChatGPT release notes, and verified the OpenAI legal item against Reuters/CNA and Anadolu's summary of the Wall Street Journal report on June 13, 2026.

## What changed since the morning desk

Three buyer-relevant updates landed after the June 13 morning desk:

- **Anthropic access shock.** Anthropic says it suspended access to Claude Fable 5 and Claude Mythos 5 after receiving a US government directive that cited national security authorities. Anthropic says all other Claude models are unaffected.
- **ChatGPT model churn.** OpenAI's ChatGPT release notes say GPT-5.2 Instant, GPT-5.2 Thinking, and GPT-5.2 Pro are no longer available in ChatGPT as of June 12, with existing conversations continuing on corresponding GPT-5.5 models.
- **OpenAI legal scrutiny.** Reuters reported that a coalition of US state attorneys general opened a broad investigation into OpenAI, with a subpoena seeking documents about user impact, advertising, engagement, data handling, minors, seniors, models, and internal policies.

No separate current source AiPedia found on June 13 showed a new OpenAI, Google, xAI, or Meta flagship model launch after the morning desk. The day is about governance and availability.

## Anthropic: Fable 5 and Mythos 5 are unavailable for now

Anthropic launched Claude Fable 5 and restricted Claude Mythos 5 on June 9 as Mythos-class models above the Opus class. The launch post said Fable 5 was the most capable Claude model Anthropic had made generally available, with safeguards that route some high-risk cyber, biology, chemistry, and distillation requests back to Opus 4.8. It also introduced a 30-day retention requirement for Mythos-class traffic and listed pricing at $10 per million input tokens and $50 per million output tokens.

The June 12 update changed the buyer reality. Anthropic now says access to both Fable 5 and Mythos 5 is suspended for all customers while it complies with a US government directive. Anthropic says the directive targeted access by foreign nationals and that disabling the models for all customers was the practical compliance path. It also says it disagrees with the action and is working to restore access.

## Buyer action for Claude and Claude Code users

Treat Fable 5 as **not currently available** until Anthropic restores access. If you were testing it for [Claude](/tools/claude/) or [Claude Code](/tools/claude-code/), fall back to Opus 4.8 or your existing model route and keep the pilot notes separate from production-default decisions.

For procurement, the important lesson is not only "model access changed." It is that frontier-model access can become a governance dependency. Ask vendors:

- Which model is actually available today?
- What happens to a workflow if a model is recalled, disabled, regionalized, or moved behind trusted access?
- Whether retention rules changed with the model class.
- Whether the provider can give advance notice, fallback routing, and audit evidence.

## ChatGPT: GPT-5.2 is gone from ChatGPT

OpenAI's ChatGPT release notes say GPT-5.2 Instant, GPT-5.2 Thinking, and GPT-5.2 Pro are no longer available in [ChatGPT](/tools/chatgpt/) as of June 12. Existing conversations that used GPT-5.2 now continue on the corresponding GPT-5.5 model, and GPT-5.5 remains available.

This is not a price change, but it is a product-maintenance signal. Teams that cite exact ChatGPT model names in internal docs, eval baselines, training material, or support instructions should replace GPT-5.2 references with current GPT-5.5 routing and keep old eval results labeled as historical.

## OpenAI: the probe raises consumer-AI risk questions

Reuters reported that OpenAI received a subpoena connected to a coalition of US state attorneys general. The reported document request covers a broad set of issues, including advertising, user engagement and retention, consumer and health data handling, activities involving minors and seniors, model behavior, and internal policies.

That is not a legal finding against OpenAI. It is a scrutiny signal. For [ChatGPT](/tools/chatgpt/) buyers, especially schools, healthcare teams, consumer-app builders, and support teams, the practical move is to re-check policies before expanding deployment:

- Confirm what data goes into ChatGPT or the OpenAI API.
- Keep sensitive health, student, and minor-related workflows behind stricter human review.
- Document opt-out, deletion, retention, and escalation paths.
- Avoid marketing claims that imply safety, medical reliability, or child-safety outcomes beyond sourced policy.

## Desk verdict

June 13 now has a clear theme: frontier AI buying risk moved from "which model is best?" to "can the model stay available, current, and governed?" Anthropic's Fable/Mythos suspension makes availability a live procurement risk. ChatGPT's GPT-5.2 retirement makes model churn a documentation and eval risk. The OpenAI probe makes consumer safety and data practices a board-level risk. None of these updates says buyers should abandon Claude or ChatGPT, but they do say the serious buyer checklist needs model fallback, legal review, data controls, and verified current availability before rollout.
