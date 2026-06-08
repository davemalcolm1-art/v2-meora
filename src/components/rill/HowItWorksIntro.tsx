import { useEffect, useRef, useState } from "react";
import { useQuiz } from "./quizContext";
import bgStep1 from "@/assets/domains/balance-hero.jpg.asset.json";
import bgStep2 from "@/assets/domains/longevity-hero.jpg.asset.json";
import bgStep3 from "@/assets/domains/performance-hero.jpg.asset.json";

const CREAM = "#FAF7F2";
const INK = "#1A2B35";
const ORANGE = "#E8571A";

type Card = { icon: string; title: string };
const steps: { n: string; title: string; desc: string; cards: Card[]; bg: string }[] = [
  {
    n: "01",
    title: "Complete your assessment & book your consultation",
    desc: "Tell us about your health history, goals, and lifestyle in a quick five-minute assessment, then choose a time that suits you to meet your doctor.",
    cards: [
      { icon: "clipboard", title: "Five-minute\nhealth assessment" },
      { icon: "calendar", title: "Pick a time\nthat suits you" },
    ],
    bg: bgStep1.url,
  },
  {
    n: "02",
    title: "Meet your Meora doctor, review assessment and test results",
    desc: "A real telehealth consultation with an AHPRA-registered Australian GP who reviews your assessment and test results, understands your goals, and designs a personalised longevity protocol just for you.",
    cards: [
      { icon: "video", title: "Telehealth\nwith your doctor" },
      { icon: "map", title: "Personalised\nlongevity roadmap" },
    ],
    bg: bgStep2.url,
  },
  {
    n: "03",
    title: "Your protocol, delivered",
    desc: "Compounded at a registered Australian pharmacy and shipped cold-chain directly to your door. Ongoing quarterly monitoring included.",
    cards: [
      { icon: "flask", title: "Compounded at an\nAustralian pharmacy" },
      { icon: "box", title: "Cold-chain shipping\nto your door" },
    ],
    bg: bgStep3.url,
  },
];

function Icon({ name }: { name: string }) {
  const common = { width: 36, height: 36, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "clipboard": return (<svg {...common}><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="m9 11 1.5 1.5L13 10"/><path d="m9 16 1.5 1.5L13 15"/></svg>);
    case "calendar": return (<svg {...common}><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>);
    case "shield": return (<svg {...common}><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z"/></svg>);
    case "video": return (<svg {...common}><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></svg>);
    case "lab": return (<svg {...common}><path d="M9 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L15 9V3"/><path d="M9 3h6"/></svg>);
    case "map": return (<svg {...common}><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z"/><path d="M9 4v16M15 6v16"/></svg>);
    case "flask": return (<svg {...common}><path d="M10 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3"/><path d="M8 14h8"/></svg>);
    case "box": return (<svg {...common}><path d="m12 3 9 4v10l-9 4-9-4V7l9-4Z"/><path d="m3 7 9 4 9-4M12 11v10"/></svg>);
    case "pulse": return (<svg {...common}><path d="M3 12h4l2-5 4 10 2-5h6"/></svg>);
    default: return null;
  }
}

function GlassCard({ icon, title }: Card) {
  return (
    <div className="glass-card">
      <div className="glass-icon"><Icon name={icon} /></div>
      <div className="glass-title-lg">{title.split("\n").map((l, i) => <span key={i}>{l}<br/></span>)}</div>
    </div>
  );
}

export default function HowItWorksIntro() {
  const { open: openQuiz } = useQuiz();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    stepRefs.current.forEach((el) => el && observer.observe(el));
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

        /* Right column: contains sticky frame + invisible scroll spacers */
        .hiwi-right { position: relative; min-width: 0; }
        .hiwi-sticky-frame {
          position: sticky;
          top: 120px;
          width: 100%;
          aspect-ratio: 5 / 6;
          max-height: 620px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 40px 100px -30px rgba(26,43,53,0.45);
          background: ${INK};
        }
        .hiwi-bg-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .hiwi-bg-layer.is-active { opacity: 1; }
        .hiwi-frame-tint {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(26,43,53,0.10), rgba(26,43,53,0.35));
          pointer-events: none;
        }

        .hiwi-cards-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .hiwi-card-pos {
          position: absolute;
          opacity: 0;
          transform: translate(var(--fx, 0), 24px);
          animation: hiwi-flyin 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hiwi-card-pos.pos-tl { top: 8%; left: 6%; --fx: -16px; }
        .hiwi-card-pos.pos-br { bottom: 8%; right: 6%; --fx: 16px; }
        .hiwi-card-pos.delay-1 { animation-delay: 0.15s; }
        @keyframes hiwi-flyin {
          to { opacity: 1; transform: translate(0, 0); }
        }
        .hiwi-card-float {
          animation: hiwi-float 4s ease-in-out infinite;
        }
        @keyframes hiwi-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .hiwi-driver {
          display: flex;
          flex-direction: column;
          gap: 0;
          /* Sits behind the sticky frame in the same column */
          margin-top: calc(-1 * min(620px, 60vw * 6 / 5));
          position: relative;
          z-index: 1;
          pointer-events: none;
        }
        .hiwi-step-spacer {
          min-height: 90vh;
        }

        .glass-card {
          width: clamp(220px, 38%, 300px);
          aspect-ratio: 1 / 1;
          padding: 24px;
          border-radius: 24px;
          background: rgba(26,43,53,0.5);
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 30px 80px -20px rgba(26,43,53,0.4);
          color: ${CREAM};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .glass-icon { color: ${CREAM}; opacity: 0.95; }
        .glass-icon svg { width: 40px; height: 40px; }
        .glass-title-lg {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 18px;
          line-height: 1.25;
          letter-spacing: -0.005em;
          color: ${CREAM};
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
          .hiwi-sticky-frame { position: relative; top: auto; }
          .hiwi-driver { margin-top: 0; }
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

          {/* Right column: pinned frame + invisible scroll-driver spacers */}
          <div className="hiwi-right">
            <div className="hiwi-sticky-frame">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className={`hiwi-bg-layer ${i === active ? "is-active" : ""}`}
                  style={{ backgroundImage: `url(${s.bg})` }}
                />
              ))}
              <div className="hiwi-frame-tint" />

              <div className="hiwi-cards-layer" key={`cards-${active}`}>
                <div className="hiwi-card-pos pos-tl">
                  <div className="hiwi-card-float">
                    <GlassCard icon={steps[active].cards[0].icon} title={steps[active].cards[0].title} />
                  </div>
                </div>
                <div className="hiwi-card-pos pos-br delay-1">
                  <div className="hiwi-card-float" style={{ animationDelay: "1.2s" }}>
                    <GlassCard icon={steps[active].cards[1].icon} title={steps[active].cards[1].title} />
                  </div>
                </div>
              </div>
            </div>

            <div className="hiwi-driver" aria-hidden="true">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  ref={(el) => (stepRefs.current[i] = el)}
                  data-index={i}
                  className="hiwi-step-spacer"
                />
              ))}
            </div>
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
