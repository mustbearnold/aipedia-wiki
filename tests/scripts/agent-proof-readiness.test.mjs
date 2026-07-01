import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runReadiness(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-proof-readiness.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function workflowReceipt(id, status = 'fresh') {
  const ok = status === 'fresh' || status === 'current';
  const metadata = {
    'page-refresh': {
      kind: 'page-refresh-ledger',
      input: 'PAGE_REFRESH_LEDGER.md',
      refresh_command: 'npm run ledger:pages && npm run ledger:pages:check',
      enforce_command: 'npm run page:refresh:batch -- --fail-on-stale-ledger --json',
    },
    'tool-refresh': {
      kind: 'tool-refresh-freshness-report',
      input: 'audit-freshness-queue',
      refresh_command: 'npm run audit:freshness -- --json',
      enforce_command: 'npm run tool:refresh:batch -- --fail-on-stale-inputs --json',
    },
    'affiliate-conversion': {
      kind: 'affiliate-conversion-inventory',
      input: 'affiliate-conversion-inventory',
      refresh_command: 'npm run affiliate:conversion:inventory -- --json',
      enforce_command: 'npm run affiliate:conversion:plan -- --fail-on-stale-inputs --json',
    },
  }[id];
  return {
    id,
    ...metadata,
    ok,
    status,
    next_action: ok ? '' : `Refresh ${id}.`,
  };
}

function freshnessReceipt(workflows = { 'page-refresh': 'fresh' }) {
  const entries = Object.entries(workflows).map(([id, status]) => workflowReceipt(id, status));
  return {
    ok: entries.every((entry) => entry.ok),
    mode: 'input-freshness-receipt',
    schema_version: 'aipedia.input-freshness-receipt.v1',
    workflows: entries,
    refresh_plan: entries.filter((entry) => !entry.ok).map((entry) => refreshPlanFor(entry)).filter(Boolean),
    summary: {
      workflow_count: entries.length,
      ok_count: entries.filter((entry) => entry.ok).length,
      attention_count: entries.filter((entry) => !entry.ok).length,
      stale_count: entries.filter((entry) => entry.status === 'stale').length,
    },
    next_actions: entries.filter((entry) => !entry.ok).map((entry) => entry.next_action),
  };
}

function refreshPlanFor(entry) {
  if (entry.id !== 'page-refresh') return null;
  return {
    id: 'page-refresh',
    status: 'planned',
    before_status: entry.status,
    mutation_policy: 'tracked-generated',
    requires_tracked_mutation_ack: true,
    requires_explicit_workflow: true,
    writes: ['PAGE_REFRESH_LEDGER.md'],
    commands: [
      {
        label: 'page refresh ledger',
        command: 'node scripts/generate-page-refresh-ledger.mjs --json --project-dir .',
      },
    ],
    required_flags: [],
    blocked_reasons: [],
    next_action: 'Run npm run agent:input-freshness -- --workflow page-refresh --refresh-stale --apply-refreshes --allow-tracked-mutations --require-fresh --json.',
  };
}

function validAffiliateHandoffReceipt(overrides = {}) {
  return {
    schema_version: 'aipedia.affiliate-handoff-receipt.v1',
    workflow: 'affiliate-conversion-handoff',
    status: 'ready',
    generated_at: '2026-06-30T03:01:47Z',
    current_date: '2026-06-30',
    plan: 'local/tmp/affiliate-plan.json',
    report_summary: 'local/tmp/affiliate-report-summary.md',
    markdown_handoff: 'local/tmp/affiliate-handoff.md',
    selected_cluster_count: 1,
    selected_clusters: [
      {
        id: 'affiliate-alpha-tool',
        primary_tool: 'alpha-tool',
        worker_id: 'affiliate-worker-1',
        buyer_job: 'Find the next Alpha Tool buyer-intent page.',
        source_file: 'src/content/tools/alpha-tool.md',
        claim_receipt_count: 1,
        source_url_count: 2,
        commercial_cta_note_count: 1,
        parent_surface_note_count: 1,
        duplicate_intent_note_count: 1,
        route_qa_risk_count: 1,
        check_count: 2,
      },
    ],
    expected_worker_reports: 1,
    parsed_worker_reports: 1,
    missing_worker_reports: [],
    invalid_worker_reports: [],
    strict_validation_issue_count: 0,
    claim_receipt_count: 1,
    source_url_count: 2,
    commercial_cta_note_count: 1,
    duplicate_intent_note_count: 1,
    parent_surface_note_count: 1,
    route_qa_routes: ['/tools/alpha-tool/', '/guides/alpha-tool-pricing/'],
    parent_surfaces: ['/tools/', '/guides/'],
    verification_gates: [
      'npm run runner:affiliate-conversion:reports -- --strict',
      'npm run affiliate:conversion:inventory -- --json',
      'npm run ledger:pages && npm run ledger:pages:check',
      'npm run typecheck',
      'npm run build:fast',
      'Inspect CommercialCTA usage and affiliate disclosure on every changed commercial page.',
      'Run live source checks for every volatile source touched by the content slice.',
    ],
    no_edit_boundaries: [
      'Workers may touch only explicitly assigned files.',
      'Workers must not edit `PAGE_REFRESH_LEDGER.md`, `src/data/source-registry.json`, parent hubs, top-layer pages, `.agent/**`, `workflows/**`, runner code, audit scripts, or generated output.',
      'The integrator owns shared files, route QA scope, final verification, and final receipts.',
    ],
    blocked_or_deferred_count: 0,
    pending_count: 0,
    non_passed_check_count: 0,
    residual_risks: [
      'This is a no-content implementation handoff and does not itself publish or verify rendered pages.',
    ],
    ...overrides,
  };
}

function writeAffiliateProof(root, receipt) {
  const dir = join(root, '.agent', 'evals', 'closeout-policy-receipts');
  mkdirSync(dir, { recursive: true });
  writeJson(join(dir, '2026-06-30-slice-44-affiliate-handoff-policy-proof.json'), receipt);
}

function writeProofTargetRegistry(root, overrides = {}) {
  const dir = join(root, '.agent', 'meta');
  mkdirSync(dir, { recursive: true });
  writeJson(join(dir, 'proof-readiness-targets.json'), {
    schema_version: 'aipedia.meta-proof-readiness-targets.v1',
    targets: [
      {
        id: 'affiliate-handoff-policy',
        proof_receipts: [
          '.agent/evals/closeout-policy-receipts/2026-06-30-slice-44-affiliate-handoff-policy-proof.json',
        ],
        proved_next_actions: [
          'Use the durable affiliate handoff proof as the positive policy baseline and move to the next unproved proof target.',
        ],
      },
    ],
    ...overrides,
  });
}

test('proof readiness reports page-refresh policy ready when ledger input is current and content tree is clean', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-ready-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt({ 'page-refresh': 'current' }));
    writeFileSync(join(root, 'status.txt'), '');

    const result = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'page-refresh-policy',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.summary.ready_count, 1);
    assert.equal(report.targets[0].status, 'ready');
    assert.equal(report.targets[0].readiness_checks.find((check) => check.id === 'page-refresh-input-freshness').status, 'current');
    assert.equal(report.targets[0].recommended_commands.at(-1), 'npm run agent:meta:closeout:auto -- --receipt <page-refresh-closeout.json> --json');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness can write a durable readiness receipt', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-receipt-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt({ 'page-refresh': 'fresh' }));
    writeFileSync(join(root, 'status.txt'), '');

    const result = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'page-refresh-policy',
      '--out',
      '.agent/evals/proof-readiness/fixture-readiness.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const report = JSON.parse(result.stdout);
    const receiptPath = join(root, '.agent', 'evals', 'proof-readiness', 'fixture-readiness.json');
    assert.equal(report.receipt_path, '.agent/evals/proof-readiness/fixture-readiness.json');
    assert.equal(existsSync(receiptPath), true);
    const receipt = JSON.parse(readFileSync(receiptPath, 'utf8'));
    assert.equal(receipt.schema_version, 'aipedia.meta-proof-readiness.v1');
    assert.equal(receipt.summary.ready_count, 1);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness blocks stale page-refresh inputs and dirty content WIP', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-blocked-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt({ 'page-refresh': 'stale' }));
    writeFileSync(
      join(root, 'status.txt'),
      [
        ' M src/content/tools/synthesia.md',
        ' M src/data/source-registry.json',
        '?? src/content/comparisons/captions-vs-synthesia.md',
      ].join('\n'),
    );

    const result = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'page-refresh-policy',
      '--json',
    ]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.inputs.input_refresh_plan_status, 'from-input-freshness');
    assert.equal(report.inputs.input_refresh_plan_count, 1);
    assert.equal(report.summary.blocked_count, 1);
    assert.deepEqual(
      report.targets[0].blockers.map((item) => item.code),
      ['input-freshness-stale', 'dirty-content-wip'],
    );
    assert.equal(report.targets[0].blockers[0].input_refresh_plan.id, 'page-refresh');
    assert.equal(report.targets[0].blockers[0].input_refresh_plan.mutation_policy, 'tracked-generated');
    assert.deepEqual(report.targets[0].blockers[0].input_refresh_plan.writes, ['PAGE_REFRESH_LEDGER.md']);
    assert.equal(
      report.targets[0].blockers[0].input_refresh_plan.commands[0].command,
      'node scripts/generate-page-refresh-ledger.mjs --json --project-dir .',
    );
    assert.deepEqual(report.targets[0].blockers[1].paths, [
      'src/content/tools/synthesia.md',
      'src/data/source-registry.json',
      'src/content/comparisons/captions-vs-synthesia.md',
    ]);
    const inputCheck = report.targets[0].readiness_checks.find((check) => check.id === 'page-refresh-input-freshness');
    assert.equal(inputCheck.input_refresh_plan.status, 'planned');
    const dirtyCheck = report.targets[0].readiness_checks.find((check) => check.id === 'dirty-content-boundary');
    assert.deepEqual(dirtyCheck.dirty_paths, [
      'src/content/tools/synthesia.md',
      'src/data/source-registry.json',
      'src/content/comparisons/captions-vs-synthesia.md',
    ]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness can explicitly set aside observed dirty content boundaries', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-observed-dirty-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt({ 'page-refresh': 'fresh' }));
    writeFileSync(
      join(root, 'status.txt'),
      [
        ' M src/content/tools/synthesia.md',
        ' M src/data/source-registry.json',
        '?? src/content/comparisons/captions-vs-synthesia.md',
      ].join('\n'),
    );

    const result = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'page-refresh-policy',
      '--observed-dirty-before-agent',
      'src/content/tools/synthesia.md',
      '--observed-dirty-before-agent',
      'src/data/source-registry.json',
      '--observed-dirty-before-agent',
      'src/content/comparisons/captions-vs-synthesia.md',
      '--allow-observed-dirty-boundary',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.inputs.allow_observed_dirty_boundary, true);
    assert.deepEqual(report.inputs.observed_dirty_before_agent, [
      'src/content/tools/synthesia.md',
      'src/data/source-registry.json',
      'src/content/comparisons/captions-vs-synthesia.md',
    ]);
    assert.equal(report.summary.ready_count, 1);
    assert.equal(report.targets[0].status, 'ready');
    assert.match(report.targets[0].next_actions.at(-1), /AIPEDIA_OBSERVED_DIRTY_BEFORE_AGENT=/);
    const dirtyCheck = report.targets[0].readiness_checks.find((check) => check.id === 'dirty-content-boundary');
    assert.equal(dirtyCheck.ok, true);
    assert.equal(dirtyCheck.observed_dirty_allowed, true);
    assert.deepEqual(dirtyCheck.observed_dirty_paths, [
      'src/content/tools/synthesia.md',
      'src/data/source-registry.json',
      'src/content/comparisons/captions-vs-synthesia.md',
    ]);
    assert.deepEqual(dirtyCheck.unobserved_dirty_paths, []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness still blocks unobserved dirty paths when observed boundaries are allowed', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-unobserved-dirty-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt({ 'page-refresh': 'fresh' }));
    writeFileSync(
      join(root, 'status.txt'),
      [
        ' M src/content/tools/synthesia.md',
        ' M src/data/source-registry.json',
      ].join('\n'),
    );

    const result = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'page-refresh-policy',
      '--observed-dirty-before-agent',
      'src/content/tools/synthesia.md',
      '--allow-observed-dirty-boundary',
      '--json',
    ]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.summary.blocked_count, 1);
    assert.deepEqual(report.targets[0].blockers.map((item) => item.code), ['dirty-content-wip']);
    assert.deepEqual(report.targets[0].blockers[0].paths, ['src/data/source-registry.json']);
    const dirtyCheck = report.targets[0].readiness_checks.find((check) => check.id === 'dirty-content-boundary');
    assert.equal(dirtyCheck.ok, false);
    assert.deepEqual(dirtyCheck.observed_dirty_paths, ['src/content/tools/synthesia.md']);
    assert.deepEqual(dirtyCheck.unobserved_dirty_paths, ['src/data/source-registry.json']);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness evaluates tool-refresh and affiliate handoff targets independently', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-multi-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt({
      'tool-refresh': 'fresh',
      'affiliate-conversion': 'fresh',
    }));
    writeFileSync(
      join(root, 'status.txt'),
      [
        ' M src/content/tools/synthesia.md',
        ' M src/data/source-registry.json',
        '?? src/content/comparisons/captions-vs-synthesia.md',
      ].join('\n'),
    );

    const result = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'tool-refresh-policy',
      '--target',
      'affiliate-handoff-policy',
      '--json',
    ]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.summary.target_count, 2);
    assert.equal(report.summary.ready_count, 1);
    assert.equal(report.summary.blocked_count, 1);

    const toolTarget = report.targets.find((target) => target.id === 'tool-refresh-policy');
    const affiliateTarget = report.targets.find((target) => target.id === 'affiliate-handoff-policy');
    assert.equal(toolTarget.status, 'blocked');
    assert.deepEqual(toolTarget.blockers.map((item) => item.code), ['dirty-tool-refresh-wip']);
    assert.deepEqual(toolTarget.blockers[0].paths, [
      'src/content/tools/synthesia.md',
      'src/data/source-registry.json',
    ]);
    assert.equal(affiliateTarget.status, 'ready');
    assert.equal(
      affiliateTarget.recommended_commands.at(-1),
      'npm run agent:closeout:check -- --receipt <affiliate-handoff.json> --require-workflow-policy --json',
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness marks affiliate handoff proved when durable receipt validates', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-complete-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt({ 'affiliate-conversion': 'fresh' }));
    writeFileSync(join(root, 'status.txt'), '');
    writeAffiliateProof(root, validAffiliateHandoffReceipt());
    writeProofTargetRegistry(root);

    const result = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'affiliate-handoff-policy',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.summary.ready_count, 0);
    assert.equal(report.summary.proved_count, 1);
    assert.equal(report.targets[0].status, 'proved');
    assert.equal(report.targets[0].proof_completion.status, 'proved');
    assert.equal(report.targets[0].proof_completion.valid_count, 1);
    assert.equal(report.inputs.proof_target_registry_status, 'loaded');
    assert.equal(report.targets[0].readiness_checks[0].id, 'proof-completion');
    assert.match(
      report.targets[0].recommended_commands[0],
      /2026-06-30-slice-44-affiliate-handoff-policy-proof\.json/,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness does not mark invalid durable proof receipts proved', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-invalid-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt({ 'affiliate-conversion': 'fresh' }));
    writeFileSync(join(root, 'status.txt'), '');
    writeProofTargetRegistry(root);
    writeAffiliateProof(root, validAffiliateHandoffReceipt({
      selected_cluster_count: 0,
      selected_clusters: [],
      claim_receipt_count: 0,
      source_url_count: 0,
      commercial_cta_note_count: 0,
      duplicate_intent_note_count: 0,
      parent_surface_note_count: 0,
    }));

    const result = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'affiliate-handoff-policy',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const report = JSON.parse(result.stdout);
    assert.equal(report.summary.ready_count, 1);
    assert.equal(report.summary.proved_count, 0);
    assert.equal(report.targets[0].status, 'ready');
    assert.equal(report.targets[0].proof_completion.status, 'invalid');
    assert.equal(report.targets[0].proof_completion.valid_count, 0);
    const codes = report.targets[0].proof_completion.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('affiliate-handoff-policy-empty'));
    assert.ok(codes.includes('affiliate-handoff-policy-evidence-missing'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness does not count proof receipts unless the registry configures them', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-registry-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt({ 'affiliate-conversion': 'fresh' }));
    writeFileSync(join(root, 'status.txt'), '');
    writeAffiliateProof(root, validAffiliateHandoffReceipt());

    const untracked = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'affiliate-handoff-policy',
      '--json',
    ]);
    assert.equal(untracked.status, 0, untracked.stderr || untracked.stdout);
    const untrackedReport = JSON.parse(untracked.stdout);
    assert.equal(untrackedReport.summary.ready_count, 1);
    assert.equal(untrackedReport.summary.proved_count, 0);
    assert.equal(untrackedReport.targets[0].proof_completion.status, 'untracked');
    assert.equal(untrackedReport.inputs.proof_target_registry_status, 'absent');

    writeProofTargetRegistry(root);
    const proved = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'affiliate-handoff-policy',
      '--proof-targets',
      '.agent/meta/proof-readiness-targets.json',
      '--json',
    ]);
    assert.equal(proved.status, 0, proved.stderr || proved.stdout);
    const provedReport = JSON.parse(proved.stdout);
    assert.equal(provedReport.summary.ready_count, 0);
    assert.equal(provedReport.summary.proved_count, 1);
    assert.equal(provedReport.targets[0].proof_completion.status, 'proved');
    assert.equal(provedReport.inputs.proof_target_registry_status, 'loaded');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness fails closed on malformed proof target registries', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-registry-invalid-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt({ 'affiliate-conversion': 'fresh' }));
    writeFileSync(join(root, 'status.txt'), '');
    writeProofTargetRegistry(root, {
      targets: [
        {
          id: 'not-a-known-target',
          proof_receipts: ['local/tmp/proof.json'],
        },
      ],
    });

    const result = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'affiliate-handoff-policy',
      '--proof-targets',
      '.agent/meta/proof-readiness-targets.json',
      '--json',
    ]);
    assert.equal(result.status, 2);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.inputs.proof_target_registry_status, 'invalid');
    assert.deepEqual(report.registry_issues.map((item) => item.code), ['proof-target-registry-target-unknown']);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness rejects unknown targets before running checks', () => {
  const result = runReadiness(['--target', 'not-real', '--json']);
  assert.equal(result.status, 2);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.argument_issues[0].code, 'argument-invalid');
});
