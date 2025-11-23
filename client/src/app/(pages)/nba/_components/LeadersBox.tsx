import "./LeadersBox.css";
import LeaderBoxHeaders from "./LeadersBoxHeaders";
import LeadersBoxRow from "./LeadersBoxRow";

const columns = [
  "pts",
  "fgm",
  "fga",
  "fg%",
  "3pm",
  "3pa",
  "3p%",
  "ftm",
  "fta",
  "ft%",
];

const values = [11, 30.6, 34.5, 12, 23, 45.5, 3.0, 8.0, 33.0, 5.5, 7.5, 33.0];

type LeadersBoxProps = {
  header: string;
};

export default function LeadersBox({ header }: LeadersBoxProps) {
  return (
    <section className="leaders-box wrapper">
      <h2>{header}</h2>
      <div className="table-wrapper">
        <table aria-label={`NBA ${header} leaders for 2025-2026 season`}>
          <LeaderBoxHeaders stats={columns} />
          <tbody>
            <LeadersBoxRow name="Luka Doncic" team="LAL" values={values} />
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
