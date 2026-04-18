---
type: news
slug: 2026-03-09-openai-acquires-promptfoo
title: "OpenAI Acquires Promptfoo to Strengthen Agentic Security Testing"
date: 2026-03-09
severity: minor
summary: "OpenAI announced on March 9, 2026 its acquisition of Promptfoo, the open-source AI security testing platform trusted by 25%+ of Fortune 500 companies. Promptfoo's tech becomes part of OpenAI Frontier, the enterprise platform for building and operating AI coworkers. Open-source license preserved. OpenAI's sixth acquisition of 2026 (already matching all of 2025)."
affects: [chatgpt]
categories: [ai-automation, ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-18
last_verified: 2026-04-18
sources:
  - url: "https://openai.com/index/openai-to-acquire-promptfoo/"
    title: "OpenAI to acquire Promptfoo"
  - url: "https://www.cnbc.com/2026/03/09/open-ai-cybersecurity-promptfoo-ai-agents.html"
    title: "OpenAI to buy cybersecurity startup Promptfoo - CNBC"
  - url: "https://www.promptfoo.dev/blog/promptfoo-joining-openai/"
    title: "Promptfoo is joining OpenAI"
---

OpenAI announced on March 9, 2026 that it is acquiring **Promptfoo**, the open-source AI security testing platform. The deal folds Promptfoo's red-team, eval, and vulnerability-detection tooling into **OpenAI Frontier**, the enterprise platform for building and operating AI coworkers.

**About Promptfoo:**

- Founded 2024 by Ian Webster and Michael D'Angelo
- Open-source security testing framework for LLM applications
- Adopted by 25%+ of Fortune 500 companies
- Specializes in prompt injection detection, jailbreak evaluation, data-leak testing, tool-misuse detection, out-of-policy agent behavior detection

**Deal structure:**

- Full team joins OpenAI
- Terms not disclosed
- **Promptfoo stays open source** under current license (notable; many acquisitions close source post-acquisition)
- Existing customers continue to be serviced

**Why OpenAI bought Promptfoo:**

Agentic AI security is now the binding constraint on enterprise adoption. A ChatGPT or Claude Agent that executes code, accesses files, and calls APIs is a significantly larger attack surface than a pure chat LLM. Prompt injections can exfiltrate data, jailbreaks can make agents take unauthorized actions, and tool misuse can cascade into production incidents.

OpenAI's April 16 Agents SDK update shipped native sandbox execution as a core security primitive. Promptfoo adds the evaluation layer on top: a harness for red-teaming agents before they reach production.

**The acquisition spree:**

Promptfoo is OpenAI's **sixth acquisition of 2026** through April, matching the full-year total for 2025. Recent buys:
- **Promptfoo** (March 9): AI security
- **Astral** (March 19): open-source Python tools (Ruff, uv)
- **Hiro Finance** (April 14): personal finance
- Plus three more disclosed earlier

The pattern: OpenAI is aggressively buying developer-facing infrastructure layers. Astral's acquisition gave it control of two of the most-used Python tooling projects. Promptfoo adds the dominant open-source LLM security testing framework.

**For the category:** Standalone AI security testing startups (Lakera, Prompt Armor, Lasso Security) now have OpenAI-integrated Promptfoo as the default option. Differentiation pressure rises.

## Sources

- [OpenAI: OpenAI to acquire Promptfoo](https://openai.com/index/openai-to-acquire-promptfoo/)
- [CNBC: OpenAI to buy cybersecurity startup Promptfoo](https://www.cnbc.com/2026/03/09/open-ai-cybersecurity-promptfoo-ai-agents.html)
- [Promptfoo: joining OpenAI](https://www.promptfoo.dev/blog/promptfoo-joining-openai/)
- [Crunchbase: OpenAI 2026 acquisitions data](https://news.crunchbase.com/ma/data-openai-2023-2026-acquisitions-open-source-astral-promptfoo/)
