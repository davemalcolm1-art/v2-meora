const items = [
  {
    label: "PERSONALISED",
    sub: "Protocols built around your biology.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5003" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M9 3v2h6V3" />
        <path d="M9 13l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "EVIDENCE-INFORMED",
    sub: "Developed by AHPRA-registered doctors.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5003" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6v4l4 10a3 3 0 0 1-3 4H8a3 3 0 0 1-3-4l4-10V3z" />
        <path d="M9 7h6" />
      </svg>
    ),
  },
  {
    label: "DOCTOR-PRESCRIBED",
    sub: "Every protocol requires a valid prescription.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5003" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8l9-5 9 5v9l-9 5-9-5V8z" />
        <path d="M3 8l9 5 9-5" />
        <path d="M12 13v9" />
      </svg>
    ),
  },
  {
    label: "AUSTRALIA-WIDE",
    sub: "Available anywhere in Australia.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5003" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
];

const CredentialStrip = () => (
  <section
    className="credential-strip"
    style={{
      background: "#FFFFFF",
      borderTop: "1px solid #E8E2D9",
      borderBottom: "1px solid #E8E2D9",
      padding: "28px 80px",
    }}
  >
    <div
      className="credential-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0,
      }}
    >
      {items.map((it, i) => (
        <div
          key={it.label}
          style={{
            padding: "8px 32px",
            borderLeft: i === 0 ? "none" : "1px solid #E8E2D9",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div style={{ flexShrink: 0, marginTop: 2 }}>{it.icon}</div>
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#111827",
                marginBottom: 6,
              }}
            >
              {it.label}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#6B6560",
                lineHeight: 1.5,
              }}
            >
              {it.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
    <style>{`
      @media (max-width: 768px) {
        .credential-strip { padding: 24px !important; }
        .credential-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
        .credential-grid > div { border-left: none !important; padding: 8px 0 !important; }
      }
    `}</style>
  </section>
);

export default CredentialStrip;
