use anyhow::{bail, Context, Result};
use chrono::Utc;
use clap::{Parser, Subcommand};
use serde::Deserialize;
use std::collections::{BTreeMap, BTreeSet};
use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::process::{Command, ExitStatus, Stdio};
use std::time::Instant;

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
    duration_ms: u128,
    details_path: Option<PathBuf>,
}

#[derive(Debug, Deserialize)]
struct PagePlan {
    current_date: String,
    batch: Vec<Page>,
    commands: PageCommands,
    agent_briefs: Option<AgentBriefs>,
}

#[derive(Debug, Deserialize)]
struct Page {
    route: String,
    #[serde(rename = "type")]
    page_type: String,
    path: String,
    last_updated: String,
    route_qa_risk: String,
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
    }
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
            write_receipt(
                project_dir,
                &receipt_dir,
                &plan_path,
                &route_args_path,
                &results,
                false,
                closeout_start.elapsed().as_millis(),
            )?;
            bail!("closeout stopped after failed command: {}", label);
        }
    }

    write_receipt(
        project_dir,
        &receipt_dir,
        &plan_path,
        &route_args_path,
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
            duration_ms: 0,
            details_path,
        });
    }

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
    let duration_ms = start.elapsed().as_millis();
    println!(
        "<== {}: {}ms status {}",
        label,
        duration_ms,
        status_text(status)
    );

    Ok(CommandResult {
        label: label.to_string(),
        status: status.code(),
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

    let total_worker_seconds: f64 = summary
        .parsed
        .iter()
        .filter_map(|report| report.elapsed_seconds)
        .sum();
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
    results: &[CommandResult],
    ok: bool,
    total_duration_ms: u128,
) -> Result<()> {
    let timestamp = Utc::now().format("%Y-%m-%dT%H-%M-%SZ");
    let path = receipt_dir.join(format!("{}-tool-refresh-closeout.md", timestamp));
    let mut content = String::new();
    content.push_str("# AiPedia Runner Tool Refresh Closeout\n\n");
    content.push_str(&format!(
        "- Status: {}\n",
        if ok { "passed" } else { "failed" }
    ));
    content.push_str(&format!("- Generated: {}\n", Utc::now().to_rfc3339()));
    content.push_str(&format!(
        "- Plan: `{}`\n",
        display_path(project_dir, plan_path)
    ));
    content.push_str(&format!(
        "- Route args: `{}`\n\n",
        display_path(project_dir, route_args_path)
    ));
    content.push_str("## Timing\n\n");
    content.push_str(&format!("- Total closeout: {} ms\n", total_duration_ms));
    let cheap_ms: u128 = results
        .iter()
        .filter(|result| {
            matches!(
                result.label.as_str(),
                "ledger generate" | "ledger check" | "tool refresh grouped check"
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
    fs::write(&path, content).with_context(|| format!("could not write {}", path.display()))?;
    println!("Receipt: {}", display_path(project_dir, &path));
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
    let timestamp = Utc::now().format("%Y-%m-%dT%H-%M-%SZ");
    let path = receipt_dir.join(format!("{}-page-refresh-closeout.md", timestamp));
    let mut content = String::new();
    content.push_str("# AiPedia Runner Page Refresh Closeout\n\n");
    content.push_str(&format!(
        "- Status: {}\n",
        if ok { "passed" } else { "failed" }
    ));
    content.push_str(&format!("- Generated: {}\n", Utc::now().to_rfc3339()));
    content.push_str(&format!("- Current date: {}\n", plan.current_date));
    content.push_str(&format!(
        "- Plan: `{}`\n",
        display_path(project_dir, plan_path)
    ));
    content.push_str(&format!(
        "- Report dir: `{}`\n",
        display_path(project_dir, report_dir)
    ));
    content.push_str(&format!(
        "- Worker report summary: `{}`\n\n",
        display_path(project_dir, report_summary_path)
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

    fs::write(&path, content).with_context(|| format!("could not write {}", path.display()))?;
    println!("Receipt: {}", display_path(project_dir, &path));
    Ok(())
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

fn status_text(status: ExitStatus) -> String {
    status
        .code()
        .map(|code| code.to_string())
        .unwrap_or_else(|| "signal".to_string())
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

    fn sample_page_plan(report_path: Option<String>) -> PagePlan {
        PagePlan {
            current_date: "2026-06-26".to_string(),
            batch: vec![Page {
                route: "/compare/build/".to_string(),
                page_type: "Static page".to_string(),
                path: "src/pages/compare/build.astro".to_string(),
                last_updated: "2026-06-01".to_string(),
                route_qa_risk: "interactive-noindex".to_string(),
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
}
