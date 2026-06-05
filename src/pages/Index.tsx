import { useState } from "react";
import Cursor from "@/components/rill/Cursor";
import HeroSection from "@/components/rill/HeroSection";
import TrustStrip from "@/components/rill/TrustStrip";
import Positioning from "@/components/rill/Positioning";
import ProtocolDomains from "@/components/rill/ProtocolDomains";
import HowItWorks from "@/components/rill/HowItWorks";
import ScienceCards from "@/components/rill/ScienceCards";
import Stats from "@/components/rill/Stats";
import Journal from "@/components/rill/Journal";
import CtaBanner from "@/components/rill/CtaBanner";
import FAQ from "@/components/rill/FAQ";
import Footer from "@/components/rill/Footer";
import QuizModal from "@/components/rill/QuizModal";
import { QuizProvider } from "@/components/rill/quizContext";
import useReveal from "@/components/rill/useReveal";

const CREAM = "#F7F4EF";
const DARK = "#0f0f0f";

const Fade = ({ from, to }: { from: string; to: string }) => (
  <div aria-hidden="true" style={{ height: 80, background: `linear-gradient(to bottom, ${from} 0%, ${to} 100%)`, width: "100%" }} />
);

const Index = () => {
  const [quizOpen, setQuizOpen] = useState(false);
  useReveal();
  return (
    <QuizProvider onOpen={() => setQuizOpen(true)}>
      <Cursor />
      <HeroSection />
      <TrustStrip />
      <Positioning />
      <ProtocolDomains />
      <HowItWorks />
      <ScienceCards />
      <Journal />
      <CtaBanner />
      <FAQ />
      <Footer showMask />
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </QuizProvider>
  );
};

export default Index;
