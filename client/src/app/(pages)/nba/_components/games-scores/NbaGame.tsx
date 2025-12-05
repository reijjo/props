import "./NbaGame.css";
import { NbaToday } from "@/lib/utils/types/nba2";
import NbaTeamCard from "./NbaTeamCard";
import NbaTodayStatus from "./NbaTodayStatus";

type NbaGameProps = {
  game: NbaToday;
};

export default function NbaGame({ game }: NbaGameProps) {
  const competition = game.competitions[0];

  const homeTeam = competition.competitors.find(
    (team) => team.homeAway === "home"
  );
  const awayTeam = competition.competitors.find(
    (team) => team.homeAway === "away"
  );
  const gameStatus = competition.status;

  if (!homeTeam || !awayTeam || !gameStatus) return null;

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
