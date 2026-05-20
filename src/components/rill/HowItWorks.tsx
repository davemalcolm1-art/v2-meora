import { useEffect, useRef, useState } from "react";
import { useQuiz } from "./quizContext";

const steps = [
  {
    n: 1,
    title: "Tell us about yourself.",
    body: "Complete a short health assessment — your goals, history, and what you want to achieve. Takes 5 minutes.",
    bg: "linear-gradient(160deg, #EDE8DE 0%, #FAF7F2 100%)",
    glow: "radial-gradient(ellipse at 90% 10%, rgba(232,87,26,0.12) 0%, transparent 50%)",
  },
  {
    n: 2,
    title: "Meet your doctor.",
    body: "An AHPRA-registered GP reviews your assessment and conducts a thorough telehealth consultation.",
    bg: "linear-gradient(160deg, #E8E2D8 0%, #F5F0E8 100%)",
    glow: "radial-gradient(ellipse at 90% 10%, rgba(232,87,26,0.09) 0%, transparent 50%)",
  },
  {
    n: 3,
    title: "Receive your protocol.",
    body: "Your prescription is written and compounded by a registered pharmacy. Cold-chain delivered to your door.",
    bg: "linear-gradient(160deg, #E2DCD2 0%, #EFEAD8 100%)",
    glow: "radial-gradient(ellipse at 90% 10%, rgba(184,210,230,0.15) 0%, transparent 50%)",
  },
  {
    n: 4,
    title: "Ongoing clinical care.",
    body: "Every 90 days, a follow-up consultation and blood review. A continuous clinical relationship, not a one-time prescription.",
    bg: "linear-gradient(160deg, #1A2B35 0%, #243B47 100%)",
    glow: "radial-gradient(ellipse at 20% 20%, rgba(232,87,26,0.2) 0%, transparent 50%)",
  },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
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

  const isDark = index === 3;
  const num = String(step.n).padStart(2, "0");
  const delay = index * 120;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: step.bg,
        borderRadius: 16,
        padding: "28px 24px",
        border: "1px solid rgba(26,43,53,0.06)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        transform: revealed
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(24px)",
        boxShadow: hovered
          ? isDark ? "0 12px 40px rgba(0,0,0,0.25)" : "0 12px 40px rgba(26,43,53,0.12)"
          : "none",
        opacity: revealed ? 1 : 0,
        transitionDelay: revealed ? "0ms" : `${delay}ms`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Card glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: step.glow,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 900,
            fontSize: 56,
            color: "#E8571A",
            opacity: isDark ? 0.3 : 0.15,
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          {num}
        </div>
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 18,
            color: isDark ? "#FFFFFF" : "#1A2B35",
            lineHeight: 1.2,
            margin: "0 0 10px",
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: isDark ? "rgba(255,255,255,0.55)" : "rgba(26,43,53,0.55)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {step.body}
        </p>
      </div>
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
      style={{
        background: "#FAF7F2",
        margin: "0 40px",
        borderRadius: 24,
        padding: "80px 60px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 15% 50%, rgba(232,87,26,0.06) 0%, transparent 60%), radial-gradient(ellipse at 85% 20%, rgba(184,210,230,0.12) 0%, transparent 55%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          flexWrap: "wrap",
          gap: 24,
          marginBottom: 48,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#E8571A",
              fontSize: 10,
              letterSpacing: "0.15em",
              marginBottom: 8,
            }}
          >
            HOW IT WORKS
          </div>
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              color: "#1A2B35",
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.1,
            }}
          >
            Four steps to
          </div>
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#E8571A",
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.1,
            }}
          >
            a new standard.
          </div>
        </div>
        <button
          onClick={open}
          style={{
            background: "#E8571A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 999,
            padding: "14px 28px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          START YOUR ASSESSMENT →
        </button>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
          gap: 8,
          position: "relative",
          zIndex: 1,
        }}
      >
        {steps.map((s, i) => (
          <StepCard key={s.n} step={s} index={i} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
