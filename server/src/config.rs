use dotenvy::dotenv;
use std::{env, path::PathBuf};

#[derive(Clone, Debug)]
pub struct Config {
    pub app_env: String,
    pub port: u16,
    pub nba_leaders_base: String,
    pub nba_scoreboard: String,
    pub project_root: String,
}

impl Config {
    pub fn from_env() -> Self {
        dotenv().ok();

        let app_env = env::var("APP_ENV").unwrap_or_else(|_| "development".to_string());

        let port = env::var("PORT")
            .unwrap_or_else(|_| "3001".to_string())
            .parse::<u16>()
            .expect("Port must be a number");

        let nba_leaders_base =
            env::var("NBA_LEADERS_API").expect("NBA_LEADERS_API missing in .env");

        let nba_scoreboard: String =
            env::var("NBA_ESPN_TODAY").expect("NBA_ESPN_TODAY missing in .env");

        let project_root: PathBuf = std::env::current_exe()
            .expect("Failed to get exe path")
            .parent()
            .expect("Failed to get binary dir")
            .parent()
            .expect("Failed to get target dir")
            .parent()
            .expect("Failed to get project root")
            .to_path_buf();

        let project_root = project_root
            .to_str()
            .expect("Project root path is not valid UTF-8")
            .to_string();

        Self {
            app_env,
            port,
            nba_leaders_base,
            nba_scoreboard,
            project_root,
        }
    }
}
