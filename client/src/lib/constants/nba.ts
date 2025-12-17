export const NBA_GAME_STATUS = {
	NOT_STARTED: 1,
	IN_PROGRESS: 2,
	FINAL: 3
} as const;

export type NbaGameStatus = (typeof NBA_GAME_STATUS)[keyof typeof NBA_GAME_STATUS];

export const STATBOX_COLUMNS = {
	PTS: ['PTS', 'FGM', 'FGA', 'FG_PCT', 'FG3M', 'FG3A', 'FG3_PCT', 'FTM', 'FTA', 'FT_PCT'],
	REB: ['REB', 'OREB', 'DREB'],
	AST: ['AST'],
	FG3M: ['FG3M', 'FG3A', 'FG3_PCT'],
	BLK: ['BLK'],
	STL: ['STL'],
	TOV: ['TOV'],
	ALL: []
} as const;

export type StatType = keyof typeof STATBOX_COLUMNS;
