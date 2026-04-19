#!/usr/bin/env node
/**
 * One-off LinkedIn asset kit generator.
 *
 * Produces every image an aipedia.wiki LinkedIn presence needs:
 *   - profile-photo.png       400x400  personal profile picture
 *   - personal-banner.png    1584x396  personal cover (content-safe for
 *                                      profile-photo overlay in bottom-left)
 *   - company-logo.png        300x300  company page logo
 *   - company-banner.png     1128x191  company page cover
 *   - post-template.png      1200x627  reusable post share image template
 *
 * Uses sharp to trim + recolor the master brand PNG, resvg to rasterize
 * SVG-composited banners.
 */
import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const OUT = join(ROOT, 'linkedin-kit/images');
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const logoPath = join(ROOT, 'public/brand/aipedia-logo.png');

// ---------- Prep trimmed logo ----------
// The master PNG has transparent padding around the gem. Trim it so downstream
// resizes give the gem maximum pixels.
const trimmed = await sharp(logoPath).trim().toBuffer();
const logoB64 = `data:image/png;base64,${trimmed.toString('base64')}`;

// ---------- 1. Profile photo (400x400) ----------
// Just the hex gem centered on a dark gradient disc. LinkedIn crops to a
// circle, so the design needs to work circle-masked.
{
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#1a1830"/>
      <stop offset="70%" stop-color="#0d0d1a"/>
      <stop offset="100%" stop-color="#0b0a14"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="45%">
      <stop offset="0%" stop-color="rgba(167,139,250,0.35)"/>
      <stop offset="60%" stop-color="rgba(96,165,250,0.10)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <circle cx="200" cy="200" r="180" fill="url(#halo)"/>
  <image href="${logoB64}" x="80" y="80" width="240" height="240" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 400 } }).render().asPng();
  writeFileSync(join(OUT, 'profile-photo.png'), png);
  console.log('wrote profile-photo.png (400x400)');
}

// ---------- 2. Personal banner (1584x396) ----------
// LinkedIn overlays the profile photo in the bottom-left ~180px of the
// banner. Right-weight all content to keep the photo-overlap area clean.
{
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1584" height="396" viewBox="0 0 1584 396">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0a14"/>
      <stop offset="50%" stop-color="#0d0d1a"/>
      <stop offset="100%" stop-color="#1a1830"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#60a5fa"/>
    </linearGradient>
    <radialGradient id="glow" cx="82%" cy="52%" r="35%">
      <stop offset="0%" stop-color="rgba(167,139,250,0.25)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="1584" height="396" fill="url(#bg)"/>
  <rect x="0" y="0" width="1584" height="4" fill="url(#accent)"/>
  <rect width="1584" height="396" fill="url(#glow)"/>
  <!-- Safe-zone reminder: avoid content in bottom-left ~280x280 area (profile photo overlay) -->
  <g transform="translate(620, 120)">
    <image href="${logoB64}" x="0" y="0" width="150" height="150" preserveAspectRatio="xMidYMid meet"/>
  </g>
  <g font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
    <text x="800" y="175" font-size="76" font-weight="800" fill="#ffffff" letter-spacing="-1.5">aipedia.wiki</text>
    <text x="800" y="225" font-size="26" font-weight="500" fill="#d1d5db">Independent AI tools encyclopedia. Agentically operated.</text>
    <text x="800" y="265" font-size="20" font-weight="500" fill="#a78bfa" letter-spacing="0.5">205 reviews . Daily news . No paid placements</text>
  </g>
</svg>`;
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1584 } }).render().asPng();
  writeFileSync(join(OUT, 'personal-banner.png'), png);
  console.log('wrote personal-banner.png (1584x396)');
}

// ---------- 3. Company logo (300x300) ----------
// Rounded-square with the gem + small "aipedia.wiki" wordmark so the logo
// reads at tiny sizes (feed, comments).
{
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0d1a"/>
      <stop offset="100%" stop-color="#1a1830"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#60a5fa"/>
    </linearGradient>
  </defs>
  <rect width="300" height="300" rx="44" fill="url(#bg)" stroke="rgba(167,139,250,0.3)" stroke-width="1"/>
  <image href="${logoB64}" x="60" y="40" width="180" height="180" preserveAspectRatio="xMidYMid meet"/>
  <text x="150" y="255" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="800" fill="url(#accent)" text-anchor="middle" letter-spacing="-0.5">aipedia.wiki</text>
</svg>`;
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 300 } }).render().asPng();
  writeFileSync(join(OUT, 'company-logo.png'), png);
  console.log('wrote company-logo.png (300x300)');
}

// ---------- 4. Company banner (1128x191) ----------
// Full-width layout, no profile overlay to worry about. Horizontal row:
// logo on left, wordmark + tagline on the right.
{
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0a14"/>
      <stop offset="50%" stop-color="#0d0d1a"/>
      <stop offset="100%" stop-color="#1a1830"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#60a5fa"/>
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="50%" r="25%">
      <stop offset="0%" stop-color="rgba(167,139,250,0.22)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="1128" height="191" fill="url(#bg)"/>
  <rect x="0" y="0" width="1128" height="3" fill="url(#accent)"/>
  <rect width="1128" height="191" fill="url(#glow)"/>
  <image href="${logoB64}" x="60" y="40" width="110" height="110" preserveAspectRatio="xMidYMid meet"/>
  <g font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
    <text x="200" y="90" font-size="42" font-weight="800" fill="#ffffff" letter-spacing="-0.8">aipedia.wiki</text>
    <text x="200" y="120" font-size="17" font-weight="500" fill="#d1d5db">Independent AI tools encyclopedia. Agentically operated.</text>
    <text x="200" y="145" font-size="14" font-weight="500" fill="#a78bfa" letter-spacing="0.3">205 reviews . Daily news . April 2026</text>
  </g>
</svg>`;
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1128 } }).render().asPng();
  writeFileSync(join(OUT, 'company-banner.png'), png);
  console.log('wrote company-banner.png (1128x191)');
}

// ---------- 5. Post template (1200x627) ----------
// Share-ready template with placeholder text zones. Blank center so the
// user can drop in a headline + takeaway in Canva / Figma / whatever,
// while the aipedia.wiki branding stays consistent at the top and
// bottom.
{
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="627" viewBox="0 0 1200 627">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0a14"/>
      <stop offset="100%" stop-color="#1a1830"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#60a5fa"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="627" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="6" fill="url(#accent)"/>

  <!-- Header -->
  <g transform="translate(80, 72)">
    <image href="${logoB64}" x="0" y="0" width="60" height="60" preserveAspectRatio="xMidYMid meet"/>
    <text x="80" y="30" font-family="Inter, system-ui, sans-serif" font-size="28" font-weight="700" fill="#a78bfa" letter-spacing="0.5">aipedia.wiki</text>
    <text x="80" y="55" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="500" fill="#9ca3af">Independent AI tools encyclopedia</text>
  </g>

  <!-- Safe zone for headline (replace in Canva/Figma) -->
  <g font-family="Inter, system-ui, sans-serif">
    <text x="80" y="300" font-size="56" font-weight="800" fill="#fafafa">[Replace with headline]</text>
    <text x="80" y="360" font-size="24" font-weight="500" fill="#d1d5db">[Replace with a tight 1-2 line takeaway]</text>
  </g>

  <!-- Footer badge -->
  <g transform="translate(80, 540)">
    <rect x="0" y="0" width="280" height="44" rx="22" fill="rgba(167,139,250,0.15)" stroke="rgba(167,139,250,0.35)" stroke-width="1.5"/>
    <text x="140" y="28" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="600" fill="#a78bfa" text-anchor="middle" letter-spacing="0.5">Read the full review at aipedia.wiki</text>
  </g>

  <!-- Score-chip sample (right side, visual anchor) -->
  <g transform="translate(960, 80)">
    <rect x="0" y="0" width="160" height="160" rx="20" fill="rgba(167,139,250,0.10)" stroke="rgba(167,139,250,0.35)" stroke-width="2"/>
    <text x="80" y="100" font-family="Inter, system-ui, sans-serif" font-size="64" font-weight="800" text-anchor="middle" fill="#a78bfa">9.1</text>
    <text x="80" y="130" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="500" text-anchor="middle" fill="#9ca3af">/10 EXAMPLE</text>
  </g>
</svg>`;
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  writeFileSync(join(OUT, 'post-template.png'), png);
  console.log('wrote post-template.png (1200x627)');
}

console.log('\nLinkedIn kit generated in linkedin-kit/images/');
