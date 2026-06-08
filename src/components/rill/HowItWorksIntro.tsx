import { useEffect, useRef, useState } from "react";
import { useQuiz } from "./quizContext";

const CREAM = "#FAF7F2";
const INK = "#1A2B35";
const ORANGE = "#E8571A";

type CardKind =
  | "assessChecklist"
  | "assessGoals"
  | "telehealth"
  | "labs"
  | "shipping"
  | "whatsInside"
  | "vitality"
  | "biomarker";

const steps: { n: string; title: string; desc: string; cards: [CardKind, CardKind] }[] = [
  {
    n: "01",
    title: "Complete your assessment",
    desc: "A quick, five-minute health assessment about your goals, history, and lifestyle.",
    cards: ["assessChecklist", "assessGoals"],
  },
  {
    n: "02",
    title: "Your personalised plan",
    desc: "Meet your AHPRA-registered doctor in a real-time telehealth consult. They review everything and design a longevity protocol built around you.",
    cards: ["telehealth", "labs"],
  },
  {
    n: "03",
    title: "Delivered to your door",
    desc: "Compounded at a registered Australian pharmacy and shipped cold-chain, straight to you.",
    cards: ["shipping", "whatsInside"],
  },
  {
    n: "04",
    title: "Ongoing review",
    desc: "Quarterly check-ins and continuous adjustment as your goals and biology evolve.",
    cards: ["vitality", "biomarker"],
  },
];

/* ---------------- Card components ---------------- */

function AssessChecklist() {
  const items = ["Goals", "History", "Lifestyle"];
  return (
    <div className="mock-card">
      <div className="mock-head">
        <span className="mock-eyebrow">Health assessment</span>
        <span className="mock-pill">5 MIN</span>
      </div>
      <ul className="mock-list">
        {items.map((t) => (
          <li key={t} className="mock-row is-done">
            <span className="mock-check" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg>
            </span>
            <span className="mock-row-text">{t}</span>
          </li>
        ))}
      </ul>
      <div className="mock-progress"><div style={{ width: "100%" }} /></div>
    </div>
  );
}

function AssessGoals() {
  const chips = [
    { t: "Energy", on: false },
    { t: "Recovery", on: true },
    { t: "Longevity", on: false },
  ];
  return (
    <div className="mock-card">
      <div className="mock-head">
        <span className="mock-eyebrow">Your goals</span>
        <span className="mock-pill">Step 2</span>
      </div>
      <div className="mock-chips">
        {chips.map((c) => (
          <span key={c.t} className={`mock-chip ${c.on ? "is-on" : ""}`}>{c.t}</span>
        ))}
      </div>
      <p className="mock-note">Choose what matters most to you.</p>
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

function LabsCard() {
  return (
    <div className="mock-card">
      <div className="mock-head">
        <span className="mock-eyebrow">Testosterone</span>
        <span className="mock-pill">Optimal</span>
      </div>
      <div className="mock-bignum">
        642 <span className="mock-bignum-u">ng/dL</span>
      </div>
      <svg viewBox="0 0 200 60" className="mock-graph" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={ORANGE}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="0,48 28,42 56,44 84,34 112,28 140,22 168,14 200,8"
        />
        <polyline
          fill="none"
          stroke="rgba(232,87,26,0.18)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="0,48 28,42 56,44 84,34 112,28 140,22 168,14 200,8"
        />
      </svg>
      <div className="mock-foot">
        <div><div className="mock-foot-k">Range</div><div className="mock-foot-v">300–900</div></div>
        <div><div className="mock-foot-k">Trend</div><div className="mock-foot-v">↑ Rising</div></div>
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
        <div><div className="mock-foot-k">ETA</div><div className="mock-foot-v">Tue, 2:30pm</div></div>
        <div><div className="mock-foot-k">Cold-chain</div><div className="mock-foot-v">2–8°C</div></div>
      </div>
    </div>
  );
}

function WhatsInsideCard() {
  return (
    <div className="mock-card">
      <div className="mock-head">
        <span className="mock-eyebrow">What's inside</span>
        <span className="mock-pill">Rx</span>
      </div>
      <div className="mock-kv">
        <div className="mock-kv-k">Protocol</div>
        <div className="mock-kv-v">Longevity · Recovery</div>
      </div>
      <div className="mock-kv">
        <div className="mock-kv-k">Dosage</div>
        <div className="mock-kv-v">0.25mg · weekly</div>
      </div>
      <div className="mock-tag">Compounded in Australia</div>
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
        <span className="mock-pill">+4 this month</span>
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
    </div>
  );
}

function BiomarkerCard() {
  return (
    <div className="mock-card">
      <div className="mock-head">
        <span className="mock-eyebrow">Biomarker trend</span>
        <span className="mock-pill">Reviewed quarterly</span>
      </div>
      <svg viewBox="0 0 200 80" className="mock-graph" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={ORANGE}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="0,64 25,58 50,52 75,46 100,36 125,30 150,22 175,16 200,10"
        />
        <g fill={ORANGE}>
          {[[0,64],[50,52],[100,36],[150,22],[200,10]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="2.5" />
          ))}
        </g>
      </svg>
      <div className="mock-foot">
        <div><div className="mock-foot-k">Q1</div><div className="mock-foot-v">Baseline</div></div>
        <div><div className="mock-foot-k">Q2</div><div className="mock-foot-v">↑ Improved</div></div>
      </div>
    </div>
  );
}

function MockCard({ kind }: { kind: CardKind }) {
  switch (kind) {
    case "assessChecklist": return <AssessChecklist />;
    case "assessGoals": return <AssessGoals />;
    case "telehealth": return <TelehealthCard />;
    case "labs": return <LabsCard />;
    case "shipping": return <ShippingCard />;
    case "whatsInside": return <WhatsInsideCard />;
    case "vitality": return <VitalityCard />;
    case "biomarker": return <BiomarkerCard />;
  }
}

/* ---------------- Section ---------------- */

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

        .hiwi-right { position: relative; min-width: 0; }
        .hiwi-stage { position: relative; height: calc(100vh * 4); }
        .hiwi-sticky-frame {
          position: sticky;
          top: 120px;
          width: 100%;
          aspect-ratio: 5 / 6;
          max-height: 620px;
          border-radius: 28px;
          overflow: hidden;
          background: radial-gradient(ellipse 100% 90% at 50% 30%, #243845 0%, #16252E 100%);
          box-shadow: 0 40px 100px -30px rgba(26,43,53,0.45);
        }
        .hiwi-frame-grain {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at top right, rgba(232,87,26,0.12), transparent 55%),
            radial-gradient(ellipse at bottom left, rgba(255,255,255,0.05), transparent 60%);
          pointer-events: none;
        }

        /* Conveyor card layer */
        .hiwi-card-layer {
          position: absolute; inset: 0;
          overflow: hidden;
        }
        .hiwi-card-slot {
          position: absolute;
          top: 50%; left: 50%;
          width: min(calc(100% - 64px), 320px);
          aspect-ratio: 5 / 6;
          transform: translate(-50%, -50%);
          opacity: 0;
          will-change: transform, opacity;
          animation: hiwi-conveyor 5.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        @keyframes hiwi-conveyor {
          0%   { transform: translate(calc(-50% + 140%), -50%); opacity: 0; }
          12%  { transform: translate(-50%, -50%); opacity: 1; }
          50%  { transform: translate(-50%, -50%); opacity: 1; }
          62%  { transform: translate(calc(-50% - 140%), -50%); opacity: 0; }
          100% { transform: translate(calc(-50% - 140%), -50%); opacity: 0; }
        }

        /* ---------- Mock cards ---------- */
        .mock-card {
          width: 100%;
          height: 100%;
          aspect-ratio: 5 / 6;
          background: #102028;
          border: 1px solid rgba(250,247,242,0.08);
          border-radius: 20px;
          padding: 22px;
          color: ${CREAM};
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 24px 60px -20px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .mock-card > :last-child { margin-bottom: 0; }
        .mock-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 16px; gap: 12px;
        }
        .mock-eyebrow {
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(250,247,242,0.55); font-weight: 500;
        }
        .mock-pill {
          font-size: 11px; padding: 4px 10px; border-radius: 999px;
          background: rgba(232,87,26,0.15); color: ${ORANGE};
          letter-spacing: 0.04em; white-space: nowrap;
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

        .mock-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .mock-chip {
          padding: 8px 14px; border-radius: 999px;
          background: rgba(250,247,242,0.06);
          color: rgba(250,247,242,0.7);
          font-size: 13px; font-weight: 500;
          border: 1px solid rgba(250,247,242,0.08);
        }
        .mock-chip.is-on {
          background: ${ORANGE}; color: ${INK}; border-color: ${ORANGE};
        }
        .mock-note {
          font-size: 12px; color: rgba(250,247,242,0.45); margin: 0;
        }

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

        .mock-bignum {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 44px; font-weight: 400; line-height: 1;
          margin: 6px 0 12px;
        }
        .mock-bignum-u {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; color: rgba(250,247,242,0.55);
          font-weight: 500; margin-left: 6px;
        }
        .mock-graph {
          width: 100%; height: 60px; display: block; margin-bottom: 14px;
        }

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

        .mock-kv {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 10px 0;
          border-bottom: 1px solid rgba(250,247,242,0.06);
        }
        .mock-kv:last-of-type { border-bottom: none; margin-bottom: 12px; }
        .mock-kv-k { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(250,247,242,0.5); }
        .mock-kv-v { font-size: 14px; font-weight: 600; color: ${CREAM}; }
        .mock-tag {
          display: inline-block; margin-top: 4px;
          font-size: 11px; letter-spacing: 0.08em;
          padding: 6px 12px; border-radius: 999px;
          background: rgba(232,87,26,0.12); color: ${ORANGE};
          border: 1px solid rgba(232,87,26,0.25);
        }

        .mock-ring-wrap {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          margin: 8px 0 8px;
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

          {/* Right column */}
          <div className="hiwi-right">
            <div className="hiwi-stage">
              <div className="hiwi-sticky-frame">
                <div className="hiwi-frame-grain" />
                <div className="hiwi-card-layer" key={`cards-${active}`}>
                  {steps[active].cards.map((kind, i) => (
                    <div
                      key={`${active}-${i}`}
                      className="hiwi-card-slot"
                      style={{ animationDelay: `${i * 2.7}s` }}
                    >
                      <MockCard kind={kind} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="hiwi-driver" aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", pointerEvents: "none" }}>
                {steps.map((s, i) => (
                  <div
                    key={s.n}
                    ref={(el) => (stepRefs.current[i] = el)}
                    data-index={i}
                    style={{ flex: "1 1 0", minHeight: 0 }}
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
