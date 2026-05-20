import { useQuiz } from "./quizContext";

const ContrastInterstitial = () => {
  const { open } = useQuiz();
  return (
    <section
      className="contrast-interstitial"
      style={{
        background: "#1A2B35",
        padding: "80px",
      }}
    >
      <div
        className="ci-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 48,
          alignItems: "center",
          maxWidth: 1320,
          margin: "0 auto",
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
            BUILT FOR REAL LIFE
          </div>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              color: "#FFFFFF",
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Energy for today.
            <br />
            Health for tomorrow.
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 400,
              marginTop: 16,
            }}
          >
            Meora combines modern medicine with simplified routines so you can
            perform at your best, every day.
          </p>
        </div>
        <button
          onClick={open}
          style={{
            background: "#E8571A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 999,
            padding: "18px 40px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Start your assessment →
        </button>
      </div>
      <style>{`
        .contrast-interstitial h2,
        .contrast-interstitial h2 * { color: #FFFFFF !important; }
        .contrast-interstitial p { color: rgba(255,255,255,0.65) !important; }
        @media (max-width: 768px) {
          .contrast-interstitial { padding: 60px 24px !important; }
          .ci-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
};

export default ContrastInterstitial;
