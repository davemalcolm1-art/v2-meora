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
        .positioning-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          min-height: 700px;
        }
        .positioning-content {
          padding: 96px 96px 96px 96px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 2;
        }
        .positioning-visual {
          position: relative;
          min-height: 100%;
          overflow: hidden;
        }
        .positioning-visual::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(26,43,53,0.32) 0%, rgba(26,43,53,0) 60%);
          z-index: 1;
        }
        .positioning-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .positioning-glow-1 {
          position: absolute;
          top: -48px;
          right: -48px;
          width: 280px;
          height: 280px;
          background: rgba(255,80,3,0.18);
          filter: blur(100px);
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }
        .positioning-glow-2 {
          position: absolute;
          top: 50%;
          left: -48px;
          width: 160px;
          height: 160px;
          background: rgba(26,43,53,0.4);
          filter: blur(60px);
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }
        .positioning-card {
          position: absolute;
          bottom: 96px;
          left: -56px;
          width: 320px;
          background: #1A2B35;
          color: #fff;
          padding: 28px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.45);
          z-index: 3;
        }
        .positioning-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #FF5003;
          margin-bottom: 28px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }
        .positioning-eyebrow::before {
          content: "";
          width: 28px;
          height: 1px;
          background: #FF5003;
        }
        .positioning-h2 {
          font-family: 'Fraunces', serif;
          font-weight: 400;
          font-size: clamp(40px, 5.2vw, 76px);
          line-height: 1.04;
          letter-spacing: -0.025em;
          color: #1A2B35;
          margin: 0 0 28px;
        }
        .positioning-h2 em {
          font-style: italic;
          font-weight: 400;
        }
        .positioning-p {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 19px;
          line-height: 1.65;
          color: rgba(26,43,53,0.7);
          max-width: 540px;
          margin: 0 0 40px;
        }
        .positioning-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .positioning-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 2px 8px rgba(26,43,53,0.04);
          padding: 11px 18px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 13px;
          color: #1A2B35;
        }
        .positioning-pill svg { color: #FF5003; flex-shrink: 0; }
        .positioning-card-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
        }
        .positioning-card-badge {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FF5003;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .positioning-card-title {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 400;
          font-size: 20px;
          color: #fff;
        }
        .positioning-card-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255,255,255,0.72);
          margin: 0;
        }
        .positioning-card-foot {
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.12);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .positioning-card-foot-label {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
        }
        .positioning-avatars { display: flex; }
        .positioning-avatars span {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #1A2B35;
          background: #9CA3AF;
          margin-left: -6px;
        }
        .positioning-avatars span:first-child { margin-left: 0; background: #6B7280; }

        @media (max-width: 960px) {
          .positioning-grid { grid-template-columns: 1fr; }
          .positioning-content { padding: 56px 32px; }
          .positioning-visual { min-height: 520px; }
          .positioning-card {
            left: 24px;
            right: 24px;
            width: auto;
            bottom: 24px;
          }
        }
      `}</style>

      <div className="positioning-grid">
        {/* Content */}
        <div className="positioning-content">
          <div className="scroll-animate positioning-eyebrow">WHAT WE DO</div>
          <h2 className="scroll-animate delay-100 positioning-h2">
            Personalised.<br />
            <em>Evidence-informed.</em><br />
            Designed around you.
          </h2>
          <p className="scroll-animate delay-200 positioning-p">
            Meora is a GP-supervised longevity clinic. Our compounding peptide protocols are built on peer-reviewed research and tailored to your biology, your goals, and your life.
          </p>
          <div className="scroll-animate delay-300 positioning-pills">
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

        {/* Visual */}
        <div className="positioning-visual">
          <img
            src={clinicalImg}
            alt="Meora clinical pharmacy"
            loading="lazy"
            width={896}
            height={1280}
            className="positioning-img"
          />
          <div className="positioning-glow-1" aria-hidden="true" />
          <div className="positioning-glow-2" aria-hidden="true" />

          <div className="positioning-card scroll-animate delay-200">
            <div className="positioning-card-head">
              <div className="positioning-card-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="positioning-card-title">Clinical integrity</div>
            </div>
            <p className="positioning-card-body">
              Combining professional GP oversight with cutting-edge longevity science to deliver results that are both safe and effective.
            </p>
            <div className="positioning-card-foot">
              <span className="positioning-card-foot-label">Verified Protocol</span>
              <div className="positioning-avatars">
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Positioning;
