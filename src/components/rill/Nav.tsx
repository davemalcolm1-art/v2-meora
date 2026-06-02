import { useEffect, useState } from "react";
import { useQuiz } from "./quizContext";

const links = [
  { href: "#protocols", label: "DOMAINS" },
  { href: "#how", label: "HOW IT WORKS" },
  { href: "#about", label: "ABOUT" },
  { href: "#journal", label: "JOURNAL" },
];

const Nav = () => {
  const { open } = useQuiz();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 80);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 16,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
    width: "auto",
    minWidth: 720,
    maxWidth: 1100,
    background: scrolled ? "rgba(26,43,53,0.35)" : "rgba(26,43,53,0.18)",
    backdropFilter: scrolled ? "blur(32px) saturate(180%)" : "blur(20px) saturate(140%)",
    WebkitBackdropFilter: scrolled ? "blur(32px) saturate(180%)" : "blur(20px) saturate(140%)",
    border: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 999,
    padding: "10px 12px 10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.24)" : "none",
    transition: "all 0.4s ease",
  };

  return (
    <nav className="meora-nav" style={navStyle}>
      <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <img src="/meora-mark-white.svg" width={28} height={28} alt="Meora" />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.1em", color: "#fff" }}>MEORA</span>
      </a>
      <ul className="meora-nav-links" style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 }}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="meora-nav-link" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#fff", letterSpacing: "0.02em", textDecoration: "none", transition: "color 0.2s" }}>{l.label}</a>
          </li>
        ))}
      </ul>
      <button onClick={open} className="meora-nav-cta" style={{ background: "#FF5003", color: "#fff", border: "none", borderRadius: 999, padding: "10px 22px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.05em", cursor: "pointer", transition: "all 0.2s" }}>
        START YOUR ASSESSMENT
      </button>
      <button className="meora-nav-hamburger" aria-label="Menu" style={{ display: "none", background: "transparent", border: "none", cursor: "pointer", padding: 8 }}>
        <span style={{ display: "block", width: 20, height: 1.5, background: "rgba(255,255,255,0.8)", marginBottom: 4 }} />
        <span style={{ display: "block", width: 20, height: 1.5, background: "rgba(255,255,255,0.8)", marginBottom: 4 }} />
        <span style={{ display: "block", width: 20, height: 1.5, background: "rgba(255,255,255,0.8)" }} />
      </button>
      <style>{`
        .meora-nav-link:hover { color: #fff !important; }
        .meora-nav-cta:hover { background: #E8571A !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,80,3,0.4); }
        @media (max-width: 768px) {
          .meora-nav { left: 16px !important; right: 16px !important; transform: none !important; min-width: unset !important; max-width: unset !important; border-radius: 24px !important; width: auto !important; }
          .meora-nav-links, .meora-nav-cta { display: none !important; }
          .meora-nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Nav;
