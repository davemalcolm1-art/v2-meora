import { useQuiz } from "./quizContext";

const InterstitialBreak = ({ label }: { label: string }) => {
  const { open } = useQuiz();
  return (
    <section
      className="protocol-banner"
      style={{
        background: "linear-gradient(135deg, #E8571A 0%, #C4420A 60%, #1A2B35 100%)",
        padding: "100px 80px",
        textAlign: "center",
        margin: "0 40px",
        borderRadius: 24,
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          color: "#FFFFFF",
          fontSize: "clamp(48px, 6vw, 80px)",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          margin: 0,
          textTransform: "uppercase" as const,
        }}
      >
        {label.toUpperCase()}
      </h2>
      <button
        onClick={open}
        style={{
          marginTop: 40,
          background: "#FFFFFF",
          color: "#1A2B35",
          border: "none",
          outline: "none",
          borderRadius: 999,
          padding: "18px 48px",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 800,
          fontSize: 13,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Start your assessment →
      </button>
      <style>{`
        @media (max-width: 768px) {
          .protocol-banner { padding: 56px 24px !important; margin: 0 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default InterstitialBreak;
