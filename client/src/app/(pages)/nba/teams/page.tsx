import "./teams.css";

import { getTeamsList } from "@/lib/api/nbaAPi";
import Link from "next/link";
import Image from "next/image";

export default async function NbaTeams() {
  const data = await getTeamsList();

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
              {team.logos?.[0] ? (
                <Image
                  src={team.logos[0].href}
                  alt={team.abbreviation}
                  width={42}
                  height={42}
                />
              ) : (
                <span>{team.abbreviation}</span> // or a placeholder graphic
              )}
              <p>{team.displayName}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
