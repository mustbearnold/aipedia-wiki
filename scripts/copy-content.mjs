#!/usr/bin/env node
// Pre-build asset generation for aipedia-wiki. Cross-platform Node port of
// the retired `copy-content.sh` (the old shell script invoked WSL bash on
// Windows, which is not configured on every dev machine).
//
// As of 2026-04-17 the site is a single-source-of-truth setup: content lives
// directly in `src/content/` (git-tracked on GitHub). The legacy dual-tree
// layer at `wikis/ai-tools/pages/` was retired.
//
// This script only:
//   1. Regenerates favicon assets
//   2. Regenerates per-tool OG share images
//   3. Regenerates the logo manifest (runtime-safe lookup table)
//   4. Syncs the public tools registry from `wikis/_meta/` if present
//
// It does NOT touch `src/content/`.

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const args = process.argv.slice(2);
const JSON_MODE = args.includes("--json");
const DRY_RUN = args.includes("--dry-run");
const HELP_MODE = args.includes("--help") || args.includes("-h");
const KNOWN_FLAGS = new Set(["--dry-run", "--json", "--project-dir", "--root", "--help", "-h"]);
const VALUE_FLAGS = new Set(["--project-dir", "--root"]);
const argumentIssues = collectArgumentIssues();
const DEFAULT_SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT_DIR = process.env.AIPEDIA_COPY_CONTENT_SCRIPT_DIR
  ? path.resolve(process.env.AIPEDIA_COPY_CONTENT_SCRIPT_DIR)
  : DEFAULT_SCRIPT_DIR;
const projectDirArg = valueFor("--project-dir") || valueFor("--root");
const PROJECT_DIR = projectDirArg ? path.resolve(projectDirArg) : path.dirname(DEFAULT_SCRIPT_DIR);
const CONTENT_DIR = path.join(PROJECT_DIR, "src", "content");
const META_SRC = path.join(path.dirname(PROJECT_DIR), "wikis", "_meta");
const META_DEST = path.join(PROJECT_DIR, "src", "data", "_meta");
const generatorTasks = [
  { script: "prep-favicons.mjs", label: "Favicon generation" },
  { script: "generate-og-svgs.mjs", label: "OG SVG generation" },
  { script: "optimize-og-images.mjs", label: "OG PNG optimization" },
  { script: "generate-logo-manifest.mjs", label: "Logo manifest generation" },
];

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index >= 0) {
    const next = args[index + 1] ?? "";
    return next && !next.startsWith("-") ? next : "";
  }
  const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : "";
}

function collectArgumentIssues() {
  const issues = [];
  const foundValueFlags = new Set();

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const equalsIndex = arg.startsWith("--") ? arg.indexOf("=") : -1;
    const flag = equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;

    if (!arg.startsWith("-")) {
      issues.push({ code: "argument-invalid", detail: `unexpected argument ${arg}` });
      continue;
    }

    if (!KNOWN_FLAGS.has(flag)) {
      issues.push({ code: "argument-invalid", detail: `unknown flag ${flag}` });
      continue;
    }

    if (VALUE_FLAGS.has(flag)) {
      foundValueFlags.add(flag);

      if (equalsIndex >= 0) {
        if (!arg.slice(equalsIndex + 1)) issues.push({ code: "argument-invalid", detail: `${flag} requires a value` });
        continue;
      }

      const next = args[index + 1];
      if (!next || next.startsWith("-")) {
        issues.push({ code: "argument-invalid", detail: `${flag} requires a value` });
      } else {
        index += 1;
      }
      continue;
    }

    if (equalsIndex >= 0) issues.push({ code: "argument-invalid", detail: `${flag} does not accept a value` });
  }

  if (foundValueFlags.has("--project-dir") && foundValueFlags.has("--root")) {
    issues.push({ code: "argument-invalid", detail: "choose only one of --project-dir or --root" });
  }
  if (args.includes("--json") && !args.includes("--dry-run")) {
    issues.push({ code: "argument-invalid", detail: "--json requires --dry-run because normal runs stream generator output" });
  }
  if ((foundValueFlags.has("--project-dir") || foundValueFlags.has("--root")) && !args.includes("--dry-run")) {
    issues.push({ code: "argument-invalid", detail: "--project-dir/--root require --dry-run for prebuild inspection" });
  }

  return issues;
}

function usage() {
  return [
    "Usage: node scripts/copy-content.mjs [options]",
    "",
    "Options:",
    "  --dry-run             Report planned prebuild tasks without running generators or copying files.",
    "  --json                Emit a structured prebuild report.",
    "  --project-dir <dir>   Inspect another project root in dry-run mode.",
    "  --root <dir>          Alias for --project-dir.",
    "  --help, -h            Print this help message.",
  ].join("\n");
}

function runNode(script, label) {
  if (DRY_RUN) return { script, label, skipped: true, status: 0 };

  const result = spawnSync(process.execPath, [path.join(SCRIPT_DIR, script)], {
    stdio: "inherit",
  });
  const status = result.status ?? 1;
  if (status !== 0) {
    const detail = result.error ? `: ${result.error.message}` : "";
    console.error(`[copy-content] ${label} failed with status ${status}${detail}`);
  }
  return { script, label, skipped: false, status };
}

function reportFor({ mode = DRY_RUN ? "dry-run" : "run", tasks = [], markdownFiles = 0, copiedMetaFiles = 0 }) {
  return {
    ok: mode !== "argument-error",
    mode,
    project_dir: PROJECT_DIR,
    content_dir: CONTENT_DIR,
    meta_src: META_SRC,
    meta_dest: META_DEST,
    markdown_files: markdownFiles,
    copied_meta_files: copiedMetaFiles,
    tasks,
    argument_issues: mode === "argument-error" ? argumentIssues : [],
  };
}

function emitReport(report) {
  if (JSON_MODE) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  if (report.mode === "argument-error") {
    console.error("[copy-content] Invalid command arguments:");
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
    return;
  }

  if (DRY_RUN) {
    console.log("[copy-content] Dry run. Planned generator tasks:");
    for (const task of report.tasks) console.log(`- ${task.script}: ${task.label}`);
  }
}

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  emitReport(reportFor({ mode: "argument-error" }));
  process.exit(1);
}

// 1. Regenerate favicon assets so browser icons stay aligned with the current
//    Signal Cyan brand mark.
const taskResults = [];
taskResults.push(runNode(generatorTasks[0].script, generatorTasks[0].label));

// 2. Regenerate per-tool OG share images so social previews stay in sync with
//    current titles, scores, and taglines. Then recompress all generated OG
//    PNGs, including news cards from prebuild.
taskResults.push(runNode(generatorTasks[1].script, generatorTasks[1].label));
taskResults.push(runNode(generatorTasks[2].script, generatorTasks[2].label));

// 3. Generate the logo manifest so components can resolve logo extensions at
//    build time without calling node:fs from Astro frontmatter.
taskResults.push(runNode(generatorTasks[3].script, generatorTasks[3].label));

const failedTasks = taskResults.filter((task) => !task.skipped && task.status !== 0);
if (failedTasks.length > 0) {
  console.error(
    `[copy-content] Required prebuild generator(s) failed: ${failedTasks.map((task) => `${task.script} (${task.status})`).join(", ")}`,
  );
  process.exit(1);
}

// Count markdown files under src/content for a quick sanity log.
function countMarkdown(dir) {
  let total = 0;
  if (!fs.existsSync(dir)) return 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += countMarkdown(full);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      total += 1;
    }
  }
  return total;
}

const total = countMarkdown(CONTENT_DIR);
if (!JSON_MODE) console.log(`Content: ${total} markdown files in src/content/ (source of truth).`);

// 4. Optionally sync the public tools registry from wikis/_meta/ if that
//    toolchain is still present. Other truth-maintenance/admin exports stay local-only.
let copiedMetaFiles = 0;
if (fs.existsSync(META_SRC) && fs.statSync(META_SRC).isDirectory()) {
  const metaFiles = ["tools-registry.json"];
  if (!DRY_RUN) fs.mkdirSync(META_DEST, { recursive: true });
  for (const name of metaFiles) {
    const src = path.join(META_SRC, name);
    if (fs.existsSync(src)) {
      if (!DRY_RUN) fs.copyFileSync(src, path.join(META_DEST, name));
      copiedMetaFiles += 1;
    }
  }
  if (copiedMetaFiles > 0 && !DRY_RUN) {
    console.log(`Synced public tools registry from ${META_SRC} -> src/data/_meta/.`);
  }
}

emitReport(reportFor({ tasks: taskResults, markdownFiles: total, copiedMetaFiles }));
