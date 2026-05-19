import { useQuiz } from "./quizContext";

const InterstitialBreak = ({ label }: { label: string }) => {
  const { open } = useQuiz();
  return (
    <div className="interstitial">
      <img
        className="interstitial-bg-img"
        src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920&q=80"
        alt=""
        aria-hidden="true"
      />
      <div className="interstitial-bg"></div>
      <div className="interstitial-content">
        <div className="interstitial-pill">
          <span>{label}</span>
        </div>
        <div className="interstitial-line"></div>
        <button className="interstitial-cta" onClick={open}>
          <span>Start your assessment</span>
        </button>
      </div>
    </div>
  );
};

export default InterstitialBreak;
