import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";

const cards = [
  {
    tags: ["PODCAST", "HUBERMAN LAB"],
    title: "The Science of Peptides & Growth Hormone",
    quote: "GH-releasing peptides represent one of the most promising frontiers in evidence-based longevity medicine.",
    attribution: "ANDREW HUBERMAN, PHD — STANFORD NEUROSCIENCE",
    link: "Watch on YouTube →",
  },
  {
    tags: ["CLINICAL RESEARCH", "ENDOCRINOLOGY"],
    title: "GH Secretagogues & Body Composition in Adults",
    quote: "Significant improvements in lean mass, fat reduction, and recovery markers were observed in adults aged 35–65 following 12 weeks of GH axis support.",
    attribution: "JOURNAL OF CLINICAL ENDOCRINOLOGY, 2021",
    link: "View research →",
  },
  {
    tags: ["EDITORIAL", "LONGEVITY MEDICINE"],
    title: "Peter Attia on the Future of Longevity Medicine",
    quote: "The interventions that will define the next decade of medicine are the ones that work with the body's own signalling systems — not against them.",
    attribution: "PETER ATTIA MD — THE DRIVE PODCAST",
    link: "Listen →",
  },
];

const BG = "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80";

const ScienceCards = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const cardsRef = useStaggerAnimation<HTMLDivElement>(cards.length, 100);

  return (
    <section ref={sectionRef} className="scroll-animate" style={{ position: "relative", background: `url(${BG}) center/cover no-repeat`, padding: "120px 0", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,43,53,0.68) 0%, rgba(26,43,53,0.52) 100%)", zIndex: 0 }} />
      <div className="sci-wrap" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 80px" }}>
        <div style={{ marginBottom: 56 }}>
          <div className="scroll-animate" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>THE SCIENCE</div>
          <h2 className="scroll-animate delay-100" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#fff", fontSize: "clamp(36px,4vw,52px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
            The science exists.<br />
            <em style={{ fontStyle: "italic", color: "#FF5003" }}>We didn't invent it.</em>
          </h2>
          <p className="scroll-animate delay-200" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 520, marginTop: 16 }}>
            We've curated the most compelling evidence on peptide therapy, GH axis optimisation, and longevity medicine — so you can make an informed decision before you book.
          </p>
        </div>
        <div ref={cardsRef} className="sci-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {cards.map((c, i) => (
            <div key={i} className="sci-card card-hover" style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 16,
              padding: 28,
            }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {c.tags.map((t) => (
                  <span key={t} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 999, padding: "3px 10px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: "0.1em", color: "#fff" }}>{t}</span>
                ))}
              </div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 18, color: "#fff", marginTop: 12, marginBottom: 0, lineHeight: 1.3 }}>{c.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontStyle: "italic", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginTop: 10, marginBottom: 0 }}>{c.quote}</p>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", color: "#FF5003", marginTop: 12 }}>{c.attribution}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 20 }}>{c.link}</div>
            </div>
          ))}
        </div>
        <p className="scroll-animate" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 11, color: "rgba(255,255,255,0.3)", maxWidth: 600, margin: "48px auto 0", lineHeight: 1.6, textAlign: "center" }}>
          External references are provided for educational purposes only. Meora does not claim endorsement by any individual or publication cited. Individual results vary. All Meora patients are assessed by an AHPRA-registered Australian doctor before any protocol is prescribed.
        </p>
        <div className="scroll-animate delay-100" style={{ textAlign: "center", marginTop: 24 }}>
          <button style={{ background: "#FF5003", color: "#fff", border: "none", borderRadius: 999, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, padding: "14px 36px", cursor: "pointer" }}>
            START YOUR ASSESSMENT →
          </button>
        </div>
      </div>
      <style>{`
        .sci-card:hover { background: rgba(255,255,255,0.14) !important; }
        @media (max-width: 900px) {
          .sci-grid { grid-template-columns: 1fr !important; }
          .sci-wrap { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default ScienceCards;
