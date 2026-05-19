import { useState } from "react";
import Cursor from "@/components/rill/Cursor";
import HeroSection from "@/components/rill/HeroSection";
import CredentialStrip from "@/components/rill/CredentialStrip";
import ClinicalPhilosophy from "@/components/rill/ClinicalPhilosophy";
import HowItWorks from "@/components/rill/HowItWorks";
import ContrastInterstitial from "@/components/rill/ContrastInterstitial";
import ComplianceStrip from "@/components/rill/ComplianceStrip";
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
      <main>
        <CredentialStrip />
        <ClinicalPhilosophy />
        <Protocols />
        <Ticker />
        <HowItWorks />
        <ContrastInterstitial />
        <Science />
        <ComplianceStrip />
        <InterstitialBreak label="A Protocol. Not a Trend." />
        <FAQ />
        <ContentHub />
      </main>
      <MaskSection />
      <Footer />
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </QuizProvider>
  );
};

export default Index;
