import "./LeadersBox.css";
import { getLeaders } from "@/lib/api/nbaAPi";
import LeaderBoxHeaders from "./LeadersBoxHeaders";
import LeadersBoxRow from "./LeadersBoxRow";
import type { LeaderData } from "@/lib/utils/types/nba";
import {
  LEADER_COLUMNS,
  type StatType,
} from "@/lib/utils/contants/leaderColumns";

type LeadersBoxProps = {
  header: string;
  stat: StatType;
};

export default async function LeadersBox({ header, stat }: LeadersBoxProps) {
  const res = await getLeaders(stat);
  const players: LeaderData[typeof stat] = res?.data || [];

  const columns = LEADER_COLUMNS[stat];

  return (
    <section className="leaders-box wrapper">
      <h2>{header}</h2>
      <div className="table-wrapper">
        <table aria-label={`NBA ${header} leaders for 2025-2026 season`}>
          <LeaderBoxHeaders columns={columns} />
          <tbody>
            {players.map((player) => (
              <LeadersBoxRow
                key={player.PLAYER_ID}
                player={player}
                columns={columns}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
