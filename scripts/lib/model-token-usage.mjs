export const MODEL_TOKEN_USAGE_SCHEMA_VERSION = 'aipedia.model-token-usage.v1';

const TOKEN_FIELDS = [
  'request_count',
  'input_tokens',
  'output_tokens',
  'cached_input_tokens',
  'reasoning_tokens',
  'total_tokens',
];

export function normalizeModelTokenUsage(value, options = {}) {
  const source = stringValue(options.source) || 'embedded:model-token-usage';
  const defaults = isObject(options.defaults) ? options.defaults : {};
  const entries = modelTokenUsageEntries(value);
  const defaultContext = modelTokenUsageContext(
    isObject(value) ? value : {},
    isObject(value?.usage) ? value.usage : {},
    defaults,
  );
  const workflowBreakdown = new Map();
  const runBreakdown = new Map();
  const orchestratorBreakdown = new Map();
  const subagentBreakdown = new Map();
  const models = new Set();
  let requestCount = 0;
  let inputTokens = 0;
  let outputTokens = 0;
  let cachedInputTokens = 0;
  let reasoningTokens = 0;
  let providedTotalTokens = 0;
  let tokenBearingEntries = 0;

  for (const entry of entries) {
    if (!isObject(entry)) continue;
    const usage = isObject(entry.usage) ? entry.usage : entry;
    const model = stringPath(entry, 'model') || stringPath(usage, 'model');
    if (model) models.add(model);
    const context = modelTokenUsageContext(entry, usage, defaultContext);

    const entryInput = tokenValue(usage, ['input_tokens', 'prompt_tokens', 'inputTokens', 'promptTokens']);
    const entryOutput = tokenValue(usage, ['output_tokens', 'completion_tokens', 'outputTokens', 'completionTokens']);
    const entryCached = tokenValue(usage, [
      'cached_input_tokens',
      'cached_tokens',
      'cachedTokens',
      'input_token_details.cached_tokens',
      'input_tokens_details.cached_tokens',
      'prompt_tokens_details.cached_tokens',
    ]);
    const entryReasoning = tokenValue(usage, [
      'reasoning_tokens',
      'reasoningTokens',
      'output_token_details.reasoning_tokens',
      'output_tokens_details.reasoning_tokens',
      'completion_tokens_details.reasoning_tokens',
    ]);
    const entryTotal = tokenValue(usage, ['total_tokens', 'totalTokens']);
    const entryRequestCount = tokenValue(entry, ['request_count', 'requests', 'requestCount'])
      || tokenValue(usage, ['request_count', 'requests', 'requestCount'])
      || 1;
    const entryComputedTotal = entryTotal || entryInput + entryOutput;

    inputTokens += entryInput;
    outputTokens += entryOutput;
    cachedInputTokens += entryCached;
    reasoningTokens += entryReasoning;
    providedTotalTokens += entryTotal;
    if (entryInput || entryOutput || entryTotal) {
      tokenBearingEntries += 1;
      requestCount += entryRequestCount;
      const tokenSummary = {
        request_count: entryRequestCount,
        input_tokens: entryInput,
        output_tokens: entryOutput,
        cached_input_tokens: entryCached,
        reasoning_tokens: entryReasoning,
        total_tokens: entryComputedTotal,
      };
      addTokenBreakdown(workflowBreakdown, context.workflow, tokenSummary);
      addTokenBreakdown(runBreakdown, context.run_id, tokenSummary);
      addTokenBreakdown(orchestratorBreakdown, context.orchestrator, tokenSummary);
      addTokenBreakdown(subagentBreakdown, context.subagent, tokenSummary);
    }
  }

  const computedTotalTokens = inputTokens + outputTokens;
  const totalTokens = providedTotalTokens || computedTotalTokens;
  const issues = [];
  if (!totalTokens) {
    issues.push(modelTokenUsageIssue('model-token-usage-missing', `Model token usage from ${source} did not include any token counts.`));
  }
  if (providedTotalTokens && computedTotalTokens && providedTotalTokens !== computedTotalTokens) {
    issues.push(modelTokenUsageIssue('model-token-usage-mismatch', `Model token usage from ${source} has total_tokens ${providedTotalTokens} but input plus output is ${computedTotalTokens}.`));
  }
  if (cachedInputTokens > inputTokens) {
    issues.push(modelTokenUsageIssue('model-token-usage-mismatch', `Model token usage from ${source} has cached input tokens greater than input tokens.`));
  }
  if (reasoningTokens > outputTokens) {
    issues.push(modelTokenUsageIssue('model-token-usage-mismatch', `Model token usage from ${source} has reasoning tokens greater than output tokens.`));
  }
  if (issues.length) return { report: null, issues };

  const sortedModels = [...models].sort();
  return {
    report: {
      schema_version: MODEL_TOKEN_USAGE_SCHEMA_VERSION,
      source,
      status: 'provided',
      models: sortedModels,
      model: sortedModels[0] || '',
      entry_count: entries.length,
      token_bearing_entry_count: tokenBearingEntries,
      request_count: requestCount || tokenBearingEntries,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      cached_input_tokens: cachedInputTokens,
      reasoning_tokens: reasoningTokens,
      total_tokens: totalTokens,
      workflow_context_count: sortedTokenBreakdown(workflowBreakdown).length,
      run_context_count: sortedTokenBreakdown(runBreakdown).length,
      orchestrator_context_count: sortedTokenBreakdown(orchestratorBreakdown).length,
      subagent_context_count: sortedTokenBreakdown(subagentBreakdown).length,
      workflow_breakdown: sortedTokenBreakdown(workflowBreakdown),
      run_breakdown: sortedTokenBreakdown(runBreakdown),
      orchestrator_breakdown: sortedTokenBreakdown(orchestratorBreakdown),
      subagent_breakdown: sortedTokenBreakdown(subagentBreakdown),
    },
    issues: [],
  };
}

export function validateModelTokenUsageReport(value, path = 'model_token_usage') {
  const issues = [];
  if (!isObject(value)) {
    return [modelTokenUsageIssue('model-token-usage-invalid', `${path} must be an object.`)];
  }
  if (value.schema_version !== MODEL_TOKEN_USAGE_SCHEMA_VERSION) {
    issues.push(modelTokenUsageIssue('model-token-usage-invalid', `${path}.schema_version must be ${MODEL_TOKEN_USAGE_SCHEMA_VERSION}.`));
  }
  if (typeof value.source !== 'string') issues.push(modelTokenUsageIssue('model-token-usage-invalid', `${path}.source must be a string.`));
  if (value.status !== 'provided') issues.push(modelTokenUsageIssue('model-token-usage-invalid', `${path}.status must be provided.`));
  if (!Array.isArray(value.models) || value.models.some((item) => typeof item !== 'string')) {
    issues.push(modelTokenUsageIssue('model-token-usage-invalid', `${path}.models must be an array of strings.`));
  }
  if (typeof value.model !== 'string') issues.push(modelTokenUsageIssue('model-token-usage-invalid', `${path}.model must be a string.`));
  for (const field of ['entry_count', 'token_bearing_entry_count', ...TOKEN_FIELDS]) {
    requireNonNegativeInteger(value, field, issues, `${path}.${field}`);
  }
  if (typeof value.total_tokens === 'number'
    && typeof value.input_tokens === 'number'
    && typeof value.output_tokens === 'number'
    && value.total_tokens !== value.input_tokens + value.output_tokens) {
    issues.push(modelTokenUsageIssue('model-token-usage-mismatch', `${path}.total_tokens must equal input_tokens plus output_tokens.`));
  }
  if (typeof value.cached_input_tokens === 'number'
    && typeof value.input_tokens === 'number'
    && value.cached_input_tokens > value.input_tokens) {
    issues.push(modelTokenUsageIssue('model-token-usage-mismatch', `${path}.cached_input_tokens cannot exceed input_tokens.`));
  }
  if (typeof value.reasoning_tokens === 'number'
    && typeof value.output_tokens === 'number'
    && value.reasoning_tokens > value.output_tokens) {
    issues.push(modelTokenUsageIssue('model-token-usage-mismatch', `${path}.reasoning_tokens cannot exceed output_tokens.`));
  }
  for (const [kind, field, countField] of [
    ['workflow', 'workflow_breakdown', 'workflow_context_count'],
    ['run', 'run_breakdown', 'run_context_count'],
    ['orchestrator', 'orchestrator_breakdown', 'orchestrator_context_count'],
    ['subagent', 'subagent_breakdown', 'subagent_context_count'],
  ]) {
    validateTokenBreakdown(value[field], value, issues, `${path}.${field}`, kind);
    if (Array.isArray(value[field]) && typeof value[countField] === 'number' && value[countField] !== value[field].length) {
      issues.push(modelTokenUsageIssue('model-token-usage-breakdown-mismatch', `${path}.${countField} must match ${path}.${field}.length.`));
    }
  }
  return issues;
}

export function modelTokenUsageEfficiencyFields(report) {
  if (!isObject(report) || report.status !== 'provided') return {};
  return {
    model_token_usage_status: 'provided',
    model_token_usage_source: report.source || '',
    exact_model_request_count: nonNegative(report.request_count),
    exact_model_input_tokens: nonNegative(report.input_tokens),
    exact_model_output_tokens: nonNegative(report.output_tokens),
    exact_model_cached_input_tokens: nonNegative(report.cached_input_tokens),
    exact_model_reasoning_tokens: nonNegative(report.reasoning_tokens),
    exact_model_total_tokens: nonNegative(report.total_tokens),
    exact_model_workflow_context_count: nonNegative(report.workflow_context_count),
    exact_model_run_context_count: nonNegative(report.run_context_count),
    exact_model_orchestrator_context_count: nonNegative(report.orchestrator_context_count),
    exact_model_subagent_context_count: nonNegative(report.subagent_context_count),
    exact_model_workflow_breakdown: report.workflow_breakdown || [],
    exact_model_run_breakdown: report.run_breakdown || [],
    exact_model_orchestrator_breakdown: report.orchestrator_breakdown || [],
    exact_model_subagent_breakdown: report.subagent_breakdown || [],
  };
}

export function modelTokenUsageIssue(code, message) {
  return { code, message, detail: message };
}

function validateTokenBreakdown(rows, totals, issues, path, kind) {
  if (!Array.isArray(rows)) {
    issues.push(modelTokenUsageIssue('model-token-usage-breakdown-invalid', `${path} must be an array.`));
    return;
  }
  const seen = new Set();
  const sums = Object.fromEntries(TOKEN_FIELDS.map((field) => [field, 0]));
  rows.forEach((row, index) => {
    const rowPath = `${path}[${index}]`;
    if (!isObject(row)) {
      issues.push(modelTokenUsageIssue('model-token-usage-breakdown-invalid', `${rowPath} must be an object.`));
      return;
    }
    if (!stringValue(row.id)) {
      issues.push(modelTokenUsageIssue('model-token-usage-breakdown-invalid', `${rowPath}.id is required.`));
    } else if (seen.has(row.id)) {
      issues.push(modelTokenUsageIssue('model-token-usage-breakdown-invalid', `${rowPath}.id must be unique within ${path}.`));
    }
    seen.add(row.id);
    for (const field of TOKEN_FIELDS) {
      requireNonNegativeInteger(row, field, issues, `${rowPath}.${field}`);
      if (typeof row[field] === 'number') sums[field] += row[field];
    }
    if (typeof row.total_tokens === 'number'
      && typeof row.input_tokens === 'number'
      && typeof row.output_tokens === 'number'
      && row.total_tokens !== row.input_tokens + row.output_tokens) {
      issues.push(modelTokenUsageIssue('model-token-usage-breakdown-mismatch', `${rowPath}.total_tokens must equal input_tokens plus output_tokens.`));
    }
    if (typeof row.cached_input_tokens === 'number'
      && typeof row.input_tokens === 'number'
      && row.cached_input_tokens > row.input_tokens) {
      issues.push(modelTokenUsageIssue('model-token-usage-breakdown-mismatch', `${rowPath}.cached_input_tokens cannot exceed input_tokens.`));
    }
    if (typeof row.reasoning_tokens === 'number'
      && typeof row.output_tokens === 'number'
      && row.reasoning_tokens > row.output_tokens) {
      issues.push(modelTokenUsageIssue('model-token-usage-breakdown-mismatch', `${rowPath}.reasoning_tokens cannot exceed output_tokens.`));
    }
  });
  for (const field of TOKEN_FIELDS) {
    if (typeof totals[field] === 'number' && sums[field] !== totals[field]) {
      issues.push(modelTokenUsageIssue('model-token-usage-breakdown-mismatch', `${path} ${field} must sum to model_token_usage.${field} for ${kind} contexts.`));
    }
  }
}

function modelTokenUsageContext(entry, usage, defaults = {}) {
  const workflow = firstStringPath([entry, usage], [
    'workflow',
    'workflow_id',
    'workflowId',
    'workflow.name',
    'context.workflow',
    'context.workflow_id',
    'context.workflowId',
    'metadata.workflow',
    'metadata.workflow_id',
    'metadata.workflowId',
  ]) || defaults.workflow || 'unknown';
  const runId = firstStringPath([entry, usage], [
    'run_id',
    'runId',
    'run',
    'trace.run_id',
    'context.run_id',
    'context.runId',
    'metadata.run_id',
    'metadata.runId',
  ]) || defaults.run_id || 'unknown';
  const orchestrator = firstStringPath([entry, usage], [
    'orchestrator',
    'orchestrator_id',
    'orchestratorId',
    'orchestrator.name',
    'context.orchestrator',
    'context.orchestrator_id',
    'context.orchestratorId',
    'metadata.orchestrator',
    'metadata.orchestrator_id',
    'metadata.orchestratorId',
  ]) || defaults.orchestrator || 'unknown';
  const subagent = firstStringPath([entry, usage], [
    'subagent',
    'subagent_id',
    'subagentId',
    'agent',
    'agent_id',
    'agentId',
    'agent.name',
    'context.subagent',
    'context.subagent_id',
    'context.subagentId',
    'context.agent',
    'context.agent_id',
    'context.agentId',
    'metadata.subagent',
    'metadata.subagent_id',
    'metadata.subagentId',
    'metadata.agent',
    'metadata.agent_id',
    'metadata.agentId',
  ]) || defaults.subagent || 'unknown';
  return { workflow, run_id: runId, orchestrator, subagent };
}

function addTokenBreakdown(map, id, tokens) {
  const key = id || 'unknown';
  if (!map.has(key)) {
    map.set(key, {
      id: key,
      request_count: 0,
      input_tokens: 0,
      output_tokens: 0,
      cached_input_tokens: 0,
      reasoning_tokens: 0,
      total_tokens: 0,
    });
  }
  const row = map.get(key);
  row.request_count += tokens.request_count;
  row.input_tokens += tokens.input_tokens;
  row.output_tokens += tokens.output_tokens;
  row.cached_input_tokens += tokens.cached_input_tokens;
  row.reasoning_tokens += tokens.reasoning_tokens;
  row.total_tokens += tokens.total_tokens;
}

function sortedTokenBreakdown(map) {
  return [...map.values()].sort((left, right) => right.total_tokens - left.total_tokens || left.id.localeCompare(right.id));
}

function modelTokenUsageEntries(value) {
  if (Array.isArray(value)) return value;
  if (!isObject(value)) return [];
  for (const key of ['entries', 'records', 'calls', 'events']) {
    if (Array.isArray(value[key])) return value[key];
  }
  if (Array.isArray(value.requests)) return value.requests;
  return [value];
}

function tokenValue(object, paths) {
  for (const path of paths) {
    const value = valueAtPath(object, path);
    const number = Number(value);
    if (Number.isFinite(number) && number > 0) return Math.round(number);
  }
  return 0;
}

function stringPath(object, path) {
  const value = valueAtPath(object, path);
  return typeof value === 'string' ? value : '';
}

function firstStringPath(objects, paths) {
  for (const object of objects) {
    for (const path of paths) {
      const value = stringPath(object, path);
      if (value) return value;
    }
  }
  return '';
}

function valueAtPath(object, path) {
  if (!isObject(object)) return undefined;
  return path.split('.').reduce((current, key) => (isObject(current) ? current[key] : undefined), object);
}

function requireNonNegativeInteger(value, field, issues, path) {
  if (!Number.isInteger(value[field]) || value[field] < 0) {
    issues.push(modelTokenUsageIssue('model-token-usage-invalid', `${path} must be a non-negative integer.`));
  }
}

function nonNegative(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function stringValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}
