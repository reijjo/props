use axum::{
	middleware::{self},
	Router
};
use tower_http::cors::{Any, CorsLayer};
use reqwest::header;

use crate::{config::Config, routes};
use crate::middleware::logger::log_middleware;

#[derive(Clone)]
pub struct AppState {
	pub http_client: reqwest::Client,
	pub config: Config
}

pub fn create_app(config: Config) -> Router {
	let mut headers = header::HeaderMap::new();
	headers.insert("Referer", "https://www.nba.com/".parse().unwrap());
	headers.insert("User-Agent", "RepenValintaOy/1.0 (+https://tarpit.pages.dev)".parse().unwrap());

	let client = reqwest::Client::builder()
		.default_headers(headers)
		.timeout(std::time::Duration::from_secs(10))
		.build()
		.expect("Failed to create HTTP client");

	let cors = CorsLayer::new()
		.allow_origin(Any)
		.allow_methods(Any)
		.allow_headers(Any);

	let state = AppState {
		http_client: client,
		config: config.clone()
	};

	Router::new()
		.merge(routes::init_routes())
		.layer(cors)
		.layer(middleware::from_fn(log_middleware))
		.with_state(state)
}