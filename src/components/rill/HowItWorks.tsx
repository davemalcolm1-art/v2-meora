import bloodImg from "@/assets/howitworks/step-blood.png";
import gpImg from "@/assets/howitworks/step-gp.png";
import deliveryImg from "@/assets/howitworks/step-delivery.png";
import ongoingImg from "@/assets/howitworks/step-ongoing.png";

const INK = "#1A2B35";
const CREAM = "#F7F4EF";

const steps = [
  { n: "01", title: "Blood panel", desc: "Targeted diagnostics establish your baseline biomarkers.", img: bloodImg, alt: "Line illustration of a glass blood collection vial" },
  { n: "02", title: "Meet your GP", desc: "An AHPRA-registered doctor reviews your results via telehealth.", img: gpImg, alt: "Line illustration of a laptop with a doctor on a video call" },
  { n: "03", title: "Protocols delivered", desc: "Compounded by a registered pharmacy. Cold-chain to your door.", img: deliveryImg, alt: "Line illustration of a wrapped apothecary parcel tied with twine" },
  { n: "04", title: "Ongoing review", desc: "Continuous adjustment as your numbers and goals evolve.", img: ongoingImg, alt: "Line illustration of a circular cycle of arrows" },
];

const trust = [
  { label: "AHPRA-registered", sub: "Australian doctors only" },
  { label: "Cold-chain delivery", sub: "Pharmacy to your door" },
  { label: "Ongoing review", sub: "Care that adapts to you" },
];

export default function HowItWorks() {
  return (
    <section style={{ background: CREAM, padding: "140px 0 120px", color: INK }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
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

        {/* Editorial cream panels — hairline dividers between */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 28,
            marginBottom: 72,
          }}
        >
          {steps.map((s, i) => (
            <article
              key={s.n}
              style={{
                position: "relative",
                padding: "8px 8px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                minHeight: 520,
              }}
            >
              {/* Illustration */}
              <div
                style={{
                  width: "100%",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 0 28px",
                  minHeight: 240,
                }}
              >
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  style={{
                    width: "100%",
                    maxWidth: 300,
                    height: "auto",
                    display: "block",
                    borderRadius: 18,
                  }}
                />
              </div>

              {/* Title + copy */}
              <h3
                style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  fontSize: 26,
                  fontWeight: 400,
                  lineHeight: 1.15,
                  margin: "0 0 12px",
                  letterSpacing: "-0.01em",
                  color: INK,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  margin: 0,
                  color: "rgba(26,43,53,0.65)",
                }}
              >
                {s.desc}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}

        <div style={{ textAlign: "center" }}>
          <button
            style={{
              background: INK,
              color: CREAM,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "none",
              borderRadius: 999,
              padding: "16px 36px",
              cursor: "pointer",
            }}
          >
            Start your assessment →
          </button>
        </div>
      </div>
    </section>
  );
}
