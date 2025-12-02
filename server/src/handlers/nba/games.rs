use axum::{
	extract::State,
	http::StatusCode,
	response::IntoResponse,
	Json,
};
use serde_json::{ json };

use crate::{app::AppState};
use crate::models::nba::{
	Game, NbaTodayApiResponse, TodayGamesResponse
};

pub async fn get_todays_games(
	State(state): State<AppState>,
) -> impl IntoResponse {

	let url = format!("{}", state.config.nba_games);

	tracing::info!("Url: {}", url);

	let response = match state
		.http_client
		.get(&url)
		.send()
		.await
	{
		Ok(res) => res,
		Err(e) => {
			tracing::error!("NBA GAMES API request failed: {}", e);
			return Err((
				StatusCode::BAD_GATEWAY,
				Json(json!({ "error": "Failed to fetch NBA games from the API"}))
			));
		}
	};

	let nba_data: NbaTodayApiResponse = match response.json().await {
		Ok(data) => data,
		Err(e) => {
			tracing::error!("Failed to parse NBA games {}", e);
			return Err((
				StatusCode::INTERNAL_SERVER_ERROR,
				Json(json!({ "error": "Invalid response from the NBA games API"}))
			));
		}
	};

	let games: Vec<Game> = nba_data
		.scoreboard
		.games
		.into_iter()
		.map(|g| g.into())
		.collect();

	let response = TodayGamesResponse {
		game_date: nba_data.scoreboard.game_date,
		games
	};

	Ok((
		StatusCode::OK,
		Json(response),
	))
}