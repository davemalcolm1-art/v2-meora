import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const pills = [
  "✓  AHPRA-Registered GPs",
  "✓  Registered Compounding Pharmacies",
  "✓  Evidence-informed Protocols",
];

const Positioning = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section ref={sectionRef} className="scroll-animate" style={{ background: "radial-gradient(ellipse at 50% 0%, #FFFFFF 0%, #F7F4EF 50%, #EDE8E0 100%)", padding: "100px 0 90px", width: "auto", textAlign: "center", margin: "24px", borderRadius: 32, overflow: "hidden" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 48px" }}>
        <div className="scroll-animate" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,43,53,0.38)", marginBottom: 20 }}>
          WHAT WE DO
        </div>
        <h2 className="scroll-animate delay-100" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(38px,5.5vw,68px)", lineHeight: 1.02, letterSpacing: "-0.025em", color: "#1A2B35", margin: 0 }}>
          <span style={{ display: "block" }}>Personalised.</span>
          <span style={{ display: "block" }}>Evidence-informed.</span>
          <span style={{ display: "block" }}>Designed around you.</span>
        </h2>
        <p className="scroll-animate delay-200" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 18, color: "rgba(26,43,53,0.52)", lineHeight: 1.78, maxWidth: 500, margin: "24px auto 0" }}>
          Meora is a GP-supervised longevity clinic. Our compounding peptide protocols are built on peer-reviewed research and tailored to your biology, your goals, and your life.
        </p>
        <div className="scroll-animate delay-300" style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: 32 }}>
          {pills.map((p) => (
            <span key={p} style={{ background: "rgba(26,43,53,0.06)", border: "1px solid rgba(26,43,53,0.1)", borderRadius: 999, padding: "9px 20px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#1A2B35" }}>{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Positioning;
