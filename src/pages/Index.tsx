import { useState } from "react";
import Cursor from "@/components/rill/Cursor";
import HeroSection from "@/components/rill/HeroSection";
import Positioning from "@/components/rill/Positioning";
import Domains from "@/components/rill/Domains";
import HowItWorks from "@/components/rill/HowItWorks";
import ScienceCards from "@/components/rill/ScienceCards";
import Stats from "@/components/rill/Stats";
import CtaBanner from "@/components/rill/CtaBanner";
import FAQ from "@/components/rill/FAQ";
import Footer from "@/components/rill/Footer";
import MaskSection from "@/components/rill/MaskSection";
import QuizModal from "@/components/rill/QuizModal";
import { QuizProvider } from "@/components/rill/quizContext";
import useReveal from "@/components/rill/useReveal";

const CREAM = "#F7F4EF";
const DARK = "#1A2B35";

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
      <Fade from="rgba(247,244,239,0)" to={CREAM} />
      <Positioning />
      <Domains />
      <Fade from={CREAM} to={DARK} />
      <div style={{ background: DARK }}>
        <HowItWorks />
      </div>
      <Fade from={DARK} to={CREAM} />
      <ScienceCards />
      <Stats />
      <CtaBanner />
      <FAQ />
      <MaskSection />
      <Footer />
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </QuizProvider>
  );
};

export default Index;
