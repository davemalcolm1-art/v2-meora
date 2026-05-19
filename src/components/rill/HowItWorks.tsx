import { useEffect, useRef, useState } from "react";
import { useQuiz } from "./quizContext";

type Step = { n: number; title: string; body: string; indent: string };

const steps: Step[] = [
  {
    n: 1,
    title: "Tell us about yourself.",
    body: "Complete a short health assessment — your goals, history, and what you want to achieve. Takes 5 minutes. No commitment.",
    indent: "0px",
  },
  {
    n: 2,
    title: "Meet your doctor.",
    body: "An AHPRA-registered GP reviews your assessment and conducts a thorough telehealth consultation. Where clinically appropriate, they'll request a targeted blood panel to personalise your protocol.",
    indent: "clamp(40px, 6vw, 100px)",
  },
  {
    n: 3,
    title: "Receive your protocol.",
    body: "If approved, your prescription is written and your protocol is compounded by a registered pharmacy. Cold-chain delivered discreetly to your door.",
    indent: "clamp(80px, 12vw, 200px)",
  },
  {
    n: 4,
    title: "Ongoing clinical care.",
    body: "Every 90 days, a follow-up consultation and blood review. Your protocol is adjusted as you progress. Not a one-time prescription — a continuous clinical relationship.",
    indent: "clamp(120px, 18vw, 280px)",
  },
];

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const StepRow = ({
  s,
  index,
  active,
  onActivate,
}: {
  s: Step;
  index: number;
  active: boolean;
  onActivate: () => void;
}) => {
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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const num = String(s.n).padStart(2, "0");
  const delay = index * 100;

  return (
    <div
      ref={ref}
      className={`how-cascade-row${active ? " is-active" : ""}`}
      onClick={onActivate}
      style={{
        maxWidth: "680px",
        marginLeft: s.indent,
        padding: "32px 0",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateX(0)" : "translateX(-40px)",
        transition: `opacity 600ms ${EASE} ${delay}ms, transform 600ms ${EASE} ${delay}ms`,
        cursor: "pointer",
        display: "flex",
        alignItems: "flex-start",
        gap: "0",
      }}
    >
      <div
        className="how-cascade-num-wrap"
        style={{
          flex: "0 0 80px",
          width: "80px",
          opacity: active ? 1 : 0.25,
          transition: "opacity 300ms ease",
        }}
      >
        <span
          className="how-cascade-num"
          style={{
            display: "inline-block",
            fontFamily: "'Fraunces', serif",
            fontWeight: 900,
            fontSize: "32px",
            lineHeight: 1,
            color: "#FF5003",
            transition: `font-size 300ms ${EASE}, transform 300ms ${EASE}`,
          }}
        >
          {num}
        </span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          className="how-cascade-title"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            color: "#FFFFFF",
            fontSize: "clamp(22px, 2.5vw, 32px)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {s.title}
        </h3>
        <div
          className="how-cascade-body-wrap"
          style={{
            overflow: "hidden",
            transition: `max-height 500ms ${EASE}, opacity 400ms ease, padding 400ms ease`,
          }}
        >
          <p
            className="how-cascade-body"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "15px",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)",
              margin: 0,
            }}
          >
            {s.body}
          </p>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const { open } = useQuiz();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      className="how-section how-section--v3"
      id="how"
      style={{ background: "#1A2B35", padding: 0, margin: 0 }}
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

      {/* Cascade steps */}
      <div className="how-cascade" style={{ padding: "0 80px 80px" }}>
        {steps.map((s, i) => (
          <StepRow
            key={s.n}
            s={s}
            index={i}
            active={activeStep === s.n}
            onActivate={() => setActiveStep((cur) => (cur === s.n ? null : s.n))}
          />
        ))}
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

        /* Body collapsed by default */
        .how-cascade-row .how-cascade-body-wrap {
          max-height: 0;
          opacity: 0;
          padding-top: 0;
          padding-bottom: 0;
        }
        .how-cascade-row .how-cascade-title {
          transition: transform 300ms ${EASE};
        }
        .how-cascade-row {
          border-left: 2px solid transparent;
          padding-left: 0;
          transition: border-color 200ms ease, padding-left 200ms ease,
            opacity 600ms ${EASE}, transform 600ms ${EASE};
        }

        /* Hover (desktop only) — reveal full body, readable */
        @media (hover: hover) {
          .how-cascade-row:hover .how-cascade-num-wrap { opacity: 1 !important; }
          .how-cascade-row:hover .how-cascade-num { font-size: 56px; }
          .how-cascade-row:hover .how-cascade-title { transform: translateX(12px); }
          .how-cascade-row:hover .how-cascade-body-wrap {
            max-height: 300px;
            opacity: 1;
            padding-top: 16px;
            padding-bottom: 8px;
          }
          .how-cascade-row:hover .how-cascade-body { color: rgba(255,255,255,0.85) !important; }
          .how-cascade-row:hover {
            border-left-color: #FF5003;
            padding-left: 32px;
          }
        }

        /* Active (clicked) — overrides hover */
        .how-cascade-row.is-active .how-cascade-num-wrap { opacity: 1 !important; }
        .how-cascade-row.is-active .how-cascade-num { font-size: 64px; }
        .how-cascade-row.is-active .how-cascade-title { transform: translateX(12px); }
        .how-cascade-row.is-active .how-cascade-body-wrap {
          max-height: 300px;
          opacity: 1;
          padding-top: 16px;
          padding-bottom: 8px;
        }
        .how-cascade-row.is-active .how-cascade-body { color: rgba(255,255,255,0.85) !important; }
        .how-cascade-row.is-active {
          border-left-color: #FF5003;
          padding-left: 32px;
        }

        @media (max-width: 768px) {
          .how-v3-header { padding: 60px 24px 40px !important; }
          .how-cascade { padding: 0 24px 60px !important; }
          .how-cascade-row {
            margin-left: 0 !important;
            padding-top: 24px !important;
            padding-bottom: 24px !important;
          }
          .how-cascade-title { font-size: 20px !important; }
          .how-v3-cta { padding: 32px 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
