---
type: news
slug: 2026-04-16-openai-codex-desktop-super-app
title: "OpenAI Turns Codex Desktop into a Super App: Computer Use, Memory, gpt-image-1.5, 90+ Plugins"
date: 2026-04-16
severity: major
summary: "OpenAI shipped a major Codex Desktop update on April 16, 2026. Adds Computer Use (Codex operates apps directly with a virtual cursor), Memory (persistent context across sessions), gpt-image-1.5 image generation, in-app browser, and 90+ new plugins. OpenAI frames this as the 'first phase' of an all-encompassing super app. Positions Codex Desktop against Anthropic's Claude Code on the desktop-agent frontier. Rolling out to ChatGPT-signed-in Codex desktop users now; EU/UK later."
affects: [chatgpt, claude-code, cursor]
categories: [ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-18
last_verified: 2026-04-18
sources:
  - url: "https://openai.com/index/codex-for-almost-everything/"
    title: "Codex for (almost) everything - OpenAI"
  - url: "https://www.macrumors.com/2026/04/16/openai-codex-mac-update/"
    title: "OpenAI Codex Update Adds Computer Use, Image Generation, Memory - MacRumors"
  - url: "https://decrypt.co/364670/codex-computer-use-browser-image-gen-openai-super-app"
    title: "OpenAI Super App Takes Shape - Decrypt"
---

OpenAI pushed a major **Codex Desktop app** update on April 16, 2026, framing it internally as "the first phase of an all-encompassing super app." The release lands the same day as Claude Opus 4.7 and one day before the Claude Design launch. AI desktop-agent competition is now a week-by-week race.

## Six capabilities added

**1. Computer Use**

Codex now operates applications directly: sees the screen, moves a virtual cursor, clicks, types. No API integration required. Multiple Codex agents can run in parallel without interrupting your own work. Initially macOS only, Windows and EU/UK rolling out.

**2. Memory**

Persistent context across sessions. Codex remembers your personal preferences, corrections, and slow-to-gather information so subsequent tasks complete faster and at higher quality. Direct response to the complaint that ChatGPT's session-scoped context forces users to re-explain setups.

**3. gpt-image-1.5**

New image model inside Codex. Generates and iterates on images combined with screenshots and code. Intended for product concept visuals, frontend design, mockups, and game assets inside the same workflow as the code.

**4. In-app browser**

Codex can now navigate, fill forms, and scrape content without leaving the desktop app. Enables web research and lightweight automation without MCP servers.

**5. 90+ plugins**

Combines skills, app integrations, and MCP servers. Plugin marketplace expansion is the mechanism for making Codex useful across more professional tool surfaces (Figma, Linear, GitHub, Notion, Slack, Jira, etc.).

**6. Multi-agent workflows**

Codex agents run concurrently. Different agents can work on different codebases, different modules, or different tasks simultaneously.

## The "super app" framing

OpenAI's explicit positioning: **Codex is the foundation of a broader super app strategy.** Not just a coding tool, but an operating layer that:
- Uses your computer (Computer Use)
- Remembers you (Memory)
- Generates visuals (gpt-image-1.5)
- Browses the web (in-app browser)
- Talks to your tools (90+ plugins + MCP)

This is the same trajectory WeChat took from messenger to super app in China. Whether it works at OpenAI scale is the 2026-2027 question.

## How it compares to Claude Code and Cursor

| | Codex Desktop | Claude Code | Cursor |
|---|---|---|---|
| **Surface** | Dedicated desktop app (macOS first) | Terminal CLI | IDE (VS Code fork) |
| **Primary interaction** | Agent + chat + computer use | Terminal-native autonomous runs | In-editor edit + Agents Window |
| **Backing model** | GPT-5.4 / GPT-5.4 Pro | Claude Opus 4.7 default | User-selectable |
| **Memory** | Yes (new April 16) | Session + Projects | Via rules + .cursorrules |
| **Computer use** | Yes (new April 16, macOS first) | Research preview | No native computer use |
| **Image gen** | gpt-image-1.5 bundled | None native | None native |
| **Plugins** | 90+ (new April 16) | MCP + Anthropic Skills | Extensions + custom commands |
| **Best for** | Developers + non-developers who want AI on their desktop | Advanced CLI-driven coding | IDE-native code editing |

## Availability rollout

- **Today (April 16):** ChatGPT-signed-in Codex desktop users, macOS first
- **Enterprise, Edu users:** Personalization + Memory rolling out
- **EU and UK users:** Memory + Computer Use rolling out "soon"
- **Windows:** After macOS rollout completes

## Why this matters

The same week Anthropic ships Opus 4.7 and Claude Design, OpenAI ships Codex Desktop with computer use + memory + image gen + plugins. These are the two **biggest AI companies racing for the desktop agent default in 2026**.

Winning the default desktop agent is the winning the consumer-AI product layer. Memory + computer use are the two capabilities that turn an LLM into something people treat as a personal OS-level assistant rather than a tool you open when you need to.

For Cursor: no immediate threat since the Codex update is desktop-agent, not an IDE. But the Computer Use + Memory combo in a super app framing is the kind of thing that could eventually eat into the IDE-as-your-home paradigm Cursor has built.

## Sources

- [OpenAI: Codex for (almost) everything](https://openai.com/index/codex-for-almost-everything/)
- [MacRumors: OpenAI Codex Update Adds Computer Use, Image Generation, Memory](https://www.macrumors.com/2026/04/16/openai-codex-mac-update/)
- [Decrypt: OpenAI Super App Takes Shape](https://decrypt.co/364670/codex-computer-use-browser-image-gen-openai-super-app)
- [gHacks: OpenAI Updates Codex With 90-Plus New Plugins](https://www.ghacks.net/2026/04/17/openai-updates-codex-with-computer-use-in-app-browser-memory-and-90-plus-new-plugins/)
- [Testing Catalog: Codex transformed into Superapp](https://www.testingcatalog.com/openai-codex-transformed-into-superapp-with-computer-use/)
