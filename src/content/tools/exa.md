---
type: tool
slug: exa
title: Exa AI
tagline: >-
  Neural search API for LLM applications. Returns semantically relevant web
  content for agents, RAG pipelines, and Websets B2B research.
category: ai-search
company: exa-ai
url: 'https://exa.ai'
pricing_model: freemium
price_range: "$0-$449/month"
status: active
launched: 2022-03
last_updated: 2026-06-02
last_verified: 2026-06-02
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 8
  moat: 7
  longevity: 8
facts:
  api_surface:
    value: "Exa is a neural/web search API for AI applications, with search, content retrieval, crawling-style workflows, and answer-building primitives."
    source: "https://exa.ai/docs/reference/search-api-guide"
    source_label: "Exa Search API guide"
    source_id: exa-docs
    verified_at: 2026-06-02
    next_review_at: 2026-09-02
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Free developer access covers up to 1,000 requests/month; paid endpoint pricing is request-based, so teams should model Search, Deep Search, Monitors, Answer, additional results, and AI page summaries against expected agent/search volume."
    source: "https://exa.ai/pricing/api"
    source_label: "Exa API pricing"
    source_id: exa-official
    verified_at: 2026-06-02
    next_review_at: 2026-09-02
    volatility: high
    confidence: high
  best_for:
    value: "Developers building AI agents, RAG, research tools, and web-aware products that need search/retrieval APIs rather than a consumer search UI."
    source: "https://exa.ai/"
    source_label: "Exa homepage"
    source_id: exa-official
    verified_at: 2026-06-02
    next_review_at: 2026-09-02
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Not a finished search app for end users; value depends on integration quality, ranking fit, and retrieval cost control inside your product."
    source: "https://exa.ai/docs/reference/search-api-guide"
    source_label: "Exa Search API guide"
    source_id: exa-docs
    verified_at: 2026-06-02
    next_review_at: 2026-09-02
    volatility: medium
    confidence: high
tags: [search-api, semantic-search, llm-tools, developer-tools, rag, web-search, embeddings, websets]
seo_title: 'Exa AI: Neural Search API Review & Pricing (June 2026)'
meta_description: >-
  Exa AI is a neural search API for LLM agents and RAG. Free tier covers 1,000 requests/month. Search $7, Deep Search $12-15, Monitors $15, Answer $5 per 1,000. Websets B2B research is now on a separate Starter/Pro track.
author: aipedia.wiki Editorial
best_for:
  - AI agents needing live semantic web retrieval
  - RAG pipelines where meaning beats keyword match
  - B2B lead and market research via Websets
  - drop-in search for LangChain and LlamaIndex stacks
not_best_for:
  - consumer search interfaces
  - workloads that need full Google index breadth
  - non-developer teams without API capability
quick_answer: >-
  Exa AI is a neural search API for LLM apps and agents. Free tier covers 1,000 requests/month. Core Search runs $7 per 1,000 requests; Deep Search lands at $12 (or $15 with reasoning); Monitors $15; Answer $5. Additional results and AI page summaries add usage cost. Websets starts at $49/mo. Pick it for semantic retrieval in RAG or agent pipelines. Skip for consumer UIs or Google-scale index breadth.
price_history:
  - date: 2026-03-03
    plan: "Search (with contents bundled)"
    price: "$7 per 1,000 requests"
    source: "https://exa.ai/docs/changelog/pricing-update"
    source_label: "Source"
    source_id: exa-pricing-update
    note: "Contents now included free with first 10 results"
  - date: 2026-03-03
    plan: "Deep Search"
    price: "$12 per 1,000 requests"
    source: "https://exa.ai/docs/changelog/pricing-update"
    source_label: "Source"
    source_id: exa-pricing-update
    note: "20% reduction at simplification update"
  - date: 2026-03-03
    plan: "Deep Search (Reasoning)"
    price: "$15 per 1,000 requests"
    source: "https://exa.ai/docs/changelog/pricing-update"
    source_label: "Source"
    source_id: exa-pricing-update
    note: "New reasoning tier"
  - date: 2026-05-13
    plan: "Search / Deep Search / Monitors / Answer"
    price: "$7 / $12-15 / $15 / $5 per 1,000 requests"
    source: "https://exa.ai/pricing"
    source_label: "Source"
    source_id: exa-official
    note: "May 2026 refresh - all endpoints verified, AI Page Summaries at $1/1K added separately"
---

# Exa AI

Exa AI ships a neural search API built for LLM applications, AI agents, and RAG pipelines. Queries retrieve pages by meaning rather than keyword density. The Websets product layers B2B lead research on top of the same search infrastructure.

No consumer interface. Developer-only product.

## Recent developments

- **May 12, 2026:** [Anthropic launched Claude for Legal with Microsoft 365 plug-ins and 20-plus practice-area MCP connectors](/news/2026-05-12-anthropic-claude-for-legal-plugins-microsoft-365/). For Exa, the read is that enterprise retrieval is increasingly bundled into the chat assistant via MCP, not procured separately. Exa benefits when teams want a generic neural retrieval primitive across providers, and loses to bundled retrieval when the workflow lives entirely inside one assistant.
- **March 3, 2026:** [Exa simplified search pricing](https://exa.ai/docs/changelog/pricing-update): contents for the first 10 results are now included with `search` at no extra charge, Deep Search dropped 20% to $12 per 1,000, and a new Deep Search (Reasoning) tier landed at $15 per 1,000. Most agent stacks no longer pay a separate contents charge for primary searches.

## System Verdict

> **Pick Exa if the app needs semantic web retrieval inside an LLM pipeline.** The neural index returns conceptually relevant pages when terminology differs between query and source. LangChain and LlamaIndex ship native connectors, so integration is measured in minutes, not days.
>
> **Skip it for consumer search, keyword-only lookups, or jobs that need Google-scale coverage.** Obscure, non-English, and very recent pages are patchier than SerpAPI. Index breadth is the trade-off for semantic ranking.
>
> **Who pays which tier:** Free tier (1,000 requests/month) for prototyping, pay-as-you-go core search for most production agents, Websets Starter ($49/mo) for B2B research teams, Websets Pro ($449/mo) for scaled lead-gen and enterprise workflows.

## Key Facts

| | |
|---|---|
| **Product type** | Neural search API for developers |
| **Search** | $7 per 1,000 requests (10 results, contents + highlights bundled) |
| **Deep Search** | $12 per 1,000 requests (multi-step research) |
| **Deep Search (Reasoning)** | $15 per 1,000 requests |
| **Monitors** | $15 per 1,000 requests (long-running watch jobs) |
| **Answer** | $5 per 1,000 requests (cited answer endpoint) |
| **AI Page Summaries** | $1 per 1,000 pages across all endpoints |
| **Additional results** | $1 per 1,000 results beyond 10 |
| **Free tier** | 1,000 requests/month, full API access |
| **Websets Starter** | $49/mo: 8,000 credits, 1 seat, 100 results/Webset |
| **Websets Pro** | $449/mo: 100,000 credits, 10 seats, 1,000 results/Webset |
| **Enterprise** | Custom volume pricing, SLA, security |
| **Framework integrations** | LangChain, LlamaIndex (native connectors), MCP-compatible |
| **Funding** | Series B, $85M (2025) |

Every data point above was verified against vendor documentation on 2026-06-02. See Sources.

## What it actually is

One developer product with two surfaces. The core API now ships five paid endpoints (`search`, `deep_search`, `answer`, `monitors`, `contents`) plus an AI Page Summaries add-on. Search returns neural results with full page text and highlights bundled for the first 10 hits. Deep Search runs multi-step research with optional reasoning. Monitors watches a query and fires when new matches appear. Answer ships cited responses for question-style retrieval. Websets sits on top and uses the same index for B2B research, verifying every row against user-specified criteria.

The March 3, 2026 pricing update bundled content extraction into base search cost. Most agents no longer pay a separate scrape fee.

The moats: a neural index trained for LLM-style queries, native framework integrations, MCP compatibility, and Websets as a second revenue surface that locks research teams in. The weakness is index breadth. Exa is narrower than Google on obscure domains and very recent pages.

## When to pick Exa

- **Building an AI agent that needs live web context.** Semantic ranking returns intent-matched pages without heavy post-filtering.
- **Wiring RAG to dynamic web sources.** Contents endpoint delivers clean page text up to 20k tokens. No separate scraper layer needed.
- **Running B2B lead research or market mapping.** Websets verifies every result against criteria, reducing false positives that kill manual list-building.
- **Shipping inside a LangChain or LlamaIndex stack.** Drop-in connectors mean no glue code.
- **Cost-sensitive prototyping.** $7 per 1,000 requests undercuts SerpAPI at agent scale.

## When to pick something else

- **Consumer search UI for end users:** [Perplexity](/tools/perplexity/) or [Kagi](/tools/kagi/). Exa has no front end.
- **Maximum index breadth on obscure or non-English pages:** SerpAPI (Google-backed).
- **Paid-search quality without building an app:** [Kagi](/tools/kagi/).
- **Academic paper retrieval specifically:** [Consensus](/tools/consensus/) or [Elicit](/tools/elicit/).
- **Cited answer engine for research tasks:** [Perplexity](/tools/perplexity/) or [You.com](/tools/you-com/).

## Pricing

Pricing via [exa.ai/pricing](https://exa.ai/pricing):

| Plan / Endpoint | Price | What you get |
|---|---|---|
| Free | $0 | 1,000 requests/month, full API access |
| Search | $7 / 1K requests | 10 neural results with contents + highlights bundled; $1/1K for extra results |
| Deep Search | $12 / 1K requests | Multi-step neural research |
| Deep Search (Reasoning) | $15 / 1K requests | Adds reasoning over multi-step results |
| Answer | $5 / 1K requests | Cited answer endpoint |
| Monitors | $15 / 1K requests | Long-running watch jobs |
| Contents endpoint | $1 / 1K pages | Standalone page retrieval |
| AI Page Summaries | $1 / 1K pages | Cross-endpoint summary add-on |
| Websets Starter | $49/mo | 8,000 credits, 1 seat, 100 results/Webset, 2 concurrent |
| Websets Pro | $449/mo | 100,000 credits, 10 seats, 1,000 results/Webset, 10 concurrent |
| Enterprise | Custom | Volume pricing, SLA, security review |

Prices verified 2026-06-02 via [Exa API pricing](https://exa.ai/pricing/api) and [Exa pricing update](https://exa.ai/docs/changelog/pricing-update). Startups and education projects can apply for $1,000 in free credits.

## Against the alternatives

| | Exa AI | SerpAPI | Tavily |
|---|---|---|---|
| **Ranking approach** | Neural semantic | Google keyword | Agent-optimized mix |
| **Index breadth** | Narrower | Google-scale | Mid |
| **Content retrieval** | Bundled (contents endpoint) | Separate scrape | Bundled |
| **Free tier** | 1,000 requests/month | Limited trial | Monthly free quota |
| **Framework integrations** | LangChain, LlamaIndex native | Community wrappers | LangChain native |
| **B2B research product** | Websets | None | None |
| **Best viewed as** | Semantic retrieval for LLMs | Google proxy | Agent-tuned search |

## Failure modes

- **Index breadth is narrower than Google.** Obscure domains, non-English content, and very recent pages can be missing. Production pipelines sometimes pair Exa with SerpAPI as a fallback.
- **No consumer UI.** End users need an application built on top. Not a Google replacement.
- **Latency spikes under load.** Neural indexing is compute-heavy. Average 800ms is competitive, but peaks happen.
- **Pay-as-you-go cost can grow unnoticed.** High-traffic apps need usage alerts. Volume pricing is worth negotiating once past 100K requests/month.
- **Thinner ecosystem than SerpAPI.** Fewer tutorials, fewer third-party wrappers, smaller Stack Overflow footprint.
- **Websets credits expire.** Unused Starter credits do not roll over indefinitely. Teams with bursty usage should size Pro against peak month, not average.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-02 against [Exa API pricing](https://exa.ai/pricing/api), [Exa pricing update](https://exa.ai/docs/changelog/pricing-update), and [Exa Series B announcement](https://exa.ai/blog/announcing-series-b).

## FAQ

**Is Exa free?**
Yes, for prototyping. The free tier includes 1,000 requests per month with full API access. Pay-as-you-go Search starts at $7 per 1,000 requests, Deep Search at $12, Answer at $5, and Monitors at $15. AI Page Summaries are $1 per 1,000 pages across endpoints.

**What is Websets?**
A B2B research product built on the Exa index. Users describe criteria in natural language. AI agents verify each result before returning it. Starter is $49/mo; Pro is $449/mo.

**Exa vs SerpAPI?**
SerpAPI proxies Google keyword results. Exa runs a neural index trained on LLM-style queries. Pick SerpAPI for breadth and exact Google parity. Pick Exa for semantic intent matching and bundled content retrieval.

**Does Exa work with LangChain and LlamaIndex?**
Yes. Both frameworks ship native Exa connectors. Drop-in tool for agent and RAG workflows.

**What happened to Metaphor Systems?**
Exa is the rebrand of Metaphor Systems from 2023. Same neural search API, broader positioning toward the AI developer market.

## Sources

- [Exa pricing](https://exa.ai/pricing): current core API and Websets pricing
- [Exa pricing update](https://exa.ai/docs/changelog/pricing-update): March 2026 pricing simplification notes
- [Exa Series B announcement](https://exa.ai/blog/announcing-series-b): $85M raise, product direction
- [Exa API documentation](https://docs.exa.ai): full API reference and integration guides

## Related

- **Category:** [AI Search](/categories/ai-search/)
- **Comparisons:** [Exa AI vs Kagi](/compare/exa-vs-kagi/) | [Exa AI vs Perplexity](/compare/exa-vs-perplexity/) | [Exa AI vs Phind](/compare/exa-vs-phind/) | [Exa AI vs You.com](/compare/exa-vs-you-com/)
