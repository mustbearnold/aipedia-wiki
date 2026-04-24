#!/usr/bin/env node
/**
 * build-bloom-sheet.mjs
 *
 * Builds a composite sheet for the 6 Neural Bloom variants.
 * Shows each *transparent* PNG on a checkerboard tile so transparency
 * is instantly visible. 3 cols x 2 rows, 3200x2600 on dark neutral bg.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const HERE = dirname(fileURLToPath(import.meta.url));
const VARIANTS = join(HERE, "neural-bloom-v2");

const labels = {
  "01-radial-constellation": "01 · Radial Constellation",
  "02-clean-neuron": "02 · Clean Neuron",
  "03-hub-network": "03 · Hub Network",
  "04-dandelion-mandala": "04 · Dandelion Mandala",
  "05-triangle-synapse": "05 · Triangle Synapse",
  "06-curved-bloom": "06 · Curved Bloom",
};

const order = Object.keys(labels);
const COLS = 3;
const ROWS = 2;
const CELL = 900;
const GAP = 50;
const LABEL_H = 90;
const PAD = 80;
const HEADER = 230;
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
  const imgPath = join(VARIANTS, `${name}.png`);
  try {
    const png = readFileSync(imgPath);
    const dataUri = `data:image/png;base64,${png.toString("base64")}`;
    tiles.push(`<g>
      <!-- checkerboard pattern fill to visualize transparency -->
      <rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="24" fill="url(#checker)" stroke="#333" stroke-width="2"/>
      <image href="${dataUri}" x="${x}" y="${y}" width="${CELL}" height="${CELL}" preserveAspectRatio="xMidYMid slice"/>
      <text x="${x + CELL / 2}" y="${y + CELL + 58}" text-anchor="middle"
            font-family="Arial, sans-serif" font-size="38" font-weight="600"
            fill="#e5e7eb">${labels[name]}</text>
    </g>`);
  } catch {
    missing++;
    tiles.push(`<g>
      <rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="24" fill="#171717" stroke="#444" stroke-width="2" stroke-dasharray="8 8"/>
      <text x="${x + CELL / 2}" y="${y + CELL / 2}" text-anchor="middle"
            font-family="Arial, sans-serif" font-size="48" font-weight="600"
            fill="#666" dominant-baseline="middle">rendering...</text>
      <text x="${x + CELL / 2}" y="${y + CELL + 58}" text-anchor="middle"
            font-family="Arial, sans-serif" font-size="38" font-weight="600"
            fill="#666">${labels[name]}</text>
    </g>`);
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <pattern id="checker" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="#1a1a1a"/>
      <rect width="20" height="20" fill="#2a2a2a"/>
      <rect x="20" y="20" width="20" height="20" fill="#2a2a2a"/>
    </pattern>
    <linearGradient id="ttl" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#60a5fa"/>
    </linearGradient>
  </defs>
  <!-- dark neutral bg -->
  <rect width="${W}" height="${H}" fill="#0a0a0a"/>
  <!-- header -->
  <text x="${PAD}" y="120" font-family="Arial Black, Arial, sans-serif"
        font-size="92" font-weight="900" fill="url(#ttl)">Neural Bloom Variants</text>
  <text x="${PAD}" y="180" font-family="Arial, sans-serif"
        font-size="32" font-weight="500" fill="#9ca3af" letter-spacing="3">6 DIRECTIONS · TRANSPARENT PNG · CHECKERBOARD PREVIEW</text>
  ${tiles.join("\n")}
</svg>`;

writeFileSync(join(HERE, "neural-bloom-sheet.svg"), svg);

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: { loadSystemFonts: true, defaultFontFamily: "Arial" },
  shapeRendering: 2,
  textRendering: 2,
  imageRendering: 0,
});
const outPng = resvg.render().asPng();
writeFileSync(join(HERE, "neural-bloom-sheet.png"), outPng);

console.log(`Composite: ${join(HERE, "neural-bloom-sheet.png")}`);
console.log(`Dimensions: ${W} x ${H}`);
console.log(`Tiles present: ${order.length - missing} / ${order.length}`);
