#!/usr/bin/env node
// Ping IndexNow (Bing, Yandex, Seznam, Naver) with the current sitemap so
// they re-crawl new and updated URLs within hours instead of weeks.
// Google does not participate in IndexNow; use Search Console + sitemap.
//
// Usage:
//   node scripts/indexnow-ping.mjs              # pings all URLs in sitemap
//   node scripts/indexnow-ping.mjs <url1> <url2>  # pings specific URLs only
//
// Run after each deploy, or call from a Cloudflare Pages post-deploy hook.

import { readFileSync } from 'node:fs';

const HOST = 'aipedia.wiki';
const KEY = readFileSync(new URL('../.indexnow-key', import.meta.url), 'utf8').trim();
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function fetchSitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap-index.xml`);
  const idx = await res.text();
  const subs = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = [];
  for (const sub of subs) {
    const r = await fetch(sub);
    const t = await r.text();
    for (const m of t.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(m[1]);
  }
  return [...new Set(urls)];
}

const extra = process.argv.slice(2);
const urls = extra.length > 0 ? extra : await fetchSitemapUrls();
if (urls.length === 0) {
  console.error('No URLs to ping');
  process.exit(1);
}

console.log(`Pinging IndexNow with ${urls.length} URL${urls.length === 1 ? '' : 's'}...`);

// IndexNow caps at 10,000 URLs per request; chunk conservatively at 1000
const CHUNK = 1000;
for (let i = 0; i < urls.length; i += CHUNK) {
  const batch = urls.slice(i, i + CHUNK);
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: batch,
  };
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  console.log(`  batch ${i / CHUNK + 1}: ${res.status} ${res.statusText}`);
}

console.log('Done.');
