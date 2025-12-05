// use serde::{Deserialize, Serialize};

// //////////////////////////////////
// /// SECTION: FRONTEND RESPONSE MODELS
// /// These are the Rust structs we
// /// - serialize into JSON
// /// - and send to the frontend
// ////////////////////////////////

// #[derive(Serialize, Debug)]
// pub struct TodayGamesResponse {
// 	#[serde(rename = "gameDate")]
// 	pub game_date: String,
// 	pub games: Vec<Game>
// }

// #[derive(Serialize, Debug)]
// pub struct Game {
// 	#[serde(rename = "gameId")]
// 	pub game_id: String,
// 	#[serde(rename = "gameStatus")]
// 	pub game_status: u8,
// 	#[serde(rename = "gameStatusText")]
// 	pub game_status_text: String,
// 	#[serde(rename = "gameTimeUTC")]
// 	pub game_time_utc: String,
// 	#[serde(rename = "homeTeam")]
// 	pub home_team: Team,
// 	#[serde(rename = "awayTeam")]
// 	pub away_team: Team,
// }

// #[derive(Serialize, Debug)]
// pub struct Team {
// 	#[serde(rename = "teamId")]
// 	pub team_id: u32,
// 	#[serde(rename = "teamName")]
// 	pub team_name: String,
// 	#[serde(rename = "teamCity")]
// 	pub team_city: String,
// 	pub wins: u32,
// 	pub losses: u32,
// 	pub score: u32
// }

// ///////////////////////////////////
// /// SECTION: NBA API RESPONSE MODELS
// /// These Rust structs exactly match the
// /// data from the NBA API. Used to
// /// - deserialize the API response
// ///////////////////////////////////
// #[derive(Deserialize, Debug)]
// pub struct NbaTodayApiResponse {
// 	pub scoreboard: NbaScoreboard
// }

// #[derive(Deserialize, Debug)]
// pub struct NbaScoreboard {
// 	#[serde(rename = "gameDate")]
// 	pub game_date: String,
// 	pub games: Vec<NbaGame>
// }


// #[derive(Deserialize, Debug)]
// pub struct NbaGame {
//  #[serde(rename = "gameId")]
//     pub game_id: String,
//     #[serde(rename = "gameStatus")]
//     pub game_status: u8,
//     #[serde(rename = "gameStatusText")]
//     pub game_status_text: String,
//     #[serde(rename = "gameTimeUTC")]
//     pub game_time_utc: String,
//     #[serde(rename = "homeTeam")]
//     pub home_team: NbaTeam,
//     #[serde(rename = "awayTeam")]
//     pub away_team: NbaTeam,
// }

// #[derive(Deserialize, Debug)]
// pub struct NbaTeam {
//     #[serde(rename = "teamId")]
//     pub team_id: u32,
//     #[serde(rename = "teamName")]
//     pub team_name: String,
//     #[serde(rename = "teamCity")]
//     pub team_city: String,
//     pub wins: u32,
//     pub losses: u32,
//     pub score: u32,
// }


// ///////////////////////////////////
// /// SECTION: CONVERSIONS (API -> Domain)
// ///
// /// Adapters to convert "ugly" NBA models
// /// into "pretty" frontend models.
// /// This keeps the frontend shielded from
// /// randomness and unneeded data.
// //////////////////////////////////
// impl From<NbaGame> for Game {
// 	fn from(nba_game: NbaGame) -> Self {
// 		Self {
// 			game_id: nba_game.game_id,
// 			game_status: nba_game.game_status,
// 			game_status_text: nba_game.game_status_text,
// 			game_time_utc: nba_game.game_time_utc,
// 			home_team: nba_game.home_team.into(),
// 			away_team: nba_game.away_team.into()
// 		}
// 	}
// }

// impl From<NbaTeam> for Team {
// fn from(nba_team: NbaTeam) -> Self {
//     Self {
//       team_id: nba_team.team_id,
//       team_name: nba_team.team_name,
//       team_city: nba_team.team_city,
//       wins: nba_team.wins,
//       losses: nba_team.losses,
//       score: nba_team.score,
//     }
//   }
// }
