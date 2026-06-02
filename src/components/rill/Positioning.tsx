import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import personImg from "@/assets/positioning-person.png";

const pills = [
  "AHPRA-Registered GPs",
  "Registered Compounding Pharmacies",
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
        .positioning-hero {
          position: relative;
          width: 100%;
          height: clamp(420px, 56vw, 640px);
          overflow: hidden;
          background:
            radial-gradient(ellipse at 50% 110%, rgba(255,235,200,0.55) 0%, rgba(255,235,200,0) 55%),
            linear-gradient(180deg, #BFD4E2 0%, #D6E2EA 40%, #E8E6DC 80%, #EDE8E0 100%);
        }
        .positioning-arc {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.75;
        }
        .positioning-hero-text {
          position: absolute;
          top: 0; left: 0; right: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 56px 32px 0;
          z-index: 2;
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
          margin: 0;
          max-width: 880px;
        }
        .positioning-h2 em { font-style: italic; font-weight: 400; }

        .positioning-person {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 78%;
          width: auto;
          object-fit: contain;
          object-position: bottom center;
          z-index: 1;
          filter: drop-shadow(0 30px 40px rgba(26,43,53,0.18));
        }
        .positioning-hero::after {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 80px;
          background: linear-gradient(180deg, rgba(237,232,224,0) 0%, #EDE8E0 100%);
          z-index: 2;
          pointer-events: none;
        }

        .positioning-cards {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 20px;
          padding: 8px 28px 28px;
          position: relative;
          z-index: 3;
        }

        .pos-card {
          border-radius: 22px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          min-height: 260px;
          display: flex;
          flex-direction: column;
        }
        .pos-card-dark {
          background: #1A2B35;
          color: #fff;
        }
        .pos-card-light {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.6);
          color: #1A2B35;
        }
        .pos-card-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
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

        .pos-card-foot {
          margin-top: auto;
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

        .pos-card-lead {
          font-family: 'Fraunces', serif;
          font-weight: 400;
          font-size: clamp(22px, 2.2vw, 30px);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0 0 14px;
        }
        .pos-card-lead em { font-style: italic; }

        .positioning-pills {
          display: flex;
          flex-wrap: nowrap;
          gap: 8px;
          margin-top: auto;
        }
        .positioning-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(26,43,53,0.08);
          padding: 8px 12px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 11.5px;
          color: #1A2B35;
          white-space: nowrap;
          flex: 0 1 auto;
        }
        .positioning-pill svg { color: #FF5003; flex-shrink: 0; }

        @media (max-width: 1100px) {
          .positioning-pills { flex-wrap: wrap; }
        }
        @media (max-width: 960px) {
          .positioning-cards { grid-template-columns: 1fr; padding: 8px 20px 20px; }
          .positioning-hero-text { padding-top: 40px; }
          .pos-card { padding: 26px; min-height: 0; }
        }
      `}</style>

      {/* Hero: gradient + dotted arc + cutout person + headline */}
      <div className="positioning-hero">
        <svg className="positioning-arc" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M -50 480 Q 600 100 1250 380"
            fill="none"
            stroke="#FF5003"
            strokeWidth="1.5"
            strokeDasharray="2 8"
            opacity="0.5"
          />
          <circle cx="220" cy="340" r="6" fill="#FF5003" opacity="0.35" />
          <circle cx="600" cy="195" r="7" fill="#FF5003" opacity="0.4" />
          <circle cx="980" cy="280" r="5" fill="#FF5003" opacity="0.35" />
        </svg>

        <div className="positioning-hero-text">
          <div className="scroll-animate positioning-eyebrow">WHAT WE DO</div>
          <h2 className="scroll-animate delay-100 positioning-h2">
            Personalised. <em>Evidence-informed.</em><br />Designed around you.
          </h2>
        </div>

        <img className="positioning-person" src={personImg} alt="Meora patient" loading="lazy" />
      </div>

      {/* Two cards below */}
      <div className="positioning-cards">
        {/* Clinical integrity (dark) */}
        <div className="pos-card pos-card-dark scroll-animate delay-100">
          <div className="pos-card-head">
            <div className="pos-card-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="pos-card-title">Clinical integrity</div>
          </div>
          <p className="pos-card-body">
            Professional GP oversight paired with cutting-edge longevity science — protocols that are safe, measured, and genuinely effective for your biology.
          </p>
          <div className="pos-card-foot">
            <span className="pos-card-foot-label">Verified Protocol</span>
            <div className="pos-avatars"><span /><span /></div>
          </div>
        </div>

        {/* GP-supervised clinic (light) with inline pills */}
        <div className="pos-card pos-card-light scroll-animate delay-200">
          <p className="pos-card-lead">
            A <em>GP-supervised</em> longevity clinic built on peer-reviewed research — tailored to your biology, your goals, your life.
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
