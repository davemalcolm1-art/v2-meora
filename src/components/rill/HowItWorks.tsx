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

const StepCard = ({ s, index }: { s: Step; index: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);

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
  const delay = index * 120;
  const isLast = index === steps.length - 1;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(145deg, #1A2B35 0%, #243B47 100%)"
          : "linear-gradient(145deg, #F5F0E8 0%, #FAF7F2 100%)",
        padding: "40px 32px",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(232,87,26,0.08)",
        borderRight: isLast ? "1px solid rgba(232,87,26,0.08)" : "1px solid rgba(232,87,26,0.08)",
        boxShadow: "var(--shadow-soft)",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms, background 0.3s ease`,
        cursor: "default",
      }}
    >
      <div
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 900,
          fontSize: 80,
          color: "#E8571A",
          opacity: hovered ? 0.08 : 0.15,
          lineHeight: 1,
          marginBottom: 24,
          transition: "opacity 0.3s ease",
        }}
      >
        {num}
      </div>
      <h3
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          fontSize: 24,
          color: hovered ? "#FFFFFF" : "#1A2B35",
          lineHeight: 1.2,
          margin: "0 0 12px",
          transition: "color 0.3s ease",
        }}
      >
        {s.title}
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: 14,
          color: hovered ? "rgba(255,255,255,0.6)" : "rgba(26,43,53,0.6)",
          lineHeight: 1.7,
          margin: 0,
          transition: "color 0.3s ease",
        }}
      >
        {s.body}
      </p>
    </div>
  );
};

const HowItWorks = () => {
  const { open } = useQuiz();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      className="how-section how-section--v3"
      id="how"
      style={{ background: "#FAF7F2", padding: "120px 80px", margin: 0 }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#E8571A",
              fontSize: 11,
              letterSpacing: "0.15em",
              marginBottom: 20,
            }}
          >
            HOW IT WORKS
          </div>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              color: "#1A2B35",
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Four steps to
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 700, color: "#E8571A" }}>
              a new standard.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              color: "rgba(26,43,53,0.55)",
              fontSize: 16,
              lineHeight: 1.6,
              marginTop: 16,
              maxWidth: 560,
            }}
          >
            Most patients complete the full process in under two weeks.
          </p>
        </div>

        {/* Step Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gap: 2,
            marginTop: 80,
          }}
        >
          {steps.map((s, i) => (
            <StepCard key={s.n} s={s} index={i} />
          ))}
        </div>

        {/* CTA Row */}
        <div
          style={{
            marginTop: 60,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: 24,
              color: "#1A2B35",
              lineHeight: 1.2,
            }}
          >
            Ready to start?
          </div>
          <button
            onClick={open}
            style={{
              background: "#E8571A",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 999,
              padding: "16px 40px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            START YOUR ASSESSMENT →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
