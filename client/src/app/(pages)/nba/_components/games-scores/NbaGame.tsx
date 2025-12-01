import Link from "next/link";
import "./NbaGame.css";
import Image from "next/image";
import { getTeamLogoUrl } from "@/lib/utils/nbaLogos";
import { NbaTeam } from "@/lib/utils/types/nba";
import NbaTeamCard from "./NbaTeamCard";

type NbaGameProps = {
  gameStatusText: string;
  homeTeam: NbaTeam;
  awayTeam: NbaTeam;
};

export default function NbaGame({
  gameStatusText = "Final",
  homeTeam = {
    teamId: 1610612739,
    teamCity: "Los Angeles",
    teamName: "Clippers",
    wins: 15,
    losses: 10,
    score: 122,
  },
  awayTeam = {
    teamId: 1610612740,
    teamCity: "New Orleans",
    teamName: "Pelicans",
    wins: 12,
    losses: 13,
    score: 128,
  },
}: NbaGameProps) {
  const isGameEnded = gameStatusText === "Final";

  return (
    <article className="nba-today-game">
      <NbaTeamCard
        team={homeTeam}
        isGameEnded={isGameEnded}
        opponentScore={awayTeam.score}
      />

      <div className="nba-today-gamestatus">
        {isGameEnded ? "Final" : "KLOCKAN TSUGO"}
      </div>

      <NbaTeamCard
        team={awayTeam}
        isGameEnded={isGameEnded}
        opponentScore={homeTeam.score}
        awayTeam
      />
    </article>
  );
}
