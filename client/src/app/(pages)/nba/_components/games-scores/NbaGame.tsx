import "./NbaGame.css";
import { NbaTeam, NbaToday } from "@/lib/utils/types/nba";
import NbaTeamCard from "./NbaTeamCard";
import { formatGameTime } from "@/lib/utils/format";

type NbaGameProps = {
  game: NbaToday;
};

export default function NbaGame({ game }: NbaGameProps) {
  const isGameEnded = game.gameStatusText === "Final";

  const formattedDate = new Date(game.gameTimeUTC).toLocaleDateString("en-US", {
    weekday: "short", // "Mon"
    month: "short", // "Dec"
    day: "numeric", // "1"
  });

  return (
    <article className="nba-today-game">
      <NbaTeamCard
        team={game.homeTeam}
        isGameEnded={isGameEnded}
        opponentScore={game.awayTeam.score}
      />

      <div className="nba-today-gamestatus">
        {isGameEnded ? (
          <h3>{game.gameStatusText}</h3>
        ) : (
          <>
            <p className="game-date">{formattedDate}</p>
            <h3>{formatGameTime(game.gameTimeUTC, game.gameStatusText)}</h3>
          </>
        )}
      </div>

      <NbaTeamCard
        team={game.awayTeam}
        isGameEnded={isGameEnded}
        opponentScore={game.homeTeam.score}
        awayTeam
      />
    </article>
  );
}
