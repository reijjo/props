pub mod nba;

use axum::{Router, routing::get};

use crate::app::AppState;

pub fn init_routes() -> Router<AppState> {
    Router::new()
        .route("/", get(|| async { "Server running." }))
        .nest("/api/nba", nba::nba_routes())
}
