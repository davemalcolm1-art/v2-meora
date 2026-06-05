import { useQuiz } from "./quizContext";

const InterstitialBreak = ({ label }: { label: string }) => {
  const { open } = useQuiz();
  return (
    <section style={{ background: "#F7F4EF", padding: "60px 0" }}>
      <div
        className="protocol-banner"
        style={{
          background: "#0f0f0f",
          padding: "100px 80px",
          textAlign: "center",
          margin: "0 40px",
          borderRadius: 24,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 50%, rgba(232,87,26,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <h2
          style={{
            position: "relative",
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            color: "#FFFFFF",
            fontSize: "clamp(36px, 4vw, 52px)",
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
            position: "relative",
            marginTop: 40,
            background: "#E8571A",
            color: "#FFFFFF",
            border: "none",
            outline: "none",
            borderRadius: 999,
            padding: "18px 40px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Start your assessment →
        </button>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .protocol-banner { padding: 64px 24px !important; margin: 0 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default InterstitialBreak;
