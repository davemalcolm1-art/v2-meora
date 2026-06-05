import { useState } from "react";
import { useQuiz } from "./quizContext";

type Protocol = { name: string; desc: string; mark: string };
type Domain = {
  id: string;
  name: string;
  tagline: string;
  protocols: Protocol[];
};

const MARKS = {
  gold: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-gold.png",
  steel: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-steel.png",
  marble: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-marble.png",
  water: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-water.png",
  jungle: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-jungle.png",
  rosegold: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-rosegold.png",
};

const domains: Domain[] = [
  {
    id: "energy",
    name: "Energy",
    tagline: "Show up fully. Every single day.",
    protocols: [
      { name: "Foundation.ME", desc: "Daily baseline support for energy and clarity.", mark: MARKS.gold },
      { name: "Foundation Pro.ME", desc: "Advanced foundational stack for demanding lives.", mark: MARKS.gold },
      { name: "Vitality.ME", desc: "Restore drive and steady output across the week.", mark: MARKS.gold },
    ],
  },
  {
    id: "performance",
    name: "Performance",
    tagline: "Built to go further than you thought possible.",
    protocols: [
      { name: "Performance.ME", desc: "Build strength, speed and training resilience.", mark: MARKS.steel },
      { name: "Recomposition.ME", desc: "Shift body composition while preserving lean mass.", mark: MARKS.steel },
      { name: "Cognitive Performance.ME", desc: "Focus, processing speed and mental endurance.", mark: MARKS.steel },
    ],
  },
  {
    id: "balance",
    name: "Balance",
    tagline: "When everything feels in sync, everything changes.",
    protocols: [
      { name: "Weight Loss GLP-1 Alternatives.ME", desc: "Non-GLP-1 protocols for sustainable weight loss.", mark: MARKS.marble },
      { name: "Weight Loss Pro.ME", desc: "Advanced, doctor-led weight management protocol.", mark: MARKS.marble },
      { name: "Weight Loss GLP-1s.ME", desc: "Clinically guided GLP-1 therapy with full support.", mark: MARKS.marble },
    ],
  },
  {
    id: "recovery",
    name: "Recovery",
    tagline: "Built for the comeback.",
    protocols: [
      { name: "Recovery.ME", desc: "Repair faster. Train smarter. Stay in the game.", mark: MARKS.water },
    ],
  },
  {
    id: "longevity",
    name: "Longevity",
    tagline: "Play the long game. On your terms.",
    protocols: [
      { name: "Longevity.ME", desc: "Targeted protocols for healthy ageing.", mark: MARKS.jungle },
      { name: "Comprehensive Stack.ME", desc: "Full-spectrum longevity programme.", mark: MARKS.jungle },
    ],
  },
  {
    id: "beauty",
    name: "Beauty",
    tagline: "Radiant from within. Supported by science.",
    protocols: [
      { name: "Skin & Collagen.ME", desc: "Skin health and collagen support from within.", mark: MARKS.rosegold },
    ],
  },
];

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    style={{
      transition: "transform 250ms ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      color: "rgba(245,240,232,0.5)",
    }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
  </svg>
);

const ProtocolDomains = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const { open: openQuiz } = useQuiz();

  return (
    <section id="protocols" style={{ background: "transparent", padding: "96px 0 64px" }}>
      <style>{`
        @media (max-width: 768px) {
          .pd-row { padding-left: 24px !important; padding-right: 24px !important; height: 64px !important; }
          .pd-name { font-size: 22px !important; }
          .pd-expand-inner { padding-left: 24px !important; padding-right: 24px !important; flex-direction: column !important; gap: 12px !important; }
          .pd-card { width: 100% !important; }
          .pd-label { padding-left: 24px !important; }
        }
      `}</style>

      <div
        className="pd-label"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(245,240,232,0.4)",
          paddingLeft: 48,
          marginBottom: 48,
        }}
      >
        Our Protocols
      </div>

      <div role="list">
        {domains.map((d) => {
          const isOpen = openId === d.id;
          const isHover = hoverId === d.id;
          const count = d.protocols.length;
          return (
            <div key={d.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <button
                onClick={() => setOpenId(isOpen ? null : d.id)}
                onMouseEnter={() => setHoverId(d.id)}
                onMouseLeave={() => setHoverId(null)}
                className="pd-row"
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  height: 80,
                  background: isHover || isOpen ? "rgba(255,255,255,0.03)" : "#0a0a0a",
                  border: "none",
                  paddingLeft: 48,
                  paddingRight: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "background 200ms ease",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span
                    className="pd-name"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 700,
                      fontStyle: "normal",
                      fontSize: 28,
                      color: "#F5F0E8",
                      lineHeight: 1.1,
                    }}
                  >
                    {d.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 13,
                      color: "rgba(245,240,232,0.5)",
                    }}
                  >
                    {d.tagline}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 12,
                      color: "rgba(245,240,232,0.4)",
                      padding: "4px 10px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 999,
                    }}
                  >
                    {count} {count === 1 ? "protocol" : "protocols"}
                  </span>
                  <Chevron open={isOpen} />
                </div>
              </button>

              <div
                style={{
                  background: "#111111",
                  maxHeight: isOpen ? 600 : 0,
                  overflow: "hidden",
                  transition: "max-height 350ms ease",
                }}
              >
                <div
                  className="pd-expand-inner"
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "32px 48px",
                    flexWrap: "wrap",
                  }}
                >
                  {d.protocols.map((p) => (
                    <div
                      key={p.name}
                      className="pd-card"
                      style={{
                        width: 260,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        padding: 24,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      <img
                        src={p.mark}
                        alt=""
                        style={{ width: 40, height: 40, objectFit: "contain" }}
                      />
                      <div
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontWeight: 700,
                          fontStyle: "normal",
                          fontSize: 18,
                          color: "#F5F0E8",
                          lineHeight: 1.2,
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 400,
                          fontSize: 13,
                          color: "rgba(245,240,232,0.55)",
                          lineHeight: 1.5,
                          flex: 1,
                        }}
                      >
                        {p.desc}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 400,
                          fontSize: 13,
                          color: "#E8572A",
                          marginTop: 8,
                        }}
                      >
                        Learn more →
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "center", paddingTop: 64 }}>
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
