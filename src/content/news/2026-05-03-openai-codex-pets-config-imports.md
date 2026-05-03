---
type: news
slug: 2026-05-03-openai-codex-pets-config-imports
title: "OpenAI Codex adds Pets, Hatch, and cross-agent config imports"
date: 2026-05-03
severity: minor
summary: "Codex Desktop's playful Pets update hides a more strategic move: importing other agents' configuration files lowers switching friction and makes Codex feel more like the desktop home for agentic coding."
affects: [codex]
categories: [ai-coding, ai-productivity]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-03
last_verified: 2026-05-03
sources:
  - url: https://www.testingcatalog.com/openai-adds-animated-pets-and-config-imports-to-codex/
    title: "TestingCatalog: OpenAI adds animated Pets and config imports to Codex"
---

# OpenAI Codex adds Pets, Hatch, and cross-agent config imports

OpenAI's latest Codex Desktop update looks whimsical on the surface and strategic underneath. TestingCatalog reports that Codex now has Pets: animated pixel-art companions that sit as overlays on the screen, show short status bubbles while Codex works in the background, and open a reply path back to the agent when clicked. Users can summon or hide them with the `/pet` command.

The bundled Hatch skill lets users turn an uploaded image into a custom animated pet saved in the local Codex home folder. Community directories started appearing quickly, which is exactly the kind of viral, identity-bearing feature that makes a developer tool feel sticky.

But the utility update matters more: Codex now detects and imports configuration files from other coding agents, including Claude Code's CLAUDE.md. It also adds a dictation dictionary for abbreviations and personal phrases that voice input otherwise mangles.

## Why this matters

Pets are a status UI disguised as fun. Agentic coding often runs in the background for minutes or hours. A small overlay that tells you what the agent is doing, lets you respond, and stays visible while the main app is minimized can reduce the "is it still working?" anxiety that background agents create.

The config-import feature is the stronger competitive move. Power users increasingly bounce between Cursor, Claude Code, Codex, Copilot, and local agents depending on model limits, task type, and pricing. Their real asset is not only the codebase. It is the accumulated project instructions, conventions, and tool rules that make agents behave. If Codex can ingest those rules instead of forcing users to rewrite them, switching costs drop.

That is dangerous for competitors and useful for users. The coding-agent market is becoming less about one pristine prompt and more about portable operating context.

## Buyer take

Treat this as a small feature release with a big product signal. OpenAI is trying to make Codex Desktop feel like the ambient developer agent layer, not merely a place where you submit tasks.

Teams should test config import carefully. Pulling in another agent's instructions can save setup time, but it can also import stale rules, unsafe commands, or tool assumptions that do not map cleanly to Codex. Review imported conventions before letting the agent run against production repos.

For individual developers, Pets are harmless if you like them and ignorable if you do not. The real reason to update is config portability and improved voice dictation. Those are the features that make Codex easier to run as a daily background assistant.
