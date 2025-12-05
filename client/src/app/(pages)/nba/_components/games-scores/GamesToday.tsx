import { NbaToday } from "@/lib/utils/types/nba2";
import "./GamesToday.css";
import NbaGame from "./NbaGame";
import { getTodaysGames } from "@/lib/api/nbaAPi";

type ApiResponse = {
  events: NbaToday[];
};

export default async function GamesToday() {
  const gamesToday = await getTodaysGames();

  if (!gamesToday) {
    return (
      <section className="nba-today-scoreboard">
        <p>No games today.</p>
      </section>
    );
  }

  return (
    <section className="nba-today-scoreboard">
      {gamesToday.events.map((game) => (
        <NbaGame key={game.id} game={game} />
      ))}
    </section>
  );
}
