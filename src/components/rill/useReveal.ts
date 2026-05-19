import { useEffect } from "react";

const AUTO_SELECTORS = [
  "h2",
  ".what-stat",
  ".what-pillar",
  ".protocols-card-grid > *",
];

const useReveal = () => {
  useEffect(() => {
    // Auto-tag eligible elements with .reveal if not already
    AUTO_SELECTORS.forEach((sel) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el, idx) => {
        if (!el.classList.contains("reveal")) {
          el.classList.add("reveal");
        }
        // Stagger cards/stats by 100ms if no transition-delay already set
        if (
          (sel === ".what-stat" || sel === ".what-pillar" || sel === ".protocols-card-grid > *") &&
          !el.style.transitionDelay
        ) {
          el.style.transitionDelay = `${idx * 100}ms`;
        }
      });
    });

    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));
    const t = setTimeout(() => {
      document.querySelectorAll(".hero .reveal").forEach((el) => el.classList.add("visible"));
    }, 200);
    return () => {
      observer.disconnect();
      clearTimeout(t);
    };
  }, []);
};

export default useReveal;
