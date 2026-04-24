#!/usr/bin/env node
/**
 * build-mockup-sheet.mjs
 *
 * Builds a single large PNG that shows all 12 AI-generated logos in a
 * 4-column x 3-row grid, with labels. Uses SVG + resvg to assemble the
 * composite, embedding each JPG as a data URI.
 *
 * Output: brand-mockups/mockup-sheet.png (4000x3400 on pure black)
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const HERE = dirname(fileURLToPath(import.meta.url));
const GEN = join(HERE, "ai-generated");

const labels = {
  "01-orbital-orb": "01 · Orbital Orb",
  "02-node-constellation": "02 · Node Constellation",
  "03-hexagonal-core": "03 · Hexagonal Core",
  "04-abstract-a-mark": "04 · Abstract A",
  "05-diamond-facet": "05 · Diamond Facet",
  "06-spiral-vortex": "06 · Spiral Vortex",
  "07-infinity-loop": "07 · Infinity Loop",
  "08-wireframe-globe": "08 · Wireframe Globe",
  "09-layered-pages": "09 · Layered Pages",
  "10-compass-needle": "10 · Compass Needle",
  "11-neural-bloom": "11 · Neural Bloom",
  "12-score-ring": "12 · Score Ring",
};

const order = Object.keys(labels);
const COLS = 4;
const ROWS = 3;
const CELL = 900;          // each tile image size
const GAP = 40;
const LABEL_H = 80;
const PAD = 80;
const HEADER = 220;
const W = PAD * 2 + COLS * CELL + (COLS - 1) * GAP;
const H = HEADER + PAD + ROWS * (CELL + LABEL_H) + (ROWS - 1) * GAP + PAD;

const tiles = [];
let missing = 0;
for (let i = 0; i < order.length; i++) {
  const name = order[i];
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = PAD + col * (CELL + GAP);
  const y = HEADER + PAD + row * (CELL + LABEL_H + GAP);
  const imgPath = join(GEN, `${name}.jpg`);
  try {
    const jpg = readFileSync(imgPath);
    const dataUri = `data:image/jpeg;base64,${jpg.toString("base64")}`;
    tiles.push(`<g>
      <rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="24" fill="#0a0a0a" stroke="#1f1f1f" stroke-width="2"/>
      <image href="${dataUri}" x="${x}" y="${y}" width="${CELL}" height="${CELL}" preserveAspectRatio="xMidYMid slice" clip-path="inset(0 round 24)"/>
      <text x="${x + CELL / 2}" y="${y + CELL + 52}" text-anchor="middle"
            font-family="Arial, sans-serif" font-size="34" font-weight="600"
            fill="#e5e7eb">${labels[name]}</text>
    </g>`);
  } catch {
    missing++;
    tiles.push(`<g>
      <rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="24" fill="#171717" stroke="#333" stroke-width="2" stroke-dasharray="8 8"/>
      <text x="${x + CELL / 2}" y="${y + CELL / 2}" text-anchor="middle"
            font-family="Arial, sans-serif" font-size="42" font-weight="600"
            fill="#666" dominant-baseline="middle">missing</text>
      <text x="${x + CELL / 2}" y="${y + CELL + 52}" text-anchor="middle"
            font-family="Arial, sans-serif" font-size="34" font-weight="600"
            fill="#666">${labels[name]}</text>
    </g>`);
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="ttl" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#60a5fa"/>
    </linearGradient>
  </defs>
  <!-- pure black canvas -->
  <rect width="${W}" height="${H}" fill="#000000"/>
  <!-- header -->
  <text x="${PAD}" y="120" font-family="Arial Black, Arial, sans-serif"
        font-size="92" font-weight="900" fill="url(#ttl)">aipedia.wiki</text>
  <text x="${PAD}" y="175" font-family="Arial, sans-serif"
        font-size="36" font-weight="500" fill="#9ca3af" letter-spacing="3">LOGO CONCEPT MOCKUP SHEET / 12 DIRECTIONS / GENERATED 2026-04-18</text>
  ${tiles.join("\n")}
</svg>`;

const outSvg = join(HERE, "mockup-sheet.svg");
const outPng = join(HERE, "mockup-sheet.png");
writeFileSync(outSvg, svg);

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: { loadSystemFonts: true, defaultFontFamily: "Arial" },
  shapeRendering: 2,
  textRendering: 2,
  imageRendering: 0,
});
const png = resvg.render().asPng();
writeFileSync(outPng, png);

console.log(`Composite: ${outPng}`);
console.log(`Dimensions: ${W} x ${H}`);
console.log(`Tiles present: ${order.length - missing} / ${order.length}`);
if (missing > 0) console.log(`WARNING: ${missing} tiles missing (will show 'missing' placeholder)`);
