import "./NbaTeamCard.css";

import Link from "next/link";
import Image from "next/image";
import { getTeamLogoUrl } from "@/lib/utils/nbaLogos";
import { NbaTeam } from "@/lib/utils/types/nba";
import { GameStatus } from "@/lib/utils/enums/nba";

type NbaTeamCardProps = {
  team: NbaTeam;
  awayTeam?: boolean;
  opponentScore: number;
  gameStatus?: number;
};

export default function NbaTeamCard({
  team,
  awayTeam,
  opponentScore,
  gameStatus,
}: NbaTeamCardProps) {
  const isAwayTeam = awayTeam ? "away" : "home";
  const isWinner = team.score > opponentScore;

  return (
    <div className={`nba-today-${isAwayTeam}`}>
      <div className="nba-today-logo-record">
        <p className="home-or-away">{isAwayTeam}</p>
        <Link
          href={`/nba/teams/${team.teamId}`}
          className="nba-today-team-link"
        >
          <Image
            src={getTeamLogoUrl(team.teamId)}
            alt={team.teamName}
            height={48}
            width={48}
          />
        </Link>{" "}
        <p className="nba-today-team">
          {team.teamCity} <br />
          {team.teamName}
        </p>
        <p className="nba-today-home-record">
          {team.wins} - {team.losses}
        </p>
      </div>
      {gameStatus !== GameStatus.SCHEDULED && (
        <h2 className={isWinner ? "winner" : ""}>{team.score}</h2>
      )}
    </div>
  );
}
