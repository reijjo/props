use dotenvy::dotenv;
use std::env;
use tokio::net::TcpListener;

use crate::app::create_app;

mod app;
mod utils;
mod middleware;
mod routes;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
  dotenv().ok();

	utils::tracing::init_tracing();

	let env = env::var("APP_ENV").unwrap_or_else(|_| "development".to_string());
	let port = env::var("PORT").unwrap_or_else(|_| "3001".to_string());
	let addr = format!("localhost:{}", port);

	tracing::info!("Environment: '{}'", env);
  tracing::info!("🚀 Server starting on http://{}", addr);

	let app = create_app();
	let listener = TcpListener::bind(&addr).await?;

	axum::serve(listener, app).await?;

	Ok(())
}
