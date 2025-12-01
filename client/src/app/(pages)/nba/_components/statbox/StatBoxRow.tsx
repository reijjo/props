import Link from "next/link";
import type { LeaderData, StatType } from "@/lib/utils/types/nba";
import { getTeamLogoUrl } from "@/lib/utils/nbaLogos";
import Image from "next/image";

type StatBoxRowProps = {
  player: LeaderData[StatType][number];
  columns: readonly string[];
};

export default function StatBoxRow({ player, columns }: StatBoxRowProps) {
  const formatValue = (
    value: number | undefined,
    columnName: string
  ): string => {
    if (value === undefined || value === null) return "-";

    // Percentage columns (FG_PCT, FT_PCT, FG3_PCT) → .467 style
    if (columnName.includes("_PCT")) {
      return value.toFixed(3).slice(1); // "0.467" → ".467"
    }

    // All other stats (PTS, REB, MIN, FGM, etc.) → always show .0 if whole
    return value.toFixed(1);
  };

  return (
    <tr>
      <td>
        <Link href={`/nba/player/${player.PLAYER_ID}`}>{player.PLAYER}</Link>
      </td>
      <td>
        <Link href={`/nba/team/${player.TEAM_ID}`} className="team-logo">
          <Image
            src={getTeamLogoUrl(player.TEAM_ID)}
            alt={player.TEAM}
            height={20}
            width={20}
          />
          {player.TEAM}
        </Link>
      </td>
      <td>{player.GP}</td>
      <td>{formatValue(player.MIN, "MIN")}</td>
      {columns.map((col) => (
        <td key={col}>{formatValue((player as any)[col], col)}</td>
      ))}
    </tr>
  );
}
