use axum::{
    routing::get,
    Router,
};

use crate::app::AppState;
use crate::handlers::nba::{leaders, games};

pub fn nba_routes() -> Router<AppState> {
    Router::new()
			.route("/leaders", get(leaders::get_nba_leaders))
			.route("/today", get(games::get_todays_games))
}
