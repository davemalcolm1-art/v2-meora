const ContentHub = () => (
  <section
    className="hub-section"
    id="journal"
    style={{
      borderRadius: 24,
      overflow: "hidden",
      marginBottom: 0,
    }}
  >
    <div className="hub-header">
      <div className="hub-header-left">
        <div className="section-eyebrow">
          <div className="section-eyebrow-line"></div>
          <span>Journal</span>
        </div>
        <h2 className="hub-heading">
          Resources<br /><em>&amp; education.</em>
        </h2>
      </div>
      <a href="#" className="hub-learn-more">View all articles →</a>
    </div>

    <a href="https://longevity-for-me.ghost.io/research-peptides-vs-medical-grade-australia/" target="_blank" rel="noopener noreferrer" className="hub-card hub-card-feature">
      <img
        className="hub-card-img"
        src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&q=80"
        alt=""
      />
      <div className="hub-card-overlay" />
      <span className="hub-pill">Article</span>
      <span className="hub-card-arrow" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M5 13L13 5M13 5H6M13 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className="hub-card-body">
        <div className="hub-card-date">Apr 2026</div>
        <h3 className="hub-card-title">Why regulated peptides are a different category entirely</h3>
      </div>
    </a>

    <div className="hub-bottom-row">
      <a href="https://longevity-for-me.ghost.io/gh-axis-explained-age/" target="_blank" rel="noopener noreferrer" className="hub-card hub-card-secondary">
        <img
          className="hub-card-img"
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80"
          alt=""
        />
        <div className="hub-card-overlay" />
        <span className="hub-pill">Article</span>
        <div className="hub-card-body">
          <div className="hub-card-date">Apr 2026</div>
          <h3 className="hub-card-title">The GH axis and why it matters after 35</h3>
        </div>
      </a>
      <a href="https://longevity-for-me.ghost.io/what-are-peptides-australia/" target="_blank" rel="noopener noreferrer" className="hub-card hub-card-secondary">
        <img
          className="hub-card-img"
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80"
          alt=""
        />
        <div className="hub-card-overlay" />
        <span className="hub-pill">Guide</span>
        <div className="hub-card-body">
          <div className="hub-card-date">Mar 2026</div>
          <h3 className="hub-card-title">New to peptides? Start here.</h3>
        </div>
      </a>
    </div>
  </section>
);

export default ContentHub;
