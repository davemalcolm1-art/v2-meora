import { useState, useMemo, useEffect } from "react";
import { useQuiz } from "./quizContext";

const ProtocolName = ({ name }: { name: string }) => {
  const base = name.replace(/\.ME$/, "");
  return (
    <>
      <span>{base}</span>
      <span style={{ color: "#FF5003" }}>.ME</span>
    </>
  );
};

type Protocol = {
  tag: string;
  name: string;
  desc: string;
  badge: string;
  categories: string[];
};

type Tier = "primary" | "secondary";

type Category = {
  id: string;
  label: string;
  line: string;
  count: number;
  tier: Tier;
};

type CategoryWithImage = Category & { image: string };

const categories: CategoryWithImage[] = [
  { id: "energy", label: "Energy", line: "Restore drive, clarity and sustained output.", count: 5, tier: "primary",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
  { id: "performance", label: "Performance", line: "Build strength, speed and resilience.", count: 10, tier: "primary",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
  { id: "balance", label: "Balance", line: "Hormonal equilibrium and whole-body calm.", count: 7, tier: "primary",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80" },
  { id: "recovery", label: "Recovery", line: "Repair faster. Come back stronger.", count: 3, tier: "secondary",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80" },
  { id: "longevity", label: "Longevity", line: "Age well. On your terms.", count: 4, tier: "secondary",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80" },
  { id: "beauty", label: "Beauty", line: "Skin health and collagen from within.", count: 4, tier: "secondary",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80" },
];

const allProtocols: Protocol[] = [
  { name: "Foundation.ME", badge: "MOST PRESCRIBED", tag: "BODY COMPOSITION · SLEEP · RECOVERY", desc: "Wake up restored. Build lean mass. Recover faster. The GH axis protocol that addresses the decline most people mistake for ageing.", categories: ["energy","performance","recovery","longevity"] },
  { name: "Opus.ME", badge: "FLAGSHIP", tag: "COLLAGEN · IMMUNITY · LONGEVITY", desc: "Four compounds. Four biological systems. The most comprehensive protocol on the Meora menu.", categories: ["performance","balance","longevity","beauty"] },
  { name: "Radiance.ME", badge: "NEEDLE-FREE", tag: "SKIN · COLLAGEN · ANTI-AGEING", desc: "Renewed skin, improved texture, and collagen support — no injections required.", categories: ["balance","beauty"] },
  { name: "Repair.ME", badge: "INJURY & REPAIR", tag: "INJURY · TISSUE REPAIR", desc: "For the injuries that won't fully heal. BPC-157 and TB-500 for tendons, ligaments, joints, and soft tissue.", categories: ["performance","recovery"] },
  { name: "Performance.ME", badge: "PEAK", tag: "TRAINING · RECOVERY", desc: "Full GH axis support combined with dual-pathway tissue repair. The most comprehensive performance protocol.", categories: ["performance","recovery"] },
  { name: "Recomposition.ME", badge: "RECOMP", tag: "FAT LOSS · LEAN MASS", desc: "Combined GH axis support and targeted fat loss. Build lean mass while reducing body fat.", categories: ["performance","balance"] },
  { name: "Shield.ME", badge: "LONGEVITY", tag: "CELLULAR · IMMUNE · ANTI-AGEING", desc: "Three biological systems addressed in one protocol. The premium stack for patients playing a long game.", categories: ["performance","balance","longevity","beauty"] },
  { name: "Vital.ME", badge: "ENERGY", tag: "ENERGY · DRIVE · PERFORMANCE", desc: "Restore the drive, energy, and vitality that made you feel unstoppable.", categories: ["energy","performance","balance","beauty"] },
  { name: "Foundation Pro.ME", badge: "ADVANCED", tag: "ADVANCED GH AXIS · VISCERAL FAT", desc: "Tesamorelin — the only FDA-approved GHRH analogue, with Phase 3 RCT evidence for visceral fat reduction.", categories: ["energy","performance"] },
  { name: "Lean.ME", badge: "GLP-1 ALTERNATIVE", tag: "FAT LOSS · PEPTIDE-BASED", desc: "AOD-9604 targets lipolysis directly without affecting blood sugar or insulin.", categories: ["balance"] },
  { name: "Lean Pro.ME", badge: "ADVANCED FAT LOSS", tag: "TRIPLE MECHANISM", desc: "Three non-overlapping fat loss mechanisms. The most evidence-backed fat loss stack on the menu.", categories: ["performance"] },
  { name: "GLP-1.ME", badge: "GP SUPERVISED", tag: "SEMAGLUTIDE · TIRZEPATIDE", desc: "Clinically proven GLP-1 receptor agonist therapy — Wegovy, Ozempic, or Mounjaro — prescribed and supervised by a Meora GP.", categories: ["balance"] },
  { name: "Focus.ME", badge: "NEEDLE-FREE", tag: "FOCUS · MEMORY · STRESS", desc: "Semax and Selank — complementary neuropeptides in a once-daily nasal spray.", categories: ["energy","performance","balance","longevity"] },
];

const Arrow = ({ size = 20, color = "#FF5003" }: { size?: number; color?: string }) => (
  <span aria-hidden="true" style={{ color, fontFamily: "'DM Sans', sans-serif", fontSize: `${size}px`, lineHeight: 1 }}>→</span>
);

const CARD_BG = "#F0EBE3";
const SECTION_BG = "#F7F4EF";

const Protocols = () => {
  const { openWithProtocol } = useQuiz();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeCategory ? allProtocols.filter((p) => p.categories.includes(activeCategory)) : []),
    [activeCategory]
  );
  const activeMeta = categories.find((c) => c.id === activeCategory) ?? null;
  const isExpanded = !!activeCategory;

  // Lock body scroll when expanded
  useEffect(() => {
    if (isExpanded) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [isExpanded]);

  // ESC to close
  useEffect(() => {
    if (!isExpanded) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveCategory(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isExpanded]);

  const primaries = categories.filter((c) => c.tier === "primary");
  const secondaries = categories.filter((c) => c.tier === "secondary");

  return (
    <section
      id="protocols"
      style={{
        background: isExpanded ? "#1A2B35" : SECTION_BG,
        transition: "background 350ms ease",
        position: "relative",
        minHeight: isExpanded ? "100vh" : undefined,
      }}
      className="px-6 md:px-12 py-24 md:py-32 selection:bg-[#FF5003] selection:text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header (hidden when expanded) */}
        {!isExpanded && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-16 md:mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="block font-['DM_Mono',monospace] text-[10px] uppercase tracking-[0.25em] text-[#001830]/50 mb-6">
                Our Protocols
              </span>
              <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] text-[#111827]">
                Find your protocol.<br />
                <span className="italic font-['Cormorant_Garamond',serif] text-[#FF5003]">Goal-specific.</span>
              </h2>
            </div>
            <p className="max-w-xs text-[#001830]/60 text-sm leading-relaxed">
              Choose what you want to achieve. Your doctor does the rest.
            </p>
          </div>
        )}

        {/* GRID VIEW */}
        {!isExpanded && (
          <>
            {/* Large cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {primaries.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  style={{
                    background: CARD_BG,
                    borderRadius: "20px",
                    padding: "48px 40px",
                    minHeight: "320px",
                    position: "relative",
                    border: "none",
                  }}
                  className="group flex flex-col justify-between text-left cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                >
                  <span style={{ position: "absolute", top: "32px", right: "36px" }}>
                    <Arrow size={20} />
                  </span>
                  <h3 style={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 900,
                    color: "#FF5003",
                    fontSize: "clamp(64px, 7vw, 96px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}>{c.label}</h3>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, color: "#374151", fontSize: "15px", lineHeight: 1.5, margin: 0 }}>
                      {c.line}
                    </p>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, textTransform: "uppercase", color: "#FF5003", fontSize: "11px", letterSpacing: "0.1em", marginTop: "12px" }}>
                      {c.count} Protocols
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Small cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {secondaries.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  style={{
                    background: CARD_BG,
                    borderRadius: "20px",
                    padding: "24px 28px",
                    height: "100px",
                    position: "relative",
                    border: "none",
                  }}
                  className="group flex items-center gap-5 text-left cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                >
                  <span style={{ position: "absolute", top: "16px", right: "20px" }}>
                    <Arrow size={18} />
                  </span>
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, color: "#FF5003", fontSize: "40px", lineHeight: 1, letterSpacing: "-0.02em", margin: 0, flex: "0 0 auto" }}>
                    {c.label}
                  </h4>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, color: "#374151", fontSize: "14px", lineHeight: 1.4, margin: 0 }}>
                      {c.line}
                    </p>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, textTransform: "uppercase", color: "#FF5003", fontSize: "11px", letterSpacing: "0.1em", marginTop: "6px" }}>
                      {c.count} Protocols
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-24 text-center text-[#001830]/50 text-xs max-w-2xl mx-auto leading-relaxed">
              All protocols are prescribed by AHPRA-registered Australian doctors following blood panel review and clinical
              assessment. No protocol is dispensed without a valid prescription.
            </p>
          </>
        )}

        {/* EXPANDED VIEW */}
        {isExpanded && activeMeta && (
          <div
            onClick={(e) => { if (e.target === e.currentTarget) setActiveCategory(null); }}
            style={{ animation: "fade-in 350ms ease-out" }}
          >
            <div className="flex items-start justify-between gap-6 mb-12">
              <div>
                <h2 style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 900,
                  color: "#FF5003",
                  fontSize: "clamp(64px, 8vw, 120px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}>{activeMeta.label}</h2>
                <button
                  onClick={() => setActiveCategory(null)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "14px",
                    marginTop: "16px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  className="hover:text-white transition-colors"
                >
                  ← All categories
                </button>
              </div>
              <button
                onClick={() => setActiveCategory(null)}
                aria-label="Close"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#FFFFFF",
                  fontSize: "24px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: "8px",
                }}
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => openWithProtocol(p.name)}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "16px",
                    padding: "32px",
                    textAlign: "left",
                    animation: `slide-in-right 400ms ease-out both`,
                    animationDelay: `${i * 100}ms`,
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  className="flex flex-col hover:bg-[rgba(255,255,255,0.10)] transition-colors"
                >
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#FF5003",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    marginBottom: "16px",
                  }}>
                    {p.badge} · {p.tag}
                  </div>
                  <h4 style={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: "#FFFFFF",
                    fontSize: "28px",
                    lineHeight: 1.1,
                    margin: 0,
                    marginBottom: "16px",
                  }}>
                    <ProtocolName name={p.name} />
                  </h4>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    margin: 0,
                    marginBottom: "24px",
                    flex: 1,
                  }}>
                    {p.desc}
                  </p>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    fontSize: "13px",
                  }}>
                    Start Assessment →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Protocols;
