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
	birthdate: string;
	country: string;
	firstname: string;
	height: string;
	jersey: string;
	lastname: string;
	personid: number;
	playercode: string;
	position: string;
	teamcity: string;
	teamid: number;
	teamname: string;
	weight: string;
};

export type NbaPlayerAvgStats = {
	ast: number;
	blk: number;
	dreb: number;
	fg3a: number;
	fg3m: number;
	fg3_pct: number;
	fga: number;
	fgm: number;
	fg_pct: number;
	fta: number;
	ftm: number;
	ft_pct: number;
	gp: number;
	l: number;
	min: number;
	oreb: number;
	pf: number;
	plus_minus: number;
	reb: number;
	stl: number;
	tov: number;
	w: number;
};

export type NbaPlayerAvg = {
	season_avg: NbaPlayerAvgStats;
	last_10_avg: NbaPlayerAvgStats;
	last_5_avg: NbaPlayerAvgStats;
};
