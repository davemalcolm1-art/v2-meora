import { useEffect, useRef, useState } from "react";
import { useQuiz } from "./quizContext";

const CREAM = "#FAF7F2";
const INK = "#1A2B35";
const ORANGE = "#E8571A";

const steps = [
  {
    n: "01",
    title: "Complete your assessment & book your consultation",
    desc: "Tell us about your health history, goals, and lifestyle in a quick five-minute assessment, then choose a time that suits you to meet your doctor.",
  },
  {
    n: "02",
    title: "Meet your Meora doctor",
    desc: "A real telehealth consultation with an AHPRA-registered Australian GP who reviews your blood results, understands your goals, and recommends a personalised protocol.",
  },
  {
    n: "03",
    title: "Your protocol, delivered",
    desc: "Compounded at a registered Australian pharmacy and shipped cold-chain directly to your door. Ongoing quarterly monitoring included.",
  },
];

export default function HowItWorksIntro() {
  const { open: openQuiz } = useQuiz();
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const progress = ((active + 1) / steps.length) * 100;

  return (
    <section style={{ background: CREAM, color: INK, width: "100%" }}>
      <style>{`
        .hiwi-wrap { max-width: 1280px; margin: 0 auto; padding: 120px 48px 80px; }
        .hiwi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: flex-start;
        }
        .hiwi-sticky {
          position: sticky;
          top: 120px;
          align-self: flex-start;
        }
        .hiwi-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${ORANGE};
          margin: 0 0 20px;
        }
        .hiwi-h2 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 400;
          font-size: clamp(36px, 4vw, 56px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: ${INK};
          margin: 0 0 48px;
        }
        .hiwi-active-num {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.16em;
          color: ${ORANGE};
          margin: 0 0 16px;
        }
        .hiwi-active-title {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 400;
          font-size: 32px;
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: ${INK};
          margin: 0 0 16px;
          transition: opacity 0.4s ease;
        }
        .hiwi-active-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.65;
          color: rgba(26,43,53,0.65);
          margin: 0;
          max-width: 460px;
          transition: opacity 0.4s ease;
        }
        .hiwi-progress {
          margin-top: 48px;
          width: 180px;
          height: 2px;
          background: rgba(26,43,53,0.12);
          border-radius: 2px;
          overflow: hidden;
        }
        .hiwi-progress-fill {
          height: 100%;
          background: ${ORANGE};
          transition: width 0.5s ease;
        }
        .hiwi-panels { display: flex; flex-direction: column; gap: 32px; }
        .hiwi-panel {
          min-height: 80vh;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(26,43,53,0.08);
          border-radius: 24px;
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .hiwi-watermark {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 400;
          font-size: clamp(140px, 18vw, 240px);
          line-height: 0.9;
          color: rgba(232,87,26,0.10);
          margin: 0;
          letter-spacing: -0.04em;
        }
        .hiwi-icon {
          align-self: flex-end;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: ${ORANGE};
          color: ${CREAM};
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 48px;
        }
        .hiwi-cta-wrap {
          display: flex;
          justify-content: center;
          padding: 60px 24px 40px;
        }
        .hiwi-cta {
          background: ${ORANGE};
          color: ${CREAM};
          border: none;
          border-radius: 999px;
          padding: 18px 36px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .hiwi-cta:hover { transform: translateY(-2px); background: #ff6320; }

        @media (max-width: 860px) {
          .hiwi-wrap { padding: 80px 20px 40px; }
          .hiwi-grid { grid-template-columns: 1fr; gap: 32px; }
          .hiwi-sticky { position: static; }
          .hiwi-panel { min-height: 60vh; padding: 32px; }
          .hiwi-h2 { font-size: 32px; }
        }
      `}</style>

      <div className="hiwi-wrap">
        <div className="hiwi-grid">
          {/* Sticky left column */}
          <div className="hiwi-sticky">
            <p className="hiwi-eyebrow">How it works</p>
            <h2 className="hiwi-h2">From first question to first protocol.</h2>

            <div key={active}>
              <p className="hiwi-active-num">Step {steps[active].n}</p>
              <h3 className="hiwi-active-title">{steps[active].title}</h3>
              <p className="hiwi-active-desc">{steps[active].desc}</p>
            </div>

            <div className="hiwi-progress" aria-hidden="true">
              <div className="hiwi-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Scrollable right column */}
          <div className="hiwi-panels">
            {steps.map((s, i) => (
              <div
                key={s.n}
                ref={(el) => (panelRefs.current[i] = el)}
                data-index={i}
                className="hiwi-panel"
              >
                <p className="hiwi-watermark">{s.n}</p>
                <div className="hiwi-icon" aria-hidden="true">
                  {i === 0 ? "✓" : i === 1 ? "◐" : "✦"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hiwi-cta-wrap">
          <button className="hiwi-cta" onClick={openQuiz}>
            Start your assessment →
          </button>
        </div>
      </div>
    </section>
  );
}
