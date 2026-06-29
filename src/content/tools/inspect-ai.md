---
type: tool
slug: inspect-ai
title: Inspect AI
tagline: MIT-licensed evaluation framework from the UK AI Security Institute and Meridian Labs for coding, agent, reasoning, knowledge, behavior, and multimodal model evals.
category: ai-infrastructure
secondary_categories: [ai-coding, ai-automation]
company: "UK AI Security Institute and Meridian Labs"
url: https://inspect.aisi.org.uk/
github_url: https://github.com/UKGovernmentBEIS/inspect_ai
pricing_model: open-source
price_range: "Free MIT framework; model APIs, compute, sandboxes, and storage billed separately"
status: active
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "Inspect AI Review: Evaluation Framework, Pricing & Alternatives (June 2026)"
meta_description: "Inspect AI review refreshed June 28, 2026: MIT LLM eval framework, 200+ evals, agents, sandboxes, pricing caveats, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use the free MIT Inspect AI framework when evaluation logic needs to live in Python, CLI runs, Inspect View, and sandboxes. Budget separately for model API calls, GPUs, Docker or Kubernetes, storage, and review time."
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
    value: "Teams that need code-defined frontier-model evaluations for coding, agentic tasks, reasoning, knowledge, behavior, and multimodal understanding."
    source: "https://inspect.aisi.org.uk/"
    source_label: "Inspect AI docs"
    source_id: inspect-ai-official
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Inspect AI is MIT licensed open-source software; the framework is free, while model calls, compute, sandbox infrastructure, and storage remain separate costs."
    source: "https://raw.githubusercontent.com/UKGovernmentBEIS/inspect_ai/main/LICENSE"
    source_label: "Inspect AI license"
    source_id: inspect-ai-license
    verified_at: 2026-06-28
    next_review_at: 2026-07-28
    volatility: medium
    confidence: high
  eval_scope:
    value: "The official docs describe composable datasets, agents, tools, and scorers, over 200 pre-built evaluations, Inspect View, a VS Code extension, custom and MCP tools, external coding agents, and sandbox support."
    source: "https://inspect.aisi.org.uk/"
    source_label: "Inspect AI docs"
    source_id: inspect-ai-official
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  eval_listing:
    value: "Inspect AI maintains an official eval listing that loads ready-to-run benchmark implementations from an evals JSON catalog."
    source: "https://inspect.aisi.org.uk/evals/"
    source_label: "Inspect AI evals"
    source_id: inspect-ai-evals-list
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Inspect AI is an evaluation framework, not a managed LLMOps platform; teams still own dataset quality, evaluator calibration, model costs, sandbox operations, and release policy."
    source: "https://inspect.aisi.org.uk/"
    source_label: "Inspect AI docs"
    source_id: inspect-ai-official
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
tags: [llm-evals, ai-evaluation, agent-evals, benchmark, sandboxing, open-source, mit, uk-ai-security-institute]
best_for:
  - AI safety and reliability teams writing repeatable model evaluations
  - developers evaluating coding agents, tool-use agents, and long-horizon tasks
  - teams that need Python, CLI, Inspect View, and sandboxed eval runs
  - labs comparing frontier, local, and API models against reusable benchmark tasks
not_best_for:
  - non-technical teams that want a hosted eval dashboard first
  - buyers that need procurement, SSO, or managed retention out of the box
  - teams without labeled data, target behaviors, or review owners
  - simple prompt regression checks that do not need an eval framework
quick_answer: >-
  Inspect AI is a free MIT-licensed framework for writing and running LLM and agent evaluations. Pick it when engineering or safety teams need code-defined tasks, datasets, scorers, Inspect View, model-provider support, and sandboxed agent runs. Skip it when you need a managed LLMOps platform rather than an evaluation framework.
price_history:
  - date: 2026-06-28
    plan: "Inspect AI framework"
    price: "Free, MIT licensed"
    source: "https://raw.githubusercontent.com/UKGovernmentBEIS/inspect_ai/main/LICENSE"
    source_label: "Inspect AI license"
    source_id: inspect-ai-license
    verified_at: 2026-06-28
    note: "Framework code is free; model APIs, GPUs, storage, sandboxes, CI, and review workflows are separate costs."
---

# Inspect AI

Inspect AI is an open-source evaluation framework from the UK AI Security Institute and Meridian Labs. It is built for teams that need to write, run, inspect, and reuse evaluations for large language models and agentic systems.

The buyer reason to care is evaluation depth. Inspect can represent tasks with datasets, solvers, scorers, tools, agents, sandboxes, and model-provider adapters instead of leaving the team with ad hoc notebooks.

## System Verdict

> **Pick Inspect AI when evals need to be code, not screenshots.** It is strongest for safety, infra, and AI product teams evaluating coding, reasoning, agentic, behavior, knowledge, and multimodal tasks.
>
> **Skip it when the first need is hosted workflow management.** [Braintrust](/tools/braintrust/), [Opik](/tools/opik/), [LangSmith](/tools/langsmith/), [Langfuse](/tools/langfuse/), or [Patronus AI](/tools/patronus-ai/) fit better when teams want hosted datasets, trace retention, review queues, procurement, and governance.
>
> **Best plan guidance:** use the free MIT framework first. Spend the budget on representative datasets, model calls, sandbox infrastructure, evaluator review, and release policy.

## Key Facts

| | |
|---|---|
| Core job | LLM and agent evaluation framework |
| License | MIT |
| Maintainers | UK AI Security Institute and Meridian Labs |
| Eval inventory | Official docs reference 200+ pre-built evaluations |
| Interfaces | Python, CLI, Inspect View, and VS Code extension |
| Main caveat | Framework ownership still sits with the buyer |

## When To Pick Inspect AI

- **You need composable evals.** Inspect’s core model is tasks built from datasets, solvers, tools, agents, and scorers.
- **You are testing agent behavior.** The docs cover built-in agents, multi-agent primitives, custom tools, MCP tools, and external agents such as Claude Code, Codex CLI, and Gemini CLI.
- **You need sandboxed runs.** Inspect supports sandbox systems including Docker, Kubernetes, Modal, Proxmox, and extension-based sandboxes.
- **You want repeatable benchmark work.** The official eval listing points to ready-to-run benchmark implementations rather than only tutorial examples.
- **You want provider flexibility.** The docs describe many model providers plus local inference routes such as Hugging Face, vLLM, and SGLang.

## When To Pick Something Else

- **Managed eval operations:** [Braintrust](/tools/braintrust/) or [Opik](/tools/opik/) when hosted datasets, traces, and review workflows matter more than local framework control.
- **Prompt and release workflows:** [LangSmith](/tools/langsmith/) or [Langfuse](/tools/langfuse/) when prompt management and production traces are already central.
- **Security and red-team testing:** [promptfoo](/tools/promptfoo/) or [Guardrails AI](/tools/guardrails-ai/) when jailbreak, policy, validator, and guardrail testing is the main job.
- **Broad academic benchmarks:** [LM Evaluation Harness](/tools/lm-evaluation-harness/) when the goal is standardized language-model benchmark runs across many tasks.
- **RAG eval metrics:** [Ragas](/tools/ragas/) when retrieval-augmented generation quality is the specific target.

## Pricing

Inspect AI was checked on June 28, 2026 against official docs, the evals listing, GitHub repository, and raw license.

| Cost line | Public price | Buyer note |
|---|---|---|
| Inspect AI framework | Free, MIT licensed | Use for Python and CLI evaluation development |
| Model API calls | Depends on provider | OpenAI, Anthropic, Google, local inference, or other model costs are separate |
| Sandboxes and compute | Depends on deployment | Docker, Kubernetes, Modal, Proxmox, GPUs, or CI infrastructure remain buyer-owned |
| Review workflow | Depends on team | Human grading, evaluator calibration, and release policy are not included |

The practical buying advice: start with one high-risk behavior, one representative dataset, and one release gate. Inspect is powerful, but it will not create the measurement discipline for you.

## Failure Modes

- **Bad evals create false confidence.** Weak datasets or easy scorers can make an unsafe model look ready.
- **Agent sandboxes need operations.** Tool-use and coding-agent evals need isolation, quotas, secrets control, and cleanup.
- **Model-graded scores need calibration.** Judge prompts and graders can drift as models change.
- **It is not a hosted platform.** Inspect View helps inspect runs, but procurement, SSO, retention, and team workflows require separate tooling.
- **Benchmarks can become stale.** Public tasks should be paired with private regression sets tied to the actual product.

## Change History

- **2026-06-28:** Added Inspect AI after verifying official docs, eval listing, repository status, and MIT license.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against Inspect AI docs, eval listing, repository, and license sources.

## FAQ

**Is Inspect AI free?**
Yes. Inspect AI is MIT licensed open-source software. Model calls, compute, sandboxes, storage, CI, and human review remain separate costs.

**What is Inspect AI best for?**
Inspect AI is best for teams that need code-defined LLM, agent, coding, reasoning, behavior, and multimodal evaluations with reusable datasets, solvers, scorers, tools, and sandboxes.

**Inspect AI vs LM Evaluation Harness?**
Inspect AI is stronger for custom, agentic, sandboxed, and safety-oriented evals. LM Evaluation Harness is stronger for standardized language-model benchmark runs and leaderboard-style comparability.

## Sources

- [Inspect AI docs](https://inspect.aisi.org.uk/): framework scope, components, agents, tools, sandboxes, Inspect View, and provider support
- [Inspect AI evals listing](https://inspect.aisi.org.uk/evals/): ready-to-run eval catalog
- [Inspect AI GitHub repository](https://github.com/UKGovernmentBEIS/inspect_ai): repository status
- [Inspect AI license](https://raw.githubusercontent.com/UKGovernmentBEIS/inspect_ai/main/LICENSE): MIT license

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Coding](/categories/ai-coding/) · [AI Automation](/categories/ai-automation/)
- **Alternatives:** [LM Evaluation Harness](/tools/lm-evaluation-harness/) · [Braintrust](/tools/braintrust/) · [Opik](/tools/opik/) · [promptfoo](/tools/promptfoo/)
