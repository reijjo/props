import "./StatBox.css";
import { getLeaders } from "@/lib/api/nbaAPi";
import StatBoxHeaders from "./StatBoxHeaders";
import StatBoxRow from "./StatBoxRow";
import type { LeaderData } from "@/lib/utils/types/nba";
import {
  LEADER_COLUMNS,
  type StatType,
} from "@/lib/utils/constants/leaderColumns";

type StatBoxProps = {
  header: string;
  stat: StatType;
};

export default async function StatBox({ header, stat }: StatBoxProps) {
  const res = await getLeaders(stat);
  const players: LeaderData[typeof stat] = res?.data || [];

  const columns = LEADER_COLUMNS[stat];

  return (
    <section className="leaders-box wrapper">
      <h2>{header}</h2>
      <div className="table-wrapper">
        <table aria-label={`NBA ${header} leaders for 2025-2026 season`}>
          <StatBoxHeaders columns={columns} />
          <tbody>
            {players.map((player) => (
              <StatBoxRow
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
