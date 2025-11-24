use axum::{extract::{Query, State}, routing::get, Json, Router};
use serde::Deserialize;
use serde_json::{Value, json};

use crate::app::AppState;

// All nba routes goes here
pub fn nba_routes() -> Router<AppState> {
	Router::new()
		.route("/leaders", get(get_nba_leaders))
}

#[derive(Deserialize)]
struct NbaLeaderParams {
	stat: String,
	#[serde(default = "default_limit")]
	pub limit: usize,
}

// limit to 5 players
fn default_limit() -> usize {	5 }


// GET
// api/nba/leaders?stat=STAT
// RETURN top 5 players
async fn get_nba_leaders(
	Query(params): Query<NbaLeaderParams>,
	State(state): State<AppState>
) -> Result<Json<Value>, Json<Value>> {
	let stat = params.stat.to_uppercase();

	let valid_stats = ["PTS", "AST", "REB", "FG3M", "BLK", "STL", "TOV"];
	if !valid_stats.contains(&stat.as_str()) {
    return Err(Json(json!({
      "error": "Invalid stat. Use: PTS, AST, REB, BLK, STL, FG3M, TOV"
    })));
  }

	let url = format!("{}{}", state.config.nba_leaders_base, stat);

	// Headers needed so nba wont probably block me
	let response = match state.http_client
		.get(&url)
		.header("Referer", "https://www.nba.com/")
		.header("User-Agent", "RepenValintaOy/1.0")
		.send()
		.await
	{
		Ok(r) => r,
		Err(e) => {
			tracing::error!("NBA API request failed: {}", e);
			return Err(Json(json!({
				"error": "Failed to fetch NBA stats from API"
			})));
		}
	};

	// Parse the full response
	let nba_leaders_json: Value = match response.json().await {
		Ok(json) => json,
		Err(e) => {
			tracing::error!("Failed to parse NBA JSON: {}", e);
			return Err(Json(json!({
				"error": "Invalid response from the NBA"
			})));
		}
	};

	// We just take what we need from the response
	let result_set = match &nba_leaders_json["resultSet"] {
		Value::Object(obj) => obj,
		_ => {
			tracing::error!("Invalid resultSet");
			return Err(Json(json!({
				"error": "Invalid resultSet"
			})))
		}
	};

	// We need the headers so we make clear objects that are easier the use in the frontend
	let headers = match result_set["headers"].as_array() {
        Some(h) => h,
        None => return Err(Json(json!({"error": "Missing headers"}))),
    };

    let rows = match result_set["rowSet"].as_array() {
        Some(r) => r,
        None => return Err(Json(json!({"error": "Missing rowSet"}))),
    };

    // Build clean player objects
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

    Ok(Json(json!({
        "stat": stat,
        "season": "2025-26",
        "headers": headers,
        "count": players.len(),
        "data": players
    })))


}