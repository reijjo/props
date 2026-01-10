use std::collections::HashMap;

use axum::{
    Json,
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;

use crate::{
    app::AppState,
    cache::keys::{INJURY_TTL, nba_injury_key},
    models::nba_api::{NbaInjury, NbaInjuryDto},
    utils::python::run_python_script,
};

// GET /nba/injuries
// Gets the newest official injury report
pub async fn get_injuries(State(state): State<AppState>) -> Response {
    let cache_key = nba_injury_key();

    if let Some(cached) = state.json_cache.get(&cache_key, INJURY_TTL).await {
        tracing::info!("Cache HIT: {}", cache_key);
        return (StatusCode::OK, Json(cached)).into_response();
    }

    let output = match run_python_script(&state.config.project_root, "injuries.py", &[]).await {
        Ok(out) => out,
        Err(e) => {
            tracing::error!("Python error: {e}");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({"error": "Failed to get injuries"})),
            )
                .into_response();
        }
    };

    let data: Vec<NbaInjury> = match serde_json::from_str(&output) {
        Ok(d) => d,
        Err(e) => {
            tracing::error!("Invalid injury JSON from Python: {e}");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({"error": "Invalid injury data"})),
            )
                .into_response();
        }
    };

    let mut grouped: HashMap<String, Vec<NbaInjuryDto>> = HashMap::new();
    for injury in data {
        // Filter: skip null status or G League entries
        if injury.current_status.is_none()
            || injury
                .reason
                .as_ref()
                .map_or(false, |r| r.contains("G League"))
        {
            continue;
        }

        let dto: NbaInjuryDto = injury.into();
        grouped.entry(dto.team.clone()).or_default().push(dto);
    }

    let response_json = json!(grouped);
    state.json_cache.set(cache_key, response_json.clone()).await;

    (StatusCode::OK, Json(response_json)).into_response()
}
