import { useState, useEffect, useRef } from "react";
import { useQuiz } from "./quizContext";

const steps = [
  { num: "01", icon: "📋", title: "Complete your assessment", desc: "Tell us your goals and health history. Takes five minutes. Our clinical intake guides you through everything." },
  { num: "02", icon: "🩺", title: "Consult your GP", desc: "An AHPRA-registered doctor reviews your intake and discusses the right protocol for you via telehealth." },
  { num: "03", icon: "🧪", title: "Blood panel & approval", desc: "A targeted blood test confirms your baseline. Your doctor reviews results and releases your prescription." },
  { num: "04", icon: "📦", title: "Compounds delivered", desc: "Your protocol is prepared by a registered compounding pharmacy and dispatched cold-chain to your door." },
];

const HowItWorks = () => {
  const { open } = useQuiz();
  const [current, setCurrent] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([null, null, null, null]);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % steps.length);
    }, 2800);
  };

  useEffect(() => {
    resetInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  // Spotlight position
  useEffect(() => {
    const stage = stageRef.current;
    const overlay = overlayRef.current;
    const ring = ringRef.current;
    const btn = stepRefs.current[current];
    if (!stage || !overlay || !ring || !btn) return;

    const stageRect = stage.getBoundingClientRect();
    const iconWrap = btn.querySelector("[data-icon-wrap]") as HTMLElement;
    if (!iconWrap) return;
    const iconRect = iconWrap.getBoundingClientRect();
    const x = iconRect.left + iconRect.width / 2 - stageRect.left;
    const pct = (x / stage.offsetWidth * 100).toFixed(1) + "%";

    overlay.style.setProperty("--spot-x", pct);
    ring.style.left = x + "px";
  }, [current]);

  return (
    <section
      id="how"
      style={{
        background: "#1A2B35",
        padding: "80px 0",
        margin: "0 40px",
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* HEADER */}
      <div style={{ padding: "0 60px 48px" }}>
        <span style={{
          display: "block",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: "10px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#E8571A",
          marginBottom: "16px",
        }}>
          HOW IT WORKS
        </span>
        <h2 style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          fontSize: "clamp(32px, 4vw, 48px)",
          lineHeight: 1.1,
          color: "#fff",
          margin: "0 0 4px",
        }}>
          Simple steps.<br />
          <span style={{ fontStyle: "italic", color: "#E8571A" }}>Serious medicine.</span>
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: "15px",
          color: "rgba(255,255,255,0.45)",
          margin: "16px 0 0",
        }}>
          From your first consultation to compounds at your door.
        </p>
      </div>

      {/* STAGE */}
      <div ref={stageRef} style={{ position: "relative", height: 160, margin: "0 60px 32px" }}>
        {/* Connecting line */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 40,
          right: 40,
          height: 1,
          background: "rgba(255,255,255,0.08)",
          transform: "translateY(-50%)",
          zIndex: 0,
        }} />

        {/* Blur overlay */}
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(5px)",
            background: "rgba(26,43,53,0.5)",
            zIndex: 2,
            transition: "--spot-x 0.6s cubic-bezier(0.34,1.56,0.64,1)",
            WebkitMaskImage: "radial-gradient(circle 58px at var(--spot-x, 12.5%) 50%, transparent 0%, transparent 54px, black 68px)",
            maskImage: "radial-gradient(circle 58px at var(--spot-x, 12.5%) 50%, transparent 0%, transparent 54px, black 68px)",
          } as React.CSSProperties}
        />

        {/* Window ring */}
        <div
          ref={ringRef}
          style={{
            position: "absolute",
            width: 116,
            height: 116,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.18)",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
            pointerEvents: "none",
            transition: "left 0.6s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />

        {/* Step buttons */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
          padding: "0 20px",
          zIndex: 4,
        }}>
          {steps.map((step, i) => {
            const active = i === current;
            return (
              <button
                key={step.num}
                ref={(el) => { stepRefs.current[i] = el; }}
                onClick={() => { setCurrent(i); resetInterval(); }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  data-icon-wrap
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: active ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
                    border: active ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                    transform: active ? "scale(1.1)" : "scale(1)",
                    transition: "all 0.4s ease",
                  }}
                >
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    opacity: active ? 1 : 0.25,
                    transition: "opacity 0.4s ease",
                  }}>
                    {step.icon}
                  </span>
                </div>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: active ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                  transition: "color 0.4s ease",
                }}>
                  {step.num}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* INFO SECTION */}
      <div style={{ textAlign: "center", minHeight: 90, padding: "0 60px" }}>
        <div key={current} style={{ animation: "fadeUp 0.3s ease both" }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#E8571A",
          }}>
            STEP {steps[current].num}
          </span>
          <h3 style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: 24,
            color: "#fff",
            margin: "6px 0",
          }}>
            {steps[current].title}
          </h3>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.6,
            maxWidth: 380,
            margin: "0 auto",
          }}>
            {steps[current].desc}
          </p>
        </div>
      </div>

      {/* DOT INDICATORS */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 28 }}>
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); resetInterval(); }}
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: i === current ? 3 : "50%",
              background: i === current ? "#E8571A" : "rgba(255,255,255,0.15)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={open}
        style={{
          display: "block",
          margin: "28px auto 0",
          background: "#E8571A",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.06em",
          borderRadius: 999,
          padding: "12px 32px",
          border: "none",
          cursor: "pointer",
        }}
      >
        START YOUR ASSESSMENT →
      </button>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
