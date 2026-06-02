import bloodImg from "@/assets/howitworks/step-blood.jpg";
import gpImg from "@/assets/howitworks/step-gp.jpg";
import deliveryImg from "@/assets/howitworks/step-delivery.jpg";
import ongoingImg from "@/assets/howitworks/step-ongoing.jpg";

const steps = [
  { n: "01", title: "Blood panel", desc: "Targeted diagnostics establish your baseline biomarkers.", img: bloodImg },
  { n: "02", title: "Meet your GP", desc: "An AHPRA-registered doctor reviews your results via telehealth.", img: gpImg },
  { n: "03", title: "Protocols delivered", desc: "Compounded by a registered pharmacy. Cold-chain to your door.", img: deliveryImg },
  { n: "04", title: "Ongoing review", desc: "Continuous adjustment as your numbers and goals evolve.", img: ongoingImg },
];

const trust = [
  { label: "AHPRA-registered", sub: "Australian doctors only" },
  { label: "Cold-chain delivery", sub: "Pharmacy to your door" },
  { label: "Ongoing review", sub: "Care that adapts to you" },
];

export default function HowItWorks() {
  return (
    <section style={{ background: "#F7F4EF", padding: "140px 0 120px", color: "#1A2B35" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,43,53,0.5)", margin: "0 0 18px" }}>
            How it works
          </p>
          <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(40px,4.4vw,64px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
            Designed to be <em style={{ fontStyle: "italic" }}>simple.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "rgba(26,43,53,0.6)", margin: 0, lineHeight: 1.6 }}>
            From blood panel to protocol — a clinically guided journey, end to end.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 56 }}>
          {steps.map((s) => (
            <article
              key={s.n}
              style={{
                position: "relative",
                aspectRatio: "3 / 4.2",
                borderRadius: 24,
                overflow: "hidden",
                background: "#1A2B35",
              }}
            >
              <img
                src={s.img}
                alt=""
                loading="lazy"
                width={1024}
                height={1280}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.75) 100%)",
                }}
              />
              <div style={{ position: "absolute", inset: 0, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff" }}>
                <span style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 18, fontWeight: 500, opacity: 0.85 }}>{s.n}</span>
                <div>
                  <h3 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 28, fontWeight: 400, lineHeight: 1.15, margin: "0 0 10px", letterSpacing: "-0.01em" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.55, margin: 0, color: "rgba(255,255,255,0.85)", maxWidth: 260 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Numbered timeline */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "0 auto 64px", maxWidth: 720 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 14, flex: i === steps.length - 1 ? "0 0 auto" : 1 }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%", background: "#1A2B35", color: "#F7F4EF",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, flexShrink: 0,
              }}>
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 1, background: "rgba(26,43,53,0.2)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginBottom: 48, borderTop: "1px solid rgba(26,43,53,0.1)", borderBottom: "1px solid rgba(26,43,53,0.1)", padding: "32px 0" }}>
          {trust.map((t) => (
            <div key={t.label} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 20, fontWeight: 400, margin: "0 0 4px", color: "#1A2B35" }}>{t.label}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(26,43,53,0.55)", margin: 0 }}>{t.sub}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <button style={{
            background: "#1A2B35", color: "#F7F4EF",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13,
            letterSpacing: "0.08em", textTransform: "uppercase",
            border: "none", borderRadius: 999, padding: "16px 36px", cursor: "pointer",
          }}>
            Start your assessment →
          </button>
        </div>
      </div>
    </section>
  );
}
