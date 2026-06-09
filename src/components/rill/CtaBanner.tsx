import { useState } from "react";

const CtaBanner = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      className="cta-banner-section section-exit-blur"
      style={{
        width: "auto",
        background: `
          radial-gradient(ellipse 70% 70% at 100% 0%, rgba(232,87,26,0.2) 0%, transparent 55%),
          #1A2B35
        `,
        padding: "112px 60px",
        margin: "0 40px 24px",
        borderRadius: 24,
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(32px, 3.4vw, 48px)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--cream)",
            marginBottom: 24,
            maxWidth: 960,
          }}
        >
          <span style={{ display: "block" }}>
            Take control of what comes next.
          </span>
          <span style={{ display: "block" }}>
            {"\n"}Personalised longevity designed around your goals, your biology, your{" "}
            <span style={{ color: "var(--orange)" }}>ME.</span>
          </span>
        </h2>

        <p
          className="text-slate-50"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(250, 247, 242, 0.78)",
            maxWidth: 520,
            marginBottom: 36,
          }}
        >
          Join for clinically guided perspectives on what optimal health actually
          looks like — at every stage of life.
        </p>

        <form
          onSubmit={handleSubmit}
          className="newsletter-form"
          style={{
            display: "flex",
            gap: 12,
            maxWidth: 560,
            marginBottom: 20,
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            maxLength={255}
            className="newsletter-input"
            style={{
              flex: 1,
              background: "hsl(0 0% 10% / 0.6)",
              border: "1px solid hsl(40 30% 95% / 0.15)",
              borderRadius: 999,
              padding: "16px 24px",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--cream)",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
          />
          <button
            type="submit"
            className="newsletter-btn"
            style={{
              background: "var(--orange)",
              color: "var(--cream)",
              border: "none",
              borderRadius: 999,
              padding: "16px 36px",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            Subscribe →
          </button>
        </form>

        <p
          className="text-slate-100"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "rgba(250, 247, 242, 0.55)",
            margin: 0,
          }}
        >
          By subscribing you agree to our Terms and Conditions.
        </p>
      </div>

      <style>{`
        .newsletter-input::placeholder { color: hsl(40 30% 95% / 0.6); }
        .newsletter-input:focus { border-color: hsl(40 30% 95% / 0.35); }
        .newsletter-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 36px hsl(18 100% 51% / 0.25); }
        @media (max-width: 720px) {
          .cta-banner-section { padding: 80px 28px !important; margin: 0 16px 16px !important; }
          .newsletter-form { flex-direction: column !important; }
          .newsletter-btn { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default CtaBanner;
