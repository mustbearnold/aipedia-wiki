---
type: news
slug: 2026-04-16-qwen-3-6-35b-a3b-release
title: "Alibaba Open-Sources Qwen3.6-35B-A3B, A Sparse MoE With Only 3B Active Params"
date: 2026-04-16
severity: major
summary: "Alibaba's Qwen team released Qwen3.6-35B-A3B on April 16, 2026 under Apache 2.0. Sparse MoE architecture: 35B total parameters, only 3B activated per token via 8+1 experts out of 256. Native 262k context, extensible to 1M via YaRN. Apache 2.0 license allows commercial use. Aggregate benchmarks trail Claude Opus 4.7 by roughly 18 points (77 vs 94) but close significantly on knowledge tasks; the gap widens on agentic + MCP tool use where Opus still leads."
affects: [qwen, claude]
categories: [ai-chatbots, ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-18
last_verified: 2026-04-18
sources:
  - url: "https://github.com/QwenLM/Qwen3.6"
    title: "Qwen3.6 GitHub - QwenLM/Qwen3.6"
  - url: "https://www.marktechpost.com/2026/04/16/qwen-team-open-sources-qwen3-6-35b-a3b-a-sparse-moe-vision-language-model-with-3b-active-parameters-and-agentic-coding-capabilities/"
    title: "Qwen Team Open-Sources Qwen3.6-35B-A3B - MarkTechPost"
  - url: "https://simonwillison.net/2026/Apr/16/qwen-beats-opus/"
    title: "Qwen3.6-35B-A3B on my laptop drew me a better pelican than Claude Opus 4.7 - Simon Willison"
---

Alibaba's Qwen team shipped **Qwen3.6-35B-A3B** on April 16, 2026 under Apache 2.0. It's a sparse Mixture-of-Experts vision-language model with an unusually aggressive expert routing: only 3B parameters activate per token even though the full model holds 35B in weights.

## What's actually in it

**Architecture:**
- Total parameters: 35B
- Active per token: ~3B (via 256 experts, 8 routed + 1 shared per forward pass)
- Block pattern: 10 blocks of (Gated DeltaNet → MoE) × 3 + (Gated Attention → MoE) × 1
- Context: 262,144 native, 1,010,000 extensible via YaRN
- License: Apache 2.0 (full commercial use permitted)

**Practical economics:**
- Zero licensing cost
- Runs on a single consumer GPU if you have enough VRAM for the full 35B weights (MoE loads all experts, activates few)
- On Apple Silicon with unified memory, practical for 32GB+ machines
- Ollama, LM Studio, and vLLM have Day-0 support; AMD Instinct GPUs also shipped Day-0 kernels

## Benchmark reality check

A viral claim circulating says Qwen 3.6 "delivers 80% of Opus 4.7's performance." That's approximately correct in aggregate but hides where the gap matters.

| Category | Claude Opus 4.7 | Qwen 3.6 Plus | Qwen as % of Opus |
|---|---|---|---|
| Aggregate | 94 | 77 | 82% |
| Agentic tasks avg | 74.9 | 61.6 | 82% |
| Coding avg | 72.9 | 64.8 | 89% |
| Knowledge tasks | 68.2 | 66 | 97% |
| **MCP Atlas** (tool use) | 77.3% | 48.2% | **62%** |

**The honest read:** Qwen 3.6 is close on raw knowledge and not-too-far on coding, but Opus 4.7 maintains a real lead on agentic workflows and tool-use-heavy tasks. The 80% headline understates that spread.

**Where Qwen wins:** Speed (roughly 1.7× faster than Claude on Qwen 3.6 Plus), cost (~15× cheaper per coding-agent conversation, around $0.05 vs $0.75), and openness (Apache 2.0 beats Anthropic API lock-in for regulated or on-prem workloads).

## Why this matters for 2026

Open-weight flagship parity with proprietary frontier models was the [theme we flagged in the open-source-parity trend](/trends/open-source-parity/). Qwen3.6-35B-A3B, GLM-5.1, Llama 4 Scout, and Gemma 4 together close the raw-capability gap that existed through 2024. What proprietary labs still own is agentic depth, tool use reliability, and multi-step reasoning under pressure. On those dimensions, Claude Opus 4.7 and GPT-5.4 still lead.

For teams building production AI products in April 2026: Qwen 3.6 is now a credible drop-in for a meaningful slice of LLM workloads at much lower cost, with the clear caveat that agentic workflows should still route to Opus or Mythos or GPT-5.4 until the open-weight gap closes further.

## Availability

- **Weights:** [Hugging Face + Qwen GitHub](https://github.com/QwenLM/Qwen3.6)
- **Local runtime:** [Ollama](/tools/ollama/), [LM Studio](/tools/lm-studio/), [Jan.ai](/tools/jan-ai/), llama.cpp, vLLM
- **Cloud inference:** [Fal.ai](/tools/fal-ai/), [Fireworks AI](/tools/fireworks-ai/), [Groq](/tools/groq/), Together AI all shipped Qwen 3.6 endpoints within 48 hours

## Sources

- [Qwen3.6 GitHub](https://github.com/QwenLM/Qwen3.6)
- [MarkTechPost: open-source release coverage](https://www.marktechpost.com/2026/04/16/qwen-team-open-sources-qwen3-6-35b-a3b-a-sparse-moe-vision-language-model-with-3b-active-parameters-and-agentic-coding-capabilities/)
- [Simon Willison: laptop pelican test vs Opus 4.7](https://simonwillison.net/2026/Apr/16/qwen-beats-opus/)
- [BenchLM: Claude Opus 4.7 vs Qwen3.6 Plus benchmarks](https://benchlm.ai/compare/claude-opus-4-7-vs-qwen3-6-plus)
- [AMD: Day-0 support on Instinct GPUs](https://www.amd.com/en/developer/resources/technical-articles/2026/day-0-support-for-qwen3-6-on-amd-instinct-gpus.html)
