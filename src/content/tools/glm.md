---
type: tool
slug: glm
title: GLM (ChatGLM)
tagline: Z.AI's GLM model family, with GLM-5.1 positioned for long-horizon agentic engineering, 200K context, open MIT weights, and API pricing from $1.40/M input tokens.
category: ai-chatbots
secondary_categories: [ai-coding, ai-research]
company: Zhipu AI (Z.ai)
url: https://z.ai
github_url: https://huggingface.co/zai-org/GLM-5.1
pricing_model: freemium
price_range: "Free Flash models / GLM-5.1 API $1.40/M input, $4.40/M output"
status: active
launched: 2022-08
last_updated: 2026-06-02
last_verified: 2026-06-02
update_frequency: quarterly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 7
  value: 8
  moat: 4
  longevity: 7
facts:
  best_for:
    value: Best for teams comparing Chinese frontier/open-weight model options, especially when Z.AI API access, GLM-5.1 open
      weights, long context, and agentic coding workflows matter.
    source: https://docs.z.ai/guides/llm/glm-5.1
    source_label: Z.AI GLM-5.1 docs
    source_id: glm-docs
    verified_at: '2026-06-02'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  flagship_model:
    value: GLM-5.1 is Z.AI's current flagship model in public documentation, with 200K context, 128K maximum output, and an
      MIT-licensed Hugging Face release.
    source: https://docs.z.ai/guides/llm/glm-5.1
    source_label: Z.AI GLM-5.1 docs
    source_id: glm-huggingface
    verified_at: '2026-06-02'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  pricing_anchor:
    value: Z.AI pricing lists GLM-5.1 at $1.40/M input tokens and $4.40/M output tokens; GLM-5 at $1.00/M input and $3.20/M
      output; GLM-4.7-Flash and GLM-4.5-Flash are free.
    source: https://docs.z.ai/guides/overview/pricing
    source_label: Z.AI pricing
    source_id: glm-pricing
    verified_at: '2026-06-02'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  api_available:
    value: Z.AI provides hosted API access, OpenAI-compatible examples, official SDK examples, tool/function calling, context
      caching, structured output, and MCP support for GLM-family models.
    source: https://docs.z.ai/guides/llm/glm-5.1
    source_label: Z.AI GLM-5.1 docs
    source_id: glm-docs
    verified_at: '2026-06-02'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  open_source_or_local:
    value: GLM-5.1 is available on Hugging Face under an MIT license and can be served locally through supported frameworks
      such as vLLM, SGLang, Transformers, KTransformers, and compatible quantization routes.
    source: https://huggingface.co/zai-org/GLM-5.1
    source_label: GLM-5.1 on Hugging Face
    source_id: glm-huggingface
    verified_at: '2026-06-02'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  watch_out_for:
    value: International teams should validate language coverage, API availability, compliance, and documentation fit before
      treating GLM as a drop-in OpenAI or Anthropic alternative.
    source: https://docs.z.ai/guides/llm/glm-5.1
    source_label: Z.AI GLM-5.1 docs
    source_id: glm-docs
    verified_at: '2026-06-02'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
tags: [open-source, chinese-llm, coding, agentic, glm-5, zhipu-ai, z-ai, swe-bench, api]
seo_title: "GLM (ChatGLM): Features, Pricing & Review (June 2026)"
meta_description: "GLM-5.1 from Z.AI is a long-horizon agentic engineering model with 200K context, 128K max output, MIT Hugging Face weights, and API pricing at $1.40/M input and $4.40/M output."
author: "aipedia.wiki Editorial"
best_for:
  - agentic coding and SWE-bench-style tasks
  - developers wanting open MIT frontier coding weights
  - bilingual Chinese-English professional workflows
  - teams evaluating Chinese frontier-model APIs and open releases
not_best_for:
  - polished English consumer chat
  - teams needing Western data residency on hosted API
  - users prioritizing writing quality over coding
quick_answer: >-
  GLM is Z.AI's LLM family. GLM-5.1 is the current flagship in public docs: 200K context, 128K max output, long-horizon agentic engineering positioning, MIT Hugging Face weights, and API pricing at $1.40/M input and $4.40/M output. Pick it for open-weight agentic coding evaluation; skip for polished English consumer chat or lowest-cost API work.
---

# GLM (ChatGLM)

Zhipu AI's GLM LLM family now surfaces publicly through **Z.AI**. The current flagship in Z.AI's public documentation is **GLM-5.1**, a long-horizon agentic engineering model with 200K context, 128K maximum output, tool/function calling, MCP support, OpenAI-compatible API examples, and an MIT-licensed Hugging Face release.

Z.AI's documentation and Hugging Face model card report GLM-5.1 at 58.4 on SWE-Bench Pro and position it as aligned with Claude Opus 4.6 overall, with stronger long-horizon execution claims for complex engineering tasks.

## System Verdict

> **Pick GLM if you need an open-weight coding model near the SWE-Bench frontier.** GLM-5.1 is downloadable under MIT, exposes OpenAI-compatible API examples, supports local serving routes such as vLLM/SGLang/Transformers, and is explicitly tuned for long-horizon agentic engineering tasks.
>
> **Skip it if you want a polished English consumer product or the cheapest API.** Z.AI chat is functional but secondary to API/open-weight evaluation. [DeepSeek](/tools/deepseek/) and [Qwen](/tools/qwen/) can be cheaper or broader depending on the model and region.
>
> **Who uses which surface:** GLM-4.7-Flash or GLM-4.5-Flash for free/light tests, GLM-5.1 API for long-context and agentic engineering experiments, and self-hosted GLM-5.1 weights when MIT licensing and local control matter.

## Key Facts

| | |
|---|---|
| **Flagship model** | GLM-5.1 (open-sourced April 7, 2026 under MIT) |
| **Previous flagship** | GLM-5 |
| **Architecture** | MoE; Hugging Face lists GLM-5.1 at 754B parameters |
| **Context window** | 200K tokens |
| **Max output** | 128K tokens per response |
| **SWE-Bench Pro** | 58.4% (GLM-5.1) · above the cited OpenAI frontier baseline at 57.7% and Claude Opus 4.6 at 57.3% |
| **SWE-bench Verified** | 77.8% (GLM-5) |
| **API pricing** | GLM-5.1 $1.40/M input and $4.40/M output · GLM-5 $1.00/M input and $3.20/M output |
| **Free tier** | GLM-4.7-Flash and GLM-4.5-Flash free in the Z.AI pricing table |
| **License** | MIT on GLM-5.1 weights |

Every data point above was verified on 2026-06-02. See Sources.

## What it actually is

A single LLM family covering two audiences: developers calling the API or self-hosting weights, and consumers chatting at z.ai or chatglm.cn. The model family is optimized for agentic engineering and long-horizon coding, not generalist chat.

GLM-5.1 ships as open weights under MIT on [Hugging Face](https://huggingface.co/zai-org/GLM-5.1). That combination, MIT license plus frontier SWE-Bench scores, is rare. Most labs at this benchmark tier keep weights closed.

The real moat is the open-weight, long-horizon coding-and-agent positioning. The consumer chat product is secondary to API, local serving, and agentic engineering evaluation.

## When to pick GLM

- **Agentic coding workloads.** Z.AI reports GLM-5.1 at 58.4 on SWE-Bench Pro and emphasizes long-running engineering loops, tool use, and iterative optimization.
- **Cursor, Cline, or Continue.dev backend swap.** GLM supports OpenAI-compatible API examples and tool/function calling, so it can slot into editors and agents that accept custom OpenAI-style endpoints.
- **Self-hosted frontier coding.** MIT-licensed weights permit local deployment, fine-tuning, and commercial use without licensing fees.
- **Long-context engineering and office tasks.** Z.AI lists 200K context, 128K max output, MCP/tool support, structured output, and improvements across front-end development, documents, slides, PDFs, and spreadsheets.
- **Bilingual Chinese-English technical work.** Legal, finance, and engineering teams operating across both languages get trained-in-parallel fluency.

## When to pick something else

- **Cheapest API for general chat:** [DeepSeek](/tools/deepseek/) or [Qwen](/tools/qwen/), depending on current endpoint and region.
- **Polished English writing:** [Claude](/tools/claude/) Opus 4.7 or [ChatGPT](/tools/chatgpt/). GLM's English is functional, not best-in-class.
- **Broadest open-weight coverage:** [Qwen](/tools/qwen/). Apache 2.0 across more sizes, wider language coverage, more active monthly releases.
- **Google Workspace integration:** [Gemini](/tools/gemini/). GLM has no Workspace hooks.
- **Consumer-grade product polish:** [ChatGPT](/tools/chatgpt/) or [Claude](/tools/claude/). Z.ai chat is developer-adjacent, not consumer-first.

## Pricing

Usage pricing via [Z.AI pricing](https://docs.z.ai/guides/overview/pricing). Z.AI also lists free Flash models for lightweight tests; teams still need to verify regional availability, account limits, and any private-contract terms before committing production traffic.

| Plan / Model | Price | Notes |
|---|---|---|
| GLM-5.1 | $1.40/M input, $4.40/M output | Current flagship for long-horizon agentic engineering |
| GLM-5 | $1.00/M input, $3.20/M output | Previous flagship in the Z.AI price table |
| GLM-5-Air | $0.10/M input, $1.00/M output | Lower-cost GLM-5 family endpoint |
| GLM-5-Flash | Free | Lightweight/free endpoint in the current price table |
| GLM-4.7-Flash | Free | Legacy free Flash endpoint |
| GLM-4.5-Flash | Free | Legacy free Flash endpoint |

*Prices verified 2026-06-02 via [Z.AI pricing](https://docs.z.ai/guides/overview/pricing). Self-hosting GLM-5.1 weights can avoid hosted API usage fees, but it shifts cost to GPUs, serving infrastructure, monitoring, and security review.*

## Against the alternatives

| | GLM-5.1 | Claude | DeepSeek | Qwen |
|---|---|---|---|---|
| **Open weights** | MIT for GLM-5.1 | Closed for frontier Claude models | Open and hosted options vary by model | Broad open-weight family coverage |
| **Coding/agent angle** | Long-horizon agentic engineering, tool use, MCP | Polished reasoning and coding assistant experience | Cost-efficient reasoning and coding alternatives | Strong multilingual and open-model coverage |
| **API input price** | $1.40/M on GLM-5.1 | Higher frontier-model pricing | Often cheaper, depending on endpoint | Varies by model and region |
| **Context window** | 200K | Larger Claude windows on selected plans/models | Varies by model | Varies by model |
| **English polish** | Functional | Strongest | Moderate | Moderate |
| **Best viewed as** | Open-weight coding leader | Reasoning specialist | Cheap capable API | Open-weight multilingual |

## Failure modes

- **Not the cheapest general API.** GLM-5.1 pricing is attractive for open-weight frontier coding evaluation, but general chat workloads should still compare DeepSeek, Qwen, and other lower-cost endpoints.
- **Z.ai consumer UX lags.** The chat interface is functional in English but built for a Chinese-first audience. Menu labels, error messages, and onboarding trail ChatGPT or Claude.
- **Thin competitive moat.** SWE-Bench leaderboard positions shift monthly. DeepSeek, Qwen, and Kimi are all active challengers with comparable release cadence.
- **Output-heavy tasks can get expensive.** GLM-5.1 output is $4.40/M tokens in the public price table, so agent loops that emit long plans, patches, logs, or reports need caps.
- **Third-party tutorials are thinner.** Smaller global developer community than ChatGPT or Claude. Fewer Stack Overflow threads, fewer YouTube walkthroughs.
- **Hosted API may not satisfy every compliance program.** International teams should review data residency, account availability, logging, and procurement terms. Self-hosted weights are the workaround when local control matters.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility, Value, Moat, Longevity; unweighted average). Last verified 2026-06-02 against [Z.AI GLM-5.1 docs](https://docs.z.ai/guides/llm/glm-5.1), [Z.AI pricing](https://docs.z.ai/guides/overview/pricing), and [GLM-5.1 on Hugging Face](https://huggingface.co/zai-org/GLM-5.1).

## FAQ

**Is GLM free to use?**
Partially. Z.AI lists GLM-5-Flash, GLM-4.7-Flash, and GLM-4.5-Flash as free in the public pricing table. GLM-5.1 is paid on the hosted API at $1.40/M input and $4.40/M output, or can be self-hosted from MIT-licensed weights if the team has infrastructure.

**What changed between GLM-5 and GLM-5.1?**
Z.AI's current public docs position GLM-5.1 as the flagship long-horizon agentic engineering model. Compared with GLM-5, GLM-5.1 adds the MIT Hugging Face release, public GLM-5.1 pricing, 200K context, 128K maximum output, MCP/tool support, and the 58.4 SWE-Bench Pro claim.

**Can I use GLM with Cursor or VS Code?**
Usually, yes. GLM docs include OpenAI-compatible examples. Use a custom endpoint in Cursor, Cline, Continue.dev, or any editor that accepts a custom OpenAI-style endpoint, then verify tool-calling behavior before relying on it for autonomous edits.

**Is GLM faster or slower than Claude or GPT?**
Inference latency depends on the deployment. Self-hosted GLM-5.1 on modern hardware runs within the same range as hosted Claude Sonnet or GPT-5.3. Hosted Z.ai API performance varies with regional load.

## Sources

- [Z.AI GLM-5.1 docs](https://docs.z.ai/guides/llm/glm-5.1): flagship model details, context, max output, tool calling, MCP, benchmarks
- [Z.AI pricing](https://docs.z.ai/guides/overview/pricing): hosted API prices and free Flash model entries
- [GLM-5.1 on Hugging Face](https://huggingface.co/zai-org/GLM-5.1): open-weight release, MIT license, local serving notes

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Coding](/categories/ai-coding/)
- **Comparisons:** [ChatGPT vs GLM](/compare/chatgpt-vs-glm/)
