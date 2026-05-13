// Match the PartnerStack offer list against tools-registry.json.
import fs from 'node:fs';
import path from 'node:path';

const registryPath = path.resolve('src/data/_meta/tools-registry.json');
const data = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const tools = Object.values(data.tools);

const candidates = [
  'Close','Ignition','Gamma','Tidio','Reply.io','Castmagic','Landbot','Landingi','Quartile',
  'Runpod','Seamless','Motion','SaneBox','SleekFlow','Brand24','Emergent','Lindy','Plesk',
  'MeetGeek','Reclaim.ai','KrispCall','Flowith','Lusha','Browse AI','soona','Atria',
  'MindStudio','Consensus','AiSDR','Alidrop','Airia','Assembly','Catalister','Pangram Labs',
  'Netlify','Tradify','BidX','Expertise AI','Spiky.ai','Vista Social','Rebolt','Vida Global',
  'Smartli','Databox','BLACKBOX AI','Logome.ai','Weave','SureCam','Beautiful.ai','Evolve',
  'DataSnipper','DataHawk','Rank Prompt','ThorData','Puzzle.io','Snowfire AI','Demodesk',
  'Calilio','TTSOpenAI','Pinecone','Synthflow AI','Turbotic','Activepieces','Canvas Score',
  'Backlog','Interakt','Adwisely','Handrails','Distance','Dry Ground AI','Shade',
  'Teikametrics','Confido Health','AISQ','TheTop','Typewise','TestDriver.ai','ElevateForward',
];

function normalize(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Strip generic suffixes like ".ai" / " ai" / " inc" so "Lindy" matches "lindy"
function strip(s) {
  return normalize(s).replace(/(ai|io|inc|communications|labs|global|app)$/g, '');
}

const results = candidates.map(name => {
  const target = normalize(name);
  const targetStripped = strip(name);
  const match = tools.find(t => {
    const slug = normalize(t.slug);
    const title = normalize(t.title);
    const company = normalize(t.company);
    const titleStripped = strip(t.title);
    return (
      slug === target ||
      title === target ||
      company === target ||
      slug === targetStripped ||
      titleStripped === target ||
      titleStripped === targetStripped
    );
  });
  return { name, match };
});

console.log('=== Already in registry ===');
for (const r of results.filter(r => r.match)) {
  const aff = r.match.affiliate || {};
  const status = aff.application_status || (aff.has_program ? 'no-status' : 'no-program');
  const link = aff.link ? ' [LIVE]' : '';
  console.log(`- ${r.name}  →  ${r.match.title} (${r.match.slug}) [aff: ${status}]${link}`);
}

console.log('\n=== Not in registry ===');
for (const r of results.filter(r => !r.match)) {
  console.log(`- ${r.name}`);
}
