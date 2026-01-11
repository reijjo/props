use dotenvy::dotenv;
use std::env;

#[derive(Clone, Debug)]
pub struct Config {
    pub app_env: String,
    pub port: u16,
    pub host: String,
    pub nba_leaders_base: String,
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

        let host = if app_env == "production" {
            "0.0.0.0".to_string()
        } else {
            "localhost".to_string()
        };

        let nba_leaders_base =
            env::var("NBA_LEADERS_API").expect("NBA_LEADERS_API missing in .env");

        let project_root = if cfg!(test) {
            // In tests — use current_dir (project root)
            env::current_dir()
                .expect("Failed to get current dir in test")
                .to_str()
                .unwrap()
                .to_string()
        } else {
            // In production/dev — use current_exe path
            std::env::current_exe()
                .expect("Failed to get exe path")
                .parent()
                .expect("Failed to get binary dir")
                .parent()
                .expect("Failed to get target dir")
                .parent()
                .expect("Failed to get project root")
                .to_str()
                .expect("Project root not UTF-8")
                .to_string()
        };

        Self {
            app_env,
            port,
            host,
            nba_leaders_base,
            project_root,
        }
    }
}
