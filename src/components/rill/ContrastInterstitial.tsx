const ContrastInterstitial = () => {
  return (
    <section
      className="contrast-interstitial"
      style={{
        background: "#F7F4EF",
        padding: "120px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(26,43,53,0.45)",
            marginBottom: 20,
          }}
        >
          BUILT FOR REAL LIFE
        </div>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            color: "#1A2B35",
            fontSize: "clamp(36px, 4vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Energy for today.
          <br />
          <em style={{ fontStyle: "italic", color: "#E8571A" }}>Health for tomorrow.</em>
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 1.7,
            color: "rgba(26,43,53,0.7)",
            maxWidth: 560,
            marginTop: 24,
          }}
        >
          Meora combines modern medicine with simplified routines so you can
          perform at your best, every day.
        </p>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .contrast-interstitial { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default ContrastInterstitial;
