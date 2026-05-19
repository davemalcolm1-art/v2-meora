import { useState, useMemo, useRef, useEffect } from "react";
import { useQuiz } from "./quizContext";

const ProtocolName = ({ name }: { name: string }) => {
  const base = name.replace(/\.ME$/, "");
  return (
    <>
      <span>{base}</span>
      <span style={{ color: "#ff6a00" }}>.ME</span>
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
  categories: string[]; // category ids this protocol belongs to
};


type Tier = "primary" | "secondary";

type CategoryV2 = {
  id: string;
  label: string;
  eyebrow: string;
  blurb: string;
  tier: Tier;
  blob: string; // tailwind border-radius arbitrary value for organic blob
  gradient: string; // tailwind classes for blob gradient
};

const categories: CategoryV2[] = [
  {
    id: "longevity",
    label: "Longevity",
    eyebrow: "01 / Systemic",
    blurb: "Cellular health, immune resilience, anti-ageing.",
    tier: "primary",
    blob: "rounded-[45%_55%_70%_30%/30%_60%_40%_70%]",
    gradient: "from-[#ff6a00]/25 to-[#001830]/15",
  },
  {
    id: "for-him",
    label: "For him",
    eyebrow: "02 / Vitality",
    blurb: "Drive, output, hormonal optimisation.",
    tier: "primary",
    blob: "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
    gradient: "from-[#001830]/25 to-[#ff6a00]/10",
  },
  {
    id: "for-her",
    label: "For her",
    eyebrow: "03 / Hormone",
    blurb: "Skin, body composition, balance.",
    tier: "primary",
    blob: "rounded-[30%_70%_70%_30%/50%_60%_40%_50%]",
    gradient: "from-[#ff6a00]/15 to-[#001830]/5",
  },
  {
    id: "strength",
    label: "Strength",
    eyebrow: "04 / Performance",
    blurb: "Lean mass, athletic output.",
    tier: "secondary",
    blob: "rounded-full",
    gradient: "from-[#001830]/20 to-transparent",
  },
  {
    id: "recovery",
    label: "Recovery",
    eyebrow: "05 / Repair",
    blurb: "Tissue repair, sleep, restoration.",
    tier: "secondary",
    blob: "rounded-full",
    gradient: "from-[#ff6a00]/20 to-transparent",
  },
  {
    id: "weight-loss",
    label: "Weight loss",
    eyebrow: "06 / Metabolism",
    blurb: "Fat loss, recomposition, metabolism.",
    tier: "secondary",
    blob: "rounded-full",
    gradient: "from-[#E2D9CE] to-[#F5F0E8]",
  },
];

const allProtocols: Protocol[] = [
  {
    name: "Foundation.ME",
    badge: "MOST PRESCRIBED",
    tag: "BODY COMPOSITION · SLEEP · RECOVERY",
    desc: "Wake up restored. Build lean mass. Recover faster. The GH axis protocol that addresses the decline most people mistake for ageing.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80",
    pills: ["Lean out", "Sleep deeper", "Recover faster"],
    categories: ["for-him", "longevity", "strength", "recovery"],
  },
  {
    name: "Opus.ME",
    badge: "FLAGSHIP",
    tag: "COLLAGEN · IMMUNITY · BODY COMPOSITION · LONGEVITY",
    desc: "Four compounds. Four biological systems. The most comprehensive protocol on the Meora menu.",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=80",
    pills: ["Skin", "Composition", "Immunity", "Longevity"],
    categories: ["for-her", "longevity"],
  },
  {
    name: "Radiance.ME",
    badge: "NEEDLE-FREE",
    tag: "SKIN · COLLAGEN · ANTI-AGEING",
    desc: "Renewed skin, improved texture, and collagen support — no injections required.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80",
    pills: ["Glow", "Collagen", "Needle-free"],
    categories: ["for-her"],
  },
  {
    name: "Repair.ME",
    badge: "INJURY & REPAIR",
    tag: "INJURY · TISSUE REPAIR · MOBILITY",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80",
    desc: "For the injuries that won't fully heal. BPC-157 and TB-500 for tendons, ligaments, joints, and soft tissue.",
    pills: ["Tendons", "Ligaments", "Soft tissue"],
    categories: ["for-him", "recovery"],
  },
  {
    name: "Performance.ME",
    badge: "PEAK",
    tag: "TRAINING · RECOVERY · PHYSICAL OUTPUT",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80",
    desc: "Full GH axis support combined with dual-pathway tissue repair. The most comprehensive performance protocol.",
    pills: ["Output", "Recovery", "Athletic"],
    categories: ["for-him", "strength", "recovery"],
  },
  {
    name: "Recomposition.ME",
    badge: "RECOMP",
    tag: "FAT LOSS · LEAN MASS",
    img: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=900&q=80",
    desc: "Combined GH axis support and targeted fat loss. Build lean mass while reducing body fat.",
    pills: ["Fat loss", "Lean mass", "Recompose"],
    categories: ["for-her", "for-him", "weight-loss", "strength"],
  },
  {
    name: "Shield.ME",
    badge: "LONGEVITY",
    tag: "CELLULAR · IMMUNE · ANTI-AGEING",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80",
    desc: "Three biological systems addressed in one protocol. The premium stack for patients playing a long game.",
    pills: ["Cellular", "Immune", "Anti-ageing"],
    categories: ["for-her", "longevity"],
  },
  {
    name: "Vital.ME",
    badge: "ENERGY",
    tag: "ENERGY · DRIVE · PERFORMANCE",
    img: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=900&q=80",
    desc: "Restore the drive, energy, and vitality that made you feel unstoppable.",
    pills: ["Energy", "Drive", "Vitality"],
    categories: ["for-her", "for-him"],
  },
  {
    name: "Foundation Pro.ME",
    badge: "ADVANCED",
    tag: "ADVANCED GH AXIS · VISCERAL FAT",
    img: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=900&q=80",
    desc: "Tesamorelin — the only FDA-approved GHRH analogue, with Phase 3 RCT evidence for visceral fat reduction.",
    pills: ["Visceral fat", "Phase 3 data", "Premium"],
    categories: ["for-him", "longevity", "strength"],
  },
  {
    name: "Lean.ME",
    badge: "GLP-1 ALTERNATIVE",
    tag: "FAT LOSS · PEPTIDE-BASED",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80",
    desc: "AOD-9604 targets lipolysis directly without affecting blood sugar or insulin.",
    pills: ["Fat loss", "No blood sugar impact", "Cream option"],
    categories: ["for-her", "for-him", "weight-loss"],
  },
  {
    name: "Lean Pro.ME",
    badge: "ADVANCED FAT LOSS",
    tag: "TRIPLE MECHANISM",
    img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=900&q=80",
    desc: "Three non-overlapping fat loss mechanisms. The most evidence-backed fat loss stack on the menu.",
    pills: ["Triple mechanism", "Visceral fat", "Maximum"],
    categories: ["for-him", "weight-loss"],
  },
  {
    name: "GLP-1.ME",
    badge: "GP SUPERVISED",
    tag: "SEMAGLUTIDE · TIRZEPATIDE",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
    desc: "Clinically proven GLP-1 receptor agonist therapy — Wegovy, Ozempic, or Mounjaro — prescribed and supervised by a Meora GP.",
    pills: ["Semaglutide", "Tirzepatide", "GP supervised"],
    categories: ["for-her", "for-him", "weight-loss"],
  },
  {
    name: "Focus.ME",
    badge: "NEEDLE-FREE",
    tag: "FOCUS · MEMORY · STRESS",
    img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=900&q=80",
    desc: "Semax and Selank — complementary neuropeptides in a once-daily nasal spray.",
    pills: ["Focus", "Memory", "Stress-free"],
    categories: ["for-him", "longevity"],
  },
];

const Arrow = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
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

  const countFor = (id: string) => allProtocols.filter((p) => p.categories.includes(id)).length;

  const primaries = categories.filter((c) => c.tier === "primary");
  const secondaries = categories.filter((c) => c.tier === "secondary");

  return (
    <section
      id="protocols"
      className="bg-white text-[#001830] px-6 md:px-12 py-24 md:py-32 selection:bg-[#ff6a00] selection:text-white"
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
              <span className="italic font-['Cormorant_Garamond',serif] text-[#ff6a00]">Goal-specific.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[#001830]/60 text-sm leading-relaxed">
            Each protocol is prescribed by an AHPRA-registered doctor. Choose a goal — your doctor will discuss the right prescription.
          </p>
        </div>

        {/* Primary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {primaries.map((c) => {
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(isActive ? null : c.id)}
                aria-pressed={isActive}
                className={`group rounded-[40px] p-10 flex flex-col aspect-[4/5] justify-between text-left transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "bg-white shadow-2xl shadow-[#001830]/10 ring-1 ring-[#ff6a00]/30"
                    : "bg-[#EDE8DE] hover:bg-white hover:shadow-2xl hover:shadow-[#001830]/5"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span
                    className="font-['DM_Sans',sans-serif] font-bold uppercase text-[#E8622A]"
                    style={{ fontSize: "11px", letterSpacing: "0.12em" }}
                  >
                    {c.eyebrow.split("/")[1]?.trim()}
                  </span>
                  <Arrow />
                </div>

                <div>
                  <h3 className="text-4xl italic font-['Cormorant_Garamond',serif] text-[#001830] mb-2 leading-none">
                    {c.label}
                  </h3>
                  <p className="text-[#001830]/60 text-xs tracking-tight mb-3">{c.blurb}</p>
                  <div className="font-['DM_Mono',monospace] text-[10px] uppercase tracking-widest text-[#ff6a00]">
                    {countFor(c.id)} {countFor(c.id) === 1 ? "protocol" : "protocols"}
                    {isActive ? " · viewing below" : ""}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Secondary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {secondaries.map((c) => {
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(isActive ? null : c.id)}
                aria-pressed={isActive}
                className={`group rounded-[32px] p-8 flex items-center gap-6 text-left transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "bg-white shadow-xl shadow-[#001830]/10 ring-1 ring-[#ff6a00]/30"
                    : "bg-[#EDE8DE]/60 hover:bg-white hover:shadow-xl hover:shadow-[#001830]/5"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0">
                  <div className={`w-8 h-8 ${c.blob} bg-gradient-to-br ${c.gradient}`} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-2xl italic font-['Cormorant_Garamond',serif] text-[#001830] leading-none">
                    {c.label}
                  </h4>
                  <span className="font-['DM_Mono',monospace] text-[9px] tracking-widest text-[#001830]/40 uppercase">
                    {c.eyebrow.split("/")[1]?.trim()} · {countFor(c.id)}
                  </span>
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
                  <span className="block font-['DM_Mono',monospace] text-[10px] uppercase tracking-[0.25em] text-[#ff6a00] mb-3">
                    {activeMeta.eyebrow} · {filtered.length} {filtered.length === 1 ? "protocol" : "protocols"}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-['Cormorant_Garamond',serif] text-[#001830]">
                    Protocols for <span className="italic text-[#ff6a00]">{activeMeta.label.toLowerCase()}</span>.
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
                    className="group bg-[#EDE8DE] hover:bg-white rounded-[32px] p-8 text-left transition-all duration-500 hover:shadow-2xl hover:shadow-[#001830]/5 flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-['DM_Mono',monospace] text-[9px] uppercase tracking-widest text-[#ff6a00]">
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
                    <div className="flex items-center gap-2 text-[#ff6a00] font-['DM_Mono',monospace] text-[10px] uppercase tracking-widest">
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
