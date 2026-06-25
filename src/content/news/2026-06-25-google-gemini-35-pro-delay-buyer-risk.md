---
type: news
slug: 2026-06-25-google-gemini-35-pro-delay-buyer-risk
title: "Reported Gemini 3.5 Pro delay keeps Gemini buyers on Flash for now"
date: 2026-06-25
severity: major
summary: "Business Insider reported that Google delayed Gemini 3.5 Pro from June to July while refining the model with early-tester feedback. Teams should avoid building procurement docs around an unreleased Pro route."
categories: [ai-chatbots, ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-25
last_verified: 2026-06-25
related_tools: [gemini]
sources:
  - url: https://www.businessinsider.com/google-3-5-pro-july-release-tokens-ai-agents-model-2026-6
    title: "Business Insider: Google delays Gemini 3.5 Pro launch to July"
  - url: https://ai.google.dev/gemini-api/docs/changelog
    title: "Google AI for Developers: Gemini API release notes"
  - url: https://ai.google.dev/gemini-api/docs/models
    title: "Google AI for Developers: Gemini models"
---

# Reported Gemini 3.5 Pro delay keeps Gemini buyers on Flash for now

Business Insider reported on June 25 that Google delayed Gemini 3.5 Pro from a June launch window to July while it incorporates early feedback. Google has not published a matching launch post in the Gemini API release notes as of AiPedia's June 25 check.

That makes the buyer takeaway simple: [Gemini](/tools/gemini/) 3.5 Flash is the current stable Google API route to plan around. Gemini 3.5 Pro may matter soon, but it should not be treated as a live production dependency until Google documents the model, pricing, limits, and availability.

## What changed

- Business Insider reported a Gemini 3.5 Pro timing slip from June to July.
- The report says Google is using early feedback from Antigravity and LMArena-style testing before release.
- Google's Gemini API release notes still list Gemini 3.5 Flash as the generally available Gemini 3.5 model.
- Google did ship a separate June 24 Computer Use public preview for Gemini 3.5 Flash.

## Buyer value

Model delays are not just launch-calendar trivia. They affect eval plans, internal docs, procurement comparisons, and migration promises. If a team says "we will standardize on Gemini 3.5 Pro next month," the plan needs a fallback.

Use Gemini 3.5 Flash for current production evaluation unless your Google account has documented access to a newer route. Keep model IDs, pricing rows, context limits, and safety settings in the same document as your benchmark results.

## What to do

If you are evaluating Gemini against ChatGPT, Claude, Copilot, or open-model gateways, freeze your benchmark on currently available models. Add a review date for Gemini 3.5 Pro after Google publishes official docs. Do not mix early-access screenshots with production pricing assumptions.

If you already depend on Gemini for agentic work, the more relevant June 24 update is Computer Use in public preview for Gemini 3.5 Flash. Test that feature separately from any unreleased Pro model.

## AiPedia take

The delay, if accurate, is not a reason to write off Gemini. It is a reason to keep buyer docs precise. Flash is current. Pro is pending. Procurement should not blur the two.
