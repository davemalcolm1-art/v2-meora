import { useEffect, useRef, useState } from "react";

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

const StepBand = ({ s, index }: { s: typeof steps[number]; index: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dark = index % 2 === 0;
  const bg = dark ? "#1A2B35" : "#162030";
  const num = String(s.n).padStart(2, "0");
  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <div
      ref={ref}
      style={{
        background: bg,
        position: "relative",
        overflow: "hidden",
        padding: "60px 80px",
        minHeight: "260px",
        display: "flex",
        alignItems: "center",
      }}
      className="how-band"
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "60px",
          top: "50%",
          transform: `translateY(-50%) scale(${shown ? 1 : 0.85})`,
          opacity: shown ? 1 : 0,
          transition: `opacity 700ms ${ease}, transform 700ms ${ease}`,
          fontFamily: "'Fraunces', serif",
          fontWeight: 900,
          fontSize: "clamp(80px, 12vw, 160px)",
          lineHeight: 1,
          color: "rgba(255,80,3,0.12)",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
        }}
      >
        {num}
      </div>

      <div
        style={{
          position: "relative",
          marginLeft: "35%",
          width: "65%",
          opacity: shown ? 1 : 0,
          transform: shown ? "translateX(0)" : "translateX(40px)",
          transition: `opacity 600ms ${ease} 200ms, transform 600ms ${ease} 200ms`,
        }}
        className="how-band-content"
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#FF5003",
            fontSize: "11px",
            letterSpacing: "0.12em",
            marginBottom: "16px",
          }}
        >
          STEP {num}
        </div>
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            color: "#FFFFFF",
            fontSize: "clamp(28px, 3vw, 42px)",
            lineHeight: 1.15,
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
            color: "rgba(255,255,255,0.65)",
            fontSize: "16px",
            lineHeight: 1.7,
            maxWidth: "480px",
            marginTop: "16px",
            marginBottom: 0,
          }}
        >
          {s.body}
        </p>
      </div>
    </div>
  );
};

const HowItWorks = () => (
  <section className="how-section" id="how" style={{ padding: 0, background: "#F7F4EF" }}>
    <div style={{ padding: "120px 60px 60px", background: "#F7F4EF" }}>
      <div className="section-eyebrow reveal">
        <div className="section-eyebrow-line"></div>
        <span>How It Works</span>
      </div>
      <h2 className="section-h2 reveal reveal-delay-1">
        Four steps to<br />
        <em>a new standard.</em>
      </h2>
      <p className="how-reassurance reveal reveal-delay-2">
        Most patients complete the full process in under two weeks — from first visit to protocol delivered.
      </p>
    </div>

    <div>
      {steps.map((s, i) => (
        <StepBand key={s.n} s={s} index={i} />
      ))}
    </div>

    <style>{`
      .how-section .how-steps { display: none !important; }
      @media (max-width: 900px) {
        .how-band { padding: 48px 24px !important; }
        .how-band-content { margin-left: 0 !important; width: 100% !important; }
      }
    `}</style>
  </section>
);

export default HowItWorks;
