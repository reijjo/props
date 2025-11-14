use axum::{
	middleware::{self},
	Router
};
use tower_http::cors::{Any, CorsLayer};

use crate::routes;
use crate::middleware::logger::log_middleware;

#[derive(Clone)]
pub struct AppState {
	pub http_client: reqwest::Client
}

pub fn create_app() -> Router {
	let http_client = reqwest::Client::builder()
		.timeout(std::time::Duration::from_secs(10))
		.build()
		.expect("Failed to create HTTP client");

	let cors = CorsLayer::new()
		.allow_origin(Any)
		.allow_methods(Any)
		.allow_headers(Any);

	let state = AppState {
		http_client
	};

	Router::new()
		.merge(routes::init_routes())
		.layer(cors)
		.layer(middleware::from_fn(log_middleware))
		.with_state(state)
}