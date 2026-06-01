const domains = [
  { num: "01", name: "ENERGY", desc: "Designed for sustained drive, clarity and output." },
  { num: "02", name: "PERFORMANCE", desc: "Designed for strength, body composition and endurance." },
  { num: "03", name: "BALANCE", desc: "Designed for hormonal equilibrium and whole-body calm." },
  { num: "04", name: "RECOVERY", desc: "Designed to support repair, resilience and tissue health." },
  { num: "05", name: "LONGEVITY", desc: "Designed for healthy ageing and cellular optimisation." },
  { num: "06", name: "BEAUTY", desc: "Designed for skin health, collagen and radiance from within." },
];

const noiseSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`;

const Domains = () => (
  <section style={{ background: "#F7F4EF", padding: "120px 0" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 80px" }} className="domains-wrap">
      <div style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,43,53,0.4)", marginBottom: 20 }}>
          YOUR GOALS
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#1A2B35", fontSize: "clamp(36px,4vw,52px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
          Six domains.<br />
          <em style={{ fontStyle: "italic", color: "#FF5003" }}>One protocol, built for you.</em>
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.75, color: "rgba(26,43,53,0.6)", marginTop: 16 }}>
          Choose the area of your life you want to optimise. Your doctor does the rest.
        </p>
      </div>

      <div className="domains-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {domains.map((d) => (
          <a
            key={d.num}
            href="#domain-placeholder"
            className="domain-card"
            style={{
              position: "relative",
              height: 320,
              borderRadius: 20,
              overflow: "hidden",
              background: "radial-gradient(ellipse at 30% 20%, #2D4459 0%, #1A2B35 60%, #141F28 100%)",
              textDecoration: "none",
              display: "block",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: noiseSvg, pointerEvents: "none" }} />
            <img src="/meora-mark-white.svg" alt="" aria-hidden="true" style={{ position: "absolute", bottom: -20, right: -20, width: 140, opacity: 0.04, pointerEvents: "none" }} />
            <div className="domain-arrow" style={{
              position: "absolute", top: 20, right: 20,
              width: 36, height: 36, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.6)", fontSize: 16,
              transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
            }}>→</div>
            <div style={{ position: "absolute", bottom: 0, left: 0, padding: 28 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>{d.num}</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 28, color: "#fff", lineHeight: 1.1 }}>{d.name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 6, lineHeight: 1.5 }}>{d.desc}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
    <style>{`
      .domain-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
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

export default Domains;
