const ContrastInterstitial = () => {
  return (
    <section
      className="contrast-interstitial"
      style={{
        background: "linear-gradient(135deg, #1A2B35 0%, #243B47 50%, #1A2B35 100%)",
        padding: "100px 80px",
        position: "relative",
        overflow: "hidden",
        margin: "0 40px",
        borderRadius: 24,
      }}
    >
      {/* Radial spotlight */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 30% 50%, rgba(232,87,26,0.15) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
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
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#E8571A",
            marginBottom: 20,
          }}
        >
          BUILT FOR REAL LIFE
        </div>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            color: "#FFFFFF",
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Energy for today.
          <br />
          Health for tomorrow.
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 480,
            marginTop: 16,
          }}
        >
          Meora combines modern medicine with simplified routines so you can
          perform at your best, every day.
        </p>
      </div>
      <style>{`
        .contrast-interstitial h2,
        .contrast-interstitial h2 * { color: #FFFFFF !important; }
        .contrast-interstitial p { color: rgba(255,255,255,0.65) !important; }
        @media (max-width: 768px) {
          .contrast-interstitial { padding: 60px 24px !important; margin: 0 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default ContrastInterstitial;
