use axum::{
    Json,
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;

use crate::app::AppState;
use crate::{models::nba_api::Scoreboard, utils::python::run_python_script};

pub async fn get_scoreboard(State(state): State<AppState>) -> Response {
    let output = match run_python_script(&state.config.project_root, "scoreboard.py", &[]).await {
        Ok(out) => out,
        Err(e) => {
            tracing::error!("Python scoreboard error: {e}");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Failed to get todays scoreboard"})),
            )
                .into_response();
        }
    };

    let data: Scoreboard = match serde_json::from_str(&output) {
        Ok(scores) => scores,
        Err(e) => {
            tracing::error!("Invalid scoreboad Json from python: {e}");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Invalid scoreboard data."})),
            )
                .into_response();
        }
    };

    (StatusCode::OK, Json(data)).into_response()
}
