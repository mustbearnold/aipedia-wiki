#!/usr/bin/env node
/**
 * generate-missing-logos.mjs
 *
 * For any tool in tools-registry.json that does not have a logo file in
 * public/logos/tools/ (png, svg, jpg, webp, jpeg), write a clean SVG
 * fallback logo with the tool's first letter on its category gradient.
 *
 * Existing logos are never overwritten. Safe to re-run.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const REGISTRY = join(ROOT, "src/data/_meta/tools-registry.json");
const LOGOS_DIR = join(ROOT, "public/logos/tools");

// Category gradient palette — mirrors src/pages/index.astro's categoryGradients map.
const CATEGORY_GRADIENTS = {
  "ai-chatbots":     ["#8b5cf6", "#6366f1"],
  "ai-coding":       ["#22c55e", "#059669"],
  "ai-writing":      ["#60a5fa", "#3b82f6"],
  "ai-image":        ["#f59e0b", "#d97706"],
  "ai-video":        ["#f97316", "#ef4444"],
  "ai-voice":        ["#6366f1", "#818cf8"],
  "ai-music":        ["#ec4899", "#be185d"],
  "ai-design":       ["#ec4899", "#f472b6"],
  "ai-search":       ["#14b8a6", "#0d9488"],
  "ai-seo":          ["#a78bfa", "#7c3aed"],
  "ai-automation":   ["#fbbf24", "#f59e0b"],
  "ai-notes":        ["#64748b", "#475569"],
  "ai-presentation": ["#06b6d4", "#0891b2"],
  "ai-research":     ["#a855f7", "#7e22ce"],
};
const DEFAULT_GRADIENT = ["#a78bfa", "#60a5fa"];

function hasLogo(slug) {
  const exts = ["png", "svg", "jpg", "jpeg", "webp", "gif", "ico"];
  return exts.some((ext) => existsSync(join(LOGOS_DIR, `${slug}.${ext}`)));
}

function pickInitial(title, slug) {
  const src = (title || slug || "?").trim();
  if (!src) return "?";
  // Strip common vendor suffixes so "Harvey AI" becomes "H" not surfacing "A"
  const clean = src.replace(/\b(AI|\.AI|io|\.io|labs|Labs)\b/gi, "").trim();
  const ch = clean[0] || src[0];
  return ch.toUpperCase();
}

function makeSvg({ initial, gradient, slug }) {
  const [c1, c2] = gradient;
  const gradId = `g-${slug.replace(/[^a-z0-9]/gi, "")}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" aria-label="${initial}">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="28" fill="url(#${gradId})"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        font-size="64" font-weight="700" fill="#0b0a14" letter-spacing="-1">${initial}</text>
</svg>
`;
}

function main() {
  if (!existsSync(REGISTRY)) {
    console.error(`Registry not found at ${REGISTRY}. Run npm run wiki:sync first.`);
    process.exit(1);
  }
  const reg = JSON.parse(readFileSync(REGISTRY, "utf8"));
  const tools = reg.tools || {};
  let written = 0;
  let skipped = 0;
  const writtenSlugs = [];

  for (const [slug, entry] of Object.entries(tools)) {
    if (entry.status === "dead") continue;
    if (hasLogo(slug)) { skipped++; continue; }
    const title = entry.title || slug;
    const category = entry.category || "";
    const gradient = CATEGORY_GRADIENTS[category] || DEFAULT_GRADIENT;
    const initial = pickInitial(title, slug);
    writeFileSync(join(LOGOS_DIR, `${slug}.svg`), makeSvg({ initial, gradient, slug }), "utf8");
    written++;
    writtenSlugs.push(slug);
  }

  console.log(`Generated ${written} fallback logos; skipped ${skipped} tools with existing logos.`);
  if (writtenSlugs.length && writtenSlugs.length <= 120) {
    writtenSlugs.forEach((s) => console.log(`  + ${s}.svg`));
  }
}

main();
