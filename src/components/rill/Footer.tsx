const domainLinks = ["Energy", "Performance", "Balance", "Recovery", "Longevity", "Beauty"];
const companyLinks = ["About Meora", "Our Doctors", "Our Standards", "Journal", "Contact"];
const supportLinks = ["Privacy Policy", "Terms & Conditions", "Telehealth Disclaimer", "Product Disclaimer"];

const colLabel: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10,
  letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)", marginBottom: 16, textTransform: "uppercase",
};
const linkStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 14,
  color: "rgba(255,255,255,0.55)", display: "block", marginBottom: 10,
  textDecoration: "none", transition: "color 0.2s ease",
};

const LinkCol = ({ label, items }: { label: string; items: string[] }) => (
  <div>
    <div style={colLabel}>{label}</div>
    {items.map((l) => (
      <a key={l} href="#" className="footer-link" style={linkStyle}>{l}</a>
    ))}
  </div>
);

const Footer = () => (
  <footer style={{ background: "linear-gradient(180deg, #1A2B35 0%, #142028 60%, #0F1820 100%)", padding: "32px 80px 40px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div className="footer-top-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg viewBox="460 85 280 240" height="40" width="40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="600" cy="220" fill="none" r="120" stroke="#FF5003" strokeWidth="14" />
              <path d="M 530 300 L 530 170 L 600 250 L 670 170 L 670 300" fill="none" stroke="#FF5003" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
              <path d="M 600 310 C 560 260, 580 215, 600 195 C 620 215, 640 260, 600 310 Z" fill="none" stroke="#FF5003" strokeWidth="13" />
            </svg>
            <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 18, letterSpacing: "0.18em", color: "#FF5003" }}>MEORA</span>
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.6)", marginTop: 12 }}>
            It starts with ME.
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {[
              { label: "Instagram", href: "https://www.instagram.com/meora.health/", icon: <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" /> },
              { label: "LinkedIn", href: "https://www.linkedin.com/", icon: <rect x="6" y="6" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" /> },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="footer-social"
                style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", transition: "border-color 0.2s ease" }}>
                <svg width="14" height="14" viewBox="0 0 24 24">{s.icon}</svg>
              </a>
            ))}
          </div>
        </div>
        <LinkCol label="DOMAINS" items={domainLinks} />
        <LinkCol label="COMPANY" items={companyLinks} />
        <LinkCol label="SUPPORT" items={supportLinks} />
      </div>
      <div className="footer-bottom-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 32, gap: 32 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.6, maxWidth: 600 }}>
          Meora operates as an AHPRA-compliant telehealth service. All consultations are conducted by AHPRA-registered medical practitioners. Compounded therapeutic goods are prepared by a registered compounding pharmacy and dispensed only on lawful prescription. This website advertises a health service, not a therapeutic good. Results vary. Not a substitute for professional medical advice.
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 12, color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>
          © 2025 MEORA · Aaker Industries Pty Ltd · ABN 58 697 722 357
        </div>
      </div>
    </div>
    <style>{`
      .footer-link:hover { color: rgba(255,255,255,0.9) !important; }
      .footer-social:hover { border-color: rgba(255,255,255,0.4) !important; }
      @media (max-width: 900px) {
        .footer-top-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        .footer-bottom-row { flex-direction: column !important; align-items: flex-start !important; }
      }
    `}</style>
  </footer>
);

export default Footer;
