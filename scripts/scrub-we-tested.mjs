#!/usr/bin/env node
/**
 * scrub-we-tested.mjs
 *
 * Rewrites "We tested/evaluated/prioritized" fabricated-testing phrasing
 * in use-case methodology sections to agent-voice. Bible rule: no first-
 * person testing claims unless the testing actually happened.
 *
 * Only touches src/content/use-cases/*.md. Idempotent: rerunning against
 * already-scrubbed content is a no-op.
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DIR = join(ROOT, "src/content/use-cases");

// Ordered list of replacements. Earlier rules match first.
const REPLACEMENTS = [
  // "We tested X on..." -> "Tools were evaluated on..."
  [/\bWe tested (\w+)/g, "Tools were evaluated based on"],
  [/\bwe tested (\w+)/g, "tools were evaluated based on"],
  // "We evaluated X on / based on / against..." -> "Tools were evaluated based on..."
  [/\bWe evaluated (each tool|tools|all tools|tools on)\b/g, "Tools were evaluated"],
  [/\bwe evaluated (each tool|tools|all tools|tools on)\b/g, "tools were evaluated"],
  [/\bWe evaluated\b/g, "Tools were evaluated"],
  [/\bwe evaluated\b/g, "tools were evaluated"],
  // "We ranked X by..."
  [/\bWe ranked (tools|them|each tool) by\b/g, "Tools were ranked by"],
  [/\bwe ranked (tools|them|each tool) by\b/g, "tools were ranked by"],
  [/\bWe ranked (tools|them|each tool)\b/g, "Tools were ranked"],
  [/\bwe ranked (tools|them|each tool)\b/g, "tools were ranked"],
  // Fix the previously-introduced "by by" double-word bug
  [/\b(ranked) by by\b/gi, "$1 by"],
  [/\b(evaluated) based on based on\b/gi, "$1 based on"],
  // "We scored X on..."
  [/\bWe scored\b/g, "Tools were scored"],
  [/\bwe scored\b/g, "tools were scored"],
  // "We prioritized X" / "We prioritised X"
  [/\bWe prioriti[sz]ed\b/g, "Prioritised"],
  [/\bwe prioriti[sz]ed\b/g, "prioritised"],
  // "Our methodology" -> "The methodology"
  [/\bOur methodology\b/g, "The methodology"],
  [/\bour methodology\b/g, "the methodology"],
  // "See our methodology" -> "See methodology"
  [/\bsee our methodology\b/gi, "See methodology"],
];

function scrubFile(path) {
  const raw = readFileSync(path, "utf8");
  let out = raw;
  for (const [re, repl] of REPLACEMENTS) {
    out = out.replace(re, repl);
  }
  if (out !== raw) {
    writeFileSync(path, out, "utf8");
    return true;
  }
  return false;
}

function main() {
  const files = readdirSync(DIR).filter((f) => f.endsWith(".md"));
  let touched = 0;
  for (const f of files) {
    if (scrubFile(join(DIR, f))) {
      touched++;
      console.log(`  scrubbed: ${f}`);
    }
  }
  console.log(`\nScrubbed ${touched} of ${files.length} use-case files.`);
}

main();
