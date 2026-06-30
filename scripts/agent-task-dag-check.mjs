#!/usr/bin/env node
// Validate AiPedia agent task DAG contract artifacts.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const KNOWN_FLAGS = new Set([
  '--json',
  '--help',
  '-h',
  '--path',
  '--project-dir',
  '--receipt',
  '--root',
]);
const VALUE_FLAGS = new Set(['--path', '--project-dir', '--receipt', '--root']);
const DEFAULT_PATH = 'local/tmp/aipedia-runner/agent-dag/agent-task-graph.json';

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emitReport({
    ok: false,
    mode: 'argument-error',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
    receipts: [],
  });
  process.exit(2);
}

const paths = selectedPaths();
const receipts = paths.map(validateFile);
const issueCount = receipts.reduce((sum, receipt) => sum + receipt.issues.length, 0);
const report = {
  ok: issueCount === 0,
  mode: 'agent-task-dag-check',
  project_dir: PROJECT_DIR,
  schema_version: 'aipedia.agent-task-dag-check.v1',
  totals: {
    receipts: receipts.length,
    ok: receipts.filter((receipt) => receipt.ok).length,
    failed: receipts.filter((receipt) => !receipt.ok).length,
    issues: issueCount,
  },
  receipts,
};

emitReport(report);
process.exit(report.ok ? 0 : 1);

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-task-dag-check.mjs --path local/tmp/aipedia-runner/agent-dag/agent-task-graph.json --json',
    '  node scripts/agent-task-dag-check.mjs --json',
    '',
    'Options:',
    '  --path <path>          Validate an agent DAG JSON artifact. Alias: --receipt. Repeatable.',
    '  --project-dir <dir>    Project root. Alias: --root.',
    '  --json                 Emit a structured report.',
  ].join('\n');
}

function selectedPaths() {
  const explicit = valuesFor('--path').concat(valuesFor('--receipt'));
  const paths = explicit.length ? explicit : [DEFAULT_PATH];
  return [...new Set(paths.map((path) => resolve(PROJECT_DIR, path)))].sort();
}

function validateFile(path) {
  const issues = [];
  let value = null;
  if (!existsSync(path)) {
    issues.push(issue('dag-missing', 'DAG artifact file does not exist.'));
    return receipt(path, issues, null);
  }
  try {
    value = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    issues.push(issue('dag-invalid-json', `DAG artifact JSON could not parse: ${error.message}`));
    return receipt(path, issues, null);
  }

  validateDag(value, issues);
  return receipt(path, issues, value);
}

function receipt(path, issues, value) {
  const nodes = Array.isArray(value?.nodes) ? value.nodes.length : 0;
  return {
    ok: issues.length === 0,
    path: projectPath(path),
    schema_version: typeof value?.schema_version === 'string' ? value.schema_version : '',
    node_count: nodes,
    issues,
  };
}

function validateDag(value, issues) {
  if (!isObject(value)) {
    issues.push(issue('dag-invalid', 'DAG artifact must be an object.'));
    return;
  }
  requireString(value, 'schema_version', issues, {
    values: ['aipedia.agent-task-dag.v1'],
  });
  requireString(value, 'mode', issues, {
    values: ['agent-task-dag'],
  });
  requireIsoString(value, 'generated_at', issues);
  requireIsoDateString(value, 'current_date', issues);
  requireString(value, 'route', issues);
  if (typeof value.route === 'string' && !value.route.startsWith('/')) {
    issues.push(issue('dag-route-invalid', 'route must start with /.'));
  }
  requireArray(value, 'nodes', issues);
  requireObject(value, 'graph_contract', issues);

  if (Array.isArray(value.nodes)) validateNodes(value.nodes, issues);
  if (isObject(value.graph_contract)) validateGraphContract(value.graph_contract, issues);
}

function validateNodes(nodes, issues) {
  if (nodes.length === 0) {
    issues.push(issue('dag-nodes-empty', 'nodes must contain at least one node.'));
    return;
  }

  const ids = new Set();
  const duplicateIds = new Set();
  for (const node of nodes) {
    if (isObject(node) && typeof node.id === 'string') {
      if (ids.has(node.id)) duplicateIds.add(node.id);
      ids.add(node.id);
    }
  }
  for (const id of duplicateIds) {
    issues.push(issue('dag-node-id-duplicate', `Duplicate node id: ${id}.`));
  }

  nodes.forEach((node, index) => validateNode(node, issues, `nodes[${index}]`, ids));
  validateDependencyGraph(nodes, issues, ids);
  validateCanonicalAgentPlan(nodes, issues);
}

function validateNode(node, issues, path, ids) {
  if (!isObject(node)) {
    issues.push(issue('dag-node-invalid', `${path} must be an object.`));
    return;
  }
  requireString(node, 'id', issues, { path: `${path}.id` });
  if (typeof node.id === 'string' && !/^[a-z][a-z0-9_-]*$/.test(node.id)) {
    issues.push(issue('dag-node-id-invalid', `${path}.id must be lowercase kebab, snake, or alphanumeric starting with a letter.`));
  }
  requireString(node, 'label', issues, { path: `${path}.label` });
  requireString(node, 'phase', issues, {
    path: `${path}.phase`,
    values: ['parallel', 'join', 'synthesis', 'patch', 'validation', 'closeout'],
  });
  requireString(node, 'kind', issues, {
    path: `${path}.kind`,
    values: ['command', 'manual', 'receipt'],
  });
  requireStringArray(node, 'depends_on', issues, `${path}.depends_on`);
  requireObject(node, 'permissions', issues, `${path}.permissions`);
  requireArray(node, 'artifacts', issues, `${path}.artifacts`);
  requireArray(node, 'validators', issues, `${path}.validators`);
  requireArray(node, 'receipt_hooks', issues, `${path}.receipt_hooks`);

  if (node.kind === 'command') validateCommand(node.command, issues, `${path}.command`);
  if (node.kind !== 'command' && node.command != null) {
    issues.push(issue('dag-node-command-invalid', `${path}.command is only allowed for command nodes.`));
  }
  if (Array.isArray(node.depends_on)) {
    for (const dependency of node.depends_on) {
      if (dependency === node.id) issues.push(issue('dag-node-self-dependency', `${path}.depends_on cannot include the node id.`));
      if (typeof dependency === 'string' && !ids.has(dependency)) {
        issues.push(issue('dag-node-missing-dependency', `${path}.depends_on references unknown node ${dependency}.`));
      }
    }
  }
  if (isObject(node.permissions)) validatePermissions(node.permissions, issues, `${path}.permissions`);
  if (Array.isArray(node.artifacts)) validateRefList(node.artifacts, issues, `${path}.artifacts`, 'dag-node-artifact-invalid');
  if (Array.isArray(node.validators)) validateValidators(node.validators, issues, `${path}.validators`);
  if (Array.isArray(node.receipt_hooks)) validateRefList(node.receipt_hooks, issues, `${path}.receipt_hooks`, 'dag-node-receipt-hook-invalid');
}

function validateCommand(command, issues, path) {
  if (!isObject(command)) {
    issues.push(issue('dag-node-command-invalid', `${path} must be an object for command nodes.`));
    return;
  }
  requireString(command, 'bin', issues, { path: `${path}.bin` });
  requireStringArray(command, 'args', issues, `${path}.args`);
}

function validatePermissions(permissions, issues, path) {
  requireString(permissions, 'filesystem', issues, {
    path: `${path}.filesystem`,
    values: ['none', 'read', 'write-local', 'write-tracked'],
  });
  requireString(permissions, 'network', issues, {
    path: `${path}.network`,
    values: ['none', 'local', 'internet'],
  });
  requireStringArray(permissions, 'writes', issues, `${path}.writes`);
  const writes = Array.isArray(permissions.writes) ? permissions.writes : [];
  if (permissions.filesystem === 'write-local' && writes.length === 0) {
    issues.push(issue('dag-node-permissions-invalid', `${path}.writes must name local outputs for write-local nodes.`));
  }
  if (permissions.filesystem === 'read' && writes.length !== 0) {
    issues.push(issue('dag-node-permissions-invalid', `${path}.writes must be empty for read-only nodes.`));
  }
}

function validateRefList(items, issues, path, code) {
  if (items.length === 0) {
    issues.push(issue(code, `${path} must contain at least one item.`));
    return;
  }
  items.forEach((item, index) => {
    const itemPath = `${path}[${index}]`;
    if (!isObject(item)) {
      issues.push(issue(code, `${itemPath} must be an object.`));
      return;
    }
    requireString(item, 'role', issues, { path: `${itemPath}.role` });
    requireString(item, 'kind', issues, { path: `${itemPath}.kind` });
    if (item.path != null && typeof item.path !== 'string') {
      issues.push(issue(code, `${itemPath}.path must be a string when present.`));
    }
    if (item.id != null && typeof item.id !== 'string') {
      issues.push(issue(code, `${itemPath}.id must be a string when present.`));
    }
    if (!item.path && !item.id) {
      issues.push(issue(code, `${itemPath} must include path or id.`));
    }
  });
}

function validateValidators(validators, issues, path) {
  if (validators.length === 0) {
    issues.push(issue('dag-node-validator-invalid', `${path} must contain at least one validator.`));
    return;
  }
  validators.forEach((validator, index) => {
    const validatorPath = `${path}[${index}]`;
    if (!isObject(validator)) {
      issues.push(issue('dag-node-validator-invalid', `${validatorPath} must be an object.`));
      return;
    }
    requireString(validator, 'id', issues, { path: `${validatorPath}.id` });
    requireString(validator, 'kind', issues, { path: `${validatorPath}.kind` });
    if (validator.command != null) validateCommand(validator.command, issues, `${validatorPath}.command`);
  });
}

function validateDependencyGraph(nodes, issues, ids) {
  const graph = new Map();
  for (const node of nodes) {
    if (!isObject(node) || typeof node.id !== 'string') continue;
    graph.set(node.id, Array.isArray(node.depends_on) ? node.depends_on.filter((id) => typeof id === 'string' && ids.has(id)) : []);
  }

  const visiting = new Set();
  const visited = new Set();
  const visit = (id, stack) => {
    if (visited.has(id)) return;
    if (visiting.has(id)) {
      issues.push(issue('dag-cycle', `DAG dependencies contain a cycle: ${stack.concat(id).join(' -> ')}.`));
      return;
    }
    visiting.add(id);
    for (const dependency of graph.get(id) || []) visit(dependency, stack.concat(id));
    visiting.delete(id);
    visited.add(id);
  };
  for (const id of graph.keys()) visit(id, []);
}

function validateCanonicalAgentPlan(nodes, issues) {
  const byId = new Map(nodes.filter(isObject).map((node) => [node.id, node]));
  for (const id of ['evidence', 'impact', 'score', 'memory_record']) {
    if (!byId.has(id)) issues.push(issue('dag-canonical-node-missing', `Canonical agent plan is missing ${id}.`));
  }
  const memory = byId.get('memory_record');
  if (isObject(memory)) {
    const dependencies = new Set(Array.isArray(memory.depends_on) ? memory.depends_on : []);
    for (const id of ['evidence', 'impact', 'score']) {
      if (!dependencies.has(id)) {
        issues.push(issue('dag-memory-dependency-missing', `memory_record must depend on ${id}.`));
      }
    }
  }
}

function validateGraphContract(contract, issues) {
  requireString(contract, 'execution_status', issues, {
    path: 'graph_contract.execution_status',
    values: ['contract_only'],
  });
  requireStringArray(contract, 'required_node_fields', issues, 'graph_contract.required_node_fields');
  requireStringArray(contract, 'required_receipt_hooks', issues, 'graph_contract.required_receipt_hooks');
}

function collectArgumentIssues() {
  const issues = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith('-')) continue;
    const flag = flagName(arg);
    if (!KNOWN_FLAGS.has(flag)) {
      issues.push(issue('argument-unknown', `Unknown argument: ${flag}`));
      continue;
    }
    if (VALUE_FLAGS.has(flag) && !arg.includes('=')) {
      const next = args[index + 1];
      if (!next || next.startsWith('-')) issues.push(issue('argument-missing-value', `${flag} requires a value.`));
      else index += 1;
    }
  }
  return issues;
}

function requireObject(value, field, issues, path = field) {
  if (!isObject(value[field])) issues.push(issue('field-invalid', `${path} must be an object.`));
}

function requireArray(value, field, issues, path = field) {
  if (!Array.isArray(value[field])) issues.push(issue('field-invalid', `${path} must be an array.`));
}

function requireStringArray(value, field, issues, path = field) {
  if (!Array.isArray(value[field])) {
    issues.push(issue('field-invalid', `${path} must be an array.`));
    return;
  }
  if (value[field].some((item) => typeof item !== 'string')) {
    issues.push(issue('field-invalid', `${path} must contain only strings.`));
  }
}

function requireString(value, field, issues, options = {}) {
  const path = options.path || field;
  if (typeof value[field] !== 'string' || !value[field].trim()) {
    issues.push(issue('field-invalid', `${path} must be a non-empty string.`));
    return;
  }
  if (options.values && !options.values.includes(value[field])) {
    issues.push(issue('field-invalid', `${path} must be one of: ${options.values.join(', ')}.`));
  }
}

function requireIsoString(value, field, issues, path = field) {
  requireString(value, field, issues, { path });
  if (typeof value[field] === 'string' && Number.isNaN(Date.parse(value[field]))) {
    issues.push(issue('field-invalid', `${path} must be an ISO-like date/time string.`));
  }
}

function requireIsoDateString(value, field, issues, path = field) {
  requireString(value, field, issues, { path });
  if (typeof value[field] === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(value[field])) {
    issues.push(issue('field-invalid', `${path} must be YYYY-MM-DD.`));
  }
}

function valueFor(flag) {
  const inline = args.find((arg) => arg.startsWith(`${flag}=`));
  if (inline) return inline.slice(flag.length + 1);
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

function valuesFor(flag) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === flag) {
      const value = args[index + 1];
      if (value && !value.startsWith('--')) values.push(value);
    } else if (arg.startsWith(`${flag}=`)) {
      values.push(arg.slice(flag.length + 1));
    }
  }
  return values.flatMap((value) => value.split(',')).map((value) => value.trim()).filter(Boolean);
}

function hasFlag(flag) {
  return args.includes(flag) || args.some((arg) => arg.startsWith(`${flag}=`));
}

function flagName(arg) {
  const index = arg.indexOf('=');
  return index >= 0 ? arg.slice(0, index) : arg;
}

function issue(code, detail) {
  return { code, detail };
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function projectPath(path) {
  const rel = path.startsWith(PROJECT_DIR) ? path.slice(PROJECT_DIR.length).replace(/^\/+/, '') : path;
  return rel || '.';
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }
  if (!report.ok) {
    console.error('[agent-task-dag-check] failed');
    for (const receipt of report.receipts || []) {
      for (const receiptIssue of receipt.issues || []) {
        console.error(`- ${receipt.path}: ${receiptIssue.detail}`);
      }
    }
    return;
  }
  console.log(`[agent-task-dag-check] ${report.totals.receipts} DAG artifact(s) ok`);
}
