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
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80" },
  { id: "balance", label: "Balance", line: "Hormonal equilibrium and whole-body calm.", count: 7, tier: "primary",
    image: "https://images.unsplash.com/photo-1532798442725-41036acc7489?w=800&q=80" },
  { id: "recovery", label: "Recovery", line: "Repair faster. Come back stronger.", count: 3, tier: "secondary",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80" },
  { id: "longevity", label: "Longevity", line: "Age well. On your terms.", count: 4, tier: "secondary",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80" },
  { id: "beauty", label: "Beauty", line: "Skin health and collagen from within.", count: 4, tier: "secondary",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80" },
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
      className="selection:bg-[#FF5003] selection:text-white"
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: isExpanded ? "120px 60px" : "80px 60px" }}>
        {!isExpanded && (
          <div style={{ marginBottom: "56px" }}>
            <span style={{
              display: "block",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#FF5003",
              marginBottom: "20px",
            }}>
              Our Protocols
            </span>
            <h2 style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 900,
              fontSize: "clamp(44px, 5.5vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#111827",
              margin: "0 0 20px",
            }}>
              Find your protocol.<br />
              <span style={{ fontStyle: "italic", color: "#FF5003" }}>Goal-specific.</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: 1.6,
              color: "#6B6560",
              maxWidth: "480px",
              margin: 0,
            }}>
              Choose what matters to you. Your doctor does the rest.
            </p>
          </div>
        )}

        {!isExpanded && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} className="protocols-grid-lg">
              {primaries.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "20px",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
                    border: "none",
                    overflow: "hidden",
                    padding: 0,
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className="group transition-transform duration-300 hover:-translate-y-1"
                >
                  <div style={{ width: "100%", height: "220px", overflow: "hidden" }}>
                    <img src={c.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                  </div>
                  <div style={{ padding: "24px 28px", position: "relative" }}>
                    <span style={{ position: "absolute", top: "20px", right: "24px", color: "#FF5003", fontFamily: "'DM Sans', sans-serif", fontSize: "20px", lineHeight: 1 }}>→</span>
                    <h3 style={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: "32px",
                      lineHeight: 1.1,
                      margin: 0,
                      paddingRight: "32px",
                    }}>{c.label}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, color: "#6B6560", fontSize: "14px", lineHeight: 1.5, margin: "6px 0 0" }}>
                      {c.line}
                    </p>
                    <div style={{
                      display: "inline-block",
                      background: "#FF5003",
                      color: "#FFFFFF",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      marginTop: "16px",
                    }}>
                      {c.count} Protocols
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "16px" }} className="protocols-grid-sm">
              {secondaries.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "20px",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
                    border: "none",
                    overflow: "hidden",
                    padding: 0,
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className="group transition-transform duration-300 hover:-translate-y-1"
                >
                  <div style={{ width: "100%", height: "160px", overflow: "hidden" }}>
                    <img src={c.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                  </div>
                  <div style={{ padding: "20px 24px", position: "relative" }}>
                    <span style={{ position: "absolute", top: "16px", right: "20px", color: "#FF5003", fontFamily: "'DM Sans', sans-serif", fontSize: "18px", lineHeight: 1 }}>→</span>
                    <h4 style={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: "24px",
                      lineHeight: 1.1,
                      margin: 0,
                      paddingRight: "28px",
                    }}>{c.label}</h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, color: "#6B6560", fontSize: "13px", lineHeight: 1.5, margin: "6px 0 0" }}>
                      {c.line}
                    </p>
                    <div style={{
                      display: "inline-block",
                      background: "#FF5003",
                      color: "#FFFFFF",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      marginTop: "14px",
                    }}>
                      {c.count} Protocols
                    </div>
                  </div>
                </button>
              ))}
            </div>
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
