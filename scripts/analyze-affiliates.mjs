// One-off analyzer: classifies every tool in tools-registry.json by affiliate state.
import fs from 'node:fs';
import path from 'node:path';

const registryPath = path.resolve('src/data/_meta/tools-registry.json');
const data = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

const buckets = {
  approved: [],
  applied: [],
  rejected: [],
  paused: [],
  none: [],
  noProgram: [],
  candidate: [],
};

for (const [slug, tool] of Object.entries(data.tools)) {
  const aff = tool.affiliate || {};
  const status = aff.application_status || null;
  const has = aff.has_program === true;
  const hasLink = typeof aff.link === 'string' && aff.link.startsWith('http');

  const row = {
    slug,
    title: tool.title,
    category: tool.category,
    has_program: has,
    network: aff.network || null,
    commission: aff.commission || null,
    cookie_days: aff.cookie_days || null,
    status,
    applied_date: aff.applied_date || null,
    declined_date: aff.declined_date || null,
    approved_date: aff.approved_date || null,
    link: aff.link || null,
    notes: aff.notes || null,
  };

  if (status === 'approved' || hasLink) buckets.approved.push(row);
  else if (status === 'applied') buckets.applied.push(row);
  else if (status === 'rejected') buckets.rejected.push(row);
  else if (status === 'paused') buckets.paused.push(row);
  else if (status === 'none') buckets.none.push(row);
  else if (!has) buckets.noProgram.push(row);
  else buckets.candidate.push(row);
}

const summary = Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, v.length]));
console.log('SUMMARY', JSON.stringify(summary, null, 2));

console.log('\n=== APPROVED / LIVE (excluded) ===');
for (const r of buckets.approved) console.log(`- ${r.title} [${r.network || '?'}]`);

console.log('\n=== APPLIED / PENDING (excluded) ===');
for (const r of buckets.applied) console.log(`- ${r.title} [${r.network || '?'}] applied ${r.applied_date}`);

console.log('\n=== REJECTED / DECLINED (excluded) ===');
for (const r of buckets.rejected) console.log(`- ${r.title} [${r.network || '?'}] declined ${r.declined_date || r.applied_date}`);

console.log('\n=== PAUSED / NONE / NO PROGRAM (excluded) ===');
for (const r of buckets.paused) console.log(`- ${r.title} [paused] ${r.notes || ''}`);
for (const r of buckets.none) console.log(`- ${r.title} [none]`);

console.log(`\n(skipping ${buckets.noProgram.length} tools with no affiliate program at all)`);

console.log('\n=== CANDIDATES TO APPLY FOR ===');
const sorted = buckets.candidate.sort((a, b) => a.title.localeCompare(b.title));
for (const r of sorted) {
  const bits = [r.network || 'unknown network', r.commission || 'commission ?', r.cookie_days ? `${r.cookie_days}d cookie` : 'cookie ?'];
  console.log(`- ${r.title} (${r.category}) — ${bits.join(' | ')}`);
}
console.log(`\nTotal candidates: ${sorted.length}`);
