export type NbaGame = {
	gameId: string;
	gameStatus: string;
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
	team?: string;
	odds: number;
	suspended: number;
};
