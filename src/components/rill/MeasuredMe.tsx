const Sparkline = ({ trend = "up" }: { trend?: "up" | "down" | "flat" }) => {
  const paths: Record<string, string> = {
    up: "M0 18 L10 16 L20 14 L30 12 L40 9 L50 6 L60 3",
    down: "M0 4 L10 6 L20 9 L30 11 L40 14 L50 16 L60 18",
    flat: "M0 12 L10 10 L20 13 L30 9 L40 12 L50 8 L60 10",
  };
  return (
    <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
      <path d={paths[trend]} stroke="#FF5003" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const rows: { label: string; value: string; trend: "up" | "down" | "flat" }[] = [
  { label: "Sleep quality", value: "Improving", trend: "up" },
  { label: "Recovery rate", value: "Optimal", trend: "up" },
  { label: "Inflammation markers", value: "Reducing", trend: "down" },
  { label: "Hormone balance", value: "Stabilising", trend: "flat" },
];

const MeasuredMe = () => (
  <section
    className="measured-me"
    style={{
      background: "#F7F4EF",
      padding: "100px 80px",
    }}
  >
    <div
      className="mm-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "50% 45%",
        gap: "5%",
        maxWidth: 1320,
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#FF5003",
            marginBottom: 20,
          }}
        >
          YOUR HEALTH. MEASURED.
        </div>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            color: "#111827",
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Data that drives
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 900, color: "#FF5003" }}>
            better outcomes.
          </span>
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 1.75,
            color: "#6B6560",
            maxWidth: 440,
            marginTop: 20,
          }}
        >
          We analyse the right markers to build protocols that evolve with your
          progress. Not a one-size prescription — a continuous clinical
          relationship.
        </p>
        <a
          href="#about"
          style={{
            display: "inline-block",
            marginTop: 28,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            color: "#FF5003",
            fontSize: 13,
            letterSpacing: "0.06em",
            textDecoration: "none",
          }}
        >
          LEARN MORE →
        </a>
      </div>

      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 20,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: 40,
        }}
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#FF5003",
            marginBottom: 24,
          }}
        >
          BIOMARKER OVERVIEW
        </div>

        {rows.map((r, i) => (
          <div
            key={r.label}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              alignItems: "center",
              gap: 20,
              padding: "16px 0",
              borderTop: i === 0 ? "none" : "1px solid #F0EBE3",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                color: "#6B6560",
              }}
            >
              {r.label}
            </div>
            <Sparkline trend={r.trend} />
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#111827",
              }}
            >
              {r.value}
            </div>
          </div>
        ))}

        <a
          href="#"
          style={{
            display: "inline-block",
            marginTop: 24,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            color: "#FF5003",
            fontSize: 13,
            letterSpacing: "0.04em",
            textDecoration: "none",
          }}
        >
          VIEW YOUR DASHBOARD →
        </a>
      </div>
    </div>
    <style>{`
      @media (max-width: 900px) {
        .measured-me { padding: 64px 24px !important; }
        .mm-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      }
    `}</style>
  </section>
);

export default MeasuredMe;
