import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import energyTex from "@/assets/domains/energy-texture.jpg.asset.json";
import performanceTex from "@/assets/domains/performance-texture.jpg.asset.json";
import balanceTex from "@/assets/domains/balance-texture.jpg.asset.json";
import recoveryTex from "@/assets/domains/recovery-texture.jpg.asset.json";
import longevityTex from "@/assets/domains/longevity-texture.jpg.asset.json";
import beautyTex from "@/assets/domains/beauty-texture.jpg.asset.json";
import energyHero from "@/assets/domains/energy-hero.jpg.asset.json";
import performanceHero from "@/assets/domains/performance-hero.jpg.asset.json";
import balanceHero from "@/assets/domains/balance-hero.jpg.asset.json";
import recoveryHero from "@/assets/domains/recovery-hero.jpg.asset.json";
import longevityHero from "@/assets/domains/longevity-hero.jpg.asset.json";
import beautyHero from "@/assets/domains/beauty-hero.jpg.asset.json";

type Domain = {
  num: string;
  name: string;
  desc: string;
  image: string;       // texture (small tiles)
  heroImage: string;   // person moment (hero tile)
  tagline: string;
  textTone?: "light" | "dark";
  slug?: string;       // route slug if a protocol page exists
};

const domains: Domain[] = [
  { num: "01", name: "ENERGY",      desc: "Show up fully. Every single day.",                  image: energyTex.url,      heroImage: energyHero.url,      tagline: "Sustained Output",       textTone: "dark" },
  { num: "02", name: "PERFORMANCE", desc: "Built to go further than you thought possible.",    image: performanceTex.url, heroImage: performanceHero.url, tagline: "Strength & Composition", textTone: "dark" },
  { num: "03", name: "BALANCE",     desc: "When everything feels in sync, everything changes.", image: balanceTex.url,     heroImage: balanceHero.url,     tagline: "Hormonal Health",        textTone: "dark" },
  { num: "04", name: "RECOVERY",    desc: "Built for the comeback.",                            image: recoveryTex.url,    heroImage: recoveryHero.url,    tagline: "Repair & Resilience",    textTone: "dark", slug: "recovery" },
  { num: "05", name: "LONGEVITY",   desc: "Play the long game. On your terms.",                 image: longevityTex.url,   heroImage: longevityHero.url,   tagline: "Healthy Ageing",         textTone: "dark" },
  { num: "06", name: "BEAUTY",      desc: "Radiant from within. Supported by science.",         image: beautyTex.url,      heroImage: beautyHero.url,      tagline: "Skin & Collagen",        textTone: "dark" },
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
  const navigate = useNavigate();
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
        background: "radial-gradient(ellipse at 15% 0%, #FFF8EC 0%, #FBF8F2 35%, #F7F4EF 65%, #EFEAE2 100%)",
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

        <div className="domains-bento">
          {domains.map((d, domainIdx) => {
            const slotIdx = (domainIdx - offset + N) % N;
            const slot = slots[slotIdx];
            const isHero = slot.variant === "hero";
            return (
              <button
                key={`${d.num}-${slot.variant}`}
                onClick={() => focusDomain(domainIdx)}
                className={`goal-tile ${slot.variant}`}
                data-variant={slot.variant}
                aria-label={`${d.name} protocol`}
                style={{
                  gridColumn: slot.col,
                  gridRow: slot.row,
                  cursor: isHero ? "default" : "pointer",
                  minHeight: slot.minH,
                  zIndex: isHero ? 2 : 1,
                }}
              >
                <DomainSlot domain={d} isHero={isHero} />
              </button>
            );
          })}
        </div>

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
        .goal-tile {
          position: relative;
          overflow: hidden;
          border-radius: 32px;
          text-align: left;
          padding: 0;
          border: 0;
          background: hsl(36 38% 94%);
          box-shadow: 0 12px 30px -22px rgba(180,150,110,0.35);
          isolation: isolate;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .goal-tile::before,
        .goal-tile::after,
        .goal-content::before,
        .goal-content::after,
        .goal-copy::before,
        .goal-copy::after {
          content: none !important;
          display: none !important;
          background: transparent !important;
        }
        .goal-tile .goal-copy,
        .goal-tile .goal-copy *,
        .goal-tile .goal-content,
        .goal-tile .goal-content * {
          background: transparent !important;
          box-shadow: none !important;
        }
        .goal-tile:not(.hero):hover { transform: translateY(-4px); box-shadow: 0 28px 60px -28px rgba(180,150,110,0.5); }

        .tile-img {
          position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%;
          object-fit: cover; transition: transform 1.2s ease; filter: brightness(1.03) contrast(1.02) saturate(1.05);
        }
        .goal-tile:not(.hero) .tile-img {
          filter: brightness(0.86) contrast(1.04) saturate(0.98);
        }
        .goal-tile:hover .tile-img { transform: scale(1.04); }

        .tile-scrim-hero {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.08) 28%, transparent 50%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.62) 100%);
        }
        .tile-scrim {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.05) 35%, transparent 60%, rgba(0,0,0,0.22) 100%);
        }
        .goal-content {
          --tile-text: hsl(0 0% 100%);
          --tile-text-shadow: rgba(0,0,0,0.55);
          --tile-title-stroke: rgba(255,255,255,0.55);
          position: absolute; inset: 0; z-index: 3; color: var(--tile-text);
        }
        .goal-content[data-tone="dark"] {
          --tile-text: hsl(202 34% 15%);
          --tile-text-shadow: rgba(255,250,242,0.85);
          --tile-title-stroke: rgba(26,43,53,0.22);
        }
        .goal-copy {
          display: inline-block;
          align-self: flex-start;
          max-width: min(520px, 100%);
          padding: 0;
          margin: 0;
          border-radius: 0;
          background: transparent !important;
          box-shadow: none !important;
        }
        .goal-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--tile-text);
          -webkit-text-fill-color: var(--tile-text);
          opacity: 1 !important;
          text-shadow: none;
          margin-bottom: 12px;
        }
        .goal-eyebrow.hero { font-size: 22px; margin-bottom: 16px; }
        .goal-title {
          font-family: 'Fraunces', serif;
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0;
          margin: 0;
          color: var(--tile-text);
          -webkit-text-fill-color: var(--tile-text);
          -webkit-text-stroke: 0;
          opacity: 1 !important;
          text-shadow: none;
          filter: none !important;
          mix-blend-mode: normal !important;
        }
        .goal-title-dot { color: hsl(18 100% 51%) !important; -webkit-text-fill-color: hsl(18 100% 51%) !important; text-shadow: none; }
        .goal-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 22px;
          font-weight: 500;
          line-height: 1.4;
          color: var(--tile-text);
          -webkit-text-fill-color: var(--tile-text);
          opacity: 1 !important;
          text-shadow: none;
          margin: 0;
        }
        .goal-tile-footer { display: flex; align-items: flex-end; justify-content: flex-end; gap: 14px; }

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
        .goal-tile:hover .arrow-bubble {
          transform: translate(2px,-2px);
          background: #FF5003; border-color: #FF5003;
        }
        .arrow-bubble.sm { width: 36px; height: 36px; }

        @media (max-width: 1024px) {
          .domains-bento { grid-auto-rows: 240px; }
        }
        @media (max-width: 768px) {
          .domains-bento { grid-template-columns: 1fr !important; grid-auto-rows: auto; }
          .goal-tile {
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
        <img src={domain.heroImage} alt="" className="tile-img" width={1024} height={1024} />
        <div className="tile-scrim-hero" />
        <div className="goal-content" data-tone="light" style={{ padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* TOP: title (label) */}
          <div className="goal-copy">
            <h2 className="goal-title" style={{ fontSize: "clamp(40px,4.4vw,64px)", letterSpacing: "-0.02em" }}>
              {titleCase(domain.name)}<span className="goal-title-dot">.</span>
            </h2>
          </div>
          {/* BOTTOM: eyebrow (subheading) above copy + arrow */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}>
            <div style={{ maxWidth: 520 }}>
              <div className="goal-eyebrow hero">{domain.tagline}</div>
              <p className="goal-desc">{domain.desc}</p>
            </div>
            <div className="arrow-bubble">{arrow}</div>
          </div>
        </div>
      </>
    );
  }

  // Smaller tiles: title at top, eyebrow at bottom-left, arrow bottom-right
  return (
    <>
      <img src={domain.image} alt="" className="tile-img" loading="lazy" width={1024} height={1024} />
      <div className="tile-scrim" />
      <div className="goal-content" data-tone="light" style={{ padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div className="goal-copy">
          <h3 className="goal-title" style={{ fontSize: 30, letterSpacing: "-0.01em" }}>
            {titleCase(domain.name)}<span className="goal-title-dot">.</span>
          </h3>
        </div>
        <div className="goal-tile-footer" style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
          <div className="goal-eyebrow" style={{ margin: 0 }}>{domain.tagline}</div>
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
