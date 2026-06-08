import { useEffect, useRef, useState } from "react";
import { useQuiz } from "./quizContext";

const CREAM = "#FAF7F2";
const INK = "#1A2B35";
const ORANGE = "#E8571A";

type StepKind = "assessment" | "telehealth" | "shipping" | "vitality";
const steps: { n: string; title: string; desc: string; kind: StepKind }[] = [
  {
    n: "01",
    title: "Complete your assessment",
    desc: "A quick, five-minute health assessment about your goals, history, and lifestyle.",
    kind: "assessment",
  },
  {
    n: "02",
    title: "Your personalised plan",
    desc: "Meet your AHPRA-registered doctor in a real-time telehealth consult. They review everything and design a longevity protocol built around you.",
    kind: "telehealth",
  },
  {
    n: "03",
    title: "Delivered to your door",
    desc: "Compounded at a registered Australian pharmacy and shipped cold-chain, straight to you.",
    kind: "shipping",
  },
  {
    n: "04",
    title: "Ongoing review",
    desc: "Quarterly check-ins and continuous adjustment as your goals and biology evolve.",
    kind: "vitality",
  },
];

function AssessmentCard() {
  const items = [
    { t: "Sleep quality", done: true },
    { t: "Energy levels", done: true },
    { t: "Training load", done: true },
    { t: "Recovery & stress", done: false },
    { t: "Goals & priorities", done: false },
  ];
  return (
    <div className="mock-card">
      <div className="mock-head">
        <span className="mock-eyebrow">Health assessment</span>
        <span className="mock-pill">3 of 5</span>
      </div>
      <ul className="mock-list">
        {items.map((it, i) => (
          <li key={i} className={`mock-row ${it.done ? "is-done" : ""}`}>
            <span className="mock-check" aria-hidden="true">
              {it.done ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg>
              ) : null}
            </span>
            <span className="mock-row-text">{it.t}</span>
          </li>
        ))}
      </ul>
      <div className="mock-progress"><div style={{ width: "60%" }} /></div>
    </div>
  );
}

function TelehealthCard() {
  return (
    <div className="mock-card mock-video">
      <div className="mock-video-stage">
        <div className="mock-live">
          <span className="mock-live-dot" /> LIVE
        </div>
        <div className="mock-avatar">DC</div>
        <div className="mock-video-controls">
          <span /><span /><span className="mock-ctl-end" />
        </div>
      </div>
      <div className="mock-video-meta">
        <div className="mock-vm-title">Dr Chen</div>
        <div className="mock-vm-sub">GP · Telehealth consult</div>
      </div>
    </div>
  );
}

function ShippingCard() {
  const stages = ["Compounded", "Dispatched", "Delivered"];
  const active = 1;
  return (
    <div className="mock-card">
      <div className="mock-head">
        <span className="mock-eyebrow">Order #M-2841</span>
        <span className="mock-pill">In transit</span>
      </div>
      <div className="mock-track">
        {stages.map((s, i) => (
          <div key={s} className={`mock-track-step ${i <= active ? "is-on" : ""}`}>
            <div className="mock-track-dot" />
            <div className="mock-track-label">{s}</div>
          </div>
        ))}
        <div className="mock-track-line"><div style={{ width: `${(active / (stages.length - 1)) * 100}%` }} /></div>
      </div>
      <div className="mock-foot">
        <div>
          <div className="mock-foot-k">ETA</div>
          <div className="mock-foot-v">Tue, 2:30pm</div>
        </div>
        <div>
          <div className="mock-foot-k">Cold-chain</div>
          <div className="mock-foot-v">2–8°C</div>
        </div>
      </div>
    </div>
  );
}

function VitalityCard() {
  const score = 92;
  const R = 52;
  const C = 2 * Math.PI * R;
  const offset = C - (score / 100) * C;
  return (
    <div className="mock-card mock-vitality">
      <div className="mock-head">
        <span className="mock-eyebrow">Vitality score</span>
        <span className="mock-pill">Q2 review</span>
      </div>
      <div className="mock-ring-wrap">
        <svg width="160" height="160" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r={R} stroke="rgba(250,247,242,0.12)" strokeWidth="10" fill="none" />
          <circle
            cx="65" cy="65" r={R}
            stroke={ORANGE}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            transform="rotate(-90 65 65)"
          />
        </svg>
        <div className="mock-ring-num">{score}</div>
      </div>
      <div className="mock-foot">
        <div><div className="mock-foot-k">Energy</div><div className="mock-foot-v">+18%</div></div>
        <div><div className="mock-foot-k">Sleep</div><div className="mock-foot-v">+24%</div></div>
        <div><div className="mock-foot-k">Recovery</div><div className="mock-foot-v">+12%</div></div>
      </div>
    </div>
  );
}

function MockCard({ kind }: { kind: StepKind }) {
  if (kind === "assessment") return <AssessmentCard />;
  if (kind === "telehealth") return <TelehealthCard />;
  if (kind === "shipping") return <ShippingCard />;
  return <VitalityCard />;
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
        .hiwi-sticky { position: sticky; top: 120px; align-self: flex-start; }
        .hiwi-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500; font-size: 12px;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: ${ORANGE}; margin: 0 0 20px;
        }
        .hiwi-h2 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 400; font-size: clamp(36px, 4vw, 56px);
          line-height: 1.05; letter-spacing: -0.02em;
          color: ${INK}; margin: 0 0 48px;
        }
        .hiwi-active-num {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 14px;
          letter-spacing: 0.16em; color: ${ORANGE}; margin: 0 0 16px;
        }
        .hiwi-active-title {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 400; font-size: 32px; line-height: 1.15;
          letter-spacing: -0.01em; color: ${INK}; margin: 0 0 16px;
        }
        .hiwi-active-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px; line-height: 1.65;
          color: rgba(26,43,53,0.65); margin: 0; max-width: 460px;
        }
        .hiwi-progress {
          margin-top: 48px; width: 220px; height: 2px;
          background: rgba(26,43,53,0.12); border-radius: 2px; overflow: hidden;
        }
        .hiwi-progress-fill {
          height: 100%; background: ${ORANGE};
          transition: width 0.5s ease;
        }

        /* Right column uses a sticky stage with explicit total height */
        .hiwi-right { position: relative; min-width: 0; }
        .hiwi-stage {
          position: relative;
          /* Total scroll: one viewport per step */
          height: calc(100vh * 4);
        }
        .hiwi-sticky-frame {
          position: sticky;
          top: 120px;
          width: 100%;
          aspect-ratio: 5 / 6;
          max-height: 620px;
          border-radius: 28px;
          overflow: hidden;
          background: ${INK};
          box-shadow: 0 40px 100px -30px rgba(26,43,53,0.45);
        }
        .hiwi-frame-grain {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at top right, rgba(232,87,26,0.12), transparent 55%),
            radial-gradient(ellipse at bottom left, rgba(255,255,255,0.05), transparent 60%);
          pointer-events: none;
        }

        .hiwi-card-layer {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 40px;
        }
        .hiwi-card-slot {
          position: absolute;
          opacity: 0;
          transform: translateX(60px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          width: min(100%, 360px);
        }
        .hiwi-card-slot.is-active {
          opacity: 1;
          transform: translateX(0);
        }

        /* Invisible spacers drive IntersectionObserver — 4 × 100vh in the stage */
        .hiwi-driver {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          pointer-events: none;
        }
        .hiwi-step-spacer { flex: 1 1 0; min-height: 0; }

        /* ---------- Mock cards ---------- */
        .mock-card {
          width: 100%;
          background: #102028;
          border: 1px solid rgba(250,247,242,0.08);
          border-radius: 20px;
          padding: 22px;
          color: ${CREAM};
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 24px 60px -20px rgba(0,0,0,0.5);
        }
        .mock-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 16px;
        }
        .mock-eyebrow {
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(250,247,242,0.55); font-weight: 500;
        }
        .mock-pill {
          font-size: 11px; padding: 4px 10px; border-radius: 999px;
          background: rgba(232,87,26,0.15); color: ${ORANGE};
          letter-spacing: 0.04em;
        }
        .mock-list { list-style: none; padding: 0; margin: 0 0 16px; display: flex; flex-direction: column; gap: 10px; }
        .mock-row {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 12px; border-radius: 10px;
          background: rgba(250,247,242,0.04);
          font-size: 14px;
        }
        .mock-row.is-done { color: ${CREAM}; }
        .mock-row:not(.is-done) { color: rgba(250,247,242,0.5); }
        .mock-check {
          width: 18px; height: 18px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(250,247,242,0.08); color: ${ORANGE};
          flex-shrink: 0;
        }
        .mock-row.is-done .mock-check { background: ${ORANGE}; color: ${INK}; }
        .mock-progress {
          height: 4px; background: rgba(250,247,242,0.08);
          border-radius: 4px; overflow: hidden;
        }
        .mock-progress > div { height: 100%; background: ${ORANGE}; }

        .mock-video-stage {
          position: relative; aspect-ratio: 4/3;
          background: linear-gradient(135deg, #1f3a48, #0c1a22);
          border-radius: 14px; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
        }
        .mock-live {
          position: absolute; top: 12px; left: 12px;
          font-size: 10px; letter-spacing: 0.18em; font-weight: 600;
          color: ${CREAM}; display: flex; align-items: center; gap: 6px;
          background: rgba(0,0,0,0.4); padding: 4px 8px; border-radius: 999px;
        }
        .mock-live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #ff3b3b;
          box-shadow: 0 0 0 0 rgba(255,59,59,0.6);
          animation: mockPulse 1.6s ease-out infinite;
        }
        @keyframes mockPulse {
          0% { box-shadow: 0 0 0 0 rgba(255,59,59,0.6); }
          100% { box-shadow: 0 0 0 8px rgba(255,59,59,0); }
        }
        .mock-avatar {
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, ${ORANGE}, #b53d0f);
          color: ${CREAM}; font-weight: 600; font-size: 22px;
          display: flex; align-items: center; justify-content: center;
          letter-spacing: 0.04em;
        }
        .mock-video-controls {
          position: absolute; bottom: 12px; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 8px;
        }
        .mock-video-controls span {
          width: 26px; height: 26px; border-radius: 50%;
          background: rgba(250,247,242,0.15);
        }
        .mock-video-controls .mock-ctl-end { background: #ff3b3b; }
        .mock-vm-title { font-weight: 600; font-size: 15px; }
        .mock-vm-sub { font-size: 12px; color: rgba(250,247,242,0.55); margin-top: 2px; }

        .mock-track {
          position: relative; display: flex; justify-content: space-between;
          margin: 8px 4px 20px; padding-bottom: 24px;
        }
        .mock-track-line {
          position: absolute; left: 6px; right: 6px; top: 6px; height: 2px;
          background: rgba(250,247,242,0.1); border-radius: 2px;
        }
        .mock-track-line > div { height: 100%; background: ${ORANGE}; border-radius: 2px; }
        .mock-track-step { position: relative; z-index: 1; text-align: center; flex: 1; }
        .mock-track-dot {
          width: 14px; height: 14px; border-radius: 50%;
          background: #102028;
          border: 2px solid rgba(250,247,242,0.2);
          margin: 0 auto 8px;
        }
        .mock-track-step.is-on .mock-track-dot {
          background: ${ORANGE}; border-color: ${ORANGE};
        }
        .mock-track-label {
          font-size: 11px; letter-spacing: 0.04em;
          color: rgba(250,247,242,0.55);
        }
        .mock-track-step.is-on .mock-track-label { color: ${CREAM}; }

        .mock-foot {
          display: flex; gap: 24px; padding-top: 12px;
          border-top: 1px solid rgba(250,247,242,0.06);
        }
        .mock-foot-k { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(250,247,242,0.45); }
        .mock-foot-v { font-size: 14px; font-weight: 600; margin-top: 4px; }

        .mock-ring-wrap {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          margin: 8px 0 16px;
        }
        .mock-ring-num {
          position: absolute;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 44px; font-weight: 400;
        }

        .hiwi-cta-wrap {
          display: flex; justify-content: center;
          padding: 60px 24px 40px;
        }
        .hiwi-cta {
          background: ${ORANGE}; color: ${CREAM};
          border: none; border-radius: 999px;
          padding: 18px 36px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 14px; letter-spacing: 0.04em;
          cursor: pointer; transition: transform 0.2s ease, background 0.2s ease;
        }
        .hiwi-cta:hover { transform: translateY(-2px); background: #ff6320; }

        @media (max-width: 860px) {
          .hiwi-wrap { padding: 80px 20px 40px; }
          .hiwi-grid { grid-template-columns: 1fr; gap: 32px; }
          .hiwi-sticky { position: static; }
          .hiwi-stage { height: auto; }
          .hiwi-sticky-frame { position: relative; top: auto; }
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

          {/* Right column: stage with sticky frame + driver spacers */}
          <div className="hiwi-right">
            <div className="hiwi-stage">
              <div className="hiwi-sticky-frame">
                <div className="hiwi-frame-grain" />
                <div className="hiwi-card-layer">
                  {steps.map((s, i) => (
                    <div
                      key={s.n}
                      className={`hiwi-card-slot ${i === active ? "is-active" : ""}`}
                      aria-hidden={i !== active}
                    >
                      <MockCard kind={s.kind} />
                    </div>
                  ))}
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
