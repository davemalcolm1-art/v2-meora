import { useState, useCallback, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import energyImg from "@/assets/domains/energy.jpg.asset.json";
import performanceImg from "@/assets/domains/performance.jpg.asset.json";
import balanceImg from "@/assets/domains/balance.jpg.asset.json";
import recoveryImg from "@/assets/domains/recovery.jpg.asset.json";
import longevityImg from "@/assets/domains/longevity.jpg.asset.json";
import beautyImg from "@/assets/domains/beauty.jpg.asset.json";

type Domain = {
  num: string;
  name: string;
  desc: string;
  image: string;
  tagline: string;
};

const domains: Domain[] = [
  { num: "01", name: "ENERGY",      desc: "Doctor-prescribed peptide protocols for cognitive endurance and physical vitality.",     image: energyImg.url,      tagline: "Mitochondrial drive" },
  { num: "02", name: "PERFORMANCE", desc: "Strength, body composition and endurance — measured, supervised, refined.",              image: performanceImg.url, tagline: "Neuro-muscular edge" },
  { num: "03", name: "BALANCE",     desc: "Hormonal equilibrium and whole-body calm, guided by your AHPRA-registered doctor.",      image: balanceImg.url,     tagline: "Hormonal homeostasis" },
  { num: "04", name: "RECOVERY",    desc: "Repair, resilience and tissue health, dispensed through Australian compounding pharmacy.", image: recoveryImg.url,    tagline: "Tissue & resilience" },
  { num: "05", name: "LONGEVITY",   desc: "Healthy ageing and cellular optimisation — the long view, prescribed.",                  image: longevityImg.url,   tagline: "Cellular longevity" },
  { num: "06", name: "BEAUTY",      desc: "Skin health, collagen and radiance from within — clinical, not cosmetic.",               image: beautyImg.url,      tagline: "Dermal integrity" },
];

type Variant = "hero" | "a" | "b" | "c" | "d" | "e";
type Slot = { col: string; row: string; variant: Variant; minH: number };

const slots: Slot[] = [
  { col: "1 / span 8",  row: "1 / span 2", variant: "hero", minH: 560 },
  { col: "9 / span 4",  row: "1",          variant: "a",    minH: 270 },
  { col: "9 / span 4",  row: "2",          variant: "b",    minH: 270 },
  { col: "1 / span 3",  row: "3",          variant: "c",    minH: 270 },
  { col: "4 / span 3",  row: "3",          variant: "d",    minH: 270 },
  { col: "7 / span 6",  row: "3",          variant: "e",    minH: 270 },
];

const arrow = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const N = domains.length;

const Domains = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const [offset, setOffset] = useState(0);

  const focusDomain = useCallback((domainIdx: number) => {
    setOffset(domainIdx);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setOffset((o) => (o + 1) % N);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scroll-animate"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #F0EBE3 0%, #F7F4EF 55%, #EDE8E0 100%)",
        padding: "120px 0",
        margin: "24px",
        borderRadius: 32,
        overflow: "hidden",
      }}
    >
      <div className="domains-wrap" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap" }}>
          <div>
            <h1 className="scroll-animate" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A2B35", fontSize: "clamp(36px,4.4vw,60px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, whiteSpace: "nowrap" }}>
              <span style={{ color: "#FF5003", fontStyle: "italic" }}>Your</span> Goals. <span style={{ color: "#FF5003", fontStyle: "italic" }}>Your</span> Protocol.
            </h1>
          </div>
        </div>

        <LayoutGroup>
          <div className="domains-bento">
            {domains.map((d, domainIdx) => {
              const slotIdx = (domainIdx - offset + N) % N;
              const slot = slots[slotIdx];
              const isHero = slot.variant === "hero";
              return (
                <motion.button
                  key={d.num}
                  layout
                  transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}
                  onClick={() => focusDomain(domainIdx)}
                  className={`domain-tile group ${slot.variant}`}
                  data-variant={slot.variant}
                  aria-label={`${d.name} protocol`}
                  style={{
                    gridColumn: slot.col,
                    gridRow: slot.row,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 32,
                    textAlign: "left",
                    padding: 0,
                    border: "none",
                    cursor: isHero ? "default" : "pointer",
                    minHeight: slot.minH,
                    zIndex: isHero ? 2 : 1,
                  }}
                  whileHover={isHero ? undefined : { y: -4 }}
                >
                  <motion.div layout="position" style={{ position: "absolute", inset: 0 }}>
                    <DomainSlot domain={d} isHero={isHero} />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>

        <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(26,43,53,0.45)" }}>
          <span aria-hidden style={{ flex: 1, height: 1, background: "rgba(26,43,53,0.15)" }} />
          <span>AHPRA-Registered Doctors · AU Compounding Pharmacy Standards</span>
          <span aria-hidden style={{ flex: 1, height: 1, background: "rgba(26,43,53,0.15)" }} />
        </div>
      </div>

      <style>{`
        .domains-bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: 270px;
          gap: 16px;
        }
        .domain-tile { box-shadow: 0 12px 30px -22px rgba(26,43,53,0.35); }
        .domain-tile:hover { box-shadow: 0 28px 60px -28px rgba(26,43,53,0.45); }

        .tile-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; transition: transform 1.2s ease;
        }
        .domain-tile:hover .tile-img { transform: scale(1.04); }

        .tile-scrim-hero {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.0) 55%, rgba(0,0,0,0.55) 100%);
        }
        .tile-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.0) 80%);
        }
        .domain-tile h2, .domain-tile h3 { color: #ffffff !important; }

        .arrow-bubble {
          width: 44px; height: 44px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.28);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          color: #fff;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }
        .domain-tile:hover .arrow-bubble {
          transform: translate(2px,-2px);
          background: #FF5003; border-color: #FF5003;
        }
        .arrow-bubble.sm { width: 36px; height: 36px; }

        @media (max-width: 1024px) {
          .domains-bento { grid-auto-rows: 240px; }
        }
        @media (max-width: 768px) {
          .domains-bento { grid-template-columns: 1fr !important; grid-auto-rows: auto; }
          .domain-tile {
            grid-column: 1 / -1 !important;
            grid-row: auto !important;
            min-height: 260px !important;
          }
          .domains-wrap { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
};

const DomainSlot = ({ domain, isHero }: { domain: Domain; isHero: boolean }) => {
  if (isHero) {
    return (
      <>
        <img src={domain.image} alt="" className="tile-img" width={1024} height={1024} />
        <div className="tile-scrim-hero" />
        <div style={{ position: "absolute", inset: 0, padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff" }}>
          {/* TOP: title + tagline */}
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 14 }}>
              {domain.tagline}
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#fff", fontSize: "clamp(40px,4.4vw,64px)", lineHeight: 1.0, letterSpacing: "-0.02em", margin: 0 }}>
              {titleCase(domain.name)}<span style={{ color: "#FF5003" }}>.</span>
            </h2>
          </div>
          {/* BOTTOM: description + arrow */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.78)", margin: 0, maxWidth: 380 }}>
              {domain.desc}
            </p>
            <div className="arrow-bubble">{arrow}</div>
          </div>
        </div>
      </>
    );
  }

  // Smaller tiles: image + top-anchored title, arrow bottom-right
  return (
    <>
      <img src={domain.image} alt="" className="tile-img" loading="lazy" width={1024} height={1024} />
      <div className="tile-scrim" />
      <div style={{ position: "absolute", inset: 0, padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff" }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 28, lineHeight: 1.05, letterSpacing: "-0.01em", margin: 0, color: "#fff" }}>
          {titleCase(domain.name)}<span style={{ color: "#FF5003" }}>.</span>
        </h3>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="arrow-bubble sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

const titleCase = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

export default Domains;
