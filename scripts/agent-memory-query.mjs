#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildSparseVector, cosineSparse } from './lib/agent-cpu-vector.mjs';
import {
  DEFAULT_PROJECT_DIR,
  hasFlag,
  projectPath,
  valueFor,
} from './lib/agent-workflow-utils.mjs';

const args = process.argv.slice(2);
const projectDir = resolve(valueFor(args, '--project-dir') || valueFor(args, '--root') || DEFAULT_PROJECT_DIR);
const memoryPath = valueFor(args, '--memory') || valueFor(args, '--file') || 'local/tmp/agent-memory.jsonl';
const query = valueFor(args, '--query') || '';
const limit = Number(valueFor(args, '--limit') || 10);
const currentDate = valueFor(args, '--current-date') || process.env.AIPEDIA_CURRENT_DATE || new Date().toISOString().slice(0, 10);
const includeExpired = hasFlag(args, '--include-expired');
const route = valueFor(args, '--route') || '';
const jsonMode = hasFlag(args, '--json');
const helpMode = hasFlag(args, '--help') || hasFlag(args, '-h');
const isCli = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isCli && helpMode) {
  console.log(usage());
  process.exit(0);
}

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-memory-query.mjs --memory local/tmp/agent-memory.jsonl --query "pricing source gaps" --json',
    '  node scripts/agent-memory-query.mjs --memory local/tmp/agent-memory.jsonl --query "pricing source gaps" --current-date 2026-06-30 --route /tools/cursor/ --json',
    '',
    'Ranks JSONL memory records with the CPU lexical vector scorer, expiration policy, and promotion weights.',
  ].join('\n');
}

export function queryMemory(projectDir, options = {}) {
  const memoryPath = resolve(projectDir, options.memoryPath || 'local/tmp/agent-memory.jsonl');
  const query = options.query || '';
  const limit = Number(options.limit ?? 10);
  const currentDate = options.currentDate || new Date().toISOString().slice(0, 10);
  const includeExpired = options.includeExpired === true;
  const route = options.route || '';
  if (!query.trim()) return { ok: false, error: 'query is required', matches: [] };
  if (!existsSync(memoryPath)) return { ok: false, error: `memory file not found: ${projectPath(projectDir, memoryPath)}`, matches: [] };

  const queryVector = buildSparseVector(query);
  const records = readJsonl(memoryPath);
  const matches = records
    .map((record) => memoryMatch(queryVector, record, { currentDate, includeExpired, route }))
    .filter((match) => match.rank_score > 0 && (includeExpired || !match.retrieval.expired))
    .sort((a, b) => b.rank_score - a.rank_score || b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, limit);

  return {
    ok: true,
    memory: projectPath(projectDir, memoryPath),
    query,
    current_date: currentDate,
    include_expired: includeExpired,
    route,
    model: queryVector.model,
    matches,
  };
}

function memoryMatch(queryVector, record, options) {
  const lexicalScore = cosineSparse(
    queryVector,
    record.cpu_vector ?? buildSparseVector(record.embedding_text ?? JSON.stringify(record)),
  );
  const retrieval = retrievalPolicy(record, options);
  const score = roundScore(lexicalScore);
  const rankScore = roundScore(lexicalScore * retrieval.promotion_weight * retrieval.freshness_weight);
  return {
    score,
    lexical_score: score,
    rank_score: rankScore,
    id: record.id,
    type: record.type,
    route: record.route ?? '',
    title: record.title ?? '',
    recommended_action: record.recommended_action ?? '',
    observed_at: record.observed_at ?? '',
    retrieval,
    record,
  };
}

function retrievalPolicy(record, options) {
  const currentDate = options.currentDate;
  const ageDays = ageInDays(record.observed_at, currentDate);
  const expiresAfterDays = expiresAfterDaysFor(record);
  const expired = expiresAfterDays != null && ageDays != null && ageDays > expiresAfterDays;
  const promotion = promotionFor(record, options.route);
  return {
    priority: promotion.priority,
    promotion_weight: promotion.weight,
    freshness_weight: expired ? 0.2 : freshnessWeight(ageDays, expiresAfterDays),
    age_days: ageDays,
    expires_after_days: expiresAfterDays,
    expires_at: expiresAt(record.observed_at, expiresAfterDays),
    expired,
    include_expired: options.includeExpired,
  };
}

function expiresAfterDaysFor(record) {
  const explicit = Number(record.expires_after_days);
  if (Number.isFinite(explicit) && explicit >= 0) return explicit;
  if (record.type === 'pricing_fact') return 30;
  if (record.type === 'model_fact') return 30;
  if (record.type === 'affiliate_fact') return 30;
  if (record.type === 'conversion_note') return 90;
  if (record.type === 'page_snapshot') return 90;
  if (record.type === 'quality_note') return 180;
  if (record.type === 'impact_summary') return 180;
  if (record.type === 'source_record') {
    const volatility = String(record.source?.volatility || '').toLowerCase();
    if (volatility === 'high') return 30;
    if (volatility === 'medium') return 60;
    return 90;
  }
  if (record.type === 'workflow_report') return null;
  return null;
}

function promotionFor(record, route) {
  let priority = 'general';
  let weight = 1;
  if (record.type === 'pricing_fact' || record.type === 'model_fact') {
    priority = 'volatile_fact';
    weight = 1.4;
  } else if (record.type === 'source_record') {
    priority = record.source?.trust_tier === 'primary' ? 'primary_source' : 'source';
    weight = record.source?.trust_tier === 'primary' ? 1.35 : 1.15;
  } else if (record.type === 'affiliate_fact' || record.type === 'conversion_note') {
    priority = 'affiliate_conversion';
    weight = 1.2;
  } else if (record.type === 'quality_note') {
    priority = 'quality_note';
    weight = 1.12;
  } else if (record.type === 'page_snapshot') {
    priority = 'page_context';
    weight = 1.08;
  } else if (record.type === 'impact_summary') {
    priority = 'impact_context';
    weight = 1.05;
  } else if (record.type === 'workflow_report') {
    priority = 'historical_receipt';
    weight = 0.85;
  }
  if (route && record.route === route) {
    priority = `${priority}:same_route`;
    weight += 0.2;
  }
  return { priority, weight: roundScore(weight) };
}

function freshnessWeight(ageDays, expiresAfterDays) {
  if (ageDays == null || expiresAfterDays == null || expiresAfterDays === 0) return 1;
  const ageRatio = ageDays / expiresAfterDays;
  if (ageRatio >= 0.75) return 0.85;
  if (ageRatio >= 0.5) return 0.93;
  return 1;
}

function ageInDays(observedAt, currentDate) {
  const observed = parseDate(observedAt);
  const current = parseDate(currentDate);
  if (!observed || !current) return null;
  return Math.max(0, Math.floor((current - observed) / 86400000));
}

function expiresAt(observedAt, expiresAfterDays) {
  const observed = parseDate(observedAt);
  if (!observed || expiresAfterDays == null) return null;
  return new Date(observed.getTime() + expiresAfterDays * 86400000).toISOString().slice(0, 10);
}

function parseDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function roundScore(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 1000000) / 1000000;
}

function readJsonl(path) {
  return readFileSync(path, 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));
}

if (isCli) {
  const report = queryMemory(projectDir, { memoryPath, query, limit, currentDate, includeExpired, route });
  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (!report.ok) {
    console.error(`[agent-memory-query] ${report.error}`);
    process.exitCode = 1;
  } else {
    for (const match of report.matches) {
      console.log(`${match.score.toFixed(3)} ${match.type} ${match.route} ${match.id}`);
    }
  }
}
