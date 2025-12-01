import "./nba.css";
import LeadersBox from "./_components/statbox/StatBox";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import GamesToday from "./_components/games-scores/GamesToday";

export default function Nba() {
  return (
    <main className="nba-page">
      <section className="nba-today wrapper">
        <h1>NBA</h1>
        <h2>NBA Games & Scores</h2>
        <GamesToday />
      </section>
      <section className="nba-page-leaders wrapper">
        <h2>NBA Leaders</h2>
        <LeadersBox header="Points per game" stat="PTS" />
        <Link href="/nba/leaders" className="nba-page-link">
          <Button className="btn-outline btn-with-icon">
            View All Leaderboards
            <MoveRight size={14} className="btn-icon" />
          </Button>
        </Link>
      </section>
    </main>
  );
}
