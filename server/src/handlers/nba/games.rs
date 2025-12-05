use axum::{
    Json,
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde_json::json;

use crate::models::espn::NbaTodayApiResponse;
use crate::{app::AppState, models::espn::NbaToday};

#[derive(serde::Serialize)]
struct ApiResponse {
    events: Vec<NbaToday>,
}

pub async fn get_espn_scoreboard(State(state): State<AppState>) -> Response {
    let url = format!("{}", state.config.nba_scoreboard);

    let response = match state.http_client.get(&url).send().await {
        Ok(res) => res,
        Err(e) => {
            tracing::error!("NBA ESPN scoreboard api request failed: {}", e);
            return (
                StatusCode::BAD_GATEWAY,
                Json(json!({ "error": "Failed to fetch NBA games from the API"})),
            )
                .into_response();
        }
    };

    let espn_data: NbaTodayApiResponse = match response.json().await {
        Ok(data) => data,
        Err(e) => {
            tracing::error!("Failed to parse NBA games {}", e);
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Invalid response from the NBA games API"})),
            )
                .into_response();
        }
    };

    let res = ApiResponse {
        events: espn_data.events,
    };

    (StatusCode::OK, Json(res)).into_response()
}
