use serde::{Deserialize, Serialize};

//////////////////////////////
// TEAMS
#[derive(Deserialize, Serialize, Debug)]
pub struct NbaTeamsList {
    pub teams: Vec<NbaTeam>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaTeam {
    pub id: i64,
    pub full_name: String,
    pub abbreviation: String,
    pub nickname: String,
    pub city: String,
    pub state: String,
    pub year_founded: i64,
}

//////////////////////////////
// SCOREBOARD

#[derive(Deserialize, Serialize, Debug)]
pub struct Scoreboard {
    pub games: Vec<NbaGame>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaGame {
    #[serde(rename = "gameId")]
    pub game_id: String,
    #[serde(rename = "gameStatus")]
    pub game_status: i64,
    #[serde(rename = "gameStatusText")]
    pub game_status_text: String,
    pub period: i64,
    #[serde(rename = "gameClock")]
    pub game_clock: String,
    #[serde(rename = "gameTimeUTC")]
    pub game_time_utc: String,
    #[serde(rename = "homeTeam")]
    pub home_team: NbaMatchTeam,
    #[serde(rename = "awayTeam")]
    pub away_team: NbaMatchTeam,
    #[serde(rename = "pbOdds")]
    pub pb_odds: Odds,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaMatchTeam {
    #[serde(rename = "teamId")]
    pub team_id: i64,
    #[serde(rename = "teamName")]
    pub team_name: String,
    #[serde(rename = "teamCity")]
    pub team_city: String,
    #[serde(rename = "teamTricode")]
    pub team_tricode: String,
    pub wins: i32,
    pub losses: i32,
    pub score: i32,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Odds {
    team: Option<String>,
    odds: f32,
    suspended: i8,
}
