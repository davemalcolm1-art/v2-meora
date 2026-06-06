import { useEffect, useRef, useState } from "react";
import { useQuiz } from "./quizContext";

const CREAM = "#FAF7F2";
const INK = "#1A2B35";
const ORANGE = "#E8571A";

type Visual = "calendar" | "consult" | "protocol";
const steps: { n: string; title: string; desc: string; visual: Visual }[] = [
  {
    n: "01",
    title: "Complete your assessment & book your consultation",
    desc: "Tell us about your health history, goals, and lifestyle in a quick five-minute assessment, then choose a time that suits you to meet your doctor.",
    visual: "calendar",
  },
  {
    n: "02",
    title: "Meet your Meora doctor, review assessment and test results",
    desc: "A real telehealth consultation with an AHPRA-registered Australian GP who reviews your assessment and test results, understands your goals, and designs a personalised longevity protocol just for you.",
    visual: "consult",
  },
  {
    n: "03",
    title: "Your protocol, delivered",
    desc: "Compounded at a registered Australian pharmacy and shipped cold-chain directly to your door. Ongoing quarterly monitoring included.",
    visual: "protocol",
  },
];

function CalendarGlass() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const offset = 3; // month starts Thu
  return (
    <div className="glass-card">
      <div className="glass-cal-title">September 2026</div>
      <div className="glass-cal-grid glass-cal-head">
        {["MON","TUE","WED","THU","FRI","SAT","SUN"].map((d) => <span key={d}>{d}</span>)}
      </div>
      <div className="glass-cal-grid glass-cal-days">
        {Array.from({ length: offset }).map((_, i) => <span key={`e${i}`} />)}
        {days.map((d) => (
          <span key={d} className={d === 23 ? "glass-cal-active" : ""}>{d}</span>
        ))}
      </div>
    </div>
  );
}
function ConsultGlass() {
  return (
    <div className="glass-card glass-center">
      <div className="glass-pill">Telehealth consult</div>
      <div className="glass-title-lg">Meet your<br/>Meora doctor</div>
      <div className="glass-sub">AHPRA-registered • Australia-wide</div>
    </div>
  );
}
function ProtocolGlass() {
  return (
    <div className="glass-card glass-center">
      <div className="glass-pill">Compounded & shipped</div>
      <div className="glass-title-lg">Your protocol,<br/>delivered cold-chain</div>
      <div className="glass-sub">Quarterly monitoring included</div>
    </div>
  );
}

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
          min-height: 70vh;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(120% 80% at 20% 10%, rgba(232,87,26,0.10), transparent 60%),
            linear-gradient(135deg, rgba(26,43,53,0.06), rgba(26,43,53,0.02));
        }
        .glass-card {
          width: min(320px, 78%);
          aspect-ratio: 1 / 1;
          padding: 24px;
          border-radius: 28px;
          background: rgba(26,43,53,0.42);
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 30px 80px -20px rgba(26,43,53,0.35);
          color: ${CREAM};
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .glass-center { align-items: flex-start; justify-content: center; }
        .glass-pill {
          align-self: flex-start;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(250,247,242,0.85);
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 6px 12px;
          border-radius: 999px;
        }
        .glass-title-lg {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 400;
          font-size: 26px;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .glass-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(250,247,242,0.7);
        }
        .glass-cal-title {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 22px;
        }
        .glass-cal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px 4px;
          font-family: 'DM Sans', sans-serif;
          text-align: center;
        }
        .glass-cal-head span {
          font-size: 10px;
          letter-spacing: 0.14em;
          color: rgba(250,247,242,0.55);
        }
        .glass-cal-days span {
          font-size: 15px;
          padding: 6px 0;
          color: ${CREAM};
        }
        .glass-cal-active {
          background: ${ORANGE};
          color: ${CREAM};
          border-radius: 999px;
          width: 28px;
          height: 28px;
          line-height: 16px;
          margin: 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
                {s.visual === "calendar" && <CalendarGlass />}
                {s.visual === "consult" && <ConsultGlass />}
                {s.visual === "protocol" && <ProtocolGlass />}
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
