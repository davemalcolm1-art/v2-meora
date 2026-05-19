import { useState } from "react";

const faqs = [
  { q: "What is Meora?", a: "Meora is an Australian telehealth platform providing access to medical-grade peptide protocols, prescribed by AHPRA-registered doctors. Every program is tailored to your goals and delivered to your door via TGA-licensed compounding pharmacy." },
  { q: "Do I need a prescription?", a: "Yes. All peptide programs are prescribed by an AHPRA-registered Australian doctor following a thorough review of your health history, blood results, and goals. No prescription is issued without a genuine clinical assessment." },
  { q: "Are peptides safe?", a: "All peptides dispensed through Meora are compounded by TGA-licensed Australian pharmacies. Side effects are rare but can include mild irritation at the injection site. Your prescribing doctor will review your health history and blood results to ensure suitability before prescribing." },
  { q: "How do I take peptides?", a: "Peptides are administered as small subcutaneous injections — similar to how diabetics use insulin. Your Meora doctor provides clear instructions, and most patients find the process quick and straightforward within the first few days." },
  { q: "How long until I see results?", a: "It depends on the protocol and your goals. Some patients notice improvements in energy, recovery, and sleep within weeks. Changes in body composition or connective tissue repair typically take longer. Your quarterly review is designed to track and optimise your progress." },
  { q: "What does the quarterly monitoring include?", a: "Every 90 days you complete a repeat blood panel at a private pathology clinic, followed by a follow-up telehealth consultation with your Rill doctor. Your results are reviewed, your dose is adjusted if needed, and a renewal prescription is issued. This ongoing monitoring is both a clinical requirement and the key to long-term results." },
  { q: "Is Meora available across Australia?", a: "Yes. All consultations are conducted via telehealth, so Meora is available to patients anywhere in Australia. Your protocol is cold-chain delivered directly to your door by our compounding pharmacy partner." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="faq-section" id="about">
      <div className="faq-image-col">
        <img
          className="faq-image"
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="faq-content-col">
        <div className="section-eyebrow reveal">
          <div className="section-eyebrow-line"></div>
          <span>FAQ</span>
        </div>
        <h2 className="faq-heading reveal reveal-delay-1">
          Common<br /><em>questions.</em>
        </h2>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
              <div className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <div className="faq-icon">+</div>
              </div>
              <div className="faq-answer">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
