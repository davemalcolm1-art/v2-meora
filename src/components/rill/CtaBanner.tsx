import { useState } from "react";
import bgImage from "@/assets/newsletter-bg.jpg";

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
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center right",
      margin: "24px",
      borderRadius: 32,
      minHeight: 520,
      display: "flex",
      alignItems: "center",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, rgba(8,18,28,0.75) 0%, rgba(8,18,28,0.45) 45%, rgba(8,18,28,0.1) 75%, rgba(8,18,28,0) 100%)",
        pointerEvents: "none",
      }} />
      <div className="cta-inner" style={{
        position: "relative",
        maxWidth: 1280,
        width: "100%",
        margin: "0 auto",
        padding: "80px",
      }}>
        <div style={{ maxWidth: 720 }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: "#FFFFFF", fontSize: "clamp(34px,4.2vw,58px)", lineHeight: 1.1, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
            <span style={{ display: "block" }}>Your health sets the limits.</span>
            <span style={{ display: "block" }}>It's time to move beyond them.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.9)", fontSize: 17, lineHeight: 1.5, margin: "0 0 36px" }}>
            Join for clinically guided perspectives on optimising health.
          </p>
          <form onSubmit={handleSubmit} className="cta-form" style={{
            display: "flex",
            gap: 12,
            maxWidth: 560,
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              maxLength={255}
              className="cta-input"
              style={{
                flex: 1,
                background: "rgba(20,30,40,0.55)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 999,
                padding: "16px 24px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "#FFFFFF",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
            />
            <button type="submit" className="cta-btn" style={{
              background: "#FFFFFF", color: "#0F1820", border: "none", borderRadius: 999,
              padding: "16px 36px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: 15, cursor: "pointer",
              flexShrink: 0, transition: "all 0.2s ease", whiteSpace: "nowrap",
            }}>
              Subscribe
            </button>
          </form>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 20, marginBottom: 0 }}>
            By clicking subscribe you're confirming that you agree with our Terms and Conditions.
          </p>
        </div>
      </div>
      <style>{`
        .cta-input::placeholder { color: rgba(255,255,255,0.7); }
        .cta-input:focus { border-color: rgba(255,255,255,0.6); }
        .cta-btn:hover { background: #F5ECDB !important; transform: translateY(-2px); box-shadow: 0 10px 36px rgba(0,0,0,0.3); }
        @media (max-width: 720px) {
          .cta-inner { padding: 48px 28px !important; }
          .cta-form { flex-direction: column !important; }
          .cta-btn { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default CtaBanner;
