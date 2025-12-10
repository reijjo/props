use axum::{
    Json,
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;

use crate::{app::AppState, models::nba_api::NbaTeamsList, utils::python::run_python_script};

pub async fn get_teams_list(State(state): State<AppState>) -> Response {
    let output = match run_python_script(&state.config.project_root, "fetch_teams.py", &[]).await {
        Ok(out) => out,
        Err(e) => {
            tracing::error!("Python error: {e}");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({"error": "Failed to get teams"})),
            )
                .into_response();
        }
    };

    let data: NbaTeamsList = match serde_json::from_str(&output) {
        Ok(d) => d,
        Err(e) => {
            tracing::error!("Invalid JSON from Python: {e}");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({"error": "Invalid teams data"})),
            )
                .into_response();
        }
    };

    (StatusCode::OK, Json(data)).into_response()
}
