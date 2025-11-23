import Link from "next/link";
import { ReactNode } from "react";

type LeadersBoxRowProps = {
  name: string;
  team: string;
  values: ReactNode[];
};

export default function LeadersBoxRow({
  name,
  team,
  values,
}: LeadersBoxRowProps) {
  return (
    <tr>
      <td>
        <Link href="/nba">{name}</Link>
      </td>
      <td>
        <Link href="/nba">{team}</Link>
      </td>
      {values.map((value, index) => (
        <td key={index}>{value}</td>
      ))}
    </tr>
  );
}
