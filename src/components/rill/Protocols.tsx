import { useState, useMemo, useEffect } from "react";
import { useQuiz } from "./quizContext";

const ProtocolName = ({ name }: { name: string }) => {
  const base = name.replace(/\.ME$/, "");
  return (
    <>
      <span>{base}</span>
      <span style={{ color: "#E8571A" }}>.ME</span>
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
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&q=80" },
  { id: "performance", label: "Performance", line: "Build strength, speed and resilience.", count: 10, tier: "primary",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80" },
  { id: "balance", label: "Balance", line: "Hormonal equilibrium and whole-body calm.", count: 7, tier: "primary",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80" },
  { id: "recovery", label: "Recovery", line: "Repair faster. Come back stronger.", count: 3, tier: "secondary",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80" },
  { id: "longevity", label: "Longevity", line: "Age well. On your terms.", count: 4, tier: "secondary",
    image: "https://images.unsplash.com/photo-1571019614099-85f1e2d2c7ba?w=800&q=80" },
  { id: "beauty", label: "Beauty", line: "Skin health and collagen from within.", count: 4, tier: "secondary",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80" },
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

const Arrow = ({ size = 20, color = "#E8571A" }: { size?: number; color?: string }) => (
  <span aria-hidden="true" style={{ color, fontFamily: "'DM Sans', sans-serif", fontSize: `${size}px`, lineHeight: 1 }}>→</span>
);

const CARD_BG = "#F0EBE3";
const SECTION_BG = "#FAF7F2";

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
        borderRadius: isExpanded ? 0 : 24,
        margin: isExpanded ? 0 : "0 40px",
      }}
      className="selection:bg-[#E8571A] selection:text-white"
    >
      <div style={{ maxWidth: isExpanded ? "none" : "1200px", margin: "0 auto", padding: isExpanded ? "0" : "80px 60px" }}>
        {!isExpanded && (
          <div style={{ marginBottom: "56px" }}>
            <span style={{
              display: "block",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#E8571A",
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
              <span style={{ fontStyle: "italic", color: "#E8571A" }}>Goal-specific.</span>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }} className="protocols-grid">
            {categories.map((c, i) => {
              const cardGradients = [
                "linear-gradient(160deg, #C8DCF0 0%, #A8C4E4 100%)",
                "linear-gradient(160deg, #BDD4EC 0%, #9CBCE0 100%)",
                "linear-gradient(160deg, #B2CCE8 0%, #90B4DC 100%)",
                "linear-gradient(160deg, #A8C4E4 0%, #86ACD8 100%)",
                "linear-gradient(160deg, #9EBCE0 0%, #7CA4D4 100%)",
                "linear-gradient(160deg, #94B4DC 0%, #729CD0 100%)",
              ];
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(26,43,53,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                  style={{
                    background: cardGradients[i],
                    borderRadius: 14,
                    padding: "24px 20px",
                    height: 200,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    border: "none",
                    textAlign: "left",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "rgba(26,43,53,0.55)",
                    textTransform: "uppercase",
                  }}>
                    {c.label}
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 600,
                      fontSize: 18,
                      color: "#1A2B35",
                      lineHeight: 1.2,
                      margin: "0 0 8px",
                    }}>
                      {c.line}
                    </h3>
                    <span style={{
                      display: "inline-block",
                      background: "rgba(26,43,53,0.1)",
                      borderRadius: 999,
                      padding: "3px 10px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 9,
                      color: "rgba(26,43,53,0.6)",
                    }}>
                      {c.count} Protocols
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
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
                  textTransform: "uppercase", color: "#E8571A",
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
                    background: "#E8571A", color: "#FFFFFF",
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
                    textTransform: "uppercase", color: "#E8571A",
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
