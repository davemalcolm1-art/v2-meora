import { useEffect, useState } from "react";
import { useQuiz } from "./quizContext";

const Nav = () => {
  const { open } = useQuiz();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    background: scrolled ? "rgba(26,43,53,0.92)" : "rgba(26,43,53,0.15)",
    backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
    WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.06)" : "none",
    transition: "background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease",
  };

  return (
    <nav style={navStyle}>
      <a href="#" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 20, letterSpacing: "0.18em", color: "#F7F4EF", textDecoration: "none" }}>MEORA</a>
      <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
        {[
          { href: "#protocols", label: "Protocols" },
          { href: "#how", label: "How it works" },
          { href: "#about", label: "About" },
          { href: "#journal", label: "Journal" },
        ].map((l) => (
          <li key={l.href}>
            <a href={l.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(247,244,239,0.75)", textDecoration: "none" }}>{l.label}</a>
          </li>
        ))}
      </ul>
      <button onClick={open} style={{ background: "#FF5003", color: "#fff", border: "none", borderRadius: 999, padding: "10px 22px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
        Start your assessment
      </button>
    </nav>
  );
};

export default Nav;
