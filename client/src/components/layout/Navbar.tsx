"use client";

import "./Navbar.css";
import Link from "next/link";
import Button from "../ui/Button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  console.log(path);
  return (
    <nav>
      <div className="nav-logo">
        <Link href="/">
          <h4>Ropsit</h4>
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link href="/nba" className={path === "/nba" ? "active" : ""}>
            NBA
          </Link>
        </li>
      </ul>
      <div className="nav-buttons">
        <Button className="btn-outline">Login</Button>
        <Button className="btn-cta">Sign Up</Button>
      </div>
    </nav>
  );
}
