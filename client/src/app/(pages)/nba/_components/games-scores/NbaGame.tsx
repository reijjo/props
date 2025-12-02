import "./NbaGame.css";
import { NbaToday } from "@/lib/utils/types/nba";
import NbaTeamCard from "./NbaTeamCard";
import NbaTodayStatus from "./NbaTodayStatus";

type NbaGameProps = {
  game: NbaToday;
};

export default function NbaGame({ game }: NbaGameProps) {
  return (
    <article className="nba-today-game">
      <NbaTeamCard
        team={game.homeTeam}
        opponentScore={game.awayTeam.score}
        gameStatus={game.gameStatus}
      />
      <NbaTodayStatus game={game} />
      <NbaTeamCard
        team={game.awayTeam}
        opponentScore={game.homeTeam.score}
        awayTeam
        gameStatus={game.gameStatus}
      />
    </article>
  );
}
