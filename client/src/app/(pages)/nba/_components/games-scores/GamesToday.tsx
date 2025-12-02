import { GameStatus } from "@/lib/utils/enums/nba";
import "./GamesToday.css";
import NbaGame from "./NbaGame";
import { getTodaysGames } from "@/lib/api/nbaAPi";
import { TodaysGamesResponse } from "@/lib/utils/types/nba";

export default async function GamesToday() {
  const gamesToday: TodaysGamesResponse = await getTodaysGames();

  console.log("gamesToday", gamesToday);

  return (
    <section className="nba-today-scoreboard">
      {gamesToday.games.map((game) => (
        <NbaGame key={game.gameId} game={game} />
      ))}
    </section>
  );
}
