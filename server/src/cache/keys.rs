use std::time::Duration;

// Cache key builders
pub fn nba_leaders_key(stat: &str, limit: usize) -> String {
    format!("nba_leaders_{}_{}", stat, limit)
}

pub fn nba_scoreboard_key() -> String {
    "nba_scoreboard_today".to_string()
}

pub fn nba_teams_key() -> String {
    "nba_teams_all".to_string()
}

pub fn nba_team_details_key(id: i64) -> String {
    format!("nba_team_details_{}", id)
}

pub fn nba_player_details_key(id: i64) -> String {
    format!("nba_player_details_{}", id)
}

pub fn nba_player_info_key(id: i64) -> String {
    format!("nba_player_info_{}", id)
}

pub fn nba_player_avg_key(id: i64) -> String {
    format!("nba_player_avg_{}", id)
}

pub fn nba_injury_key() -> String {
    "nba_injuries".to_string()
}

pub const INJURY_TTL: Duration = Duration::from_secs(60 * 30); // 30 minutes
pub const PLAYER_INFO_TTL: Duration = Duration::from_secs(60 * 60 * 2); // 2 hour
pub const PLAYER_AVG_TTL: Duration = Duration::from_secs(60 * 60 * 2); // 2 hour
pub const PLAYER_DETAILS_TTL: Duration = Duration::from_secs(60 * 60 * 2); // 2 hour
pub const TEAM_DETAILS_TTL: Duration = Duration::from_secs(60 * 60); // 1 hour
pub const LEADERS_TTL: Duration = Duration::from_secs(60 * 60 * 2); // 2 hours
pub const SCOREBOARD_TTL: Duration = Duration::from_secs(60 * 10); // 10 minutes
pub const TEAMS_TTL: Duration = Duration::from_secs(60 * 60 * 24); // 24 hours
