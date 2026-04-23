#!/usr/bin/env node
/**
 * Surface tool pages that mention entities or topics which just moved in
 * recent news. Does not auto-edit; prints a punch list for human review.
 *
 * Strategy:
 *   1. Read all news items from the last N days (default 7).
 *   2. For each news item, extract the affected tool slugs (from the
 *      `affects:` frontmatter field) plus key noun phrases from the
 *      title (capitalised words of 3+ chars, filtered by a stopword set).
 *   3. For each tool page NOT listed in that news item's affects, check
 *      if the page body mentions any of those noun phrases. If it does,
 *      flag it as a candidate for review (the tool page might need an
 *      update reflecting the news item).
 *
 * Output: grouped list of (tool page -> news items it may need to
 * incorporate), sorted by mention density.
 *
 * Run: node scripts/surface-stale-claims.mjs           # last 7 days
 *      WINDOW_DAYS=14 node scripts/surface-stale-claims.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT = 'src/content';
const NEWS_DIR = join(CONTENT, 'news');
const TOOLS_DIR = join(CONTENT, 'tools');
const WINDOW_DAYS = Number(process.env.WINDOW_DAYS || 7);
const MIN_MENTIONS = Number(process.env.MIN_MENTIONS || 1);

const STOPWORDS = new Set([
  'And','The','For','Of','In','On','Up','To','At','By','As','Is','Are','Was','Were',
  'With','Without','From','Into','Over','Under','After','Before','During','Between',
  'AI','Per','New','Its',
  'Cloud','Next','Day','2026','2027','January','February','March','April','May','June','July','August','September','October','November','December',
  'US','EU','UK','USA','China','Google','Apple','Microsoft','OpenAI','Anthropic','Meta','Amazon','Nvidia',
]);

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const yaml = m[1];
  const body = m[2];
  const data = {};
  const dateM = yaml.match(/^date:\s*(\S+)/m);
  if (dateM) data.date = dateM[1].replace(/['"]/g, '');
  const titleM = yaml.match(/^title:\s*"?([^\n"]+)"?/m);
  if (titleM) data.title = titleM[1].replace(/["']$/, '');
  const slugM = yaml.match(/^slug:\s*(\S+)/m);
  if (slugM) data.slug = slugM[1];
  const affectsM = yaml.match(/^affects:\s*\[([^\]]*)\]/m);
  if (affectsM) {
    data.affects = affectsM[1].split(',').map((s) => s.trim()).filter(Boolean);
  } else {
    data.affects = [];
  }
  return { data, body };
}

function extractKeyNouns(title) {
  // Capitalised runs like "TPU 8t", "Agentic Data Cloud", "Ironwood", "GPT Image 2".
  // Simple heuristic: split by whitespace, pick tokens that start with an
  // uppercase letter or contain a digit, filter stopwords, require length 3+.
  const tokens = title.split(/\s+/);
  const out = new Set();
  for (const tRaw of tokens) {
    const t = tRaw.replace(/[.,;:!?()[\]"'`]/g, '');
    if (t.length < 3) continue;
    if (/^[A-Z]/.test(t) || /\d/.test(t)) {
      if (!STOPWORDS.has(t)) out.add(t);
    }
  }
  return [...out];
}

function daysAgo(iso) {
  const then = new Date(iso);
  if (isNaN(then.getTime())) return Infinity;
  const now = new Date();
  return Math.floor((now.getTime() - then.getTime()) / 86400000);
}

function loadRecentNews() {
  const files = readdirSync(NEWS_DIR).filter((f) => f.endsWith('.md'));
  const out = [];
  for (const f of files) {
    const raw = readFileSync(join(NEWS_DIR, f), 'utf8');
    const { data } = parseFrontmatter(raw);
    if (!data.date) continue;
    const age = daysAgo(data.date);
    if (age > WINDOW_DAYS || age < 0) continue;
    out.push({
      slug: data.slug || f.replace(/\.md$/, ''),
      date: data.date,
      title: data.title || '',
      affects: data.affects || [],
      nouns: extractKeyNouns(data.title || ''),
    });
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}

function loadTools() {
  const files = readdirSync(TOOLS_DIR).filter((f) => f.endsWith('.md'));
  return files.map((f) => {
    const raw = readFileSync(join(TOOLS_DIR, f), 'utf8');
    const { data, body } = parseFrontmatter(raw);
    return {
      slug: data.slug || f.replace(/\.md$/, ''),
      body,
    };
  });
}

const news = loadRecentNews();
const tools = loadTools();

console.log(`[stale-claims] window: last ${WINDOW_DAYS} days  |  news items: ${news.length}  |  tool pages: ${tools.length}`);

// Build a tool-page frequency map for every noun across every news item.
// Nouns that show up on more than 40% of tool pages are generic (Gemini,
// Agent, Platform, ...). Filter those out for signal quality.
const allNouns = new Set();
for (const n of news) for (const noun of n.nouns) allNouns.add(noun);

const nounFrequency = new Map(); // noun -> count of tool pages containing it
for (const noun of allNouns) {
  const re = new RegExp(`\\b${noun.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  let count = 0;
  for (const t of tools) if (re.test(t.body)) count++;
  nounFrequency.set(noun, count);
}

// A noun is "distinctive" if it appears on fewer than 40% of tool pages.
const COMMONNESS_CEILING = Math.floor(tools.length * 0.4);
const distinctiveNouns = new Set(
  [...nounFrequency.entries()]
    .filter(([, c]) => c > 0 && c < COMMONNESS_CEILING)
    .map(([n]) => n)
);
console.log(`[stale-claims] distinctive nouns (appear on <40% of tool pages): ${distinctiveNouns.size} of ${allNouns.size} total`);
console.log('');

// candidate map: tool-slug -> [{news-slug, matchedNouns[]}]
const candidates = new Map();

for (const n of news) {
  if (n.nouns.length === 0) continue;
  const filteredNouns = n.nouns.filter((nn) => distinctiveNouns.has(nn));
  if (filteredNouns.length === 0) continue;
  const affectsSet = new Set(n.affects);
  for (const t of tools) {
    if (affectsSet.has(t.slug)) continue; // tool already covers this
    const matched = filteredNouns.filter((noun) => {
      const re = new RegExp(`\\b${noun.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return re.test(t.body);
    });
    if (matched.length >= MIN_MENTIONS) {
      const list = candidates.get(t.slug) ?? [];
      list.push({ news: n.slug, title: n.title, matchedNouns: matched });
      candidates.set(t.slug, list);
    }
  }
}

// Sort tools by total match signal (count of news items that mention its
// key nouns), desc. Top of the list is worth eyeballing first.
const ranked = [...candidates.entries()]
  .map(([slug, hits]) => ({
    slug,
    hits,
    signal: hits.reduce((s, h) => s + h.matchedNouns.length, 0),
  }))
  .sort((a, b) => b.signal - a.signal || b.hits.length - a.hits.length);

if (ranked.length === 0) {
  console.log('No candidate tool pages found.');
  process.exit(0);
}

console.log(`Candidates worth reviewing (top of list = strongest match signal):\n`);
for (const r of ranked.slice(0, 30)) {
  console.log(`  ${r.slug}  (signal: ${r.signal}, across ${r.hits.length} news item${r.hits.length === 1 ? '' : 's'})`);
  for (const h of r.hits.slice(0, 3)) {
    console.log(`      ${h.news}`);
    console.log(`        matched: ${h.matchedNouns.slice(0, 5).join(', ')}`);
  }
  if (r.hits.length > 3) console.log(`      ... and ${r.hits.length - 3} more news items`);
  console.log('');
}
if (ranked.length > 30) {
  console.log(`... and ${ranked.length - 30} more tool pages with weaker signal.`);
}
console.log(`\n[stale-claims] Review these manually; the script does not auto-edit.`);
