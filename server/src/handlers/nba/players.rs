use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;

use crate::{
    app::AppState,
    cache::keys::{TEAM_DETAILS_TTL, nba_player_details_key},
};

////////////////////////////////
// GET /nba/players/:id
// Gets player details
pub async fn get_player_by_id(Path(id): Path<i64>, State(state): State<AppState>) -> Response {
    tracing::info!("Fetching player details by ID: {}", id);

    let cache_key = nba_player_details_key(id);

    if let Some(cached) = state.json_cache.get(&cache_key, TEAM_DETAILS_TTL).await {
        tracing::info!("Cache HIT: {}", cache_key);
        return (StatusCode::OK, Json(cached)).into_response();
    }

    let data = json!({"WOHOO": "Player id route workin"});

    let response_json = json!(data);
    state.json_cache.set(cache_key, response_json.clone()).await;

    (StatusCode::OK, Json(response_json)).into_response()
}
