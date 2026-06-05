import { useQuiz } from "./quizContext";

const cardBase: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid rgba(26,43,53,0.08)",
  borderRadius: 20,
  overflow: "hidden",
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  boxShadow: "0 2px 16px rgba(0,0,43,0.06)",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 700,
  fontSize: 10,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "rgba(26,43,53,0.45)",
  marginBottom: 12,
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'Fraunces', serif",
  fontWeight: 700,
  color: "#0f0f0f",
  margin: 0,
  letterSpacing: "-0.01em",
};

const quoteStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 15,
  lineHeight: 1.7,
  color: "rgba(26,43,53,0.7)",
  marginTop: 16,
};

const sourceStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 10,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "rgba(26,43,53,0.5)",
  marginTop: 20,
};

const linkStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#E8571A",
  marginTop: 16,
};

const Science = () => {
  const { open } = useQuiz();

  return (
    <section
      style={{
        background: "#F7F4EF",
        padding: "120px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(26,43,53,0.45)",
              marginBottom: 16,
            }}
          >
            THE EVIDENCE
          </div>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              color: "#0f0f0f",
              fontSize: "clamp(36px, 4vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            The science exists.<br />
            <em style={{ fontStyle: "italic", color: "#E8571A" }}>We didn't invent it.</em>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              color: "rgba(26,43,53,0.7)",
              maxWidth: 640,
              marginTop: 20,
            }}
          >
            We've curated the most compelling evidence on peptide therapy, GH axis optimisation, and longevity medicine — so you can make an informed decision before you book.
          </p>
        </div>

        <div
          className="science-bento"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gridTemplateRows: "auto auto",
            gap: 24,
          }}
        >
          {/* Featured large card */}
          <a
            href="https://www.youtube.com/@hubermanlab"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bento-feature"
            style={{ ...cardBase, gridRow: "1 / span 2" }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 11",
                backgroundImage: "url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div style={{ padding: 32, display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={labelStyle}>PODCAST · HUBERMAN LAB</div>
              <h3 style={{ ...titleStyle, fontSize: "clamp(24px, 2.4vw, 32px)", lineHeight: 1.15 }}>
                The Science of Peptides &amp; Growth Hormone
              </h3>
              <p style={quoteStyle}>
                "GH-releasing peptides represent one of the most promising frontiers in evidence-based longevity medicine."
              </p>
              <div style={sourceStyle}>ANDREW HUBERMAN, PHD — STANFORD NEUROSCIENCE</div>
              <div style={linkStyle}>Watch on YouTube →</div>
            </div>
          </a>

          {/* Stacked right cards */}
          <a
            href="https://academic.oup.com/jcem"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card"
            style={cardBase}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div style={{ padding: 24 }}>
              <div style={labelStyle}>CLINICAL RESEARCH</div>
              <h3 style={{ ...titleStyle, fontSize: 20, lineHeight: 1.2 }}>
                GH Secretagogues &amp; Body Composition in Adults
              </h3>
              <p style={{ ...quoteStyle, fontSize: 14 }}>
                "Significant improvements in lean mass, fat reduction, and recovery markers were observed."
              </p>
              <div style={linkStyle}>View research →</div>
            </div>
          </a>

          <a
            href="https://peterattiamd.com/podcast/"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card"
            style={cardBase}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                backgroundImage: "url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div style={{ padding: 24 }}>
              <div style={labelStyle}>EDITORIAL · LONGEVITY</div>
              <h3 style={{ ...titleStyle, fontSize: 20, lineHeight: 1.2 }}>
                Peter Attia on the Future of Longevity Medicine
              </h3>
              <p style={{ ...quoteStyle, fontSize: 14 }}>
                "The interventions that will define the next decade work with the body's own signalling systems."
              </p>
              <div style={linkStyle}>Listen →</div>
            </div>
          </a>
        </div>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "rgba(26,43,53,0.5)",
            textAlign: "center",
            lineHeight: 1.7,
            maxWidth: 760,
            margin: "48px auto 0",
          }}
        >
          External references are provided for educational purposes only. Meora does not claim endorsement by any individual or publication cited. Individual results vary. All Meora patients are assessed by an AHPRA-registered Australian doctor before any protocol is prescribed.
        </p>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button
            onClick={open}
            style={{
              background: "#E8571A",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 999,
              padding: "18px 40px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Start your assessment →
          </button>
        </div>
      </div>

      <style>{`
        .bento-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }
        @media (max-width: 900px) {
          .science-bento {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .bento-feature { grid-row: auto !important; }
        }
      `}</style>
    </section>
  );
};

export default Science;
