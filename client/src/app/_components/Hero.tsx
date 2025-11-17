import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Player props done right</h1>
        <div className="hero-desc">
          <p className="tagline">Only what you actually need. Nothing extra.</p>
          <p className="tagline">
            We got all the necessary player stats that you need for fantasy
            sports or sports betting. We are going to add NHL and English
            Premier League stats soon, but for now check our NBA stats.
          </p>
        </div>
        <div className="hero-action">
          <button className="btn-cta">NBA stats</button>
        </div>
      </div>
      <div className="hero-image">
        <Image
          src="/images/proplanding.jpg"
          fill
          alt="Start finding the best props"
          sizes="100vw"
          style={{ objectFit: "fill", zIndex: 0 }}
          className="hero-img"
          priority
        />
        <div className="hero-overlay" />
      </div>
    </section>
  );
}
