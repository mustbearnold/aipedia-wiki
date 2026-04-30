---
type: news
slug: 2026-04-30-openai-advanced-account-security-yubikeys
title: "OpenAI adds Advanced Account Security for ChatGPT and Codex, with Yubico keys"
date: 2026-04-30
severity: major
summary: "OpenAI launched Advanced Account Security, an opt-in mode that requires passkeys or hardware security keys for ChatGPT and Codex accounts. It improves phishing resistance for high-risk users, but recovery becomes stricter: OpenAI says support cannot recover enrolled accounts through weaker fallback channels."
affects: [chatgpt, codex]
categories: [ai-security, ai-tools, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-30
last_verified: 2026-04-30
related_tools: [chatgpt, codex]
sources:
  - url: "https://openai.com/index/advanced-account-security/"
    title: "Introducing Advanced Account Security - OpenAI"
  - url: "https://investors.yubico.com/en/openai-and-yubico-partner-to-bring-custom-phishing-resistant-yubikeys-to-openai-users/"
    title: "OpenAI and Yubico partner to bring custom phishing-resistant YubiKeys to OpenAI users - Yubico"
  - url: "https://www.axios.com/2026/04/30/openai-chatgpt-logins-passkeys"
    title: "OpenAI gives users option to ditch passwords - Axios"
  - url: "https://techcrunch.com/2026/04/30/openai-announces-new-advanced-security-for-chatgpt-accounts-including-a-partnership-with-yubico/"
    title: "OpenAI announces new advanced security for ChatGPT accounts - TechCrunch"
---

OpenAI is hardening the account layer around ChatGPT and Codex.

On April 30, 2026, OpenAI launched **Advanced Account Security**, an opt-in account mode that requires stronger authentication methods such as passkeys and hardware security keys. The program is aimed at people whose ChatGPT or Codex accounts are likely to be targeted: journalists, researchers, public officials, dissidents, executives, security teams, and developers with access to sensitive code.

## What changed

Advanced Account Security changes login and recovery behavior.

Users who enroll must set up stronger authentication. OpenAI says recovery is restricted to those secure methods, which means OpenAI Support cannot fall back to weaker account-recovery paths if the user loses access. Axios separately reported that email/password login and email or SMS recovery are disabled once the mode is enabled.

OpenAI also partnered with Yubico on a custom YubiKey bundle. Yubico says the bundle pairs a YubiKey C Nano for laptop use with a YubiKey C NFC for backup and mobile workflows. Axios reported preferred pricing for enrolled users.

## Why it matters

AI accounts are becoming high-value targets. A compromised ChatGPT or Codex account can expose private conversations, uploaded documents, workspace memory, code access, agent credentials, or enterprise workflow context.

The security tradeoff is real: stronger phishing resistance comes with stricter recovery. This is the right direction for high-risk users, but casual users should understand the lockout risk before enabling it.

## Tool impact

For **ChatGPT**, this is an account-security improvement rather than a model change. It matters most for users who store sensitive documents, use workspace agents, or rely on memory and connected apps.

For **Codex**, the stakes are higher because agentic coding tools can touch source repositories, terminals, package registries, and deployment credentials. Stronger account authentication is one layer in a broader credential-risk story.

## Buyer takeaway

If ChatGPT or Codex touches sensitive work, enable Advanced Account Security only after you have at least two secure recovery-ready methods. Treat hardware-key backup like production infrastructure: store it safely, document ownership, and avoid single-person lockout for shared operational accounts.

## What to watch

Axios reported that OpenAI plans to require the feature for Trusted Access for Cyber users starting June 1, 2026. If that requirement expands to other high-risk programs, Advanced Account Security may become the default posture for frontier-model access that carries elevated misuse or credential risk.
