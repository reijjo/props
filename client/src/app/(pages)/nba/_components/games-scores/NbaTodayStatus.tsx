import "./NbaTodayStatus.css";
import { formattedDate, formatGameTime } from "@/lib/utils/format";
import { NbaToday } from "@/lib/utils/types/nba";

type NbaTodayStatusProps = {
  game: NbaToday;
};

export default function NbaTodayStatus({ game }: NbaTodayStatusProps) {
  return (
    <div className="nba-today-gamestatus">
      {game.gameStatus === 1 ? (
        <>
          <p className="game-date">{formattedDate(game)}</p>
          <h3>{formatGameTime(game.gameTimeUTC, game.gameStatusText)}</h3>
        </>
      ) : (
        <h3>{game.gameStatusText}</h3>
      )}
    </div>
  );
}
