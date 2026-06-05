import { useQuiz } from "./quizContext";

type Protocol = { name: string; desc?: string; mark: string };
type Domain = {
  id: string;
  name: string;
  tagline: string;
  featured: Protocol;
  pills: Protocol[];
};

const MARK = {
  gold: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-gold.png",
  steel: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-steel.png",
  marble: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-marble.png",
  water: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-water.png",
  jungle: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-jungle.png",
  rosegold: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-rosegold.png",
};

const BG: Record<string, string | undefined> = {
  energy: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-energy.jpg",
  performance: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-performance.jpg",
  balance: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-balance.jpg",
  recovery: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-recovery.jpg",
  beauty: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-beauty.jpg",
  longevity: undefined,
};

const domains: Domain[] = [
  {
    id: "energy",
    name: "Energy",
    tagline: "Show up fully. Every single day.",
    featured: { name: "Foundation.ME", desc: "Daily baseline support for energy and clarity.", mark: MARK.gold },
    pills: [
      { name: "Foundation Pro.ME", mark: MARK.gold },
      { name: "Vitality.ME", mark: MARK.gold },
    ],
  },
  {
    id: "performance",
    name: "Performance",
    tagline: "Built to go further than you thought possible.",
    featured: { name: "Performance.ME", desc: "Engineered for output. Built to last.", mark: MARK.steel },
    pills: [
      { name: "Recomposition.ME", mark: MARK.steel },
      { name: "Cognitive Performance.ME", mark: MARK.steel },
    ],
  },
  {
    id: "balance",
    name: "Balance",
    tagline: "When everything feels in sync, everything changes.",
    featured: { name: "Weight Loss GLP-1 Alternatives.ME", desc: "A smarter path to body composition.", mark: MARK.jungle },
    pills: [
      { name: "Weight Loss Pro.ME", mark: MARK.jungle },
      { name: "Weight Loss GLP-1s.ME", mark: MARK.jungle },
    ],
  },
  {
    id: "recovery",
    name: "Recovery",
    tagline: "Built for the comeback.",
    featured: { name: "Recovery.ME", desc: "Repair faster. Come back stronger.", mark: MARK.marble },
    pills: [],
  },
  {
    id: "longevity",
    name: "Longevity",
    tagline: "Play the long game. On your terms.",
    featured: { name: "Longevity.ME", desc: "Long-term support for the long game.", mark: MARK.water },
    pills: [{ name: "Comprehensive Stack.ME", mark: MARK.water }],
  },
  {
    id: "beauty",
    name: "Beauty",
    tagline: "Radiant from within. Supported by science.",
    featured: { name: "Skin & Collagen.ME", desc: "Radiant from within. Supported by science.", mark: MARK.rosegold },
    pills: [],
  },
];

const ProtocolDomains = () => {
  const { open: openQuiz } = useQuiz();

  return (
    <section id="protocols" style={{ background: "#0a0a0a" }}>
      <style>{`
        .pd-section {
          position: relative;
          width: 100vw;
          background: linear-gradient(160deg, #0f1a1a 0%, #0a0a0a 100%);
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .pd-section:last-of-type { border-bottom: none; }
        .pd-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
        }
        .pd-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.65) 100%);
          z-index: 1;
        }
        .pd-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 48px;
          padding: 80px 48px;
        }
        .pd-left { width: 45%; }
        .pd-right { width: 55%; display: flex; flex-direction: column; gap: 48px; }
        .pd-featured {
          background: rgba(15,15,15,0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 40px;
          display: flex; flex-direction: column; gap: 16px;
        }
        .pd-fmark { width: 48px; height: 48px; object-fit: contain; }
        .pd-fname {
          font-family: 'Fraunces', serif; font-weight: 700; font-style: normal;
          font-size: 32px; color: #F5F0E8; line-height: 1.15;
        }
        .pd-fdesc {
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          font-size: 15px; color: rgba(245,240,232,0.55); line-height: 1.5;
        }
        .pd-flearn {
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          font-size: 13px; color: #E8572A; margin-top: 4px;
        }
        .pd-dname {
          font-family: 'Fraunces', serif; font-weight: 700; font-style: normal;
          font-size: 64px; color: #F5F0E8; line-height: 1.05;
        }
        .pd-dtag {
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          font-size: 15px; color: rgba(245,240,232,0.55); margin-top: 8px;
        }
        .pd-pills { display: flex; flex-direction: column; gap: 12px; }
        .pd-pill {
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 12px;
          padding: 18px 24px;
        }
        .pd-pill-name {
          font-family: 'DM Sans', sans-serif; font-weight: 800;
          font-size: 16px; color: #F5F0E8;
        }
        .pd-pill-arrow { color: #E8572A; font-size: 16px; }

        @media (max-width: 768px) {
          .pd-inner {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
            padding: 64px 24px;
            gap: 32px;
          }
          .pd-left, .pd-right { width: 100%; }
          .pd-dname { font-size: 42px; }
          .pd-featured { padding: 28px; }
          .pd-fname { font-size: 26px; }
          .pd-pill { text-align: left; }
        }
      `}</style>

      {domains.map((d) => (
        <div key={d.id} className="pd-section">
          {BG[d.id] && (
            <div
              className="pd-bg"
              style={{ backgroundImage: `url(${BG[d.id]})` }}
            />
          )}
          <div className="pd-overlay" />
          <div className="pd-inner">
            <div className="pd-left">
              <div className="pd-featured">
                <img src={d.featured.mark} alt="" className="pd-fmark" />
                <div className="pd-fname">{d.featured.name}</div>
                <div className="pd-fdesc">{d.featured.desc}</div>
                <div className="pd-flearn">Learn more →</div>
              </div>
            </div>
            <div className="pd-right">
              <div>
                <div className="pd-dname">{d.name}</div>
                <div className="pd-dtag">{d.tagline}</div>
              </div>
              {d.pills.length > 0 && (
                <div className="pd-pills">
                  {d.pills.map((p) => (
                    <div key={p.name} className="pd-pill">
                      <span className="pd-pill-name">{p.name}</span>
                      <span className="pd-pill-arrow">→</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div
        style={{
          width: "100vw",
          height: 120,
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={openQuiz}
          style={{
            background: "#E8572A",
            color: "#F5F0E8",
            border: "none",
            borderRadius: 999,
            padding: "16px 32px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 800,
            fontSize: 14,
            letterSpacing: "0.02em",
            cursor: "pointer",
          }}
        >
          Start your assessment →
        </button>
      </div>
    </section>
  );
};

export default ProtocolDomains;
