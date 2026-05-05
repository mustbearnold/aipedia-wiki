---
type: news
slug: 2026-04-22-openai-privacy-filter
title: "OpenAI releases Privacy Filter, an open-weight PII redaction model"
date: 2026-04-22
severity: major
summary: "OpenAI released Privacy Filter on April 22, 2026, an open-weight model for detecting and redacting personally identifiable information in text. The model is designed for high-throughput privacy workflows, can run locally, supports up to 128K tokens of context, and uses 1.5B total parameters with 50M active parameters. OpenAI reports 97.43% F1 on a corrected version of PII-Masking-300k, but teams still need local evaluation before routing sensitive data through it."
affects: [chatgpt]
categories: [ai-safety, ai-business, ai-research]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-05
last_verified: 2026-05-05
sources:
  - url: "https://openai.com/index/introducing-openai-privacy-filter/"
    title: "Introducing OpenAI Privacy Filter - OpenAI"
  - url: "https://cdn.openai.com/pdf/c66281ed-b638-456a-8ce1-97e9f5264a90/OpenAI-Privacy-Filter-Model-Card.pdf"
    title: "Model Card for OpenAI Privacy Filter - OpenAI"
---

**OpenAI Privacy Filter** is an open-weight model for detecting and redacting personally identifiable information in text.

## What it does

Privacy Filter labels spans in text and masks categories such as:

- private person
- private address
- private email
- private phone
- private URL
- private date
- account number
- secret

OpenAI positions it for training, indexing, logging, and review pipelines where raw sensitive text should be redacted before it moves deeper into a system.

## Technical profile

- 1.5B total parameters.
- 50M active parameters.
- Up to 128K tokens of context.
- Bidirectional token-classification architecture with span decoding.
- Runs locally, so unfiltered data does not have to leave the user's machine.

## Why it matters

This is infrastructure news more than consumer ChatGPT news. If it works as advertised, Privacy Filter gives AI teams a practical way to reduce privacy risk before data enters logs, retrieval indexes, training sets, or human review queues.

For aipedia, it belongs in the privacy and enterprise-AI lane: it is a small model, but it changes the safe-deployment story around larger assistants.

The open-weight release also matters for regulated teams that cannot send raw customer or employee data to a hosted redaction service. A local PII filter can sit inside ingestion, analytics, support, and fine-tuning workflows before data leaves the controlled environment.

## Buyer context

Privacy Filter should not be treated as a compliance switch. OpenAI's benchmark numbers are useful, but they do not prove performance on every organization's data mix, language set, or secret format.

Teams evaluating it should test:

- false negatives on names, addresses, account numbers, secrets, and unusual identifiers
- false positives that could damage search, analytics, or support workflows
- performance on multilingual and domain-specific records
- audit logging around what was masked, when, and by which pipeline version
- fallback handling when confidence is low or input exceeds expected shape

The strongest use case is pre-processing. Privacy Filter is most useful before logs, prompts, analytics exports, embeddings, or training corpora are created. It is weaker as a last-minute guarantee after sensitive data has already spread across multiple systems.

## Aipedia take

This is a meaningful trust-and-safety building block. The practical value is not that one small model "solves" privacy, but that it gives AI teams a deployable redaction layer they can inspect, benchmark, and run close to the data.

## Related

- [OpenAI releases GPT-5.5](/news/2026-04-23-openai-gpt-55-release/)
- [OpenAI ships WebSockets for Responses API agent loops](/news/2026-04-22-openai-responses-api-websockets/)
