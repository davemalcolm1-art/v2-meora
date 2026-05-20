import { useQuiz } from "./quizContext";

const bullets = [
  "AHPRA-registered doctor consultation",
  "Registered compounding pharmacy",
  "Quarterly blood review included",
];

const MeasuredMe = () => {
  const { open } = useQuiz();
  return (
    <section
      className="measured-me"
      style={{
        background: "#FAF7F2",
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
              color: "#E8571A",
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
            <span style={{ fontStyle: "italic", fontWeight: 900, color: "#E8571A" }}>
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
              color: "#E8571A",
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
              color: "#E8571A",
              marginBottom: 20,
            }}
          >
            FEATURED PROTOCOL
          </div>

          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: 32,
              color: "#111827",
              lineHeight: 1.1,
            }}
          >
            Foundation.<span style={{ color: "#E8571A" }}>ME</span>
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              lineHeight: 1.7,
              color: "#6B6560",
              marginTop: 12,
            }}
          >
            Doctor-prescribed protocol for energy, recovery and long-term vitality.
          </p>

          <div style={{ height: 1, background: "#E8E2D9", margin: "24px 0" }} />

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {bullets.map((b) => (
              <li key={b} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8571A", flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#374151",
                  }}
                >
                  {b}
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={open}
            style={{
              display: "block",
              marginTop: 28,
              background: "none",
              border: "none",
              padding: 0,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              color: "#E8571A",
              fontSize: 13,
              letterSpacing: "0.06em",
              cursor: "pointer",
            }}
          >
            START YOUR ASSESSMENT →
          </button>
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
};

export default MeasuredMe;
