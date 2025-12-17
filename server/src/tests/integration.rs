// src/tests/integration.rs or in main.rs mod tests
use axum::http::StatusCode;
use axum_test::TestServer;

use crate::app::create_app;
use crate::config::Config;

#[tokio::test]
async fn health_check() {
    let config = Config::from_env();
    let app = create_app(config);
    let server = TestServer::new(app).unwrap();

    let response = server.get("/api/nba/teams").await;

    assert_eq!(response.status_code(), StatusCode::OK);
}

#[tokio::test]
async fn not_found_returns_404() {
    let config = Config::from_env();
    let app = create_app(config);
    let server = TestServer::new(app).unwrap();

    let response = server.get("/non-existent").await;

    assert_eq!(response.status_code(), StatusCode::NOT_FOUND);
}
