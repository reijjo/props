use tokio::{
    process::Command,
    time::{Duration, timeout},
};

pub async fn run_python_script(
    project_root: &str,
    script_name: &str,
    args: &[&str],
) -> Result<String, String> {
    let python_exe = format!("{}/python/.venv/bin/python3", project_root);
    let script_path = format!("{}/python/{}", project_root, script_name);

    let cmd_future = async {
        Command::new(&python_exe)
            .arg(&script_path)
            .args(args)
            .current_dir(project_root)
            .output()
            .await
    };

    let output = timeout(Duration::from_secs(30), cmd_future)
        .await
        .map_err(|_| "Python script timed out after 30 seconds".to_string())?
        .map_err(|e| format!("Failed to start Python process: {e}"))?;

    if !output.status.success() {
        let err = String::from_utf8_lossy(&output.stderr);
        return Err(format!(
            "Python script failed (exit code {}): {err}",
            output.status
        ));
    }

    String::from_utf8(output.stdout).map_err(|e| format!("Python output was not valid UTF-8: {e}"))
}
