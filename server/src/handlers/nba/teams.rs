use axum::{
    Json,
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::Serialize;
use serde_json::json;

use crate::{
    app::AppState,
    models::espn::{TeamsApiResponse, TeamsTeam},
};

#[derive(Serialize)]
struct ApiResponse {
    teams: Vec<TeamsTeam>,
}

pub async fn get_all_teams(State(state): State<AppState>) -> Response {
    let url = format!("{}", state.config.nba_teams);

    let response = match state.http_client.get(&url).send().await {
        Ok(res) => res,
        Err(e) => {
            tracing::error!("NBA ESPN teams api request failed: {}", e);
            return (
                StatusCode::BAD_GATEWAY,
                Json(json!({ "error": "Failed to fetch NBA teams from the API"})),
            )
                .into_response();
        }
    };

    let teams_data: TeamsApiResponse = match response.json().await {
        Ok(data) => data,
        Err(e) => {
            tracing::error!("Failed to parse NBA Teams {}", e);
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Invalid response from NBA Teams API"})),
            )
                .into_response();
        }
    };

    let res = ApiResponse {
        teams: teams_data
            .sports
            .into_iter()
            .flat_map(|s| s.leagues)
            .flat_map(|l| l.teams)
            .map(|t| t.team)
            .collect(),
    };

    (StatusCode::OK, Json(res)).into_response()
}
