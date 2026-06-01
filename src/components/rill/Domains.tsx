import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";

const domains = [
  { num: "01", name: "ENERGY", desc: "Designed for sustained drive, clarity and output.", gradient: "linear-gradient(145deg, #2C3E2D 0%, #1A2B1A 100%)" },
  { num: "02", name: "PERFORMANCE", desc: "Designed for strength, body composition and endurance.", gradient: "linear-gradient(145deg, #2C2535 0%, #1A1525 100%)" },
  { num: "03", name: "BALANCE", desc: "Designed for hormonal equilibrium and whole-body calm.", gradient: "linear-gradient(145deg, #1F3040 0%, #0F1E2A 100%)" },
  { num: "04", name: "RECOVERY", desc: "Designed to support repair, resilience and tissue health.", gradient: "linear-gradient(145deg, #352520 0%, #251510 100%)" },
  { num: "05", name: "LONGEVITY", desc: "Designed for healthy ageing and cellular optimisation.", gradient: "linear-gradient(145deg, #1A2B35 0%, #0F1A20 100%)" },
  { num: "06", name: "BEAUTY", desc: "Designed for skin health, collagen and radiance from within.", gradient: "linear-gradient(145deg, #352535 0%, #200F20 100%)" },
];

const noiseSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`;

const Domains = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const gridRef = useStaggerAnimation<HTMLDivElement>(domains.length, 80);

  return (
    <section ref={sectionRef} className="scroll-animate" style={{ width: "100%", background: "#F7F4EF", padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }} className="domains-wrap">
        <div style={{ marginBottom: 56 }}>
          <div className="scroll-animate" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,43,53,0.4)", marginBottom: 20 }}>
            YOUR GOALS
          </div>
          <h2 className="scroll-animate delay-100" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#1A2B35", fontSize: "clamp(36px,4vw,52px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
            Six domains.<br />
            <span style={{ color: "#1A2B35" }}>One protocol, built for you.</span>
          </h2>
          <p className="scroll-animate delay-200" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.75, color: "rgba(26,43,53,0.55)", marginTop: 16 }}>
            Choose the area of your life you want to optimise. Your doctor does the rest.
          </p>
        </div>

        <div ref={gridRef} className="domains-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {domains.map((d) => (
            <a
              key={d.num}
              href="#domain-placeholder"
              className="domain-card card-hover"
              style={{
                position: "relative",
                height: 320,
                borderRadius: 20,
                overflow: "hidden",
                background: d.gradient,
                textDecoration: "none",
                display: "block",
                transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: "60%", height: "60%", background: "radial-gradient(ellipse at top left, rgba(255,255,255,0.06) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
              <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: noiseSvg, pointerEvents: "none", zIndex: 0 }} />
              <img src="/meora-mark-white.svg" alt="" aria-hidden="true" style={{ position: "absolute", bottom: -20, right: -20, width: 140, opacity: 0.04, pointerEvents: "none", zIndex: 0 }} />
              <div className="domain-arrow" style={{
                position: "absolute", top: 20, right: 20, zIndex: 1,
                width: 32, height: 32, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.5)", fontSize: 14,
                transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
              }}>→</div>
              <div style={{ position: "absolute", bottom: 0, left: 0, padding: 28, zIndex: 1 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>{d.num}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", lineHeight: 1.1 }}>{d.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 6, lineHeight: 1.6 }}>{d.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .domain-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.3); }
        .domain-card:hover .domain-arrow { background: #FF5003; border-color: #FF5003; color: #fff; }
        @media (max-width: 900px) {
          .domains-grid { grid-template-columns: 1fr !important; }
          .domain-card { height: 240px !important; }
          .domains-wrap { padding: 0 24px !important; }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .domains-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
};

export default Domains;
