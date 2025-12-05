use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
pub struct NbaTodayApiResponse {
	pub events: Vec<NbaToday>,
	#[serde(flatten)]
    _extra: std::collections::HashMap<String, serde_json::Value>,
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
		id: String,
		uid: String,
		#[serde(rename = "homeAway")]
    home_away: String,
		team: NbaMatchTeamDetails,
		score: String,
		records: Vec<NbaMatchTeamRecord>,
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
  pub abbreviation: Option<String>,  // ← Optional!
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
	pub id: String,
	pub name: String,
	pub state: String,
	pub completed: bool,
	pub description: String,
}