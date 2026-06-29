---
type: category
slug: ai-infrastructure
title: AI Infrastructure & Model APIs
description: Developer platforms for LLM routing, pay-as-you-go model APIs, hosted inference, serverless GPUs, vector databases, speech APIs, agent memory, evals, fine-tuning, gateways, structured outputs, and production retrieval systems.
tool_count: 33
seo_title: "Best AI Infrastructure & Model API Tools (June 2026)"
meta_description: "Updated June 28, 2026: compare OpenRouter, OpenAI API, Claude API, Gemini API, Mistral, Groq, Replicate, Modal, Browserbase, Firecrawl, Composio, LiteLLM, Respan, OpenLIT, Opik, Inspect AI, Guardrails AI, LM Evaluation Harness, OpenAI Evals, LlamaIndex, Haystack, Agno, Instructor, Chainlit, LangSmith, Braintrust, Patronus AI, DeepEval, Traceloop, Arize Phoenix, Ragas, OpenPipe, LangWatch, BAML, DSPy, Portkey, Zep, promptfoo, Mem0, Tavily, Deepgram, vector databases, and governance tradeoffs."
author: "aipedia.wiki Editorial"
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: weekly
top_picks:
  best_overall:
    tool: openrouter
    label: "Best model router"
  budget:
    tool: mistral-ai
    label: "Best cost-control shortlist"
  pro_team:
    tool: replicate
    label: "Best hosted model catalog"
decision_picks:
  - tool: lm-studio
    label: Best local or open-model starter
    reason: LM Studio is the cleanest first stop when the buyer wants local model testing, a desktop workflow, and an OpenAI-compatible local API before choosing hosted inference.
    plan: Free local app
    source_refs:
      - lm-studio-openai-compat-docs
    verified_at: 2026-06-22
    confidence: high
  - tool: firecrawl
    label: Best web data API for agents
    reason: Firecrawl is the better shortlist when a product needs search, scrape, crawl, structured extraction, screenshots, and LLM-ready markdown rather than full browser-session ownership.
    plan: Free for testing, then paid credits after endpoint modeling
    source_refs:
      - firecrawl-pricing
      - firecrawl-docs
    verified_at: 2026-06-28
    confidence: high
  - tool: composio
    label: Best tool and auth layer for agents
    reason: Composio fits AI products that need app toolkits, managed user authentication, session tools, and hosted MCP access without building every connector internally.
    plan: Free for prototypes, $29 plan for production tests
    source_refs:
      - composio-pricing
      - composio-auth-docs
    verified_at: 2026-06-28
    confidence: high
  - tool: litellm
    label: Best open-source LLM gateway
    reason: LiteLLM is the better shortlist when teams need one OpenAI-compatible interface across 100+ providers, with routing, virtual keys, spend tracking, guardrails, MCP, and enterprise gateway controls.
    plan: Open-source proxy first, Enterprise when SSO, audit logs, support, or multi-team governance matter
    source_refs:
      - litellm-docs
      - litellm-enterprise
      - litellm-license
    verified_at: 2026-06-28
    confidence: high
  - tool: llamaindex
    label: Best framework for agents over data
    reason: LlamaIndex fits teams building RAG, context augmentation, workflows, and agents over private or domain-specific data, with a managed LlamaCloud/LlamaParse route when parsing and retrieval should be outsourced.
    plan: MIT framework first, LlamaParse or LlamaCloud after document-processing volume is modeled
    source_refs:
      - llamaindex-framework-docs
      - llamaindex-pricing
      - llamaindex-license
    verified_at: 2026-06-28
    confidence: high
  - tool: haystack
    label: Best open-source RAG pipeline framework
    reason: Haystack is the better shortlist when developers want Apache-2.0 components, pipelines, document stores, agents, tools, and retrieval systems with an optional deepset managed-platform route.
    plan: Free Haystack framework first, deepset AI Platform when managed deployment and support matter
    source_refs:
      - haystack-docs
      - deepset-pricing
      - haystack-license
    verified_at: 2026-06-28
    confidence: high
  - tool: langsmith
    label: Best LangChain-native observability layer
    reason: LangSmith is the better shortlist when LangChain or LangGraph teams need hosted traces, evals, prompt workflows, monitoring, deployment, sandboxes, Fleet, and Engine controls in one platform.
    plan: Developer for solo tracing, Plus for teams, Enterprise for self-hosted or hybrid needs
    source_refs:
      - langsmith-observability
      - langsmith-pricing
      - langsmith-usage-billing
    verified_at: 2026-06-28
    confidence: high
  - tool: braintrust
    label: Best evals-first release control
    reason: Braintrust is the better shortlist when teams need datasets, experiments, traces, scores, prompt testing, monitoring, and human review tied to release decisions.
    plan: Starter for prototypes, Pro for shared AI teams
    source_refs:
      - braintrust-pricing
      - braintrust-docs
    verified_at: 2026-06-28
    confidence: high
  - tool: arize-phoenix
    label: Best open-source AI observability platform
    reason: Arize Phoenix is the better shortlist when OpenTelemetry traces, evals, prompt iteration, datasets, and experiments need to sit close to engineering workflows.
    plan: Phoenix self-hosted for validation, AX Pro for hosted small-team usage
    source_refs:
      - arize-phoenix-docs
      - arize-pricing
      - arize-phoenix-license
    verified_at: 2026-06-28
    confidence: high
  - tool: openlit
    label: Best OpenTelemetry-first LLM observability stack
    reason: OpenLIT is the better shortlist when engineers want Apache-2.0 self-hosted traces, metrics, token and cost tracking, prompt workflows, evals, dashboards, GPU monitoring, and OpenTelemetry alignment.
    plan: Free self-hosted edition until managed cloud pricing is public
    source_refs:
      - openlit-pricing
      - openlit-docs
      - openlit-license
    verified_at: 2026-06-28
    confidence: high
  - tool: opik
    label: Best OSS-to-hosted agent eval platform
    reason: Opik fits teams that want open-source or hosted agent traces, Test Suites, assertions, LLM-as-judge metrics, annotation, production monitoring, and Comet-hosted span retention.
    plan: Opik OSS or Free Cloud first, Pro Cloud at $19/month when spans or team needs grow
    source_refs:
      - opik-pricing
      - opik-tracing-docs
      - opik-evaluation-docs
    verified_at: 2026-06-28
    confidence: high
  - tool: inspect-ai
    label: Best custom agent and safety eval framework
    reason: Inspect AI fits teams that need code-defined evaluations for coding, agentic tasks, reasoning, knowledge, behavior, multimodal understanding, tools, scorers, and sandboxed runs.
    plan: Free MIT framework, with model calls, compute, sandboxes, storage, and review time separate
    source_refs:
      - inspect-ai-official
      - inspect-ai-evals-list
      - inspect-ai-license
    verified_at: 2026-06-28
    confidence: high
  - tool: guardrails-ai
    label: Best runtime validation guardrails
    reason: Guardrails AI fits teams that need reusable validators, input and output guards, Pydantic-style structured data, on-fail policies, and Guardrails Hub installs around LLM apps.
    plan: Free Apache-2.0 framework, with hosted or remote-validator pricing confirmed directly
    source_refs:
      - guardrails-ai-docs
      - guardrails-ai-validators
      - guardrails-ai-license
    verified_at: 2026-06-28
    confidence: high
  - tool: lm-evaluation-harness
    label: Best standardized benchmark harness
    reason: LM Evaluation Harness fits model teams that need reproducible academic and leaderboard-style benchmark runs across local models, hosted APIs, vLLM, SGLang, Hugging Face, and other backends.
    plan: Free MIT framework, with GPU, API, backend, storage, and review costs separate
    source_refs:
      - lm-evaluation-harness-readme
      - lm-evaluation-harness-license
    verified_at: 2026-06-28
    confidence: high
  - tool: ragas
    label: Best code-first RAG evaluation framework
    reason: Ragas fits developer teams that want open-source metrics, synthetic test data, experiments, and cost-aware eval loops in code rather than a hosted dashboard first.
    plan: Free Apache-2.0 framework, with evaluator model costs modeled separately
    source_refs:
      - ragas-docs
      - ragas-metrics
      - ragas-cost-analysis
    verified_at: 2026-06-28
    confidence: high
  - tool: openpipe
    label: Best fine-tuning workflow for cheaper specialized models
    reason: OpenPipe is the better shortlist when production request logs can become datasets, fine-tunes, DPO runs, evaluations, and hosted inference for cost or latency reduction.
    plan: Usage-based hosted inference after a baseline eval
    source_refs:
      - openpipe-docs
      - openpipe-pricing
    verified_at: 2026-06-28
    confidence: high
  - tool: langwatch
    label: Best open-source LLMOps platform
    reason: LangWatch fits teams that want traces, evaluations, datasets, AI gateway workflows, DSPy optimization, self-hosting, and monitoring in one open-source LLMOps surface.
    plan: Developer for early checks, Growth for paid capacity, Enterprise for governed rollout
    source_refs:
      - langwatch-docs
      - langwatch-pricing
      - langwatch-license
    verified_at: 2026-06-28
    confidence: high
  - tool: respan
    label: Best combined LLMOps and gateway challenger
    reason: Respan is the better shortlist when a team wants traces, metrics, evals, prompt management, monitors, spend limits, and an OpenAI-compatible gateway tied to the same production traffic.
    plan: Free for instrumentation checks, Team after shared workflow fit is proven, Enterprise for compliance or custom support
    source_refs:
      - respan-pricing
      - respan-gateway-docs
      - respan-evals-docs
    verified_at: 2026-06-28
    confidence: high
  - tool: patronus-ai
    label: Best enterprise AI reliability lab
    reason: Patronus AI fits teams that need managed evals, traces, datasets, guardrails, Percival-assisted eval creation, and current Digital World Model research around agent simulation.
    plan: Developer for testing, Enterprise for production reliability controls
    source_refs:
      - patronus-pricing
      - patronus-docs
      - patronus-dwm-announcement
    verified_at: 2026-06-28
    confidence: high
  - tool: deepeval
    label: Best open-source LLM evaluation framework
    reason: DeepEval is the better shortlist when developer-owned LLM, RAG, agent, chatbot, image, safety, and CI evals should live in code before a hosted quality platform is added.
    plan: DeepEval open source first, Confident AI when hosted team workflows matter
    source_refs:
      - deepeval-metrics
      - confident-ai-pricing
      - deepeval-license
    verified_at: 2026-06-28
    confidence: high
  - tool: traceloop
    label: Best OpenTelemetry LLM observability layer
    reason: Traceloop fits teams that want OpenLLMetry, OpenTelemetry traces, quality checks, prompt changes, real-time alerts, and a ServiceNow AI Control Tower path around agent runtime evidence.
    plan: Free Forever for 50K-span testing, Enterprise for production scale
    source_refs:
      - traceloop-docs
      - traceloop-pricing
      - traceloop-servicenow
    verified_at: 2026-06-28
    confidence: high
  - tool: portkey
    label: Best LLM gateway governance layer
    reason: Portkey fits production AI teams that need routing, observability, prompt management, guardrails, API key control, budgets, caching, and enterprise gateway policy.
    plan: Production for live apps, Enterprise for private hosting and compliance
    source_refs:
      - portkey-pricing
      - portkey-docs
    verified_at: 2026-06-28
    confidence: high
  - tool: promptfoo
    label: Best red-team and eval harness
    reason: promptfoo is the sharper first stop when the infrastructure risk is jailbreak testing, vulnerability scanning, guardrails, model security, MCP exposure, or repeatable local evals.
    plan: Community for local tests, Enterprise for shared security workflows
    source_refs:
      - promptfoo-pricing
      - promptfoo-docs
      - openai-promptfoo-acquisition
    verified_at: 2026-06-28
    confidence: high
---

## Quick Decision

AI infrastructure tools sit underneath the apps people see. They route model calls, host open models, run GPU workloads, store embeddings, power RAG, transcribe audio, generate media, and help teams compare cost, latency, quality, and control without rebuilding the stack every month.

This category is for developer and platform buyers. If the user is choosing a chatbot, start with [AI Chatbots](/categories/ai-chatbots/). If the team is shipping an AI product, agent, retrieval layer, or model-backed workflow, this is the better lane.

The late-May infrastructure update is agent control. CoreWeave's [training-to-inference loop](/news/2026-05-30-coreweave-agent-improvement-loop/) pushes traces, evals, RL, inference, and W&B tooling into one reliability story. OpenAI's [Rosalind Biodefense trusted-access expansion](/news/2026-05-31-openai-rosalind-biodefense-trusted-access/) shows that specialist frontier models may ship as gated capability programs. Sysdig's [LLM-agent intrusion report](/news/2026-05-31-sysdig-llm-agent-intrusion-agent-security/) makes runtime telemetry and least-privilege design part of infrastructure buying, not only security cleanup.

The June 3 update widens that control story. Microsoft Build put Work IQ and Foundry around enterprise agents; GitHub made the Copilot SDK generally available while AI Credits became the agent-usage meter; NVIDIA pushed enterprise agents, Cosmos 3, open physical-AI agent skills, Alpamayo 2 Super, RTX Spark, and DGX Station for Windows; Postman launched AI Engineer for API work; RelationalAI moved agentic decision intelligence deeper into Snowflake; 7AI kept security agents in the proactive-hunting lane; and the White House AI cybersecurity order put advanced AI cyber capability into public-sector and critical-infrastructure policy. Infrastructure buyers should evaluate agent stacks by context access, runtime isolation, traces, evals, spend controls, simulation/data pipelines, local-vs-cloud compute, and write-action approvals.

The June 24 update keeps model availability as a first-class infrastructure risk. Claude Fable/Mythos access is still not a normal public self-serve buyer route, GPT-5.2 is retired from ChatGPT, and OpenAI faces reported state-AG scrutiny. Direct frontier API buyers should now document the exact model route in production, the fallback route if a model is suspended, account-specific, preview-only, or retired, the retention policy for that model class, the staff/client access exposure for restricted routes, and the legal/privacy review path for sensitive users. The [AI Model Availability & Churn Tracker](/trends/model-availability-churn/) is now the canonical AiPedia surface for these app/API/router distinctions.

The June 16 infrastructure update is governed data agents. Google Cloud's [data-agent rollout](/news/2026-06-16-google-cloud-data-agents/) puts Conversational Analytics, Data Engineering Agent, Looker agents, Gemini Enterprise data access, Data Agent Kit, Managed MCP Servers for Databases, and QueryData into the infrastructure buying conversation. Data Engineering Agent and Managed MCP Servers for Databases are GA, while many of the more ambitious analytics, Looker, Gemini Enterprise, and commerce routes remain preview. Infrastructure teams should evaluate these by IAM scope, `roles/mcp.toolUser`, service permissions, separate production identities, SQL verification, BigQuery spend limits, job labels, audit logging, Model Armor payload logging, and GA-versus-preview fallback plans.

**Use [OpenRouter](/tools/openrouter/) when you need one API across many model providers.** The current pricing page lists pay-as-you-go access to 400+ models and 60+ providers, with budget controls, activity logs, prompt caching, preferred vendor selections, and model-priced token billing. Its [May 27 funding signal](/news/2026-05-27-openrouter-series-b-model-routing/) makes the category clearer: routing, fallback, governance, and spend visibility are becoming production infrastructure, not just developer convenience.

**Use direct vendor APIs when native features matter.** [OpenAI API](/tools/chatgpt/) is the default direct route for broad multimodal app work. [Claude API](/tools/claude/) is the direct route for long reasoning, writing, code, and document workflows. [Gemini API](/tools/gemini/) matters when Google Cloud, long context, multimodal inputs, or Veo video generation are part of the product. The June 22 Gemini recheck keeps Gemini 3.5 Flash pricing mode-specific: standard, batch/flex, priority, grounding, tools, and media rows need separate cost modeling.

**Use [Mistral AI](/tools/mistral-ai/) or [Groq](/tools/groq/) when price/performance, open-model strategy, European infrastructure, or low-latency inference matters.** The June 24 Groq check adds Qwen 3.6 27B, Kimi K2 0905 prompt-caching pricing, and built-in-tool costs to the hosted-inference buyer math. The June 24 Mistral check keeps the timeline and cost model honest: Mistral 3 officially launched on December 2, 2025, while Medium 3.5's model-card date is April 28, 2026. Current Mistral pricing lists Large 3 at $0.50/M input and $1.50/M output, Medium 3.5 at $1.50/M and $7.50/M, and Small 4 at $0.10/M and $0.30/M, but the Small 4 model card still lists $0.15/M and $0.60/M, and the pricing FAQ still uses a generic Mistral Large $2/$6 example. Benchmark real prompts, confirm the live Studio quote, and pin exact model IDs before switching because model quality, output length, retries, aliases, and source drift change the bill.

**Use [Replicate](/tools/replicate/) or [fal.ai](/tools/fal-ai/) when the job is hosted image, video, audio, 3D, or custom-model inference.** The June 9 Replicate check keeps it strongest as a broad model catalog and custom-model deployment layer: public models may bill by hardware time or by input/output, while most private deployments bill setup, idle, and active time unless they are labeled fast-booting fine-tunes. fal is stronger when successful-output billing and fast media APIs are the buyer problem; the June 2 check keeps prepaid credits, queue behavior, failed-output billing, and the 50% batch discount as the key pricing details to model.

**Use [Fireworks AI](/tools/fireworks-ai/) when the workload is production inference over open or commercial models.** Fireworks is not a consumer chatbot. It belongs here when serverless per-token inference, cached-token discounts, batch jobs, dedicated GPU deployments, fine-tuning, and B200/B300 capacity are the actual purchase.

**Use [Browserbase](/tools/browserbase/) when the infrastructure problem is web interaction.** The June 18 pricing check keeps Free, Developer at $20/month, Startup at $99/month, and Scale custom, while the product surface now groups real cloud Chromium browsers, Web Data APIs, Functions Runtime, Identity, Model Gateway, Observability, Stagehand, and MCP. It belongs here when agents need reliable browser sessions, Fetch/Extract, replay, and model routing rather than just another LLM API.

**Use [Firecrawl](/tools/firecrawl/) when the infrastructure problem is web data for agents.** The June 28 check adds it as the cleaned-content counterpart to Browserbase: search, scrape, crawl, structured extraction, screenshots, Interact, and LLM-ready markdown in one credit-based API. Model the exact endpoint mix before buying because crawls, screenshots, browser minutes, and retries can change the bill quickly.

**Use [Composio](/tools/composio/) when agents need app actions and user-scoped auth.** The June 28 check keeps it in the tool-calling infrastructure lane: 1000+ app toolkits, managed authentication, native session tools, hosted MCP URLs, and usage-based tool-call pricing. It is a developer tool layer, not a no-code workflow canvas.

**Use [LiteLLM](/tools/litellm/) when LLM traffic needs an open-source gateway.** The June 28 check adds LiteLLM as the self-hosted SDK/proxy lane for one OpenAI-compatible interface across 100+ providers, with routing, virtual keys, spend tracking, budgets, guardrails, observability, MCP, and Enterprise controls such as SSO/SAML and audit logs. It is not a model-discount plan: model/provider bills, gateway latency, logs, fallback quality, and enterprise-directory licensing still need review.

**Use [LangSmith](/tools/langsmith/) when agent observability, evals, and deployment control need a LangChain-native home.** The June 28 check keeps Developer at $0/seat/month, Plus at $39/seat/month, and Enterprise custom, but the buyer risk is broader than seats: traces, extended retention, deployment runs, deployment uptime, Fleet, Engine, sandboxes, and outside model/API spend all need usage limits.

**Use [Braintrust](/tools/braintrust/) when the infrastructure problem is eval discipline.** Braintrust belongs here when datasets, experiments, prompt comparisons, traces, scores, monitoring, and human review need to decide whether a model, prompt, retrieval, or agent change is safe to ship. Starter is useful for prototypes; Pro at $249/month is the first serious shared-team tier, but usage meters still matter.

**Use [Arize Phoenix](/tools/arize-phoenix/) when the infrastructure problem is OpenTelemetry-native AI observability.** Phoenix belongs here for teams that need traces, evals, prompt iteration, datasets, and experiments tied to LLM app behavior. Self-hosted Phoenix is the open-source path; AX Pro at $50/month is the hosted small-team route, but span volume and Elastic License 2.0 limits need review.

**Use [OpenLIT](/tools/openlit/) when OpenTelemetry alignment is the first requirement.** The June 28 check adds OpenLIT as the Apache-2.0 self-hosted route for LLM traces, metrics, logs, token and cost tracking, prompt workflows, evals, dashboards, vector database monitoring, and GPU monitoring. The self-hosted product is listed at $0 forever, while OpenLIT Cloud is coming soon with no public price verified.

**Use [Opik](/tools/opik/) when agent traces and evals need an OSS-to-hosted path.** Opik belongs here when teams want trace debugging, Test Suites, assertions, LLM-as-judge metrics, production monitoring, annotation queues, and Comet-hosted retention. Start with OSS or Free Cloud, then model Pro Cloud at $19/month plus span and retention meters before rollout.

**Use [Inspect AI](/tools/inspect-ai/) when evals need to be code-defined and sandboxed.** The June 28 check adds Inspect AI as the MIT-licensed UK AI Security Institute and Meridian Labs framework for coding, agentic, reasoning, knowledge, behavior, and multimodal evals. It supports datasets, agents, tools, scorers, Inspect View, a VS Code extension, external agents, MCP or custom tools, and sandbox routes. It is free software, but model calls, compute, sandboxes, storage, and review time still need budgets.

**Use [Guardrails AI](/tools/guardrails-ai/) when LLM outputs need runtime validation before downstream systems trust them.** Guardrails adds reusable validators, Guards, input/output checks, Pydantic-style structured data, on-fail policies, and Guardrails Hub installs around app code. The Apache-2.0 framework is the validated route; public hosted or remote-validator pricing was not verified in the June 28 check.

**Use [LM Evaluation Harness](/tools/lm-evaluation-harness/) when benchmark comparability matters.** EleutherAI's MIT framework is the standard-benchmark lane for 60+ academic benchmarks, hundreds of task variants, custom prompts and metrics, and backend routes across Hugging Face, vLLM, API models, OpenAI-compatible local servers, SGLang, OpenVINO, NeMo, Megatron-LM, and more. Pair it with private product evals before making release decisions.

**Use [OpenAI Evals](/tools/openai-evals/) only as a migration bridge.** OpenAI's deprecations page says Evals platform deprecation was announced June 3, 2026, existing evals become read-only on October 31, 2026, and the dashboard/API are scheduled to shut down on November 30, 2026. Existing users should inventory, export, or migrate eval coverage; new teams should choose a maintained eval stack instead.

**Use [LangWatch](/tools/langwatch/) when the team wants open-source LLMOps with traces and evals.** LangWatch sits between local eval frameworks and managed observability products: traces, evaluations, datasets, AI gateway workflows, DSPy optimization, self-hosting, and event-sourcing operations. Paid plans start from EUR59/month, but event and retention meters decide real cost.

**Use [Respan](/tools/respan/) when LLMOps and gateway routing should share one traffic history.** The June 28 check adds Respan as the active Keywords AI successor surface: traces, metrics, evals, prompt management, monitors, spend limits, and an OpenAI-compatible gateway sit in one product lane. Free is the first instrumentation route, Team is the shared paid route, and Enterprise is custom. Confirm the live Team base price, retention, data-handling terms, gateway latency, and provider bills before standardizing.

**Use [Patronus AI](/tools/patronus-ai/) when AI reliability needs managed evals plus frontier simulation research.** Patronus covers evaluators, experiments, datasets, comparisons, traces, prompts, annotations, guardrails, and Percival-assisted eval creation, while its current company positioning also highlights Digital World Models for simulating agent actions in digital workflows. Confirm whether procurement is buying eval operations, Digital World Model access, or services.

**Use [DeepEval](/tools/deepeval/) when LLM evaluation should live in code.** DeepEval is the open-source framework lane for 50+ metrics, RAG evals, agent evals, chatbot tests, safety checks, tracing, and CI gates. Confident AI is the hosted platform route when teams need shared evaluation, observability, red teaming, governance, and security controls.

**Use [Traceloop](/tools/traceloop/) when OpenTelemetry alignment is the observability requirement.** Traceloop and OpenLLMetry instrument LLM apps with OpenTelemetry traces, quality checks, alerts, prompt and model change testing, and IDE reruns. The ServiceNow acquisition path can help enterprise buyers, but roadmap and procurement details need live confirmation.

**Use [Ragas](/tools/ragas/) when RAG and LLM evaluation should live in code.** Ragas is the open-source framework lane for metrics, synthetic test data, experiments, and cost-aware evaluation loops. It is free as a framework, but evaluator model calls, embeddings, generated test data, and human review still need a budget.

**Use [OpenPipe](/tools/openpipe/) when fine-tuning can lower cost or latency.** OpenPipe belongs here when production logs can become datasets, fine-tuned models, DPO runs, evaluations, and hosted inference. Start only after the team has enough clean examples and baseline evals to prove a specialized model beats prompt-only changes.

**Use [Portkey](/tools/portkey/) when LLM traffic needs a gateway control plane.** Portkey sits in front of model calls for routing, key management, observability, prompts, guardrails, governance, caching, and analytics. The Developer plan is explicitly not the production path; Production and Enterprise should be modeled around recorded logs, retention, overages, private hosting, compliance, and provider spend.

**Use [Zep](/tools/zep/) when the infrastructure problem is production agent memory.** Zep is the context-engineering lane for temporal context graphs, persistent user/session memory, and managed deployment options. It belongs beside [Mem0](/tools/mem0/) and vector databases, but buyers should decide whether they need memory extraction and graph context or only document retrieval.

**Use [promptfoo](/tools/promptfoo/) when AI security testing is part of the infrastructure gate.** promptfoo is now positioned around open-source evals, red teaming, guardrails, model security, MCP proxy checks, code scanning, and enterprise/on-premise testing workflows. OpenAI announced a March 2026 acquisition agreement, and promptfoo says it is now part of OpenAI, so procurement should verify contract and data-handling paths.

**Use [Mem0](/tools/mem0/) when the infrastructure problem is agent memory.** Mem0 belongs beside vector databases and agent runtimes when an app needs persistent, scoped memories across users, sessions, and agents. The managed Platform is the faster route; the Apache-2.0 open-source route shifts vector database, model, embedder, hosting, deletion, and privacy controls back to the team.

**Use [Tavily](/tools/tavily/) when agents need real-time web search and extraction as an API.** Tavily is closer to a search, extract, crawl, map, and research primitive than a browser infrastructure layer. Model basic versus advanced search, extract batches, mapping, crawl size, research mode, retries, and agent-loop behavior before production.

**Use [LlamaIndex](/tools/llamaindex/) when agents need structured context over private data.** The June 28 check adds it as the framework lane for RAG, context augmentation, data connectors, indexes, retrieval, workflows, and agents over domain-specific data. The framework is MIT-licensed, but LlamaParse/LlamaCloud credits, model calls, embeddings, vector storage, ingestion jobs, and evals still need separate budgets.

**Use [Haystack](/tools/haystack/) when RAG and agent apps should be built as open-source pipelines.** Haystack belongs here for Apache-2.0 components, pipelines, document stores, tools, agents, multimodal search, and reusable LLM app architecture. deepset AI Platform is the managed route when deployment, governance, testing, support, security, or dedicated resources matter.

**Use [DSPy](/tools/dspy/) when prompt behavior needs measurable optimization.** DSPy is a coding-first framework, but it belongs in infrastructure shortlists when an LLM system needs signatures, modules, metrics, optimizers, and examples instead of hand-tuned prompt sprawl. Budget for model calls and data work before assuming optimization will lower costs.

**Use [Agno](/tools/agno/) when agents need an owned AgentOS-style runtime.** Agno is primarily an automation and agent-platform framework, but it belongs in infrastructure shortlists when teams need agents, teams, workflows, memory, knowledge, storage, traces, audit logs, interfaces, and control-plane management in their own stack. Free open source is the first route; Pro is $150/month for a live AgentOS control plane; Enterprise is custom.

**Use [Instructor](/tools/instructor/) when structured LLM outputs are the infrastructure boundary.** Instructor is the MIT-licensed library lane for validated JSON, Pydantic-style schemas, retries, and provider adapters. It is useful when extraction, classification, enrichment, or tool arguments need typed outputs, but it still needs evals, retry budgets, and monitoring.

**Use [Chainlit](/tools/chainlit/) when a Python LLM workflow needs a quick conversational interface.** Chainlit is an Apache-2.0 framework for prototypes, internal chat tools, and demos around RAG or agent workflows. Treat it as a UI framework, not a managed chatbot platform, and verify maintainer/support route, auth, persistence, hosting, and observability before production use.

**Use [Deepgram](/tools/deepgram/) when speech is infrastructure.** Deepgram is a better fit for product teams adding STT, TTS, audio intelligence, or voice agents than for creators who only need a one-off transcript.

**Use [Hugging Face](/tools/hugging-face/) when model discovery, model cards, datasets, Spaces, and managed endpoints need to live in one open-AI collaboration surface.** The June 23 pricing check keeps Pro at $9/month, Team at $20/user/month, Enterprise from $50/user/month, storage at $12/TB public and $18/TB private before volume discounts, ZeroGPU on RTX Pro 6000 Blackwell, and Inference Endpoints starting around low hourly CPU pricing.

## Buyer Paths

| Buyer job | Start with | Why | Watch out |
|---|---|---|---|
| Multi-model LLM routing | [OpenRouter](/tools/openrouter/) | One API, many providers, spend controls, logs, routing | Router fees and provider policy choices still need governance |
| Direct frontier LLM API | [OpenAI](/tools/chatgpt/), [Claude](/tools/claude/), or [Gemini](/tools/gemini/) | Best when native model features, support, and procurement matter | Model access, retirements, legal/data governance, long context, outputs, tools, and video can change cost and risk quickly |
| Budget/open-model API | [Mistral AI](/tools/mistral-ai/) or [Groq](/tools/groq/) | Useful for cost-sensitive, latency-sensitive, and sovereignty-sensitive workloads | Requires benchmarking against your actual prompts, exact model IDs, and current model-card/pricing-page drift |
| Hosted model catalog | [Replicate](/tools/replicate/) | Public, proprietary, and custom models without owning GPUs | Hardware-time, output-priced media, and private-model idle billing need separate cost modeling |
| Fast media APIs | [fal.ai](/tools/fal-ai/) | Image, video, audio, and 3D APIs with per-output or per-second pricing | Prepaid credits and per-model units need tracking |
| Production model inference | [Fireworks AI](/tools/fireworks-ai/) | Serverless inference, batch jobs, dedicated GPUs, fine-tuning, and cached-token discounts | Named model rates, GPU utilization, batch timing, and cached-token behavior decide the real bill |
| Serverless Python/GPU apps | [Modal](/tools/modal/) | Python jobs, web endpoints, queues, sandboxes, and per-second GPU billing without Kubernetes | Region selection, non-preemptible execution, and steady 24/7 GPU load can change the economics |
| Cloud browser infrastructure | [Browserbase](/tools/browserbase/) | Managed Chromium sessions, web data APIs, Functions runtime, identity, Model Gateway, observability, Stagehand, and MCP | Browser sessions, Fetch/Extract calls, proxy bandwidth, model tokens, and agent loops need cost, timeout, and credential controls |
| Web data for agents | [Firecrawl](/tools/firecrawl/) | Search, scrape, crawl, screenshots, Interact, and LLM-ready extraction in one API | Endpoint mix, crawl depth, screenshots, browser minutes, robots, terms, and retry behavior decide production fit |
| Agent tool/auth layer | [Composio](/tools/composio/) | 1000+ app toolkits, user-scoped auth, session tools, and hosted MCP access for agent products | Tool-call volume, OAuth scopes, write-action approvals, and multi-tenant identity separation need controls |
| Open-source LLM gateway | [LiteLLM](/tools/litellm/) | One OpenAI-compatible interface across 100+ providers, with proxy routing, virtual keys, spend tracking, guardrails, MCP, and enterprise controls | Gateway latency, log retention, fallback quality, enterprise-directory licensing, and model-provider bills need review |
| LLMOps plus gateway control | [Respan](/tools/respan/) | Traces, metrics, evals, prompt management, monitors, spend limits, and an OpenAI-compatible gateway share one production traffic history | Live Team price, gateway latency, retention, data policy, and model-provider bills need confirmation |
| OpenTelemetry-first LLM observability | [OpenLIT](/tools/openlit/) | Apache-2.0 self-hosting for traces, metrics, token and cost tracking, prompts, evals, dashboards, vector database monitoring, and GPU monitoring | Managed cloud pricing is not public, and self-hosted telemetry operations stay with the team |
| OSS-to-hosted agent evals | [Opik](/tools/opik/) | Open-source or hosted agent traces, Test Suites, assertions, LLM-as-judge metrics, annotation, and production monitoring | Span volume, retention, additional-span pricing, and evaluator quality need budgets |
| Custom agent and safety evals | [Inspect AI](/tools/inspect-ai/) | Python and CLI eval tasks, datasets, scorers, tools, agents, Inspect View, and sandboxed runs | Model calls, sandboxes, judge calibration, private data, and reviewer time remain buyer-owned |
| Runtime validation guardrails | [Guardrails AI](/tools/guardrails-ai/) | Validators, Hub installs, Pydantic outputs, on-fail policies, and input/output guards around LLM apps | Hosted pricing was not publicly verified; false positives and semantic correctness still need evals |
| Standard model benchmarks | [LM Evaluation Harness](/tools/lm-evaluation-harness/) | 60+ academic benchmarks, leaderboard-style tasks, and HF, vLLM, API, SGLang, and local-server backends | Benchmarks do not replace private product evals; API and GPU costs can grow |
| OpenAI eval migration | [OpenAI Evals](/tools/openai-evals/) | Existing OpenAI Evals users can inventory and migrate eval assets before read-only and shutdown dates | Existing evals become read-only on October 31, 2026, and dashboard/API shutdown is scheduled for November 30, 2026 |
| LLM and agent observability | [LangSmith](/tools/langsmith/), [Arize Phoenix](/tools/arize-phoenix/), [Traceloop](/tools/traceloop/), [LangWatch](/tools/langwatch/), or [Braintrust](/tools/braintrust/) | LangSmith is LangChain-native operations; Phoenix and Traceloop are OpenTelemetry-aligned observability; LangWatch is open-source LLMOps; Braintrust is evals, datasets, scores, and release evidence | Trace volume, retention, eval/model spend, event meters, human review, usage meters, and acquisition/product-roadmap risk need limits |
| Enterprise AI reliability | [Patronus AI](/tools/patronus-ai/) | Managed evals, traces, datasets, guardrails, Percival-assisted eval creation, and Digital World Model research | Confirm whether the contract covers eval ops, Digital World Model access, services, retention, and security controls |
| Code-first LLM and RAG evals | [DeepEval](/tools/deepeval/) or [Ragas](/tools/ragas/) | DeepEval is a broad LLM eval framework; Ragas is sharper for RAG metrics, synthetic test data, and cost-aware loops | Teams still own datasets, evaluator model costs, CI integration, and review workflow |
| Fine-tuning and specialized inference | [OpenPipe](/tools/openpipe/) | Request logs, datasets, fine-tuning, DPO, evaluations, and hosted inference for cheaper specialized models | Needs clean training data, stable tasks, eval coverage, and rollback plans |
| Typed LLM function layer | [BAML](/tools/baml/) | Typed function definitions, generated clients, robust parsing, tests, streaming, multimodal inputs, and optional Boundary Studio traces | It is a framework choice, not a finished SaaS purchase; model, hosting, CI, and observability costs remain separate |
| Structured output library | [Instructor](/tools/instructor/) | MIT-licensed validated JSON, Pydantic-style schemas, retries, and provider adapters for LLM app code | Valid schemas can still be wrong; retry cost, evals, and monitoring remain separate |
| Agent platform runtime | [Agno](/tools/agno/) | Apache-2.0 SDK and AgentOS path for agents, teams, workflows, memory, knowledge, storage, traces, audit logs, and interfaces | Tool permissions, memory retention, model budgets, and control-plane value need proof |
| Conversational AI app shell | [Chainlit](/tools/chainlit/) | Apache-2.0 Python framework for chat UIs around prototypes, RAG, internal tools, and agent demos | Not a managed support bot; auth, persistence, hosting, monitoring, and support need ownership |
| LLM gateway governance | [Portkey](/tools/portkey/) or [Helicone](/tools/helicone/) | Routing, logs, prompts, guardrails, keys, caching, budgets, fallback, and traffic policy | Gateway latency, recorded logs, retention, provider spend, and guardrail ownership need testing |
| Agent memory layer | [Zep](/tools/zep/) or [Mem0](/tools/mem0/) | Managed or self-hosted persistent memories across users, sessions, agents, and temporal context graphs | Memory extraction, deletion, consent, vector/database ownership, and privacy review decide production safety |
| AI security eval harness | [promptfoo](/tools/promptfoo/) | Red teaming, vulnerability scanning, guardrails, model security, MCP proxy, local evals, and enterprise/on-premise testing | Tests need real targets, remediation owners, false-positive review, and runtime controls |
| Search API for agents | [Tavily](/tools/tavily/) | Search, extract, crawl, map, and research APIs for agent and RAG systems | Credit burn depends on depth, extraction volume, crawls, research mode, retries, and loop behavior |
| RAG and agents over private data | [LlamaIndex](/tools/llamaindex/) or [Haystack](/tools/haystack/) | LlamaIndex is strong for context augmentation, indexing, LlamaCloud, and LlamaParse; Haystack is strong for open-source components, pipelines, document stores, and agents | Framework cost, parsing credits, embeddings, vector storage, hosting, retrieval evals, and access controls are separate |
| Prompt and program optimization | [DSPy](/tools/dspy/) | Signatures, modules, metrics, and optimizers help tune repeated LLM tasks from examples | Weak metrics, small datasets, and optimizer token spend can make the wrong behavior look better |
| Speech and voice infrastructure | [Deepgram](/tools/deepgram/) | STT, TTS, audio intelligence, and voice-agent APIs | Voice minutes, channels, model choice, and LLM orchestration affect cost |
| Model discovery and endpoints | [Hugging Face](/tools/hugging-face/) | Model cards, datasets, Spaces, Inference Endpoints | License and safety checks stay with the builder |
| Production retrieval | [Pinecone](/tools/pinecone/), [Weaviate](/tools/weaviate/), or [Qdrant](/tools/qdrant/) | Managed or open vector search for RAG | Index design and embedding cost matter as much as database pricing |

## How to Choose

- **Model routing:** Pick [OpenRouter](/tools/openrouter/) when you need one OpenAI-compatible API across many providers.
- **Direct LLM APIs:** Pick [OpenAI](/tools/chatgpt/), [Claude](/tools/claude/), or [Gemini](/tools/gemini/) when native features, procurement, and provider-specific controls matter.
- **Cost and latency:** Pick [Mistral AI](/tools/mistral-ai/), [OpenRouter](/tools/openrouter/), or [Groq](/tools/groq/) when you can benchmark quality against real prompts and need tighter unit economics.
- **Open-model infrastructure:** Pick [Together AI](/tools/together-ai/) when you need hosted inference, fine-tuning, dedicated endpoints, code sandboxes, and GPU capacity for open-model products. The June 25 check separates serverless model-token pricing from dedicated inference and GPU clusters, so benchmark your actual traffic before assuming a single "open model" unit cost.
- **Model catalog and experiments:** Pick [Hugging Face](/tools/hugging-face/) for discovery, datasets, model cards, demos, Spaces, ZeroGPU, and endpoints.
- **Media and community models:** Pick [Replicate](/tools/replicate/) when the job is running image, video, audio, or custom models by API. The June 9 check confirms buyers should model public output-priced examples separately from hardware-time runs and private deployments that can bill while idle.
- **Fast media APIs:** Pick [fal.ai](/tools/fal-ai/) when successful-output billing, image/video/audio/3D endpoints, and fast experimentation matter.
- **Production inference:** Pick [Fireworks AI](/tools/fireworks-ai/) when hosted model APIs, batch inference, dedicated GPU deployments, and fine-tuning are more important than a polished chatbot UI.
- **Browser automation:** Pick [Browserbase](/tools/browserbase/) when an AI agent, scraper, QA runner, or workflow needs managed browsers, Search/Fetch, Functions runtime, identity, observability, Model Gateway, and Stagehand-style automation.
- **Web data extraction:** Pick [Firecrawl](/tools/firecrawl/) when the agent needs pages transformed into markdown or structured data more than it needs a long-running browser session.
- **Agent tool access:** Pick [Composio](/tools/composio/) when the hard problem is app actions, user authentication, session tools, MCP access, and connector maintenance.
- **LLM gateways:** Pick [LiteLLM](/tools/litellm/) when the team wants a self-hosted OpenAI-compatible gateway, routing, virtual keys, budgets, guardrails, and provider fallback before model calls reach apps.
- **Managed LLMOps and gateway:** Pick [Respan](/tools/respan/) when traces, evals, prompts, monitors, spend limits, and gateway routing should share the same production traffic history.
- **OpenTelemetry-first observability:** Pick [OpenLIT](/tools/openlit/) when the team wants Apache-2.0 self-hosted LLM telemetry and is ready to own collectors, storage, retention, and dashboards.
- **Agent eval operations:** Pick [Opik](/tools/opik/) when agent traces, Test Suites, LLM-as-judge metrics, and hosted span retention are the buying reason.
- **Custom eval frameworks:** Pick [Inspect AI](/tools/inspect-ai/) when coding, agent, safety, reasoning, knowledge, behavior, or multimodal evals need to live in Python tasks with tools, scorers, and sandboxes.
- **Runtime guardrails:** Pick [Guardrails AI](/tools/guardrails-ai/) when validated structured outputs, reusable validators, and on-fail policies need to run before downstream actions trust model output.
- **Model benchmarks:** Pick [LM Evaluation Harness](/tools/lm-evaluation-harness/) when standard academic or leaderboard-style benchmark comparability is the job.
- **OpenAI eval migration:** Treat [OpenAI Evals](/tools/openai-evals/) as a migration item because hosted evals become read-only on October 31, 2026 and shut down on November 30, 2026.
- **Agent observability:** Pick [LangSmith](/tools/langsmith/) when LangChain or LangGraph production work needs traces, evals, prompt workflows, deployment, and usage controls in one managed lane.
- **AI evals:** Pick [Braintrust](/tools/braintrust/) when release quality depends on datasets, experiments, prompt comparisons, scored outputs, and review workflows.
- **OpenTelemetry AI observability:** Pick [Arize Phoenix](/tools/arize-phoenix/) when traces, prompt iteration, evals, datasets, and experiments should sit close to engineering instrumentation.
- **Enterprise AI reliability:** Pick [Patronus AI](/tools/patronus-ai/) when managed evals, traces, datasets, guardrails, and frontier agent-simulation research are part of the buying question.
- **OpenTelemetry LLM observability:** Pick [Traceloop](/tools/traceloop/) when OpenLLMetry instrumentation, quality checks, alerts, and ServiceNow procurement alignment matter.
- **Open-source LLMOps:** Pick [LangWatch](/tools/langwatch/) when the team wants traces, evals, datasets, DSPy optimization, and self-hosting in one open-source product surface.
- **Code-first LLM evals:** Pick [DeepEval](/tools/deepeval/) for broad LLM, RAG, agent, safety, tracing, and CI evals in code, and [Ragas](/tools/ragas/) for RAG-specific metrics, synthetic test data, and experiments in Python.
- **Fine-tuning:** Pick [OpenPipe](/tools/openpipe/) when logs can become datasets and specialized models can reduce cost or latency.
- **Typed LLM calls:** Pick [BAML](/tools/baml/) when structured outputs, generated clients, robust parsing, and tests should be part of the app code contract.
- **Gateway governance:** Pick [Portkey](/tools/portkey/) when live AI traffic needs routing, keys, prompts, guardrails, caching, logs, budgets, and retention policy in one control layer.
- **Agent memory:** Pick [Zep](/tools/zep/) or [Mem0](/tools/mem0/) when the product needs explicit, persistent memory rather than only retrieved documents.
- **Red-team testing:** Pick [promptfoo](/tools/promptfoo/) when the team needs local evals, jailbreak tests, vulnerability scans, guardrails, MCP proxy review, and security evidence before launch.
- **Agent search API:** Pick [Tavily](/tools/tavily/) when the app needs web search, extraction, crawl, mapping, and research endpoints rather than a browser session.
- **RAG frameworks:** Pick [LlamaIndex](/tools/llamaindex/) when context augmentation and agents over private data are the job; pick [Haystack](/tools/haystack/) when open-source components, pipelines, document stores, and reusable LLM app architecture are the job.
- **LLM program optimization:** Pick [DSPy](/tools/dspy/) when a repeated LLM task has examples and metrics that can guide optimization.
- **Agent platform runtime:** Pick [Agno](/tools/agno/) when developers want an open-source AgentOS-style stack for agents, teams, workflows, memory, knowledge, traces, audit logs, and interfaces.
- **Structured outputs:** Pick [Instructor](/tools/instructor/) when the problem is validated JSON or typed LLM output in application code.
- **Conversational AI interface:** Pick [Chainlit](/tools/chainlit/) when a Python RAG or agent workflow needs a quick chat UI for prototypes or internal tools.
- **Speech APIs:** Pick [Deepgram](/tools/deepgram/) when speech-to-text, text-to-speech, voice agents, or audio intelligence are infrastructure, not just creator utilities.
- **Serverless GPU apps:** Pick [Modal](/tools/modal/) when you want Python jobs, endpoints, queues, sandboxes, and GPU workloads without Kubernetes. The June 25 check keeps Starter at $0 with $30/month credits, Team at $250/month plus compute with $100/month credits, B200 at $0.001736/sec, H200 at $0.001261/sec, H100 at $0.001097/sec, region multipliers at 1.5x to 1.75x, non-preemptible execution at 3x, and B200+ as a compatibility route that can run on B200 or B300 while billing as B200.
- **Open-weight model family:** Pick [Llama](/tools/llama/) when infrastructure needs self-hostable or provider-hosted open weights rather than a closed frontier API. The June 23 check keeps Maverick as the flagship open-weight lane, Scout as the current Groq fast-inference card at $0.11/M input and $0.34/M output, and Together Maverick at $0.27/M input and $0.85/M output. Treat provider-specific availability, context, and pricing as live checks.
- **Local model runtime:** Pick [LM Studio](/tools/lm-studio/) when developers need a desktop GUI plus native v1 REST API, OpenAI-compatible and Anthropic-compatible endpoints, MCP support, SDKs, CLI server control, and LM Link for Llama, Qwen, Mistral, and other open weights. LM Studio has been free for ordinary home and work use since its July 2025 terms change, while Enterprise is the sales-led route for SSO, model/MCP gating, and private collaboration.
- **Managed vector search:** Pick [Pinecone](/tools/pinecone/) when retrieval is production-critical and you want managed operations. The June 25 check keeps Starter free, Builder at $20/month flat, Standard at a $50/month minimum plus usage, and Enterprise at a $500/month minimum, so production buyers should model reads, writes, storage, Assistant, inference, backups, imports, and reranking before treating the database price as the whole retrieval bill.
- **Open vector databases and agent memory:** Pick [Weaviate](/tools/weaviate/) or [Qdrant](/tools/qdrant/) when self-hosting optionality and control matter. The June 10 Weaviate check keeps Free, Flex from $45/month, Plus from $280/month, Premium from $400/month, Weaviate Embeddings at $0.025-$0.065 per 1M tokens, Query Agent at a free 1,000-request/month trial path or $30/org/month with 4,000 included requests, and Engram generally available as a managed memory/context service for agents. The June 25 Qdrant check keeps the Free Cloud testing tier at 1GB RAM and 4GB disk; Standard as usage-based production cloud; Premium as the enterprise-support tier; Hybrid/Private Cloud as the control-first path; and v1.18.2 as the latest release checked, with security fixes included in the release notes.

## Money Pages To Keep Current

- [Best pay-as-you-go AI tools and APIs](/guides/best-pay-as-you-go-ai-tools/) was refreshed June 27, 2026 to separate true metered API usage from flat subscriptions and keep OpenAI, Claude, Gemini, OpenRouter, Mistral, Groq, Replicate, fal, Deepgram, ElevenLabs, and Fish Audio pricing risk in one buyer path.
- [Best open source AI tools](/guides/best-open-source-ai-tools/) was refreshed June 27, 2026 for Ollama, LM Studio, Open WebUI, Llama, Mistral, DeepSeek, FLUX, Stable Diffusion, Whisper, and Hugging Face because open-model buyers often compare local control against hosted pay-as-you-go APIs.
- [Best AI tools for developers](/guides/best-ai-tools-for-developers/) is the June 6 verified developer guide for separating Cursor, GitHub Copilot AI Credits, Claude Code shared limits/API credits, Codex token credits, Replit Agent, and Aider BYOK API costs.
- A new `OpenRouter vs direct APIs` comparison would capture buyers choosing between a model router and direct OpenAI/Anthropic/Google contracts.
- A new `Replicate vs fal.ai` comparison would capture image/video/API buyers choosing between broad model catalog and fast media-generation infrastructure.

## Watchouts

Infrastructure tools are powerful because they hide messy systems. That can also hide cost and governance risk. Before standardizing, test real workloads, pin model routes where quality matters, model retry costs, and document what data can pass through each provider.

Do not publish infrastructure pages with old flat monthly subscription framing. The buyer question is usually total workload cost: input tokens, output tokens, cached tokens, web/search tools, video seconds, generated images, GPU runtime, voice minutes, channels, retries, and failed generations.

## Sources

- [OpenRouter pricing](https://openrouter.ai/pricing) (verified 2026-05-27)
- [OpenRouter Series B announcement](https://www.businesswire.com/news/home/20260526953416/en/OpenRouter-Raises-%24113-Million-CapitalG-led-Series-B-as-Weekly-Volume-Explodes-to-25T-Tokens) (verified 2026-05-27)
- [OpenAI API pricing](https://openai.com/api/pricing/) (verified 2026-06-12)
- [Claude API pricing](https://platform.claude.com/docs/en/about-claude/pricing) (verified 2026-06-12)
- [AiPedia late June 13 AI news update](/news/2026-06-13-us-blocks-anthropic-fable-mythos-openai-probe/) (verified 2026-06-13)
- [AiPedia June 14 AI news desk](/news/2026-06-14-ai-news-desk/) (verified 2026-06-14)
- [Anthropic Fable/Mythos access statement](https://www.anthropic.com/news/fable-mythos-access) (verified 2026-06-14)
- [OpenAI ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) (verified 2026-06-13)
- [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) (verified 2026-06-22)
- [Mistral AI pricing](https://mistral.ai/pricing) (verified 2026-06-15)
- [Mistral Vibe product page](https://mistral.ai/products/vibe/) (verified 2026-06-15)
- [Mistral Vibe agent announcement](https://mistral.ai/news/vibe-agent/) (verified 2026-06-15)
- [Mistral AI Now Summit 2026](https://mistral.ai/news/ai-now-summit-2026/) (verified 2026-06-15)
- [Mistral model docs](https://docs.mistral.ai/models/overview) (verified 2026-06-15)
- [Mistral 3 launch post](https://mistral.ai/news/mistral-3) (verified 2026-06-15)
- [Groq pricing](https://groq.com/pricing) (verified 2026-06-23)
- [Replicate pricing](https://replicate.com/pricing) (verified 2026-06-12)
- [fal Model API pricing docs](https://fal.ai/docs/documentation/model-apis/pricing) (verified 2026-06-12)
- [Fireworks AI pricing](https://fireworks.ai/pricing) (verified 2026-06-12)
- [Fireworks billing FAQ](https://docs.fireworks.ai/faq-new/billing-pricing/how-much-does-fireworks-cost) (verified 2026-06-12)
- [Fireworks inference documentation](https://docs.fireworks.ai/guides/inference-introduction) (verified 2026-06-12)
- [Browserbase pricing](https://www.browserbase.com/pricing) (verified 2026-06-18)
- [Browserbase changelog](https://www.browserbase.com/changelog) (verified 2026-06-18)
- [Browserbase Browser explainer](https://www.browserbase.com/blog/what-is-a-browserbase-browser) (verified 2026-06-18)
- [Browserbase Model Gateway docs](https://docs.browserbase.com/platform/model-gateway/overview) (verified 2026-06-18)
- [Firecrawl pricing](https://www.firecrawl.dev/pricing) (verified 2026-06-28)
- [Firecrawl introduction docs](https://docs.firecrawl.dev/introduction.md) (verified 2026-06-28)
- [Firecrawl scrape docs](https://docs.firecrawl.dev/features/scrape.md) (verified 2026-06-28)
- [Composio pricing](https://composio.dev/pricing) (verified 2026-06-28)
- [Composio docs](https://docs.composio.dev/docs.md) (verified 2026-06-28)
- [Composio authentication docs](https://docs.composio.dev/docs/authentication.md) (verified 2026-06-28)
- [LiteLLM docs](https://docs.litellm.ai/docs/) (verified 2026-06-28)
- [LiteLLM Enterprise docs](https://docs.litellm.ai/docs/enterprise) (verified 2026-06-28)
- [LiteLLM license](https://github.com/BerriAI/litellm/blob/main/LICENSE) (verified 2026-06-28)
- [LlamaIndex framework docs](https://developers.llamaindex.ai/python/framework/index.md) (verified 2026-06-28)
- [LlamaIndex pricing](https://www.llamaindex.ai/pricing) (verified 2026-06-28)
- [LlamaIndex license](https://github.com/run-llama/llama_index/blob/main/LICENSE) (verified 2026-06-28)
- [Haystack introduction docs](https://docs.haystack.deepset.ai/docs/intro) (verified 2026-06-28)
- [deepset AI Platform pricing](https://www.deepset.ai/pricing) (verified 2026-06-28)
- [Haystack license](https://github.com/deepset-ai/haystack/blob/main/LICENSE) (verified 2026-06-28)
- [DSPy official site](https://dspy.ai/) (verified 2026-06-28)
- [DSPy program, don't prompt guide](https://dspy.ai/getting-started/program-dont-prompt/index.md) (verified 2026-06-28)
- [DSPy license](https://github.com/stanfordnlp/dspy/blob/main/LICENSE) (verified 2026-06-28)
- [Respan pricing](https://www.respan.ai/pricing) (verified 2026-06-28)
- [Respan gateway docs](https://www.respan.ai/docs/documentation/features/gateway/gateway-quickstart) (verified 2026-06-28)
- [Respan eval docs](https://www.respan.ai/docs/documentation/features/evals/quickstart) (verified 2026-06-28)
- [Agno pricing](https://www.agno.com/pricing) (verified 2026-06-28)
- [Agno docs](https://docs.agno.com/introduction) (verified 2026-06-28)
- [Instructor docs](https://python.useinstructor.com/) (verified 2026-06-28)
- [Instructor license](https://raw.githubusercontent.com/567-labs/instructor/main/LICENSE) (verified 2026-06-28)
- [Chainlit docs](https://docs.chainlit.io/get-started/overview) (verified 2026-06-28)
- [Chainlit GitHub repository](https://github.com/Chainlit/chainlit) (verified 2026-06-28)
- [OpenLIT pricing](https://openlit.io/pricing) (verified 2026-06-28)
- [OpenLIT overview docs](https://docs.openlit.io/latest/overview) (verified 2026-06-28)
- [OpenLIT license](https://raw.githubusercontent.com/openlit/openlit/main/LICENSE) (verified 2026-06-28)
- [Opik pricing](https://www.comet.com/site/pricing/) (verified 2026-06-28)
- [Opik tracing docs](https://www.comet.com/docs/opik/tracing/overview) (verified 2026-06-28)
- [Opik evaluation docs](https://www.comet.com/docs/opik/evaluation/overview) (verified 2026-06-28)
- [Inspect AI docs](https://inspect.aisi.org.uk/) (verified 2026-06-28)
- [Inspect AI evals list](https://inspect.aisi.org.uk/evals/) (verified 2026-06-28)
- [Inspect AI license](https://raw.githubusercontent.com/UKGovernmentBEIS/inspect_ai/main/LICENSE) (verified 2026-06-28)
- [Guardrails quickstart](https://docs.guardrailsai.com/docs/getting_started/quickstart.md) (verified 2026-06-28)
- [Guardrails validators docs](https://docs.guardrailsai.com/docs/concepts/validators.md) (verified 2026-06-28)
- [Guardrails license](https://raw.githubusercontent.com/guardrails-ai/guardrails/main/LICENSE) (verified 2026-06-28)
- [LM Evaluation Harness README](https://raw.githubusercontent.com/EleutherAI/lm-evaluation-harness/main/README.md) (verified 2026-06-28)
- [LM Evaluation Harness license](https://raw.githubusercontent.com/EleutherAI/lm-evaluation-harness/main/LICENSE.md) (verified 2026-06-28)
- [OpenAI evals guide](https://developers.openai.com/api/docs/guides/evals) (verified 2026-06-28)
- [OpenAI API deprecations](https://developers.openai.com/api/docs/deprecations) (verified 2026-06-28)
- [OpenAI Evals license](https://raw.githubusercontent.com/openai/evals/main/LICENSE.md) (verified 2026-06-28)
- [LangSmith observability](https://www.langchain.com/langsmith/observability) (verified 2026-06-28)
- [LangChain pricing](https://www.langchain.com/pricing) (verified 2026-06-28)
- [LangSmith usage and billing](https://docs.langchain.com/langsmith/usage-and-billing) (verified 2026-06-28)
- [Braintrust pricing](https://www.braintrust.dev/pricing) (verified 2026-06-28)
- [Braintrust docs index](https://www.braintrust.dev/docs/llms.txt) (verified 2026-06-28)
- [Arize Phoenix docs index](https://arize.com/docs/phoenix/llms.txt) (verified 2026-06-28)
- [Arize pricing](https://arize.com/pricing/) (verified 2026-06-28)
- [Ragas docs](https://docs.ragas.io/en/stable/) (verified 2026-06-28)
- [Ragas cost analysis docs](https://docs.ragas.io/en/stable/howtos/applications/_cost/) (verified 2026-06-28)
- [OpenPipe docs index](https://docs.openpipe.ai/llms.txt) (verified 2026-06-28)
- [OpenPipe pricing](https://docs.openpipe.ai/pricing/pricing) (verified 2026-06-28)
- [LangWatch docs index](https://langwatch.ai/docs/llms.txt) (verified 2026-06-28)
- [LangWatch pricing](https://langwatch.ai/pricing) (verified 2026-06-28)
- [Patronus AI docs](https://docs.patronus.ai/docs) (verified 2026-06-28)
- [Patronus AI pricing](https://www.patronus.ai/pricing) (verified 2026-06-28)
- [Patronus Digital World Model announcement](https://www.patronus.ai/announcements/announcing-our-50m-series-b) (verified 2026-06-28)
- [DeepEval metrics docs](https://deepeval.com/docs/metrics-introduction) (verified 2026-06-28)
- [Confident AI pricing](https://www.confident-ai.com/pricing) (verified 2026-06-28)
- [Traceloop docs](https://www.traceloop.com/docs/introduction) (verified 2026-06-28)
- [Traceloop pricing](https://www.traceloop.com/pricing) (verified 2026-06-28)
- [Traceloop joins ServiceNow](https://traceloop.com/blog/traceloop-is-joining-servicenow) (verified 2026-06-28)
- [BAML docs index](https://docs.boundaryml.com/llms.txt) (verified 2026-06-28)
- [Portkey pricing](https://portkey.ai/pricing) (verified 2026-06-28)
- [Portkey docs](https://docs.portkey.ai/docs/llms.txt) (verified 2026-06-28)
- [Zep pricing](https://www.getzep.com/pricing/) (verified 2026-06-28)
- [Zep docs concepts](https://help.getzep.com/concepts) (verified 2026-06-28)
- [promptfoo pricing](https://www.promptfoo.dev/pricing/) (verified 2026-06-28)
- [promptfoo docs](https://www.promptfoo.dev/docs/intro/) (verified 2026-06-28)
- [OpenAI promptfoo acquisition announcement](https://openai.com/index/openai-to-acquire-promptfoo/) (verified 2026-06-28)
- [Mem0 Platform overview](https://docs.mem0.ai/platform/overview) (verified 2026-06-28)
- [Mem0 Platform vs Open Source](https://docs.mem0.ai/platform/platform-vs-oss) (verified 2026-06-28)
- [Mem0 pricing](https://mem0.ai/pricing) (verified 2026-06-28)
- [Tavily API credits](https://docs.tavily.com/documentation/api-credits) (verified 2026-06-28)
- [Deepgram pricing](https://deepgram.com/pricing) (verified 2026-06-12)
- [Together AI pricing](https://www.together.ai/pricing) (verified 2026-06-25)
- [Hugging Face pricing](https://huggingface.co/pricing) (verified 2026-06-23)
- [Hugging Face ZeroGPU docs](https://huggingface.co/docs/hub/en/spaces-zerogpu) (verified 2026-06-23)
- [Modal pricing](https://modal.com/pricing) (verified 2026-06-25)
- [Modal GPU docs](https://modal.com/docs/guide/gpu) (verified 2026-06-25)
- [LM Studio](https://lmstudio.ai/) (verified 2026-06-23)
- [LM Studio developer docs](https://lmstudio.ai/docs/api) (verified 2026-06-23)
- [LM Studio desktop app terms](https://lmstudio.ai/app-terms) (verified 2026-06-23)
- [Llama official site](https://ai.meta.com/llama/) (verified 2026-06-23)
- [Together AI Llama pricing](https://www.together.ai/pricing) (verified 2026-06-23)
- [Groq Llama 4 Scout model card](https://console.groq.com/docs/model/llama-4-scout-17b-16e-instruct) (verified 2026-06-23)
- [Groq Llama 4 Maverick model card](https://console.groq.com/docs/model/meta-llama/llama-4-maverick-17b-128e-instruct) (verified 2026-06-23)
- [Pinecone pricing](https://www.pinecone.io/pricing/) (verified 2026-06-25)
- [Pinecone cost docs](https://docs.pinecone.io/guides/manage-cost/understanding-cost) (verified 2026-06-25)
- [Pinecone Assistant pricing and limits](https://docs.pinecone.io/guides/assistant/pricing-and-limits) (verified 2026-06-25)
- [Weaviate pricing](https://weaviate.io/pricing) (verified 2026-06-12)
- [Weaviate Engram GA announcement](https://weaviate.io/blog/engram-generally-available) (verified 2026-06-12)
- [Qdrant pricing](https://qdrant.tech/pricing/) (verified 2026-06-25)
- [Qdrant Cloud billing](https://qdrant.tech/documentation/cloud-pricing-payments/) (verified 2026-06-25)
- [Qdrant v1.18.2 release notes](https://github.com/qdrant/qdrant/releases/tag/v1.18.2) (verified 2026-06-25)
- [CoreWeave autonomous agent improvement launch](https://investors.coreweave.com/news/news-details/2026/CoreWeave-Closes-the-Training-to-Inference-Gap-for-Autonomous-Agent-Improvement/default.aspx) (verified 2026-05-31)
- [OpenAI Rosalind Biodefense](https://openai.com/index/strengthening-societal-resilience-with-rosalind-biodefense/) (verified 2026-05-31)
- [Geordie AI Series A](https://www.geordie.ai/resources/geordie-ai-raises-30m-series-a-as-enterprises-race-to-govern-autonomous-ai-agents/) (verified 2026-05-31)
- [Sysdig LLM-agent intrusion analysis](https://www.sysdig.com/blog/ai-agent-at-the-wheel-how-an-attacker-used-llms-to-move-from-a-cve-to-an-internal-database-in-4-pivots) (verified 2026-05-31)
- [Microsoft Build 2026 Work IQ and Foundry agent stack](https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/) (verified 2026-06-12)
- [Google Cloud data agents announcement](https://cloud.google.com/blog/products/data-analytics/new-data-agents-across-the-agentic-data-cloud) (verified 2026-06-16)
- [Google Cloud Data Engineering Agent docs](https://docs.cloud.google.com/bigquery/docs/data-engineering-agent-pipelines) (verified 2026-06-16)
- [Google Cloud MCP servers docs](https://docs.cloud.google.com/mcp/manage-mcp-servers) (verified 2026-06-16)
- [Google Cloud Conversational Analytics docs](https://docs.cloud.google.com/bigquery/docs/conversational-analytics) (verified 2026-06-16)
- [GitHub Copilot SDK GA](https://github.blog/changelog/2026-06-02-copilot-sdk-is-now-generally-available/) (verified 2026-06-12)
- [NVIDIA enterprise software agents](https://investor.nvidia.com/news/press-release-details/2026/Enterprise-Software-Leaders-Build-AI-Agents-With-NVIDIA/default.aspx) (verified 2026-06-12)
- [NVIDIA Cosmos 3 physical AI model](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Launches-Cosmos-3-the-Open-Frontier-Foundation-Model-for-Physical-AI/default.aspx) (verified 2026-06-12)
- [NVIDIA physical AI agent tools and skills](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Releases-Major-Collection-of-Open-Source-Agent-Tools-and-Skills-for-Physical-AI/default.aspx) (verified 2026-06-12)
- [NVIDIA Alpamayo 2 Super](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Launches-Alpamayo-2-Super-Open-Reasoning-Model-for-Robotaxis/default.aspx) (verified 2026-06-12)
- [NVIDIA RTX Spark Windows AI PCs](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-and-Microsoft-Reinvent-Windows-PCs-for-the-Age-of-Personal-AI/default.aspx) (verified 2026-06-12)
- [NVIDIA DGX Station for Windows](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-DGX-Station-for-Windows-Puts-a-Trillion-Parameter-AI-Supercomputer-on-Every-Enterprise-Desk/default.aspx) (verified 2026-06-12)
- [Postman AI Engineer](https://blog.postman.com/introducing-the-ai-engineer/) (verified 2026-06-12)
- [RelationalAI Snowflake agentic decision intelligence](https://www.globenewswire.com/news-release/2026/06/02/3305546/0/en/RelationalAI-Closes-the-AI-Value-Gap-with-New-Agentic-Decision-Intelligence-Capabilities-for-the-Snowflake-AI-Data-Cloud.html) (verified 2026-06-12)
- [7AI Agentic Security Platform](https://7ai.com/platform) (verified 2026-06-12)
- [White House AI cybersecurity order](https://www.whitehouse.gov/presidential-actions/2026/06/promoting-advanced-artificial-intelligence-innovation-and-security/) (verified 2026-06-12)
