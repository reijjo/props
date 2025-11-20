import PageHeader from "@/components/shared/page-header/PageHeader";
import Button from "@/components/ui/Button";
import LeadersBox from "./_components/LeadersBox";

export default function Nba() {
  return (
    <main className="nba-page wrapper">
      <PageHeader />
      <LeadersBox />
    </main>
  );
}
