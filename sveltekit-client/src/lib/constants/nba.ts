export const NBA_GAME_STATUS = {
	NOT_STARTED: 1,
	IN_PROGRESS: 2,
	FINAL: 3
} as const;

export type NbaGameStatus = (typeof NBA_GAME_STATUS)[keyof typeof NBA_GAME_STATUS];
