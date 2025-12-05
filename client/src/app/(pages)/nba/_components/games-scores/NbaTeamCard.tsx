import "./NbaTeamCard.css";

import Link from "next/link";
import Image from "next/image";
import { NbaMatchStatus, NbaMatchTeam } from "@/lib/utils/types/nba2";

type NbaTeamCardProps = {
  team: NbaMatchTeam;
  opponentScore: number | string;
  gameStatus: NbaMatchStatus;
};

export default function NbaTeamCard({
  team,
  opponentScore,
  gameStatus,
}: NbaTeamCardProps) {
  const isWinner = team.score > opponentScore;
  const isAwayTeam = team.homeAway === "away" ? "away" : "home";

  return (
    <div className={`nba-today-${isAwayTeam}`}>
      <div className="nba-today-logo-record">
        <p className="home-or-away">{isAwayTeam}</p>
        <Link href={`/nba/teams/${team.id}`} className="nba-today-team-link">
          <Image
            src={team.team.logo}
            alt={team.team.abbreviation}
            height={40}
            width={40}
          />
        </Link>{" "}
        <p className="nba-today-team">
          {team.team.location} <br />
          {team.team.name}
        </p>
        <p className="nba-today-home-record">{team.records[0].summary}</p>
      </div>
      {gameStatus.type.state !== "pre" && (
        <h2 className={isWinner ? "winner" : ""}>{team.score}</h2>
      )}
    </div>
  );
}
