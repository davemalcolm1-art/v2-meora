import { useState } from "react";

const CtaBanner = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="section-exit-blur" style={{
      position: "relative",
      overflow: "hidden",
      width: "auto",
      background: "radial-gradient(ellipse at 90% 0%, rgba(232,87,26,0.15) 0%, rgba(232,87,26,0.06) 25%, transparent 55%), linear-gradient(110deg, #050505 0%, #0F1F28 35%, #1A2B35 70%, #14242E 100%)",
      padding: "100px 0",
      margin: "24px",
      borderRadius: 32,
    }}>
      <div className="cta-inner" style={{
        position: "relative",
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 80px",
        textAlign: "center",
      }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.18em", color: "rgba(245,236,219,0.5)", textTransform: "uppercase", marginBottom: 24 }}>
          STAY INFORMED
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#F5ECDB", fontSize: "clamp(32px,4vw,54px)", lineHeight: 1.1, margin: "0 auto 24px", letterSpacing: "-0.02em", maxWidth: 880 }}>
          Take control of what comes next.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(245,236,219,0.7)", fontSize: 17, lineHeight: 1.6, margin: "0 auto 40px", maxWidth: 640 }}>
          Get clinically guided perspectives on longevity, performance, and healthspan — written by our medical team to help you make informed decisions at every stage of life.
        </p>
        <form onSubmit={handleSubmit} className="cta-form" style={{
          display: "flex",
          gap: 12,
          maxWidth: 540,
          margin: "0 auto",
        }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="cta-input"
            style={{
              flex: 1,
              background: "rgba(10,15,20,0.5)",
              border: "1px solid rgba(245,236,219,0.2)",
              borderRadius: 999,
              padding: "16px 24px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "#F5ECDB",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
          />
          <button type="submit" className="cta-btn" style={{
            background: "#E8571A", color: "#F5ECDB", border: "none", borderRadius: 999,
            padding: "16px 32px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", cursor: "pointer",
            flexShrink: 0, transition: "all 0.2s ease", whiteSpace: "nowrap",
          }}>
            Subscribe →
          </button>
        </form>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,236,219,0.4)", marginTop: 20, marginBottom: 0 }}>
          By subscribing you agree to our Terms and Conditions.
        </p>
      </div>
      <style>{`
        .cta-input::placeholder { color: rgba(245,236,219,0.45); }
        .cta-input:focus { border-color: rgba(245,236,219,0.5); }
        .cta-btn:hover { background: #FF5003 !important; transform: translateY(-2px); box-shadow: 0 10px 36px rgba(232,87,26,0.4); }
        @media (max-width: 640px) {
          .cta-inner { padding: 0 24px !important; }
          .cta-form { flex-direction: column !important; }
          .cta-btn { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default CtaBanner;
