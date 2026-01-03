export const NBA_GAME_STATUS = {
	NOT_STARTED: 1,
	IN_PROGRESS: 2,
	FINAL: 3
} as const;

export type NbaGameStatus = (typeof NBA_GAME_STATUS)[keyof typeof NBA_GAME_STATUS];

export const LEADERBOX_COLUMNS = {
	PTS: ['PTS', 'FGM', 'FGA', 'FG_PCT', 'FG3M', 'FG3A', 'FG3_PCT', 'FTM', 'FTA', 'FT_PCT'],
	REB: ['REB', 'OREB', 'DREB'],
	AST: ['AST'],
	FG3M: ['FG3M', 'FG3A', 'FG3_PCT'],
	BLK: ['BLK'],
	STL: ['STL'],
	TOV: ['TOV'],
	ALL: []
} as const;

export type StatType = keyof typeof LEADERBOX_COLUMNS;

export const STATBOX_COLUMNS = {
	SHORT: ['GP', 'MIN', 'PTS', 'REB', 'AST', 'FG3M', 'FG3A'] as const,
	FULL: [
		'GP',
		'MIN',
		'PTS',
		'REB',
		'AST',
		'STL',
		'BLK',
		'TOV',
		'OREB',
		'DREB',
		'FGM',
		'FGA',
		'FG_PCT',
		'FG3M',
		'FG3A',
		'FG3_PCT',
		'FTM',
		'FTA',
		'FT_PCT',
		'PLUS_MINUS'
	] as const
} as const;

export type StatboxView = keyof typeof STATBOX_COLUMNS;

export const PLAYER_AVG_COLUMNS = {
	SHORT: ['GP', 'MIN', 'PTS', 'REB', 'AST', 'FG3M', 'FG3A'] as const,
	FULL: [
		'GP',
		'MIN',
		'FGM',
		'FGA',
		'FG_PCT',
		'FTA',
		'FTM',
		'FT_PCT',
		'PTS',
		'OREB',
		'DREB',
		'REB',
		'AST',
		'FG3M',
		'FG3A',
		'FG3_PCT',
		'STL',
		'TOV',
		'PF',
		'PLUS_MINUS'
	] as const
} as const;

export type PlayerAvgView = keyof typeof PLAYER_AVG_COLUMNS;

export const PLAYER_LATEST_COLUMNS = [
	'GAME_DATE',
	'MATCHUP',
	'WL',
	'MIN',
	'PTS',
	'REB',
	'AST',
	'FG3M',
	'FG3A'
] as const;

export type PlayerLatestView = (typeof PLAYER_LATEST_COLUMNS)[number];
