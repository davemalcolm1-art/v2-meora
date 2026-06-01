const cards = [
  { tag: "PEPTIDE THERAPY", title: "The clinical evidence for BPC-157 in tissue repair", excerpt: "A review of peer-reviewed literature on BPC-157 and its role in musculoskeletal recovery." },
  { tag: "LONGEVITY", title: "GHK-Cu and the science of skin regeneration", excerpt: "How copper peptides influence collagen synthesis and cellular repair mechanisms." },
  { tag: "HORMONES", title: "Growth hormone secretagogues: what the research says", excerpt: "An evidence-based overview of CJC-1295, Ipamorelin and their clinical applications." },
];

const ScienceCards = () => (
  <section style={{ background: "#F7F4EF", padding: "120px 0" }}>
    <div className="sci-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 80px" }}>
      <div style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,43,53,0.4)", marginBottom: 20 }}>THE SCIENCE</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#1A2B35", fontSize: "clamp(36px,4vw,52px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
          The research exists. <em style={{ fontStyle: "italic", color: "#FF5003" }}>We didn't invent it.</em>
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.75, color: "rgba(26,43,53,0.6)", maxWidth: 720, marginTop: 16 }}>
          Meora protocols are informed by peer-reviewed research and clinical evidence. We translate the science into supervised, personalised care.
        </p>
      </div>
      <div className="sci-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {cards.map((c, i) => (
          <div key={i} style={{
            background: "#fff",
            border: "1px solid rgba(26,43,53,0.08)",
            borderRadius: 20,
            padding: 32,
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          }}>
            <div style={{ height: 160, background: "rgba(26,43,53,0.06)", borderRadius: 12, marginBottom: 20 }} />
            <span style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: "0.12em", background: "rgba(26,43,53,0.06)", borderRadius: 999, padding: "4px 12px", color: "rgba(26,43,53,0.5)", textTransform: "uppercase" }}>{c.tag}</span>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 18, color: "#1A2B35", marginTop: 12, marginBottom: 0, lineHeight: 1.3 }}>{c.title}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(26,43,53,0.55)", lineHeight: 1.6, marginTop: 8, marginBottom: 0 }}>{c.excerpt}</p>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: "#FF5003", marginTop: 16, letterSpacing: "0.04em" }}>Read more →</div>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      @media (max-width: 900px) {
        .sci-grid { grid-template-columns: 1fr !important; }
        .sci-wrap { padding: 0 24px !important; }
      }
    `}</style>
  </section>
);

export default ScienceCards;
