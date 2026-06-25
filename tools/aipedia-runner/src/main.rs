use anyhow::{bail, Context, Result};
use chrono::Utc;
use clap::{Parser, Subcommand};
use serde::Deserialize;
use std::collections::BTreeSet;
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

fn run_command(
    project_dir: &Path,
    label: &str,
    program: &str,
    args: &[String],
    details_path: Option<PathBuf>,
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
    let status = Command::new(program)
        .args(args)
        .current_dir(project_dir)
        .stdin(Stdio::inherit())
        .stdout(Stdio::inherit())
        .stderr(Stdio::inherit())
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
    let raw = fs::read(path).with_context(|| format!("could not read {}", path.display()))?;
    serde_json::from_slice(&raw)
        .with_context(|| format!("could not parse planner JSON {}", path.display()))
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

fn status_text(status: ExitStatus) -> String {
    status
        .code()
        .map(|code| code.to_string())
        .unwrap_or_else(|| "signal".to_string())
}
