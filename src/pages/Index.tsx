import { useState } from "react";
import Cursor from "@/components/rill/Cursor";
import Nav from "@/components/rill/Nav";
import Hero from "@/components/rill/Hero";
import Marquee from "@/components/rill/Marquee";
import HowItWorks from "@/components/rill/HowItWorks";
import WhatIsRill from "@/components/rill/WhatIsRill";
import Protocols from "@/components/rill/Protocols";
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
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Protocols />
        <HowItWorks />
        <WhatIsRill />
        <InterstitialBreak label="A Protocol. Not a Trend." />
        <Science />
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
