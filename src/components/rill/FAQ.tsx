import { useState } from "react";

const faqs = [
  { q: "What is Meora?", a: "Meora is an Australian telehealth longevity clinic providing access to clinically guided, doctor-prescribed health protocols. Every program is personalised to your goals, overseen by an AHPRA-registered GP, and delivered to your door via registered compounding pharmacy." },
  { q: "How are blood tests done?", a: "After you complete your initial health assessment, we arrange pathology through accredited Australian providers. You'll receive clear instructions on where to go — with collection locations available nationwide — and your results are reviewed directly by your Meora doctor ahead of your consultation." },
  { q: "Do I need blood tests to get started?", a: "Yes. All clinical decisions are based on your pathology, not assumptions. This ensures your protocol is appropriate for you specifically. If you've had recent blood work done elsewhere, we may be able to use existing results depending on the markers tested and how recently they were collected." },
  { q: "Can I work on multiple health goals at the same time?", a: "Yes. Because Meora is built around your individual biomarkers and health history, multiple goals can be assessed together. Your doctor takes a holistic view — your protocol reflects the full picture, not a single isolated concern." },
  { q: "Do you prescribe peptides?", a: "Where clinically appropriate, yes. Following your consultation and blood panel review, your Meora doctor may recommend a peptide protocol as part of your personalised program. Nothing is prescribed without a genuine clinical assessment — the decision is always made collaboratively between you and your doctor." },
  { q: "How are protocols administered?", a: "It depends on your prescribed protocol and goals. Some are delivered as small subcutaneous injections, others as oral capsules, nasal sprays, or topical creams — your doctor will walk you through exactly what's involved during your consultation. Most patients find whatever method they're on straightforward within the first few days." },
  { q: "Do you offer hormone treatments?", a: "Where clinically appropriate, yes. Hormone-related protocols are only considered following a thorough diagnostic review and consultation with your Meora doctor." },
  { q: "How long are consultations?", a: "Initial consultations are conducted via telehealth and allow enough time to review your diagnostics, understand your goals, and make informed clinical decisions together. Follow-up consultations are included as part of your quarterly monitoring." },
  { q: "Is there a patient portal?", a: "Yes. Your Meora patient portal gives you a single place to view your blood results, care plan, and consultation notes. It's also how you coordinate repeat prescriptions and track your progress over time." },
  { q: "Is Meora a replacement for my GP?", a: "No. Meora is designed to complement your existing primary care, not replace it. We focus on optimisation and longevity, and we always encourage you to maintain a relationship with your regular GP." },
  { q: "Is Meora available across Australia?", a: "Yes. All consultations are conducted via telehealth, and your protocol is cold-chain delivered directly to your door — wherever you are in Australia." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="about"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #FFFFFF 0%, #F7F4EF 60%, #EDE8E0 100%)",
        padding: "120px 80px",
        margin: "24px",
        borderRadius: 32,
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            color: "#0f0f0f",
            fontSize: "clamp(32px, 4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 48px",
          }}
        >
          Common questions.<br />
          <span style={{ color: "#0f0f0f" }}>Clear answers.</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(26,43,53,0.08)",
                  borderRadius: 12,
                  padding: "20px 24px",
                  boxShadow: "0 2px 16px rgba(0,0,43,0.04)",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 600,
                    fontSize: 18,
                    color: "#0f0f0f",
                    lineHeight: 1.4,
                  }}
                >
                  <span>{f.q}</span>
                  <span
                    style={{
                      flexShrink: 0,
                      marginLeft: 20,
                      color: "#FF5003",
                      fontSize: 22,
                      fontWeight: 300,
                      transition: "transform 0.3s ease",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      marginTop: 16,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 16,
                      lineHeight: 1.7,
                      color: "rgba(26,43,53,0.7)",
                    }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
