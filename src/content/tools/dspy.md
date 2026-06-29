---
type: tool
slug: dspy
title: DSPy
tagline: MIT-licensed framework from Stanford for programming, optimizing, and evaluating language-model systems with signatures, modules, metrics, optimizers, agents, and structured inputs/outputs.
category: ai-coding
secondary_categories: [ai-infrastructure, ai-automation]
company: Stanford Future Data Systems
url: https://dspy.ai
github_url: https://github.com/stanfordnlp/dspy
pricing_model: open-source
price_range: "Free MIT framework; model/provider, data, eval, and hosting costs separate"
status: active
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "DSPy Review: Prompt Optimization, Modules, Metrics & Open-Source Pricing (June 2026)"
meta_description: "DSPy review refreshed June 28, 2026: MIT framework for programming language models, signatures, modules, optimizers, metrics, agents, pricing, license, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use the MIT-licensed DSPy framework when an engineering team has repeatable tasks, metrics, and examples that can improve an LLM program. Budget separately for model calls, optimization runs, data labeling, hosting, and evaluation review."
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 9
  moat: 8
  longevity: 8
facts:
  best_for:
    value: "Developers who want to program language-model systems with structured inputs/outputs, compose tasks into inspectable modules and agents, define metrics, and use optimizers to tune prompts or program behavior."
    source: "https://dspy.ai/getting-started/program-dont-prompt/index.md"
    source_label: "DSPy program, don't prompt guide"
    source_id: dspy-program-dont-prompt
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "DSPy is MIT-licensed open-source software; real costs come from model/provider calls, optimization runs, data, evaluation, and hosting rather than a public DSPy subscription."
    source: "https://github.com/stanfordnlp/dspy/blob/main/LICENSE"
    source_label: "DSPy license"
    source_id: dspy-license
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: medium
    confidence: high
  optimization_model:
    value: "DSPy documentation teaches signatures, modules, Predict, ChainOfThought, ReAct, metrics, and optimizers that tune language-model programs from examples and feedback."
    source: "https://dspy.ai/getting-started/program-dont-prompt/index.md"
    source_label: "DSPy program, don't prompt guide"
    source_id: dspy-program-dont-prompt
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  official_positioning:
    value: "The official site describes DSPy as a framework for programming, rather than prompting, language models."
    source: "https://dspy.ai/"
    source_label: "DSPy official site"
    source_id: dspy-official
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  watch_out_for:
    value: "DSPy needs meaningful metrics, examples, and task definitions; without those, optimization can burn model calls without improving production behavior."
    source: "https://dspy.ai/getting-started/program-dont-prompt/index.md"
    source_label: "DSPy program, don't prompt guide"
    source_id: dspy-program-dont-prompt
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: medium
    confidence: high
tags: [prompt-optimization, llm-programming, signatures, modules, optimizers, metrics, agents, open-source, python]
best_for:
  - developers replacing hand-tuned prompts with measurable LLM programs
  - teams with examples, metrics, and repeated tasks that can be optimized
  - researchers and engineers comparing smaller or cheaper models after optimization
  - AI product teams that want inspectable modules instead of prompt sprawl
not_best_for:
  - non-technical teams that need a hosted app builder
  - teams without evaluation metrics or representative examples
  - buyers expecting optimization to replace human review
  - simple one-off prompt workflows
quick_answer: >-
  DSPy is an MIT-licensed framework for programming and optimizing language-model systems. Pick it when developers can define signatures, modules, metrics, examples, and optimization goals. It is free as a framework, but model calls, optimization runs, data labeling, hosting, and review still cost money.
price_history:
  - date: 2026-06-28
    plan: "DSPy framework"
    price: "Free, MIT-licensed"
    source: "https://github.com/stanfordnlp/dspy/blob/main/LICENSE"
    source_label: "DSPy license"
    source_id: dspy-license
    verified_at: 2026-06-28
    note: "Model/provider usage, data, eval, optimization, and hosting costs remain separate."
---

# DSPy

DSPy is an open-source framework for programming language-model systems instead of hand-prompting them. It gives developers signatures, modules, metrics, and optimizers so an LLM workflow can be defined, measured, and improved with examples.

That makes DSPy useful when a team already knows what good output looks like. It is less useful when the team has no evaluation metric, no examples, and no repeatable task definition.

## System Verdict

> **Pick DSPy when prompt behavior needs optimization, not vibes.** It is strongest for developers who can define structured inputs/outputs, compose modules, write metrics, and run optimizers against real examples.
>
> **Skip it when the buyer needs a managed platform first.** [Braintrust](/tools/braintrust/), [LangSmith](/tools/langsmith/), [LangWatch](/tools/langwatch/), or [Arize Phoenix](/tools/arize-phoenix/) fit better when dashboards, traces, retention, and team workflows are the first missing layer.
>
> **Best plan guidance:** use the free MIT framework when you have enough examples and metrics to justify optimization. Budget for model calls, data work, evaluation runs, and hosting.

## Key Facts

| | |
|---|---|
| Core job | Programming and optimizing language-model systems |
| Main primitives | Signatures, modules, Predict, ChainOfThought, ReAct, metrics, optimizers |
| License | MIT |
| Pricing | Free framework; model/provider and eval costs separate |
| Best input | Repeatable task, examples, metrics, and measurable success criteria |
| Main risk | Weak metrics can optimize the wrong behavior |

## When To Pick DSPy

- **You need prompt optimization.** DSPy is built for improving LLM programs through metrics and optimizers.
- **You have examples.** It works best when teams can provide representative cases and expected behavior.
- **You want inspectable modules.** DSPy programs can be composed from smaller pieces instead of one giant prompt.
- **You want to test smaller models.** Optimization can make cheaper or smaller models more competitive on a narrow task, but only after evaluation.
- **You want code-native LLM behavior.** DSPy fits teams that prefer Python/programmatic control over prompt spreadsheets.

## When To Pick Something Else

- **Typed LLM functions:** [BAML](/tools/baml/) when generated clients, robust parsing, and schema contracts are the main need.
- **Python agents:** [Pydantic AI](/tools/pydantic-ai/) when typed agents, dependencies, tools, MCP, evals, and graph workflows matter more.
- **Eval frameworks:** [DeepEval](/tools/deepeval/) or [Ragas](/tools/ragas/) when metric suites and CI-style evaluations are the immediate layer.
- **Hosted eval operations:** [Braintrust](/tools/braintrust/) or [LangSmith](/tools/langsmith/) when team dashboards, datasets, traces, prompt testing, and retention are required.
- **Open-source LLMOps:** [LangWatch](/tools/langwatch/) when DSPy optimization should sit inside a broader traces, evals, and monitoring surface.

## Pricing

DSPy was checked on June 28, 2026 against official docs, the official site, and the GitHub license.

| Cost line | Public price | Buyer note |
|---|---|---|
| DSPy framework | Free, MIT-licensed | Use as a code framework for modules, metrics, and optimization |
| Model calls | Depends on provider | Optimization can make many calls while searching for better behavior |
| Data and labels | Depends on team | Representative examples and review often matter more than framework setup |
| Hosting and evaluation | Depends on stack | Production service, logs, metrics, and regression checks remain buyer-owned |

The practical buying advice: DSPy is valuable when the task is repeatable and measurable. Without a metric, it can make the wrong thing faster and more confidently.

## Failure Modes

- **Bad metrics produce bad optimization.** Optimizers follow the signal you give them.
- **Small datasets can mislead.** A handful of examples may overfit or miss real user failure modes.
- **Optimization spends tokens.** Repeated candidate runs, judge calls, and experiments need budget limits.
- **It is not hosted governance.** DSPy does not replace trace retention, RBAC, release reviews, or production monitoring.
- **Human review still matters.** A tuned LLM program can still produce false, unsafe, or brittle outputs.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against DSPy official, getting-started docs, and GitHub license.

## FAQ

**Is DSPy free?**
Yes. DSPy is MIT-licensed open-source software. Model/provider usage, optimization runs, data work, hosting, and evaluation review are separate costs.

**What is DSPy best for?**
DSPy is best for developer teams that have repeatable LLM tasks, examples, and metrics, and want to optimize behavior rather than manually rewrite prompts.

**DSPy vs LangWatch?**
DSPy is the framework for programming and optimizing LLM behavior. LangWatch is an LLMOps platform that includes traces, evals, datasets, monitoring, and DSPy optimization workflows.

## Sources

- [DSPy official site](https://dspy.ai/): framework positioning
- [DSPy program, don't prompt guide](https://dspy.ai/getting-started/program-dont-prompt/index.md): signatures, modules, metrics, optimizers, and program composition
- [DSPy license](https://github.com/stanfordnlp/dspy/blob/main/LICENSE): MIT license

## Related

- **Category:** [AI Coding](/categories/ai-coding/) · [AI Infrastructure](/categories/ai-infrastructure/) · [AI Automation](/categories/ai-automation/)
- **Alternatives:** [BAML](/tools/baml/) · [Pydantic AI](/tools/pydantic-ai/) · [DeepEval](/tools/deepeval/) · [LangWatch](/tools/langwatch/)
