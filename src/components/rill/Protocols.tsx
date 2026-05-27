import { useState, useEffect, useRef } from "react";
import { useQuiz } from "./quizContext";

const cards = [
  { id: "energy", label: "ENERGY", count: 5, line: "Restore drive, clarity and sustained output.", mark: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-gold.png" },
  { id: "performance", label: "PERFORMANCE", count: 10, line: "Build strength, speed and resilience.", mark: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-steel.png" },
  { id: "balance", label: "BALANCE", count: 7, line: "Hormonal equilibrium and whole-body calm.", mark: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-marble.png" },
  { id: "recovery", label: "RECOVERY", count: 3, line: "Repair faster. Come back stronger.", mark: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-water.png" },
  { id: "longevity", label: "LONGEVITY", count: 4, line: "Age well. On your terms.", mark: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-jungle.png" },
  { id: "beauty", label: "BEAUTY", count: 4, line: "Skin health and collagen from within.", mark: "https://pub-a7ea34d361d14881b5fd02774fc834d8.r2.dev/protocol-rosegold.png" },
];

const tripleCards = [...cards, ...cards, ...cards];

const Protocols = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const animFrame = useRef<number>();
  const isDragging = useRef(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const cardSetWidth = el.scrollWidth / 3;
    el.scrollLeft = cardSetWidth;

    const autoScroll = () => {
      if (!isDragging.current) {
        el.scrollLeft += 0.4;
        if (el.scrollLeft >= cardSetWidth * 2) el.scrollLeft = cardSetWidth;
        if (el.scrollLeft <= 0) el.scrollLeft = cardSetWidth;
      }
      animFrame.current = requestAnimationFrame(autoScroll);
    };
    animFrame.current = requestAnimationFrame(autoScroll);
    return () => { if (animFrame.current) cancelAnimationFrame(animFrame.current); };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = carouselRef.current;
    if (!el) return;
    isDragging.current = true;
    isDown.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    el.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    isDragging.current = false;
    if (carouselRef.current) carouselRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    isDown.current = false;
    isDragging.current = false;
    if (carouselRef.current) carouselRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();
    const el = carouselRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`;

  return (
    <section
      id="protocols"
      style={{
        background: "radial-gradient(ellipse at 5% 5%, rgba(255,245,225,0.6) 0%, transparent 40%), radial-gradient(ellipse at 15% 20%, #E8D8C0 0%, #D4BC9A 30%, #BEA07A 60%, #A8886A 100%)",
        padding: "80px 0",
        margin: "0 40px",
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* HEADER */}
      <div style={{ padding: "0 60px 48px" }}>
        <span style={{
          display: "block",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: "10px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#E8571A",
          marginBottom: "16px",
        }}>
          OUR PROTOCOLS
        </span>
        <h2 style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          fontSize: "clamp(32px, 4vw, 48px)",
          lineHeight: 1.1,
          color: "#2A1F14",
          margin: "0 0 16px",
        }}>
          Find your protocol.<br />
          <span style={{ fontStyle: "italic", color: "#E8571A" }}>Goal-specific.</span>
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: "15px",
          color: "rgba(42,31,20,0.6)",
          margin: 0,
        }}>
          Choose what matters to you. Your doctor does the rest.
        </p>
      </div>

      {/* CAROUSEL OUTER */}
      <div style={{
        overflow: "hidden",
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}>
        {/* CAROUSEL INNER */}
        <div
          ref={carouselRef}
          className="carousel-track"
          style={{
            display: "flex",
            gap: "16px",
            padding: "20px 60px 40px",
            overflowX: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none" as any,
            cursor: "grab",
            userSelect: "none",
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {tripleCards.map((card, index) => {
            const isHovered = hoveredCard === card.id + index;
            return (
              <button
                key={card.id + index}
                onMouseEnter={() => setHoveredCard(card.id + index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  minWidth: 280,
                  height: 380,
                  borderRadius: 20,
                  position: "relative",
                  overflow: "visible",
                  flexShrink: 0,
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease",
                  background: isHovered
                    ? `${noiseBg}, linear-gradient(145deg, #F5F0E8 0%, #EDE8DE 100%)`
                    : `${noiseBg}, linear-gradient(145deg, #E8DDD0 0%, #D8CCBC 100%)`,
                  transform: isHovered ? "translateY(-10px)" : "translateY(0)",
                  boxShadow: isHovered ? "0 24px 60px rgba(0,0,0,0.2)" : "none",
                }}
              >
                {/* TOP ROW */}
                <div style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  right: 20,
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                  <span style={{
                    background: "rgba(26,43,53,0.1)",
                    borderRadius: 999,
                    padding: "4px 12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    color: "rgba(26,43,53,0.6)",
                  }}>
                    {card.label}
                  </span>
                  <span style={{
                    background: "rgba(26,43,53,0.1)",
                    borderRadius: 999,
                    padding: "4px 12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    color: "rgba(26,43,53,0.6)",
                  }}>
                    {card.count} PROTOCOLS
                  </span>
                </div>

                {/* MARK IMAGE */}
                <img
                  src={card.mark}
                  alt=""
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -60%) rotate(-6deg)",
                    width: "55%",
                    height: "auto",
                    objectFit: "contain",
                    zIndex: 1,
                    pointerEvents: "none",
                    transition: "transform 0.5s ease",
                    animation: isHovered ? "smoothFloat 3s ease-in-out infinite" : "none",
                  }}
                />

                {/* CAST SHADOW */}
                <div style={{
                  position: "absolute",
                  bottom: "34%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "35%",
                  height: 10,
                  background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)",
                  borderRadius: "50%",
                  zIndex: 0,
                  pointerEvents: "none",
                  transition: "opacity 0.4s ease",
                  opacity: isHovered ? 0.08 : 1,
                }} />

                {/* CARD BOTTOM */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "20px 24px",
                }}>
                  <p style={{
                    opacity: isHovered ? 1 : 0,
                    height: isHovered ? "auto" : 0,
                    overflow: "hidden",
                    paddingBottom: isHovered ? 8 : 0,
                    transition: "opacity 0.3s ease 0.1s",
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#1A2B35",
                    lineHeight: 1.3,
                    margin: 0,
                  }}>
                    {card.line}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes smoothFloat {
          0% { transform: translate(-50%, -60%) rotate(-6deg); }
          50% { transform: translate(-50%, -67%) rotate(-6deg); }
          100% { transform: translate(-50%, -60%) rotate(-6deg); }
        }
        @keyframes float {
          0% { transform: translate(-50%, -60%) rotate(-6deg); }
          50% { transform: translate(-50%, -67%) rotate(-6deg); }
          100% { transform: translate(-50%, -60%) rotate(-6deg); }
        }
        .carousel-track::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default Protocols;
