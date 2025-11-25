import "./nba.css";
import LeadersBox from "./_components/LeadersBox";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Nba() {
  return (
    <main className="nba-page">
      <section className="nba-today wrapper">
        <h2>Today's NBA Games</h2>
      </section>
      <section className="nba-page-leaders wrapper">
        <h2>NBA Leaders</h2>
        <LeadersBox header="Points per game" stat="PTS" />
        <Link href="/nba/leaders">
          <Button className="btn-outline">View All Leaderstables</Button>
        </Link>
      </section>
    </main>
  );
}
