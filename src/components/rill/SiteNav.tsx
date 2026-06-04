import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuiz } from "./quizContext";
import meoraLogo from "@/assets/meora-logo.png";

const NAV_LINKS = [
  { label: "Protocols", href: "#protocols" },
  { label: "How It Works", href: "#how" },
  { label: "About", href: "#about" },
  { label: "Journal", href: "#journal" },
];

interface SiteNavProps {
  variant?: "light" | "dark";
}

const SiteNav = ({ variant = "light" }: SiteNavProps) => {
  const { open } = useQuiz();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isDark = variant === "dark";
  const navBg = isDark
    ? scrolled
      ? "rgba(26,43,53,0.85)"
      : "rgba(26,43,53,0.72)"
    : scrolled
      ? "rgba(247, 244, 239, 0.18)"
      : "rgba(247, 244, 239, 0.16)";
  const borderColor = isDark
    ? scrolled
      ? "rgba(255,255,255,0.16)"
      : "rgba(255,255,255,0.12)"
    : scrolled
      ? "rgba(255,255,255,0.36)"
      : "rgba(255,255,255,0.34)";
  const textColor = isDark ? "#fff" : "#fff";
  const linkColor = isDark ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.85)";
  const ctaBg = "#FF5003";
  const overlayBg = "#1A2B35";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 16,
          left: 24,
          right: 24,
          zIndex: 50,
          isolation: "isolate",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          height: 48,
          padding: "0 20px",
          borderRadius: 999,
          background: navBg,
          backdropFilter: "blur(22px) saturate(190%)",
          WebkitBackdropFilter: "blur(22px) saturate(190%)",
          border: `1px solid ${borderColor}`,
          boxShadow: isDark
            ? "0 18px 48px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(26,43,53,0.10)"
            : "0 18px 48px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.42), inset 0 -1px 0 rgba(26,43,53,0.10)",
          overflow: "hidden",
          transition: "background 400ms ease, border-color 400ms ease, box-shadow 400ms ease",
        }}
      >
        {/* Glass gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            borderRadius: "inherit",
            background: isDark
              ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 42%, rgba(26,43,53,0.12) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 42%, rgba(26,43,53,0.06) 100%)",
          }}
        />

        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            height: 44,
            zIndex: 101,
            position: "relative",
          }}
        >
          <img
            src={meoraLogo}
            alt="Meora"
            height={44}
            width={44}
            style={{ height: 44, width: 44, display: "block" }}
          />
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              fontSize: 18,
              color: textColor,
              letterSpacing: "0.08em",
              marginLeft: 10,
            }}
          >
            MEORA
          </span>
        </Link>

        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            listStyle: "none",
            margin: 0,
            padding: 0,
            position: "relative",
            zIndex: 101,
          }}
          className="site-nav-links"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={isHome ? link.href : `/${link.href}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: linkColor,
                  textDecoration: "none",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = textColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 20, zIndex: 101, position: "relative" }}>
          <button
            onClick={open}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#fff",
              background: ctaBg,
              border: "none",
              borderRadius: 999,
              padding: "10px 20px",
              cursor: "pointer",
              transition: "opacity 200ms ease, transform 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            className="site-nav-cta"
          >
            Start Your Assessment
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
              width: 36,
              height: 36,
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 4,
              zIndex: 101,
              position: "relative",
            }}
            className="site-nav-burger"
          >
            <span
              style={{
                display: "block",
                height: 1.5,
                background: textColor,
                borderRadius: 2,
                transition: "transform 300ms ease, opacity 300ms ease",
                transformOrigin: "center",
                width: "100%",
              }}
            />
            <span
              style={{
                display: "block",
                height: 1.5,
                background: textColor,
                borderRadius: 2,
                transition: "transform 300ms ease, opacity 300ms ease",
                transformOrigin: "center",
                width: "100%",
              }}
            />
            <span
              style={{
                display: "block",
                height: 1.5,
                background: textColor,
                borderRadius: 2,
                transition: "transform 300ms ease, opacity 300ms ease",
                transformOrigin: "center",
                width: "100%",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 49,
            background: overlayBg,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "0 80px",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 56 }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={isHome ? link.href : `/${link.href}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 700,
                  fontSize: "clamp(40px, 6vw, 76px)",
                  color: "#fff",
                  textDecoration: "none",
                  lineHeight: 1.15,
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FF5003")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => {
              setMenuOpen(false);
              open();
            }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#fff",
              background: "#FF5003",
              border: "none",
              borderRadius: 999,
              padding: "18px 40px",
              cursor: "pointer",
              transition: "background 200ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e04500")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FF5003")}
          >
            Start Your Assessment →
          </button>
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 80,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            AHPRA-Registered · Registered Compounding Pharmacy · Australia-Wide
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .site-nav-links, .site-nav-cta { display: none !important; }
          .site-nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default SiteNav;
