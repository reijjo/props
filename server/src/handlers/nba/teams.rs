use axum::{
    Json,
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;

use crate::{
    app::AppState,
    cache::keys::{TEAMS_TTL, nba_teams_key},
    models::nba_api::NbaTeamsList,
    utils::python::run_python_script,
};

pub async fn get_teams_list(State(state): State<AppState>) -> Response {
    let cache_key = nba_teams_key();

    if let Some(cached) = state.json_cache.get(&cache_key, TEAMS_TTL).await {
        tracing::info!("Cache HIT: {}", cache_key);
        return (StatusCode::OK, Json(cached)).into_response();
    }

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

    let response_json = json!(data);
    state.json_cache.set(cache_key, response_json.clone()).await;

    (StatusCode::OK, Json(response_json)).into_response()
}
