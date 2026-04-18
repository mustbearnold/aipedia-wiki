#!/usr/bin/env node
/**
 * fetch-real-logos.mjs
 *
 * For every tool in tools-registry.json whose logo is a generated
 * letter-on-gradient SVG placeholder, try to download a real brand
 * logo from Clearbit's Logo API and save it as a PNG.
 *
 * Detection: a placeholder is any file in public/logos/tools/ that
 * begins with `<?xml version="1.0" encoding="UTF-8"?>\n<svg` and
 * contains `linearGradient`. The real SVGs committed earlier (e.g.
 * aider.svg, activepieces.svg) came from vendor brand kits and do
 * not match that template.
 *
 * Flow:
 *   1. Parse domain from each tool's `url` field
 *   2. GET https://logo.clearbit.com/<domain>?size=256
 *   3. If response is 200 and body is a real image, write
 *      public/logos/tools/<slug>.png and delete the SVG placeholder
 *   4. On any other response, leave the placeholder in place
 *
 * Safe to re-run. Existing real logos (PNGs + brand-kit SVGs) are
 * never overwritten.
 */

import { readFileSync, writeFileSync, existsSync, unlinkSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const REGISTRY = join(ROOT, "src/data/_meta/tools-registry.json");
const LOGOS_DIR = join(ROOT, "public/logos/tools");

// --- Helpers ---

function parseDomain(url) {
  if (!url) return null;
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function isPlaceholderSvg(svgPath) {
  if (!existsSync(svgPath)) return false;
  try {
    const head = readFileSync(svgPath, "utf8").slice(0, 400);
    return head.includes("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
        && head.includes("<svg")
        && head.includes("linearGradient");
  } catch {
    return false;
  }
}

function existingLogoFile(slug) {
  for (const ext of ["png", "svg", "jpg", "jpeg", "webp", "gif", "ico"]) {
    const p = join(LOGOS_DIR, `${slug}.${ext}`);
    if (existsSync(p)) return p;
  }
  return null;
}

async function fetchClearbitLogo(domain) {
  const url = `https://logo.clearbit.com/${domain}?size=256`;
  try {
    const resp = await fetch(url, { redirect: "follow" });
    if (!resp.ok) return { ok: false, reason: `http ${resp.status}` };
    const buf = new Uint8Array(await resp.arrayBuffer());
    if (buf.length < 400) return { ok: false, reason: `body too small (${buf.length}b)` };
    // PNG magic: 89 50 4e 47
    const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
    if (!isPng) return { ok: false, reason: "not a PNG" };
    return { ok: true, buf };
  } catch (e) {
    return { ok: false, reason: e.message };
  }
}

// --- Main ---

async function main() {
  if (!existsSync(REGISTRY)) {
    console.error(`Registry missing at ${REGISTRY}. Run npm run wiki:sync first.`);
    process.exit(1);
  }
  const reg = JSON.parse(readFileSync(REGISTRY, "utf8"));
  const tools = reg.tools || {};

  const candidates = [];
  for (const [slug, entry] of Object.entries(tools)) {
    if (entry.status === "dead") continue;
    const existing = existingLogoFile(slug);
    if (!existing) continue;
    if (!existing.endsWith(".svg")) continue; // only consider SVG candidates
    if (!isPlaceholderSvg(existing)) continue; // skip real brand-kit SVGs
    const domain = parseDomain(entry.url);
    if (!domain) continue;
    candidates.push({ slug, domain, placeholderPath: existing });
  }

  console.log(`Found ${candidates.length} placeholder logos to attempt real-logo fetch.`);

  let ok = 0;
  let fail = 0;
  const failed = [];
  const succeeded = [];

  // Throttle to avoid hammering Clearbit. ~4 req/s.
  for (const { slug, domain, placeholderPath } of candidates) {
    const res = await fetchClearbitLogo(domain);
    if (res.ok) {
      const pngPath = join(LOGOS_DIR, `${slug}.png`);
      writeFileSync(pngPath, res.buf);
      unlinkSync(placeholderPath);
      ok++;
      succeeded.push({ slug, domain, size: res.buf.length });
      console.log(`  ✓ ${slug.padEnd(18)} ${domain.padEnd(32)} ${res.buf.length}b`);
    } else {
      fail++;
      failed.push({ slug, domain, reason: res.reason });
      console.log(`  · ${slug.padEnd(18)} ${domain.padEnd(32)} ${res.reason}`);
    }
    await new Promise((r) => setTimeout(r, 250));
  }

  console.log("");
  console.log(`Replaced ${ok} placeholders with real brand logos.`);
  console.log(`Kept ${fail} placeholders (Clearbit had no logo for the domain).`);
  if (failed.length) {
    console.log("Placeholders remaining:");
    failed.forEach((f) => console.log(`  ${f.slug}  (${f.domain})  ${f.reason}`));
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
