---
type: tool
slug: outlines
title: Outlines
tagline: Apache-2.0 structured-generation library from .txt for constraining LLM output to JSON Schema, regex, grammars, and typed schemas during generation.
category: ai-coding
secondary_categories: [ai-infrastructure]
company: ".txt"
url: https://dottxt-ai.github.io/outlines/latest/
github_url: https://github.com/dottxt-ai/outlines
pricing_model: open-source
price_range: "Free Apache-2.0 library; Dottxt API access available by request with no public rates verified"
status: active
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "Outlines Review: Structured Generation, Pricing & Alternatives (June 2026)"
meta_description: "Outlines review refreshed June 28, 2026: Apache-2.0 structured generation for JSON Schema, regex, grammars, Dottxt API caveat, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use the free Apache-2.0 Outlines library when developers need constrained generation from local, hosted, or provider APIs. Treat Dottxt API as an access-request route until public pricing is verified."
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 9
  moat: 7
  longevity: 7
facts:
  best_for:
    value: "Developers who need structured generation that constrains LLM output to JSON Schema, regex, context-free grammars, typed schemas, or other valid output shapes during generation."
    source: "https://dottxt-ai.github.io/outlines/latest/"
    source_label: "Outlines docs"
    source_id: outlines-docs
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Outlines is Apache-2.0 licensed open-source software; no product subscription is required for the library, while model/provider usage and hosting remain separate."
    source: "https://raw.githubusercontent.com/dottxt-ai/outlines/main/LICENSE"
    source_label: "Outlines license"
    source_id: outlines-license
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: medium
    confidence: high
  structured_generation_scope:
    value: "Outlines docs say the library supports JSON Schema, regex, context-free grammars, Pydantic schemas, fast constrained generation, and model routes including OpenAI, Anthropic, Gemini, Ollama, vLLM, Transformers, llama.cpp, MLX-LM, SGLang, and TGI."
    source: "https://dottxt-ai.github.io/outlines/latest/"
    source_label: "Outlines docs"
    source_id: outlines-docs
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  dottxt_api_scope:
    value: "Dottxt API docs describe an OpenAI-compatible chat-completions endpoint for schema-constrained generation, but the June 28 check did not verify a public API price table."
    source: "https://docs.dottxt.ai/api/overview"
    source_label: "Dottxt API docs"
    source_id: dottxt-api-docs
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: high
    confidence: high
  watch_out_for:
    value: "Outlines can improve output shape reliability, but teams still need semantic validation, evals, fallback behavior, model-cost controls, and public pricing confirmation before relying on Dottxt API."
    source: "https://docs.dottxt.ai/api/overview"
    source_label: "Dottxt API docs"
    source_id: dottxt-api-docs
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: high
    confidence: high
tags: [structured-generation, json-schema, regex, grammars, constrained-decoding, structured-outputs, open-source, apache-2, dottxt]
best_for:
  - developers who need constrained generation rather than post-hoc parsing
  - teams working with JSON Schema, regex, grammars, and typed schemas
  - local-model and hosted-model projects that need valid output shapes
  - engineers comparing structured-output libraries before adding a bigger agent framework
not_best_for:
  - non-technical teams that need a hosted AI app platform
  - buyers that need public Dottxt API pricing before purchase
  - teams that only need simple prompt templates
  - workflows where semantic correctness matters but no evals exist
quick_answer: >-
  Outlines is a free Apache-2.0 library for constrained LLM generation. Pick it when developers need outputs to match JSON Schema, regex, grammars, Pydantic-style schemas, or typed structures during generation. It improves output shape, but semantic correctness, evals, model costs, and Dottxt API pricing still need separate review.
price_history:
  - date: 2026-06-28
    plan: "Outlines library"
    price: "Free, Apache-2.0 licensed"
    source: "https://raw.githubusercontent.com/dottxt-ai/outlines/main/LICENSE"
    source_label: "Outlines license"
    source_id: outlines-license
    verified_at: 2026-06-28
    note: "Model/provider calls, inference hosting, retries, evals, and observability are separate costs."
  - date: 2026-06-28
    plan: "Dottxt API"
    price: "Access request; no public rate table verified"
    source: "https://docs.dottxt.ai/api/overview"
    source_label: "Dottxt API docs"
    source_id: dottxt-api-docs
    verified_at: 2026-06-28
    note: "Docs describe an OpenAI-compatible API route, but the public pricing URL was not a usable verified price table in the June 28 check."
---

# Outlines

Outlines is an open-source structured-generation library from .txt. It constrains an LLM during generation so outputs match JSON Schema, regex patterns, context-free grammars, typed schemas, or other expected structures.

The buyer reason to care is reliability at the generation step. Instead of asking for valid JSON and repairing mistakes afterward, Outlines tries to make invalid shapes impossible during decoding.

## System Verdict

> **Pick Outlines when output shape must be enforced during generation.** It is strongest for developers who need JSON Schema, regex, grammar, or typed-schema constraints across local and hosted model routes.
>
> **Skip it when the team needs a broader app framework or hosted platform.** [Instructor](/tools/instructor/), [BAML](/tools/baml/), [Mirascope](/tools/mirascope/), [Pydantic AI](/tools/pydantic-ai/), or [Dify](/tools/dify/) may fit better depending on whether the problem is validation, typed functions, agent code, or app building.
>
> **Best plan guidance:** use the free Apache-2.0 library first. Treat Dottxt API as access-request and unpriced until a current public or sales-confirmed rate table is available.

## Key Facts

| | |
|---|---|
| Core job | Structured generation and constrained decoding |
| License | Apache-2.0 |
| Output constraints | JSON Schema, regex, grammars, and typed schemas |
| Model routes | Local frameworks and hosted APIs listed in docs |
| API route | Dottxt API with access request |
| Main caveat | Valid shape is not the same as correct content |

## When To Pick Outlines

- **You need valid structure at decode time.** Outlines is designed to constrain generation rather than clean up malformed outputs later.
- **You use schemas or grammars.** JSON Schema, regex, and grammar constraints are the core buying reason.
- **You need provider flexibility.** The docs list local and hosted routes, including OpenAI, Anthropic, Gemini, Ollama, vLLM, Transformers, llama.cpp, MLX-LM, SGLang, and TGI.
- **You are building extraction or tool-input flows.** Structured generation can make downstream code less brittle.
- **You want a library, not a platform.** Apache-2.0 licensing makes it easier to adopt in engineering-owned systems.

## When To Pick Something Else

- **Validated post-processing:** [Instructor](/tools/instructor/) when Pydantic-style validation, retries, and provider adapters are the main need.
- **Typed LLM functions:** [BAML](/tools/baml/) when generated clients, tests, typed function files, streaming, and multimodal workflows matter.
- **Provider-agnostic SDKs:** [Mirascope](/tools/mirascope/) when the whole LLM-call layer needs abstraction, not only structured generation.
- **Typed agents:** [Pydantic AI](/tools/pydantic-ai/) or [Agno](/tools/agno/) when tools, dependencies, memory, workflows, and agent runtime are the hard part.
- **Evals and reliability platforms:** [DeepEval](/tools/deepeval/), [Ragas](/tools/ragas/), [Opik](/tools/opik/), or [Braintrust](/tools/braintrust/) when correctness needs measured release gates.

## Pricing

Outlines was checked on June 28, 2026 against official docs, Dottxt API docs, repository, and license sources.

| Cost line | Public price | Buyer note |
|---|---|---|
| Outlines library | Free, Apache-2.0 licensed | Use for constrained generation in app code |
| Dottxt API | Access request; no public rate table verified | Do not quote API costs without current public pricing or sales confirmation |
| Model or inference backend | Depends on provider | OpenAI, Anthropic, Gemini, local inference, or hosted inference costs remain separate |
| Evaluation and validation | Depends on team | Output shape is constrained, but semantic correctness still needs tests |

The practical buying advice: choose Outlines when invalid output shape is causing real production failures. If the problem is wrong facts, weak retrieval, bad labels, or unclear task design, structured generation will not solve it alone.

## Failure Modes

- **Valid shape can still be wrong.** A JSON object can satisfy a schema while containing incorrect values.
- **Complex schemas can slow teams down.** Constraints need design, tests, and maintenance.
- **Model support varies.** Different backends expose different performance, streaming, and constraint behavior.
- **API pricing needs confirmation.** Dottxt API docs show an access route, but no public rate table was verified on June 28.
- **Evals are still required.** Structured generation should be paired with examples, tests, and regression checks.

## Change History

- **2026-06-28:** Added Outlines after verifying official docs, Dottxt API docs, repository status, and Apache-2.0 license.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against Outlines docs, Dottxt API docs, repository, and license sources.

## FAQ

**Is Outlines free?**
Yes. Outlines is Apache-2.0 licensed open-source software. Model calls, hosting, inference backends, evals, and observability remain separate.

**What is Outlines best for?**
Outlines is best for developers who need constrained LLM generation so output matches JSON Schema, regex, context-free grammars, Pydantic-style schemas, or typed structures.

**Outlines vs Instructor?**
Outlines constrains generation so invalid shapes are less likely at decode time. Instructor focuses on validated structured outputs with Pydantic-style models, provider adapters, and retry behavior after a model call.

## Sources

- [Outlines docs](https://dottxt-ai.github.io/outlines/latest/): structured generation, schemas, grammar constraints, and model support
- [Outlines GitHub repository](https://github.com/dottxt-ai/outlines): repository status
- [Outlines license](https://raw.githubusercontent.com/dottxt-ai/outlines/main/LICENSE): Apache-2.0 license
- [Dottxt official site](https://dottxt.co/): product context from the team behind Outlines
- [Dottxt API docs](https://docs.dottxt.ai/api/overview): OpenAI-compatible API route and schema-constrained generation
- [Dottxt models docs](https://docs.dottxt.ai/api/models): current Dottxt API model catalog

## Related

- **Category:** [AI Coding](/categories/ai-coding/) · [AI Infrastructure](/categories/ai-infrastructure/)
- **Alternatives:** [Instructor](/tools/instructor/) · [BAML](/tools/baml/) · [Mirascope](/tools/mirascope/) · [Pydantic AI](/tools/pydantic-ai/)
