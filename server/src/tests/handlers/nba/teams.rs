use axum::http::StatusCode;
use axum_test::TestServer;

use crate::app::create_app;
use crate::config::Config;

#[tokio::test]
async fn get_teams_list_returns_ok() {
    let mut config = Config::from_env();
    config.project_root = std::env::current_dir()
        .unwrap()
        .to_str()
        .unwrap()
        .to_string();

    let app = create_app(config);

    let server = TestServer::new(app).unwrap();

    let response = server.get("/api/nba/teams").await;

    assert_eq!(response.status_code(), StatusCode::OK);
}

#[tokio::test]
async fn get_team_details_returns_ok() {
    if std::env::var("CI").is_ok() {
        // GitHub Actions sets CI=true
        eprintln!("Skipping team details test in CI (NBA API rate limit)");
        return;
    }

    let mut config = Config::from_env();
    config.project_root = std::env::current_dir()
        .unwrap()
        .to_str()
        .unwrap()
        .to_string();

    let app = create_app(config);

    let server = TestServer::new(app).unwrap();

    let response = server.get("/api/nba/teams/1610612747").await;

    assert_eq!(response.status_code(), StatusCode::OK);
}
