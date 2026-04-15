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
last_updated: 2026-04-15
last_verified: 2026-04-15
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
  - - ML engineers learning the full LLM training pipeline end-to-end
  - educators teaching LLM internals in courses or workshops
  - researchers wanting a minimal, readable baseline to build on
  - engineers benchmarking training efficiency on single GPU nodes
not_best_for:
  - - anyone who needs a production chatbot or deployed AI assistant
  - teams looking for a framework to train custom models at scale
quick_answer: >-
  nanochat is an educational artifact from Andrej Karpathy (former OpenAI, Tesla AI) released in October 2025. It implements the complete LLM pipeline, tokenization, pretraining, supervised fine-tuning, RLHF, inference, and a ChatGPT-like web interface, in approximately 8,000 lines of readable Python. It is explicitly designed for learning and understanding, not production use. GPT-2-level models can be trained for around $48 on an 8xH100 node. The codebase has 51k+ GitHub stars and an MIT license. If you want to understand how language models work end-to-end, this is the clearest single resource available.
---

# nanochat

nanochat is an educational LLM training framework created by Andrej Karpathy and released in October 2025 ([GitHub](https://github.com/karpathy/nanochat)). In approximately 8,000 lines of Python, it covers the entire pipeline for building a ChatGPT-like language model: tokenization, pretraining on web-scale text, supervised fine-tuning, reinforcement learning from human feedback (RLHF), evaluation, inference, and a minimal chat web interface. The explicit design goal is clarity over completeness. Every part of the pipeline is written to be read and understood, not to be the fastest or most feature-complete implementation. The project reached 51k+ GitHub stars and 6.9k forks within months of release, reflecting demand for exactly this kind of ground-up educational resource. It is MIT-licensed and free.

**This is a learning tool, not a production framework.** If you need to deploy a chatbot, use an API. nanochat is for understanding how the system behind that API actually works.

## What It Does

nanochat provides a single, cohesive codebase that walks you through every stage of building a language model ([nanochat README](https://github.com/karpathy/nanochat)). The core library covers the tokenizer, transformer model architecture, training loop, and inference. Scripts handle each pipeline stage: pretraining on Fineweb/ClimbMix data, supervised fine-tuning (SFT) on instruction data, reinforcement learning from human feedback, and serving a chat interface. Evaluation tasks from MMLU, GSM8K, and HumanEval are included. Rather than exposing hundreds of hyperparameters, nanochat uses a single complexity dial, the `--depth` flag for transformer layer count, that automatically computes all other hyperparameters for compute-optimal training. GPT-2-level capability (the 2019 benchmark that took around $43,000 to train) can be reproduced for approximately $48 on a rented 8xH100 node for two hours, reflecting seven years of algorithmic and hardware advances. A CPU/MPS path is also supported for experimentation on laptops.

## Who It's For

- **ML engineers learning the stack** who want to see every component of an LLM system in one place, without abstraction layers hiding the mechanics
- **Educators and professors** teaching deep learning, NLP, or LLM courses who need a complete, citable, modern reference implementation
- **Researchers** who want a minimal, hackable baseline for ablation studies, architecture experiments, or benchmarking training efficiency
- **Engineers exploring training costs** who want to understand what it actually costs to pretrain a small language model in 2025-2026
- **Curious practitioners** who use LLM APIs daily and want to understand what is happening inside them

## Pricing

| Component | Cost |
|-----------|------|
| nanochat codebase | Free (MIT) |
| GPU compute for GPT-2 reproduction run | ~$48 (8xH100 node, ~2 hours) |
| CPU/MPS experimentation | Free (your own hardware) |
| LLM API for inference after training | Your provider's rates |

*The framework itself costs nothing. Cloud GPU costs depend on your provider and experiment scale. Verified 2026-04-15 ([nanochat README](https://github.com/karpathy/nanochat)).*

## Key Features

- **Complete pipeline in one repo:** Tokenization, pretraining, SFT, RLHF, evaluation, inference, and chat UI, all in a single cohesive codebase ([GitHub](https://github.com/karpathy/nanochat))
- **~8,000 lines of Python:** Small enough to read end-to-end in a day; large enough to cover the full system
- **Single complexity dial:** The `--depth` flag sets transformer layer count and auto-calculates all other hyperparameters for compute-optimal training
- **GPT-2 speedrun leaderboard:** Community benchmark for fastest/cheapest GPT-2 reproduction, documenting 7 years of efficiency gains
- **Evaluation suite:** MMLU, GSM8K, and HumanEval benchmarks included for model quality assessment
- **CPU and MPS support:** Run small experiments on a laptop without cloud GPU access
- **Readable by design:** Every component favors clarity; commented, minimal, no unnecessary abstraction
- **MIT license:** Permissive; use freely in research, education, or as a starting point for custom projects

## Limitations

- **Not for production.** nanochat is not optimized for serving, does not include production safety features, and was not designed to handle real user traffic. Use a hosted API for any real deployment.
- **Not a framework for large-scale training.** If you need to train a serious model (7B+ parameters, distributed multi-node training, production data pipelines), you need Megatron-LM, NeMo, or similar industrial tooling.
- **Hardware requirements for meaningful runs.** The GPT-2 reproduction requires an 8xH100 node. Smaller experiments run on CPU/MPS but produce toy models.
- **Scope is intentionally narrow.** nanochat covers one well-defined path through the LLM pipeline. Multimodal, mixture-of-experts, and other architectures are out of scope.
- **Moat is the author, not the code.** The codebase is intentionally simple. Its enduring value comes from Karpathy's pedagogy and the community around it, not from technical complexity that is hard to replicate.
- **Single-GPU node focus.** Multi-node distributed training is not the primary design target, though the codebase can be adapted.

## Bottom Line

nanochat is the clearest end-to-end reference for how a language model is actually built, as of 2025. For anyone who uses LLM APIs and wants to understand what is happening inside them, or for any educator who needs a complete, modern, readable pipeline to teach from, it is the best single resource available. It is not a tool for running a chatbot or training production models. Think of it the way you would think of a well-written textbook with working code: invaluable for learning, not what you deploy. Karpathy's educational artifacts (nanoGPT, micrograd, makemore) have a track record of enduring relevance, which gives this project strong longevity for a learning resource.

## Best Alternatives

- For **production LLM training at scale:** Megatron-LM, NeMo, or Axolotl for fine-tuning
- For **an earlier, simpler Karpathy reference:** [nanoGPT](https://github.com/karpathy/nanoGPT) covers pretraining only, in fewer lines, and predates nanochat
- For **a broader LLM education resource:** Hugging Face course or Stanford CS224N; nanochat is the hands-on code complement to these
- For **tiny LLM research baselines:** TinyLlama (1.1B, fully trained) if you need an actual small model, not a training tutorial

## FAQ

**Is nanochat a chatbot I can use?**
No. nanochat is a training framework for learning how language models are built. It includes a minimal chat interface as a demonstration of inference, but the models you train with it are GPT-2-scale research artifacts, not production assistants. Use a hosted API (Claude, ChatGPT, etc.) if you need a capable chatbot.

**How many lines of code is nanochat?**
Approximately 8,000 lines across the core library and scripts ([GitHub](https://github.com/karpathy/nanochat)). This is intentionally small: the design goal is a codebase readable end-to-end, so every component favors clarity over completeness.

**What hardware do I need to use nanochat?**
For small experiments and learning, a laptop with CPU or Apple MPS is sufficient to run the code, though models will be toy-scale. To reproduce the GPT-2 benchmark run documented in the project, you need an 8-GPU H100 node, which costs approximately $48 on cloud GPU rental for roughly two hours of compute.

## Sources

- [nanochat GitHub (karpathy/nanochat)](https://github.com/karpathy/nanochat): 51.9k stars, MIT license, README, architecture, cost benchmarks
- [nanochat README](https://github.com/karpathy/nanochat/blob/master/README.md): Full pipeline description, hardware requirements, speedrun leaderboard

## Related

- **Category:** [AI Research](../categories/ai-research.md)
- **Category:** [AI Coding](../categories/ai-coding.md)
