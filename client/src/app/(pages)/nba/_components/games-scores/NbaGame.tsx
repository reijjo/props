import Link from "next/link";
import "./NbaGame.css";
import Image from "next/image";
import { getTeamLogoUrl } from "@/lib/utils/nbaLogos";
import { ReactNode } from "react";

type NbaGameProps = {
  gameStatusText: string;
  teamId: number;
  teamCity: string;
  teamName: string;
  wins: number;
  losses: number;
  score: number;
  score2: number;
};

export default function NbaGame({
  gameStatusText = "Final3",
  teamId = 1610612739,
  teamCity = "Los Angeles",
  teamName = "Clippers",
  wins = 5,
  losses = 10,
  score = 124,
  score2 = 128,
}: NbaGameProps) {
  const isHomeWinner = score > score2;
  const isGameEnded = gameStatusText === "Final";

  return (
    <article className="nba-today-game">
      <div className="nba-today-home">
        <div className="nba-today-logo-record">
          <Link href={`/nba/teams/${teamId}`}>
            <Image
              src={getTeamLogoUrl(teamId)}
              alt={teamName}
              height={48}
              width={48}
            />
          </Link>{" "}
          <p className="nba-today-team">
            {teamCity} <br />
            {teamName}
          </p>
          <p className="nba-today-home-record">
            {wins} - {losses}
          </p>
        </div>
        {isGameEnded && (
          <h2 className={isHomeWinner ? "winner" : ""}>{score}</h2>
        )}
      </div>

      <div className="nba-today-gamestatus">
        {isGameEnded ? "Final" : "KLOCKAN TSUGO"}
      </div>

      <div className="nba-today-away">
        <div className="nba-today-logo-record">
          <Link href={`/nba/teams/${teamId}`}>
            <Image
              src={getTeamLogoUrl(teamId)}
              alt={teamName}
              height={48}
              width={48}
            />
          </Link>{" "}
          <p className="nba-today-team">
            {teamCity} <br />
            {teamName}
          </p>
          <p className="nba-today-away-record">
            {wins} - {losses}
          </p>
        </div>
        {isGameEnded && (
          <h2 className={!isHomeWinner ? "winner" : ""}>{score2}</h2>
        )}
      </div>
    </article>
  );
}
