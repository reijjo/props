use axum::{
    Json,
    extract::{Query, State},
    http::StatusCode,
    response::IntoResponse,
};
use serde::Deserialize;
use serde_json::{Value, json};

use crate::app::AppState;

#[derive(Deserialize)]
pub struct NbaLeaderParams {
    stat: String,
    #[serde(default = "default_limit")]
    pub limit: usize,
}

fn default_limit() -> usize {
    5
}

// We use `impl IntoResponse` so we don't have to write out the huge Result type signature
pub async fn get_nba_leaders(
    Query(params): Query<NbaLeaderParams>,
    State(state): State<AppState>,
) -> impl IntoResponse {
    let stat = params.stat.to_uppercase();

    let valid_stats = ["PTS", "AST", "REB", "FG3M", "BLK", "STL", "TOV"];
    if !valid_stats.contains(&stat.as_str()) {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(json!({
                "error": "Invalid stat. Use: PTS, AST, REB, BLK, STL, FG3M, TOV"
            })),
        ));
    }

    let url = format!("{}{}", state.config.nba_leaders_base, stat);

    let response = match state.http_client.get(&url).send().await {
        Ok(r) => r,
        Err(e) => {
            tracing::error!("NBA API request failed: {}", e);
            return Err((
                StatusCode::BAD_GATEWAY,
                Json(json!({ "error": "Failed to fetch NBA stats from API" })),
            ));
        }
    };

    let nba_leaders_json: Value = match response.json().await {
        Ok(json) => json,
        Err(e) => {
            tracing::error!("Failed to parse NBA JSON: {}", e);
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Invalid response from the NBA" })),
            ));
        }
    };

    let result_set = match &nba_leaders_json["resultSet"] {
        Value::Object(obj) => obj,
        _ => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Invalid resultSet from NBA" })),
            ));
        }
    };

    let headers = match result_set["headers"].as_array() {
        Some(h) => h,
        None => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Missing headers" })),
            ));
        }
    };

    let rows = match result_set["rowSet"].as_array() {
        Some(r) => r,
        None => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Missing rowSet" })),
            ));
        }
    };

    // BUILDING RESPONSE
    let mut players = Vec::new();
    for row in rows.iter().take(params.limit) {
        let mut player = serde_json::Map::new();
        for (i, header) in headers.iter().enumerate() {
            if let Some(value) = row.get(i) {
                player.insert(header.as_str().unwrap().to_string(), value.clone());
            }
        }
        players.push(Value::Object(player));
    }

    Ok((
        StatusCode::OK,
        Json(json!({
            "stat": stat,
            "season": "2025-26",
            "headers": headers,
            "count": players.len(),
            "data": players
        })),
    ))
}
