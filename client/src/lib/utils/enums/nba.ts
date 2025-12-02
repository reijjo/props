export const GameStatus = {
  SCHEDULED: 1,
  IN_PROGRESS: 2,
  FINAL: 3,
} as const;

export type GameStatusType = (typeof GameStatus)[keyof typeof GameStatus];
