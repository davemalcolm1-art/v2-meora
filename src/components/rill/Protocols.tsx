import { useState, useMemo, useRef, useEffect } from "react";
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
  img: string;
  pills: string[];
  categories: string[];
};

type Tier = "primary" | "secondary";

type CategoryV2 = {
  id: string;
  label: string;
  line: string;
  count: number;
  tier: Tier;
};

const categories: CategoryV2[] = [
  { id: "energy", label: "Energy", line: "I want more energy.", count: 5, tier: "primary" },
  { id: "performance", label: "Performance", line: "I want to perform at my best.", count: 10, tier: "primary" },
  { id: "balance", label: "Balance", line: "I want to feel balanced.", count: 7, tier: "primary" },
  { id: "recovery", label: "Recovery", line: "I want to recover faster.", count: 3, tier: "secondary" },
  { id: "longevity", label: "Longevity", line: "I want to age well.", count: 4, tier: "secondary" },
  { id: "beauty", label: "Beauty", line: "I want better skin and hair.", count: 4, tier: "secondary" },
];

const allProtocols: Protocol[] = [
  {
    name: "Foundation.ME",
    badge: "MOST PRESCRIBED",
    tag: "BODY COMPOSITION · SLEEP · RECOVERY",
    desc: "Wake up restored. Build lean mass. Recover faster. The GH axis protocol that addresses the decline most people mistake for ageing.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80",
    pills: ["Lean out", "Sleep deeper", "Recover faster"],
    categories: ["energy", "performance", "recovery", "longevity"],
  },
  {
    name: "Opus.ME",
    badge: "FLAGSHIP",
    tag: "COLLAGEN · IMMUNITY · BODY COMPOSITION · LONGEVITY",
    desc: "Four compounds. Four biological systems. The most comprehensive protocol on the Meora menu.",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=80",
    pills: ["Skin", "Composition", "Immunity", "Longevity"],
    categories: ["performance", "balance", "longevity", "beauty"],
  },
  {
    name: "Radiance.ME",
    badge: "NEEDLE-FREE",
    tag: "SKIN · COLLAGEN · ANTI-AGEING",
    desc: "Renewed skin, improved texture, and collagen support — no injections required.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80",
    pills: ["Glow", "Collagen", "Needle-free"],
    categories: ["balance", "beauty"],
  },
  {
    name: "Repair.ME",
    badge: "INJURY & REPAIR",
    tag: "INJURY · TISSUE REPAIR · MOBILITY",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80",
    desc: "For the injuries that won't fully heal. BPC-157 and TB-500 for tendons, ligaments, joints, and soft tissue.",
    pills: ["Tendons", "Ligaments", "Soft tissue"],
    categories: ["performance", "recovery"],
  },
  {
    name: "Performance.ME",
    badge: "PEAK",
    tag: "TRAINING · RECOVERY · PHYSICAL OUTPUT",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80",
    desc: "Full GH axis support combined with dual-pathway tissue repair. The most comprehensive performance protocol.",
    pills: ["Output", "Recovery", "Athletic"],
    categories: ["performance", "recovery"],
  },
  {
    name: "Recomposition.ME",
    badge: "RECOMP",
    tag: "FAT LOSS · LEAN MASS",
    img: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=900&q=80",
    desc: "Combined GH axis support and targeted fat loss. Build lean mass while reducing body fat.",
    pills: ["Fat loss", "Lean mass", "Recompose"],
    categories: ["performance", "balance"],
  },
  {
    name: "Shield.ME",
    badge: "LONGEVITY",
    tag: "CELLULAR · IMMUNE · ANTI-AGEING",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80",
    desc: "Three biological systems addressed in one protocol. The premium stack for patients playing a long game.",
    pills: ["Cellular", "Immune", "Anti-ageing"],
    categories: ["performance", "balance", "longevity", "beauty"],
  },
  {
    name: "Vital.ME",
    badge: "ENERGY",
    tag: "ENERGY · DRIVE · PERFORMANCE",
    img: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=900&q=80",
    desc: "Restore the drive, energy, and vitality that made you feel unstoppable.",
    pills: ["Energy", "Drive", "Vitality"],
    categories: ["energy", "performance", "balance", "beauty"],
  },
  {
    name: "Foundation Pro.ME",
    badge: "ADVANCED",
    tag: "ADVANCED GH AXIS · VISCERAL FAT",
    img: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=900&q=80",
    desc: "Tesamorelin — the only FDA-approved GHRH analogue, with Phase 3 RCT evidence for visceral fat reduction.",
    pills: ["Visceral fat", "Phase 3 data", "Premium"],
    categories: ["energy", "performance"],
  },
  {
    name: "Lean.ME",
    badge: "GLP-1 ALTERNATIVE",
    tag: "FAT LOSS · PEPTIDE-BASED",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80",
    desc: "AOD-9604 targets lipolysis directly without affecting blood sugar or insulin.",
    pills: ["Fat loss", "No blood sugar impact", "Cream option"],
    categories: ["balance"],
  },
  {
    name: "Lean Pro.ME",
    badge: "ADVANCED FAT LOSS",
    tag: "TRIPLE MECHANISM",
    img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=900&q=80",
    desc: "Three non-overlapping fat loss mechanisms. The most evidence-backed fat loss stack on the menu.",
    pills: ["Triple mechanism", "Visceral fat", "Maximum"],
    categories: ["performance"],
  },
  {
    name: "GLP-1.ME",
    badge: "GP SUPERVISED",
    tag: "SEMAGLUTIDE · TIRZEPATIDE",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
    desc: "Clinically proven GLP-1 receptor agonist therapy — Wegovy, Ozempic, or Mounjaro — prescribed and supervised by a Meora GP.",
    pills: ["Semaglutide", "Tirzepatide", "GP supervised"],
    categories: ["balance"],
  },
  {
    name: "Focus.ME",
    badge: "NEEDLE-FREE",
    tag: "FOCUS · MEMORY · STRESS",
    img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=900&q=80",
    desc: "Semax and Selank — complementary neuropeptides in a once-daily nasal spray.",
    pills: ["Focus", "Memory", "Stress-free"],
    categories: ["energy", "performance", "balance", "longevity"],
  },
];

const Arrow = () => (
  <span
    aria-hidden="true"
    style={{ color: "#FF5003", fontFamily: "'DM Sans', sans-serif", fontSize: "18px", lineHeight: 1 }}
  >
    →
  </span>
);

const Protocols = () => {
  const { openWithProtocol } = useQuiz();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const drillRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (activeCategory ? allProtocols.filter((p) => p.categories.includes(activeCategory)) : []),
    [activeCategory]
  );

  const activeMeta = categories.find((c) => c.id === activeCategory) ?? null;

  useEffect(() => {
    if (activeCategory && drillRef.current) {
      drillRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeCategory]);

  const primaries = categories.filter((c) => c.tier === "primary");
  const secondaries = categories.filter((c) => c.tier === "secondary");

  const cardBaseStyle: React.CSSProperties = {
    background: "#FFFFFF",
    borderRadius: "20px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
  };

  return (
    <section
      id="protocols"
      className="bg-white text-[#001830] px-6 md:px-12 py-24 md:py-32 selection:bg-[#FF5003] selection:text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="block font-['DM_Mono',monospace] text-[10px] uppercase tracking-[0.25em] text-[#001830]/50 mb-6">
              Our Protocols
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05]">
              Find your protocol.<br />
              <span className="italic font-['Cormorant_Garamond',serif] text-[#FF5003]">Goal-specific.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[#001830]/60 text-sm leading-relaxed">
            Choose what you want to achieve. Your doctor does the rest.
          </p>
        </div>

        {/* Primary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 protocols-card-grid">
          {primaries.map((c, idx) => {
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(isActive ? null : c.id)}
                aria-pressed={isActive}
                style={{
                  ...cardBaseStyle,
                  padding: "40px 36px",
                  transitionDelay: `${idx * 100}ms`,
                  position: "relative",
                  minHeight: "360px",
                  outline: isActive ? "1.5px solid #FF5003" : "none",
                }}
                className="group reveal flex flex-col justify-between text-left transition-all duration-500 cursor-pointer hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
              >
                <span style={{ position: "absolute", top: "28px", right: "32px" }}>
                  <Arrow />
                </span>

                {/* TOP: Big word */}
                <div style={{ flex: "0 0 auto", paddingTop: "8px" }}>
                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 900,
                      color: "#FF5003",
                      fontSize: "clamp(56px, 6vw, 80px)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      margin: 0,
                    }}
                  >
                    {c.label}
                  </h3>
                </div>

                {/* BOTTOM */}
                <div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      color: "#374151",
                      fontSize: "15px",
                      marginTop: "16px",
                      lineHeight: 1.5,
                    }}
                  >
                    {c.line}
                  </p>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "#FF5003",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      marginTop: "20px",
                    }}
                  >
                    {c.count} Protocols{isActive ? " · viewing below" : ""}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Secondary cards — compact horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {secondaries.map((c) => {
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(isActive ? null : c.id)}
                aria-pressed={isActive}
                style={{
                  ...cardBaseStyle,
                  padding: "24px 28px",
                  height: "120px",
                  position: "relative",
                  outline: isActive ? "1.5px solid #FF5003" : "none",
                }}
                className="group flex items-center gap-5 text-left transition-all duration-500 cursor-pointer hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
              >
                <span style={{ position: "absolute", top: "16px", right: "20px" }}>
                  <Arrow />
                </span>
                <h4
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 900,
                    color: "#FF5003",
                    fontSize: "48px",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    margin: 0,
                    flex: "0 0 auto",
                  }}
                >
                  {c.label}
                </h4>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      color: "#374151",
                      fontSize: "14px",
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {c.line}
                  </p>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "#FF5003",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      marginTop: "8px",
                    }}
                  >
                    {c.count} Protocols
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Drill-in */}
        <div ref={drillRef}>
          {activeCategory && activeMeta && (
            <div className="mt-20 md:mt-24 animate-in fade-in duration-500">
              <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
                <div>
                  <span className="block font-['DM_Mono',monospace] text-[10px] uppercase tracking-[0.25em] text-[#FF5003] mb-3">
                    {filtered.length} {filtered.length === 1 ? "protocol" : "protocols"}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-['Cormorant_Garamond',serif] text-[#001830]">
                    Protocols for <span className="italic text-[#FF5003]">{activeMeta.label.toLowerCase()}</span>.
                  </h3>
                </div>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="font-['DM_Mono',monospace] text-[10px] uppercase tracking-widest text-[#001830]/50 hover:text-[#001830] transition-colors"
                >
                  ← All categories
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => openWithProtocol(p.name)}
                    className="group bg-[#EDE8DE] hover:bg-white rounded-[20px] p-8 text-left transition-all duration-500 hover:shadow-2xl hover:shadow-[#001830]/5 flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-['DM_Mono',monospace] text-[9px] uppercase tracking-widest text-[#FF5003]">
                        {p.badge}
                      </span>
                      <Arrow />
                    </div>
                    <div className="font-['DM_Mono',monospace] text-[10px] tracking-widest text-[#001830]/40 mb-3 uppercase">
                      {p.tag}
                    </div>
                    <h4 className="text-3xl font-['Cormorant_Garamond',serif] italic text-[#001830] mb-4 leading-none">
                      <ProtocolName name={p.name} />
                    </h4>
                    <p className="text-[#001830]/65 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>
                    <div className="flex items-center gap-2 text-[#FF5003] font-['DM_Mono',monospace] text-[10px] uppercase tracking-widest">
                      <span>Start assessment</span>
                      <Arrow />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="mt-24 text-center text-[#001830]/50 text-xs max-w-2xl mx-auto leading-relaxed">
          All protocols are prescribed by AHPRA-registered Australian doctors following blood panel review and clinical
          assessment. No protocol is dispensed without a valid prescription.
        </p>
      </div>
    </section>
  );
};

export default Protocols;
