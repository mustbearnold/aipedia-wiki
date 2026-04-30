---
type: news
slug: 2026-04-30-xai-grok-openai-distillation-testimony
title: "Musk testimony says xAI partly used OpenAI models to train Grok"
date: 2026-04-30
severity: major
summary: "During cross-examination in Musk v. OpenAI, Elon Musk said xAI had 'partly' used OpenAI models to train Grok, according to TechCrunch and WIRED courtroom reporting. The testimony puts model distillation back on the table as a provenance and trust issue for Grok."
affects: [grok, chatgpt]
categories: [ai-business, ai-policy, ai-models, ai-chatbots]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-30
last_verified: 2026-04-30
related_tools: [grok, chatgpt]
sources:
  - url: "https://techcrunch.com/2026/04/30/elon-musk-testifies-that-xai-trained-grok-on-openai-models/"
    title: "Elon Musk testifies that xAI trained Grok on OpenAI models - TechCrunch"
  - url: "https://www.wired.com/story/elon-musk-distill-openai-models-partly-xai/"
    title: "Elon Musk Seemingly Admits xAI Has Used OpenAI's Models to Train Its Own - WIRED"
---

The OpenAI-xAI rivalry now has sworn testimony attached to the distillation debate.

On April 30, 2026, TechCrunch and WIRED reported from federal court that Elon Musk acknowledged xAI had **partly** used OpenAI models to train Grok. The exchange happened during cross-examination in Musk's lawsuit against OpenAI, Sam Altman, and Greg Brockman.

## What was said

The reporters describe an exchange where OpenAI counsel asked Musk whether xAI had used distillation techniques on OpenAI models. Musk first described distillation as a general AI industry practice, then answered "partly" when pressed on whether xAI had done that with OpenAI.

This is courtroom reporting, not a technical disclosure from xAI. It does not quantify how much training data came from OpenAI outputs, which models were involved, when the practice happened, or how the outputs were filtered.

## Why it matters

OpenAI and Anthropic have both warned about third parties using their model outputs to train competing systems. That debate has often focused on Chinese open-weight labs. Musk's testimony points to a more uncomfortable reality: frontier labs may also use each other's outputs while publicly criticizing rivals for doing the same.

For buyers, the issue is provenance. If a model's behavior is partly shaped by another vendor's outputs, it raises questions about licensing, terms of service, evaluation contamination, and how much of a model's apparent capability is genuinely independent.

## Tool impact

For **Grok**, this is a trust and governance story. It does not change Grok's live X data advantage, pricing, or feature surface, but it adds a model-provenance caveat to any enterprise evaluation of xAI.

For **ChatGPT**, the case underlines OpenAI's position that model outputs are a strategic asset. It also complicates public narratives about who is copying whom in frontier AI.

## Buyer takeaway

Do not overread the testimony as proof that Grok is a clone of OpenAI models. The public record does not support that. But do treat model provenance as a procurement question, especially if your organization cares about IP indemnity, vendor terms, or clean-room development.

## What to watch

The next useful evidence would be filings or testimony that narrow the scope: which Grok versions, which OpenAI models, what volume of data, and whether the practice complied with applicable contracts or terms.
