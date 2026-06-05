import { useEffect, useRef, useState } from "react";
import { useQuiz } from "./quizContext";

const lines = ["Personalised.", "Evidence-informed.", "Designed around you."];

const ClinicalPhilosophy = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const { open } = useQuiz();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="clinical-philosophy"
      style={{
        background: "#F7F4EF",
        padding: "120px 80px",
        position: "relative",
      }}
    >
      <div
        className="cp-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          maxWidth: 1200,
          margin: "0 auto",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(26,43,53,0.45)",
              marginBottom: 24,
            }}
          >
            CLINICAL PHILOSOPHY
          </div>
          {lines.map((line, i) => (
            <div
              key={line}
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 700,
                color: "#0f0f0f",
                fontSize: "clamp(36px, 4vw, 52px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 700ms ease ${i * 150}ms, transform 700ms ease ${i * 150}ms`,
              }}
            >
              {i === 1 ? <em style={{ fontStyle: "italic", color: "#E8571A" }}>{line}</em> : line}
            </div>
          ))}
        </div>
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.7,
              color: "rgba(26,43,53,0.7)",
              maxWidth: 460,
              margin: 0,
            }}
          >
            Our protocols are developed by AHPRA-registered doctors and guided by
            your individual assessment to support long-term vitality, performance
            and healthy ageing.
          </p>
          <button
            onClick={open}
            style={{
              marginTop: 32,
              background: "#E8571A",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 999,
              padding: "16px 32px",
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
      </div>
      <style>{`
        @media (max-width: 900px) {
          .clinical-philosophy { padding: 80px 24px !important; }
          .cp-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
};

export default ClinicalPhilosophy;
