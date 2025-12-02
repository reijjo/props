import "./GamesToday.css";
import NbaGame from "./NbaGame";
import { getTodaysGames } from "@/lib/api/nbaAPi";
import { TodaysGamesResponse } from "@/lib/utils/types/nba";

export default async function GamesToday() {
  const gamesToday: TodaysGamesResponse = await getTodaysGames();

  if (!gamesToday) {
    return (
      <section className="nba-today-scoreboard">
        <p>No games today.</p>
      </section>
    );
  }

  return (
    <section className="nba-today-scoreboard">
      {gamesToday.games.map((game) => (
        <NbaGame key={game.gameId} game={game} />
      ))}
    </section>
  );
}
