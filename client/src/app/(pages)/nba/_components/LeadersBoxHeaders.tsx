type LeaderBoxHeadersProps = {
  stats: string[];
};

export default function LeaderBoxHeaders({ stats }: LeaderBoxHeadersProps) {
  return (
    <thead>
      <tr>
        <th scope="col">name</th>
        <th scope="col">team</th>
        <th scope="col">gp</th>
        <th scope="col">min</th>
        {stats.map((stat) => (
          <th scope="col" key={stat}>
            {stat}
          </th>
        ))}
      </tr>
    </thead>
  );
}
