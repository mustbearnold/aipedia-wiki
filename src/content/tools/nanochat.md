---
type: tool
slug: nanochat
title: nanochat
tagline: Andrej Karpathy's minimal, readable LLM training framework. Learn the full pipeline from tokenization to RLHF in ~8K lines of Python.
category: ai-research
company: karpathy
url: https://github.com/karpathy/nanochat
pricing_model: open-source
price_range: "Free (MIT open-source)"
status: active
launched: 2025-10
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: occasional
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 10
  moat: 6
  longevity: 8
tags: [education, llm-training, open-source, python, karpathy, pretraining, fine-tuning, rlhf, gpt, research, minimal]
seo_title: "nanochat by Karpathy: Full LLM Pipeline in ~8K Lines (2026)"
meta_description: "nanochat is Andrej Karpathy's minimal, MIT-licensed LLM training framework covering tokenization, pretraining, fine-tuning, RLHF, and inference in ~8K lines of Python."
author: "aipedia.wiki Editorial"
best_for:
  - ML engineers learning the full LLM training pipeline end-to-end
  - educators teaching LLM internals in courses or workshops
  - researchers wanting a minimal, readable baseline to build on
  - engineers benchmarking training efficiency on single GPU nodes
not_best_for:
  - anyone who needs a production chatbot or deployed AI assistant
  - teams looking for a framework to train custom models at scale
quick_answer: >-
  nanochat is Karpathy's MIT-licensed LLM training framework. The full pipeline (tokenizer, pretraining, SFT, RLHF, inference, chat UI) fits in ~8K lines of Python. Reproducing a GPT-2-grade run costs about $100 on an 8xH100 node. Best for learning, not production.
---

# nanochat

Andrej Karpathy's open-source reference for the full LLM training pipeline. The repo covers tokenization, pretraining, supervised fine-tuning, RLHF, evaluation, inference, and a minimal chat UI in roughly 8,000 lines of Python.

Released October 2025. MIT licensed. Past 50k GitHub stars by early 2026.

## System Verdict

> **Pick nanochat if the goal is understanding how a ChatGPT-class system is actually built.** The codebase reads end-to-end in a day. Every stage from tokenizer to RLHF is visible without wrappers hiding the mechanics.
>
> **Skip it for production anything.** It is not a serving framework, not a multi-node distributed trainer, not a chatbot. Use a hosted API (Claude, ChatGPT) for deployment. Use Megatron-LM, NeMo, or Axolotl for real training workloads.
>
> The natural companion is [nanoGPT](https://github.com/karpathy/nanoGPT), which predates nanochat and covers pretraining only. Pick nanoGPT if the transformer loop is all that matters. Pick nanochat for the complete loop including RLHF and chat serving.

## Key Facts

| | |
|---|---|
| **Author** | Andrej Karpathy (former OpenAI, Tesla AI) |
| **Released** | October 2025 |
| **License** | MIT |
| **Lines of code** | ~8,000 Python |
| **Pipeline coverage** | Tokenizer, pretraining, SFT, RLHF, eval, inference, chat UI |
| **Reference reproduction run** | GPT-2-grade model on 8xH100 node, ~2 hours, ~$100 |
| **Hyperparameter control** | Single `--depth` flag; other hparams auto-computed |
| **Eval suite included** | MMLU, GSM8K, HumanEval |
| **Hardware floor** | CPU or Apple MPS for toy runs. 8xH100 for the speedrun. |
| **Stars** | 50,000+ as of April 2026 |

## What it actually is

A single-repo walk-through of the LLM stack. The core library ships the tokenizer, transformer, training loop, and inference. Scripts handle each pipeline stage: pretraining on Fineweb/ClimbMix data, SFT on instruction data, RLHF, and a chat-interface demo.

The design dial is `--depth`. That one flag sets transformer layer count and auto-derives the rest for compute-optimal training. No hundred-parameter config files.

The GPT-2 speedrun is the headline benchmark. Reproducing 2019's $43,000 training result costs roughly $100 in 2026 rental GPU time. That gap is the seven-year compounding of algorithmic and hardware efficiency gains.

## When to pick nanochat

- **Learning how language models are built.** The codebase does not hide mechanics behind abstractions.
- **Teaching LLM internals.** Educators get a complete, citable, modern reference implementation in one repo.
- **Research ablations on a small budget.** Minimal baseline makes architecture experiments fast to iterate.
- **Understanding what pretraining actually costs in 2026.** The $100 speedrun is the clearest number in the literature.
- **Companion reading to a theory course.** Hugging Face and Stanford CS224N cover the math; nanochat is the working code.

## When to pick something else

- **Production LLM training at scale:** Megatron-LM, NeMo, or Axolotl for fine-tuning. nanochat is not a distributed trainer.
- **Deploying a chatbot:** [Claude](/tools/claude/) or [ChatGPT](/tools/chatgpt/) APIs. nanochat's chat UI is a demo, not a product.
- **Pretraining-only study:** [nanoGPT](https://github.com/karpathy/nanoGPT) is Karpathy's earlier repo. Smaller scope, fewer moving parts.
- **Tiny LLM research with a ready-made checkpoint:** TinyLlama (1.1B, fully trained). nanochat gives training code, not a usable model.
- **Multimodal or MoE work:** Out of scope. nanochat sticks to one well-defined text-only path.

## Pricing

| Component | Cost |
|---|---|
| nanochat codebase | Free (MIT) |
| GPU speedrun reproduction | ~$100 (8xH100 node, ~2 hours) |
| CPU or MPS experimentation | Free on existing hardware |
| Inference after training | User's choice of provider or self-host |

*Prices verified 2026-04-17 via the [nanochat GitHub README](https://github.com/karpathy/nanochat).*

## Against the alternatives

| | nanochat | nanoGPT | Megatron-LM |
|---|---|---|---|
| **Scope** | Full pipeline incl. RLHF and chat UI | Pretraining only | Industrial distributed training |
| **Lines of code** | ~8,000 | ~300 core | 100,000+ |
| **Readability** | High | Highest | Low |
| **Production-ready** | No | No | Yes |
| **Multi-node training** | Not primary target | No | Yes |
| **RLHF included** | Yes | No | Add-on required |
| **Best viewed as** | Complete reference | Minimal pretraining demo | Production trainer |

## Failure modes

- **Not a deployable chatbot.** Models trained here are GPT-2-scale research artifacts. Quality is nowhere near a production assistant.
- **Not a production training framework.** No multi-node distribution, no production data pipelines, no inference safety rails.
- **Hardware requirement for meaningful runs.** The $100 speedrun needs an 8xH100 node. CPU and MPS paths exist but produce toy models.
- **Scope is intentionally narrow.** Multimodal, mixture-of-experts, and vision-language models are out of the design remit.
- **Pedagogical value depends on the author.** Karpathy's commentary in release notes and videos is part of the learning loop. Without that context the code alone teaches less.
- **Speedrun leaderboard implies competition the code was not built for.** Community entries favor efficiency tricks that can obscure the teaching value of the default path.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies claims against primary sources, and generates the editorial analysis shown here. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against the [nanochat GitHub repo](https://github.com/karpathy/nanochat) and [Karpathy's release thread](https://x.com/karpathy/status/1977755427569111362).

## FAQ

**Is nanochat a chatbot I can use?**
No. The repo includes a minimal chat interface as an inference demo. Models trained with it are GPT-2-scale, not production assistants. For a real chatbot, use [Claude](/tools/claude/) or [ChatGPT](/tools/chatgpt/).

**How many lines of code is nanochat?**
About 8,000 across the core library and scripts ([GitHub](https://github.com/karpathy/nanochat)). The design goal is a codebase a competent reader can walk end-to-end in a day.

**What hardware is needed?**
For learning and small experiments, a laptop with CPU or Apple MPS runs the code at toy scale. For the headline GPT-2 speedrun, an 8xH100 rented node costs roughly $100 for two hours of compute.

**What changed vs nanoGPT?**
nanoGPT covers pretraining only. nanochat adds the tokenizer, SFT, RLHF, eval suite, inference, and a chat UI in the same repo. Pick nanoGPT for pretraining theory, nanochat for the complete pipeline.

**Can nanochat produce a usable model?**
Not in the modern assistant sense. The speedrun output is a GPT-2-grade model suitable for research and teaching, not for production chat. Use it to understand how capability scales with compute, not to deploy.

## Sources

- [nanochat GitHub (karpathy/nanochat)](https://github.com/karpathy/nanochat): README, architecture, speedrun leaderboard
- [Karpathy's nanochat release thread](https://x.com/karpathy/status/1977755427569111362): design intent and scope
- [nanoGPT reference](https://github.com/karpathy/nanoGPT): companion repo for pretraining-only study

## Related

- **Category:** [AI Research](/categories/ai-research/) · [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Connected Papers vs nanochat](/comparisons/connected-papers-vs-nanochat/) · [Consensus vs nanochat](/comparisons/consensus-vs-nanochat/) · [Elicit vs nanochat](/comparisons/elicit-vs-nanochat/)
