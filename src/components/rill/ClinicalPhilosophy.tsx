import { useEffect, useRef, useState } from "react";

const lines = ["Personalised.", "Evidence-informed.", "Designed around you."];

const ClinicalPhilosophy = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="clinical-philosophy"
      style={{
        background: "#FAF7F2",
        padding: "100px 80px",
      }}
    >
      <div
        className="cp-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "40% 55%",
          gap: "5%",
          maxWidth: 1320,
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#E8571A",
              marginBottom: 24,
            }}
          >
            CLINICAL PHILOSOPHY
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              lineHeight: 1.75,
              color: "#6B6560",
              maxWidth: 320,
              margin: 0,
            }}
          >
            Our protocols are developed by AHPRA-registered doctors and guided by
            your individual assessment to support long-term vitality, performance
            and healthy ageing.
          </p>
          <a
            href="#about"
            style={{
              display: "inline-block",
              marginTop: 24,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              color: "#E8571A",
              fontSize: 13,
              letterSpacing: "0.06em",
              textDecoration: "none",
            }}
          >
            OUR APPROACH →
          </a>
        </div>
        <div>
          {lines.map((line, i) => (
            <div
              key={line}
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 700,
                color: "#111827",
                fontSize: "clamp(32px, 4vw, 52px)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 700ms ease ${i * 150}ms, transform 700ms ease ${i * 150}ms`,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .clinical-philosophy { padding: 64px 24px !important; }
          .cp-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
};

export default ClinicalPhilosophy;
