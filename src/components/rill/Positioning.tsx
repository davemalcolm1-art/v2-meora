import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroAsset from "@/assets/positioning-hero.jpg.asset.json";
const heroImg = heroAsset.url;

const pills = [
  "AHPRA-Registered GPs",
  "Compounding Pharmacies",
  "Clinically safe and effective",
];

const personalisedPills = [
  "Tailored to your biomarkers",
  "Reviewed by your GP",
  "Adjusted as you progress",
];

const Positioning = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="scroll-animate positioning-section"
      style={{
        background: "#F5F0E8",
        position: "relative",
        padding: "24px 0",
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
          color: #1a1a1a;
          margin: 0 auto;
          max-width: 880px;
        }
        .positioning-h2 em { font-style: italic; font-weight: 400; }
        .pos-hl { color: #1a1a1a; }
        .pos-hl-big { color: #1a1a1a; font-size: 1.18em; }

        .positioning-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          padding: 8px 28px 28px;
        }

        .pos-card {
          border-radius: 16px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          min-height: 460px;
          display: flex;
          flex-direction: column;
          transition: transform 0.45s cubic-bezier(.2,.7,.2,1), box-shadow 0.45s ease, background 0.45s ease;
          will-change: transform;
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0,0,0,0.06);
        }
        .pos-card:hover {
          transform: translateY(-6px);
        }
        .pos-card-dark {
          box-shadow: 0 18px 50px -22px rgba(26,43,53,0.45);
        }
        .pos-card-dark:hover {
          box-shadow: 0 28px 70px -24px rgba(26,43,53,0.55);
        }
        .pos-card-light {
          box-shadow: 0 18px 50px -24px rgba(26,43,53,0.18);
        }
        .pos-card-light:hover {
          box-shadow: 0 28px 70px -24px rgba(26,43,53,0.25);
        }
        .pos-card-image {
          box-shadow: 0 18px 50px -20px rgba(26,43,53,0.35);
        }
        .pos-card-image:hover {
          box-shadow: 0 30px 70px -22px rgba(26,43,53,0.45);
        }

        .pos-card-image {
          padding: 0;
          background: rgba(255,255,255,0.65);
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
        .pos-card-image-head {
          position: absolute;
          top: 24px;
          left: 32px;
          z-index: 2;
          margin-bottom: 0;
        }
        .pos-card-image-head .pos-card-title { color: #fff; }

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
          color: #1a1a1a;
        }
        .pos-card-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.6;
          margin: 0;
          color: rgba(10,10,10,0.6);
        }

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
          border: 2px solid #0f0f0f;
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
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(0,0,0,0.08);
          padding: 13px 18px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #1a1a1a;
          white-space: nowrap;
          box-shadow: 0 4px 14px -6px rgba(26,43,53,0.08);
        }
        .positioning-pill svg { color: #FF5003; flex-shrink: 0; }

        .pos-left-pills {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 10px;
          margin-top: 24px;
        }
        .pos-card-gradient {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pos-card-gradient span {
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-style: italic;
          font-size: 28px;
          color: #F5F0E8;
          text-align: center;
          padding: 0 24px;
        }
        .no-after::after {
          display: none !important;
        }


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
          <span className="pos-hl">Personalised</span>. <em>Compliance-first.</em><br />Designed for <span className="pos-hl-big">you</span>.
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
          <div className="pos-left-pills">
            {personalisedPills.map((p) => (
              <span key={p} className="positioning-pill">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Middle: gradient placeholder */}
        <div className="pos-card pos-card-image no-after scroll-animate delay-150">
          <div className="pos-card-gradient">
            <span>Longevity, made personal.</span>
          </div>
          <div className="pos-card-head pos-card-image-head">
            <div className="pos-card-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="pos-card-title">Built for you</div>
          </div>
          <a href="/book" className="pos-card-cta pos-card-image-cta">
            Meet your GP
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
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
            <div className="pos-card-title">Compliance First</div>
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
