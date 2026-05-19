import { useEffect, useState } from "react";
import { useQuiz } from "./quizContext";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { open } = useQuiz();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`rill-nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#" className="nav-logo">MEORA</a>
      <ul className="nav-links">
        <li><a href="#protocols">Protocols</a></li>
        <li><a href="#how">How it works</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#journal">Journal</a></li>
      </ul>
      <button className="nav-cta" onClick={open}>Start your assessment</button>
    </nav>
  );
};

export default Nav;
