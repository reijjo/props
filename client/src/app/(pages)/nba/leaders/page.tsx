import "./style.css";
import PageHeader from "@/components/shared/page-header/PageHeader";
import LeadersBox from "../_components/LeadersBox";

export default function NbaLeaders() {
  return (
    <main className="nba-leaders-page">
      <PageHeader />
      <div className="leader-boxes wrapper">
        <LeadersBox header="Points per game" stat="PTS" />
        <LeadersBox header="Rebounds per game" stat="REB" />
        <LeadersBox header="Assists/Turnovers per game" stat="AST" />
        <LeadersBox header="3pts made per game" stat="FG3M" />
        <LeadersBox header="Blocks per game" stat="BLK" />
        <LeadersBox header="Steals per game" stat="STL" />
      </div>
    </main>
  );
}
