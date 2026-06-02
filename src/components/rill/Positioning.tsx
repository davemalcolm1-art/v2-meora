import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroImg from "@/assets/positioning-hero.jpg";

const pills = [
  "AHPRA-Registered GPs",
  "Compounding Pharmacies",
  "Evidence-informed",
];

const Positioning = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="scroll-animate positioning-section"
      style={{
        background: "#EDE8E0",
        margin: "24px",
        borderRadius: 32,
        overflow: "hidden",
        boxShadow: "0 20px 60px -20px rgba(26,43,53,0.08)",
        border: "1px solid rgba(255,255,255,0.5)",
        position: "relative",
      }}
    >
      <style>{`
        .positioning-header {
          text-align: center;
          padding: 64px 32px 36px;
        }
        .positioning-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #FF5003;
          margin-bottom: 18px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }
        .positioning-eyebrow::before,
        .positioning-eyebrow::after {
          content: "";
          width: 28px;
          height: 1px;
          background: #FF5003;
        }
        .positioning-h2 {
          font-family: 'Fraunces', serif;
          font-weight: 400;
          font-size: clamp(34px, 4.4vw, 60px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: #1A2B35;
          margin: 0 auto;
          max-width: 880px;
        }
        .positioning-h2 em { font-style: italic; font-weight: 400; }

        .positioning-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          padding: 8px 28px 28px;
        }

        .pos-card {
          border-radius: 24px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          min-height: 460px;
          display: flex;
          flex-direction: column;
        }
        .pos-card-dark {
          background: #1A2B35;
          color: #fff;
        }
        .pos-card-light {
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.7);
          color: #1A2B35;
        }
        .pos-card-image {
          padding: 0;
          background: #1A2B35;
        }
        .pos-card-image img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .pos-card-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(26,43,53,0) 55%, rgba(26,43,53,0.55) 100%);
        }
        .pos-card-image-label {
          position: absolute;
          left: 24px;
          bottom: 24px;
          z-index: 2;
          color: #fff;
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-size: 22px;
          line-height: 1.2;
          letter-spacing: -0.01em;
          max-width: 80%;
        }
        .pos-card-image-tag {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 2;
          background: rgba(255,255,255,0.92);
          color: #1A2B35;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 7px 12px;
          border-radius: 999px;
        }

        .pos-card-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
        }
        .pos-card-badge {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FF5003;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pos-card-title {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 400;
          font-size: 22px;
        }
        .pos-card-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.6;
          margin: 0;
        }
        .pos-card-dark .pos-card-body { color: rgba(255,255,255,0.78); }
        .pos-card-light .pos-card-body { color: rgba(26,43,53,0.72); }

        .pos-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: auto;
          align-self: flex-start;
          padding: 13px 22px;
          background: #FF5003;
          color: #fff;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .pos-card-cta:hover { transform: translateY(-2px); background: #ff6320; }

        .pos-card-foot {
          margin-top: 14px;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.12);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pos-card-foot-label {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
        }
        .pos-avatars { display: flex; }
        .pos-avatars span {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #1A2B35;
          background: #9CA3AF;
          margin-left: -6px;
        }
        .pos-avatars span:first-child { margin-left: 0; background: #6B7280; }

        .positioning-pills {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 10px;
          margin-top: auto;
        }
        .positioning-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(26,43,53,0.08);
          padding: 13px 18px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #1A2B35;
          white-space: nowrap;
          box-shadow: 0 4px 14px -6px rgba(26,43,53,0.08);
        }
        .positioning-pill svg { color: #FF5003; flex-shrink: 0; }

        @media (max-width: 1100px) {
          .positioning-grid { grid-template-columns: 1fr 1fr; }
          .pos-card-image { grid-column: 1 / -1; min-height: 320px; }
        }
        @media (max-width: 760px) {
          .positioning-grid { grid-template-columns: 1fr; padding: 8px 20px 20px; }
          .pos-card { padding: 26px; min-height: 0; }
          .pos-card-image { min-height: 280px; }
        }
      `}</style>

      {/* Header */}
      <div className="positioning-header">
        <div className="scroll-animate positioning-eyebrow">WHAT WE DO</div>
        <h2 className="scroll-animate delay-100 positioning-h2">
          Personalised. <em>Evidence-informed.</em><br />Designed around you.
        </h2>
      </div>

      {/* Three-column grid */}
      <div className="positioning-grid">
        {/* Left: Personalised (dark) */}
        <div className="pos-card pos-card-dark scroll-animate delay-100">
          <div className="pos-card-head">
            <div className="pos-card-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="pos-card-title">Personalised</div>
          </div>
          <p className="pos-card-body">
            A protocol shaped to your biomarkers, your goals and your life — not a one-size-fits-all template. Every recommendation is reviewed by your AHPRA-registered GP.
          </p>
          <a href="/book" className="pos-card-cta">
            Meet your GP
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <div className="pos-card-foot">
            <span className="pos-card-foot-label">GP-Supervised</span>
            <div className="pos-avatars"><span /><span /></div>
          </div>
        </div>

        {/* Middle: image */}
        <div className="pos-card pos-card-image scroll-animate delay-150">
          <img src={heroImg} alt="Meora patient" loading="lazy" width={1024} height={1024} />
          <span className="pos-card-image-tag">Built for you</span>
          <div className="pos-card-image-label">
            Longevity, <em>made personal.</em>
          </div>
        </div>

        {/* Right: Evidence-informed (light) */}
        <div className="pos-card pos-card-light scroll-animate delay-200">
          <div className="pos-card-head">
            <div className="pos-card-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
            </div>
            <div className="pos-card-title">Evidence-informed</div>
          </div>
          <p className="pos-card-body">
            Protocols grounded in peer-reviewed research and dispensed through registered Australian compounding pharmacies — measured, safe and genuinely effective.
          </p>
          <div className="positioning-pills">
            {pills.map((p) => (
              <span key={p} className="positioning-pill">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Positioning;
