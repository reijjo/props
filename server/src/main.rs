use tokio::net::TcpListener;

use crate::{app::create_app, config::Config};

mod app;
mod config;
mod handlers;
mod middleware;
mod models;
mod routes;
mod utils;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    utils::tracing::init_tracing();

    let config = Config::from_env();

    let addr = format!("localhost:{}", config.port);

    tracing::info!("Environment: '{}'", config.app_env);
    tracing::info!("🚀 Server starting on http://{}", addr);

    let app = create_app(config.clone());
    let listener = TcpListener::bind(&addr).await?;

    axum::serve(listener, app).await?;

    Ok(())
}
