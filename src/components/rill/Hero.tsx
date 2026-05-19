import { useEffect, useState } from "react";
import { useQuiz } from "./quizContext";

const ROTATING_PHRASES = [
  "Made for energy.",
  "Made for recovery.",
  "Made for longevity.",
  "Made for ME.",
];

const Hero = () => {
  const { open } = useQuiz();
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      const t = setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % ROTATING_PHRASES.length);
        setFadeIn(true);
      }, 400);
      return () => clearTimeout(t);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <img
        className="hero-bg-img"
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
        alt=""
        aria-hidden="true"
      />
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-eyebrow reveal">
          <div className="hero-eyebrow-line"></div>
          <span>AHPRA-Registered Doctors · TGA-Compliant · Australia-Wide</span>
        </div>
        <h1 className="reveal reveal-delay-1">
          Built by science.<br />
          <span className="hero-rotator" aria-live="polite">
            <em
              className="hero-rotator-text"
              style={{ opacity: fadeIn ? 1 : 0, transition: "opacity 400ms ease" }}
            >
              {ROTATING_PHRASES[phraseIdx]}
            </em>
          </span>
        </h1>
        <p className="hero-sub reveal reveal-delay-2">
          Doctor-prescribed peptide protocols for energy, recovery, and long-term health. Available anywhere in Australia.
        </p>
        <div className="hero-actions reveal reveal-delay-3">
          <button className="btn-primary" onClick={open}>
            Start your assessment
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <a href="#protocols" className="btn-ghost">Explore protocols</a>
        </div>
      </div>

      <aside className="hero-foundation-card" aria-label="Featured protocol">
        <span className="hero-foundation-label">Featured Protocol</span>
        <h3 className="hero-foundation-title">Foundation.ME</h3>
        <p className="hero-foundation-desc">
          Doctor-prescribed peptide protocol for energy, recovery and long-term vitality.
        </p>
        <p className="hero-foundation-meta">AHPRA · TGA-compliant</p>
      </aside>

      <div className="hero-bottom">
        <div className="hero-scroll-hint">
          <div className="scroll-line"></div>
          Scroll to explore
        </div>
      </div>
    </section>
  );
};

export default Hero;
