const items = [
  {
    label: "AHPRA REGISTERED",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF5003" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "DOCTOR PRESCRIBED",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF5003" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h9l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M8 8h6M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    label: "REGISTERED COMPOUNDING PHARMACY",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF5003" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6v4l4 10a3 3 0 0 1-3 4H8a3 3 0 0 1-3-4l4-10V3z" />
        <path d="M9 7h6M7 15h10" />
      </svg>
    ),
  },
  {
    label: "AUSTRALIAN MADE",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF5003" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
];

const CredentialStrip = () => (
  <section
    className="credential-strip"
    style={{
      background: "#FFFFFF",
      padding: "28px 60px",
    }}
  >
    <div
      className="credential-grid"
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
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div style={{ flexShrink: 0, display: "flex" }}>{it.icon}</div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#1A2B35",
            }}
          >
            {it.label}
          </div>
        </div>
      ))}
    </div>
    <style>{`
      @media (max-width: 768px) {
        .credential-strip { padding: 24px !important; }
        .credential-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
      }
    `}</style>
  </section>
);

export default CredentialStrip;
