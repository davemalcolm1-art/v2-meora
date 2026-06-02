import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import clinicalImg from "@/assets/positioning-clinical.jpg";

const pills = [
  "AHPRA-Registered GPs",
  "Registered Compounding Pharmacies",
  "Evidence-informed Protocols",
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
          height: clamp(360px, 52vw, 620px);
          overflow: hidden;
        }
        .positioning-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 35%;
          display: block;
        }
        .positioning-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(26,43,53,0) 55%, rgba(237,232,224,0.55) 100%);
          pointer-events: none;
        }
        .positioning-hero-text {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          padding: 72px 32px 0;
          z-index: 2;
        }
        .positioning-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #FF5003;
          margin-bottom: 20px;
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
          font-size: clamp(36px, 4.8vw, 68px);
          line-height: 1.04;
          letter-spacing: -0.025em;
          color: #1A2B35;
          margin: 0;
          max-width: 900px;
        }
        .positioning-h2 em { font-style: italic; font-weight: 400; }

        .positioning-cards {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 20px;
          padding: 28px;
        }

        .pos-card {
          border-radius: 22px;
          padding: 36px;
          position: relative;
          overflow: hidden;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
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
          margin-bottom: 18px;
        }
        .pos-card-badge {
          width: 44px;
          height: 44px;
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
          line-height: 1.65;
          margin: 0;
        }
        .pos-card-dark .pos-card-body { color: rgba(255,255,255,0.72); }
        .pos-card-light .pos-card-body { color: rgba(26,43,53,0.72); }

        .pos-card-foot {
          margin-top: 24px;
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
          font-size: clamp(24px, 2.4vw, 32px);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
        }
        .pos-card-lead em { font-style: italic; }

        .positioning-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }
        .positioning-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(26,43,53,0.08);
          padding: 11px 18px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 13px;
          color: #1A2B35;
        }
        .positioning-pill svg { color: #FF5003; flex-shrink: 0; }

        @media (max-width: 960px) {
          .positioning-cards { grid-template-columns: 1fr; padding: 20px; }
          .positioning-hero-text { padding-top: 48px; }
          .pos-card { padding: 28px; min-height: 0; }
        }
      `}</style>

      {/* Hero image with headline */}
      <div className="positioning-hero">
        <img src={clinicalImg} alt="Meora clinical pharmacy" loading="lazy" />
        <div className="positioning-hero-text">
          <div className="scroll-animate positioning-eyebrow">WHAT WE DO</div>
          <h2 className="scroll-animate delay-100 positioning-h2">
            Personalised. <em>Evidence-informed.</em><br />Designed around you.
          </h2>
        </div>
      </div>

      {/* Two cards below */}
      <div className="positioning-cards">
        {/* Clinical integrity (dark) */}
        <div className="pos-card pos-card-dark scroll-animate delay-100">
          <div>
            <div className="pos-card-head">
              <div className="pos-card-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="pos-card-title">Clinical integrity</div>
            </div>
            <p className="pos-card-body">
              Combining professional GP oversight with cutting-edge longevity science to deliver results that are both safe and effective.
            </p>
          </div>
          <div className="pos-card-foot">
            <span className="pos-card-foot-label">Verified Protocol</span>
            <div className="pos-avatars"><span /><span /></div>
          </div>
        </div>

        {/* GP-supervised clinic (light) with pills */}
        <div className="pos-card pos-card-light scroll-animate delay-200">
          <div>
            <p className="pos-card-lead">
              A <em>GP-supervised</em> longevity clinic built on peer-reviewed research — tailored to your biology, your goals, your life.
            </p>
            <div className="positioning-pills">
              {pills.map((p) => (
                <span key={p} className="positioning-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Positioning;
