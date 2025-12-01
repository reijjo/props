import "./nba.css";
import LeadersBox from "./_components/statbox/StatBox";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import NbaGame from "./_components/games-scores/NbaGame";

export default function Nba() {
  return (
    <main className="nba-page">
      <section className="nba-today wrapper">
        <h3>NBA Games & Scores</h3>
        <NbaGame />
      </section>
      <section className="nba-page-leaders wrapper">
        <h3>NBA Leaders</h3>
        <LeadersBox header="Points per game" stat="PTS" />
        <Link href="/nba/leaders" className="nba-page-link">
          <Button className="btn-outline btn-with-icon">
            <p>View All Leaderboards</p>
            <MoveRight size={14} className="btn-icon" />
          </Button>
        </Link>
      </section>
    </main>
  );
}
