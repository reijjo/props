import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-image">
        <Image
          src="/images/proplanding.jpg"
          fill
          alt="hero-section"
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 0 }}
          className="hero-img"
          priority
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Welcome to Our Site</h1>
          <p>Your tagline here</p>
        </div>
      </div>
    </section>
  );
}
