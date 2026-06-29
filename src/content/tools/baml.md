---
type: tool
slug: baml
title: BAML
tagline: Apache-2.0 language and toolchain from BoundaryML for typed LLM functions, generated clients, structured outputs, robust parsing, tests, streaming, multimodal inputs, and Boundary Studio traces.
category: ai-coding
secondary_categories: [ai-infrastructure, ai-automation]
company: BoundaryML
url: https://docs.boundaryml.com
github_url: https://github.com/BoundaryML/baml
pricing_model: open-source
price_range: "Free Apache-2.0 framework; model/provider and optional Boundary Studio costs separate"
status: active
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "BAML Review: Typed LLM Functions, Pricing, Tests & Boundary Studio (June 2026)"
meta_description: "BAML review refreshed June 28, 2026: typed LLM functions, generated clients, robust parsing, tests, streaming, multimodal inputs, Boundary Studio, license, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use the Apache-2.0 framework first, especially when an engineering team wants typed LLM functions and generated clients. Budget separately for LLM providers, hosting, CI tests, observability storage, and optional Boundary Studio."
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
  longevity: 8
facts:
  best_for:
    value: "Engineering teams that want typed LLM functions, generated clients, structured output parsing, retry logic, tests, streaming, multimodal inputs, provider routing, and code-native prompt workflows."
    source: "https://docs.boundaryml.com/guide/introduction/what-is-baml.md"
    source_label: "BAML introduction"
    source_id: baml-what-is
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "No public BAML subscription ladder was found in official docs during the June 28, 2026 check; the framework is Apache-2.0 licensed and real spend comes from model providers, hosting, tests, and optional Boundary Studio use."
    source: "https://github.com/BoundaryML/baml/blob/canary/LICENSE"
    source_label: "BAML license"
    source_id: baml-license
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: medium
    confidence: high
  usage_model:
    value: "BAML generates client code that calls the LLM endpoint, parses outputs, fixes broken JSON, handles errors, and provides type safety, autocomplete, retry logic, and robust JSON parsing."
    source: "https://docs.boundaryml.com/guide/introduction/what-is-baml.md"
    source_label: "BAML introduction"
    source_id: baml-what-is
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  observability:
    value: "Boundary Studio can automatically trace BAML function calls when BOUNDARY_API_KEY is configured, and the traces view shows functions with typed parameters, inputs, and outputs."
    source: "https://docs.boundaryml.com/guide/boundary-cloud/observability/tracking-usage.md"
    source_label: "Boundary Studio observability docs"
    source_id: baml-boundary-studio
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Boundary Studio v1 at app.boundaryml.com was marked for deprecation by the end of March 2026, so teams should use studio.boundaryml.com and verify any older setup guide or dashboard link."
    source: "https://docs.boundaryml.com/guide/boundary-cloud/observability/tracking-usage.md"
    source_label: "Boundary Studio observability docs"
    source_id: baml-boundary-studio
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: high
    confidence: high
tags: [llm-framework, structured-output, type-safety, baml, boundaryml, generated-client, evals, observability, open-source]
best_for:
  - developers who want typed LLM functions instead of loose prompt strings
  - teams that need generated clients across Python, TypeScript, Go, Ruby, Rust, REST, or Elixir
  - apps where structured output, retries, parsing, tests, and streaming matter
  - teams that want Boundary Studio traces tied to BAML function definitions
not_best_for:
  - non-technical teams that want a visual app builder
  - teams that only need hosted observability after the app already exists
  - buyers looking for a public SaaS subscription ladder
  - simple prompts that do not need generated clients or strong output contracts
quick_answer: >-
  BAML is an Apache-2.0 language and toolchain for typed LLM functions. Pick it when a developer team wants generated clients, structured outputs, robust parsing, tests, streaming, multimodal inputs, and Boundary Studio traces tied to code. It is free as a framework, but model, hosting, CI, and observability costs are separate.
price_history:
  - date: 2026-06-28
    plan: "BAML framework"
    price: "Free, Apache-2.0 license"
    source: "https://github.com/BoundaryML/baml/blob/canary/LICENSE"
    source_label: "BAML license"
    source_id: baml-license
    verified_at: 2026-06-28
    note: "Model provider, hosting, testing, and optional Boundary Studio costs are separate."
  - date: 2026-06-28
    plan: "Boundary Studio"
    price: "No public pricing verified"
    source: "https://docs.boundaryml.com/guide/boundary-cloud/observability/tracking-usage.md"
    source_label: "Boundary Studio observability docs"
    source_id: baml-boundary-studio
    verified_at: 2026-06-28
    note: "Docs describe setup and tracing but not a public subscription ladder in the checked official sources."
---

# BAML

BAML is an Apache-2.0 language and toolchain from BoundaryML for defining LLM functions in code. It generates clients, gives typed outputs, handles robust parsing and broken JSON, supports tests, and can connect BAML calls to Boundary Studio traces.

The buyer question is whether your team wants LLM calls to behave more like typed functions than loose prompts. If yes, BAML is worth evaluating before adding a heavier agent framework.

## System Verdict

> **Pick BAML when structured LLM calls need strong contracts.** It is strongest for engineering teams that want typed functions, generated clients, robust output parsing, tests, streaming, multimodal inputs, and traces tied to code.
>
> **Skip it when you need a managed eval dashboard first.** [Braintrust](/tools/braintrust/), [LangSmith](/tools/langsmith/), or [Arize Phoenix](/tools/arize-phoenix/) fit better when hosted observability and team workflow are the missing layer.
>
> **Best plan guidance:** use the open-source framework first. Budget separately for provider tokens, hosting, CI/eval runs, storage, and optional Boundary Studio observability.

## Key Facts

| | |
|---|---|
| Core job | Typed LLM functions and generated clients |
| License | Apache-2.0 |
| Generated code | `baml_client` calls LLM endpoints, parses output, fixes broken JSON, and handles errors |
| Languages in docs | Python, TypeScript, Go, Ruby, Rust, REST, Elixir |
| Developer workflow | BAML function definitions, tests, VSCode Playground, prompt snippets, streaming, multimodal inputs |
| Observability | Boundary Studio traces for BAML functions when `BOUNDARY_API_KEY` is configured |
| Pricing | No public SaaS ladder verified; framework is free and model/provider costs are separate |

## When To Pick BAML

- **You need typed structured outputs.** BAML lets developers define output contracts and generate client code.
- **You are tired of brittle JSON parsing.** The docs emphasize robust JSON parsing and fixing broken output.
- **You want tests beside prompts.** BAML files can include tests and assertions for function behavior.
- **You need multi-language clients.** Docs include Python, TypeScript, Go, Ruby, Rust, REST, and Elixir routes.
- **You want traces tied to function definitions.** Boundary Studio can show BAML calls as typed functions, not only raw JSON spans.

## When To Pick Something Else

- **Python agent framework:** [Pydantic AI](/tools/pydantic-ai/) when typed Python agents, dependencies, tools, MCP, evals, and graphs are the larger framework need.
- **TypeScript agent framework:** [Mastra](/tools/mastra/) when TypeScript runtime, workflows, and agent infrastructure are the standard.
- **Open-source eval framework:** [DeepEval](/tools/deepeval/) or [Ragas](/tools/ragas/) when the main job is evaluation metrics and CI tests.
- **Hosted observability:** [LangSmith](/tools/langsmith/), [Braintrust](/tools/braintrust/), [Arize Phoenix](/tools/arize-phoenix/), or [LangWatch](/tools/langwatch/) when team dashboards and retention are first.
- **Visual app builders:** [Dify](/tools/dify/) or [Flowise](/tools/flowise/) when the buyer wants a canvas instead of code.

## Pricing

BAML was checked on June 28, 2026 against official docs and the GitHub license.

| Cost line | Public price | Buyer note |
|---|---|---|
| BAML framework | Free, Apache-2.0 | Use as a code framework and generated-client toolchain |
| Model providers | Depends on provider | OpenAI, Anthropic, Google, local, or other provider costs remain separate |
| Hosting and CI | Depends on your stack | App servers, jobs, tests, and eval runs are buyer-owned |
| Boundary Studio | No public pricing verified | Docs describe tracing setup, but not a public subscription ladder in checked sources |

Treat BAML as an engineering framework choice, not a finished SaaS purchase.

## Failure Modes

- **Framework adoption takes discipline.** Teams need to move prompt logic into BAML definitions and generated clients.
- **Type safety does not guarantee truth.** A response can match the schema and still be factually wrong.
- **Provider behavior still varies.** Structured output, streaming, retries, and tool calling can differ by model provider.
- **Studio links changed.** Docs warn that Boundary Studio v1 at `app.boundaryml.com` was being deprecated by the end of March 2026.
- **Pricing is not fully public.** The framework license is clear, but optional hosted Studio or support costs need direct verification.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against BAML docs, Boundary Studio docs, testing docs, docs index, and Apache-2.0 license.

## FAQ

**Is BAML free?**
The BAML framework is Apache-2.0 licensed. Model provider, hosting, CI, and optional Boundary Studio costs are separate.

**What is BAML best for?**
BAML is best for developer teams that want typed LLM functions, generated clients, structured outputs, robust parsing, tests, and observability tied to code.

**BAML vs Pydantic AI?**
BAML is focused on typed LLM function definitions and generated clients. Pydantic AI is a broader Python agent framework with typed agents, dependencies, tools, MCP, evals, and graph workflows.

## Sources

- [BAML docs index](https://docs.boundaryml.com/llms.txt): official documentation map
- [What is BAML](https://docs.boundaryml.com/guide/introduction/what-is-baml.md): generated client, typed outputs, parsing, retries, and language examples
- [Testing BAML functions](https://docs.boundaryml.com/guide/baml-basics/testing-functions.md): tests and assertions
- [Boundary Studio observability docs](https://docs.boundaryml.com/guide/boundary-cloud/observability/tracking-usage.md): trace setup and Studio migration notice
- [BAML license](https://github.com/BoundaryML/baml/blob/canary/LICENSE): Apache-2.0 license

## Related

- **Category:** [AI Coding](/categories/ai-coding/) · [AI Infrastructure](/categories/ai-infrastructure/) · [AI Automation](/categories/ai-automation/)
- **Alternatives:** [Pydantic AI](/tools/pydantic-ai/) · [Mastra](/tools/mastra/) · [DeepEval](/tools/deepeval/) · [Ragas](/tools/ragas/)
