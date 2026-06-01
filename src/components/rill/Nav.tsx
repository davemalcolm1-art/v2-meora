import { useQuiz } from "./quizContext";
import { useNavScroll } from "@/hooks/useNavScroll";

const Nav = () => {
  const { open } = useQuiz();
  useNavScroll();

  return (
    <nav className="rill-nav">
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
