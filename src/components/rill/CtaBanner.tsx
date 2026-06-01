import { useQuiz } from "./quizContext";

const NOISE = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")";

const CtaBanner = () => {
  const { open } = useQuiz();
  return (
    <section className="section-exit-blur" style={{
      position: "relative",
      overflow: "hidden",
      width: "calc(100% - 96px)",
      margin: "0 48px",
      borderRadius: 32,
      background: "linear-gradient(135deg, #1A2B35 0%, #243B47 50%, #1A2B35 100%)",
      padding: "100px 0",
    }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: NOISE, pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, background: "radial-gradient(circle, rgba(255,80,3,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div className="cta-inner" style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 48,
      }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.1, margin: 0, letterSpacing: "-0.01em" }}>
          Personalised longevity.<br />
          <span style={{ color: "#FFFFFF" }}>It starts with you.</span>
        </h2>
        <button onClick={open} className="cta-btn" style={{
          background: "#FF5003", color: "#fff", border: "none", borderRadius: 999,
          padding: "16px 40px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
          fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", cursor: "pointer",
          flexShrink: 0, transition: "all 0.2s ease",
        }}>
          Start your assessment →
        </button>
      </div>
      <style>{`
        .cta-btn:hover { background: #E8571A !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,80,3,0.35); }
        @media (max-width: 800px) {
          .cta-inner { flex-direction: column !important; align-items: flex-start !important; padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default CtaBanner;
