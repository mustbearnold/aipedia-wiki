---
type: news
slug: 2026-06-11-openai-codex-rate-limit-banking
title: "OpenAI adds rate-limit reset banking and referrals to Codex for Plus and Pro users"
date: 2026-06-11
severity: minor
summary: "OpenAI's Codex app 26.609 lets Plus and Pro users bank rate-limit resets and trigger them when they actually need the headroom, plus a referral program where both people earn a banked reset. Business members can invite coworkers for shared workspace credits. Banked resets last 30 days."
categories: [ai-coding, ai-automation]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-13
last_verified: 2026-06-13
related_tools: [codex, chatgpt, claude-code, cursor]
sources:
  - url: https://developers.openai.com/codex/changelog
    title: "OpenAI: Codex changelog (app 26.609, June 11, 2026)"
---

# OpenAI adds rate-limit reset banking and referrals to Codex for Plus and Pro users

On June 11, 2026, OpenAI shipped **Codex app 26.609**, which changes how rate limits work for paid users. Instead of a reset arriving on a fixed schedule whether you need it or not, eligible Plus and Pro users can now **bank a reset and trigger it at the moment they actually hit the wall**. The release also adds a referral program and shared workspace credits for Business members.

AiPedia verified the OpenAI Codex changelog on June 13, 2026.

## What changed

- **Rate-limit reset banking:** Plus and Pro users can save a rate-limit reset and use it when they need the headroom, rather than losing it to the clock. The launch includes one free reset.
- **Referrals:** users can send referral invitations from within the Codex app. When an eligible recipient sends their first Codex message, both people receive a banked reset. Banked resets are usable for 30 days after they are granted.
- **Business workspace credits:** eligible Business members can invite coworkers to earn shared workspace credits through a separate referral program.

This is a usage-economics change, not a model change. The underlying point is giving heavy users control over when their capacity refreshes.

## Why it matters

For developers who live in a coding agent, rate limits are the daily friction point. A fixed reset schedule is wasteful in both directions: you burn resets you did not need on quiet days, and you stall on the day a long agent run hits the ceiling. Banking shifts that control to the user and makes a paid tier feel less arbitrary during crunch.

The referral mechanic is also a quiet growth lever. Tying a tangible reward, a banked reset, to onboarding a new active user is a cheaper acquisition path than discounts, and it spreads Codex through teams from the inside.

It is a small release, but it is the kind of quality-of-life change that decides which coding agent developers keep open all day. The competition here, [Claude Code](/tools/claude-code/) and [Cursor](/tools/cursor/) among them, is increasingly fought on limits, latency, and cost predictability as much as raw model quality.

## Buyer action

- If your team runs [Codex](/tools/codex/) on Plus or Pro, update to app 26.609 and claim the free reset. Build banking into how you pace long agent runs so you do not stall mid-task.
- Use the 30-day expiry as a planning constraint: banked resets are not a permanent stockpile, so spend them around known heavy work.
- Business admins should look at the shared workspace credit referral as a low-cost way to expand seats internally, but confirm it fits your billing and access policy first.
- If limits are your main pain point, this is a reason to re-test Codex head to head against your current agent on a real, limit-bound workload rather than a quick demo.

## AiPedia verdict

Reset banking is a minor feature with an outsized effect on how a paid coding agent feels under pressure. It will not change which model is smartest, but it changes who hits a wall on a bad day, and that is exactly the kind of friction that decides daily-driver loyalty. Worth the update for any Codex-heavy team.
