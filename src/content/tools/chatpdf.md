---
type: tool
slug: chatpdf
title: ChatPDF
tagline: The original "chat with your PDF" tool. Upload a PDF, ask questions, get sourced answers. Free tier allows 2 documents per day; Plus unlocks unlimited document analysis, while API docs confirm 2,000-page / 32MB file limits.
category: ai-research
company: chatpdf
url: https://www.chatpdf.com
pricing_model: freemium
price_range: "Free; Plus pricing is shown in-app; API available"
status: active
launched: 2023-03
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
  value: 7
  moat: 6
  longevity: 6
facts:
  best_for:
    value: Best for quick PDF Q&A when the user wants a simple upload-and-ask workflow with cited answers and minimal setup.
    source: https://www.chatpdf.com/
    source_label: ChatPDF official site
    source_id: chatpdf-api
    verified_at: '2026-06-02'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  pricing_anchor:
    value: ChatPDF exposes its core free/product limits on the official site; the old /pricing path returns 404, so exact Plus pricing should be treated as in-app/volatile unless the live upgrade flow renders it.
    source: https://www.chatpdf.com/
    source_label: ChatPDF official site pricing surface
    source_id: chatpdf-pricing
    verified_at: '2026-06-02'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  workflow_surface:
    value: The product surface is narrow document chat over PDFs, not a full research suite, vector database, or knowledge-management
      system.
    source: https://www.chatpdf.com/
    source_label: ChatPDF official site
    source_id: chatpdf-official
    verified_at: '2026-06-02'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
  api_available:
    value: ChatPDF has a backend API for adding PDFs by URL or file upload and sending stateless chat messages against a source ID; docs list 2,000-page / 32MB PDF limits and optional page references.
    source: https://www.chatpdf.com/docs/api/backend
    source_label: ChatPDF backend API docs
    source_id: chatpdf-official
    verified_at: '2026-06-02'
    volatility: high
    confidence: high
    next_review_at: '2026-08-13'
  watch_out_for:
    value: For teams, evaluate file size, daily upload limits, data handling, citation reliability, and whether a broader RAG
      tool like NotebookLM or AnythingLLM is a better fit.
    source: https://www.chatpdf.com/
    source_label: ChatPDF official site
    source_id: chatpdf-official
    verified_at: '2026-06-02'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-13'
tags: [pdf, document-chat, research, rag, citations, study-aid]
seo_title: "ChatPDF: Features, Pricing & Review (June 2026)"
meta_description: "ChatPDF lets you chat with PDFs, folders, and API sources. Free tier allows 2 documents/day; Plus unlocks unlimited analysis; API docs list 2,000-page / 32MB file limits."
author: "aipedia.wiki Editorial"
best_for:
  - students and researchers summarizing papers
  - legal, regulatory, or contract review
  - quick Q&A against long PDFs without reading them
  - citation-requiring workflows
not_best_for:
  - enterprise document systems (use Humata or AnythingLLM)
  - multi-format document corpora (use NotebookLM)
  - users who already pay for ChatGPT Plus or Gemini Advanced (both handle PDFs natively)
quick_answer: >-
  ChatPDF is the category-defining "chat with a PDF" tool. Upload a file, ask questions, get answers with page citations. Free tier allows 2 documents per day; Plus unlocks unlimited document analysis; the backend API docs list 2,000-page / 32MB limits for API sources. Pick it for standalone research or study. Skip it if you already pay for ChatGPT Plus, Claude Pro, or Gemini Advanced and their PDF workflow is enough.
---

# ChatPDF

The first tool to make "talk to your PDF" a viable workflow. Upload a PDF, get a chat interface that answers questions against the document content with page-level citations. Launched March 2023 in the first wave of ChatGPT-powered apps; still widely used in 2026 despite frontier chatbots now handling PDFs natively.

June 2, 2026 check: ChatPDF's official home page confirms the free plan allows 2 document analyses per day, Plus provides unlimited document analysis and more advanced features, folders can combine multiple PDFs in one conversation, and model routing uses GPT-4o plus GPT-4o-mini. The old `/pricing` path now returns 404, so AiPedia no longer treats the historic `$19.99/mo` Plus price as a freshly verified public quote.

## System Verdict

> **Pick ChatPDF if you want a dedicated tool for document Q&A with page citations.** The UX is focused, the free tier is usable for casual research, and page-level source links make it easy to verify answers against the original text. Students, researchers, and legal professionals form the core user base.
>
> **Skip it if you already pay for a frontier chatbot.** [ChatGPT Plus](/tools/chatgpt/), [Claude Pro](/tools/claude/), and [Gemini Advanced](/tools/gemini/) all handle PDFs natively in 2026. If you are already on one of those, ChatPDF is redundant. The standalone case is strongest for people on free chatbot tiers hitting PDF-upload rate limits.
>
> **Which PDF tool wins for you:** ChatPDF for focused PDF chat, folders, and lightweight API use. [NotebookLM](/tools/notebooklm/) for multi-source notebooks, [AnythingLLM](/tools/anythingllm/) for self-hosted enterprise, and a frontier chatbot if PDF chat is already included in the subscription you pay for.

## Key Facts

| | |
|---|---|
| **Free tier** | 2 document analyses per day, no sign-up required for core flow |
| **Plus plan** | Unlimited document analysis and advanced features; exact public price not rendered on the static page in this crawl |
| **Answer format** | Chat interface with inline page citations |
| **Languages supported** | 100+ |
| **API** | Backend API for adding sources by URL/file and sending stateless chat messages |
| **Launched** | March 2023 |
| **Underlying model** | Smart dynamic routing between GPT-4o and GPT-4o-mini, per official FAQ |

## When to pick ChatPDF

- **Single-document study workflows.** Upload a textbook chapter, ask questions, learn the material faster than linear reading.
- **Legal or contract review.** Page citations make every answer verifiable against the source. Faster than manual document search.
- **Research paper triage.** Use folders or Plus workflows to compare multiple PDFs, then verify the cited pages before citing.
- **Quick enterprise PDF lookup.** Internal policy documents, 500-page regulatory filings, annual reports. Upload and ask.

## When to pick something else

- **Already paying for ChatGPT, Claude, or Gemini:** Use the native PDF upload. All three handle PDFs well in 2026 without a separate subscription.
- **Multi-document research corpora:** [NotebookLM](/tools/notebooklm/) handles up to 50 sources per notebook with cross-document answering. Free.
- **High-page-volume workflows:** [Humata](https://humata.ai) offers 200 pages/month at $1.99 (Student) or 500 pages at $9.99 (Expert). Cheaper than ChatPDF Plus for students.
- **Self-hosted or enterprise privacy:** [AnythingLLM](/tools/anythingllm/) runs on your own infrastructure with full data control.

## Pricing

| Plan | Price | What's included |
|---|---|---|
| Free | $0 | 2 document analyses/day, core PDF chat, no account required for the basic flow |
| Plus | In-app / volatile | Unlimited document analysis and more advanced features |
| API | Usage/account gated | Add PDFs by URL or file upload, ask stateless chat questions, include optional page references |

Free and Plus positioning verified 2026-06-02 via [chatpdf.com](https://www.chatpdf.com). API source limits verified via [ChatPDF backend API docs](https://www.chatpdf.com/docs/api/backend), which list 2,000 pages or 32 MB per PDF for API sources. Exact Plus price should be checked in the live upgrade flow because the old public `/pricing` route now returns 404.

## Failure modes

- **Long-document accuracy drops past ~500 pages.** Like all RAG-based systems, retrieval quality degrades at extreme document lengths. Chunking strategy matters; expect occasional misses on long files.
- **Image and figure handling is weak.** Charts, tables, and figures inside PDFs are often skipped or mis-interpreted. Pair with manual review for data-heavy documents.
- **Multi-document workflow is account/plan shaped.** ChatPDF now promotes folders for multiple PDFs in one conversation, but buyers should verify whether the free, signed-in, and Plus limits match their workload. Use NotebookLM for broader source notebooks.
- **Privacy posture unclear for sensitive docs.** Uploaded content is processed by third-party LLM APIs. Do not upload confidential material without reviewing the privacy policy.
- **Feature parity with frontier chatbots shrinking.** ChatGPT, Claude, and Gemini now handle PDFs natively for paid users. ChatPDF's standalone value is focus, folders, page citations, and API simplicity, not owning the best base model.

## Methodology

Produced by the aipedia.wiki editorial pipeline. Last verified 2026-06-02 against [chatpdf.com](https://www.chatpdf.com) and [ChatPDF backend API docs](https://www.chatpdf.com/docs/api/backend/).

## FAQ

**Is ChatPDF accurate?**
For direct questions with answers present in the document, yes, with page citations for verification. For inferential or cross-document questions, expect occasional errors. Always verify critical answers against the cited pages.

**Does ChatPDF work with scanned PDFs?**
Yes, via OCR. Quality depends on scan resolution. Text-native PDFs are more reliable.

**Can I chat with multiple PDFs at once?**
Not on the free tier. Multi-document workflows are better served by [NotebookLM](/tools/notebooklm/) (free) or AnythingLLM.

**How does ChatPDF compare to ChatGPT for PDFs?**
ChatGPT handles PDFs natively on paid plans. If you already pay for ChatGPT, Claude, or Gemini and only need occasional PDF Q&A, use that first. ChatPDF's advantage is the focused side-by-side UX, folders, clickable citations, and PDF-specific API docs.

## Related

- **Category:** [AI Research](/categories/ai-research/)
- **See also:** [NotebookLM](/tools/notebooklm/) · [Humata](/tools/humata/) · [AnythingLLM](/tools/anythingllm/) · [ChatGPT](/tools/chatgpt/)
