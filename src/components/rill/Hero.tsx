import { useEffect, useRef, useState } from "react";
import { useQuiz } from "./quizContext";

const ROTATING_WORDS = [
  { word: "energy.", hold: 2500 },
  { word: "recovery.", hold: 2500 },
  { word: "performance.", hold: 2500 },
  { word: "longevity.", hold: 2500 },
  { word: "beauty.", hold: 2500 },
  { word: "ME.", hold: 3500 },
];

const Hero = () => {
  const { open } = useQuiz();
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const hold = ROTATING_WORDS[idx].hold;
    timeoutRef.current = window.setTimeout(() => {
      setVisible(false);
      timeoutRef.current = window.setTimeout(() => {
        setIdx((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 300);
    }, hold);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [idx]);

  return (
    <section className="hero hero--v2">
      <div className="hero-v2-bg" aria-hidden="true"></div>
      <div className="hero-v2-content">
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-line"></div>
          <span>AHPRA-Registered Doctors · TGA-Compliant · Australia-Wide</span>
        </div>
        <h1 className="hero-v2-headline">
          <span className="hero-v2-static">Built by science.</span>
          <br />
          <span className="hero-v2-static">Made for </span>
          <span className="hero-rotator" aria-live="polite">
            <em
              className="hero-rotator-text"
              style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms ease" }}
            >
              {ROTATING_WORDS[idx].word}
            </em>
          </span>
        </h1>
        <p className="hero-sub">
          Doctor-prescribed peptide protocols for energy, recovery, and long-term health. Available anywhere in Australia.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={open}>
            Start your assessment
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <a href="#protocols" className="btn-ghost">Explore protocols</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
