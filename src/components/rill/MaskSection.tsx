const MaskSection = () => (
  <section className="mask-section" aria-hidden="true">
    <div className="mask-bg" />
    <div className="mask-tint" />
    <div className="mask-vignette" />
    <svg
      className="mask-svg"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <defs>
        <mask id="meoramask">
          <rect width="100%" height="100%" fill="white" />
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="clamp(140px, 22vw, 280px)"
            fontWeight="600"
            letterSpacing="-0.03em"
            fill="black"
          >
            MEORA
          </text>
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="#001830" mask="url(#meoramask)" />
    </svg>
    <div className="mask-fade-top" />
    <div className="mask-fade-bottom" />
    <div className="mask-label">MEORA HEALTH — AUSTRALIA</div>
  </section>
);

export default MaskSection;
