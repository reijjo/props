use serde::{Deserialize, Serialize};

// ESPN TODAYS SCOREBOARD TYPE
#[derive(Deserialize, Serialize, Debug)]
pub struct NbaTodayApiResponse {
    pub events: Vec<NbaToday>,
    #[serde(flatten)]
    _extra: std::collections::HashMap<String, serde_json::Value>, // <-- captures unknown fields
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaToday {
    pub id: String,
    pub uid: String,
    pub date: String,
    pub competitions: Vec<NbaMatch>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaMatch {
    pub id: String,
    pub uid: String,
    pub date: String,
    pub competitors: Vec<NbaMatchTeam>,
    pub status: NbaMatchStatus,
    #[serde(default)]
    pub odds: Vec<NbaMatchOdds>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaMatchTeam {
    pub id: String,
    pub uid: String,
    #[serde(rename = "homeAway")]
    pub home_away: String,
    pub team: NbaMatchTeamDetails,
    pub score: String,
    pub records: Vec<NbaMatchTeamRecord>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaMatchTeamDetails {
    pub location: String,
    pub name: String,
    pub abbreviation: String,
    pub logo: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaMatchTeamRecord {
    pub name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub abbreviation: Option<String>, // ← Optional!
    #[serde(rename = "type")]
    pub type_: String,
    pub summary: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaMatchOdds {
    pub details: String,
    #[serde(rename = "overUnder")]
    pub over_under: f32,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaMatchStatus {
    pub clock: f32,
    #[serde(rename = "displayClock")]
    pub display_clock: String,
    pub period: i32,
    #[serde(rename = "type")]
    pub type_: NbaMatchStatusType,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaMatchStatusType {
    // #[serde(rename = "type")]
    // pub type_: String,
    pub name: String,
    pub state: String,
    pub completed: bool,
    pub description: String,
}

// ESPN TEAMS TYPES
// handles/teams.rs
#[derive(Deserialize, Debug)]
pub struct TeamsApiResponse {
    pub sports: Vec<LeagueWrapper>,
}

#[derive(Deserialize, Debug)]
pub struct LeagueWrapper {
    pub leagues: Vec<Teams>,
}

#[derive(Deserialize, Debug)]
pub struct Teams {
    pub teams: Vec<Team>,
}

#[derive(Deserialize, Debug)]
pub struct Team {
    pub team: TeamsTeam,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct TeamsTeam {
    pub id: String,
    pub uid: String,
    pub slug: String,
    pub abbreviation: String,
    #[serde(rename = "displayName")]
    pub display_name: String,
    pub logos: Vec<TeamLogo>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct TeamLogo {
    pub href: String,
    pub width: u32,
    pub height: u32,
}
