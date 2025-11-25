export const formatColumnName = (col: string): string => {
  return col
    .replace("_PCT", "%") // FT_PCT → FT%
    .replace("FG3", "3P") // FG3M → 3PM
    .replace("FG_", "FG") // FG_PCT → FG%
    .replace("FT_", "FT") // FT_PCT → FT%
    .replace("OREB", "OREB")
    .replace("DREB", "DREB")
    .replace("REB", "REB")
    .replace("AST", "AST")
    .replace("TOV", "TOV")
    .replace("BLK", "BLK")
    .replace("STL", "STL")
    .replace("PTS", "PTS");
};
