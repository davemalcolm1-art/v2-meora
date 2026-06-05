const items = [
  { label: "AHPRA Registered GPs", mobile: true },
  { label: "Registered Compounding Pharmacy", mobile: false },
  { label: "Australian Telehealth", mobile: true },
  { label: "GP Consultation Included", mobile: true },
  { label: "Script Delivered to Your Door", mobile: false },
];

const TrustStrip = () => {
  // Duplicate the list so the marquee loops seamlessly
  const loop = [...items, ...items];

  return (
    <div
      style={{
        width: "100%",
        background: "#111111",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        height: 64,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
      className="trust-strip-root"
    >
      <style>{`
        @keyframes ts-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ts-track {
          display: flex;
          align-items: center;
          gap: 48px;
          padding-left: 48px;
          width: max-content;
          animation: ts-marquee 45s linear infinite;
          will-change: transform;
        }
        .trust-strip-root:hover .ts-track {
          animation-play-state: paused;
        }
        .ts-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 12px;
          color: rgba(245,240,232,0.75);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .ts-icon {
          color: #E8572A;
          font-size: 10px;
          line-height: 1;
        }
        @media (max-width: 768px) {
          .trust-strip-root {
            height: auto !important;
            padding: 14px 0;
          }
          .ts-track {
            gap: 28px;
            padding-left: 28px;
            animation-duration: 30s;
          }
          .ts-item--hide-mobile { display: none !important; }
        }
      `}</style>
      <div className="ts-track">
        {loop.map((item, i) => (
          <span
            key={`${item.label}-${i}`}
            className={`ts-item ${item.mobile ? "" : "ts-item--hide-mobile"}`}
          >
            <span className="ts-icon">&#10022;</span>
            <span>{item.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrustStrip;
