import { useState, useCallback, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Domain = {
  num: string;
  name: string;
  desc: string;
  gradient: string;
  tagline: string;
};

const domains: Domain[] = [
  { num: "01", name: "ENERGY",      desc: "Doctor-prescribed peptide protocols for cognitive endurance and physical vitality.",     gradient: "radial-gradient(ellipse at 30% 20%, #3A5C3D 0%, #1E3320 45%, #0D1A0E 100%)", tagline: "Mitochondrial drive" },
  { num: "02", name: "PERFORMANCE", desc: "Strength, body composition and endurance — measured, supervised, refined.",              gradient: "radial-gradient(ellipse at 70% 20%, #3A2855 0%, #221535 45%, #110820 100%)", tagline: "Neuro-muscular edge" },
  { num: "03", name: "BALANCE",     desc: "Hormonal equilibrium and whole-body calm, guided by your AHPRA-registered doctor.",      gradient: "radial-gradient(ellipse at 50% 15%, #1E4560 0%, #0F2535 45%, #071520 100%)", tagline: "Hormonal homeostasis" },
  { num: "04", name: "RECOVERY",    desc: "Repair, resilience and tissue health, dispensed through Australian compounding pharmacy.", gradient: "radial-gradient(ellipse at 35% 25%, #5C3018 0%, #331A08 45%, #1A0A00 100%)", tagline: "Tissue & resilience" },
  { num: "05", name: "LONGEVITY",   desc: "Healthy ageing and cellular optimisation — the long view, prescribed.",                  gradient: "radial-gradient(ellipse at 55% 20%, #1E3850 0%, #0F2030 45%, #060E18 100%)", tagline: "Cellular longevity" },
  { num: "06", name: "BEAUTY",      desc: "Skin health, collagen and radiance from within — clinical, not cosmetic.",               gradient: "radial-gradient(ellipse at 45% 20%, #4A1F45 0%, #2A0F28 45%, #150810 100%)", tagline: "Dermal integrity" },
];

type Variant = "hero" | "dark-image" | "light-image" | "tall-image" | "orange" | "wide-image";
type Slot = { col: string; row: string; variant: Variant; minH: number };

// Explicit grid placement so each tile can move independently to a new cell.
const slots: Slot[] = [
  { col: "1 / span 8",  row: "1 / span 2", variant: "hero",        minH: 560 },
  { col: "9 / span 4",  row: "1",          variant: "dark-image",  minH: 270 },
  { col: "9 / span 4",  row: "2",          variant: "light-image", minH: 270 },
  { col: "1 / span 3",  row: "3",          variant: "tall-image",  minH: 270 },
  { col: "4 / span 3",  row: "3",          variant: "orange",      minH: 270 },
  { col: "7 / span 6",  row: "3",          variant: "wide-image",  minH: 270 },
];

const arrow = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const N = domains.length;

const Domains = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();
  // offset = index of the domain currently in slot 0 (hero)
  const [offset, setOffset] = useState(0);

  const focusDomain = useCallback((domainIdx: number) => {
    setOffset(domainIdx);
  }, []);

  // Gentle auto-advance: rotate forward by one
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
        {/* Header */}
        <div style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div className="scroll-animate" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#FF5003", marginBottom: 18 }}>
              YOUR GOALS
            </div>
            <h1 className="scroll-animate delay-100" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A2B35", fontSize: "clamp(36px,4.4vw,60px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
              One protocol, built for <span style={{ color: "#FF5003", fontStyle: "italic" }}>you</span>.
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,43,53,0.5)" }}>
            <span>Tap a tile — the grid rearranges</span>
            <span aria-hidden style={{ width: 24, height: 1, background: "rgba(26,43,53,0.3)" }} />
            <span>{String(offset + 1).padStart(2, "0")} / 06</span>
          </div>
        </div>

        {/* Bento */}
        <LayoutGroup>
          <div className="domains-bento">
            {domains.map((d, domainIdx) => {
              // Which slot does this domain currently occupy?
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
                  aria-label={`${d.name} protocol — focus this tile`}
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
                  {/* inner content also gets a layout so children counter-scale gracefully */}
                  <motion.div layout="position" style={{ position: "absolute", inset: 0 }}>
                    <DomainSlot domain={d} variant={slot.variant} />
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
        .domain-tile.hero .hero-title { color: #fff !important; }
        .domain-tile.hero .hero-title span { color: #FF5003 !important; }

        .domain-tile { box-shadow: 0 12px 30px -22px rgba(26,43,53,0.35); }
        .domain-tile:hover { box-shadow: 0 28px 60px -28px rgba(26,43,53,0.45); }

        .glass {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
        }
        .glass-dark {
          background: rgba(26,43,53,0.06);
          border: 1px solid rgba(26,43,53,0.12);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
        }

        .num-pill {
          display: inline-flex; align-items: center;
          padding: 4px 12px; border-radius: 999px;
          font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 10px;
          letter-spacing: 0.22em; text-transform: uppercase;
        }

        .arrow-bubble {
          width: 44px; height: 44px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }
        .domain-tile:hover .arrow-bubble { transform: translate(2px,-2px); }
        .arrow-bubble.light { background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.22); color: #fff; }
        .arrow-bubble.dark  { background: rgba(26,43,53,0.06); border: 1px solid rgba(26,43,53,0.15); color: #1A2B35; }
        .domain-tile:hover .arrow-bubble.light,
        .domain-tile:hover .arrow-bubble.dark { background: #FF5003; border-color: #FF5003; color: #fff; }

        .gradient-bg { position: absolute; inset: 0; }
        .gradient-bg::after {
          content: ""; position: absolute; inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
          opacity: 0.05; mix-blend-mode: overlay;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(26,43,53,0.0) 35%, rgba(26,43,53,0.55) 100%);
        }

        @media (max-width: 1024px) {
          .domains-bento { grid-auto-rows: 240px; }
        }
        @media (max-width: 768px) {
          .domains-bento { grid-template-columns: 1fr !important; grid-auto-rows: auto; }
          .domain-tile {
            grid-column: 1 / -1 !important;
            grid-row: auto !important;
            min-height: 240px !important;
          }
          .domains-wrap { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
};

// ---------- Slot renderer (unchanged visuals) ----------
const DomainSlot = ({ domain, variant }: { domain: Domain; variant: Variant }) => {
  if (variant === "hero") {
    return (
      <>
        <div className="gradient-bg" style={{ background: domain.gradient }} />
        <img src="/meora-mark-white.svg" alt="" aria-hidden="true" style={{ position: "absolute", bottom: -40, right: -40, width: 240, opacity: 0.05 }} />
        <div className="hero-overlay" />
        <div style={{ position: "absolute", inset: 0, padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span className="num-pill glass" style={{ color: "#fff" }}>{domain.num} · Protocol</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>{domain.tagline}</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}>
            <div style={{ maxWidth: 460 }}>
              <h2 className="hero-title" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#fff", fontSize: "clamp(40px,4.4vw,64px)", lineHeight: 1.0, letterSpacing: "-0.02em", margin: 0 }}>
                {titleCase(domain.name)}<span style={{ color: "#FF5003" }}>.</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.72)", marginTop: 16, maxWidth: 380 }}>{domain.desc}</p>
            </div>
            <div className="arrow-bubble light">{arrow}</div>
          </div>
        </div>
      </>
    );
  }

  if (variant === "dark-image") {
    return (
      <>
        <div className="gradient-bg" style={{ background: domain.gradient }} />
        <div style={{ position: "absolute", inset: 0, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <span className="num-pill glass" style={{ color: "rgba(255,255,255,0.85)", alignSelf: "flex-start" }}>{domain.num}</span>
          <div className="glass" style={{ borderRadius: 18, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.55 }}>Protocol</span>
              <span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 22, lineHeight: 1.1, marginTop: 2 }}>{titleCase(domain.name)}</span>
            </div>
            {arrow}
          </div>
        </div>
      </>
    );
  }

  if (variant === "light-image") {
    return (
      <>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg, #F0EBE3 0%, #E8E1D4 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: domain.gradient, opacity: 0.18, mixBlendMode: "multiply" }} />
        <div style={{ position: "absolute", inset: 0, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <span className="num-pill" style={{ color: "#1A2B35", background: "rgba(26,43,53,0.06)", border: "1px solid rgba(26,43,53,0.12)", alignSelf: "flex-start" }}>{domain.num}</span>
          <div className="glass-dark" style={{ borderRadius: 18, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#1A2B35" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.5 }}>Protocol</span>
              <span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 22, lineHeight: 1.1, marginTop: 2 }}>{titleCase(domain.name)}</span>
            </div>
            {arrow}
          </div>
        </div>
      </>
    );
  }

  if (variant === "tall-image") {
    return (
      <>
        <div className="gradient-bg" style={{ background: domain.gradient }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff" }}>
          <span className="num-pill glass" style={{ alignSelf: "flex-start" }}>{domain.num}</span>
          <div className="glass" style={{ borderRadius: 14, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>{titleCase(domain.name)}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>
      </>
    );
  }

  if (variant === "orange") {
    return (
      <>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #FF5003 0%, #E84200 100%)" }} />
        <svg aria-hidden style={{ position: "absolute", inset: 0, margin: "auto", width: 140, height: 140, opacity: 0.12, color: "#fff" }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
        </svg>
        <div style={{ position: "absolute", inset: 0, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff" }}>
          <span className="num-pill" style={{ alignSelf: "flex-start", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)" }}>{domain.num}</span>
          <div style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(10px)", borderRadius: 14, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>{titleCase(domain.name)}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>
      </>
    );
  }

  // wide-image
  return (
    <>
      <div className="gradient-bg" style={{ background: domain.gradient }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,43,53,0) 40%, rgba(26,43,53,0.45) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff" }}>
        <span className="num-pill glass" style={{ alignSelf: "flex-start" }}>{domain.num}</span>
        <div className="glass" style={{ borderRadius: 18, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 22, lineHeight: 1.1 }}>{titleCase(domain.name)}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.65 }}>{domain.tagline}</span>
          </div>
          {arrow}
        </div>
      </div>
    </>
  );
};

const titleCase = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

export default Domains;
