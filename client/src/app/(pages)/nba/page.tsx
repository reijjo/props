import "./style.css";
import PageHeader from "@/components/shared/page-header/PageHeader";
import LeadersBox from "./_components/LeadersBox";

export default function Nba() {
  return (
    <main className="nba-page">
      <PageHeader />
      <LeadersBox header="Points per game" stat="PTS" />
    </main>
  );
}
