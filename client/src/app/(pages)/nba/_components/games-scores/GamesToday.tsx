import "./GamesToday.css";
import NbaGame from "./NbaGame";

const apiMock = {
  scoreboard: {
    games: [
      {
        gameId: "1",
        gameStatus: 3,
        gameStatusText: "Final",
        gameTimeUTC: "2025-12-02T00:00:00Z",
        homeTeam: {
          teamId: 1610612739,
          teamCity: "Los Angeles",
          teamName: "Clippers",
          wins: 15,
          losses: 10,
          score: 122,
        },
        awayTeam: {
          teamId: 1610612740,
          teamCity: "New Orleans",
          teamName: "Pelicans",
          wins: 12,
          losses: 13,
          score: 128,
        },
      },
      {
        gameId: "2",
        gameStatus: 1,
        gameStatusText: "7:00 pm ET",
        gameTimeUTC: "2025-12-02T00:00:00Z",
        homeTeam: {
          teamId: 1610612739,
          teamCity: "Los Angeles",
          teamName: "Clippers",
          wins: 15,
          losses: 10,
          score: 0,
        },
        awayTeam: {
          teamId: 1610612740,
          teamCity: "New Orleans",
          teamName: "Pelicans",
          wins: 12,
          losses: 13,
          score: 0,
        },
      },
      {
        gameId: "3",
        gameStatus: 2,
        gameStatusText: "Q4 4:55",
        gameTimeUTC: "2025-12-02T00:00:00Z",
        homeTeam: {
          teamId: 1610612739,
          teamCity: "Los Angeles",
          teamName: "Lakers",
          wins: 15,
          losses: 10,
          score: 80,
        },
        awayTeam: {
          teamId: 1610612740,
          teamCity: "New Orleans",
          teamName: "Pelicans",
          wins: 12,
          losses: 13,
          score: 94,
        },
      },
    ],
  },
};

export default function GamesToday() {
  return (
    <section className="nba-today-scoreboard">
      {apiMock.scoreboard.games.map((game) => (
        <NbaGame key={game.gameId} game={game} />
      ))}
    </section>
  );
}
