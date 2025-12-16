use axum::{
    Json,
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;

use crate::{
    app::AppState,
    cache::keys::{SCOREBOARD_TTL, nba_scoreboard_key},
};
use crate::{models::nba_api::Scoreboard, utils::python::run_python_script};

pub async fn get_scoreboard(State(state): State<AppState>) -> Response {
    let cache_key = nba_scoreboard_key();

    if let Some(cached) = state.json_cache.get(&cache_key, SCOREBOARD_TTL).await {
        tracing::info!("Cache HIT: {}", cache_key);
        return (StatusCode::OK, Json(cached)).into_response();
    }

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
            tracing::error!("Invalid scoreboad JSON from python: {e}");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Invalid scoreboard data."})),
            )
                .into_response();
        }
    };

    let response_json = json!(data.games);
    state.json_cache.set(cache_key, response_json.clone()).await;

    (StatusCode::OK, Json(response_json)).into_response()
}
