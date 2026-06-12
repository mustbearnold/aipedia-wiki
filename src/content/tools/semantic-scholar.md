---
type: tool
slug: semantic-scholar
title: Semantic Scholar
tagline: Free AI-powered academic search engine from Ai2 with 234M+ live searchable papers, citation trails, recommendations, datasets, and the Academic Graph API.
category: ai-research
company: Allen Institute for AI (AI2)
url: https://www.semanticscholar.org
pricing_model: free
price_range: "Free"
status: active
launched: 2015-11
last_updated: 2026-06-12
last_verified: 2026-06-12
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 10
  moat: 8
  longevity: 9
facts:
  corpus_scale:
    value: "Free AI research search and API infrastructure. The homepage showed 234,531,320 searchable papers on June 6, 2026, while the API overview still listed 214M papers, 2.49B citations, and 79M authors."
    source: "https://www.semanticscholar.org/"
    source_label: "Semantic Scholar homepage"
    source_id: semantic-scholar-official
    verified_at: 2026-06-12
    next_review_at: 2026-09-06
    volatility: medium
    confidence: high
  api_available:
    value: "Yes. Semantic Scholar exposes Academic Graph, Recommendations, and Datasets API services for papers, authors, citations, venues, SPECTER2 embeddings, similar-paper recommendations, and downloadable graph datasets."
    source: "https://www.semanticscholar.org/product/api"
    source_label: "Semantic Scholar API"
    source_id: semantic-scholar-api
    verified_at: 2026-06-12
    next_review_at: 2026-09-06
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Free for the core scholar search product. Most API endpoints are public but rate-limited; some endpoints require an API key and authenticated users can receive higher limits."
    source: "https://www.semanticscholar.org/product/api"
    source_label: "Semantic Scholar API"
    source_id: semantic-scholar-api
    verified_at: 2026-06-12
    next_review_at: 2026-09-06
    volatility: medium
    confidence: high
  best_for:
    value: "Literature discovery, citation chasing, related-paper recommendations, datasets, and academic search workflows where free breadth matters more than closed-source answer synthesis."
    source: "https://www.semanticscholar.org/"
    source_label: "Semantic Scholar homepage"
    source_id: semantic-scholar-official
    verified_at: 2026-06-12
    next_review_at: 2026-09-06
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Not a general chatbot or paid research workspace; teams needing systematic extraction, conversational synthesis, file Q&A, or private libraries should pair it with Elicit, Consensus, NotebookLM, or internal RAG."
    source: "https://www.semanticscholar.org/product/api"
    source_label: "Semantic Scholar API"
    source_id: semantic-scholar-api
    verified_at: 2026-06-12
    next_review_at: 2026-09-06
    volatility: medium
    confidence: medium
tags: [academic-search, research, free, open-access, ai-research, citations]
seo_title: "Semantic Scholar: Free AI Academic Search Engine (June 2026)"
meta_description: >-
  Semantic Scholar is a free AI-powered academic search engine from Ai2 with 234M+ searchable papers, citation trails, recommendations, datasets, and a public Academic Graph API. Verified June 2026.
author: "aipedia.wiki Editorial"
best_for:
  - academic research
  - literature discovery
  - free access seekers
  - interdisciplinary researchers
  - developers building research tools
not_best_for:
  - ai synthesis across papers
  - citation-sentiment analysis
  - humanities-heavy research
quick_answer: >-
  Semantic Scholar is a free academic search engine from Ai2 with 234M+ live searchable papers, related-paper recommendations, citation trails, and a public Academic Graph API. Pick it as the default free search/API starting point. Skip it when you need systematic extraction or conversational synthesis.
price_history:
  - date: 2026-04-17
    plan: "Free"
    price: "$0"
    source: "https://www.semanticscholar.org"
    source_label: "Source"
    source_id: semantic-scholar-pricing
    note: "Verified fully free. No paid tier exists."
  - date: 2026-06-04
    plan: "Free"
    price: "$0"
    source: "https://www.semanticscholar.org/about"
    source_label: "Source"
    source_id: semantic-scholar-pricing
    note: "Re-verified. Core Semantic Scholar search remains free; API access is free but rate-limited and some endpoints require an API key."
  - date: 2026-06-06
    plan: "Free"
    price: "$0"
    source: "https://www.semanticscholar.org/"
    source_label: "Semantic Scholar"
    source_id: semantic-scholar-pricing
    note: "Reverified free core search. Homepage showed 234,531,320 searchable papers; API overview still listed free but rate-limited access with optional API-key paths."
---

# Semantic Scholar

Allen Institute for AI (AI2)'s free academic search engine. The homepage showed 234,531,320 searchable papers on June 6, 2026. The API overview still lists 214 million papers, 2.49 billion citations, and 79 million authors. Basic search is free. API use is also free, but public endpoints are rate-limited and some endpoints require an API key.

An AI layer generates TLDR one-sentence summaries, highlights influential citations, recommends related papers, and powers public Academic Graph, Recommendations, and Datasets APIs used by third-party research tools.

## System Verdict

> **Pick Semantic Scholar as the default starting point for any academic search.** Free, comprehensive, and built on AI2's in-house SciBERT-family models. The API alone justifies the tool: every major research application in the space (including [Connected Papers](/tools/connected-papers/)) is built on top of it.
>
> **Skip it when the question requires cross-paper synthesis or citation-sentiment analysis.** [Consensus](/tools/consensus/) and [Elicit](/tools/elicit/) synthesize across abstracts and extract structured data. [Scite](/tools/scite/) classifies citations as supporting or contrasting. Semantic Scholar finds and summarizes individual papers. It does not reason across them.
>
> **Who uses which tier:** Everyone uses the free tier. Developers register for a free API key. Institutions can request bulk dataset access. There is no paid consumer plan, and there has not been one since launch.

## Key Facts

| | |
|---|---|
| **Corpus size** | 234,531,320 searchable papers on the homepage; API overview lists 214M papers, 2.49B citations, and 79M authors |
| **Full-text coverage** | PDF URLs and abstract metadata are exposed where available; paywalled papers remain limited |
| **Signature feature** | TLDR one-sentence AI summaries per paper |
| **Influential citations** | Separates high-signal citations from casual mentions |
| **Semantic Reader** | In-browser reading assistant for open-access papers |
| **API** | Academic Graph, Recommendations, and Datasets APIs; free, rate-limited, with API-key paths |
| **Backing organization** | Allen Institute for AI (non-profit, Paul Allen legacy) |
| **Models** | In-house SciBERT-family, not general-purpose LLMs |
| **Account requirement** | None for basic search |
| **Paid tier** | None |

## What it actually is

A single product with a web search interface and a free public API. The S2AG (Semantic Scholar Academic Graph) bulk dataset exposes the full corpus to institutions and developers.

Search ranks by citation-graph analysis: papers cited by important papers rank higher. Each result shows a TLDR summary, citation count, influential-citation count, and direct references. Semantic Reader overlays highlighting and summaries on open-access papers.

The Research Feed recommends new papers based on reading history and saved papers. Export supports citation-manager workflows, and the API exposes paper, author, citation, venue, embedding, recommendation, and dataset access patterns for developers.

The moat is institutional. AI2 is a non-profit with permanent funding, which removes the venture-backed shutdown risk that kills commercial research tools. The API's hundreds of downstream applications ([Connected Papers](/tools/connected-papers/), academic apps, citation managers) further entrench it.

## When to pick Semantic Scholar

- **You need a free starting point for any academic search.** No signup friction, no paywall, no credit cap.
- **You are a developer building research tools.** The API overview lists 214M papers, 2.49B citations, and 79M authors, with public and API-key access paths.
- **You work on interdisciplinary research.** Coverage spans STEM, social sciences, and medicine at one query.
- **You want influential-citation filtering.** Distinguishes papers that shaped a field from those with many casual mentions.
- **You need a citation-graph view.** Built-in visualization of how a paper connects to its references and descendants.

## When to pick something else

- **AI synthesis across multiple papers:** [Consensus](/tools/consensus/) or [Elicit](/tools/elicit/). Semantic Scholar finds papers; these tools reason across them.
- **Citation sentiment analysis:** [Scite](/tools/scite/). Supporting/Contrasting/Mentioning classification is outside Semantic Scholar's scope.
- **Visual literature mapping from a seed paper:** [Connected Papers](/tools/connected-papers/) (which itself runs on Semantic Scholar's index).
- **Structured extraction for meta-analysis:** [Elicit](/tools/elicit/). Configurable columns from hundreds of papers.
- **Humanities-heavy research:** JSTOR or subject-specific databases. Semantic Scholar's coverage thins in arts and humanities.

## Pricing

| Plan | Price | Access |
|------|-------|--------|
| Free | $0 | Core search, TLDR, Semantic Reader, Research Feed, and API access with public rate limits or API key where required |

*Verified 2026-06-12. Semantic Scholar's core search is free. API access is free but rate-limited, and some endpoints require an API key.*

## Against the alternatives

| | Semantic Scholar | Consensus | Elicit |
|---|---|---|---|
| **Price** | Free | $0-$10.99/mo | $0-$79/user/mo |
| **Corpus** | 214M papers on the API overview | 200M+ papers | 138M+ papers |
| **AI summary per paper** | TLDR (1 sentence) | Full paper answer synthesis | Extraction columns |
| **Cross-paper synthesis** | No | Yes | Yes (structured) |
| **Free public API** | Yes | No | Enterprise only |
| **Citation context** | Influential citations | No | No |
| **Best viewed as** | Free discovery layer | Research Q&A | Systematic-review engine |

## Failure modes

- **No cross-paper synthesis.** Semantic Scholar finds and summarizes individual papers. It will not answer "what does the literature say about X" the way [Consensus](/tools/consensus/) does.
- **No citation classification.** Counts are shown, but sentiment (supporting vs contrasting) is not. [Scite](/tools/scite/) fills that gap.
- **Humanities coverage thins.** Best in STEM and social sciences. Arts and humanities researchers will find sparser indexing.
- **TLDR summaries are one sentence.** Useful for triage, not a substitute for reading the methods or results.
- **Interface is functional, not polished.** Advanced filtering trails Web of Science and Scopus. Good enough for most use cases, not for every institutional workflow.
- **No full-text for paywalled content.** Open-access papers get Semantic Reader enhancements. Paywalled papers show abstracts only.
- **API rate limits exist.** Generous but finite. Heavy commercial users should confirm limits before building production dependencies.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies corpus and feature details against primary sources, and generates the analysis above. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility x Value x Moat x Longevity, unweighted average). Last verified 2026-06-12 against [Semantic Scholar](https://www.semanticscholar.org) and the [Semantic Scholar API overview](https://www.semanticscholar.org/product/api).

## FAQ

**Is Semantic Scholar really free?**
Yes for the core search product. Maintained by Allen Institute for AI, a non-profit. Registration is optional for basic search; API use may be public, rate-limited, or API-key based depending on the endpoint.

**Is Semantic Scholar better than Google Scholar?**
They are complementary. Google Scholar has broader full-text search. Semantic Scholar has better AI features (TLDR, influential citations, citation graph) and cleaner metadata. Most researchers use both.

**Is the API really free?**
Yes, with rate limits. Most endpoints are publicly available but rate-limited, some require an API key, and authenticated users can receive higher limits ([Semantic Scholar API](https://www.semanticscholar.org/product/api)).

**What models does Semantic Scholar use?**
In-house AI2 models including the SciBERT family, focused on academic text processing. Not GPT-5, not Claude, not a general-purpose LLM.

**Why is the corpus called S2AG?**
S2AG stands for Semantic Scholar Academic Graph. It contains titles, abstracts, authors, and citation edges for open-access papers across every major discipline ([ACM article](https://dl.acm.org/doi/fullHtml/10.1145/3487553.3527147)).

**Does Semantic Scholar do synthesis like Consensus?**
No. It finds and summarizes individual papers. For cross-paper synthesis or meta-analysis support, use [Consensus](/tools/consensus/) or [Elicit](/tools/elicit/).

## Sources

- [Semantic Scholar](https://www.semanticscholar.org): product site, free search, TLDR feature, and live paper count
- [Semantic Scholar API](https://www.semanticscholar.org/product/api): 214M papers, 2.49B citations, 79M authors, API access, and rate-limit guidance
- [Allen Institute for AI](https://allenai.org): organization, funding, and mission
- [Semantic Scholar Academic Graph (ACM)](https://dl.acm.org/doi/fullHtml/10.1145/3487553.3527147): corpus size and structure
- [S2ORC GitHub](https://github.com/allenai/s2orc): open research corpus and API access

## Related

- **Category:** [AI Research](/categories/ai-research/)
- **Comparisons:** [nanochat vs Semantic Scholar](/compare/nanochat-vs-semantic-scholar/) | [Semantic Scholar vs Consensus](/compare/consensus-vs-semantic-scholar/) | [Scite vs Semantic Scholar](/compare/scite-vs-semantic-scholar/) | [Elicit vs Semantic Scholar](/compare/elicit-vs-semantic-scholar/) | [Connected Papers vs Semantic Scholar](/compare/connected-papers-vs-semantic-scholar/)
