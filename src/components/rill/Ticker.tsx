const row1Items = [
  "Energy decline", "Muscle recovery", "Sleep quality", "Body composition",
  "Skin collagen", "Hormonal balance", "Visceral fat", "Cognitive performance",
  "Immune resilience", "Libido", "Inflammation", "Cellular ageing",
];

const row2Items = [
  "Foundation.ME", "Opus.ME", "Radiance.ME", "Vital.ME",
  "Recovery.ME", "Shield.ME", "Lean.ME", "Peak.ME",
  "Focus.ME", "Repair.ME",
];

const Ticker = () => {
  const row1Text = row1Items.join("  ·  ") + "  ·  ";
  const row2Text = row2Items.join("  ·  ") + "  ·  ";

  return (
    <section
      style={{
        background: "#F7F4EF",
        padding: "40px 0",
        overflow: "hidden",
      }}
    >
      {/* Row 1 — scrolls left */}
      <div style={{ display: "flex", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div
          style={{
            display: "flex",
            animation: "ticker-scroll-left 40s linear infinite",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(26,43,53,0.5)",
                paddingRight: "2em",
                flexShrink: 0,
              }}
            >
              {row1Text}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div style={{ display: "flex", overflow: "hidden", whiteSpace: "nowrap", marginTop: "16px" }}>
        <div
          style={{
            display: "flex",
            animation: "ticker-scroll-right 35s linear infinite",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(26,43,53,0.5)",
                paddingRight: "2em",
                flexShrink: 0,
              }}
            >
              {row2Text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes ticker-scroll-right {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default Ticker;
