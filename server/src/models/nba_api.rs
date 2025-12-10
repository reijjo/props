use serde::{Deserialize, Serialize};

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
