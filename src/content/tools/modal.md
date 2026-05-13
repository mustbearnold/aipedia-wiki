---
type: tool
slug: modal
title: Modal
tagline: Serverless cloud for Python, GPUs, jobs, web endpoints, sandboxes, queues, and AI apps that should scale without managing infrastructure.
category: ai-infrastructure
secondary_categories: [ai-coding, ai-automation]
company: Modal Labs
url: https://modal.com
pricing_model: freemium
price_range: Starter $0 with $30/mo credits; Team $250/mo plus compute; GPU billed per second
status: active
launched: 2021
last_updated: 2026-05-13
last_verified: 2026-05-13
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 9
  value: 8
  moat: 8
  longevity: 8
facts:
  best_for:
    value: "Serverless cloud for Python, GPUs, jobs, web endpoints, sandboxes, queues, and AI apps that should scale without managing infrastructure. Best for AI infrastructure, retrieval, vector search, hosting, or developer platforms."
    source: "https://modal.com/pricing"
    source_label: "Modal pricing"
    source_id: modal-official
    verified_at: 2026-05-13
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Starter $0/mo with $30/mo credits and 100 containers / 10 GPU concurrency; Team $250/mo with $100/mo credits and 1,000 containers / 50 GPU concurrency; Enterprise custom. GPU billed per second by class (B200 $0.001736/sec, H200 $0.001261/sec, H100 $0.001097/sec, A100 80GB $0.000694/sec, L4 $0.000222/sec, T4 $0.000164/sec). Region selection adds 1.5x to 1.75x and non-preemptible execution adds 3x."
    source: "https://modal.com/pricing"
    source_label: "Modal pricing"
    source_id: modal-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Region selection multipliers (1.5x to 1.75x) and non-preemptible execution (3x base) can materially change production cost; benchmark steady GPU workloads against reserved cloud capacity before migrating from RunPod, Lambda Labs, or AWS."
    source: "https://modal.com/pricing"
    source_label: "Modal pricing"
    source_id: modal-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: medium
    confidence: high
tags: [serverless, gpu-cloud, python, inference, jobs, web-endpoints, ai-infrastructure]
seo_title: "Modal Review: Serverless GPU Cloud & Pricing (2026)"
meta_description: "Modal is a serverless Python and GPU cloud for AI apps, batch jobs, inference endpoints, queues, and sandboxes, with per-second compute pricing."
author: aipedia.wiki Editorial
best_for:
  - Python teams deploying AI jobs without Kubernetes
  - spiky GPU inference and batch workloads
  - internal AI tools, endpoints, queues, and scheduled jobs
  - developers who want infrastructure in code
not_best_for:
  - non-technical users
  - long-running always-on GPUs where reserved cloud may be cheaper
  - teams standardized on full Kubernetes control
quick_answer: >-
  Modal is the cleanest path from Python function to scalable AI infrastructure. Pick it for spiky GPU jobs, internal AI apps, batch pipelines, and serverless endpoints. Skip it for fixed 24/7 GPU workloads where reserved cloud capacity may be cheaper.
---

# Modal

Modal is a serverless cloud platform for Python applications, AI jobs, GPU workloads, web endpoints, scheduled tasks, and sandboxes. It removes much of the container, queue, and Kubernetes work that normally sits between a notebook and a production AI service.

The useful mental model: write Python, decorate functions, attach CPU/GPU/memory requirements, and deploy. Modal handles image builds, scale-out, secrets, queues, logs, and web endpoints.

## Recent developments

- **April 30, 2026:** [RunPod Flash went GA with a Python-to-GPU-endpoint workflow that skips container work](/news/2026-04-30-runpod-flash-open-source-python-ai-deploy/). Modal still has the more mature serverless Python platform in this catalog, but RunPod is now making a direct developer-experience push.

## System Verdict

> **Pick Modal if you want AI infrastructure without becoming an infra team.** It is particularly good for spiky inference, batch processing, embeddings, media jobs, and internal tools.
>
> **Skip it if your workload is steady 24/7.** Always-on GPU fleets can be cheaper through reserved cloud instances or dedicated providers.
>
> Modal's moat is developer experience. It makes production-grade compute feel like an extension of Python code.

## Key Facts

| | |
|---|---|
| **Core product** | Serverless Python and GPU cloud |
| **Workloads** | Functions, batch jobs, queues, web endpoints, sandboxes |
| **GPU pricing** | Per-second billing by class (B200 $0.001736/sec, H200 $0.001261/sec, H100 $0.001097/sec, RTX PRO 6000 $0.000842/sec, A100 80GB $0.000694/sec, A100 40GB $0.000583/sec, L40S $0.000542/sec, A10 $0.000306/sec, L4 $0.000222/sec, T4 $0.000164/sec) |
| **CPU / memory** | $0.0000131 per core/sec, $0.00000222 per GiB/sec |
| **Starter** | $0/mo with $30/mo compute credits, 100 containers, 10 GPU concurrency |
| **Team** | $250/mo workspace plan with $100/mo compute credits, 1,000 containers, 50 GPU concurrency |
| **Enterprise** | Custom plan with higher concurrency, support, audit logs, SSO, and HIPAA compatibility |
| **Surcharges** | Region selection 1.5x to 1.75x base; non-preemptible 3x base |
| **Best fit** | AI apps, pipelines, inference, internal tools |
| **Alternatives** | RunPod, Lambda Labs, AWS Batch, Kubernetes, [Together AI](/tools/together-ai/) |

## When to pick Modal

- **You have spiky GPU demand.** Pay for active compute rather than idle GPU hours.
- **You build in Python.** Modal is optimized for Python-first teams.
- **You need jobs and endpoints together.** Batch processing and web APIs can share code and secrets.
- **You want clean deployment ergonomics.** Less YAML, fewer container chores, faster iteration.
- **You are prototyping AI infrastructure.** It is easier to start than assembling cloud primitives.

## When to pick something else

- **Steady GPU occupancy:** Reserved cloud GPUs, Lambda Labs, or RunPod may be cheaper.
- **Open-model inference APIs:** [Together AI](/tools/together-ai/) or [Fireworks AI](/tools/fireworks-ai/).
- **Media model APIs:** [Fal.ai](/tools/fal-ai/) or [Replicate](/tools/replicate/).
- **Full platform control:** Kubernetes on AWS, GCP, Azure, or your own cluster.

## Pricing

Modal bills compute by actual resource usage. GPU prices are listed per second by class, with B200 at $0.001736/sec, H200 at $0.001261/sec, H100 at $0.001097/sec, RTX PRO 6000 at $0.000842/sec, A100 80GB at $0.000694/sec, A100 40GB at $0.000583/sec, L40S at $0.000542/sec, A10 at $0.000306/sec, L4 at $0.000222/sec, and T4 at $0.000164/sec. CPU is $0.0000131 per core per second and memory $0.00000222 per GiB per second. Volumes, sandboxes, and notebooks have separate meters.

The Starter plan is $0/mo with $30/mo in compute credits, 100 containers, and 10 GPU concurrency. Team is $250/mo plus compute, includes $100/mo in compute credits, and lifts caps to 1,000 containers and 50 GPU concurrency.

This is attractive for bursty jobs. For constant GPU load, compare against reserved instances before committing.

As verified on 2026-05-13, Modal's pricing page also notes regional execution can cost 1.5x to 1.75x base prices and non-preemptible execution can cost 3x base prices. Those multipliers matter for production inference, customer-facing latency, and workloads that cannot tolerate interruption.

## Evaluation checklist

Before committing a production workload to Modal, test:

- Cold start time, image build time, and model load time.
- Whether the workload is bursty enough to benefit from serverless billing.
- GPU memory requirements by model and batch size.
- Queue behavior under peak traffic.
- Region requirements and whether region multipliers change the economics.
- Whether non-preemptible execution is required.
- Logging, alerting, secrets, rollbacks, and cost tags.

## Buyer fit

Modal is strongest for Python-heavy teams that want to ship infrastructure as code without building a platform team. It fits evaluation jobs, embeddings, video and image processing, internal tools, scheduled tasks, custom inference endpoints, and workloads that scale from zero to many containers.

It is weaker for organizations that already have a mature Kubernetes platform, need deep network control, or run steady GPUs around the clock. In those cases, the developer experience may still be excellent, but the cost comparison needs to include reserved capacity and existing infrastructure staff.

## Failure Modes

- **Serverless is not magic for every workload.** Cold starts, image builds, and large model loads still matter.
- **Always-on can get expensive.** Modal shines when utilization is uneven.
- **Python-first bias.** Great for Python teams, less natural for polyglot app stacks.
- **Cloud abstraction limits.** If you need low-level network or cluster control, you may hit boundaries.
- **Cost needs tags and alerts.** Per-second pricing is transparent, but runaway jobs are still runaway jobs.
- **Pricing multipliers matter.** Region selection and non-preemptible execution can materially change production cost.

## Methodology

Last verified 2026-05-13 against [Modal's pricing page](https://modal.com/pricing) and product documentation, with GPU per-second rates, container caps, and surcharge multipliers confirmed for Starter and Team tiers. Scoring emphasizes developer experience, fit for AI workloads, GPU flexibility, and cost risk.

## FAQ

**Is Modal only for AI?**
No. It runs general Python serverless workloads, but AI and GPU use cases are a major fit.

**Does Modal support GPUs?**
Yes. GPU tasks are priced per second by GPU type.

**Is Modal cheaper than cloud GPUs?**
For spiky workloads, often. For steady 24/7 load, reserved cloud or dedicated GPU providers may be cheaper.

## Sources

- [Modal pricing](https://modal.com/pricing)
- [Modal documentation](https://modal.com/docs)

## Related

- **Category:** [AI Infrastructure](/categories/ai-infrastructure/) · [AI Coding](/categories/ai-coding/)
- **See also:** [Together AI](/tools/together-ai/) · [Fal.ai](/tools/fal-ai/) · [Replicate](/tools/replicate/) · [Fireworks AI](/tools/fireworks-ai/) · [Groq](/tools/groq/)
