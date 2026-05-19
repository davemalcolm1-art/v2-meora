const stats = [
  { large: "AHPRA", label: "REGISTERED DOCTORS", note: "Every consultation. No exceptions." },
  { large: "Registered", label: "COMPOUNDING PHARMACY", note: "Every prescription. Every compound." },
  { large: "Zero", label: "GREY MARKET TOLERANCE", note: "We don't cut corners. Neither should your clinic." },
];

const WhatIsRill = () => (
  <div id="about">
    <section className="what-section-redesign">
      <div className="what-headline">
        <h2 className="what-headline-1">The grey market is loud.</h2>
        <h2 className="what-headline-2">We're not interested.</h2>
        <p className="what-headline-sub">
          Meora operates within the Australian regulatory framework. Full stop.
        </p>
      </div>

      <div className="what-stats what-stats-redesign">
        {stats.map((s, i) => (
          <div className={`what-stat reveal ${i > 0 ? `reveal-delay-${i}` : ""}`} key={i}>
            <div className="what-stat-num">{s.large}</div>
            <div className="what-stat-label">{s.label}</div>
            <div className="what-stat-note">{s.note}</div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default WhatIsRill;
