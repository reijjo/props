use tokio::process::Command;

pub async fn run_python_script(
    project_root: &str,
    script_name: &str,
    args: &[&str],
) -> Result<String, String> {
    let python_exe = format!("{}/python/.venv/bin/python3", project_root);
    let script_path = format!("{}/python/{}", project_root, script_name);

    let output = Command::new(&python_exe)
        .arg(&script_path)
        .args(args)
        .current_dir(project_root)
        .output()
        .await
        .map_err(|e| format!("Failed to start Python: {e}"))?;

    if !output.status.success() {
        let err = String::from_utf8_lossy(&output.stderr);
        return Err(format!("Python script failed: {err}"));
    }

    String::from_utf8(output.stdout).map_err(|e| format!("Invalid UTF-8 from Python: {e}"))
}
