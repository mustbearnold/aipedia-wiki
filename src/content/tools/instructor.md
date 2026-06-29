---
type: tool
slug: instructor
title: Instructor
tagline: MIT-licensed structured-output library for getting validated JSON from LLMs with Pydantic-style models, retries, and provider adapters.
category: ai-coding
secondary_categories: [ai-infrastructure]
company: 567 Labs
url: https://python.useinstructor.com
github_url: https://github.com/567-labs/instructor
pricing_model: open-source
price_range: "Free MIT library; model/provider, hosting, and validation costs separate"
status: active
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "Instructor Review: Structured Outputs, Pydantic, Pricing & Alternatives (June 2026)"
meta_description: "Instructor review refreshed June 28, 2026: MIT structured-output library for validated LLM JSON, provider support, pricing, license, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use the free MIT library when developers need validated structured outputs in code. Budget separately for model calls, retries, schema work, evals, and production observability."
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
    value: "Developers who need reliable JSON or typed structured data from LLMs with validation, type safety, IDE support, retries, and provider adapters."
    source: "https://python.useinstructor.com/"
    source_label: "Instructor docs"
    source_id: instructor-docs
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Instructor is MIT-licensed open-source software; real costs come from the chosen model/provider, retries, hosting, evaluation, and review work."
    source: "https://raw.githubusercontent.com/567-labs/instructor/main/LICENSE"
    source_label: "Instructor license"
    source_id: instructor-license
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: medium
    confidence: high
  provider_scope:
    value: "Instructor docs and README show a provider adapter pattern for using the same structured-output approach across major LLM providers."
    source: "https://github.com/567-labs/instructor"
    source_label: "Instructor GitHub repository"
    source_id: instructor-repository
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  structured_output_scope:
    value: "The official docs position Instructor around defining a model and receiving validated structured data instead of hand-parsing raw model text."
    source: "https://python.useinstructor.com/"
    source_label: "Instructor docs"
    source_id: instructor-docs
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Instructor improves structured-output ergonomics, but production teams still need schema design, retry budgets, evals, monitoring, and fallback behavior for model refusals or malformed outputs."
    source: "https://python.useinstructor.com/"
    source_label: "Instructor docs"
    source_id: instructor-docs
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: medium
    confidence: high
tags: [structured-outputs, json, pydantic, validation, llm-functions, open-source, mit, python, provider-adapters]
best_for:
  - developers who need validated JSON from LLM calls
  - teams replacing hand-written parsing and fragile extraction prompts
  - apps that need Pydantic-style models, retries, and provider adapters
  - engineers building extraction, classification, enrichment, and agent-tool inputs
not_best_for:
  - non-technical teams that need a hosted prompt testing dashboard
  - teams that need a full agent framework or workflow builder
  - buyers expecting a library to replace evals and monitoring
  - apps where unstructured prose is the desired output
quick_answer: >-
  Instructor is a free MIT-licensed library for getting validated structured outputs from LLMs. Pick it when developers need typed JSON or Pydantic-style models from provider calls. It is not a hosted governance platform, so model costs, retries, evals, observability, and schema quality remain buyer-owned.
price_history:
  - date: 2026-06-28
    plan: "Instructor library"
    price: "Free, MIT-licensed"
    source: "https://raw.githubusercontent.com/567-labs/instructor/main/LICENSE"
    source_label: "Instructor license"
    source_id: instructor-license
    verified_at: 2026-06-28
    note: "Model/provider calls, retries, hosting, evaluation, and monitoring are separate costs."
---

# Instructor

Instructor is an open-source library for getting validated structured outputs from LLMs. Instead of asking a model for JSON and hand-parsing the result, developers define a schema and receive validated data in code.

The core buyer value is reliability at the application boundary. If an AI feature needs a typed extraction result, classification object, tool argument, or enrichment record, Instructor can reduce fragile prompt-and-parse glue.

## System Verdict

> **Pick Instructor when structured output is the missing layer.** It is strongest when developers need validated JSON, Pydantic-style models, retries, and provider adapters inside application code.
>
> **Skip it when the team needs an agent platform.** [Pydantic AI](/tools/pydantic-ai/), [BAML](/tools/baml/), [DSPy](/tools/dspy/), or [Agno](/tools/agno/) fit better when orchestration, generated clients, optimization, or agent runtime is the main problem.
>
> **Best plan guidance:** use the free MIT library. Budget for model calls, retries, schema design, evals, and monitoring before shipping.

## Key Facts

| | |
|---|---|
| Core job | Validated structured outputs from LLMs |
| Main pattern | Define a schema/model and receive typed structured data |
| License | MIT |
| Pricing | Free library; model/provider costs separate |
| Best fit | Extraction, classification, enrichment, routing, and tool inputs |
| Main risk | Bad schemas or weak evals make outputs look more reliable than they are |

## When To Pick Instructor

- **You need validated JSON.** Instructor is built for turning model output into structured data that code can trust more easily.
- **You already have app code.** It fits developers adding LLM calls to existing Python or provider-backed systems.
- **You need provider flexibility.** The adapter pattern lets teams keep a similar structured-output workflow across model providers.
- **You want less parsing glue.** It reduces custom JSON repair code, manual regex parsing, and fragile prompt-only contracts.
- **You need typed extraction.** Common jobs include document extraction, support-ticket classification, CRM enrichment, and agent-tool inputs.

## When To Pick Something Else

- **Typed LLM function layer:** [BAML](/tools/baml/) when generated clients, `.baml` function definitions, tests, and robust parsing are the larger workflow.
- **Typed Python agents:** [Pydantic AI](/tools/pydantic-ai/) when agents, dependencies, tools, MCP, evals, and graph workflows matter.
- **Prompt optimization:** [DSPy](/tools/dspy/) when the team has examples and metrics to optimize language-model programs.
- **Eval frameworks:** [DeepEval](/tools/deepeval/) or [Ragas](/tools/ragas/) when validation needs measured regression tests.
- **Gateway or LLMOps:** [LiteLLM](/tools/litellm/) or [Respan](/tools/respan/) when routing, traces, spend, and prompt history are the missing layer.

## Pricing

Instructor was checked on June 28, 2026 against the official docs, GitHub repository, and MIT license.

| Cost line | Public price | Buyer note |
|---|---|---|
| Instructor library | Free, MIT-licensed | Use in application code for structured outputs |
| Model calls | Depends on provider | Retries and validation failures can raise token cost |
| Schema and eval work | Depends on team | The schema needs representative tests before production |
| Observability | Depends on stack | Traces, failures, retry rates, and malformed outputs still need monitoring |

The practical buying advice: Instructor is a narrow, useful engineering tool. It is valuable because it makes the contract between LLM output and app code explicit, not because it removes the need to test the model.

## Failure Modes

- **The schema is not the task.** A valid object can still be wrong.
- **Retries cost money.** Structured-output repair loops can increase token usage.
- **Provider behavior differs.** Function calling, JSON mode, tool schemas, and refusals vary by provider.
- **Weak validation hides errors.** If the model can satisfy the type while missing the meaning, the app can still fail.
- **No hosted governance.** Instructor does not replace traces, eval dashboards, prompt review, or release gates.

## Change History

- **2026-06-28:** Added Instructor after verifying official docs, repository, and MIT license.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against Instructor docs, repository, and license.

## FAQ

**Is Instructor free?**
Yes. Instructor is MIT-licensed open-source software. Model-provider calls, retries, hosting, evals, and observability remain separate costs.

**What is Instructor best for?**
Instructor is best for developers who need validated structured data from LLM outputs, especially extraction, classification, enrichment, and typed tool-input workflows.

**Instructor vs BAML?**
Instructor is a lightweight structured-output library. BAML is a broader typed LLM function layer with generated clients, function definitions, tests, streaming, multimodal support, and Boundary Studio traces.

## Sources

- [Instructor docs](https://python.useinstructor.com/): structured outputs, provider adapter examples, validation, and usage pattern
- [Instructor GitHub repository](https://github.com/567-labs/instructor): project positioning and repository status
- [Instructor license](https://raw.githubusercontent.com/567-labs/instructor/main/LICENSE): MIT license

## Related

- **Category:** [AI Coding](/categories/ai-coding/) · [AI Infrastructure](/categories/ai-infrastructure/)
- **Alternatives:** [BAML](/tools/baml/) · [Pydantic AI](/tools/pydantic-ai/) · [DSPy](/tools/dspy/) · [DeepEval](/tools/deepeval/)
