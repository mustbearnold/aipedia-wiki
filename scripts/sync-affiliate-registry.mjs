// Sync tools-registry.json with today's affiliate updates for the 6 tools refreshed 2026-05-13.
import fs from 'node:fs';
import path from 'node:path';

const registryPath = path.resolve('src/data/_meta/tools-registry.json');
const data = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const today = '2026-05-13T00:00:00.000Z';
const todayDate = '2026-05-13';

const updates = {
  murf: {
    affiliate: {
      has_program: true,
      commission: '20%',
      cookie_days: null,
      network: 'ShareASale',
      link: null,
      application_status: 'applied',
      applied_date: today,
      notes: 'Applied via ShareASale 2026-05-13; direct URL submitted: https://aipedia.wiki/tools/murf/.',
    },
  },
  quillbot: {
    affiliate: {
      has_program: true,
      commission: '10% monthly / 15% semi-annual / 20% annual plans',
      cookie_days: 30,
      network: 'PartnerStack',
      link: null,
      application_status: 'applied',
      applied_date: today,
      notes: 'Applied via PartnerStack 2026-05-13; review time quoted >5 days.',
    },
  },
  gamma: {
    affiliate: {
      has_program: true,
      commission: '30% first year',
      cookie_days: null,
      network: 'PartnerStack',
      link: null,
      application_status: 'applied',
      applied_date: today,
      notes: 'Applied via PartnerStack 2026-05-13; direct URL submitted: https://aipedia.wiki/tools/gamma/.',
    },
  },
  lindy: {
    affiliate: {
      has_program: true,
      commission: '30% Y1 + 15% Y2 recurring',
      cookie_days: null,
      network: 'PartnerStack',
      link: null,
      application_status: 'applied',
      applied_date: today,
      notes: 'Applied via PartnerStack 2026-05-13; direct URL submitted: https://aipedia.wiki/tools/lindy/.',
    },
  },
  activepieces: {
    affiliate: {
      has_program: true,
      commission: 'Up to $17.5k/yr per enterprise customer (3-year payout)',
      cookie_days: null,
      network: 'PartnerStack',
      link: null,
      application_status: 'applied',
      applied_date: today,
      notes: 'Applied via PartnerStack 2026-05-13 to Activepieces partner certification program.',
    },
  },
  // Consensus already set in a previous edit — re-applying for safety
  consensus: {
    affiliate: {
      has_program: true,
      commission: '30% on paid signups, first 12 months (~$36 avg per signup)',
      cookie_days: null,
      network: 'PartnerStack',
      link: 'https://get.consensus.app/zqm1pbf16aj2',
      application_status: 'approved',
      applied_date: today,
      approved_date: today,
      notes: 'Instant approval via PartnerStack 2026-05-13.',
    },
  },
};

let changed = 0;
for (const [slug, patch] of Object.entries(updates)) {
  const entry = data.tools[slug];
  if (!entry) {
    console.warn(`! Missing slug in registry: ${slug}`);
    continue;
  }
  entry.affiliate = patch.affiliate;
  entry.last_updated = today;
  entry.last_verified = today;
  changed++;
}

data.generated = new Date().toISOString();

fs.writeFileSync(registryPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`Updated ${changed} tools. Registry written.`);
