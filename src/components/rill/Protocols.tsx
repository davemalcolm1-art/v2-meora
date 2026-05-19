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

type CategoryWithImage = Category & { image: string; imagePosition?: string };

const categories: CategoryWithImage[] = [
  { id: "energy", label: "Energy", line: "Restore drive, clarity and sustained output.", count: 5, tier: "primary",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
  { id: "performance", label: "Performance", line: "Build strength, speed and resilience.", count: 10, tier: "primary",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80", imagePosition: "center 40%" },
  { id: "balance", label: "Balance", line: "Hormonal equilibrium and whole-body calm.", count: 7, tier: "primary",
    image: "https://images.unsplash.com/photo-1532798442725-41036acc7489?w=800&q=80" },
  { id: "recovery", label: "Recovery", line: "Repair faster. Come back stronger.", count: 3, tier: "secondary",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80" },
  { id: "longevity", label: "Longevity", line: "Age well. On your terms.", count: 4, tier: "secondary",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80" },
  { id: "beauty", label: "Beauty", line: "Skin health and collagen from within.", count: 4, tier: "secondary",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80", imagePosition: "center 35%" },
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

  const bgImages: Record<string, string> = {
    energy: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    performance: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1600&q=80",
    balance: "https://images.unsplash.com/photo-1532798442725-41036acc7489?w=1600&q=80",
    recovery: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&q=80",
    longevity: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80",
    beauty: "https://images.unsplash.com/photo-1546961342-ea5f62d4e15b?w=1600&q=80",
  };
  const descriptors: Record<string, string> = {
    energy: "Restore drive, clarity and sustained output.",
    performance: "Build strength, speed and resilience.",
    balance: "Hormonal equilibrium and whole-body calm.",
    recovery: "Repair faster. Come back stronger.",
    longevity: "Age well. On your terms.",
    beauty: "Skin health and collagen from within.",
  };
  type Featured = { name: string; tags: string; desc: string };
  const featuredMap: Record<string, Featured> = {
    energy: { name: "Foundation.ME", tags: "MOST PRESCRIBED · ENERGY · RECOVERY", desc: "Wake up restored. Build lean mass. Recover faster. The GH axis protocol that addresses the decline most people mistake for ageing." },
    performance: { name: "Vital.ME", tags: "ENERGY · DRIVE · PERFORMANCE", desc: "Restore the drive, energy and vitality that made you feel unstoppable." },
    balance: { name: "Opus.ME", tags: "FLAGSHIP · COMPREHENSIVE · WOMEN'S HEALTH", desc: "Four compounds. Four biological systems. The most comprehensive protocol on the Meora menu." },
    recovery: { name: "Recovery.ME", tags: "REPAIR · RECOVERY · PERFORMANCE", desc: "BPC-157 and TB-500 — the two most studied repair peptides, combined." },
    longevity: { name: "Shield.ME", tags: "LONGEVITY · IMMUNE · CELLULAR HEALTH", desc: "Three biological systems addressed in one protocol. The premium stack for patients playing a long game." },
    beauty: { name: "Radiance.ME", tags: "SKIN · COLLAGEN · NEEDLE-FREE OPTION", desc: "Renewed skin, improved texture and collagen support — no injections required." },
  };
  const featured = activeCategory ? featuredMap[activeCategory] : null;
  const bgImage = activeCategory ? bgImages[activeCategory] : null;

  return (
    <section
      id="protocols"
      style={{
        background: isExpanded
          ? `linear-gradient(135deg, rgba(26,43,53,0.93) 0%, rgba(26,43,53,0.78) 100%), url(${bgImage})`
          : SECTION_BG,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background 350ms ease",
        position: "relative",
        minHeight: isExpanded ? "100vh" : undefined,
        overflow: "hidden",
      }}
      className="selection:bg-[#FF5003] selection:text-white"
    >
      <div style={{ maxWidth: isExpanded ? "none" : "1320px", margin: "0 auto", padding: isExpanded ? "0" : "80px 60px" }}>
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
                    <img src={c.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: c.imagePosition || "center", display: "block" }} />
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
        {isExpanded && activeMeta && featured && (
          <div style={{ position: "relative", minHeight: "100vh", animation: "fade-in 500ms ease-out" }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                position: "absolute", top: "36px", left: "80px",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                color: "rgba(255,255,255,0.5)", fontSize: "14px",
                background: "transparent", border: "none", cursor: "pointer", padding: 0,
                zIndex: 2,
              }}
              className="hover:text-white transition-colors protocols-back-link"
            >
              ← All categories
            </button>
            <button
              onClick={() => setActiveCategory(null)}
              aria-label="Close"
              style={{
                position: "absolute", top: "32px", right: "32px",
                fontFamily: "'DM Sans', sans-serif", color: "#FFFFFF",
                fontSize: "28px", background: "transparent", border: "none",
                cursor: "pointer", lineHeight: 1, padding: "4px 8px", zIndex: 2,
              }}
            >
              ×
            </button>

            <div className="protocols-expanded-grid" style={{
              display: "flex", alignItems: "center", gap: "80px",
              padding: "100px 80px", minHeight: "100vh",
            }}>
              <div className="protocols-expanded-left" style={{
                flex: "0 0 45%",
                animation: "exp-slide-left 600ms cubic-bezier(0.16,1,0.3,1) both",
              }}>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                  textTransform: "uppercase", color: "#FF5003",
                  fontSize: "11px", letterSpacing: "0.12em", marginBottom: "16px",
                }}>
                  Category
                </div>
                <h2 style={{
                  fontFamily: "'Fraunces', serif", fontWeight: 900, color: "#FFFFFF",
                  fontSize: "clamp(56px, 7vw, 88px)", lineHeight: 1,
                  margin: "0 0 20px",
                }} className="protocols-expanded-title">{activeMeta.label}</h2>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
                  color: "rgba(255,255,255,0.65)", fontSize: "18px",
                  lineHeight: 1.6, maxWidth: "400px", margin: "0 0 40px",
                }}>
                  {descriptors[activeCategory!]}
                </p>
                <button
                  onClick={() => openWithProtocol(featured.name)}
                  className="protocols-expanded-cta"
                  style={{
                    background: "#FF5003", color: "#FFFFFF",
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: "13px", letterSpacing: "0.06em",
                    borderRadius: "999px", padding: "16px 32px",
                    border: "none", cursor: "pointer",
                    display: "inline-block", marginBottom: "16px",
                  }}
                >
                  START YOUR ASSESSMENT →
                </button>
                <a href="/protocols" style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                  color: "rgba(255,255,255,0.4)", fontSize: "14px",
                  textDecoration: "none",
                }} className="hover:text-white transition-colors">
                  Explore all protocols →
                </a>
              </div>

              <div className="protocols-expanded-right" style={{
                flex: "0 0 50%",
                animation: "exp-slide-right 600ms cubic-bezier(0.16,1,0.3,1) 120ms both",
              }}>
                <button
                  onClick={() => openWithProtocol(featured.name)}
                  className="protocols-featured-card"
                  style={{
                    width: "100%", textAlign: "left",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "20px", padding: "40px",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                    textTransform: "uppercase", color: "#FF5003",
                    fontSize: "10px", letterSpacing: "0.1em", marginBottom: "20px",
                  }}>
                    {featured.tags}
                  </div>
                  <h3 style={{
                    fontFamily: "'Fraunces', serif", fontWeight: 700,
                    fontStyle: "italic", color: "#FFFFFF",
                    fontSize: "32px", lineHeight: 1.1, margin: 0,
                  }}>
                    <ProtocolName name={featured.name} />
                  </h3>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
                    color: "rgba(255,255,255,0.7)", fontSize: "15px",
                    lineHeight: 1.75, marginTop: "16px", marginBottom: 0,
                  }}>
                    {featured.desc}
                  </p>
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "28px 0" }} />
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
                    fontStyle: "italic", color: "rgba(255,255,255,0.35)",
                    fontSize: "13px", margin: 0,
                  }}>
                    Your doctor will confirm the right protocol after your consultation.
                  </p>
                </button>
              </div>
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
        @keyframes exp-slide-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes exp-slide-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .protocols-expanded-grid {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 80px 24px 40px !important;
            gap: 32px !important;
          }
          .protocols-expanded-left, .protocols-expanded-right {
            flex: 1 1 auto !important;
            width: 100%;
          }
          .protocols-expanded-title {
            font-size: 52px !important;
          }
          .protocols-expanded-cta {
            width: 100%;
          }
          .protocols-back-link {
            left: 24px !important;
          }
          .protocols-featured-card {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Protocols;
