import { useQuiz } from "./quizContext";

const Science = () => {
  const { open } = useQuiz();

  return (
    <section className="science-section">
      <div className="science-bg" aria-hidden="true"></div>
      <div className="science-overlay" aria-hidden="true"></div>

      <div className="science-header">
        <div className="section-eyebrow science-eyebrow">
          <span>THE EVIDENCE</span>
        </div>
        <h2 className="section-h2 science-heading">
          The science exists.<br />
          <em>We didn't invent it.</em>
        </h2>
        <p className="science-sub">
          We've curated the most compelling evidence on peptide therapy, GH axis optimisation, and longevity medicine — so you can make an informed decision before you book.
        </p>
      </div>

      <div className="science-grid">
        <a className="science-card science-card-dark" href="https://www.youtube.com/@hubermanlab" target="_blank" rel="noopener noreferrer">
          <div className="science-label">PODCAST · HUBERMAN LAB</div>
          <h3 className="science-title">The Science of Peptides &amp; Growth Hormone</h3>
          <p className="science-quote">"GH-releasing peptides represent one of the most promising frontiers in evidence-based longevity medicine."</p>
          <div className="science-source">ANDREW HUBERMAN, PHD — STANFORD NEUROSCIENCE</div>
          <div className="science-link"><span>Watch on YouTube →</span></div>
        </a>

        <a className="science-card science-card-light" href="https://academic.oup.com/jcem" target="_blank" rel="noopener noreferrer">
          <div className="science-label">CLINICAL RESEARCH · ENDOCRINOLOGY</div>
          <h3 className="science-title">GH Secretagogues &amp; Body Composition in Adults</h3>
          <p className="science-quote">"Significant improvements in lean mass, fat reduction, and recovery markers were observed in adults aged 35–65 following 12 weeks of GH axis support."</p>
          <div className="science-source">JOURNAL OF CLINICAL ENDOCRINOLOGY, 2021</div>
          <div className="science-link"><span>View research →</span></div>
        </a>

        <a className="science-card science-card-dark" href="https://peterattiamd.com/podcast/" target="_blank" rel="noopener noreferrer">
          <div className="science-label">EDITORIAL · LONGEVITY MEDICINE</div>
          <h3 className="science-title">Peter Attia on the Future of Longevity Medicine</h3>
          <p className="science-quote">"The interventions that will define the next decade of medicine are the ones that work with the body's own signalling systems — not against them."</p>
          <div className="science-source">PETER ATTIA MD — THE DRIVE PODCAST</div>
          <div className="science-link"><span>Listen →</span></div>
        </a>
      </div>

      <p className="science-disclaimer">
        External references are provided for educational purposes only. Meora does not claim endorsement by any individual or publication cited. Individual results vary. All Meora patients are assessed by an AHPRA-registered Australian doctor before any protocol is prescribed.
      </p>

      <div className="science-cta-wrap">
        <button className="science-cta" onClick={open}>START YOUR ASSESSMENT →</button>
      </div>
    </section>
  );
};

export default Science;
