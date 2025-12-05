use dotenvy::dotenv;
use std::env;

#[derive(Clone, Debug)]
pub struct Config {
    pub app_env: String,
    pub port: u16,
    pub nba_leaders_base: String,
    pub nba_scoreboard: String,
		pub nba_teams: String
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

				let nba_teams: String =
            env::var("NBA_ESPN_TEAMS").expect("NBA_ESPN_TEAMS missing in .env");

        Self {
            app_env,
            port,
            nba_leaders_base,
            nba_scoreboard,
						nba_teams
        }
    }
}
