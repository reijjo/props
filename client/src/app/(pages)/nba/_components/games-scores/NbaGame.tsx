import "./NbaGame.css";
import { NbaToday } from "@/lib/utils/types/nba2";
import NbaTeamCard from "./NbaTeamCard";
import NbaTodayStatus from "./NbaTodayStatus";

type NbaGameProps = {
  game: NbaToday;
};

export default function NbaGame({ game }: NbaGameProps) {
  const homeTeam = game.competitions[0].competitors[0];
  const awayTeam = game.competitions[0].competitors[1];
  const gameStatus = game.competitions[0].status;

  return (
    <article className="nba-today-game">
      <NbaTeamCard
        team={homeTeam}
        opponentScore={awayTeam.score}
        gameStatus={gameStatus}
      />
      <NbaTodayStatus game={game} gameTimeUTC={game.date} />
      <NbaTeamCard
        team={awayTeam}
        opponentScore={homeTeam.score}
        gameStatus={gameStatus}
      />
    </article>
  );
}
