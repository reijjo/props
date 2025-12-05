import "./teams.css";

import { getTeamsList } from "@/lib/api/nbaAPi";
import Link from "next/link";
import Image from "next/image";

export default async function NbaTeams() {
  const data = await getTeamsList();

  if (!data || !data.teams) {
    return <p>No teams found</p>;
  }

  console.log(data.teams[0]);

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
                src={team.logos[0].href}
                alt={team.abbreviation}
                width={42}
                height={42}
              />
              <p>{team.displayName}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
