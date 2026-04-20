---
type: tool
slug: kimi
title: Kimi
tagline: Moonshot AI's chatbot and model family, anchored by Kimi K2.5 with a 256K-token context window and agent swarm mode.
category: ai-chatbots
secondary_categories: [ai-coding, ai-research]
company: Moonshot AI
url: https://www.kimi.com/
github_url: https://github.com/MoonshotAI/Kimi-K2
pricing_model: freemium
price_range: "Free (chat) / API from $0.60/M input tokens"
status: active
launched: 2023-10
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: quarterly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 8
  moat: 5
  longevity: 7
tags: [long-context, chinese-llm, moe, reasoning, coding, multilingual, open-source, api]
seo_title: "Kimi: Features, Pricing & Review (April 2026)"
meta_description: "Kimi K2.5 by Moonshot AI offers a free 256K-context chatbot. 1T-parameter MoE with 32B active, agent swarm mode, API from $0.60/M input. Kimi K2 Thinking tops Humanity's Last Exam at 44.9%."
author: "aipedia.wiki Editorial"
best_for:
  - long-document and codebase analysis with free 256K context
  - bilingual Chinese-English research workflows
  - agentic multi-step tasks with 200-300 sequential tool calls
  - open-weight frontier thinking model deployment
not_best_for:
  - cheapest API (DeepSeek is 2x lower on input)
  - Western enterprise data residency
  - users wanting fully English-native product UX
quick_answer: >-
  Kimi is Moonshot AI's chatbot and open-weight model family. K2.5 runs a 1T-parameter MoE with 32B active and free 256K context. Kimi K2 Thinking hits 44.9% on Humanity's Last Exam. Pick it for long-document or agentic work. Skip for cheapest API or Western data residency.
---

# Kimi

Moonshot AI's chatbot and LLM family, built in Beijing by Tsinghua alumni and backed by Alibaba, Tencent, and IDG Capital at a reported $10B valuation. Alibaba holds a 36% stake after a $1B round in February 2024. Kimi launched October 2023.

The current surface runs two flagship models. **Kimi K2.5** (released January 27, 2026) is a 1T-parameter MoE with 32B active parameters, native multimodal, and a 256K context window available free to chat users. **Kimi K2 Thinking** is the open-weight reasoning model that tops Humanity's Last Exam at 44.9% with tools (51.0% in heavy mode), with up to 300 sequential tool calls.

## System Verdict

> **Pick Kimi if you need free long-context chat, open-weight frontier reasoning, or agentic workflows with sustained tool use.** The 256K context on the free tier eliminates chunking for hundred-page documents or mid-size codebases. Kimi K2 Thinking is open under a modified MIT license and sets state-of-the-art on HLE, BrowseComp, and long-horizon agent benchmarks. OpenAI-compatible API makes migration trivial.
>
> **Skip it if you need the absolute cheapest API or Western enterprise trust.** [DeepSeek](/tools/deepseek/) at ~$0.28/M input is 2x cheaper on input than Kimi's $0.60/M. Moonshot is a well-funded startup, not an established enterprise vendor. English UX, while improved, still lags ChatGPT and Claude on consumer polish.
>
> **Who uses which surface:** Free Kimi chat for long-document analysis, Kimi K2.5 API for multimodal agentic apps, Kimi K2 Thinking (open weights) for self-hosted reasoning deployments, Agent Swarm beta for teams running parallel multi-step tasks.

## Key Facts

| | |
|---|---|
| **Flagship model** | Kimi K2.5 (released January 27, 2026) |
| **Reasoning flagship** | Kimi K2 Thinking (open weights, modified MIT) |
| **Architecture** | 1T parameter MoE, 32B active per request |
| **Context window** | 256K tokens (262,144) on chat and API |
| **Multimodal** | Native vision + text training |
| **HLE benchmark** | 44.9% with tools, 51.0% heavy mode (K2 Thinking) |
| **Sequential tool calls** | 200-300 per agent task |
| **Chat pricing** | Free tier with 256K context, paid memberships available |
| **API pricing** | $0.60/M input (cache miss), $2.50-$3.00/M output |
| **Cache pricing** | $0.10-$0.15/M, up to 75% input cost reduction on repeats |
| **Agent Swarm** | Beta, up to 100 coordinated sub-agents |

Every data point above was verified on 2026-04-17. See Sources.

## What it actually is

Two surfaces on one model family: kimi.com / kimi.moonshot.cn for chat, and platform.moonshot.ai for API. The chat product offers unlimited basic conversations and full 256K context free, which removes the chunking step most competitors force on long documents.

Kimi K2.5 runs four operating modes on the API. Instant handles fast non-thinking responses. Thinking exposes chain-of-thought reasoning. Agent uses tools sequentially up to 300 steps. Agent Swarm, still in beta, coordinates up to 100 specialized sub-agents in parallel.

The real moats are the free 256K chat context, the open-weight K2 Thinking release, and the tool-call depth. Most frontier thinking models cap tool sequences far earlier. Kimi's 200-300 sequential call depth supports long-horizon automation competitors cannot match at the open-weight tier.

## When to pick Kimi

- **Long-document or codebase analysis.** 256K tokens free handles hundred-page PDFs, research papers, and mid-size repos in one pass.
- **Agentic workflows with sustained tool use.** Agent mode supports 200-300 sequential tool calls in a single task, enough for multi-step web research, deep refactors, or chained API orchestration.
- **Open-weight reasoning deployment.** Kimi K2 Thinking ships under modified MIT. Self-host for HLE-leading thinking without vendor lock-in.
- **Bilingual Chinese-English research.** Trained with deep idiom and technical-terminology coverage in both languages.
- **Cache-friendly workloads.** Automatic context caching cuts input cost up to 75% on repeated or overlapping prompts.

## When to pick something else

- **Cheapest API:** [DeepSeek](/tools/deepseek/) at ~$0.28/M input is roughly 2x cheaper on input than Kimi's $0.60/M.
- **Polished English consumer UX:** [ChatGPT](/tools/chatgpt/) or [Claude](/tools/claude/). Kimi's English chat is functional but not first-class.
- **Google Workspace integration:** [Gemini](/tools/gemini/). Kimi has no Workspace hooks.
- **Best-in-class long-form writing:** [Claude](/tools/claude/) Opus 4.7. Kimi's prose lags Claude's coherence on 10K-word outputs.
- **Broadest plugin ecosystem:** [ChatGPT](/tools/chatgpt/). No Kimi equivalent to the GPT Store.

## Pricing

Chat at [kimi.com](https://www.kimi.com/), API at [platform.moonshot.ai](https://platform.moonshot.ai/).

| Plan / Model | Price | Key details |
|---|---|---|
| Free chat (Adagio) | $0/month | Unlimited basic chat, 256K context, limited DeepResearch and agent tasks |
| Paid Membership | Tiered | Higher DeepResearch and agent quotas, current plans on kimi.com |
| Kimi K2.5 API | $0.60/M input, $2.50/M output | Cache $0.10/M, multimodal, all modes |
| Kimi K2 0905 API | $0.60/M input, $2.50/M output | Cache $0.15/M, base MoE, strong coding |
| Kimi K2 Thinking API | $0.60/M input, $2.50/M output | Cache $0.15/M, 300-step tool calling |

*Prices verified 2026-04-17 via [Moonshot AI Platform](https://platform.moonshot.ai/), [Kimi API pricing docs](https://platform.kimi.ai/docs/pricing/chat), and [OpenRouter Kimi K2.5 pricing](https://openrouter.ai/moonshotai/kimi-k2.5). API is pay-as-you-go with no minimum.*

## Against the alternatives

| | Kimi K2.5 | DeepSeek V3 | Claude Opus 4.7 | Qwen3.6 Plus |
|---|---|---|---|---|
| **Context window** | 256K | 64K | 1M | 1M |
| **Free long context** | Yes, 256K | Limited | Pro $20/mo for 1M | API pay-per-token |
| **Open weights** | K2 Thinking, modified MIT | V3 open | Closed | Apache 2.0 |
| **API input price** | $0.60/M | ~$0.28/M | $5.00/M | ~$0.325/M |
| **Tool-call depth** | 200-300 sequential | Shorter | 200+ via Claude Code | Agent-mode |
| **Multimodal** | Native vision | Text-focused | Text + vision | Text, vision, video input |
| **Best viewed as** | Long-context + agent specialist | Cheap capable API | Reasoning + writing | Open-weight multilingual |

## Failure modes

- **English UX is a translation layer.** Menu labels, error messages, and help docs read as ported from Chinese. Functional, not native.
- **Agent Swarm is beta.** Parallel 100-agent coordination is not GA for production. Test before building dependencies.
- **Free tier caps advanced features.** Basic chat is unlimited at 256K. DeepResearch and agent runs have daily quotas on the free plan.
- **API cost sits above DeepSeek.** At $0.60/M input, Kimi is ~2x DeepSeek on raw rate. Cache hits narrow the gap on repeated prompts.
- **Vendor risk.** Moonshot is well-capitalized but younger than OpenAI or Anthropic. Enterprise buyers factor in startup longevity.
- **Kimi K2 Thinking commercial clause.** Modified MIT requires Kimi branding for products exceeding 100M MAU or $20M monthly revenue. Edge case for most users but real for scaled deployments.
- **Tool-call depth is a ceiling, not a guarantee.** 300 sequential steps works on well-scoped tasks. Long loops still surface plan drift on open-ended queries.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-04-17 against [Moonshot AI Platform docs](https://platform.moonshot.ai/), [Kimi K2 Thinking on Hugging Face](https://huggingface.co/moonshotai/Kimi-K2-Thinking), [Artificial Analysis Kimi K2.5 profile](https://artificialanalysis.ai/models/kimi-k2-5), and [Artificial Analysis Kimi K2 Thinking profile](https://artificialanalysis.ai/models/kimi-k2-thinking).

## FAQ

**Is Kimi free to use?**
Yes. kimi.com provides unlimited basic chat with a 256K-token context window at no cost. DeepResearch and agent features are quota-capped on the free tier. The API is pay-as-you-go.

**What is Kimi K2.5?**
Moonshot AI's flagship released January 27, 2026. A 1T-parameter Mixture-of-Experts model activating 32B parameters per request, with native multimodal training, 256K context, and four operating modes (Instant, Thinking, Agent, Agent Swarm beta).

**What is Kimi K2 Thinking?**
The open-weight reasoning flagship. It sets state-of-the-art on Humanity's Last Exam at 44.9% with tools and 51.0% in heavy mode, supports 200-300 sequential tool calls, and ships under a modified MIT license. Weights are on [Hugging Face](https://huggingface.co/moonshotai/Kimi-K2-Thinking).

**How does Kimi compare to Claude for long documents?**
Kimi's 256K context is free. Claude Opus 4.7's 1M context is larger but requires Pro ($20/mo) or API. At equal context lengths, Claude's English prose is more coherent; Kimi's bilingual Chinese-English handling is stronger. Pick based on language mix and budget.

**Can I use Kimi as a drop-in OpenAI replacement?**
Yes. Point your OpenAI SDK at api.moonshot by changing the base URL and plugging in your Moonshot key. Most SDK features port directly.

## Sources

- [Moonshot AI API Platform](https://platform.moonshot.ai/): current models, pricing, modes
- [Kimi API pricing documentation](https://platform.kimi.ai/docs/pricing/chat): cache rates and tier details
- [Kimi K2 Thinking on Hugging Face](https://huggingface.co/moonshotai/Kimi-K2-Thinking): open-weight release, modified MIT license
- [Artificial Analysis: Kimi K2.5](https://artificialanalysis.ai/models/kimi-k2-5): third-party benchmark profile
- [Artificial Analysis: Kimi K2 Thinking](https://artificialanalysis.ai/models/kimi-k2-thinking): HLE and BrowseComp results
- [OpenRouter Kimi K2.5 pricing](https://openrouter.ai/moonshotai/kimi-k2.5): alternative gateway rates

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Research](/categories/ai-research/)
- **Comparisons:** [ChatGPT vs Kimi](/comparisons/chatgpt-vs-kimi/) · [Claude vs Kimi](/comparisons/claude-vs-kimi/) · [DeepSeek vs Kimi](/comparisons/deepseek-vs-kimi/)
