import { useEffect } from "react";

const useReveal = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
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
