import { NbaMatch } from "./types/nba2";

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

export function formatGameTime(
  gameTimeUTC: string,
  gameStatusText: string
): string {
  // If game is over or in progress, show the status text
  if (gameStatusText === "Final" || !gameTimeUTC) {
    return gameStatusText;
  }

  // Convert UTC to user's local time
  const date = new Date(gameTimeUTC);

  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: false, // Use 24-hour format for Finland/Europe
  });
}

export const formattedDate = (gametime: string): string => {
  const date = new Date(gametime);

  return date.toLocaleDateString(undefined, {
    weekday: "short", // "Mon"
    month: "short", // "Dec"
    day: "numeric", // "1"
  });
};
