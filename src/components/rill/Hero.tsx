import { useQuiz } from "./quizContext";

const Hero = () => {
  const { open } = useQuiz();
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
          Built by science.<br /><em>Made for ME.</em>
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
