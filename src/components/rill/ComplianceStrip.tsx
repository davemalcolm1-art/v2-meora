const items = [
  {
    label: "AHPRA REGISTERED",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5003" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
        <path d="M12 8v6M9 11h6" />
      </svg>
    ),
  },
  {
    label: "DOCTOR PRESCRIBED",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5003" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h9l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M8 8h6M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    label: "REGISTERED COMPOUNDING PHARMACY",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5003" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6v4l4 10a3 3 0 0 1-3 4H8a3 3 0 0 1-3-4l4-10V3z" />
        <path d="M9 7h6M7 15h10" />
      </svg>
    ),
  },
  {
    label: "AUSTRALIAN MADE",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5003" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13c2-1 3-3 5-3s3 2 5 2 3-3 5-3 2 1 3 2v5c0 1-1 2-2 2H5a2 2 0 0 1-2-2v-3z" />
        <circle cx="17" cy="6" r="1.5" />
      </svg>
    ),
  },
];

const ComplianceStrip = () => (
  <section
    className="compliance-strip"
    style={{
      background: "#FFFFFF",
      borderTop: "1px solid #E8E2D9",
      padding: "40px 80px",
    }}
  >
    <div
      className="comp-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 24,
        maxWidth: 1320,
        margin: "0 auto",
      }}
    >
      {items.map((it) => (
        <div
          key={it.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div style={{ flexShrink: 0 }}>{it.icon}</div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#111827",
            }}
          >
            {it.label}
          </div>
        </div>
      ))}
    </div>
    <style>{`
      @media (max-width: 768px) {
        .compliance-strip { padding: 32px 24px !important; }
        .comp-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
      }
    `}</style>
  </section>
);

export default ComplianceStrip;
