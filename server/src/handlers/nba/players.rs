use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;

use crate::{
    app::AppState,
    cache::keys::{PLAYER_DETAILS_TTL, nba_player_details_key},
    models::nba_api::NbaPlayerLatestGames,
    utils::python::run_python_script,
};

////////////////////////////////
// GET /nba/players/:id
// Gets player details
pub async fn get_player_by_id(Path(id): Path<i64>, State(state): State<AppState>) -> Response {
    tracing::info!("Fetching player details by ID: {}", id);

    let cache_key = nba_player_details_key(id);

    if let Some(cached) = state.json_cache.get(&cache_key, PLAYER_DETAILS_TTL).await {
        tracing::info!("Cache HIT: {}", cache_key);
        return (StatusCode::OK, Json(cached)).into_response();
    }

    let output = match run_python_script(
        &state.config.project_root,
        "fetch_player_latest_games.py",
        &[&id.to_string()],
    )
    .await
    {
        Ok(out) => out,
        Err(e) => {
            tracing::error!("Python error: {e}");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({"error": "Failed to get player details"})),
            )
                .into_response();
        }
    };

    let data: NbaPlayerLatestGames = match serde_json::from_str(&output) {
        Ok(d) => d,
        Err(e) => {
            tracing::error!("Invalid JSON from Python: {e}");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({"error": "Invalid player data"})),
            )
                .into_response();
        }
    };

    let response_json = json!(data);
    state.json_cache.set(cache_key, response_json.clone()).await;

    (StatusCode::OK, Json(response_json)).into_response()
}
