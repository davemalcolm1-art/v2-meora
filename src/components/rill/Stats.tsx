import { Fragment } from "react";

const stats = [
  { num: "90%", label: "OF AUSTRALIANS WANT TO LIVE HEALTHIER, NOT JUST LONGER", source: "(Australian Institute of Health and Welfare)" },
  { num: "87%", label: "OF CHRONIC DISEASE BURDEN IS DRIVEN BY PREVENTABLE LIFESTYLE FACTORS", source: "(AIHW Burden of Disease Study)" },
  { num: "1 IN 2", label: "AUSTRALIANS WILL DEVELOP A CHRONIC CONDITION BY AGE 45", source: "(Australian Bureau of Statistics)" },
];

const Stats = () => (
  <section style={{ background: "#F7F4EF", padding: "120px 0" }}>
    <div className="stats-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 80px" }}>
      <div style={{ marginBottom: 64, maxWidth: 720 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,43,53,0.4)", marginBottom: 20 }}>THE OPPORTUNITY</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#1A2B35", fontSize: "clamp(36px,4vw,52px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
          More years ahead.<br />
          <em style={{ fontStyle: "italic", color: "#FF5003" }}>Make them count.</em>
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.75, color: "rgba(26,43,53,0.6)", marginTop: 16 }}>
          The science of longevity has never been more advanced. The question is whether you're paying attention to it.
        </p>
      </div>
      <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr", gap: 48, alignItems: "start" }}>
        {stats.map((s, i) => (
          <Fragment key={i}>
            {i > 0 && <div style={{ width: 1, height: 120, background: "rgba(26,43,53,0.1)", justifySelf: "center" }} />}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(48px,6vw,72px)", color: "#1A2B35", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", color: "rgba(26,43,53,0.5)", textTransform: "uppercase", marginTop: 16, maxWidth: 220, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>{s.label}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(26,43,53,0.3)", marginTop: 8 }}>{s.source}</div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
    <style>{`
      @media (max-width: 900px) {
        .stats-row { grid-template-columns: 1fr !important; gap: 48px !important; }
        .stats-row > div[style*="width: 1px"] { display: none !important; }
        .stats-wrap { padding: 0 24px !important; }
      }
    `}</style>
  </section>
);

export default Stats;
