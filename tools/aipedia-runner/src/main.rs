use anyhow::{bail, Context, Result};
use chrono::Utc;
use clap::{Parser, Subcommand};
use serde::{Deserialize, Serialize};
use std::collections::{BTreeMap, BTreeSet};
use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::process::{Command, ExitStatus, Stdio};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::OnceLock;
use std::time::Instant;

static INTERRUPTED: AtomicBool = AtomicBool::new(false);
static INTERRUPT_HANDLER_INSTALL: OnceLock<std::result::Result<(), String>> = OnceLock::new();

#[derive(Parser, Debug)]
#[command(name = "aipedia-runner")]
#[command(about = "Rust orchestrator for AiPedia repeatable workflows")]
struct Cli {
    #[command(subcommand)]
    command: Commands,

    #[arg(long, global = true, default_value = ".")]
    project_dir: PathBuf,

    #[arg(long, global = true)]
    dry_run: bool,
}

#[derive(Subcommand, Debug)]
enum Commands {
    /// Plan the next tool refresh batch and write local runner artifacts.
    Plan(ToolRefreshArgs),
    /// Generate route QA args from a saved planner JSON.
    RouteArgs(RouteArgs),
    /// Run ordered closeout gates from a saved planner JSON.
    Closeout(CloseoutArgs),
    /// Plan and optionally run closeout gates for a tool refresh batch.
    Run(RunArgs),
    /// Plan the next non-tool page refresh batch and write local runner artifacts.
    PagePlan(PageRefreshArgs),
    /// Summarize worker reports from a saved page refresh plan.
    PageReports(PageReportsArgs),
    /// Run ordered closeout gates from a saved page refresh planner JSON.
    PageCloseout(PageCloseoutArgs),
    /// Plan and optionally run closeout gates for a page refresh batch.
    PageRun(PageRunArgs),
    /// Plan affiliate conversion clusters and write local runner artifacts.
    AffiliatePlan(AffiliatePlanArgs),
    /// Summarize affiliate conversion worker reports from a saved plan.
    AffiliateReports(AffiliateReportsArgs),
    /// Write a strict-gated affiliate conversion implementation handoff.
    AffiliateHandoff(AffiliateHandoffArgs),
    /// Write a generic agent task-DAG plan around evidence, score, impact, and memory commands.
    AgentPlan(AgentPlanArgs),
    /// Write and validate a runner-scoped pause receipt through the shared Node pause tool.
    Pause(PauseArgs),
}

#[derive(Parser, Debug, Clone)]
struct ToolRefreshArgs {
    #[arg(long, default_value_t = 60)]
    limit: usize,
    #[arg(long, default_value_t = 6)]
    workers: usize,
    #[arg(long, default_value_t = 10)]
    tools_per_worker: usize,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/tool-refresh-batch.json"
    )]
    out: PathBuf,
    #[arg(long, default_value = "local/tmp/aipedia-runner/workers")]
    worker_dir: PathBuf,
    #[arg(long, default_value = "local/tmp/aipedia-runner/route-qa-args.txt")]
    route_args_out: PathBuf,
}

#[derive(Parser, Debug)]
struct RouteArgs {
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/tool-refresh-batch.json"
    )]
    plan: PathBuf,
    #[arg(long, default_value = "local/tmp/aipedia-runner/route-qa-args.txt")]
    out: PathBuf,
}

#[derive(Parser, Debug)]
struct CloseoutArgs {
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/tool-refresh-batch.json"
    )]
    plan: PathBuf,
    #[arg(long, default_value = "local/tmp/aipedia-runner/route-qa-args.txt")]
    route_args: PathBuf,
    #[arg(long, default_value = "local/tmp/aipedia-runner/receipts")]
    receipt_dir: PathBuf,
    #[arg(long)]
    skip_build: bool,
    #[arg(long)]
    skip_route_qa: bool,
}

#[derive(Parser, Debug)]
struct RunArgs {
    #[command(flatten)]
    plan: ToolRefreshArgs,
    #[arg(long)]
    closeout: bool,
    #[arg(long)]
    skip_build: bool,
    #[arg(long)]
    skip_route_qa: bool,
}

#[derive(Parser, Debug, Clone)]
struct PageRefreshArgs {
    #[arg(long, default_value_t = 24)]
    limit: usize,
    #[arg(long, default_value_t = 6)]
    workers: usize,
    #[arg(long, default_value_t = 4)]
    pages_per_worker: usize,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json"
    )]
    out: PathBuf,
    #[arg(long, default_value = "local/tmp/aipedia-runner/page-refresh/workers")]
    worker_dir: PathBuf,
    #[arg(long, default_value = "local/tmp/aipedia-runner/page-refresh/reports")]
    report_dir: PathBuf,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/page-refresh/content-route-qa-args.txt"
    )]
    content_route_args_out: PathBuf,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/page-refresh/interactive-route-qa-args.txt"
    )]
    interactive_route_args_out: PathBuf,
}

#[derive(Parser, Debug)]
struct PageReportsArgs {
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json"
    )]
    plan: PathBuf,
    #[arg(long, default_value = "local/tmp/aipedia-runner/page-refresh/reports")]
    report_dir: PathBuf,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/page-refresh/page-report-summary.md"
    )]
    out: PathBuf,
    #[arg(long)]
    strict: bool,
}

#[derive(Parser, Debug)]
struct PageCloseoutArgs {
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json"
    )]
    plan: PathBuf,
    #[arg(long, default_value = "local/tmp/aipedia-runner/page-refresh/reports")]
    report_dir: PathBuf,
    #[arg(long, default_value = "local/tmp/aipedia-runner/page-refresh/receipts")]
    receipt_dir: PathBuf,
    #[arg(long)]
    skip_build: bool,
    #[arg(long)]
    skip_route_qa: bool,
    #[arg(long)]
    skip_source_health: bool,
    #[arg(long)]
    strict_reports: bool,
}

#[derive(Parser, Debug)]
struct PageRunArgs {
    #[command(flatten)]
    plan: PageRefreshArgs,
    #[arg(long)]
    closeout: bool,
    #[arg(long)]
    skip_build: bool,
    #[arg(long)]
    skip_route_qa: bool,
    #[arg(long)]
    skip_source_health: bool,
    #[arg(long)]
    strict_reports: bool,
}

#[derive(Parser, Debug, Clone)]
struct AffiliatePlanArgs {
    #[arg(long, default_value_t = 6)]
    limit: usize,
    #[arg(long, default_value_t = 3)]
    workers: usize,
    #[arg(long, default_value_t = 2)]
    clusters_per_worker: usize,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/affiliate-conversion/affiliate-conversion-plan.json"
    )]
    out: PathBuf,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/affiliate-conversion/workers"
    )]
    worker_dir: PathBuf,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/affiliate-conversion/reports"
    )]
    report_dir: PathBuf,
}

#[derive(Parser, Debug)]
struct AffiliateReportsArgs {
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/affiliate-conversion/affiliate-conversion-plan.json"
    )]
    plan: PathBuf,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/affiliate-conversion/reports"
    )]
    report_dir: PathBuf,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/affiliate-conversion/affiliate-report-summary.md"
    )]
    out: PathBuf,
    #[arg(long)]
    strict: bool,
}

#[derive(Parser, Debug)]
struct AffiliateHandoffArgs {
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/affiliate-conversion/affiliate-conversion-plan.json"
    )]
    plan: PathBuf,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/affiliate-conversion/reports"
    )]
    report_dir: PathBuf,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/affiliate-conversion/affiliate-report-summary.md"
    )]
    report_summary: PathBuf,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/affiliate-conversion/affiliate-implementation-handoff.md"
    )]
    out: PathBuf,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/affiliate-conversion/affiliate-implementation-handoff.json"
    )]
    json_out: PathBuf,
}

#[derive(Parser, Debug)]
struct AgentPlanArgs {
    #[arg(long)]
    route: String,
    #[arg(
        long,
        default_value = "local/tmp/aipedia-runner/agent-dag/agent-task-graph.json"
    )]
    out: PathBuf,
    #[arg(long, default_value = "local/tmp/agent-memory.jsonl")]
    memory_out: PathBuf,
    #[arg(long)]
    current_date: Option<String>,
}

#[derive(Parser, Debug)]
struct PauseArgs {
    #[arg(long)]
    safe_resume_step: String,
    #[arg(long)]
    in_progress_step: String,
    #[arg(long, default_value = "handoff")]
    reason: String,
    #[arg(long)]
    goal_id: Option<String>,
    #[arg(long)]
    run_id: Option<String>,
    #[arg(long)]
    source_cutoff: Option<String>,
    #[arg(long)]
    out: Option<PathBuf>,
    #[arg(long)]
    next_command: Vec<String>,
    #[arg(long)]
    validation_done: Vec<String>,
    #[arg(long)]
    validation_pending: Vec<String>,
    #[arg(long)]
    must_not_repeat: Vec<String>,
    #[arg(long)]
    observed_dirty_before_agent: Vec<String>,
    #[arg(long)]
    open_question: Vec<String>,
    #[arg(long)]
    blocked_on: Vec<String>,
}

#[derive(Debug, Deserialize)]
struct Plan {
    batch: Vec<Tool>,
    agent_briefs: Option<AgentBriefs>,
}

#[derive(Debug, Deserialize)]
struct Tool {
    #[allow(dead_code)]
    slug: String,
    path: String,
    route: String,
    category_route: Option<String>,
    #[serde(default)]
    source_ids: Vec<String>,
}

#[derive(Debug, Deserialize)]
struct AgentBriefs {
    worker_briefs: Vec<WorkerBrief>,
    integrator_brief: Option<IntegratorBrief>,
}

#[derive(Debug, Deserialize)]
struct WorkerBrief {
    id: String,
    title: String,
    prompt: String,
    #[serde(default)]
    report_path: Option<String>,
}

#[derive(Debug, Deserialize)]
struct IntegratorBrief {
    prompt: String,
}

#[derive(Debug)]
struct CommandResult {
    label: String,
    status: Option<i32>,
    interrupted: bool,
    duration_ms: u128,
    details_path: Option<PathBuf>,
}

#[derive(Debug, Serialize)]
struct CloseoutReceiptJson {
    schema_version: String,
    workflow: String,
    status: String,
    generated_at: String,
    goal_id: String,
    run_id: String,
    residual_risks: Vec<String>,
    next_actions: Vec<String>,
    trace: CloseoutTrace,
    artifact_refs: Vec<CloseoutArtifactRef>,
    current_date: Option<String>,
    elapsed_ms: u64,
    plan: String,
    route_args: Option<String>,
    report_dir: Option<String>,
    report_summary: Option<String>,
    markdown_receipt: String,
    changed_routes: Vec<String>,
    source_ids: Vec<String>,
    widths: Vec<u16>,
    commands: Vec<CloseoutReceiptCommand>,
    superseded_failures: Vec<SupersededFailureReceipt>,
    system_progress: Option<serde_json::Value>,
    input_freshness: Option<serde_json::Value>,
}

#[derive(Debug, Serialize)]
struct CloseoutTrace {
    trace_id: String,
    span_id: String,
    parent_span_id: String,
    name: String,
    started_at: String,
    ended_at: String,
    duration_ms: u64,
}

#[derive(Debug, Serialize)]
struct CloseoutArtifactRef {
    role: String,
    kind: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    path: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    description: Option<String>,
}

#[derive(Debug, Serialize)]
struct CloseoutReceiptCommand {
    label: String,
    status: Option<i32>,
    interrupted: bool,
    elapsed_ms: u64,
    details_path: Option<String>,
}

#[derive(Debug, Serialize)]
struct SupersededFailureReceipt {
    receipt: String,
    superseded_by: String,
    status: String,
    generated_at: Option<String>,
    failed_command: Option<String>,
    failed_status: Option<i32>,
    elapsed_ms: Option<u64>,
}

#[derive(Debug, Deserialize)]
struct PagePlan {
    current_date: String,
    batch: Vec<Page>,
    commands: PageCommands,
    agent_briefs: Option<AgentBriefs>,
}

#[derive(Debug, Deserialize)]
struct AffiliatePlan {
    current_date: String,
    clusters: Vec<AffiliateCluster>,
    #[serde(default)]
    commands: Option<AffiliateCommands>,
    agent_briefs: Option<AgentBriefs>,
}

#[derive(Debug, Deserialize)]
struct AffiliateCluster {
    id: String,
    primary_tool: String,
    title: String,
    #[serde(default)]
    category: String,
    #[serde(default)]
    source_file: String,
    monetization_state: String,
    #[serde(default)]
    affiliate_status: String,
    #[serde(default)]
    affiliate_network: String,
    #[serde(default)]
    buyer_job: String,
    #[serde(default)]
    duplicate_intent_risk: String,
    #[serde(default)]
    route_qa_risk: String,
    #[serde(default)]
    affected_routes: Vec<String>,
    #[serde(default)]
    parent_surfaces: Vec<String>,
}

#[derive(Debug, Deserialize)]
struct AffiliateCommands {
    #[serde(default)]
    cheap_gates: Vec<String>,
    #[serde(default)]
    future_rendered_closeout: Vec<String>,
}

#[derive(Debug, Deserialize)]
struct Page {
    route: String,
    #[serde(rename = "type")]
    page_type: String,
    path: String,
    last_updated: String,
    route_qa_risk: String,
    #[serde(default)]
    source_ids: Vec<String>,
}

#[derive(Debug, Deserialize)]
struct PageCommands {
    #[serde(default)]
    content_routes: Vec<String>,
    #[serde(default)]
    interactive_routes: Vec<String>,
    #[serde(default)]
    route_qa_args: String,
    #[serde(default)]
    interactive_route_qa_args: String,
}

#[derive(Debug, Deserialize)]
struct WorkerReport {
    shard_id: String,
    #[serde(default)]
    elapsed_seconds: Option<f64>,
    #[serde(default)]
    changed_paths: Vec<String>,
    #[serde(default)]
    pages: Vec<WorkerReportPage>,
    #[serde(default)]
    checks: Vec<WorkerReportCheck>,
    #[serde(default)]
    optimization_notes: Vec<String>,
}

#[derive(Debug, Deserialize)]
struct WorkerReportCheck {
    command: String,
    status: String,
    #[serde(default)]
    notes: String,
}

#[derive(Debug, Deserialize)]
struct WorkerReportPage {
    route: String,
    path: String,
    status: String,
    #[serde(default)]
    elapsed_seconds: Option<f64>,
    #[serde(default)]
    source_urls: Vec<String>,
    #[serde(default)]
    source_confidence: Vec<String>,
    #[serde(default)]
    caveats: Vec<String>,
    #[serde(default)]
    parent_surfaces: Vec<String>,
    #[serde(default)]
    route_qa_risks: Vec<String>,
    #[serde(default)]
    notes: String,
}

#[derive(Debug)]
struct ReportSummary {
    expected: usize,
    parsed: Vec<WorkerReport>,
    missing: Vec<String>,
    invalid: Vec<(String, String)>,
}

#[derive(Debug, Deserialize)]
struct AffiliateWorkerReport {
    worker_id: String,
    #[serde(default)]
    elapsed_seconds: Option<f64>,
    #[serde(default)]
    owned_paths: Vec<String>,
    #[serde(default)]
    clusters: Vec<AffiliateReportCluster>,
    #[serde(default)]
    handoff_notes: String,
}

#[derive(Debug, Deserialize)]
struct AffiliateReportCluster {
    id: String,
    primary_tool: String,
    #[serde(default)]
    status: String,
    #[serde(default)]
    source_urls: Vec<String>,
    #[serde(default)]
    claim_receipts: Vec<AffiliateClaimReceipt>,
    #[serde(default)]
    commercial_cta_notes: Vec<String>,
    #[serde(default)]
    parent_surface_notes: Vec<String>,
    #[serde(default)]
    duplicate_intent_notes: Vec<String>,
    #[serde(default)]
    route_qa_risks: Vec<String>,
    #[serde(default)]
    checks: Vec<WorkerReportCheck>,
    #[serde(default)]
    handoff_notes: String,
}

#[derive(Debug, Deserialize)]
struct AffiliateClaimReceipt {
    #[serde(default)]
    claim: String,
    #[serde(default)]
    path: String,
    #[serde(default)]
    source_url: String,
    #[serde(default)]
    verified_at: String,
    #[serde(default)]
    confidence: String,
    #[serde(default)]
    query: String,
    #[serde(default)]
    caveat: String,
}

#[derive(Debug)]
struct AffiliateReportSummary {
    expected: usize,
    parsed: Vec<AffiliateWorkerReport>,
    missing: Vec<String>,
    invalid: Vec<(String, String)>,
    validation_issues: Vec<String>,
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    let project_dir = fs::canonicalize(&cli.project_dir).with_context(|| {
        format!(
            "could not resolve project dir {}",
            cli.project_dir.display()
        )
    })?;

    match cli.command {
        Commands::Plan(args) => plan_tool_refresh(&project_dir, &args, cli.dry_run),
        Commands::RouteArgs(args) => {
            let plan_path = resolve_project_path(&project_dir, &args.plan);
            let out_path = resolve_project_path(&project_dir, &args.out);
            let plan = read_plan(&plan_path)?;
            write_route_args(&project_dir, &plan, &out_path)?;
            println!(
                "Wrote route QA args to {}",
                display_path(&project_dir, &out_path)
            );
            Ok(())
        }
        Commands::Closeout(args) => closeout(&project_dir, &args, cli.dry_run),
        Commands::Run(args) => {
            plan_tool_refresh(&project_dir, &args.plan, cli.dry_run)?;
            if args.closeout {
                closeout(
                    &project_dir,
                    &CloseoutArgs {
                        plan: args.plan.out,
                        route_args: args.plan.route_args_out,
                        receipt_dir: PathBuf::from("local/tmp/aipedia-runner/receipts"),
                        skip_build: args.skip_build,
                        skip_route_qa: args.skip_route_qa,
                    },
                    cli.dry_run,
                )?;
            }
            Ok(())
        }
        Commands::PagePlan(args) => plan_page_refresh(&project_dir, &args, cli.dry_run),
        Commands::PageReports(args) => {
            let plan_path = resolve_project_path(&project_dir, &args.plan);
            let report_dir = resolve_project_path(&project_dir, &args.report_dir);
            let out_path = resolve_project_path(&project_dir, &args.out);
            let plan: PagePlan = read_json(&plan_path)?;
            let summary = read_page_reports(&project_dir, &plan, &report_dir, args.strict)?;
            write_page_report_summary(&project_dir, &plan, &summary, &out_path)?;
            println!(
                "Worker report summary: {}",
                display_path(&project_dir, &out_path)
            );
            Ok(())
        }
        Commands::PageCloseout(args) => page_closeout(&project_dir, &args, cli.dry_run),
        Commands::PageRun(args) => {
            plan_page_refresh(&project_dir, &args.plan, cli.dry_run)?;
            if args.closeout {
                page_closeout(
                    &project_dir,
                    &PageCloseoutArgs {
                        plan: args.plan.out,
                        report_dir: args.plan.report_dir,
                        receipt_dir: PathBuf::from(
                            "local/tmp/aipedia-runner/page-refresh/receipts",
                        ),
                        skip_build: args.skip_build,
                        skip_route_qa: args.skip_route_qa,
                        skip_source_health: args.skip_source_health,
                        strict_reports: args.strict_reports,
                    },
                    cli.dry_run,
                )?;
            }
            Ok(())
        }
        Commands::AffiliatePlan(args) => {
            plan_affiliate_conversion(&project_dir, &args, cli.dry_run)
        }
        Commands::AffiliateReports(args) => {
            let plan_path = resolve_project_path(&project_dir, &args.plan);
            let report_dir = resolve_project_path(&project_dir, &args.report_dir);
            let out_path = resolve_project_path(&project_dir, &args.out);
            let plan: AffiliatePlan = read_json(&plan_path)?;
            let summary = read_affiliate_reports(&project_dir, &plan, &report_dir, args.strict)?;
            write_affiliate_report_summary(&project_dir, &plan, &summary, &out_path)?;
            Ok(())
        }
        Commands::AffiliateHandoff(args) => write_affiliate_handoff_command(&project_dir, &args),
        Commands::AgentPlan(args) => write_agent_task_graph(&project_dir, &args, cli.dry_run),
        Commands::Pause(args) => write_runner_pause_receipt(&project_dir, &args, cli.dry_run),
    }
}

fn write_runner_pause_receipt(project_dir: &Path, args: &PauseArgs, dry_run: bool) -> Result<()> {
    let generated_at = Utc::now().to_rfc3339();
    let out_path = runner_pause_out_path(project_dir, args);
    let out_display = display_path(project_dir, &out_path);
    let goal_id = args.goal_id.clone().unwrap_or_else(closeout_goal_id);
    let run_id = args
        .run_id
        .clone()
        .unwrap_or_else(|| closeout_run_id("runner-pause", &generated_at));
    let source_cutoff = args
        .source_cutoff
        .clone()
        .or_else(|| closeout_env("AIPEDIA_CURRENT_DATE"))
        .unwrap_or_else(|| Utc::now().date_naive().to_string());
    let write_args = runner_pause_write_args(args, &goal_id, &run_id, &source_cutoff, &out_display);
    let validate_args = runner_pause_validate_args(&out_display);

    if dry_run {
        println!("dry-run: npm {}", write_args.join(" "));
        println!("dry-run: npm {}", validate_args.join(" "));
        return Ok(());
    }

    ensure_parent(&out_path)?;
    let write_output = Command::new(npm_bin())
        .args(&write_args)
        .current_dir(project_dir)
        .output()
        .context("failed to run agent pause receipt writer")?;
    std::io::stdout().write_all(&write_output.stdout).ok();
    std::io::stderr().write_all(&write_output.stderr).ok();
    if !write_output.status.success() {
        bail!(
            "pause receipt writer failed with status {}",
            status_text(write_output.status)
        );
    }
    let write_report: serde_json::Value = serde_json::from_slice(&write_output.stdout)
        .context("pause receipt writer did not emit parseable JSON")?;
    if write_report
        .get("validation")
        .and_then(|value| value.get("ok"))
        .and_then(|value| value.as_bool())
        != Some(true)
    {
        bail!("pause receipt writer emitted a receipt with validation issues");
    }

    let validate_output = Command::new(npm_bin())
        .args(&validate_args)
        .current_dir(project_dir)
        .output()
        .context("failed to run agent pause receipt validator")?;
    std::io::stdout().write_all(&validate_output.stdout).ok();
    std::io::stderr().write_all(&validate_output.stderr).ok();
    if !validate_output.status.success() {
        bail!(
            "pause receipt validation failed with status {}",
            status_text(validate_output.status)
        );
    }

    println!("Runner pause receipt: {}", out_display);
    Ok(())
}

fn runner_pause_out_path(project_dir: &Path, args: &PauseArgs) -> PathBuf {
    args.out
        .as_ref()
        .map(|path| resolve_project_path(project_dir, path))
        .unwrap_or_else(|| {
            resolve_project_path(
                project_dir,
                &PathBuf::from(format!(
                    "local/tmp/aipedia-runner/pauses/{}-runner-pause-receipt.json",
                    Utc::now().format("%Y-%m-%dT%H-%M-%S-%3fZ")
                )),
            )
        })
}

fn runner_pause_write_args(
    args: &PauseArgs,
    goal_id: &str,
    run_id: &str,
    source_cutoff: &str,
    out_display: &str,
) -> Vec<String> {
    let mut command_args = vec![
        "--silent".to_string(),
        "run".to_string(),
        "agent:pause-receipt".to_string(),
        "--".to_string(),
        "--goal-id".to_string(),
        goal_id.to_string(),
        "--run-id".to_string(),
        run_id.to_string(),
        "--reason".to_string(),
        args.reason.clone(),
        "--safe-resume-step".to_string(),
        args.safe_resume_step.clone(),
        "--in-progress-step".to_string(),
        args.in_progress_step.clone(),
        "--source-cutoff".to_string(),
        source_cutoff.to_string(),
        "--out".to_string(),
        out_display.to_string(),
        "--json".to_string(),
    ];
    append_repeated(&mut command_args, "--next-command", &args.next_command);
    append_repeated(
        &mut command_args,
        "--validation-done",
        &args.validation_done,
    );
    append_repeated(
        &mut command_args,
        "--validation-pending",
        &args.validation_pending,
    );
    append_repeated(
        &mut command_args,
        "--must-not-repeat",
        &args.must_not_repeat,
    );
    append_repeated(
        &mut command_args,
        "--observed-dirty-before-agent",
        &args.observed_dirty_before_agent,
    );
    append_repeated(&mut command_args, "--open-question", &args.open_question);
    append_repeated(&mut command_args, "--blocked-on", &args.blocked_on);
    command_args
}

fn runner_pause_validate_args(out_display: &str) -> Vec<String> {
    vec![
        "--silent".to_string(),
        "run".to_string(),
        "agent:pause-receipt".to_string(),
        "--".to_string(),
        "--validate".to_string(),
        out_display.to_string(),
        "--json".to_string(),
    ]
}

fn append_repeated(command_args: &mut Vec<String>, flag: &str, values: &[String]) {
    for value in values {
        if value.trim().is_empty() {
            continue;
        }
        command_args.push(flag.to_string());
        command_args.push(value.to_string());
    }
}

fn write_interrupted_runner_pause_receipt(
    project_dir: &Path,
    workflow: &str,
    label: &str,
    dry_run: bool,
) -> Result<Option<String>> {
    let generated_at = Utc::now();
    let workflow_slug = workflow.replace('_', "-");
    let out = PathBuf::from(format!(
        "local/tmp/aipedia-runner/pauses/{}-{}-interrupted-pause.json",
        generated_at.format("%Y-%m-%dT%H-%M-%S-%3fZ"),
        workflow_slug
    ));
    let args = interrupted_runner_pause_args(workflow, label, &generated_at.to_rfc3339(), out);
    let out_path = runner_pause_out_path(project_dir, &args);
    let out_display = display_path(project_dir, &out_path);
    write_runner_pause_receipt(project_dir, &args, dry_run)?;
    Ok(Some(out_display))
}

fn interrupted_runner_pause_args(
    workflow: &str,
    label: &str,
    generated_at: &str,
    out: PathBuf,
) -> PauseArgs {
    PauseArgs {
        safe_resume_step: format!(
            "Read this pause receipt, inspect git status, then decide whether to rerun the interrupted {workflow} command `{label}`."
        ),
        in_progress_step: format!("Runner {workflow} command `{label}` was interrupted."),
        reason: "user".to_string(),
        goal_id: Some(closeout_goal_id()),
        run_id: Some(interrupted_pause_run_id(workflow, generated_at)),
        source_cutoff: closeout_env("AIPEDIA_CURRENT_DATE")
            .or_else(|| Some(Utc::now().date_naive().to_string())),
        out: Some(out),
        next_command: vec![workflow_resume_command(workflow)],
        validation_done: vec![format!("Detected interrupted runner command: {label}.")],
        validation_pending: vec![
            "Review partial command output and any closeout receipt before retrying.".to_string(),
        ],
        must_not_repeat: vec!["Do not assume the interrupted command completed.".to_string()],
        observed_dirty_before_agent: closeout_list("AIPEDIA_OBSERVED_DIRTY_BEFORE_AGENT"),
        open_question: Vec::new(),
        blocked_on: vec![format!("Interrupted runner command: {label}.")],
    }
}

fn interrupted_pause_run_id(workflow: &str, generated_at: &str) -> String {
    closeout_env("AIPEDIA_RUN_ID")
        .map(|run_id| format!("{run_id}:interrupted-pause"))
        .unwrap_or_else(|| format!("{workflow}:interrupted-pause:{generated_at}"))
}

fn workflow_resume_command(workflow: &str) -> String {
    match workflow {
        "tool-refresh" => "npm run runner:tool-refresh:closeout".to_string(),
        "page-refresh" => "npm run runner:page-refresh:closeout".to_string(),
        _ => format!("Rerun the interrupted {workflow} runner command after review."),
    }
}

fn write_agent_task_graph(project_dir: &Path, args: &AgentPlanArgs, dry_run: bool) -> Result<()> {
    if args.route.trim().is_empty() {
        bail!("--route is required");
    }
    let out_path = resolve_project_path(project_dir, &args.out);
    let current_date = args
        .current_date
        .clone()
        .unwrap_or_else(|| Utc::now().date_naive().to_string());
    let route = args.route.trim();
    let memory_out = display_path(
        project_dir,
        &resolve_project_path(project_dir, &args.memory_out),
    );
    let graph = serde_json::json!({
        "schema_version": "aipedia.agent-task-dag.v1",
        "generated_at": Utc::now().to_rfc3339(),
        "current_date": current_date,
        "route": route,
        "parallel": [
            {
                "id": "evidence",
                "kind": "read_only_signal",
                "command": "npm",
                "args": ["run", "--silent", "agent:evidence", "--", "--route", route, "--current-date", current_date, "--json"]
            },
            {
                "id": "impact",
                "kind": "read_only_signal",
                "command": "npm",
                "args": ["run", "--silent", "agent:impact", "--", "--route", route, "--json"]
            },
            {
                "id": "score",
                "kind": "read_only_signal",
                "command": "npm",
                "args": ["run", "--silent", "agent:score", "--", "--route", route, "--current-date", current_date, "--json"]
            }
        ],
        "join": {
            "id": "memory_record",
            "kind": "jsonl_receipt",
            "command": "npm",
            "args": ["run", "--silent", "agent:memory:record", "--", "--route", route, "--current-date", current_date, "--out", memory_out, "--json"]
        },
        "then": [
            "codex_synthesis",
            "patch_or_report",
            "focused_validation",
            "update_status_docs"
        ],
        "gpu_policy": {
            "cupy": "defer_until_measured_cpu_retrieval_rerank_or_dedupe_hotspot",
            "current_vector_layer": "cpu-lexical-hash-v1"
        },
        "notes": [
            "This is a contract artifact. It does not execute tasks yet.",
            "Use the Node CLIs as the stable evidence and memory boundary before adding Rust execution."
        ]
    });

    if dry_run {
        println!(
            "dry-run: would write {}",
            display_path(project_dir, &out_path)
        );
        println!("{}", serde_json::to_string_pretty(&graph)?);
        return Ok(());
    }

    ensure_parent(&out_path)?;
    fs::write(
        &out_path,
        format!("{}\n", serde_json::to_string_pretty(&graph)?),
    )
    .with_context(|| format!("could not write {}", out_path.display()))?;
    println!("Agent task graph: {}", display_path(project_dir, &out_path));
    Ok(())
}

fn plan_tool_refresh(project_dir: &Path, args: &ToolRefreshArgs, dry_run: bool) -> Result<()> {
    let out_path = resolve_project_path(project_dir, &args.out);
    let worker_dir = resolve_project_path(project_dir, &args.worker_dir);
    let route_args_out = resolve_project_path(project_dir, &args.route_args_out);
    ensure_parent(&out_path)?;
    fs::create_dir_all(&worker_dir)
        .with_context(|| format!("could not create {}", worker_dir.display()))?;

    let planner_args = vec![
        "run".to_string(),
        "--silent".to_string(),
        "tool:refresh:batch".to_string(),
        "--".to_string(),
        "--limit".to_string(),
        args.limit.to_string(),
        "--max-workers".to_string(),
        args.workers.to_string(),
        "--tools-per-worker".to_string(),
        args.tools_per_worker.to_string(),
        "--fail-on-stale-inputs".to_string(),
        "--json".to_string(),
    ];

    if dry_run {
        println!("dry-run: npm {}", planner_args.join(" "));
        return Ok(());
    }

    let output = Command::new(npm_bin())
        .args(&planner_args)
        .current_dir(project_dir)
        .output()
        .context("failed to run tool refresh planner")?;

    if !output.status.success() {
        std::io::stderr().write_all(&output.stderr).ok();
        bail!("planner failed with status {}", status_text(output.status));
    }

    fs::write(&out_path, &output.stdout)
        .with_context(|| format!("could not write {}", out_path.display()))?;
    let plan: Plan = serde_json::from_slice(&output.stdout).with_context(|| {
        format!(
            "planner output was not valid JSON at {}",
            out_path.display()
        )
    })?;

    write_worker_prompts(&plan, &worker_dir)?;
    write_route_args(project_dir, &plan, &route_args_out)?;

    println!("Planned {} tool(s)", plan.batch.len());
    println!("Plan: {}", display_path(project_dir, &out_path));
    println!("Worker prompts: {}", display_path(project_dir, &worker_dir));
    println!(
        "Route QA args: {}",
        display_path(project_dir, &route_args_out)
    );
    Ok(())
}

fn plan_page_refresh(project_dir: &Path, args: &PageRefreshArgs, dry_run: bool) -> Result<()> {
    let out_path = resolve_project_path(project_dir, &args.out);
    let worker_dir = resolve_project_path(project_dir, &args.worker_dir);
    let report_dir = resolve_project_path(project_dir, &args.report_dir);
    let content_route_args_out = resolve_project_path(project_dir, &args.content_route_args_out);
    let interactive_route_args_out =
        resolve_project_path(project_dir, &args.interactive_route_args_out);
    ensure_parent(&out_path)?;
    fs::create_dir_all(&worker_dir)
        .with_context(|| format!("could not create {}", worker_dir.display()))?;
    fs::create_dir_all(&report_dir)
        .with_context(|| format!("could not create {}", report_dir.display()))?;

    let planner_args = vec![
        "run".to_string(),
        "--silent".to_string(),
        "page:refresh:batch".to_string(),
        "--".to_string(),
        "--limit".to_string(),
        args.limit.to_string(),
        "--max-workers".to_string(),
        args.workers.to_string(),
        "--pages-per-worker".to_string(),
        args.pages_per_worker.to_string(),
        "--write-agent-prompts".to_string(),
        display_path(project_dir, &worker_dir),
        "--report-dir".to_string(),
        display_path(project_dir, &report_dir),
        "--write-report-scaffolds".to_string(),
        "--fail-on-stale-ledger".to_string(),
        "--json".to_string(),
    ];

    if dry_run {
        println!("dry-run: npm {}", planner_args.join(" "));
        return Ok(());
    }

    let output = Command::new(npm_bin())
        .args(&planner_args)
        .current_dir(project_dir)
        .output()
        .context("failed to run page refresh planner")?;

    if !output.status.success() {
        std::io::stderr().write_all(&output.stderr).ok();
        bail!(
            "page planner failed with status {}",
            status_text(output.status)
        );
    }

    fs::write(&out_path, &output.stdout)
        .with_context(|| format!("could not write {}", out_path.display()))?;
    let plan: PagePlan = serde_json::from_slice(&output.stdout).with_context(|| {
        format!(
            "page planner output was not valid JSON at {}",
            out_path.display()
        )
    })?;

    validate_page_plan_artifacts(&plan, &worker_dir, &report_dir)?;
    write_page_route_args(&plan, &content_route_args_out, &interactive_route_args_out)?;

    println!("Planned {} page(s)", plan.batch.len());
    println!("Plan: {}", display_path(project_dir, &out_path));
    println!("Worker prompts: {}", display_path(project_dir, &worker_dir));
    println!("Worker reports: {}", display_path(project_dir, &report_dir));
    println!(
        "Content route QA args: {}",
        display_path(project_dir, &content_route_args_out)
    );
    println!(
        "Interactive route QA args: {}",
        display_path(project_dir, &interactive_route_args_out)
    );
    Ok(())
}

fn plan_affiliate_conversion(
    project_dir: &Path,
    args: &AffiliatePlanArgs,
    dry_run: bool,
) -> Result<()> {
    let out_path = resolve_project_path(project_dir, &args.out);
    let worker_dir = resolve_project_path(project_dir, &args.worker_dir);
    let report_dir = resolve_project_path(project_dir, &args.report_dir);
    ensure_parent(&out_path)?;
    fs::create_dir_all(&worker_dir)
        .with_context(|| format!("could not create {}", worker_dir.display()))?;
    fs::create_dir_all(&report_dir)
        .with_context(|| format!("could not create {}", report_dir.display()))?;

    let planner_args = vec![
        "run".to_string(),
        "--silent".to_string(),
        "affiliate:conversion:plan".to_string(),
        "--".to_string(),
        "--limit".to_string(),
        args.limit.to_string(),
        "--max-workers".to_string(),
        args.workers.to_string(),
        "--clusters-per-worker".to_string(),
        args.clusters_per_worker.to_string(),
        "--out".to_string(),
        display_path(project_dir, &out_path),
        "--worker-dir".to_string(),
        display_path(project_dir, &worker_dir),
        "--report-dir".to_string(),
        display_path(project_dir, &report_dir),
        "--write-agent-prompts".to_string(),
        "--write-report-scaffolds".to_string(),
        "--fail-on-stale-inputs".to_string(),
        "--json".to_string(),
    ];

    if dry_run {
        println!("dry-run: npm {}", planner_args.join(" "));
        return Ok(());
    }

    let output = Command::new(npm_bin())
        .args(&planner_args)
        .current_dir(project_dir)
        .output()
        .context("failed to run affiliate conversion planner")?;

    if !output.status.success() {
        std::io::stderr().write_all(&output.stderr).ok();
        bail!(
            "affiliate conversion planner failed with status {}",
            status_text(output.status)
        );
    }

    fs::write(&out_path, &output.stdout)
        .with_context(|| format!("could not write {}", out_path.display()))?;
    let plan: AffiliatePlan = serde_json::from_slice(&output.stdout).with_context(|| {
        format!(
            "affiliate planner output was not valid JSON at {}",
            out_path.display()
        )
    })?;

    validate_affiliate_plan_artifacts(&plan, &worker_dir, &report_dir)?;

    println!(
        "Planned {} affiliate conversion cluster(s)",
        plan.clusters.len()
    );
    println!("Plan: {}", display_path(project_dir, &out_path));
    println!("Worker prompts: {}", display_path(project_dir, &worker_dir));
    println!("Worker reports: {}", display_path(project_dir, &report_dir));
    Ok(())
}

fn closeout(project_dir: &Path, args: &CloseoutArgs, dry_run: bool) -> Result<()> {
    let plan_path = resolve_project_path(project_dir, &args.plan);
    let route_args_path = resolve_project_path(project_dir, &args.route_args);
    let receipt_dir = resolve_project_path(project_dir, &args.receipt_dir);
    let plan = read_plan(&plan_path)?;
    let closeout_start = Instant::now();
    write_route_args(project_dir, &plan, &route_args_path)?;
    fs::create_dir_all(&receipt_dir)
        .with_context(|| format!("could not create {}", receipt_dir.display()))?;
    let timing_dir = receipt_dir.join("timings");
    fs::create_dir_all(&timing_dir)
        .with_context(|| format!("could not create {}", timing_dir.display()))?;
    let grouped_check_timing_path = timing_dir.join(format!(
        "{}-tool-refresh-grouped-check.json",
        Utc::now().format("%Y-%m-%dT%H-%M-%SZ")
    ));
    let route_qa_timing_path = timing_dir.join(format!(
        "{}-tool-refresh-route-qa.json",
        Utc::now().format("%Y-%m-%dT%H-%M-%SZ")
    ));

    let mut commands: Vec<(String, Vec<String>, Option<PathBuf>)> = vec![
        (
            "ledger generate".to_string(),
            vec!["run".to_string(), "ledger:pages".to_string()],
            None,
        ),
        (
            "ledger check".to_string(),
            vec!["run".to_string(), "ledger:pages:check".to_string()],
            None,
        ),
        (
            "tool refresh grouped check".to_string(),
            vec![
                "run".to_string(),
                "tool:refresh:batch:check".to_string(),
                "--".to_string(),
                "--plan".to_string(),
                display_path(project_dir, &plan_path),
                "--timing-file".to_string(),
                display_path(project_dir, &grouped_check_timing_path),
            ],
            Some(grouped_check_timing_path),
        ),
        (
            "date consistency changed".to_string(),
            vec![
                "run".to_string(),
                "audit:date-consistency".to_string(),
                "--".to_string(),
                "--changed".to_string(),
            ],
            None,
        ),
        (
            "typecheck".to_string(),
            vec!["run".to_string(), "typecheck".to_string()],
            None,
        ),
    ];

    if !args.skip_build {
        commands.push((
            "build fast".to_string(),
            vec!["run".to_string(), "build:fast".to_string()],
            None,
        ));
    }

    if !args.skip_route_qa {
        let route_args = fs::read_to_string(&route_args_path)
            .with_context(|| format!("could not read {}", route_args_path.display()))?;
        let mut qa_args = vec![
            "scripts/qa-route.mjs".to_string(),
            "--site-dir".to_string(),
            "dist-fast/client".to_string(),
            "--concurrency".to_string(),
            "6".to_string(),
        ];
        qa_args.extend(split_shell_words(&route_args));
        qa_args.extend([
            "--widths".to_string(),
            "319,360,390,430,768,1024,1366".to_string(),
            "--timing-file".to_string(),
            display_path(project_dir, &route_qa_timing_path),
        ]);
        commands.push(("route qa".to_string(), qa_args, Some(route_qa_timing_path)));
    }

    let mut results = Vec::new();
    for (label, command_args, details_path) in commands {
        if label == "route qa" {
            results.push(run_command(
                project_dir,
                &label,
                node_bin(),
                &command_args,
                details_path,
                dry_run,
            )?);
        } else {
            results.push(run_command(
                project_dir,
                &label,
                npm_bin(),
                &command_args,
                details_path,
                dry_run,
            )?);
        }

        if results.last().and_then(|result| result.status).unwrap_or(1) != 0 {
            let interrupted_pause = if results.last().is_some_and(|result| result.interrupted) {
                match write_interrupted_runner_pause_receipt(
                    project_dir,
                    "tool-refresh",
                    &label,
                    dry_run,
                ) {
                    Ok(path) => path,
                    Err(error) => {
                        eprintln!("could not write interrupted pause receipt: {error}");
                        None
                    }
                }
            } else {
                None
            };
            write_receipt(
                project_dir,
                &receipt_dir,
                &plan_path,
                &route_args_path,
                &plan,
                &results,
                false,
                closeout_start.elapsed().as_millis(),
            )?;
            if let Some(path) = interrupted_pause {
                bail!(
                    "closeout stopped after interrupted command: {}. Pause receipt: {}",
                    label,
                    path
                );
            }
            bail!("closeout stopped after failed command: {}", label);
        }
    }

    write_receipt(
        project_dir,
        &receipt_dir,
        &plan_path,
        &route_args_path,
        &plan,
        &results,
        true,
        closeout_start.elapsed().as_millis(),
    )?;
    println!("Closeout passed");
    Ok(())
}

fn page_closeout(project_dir: &Path, args: &PageCloseoutArgs, dry_run: bool) -> Result<()> {
    let plan_path = resolve_project_path(project_dir, &args.plan);
    let report_dir = resolve_project_path(project_dir, &args.report_dir);
    let receipt_dir = resolve_project_path(project_dir, &args.receipt_dir);
    let plan: PagePlan = read_json(&plan_path)?;
    let closeout_start = Instant::now();
    fs::create_dir_all(&receipt_dir)
        .with_context(|| format!("could not create {}", receipt_dir.display()))?;
    let timing_dir = receipt_dir.join("timings");
    fs::create_dir_all(&timing_dir)
        .with_context(|| format!("could not create {}", timing_dir.display()))?;

    let report_summary = read_page_reports(project_dir, &plan, &report_dir, args.strict_reports)?;
    let report_summary_path = receipt_dir.join(format!(
        "{}-page-refresh-worker-report-summary.md",
        Utc::now().format("%Y-%m-%dT%H-%M-%SZ")
    ));
    write_page_report_summary(project_dir, &plan, &report_summary, &report_summary_path)?;

    let content_route_qa_timing_path = timing_dir.join(format!(
        "{}-page-refresh-route-qa-content.json",
        Utc::now().format("%Y-%m-%dT%H-%M-%SZ")
    ));
    let interactive_route_qa_timing_path = timing_dir.join(format!(
        "{}-page-refresh-route-qa-interactive.json",
        Utc::now().format("%Y-%m-%dT%H-%M-%SZ")
    ));
    let source_health_path = timing_dir.join(format!(
        "{}-page-refresh-source-health.json",
        Utc::now().format("%Y-%m-%dT%H-%M-%SZ")
    ));

    let mut results = Vec::new();
    let mut steps: Vec<(
        String,
        String,
        Vec<String>,
        Option<PathBuf>,
        Vec<(String, String)>,
    )> = vec![
        (
            "ledger generate".to_string(),
            npm_bin().to_string(),
            vec!["run".to_string(), "ledger:pages".to_string()],
            None,
            vec![],
        ),
        (
            "ledger check".to_string(),
            npm_bin().to_string(),
            vec!["run".to_string(), "ledger:pages:check".to_string()],
            None,
            vec![],
        ),
        (
            "frontmatter changed".to_string(),
            node_bin().to_string(),
            vec![
                "scripts/check-frontmatter.mjs".to_string(),
                "--changed".to_string(),
            ],
            None,
            vec![],
        ),
        (
            "date consistency changed".to_string(),
            npm_bin().to_string(),
            vec![
                "run".to_string(),
                "audit:date-consistency".to_string(),
                "--".to_string(),
                "--changed".to_string(),
            ],
            None,
            vec![(
                "AIPEDIA_CURRENT_DATE".to_string(),
                plan.current_date.clone(),
            )],
        ),
        (
            "provenance changed".to_string(),
            npm_bin().to_string(),
            vec![
                "run".to_string(),
                "audit:provenance:changed".to_string(),
                "--".to_string(),
                "--json".to_string(),
            ],
            None,
            vec![],
        ),
        (
            "coverage quality changed".to_string(),
            npm_bin().to_string(),
            vec![
                "run".to_string(),
                "audit:coverage-quality:changed".to_string(),
            ],
            None,
            vec![(
                "AIPEDIA_CURRENT_DATE".to_string(),
                plan.current_date.clone(),
            )],
        ),
        (
            "em dash guard".to_string(),
            node_bin().to_string(),
            vec!["scripts/guard-em-dashes.mjs".to_string()],
            None,
            vec![],
        ),
        (
            "diff check".to_string(),
            git_bin().to_string(),
            vec!["diff".to_string(), "--check".to_string()],
            None,
            vec![],
        ),
    ];

    if !args.skip_source_health {
        steps.push((
            "page source health".to_string(),
            npm_bin().to_string(),
            vec![
                "run".to_string(),
                "page:source-health".to_string(),
                "--".to_string(),
                "--plan".to_string(),
                display_path(project_dir, &plan_path),
                "--out".to_string(),
                display_path(project_dir, &source_health_path),
                "--concurrency".to_string(),
                "8".to_string(),
                "--timeout-ms".to_string(),
                "8000".to_string(),
            ],
            Some(source_health_path),
            vec![],
        ));
    }

    steps.push((
        "typecheck".to_string(),
        npm_bin().to_string(),
        vec!["run".to_string(), "typecheck".to_string()],
        None,
        vec![],
    ));

    if !args.skip_build {
        steps.push((
            "build fast".to_string(),
            npm_bin().to_string(),
            vec!["run".to_string(), "build:fast".to_string()],
            None,
            vec![(
                "AIPEDIA_CURRENT_DATE".to_string(),
                plan.current_date.clone(),
            )],
        ));
    }

    if !args.skip_route_qa {
        if !plan.commands.route_qa_args.trim().is_empty() {
            let mut qa_args = vec![
                "scripts/qa-route.mjs".to_string(),
                "--site-dir".to_string(),
                "dist-fast/client".to_string(),
                "--concurrency".to_string(),
                "6".to_string(),
            ];
            qa_args.extend(split_shell_words(&plan.commands.route_qa_args));
            qa_args.extend([
                "--widths".to_string(),
                "319,360,390,430,768,1024,1366".to_string(),
                "--timing-file".to_string(),
                display_path(project_dir, &content_route_qa_timing_path),
            ]);
            steps.push((
                "content route qa".to_string(),
                node_bin().to_string(),
                qa_args,
                Some(content_route_qa_timing_path),
                vec![],
            ));
        }

        if !plan.commands.interactive_route_qa_args.trim().is_empty() {
            let mut qa_args = vec![
                "scripts/qa-route.mjs".to_string(),
                "--site-dir".to_string(),
                "dist-fast/client".to_string(),
                "--concurrency".to_string(),
                "6".to_string(),
            ];
            qa_args.extend(split_shell_words(&plan.commands.interactive_route_qa_args));
            qa_args.extend([
                "--widths".to_string(),
                "319,360,390,430,768,1024,1366".to_string(),
                "--allow-noindex".to_string(),
                "--skip-comparison-content-checks".to_string(),
                "--timing-file".to_string(),
                display_path(project_dir, &interactive_route_qa_timing_path),
            ]);
            steps.push((
                "interactive route qa".to_string(),
                node_bin().to_string(),
                qa_args,
                Some(interactive_route_qa_timing_path),
                vec![],
            ));
        }
    }

    for (label, program, command_args, details_path, env_vars) in steps {
        results.push(run_command_with_env(
            project_dir,
            &label,
            &program,
            &command_args,
            details_path,
            &env_vars,
            dry_run,
        )?);

        if results.last().and_then(|result| result.status).unwrap_or(1) != 0 {
            let interrupted_pause = if results.last().is_some_and(|result| result.interrupted) {
                match write_interrupted_runner_pause_receipt(
                    project_dir,
                    "page-refresh",
                    &label,
                    dry_run,
                ) {
                    Ok(path) => path,
                    Err(error) => {
                        eprintln!("could not write interrupted pause receipt: {error}");
                        None
                    }
                }
            } else {
                None
            };
            write_page_receipt(
                project_dir,
                &receipt_dir,
                &plan_path,
                &report_dir,
                &report_summary_path,
                &plan,
                &report_summary,
                &results,
                false,
                closeout_start.elapsed().as_millis(),
            )?;
            if let Some(path) = interrupted_pause {
                bail!(
                    "page closeout stopped after interrupted command: {}. Pause receipt: {}",
                    label,
                    path
                );
            }
            bail!("page closeout stopped after failed command: {}", label);
        }
    }

    write_page_receipt(
        project_dir,
        &receipt_dir,
        &plan_path,
        &report_dir,
        &report_summary_path,
        &plan,
        &report_summary,
        &results,
        true,
        closeout_start.elapsed().as_millis(),
    )?;
    println!("Page closeout passed");
    Ok(())
}

fn run_command(
    project_dir: &Path,
    label: &str,
    program: &str,
    args: &[String],
    details_path: Option<PathBuf>,
    dry_run: bool,
) -> Result<CommandResult> {
    run_command_with_env(
        project_dir,
        label,
        program,
        args,
        details_path,
        &[],
        dry_run,
    )
}

fn run_command_with_env(
    project_dir: &Path,
    label: &str,
    program: &str,
    args: &[String],
    details_path: Option<PathBuf>,
    env_vars: &[(String, String)],
    dry_run: bool,
) -> Result<CommandResult> {
    println!("==> {}", label);
    if dry_run {
        println!("dry-run: {} {}", program, args.join(" "));
        return Ok(CommandResult {
            label: label.to_string(),
            status: Some(0),
            interrupted: false,
            duration_ms: 0,
            details_path,
        });
    }

    ensure_interrupt_handler()?;
    INTERRUPTED.store(false, Ordering::SeqCst);
    let start = Instant::now();
    let mut command = Command::new(program);
    command
        .args(args)
        .current_dir(project_dir)
        .stdin(Stdio::inherit())
        .stdout(Stdio::inherit())
        .stderr(Stdio::inherit());
    for (key, value) in env_vars {
        command.env(key, value);
    }
    let status = command
        .status()
        .with_context(|| format!("failed to run {}", label))?;
    let interrupted = INTERRUPTED.swap(false, Ordering::SeqCst) || status_was_interrupted(status);
    let duration_ms = start.elapsed().as_millis();
    println!(
        "<== {}: {}ms status {}{}",
        label,
        duration_ms,
        status_text(status),
        if interrupted { " interrupted" } else { "" }
    );

    Ok(CommandResult {
        label: label.to_string(),
        status: status.code(),
        interrupted,
        duration_ms,
        details_path,
    })
}

fn read_plan(path: &Path) -> Result<Plan> {
    read_json(path)
}

fn read_json<T: for<'de> Deserialize<'de>>(path: &Path) -> Result<T> {
    let raw = fs::read(path).with_context(|| format!("could not read {}", path.display()))?;
    serde_json::from_slice(&raw).with_context(|| format!("could not parse JSON {}", path.display()))
}

fn write_worker_prompts(plan: &Plan, worker_dir: &Path) -> Result<()> {
    if worker_dir.exists() {
        for entry in fs::read_dir(worker_dir)? {
            let path = entry?.path();
            if path.extension().is_some_and(|ext| ext == "md") {
                fs::remove_file(path)?;
            }
        }
    }

    let Some(agent_briefs) = &plan.agent_briefs else {
        return Ok(());
    };

    for worker in &agent_briefs.worker_briefs {
        let path = worker_dir.join(format!("{}.md", worker.id));
        let content = format!("# {}\n\n{}\n", worker.title, worker.prompt);
        fs::write(&path, content).with_context(|| format!("could not write {}", path.display()))?;
    }

    if let Some(integrator) = &agent_briefs.integrator_brief {
        fs::write(
            worker_dir.join("integrator.md"),
            format!("# Integrator\n\n{}\n", integrator.prompt),
        )?;
    }

    Ok(())
}

fn write_route_args(project_dir: &Path, plan: &Plan, out_path: &Path) -> Result<()> {
    ensure_parent(out_path)?;
    let mut routes = BTreeSet::new();
    for tool in &plan.batch {
        if !tool.route.is_empty() {
            routes.insert(tool.route.clone());
        }
        if let Some(category_route) = current_category_route(project_dir, tool)? {
            if !category_route.is_empty() {
                routes.insert(category_route.clone());
            }
        } else if let Some(category_route) = &tool.category_route {
            if !category_route.is_empty() {
                routes.insert(category_route.clone());
            }
        }
    }
    routes.insert("/tools/".to_string());
    routes.insert("/categories/".to_string());

    let route_args = routes
        .into_iter()
        .map(|route| format!("--route {}", route))
        .collect::<Vec<_>>()
        .join(" ");
    fs::write(out_path, route_args)
        .with_context(|| format!("could not write {}", out_path.display()))?;
    Ok(())
}

fn validate_page_plan_artifacts(
    plan: &PagePlan,
    worker_dir: &Path,
    report_dir: &Path,
) -> Result<()> {
    let Some(agent_briefs) = &plan.agent_briefs else {
        bail!("page plan is missing agent_briefs");
    };

    for worker in &agent_briefs.worker_briefs {
        let prompt_path = worker_dir.join(format!("{}.md", worker.id));
        if !prompt_path.exists() {
            bail!("missing worker prompt {}", prompt_path.display());
        }
        let report_path = report_dir.join(format!("{}.json", worker.id));
        if !report_path.exists() {
            bail!("missing worker report scaffold {}", report_path.display());
        }
    }

    if agent_briefs.integrator_brief.is_some() {
        let integrator_path = worker_dir.join("page-refresh-integrator.md");
        let fallback_path = worker_dir.join("integrator.md");
        if !integrator_path.exists() && !fallback_path.exists() {
            bail!(
                "missing page refresh integrator prompt in {}",
                worker_dir.display()
            );
        }
    }

    Ok(())
}

fn validate_affiliate_plan_artifacts(
    plan: &AffiliatePlan,
    worker_dir: &Path,
    report_dir: &Path,
) -> Result<()> {
    let Some(agent_briefs) = &plan.agent_briefs else {
        bail!("affiliate conversion plan is missing agent_briefs");
    };

    for worker in &agent_briefs.worker_briefs {
        let prompt_path = worker_dir.join(format!("{}.md", worker.id));
        if !prompt_path.exists() {
            bail!("missing affiliate worker prompt {}", prompt_path.display());
        }
        let report_path = worker
            .report_path
            .as_ref()
            .map(PathBuf::from)
            .unwrap_or_else(|| report_dir.join(format!("{}.json", worker.id)));
        let report_path = if report_path.is_absolute() {
            report_path
        } else if report_path.starts_with(report_dir) {
            report_path
        } else {
            report_dir.join(format!("{}.json", worker.id))
        };
        if !report_path.exists() {
            bail!(
                "missing affiliate worker report scaffold {}",
                report_path.display()
            );
        }
    }

    if agent_briefs.integrator_brief.is_some() {
        let integrator_path = worker_dir.join("integrator.md");
        if !integrator_path.exists() {
            bail!(
                "missing affiliate conversion integrator prompt in {}",
                worker_dir.display()
            );
        }
    }

    Ok(())
}

fn write_page_route_args(
    plan: &PagePlan,
    content_route_args_out: &Path,
    interactive_route_args_out: &Path,
) -> Result<()> {
    ensure_parent(content_route_args_out)?;
    ensure_parent(interactive_route_args_out)?;
    fs::write(content_route_args_out, &plan.commands.route_qa_args)
        .with_context(|| format!("could not write {}", content_route_args_out.display()))?;
    fs::write(
        interactive_route_args_out,
        &plan.commands.interactive_route_qa_args,
    )
    .with_context(|| format!("could not write {}", interactive_route_args_out.display()))?;
    Ok(())
}

fn read_page_reports(
    project_dir: &Path,
    plan: &PagePlan,
    report_dir: &Path,
    strict: bool,
) -> Result<ReportSummary> {
    let worker_briefs = plan
        .agent_briefs
        .as_ref()
        .map(|briefs| briefs.worker_briefs.as_slice())
        .unwrap_or(&[]);
    let mut parsed = Vec::new();
    let mut missing = Vec::new();
    let mut invalid = Vec::new();

    for worker in worker_briefs {
        let report_path = worker
            .report_path
            .as_ref()
            .map(|path| resolve_project_path(project_dir, Path::new(path)))
            .unwrap_or_else(|| report_dir.join(format!("{}.json", worker.id)));
        if !report_path.exists() {
            missing.push(display_path(project_dir, &report_path));
            continue;
        }

        match read_json::<WorkerReport>(&report_path) {
            Ok(report) => parsed.push(report),
            Err(error) => {
                invalid.push((display_path(project_dir, &report_path), error.to_string()))
            }
        }
    }

    if strict && (!missing.is_empty() || !invalid.is_empty()) {
        bail!(
            "worker reports incomplete: {} missing, {} invalid",
            missing.len(),
            invalid.len()
        );
    }

    Ok(ReportSummary {
        expected: worker_briefs.len(),
        parsed,
        missing,
        invalid,
    })
}

fn write_page_report_summary(
    project_dir: &Path,
    plan: &PagePlan,
    summary: &ReportSummary,
    out_path: &Path,
) -> Result<()> {
    ensure_parent(out_path)?;
    let mut content = String::new();
    content.push_str("# Page Refresh Worker Report Summary\n\n");
    content.push_str(&format!("- Current date: {}\n", plan.current_date));
    content.push_str(&format!("- Pages in plan: {}\n", plan.batch.len()));
    content.push_str(&format!("- Expected reports: {}\n", summary.expected));
    content.push_str(&format!("- Parsed reports: {}\n", summary.parsed.len()));
    content.push_str(&format!("- Missing reports: {}\n", summary.missing.len()));
    content.push_str(&format!("- Invalid reports: {}\n\n", summary.invalid.len()));

    let mut total_worker_seconds: f64 = summary
        .parsed
        .iter()
        .filter_map(|report| report.elapsed_seconds)
        .sum();
    if total_worker_seconds.abs() < f64::EPSILON {
        total_worker_seconds = 0.0;
    }
    let source_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.pages.iter())
        .map(|page| page.source_urls.len())
        .sum();
    let caveat_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.pages.iter())
        .map(|page| page.caveats.len())
        .sum();
    let confidence_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.pages.iter())
        .map(|page| page.source_confidence.len())
        .sum();
    let parent_surface_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.pages.iter())
        .map(|page| page.parent_surfaces.len())
        .sum();
    let check_count: usize = summary
        .parsed
        .iter()
        .map(|report| report.checks.len())
        .sum();
    let failed_check_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.checks.iter())
        .filter(|check| check.status.to_lowercase() != "passed")
        .count();
    content.push_str("## Totals\n\n");
    content.push_str(&format!(
        "- Reported worker elapsed seconds: {:.2}\n",
        total_worker_seconds
    ));
    content.push_str(&format!("- Source URLs checked: {}\n", source_count));
    content.push_str(&format!(
        "- Source confidence labels: {}\n",
        confidence_count
    ));
    content.push_str(&format!("- Caveats recorded: {}\n\n", caveat_count));
    content.push_str(&format!(
        "- Parent surface notes: {}\n",
        parent_surface_count
    ));
    content.push_str(&format!("- Worker checks recorded: {}\n", check_count));
    content.push_str(&format!(
        "- Worker checks not passed: {}\n\n",
        failed_check_count
    ));

    if !summary.parsed.is_empty() {
        content.push_str("## Worker Efficiency\n\n");
        for report in &summary.parsed {
            let pages = report.pages.len();
            let elapsed_seconds = report.elapsed_seconds.unwrap_or(0.0);
            let pages_per_minute = if elapsed_seconds > 0.0 {
                pages as f64 / (elapsed_seconds / 60.0)
            } else {
                0.0
            };
            let source_total: usize = report.pages.iter().map(|page| page.source_urls.len()).sum();
            let caveat_total: usize = report.pages.iter().map(|page| page.caveats.len()).sum();
            let confidence_total: usize = report
                .pages
                .iter()
                .map(|page| page.source_confidence.len())
                .sum();
            let failed_checks = report
                .checks
                .iter()
                .filter(|check| check.status.to_lowercase() != "passed")
                .count();

            content.push_str(&format!(
                "- {}: {:.2} pages/min, {:.2} sources/page, {:.2} caveats/page, {:.2} confidence labels/page, {} failed check(s)\n",
                report.shard_id,
                pages_per_minute,
                per_page(source_total, pages),
                per_page(caveat_total, pages),
                per_page(confidence_total, pages),
                failed_checks
            ));
        }
        content.push('\n');
    }

    let parent_hints = parent_surface_hints(summary);
    if !parent_hints.is_empty() {
        content.push_str("## Parent Surface Hints\n\n");
        for (surface, routes) in parent_hints {
            content.push_str(&format!(
                "- {}: referenced by {}\n",
                surface,
                routes.join(", ")
            ));
        }
        content.push('\n');
    }

    content.push_str("## Planned Pages\n\n");
    for page in &plan.batch {
        content.push_str(&format!(
            "- {} ({}, last updated {}, risk {}) -> `{}`\n",
            page.route, page.page_type, page.last_updated, page.route_qa_risk, page.path
        ));
    }

    content.push_str("\n## Worker Reports\n\n");
    for report in &summary.parsed {
        content.push_str(&format!(
            "- {}: {} changed path(s), {} page report(s), {} check(s), elapsed {:?} seconds\n",
            report.shard_id,
            report.changed_paths.len(),
            report.pages.len(),
            report.checks.len(),
            report.elapsed_seconds
        ));
        for page in &report.pages {
            content.push_str(&format!(
                "  - {} -> `{}`: {}, {} source(s), {} confidence label(s), {} caveat(s), {} parent note(s), {} route risk(s), elapsed {:?} seconds\n",
                page.route,
                page.path,
                page.status,
                page.source_urls.len(),
                page.source_confidence.len(),
                page.caveats.len(),
                page.parent_surfaces.len(),
                page.route_qa_risks.len(),
                page.elapsed_seconds
            ));
            if !page.notes.trim().is_empty() {
                content.push_str(&format!("    - Notes: {}\n", page.notes.trim()));
            }
        }
        for check in &report.checks {
            content.push_str(&format!(
                "  - Check: {} ({})\n",
                check.command, check.status
            ));
            if !check.notes.trim().is_empty() {
                content.push_str(&format!("    - Notes: {}\n", check.notes.trim()));
            }
        }
        for note in &report.optimization_notes {
            content.push_str(&format!("  - Optimization: {}\n", note));
        }
    }

    if !summary.missing.is_empty() {
        content.push_str("\n## Missing Reports\n\n");
        for path in &summary.missing {
            content.push_str(&format!("- `{}`\n", path));
        }
    }

    if !summary.invalid.is_empty() {
        content.push_str("\n## Invalid Reports\n\n");
        for (path, error) in &summary.invalid {
            content.push_str(&format!("- `{}`: {}\n", path, error));
        }
    }

    fs::write(out_path, content)
        .with_context(|| format!("could not write {}", out_path.display()))?;
    println!("Report summary: {}", display_path(project_dir, out_path));
    Ok(())
}

fn read_affiliate_reports(
    project_dir: &Path,
    plan: &AffiliatePlan,
    report_dir: &Path,
    strict: bool,
) -> Result<AffiliateReportSummary> {
    let worker_briefs = plan
        .agent_briefs
        .as_ref()
        .map(|briefs| briefs.worker_briefs.as_slice())
        .unwrap_or(&[]);
    let mut parsed = Vec::new();
    let mut missing = Vec::new();
    let mut invalid = Vec::new();
    let mut validation_issues = Vec::new();

    for worker in worker_briefs {
        let report_path = worker
            .report_path
            .as_ref()
            .map(|path| resolve_project_path(project_dir, Path::new(path)))
            .unwrap_or_else(|| report_dir.join(format!("{}.json", worker.id)));
        if !report_path.exists() {
            missing.push(display_path(project_dir, &report_path));
            continue;
        }

        match read_json::<AffiliateWorkerReport>(&report_path) {
            Ok(report) => parsed.push(report),
            Err(error) => {
                invalid.push((display_path(project_dir, &report_path), error.to_string()))
            }
        }
    }

    for report in &parsed {
        validation_issues.extend(validate_affiliate_worker_report(plan, report));
    }

    if strict && (!missing.is_empty() || !invalid.is_empty()) {
        bail!(
            "affiliate worker reports incomplete: {} missing, {} invalid",
            missing.len(),
            invalid.len()
        );
    }
    if strict && !validation_issues.is_empty() {
        bail!(
            "affiliate worker reports failed strict validation: {} issue(s): {}",
            validation_issues.len(),
            validation_issues.join("; ")
        );
    }

    Ok(AffiliateReportSummary {
        expected: worker_briefs.len(),
        parsed,
        missing,
        invalid,
        validation_issues,
    })
}

fn validate_affiliate_worker_report(
    plan: &AffiliatePlan,
    report: &AffiliateWorkerReport,
) -> Vec<String> {
    let cluster_map: BTreeMap<&str, &AffiliateCluster> = plan
        .clusters
        .iter()
        .map(|cluster| (cluster.id.as_str(), cluster))
        .collect();
    let mut issues = Vec::new();

    if report.worker_id.trim().is_empty() {
        issues.push("worker report has empty worker_id".to_string());
    }

    for cluster in &report.clusters {
        let label = if cluster.id.trim().is_empty() {
            format!("{}:{}", report.worker_id, cluster.primary_tool)
        } else {
            format!("{}:{}", report.worker_id, cluster.id)
        };
        let status = cluster.status.trim();
        if !matches!(status, "pending" | "complete" | "blocked" | "deferred") {
            issues.push(format!("{label} has invalid status `{status}`"));
            continue;
        }

        let Some(plan_cluster) = cluster_map.get(cluster.id.as_str()).copied() else {
            issues.push(format!("{label} does not match a planned cluster id"));
            continue;
        };

        if cluster.primary_tool.trim().is_empty() {
            issues.push(format!("{label} has empty primary_tool"));
        } else if cluster.primary_tool.trim() != plan_cluster.primary_tool {
            issues.push(format!(
                "{label} primary_tool `{}` does not match plan `{}`",
                cluster.primary_tool.trim(),
                plan_cluster.primary_tool
            ));
        }

        if matches!(status, "blocked" | "deferred") && cluster.handoff_notes.trim().is_empty() {
            issues.push(format!(
                "{label} is {status} but has no rationale in handoff_notes"
            ));
        }

        if status != "complete" {
            continue;
        }

        let completed_receipts: Vec<&AffiliateClaimReceipt> = cluster
            .claim_receipts
            .iter()
            .filter(|receipt| {
                !receipt.claim.trim().is_empty()
                    || !receipt.path.trim().is_empty()
                    || !receipt.source_url.trim().is_empty()
                    || !receipt.verified_at.trim().is_empty()
                    || !receipt.confidence.trim().is_empty()
                    || !receipt.query.trim().is_empty()
                    || !receipt.caveat.trim().is_empty()
            })
            .collect();
        if completed_receipts.is_empty() {
            issues.push(format!(
                "{label} is complete but has no completed claim receipts"
            ));
        }
        for (index, receipt) in completed_receipts.iter().enumerate() {
            issues.extend(validate_affiliate_claim_receipt(&label, index, receipt));
        }

        if matches!(
            plan_cluster.duplicate_intent_risk.as_str(),
            "medium" | "high"
        ) && !has_non_empty_affiliate_note(&cluster.duplicate_intent_notes)
        {
            issues.push(format!(
                "{label} is complete with {} duplicate-intent risk but has no duplicate_intent_notes",
                plan_cluster.duplicate_intent_risk
            ));
        }

        if !has_non_empty_affiliate_note(&cluster.parent_surface_notes) {
            issues.push(format!(
                "{label} is complete but has no parent_surface_notes"
            ));
        }

        if plan_cluster.monetization_state == "live_affiliate"
            && !has_non_empty_affiliate_note(&cluster.commercial_cta_notes)
        {
            issues.push(format!(
                "{label} is complete for a live affiliate tool but has no commercial_cta_notes"
            ));
        }

        if cluster.checks.is_empty() {
            issues.push(format!("{label} is complete but has no checks"));
        }
        for (index, check) in cluster.checks.iter().enumerate() {
            if check.command.trim().is_empty() {
                issues.push(format!("{label} check {index} has empty command"));
            }
            if check.status.trim().is_empty() {
                issues.push(format!("{label} check {index} has empty status"));
            }
            if check.status.trim() != "passed" && check.notes.trim().is_empty() {
                issues.push(format!(
                    "{label} check `{}` is not passed but has no notes",
                    check.command.trim()
                ));
            }
        }
    }

    issues
}

fn has_non_empty_affiliate_note(notes: &[String]) -> bool {
    notes.iter().any(|note| !note.trim().is_empty())
}

fn validate_affiliate_claim_receipt(
    label: &str,
    index: usize,
    receipt: &AffiliateClaimReceipt,
) -> Vec<String> {
    let mut issues = Vec::new();
    let prefix = format!("{label} claim_receipts[{index}]");
    let confidence = receipt.confidence.trim();

    if receipt.claim.trim().is_empty() {
        issues.push(format!("{prefix} has empty claim"));
    }
    if receipt.path.trim().is_empty() {
        issues.push(format!("{prefix} has empty path"));
    }
    if receipt.source_url.trim().is_empty() {
        issues.push(format!("{prefix} has empty source_url"));
    }
    if receipt.verified_at.trim().is_empty() {
        issues.push(format!("{prefix} has empty verified_at"));
    }
    if !is_valid_affiliate_confidence(confidence) {
        issues.push(format!("{prefix} has invalid confidence `{confidence}`"));
    }
    if requires_affiliate_caveat(confidence) && receipt.caveat.trim().is_empty() {
        issues.push(format!(
            "{prefix} uses confidence `{confidence}` but has no caveat"
        ));
    }

    issues
}

fn is_valid_affiliate_confidence(confidence: &str) -> bool {
    matches!(
        confidence,
        "primary-confirmed"
            | "primary-conflict"
            | "account-gated"
            | "checkout-gated"
            | "region-rendered"
            | "blocked-live-check"
            | "secondary-only"
    )
}

fn requires_affiliate_caveat(confidence: &str) -> bool {
    matches!(
        confidence,
        "primary-conflict"
            | "account-gated"
            | "checkout-gated"
            | "region-rendered"
            | "blocked-live-check"
            | "secondary-only"
    )
}

fn write_affiliate_report_summary(
    project_dir: &Path,
    plan: &AffiliatePlan,
    summary: &AffiliateReportSummary,
    out_path: &Path,
) -> Result<()> {
    ensure_parent(out_path)?;
    let mut content = String::new();
    content.push_str("# Affiliate Conversion Worker Report Summary\n\n");
    content.push_str(&format!("- Current date: {}\n", plan.current_date));
    content.push_str(&format!("- Clusters in plan: {}\n", plan.clusters.len()));
    content.push_str(&format!("- Expected reports: {}\n", summary.expected));
    content.push_str(&format!("- Parsed reports: {}\n", summary.parsed.len()));
    content.push_str(&format!("- Missing reports: {}\n", summary.missing.len()));
    content.push_str(&format!("- Invalid reports: {}\n", summary.invalid.len()));
    content.push_str(&format!(
        "- Strict validation issues: {}\n\n",
        summary.validation_issues.len()
    ));

    let mut total_worker_seconds: f64 = summary
        .parsed
        .iter()
        .filter_map(|report| report.elapsed_seconds)
        .sum();
    if total_worker_seconds.abs() < f64::EPSILON {
        total_worker_seconds = 0.0;
    }
    let source_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.clusters.iter())
        .map(|cluster| cluster.source_urls.len())
        .sum();
    let claim_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.clusters.iter())
        .map(|cluster| {
            cluster
                .claim_receipts
                .iter()
                .filter(|receipt| !receipt.claim.trim().is_empty())
                .count()
        })
        .sum();
    let cta_note_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.clusters.iter())
        .map(|cluster| cluster.commercial_cta_notes.len())
        .sum();
    let duplicate_note_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.clusters.iter())
        .map(|cluster| cluster.duplicate_intent_notes.len())
        .sum();
    let parent_note_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.clusters.iter())
        .map(|cluster| cluster.parent_surface_notes.len())
        .sum();
    let route_risk_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.clusters.iter())
        .map(|cluster| cluster.route_qa_risks.len())
        .sum();
    let check_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.clusters.iter())
        .map(|cluster| cluster.checks.len())
        .sum();
    let failed_check_count: usize = summary
        .parsed
        .iter()
        .flat_map(|report| report.clusters.iter())
        .flat_map(|cluster| cluster.checks.iter())
        .filter(|check| check.status.to_lowercase() != "passed")
        .count();

    content.push_str("## Totals\n\n");
    content.push_str(&format!(
        "- Reported worker elapsed seconds: {:.2}\n",
        total_worker_seconds
    ));
    content.push_str(&format!("- Source URLs checked: {}\n", source_count));
    content.push_str(&format!("- Claim receipts completed: {}\n", claim_count));
    content.push_str(&format!("- Commercial CTA notes: {}\n", cta_note_count));
    content.push_str(&format!(
        "- Duplicate-intent notes: {}\n",
        duplicate_note_count
    ));
    content.push_str(&format!("- Parent surface notes: {}\n", parent_note_count));
    content.push_str(&format!("- Route QA risk notes: {}\n", route_risk_count));
    content.push_str(&format!("- Worker checks recorded: {}\n", check_count));
    content.push_str(&format!(
        "- Worker checks not passed: {}\n\n",
        failed_check_count
    ));

    content.push_str("## Planned Clusters\n\n");
    for cluster in &plan.clusters {
        content.push_str(&format!(
            "- {}: {} (`{}`), monetization {}, duplicate risk {}, route QA risk {}\n",
            cluster.id,
            cluster.title,
            cluster.primary_tool,
            cluster.monetization_state,
            cluster.duplicate_intent_risk,
            cluster.route_qa_risk
        ));
        if !cluster.parent_surfaces.is_empty() {
            content.push_str(&format!(
                "  - Parent surfaces: {}\n",
                cluster.parent_surfaces.join(", ")
            ));
        }
    }

    content.push_str("\n## Worker Reports\n\n");
    for report in &summary.parsed {
        content.push_str(&format!(
            "- {}: {} owned path(s), {} cluster report(s), elapsed {:?} seconds\n",
            report.worker_id,
            report.owned_paths.len(),
            report.clusters.len(),
            report.elapsed_seconds
        ));
        for cluster in &report.clusters {
            content.push_str(&format!(
                "  - {} (`{}`): {}, {} source(s), {} completed claim receipt(s), {} duplicate note(s), {} parent note(s), {} CTA note(s), {} route risk(s)\n",
                cluster.id,
                cluster.primary_tool,
                cluster.status,
                cluster.source_urls.len(),
                cluster
                    .claim_receipts
                    .iter()
                    .filter(|receipt| !receipt.claim.trim().is_empty())
                    .count(),
                cluster.duplicate_intent_notes.len(),
                cluster.parent_surface_notes.len(),
                cluster.commercial_cta_notes.len(),
                cluster.route_qa_risks.len()
            ));
            for receipt in &cluster.claim_receipts {
                if receipt.claim.trim().is_empty() {
                    continue;
                }
                content.push_str(&format!(
                    "    - Claim: {} ({}, {}, source {}, query {}, path {}, caveat {})\n",
                    receipt.claim.trim(),
                    receipt.verified_at.trim(),
                    receipt.confidence.trim(),
                    receipt.source_url.trim(),
                    receipt.query.trim(),
                    receipt.path.trim(),
                    receipt.caveat.trim()
                ));
            }
            if !cluster.handoff_notes.trim().is_empty() {
                content.push_str(&format!(
                    "    - Handoff: {}\n",
                    cluster.handoff_notes.trim()
                ));
            }
        }
        if !report.handoff_notes.trim().is_empty() {
            content.push_str(&format!("  - Handoff: {}\n", report.handoff_notes.trim()));
        }
    }

    if !summary.missing.is_empty() {
        content.push_str("\n## Missing Reports\n\n");
        for path in &summary.missing {
            content.push_str(&format!("- `{}`\n", path));
        }
    }

    if !summary.invalid.is_empty() {
        content.push_str("\n## Invalid Reports\n\n");
        for (path, error) in &summary.invalid {
            content.push_str(&format!("- `{}`: {}\n", path, error));
        }
    }

    if !summary.validation_issues.is_empty() {
        content.push_str("\n## Strict Validation Issues\n\n");
        for issue in &summary.validation_issues {
            content.push_str(&format!("- {}\n", issue));
        }
    }

    fs::write(out_path, content)
        .with_context(|| format!("could not write {}", out_path.display()))?;
    println!(
        "Affiliate report summary: {}",
        display_path(project_dir, out_path)
    );
    Ok(())
}

fn write_affiliate_handoff_command(project_dir: &Path, args: &AffiliateHandoffArgs) -> Result<()> {
    let plan_path = resolve_project_path(project_dir, &args.plan);
    let report_dir = resolve_project_path(project_dir, &args.report_dir);
    let report_summary_path = resolve_project_path(project_dir, &args.report_summary);
    let out_path = resolve_project_path(project_dir, &args.out);
    let json_out_path = resolve_project_path(project_dir, &args.json_out);
    let plan: AffiliatePlan = read_json(&plan_path)?;
    let summary = read_affiliate_reports(project_dir, &plan, &report_dir, true)?;

    if implementation_ready_affiliate_clusters(&plan, &summary).is_empty() {
        bail!("no completed affiliate clusters are implementation-ready");
    }

    write_affiliate_report_summary(project_dir, &plan, &summary, &report_summary_path)?;
    write_affiliate_handoff(
        project_dir,
        &plan_path,
        &report_summary_path,
        &plan,
        &summary,
        &out_path,
        Some(&json_out_path),
    )?;
    println!(
        "Affiliate implementation handoff: {}",
        display_path(project_dir, &out_path)
    );
    println!(
        "Affiliate implementation handoff JSON: {}",
        display_path(project_dir, &json_out_path)
    );
    Ok(())
}

fn implementation_ready_affiliate_clusters<'a>(
    plan: &'a AffiliatePlan,
    summary: &'a AffiliateReportSummary,
) -> Vec<(
    &'a AffiliateCluster,
    &'a AffiliateReportCluster,
    &'a AffiliateWorkerReport,
)> {
    let cluster_map: BTreeMap<&str, &AffiliateCluster> = plan
        .clusters
        .iter()
        .map(|cluster| (cluster.id.as_str(), cluster))
        .collect();
    summary
        .parsed
        .iter()
        .flat_map(|report| {
            let cluster_map = &cluster_map;
            report.clusters.iter().filter_map(move |cluster| {
                if cluster.status.trim() != "complete" {
                    return None;
                }
                cluster_map
                    .get(cluster.id.as_str())
                    .copied()
                    .map(|plan_cluster| (plan_cluster, cluster, report))
            })
        })
        .collect()
}

fn write_affiliate_handoff(
    project_dir: &Path,
    plan_path: &Path,
    report_summary_path: &Path,
    plan: &AffiliatePlan,
    summary: &AffiliateReportSummary,
    out_path: &Path,
    json_out_path: Option<&Path>,
) -> Result<()> {
    ensure_parent(out_path)?;
    let ready_clusters = implementation_ready_affiliate_clusters(plan, summary);
    let ready_cluster_ids: BTreeSet<&str> = ready_clusters
        .iter()
        .map(|(_, cluster, _)| cluster.id.as_str())
        .collect();
    let deferred_clusters: Vec<(&AffiliateReportCluster, &AffiliateWorkerReport)> = summary
        .parsed
        .iter()
        .flat_map(|report| {
            report.clusters.iter().filter_map(move |cluster| {
                if matches!(cluster.status.trim(), "blocked" | "deferred") {
                    Some((cluster, report))
                } else {
                    None
                }
            })
        })
        .collect();
    let pending_clusters: Vec<&AffiliateReportCluster> = summary
        .parsed
        .iter()
        .flat_map(|report| report.clusters.iter())
        .filter(|cluster| cluster.status.trim() == "pending")
        .collect();
    let mut route_qa_routes = BTreeSet::new();
    let mut parent_surfaces = BTreeSet::new();
    let mut failed_checks = Vec::new();

    for (plan_cluster, report_cluster, report) in &ready_clusters {
        for route in &plan_cluster.affected_routes {
            if !route.trim().is_empty() {
                route_qa_routes.insert(route.trim().to_string());
            }
        }
        route_qa_routes.insert(format!("/tools/{}/", plan_cluster.primary_tool));
        for route in &plan_cluster.parent_surfaces {
            if !route.trim().is_empty() {
                parent_surfaces.insert(route.trim().to_string());
            }
        }
        for check in &report_cluster.checks {
            if check.status.trim() != "passed" {
                failed_checks.push(format!(
                    "{}:{} `{}` status `{}` notes `{}`",
                    report.worker_id,
                    report_cluster.id,
                    check.command.trim(),
                    check.status.trim(),
                    check.notes.trim()
                ));
            }
        }
    }
    let route_qa_routes_vec: Vec<String> = route_qa_routes.iter().cloned().collect();
    let parent_surfaces_vec: Vec<String> = parent_surfaces.iter().cloned().collect();
    let verification_gates = affiliate_handoff_verification_gates(plan);
    let no_edit_boundaries = vec![
        "Workers may touch only explicitly assigned files.".to_string(),
        "Workers must not edit `PAGE_REFRESH_LEDGER.md`, `src/data/source-registry.json`, parent hubs, top-layer pages, `.agent/**`, `workflows/**`, runner code, audit scripts, or generated output.".to_string(),
        "The integrator owns shared files, route QA scope, final verification, and final receipts.".to_string(),
        "This handoff is no-content and does not authorize public page edits by itself.".to_string(),
    ];
    let deferred_cluster_count = deferred_clusters.len();
    let pending_cluster_count = pending_clusters.len();
    let non_passed_check_count = failed_checks.len();

    let mut content = String::new();
    content.push_str("# Affiliate Conversion Implementation Handoff\n\n");
    content.push_str("This artifact is a no-content, reviewer-ready patch plan. It is not a publishing receipt and it does not authorize workers to edit shared files.\n\n");
    content.push_str("## Inputs\n\n");
    content.push_str(&format!(
        "- Plan: `{}`\n",
        display_path(project_dir, plan_path)
    ));
    content.push_str(&format!(
        "- Report summary: `{}`\n",
        display_path(project_dir, report_summary_path)
    ));
    content.push_str(&format!("- Current date: {}\n", plan.current_date));
    content.push_str(&format!(
        "- Strict validation issues: {}\n",
        summary.validation_issues.len()
    ));
    content.push_str(&format!(
        "- Selected implementation clusters: {}\n\n",
        ready_clusters.len()
    ));

    content.push_str("## Selected Clusters\n\n");
    for (plan_cluster, report_cluster, report) in &ready_clusters {
        content.push_str(&format!(
            "### {} (`{}`)\n\n",
            plan_cluster.title, report_cluster.id
        ));
        content.push_str(&format!("- Worker: `{}`\n", report.worker_id));
        content.push_str(&format!(
            "- Primary tool: `{}` from `{}`\n",
            plan_cluster.primary_tool, plan_cluster.source_file
        ));
        content.push_str(&format!(
            "- Category: `{}`\n",
            empty_as_unknown(&plan_cluster.category)
        ));
        content.push_str(&format!("- Buyer job: {}\n", plan_cluster.buyer_job));
        content.push_str(&format!(
            "- Monetization: {}, affiliate status {}, network {}\n",
            plan_cluster.monetization_state,
            empty_as_unknown(&plan_cluster.affiliate_status),
            empty_as_unknown(&plan_cluster.affiliate_network)
        ));
        content.push_str(&format!(
            "- Duplicate-intent risk: {}\n",
            plan_cluster.duplicate_intent_risk
        ));
        content.push_str(&format!(
            "- Route QA risk: {}\n\n",
            plan_cluster.route_qa_risk
        ));

        content.push_str("#### Claim Receipts\n\n");
        for receipt in report_cluster
            .claim_receipts
            .iter()
            .filter(|receipt| !receipt.claim.trim().is_empty())
        {
            content.push_str(&format!(
                "- Claim: {}\n  - Path: `{}`\n  - Source: {}\n  - Verified at: {}\n  - Confidence: {}\n",
                receipt.claim.trim(),
                receipt.path.trim(),
                receipt.source_url.trim(),
                receipt.verified_at.trim(),
                receipt.confidence.trim()
            ));
            if !receipt.query.trim().is_empty() {
                content.push_str(&format!("  - Query: {}\n", receipt.query.trim()));
            }
            if !receipt.caveat.trim().is_empty() {
                content.push_str(&format!("  - Caveat: {}\n", receipt.caveat.trim()));
            }
        }

        content.push_str("\n#### Duplicate-Intent Decision\n\n");
        push_note_list(&mut content, &report_cluster.duplicate_intent_notes);

        content.push_str("\n#### Commercial CTA Notes\n\n");
        push_note_list(&mut content, &report_cluster.commercial_cta_notes);

        content.push_str("\n#### Parent Surface Notes\n\n");
        push_note_list(&mut content, &report_cluster.parent_surface_notes);

        if !report_cluster.route_qa_risks.is_empty() {
            content.push_str("\n#### Route QA Risk Notes\n\n");
            push_note_list(&mut content, &report_cluster.route_qa_risks);
        }

        if !report_cluster.handoff_notes.trim().is_empty() {
            content.push_str("\n#### Worker Handoff Notes\n\n");
            content.push_str(&format!("- {}\n", report_cluster.handoff_notes.trim()));
        }
        content.push('\n');
    }

    content.push_str("## Parent And Top-Layer Surface Checklist\n\n");
    for route in &parent_surfaces_vec {
        content.push_str(&format!(
            "- [ ] Inspect and update if affected: `{}`\n",
            route
        ));
    }
    for route in ["/", "/guides/", "/tools/", "/categories/", "/workflows/"] {
        content.push_str(&format!(
            "- [ ] Confirm top-layer consistency if this slice changes linked child content: `{}`\n",
            route
        ));
    }

    content.push_str("\n## Route QA Routes And Risks\n\n");
    if route_qa_routes_vec.is_empty() {
        content.push_str("- No route QA routes were derived. The integrator must add changed routes before publishing.\n");
    } else {
        for route in &route_qa_routes_vec {
            content.push_str(&format!("- `--route {}`\n", route));
        }
    }
    for (plan_cluster, report_cluster, _) in &ready_clusters {
        content.push_str(&format!(
            "- Risk note for `{}`: plan `{}`, worker notes `{}`\n",
            report_cluster.id,
            plan_cluster.route_qa_risk,
            non_empty_notes(&report_cluster.route_qa_risks).join("; ")
        ));
    }

    content.push_str("\n## Exact Verification Gates Before Publishing Content\n\n");
    for command in &verification_gates {
        content.push_str(&format!("- `{}`\n", command));
    }

    content.push_str("\n## No-Edit And Shared-File Boundaries\n\n");
    for boundary in &no_edit_boundaries {
        content.push_str(&format!("- {}\n", boundary));
    }

    content.push_str("\n## Unresolved Risks And Defer Or Block Items\n\n");
    if deferred_clusters.is_empty() && pending_clusters.is_empty() && failed_checks.is_empty() {
        content.push_str(
            "- No blocked, deferred, pending, or non-passed worker-check items were reported.\n",
        );
    }
    for (cluster, report) in deferred_clusters {
        content.push_str(&format!(
            "- {}:{} is `{}`: {}\n",
            report.worker_id,
            cluster.id,
            cluster.status,
            cluster.handoff_notes.trim()
        ));
    }
    for cluster in pending_clusters {
        if !ready_cluster_ids.contains(cluster.id.as_str()) {
            content.push_str(&format!(
                "- `{}` remains pending and is not implementation-ready.\n",
                cluster.id
            ));
        }
    }
    for check in failed_checks {
        content.push_str(&format!("- Non-passed worker check: {}\n", check));
    }

    fs::write(out_path, content)
        .with_context(|| format!("could not write {}", out_path.display()))?;
    if let Some(json_out_path) = json_out_path {
        write_affiliate_handoff_json(
            project_dir,
            plan_path,
            report_summary_path,
            out_path,
            json_out_path,
            plan,
            &ready_clusters,
            summary,
            &route_qa_routes_vec,
            &parent_surfaces_vec,
            &verification_gates,
            &no_edit_boundaries,
            deferred_cluster_count,
            pending_cluster_count,
            non_passed_check_count,
        )?;
    }
    Ok(())
}

fn write_affiliate_handoff_json(
    project_dir: &Path,
    plan_path: &Path,
    report_summary_path: &Path,
    markdown_handoff_path: &Path,
    json_out_path: &Path,
    plan: &AffiliatePlan,
    ready_clusters: &[(
        &AffiliateCluster,
        &AffiliateReportCluster,
        &AffiliateWorkerReport,
    )],
    summary: &AffiliateReportSummary,
    route_qa_routes: &[String],
    parent_surfaces: &[String],
    verification_gates: &[String],
    no_edit_boundaries: &[String],
    deferred_cluster_count: usize,
    pending_cluster_count: usize,
    non_passed_check_count: usize,
) -> Result<()> {
    ensure_parent(json_out_path)?;
    let selected_clusters: Vec<serde_json::Value> = ready_clusters
        .iter()
        .map(|(plan_cluster, report_cluster, report)| {
            serde_json::json!({
                "id": &report_cluster.id,
                "primary_tool": &plan_cluster.primary_tool,
                "worker_id": &report.worker_id,
                "buyer_job": &plan_cluster.buyer_job,
                "source_file": &plan_cluster.source_file,
                "claim_receipt_count": report_cluster.claim_receipts.len(),
                "source_url_count": report_cluster.source_urls.len(),
                "commercial_cta_note_count": report_cluster.commercial_cta_notes.len(),
                "parent_surface_note_count": report_cluster.parent_surface_notes.len(),
                "duplicate_intent_note_count": report_cluster.duplicate_intent_notes.len(),
                "route_qa_risk_count": report_cluster.route_qa_risks.len(),
                "check_count": report_cluster.checks.len(),
            })
        })
        .collect();
    let claim_receipt_count: usize = ready_clusters
        .iter()
        .map(|(_, cluster, _)| cluster.claim_receipts.len())
        .sum();
    let source_url_count: usize = ready_clusters
        .iter()
        .map(|(_, cluster, _)| cluster.source_urls.len())
        .sum();
    let commercial_cta_note_count: usize = ready_clusters
        .iter()
        .map(|(_, cluster, _)| cluster.commercial_cta_notes.len())
        .sum();
    let duplicate_intent_note_count: usize = ready_clusters
        .iter()
        .map(|(_, cluster, _)| cluster.duplicate_intent_notes.len())
        .sum();
    let parent_surface_note_count: usize = ready_clusters
        .iter()
        .map(|(_, cluster, _)| cluster.parent_surface_notes.len())
        .sum();
    let receipt = serde_json::json!({
        "schema_version": "aipedia.affiliate-handoff-receipt.v1",
        "workflow": "affiliate-conversion-handoff",
        "status": "ready",
        "generated_at": Utc::now().to_rfc3339(),
        "current_date": &plan.current_date,
        "plan": display_path(project_dir, plan_path),
        "report_summary": display_path(project_dir, report_summary_path),
        "markdown_handoff": display_path(project_dir, markdown_handoff_path),
        "selected_cluster_count": ready_clusters.len(),
        "selected_clusters": selected_clusters,
        "expected_worker_reports": summary.expected,
        "parsed_worker_reports": summary.parsed.len(),
        "missing_worker_reports": &summary.missing,
        "invalid_worker_reports": summary.invalid.iter().map(|(path, error)| {
            serde_json::json!({ "path": path, "error": error })
        }).collect::<Vec<_>>(),
        "strict_validation_issue_count": summary.validation_issues.len(),
        "claim_receipt_count": claim_receipt_count,
        "source_url_count": source_url_count,
        "commercial_cta_note_count": commercial_cta_note_count,
        "duplicate_intent_note_count": duplicate_intent_note_count,
        "parent_surface_note_count": parent_surface_note_count,
        "route_qa_routes": route_qa_routes,
        "parent_surfaces": parent_surfaces,
        "verification_gates": verification_gates,
        "no_edit_boundaries": no_edit_boundaries,
        "blocked_or_deferred_count": deferred_cluster_count,
        "pending_count": pending_cluster_count,
        "non_passed_check_count": non_passed_check_count,
        "residual_risks": [
            "This is a no-content implementation handoff and does not itself publish or verify rendered pages."
        ],
    });
    fs::write(
        json_out_path,
        format!("{}\n", serde_json::to_string_pretty(&receipt)?),
    )
    .with_context(|| format!("could not write {}", json_out_path.display()))?;
    Ok(())
}

fn affiliate_handoff_verification_gates(plan: &AffiliatePlan) -> Vec<String> {
    let mut gates = Vec::new();
    gates.push("npm run runner:affiliate-conversion:reports -- --strict".to_string());
    if let Some(commands) = &plan.commands {
        gates.extend(commands.cheap_gates.iter().cloned());
        gates.push("npm run ledger:pages && npm run ledger:pages:check".to_string());
        gates.extend(commands.future_rendered_closeout.iter().cloned());
    } else {
        gates.extend([
            "npm run affiliate:conversion:inventory -- --json".to_string(),
            "npm run audit:affiliate-conversion -- --strict --json".to_string(),
            "npm run audit:provenance:changed -- --json".to_string(),
            "npm run ledger:pages && npm run ledger:pages:check".to_string(),
            "npm run typecheck".to_string(),
            "npm run build:fast".to_string(),
            "npm run qa:route -- --site-dir dist-fast/client --concurrency 6 --widths 319,360,390,430,768,1024,1366 --route <changed routes>".to_string(),
            "git diff --check".to_string(),
        ]);
    }
    gates.push(
        "Inspect CommercialCTA usage and affiliate disclosure on every changed commercial page."
            .to_string(),
    );
    gates.push(
        "Run live source checks for every volatile source touched by the content slice."
            .to_string(),
    );

    let mut seen = BTreeSet::new();
    gates
        .into_iter()
        .filter(|gate| seen.insert(gate.clone()))
        .collect()
}

fn push_note_list(content: &mut String, notes: &[String]) {
    let notes = non_empty_notes(notes);
    if notes.is_empty() {
        content.push_str("- No notes supplied.\n");
        return;
    }
    for note in notes {
        content.push_str(&format!("- {}\n", note));
    }
}

fn non_empty_notes(notes: &[String]) -> Vec<String> {
    notes
        .iter()
        .map(|note| note.trim())
        .filter(|note| !note.is_empty())
        .map(str::to_string)
        .collect()
}

fn empty_as_unknown(value: &str) -> &str {
    if value.trim().is_empty() {
        "unknown"
    } else {
        value.trim()
    }
}

fn per_page(total: usize, page_count: usize) -> f64 {
    if page_count == 0 {
        0.0
    } else {
        total as f64 / page_count as f64
    }
}

fn parent_surface_hints(summary: &ReportSummary) -> BTreeMap<String, Vec<String>> {
    let mut hints: BTreeMap<String, BTreeSet<String>> = BTreeMap::new();

    for report in &summary.parsed {
        for page in &report.pages {
            for surface in &page.parent_surfaces {
                let surface = surface.trim();
                if surface.is_empty() {
                    continue;
                }
                hints
                    .entry(surface.to_string())
                    .or_default()
                    .insert(page.route.clone());
            }
        }
    }

    hints
        .into_iter()
        .map(|(surface, routes)| (surface, routes.into_iter().collect()))
        .collect()
}

fn current_category_route(project_dir: &Path, tool: &Tool) -> Result<Option<String>> {
    let path = project_dir.join(&tool.path);
    if !path.exists() {
        return Ok(tool.category_route.clone());
    }

    let raw = fs::read_to_string(&path)
        .with_context(|| format!("could not read tool frontmatter {}", path.display()))?;
    let Some(rest) = raw.strip_prefix("---") else {
        return Ok(tool.category_route.clone());
    };
    let Some((frontmatter, _body)) = rest.split_once("---") else {
        return Ok(tool.category_route.clone());
    };

    for line in frontmatter.lines() {
        let Some(value) = line.strip_prefix("category:") else {
            continue;
        };
        let category = value.trim().trim_matches('"').trim_matches('\'');
        if category.is_empty() {
            return Ok(None);
        }
        return Ok(Some(format!("/categories/{category}/")));
    }

    Ok(tool.category_route.clone())
}

fn write_receipt(
    project_dir: &Path,
    receipt_dir: &Path,
    plan_path: &Path,
    route_args_path: &Path,
    plan: &Plan,
    results: &[CommandResult],
    ok: bool,
    total_duration_ms: u128,
) -> Result<()> {
    let now = Utc::now();
    let timestamp = now.format("%Y-%m-%dT%H-%M-%SZ").to_string();
    let generated_at = now.to_rfc3339();
    let goal_id = closeout_goal_id();
    let run_id = closeout_run_id("tool-refresh", &generated_at);
    let residual_risks = closeout_list("AIPEDIA_RESIDUAL_RISKS");
    let next_actions = closeout_list("AIPEDIA_NEXT_ACTIONS");
    let trace = closeout_trace(
        "tool-refresh",
        &goal_id,
        &run_id,
        &generated_at,
        total_duration_ms,
    );
    let path = receipt_dir.join(format!("{}-tool-refresh-closeout.md", timestamp));
    let json_path = receipt_dir.join(format!("{}-tool-refresh-closeout.json", timestamp));
    let plan_display = display_path(project_dir, plan_path);
    let route_args_display = display_path(project_dir, route_args_path);
    let markdown_receipt = display_path(project_dir, &path);
    let json_receipt_path = display_path(project_dir, &json_path);
    let mut content = String::new();
    content.push_str("# AiPedia Runner Tool Refresh Closeout\n\n");
    content.push_str(&format!(
        "- Status: {}\n",
        if ok { "passed" } else { "failed" }
    ));
    content.push_str(&format!("- Generated: {}\n", generated_at));
    content.push_str(&format!("- Goal ID: `{}`\n", goal_id));
    content.push_str(&format!("- Run ID: `{}`\n", run_id));
    content.push_str(&format!("- Trace ID: `{}`\n", trace.trace_id));
    content.push_str(&format!("- Span ID: `{}`\n", trace.span_id));
    content.push_str(&format!("- Plan: `{}`\n", plan_display));
    content.push_str(&format!("- Route args: `{}`\n\n", route_args_display));
    content.push_str("## Timing\n\n");
    content.push_str(&format!("- Total closeout: {} ms\n", total_duration_ms));
    let cheap_ms: u128 = results
        .iter()
        .filter(|result| {
            matches!(
                result.label.as_str(),
                "ledger generate"
                    | "ledger check"
                    | "tool refresh grouped check"
                    | "date consistency changed"
            )
        })
        .map(|result| result.duration_ms)
        .sum();
    let expensive_ms: u128 = results
        .iter()
        .filter(|result| {
            matches!(
                result.label.as_str(),
                "typecheck" | "build fast" | "route qa"
            )
        })
        .map(|result| result.duration_ms)
        .sum();
    content.push_str(&format!("- Cheap gates: {} ms\n", cheap_ms));
    content.push_str(&format!("- Expensive gates: {} ms\n\n", expensive_ms));
    content.push_str("## Commands\n\n");
    for result in results {
        content.push_str(&format!(
            "- {}: status {:?}, {} ms\n",
            result.label, result.status, result.duration_ms
        ));
        if let Some(details_path) = &result.details_path {
            content.push_str(&format!(
                "  - Timing detail: `{}`\n",
                display_path(project_dir, details_path)
            ));
        }
    }
    let route_args = fs::read_to_string(route_args_path).unwrap_or_default();
    let source_ids = sorted_unique(
        plan.batch
            .iter()
            .flat_map(|tool| tool.source_ids.iter().cloned())
            .collect(),
    );
    let changed_routes = routes_from_route_args(&route_args);
    let widths = route_qa_widths();
    let commands = receipt_commands(project_dir, results);
    let superseded_failures = if ok {
        superseded_failure_receipts(project_dir, receipt_dir, "tool-refresh", &json_path)
    } else {
        Vec::new()
    };
    let artifact_refs = closeout_artifact_refs(CloseoutArtifactInputs {
        workflow: "tool-refresh",
        plan: &plan_display,
        route_args: Some(&route_args_display),
        report_dir: None,
        report_summary: None,
        markdown_receipt: &markdown_receipt,
        json_receipt: &json_receipt_path,
        changed_routes: &changed_routes,
        source_ids: &source_ids,
        commands: &commands,
    });
    let json_receipt = CloseoutReceiptJson {
        schema_version: "aipedia.closeout-receipt.v1".to_string(),
        workflow: "tool-refresh".to_string(),
        status: if ok { "passed" } else { "failed" }.to_string(),
        generated_at,
        goal_id,
        run_id,
        residual_risks,
        next_actions,
        trace,
        artifact_refs,
        current_date: None,
        elapsed_ms: to_u64(total_duration_ms),
        plan: plan_display,
        route_args: Some(route_args_display),
        report_dir: None,
        report_summary: None,
        markdown_receipt,
        changed_routes,
        source_ids,
        widths,
        commands,
        superseded_failures,
        system_progress: runner_system_progress(project_dir),
        input_freshness: runner_input_freshness(project_dir, "tool-refresh"),
    };
    fs::write(&path, content).with_context(|| format!("could not write {}", path.display()))?;
    fs::write(&json_path, serde_json::to_string_pretty(&json_receipt)?)
        .with_context(|| format!("could not write {}", json_path.display()))?;
    println!("Receipt: {}", display_path(project_dir, &path));
    println!("Receipt JSON: {}", display_path(project_dir, &json_path));
    Ok(())
}

fn write_page_receipt(
    project_dir: &Path,
    receipt_dir: &Path,
    plan_path: &Path,
    report_dir: &Path,
    report_summary_path: &Path,
    plan: &PagePlan,
    report_summary: &ReportSummary,
    results: &[CommandResult],
    ok: bool,
    total_duration_ms: u128,
) -> Result<()> {
    let now = Utc::now();
    let timestamp = now.format("%Y-%m-%dT%H-%M-%SZ").to_string();
    let generated_at = now.to_rfc3339();
    let goal_id = closeout_goal_id();
    let run_id = closeout_run_id("page-refresh", &generated_at);
    let residual_risks = closeout_list("AIPEDIA_RESIDUAL_RISKS");
    let next_actions = closeout_list("AIPEDIA_NEXT_ACTIONS");
    let trace = closeout_trace(
        "page-refresh",
        &goal_id,
        &run_id,
        &generated_at,
        total_duration_ms,
    );
    let path = receipt_dir.join(format!("{}-page-refresh-closeout.md", timestamp));
    let json_path = receipt_dir.join(format!("{}-page-refresh-closeout.json", timestamp));
    let plan_display = display_path(project_dir, plan_path);
    let report_dir_display = display_path(project_dir, report_dir);
    let report_summary_display = display_path(project_dir, report_summary_path);
    let markdown_receipt = display_path(project_dir, &path);
    let json_receipt_path = display_path(project_dir, &json_path);
    let mut content = String::new();
    content.push_str("# AiPedia Runner Page Refresh Closeout\n\n");
    content.push_str(&format!(
        "- Status: {}\n",
        if ok { "passed" } else { "failed" }
    ));
    content.push_str(&format!("- Generated: {}\n", generated_at));
    content.push_str(&format!("- Goal ID: `{}`\n", goal_id));
    content.push_str(&format!("- Run ID: `{}`\n", run_id));
    content.push_str(&format!("- Trace ID: `{}`\n", trace.trace_id));
    content.push_str(&format!("- Span ID: `{}`\n", trace.span_id));
    content.push_str(&format!("- Current date: {}\n", plan.current_date));
    content.push_str(&format!("- Plan: `{}`\n", plan_display));
    content.push_str(&format!("- Report dir: `{}`\n", report_dir_display));
    content.push_str(&format!(
        "- Worker report summary: `{}`\n\n",
        report_summary_display
    ));

    content.push_str("## Scope\n\n");
    content.push_str(&format!("- Pages planned: {}\n", plan.batch.len()));
    content.push_str(&format!(
        "- Content route QA routes: {}\n",
        plan.commands.content_routes.len()
    ));
    content.push_str(&format!(
        "- Interactive route QA routes: {}\n",
        plan.commands.interactive_routes.len()
    ));
    content.push_str(&format!(
        "- Worker reports parsed: {}/{}\n",
        report_summary.parsed.len(),
        report_summary.expected
    ));
    content.push_str(&format!(
        "- Missing reports: {}\n",
        report_summary.missing.len()
    ));
    content.push_str(&format!(
        "- Invalid reports: {}\n\n",
        report_summary.invalid.len()
    ));

    content.push_str("## Timing\n\n");
    content.push_str(&format!("- Total closeout: {} ms\n", total_duration_ms));
    let cheap_ms: u128 = results
        .iter()
        .filter(|result| {
            matches!(
                result.label.as_str(),
                "ledger generate"
                    | "ledger check"
                    | "frontmatter changed"
                    | "date consistency changed"
                    | "provenance changed"
                    | "coverage quality changed"
                    | "em dash guard"
                    | "diff check"
            )
        })
        .map(|result| result.duration_ms)
        .sum();
    let expensive_ms: u128 = results
        .iter()
        .filter(|result| {
            matches!(
                result.label.as_str(),
                "typecheck" | "build fast" | "content route qa" | "interactive route qa"
            )
        })
        .map(|result| result.duration_ms)
        .sum();
    let worker_seconds: f64 = report_summary
        .parsed
        .iter()
        .filter_map(|report| report.elapsed_seconds)
        .sum();
    content.push_str(&format!("- Cheap gates: {} ms\n", cheap_ms));
    content.push_str(&format!("- Expensive gates: {} ms\n", expensive_ms));
    content.push_str(&format!(
        "- Reported worker elapsed seconds: {:.2}\n\n",
        worker_seconds
    ));

    content.push_str("## Commands\n\n");
    for result in results {
        content.push_str(&format!(
            "- {}: status {:?}, {} ms\n",
            result.label, result.status, result.duration_ms
        ));
        if let Some(details_path) = &result.details_path {
            content.push_str(&format!(
                "  - Timing detail: `{}`\n",
                display_path(project_dir, details_path)
            ));
        }
    }

    let changed_routes = sorted_unique(
        plan.commands
            .content_routes
            .iter()
            .chain(plan.commands.interactive_routes.iter())
            .cloned()
            .collect(),
    );
    let source_ids = sorted_unique(
        plan.batch
            .iter()
            .flat_map(|page| page.source_ids.iter().cloned())
            .collect(),
    );
    let widths = route_qa_widths();
    let commands = receipt_commands(project_dir, results);
    let superseded_failures = if ok {
        superseded_failure_receipts(project_dir, receipt_dir, "page-refresh", &json_path)
    } else {
        Vec::new()
    };
    let artifact_refs = closeout_artifact_refs(CloseoutArtifactInputs {
        workflow: "page-refresh",
        plan: &plan_display,
        route_args: None,
        report_dir: Some(&report_dir_display),
        report_summary: Some(&report_summary_display),
        markdown_receipt: &markdown_receipt,
        json_receipt: &json_receipt_path,
        changed_routes: &changed_routes,
        source_ids: &source_ids,
        commands: &commands,
    });
    let json_receipt = CloseoutReceiptJson {
        schema_version: "aipedia.closeout-receipt.v1".to_string(),
        workflow: "page-refresh".to_string(),
        status: if ok { "passed" } else { "failed" }.to_string(),
        generated_at,
        goal_id,
        run_id,
        residual_risks,
        next_actions,
        trace,
        artifact_refs,
        current_date: Some(plan.current_date.clone()),
        elapsed_ms: to_u64(total_duration_ms),
        plan: plan_display,
        route_args: None,
        report_dir: Some(report_dir_display),
        report_summary: Some(report_summary_display),
        markdown_receipt,
        changed_routes,
        source_ids,
        widths,
        commands,
        superseded_failures,
        system_progress: runner_system_progress(project_dir),
        input_freshness: runner_input_freshness(project_dir, "page-refresh"),
    };
    fs::write(&path, content).with_context(|| format!("could not write {}", path.display()))?;
    fs::write(&json_path, serde_json::to_string_pretty(&json_receipt)?)
        .with_context(|| format!("could not write {}", json_path.display()))?;
    println!("Receipt: {}", display_path(project_dir, &path));
    println!("Receipt JSON: {}", display_path(project_dir, &json_path));
    Ok(())
}

fn receipt_commands(project_dir: &Path, results: &[CommandResult]) -> Vec<CloseoutReceiptCommand> {
    results
        .iter()
        .map(|result| CloseoutReceiptCommand {
            label: result.label.clone(),
            status: result.status,
            interrupted: result.interrupted,
            elapsed_ms: to_u64(result.duration_ms),
            details_path: result
                .details_path
                .as_ref()
                .map(|path| display_path(project_dir, path)),
        })
        .collect()
}

struct CloseoutArtifactInputs<'a> {
    workflow: &'a str,
    plan: &'a str,
    route_args: Option<&'a str>,
    report_dir: Option<&'a str>,
    report_summary: Option<&'a str>,
    markdown_receipt: &'a str,
    json_receipt: &'a str,
    changed_routes: &'a [String],
    source_ids: &'a [String],
    commands: &'a [CloseoutReceiptCommand],
}

fn closeout_trace(
    workflow: &str,
    goal_id: &str,
    run_id: &str,
    generated_at: &str,
    duration_ms: u128,
) -> CloseoutTrace {
    let trace_id =
        closeout_env("AIPEDIA_TRACE_ID").unwrap_or_else(|| stable_trace_id(&[goal_id, run_id]));
    CloseoutTrace {
        trace_id,
        span_id: stable_trace_id(&["span", workflow, run_id, generated_at]),
        parent_span_id: closeout_env("AIPEDIA_PARENT_SPAN_ID").unwrap_or_default(),
        name: workflow.to_string(),
        started_at: generated_at.to_string(),
        ended_at: Utc::now().to_rfc3339(),
        duration_ms: to_u64(duration_ms),
    }
}

fn stable_trace_id(parts: &[&str]) -> String {
    let mut value = parts
        .iter()
        .filter(|part| !part.trim().is_empty())
        .copied()
        .collect::<Vec<_>>()
        .join(":");
    value = value
        .chars()
        .map(|ch| {
            if ch.is_ascii_alphanumeric() || matches!(ch, '_' | '-' | '.' | ':') {
                ch
            } else {
                '-'
            }
        })
        .collect::<String>()
        .trim_matches('-')
        .chars()
        .take(180)
        .collect();
    if value.is_empty() {
        "unscoped-trace".to_string()
    } else {
        value
    }
}

fn closeout_artifact_refs(inputs: CloseoutArtifactInputs<'_>) -> Vec<CloseoutArtifactRef> {
    let mut refs = Vec::new();
    refs.push(artifact_ref(
        "input",
        "plan",
        Some(inputs.plan),
        None,
        Some("Planner JSON used for this closeout."),
    ));
    if let Some(route_args) = inputs.route_args {
        refs.push(artifact_ref(
            "input",
            "route-args",
            Some(route_args),
            None,
            Some("Generated route QA argument file."),
        ));
    }
    if let Some(report_dir) = inputs.report_dir {
        refs.push(artifact_ref(
            "input",
            "worker-report-dir",
            Some(report_dir),
            None,
            Some("Worker report directory."),
        ));
    }
    if let Some(report_summary) = inputs.report_summary {
        refs.push(artifact_ref(
            "input",
            "worker-report-summary",
            Some(report_summary),
            None,
            Some("Parsed worker report summary."),
        ));
    }
    refs.push(artifact_ref(
        "output",
        "markdown-receipt",
        Some(inputs.markdown_receipt),
        None,
        Some("Human-readable closeout receipt."),
    ));
    refs.push(artifact_ref(
        "output",
        "json-receipt",
        Some(inputs.json_receipt),
        None,
        Some("Machine-readable closeout receipt."),
    ));
    for route in inputs.changed_routes {
        refs.push(artifact_ref(
            "route",
            "changed-route",
            None,
            Some(route.as_str()),
            Some(inputs.workflow),
        ));
    }
    for source_id in inputs.source_ids {
        refs.push(artifact_ref(
            "source",
            "source-id",
            None,
            Some(source_id.as_str()),
            Some(inputs.workflow),
        ));
    }
    for command in inputs.commands {
        let command_id = stable_trace_id(&[inputs.workflow, &command.label]);
        refs.push(artifact_ref(
            "embedded",
            "closeout-command",
            None,
            Some(command_id.as_str()),
            Some(&command.label),
        ));
        if let Some(details_path) = command.details_path.as_deref() {
            refs.push(artifact_ref(
                "output",
                "command-detail",
                Some(details_path),
                Some(command_id.as_str()),
                Some(&command.label),
            ));
        }
    }
    dedupe_artifact_refs(refs)
}

fn artifact_ref(
    role: &str,
    kind: &str,
    path: Option<&str>,
    id: Option<&str>,
    description: Option<&str>,
) -> CloseoutArtifactRef {
    CloseoutArtifactRef {
        role: role.to_string(),
        kind: kind.to_string(),
        path: path
            .filter(|value| !value.is_empty())
            .map(|value| value.to_string()),
        id: id
            .filter(|value| !value.is_empty())
            .map(|value| value.to_string()),
        description: description
            .filter(|value| !value.is_empty())
            .map(|value| value.to_string()),
    }
}

fn dedupe_artifact_refs(refs: Vec<CloseoutArtifactRef>) -> Vec<CloseoutArtifactRef> {
    let mut seen = BTreeSet::new();
    let mut deduped = Vec::new();
    for artifact in refs {
        let key = format!(
            "{}|{}|{}|{}",
            artifact.role,
            artifact.kind,
            artifact.path.clone().unwrap_or_default(),
            artifact.id.clone().unwrap_or_default()
        );
        if seen.insert(key) {
            deduped.push(artifact);
        }
    }
    deduped
}

fn closeout_goal_id() -> String {
    closeout_env("AIPEDIA_GOAL_ID").unwrap_or_else(|| "unscoped-goal".to_string())
}

fn closeout_run_id(workflow: &str, generated_at: &str) -> String {
    closeout_env("AIPEDIA_RUN_ID").unwrap_or_else(|| format!("{workflow}:{generated_at}"))
}

fn closeout_list(name: &str) -> Vec<String> {
    let Some(value) = closeout_env(name) else {
        return Vec::new();
    };
    value
        .lines()
        .flat_map(|line| line.split(";;"))
        .map(str::trim)
        .filter(|item| !item.is_empty())
        .map(str::to_string)
        .collect()
}

fn closeout_env(name: &str) -> Option<String> {
    std::env::var(name)
        .ok()
        .map(|value| value.trim().to_string())
        .filter(|value| !value.is_empty())
}

fn routes_from_route_args(input: &str) -> Vec<String> {
    let words = split_shell_words(input);
    let mut routes = Vec::new();
    let mut index = 0;
    while index < words.len() {
        if words[index] == "--route" {
            if let Some(route) = words.get(index + 1) {
                routes.push(route.clone());
            }
            index += 2;
            continue;
        }
        index += 1;
    }
    sorted_unique(routes)
}

fn route_qa_widths() -> Vec<u16> {
    vec![319, 360, 390, 430, 768, 1024, 1366]
}

fn sorted_unique(values: Vec<String>) -> Vec<String> {
    let mut set = BTreeSet::new();
    for value in values {
        let trimmed = value.trim();
        if !trimmed.is_empty() {
            set.insert(trimmed.to_string());
        }
    }
    set.into_iter().collect()
}

fn to_u64(value: u128) -> u64 {
    value.try_into().unwrap_or(u64::MAX)
}

fn superseded_failure_receipts(
    project_dir: &Path,
    receipt_dir: &Path,
    workflow: &str,
    superseded_by_path: &Path,
) -> Vec<SupersededFailureReceipt> {
    let mut failures = Vec::new();
    let Ok(entries) = fs::read_dir(receipt_dir) else {
        return failures;
    };
    for entry in entries.flatten() {
        let path = entry.path();
        if !path.extension().is_some_and(|ext| ext == "json") {
            continue;
        }
        let Ok(raw) = fs::read_to_string(&path) else {
            continue;
        };
        let Ok(value) = serde_json::from_str::<serde_json::Value>(&raw) else {
            continue;
        };
        let receipt_workflow = value
            .get("workflow")
            .and_then(|item| item.as_str())
            .unwrap_or_default();
        let status = value
            .get("status")
            .and_then(|item| item.as_str())
            .unwrap_or_default();
        if receipt_workflow != workflow || status != "failed" {
            continue;
        }
        let failed_command = value
            .get("commands")
            .and_then(|item| item.as_array())
            .and_then(|commands| {
                commands.iter().find(|command| {
                    command
                        .get("status")
                        .and_then(|status| status.as_i64())
                        .map_or(true, |status| status != 0)
                })
            });
        failures.push(SupersededFailureReceipt {
            receipt: display_path(project_dir, &path),
            superseded_by: display_path(project_dir, superseded_by_path),
            status: status.to_string(),
            generated_at: value
                .get("generated_at")
                .and_then(|item| item.as_str())
                .map(ToString::to_string),
            failed_command: failed_command
                .and_then(|command| command.get("label"))
                .and_then(|item| item.as_str())
                .map(ToString::to_string),
            failed_status: failed_command
                .and_then(|command| command.get("status"))
                .and_then(|item| item.as_i64())
                .and_then(|value| value.try_into().ok()),
            elapsed_ms: value.get("elapsed_ms").and_then(|item| item.as_u64()),
        });
    }
    failures.sort_by(|left, right| left.receipt.cmp(&right.receipt));
    failures
}

fn split_shell_words(input: &str) -> Vec<String> {
    input.split_whitespace().map(ToString::to_string).collect()
}

fn ensure_parent(path: &Path) -> Result<()> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)
            .with_context(|| format!("could not create {}", parent.display()))?;
    }
    Ok(())
}

fn resolve_project_path(project_dir: &Path, path: &Path) -> PathBuf {
    if path.is_absolute() {
        path.to_path_buf()
    } else {
        project_dir.join(path)
    }
}

fn display_path(project_dir: &Path, path: &Path) -> String {
    path.strip_prefix(project_dir)
        .unwrap_or(path)
        .to_string_lossy()
        .replace('\\', "/")
}

fn npm_bin() -> &'static str {
    if cfg!(windows) {
        "npm.cmd"
    } else {
        "npm"
    }
}

fn node_bin() -> &'static str {
    if cfg!(windows) {
        "node.exe"
    } else {
        "node"
    }
}

fn git_bin() -> &'static str {
    if cfg!(windows) {
        "git.exe"
    } else {
        "git"
    }
}

fn ensure_interrupt_handler() -> Result<()> {
    match INTERRUPT_HANDLER_INSTALL.get_or_init(|| {
        ctrlc::set_handler(|| {
            INTERRUPTED.store(true, Ordering::SeqCst);
        })
        .map_err(|error| error.to_string())
    }) {
        Ok(()) => Ok(()),
        Err(error) => bail!("failed to install runner interrupt handler: {}", error),
    }
}

fn status_text(status: ExitStatus) -> String {
    if let Some(code) = status.code() {
        return code.to_string();
    }
    if let Some(signal) = status_signal(status) {
        return format!("signal {}", signal);
    }
    "signal".to_string()
}

fn status_was_interrupted(status: ExitStatus) -> bool {
    status.code() == Some(130) || matches!(status_signal(status), Some(2 | 15))
}

#[cfg(unix)]
fn status_signal(status: ExitStatus) -> Option<i32> {
    use std::os::unix::process::ExitStatusExt;
    status.signal()
}

#[cfg(not(unix))]
fn status_signal(_status: ExitStatus) -> Option<i32> {
    None
}

fn runner_system_progress(project_dir: &Path) -> Option<serde_json::Value> {
    let script = project_dir.join("scripts/agent-system-progress-check.mjs");
    if !script.exists() {
        return None;
    }
    let script_display = display_path(project_dir, &script);
    let output = Command::new(node_bin())
        .arg(&script_display)
        .arg("--json")
        .arg("--project-dir=.")
        .current_dir(project_dir)
        .output()
        .ok()?;
    let mut value = serde_json::from_slice::<serde_json::Value>(&output.stdout).ok()?;
    if let Some(object) = value.as_object_mut() {
        object.insert(
            "project_dir".to_string(),
            serde_json::Value::String(".".to_string()),
        );
        object.insert(
            "command".to_string(),
            serde_json::Value::String(format!("node {} --json --project-dir=.", script_display)),
        );
        object.insert(
            "exit_code".to_string(),
            output
                .status
                .code()
                .map(|code| serde_json::Value::Number(code.into()))
                .unwrap_or(serde_json::Value::Null),
        );
    }
    Some(value)
}

fn runner_input_freshness(project_dir: &Path, workflow: &str) -> Option<serde_json::Value> {
    let script = project_dir.join("scripts/agent-input-freshness-receipt.mjs");
    if !script.exists() {
        return None;
    }
    let script_display = display_path(project_dir, &script);
    let output = Command::new(node_bin())
        .arg(&script_display)
        .arg("--workflow")
        .arg(workflow)
        .arg("--json")
        .arg("--project-dir=.")
        .current_dir(project_dir)
        .output()
        .ok()?;
    let mut value = serde_json::from_slice::<serde_json::Value>(&output.stdout).ok()?;
    if let Some(object) = value.as_object_mut() {
        object.insert(
            "project_dir".to_string(),
            serde_json::Value::String(".".to_string()),
        );
        object.insert(
            "command".to_string(),
            serde_json::Value::String(format!(
                "node {} --workflow {} --json --project-dir=.",
                script_display, workflow
            )),
        );
        object.insert(
            "exit_code".to_string(),
            output
                .status
                .code()
                .map(|code| serde_json::Value::Number(code.into()))
                .unwrap_or(serde_json::Value::Null),
        );
    }
    Some(value)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::time::{SystemTime, UNIX_EPOCH};

    fn temp_runner_dir(name: &str) -> PathBuf {
        let suffix = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("clock should be after unix epoch")
            .as_nanos();
        let path = std::env::temp_dir().join(format!(
            "aipedia-runner-{name}-{}-{suffix}",
            std::process::id()
        ));
        fs::create_dir_all(&path).expect("temp runner dir should be created");
        path
    }

    fn write_system_progress_script(project_dir: &Path) {
        let script_dir = project_dir.join("scripts");
        fs::create_dir_all(&script_dir).expect("script dir should exist");
        fs::write(
            script_dir.join("agent-system-progress-check.mjs"),
            r#"console.log(JSON.stringify({
  ok: true,
  mode: "system-progress-check",
  project_dir: process.cwd(),
  require_system_artifact: false,
  changed_paths: ["tools/aipedia-runner/src/main.rs"],
  system_artifacts: ["tools/aipedia-runner/src/main.rs"],
  content_artifacts: [],
  other_artifacts: [],
  has_system_artifact: true,
  content_only: false,
  next_action: "System artifact present or enforcement disabled."
}));"#,
        )
        .expect("system progress fixture should write");
    }

    fn write_input_freshness_script(project_dir: &Path) {
        let script_dir = project_dir.join("scripts");
        fs::create_dir_all(&script_dir).expect("script dir should exist");
        fs::write(
            script_dir.join("agent-input-freshness-receipt.mjs"),
            r#"const workflowIndex = process.argv.indexOf("--workflow");
const workflow = workflowIndex >= 0 ? process.argv[workflowIndex + 1] : "unknown";
console.log(JSON.stringify({
  ok: true,
  mode: "input-freshness-receipt",
  schema_version: "aipedia.input-freshness-receipt.v1",
  project_dir: process.cwd(),
  require_fresh: false,
  workflows: [{
    id: workflow,
    kind: `${workflow}-input`,
    ok: true,
    status: "fresh",
    next_action: ""
  }],
  summary: {
    workflow_count: 1,
    ok_count: 1,
    attention_count: 0,
    stale_count: 0
  },
  next_actions: []
}));"#,
        )
        .expect("input freshness fixture should write");
    }

    fn sample_page_plan(report_path: Option<String>) -> PagePlan {
        PagePlan {
            current_date: "2026-06-26".to_string(),
            batch: vec![Page {
                route: "/compare/build/".to_string(),
                page_type: "Static page".to_string(),
                path: "src/pages/compare/build.astro".to_string(),
                last_updated: "2026-06-01".to_string(),
                route_qa_risk: "interactive-noindex".to_string(),
                source_ids: vec!["compare-source".to_string()],
            }],
            commands: PageCommands {
                content_routes: vec!["/".to_string(), "/compare/".to_string()],
                interactive_routes: vec!["/compare/build/".to_string()],
                route_qa_args: "--route / --route /compare/".to_string(),
                interactive_route_qa_args: "--route /compare/build/".to_string(),
            },
            agent_briefs: Some(AgentBriefs {
                worker_briefs: vec![WorkerBrief {
                    id: "page-refresh-shard-01".to_string(),
                    title: "Shard 1".to_string(),
                    prompt: "Prompt".to_string(),
                    report_path,
                }],
                integrator_brief: None,
            }),
        }
    }

    fn sample_tool_plan() -> Plan {
        Plan {
            batch: vec![Tool {
                slug: "alpha-tool".to_string(),
                path: "src/content/tools/alpha-tool.md".to_string(),
                route: "/tools/alpha-tool/".to_string(),
                category_route: Some("/categories/ai-automation/".to_string()),
                source_ids: vec!["alpha-pricing".to_string()],
            }],
            agent_briefs: None,
        }
    }

    #[test]
    fn interrupted_pause_args_preserve_resume_boundary() {
        let previous_dirty = std::env::var("AIPEDIA_OBSERVED_DIRTY_BEFORE_AGENT").ok();
        std::env::set_var(
            "AIPEDIA_OBSERVED_DIRTY_BEFORE_AGENT",
            "src/content/tools/synthesia.md;;src/data/source-registry.json",
        );

        let args = interrupted_runner_pause_args(
            "tool-refresh",
            "typecheck",
            "2026-06-30T00:00:00Z",
            PathBuf::from("local/tmp/interrupted-pause.json"),
        );

        match previous_dirty {
            Some(value) => std::env::set_var("AIPEDIA_OBSERVED_DIRTY_BEFORE_AGENT", value),
            None => std::env::remove_var("AIPEDIA_OBSERVED_DIRTY_BEFORE_AGENT"),
        }

        assert_eq!(args.reason, "user");
        assert!(args
            .safe_resume_step
            .contains("interrupted tool-refresh command `typecheck`"));
        assert!(args
            .in_progress_step
            .contains("command `typecheck` was interrupted"));
        assert_eq!(
            args.next_command,
            vec!["npm run runner:tool-refresh:closeout".to_string()]
        );
        assert!(args
            .validation_done
            .contains(&"Detected interrupted runner command: typecheck.".to_string()));
        assert!(args
            .must_not_repeat
            .contains(&"Do not assume the interrupted command completed.".to_string()));
        assert!(args
            .blocked_on
            .contains(&"Interrupted runner command: typecheck.".to_string()));
        assert_eq!(
            args.observed_dirty_before_agent,
            vec![
                "src/content/tools/synthesia.md".to_string(),
                "src/data/source-registry.json".to_string()
            ]
        );
        assert!(args
            .run_id
            .as_deref()
            .expect("interrupted pause run id should exist")
            .contains("interrupted-pause"));
    }

    #[cfg(unix)]
    #[test]
    fn runner_command_marks_signal_exit_interrupted() {
        let dir = temp_runner_dir("signal-interrupt");
        let project_dir = dir.join("project");
        fs::create_dir_all(&project_dir).expect("project dir should exist");

        let result = run_command(
            &project_dir,
            "signal command",
            "sh",
            &["-c".to_string(), "kill -INT $$".to_string()],
            None,
            false,
        )
        .expect("signal command should run");

        assert_eq!(result.status, None);
        assert!(result.interrupted);

        fs::remove_dir_all(dir).ok();
    }

    #[test]
    fn receipt_commands_records_interrupted_flag() {
        let dir = temp_runner_dir("interrupted-command-receipt");
        let project_dir = dir.join("project");
        fs::create_dir_all(&project_dir).expect("project dir should exist");
        let commands = receipt_commands(
            &project_dir,
            &[CommandResult {
                label: "typecheck".to_string(),
                status: None,
                interrupted: true,
                duration_ms: 130,
                details_path: None,
            }],
        );

        assert_eq!(commands.len(), 1);
        assert_eq!(commands[0].label, "typecheck");
        assert_eq!(commands[0].status, None);
        assert!(commands[0].interrupted);

        fs::remove_dir_all(dir).ok();
    }

    fn sample_affiliate_plan() -> AffiliatePlan {
        AffiliatePlan {
            current_date: "2026-06-27".to_string(),
            clusters: vec![AffiliateCluster {
                id: "affiliate-alpha-tool".to_string(),
                primary_tool: "alpha-tool".to_string(),
                title: "Alpha Tool".to_string(),
                category: "ai-automation".to_string(),
                source_file: "src/content/tools/alpha-tool.md".to_string(),
                monetization_state: "live_affiliate".to_string(),
                affiliate_status: "approved".to_string(),
                affiliate_network: "partnerstack".to_string(),
                buyer_job: "Find the next Alpha Tool buyer-intent page.".to_string(),
                duplicate_intent_risk: "medium".to_string(),
                route_qa_risk: "commercial-high".to_string(),
                affected_routes: vec![
                    "/tools/alpha-tool/".to_string(),
                    "/guides/alpha-tool-pricing/".to_string(),
                    "/categories/ai-automation/".to_string(),
                ],
                parent_surfaces: vec!["/guides/".to_string(), "/tools/".to_string()],
            }],
            commands: Some(AffiliateCommands {
                cheap_gates: vec![
                    "npm run affiliate:conversion:inventory -- --json".to_string(),
                    "git diff --check".to_string(),
                ],
                future_rendered_closeout: vec![
                    "npm run typecheck".to_string(),
                    "npm run build:fast".to_string(),
                ],
            }),
            agent_briefs: Some(AgentBriefs {
                worker_briefs: vec![WorkerBrief {
                    id: "affiliate-worker-1".to_string(),
                    title: "Worker 1".to_string(),
                    prompt: "Prompt".to_string(),
                    report_path: Some("reports/affiliate-worker-1.json".to_string()),
                }],
                integrator_brief: None,
            }),
        }
    }

    fn sample_affiliate_report(status: &str) -> AffiliateWorkerReport {
        AffiliateWorkerReport {
            worker_id: "affiliate-worker-1".to_string(),
            elapsed_seconds: Some(10.0),
            owned_paths: vec!["src/content/tools/alpha-tool.md".to_string()],
            clusters: vec![AffiliateReportCluster {
                id: "affiliate-alpha-tool".to_string(),
                primary_tool: "alpha-tool".to_string(),
                status: status.to_string(),
                source_urls: vec!["https://example.com/pricing".to_string()],
                claim_receipts: vec![AffiliateClaimReceipt {
                    claim: "Alpha Tool Pro is the plan to verify.".to_string(),
                    path: "src/content/use-cases/example.md".to_string(),
                    source_url: "https://example.com/pricing".to_string(),
                    verified_at: "2026-06-27".to_string(),
                    confidence: "primary-confirmed".to_string(),
                    query: "Alpha Tool pricing June 2026".to_string(),
                    caveat: String::new(),
                }],
                commercial_cta_notes: vec![
                    "Approved affiliate CTA still needs disclosure.".to_string()
                ],
                parent_surface_notes: vec![
                    "Update /guides/ after content implementation.".to_string()
                ],
                duplicate_intent_notes: vec![
                    "Existing guide overlap is distinct by buyer job.".to_string()
                ],
                route_qa_risks: vec![
                    "Commercial mobile CTA should be route-QA checked.".to_string()
                ],
                checks: vec![WorkerReportCheck {
                    command: "npm run affiliate:conversion:inventory -- --json".to_string(),
                    status: "passed".to_string(),
                    notes: "Inventory checked.".to_string(),
                }],
                handoff_notes: "Ready for integrator review.".to_string(),
            }],
            handoff_notes: "Worker done.".to_string(),
        }
    }

    #[test]
    fn runner_pause_builds_validated_node_pause_commands() {
        let dir = temp_runner_dir("pause-command");
        let project_dir = dir.join("project");
        fs::create_dir_all(&project_dir).expect("project dir should exist");
        let args = PauseArgs {
            safe_resume_step: "Read the runner pause receipt.".to_string(),
            in_progress_step: "Wire runner pause command.".to_string(),
            reason: "handoff".to_string(),
            goal_id: Some("meta-goal".to_string()),
            run_id: Some("pause-run".to_string()),
            source_cutoff: Some("2026-06-30".to_string()),
            out: Some(PathBuf::from("local/tmp/runner-pause.json")),
            next_command: vec!["cargo test".to_string()],
            validation_done: vec!["cargo fmt".to_string()],
            validation_pending: vec!["check:quick".to_string()],
            must_not_repeat: vec!["Do not stage unrelated content WIP.".to_string()],
            observed_dirty_before_agent: vec!["src/content/tools/synthesia.md".to_string()],
            open_question: vec!["Should runner pauses get trace refs later?".to_string()],
            blocked_on: vec!["manual stop".to_string()],
        };
        let out_path = runner_pause_out_path(&project_dir, &args);
        let out_display = display_path(&project_dir, &out_path);
        let write_args =
            runner_pause_write_args(&args, "meta-goal", "pause-run", "2026-06-30", &out_display);
        let validate_args = runner_pause_validate_args(&out_display);
        let has_write_pair = |flag: &str, value: &str| {
            write_args
                .windows(2)
                .any(|pair| pair[0] == flag && pair[1] == value)
        };

        assert_eq!(out_display, "local/tmp/runner-pause.json");
        assert!(has_write_pair("--goal-id", "meta-goal"));
        assert!(has_write_pair(
            "--safe-resume-step",
            "Read the runner pause receipt."
        ));
        assert!(has_write_pair(
            "--observed-dirty-before-agent",
            "src/content/tools/synthesia.md"
        ));
        assert!(has_write_pair(
            "--must-not-repeat",
            "Do not stage unrelated content WIP."
        ));
        let expected_validate_args: Vec<String> = vec![
            "--silent",
            "run",
            "agent:pause-receipt",
            "--",
            "--validate",
            "local/tmp/runner-pause.json",
            "--json",
        ]
        .into_iter()
        .map(String::from)
        .collect();
        assert_eq!(validate_args, expected_validate_args);

        fs::remove_dir_all(dir).ok();
    }

    #[test]
    fn writes_page_route_args_from_planner_policy() {
        let dir = temp_runner_dir("route-args");
        let content_path = dir.join("content.txt");
        let interactive_path = dir.join("interactive.txt");
        let plan = sample_page_plan(None);

        write_page_route_args(&plan, &content_path, &interactive_path)
            .expect("route args should write");

        assert_eq!(
            fs::read_to_string(content_path).expect("content route args should exist"),
            "--route / --route /compare/"
        );
        assert_eq!(
            fs::read_to_string(interactive_path).expect("interactive route args should exist"),
            "--route /compare/build/"
        );

        fs::remove_dir_all(dir).ok();
    }

    #[test]
    fn tool_closeout_writes_structured_receipt_json() {
        let dir = temp_runner_dir("tool-receipt");
        let project_dir = dir.join("project");
        let receipt_dir = project_dir.join("receipts");
        fs::create_dir_all(&receipt_dir).expect("receipt dir should exist");
        write_system_progress_script(&project_dir);
        write_input_freshness_script(&project_dir);
        let plan_path = project_dir.join("tool-refresh-batch.json");
        let route_args_path = project_dir.join("route-args.txt");
        fs::write(
            &route_args_path,
            "--route /tools/alpha-tool/ --route /categories/ai-automation/",
        )
        .expect("route args should write");
        let plan = sample_tool_plan();
        let results = vec![CommandResult {
            label: "date consistency changed".to_string(),
            status: Some(0),
            interrupted: false,
            duration_ms: 25,
            details_path: None,
        }];

        write_receipt(
            &project_dir,
            &receipt_dir,
            &plan_path,
            &route_args_path,
            &plan,
            &results,
            true,
            250,
        )
        .expect("receipt should write");

        let json_path = fs::read_dir(&receipt_dir)
            .expect("receipt dir should read")
            .flatten()
            .map(|entry| entry.path())
            .find(|path| {
                path.to_string_lossy()
                    .ends_with("-tool-refresh-closeout.json")
            })
            .expect("json receipt should exist");
        let receipt: serde_json::Value =
            serde_json::from_str(&fs::read_to_string(json_path).expect("json receipt should read"))
                .expect("json receipt should parse");

        assert_eq!(receipt["schema_version"], "aipedia.closeout-receipt.v1");
        assert_eq!(receipt["workflow"], "tool-refresh");
        assert_eq!(receipt["status"], "passed");
        assert!(!receipt["goal_id"]
            .as_str()
            .expect("goal id should be a string")
            .is_empty());
        assert!(!receipt["run_id"]
            .as_str()
            .expect("run id should be a string")
            .is_empty());
        assert!(receipt["residual_risks"]
            .as_array()
            .expect("residual risks should be an array")
            .is_empty());
        assert!(receipt["next_actions"]
            .as_array()
            .expect("next actions should be an array")
            .is_empty());
        assert_eq!(receipt["trace"]["name"], "tool-refresh");
        assert!(receipt["trace"]["trace_id"]
            .as_str()
            .expect("trace id should be a string")
            .contains("tool-refresh"));
        assert!(receipt["artifact_refs"]
            .as_array()
            .expect("artifact refs should be an array")
            .iter()
            .any(|artifact| artifact["kind"] == "plan" && artifact["role"] == "input"));
        assert!(receipt["artifact_refs"]
            .as_array()
            .expect("artifact refs should be an array")
            .iter()
            .any(|artifact| artifact["kind"] == "json-receipt" && artifact["role"] == "output"));
        assert_eq!(receipt["elapsed_ms"], 250);
        assert!(receipt["changed_routes"]
            .as_array()
            .expect("routes should be an array")
            .iter()
            .any(|route| route.as_str() == Some("/tools/alpha-tool/")));
        assert!(receipt["source_ids"]
            .as_array()
            .expect("source IDs should be an array")
            .iter()
            .any(|source_id| source_id.as_str() == Some("alpha-pricing")));
        assert!(receipt["widths"]
            .as_array()
            .expect("widths should be an array")
            .iter()
            .any(|width| width.as_u64() == Some(319)));
        assert_eq!(receipt["system_progress"]["project_dir"], ".");
        assert_eq!(receipt["system_progress"]["has_system_artifact"], true);
        assert_eq!(
            receipt["system_progress"]["command"],
            "node scripts/agent-system-progress-check.mjs --json --project-dir=."
        );
        assert_eq!(
            receipt["input_freshness"]["schema_version"],
            "aipedia.input-freshness-receipt.v1"
        );
        assert_eq!(
            receipt["input_freshness"]["workflows"][0]["id"],
            "tool-refresh"
        );
        assert_eq!(
            receipt["input_freshness"]["command"],
            "node scripts/agent-input-freshness-receipt.mjs --workflow tool-refresh --json --project-dir=."
        );

        fs::remove_dir_all(dir).ok();
    }

    #[test]
    fn page_closeout_json_records_routes_widths_sources_and_superseded_failures() {
        let dir = temp_runner_dir("page-receipt");
        let project_dir = dir.join("project");
        let receipt_dir = project_dir.join("receipts");
        let report_dir = project_dir.join("reports");
        fs::create_dir_all(&receipt_dir).expect("receipt dir should exist");
        fs::create_dir_all(&report_dir).expect("report dir should exist");
        write_system_progress_script(&project_dir);
        write_input_freshness_script(&project_dir);
        fs::write(
            receipt_dir.join("2026-06-28T00-00-00Z-page-refresh-closeout.json"),
            r#"{"schema_version":"aipedia.closeout-receipt.v1","workflow":"page-refresh","status":"failed","generated_at":"2026-06-28T00:00:00Z","elapsed_ms":321,"commands":[{"label":"page source health","status":1,"elapsed_ms":123,"details_path":"timings/source-health.json"}]}"#,
        )
        .expect("old failed receipt should write");
        let plan_path = project_dir.join("page-refresh-batch.json");
        let report_summary_path = project_dir.join("page-report-summary.md");
        let plan = sample_page_plan(None);
        let report_summary = ReportSummary {
            expected: 0,
            parsed: Vec::new(),
            missing: Vec::new(),
            invalid: Vec::new(),
        };
        let results = vec![CommandResult {
            label: "content route qa".to_string(),
            status: Some(0),
            interrupted: false,
            duration_ms: 100,
            details_path: Some(project_dir.join("timings/content-route-qa.json")),
        }];

        write_page_receipt(
            &project_dir,
            &receipt_dir,
            &plan_path,
            &report_dir,
            &report_summary_path,
            &plan,
            &report_summary,
            &results,
            true,
            500,
        )
        .expect("page receipt should write");

        let json_path = fs::read_dir(&receipt_dir)
            .expect("receipt dir should read")
            .flatten()
            .map(|entry| entry.path())
            .find(|path| {
                let name = path.file_name().unwrap_or_default().to_string_lossy();
                name.ends_with("-page-refresh-closeout.json")
                    && !name.starts_with("2026-06-28T00-00-00Z")
            })
            .expect("new json receipt should exist");
        let receipt: serde_json::Value =
            serde_json::from_str(&fs::read_to_string(json_path).expect("json receipt should read"))
                .expect("json receipt should parse");

        assert_eq!(receipt["workflow"], "page-refresh");
        assert!(!receipt["goal_id"]
            .as_str()
            .expect("goal id should be a string")
            .is_empty());
        assert!(!receipt["run_id"]
            .as_str()
            .expect("run id should be a string")
            .is_empty());
        assert!(receipt["residual_risks"]
            .as_array()
            .expect("residual risks should be an array")
            .is_empty());
        assert!(receipt["next_actions"]
            .as_array()
            .expect("next actions should be an array")
            .is_empty());
        assert_eq!(receipt["trace"]["name"], "page-refresh");
        assert!(receipt["artifact_refs"]
            .as_array()
            .expect("artifact refs should be an array")
            .iter()
            .any(|artifact| artifact["kind"] == "worker-report-summary"
                && artifact["role"] == "input"));
        assert!(receipt["artifact_refs"]
            .as_array()
            .expect("artifact refs should be an array")
            .iter()
            .any(|artifact| artifact["kind"] == "changed-route" && artifact["role"] == "route"));
        assert_eq!(receipt["current_date"], "2026-06-26");
        assert!(receipt["changed_routes"]
            .as_array()
            .expect("routes should be an array")
            .iter()
            .any(|route| route.as_str() == Some("/compare/build/")));
        assert!(receipt["source_ids"]
            .as_array()
            .expect("source IDs should be an array")
            .iter()
            .any(|source_id| source_id.as_str() == Some("compare-source")));
        assert!(receipt["widths"]
            .as_array()
            .expect("widths should be an array")
            .iter()
            .any(|width| width.as_u64() == Some(1366)));
        assert_eq!(
            receipt["superseded_failures"]
                .as_array()
                .expect("superseded failures should be an array")
                .len(),
            1
        );
        let superseded = receipt["superseded_failures"][0]
            .as_object()
            .expect("superseded failure should be an object");
        assert_eq!(
            superseded
                .get("failed_command")
                .and_then(|value| value.as_str()),
            Some("page source health")
        );
        assert_eq!(
            superseded
                .get("failed_status")
                .and_then(|value| value.as_i64()),
            Some(1)
        );
        assert_eq!(
            superseded
                .get("elapsed_ms")
                .and_then(|value| value.as_u64()),
            Some(321)
        );
        assert!(superseded
            .get("superseded_by")
            .and_then(|value| value.as_str())
            .is_some_and(|value| value.ends_with("-page-refresh-closeout.json")));
        assert_eq!(receipt["system_progress"]["project_dir"], ".");
        assert_eq!(receipt["system_progress"]["has_system_artifact"], true);
        assert_eq!(
            receipt["input_freshness"]["schema_version"],
            "aipedia.input-freshness-receipt.v1"
        );
        assert_eq!(
            receipt["input_freshness"]["workflows"][0]["id"],
            "page-refresh"
        );

        fs::remove_dir_all(dir).ok();
    }

    #[test]
    fn reads_page_worker_reports_and_counts_missing() {
        let dir = temp_runner_dir("reports");
        let project_dir = dir.join("project");
        let report_dir = project_dir.join("reports");
        fs::create_dir_all(&report_dir).expect("report dir should be created");
        let report_path = report_dir.join("page-refresh-shard-01.json");
        fs::write(
            &report_path,
            r#"{
  "shard_id": "page-refresh-shard-01",
  "elapsed_seconds": 12.5,
  "changed_paths": ["src/pages/example.astro"],
  "pages": [{
    "route": "/example/",
    "path": "src/pages/example.astro",
    "status": "done",
    "elapsed_seconds": 12.5,
    "source_urls": ["https://example.com"],
    "source_confidence": ["primary-confirmed"],
    "caveats": [],
    "parent_surfaces": ["/answers/"],
    "route_qa_risks": ["answer-seo"],
    "notes": "ok"
  }],
  "checks": [{
    "command": "node scripts/check-frontmatter.mjs --changed",
    "status": "passed",
    "notes": "ok"
  }],
  "optimization_notes": ["Shard size was fine."]
}
"#,
        )
        .expect("worker report should be written");
        let plan = sample_page_plan(Some("reports/page-refresh-shard-01.json".to_string()));

        let summary = read_page_reports(&project_dir, &plan, &report_dir, false)
            .expect("report should parse");

        assert_eq!(summary.expected, 1);
        assert_eq!(summary.parsed.len(), 1);
        assert!(summary.missing.is_empty());
        assert!(summary.invalid.is_empty());
        assert_eq!(summary.parsed[0].pages[0].source_urls.len(), 1);
        let hints = parent_surface_hints(&summary);
        assert_eq!(
            hints.get("/answers/").expect("parent hint should exist")[0],
            "/example/"
        );

        fs::remove_dir_all(dir).ok();
    }

    #[test]
    fn pending_affiliate_scaffolds_do_not_fail_validation() {
        let plan = sample_affiliate_plan();
        let mut report = sample_affiliate_report("pending");
        report.clusters[0].claim_receipts = vec![AffiliateClaimReceipt {
            claim: String::new(),
            path: String::new(),
            source_url: String::new(),
            verified_at: String::new(),
            confidence: String::new(),
            query: String::new(),
            caveat: String::new(),
        }];
        report.clusters[0].commercial_cta_notes.clear();
        report.clusters[0].parent_surface_notes.clear();
        report.clusters[0].duplicate_intent_notes.clear();
        report.clusters[0].checks.clear();

        let issues = validate_affiliate_worker_report(&plan, &report);

        assert!(issues.is_empty(), "{issues:?}");
    }

    #[test]
    fn strict_affiliate_validation_flags_incomplete_completed_reports() {
        let plan = sample_affiliate_plan();
        let mut report = sample_affiliate_report("complete");
        report.clusters[0].claim_receipts = vec![AffiliateClaimReceipt {
            claim: "Needs current pricing.".to_string(),
            path: String::new(),
            source_url: String::new(),
            verified_at: String::new(),
            confidence: "account-gated".to_string(),
            query: "Alpha Tool pricing June 2026".to_string(),
            caveat: String::new(),
        }];
        report.clusters[0].commercial_cta_notes.clear();
        report.clusters[0].parent_surface_notes.clear();
        report.clusters[0].duplicate_intent_notes.clear();
        report.clusters[0].checks = vec![WorkerReportCheck {
            command: "npm run affiliate:conversion:inventory -- --json".to_string(),
            status: "failed".to_string(),
            notes: String::new(),
        }];

        let issues = validate_affiliate_worker_report(&plan, &report);

        assert!(issues.iter().any(|issue| issue.contains("empty path")));
        assert!(issues
            .iter()
            .any(|issue| issue.contains("empty source_url")));
        assert!(issues
            .iter()
            .any(|issue| issue.contains("empty verified_at")));
        assert!(issues.iter().any(|issue| issue.contains("has no caveat")));
        assert!(issues
            .iter()
            .any(|issue| issue.contains("duplicate_intent_notes")));
        assert!(issues
            .iter()
            .any(|issue| issue.contains("parent_surface_notes")));
        assert!(issues
            .iter()
            .any(|issue| issue.contains("commercial_cta_notes")));
        assert!(issues
            .iter()
            .any(|issue| issue.contains("not passed but has no notes")));
    }

    #[test]
    fn strict_affiliate_validation_accepts_complete_evidence() {
        let plan = sample_affiliate_plan();
        let report = sample_affiliate_report("complete");

        let issues = validate_affiliate_worker_report(&plan, &report);

        assert!(issues.is_empty(), "{issues:?}");
    }

    #[test]
    fn affiliate_handoff_does_not_select_pending_scaffolds() {
        let plan = sample_affiliate_plan();
        let report = sample_affiliate_report("pending");
        let summary = AffiliateReportSummary {
            expected: 1,
            parsed: vec![report],
            missing: Vec::new(),
            invalid: Vec::new(),
            validation_issues: Vec::new(),
        };

        let ready = implementation_ready_affiliate_clusters(&plan, &summary);

        assert!(ready.is_empty());
    }

    #[test]
    fn affiliate_handoff_writes_reviewer_ready_patch_plan() {
        let dir = temp_runner_dir("affiliate-handoff");
        let project_dir = dir.join("project");
        fs::create_dir_all(&project_dir).expect("project dir should exist");
        let out_path = project_dir.join("handoff.md");
        let json_path = project_dir.join("handoff.json");
        let plan_path = project_dir.join("affiliate-conversion-plan.json");
        let summary_path = project_dir.join("affiliate-report-summary.md");
        let plan = sample_affiliate_plan();
        let report = sample_affiliate_report("complete");
        let summary = AffiliateReportSummary {
            expected: 1,
            parsed: vec![report],
            missing: Vec::new(),
            invalid: Vec::new(),
            validation_issues: Vec::new(),
        };

        write_affiliate_handoff(
            &project_dir,
            &plan_path,
            &summary_path,
            &plan,
            &summary,
            &out_path,
            Some(&json_path),
        )
        .expect("handoff should write");
        let content = fs::read_to_string(&out_path).expect("handoff should be readable");
        let receipt: serde_json::Value = serde_json::from_str(
            &fs::read_to_string(&json_path).expect("handoff JSON should be readable"),
        )
        .expect("handoff JSON should parse");

        assert!(content.contains("Affiliate Conversion Implementation Handoff"));
        assert!(content.contains("Selected implementation clusters: 1"));
        assert!(content.contains("Alpha Tool Pro is the plan to verify."));
        assert!(content.contains("Approved affiliate CTA still needs disclosure."));
        assert!(content.contains("Existing guide overlap is distinct by buyer job."));
        assert!(content.contains("--route /guides/alpha-tool-pricing/"));
        assert!(content.contains("npm run runner:affiliate-conversion:reports -- --strict"));
        assert!(content.contains("Workers must not edit `PAGE_REFRESH_LEDGER.md`"));
        assert_eq!(
            receipt["schema_version"],
            "aipedia.affiliate-handoff-receipt.v1"
        );
        assert_eq!(receipt["workflow"], "affiliate-conversion-handoff");
        assert_eq!(receipt["selected_cluster_count"], 1);
        assert_eq!(receipt["claim_receipt_count"], 1);
        assert!(receipt["verification_gates"]
            .as_array()
            .expect("verification gates should be an array")
            .iter()
            .any(|gate| gate
                .as_str()
                .expect("gate should be a string")
                .contains("runner:affiliate-conversion:reports -- --strict")));
        assert!(receipt["no_edit_boundaries"]
            .as_array()
            .expect("no-edit boundaries should be an array")
            .iter()
            .any(|boundary| boundary
                .as_str()
                .expect("boundary should be a string")
                .contains("PAGE_REFRESH_LEDGER.md")));

        fs::remove_dir_all(dir).ok();
    }
}
