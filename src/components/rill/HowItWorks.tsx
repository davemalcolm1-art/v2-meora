import { useState } from "react";
import { useQuiz } from "./quizContext";

const steps = [
  {
    n: 1,
    title: "Tell us about yourself.",
    body: "Complete a short health assessment — your goals, history, and what you want to achieve. Takes 5 minutes. No commitment.",
  },
  {
    n: 2,
    title: "Meet your doctor.",
    body: "An AHPRA-registered GP reviews your assessment and conducts a thorough telehealth consultation. Where clinically appropriate, they'll request a targeted blood panel to personalise your protocol.",
  },
  {
    n: 3,
    title: "Receive your protocol.",
    body: "If approved, your prescription is written and your protocol is compounded by a registered pharmacy. Cold-chain delivered discreetly to your door.",
  },
  {
    n: 4,
    title: "Ongoing clinical care.",
    body: "Every 90 days, a follow-up consultation and blood review. Your protocol is adjusted as you progress. Not a one-time prescription — a continuous clinical relationship.",
  },
];

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const HowItWorks = () => {
  const { open } = useQuiz();
  const [openStep, setOpenStep] = useState<number | null>(1);

  return (
    <section
      className="how-section how-section--v3"
      id="how"
      style={{
        background: "#1A2B35",
        padding: 0,
        margin: 0,
      }}
    >
      {/* Header */}
      <div className="how-v3-header" style={{ padding: "80px 80px 60px" }}>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#FF5003",
            fontSize: "11px",
            letterSpacing: "0.12em",
            marginBottom: "20px",
          }}
        >
          How It Works
        </div>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            color: "#FFFFFF",
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Four steps to
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 900, color: "#FF5003" }}>
            a new standard.
          </span>
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            fontSize: "16px",
            lineHeight: 1.6,
            marginTop: "24px",
            maxWidth: "560px",
          }}
        >
          Most patients complete the full process in under two weeks.
        </p>
      </div>

      {/* Accordion */}
      <div>
        {steps.map((s) => {
          const isOpen = openStep === s.n;
          const num = String(s.n).padStart(2, "0");
          return (
            <div
              key={s.n}
              className="how-v3-row"
              style={{
                background: isOpen ? "rgba(255,255,255,0.05)" : "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                transition: `background 300ms ${EASE}`,
              }}
            >
              <button
                onClick={() => setOpenStep(isOpen ? null : s.n)}
                className="how-v3-trigger"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  padding: "28px 80px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0",
                  textAlign: "left",
                  cursor: "pointer",
                  color: "inherit",
                }}
                aria-expanded={isOpen}
              >
                <span
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 900,
                    color: isOpen ? "#FF5003" : "rgba(255,80,3,0.4)",
                    fontSize: "18px",
                    lineHeight: 1,
                    width: "60px",
                    flex: "0 0 60px",
                    transition: `color 300ms ${EASE}`,
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    flex: 1,
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    fontSize: "clamp(20px, 2.5vw, 28px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                  className="how-v3-title"
                >
                  {s.title}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    color: "#FFFFFF",
                    fontSize: "24px",
                    lineHeight: 1,
                    display: "inline-block",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 300ms ease",
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: isOpen ? "240px" : "0px",
                  overflow: "hidden",
                  transition: `max-height 400ms ${EASE}`,
                }}
              >
                <p
                  className="how-v3-body"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "16px",
                    lineHeight: 1.75,
                    maxWidth: "600px",
                    margin: 0,
                    padding: "0 80px 28px 140px",
                  }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA row */}
      <div
        className="how-v3-cta"
        style={{
          background: "rgba(255,80,3,0.1)",
          borderTop: "1px solid rgba(255,80,3,0.2)",
          padding: "40px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            color: "#FFFFFF",
            fontSize: "24px",
            lineHeight: 1.2,
          }}
        >
          Ready to start?
        </div>
        <button
          onClick={open}
          style={{
            background: "#FF5003",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "999px",
            padding: "14px 28px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          Start your assessment →
        </button>
      </div>

      <style>{`
        .how-section.how-section--v3 { padding: 0 !important; background: #1A2B35 !important; }
        .how-section--v3 .how-steps { display: none !important; }
        .how-section--v3 .section-eyebrow,
        .how-section--v3 .section-h2,
        .how-section--v3 .how-reassurance { display: none !important; }
        @media (max-width: 768px) {
          .how-v3-header { padding: 60px 24px 40px !important; }
          .how-v3-trigger { padding: 24px !important; gap: 16px !important; }
          .how-v3-title { font-size: 20px !important; }
          .how-v3-body { padding: 0 24px 24px 24px !important; }
          .how-v3-cta { padding: 32px 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
