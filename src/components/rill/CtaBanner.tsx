import { useQuiz } from "./quizContext";

const CtaBanner = () => {
  const { open } = useQuiz();
  return (
    <section className="section-exit-blur" style={{
      position: "relative",
      overflow: "hidden",
      width: "auto",
      background: "radial-gradient(ellipse at 30% 50%, #2D5470 0%, #1A3347 30%, #0f0f0f 65%, #0F1820 100%)",
      padding: "100px 0",
      margin: "24px",
      borderRadius: 32,
    }}>
      <div aria-hidden="true" style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, background: "radial-gradient(circle, rgba(255,80,3,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div className="cta-inner" style={{
        position: "relative",
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 48,
      }}>
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 16 }}>
            GET STARTED
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(32px,4vw,54px)", lineHeight: 1.05, margin: 0, letterSpacing: "-0.02em" }}>
            <span style={{ display: "block" }}>Personalised longevity.</span>
            <span style={{ display: "block" }}>It starts with you.</span>
          </h2>
        </div>
        <button onClick={open} className="cta-btn" style={{
          background: "#FF5003", color: "#fff", border: "none", borderRadius: 999,
          padding: "16px 40px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
          fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", cursor: "pointer",
          flexShrink: 0, transition: "all 0.2s ease",
        }}>
          START YOUR ASSESSMENT →
        </button>
      </div>
      <style>{`
        .cta-btn:hover { background: #E8571A !important; transform: translateY(-2px); box-shadow: 0 10px 36px rgba(255,80,3,0.4); }
        @media (max-width: 800px) {
          .cta-inner { flex-direction: column !important; align-items: center !important; text-align: center; padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default CtaBanner;
