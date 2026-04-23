#!/usr/bin/env node
/**
 * Scaffold a daily AI-industry roundup news file with today's date.
 *
 * Creates src/content/news/<YYYY-MM-DD>-ai-industry-roundup.md with a
 * filled-in frontmatter block and a body template ready to fill with
 * the day's smaller stories. Use this to keep the news feed on a
 * consistent daily cadence even on light news days.
 *
 * Run: node scripts/new-daily-roundup.mjs            # today's date
 *      DATE=2026-04-24 node scripts/new-daily-roundup.mjs
 * Options:
 *   --force   overwrite if the file already exists
 */
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const NEWS_DIR = 'src/content/news';
const DATE = process.env.DATE || new Date().toISOString().slice(0, 10);
const FORCE = process.argv.includes('--force');

if (!/^\d{4}-\d{2}-\d{2}$/.test(DATE)) {
  console.error(`[new-daily-roundup] invalid date: ${DATE}`);
  process.exit(1);
}

const slug = `${DATE}-ai-industry-roundup`;
const path = join(NEWS_DIR, `${slug}.md`);

if (existsSync(path) && !FORCE) {
  console.error(`[new-daily-roundup] file already exists: ${path}\nUse --force to overwrite.`);
  process.exit(2);
}

const pretty = new Date(DATE + 'T12:00:00Z').toLocaleDateString('en-US', {
  month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
});

const template = `---
type: news
slug: ${slug}
title: "AI Industry Roundup, ${pretty}: [SHORT LIST]"
date: ${DATE}
severity: minor
summary: "Daily roundup of AI-industry activity on and around ${pretty} that didn't individually merit a full deep-dive. Covered: [FILL IN 3-6 items: partnerships, tool launches, pricing, policy, social-buzz]."
affects: []
categories: [ai-business, ai-industry]
author: "aipedia.wiki Editorial"
last_updated: ${DATE}
last_verified: ${DATE}
sources:
  - url: "https://techcrunch.com/category/artificial-intelligence/"
    title: "TechCrunch AI category"
  - url: "https://news.ycombinator.com/"
    title: "Hacker News front page (AI-related submissions)"
  - url: "https://www.crescendo.ai/news/latest-ai-news-and-updates"
    title: "Crescendo AI aggregated news coverage"
---

One-day snapshot of AI-industry activity across partnerships, tool launches, policy, and buzz. Each item lands here when it didn't individually clear the bar for a full deep-dive news item but matters to a TODAY reader tracking the space.

## [Item 1 heading]

Brief paragraph. What happened, who did it, why it matters. Link sources inline where possible.

## [Item 2 heading]

...

## [Item 3 heading]

...

## Social / discussion

- Notable threads or industry-Twitter context from ${pretty}.

## Why this is a roundup, not a deep-dive

These items either lack a primary-source press release, are early-stage trial balloons, or are "incremental move in a known story" updates. When one of them grows into a full story, promote it to its own news item.
`;

writeFileSync(path, template);
console.log(`[new-daily-roundup] wrote ${path}`);
console.log(`[new-daily-roundup] fill in the bracketed placeholders and set severity: major if any item warrants it.`);
