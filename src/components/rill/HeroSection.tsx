import { useState, useEffect, useCallback } from "react";
import { useQuiz } from "./quizContext";

// ─── SLIDES ───────────────────────────────────────────────────────────────────
// Replace these URLs with your own images when available.
// Ideal: real people, candid, warm light, 35-55 age range, 1920×1080px landscape.
const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1920&q=85",
    alt: "Two people running outdoors, dawn light",
    position: "center 35%",
  },
  {
    url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1920&q=85",
    alt: "Person running outdoors in morning light",
    position: "center 30%",
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85",
    alt: "Mountain sunrise, warm and aspirational",
    position: "center 50%",
  },
];

// ─── ROTATING WORDS ───────────────────────────────────────────────────────────
const WORDS = ["energy.", "recovery.", "performance.", "longevity.", "beauty.", "ME."];
// Last word gets a longer pause — it's the payoff line
const INTERVALS = [2500, 2500, 2500, 2500, 2500, 3500];

// ─── NAV LINKS ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Protocols",    href: "#protocols" },
  { label: "How It Works", href: "#how" },
  { label: "About",        href: "#about" },
  { label: "Journal",      href: "#journal" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const { open } = useQuiz();

  // ── Slideshow state ────────────────────────────────────────────────────────
  const [currentSlide, setCurrentSlide]       = useState(0);
  const [nextSlide,    setNextSlide]           = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [clipProgress, setClipProgress]       = useState(0);

  // ── Word rotator state ─────────────────────────────────────────────────────
  const [wordIndex,   setWordIndex]   = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  // ── Nav state ──────────────────────────────────────────────────────────────
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Scroll listener ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Lock body scroll when menu is open ────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Word rotator ──────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % WORDS.length);
        setWordVisible(true);
      }, 350);
    }, INTERVALS[wordIndex]);
    return () => clearTimeout(timer);
  }, [wordIndex]);

  // ── Diagonal clip-path slide transition ───────────────────────────────────
  const advanceSlide = useCallback(() => {
    if (isTransitioning) return;
    const next = (currentSlide + 1) % SLIDES.length;
    setNextSlide(next);
    setIsTransitioning(true);
    setClipProgress(0);

    const start    = performance.now();
    const duration = 900;

    const animate = (now: number) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease in-out cubic
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setClipProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentSlide(next);
        setNextSlide(null);
        setIsTransitioning(false);
        setClipProgress(0);
      }
    };
    requestAnimationFrame(animate);
  }, [currentSlide, isTransitioning]);

  useEffect(() => {
    const timer = setInterval(advanceSlide, 5000);
    return () => clearInterval(timer);
  }, [advanceSlide]);

  // ── Diagonal clip-path: sweeps left → right ───────────────────────────────
  const getClipPath = (progress: number) => {
    const p = progress * 200 - 100;
    const a = Math.max(0, p);
    const b = Math.min(100, p + 100);
    return `polygon(${a}% 0%, 100% 0%, 100% 100%, ${b}% 100%)`;
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        /* ── NAV ── */
        .rill-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 72px;
          transition: background 400ms ease,
                      backdrop-filter 400ms ease,
                      border-bottom 400ms ease;
          background: transparent;
          backdrop-filter: none;
          border-bottom: none;
        }
        .rill-nav.scrolled {
          background: rgba(26, 43, 53, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .rill-nav.menu-open {
          background: transparent !important;
          backdrop-filter: none !important;
          border-bottom: none !important;
        }
        .nav-logo {
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-size: 20px;
          color: #fff;
          letter-spacing: 0.04em;
          text-decoration: none;
          z-index: 101;
          position: relative;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nav-links a {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          transition: color 200ms ease;
        }
        .nav-links a:hover { color: #fff; }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
          z-index: 101;
          position: relative;
        }
        .nav-cta {
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          background: #FF5003;
          border: none;
          border-radius: 999px;
          padding: 11px 22px;
          cursor: pointer;
          transition: opacity 200ms ease, transform 200ms ease;
        }
        .nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }

        /* Burger */
        .burger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
          z-index: 101;
          position: relative;
        }
        .burger span {
          display: block;
          height: 1.5px;
          background: #fff;
          border-radius: 2px;
          transition: transform 300ms ease, opacity 300ms ease;
          transform-origin: center;
        }
        .burger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .burger.open span:nth-child(2) { opacity: 0; }
        .burger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* ── FULLSCREEN MENU OVERLAY ── */
        .menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: #1A2B35;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: 0 80px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 350ms ease;
        }
        .menu-overlay.open {
          opacity: 1;
          pointer-events: all;
        }
        .menu-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 56px;
        }
        .menu-nav a {
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-size: clamp(40px, 6vw, 76px);
          color: #fff;
          text-decoration: none;
          line-height: 1.15;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 400ms ease,
                      transform 400ms ease,
                      color 200ms ease;
        }
        .menu-overlay.open .menu-nav a {
          opacity: 1;
          transform: translateY(0);
        }
        .menu-overlay.open .menu-nav a:nth-child(1) { transition-delay: 60ms; }
        .menu-overlay.open .menu-nav a:nth-child(2) { transition-delay: 110ms; }
        .menu-overlay.open .menu-nav a:nth-child(3) { transition-delay: 160ms; }
        .menu-overlay.open .menu-nav a:nth-child(4) { transition-delay: 210ms; }
        .menu-nav a:hover { color: #FF5003; }

        .menu-cta-btn {
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          background: #FF5003;
          border: none;
          border-radius: 999px;
          padding: 18px 40px;
          cursor: pointer;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 400ms ease 300ms,
                      transform 400ms ease 300ms,
                      background 200ms ease;
        }
        .menu-overlay.open .menu-cta-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .menu-cta-btn:hover { background: #e04500; }

        .menu-footer-text {
          position: absolute;
          bottom: 40px;
          left: 80px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── HERO SECTION ── */
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 620px;
          overflow: hidden;
          background: #1A2B35;
        }
        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-repeat: no-repeat;
        }
        .hero-slide-current { z-index: 1; }
        .hero-slide-next    { z-index: 2; }

        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: linear-gradient(
            155deg,
            rgba(26,43,53,0.10) 0%,
            rgba(26,43,53,0.30) 40%,
            rgba(26,43,53,0.88) 100%
          );
        }

        .hero-content {
          position: absolute;
          z-index: 4;
          bottom: 0; left: 0; right: 0;
          padding: 0 80px 88px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Credential bar */
        .hero-credential {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }
        .hero-credential-rule {
          width: 32px;
          height: 1px;
          background: #FF5003;
          flex-shrink: 0;
        }
        .hero-credential-text {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }

        /* Headline */
        .hero-h1 {
          font-family: 'Fraunces', serif;
          font-weight: 900;
          font-size: clamp(48px, 7.5vw, 104px);
          line-height: 1.0;
          color: #fff;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
        }
        .hero-rotating-sub {
          margin-top: 4px;
          margin-bottom: 28px;
          min-height: 1.6em;
        }
        .hero-sub-word {
          display: inline-block;
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-style: italic;
          font-size: clamp(36px, 5vw, 72px);
          color: #FF5003;
          letter-spacing: -0.01em;
          transition: opacity 350ms ease, transform 350ms ease;
        }
        .hero-sub-word.visible { opacity: 1; transform: translateY(0); }
        .hero-sub-word.hidden  { opacity: 0; transform: translateY(8px); }

        /* Subline */
        .hero-subline {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 17px;
          line-height: 1.65;
          color: rgba(255,255,255,0.65);
          max-width: 460px;
          margin-bottom: 44px;
        }

        /* Buttons */
        .hero-buttons {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .hero-btn-primary {
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          background: #FF5003;
          border: none;
          border-radius: 999px;
          padding: 16px 32px;
          cursor: pointer;
          transition: opacity 200ms ease, transform 200ms ease;
        }
        .hero-btn-primary:hover { opacity: 0.88; transform: translateY(-2px); }

        .hero-btn-secondary {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.82);
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.32);
          border-radius: 999px;
          padding: 15px 32px;
          cursor: pointer;
          transition: border-color 200ms ease,
                      color 200ms ease,
                      transform 200ms ease;
          text-decoration: none;
          display: inline-block;
        }
        .hero-btn-secondary:hover {
          border-color: rgba(255,255,255,0.65);
          color: #fff;
          transform: translateY(-2px);
        }

        /* Slide dot indicators */
        .hero-indicators {
          position: absolute;
          z-index: 4;
          bottom: 96px;
          right: 80px;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .hero-dot {
          width: 24px;
          height: 2px;
          background: rgba(255,255,255,0.3);
          border-radius: 1px;
          cursor: pointer;
          border: none;
          padding: 0;
          transition: background 300ms ease, width 300ms ease;
        }
        .hero-dot.active {
          background: #FF5003;
          width: 40px;
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .rill-nav { padding: 0 24px; }
          .nav-links { display: none; }
          .hero-content { padding: 0 24px 64px; }
          .hero-indicators { right: 24px; bottom: 72px; }
          .menu-overlay { padding: 0 32px; }
          .menu-footer-text { left: 32px; }
          .menu-nav a { font-size: clamp(32px, 8vw, 52px); }
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className={`rill-nav ${menuOpen ? "menu-open" : scrolled ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo" style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none"
        }}>
          <img
            src="/meora-mark-white.svg"
            alt="Meora"
            style={{ height: "36px", width: "auto" }}
          />
          <span style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: "18px",
            color: "#fff",
            letterSpacing: "0.08em"
          }}>
            MEORA
          </span>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="nav-cta" onClick={open}>
            Start Your Assessment
          </button>
          <button
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── FULLSCREEN MENU OVERLAY ─────────────────────────────────────────── */}
      <div className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        <nav className="menu-nav">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="menu-cta-btn"
          onClick={() => { setMenuOpen(false); open(); }}
        >
          Start Your Assessment →
        </button>
        <div className="menu-footer-text">
          AHPRA-Registered · Registered Compounding Pharmacy · Australia-Wide
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="hero-section">

        {/* Current slide */}
        <div
          className="hero-slide hero-slide-current"
          style={{
            backgroundImage:    `url(${SLIDES[currentSlide].url})`,
            backgroundPosition: SLIDES[currentSlide].position,
          }}
        />

        {/* Next slide — diagonal wipe reveal */}
        {nextSlide !== null && (
          <div
            className="hero-slide hero-slide-next"
            style={{
              backgroundImage:    `url(${SLIDES[nextSlide].url})`,
              backgroundPosition: SLIDES[nextSlide].position,
              clipPath:           getClipPath(clipProgress),
            }}
          />
        )}

        {/* Dark gradient overlay */}
        <div className="hero-overlay" />

        {/* Slide dots */}
        <div className="hero-indicators">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === currentSlide ? "active" : ""}`}
              onClick={() => {
                if (!isTransitioning && i !== currentSlide) setCurrentSlide(i);
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="hero-content">

          <div className="hero-credential">
            <div className="hero-credential-rule" />
            <span className="hero-credential-text">
              AHPRA-Registered Doctors · TGA-Compliant · Australia-Wide
            </span>
          </div>

          <div className="hero-h1">
            It starts with{" "}
            <span style={{ color: "#FF5003", fontStyle: "italic" }}>ME.</span>
          </div>

          <div className="hero-rotating-sub">
            <span className={`hero-sub-word ${wordVisible ? "visible" : "hidden"}`}>
              {["For energy.", "For recovery.", "For performance.", "For longevity.", "For beauty.", "For ME."][wordIndex]}
            </span>
          </div>

          <p className="hero-subline">
            Doctor-prescribed peptide protocols for energy, recovery, and
            long-term health. Available anywhere in Australia.
          </p>

          <div className="hero-buttons">
            <button className="hero-btn-primary" onClick={open}>
              Start Your Assessment →
            </button>
            <a href="#protocols" className="hero-btn-secondary">
              Explore Protocols
            </a>
          </div>

        </div>
      </section>
    </>
  );
};

export default HeroSection;
