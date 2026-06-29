---
type: tool
slug: openai-evals
title: OpenAI Evals
tagline: OpenAI evaluation framework and platform for testing prompts, models, graders, and LLM app regressions, with a scheduled platform shutdown on November 30, 2026.
category: ai-infrastructure
secondary_categories: [ai-coding]
company: OpenAI
url: https://developers.openai.com/api/docs/guides/evals
github_url: https://github.com/openai/evals
pricing_model: paid
price_range: "MIT open-source repo; OpenAI API usage billed separately; platform Evals scheduled to shut down November 30, 2026"
status: active
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "OpenAI Evals Review: Platform Deprecation, Pricing & Alternatives (June 2026)"
meta_description: "OpenAI Evals review refreshed June 28, 2026: eval workflows, graders, legacy repo, API billing, deprecation dates, and migration alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Do not start a new long-term dependency on the OpenAI Evals platform. Use it only for existing OpenAI-hosted eval workflows during the migration window, and move durable test coverage to Promptfoo, Braintrust, Inspect AI, or another maintained eval stack before October 31, 2026."
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 6
  value: 5
  moat: 6
  longevity: 3
facts:
  best_for:
    value: "Existing OpenAI Evals users who need to review, migrate, or temporarily run evals and graders inside OpenAI workflows before the scheduled 2026 shutdown."
    source: "https://developers.openai.com/api/docs/deprecations"
    source_label: "OpenAI API deprecations"
    source_id: openai-evals-deprecations
    verified_at: 2026-06-28
    next_review_at: 2026-10-31
    volatility: high
    confidence: high
  pricing_anchor:
    value: "The open-source OpenAI Evals repository is MIT licensed, while OpenAI API calls used to run evals are billed separately under OpenAI API pricing."
    source: "https://raw.githubusercontent.com/openai/evals/main/LICENSE.md"
    source_label: "OpenAI Evals license"
    source_id: openai-evals-license
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: high
    confidence: high
  eval_scope:
    value: "OpenAI's evals guide covers evaluation workflows for testing and improving model outputs, including datasets, graders, prompt regression checks, bulk experimentation, completion monitoring, fine-tuning, and distillation paths."
    source: "https://developers.openai.com/api/docs/guides/evals"
    source_label: "OpenAI evals guide"
    source_id: openai-evals-docs
    verified_at: 2026-06-28
    next_review_at: 2026-10-31
    volatility: high
    confidence: high
  deprecation_schedule:
    value: "OpenAI's deprecations page says Evals platform deprecation was announced June 3, 2026, existing evals become read-only on October 31, 2026, and the Evals dashboard and API are scheduled to shut down on November 30, 2026."
    source: "https://developers.openai.com/api/docs/deprecations"
    source_label: "OpenAI API deprecations"
    source_id: openai-evals-deprecations
    verified_at: 2026-06-28
    next_review_at: 2026-10-31
    volatility: high
    confidence: high
  watch_out_for:
    value: "OpenAI Evals should be treated as a migration item, not a new durable eval platform, because the hosted Evals dashboard and API have scheduled read-only and shutdown dates."
    source: "https://developers.openai.com/api/docs/deprecations"
    source_label: "OpenAI API deprecations"
    source_id: openai-evals-deprecations
    verified_at: 2026-06-28
    next_review_at: 2026-10-31
    volatility: high
    confidence: high
tags: [openai, evals, llm-evals, graders, prompt-regression, api-billing, migration, legacy]
best_for:
  - existing OpenAI Evals users planning a migration
  - teams reviewing old OpenAI eval assets before shutdown
  - OpenAI API builders who need to understand the current eval and grader guidance
  - teams comparing OpenAI-hosted evals with Promptfoo, Braintrust, Inspect AI, and Opik
not_best_for:
  - new long-term eval platform adoption
  - teams that need durable hosted eval APIs beyond November 30, 2026
  - vendor-neutral evaluation across many model providers
  - buyers that need a managed LLMOps platform with trace retention and review queues
quick_answer: >-
  OpenAI Evals is useful mainly as a migration and OpenAI-workflow reference in June 2026. OpenAI says existing evals become read-only on October 31, 2026 and the Evals dashboard and API shut down on November 30, 2026. New teams should choose a maintained eval stack instead of building around the hosted Evals platform.
price_history:
  - date: 2026-06-28
    plan: "OpenAI Evals open-source repository"
    price: "Free, MIT licensed"
    source: "https://raw.githubusercontent.com/openai/evals/main/LICENSE.md"
    source_label: "OpenAI Evals license"
    source_id: openai-evals-license
    verified_at: 2026-06-28
    note: "Repository code is MIT licensed; OpenAI API usage is separate."
  - date: 2026-06-28
    plan: "OpenAI hosted Evals platform"
    price: "API usage billed separately; platform scheduled to shut down November 30, 2026"
    source: "https://developers.openai.com/api/docs/deprecations"
    source_label: "OpenAI API deprecations"
    source_id: openai-evals-deprecations
    verified_at: 2026-06-28
    note: "Existing evals become read-only on October 31, 2026."
---

# OpenAI Evals

OpenAI Evals covers two related surfaces: the open-source `openai/evals` repository and OpenAI’s hosted Evals platform/docs for testing model and prompt behavior.

The buyer reason to care in June 2026 is migration risk. OpenAI’s own deprecations page says the Evals platform is being deprecated, with existing evals becoming read-only on October 31, 2026 and the dashboard/API scheduled to shut down on November 30, 2026.

## System Verdict

> **Use OpenAI Evals only as a migration bridge.** It is relevant for existing OpenAI-hosted eval users who need to extract, review, or migrate evaluation coverage before the shutdown dates.
>
> **Do not build a new long-term eval stack on hosted OpenAI Evals.** New eval programs should shortlist [promptfoo](/tools/promptfoo/), [Braintrust](/tools/braintrust/), [Inspect AI](/tools/inspect-ai/), [Opik](/tools/opik/), [DeepEval](/tools/deepeval/), or [Ragas](/tools/ragas/) depending on whether the need is security, datasets, code-defined tasks, hosted traces, broad tests, or RAG metrics.
>
> **Best plan guidance:** treat October 31, 2026 as the practical migration deadline. That is when OpenAI says existing evals become read-only.

## Key Facts

| | |
|---|---|
| Core job | OpenAI eval workflows, graders, and legacy eval assets |
| License | MIT for the open-source repository |
| Platform status | Deprecated as of June 3, 2026 announcement |
| Read-only date | October 31, 2026 |
| Shutdown date | November 30, 2026 |
| Main caveat | Not a durable new eval platform |

## When To Pick OpenAI Evals

- **You already use hosted Evals.** The immediate job is inventory, export, and migration before the read-only and shutdown dates.
- **You need OpenAI grader context.** The OpenAI docs remain useful for understanding datasets, graders, prompt regression checks, bulk experiments, completion monitoring, fine-tuning, and distillation workflows.
- **You need to read old eval logic.** The `openai/evals` repository remains useful as a historical registry and framework reference.
- **You want a migration checklist.** The deprecation schedule gives clear dates that can drive engineering and compliance planning.
- **You are comparing alternatives.** It is a useful benchmark for what your next eval platform must replace.

## When To Pick Something Else

- **Local security testing:** [promptfoo](/tools/promptfoo/) when jailbreaks, prompt injection, MCP exposure, and repeatable security tests matter.
- **Hosted release-quality evals:** [Braintrust](/tools/braintrust/) or [Opik](/tools/opik/) when datasets, traces, experiments, scores, and review workflows need a managed home.
- **Code-defined safety evals:** [Inspect AI](/tools/inspect-ai/) when teams want Python tasks, scorers, sandboxes, and agent evals.
- **Code-first LLM tests:** [DeepEval](/tools/deepeval/) when LLM, RAG, agent, safety, and CI tests should live in code.
- **RAG metrics:** [Ragas](/tools/ragas/) when retrieval quality is the main evaluation problem.

## Pricing

OpenAI Evals was checked on June 28, 2026 against OpenAI developer docs, the deprecations page, the `openai/evals` repository, and the raw license.

| Cost line | Public price | Buyer note |
|---|---|---|
| `openai/evals` repository | Free, MIT licensed | Useful for legacy framework and registry context |
| OpenAI hosted Evals | API usage billed separately | Scheduled to become read-only October 31, 2026 and shut down November 30, 2026 |
| Model/API usage | Depends on OpenAI API pricing | Eval runs can consume model tokens and grader calls |
| Migration tooling | Depends on destination | Promptfoo, Braintrust, Inspect AI, Opik, DeepEval, or custom CI may require separate setup |

The practical buying advice: do not optimize for cheap OpenAI Evals usage. Optimize for a clean migration before the platform becomes read-only.

## Failure Modes

- **New dependency risk.** A new OpenAI-hosted Evals build has a short remaining platform runway.
- **Read-only surprise.** Existing evals become read-only before the full shutdown date, so migration should finish before October 31.
- **Token costs can hide.** Model outputs, grader calls, retries, and experiments can all spend API budget.
- **Vendor lock-in.** OpenAI-specific eval workflows may not transfer cleanly to Anthropic, Google, open-weight, or self-hosted model routes.
- **Legacy repo confusion.** The open-source repository can still be useful, but it is not the same thing as a durable hosted Evals product.

## Change History

- **2026-06-28:** Added OpenAI Evals with deprecation schedule, migration guidance, repository status, license, and alternatives.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against OpenAI developer docs, the deprecations page, repository, and license sources.

## FAQ

**Is OpenAI Evals still active?**
It is still relevant for existing users during the migration window, but OpenAI’s deprecations page says hosted Evals becomes read-only on October 31, 2026 and shuts down on November 30, 2026.

**Is the OpenAI Evals repository free?**
Yes. The raw `openai/evals` license is MIT. Running evals can still incur OpenAI API costs.

**What should replace OpenAI Evals?**
Use Promptfoo for security and local evals, Braintrust or Opik for hosted release workflows, Inspect AI for code-defined safety and agent evals, DeepEval for code-first LLM tests, and Ragas for RAG metrics.

## Sources

- [OpenAI evals guide](https://developers.openai.com/api/docs/guides/evals): evaluation workflows, graders, prompts, model experiments, and monitoring context
- [OpenAI API deprecations](https://developers.openai.com/api/docs/deprecations): Evals platform read-only and shutdown dates
- [OpenAI Evals GitHub repository](https://github.com/openai/evals): open-source repository status
- [OpenAI Evals license](https://raw.githubusercontent.com/openai/evals/main/LICENSE.md): MIT license
- [OpenAI API pricing](https://openai.com/api/pricing/): API usage pricing context

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Coding](/categories/ai-coding/)
- **Alternatives:** [promptfoo](/tools/promptfoo/) · [Braintrust](/tools/braintrust/) · [Inspect AI](/tools/inspect-ai/) · [Opik](/tools/opik/)
