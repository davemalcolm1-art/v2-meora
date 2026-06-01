import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const pills = [
  "✓ AHPRA-Registered GPs",
  "✓ Registered Compounding Pharmacies",
  "✓ Evidence-informed Protocols",
];

const Positioning = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section ref={sectionRef} className="scroll-animate" style={{ background: "#F7F4EF", padding: "120px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div className="scroll-animate" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,43,53,0.4)", marginBottom: 16 }}>
          WHAT WE DO
        </div>
        <h2 className="scroll-animate delay-100" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(36px,5vw,64px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
          <span style={{ color: "#1A2B35", display: "block" }}>Personalised.</span>
          <span style={{ color: "#1A2B35", display: "block" }}>Evidence-informed.</span>
          <em style={{ fontStyle: "italic", color: "#FF5003", display: "block" }}>Designed around you.</em>
        </h2>
        <p className="scroll-animate delay-200" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "rgba(26,43,53,0.55)", lineHeight: 1.75, maxWidth: 560, margin: "24px auto 0" }}>
          Meora is a GP-supervised longevity clinic. Our compounding peptide protocols are built on peer-reviewed research and tailored to your biology, your goals, and your life.
        </p>
        <div className="scroll-animate delay-300" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 36 }}>
          {pills.map((p) => (
            <span key={p} style={{ background: "rgba(26,43,53,0.06)", border: "1px solid rgba(26,43,53,0.1)", borderRadius: 999, padding: "8px 20px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#1A2B35", display: "inline-flex", alignItems: "center", gap: 8 }}>{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Positioning;
