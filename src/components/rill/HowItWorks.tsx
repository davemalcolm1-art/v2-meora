import { useEffect, useRef, useState } from "react";
import { useQuiz } from "./quizContext";

type Step = { n: number; title: string; body: string };

const steps: Step[] = [
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

const StepRow = ({ s, index }: { s: Step; index: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const num = String(s.n).padStart(2, "0");
  const delay = index * 100;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "flex-start",
        padding: "48px 0",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 500ms ${EASE} ${delay}ms, transform 500ms ${EASE} ${delay}ms`,
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "#FF5003",
          lineHeight: 1,
          flexShrink: 0,
          paddingTop: 6,
        }}
      >
        {num}
      </span>
      <div
        style={{
          width: 1,
          height: 40,
          background: "rgba(255,255,255,0.2)",
          margin: "0 32px",
          flexShrink: 0,
        }}
      />
      <div>
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 32,
            color: "#FFFFFF",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {s.title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 15,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)",
            margin: "8px 0 0",
            maxWidth: 600,
          }}
        >
          {s.body}
        </p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const { open } = useQuiz();

  return (
    <section
      className="how-section how-section--v3"
      id="how"
      style={{ background: "#1A2B35", padding: "120px 80px 0", margin: 0 }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 60 }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#FF5003",
              fontSize: 11,
              letterSpacing: "0.12em",
              marginBottom: 20,
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
              fontSize: 16,
              lineHeight: 1.6,
              marginTop: 24,
              maxWidth: 560,
            }}
          >
            Most patients complete the full process in under two weeks.
          </p>
        </div>

        {/* Steps */}
        <div>
          {steps.map((s, i) => (
            <div key={s.n}>
              <StepRow s={s} index={i} />
              {i < steps.length - 1 && (
                <div style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,80,3,0.2)",
          padding: "40px 80px",
          marginTop: 80,
          marginLeft: -80,
          marginRight: -80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            color: "#FFFFFF",
            fontSize: 24,
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
            borderRadius: 999,
            padding: "14px 28px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          Start your assessment →
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;
