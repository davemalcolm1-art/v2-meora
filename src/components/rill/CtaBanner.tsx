import { useQuiz } from "./quizContext";

const CtaBanner = () => {
  const { open } = useQuiz();
  return (
    <section style={{ background: "#F7F4EF", padding: "0 40px", marginBottom: 120 }}>
      <div className="cta-inner" style={{
        background: "linear-gradient(135deg, #1A2B35 0%, #243B47 100%)",
        borderRadius: 24,
        padding: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 48,
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#fff", fontSize: "clamp(28px,3vw,42px)", lineHeight: 1.1, margin: 0, letterSpacing: "-0.01em" }}>
          Personalised longevity.<br />
          <em style={{ fontStyle: "italic", color: "#FF5003" }}>It starts with you.</em>
        </h2>
        <button onClick={open} style={{
          background: "#FF5003", color: "#fff", border: "none", borderRadius: 999,
          padding: "16px 36px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
          fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
          flexShrink: 0,
        }}>
          Start your assessment →
        </button>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .cta-inner { flex-direction: column !important; align-items: flex-start !important; padding: 48px !important; }
        }
      `}</style>
    </section>
  );
};

export default CtaBanner;
