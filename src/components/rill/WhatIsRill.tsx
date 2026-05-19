const stats = [
  { stat: "30+", label: "AGE WHEN GH AXIS DECLINE BEGINS", note: "Source: established endocrinology" },
  { stat: "AHPRA", label: "REGISTERED PRACTITIONERS — EVERY TIME", note: "No exceptions. No workarounds." },
  { stat: "TGA", label: "LICENSED COMPOUNDING PHARMACY", note: "Every prescription. Every compound." },
];

const pillars = [
  { num: "01", title: "Medical-grade peptides", body: "Compounded by TGA-licensed pharmacies, prescribed by licensed clinicians, tested for purity and potency." },
  { num: "02", title: "Clinical guidance", body: "Physician-designed protocols, continuously optimised to support your changing goals." },
  { num: "03", title: "Ongoing monitoring", body: "Quarterly blood panels and doctor review — not a one-time prescription, a continuous clinical relationship." },
];

import MaskSection from "./MaskSection";

const WhatIsRill = () => (
  <div id="about">
    <section className="what-section-dark">
      <div className="what-statement reveal">
        <h2 className="what-line-1">Most people accept&nbsp;less.</h2>
        <div className="what-line-2">We don't.</div>
        <div className="what-line-3">It starts with you.</div>
      </div>
    </section>

    <MaskSection />

    <section className="what-section-light">
      <div className="what-stats">
        {stats.map((s, i) => (
          <div className={`what-stat reveal ${i > 0 ? `reveal-delay-${i}` : ""}`} key={i}>
            <div className="what-stat-num">{s.stat}</div>
            <div className="what-stat-label">{s.label}</div>
            <div className="what-stat-note">{s.note}</div>
          </div>
        ))}
      </div>

      <div className="what-pillars-row">
        {pillars.map((p, i) => (
          <div className={`what-pillar reveal ${i > 0 ? `reveal-delay-${i}` : ""}`} key={p.num}>
            <div className="what-pillar-num">{p.num}</div>
            <div className="what-pillar-title">{p.title}</div>
            <div className="what-pillar-body">{p.body}</div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default WhatIsRill;
