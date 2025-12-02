import "./NbaTeamCard.css";

import Link from "next/link";
import Image from "next/image";
import { getTeamLogoUrl } from "@/lib/utils/nbaLogos";
import { NbaTeam } from "@/lib/utils/types/nba";

type NbaTeamCardProps = {
  team: NbaTeam;
  awayTeam?: boolean;
  opponentScore?: number;
};

export default function NbaTeamCard({
  team,
  awayTeam,
  opponentScore = 0,
}: NbaTeamCardProps) {
  const isAwayTeam = awayTeam ? "away" : "home";
  const isWinner = team.score > opponentScore;

  return (
    <div className={`nba-today-${isAwayTeam}`}>
      <div className="nba-today-logo-record">
        <Link href={`/nba/teams/${team.teamId}`}>
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
      {team.score > 0 && (
        <h2 className={isWinner ? "winner" : ""}>{team.score}</h2>
      )}
    </div>
  );
}
