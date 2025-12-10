import "./teams.css";

import { getTeamsList } from "@/lib/api/nbaAPi";
import Link from "next/link";
import Image from "next/image";
import { getTeamLogoUrl } from "@/lib/utils/nbaLogos";

export default async function NbaTeams() {
  const data = await getTeamsList();

  console.log("DATA*", data);

  if (!data || !data.teams) {
    return (
      <main className="nba-all-teams-page">
        <div className="nba-all-teams wrapper">
          <h1>NBA Teams</h1>
          <p>No teams found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="nba-all-teams-page">
      <div className="nba-all-teams wrapper">
        <h1>NBA Teams</h1>
        <div className="teams-grid">
          {data.teams.map((team) => (
            <Link
              href={`/nba/teams/${team.id}`}
              key={team.id}
              className="team-card"
            >
              <Image
                src={getTeamLogoUrl(Number(team.id))}
                alt={team.abbreviation}
                width={42}
                height={42}
              />

              <p>{team.full_name}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
