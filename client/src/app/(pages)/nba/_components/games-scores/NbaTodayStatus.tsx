import "./NbaTodayStatus.css";
import { formattedDate, formatGameTime } from "@/lib/utils/format";
import { NbaMatchOdds, NbaToday } from "@/lib/utils/types/nba2";

type NbaTodayStatusProps = {
  game: NbaToday;
  gameTimeUTC: string;
};

function GameOdds({ gameOdds }: { gameOdds: NbaMatchOdds[] }) {
  if (!gameOdds || gameOdds.length === 0) {
    return <p className="game-odds">No odds available</p>;
  }

  const odds = gameOdds[0];

  return (
    <p className="game-odds">
      {odds.details} • O/U {odds.overUnder}
    </p>
  );
}

export default function NbaTodayStatus({
  game,
  gameTimeUTC,
}: NbaTodayStatusProps) {
  const gameStatus = game.competitions[0].status;
  const gameOdds = game.competitions[0].odds;

  return (
    <div className="nba-today-gamestatus">
      {!gameStatus.type.completed ? (
        <>
          <p className="game-date">{formattedDate(gameTimeUTC)}</p>
          <h3>{formatGameTime(gameTimeUTC, gameStatus.type.description)}</h3>
        </>
      ) : (
        <h3>{gameStatus.type.description}</h3>
      )}
      <GameOdds gameOdds={gameOdds} />
    </div>
  );
}
