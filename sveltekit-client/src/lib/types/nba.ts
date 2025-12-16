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
