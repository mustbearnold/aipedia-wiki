---
type: news
slug: 2026-04-17-cerebras-ipo-filing
title: "Cerebras IPO Filing: Nasdaq CBRS, 2025 Revenue and OpenAI Deal"
date: 2026-04-17
severity: major
summary: "Cerebras Systems filed its S-1 on April 17, 2026 to list on Nasdaq under CBRS. The filing spotlights $510M in 2025 revenue, 76% year-over-year growth, reported profitability, and a large OpenAI compute deal that changes the Nvidia-alternative story."
affects: []
categories: [ai-research]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-02
last_verified: 2026-05-02
sources:
  - url: "https://techcrunch.com/2026/04/18/ai-chip-startup-cerebras-files-for-ipo/"
    title: "AI chip startup Cerebras files for IPO - TechCrunch"
  - url: "https://www.cnbc.com/2026/04/17/cerebras-new-ipo-ai-chips.html"
    title: "Cerebras files to go public after scrapping IPO plans last year - CNBC"
  - url: "https://seekingalpha.com/news/4576308-ai-chipmaker-cerebras-files-for-ipo-following-mega-deal-with-openai"
    title: "Cerebras files for IPO following mega deal with OpenAI - Seeking Alpha"
  - url: "https://finance.yahoo.com/markets/stocks/articles/nvidia-rival-cerebras-reveals-us-202745923.html"
    title: "Nvidia rival Cerebras discloses US IPO filing - Yahoo Finance"
  - url: "https://siliconangle.com/2026/04/17/ai-chip-developer-cerebras-systems-files-go-public-amid-rapid-revenue-growth/"
    title: "Cerebras files to go public amid rapid revenue growth - SiliconANGLE"
---

**Cerebras Systems** filed its S-1 on April 17, 2026 to list on Nasdaq under the ticker **CBRS**. Target: **$22-25B valuation** and **~$2B raise** in Q2 2026. The filing lands after a transformational 2025 anchored by OpenAI and Amazon compute deals.

## Fast answer

Cerebras is trying to become the first public pure-play wafer-scale AI chip stock. The IPO filing matters because it pairs **$510M in 2025 revenue**, **76% year-over-year growth**, a reported swing to profitability, and a major OpenAI compute relationship under one Nasdaq ticker: **CBRS**.

## Key financial numbers (from S-1)

| Metric | 2024 | 2025 |
|---|---|---|
| Revenue | ~$290M | **$510M** |
| YoY growth | n/a | **+76%** |
| Net income (loss) | -$485M | **+$87.9M** |

2025 is Cerebras's **first profitable year** after nearly a decade of losses. Revenue growth of 76% is unusually high for a hardware company at this scale.

## The OpenAI deal (changes everything)

The biggest single disclosure in the S-1:

- **$20B+ multi-year compute contract** with OpenAI
- **750 megawatts of compute** delivered through 2028 (250 MW/year across 2026, 2027, 2028)
- **$1B loan from OpenAI to Cerebras** at 6% annual interest, December 2025, to fund data center build-out
- **33.4M Class N non-voting share warrants** issued to OpenAI in December 2025

Translation: OpenAI is now both Cerebras's **largest customer AND a major equity stakeholder** (via warrants). That single relationship accounts for the bulk of 2025's revenue and drives the 2026-2028 forward pipeline.

## The Amazon deal (signed March 2026)

- **Amazon purchased ~$270M** in Cerebras Class N stock
- **Cloud partnership** enables AWS customers to run workloads on Cerebras chips
- Positions Cerebras on AWS's rapidly expanding AI accelerator marketplace alongside NVIDIA, AMD, and AWS's own Trainium

Two hyperscalers (OpenAI as frontier-lab customer, Amazon as cloud distribution) now have direct financial stakes in Cerebras's success.

## Why this is a Nvidia story

**Cerebras makes wafer-scale chips.** The WSE-3 (Wafer-Scale Engine, third generation) is the largest chip in commercial AI inference: 46,225 mm², 850,000 cores on a single wafer. Fundamentally different architecture from NVIDIA's multi-GPU Blackwell and Rubin systems.

The pitch: for certain workloads (large-model inference, long-context decoding), wafer-scale chips deliver better latency and lower energy-per-token than distributed GPU clusters. Cerebras has been validating that pitch with real enterprise deployments for two years.

If Cerebras successfully IPOs at $22-25B while OpenAI is spending billions on Cerebras compute, it establishes the first **credibly-funded alternative architecture** to NVIDIA's CUDA ecosystem. Public-market capital funds continued R&D, next-gen chips, and customer acquisition outside the NVIDIA gravity well.

## Second IPO attempt

Cerebras **scrapped its first IPO attempt in late 2024** when market conditions turned against unprofitable hardware listings. The 2026 filing lands with:

- Profitability now achieved
- Anchor customer (OpenAI) contractually committed through 2028
- Hyperscaler distribution (Amazon) signed
- AI-chip IPO market recovered (CoreWeave listed at $109/share, up 40%+ since)

Very different conditions. Investors who passed in 2024 are expected to re-engage.

## What to watch Monday

**Market reaction** drops Monday April 20 after the weekend absorbs the filing. Key signals:

- **NVIDIA share move.** Cerebras positioned as "Nvidia rival" in headlines. Any material NVIDIA dip on open would be unusual given NVIDIA's $1T+ order book, but the narrative matters for AI-infrastructure ETFs.
- **AI-infra ETF flows** (especially those weighted toward AI accelerator diversity).
- **Anthropic / Google TPU / AWS Trainium response.** All three have alternatives to NVIDIA; Cerebras's public success would validate the alt-architecture thesis for all of them.
- **Retail interest.** CBRS is the first pure-play wafer-scale AI chip stock. Reddit and X retail flows will test how many investors want alternative-architecture exposure.

## Comparables in the public-listed AI infrastructure universe

| Company | Listed | Market cap / target | What they do |
|---|---|---|---|
| NVIDIA | Public since 1999 | ~$3.5T | GPU + CUDA ecosystem, market leader |
| CoreWeave | IPO March 2025 | ~$45B | NVIDIA GPU cloud reseller |
| **Cerebras** | **IPO filing April 17, 2026** | **$22-25B target** | Wafer-scale AI accelerators |
| Groq | Private ($2.8B) | n/a | Fast inference ASIC |
| SambaNova | Private ($5.1B) | n/a | Dataflow AI chips |
| Tenstorrent | Private ($2B+) | n/a | RISC-V AI chips |

Cerebras at $22-25B would be the **second-largest AI infrastructure public listing** since CoreWeave, and the first alt-architecture one.

## What this means for the aipedia tool catalog

**No direct tool impact.** Cerebras is chip infrastructure, not a user-facing AI tool. But the second-order effects flow through:

- **[Claude](/tools/claude/), [ChatGPT](/tools/chatgpt/), [Gemini](/tools/gemini/) pricing.** If Cerebras successfully IPOs and scales WSE-3 production, inference costs for certain workload types could drop meaningfully. Providers pass some of that through to users.
- **AI-coding agents** ([Claude Code](/tools/claude-code/), [Codex](/tools/codex/), [Cursor](/tools/cursor/)) that use large-context inference heavily benefit directly from cheaper wafer-scale inference if their vendors adopt Cerebras.

No immediate change for end users. Medium-term, this is how structural cost curves shift for AI software.

## Sources

- [TechCrunch: AI chip startup Cerebras files for IPO](https://techcrunch.com/2026/04/18/ai-chip-startup-cerebras-files-for-ipo/)
- [CNBC: Cerebras files to go public after scrapping IPO plans last year](https://www.cnbc.com/2026/04/17/cerebras-new-ipo-ai-chips.html)
- [Seeking Alpha: Cerebras files for IPO following mega deal with OpenAI](https://seekingalpha.com/news/4576308-ai-chipmaker-cerebras-files-for-ipo-following-mega-deal-with-openai)
- [Yahoo Finance: Nvidia rival Cerebras discloses US IPO filing](https://finance.yahoo.com/markets/stocks/articles/nvidia-rival-cerebras-reveals-us-202745923.html)
- [SiliconANGLE: Cerebras files to go public amid rapid revenue growth](https://siliconangle.com/2026/04/17/ai-chip-developer-cerebras-systems-files-go-public-amid-rapid-revenue-growth/)
