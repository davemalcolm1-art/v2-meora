import { useState } from "react";

const faqs = [
  { q: "What is Meora?", a: "Meora is an Australian telehealth platform providing access to medical-grade peptide protocols, prescribed by AHPRA-registered doctors. Every program is tailored to your goals and delivered to your door via registered compounding pharmacy." },
  { q: "Do I need a prescription?", a: "Yes. All peptide programs are prescribed by an AHPRA-registered Australian doctor following a thorough review of your health history, blood results, and goals. No prescription is issued without a genuine clinical assessment." },
  { q: "Are peptides safe?", a: "All peptides dispensed through Meora are compounded by registered Australian compounding pharmacies. Side effects are rare but can include mild irritation at the injection site. Your prescribing doctor will review your health history and blood results to ensure suitability before prescribing." },
  { q: "How do I take peptides?", a: "Peptides are administered as small subcutaneous injections — similar to how diabetics use insulin. Your Meora doctor provides clear instructions, and most patients find the process quick and straightforward within the first few days." },
  { q: "How long until I see results?", a: "It depends on the protocol and your goals. Some patients notice improvements in energy, recovery, and sleep within weeks. Changes in body composition or connective tissue repair typically take longer. Your quarterly review is designed to track and optimise your progress." },
  { q: "What does the quarterly monitoring include?", a: "Every 90 days you complete a repeat blood panel at a private pathology clinic, followed by a follow-up telehealth consultation with your Rill doctor. Your results are reviewed, your dose is adjusted if needed, and a renewal prescription is issued. This ongoing monitoring is both a clinical requirement and the key to long-term results." },
  { q: "Is Meora available across Australia?", a: "Yes. All consultations are conducted via telehealth, so Meora is available to patients anywhere in Australia. Your protocol is cold-chain delivered directly to your door by our compounding pharmacy partner." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="about"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #FFFFFF 0%, #F7F4EF 60%, #EDE8E0 100%)",
        padding: "120px 80px",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(26,43,53,0.45)",
            marginBottom: 16,
          }}
        >
          COMMON QUESTIONS
        </div>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            color: "#1A2B35",
            fontSize: "clamp(32px, 4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 48px",
          }}
        >
          Common questions.<br />
          <span style={{ color: "#1A2B35" }}>Clear answers.</span>
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
                    color: "#1A2B35",
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
