use axum::{Router, routing::get};

use crate::app::AppState;
use crate::handlers::nba::{games, leaders, players, teams};

pub fn nba_routes() -> Router<AppState> {
    Router::new()
        .route("/leaders", get(leaders::get_nba_leaders))
        .route("/today", get(games::get_scoreboard))
        .route("/teams", get(teams::get_teams_list))
        .route("/teams/{id}", get(teams::get_team_details))
        .route("/players/{id}", get(players::get_player_by_id))
        .route("/players/{id}/avg", get(players::get_player_avg_stats))
        .route("/players/{id}/info", get(players::get_player_info))
}
