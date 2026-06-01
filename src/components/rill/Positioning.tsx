const signals = [
  { title: "AHPRA-Registered GPs", desc: "Every protocol supervised by a licensed Australian doctor." },
  { title: "Registered Compounding Pharmacies", desc: "Prescribed and dispensed to the highest Australian standards." },
  { title: "Evidence-informed protocols", desc: "Built on peer-reviewed research, not trends." },
];

const Positioning = () => (
  <section style={{ background: "#F7F4EF", padding: "120px 0" }}>
    <div className="meora-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 80px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 80, alignItems: "center" }}>
      <div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,43,53,0.4)", marginBottom: 20 }}>
          WHAT WE DO
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#1A2B35", fontSize: "clamp(40px,5vw,64px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          We don't treat illness.<br />
          <em style={{ fontStyle: "italic", color: "#FF5003" }}>We optimise life.</em>
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.75, color: "rgba(26,43,53,0.6)", maxWidth: 480, marginTop: 28 }}>
          Meora is a personalised longevity clinic. GP-supervised peptide therapy protocols, designed around your biology, your goals, and your life.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {signals.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(26,43,53,0.12)", flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#1A2B35", marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(26,43,53,0.55)", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      @media (max-width: 900px) {
        .meora-container { grid-template-columns: 1fr !important; gap: 48px !important; padding: 0 24px !important; }
      }
    `}</style>
  </section>
);

export default Positioning;
