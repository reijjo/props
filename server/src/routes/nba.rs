use axum::{Router, routing::get};

use crate::app::AppState;
use crate::handlers::nba::{games, leaders, teams};

pub fn nba_routes() -> Router<AppState> {
    Router::new()
        .route("/leaders", get(leaders::get_nba_leaders))
        .route("/today", get(games::get_scoreboard))
        .route("/teams", get(teams::get_teams_list))
}
