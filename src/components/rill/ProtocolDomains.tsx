import { useEffect, useRef } from "react";
import { useQuiz } from "./quizContext";

type Protocol = { name: string; slug: string; mark: string };
type Featured = { heading: string; secondaryLabel: string; desc: string; mark: string };
type Domain = {
  id: string;
  name: string;
  tagline: string;
  featured: Featured;
  pills: Protocol[];
};

const MARK = {
  gold: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-gold.png",
  steel: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-steel.png",
  marble: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-marble.png",
  water: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-water.png",
  jungle: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-jungle.png",
  rosegold: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-rosegold.png",
};

const BG: Record<string, string | undefined> = {
  energy: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-energy.jpg",
  performance: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-performance.jpg",
  balance: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-balance.jpg",
  recovery: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-recovery.jpg",
  beauty: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-beauty.jpg",
  longevity: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/domain-longevity.jpg",
};

const BG_POS: Record<string, string> = {
  energy: "center 40%",
  performance: "20% center",
  recovery: "25% center",
  beauty: "center 25%",
  balance: "center center",
  longevity: "center center",
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const domains: Domain[] = [
  {
    id: "energy",
    name: "Energy",
    tagline: "Show up fully. Every single day.",
    featured: {
      heading: "Daily Energy & Clarity",
      secondaryLabel: "Foundation.ME",
      desc: "Sustained energy, sharper focus and consistent output — every single day.",
      mark: MARK.gold,
    },
    pills: [
      { name: "Advanced Energy Support", slug: "advanced-energy-support", mark: MARK.gold },
      { name: "Drive & Vitality", slug: "drive-and-vitality", mark: MARK.gold },
    ],
  },
  {
    id: "performance",
    name: "Performance",
    tagline: "Built to go further than you thought possible.",
    featured: {
      heading: "Strength & Body Recomposition",
      secondaryLabel: "Performance.ME",
      desc: "Build lean muscle, reduce body fat and perform at your peak.",
      mark: MARK.steel,
    },
    pills: [
      { name: "Peak Athletic Performance", slug: "peak-athletic-performance", mark: MARK.steel },
      { name: "Cognitive Edge", slug: "cognitive-edge", mark: MARK.steel },
    ],
  },
  {
    id: "balance",
    name: "Balance",
    tagline: "When everything feels in sync, everything changes.",
    featured: {
      heading: "Weight Management",
      secondaryLabel: "Weight Loss.ME",
      desc: "A smarter, medically supervised path to sustainable body composition.",
      mark: MARK.jungle,
    },
    pills: [
      { name: "Advanced Weight Loss", slug: "advanced-weight-loss", mark: MARK.jungle },
      { name: "GLP-1 Program", slug: "glp-1-program", mark: MARK.jungle },
    ],
  },
  {
    id: "recovery",
    name: "Recovery",
    tagline: "Built for the comeback.",
    featured: {
      heading: "Injury & Muscle Recovery",
      secondaryLabel: "Recovery.ME",
      desc: "Repair faster, reduce inflammation and come back stronger.",
      mark: MARK.marble,
    },
    pills: [],
  },
  {
    id: "longevity",
    name: "Longevity",
    tagline: "Play the long game. On your terms.",
    featured: {
      heading: "Long-Term Health Optimisation",
      secondaryLabel: "Longevity.ME",
      desc: "Protect what you've built and invest in the decades ahead.",
      mark: MARK.water,
    },
    pills: [
      { name: "Comprehensive Longevity Protocol", slug: "comprehensive-longevity-protocol", mark: MARK.water },
    ],
  },
  {
    id: "beauty",
    name: "Beauty",
    tagline: "Radiant from within. Supported by science.",
    featured: {
      heading: "Skin & Collagen Support",
      secondaryLabel: "Skin & Collagen.ME",
      desc: "Radiant, resilient skin supported by peptide science from within.",
      mark: MARK.rosegold,
    },
    pills: [],
  },
];

const ProtocolDomains = () => {
  const { open: openQuiz } = useQuiz();
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reveal observer
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    innerRefs.current.forEach((el) => el && io.observe(el));

    if (reduce) return () => io.disconnect();

    // Parallax
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      sectionRefs.current.forEach((sec, i) => {
        const p = parallaxRefs.current[i];
        if (!sec || !p) return;
        const r = sec.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        // progress: -1 (section bottom at top of viewport) to 1 (section top at bottom of viewport)
        const center = r.top + r.height / 2;
        const progress = (center - vh / 2) / (vh / 2 + r.height / 2);
        const y = Math.max(-60, Math.min(60, progress * -60));
        p.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="protocols" style={{ background: "#0a0a0a" }}>
      <style>{`
        .pd-section {
          position: relative;
          width: 100vw;
          background: linear-gradient(160deg, #0f1a1a 0%, #0a0a0a 100%);
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: filter 400ms ease;
        }
        .pd-section:hover { filter: brightness(1.08); }
        .pd-section:last-of-type { border-bottom: none; }
        .pd-bg-parallax {
          position: absolute;
          left: 0; right: 0;
          top: -10%;
          height: 120%;
          z-index: 0;
          will-change: transform;
        }
        .pd-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center;
          animation: pd-kenburns 20s ease-in-out infinite alternate;
          will-change: transform;
          filter: saturate(1.15) brightness(1.05);
        }
        @keyframes pd-kenburns {
          from { transform: scale(1.05); }
          to   { transform: scale(1.12); }
        }
        .pd-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0.20) 100%);
          z-index: 1;
        }
        .pd-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 48px;
          padding: 80px 48px;
        }
        .pd-left { width: 45%; }
        .pd-right { width: 55%; display: flex; flex-direction: column; gap: 48px; }
        .pd-inner--flipped { flex-direction: row-reverse; }

        /* Reveal */
        .pd-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1);
        }
        .pd-inner.is-visible .pd-reveal { opacity: 1; transform: none; }
        .pd-inner.is-visible .pd-r-name { transition-delay: 0ms; }
        .pd-inner.is-visible .pd-r-tag { transition-delay: 100ms; }
        .pd-inner.is-visible .pd-r-card { transition-delay: 200ms; }
        .pd-inner.is-visible .pd-r-pill-0 { transition-delay: 300ms; }
        .pd-inner.is-visible .pd-r-pill-1 { transition-delay: 400ms; }

        .pd-featured {
          background: rgba(0,0,0,0.30);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 16px;
          padding: 40px;
          display: flex; flex-direction: column; gap: 16px;
          transition: background 300ms ease, border-color 300ms ease, box-shadow 300ms ease, opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1);
          cursor: pointer;
        }
        .pd-featured:hover {
          background: rgba(0,0,0,0.45);
          border-color: rgba(255,255,255,0.30);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        }
        .pd-fmark { width: 48px; height: 48px; object-fit: contain; }
        .pd-fname {
          font-family: 'Fraunces', serif; font-weight: 700; font-style: normal;
          font-size: 32px; color: #F5F0E8; line-height: 1.15;
        }
        .pd-fdesc {
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          font-size: 15px; color: rgba(245,240,232,0.55); line-height: 1.5;
        }
        .pd-flearn {
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          font-size: 13px; color: #E8572A; margin-top: 4px;
        }
        .pd-dname {
          font-family: 'Fraunces', serif; font-weight: 700; font-style: normal;
          font-size: 64px; color: #FFFFFF; line-height: 1.05;
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
        }
        .pd-dtag {
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          font-size: 15px; color: rgba(245,240,232,0.55); margin-top: 8px;
        }
        .pd-pills { display: flex; flex-direction: column; gap: 12px; }
        .pd-pill {
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(0,0,0,0.25);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 12px;
          padding: 18px 24px;
          transition: background 250ms ease, border-color 250ms ease, transform 250ms ease, opacity 600ms cubic-bezier(0.22,1,0.36,1);
          cursor: pointer;
        }
        .pd-pill:hover {
          background: rgba(0,0,0,0.40);
          border-color: rgba(255,255,255,0.28);
          transform: translateX(4px);
        }
        .pd-pill-name {
          font-family: 'DM Sans', sans-serif; font-weight: 800;
          font-size: 16px; color: #F5F0E8;
        }
        .pd-pill-arrow { color: #E8572A; font-size: 16px; }

        @media (max-width: 768px) {
          .pd-inner {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
            padding: 64px 24px;
            gap: 32px;
          }
          .pd-inner--flipped { flex-direction: column-reverse; }
          .pd-left, .pd-right { width: 100%; }
          .pd-dname { font-size: 42px; }
          .pd-featured { padding: 28px; }
          .pd-fname { font-size: 26px; }
          .pd-pill { text-align: left; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pd-bg { animation: none; }
          .pd-bg-parallax { transform: none !important; }
          .pd-reveal { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      {domains.map((d, i) => {
        const isEven = i % 2 === 1;
        return (
          <div
            key={d.id}
            className="pd-section"
            ref={(el) => (sectionRefs.current[i] = el)}
          >
            {BG[d.id] && (
              <div
                className="pd-bg-parallax"
                ref={(el) => (parallaxRefs.current[i] = el)}
              >
                <div
                  className="pd-bg"
                  style={{
                    backgroundImage: `url(${BG[d.id]})`,
                    backgroundPosition: BG_POS[d.id] || "center center",
                  }}
                />
              </div>
            )}
            <div className="pd-overlay" />
            <div
              className={isEven ? "pd-inner pd-inner--flipped" : "pd-inner"}
              ref={(el) => (innerRefs.current[i] = el)}
            >
              <div className="pd-left">
                <div className="pd-featured pd-reveal pd-r-card">
                  <img src={d.featured.mark} alt="" className="pd-fmark" />
                  <div className="pd-fname">{d.featured.name}</div>
                  <div className="pd-fdesc">{d.featured.desc}</div>
                  <div className="pd-flearn">Learn more →</div>
                </div>
              </div>
              <div className="pd-right">
                <div>
                  <div className="pd-dname pd-reveal pd-r-name">{d.name}</div>
                  <div className="pd-dtag pd-reveal pd-r-tag">{d.tagline}</div>
                </div>
                {d.pills.length > 0 && (
                  <div className="pd-pills">
                    {d.pills.map((p, pi) => (
                      <div key={p.name} className={`pd-pill pd-reveal pd-r-pill-${pi}`}>
                        <span className="pd-pill-name">{p.name}</span>
                        <span className="pd-pill-arrow">→</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div
        style={{
          width: "100vw",
          height: 120,
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={openQuiz}
          style={{
            background: "#E8572A",
            color: "#F5F0E8",
            border: "none",
            borderRadius: 999,
            padding: "16px 32px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 800,
            fontSize: 14,
            letterSpacing: "0.02em",
            cursor: "pointer",
          }}
        >
          Start your assessment →
        </button>
      </div>
    </section>
  );
};

export default ProtocolDomains;
