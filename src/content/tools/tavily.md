---
type: tool
slug: tavily
title: Tavily
tagline: Real-time search, extract, crawl, map, and research APIs for AI agents and RAG workflows, priced by API credits.
category: ai-search
secondary_categories: [ai-infrastructure, ai-automation]
company: Tavily
url: https://www.tavily.com
pricing_model: freemium
price_range: "Free 1,000 credits/month, $0.008/credit PAYG, $30-$500 monthly plans, Enterprise custom"
status: active
launched: 2023
last_updated: 2026-06-28
last_verified: 2026-06-28
update_frequency: monthly
seo_title: "Tavily Review: Search API Pricing, Credits & Best Use Cases (June 2026)"
meta_description: "Tavily review refreshed June 28, 2026: AI search API, extract, crawl, map, research mode, API credit costs, plan guidance, and alternatives."
author: "aipedia.wiki Editorial"
best_plan: "Use Researcher for prototypes, Project at $30/month for early apps, Pay As You Go for spiky usage, and Enterprise when custom rate limits, privacy, support, or volume matter."
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
  best_for:
    value: "AI developers and product teams that need real-time web search, content extraction, crawling, site mapping, and deep research APIs for agents or RAG workflows."
    source: "https://www.tavily.com"
    source_label: "Tavily official site"
    source_id: tavily-official
    verified_at: 2026-06-28
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Tavily docs list Researcher free with 1,000 credits/month, Pay as you go at $0.008/credit, Project at $30/month for 4,000 credits, Bootstrap at $100/month for 15,000 credits, Startup at $220/month for 38,000 credits, Growth at $500/month for 100,000 credits, and Enterprise custom."
    source: "https://docs.tavily.com/documentation/api-credits"
    source_label: "Tavily credits and pricing docs"
    source_id: tavily-api-credits
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
  api_credit_costs:
    value: "Basic search costs 1 credit, advanced search costs 2 credits, basic extract costs 1 credit per 5 successful URL extractions, advanced extract costs 2 credits per 5 successful URL extractions, mapping costs 1 or 2 credits per 10 successful pages, and Tavily Research has dynamic credit boundaries."
    source: "https://docs.tavily.com/documentation/api-credits"
    source_label: "Tavily credits and pricing docs"
    source_id: tavily-api-credits
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
  watch_out_for:
    value: "Credit burn depends on search depth, extraction depth, mapped pages, crawl size, research model, retries, and agent loop behavior, so teams should cap request volume before production."
    source: "https://docs.tavily.com/documentation/api-credits"
    source_label: "Tavily credits and pricing docs"
    source_id: tavily-api-credits
    verified_at: 2026-06-28
    next_review_at: 2026-07-12
    volatility: high
    confidence: high
tags: [ai-search, search-api, web-search, rag, agents, extraction, crawl, research-api, grounding]
best_for:
  - agents that need web search as a tool
  - RAG workflows that need fresh public web context
  - developer teams that need search plus extract, crawl, map, and research endpoints
  - apps that need predictable API-credit budgeting
not_best_for:
  - people who want a consumer answer engine UI
  - teams that only need vector search over owned documents
  - high-compliance web collection without legal review
  - buyers who need a marketplace of site-specific scrapers
quick_answer: >-
  Tavily is best when an AI app needs web search and content extraction as an API. Use it for search, extract, crawl, map, and research workflows inside agents or RAG systems. Compare Exa, You.com, Perplexity Sonar, Brave Search API, and Firecrawl before production because each prices freshness, summaries, extraction, and research differently.
price_history:
  - date: 2026-06-28
    plan: "Researcher"
    price: "Free"
    source: "https://docs.tavily.com/documentation/api-credits"
    source_label: "Tavily credits and pricing docs"
    source_id: tavily-api-credits
    verified_at: 2026-06-28
    note: "1,000 API credits per month, no credit card required."
  - date: 2026-06-28
    plan: "Pay as you go"
    price: "$0.008/credit"
    source: "https://docs.tavily.com/documentation/api-credits"
    source_label: "Tavily credits and pricing docs"
    source_id: tavily-api-credits
    verified_at: 2026-06-28
    note: "Tavily describes this as per-usage billing once the plan credit limit is reached."
  - date: 2026-06-28
    plan: "Project / Bootstrap / Startup / Growth"
    price: "$30 / $100 / $220 / $500 per month"
    source: "https://docs.tavily.com/documentation/api-credits"
    source_label: "Tavily credits and pricing docs"
    source_id: tavily-api-credits
    verified_at: 2026-06-28
    note: "Monthly plans include 4,000, 15,000, 38,000, and 100,000 API credits respectively."
  - date: 2026-06-28
    plan: "Enterprise"
    price: "Custom"
    source: "https://www.tavily.com/pricing"
    source_label: "Tavily pricing"
    source_id: tavily-pricing
    verified_at: 2026-06-28
    note: "Pricing page lists custom API calls, custom rate limits, enterprise-grade support, SLAs, security, and privacy."
---

# Tavily

Tavily is a real-time web search and content API for AI agents and RAG workflows. It is built for developers who need search, extraction, crawl, site map, and research endpoints instead of a consumer-facing search product.

The easiest mental model: Tavily is an agent search primitive. It belongs in the same buyer conversation as [Exa](/tools/exa/), [You.com](/tools/you-com/), Perplexity Sonar, Brave Search API, and [Firecrawl](/tools/firecrawl/).

## System Verdict

> **Pick Tavily when agents need current web context through an API.** It is a strong fit for search, extract, crawl, map, and research calls inside AI products.
>
> **Skip it when you want a human answer engine.** [Perplexity](/tools/perplexity/), [ChatGPT](/tools/chatgpt/), [Gemini](/tools/gemini/), or [Kagi](/tools/kagi/) fit better for individual research workflows.
>
> **Best plan guidance:** start with Researcher to test output quality. Use Project when a prototype needs predictable credits. Use Pay As You Go for spiky usage. Move to Enterprise only when rate limits, privacy, security, SLAs, or custom volume matter.

## Key Facts

| | |
|---|---|
| Core job | Real-time search, extract, crawl, map, and research APIs |
| Best buyer | AI agents and RAG product teams |
| Free tier | 1,000 API credits/month |
| Pay-as-you-go | $0.008 per API credit |
| Monthly plans | Project $30, Bootstrap $100, Startup $220, Growth $500 |
| Basic search | 1 credit/request |
| Advanced search | 2 credits/request |
| Research mode | Dynamic credit boundaries by model |
| Main cost risk | Agent loops, crawl size, extraction depth, research mode, and retries |

## When To Pick Tavily

- **Your agent needs live web search.** Tavily is useful when an LLM workflow needs a current search API rather than a static document index.
- **You need search plus extraction.** The same vendor can handle search results and successful URL extraction.
- **You want crawl and map options.** Site mapping and crawl pricing make it more useful than a search-only API for some workflows.
- **You need credit math before launch.** Tavily documents per-request credit costs, which helps teams budget agent loops.
- **You are building RAG over public web context.** Tavily can be the fresh-web layer beside vector search and owned-document retrieval.

## When To Pick Something Else

- **Semantic retrieval API:** [Exa](/tools/exa/) when semantic search, contents, answer, monitors, and agent endpoints are the core need.
- **Grounding and research APIs:** [You.com](/tools/you-com/) when the buyer wants search, contents, research, and finance research APIs together.
- **Web scraping and crawling:** [Firecrawl](/tools/firecrawl/) when cleaned markdown, structured extraction, screenshots, and scrape/crawl workflows dominate.
- **Consumer answer engine:** [Perplexity](/tools/perplexity/) when a person wants cited answers rather than an API.
- **Private paid search:** [Kagi](/tools/kagi/) when the buyer is an individual search user, not a product team.

## Pricing

Tavily pricing was checked on June 28, 2026 against the official pricing page and credits documentation.

| Plan | Price | Included credits | Buyer fit |
|---|---|---|---|
| Researcher | Free | 1,000/month | First tests and small prototypes |
| Pay as you go | $0.008/credit | Per usage | Spiky or uncertain workloads |
| Project | $30/month | 4,000/month | Early apps and hobby projects |
| Bootstrap | $100/month | 15,000/month | Higher prototype volume |
| Startup | $220/month | 38,000/month | Growing production usage |
| Growth | $500/month | 100,000/month | Higher-volume production |
| Enterprise | Custom | Custom | Custom calls, rate limits, support, security, and SLAs |

Credit usage depends on endpoint choice. Basic search costs 1 credit per request; advanced search costs 2. Basic extract costs 1 credit per 5 successful URL extractions; advanced extract costs 2. Regular mapping costs 1 credit per 10 successful pages; mapping with instructions costs 2. Crawl combines mapping and extraction costs. Tavily Research has dynamic credit boundaries: model mini has 4 to 110 credits per request, while model pro has 15 to 250.

## Failure Modes

- **A small agent loop can become many searches.** Retries, follow-ups, planning steps, and evaluation runs can multiply credit usage.
- **Research mode is not a flat-cost answer.** Dynamic boundaries make Tavily Research more expensive than a basic search call.
- **Extraction and crawl math matters.** URL count, extraction depth, mapping, and failure behavior change real cost.
- **Search is not verification.** Tavily can supply web context, but source-quality review is still the product team's responsibility.
- **Legal and policy review still applies.** Public web collection, crawling, and reuse need terms, robots, privacy, and copyright review.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline. Scoring follows the four-dimension rubric at [/about/scoring/](/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-28 against Tavily pricing, official site metadata, and credits documentation.

## FAQ

**Is Tavily an answer engine?**
No. Tavily is primarily an API for AI agents and RAG apps, not a Perplexity-style consumer research UI.

**How does Tavily pricing work?**
Tavily uses API credits. Search depth, extraction depth, mapping, crawling, and research model choice decide usage.

**Tavily vs Firecrawl?**
Tavily is stronger as a search and research API. Firecrawl is stronger when web pages need to become cleaned markdown, screenshots, or structured extracted data.

## Sources

- [Tavily official site](https://www.tavily.com): product positioning and API surface
- [Tavily pricing](https://www.tavily.com/pricing): Researcher, Pay As You Go, Project, and Enterprise plan cards
- [Tavily credits and pricing docs](https://docs.tavily.com/documentation/api-credits): API credits, plans, and endpoint credit costs

## Related

- **Category:** [AI Search](/categories/ai-search/) · [AI Infrastructure](/categories/ai-infrastructure/) · [AI Automation](/categories/ai-automation/)
- **Alternatives:** [Exa](/tools/exa/) · [You.com](/tools/you-com/) · [Firecrawl](/tools/firecrawl/) · [Perplexity](/tools/perplexity/)
