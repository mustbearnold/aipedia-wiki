---
type: workflow
slug: researcher-stack
title: "The Independent Researcher AI Stack (June 2026)"
seo_title: "Independent Researcher AI Stack: Consensus, Elicit, Descript, Reclaim (2026)"
meta_description: "Verified June 27, 2026: the working AI stack for independent researchers, analysts, and journalists. Consensus for citations, Elicit for literature reviews, Descript for interviews."
description: "An assembled AI stack for independent researchers, policy analysts, science writers, and freelance journalists who produce source-backed work."
stack: [consensus, descript, reclaim-ai, sanebox]
tools_mentioned: [consensus, elicit, descript, reclaim-ai, sanebox, claude, semantic-scholar]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-27
last_verified: 2026-06-27
update_frequency: monthly
related:
  - href: /guides/best-ai-research-tool-for-academic-citations/
    title: "Best AI Research Tool for Academic Citations"
    description: "Consensus deep dive for citation-backed research."
    kind: guide
  - href: /guides/best-podcast-editor-for-transcript-first-editing/
    title: "Best Podcast Editor for Transcript-First Editing"
    description: "Descript deep dive for interview-heavy research workflows."
    kind: guide
  - href: /guides/best-ai-tools-for-researchers/
    title: "Best AI Tools for Researchers"
    description: "Broader category guide across research tooling."
    kind: guide
  - href: /workflows/consultant-stack/
    title: "Independent Consultant Stack"
    description: "Adjacent stack when research feeds client advisory."
    kind: workflow
---

# The Independent Researcher AI Stack (June 2026)

An independent researcher, policy analyst, science writer, or freelance journalist works against a specific constraint: every claim has to be source-backed, every citation has to be real, and the deadline is real. Off-the-shelf LLMs fabricate citations. Generic productivity tools do not address research-specific workflows. The right stack solves both.

This stack is for the buyer profile: someone whose output is source-backed writing or analysis. AiPedia verified pricing and capabilities on June 27, 2026.

## Function by function

| Research function | Tool | Why this one |
|---|---|---|
| Citation-backed search | [Consensus](/tools/consensus/) | Returns real, citable papers, not hallucinated ones |
| Structured literature review | [Elicit](/tools/elicit/) | Extract data across many papers into tables |
| Interview recording and editing | [Descript](/tools/descript/) | Transcript-first editing, accurate transcription |
| Calendar defense | [Reclaim.ai](/tools/reclaim-ai/) | Defends deep-work blocks against interview load |
| Email triage | [SaneBox](/tools/sanebox/) | Routes vendor and PR noise away |
| Reasoning and drafting | [Claude](/tools/claude/) | Long-form reasoning, grounded by Consensus output |
| Free supplementary search | [Semantic Scholar](/tools/semantic-scholar/) | Free paper discovery, citation graph |

Current monthly cost depends on whether Elicit is a casual paper-finding aid or a systematic-review workhorse. A lightweight researcher can combine Semantic Scholar, free/Pro Consensus, Descript only when interviews are active, and one paid LLM plan; structured literature reviews push the stack up because Elicit Pro and Scale are now materially higher-priced workflow tiers.

## Why This Stack

Three constraints unique to research work:

- **Fabricated citations end careers.** Documented retractions and sanctions exist where researchers cited ChatGPT-hallucinated sources. The citation layer must be retrieval-grounded, not LLM-synthesized.
- **Literature reviews are a data extraction problem, not a reading problem.** Elicit's structured extraction across many papers is dramatically faster than manual reading for "what does the literature say about X intervention."
- **Interview transcription quality varies more than it should.** Descript is strongest when interview cleanup and quote selection need to happen inside the transcript, not just when a raw transcript is enough.

## The Research Workflow

### 1. Question framing

- Claude drafts the initial research question and the framing for what the literature search needs to surface.
- Consensus runs the first-pass search: what does the published literature say about this question, and what are the consensus and contrarian positions.

### 2. Literature scoping

- Elicit pulls the candidate paper set for the deeper review. Specify the columns you want extracted: sample size, intervention type, primary outcome, conclusion, year.
- Semantic Scholar covers gaps where Consensus or Elicit underweight (very recent preprints, niche journals, non-English work).

### 3. Interview gathering

- Reclaim slots interview blocks across the schedule.
- Descript records (or pulls in existing audio/video) and transcribes.
- Annotate transcripts inline. Pull quotes for use in writing.

### 4. Drafting

- Claude drafts based on the retrieved evidence, interview quotes, and the researcher's frame.
- The researcher edits for voice, accuracy, and structure. Every claim gets checked against the source.
- Final pass: every citation is verified to exist (Consensus and Elicit return real papers, but spot-check before publishing).

### 5. Publishing and follow-up

- SaneBox keeps the inbox clear during deep-work writing days.
- Reclaim defends post-publication reading-and-response blocks.

## Pricing Reality

Verified June 27, 2026:

- **Consensus:** Pro is currently $15/month or $120/year; Deep is $65/month or $540/year for heavier Deep reviews.
- **Elicit:** Basic remains the budget path, while Pro is currently $49/user/month billed annually and Scale is $169/user/month billed annually. Do not assume the old low-cost Plus math still applies.
- **Descript:** paid plans start at $16/month, with media hours and AI credits determining whether interview-heavy work needs a higher tier.
- **Reclaim.ai:** use Free unless interview scheduling and writing blocks need paid scheduling range or team controls.
- **SaneBox:** Snack is currently $4.99/month and is the first paid inbox-triage step.
- **Claude:** Pro is currently $20/month; heavier research drafting may require Max or API usage.
- **Semantic Scholar:** free paper discovery and API documentation remain the baseline safety net.

Researchers on tight budgets should start with Semantic Scholar, free Elicit, and either free or Pro Consensus. Upgrade Elicit only when structured extraction is part of the paid output.

## What This Stack Does Not Cover

- **Citation management.** Use Zotero or Mendeley alongside. Consensus and Elicit export to both.
- **Statistical analysis.** Stata, R, Python notebooks, or domain-specific tools.
- **Data visualization.** Datawrapper, Flourish, or Observable for charts and maps.
- **Fact-checking specifically.** Pair with the Wikipedia citation graph, primary-source databases, or a paid fact-checking service for high-stakes work.

## Decision Matrix for Variations

| Researcher profile | Adjust to |
|---|---|
| Policy analyst | Add Bloomberg Government or a domain-specific database |
| Science journalist | Heavier use of Consensus + Elicit; add Sci-Hub adjacent legal access (university affiliation, ILL) |
| Academic researcher in a lab | This stack supplements your institutional access; do not replace it |
| Long-form magazine writer | Heavier emphasis on Descript for interviews; consider adding a fact-checker |
| Freelance journalist on deadlines | Reclaim is the difference between hitting and missing deadlines under load |

## Failure Modes

- **Trusting LLM citations.** Always verify citations through Consensus or Elicit before submitting work. ChatGPT and Claude will produce plausible-looking fake citations.
- **Treating Consensus output as conclusive.** It is a starting point. Read the actual papers, especially methods sections.
- **Skipping the source check on Elicit-extracted data.** AI extraction occasionally misreads tables and figures. Spot-check.
- **Letting interview load destroy deep-work time.** Reclaim helps; manual discipline is required to respect the conflict flags.
- **Underusing Semantic Scholar.** It is free, comprehensive, and surfaces papers Consensus and Elicit sometimes miss. Use it as the third-pass safety net.

## FAQ

<details>
<summary>Why both Consensus and Elicit?</summary>

Different jobs. Consensus answers research questions with cited evidence. Elicit extracts structured data across many papers. Most researchers use both: Consensus for "what does the literature say," Elicit for "give me the comparison table across 30 studies."

</details>

<details>
<summary>Can ChatGPT or Claude replace Consensus?</summary>

No. Both LLMs can produce plausible but fake citations. Retrieval-grounded tools like Consensus reduce that risk by grounding answers in retrieved papers, but you still need to spot-check the paper and claim before publishing.

</details>

<details>
<summary>Is this stack enough for academic publication?</summary>

For drafting and literature review, yes. Academic publication requires institutional access to subscribed journals (which Consensus does not fully replace), domain-specific tools for analysis, and peer review. This stack is the supplementary research layer, not the entire research workflow.

</details>

<details>
<summary>Why Descript instead of Otter?</summary>

Otter is fine for transcript-only workflows. Descript's transcript-first editing is the differentiator if you also produce audio or video from the interviews. For pure transcription, either works.

</details>

<details>
<summary>What about Perplexity?</summary>

Useful for general web research. Less useful for academic citations because its sources include non-peer-reviewed web content alongside papers. Use Consensus for citation-backed work, Perplexity for general background research.

</details>

## Sources

- [Consensus](https://consensus.app/), verified 2026-06-27
- [Consensus Pro subscription](https://help.consensus.app/en/articles/11408820-what-do-you-get-with-a-pro-subscription), verified 2026-06-27
- [Consensus subscription plans](https://help.consensus.app/en/articles/10087865-subscription-plans), verified 2026-06-27
- [Elicit](https://elicit.com/), verified 2026-06-27
- [Elicit pricing](https://elicit.com/pricing), verified 2026-06-27
- [Descript](https://www.descript.com/), verified 2026-06-27
- [Descript pricing](https://www.descript.com/pricing), verified 2026-06-27
- [Descript media minutes and AI credits](https://help.descript.com/hc/en-us/articles/27841674958221-Track-and-understand-your-media-minutes-and-AI-credits), verified 2026-06-27
- [Reclaim.ai](https://reclaim.ai/), verified 2026-06-27
- [Reclaim pricing](https://reclaim.ai/pricing), verified 2026-06-27
- [SaneBox](https://www.sanebox.com/), verified 2026-06-27
- [SaneBox pricing](https://www.sanebox.com/pricing), verified 2026-06-27
- [Semantic Scholar](https://www.semanticscholar.org/), verified 2026-06-27
- [Semantic Scholar API](https://www.semanticscholar.org/product/api), verified 2026-06-27
- [Claude pricing](https://claude.com/pricing), verified 2026-06-27

Internal references:

- [Consensus tool page](/tools/consensus/)
- [Elicit tool page](/tools/elicit/)
- [Descript tool page](/tools/descript/)
- [Reclaim.ai tool page](/tools/reclaim-ai/)
- [SaneBox tool page](/tools/sanebox/)
- [Best AI research tool for academic citations](/guides/best-ai-research-tool-for-academic-citations/)
- [Best AI tools for researchers](/guides/best-ai-tools-for-researchers/)
