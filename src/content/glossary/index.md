---
type: glossary
slug: glossary-index
title: AI Tools Glossary
description: Definitions of key terms used throughout the AI Tools wiki.
last_updated: 2026-04-13
update_frequency: quarterly
---

# AI Tools Glossary

> Quick-reference definitions for every key term used across the AI Tools wiki. Each heading is an anchor link -- use `glossary/index.md#term-name` to link from any page.

---

## LLM

**Large Language Model.** A neural network trained on massive text datasets that can generate, summarize, translate, and reason about text. Examples: GPT-4o, Claude, Gemini, Mistral Large. LLMs are the foundation of most modern AI tools. They work by predicting the next token in a sequence, but this simple mechanism produces remarkably capable behavior at scale.

See also: [LLM Chatbots Category](../categories/llm-chatbots.md), [Foundation Model](#foundation-model), [Tokens](#tokens)

---

## Foundation Model

A large AI model trained on broad data that can be adapted to many downstream tasks. Foundation models (like GPT-4, Claude, Gemini) serve as the base layer that products are built on top of. The term emphasizes that these models are not task-specific -- they are general-purpose systems that can be fine-tuned, prompted, or integrated into specialized applications.

See also: [LLM](#llm), [Fine-tuning](#fine-tuning)

---

## Fine-tuning

The process of taking a pre-trained foundation model and training it further on a specific dataset to specialize its behavior. Fine-tuning is how you make a general model better at your particular task -- for example, training Claude on your company's support tickets to improve customer service responses. It requires labeled data and is more expensive than prompt engineering but produces more consistent results.

See also: [LoRA](#lora), [Foundation Model](#foundation-model), [Prompt Engineering](#prompt-engineering)

---

## LoRA

**Low-Rank Adaptation.** A parameter-efficient fine-tuning technique that trains only a small number of adapter weights instead of the full model. LoRA makes fine-tuning accessible to smaller teams because it requires much less compute and memory than full fine-tuning. You can think of it as adding a small "patch" to a model's behavior without rewriting the whole thing. Popular for customizing open-source models like Mistral and Llama.

See also: [Fine-tuning](#fine-tuning), [Open Source vs Closed Source](#open-source-vs-closed-source)

---

## RAG

**Retrieval-Augmented Generation.** A technique that gives an LLM access to external knowledge by retrieving relevant documents before generating a response. Instead of relying solely on what the model learned during training, RAG systems search a knowledge base (using embeddings and vector databases), find relevant passages, and inject them into the prompt. This reduces hallucination and keeps responses grounded in current, domain-specific information.

See also: [Embedding](#embedding), [Vector Database](#vector-database), [Hallucination](#hallucination)

---

## Prompt Engineering

The practice of crafting inputs (prompts) to get better outputs from LLMs. This includes techniques like few-shot examples, chain-of-thought reasoning, system prompts, and structured output formatting. Prompt engineering is the cheapest and fastest way to improve AI tool performance before resorting to fine-tuning. Good prompts are specific, provide context, and define the desired output format.

See also: [LLM](#llm), [Fine-tuning](#fine-tuning), [Tokens](#tokens)

---

## Agentic AI

AI systems that can take autonomous actions to accomplish goals, not just generate text. An agentic AI can use tools (search the web, write files, call APIs, execute code), make decisions, and chain multiple steps together without human intervention at each step. Examples: Claude Code (writes and runs code), n8n AI agents (execute multi-step workflows), AutoGPT. The "agentic" pattern is the biggest trend in AI tooling as of 2026.

See also: [Multi-agent](#multi-agent), [Workflow Automation](#workflow-automation), [SDK](#sdk)

---

## Multi-agent

An architecture where multiple AI agents collaborate on a task, each with specialized roles. For example, one agent researches, another writes, a third reviews. Multi-agent systems can tackle complex tasks that would overwhelm a single agent. Frameworks like Claude Agent SDK, CrewAI, and LangGraph enable multi-agent orchestration. Still experimental in production but rapidly maturing.

See also: [Agentic AI](#agentic-ai), [Workflow Automation](#workflow-automation)

---

## Vibe Coding

A term coined by Andrej Karpathy (2025) describing a coding style where the developer describes what they want in natural language and lets an AI coding assistant (Cursor, Claude Code, Copilot) generate the code. The developer "vibes" with the AI -- reviewing, adjusting, and guiding rather than writing every line. Controversial: critics say it produces fragile code; proponents say it 10x's prototyping speed. Best for MVPs and prototypes, less suitable for production systems without careful review.

See also: [Coding Assistants Category](../categories/coding-assistants.md)

---

## GEO

**Generative Engine Optimization.** The practice of optimizing content to appear in AI-generated responses (ChatGPT, Perplexity, Gemini search) rather than traditional search results. As users shift from Googling to asking AI, GEO is becoming the next frontier of content marketing. Techniques include structuring content for easy extraction, including authoritative citations, and targeting the questions LLMs get asked. Related to but distinct from SEO.

See also: [SEO](#seo), [AI Content Pipeline](../use-cases/ai-content-pipeline.md)

---

## SEO

**Search Engine Optimization.** The practice of optimizing content to rank higher in search engine results (primarily Google). Still important in 2026 but increasingly complemented by GEO. Key techniques: keyword research, on-page optimization, backlink building, technical site performance. AI tools like Surfer SEO automate much of the analysis. AI-generated content is accepted by Google if it meets quality standards.

See also: [GEO](#geo), [Surfer SEO](../tools/surfer-seo.md)

---

## TTS (Text-to-Speech)

Technology that converts written text into spoken audio. Modern AI TTS (ElevenLabs, Voxtral, OpenAI TTS) produces speech nearly indistinguishable from human voices. Used for audiobook production, podcast generation, accessibility, customer service bots, and content creation. Quality has improved dramatically since 2023 -- the best models capture emotion, pacing, and natural speech patterns.

See also: [Voice Cloning](#voice-cloning), [ElevenLabs](../tools/elevenlabs.md), [Voxtral](../tools/voxtral.md)

---

## Voice Cloning

Creating a synthetic replica of a specific person's voice using AI. Professional voice cloning (ElevenLabs PVC) requires ~30 minutes of clean audio. Instant voice cloning works from shorter samples but with lower fidelity. Raises significant ethical concerns about consent, deepfakes, and fraud. Legitimate uses: content creators scaling production, accessibility, preserving voices of people with degenerative conditions.

See also: [TTS](#tts-text-to-speech), [ElevenLabs](../tools/elevenlabs.md)

---

## Tokens

The basic units that LLMs process text in. A token is roughly 3/4 of a word in English (so "artificial intelligence" is about 3 tokens). Pricing for LLM APIs is based on tokens processed -- both input (what you send) and output (what the model generates). Understanding token counts matters for cost estimation and staying within context window limits. Example: 1,000 tokens is roughly 750 words.

See also: [Context Window](#context-window), [API](#api), [LLM](#llm)

---

## Context Window

The maximum amount of text (measured in tokens) an LLM can process in a single conversation. Larger context windows allow the model to work with longer documents and maintain more conversation history. As of 2026: Claude supports up to 1M tokens, Gemini supports 2M tokens, GPT-4o supports 128K tokens. Larger windows cost more per request and may reduce accuracy on information in the "middle" of very long contexts.

See also: [Tokens](#tokens), [LLM](#llm)

---

## API

**Application Programming Interface.** A structured way for software to communicate with other software. In the AI tools context, APIs let you send prompts to an LLM and receive responses programmatically -- essential for building automated workflows, custom apps, and integrations. Most AI tools offer APIs: Claude API, OpenAI API, ElevenLabs API. Pricing is typically usage-based (per token or per request).

See also: [SDK](#sdk), [Tokens](#tokens), [Workflow Automation](#workflow-automation)

---

## SDK

**Software Development Kit.** A collection of tools, libraries, and documentation that makes it easier to build with an API. An SDK wraps the raw API calls in convenient functions for a specific programming language. Examples: Anthropic Python SDK (for Claude), OpenAI Node SDK. The Claude Agent SDK goes further by providing a framework for building autonomous AI agents.

See also: [API](#api), [Agentic AI](#agentic-ai)

---

## Open Source vs Closed Source

In AI, this distinction refers to whether a model's weights and architecture are publicly available. **Open source/open weight** models (Mistral, Llama, Mixtral) can be downloaded, self-hosted, fine-tuned, and inspected. **Closed source** models (GPT-4o, Claude) are only accessible via API -- you can't see or modify the underlying model. Open source offers more control and privacy; closed source typically offers higher capability and easier setup. The line is blurring as "open weight" models become competitive with closed models.

See also: [Mistral](../companies/mistral.md), [LoRA](#lora), [Fine-tuning](#fine-tuning)

---

## SaaS

**Software as a Service.** Software delivered over the internet on a subscription basis rather than installed locally. Most AI tools are SaaS products: you pay monthly and access them via browser or API. Examples: ChatGPT ($20/mo), Surfer SEO ($89/mo), n8n Cloud ($20/mo). The SaaS model dominates AI tools because models require expensive infrastructure to run.

See also: [ARR](#arr), [API](#api)

---

## ARR

**Annual Recurring Revenue.** The annualized value of a company's subscription revenue. A key metric for evaluating SaaS businesses, including AI tool companies. Example: ChatGPT reportedly crossed $2B+ ARR by 2025. ARR matters when evaluating whether an AI tool is likely to survive and continue development -- tools with strong ARR are more sustainable than those burning VC cash with no revenue.

See also: [SaaS](#saas)

---

## Affiliate Marketing

Earning commission by promoting other companies' products. In the AI tools space, many tools offer affiliate programs (20-50% recurring commissions). This creates an opportunity to monetize AI tool expertise by reviewing, comparing, and recommending tools. Relevant to this wiki because many AI tool review sites are funded by affiliate revenue, which can bias recommendations. We disclose any affiliate relationships.

See also: [AI Content Pipeline](../use-cases/ai-content-pipeline.md)

---

## No-code/Low-code

Platforms that allow building software applications with minimal or no programming. In the AI tools space, no-code platforms like n8n, Make, and Zapier let non-developers create AI-powered workflows. Low-code tools like Retool or Bubble add AI capabilities with drag-and-drop interfaces. These tools democratize AI -- you don't need to be a developer to build an AI customer support bot or content pipeline.

See also: [Workflow Automation](#workflow-automation), [n8n](../tools/n8n.md)

---

## Workflow Automation

Using software to automate multi-step business processes that would otherwise require manual human action. In the AI tools context, workflow automation platforms (n8n, Make, Zapier) connect AI models to business tools -- triggering actions, routing data, and orchestrating complex sequences. Examples: auto-responding to support tickets, generating and scheduling social media posts, scoring and routing leads.

See also: [No-code/Low-code](#no-codelow-code), [Agentic AI](#agentic-ai), [n8n](../tools/n8n.md)

---

## Embedding

A numerical representation (vector) of text, images, or other data that captures semantic meaning. Embeddings allow you to measure how similar two pieces of content are by comparing their vectors. Used in RAG systems to find relevant documents, in recommendation engines, and in search. Example: the embeddings for "dog" and "puppy" would be very close in vector space, while "dog" and "refrigerator" would be far apart.

See also: [Vector Database](#vector-database), [RAG](#rag)

---

## Vector Database

A specialized database optimized for storing and searching embeddings (vectors). When you build a RAG system, you store document embeddings in a vector database and query it to find the most relevant passages for a given prompt. Popular options: Pinecone, Weaviate, Chroma, Qdrant. Vector databases are essential infrastructure for any AI application that needs to search through private or domain-specific knowledge.

See also: [Embedding](#embedding), [RAG](#rag)

---

## Hallucination

When an AI model generates information that sounds plausible but is factually incorrect or entirely fabricated. LLMs hallucinate because they are pattern-matching systems, not knowledge databases -- they predict what text "should" come next based on training patterns, not by verifying facts. Mitigation strategies: RAG (grounding in real documents), asking the model to cite sources, human review, lowering temperature settings. Hallucination rates vary by model and task.

See also: [RAG](#rag), [LLM](#llm)

---

## Inference

The process of running a trained AI model to generate outputs (as opposed to training, which is the process of creating the model). When you send a prompt to Claude and get a response, that's inference. Inference costs are what you pay for API usage -- they depend on model size, input/output length, and hardware. Inference optimization (smaller models, quantization, caching) is a major focus for reducing AI tool costs.

See also: [Tokens](#tokens), [Latency](#latency), [API](#api)

---

## Latency

The time delay between sending a request to an AI model and receiving the response. Measured in milliseconds or seconds. Low latency matters for real-time applications like voice agents, coding assistants, and chatbots. Factors affecting latency: model size (larger = slower), input length, output length, server load, geographic distance to API server. Streaming (receiving tokens as they're generated) helps perceived latency even when total generation time is high.

See also: [Inference](#inference), [TTS](#tts-text-to-speech), [API](#api)
