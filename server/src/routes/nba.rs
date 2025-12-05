use axum::{Router, routing::get};

use crate::app::AppState;
use crate::handlers::nba::{games, leaders, teams};

pub fn nba_routes() -> Router<AppState> {
    Router::new()
        .route("/leaders", get(leaders::get_nba_leaders))
        .route("/games", get(games::get_espn_scoreboard))
				.route("/teams", get(teams::get_all_teams))
}
