---
type: tool
slug: semantic-scholar
title: Semantic Scholar
tagline: Free AI-powered academic search engine from Allen Institute for AI, indexing 200M+ papers with TLDR summaries and a free public API.
category: ai-research
company: Allen Institute for AI (AI2)
url: https://www.semanticscholar.org
pricing_model: free
price_range: "Free"
status: active
launched: 2015-11
last_updated: 2026-05-13
last_verified: 2026-05-13
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
    value: "Free AI research search across more than 200M scholarly papers, with TLDRs, citation graph context, and paper discovery tools."
    source: "https://www.semanticscholar.org/"
    source_label: "Semantic Scholar homepage"
    source_id: semantic-scholar-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: medium
    confidence: high
  api_available:
    value: "Yes. Semantic Scholar exposes public API endpoints for paper search, recommendations, author data, citations, and datasets."
    source: "https://www.semanticscholar.org/product/api"
    source_label: "Semantic Scholar API"
    source_id: semantic-scholar-api
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: medium
    confidence: high
  pricing_anchor:
    value: "Free for the core scholar search product; API use is public but rate limits and key requirements should be checked before production use."
    source: "https://www.semanticscholar.org/product/api"
    source_label: "Semantic Scholar API"
    source_id: semantic-scholar-api
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: medium
    confidence: high
  best_for:
    value: "Literature discovery, citation chasing, paper summaries, and academic search workflows where free breadth matters more than closed-source answer synthesis."
    source: "https://www.semanticscholar.org/"
    source_label: "Semantic Scholar homepage"
    source_id: semantic-scholar-official
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: medium
    confidence: high
  watch_out_for:
    value: "Not a general chatbot or paid research workspace; teams needing conversational synthesis, file Q&A, or private libraries should pair it with NotebookLM, Elicit, or internal RAG."
    source: "https://www.semanticscholar.org/product/api"
    source_label: "Semantic Scholar API"
    source_id: semantic-scholar-api
    verified_at: 2026-05-13
    next_review_at: 2026-08-13
    volatility: medium
    confidence: medium
tags: [academic-search, research, free, open-access, ai-research, citations]
seo_title: "Semantic Scholar: Free AI Academic Search Engine (May 2026)"
meta_description: >-
  Semantic Scholar is a free AI-powered academic search engine from Allen Institute for AI, indexing 200M+ papers with TLDR summaries, influential-citation signals, and a free public API. No paid tier. Verified May 2026.
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
  Semantic Scholar is a free academic search engine from Allen Institute for AI covering 200M+ papers. TLDR summaries, influential-citation signals, and a free public API. No paid tier. Pick it as the default starting point. Skip it when you need cross-paper synthesis.
price_history:
  - date: 2026-04-17
    plan: "Free"
    price: "$0"
    source: "https://www.semanticscholar.org"
    source_label: "Source"
    source_id: semantic-scholar-pricing
    note: "Verified fully free. No paid tier exists."
  - date: 2026-05-13
    plan: "Free"
    price: "$0"
    source: "https://www.semanticscholar.org/about"
    source_label: "Source"
    source_id: semantic-scholar-pricing
    note: "Re-verified. Still fully free; no paid tier introduced. AI2 non-profit funding model unchanged."
---

# Semantic Scholar

Allen Institute for AI (AI2)'s free academic search engine. The S2AG index covers 205 million publications, 121 million authors, and nearly 2.5 billion citation edges, with roughly 60 million full-text papers. No paid tier. No account required for basic search.

An AI layer generates TLDR one-sentence summaries, distinguishes influential citations from casual mentions, and powers a free public API used by hundreds of third-party research tools.

## System Verdict

> **Pick Semantic Scholar as the default starting point for any academic search.** Free, comprehensive, and built on AI2's in-house SciBERT-family models. The API alone justifies the tool: every major research application in the space (including [Connected Papers](/tools/connected-papers/)) is built on top of it.
>
> **Skip it when the question requires cross-paper synthesis or citation-sentiment analysis.** [Consensus](/tools/consensus/) and [Elicit](/tools/elicit/) synthesize across abstracts and extract structured data. [Scite](/tools/scite/) classifies citations as supporting or contrasting. Semantic Scholar finds and summarizes individual papers. It does not reason across them.
>
> **Who uses which tier:** Everyone uses the free tier. Developers register for a free API key. Institutions can request bulk dataset access. There is no paid consumer plan, and there has not been one since launch.

## Key Facts

| | |
|---|---|
| **Corpus size** | 205M+ publications, 121M+ authors, ~2.5B citation edges |
| **Full-text coverage** | ~60M papers |
| **Signature feature** | TLDR one-sentence AI summaries per paper |
| **Influential citations** | Separates high-signal citations from casual mentions |
| **Semantic Reader** | In-browser reading assistant for open-access papers |
| **API** | Free public API with registration, generous rate limits |
| **Backing organization** | Allen Institute for AI (non-profit, Paul Allen legacy) |
| **Models** | In-house SciBERT-family, not general-purpose LLMs |
| **Account requirement** | None for basic search |
| **Paid tier** | None |

## What it actually is

A single product with a web search interface and a free public API. The S2AG (Semantic Scholar Academic Graph) bulk dataset exposes the full corpus to institutions and developers.

Search ranks by citation-graph analysis: papers cited by important papers rank higher. Each result shows a TLDR summary, citation count, influential-citation count, and direct references. Semantic Reader overlays highlighting and summaries on open-access papers.

The Research Feed recommends new papers based on reading history and saved papers. Export supports RIS and BibTeX for citation manager integration.

The moat is institutional. AI2 is a non-profit with permanent funding, which removes the venture-backed shutdown risk that kills commercial research tools. The API's hundreds of downstream applications ([Connected Papers](/tools/connected-papers/), academic apps, citation managers) further entrench it.

## When to pick Semantic Scholar

- **You need a free starting point for any academic search.** No signup friction, no paywall, no credit cap.
- **You are a developer building research tools.** The free API covers 200M+ papers with generous rate limits. Commercial alternatives charge per query.
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
| Free | $0 | Full search, TLDR, Semantic Reader, Research Feed, API (with registration) |

*Verified 2026-05-13. Semantic Scholar is fully free with no paid tier. Maintained by Allen Institute for AI, a non-profit research organization. Bulk dataset access available to institutions at no cost on request.*

## Against the alternatives

| | Semantic Scholar | Consensus | Elicit |
|---|---|---|---|
| **Price** | Free | $0-$10.99/mo | $0-$79/user/mo |
| **Corpus** | 205M+ papers | 200M+ papers | 125M+ papers |
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

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies corpus and feature details against primary sources, and generates the analysis above. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-05-13 against [Semantic Scholar](https://www.semanticscholar.org), [Allen Institute for AI](https://allenai.org), the [Semantic Scholar Academic Graph paper](https://dl.acm.org/doi/fullHtml/10.1145/3487553.3527147), and the [S2ORC GitHub repo](https://github.com/allenai/s2orc).

## FAQ

**Is Semantic Scholar really free?**
Yes. Fully free with no paid tier. Maintained by Allen Institute for AI, a non-profit. Registration is optional for basic search and required for API access.

**Is Semantic Scholar better than Google Scholar?**
They are complementary. Google Scholar has broader full-text search. Semantic Scholar has better AI features (TLDR, influential citations, citation graph) and cleaner metadata. Most researchers use both.

**Is the API really free?**
Yes. Register for an API key and access is free with generous rate limits ([S2ORC GitHub](https://github.com/allenai/s2orc)). Hundreds of academic tools and citation managers are built on it.

**What models does Semantic Scholar use?**
In-house AI2 models including the SciBERT family, focused on academic text processing. Not GPT-5, not Claude, not a general-purpose LLM.

**Why is the corpus called S2AG?**
S2AG stands for Semantic Scholar Academic Graph. It contains titles, abstracts, authors, and citation edges for open-access papers across every major discipline ([ACM article](https://dl.acm.org/doi/fullHtml/10.1145/3487553.3527147)).

**Does Semantic Scholar do synthesis like Consensus?**
No. It finds and summarizes individual papers. For cross-paper synthesis or meta-analysis support, use [Consensus](/tools/consensus/) or [Elicit](/tools/elicit/).

## Sources

- [Semantic Scholar](https://www.semanticscholar.org): product site and TLDR feature
- [Allen Institute for AI](https://allenai.org): organization, funding, and mission
- [Semantic Scholar Academic Graph (ACM)](https://dl.acm.org/doi/fullHtml/10.1145/3487553.3527147): corpus size and structure
- [S2ORC GitHub](https://github.com/allenai/s2orc): open research corpus and API access

## Related

- **Category:** [AI Research](/categories/ai-research/)
- **Comparisons:** [Semantic Scholar vs Consensus](/compare/consensus-vs-semantic-scholar/) | [Scite vs Semantic Scholar](/compare/scite-vs-semantic-scholar/) | [Elicit vs Semantic Scholar](/compare/elicit-vs-semantic-scholar/) | [Connected Papers vs Semantic Scholar](/compare/connected-papers-vs-semantic-scholar/)
