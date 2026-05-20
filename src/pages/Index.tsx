import { useState } from "react";
import Cursor from "@/components/rill/Cursor";
import HeroSection from "@/components/rill/HeroSection";
import CredentialStrip from "@/components/rill/CredentialStrip";
import ClinicalPhilosophy from "@/components/rill/ClinicalPhilosophy";
import HowItWorks from "@/components/rill/HowItWorks";
import ContrastInterstitial from "@/components/rill/ContrastInterstitial";

import Protocols from "@/components/rill/Protocols";
import Ticker from "@/components/rill/Ticker";
import InterstitialBreak from "@/components/rill/InterstitialBreak";
import Science from "@/components/rill/Science";
import FAQ from "@/components/rill/FAQ";
import ContentHub from "@/components/rill/ContentHub";
import Footer from "@/components/rill/Footer";
import MaskSection from "@/components/rill/MaskSection";
import QuizModal from "@/components/rill/QuizModal";
import { QuizProvider } from "@/components/rill/quizContext";
import useReveal from "@/components/rill/useReveal";

const Index = () => {
  const [quizOpen, setQuizOpen] = useState(false);
  useReveal();
  return (
    <QuizProvider onOpen={() => setQuizOpen(true)}>
      <Cursor />
      <HeroSection />
      <div style={{ background: "#FAF7F2", padding: 0 }}>
        <CredentialStrip />
        <div style={{ padding: "0 40px" }}>
          <ClinicalPhilosophy />
        </div>
        <div style={{ height: 40 }} />
        <div style={{ padding: "0 40px" }}>
          <Protocols />
        </div>
        <Ticker />
        <div style={{ padding: "0 40px" }}>
          <HowItWorks />
        </div>
        <div style={{ height: 40 }} />
        <ContrastInterstitial />
        <div style={{ height: 40 }} />
        <Science />
        <div style={{ height: 40 }} />
        <InterstitialBreak label="A Protocol. Not a Trend." />
        <div style={{ padding: "0 40px" }}>
          <FAQ />
        </div>
        <div style={{ height: 40 }} />
        <div style={{ padding: "0 40px" }}>
          <ContentHub />
        </div>
      </div>
      <MaskSection />
      <Footer />
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </QuizProvider>
  );
};

export default Index;
