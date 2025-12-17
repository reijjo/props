// src/tests/integration.rs or in main.rs mod tests
use axum::http::StatusCode;
use axum_test::TestServer;

use crate::app::create_app;
use crate::config::Config;

#[tokio::test]
async fn health_check() {
    // Force project root to current directory (where Cargo.toml is)
    let mut config = Config::from_env();
    config.project_root = std::env::current_dir().unwrap().to_str().unwrap().to_string();

    let app = create_app(config);

    let server = TestServer::new(app).unwrap();

    let response = server.get("/api/nba/teams").await;

    // Print for debugging
    println!("Status: {}", response.status_code());
    println!("Body: {:?}", response.text());

    assert_eq!(response.status_code(), StatusCode::OK);
}

#[tokio::test]
async fn not_found_returns_404() {
    let mut config = Config::from_env();
    config.project_root = std::env::current_dir().unwrap().to_str().unwrap().to_string();

    let app = create_app(config);

    let server = TestServer::new(app).unwrap();

    let response = server.get("/non-existent").await;

    assert_eq!(response.status_code(), StatusCode::NOT_FOUND);
}