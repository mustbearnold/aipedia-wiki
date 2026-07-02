---
type: news
slug: 2026-07-01-github-copilot-vision-browser-tools-ga
title: "GitHub Copilot ships vision and in-editor browser control to general availability"
date: 2026-07-01
severity: minor
summary: "GitHub made Copilot vision (image and PDF attachments in chat) and Copilot browser tools (agent-driven browser control in VS Code) generally available on July 1, both on by default with no admin setup required. Enterprise admins get a dedicated toggle for the browser feature."
categories: [ai-coding, ai-automation]
author: "aipedia.wiki Editorial"
last_updated: 2026-07-01
last_verified: 2026-07-01
related_tools: [github-copilot, claude-code, cursor]
sources:
  - url: https://github.blog/changelog/2026-07-01-copilot-vision-is-generally-available/
    title: "GitHub Changelog: Copilot vision is generally available"
  - url: https://github.blog/changelog/2026-07-01-browser-tools-for-github-copilot-in-vs-code-are-generally-available/
    title: "GitHub Changelog: Browser tools for GitHub Copilot in VS Code are generally available"
  - url: https://github.blog/changelog/2026-06-30-claude-sonnet-5-is-generally-available-for-github-copilot/
    title: "GitHub Changelog: Claude Sonnet 5 is generally available for GitHub Copilot"
---

# GitHub Copilot ships vision and in-editor browser control to general availability

GitHub pushed two Copilot features to general availability on July 1: Copilot vision, which lets developers attach images and PDFs directly to chat prompts, and Copilot browser tools, which give Copilot agents control of a real browser inside VS Code. Both landed the day after [Claude Sonnet 5 reached general availability in GitHub Copilot](/news/2026-06-30-claude-sonnet-5-github-copilot-ga/), rounding out a busy week of Copilot releases.

Neither feature requires setup. Both are enabled by default across eligible plans, which is the detail buyers should pay attention to.

## What changed

- Copilot vision lets users attach JPEG, PNG, GIF, WebP images and PDFs to prompts in Copilot Chat in VS Code, on github.com, and in the Copilot CLI, so Copilot can reason about screenshots, diagrams, and documents alongside code.
- Vision is available to all Copilot plans, including Free, Pro, Pro+, Business, and Enterprise, with no policy change or admin action needed to turn it on.
- For Business and Enterprise users, GitHub retains attached images and PDFs for approximately 24 hours to deliver the service.
- Browser tools let Copilot agents navigate pages, click, type, hover, drag, handle dialogs, read page content, capture console errors, and take screenshots directly inside VS Code, in both the editor window and the Agents window.
- Agent-driven browser tabs run in isolated sessions with no access to the user's browsing cookies or storage, and agents need explicit "Share with Agent" permission to touch a tab the user already has open.
- Sensitive browser permissions (camera, microphone, location, notifications, clipboard reads) require explicit per-site approval.
- Enterprise admins can disable browser tools with the `workbench.browser.enableChatTools` setting and existing network domain controls.
- The releases follow [Claude Sonnet 5 reaching general availability in Copilot on June 30](/news/2026-06-30-claude-sonnet-5-github-copilot-ga/) for Pro, Pro+, Max, Business, and Enterprise users under Zero Data Retention, billed at provider list pricing.

## Buyer signal

Vision and browser control both push Copilot further from "autocomplete with chat" toward an agent that can perceive and act on the same surfaces a developer does: screenshots, PDFs of specs, and live web apps for debugging or QA. That is squarely [AI Coding](/categories/ai-coding/) and [AI Automation](/categories/ai-automation/) territory, and it puts Copilot's default-on browser access in the same conversation as agent tools shipping in [Cursor](/tools/cursor/) and [Claude Code](/tools/claude-code/).

The default-on posture is the real story for enterprise buyers. A feature that lets an agent drive a live browser and read page content, screenshots, and console errors is powerful, but "on by default" means security and IT teams need to know it exists before a developer discovers it mid-task.

## What to do

- Enterprise and Business admins should decide now whether `workbench.browser.enableChatTools` should stay on, and pair that decision with existing network domain allowlists.
- Confirm your data-handling policy accounts for the approximately 24-hour retention window GitHub applies to images and PDFs attached via Copilot vision on Business and Enterprise plans.
- If your team already treats agent browser access as a reviewed capability elsewhere (Cursor, Claude Code, custom agents), extend the same review checklist to Copilot's browser tools rather than treating it as a lesser feature.
- Test Copilot vision against your actual use cases (architecture diagrams, spec PDFs, bug screenshots) before relying on it for anything customer-facing.

## AiPedia take

Shipping vision and browser control default-on, back to back with a new Sonnet-class model, is GitHub moving fast on agent capability. The pattern to watch is whether GitHub's admin controls (the browser toggle, ZDR on model usage) keep pace with how quickly these features reach every seat by default.
