import type { NbaGameStatus } from '$lib/constants/nba';

export type NbaGame = {
	gameId: string;
	gameStatus: NbaGameStatus;
	gameStatusText: string;
	period: number;
	gameClock: string;
	gameTimeUTC: string;
	homeTeam: NbaMatchTeam;
	awayTeam: NbaMatchTeam;
	pbOdds: Odds;
};

export type NbaMatchTeam = {
	teamId: number;
	teamName: string;
	teamCity: string;
	teamTricode: string;
	wins: number;
	losses: number;
	score: number;
};

export type NbaTeamCard = {
	id: number;
	full_name: string;
	abbreviation: string;
	nickname: string;
	city: string;
	state: string;
	year_founded: number;
};

export type Odds = {
	team?: string | null;
	odds: number;
	suspended: number;
};

export type NbaPlayerBase = {
	PLAYER_ID: number;
	PLAYER: string;
	TEAM: string;
	TEAM_ID: number;
	GP: number;
	MIN: number;
};

export type PointsLeader = NbaPlayerBase & {
	PTS: number;
	FGM: number;
	FGA: number;
	FG_PCT: number;
	FG3M: number;
	FG3A: number;
	FG3_PCT: number;
	FTM: number;
	FTA: number;
	FT_PCT: number;
};

export type ReboundLeader = NbaPlayerBase & {
	REB: number;
	OREB: number;
	DREB: number;
};

export type AssistLeader = NbaPlayerBase & {
	AST: number;
};

export type ThreePointerLeader = NbaPlayerBase & {
	FG3M: number;
	FG3A: number;
	FG3_PCT: number;
};

export type BlocksLeader = NbaPlayerBase & { BLK: number };
export type StealsLeader = NbaPlayerBase & { STL: number };
export type TurnoversLeader = NbaPlayerBase & { TOV: number };

export type LeaderData = {
	PTS: PointsLeader[];
	REB: ReboundLeader[];
	AST: AssistLeader[];
	FG3M: ThreePointerLeader[];
	BLK: BlocksLeader[];
	STL: StealsLeader[];
	TOV: TurnoversLeader[];
	ALL: [];
};

export type LeaderStatType = keyof LeaderData;

//////////////////////
// NBA teams page
export type NbaTeamsPage = {
	players: NbaTeamPlayerStats[];
	players_short: NbaTeamPlayerStatsShort[];
	team_stats: NbaTeamStats;
	team_stats_short: NbaTeamStatsShort;
};

export type NbaTeamStatsCommon = {
	GP: number;
	MIN: number;
	FGM: number;
	FGA: number;
	FG_PCT: number;
	FG3M: number;
	FG3A: number;
	FG3_PCT: number;
	FTM: number;
	FTA: number;
	FT_PCT: number;
	PTS: number;
	OREB: number;
	DREB: number;
	REB: number;
	AST: number;
	STL: number;
	BLK: number;
	TOV: number;
	PLUS_MINUS: number;
};

export type NbaTeamPlayerStats = NbaTeamStatsCommon & {
	PLAYER_ID: number;
	PLAYER_NAME: string;
};

export type NbaTeamStats = NbaTeamStatsCommon & {
	TEAM_ID: number;
	TEAM_NAME: string;
	W: number;
	L: number;
	W_PCT: number;
};

export type NbaTeamPlayerStatsShort = Pick<
	NbaTeamPlayerStats,
	'PLAYER_ID' | 'PLAYER_NAME' | 'GP' | 'MIN' | 'PTS' | 'REB' | 'AST' | 'FG3A' | 'FG3M'
>;

export type NbaTeamStatsShort = Pick<
	NbaTeamStats,
	'TEAM_ID' | 'TEAM_NAME' | 'GP' | 'MIN' | 'PTS' | 'REB' | 'AST' | 'FG3A' | 'FG3M'
>;

////////////////////////////
// NBA players page
export type NbaPlayerInfo = {
	BIRTHDATE: string;
	COUNTRY: string;
	FIRST_NAME: string;
	HEIGHT: string;
	JERSEY: string;
	LAST_NAME: string;
	PERSON_ID: number;
	PLAYERCODE: string;
	POSITION: string;
	TEAM_CITY: string;
	TEAM_ID: number;
	TEAM_NAME: string;
	WEIGHT: string;
};

export type NbaPlayerAvgStats = {
	AST: number;
	BLK: number;
	DREB: number;
	FG3A: number;
	FG3M: number;
	FG3_PCT: number;
	FGA: number;
	FGM: number;
	FG_PCT: number;
	FTA: number;
	FTM: number;
	FT_PCT: number;
	GP: number;
	L: number;
	MIN: number;
	OREB: number;
	PF: number;
	PLUS_MINUS: number;
	REB: number;
	STL: number;
	TOV: number;
	W: number;
};

export type NbaPlayerAvg = {
	season_avg: NbaPlayerAvgStats;
	last_10_avg: NbaPlayerAvgStats;
	last_5_avg: NbaPlayerAvgStats;
};

export type NbaPlayerLatest = {
	AST: number;
	BLK: number;
	DREB: number;
	FG3A: number;
	FG3M: number;
	FG3_PCT: number;
	FGA: number;
	FGM: number;
	FG_PCT: number;
	FTA: number;
	FTM: number;
	FT_PCT: number;
	GAME_DATE: string;
	Game_ID: string;
	MATCHUP: string;
	MIN: number;
	OREB: number;
	PF: number;
	PLUS_MINUS: number;
	PTS: number;
	Player_ID: number;
	REB: number;
	SEASON_ID: string;
	STL: number;
	TOV: number;
	VIDEO_AVAILABLE: number;
	WL: string;
};

export type NbaPlayerLatestShort = {
	AST: number;
	FG3A: number;
	FG3M: number;
	GAME_DATE: string;
	Game_ID: string;
	MATCHUP: string;
	MIN: number;
	PTS: number;
	Player_ID: number;
	REB: number;
	SEASON_ID: string;
	WL: string;
};
