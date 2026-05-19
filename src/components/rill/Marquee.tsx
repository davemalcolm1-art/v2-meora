const items = [
  "AHPRA-Registered Practitioners",
  "Registered Compounding Pharmacy",
  "Australia-Wide Telehealth",
  "Quarterly Blood Monitoring",
  "Cold-Chain Delivery",
  "A Protocol. Not a Trend.",
];

const Marquee = () => {
  const all = [...items, ...items];
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {all.map((t, i) => (
          <div className="marquee-item" key={i}>
            {t}
            <div className="marquee-dot"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
