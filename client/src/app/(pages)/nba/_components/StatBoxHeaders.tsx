import { formatColumnName } from "@/lib/utils/format";

type StatBoxHeadersProps = {
  columns: readonly string[];
};

export default function StatBoxHeaders({ columns }: StatBoxHeadersProps) {
  return (
    <thead>
      <tr>
        <th scope="col">name</th>
        <th scope="col">team</th>
        <th scope="col">gp</th>
        <th scope="col">min</th>
        {columns.map((stat) => (
          <th scope="col" key={stat}>
            {formatColumnName(stat)}
          </th>
        ))}
      </tr>
    </thead>
  );
}
