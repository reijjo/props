import Link from "next/link";
import "./LeadersBox.css";

export default function LeadersBox() {
  return (
    <section className="leaders-box wrapper">
      <h2>Points per game</h2>
      <div className="table-wrapper">
        <table aria-label="NBA points per game leaders for 2025-2026 season">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Team</th>
              <th scope="col">GP</th>
              <th scope="col">Min</th>
              <th scope="col">pts</th>
              <th scope="col">fgm</th>
              <th scope="col">fga</th>
              <th scope="col">fg%</th>
              <th scope="col">3pm</th>
              <th scope="col">3pa</th>
              <th scope="col">3p%</th>
              <th scope="col">ftm</th>
              <th scope="col">fta</th>
              <th scope="col">ft%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link href="/nba">Luka Doncic</Link>
              </td>
              <td>
                <Link href="/nba">LAL</Link>
              </td>
              <td>11</td>
              <td>30.6</td>
              <td>34.5</td>
              <td>12</td>
              <td>23</td>
              <td>45.5</td>
              <td>3.0</td>
              <td>8.0</td>
              <td>33.0</td>
              <td>5.5</td>
              <td>7.5</td>
              <td>33.0</td>
            </tr>
            <tr>
              <td>Shai Gilgeous-Alexander</td>
              <td>OKC</td>
              <td>16</td>
              <td>33.4</td>
              <td>32.0</td>
              <td>10.8</td>
              <td>20.4</td>
              <td>52.9</td>
              <td>2.2</td>
              <td>5.7</td>
              <td>38.5</td>
              <td>8.0</td>
              <td>12.0</td>
              <td>38.5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
