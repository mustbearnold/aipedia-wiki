#!/usr/bin/env node
/**
 * audit-news-xrefs.mjs
 *
 * For every news item in src/content/news/ that declares `affects: [tool-slug, ...]`,
 * check whether the corresponding tool page (src/content/tools/<slug>.md) mentions
 * either the news item's slug or a distinctive phrase from its title.
 *
 * Flags tool pages that are "affected" by recent news but don't reference it.
 * Run `node scripts/audit-news-xrefs.mjs` periodically to catch un-propagated
 * updates before they go stale.
 *
 * Output format: one line per gap, tab-separated: news-slug  tool-slug  title
 */

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const NEWS_DIR = join(HERE, "..", "src/content/news");
const TOOLS_DIR = join(HERE, "..", "src/content/tools");

const newsFiles = readdirSync(NEWS_DIR).filter((f) => f.endsWith(".md"));
const toolSlugs = new Set(
  readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
);

const gaps = [];
let checked = 0;

// How many days back to audit (default: 30)
const DAYS_BACK = Number(process.env.DAYS_BACK || 30);
const cutoff = new Date();
cutoff.setDate(cutoff.getDate() - DAYS_BACK);

for (const newsFile of newsFiles) {
  const raw = readFileSync(join(NEWS_DIR, newsFile), "utf8");
  const fm = raw.split("---")[1] || "";

  // Pull date
  const dateMatch = fm.match(/^date:\s*([0-9-]+)/m);
  if (!dateMatch) continue;
  const date = new Date(dateMatch[1]);
  if (date < cutoff) continue; // skip older items

  // Pull affects
  const affMatch = fm.match(/^affects:\s*\[([^\]]*)\]/m);
  if (!affMatch) continue;
  const affects = affMatch[1]
    .split(",")
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);
  if (affects.length === 0) continue;

  // Pull title (for human context in output)
  const titleMatch = fm.match(/^title:\s*["']?(.+?)["']?$/m);
  const title = titleMatch ? titleMatch[1].replace(/["']/g, "") : "(no title)";

  const newsSlug = newsFile.replace(/\.md$/, "");

  for (const toolSlug of affects) {
    if (!toolSlugs.has(toolSlug)) {
      // affected tool doesn't have a page; could warrant creation but skip for now
      continue;
    }

    checked++;
    const toolPath = join(TOOLS_DIR, `${toolSlug}.md`);
    const toolContent = readFileSync(toolPath, "utf8");

    // Does the tool page reference the news slug OR the title?
    const hasSlugRef = toolContent.includes(newsSlug);
    // Crude: pick 3-word phrase from title and check
    const titleWords = title.replace(/[^\w\s-]/g, "").split(/\s+/).filter((w) => w.length > 3);
    const phraseHit = titleWords.length >= 3 && toolContent.includes(titleWords.slice(0, 3).join(" "));

    if (!hasSlugRef && !phraseHit) {
      gaps.push({ newsSlug, toolSlug, title, date: dateMatch[1] });
    }
  }
}

if (gaps.length === 0) {
  console.log(`OK. Checked ${checked} news-to-tool cross-refs in last ${DAYS_BACK} days. No gaps.`);
  process.exit(0);
}

console.log(`Found ${gaps.length} gap(s): news items affecting a tool page that don't reference them.\n`);
console.log(`news-date\tnews-slug\ttool-slug\ttitle`);
for (const g of gaps) {
  console.log(`${g.date}\t${g.newsSlug}\t${g.toolSlug}\t${g.title}`);
}
console.log(`\nFix: add a link to /news/<news-slug>/ in the affected tool page's body, Key Facts, or price_history.`);
process.exit(1);
