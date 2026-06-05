const items = [
  { label: "AHPRA Registered GPs", mobile: true },
  { label: "Registered Compounding Pharmacy", mobile: false },
  { label: "Australian Telehealth", mobile: true },
  { label: "GP Consultation Included", mobile: true },
  { label: "Script Delivered to Your Door", mobile: false },
];

const TrustStrip = () => {
  return (
    <div
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.03)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        height: 64,
      }}
    >
      <style>{`
        .ts-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: rgba(245,240,232,0.55);
          letter-spacing: 0.05em;
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
            padding: 16px 24px;
            flex-wrap: wrap;
            gap: 16px !important;
          }
          .ts-item--hide-mobile { display: none !important; }
        }
      `}</style>
      {items.map((item) => (
        <span
          key={item.label}
          className={`ts-item ${item.mobile ? "" : "ts-item--hide-mobile"}`}
        >
          <span className="ts-icon">&#10022;</span>
          <span>{item.label}</span>
        </span>
      ))}
    </div>
  );
};

export default TrustStrip;
