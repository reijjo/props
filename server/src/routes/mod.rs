use axum::{
	routing::get,
	Router
};

use crate::app::AppState;

pub fn init_routes() -> Router<AppState> {
	Router::new()
	.route("/", get(|| async { "Hi im a placeholder"}))
}