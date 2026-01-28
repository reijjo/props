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

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaTeamsPage {
    pub players: Vec<NbaTeamPlayerStats>,
    pub players_short: Vec<NbaTeamPlayerStatsShort>,
    pub team_stats: NbaTeamStats,
    pub team_stats_short: NbaTeamStatsShort,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaTeamPlayerStats {
    #[serde(rename = "PLAYER_ID")]
    pub player_id: i64,
    #[serde(rename = "PLAYER_NAME")]
    pub player_name: String,
    #[serde(rename = "GP")]
    pub gp: i32,
    #[serde(rename = "MIN")]
    pub min: f32,
    #[serde(rename = "PTS")]
    pub pts: f32,
    #[serde(rename = "REB")]
    pub reb: f32,
    #[serde(rename = "AST")]
    pub ast: f32,
    #[serde(rename = "STL")]
    pub stl: f32,
    #[serde(rename = "BLK")]
    pub blk: f32,
    #[serde(rename = "TOV")]
    pub tov: f32,
    #[serde(rename = "OREB")]
    pub oreb: f32,
    #[serde(rename = "DREB")]
    pub dreb: f32,
    #[serde(rename = "FGM")]
    pub fgm: f32,
    #[serde(rename = "FGA")]
    pub fga: f32,
    #[serde(rename = "FG_PCT")]
    pub fg_pct: f32,
    #[serde(rename = "FG3M")]
    pub fg3m: f32,
    #[serde(rename = "FG3A")]
    pub fg3a: f32,
    #[serde(rename = "FG3_PCT")]
    pub fg3_pct: f32,
    #[serde(rename = "FTM")]
    pub ftm: f32,
    #[serde(rename = "FTA")]
    pub fta: f32,
    #[serde(rename = "FT_PCT")]
    pub ft_pct: f32,
    #[serde(rename = "PLUS_MINUS")]
    pub plus_minus: f32,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaTeamPlayerStatsShort {
    #[serde(rename = "PLAYER_ID")]
    pub player_id: i64,
    #[serde(rename = "PLAYER_NAME")]
    pub player_name: String,
    #[serde(rename = "GP")]
    pub gp: i32,
    #[serde(rename = "MIN")]
    pub min: f32,
    #[serde(rename = "PTS")]
    pub pts: f32,
    #[serde(rename = "REB")]
    pub reb: f32,
    #[serde(rename = "AST")]
    pub ast: f32,
    #[serde(rename = "FG3M")]
    pub fg3m: f32,
    #[serde(rename = "FG3A")]
    pub fg3a: f32,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaTeamStats {
    #[serde(rename = "TEAM_ID")]
    pub team_id: i64,
    #[serde(rename = "TEAM_NAME")]
    pub team_name: String,
    #[serde(rename = "GP")]
    pub gp: i32,
    #[serde(rename = "W")]
    pub w: i32,
    #[serde(rename = "L")]
    pub l: i32,
    #[serde(rename = "W_PCT")]
    pub w_pct: f32,
    #[serde(rename = "MIN")]
    pub min: f32,
    #[serde(rename = "PTS")]
    pub pts: f32,
    #[serde(rename = "REB")]
    pub reb: f32,
    #[serde(rename = "AST")]
    pub ast: f32,
    #[serde(rename = "STL")]
    pub stl: f32,
    #[serde(rename = "BLK")]
    pub blk: f32,
    #[serde(rename = "TOV")]
    pub tov: f32,
    #[serde(rename = "OREB")]
    pub oreb: f32,
    #[serde(rename = "DREB")]
    pub dreb: f32,
    #[serde(rename = "FGM")]
    pub fgm: f32,
    #[serde(rename = "FGA")]
    pub fga: f32,
    #[serde(rename = "FG_PCT")]
    pub fg_pct: f32,
    #[serde(rename = "FG3M")]
    pub fg3m: f32,
    #[serde(rename = "FG3A")]
    pub fg3a: f32,
    #[serde(rename = "FG3_PCT")]
    pub fg3_pct: f32,
    #[serde(rename = "FTM")]
    pub ftm: f32,
    #[serde(rename = "FTA")]
    pub fta: f32,
    #[serde(rename = "FT_PCT")]
    pub ft_pct: f32,
    #[serde(rename = "PLUS_MINUS")]
    pub plus_minus: f32,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaTeamStatsShort {
    #[serde(rename = "TEAM_ID")]
    pub team_id: i64,
    #[serde(rename = "TEAM_NAME")]
    pub team_name: String,
    #[serde(rename = "GP")]
    pub gp: i32,
    #[serde(rename = "MIN")]
    pub min: f32,
    #[serde(rename = "PTS")]
    pub pts: f32,
    #[serde(rename = "REB")]
    pub reb: f32,
    #[serde(rename = "AST")]
    pub ast: f32,
    #[serde(rename = "FG3M")]
    pub fg3m: f32,
    #[serde(rename = "FG3A")]
    pub fg3a: f32,
}

//////////////////////////////
// PLAYERS
#[derive(Deserialize, Serialize, Debug)]
pub struct NbaPlayerLatestGames {
    pub player_latest: Vec<NbaPlayerLatest>,
    pub player_latest_short: Vec<NbaPlayerLatestShort>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaPlayerLatest {
    #[serde(rename = "AST")]
    pub ast: i32,
    #[serde(rename = "BLK")]
    pub blk: i32,
    #[serde(rename = "DREB")]
    pub dreb: i32,
    #[serde(rename = "FG3A")]
    pub fg3a: i32,
    #[serde(rename = "FG3M")]
    pub fg3m: i32,
    #[serde(rename = "FG3_PCT")]
    pub fg3_pct: f32,
    #[serde(rename = "FGA")]
    pub fga: i32,
    #[serde(rename = "FGM")]
    pub fgm: i32,
    #[serde(rename = "FG_PCT")]
    pub fg_pct: f32,
    #[serde(rename = "FTA")]
    pub fta: i32,
    #[serde(rename = "FTM")]
    pub ftm: i32,
    #[serde(rename = "FT_PCT")]
    pub ft_pct: f32,
    #[serde(rename = "GAME_DATE")]
    pub game_date: String,
    #[serde(rename = "Game_ID")]
    pub game_id: String,
    #[serde(rename = "MATCHUP")]
    pub matchup: String,
    #[serde(rename = "MIN")]
    pub min: i32,
    #[serde(rename = "OREB")]
    pub oreb: i32,
    #[serde(rename = "PF")]
    pub pf: i32,
    #[serde(rename = "PLUS_MINUS")]
    pub plus_minus: i32,
    #[serde(rename = "PTS")]
    pub pts: i32,
    #[serde(rename = "Player_ID")]
    pub player_id: i64,
    #[serde(rename = "REB")]
    pub reb: i32,
    #[serde(rename = "SEASON_ID")]
    pub season_id: String,
    #[serde(rename = "STL")]
    pub stl: i32,
    #[serde(rename = "TOV")]
    pub tov: i32,
    #[serde(rename = "VIDEO_AVAILABLE")]
    pub video_available: i32,
    #[serde(rename = "WL")]
    pub wl: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaPlayerLatestShort {
    #[serde(rename = "AST")]
    pub ast: i32,
    #[serde(rename = "FG3A")]
    pub fg3a: i32,
    #[serde(rename = "FG3M")]
    pub fg3m: i32,
    #[serde(rename = "GAME_DATE")]
    pub game_date: String,
    #[serde(rename = "Game_ID")]
    pub game_id: String,
    #[serde(rename = "MATCHUP")]
    pub matchup: String,
    #[serde(rename = "MIN")]
    pub min: i32,
    #[serde(rename = "PTS")]
    pub pts: i32,
    #[serde(rename = "Player_ID")]
    pub player_id: i64,
    #[serde(rename = "REB")]
    pub reb: i32,
    #[serde(rename = "SEASON_ID")]
    pub season_id: String,
    #[serde(rename = "WL")]
    pub wl: String,
}

// Player common info
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NbaPlayerInfo {
    #[serde(rename = "BIRTHDATE")]
    pub birthdate: String,
    #[serde(rename = "COUNTRY")]
    pub country: String,
    #[serde(rename = "FIRST_NAME")]
    pub firstname: String,
    #[serde(rename = "HEIGHT")]
    pub height: String,
    #[serde(rename = "JERSEY")]
    pub jersey: String,
    #[serde(rename = "LAST_NAME")]
    pub lastname: String,
    #[serde(rename = "PERSON_ID")]
    pub personid: i64,
    #[serde(rename = "PLAYERCODE")]
    pub playercode: String,
    #[serde(rename = "POSITION")]
    pub position: String,
    #[serde(rename = "TEAM_CITY")]
    pub teamcity: String,
    #[serde(rename = "TEAM_ID")]
    pub teamid: i64,
    #[serde(rename = "TEAM_NAME")]
    pub teamname: String,
    #[serde(rename = "WEIGHT")]
    pub weight: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NbaPlayerAvg {
    pub season_avg: NbaPlayerAvgStats,
    // pub last_10_avg: NbaPlayerAvgStats,
    // pub last_5_avg: NbaPlayerAvgStats,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NbaPlayerLast5 {
    pub last_5_avg: NbaPlayerAvgStats,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NbaPlayerAvgStats {
    #[serde(default, rename = "PTS")]
    pub pts: f32,
    #[serde(default, rename = "AST")]
    pub ast: f32,
    #[serde(default, rename = "BLK")]
    pub blk: f32,
    #[serde(default, rename = "DREB")]
    pub dreb: f32,
    #[serde(default, rename = "FG3A")]
    pub fg3a: f32,
    #[serde(default, rename = "FG3M")]
    pub fg3m: f32,
    #[serde(default, rename = "FG3_PCT")]
    pub fg3_pct: f32,
    #[serde(default, rename = "FGA")]
    pub fga: f32,
    #[serde(default, rename = "FGM")]
    pub fgm: f32,
    #[serde(default, rename = "FG_PCT")]
    pub fg_pct: f32,
    #[serde(default, rename = "FTA")]
    pub fta: f32,
    #[serde(default, rename = "FTM")]
    pub ftm: f32,
    #[serde(default, rename = "FT_PCT")]
    pub ft_pct: f32,
    #[serde(default, rename = "GP")]
    pub gp: i32,
    #[serde(default, rename = "L")]
    pub l: i32,
    #[serde(default, rename = "MIN")]
    pub min: f32,
    #[serde(default, rename = "OREB")]
    pub oreb: f32,
    #[serde(default, rename = "PF")]
    pub pf: f32,
    #[serde(default, rename = "PLUS_MINUS")]
    pub plus_minus: f32,
    #[serde(default, rename = "REB")]
    pub reb: f32,
    #[serde(default, rename = "STL")]
    pub stl: f32,
    #[serde(default, rename = "TOV")]
    pub tov: f32,
    #[serde(default, rename = "W")]
    pub w: i32,
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
    pub wins: i64,
    pub losses: i64,
    pub score: i64,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Odds {
    pub team: Option<String>,
    pub odds: f32,
    pub suspended: i8,
}

////////////////////////////////
/// INJURIES

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NbaInjury {
    #[serde(rename = "Current Status")]
    pub current_status: Option<String>,

    #[serde(rename = "Game Date")]
    pub game_date: String,

    #[serde(rename = "Game Time")]
    pub game_time: String,

    #[serde(rename = "Matchup")]
    pub matchup: String,

    #[serde(rename = "Player Name")]
    pub player_name: Option<String>,

    #[serde(rename = "Reason")]
    pub reason: Option<String>,

    #[serde(rename = "Team")]
    pub team: String,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct NbaInjuryDto {
    pub current_status: Option<String>,
    pub game_date: String,
    pub game_time: String,
    pub matchup: String,
    pub player_name: Option<String>,
    pub reason: Option<String>,
    pub team: String,
}

impl From<NbaInjury> for NbaInjuryDto {
    fn from(x: NbaInjury) -> Self {
        Self {
            current_status: x.current_status,
            game_date: x.game_date,
            game_time: x.game_time,
            matchup: x.matchup,
            player_name: x.player_name,
            reason: x.reason,
            team: x.team,
        }
    }
}
