import { useQuiz } from "./quizContext";

const steps = [
  {
    n: "01",
    title: "Complete your assessment",
    desc: "Tell us about your health, goals and lifestyle. Takes around five minutes.",
  },
  {
    n: "02",
    title: "Meet your GP",
    desc: "A real telehealth consultation with an AHPRA-registered Australian doctor who reviews your goals and recommends a protocol.",
  },
  {
    n: "03",
    title: "Your protocol, delivered",
    desc: "Compounded at a registered Australian pharmacy and shipped directly to your door. Ongoing GP review included.",
  },
];

export default function HowItWorksIntro() {
  const { open: openQuiz } = useQuiz();

  return (
    <section style={{ background: "#F5F0E8", padding: "100px 0", width: "100%" }}>
      <style>{`
        .hiwi-label {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #E8572A;
          text-align: center;
          margin: 0 0 18px;
        }
        .hiwi-h2 {
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-style: normal;
          font-size: 48px;
          line-height: 1.1;
          color: #1a1a1a;
          text-align: center;
          max-width: 600px;
          margin: 0 auto 64px;
        }
        .hiwi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 48px;
        }
        .hiwi-card {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 20px;
          padding: 40px;
        }
        .hiwi-num {
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.1em;
          color: #E8572A;
          margin: 0 0 16px;
        }
        .hiwi-title {
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-style: normal;
          font-size: 24px;
          color: #1a1a1a;
          margin: 0 0 12px;
          line-height: 1.2;
        }
        .hiwi-body {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(10,10,10,0.6);
          margin: 0;
        }
        .hiwi-cta-wrap {
          display: flex;
          justify-content: center;
          margin-top: 56px;
        }
        .hiwi-cta {
          background: #E8572A;
          color: #F5F0E8;
          border: none;
          border-radius: 999px;
          padding: 16px 32px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .hiwi-cta:hover { transform: translateY(-2px); background: #ff6320; }

        @media (max-width: 860px) {
          .hiwi-grid { grid-template-columns: 1fr; padding: 0 24px; }
          .hiwi-h2 { font-size: 36px; }
        }
      `}</style>

      <p className="hiwi-label">HOW IT WORKS</p>
      <h2 className="hiwi-h2">From first question to first protocol.</h2>

      <div className="hiwi-grid">
        {steps.map((s) => (
          <div key={s.n} className="hiwi-card">
            <div className="hiwi-num">{s.n}</div>
            <h3 className="hiwi-title">{s.title}</h3>
            <p className="hiwi-body">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="hiwi-cta-wrap">
        <button className="hiwi-cta" onClick={openQuiz}>
          Start your assessment →
        </button>
      </div>
    </section>
  );
}
