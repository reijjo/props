// lib/config/leaderColumns.ts
export const LEADER_COLUMNS = {
  PTS: [
    "PTS",
    "FGM",
    "FGA",
    "FG_PCT",
    "FG3M",
    "FG3A",
    "FG3_PCT",
    "FTM",
    "FTA",
    "FT_PCT",
  ],
  REB: ["REB", "OREB", "DREB"],
  AST: ["AST"],
  FG3M: ["FG3M", "FG3A", "FG3_PCT"],
  BLK: ["BLK"],
  STL: ["STL"],
  TOV: ["TOV"],
} as const;

export type StatType = keyof typeof LEADER_COLUMNS;
