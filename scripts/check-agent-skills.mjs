#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const root = resolve(valueFor('--root') || dirname(dirname(fileURLToPath(import.meta.url))));
const skillsDir = join(root, 'skills');
const json = args.includes('--json');
const requiredSections = [
  'Purpose',
  'When to use',
  'Required inputs',
  'Output format',
  'Workflow steps',
  'Safety rules',
  'Validation steps',
  'Related scripts',
  'Final report requirements',
];

const issues = [];
const skills = existsSync(skillsDir)
  ? readdirSync(skillsDir).filter((name) => statSync(join(skillsDir, name)).isDirectory()).sort()
  : [];

if (!skills.length) {
  issues.push({ path: 'skills/', code: 'skills-missing', detail: 'no skill directories found' });
}

for (const skill of skills) {
  const dir = join(skillsDir, skill);
  const skillPath = join(dir, 'SKILL.md');
  const schemaPath = join(dir, 'schema.json');
  const inputPath = join(dir, 'examples/example-input.json');

  if (!existsSync(skillPath)) {
    issues.push({ path: relativeSkill(skill, 'SKILL.md'), code: 'skill-md-missing', detail: 'missing SKILL.md' });
  } else {
    const text = readFileSync(skillPath, 'utf8');
    for (const section of requiredSections) {
      if (!text.includes(`## ${section}`)) {
        issues.push({
          path: relativeSkill(skill, 'SKILL.md'),
          code: 'section-missing',
          detail: `missing section ${section}`,
        });
      }
    }
  }

  if (!parseJsonFile(schemaPath)) {
    issues.push({ path: relativeSkill(skill, 'schema.json'), code: 'schema-invalid', detail: 'missing or invalid JSON schema' });
  }

  if (!parseJsonFile(inputPath)) {
    issues.push({ path: relativeSkill(skill, 'examples/example-input.json'), code: 'example-input-invalid', detail: 'missing or invalid example input JSON' });
  }
}

const report = {
  ok: issues.length === 0,
  skill_count: skills.length,
  skills,
  issues,
};

if (json) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else if (report.ok) {
  console.log(`[check-agent-skills] OK: ${skills.length} skills validated.`);
} else {
  console.error(`[check-agent-skills] ${issues.length} issue(s) found.`);
  for (const issue of issues) {
    console.error(`- ${issue.path}: ${issue.code} ${issue.detail}`);
  }
  process.exitCode = 1;
}

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index >= 0) return args[index + 1] ?? '';
  const inline = args.find((arg) => arg.startsWith(`${flag}=`));
  return inline ? inline.slice(flag.length + 1) : '';
}

function parseJsonFile(path) {
  try {
    JSON.parse(readFileSync(path, 'utf8'));
    return true;
  } catch {
    return false;
  }
}

function relativeSkill(skill, file) {
  return `skills/${skill}/${file}`;
}
