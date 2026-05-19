import { useQuiz } from "./quizContext";

const InterstitialBreak = ({ label }: { label: string }) => {
  const { open } = useQuiz();
  return (
    <section
      style={{
        background: "#1A2B35",
        padding: "60px 80px",
      }}
    >
      <div
        className="ib-grid"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          maxWidth: 1320,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#FFFFFF",
          }}
        >
          {label}
        </div>
        <button
          onClick={open}
          style={{
            background: "#FF5003",
            color: "#FFFFFF",
            border: "none",
            outline: "none",
            borderRadius: 999,
            padding: "16px 32px",
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
        @media (max-width: 768px) {
          .ib-grid { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
};

export default InterstitialBreak;
