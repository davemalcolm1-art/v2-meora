const steps = [
  { n: 1, title: "Start your assessment", desc: "Complete a short health questionnaire. Tell us your goals, health history, and what you want to achieve.", note: "Takes 5 minutes. No commitment." },
  { n: 2, title: "Complete your blood panel", desc: "We direct you to a private pathology clinic with the exact panel matched to your chosen protocol.", note: "ACL or Sonic Healthcare. Results within 48hrs." },
  { n: 3, title: "Telehealth consultation", desc: "An AHPRA-registered doctor reviews your results and conducts a thorough clinical assessment via telehealth.", note: "15–20 minute video consultation." },
  { n: 4, title: "Prescription & delivery", desc: "If approved, your prescription is issued and your protocol is compounded and cold-chain delivered to your door.", note: "registered compounding pharmacy. Discreet packaging." },
  { n: 5, title: "Quarterly review", desc: "Every 90 days, repeat bloods and a follow-up consultation. Your protocol is adjusted as you progress.", note: "This is the difference. Ongoing clinical care." },
];

const HowItWorks = () => (
  <section className="how-section" id="how">
    <div className="section-eyebrow reveal">
      <div className="section-eyebrow-line"></div>
      <span>How It Works</span>
    </div>
    <h2 className="section-h2 reveal reveal-delay-1">Five steps to<br /><em>a new standard.</em></h2>
    <p className="how-reassurance reveal reveal-delay-2">Most patients complete the full process in under two weeks — from first visit to protocol delivered.</p>

    <div className="how-steps">
      {steps.map((s, i) => (
        <div className={`how-step reveal ${i > 0 ? `reveal-delay-${i}` : ""}`} key={s.n}>
          <div className="step-num">{s.n}<span className="step-superscript">º</span></div>
          <div className="step-title">{s.title}</div>
          <div className="step-desc">{s.desc}</div>
          <div className="step-note">{s.note}</div>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
